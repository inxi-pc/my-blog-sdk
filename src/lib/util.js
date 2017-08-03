function isNullOrEmpty(value) {
  // null or undefined
  if (value == undefined || value == null) {
    return true;
  }

  // empty
  if (Object.prototype.toString.call(value) == '[object String]') {
    if (value.length <= 0) {
      return true;
    }
  }

  return false;
}

export { isNullOrEmpty }
