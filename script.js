//models are here: https://github.com/mehlko/models

const logLevel = 1;
const {
  Button,
  Alert,
  Autocomplete,
  TextField,
  createFilterOptions
} = MaterialUI;

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: option => option.label
});

class MyAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
    this.queryThrottled = _.throttle(this.query, 200);
  }

  query(value) {
    log('juhu');
    var that = this;
    var queryString = `
    PREFIX etim: <https://www.etim-international.com/#>
    SELECT ?id ?name WHERE {
     ?id etim:hasSynonym ?name .
     FILTER (STRSTARTS(?name, "${value}"))
    } LIMIT 10`;

    Comunica.newEngine()
      .query(queryString, {
        sources: ['https://mehlko.github.io/models/model.ttl']
      })
      .then(function(result) {
        log(result);
        that.setState({
          options: []
        });
        //read results
        result.bindingsStream.on('data', data => {
          log(data);
          var newOption = {
            label: data.get('?name').value,
            id: data.get('?id').value
          };
          log(newOption);
          that.setState({
            options: that.state.options.concat(newOption)
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
    return (
      <Autocomplete
        id={this.props.processId}
        className="search"
        disableCloseOnSelect
        clearOnBlur
        clearOnEscape
        options={this.state.options}
        disableCloseOnSelect
        getOptionLabel={option => option.label}
        onInputChange={(event, newInputValue) => {
          this.queryThrottled(newInputValue);
        }}
        renderInput={params => (
          <TextField {...params} placeholder="Type to search" />
        )}
        noOptionsText=""
        renderOption={(props, option, { selected }) => {
          log(props);
          return (
            <li {...props} onClick={event => {}}>
              {option.label}{' '}
              <Button
                variant="contained"
                size="small"
                onClick={() => this.props.onAddInput(option.label)}
              >
                + Input
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => this.props.onAddOutput(option.label)}
              >
                + Output
              </Button>
            </li>
          );
        }}
      />
    );
  }
}

class ProductionLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productionLine: {
        processes: []
      }
    };
    this.addInput = this.addInput.bind(this);
    this.analyze = this.analyze.bind(this);
  }

  analyze() {
    log(this.state.productionLine);
  }

  addInput(processId, value) {
    //make copy
    var temp = { ...this.state.productionLine };
    if (!temp.processes[processId].inputs) {
      temp.processes[processId].inputs = [];
    }
    //update
    temp.processes[processId].inputs = [
      ...temp.processes[processId].inputs,
      {
        name: value
      }
    ];
    //set state
    this.setState({
      productionLine: temp
    });
  }
  addOutput(processId, value) {
    //make copy
    var temp = { ...this.state.productionLine };
    if (!temp.processes[processId].outputs) {
      temp.processes[processId].outputs = [];
    }
    //update
    temp.processes[processId].outputs = [
      ...temp.processes[processId].outputs,
      {
        name: value
      }
    ];
    //set state
    this.setState({
      productionLine: temp
    });
  }

  addProcess() {
    //make copy
    var temp = { ...this.state.productionLine };

    //update
    temp.processes = [
      ...temp.processes,
      {
        name: 'test'
      }
    ];
    //set state
    this.setState({
      productionLine: temp
    });
  }

  render() {
    return (
      <div className="productionLine">
        <h1>Production Line Analyzer</h1>
        <Button variant="contained" onClick={() => this.addProcess()}>
          Add Process
        </Button>
        <Button variant="contained" onClick={() => this.analyze()}>
          Analyze
        </Button>
        {this.state.productionLine.processes &&
          this.state.productionLine.processes.map((proc, procId) => (
            <div className="process" key={'process' + procId}>
              <div className="name">{proc.name + procId}</div>
              <MyAutocomplete
                processId={procId}
                onAddInput={this.addInput.bind(this, procId)}
                onAddOutput={this.addOutput.bind(this, procId)}
              />
              <div className="inputs">
                {proc.inputs &&
                  proc.inputs.map((input, inputId) => (
                    <div
                      className="product"
                      key={'process' + procId + 'Input' + inputId}
                    >
                      {input.name + inputId}
                    </div>
                  ))}
              </div>
              <div className="outputs">
                {proc.outputs &&
                  proc.outputs.map((output, outputId) => (
                    <div
                      className="product"
                      key={'process' + procId + 'Input' + outputId}
                    >
                      {output.name + outputId}
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <ProductionLine />
  </div>,
  document.getElementById('container')
);

function log(text) {
  if (logLevel) {
    console.log(text);
  }
}
