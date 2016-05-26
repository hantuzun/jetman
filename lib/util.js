exports.functionBody = function (fn) {
    return fn.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];
}

exports.getModulePath = function (moduleToFind, moduleChildren) {
    if (moduleToFind && moduleChildren) {
        var foundModule = moduleChildren.find(function(child) {
            return moduleToFind === child.exports;
        });
        return foundModule && foundModule.id;
    }
}

// Would not work on those poor Windows machines
exports.getModuleFilename = function (moduleToFind, moduleChildren) {
    if (moduleToFind && moduleChildren) {
        var path = this.getModulePath(moduleToFind, moduleChildren);
        var filename = path.split('/').pop();
        var filenameWithoutExtension = filename.split('.')[0];
        return filenameWithoutExtension;
    }
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

exports.deepCopy = function (obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        var out = [], i = 0, len = obj.length;
        for ( ; i < len; i++ ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    if (typeof obj === 'object') {
        var out = {}, i;
        for ( i in obj ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    return obj;
}
