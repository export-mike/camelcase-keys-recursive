'use strict';

var mapObj = require('map-obj');
var camelCase = require('camelcase');
var _ = require('lodash');

function camelCaseRecursive(obj) {
	return mapObj(obj, function(key, val) {
		var newArray = [];

		if (_.isArray(val)) {

			val.forEach(function(value) {
				if(_.isObject(value) && !_.isArray(value)){
					newArray.push(camelCaseRecursive(value));					
				}else{
					newArray.push(value);
				}
			});

			return [camelCase(key), newArray];

		} else if (_.isObject(val)) {

			return [camelCase(key), camelCaseRecursive(val)];

		} else {

			return [camelCase(key), val];

		}
	});
}

module.exports = camelCaseRecursive;