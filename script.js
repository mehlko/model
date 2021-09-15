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

const { namedNode } = N3.DataFactory;

class MyAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      inputValue: ''
    };
    this.queryThrottled = _.throttle(this.query, 200);
  }

  query(value) {
    var queryString = `
    PREFIX model: <http://uni-ko-ld.de/ist/model#>
    PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs:   <http://www.w3.org/2000/01/rdf-schema#>
    SELECT ?id ?label ?type WHERE {
     ?type rdfs:subClassOf model:InputModelElement .
     ?id rdf:type ?type .
     ?id rdfs:label ?label .
     FILTER (STRSTARTS(?label, "${value}"))
    } LIMIT 5`;

    Comunica.newEngine()
      .query(queryString, {
        sources: ['https://mehlko.github.io/model/models/exampleFacts.ttl']
      })
      .then(async result => {
        var tempOptions = await result.bindings();

        this.setState({
          options: tempOptions.map(option => {
            return {
              labels: [option.get('?label').value],
              id: option.get('?id').value,
              type: option.get('?type').value
            };
          })
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
        onOpen={event => {
          if (Array.isArray(this.state.options) && !this.state.options.length) {
            this.queryThrottled(this.state.inputValue);
          }
        }}
        options={this.state.options}
        disableCloseOnSelect
        getOptionLabel={option => option.labels}
        onInputChange={(event, newInputValue) => {
          this.setState({
            inputValue: newInputValue
          });
          this.queryThrottled(newInputValue);
        }}
        renderInput={params => (
          <TextField {...params} placeholder="Type to search" />
        )}
        noOptionsText=""
        renderOption={(props, option, { selected }) => {
          return (
            <li {...props} onClick={event => {}}>
              {option.labels}{' '}
              <Button
                variant="contained"
                size="small"
                onClick={() => this.props.onAddInput(option)}
              >
                + Input
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => this.props.onAddOutput(option)}
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
    var tempProductionLine = { ...this.state.productionLine };
    if (!tempProductionLine.processes[processId].inputs) {
      tempProductionLine.processes[processId].inputs = [];
    }
    //update
    tempProductionLine.processes[processId].inputs = [
      ...tempProductionLine.processes[processId].inputs,
      value
    ];
    //set state
    this.setState({
      productionLine: tempProductionLine
    });
  }
  addOutput(processId, value) {
    //make copy
    var tempProductionLine = { ...this.state.productionLine };
    if (!tempProductionLine.processes[processId].outputs) {
      tempProductionLine.processes[processId].outputs = [];
    }
    //update
    tempProductionLine.processes[processId].outputs = [
      ...tempProductionLine.processes[processId].outputs,
      value
    ];
    //set state
    this.setState({
      productionLine: tempProductionLine
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

  getLabels(id) {
    var labels = this.store
      .getQuads(
        id,
        namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
        null
      )
      .map(label => label.object.value);
    log(labels);
    return labels;
  }

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
    PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs:   <http://www.w3.org/2000/01/rdf-schema#>
    SELECT ?process WHERE {
      ?firstProcess rdf:type model:Process .
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
        log('test');
        log(productionLine);
        var newProductionLine = { processes: [] };

        productionLine.map(process => {
          const inputs = this.store.getQuads(
            process.get('?process'),
            namedNode('http://uni-ko-ld.de/ist/model#hasInputProduct'),
            null
          );
          const outputs = this.store.getQuads(
            process.get('?process'),
            namedNode('http://uni-ko-ld.de/ist/model#hasOutputProduct'),
            null
          );

          newProductionLine.processes = [
            ...newProductionLine.processes,
            {
              name: process.get('?process').value,
              inputs: inputs.map(input => ({
                id: input.object.value,
                labels: this.getLabels(input.object.value)
              })),
              outputs: outputs.map(outut => ({
                îd: outut.object.value,
                labels: this.getLabels(outut.object.value)
              }))
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
                        {input.labels}
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
                        {output.labels}
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
