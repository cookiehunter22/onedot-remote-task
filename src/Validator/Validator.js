
const Validator = {

  // Check for Forks and Dublicates
  validateDublicates(array) {
    return array.filter(this.valueIsNotUnique);
  },

  valueIsNotUnique(value, index, array) {
    return array.indexOf(value) !== index;
  },

  // Check for cycles
  validateCycle(domains, ranges) {
    const emptyArray = [];
    domains.filter((value, index) => this.valueIsCycled(value, index, domains, ranges, emptyArray));


    return emptyArray;
  },


  valueIsCycled(value, index, domains, ranges, emptyArray) {
    const position = ranges.indexOf(value);
    if (position !== -1 && domains[position] === ranges[index] && position !== index) {
      emptyArray.push(index);
      return true;
    }
    return false;
  },

  // check for chains
  validateChain(domains, ranges) {
    const emptyArray = [];
    domains.filter((value, index) => this.valueIsChained(value, index, domains, ranges, emptyArray));

    return emptyArray;
  },
  valueIsChained(value, index, domains, ranges, emptyArray) {
    // return dict[dict[value]] !== value && Object.values(dict).includes(value);
    const position = ranges.indexOf(value);
    if (position !== -1 && domains[position] !== ranges[index]) {
      emptyArray.push(index);
      return true;
    }
    return false;
  },

  validateAll(pairs) {
    const domains = [];
    const ranges = [];
    const newDict = {};
    let errors = false;

    // splice last empty
    if (pairs[pairs.length - 1].domain === '') pairs.splice(pairs.length - 1, 1);

    pairs.forEach((pair) => {
      domains.push(pair.domain);
      ranges.push(pair.range);
      newDict[pair.domain] = pair.range;
    });
    const dublicateDomains = this.validateDublicates(domains);
    const dublicateRanges = this.validateDublicates(ranges);
    const cycledDomains = this.validateCycle(domains, ranges);
    const chainedDomains = this.validateChain(domains, ranges);


    // add errors and warnings
    pairs.forEach((pair, index) => {
      // dublicate
      const { domain, range } = pair;
      if (dublicateDomains.includes(domain) || dublicateRanges.includes(range)) {
        pair.dublicated = true;
        errors = true;
      } else {
        pair.dublicated = false;
      }
      // cycle
      if (cycledDomains.includes(index)) {
        pair.cycled = true;
        errors = true;
      } else {
        pair.cycled = false;
      }
      // chain
      if (chainedDomains.includes(index)) {
        pair.chained = true;
        errors = true;
      } else {
        pair.chained = false;
      }
    });
    console.log(pairs);

    return {
      errors,
      newDict,
      pairs,
    };
  },
};

module.exports = Validator;
