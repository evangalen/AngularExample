# Angular Example [![Build Status][travis-image]][travis-url] [![Code Climate][codeclimate-image]][codeclimate-url]

## Requirements

- AngularJS 1.2.6
- [CodeMirror 4.3.x](https://github.com/marijnh/CodeMirror)
- ui-codemirror 0.1.6


## Usage

You can get it from (https://github.com/chungminhho/AngularExample.git)

```sh
 git clone https://github.com/chungminhho/AngularExample.git
```



## Testing

We use Karma and jshint to ensure the quality of the code.  The easiest way to run these checks is to use grunt:

```sh
npm install -g grunt-cli
npm install && bower install
grunt
```

The karma task will try to open Firefox and Chrome as browser in which to run the tests.  Make sure this is available or change the configuration in `test\karma.conf.js`


### Grunt Serve

We have one task to serve them all !

```sh
grunt serve
```

It's equal to run separately:

* `grunt connect:server` : giving you a development server at [http://localhost:8000/](http://localhost:8000/).

* `grunt karma:server` : giving you a Karma server to run tests (at [http://localhost:9876/](http://localhost:9876/) by default). You can force a test on this server with `grunt karma:unit:run`.

* `grunt watch` : will automatically test your code and build your demo.  You can demo generation with `grunt build:gh-pages`.
