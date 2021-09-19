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
  Box,
} = MaterialUI;

const { namedNode } = N3.DataFactory;

class MyAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      inputValue: '',
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
        sources: ['https://mehlko.github.io/model/models/exampleFacts.ttl'],
      })
      .then(async (result) => {
        var tempOptions = await result.bindings();

        this.setState({
          options: tempOptions.map((option) => {
            return {
              labels: [option.get('?label').value],
              id: option.get('?id').value,
              type: option.get('?type').value,
            };
          }),
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
        onOpen={(event) => {
          if (Array.isArray(this.state.options) && !this.state.options.length) {
            this.queryThrottled(this.state.inputValue);
          }
        }}
        options={this.state.options}
        disableCloseOnSelect
        getOptionLabel={(option) => option.labels}
        onInputChange={(event, newInputValue) => {
          this.setState({
            inputValue: newInputValue,
          });
          this.queryThrottled(newInputValue);
        }}
        renderInput={(params) => (
          <TextField {...params} placeholder="Type to edit" />
        )}
        noOptionsText=""
        renderOption={(props, option, { selected }) => {
          return (
            <li {...props} onClick={(event) => {}}>
              {option.type} {option.labels}{' '}
              {option.type == 'http://uni-ko-ld.de/ist/model#Product' && (
                <>
                  <Button
                    size="small"
                    onClick={() => this.props.addInput(option)}
                  >
                    + Input
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => this.props.addOutput(option)}
                  >
                    + Output
                  </Button>
                </>
              )}
              {option.type == 'http://uni-ko-ld.de/ist/model#Process' && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => this.props.setProcess(option)}
                >
                  = Process
                </Button>
              )}
              {option.type == 'http://uni-ko-ld.de/ist/model#Resource' && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => this.props.addResource(option)}
                >
                  + Resource
                </Button>
              )}
              {option.type == 'http://uni-ko-ld.de/ist/model#Property' && (
                <>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => this.props.addMeasurement(option)}
                  >
                    + Measurement
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => this.props.addConstraint(option)}
                  >
                    + Constraint
                  </Button>
                </>
              )}
            </li>
          );
        }}
      />
    );
  }
}

let presets = [
  {
    id: 0,
    label: 'Encased Sensor',
    inputModelUrl: 'https://mehlko.github.io/model/models/inputModel.ttl',
    factUrl: 'https://mehlko.github.io/model/models/exampleFacts.ttl',
  },
  {
    id: 1,
    label: 'Encased Sensor 2',
    inputModelUrl: 'https://mehlko.github.io/model/models/inputModel.ttl',
    factUrl: 'https://mehlko.github.io/model/models/exampleFacts.ttl',
  },
];

class ProductionLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productionLine: {
        processes: [],
      },
      preset: 0,
      inputModelUrl: presets[0].inputModelUrl,
      factUrl: presets[0].factUrl,
    };
    this.analyze = this.analyze.bind(this);
    this.parser = new N3.Parser();
    this.store = {};
    info(
      'production  constructor: ' +
        this.state.preset +
        ' ' +
        this.state.inputModelUrl +
        ' ' +
        this.state.factUrl
    );
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

  addPPR(type, processId, value) {
    //make copy
    var tempProductionLine = { ...this.state.productionLine };
    if (!tempProductionLine.processes[processId][type]) {
      tempProductionLine.processes[processId][type] = [];
    }
    //update
    tempProductionLine.processes[processId][type] = [
      ...tempProductionLine.processes[processId][type],
      value,
    ];
    //set state
    this.setState({
      productionLine: tempProductionLine,
    });
  }

  setProcess(processId, value) {
    //make copy
    var tempProductionLine = { ...this.state.productionLine };

    //update
    tempProductionLine.processes[processId] = {
      ...value,
      ...tempProductionLine.processes[processId],
    };
    //set state
    this.setState({
      productionLine: tempProductionLine,
    });
  }

  addProcess() {
    //make copy
    var temp = { ...this.state.productionLine };

    //update
    temp.processes = [...temp.processes, {}];
    //set state
    this.setState({
      productionLine: temp,
    });
  }

  onFactUrlChange = (event) => {
    this.setState({
      factUrl: event.target.value,
    });
    log(this.state.factUrl);
  };

  onInputModelChange = (event) => {
    this.setState({
      inputModelUrl: event.target.value,
    });
    log(this.state.inputModelUrl);
  };

  getLabels(id) {
    return this.store
      .getQuads(
        id,
        namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
        null
      )
      .map((label) => label.object.value);
  }

  getFirstLabel(labels, id) {
    if (labels && Array.isArray(labels) && labels.length > 0) {
      return labels[0];
    } else {
      return id;
    }
  }

  async loadInputModel(event) {
    info(
      'loadInputModel: ' + this.state.inputModelUrl + ' ' + this.state.factUrl
    );
    this.store = new N3.Store();
    await this.loadUrlToStore(this.store, this.state.inputModelUrl);
    await this.loadUrlToStore(this.store, this.state.factUrl);

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
        sources: [this.store],
      })
      .then(async (result) => {
        var productionLine = await result.bindings();
        log(productionLine);
        var newProductionLine = { processes: [] };

        productionLine.map((process) => {
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
              id: process.get('?process').value,
              labels: this.getLabels(process.get('?process').value),
              inputs: inputs.map((input) => ({
                id: input.object.value,
                labels: this.getLabels(input.object.value),
              })),
              outputs: outputs.map((outut) => ({
                îd: outut.object.value,
                labels: this.getLabels(outut.object.value),
              })),
            },
          ];
          //set state
          this.setState({
            productionLine: newProductionLine,
          });
        });
      });
  }

  getItems(list, procId, type) {
    return list.map((item, itemId) => (
      <div className={type} key={'process' + procId + 'type' + itemId}>
        {this.getFirstLabel(item.labels, item.id)}
      </div>
    ));
  }

  onPresetChange = (event) => {
    this.setState({
      preset: event.target.value,
      inputModelUrl: presets[event.target.value].inputModelUrl,
      factUrl: presets[event.target.value].factUrl,
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
              {presets.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.label} {item.id}
                </MenuItem>
              ))}
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
            <Button
              variant="contained"
              onClick={this.loadInputModel.bind(this)}
            >
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
                {proc.id && (
                  <div className="name">
                    {this.getFirstLabel(proc.labels, proc.id)}
                  </div>
                )}
                <MyAutocomplete
                  processId={procId}
                  addInput={this.addPPR.bind(this, 'inputs', procId)}
                  addOutput={this.addPPR.bind(this, 'outputs', procId)}
                  setProcess={this.setProcess.bind(this, procId)}
                  addResource={this.addPPR.bind(this, 'resources', procId)}
                  addMeasurement={this.addPPR.bind(
                    this,
                    'measurements',
                    procId
                  )}
                  addConstraint={this.addPPR.bind(this, 'constraints', procId)}
                />

                <div className="inputs">
                  {proc.inputs && this.getItems(proc.inputs, procId, 'product')}
                </div>
                <div className="outputs">
                  {proc.outputs &&
                    this.getItems(proc.outputs, procId, 'product')}
                </div>
                <div className="resources">
                  {proc.resources &&
                    this.getItems(proc.resources, procId, 'resource')}
                </div>
                <div className="measurements">
                  {proc.measurements &&
                    this.getItems(proc.measurements, procId, 'measurement')}
                </div>
                <div className="constraints">
                  {proc.constraints &&
                    this.getItems(proc.constraints, procId, 'constraint')}
                </div>
              </Box>
            ))}
        </Box>
      </Container>
    );
  }
}

ReactDOM.render(<ProductionLine />, document.getElementById('container'));

function log(text) {
  console.log(text);
}
function info(text) {
  if (logLevel) {
    console.log(text);
  }
}
