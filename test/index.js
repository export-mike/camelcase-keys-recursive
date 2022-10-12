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

  it('Should camelCase keys with white spaces', () => {

    const anotherCamelWithTheHump = camelCaseKeys({
      'test 1': 123,
      'test-Two': [{
        'test three': {
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

});

describe('Circular references', () => {
  it('Should handle objects with circular references', () => {
    const parent = {
      my_name: 'parent',
    };
    parent.child = parent;

    const selfReferentialCamel = camelCaseKeys(parent);

    expect(Object.keys(selfReferentialCamel)).deep.equals(['myName', 'child']);
    expect(Object.keys(selfReferentialCamel.child)).deep.equals(['myName', 'child']);
    expect(selfReferentialCamel).to.equal(selfReferentialCamel.child);
  });

  it('Should handle objects with circular references in their children', () => {
    const parent = {
      name: 'parent',
    };
    const child = {
      name: 'child',
      my_own_parent: parent,
    }
    parent.child = child;

    const selfReferentialCamel = camelCaseKeys(parent);

    expect(Object.keys(selfReferentialCamel)).deep.equals(['name', 'child']);
    expect(Object.keys(selfReferentialCamel.child)).deep.equals(['name', 'myOwnParent']);
    expect(selfReferentialCamel).to.equal(selfReferentialCamel.child.myOwnParent);
  });

  it('Should handle arrays with objects with circular references in their children', () => {
    const parent = {
      name: 'parent',
    };
    const child = {
      name: 'child',
      my_own_parent: parent,
    }
    parent.child = child;

    const selfReferentialCamel = camelCaseKeys([parent]);

    expect(selfReferentialCamel).to.have.lengthOf(1);
    expect(Object.keys(selfReferentialCamel[0])).deep.equals(['name', 'child']);
    expect(Object.keys(selfReferentialCamel[0].child)).deep.equals(['name', 'myOwnParent']);
    expect(selfReferentialCamel[0]).to.equal(selfReferentialCamel[0].child.myOwnParent);
  });

  it('Should handle objects with circular references in arrays of their children', () => {
    const parent = {
      name: 'parent',
    };
    const child = {
      name: 'child',
      my_own_parent: parent,
    }
    parent.children = [child, child];

    const selfReferentialCamel = camelCaseKeys(parent);

    expect(Object.keys(selfReferentialCamel)).deep.equals(['name', 'children']);
    expect(Object.keys(selfReferentialCamel.children)).to.have.lengthOf(2);
    expect(Object.keys(selfReferentialCamel.children[0])).deep.equals(['name', 'myOwnParent']);
    expect(Object.keys(selfReferentialCamel.children[1])).deep.equals(['name', 'myOwnParent']);
    expect(selfReferentialCamel).to.equal(selfReferentialCamel.children[0].myOwnParent);
    expect(selfReferentialCamel).to.equal(selfReferentialCamel.children[1].myOwnParent);
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
