class Pattern extends React.Component {
  constructor(props) {
    super(props);
    this.patternName = '';
    this.description = '';
    this.queryString = '';
    this.state = {
      result: []
    };
  }

  componentDidMount() {
    this.detectProblem();
  }

  generateId() {}

  getName(res, parameter) {
    return res
      .get(parameter)
      .value.toString()
      .split('#')
      .pop();
  }

  getKey(result) {
    return result.map(entry => entry.value).join('');
  }

  detectProblem() {
    var that = this;
    Comunica.newEngine()
      .query(this.queryString, {
        sources: [
          'https://mehlko.github.io/models/inputModel.ttl',
          'https://mehlko.github.io/models/modelSmall.ttl'
        ]
      })
      .then(function(result) {
        //read results
        result.bindingsStream.on('data', data => {
          log(data);
          that.setState({
            result: that.state.result.concat(data)
          });
        });
        result.bindingsStream.on('error', error => {
          console.error(error);
        });
        result.bindingsStream.on('end', () => {
          log('query finished');
        });
      });
  }

  render() {
    return <div />;
  }
}

class PatternInputOutputMismatch extends Pattern {
  constructor(props) {
    super(props);

    this.patternName = 'Input Output Mismatch';
    this.description = '';
    this.queryString = `
      PREFIX model: <http://uni-ko-ld.de/ist/model#>
      SELECT * WHERE {
       ?process model:hasOutputProduct ?product .
       ?process model:hasNextProcess ?nextProcess .
       MINUS {?nextProcess model:hasInputProduct ?product .}
      } LIMIT 10`;
  }

  mitigateProblem() {}

  render() {
    return (
      <ul>
        {this.state.result.map(res => (
          <li key={this.getKey(res)}>
            {this.patternName +
              ' ' +
              this.getName(res, '?process') +
              ' ' +
              this.getName(res, '?product') +
              ' ' +
              this.getName(res, '?nextProcess')}
          </li>
        ))}
      </ul>
    );
  }
}
