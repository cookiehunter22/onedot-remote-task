const assert = require('assert');
const Validator = require('../src/Validator/Validator');

describe('Test Validator functions', () => {
  describe('function validateDublicates', () => {
    it('Returns list of dublicates', () => {
      const keysArray = [
        'Stonegrey',
        'Stonegrey',
        'Midnight Black',
        'Midnight Black',
      ];

      const result = Validator.validateDublicates(keysArray);

      assert.deepEqual(result, ['Stonegrey', 'Midnight Black']);
    });
    it('Returns empty list of there is no dublicates', () => {
      const keysArray = [
        'Stonegrey',
        'Midnight Black',
      ];

      const result = Validator.validateDublicates(keysArray);

      assert.deepEqual(result, []);
    });
  });
  describe('function validateCycle', () => {
    it('Returns list of domain indexes cycled in dict', () => {
      const domains = [
        'Stonegrey',
        'Dark Grey',
        'Midnight Blue',
      ];

      const ranges = [
        'Dark Grey',
        'Stonegrey',
        'Dark Blue',
      ];


      const result = Validator.validateCycle(domains, ranges);

      assert.deepEqual(result, [0, 1]);
    });
  });
  describe('function validateChain', () => {
    it('Returns list of domain indexes chained in dic', () => {
      const domains = [
        'Stonegrey',
        'Dark Grey',
        'Midnight Blue',
      ];

      const ranges = [
        'Dark Grey',
        'Anthracite',
        'Dark Blue',
      ];


      const result = Validator.validateChain(domains, ranges);

      assert.deepEqual(result, [1]);
    });
  });
  describe('function validateAll', () => {
    it('Returns object with errors (if there is any), pairs and dict object', () => {
      const pairs = [
        {
          domain: 'Stonegrey',
          range: 'Dark Grey',
        },
        {
          domain: 'Dark Grey',
          range: 'Anthracite',
        },
      ];


      const result = Validator.validateAll(pairs);

      assert.deepEqual(result.errors, true);
      assert.ok(result.newDict);
      assert.ok(result.pairs);
    });
    it('Returns object without errors (if there is none), pairs and dict object', () => {
      const pairs = [
        {
          domain: 'Stonegrey',
          range: 'Dark Grey',
        },
        {
          domain: 'New Item',
          range: 'Anthracite',
        },
      ];


      const result = Validator.validateAll(pairs);

      assert.deepEqual(result.errors, false);
      assert.ok(result.newDict);
      assert.ok(result.pairs);
    });
  });
});
