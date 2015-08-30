'use strict';

var mapObj = require('map-obj');

var internals = {};

function camelCaseRecursive(obj) {
	return mapObj(obj, function(key, val) {
		var newArray = [];

		if (Array.isArray(val)) {

			val.forEach(function(value) {
				if(internals.isObject(value) && !Array.isArray(value)){
					newArray.push(camelCaseRecursive(value));					
				}else{
					newArray.push(value);
				}
			});

			return [internals.camelCase(key), newArray];

		}else if(!val){
			return [internals.camelCase(key), val];
		} 
		else if (internals.isObject(val)) {

			return [internals.camelCase(key), camelCaseRecursive(val)];

		} else {

			return [internals.camelCase(key), val];

		}
	});
}

internals.isObject = function (v){
	return typeof(v) === 'object';
}

internals.camelCase = function(str) {
    return str.replace(/[_.-](\w|$)/g, function (_,x) {
        return x.toUpperCase();
    });
}

module.exports = camelCaseRecursive;