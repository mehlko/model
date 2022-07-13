# Production Line Analyzer

Static production line analysis based on reusable pattern.

# Demo

# How to use

![step1](https://github.com/mehlko/model/raw/master/doc/doc1.png)
![step1](https://github.com/mehlko/model/raw/master/doc/doc2.png)
![step1](https://github.com/mehlko/model/raw/master/doc/doc3.png)
![step1](https://github.com/mehlko/model/raw/master/doc/doc4.png)
![step1](https://github.com/mehlko/model/raw/master/doc/doc5.png)
![step1](https://github.com/mehlko/model/raw/master/doc/doc6.png)
![step1](https://github.com/mehlko/model/raw/master/doc/doc7.png)
![step1](https://github.com/mehlko/model/raw/master/doc/doc8.png)
![step1](https://github.com/mehlko/model/raw/master/doc/doc9.png)
![step1](https://github.com/mehlko/model/raw/master/doc/doc10.png)
![step1](https://github.com/mehlko/model/raw/master/doc/doc11.png)
![step1](https://github.com/mehlko/model/raw/master/doc/doc12.png)
![step1](https://github.com/mehlko/model/raw/master/doc/doc13.png)

# Link to rendering component

https://github.com/mehlko/XapsModelRenderer

# Input Model

Link

## Relations

## Meta model

Link

```
PREFIX model: <http://uni-ko-ld.de/ist/model#>
PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs:   <http://www.w3.org/2000/01/rdf-schema#>


### Meta Model
model:Product rdf:type rdfs:Class.
model:Process rdf:type rdfs:Class.
model:Resource rdf:type rdfs:Class.
model:Property rdf:type rdfs:Class.

model:InputModelElement rdf:type rdfs:Class.

model:Product rdfs:subClassOf model:InputModelElement.
model:Process rdfs:subClassOf model:InputModelElement.
model:Resource rdfs:subClassOf model:InputModelElement.
model:Property rdfs:subClassOf model:InputModelElement.
```

# Pattern

[Pattern](./pattern.js)
https://github.com/mehlko/model/blob/01708a3d90dc29a4712a181458a696775472f35a/pattern.js
