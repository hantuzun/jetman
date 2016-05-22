exports.functionBody = function (fn) {
    return fn.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];
}

exports.getModulePath = function (moduleToFind, moduleVariable) {
    var foundModule = moduleVariable.children.find(function(child) {
        return moduleToFind === child.exports;
    });
    return foundModule && foundModule.id;
}
