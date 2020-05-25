"use strict";
exports.__esModule = true;
exports.isObject = exports.isDate = void 0;
var toString = Object.prototype.toString;
function isDate(val) {
    return toString.call(val) === '[object Date]';
}
exports.isDate = isDate;
function isObject(val) {
    return toString.call(val) === '[object Object]';
}
exports.isObject = isObject;
