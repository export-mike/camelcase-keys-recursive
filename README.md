[![npm version](https://badge.fury.io/js/camelcase-keys-recursive.svg)](http://badge.fury.io/js/camelcase-keys-recursive)

[![Build Status](https://travis-ci.org/export-mike/camelcase-keys-recursive.svg)](https://travis-ci.org/export-mike/camelcase-keys-recursive)

### Simple usage: 

	var camelGotHumps = camelCaseRecursive({'test-1':123, 'test-2':{'test-3:':{'test-four':132}}});

	//{ test1: 123, test2: { 'test3:': { testFour: 132 } } }
	console.log(camelGotHumps);

### Works with Arrays too:

	var anotherCamelWithTheHump = camelCaseRecursive({
		'test-1': 123,
		'test-Two': [{
			'test-three': {
				'test-FOUR': [{'test-five':[{testSix:{'test-seven':8}}]}]
			}
		}]
	});

	//{"test1":123,"testTwo":[{"testThree":{"testFOUR":[{"testFive":[{"testSix":{"testSeven":8}}]}]}}]}console.log(
	JSON.stringify(anotherCamelWithTheHump));

### More information on internal modules
[map-obj](https://www.npmjs.com/package/map-obj)