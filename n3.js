(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if (typeof define === 'function' && define.amd) define([], factory);
  else if (typeof exports === 'object') exports['libpack'] = factory();
  else root['libpack'] = factory();
})(this, function() {
  return /******/ (function(modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {}; // The require function
    /******/
    /******/ /******/ function __webpack_require__(moduleId) {
      /******/
      /******/ // Check if module is in cache
      /******/ if (installedModules[moduleId]) {
        /******/ return installedModules[moduleId].exports;
        /******/
      } // Create a new module (and put it into the cache)
      /******/ /******/ var module = (installedModules[moduleId] = {
        /******/ i: moduleId,
        /******/ l: false,
        /******/ exports: {}
        /******/
      }); // Execute the module function
      /******/
      /******/ /******/ modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      ); // Flag the module as loaded
      /******/
      /******/ /******/ module.l = true; // Return the exports of the module
      /******/
      /******/ /******/ return module.exports;
      /******/
    } // expose the modules object (__webpack_modules__)
    /******/
    /******/
    /******/ /******/ __webpack_require__.m = modules; // expose the module cache
    /******/
    /******/ /******/ __webpack_require__.c = installedModules; // identity function for calling harmony imports with the correct context
    /******/
    /******/ /******/ __webpack_require__.i = function(value) {
      return value;
    }; // define getter function for harmony exports
    /******/
    /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
      /******/ if (!__webpack_require__.o(exports, name)) {
        /******/ Object.defineProperty(exports, name, {
          /******/ configurable: false,
          /******/ enumerable: true,
          /******/ get: getter
          /******/
        });
        /******/
      }
      /******/
    }; // getDefaultExport function for compatibility with non-harmony modules
    /******/
    /******/ /******/ __webpack_require__.n = function(module) {
      /******/ var getter =
        module && module.__esModule
          ? /******/ function getDefault() {
              return module['default'];
            }
          : /******/ function getModuleExports() {
              return module;
            };
      /******/ __webpack_require__.d(getter, 'a', getter);
      /******/ return getter;
      /******/
    }; // Object.prototype.hasOwnProperty.call
    /******/
    /******/ /******/ __webpack_require__.o = function(object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    }; // __webpack_public_path__
    /******/
    /******/ /******/ __webpack_require__.p = ''; // Load entry module and return exports
    /******/
    /******/ /******/ return __webpack_require__((__webpack_require__.s = 36));
    /******/
  })(
    /************************************************************************/
    /******/ [
      /* 0 */
      /***/ function(module, exports, __webpack_require__) {
        'use strict';

        function _inheritsLoose(subClass, superClass) {
          subClass.prototype = Object.create(superClass.prototype);
          subClass.prototype.constructor = subClass;
          subClass.__proto__ = superClass;
        }

        var codes = {};

        function createErrorType(code, message, Base) {
          if (!Base) {
            Base = Error;
          }

          function getMessage(arg1, arg2, arg3) {
            if (typeof message === 'string') {
              return message;
            } else {
              return message(arg1, arg2, arg3);
            }
          }

          var NodeError =
            /*#__PURE__*/
            (function(_Base) {
              _inheritsLoose(NodeError, _Base);

              function NodeError(arg1, arg2, arg3) {
                return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
              }

              return NodeError;
            })(Base);

          NodeError.prototype.name = Base.name;
          NodeError.prototype.code = code;
          codes[code] = NodeError;
        } // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js

        function oneOf(expected, thing) {
          if (Array.isArray(expected)) {
            var len = expected.length;
            expected = expected.map(function(i) {
              return String(i);
            });

            if (len > 2) {
              return (
                'one of '
                  .concat(thing, ' ')
                  .concat(expected.slice(0, len - 1).join(', '), ', or ') +
                expected[len - 1]
              );
            } else if (len === 2) {
              return 'one of '
                .concat(thing, ' ')
                .concat(expected[0], ' or ')
                .concat(expected[1]);
            } else {
              return 'of '.concat(thing, ' ').concat(expected[0]);
            }
          } else {
            return 'of '.concat(thing, ' ').concat(String(expected));
          }
        } // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith

        function startsWith(str, search, pos) {
          return (
            str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search
          );
        } // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith

        function endsWith(str, search, this_len) {
          if (this_len === undefined || this_len > str.length) {
            this_len = str.length;
          }

          return str.substring(this_len - search.length, this_len) === search;
        } // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes

        function includes(str, search, start) {
          if (typeof start !== 'number') {
            start = 0;
          }

          if (start + search.length > str.length) {
            return false;
          } else {
            return str.indexOf(search, start) !== -1;
          }
        }

        createErrorType(
          'ERR_INVALID_OPT_VALUE',
          function(name, value) {
            return (
              'The value "' + value + '" is invalid for option "' + name + '"'
            );
          },
          TypeError
        );
        createErrorType(
          'ERR_INVALID_ARG_TYPE',
          function(name, expected, actual) {
            // determiner: 'must be' or 'must not be'
            var determiner;

            if (typeof expected === 'string' && startsWith(expected, 'not ')) {
              determiner = 'must not be';
              expected = expected.replace(/^not /, '');
            } else {
              determiner = 'must be';
            }

            var msg;

            if (endsWith(name, ' argument')) {
              // For cases like 'first argument'
              msg = 'The '
                .concat(name, ' ')
                .concat(determiner, ' ')
                .concat(oneOf(expected, 'type'));
            } else {
              var type = includes(name, '.') ? 'property' : 'argument';
              msg = 'The "'
                .concat(name, '" ')
                .concat(type, ' ')
                .concat(determiner, ' ')
                .concat(oneOf(expected, 'type'));
            }

            msg += '. Received type '.concat(typeof actual);
            return msg;
          },
          TypeError
        );
        createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
        createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function(name) {
          return 'The ' + name + ' method is not implemented';
        });
        createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
        createErrorType('ERR_STREAM_DESTROYED', function(name) {
          return 'Cannot call ' + name + ' after a stream was destroyed';
        });
        createErrorType(
          'ERR_MULTIPLE_CALLBACK',
          'Callback called multiple times'
        );
        createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
        createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
        createErrorType(
          'ERR_STREAM_NULL_VALUES',
          'May not write null values to stream',
          TypeError
        );
        createErrorType(
          'ERR_UNKNOWN_ENCODING',
          function(arg) {
            return 'Unknown encoding: ' + arg;
          },
          TypeError
        );
        createErrorType(
          'ERR_STREAM_UNSHIFT_AFTER_END_EVENT',
          'stream.unshift() after end event'
        );
        module.exports.codes = codes;

        /***/
      },
      /* 1 */
      /***/ function(module, exports, __webpack_require__) {
        'use strict';
        /* WEBPACK VAR INJECTION */ (function(process) {
          // Copyright Joyent, Inc. and other Node contributors.
          //
          // Permission is hereby granted, free of charge, to any person obtaining a
          // copy of this software and associated documentation files (the
          // "Software"), to deal in the Software without restriction, including
          // without limitation the rights to use, copy, modify, merge, publish,
          // distribute, sublicense, and/or sell copies of the Software, and to permit
          // persons to whom the Software is furnished to do so, subject to the
          // following conditions:
          //
          // The above copyright notice and this permission notice shall be included
          // in all copies or substantial portions of the Software.
          //
          // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
          // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
          // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
          // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
          // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
          // USE OR OTHER DEALINGS IN THE SOFTWARE.
          // a duplex stream is just a stream that is both readable and writable.
          // Since JS doesn't have multiple prototypal inheritance, this class
          // prototypally inherits from Readable, and then parasitically from
          // Writable.

          /*<replacement>*/

          var objectKeys =
            Object.keys ||
            function(obj) {
              var keys = [];

              for (var key in obj) {
                keys.push(key);
              }

              return keys;
            };
          /*</replacement>*/

          module.exports = Duplex;

          var Readable = __webpack_require__(15);

          var Writable = __webpack_require__(17);

          __webpack_require__(4)(Duplex, Readable);

          {
            // Allow the keys array to be GC'ed.
            var keys = objectKeys(Writable.prototype);

            for (var v = 0; v < keys.length; v++) {
              var method = keys[v];
              if (!Duplex.prototype[method])
                Duplex.prototype[method] = Writable.prototype[method];
            }
          }

          function Duplex(options) {
            if (!(this instanceof Duplex)) return new Duplex(options);
            Readable.call(this, options);
            Writable.call(this, options);
            this.allowHalfOpen = true;

            if (options) {
              if (options.readable === false) this.readable = false;
              if (options.writable === false) this.writable = false;

              if (options.allowHalfOpen === false) {
                this.allowHalfOpen = false;
                this.once('end', onend);
              }
            }
          }

          Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
            // making it explicit this property is not enumerable
            // because otherwise some prototype manipulation in
            // userland will fail
            enumerable: false,
            get: function get() {
              return this._writableState.highWaterMark;
            }
          });
          Object.defineProperty(Duplex.prototype, 'writableBuffer', {
            // making it explicit this property is not enumerable
            // because otherwise some prototype manipulation in
            // userland will fail
            enumerable: false,
            get: function get() {
              return this._writableState && this._writableState.getBuffer();
            }
          });
          Object.defineProperty(Duplex.prototype, 'writableLength', {
            // making it explicit this property is not enumerable
            // because otherwise some prototype manipulation in
            // userland will fail
            enumerable: false,
            get: function get() {
              return this._writableState.length;
            }
          }); // the no-half-open enforcer

          function onend() {
            // If the writable side ended, then we're ok.
            if (this._writableState.ended) return; // no more data can be written.
            // But allow more writes to happen in this tick.

            process.nextTick(onEndNT, this);
          }

          function onEndNT(self) {
            self.end();
          }

          Object.defineProperty(Duplex.prototype, 'destroyed', {
            // making it explicit this property is not enumerable
            // because otherwise some prototype manipulation in
            // userland will fail
            enumerable: false,
            get: function get() {
              if (
                this._readableState === undefined ||
                this._writableState === undefined
              ) {
                return false;
              }

              return (
                this._readableState.destroyed && this._writableState.destroyed
              );
            },
            set: function set(value) {
              // we ignore the value if the stream
              // has not been initialized yet
              if (
                this._readableState === undefined ||
                this._writableState === undefined
              ) {
                return;
              } // backward compatibility, the user is explicitly
              // managing destroyed

              this._readableState.destroyed = value;
              this._writableState.destroyed = value;
            }
          });
          /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(5)));

        /***/
      },
      /* 2 */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict';
        /* harmony export (immutable) */ __webpack_exports__['j'] = termFromId;
        /* harmony export (immutable) */ __webpack_exports__['k'] = termToId;
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'i',
          function() {
            return Quad;
          }
        );
        /* unused harmony export escapeQuotes */
        /* unused harmony export unescapeQuotes */
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__IRIs__ = __webpack_require__(
          7
        );
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__N3Util__ = __webpack_require__(
          8
        );
        // N3.js implementations of the RDF/JS core data types
        // See https://github.com/rdfjs/representation-task-force/blob/master/interface-spec.md

        const { rdf, xsd } = __WEBPACK_IMPORTED_MODULE_0__IRIs__[
          'a' /* default */
        ];

        // eslint-disable-next-line prefer-const
        let DEFAULTGRAPH;
        let _blankNodeCounter = 0;

        const escapedLiteral = /^"(.*".*)(?="[^"]*$)/;
        const quadId = /^<<("(?:""|[^"])*"[^ ]*|[^ ]+) ("(?:""|[^"])*"[^ ]*|[^ ]+) ("(?:""|[^"])*"[^ ]*|[^ ]+) ?("(?:""|[^"])*"[^ ]*|[^ ]+)?>>$/;

        // ## DataFactory singleton
        const DataFactory = {
          namedNode,
          blankNode,
          variable,
          literal,
          defaultGraph,
          quad,
          triple: quad
        };
        /* harmony default export */ __webpack_exports__['a'] = DataFactory;

        // ## Term constructor
        class Term {
          constructor(id) {
            this.id = id;
          }

          // ### The value of this term
          get value() {
            return this.id;
          }

          // ### Returns whether this object represents the same term as the other
          equals(other) {
            // If both terms were created by this library,
            // equality can be computed through ids
            if (other instanceof Term) return this.id === other.id;
            // Otherwise, compare term type and value
            return (
              !!other &&
              this.termType === other.termType &&
              this.value === other.value
            );
          }

          // ### Returns a plain object representation of this term
          toJSON() {
            return {
              termType: this.termType,
              value: this.value
            };
          }
        }
        /* harmony export (immutable) */ __webpack_exports__['b'] = Term;

        // ## NamedNode constructor
        class NamedNode extends Term {
          // ### The term type of this term
          get termType() {
            return 'NamedNode';
          }
        }
        /* harmony export (immutable) */ __webpack_exports__['c'] = NamedNode;

        // ## Literal constructor
        class Literal extends Term {
          // ### The term type of this term
          get termType() {
            return 'Literal';
          }

          // ### The text value of this literal
          get value() {
            return this.id.substring(1, this.id.lastIndexOf('"'));
          }

          // ### The language of this literal
          get language() {
            // Find the last quotation mark (e.g., '"abc"@en-us')
            const id = this.id;
            let atPos = id.lastIndexOf('"') + 1;
            // If "@" it follows, return the remaining substring; empty otherwise
            return atPos < id.length && id[atPos++] === '@'
              ? id.substr(atPos).toLowerCase()
              : '';
          }

          // ### The datatype IRI of this literal
          get datatype() {
            return new NamedNode(this.datatypeString);
          }

          // ### The datatype string of this literal
          get datatypeString() {
            // Find the last quotation mark (e.g., '"abc"^^http://ex.org/types#t')
            const id = this.id,
              dtPos = id.lastIndexOf('"') + 1;
            const char = dtPos < id.length ? id[dtPos] : '';
            // If "^" it follows, return the remaining substring
            return char === '^'
              ? id.substr(dtPos + 2)
              : // If "@" follows, return rdf:langString; xsd:string otherwise
              char !== '@'
              ? xsd.string
              : rdf.langString;
          }

          // ### Returns whether this object represents the same term as the other
          equals(other) {
            // If both literals were created by this library,
            // equality can be computed through ids
            if (other instanceof Literal) return this.id === other.id;
            // Otherwise, compare term type, value, language, and datatype
            return (
              !!other &&
              !!other.datatype &&
              this.termType === other.termType &&
              this.value === other.value &&
              this.language === other.language &&
              this.datatype.value === other.datatype.value
            );
          }

          toJSON() {
            return {
              termType: this.termType,
              value: this.value,
              language: this.language,
              datatype: { termType: 'NamedNode', value: this.datatypeString }
            };
          }
        }
        /* harmony export (immutable) */ __webpack_exports__['d'] = Literal;

        // ## BlankNode constructor
        class BlankNode extends Term {
          constructor(name) {
            super(`_:${name}`);
          }

          // ### The term type of this term
          get termType() {
            return 'BlankNode';
          }

          // ### The name of this blank node
          get value() {
            return this.id.substr(2);
          }
        }
        /* harmony export (immutable) */ __webpack_exports__['e'] = BlankNode;

        class Variable extends Term {
          constructor(name) {
            super(`?${name}`);
          }

          // ### The term type of this term
          get termType() {
            return 'Variable';
          }

          // ### The name of this variable
          get value() {
            return this.id.substr(1);
          }
        }
        /* harmony export (immutable) */ __webpack_exports__['f'] = Variable;

        // ## DefaultGraph constructor
        class DefaultGraph extends Term {
          constructor() {
            super('');
            return DEFAULTGRAPH || this;
          }

          // ### The term type of this term
          get termType() {
            return 'DefaultGraph';
          }

          // ### Returns whether this object represents the same term as the other
          equals(other) {
            // If both terms were created by this library,
            // equality can be computed through strict equality;
            // otherwise, compare term types.
            return (
              this === other || (!!other && this.termType === other.termType)
            );
          }
        }
        /* harmony export (immutable) */ __webpack_exports__[
          'g'
        ] = DefaultGraph;

        // ## DefaultGraph singleton
        DEFAULTGRAPH = new DefaultGraph();

        // ### Constructs a term from the given internal string ID
        function termFromId(id, factory) {
          factory = factory || DataFactory;

          // Falsy value or empty string indicate the default graph
          if (!id) return factory.defaultGraph();

          // Identify the term type based on the first character
          switch (id[0]) {
            case '?':
              return factory.variable(id.substr(1));
            case '_':
              return factory.blankNode(id.substr(2));
            case '"':
              // Shortcut for internal literals
              if (factory === DataFactory) return new Literal(id);
              // Literal without datatype or language
              if (id[id.length - 1] === '"')
                return factory.literal(id.substr(1, id.length - 2));
              // Literal with datatype or language
              const endPos = id.lastIndexOf('"', id.length - 1);
              return factory.literal(
                id.substr(1, endPos - 1),
                id[endPos + 1] === '@'
                  ? id.substr(endPos + 2)
                  : factory.namedNode(id.substr(endPos + 3))
              );
            case '<':
              const components = quadId.exec(id);
              return factory.quad(
                termFromId(unescapeQuotes(components[1]), factory),
                termFromId(unescapeQuotes(components[2]), factory),
                termFromId(unescapeQuotes(components[3]), factory),
                components[4] &&
                  termFromId(unescapeQuotes(components[4]), factory)
              );
            default:
              return factory.namedNode(id);
          }
        }

        // ### Constructs an internal string ID from the given term or ID string
        function termToId(term) {
          if (typeof term === 'string') return term;
          if (term instanceof Term && term.termType !== 'Quad') return term.id;
          if (!term) return DEFAULTGRAPH.id;

          // Term instantiated with another library
          switch (term.termType) {
            case 'NamedNode':
              return term.value;
            case 'BlankNode':
              return `_:${term.value}`;
            case 'Variable':
              return `?${term.value}`;
            case 'DefaultGraph':
              return '';
            case 'Literal':
              return `"${term.value}"${
                term.language
                  ? `@${term.language}`
                  : term.datatype && term.datatype.value !== xsd.string
                  ? `^^${term.datatype.value}`
                  : ''
              }`;
            case 'Quad':
              // To identify RDF* quad components, we escape quotes by doubling them.
              // This avoids the overhead of backslash parsing of Turtle-like syntaxes.
              return `<<${escapeQuotes(termToId(term.subject))} ${escapeQuotes(
                termToId(term.predicate)
              )} ${escapeQuotes(termToId(term.object))}${
                __webpack_require__.i(
                  __WEBPACK_IMPORTED_MODULE_1__N3Util__['isDefaultGraph']
                )(term.graph)
                  ? ''
                  : ` ${termToId(term.graph)}`
              }>>`;
            default:
              throw new Error(`Unexpected termType: ${term.termType}`);
          }
        }

        // ## Quad constructor
        class Quad extends Term {
          constructor(subject, predicate, object, graph) {
            super('');
            this._subject = subject;
            this._predicate = predicate;
            this._object = object;
            this._graph = graph || DEFAULTGRAPH;
          }

          // ### The term type of this term
          get termType() {
            return 'Quad';
          }

          get subject() {
            return this._subject;
          }

          get predicate() {
            return this._predicate;
          }

          get object() {
            return this._object;
          }

          get graph() {
            return this._graph;
          }

          // ### Returns a plain object representation of this quad
          toJSON() {
            return {
              termType: this.termType,
              subject: this._subject.toJSON(),
              predicate: this._predicate.toJSON(),
              object: this._object.toJSON(),
              graph: this._graph.toJSON()
            };
          }

          // ### Returns whether this object represents the same quad as the other
          equals(other) {
            return (
              !!other &&
              this._subject.equals(other.subject) &&
              this._predicate.equals(other.predicate) &&
              this._object.equals(other.object) &&
              this._graph.equals(other.graph)
            );
          }
        }
        /* harmony export (immutable) */ __webpack_exports__['h'] = Quad;

        // ### Escapes the quotes within the given literal
        function escapeQuotes(id) {
          return id.replace(
            escapedLiteral,
            (_, quoted) => `"${quoted.replace(/"/g, '""')}`
          );
        }

        // ### Unescapes the quotes within the given literal
        function unescapeQuotes(id) {
          return id.replace(
            escapedLiteral,
            (_, quoted) => `"${quoted.replace(/""/g, '"')}`
          );
        }

        // ### Creates an IRI
        function namedNode(iri) {
          return new NamedNode(iri);
        }

        // ### Creates a blank node
        function blankNode(name) {
          return new BlankNode(name || `n3-${_blankNodeCounter++}`);
        }

        // ### Creates a literal
        function literal(value, languageOrDataType) {
          // Create a language-tagged string
          if (typeof languageOrDataType === 'string')
            return new Literal(
              `"${value}"@${languageOrDataType.toLowerCase()}`
            );

          // Automatically determine datatype for booleans and numbers
          let datatype = languageOrDataType ? languageOrDataType.value : '';
          if (datatype === '') {
            // Convert a boolean
            if (typeof value === 'boolean') datatype = xsd.boolean;
            // Convert an integer or double
            else if (typeof value === 'number') {
              if (Number.isFinite(value))
                datatype = Number.isInteger(value) ? xsd.integer : xsd.double;
              else {
                datatype = xsd.double;
                if (!Number.isNaN(value)) value = value > 0 ? 'INF' : '-INF';
              }
            }
          }

          // Create a datatyped literal
          return datatype === '' || datatype === xsd.string
            ? new Literal(`"${value}"`)
            : new Literal(`"${value}"^^${datatype}`);
        }

        // ### Creates a variable
        function variable(name) {
          return new Variable(name);
        }

        // ### Returns the default graph
        function defaultGraph() {
          return DEFAULTGRAPH;
        }

        // ### Creates a quad
        function quad(subject, predicate, object, graph) {
          return new Quad(subject, predicate, object, graph);
        }

        /***/
      },
      /* 3 */
      /***/ function(module, exports, __webpack_require__) {
        'use strict';
        /* WEBPACK VAR INJECTION */ (function(global) {
          /*!
           * The buffer module from node.js, for the browser.
           *
           * @author   Feross Aboukhadijeh <http://feross.org>
           * @license  MIT
           */
          /* eslint-disable no-proto */

          var base64 = __webpack_require__(25);
          var ieee754 = __webpack_require__(26);
          var isArray = __webpack_require__(27);

          exports.Buffer = Buffer;
          exports.SlowBuffer = SlowBuffer;
          exports.INSPECT_MAX_BYTES = 50;

          /**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
          Buffer.TYPED_ARRAY_SUPPORT =
            global.TYPED_ARRAY_SUPPORT !== undefined
              ? global.TYPED_ARRAY_SUPPORT
              : typedArraySupport();

          /*
           * Export kMaxLength after typed array support is determined.
           */
          exports.kMaxLength = kMaxLength();

          function typedArraySupport() {
            try {
              var arr = new Uint8Array(1);
              arr.__proto__ = {
                __proto__: Uint8Array.prototype,
                foo: function() {
                  return 42;
                }
              };
              return (
                arr.foo() === 42 && // typed array instances can be augmented
                typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
                arr.subarray(1, 1).byteLength === 0
              ); // ie10 has broken `subarray`
            } catch (e) {
              return false;
            }
          }

          function kMaxLength() {
            return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
          }

          function createBuffer(that, length) {
            if (kMaxLength() < length) {
              throw new RangeError('Invalid typed array length');
            }
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              // Return an augmented `Uint8Array` instance, for best performance
              that = new Uint8Array(length);
              that.__proto__ = Buffer.prototype;
            } else {
              // Fallback: Return an object instance of the Buffer class
              if (that === null) {
                that = new Buffer(length);
              }
              that.length = length;
            }

            return that;
          }

          /**
           * The Buffer constructor returns instances of `Uint8Array` that have their
           * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
           * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
           * and the `Uint8Array` methods. Square bracket notation works as expected -- it
           * returns a single octet.
           *
           * The `Uint8Array` prototype remains unmodified.
           */

          function Buffer(arg, encodingOrOffset, length) {
            if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
              return new Buffer(arg, encodingOrOffset, length);
            }

            // Common case.
            if (typeof arg === 'number') {
              if (typeof encodingOrOffset === 'string') {
                throw new Error(
                  'If encoding is specified then the first argument must be a string'
                );
              }
              return allocUnsafe(this, arg);
            }
            return from(this, arg, encodingOrOffset, length);
          }

          Buffer.poolSize = 8192; // not used by this implementation

          // TODO: Legacy, not needed anymore. Remove in next major version.
          Buffer._augment = function(arr) {
            arr.__proto__ = Buffer.prototype;
            return arr;
          };

          function from(that, value, encodingOrOffset, length) {
            if (typeof value === 'number') {
              throw new TypeError('"value" argument must not be a number');
            }

            if (
              typeof ArrayBuffer !== 'undefined' &&
              value instanceof ArrayBuffer
            ) {
              return fromArrayBuffer(that, value, encodingOrOffset, length);
            }

            if (typeof value === 'string') {
              return fromString(that, value, encodingOrOffset);
            }

            return fromObject(that, value);
          }

          /**
           * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
           * if value is a number.
           * Buffer.from(str[, encoding])
           * Buffer.from(array)
           * Buffer.from(buffer)
           * Buffer.from(arrayBuffer[, byteOffset[, length]])
           **/
          Buffer.from = function(value, encodingOrOffset, length) {
            return from(null, value, encodingOrOffset, length);
          };

          if (Buffer.TYPED_ARRAY_SUPPORT) {
            Buffer.prototype.__proto__ = Uint8Array.prototype;
            Buffer.__proto__ = Uint8Array;
            if (
              typeof Symbol !== 'undefined' &&
              Symbol.species &&
              Buffer[Symbol.species] === Buffer
            ) {
              // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
              Object.defineProperty(Buffer, Symbol.species, {
                value: null,
                configurable: true
              });
            }
          }

          function assertSize(size) {
            if (typeof size !== 'number') {
              throw new TypeError('"size" argument must be a number');
            } else if (size < 0) {
              throw new RangeError('"size" argument must not be negative');
            }
          }

          function alloc(that, size, fill, encoding) {
            assertSize(size);
            if (size <= 0) {
              return createBuffer(that, size);
            }
            if (fill !== undefined) {
              // Only pay attention to encoding if it's a string. This
              // prevents accidentally sending in a number that would
              // be interpretted as a start offset.
              return typeof encoding === 'string'
                ? createBuffer(that, size).fill(fill, encoding)
                : createBuffer(that, size).fill(fill);
            }
            return createBuffer(that, size);
          }

          /**
           * Creates a new filled Buffer instance.
           * alloc(size[, fill[, encoding]])
           **/
          Buffer.alloc = function(size, fill, encoding) {
            return alloc(null, size, fill, encoding);
          };

          function allocUnsafe(that, size) {
            assertSize(size);
            that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
            if (!Buffer.TYPED_ARRAY_SUPPORT) {
              for (var i = 0; i < size; ++i) {
                that[i] = 0;
              }
            }
            return that;
          }

          /**
           * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
           * */
          Buffer.allocUnsafe = function(size) {
            return allocUnsafe(null, size);
          };
          /**
           * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
           */
          Buffer.allocUnsafeSlow = function(size) {
            return allocUnsafe(null, size);
          };

          function fromString(that, string, encoding) {
            if (typeof encoding !== 'string' || encoding === '') {
              encoding = 'utf8';
            }

            if (!Buffer.isEncoding(encoding)) {
              throw new TypeError('"encoding" must be a valid string encoding');
            }

            var length = byteLength(string, encoding) | 0;
            that = createBuffer(that, length);

            var actual = that.write(string, encoding);

            if (actual !== length) {
              // Writing a hex string, for example, that contains invalid characters will
              // cause everything after the first invalid character to be ignored. (e.g.
              // 'abxxcd' will be treated as 'ab')
              that = that.slice(0, actual);
            }

            return that;
          }

          function fromArrayLike(that, array) {
            var length = array.length < 0 ? 0 : checked(array.length) | 0;
            that = createBuffer(that, length);
            for (var i = 0; i < length; i += 1) {
              that[i] = array[i] & 255;
            }
            return that;
          }

          function fromArrayBuffer(that, array, byteOffset, length) {
            array.byteLength; // this throws if `array` is not a valid ArrayBuffer

            if (byteOffset < 0 || array.byteLength < byteOffset) {
              throw new RangeError("'offset' is out of bounds");
            }

            if (array.byteLength < byteOffset + (length || 0)) {
              throw new RangeError("'length' is out of bounds");
            }

            if (byteOffset === undefined && length === undefined) {
              array = new Uint8Array(array);
            } else if (length === undefined) {
              array = new Uint8Array(array, byteOffset);
            } else {
              array = new Uint8Array(array, byteOffset, length);
            }

            if (Buffer.TYPED_ARRAY_SUPPORT) {
              // Return an augmented `Uint8Array` instance, for best performance
              that = array;
              that.__proto__ = Buffer.prototype;
            } else {
              // Fallback: Return an object instance of the Buffer class
              that = fromArrayLike(that, array);
            }
            return that;
          }

          function fromObject(that, obj) {
            if (Buffer.isBuffer(obj)) {
              var len = checked(obj.length) | 0;
              that = createBuffer(that, len);

              if (that.length === 0) {
                return that;
              }

              obj.copy(that, 0, 0, len);
              return that;
            }

            if (obj) {
              if (
                (typeof ArrayBuffer !== 'undefined' &&
                  obj.buffer instanceof ArrayBuffer) ||
                'length' in obj
              ) {
                if (typeof obj.length !== 'number' || isnan(obj.length)) {
                  return createBuffer(that, 0);
                }
                return fromArrayLike(that, obj);
              }

              if (obj.type === 'Buffer' && isArray(obj.data)) {
                return fromArrayLike(that, obj.data);
              }
            }

            throw new TypeError(
              'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
            );
          }

          function checked(length) {
            // Note: cannot use `length < kMaxLength()` here because that fails when
            // length is NaN (which is otherwise coerced to zero.)
            if (length >= kMaxLength()) {
              throw new RangeError(
                'Attempt to allocate Buffer larger than maximum ' +
                  'size: 0x' +
                  kMaxLength().toString(16) +
                  ' bytes'
              );
            }
            return length | 0;
          }

          function SlowBuffer(length) {
            if (+length != length) {
              // eslint-disable-line eqeqeq
              length = 0;
            }
            return Buffer.alloc(+length);
          }

          Buffer.isBuffer = function isBuffer(b) {
            return !!(b != null && b._isBuffer);
          };

          Buffer.compare = function compare(a, b) {
            if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
              throw new TypeError('Arguments must be Buffers');
            }

            if (a === b) return 0;

            var x = a.length;
            var y = b.length;

            for (var i = 0, len = Math.min(x, y); i < len; ++i) {
              if (a[i] !== b[i]) {
                x = a[i];
                y = b[i];
                break;
              }
            }

            if (x < y) return -1;
            if (y < x) return 1;
            return 0;
          };

          Buffer.isEncoding = function isEncoding(encoding) {
            switch (String(encoding).toLowerCase()) {
              case 'hex':
              case 'utf8':
              case 'utf-8':
              case 'ascii':
              case 'latin1':
              case 'binary':
              case 'base64':
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return true;
              default:
                return false;
            }
          };

          Buffer.concat = function concat(list, length) {
            if (!isArray(list)) {
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            }

            if (list.length === 0) {
              return Buffer.alloc(0);
            }

            var i;
            if (length === undefined) {
              length = 0;
              for (i = 0; i < list.length; ++i) {
                length += list[i].length;
              }
            }

            var buffer = Buffer.allocUnsafe(length);
            var pos = 0;
            for (i = 0; i < list.length; ++i) {
              var buf = list[i];
              if (!Buffer.isBuffer(buf)) {
                throw new TypeError(
                  '"list" argument must be an Array of Buffers'
                );
              }
              buf.copy(buffer, pos);
              pos += buf.length;
            }
            return buffer;
          };

          function byteLength(string, encoding) {
            if (Buffer.isBuffer(string)) {
              return string.length;
            }
            if (
              typeof ArrayBuffer !== 'undefined' &&
              typeof ArrayBuffer.isView === 'function' &&
              (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)
            ) {
              return string.byteLength;
            }
            if (typeof string !== 'string') {
              string = '' + string;
            }

            var len = string.length;
            if (len === 0) return 0;

            // Use a for loop to avoid recursion
            var loweredCase = false;
            for (;;) {
              switch (encoding) {
                case 'ascii':
                case 'latin1':
                case 'binary':
                  return len;
                case 'utf8':
                case 'utf-8':
                case undefined:
                  return utf8ToBytes(string).length;
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return len * 2;
                case 'hex':
                  return len >>> 1;
                case 'base64':
                  return base64ToBytes(string).length;
                default:
                  if (loweredCase) return utf8ToBytes(string).length; // assume utf8
                  encoding = ('' + encoding).toLowerCase();
                  loweredCase = true;
              }
            }
          }
          Buffer.byteLength = byteLength;

          function slowToString(encoding, start, end) {
            var loweredCase = false;

            // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
            // property of a typed array.

            // This behaves neither like String nor Uint8Array in that we set start/end
            // to their upper/lower bounds if the value passed is out of range.
            // undefined is handled specially as per ECMA-262 6th Edition,
            // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
            if (start === undefined || start < 0) {
              start = 0;
            }
            // Return early if start > this.length. Done here to prevent potential uint32
            // coercion fail below.
            if (start > this.length) {
              return '';
            }

            if (end === undefined || end > this.length) {
              end = this.length;
            }

            if (end <= 0) {
              return '';
            }

            // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
            end >>>= 0;
            start >>>= 0;

            if (end <= start) {
              return '';
            }

            if (!encoding) encoding = 'utf8';

            while (true) {
              switch (encoding) {
                case 'hex':
                  return hexSlice(this, start, end);

                case 'utf8':
                case 'utf-8':
                  return utf8Slice(this, start, end);

                case 'ascii':
                  return asciiSlice(this, start, end);

                case 'latin1':
                case 'binary':
                  return latin1Slice(this, start, end);

                case 'base64':
                  return base64Slice(this, start, end);

                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return utf16leSlice(this, start, end);

                default:
                  if (loweredCase)
                    throw new TypeError('Unknown encoding: ' + encoding);
                  encoding = (encoding + '').toLowerCase();
                  loweredCase = true;
              }
            }
          }

          // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
          // Buffer instances.
          Buffer.prototype._isBuffer = true;

          function swap(b, n, m) {
            var i = b[n];
            b[n] = b[m];
            b[m] = i;
          }

          Buffer.prototype.swap16 = function swap16() {
            var len = this.length;
            if (len % 2 !== 0) {
              throw new RangeError('Buffer size must be a multiple of 16-bits');
            }
            for (var i = 0; i < len; i += 2) {
              swap(this, i, i + 1);
            }
            return this;
          };

          Buffer.prototype.swap32 = function swap32() {
            var len = this.length;
            if (len % 4 !== 0) {
              throw new RangeError('Buffer size must be a multiple of 32-bits');
            }
            for (var i = 0; i < len; i += 4) {
              swap(this, i, i + 3);
              swap(this, i + 1, i + 2);
            }
            return this;
          };

          Buffer.prototype.swap64 = function swap64() {
            var len = this.length;
            if (len % 8 !== 0) {
              throw new RangeError('Buffer size must be a multiple of 64-bits');
            }
            for (var i = 0; i < len; i += 8) {
              swap(this, i, i + 7);
              swap(this, i + 1, i + 6);
              swap(this, i + 2, i + 5);
              swap(this, i + 3, i + 4);
            }
            return this;
          };

          Buffer.prototype.toString = function toString() {
            var length = this.length | 0;
            if (length === 0) return '';
            if (arguments.length === 0) return utf8Slice(this, 0, length);
            return slowToString.apply(this, arguments);
          };

          Buffer.prototype.equals = function equals(b) {
            if (!Buffer.isBuffer(b))
              throw new TypeError('Argument must be a Buffer');
            if (this === b) return true;
            return Buffer.compare(this, b) === 0;
          };

          Buffer.prototype.inspect = function inspect() {
            var str = '';
            var max = exports.INSPECT_MAX_BYTES;
            if (this.length > 0) {
              str = this.toString('hex', 0, max)
                .match(/.{2}/g)
                .join(' ');
              if (this.length > max) str += ' ... ';
            }
            return '<Buffer ' + str + '>';
          };

          Buffer.prototype.compare = function compare(
            target,
            start,
            end,
            thisStart,
            thisEnd
          ) {
            if (!Buffer.isBuffer(target)) {
              throw new TypeError('Argument must be a Buffer');
            }

            if (start === undefined) {
              start = 0;
            }
            if (end === undefined) {
              end = target ? target.length : 0;
            }
            if (thisStart === undefined) {
              thisStart = 0;
            }
            if (thisEnd === undefined) {
              thisEnd = this.length;
            }

            if (
              start < 0 ||
              end > target.length ||
              thisStart < 0 ||
              thisEnd > this.length
            ) {
              throw new RangeError('out of range index');
            }

            if (thisStart >= thisEnd && start >= end) {
              return 0;
            }
            if (thisStart >= thisEnd) {
              return -1;
            }
            if (start >= end) {
              return 1;
            }

            start >>>= 0;
            end >>>= 0;
            thisStart >>>= 0;
            thisEnd >>>= 0;

            if (this === target) return 0;

            var x = thisEnd - thisStart;
            var y = end - start;
            var len = Math.min(x, y);

            var thisCopy = this.slice(thisStart, thisEnd);
            var targetCopy = target.slice(start, end);

            for (var i = 0; i < len; ++i) {
              if (thisCopy[i] !== targetCopy[i]) {
                x = thisCopy[i];
                y = targetCopy[i];
                break;
              }
            }

            if (x < y) return -1;
            if (y < x) return 1;
            return 0;
          };

          // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
          // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
          //
          // Arguments:
          // - buffer - a Buffer to search
          // - val - a string, Buffer, or number
          // - byteOffset - an index into `buffer`; will be clamped to an int32
          // - encoding - an optional encoding, relevant is val is a string
          // - dir - true for indexOf, false for lastIndexOf
          function bidirectionalIndexOf(
            buffer,
            val,
            byteOffset,
            encoding,
            dir
          ) {
            // Empty buffer means no match
            if (buffer.length === 0) return -1;

            // Normalize byteOffset
            if (typeof byteOffset === 'string') {
              encoding = byteOffset;
              byteOffset = 0;
            } else if (byteOffset > 0x7fffffff) {
              byteOffset = 0x7fffffff;
            } else if (byteOffset < -0x80000000) {
              byteOffset = -0x80000000;
            }
            byteOffset = +byteOffset; // Coerce to Number.
            if (isNaN(byteOffset)) {
              // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
              byteOffset = dir ? 0 : buffer.length - 1;
            }

            // Normalize byteOffset: negative offsets start from the end of the buffer
            if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
            if (byteOffset >= buffer.length) {
              if (dir) return -1;
              else byteOffset = buffer.length - 1;
            } else if (byteOffset < 0) {
              if (dir) byteOffset = 0;
              else return -1;
            }

            // Normalize val
            if (typeof val === 'string') {
              val = Buffer.from(val, encoding);
            }

            // Finally, search either indexOf (if dir is true) or lastIndexOf
            if (Buffer.isBuffer(val)) {
              // Special case: looking for empty string/buffer always fails
              if (val.length === 0) {
                return -1;
              }
              return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
            } else if (typeof val === 'number') {
              val = val & 0xff; // Search for a byte value [0-255]
              if (
                Buffer.TYPED_ARRAY_SUPPORT &&
                typeof Uint8Array.prototype.indexOf === 'function'
              ) {
                if (dir) {
                  return Uint8Array.prototype.indexOf.call(
                    buffer,
                    val,
                    byteOffset
                  );
                } else {
                  return Uint8Array.prototype.lastIndexOf.call(
                    buffer,
                    val,
                    byteOffset
                  );
                }
              }
              return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
            }

            throw new TypeError('val must be string, number or Buffer');
          }

          function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
            var indexSize = 1;
            var arrLength = arr.length;
            var valLength = val.length;

            if (encoding !== undefined) {
              encoding = String(encoding).toLowerCase();
              if (
                encoding === 'ucs2' ||
                encoding === 'ucs-2' ||
                encoding === 'utf16le' ||
                encoding === 'utf-16le'
              ) {
                if (arr.length < 2 || val.length < 2) {
                  return -1;
                }
                indexSize = 2;
                arrLength /= 2;
                valLength /= 2;
                byteOffset /= 2;
              }
            }

            function read(buf, i) {
              if (indexSize === 1) {
                return buf[i];
              } else {
                return buf.readUInt16BE(i * indexSize);
              }
            }

            var i;
            if (dir) {
              var foundIndex = -1;
              for (i = byteOffset; i < arrLength; i++) {
                if (
                  read(arr, i) ===
                  read(val, foundIndex === -1 ? 0 : i - foundIndex)
                ) {
                  if (foundIndex === -1) foundIndex = i;
                  if (i - foundIndex + 1 === valLength)
                    return foundIndex * indexSize;
                } else {
                  if (foundIndex !== -1) i -= i - foundIndex;
                  foundIndex = -1;
                }
              }
            } else {
              if (byteOffset + valLength > arrLength)
                byteOffset = arrLength - valLength;
              for (i = byteOffset; i >= 0; i--) {
                var found = true;
                for (var j = 0; j < valLength; j++) {
                  if (read(arr, i + j) !== read(val, j)) {
                    found = false;
                    break;
                  }
                }
                if (found) return i;
              }
            }

            return -1;
          }

          Buffer.prototype.includes = function includes(
            val,
            byteOffset,
            encoding
          ) {
            return this.indexOf(val, byteOffset, encoding) !== -1;
          };

          Buffer.prototype.indexOf = function indexOf(
            val,
            byteOffset,
            encoding
          ) {
            return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
          };

          Buffer.prototype.lastIndexOf = function lastIndexOf(
            val,
            byteOffset,
            encoding
          ) {
            return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
          };

          function hexWrite(buf, string, offset, length) {
            offset = Number(offset) || 0;
            var remaining = buf.length - offset;
            if (!length) {
              length = remaining;
            } else {
              length = Number(length);
              if (length > remaining) {
                length = remaining;
              }
            }

            // must be an even number of digits
            var strLen = string.length;
            if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

            if (length > strLen / 2) {
              length = strLen / 2;
            }
            for (var i = 0; i < length; ++i) {
              var parsed = parseInt(string.substr(i * 2, 2), 16);
              if (isNaN(parsed)) return i;
              buf[offset + i] = parsed;
            }
            return i;
          }

          function utf8Write(buf, string, offset, length) {
            return blitBuffer(
              utf8ToBytes(string, buf.length - offset),
              buf,
              offset,
              length
            );
          }

          function asciiWrite(buf, string, offset, length) {
            return blitBuffer(asciiToBytes(string), buf, offset, length);
          }

          function latin1Write(buf, string, offset, length) {
            return asciiWrite(buf, string, offset, length);
          }

          function base64Write(buf, string, offset, length) {
            return blitBuffer(base64ToBytes(string), buf, offset, length);
          }

          function ucs2Write(buf, string, offset, length) {
            return blitBuffer(
              utf16leToBytes(string, buf.length - offset),
              buf,
              offset,
              length
            );
          }

          Buffer.prototype.write = function write(
            string,
            offset,
            length,
            encoding
          ) {
            // Buffer#write(string)
            if (offset === undefined) {
              encoding = 'utf8';
              length = this.length;
              offset = 0;
              // Buffer#write(string, encoding)
            } else if (length === undefined && typeof offset === 'string') {
              encoding = offset;
              length = this.length;
              offset = 0;
              // Buffer#write(string, offset[, length][, encoding])
            } else if (isFinite(offset)) {
              offset = offset | 0;
              if (isFinite(length)) {
                length = length | 0;
                if (encoding === undefined) encoding = 'utf8';
              } else {
                encoding = length;
                length = undefined;
              }
              // legacy write(string, encoding, offset, length) - remove in v0.13
            } else {
              throw new Error(
                'Buffer.write(string, encoding, offset[, length]) is no longer supported'
              );
            }

            var remaining = this.length - offset;
            if (length === undefined || length > remaining) length = remaining;

            if (
              (string.length > 0 && (length < 0 || offset < 0)) ||
              offset > this.length
            ) {
              throw new RangeError('Attempt to write outside buffer bounds');
            }

            if (!encoding) encoding = 'utf8';

            var loweredCase = false;
            for (;;) {
              switch (encoding) {
                case 'hex':
                  return hexWrite(this, string, offset, length);

                case 'utf8':
                case 'utf-8':
                  return utf8Write(this, string, offset, length);

                case 'ascii':
                  return asciiWrite(this, string, offset, length);

                case 'latin1':
                case 'binary':
                  return latin1Write(this, string, offset, length);

                case 'base64':
                  // Warning: maxLength not taken into account in base64Write
                  return base64Write(this, string, offset, length);

                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return ucs2Write(this, string, offset, length);

                default:
                  if (loweredCase)
                    throw new TypeError('Unknown encoding: ' + encoding);
                  encoding = ('' + encoding).toLowerCase();
                  loweredCase = true;
              }
            }
          };

          Buffer.prototype.toJSON = function toJSON() {
            return {
              type: 'Buffer',
              data: Array.prototype.slice.call(this._arr || this, 0)
            };
          };

          function base64Slice(buf, start, end) {
            if (start === 0 && end === buf.length) {
              return base64.fromByteArray(buf);
            } else {
              return base64.fromByteArray(buf.slice(start, end));
            }
          }

          function utf8Slice(buf, start, end) {
            end = Math.min(buf.length, end);
            var res = [];

            var i = start;
            while (i < end) {
              var firstByte = buf[i];
              var codePoint = null;
              var bytesPerSequence =
                firstByte > 0xef
                  ? 4
                  : firstByte > 0xdf
                  ? 3
                  : firstByte > 0xbf
                  ? 2
                  : 1;

              if (i + bytesPerSequence <= end) {
                var secondByte, thirdByte, fourthByte, tempCodePoint;

                switch (bytesPerSequence) {
                  case 1:
                    if (firstByte < 0x80) {
                      codePoint = firstByte;
                    }
                    break;
                  case 2:
                    secondByte = buf[i + 1];
                    if ((secondByte & 0xc0) === 0x80) {
                      tempCodePoint =
                        ((firstByte & 0x1f) << 0x6) | (secondByte & 0x3f);
                      if (tempCodePoint > 0x7f) {
                        codePoint = tempCodePoint;
                      }
                    }
                    break;
                  case 3:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    if (
                      (secondByte & 0xc0) === 0x80 &&
                      (thirdByte & 0xc0) === 0x80
                    ) {
                      tempCodePoint =
                        ((firstByte & 0xf) << 0xc) |
                        ((secondByte & 0x3f) << 0x6) |
                        (thirdByte & 0x3f);
                      if (
                        tempCodePoint > 0x7ff &&
                        (tempCodePoint < 0xd800 || tempCodePoint > 0xdfff)
                      ) {
                        codePoint = tempCodePoint;
                      }
                    }
                    break;
                  case 4:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    fourthByte = buf[i + 3];
                    if (
                      (secondByte & 0xc0) === 0x80 &&
                      (thirdByte & 0xc0) === 0x80 &&
                      (fourthByte & 0xc0) === 0x80
                    ) {
                      tempCodePoint =
                        ((firstByte & 0xf) << 0x12) |
                        ((secondByte & 0x3f) << 0xc) |
                        ((thirdByte & 0x3f) << 0x6) |
                        (fourthByte & 0x3f);
                      if (tempCodePoint > 0xffff && tempCodePoint < 0x110000) {
                        codePoint = tempCodePoint;
                      }
                    }
                }
              }

              if (codePoint === null) {
                // we did not generate a valid codePoint so insert a
                // replacement char (U+FFFD) and advance only 1 byte
                codePoint = 0xfffd;
                bytesPerSequence = 1;
              } else if (codePoint > 0xffff) {
                // encode to utf16 (surrogate pair dance)
                codePoint -= 0x10000;
                res.push(((codePoint >>> 10) & 0x3ff) | 0xd800);
                codePoint = 0xdc00 | (codePoint & 0x3ff);
              }

              res.push(codePoint);
              i += bytesPerSequence;
            }

            return decodeCodePointsArray(res);
          }

          // Based on http://stackoverflow.com/a/22747272/680742, the browser with
          // the lowest limit is Chrome, with 0x10000 args.
          // We go 1 magnitude less, for safety
          var MAX_ARGUMENTS_LENGTH = 0x1000;

          function decodeCodePointsArray(codePoints) {
            var len = codePoints.length;
            if (len <= MAX_ARGUMENTS_LENGTH) {
              return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
            }

            // Decode in chunks to avoid "call stack size exceeded".
            var res = '';
            var i = 0;
            while (i < len) {
              res += String.fromCharCode.apply(
                String,
                codePoints.slice(i, (i += MAX_ARGUMENTS_LENGTH))
              );
            }
            return res;
          }

          function asciiSlice(buf, start, end) {
            var ret = '';
            end = Math.min(buf.length, end);

            for (var i = start; i < end; ++i) {
              ret += String.fromCharCode(buf[i] & 0x7f);
            }
            return ret;
          }

          function latin1Slice(buf, start, end) {
            var ret = '';
            end = Math.min(buf.length, end);

            for (var i = start; i < end; ++i) {
              ret += String.fromCharCode(buf[i]);
            }
            return ret;
          }

          function hexSlice(buf, start, end) {
            var len = buf.length;

            if (!start || start < 0) start = 0;
            if (!end || end < 0 || end > len) end = len;

            var out = '';
            for (var i = start; i < end; ++i) {
              out += toHex(buf[i]);
            }
            return out;
          }

          function utf16leSlice(buf, start, end) {
            var bytes = buf.slice(start, end);
            var res = '';
            for (var i = 0; i < bytes.length; i += 2) {
              res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
            }
            return res;
          }

          Buffer.prototype.slice = function slice(start, end) {
            var len = this.length;
            start = ~~start;
            end = end === undefined ? len : ~~end;

            if (start < 0) {
              start += len;
              if (start < 0) start = 0;
            } else if (start > len) {
              start = len;
            }

            if (end < 0) {
              end += len;
              if (end < 0) end = 0;
            } else if (end > len) {
              end = len;
            }

            if (end < start) end = start;

            var newBuf;
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              newBuf = this.subarray(start, end);
              newBuf.__proto__ = Buffer.prototype;
            } else {
              var sliceLen = end - start;
              newBuf = new Buffer(sliceLen, undefined);
              for (var i = 0; i < sliceLen; ++i) {
                newBuf[i] = this[i + start];
              }
            }

            return newBuf;
          };

          /*
           * Need to make sure that buffer isn't trying to write out of bounds.
           */
          function checkOffset(offset, ext, length) {
            if (offset % 1 !== 0 || offset < 0)
              throw new RangeError('offset is not uint');
            if (offset + ext > length)
              throw new RangeError('Trying to access beyond buffer length');
          }

          Buffer.prototype.readUIntLE = function readUIntLE(
            offset,
            byteLength,
            noAssert
          ) {
            offset = offset | 0;
            byteLength = byteLength | 0;
            if (!noAssert) checkOffset(offset, byteLength, this.length);

            var val = this[offset];
            var mul = 1;
            var i = 0;
            while (++i < byteLength && (mul *= 0x100)) {
              val += this[offset + i] * mul;
            }

            return val;
          };

          Buffer.prototype.readUIntBE = function readUIntBE(
            offset,
            byteLength,
            noAssert
          ) {
            offset = offset | 0;
            byteLength = byteLength | 0;
            if (!noAssert) {
              checkOffset(offset, byteLength, this.length);
            }

            var val = this[offset + --byteLength];
            var mul = 1;
            while (byteLength > 0 && (mul *= 0x100)) {
              val += this[offset + --byteLength] * mul;
            }

            return val;
          };

          Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
            if (!noAssert) checkOffset(offset, 1, this.length);
            return this[offset];
          };

          Buffer.prototype.readUInt16LE = function readUInt16LE(
            offset,
            noAssert
          ) {
            if (!noAssert) checkOffset(offset, 2, this.length);
            return this[offset] | (this[offset + 1] << 8);
          };

          Buffer.prototype.readUInt16BE = function readUInt16BE(
            offset,
            noAssert
          ) {
            if (!noAssert) checkOffset(offset, 2, this.length);
            return (this[offset] << 8) | this[offset + 1];
          };

          Buffer.prototype.readUInt32LE = function readUInt32LE(
            offset,
            noAssert
          ) {
            if (!noAssert) checkOffset(offset, 4, this.length);

            return (
              (this[offset] |
                (this[offset + 1] << 8) |
                (this[offset + 2] << 16)) +
              this[offset + 3] * 0x1000000
            );
          };

          Buffer.prototype.readUInt32BE = function readUInt32BE(
            offset,
            noAssert
          ) {
            if (!noAssert) checkOffset(offset, 4, this.length);

            return (
              this[offset] * 0x1000000 +
              ((this[offset + 1] << 16) |
                (this[offset + 2] << 8) |
                this[offset + 3])
            );
          };

          Buffer.prototype.readIntLE = function readIntLE(
            offset,
            byteLength,
            noAssert
          ) {
            offset = offset | 0;
            byteLength = byteLength | 0;
            if (!noAssert) checkOffset(offset, byteLength, this.length);

            var val = this[offset];
            var mul = 1;
            var i = 0;
            while (++i < byteLength && (mul *= 0x100)) {
              val += this[offset + i] * mul;
            }
            mul *= 0x80;

            if (val >= mul) val -= Math.pow(2, 8 * byteLength);

            return val;
          };

          Buffer.prototype.readIntBE = function readIntBE(
            offset,
            byteLength,
            noAssert
          ) {
            offset = offset | 0;
            byteLength = byteLength | 0;
            if (!noAssert) checkOffset(offset, byteLength, this.length);

            var i = byteLength;
            var mul = 1;
            var val = this[offset + --i];
            while (i > 0 && (mul *= 0x100)) {
              val += this[offset + --i] * mul;
            }
            mul *= 0x80;

            if (val >= mul) val -= Math.pow(2, 8 * byteLength);

            return val;
          };

          Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
            if (!noAssert) checkOffset(offset, 1, this.length);
            if (!(this[offset] & 0x80)) return this[offset];
            return (0xff - this[offset] + 1) * -1;
          };

          Buffer.prototype.readInt16LE = function readInt16LE(
            offset,
            noAssert
          ) {
            if (!noAssert) checkOffset(offset, 2, this.length);
            var val = this[offset] | (this[offset + 1] << 8);
            return val & 0x8000 ? val | 0xffff0000 : val;
          };

          Buffer.prototype.readInt16BE = function readInt16BE(
            offset,
            noAssert
          ) {
            if (!noAssert) checkOffset(offset, 2, this.length);
            var val = this[offset + 1] | (this[offset] << 8);
            return val & 0x8000 ? val | 0xffff0000 : val;
          };

          Buffer.prototype.readInt32LE = function readInt32LE(
            offset,
            noAssert
          ) {
            if (!noAssert) checkOffset(offset, 4, this.length);

            return (
              this[offset] |
              (this[offset + 1] << 8) |
              (this[offset + 2] << 16) |
              (this[offset + 3] << 24)
            );
          };

          Buffer.prototype.readInt32BE = function readInt32BE(
            offset,
            noAssert
          ) {
            if (!noAssert) checkOffset(offset, 4, this.length);

            return (
              (this[offset] << 24) |
              (this[offset + 1] << 16) |
              (this[offset + 2] << 8) |
              this[offset + 3]
            );
          };

          Buffer.prototype.readFloatLE = function readFloatLE(
            offset,
            noAssert
          ) {
            if (!noAssert) checkOffset(offset, 4, this.length);
            return ieee754.read(this, offset, true, 23, 4);
          };

          Buffer.prototype.readFloatBE = function readFloatBE(
            offset,
            noAssert
          ) {
            if (!noAssert) checkOffset(offset, 4, this.length);
            return ieee754.read(this, offset, false, 23, 4);
          };

          Buffer.prototype.readDoubleLE = function readDoubleLE(
            offset,
            noAssert
          ) {
            if (!noAssert) checkOffset(offset, 8, this.length);
            return ieee754.read(this, offset, true, 52, 8);
          };

          Buffer.prototype.readDoubleBE = function readDoubleBE(
            offset,
            noAssert
          ) {
            if (!noAssert) checkOffset(offset, 8, this.length);
            return ieee754.read(this, offset, false, 52, 8);
          };

          function checkInt(buf, value, offset, ext, max, min) {
            if (!Buffer.isBuffer(buf))
              throw new TypeError(
                '"buffer" argument must be a Buffer instance'
              );
            if (value > max || value < min)
              throw new RangeError('"value" argument is out of bounds');
            if (offset + ext > buf.length)
              throw new RangeError('Index out of range');
          }

          Buffer.prototype.writeUIntLE = function writeUIntLE(
            value,
            offset,
            byteLength,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            byteLength = byteLength | 0;
            if (!noAssert) {
              var maxBytes = Math.pow(2, 8 * byteLength) - 1;
              checkInt(this, value, offset, byteLength, maxBytes, 0);
            }

            var mul = 1;
            var i = 0;
            this[offset] = value & 0xff;
            while (++i < byteLength && (mul *= 0x100)) {
              this[offset + i] = (value / mul) & 0xff;
            }

            return offset + byteLength;
          };

          Buffer.prototype.writeUIntBE = function writeUIntBE(
            value,
            offset,
            byteLength,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            byteLength = byteLength | 0;
            if (!noAssert) {
              var maxBytes = Math.pow(2, 8 * byteLength) - 1;
              checkInt(this, value, offset, byteLength, maxBytes, 0);
            }

            var i = byteLength - 1;
            var mul = 1;
            this[offset + i] = value & 0xff;
            while (--i >= 0 && (mul *= 0x100)) {
              this[offset + i] = (value / mul) & 0xff;
            }

            return offset + byteLength;
          };

          Buffer.prototype.writeUInt8 = function writeUInt8(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
            if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
            this[offset] = value & 0xff;
            return offset + 1;
          };

          function objectWriteUInt16(buf, value, offset, littleEndian) {
            if (value < 0) value = 0xffff + value + 1;
            for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
              buf[offset + i] =
                (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
                ((littleEndian ? i : 1 - i) * 8);
            }
          }

          Buffer.prototype.writeUInt16LE = function writeUInt16LE(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              this[offset] = value & 0xff;
              this[offset + 1] = value >>> 8;
            } else {
              objectWriteUInt16(this, value, offset, true);
            }
            return offset + 2;
          };

          Buffer.prototype.writeUInt16BE = function writeUInt16BE(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              this[offset] = value >>> 8;
              this[offset + 1] = value & 0xff;
            } else {
              objectWriteUInt16(this, value, offset, false);
            }
            return offset + 2;
          };

          function objectWriteUInt32(buf, value, offset, littleEndian) {
            if (value < 0) value = 0xffffffff + value + 1;
            for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
              buf[offset + i] =
                (value >>> ((littleEndian ? i : 3 - i) * 8)) & 0xff;
            }
          }

          Buffer.prototype.writeUInt32LE = function writeUInt32LE(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              this[offset + 3] = value >>> 24;
              this[offset + 2] = value >>> 16;
              this[offset + 1] = value >>> 8;
              this[offset] = value & 0xff;
            } else {
              objectWriteUInt32(this, value, offset, true);
            }
            return offset + 4;
          };

          Buffer.prototype.writeUInt32BE = function writeUInt32BE(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              this[offset] = value >>> 24;
              this[offset + 1] = value >>> 16;
              this[offset + 2] = value >>> 8;
              this[offset + 3] = value & 0xff;
            } else {
              objectWriteUInt32(this, value, offset, false);
            }
            return offset + 4;
          };

          Buffer.prototype.writeIntLE = function writeIntLE(
            value,
            offset,
            byteLength,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            if (!noAssert) {
              var limit = Math.pow(2, 8 * byteLength - 1);

              checkInt(this, value, offset, byteLength, limit - 1, -limit);
            }

            var i = 0;
            var mul = 1;
            var sub = 0;
            this[offset] = value & 0xff;
            while (++i < byteLength && (mul *= 0x100)) {
              if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
                sub = 1;
              }
              this[offset + i] = (((value / mul) >> 0) - sub) & 0xff;
            }

            return offset + byteLength;
          };

          Buffer.prototype.writeIntBE = function writeIntBE(
            value,
            offset,
            byteLength,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            if (!noAssert) {
              var limit = Math.pow(2, 8 * byteLength - 1);

              checkInt(this, value, offset, byteLength, limit - 1, -limit);
            }

            var i = byteLength - 1;
            var mul = 1;
            var sub = 0;
            this[offset + i] = value & 0xff;
            while (--i >= 0 && (mul *= 0x100)) {
              if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
                sub = 1;
              }
              this[offset + i] = (((value / mul) >> 0) - sub) & 0xff;
            }

            return offset + byteLength;
          };

          Buffer.prototype.writeInt8 = function writeInt8(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
            if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
            if (value < 0) value = 0xff + value + 1;
            this[offset] = value & 0xff;
            return offset + 1;
          };

          Buffer.prototype.writeInt16LE = function writeInt16LE(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              this[offset] = value & 0xff;
              this[offset + 1] = value >>> 8;
            } else {
              objectWriteUInt16(this, value, offset, true);
            }
            return offset + 2;
          };

          Buffer.prototype.writeInt16BE = function writeInt16BE(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              this[offset] = value >>> 8;
              this[offset + 1] = value & 0xff;
            } else {
              objectWriteUInt16(this, value, offset, false);
            }
            return offset + 2;
          };

          Buffer.prototype.writeInt32LE = function writeInt32LE(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            if (!noAssert)
              checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              this[offset] = value & 0xff;
              this[offset + 1] = value >>> 8;
              this[offset + 2] = value >>> 16;
              this[offset + 3] = value >>> 24;
            } else {
              objectWriteUInt32(this, value, offset, true);
            }
            return offset + 4;
          };

          Buffer.prototype.writeInt32BE = function writeInt32BE(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            if (!noAssert)
              checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
            if (value < 0) value = 0xffffffff + value + 1;
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              this[offset] = value >>> 24;
              this[offset + 1] = value >>> 16;
              this[offset + 2] = value >>> 8;
              this[offset + 3] = value & 0xff;
            } else {
              objectWriteUInt32(this, value, offset, false);
            }
            return offset + 4;
          };

          function checkIEEE754(buf, value, offset, ext, max, min) {
            if (offset + ext > buf.length)
              throw new RangeError('Index out of range');
            if (offset < 0) throw new RangeError('Index out of range');
          }

          function writeFloat(buf, value, offset, littleEndian, noAssert) {
            if (!noAssert) {
              checkIEEE754(
                buf,
                value,
                offset,
                4,
                3.4028234663852886e38,
                -3.4028234663852886e38
              );
            }
            ieee754.write(buf, value, offset, littleEndian, 23, 4);
            return offset + 4;
          }

          Buffer.prototype.writeFloatLE = function writeFloatLE(
            value,
            offset,
            noAssert
          ) {
            return writeFloat(this, value, offset, true, noAssert);
          };

          Buffer.prototype.writeFloatBE = function writeFloatBE(
            value,
            offset,
            noAssert
          ) {
            return writeFloat(this, value, offset, false, noAssert);
          };

          function writeDouble(buf, value, offset, littleEndian, noAssert) {
            if (!noAssert) {
              checkIEEE754(
                buf,
                value,
                offset,
                8,
                1.7976931348623157e308,
                -1.7976931348623157e308
              );
            }
            ieee754.write(buf, value, offset, littleEndian, 52, 8);
            return offset + 8;
          }

          Buffer.prototype.writeDoubleLE = function writeDoubleLE(
            value,
            offset,
            noAssert
          ) {
            return writeDouble(this, value, offset, true, noAssert);
          };

          Buffer.prototype.writeDoubleBE = function writeDoubleBE(
            value,
            offset,
            noAssert
          ) {
            return writeDouble(this, value, offset, false, noAssert);
          };

          // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
          Buffer.prototype.copy = function copy(
            target,
            targetStart,
            start,
            end
          ) {
            if (!start) start = 0;
            if (!end && end !== 0) end = this.length;
            if (targetStart >= target.length) targetStart = target.length;
            if (!targetStart) targetStart = 0;
            if (end > 0 && end < start) end = start;

            // Copy 0 bytes; we're done
            if (end === start) return 0;
            if (target.length === 0 || this.length === 0) return 0;

            // Fatal error conditions
            if (targetStart < 0) {
              throw new RangeError('targetStart out of bounds');
            }
            if (start < 0 || start >= this.length)
              throw new RangeError('sourceStart out of bounds');
            if (end < 0) throw new RangeError('sourceEnd out of bounds');

            // Are we oob?
            if (end > this.length) end = this.length;
            if (target.length - targetStart < end - start) {
              end = target.length - targetStart + start;
            }

            var len = end - start;
            var i;

            if (this === target && start < targetStart && targetStart < end) {
              // descending copy from end
              for (i = len - 1; i >= 0; --i) {
                target[i + targetStart] = this[i + start];
              }
            } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
              // ascending copy from start
              for (i = 0; i < len; ++i) {
                target[i + targetStart] = this[i + start];
              }
            } else {
              Uint8Array.prototype.set.call(
                target,
                this.subarray(start, start + len),
                targetStart
              );
            }

            return len;
          };

          // Usage:
          //    buffer.fill(number[, offset[, end]])
          //    buffer.fill(buffer[, offset[, end]])
          //    buffer.fill(string[, offset[, end]][, encoding])
          Buffer.prototype.fill = function fill(val, start, end, encoding) {
            // Handle string cases:
            if (typeof val === 'string') {
              if (typeof start === 'string') {
                encoding = start;
                start = 0;
                end = this.length;
              } else if (typeof end === 'string') {
                encoding = end;
                end = this.length;
              }
              if (val.length === 1) {
                var code = val.charCodeAt(0);
                if (code < 256) {
                  val = code;
                }
              }
              if (encoding !== undefined && typeof encoding !== 'string') {
                throw new TypeError('encoding must be a string');
              }
              if (
                typeof encoding === 'string' &&
                !Buffer.isEncoding(encoding)
              ) {
                throw new TypeError('Unknown encoding: ' + encoding);
              }
            } else if (typeof val === 'number') {
              val = val & 255;
            }

            // Invalid ranges are not set to a default, so can range check early.
            if (start < 0 || this.length < start || this.length < end) {
              throw new RangeError('Out of range index');
            }

            if (end <= start) {
              return this;
            }

            start = start >>> 0;
            end = end === undefined ? this.length : end >>> 0;

            if (!val) val = 0;

            var i;
            if (typeof val === 'number') {
              for (i = start; i < end; ++i) {
                this[i] = val;
              }
            } else {
              var bytes = Buffer.isBuffer(val)
                ? val
                : utf8ToBytes(new Buffer(val, encoding).toString());
              var len = bytes.length;
              for (i = 0; i < end - start; ++i) {
                this[i + start] = bytes[i % len];
              }
            }

            return this;
          };

          // HELPER FUNCTIONS
          // ================

          var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

          function base64clean(str) {
            // Node strips out invalid characters like \n and \t from the string, base64-js does not
            str = stringtrim(str).replace(INVALID_BASE64_RE, '');
            // Node converts strings with length < 2 to ''
            if (str.length < 2) return '';
            // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
            while (str.length % 4 !== 0) {
              str = str + '=';
            }
            return str;
          }

          function stringtrim(str) {
            if (str.trim) return str.trim();
            return str.replace(/^\s+|\s+$/g, '');
          }

          function toHex(n) {
            if (n < 16) return '0' + n.toString(16);
            return n.toString(16);
          }

          function utf8ToBytes(string, units) {
            units = units || Infinity;
            var codePoint;
            var length = string.length;
            var leadSurrogate = null;
            var bytes = [];

            for (var i = 0; i < length; ++i) {
              codePoint = string.charCodeAt(i);

              // is surrogate component
              if (codePoint > 0xd7ff && codePoint < 0xe000) {
                // last char was a lead
                if (!leadSurrogate) {
                  // no lead yet
                  if (codePoint > 0xdbff) {
                    // unexpected trail
                    if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
                    continue;
                  } else if (i + 1 === length) {
                    // unpaired lead
                    if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
                    continue;
                  }

                  // valid lead
                  leadSurrogate = codePoint;

                  continue;
                }

                // 2 leads in a row
                if (codePoint < 0xdc00) {
                  if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
                  leadSurrogate = codePoint;
                  continue;
                }

                // valid surrogate pair
                codePoint =
                  (((leadSurrogate - 0xd800) << 10) | (codePoint - 0xdc00)) +
                  0x10000;
              } else if (leadSurrogate) {
                // valid bmp char, but last char was a lead
                if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
              }

              leadSurrogate = null;

              // encode utf8
              if (codePoint < 0x80) {
                if ((units -= 1) < 0) break;
                bytes.push(codePoint);
              } else if (codePoint < 0x800) {
                if ((units -= 2) < 0) break;
                bytes.push(
                  (codePoint >> 0x6) | 0xc0,
                  (codePoint & 0x3f) | 0x80
                );
              } else if (codePoint < 0x10000) {
                if ((units -= 3) < 0) break;
                bytes.push(
                  (codePoint >> 0xc) | 0xe0,
                  ((codePoint >> 0x6) & 0x3f) | 0x80,
                  (codePoint & 0x3f) | 0x80
                );
              } else if (codePoint < 0x110000) {
                if ((units -= 4) < 0) break;
                bytes.push(
                  (codePoint >> 0x12) | 0xf0,
                  ((codePoint >> 0xc) & 0x3f) | 0x80,
                  ((codePoint >> 0x6) & 0x3f) | 0x80,
                  (codePoint & 0x3f) | 0x80
                );
              } else {
                throw new Error('Invalid code point');
              }
            }

            return bytes;
          }

          function asciiToBytes(str) {
            var byteArray = [];
            for (var i = 0; i < str.length; ++i) {
              // Node's code seems to be doing this and not & 0x7F..
              byteArray.push(str.charCodeAt(i) & 0xff);
            }
            return byteArray;
          }

          function utf16leToBytes(str, units) {
            var c, hi, lo;
            var byteArray = [];
            for (var i = 0; i < str.length; ++i) {
              if ((units -= 2) < 0) break;

              c = str.charCodeAt(i);
              hi = c >> 8;
              lo = c % 256;
              byteArray.push(lo);
              byteArray.push(hi);
            }

            return byteArray;
          }

          function base64ToBytes(str) {
            return base64.toByteArray(base64clean(str));
          }

          function blitBuffer(src, dst, offset, length) {
            for (var i = 0; i < length; ++i) {
              if (i + offset >= dst.length || i >= src.length) break;
              dst[i + offset] = src[i];
            }
            return i;
          }

          function isnan(val) {
            return val !== val; // eslint-disable-line no-self-compare
          }

          /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(6)));

        /***/
      },
      /* 4 */
      /***/ function(module, exports) {
        if (typeof Object.create === 'function') {
          // implementation from standard node.js 'util' module
          module.exports = function inherits(ctor, superCtor) {
            if (superCtor) {
              ctor.super_ = superCtor;
              ctor.prototype = Object.create(superCtor.prototype, {
                constructor: {
                  value: ctor,
                  enumerable: false,
                  writable: true,
                  configurable: true
                }
              });
            }
          };
        } else {
          // old school shim for old browsers
          module.exports = function inherits(ctor, superCtor) {
            if (superCtor) {
              ctor.super_ = superCtor;
              var TempCtor = function() {};
              TempCtor.prototype = superCtor.prototype;
              ctor.prototype = new TempCtor();
              ctor.prototype.constructor = ctor;
            }
          };
        }

        /***/
      },
      /* 5 */
      /***/ function(module, exports) {
        // shim for using process in browser
        var process = (module.exports = {});

        // cached from whatever global is present so that test runners that stub it
        // don't break things.  But we need to wrap it in a try catch in case it is
        // wrapped in strict mode code which doesn't define any globals.  It's inside a
        // function because try/catches deoptimize in certain engines.

        var cachedSetTimeout;
        var cachedClearTimeout;

        function defaultSetTimout() {
          throw new Error('setTimeout has not been defined');
        }
        function defaultClearTimeout() {
          throw new Error('clearTimeout has not been defined');
        }
        (function() {
          try {
            if (typeof setTimeout === 'function') {
              cachedSetTimeout = setTimeout;
            } else {
              cachedSetTimeout = defaultSetTimout;
            }
          } catch (e) {
            cachedSetTimeout = defaultSetTimout;
          }
          try {
            if (typeof clearTimeout === 'function') {
              cachedClearTimeout = clearTimeout;
            } else {
              cachedClearTimeout = defaultClearTimeout;
            }
          } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
          }
        })();
        function runTimeout(fun) {
          if (cachedSetTimeout === setTimeout) {
            //normal enviroments in sane situations
            return setTimeout(fun, 0);
          }
          // if setTimeout wasn't available but was latter defined
          if (
            (cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) &&
            setTimeout
          ) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
          }
          try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedSetTimeout(fun, 0);
          } catch (e) {
            try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
              return cachedSetTimeout.call(null, fun, 0);
            } catch (e) {
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
              return cachedSetTimeout.call(this, fun, 0);
            }
          }
        }
        function runClearTimeout(marker) {
          if (cachedClearTimeout === clearTimeout) {
            //normal enviroments in sane situations
            return clearTimeout(marker);
          }
          // if clearTimeout wasn't available but was latter defined
          if (
            (cachedClearTimeout === defaultClearTimeout ||
              !cachedClearTimeout) &&
            clearTimeout
          ) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
          }
          try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedClearTimeout(marker);
          } catch (e) {
            try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
              return cachedClearTimeout.call(null, marker);
            } catch (e) {
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
              // Some versions of I.E. have different rules for clearTimeout vs setTimeout
              return cachedClearTimeout.call(this, marker);
            }
          }
        }
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;

        function cleanUpNextTick() {
          if (!draining || !currentQueue) {
            return;
          }
          draining = false;
          if (currentQueue.length) {
            queue = currentQueue.concat(queue);
          } else {
            queueIndex = -1;
          }
          if (queue.length) {
            drainQueue();
          }
        }

        function drainQueue() {
          if (draining) {
            return;
          }
          var timeout = runTimeout(cleanUpNextTick);
          draining = true;

          var len = queue.length;
          while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
              if (currentQueue) {
                currentQueue[queueIndex].run();
              }
            }
            queueIndex = -1;
            len = queue.length;
          }
          currentQueue = null;
          draining = false;
          runClearTimeout(timeout);
        }

        process.nextTick = function(fun) {
          var args = new Array(arguments.length - 1);
          if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
            }
          }
          queue.push(new Item(fun, args));
          if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
          }
        };

        // v8 likes predictible objects
        function Item(fun, array) {
          this.fun = fun;
          this.array = array;
        }
        Item.prototype.run = function() {
          this.fun.apply(null, this.array);
        };
        process.title = 'browser';
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = ''; // empty string to avoid regexp issues
        process.versions = {};

        function noop() {}

        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.prependListener = noop;
        process.prependOnceListener = noop;

        process.listeners = function(name) {
          return [];
        };

        process.binding = function(name) {
          throw new Error('process.binding is not supported');
        };

        process.cwd = function() {
          return '/';
        };
        process.chdir = function(dir) {
          throw new Error('process.chdir is not supported');
        };
        process.umask = function() {
          return 0;
        };

        /***/
      },
      /* 6 */
      /***/ function(module, exports) {
        var g;

        // This works in non-strict mode
        g = (function() {
          return this;
        })();

        try {
          // This works if eval is allowed (see CSP)
          g = g || Function('return this')() || (1, eval)('this');
        } catch (e) {
          // This works if the window reference is available
          if (typeof window === 'object') g = window;
        }

        // g can still be undefined, but nothing to do about it...
        // We return undefined, instead of nothing here, so it's
        // easier to handle this case. if(!global) { ...}

        module.exports = g;

        /***/
      },
      /* 7 */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict';
        const RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
          XSD = 'http://www.w3.org/2001/XMLSchema#',
          SWAP = 'http://www.w3.org/2000/10/swap/';

        /* harmony default export */ __webpack_exports__['a'] = {
          xsd: {
            decimal: `${XSD}decimal`,
            boolean: `${XSD}boolean`,
            double: `${XSD}double`,
            integer: `${XSD}integer`,
            string: `${XSD}string`
          },
          rdf: {
            type: `${RDF}type`,
            nil: `${RDF}nil`,
            first: `${RDF}first`,
            rest: `${RDF}rest`,
            langString: `${RDF}langString`
          },
          owl: {
            sameAs: 'http://www.w3.org/2002/07/owl#sameAs'
          },
          r: {
            forSome: `${SWAP}reify#forSome`,
            forAll: `${SWAP}reify#forAll`
          },
          log: {
            implies: `${SWAP}log#implies`
          }
        };

        /***/
      },
      /* 8 */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict';
        Object.defineProperty(__webpack_exports__, '__esModule', {
          value: true
        });
        /* harmony export (immutable) */ __webpack_exports__[
          'isNamedNode'
        ] = isNamedNode;
        /* harmony export (immutable) */ __webpack_exports__[
          'isBlankNode'
        ] = isBlankNode;
        /* harmony export (immutable) */ __webpack_exports__[
          'isLiteral'
        ] = isLiteral;
        /* harmony export (immutable) */ __webpack_exports__[
          'isVariable'
        ] = isVariable;
        /* harmony export (immutable) */ __webpack_exports__[
          'isDefaultGraph'
        ] = isDefaultGraph;
        /* harmony export (immutable) */ __webpack_exports__[
          'inDefaultGraph'
        ] = inDefaultGraph;
        /* harmony export (immutable) */ __webpack_exports__['prefix'] = prefix;
        /* harmony export (immutable) */ __webpack_exports__[
          'prefixes'
        ] = prefixes;
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__ = __webpack_require__(
          2
        );
        // **N3Util** provides N3 utility functions.

        // Tests whether the given term represents an IRI
        function isNamedNode(term) {
          return !!term && term.termType === 'NamedNode';
        }

        // Tests whether the given term represents a blank node
        function isBlankNode(term) {
          return !!term && term.termType === 'BlankNode';
        }

        // Tests whether the given term represents a literal
        function isLiteral(term) {
          return !!term && term.termType === 'Literal';
        }

        // Tests whether the given term represents a variable
        function isVariable(term) {
          return !!term && term.termType === 'Variable';
        }

        // Tests whether the given term represents the default graph
        function isDefaultGraph(term) {
          return !!term && term.termType === 'DefaultGraph';
        }

        // Tests whether the given quad is in the default graph
        function inDefaultGraph(quad) {
          return isDefaultGraph(quad.graph);
        }

        // Creates a function that prepends the given IRI to a local name
        function prefix(iri, factory) {
          return prefixes({ '': iri }, factory)('');
        }

        // Creates a function that allows registering and expanding prefixes
        function prefixes(defaultPrefixes, factory) {
          // Add all of the default prefixes
          const prefixes = Object.create(null);
          for (const prefix in defaultPrefixes)
            processPrefix(prefix, defaultPrefixes[prefix]);
          // Set the default factory if none was specified
          factory =
            factory ||
            __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['a' /* default */];

          // Registers a new prefix (if an IRI was specified)
          // or retrieves a function that expands an existing prefix (if no IRI was specified)
          function processPrefix(prefix, iri) {
            // Create a new prefix if an IRI is specified or the prefix doesn't exist
            if (typeof iri === 'string') {
              // Create a function that expands the prefix
              const cache = Object.create(null);
              prefixes[prefix] = local => {
                return (
                  cache[local] ||
                  (cache[local] = factory.namedNode(iri + local))
                );
              };
            } else if (!(prefix in prefixes)) {
              throw new Error(`Unknown prefix: ${prefix}`);
            }
            return prefixes[prefix];
          }
          return processPrefix;
        }

        /***/
      },
      /* 9 */
      /***/ function(module, exports, __webpack_require__) {
        'use strict';
        // Ported from https://github.com/mafintosh/end-of-stream with
        // permission from the author, Mathias Buus (@mafintosh).

        var ERR_STREAM_PREMATURE_CLOSE = __webpack_require__(0).codes
          .ERR_STREAM_PREMATURE_CLOSE;

        function once(callback) {
          var called = false;
          return function() {
            if (called) return;
            called = true;

            for (
              var _len = arguments.length, args = new Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              args[_key] = arguments[_key];
            }

            callback.apply(this, args);
          };
        }

        function noop() {}

        function isRequest(stream) {
          return stream.setHeader && typeof stream.abort === 'function';
        }

        function eos(stream, opts, callback) {
          if (typeof opts === 'function') return eos(stream, null, opts);
          if (!opts) opts = {};
          callback = once(callback || noop);
          var readable =
            opts.readable || (opts.readable !== false && stream.readable);
          var writable =
            opts.writable || (opts.writable !== false && stream.writable);

          var onlegacyfinish = function onlegacyfinish() {
            if (!stream.writable) onfinish();
          };

          var writableEnded =
            stream._writableState && stream._writableState.finished;

          var onfinish = function onfinish() {
            writable = false;
            writableEnded = true;
            if (!readable) callback.call(stream);
          };

          var readableEnded =
            stream._readableState && stream._readableState.endEmitted;

          var onend = function onend() {
            readable = false;
            readableEnded = true;
            if (!writable) callback.call(stream);
          };

          var onerror = function onerror(err) {
            callback.call(stream, err);
          };

          var onclose = function onclose() {
            var err;

            if (readable && !readableEnded) {
              if (!stream._readableState || !stream._readableState.ended)
                err = new ERR_STREAM_PREMATURE_CLOSE();
              return callback.call(stream, err);
            }

            if (writable && !writableEnded) {
              if (!stream._writableState || !stream._writableState.ended)
                err = new ERR_STREAM_PREMATURE_CLOSE();
              return callback.call(stream, err);
            }
          };

          var onrequest = function onrequest() {
            stream.req.on('finish', onfinish);
          };

          if (isRequest(stream)) {
            stream.on('complete', onfinish);
            stream.on('abort', onclose);
            if (stream.req) onrequest();
            else stream.on('request', onrequest);
          } else if (writable && !stream._writableState) {
            // legacy streams
            stream.on('end', onlegacyfinish);
            stream.on('close', onlegacyfinish);
          }

          stream.on('end', onend);
          stream.on('finish', onfinish);
          if (opts.error !== false) stream.on('error', onerror);
          stream.on('close', onclose);
          return function() {
            stream.removeListener('complete', onfinish);
            stream.removeListener('abort', onclose);
            stream.removeListener('request', onrequest);
            if (stream.req) stream.req.removeListener('finish', onfinish);
            stream.removeListener('end', onlegacyfinish);
            stream.removeListener('close', onlegacyfinish);
            stream.removeListener('finish', onfinish);
            stream.removeListener('end', onend);
            stream.removeListener('error', onerror);
            stream.removeListener('close', onclose);
          };
        }

        module.exports = eos;

        /***/
      },
      /* 10 */
      /***/ function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(15);
        exports.Stream = exports;
        exports.Readable = exports;
        exports.Writable = __webpack_require__(17);
        exports.Duplex = __webpack_require__(1);
        exports.Transform = __webpack_require__(16);
        exports.PassThrough = __webpack_require__(29);
        exports.finished = __webpack_require__(9);
        exports.pipeline = __webpack_require__(33);

        /***/
      },
      /* 11 */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict';
        /* WEBPACK VAR INJECTION */ (function(Buffer) {
          /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__IRIs__ = __webpack_require__(
            7
          );
          /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_queue_microtask__ = __webpack_require__(
            28
          );
          /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_queue_microtask___default = __webpack_require__.n(
            __WEBPACK_IMPORTED_MODULE_1_queue_microtask__
          );
          // **N3Lexer** tokenizes N3 documents.

          const { xsd } = __WEBPACK_IMPORTED_MODULE_0__IRIs__[
            'a' /* default */
          ];

          // Regular expression and replacement string to escape N3 strings
          const escapeSequence = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\([^])/g;
          const escapeReplacements = {
            '\\': '\\',
            "'": "'",
            '"': '"',
            n: '\n',
            r: '\r',
            t: '\t',
            f: '\f',
            b: '\b',
            _: '_',
            '~': '~',
            '.': '.',
            '-': '-',
            '!': '!',
            $: '$',
            '&': '&',
            '(': '(',
            ')': ')',
            '*': '*',
            '+': '+',
            ',': ',',
            ';': ';',
            '=': '=',
            '/': '/',
            '?': '?',
            '#': '#',
            '@': '@',
            '%': '%'
          };
          const illegalIriChars = /[\x00-\x20<>\\"\{\}\|\^\`]/;

          const lineModeRegExps = {
            _iri: true,
            _unescapedIri: true,
            _simpleQuotedString: true,
            _langcode: true,
            _blank: true,
            _newline: true,
            _comment: true,
            _whitespace: true,
            _endOfFile: true
          };
          const invalidRegExp = /$0^/;

          // ## Constructor
          class N3Lexer {
            constructor(options) {
              // ## Regular expressions
              // It's slightly faster to have these as properties than as in-scope variables
              this._iri = /^<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/; // IRI with escape sequences; needs sanity check after unescaping
              this._unescapedIri = /^<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/; // IRI without escape sequences; no unescaping
              this._simpleQuotedString = /^"([^"\\\r\n]*)"(?=[^"])/; // string without escape sequences
              this._simpleApostropheString = /^'([^'\\\r\n]*)'(?=[^'])/;
              this._langcode = /^@([a-z]+(?:-[a-z0-9]+)*)(?=[^a-z0-9\-])/i;
              this._prefix = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:(?=[#\s<])/;
              this._prefixed = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:((?:(?:[0-:A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])(?:(?:[\.\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])*(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~]))?)?)(?:[ \t]+|(?=\.?[,;!\^\s#()\[\]\{\}"'<>]))/;
              this._variable = /^\?(?:(?:[A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?=[.,;!\^\s#()\[\]\{\}"'<>])/;
              this._blank = /^_:((?:[0-9A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?:[ \t]+|(?=\.?[,;:\s#()\[\]\{\}"'<>]))/;
              this._number = /^[\-+]?(?:(\d+\.\d*|\.?\d+)[eE][\-+]?|\d*(\.)?)\d+(?=\.?[,;:\s#()\[\]\{\}"'<>])/;
              this._boolean = /^(?:true|false)(?=[.,;\s#()\[\]\{\}"'<>])/;
              this._keyword = /^@[a-z]+(?=[\s#<:])/i;
              this._sparqlKeyword = /^(?:PREFIX|BASE|GRAPH)(?=[\s#<])/i;
              this._shortPredicates = /^a(?=[\s#()\[\]\{\}"'<>])/;
              this._newline = /^[ \t]*(?:#[^\n\r]*)?(?:\r\n|\n|\r)[ \t]*/;
              this._comment = /#([^\n\r]*)/;
              this._whitespace = /^[ \t]+/;
              this._endOfFile = /^(?:#[^\n\r]*)?$/;
              options = options || {};

              // In line mode (N-Triples or N-Quads), only simple features may be parsed
              if ((this._lineMode = !!options.lineMode)) {
                this._n3Mode = false;
                // Don't tokenize special literals
                for (const key in this) {
                  if (!(key in lineModeRegExps) && this[key] instanceof RegExp)
                    this[key] = invalidRegExp;
                }
              }
              // When not in line mode, enable N3 functionality by default
              else {
                this._n3Mode = options.n3 !== false;
              }
              // Don't output comment tokens by default
              this._comments = !!options.comments;
              // Cache the last tested closing position of long literals
              this._literalClosingPos = 0;
            }

            // ## Private methods

            // ### `_tokenizeToEnd` tokenizes as for as possible, emitting tokens through the callback
            _tokenizeToEnd(callback, inputFinished) {
              // Continue parsing as far as possible; the loop will return eventually
              let input = this._input;
              const outputComments = this._comments;
              while (true) {
                // Count and skip whitespace lines
                let whiteSpaceMatch, comment;
                while ((whiteSpaceMatch = this._newline.exec(input))) {
                  // Try to find a comment
                  if (
                    outputComments &&
                    (comment = this._comment.exec(whiteSpaceMatch[0]))
                  )
                    callback(null, {
                      line: this._line,
                      type: 'comment',
                      value: comment[1],
                      prefix: ''
                    });
                  // Advance the input
                  input = input.substr(whiteSpaceMatch[0].length, input.length);
                  this._line++;
                }
                // Skip whitespace on current line
                if (
                  !whiteSpaceMatch &&
                  (whiteSpaceMatch = this._whitespace.exec(input))
                )
                  input = input.substr(whiteSpaceMatch[0].length, input.length);

                // Stop for now if we're at the end
                if (this._endOfFile.test(input)) {
                  // If the input is finished, emit EOF
                  if (inputFinished) {
                    // Try to find a final comment
                    if (outputComments && (comment = this._comment.exec(input)))
                      callback(null, {
                        line: this._line,
                        type: 'comment',
                        value: comment[1],
                        prefix: ''
                      });
                    callback((input = null), {
                      line: this._line,
                      type: 'eof',
                      value: '',
                      prefix: ''
                    });
                  }
                  return (this._input = input);
                }

                // Look for specific token types based on the first character
                const line = this._line,
                  firstChar = input[0];
                let type = '',
                  value = '',
                  prefix = '',
                  match = null,
                  matchLength = 0,
                  inconclusive = false;
                switch (firstChar) {
                  case '^':
                    // We need at least 3 tokens lookahead to distinguish ^^<IRI> and ^^pre:fixed
                    if (input.length < 3) break;
                    // Try to match a type
                    else if (input[1] === '^') {
                      this._previousMarker = '^^';
                      // Move to type IRI or prefixed name
                      input = input.substr(2);
                      if (input[0] !== '<') {
                        inconclusive = true;
                        break;
                      }
                    }
                    // If no type, it must be a path expression
                    else {
                      if (this._n3Mode) {
                        matchLength = 1;
                        type = '^';
                      }
                      break;
                    }
                  // Fall through in case the type is an IRI
                  case '<':
                    // Try to find a full IRI without escape sequences
                    if ((match = this._unescapedIri.exec(input)))
                      (type = 'IRI'), (value = match[1]);
                    // Try to find a full IRI with escape sequences
                    else if ((match = this._iri.exec(input))) {
                      value = this._unescape(match[1]);
                      if (value === null || illegalIriChars.test(value))
                        return reportSyntaxError(this);
                      type = 'IRI';
                    }
                    // Try to find a nested triple
                    else if (input.length > 1 && input[1] === '<')
                      (type = '<<'), (matchLength = 2);
                    // Try to find a backwards implication arrow
                    else if (
                      this._n3Mode &&
                      input.length > 1 &&
                      input[1] === '='
                    )
                      (type = 'inverse'), (matchLength = 2), (value = '>');
                    break;

                  case '>':
                    if (input.length > 1 && input[1] === '>')
                      (type = '>>'), (matchLength = 2);
                    break;

                  case '_':
                    // Try to find a blank node. Since it can contain (but not end with) a dot,
                    // we always need a non-dot character before deciding it is a blank node.
                    // Therefore, try inserting a space if we're at the end of the input.
                    if (
                      (match = this._blank.exec(input)) ||
                      (inputFinished && (match = this._blank.exec(`${input} `)))
                    )
                      (type = 'blank'), (prefix = '_'), (value = match[1]);
                    break;

                  case '"':
                    // Try to find a literal without escape sequences
                    if ((match = this._simpleQuotedString.exec(input)))
                      value = match[1];
                    // Try to find a literal wrapped in three pairs of quotes
                    else {
                      ({ value, matchLength } = this._parseLiteral(input));
                      if (value === null) return reportSyntaxError(this);
                    }
                    if (match !== null || matchLength !== 0) {
                      type = 'literal';
                      this._literalClosingPos = 0;
                    }
                    break;

                  case "'":
                    if (!this._lineMode) {
                      // Try to find a literal without escape sequences
                      if ((match = this._simpleApostropheString.exec(input)))
                        value = match[1];
                      // Try to find a literal wrapped in three pairs of quotes
                      else {
                        ({ value, matchLength } = this._parseLiteral(input));
                        if (value === null) return reportSyntaxError(this);
                      }
                      if (match !== null || matchLength !== 0) {
                        type = 'literal';
                        this._literalClosingPos = 0;
                      }
                    }
                    break;

                  case '?':
                    // Try to find a variable
                    if (this._n3Mode && (match = this._variable.exec(input)))
                      (type = 'var'), (value = match[0]);
                    break;

                  case '@':
                    // Try to find a language code
                    if (
                      this._previousMarker === 'literal' &&
                      (match = this._langcode.exec(input))
                    )
                      (type = 'langcode'), (value = match[1]);
                    // Try to find a keyword
                    else if ((match = this._keyword.exec(input)))
                      type = match[0];
                    break;

                  case '.':
                    // Try to find a dot as punctuation
                    if (
                      input.length === 1
                        ? inputFinished
                        : input[1] < '0' || input[1] > '9'
                    ) {
                      type = '.';
                      matchLength = 1;
                      break;
                    }
                  // Fall through to numerical case (could be a decimal dot)

                  case '0':
                  case '1':
                  case '2':
                  case '3':
                  case '4':
                  case '5':
                  case '6':
                  case '7':
                  case '8':
                  case '9':
                  case '+':
                  case '-':
                    // Try to find a number. Since it can contain (but not end with) a dot,
                    // we always need a non-dot character before deciding it is a number.
                    // Therefore, try inserting a space if we're at the end of the input.
                    if (
                      (match =
                        this._number.exec(input) ||
                        (inputFinished &&
                          (match = this._number.exec(`${input} `))))
                    ) {
                      (type = 'literal'), (value = match[0]);
                      prefix =
                        typeof match[1] === 'string'
                          ? xsd.double
                          : typeof match[2] === 'string'
                          ? xsd.decimal
                          : xsd.integer;
                    }
                    break;

                  case 'B':
                  case 'b':
                  case 'p':
                  case 'P':
                  case 'G':
                  case 'g':
                    // Try to find a SPARQL-style keyword
                    if ((match = this._sparqlKeyword.exec(input)))
                      type = match[0].toUpperCase();
                    else inconclusive = true;
                    break;

                  case 'f':
                  case 't':
                    // Try to match a boolean
                    if ((match = this._boolean.exec(input)))
                      (type = 'literal'),
                        (value = match[0]),
                        (prefix = xsd.boolean);
                    else inconclusive = true;
                    break;

                  case 'a':
                    // Try to find an abbreviated predicate
                    if ((match = this._shortPredicates.exec(input)))
                      (type = 'abbreviation'), (value = 'a');
                    else inconclusive = true;
                    break;

                  case '=':
                    // Try to find an implication arrow or equals sign
                    if (this._n3Mode && input.length > 1) {
                      type = 'abbreviation';
                      if (input[1] !== '>') (matchLength = 1), (value = '=');
                      else (matchLength = 2), (value = '>');
                    }
                    break;

                  case '!':
                    if (!this._n3Mode) break;
                  case ',':
                  case ';':
                  case '[':
                  case ']':
                  case '(':
                  case ')':
                  case '{':
                  case '}':
                    if (!this._lineMode) {
                      matchLength = 1;
                      type = firstChar;
                    }
                    break;

                  default:
                    inconclusive = true;
                }

                // Some first characters do not allow an immediate decision, so inspect more
                if (inconclusive) {
                  // Try to find a prefix
                  if (
                    (this._previousMarker === '@prefix' ||
                      this._previousMarker === 'PREFIX') &&
                    (match = this._prefix.exec(input))
                  )
                    (type = 'prefix'), (value = match[1] || '');
                  // Try to find a prefixed name. Since it can contain (but not end with) a dot,
                  // we always need a non-dot character before deciding it is a prefixed name.
                  // Therefore, try inserting a space if we're at the end of the input.
                  else if (
                    (match = this._prefixed.exec(input)) ||
                    (inputFinished &&
                      (match = this._prefixed.exec(`${input} `)))
                  )
                    (type = 'prefixed'),
                      (prefix = match[1] || ''),
                      (value = this._unescape(match[2]));
                }

                // A type token is special: it can only be emitted after an IRI or prefixed name is read
                if (this._previousMarker === '^^') {
                  switch (type) {
                    case 'prefixed':
                      type = 'type';
                      break;
                    case 'IRI':
                      type = 'typeIRI';
                      break;
                    default:
                      type = '';
                  }
                }

                // What if nothing of the above was found?
                if (!type) {
                  // We could be in streaming mode, and then we just wait for more input to arrive.
                  // Otherwise, a syntax error has occurred in the input.
                  // One exception: error on an unaccounted linebreak (= not inside a triple-quoted literal).
                  if (
                    inputFinished ||
                    (!/^'''|^"""/.test(input) && /\n|\r/.test(input))
                  )
                    return reportSyntaxError(this);
                  else return (this._input = input);
                }

                // Emit the parsed token
                const token = {
                  line: line,
                  type: type,
                  value: value,
                  prefix: prefix
                };
                callback(null, token);
                this.previousToken = token;
                this._previousMarker = type;
                // Advance to next part to tokenize
                input = input.substr(
                  matchLength || match[0].length,
                  input.length
                );
              }

              // Signals the syntax error through the callback
              function reportSyntaxError(self) {
                callback(self._syntaxError(/^\S*/.exec(input)[0]));
              }
            }

            // ### `_unescape` replaces N3 escape codes by their corresponding characters
            _unescape(item) {
              let invalid = false;
              const replaced = item.replace(
                escapeSequence,
                (sequence, unicode4, unicode8, escapedChar) => {
                  // 4-digit unicode character
                  if (typeof unicode4 === 'string')
                    return String.fromCharCode(Number.parseInt(unicode4, 16));
                  // 8-digit unicode character
                  if (typeof unicode8 === 'string') {
                    let charCode = Number.parseInt(unicode8, 16);
                    return charCode <= 0xffff
                      ? String.fromCharCode(Number.parseInt(unicode8, 16))
                      : String.fromCharCode(
                          0xd800 + ((charCode -= 0x10000) >> 10),
                          0xdc00 + (charCode & 0x3ff)
                        );
                  }
                  // fixed escape sequence
                  if (escapedChar in escapeReplacements)
                    return escapeReplacements[escapedChar];
                  // invalid escape sequence
                  invalid = true;
                  return '';
                }
              );
              return invalid ? null : replaced;
            }

            // ### `_parseLiteral` parses a literal into an unescaped value
            _parseLiteral(input) {
              // Ensure we have enough lookahead to identify triple-quoted strings
              if (input.length >= 3) {
                // Identify the opening quote(s)
                const opening = input.match(/^(?:"""|"|'''|'|)/)[0];
                const openingLength = opening.length;

                // Find the next candidate closing quotes
                let closingPos = Math.max(
                  this._literalClosingPos,
                  openingLength
                );
                while ((closingPos = input.indexOf(opening, closingPos)) > 0) {
                  // Count backslashes right before the closing quotes
                  let backslashCount = 0;
                  while (input[closingPos - backslashCount - 1] === '\\')
                    backslashCount++;

                  // An even number of backslashes (in particular 0)
                  // means these are actual, non-escaped closing quotes
                  if (backslashCount % 2 === 0) {
                    // Extract and unescape the value
                    const raw = input.substring(openingLength, closingPos);
                    const lines = raw.split(/\r\n|\r|\n/).length - 1;
                    const matchLength = closingPos + openingLength;
                    // Only triple-quoted strings can be multi-line
                    if (
                      (openingLength === 1 && lines !== 0) ||
                      (openingLength === 3 && this._lineMode)
                    )
                      break;
                    this._line += lines;
                    return { value: this._unescape(raw), matchLength };
                  }
                  closingPos++;
                }
                this._literalClosingPos = input.length - openingLength + 1;
              }
              return { value: '', matchLength: 0 };
            }

            // ### `_syntaxError` creates a syntax error for the given issue
            _syntaxError(issue) {
              this._input = null;
              const err = new Error(
                `Unexpected "${issue}" on line ${this._line}.`
              );
              err.context = {
                token: undefined,
                line: this._line,
                previousToken: this.previousToken
              };
              return err;
            }

            // ### Strips off any starting UTF BOM mark.
            _readStartingBom(input) {
              return input.startsWith('\ufeff') ? input.substr(1) : input;
            }

            // ## Public methods

            // ### `tokenize` starts the transformation of an N3 document into an array of tokens.
            // The input can be a string or a stream.
            tokenize(input, callback) {
              this._line = 1;

              // If the input is a string, continuously emit tokens through the callback until the end
              if (typeof input === 'string') {
                this._input = this._readStartingBom(input);
                // If a callback was passed, asynchronously call it
                if (typeof callback === 'function')
                  __WEBPACK_IMPORTED_MODULE_1_queue_microtask___default()(() =>
                    this._tokenizeToEnd(callback, true)
                  );
                // If no callback was passed, tokenize synchronously and return
                else {
                  const tokens = [];
                  let error;
                  this._tokenizeToEnd(
                    (e, t) => (e ? (error = e) : tokens.push(t)),
                    true
                  );
                  if (error) throw error;
                  return tokens;
                }
              }
              // Otherwise, the input must be a stream
              else {
                this._pendingBuffer = null;
                if (typeof input.setEncoding === 'function')
                  input.setEncoding('utf8');
                // Adds the data chunk to the buffer and parses as far as possible
                input.on('data', data => {
                  if (this._input !== null && data.length !== 0) {
                    // Prepend any previous pending writes
                    if (this._pendingBuffer) {
                      data = Buffer.concat([this._pendingBuffer, data]);
                      this._pendingBuffer = null;
                    }
                    // Hold if the buffer ends in an incomplete unicode sequence
                    if (data[data.length - 1] & 0x80) {
                      this._pendingBuffer = data;
                    }
                    // Otherwise, tokenize as far as possible
                    else {
                      // Only read a BOM at the start
                      if (typeof this._input === 'undefined')
                        this._input = this._readStartingBom(
                          typeof data === 'string' ? data : data.toString()
                        );
                      else this._input += data;
                      this._tokenizeToEnd(callback, false);
                    }
                  }
                });
                // Parses until the end
                input.on('end', () => {
                  if (typeof this._input === 'string')
                    this._tokenizeToEnd(callback, true);
                });
                input.on('error', callback);
              }
            }
          }
          /* harmony export (immutable) */ __webpack_exports__['a'] = N3Lexer;

          /* WEBPACK VAR INJECTION */
        }.call(__webpack_exports__, __webpack_require__(3).Buffer));

        /***/
      },
      /* 12 */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict';
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__N3Lexer__ = __webpack_require__(
          11
        );
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__N3DataFactory__ = __webpack_require__(
          2
        );
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__IRIs__ = __webpack_require__(
          7
        );
        // **N3Parser** parses N3 documents.

        let blankNodePrefix = 0;

        // ## Constructor
        class N3Parser {
          constructor(options) {
            this._contextStack = [];
            this._graph = null;

            // Set the document IRI
            options = options || {};
            this._setBase(options.baseIRI);
            options.factory && initDataFactory(this, options.factory);

            // Set supported features depending on the format
            const format =
                typeof options.format === 'string'
                  ? options.format.match(/\w*$/)[0].toLowerCase()
                  : '',
              isTurtle = /turtle/.test(format),
              isTriG = /trig/.test(format),
              isNTriples = /triple/.test(format),
              isNQuads = /quad/.test(format),
              isN3 = (this._n3Mode = /n3/.test(format)),
              isLineMode = isNTriples || isNQuads;
            if (!(this._supportsNamedGraphs = !(isTurtle || isN3)))
              this._readPredicateOrNamedGraph = this._readPredicate;
            // Support triples in other graphs
            this._supportsQuads = !(isTurtle || isTriG || isNTriples || isN3);
            // Support nesting of triples
            this._supportsRDFStar = format === '' || /star|\*$/.test(format);
            // Disable relative IRIs in N-Triples or N-Quads mode
            if (isLineMode)
              this._resolveRelativeIRI = iri => {
                return null;
              };
            this._blankNodePrefix =
              typeof options.blankNodePrefix !== 'string'
                ? ''
                : options.blankNodePrefix.replace(/^(?!_:)/, '_:');
            this._lexer =
              options.lexer ||
              new __WEBPACK_IMPORTED_MODULE_0__N3Lexer__['a' /* default */]({
                lineMode: isLineMode,
                n3: isN3
              });
            // Disable explicit quantifiers by default
            this._explicitQuantifiers = !!options.explicitQuantifiers;
          }

          // ## Static class methods

          // ### `_resetBlankNodePrefix` restarts blank node prefix identification
          static _resetBlankNodePrefix() {
            blankNodePrefix = 0;
          }

          // ## Private methods

          // ### `_setBase` sets the base IRI to resolve relative IRIs
          _setBase(baseIRI) {
            if (!baseIRI) {
              this._base = '';
              this._basePath = '';
            } else {
              // Remove fragment if present
              const fragmentPos = baseIRI.indexOf('#');
              if (fragmentPos >= 0) baseIRI = baseIRI.substr(0, fragmentPos);
              // Set base IRI and its components
              this._base = baseIRI;
              this._basePath =
                baseIRI.indexOf('/') < 0
                  ? baseIRI
                  : baseIRI.replace(/[^\/?]*(?:\?.*)?$/, '');
              baseIRI = baseIRI.match(
                /^(?:([a-z][a-z0-9+.-]*:))?(?:\/\/[^\/]*)?/i
              );
              this._baseRoot = baseIRI[0];
              this._baseScheme = baseIRI[1];
            }
          }

          // ### `_saveContext` stores the current parsing context
          // when entering a new scope (list, blank node, formula)
          _saveContext(type, graph, subject, predicate, object) {
            const n3Mode = this._n3Mode;
            this._contextStack.push({
              subject: subject,
              predicate: predicate,
              object: object,
              graph: graph,
              type: type,
              inverse: n3Mode ? this._inversePredicate : false,
              blankPrefix: n3Mode ? this._prefixes._ : '',
              quantified: n3Mode ? this._quantified : null
            });
            // The settings below only apply to N3 streams
            if (n3Mode) {
              // Every new scope resets the predicate direction
              this._inversePredicate = false;
              // In N3, blank nodes are scoped to a formula
              // (using a dot as separator, as a blank node label cannot start with it)
              this._prefixes._ = this._graph
                ? `${this._graph.id.substr(2)}.`
                : '.';
              // Quantifiers are scoped to a formula
              this._quantified = Object.create(this._quantified);
            }
          }

          // ### `_restoreContext` restores the parent context
          // when leaving a scope (list, blank node, formula)
          _restoreContext() {
            const context = this._contextStack.pop(),
              n3Mode = this._n3Mode;
            this._subject = context.subject;
            this._predicate = context.predicate;
            this._object = context.object;
            this._graph = context.graph;
            // The settings below only apply to N3 streams
            if (n3Mode) {
              this._inversePredicate = context.inverse;
              this._prefixes._ = context.blankPrefix;
              this._quantified = context.quantified;
            }
          }

          // ### `_readInTopContext` reads a token when in the top context
          _readInTopContext(token) {
            switch (token.type) {
              // If an EOF token arrives in the top context, signal that we're done
              case 'eof':
                if (this._graph !== null)
                  return this._error('Unclosed graph', token);
                delete this._prefixes._;
                return this._callback(null, null, this._prefixes);
              // It could be a prefix declaration
              case 'PREFIX':
                this._sparqlStyle = true;
              case '@prefix':
                return this._readPrefix;
              // It could be a base declaration
              case 'BASE':
                this._sparqlStyle = true;
              case '@base':
                return this._readBaseIRI;
              // It could be a graph
              case '{':
                if (this._supportsNamedGraphs) {
                  this._graph = '';
                  this._subject = null;
                  return this._readSubject;
                }
              case 'GRAPH':
                if (this._supportsNamedGraphs) return this._readNamedGraphLabel;
              // Otherwise, the next token must be a subject
              default:
                return this._readSubject(token);
            }
          }

          // ### `_readEntity` reads an IRI, prefixed name, blank node, or variable
          _readEntity(token, quantifier) {
            let value;
            switch (token.type) {
              // Read a relative or absolute IRI
              case 'IRI':
              case 'typeIRI':
                const iri = this._resolveIRI(token.value);
                if (iri === null) return this._error('Invalid IRI', token);
                value = this._namedNode(iri);
                break;
              // Read a prefixed name
              case 'type':
              case 'prefixed':
                const prefix = this._prefixes[token.prefix];
                if (prefix === undefined)
                  return this._error(
                    `Undefined prefix "${token.prefix}:"`,
                    token
                  );
                value = this._namedNode(prefix + token.value);
                break;
              // Read a blank node
              case 'blank':
                value = this._blankNode(
                  this._prefixes[token.prefix] + token.value
                );
                break;
              // Read a variable
              case 'var':
                value = this._variable(token.value.substr(1));
                break;
              // Everything else is not an entity
              default:
                return this._error(
                  `Expected entity but got ${token.type}`,
                  token
                );
            }
            // In N3 mode, replace the entity if it is quantified
            if (!quantifier && this._n3Mode && value.id in this._quantified)
              value = this._quantified[value.id];
            return value;
          }

          // ### `_readSubject` reads a quad's subject
          _readSubject(token) {
            this._predicate = null;
            switch (token.type) {
              case '[':
                // Start a new quad with a new blank node as subject
                this._saveContext(
                  'blank',
                  this._graph,
                  (this._subject = this._blankNode()),
                  null,
                  null
                );
                return this._readBlankNodeHead;
              case '(':
                // Start a new list
                this._saveContext(
                  'list',
                  this._graph,
                  this.RDF_NIL,
                  null,
                  null
                );
                this._subject = null;
                return this._readListItem;
              case '{':
                // Start a new formula
                if (!this._n3Mode)
                  return this._error('Unexpected graph', token);
                this._saveContext(
                  'formula',
                  this._graph,
                  (this._graph = this._blankNode()),
                  null,
                  null
                );
                return this._readSubject;
              case '}':
                // No subject; the graph in which we are reading is closed instead
                return this._readPunctuation(token);
              case '@forSome':
                if (!this._n3Mode)
                  return this._error('Unexpected "@forSome"', token);
                this._subject = null;
                this._predicate = this.N3_FORSOME;
                this._quantifier = this._blankNode;
                return this._readQuantifierList;
              case '@forAll':
                if (!this._n3Mode)
                  return this._error('Unexpected "@forAll"', token);
                this._subject = null;
                this._predicate = this.N3_FORALL;
                this._quantifier = this._variable;
                return this._readQuantifierList;
              case 'literal':
                if (!this._n3Mode)
                  return this._error('Unexpected literal', token);

                if (token.prefix.length === 0) {
                  this._literalValue = token.value;
                  return this._completeSubjectLiteral;
                } else
                  this._subject = this._literal(
                    token.value,
                    this._namedNode(token.prefix)
                  );

                break;
              case '<<':
                if (!this._supportsRDFStar)
                  return this._error('Unexpected RDF* syntax', token);
                this._saveContext('<<', this._graph, null, null, null);
                this._graph = null;
                return this._readSubject;
              default:
                // Read the subject entity
                if ((this._subject = this._readEntity(token)) === undefined)
                  return;
                // In N3 mode, the subject might be a path
                if (this._n3Mode)
                  return this._getPathReader(this._readPredicateOrNamedGraph);
            }

            // The next token must be a predicate,
            // or, if the subject was actually a graph IRI, a named graph
            return this._readPredicateOrNamedGraph;
          }

          // ### `_readPredicate` reads a quad's predicate
          _readPredicate(token) {
            const type = token.type;
            switch (type) {
              case 'inverse':
                this._inversePredicate = true;
              case 'abbreviation':
                this._predicate = this.ABBREVIATIONS[token.value];
                break;
              case '.':
              case ']':
              case '}':
                // Expected predicate didn't come, must have been trailing semicolon
                if (this._predicate === null)
                  return this._error(`Unexpected ${type}`, token);
                this._subject = null;
                return type === ']'
                  ? this._readBlankNodeTail(token)
                  : this._readPunctuation(token);
              case ';':
                // Additional semicolons can be safely ignored
                return this._predicate !== null
                  ? this._readPredicate
                  : this._error('Expected predicate but got ;', token);
              case 'blank':
                if (!this._n3Mode)
                  return this._error(
                    'Disallowed blank node as predicate',
                    token
                  );
              default:
                if ((this._predicate = this._readEntity(token)) === undefined)
                  return;
            }
            // The next token must be an object
            return this._readObject;
          }

          // ### `_readObject` reads a quad's object
          _readObject(token) {
            switch (token.type) {
              case 'literal':
                // Regular literal, can still get a datatype or language
                if (token.prefix.length === 0) {
                  this._literalValue = token.value;
                  return this._readDataTypeOrLang;
                }
                // Pre-datatyped string literal (prefix stores the datatype)
                else
                  this._object = this._literal(
                    token.value,
                    this._namedNode(token.prefix)
                  );
                break;
              case '[':
                // Start a new quad with a new blank node as subject
                this._saveContext(
                  'blank',
                  this._graph,
                  this._subject,
                  this._predicate,
                  (this._subject = this._blankNode())
                );
                return this._readBlankNodeHead;
              case '(':
                // Start a new list
                this._saveContext(
                  'list',
                  this._graph,
                  this._subject,
                  this._predicate,
                  this.RDF_NIL
                );
                this._subject = null;
                return this._readListItem;
              case '{':
                // Start a new formula
                if (!this._n3Mode)
                  return this._error('Unexpected graph', token);
                this._saveContext(
                  'formula',
                  this._graph,
                  this._subject,
                  this._predicate,
                  (this._graph = this._blankNode())
                );
                return this._readSubject;
              case '<<':
                if (!this._supportsRDFStar)
                  return this._error('Unexpected RDF* syntax', token);
                this._saveContext(
                  '<<',
                  this._graph,
                  this._subject,
                  this._predicate,
                  null
                );
                this._graph = null;
                return this._readSubject;
              default:
                // Read the object entity
                if ((this._object = this._readEntity(token)) === undefined)
                  return;
                // In N3 mode, the object might be a path
                if (this._n3Mode)
                  return this._getPathReader(this._getContextEndReader());
            }
            return this._getContextEndReader();
          }

          // ### `_readPredicateOrNamedGraph` reads a quad's predicate, or a named graph
          _readPredicateOrNamedGraph(token) {
            return token.type === '{'
              ? this._readGraph(token)
              : this._readPredicate(token);
          }

          // ### `_readGraph` reads a graph
          _readGraph(token) {
            if (token.type !== '{')
              return this._error(`Expected graph but got ${token.type}`, token);
            // The "subject" we read is actually the GRAPH's label
            (this._graph = this._subject), (this._subject = null);
            return this._readSubject;
          }

          // ### `_readBlankNodeHead` reads the head of a blank node
          _readBlankNodeHead(token) {
            if (token.type === ']') {
              this._subject = null;
              return this._readBlankNodeTail(token);
            } else {
              this._predicate = null;
              return this._readPredicate(token);
            }
          }

          // ### `_readBlankNodeTail` reads the end of a blank node
          _readBlankNodeTail(token) {
            if (token.type !== ']')
              return this._readBlankNodePunctuation(token);

            // Store blank node quad
            if (this._subject !== null)
              this._emit(
                this._subject,
                this._predicate,
                this._object,
                this._graph
              );

            // Restore the parent context containing this blank node
            const empty = this._predicate === null;
            this._restoreContext();
            // If the blank node was the subject, continue reading the predicate
            if (this._object === null)
              // If the blank node was empty, it could be a named graph label
              return empty
                ? this._readPredicateOrNamedGraph
                : this._readPredicateAfterBlank;
            // If the blank node was the object, restore previous context and read punctuation
            else return this._getContextEndReader();
          }

          // ### `_readPredicateAfterBlank` reads a predicate after an anonymous blank node
          _readPredicateAfterBlank(token) {
            switch (token.type) {
              case '.':
              case '}':
                // No predicate is coming if the triple is terminated here
                this._subject = null;
                return this._readPunctuation(token);
              default:
                return this._readPredicate(token);
            }
          }

          // ### `_readListItem` reads items from a list
          _readListItem(token) {
            let item = null, // The item of the list
              list = null, // The list itself
              next = this._readListItem; // The next function to execute
            const previousList = this._subject, // The previous list that contains this list
              stack = this._contextStack, // The stack of parent contexts
              parent = stack[stack.length - 1]; // The parent containing the current list

            switch (token.type) {
              case '[':
                // Stack the current list quad and start a new quad with a blank node as subject
                this._saveContext(
                  'blank',
                  this._graph,
                  (list = this._blankNode()),
                  this.RDF_FIRST,
                  (this._subject = item = this._blankNode())
                );
                next = this._readBlankNodeHead;
                break;
              case '(':
                // Stack the current list quad and start a new list
                this._saveContext(
                  'list',
                  this._graph,
                  (list = this._blankNode()),
                  this.RDF_FIRST,
                  this.RDF_NIL
                );
                this._subject = null;
                break;
              case ')':
                // Closing the list; restore the parent context
                this._restoreContext();
                // If this list is contained within a parent list, return the membership quad here.
                // This will be `<parent list element> rdf:first <this list>.`.
                if (
                  stack.length !== 0 &&
                  stack[stack.length - 1].type === 'list'
                )
                  this._emit(
                    this._subject,
                    this._predicate,
                    this._object,
                    this._graph
                  );
                // Was this list the parent's subject?
                if (this._predicate === null) {
                  // The next token is the predicate
                  next = this._readPredicate;
                  // No list tail if this was an empty list
                  if (this._subject === this.RDF_NIL) return next;
                }
                // The list was in the parent context's object
                else {
                  next = this._getContextEndReader();
                  // No list tail if this was an empty list
                  if (this._object === this.RDF_NIL) return next;
                }
                // Close the list by making the head nil
                list = this.RDF_NIL;
                break;
              case 'literal':
                // Regular literal, can still get a datatype or language
                if (token.prefix.length === 0) {
                  this._literalValue = token.value;
                  next = this._readListItemDataTypeOrLang;
                }
                // Pre-datatyped string literal (prefix stores the datatype)
                else {
                  item = this._literal(
                    token.value,
                    this._namedNode(token.prefix)
                  );
                  next = this._getContextEndReader();
                }
                break;
              case '{':
                // Start a new formula
                if (!this._n3Mode)
                  return this._error('Unexpected graph', token);
                this._saveContext(
                  'formula',
                  this._graph,
                  this._subject,
                  this._predicate,
                  (this._graph = this._blankNode())
                );
                return this._readSubject;
              default:
                if ((item = this._readEntity(token)) === undefined) return;
            }

            // Create a new blank node if no item head was assigned yet
            if (list === null) this._subject = list = this._blankNode();

            // Is this the first element of the list?
            if (previousList === null) {
              // This list is either the subject or the object of its parent
              if (parent.predicate === null) parent.subject = list;
              else parent.object = list;
            } else {
              // Continue the previous list with the current list
              this._emit(previousList, this.RDF_REST, list, this._graph);
            }
            // If an item was read, add it to the list
            if (item !== null) {
              // In N3 mode, the item might be a path
              if (
                this._n3Mode &&
                (token.type === 'IRI' || token.type === 'prefixed')
              ) {
                // Create a new context to add the item's path
                this._saveContext(
                  'item',
                  this._graph,
                  list,
                  this.RDF_FIRST,
                  item
                );
                (this._subject = item), (this._predicate = null);
                // _readPath will restore the context and output the item
                return this._getPathReader(this._readListItem);
              }
              // Output the item
              this._emit(list, this.RDF_FIRST, item, this._graph);
            }
            return next;
          }

          // ### `_readDataTypeOrLang` reads an _optional_ datatype or language
          _readDataTypeOrLang(token) {
            return this._completeObjectLiteral(token, false);
          }

          // ### `_readListItemDataTypeOrLang` reads an _optional_ datatype or language in a list
          _readListItemDataTypeOrLang(token) {
            return this._completeObjectLiteral(token, true);
          }

          // ### `_completeLiteral` completes a literal with an optional datatype or language
          _completeLiteral(token) {
            // Create a simple string literal by default
            let literal = this._literal(this._literalValue);

            switch (token.type) {
              // Create a datatyped literal
              case 'type':
              case 'typeIRI':
                const datatype = this._readEntity(token);
                if (datatype === undefined) return; // No datatype means an error occurred
                literal = this._literal(this._literalValue, datatype);
                token = null;
                break;
              // Create a language-tagged string
              case 'langcode':
                literal = this._literal(this._literalValue, token.value);
                token = null;
                break;
            }

            return { token, literal };
          }

          // Completes a literal in subject position
          _completeSubjectLiteral(token) {
            this._subject = this._completeLiteral(token).literal;
            return this._readPredicateOrNamedGraph;
          }

          // Completes a literal in object position
          _completeObjectLiteral(token, listItem) {
            const completed = this._completeLiteral(token);
            if (!completed) return;
            this._object = completed.literal;

            // If this literal was part of a list, write the item
            // (we could also check the context stack, but passing in a flag is faster)
            if (listItem)
              this._emit(
                this._subject,
                this.RDF_FIRST,
                this._object,
                this._graph
              );
            // If the token was consumed, continue with the rest of the input
            if (completed.token === null) return this._getContextEndReader();
            // Otherwise, consume the token now
            else {
              this._readCallback = this._getContextEndReader();
              return this._readCallback(completed.token);
            }
          }

          // ### `_readFormulaTail` reads the end of a formula
          _readFormulaTail(token) {
            if (token.type !== '}') return this._readPunctuation(token);

            // Store the last quad of the formula
            if (this._subject !== null)
              this._emit(
                this._subject,
                this._predicate,
                this._object,
                this._graph
              );

            // Restore the parent context containing this formula
            this._restoreContext();
            // If the formula was the subject, continue reading the predicate.
            // If the formula was the object, read punctuation.
            return this._object === null
              ? this._readPredicate
              : this._getContextEndReader();
          }

          // ### `_readPunctuation` reads punctuation between quads or quad parts
          _readPunctuation(token) {
            let next,
              graph = this._graph;
            const subject = this._subject,
              inversePredicate = this._inversePredicate;
            switch (token.type) {
              // A closing brace ends a graph
              case '}':
                if (this._graph === null)
                  return this._error('Unexpected graph closing', token);
                if (this._n3Mode) return this._readFormulaTail(token);
                this._graph = null;
              // A dot just ends the statement, without sharing anything with the next
              case '.':
                this._subject = null;
                next = this._contextStack.length
                  ? this._readSubject
                  : this._readInTopContext;
                if (inversePredicate) this._inversePredicate = false;
                break;
              // Semicolon means the subject is shared; predicate and object are different
              case ';':
                next = this._readPredicate;
                break;
              // Comma means both the subject and predicate are shared; the object is different
              case ',':
                next = this._readObject;
                break;
              default:
                // An entity means this is a quad (only allowed if not already inside a graph)
                if (
                  this._supportsQuads &&
                  this._graph === null &&
                  (graph = this._readEntity(token)) !== undefined
                ) {
                  next = this._readQuadPunctuation;
                  break;
                }
                return this._error(
                  `Expected punctuation to follow "${this._object.id}"`,
                  token
                );
            }
            // A quad has been completed now, so return it
            if (subject !== null) {
              const predicate = this._predicate,
                object = this._object;
              if (!inversePredicate)
                this._emit(subject, predicate, object, graph);
              else this._emit(object, predicate, subject, graph);
            }
            return next;
          }

          // ### `_readBlankNodePunctuation` reads punctuation in a blank node
          _readBlankNodePunctuation(token) {
            let next;
            switch (token.type) {
              // Semicolon means the subject is shared; predicate and object are different
              case ';':
                next = this._readPredicate;
                break;
              // Comma means both the subject and predicate are shared; the object is different
              case ',':
                next = this._readObject;
                break;
              default:
                return this._error(
                  `Expected punctuation to follow "${this._object.id}"`,
                  token
                );
            }
            // A quad has been completed now, so return it
            this._emit(
              this._subject,
              this._predicate,
              this._object,
              this._graph
            );
            return next;
          }

          // ### `_readQuadPunctuation` reads punctuation after a quad
          _readQuadPunctuation(token) {
            if (token.type !== '.')
              return this._error('Expected dot to follow quad', token);
            return this._readInTopContext;
          }

          // ### `_readPrefix` reads the prefix of a prefix declaration
          _readPrefix(token) {
            if (token.type !== 'prefix')
              return this._error('Expected prefix to follow @prefix', token);
            this._prefix = token.value;
            return this._readPrefixIRI;
          }

          // ### `_readPrefixIRI` reads the IRI of a prefix declaration
          _readPrefixIRI(token) {
            if (token.type !== 'IRI')
              return this._error(
                `Expected IRI to follow prefix "${this._prefix}:"`,
                token
              );
            const prefixNode = this._readEntity(token);
            this._prefixes[this._prefix] = prefixNode.value;
            this._prefixCallback(this._prefix, prefixNode);
            return this._readDeclarationPunctuation;
          }

          // ### `_readBaseIRI` reads the IRI of a base declaration
          _readBaseIRI(token) {
            const iri = token.type === 'IRI' && this._resolveIRI(token.value);
            if (!iri)
              return this._error(
                'Expected valid IRI to follow base declaration',
                token
              );
            this._setBase(iri);
            return this._readDeclarationPunctuation;
          }

          // ### `_readNamedGraphLabel` reads the label of a named graph
          _readNamedGraphLabel(token) {
            switch (token.type) {
              case 'IRI':
              case 'blank':
              case 'prefixed':
                return this._readSubject(token), this._readGraph;
              case '[':
                return this._readNamedGraphBlankLabel;
              default:
                return this._error('Invalid graph label', token);
            }
          }

          // ### `_readNamedGraphLabel` reads a blank node label of a named graph
          _readNamedGraphBlankLabel(token) {
            if (token.type !== ']')
              return this._error('Invalid graph label', token);
            this._subject = this._blankNode();
            return this._readGraph;
          }

          // ### `_readDeclarationPunctuation` reads the punctuation of a declaration
          _readDeclarationPunctuation(token) {
            // SPARQL-style declarations don't have punctuation
            if (this._sparqlStyle) {
              this._sparqlStyle = false;
              return this._readInTopContext(token);
            }

            if (token.type !== '.')
              return this._error(
                'Expected declaration to end with a dot',
                token
              );
            return this._readInTopContext;
          }

          // Reads a list of quantified symbols from a @forSome or @forAll statement
          _readQuantifierList(token) {
            let entity;
            switch (token.type) {
              case 'IRI':
              case 'prefixed':
                if ((entity = this._readEntity(token, true)) !== undefined)
                  break;
              default:
                return this._error(`Unexpected ${token.type}`, token);
            }
            // Without explicit quantifiers, map entities to a quantified entity
            if (!this._explicitQuantifiers)
              this._quantified[entity.id] = this._quantifier(
                this._blankNode().value
              );
            // With explicit quantifiers, output the reified quantifier
            else {
              // If this is the first item, start a new quantifier list
              if (this._subject === null)
                this._emit(
                  this._graph || this.DEFAULTGRAPH,
                  this._predicate,
                  (this._subject = this._blankNode()),
                  this.QUANTIFIERS_GRAPH
                );
              // Otherwise, continue the previous list
              else
                this._emit(
                  this._subject,
                  this.RDF_REST,
                  (this._subject = this._blankNode()),
                  this.QUANTIFIERS_GRAPH
                );
              // Output the list item
              this._emit(
                this._subject,
                this.RDF_FIRST,
                entity,
                this.QUANTIFIERS_GRAPH
              );
            }
            return this._readQuantifierPunctuation;
          }

          // Reads punctuation from a @forSome or @forAll statement
          _readQuantifierPunctuation(token) {
            // Read more quantifiers
            if (token.type === ',') return this._readQuantifierList;
            // End of the quantifier list
            else {
              // With explicit quantifiers, close the quantifier list
              if (this._explicitQuantifiers) {
                this._emit(
                  this._subject,
                  this.RDF_REST,
                  this.RDF_NIL,
                  this.QUANTIFIERS_GRAPH
                );
                this._subject = null;
              }
              // Read a dot
              this._readCallback = this._getContextEndReader();
              return this._readCallback(token);
            }
          }

          // ### `_getPathReader` reads a potential path and then resumes with the given function
          _getPathReader(afterPath) {
            this._afterPath = afterPath;
            return this._readPath;
          }

          // ### `_readPath` reads a potential path
          _readPath(token) {
            switch (token.type) {
              // Forward path
              case '!':
                return this._readForwardPath;
              // Backward path
              case '^':
                return this._readBackwardPath;
              // Not a path; resume reading where we left off
              default:
                const stack = this._contextStack,
                  parent = stack.length && stack[stack.length - 1];
                // If we were reading a list item, we still need to output it
                if (parent && parent.type === 'item') {
                  // The list item is the remaining subejct after reading the path
                  const item = this._subject;
                  // Switch back to the context of the list
                  this._restoreContext();
                  // Output the list item
                  this._emit(this._subject, this.RDF_FIRST, item, this._graph);
                }
                return this._afterPath(token);
            }
          }

          // ### `_readForwardPath` reads a '!' path
          _readForwardPath(token) {
            let subject, predicate;
            const object = this._blankNode();
            // The next token is the predicate
            if ((predicate = this._readEntity(token)) === undefined) return;
            // If we were reading a subject, replace the subject by the path's object
            if (this._predicate === null)
              (subject = this._subject), (this._subject = object);
            // If we were reading an object, replace the subject by the path's object
            else (subject = this._object), (this._object = object);
            // Emit the path's current quad and read its next section
            this._emit(subject, predicate, object, this._graph);
            return this._readPath;
          }

          // ### `_readBackwardPath` reads a '^' path
          _readBackwardPath(token) {
            const subject = this._blankNode();
            let predicate, object;
            // The next token is the predicate
            if ((predicate = this._readEntity(token)) === undefined) return;
            // If we were reading a subject, replace the subject by the path's subject
            if (this._predicate === null)
              (object = this._subject), (this._subject = subject);
            // If we were reading an object, replace the subject by the path's subject
            else (object = this._object), (this._object = subject);
            // Emit the path's current quad and read its next section
            this._emit(subject, predicate, object, this._graph);
            return this._readPath;
          }

          // ### `_readRDFStarTailOrGraph` reads the graph of a nested RDF* quad or the end of a nested RDF* triple
          _readRDFStarTailOrGraph(token) {
            if (token.type !== '>>') {
              // An entity means this is a quad (only allowed if not already inside a graph)
              if (
                this._supportsQuads &&
                this._graph === null &&
                (this._graph = this._readEntity(token)) !== undefined
              )
                return this._readRDFStarTail;
              return this._error(
                `Expected >> to follow "${this._object.id}"`,
                token
              );
            }
            return this._readRDFStarTail(token);
          }

          // ### `_readRDFStarTail` reads the end of a nested RDF* triple
          _readRDFStarTail(token) {
            if (token.type !== '>>')
              return this._error(`Expected >> but got ${token.type}`, token);
            // Read the quad and restore the previous context
            const quad = this._quad(
              this._subject,
              this._predicate,
              this._object,
              this._graph || this.DEFAULTGRAPH
            );
            this._restoreContext();
            // If the triple was the subject, continue by reading the predicate.
            if (this._subject === null) {
              this._subject = quad;
              return this._readPredicate;
            }
            // If the triple was the object, read context end.
            else {
              this._object = quad;
              return this._getContextEndReader();
            }
          }

          // ### `_getContextEndReader` gets the next reader function at the end of a context
          _getContextEndReader() {
            const contextStack = this._contextStack;
            if (!contextStack.length) return this._readPunctuation;

            switch (contextStack[contextStack.length - 1].type) {
              case 'blank':
                return this._readBlankNodeTail;
              case 'list':
                return this._readListItem;
              case 'formula':
                return this._readFormulaTail;
              case '<<':
                return this._readRDFStarTailOrGraph;
            }
          }

          // ### `_emit` sends a quad through the callback
          _emit(subject, predicate, object, graph) {
            this._callback(
              null,
              this._quad(subject, predicate, object, graph || this.DEFAULTGRAPH)
            );
          }

          // ### `_error` emits an error message through the callback
          _error(message, token) {
            const err = new Error(`${message} on line ${token.line}.`);
            err.context = {
              token: token,
              line: token.line,
              previousToken: this._lexer.previousToken
            };
            this._callback(err);
            this._callback = noop;
          }

          // ### `_resolveIRI` resolves an IRI against the base path
          _resolveIRI(iri) {
            return /^[a-z][a-z0-9+.-]*:/i.test(iri)
              ? iri
              : this._resolveRelativeIRI(iri);
          }

          // ### `_resolveRelativeIRI` resolves an IRI against the base path,
          // assuming that a base path has been set and that the IRI is indeed relative
          _resolveRelativeIRI(iri) {
            // An empty relative IRI indicates the base IRI
            if (!iri.length) return this._base;
            // Decide resolving strategy based in the first character
            switch (iri[0]) {
              // Resolve relative fragment IRIs against the base IRI
              case '#':
                return this._base + iri;
              // Resolve relative query string IRIs by replacing the query string
              case '?':
                return this._base.replace(/(?:\?.*)?$/, iri);
              // Resolve root-relative IRIs at the root of the base IRI
              case '/':
                // Resolve scheme-relative IRIs to the scheme
                return (
                  (iri[1] === '/' ? this._baseScheme : this._baseRoot) +
                  this._removeDotSegments(iri)
                );
              // Resolve all other IRIs at the base IRI's path
              default:
                // Relative IRIs cannot contain a colon in the first path segment
                return /^[^/:]*:/.test(iri)
                  ? null
                  : this._removeDotSegments(this._basePath + iri);
            }
          }

          // ### `_removeDotSegments` resolves './' and '../' path segments in an IRI as per RFC3986
          _removeDotSegments(iri) {
            // Don't modify the IRI if it does not contain any dot segments
            if (!/(^|\/)\.\.?($|[/#?])/.test(iri)) return iri;

            // Start with an imaginary slash before the IRI in order to resolve trailing './' and '../'
            const length = iri.length;
            let result = '',
              i = -1,
              pathStart = -1,
              segmentStart = 0,
              next = '/';

            while (i < length) {
              switch (next) {
                // The path starts with the first slash after the authority
                case ':':
                  if (pathStart < 0) {
                    // Skip two slashes before the authority
                    if (iri[++i] === '/' && iri[++i] === '/')
                      // Skip to slash after the authority
                      while (
                        (pathStart = i + 1) < length &&
                        iri[pathStart] !== '/'
                      )
                        i = pathStart;
                  }
                  break;
                // Don't modify a query string or fragment
                case '?':
                case '#':
                  i = length;
                  break;
                // Handle '/.' or '/..' path segments
                case '/':
                  if (iri[i + 1] === '.') {
                    next = iri[++i + 1];
                    switch (next) {
                      // Remove a '/.' segment
                      case '/':
                        result += iri.substring(segmentStart, i - 1);
                        segmentStart = i + 1;
                        break;
                      // Remove a trailing '/.' segment
                      case undefined:
                      case '?':
                      case '#':
                        return (
                          result +
                          iri.substring(segmentStart, i) +
                          iri.substr(i + 1)
                        );
                      // Remove a '/..' segment
                      case '.':
                        next = iri[++i + 1];
                        if (
                          next === undefined ||
                          next === '/' ||
                          next === '?' ||
                          next === '#'
                        ) {
                          result += iri.substring(segmentStart, i - 2);
                          // Try to remove the parent path from result
                          if (
                            (segmentStart = result.lastIndexOf('/')) >=
                            pathStart
                          )
                            result = result.substr(0, segmentStart);
                          // Remove a trailing '/..' segment
                          if (next !== '/')
                            return `${result}/${iri.substr(i + 1)}`;
                          segmentStart = i + 1;
                        }
                    }
                  }
              }
              next = iri[++i];
            }
            return result + iri.substring(segmentStart);
          }

          // ## Public methods

          // ### `parse` parses the N3 input and emits each parsed quad through the callback
          parse(input, quadCallback, prefixCallback) {
            // The read callback is the next function to be executed when a token arrives.
            // We start reading in the top context.
            this._readCallback = this._readInTopContext;
            this._sparqlStyle = false;
            this._prefixes = Object.create(null);
            this._prefixes._ = this._blankNodePrefix
              ? this._blankNodePrefix.substr(2)
              : `b${blankNodePrefix++}_`;
            this._prefixCallback = prefixCallback || noop;
            this._inversePredicate = false;
            this._quantified = Object.create(null);

            // Parse synchronously if no quad callback is given
            if (!quadCallback) {
              const quads = [];
              let error;
              this._callback = (e, t) => {
                e ? (error = e) : t && quads.push(t);
              };
              this._lexer.tokenize(input).every(token => {
                return (this._readCallback = this._readCallback(token));
              });
              if (error) throw error;
              return quads;
            }

            // Parse asynchronously otherwise, executing the read callback when a token arrives
            this._callback = quadCallback;
            this._lexer.tokenize(input, (error, token) => {
              if (error !== null)
                this._callback(error), (this._callback = noop);
              else if (this._readCallback)
                this._readCallback = this._readCallback(token);
            });
          }
        }
        /* harmony export (immutable) */ __webpack_exports__['a'] = N3Parser;

        // The empty function
        function noop() {}

        // Initializes the parser with the given data factory
        function initDataFactory(parser, factory) {
          // Set factory methods
          const namedNode = factory.namedNode;
          parser._namedNode = namedNode;
          parser._blankNode = factory.blankNode;
          parser._literal = factory.literal;
          parser._variable = factory.variable;
          parser._quad = factory.quad;
          parser.DEFAULTGRAPH = factory.defaultGraph();

          // Set common named nodes
          parser.RDF_FIRST = namedNode(
            __WEBPACK_IMPORTED_MODULE_2__IRIs__['a' /* default */].rdf.first
          );
          parser.RDF_REST = namedNode(
            __WEBPACK_IMPORTED_MODULE_2__IRIs__['a' /* default */].rdf.rest
          );
          parser.RDF_NIL = namedNode(
            __WEBPACK_IMPORTED_MODULE_2__IRIs__['a' /* default */].rdf.nil
          );
          parser.N3_FORALL = namedNode(
            __WEBPACK_IMPORTED_MODULE_2__IRIs__['a' /* default */].r.forAll
          );
          parser.N3_FORSOME = namedNode(
            __WEBPACK_IMPORTED_MODULE_2__IRIs__['a' /* default */].r.forSome
          );
          parser.ABBREVIATIONS = {
            a: namedNode(
              __WEBPACK_IMPORTED_MODULE_2__IRIs__['a' /* default */].rdf.type
            ),
            '=': namedNode(
              __WEBPACK_IMPORTED_MODULE_2__IRIs__['a' /* default */].owl.sameAs
            ),
            '>': namedNode(
              __WEBPACK_IMPORTED_MODULE_2__IRIs__['a' /* default */].log.implies
            )
          };
          parser.QUANTIFIERS_GRAPH = namedNode('urn:n3:quantifiers');
        }
        initDataFactory(
          N3Parser.prototype,
          __WEBPACK_IMPORTED_MODULE_1__N3DataFactory__['a' /* default */]
        );

        /***/
      },
      /* 13 */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict';
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__IRIs__ = __webpack_require__(
          7
        );
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__N3DataFactory__ = __webpack_require__(
          2
        );
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__N3Util__ = __webpack_require__(
          8
        );
        // **N3Writer** writes N3 documents.

        const DEFAULTGRAPH = __WEBPACK_IMPORTED_MODULE_1__N3DataFactory__[
          'a' /* default */
        ].defaultGraph();

        const { rdf, xsd } = __WEBPACK_IMPORTED_MODULE_0__IRIs__[
          'a' /* default */
        ];

        // Characters in literals that require escaping
        const escape = /["\\\t\n\r\b\f\u0000-\u0019\ud800-\udbff]/,
          escapeAll = /["\\\t\n\r\b\f\u0000-\u0019]|[\ud800-\udbff][\udc00-\udfff]/g,
          escapedCharacters = {
            '\\': '\\\\',
            '"': '\\"',
            '\t': '\\t',
            '\n': '\\n',
            '\r': '\\r',
            '\b': '\\b',
            '\f': '\\f'
          };

        // ## Placeholder class to represent already pretty-printed terms
        class SerializedTerm extends __WEBPACK_IMPORTED_MODULE_1__N3DataFactory__[
          'b' /* Term */
        ] {
          // Pretty-printed nodes are not equal to any other node
          // (e.g., [] does not equal [])
          equals() {
            return false;
          }
        }

        // ## Constructor
        class N3Writer {
          constructor(outputStream, options) {
            // ### `_prefixRegex` matches a prefixed name or IRI that begins with one of the added prefixes
            this._prefixRegex = /$0^/;

            // Shift arguments if the first argument is not a stream
            if (outputStream && typeof outputStream.write !== 'function')
              (options = outputStream), (outputStream = null);
            options = options || {};
            this._lists = options.lists;

            // If no output stream given, send the output as string through the end callback
            if (!outputStream) {
              let output = '';
              this._outputStream = {
                write(chunk, encoding, done) {
                  output += chunk;
                  done && done();
                },
                end: done => {
                  done && done(null, output);
                }
              };
              this._endStream = true;
            } else {
              this._outputStream = outputStream;
              this._endStream =
                options.end === undefined ? true : !!options.end;
            }

            // Initialize writer, depending on the format
            this._subject = null;
            if (!/triple|quad/i.test(options.format)) {
              this._lineMode = false;
              this._graph = DEFAULTGRAPH;
              this._baseIRI = options.baseIRI;
              this._prefixIRIs = Object.create(null);
              options.prefixes && this.addPrefixes(options.prefixes);
            } else {
              this._lineMode = true;
              this._writeQuad = this._writeQuadLine;
            }
          }

          // ## Private methods

          // ### Whether the current graph is the default graph
          get _inDefaultGraph() {
            return DEFAULTGRAPH.equals(this._graph);
          }

          // ### `_write` writes the argument to the output stream
          _write(string, callback) {
            this._outputStream.write(string, 'utf8', callback);
          }

          // ### `_writeQuad` writes the quad to the output stream
          _writeQuad(subject, predicate, object, graph, done) {
            try {
              // Write the graph's label if it has changed
              if (!graph.equals(this._graph)) {
                // Close the previous graph and start the new one
                this._write(
                  (this._subject === null
                    ? ''
                    : this._inDefaultGraph
                    ? '.\n'
                    : '\n}\n') +
                    (DEFAULTGRAPH.equals(graph)
                      ? ''
                      : `${this._encodeIriOrBlank(graph)} {\n`)
                );
                this._graph = graph;
                this._subject = null;
              }
              // Don't repeat the subject if it's the same
              if (subject.equals(this._subject)) {
                // Don't repeat the predicate if it's the same
                if (predicate.equals(this._predicate))
                  this._write(`, ${this._encodeObject(object)}`, done);
                // Same subject, different predicate
                else
                  this._write(
                    `;\n    ${this._encodePredicate(
                      (this._predicate = predicate)
                    )} ${this._encodeObject(object)}`,
                    done
                  );
              }
              // Different subject; write the whole quad
              else
                this._write(
                  `${(this._subject === null ? '' : '.\n') +
                    this._encodeSubject(
                      (this._subject = subject)
                    )} ${this._encodePredicate(
                    (this._predicate = predicate)
                  )} ${this._encodeObject(object)}`,
                  done
                );
            } catch (error) {
              done && done(error);
            }
          }

          // ### `_writeQuadLine` writes the quad to the output stream as a single line
          _writeQuadLine(subject, predicate, object, graph, done) {
            // Write the quad without prefixes
            delete this._prefixMatch;
            this._write(
              this.quadToString(subject, predicate, object, graph),
              done
            );
          }

          // ### `quadToString` serializes a quad as a string
          quadToString(subject, predicate, object, graph) {
            return `${this._encodeSubject(subject)} ${this._encodeIriOrBlank(
              predicate
            )} ${this._encodeObject(object)}${
              graph && graph.value
                ? ` ${this._encodeIriOrBlank(graph)} .\n`
                : ' .\n'
            }`;
          }

          // ### `quadsToString` serializes an array of quads as a string
          quadsToString(quads) {
            return quads
              .map(t => {
                return this.quadToString(
                  t.subject,
                  t.predicate,
                  t.object,
                  t.graph
                );
              })
              .join('');
          }

          // ### `_encodeSubject` represents a subject
          _encodeSubject(entity) {
            return entity.termType === 'Quad'
              ? this._encodeQuad(entity)
              : this._encodeIriOrBlank(entity);
          }

          // ### `_encodeIriOrBlank` represents an IRI or blank node
          _encodeIriOrBlank(entity) {
            // A blank node or list is represented as-is
            if (entity.termType !== 'NamedNode') {
              // If it is a list head, pretty-print it
              if (this._lists && entity.value in this._lists)
                entity = this.list(this._lists[entity.value]);
              return 'id' in entity ? entity.id : `_:${entity.value}`;
            }
            let iri = entity.value;
            // Use relative IRIs if requested and possible
            if (this._baseIRI && iri.startsWith(this._baseIRI))
              iri = iri.substr(this._baseIRI.length);
            // Escape special characters
            if (escape.test(iri))
              iri = iri.replace(escapeAll, characterReplacer);
            // Try to represent the IRI as prefixed name
            const prefixMatch = this._prefixRegex.exec(iri);
            return !prefixMatch
              ? `<${iri}>`
              : !prefixMatch[1]
              ? iri
              : this._prefixIRIs[prefixMatch[1]] + prefixMatch[2];
          }

          // ### `_encodeLiteral` represents a literal
          _encodeLiteral(literal) {
            // Escape special characters
            let value = literal.value;
            if (escape.test(value))
              value = value.replace(escapeAll, characterReplacer);

            // Write a language-tagged literal
            if (literal.language) return `"${value}"@${literal.language}`;

            // Write dedicated literals per data type
            if (this._lineMode) {
              // Only abbreviate strings in N-Triples or N-Quads
              if (literal.datatype.value === xsd.string) return `"${value}"`;
            } else {
              // Use common datatype abbreviations in Turtle or TriG
              switch (literal.datatype.value) {
                case xsd.string:
                  return `"${value}"`;
                case xsd.boolean:
                  if (value === 'true' || value === 'false') return value;
                  break;
                case xsd.integer:
                  if (/^[+-]?\d+$/.test(value)) return value;
                  break;
                case xsd.decimal:
                  if (/^[+-]?\d*\.\d+$/.test(value)) return value;
                  break;
                case xsd.double:
                  if (/^[+-]?(?:\d+\.\d*|\.?\d+)[eE][+-]?\d+$/.test(value))
                    return value;
                  break;
              }
            }

            // Write a regular datatyped literal
            return `"${value}"^^${this._encodeIriOrBlank(literal.datatype)}`;
          }

          // ### `_encodePredicate` represents a predicate
          _encodePredicate(predicate) {
            return predicate.value === rdf.type
              ? 'a'
              : this._encodeIriOrBlank(predicate);
          }

          // ### `_encodeObject` represents an object
          _encodeObject(object) {
            switch (object.termType) {
              case 'Quad':
                return this._encodeQuad(object);
              case 'Literal':
                return this._encodeLiteral(object);
              default:
                return this._encodeIriOrBlank(object);
            }
          }

          // ### `_encodeQuad` encodes an RDF* quad
          _encodeQuad({ subject, predicate, object, graph }) {
            return `<<${this._encodeSubject(subject)} ${this._encodePredicate(
              predicate
            )} ${this._encodeObject(object)}${
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_2__N3Util__['isDefaultGraph']
              )(graph)
                ? ''
                : ` ${this._encodeIriOrBlank(graph)}`
            }>>`;
          }

          // ### `_blockedWrite` replaces `_write` after the writer has been closed
          _blockedWrite() {
            throw new Error('Cannot write because the writer has been closed.');
          }

          // ### `addQuad` adds the quad to the output stream
          addQuad(subject, predicate, object, graph, done) {
            // The quad was given as an object, so shift parameters
            if (object === undefined)
              this._writeQuad(
                subject.subject,
                subject.predicate,
                subject.object,
                subject.graph,
                predicate
              );
            // The optional `graph` parameter was not provided
            else if (typeof graph === 'function')
              this._writeQuad(subject, predicate, object, DEFAULTGRAPH, graph);
            // The `graph` parameter was provided
            else
              this._writeQuad(
                subject,
                predicate,
                object,
                graph || DEFAULTGRAPH,
                done
              );
          }

          // ### `addQuads` adds the quads to the output stream
          addQuads(quads) {
            for (let i = 0; i < quads.length; i++) this.addQuad(quads[i]);
          }

          // ### `addPrefix` adds the prefix to the output stream
          addPrefix(prefix, iri, done) {
            const prefixes = {};
            prefixes[prefix] = iri;
            this.addPrefixes(prefixes, done);
          }

          // ### `addPrefixes` adds the prefixes to the output stream
          addPrefixes(prefixes, done) {
            // Ignore prefixes if not supported by the serialization
            if (!this._prefixIRIs) return done && done();

            // Write all new prefixes
            let hasPrefixes = false;
            for (let prefix in prefixes) {
              let iri = prefixes[prefix];
              if (typeof iri !== 'string') iri = iri.value;
              hasPrefixes = true;
              // Finish a possible pending quad
              if (this._subject !== null) {
                this._write(this._inDefaultGraph ? '.\n' : '\n}\n');
                (this._subject = null), (this._graph = '');
              }
              // Store and write the prefix
              this._prefixIRIs[iri] = prefix += ':';
              this._write(`@prefix ${prefix} <${iri}>.\n`);
            }
            // Recreate the prefix matcher
            if (hasPrefixes) {
              let IRIlist = '',
                prefixList = '';
              for (const prefixIRI in this._prefixIRIs) {
                IRIlist += IRIlist ? `|${prefixIRI}` : prefixIRI;
                prefixList +=
                  (prefixList ? '|' : '') + this._prefixIRIs[prefixIRI];
              }
              IRIlist = IRIlist.replace(/[\]\/\(\)\*\+\?\.\\\$]/g, '\\$&');
              this._prefixRegex = new RegExp(
                `^(?:${prefixList})[^\/]*$|` +
                  `^(${IRIlist})([a-zA-Z][\\-_a-zA-Z0-9]*)$`
              );
            }
            // End a prefix block with a newline
            this._write(hasPrefixes ? '\n' : '', done);
          }

          // ### `blank` creates a blank node with the given content
          blank(predicate, object) {
            let children = predicate,
              child,
              length;
            // Empty blank node
            if (predicate === undefined) children = [];
            // Blank node passed as blank(Term("predicate"), Term("object"))
            else if (predicate.termType)
              children = [{ predicate: predicate, object: object }];
            // Blank node passed as blank({ predicate: predicate, object: object })
            else if (!('length' in predicate)) children = [predicate];

            switch ((length = children.length)) {
              // Generate an empty blank node
              case 0:
                return new SerializedTerm('[]');
              // Generate a non-nested one-triple blank node
              case 1:
                child = children[0];
                if (!(child.object instanceof SerializedTerm))
                  return new SerializedTerm(
                    `[ ${this._encodePredicate(
                      child.predicate
                    )} ${this._encodeObject(child.object)} ]`
                  );
              // Generate a multi-triple or nested blank node
              default:
                let contents = '[';
                // Write all triples in order
                for (let i = 0; i < length; i++) {
                  child = children[i];
                  // Write only the object is the predicate is the same as the previous
                  if (child.predicate.equals(predicate))
                    contents += `, ${this._encodeObject(child.object)}`;
                  // Otherwise, write the predicate and the object
                  else {
                    contents += `${(i ? ';\n  ' : '\n  ') +
                      this._encodePredicate(
                        child.predicate
                      )} ${this._encodeObject(child.object)}`;
                    predicate = child.predicate;
                  }
                }
                return new SerializedTerm(`${contents}\n]`);
            }
          }

          // ### `list` creates a list node with the given content
          list(elements) {
            const length = (elements && elements.length) || 0,
              contents = new Array(length);
            for (let i = 0; i < length; i++)
              contents[i] = this._encodeObject(elements[i]);
            return new SerializedTerm(`(${contents.join(' ')})`);
          }

          // ### `end` signals the end of the output stream
          end(done) {
            // Finish a possible pending quad
            if (this._subject !== null) {
              this._write(this._inDefaultGraph ? '.\n' : '\n}\n');
              this._subject = null;
            }
            // Disallow further writing
            this._write = this._blockedWrite;

            // Try to end the underlying stream, ensuring done is called exactly one time
            let singleDone =
              done &&
              ((error, result) => {
                (singleDone = null), done(error, result);
              });
            if (this._endStream) {
              try {
                return this._outputStream.end(singleDone);
              } catch (error) {
                /* error closing stream */
              }
            }
            singleDone && singleDone();
          }
        }
        /* harmony export (immutable) */ __webpack_exports__['a'] = N3Writer;

        // Replaces a character by its escaped version
        function characterReplacer(character) {
          // Replace a single character by its escaped version
          let result = escapedCharacters[character];
          if (result === undefined) {
            // Replace a single character with its 4-bit unicode escape sequence
            if (character.length === 1) {
              result = character.charCodeAt(0).toString(16);
              result = '\\u0000'.substr(0, 6 - result.length) + result;
            }
            // Replace a surrogate pair with its 8-bit unicode escape sequence
            else {
              result = (
                (character.charCodeAt(0) - 0xd800) * 0x400 +
                character.charCodeAt(1) +
                0x2400
              ).toString(16);
              result = '\\U00000000'.substr(0, 10 - result.length) + result;
            }
          }
          return result;
        }

        /***/
      },
      /* 14 */
      /***/ function(module, exports, __webpack_require__) {
        'use strict';
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.

        var R = typeof Reflect === 'object' ? Reflect : null;
        var ReflectApply =
          R && typeof R.apply === 'function'
            ? R.apply
            : function ReflectApply(target, receiver, args) {
                return Function.prototype.apply.call(target, receiver, args);
              };

        var ReflectOwnKeys;
        if (R && typeof R.ownKeys === 'function') {
          ReflectOwnKeys = R.ownKeys;
        } else if (Object.getOwnPropertySymbols) {
          ReflectOwnKeys = function ReflectOwnKeys(target) {
            return Object.getOwnPropertyNames(target).concat(
              Object.getOwnPropertySymbols(target)
            );
          };
        } else {
          ReflectOwnKeys = function ReflectOwnKeys(target) {
            return Object.getOwnPropertyNames(target);
          };
        }

        function ProcessEmitWarning(warning) {
          if (console && console.warn) console.warn(warning);
        }

        var NumberIsNaN =
          Number.isNaN ||
          function NumberIsNaN(value) {
            return value !== value;
          };

        function EventEmitter() {
          EventEmitter.init.call(this);
        }
        module.exports = EventEmitter;
        module.exports.once = once;

        // Backwards-compat with node 0.10.x
        EventEmitter.EventEmitter = EventEmitter;

        EventEmitter.prototype._events = undefined;
        EventEmitter.prototype._eventsCount = 0;
        EventEmitter.prototype._maxListeners = undefined;

        // By default EventEmitters will print a warning if more than 10 listeners are
        // added to it. This is a useful default which helps finding memory leaks.
        var defaultMaxListeners = 10;

        function checkListener(listener) {
          if (typeof listener !== 'function') {
            throw new TypeError(
              'The "listener" argument must be of type Function. Received type ' +
                typeof listener
            );
          }
        }

        Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
          enumerable: true,
          get: function() {
            return defaultMaxListeners;
          },
          set: function(arg) {
            if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
              throw new RangeError(
                'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                  arg +
                  '.'
              );
            }
            defaultMaxListeners = arg;
          }
        });

        EventEmitter.init = function() {
          if (
            this._events === undefined ||
            this._events === Object.getPrototypeOf(this)._events
          ) {
            this._events = Object.create(null);
            this._eventsCount = 0;
          }

          this._maxListeners = this._maxListeners || undefined;
        };

        // Obviously not all Emitters should be limited to 10. This function allows
        // that to be increased. Set to zero for unlimited.
        EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
          if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
            throw new RangeError(
              'The value of "n" is out of range. It must be a non-negative number. Received ' +
                n +
                '.'
            );
          }
          this._maxListeners = n;
          return this;
        };

        function _getMaxListeners(that) {
          if (that._maxListeners === undefined)
            return EventEmitter.defaultMaxListeners;
          return that._maxListeners;
        }

        EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
          return _getMaxListeners(this);
        };

        EventEmitter.prototype.emit = function emit(type) {
          var args = [];
          for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
          var doError = type === 'error';

          var events = this._events;
          if (events !== undefined)
            doError = doError && events.error === undefined;
          else if (!doError) return false;

          // If there is no 'error' event listener then throw.
          if (doError) {
            var er;
            if (args.length > 0) er = args[0];
            if (er instanceof Error) {
              // Note: The comments on the `throw` lines are intentional, they show
              // up in Node's output if this results in an unhandled exception.
              throw er; // Unhandled 'error' event
            }
            // At least give some kind of context to the user
            var err = new Error(
              'Unhandled error.' + (er ? ' (' + er.message + ')' : '')
            );
            err.context = er;
            throw err; // Unhandled 'error' event
          }

          var handler = events[type];

          if (handler === undefined) return false;

          if (typeof handler === 'function') {
            ReflectApply(handler, this, args);
          } else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);
            for (var i = 0; i < len; ++i)
              ReflectApply(listeners[i], this, args);
          }

          return true;
        };

        function _addListener(target, type, listener, prepend) {
          var m;
          var events;
          var existing;

          checkListener(listener);

          events = target._events;
          if (events === undefined) {
            events = target._events = Object.create(null);
            target._eventsCount = 0;
          } else {
            // To avoid recursion in the case that type === "newListener"! Before
            // adding it to the listeners, first emit "newListener".
            if (events.newListener !== undefined) {
              target.emit(
                'newListener',
                type,
                listener.listener ? listener.listener : listener
              );

              // Re-assign `events` because a newListener handler could have caused the
              // this._events to be assigned to a new object
              events = target._events;
            }
            existing = events[type];
          }

          if (existing === undefined) {
            // Optimize the case of one listener. Don't need the extra array object.
            existing = events[type] = listener;
            ++target._eventsCount;
          } else {
            if (typeof existing === 'function') {
              // Adding the second element, need to change to array.
              existing = events[type] = prepend
                ? [listener, existing]
                : [existing, listener];
              // If we've already got an array, just append.
            } else if (prepend) {
              existing.unshift(listener);
            } else {
              existing.push(listener);
            }

            // Check for listener leak
            m = _getMaxListeners(target);
            if (m > 0 && existing.length > m && !existing.warned) {
              existing.warned = true;
              // No error code for this since it is a Warning
              // eslint-disable-next-line no-restricted-syntax
              var w = new Error(
                'Possible EventEmitter memory leak detected. ' +
                  existing.length +
                  ' ' +
                  String(type) +
                  ' listeners ' +
                  'added. Use emitter.setMaxListeners() to ' +
                  'increase limit'
              );
              w.name = 'MaxListenersExceededWarning';
              w.emitter = target;
              w.type = type;
              w.count = existing.length;
              ProcessEmitWarning(w);
            }
          }

          return target;
        }

        EventEmitter.prototype.addListener = function addListener(
          type,
          listener
        ) {
          return _addListener(this, type, listener, false);
        };

        EventEmitter.prototype.on = EventEmitter.prototype.addListener;

        EventEmitter.prototype.prependListener = function prependListener(
          type,
          listener
        ) {
          return _addListener(this, type, listener, true);
        };

        function onceWrapper() {
          if (!this.fired) {
            this.target.removeListener(this.type, this.wrapFn);
            this.fired = true;
            if (arguments.length === 0) return this.listener.call(this.target);
            return this.listener.apply(this.target, arguments);
          }
        }

        function _onceWrap(target, type, listener) {
          var state = {
            fired: false,
            wrapFn: undefined,
            target: target,
            type: type,
            listener: listener
          };
          var wrapped = onceWrapper.bind(state);
          wrapped.listener = listener;
          state.wrapFn = wrapped;
          return wrapped;
        }

        EventEmitter.prototype.once = function once(type, listener) {
          checkListener(listener);
          this.on(type, _onceWrap(this, type, listener));
          return this;
        };

        EventEmitter.prototype.prependOnceListener = function prependOnceListener(
          type,
          listener
        ) {
          checkListener(listener);
          this.prependListener(type, _onceWrap(this, type, listener));
          return this;
        };

        // Emits a 'removeListener' event if and only if the listener was removed.
        EventEmitter.prototype.removeListener = function removeListener(
          type,
          listener
        ) {
          var list, events, position, i, originalListener;

          checkListener(listener);

          events = this._events;
          if (events === undefined) return this;

          list = events[type];
          if (list === undefined) return this;

          if (list === listener || list.listener === listener) {
            if (--this._eventsCount === 0) this._events = Object.create(null);
            else {
              delete events[type];
              if (events.removeListener)
                this.emit('removeListener', type, list.listener || listener);
            }
          } else if (typeof list !== 'function') {
            position = -1;

            for (i = list.length - 1; i >= 0; i--) {
              if (list[i] === listener || list[i].listener === listener) {
                originalListener = list[i].listener;
                position = i;
                break;
              }
            }

            if (position < 0) return this;

            if (position === 0) list.shift();
            else {
              spliceOne(list, position);
            }

            if (list.length === 1) events[type] = list[0];

            if (events.removeListener !== undefined)
              this.emit('removeListener', type, originalListener || listener);
          }

          return this;
        };

        EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

        EventEmitter.prototype.removeAllListeners = function removeAllListeners(
          type
        ) {
          var listeners, events, i;

          events = this._events;
          if (events === undefined) return this;

          // not listening for removeListener, no need to emit
          if (events.removeListener === undefined) {
            if (arguments.length === 0) {
              this._events = Object.create(null);
              this._eventsCount = 0;
            } else if (events[type] !== undefined) {
              if (--this._eventsCount === 0) this._events = Object.create(null);
              else delete events[type];
            }
            return this;
          }

          // emit removeListener for all listeners on all events
          if (arguments.length === 0) {
            var keys = Object.keys(events);
            var key;
            for (i = 0; i < keys.length; ++i) {
              key = keys[i];
              if (key === 'removeListener') continue;
              this.removeAllListeners(key);
            }
            this.removeAllListeners('removeListener');
            this._events = Object.create(null);
            this._eventsCount = 0;
            return this;
          }

          listeners = events[type];

          if (typeof listeners === 'function') {
            this.removeListener(type, listeners);
          } else if (listeners !== undefined) {
            // LIFO order
            for (i = listeners.length - 1; i >= 0; i--) {
              this.removeListener(type, listeners[i]);
            }
          }

          return this;
        };

        function _listeners(target, type, unwrap) {
          var events = target._events;

          if (events === undefined) return [];

          var evlistener = events[type];
          if (evlistener === undefined) return [];

          if (typeof evlistener === 'function')
            return unwrap ? [evlistener.listener || evlistener] : [evlistener];

          return unwrap
            ? unwrapListeners(evlistener)
            : arrayClone(evlistener, evlistener.length);
        }

        EventEmitter.prototype.listeners = function listeners(type) {
          return _listeners(this, type, true);
        };

        EventEmitter.prototype.rawListeners = function rawListeners(type) {
          return _listeners(this, type, false);
        };

        EventEmitter.listenerCount = function(emitter, type) {
          if (typeof emitter.listenerCount === 'function') {
            return emitter.listenerCount(type);
          } else {
            return listenerCount.call(emitter, type);
          }
        };

        EventEmitter.prototype.listenerCount = listenerCount;
        function listenerCount(type) {
          var events = this._events;

          if (events !== undefined) {
            var evlistener = events[type];

            if (typeof evlistener === 'function') {
              return 1;
            } else if (evlistener !== undefined) {
              return evlistener.length;
            }
          }

          return 0;
        }

        EventEmitter.prototype.eventNames = function eventNames() {
          return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
        };

        function arrayClone(arr, n) {
          var copy = new Array(n);
          for (var i = 0; i < n; ++i) copy[i] = arr[i];
          return copy;
        }

        function spliceOne(list, index) {
          for (; index + 1 < list.length; index++)
            list[index] = list[index + 1];
          list.pop();
        }

        function unwrapListeners(arr) {
          var ret = new Array(arr.length);
          for (var i = 0; i < ret.length; ++i) {
            ret[i] = arr[i].listener || arr[i];
          }
          return ret;
        }

        function once(emitter, name) {
          return new Promise(function(resolve, reject) {
            function errorListener(err) {
              emitter.removeListener(name, resolver);
              reject(err);
            }

            function resolver() {
              if (typeof emitter.removeListener === 'function') {
                emitter.removeListener('error', errorListener);
              }
              resolve([].slice.call(arguments));
            }

            eventTargetAgnosticAddListener(emitter, name, resolver, {
              once: true
            });
            if (name !== 'error') {
              addErrorHandlerIfEventEmitter(emitter, errorListener, {
                once: true
              });
            }
          });
        }

        function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
          if (typeof emitter.on === 'function') {
            eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
          }
        }

        function eventTargetAgnosticAddListener(
          emitter,
          name,
          listener,
          flags
        ) {
          if (typeof emitter.on === 'function') {
            if (flags.once) {
              emitter.once(name, listener);
            } else {
              emitter.on(name, listener);
            }
          } else if (typeof emitter.addEventListener === 'function') {
            // EventTarget does not have `error` event semantics like Node
            // EventEmitters, we do not listen for `error` events here.
            emitter.addEventListener(name, function wrapListener(arg) {
              // IE does not have builtin `{ once: true }` support so we
              // have to do it manually.
              if (flags.once) {
                emitter.removeEventListener(name, wrapListener);
              }
              listener(arg);
            });
          } else {
            throw new TypeError(
              'The "emitter" argument must be of type EventEmitter. Received type ' +
                typeof emitter
            );
          }
        }

        /***/
      },
      /* 15 */
      /***/ function(module, exports, __webpack_require__) {
        'use strict';
        /* WEBPACK VAR INJECTION */ (function(global, process) {
          // Copyright Joyent, Inc. and other Node contributors.
          //
          // Permission is hereby granted, free of charge, to any person obtaining a
          // copy of this software and associated documentation files (the
          // "Software"), to deal in the Software without restriction, including
          // without limitation the rights to use, copy, modify, merge, publish,
          // distribute, sublicense, and/or sell copies of the Software, and to permit
          // persons to whom the Software is furnished to do so, subject to the
          // following conditions:
          //
          // The above copyright notice and this permission notice shall be included
          // in all copies or substantial portions of the Software.
          //
          // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
          // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
          // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
          // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
          // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
          // USE OR OTHER DEALINGS IN THE SOFTWARE.

          module.exports = Readable;
          /*<replacement>*/

          var Duplex;
          /*</replacement>*/

          Readable.ReadableState = ReadableState;
          /*<replacement>*/

          var EE = __webpack_require__(14).EventEmitter;

          var EElistenerCount = function EElistenerCount(emitter, type) {
            return emitter.listeners(type).length;
          };
          /*</replacement>*/

          /*<replacement>*/

          var Stream = __webpack_require__(20);
          /*</replacement>*/

          var Buffer = __webpack_require__(3).Buffer;

          var OurUint8Array = global.Uint8Array || function() {};

          function _uint8ArrayToBuffer(chunk) {
            return Buffer.from(chunk);
          }

          function _isUint8Array(obj) {
            return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
          }
          /*<replacement>*/

          var debugUtil = __webpack_require__(37);

          var debug;

          if (debugUtil && debugUtil.debuglog) {
            debug = debugUtil.debuglog('stream');
          } else {
            debug = function debug() {};
          }
          /*</replacement>*/

          var BufferList = __webpack_require__(31);

          var destroyImpl = __webpack_require__(18);

          var _require = __webpack_require__(19),
            getHighWaterMark = _require.getHighWaterMark;

          var _require$codes = __webpack_require__(0).codes,
            ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
            ERR_STREAM_PUSH_AFTER_EOF =
              _require$codes.ERR_STREAM_PUSH_AFTER_EOF,
            ERR_METHOD_NOT_IMPLEMENTED =
              _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
            ERR_STREAM_UNSHIFT_AFTER_END_EVENT =
              _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.

          var StringDecoder;
          var createReadableStreamAsyncIterator;
          var from;

          __webpack_require__(4)(Readable, Stream);

          var errorOrDestroy = destroyImpl.errorOrDestroy;
          var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

          function prependListener(emitter, event, fn) {
            // Sadly this is not cacheable as some libraries bundle their own
            // event emitter implementation with them.
            if (typeof emitter.prependListener === 'function')
              return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
            // userland ones.  NEVER DO THIS. This is here only because this code needs
            // to continue to work with older versions of Node.js that do not include
            // the prependListener() method. The goal is to eventually remove this hack.

            if (!emitter._events || !emitter._events[event])
              emitter.on(event, fn);
            else if (Array.isArray(emitter._events[event]))
              emitter._events[event].unshift(fn);
            else emitter._events[event] = [fn, emitter._events[event]];
          }

          function ReadableState(options, stream, isDuplex) {
            Duplex = Duplex || __webpack_require__(1);
            options = options || {}; // Duplex streams are both readable and writable, but share
            // the same options object.
            // However, some cases require setting options to different
            // values for the readable and the writable sides of the duplex stream.
            // These options can be provided separately as readableXXX and writableXXX.

            if (typeof isDuplex !== 'boolean')
              isDuplex = stream instanceof Duplex; // object stream flag. Used to make read(n) ignore n and to
            // make all the buffer merging and length checks go away

            this.objectMode = !!options.objectMode;
            if (isDuplex)
              this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
            // Note: 0 is a valid value, means "don't call _read preemptively ever"

            this.highWaterMark = getHighWaterMark(
              this,
              options,
              'readableHighWaterMark',
              isDuplex
            ); // A linked list is used to store data chunks instead of an array because the
            // linked list can remove elements from the beginning faster than
            // array.shift()

            this.buffer = new BufferList();
            this.length = 0;
            this.pipes = null;
            this.pipesCount = 0;
            this.flowing = null;
            this.ended = false;
            this.endEmitted = false;
            this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
            // immediately, or on a later tick.  We set this to true at first, because
            // any actions that shouldn't happen until "later" should generally also
            // not happen before the first read call.

            this.sync = true; // whenever we return null, then we set a flag to say
            // that we're awaiting a 'readable' event emission.

            this.needReadable = false;
            this.emittedReadable = false;
            this.readableListening = false;
            this.resumeScheduled = false;
            this.paused = true; // Should close be emitted on destroy. Defaults to true.

            this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')

            this.autoDestroy = !!options.autoDestroy; // has it been destroyed

            this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
            // encoding is 'binary' so we have to make this configurable.
            // Everything else in the universe uses 'utf8', though.

            this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

            this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

            this.readingMore = false;
            this.decoder = null;
            this.encoding = null;

            if (options.encoding) {
              if (!StringDecoder)
                StringDecoder = __webpack_require__(21).StringDecoder;
              this.decoder = new StringDecoder(options.encoding);
              this.encoding = options.encoding;
            }
          }

          function Readable(options) {
            Duplex = Duplex || __webpack_require__(1);
            if (!(this instanceof Readable)) return new Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
            // the ReadableState constructor, at least with V8 6.5

            var isDuplex = this instanceof Duplex;
            this._readableState = new ReadableState(options, this, isDuplex); // legacy

            this.readable = true;

            if (options) {
              if (typeof options.read === 'function') this._read = options.read;
              if (typeof options.destroy === 'function')
                this._destroy = options.destroy;
            }

            Stream.call(this);
          }

          Object.defineProperty(Readable.prototype, 'destroyed', {
            // making it explicit this property is not enumerable
            // because otherwise some prototype manipulation in
            // userland will fail
            enumerable: false,
            get: function get() {
              if (this._readableState === undefined) {
                return false;
              }

              return this._readableState.destroyed;
            },
            set: function set(value) {
              // we ignore the value if the stream
              // has not been initialized yet
              if (!this._readableState) {
                return;
              } // backward compatibility, the user is explicitly
              // managing destroyed

              this._readableState.destroyed = value;
            }
          });
          Readable.prototype.destroy = destroyImpl.destroy;
          Readable.prototype._undestroy = destroyImpl.undestroy;

          Readable.prototype._destroy = function(err, cb) {
            cb(err);
          }; // Manually shove something into the read() buffer.
          // This returns true if the highWaterMark has not been hit yet,
          // similar to how Writable.write() returns true if you should
          // write() some more.

          Readable.prototype.push = function(chunk, encoding) {
            var state = this._readableState;
            var skipChunkCheck;

            if (!state.objectMode) {
              if (typeof chunk === 'string') {
                encoding = encoding || state.defaultEncoding;

                if (encoding !== state.encoding) {
                  chunk = Buffer.from(chunk, encoding);
                  encoding = '';
                }

                skipChunkCheck = true;
              }
            } else {
              skipChunkCheck = true;
            }

            return readableAddChunk(
              this,
              chunk,
              encoding,
              false,
              skipChunkCheck
            );
          }; // Unshift should *always* be something directly out of read()

          Readable.prototype.unshift = function(chunk) {
            return readableAddChunk(this, chunk, null, true, false);
          };

          function readableAddChunk(
            stream,
            chunk,
            encoding,
            addToFront,
            skipChunkCheck
          ) {
            debug('readableAddChunk', chunk);
            var state = stream._readableState;

            if (chunk === null) {
              state.reading = false;
              onEofChunk(stream, state);
            } else {
              var er;
              if (!skipChunkCheck) er = chunkInvalid(state, chunk);

              if (er) {
                errorOrDestroy(stream, er);
              } else if (state.objectMode || (chunk && chunk.length > 0)) {
                if (
                  typeof chunk !== 'string' &&
                  !state.objectMode &&
                  Object.getPrototypeOf(chunk) !== Buffer.prototype
                ) {
                  chunk = _uint8ArrayToBuffer(chunk);
                }

                if (addToFront) {
                  if (state.endEmitted)
                    errorOrDestroy(
                      stream,
                      new ERR_STREAM_UNSHIFT_AFTER_END_EVENT()
                    );
                  else addChunk(stream, state, chunk, true);
                } else if (state.ended) {
                  errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
                } else if (state.destroyed) {
                  return false;
                } else {
                  state.reading = false;

                  if (state.decoder && !encoding) {
                    chunk = state.decoder.write(chunk);
                    if (state.objectMode || chunk.length !== 0)
                      addChunk(stream, state, chunk, false);
                    else maybeReadMore(stream, state);
                  } else {
                    addChunk(stream, state, chunk, false);
                  }
                }
              } else if (!addToFront) {
                state.reading = false;
                maybeReadMore(stream, state);
              }
            } // We can push more data if we are below the highWaterMark.
            // Also, if we have no data yet, we can stand some more bytes.
            // This is to work around cases where hwm=0, such as the repl.

            return (
              !state.ended &&
              (state.length < state.highWaterMark || state.length === 0)
            );
          }

          function addChunk(stream, state, chunk, addToFront) {
            if (state.flowing && state.length === 0 && !state.sync) {
              state.awaitDrain = 0;
              stream.emit('data', chunk);
            } else {
              // update the buffer info.
              state.length += state.objectMode ? 1 : chunk.length;
              if (addToFront) state.buffer.unshift(chunk);
              else state.buffer.push(chunk);
              if (state.needReadable) emitReadable(stream);
            }

            maybeReadMore(stream, state);
          }

          function chunkInvalid(state, chunk) {
            var er;

            if (
              !_isUint8Array(chunk) &&
              typeof chunk !== 'string' &&
              chunk !== undefined &&
              !state.objectMode
            ) {
              er = new ERR_INVALID_ARG_TYPE(
                'chunk',
                ['string', 'Buffer', 'Uint8Array'],
                chunk
              );
            }

            return er;
          }

          Readable.prototype.isPaused = function() {
            return this._readableState.flowing === false;
          }; // backwards compatibility.

          Readable.prototype.setEncoding = function(enc) {
            if (!StringDecoder)
              StringDecoder = __webpack_require__(21).StringDecoder;
            var decoder = new StringDecoder(enc);
            this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8

            this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:

            var p = this._readableState.buffer.head;
            var content = '';

            while (p !== null) {
              content += decoder.write(p.data);
              p = p.next;
            }

            this._readableState.buffer.clear();

            if (content !== '') this._readableState.buffer.push(content);
            this._readableState.length = content.length;
            return this;
          }; // Don't raise the hwm > 1GB

          var MAX_HWM = 0x40000000;

          function computeNewHighWaterMark(n) {
            if (n >= MAX_HWM) {
              // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
              n = MAX_HWM;
            } else {
              // Get the next highest power of 2 to prevent increasing hwm excessively in
              // tiny amounts
              n--;
              n |= n >>> 1;
              n |= n >>> 2;
              n |= n >>> 4;
              n |= n >>> 8;
              n |= n >>> 16;
              n++;
            }

            return n;
          } // This function is designed to be inlinable, so please take care when making
          // changes to the function body.

          function howMuchToRead(n, state) {
            if (n <= 0 || (state.length === 0 && state.ended)) return 0;
            if (state.objectMode) return 1;

            if (n !== n) {
              // Only flow one buffer at a time
              if (state.flowing && state.length)
                return state.buffer.head.data.length;
              else return state.length;
            } // If we're asking for more than the current hwm, then raise the hwm.

            if (n > state.highWaterMark)
              state.highWaterMark = computeNewHighWaterMark(n);
            if (n <= state.length) return n; // Don't have enough

            if (!state.ended) {
              state.needReadable = true;
              return 0;
            }

            return state.length;
          } // you can override either this method, or the async _read(n) below.

          Readable.prototype.read = function(n) {
            debug('read', n);
            n = parseInt(n, 10);
            var state = this._readableState;
            var nOrig = n;
            if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
            // already have a bunch of data in the buffer, then just trigger
            // the 'readable' event and move on.

            if (
              n === 0 &&
              state.needReadable &&
              ((state.highWaterMark !== 0
                ? state.length >= state.highWaterMark
                : state.length > 0) ||
                state.ended)
            ) {
              debug('read: emitReadable', state.length, state.ended);
              if (state.length === 0 && state.ended) endReadable(this);
              else emitReadable(this);
              return null;
            }

            n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

            if (n === 0 && state.ended) {
              if (state.length === 0) endReadable(this);
              return null;
            } // All the actual chunk generation logic needs to be
            // *below* the call to _read.  The reason is that in certain
            // synthetic stream cases, such as passthrough streams, _read
            // may be a completely synchronous operation which may change
            // the state of the read buffer, providing enough data when
            // before there was *not* enough.
            //
            // So, the steps are:
            // 1. Figure out what the state of things will be after we do
            // a read from the buffer.
            //
            // 2. If that resulting state will trigger a _read, then call _read.
            // Note that this may be asynchronous, or synchronous.  Yes, it is
            // deeply ugly to write APIs this way, but that still doesn't mean
            // that the Readable class should behave improperly, as streams are
            // designed to be sync/async agnostic.
            // Take note if the _read call is sync or async (ie, if the read call
            // has returned yet), so that we know whether or not it's safe to emit
            // 'readable' etc.
            //
            // 3. Actually pull the requested chunks out of the buffer and return.
            // if we need a readable event, then we need to do some reading.

            var doRead = state.needReadable;
            debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

            if (state.length === 0 || state.length - n < state.highWaterMark) {
              doRead = true;
              debug('length less than watermark', doRead);
            } // however, if we've ended, then there's no point, and if we're already
            // reading, then it's unnecessary.

            if (state.ended || state.reading) {
              doRead = false;
              debug('reading or ended', doRead);
            } else if (doRead) {
              debug('do read');
              state.reading = true;
              state.sync = true; // if the length is currently zero, then we *need* a readable event.

              if (state.length === 0) state.needReadable = true; // call internal read method

              this._read(state.highWaterMark);

              state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
              // and we need to re-evaluate how much data we can return to the user.

              if (!state.reading) n = howMuchToRead(nOrig, state);
            }

            var ret;
            if (n > 0) ret = fromList(n, state);
            else ret = null;

            if (ret === null) {
              state.needReadable = state.length <= state.highWaterMark;
              n = 0;
            } else {
              state.length -= n;
              state.awaitDrain = 0;
            }

            if (state.length === 0) {
              // If we have nothing in the buffer, then we want to know
              // as soon as we *do* get something into the buffer.
              if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

              if (nOrig !== n && state.ended) endReadable(this);
            }

            if (ret !== null) this.emit('data', ret);
            return ret;
          };

          function onEofChunk(stream, state) {
            debug('onEofChunk');
            if (state.ended) return;

            if (state.decoder) {
              var chunk = state.decoder.end();

              if (chunk && chunk.length) {
                state.buffer.push(chunk);
                state.length += state.objectMode ? 1 : chunk.length;
              }
            }

            state.ended = true;

            if (state.sync) {
              // if we are sync, wait until next tick to emit the data.
              // Otherwise we risk emitting data in the flow()
              // the readable code triggers during a read() call
              emitReadable(stream);
            } else {
              // emit 'readable' now to make sure it gets picked up.
              state.needReadable = false;

              if (!state.emittedReadable) {
                state.emittedReadable = true;
                emitReadable_(stream);
              }
            }
          } // Don't emit readable right away in sync mode, because this can trigger
          // another read() call => stack overflow.  This way, it might trigger
          // a nextTick recursion warning, but that's not so bad.

          function emitReadable(stream) {
            var state = stream._readableState;
            debug('emitReadable', state.needReadable, state.emittedReadable);
            state.needReadable = false;

            if (!state.emittedReadable) {
              debug('emitReadable', state.flowing);
              state.emittedReadable = true;
              process.nextTick(emitReadable_, stream);
            }
          }

          function emitReadable_(stream) {
            var state = stream._readableState;
            debug('emitReadable_', state.destroyed, state.length, state.ended);

            if (!state.destroyed && (state.length || state.ended)) {
              stream.emit('readable');
              state.emittedReadable = false;
            } // The stream needs another readable event if
            // 1. It is not flowing, as the flow mechanism will take
            //    care of it.
            // 2. It is not ended.
            // 3. It is below the highWaterMark, so we can schedule
            //    another readable later.

            state.needReadable =
              !state.flowing &&
              !state.ended &&
              state.length <= state.highWaterMark;
            flow(stream);
          } // at this point, the user has presumably seen the 'readable' event,
          // and called read() to consume some data.  that may have triggered
          // in turn another _read(n) call, in which case reading = true if
          // it's in progress.
          // However, if we're not ended, or reading, and the length < hwm,
          // then go ahead and try to read some more preemptively.

          function maybeReadMore(stream, state) {
            if (!state.readingMore) {
              state.readingMore = true;
              process.nextTick(maybeReadMore_, stream, state);
            }
          }

          function maybeReadMore_(stream, state) {
            // Attempt to read more data if we should.
            //
            // The conditions for reading more data are (one of):
            // - Not enough data buffered (state.length < state.highWaterMark). The loop
            //   is responsible for filling the buffer with enough data if such data
            //   is available. If highWaterMark is 0 and we are not in the flowing mode
            //   we should _not_ attempt to buffer any extra data. We'll get more data
            //   when the stream consumer calls read() instead.
            // - No data in the buffer, and the stream is in flowing mode. In this mode
            //   the loop below is responsible for ensuring read() is called. Failing to
            //   call read here would abort the flow and there's no other mechanism for
            //   continuing the flow if the stream consumer has just subscribed to the
            //   'data' event.
            //
            // In addition to the above conditions to keep reading data, the following
            // conditions prevent the data from being read:
            // - The stream has ended (state.ended).
            // - There is already a pending 'read' operation (state.reading). This is a
            //   case where the the stream has called the implementation defined _read()
            //   method, but they are processing the call asynchronously and have _not_
            //   called push() with new data. In this case we skip performing more
            //   read()s. The execution ends in this method again after the _read() ends
            //   up calling push() with more data.
            while (
              !state.reading &&
              !state.ended &&
              (state.length < state.highWaterMark ||
                (state.flowing && state.length === 0))
            ) {
              var len = state.length;
              debug('maybeReadMore read 0');
              stream.read(0);
              if (len === state.length)
                // didn't get any data, stop spinning.
                break;
            }

            state.readingMore = false;
          } // abstract method.  to be overridden in specific implementation classes.
          // call cb(er, data) where data is <= n in length.
          // for virtual (non-string, non-buffer) streams, "length" is somewhat
          // arbitrary, and perhaps not very meaningful.

          Readable.prototype._read = function(n) {
            errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED('_read()'));
          };

          Readable.prototype.pipe = function(dest, pipeOpts) {
            var src = this;
            var state = this._readableState;

            switch (state.pipesCount) {
              case 0:
                state.pipes = dest;
                break;

              case 1:
                state.pipes = [state.pipes, dest];
                break;

              default:
                state.pipes.push(dest);
                break;
            }

            state.pipesCount += 1;
            debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
            var doEnd =
              (!pipeOpts || pipeOpts.end !== false) &&
              dest !== process.stdout &&
              dest !== process.stderr;
            var endFn = doEnd ? onend : unpipe;
            if (state.endEmitted) process.nextTick(endFn);
            else src.once('end', endFn);
            dest.on('unpipe', onunpipe);

            function onunpipe(readable, unpipeInfo) {
              debug('onunpipe');

              if (readable === src) {
                if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
                  unpipeInfo.hasUnpiped = true;
                  cleanup();
                }
              }
            }

            function onend() {
              debug('onend');
              dest.end();
            } // when the dest drains, it reduces the awaitDrain counter
            // on the source.  This would be more elegant with a .once()
            // handler in flow(), but adding and removing repeatedly is
            // too slow.

            var ondrain = pipeOnDrain(src);
            dest.on('drain', ondrain);
            var cleanedUp = false;

            function cleanup() {
              debug('cleanup'); // cleanup event handlers once the pipe is broken

              dest.removeListener('close', onclose);
              dest.removeListener('finish', onfinish);
              dest.removeListener('drain', ondrain);
              dest.removeListener('error', onerror);
              dest.removeListener('unpipe', onunpipe);
              src.removeListener('end', onend);
              src.removeListener('end', unpipe);
              src.removeListener('data', ondata);
              cleanedUp = true; // if the reader is waiting for a drain event from this
              // specific writer, then it would cause it to never start
              // flowing again.
              // So, if this is awaiting a drain, then we just call it now.
              // If we don't know, then assume that we are waiting for one.

              if (
                state.awaitDrain &&
                (!dest._writableState || dest._writableState.needDrain)
              )
                ondrain();
            }

            src.on('data', ondata);

            function ondata(chunk) {
              debug('ondata');
              var ret = dest.write(chunk);
              debug('dest.write', ret);

              if (ret === false) {
                // If the user unpiped during `dest.write()`, it is possible
                // to get stuck in a permanently paused state if that write
                // also returned false.
                // => Check whether `dest` is still a piping destination.
                if (
                  ((state.pipesCount === 1 && state.pipes === dest) ||
                    (state.pipesCount > 1 &&
                      indexOf(state.pipes, dest) !== -1)) &&
                  !cleanedUp
                ) {
                  debug('false write response, pause', state.awaitDrain);
                  state.awaitDrain++;
                }

                src.pause();
              }
            } // if the dest has an error, then stop piping into it.
            // however, don't suppress the throwing behavior for this.

            function onerror(er) {
              debug('onerror', er);
              unpipe();
              dest.removeListener('error', onerror);
              if (EElistenerCount(dest, 'error') === 0)
                errorOrDestroy(dest, er);
            } // Make sure our error handler is attached before userland ones.

            prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

            function onclose() {
              dest.removeListener('finish', onfinish);
              unpipe();
            }

            dest.once('close', onclose);

            function onfinish() {
              debug('onfinish');
              dest.removeListener('close', onclose);
              unpipe();
            }

            dest.once('finish', onfinish);

            function unpipe() {
              debug('unpipe');
              src.unpipe(dest);
            } // tell the dest that it's being piped to

            dest.emit('pipe', src); // start the flow if it hasn't been started already.

            if (!state.flowing) {
              debug('pipe resume');
              src.resume();
            }

            return dest;
          };

          function pipeOnDrain(src) {
            return function pipeOnDrainFunctionResult() {
              var state = src._readableState;
              debug('pipeOnDrain', state.awaitDrain);
              if (state.awaitDrain) state.awaitDrain--;

              if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
                state.flowing = true;
                flow(src);
              }
            };
          }

          Readable.prototype.unpipe = function(dest) {
            var state = this._readableState;
            var unpipeInfo = {
              hasUnpiped: false
            }; // if we're not piping anywhere, then do nothing.

            if (state.pipesCount === 0) return this; // just one destination.  most common case.

            if (state.pipesCount === 1) {
              // passed in one, but it's not the right one.
              if (dest && dest !== state.pipes) return this;
              if (!dest) dest = state.pipes; // got a match.

              state.pipes = null;
              state.pipesCount = 0;
              state.flowing = false;
              if (dest) dest.emit('unpipe', this, unpipeInfo);
              return this;
            } // slow case. multiple pipe destinations.

            if (!dest) {
              // remove all.
              var dests = state.pipes;
              var len = state.pipesCount;
              state.pipes = null;
              state.pipesCount = 0;
              state.flowing = false;

              for (var i = 0; i < len; i++) {
                dests[i].emit('unpipe', this, {
                  hasUnpiped: false
                });
              }

              return this;
            } // try to find the right one.

            var index = indexOf(state.pipes, dest);
            if (index === -1) return this;
            state.pipes.splice(index, 1);
            state.pipesCount -= 1;
            if (state.pipesCount === 1) state.pipes = state.pipes[0];
            dest.emit('unpipe', this, unpipeInfo);
            return this;
          }; // set up data events if they are asked for
          // Ensure readable listeners eventually get something

          Readable.prototype.on = function(ev, fn) {
            var res = Stream.prototype.on.call(this, ev, fn);
            var state = this._readableState;

            if (ev === 'data') {
              // update readableListening so that resume() may be a no-op
              // a few lines down. This is needed to support once('readable').
              state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused

              if (state.flowing !== false) this.resume();
            } else if (ev === 'readable') {
              if (!state.endEmitted && !state.readableListening) {
                state.readableListening = state.needReadable = true;
                state.flowing = false;
                state.emittedReadable = false;
                debug('on readable', state.length, state.reading);

                if (state.length) {
                  emitReadable(this);
                } else if (!state.reading) {
                  process.nextTick(nReadingNextTick, this);
                }
              }
            }

            return res;
          };

          Readable.prototype.addListener = Readable.prototype.on;

          Readable.prototype.removeListener = function(ev, fn) {
            var res = Stream.prototype.removeListener.call(this, ev, fn);

            if (ev === 'readable') {
              // We need to check if there is someone still listening to
              // readable and reset the state. However this needs to happen
              // after readable has been emitted but before I/O (nextTick) to
              // support once('readable', fn) cycles. This means that calling
              // resume within the same tick will have no
              // effect.
              process.nextTick(updateReadableListening, this);
            }

            return res;
          };

          Readable.prototype.removeAllListeners = function(ev) {
            var res = Stream.prototype.removeAllListeners.apply(
              this,
              arguments
            );

            if (ev === 'readable' || ev === undefined) {
              // We need to check if there is someone still listening to
              // readable and reset the state. However this needs to happen
              // after readable has been emitted but before I/O (nextTick) to
              // support once('readable', fn) cycles. This means that calling
              // resume within the same tick will have no
              // effect.
              process.nextTick(updateReadableListening, this);
            }

            return res;
          };

          function updateReadableListening(self) {
            var state = self._readableState;
            state.readableListening = self.listenerCount('readable') > 0;

            if (state.resumeScheduled && !state.paused) {
              // flowing needs to be set to true now, otherwise
              // the upcoming resume will not flow.
              state.flowing = true; // crude way to check if we should resume
            } else if (self.listenerCount('data') > 0) {
              self.resume();
            }
          }

          function nReadingNextTick(self) {
            debug('readable nexttick read 0');
            self.read(0);
          } // pause() and resume() are remnants of the legacy readable stream API
          // If the user uses them, then switch into old mode.

          Readable.prototype.resume = function() {
            var state = this._readableState;

            if (!state.flowing) {
              debug('resume'); // we flow only if there is no one listening
              // for readable, but we still have to call
              // resume()

              state.flowing = !state.readableListening;
              resume(this, state);
            }

            state.paused = false;
            return this;
          };

          function resume(stream, state) {
            if (!state.resumeScheduled) {
              state.resumeScheduled = true;
              process.nextTick(resume_, stream, state);
            }
          }

          function resume_(stream, state) {
            debug('resume', state.reading);

            if (!state.reading) {
              stream.read(0);
            }

            state.resumeScheduled = false;
            stream.emit('resume');
            flow(stream);
            if (state.flowing && !state.reading) stream.read(0);
          }

          Readable.prototype.pause = function() {
            debug('call pause flowing=%j', this._readableState.flowing);

            if (this._readableState.flowing !== false) {
              debug('pause');
              this._readableState.flowing = false;
              this.emit('pause');
            }

            this._readableState.paused = true;
            return this;
          };

          function flow(stream) {
            var state = stream._readableState;
            debug('flow', state.flowing);

            while (state.flowing && stream.read() !== null) {}
          } // wrap an old-style stream as the async data source.
          // This is *not* part of the readable stream interface.
          // It is an ugly unfortunate mess of history.

          Readable.prototype.wrap = function(stream) {
            var _this = this;

            var state = this._readableState;
            var paused = false;
            stream.on('end', function() {
              debug('wrapped end');

              if (state.decoder && !state.ended) {
                var chunk = state.decoder.end();
                if (chunk && chunk.length) _this.push(chunk);
              }

              _this.push(null);
            });
            stream.on('data', function(chunk) {
              debug('wrapped data');
              if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

              if (state.objectMode && (chunk === null || chunk === undefined))
                return;
              else if (!state.objectMode && (!chunk || !chunk.length)) return;

              var ret = _this.push(chunk);

              if (!ret) {
                paused = true;
                stream.pause();
              }
            }); // proxy all the other methods.
            // important when wrapping filters and duplexes.

            for (var i in stream) {
              if (this[i] === undefined && typeof stream[i] === 'function') {
                this[i] = (function methodWrap(method) {
                  return function methodWrapReturnFunction() {
                    return stream[method].apply(stream, arguments);
                  };
                })(i);
              }
            } // proxy certain important events.

            for (var n = 0; n < kProxyEvents.length; n++) {
              stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
            } // when we try to consume some more bytes, simply unpause the
            // underlying stream.

            this._read = function(n) {
              debug('wrapped _read', n);

              if (paused) {
                paused = false;
                stream.resume();
              }
            };

            return this;
          };

          if (typeof Symbol === 'function') {
            Readable.prototype[Symbol.asyncIterator] = function() {
              if (createReadableStreamAsyncIterator === undefined) {
                createReadableStreamAsyncIterator = __webpack_require__(30);
              }

              return createReadableStreamAsyncIterator(this);
            };
          }

          Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
            // making it explicit this property is not enumerable
            // because otherwise some prototype manipulation in
            // userland will fail
            enumerable: false,
            get: function get() {
              return this._readableState.highWaterMark;
            }
          });
          Object.defineProperty(Readable.prototype, 'readableBuffer', {
            // making it explicit this property is not enumerable
            // because otherwise some prototype manipulation in
            // userland will fail
            enumerable: false,
            get: function get() {
              return this._readableState && this._readableState.buffer;
            }
          });
          Object.defineProperty(Readable.prototype, 'readableFlowing', {
            // making it explicit this property is not enumerable
            // because otherwise some prototype manipulation in
            // userland will fail
            enumerable: false,
            get: function get() {
              return this._readableState.flowing;
            },
            set: function set(state) {
              if (this._readableState) {
                this._readableState.flowing = state;
              }
            }
          }); // exposed for testing purposes only.

          Readable._fromList = fromList;
          Object.defineProperty(Readable.prototype, 'readableLength', {
            // making it explicit this property is not enumerable
            // because otherwise some prototype manipulation in
            // userland will fail
            enumerable: false,
            get: function get() {
              return this._readableState.length;
            }
          }); // Pluck off n bytes from an array of buffers.
          // Length is the combined lengths of all the buffers in the list.
          // This function is designed to be inlinable, so please take care when making
          // changes to the function body.

          function fromList(n, state) {
            // nothing buffered
            if (state.length === 0) return null;
            var ret;
            if (state.objectMode) ret = state.buffer.shift();
            else if (!n || n >= state.length) {
              // read it all, truncate the list
              if (state.decoder) ret = state.buffer.join('');
              else if (state.buffer.length === 1) ret = state.buffer.first();
              else ret = state.buffer.concat(state.length);
              state.buffer.clear();
            } else {
              // read part of list
              ret = state.buffer.consume(n, state.decoder);
            }
            return ret;
          }

          function endReadable(stream) {
            var state = stream._readableState;
            debug('endReadable', state.endEmitted);

            if (!state.endEmitted) {
              state.ended = true;
              process.nextTick(endReadableNT, state, stream);
            }
          }

          function endReadableNT(state, stream) {
            debug('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.

            if (!state.endEmitted && state.length === 0) {
              state.endEmitted = true;
              stream.readable = false;
              stream.emit('end');

              if (state.autoDestroy) {
                // In case of duplex streams we need a way to detect
                // if the writable side is ready for autoDestroy as well
                var wState = stream._writableState;

                if (!wState || (wState.autoDestroy && wState.finished)) {
                  stream.destroy();
                }
              }
            }
          }

          if (typeof Symbol === 'function') {
            Readable.from = function(iterable, opts) {
              if (from === undefined) {
                from = __webpack_require__(32);
              }

              return from(Readable, iterable, opts);
            };
          }

          function indexOf(xs, x) {
            for (var i = 0, l = xs.length; i < l; i++) {
              if (xs[i] === x) return i;
            }

            return -1;
          }
          /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(6), __webpack_require__(5)));

        /***/
      },
      /* 16 */
      /***/ function(module, exports, __webpack_require__) {
        'use strict';
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.
        // a transform stream is a readable/writable stream where you do
        // something with the data.  Sometimes it's called a "filter",
        // but that's not a great name for it, since that implies a thing where
        // some bits pass through, and others are simply ignored.  (That would
        // be a valid example of a transform, of course.)
        //
        // While the output is causally related to the input, it's not a
        // necessarily symmetric or synchronous transformation.  For example,
        // a zlib stream might take multiple plain-text writes(), and then
        // emit a single compressed chunk some time in the future.
        //
        // Here's how this works:
        //
        // The Transform stream has all the aspects of the readable and writable
        // stream classes.  When you write(chunk), that calls _write(chunk,cb)
        // internally, and returns false if there's a lot of pending writes
        // buffered up.  When you call read(), that calls _read(n) until
        // there's enough pending readable data buffered up.
        //
        // In a transform stream, the written data is placed in a buffer.  When
        // _read(n) is called, it transforms the queued up data, calling the
        // buffered _write cb's as it consumes chunks.  If consuming a single
        // written chunk would result in multiple output chunks, then the first
        // outputted bit calls the readcb, and subsequent chunks just go into
        // the read buffer, and will cause it to emit 'readable' if necessary.
        //
        // This way, back-pressure is actually determined by the reading side,
        // since _read has to be called to start processing a new chunk.  However,
        // a pathological inflate type of transform can cause excessive buffering
        // here.  For example, imagine a stream where every byte of input is
        // interpreted as an integer from 0-255, and then results in that many
        // bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
        // 1kb of data being output.  In this case, you could write a very small
        // amount of input, and end up with a very large amount of output.  In
        // such a pathological inflating mechanism, there'd be no way to tell
        // the system to stop doing the transform.  A single 4MB write could
        // cause the system to run out of memory.
        //
        // However, even in such a pathological case, only a single written chunk
        // would be consumed, and then the rest would wait (un-transformed) until
        // the results of the previous transformed chunk were consumed.

        module.exports = Transform;

        var _require$codes = __webpack_require__(0).codes,
          ERR_METHOD_NOT_IMPLEMENTED =
            _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
          ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
          ERR_TRANSFORM_ALREADY_TRANSFORMING =
            _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,
          ERR_TRANSFORM_WITH_LENGTH_0 =
            _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;

        var Duplex = __webpack_require__(1);

        __webpack_require__(4)(Transform, Duplex);

        function afterTransform(er, data) {
          var ts = this._transformState;
          ts.transforming = false;
          var cb = ts.writecb;

          if (cb === null) {
            return this.emit('error', new ERR_MULTIPLE_CALLBACK());
          }

          ts.writechunk = null;
          ts.writecb = null;
          if (data != null)
            // single equals check for both `null` and `undefined`
            this.push(data);
          cb(er);
          var rs = this._readableState;
          rs.reading = false;

          if (rs.needReadable || rs.length < rs.highWaterMark) {
            this._read(rs.highWaterMark);
          }
        }

        function Transform(options) {
          if (!(this instanceof Transform)) return new Transform(options);
          Duplex.call(this, options);
          this._transformState = {
            afterTransform: afterTransform.bind(this),
            needTransform: false,
            transforming: false,
            writecb: null,
            writechunk: null,
            writeencoding: null
          }; // start out asking for a readable event once data is transformed.

          this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
          // that Readable wants before the first _read call, so unset the
          // sync guard flag.

          this._readableState.sync = false;

          if (options) {
            if (typeof options.transform === 'function')
              this._transform = options.transform;
            if (typeof options.flush === 'function')
              this._flush = options.flush;
          } // When the writable side finishes, then flush out anything remaining.

          this.on('prefinish', prefinish);
        }

        function prefinish() {
          var _this = this;

          if (
            typeof this._flush === 'function' &&
            !this._readableState.destroyed
          ) {
            this._flush(function(er, data) {
              done(_this, er, data);
            });
          } else {
            done(this, null, null);
          }
        }

        Transform.prototype.push = function(chunk, encoding) {
          this._transformState.needTransform = false;
          return Duplex.prototype.push.call(this, chunk, encoding);
        }; // This is the part where you do stuff!
        // override this function in implementation classes.
        // 'chunk' is an input chunk.
        //
        // Call `push(newChunk)` to pass along transformed output
        // to the readable side.  You may call 'push' zero or more times.
        //
        // Call `cb(err)` when you are done with this chunk.  If you pass
        // an error, then that'll put the hurt on the whole operation.  If you
        // never call cb(), then you'll never get another chunk.

        Transform.prototype._transform = function(chunk, encoding, cb) {
          cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
        };

        Transform.prototype._write = function(chunk, encoding, cb) {
          var ts = this._transformState;
          ts.writecb = cb;
          ts.writechunk = chunk;
          ts.writeencoding = encoding;

          if (!ts.transforming) {
            var rs = this._readableState;
            if (
              ts.needTransform ||
              rs.needReadable ||
              rs.length < rs.highWaterMark
            )
              this._read(rs.highWaterMark);
          }
        }; // Doesn't matter what the args are here.
        // _transform does all the work.
        // That we got here means that the readable side wants more data.

        Transform.prototype._read = function(n) {
          var ts = this._transformState;

          if (ts.writechunk !== null && !ts.transforming) {
            ts.transforming = true;

            this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
          } else {
            // mark that we need a transform, so that any data that comes in
            // will get processed, now that we've asked for it.
            ts.needTransform = true;
          }
        };

        Transform.prototype._destroy = function(err, cb) {
          Duplex.prototype._destroy.call(this, err, function(err2) {
            cb(err2);
          });
        };

        function done(stream, er, data) {
          if (er) return stream.emit('error', er);
          if (data != null)
            // single equals check for both `null` and `undefined`
            stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
          // if there's nothing in the write buffer, then that means
          // that nothing more will ever be provided

          if (stream._writableState.length)
            throw new ERR_TRANSFORM_WITH_LENGTH_0();
          if (stream._transformState.transforming)
            throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
          return stream.push(null);
        }

        /***/
      },
      /* 17 */
      /***/ function(module, exports, __webpack_require__) {
        'use strict';
        /* WEBPACK VAR INJECTION */ (function(global, process) {
          // Copyright Joyent, Inc. and other Node contributors.
          //
          // Permission is hereby granted, free of charge, to any person obtaining a
          // copy of this software and associated documentation files (the
          // "Software"), to deal in the Software without restriction, including
          // without limitation the rights to use, copy, modify, merge, publish,
          // distribute, sublicense, and/or sell copies of the Software, and to permit
          // persons to whom the Software is furnished to do so, subject to the
          // following conditions:
          //
          // The above copyright notice and this permission notice shall be included
          // in all copies or substantial portions of the Software.
          //
          // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
          // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
          // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
          // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
          // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
          // USE OR OTHER DEALINGS IN THE SOFTWARE.
          // A bit simpler than readable streams.
          // Implement an async ._write(chunk, encoding, cb), and it'll handle all
          // the drain event emission and buffering.

          module.exports = Writable;
          /* <replacement> */

          function WriteReq(chunk, encoding, cb) {
            this.chunk = chunk;
            this.encoding = encoding;
            this.callback = cb;
            this.next = null;
          } // It seems a linked list but it is not
          // there will be only 2 of these for each stream

          function CorkedRequest(state) {
            var _this = this;

            this.next = null;
            this.entry = null;

            this.finish = function() {
              onCorkedFinish(_this, state);
            };
          }
          /* </replacement> */

          /*<replacement>*/

          var Duplex;
          /*</replacement>*/

          Writable.WritableState = WritableState;
          /*<replacement>*/

          var internalUtil = {
            deprecate: __webpack_require__(35)
          };
          /*</replacement>*/

          /*<replacement>*/

          var Stream = __webpack_require__(20);
          /*</replacement>*/

          var Buffer = __webpack_require__(3).Buffer;

          var OurUint8Array = global.Uint8Array || function() {};

          function _uint8ArrayToBuffer(chunk) {
            return Buffer.from(chunk);
          }

          function _isUint8Array(obj) {
            return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
          }

          var destroyImpl = __webpack_require__(18);

          var _require = __webpack_require__(19),
            getHighWaterMark = _require.getHighWaterMark;

          var _require$codes = __webpack_require__(0).codes,
            ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
            ERR_METHOD_NOT_IMPLEMENTED =
              _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
            ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
            ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
            ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
            ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
            ERR_STREAM_WRITE_AFTER_END =
              _require$codes.ERR_STREAM_WRITE_AFTER_END,
            ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;

          var errorOrDestroy = destroyImpl.errorOrDestroy;

          __webpack_require__(4)(Writable, Stream);

          function nop() {}

          function WritableState(options, stream, isDuplex) {
            Duplex = Duplex || __webpack_require__(1);
            options = options || {}; // Duplex streams are both readable and writable, but share
            // the same options object.
            // However, some cases require setting options to different
            // values for the readable and the writable sides of the duplex stream,
            // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.

            if (typeof isDuplex !== 'boolean')
              isDuplex = stream instanceof Duplex; // object stream flag to indicate whether or not this stream
            // contains buffers or objects.

            this.objectMode = !!options.objectMode;
            if (isDuplex)
              this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
            // Note: 0 is a valid value, means that we always return false if
            // the entire buffer is not flushed immediately on write()

            this.highWaterMark = getHighWaterMark(
              this,
              options,
              'writableHighWaterMark',
              isDuplex
            ); // if _final has been called

            this.finalCalled = false; // drain event flag.

            this.needDrain = false; // at the start of calling end()

            this.ending = false; // when end() has been called, and returned

            this.ended = false; // when 'finish' is emitted

            this.finished = false; // has it been destroyed

            this.destroyed = false; // should we decode strings into buffers before passing to _write?
            // this is here so that some node-core streams can optimize string
            // handling at a lower level.

            var noDecode = options.decodeStrings === false;
            this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
            // encoding is 'binary' so we have to make this configurable.
            // Everything else in the universe uses 'utf8', though.

            this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
            // of how much we're waiting to get pushed to some underlying
            // socket or file.

            this.length = 0; // a flag to see when we're in the middle of a write.

            this.writing = false; // when true all writes will be buffered until .uncork() call

            this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
            // or on a later tick.  We set this to true at first, because any
            // actions that shouldn't happen until "later" should generally also
            // not happen before the first write call.

            this.sync = true; // a flag to know if we're processing previously buffered items, which
            // may call the _write() callback in the same tick, so that we don't
            // end up in an overlapped onwrite situation.

            this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

            this.onwrite = function(er) {
              onwrite(stream, er);
            }; // the callback that the user supplies to write(chunk,encoding,cb)

            this.writecb = null; // the amount that is being written when _write is called.

            this.writelen = 0;
            this.bufferedRequest = null;
            this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
            // this must be 0 before 'finish' can be emitted

            this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
            // This is relevant for synchronous Transform streams

            this.prefinished = false; // True if the error was already emitted and should not be thrown again

            this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.

            this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')

            this.autoDestroy = !!options.autoDestroy; // count buffered requests

            this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
            // one allocated and free to use, and we maintain at most two

            this.corkedRequestsFree = new CorkedRequest(this);
          }

          WritableState.prototype.getBuffer = function getBuffer() {
            var current = this.bufferedRequest;
            var out = [];

            while (current) {
              out.push(current);
              current = current.next;
            }

            return out;
          };

          (function() {
            try {
              Object.defineProperty(WritableState.prototype, 'buffer', {
                get: internalUtil.deprecate(
                  function writableStateBufferGetter() {
                    return this.getBuffer();
                  },
                  '_writableState.buffer is deprecated. Use _writableState.getBuffer ' +
                    'instead.',
                  'DEP0003'
                )
              });
            } catch (_) {}
          })(); // Test _writableState for inheritance to account for Duplex streams,
          // whose prototype chain only points to Readable.

          var realHasInstance;

          if (
            typeof Symbol === 'function' &&
            Symbol.hasInstance &&
            typeof Function.prototype[Symbol.hasInstance] === 'function'
          ) {
            realHasInstance = Function.prototype[Symbol.hasInstance];
            Object.defineProperty(Writable, Symbol.hasInstance, {
              value: function value(object) {
                if (realHasInstance.call(this, object)) return true;
                if (this !== Writable) return false;
                return object && object._writableState instanceof WritableState;
              }
            });
          } else {
            realHasInstance = function realHasInstance(object) {
              return object instanceof this;
            };
          }

          function Writable(options) {
            Duplex = Duplex || __webpack_require__(1); // Writable ctor is applied to Duplexes, too.
            // `realHasInstance` is necessary because using plain `instanceof`
            // would return false, as no `_writableState` property is attached.
            // Trying to use the custom `instanceof` for Writable here will also break the
            // Node.js LazyTransform implementation, which has a non-trivial getter for
            // `_writableState` that would lead to infinite recursion.
            // Checking for a Stream.Duplex instance is faster here instead of inside
            // the WritableState constructor, at least with V8 6.5

            var isDuplex = this instanceof Duplex;
            if (!isDuplex && !realHasInstance.call(Writable, this))
              return new Writable(options);
            this._writableState = new WritableState(options, this, isDuplex); // legacy.

            this.writable = true;

            if (options) {
              if (typeof options.write === 'function')
                this._write = options.write;
              if (typeof options.writev === 'function')
                this._writev = options.writev;
              if (typeof options.destroy === 'function')
                this._destroy = options.destroy;
              if (typeof options.final === 'function')
                this._final = options.final;
            }

            Stream.call(this);
          } // Otherwise people can pipe Writable streams, which is just wrong.

          Writable.prototype.pipe = function() {
            errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
          };

          function writeAfterEnd(stream, cb) {
            var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb

            errorOrDestroy(stream, er);
            process.nextTick(cb, er);
          } // Checks that a user-supplied chunk is valid, especially for the particular
          // mode the stream is in. Currently this means that `null` is never accepted
          // and undefined/non-string values are only allowed in object mode.

          function validChunk(stream, state, chunk, cb) {
            var er;

            if (chunk === null) {
              er = new ERR_STREAM_NULL_VALUES();
            } else if (typeof chunk !== 'string' && !state.objectMode) {
              er = new ERR_INVALID_ARG_TYPE(
                'chunk',
                ['string', 'Buffer'],
                chunk
              );
            }

            if (er) {
              errorOrDestroy(stream, er);
              process.nextTick(cb, er);
              return false;
            }

            return true;
          }

          Writable.prototype.write = function(chunk, encoding, cb) {
            var state = this._writableState;
            var ret = false;

            var isBuf = !state.objectMode && _isUint8Array(chunk);

            if (isBuf && !Buffer.isBuffer(chunk)) {
              chunk = _uint8ArrayToBuffer(chunk);
            }

            if (typeof encoding === 'function') {
              cb = encoding;
              encoding = null;
            }

            if (isBuf) encoding = 'buffer';
            else if (!encoding) encoding = state.defaultEncoding;
            if (typeof cb !== 'function') cb = nop;
            if (state.ending) writeAfterEnd(this, cb);
            else if (isBuf || validChunk(this, state, chunk, cb)) {
              state.pendingcb++;
              ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
            }
            return ret;
          };

          Writable.prototype.cork = function() {
            this._writableState.corked++;
          };

          Writable.prototype.uncork = function() {
            var state = this._writableState;

            if (state.corked) {
              state.corked--;
              if (
                !state.writing &&
                !state.corked &&
                !state.bufferProcessing &&
                state.bufferedRequest
              )
                clearBuffer(this, state);
            }
          };

          Writable.prototype.setDefaultEncoding = function setDefaultEncoding(
            encoding
          ) {
            // node::ParseEncoding() requires lower case.
            if (typeof encoding === 'string') encoding = encoding.toLowerCase();
            if (
              !(
                [
                  'hex',
                  'utf8',
                  'utf-8',
                  'ascii',
                  'binary',
                  'base64',
                  'ucs2',
                  'ucs-2',
                  'utf16le',
                  'utf-16le',
                  'raw'
                ].indexOf((encoding + '').toLowerCase()) > -1
              )
            )
              throw new ERR_UNKNOWN_ENCODING(encoding);
            this._writableState.defaultEncoding = encoding;
            return this;
          };

          Object.defineProperty(Writable.prototype, 'writableBuffer', {
            // making it explicit this property is not enumerable
            // because otherwise some prototype manipulation in
            // userland will fail
            enumerable: false,
            get: function get() {
              return this._writableState && this._writableState.getBuffer();
            }
          });

          function decodeChunk(state, chunk, encoding) {
            if (
              !state.objectMode &&
              state.decodeStrings !== false &&
              typeof chunk === 'string'
            ) {
              chunk = Buffer.from(chunk, encoding);
            }

            return chunk;
          }

          Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
            // making it explicit this property is not enumerable
            // because otherwise some prototype manipulation in
            // userland will fail
            enumerable: false,
            get: function get() {
              return this._writableState.highWaterMark;
            }
          }); // if we're already writing something, then just put this
          // in the queue, and wait our turn.  Otherwise, call _write
          // If we return false, then we need a drain event, so set that flag.

          function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
            if (!isBuf) {
              var newChunk = decodeChunk(state, chunk, encoding);

              if (chunk !== newChunk) {
                isBuf = true;
                encoding = 'buffer';
                chunk = newChunk;
              }
            }

            var len = state.objectMode ? 1 : chunk.length;
            state.length += len;
            var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

            if (!ret) state.needDrain = true;

            if (state.writing || state.corked) {
              var last = state.lastBufferedRequest;
              state.lastBufferedRequest = {
                chunk: chunk,
                encoding: encoding,
                isBuf: isBuf,
                callback: cb,
                next: null
              };

              if (last) {
                last.next = state.lastBufferedRequest;
              } else {
                state.bufferedRequest = state.lastBufferedRequest;
              }

              state.bufferedRequestCount += 1;
            } else {
              doWrite(stream, state, false, len, chunk, encoding, cb);
            }

            return ret;
          }

          function doWrite(stream, state, writev, len, chunk, encoding, cb) {
            state.writelen = len;
            state.writecb = cb;
            state.writing = true;
            state.sync = true;
            if (state.destroyed)
              state.onwrite(new ERR_STREAM_DESTROYED('write'));
            else if (writev) stream._writev(chunk, state.onwrite);
            else stream._write(chunk, encoding, state.onwrite);
            state.sync = false;
          }

          function onwriteError(stream, state, sync, er, cb) {
            --state.pendingcb;

            if (sync) {
              // defer the callback if we are being called synchronously
              // to avoid piling up things on the stack
              process.nextTick(cb, er); // this can emit finish, and it will always happen
              // after error

              process.nextTick(finishMaybe, stream, state);
              stream._writableState.errorEmitted = true;
              errorOrDestroy(stream, er);
            } else {
              // the caller expect this to happen before if
              // it is async
              cb(er);
              stream._writableState.errorEmitted = true;
              errorOrDestroy(stream, er); // this can emit finish, but finish must
              // always follow error

              finishMaybe(stream, state);
            }
          }

          function onwriteStateUpdate(state) {
            state.writing = false;
            state.writecb = null;
            state.length -= state.writelen;
            state.writelen = 0;
          }

          function onwrite(stream, er) {
            var state = stream._writableState;
            var sync = state.sync;
            var cb = state.writecb;
            if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
            onwriteStateUpdate(state);
            if (er) onwriteError(stream, state, sync, er, cb);
            else {
              // Check if we're actually ready to finish, but don't emit yet
              var finished = needFinish(state) || stream.destroyed;

              if (
                !finished &&
                !state.corked &&
                !state.bufferProcessing &&
                state.bufferedRequest
              ) {
                clearBuffer(stream, state);
              }

              if (sync) {
                process.nextTick(afterWrite, stream, state, finished, cb);
              } else {
                afterWrite(stream, state, finished, cb);
              }
            }
          }

          function afterWrite(stream, state, finished, cb) {
            if (!finished) onwriteDrain(stream, state);
            state.pendingcb--;
            cb();
            finishMaybe(stream, state);
          } // Must force callback to be called on nextTick, so that we don't
          // emit 'drain' before the write() consumer gets the 'false' return
          // value, and has a chance to attach a 'drain' listener.

          function onwriteDrain(stream, state) {
            if (state.length === 0 && state.needDrain) {
              state.needDrain = false;
              stream.emit('drain');
            }
          } // if there's something in the buffer waiting, then process it

          function clearBuffer(stream, state) {
            state.bufferProcessing = true;
            var entry = state.bufferedRequest;

            if (stream._writev && entry && entry.next) {
              // Fast case, write everything using _writev()
              var l = state.bufferedRequestCount;
              var buffer = new Array(l);
              var holder = state.corkedRequestsFree;
              holder.entry = entry;
              var count = 0;
              var allBuffers = true;

              while (entry) {
                buffer[count] = entry;
                if (!entry.isBuf) allBuffers = false;
                entry = entry.next;
                count += 1;
              }

              buffer.allBuffers = allBuffers;
              doWrite(
                stream,
                state,
                true,
                state.length,
                buffer,
                '',
                holder.finish
              ); // doWrite is almost always async, defer these to save a bit of time
              // as the hot path ends with doWrite

              state.pendingcb++;
              state.lastBufferedRequest = null;

              if (holder.next) {
                state.corkedRequestsFree = holder.next;
                holder.next = null;
              } else {
                state.corkedRequestsFree = new CorkedRequest(state);
              }

              state.bufferedRequestCount = 0;
            } else {
              // Slow case, write chunks one-by-one
              while (entry) {
                var chunk = entry.chunk;
                var encoding = entry.encoding;
                var cb = entry.callback;
                var len = state.objectMode ? 1 : chunk.length;
                doWrite(stream, state, false, len, chunk, encoding, cb);
                entry = entry.next;
                state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
                // it means that we need to wait until it does.
                // also, that means that the chunk and cb are currently
                // being processed, so move the buffer counter past them.

                if (state.writing) {
                  break;
                }
              }

              if (entry === null) state.lastBufferedRequest = null;
            }

            state.bufferedRequest = entry;
            state.bufferProcessing = false;
          }

          Writable.prototype._write = function(chunk, encoding, cb) {
            cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
          };

          Writable.prototype._writev = null;

          Writable.prototype.end = function(chunk, encoding, cb) {
            var state = this._writableState;

            if (typeof chunk === 'function') {
              cb = chunk;
              chunk = null;
              encoding = null;
            } else if (typeof encoding === 'function') {
              cb = encoding;
              encoding = null;
            }

            if (chunk !== null && chunk !== undefined)
              this.write(chunk, encoding); // .end() fully uncorks

            if (state.corked) {
              state.corked = 1;
              this.uncork();
            } // ignore unnecessary end() calls.

            if (!state.ending) endWritable(this, state, cb);
            return this;
          };

          Object.defineProperty(Writable.prototype, 'writableLength', {
            // making it explicit this property is not enumerable
            // because otherwise some prototype manipulation in
            // userland will fail
            enumerable: false,
            get: function get() {
              return this._writableState.length;
            }
          });

          function needFinish(state) {
            return (
              state.ending &&
              state.length === 0 &&
              state.bufferedRequest === null &&
              !state.finished &&
              !state.writing
            );
          }

          function callFinal(stream, state) {
            stream._final(function(err) {
              state.pendingcb--;

              if (err) {
                errorOrDestroy(stream, err);
              }

              state.prefinished = true;
              stream.emit('prefinish');
              finishMaybe(stream, state);
            });
          }

          function prefinish(stream, state) {
            if (!state.prefinished && !state.finalCalled) {
              if (typeof stream._final === 'function' && !state.destroyed) {
                state.pendingcb++;
                state.finalCalled = true;
                process.nextTick(callFinal, stream, state);
              } else {
                state.prefinished = true;
                stream.emit('prefinish');
              }
            }
          }

          function finishMaybe(stream, state) {
            var need = needFinish(state);

            if (need) {
              prefinish(stream, state);

              if (state.pendingcb === 0) {
                state.finished = true;
                stream.emit('finish');

                if (state.autoDestroy) {
                  // In case of duplex streams we need a way to detect
                  // if the readable side is ready for autoDestroy as well
                  var rState = stream._readableState;

                  if (!rState || (rState.autoDestroy && rState.endEmitted)) {
                    stream.destroy();
                  }
                }
              }
            }

            return need;
          }

          function endWritable(stream, state, cb) {
            state.ending = true;
            finishMaybe(stream, state);

            if (cb) {
              if (state.finished) process.nextTick(cb);
              else stream.once('finish', cb);
            }

            state.ended = true;
            stream.writable = false;
          }

          function onCorkedFinish(corkReq, state, err) {
            var entry = corkReq.entry;
            corkReq.entry = null;

            while (entry) {
              var cb = entry.callback;
              state.pendingcb--;
              cb(err);
              entry = entry.next;
            } // reuse the free corkReq.

            state.corkedRequestsFree.next = corkReq;
          }

          Object.defineProperty(Writable.prototype, 'destroyed', {
            // making it explicit this property is not enumerable
            // because otherwise some prototype manipulation in
            // userland will fail
            enumerable: false,
            get: function get() {
              if (this._writableState === undefined) {
                return false;
              }

              return this._writableState.destroyed;
            },
            set: function set(value) {
              // we ignore the value if the stream
              // has not been initialized yet
              if (!this._writableState) {
                return;
              } // backward compatibility, the user is explicitly
              // managing destroyed

              this._writableState.destroyed = value;
            }
          });
          Writable.prototype.destroy = destroyImpl.destroy;
          Writable.prototype._undestroy = destroyImpl.undestroy;

          Writable.prototype._destroy = function(err, cb) {
            cb(err);
          };
          /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(6), __webpack_require__(5)));

        /***/
      },
      /* 18 */
      /***/ function(module, exports, __webpack_require__) {
        'use strict';
        /* WEBPACK VAR INJECTION */ (function(process) {
          // undocumented cb() API, needed for core, not for public API

          function destroy(err, cb) {
            var _this = this;

            var readableDestroyed =
              this._readableState && this._readableState.destroyed;
            var writableDestroyed =
              this._writableState && this._writableState.destroyed;

            if (readableDestroyed || writableDestroyed) {
              if (cb) {
                cb(err);
              } else if (err) {
                if (!this._writableState) {
                  process.nextTick(emitErrorNT, this, err);
                } else if (!this._writableState.errorEmitted) {
                  this._writableState.errorEmitted = true;
                  process.nextTick(emitErrorNT, this, err);
                }
              }

              return this;
            } // we set destroyed to true before firing error callbacks in order
            // to make it re-entrance safe in case destroy() is called within callbacks

            if (this._readableState) {
              this._readableState.destroyed = true;
            } // if this is a duplex stream mark the writable part as destroyed as well

            if (this._writableState) {
              this._writableState.destroyed = true;
            }

            this._destroy(err || null, function(err) {
              if (!cb && err) {
                if (!_this._writableState) {
                  process.nextTick(emitErrorAndCloseNT, _this, err);
                } else if (!_this._writableState.errorEmitted) {
                  _this._writableState.errorEmitted = true;
                  process.nextTick(emitErrorAndCloseNT, _this, err);
                } else {
                  process.nextTick(emitCloseNT, _this);
                }
              } else if (cb) {
                process.nextTick(emitCloseNT, _this);
                cb(err);
              } else {
                process.nextTick(emitCloseNT, _this);
              }
            });

            return this;
          }

          function emitErrorAndCloseNT(self, err) {
            emitErrorNT(self, err);
            emitCloseNT(self);
          }

          function emitCloseNT(self) {
            if (self._writableState && !self._writableState.emitClose) return;
            if (self._readableState && !self._readableState.emitClose) return;
            self.emit('close');
          }

          function undestroy() {
            if (this._readableState) {
              this._readableState.destroyed = false;
              this._readableState.reading = false;
              this._readableState.ended = false;
              this._readableState.endEmitted = false;
            }

            if (this._writableState) {
              this._writableState.destroyed = false;
              this._writableState.ended = false;
              this._writableState.ending = false;
              this._writableState.finalCalled = false;
              this._writableState.prefinished = false;
              this._writableState.finished = false;
              this._writableState.errorEmitted = false;
            }
          }

          function emitErrorNT(self, err) {
            self.emit('error', err);
          }

          function errorOrDestroy(stream, err) {
            // We have tests that rely on errors being emitted
            // in the same tick, so changing this is semver major.
            // For now when you opt-in to autoDestroy we allow
            // the error to be emitted nextTick. In a future
            // semver major update we should change the default to this.
            var rState = stream._readableState;
            var wState = stream._writableState;
            if (
              (rState && rState.autoDestroy) ||
              (wState && wState.autoDestroy)
            )
              stream.destroy(err);
            else stream.emit('error', err);
          }

          module.exports = {
            destroy: destroy,
            undestroy: undestroy,
            errorOrDestroy: errorOrDestroy
          };
          /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(5)));

        /***/
      },
      /* 19 */
      /***/ function(module, exports, __webpack_require__) {
        'use strict';

        var ERR_INVALID_OPT_VALUE = __webpack_require__(0).codes
          .ERR_INVALID_OPT_VALUE;

        function highWaterMarkFrom(options, isDuplex, duplexKey) {
          return options.highWaterMark != null
            ? options.highWaterMark
            : isDuplex
            ? options[duplexKey]
            : null;
        }

        function getHighWaterMark(state, options, duplexKey, isDuplex) {
          var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);

          if (hwm != null) {
            if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
              var name = isDuplex ? duplexKey : 'highWaterMark';
              throw new ERR_INVALID_OPT_VALUE(name, hwm);
            }

            return Math.floor(hwm);
          } // Default value

          return state.objectMode ? 16 : 16 * 1024;
        }

        module.exports = {
          getHighWaterMark: getHighWaterMark
        };

        /***/
      },
      /* 20 */
      /***/ function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(14).EventEmitter;

        /***/
      },
      /* 21 */
      /***/ function(module, exports, __webpack_require__) {
        'use strict';
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.

        /*<replacement>*/

        var Buffer = __webpack_require__(34).Buffer;
        /*</replacement>*/

        var isEncoding =
          Buffer.isEncoding ||
          function(encoding) {
            encoding = '' + encoding;
            switch (encoding && encoding.toLowerCase()) {
              case 'hex':
              case 'utf8':
              case 'utf-8':
              case 'ascii':
              case 'binary':
              case 'base64':
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
              case 'raw':
                return true;
              default:
                return false;
            }
          };

        function _normalizeEncoding(enc) {
          if (!enc) return 'utf8';
          var retried;
          while (true) {
            switch (enc) {
              case 'utf8':
              case 'utf-8':
                return 'utf8';
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return 'utf16le';
              case 'latin1':
              case 'binary':
                return 'latin1';
              case 'base64':
              case 'ascii':
              case 'hex':
                return enc;
              default:
                if (retried) return; // undefined
                enc = ('' + enc).toLowerCase();
                retried = true;
            }
          }
        }

        // Do not cache `Buffer.isEncoding` when checking encoding names as some
        // modules monkey-patch it to support additional encodings
        function normalizeEncoding(enc) {
          var nenc = _normalizeEncoding(enc);
          if (
            typeof nenc !== 'string' &&
            (Buffer.isEncoding === isEncoding || !isEncoding(enc))
          )
            throw new Error('Unknown encoding: ' + enc);
          return nenc || enc;
        }

        // StringDecoder provides an interface for efficiently splitting a series of
        // buffers into a series of JS strings without breaking apart multi-byte
        // characters.
        exports.StringDecoder = StringDecoder;
        function StringDecoder(encoding) {
          this.encoding = normalizeEncoding(encoding);
          var nb;
          switch (this.encoding) {
            case 'utf16le':
              this.text = utf16Text;
              this.end = utf16End;
              nb = 4;
              break;
            case 'utf8':
              this.fillLast = utf8FillLast;
              nb = 4;
              break;
            case 'base64':
              this.text = base64Text;
              this.end = base64End;
              nb = 3;
              break;
            default:
              this.write = simpleWrite;
              this.end = simpleEnd;
              return;
          }
          this.lastNeed = 0;
          this.lastTotal = 0;
          this.lastChar = Buffer.allocUnsafe(nb);
        }

        StringDecoder.prototype.write = function(buf) {
          if (buf.length === 0) return '';
          var r;
          var i;
          if (this.lastNeed) {
            r = this.fillLast(buf);
            if (r === undefined) return '';
            i = this.lastNeed;
            this.lastNeed = 0;
          } else {
            i = 0;
          }
          if (i < buf.length)
            return r ? r + this.text(buf, i) : this.text(buf, i);
          return r || '';
        };

        StringDecoder.prototype.end = utf8End;

        // Returns only complete characters in a Buffer
        StringDecoder.prototype.text = utf8Text;

        // Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
        StringDecoder.prototype.fillLast = function(buf) {
          if (this.lastNeed <= buf.length) {
            buf.copy(
              this.lastChar,
              this.lastTotal - this.lastNeed,
              0,
              this.lastNeed
            );
            return this.lastChar.toString(this.encoding, 0, this.lastTotal);
          }
          buf.copy(
            this.lastChar,
            this.lastTotal - this.lastNeed,
            0,
            buf.length
          );
          this.lastNeed -= buf.length;
        };

        // Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
        // continuation byte. If an invalid byte is detected, -2 is returned.
        function utf8CheckByte(byte) {
          if (byte <= 0x7f) return 0;
          else if (byte >> 5 === 0x06) return 2;
          else if (byte >> 4 === 0x0e) return 3;
          else if (byte >> 3 === 0x1e) return 4;
          return byte >> 6 === 0x02 ? -1 : -2;
        }

        // Checks at most 3 bytes at the end of a Buffer in order to detect an
        // incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
        // needed to complete the UTF-8 character (if applicable) are returned.
        function utf8CheckIncomplete(self, buf, i) {
          var j = buf.length - 1;
          if (j < i) return 0;
          var nb = utf8CheckByte(buf[j]);
          if (nb >= 0) {
            if (nb > 0) self.lastNeed = nb - 1;
            return nb;
          }
          if (--j < i || nb === -2) return 0;
          nb = utf8CheckByte(buf[j]);
          if (nb >= 0) {
            if (nb > 0) self.lastNeed = nb - 2;
            return nb;
          }
          if (--j < i || nb === -2) return 0;
          nb = utf8CheckByte(buf[j]);
          if (nb >= 0) {
            if (nb > 0) {
              if (nb === 2) nb = 0;
              else self.lastNeed = nb - 3;
            }
            return nb;
          }
          return 0;
        }

        // Validates as many continuation bytes for a multi-byte UTF-8 character as
        // needed or are available. If we see a non-continuation byte where we expect
        // one, we "replace" the validated continuation bytes we've seen so far with
        // a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
        // behavior. The continuation byte check is included three times in the case
        // where all of the continuation bytes for a character exist in the same buffer.
        // It is also done this way as a slight performance increase instead of using a
        // loop.
        function utf8CheckExtraBytes(self, buf, p) {
          if ((buf[0] & 0xc0) !== 0x80) {
            self.lastNeed = 0;
            return '\ufffd';
          }
          if (self.lastNeed > 1 && buf.length > 1) {
            if ((buf[1] & 0xc0) !== 0x80) {
              self.lastNeed = 1;
              return '\ufffd';
            }
            if (self.lastNeed > 2 && buf.length > 2) {
              if ((buf[2] & 0xc0) !== 0x80) {
                self.lastNeed = 2;
                return '\ufffd';
              }
            }
          }
        }

        // Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
        function utf8FillLast(buf) {
          var p = this.lastTotal - this.lastNeed;
          var r = utf8CheckExtraBytes(this, buf, p);
          if (r !== undefined) return r;
          if (this.lastNeed <= buf.length) {
            buf.copy(this.lastChar, p, 0, this.lastNeed);
            return this.lastChar.toString(this.encoding, 0, this.lastTotal);
          }
          buf.copy(this.lastChar, p, 0, buf.length);
          this.lastNeed -= buf.length;
        }

        // Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
        // partial character, the character's bytes are buffered until the required
        // number of bytes are available.
        function utf8Text(buf, i) {
          var total = utf8CheckIncomplete(this, buf, i);
          if (!this.lastNeed) return buf.toString('utf8', i);
          this.lastTotal = total;
          var end = buf.length - (total - this.lastNeed);
          buf.copy(this.lastChar, 0, end);
          return buf.toString('utf8', i, end);
        }

        // For UTF-8, a replacement character is added when ending on a partial
        // character.
        function utf8End(buf) {
          var r = buf && buf.length ? this.write(buf) : '';
          if (this.lastNeed) return r + '\ufffd';
          return r;
        }

        // UTF-16LE typically needs two bytes per character, but even if we have an even
        // number of bytes available, we need to check if we end on a leading/high
        // surrogate. In that case, we need to wait for the next two bytes in order to
        // decode the last character properly.
        function utf16Text(buf, i) {
          if ((buf.length - i) % 2 === 0) {
            var r = buf.toString('utf16le', i);
            if (r) {
              var c = r.charCodeAt(r.length - 1);
              if (c >= 0xd800 && c <= 0xdbff) {
                this.lastNeed = 2;
                this.lastTotal = 4;
                this.lastChar[0] = buf[buf.length - 2];
                this.lastChar[1] = buf[buf.length - 1];
                return r.slice(0, -1);
              }
            }
            return r;
          }
          this.lastNeed = 1;
          this.lastTotal = 2;
          this.lastChar[0] = buf[buf.length - 1];
          return buf.toString('utf16le', i, buf.length - 1);
        }

        // For UTF-16LE we do not explicitly append special replacement characters if we
        // end on a partial character, we simply let v8 handle that.
        function utf16End(buf) {
          var r = buf && buf.length ? this.write(buf) : '';
          if (this.lastNeed) {
            var end = this.lastTotal - this.lastNeed;
            return r + this.lastChar.toString('utf16le', 0, end);
          }
          return r;
        }

        function base64Text(buf, i) {
          var n = (buf.length - i) % 3;
          if (n === 0) return buf.toString('base64', i);
          this.lastNeed = 3 - n;
          this.lastTotal = 3;
          if (n === 1) {
            this.lastChar[0] = buf[buf.length - 1];
          } else {
            this.lastChar[0] = buf[buf.length - 2];
            this.lastChar[1] = buf[buf.length - 1];
          }
          return buf.toString('base64', i, buf.length - n);
        }

        function base64End(buf) {
          var r = buf && buf.length ? this.write(buf) : '';
          if (this.lastNeed)
            return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
          return r;
        }

        // Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
        function simpleWrite(buf) {
          return buf.toString(this.encoding);
        }

        function simpleEnd(buf) {
          return buf && buf.length ? this.write(buf) : '';
        }

        /***/
      },
      /* 22 */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict';
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__ = __webpack_require__(
          2
        );
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_readable_stream__ = __webpack_require__(
          10
        );
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_readable_stream___default = __webpack_require__.n(
          __WEBPACK_IMPORTED_MODULE_1_readable_stream__
        );
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__IRIs__ = __webpack_require__(
          7
        );
        // **N3Store** objects store N3 quads by graph in memory.

        // ## Constructor
        class N3Store {
          constructor(quads, options) {
            // The number of quads is initially zero
            this._size = 0;
            // `_graphs` contains subject, predicate, and object indexes per graph
            this._graphs = Object.create(null);
            // `_ids` maps entities such as `http://xmlns.com/foaf/0.1/name` to numbers,
            // saving memory by using only numbers as keys in `_graphs`
            this._id = 0;
            this._ids = Object.create(null);
            this._ids['><'] = 0; // dummy entry, so the first actual key is non-zero
            this._entities = Object.create(null); // inverse of `_ids`
            // `_blankNodeIndex` is the index of the last automatically named blank node
            this._blankNodeIndex = 0;

            // Shift parameters if `quads` is not given
            if (!options && quads && !quads[0])
              (options = quads), (quads = null);
            options = options || {};
            this._factory =
              options.factory ||
              __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['a' /* default */];

            // Add quads if passed
            if (quads) this.addQuads(quads);
          }

          // ## Public properties

          // ### `size` returns the number of quads in the store
          get size() {
            // Return the quad count if if was cached
            let size = this._size;
            if (size !== null) return size;

            // Calculate the number of quads by counting to the deepest level
            size = 0;
            const graphs = this._graphs;
            let subjects, subject;
            for (const graphKey in graphs)
              for (const subjectKey in (subjects = graphs[graphKey].subjects))
                for (const predicateKey in (subject = subjects[subjectKey]))
                  size += Object.keys(subject[predicateKey]).length;
            return (this._size = size);
          }

          // ## Private methods

          // ### `_addToIndex` adds a quad to a three-layered index.
          // Returns if the index has changed, if the entry did not already exist.
          _addToIndex(index0, key0, key1, key2) {
            // Create layers as necessary
            const index1 = index0[key0] || (index0[key0] = {});
            const index2 = index1[key1] || (index1[key1] = {});
            // Setting the key to _any_ value signals the presence of the quad
            const existed = key2 in index2;
            if (!existed) index2[key2] = null;
            return !existed;
          }

          // ### `_removeFromIndex` removes a quad from a three-layered index
          _removeFromIndex(index0, key0, key1, key2) {
            // Remove the quad from the index
            const index1 = index0[key0],
              index2 = index1[key1];
            delete index2[key2];

            // Remove intermediary index layers if they are empty
            for (const key in index2) return;
            delete index1[key1];
            for (const key in index1) return;
            delete index0[key0];
          }

          // ### `_findInIndex` finds a set of quads in a three-layered index.
          // The index base is `index0` and the keys at each level are `key0`, `key1`, and `key2`.
          // Any of these keys can be undefined, which is interpreted as a wildcard.
          // `name0`, `name1`, and `name2` are the names of the keys at each level,
          // used when reconstructing the resulting quad
          // (for instance: _subject_, _predicate_, and _object_).
          // Finally, `graph` will be the graph of the created quads.
          // If `callback` is given, each result is passed through it
          // and iteration halts when it returns truthy for any quad.
          // If instead `array` is given, each result is added to the array.
          _findInIndex(
            index0,
            key0,
            key1,
            key2,
            name0,
            name1,
            name2,
            graph,
            callback,
            array
          ) {
            let tmp, index1, index2;
            // Depending on the number of variables, keys or reverse index are faster
            const varCount = !key0 + !key1 + !key2,
              entityKeys =
                varCount > 1 ? Object.keys(this._ids) : this._entities;

            // If a key is specified, use only that part of index 0.
            if (key0) ((tmp = index0), (index0 = {}))[key0] = tmp[key0];
            for (const value0 in index0) {
              const entity0 = entityKeys[value0];

              if ((index1 = index0[value0])) {
                // If a key is specified, use only that part of index 1.
                if (key1) ((tmp = index1), (index1 = {}))[key1] = tmp[key1];
                for (const value1 in index1) {
                  const entity1 = entityKeys[value1];

                  if ((index2 = index1[value1])) {
                    // If a key is specified, use only that part of index 2, if it exists.
                    const values = key2
                      ? key2 in index2
                        ? [key2]
                        : []
                      : Object.keys(index2);
                    // Create quads for all items found in index 2.
                    for (let l = 0; l < values.length; l++) {
                      const parts = {
                        subject: null,
                        predicate: null,
                        object: null
                      };
                      parts[name0] = __webpack_require__.i(
                        __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__[
                          'j' /* termFromId */
                        ]
                      )(entity0, this._factory);
                      parts[name1] = __webpack_require__.i(
                        __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__[
                          'j' /* termFromId */
                        ]
                      )(entity1, this._factory);
                      parts[name2] = __webpack_require__.i(
                        __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__[
                          'j' /* termFromId */
                        ]
                      )(entityKeys[values[l]], this._factory);
                      const quad = this._factory.quad(
                        parts.subject,
                        parts.predicate,
                        parts.object,
                        __webpack_require__.i(
                          __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__[
                            'j' /* termFromId */
                          ]
                        )(graph, this._factory)
                      );
                      if (array) array.push(quad);
                      else if (callback(quad)) return true;
                    }
                  }
                }
              }
            }
            return array;
          }

          // ### `_loop` executes the callback on all keys of index 0
          _loop(index0, callback) {
            for (const key0 in index0) callback(key0);
          }

          // ### `_loopByKey0` executes the callback on all keys of a certain entry in index 0
          _loopByKey0(index0, key0, callback) {
            let index1, key1;
            if ((index1 = index0[key0])) {
              for (key1 in index1) callback(key1);
            }
          }

          // ### `_loopByKey1` executes the callback on given keys of all entries in index 0
          _loopByKey1(index0, key1, callback) {
            let key0, index1;
            for (key0 in index0) {
              index1 = index0[key0];
              if (index1[key1]) callback(key0);
            }
          }

          // ### `_loopBy2Keys` executes the callback on given keys of certain entries in index 2
          _loopBy2Keys(index0, key0, key1, callback) {
            let index1, index2, key2;
            if ((index1 = index0[key0]) && (index2 = index1[key1])) {
              for (key2 in index2) callback(key2);
            }
          }

          // ### `_countInIndex` counts matching quads in a three-layered index.
          // The index base is `index0` and the keys at each level are `key0`, `key1`, and `key2`.
          // Any of these keys can be undefined, which is interpreted as a wildcard.
          _countInIndex(index0, key0, key1, key2) {
            let count = 0,
              tmp,
              index1,
              index2;

            // If a key is specified, count only that part of index 0
            if (key0) ((tmp = index0), (index0 = {}))[key0] = tmp[key0];
            for (const value0 in index0) {
              if ((index1 = index0[value0])) {
                // If a key is specified, count only that part of index 1
                if (key1) ((tmp = index1), (index1 = {}))[key1] = tmp[key1];
                for (const value1 in index1) {
                  if ((index2 = index1[value1])) {
                    // If a key is specified, count the quad if it exists
                    if (key2) key2 in index2 && count++;
                    // Otherwise, count all quads
                    else count += Object.keys(index2).length;
                  }
                }
              }
            }
            return count;
          }

          // ### `_getGraphs` returns an array with the given graph,
          // or all graphs if the argument is null or undefined.
          _getGraphs(graph) {
            if (!isString(graph)) return this._graphs;
            const graphs = {};
            graphs[graph] = this._graphs[graph];
            return graphs;
          }

          // ### `_uniqueEntities` returns a function that accepts an entity ID
          // and passes the corresponding entity to callback if it hasn't occurred before.
          _uniqueEntities(callback) {
            const uniqueIds = Object.create(null);
            return id => {
              if (!(id in uniqueIds)) {
                uniqueIds[id] = true;
                callback(
                  __webpack_require__.i(
                    __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__[
                      'j' /* termFromId */
                    ]
                  )(this._entities[id], this._factory)
                );
              }
            };
          }

          // ## Public methods

          // ### `add` adds the specified quad to the dataset.
          // Returns the dataset instance it was called on.
          // Existing quads, as defined in Quad.equals, will be ignored.
          add(quad) {
            this.addQuad(quad);
            return this;
          }

          // ### `addQuad` adds a new quad to the store.
          // Returns if the quad index has changed, if the quad did not already exist.
          addQuad(subject, predicate, object, graph) {
            // Shift arguments if a quad object is given instead of components
            if (!predicate)
              (graph = subject.graph),
                (object = subject.object),
                (predicate = subject.predicate),
                (subject = subject.subject);

            // Convert terms to internal string representation
            subject = __webpack_require__.i(
              __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
            )(subject);
            predicate = __webpack_require__.i(
              __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
            )(predicate);
            object = __webpack_require__.i(
              __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
            )(object);
            graph = __webpack_require__.i(
              __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
            )(graph);

            // Find the graph that will contain the triple
            let graphItem = this._graphs[graph];
            // Create the graph if it doesn't exist yet
            if (!graphItem) {
              graphItem = this._graphs[graph] = {
                subjects: {},
                predicates: {},
                objects: {}
              };
              // Freezing a graph helps subsequent `add` performance,
              // and properties will never be modified anyway
              Object.freeze(graphItem);
            }

            // Since entities can often be long IRIs, we avoid storing them in every index.
            // Instead, we have a separate index that maps entities to numbers,
            // which are then used as keys in the other indexes.
            const ids = this._ids;
            const entities = this._entities;
            subject =
              ids[subject] ||
              (ids[(entities[++this._id] = subject)] = this._id);
            predicate =
              ids[predicate] ||
              (ids[(entities[++this._id] = predicate)] = this._id);
            object =
              ids[object] || (ids[(entities[++this._id] = object)] = this._id);

            const changed = this._addToIndex(
              graphItem.subjects,
              subject,
              predicate,
              object
            );
            this._addToIndex(graphItem.predicates, predicate, object, subject);
            this._addToIndex(graphItem.objects, object, subject, predicate);

            // The cached quad count is now invalid
            this._size = null;
            return changed;
          }

          // ### `addQuads` adds multiple quads to the store
          addQuads(quads) {
            for (let i = 0; i < quads.length; i++) this.addQuad(quads[i]);
          }

          // ### `delete` removes the specified quad from the dataset.
          // Returns the dataset instance it was called on.
          delete(quad) {
            this.removeQuad(quad);
            return this;
          }

          // ### `has` determines whether a dataset includes a certain quad.
          // Returns true or false as appropriate.
          has(quad) {
            const quads = this.getQuads(
              quad.subject,
              quad.predicate,
              quad.object,
              quad.graph
            );
            return quads.length !== 0;
          }

          // ### `import` adds a stream of quads to the store
          import(stream) {
            stream.on('data', quad => {
              this.addQuad(quad);
            });
            return stream;
          }

          // ### `removeQuad` removes a quad from the store if it exists
          removeQuad(subject, predicate, object, graph) {
            // Shift arguments if a quad object is given instead of components
            if (!predicate)
              (graph = subject.graph),
                (object = subject.object),
                (predicate = subject.predicate),
                (subject = subject.subject);

            // Convert terms to internal string representation
            subject = __webpack_require__.i(
              __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
            )(subject);
            predicate = __webpack_require__.i(
              __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
            )(predicate);
            object = __webpack_require__.i(
              __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
            )(object);
            graph = __webpack_require__.i(
              __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
            )(graph);

            // Find internal identifiers for all components
            // and verify the quad exists.
            const ids = this._ids,
              graphs = this._graphs;
            let graphItem, subjects, predicates;
            if (
              !(subject = ids[subject]) ||
              !(predicate = ids[predicate]) ||
              !(object = ids[object]) ||
              !(graphItem = graphs[graph]) ||
              !(subjects = graphItem.subjects[subject]) ||
              !(predicates = subjects[predicate]) ||
              !(object in predicates)
            )
              return false;

            // Remove it from all indexes
            this._removeFromIndex(
              graphItem.subjects,
              subject,
              predicate,
              object
            );
            this._removeFromIndex(
              graphItem.predicates,
              predicate,
              object,
              subject
            );
            this._removeFromIndex(
              graphItem.objects,
              object,
              subject,
              predicate
            );
            if (this._size !== null) this._size--;

            // Remove the graph if it is empty
            for (subject in graphItem.subjects) return true;
            delete graphs[graph];
            return true;
          }

          // ### `removeQuads` removes multiple quads from the store
          removeQuads(quads) {
            for (let i = 0; i < quads.length; i++) this.removeQuad(quads[i]);
          }

          // ### `remove` removes a stream of quads from the store
          remove(stream) {
            stream.on('data', quad => {
              this.removeQuad(quad);
            });
            return stream;
          }

          // ### `removeMatches` removes all matching quads from the store
          // Setting any field to `undefined` or `null` indicates a wildcard.
          removeMatches(subject, predicate, object, graph) {
            const stream = new __WEBPACK_IMPORTED_MODULE_1_readable_stream__[
              'Readable'
            ]({ objectMode: true });

            stream._read = () => {
              for (const quad of this.getQuads(
                subject,
                predicate,
                object,
                graph
              ))
                stream.push(quad);
              stream.push(null);
            };

            return this.remove(stream);
          }

          // ### `deleteGraph` removes all triples with the given graph from the store
          deleteGraph(graph) {
            return this.removeMatches(null, null, null, graph);
          }

          // ### `getQuads` returns an array of quads matching a pattern.
          // Setting any field to `undefined` or `null` indicates a wildcard.
          getQuads(subject, predicate, object, graph) {
            // Convert terms to internal string representation
            subject =
              subject &&
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
              )(subject);
            predicate =
              predicate &&
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
              )(predicate);
            object =
              object &&
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
              )(object);
            graph =
              graph &&
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
              )(graph);

            const quads = [],
              graphs = this._getGraphs(graph),
              ids = this._ids;
            let content, subjectId, predicateId, objectId;

            // Translate IRIs to internal index keys.
            if (
              (isString(subject) && !(subjectId = ids[subject])) ||
              (isString(predicate) && !(predicateId = ids[predicate])) ||
              (isString(object) && !(objectId = ids[object]))
            )
              return quads;

            for (const graphId in graphs) {
              // Only if the specified graph contains triples, there can be results
              if ((content = graphs[graphId])) {
                // Choose the optimal index, based on what fields are present
                if (subjectId) {
                  if (objectId)
                    // If subject and object are given, the object index will be the fastest
                    this._findInIndex(
                      content.objects,
                      objectId,
                      subjectId,
                      predicateId,
                      'object',
                      'subject',
                      'predicate',
                      graphId,
                      null,
                      quads
                    );
                  // If only subject and possibly predicate are given, the subject index will be the fastest
                  else
                    this._findInIndex(
                      content.subjects,
                      subjectId,
                      predicateId,
                      null,
                      'subject',
                      'predicate',
                      'object',
                      graphId,
                      null,
                      quads
                    );
                } else if (predicateId)
                  // If only predicate and possibly object are given, the predicate index will be the fastest
                  this._findInIndex(
                    content.predicates,
                    predicateId,
                    objectId,
                    null,
                    'predicate',
                    'object',
                    'subject',
                    graphId,
                    null,
                    quads
                  );
                else if (objectId)
                  // If only object is given, the object index will be the fastest
                  this._findInIndex(
                    content.objects,
                    objectId,
                    null,
                    null,
                    'object',
                    'subject',
                    'predicate',
                    graphId,
                    null,
                    quads
                  );
                // If nothing is given, iterate subjects and predicates first
                else
                  this._findInIndex(
                    content.subjects,
                    null,
                    null,
                    null,
                    'subject',
                    'predicate',
                    'object',
                    graphId,
                    null,
                    quads
                  );
              }
            }
            return quads;
          }

          // ### `match` returns a new dataset that is comprised of all quads in the current instance matching the given arguments.
          // The logic described in Quad Matching is applied for each quad in this dataset to check if it should be included in the output dataset.
          // Note: This method always returns a new DatasetCore, even if that dataset contains no quads.
          // Note: Since a DatasetCore is an unordered set, the order of the quads within the returned sequence is arbitrary.
          // Setting any field to `undefined` or `null` indicates a wildcard.
          // For backwards compatibility, the object return also implements the Readable stream interface.
          match(subject, predicate, object, graph) {
            return new DatasetCoreAndReadableStream(
              this,
              subject,
              predicate,
              object,
              graph
            );
          }

          // ### `countQuads` returns the number of quads matching a pattern.
          // Setting any field to `undefined` or `null` indicates a wildcard.
          countQuads(subject, predicate, object, graph) {
            // Convert terms to internal string representation
            subject =
              subject &&
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
              )(subject);
            predicate =
              predicate &&
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
              )(predicate);
            object =
              object &&
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
              )(object);
            graph =
              graph &&
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
              )(graph);

            const graphs = this._getGraphs(graph),
              ids = this._ids;
            let count = 0,
              content,
              subjectId,
              predicateId,
              objectId;

            // Translate IRIs to internal index keys.
            if (
              (isString(subject) && !(subjectId = ids[subject])) ||
              (isString(predicate) && !(predicateId = ids[predicate])) ||
              (isString(object) && !(objectId = ids[object]))
            )
              return 0;

            for (const graphId in graphs) {
              // Only if the specified graph contains triples, there can be results
              if ((content = graphs[graphId])) {
                // Choose the optimal index, based on what fields are present
                if (subject) {
                  if (object)
                    // If subject and object are given, the object index will be the fastest
                    count += this._countInIndex(
                      content.objects,
                      objectId,
                      subjectId,
                      predicateId
                    );
                  // If only subject and possibly predicate are given, the subject index will be the fastest
                  else
                    count += this._countInIndex(
                      content.subjects,
                      subjectId,
                      predicateId,
                      objectId
                    );
                } else if (predicate) {
                  // If only predicate and possibly object are given, the predicate index will be the fastest
                  count += this._countInIndex(
                    content.predicates,
                    predicateId,
                    objectId,
                    subjectId
                  );
                } else {
                  // If only object is possibly given, the object index will be the fastest
                  count += this._countInIndex(
                    content.objects,
                    objectId,
                    subjectId,
                    predicateId
                  );
                }
              }
            }
            return count;
          }

          // ### `forEach` executes the callback on all quads.
          // Setting any field to `undefined` or `null` indicates a wildcard.
          forEach(callback, subject, predicate, object, graph) {
            this.some(
              quad => {
                callback(quad);
                return false;
              },
              subject,
              predicate,
              object,
              graph
            );
          }

          // ### `every` executes the callback on all quads,
          // and returns `true` if it returns truthy for all them.
          // Setting any field to `undefined` or `null` indicates a wildcard.
          every(callback, subject, predicate, object, graph) {
            let some = false;
            const every = !this.some(
              quad => {
                some = true;
                return !callback(quad);
              },
              subject,
              predicate,
              object,
              graph
            );
            return some && every;
          }

          // ### `some` executes the callback on all quads,
          // and returns `true` if it returns truthy for any of them.
          // Setting any field to `undefined` or `null` indicates a wildcard.
          some(callback, subject, predicate, object, graph) {
            // Convert terms to internal string representation
            subject =
              subject &&
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
              )(subject);
            predicate =
              predicate &&
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
              )(predicate);
            object =
              object &&
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
              )(object);
            graph =
              graph &&
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
              )(graph);

            const graphs = this._getGraphs(graph),
              ids = this._ids;
            let content, subjectId, predicateId, objectId;

            // Translate IRIs to internal index keys.
            if (
              (isString(subject) && !(subjectId = ids[subject])) ||
              (isString(predicate) && !(predicateId = ids[predicate])) ||
              (isString(object) && !(objectId = ids[object]))
            )
              return false;

            for (const graphId in graphs) {
              // Only if the specified graph contains triples, there can be results
              if ((content = graphs[graphId])) {
                // Choose the optimal index, based on what fields are present
                if (subjectId) {
                  if (objectId) {
                    // If subject and object are given, the object index will be the fastest
                    if (
                      this._findInIndex(
                        content.objects,
                        objectId,
                        subjectId,
                        predicateId,
                        'object',
                        'subject',
                        'predicate',
                        graphId,
                        callback,
                        null
                      )
                    )
                      return true;
                  }
                  // If only subject and possibly predicate are given, the subject index will be the fastest
                  else if (
                    this._findInIndex(
                      content.subjects,
                      subjectId,
                      predicateId,
                      null,
                      'subject',
                      'predicate',
                      'object',
                      graphId,
                      callback,
                      null
                    )
                  )
                    return true;
                } else if (predicateId) {
                  // If only predicate and possibly object are given, the predicate index will be the fastest
                  if (
                    this._findInIndex(
                      content.predicates,
                      predicateId,
                      objectId,
                      null,
                      'predicate',
                      'object',
                      'subject',
                      graphId,
                      callback,
                      null
                    )
                  ) {
                    return true;
                  }
                } else if (objectId) {
                  // If only object is given, the object index will be the fastest
                  if (
                    this._findInIndex(
                      content.objects,
                      objectId,
                      null,
                      null,
                      'object',
                      'subject',
                      'predicate',
                      graphId,
                      callback,
                      null
                    )
                  ) {
                    return true;
                  }
                }
                // If nothing is given, iterate subjects and predicates first
                else if (
                  this._findInIndex(
                    content.subjects,
                    null,
                    null,
                    null,
                    'subject',
                    'predicate',
                    'object',
                    graphId,
                    callback,
                    null
                  )
                ) {
                  return true;
                }
              }
            }
            return false;
          }

          // ### `getSubjects` returns all subjects that match the pattern.
          // Setting any field to `undefined` or `null` indicates a wildcard.
          getSubjects(predicate, object, graph) {
            const results = [];
            this.forSubjects(
              s => {
                results.push(s);
              },
              predicate,
              object,
              graph
            );
            return results;
          }

          // ### `forSubjects` executes the callback on all subjects that match the pattern.
          // Setting any field to `undefined` or `null` indicates a wildcard.
          forSubjects(callback, predicate, object, graph) {
            // Convert terms to internal string representation
            predicate =
              predicate &&
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
              )(predicate);
            object =
              object &&
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
              )(object);
            graph =
              graph &&
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
              )(graph);

            const ids = this._ids,
              graphs = this._getGraphs(graph);
            let content, predicateId, objectId;
            callback = this._uniqueEntities(callback);

            // Translate IRIs to internal index keys.
            if (
              (isString(predicate) && !(predicateId = ids[predicate])) ||
              (isString(object) && !(objectId = ids[object]))
            )
              return;

            for (graph in graphs) {
              // Only if the specified graph contains triples, there can be results
              if ((content = graphs[graph])) {
                // Choose optimal index based on which fields are wildcards
                if (predicateId) {
                  if (objectId)
                    // If predicate and object are given, the POS index is best.
                    this._loopBy2Keys(
                      content.predicates,
                      predicateId,
                      objectId,
                      callback
                    );
                  // If only predicate is given, the SPO index is best.
                  else
                    this._loopByKey1(content.subjects, predicateId, callback);
                } else if (objectId)
                  // If only object is given, the OSP index is best.
                  this._loopByKey0(content.objects, objectId, callback);
                // If no params given, iterate all the subjects
                else this._loop(content.subjects, callback);
              }
            }
          }

          // ### `getPredicates` returns all predicates that match the pattern.
          // Setting any field to `undefined` or `null` indicates a wildcard.
          getPredicates(subject, object, graph) {
            const results = [];
            this.forPredicates(
              p => {
                results.push(p);
              },
              subject,
              object,
              graph
            );
            return results;
          }

          // ### `forPredicates` executes the callback on all predicates that match the pattern.
          // Setting any field to `undefined` or `null` indicates a wildcard.
          forPredicates(callback, subject, object, graph) {
            // Convert terms to internal string representation
            subject =
              subject &&
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
              )(subject);
            object =
              object &&
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
              )(object);
            graph =
              graph &&
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
              )(graph);

            const ids = this._ids,
              graphs = this._getGraphs(graph);
            let content, subjectId, objectId;
            callback = this._uniqueEntities(callback);

            // Translate IRIs to internal index keys.
            if (
              (isString(subject) && !(subjectId = ids[subject])) ||
              (isString(object) && !(objectId = ids[object]))
            )
              return;

            for (graph in graphs) {
              // Only if the specified graph contains triples, there can be results
              if ((content = graphs[graph])) {
                // Choose optimal index based on which fields are wildcards
                if (subjectId) {
                  if (objectId)
                    // If subject and object are given, the OSP index is best.
                    this._loopBy2Keys(
                      content.objects,
                      objectId,
                      subjectId,
                      callback
                    );
                  // If only subject is given, the SPO index is best.
                  else this._loopByKey0(content.subjects, subjectId, callback);
                } else if (objectId)
                  // If only object is given, the POS index is best.
                  this._loopByKey1(content.predicates, objectId, callback);
                // If no params given, iterate all the predicates.
                else this._loop(content.predicates, callback);
              }
            }
          }

          // ### `getObjects` returns all objects that match the pattern.
          // Setting any field to `undefined` or `null` indicates a wildcard.
          getObjects(subject, predicate, graph) {
            const results = [];
            this.forObjects(
              o => {
                results.push(o);
              },
              subject,
              predicate,
              graph
            );
            return results;
          }

          // ### `forObjects` executes the callback on all objects that match the pattern.
          // Setting any field to `undefined` or `null` indicates a wildcard.
          forObjects(callback, subject, predicate, graph) {
            // Convert terms to internal string representation
            subject =
              subject &&
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
              )(subject);
            predicate =
              predicate &&
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
              )(predicate);
            graph =
              graph &&
              __webpack_require__.i(
                __WEBPACK_IMPORTED_MODULE_0__N3DataFactory__['k' /* termToId */]
              )(graph);

            const ids = this._ids,
              graphs = this._getGraphs(graph);
            let content, subjectId, predicateId;
            callback = this._uniqueEntities(callback);

            // Translate IRIs to internal index keys.
            if (
              (isString(subject) && !(subjectId = ids[subject])) ||
              (isString(predicate) && !(predicateId = ids[predicate]))
            )
              return;

            for (graph in graphs) {
              // Only if the specified graph contains triples, there can be results
              if ((content = graphs[graph])) {
                // Choose optimal index based on which fields are wildcards
                if (subjectId) {
                  if (predicateId)
                    // If subject and predicate are given, the SPO index is best.
                    this._loopBy2Keys(
                      content.subjects,
                      subjectId,
                      predicateId,
                      callback
                    );
                  // If only subject is given, the OSP index is best.
                  else this._loopByKey1(content.objects, subjectId, callback);
                } else if (predicateId)
                  // If only predicate is given, the POS index is best.
                  this._loopByKey0(content.predicates, predicateId, callback);
                // If no params given, iterate all the objects.
                else this._loop(content.objects, callback);
              }
            }
          }

          // ### `getGraphs` returns all graphs that match the pattern.
          // Setting any field to `undefined` or `null` indicates a wildcard.
          getGraphs(subject, predicate, object) {
            const results = [];
            this.forGraphs(
              g => {
                results.push(g);
              },
              subject,
              predicate,
              object
            );
            return results;
          }

          // ### `forGraphs` executes the callback on all graphs that match the pattern.
          // Setting any field to `undefined` or `null` indicates a wildcard.
          forGraphs(callback, subject, predicate, object) {
            for (const graph in this._graphs) {
              this.some(
                quad => {
                  callback(quad.graph);
                  return true; // Halt iteration of some()
                },
                subject,
                predicate,
                object,
                graph
              );
            }
          }

          // ### `createBlankNode` creates a new blank node, returning its name
          createBlankNode(suggestedName) {
            let name, index;
            // Generate a name based on the suggested name
            if (suggestedName) {
              (name = suggestedName = `_:${suggestedName}`), (index = 1);
              while (this._ids[name]) name = suggestedName + index++;
            }
            // Generate a generic blank node name
            else {
              do {
                name = `_:b${this._blankNodeIndex++}`;
              } while (this._ids[name]);
            }
            // Add the blank node to the entities, avoiding the generation of duplicates
            this._ids[name] = ++this._id;
            this._entities[this._id] = name;
            return this._factory.blankNode(name.substr(2));
          }

          // ### `extractLists` finds and removes all list triples
          // and returns the items per list.
          extractLists({ remove = false, ignoreErrors = false } = {}) {
            const lists = {}; // has scalar keys so could be a simple Object
            const onError = ignoreErrors
              ? () => true
              : (node, message) => {
                  throw new Error(`${node.value} ${message}`);
                };

            // Traverse each list from its tail
            const tails = this.getQuads(
              null,
              __WEBPACK_IMPORTED_MODULE_2__IRIs__['a' /* default */].rdf.rest,
              __WEBPACK_IMPORTED_MODULE_2__IRIs__['a' /* default */].rdf.nil,
              null
            );
            const toRemove = remove ? [...tails] : [];
            tails.forEach(tailQuad => {
              const items = []; // the members found as objects of rdf:first quads
              let malformed = false; // signals whether the current list is malformed
              let head; // the head of the list (_:b1 in above example)
              let headPos; // set to subject or object when head is set
              const graph = tailQuad.graph; // make sure list is in exactly one graph

              // Traverse the list from tail to end
              let current = tailQuad.subject;
              while (current && !malformed) {
                const objectQuads = this.getQuads(null, null, current, null);
                const subjectQuads = this.getQuads(current, null, null, null);
                let quad,
                  first = null,
                  rest = null,
                  parent = null;

                // Find the first and rest of this list node
                for (let i = 0; i < subjectQuads.length && !malformed; i++) {
                  quad = subjectQuads[i];
                  if (!quad.graph.equals(graph))
                    malformed = onError(
                      current,
                      'not confined to single graph'
                    );
                  else if (head)
                    malformed = onError(current, 'has non-list arcs out');
                  // one rdf:first
                  else if (
                    quad.predicate.value ===
                    __WEBPACK_IMPORTED_MODULE_2__IRIs__['a' /* default */].rdf
                      .first
                  ) {
                    if (first)
                      malformed = onError(
                        current,
                        'has multiple rdf:first arcs'
                      );
                    else toRemove.push((first = quad));
                  }

                  // one rdf:rest
                  else if (
                    quad.predicate.value ===
                    __WEBPACK_IMPORTED_MODULE_2__IRIs__['a' /* default */].rdf
                      .rest
                  ) {
                    if (rest)
                      malformed = onError(
                        current,
                        'has multiple rdf:rest arcs'
                      );
                    else toRemove.push((rest = quad));
                  }

                  // alien triple
                  else if (objectQuads.length)
                    malformed = onError(current, "can't be subject and object");
                  else {
                    head = quad; // e.g. { (1 2 3) :p :o }
                    headPos = 'subject';
                  }
                }

                // { :s :p (1 2) } arrives here with no head
                // { (1 2) :p :o } arrives here with head set to the list.
                for (let i = 0; i < objectQuads.length && !malformed; ++i) {
                  quad = objectQuads[i];
                  if (head)
                    malformed = onError(current, "can't have coreferences");
                  // one rdf:rest
                  else if (
                    quad.predicate.value ===
                    __WEBPACK_IMPORTED_MODULE_2__IRIs__['a' /* default */].rdf
                      .rest
                  ) {
                    if (parent)
                      malformed = onError(
                        current,
                        'has incoming rdf:rest arcs'
                      );
                    else parent = quad;
                  } else {
                    head = quad; // e.g. { :s :p (1 2) }
                    headPos = 'object';
                  }
                }

                // Store the list item and continue with parent
                if (!first) malformed = onError(current, 'has no list head');
                else items.unshift(first.object);
                current = parent && parent.subject;
              }

              // Don't remove any quads if the list is malformed
              if (malformed) remove = false;
              // Store the list under the value of its head
              else if (head) lists[head[headPos].value] = items;
            });

            // Remove list quads if requested
            if (remove) this.removeQuads(toRemove);
            return lists;
          }

          // ### Store is an iterable.
          // Can be used where iterables are expected: for...of loops, array spread operator,
          // `yield*`, and destructuring assignment (order is not guaranteed).
          *[Symbol.iterator]() {
            yield* this.getQuads();
          }
        }
        /* harmony export (immutable) */ __webpack_exports__['a'] = N3Store;

        // Determines whether the argument is a string
        function isString(s) {
          return typeof s === 'string' || s instanceof String;
        }

        /**
         * A class that implements both DatasetCore and Readable.
         */
        class DatasetCoreAndReadableStream extends __WEBPACK_IMPORTED_MODULE_1_readable_stream__[
          'Readable'
        ] {
          constructor(n3Store, subject, predicate, object, graph) {
            super({ objectMode: true });
            Object.assign(this, { n3Store, subject, predicate, object, graph });
          }

          get filtered() {
            if (!this._filtered) {
              const { n3Store, graph, object, predicate, subject } = this;
              const quads = n3Store.getQuads(subject, predicate, object, graph);
              this._filtered = new N3Store(quads, {
                factory: n3Store._factory
              });
            }
            return this._filtered;
          }
          get size() {
            return this.filtered.size;
          }

          _read() {
            for (const quad of this.filtered.getQuads()) this.push(quad);
            this.push(null);
          }

          add(quad) {
            return this.filtered.add(quad);
          }

          delete(quad) {
            return this.filtered.delete(quad);
          }

          has(quad) {
            return this.filtered.has(quad);
          }

          match(subject, predicate, object, graph) {
            return new DatasetCoreAndReadableStream(
              this.filtered,
              subject,
              predicate,
              object,
              graph
            );
          }

          *[Symbol.iterator]() {
            yield* this.filtered.getQuads();
          }
        }

        /***/
      },
      /* 23 */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict';
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__N3Parser__ = __webpack_require__(
          12
        );
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_readable_stream__ = __webpack_require__(
          10
        );
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_readable_stream___default = __webpack_require__.n(
          __WEBPACK_IMPORTED_MODULE_1_readable_stream__
        );
        // **N3StreamParser** parses a text stream into a quad stream.

        // ## Constructor
        class N3StreamParser extends __WEBPACK_IMPORTED_MODULE_1_readable_stream__[
          'Transform'
        ] {
          constructor(options) {
            super({ decodeStrings: true });
            this._readableState.objectMode = true;

            // Set up parser with dummy stream to obtain `data` and `end` callbacks
            const parser = new __WEBPACK_IMPORTED_MODULE_0__N3Parser__[
              'a' /* default */
            ](options);
            let onData, onEnd;
            parser.parse(
              {
                on: (event, callback) => {
                  switch (event) {
                    case 'data':
                      onData = callback;
                      break;
                    case 'end':
                      onEnd = callback;
                      break;
                  }
                }
              },
              // Handle quads by pushing them down the pipeline
              (error, quad) => {
                (error && this.emit('error', error)) ||
                  (quad && this.push(quad));
              },
              // Emit prefixes through the `prefix` event
              (prefix, uri) => {
                this.emit('prefix', prefix, uri);
              }
            );

            // Implement Transform methods through parser callbacks
            this._transform = (chunk, encoding, done) => {
              onData(chunk);
              done();
            };
            this._flush = done => {
              onEnd();
              done();
            };
          }

          // ### Parses a stream of strings
          import(stream) {
            stream.on('data', chunk => {
              this.write(chunk);
            });
            stream.on('end', () => {
              this.end();
            });
            stream.on('error', error => {
              this.emit('error', error);
            });
            return this;
          }
        }
        /* harmony export (immutable) */ __webpack_exports__[
          'a'
        ] = N3StreamParser;

        /***/
      },
      /* 24 */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict';
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_readable_stream__ = __webpack_require__(
          10
        );
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_readable_stream___default = __webpack_require__.n(
          __WEBPACK_IMPORTED_MODULE_0_readable_stream__
        );
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__N3Writer__ = __webpack_require__(
          13
        );
        // **N3StreamWriter** serializes a quad stream into a text stream.

        // ## Constructor
        class N3StreamWriter extends __WEBPACK_IMPORTED_MODULE_0_readable_stream__[
          'Transform'
        ] {
          constructor(options) {
            super({ encoding: 'utf8', writableObjectMode: true });

            // Set up writer with a dummy stream object
            const writer = (this._writer = new __WEBPACK_IMPORTED_MODULE_1__N3Writer__[
              'a' /* default */
            ](
              {
                write: (quad, encoding, callback) => {
                  this.push(quad);
                  callback && callback();
                },
                end: callback => {
                  this.push(null);
                  callback && callback();
                }
              },
              options
            ));

            // Implement Transform methods on top of writer
            this._transform = (quad, encoding, done) => {
              writer.addQuad(quad, done);
            };
            this._flush = done => {
              writer.end(done);
            };
          }

          // ### Serializes a stream of quads
          import(stream) {
            stream.on('data', quad => {
              this.write(quad);
            });
            stream.on('end', () => {
              this.end();
            });
            stream.on('error', error => {
              this.emit('error', error);
            });
            stream.on('prefix', (prefix, iri) => {
              this._writer.addPrefix(prefix, iri);
            });
            return this;
          }
        }
        /* harmony export (immutable) */ __webpack_exports__[
          'a'
        ] = N3StreamWriter;

        /***/
      },
      /* 25 */
      /***/ function(module, exports, __webpack_require__) {
        'use strict';

        exports.byteLength = byteLength;
        exports.toByteArray = toByteArray;
        exports.fromByteArray = fromByteArray;

        var lookup = [];
        var revLookup = [];
        var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

        var code =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        for (var i = 0, len = code.length; i < len; ++i) {
          lookup[i] = code[i];
          revLookup[code.charCodeAt(i)] = i;
        }

        // Support decoding URL-safe base64 strings, as Node.js does.
        // See: https://en.wikipedia.org/wiki/Base64#URL_applications
        revLookup['-'.charCodeAt(0)] = 62;
        revLookup['_'.charCodeAt(0)] = 63;

        function getLens(b64) {
          var len = b64.length;

          if (len % 4 > 0) {
            throw new Error('Invalid string. Length must be a multiple of 4');
          }

          // Trim off extra bytes after placeholder bytes are found
          // See: https://github.com/beatgammit/base64-js/issues/42
          var validLen = b64.indexOf('=');
          if (validLen === -1) validLen = len;

          var placeHoldersLen = validLen === len ? 0 : 4 - (validLen % 4);

          return [validLen, placeHoldersLen];
        }

        // base64 is 4/3 + up to two characters of the original data
        function byteLength(b64) {
          var lens = getLens(b64);
          var validLen = lens[0];
          var placeHoldersLen = lens[1];
          return ((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen;
        }

        function _byteLength(b64, validLen, placeHoldersLen) {
          return ((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen;
        }

        function toByteArray(b64) {
          var tmp;
          var lens = getLens(b64);
          var validLen = lens[0];
          var placeHoldersLen = lens[1];

          var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));

          var curByte = 0;

          // if there are placeholders, only get up to the last complete 4 chars
          var len = placeHoldersLen > 0 ? validLen - 4 : validLen;

          var i;
          for (i = 0; i < len; i += 4) {
            tmp =
              (revLookup[b64.charCodeAt(i)] << 18) |
              (revLookup[b64.charCodeAt(i + 1)] << 12) |
              (revLookup[b64.charCodeAt(i + 2)] << 6) |
              revLookup[b64.charCodeAt(i + 3)];
            arr[curByte++] = (tmp >> 16) & 0xff;
            arr[curByte++] = (tmp >> 8) & 0xff;
            arr[curByte++] = tmp & 0xff;
          }

          if (placeHoldersLen === 2) {
            tmp =
              (revLookup[b64.charCodeAt(i)] << 2) |
              (revLookup[b64.charCodeAt(i + 1)] >> 4);
            arr[curByte++] = tmp & 0xff;
          }

          if (placeHoldersLen === 1) {
            tmp =
              (revLookup[b64.charCodeAt(i)] << 10) |
              (revLookup[b64.charCodeAt(i + 1)] << 4) |
              (revLookup[b64.charCodeAt(i + 2)] >> 2);
            arr[curByte++] = (tmp >> 8) & 0xff;
            arr[curByte++] = tmp & 0xff;
          }

          return arr;
        }

        function tripletToBase64(num) {
          return (
            lookup[(num >> 18) & 0x3f] +
            lookup[(num >> 12) & 0x3f] +
            lookup[(num >> 6) & 0x3f] +
            lookup[num & 0x3f]
          );
        }

        function encodeChunk(uint8, start, end) {
          var tmp;
          var output = [];
          for (var i = start; i < end; i += 3) {
            tmp =
              ((uint8[i] << 16) & 0xff0000) +
              ((uint8[i + 1] << 8) & 0xff00) +
              (uint8[i + 2] & 0xff);
            output.push(tripletToBase64(tmp));
          }
          return output.join('');
        }

        function fromByteArray(uint8) {
          var tmp;
          var len = uint8.length;
          var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
          var parts = [];
          var maxChunkLength = 16383; // must be multiple of 3

          // go through the array every three bytes, we'll deal with trailing stuff later
          for (
            var i = 0, len2 = len - extraBytes;
            i < len2;
            i += maxChunkLength
          ) {
            parts.push(
              encodeChunk(
                uint8,
                i,
                i + maxChunkLength > len2 ? len2 : i + maxChunkLength
              )
            );
          }

          // pad the end with zeros, but make sure to not forget the extra bytes
          if (extraBytes === 1) {
            tmp = uint8[len - 1];
            parts.push(lookup[tmp >> 2] + lookup[(tmp << 4) & 0x3f] + '==');
          } else if (extraBytes === 2) {
            tmp = (uint8[len - 2] << 8) + uint8[len - 1];
            parts.push(
              lookup[tmp >> 10] +
                lookup[(tmp >> 4) & 0x3f] +
                lookup[(tmp << 2) & 0x3f] +
                '='
            );
          }

          return parts.join('');
        }

        /***/
      },
      /* 26 */
      /***/ function(module, exports) {
        /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
        exports.read = function(buffer, offset, isLE, mLen, nBytes) {
          var e, m;
          var eLen = nBytes * 8 - mLen - 1;
          var eMax = (1 << eLen) - 1;
          var eBias = eMax >> 1;
          var nBits = -7;
          var i = isLE ? nBytes - 1 : 0;
          var d = isLE ? -1 : 1;
          var s = buffer[offset + i];

          i += d;

          e = s & ((1 << -nBits) - 1);
          s >>= -nBits;
          nBits += eLen;
          for (
            ;
            nBits > 0;
            e = e * 256 + buffer[offset + i], i += d, nBits -= 8
          ) {}

          m = e & ((1 << -nBits) - 1);
          e >>= -nBits;
          nBits += mLen;
          for (
            ;
            nBits > 0;
            m = m * 256 + buffer[offset + i], i += d, nBits -= 8
          ) {}

          if (e === 0) {
            e = 1 - eBias;
          } else if (e === eMax) {
            return m ? NaN : (s ? -1 : 1) * Infinity;
          } else {
            m = m + Math.pow(2, mLen);
            e = e - eBias;
          }
          return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
        };

        exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
          var e, m, c;
          var eLen = nBytes * 8 - mLen - 1;
          var eMax = (1 << eLen) - 1;
          var eBias = eMax >> 1;
          var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
          var i = isLE ? 0 : nBytes - 1;
          var d = isLE ? 1 : -1;
          var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

          value = Math.abs(value);

          if (isNaN(value) || value === Infinity) {
            m = isNaN(value) ? 1 : 0;
            e = eMax;
          } else {
            e = Math.floor(Math.log(value) / Math.LN2);
            if (value * (c = Math.pow(2, -e)) < 1) {
              e--;
              c *= 2;
            }
            if (e + eBias >= 1) {
              value += rt / c;
            } else {
              value += rt * Math.pow(2, 1 - eBias);
            }
            if (value * c >= 2) {
              e++;
              c /= 2;
            }

            if (e + eBias >= eMax) {
              m = 0;
              e = eMax;
            } else if (e + eBias >= 1) {
              m = (value * c - 1) * Math.pow(2, mLen);
              e = e + eBias;
            } else {
              m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
              e = 0;
            }
          }

          for (
            ;
            mLen >= 8;
            buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8
          ) {}

          e = (e << mLen) | m;
          eLen += mLen;
          for (
            ;
            eLen > 0;
            buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8
          ) {}

          buffer[offset + i - d] |= s * 128;
        };

        /***/
      },
      /* 27 */
      /***/ function(module, exports) {
        var toString = {}.toString;

        module.exports =
          Array.isArray ||
          function(arr) {
            return toString.call(arr) == '[object Array]';
          };

        /***/
      },
      /* 28 */
      /***/ function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */ (function(global) {
          /*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
          let promise;

          module.exports =
            typeof queueMicrotask === 'function'
              ? queueMicrotask.bind(
                  typeof window !== 'undefined' ? window : global
                )
              : // reuse resolved promise, and allocate it lazily
                cb =>
                  (promise || (promise = Promise.resolve()))
                    .then(cb)
                    .catch(err =>
                      setTimeout(() => {
                        throw err;
                      }, 0)
                    );

          /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(6)));

        /***/
      },
      /* 29 */
      /***/ function(module, exports, __webpack_require__) {
        'use strict';
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.
        // a passthrough stream.
        // basically just the most minimal sort of Transform stream.
        // Every written chunk gets output as-is.

        module.exports = PassThrough;

        var Transform = __webpack_require__(16);

        __webpack_require__(4)(PassThrough, Transform);

        function PassThrough(options) {
          if (!(this instanceof PassThrough)) return new PassThrough(options);
          Transform.call(this, options);
        }

        PassThrough.prototype._transform = function(chunk, encoding, cb) {
          cb(null, chunk);
        };

        /***/
      },
      /* 30 */
      /***/ function(module, exports, __webpack_require__) {
        'use strict';
        /* WEBPACK VAR INJECTION */ (function(process) {
          var _Object$setPrototypeO;

          function _defineProperty(obj, key, value) {
            if (key in obj) {
              Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
              });
            } else {
              obj[key] = value;
            }
            return obj;
          }

          var finished = __webpack_require__(9);

          var kLastResolve = Symbol('lastResolve');
          var kLastReject = Symbol('lastReject');
          var kError = Symbol('error');
          var kEnded = Symbol('ended');
          var kLastPromise = Symbol('lastPromise');
          var kHandlePromise = Symbol('handlePromise');
          var kStream = Symbol('stream');

          function createIterResult(value, done) {
            return {
              value: value,
              done: done
            };
          }

          function readAndResolve(iter) {
            var resolve = iter[kLastResolve];

            if (resolve !== null) {
              var data = iter[kStream].read(); // we defer if data is null
              // we can be expecting either 'end' or
              // 'error'

              if (data !== null) {
                iter[kLastPromise] = null;
                iter[kLastResolve] = null;
                iter[kLastReject] = null;
                resolve(createIterResult(data, false));
              }
            }
          }

          function onReadable(iter) {
            // we wait for the next tick, because it might
            // emit an error with process.nextTick
            process.nextTick(readAndResolve, iter);
          }

          function wrapForNext(lastPromise, iter) {
            return function(resolve, reject) {
              lastPromise.then(function() {
                if (iter[kEnded]) {
                  resolve(createIterResult(undefined, true));
                  return;
                }

                iter[kHandlePromise](resolve, reject);
              }, reject);
            };
          }

          var AsyncIteratorPrototype = Object.getPrototypeOf(function() {});
          var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf(
            ((_Object$setPrototypeO = {
              get stream() {
                return this[kStream];
              },

              next: function next() {
                var _this = this;

                // if we have detected an error in the meanwhile
                // reject straight away
                var error = this[kError];

                if (error !== null) {
                  return Promise.reject(error);
                }

                if (this[kEnded]) {
                  return Promise.resolve(createIterResult(undefined, true));
                }

                if (this[kStream].destroyed) {
                  // We need to defer via nextTick because if .destroy(err) is
                  // called, the error will be emitted via nextTick, and
                  // we cannot guarantee that there is no error lingering around
                  // waiting to be emitted.
                  return new Promise(function(resolve, reject) {
                    process.nextTick(function() {
                      if (_this[kError]) {
                        reject(_this[kError]);
                      } else {
                        resolve(createIterResult(undefined, true));
                      }
                    });
                  });
                } // if we have multiple next() calls
                // we will wait for the previous Promise to finish
                // this logic is optimized to support for await loops,
                // where next() is only called once at a time

                var lastPromise = this[kLastPromise];
                var promise;

                if (lastPromise) {
                  promise = new Promise(wrapForNext(lastPromise, this));
                } else {
                  // fast path needed to support multiple this.push()
                  // without triggering the next() queue
                  var data = this[kStream].read();

                  if (data !== null) {
                    return Promise.resolve(createIterResult(data, false));
                  }

                  promise = new Promise(this[kHandlePromise]);
                }

                this[kLastPromise] = promise;
                return promise;
              }
            }),
            _defineProperty(
              _Object$setPrototypeO,
              Symbol.asyncIterator,
              function() {
                return this;
              }
            ),
            _defineProperty(
              _Object$setPrototypeO,
              'return',
              function _return() {
                var _this2 = this;

                // destroy(err, cb) is a private API
                // we can guarantee we have that here, because we control the
                // Readable class this is attached to
                return new Promise(function(resolve, reject) {
                  _this2[kStream].destroy(null, function(err) {
                    if (err) {
                      reject(err);
                      return;
                    }

                    resolve(createIterResult(undefined, true));
                  });
                });
              }
            ),
            _Object$setPrototypeO),
            AsyncIteratorPrototype
          );

          var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(
            stream
          ) {
            var _Object$create;

            var iterator = Object.create(
              ReadableStreamAsyncIteratorPrototype,
              ((_Object$create = {}),
              _defineProperty(_Object$create, kStream, {
                value: stream,
                writable: true
              }),
              _defineProperty(_Object$create, kLastResolve, {
                value: null,
                writable: true
              }),
              _defineProperty(_Object$create, kLastReject, {
                value: null,
                writable: true
              }),
              _defineProperty(_Object$create, kError, {
                value: null,
                writable: true
              }),
              _defineProperty(_Object$create, kEnded, {
                value: stream._readableState.endEmitted,
                writable: true
              }),
              _defineProperty(_Object$create, kHandlePromise, {
                value: function value(resolve, reject) {
                  var data = iterator[kStream].read();

                  if (data) {
                    iterator[kLastPromise] = null;
                    iterator[kLastResolve] = null;
                    iterator[kLastReject] = null;
                    resolve(createIterResult(data, false));
                  } else {
                    iterator[kLastResolve] = resolve;
                    iterator[kLastReject] = reject;
                  }
                },
                writable: true
              }),
              _Object$create)
            );
            iterator[kLastPromise] = null;
            finished(stream, function(err) {
              if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
                var reject = iterator[kLastReject]; // reject if we are waiting for data in the Promise
                // returned by next() and store the error

                if (reject !== null) {
                  iterator[kLastPromise] = null;
                  iterator[kLastResolve] = null;
                  iterator[kLastReject] = null;
                  reject(err);
                }

                iterator[kError] = err;
                return;
              }

              var resolve = iterator[kLastResolve];

              if (resolve !== null) {
                iterator[kLastPromise] = null;
                iterator[kLastResolve] = null;
                iterator[kLastReject] = null;
                resolve(createIterResult(undefined, true));
              }

              iterator[kEnded] = true;
            });
            stream.on('readable', onReadable.bind(null, iterator));
            return iterator;
          };

          module.exports = createReadableStreamAsyncIterator;
          /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(5)));

        /***/
      },
      /* 31 */
      /***/ function(module, exports, __webpack_require__) {
        'use strict';

        function ownKeys(object, enumerableOnly) {
          var keys = Object.keys(object);
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly)
              symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
              });
            keys.push.apply(keys, symbols);
          }
          return keys;
        }

        function _objectSpread(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};
            if (i % 2) {
              ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key]);
              });
            } else if (Object.getOwnPropertyDescriptors) {
              Object.defineProperties(
                target,
                Object.getOwnPropertyDescriptors(source)
              );
            } else {
              ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(
                  target,
                  key,
                  Object.getOwnPropertyDescriptor(source, key)
                );
              });
            }
          }
          return target;
        }

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }
          return obj;
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var _require = __webpack_require__(3),
          Buffer = _require.Buffer;

        var _require2 = __webpack_require__(38),
          inspect = _require2.inspect;

        var custom = (inspect && inspect.custom) || 'inspect';

        function copyBuffer(src, target, offset) {
          Buffer.prototype.copy.call(src, target, offset);
        }

        module.exports =
          /*#__PURE__*/
          (function() {
            function BufferList() {
              _classCallCheck(this, BufferList);

              this.head = null;
              this.tail = null;
              this.length = 0;
            }

            _createClass(BufferList, [
              {
                key: 'push',
                value: function push(v) {
                  var entry = {
                    data: v,
                    next: null
                  };
                  if (this.length > 0) this.tail.next = entry;
                  else this.head = entry;
                  this.tail = entry;
                  ++this.length;
                }
              },
              {
                key: 'unshift',
                value: function unshift(v) {
                  var entry = {
                    data: v,
                    next: this.head
                  };
                  if (this.length === 0) this.tail = entry;
                  this.head = entry;
                  ++this.length;
                }
              },
              {
                key: 'shift',
                value: function shift() {
                  if (this.length === 0) return;
                  var ret = this.head.data;
                  if (this.length === 1) this.head = this.tail = null;
                  else this.head = this.head.next;
                  --this.length;
                  return ret;
                }
              },
              {
                key: 'clear',
                value: function clear() {
                  this.head = this.tail = null;
                  this.length = 0;
                }
              },
              {
                key: 'join',
                value: function join(s) {
                  if (this.length === 0) return '';
                  var p = this.head;
                  var ret = '' + p.data;

                  while ((p = p.next)) {
                    ret += s + p.data;
                  }

                  return ret;
                }
              },
              {
                key: 'concat',
                value: function concat(n) {
                  if (this.length === 0) return Buffer.alloc(0);
                  var ret = Buffer.allocUnsafe(n >>> 0);
                  var p = this.head;
                  var i = 0;

                  while (p) {
                    copyBuffer(p.data, ret, i);
                    i += p.data.length;
                    p = p.next;
                  }

                  return ret;
                } // Consumes a specified amount of bytes or characters from the buffered data.
              },
              {
                key: 'consume',
                value: function consume(n, hasStrings) {
                  var ret;

                  if (n < this.head.data.length) {
                    // `slice` is the same for buffers and strings.
                    ret = this.head.data.slice(0, n);
                    this.head.data = this.head.data.slice(n);
                  } else if (n === this.head.data.length) {
                    // First chunk is a perfect match.
                    ret = this.shift();
                  } else {
                    // Result spans more than one buffer.
                    ret = hasStrings ? this._getString(n) : this._getBuffer(n);
                  }

                  return ret;
                }
              },
              {
                key: 'first',
                value: function first() {
                  return this.head.data;
                } // Consumes a specified amount of characters from the buffered data.
              },
              {
                key: '_getString',
                value: function _getString(n) {
                  var p = this.head;
                  var c = 1;
                  var ret = p.data;
                  n -= ret.length;

                  while ((p = p.next)) {
                    var str = p.data;
                    var nb = n > str.length ? str.length : n;
                    if (nb === str.length) ret += str;
                    else ret += str.slice(0, n);
                    n -= nb;

                    if (n === 0) {
                      if (nb === str.length) {
                        ++c;
                        if (p.next) this.head = p.next;
                        else this.head = this.tail = null;
                      } else {
                        this.head = p;
                        p.data = str.slice(nb);
                      }

                      break;
                    }

                    ++c;
                  }

                  this.length -= c;
                  return ret;
                } // Consumes a specified amount of bytes from the buffered data.
              },
              {
                key: '_getBuffer',
                value: function _getBuffer(n) {
                  var ret = Buffer.allocUnsafe(n);
                  var p = this.head;
                  var c = 1;
                  p.data.copy(ret);
                  n -= p.data.length;

                  while ((p = p.next)) {
                    var buf = p.data;
                    var nb = n > buf.length ? buf.length : n;
                    buf.copy(ret, ret.length - n, 0, nb);
                    n -= nb;

                    if (n === 0) {
                      if (nb === buf.length) {
                        ++c;
                        if (p.next) this.head = p.next;
                        else this.head = this.tail = null;
                      } else {
                        this.head = p;
                        p.data = buf.slice(nb);
                      }

                      break;
                    }

                    ++c;
                  }

                  this.length -= c;
                  return ret;
                } // Make sure the linked list only shows the minimal necessary information.
              },
              {
                key: custom,
                value: function value(_, options) {
                  return inspect(
                    this,
                    _objectSpread({}, options, {
                      // Only inspect one level.
                      depth: 0,
                      // It should not recurse.
                      customInspect: false
                    })
                  );
                }
              }
            ]);

            return BufferList;
          })();

        /***/
      },
      /* 32 */
      /***/ function(module, exports) {
        module.exports = function() {
          throw new Error('Readable.from is not available in the browser');
        };

        /***/
      },
      /* 33 */
      /***/ function(module, exports, __webpack_require__) {
        'use strict';
        // Ported from https://github.com/mafintosh/pump with
        // permission from the author, Mathias Buus (@mafintosh).

        var eos;

        function once(callback) {
          var called = false;
          return function() {
            if (called) return;
            called = true;
            callback.apply(void 0, arguments);
          };
        }

        var _require$codes = __webpack_require__(0).codes,
          ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
          ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;

        function noop(err) {
          // Rethrow the error if it exists to avoid swallowing it
          if (err) throw err;
        }

        function isRequest(stream) {
          return stream.setHeader && typeof stream.abort === 'function';
        }

        function destroyer(stream, reading, writing, callback) {
          callback = once(callback);
          var closed = false;
          stream.on('close', function() {
            closed = true;
          });
          if (eos === undefined) eos = __webpack_require__(9);
          eos(
            stream,
            {
              readable: reading,
              writable: writing
            },
            function(err) {
              if (err) return callback(err);
              closed = true;
              callback();
            }
          );
          var destroyed = false;
          return function(err) {
            if (closed) return;
            if (destroyed) return;
            destroyed = true; // request.destroy just do .end - .abort is what we want

            if (isRequest(stream)) return stream.abort();
            if (typeof stream.destroy === 'function') return stream.destroy();
            callback(err || new ERR_STREAM_DESTROYED('pipe'));
          };
        }

        function call(fn) {
          fn();
        }

        function pipe(from, to) {
          return from.pipe(to);
        }

        function popCallback(streams) {
          if (!streams.length) return noop;
          if (typeof streams[streams.length - 1] !== 'function') return noop;
          return streams.pop();
        }

        function pipeline() {
          for (
            var _len = arguments.length, streams = new Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            streams[_key] = arguments[_key];
          }

          var callback = popCallback(streams);
          if (Array.isArray(streams[0])) streams = streams[0];

          if (streams.length < 2) {
            throw new ERR_MISSING_ARGS('streams');
          }

          var error;
          var destroys = streams.map(function(stream, i) {
            var reading = i < streams.length - 1;
            var writing = i > 0;
            return destroyer(stream, reading, writing, function(err) {
              if (!error) error = err;
              if (err) destroys.forEach(call);
              if (reading) return;
              destroys.forEach(call);
              callback(error);
            });
          });
          return streams.reduce(pipe);
        }

        module.exports = pipeline;

        /***/
      },
      /* 34 */
      /***/ function(module, exports, __webpack_require__) {
        /*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
        /* eslint-disable node/no-deprecated-api */
        var buffer = __webpack_require__(3);
        var Buffer = buffer.Buffer;

        // alternative to using Object.keys for old browsers
        function copyProps(src, dst) {
          for (var key in src) {
            dst[key] = src[key];
          }
        }
        if (
          Buffer.from &&
          Buffer.alloc &&
          Buffer.allocUnsafe &&
          Buffer.allocUnsafeSlow
        ) {
          module.exports = buffer;
        } else {
          // Copy properties from require('buffer')
          copyProps(buffer, exports);
          exports.Buffer = SafeBuffer;
        }

        function SafeBuffer(arg, encodingOrOffset, length) {
          return Buffer(arg, encodingOrOffset, length);
        }

        SafeBuffer.prototype = Object.create(Buffer.prototype);

        // Copy static methods from Buffer
        copyProps(Buffer, SafeBuffer);

        SafeBuffer.from = function(arg, encodingOrOffset, length) {
          if (typeof arg === 'number') {
            throw new TypeError('Argument must not be a number');
          }
          return Buffer(arg, encodingOrOffset, length);
        };

        SafeBuffer.alloc = function(size, fill, encoding) {
          if (typeof size !== 'number') {
            throw new TypeError('Argument must be a number');
          }
          var buf = Buffer(size);
          if (fill !== undefined) {
            if (typeof encoding === 'string') {
              buf.fill(fill, encoding);
            } else {
              buf.fill(fill);
            }
          } else {
            buf.fill(0);
          }
          return buf;
        };

        SafeBuffer.allocUnsafe = function(size) {
          if (typeof size !== 'number') {
            throw new TypeError('Argument must be a number');
          }
          return Buffer(size);
        };

        SafeBuffer.allocUnsafeSlow = function(size) {
          if (typeof size !== 'number') {
            throw new TypeError('Argument must be a number');
          }
          return buffer.SlowBuffer(size);
        };

        /***/
      },
      /* 35 */
      /***/ function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */ (function(global) {
          /**
           * Module exports.
           */

          module.exports = deprecate;

          /**
           * Mark that a method should not be used.
           * Returns a modified function which warns once by default.
           *
           * If `localStorage.noDeprecation = true` is set, then it is a no-op.
           *
           * If `localStorage.throwDeprecation = true` is set, then deprecated functions
           * will throw an Error when invoked.
           *
           * If `localStorage.traceDeprecation = true` is set, then deprecated functions
           * will invoke `console.trace()` instead of `console.error()`.
           *
           * @param {Function} fn - the function to deprecate
           * @param {String} msg - the string to print to the console when `fn` is invoked
           * @returns {Function} a new "deprecated" version of `fn`
           * @api public
           */

          function deprecate(fn, msg) {
            if (config('noDeprecation')) {
              return fn;
            }

            var warned = false;
            function deprecated() {
              if (!warned) {
                if (config('throwDeprecation')) {
                  throw new Error(msg);
                } else if (config('traceDeprecation')) {
                  console.trace(msg);
                } else {
                  console.warn(msg);
                }
                warned = true;
              }
              return fn.apply(this, arguments);
            }

            return deprecated;
          }

          /**
           * Checks `localStorage` for boolean values for the given `name`.
           *
           * @param {String} name
           * @returns {Boolean}
           * @api private
           */

          function config(name) {
            // accessing global.localStorage can trigger a DOMException in sandboxed iframes
            try {
              if (!global.localStorage) return false;
            } catch (_) {
              return false;
            }
            var val = global.localStorage[name];
            if (null == val) return false;
            return String(val).toLowerCase() === 'true';
          }

          /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(6)));

        /***/
      },
      /* 36 */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict';
        Object.defineProperty(__webpack_exports__, '__esModule', {
          value: true
        });
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__N3Lexer__ = __webpack_require__(
          11
        );
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__N3Parser__ = __webpack_require__(
          12
        );
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__N3Writer__ = __webpack_require__(
          13
        );
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__N3Store__ = __webpack_require__(
          22
        );
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__N3StreamParser__ = __webpack_require__(
          23
        );
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__N3StreamWriter__ = __webpack_require__(
          24
        );
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__N3Util__ = __webpack_require__(
          8
        );
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__N3DataFactory__ = __webpack_require__(
          2
        );
        /* harmony reexport (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'Lexer',
          function() {
            return __WEBPACK_IMPORTED_MODULE_0__N3Lexer__['a'];
          }
        );
        /* harmony reexport (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'Parser',
          function() {
            return __WEBPACK_IMPORTED_MODULE_1__N3Parser__['a'];
          }
        );
        /* harmony reexport (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'Writer',
          function() {
            return __WEBPACK_IMPORTED_MODULE_2__N3Writer__['a'];
          }
        );
        /* harmony reexport (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'Store',
          function() {
            return __WEBPACK_IMPORTED_MODULE_3__N3Store__['a'];
          }
        );
        /* harmony reexport (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'StreamParser',
          function() {
            return __WEBPACK_IMPORTED_MODULE_4__N3StreamParser__['a'];
          }
        );
        /* harmony reexport (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'StreamWriter',
          function() {
            return __WEBPACK_IMPORTED_MODULE_5__N3StreamWriter__['a'];
          }
        );
        /* harmony reexport (module object) */ __webpack_require__.d(
          __webpack_exports__,
          'Util',
          function() {
            return __WEBPACK_IMPORTED_MODULE_6__N3Util__;
          }
        );
        /* harmony reexport (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'DataFactory',
          function() {
            return __WEBPACK_IMPORTED_MODULE_7__N3DataFactory__['a'];
          }
        );
        /* harmony reexport (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'Term',
          function() {
            return __WEBPACK_IMPORTED_MODULE_7__N3DataFactory__['b'];
          }
        );
        /* harmony reexport (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'NamedNode',
          function() {
            return __WEBPACK_IMPORTED_MODULE_7__N3DataFactory__['c'];
          }
        );
        /* harmony reexport (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'Literal',
          function() {
            return __WEBPACK_IMPORTED_MODULE_7__N3DataFactory__['d'];
          }
        );
        /* harmony reexport (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'BlankNode',
          function() {
            return __WEBPACK_IMPORTED_MODULE_7__N3DataFactory__['e'];
          }
        );
        /* harmony reexport (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'Variable',
          function() {
            return __WEBPACK_IMPORTED_MODULE_7__N3DataFactory__['f'];
          }
        );
        /* harmony reexport (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'DefaultGraph',
          function() {
            return __WEBPACK_IMPORTED_MODULE_7__N3DataFactory__['g'];
          }
        );
        /* harmony reexport (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'Quad',
          function() {
            return __WEBPACK_IMPORTED_MODULE_7__N3DataFactory__['h'];
          }
        );
        /* harmony reexport (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'Triple',
          function() {
            return __WEBPACK_IMPORTED_MODULE_7__N3DataFactory__['i'];
          }
        );
        /* harmony reexport (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'termFromId',
          function() {
            return __WEBPACK_IMPORTED_MODULE_7__N3DataFactory__['j'];
          }
        );
        /* harmony reexport (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'termToId',
          function() {
            return __WEBPACK_IMPORTED_MODULE_7__N3DataFactory__['k'];
          }
        );

        /***/
      },
      /* 37 */
      /***/ function(module, exports) {
        /* (ignored) */
        /***/
      },
      /* 38 */
      /***/ function(module, exports) {
        /* (ignored) */
        /***/
      }
      /******/
    ]
  );
});
