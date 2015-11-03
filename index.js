// | = we are standard = |
// | = we are strict = |
'use strict'
// /*====-----------------====*\
// | this serves the hash of a |
// |  torrent and it lives in  |
// | dustbin.affinaty.com      |
// \*=====----------------====*/

var v8_ver = process.versions.v8.split('.')

var v8 = require('v8')
// --allow_natives_syntax
// for doing something like
// eval('%OptimizeFunctionOnNextCall(p.extname)')
v8.setFlagsFromString('--allow_natives_syntax')

// --harmony_shipping (enable all shipped harmony fetaures)
v8.setFlagsFromString('--harmony_shipping')

// --harmony_modules (enable "harmony modules (implies block scoping)" (in progress))
v8.setFlagsFromString('--harmony_modules')

// --harmony_arrays (enable "harmony array methods" (in progress))
if (v8_ver[1] < 6) v8.setFlagsFromString('--harmony_arrays')

// --harmony_array_includes (enable "harmony Array.prototype.includes" (in progress))
v8.setFlagsFromString('--harmony_array_includes')

// --harmony_regexps (enable "harmony regular expression extensions" (in progress))
v8.setFlagsFromString('--harmony_regexps')

// --harmony_arrow_functions (enable "harmony arrow functions" (in progress))
v8.setFlagsFromString('--harmony_arrow_functions')

// --harmony_proxies (enable "harmony proxies" (in progress))
v8.setFlagsFromString('--harmony_proxies')

// --harmony_sloppy (enable "harmony features in sloppy mode" (in progress))
v8.setFlagsFromString('--harmony_sloppy')

// --harmony_unicode (enable "harmony unicode escapes" (in progress))
if (v8_ver[1] < 6) v8.setFlagsFromString('--harmony_unicode')

// --harmony_unicode_regexps (enable "harmony unicode regexps" (in progress))
v8.setFlagsFromString('--harmony_unicode_regexps')

// --harmony_computed_property_names (enable "harmony computed property names" (in progress))
if (v8_ver[1] < 6) v8.setFlagsFromString('--harmony_computed_property_names')

// --harmony_rest_parameters (enable "harmony rest parameters" (in progress))
if (v8_ver[1] < 6) v8.setFlagsFromString('--harmony_rest_parameters')

// --harmony_tostring (enable "harmony toString")
v8.setFlagsFromString('--harmony_tostring')

// --harmony_numeric_literals (enable "harmony numeric literals")
if (v8_ver[1] < 6) v8.setFlagsFromString('--harmony_numeric_literals')

// --harmony_strings (enable "harmony string methods")
if (v8_ver[1] < 6) v8.setFlagsFromString('--harmony_strings')

// --harmony_scoping (enable "harmony block scoping")
if (v8_ver[1] < 6) v8.setFlagsFromString('--harmony_scoping')

// --harmony_templates (enable "harmony template literals")
if (v8_ver[1] < 6) v8.setFlagsFromString('--harmony_templates')

// --harmony_classes (enable "harmony classes (implies block scoping & object literal extension)")
if (v8_ver[1] < 6) v8.setFlagsFromString('--harmony_classes')

// --harmony_object_literals (enable "harmony object literal extensions")
if (v8_ver[1] < 6) v8.setFlagsFromString('--harmony_object_literals')

if (v8_ver[1] > 3) v8.setFlagsFromString('--harmony_spreadcalls')

/*
TODO
--harmony_modules (enable "harmony modules" (in progress))
      type: bool  default: false
--harmony_regexps (enable "harmony regular expression extensions" (in progress))
      type: bool  default: false
--harmony_proxies (enable "harmony proxies" (in progress))
      type: bool  default: false
--harmony_sloppy_function (enable "harmony sloppy function block scoping" (in progress))
      type: bool  default: false
--harmony_sloppy_let (enable "harmony let in sloppy mode" (in progress))
      type: bool  default: false
--harmony_unicode_regexps (enable "harmony unicode regexps" (in progress))
      type: bool  default: false
--harmony_reflect (enable "harmony Reflect API" (in progress))
      type: bool  default: false
--harmony_destructuring (enable "harmony destructuring" (in progress))
      type: bool  default: false
--harmony_default_parameters (enable "harmony default parameters" (in progress))
      type: bool  default: false
--harmony_sharedarraybuffer (enable "harmony sharedarraybuffer" (in progress))
      type: bool  default: false
--harmony_atomics (enable "harmony atomics" (in progress))
      type: bool  default: false
--harmony_simd (enable "harmony simd" (in progress))
      type: bool  default: false
--harmony_array_includes (enable "harmony Array.prototype.includes")
      type: bool  default: false
--harmony_tostring (enable "harmony toString")
      type: bool  default: false
--harmony_concat_spreadable (enable "harmony isConcatSpreadable")
      type: bool  default: false
--harmony_rest_parameters (enable "harmony rest parameters")
      type: bool  default: false
--harmony_sloppy (enable "harmony features in sloppy mode")
      type: bool  default: false
--harmony_arrow_functions (enable "harmony arrow functions")
      type: bool  default: true
--harmony_new_target (enable "harmony new.target")
      type: bool  default: true
--harmony_object_observe (enable "harmony Object.observe")
      type: bool  default: true
--harmony_spreadcalls (enable "harmony spread-calls")
      type: bool  default: true
--harmony_spread_arrays (enable "harmony spread in array literals")
      type: bool  default: true
--harmony_object (enable "harmony Object methods")
      type: bool  default: true
*/

// ultra hack!
// we set the --harmony_proxies flag, but the Proxy object will not be defined
// until we create a new context... we can bring it back out though...

var sandbox = {}
require('vm').runInNewContext('this._Proxy = this.Proxy', sandbox)
global.Proxy = sandbox._Proxy

// now, we include the reflect module
global.Reflect = require('harmony-reflect')
