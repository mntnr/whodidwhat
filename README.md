# Who Did What

A tiny script to reformat, filter, and transform the output of [`name-your-contributors`](https://github.com/mntnr/name-your-contributors).

## Install

```sh
$ npm install -g whodidwhat
```

Or you can clone it locally:

```sh
$ git clone https://github.com/mntnr/whodidwhat
```

## Use

Pipe JSON output into this script and it spits out transformed JSON to
stdout. use `-u, --user` to pick out just a single user.

From the project root run:

```sh
$ name-your-contributors -u mntnr -r name-your-contributors | whodidwhat

$ name-your-contributors -u mntnr -r name-your-contributors | whodidwhat -u tgetgood
```

Or you can save the output from nyc and pipe it through separately:

```sh
$ name-your-contributors -u mntnr -r name-your-contributors > nyc.json
$ cat nyc.json | whodidwhat > who.json
```

### List of Contributors

With the `--md` option, whodidwhat will output the list of contributors as a markdown list ready to be pasted into your README or contributors file.

Think of it as the who without the what.

```sh
$ name-your-contributors -u mntnr -r name-your-contributors -b 2018 | whodidwhat --md
```
Will output
```sh
- [@RichardLitt](https://github.com/RichardLitt)
- [@tgetgood](https://github.com/tgetgood)
- [@jywarren](https://github.com/jywarren)
- [@gr2m](https://github.com/gr2m)
- [@diasdavid](https://github.com/diasdavid)
- [@kentcdodds](https://github.com/kentcdodds)
- [@greenkeeper](undefined)
- [@dignifiedquire](https://github.com/dignifiedquire)
- [@jozefizso](https://github.com/jozefizso)
- [@jbenet](https://github.com/jbenet)

```

That's all for now.

## License

MIT
