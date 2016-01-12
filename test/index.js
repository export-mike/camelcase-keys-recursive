import {expect} from 'chai';

const camelCaseKeys = require('../src');

describe('Nested keys within arrays and objects are camelCased', () => {

  it('Should camelCase all Snake keys', () => {

    const anotherCamelWithTheHump = camelCaseKeys({
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

  it('Should camelCase all Snake keys - with nulls', () => {

    const anotherCamelWithTheHump = camelCaseKeys({
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

  it('Should handle date values', () => {

    const expected = {
      createdAt: '2015-09-24T13:44:41.553Z'
    };

    const input = {
      created_at: '2015-09-24T13:44:41.553Z'
    };

    expect(camelCaseKeys(input)).deep.equals(expected);

  });

  it('Should handle date within objects', () => {
    const expected = {
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

    const input = {
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

    expect(camelCaseKeys(input)).deep.equals(expected);


  });

});

describe('Handling null root object', () => {

  it('Should not throw Error', () => {
    var fn = function() {
      return camelCaseKeys(null);
    };
    expect(fn).to.not.throw(Error);
  });

  it('Should return null', () => {
    expect(camelCaseKeys(null)).to.be.null;
  });

});

describe('Handling undefined root object', () => {

  it('Should not throw Error', () => {
    var fn = function() {
      return camelCaseKeys(undefined);
    };
    expect(fn).to.not.throw(Error);
  });

  it('Should return undefined', () => {
    expect(camelCaseKeys(undefined)).to.be.undefined;
  });

});

describe('Handling array root object', () => {

  it('Should not throw Error', () => {
    const fn = function testThrowError() {
      return camelCaseKeys([]);
    };
    expect(fn).to.not.throw(Error);
  });

  it('Should return an array', () => {
    expect(camelCaseKeys([])).to.be.instanceof(Array);
  });

  it('Should handle nested objects', () => {
    const expected = [{test1: 123}];
    const actual = camelCaseKeys([{'test-1': 123}]);
    expect(camelCaseKeys(actual)).to.deep.equal(expected);
  });

});
