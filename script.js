//models are here: https://github.com/mehlko/model/

const logLevel = 1;
const {
  Button,
  Alert,
  Autocomplete,
  TextField,
  createFilterOptions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Typography,
  Box
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
    var queryString2 = `
    PREFIX etim: <https://www.etim-international.com/#>
    SELECT ?id ?name WHERE {
     ?id etim:hasSynonym ?name .
     FILTER (STRSTARTS(?name, "${value}"))
    } LIMIT 10`;

    var queryString = `
    PREFIX etim: <https://www.etim-international.com/#>
    SELECT ?id ?label ?type WHERE {
     ?id etim:hasSynonym ?name .
     FILTER (STRSTARTS(?name, "${value}"))
    } LIMIT 10`;

    Comunica.newEngine()
      .query(queryString, {
        sources: ['https://mehlko.github.io/model/models/exampleFacts.ttl']
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

let presets = [
  {
    inputModelUrl: 'https://mehlko.github.io/model/models/inputModel.ttl',
    factUrl: 'https://mehlko.github.io/model/models/exampleFacts.ttl'
  },
  {
    inputModelUrl: 'https://mehlko.github.io/model/models/inputModel.ttl',
    factUrl: 'https://mehlko.github.io/model/models/exampleFacts.ttl'
  }
];

class ProductionLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productionLine: {
        processes: []
      },
      preset: 0,
      inputModelUrl: presets[0].inputModelUrl,
      factUrl: presets[0].factUrl
    };
    this.addInput = this.addInput.bind(this);
    this.analyze = this.analyze.bind(this);
    this.parser = new N3.Parser();
    this.store = {};
  }

  async loadUrlToStore(myStore, url) {
    var resultString = await (await fetch(url)).text();

    this.parser.parse(resultString, (error, quad, prefixes) => {
      if (quad) {
        myStore.addQuad(quad);
      }
    });
  }

  analyze() {
    var prettyJSON = JSON.stringify(this.state.productionLine, null, 2);
    log(prettyJSON);
    console.log(this.store.size);
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

  onPresetChange = event => {
    this.setState({
      preset: event.target.value,
      inputModelUrl: presets[event.target.value].inputModelUrl,
      factUrl: presets[event.target.value].factUrl
    });
  };

  onFactUrlChange = event => {
    this.setState({
      factUrl: event.target.value
    });
    log(this.state.factUrl);
  };

  onInputModelChange = event => {
    this.setState({
      inputModelUrl: event.target.value
    });
    log(this.state.inputModelUrl);
  };

  loadInputModel = async event => {
    this.store = new N3.Store();
    await this.loadUrlToStore(
      this.store,
      'https://mehlko.github.io/model/models/inputModel.ttl'
    );
    await this.loadUrlToStore(
      this.store,
      'https://mehlko.github.io/model/models/exampleFacts.ttl'
    );

    var queryString = `
    PREFIX model: <http://uni-ko-ld.de/ist/model#>
    PREFIX proc: <http://uni-ko-ld.de/ist/process#>
    PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs:   <http://www.w3.org/2000/01/rdf-schema#>
    SELECT ?process WHERE {
      ?firstProcess rdf:type proc:Process .
      ?firstProcess model:hasNextProcess ?nextProcess .
      MINUS {[] model:hasNextProcess ?firstProcess} .
      ?firstProcess model:hasNextProcess* ?process .
    }`;

    Comunica.newEngine()
      .query(queryString, {
        sources: [this.store]
      })
      .then(async result => {
        var productionLine = await result.bindings();
        log(productionLine[0].get('?process').value);
        var newProductionLine = { processes: [] };

        productionLine.map(process => {
          log(process.get('?process'));
          const inputs = this.store.getQuads(
            process.get('?process'),
            N3.DataFactory.namedNode(
              'http://uni-ko-ld.de/ist/model#hasInputProduct'
            ),
            null
          );
          const outputs = this.store.getQuads(
            process.get('?process'),
            N3.DataFactory.namedNode(
              'http://uni-ko-ld.de/ist/model#hasOutputProduct'
            ),
            null
          );

          newProductionLine.processes = [
            ...newProductionLine.processes,
            {
              name: process.get('?process').value,
              inputs: inputs.map(input => {
                return { name: input.object.value };
              }),
              outputs: outputs.map(outut => {
                return { name: outut.object.value };
              })
            }
          ];
          //set state
          this.setState({
            productionLine: newProductionLine
          });
        });
      });
  };

  render() {
    return (
      <Container maxWidth="sm">
        <Typography variant="h4">Production Line Analyzer</Typography>
        <Box className="setup">
          <Typography variant="h6">Setup</Typography>
          <FormControl fullWidth>
            <InputLabel id="presetLabel">Preset</InputLabel>
            <Select
              labelId="presetLabel"
              id="preset"
              value={this.state.preset}
              onChange={this.onPresetChange}
            >
              <MenuItem value={0}>Scenario 1</MenuItem>
              <MenuItem value={1}>Scenario 2</MenuItem>
            </Select>
            <TextField
              label="Input Model URL"
              value={this.state.inputModelUrl}
              onChange={this.onInputModelChange}
            />
            <TextField
              label="Fact URL"
              value={this.state.factUrl}
              onChange={this.onFactUrlChange}
            />
            <Button variant="contained" onClick={this.loadInputModel}>
              Load Input Model
            </Button>
          </FormControl>
        </Box>

        <Button variant="contained" onClick={() => this.addProcess()} fullWidth>
          Add Process
        </Button>
        <Button
          variant="contained"
          onClick={() => this.analyze()}
          fullWidth
          color="success"
        >
          Analyze
        </Button>
        <Box className="productionLine" fullWidth>
          {this.state.productionLine.processes &&
            this.state.productionLine.processes.map((proc, procId) => (
              <Box className="process" key={'process' + procId} fullWidth>
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
              </Box>
            ))}
        </Box>
      </Container>
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
