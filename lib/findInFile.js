'use strict';

/**
 * Module dependencies
 */
var fs = require('fs');

/**
 * Helper to find in a single file
 */
function replaceInSingleFile(filePath, findThis, cb) {
  fs.readFile(filePath, 'utf8', function(error, contents) {
    if (error) {
      return cb(error);
    }

    //Find contents and check if any matches
    var occurances = (contents.match(findThis) || []).length;
    return cb(null, occurances);
  });
}

/**
 * Find in file helper
 */
module.exports = function replaceInFile(config, cb) {
  cb = cb || function() {};

  //No array given?
  if (!Array.isArray(config.files)) {
    config.files = [config.files];
    return replaceInFile(config, cb);
  }

  //Initialize helper vars
  var totalFiles = config.files.length;
  var processedFiles = 0;
  var foundInFiles = [];

  if (typeof config.find === 'string') {
    config.find = new RegExp(config.find, 'g');
  }

  //find each file
  config.files.forEach(function(file) {
    replaceInSingleFile(file, config.find, function(error, occurrences) {
      if (error) {
        return cb(error);
      }
      if (occurrences > 0) {
        foundInFiles.push({
          file: file,
          occurrences: occurrences
        });
      }
      processedFiles++;
      if (processedFiles === totalFiles) {
        cb(null, foundInFiles);
      }
    });
  });
};
