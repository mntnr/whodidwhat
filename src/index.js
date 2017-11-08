'use strict'

const readStdin = () => new Promise((resolve, reject) => {
  let data = ''

  process.stdin.resume()
  process.stdin.setEncoding('utf8')

  process.stdin.on('data', function (chunk) {
    data += chunk
  })

  process.stdin.on('end', function () {
    resolve(data)
  })

  process.stdin.on('error', reject)
})

const cat = l => l.map(l => [l.login, l.count])

const loopField = (out, l, key) => {
  for (let [login, count] of cat(l)) {
    if (out.has(login)) {
      out.get(login).commits = count
    } else {
      let t = {}
      t[key] = count
      out.set(login, t)
    }
  }
}

const typeMap = [['commitAuthors', 'commits'],
                 ['commitCommentators', 'commitComments'],
                 ['prCreators', 'prsCreated'],
                 ['prCommentators', 'prComments'],
                 ['issueCreators', 'issuesCreated'],
                 ['issueCommentators', 'issueComments'],
                 ['reactors', 'reactions'],
                 ['reviewers', 'codeReviews']]

const byUser = (args) => {
  const out = new Map()

  typeMap.map(([k, n]) => loopField(out, args[k], n))

  const jsonOut = {}

  for (let [k, v] of out.entries()) {
    jsonOut[k] = v
  }

  return jsonOut
}

module.exports = {
  byUser,
  readStdin
}
