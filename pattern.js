var patternList = {
  inputOutputMismatch: {
    name: 'Input Output Mismatch',
    description: '',
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
