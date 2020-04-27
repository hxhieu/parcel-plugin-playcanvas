'use strict'

const path = require('path')
const fs = require('fs')
const FormData = require('form-data')
const fetch = require('node-fetch')
const chalk = require('chalk')
const dayjs = require('dayjs')

module.exports = bundler => {
  bundler.on('bundled', async (bundle) => {
    // TODO: Configurable package.json
    const delay = 2000 // Delay 2s between upload to avoid save spamming
    const lastUpdateFile = '.parcel-plugin-playcanvas'

    // main asset and package dir, depending on version of parcel-bundler
    let mainAsset =
      bundler.mainAsset ||                                                // parcel < 1.8
      bundler.mainBundle.entryAsset ||                                    // parcel >= 1.8 single entry point
      bundler.mainBundle.childBundles.values().next().value.entryAsset   // parcel >= 1.8 multiple entry points

    const { outDir, outFile } = mainAsset.options
    const bundlePath = path.join(outDir, outFile)

    // Only process the output file
    if (bundle.name !== bundlePath) return

    // Last upload check
    if (fs.existsSync(lastUpdateFile)) {
      const stats = fs.statSync(lastUpdateFile)
      const lastBundleModified = dayjs(stats.mtime)
      if (dayjs().diff(lastBundleModified, 'millisecond') < delay)
        return console.log(chalk.yellow('Last upload was too recent, skip uploading.'))
    }

    const buffer = fs.readFileSync(bundlePath)
    const fileName = outFile
    const projectId = process.env.PLAYCANVAS_PROJECT_ID
    const assetId = process.env.PLAYCANVAS_ASSET_ID
    const accessToken = process.env.PLAYCANVAS_ACCESS_TOKEN

    if (!projectId || !assetId || !accessToken) {
      return console.error(chalk.bgRed.white('Missing env vars for PlayCanvas script upload, process halted.'))
    }

    const form = new FormData()
    form.append('file', buffer, {
      contentType: 'text/javascript',
      filename: fileName,
    })

    process.stdout.write(chalk.bgCyan.white('Uploading script bundle to PlayCanvas...'))

    fetch(`https://playcanvas.com/api/assets/${assetId}`,
      {
        method: 'PUT',
        body: form,
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      })
      .then(() => {
        fs.writeFileSync(lastUpdateFile, new Date().getTime(), 'utf8')
        console.log(chalk.green(' DONE!'))
      })
      .catch(err => console.error(chalk.bgRed.white(err)))
  })
}