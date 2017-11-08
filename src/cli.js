#!/usr/bin/env node

'use strict'

const {readStdin, byUser} = require('./index')
const args = require('minimist')(process.argv.slice(2))

const helpMsg = `
  Post Processing for name-your-contributors output.

  Usage
    $ cat out.json | whodunnit [opts]
  Options
    -u, --user  - Filter for a specific user
    -h, --help  - Display this message

`

if (args.h || args.help) {
  console.log(helpMsg)
  process.exit(0)
} else {
  readStdin()
    .then(JSON.parse)
    .then(byUser)
    .then(json => {
      const user = args.u || args.user
      if (user && user !== true) {
        return json[user]
      } else {
        return json
      }
    }).then(x => JSON.stringify(x, null, 2))
    .then(console.log)
    .catch(console.error)
}
