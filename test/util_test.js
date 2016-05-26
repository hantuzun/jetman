/* eslint-env mocha */

var util = require('../lib/util.js')
var chai = require('chai')
var expect = chai.expect
chai.use(require('chai-string'))

var fn = function () {
  // Create the <style> tag
  var style = document.createElement('style')

  // WebKit hack :(
  style.appendChild(document.createTextNode(''))

  // Add the <style> element to the page
  document.head.appendChild(style)

  return style.sheet
}

var fnBody = `
  // Create the <style> tag
  var style = document.createElement('style')

  // WebKit hack :(
  style.appendChild(document.createTextNode(''))

  // Add the <style> element to the page
  document.head.appendChild(style)

  return style.sheet
`

describe('functionBody', function () {
  it('functionBody() should return function body as a string', function () {
    expect(util.functionBody(fn)).to.equal(fnBody)
  })
})

describe('getModulePath', function () {
  it('getModulePath(module, moduleChildren) should return the path of the given module', function () {
    expect(util.getModulePath(chai, module.children)).to.endWith('node_modules/chai/index.js')
  })
})

describe('getModulePath', function () {
  it('getModulePath(module, moduleChildren) should return undefined if moduleChildren is undefined', function () {
    expect(util.getModulePath(chai, undefined)).to.equal(undefined)
  })
})

describe('getModuleFilename', function () {
  it('getModuleFilename(module, moduleChildren) should return the file name of the given module`s main funciton', function () {
    expect(util.getModuleFilename(chai, module.children)).to.equal('index')
  })
})

describe('getModuleFilename', function () {
  it('getModuleFilename(module, moduleChildren) should return undefined if moduleChildren is undefined', function () {
    expect(util.getModuleFilename(chai, undefined)).to.equal(undefined)
  })
})
