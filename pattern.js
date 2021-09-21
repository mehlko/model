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
      } LIMIT 10`,
    affectedElements: (queryResult) => {
      return [
        queryResult.get('?process').value,
        queryResult.get('?product').value,
      ];
    },
    reason: (queryResult) => {
      return (
        queryResult.get('?process').value +
        ' ' +
        queryResult.get('?product').value
      );
    },
  },
};
