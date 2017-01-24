"use strict";

exports.replace = function(translation, replacements) {
  if(typeof replacements !== 'object') {
    replacements = {};
  }

  return translation.replace(/\{\w+\}/g, function (placeholder) {
    var key = placeholder.replace('{', '').replace('}', '');

    if(replacements[key] !== undefined) {
      return replacements[key];
    }

    return placeholder;
  })
};
