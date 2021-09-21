var queryString1 = `SELECT ?articleId ?groupDescription WHERE {?articleId <https://www.etim-international.com/#hasGroupId> ?groupId. ?groupId <https://www.etim-international.com/#hasGroupDescription> ?groupDescription.} LIMIT 10`;
var queryString2 = `SELECT ?articleId ?groupId WHERE {?articleId <https://www.etim-international.com/#hasGroupId> ?groupId.} LIMIT 10`;
Comunica.newEngine()
  .query(queryString1, {
    sources: ['https://mehlko.github.io/models/model.ttl'],
  })
  .then(function (result) {
    //print result
    result.bindingsStream.on('data', function (data) {
      var result = '';
      for (o in data._root.entries) {
        result +=
          ' ' +
          data._root.entries[o][0] +
          ' = ' +
          data._root.entries[o][1].value +
          ';';
      }
      console.log(result);
    });
  });
this.queryString =
  'SELECT ?articleId ?groupDescription WHERE {?articleId <https://www.etim-international.com/#hasGroupId> ?groupId. ?groupId <https://www.etim-international.com/#hasGroupDescription> ?groupDescription.} LIMIT 10';
this.setState({
  options: tempOptions.map((option) => {
    return {
      labels: this.props.store
        .getObjects(
          option,
          namedNode('http://www.w3.org/2000/01/rdf-schema#label')
        )
        .map((label) => label.value),
      id: option.id.value,
      type: 'http://uni-ko-ld.de/ist/model#Product',
    };
  }),
});
