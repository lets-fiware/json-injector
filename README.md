# json-injector widget

[![](https://nexus.lab.fiware.org/repository/raw/public/badges/chapters/visualization.svg)](https://www.fiware.org/developers/catalogue/)
[![License: MIT](https://img.shields.io/github/license/lets-fiware/json-injector.svg)](https://opensource.org/licenses/MIT)<br/>
[![Build Status](https://travis-ci.com/lets-fiware/json-injector.svg?branch=master)](https://travis-ci.com/lets-fiware/json-injector)
[![Coverage Status](https://coveralls.io/repos/github/lets-fiware/json-injector/badge.svg?branch=master)](https://coveralls.io/github/lets-fiware/json-injector?branch=master)

The json-injector widget is a WireCloud widget that allows you to send Json data to an output endpoint.

Build
-----

Be sure to have installed [Node.js](http://node.js) and [Bower](http://bower.io) in your system. For example, you can install it on Ubuntu and Debian running the following commands:

```bash
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install nodejs
sudo apt-get install npm
sudo npm install -g bower
```

Install other npm dependencies by running:

```bash
npm install
```

In order to build this operator you need to download grunt:

```bash
sudo npm install -g grunt-cli
```

And now, you can use grunt:

```bash
grunt
```

If everything goes well, you will find a wgt file in the `dist` folder.

## Documentation

Documentation about how to use this widget is available on the
[User Guide](src/doc/userguide.md). Anyway, you can find general information
about how to use widgets on the
[WireCloud's User Guide](https://wirecloud.readthedocs.io/en/stable/user_guide/)
available on Read the Docs.

## Copyright and License

Copyright (c) 2019 Kazuhito Suda
Licensed under the MIT license.
