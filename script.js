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
  Tooltip,
  List,
  ListItem,
  ListItemButton,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Avatar,
  Chip,
  Grid,
  Item,
  Link,
  Dialog,
  DialogTitle,
} = MaterialUI;

const { namedNode, literal, defaultGraph, quad } = N3.DataFactory;

var mappings = [
  {
    label: 'inputs',
    predicate: 'http://uni-ko-ld.de/ist/model#hasInputProduct',
  },
  {
    label: 'outputs',
    predicate: 'http://uni-ko-ld.de/ist/model#hasOutputProduct',
  },
  {
    label: 'resources',
    predicate: 'http://uni-ko-ld.de/ist/model#hasResource',
  },
  {
    label: 'measurements',
    predicate: 'http://uni-ko-ld.de/ist/model#hasMeasurement',
  },
  {
    label: 'constraints',
    predicate: 'http://uni-ko-ld.de/ist/model#hasConstraint',
  },
];

let presets = [
  {
    id: 0,
    label: 'Encased Sensor Production',
    inputModelUrl: 'https://mehlko.github.io/model/models/inputModel.ttl',
    factUrl: 'https://mehlko.github.io/model/models/exampleFacts.ttl',
  },
  {
    id: 1,
    label: 'Pizza Bakery',
    inputModelUrl: 'https://mehlko.github.io/model/models/inputModel.ttl',
    factUrl: 'https://mehlko.github.io/model/models/exampleFacts.ttl',
  },
  {
    id: 2,
    label: 'Wine Making',
    inputModelUrl: 'https://mehlko.github.io/model/models/inputModel.ttl',
    factUrl: 'https://mehlko.github.io/model/models/exampleFacts.ttl',
  },
  {
    id: 2,
    label: 'Knowledge Provider Integration',
    inputModelUrl: 'https://mehlko.github.io/model/models/inputModel.ttl',
    factUrl: 'https://mehlko.github.io/model/models/exampleFacts.ttl',
  },
];

function getFirstLabel(labels, id) {
  if (labels && Array.isArray(labels) && labels.length > 0) {
    return labels[0];
  } else {
    return id;
  }
}

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
    PREFIX etim:  <https://www.etim-international.com/#>
    SELECT ?id ?label ?type WHERE {
     ?type rdfs:subClassOf model:InputModelElement .
     ?id rdf:type ?type .
     ?id rdfs:label ?label .
     FILTER (STRSTARTS(?label, "${value}"))
    } LIMIT 4`;

    Comunica.newEngine()
      .query(queryString, {
        sources: [this.props.store],
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
        id={'id' + this.props.processId}
        className="search"
        disableCloseOnSelect
        clearOnBlur
        clearOnEscape
        getOptionLabel={(option) => getFirstLabel(option.labels, option.id)}
        onOpen={(event) => {
          if (Array.isArray(this.state.options) && !this.state.options.length) {
            this.queryThrottled(this.state.inputValue);
          }
        }}
        options={this.state.options}
        onInputChange={(event, newInputValue) => {
          this.setState({
            inputValue: newInputValue,
          });
          this.queryThrottled(newInputValue);
        }}
        renderInput={(params) => (
          <TextField {...params} placeholder="Type to edit" />
        )}
        renderOption={(props, option, { selected }) => {
          return (
            <Grid container key={option.id + option.labels.join()}>
              <Grid item xs={6}>
                <Typography component="div">{option.labels}</Typography>
                <Typography
                  component="span"
                  sx={{ fontSize: 10 }}
                  color="text.secondary"
                >
                  {option.type}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {option.type == 'http://uni-ko-ld.de/ist/model#Product' && (
                  <>
                    <Button
                      variant="contained"
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
              </Grid>
            </Grid>
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
        processes: [],
      },
      detectedPatterns: [],
      selectedPatternIndex: 0,
      preset: 0,
      inputModelUrl: presets[0].inputModelUrl,
      factUrl: presets[0].factUrl,
    };
    this.analyze = this.analyze.bind(this);
    this.parser = new N3.Parser();
    this.store = new N3.Store();
    this.loadUrlToStore(this.store, this.state.inputModelUrl);
    this.loadUrlToStore(this.store, this.state.factUrl);
    this.loadUrlToStore(
      this.store,
      'https://mehlko.github.io/model/models/etimLabels.ttl'
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
      ...tempProductionLine.processes[processId],
      ...value,
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

  loadInputModelProerties(subject, predicate) {
    const result = this.store.getQuads(subject, predicate, null);
    return result.map((item) => ({
      id: item.object.value,
      labels: this.getLabels(item.object.value),
    }));
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
        var newProductionLine = { processes: [] };

        productionLine.map((process) => {
          const inputs = this.loadInputModelProerties(
            process.get('?process'),
            namedNode('http://uni-ko-ld.de/ist/model#hasInputProduct')
          );
          const outputs = this.loadInputModelProerties(
            process.get('?process'),
            namedNode('http://uni-ko-ld.de/ist/model#hasOutputProduct')
          );

          newProductionLine.processes = [
            ...newProductionLine.processes,
            {
              id: process.get('?process').value,
              labels: this.getLabels(process.get('?process').value),
              inputs: this.loadInputModelProerties(
                process.get('?process'),
                namedNode('http://uni-ko-ld.de/ist/model#hasInputProduct')
              ),
              outputs: this.loadInputModelProerties(
                process.get('?process'),
                namedNode('http://uni-ko-ld.de/ist/model#hasOutputProduct')
              ),
              resources: this.loadInputModelProerties(
                process.get('?process'),
                namedNode('http://uni-ko-ld.de/ist/model#hasResource')
              ),
              measurements: this.loadInputModelProerties(
                process.get('?process'),
                namedNode('http://uni-ko-ld.de/ist/model#hasMeasurement')
              ),
              constraints: this.loadInputModelProerties(
                process.get('?process'),
                namedNode('http://uni-ko-ld.de/ist/model#hasConstraint')
              ),
            },
          ];
          //set state
          this.setState({
            productionLine: newProductionLine,
          });
        });
        info('loading done');
      });
  }

  onPresetChange = (event) => {
    this.setState({
      preset: event.target.value,
      inputModelUrl: presets[event.target.value].inputModelUrl,
      factUrl: presets[event.target.value].factUrl,
    });
  };

  convertJSONToRDF() {
    var store = new N3.Store();
    var processes = this.state.productionLine.processes;
    processes.map((process, processIndex) => {
      //link processes
      var nextProcessIndex = processIndex + 1;
      if (processes.length > nextProcessIndex) {
        var nextProcess = processes[nextProcessIndex];
        this.addQuad(
          store,
          process.id,
          'http://uni-ko-ld.de/ist/model#hasNextProcess',
          nextProcess.id
        );
      }

      mappings.map((mapping) => {
        //inputs
        process[mapping.label].map((item) => {
          this.addQuad(store, process.id, mapping.predicate, item.id);
        });
      });
    });
    return store;
  }

  async analyze() {
    //info(JSON.stringify(this.state.productionLine, null, 2));
    var store = this.convertJSONToRDF();
    await this.loadUrlToStore(store, this.state.factUrl);

    log(patternList);
    this.setState({
      detectedPatterns: [],
    });

    Object.entries(patternList).forEach(([patternKey, currentPattern]) => {
      Comunica.newEngine()
        .query(currentPattern.queryString, {
          sources: [store],
        })
        .then(async (result) => {
          var queryResults = await result.bindings();
          log(queryResults);
          queryResults.map(async (queryResult) => {
            log('detected');
            this.setState({
              detectedPatterns: [
                ...this.state.detectedPatterns,
                {
                  patternKey: patternKey,
                  queryResult: queryResult,
                  affectedElements:
                    currentPattern.affectedElements(queryResult),
                },
              ],
            });
          });
        });
    });
  }

  addQuad(store, subject, predicate, object) {
    store.addQuad(namedNode(subject), namedNode(predicate), namedNode(object));
  }

  async selectPattern(selectedPatternIndex) {
    await this.setState({
      selectedPatternIndex: selectedPatternIndex,
    });
    var selectedPattern =
      this.state.detectedPatterns[this.state.selectedPatternIndex];
    log(selectedPattern);
  }

  getItems(list, procId, type) {
    return list.map((item, itemId) => (
      <Box className={type} key={'process' + procId + 'type' + itemId}>
        {this.isPatternAffected(item.id) && (
          <Typography
            variant="h6"
            component="span"
            color="error"
            sx={{ p: 0.5, border: 3, borderRadius: 16 }}
          >
            {getFirstLabel(item.labels, item.id)}
          </Typography>
        )}{' '}
        {!this.isPatternAffected(item.id) && (
          <Typography variant="h6" component="span">
            {getFirstLabel(item.labels, item.id)}
          </Typography>
        )}
      </Box>
    ));
  }

  isPatternAffected(id) {
    return (
      this.state.detectedPatterns &&
      this.state.detectedPatterns[this.state.selectedPatternIndex] &&
      this.state.detectedPatterns[
        this.state.selectedPatternIndex
      ].affectedElements.includes(id)
    );
  }

  render() {
    return (
      <>
        <Container maxWidth="sm">
          <Typography variant="overline" gutterBottom>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                Production Line Analyzer
              </Grid>{' '}
              <Grid item xs={2}>
                v0.1
              </Grid>
              <Grid item xs={1}>
                <Link href="https://github.com/mehlko/model">Source</Link>
              </Grid>
              <Grid align="right" item xs={4}>
                Marco Ehl
              </Grid>
            </Grid>
          </Typography>
        </Container>
        <Container maxWidth="sm">
          <Typography variant="h3">Production Line Analyzer</Typography>
          <Box className="setup">
            <Typography variant="h5">Setup</Typography>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel id="presetLabel">Preset</InputLabel>
                <Select
                  fullWidth
                  labelId="presetLabel"
                  id="preset"
                  value={this.state.preset}
                  onChange={this.onPresetChange}
                >
                  {presets.map((item) => (
                    <MenuItem value={item.id} key={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  label="Input Model URL"
                  value={this.state.inputModelUrl}
                  onChange={this.onInputModelChange}
                />{' '}
              </Grid>
              <Grid item xs={2}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    window.open(this.state.inputModelUrl, '_blank');
                  }}
                >
                  Show Source
                </Button>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  label="Fact URL"
                  value={this.state.factUrl}
                  onChange={this.onFactUrlChange}
                />{' '}
              </Grid>
              <Grid item xs={2}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    window.open(this.state.factUrl, '_blank');
                  }}
                >
                  Show Source
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={this.loadInputModel.bind(this)}
                >
                  Load Input Model
                </Button>
              </Grid>
            </Grid>
          </Box>
          <br />

          {/* ############################################################ */}
          {/* ############################################################ */}

          <Box className="productionLine" fullWidth>
            <Typography variant="h5">Input Model</Typography>
            <br />
            <Button
              variant="contained"
              onClick={() => this.addProcess()}
              fullWidth
            >
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
            {this.state.productionLine.processes &&
              this.state.productionLine.processes.map((proc, procId) => (
                <Box className="process" key={'process' + procId} fullWidth>
                  {proc.id && this.isPatternAffected(proc.id) && (
                    <Box className="name">
                      <Typography
                        className="name"
                        variant="h6"
                        color="error"
                        sx={{ p: 0.5, border: 3, borderRadius: 16 }}
                      >
                        {getFirstLabel(proc.labels, proc.id)}
                      </Typography>
                    </Box>
                  )}
                  {proc.id && !this.isPatternAffected(proc.id) && (
                    <Box className="name">
                      <Typography variant="h6">
                        {getFirstLabel(proc.labels, proc.id)}
                      </Typography>{' '}
                    </Box>
                  )}
                  <MyAutocomplete
                    processId={procId}
                    store={this.store}
                    setProcess={this.setProcess.bind(this, procId)}
                    addInput={this.addPPR.bind(this, 'inputs', procId)}
                    addOutput={this.addPPR.bind(this, 'outputs', procId)}
                    addResource={this.addPPR.bind(this, 'resources', procId)}
                    addMeasurement={this.addPPR.bind(
                      this,
                      'measurements',
                      procId
                    )}
                    addConstraint={this.addPPR.bind(
                      this,
                      'constraints',
                      procId
                    )}
                  />
                  <div className="inputs">
                    {proc.inputs &&
                      this.getItems(proc.inputs, procId, 'product')}
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
          <br />
          <Box className="patternResult" fullWidth>
            <Typography variant="h5">Detected Problems</Typography>
            <br />
            {log(this.state.detectedPatterns)}
            {this.state.detectedPatterns.map(
              (detectedPattern, detectedPatternIndex) => (
                <Card
                  key={'detectedPatternIndex' + detectedPatternIndex}
                  sx={
                    detectedPatternIndex === this.state.selectedPatternIndex
                      ? { border: '2px solid grey' }
                      : {}
                  }
                >
                  <CardActionArea
                    onClick={this.selectPattern.bind(
                      this,
                      detectedPatternIndex
                    )}
                  >
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                          {patternList[detectedPattern.patternKey].abbreviation}
                        </Avatar>
                      }
                      title={
                        <Typography gutterBottom variant="h5" component="div">
                          {patternList[detectedPattern.patternKey].name}
                        </Typography>
                      }
                      subheader={'Problem #' + detectedPatternIndex}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {patternList[detectedPattern.patternKey].reason(
                          detectedPattern.queryResult
                        )}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              )
            )}
          </Box>

          <Box>
            <Typography variant="h5">Todo</Typography>
            <ul>
              <li>add pattern</li>
              <li>add example data</li>
              <li>qol for proces editing</li>
              <li>process numbering</li>
              <li>learn about PPR (triangle?, gif?)</li>
              <li>link to resources</li>
              <li>pizza data set</li>
              <li>
                specific test (xaps use case) and integration test (etim,
                eclass, SI)
              </li>
              <li>default influences (e.g. time)</li>
              <li>human operators, line feeder</li>
            </ul>
          </Box>
        </Container>
      </>
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
