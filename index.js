'use strict';

var mapObj = require('map-obj');

function isObject (v){
	return typeof(v) === 'object';
}

function camelCase(str) {
    return str.replace(/[_.-](\w|$)/g, function (_,x) {
        return x.toUpperCase();
    });
}


function camelCaseRecursive(obj) {
	return mapObj(obj, function(key, val) {
		var newArray = [];

		if (Array.isArray(val)) {

			val.forEach(function(value) {
				if(isObject(value) && !Array.isArray(value)){
					newArray.push(camelCaseRecursive(value));					
				}else{
					newArray.push(value);
				}
			});

			return [camelCase(key), newArray];

		}else if(!val){
			return [camelCase(key), val];
		} else if (isObject(val) && !val instanceof Date) {
			return [camelCase(key), camelCaseRecursive(val)];
		} else {
			return [camelCase(key), val];
		}
	});
}


module.exports = camelCaseRecursive;
