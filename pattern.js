var patternList = {
  productExposedToRiskSource: {
    name: 'Product Exposed To Risk Source',
    abbreviation: 'PR',
    description: '',
    queryString: `  PREFIX model: <http://uni-ko-ld.de/ist/model#>
    SELECT * WHERE {
     ?process model:hasInputProduct ?product .
     ?process model:hasResource ?resource .
     ?resource model:hasRiskSource ?riskSource.
     ?product model:hasVulnerability ?riskSource.
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
        'Product Exposed To Risk Source is detected process.' +
        'The process ' +
        queryResult.get('?process').value +
        'uses the resource ' +
        queryResult.get('?resource').value +
        'that has the risk source ' +
        queryResult.get('?risk source').value +
        '.' +
        'The product ' +
        queryResult.get('?product').value +
        ' is vunlerable to  ' +
        queryResult.get('?riskSource').value
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
