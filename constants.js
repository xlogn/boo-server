function isNullOrUndefinedOrEmpty(obj) {
    return obj == null || (Object.keys(obj).length === 0 && obj.constructor === Object);
}

exports.isNullOrUndefinedOrEmpty = isNullOrUndefinedOrEmpty;