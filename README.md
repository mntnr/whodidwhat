# Whodunnit

A tiny script to reformat, filter, and transform the output of [`name-your-contributors`](https://github.com/mntnr/name-your-contributors).

## Install

Curently the only option is to clone it locally:

```sh
$ git clone https://github.com/tgetgood/whodunnit
```

## Use

Pipe JSON output into this script and it spits out transformed JSON to
stdout. use `-u, --user` to pick out just a single user.

From the project root run:

```sh
$ name-your-contributors -u mntnr -r name-your-contributors | src/cli.js

$ name-your-contributors -u mntnr -r name-your-contributors | src/cli.js -u tgetgood
```

Or you can save the output from nyc and pipe it through separately:

```sh
$ name-your-contributors -u mntnr -r name-your-contributors > nyc.json
$ cat nyc.json | src/cli.js > who.json
```

That's all for now.

## License

MIT
