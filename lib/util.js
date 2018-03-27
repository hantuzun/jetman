var _ = require('underscore')

exports.functionBody = function (fn) {
  return fn.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1]
}

exports.getModulePath = function (moduleToFind, moduleChildren) {
  if (moduleToFind && moduleChildren) {
    var foundModule = moduleChildren.find(function (child) {
      return moduleToFind === child.exports
    })
    return foundModule && foundModule.id
  }
}

// Would not work on those poor Windows machines
exports.getModuleFilename = function (moduleToFind, moduleChildren) {
  if (moduleToFind && moduleChildren) {
    var path = this.getModulePath(moduleToFind, moduleChildren)
    var filename = path.split('/').pop()
    var filenameWithoutExtension = filename.split('.')[0]
    return filenameWithoutExtension
  }
}

exports.deepCopy = function (obj) {
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    return [].concat(obj)
  } else if (typeof obj === 'object') {
    return _.clone(obj)
  } else {
    return obj
  }
}
