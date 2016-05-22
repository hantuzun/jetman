exports.functionBody = function (fn) {
    return fn.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];
}
