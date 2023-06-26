(function () {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var $w = $(window);
  var __g = {
    VIEWS: {
      home: 0,
      datasets: 1,
      statistics: 2,
      network: 3,
      documents: 4,
      guideline: 5,
      changeLog: 6,
      dataset: 7
    },
    VIEWS_NAME: ['home', 'datasets', 'statistics', 'network', 'documents', 'guideline', 'changeLog', 'dataset'],
    VIEWS_LABEL: ['Home', 'Datasets', 'Statistics', 'Network view', 'Documents', 'Guideline', 'Change log', ' '],
    VIEW_LABEL_DETAIL: 'dataset',
    STAR_TYPE: {
      first: 'first',
      connected: 'connected'
    },
    STRINGS: {},
    COLORS: ['#E4007F', '#FF2121', '#FF29A0', '#FF8000', '#EBB800', '#CAD400', '#9AD400', '#15AD52', '#00D1AB', '#00C0FA', '#5E65E6', '#9B5BF0', '#B813BD', '#E47295', '#E4C172', '#BAED77', '#90E4CF', '#799AE4', '#C57DE4', '#99007B', '#992509', '#8C9900', '#09751F', '#007B99', '#432E99'],
    DURATION: 500,
    DETAIL_DELAY: 400,
    CLASS: {
      STAR_HOVERING: 'star-hovering',
      TAG_HOVERING: 'tag-hovering',
      CONNECTED_STAR_HOVERING: 'connected-star-hovering'
    },
    DETAIL_MARGIN: 310,
    DETAIL_MARGIN_RIGHT: 24,
    DATA_LENGTH: 20,
    //SVG_MARGIN_LEFT: -114,
    SVG_MARGIN_LEFT: 0,
    d3: {
      svg: undefined,
      edges: undefined,
      nodesData: [],
      nodesSelection: undefined,
      linksData: [],
      linksSelection: undefined,
      force: undefined
    },
    disposableStarId: 0,
    canvasId: 0,
    controlPanel: undefined,
    userDefaults: undefined,
    styleSheet: undefined,
    guideline: {},
    rootPath: function () {
      var host = location.host,
        pathname = location.pathname;
      var path;
      if (host.indexOf('integbio') !== -1) {
        if (pathname.indexOf('/rdf/dev/') !== -1) {
          path = '/rdf/dev/';
        } else if (pathname.indexOf('/rdf/staging/') !== -1) {
          path = '/rdf/staging/';
        } else if (pathname.indexOf('/rdf/prod/') !== -1) {
          path = '/rdf/prod/';
        } else {
          path = '/rdf/';
        }
      } else if (host.indexOf('penqe') !== -1) {
        path = '/dbcls/rdfp/';
      } else {
        path = '/';
      }
      return path;
    }()
  };

  // HTML生成用関数
  var _html = function _html() {
    var tag, attr, html;
    switch (arguments.length) {
      case 2:
        tag = arguments[0];
        attr = '';
        html = arguments[1];
        break;
      case 3:
        {
          tag = arguments[0];
          var attrObje = arguments[1];
          attr = function () {
            var attrHtml = '';
            for (var i in attrObje) {
              attrHtml += " ".concat(i, "=\"").concat(attrObje[i], "\"");
            }
            return attrHtml;
          }();
          html = arguments[2];
        }
        break;
    }
    return "<".concat(tag, " ").concat(attr, ">").concat(html, "</").concat(tag, ">");
  };
  var _MLHtml = function _MLHtml() {
    var tag,
      attr,
      MLtext,
      html = '',
      lang;
    switch (arguments.length) {
      case 1:
        MLtext = arguments[0];
        for (lang in MLtext) {
          html += _html('span', {
            lang: lang
          }, MLtext[lang]);
        }
        return html;
      //break;

      case 2:
        tag = arguments[0];
        attr = '';
        MLtext = arguments[1];
        break;
      case 3:
        tag = arguments[0];
        attr = arguments[1];
        MLtext = arguments[2];
        break;
    }
    for (lang in MLtext) {
      html += _html('span', {
        lang: lang
      }, MLtext[lang]);
    }
    return _html(tag, attr, html);
  };
  var _numeral = function _numeral(value) {
    return "<span class=\"numeral\">".concat(value, "</span>");
  };
  var _htmlAnchor = function _htmlAnchor(uri, label) {
    return _html('a', {
      href: uri,
      target: '_blank'
    }, label === '' || label.indexOf('lang="en"></span>') !== -1 ? uri : label);
  };
  var _MLAnchor = function _MLAnchor(uri, label) {
    var html = '';
    var isString = typeof uri === 'string';
    for (var lang in label) {
      var uri2 = isString ? uri : uri[lang];
      html += _html('a', {
        lang: lang,
        href: uri2,
        target: '_blank'
      }, label[lang] === '' ? uri2 : label[lang]);
    }
    return html;
  };
  var _htmlTR = function _htmlTR(key, value) {
    return _html('tr', _html('th', key) + _html('td', value));
  };
  var _htmlTRValueNumeral = function _htmlTRValueNumeral(key, value) {
    return "<tr class=\"value-numeral\"><th>".concat(key, "</th><td>").concat(_numeral(value), "</td></tr>");
  };
  var _htmlTRHasDetailValueNumeral = function _htmlTRHasDetailValueNumeral(key, value) {
    return "<tr class=\"has-detail value-numeral\"><th>".concat(key, "<span class=\"open-button\"></span></th><td>").concat(_numeral(value), "</td></tr>");
  };

  /* Classes / Instances または Properties / Triples の場合のディティール折りたたみ
   * @param key							項目名
   * @param value						値
   * @param kind						種類（classes / properties）
   * @param jsonUri					閉じられた領域の情報を格納するJSONのURI
   * @param classification	項目がどこに属するか（undefined / ontology / graph）
   * @param index						配列の場合の位置
   *
   */
  var _htmlTRHasDetailValueNumeral2 = function _htmlTRHasDetailValueNumeral2(key, value, kind, jsonUri, classification, index) {
    return "<tr class=\"has-detail value-numeral\" data-json-kind=\"".concat(kind, "\" data-json-uri=\"").concat(jsonUri, "\" data-classification=\"").concat(classification, "\" data-index=\"").concat(index, "\"><th>").concat(key, "<span class=\"open-button\"></span></th><td>").concat(value, "</td></tr>");
  };
  var _htmlTRDetail = function _htmlTRDetail(detailHtml) {
    return "<tr class=\"detail\"><td colspan=\"2\"><div class=\"closer\"><div class=\"closer-inner\">".concat(detailHtml, "</div></div></td></tr>");
  };

  /* param item: 'graphs' or 'ontorogies'
   */
  var _htmlHasDetailAndDetail = function _htmlHasDetailAndDetail(item) {
    var datasets = __g.app.datasets,
      starId = __g.app.currentStarId,
      STR = __g.STRINGS;
    if (datasets[item].noOf(starId) === 0) {
      return '';
    }
    var html = _html('tbody', _html('tr', {
      class: 'caption'
    }, _html('th', {
      colspan: 2
    }, _MLHtml(STR[item]))) + function () {
      var subHtml = '';
      for (var i = 0; i < datasets[item].noOf(starId); i++) {
        //var uri = datasets[item].uri(starId, i);
        subHtml += _html('tr', {
          class: 'has-detail'
        }, _html('th', {
          colspan: 2
        }, datasets[item].uri(starId, i) + '<span class="open-button"></span>')) + _html('tr', {
          class: 'detail hidden'
        }, _html('td', {
          colspan: 2
        }, _html('div', {
          class: 'closer'
        }, _html('div', {
          class: 'closer-inner'
        }, _html('table', {
          class: 'horizontal-table internal'
        }, _htmlStatics(starId, item, i))))));
      }
      return subHtml;
    }());
    return html;
  };
  var _htmlStatics = function _htmlStatics(starId, classification, index) {
    var STR = __g.STRINGS,
      HYPHEN = '<span class="hyphen"></span>',
      DATASETS = classification === undefined ? __g.app.datasets : __g.app.datasets[classification],
      NO_OF_CLASSES = DATASETS.classes.noOf(starId, index),
      NO_OF_PROPERTIES = DATASETS.properties.noOf(starId, index),
      NO_OF_DATATYPES = DATASETS.datatypes.noOf(starId, index),
      html = _html('tbody', function () {
        // description & files
        if (classification === undefined) {
          return '';
        } else {
          var noOfFiles = DATASETS.files.noOf(starId, index),
            subHtml2 = _html('tr',
            // description
            _html('td', {
              colspan: 2
            }, _MLHtml(DATASETS.description(starId, index)))) + '<tr>' + "<th rowspan=\"".concat(noOfFiles, "\">").concat(_MLHtml(STR.files), "</th>") + function () {
              var subHtml3 = '';
              for (var i = 0; i < noOfFiles; i++) {
                subHtml3 += "".concat(i > 0 ? '<tr>' : '', "<td><p class=\"files\">").concat(_htmlAnchor(DATASETS.files.uri(starId, i, index), DATASETS.files.name(starId, i, index)), "<small>").concat(_numeral(DATASETS.files.size(starId, i, index)), " bytes</small></p></td></tr>'");
              }
              return subHtml3;
            }();
          return subHtml2;
        }
      }() + _htmlTRValueNumeral(_MLHtml(STR.subjects), DATASETS.noOfSubjects(starId, index)) +
      // subjects
      _htmlTRValueNumeral(_MLHtml(STR.objects), DATASETS.noOfObjects(starId, index)) +
      // objects
      _htmlTRValueNumeral(_MLHtml(STR.literals), DATASETS.noOfLiterals(starId, index)) +
      // literals
      _htmlTRHasDetailValueNumeral2(
      // classes / instances
      _MLHtml(STR.classes) + HYPHEN + _MLHtml(STR.instances), _numeral(NO_OF_CLASSES) + HYPHEN + _numeral(DATASETS.noOfInstances(starId, index)), 'classes', DATASETS.classes.jsonUri(starId, index), classification, index) + _htmlTRDetail(function () {
        var subHtml2 = _html('table', {
          class: 'internal'
        }, _html('thead', _html('tr', _MLHtml('th', STR.classes) + _MLHtml('th', STR.numberOfInstances))) + _html('tbody', _html('tr', {
          class: 'loading'
        }, _html('td', {
          colspan: 2
        }, ''))));
        return subHtml2;
      }()) + _htmlTRHasDetailValueNumeral2(
      // properties / triples
      _MLHtml(STR.properties) + HYPHEN + _MLHtml(STR.triples), _numeral(NO_OF_PROPERTIES) + HYPHEN + _numeral(DATASETS.noOfTriples(starId, index)), 'properties', DATASETS.properties.jsonUri(starId, index), classification, index) + _htmlTRDetail(function () {
        var subHtml2 = _html('table', {
          class: 'internal'
        }, _html('thead', _html('tr', _MLHtml('th', STR.properties) + _MLHtml('th', STR.numberOfTriples))) + _html('tbody', _html('tr', {
          class: 'loading'
        }, _html('td', {
          colspan: 2
        }, ''))));
        return subHtml2;
      }()) + _htmlTRHasDetailValueNumeral(_MLHtml(STR.datatypes), NO_OF_DATATYPES) +
      // datasets
      _htmlTRDetail(function () {
        var subHtml2 = _html('table', {
          class: 'internal'
        }, _html('thead', _html('tr', _MLHtml('th', STR.datatypes))) + _html('tbody', function () {
          var subHtml3 = '';
          for (var j = 0; j < NO_OF_DATATYPES; j++) {
            var datatype = DATASETS.datatypes.datatype(starId, j, index);
            subHtml3 += _html('tr', _html('td', _htmlAnchor(datatype, datatype)));
          }
          return subHtml3;
        }()));
        return subHtml2;
      }()));
    return html;
  };

  // ソート
  var _sort = function _sort(kindOfSorting, isAscend) {
    var i,
      value,
      target,
      mapper = [],
      functionName,
      sortedIds = [];
    var ids = __g.app.datasets.ids();
    switch (kindOfSorting) {
      case 'Alphabetical':
        {
          // アルファベティカル
          var _iterator = _createForOfIteratorHelper(ids),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var id = _step.value;
              value = __g.app.datasets.title(id)[__g.app.language];
              mapper.push({
                id: id,
                value: value
              });
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          mapper.sort(function (a, b) {
            if (a.value < b.value) {
              return -1;
            } else {
              return 1;
            }
          });
        }
        break;
      case 'DataProvider':
        {
          // Data provider
          var _iterator2 = _createForOfIteratorHelper(ids),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _id = _step2.value;
              value = __g.app.datasets.dataProvider(_id)[__g.app.language];
              mapper.push({
                id: _id,
                value: value
              });
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          mapper.sort(function (a, b) {
            if (a.value < b.value) {
              return -1;
            } else {
              return 1;
            }
          });
        }
        break;
      case 'LastUpdate':
        {
          // 更新日順
          var _iterator3 = _createForOfIteratorHelper(ids),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var _id2 = _step3.value;
              var date = __g.app.datasets.issued(_id2).split('-');
              value = new Date(date[0], date[1], date[2]).getTime();
              mapper.push({
                id: _id2,
                value: value
              });
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          mapper.sort(function (a, b) {
            return b.value - a.value;
          });
        }
        break;
      default:
        {
          // その他の数量系のソート
          switch (kindOfSorting) {
            case 'Classes':
              functionName = 'noOfClasses';
              break;
            case 'Instances':
              functionName = 'noOfInstances';
              break;
            case 'Literals':
              functionName = 'noOfLiterals';
              break;
            case 'Objects':
              functionName = 'noOfObjects';
              break;
            case 'Properties':
              functionName = 'noOfProperties';
              break;
            case 'Subjects':
              functionName = 'noOfSubjects';
              break;
            case 'Triples':
              functionName = 'noOfTriples';
              break;
            case 'Links':
              functionName = 'noOfLinks';
              break;
          }
          if (typeof functionName === 'string') {
            target = __g.app.datasets[functionName];
          } else {
            target = __g.app.datasets[functionName[0]][functionName[1]];
          }
          var _iterator4 = _createForOfIteratorHelper(ids),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var _id3 = _step4.value;
              mapper.push({
                id: _id3,
                value: target(_id3)
              });
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
          mapper.sort(function (a, b) {
            return b.value - a.value;
          });
        }
        break;
    }
    // 昇順降順
    if (isAscend) {
      for (i = 0; i < mapper.length; i++) {
        sortedIds.push(mapper[i].id);
      }
    } else {
      for (i = mapper.length - 1; i >= 0; i--) {
        sortedIds.push(mapper[i].id);
      }
    }
    return sortedIds;
  }; // function sort

  // その他の汎用関数
  var _sanitizeTag = function _sanitizeTag(tag) {
    return tag.replace(/\W+/g, '_');
  };
  var _placeComma = function _placeComma(elm) {
    $(elm).find('span.numeral').each(function () {
      this.textContent = this.textContent.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
      this.classList.remove('numeral');
      this.classList.add('numeral-comma');
    });
  };

  var _CORN = {
      NUMBER_OF_LINE: 2,
      ORIGIN: {
        X: 610 + 115,
        Y: 1210
      },
      ELLIPSE: {
        POSITIONS: [293, 558, 876],
        RATIO: 0.1131,
        RESOLUTION: 64
      },
      RADIUS: 532
    },
    SHOW_DURATION$1 = 900;

  /* Home view manager class
   * ホームビュー管理クラス
   * 
   */
  var HomeViewController = /*#__PURE__*/function () {
    function HomeViewController() {
      _classCallCheck(this, HomeViewController);
      this._isInitialized = false;
      this._d3Corn;
      this.$view = $('#home-view');
    }
    _createClass(HomeViewController, [{
      key: "show",
      value: function show() {
        var i, j, y, radian1, radian2, radian3, radius;

        // corn
        if (!this._isInitialized) {
          this._isInitialized = true;
          this._d3Corn = __g.d3.svg.append('g').attr('class', 'corn');

          // line
          radian1 = 2 * Math.PI / _CORN.NUMBER_OF_LINE;
          for (i = 0; i < _CORN.NUMBER_OF_LINE; i++) {
            radian2 = radian1 * i;
            this._d3Corn.append('line').attr('x1', _CORN.ORIGIN.X).attr('y1', _CORN.ORIGIN.Y).attr('x2', _CORN.ORIGIN.X + _CORN.RADIUS * Math.cos(radian2)).attr('y2', 0).attr('stroke', 'rgba(255, 255, 255, ' + (Math.sin(radian2 + Math.PI) + 1) * 0.25 + ')');
          }

          // ellipse
          radian1 = 2 * Math.PI / _CORN.ELLIPSE.RESOLUTION;
          for (i = 0; i < _CORN.ELLIPSE.POSITIONS.length; i++) {
            y = _CORN.ELLIPSE.POSITIONS[i];
            radius = y / _CORN.ORIGIN.Y * _CORN.RADIUS;
            for (j = 0; j < _CORN.ELLIPSE.RESOLUTION; j++) {
              radian2 = radian1 * j;
              radian3 = radian2 + radian1;
              this._d3Corn.append('line').attr('x1', _CORN.ORIGIN.X + Math.cos(radian2) * radius).attr('y1', _CORN.ORIGIN.Y - y + Math.sin(radian2) * radius * _CORN.ELLIPSE.RATIO).attr('x2', _CORN.ORIGIN.X + Math.cos(radian3) * radius).attr('y2', _CORN.ORIGIN.Y - y + Math.sin(radian3) * radius * _CORN.ELLIPSE.RATIO).attr('stroke', 'rgba(255, 255, 255, ' + (0.1 + (Math.sin((radian2 + radian3) * 0.5) + 1) * 0.25) + ')');
              //.attr('stroke', '#fff');
            }
          }

          this.$view.find('.node').on('click', function () {
            $('#' + this.getAttribute('data-target')).trigger('click');
          });

          // statistics
          var html = '';
          // Datasets
          html += "<p>".concat(__g.app.datasets.ids().length, "<span>RDF datasets</span></p>");
          var statisticsItems = {
              noOfLinks: 0,
              noOfTriples: 0
            },
            ids = __g.app.datasets.ids();
          var _iterator = _createForOfIteratorHelper(ids),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var id = _step.value;
              for (var _item in statisticsItems) {
                statisticsItems[_item] += __g.app.datasets[_item](id);
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          for (var item in statisticsItems) {
            var sampleString = statisticsItems[item] + '',
              figure = Math.ceil(sampleString.length / 3);
            var processedNumber = void 0;
            switch (true) {
              case figure === 3:
                processedNumber = Math.round(statisticsItems[item] * 0.000001) + '<span> million @@unit@@</span>';
                break;
              case figure === 4:
                processedNumber = Math.round(statisticsItems[item] * 0.000000001) + '<span> billion @@unit@@</span>';
                break;
              case figure === 5:
                processedNumber = Math.round(statisticsItems[item] * 0.000000000001) + '<span> trillion @@unit@@</span>';
                break;
              default:
                processedNumber = roundedString.toLocaleString();
                break;
            }
            html += "<p>".concat(processedNumber.replace('@@unit@@', {
              noOfTriples: 'triples',
              noOfLinks: 'inter-datasets links'
            }[item]), "</p>");
          }
          $('#home-statistics').append(html);
        }

        // force
        __g.d3.force
        //.gravity(0.001)
        .on('tick', function () {
          __g.d3.linksSelection.attr('x1', function (d) {
            return d.source.x;
          }).attr('y1', function (d) {
            return d.source.y;
          }).attr('x2', function (d) {
            return d.target.x;
          }).attr('y2', function (d) {
            return d.target.y;
          });
          __g.d3.nodesSelection.style('left', function (d) {
            return d.x + __g.SVG_MARGIN_LEFT + 'px';
          }).style('top', function (d) {
            return d.y + 'px';
          });
        }).stop();

        // shown
        window.setTimeout(function () {
          __g.app.changed(__g.VIEWS_NAME.indexOf('home'), this.$view.innerHeight());
        }.bind(this), SHOW_DURATION$1);
      }
    }, {
      key: "hide",
      value: function hide() {
        //window.clearInterval(_timerId);
        __g.d3.force.stop().on('tick', null);
      }
    }]);
    return HomeViewController;
  }(); // ********** end of HomeViewController class

  var SHOW_DURATION = 100,
    ORIGIN$2 = {
      X: 339,
      Y: 27
    };

  /* List view manager class
   * リストビュー管理クラス
   * 
   */
  var ListViewController = /*#__PURE__*/function () {
    function ListViewController() {
      _classCallCheck(this, ListViewController);
      this._placedStarCoutner;
      this.$stars = undefined;
    }
    _createClass(ListViewController, [{
      key: "show",
      value: function show() {
        var _this = this;
        window.setTimeout(function () {
          _this.makeList();
        }, SHOW_DURATION);
      }
    }, {
      key: "makeList",
      value: function makeList() {
        var _this2 = this;
        var sortedIds;

        // イベントのバインド
        __g.app.addNotificationObserver('change-sorting', this, this.receiveNotificationChangeSorting);
        __g.app.addNotificationObserver('change-provided-as', this, this.receiveNotificationChangeFilter);
        __g.app.addNotificationObserver('change-filtering-tags', this, this.receiveNotificationChangeFilter);

        // ソート
        sortedIds = _sort(__g.controlPanel.kindOfSorting(), __g.controlPanel.isAscend());

        // サイズ種別を取得し各ノードに通知、レイアウトを行う
        this.placeStars(sortedIds);

        // ウインドウリサイズで星の矩形のリサイズ
        if (!this.$stars) {
          this.$stars = $('.star', __g.app.$main).not('.xref');
        }
        $w.on('resize.listView', function () {
          _this2.$stars.css('width', __g.app.$main.width() - ORIGIN$2.X - 20);
        }).triggerHandler('resize.listView');
      }

      // 星の位置取りを行う
    }, {
      key: "placeStars",
      value: function placeStars(sortedIds) {
        var i,
          top = ORIGIN$2.Y,
          height;
        this._placedStarCoutner = 0;
        // 各ノードに通知
        for (i = 0; i < sortedIds.length; i++) {
          height = __g.app.starsWithKeys[sortedIds[i]].prepareListView(this._placedStarCoutner, top, this);
          if (height !== 0) {
            top += height;
            this._placedStarCoutner++;
          }
        }
        _placeComma(__g.app.$main.find('.detail-view'));
      } // function placeStars
    }, {
      key: "placedStar",
      value: function placedStar() {
        if (--this._placedStarCoutner === 0) {
          // 遷移終了
          __g.app.changed(__g.VIEWS_NAME.indexOf('datasets'));
        }
      }
    }, {
      key: "hide",
      value: function hide() {
        __g.app.$main.find().remove();
        $w.off('resize.listView');
        this.$stars.css('width', '');
        __g.app.removeNotificationObserver('change-sorting', this);
        __g.app.removeNotificationObserver('change-scaling', this);
        for (var i = 0; i < __g.app.stars.length; i++) {
          __g.app.stars[i].prepareLeaveFromListView();
        }
      }

      // ソート種別の変更が行われたときに呼ばれる関数
    }, {
      key: "receiveNotificationChangeSorting",
      value: function receiveNotificationChangeSorting() {
        var sortedIds = _sort(__g.controlPanel.kindOfSorting(), __g.controlPanel.isAscend());
        this.placeStars(sortedIds);
      } // function receiveNotificationChangeSorting
    }, {
      key: "receiveNotificationChangeFilter",
      value: function receiveNotificationChangeFilter() {
        var sortedIds = _sort(__g.controlPanel.kindOfSorting(), __g.controlPanel.isAscend());
        this.placeStars(sortedIds);
      } // function receiveNotificationChangeFilter
    }], [{
      key: "ORIGIN",
      get: function get() {
        return ORIGIN$2;
      }
    }]);
    return ListViewController;
  }(); // ********** end of ListViewController class

  /* Matrix item view manager class
   * マトリックスビューの各項ビュー
   * 
   */
  var MatrixItemView = /*#__PURE__*/_createClass(function MatrixItemView(colItem, order, delegate) {
    _classCallCheck(this, MatrixItemView);
    switch (colItem.name) {
      case 'Alphabetical':
        // make cells
        delegate._$matrix.append(_html('div', {
          class: 'cell item-' + colItem.name,
          'data-sort': colItem.name,
          'data-ascend': colItem.isAscend ? 'ascend' : 'descend'
        }, _MLHtml(delegate.STR.name) + '<div class="sorter"></div>'));
        break;
      case 'Triples':
      case 'Links':
      case 'Classes':
      case 'Instances':
      case 'Literals':
      case 'Subjects':
      case 'Properties':
      case 'Objects':
        {
          // make cells
          delegate._$head.append(_html('div', {
            class: 'cell item-' + colItem.name,
            'data-sort': colItem.name,
            'data-ascend': colItem.isAscend ? 'ascend' : 'descend'
          }, _MLHtml(delegate.STR['numberOf' + colItem.name]) + '<div class="sorter"></div>'));
          delegate._$body.append(function () {
            var html = '',
              sum = 0;
            for (var i = 0; i < delegate._sortedIds.length; i++) {
              var value = delegate.datasets['noOf' + colItem.name](delegate._sortedIds[i]);
              sum += value;
              html += _html('div', {
                class: "cell item-".concat(colItem.name, " id-").concat(delegate._sortedIds[i]),
                'data-sort': colItem.name,
                'data-id': delegate._sortedIds[i]
              }, _numeral(value));
            }
            html += _html('div', {
              class: "cell item-".concat(colItem.name, " id-sum"),
              'data-sort': colItem.name,
              'data-id': 'sum'
            }, _numeral(sum));
            // line
            return html;
          }());
          // layout
          var left = ORIGIN$1.X + CELL.WIDTH * (order - 1);
          delegate._$head.find('.item-' + colItem.name).css('left', left);
          delegate._$body.find('.item-' + colItem.name).css('left', left);
        }
        break;
    }
  }); // ********** end of MatrixItemView class

  /* Matrix item view manager class
   * マトリックスビューの各項ビュー
   * 
   */
  var MatrixScrollbarView = /*#__PURE__*/function () {
    function MatrixScrollbarView(delegate) {
      var _this = this;
      _classCallCheck(this, MatrixScrollbarView);
      this._delegate = delegate;
      this._matrixWidth;
      this._widthRatio;
      this._scrollBarWidth;
      this._delegate._$matrix.append('<div id="matrix-scroll-area"></div><div id="matrix-scroll-bar"></div>');
      this._$scrollArea = this._delegate._$matrix.children('#matrix-scroll-area');
      this._$scrollBar = this._delegate._$matrix.children('#matrix-scroll-bar');
      this._$scrollBar.draggable({
        axis: 'x',
        containment: this._$scrollArea,
        drag: function drag(event, obj) {
          var left = obj.position.left - _this._delegate._$inner.offset().left,
            range = _this._matrixWidth - _this._scrollBarWidth;
          _this._delegate._$inner.scrollLeft((_this._delegate._matrixOverallWidth - _this._matrixWidth) * (left / range));
        }
      });
    }
    _createClass(MatrixScrollbarView, [{
      key: "enable",
      value: function enable() {
        var _this2 = this;
        // events
        $w.on({
          // 領域定義
          'resize.matrix': function resizeMatrix() {
            var innerWidth = $w.innerWidth(),
              matrixHeight = $w.innerHeight() - _this2._delegate._$matrix.offset().top;
            _this2._matrixWidth = innerWidth - _this2._delegate._$matrix.offset().left;
            _this2._widthRatio = _this2._matrixWidth / _this2._delegate._matrixOverallWidth;
            _this2._scrollBarWidth = _this2._matrixWidth * _this2._widthRatio;
            _this2._delegate._$matrix.css({
              width: _this2._matrixWidth,
              height: matrixHeight > _this2._delegate._matrixOverallHeight ? matrixHeight : _this2._delegate._matrixOverallHeight
            });
            if (_this2._matrixWidth < _this2._delegate._matrixOverallWidth) {
              _this2._$scrollArea.css({
                width: _this2._matrixWidth,
                height: matrixHeight
              });
              _this2._$scrollBar.css({
                width: _this2._scrollBarWidth,
                bottom: 42,
                top: 'auto',
                display: 'block'
              });
            } else {
              _this2._$scrollBar.css({
                display: 'none'
              });
            }
          }
        }).trigger('resize.matrix');
        this._delegate._$inner.on({
          'scroll.matrix': function scrollMatrix() {
            _this2._$scrollBar.css({
              left: _this2._delegate._$inner.offset().left + _this2._delegate._$inner.scrollLeft() * _this2._widthRatio
            });
          }
        }).trigger('scroll.matrix');
        this._$scrollBar.draggable('enable');
      }
    }, {
      key: "disable",
      value: function disable() {
        this._delegate._$inner.off('scroll.matrix');
        $w.off('resize.matrix');
        this._$scrollBar.draggable('disable');
      }
    }]);
    return MatrixScrollbarView;
  }(); // ********** end of MatrixScrollbarView class

  var ORIGIN$1 = {
      X: 0,
      Y: 127
    },
    CELL = {
      WIDTH: 120,
      HEIGHT: 32
    },
    PADDING_BOTTOM = 60,
    PADDING_RIGHT = 60;

  /* Matrix view manager class
   * マトリックスビュー管理クラス
   * 
   */
  var MatrixViewController = /*#__PURE__*/function () {
    function MatrixViewController() {
      _classCallCheck(this, MatrixViewController);
      //var self = this;
      this.STR = __g.STRINGS;
      this.datasets = __g.app.datasets;
      this._isInitialized = false;
      this._sortBy;
      this._sortedColItems;
      this._sortedIds;
      //this._itemKeys;
      this._scrollBar;
      this._matrixOverallWidth = 0;
      this._matrixOverallHeight;
      this._placedStarCoutner;
      this._$matrix;
      this._$inner;
      this._$head;
      this._$colItems;
      this._$body;
    }
    _createClass(MatrixViewController, [{
      key: "show",
      value: function show() {
        var _this = this;
        if (!this._isInitialized) {
          this._isInitialized = true;
          this._sortedColItems = [];
          //this._itemKeys = {};

          // ソート
          this._sortBy = __g.userDefaults.matrix.sortBy;
          this._sortedIds = _sort(this._sortBy, true);

          // キーのソート
          this._sortedColItems = __g.userDefaults.matrix.colItems;

          // 表組みの作成
          this.makeMatrix();

          // scroll bar
          this._scrollBar = new MatrixScrollbarView(this);
        }

        // event
        __g.app.$star.on({
          'mouseenter.matrix': function mouseenterMatrix(e) {
            _this._$body.children('.id-' + e.delegateTarget.getAttribute('data-id')).addClass('row-selected');
          },
          'mouseleave.matrix': function mouseleaveMatrix(e) {
            _this._$body.children('.id-' + e.delegateTarget.getAttribute('data-id')).removeClass('row-selected');
          }
        });

        // ノードに通知
        this._placedStarCoutner = 0;
        for (var i = 0; i < this._sortedIds.length; i++) {
          var id = this._sortedIds[i];
          __g.app.starsWithKeys[id].prepareMatrixView(i, this);
          this._placedStarCoutner++;
        }
      }
    }, {
      key: "makeMatrix",
      value: function makeMatrix() {
        var _this2 = this;
        var i,
          html = '',
          ids = this.datasets.ids();
        // html
        html += "\n\t\t\t<div id=\"matrix\">\n\t\t\t\t<div class=\"inner\">\n\t\t\t\t\t<header></header>\n\t\t\t\t\t<div id=\"matrix-body\"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t";
        __g.app.$main.append(html);
        this._matrixOverallHeight = ORIGIN$1.Y + ids.length * CELL.HEIGHT + PADDING_BOTTOM;
        this._$matrix = $('#matrix').css('height', this._matrixOverallHeight);
        this._$inner = this._$matrix.children('.inner');
        this._$head = this._$inner.children('header');
        this._$body = $('#matrix-body');

        // セルオブジェクト生成
        for (i = 0; i < this._sortedColItems.length; i++) {
          //this._itemKeys[this._sortedColItems[i]] = new MatrixItemView(this._sortedColItems[i], i, this);
          new MatrixItemView(this._sortedColItems[i], i, this);
          this._matrixOverallWidth += CELL.WIDTH;
        }
        this._matrixOverallWidth -= CELL.WIDTH; // aphabetical分をデクリメント
        this._$colItems = this._$matrix.find('div.cell.item-Alphabetical, div.inner header div.cell');
        // 合計値
        var height = ORIGIN$1.Y + ids.length * CELL.HEIGHT;
        this._$body.find('.id-sum').css('top', height);
        // padding
        this._$inner.append("\n\t\t\t<div id=\"matrix-right\" style=\"left: ".concat(ORIGIN$1.X + this._matrixOverallWidth, "px;\"></div>\n\t\t"));
        this._$matrix.append("\n\t\t\t<div class=\"matrix-sum\" style=\"top: ".concat(height, "px;\">\n\t\t\t\t<p lang=\"ja\">\u5408\u8A08</p>\n\t\t\t\t<p lang=\"en\">Total</p>\n\t\t\t</div>\n\t\t\t<div id=\"matrix-bottom\" style=\"top: ").concat(height + CELL.HEIGHT, "px; width: ").concat(this._matrixOverallWidth + PADDING_RIGHT, "px;\"></div>\n\t\t"));
        this._matrixOverallWidth += PADDING_RIGHT;

        // comma
        _placeComma(this._$body);

        // events
        // sort
        this._$colItems.filter("[data-sort=\"".concat(this._sortBy, "\"]")).addClass('selected');
        this._$colItems.on('click', function (e) {
          var $cell;
          if (e.delegateTarget.classList.contains('selected')) {
            $cell = _this2._$colItems.filter("[data-sort=\"".concat(_this2._sortBy, "\"]"));
            $cell.data('ascend', $cell.data('ascend') === 'ascend' ? 'descend' : 'ascend');
          } else {
            // 現在選択中のセルを解除
            _this2._$colItems.filter("[data-sort=\"".concat(_this2._sortBy, "\"]")).removeClass('selected');
            // セルの選択
            _this2._sortBy = e.delegateTarget.getAttribute('data-sort');
            $cell = _this2._$colItems.filter("[data-sort=\"".concat(_this2._sortBy, "\"]")).addClass('selected');
          }
          // ソートの実行
          _this2.sort($cell.data('sort'), $cell.data('ascend') === 'ascend');
        });
        // cell hover
        this._$body.children('div.cell').on({
          // body cell
          mouseenter: function mouseenter(e) {
            var sort = e.delegateTarget.dataset.sort,
              id = e.delegateTarget.dataset.id;
            _this2._$body.children(".item-".concat(sort)).addClass('col-selected');
            _this2._$head.children(".item-".concat(sort)).addClass('col-selected');
            _this2._$body.children(".id-".concat(id)).addClass('row-selected');
            __g.app.$star.filter("[data-id=\"".concat(e.delegateTarget.getAttribute('data-id'), "\"]")).addClass('row-selected');
          },
          mouseleave: function mouseleave(e) {
            var sort = e.delegateTarget.dataset.sort,
              id = e.delegateTarget.dataset.id;
            _this2._$body.children(".item-".concat(sort)).removeClass('col-selected');
            _this2._$head.children(".item-".concat(sort)).removeClass('col-selected');
            _this2._$body.children(".id-".concat(id)).removeClass('row-selected');
            __g.app.$star.filter("[data-id=\"".concat(e.delegateTarget.getAttribute('data-id'), "\"]")).removeClass('row-selected');
          }
        });
        this._$head.children('div.cell').on({
          // header cell
          mouseenter: function mouseenter(e) {
            _this2._$body.children('.item-' + e.delegateTarget.getAttribute('data-sort')).addClass('col-selected');
          },
          mouseleave: function mouseleave(e) {
            _this2._$body.children('.item-' + e.delegateTarget.getAttribute('data-sort')).removeClass('col-selected');
          }
        });
        this._$matrix.find('div.item-Alphabetical').on({
          mouseenter: function mouseenter() {
            __g.app.$star.addClass('row-selected');
          },
          mouseleave: function mouseleave() {
            __g.app.$star.removeClass('row-selected');
          }
        });
        // alphabetical
      }
    }, {
      key: "placedStar",
      value: function placedStar() {
        if (--this._placedStarCoutner === 0) {
          // 遷移終了
          this._$matrix.addClass('placed');
          __g.app.changed(__g.VIEWS_NAME.indexOf('statistics'));

          // scroll bar
          this._scrollBar.enable();
        }
      }
    }, {
      key: "sort",
      value: function sort(itemName, isAscend) {
        this._sortBy = itemName;
        this._sortedIds = _sort(this._sortBy, isAscend);
        for (var i = 0; i < this._sortedIds.length; i++) {
          var id = this._sortedIds[i];
          __g.app.starsWithKeys[id].matrixReplace(i);
        }
        // userDefaults
        this._sortedColItems.forEach(function (item) {
          if (item.name === itemName) {
            item.isAscend = isAscend;
          }
        });
        __g.userDefaults.matrix.sortBy = this._sortBy;
        __g.userDefaults.matrix.colItems = this._sortedColItems;
      }
    }, {
      key: "hide",
      value: function hide() {
        this._scrollBar.disable();
        __g.app.$stars.children('.star').removeClass('row-selected');
        __g.app.$star.off('mouseenter.matrix mouseleave.matrix');
        //this._scrollBar = null;
      }
    }], [{
      key: "ORIGIN",
      get: function get() {
        return ORIGIN$1;
      }
    }, {
      key: "CELL",
      get: function get() {
        return CELL;
      }
    }]);
    return MatrixViewController;
  }(); // ********** end of MatrixViewController class

  /* Graph view manager class
   * グラフビュー管理クラス
   * 
   */
  var GraphViewController = /*#__PURE__*/function () {
    function GraphViewController() {
      _classCallCheck(this, GraphViewController);
    }
    _createClass(GraphViewController, [{
      key: "show",
      value: function show() {
        this.receiveNotificationChangeSizing();
        // tick
        __g.d3.force.on('tick', function () {
          __g.d3.linksSelection.attr('x1', function (d) {
            return d.source.x;
          }).attr('y1', function (d) {
            return d.source.y;
          }).attr('x2', function (d) {
            return d.target.x;
          }).attr('y2', function (d) {
            return d.target.y;
          });
          __g.d3.nodesSelection.style('left', function (d) {
            return d.x + __g.SVG_MARGIN_LEFT + 'px';
          }).style('top', function (d) {
            return d.y + 'px';
          });
          __g.d3.linksSelection.each(function () {
            // number of triples
            this.d3NumberOfTriples.attr('x', (parseFloat(this.getAttribute('x1')) + parseFloat(this.getAttribute('x2'))) * 0.5).attr('y', (parseFloat(this.getAttribute('y1')) + parseFloat(this.getAttribute('y2'))) * 0.5 + 3);
          });
        }).restart();
        $w.trigger('resize.mainViewControl');

        // イベントのバインド
        __g.app.addNotificationObserver('change-scaling', this, this.receiveNotificationChangeSizing);
        __g.app.stars.forEach(function (star) {
          star.prepareGraphView();
        });

        // 遷移終了	
        window.setTimeout(function () {
          __g.app.changed(__g.VIEWS_NAME.indexOf('network'));
        }, 100);
      }
    }, {
      key: "hide",
      value: function hide() {
        __g.d3.force.stop().on('tick', null);
        __g.app.removeNotificationObserver('change-scaling', this);
        __g.app.stars.forEach(function (star) {
          star.prepareLeaveFromGraphView();
        });
      }
    }, {
      key: "receiveNotificationChangeSizing",
      value: function receiveNotificationChangeSizing() {
        __g.app.stars.forEach(function (star) {
          star.prepareGraphView();
        });
        __g.d3.force.force('collide',
        // ノード間の接触反発力
        d3.forceCollide().radius(function (d) {
          return d.star.size * .5 + 20;
        }) // ノード半径
        .strength(1.0) // オーバーラップするノード間の反発力 0.0〜1.0
        .iterations(16) // 計算回数
        ).restart();
      } // function receiveNotificationChangeSizing
    }]);
    return GraphViewController;
  }(); // ********** end of GraphViewController class

  var PATH = './documents/';

  /* Manual view manager class
   * マニュアルビュー管理クラス
   * 
   */
  var ManualViewController = /*#__PURE__*/function () {
    function ManualViewController() {
      _classCallCheck(this, ManualViewController);
      this.$view = $('#manual-view');
    }
    _createClass(ManualViewController, [{
      key: "show",
      value: function show(params) {
        var _this = this;
        var documentName = params ? params.id : 'top';
        $.when(
        // Documents の内容が記述されたMarkDownファイルの読み込み
        $.ajax({
          url: "".concat(PATH).concat(documentName, ".en.md"),
          dataType: 'text'
        }), $.ajax({
          url: "".concat(PATH).concat(documentName, ".ja.md"),
          dataType: 'text'
        })).done(function (en, ja) {
          var contents = {
            en: en[0],
            ja: ja[0]
          };
          var _loop = function _loop() {
            // 各言語ごとの処理
            var content = contents[lang],
              htmlText = marked(content).replace(/<pre><code>/g, '<textarea>').replace(/<\/code><\/pre>/g, '</textarea>'),
              htmlElements = $.parseHTML(htmlText),
              $container = _this.$view.find(".seciton-body[lang=\"".concat(lang, "\"]"));
            $container.html('');
            var section = document.createElement('section');
            // HTMLElement を回してレンダリング
            $(htmlElements).each(function (index, elm) {
              if (elm.nodeType === Node.ELEMENT_NODE) {
                if (0 < index && elm.tagName === 'H2') {
                  // HTMLElement が大見出しの場合、パラグラフを切る
                  $container.append(section);
                  section = document.createElement('section');
                }
                section.appendChild(elm);
              }
              $container.append(section);
            });
          };
          for (var lang in contents) {
            _loop();
          }
          // リンク
          _this.$view.find('.documents-index a').each(function (index, elm) {
            elm.href = "".concat(__g.rootPath, "documents/").concat(elm.getAttribute('href'));
          });
          // CodeMirror
          _this.$view.find('textarea').each(function (index, elm) {
            CodeMirror.fromTextArea(elm, {
              mode: 'application/sparql-query',
              matchBrackets: true,
              lineNumbers: true
            });
          });
          window.setTimeout(function () {
            __g.app.changed(__g.VIEWS_NAME.indexOf('documents'));
          }, self.SHOW_DURATION);
        });
        this.$view.addClass('shown');
      }
    }, {
      key: "hide",
      value: function hide() {
        this.$view.removeClass('shown');
      }
    }]);
    return ManualViewController;
  }(); // ********** end of ManualViewController class

  /* Guideline view manager class
   * ガイドラインビュー管理クラス
   * 
   */
  var GuidelineViewController = /*#__PURE__*/function () {
    function GuidelineViewController() {
      _classCallCheck(this, GuidelineViewController);
    }
    _createClass(GuidelineViewController, [{
      key: "show",
      value: function show() {
        $('#guideline-view').addClass('shown');
        window.setTimeout(function () {
          __g.app.changed(__g.VIEWS_NAME.indexOf('guideline'));
        }, self.SHOW_DURATION);
      }
    }, {
      key: "hide",
      value: function hide() {
        $('#guideline-view').removeClass('shown');
      }
    }]);
    return GuidelineViewController;
  }(); // ********** end of GuidelineViewController class

  var MAX = 5;

  /* Change log view manager class
   * 更新履歴ビュー管理クラス
   * 
   */
  var ChangeLogViewController = /*#__PURE__*/function () {
    function ChangeLogViewController() {
      var _this = this;
      _classCallCheck(this, ChangeLogViewController);
      this._isInitialized = false;
      this._$ = $('#changelog-view');
      $.getJSON(__g.rootPath + 'change-log.json', function (logJson) {
        var $homeChangeLogH2 = $('#home-change-log > h2');
        var html = '';
        _this._changeLog = logJson.change_log;
        for (var i = 0; i < Math.min(_this._changeLog.length, MAX); i++) {
          var log = _this._changeLog[i];
          html += "\n\t\t\t\t\t<dl data-index=\"".concat(i, "\">\n\t\t\t\t\t\t<dt>").concat(log.date, "</dt>\n\t\t\t\t\t\t<dd>\n\t\t\t\t\t\t\t<span lang=\"en\">").concat(log.title.en, "</span>\n\t\t\t\t\t\t\t<span lang=\"ja\">").concat(log.title.ja, "</span>\n\t\t\t\t\t\t</dd>\n\t\t\t\t\t</dl>");
        }
        $homeChangeLogH2.after(html);
        $('#home-change-log dl').on('click', function (e) {
          __g.app.changeView(__g.VIEWS.changeLog, {
            index: e.delegateTarget.dataset.index
          });
        });
      });
    }
    _createClass(ChangeLogViewController, [{
      key: "show",
      value: function show(params) {
        this._$.addClass('shown');
        window.setTimeout(function () {
          __g.app.changed(__g.VIEWS_NAME.indexOf('changeLog'));
        }, 0);
        if (!this._isInitialized) {
          this._isInitialized = true;
          // rendering
          var html = '';
          for (var i = 0; i < this._changeLog.length; i++) {
            var log = this._changeLog[i];
            html += "\n\t\t\t\t\t<article id=\"change-log".concat(i, "\">\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<h4>\n\t\t\t\t\t\t\t\t<span lang=\"en\">").concat(log.title.en, "</span>\n\t\t\t\t\t\t\t\t<span lang=\"ja\">").concat(log.title.ja, "</span>\n\t\t\t\t\t\t\t</h4>\n\t\t\t\t\t\t\t<time>").concat(log.date, "</time>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t\t<section class=\"seciton-body\" lang=\"en\">").concat(log.article.en, "</section>\n\t\t\t\t\t\t<section class=\"seciton-body\" lang=\"ja\">").concat(log.article.ja, "</section>\n\t\t\t\t\t</article>");
          }
          this._$.find('.seciton-body').append(html);
        }
        // scroll
        if (params) {
          var $targetArticle = this._$.find("#change-log".concat(params.index));
          setTimeout(function () {
            $('html, body').animate({
              scrollTop: $targetArticle.offset().top
            }, {
              duration: 400
            });
          }, 200);
        }
      }
    }, {
      key: "hide",
      value: function hide() {
        this._$.removeClass('shown');
      }
    }]);
    return ChangeLogViewController;
  }(); // ********** end of ChangeLogViewController class

  var EXCLUSIVE_WORDS = ['of', 'and'],
    CANVAS_SIZE = 300,
    CANVAS_MARGIN = 0,
    FONT_SIZE = 100;
  var offScreenCanvasContainer;

  /* Star image class
   * 星のロゴ画像生成クラス
   * @param _id String
   * @param _$container jQuery
   * 
   */
  var StarImage = /*#__PURE__*/function () {
    function StarImage(_id, _$container, _callback) {
      var _this = this;
      _classCallCheck(this, StarImage);
      this._id = _id;
      this._callback = _callback;
      this._logotypeUrl;
      this._img;
      this._bgColor;
      this._$container = _$container;
      this._$img;
      //this._$icon;
      offScreenCanvasContainer = offScreenCanvasContainer ? offScreenCanvasContainer : document.getElementById('offscreen-canvas-container');
      this._logotypeUrl = __g.app.datasets.logotypeUrl(_id);
      if (this._logotypeUrl) {
        // ロゴあり
        this._img = new Image();
        this._img.src = this._logotypeUrl;
        if (this._img.complete) {
          this.generateIconFromImg();
        } else {
          this._img.onload = function () {
            return _this.generateIconFromImg();
          };
          this._img.onerror = function () {
            return _this.generateIconFromText();
          };
        }
      } else {
        // ロゴ無し
        this.generateIconFromText();
      }
    }
    _createClass(StarImage, [{
      key: "generateCanvas",
      value: function generateCanvas() {
        var canvas;
        canvas = document.createElement('canvas');
        canvas.id = 'canvas' + __g.canvasId++;
        canvas.height = CANVAS_SIZE;
        canvas.width = CANVAS_SIZE;
        canvas.className = 'offscreen';
        offScreenCanvasContainer.appendChild(canvas);
        return canvas;
      }

      // 頭字でアイコンを作る
    }, {
      key: "generateIconFromText",
      value: function generateIconFromText() {
        var title = __g.app.datasets.title(this._id).en,
          titleWords = title.split(' '),
          acronym = '',
          fontSize = FONT_SIZE,
          textMaxWidth = CANVAS_SIZE - CANVAS_MARGIN * 2,
          canvas,
          ctx,
          metrics;

        // 頭字語の生成
        titleWords.forEach(function (elm) {
          return acronym += EXCLUSIVE_WORDS.indexOf(elm) === -1 ? elm.charAt(0) : '';
        });
        acronym = acronym.toUpperCase();

        // canvasでイメージの生成
        canvas = this.generateCanvas();
        ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE / 2, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.fillStyle = '#123456';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = fontSize + 'px "Lato"';
        metrics = ctx.measureText(acronym);
        if (textMaxWidth < metrics.width) {
          fontSize *= textMaxWidth / metrics.width;
          ctx.font = fontSize + 'px "Lato"';
        }
        ctx.fillText(acronym, CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE);
        this._logotypeUrl = canvas.toDataURL();
        offScreenCanvasContainer.removeChild(canvas);
        this.generateIcon();
      }

      // 画像の読込完了
    }, {
      key: "generateIconFromImg",
      value: function generateIconFromImg() {
        var canvas, ctx, dx, dy, dw, dh;

        // canvasでイメージの生成
        canvas = this.generateCanvas();
        ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE / 2, 0, Math.PI * 2, true);
        ctx.clip();
        if (this._img.naturalWidth < this._img.naturalHeight) {
          dh = CANVAS_SIZE - CANVAS_MARGIN * 2;
          dw = this._img.naturalWidth * (dh / this._img.naturalHeight);
          dx = CANVAS_MARGIN + (dh - dw) * 0.5;
          dy = CANVAS_MARGIN;
        } else {
          dw = CANVAS_SIZE - CANVAS_MARGIN * 2;
          dh = this._img.naturalHeight * (dw / this._img.naturalWidth);
          dx = CANVAS_MARGIN;
          dy = CANVAS_MARGIN + (dw - dh) * 0.5;
        }
        ctx.drawImage(this._img, dx, dy, dw, dh);
        this._logotypeUrl = canvas.toDataURL();
        offScreenCanvasContainer.removeChild(canvas);
        this.generateIcon();
      }
    }, {
      key: "generateIcon",
      value: function generateIcon() {
        $('.icon', this._$container).append('<img data-adaptive-background="1" src="' + this._logotypeUrl + '">');
        this._$img = $('img', this._$container);
        this._$img.on('ab-color-found', function (e, payload) {
          this._bgColor = payload.color;
          this._bgColor = this._bgColor === 'rgb()' ? 'rgb(255,255,255)' : this._bgColor;
        });
        // アプリにロゴ画像読込完了を通知
        if (typeof this._callback === 'function') {
          this._callback();
        }
      }
    }]);
    return StarImage;
  }(); // ********** end of Star image class

  var ORIGIN = {
      X: 113,
      Y: 86
    },
    OFFSET = {
      X: -60,
      Y: 0
    };

  /* Detail view manager class
   * 詳細ビュー管理クラス
   *
   */
  var DetailViewController = /*#__PURE__*/function () {
    function DetailViewController() {
      _classCallCheck(this, DetailViewController);
      this._counter = 0;
      this._$currentDetailView;
      this._$frame;
      $("body").append('<div id="detail-view-frame"><div class="inner"></div></div>');
      this._$frame = $("#detail-view-frame").children(".inner").on("animationend webkitAnimationEnd oAnimationEnd", function (e) {
        //$(this).removeClass('frame-in frame-out');
        $(e.delegateTarget).removeClass("frame-in frame-out");
      });
    }
    _createClass(DetailViewController, [{
      key: "show",
      value: function show() {
        var _this = this;
        $("body, html").animate({
          scrollTop: 0
        }, __g.DETAIL_DELAY, "swing");
        window.setTimeout(function () {
          _this.makeDetailView();
        }, __g.DETAIL_DELAY * 0.25);
        this._$frame.addClass("frame-in");
      }
    }, {
      key: "makeDetailView",
      value: function makeDetailView() {
        var _this2 = this;
        var STR = __g.STRINGS,
          ID_SPECIFICATION = "detail-specification",
          ID_CONNECTED_DATASETS = "detail-connected-datasets",
          ID_STATISTICS = "detail-statistics",
          ID_SCHEMA = "detail-schema",
          ID_SPARQL_EXAMPLES = "detail-sparql-examples",
          html,
          i,
          j,
          width,
          $connectedDataset,
          $detailNavigationItems,
          _$schemaImages,
          datasets = __g.app.datasets,
          starId = __g.app.currentStarId,
          //starId = window.location.pathname.split('/').pop(),
          noOfConnectedDatasets = datasets.connectedDatasetIds.noOf(starId) + datasets.xref.noOf(starId),
          noOfSPARQLExamples = datasets.SPARQLExamples.noOf(starId),
          noOfSchema = datasets.schema.noOf(starId),
          // スタンザは出力しないよう、一時的に0を代入
          disposableStarIds = [],
          cmEditor,
          cmEditors = [];
        console.log(datasets);

        // スター（ノード）に通知
        __g.app.stars.forEach(function (star) {
          star.prepareDetailView(starId);
        });

        // ディティールビューを生成
        html = "<div id=\"detail-view".concat(this._counter, "\" class=\"detail-view\">") + _html("h2", _MLHtml(datasets.title(starId))) + "<p class=\"homepage\">".concat(_MLAnchor(datasets.uri(starId), STR.launch), "</p>") + "<div class=\"description\">".concat(_MLHtml(datasets.description(starId)), "</div>") + _html("aside", {
          id: ID_SPECIFICATION,
          class: "specification"
        },
        // #### Specification
        _html("h3", _MLHtml(STR.specification)) + _html("table", {
          class: "horizontal-table"
        }, _html("tbody", {
          class: "specification"
        }, _htmlTR(_MLHtml(STR.tags), function () {
          // tags
          var subHtml = '<ul class="tags">',
            tag;
          for (i = 0; i < datasets.tags.noOf(starId); i++) {
            tag = datasets.tags.tag(starId, i);
            subHtml += "<li class=\"tag-".concat(_sanitizeTag(tag.en), "\">").concat(_MLHtml(tag), "</li>");
          }
          subHtml += "</ul>";
          return subHtml;
        }()) + _htmlTR(_MLHtml(STR.dataProvider), _MLHtml(datasets.dataProvider(starId))) + _htmlTR(_MLHtml(STR.creators), function () {
          var numberOfCreators = datasets.creators.noOf(starId),
            subHtml = "<ul>";
          for (i = 0; i < numberOfCreators; i++) {
            subHtml += "<li>".concat(_MLHtml(datasets.creators.name(starId, i)), "&nbsp;&nbsp;<small>").concat(_MLHtml(datasets.creators.affiliation(starId, i)), "</small></li>");
          }
          return subHtml + "</ul>";
        }()) + _htmlTR(_MLHtml(STR.version), datasets.version(starId)) + _htmlTR(_MLHtml(STR.issued), datasets.issued(starId)) + function () {
          return datasets.license.uri(starId)[__g.app.language] === "" ? "" : _htmlTR(_MLHtml(STR.license), _MLAnchor(datasets.license.uri(starId), datasets.license.name(starId)) + "<br>" + _MLHtml(datasets.license.credit(starId)));
        }() + _htmlTR(_MLHtml(STR.status), "<div class=\"reviewed-icon".concat(datasets.reviewed(starId) === "reviewed" ? "" : " -unreviewed", "\"></div> <span>").concat(_MLHtml(datasets.reviewed(starId) === "reviewed" ? STR.reviewed : STR.unreviewed), "</span>") + "<div class=\"star\" data-provided-as=\"".concat(datasets.providedAs(starId), "\"><div class=\"icon\"><div class=\"body\"></div></div></div><span>").concat(_MLHtml(datasets.providedAs(starId) === "original" ? STR.originalDataset : STR.thirdPartyDataset), "</span>")) + _htmlTR(_MLHtml(STR.downloadFile), _html("p", {
          class: "file"
        }, _html("a", {
          href: datasets.downloadFile.uri(starId)
        }, datasets.downloadFile.name(starId)) + " " + _html("small", _numeral(datasets.downloadFile.size(starId)) + " bytes"))) /* + // ガイドライン一時的にコメントアウト
                                                                                                                                 _htmlTR( _MLHtml( STR.responseToRDFGuideline ),
                                                                                                                                 (function(){
                                                                                                                                 const guideline = datasets.guideline(starId);
                                                                                                                                 if (!guideline) return '';
                                                                                                                                 let numberOfApplied = 0, numberOfNA = 0, html = '<ul class="guidline-outline">';
                                                                                                                                 for (var i in guideline) {
                                                                                                                                 numberOfApplied += guideline[i] === '1';
                                                                                                                                 numberOfNA += guideline[i] === 'NA';
                                                                                                                                 html += `<li class="status-${guideline[i]}">${i}<div class="definition">${__g.guideline[i]}</div></li>`;
                                                                                                                                 }
                                                                                                                                 html = `<div class="guideline-applied-bar"><div style="width: ${numberOfApplied / (Object.keys(guideline).length - numberOfNA) * 100}%"></div></div>${html}</ul>`;
                                                                                                                                 return html.replace('status-?', 'status-question');
                                                                                                                                 })()
                                                                                                                                 )*/))) + function () {
          // #### 関連データセット
          var subHtml1 = "";
          if (noOfConnectedDatasets > 0) {
            // 関連データセットのソート
            subHtml1 += _html("aside", {
              id: ID_CONNECTED_DATASETS,
              class: "connected-dataset-ids"
            }, _MLHtml("h3", STR.connectedDatasetIDs) + _html("div", {
              class: "stars"
            }, function () {
              var subHtml2 = "",
                id,
                type,
                disposableStarId,
                maxTriples = 0,
                noOfTriples = [],
                noOfConnectedDatasets = datasets.connectedDatasetIds.noOf(starId),
                noOfXrefs = datasets.xref.noOf(starId);
              // calculation
              for (i = 0; i < noOfConnectedDatasets; i++) {
                noOfTriples[i] = datasets.connectedDatasetIds.noOfTriple(starId, i);
                maxTriples = maxTriples > noOfTriples[i] ? maxTriples : noOfTriples[i];
              }
              for (j = 0; j < noOfXrefs; j++) {
                noOfTriples[i + j] = datasets.xref.noOfTriples(starId, j);
                maxTriples = maxTriples > noOfTriples[i + j] ? maxTriples : noOfTriples[i + j];
              }
              // internal
              for (i = 0; i < noOfConnectedDatasets; i++) {
                disposableStarId = "disposableStar" + __g.disposableStarId++;
                id = datasets.connectedDatasetIds.id(starId, i);
                type = datasets.connectedDatasetIds.type(starId, i);
                subHtml2 += "<div id=\"".concat(disposableStarId, "\" class=\"star\" data-id=\"").concat(id, "\" data-type=\"").concat(type, "\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"icon\"></div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"label\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t").concat(_MLHtml("h2", datasets.title(id)), "\n\t\t\t\t\t\t\t\t\t\t\t\t\t").concat(type ? "<p class=\"link-type\">".concat(type, "</p>") : "", "\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"bar\" style=\"width: ").concat(noOfTriples[i] / maxTriples * 75, "%;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"number-of-triples\">").concat(_numeral(noOfTriples[i]), "<small>links</small></p>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>");
                disposableStarIds.push(disposableStarId);
              }
              for (j = 0; j < noOfXrefs; j++) {
                type = datasets.xref.type(starId, j);
                subHtml2 += "\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"star xref\" data-type=\"".concat(type, "\">\n\t\t\t\t\t\t\t\t\t\t\t\t<a class=\"icon\" href=\"").concat(datasets.xref.uri(starId, j), "\" target=\"_blank\"></a>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"label\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t").concat(_MLHtml("h2", datasets.xref.title(starId, j)), "\n\t\t\t\t\t\t\t\t\t\t\t\t\t").concat(type ? "<p class=\"link-type\">".concat(type, "</p>") : "", "\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"bar\" style=\"width: ").concat(noOfTriples[i + j] / maxTriples * 75, "%;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"number-of-triples\">").concat(_numeral(noOfTriples[i + j]), "<small>links</small></p>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>");
              }
              // external
              return subHtml2;
            }()));
          }
          return subHtml1;
        }() + _html("aside", {
          id: ID_STATISTICS,
          class: "statistics"
        },
        // #### 統計情報
        _MLHtml("h3", STR.statistics) + _html("table", {
          class: "horizontal-table"
        }, _htmlStatics(starId) + _htmlHasDetailAndDetail("graphs") +
        // Graphs
        _htmlHasDetailAndDetail("ontologies") // Ontologies
        )) + function () {
          // #### Schema
          if (noOfSchema === 0) {
            return "";
          }
          var subHtml = "";
          for (var i = 0; i < noOfSchema; i++) {
            subHtml += '<a href="' + datasets.schema.imageUri(starId, i) + '" target="_blank" class="schema">' + '<img src="' + datasets.schema.imageUri(starId, i) + '" alt="">' + _MLHtml("span", {
              class: "open"
            }, STR.open) + "</a>";
          }
          subHtml = _html("aside", {
            id: ID_SCHEMA,
            class: "schema"
          }, _MLHtml("h3", STR.schema) + _html("div", {
            class: "images"
          }, subHtml));
          return subHtml;
        }() + function () {
          // #### SPARQL examples
          if (noOfSPARQLExamples === 0) {
            return "";
          }
          var subHtml1 = _html("aside", {
            id: ID_SPARQL_EXAMPLES,
            class: "sparql-examples"
          }, _MLHtml("h3", STR.sparqlExamples) + function () {
            var subHtml2 = "";
            for (var i = 0; i < datasets.SPARQLExamples.noOf(starId); i++) {
              subHtml2 += _html("div", {
                class: "sparql"
              }, '<textarea class="sparql-textarea">' + datasets.SPARQLExamples.sparql(starId, i) + "</textarea>" + _html("form", {
                action: datasets.SPARQLExamples.uri(starId, i),
                target: "_blank",
                method: "GET"
              }, _html("button", {
                type: "submit"
              }, _MLHtml(STR.sparqlEndpoint)) + _html("input", {
                type: "hidden",
                name: "query",
                value: datasets.SPARQLExamples.sparql(starId, i).replace(/"/g, "&quot;")
              }, "")));
            }
            return subHtml2;
          }());
          return subHtml1;
        }() + function () {
          // #### Stanza
          //// Rubby wrapper CASE
          {
            return "";
          }
        }() + "</div><!-- /.detail-view -->" + function () {
          // navigation
          var subHtml = '<nav class="detail-navigation">';
          subHtml += _html("a", {
            href: "#" + ID_SPECIFICATION
          }, _MLHtml("h3", STR.specification));
          subHtml += noOfConnectedDatasets > 0 ? _html("a", {
            href: "#" + ID_CONNECTED_DATASETS
          }, _MLHtml("h3", STR.connectedDatasetIDs)) : "";
          subHtml += _html("a", {
            href: "#" + ID_STATISTICS
          }, _MLHtml("h3", STR.statistics));
          subHtml += noOfSchema !== 0 ? _html("a", {
            href: "#" + ID_SCHEMA
          }, _MLHtml("h3", STR.schema)) : "";
          subHtml += noOfSPARQLExamples > 0 ? _html("a", {
            href: "#" + ID_SPARQL_EXAMPLES
          }, _MLHtml("h3", STR.sparqlExamples)) : "";
          subHtml += "";
          return subHtml + "</nav>";
        }();
        __g.app.$main.append(html);
        this._$currentDetailView = $("#detail-view" + this._counter++);
        //$detailView = __g.append
        __g.app.$main.children(".detail-view");
        _$schemaImages = $("#detail-schema").children(".images");

        // comma
        _placeComma(this._$currentDetailView);

        // CodeMirror
        width = $w.innerWidth() - __g.DETAIL_MARGIN;
        this._$currentDetailView.find(".sparql-examples").find("textarea").each(function () {
          cmEditor = CodeMirror.fromTextArea(this, {
            mode: "application/sparql-query",
            matchBrackets: true,
            lineNumbers: true
          });
          cmEditors.push(cmEditor);
          cmEditor.setSize(width, "auto");
        });

        // スタンザのパラメータを変更するとスタンザ更新
        this._$currentDetailView.find(".stanza input").on("change", function () {
          var $stanza = $(this).parents(".stanza"),
            $iframe = $stanza.find("iframe"),
            src = $iframe.attr("src"),
            $parameters = $stanza.find(".parameter");
          src = src.substring(0, src.indexOf("&options=") + 1) + "&options=";
          for (var i = 0; i < $parameters.length; i++) {
            var $parameter = $($parameters[i]);
            src += (i === 0 ? "" : "+") + $parameter.find("p.key").text() + "=" + $parameter.find("input").val();
          }
          $iframe.attr("src", src);
        });

        // ナブゲーション押下でスムーズスクロール
        $detailNavigationItems = __g.app.$main.children("nav.detail-navigation").find("a").each(function () {
          this.$ = $(this);
          this.$target = $(this.getAttribute("href"));
        }).on("click", function () {
          var top = this.$target.offset().top;
          $("body, html").animate({
            scrollTop: top
          }, 400, "swing");
          return false;
        });
        $w.on({
          "scroll.detail-navigation": function scrollDetailNavigation() {
            // 画面中に収まっている項目を指示
            var scrollTop = $w.scrollTop(),
              scrollBottom = scrollTop + $w.innerHeight();
            $detailNavigationItems.each(function () {
              var top = this.$target.offset().top,
                bottom = top + this.$target.innerHeight();
              if (bottom < scrollTop || scrollBottom < top) {
                this.$.removeClass("within");
              } else {
                this.$.addClass("within");
              }
            });
          },
          "resize.detail-code-mirror": function resizeDetailCodeMirror() {
            width = $w.innerWidth() - __g.DETAIL_MARGIN;
            _$schemaImages.width(width);
            for (i = 0; i < cmEditors.length; i++) {
              cmEditors[i].setSize(width, "auto");
            }
          }
        }).triggerHandler("scroll.detail-navigation");

        // 関連データセットのノード
        for (i = 0; i < disposableStarIds.length; i++) {
          $connectedDataset = $("#" + disposableStarIds[i]);
          $connectedDataset.children(".icon").on("click", function () {
            __g.app.starsWithKeys[this.parentNode.getAttribute("data-id")].clickedAlias(this);
          });
          new StarImage(datasets.connectedDatasetIds.id(starId, i), $connectedDataset);
        }

        // 子項目を持つ要素の折りたたみとインタラクション定義
        var _setDetailCollapsible = function _setDetailCollapsible(elm) {
          $(elm).find(".has-detail").each(function () {
            if (this.isCollapsible === true) {
              return;
            }
            var isOpened = false,
              isLoaded = false,
              jsonKind = this.getAttribute("data-json-kind"),
              jsonUri = this.getAttribute("data-json-uri"),
              classification = this.getAttribute("data-classification"),
              index = parseInt(this.getAttribute("data-index")),
              $this = $(this),
              $closer = $this.next(".detail").children("td").children(".closer"),
              $closerInner = $closer.children(".closer-inner");
            this.isCollapsible = true;
            $closer.css({
              display: "block"
            });
            $closerInner.css("margin-bottom", -$closerInner.outerHeight());
            $w.on("resize.detail", function () {
              if (!isOpened) {
                $closerInner.css("margin-bottom", -$closerInner.outerHeight());
              }
            });
            $this.on("click", function () {
              isOpened = !isOpened;
              if (isOpened) {
                $this.addClass("opened");
                $closerInner.css("margin-bottom", 0);
              } else {
                $this.removeClass("opened");
                $closerInner.css("margin-bottom", -$closerInner.outerHeight());
              }
              if (jsonUri !== "undefined" && jsonUri !== undefined && jsonUri !== null && !isLoaded) {
                // ロード
                window.setTimeout(function () {
                  var DATASETS = classification === "undefined" ? __g.app.datasets[jsonKind] : __g.app.datasets[classification][jsonKind];
                  DATASETS.load(starId, function () {
                    _makeCollapsedTable(DATASETS, classification, jsonKind, index, 0, $this.next(".detail").find("tbody"));
                  }, index);
                }, 600);
              }
            });
          });
        };
        _setDetailCollapsible(this._$currentDetailView);

        // 折りたたまれたテーブルの生成
        var _makeCollapsedTable = function _makeCollapsedTable(DATASETS, classification, jsonKind, index, offset, $tbody) {
          var subHtml = "",
            uri,
            label,
            anchor,
            noOfDomainClasses,
            noOfRangeClasses,
            noOf = DATASETS.noOf(starId, index);

          // remove indicator
          $tbody.find("tr.loading, tr.more").remove();

          // html
          for (i = offset; i < offset + __g.DATA_LENGTH; i++) {
            if (i === noOf) {
              break;
            }
            switch (jsonKind) {
              case "classes":
                {
                  uri = DATASETS.class(starId, i, index);
                  label = DATASETS.label(starId, i, index);
                  anchor = typeof label === "string" ? _htmlAnchor(uri, label) : _MLAnchor(uri, label);
                  subHtml += _htmlTRValueNumeral(anchor, DATASETS.noOfInstances(starId, i, index));
                }
                break;
              case "properties":
                {
                  uri = DATASETS.property(starId, i, index);
                  noOfDomainClasses = DATASETS.domainClasses.noOf(starId, i, index);
                  noOfRangeClasses = DATASETS.rangeClasses.noOf(starId, i, index);
                  if (noOfDomainClasses === 0) {
                    subHtml += _htmlTRValueNumeral(_htmlAnchor(uri, uri), DATASETS.noOfTriples(starId, i, index));
                  } else {
                    // domain/range クラスを property の持つ場合
                    subHtml += _htmlTRHasDetailValueNumeral2(_htmlAnchor(uri, uri), DATASETS.noOfTriples(starId, i, index), "classes", undefined, classification, i) + _htmlTRDetail(function () {
                      var subHtml4 = _html("table", {
                        class: "internal left-heading domain-and-range-class"
                      }, _html("tbody", {
                        class: "domain-class"
                      }, function () {
                        // domain classes
                        var subHtml5 = "";
                        for (var k = 0; k < noOfDomainClasses; k++) {
                          subHtml5 += _html("tr", (k === 0 ? _MLHtml("th", {
                            rowspan: noOfDomainClasses
                          }, STR.domainClasses) : "") + _html("td", _htmlAnchor(DATASETS.domainClasses.domainClass(starId, k, i, index), _MLHtml(DATASETS.domainClasses.label(starId, k, i, index)))));
                        }
                        return subHtml5;
                      }()) + _html("tbody", {
                        class: "range-class"
                      }, function () {
                        // range classes
                        var subHtml5 = "";
                        for (var k = 0; k < noOfRangeClasses; k++) {
                          subHtml5 += _html("tr", (k === 0 ? _MLHtml("th", {
                            rowspan: noOfRangeClasses
                          }, STR.rangeClasses) : "") + _html("td", _htmlAnchor(DATASETS.rangeClasses.rangeClass(starId, k, i, index), _MLHtml(DATASETS.rangeClasses.label(starId, k, i, index)))));
                        }
                        return subHtml5;
                      }()));
                      return subHtml4;
                    }());
                  }
                }
                break;
            }
          }
          $tbody.append(subHtml);
          _setDetailCollapsible($tbody);
          _placeComma($tbody);

          // interaction
          if (i < noOf) {
            $tbody.append('<tr class="more"><td colspan="2">' + _MLHtml(__g.STRINGS.more) + "<small>(" + (i + 1) + "~)</small></td></tr>");
            $tbody.find("tr.more").on("click", function () {
              _makeCollapsedTable(DATASETS, classification, jsonKind, index, i, $tbody);
            });
          }
        };

        // 遷移終了
        window.setTimeout(function () {
          _this2._$currentDetailView.addClass("shown");
          __g.app.changed(__g.VIEWS_NAME.indexOf("dataset"));
        }, __g.DETAIL_DELAY * 0.25);
      }
    }, {
      key: "hide",
      value: function hide() {
        this._$currentDetailView.addClass("hidden").delay(__g.DETAIL_DELAY * 4).animate({
          opacity: 0
        }, {
          duration: __g.DETAIL_DELAY,
          complete: function complete() {
            $(this).remove();
          }
        });
        $w.off("scroll.detail-navigation resize.detail resize.detail-code-mirror");
        __g.app.$main.children("nav.detail-navigation").remove();
        __g.app.stars.forEach(function (star) {
          star.prepareLeaveFromDetailView();
        });
        this._$frame.addClass("frame-out");
      }

      // accessor
    }], [{
      key: "ORIGIN",
      get: function get() {
        return ORIGIN;
      }
    }, {
      key: "OFFSET",
      get: function get() {
        return OFFSET;
      }
    }]);
    return DetailViewController;
  }(); // ********** end of DetailViewController class

  /* Datasets class
   * データセットのアクセッサーシングルトンクラス
   * json データの変換・橋渡しを行う
   * @param param object
   * 
   */
  var Datasets = /*#__PURE__*/function () {
    function Datasets(data) {
      _classCallCheck(this, Datasets);
      this._noOfDatasets;
      this._classes = {};
      this._graphClasses = {};
      this._ontologyClasses = {};
      this._properties = {};
      this._graphProperties = {};
      this._ontologyProperties = {};
      this.data = data;
      var self = this;
      this.creators = {
        noOf: function noOf(id) {
          return data[id].creators.length;
        },
        name: function name(id, index) {
          return data[id].creators[index].name;
        },
        affiliation: function affiliation(id, index) {
          return data[id].creators[index].affiliation;
        }
      };
      this.version = function (id) {
        return data[id].version;
      };
      this.issued = function (id) {
        return data[id].issued;
      };
      this.logotypeUrl = function (id) {
        return data[id].logo_url;
      };
      this.schema = {
        noOf: function noOf(id) {
          return data[id].schema_image_urls.length;
        },
        imageUri: function imageUri(id, index) {
          return data[id].schema_image_urls[index];
        }
      };
      this.downloadFile = {
        name: function name(id) {
          return data[id].download_file.name;
        },
        uri: function uri(id) {
          return data[id].download_file.url;
        },
        size: function size(id) {
          return data[id].download_file.size;
        }
      };
      this.noOfTriples = function (id) {
        return data[id].number_of_triples;
      };
      this.noOfInstances = function (id) {
        return data[id].number_of_instances;
      };
      this.noOfSubjects = function (id) {
        return data[id].number_of_subjects;
      };
      this.noOfObjects = function (id) {
        return data[id].number_of_objects;
      };
      this.noOfLiterals = function (id) {
        return data[id].number_of_literals;
      };
      this.noOfClasses = function (id) {
        return data[id].number_of_classes;
      };
      this.noOfProperties = function (id) {
        return data[id].number_of_properties;
      };
      this.noOfDatatypes = function (id) {
        return data[id].number_of_datatypes;
      };
      this.noOfLinks = function (id) {
        return data[id].number_of_links;
      };
      this.classes = {
        noOf: function noOf(id) {
          return data[id].number_of_classes;
        },
        jsonUri: function jsonUri(id) {
          return data[id].classes;
        },
        load: function load(id, callback) {
          if (!self._classes[id]) {
            $.getJSON(self.classes.jsonUri(id), function (data) {
              self._classes[id] = data;
              callback();
            });
          }
        },
        class: function _class(id, index) {
          return self._classes[id][index].class;
        },
        label: function label(id, index) {
          return self._classes[id][index].label[__g.app.language];
        },
        noOfInstances: function noOfInstances(id, index) {
          return self._classes[id][index].number_of_instances;
        }
      };
      this.properties = {
        noOf: function noOf(id) {
          return data[id].number_of_properties;
        },
        jsonUri: function jsonUri(id) {
          return data[id].properties;
        },
        load: function load(id, callback) {
          if (!self._properties[id]) {
            $.getJSON(self.properties.jsonUri(id), function (data) {
              self._properties[id] = data;
              callback();
            });
          }
        },
        property: function property(id, index) {
          return self._properties[id][index].property;
        },
        noOfTriples: function noOfTriples(id, index) {
          return self._properties[id][index].number_of_triples;
        },
        domainClasses: {
          noOf: function noOf(id, index) {
            return self._properties[id][index].domain_classes.length;
          },
          domainClass: function domainClass(id, index, index2) {
            return self._properties[id][index2].domain_classes[index].domain_class;
          },
          label: function label(id, index, index2) {
            return self._properties[id][index2].domain_classes[index].label;
          },
          noOfInstances: function noOfInstances(id, index, index2) {
            return self._properties[id][index2].domain_classes[index].number_of_instances;
          }
        },
        rangeClasses: {
          noOf: function noOf(id, index) {
            return self._properties[id][index].range_classes.length;
          },
          rangeClass: function rangeClass(id, index, index2) {
            return self._properties[id][index2].range_classes[index].range_class;
          },
          label: function label(id, index, index2) {
            return self._properties[id][index2].range_classes[index].label;
          },
          noOfInstances: function noOfInstances(id, index, index2) {
            return self._properties[id][index2].range_classes[index].number_of_instances;
          }
        }
      };

      // datatype
      this.datatypes = {
        noOf: function noOf(id) {
          return data[id].number_of_datatypes;
        },
        datatype: function datatype(id, index) {
          return data[id].datatypes[index];
        }
      };

      // cross reference
      this.xref = {
        noOf: function noOf(id) {
          return data[id].xrefs.length;
        },
        uri: function uri(id, index) {
          return data[id].xrefs[index].uri_space;
        },
        type: function type(id, index) {
          return data[id].xrefs[index].type;
        },
        title: function title(id, index) {
          return data[id].xrefs[index].title;
        },
        noOfTriples: function noOfTriples(id, index) {
          return data[id].xrefs[index].number_of_triples;
        }
      };

      // connected
      this.connectedDatasetIds = {
        noOf: function noOf(id) {
          return data[id].connected_dataset_ids.length;
        },
        id: function id(_id, index) {
          return data[_id].connected_dataset_ids[index].id;
        },
        type: function type(id, index) {
          return data[id].connected_dataset_ids[index].type;
        },
        noOfTriple: function noOfTriple(id, index) {
          return data[id].connected_dataset_ids[index].number_of_triples;
        }
      };

      // ontology
      this.ontologies = {
        noOf: function noOf(id) {
          return data[id].ontologies.length;
        },
        uri: function uri(id, index) {
          return data[id].ontologies[index].uri;
        },
        description: function description(id, index) {
          return data[id].ontologies[index].description;
        },
        files: {
          noOf: function noOf(id, index) {
            return data[id].ontologies[index].files.length;
          },
          name: function name(id, index, index2) {
            return data[id].ontologies[index2].files[index].name;
          },
          uri: function uri(id, index, index2) {
            return data[id].ontologies[index2].files[index].url;
          },
          size: function size(id, index, index2) {
            return data[id].ontologies[index2].files[index].size;
          }
        },
        noOfTriples: function noOfTriples(id, index) {
          return data[id].ontologies[index].number_of_triples;
        },
        noOfInstances: function noOfInstances(id, index) {
          return data[id].ontologies[index].number_of_instances;
        },
        noOfSubjects: function noOfSubjects(id, index) {
          return data[id].ontologies[index].number_of_subjects;
        },
        noOfObjects: function noOfObjects(id, index) {
          return data[id].ontologies[index].number_of_objects;
        },
        noOfLiterals: function noOfLiterals(id, index) {
          return data[id].ontologies[index].number_of_literals;
        },
        classes: {
          noOf: function noOf(id, index) {
            return data[id].ontologies[index].number_of_classes;
          },
          jsonUri: function jsonUri(id, index) {
            return data[id].ontologies[index].classes;
          },
          load: function load(id, callback, index) {
            if (!self._ontologyClasses[id]) {
              self._ontologyClasses[id] = [];
            }
            if (!self._ontologyClasses[id][index]) {
              $.getJSON(self.classes.jsonUri(id), function (data) {
                self._ontologyClasses[id][index] = data;
                callback();
              });
            }
          },
          class: function _class(id, index, index2) {
            return self._ontologyClasses[id][index2][index].class;
          },
          label: function label(id, index, index2) {
            return self._ontologyClasses[id][index2][index].label;
          },
          noOfInstances: function noOfInstances(id, index, index2) {
            return self._ontologyClasses[id][index2][index].number_of_instances;
          }
        },
        properties: {
          noOf: function noOf(id, index) {
            return data[id].ontologies[index].number_of_properties;
          },
          jsonUri: function jsonUri(id, index) {
            return data[id].ontologies[index].properties;
          },
          load: function load(id, callback, index) {
            if (!self._ontologyProperties[id]) {
              self._ontologyProperties[id] = [];
            }
            if (!self._ontologyProperties[id][index]) {
              $.getJSON(self.properties.jsonUri(id), function (data) {
                self._ontologyProperties[id][index] = data;
                callback();
              });
            }
          },
          property: function property(id, index, index2) {
            return self._ontologyProperties[id][index2][index].property;
          },
          noOfTriples: function noOfTriples(id, index, index2) {
            return self._ontologyProperties[id][index2][index].number_of_triples;
          },
          domainClasses: {
            noOf: function noOf(id, index, index2) {
              return self._ontologyProperties[id][index2][index].domain_classes.length;
            },
            domainClass: function domainClass(id, index, index2, index3) {
              return self._ontologyProperties[id][index3][index2].domain_classes[index].domain_class;
            },
            label: function label(id, index, index2, index3) {
              return self._ontologyProperties[id][index3][index2].domain_classes[index].label;
            },
            noOfInstances: function noOfInstances(id, index, index2, index3) {
              return self._ontologyProperties[id][index3][index2].domain_classes[index].number_of_instances;
            }
          },
          rangeClasses: {
            noOf: function noOf(id, index, index2) {
              return self._ontologyProperties[id][index2][index].range_classes.length;
            },
            rangeClass: function rangeClass(id, index, index2, index3) {
              return self._ontologyProperties[id][index3][index2].range_classes[index].range_class;
            },
            label: function label(id, index, index2, index3) {
              return self._ontologyProperties[id][index3][index2].range_classes[index].label;
            },
            noOfInstances: function noOfInstances(id, index, index2, index3) {
              return self._ontologyProperties[id][index3][index2].range_classes[index].number_of_instances;
            }
          }
        },
        datatypes: {
          noOf: function noOf(id, index) {
            return data[id].ontologies[index].length;
          },
          datatype: function datatype(id, index, index2) {
            return data[id].ontologies[index2].datatypes[index];
          }
        }
      };

      // graph
      this.graphs = {
        noOf: function noOf(id) {
          return data[id].graphs.length;
        },
        uri: function uri(id, index) {
          return data[id].graphs[index].uri;
        },
        description: function description(id, index) {
          return data[id].graphs[index].description;
        },
        files: {
          noOf: function noOf(id, index) {
            // file
            return data[id].graphs[index].files.length;
          },
          name: function name(id, index, index2) {
            return data[id].graphs[index2].files[index].name;
          },
          uri: function uri(id, index, index2) {
            return data[id].graphs[index2].files[index].url;
          },
          size: function size(id, index, index2) {
            return data[id].graphs[index2].files[index].size;
          }
        },
        noOfTriples: function noOfTriples(id, index) {
          return data[id].graphs[index].number_of_triples;
        },
        noOfInstances: function noOfInstances(id, index) {
          return data[id].graphs[index].number_of_instances;
        },
        noOfSubjects: function noOfSubjects(id, index) {
          return data[id].graphs[index].number_of_subjects;
        },
        noOfObjects: function noOfObjects(id, index) {
          return data[id].graphs[index].number_of_objects;
        },
        noOfLiterals: function noOfLiterals(id, index) {
          return data[id].graphs[index].number_of_literals;
        },
        classes: {
          // class
          noOf: function noOf(id, index) {
            return data[id].graphs[index].number_of_classes;
          },
          jsonUri: function jsonUri(id, index) {
            return data[id].graphs[index].classes;
          },
          load: function load(id, callback, index) {
            if (!self._graphClasses[id]) {
              self._graphClasses[id] = [];
            }
            if (!self._graphClasses[id][index]) {
              $.getJSON(self.classes.jsonUri(id), function (data) {
                self._graphClasses[id][index] = data;
                callback();
              });
            }
          },
          class: function _class(id, index, index2) {
            return self._graphClasses[id][index2][index].class;
          },
          label: function label(id, index, index2) {
            return self._graphClasses[id][index2][index].label;
          },
          noOfInstances: function noOfInstances(id, index, index2) {
            return self._graphClasses[id][index2][index].number_of_instances;
          }
        },
        properties: {
          // property
          noOf: function noOf(id, index) {
            return data[id].graphs[index].number_of_properties;
          },
          jsonUri: function jsonUri(id, index) {
            return data[id].graphs[index].properties;
          },
          load: function load(id, callback, index) {
            if (!self._graphProperties[id]) {
              self._graphProperties[id] = [];
            }
            if (!self._graphProperties[id][index]) {
              $.getJSON(self.properties.jsonUri(id), function (data) {
                self._graphProperties[id][index] = data;
                callback();
              });
            }
          },
          property: function property(id, index, index2) {
            return self._graphProperties[id][index2][index].property;
          },
          noOfTriples: function noOfTriples(id, index, index2) {
            return self._graphProperties[id][index2][index].number_of_triples;
          },
          domainClasses: {
            noOf: function noOf(id, index, index2) {
              return self._graphProperties[id][index2][index].domain_classes.length;
            },
            domainClass: function domainClass(id, index, index2, index3) {
              return self._graphProperties[id][index3][index2].domain_classes[index].domain_class;
            },
            label: function label(id, index, index2, index3) {
              return self._graphProperties[id][index3][index2].domain_classes[index].label;
            },
            noOfInstances: function noOfInstances(id, index, index2, index3) {
              return self._graphProperties[id][index3][index2].domain_classes[index].number_of_instances;
            }
          },
          rangeClasses: {
            noOf: function noOf(id, index, index2) {
              return self._graphProperties[id][index2][index].range_classes.length;
            },
            rangeClass: function rangeClass(id, index, index2, index3) {
              return self._graphProperties[id][index3][index2].range_classes[index].range_class;
            },
            label: function label(id, index, index2, index3) {
              return self._graphProperties[id][index3][index2].range_classes[index].label;
            },
            noOfInstances: function noOfInstances(id, index, index2, index3) {
              return self._graphProperties[id][index3][index2].range_classes[index].number_of_instances;
            }
          }
        },
        datatypes: {
          // datatype
          noOf: function noOf(id, index) {
            return data[id].graphs[index].number_of_datatypes;
          },
          datatype: function datatype(id, index, index2) {
            return data[id].graphs[index2].datatypes[index];
          }
        },
        xrefs: function xrefs(id, index, index2) {
          // TODO:
          return data[id].graphs[index].xrefs;
        }
      };

      // tag
      this.tags = {
        noOf: function noOf(id) {
          return data[id].tags.targets[__g.app.language].length + data[id].tags.information_types[__g.app.language].length;
        },
        tag: function tag(id, index) {
          var obj = {},
            lang,
            targetsLength = data[id].tags.targets[__g.app.language].length;
          if (index < targetsLength) {
            for (lang in data[id].tags.targets) {
              obj[lang] = data[id].tags.targets[lang][index];
            }
          } else {
            for (lang in data[id].tags.targets) {
              obj[lang] = data[id].tags.information_types[lang][index - targetsLength];
            }
          }
          return obj;
        },
        targets: {
          noOf: function noOf(id) {
            return data[id].tags.targets[__g.app.language].length;
          },
          target: function target(id, index) {
            var obj = {};
            for (var lang in data[id].tags.targets) {
              obj[lang] = data[id].tags.targets[lang][index];
            }
            return obj;
          }
        },
        informationTypes: {
          noOf: function noOf(id) {
            return data[id].tags.information_types[__g.app.language].length;
          },
          informationType: function informationType(id, index) {
            var obj = {};
            for (var lang in data[id].tags.information_types) {
              obj[lang] = data[id].tags.information_types[lang][index];
            }
            return obj;
          }
        }
      };

      // license
      this.license = {
        name: function name(id) {
          return data[id].license.name;
        },
        uri: function uri(id) {
          return data[id].license.url;
        },
        credit: function credit(id) {
          return data[id].license.credit;
        }
      };

      // SPARQL
      this.SPARQLExamples = {
        noOf: function noOf(id) {
          return data[id].sparql_examples.length;
        },
        sparql: function sparql(id, index) {
          return data[id].sparql_examples[index].sparql[__g.app.language];
        },
        uri: function uri(id, index) {
          return data[id].sparql_examples[index].url;
        }
      };

      // Stanza
      this.stanza = {
        noOf: function noOf(id) {
          return data[id].stanza ? data[id].stanza.length : 0;
        },
        id: function id(_id2, index) {
          return data[_id2].stanza[index].id;
        },
        label: function label(id, index) {
          return data[id].stanza[index].label;
        },
        definition: function definition(id, index) {
          return data[id].stanza[index].definition;
        },
        parameter: {
          noOf: function noOf(id, index) {
            return data[id].stanza[index].parameter.length;
          },
          key: function key(id, index, index2) {
            return data[id].stanza[index].parameter[index2].key;
          },
          example: function example(id, index, index2) {
            return data[id].stanza[index].parameter[index2].example;
          },
          description: function description(id, index, index2) {
            return data[id].stanza[index].parameter[index2].description;
          },
          required: function required(id, index, index2) {
            return data[id].stanza[index].parameter[index2].required;
          }
        },
        usage: function usage(id, index) {
          return data[id].stanza[index].usage;
        },
        type: function type(id, index) {
          return data[id].stanza[index].type;
        },
        context: function context(id, index) {
          return data[id].stanza[index].context;
        },
        display: function display(id, index) {
          return data[id].stanza[index].display;
        },
        provider: function provider(id, index) {
          return data[id].stanza[index].provider;
        },
        license: function license(id, index) {
          return data[id].stanza[index].license;
        },
        author: function author(id, index) {
          return data[id].stanza[index].author;
        },
        address: function address(id, index) {
          return data[id].stanza[index].address;
        },
        contributor: function contributor(id, index) {
          return data[id].stanza[index].contributor;
        },
        created: function created(id, index) {
          return data[id].stanza[index].created;
        },
        updated: function updated(id, index) {
          return data[id].stanza[index].updated;
        }
      };
    }
    _createClass(Datasets, [{
      key: "noOfDatasets",
      value: function noOfDatasets() {
        return Object.keys(this.data).length;
      }
    }, {
      key: "ids",
      value: function ids() {
        return Object.keys(this.data);
      }
    }, {
      key: "providedAs",
      value: function providedAs(id) {
        return this.data[id].provided_as;
      }
    }, {
      key: "reviewed",
      value: function reviewed(id) {
        return this.data[id].reviewed;
      }
    }, {
      key: "title",
      value: function title(id) {
        return this.data[id].title;
      }
    }, {
      key: "uri",
      value: function uri(id) {
        return this.data[id].url;
      }
    }, {
      key: "projectName",
      value: function projectName(id) {
        return this.data[id].project_name;
      }
    }, {
      key: "dataProvider",
      value: function dataProvider(id) {
        return this.data[id].data_provider;
      }
    }, {
      key: "description",
      value: function description(id) {
        return this.data[id].description;
      }

      // Guideline
    }, {
      key: "guideline",
      value: function guideline(id) {
        return this.data[id].guideline;
      }
    }]);
    return Datasets;
  }(); // ********** end of Datasets class

  var _INTERVAL = 10,
    _DURATION = 5;

  /* ViewLabel Class
  	 ビューのラベル
  */
  var ViewLabel = /*#__PURE__*/function () {
    function ViewLabel() {
      var _this = this;
      _classCallCheck(this, ViewLabel);
      this._isChanging = false;
      this._timerId;
      this._index;
      this._changingLable;
      this._$label = $('#view-label');

      // メニューにマウスが載るとラベルを変更
      $('#global-navigation li[title]').on({
        mouseenter: function mouseenter(e) {
          return _this.changeLable(e.delegateTarget.title);
        },
        mouseleave: function mouseleave() {
          return _this.changeLable(__g.VIEWS_LABEL[__g.app.currentView]);
        }
      });
    }

    // ラベルの変更定義
    _createClass(ViewLabel, [{
      key: "changeLable",
      value: function changeLable(label) {
        if (this._isChanging) {
          // 変更中であれば現在の変更をキャンセル
          if (label === this._changingLable) {
            return;
          }
          window.clearTimeout(this._timerId);
        }
        this._changingLable = label;
        this._$label.text('');
        this._index = 0;
        this._isChanging = true;
        this._timerId = window.setTimeout(this.changingLabel.bind(this), _INTERVAL);
      }

      // ラベルの変更
    }, {
      key: "changingLabel",
      value: function changingLabel() {
        this._index++;
        var index = Math.floor(this._index / _DURATION),
          remainder = this._index % _DURATION;
        var changingLable = this._changingLable.substr(0, index);
        if (remainder !== 0) {
          changingLable = "".concat(changingLable.slice(0, -1), "<span style=\"color: hsl(").concat(Math.random() * 360, ", 100%, ").concat(100 * (remainder / _DURATION), "%);\">").concat(String.fromCharCode(parseInt(97 + 25 * Math.random())), "</span>");
          //changingLable = `${changingLable.slice(0, -1)}<span style="color: hsl(240, 50%, ${100 * ((remainder) / _DURATION)}%);">${String.fromCharCode(parseInt(97 + 25 * Math.random()))}</span>`;
        }

        this._$label.html(changingLable);
        if (this._index < this._changingLable.length * _DURATION) {
          this._timerId = window.setTimeout(this.changingLabel.bind(this), _INTERVAL);
        } else {
          this._isChanging = false;
        }
      }
    }]);
    return ViewLabel;
  }();

  var _OPENED = 'opened';

  /* Control panel class
   * コンソールパネルクラス
   * 
   */
  var ControlPanel = /*#__PURE__*/function () {
    function ControlPanel() {
      var _this = this;
      _classCallCheck(this, ControlPanel);
      var _$controlPanel = $('#control-panel'),
        _$tagFilterButtonAll = $('#tag-filter-button-all'),
        _$tagMarker = $('#control-panel-tag-marker'),
        _$display = {
          listView: {
            sortBy: $('#control-panel-display-list-view-sort-by').find('dd'),
            sortOrder: $('#control-panel-display-list-view-sort-order').find('dd')
          },
          graphView: {
            scalingBy: $('#control-panel-display-graph-view-scaling-by').find('dd'),
            marked: $('#control-panel-display-graph-view-marked').find('dd')
          }
        },
        _$markedTagButtons = {},
        _tags = {};
      this._$tagFilters;
      this._defaults = __g.userDefaults;
      this._providedAs;
      this._sort;
      this._isAscend;
      this._scaling;
      this._filteringTags = [];
      this._markedTag;
      this._colorSchema = {};

      // コンパネの開閉
      $('#control-panel-icon, #control-panel-display').on('click', function () {
        _$controlPanel.toggleClass(_OPENED);
        _this._defaults.misc.isOpenedControlPanel = _$controlPanel.hasClass(_OPENED);
      });

      // prepare tags
      (function () {
        var idFilter,
          id,
          ids = __g.app.datasets.ids(),
          tag,
          i,
          j,
          htmlFilter = '',
          htmlMarker = '',
          counter = 0;

        // タグの抽出
        for (i = 0; i < ids.length; i++) {
          id = ids[i];
          for (j = 0; j < __g.app.datasets.tags.noOf(id); j++) {
            // タグ
            tag = __g.app.datasets.tags.tag(id, j);
            if (!_tags[tag.en]) {
              _tags[tag.en] = tag;
            }
          }
        }

        // HTML生成
        _this._colorSchema.Invalid = '#CCC';
        for (i in _tags) {
          tag = _sanitizeTag(i);
          _this._colorSchema[tag] = __g.COLORS[counter++];
          idFilter = 'tag-filter-' + tag;
          htmlFilter +=
          // フィルター
          '<dd>' + _html('input', {
            type: 'checkbox',
            name: idFilter,
            id: idFilter,
            value: tag
          }, '') + _MLHtml('label', {
            for: idFilter
          }, _tags[i]) + '</dd>';
          htmlMarker +=
          // マーカー
          '<dd data-value="' + tag + '">' + _html('label', _html('span', {
            class: 'color-ball',
            style: 'border-color: ' + _this._colorSchema[tag]
          }, '') + _MLHtml(_tags[i])) + '</dd>';
          // Stylesheet
          __g.styleSheet.insertRule('ul.tags li.tag-' + tag + ':before { background-color: ' + _this._colorSchema[tag] + '; }', __g.styleSheet.cssRules.length);
        }
        $('#control-panel-tag-filter').append(htmlFilter);
        _$tagMarker.append(htmlMarker);
        // マーカータグを格納
        _$markedTagButtons.Invalid = $('dd[data-value="Invalid"]', _$tagMarker);
        for (i in _tags) {
          tag = _sanitizeTag(i);
          _$markedTagButtons[tag] = $('dd[data-value="' + tag + '"]', _$tagMarker);
        }
      })();

      // events
      // オリジナル、ミラー
      $('#control-panel-provided-as-filter').find('input[name="provided-as"]').on('change', function (e) {
        _this._providedAs = e.currentTarget.value;
        _this._defaults.all.providedAs = _this._providedAs;
        __g.app.postNortification('change-provided-as', _this._providedAs);
      });

      // ソート
      $('#control-panel-sort').find('input[name="sort"]').on('change', function (e) {
        _this._sort = e.delegateTarget.value;
        _this._defaults.list.sortBy = _this._sort;
        __g.app.postNortification('change-sorting', _this._sort);
        __g.app.$main.get(0).setAttribute('data-kind-of-sort', _this._sort);
        _$display.listView.sortBy.html(e.delegateTarget.nextElementSibling.innerHTML);
      }).end().find('input[name="ascend"]') // 昇順降順
      .on('change', function (e) {
        _this._isAscend = e.delegateTarget.value === 'ascend';
        _this._defaults.list.isAscend = _this._isAscend;
        __g.app.postNortification('change-sorting', _this._isAscend);
        _$display.listView.sortOrder.html(e.delegateTarget.nextElementSibling.innerHTML);
      });

      // サイジング
      $('#control-panel-scaling').find('input').on('change', function (e) {
        _this._scaling = e.delegateTarget.value;
        _this._defaults.graph.scaling = _this._scaling;
        __g.app.postNortification('change-scaling', _this._scaling);
        _$display.graphView.scalingBy.html(e.delegateTarget.nextElementSibling.innerHTML);
      });

      // フィルタータグ
      this._$tagFilters = $('#control-panel-tag-filter').find('input').on('change', function () {
        _this._filteringTags = [];
        _this._$tagFilters.each(function (index, elm) {
          if (elm.checked) {
            _this._filteringTags.push(elm.value);
          }
        });
        _this._defaults.list.filteringTags = _this._filteringTags;
        __g.app.postNortification('change-filtering-tags', _this._filteringTags);
      });

      // 全タグ選択ボタン
      _$tagFilterButtonAll.on('click', function () {
        _this._filteringTags = [];
        _this._$tagFilters.each(function (index, elm) {
          elm.checked = true;
          _this._filteringTags.push(elm.value);
        });
        _this._defaults.list.filteringTags = _this._filteringTags;
        __g.app.postNortification('change-filtering-tags', _this._filteringTags);
      });

      // 全タグ選択解除ボタン
      $('#tag-filter-button-all-deselected').on('click', function () {
        _this._filteringTags = [];
        _this._$tagFilters.each(function (index, elm) {
          elm.checked = false;
        });
        _this._defaults.list.filteringTags = _this._filteringTags;
        __g.app.postNortification('change-filtering-tags', _this._filteringTags);
      });

      // マーカータグ
      $('#control-panel-tag-marker').find('dd').on({
        click: function click(e) {
          //var value = this.dataset.value;
          _$markedTagButtons[_this._markedTag].find('span.color-ball').css('background-color', 'transparent');
          _this._markedTag = e.delegateTarget.getAttribute('data-value');
          _this._defaults.graph.markedTag = _this._markedTag;
          __g.app.postNortification('change-marker-tag', {
            tag: _this._markedTag,
            color: _this._colorSchema[_this._markedTag]
          });
          _$markedTagButtons[_this._markedTag].find('span.color-ball').css('background-color', _this._colorSchema[_this._markedTag]);
          _$display.graphView.marked.html(_MLHtml(_tags[_this._markedTag]));
        }
      });

      // user default から値をとる
      this._providedAs = this._defaults.all.providedAs;
      this._sort = this._defaults.list.sortBy;
      this._isAscend = this._defaults.list.isAscend;
      this._filteringTags = this._defaults.list.filteringTags;
      this._scaling = this._defaults.graph.scaling;
      this._markedTag = this._defaults.graph.markedTag;
      if (this._filteringTags === null) {
        _$tagFilterButtonAll.trigger('click');
      }

      // 値を input にセット
      if (this._defaults.misc.isOpenedControlPanel) {
        _$controlPanel.addClass(_OPENED);
      }
      $('#control-panel-provided-as-filter').find("input[value=\"".concat(this._providedAs, "\"]")).prop('checked', true).triggerHandler('change');
      $('#control-panel-sort').find("input[value=\"".concat(this._sort, "\"]")).prop('checked', true).triggerHandler('change');
      $(this._isAscend ? '#sort-ascend' : '#sort-descend').prop('checked', true).triggerHandler('change');
      this._$tagFilters.each(function (index, elm) {
        if (_this._filteringTags.indexOf(elm.value) !== -1) {
          _this.checked = true;
        }
      });
      $('#control-panel-scaling').find('input[value="' + this._scaling + '"]').prop('checked', true).triggerHandler('change');
      _$markedTagButtons[this._markedTag].triggerHandler('click');
    }

    // accessor
    _createClass(ControlPanel, [{
      key: "providedAsFilter",
      value: function providedAsFilter() {
        return this._providedAs;
      }
    }, {
      key: "kindOfSorting",
      value: function kindOfSorting() {
        return this._sort;
      }
    }, {
      key: "isAscend",
      value: function isAscend() {
        return this._isAscend;
      }
    }, {
      key: "kindOfScaling",
      value: function kindOfScaling() {
        return this._scaling;
      }
    }, {
      key: "selectedFilteringTags",
      value: function selectedFilteringTags() {
        return this._filteringTags;
      }
    }, {
      key: "selectedMarkedTag",
      value: function selectedMarkedTag() {
        return {
          tag: this._markedTag,
          color: this._colorSchema[this._markedTag]
        };
      }
    }, {
      key: "color",
      value: function color(tag) {
        return this._colorSchema[tag];
      }

      // 選択されたタグ以外は非選択に
    }, {
      key: "selectFilteringTag",
      value: function selectFilteringTag(tag) {
        var _this2 = this;
        this._filteringTags = [];
        this._$tagFilters.each(function (index, elm) {
          if (elm.value === tag) {
            elm.checked = true;
            _this2._filteringTags.push(elm.value);
          } else {
            elm.checked = false;
          }
        });
        this._defaults.list.filteringTags = this._filteringTags;
        __g.app.postNortification('change-filtering-tags', this._filteringTags);
      }

      //changeView(kindOfView) {
      //};
    }]);
    return ControlPanel;
  }(); // ********** end of Control panel class

  var OPENING_RADIAL = 60,
    SIZE = [{
      REGULAR: 40,
      MIN: 40,
      MAX: 40
    },
    // home
    {
      REGULAR: 80,
      MIN: 80,
      MAX: 80
    },
    // list
    {
      REGULAR: 32,
      MIN: 32,
      MAX: 32
    },
    // matrix
    {
      REGULAR: 24,
      MIN: 12,
      MAX: 80
    },
    // graph
    {
      REGULAR: 120,
      MIN: 120,
      MAX: 120
    } // detail
    ],
    //MAX_SIZE = 256,
    //MIN_SIZE = 16,
    LIST_MIN_HEIGHT = 100;
  var count = 0;

  /* Star class
   * 星に見立てたデータセットを表すノードクラス
   * @param param object
   * 
   */
  var Star = /*#__PURE__*/function () {
    function Star(_elm, _data) {
      var _this = this;
      _classCallCheck(this, Star);
      this._datasets = __g.app.datasets; // shortcut
      this._$ = $(_elm);
      this._data = _data;
      this._$icon;
      this._$h;
      this._$tagHalo;
      this._$numberOf;
      this._id;
      this._isInternal; // 寄託されたデータセットか
      this._key;
      this._size = SIZE[__g.VIEWS.network].REGULAR;
      this._tags = [];
      this._matrix = {
        rows: []
      };
      this._mouseDownPosition;

      // initialize
      var _d3 = d3.select(_elm),
        _order = count++,
        _radius = 2 * Math.PI * (_order / __g.app.datasets.noOfDatasets());
      this._id = _d3.datum().key;
      this._isInternal = _d3.datum().isInternal; // 寄託されたデータセットか
      this._key = this._isInternal ? this._id : __g.app.xrefs[this._id].key;
      if (this._isInternal) {
        // 寄託データベースの場合
        this._$.addClass('star' + function () {
          var tagClass = '';
          for (var _i = 0; _i < _this._datasets.tags.noOf(_this._id); _i++) {
            tagClass += " tag-".concat(_sanitizeTag(_this._datasets.tags.tag(_this._id, _i).en));
          }
          return tagClass;
        }()).attr('data-provided-as', this._datasets.providedAs(this._id)).append('<div class="icon">' + '<div class="body"></div>' + '<div class="tag-halo"></div>' + (this._datasets.reviewed(this._id) === 'reviewed' ? '<div class="reviewed-icon"></div>' : '') + '</div>' + function () {
          var title = _this._datasets.title(_this._id),
            html = '';
          for (var i in title) {
            html += _html('h2', {
              title: title[i],
              lang: i
            }, title[i]);
          }
          return html;
        }() + '<p class="number-of"><span class="numeral"></span><small></small></p>').css({
          left: window.innerWidth * 0.5 + Math.cos(_radius) * OPENING_RADIAL,
          top: window.innerHeight * 0.5 + Math.sin(_radius) * OPENING_RADIAL
        }).attr('data-id', this._id);
        // 参照
        this._$icon = $('.icon', this._$).on('click', function () {
          _this._$.trigger('mouseleave');
          __g.app.selectedStar(_this._id);
        });
        this._$h = $('h2', this._$);
        this._$tagHalo = this._$icon.find('.tag-halo');
        this._$numberOf = $('.number-of', this._$);
        // リンク情報の付与
        var _i2;
        for (_i2 = 0; _i2 < this._datasets.connectedDatasetIds.noOf(this._id); _i2++) {
          this._$.addClass('to-' + this._datasets.connectedDatasetIds.id(this._id, _i2));
        }
        for (_i2 = 0; _i2 < this._datasets.xref.noOf(this._id); _i2++) {
          this._$.addClass('to-' + __g.app.xrefs[this._datasets.xref.title(this._id, _i2)].key);
        }
        // logotype
        new StarImage(this._id, this._$, function () {
          __g.app.appPrepareDecrement();
        });
        // tag
        for (_i2 = 0; _i2 < this._datasets.tags.noOf(this._id); _i2++) {
          this._tags.push(_sanitizeTag(this._datasets.tags.tag(this._id, _i2).en));
        }
      } else {
        // 外部データベースの場合
        this._$.addClass('star xref').append('<div class="icon"></div><h2>' + this._id + '</h2>');
        this._$icon = $('.icon', this._$);
        for (var i = 0; i < __g.app.xrefs[this._id].connectedDatasets.length; i++) {
          this._$.addClass('to-' + __g.app.xrefs[this._id].connectedDatasets[i].connectedDatasetId);
        }
      }
    }

    // ノードのサイズ
    _createClass(Star, [{
      key: "_sizing",
      value: function _sizing(sizing) {
        var number,
          denominator,
          currentView = __g.app.currentView,
          size = SIZE[currentView];
        sizing = sizing === undefined ? __g.controlPanel.kindOfScaling() : sizing;
        if (sizing === 'None') {
          // サイジング無指定の場合は、固定の幅
          this._size = size.REGULAR;
          this._$numberOf.text('');
        } else {
          // サイジングが指定されている場合は、サイズを最大値から割り出す
          switch (sizing) {
            case 'Classes':
              number = __g.app.datasets.noOfClasses(this._id);
              denominator = __g.app.maxValue.class;
              break;
            case 'Instances':
              number = __g.app.datasets.noOfInstances(this._id);
              denominator = __g.app.maxValue.instance;
              break;
            case 'Literals':
              number = __g.app.datasets.noOfLiterals(this._id);
              denominator = __g.app.maxValue.literal;
              break;
            case 'Objects':
              number = __g.app.datasets.noOfObjects(this._id);
              denominator = __g.app.maxValue.object;
              break;
            case 'Properties':
              number = __g.app.datasets.noOfProperties(this._id);
              denominator = __g.app.maxValue.property;
              break;
            case 'Subjects':
              number = __g.app.datasets.noOfSubjects(this._id);
              denominator = __g.app.maxValue.subject;
              break;
            case 'Triples':
              number = __g.app.datasets.noOfTriples(this._id);
              denominator = __g.app.maxValue.triple;
              break;
          }
          this._size = this._isInternal ? size.MIN + (size.MAX - size.MIN) * (Math.sqrt(number) / denominator) : size.MIN;
          this._$numberOf.html("\n\t\t\t\t<span class=\"numeral\">".concat(number.toLocaleString(), "</span>\n\t\t\t\t<small>").concat(sizing.toLowerCase(), "</small>\n\t\t\t"));
        }
        this._$icon.css({
          width: this._size,
          height: this._size
        });
        switch (currentView) {
          case __g.VIEWS.graph:
            {
              this._$h.css('top', this._size * 0.5 + 6);
              this._$numberOf.css('top', this._size * 0.5 + 18);
            }
        }
      } // function _sizing

      // ビューの変更
    }, {
      key: "changeView",
      value: function changeView( /*kindOfView, currentStarId*/
      ) {
        // 形状のリセット
        if (this._isInternal) {
          this._$.stop(true, true);
          this._$icon.css({
            width: '',
            height: '',
            marginLeft: '',
            marginTop: ''
          });
          this._$h.css({
            top: ''
          });
        }
      }
    }, {
      key: "prepareHomeView",
      value: function prepareHomeView() {}
    }, {
      key: "prepareListView",
      value: function prepareListView(order, top, delegate) {
        var _this2 = this;
        var height = 0,
          hidden = true,
          tags = __g.controlPanel.selectedFilteringTags();
        if (this._isInternal) {
          // 寄託データベースの場合

          // filtering
          for (var i = 0; i < this._tags.length; i++) {
            if (tags.indexOf(this._tags[i]) !== -1 && (__g.controlPanel.providedAsFilter() === 'all' || __g.controlPanel.providedAsFilter() === 'original' && this._datasets.providedAs(this._id) === 'original')) {
              hidden = false;
              break;
            }
          }
          if (hidden) {
            this._$.addClass('hidden');
            return height;
          }
          this._$.removeClass('hidden');

          // size
          this._sizing();

          // layout
          height = this._size < LIST_MIN_HEIGHT ? LIST_MIN_HEIGHT : this._size;
          this._$.animate({
            top: top + height * 0.5,
            left: ListViewController.ORIGIN.X
          }, {
            duration: __g.DURATION + order * 100,
            easing: 'easeInOutSine',
            complete: function complete() {
              _this2._$.addClass('placed');
              // make information
              if (_this2._$.children('.appendix.list-view').length === 0) {
                // ディティールがない場合生成
                _this2._$.append('<div class="appendix list-view">' + _MLHtml('p', {
                  class: 'description'
                }, _this2._datasets.description(_this2._id)) + _html('ul', {
                  class: 'tags'
                }, function () {
                  var html = '',
                    i,
                    tag1,
                    tag2;
                  for (i = 0; i < _this2._datasets.tags.noOf(_this2._id); i++) {
                    tag1 = _this2._datasets.tags.tag(_this2._id, i);
                    tag2 = _sanitizeTag(tag1.en);
                    html += _MLHtml('li', {
                      class: 'tag-' + tag2,
                      'data-tag': tag2
                    }, tag1);
                  }
                  return html;
                }()) + _html('div', {
                  class: 'left-element'
                }, _html('p', {
                  class: 'number-of-triples'
                }, _numeral(_this2._datasets.noOfTriples(_this2._id).toLocaleString()) + '<small>triples</small>') + _html('p', {
                  class: 'last-update'
                }, _this2._datasets.issued(_this2._id)) + _html('p', {
                  class: 'institution'
                }, _MLHtml(_this2._datasets.dataProvider(_this2._id)))) + '</div>');
                _this2._$.find('ul.tags').find('li').on('click', function () {
                  __g.controlPanel.selectFilteringTag(_this2.dataset.tag);
                });
              }
              delegate.placedStar();
            }
          });
        }
        return height;
      }
    }, {
      key: "prepareLeaveFromListView",
      value: function prepareLeaveFromListView() {
        this._$.removeClass('placed');
      }
    }, {
      key: "prepareMatrixView",
      value: function prepareMatrixView(order, delegate) {
        var _this3 = this;
        var top = MatrixViewController.ORIGIN.Y + order * MatrixViewController.CELL.HEIGHT;
        this._$.addClass('placing').animate({
          left: 96,
          top: top + MatrixViewController.CELL.HEIGHT * 0.5
        }, {
          duration: __g.DURATION + order * 100,
          easing: 'easeInOutSine',
          complete: function complete() {
            delegate.placedStar();
            _this3._$.removeClass('placing');
          }
        });
        this._matrix.rows = $('#matrix-body').find('.id-' + this._id).css({
          top: top
        });
      }
    }, {
      key: "matrixReplace",
      value: function matrixReplace(order) {
        var properties = {
            top: MatrixViewController.ORIGIN.Y + order * MatrixViewController.CELL.HEIGHT
          },
          options = {
            duration: __g.DURATION + order * 100,
            easing: 'easeInOutSine'
          };
        this._matrix.rows.animate(properties, options);
        properties.top += MatrixViewController.CELL.HEIGHT * 0.5;
        this._$.animate(properties, options);
      }
    }, {
      key: "prepareGraphView",
      value: function prepareGraphView() {
        var _this4 = this;
        // 星をホバーすると関連する星が浮かび上がる
        this._$.on({
          'mouseenter.graphView': function mouseenterGraphView() {
            __g.app.$main.addClass(__g.CLASS.STAR_HOVERING);
            $('.to-' + _this4._key, __g.app.$stars).addClass(__g.CLASS.CONNECTED_STAR_HOVERING);
            __g.d3.edges.selectAll('.to-' + _this4._key + ', .from-' + _this4._key).classed(__g.CLASS.CONNECTED_STAR_HOVERING, true);
          },
          'mouseleave.graphView': function mouseleaveGraphView() {
            __g.app.$main.removeClass(__g.CLASS.STAR_HOVERING);
            $('.' + __g.CLASS.CONNECTED_STAR_HOVERING, __g.app.$stars).removeClass(__g.CLASS.CONNECTED_STAR_HOVERING);
            __g.d3.edges.selectAll('.' + __g.CLASS.CONNECTED_STAR_HOVERING).classed(__g.CLASS.CONNECTED_STAR_HOVERING, false);
          }
        });
        if (this._isInternal) {
          // 寄託データベースの場合
          this._sizing();
          this.receiveNotificationChangeTagMarker(__g.controlPanel.selectedMarkedTag());
          // コンパネのタグにマウスが当たると、同じタグを持つ星がハイライト
          __g.app.addNotificationObserver('change-marker-tag', this, this.receiveNotificationChangeTagMarker);
        } else {
          // 外部データベースの場合
          this._size = SIZE[__g.VIEWS.network].MIN;
          this._$.on({
            // drag すると mouseenter が効かなくなる
            //'mousedown.graphView': function(e) {
            //	console.log(e)
            //	this._mouseDownPosition = { x: e.clientX, y: e.clientY };
            //},
            //'mouseup': e => {
            //	console.log(this._mouseDownPosition)
            //	if (Math.abs(this._mouseDownPosition.x - e.clientX) < 2 && Math.abs(this._mouseDownPosition.y - e.clientY) < 2) {
            //		window.open(__g.app.xrefs[this._id].connectedDatasets[0].uri); 
            //	}
            //}
            click: function click() {
              window.open(__g.app.xrefs[_this4._id].connectedDatasets[0].uri);
            }
          });
        }
      }
    }, {
      key: "prepareLeaveFromGraphView",
      value: function prepareLeaveFromGraphView() {
        this._$.off('mouseenter.graphView mouseleave.graphView');
        if (this._isInternal) {
          this._sizing();
          __g.app.removeNotificationObserver('change-marker-tag', this);
          this._$.removeClass(__g.CLASS.TAG_HOVERING);
        } else {
          this._$.off('mousedown.graphView mouseup.graphView');
        }
      }
    }, {
      key: "receiveNotificationChangeTagMarker",
      value: function receiveNotificationChangeTagMarker(param) {
        if (this._tags.indexOf(param.tag) !== -1) {
          this._$.addClass(__g.CLASS.TAG_HOVERING);
          this._$tagHalo.css('background-color', param.color);
        } else {
          this._$.removeClass(__g.CLASS.TAG_HOVERING);
        }
      }
    }, {
      key: "prepareDetailView",
      value: function prepareDetailView(currentStarId) {
        var _this5 = this;
        if (currentStarId === this._id) {
          // 当該スターであった場合の処理
          this._$.addClass('selected').animate({
            left: DetailViewController.ORIGIN.X,
            top: DetailViewController.ORIGIN.Y
          }, {
            duration: __g.DURATION * 2,
            easing: 'easeOutCubic',
            complete: function complete() {
              _this5._$.css({
                position: 'fixed',
                left: DetailViewController.ORIGIN.X - DetailViewController.OFFSET.X,
                top: DetailViewController.ORIGIN.Y - DetailViewController.OFFSET.Y
              });
            }
          });
        } else {
          // 当該スターでなかった場合の処理
          this._$.removeClass('selected');
        }
      }
    }, {
      key: "prepareLeaveFromDetailView",
      value: function prepareLeaveFromDetailView() {
        if (this._$.hasClass('selected')) {
          var position = this._$.position();
          this._$.css({
            position: '',
            left: position.left + DetailViewController.OFFSET.X,
            top: position.top + DetailViewController.OFFSET.Y
          });
        }
      }

      // 化身がクリックされた際に呼ばれ、ディティールビューに遷移
    }, {
      key: "clickedAlias",
      value: function clickedAlias(elm) {
        var $icon = $('.icon', elm),
          width = $icon.width();
        this._$.css({
          left: elm.offsetLeft + width * 0.5,
          top: elm.offsetTop + width * 0.5
        });
        this._$icon.trigger('click');
      }

      // accessor
    }, {
      key: "size",
      get: function get() {
        return this._size;
      }
    }]);
    return Star;
  }(); // ********** end of Star class

  var _MAIN_VIEW_LEFT = 60,
    _MAIN_VIEW_RIGHT = 0,
    _MAIN_VIEW_TOP = 10,
    _MAIN_VIEW_BOTTOM = 10;

  /* RDF Portal class
   * 当ウェブアプリの全体を司るクラス
   * グローバルに参照できるようにする
   * 
   */
  var RDFPortal = /*#__PURE__*/function () {
    function RDFPortal() {
      _classCallCheck(this, RDFPortal);
      this._appPrepareCounter = 0;
      this._currentView = -1;
      this._currentStarId;
      this._notifications = {};
      this._homeViewController;
      this._listViewController;
      this._matrixViewController;
      this._graphViewController;
      this._manualViewController;
      this._guidelineViewController;
      this._changeLogViewController;
      this._detailViewController;
      this._$navButtons;
      this._isChanging = false;
      this._changeId;
    }

    // アプリの開始
    _createClass(RDFPortal, [{
      key: "_startApp",
      value: function _startApp() {
        var urlParameter = {};

        // ロゴ色の取得
        //$.adaptiveBackground.run();

        // URL パラメータからページ状態の復帰
        urlParameter.view = window.location.pathname ? window.location.pathname.substr(1) : 'home';

        // ビューの特定
        if (urlParameter.id) {
          this._currentStarId = urlParameter.id;
        }

        // ルーター
        page(__g.rootPath + 'dataset/:id', this.routeDetail.bind(this));
        page(__g.rootPath + 'documents/:id', this.routeDocuments.bind(this));
        page(__g.rootPath + ':pagetype', this.route.bind(this));
        page(__g.rootPath + '', this.route.bind(this));
        page.start();

        // スプラッシュスクリーンの消失
        $('#splash-screen').addClass('vanish').delay(3000).queue(function () {
          $(this).remove();
        });
        //change-log 更新内容
        //キャッシュしない
        $.ajaxSetup({
          cache: false
        });
      }

      // notification
    }, {
      key: "addNotificationObserver",
      value: function addNotificationObserver(notificationName, observer, functionObj) {
        if (!this._notifications[notificationName]) {
          this._notifications[notificationName] = [];
        }
        var isMatch = false;
        for (var i = 0; i < this._notifications[notificationName].length; i++) {
          var notification = this._notifications[notificationName][i];
          if (notification.observer === observer) {
            isMatch = true;
          }
        }
        if (!isMatch) {
          this._notifications[notificationName].push({
            observer: observer,
            function: functionObj
          });
        }
      }
    }, {
      key: "removeNotificationObserver",
      value: function removeNotificationObserver(notificationName, observer) {
        if (this._notifications[notificationName]) {
          for (var i = 0; i < this._notifications[notificationName].length; i++) {
            var notification = this._notifications[notificationName][i];
            if (notification.observer === observer) {
              this._notifications[notificationName].splice(i, 1);
              break;
            }
          }
        }
      }
    }, {
      key: "postNortification",
      value: function postNortification(notificationName, val) {
        if (this._notifications[notificationName]) {
          for (var i = 0; i < this._notifications[notificationName].length; i++) {
            var notification = this._notifications[notificationName][i];
            notification.function.call(notification.observer, val);
          }
        }
      }

      // accessor
    }, {
      key: "currentStarId",
      get: function get() {
        return this._currentStarId;
      }
    }, {
      key: "currentView",
      get: function get() {
        return this._currentView;
      }
    }, {
      key: "isChanging",
      value: function isChanging() {
        return this._isChanging;
      }

      // ロゴ画像が読み込まれるとデクリメント
    }, {
      key: "appPrepareDecrement",
      value: function appPrepareDecrement() {
        this._appPrepareCounter--;
        if (this._appPrepareCounter === 0) {
          this._startApp();
        }
      }

      // ビューの変更
    }, {
      key: "changeView",
      value: function changeView(kindOfView, params) {
        // 変更中であれば無効
        if (this._isChanging) return;
        var labelOfView = __g.VIEWS_NAME[kindOfView];
        if (labelOfView === __g.VIEWS_NAME[__g.VIEWS.dataset]) {
          // dataset ページの場合
          page("".concat(__g.rootPath).concat(labelOfView, "/").concat(params.id));
        } else if (labelOfView === 'home') {
          // home ページの場合
          page("".concat(__g.rootPath));
        } else {
          // それ以外の場合
          page("".concat(__g.rootPath).concat(labelOfView));
        }
      }
    }, {
      key: "changed",
      value: function changed(id, height) {
        if (this._changeId === id) {
          this._isChanging = false;
          $w.trigger('resize');
          $('html, body').animate({
            scrollTop: 0
          }, {
            duration: 200
          });
          this.$main.css('height', height);
        }
      }

      // router
    }, {
      key: "routeDetail",
      value: function routeDetail(context, next) {
        this._currentStarId = context.params.id; // 現在 dataset view で指しているページの定義
        this.render(__g.VIEWS_NAME.indexOf('dataset'), context.params);
      }
    }, {
      key: "routeDocuments",
      value: function routeDocuments(context, next) {
        this.render(__g.VIEWS_NAME.indexOf('documents'), context.params);
      }
    }, {
      key: "route",
      value: function route(context, next) {
        var kindOfView = __g.VIEWS_NAME.indexOf(context.params.pagetype);
        kindOfView = kindOfView === -1 || context.params.pagetype === 'dataset' ? 0 : kindOfView;
        this.render(kindOfView);
      }
    }, {
      key: "render",
      value: function render(kindOfView, params) {
        var _this = this;
        if (kindOfView === __g.VIEWS.dataset || kindOfView === __g.VIEWS.documents || kindOfView !== this._currentView) {
          // 現状のビューの終了
          if (this._currentView !== -1) {
            switch (this._currentView) {
              case __g.VIEWS.home:
                this._homeViewController.hide();
                break;
              case __g.VIEWS.datasets:
                this._listViewController.hide();
                break;
              case __g.VIEWS.statistics:
                this._matrixViewController.hide();
                break;
              case __g.VIEWS.network:
                this._graphViewController.hide();
                break;
              case __g.VIEWS.documents:
                this._manualViewController.hide();
                break;
              case __g.VIEWS.guideline:
                this._guidelineViewController.hide();
                break;
              case __g.VIEWS.changeLog:
                this._changeLogViewController.hide();
                break;
              case __g.VIEWS.dataset:
                this._detailViewController.hide();
                break;
            }
          }

          // ビューの変更
          this._currentView = kindOfView;
          // スクリーンに属性付与
          $('body').attr('data-kind-of-view', __g.VIEWS_NAME[kindOfView]);
          this.$main.attr('data-kind-of-view', __g.VIEWS_NAME[kindOfView]);
          // 星たちに通知
          this.stars.forEach(function (star) {
            star.changeView(kindOfView, _this.currentStarId);
          });
          // コンパネに通知
          //__g.controlPanel.changeView(kindOfView);
          // navigation
          this.viewLabel.changeLable(__g.VIEWS_LABEL[this._currentView]);
          //_$navLabel.text( __g.VIEWS_LABEL[this._currentView] );
          this._$navButtons.each(function () {
            this.className = this.getAttribute('data-kind-of-view') === __g.VIEWS_NAME[kindOfView] ? 'current' : '';
          });
          // ビュー管理用関数の呼び出し
          switch (kindOfView) {
            case __g.VIEWS.home:
              //this._homeViewController.show();
              this.currentViewController = this._homeViewController;
              break;
            case __g.VIEWS.datasets:
              this.currentViewController = this._listViewController;
              break;
            case __g.VIEWS.statistics:
              this.currentViewController = this._matrixViewController;
              break;
            case __g.VIEWS.network:
              this.currentViewController = this._graphViewController;
              break;
            case __g.VIEWS.documents:
              this.currentViewController = this._manualViewController;
              break;
            case __g.VIEWS.guideline:
              this.currentViewController = this._guidelineViewController;
              break;
            case __g.VIEWS.changeLog:
              this.currentViewController = this._changeLogViewController;
              break;
            case __g.VIEWS.dataset:
              this.currentViewController = this._detailViewController;
              break;
            default:
              this.currentViewController = null;
              window.console.log('該当する画面がありません: ', __g.VIEWS_LABEL[kindOfView]);
              break;
          }
          this.currentViewController.show(params);
          // 遷移状態に
          this._isChanging = true;
          this._changeId = this._currentView;
        }
      }

      // スターの選択
    }, {
      key: "selectedStar",
      value: function selectedStar(id) {
        if (__g.app.currentView !== __g.VIEWS.dataset | this.currentStarId !== id) {
          // ビューの変更
          this.changeView(__g.VIEWS.dataset, {
            id: id
          });
        }
      }

      // JSON読み込み後、初期化
    }, {
      key: "init",
      value: function init(data) {
        var _this2 = this;
        var self = this;
        var id,
          ids,
          idIndices = {},
          i,
          j,
          newStyle;
        this.$main = $('main#main-view');
        this.$stars = this.$main.children('.stars');
        this.$star = undefined;
        this.viewLabel = new ViewLabel();
        this.$offScreenCanvas = $('main#main-view');
        this.language = __g.userDefaults.misc.language;
        this.datasets = new Datasets(data);
        this.mainView = {
          center: {
            x: 0,
            y: 0
          },
          size: {
            width: 0,
            height: 0
          }
        };
        this.stars = [];
        this.starsWithKeys = {};
        this.xrefs = {};
        this.currentViewController = undefined;
        this.maxValue = {
          class: 0,
          instance: 0,
          literal: 0,
          object: 0,
          property: 0,
          subject: 0,
          triple: 0
        };
        this._appPrepareCounter = this.datasets.noOfDatasets() + 1;

        // Stylesheet
        newStyle = document.createElement('style');
        newStyle.type = 'text/css';
        document.getElementsByTagName('head').item(0).appendChild(newStyle);
        __g.styleSheet = document.styleSheets[document.styleSheets.length - 1];

        // SVG
        __g.d3.edges = __g.d3.svg.append('g').attr('class', 'edges');

        // 各ビューのコントローラ生成
        this._homeViewController = new HomeViewController();
        this._listViewController = new ListViewController();
        this._matrixViewController = new MatrixViewController();
        this._graphViewController = new GraphViewController();
        this._manualViewController = new ManualViewController();
        this._guidelineViewController = new GuidelineViewController();
        this._changeLogViewController = new ChangeLogViewController();
        this._detailViewController = new DetailViewController();
        this.currentViewController = this._homeViewController;

        // ナビゲーション：ビュー切り替え
        this._$navButtons = $('#global-navigation').children('ul').children('li[data-kind-of-view]').on('click', function (e) {
          var kindOfView = e.delegateTarget.getAttribute('data-kind-of-view');
          _this2.changeView(__g.VIEWS_NAME.indexOf(kindOfView));
        });
        // ナビゲーション：ロケール切り替え
        $('#language-switch').find('li').on('click', function (e) {
          $('html').attr('lang', e.delegateTarget.getAttribute('data-lang'));
          _this2.language = e.delegateTarget.getAttribute('data-lang');
          __g.userDefaults.misc.language = _this2.language;
        });
        $('#language-switch').find('li[data-lang="' + this.language + '"]').trigger('click');

        // コンソールパネル
        __g.controlPanel = new ControlPanel();

        // データセットの基本情報の取得
        ids = this.datasets.ids();
        for (i = 0; i < ids.length; i++) {
          id = ids[i];
          var keys = {
            class: 'noOfClasses',
            instance: 'noOfInstances',
            literal: 'noOfLiterals',
            object: 'noOfObjects',
            property: 'noOfProperties',
            subject: 'noOfSubjects',
            triple: 'noOfTriples'
          };
          for (j in keys) {
            this.maxValue[j] = this.maxValue[j] < this.datasets[keys[j]](id) ? this.datasets[keys[j]](id) : this.maxValue[j];
          }
        }
        for (i in this.maxValue) {
          this.maxValue[i] = Math.sqrt(this.maxValue[i]);
        }

        // メインビューの矩形定義
        $w.on('resize.mainViewControl', function () {
          // ウインドウサイズの変動でメインビューをリサイズ
          _this2.mainView.size.height = $w.innerHeight() - _MAIN_VIEW_TOP - _MAIN_VIEW_BOTTOM;
          _this2.mainView.size.width = $w.innerWidth() - _MAIN_VIEW_LEFT - _MAIN_VIEW_RIGHT;
          _this2.$main.css({
            height: _this2.mainView.size.height,
            width: _this2.mainView.size.width
          });
          // SVG
          __g.d3.svg.attr('width', _this2.mainView.size.width - __g.SVG_MARGIN_LEFT).attr('height', _this2.mainView.size.height);
          if (__g.d3.force) {
            __g.d3.force.force('center', d3.forceCenter(_this2.mainView.size.width * 0.5, _this2.mainView.size.height * 0.5)).restart();
          }
        }).trigger('resize.mainViewControl');

        // force layout
        {
          // ノードの生成
          for (i = 0; i < ids.length; i++) {
            id = ids[i];
            __g.d3.nodesData.push({
              key: id,
              isInternal: true
            });
            // クロスリファレンスの抽出
            for (j = 0; j < this.datasets.xref.noOf(id); j++) {
              var title = this.datasets.xref.title(id, j);
              if (!this.xrefs[title]) {
                this.xrefs[title] = {
                  key: title.replace(/\s/g, '_'),
                  connectedDatasets: []
                };
                __g.d3.nodesData.push({
                  key: title,
                  isInternal: false
                });
              }
              this.xrefs[title].connectedDatasets.push({
                connectedDatasetId: id,
                uri: this.datasets.xref.uri(id, j),
                numberOfTriples: this.datasets.xref.noOfTriples(id, j),
                type: this.datasets.xref.type(id, j)
              });
            }
          }
          // D3
          __g.d3.nodesSelection = d3.select('main#main-view div.stars').selectAll('div.star').data(__g.d3.nodesData).enter().append('div');
          __g.d3.nodesSelection.each(function (data) {
            var star = new Star(this, data);
            self.stars.push(star); // 各スター（ノード）を保持る配列
            data.star = star;
            self.starsWithKeys[data.key] = star; // 各スター（ノード）を保持る連想配列
          });
          // jQuery
          this.$star = $('main#main-view').children('.stars').children('.star');

          // リンク（エッジ）の生成
          for (i = 0; i < __g.d3.nodesData.length; i++) {
            idIndices[__g.d3.nodesData[i].key] = i; // ノードIDの並び順をキーバリュー形式で格納
          }

          for (i = 0; i < __g.d3.nodesData.length; i++) {
            id = __g.d3.nodesData[i].key;
            var connectedId;
            if (__g.d3.nodesData[i].isInternal) {
              // 内部リンク
              for (j = 0; j < this.datasets.connectedDatasetIds.noOf(id); j++) {
                connectedId = this.datasets.connectedDatasetIds.id(id, j);
                __g.d3.linksData.push({
                  source: i,
                  target: idIndices[connectedId],
                  sourceId: id,
                  targetId: connectedId,
                  numberOfTriples: this.datasets.connectedDatasetIds.noOfTriple(id, j),
                  type: this.datasets.connectedDatasetIds.type(id, j)
                });
              }
            } else {
              // 外部リンク
              for (j = 0; j < this.xrefs[id].connectedDatasets.length; j++) {
                connectedId = this.xrefs[id].connectedDatasets[j].connectedDatasetId;
                __g.d3.linksData.push({
                  source: i,
                  target: idIndices[connectedId],
                  sourceId: this.xrefs[id].key,
                  targetId: connectedId,
                  numberOfTriples: this.xrefs[id].connectedDatasets[j].numberOfTriples,
                  type: this.xrefs[id].connectedDatasets[j].type
                });
              }
            }
          }
          // D3
          __g.d3.linksSelection = __g.d3.edges.selectAll('.link').data(__g.d3.linksData).enter().append('line');
          __g.d3.linksSelection.each(function () {
            // エッジをトリプル数により強度をつける
            var d3This = d3.select(this),
              datum = d3This.datum(),
              ratio = Math.log(datum.numberOfTriples) / Math.log(self.maxValue.triple),
              opacity = 0.1 + 0.9 * ratio,
              width = 1 + 0.5 * ratio,
              classed = 'from-' + datum.sourceId + ' to-' + datum.targetId;
            this.style.stroke = 'rgba(255, 255, 255, ' + opacity + ')';
            this.style.strokeWidth = width;
            d3This.classed('edge ' + classed, true);
            // triple number
            this.d3NumberOfTriples = __g.d3.edges.append('text').classed(classed, true);
            this.d3NumberOfTriples.append('tspan').classed('number-of-triples', true).text(datum.numberOfTriples.toLocaleString());
            if (datum.type) {
              this.d3NumberOfTriples.append('tspan').classed('type', true).attr('dx', 5).text(datum.type);
            }
          });

          // force layout
          parseInt(__g.d3.svg.attr('width'));
          parseInt(__g.d3.svg.attr('height'));
          __g.d3.force = d3.forceSimulation()
          //.velocityDecay(0.1) // ノードの速度減衰係数
          .alpha(0.0025)
          //.alphaDecay(0.9)
          .alphaTarget(0).force('link',
          // リンクによるバネ力
          d3.forceLink()
          //.distance(distance) // リンクの長さ
          //.strength(.5) // リンクの強度
          //.iterations() // 計算回数
          )
          //.force('collide', // ノード間の接触反発力
          //	d3.forceCollide()
          //		.radius(function(d) { return d.star.size * .5; }) // ノード半径
          //		.strength(1.0) // オーバーラップするノード間の反発力 0.0〜1.0
          //		.iterations(16) // 計算回数
          //)
          .force('charge',
          // ノード間のクーロン力（非接触作用力）
          d3.forceManyBody()
          //.strength(-300) // 正でくっつき、負で離れる
          //.theta() // 精度
          //.distanceMin() // クーロン力を計算する最小距離
          //.distanceMax() // ノード間の最大距離
          ).force('x',
          // 位置に基づく場の力
          d3.forceX().strength(0.1).x(0) // 中心x座標
          ).force('y',
          // 位置に基づく場の力
          d3.forceY().strength(0.1).y(0) // 中心y座標
          );
          //.force('center',
          //	d3.forceCenter(screenWidth * 0.5, screenHeight * 0.5)
          //);
          // ノード
          __g.d3.force.nodes(__g.d3.nodesData);
          // エッジ
          __g.d3.force.force('link').links(__g.d3.linksData);

          // force layout のパラメータ確認用のコンソール
          $('#force-layout-console').find('input').each(function () {
            //this.value = __g.d3.force[this.dataset.key]();
          }).on('change', function () {
            //__g.d3.force[this.dataset.key]( parseFloat(this.value) ).resume();
          });

          // ドラッグ可能に
          __g.d3.nodesSelection.call(d3.drag().on('start', function (d) {
            if (!d3.event.active) __g.d3.force.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          }).on('drag', function (d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
          }).on('end', function (d) {
            if (!d3.event.active) __g.d3.force.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }));
        }

        // 準備カウンタを1つ減らす
        this.appPrepareDecrement();
      }
    }]);
    return RDFPortal;
  }(); // ********** end of RDFPortal class

  /* global $ */

  var DEFAULTS = 'defaults';

  /* User defaults class
   * 初期設定クラス
   * 
   */
  var UserDefaults = /*#__PURE__*/function () {
    function UserDefaults() {
      _classCallCheck(this, UserDefaults);
      this.defaults = {
        all: {
          providedAs: 'original'
        },
        list: {
          sortBy: 'LastUpdate',
          isAscend: true,
          filteringTags: null
        },
        matrix: {
          sortBy: 'Triples',
          colItems: [{
            name: 'Alphabetical',
            isAscend: true
          }, {
            name: 'Triples',
            isAscend: true
          }, {
            name: 'Links',
            isAscend: true
          }, {
            name: 'Classes',
            isAscend: true
          }, {
            name: 'Instances',
            isAscend: true
          }, {
            name: 'Literals',
            isAscend: true
          }, {
            name: 'Subjects',
            isAscend: true
          }, {
            name: 'Properties',
            isAscend: true
          }, {
            name: 'Objects',
            isAscend: true
          }]
        },
        graph: {
          scaling: 'None',
          markedTag: 'Invalid'
        },
        misc: {
          language: 'en',
          isOpenedControlPanel: true
        }
      };
      this._defaults;
      $.cookie.json = true;
      var self = this;
      if ($.cookie(DEFAULTS)) {
        this._defaults = $.cookie(DEFAULTS);
      } else {
        this._defaults = $.extend(true, {}, this.defaults);
      }

      // check user defaults
      var _check = function _check(obj1, obj2) {
        for (var i in obj2) {
          if (obj1[i] === undefined || _typeof(obj1[i]) !== _typeof(obj2[i])) {
            throw 'unmatch';
          } else {
            switch (_typeof(obj2[i])) {
              case 'object':
              case 'array':
                _check(obj1[i], obj2[i]);
                break;
            }
          }
        }
      };
      try {
        _check(this._defaults, this.defaults);
      } catch (e) {
        window.console.log(e);
        this._defaults = $.extend(true, {}, this.defaults);
      }
      this.all = {
        get providedAs() {
          return self._defaults.all.providedAs;
        },
        set providedAs(val) {
          self._defaults.all.providedAs = val;
        }
      };
      this.home = {};
      this.list = {
        get sortBy() {
          return self._defaults.list.sortBy;
        },
        set sortBy(val) {
          self._defaults.list.sortBy = val;
        },
        get isAscend() {
          return self._defaults.list.isAscend;
        },
        set isAscend(val) {
          self._defaults.list.isAscend = val;
        },
        get filteringTags() {
          return self._defaults.list.filteringTags;
        },
        set filteringTags(val) {
          self._defaults.list.filteringTags = val;
        }
      };
      this.matrix = {
        get sortBy() {
          return self._defaults.matrix.sortBy;
        },
        set sortBy(val) {
          self._defaults.matrix.sortBy = val;
        },
        get colItems() {
          return self._defaults.matrix.colItems;
        },
        set colItems(val) {
          self._defaults.matrix.colItems = val;
        }
      };
      this.graph = {
        get scaling() {
          return self._defaults.graph.scaling;
        },
        set scaling(val) {
          self._defaults.graph.scaling = val;
        },
        get markedTag() {
          return self._defaults.graph.markedTag;
        },
        set markedTag(val) {
          self._defaults.graph.markedTag = val;
        }
      };
      this.detail = {};
      this.misc = {
        get language() {
          return self._defaults.misc.language;
        },
        set language(val) {
          self._defaults.misc.language = val;
        },
        get isOpenedControlPanel() {
          return self._defaults.misc.isOpenedControlPanel;
        },
        set isOpenedControlPanel(val) {
          self._defaults.misc.isOpenedControlPanel = val;
        }
      };
    }
    _createClass(UserDefaults, [{
      key: "synchronize",
      value: function synchronize() {
        $.cookie(DEFAULTS, this._defaults);
      }
    }]);
    return UserDefaults;
  }(); // ********** end of UserDefaults class

  /*global $, d3 */
  $(function () {
    __g.d3.svg = d3.select('main#main-view').append('svg').attr('id', 'svg');

    // ガイドラインの取得
    $('#guideline-view').find('.guideline-outline li').each(function (index, elm) {
      var $this = $(elm);
      __g.guideline[$this.find('.guideline-number').text()] = $this.find('.guideline-statement').text();
    });

    // dataset の json ファイルをロードしたらアプリケーションの初期化
    $.getJSON('strings.json', function (data) {
      __g.STRINGS = data;
      $.getJSON('data/datasets.json', function (data) {
        return init(data);
      });
    });
    function init(data) {
      __g.userDefaults = new UserDefaults();
      __g.app = new RDFPortal();
      __g.app.init(data);
      // ウインドウを閉じる際に諸情報を保存
      $w.on('unload', function () {
        return __g.userDefaults.synchronize();
      });
    }
  });

})();
//# sourceMappingURL=main.js.map
