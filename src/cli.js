#!/usr/bin/env node

'use strict'

const {readStdin, byUser, gitAuthors, contribMd, selectUser} = require('./index')
const args = require('minimist')(process.argv.slice(2))

const helpMsg = `
  Post Processing for name-your-contributors output.

  Usage
    $ cat out.json | whodidwhat [opts]
  Options
    -u, --user  - Filter for a specific user
    -m, --md    - Output contributor list as markdown
    -h, --help  - Display this message

`

const str = json => JSON.stringify(json, null, 2)

if (args.h || args.help) {
  console.log(helpMsg)
  process.exit(0)
} else {
  readStdin()
    .then(JSON.parse)
    .then(byUser)
    .then(json => {
      const user = args.u || args.user

      if (args.m || args.md) {
        return contribMd(json)
      } else if (user && user != true) {
        return str(selectUser(user, json))
      } else if (args.git) {
        return gitAuthors(json)
      } else {
        return str(json)
      }
    })
    .then(console.log)
    .catch(console.error)
}
