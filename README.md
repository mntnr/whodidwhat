# Who Did What

A tiny script to reformat, filter, and transform the output of [`name-your-contributors`](https://github.com/mntnr/name-your-contributors).

## Install

```sh
$ npm install -g whodidwhat
```

Or you can clone it locally:

```sh
$ git clone https://github.com/tgetgood/whodunnit
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

That's all for now.

## License

MIT
