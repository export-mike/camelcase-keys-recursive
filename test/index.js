'use strict';

var expect = require('chai').expect;

var camelCaseKeys = require('../');

describe('Nested keys within arrays and objects are camelCased', function() {

	it('Should camelCase all Snake keys', function() {

		var anotherCamelWithTheHump = camelCaseKeys({
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
					testFOUR: [{
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

	it('Should camelCase all Snake keys - with nulls', function() {

		var anotherCamelWithTheHump = camelCaseKeys({
			'test-1': null,
			'test-Two': [{
				'test-three': {
					'test-FOUR': [{
						'test-five': [{
							'test-six': {
								'test-seven': [1, 4, [1, undefined, '3', 'four', 'five-one']]
							}
						}]
					}]
				}
			}]
		});

		expect(anotherCamelWithTheHump).deep.equals({
			test1: null,
			testTwo: [{
				testThree: {
					testFOUR: [{
						testFive: [{
							testSix: {
								testSeven: [1, 4, [1, undefined, '3', 'four', 'five-one']]
							}
						}]
					}]
				}
			}]
		});

	});

	it('Should handle date values', function(){

		var expected = {
			createdAt:'2015-09-24T13:44:41.553Z'
		};

		var input = {
			created_at:'2015-09-24T13:44:41.553Z'
		};

		expect(expected).deep.equals(camelCaseKeys(input));

	});

	it('Should handle date within objects', function(){
		var expected = {
			store: {
				total: '210.00',
				count: '1'
			},
			user: {
				lastOrder: {
					id: '1',
					status: 3,
					userId: '82',
					customerId: '6100',
					storeId: '12',
					externalId: '2015-09-22T14:38:01.201Z',
					createdAt: '2015-09-24T13:44:41.553Z',
					price: '210.00',
					pricePaid: '210.00',
					currencyIso: 'GBP',
					details: null,
					deleted: false
				}
			}
		};

		var input = {
			store: {
				total: '210.00',
				count: '1'
			},
			user: {
				lastOrder: {
					id: '1',
					status: 3,
					user_id: '82',
					customer_id: '6100',
					store_id: '12',
					external_id: '2015-09-22T14:38:01.201Z',
					created_at: '2015-09-24T13:44:41.553Z',
					price: '210.00',
					price_paid: '210.00',
					currency_iso: 'GBP',
					details: null,
					deleted: false
				}
			}
		};

		expect(expected).deep.equals(camelCaseKeys(input));


	});

});
