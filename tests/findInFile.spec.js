'use strict';

/**
 * Specifications
 */
describe('Find in file(s)', function() {

  //Get modules
  var find = require('../lib/findInFile');
  var jf = require('jsonfile');
  var fs = require('fs');

  //Test JSON
  var testJson1 = {
    test: 'a re place c'
  };
  var testJson2 = {
    test: 'a re place conjs la re place is lorem'
  };
  var testRegex = /re\splace/g;
  var testString = 're place';

  /**
   * Prepare test files
   */
  beforeEach(function() {
    jf.writeFileSync('test1.json', testJson1);
    jf.writeFileSync('test2.json', testJson2);
  });

  /**
   * Clean up test files
   */
  afterEach(function() {
    fs.unlinkSync('test1.json');
    fs.unlinkSync('test2.json');
  });

  /**
   * Replace in one file
   */
  it('should find contents in a single file', function(done) {
    find({
      files: 'test1.json',
      find: testRegex
    }, function(error, files) {
      expect(files[0].file).toBe('test1.json');
      expect(files[0].occurrences).toBe(1);
      done();
    });
  });

  /**
   * Replace in multiple file
   */
  it('should find contents in an array of files', function(done) {
    find({
      files: ['test1.json', 'test2.json'],
      find: testRegex
    }, function(error, files) {

      var firstMatch = files.filter(function(file) {
        return file.file === 'test1.json';
      })[0];
      expect(firstMatch.file).toBe('test1.json');
      expect(firstMatch.occurrences).toBe(1);

      var secondMatch = files.filter(function(file) {
        return file.file === 'test2.json';
      })[0];
      expect(secondMatch.file).toBe('test2.json');
      expect(secondMatch.occurrences).toBe(2);

      done();
    });
  });

  /**
   * Replace in multiple file
   */
  it('should work with strings too', function(done) {
    find({
      files: ['test1.json', 'test2.json'],
      find: testString
    }, function(error, files) {
      var firstMatch = files.filter(function(file) {
        return file.file === 'test1.json';
      })[0];
      expect(firstMatch.file).toBe('test1.json');
      expect(firstMatch.occurrences).toBe(1);

      var secondMatch = files.filter(function(file) {
        return file.file === 'test2.json';
      })[0];
      expect(secondMatch.file).toBe('test2.json');
      expect(secondMatch.occurrences).toBe(2);

      done();
    });
  });

});
