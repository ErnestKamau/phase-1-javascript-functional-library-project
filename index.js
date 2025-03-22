// Define each function directly and export it

function myEach(collection, callback) {
  // Check if the collection is an array
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      callback(collection[i], i, collection);
    }
  } 
  // Check if it's an object
  else if (typeof collection === 'object' && collection !== null) {
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) {
        callback(collection[key], key, collection);
      }
    }
  }
  
  // Return the original collection as specified
  return collection;
}

function myMap(collection, callback) {
  const result = [];
  
  // We can still use our myEach function
  myEach(collection, function(value, keyOrIndex, collection) {
    result.push(callback(value, keyOrIndex, collection));
  });
  
  return result;
}

function myReduce(collection, callback, initialValue) {
  let accumulator;
  let startIndex = 0;
  
  // If initialValue is not provided, use the first element as the accumulator
  if (initialValue === undefined) {
    if (Array.isArray(collection) && collection.length > 0) {
      accumulator = collection[0];
      startIndex = 1;
    } else if (typeof collection === 'object' && collection !== null) {
      const keys = Object.keys(collection);
      if (keys.length > 0) {
        accumulator = collection[keys[0]];
        startIndex = 1;
      } else {
        // Empty object case
        return undefined;
      }
    } else {
      // Empty array case
      return undefined;
    }
  } else {
    accumulator = initialValue;
  }
  
  // Process the collection
  if (Array.isArray(collection)) {
    for (let i = startIndex; i < collection.length; i++) {
      accumulator = callback(accumulator, collection[i], i, collection);
    }
  } else if (typeof collection === 'object' && collection !== null) {
    const keys = Object.keys(collection);
    for (let i = startIndex; i < keys.length; i++) {
      const key = keys[i];
      accumulator = callback(accumulator, collection[key], key, collection);
    }
  }
  
  return accumulator;
}

function myFind(collection, predicate) {
  let result;
  let found = false;
  
  myEach(collection, function(value, keyOrIndex, collection) {
    if (!found && predicate(value, keyOrIndex, collection)) {
      result = value;
      found = true;
    }
  });
  
  return result;
}

function myFilter(collection, predicate) {
  const result = [];
  
  myEach(collection, function(value, keyOrIndex, collection) {
    if (predicate(value, keyOrIndex, collection)) {
      result.push(value);
    }
  });
  
  return result;
}

function mySize(collection) {
  if (Array.isArray(collection)) {
    return collection.length;
  } else if (typeof collection === 'object' && collection !== null) {
    return Object.keys(collection).length;
  }
  return 0;
}

function myFirst(array, n) {
  if (!Array.isArray(array) || array.length === 0) {
    return undefined;
  }
  
  if (n === undefined) {
    return array[0];
  }
  
  return array.slice(0, n);
}

function myLast(array, n) {
  if (!Array.isArray(array) || array.length === 0) {
    return undefined;
  }
  
  if (n === undefined) {
    return array[array.length - 1];
  }
  
  return array.slice(Math.max(0, array.length - n));
}

function myKeys(object) {
  const keys = [];
  
  if (typeof object === 'object' && object !== null) {
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
  }
  
  return keys;
}

function myValues(object) {
  const values = [];
  
  if (typeof object === 'object' && object !== null) {
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        values.push(object[key]);
      }
    }
  }
  
  return values;
}

// Export all functions
module.exports = {
  myEach,
  myMap,
  myReduce,
  myFind,
  myFilter,
  mySize,
  myFirst,
  myLast,
  myKeys,
  myValues
};