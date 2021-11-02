var patternList = {
  productExposedToRiskSource: {
    name: 'Product Exposed To Risk Source',
    abbreviation: 'PER',
    description: 'A product is exposed to a risk source and may be harmed',
    queryString: `
    PREFIX model: <http://uni-ko-ld.de/ist/model#>
    SELECT * WHERE {
     ?process model:hasInputProduct ?product .
     ?process model:hasResource ?resource .
     ?resource model:hasRiskSource ?riskSource .
     ?product model:hasVulnerability ?riskSource .
    }`,

    affectedElements: (queryResult) => {
      return [
        queryResult.get('?process').value,
        queryResult.get('?product').value,
        queryResult.get('?resource').value,
        queryResult.get('?riskSource').value,
      ];
    },

    reason: (queryResult, resolver) => {
      return (
        'The process ' +
        resolver.resolve('?process', queryResult, resolver) +
        ' uses the resource ' +
        resolver.resolve('?resource', queryResult, resolver) +
        ' that has the risk source ' +
        resolver.resolve('?riskSource', queryResult, resolver) +
        '.' +
        ' The product ' +
        resolver.resolve('?product', queryResult, resolver) +
        ' is vunlerable to ' +
        resolver.resolve('?riskSource', queryResult, resolver)
      );
    },
  },

  resourceExposedToRiskSource: {
    name: 'Resource Exposed To Risk Source',
    abbreviation: 'RER',
    description: 'A resource is exposed to a risk source and may be harmed',
    queryString: `
    PREFIX model: <http://uni-ko-ld.de/ist/model#>
    SELECT * WHERE {
     ?process model:hasResource ?resource .
     ?process model:hasResource ?resource2 .
     ?resource model:hasRiskSource ?riskSource .
     ?resource2 model:hasVulnerability ?riskSource .
    }`,

    affectedElements: (queryResult) => {
      return [
        queryResult.get('?process').value,
        queryResult.get('?resource').value,
        queryResult.get('?resource2').value,
        queryResult.get('?riskSource').value,
      ];
    },

    reason: (queryResult, resolver) => {
      return (
        'The process ' +
        resolver.resolve('?process', queryResult, resolver) +
        ' uses the resource ' +
        resolver.resolve('?resource2', queryResult, resolver) +
        ' that has the risk source ' +
        resolver.resolve('?riskSource', queryResult, resolver) +
        '.' +
        ' The resource ' +
        resolver.resolve('?resource2', queryResult, resolver) +
        ' is vunlerable to ' +
        resolver.resolve('?riskSource', queryResult, resolver)
      );
    },
  },

  unconstraintChangedProperty: {
    name: 'Unconstraint Changed Property',
    abbreviation: 'UCP',
    description: 'A property is changed and has no constraint',
    queryString: `
    PREFIX model: <http://uni-ko-ld.de/ist/model#>
    SELECT * WHERE {
     ?process model:hasResource ?resource .
     ?resource model:changesProperty ?property .
     MINUS {?process model:hasConstraint ?property .}
    }`,

    affectedElements: (queryResult) => {
      return [
        queryResult.get('?process').value,
        queryResult.get('?resource').value,
        queryResult.get('?property').value,
      ];
    },

    reason: (queryResult, resolver) => {
      return (
        'The process ' +
        resolver.resolve('?process', queryResult, resolver) +
        ' uses the resource ' +
        resolver.resolve('?resource', queryResult, resolver) +
        ' that changes the property ' +
        resolver.resolve('?property', queryResult, resolver) +
        '.' +
        ' This property is unconstraint.'
      );
    },
  },

  unmeasuredChangedProperty: {
    name: 'Unmeasured Changed Property',
    abbreviation: 'UMP',
    description: 'A property is changed and has no measurement',
    queryString: `
    PREFIX model: <http://uni-ko-ld.de/ist/model#>
    SELECT * WHERE {
     ?process model:hasResource ?resource .
     ?resource model:changesProperty ?property .
     MINUS {?process model:hasMeasurement ?property .}
    }`,

    affectedElements: (queryResult) => {
      return [
        queryResult.get('?process').value,
        queryResult.get('?resource').value,
        queryResult.get('?property').value,
      ];
    },

    reason: (queryResult, resolver) => {
      return (
        'The process ' +
        resolver.resolve('?process', queryResult, resolver) +
        ' uses the resource ' +
        resolver.resolve('?resource', queryResult, resolver) +
        ' that changes the property ' +
        resolver.resolve('?property', queryResult, resolver) +
        '.' +
        ' This property is unmeasured.'
      );
    },
  },

  unusedMeasurement: {
    name: 'Unused Measurement',
    abbreviation: 'UUM',
    description:
      'A measurement is not used. Set a constraint for the measured value.',
    queryString: `
    PREFIX model: <http://uni-ko-ld.de/ist/model#>
    SELECT * WHERE {
     ?process model:hasResource ?resource .
     ?resource model:hasMeasurement ?measurement .
     MINUS {?process model:hasConstraint ?measurement .}
    }`,

    affectedElements: (queryResult) => {
      return [
        queryResult.get('?process').value,
        queryResult.get('?resource').value,
        queryResult.get('?measurement').value,
      ];
    },

    reason: (queryResult, resolver) => {
      return (
        'The process ' +
        resolver.resolve('?process', queryResult, resolver) +
        ' has the measurement ' +
        resolver.resolve('?measurement', queryResult, resolver) +
        '.' +
        ' This measurement is unused.'
      );
    },
  },

  inputOutputMismatch: {
    name: 'Input Output Mismatch',
    abbreviation: 'IO',
    description:
      'Two processes are connected. The first process produces a product and the second process does not use the product as an input. This can be due to misconfiguration.',
    queryString: `
      PREFIX model: <http://uni-ko-ld.de/ist/model#>
      SELECT * WHERE {
       ?process model:hasOutputProduct ?product .
       ?process model:hasNextProcess ?nextProcess .
       MINUS {?nextProcess model:hasInputProduct ?product .}
      }`,

    affectedElements: (queryResult) => {
      return [
        queryResult.get('?process').value,
        queryResult.get('?product').value,
        queryResult.get('?nextProcess').value,
      ];
    },

    reason: (queryResult, resolver) => {
      return (
        'Input Output Mismatch is detected between process  ' +
        resolver.resolve('?process', queryResult, resolver) +
        ' and ' +
        resolver.resolve('?nextProcess', queryResult, resolver) +
        '.' +
        ' Product ' +
        resolver.resolve('?product', queryResult, resolver) +
        ' is produced by ' +
        resolver.resolve('?process', queryResult, resolver) +
        ' but not acccepted by ' +
        resolver.resolve('?nextProcess', queryResult, resolver)
      );
    },
  },
};
