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

const cat = l => l.map(l => [l.login, l.count, l.url, l.name])

// This should use the login as the userkey, alone
const loopField = (out, l, key) => {
  for (let [login, count, url, name] of cat(l)) {
    const userkey = login
    // const userkey = `- [@${login}](${url})`
    // if (out.has(userkey)) {
      // Why is this getting only getting commits? It should get all contributions.
      // This is overriding some of the other keys.
      // out.get(userkey).commits = count
    // } else {
    let t = {'counts': count || 0}
    t['counts'] += count
    t['url'] = url
    t['login'] = login
    t['name'] = name
    out.set(userkey, t)
    // }
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

  // What do k and n mean?
  typeMap.map(([k, n]) => {
    if (args[k]) {
      return loopField(out, args[k], n)
    } else {
      const o = {}
      // Why would you reset to nothing?
      o[k] = []
      return o
    }
  })

  console.log(out)

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

// Add together all of the counts that return
const rank = v => {
  let c = 0
  for (const k in v) {
    c += v[k]
  }
  return c
}

const gitAuthors = json => {
  // console.log(json)
  let contribs = []
  for (const k in json) {
    contribs.push([k, json[k]['counts']])
  }
  contribs = contribs.sort((a, b) => b[1] - a[1]).map(x => x[0])
  // console.log(contribs)
}

// This should sort down to the - [@user](www.user) format
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
  gitAuthors,
  selectUser,
  contribMd,
  readStdin
}
