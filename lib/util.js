exports.functionBody = function (fn) {
    return fn.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];
}

exports.getModulePath = function (moduleToFind, moduleVariable) {
    var foundModule = moduleVariable.children.find(function(child) {
        return moduleToFind === child.exports;
    });
    return foundModule && foundModule.id;
}

exports.merge = function (obj1, obj2) { 
    var result = obj1, val;
    for (val in obj2) {
        if (obj2.hasOwnProperty(val)) {
            result[val] = obj2[val];
        }
    }
    return result;
}
