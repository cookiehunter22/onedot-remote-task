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
    it('Returns list of values cycled in dict', () => {
      const inputDict = {
        Stonegrey: 'Dark Grey',
        'Dark Grey': 'Stonegrey',
        'Midnight Blue': 'Dark Blue',
      };


      const result = Validator.validateCycle(inputDict);

      assert.deepEqual(result, ['Stonegrey', 'Dark Grey']);
    });
  });
  describe('function validateChain', () => {
    it('Returns list of values chained in dic', () => {
      const inputDict = {
        Stonegrey: 'Dark Grey',
        'Dark Grey': 'Anthracite',
        'Midnight Blue': 'Dark Blue',
      };

      const result = Validator.validateChain(inputDict);

      assert.deepEqual(result, ['Dark Grey']);
    });
  });
});
