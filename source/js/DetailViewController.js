/* global $, CodeMirror */

import {
  $w,
  __g,
  _html,
  _htmlTR,
  _htmlTRDetail,
  _htmlTRValueNumeral,
  _htmlTRHasDetailValueNumeral2,
  _htmlAnchor,
  _htmlStatics,
  _htmlHasDetailAndDetail,
  _MLHtml,
  _MLAnchor,
  _placeComma,
  _sanitizeTag,
  _numeral,
} from "./global.js";
import StarImage from "./StarImage.js";

const ORIGIN = {
    X: 113,
    Y: 86,
  },
  OFFSET = {
    X: -60,
    Y: 0,
  };

/* Detail view manager class
 * 詳細ビュー管理クラス
 *
 */
export default class DetailViewController {
  constructor() {
    this._counter = 0;
    this._$currentDetailView;
    this._$frame;

    $("body").append(
      '<div id="detail-view-frame"><div class="inner"></div></div>'
    );
    this._$frame = $("#detail-view-frame")
      .children(".inner")
      .on("animationend webkitAnimationEnd oAnimationEnd", function (e) {
        //$(this).removeClass('frame-in frame-out');
        $(e.delegateTarget).removeClass("frame-in frame-out");
      });
  }

  show() {
    $("body, html").animate({ scrollTop: 0 }, __g.DETAIL_DELAY, "swing");
    window.setTimeout(() => {
      this.makeDetailView();
    }, __g.DETAIL_DELAY * 0.25);
    this._$frame.addClass("frame-in");
  }

  makeDetailView() {
    var STR = __g.STRINGS,
      ID_SPECIFICATION = "detail-specification",
      ID_CONNECTED_DATASETS = "detail-connected-datasets",
      ID_STATISTICS = "detail-statistics",
      ID_SCHEMA = "detail-schema",
      ID_SPARQL_EXAMPLES = "detail-sparql-examples",
      ID_STANZA = "detail-stanzas",
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
      noOfConnectedDatasets =
        datasets.connectedDatasetIds.noOf(starId) + datasets.xref.noOf(starId),
      noOfSPARQLExamples = datasets.SPARQLExamples.noOf(starId),
      noOfSchema = datasets.schema.noOf(starId),
      //noOfStanza = datasets.stanza.noOf(starId),
      noOfStanza = 0, // スタンザは出力しないよう、一時的に0を代入
      disposableStarIds = [],
      cmEditor,
      cmEditors = [];

    console.log(datasets);

    // スター（ノード）に通知
    __g.app.stars.forEach(function (star) {
      star.prepareDetailView(starId);
    });

    // ディティールビューを生成
    html =
      `<div id="detail-view${this._counter}" class="detail-view">` +
      _html("h2", _MLHtml(datasets.title(starId))) +
      `<p class="homepage">${_MLAnchor(datasets.uri(starId), STR.launch)}</p>` +
      `<div class="description">${_MLHtml(
        datasets.description(starId)
      )}</div>` +
      _html(
        "aside",
        { id: ID_SPECIFICATION, class: "specification" }, // #### Specification
        _html("h3", _MLHtml(STR.specification)) +
          _html(
            "table",
            { class: "horizontal-table" },
            _html(
              "tbody",
              { class: "specification" },
              _htmlTR(
                _MLHtml(STR.tags),
                (function () {
                  // tags
                  var subHtml = '<ul class="tags">',
                    tag;
                  for (i = 0; i < datasets.tags.noOf(starId); i++) {
                    tag = datasets.tags.tag(starId, i);
                    subHtml += `<li class="tag-${_sanitizeTag(
                      tag.en
                    )}">${_MLHtml(tag)}</li>`;
                  }
                  subHtml += "</ul>";
                  return subHtml;
                })()
              ) +
                _htmlTR(
                  _MLHtml(STR.dataProvider),
                  _MLHtml(datasets.dataProvider(starId))
                ) +
                _htmlTR(
                  _MLHtml(STR.creators),
                  (function () {
                    var numberOfCreators = datasets.creators.noOf(starId),
                      subHtml = "<ul>";
                    for (i = 0; i < numberOfCreators; i++) {
                      subHtml += `<li>${_MLHtml(
                        datasets.creators.name(starId, i)
                      )}&nbsp;&nbsp;<small>${_MLHtml(
                        datasets.creators.affiliation(starId, i)
                      )}</small></li>`;
                    }
                    return subHtml + "</ul>";
                  })()
                ) +
                _htmlTR(_MLHtml(STR.version), datasets.version(starId)) +
                _htmlTR(_MLHtml(STR.issued), datasets.issued(starId)) +
                (() => {
                  return datasets.license.uri(starId)[__g.app.language] === ""
                    ? ""
                    : _htmlTR(
                        _MLHtml(STR.license),
                        _MLAnchor(
                          datasets.license.uri(starId),
                          datasets.license.name(starId)
                        ) +
                          "<br>" +
                          _MLHtml(datasets.license.credit(starId))
                      );
                })() +
                _htmlTR(
                  _MLHtml(STR.status),
                  `<div class="reviewed-icon${
                    datasets.reviewed(starId) === "reviewed"
                      ? ""
                      : " -unreviewed"
                  }"></div> <span>${_MLHtml(
                    datasets.reviewed(starId) === "reviewed"
                      ? STR.reviewed
                      : STR.unreviewed
                  )}</span>` +
                    `<div class="star" data-provided-as="${datasets.providedAs(
                      starId
                    )}"><div class="icon"><div class="body"></div></div></div><span>${_MLHtml(
                      datasets.providedAs(starId) === "original"
                        ? STR.originalDataset
                        : STR.thirdPartyDataset
                    )}</span>`
                ) +
                _htmlTR(
                  _MLHtml(STR.downloadFile),
                  _html(
                    "p",
                    { class: "file" },
                    _html(
                      "a",
                      { href: datasets.downloadFile.uri(starId) },
                      datasets.downloadFile.name(starId)
                    ) +
                      " " +
                      _html(
                        "small",
                        _numeral(datasets.downloadFile.size(starId)) + " bytes"
                      )
                  )
                ) /* + // ガイドライン一時的にコメントアウト
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
							)*/
            )
          )
      ) +
      (function () {
        // #### 関連データセット
        var subHtml1 = "";
        if (noOfConnectedDatasets > 0) {
          // 関連データセットのソート
          subHtml1 += _html(
            "aside",
            { id: ID_CONNECTED_DATASETS, class: "connected-dataset-ids" },
            _MLHtml("h3", STR.connectedDatasetIDs) +
              _html(
                "div",
                { class: "stars" },
                (function () {
                  var subHtml2 = "",
                    id,
                    type,
                    disposableStarId,
                    maxTriples = 0,
                    noOfTriples = [],
                    noOfConnectedDatasets =
                      datasets.connectedDatasetIds.noOf(starId),
                    noOfXrefs = datasets.xref.noOf(starId);
                  // calculation
                  for (i = 0; i < noOfConnectedDatasets; i++) {
                    noOfTriples[i] = datasets.connectedDatasetIds.noOfTriple(
                      starId,
                      i
                    );
                    maxTriples =
                      maxTriples > noOfTriples[i] ? maxTriples : noOfTriples[i];
                  }
                  for (j = 0; j < noOfXrefs; j++) {
                    noOfTriples[i + j] = datasets.xref.noOfTriples(starId, j);
                    maxTriples =
                      maxTriples > noOfTriples[i + j]
                        ? maxTriples
                        : noOfTriples[i + j];
                  }
                  // internal
                  for (i = 0; i < noOfConnectedDatasets; i++) {
                    disposableStarId =
                      "disposableStar" + __g.disposableStarId++;
                    id = datasets.connectedDatasetIds.id(starId, i);
                    type = datasets.connectedDatasetIds.type(starId, i);
                    subHtml2 += `<div id="${disposableStarId}" class="star" data-id="${id}" data-type="${type}">
												<div class="icon"></div>
												<div class="label">
													${_MLHtml("h2", datasets.title(id))}
													${type ? `<p class="link-type">${type}</p>` : ""}
												</div>
												<div class="bar" style="width: ${(noOfTriples[i] / maxTriples) * 75}%;">
													<p class="number-of-triples">${_numeral(noOfTriples[i])}<small>links</small></p>
												</div>
											</div>`;
                    disposableStarIds.push(disposableStarId);
                  }
                  for (j = 0; j < noOfXrefs; j++) {
                    type = datasets.xref.type(starId, j);
                    subHtml2 += `
											<div class="star xref" data-type="${type}">
												<a class="icon" href="${datasets.xref.uri(starId, j)}" target="_blank"></a>
												<div class="label">
													${_MLHtml("h2", datasets.xref.title(starId, j))}
													${type ? `<p class="link-type">${type}</p>` : ""}
												</div>
												<div class="bar" style="width: ${(noOfTriples[i + j] / maxTriples) * 75}%;">
													<p class="number-of-triples">${_numeral(
                            noOfTriples[i + j]
                          )}<small>links</small></p>
												</div>
											</div>`;
                  }
                  // external
                  return subHtml2;
                })()
              )
          );
        }
        return subHtml1;
      })() +
      _html(
        "aside",
        { id: ID_STATISTICS, class: "statistics" }, // #### 統計情報
        _MLHtml("h3", STR.statistics) +
          _html(
            "table",
            { class: "horizontal-table" },
            _htmlStatics(starId) +
              _htmlHasDetailAndDetail("graphs") + // Graphs
              _htmlHasDetailAndDetail("ontologies") // Ontologies
          )
      ) +
      (function () {
        // #### Schema
        if (noOfSchema === 0) {
          return "";
        }
        var subHtml = "";
        for (var i = 0; i < noOfSchema; i++) {
          subHtml +=
            '<a href="' +
            datasets.schema.imageUri(starId, i) +
            '" target="_blank" class="schema">' +
            '<img src="' +
            datasets.schema.imageUri(starId, i) +
            '" alt="">' +
            _MLHtml("span", { class: "open" }, STR.open) +
            "</a>";
        }
        subHtml = _html(
          "aside",
          { id: ID_SCHEMA, class: "schema" },
          _MLHtml("h3", STR.schema) + _html("div", { class: "images" }, subHtml)
        );
        return subHtml;
      })() +
      (function () {
        // #### SPARQL examples
        if (noOfSPARQLExamples === 0) {
          return "";
        }
        var subHtml1 = _html(
          "aside",
          { id: ID_SPARQL_EXAMPLES, class: "sparql-examples" },
          _MLHtml("h3", STR.sparqlExamples) +
            (function () {
              var subHtml2 = "";
              for (var i = 0; i < datasets.SPARQLExamples.noOf(starId); i++) {
                subHtml2 += _html(
                  "div",
                  { class: "sparql" },
                  '<textarea class="sparql-textarea">' +
                    datasets.SPARQLExamples.sparql(starId, i) +
                    "</textarea>" +
                    _html(
                      "form",
                      {
                        action: datasets.SPARQLExamples.uri(starId, i),
                        target: "_blank",
                        method: "GET",
                      },
                      _html(
                        "button",
                        { type: "submit" },
                        _MLHtml(STR.sparqlEndpoint)
                      ) +
                        _html(
                          "input",
                          {
                            type: "hidden",
                            name: "query",
                            value: datasets.SPARQLExamples.sparql(
                              starId,
                              i
                            ).replace(/"/g, "&quot;"),
                          },
                          ""
                        )
                    )
                );
              }
              return subHtml2;
            })()
        );
        return subHtml1;
      })() +
      (function () {
        // #### Stanza
        //// Rubby wrapper CASE
        if (noOfStanza === 0) {
          return "";
        }
        var subHtml1 = _html(
          "aside",
          { id: ID_STANZA, class: "stanzas" },
          _MLHtml("h3", STR.stanzas) +
            (function () {
              var subHtml2 = "";
              for (var i = 0; i < noOfStanza; i++) {
                subHtml2 += `<div class="stanza"><h4>${datasets.stanza.label(
                  starId,
                  i
                )}</h4><p class="definition">${datasets.stanza.definition(
                  starId,
                  i
                )}</p>@@parameters@@<iframe src="http://togostanza.org/stanza/js_stanza_wrapper?server=http%3A%2F%2Ftogostanza.org%2Fdist%2Fstanza&name=${datasets.stanza.id(
                  starId,
                  i
                )}&options=@@options@@"></iframe></div>`
                  .replace(
                    "@@parameters@@",
                    (function () {
                      var subHtml3 = "";
                      for (
                        var j = 0;
                        j < datasets.stanza.parameter.noOf(starId, i);
                        j++
                      ) {
                        subHtml3 += `<div class="parameter ${
                          datasets.stanza.parameter.required(starId, i, j)
                            ? "required"
                            : ""
                        }"><p class="key">${datasets.stanza.parameter.key(
                          starId,
                          i,
                          j
                        )}</p><input type="text" value="${datasets.stanza.parameter.example(
                          starId,
                          i,
                          j
                        )}"><p class="description">${datasets.stanza.parameter.description(
                          starId,
                          i,
                          j
                        )}</p></div>`;
                      }
                      return subHtml3;
                    })()
                  )
                  .replace(
                    "@@options@@",
                    (function () {
                      var subHtml3 = "";
                      for (
                        var j = 0;
                        j < datasets.stanza.parameter.noOf(starId, i);
                        j++
                      ) {
                        subHtml3 +=
                          (j === 0 ? "" : "+") +
                          datasets.stanza.parameter.key(starId, i, j) +
                          "=" +
                          datasets.stanza.parameter.example(starId, i, j);
                      }
                      return subHtml3;
                    })()
                  );
              }
              return subHtml2;
            })()
        );
        //// JS CASE
        /*
					var stanza = 'protein_sequence';
					$('head').append('<link rel="import" href="./stanza/list_compounds_bound_to_givin_protein.html">');
					var subHtml1 =
					_html('aside', { id: ID_STANZA, class: 'stanzas' },
						_MLHtml('h3', STR.stanzas) +
						'<togostanza-list_compounds_bound_to_givin_protein up_id="P00533" standard_type="IC50"></togostanza-list_compounds_bound_to_givin_protein>'
						);
						*/
        //// IFRAME CASE
        /*
					var subHtml1 =
					_html('aside', { id: ID_STANZA, class: 'stanzas' },
						_MLHtml('h3', STR.stanzas) +
						'<iframe class="" style="height: 500px;" id="stanza-frame-1" name="stanza-frame-1" src="http://togostanza.org/stanza/environment_geographical_map?meo_id=MEO_0000029"></iframe>'
						);
						*/
        return subHtml1;
      })() +
      "</div><!-- /.detail-view -->" +
      (function () {
        // navigation
        var subHtml = '<nav class="detail-navigation">';
        subHtml += _html(
          "a",
          { href: "#" + ID_SPECIFICATION },
          _MLHtml("h3", STR.specification)
        );
        subHtml +=
          noOfConnectedDatasets > 0
            ? _html(
                "a",
                { href: "#" + ID_CONNECTED_DATASETS },
                _MLHtml("h3", STR.connectedDatasetIDs)
              )
            : "";
        subHtml += _html(
          "a",
          { href: "#" + ID_STATISTICS },
          _MLHtml("h3", STR.statistics)
        );
        subHtml +=
          noOfSchema !== 0
            ? _html("a", { href: "#" + ID_SCHEMA }, _MLHtml("h3", STR.schema))
            : "";
        subHtml +=
          noOfSPARQLExamples > 0
            ? _html(
                "a",
                { href: "#" + ID_SPARQL_EXAMPLES },
                _MLHtml("h3", STR.sparqlExamples)
              )
            : "";
        subHtml +=
          noOfStanza > 0
            ? _html("a", { href: "#" + ID_STANZA }, _MLHtml("h3", STR.stanzas))
            : "";
        return subHtml + "</nav>";
      })();
    __g.app.$main.append(html);
    this._$currentDetailView = $("#detail-view" + this._counter++);
    //$detailView = __g.append
    __g.app.$main.children(".detail-view");
    _$schemaImages = $("#detail-schema").children(".images");

    // comma
    _placeComma(this._$currentDetailView);

    // CodeMirror
    width = $w.innerWidth() - __g.DETAIL_MARGIN;
    this._$currentDetailView
      .find(".sparql-examples")
      .find("textarea")
      .each(function () {
        cmEditor = CodeMirror.fromTextArea(this, {
          mode: "application/sparql-query",
          matchBrackets: true,
          lineNumbers: true,
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
        src +=
          (i === 0 ? "" : "+") +
          $parameter.find("p.key").text() +
          "=" +
          $parameter.find("input").val();
      }
      $iframe.attr("src", src);
    });

    // ナブゲーション押下でスムーズスクロール
    $detailNavigationItems = __g.app.$main
      .children("nav.detail-navigation")
      .find("a")
      .each(function () {
        this.$ = $(this);
        this.$target = $(this.getAttribute("href"));
      })
      .on("click", function () {
        var top = this.$target.offset().top;
        $("body, html").animate({ scrollTop: top }, 400, "swing");
        return false;
      });
    $w.on({
      "scroll.detail-navigation": function () {
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
      "resize.detail-code-mirror": function () {
        width = $w.innerWidth() - __g.DETAIL_MARGIN;
        _$schemaImages.width(width);
        for (i = 0; i < cmEditors.length; i++) {
          cmEditors[i].setSize(width, "auto");
        }
      },
    }).triggerHandler("scroll.detail-navigation");

    // 関連データセットのノード
    for (i = 0; i < disposableStarIds.length; i++) {
      $connectedDataset = $("#" + disposableStarIds[i]);
      $connectedDataset.children(".icon").on("click", function () {
        __g.app.starsWithKeys[
          this.parentNode.getAttribute("data-id")
        ].clickedAlias(this);
      });
      new StarImage(
        datasets.connectedDatasetIds.id(starId, i),
        $connectedDataset
      );
    }

    // 子項目を持つ要素の折りたたみとインタラクション定義
    var _setDetailCollapsible = function (elm) {
      $(elm)
        .find(".has-detail")
        .each(function () {
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
            display: "block",
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
            if (
              jsonUri !== "undefined" &&
              jsonUri !== undefined &&
              jsonUri !== null &&
              !isLoaded
            ) {
              // ロード
              window.setTimeout(function () {
                var DATASETS =
                  classification === "undefined"
                    ? __g.app.datasets[jsonKind]
                    : __g.app.datasets[classification][jsonKind];
                DATASETS.load(
                  starId,
                  function () {
                    _makeCollapsedTable(
                      DATASETS,
                      classification,
                      jsonKind,
                      index,
                      0,
                      $this.next(".detail").find("tbody")
                    );
                  },
                  index
                );
              }, 600);
            }
          });
        });
    };
    _setDetailCollapsible(this._$currentDetailView);

    // 折りたたまれたテーブルの生成
    var _makeCollapsedTable = function (
      DATASETS,
      classification,
      jsonKind,
      index,
      offset,
      $tbody
    ) {
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
              anchor =
                typeof label === "string"
                  ? _htmlAnchor(uri, label)
                  : _MLAnchor(uri, label);
              subHtml += _htmlTRValueNumeral(
                anchor,
                DATASETS.noOfInstances(starId, i, index)
              );
            }
            break;
          case "properties":
            {
              uri = DATASETS.property(starId, i, index);
              noOfDomainClasses = DATASETS.domainClasses.noOf(starId, i, index);
              noOfRangeClasses = DATASETS.rangeClasses.noOf(starId, i, index);
              if (noOfDomainClasses === 0) {
                subHtml += _htmlTRValueNumeral(
                  _htmlAnchor(uri, uri),
                  DATASETS.noOfTriples(starId, i, index)
                );
              } else {
                // domain/range クラスを property の持つ場合
                subHtml +=
                  _htmlTRHasDetailValueNumeral2(
                    _htmlAnchor(uri, uri),
                    DATASETS.noOfTriples(starId, i, index),
                    "classes",
                    undefined,
                    classification,
                    i
                  ) +
                  _htmlTRDetail(
                    (function () {
                      var subHtml4 = _html(
                        "table",
                        {
                          class: "internal left-heading domain-and-range-class",
                        },
                        _html(
                          "tbody",
                          { class: "domain-class" },
                          (function () {
                            // domain classes
                            var subHtml5 = "";
                            for (var k = 0; k < noOfDomainClasses; k++) {
                              subHtml5 += _html(
                                "tr",
                                (k === 0
                                  ? _MLHtml(
                                      "th",
                                      { rowspan: noOfDomainClasses },
                                      STR.domainClasses
                                    )
                                  : "") +
                                  _html(
                                    "td",
                                    _htmlAnchor(
                                      DATASETS.domainClasses.domainClass(
                                        starId,
                                        k,
                                        i,
                                        index
                                      ),
                                      _MLHtml(
                                        DATASETS.domainClasses.label(
                                          starId,
                                          k,
                                          i,
                                          index
                                        )
                                      )
                                    )
                                  )
                              );
                            }
                            return subHtml5;
                          })()
                        ) +
                          _html(
                            "tbody",
                            { class: "range-class" },
                            (function () {
                              // range classes
                              var subHtml5 = "";
                              for (var k = 0; k < noOfRangeClasses; k++) {
                                subHtml5 += _html(
                                  "tr",
                                  (k === 0
                                    ? _MLHtml(
                                        "th",
                                        { rowspan: noOfRangeClasses },
                                        STR.rangeClasses
                                      )
                                    : "") +
                                    _html(
                                      "td",
                                      _htmlAnchor(
                                        DATASETS.rangeClasses.rangeClass(
                                          starId,
                                          k,
                                          i,
                                          index
                                        ),
                                        _MLHtml(
                                          DATASETS.rangeClasses.label(
                                            starId,
                                            k,
                                            i,
                                            index
                                          )
                                        )
                                      )
                                    )
                                );
                              }
                              return subHtml5;
                            })()
                          )
                      );
                      return subHtml4;
                    })()
                  );
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
        $tbody.append(
          '<tr class="more"><td colspan="2">' +
            _MLHtml(__g.STRINGS.more) +
            "<small>(" +
            (i + 1) +
            "~)</small></td></tr>"
        );
        $tbody.find("tr.more").on("click", function () {
          _makeCollapsedTable(
            DATASETS,
            classification,
            jsonKind,
            index,
            i,
            $tbody
          );
        });
      }
    };

    // 遷移終了
    window.setTimeout(() => {
      this._$currentDetailView.addClass("shown");
      __g.app.changed(__g.VIEWS_NAME.indexOf("dataset"));
    }, __g.DETAIL_DELAY * 0.25);
  }

  hide() {
    this._$currentDetailView
      .addClass("hidden")
      .delay(__g.DETAIL_DELAY * 4)
      .animate(
        { opacity: 0 },
        {
          duration: __g.DETAIL_DELAY,
          complete: function () {
            $(this).remove();
          },
        }
      );
    $w.off("scroll.detail-navigation resize.detail resize.detail-code-mirror");
    __g.app.$main.children("nav.detail-navigation").remove();
    __g.app.stars.forEach(function (star) {
      star.prepareLeaveFromDetailView();
    });
    this._$frame.addClass("frame-out");
  }

  // accessor
  static get ORIGIN() {
    return ORIGIN;
  }
  static get OFFSET() {
    return OFFSET;
  }
} // ********** end of DetailViewController class
