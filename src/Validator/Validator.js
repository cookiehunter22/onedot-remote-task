
const Validator = {

  // Check for Dublicates and Forks
  validateDublicatesAndForks(domains, ranges) {
    const dublicateDomains = [];
    const forkDomains = [];

    for (let index = 0; index < domains.length; index++) {
      const value = domains[index];
      const indexOfFirstOccurence = domains.indexOf(value);
      if (indexOfFirstOccurence !== index) {
        let itterator = indexOfFirstOccurence;

        while (itterator >= 0 && itterator < index) {
          // if they have similar value => Dublicates

          if (ranges[itterator] === ranges[index]) {
            dublicateDomains.push(itterator);
            dublicateDomains.push(index);
          } else {
          // if they are not similar => fork
            forkDomains.push(itterator);
            forkDomains.push(index);
          }
          const nextMatch = domains.indexOf(value, itterator);
          itterator = nextMatch < itterator ? nextMatch : -1;
          // console.log(itterator);
        }
      }
    }
    return {
      dublicateDomains,
      forkDomains,
    };
  },

  // Check for Cycles and Chains
  validateCyclesAndChains(domains, ranges) {
    const chainDomains = [];
    const cycleDomains = [];

    for (let index = 0; index < domains.length; index++) {
      const value = domains[index];
      const appearsInRanges = ranges.indexOf(value);
      if (appearsInRanges >= 0) {
        let itterator = appearsInRanges;
        // if it appears in ranges -> it must be chained
        chainDomains.push(itterator);
        chainDomains.push(index);

        while (itterator >= 0) {
          // if they have match => Cycle

          if (domains[itterator] === ranges[index]) {
            cycleDomains.push(itterator);
            cycleDomains.push(index);
          }
          // } else {
          //   // if they are not similar => Chain
          //   chainDomains.push(itterator);
          //   chainDomains.push(index);
          // }
          // find next uccurence
          const nextMatch = ranges.indexOf(value, itterator);
          itterator = nextMatch < itterator ? nextMatch : -1;
        }
      }
    }

    return {
      cycleDomains,
      chainDomains,
    };
  },


  // domains.filter((value, index) => {
  //   const position = domains.indexOf(value);
  //   if (position !== index) {
  //     if (!dublicateDomainsIndexes.includes(position)) {
  //       dublicateDomainsIndexes.push(position);
  //     }
  //     dublicateDomainsIndexes.push(index);
  //   }
  //   return true;
  // });
  // return domains.filter(this.valueIsDublicate.bind(null, ranges));
  // },

  // valueIsDublicate(ranges, dublicateIndexes, value, index, domains) {
  //   if(dublicateIndexes.includes(index)){

  //   }
  //   return domains.indexOf(value) !== index && ranges[domains.indexOf(value)] === ranges[index];
  // },

  // Check for Forks
  // validateForks(domains, ranges) {
  //   return domains.filter(this.valueIsForked.bind(null, ranges));
  // },

  // valueIsForked(ranges, value, index, domains) {
  //   return domains.indexOf(value) !== index && ranges[domains.indexOf(value)] !== ranges[index];
  // },

  // Check for cycles
  // validateCycle(domains, ranges) {
  //   const emptyArray = [];
  //   domains.filter(this.valueIsCycled.bind(null, ranges, emptyArray));
  //   return emptyArray;
  // },


  // valueIsCycled(ranges, emptyArray, value, index, domains) {
  //   const position = ranges.indexOf(value);
  //   if (position !== -1 && domains[position] === ranges[index] && position !== index) {
  //     emptyArray.push(index);
  //     return true;
  //   }
  //   return false;
  // },

  // // check for chains
  // validateChain(domains, ranges) {
  //   const emptyArray = [];
  //   domains.filter(this.valueIsChained.bind(null, ranges, emptyArray));

  //   return emptyArray;
  // },
  // valueIsChained(ranges, emptyArray, value, index, domains) {
  //   // return dict[dict[value]] !== value && Object.values(dict).includes(value);
  //   const position = ranges.indexOf(value);
  //   if (position !== -1 && domains[position] !== ranges[index]) {
  //     emptyArray.push(index);
  //     return true;
  //   }
  //   return false;
  // },

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
    const { dublicateDomains, forkDomains } = this.validateDublicatesAndForks(domains, ranges);
    const { cycleDomains, chainDomains } = this.validateCyclesAndChains(domains, ranges);


    // add errors and warnings
    pairs.forEach((pair, index) => {
      // dublicate
      if (dublicateDomains.includes(index)) {
        pair.dublicated = true;
        errors = true;
      } else {
        pair.dublicated = false;
      }
      // fork
      if (forkDomains.includes(index)) {
        pair.forked = true;
        errors = true;
      } else {
        pair.forked = false;
      }
      // cycle
      if (cycleDomains.includes(index)) {
        pair.cycled = true;
        errors = true;
      } else {
        pair.cycled = false;
      }
      // chain
      if (chainDomains.includes(index)) {
        pair.chained = true;
        errors = true;
      } else {
        pair.chained = false;
      }
      pair.checked = true;
    });

    return {
      errors,
      newDict,
      pairs,
    };
  },
};

module.exports = Validator;
