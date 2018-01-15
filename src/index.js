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

const cat = l => l.map(l => [l.login, l.count, l.url])

const loopField = (out, l, key) => {
  for (let [login, count, url] of cat(l)) {
    const userkey = `- [@${login}](${url})`
    if (out.has(userkey)) {
      out.get(userkey).commits = count
    } else {
      let t = {}
      t[key] = count
      out.set(userkey, t)
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

const mapTypes = args => {
  const out = new Map()

  typeMap.map(([k, n]) => {
    if (args[k]) {
      return loopField(out, args[k], n)
    } else {
      const o = {}
      o[k] = []
      return o
    }
  })
  return out
}

const byUser = args => {
  const contribsByType = mapTypes(args)
  const jsonOut = {}

  for (let [k, v] of contribsByType.entries()) {
    jsonOut[k] = v
  }

  return jsonOut
}

const rank = v => {
  let c = 0
  for (const k in v) {
    c += v[k]
  }
  return c
}

const contribMd = json => {
  let contribs = []
  for (const k in json) {
    contribs.push([k, rank(json[k])])
  }
  contribs = contribs.sort((a, b) => b[1] - a[1]).map(x => x[0])

  return contribs.reduce((acc, x) => acc + x + "\n", "\n")
}

const selectUser = (user, json) => {
  const userkey = Object.keys(json).filter(k => {
    if (user === k.substring(4, 4 + user.length)) {
      return k
    } else {
      return false
    }
  })
  return json[userkey]
}

module.exports = {
  byUser,
  selectUser,
  contribMd,
  readStdin
}
