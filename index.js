var mapObj = require('map-obj');
var camelCase = require('camelcase');
var isArray = require('isarray');

function camelCaseRecursive(obj) {
	return mapObj(obj, function(key, val) {
		var newArray = [];

		if (isArray(val)) {

			val.forEach(function(value) {
				newArray.push(camelCaseRecursive(value));
			});

			return [camelCase(key), newArray];
		
		} else if (typeof(val) === 'object') {
		
			return [camelCase(key), camelCaseRecursive(val)];
		
		} else {
		
			return [camelCase(key), val];
		
		}
	});
}

module.exports = camelCaseRecursive;