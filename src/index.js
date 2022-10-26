import mapObj from 'map-obj';

const isObject = (v) => typeof(v) === 'object';

const camelCase = (str) => str.replace(/[ _.-](\w|$)/g, (_, x) => x.toUpperCase());

function objectValues(obj) {
  return Object.keys(obj).map(function(key) {
    return obj[key];
  });
}

function camelCaseRecursive(obj, cache) {
  if (!cache) {
    cache = new WeakMap();
  }
  let res;
  if (obj !== null && isObject(obj)) {
    if (cache.has(obj)) {
      return cache.get(obj);
    }
    if (Array.isArray(obj)) {
      res = [];
    } else {
      res = {};
    }
    cache.set(obj, res);
  }

  const transform = obj == null ? obj : mapObj(obj, (key, val) => {
    const newArray = [];

    if (Array.isArray(val)) {
      val.forEach((value) => {
        if (isObject(value) && !Array.isArray(value)) {
          newArray.push(camelCaseRecursive(value, cache));
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
      return [camelCase(key), camelCaseRecursive(val, cache)];
    }

    return [camelCase(key), val];
  });

  if (obj !== null && isObject(obj)) {
    // mutate the entry in the cache so that self-references still line up
    if (Array.isArray(obj)) {
      objectValues(transform).forEach(entry => res.push(entry));
    } else {
      Object.entries(transform).forEach(([k, v]) => res[k] = v);
    }

    return res;
  }

  return transform;

}

export default camelCaseRecursive;
