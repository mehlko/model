var testArray=["Hallo:)"];

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

    reason: (queryResult) => {
      return (
        'The process ' +
        queryResult.get('?process').value +
        ' uses the resource ' +
        queryResult.get('?resource').value +
        ' that has the risk source ' +
        queryResult.get('?riskSource').value +
        '.' +
        ' The product ' +
        queryResult.get('?product').value +
        ' is vunlerable to ' +
        queryResult.get('?riskSource').value
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
     ?product model:hasRiskSource ?riskSource .
     ?resource model:hasVulnerability ?riskSource2 .
    }`,

    affectedElements: (queryResult) => {
      return [
        queryResult.get('?process').value,
        queryResult.get('?product').value,
        queryResult.get('?resource').value,
        queryResult.get('?riskSource').value,
      ];
    },

    reason: (queryResult) => {
      return (
        'The process ' +
        queryResult.get('?process').value +
        ' uses the product ' +
        queryResult.get('?product').value +
        ' that has the risk source ' +
        queryResult.get('?riskSource').value +
        '.' +
        ' The resource ' +
        queryResult.get('?resource').value +
        ' is vunlerable to ' +
        queryResult.get('?riskSource').value
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

    reason: (queryResult) => {
      return (
        'The process ' +
        queryResult.get('?process').value +
        ' uses the resource ' +
        queryResult.get('?resource').value +
        ' that changes the property ' +
        queryResult.get('?property').value +
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

    reason: (queryResult) => {
      return (
        'The process ' +
        queryResult.get('?process').value +
        ' uses the resource ' +
        queryResult.get('?resource').value +
        ' that changes the property ' +
        queryResult.get('?property').value +
        '.' +
        ' This property is unmeasured.'
      );
    },
  },

  unusedMeasurement: {
    name: 'Unused Measurement',
    abbreviation: 'UUM',
    description: 'A resource is exposed to a risk source and may be harmed',
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

    reason: (queryResult) => {
      return (
        'The process ' +
        queryResult.get('?process').value +
        ' has the measurement ' +
        queryResult.get('?measurement').value +
        '.' +
        ' This measurement is unmeasured.'
      );
    },
  },

  inputOutputMismatch: {
    name: 'Input Output Mismatch',
    abbreviation: 'IO',
    description:
      'Two processes are connected. The first process produces a product and the second process does not use this product as an input. This can be a misconfiguration.',
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

    reason: (queryResult) => {
      return (
        'Input Output Mismatch is detected between process  ' +
        queryResult.get('?process').value +
        ' and ' +
        queryResult.get('?nextProcess').value +
        '.' +
        'Product ' +
        queryResult.get('?product').value +
        ' is produced by ' +
        queryResult.get('?process').value +
        ' but not acccepted by ' +
        queryResult.get('?nextProcess').value
      );
    },
  },
};
