// this is proof proxies are working (without having to patch or call io.js with any flags)

require('..')
var test = require('ava')

function p(val) { console.log(JSON.stringify(val)) }

function AttributeProxy(target) {
  return Proxy(target, {
    get: function(target, name, receiver) {
      if (name in target) { return target[name] }
      // everything not found on the target object itself should
      // be looked up in the target's _attributes map
      return target._attributes[name]
    },
    set: function(target, name, val, receiver) {
      if (name in target) {
        target[name] = val
        return true
      }
      // everything not found on the target object itself should
      // be added to the target's _attributes map
      target._attributes[name] = val
      return true
    }
  })
}

var Person = function() {
  this._attributes = {}
  return AttributeProxy(this)
}

Person.prototype.walk = function() {
  console.log('Person is walking')
}

var Female = function() {
  // call "super" constructor
  return Person.call(this)
}
// make Female inherit from Person
Female.prototype = Object.create(Person.prototype)
Female.prototype.shop = function() {
  console.log('Female is shopping')
}

// tests
test('Proxy: Person', t => {
  t.plan(2)
  var person = new Person()
  person.hair = 'black'
  person.walk() // methods are called normally
  t.is(person.hair, 'black')
  t.same(person._attributes, {hair: 'black'})
})

test('Proxy: Female', t => {
  t.plan(2)
  var female = new Female()
  female.hair = 'blonde'
  female.walk() // methods are called normally
  female.shop() // methods are called normally
  t.is(female.hair, 'blonde')
  t.same(female._attributes, {hair: 'blonde'})
})
// */
