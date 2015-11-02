# quick-tmp [![Flattr this!](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=hughskennedy&url=http://github.com/hughsk/quick-tmp&title=quick-tmp&description=hughsk/quick-tmp%20on%20GitHub&language=en_GB&tags=flattr,github,javascript&category=software)[![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

Quickly and synchronously retrieve a temporary directory name for you to use.

Using the name generation from the [tmp](https://github.com/raszi/node-tmp/blob/master/lib/tmp.js#L110-L118)
module, but allowing you to handle writing and removing of directories/files.

## Usage ##

[![quick-tmp](https://nodei.co/npm/quick-tmp.png?mini=true)](https://nodei.co/npm/quick-tmp)

### `getDirectory = quickTmp([prefix])` ###

Configures the temporary directory's `prefix`, which defaults to `'quicktmp'`.

### `directory = getDirectory([retries])` ###

Return a random temporary directory name. You'll have to create the directory
yourself. `retries` determines how many times to try finding a folder not
that doesn't already exist, and defaults to 10.

``` javascript
// straight away:
var directory = require('quick-tmp')('prefix')()
// or later:
var getDirectory = require('quick-tmp')('prefix')
getDirectory()
// => '/var/folders/43/z7pv8pvd4x57nt_1zz2561tw0000gn/T/prefix-43831t6vveao'
```

## License ##

MIT. See [LICENSE.md](http://github.com/hughsk/quick-tmp/blob/master/LICENSE.md) for details.
