'use strict';

var expect = require('chai').expect;

var CamelCaseKeysRecursive = require('../');

describe('Nested keys within arrays and objects are camelCased', function() {

	it('Should camelCase all Snake keys', function() {

		var anotherCamelWithTheHump = CamelCaseKeysRecursive({
			'test-1': 123,
			'test-Two': [{
				'test-three': {
					'test-FOUR': [{
						'test-five': [{
							'test-six': {
								'test-seven': [1, 4, [1, 2, '3', 'four', 'five-one']]
							}
						}]
					}]
				}
			}]
		});

		expect(anotherCamelWithTheHump).deep.equals({
			test1: 123,
			testTwo: [{
				testThree: {
					testFour: [{
						testFive: [{
							testSix: {
								testSeven: [1, 4, [1, 2, '3', 'four', 'five-one']]
							}
						}]
					}]
				}
			}]
		});

	});

});
