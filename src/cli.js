#!/usr/bin/env node
'use strict'

const readStdin = () => new Promise((resolve, reject) => {
  let data = ''

  process.stdin.resume()
  process.stdin.setEncoding('utf8')

  process.stdin.on('data', function (chunk) {
    data += chunk
  })

  process.stdin.on('end', resolve)

  process.stdin.on('error', reject)
})

const

readStdin().then(JSON.parse).then(json => console.log(json.commitAuthors))
