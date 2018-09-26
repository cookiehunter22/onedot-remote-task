const assert = require('assert');
const Validator = require('../src/Validator/Validator');

describe('Test Validator functions', () => {
  describe('function validateDublicatesAndForks', () => {
    it('Returns list of dublicates', () => {
      const domains = [
        'Stonegrey',
        'Stonegrey',
        'Midnight Black',
        'Midnight Black',
      ];
      const ranges = [
        'Dark Grey',
        'Dark Grey',
        'Black',
        'Black',
      ];

      const result = Validator.validateDublicatesAndForks(domains, ranges).dublicateDomains;


      assert.deepEqual(result, [0, 1, 2, 3]);
    });
    it('Returns empty list of there is no dublicates', () => {
      const domains = [
        'Stonegrey',
        'Midnight Black',
      ];
      const ranges = [
        'Dark Grey',
        'Black',
      ];

      const result = Validator.validateDublicatesAndForks(domains, ranges).dublicateDomains;

      assert.deepEqual(result, []);
    });
    it('Returns array of indexes of forked domains', () => {
      const domains = [
        'Stonegrey',
        'Stonegrey',
        'Midnight Black',
        'Midnight Black',
      ];
      const ranges = [
        'Dark Grey',
        'Black',
        'White',
        'Red',
      ];

      const result = Validator.validateDublicatesAndForks(domains, ranges).forkDomains;

      assert.deepEqual(result, [0, 1, 2, 3]);
    });
  });
  describe('function validateCyclesAndChains', () => {
    it('Returns list of cycled domains', () => {
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

      const result = Validator.validateCyclesAndChains(domains, ranges).cycleDomains;


      assert.deepEqual(result.includes(0), result.includes(1));
    });

    it('Returns array of indexes of chained domains', () => {
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

      const result = Validator.validateCyclesAndChains(domains, ranges).chainDomains;


      assert.ok(result.includes(0) && result.includes(1));
    });
  });
  // describe('function validateCycle', () => {
  //   it('Returns list of domain indexes cycled in dict', () => {
  //     const domains = [
  //       'Stonegrey',
  //       'Dark Grey',
  //       'Midnight Blue',
  //     ];

  //     const ranges = [
  //       'Dark Grey',
  //       'Stonegrey',
  //       'Dark Blue',
  //     ];


  //     const result = Validator.validateCycle(domains, ranges);

  //     assert.deepEqual(result, [0, 1]);
  //   });
  // });
  // describe('function validateChain', () => {
  //   it('Returns list of domain indexes chained in dic', () => {
  //     const domains = [
  //       'Stonegrey',
  //       'Dark Grey',
  //       'Midnight Blue',
  //     ];

  //     const ranges = [
  //       'Dark Grey',
  //       'Anthracite',
  //       'Dark Blue',
  //     ];


  //     const result = Validator.validateChain(domains, ranges);

  //     assert.deepEqual(result, [1]);
  //   });
  // });
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
