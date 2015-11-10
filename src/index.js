import mapObj from 'map-obj';

const isObject = (v) => typeof(v) === 'object';

const camelCase = (str) => str.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase());

const bob = {
  name: 'bob'
};

bob.name = 'tim';

function camelCaseRecursive(obj) {
  return mapObj(obj, (key, val) => {
    const newArray = [];

    if (Array.isArray(val)) {
      val.forEach((value) => {
        if (isObject(value) && !Array.isArray(value)) {
          newArray.push(camelCaseRecursive(value));
        } else {
          newArray.push(value);
        }
      });

      return [camelCase(key), newArray];
    } else if (!val) {
      return [camelCase(key), val];
    } else if (val instanceof Date) {
      return [camelCase(key), val];
    } else if (isObject(val)) {
      return [camelCase(key), camelCaseRecursive(val)];
    }

    return [camelCase(key), val];
  });
}

export default camelCaseRecursive;
