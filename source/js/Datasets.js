/* global $ */

import {__g} from './global.js';

/* Datasets class
 * データセットのアクセッサーシングルトンクラス
 * json データの変換・橋渡しを行う
 * @param param object
 * 
 */
export default class Datasets {

	constructor(data) {
		this._noOfDatasets;
		this._classes = {};
		this._graphClasses = {};
		this._ontologyClasses = {};
		this._properties = {};
		this._graphProperties = {};
		this._ontologyProperties = {};
		this.data = data;
		const self = this;

		this.creators = {
			noOf: function(id) {
				return data[id].creators.length;
			},
			name: function(id, index) {
				return data[id].creators[index].name;
			},
			affiliation: function(id, index) {
				return data[id].creators[index].affiliation;
			}
		};

		this.version = function(id) {
			return data[id].version;
		};
		this.issued = function(id) {
			return data[id].issued;
		};
		this.logotypeUrl = function(id) {
			return data[id].logo_url;
		};

		this.schema = {
			noOf: function(id) {
				return data[id].schema_image_urls.length;
			},
			imageUri: function(id, index) {
				return data[id].schema_image_urls[index];
			}
		};

		this.downloadFile = {
			name: function(id) {
				return data[id].download_file.name;
			},
			uri: function(id) {
				return data[id].download_file.url;
			},
			size: function(id) {
				return data[id].download_file.size;
			}
		};

		this.noOfTriples = function(id) {
			return data[id].number_of_triples;
		};
		this.noOfInstances = function(id) {
			return data[id].number_of_instances;
		};
		this.noOfSubjects = function(id) {
			return data[id].number_of_subjects;
		};
		this.noOfObjects = function(id) {
			return data[id].number_of_objects;
		};
		this.noOfLiterals = function(id) {
			return data[id].number_of_literals;
		};
		this.noOfClasses = function(id) {
			return data[id].number_of_classes;
		};
		this.noOfProperties = function(id) {
			return data[id].number_of_properties;
		};
		this.noOfDatatypes = function(id) {
			return data[id].number_of_datatypes;
		};
		this.noOfLinks = function(id) {
			return data[id].number_of_links;
		};

		this.classes = {
			noOf: function(id) {
				return data[id].number_of_classes;
			},
			jsonUri: function(id) {
				return data[id].classes;
			},
			load: function(id, callback) {
				if (!self._classes[id]) {
					$.getJSON(
						self.classes.jsonUri(id),
						function(data) {
							self._classes[id] = data;
							callback();
						}
					);
				}
			},
			class: function(id, index) {
				return self._classes[id][index].class;
			},
			label: function(id, index) {
				return self._classes[id][index].label[__g.app.language];
			},
			noOfInstances: function(id, index) {
				return self._classes[id][index].number_of_instances;
			}
		};

		this.properties = {
			noOf: function(id) {
				return data[id].number_of_properties;
			},
			jsonUri: function(id) {
				return data[id].properties;
			},
			load: function(id, callback) {
				if (!self._properties[id]) {
					$.getJSON(
						self.properties.jsonUri(id),
						function(data) {
							self._properties[id] = data;
							callback();
						}
					);
				}
			},
			property: function(id, index) {
				return self._properties[id][index].property;
			},
			noOfTriples: function(id, index) {
				return self._properties[id][index].number_of_triples;
			},
			domainClasses: {
				noOf: function(id, index) {
					return self._properties[id][index].domain_classes.length;
				},
				domainClass: function(id, index, index2) {
					return self._properties[id][index2].domain_classes[index].domain_class;
				},
				label: function(id, index, index2) {
					return self._properties[id][index2].domain_classes[index].label;
				},
				noOfInstances: function(id, index, index2) {
					return self._properties[id][index2].domain_classes[index].number_of_instances;
				}
			},
			rangeClasses: {
				noOf: function(id, index) {
					return self._properties[id][index].range_classes.length;
				},
				rangeClass: function(id, index, index2) {
					return self._properties[id][index2].range_classes[index].range_class;
				},
				label: function(id, index, index2) {
					return self._properties[id][index2].range_classes[index].label;
				},
				noOfInstances: function(id, index, index2) {
					return self._properties[id][index2].range_classes[index].number_of_instances;
				}
			}
		};

		// datatype
		this.datatypes = {
			noOf: function(id) {
				return data[id].number_of_datatypes;
			},
			datatype: function(id, index) {
				return data[id].datatypes[index];
			}
		};

		// cross reference
		this.xref = {
			noOf: function(id) {
				return data[id].xrefs.length;
			},
			uri: function(id, index) {
				return data[id].xrefs[index].uri_space;
			},
			type: function(id, index) {
				return data[id].xrefs[index].type;
			},
			title: function(id, index) {
				return data[id].xrefs[index].title;
			},
			noOfTriples: function(id, index) {
				return data[id].xrefs[index].number_of_triples;
			}
		};

		// connected
		this.connectedDatasetIds = {
			noOf: function(id) {
				return data[id].connected_dataset_ids.length;
			},
			id: function(id, index) {
				return data[id].connected_dataset_ids[index].id;
			},
			type: function(id, index) {
				return data[id].connected_dataset_ids[index].type;
			},
			noOfTriple: function(id, index) {
				return data[id].connected_dataset_ids[index].number_of_triples;
			}
		};

		// ontology
		this.ontologies = {
			noOf: function(id) {
				return data[id].ontologies.length;
			},
			uri: function(id, index) {
				return data[id].ontologies[index].uri;
			},
			description: function(id, index) {
				return data[id].ontologies[index].description;
			},
			files: {
				noOf: function(id, index) {
					return data[id].ontologies[index].files.length;
				},
				name: function(id, index, index2) {
					return data[id].ontologies[index2].files[index].name;
				},
				uri: function(id, index, index2) {
					return data[id].ontologies[index2].files[index].url;
				},
				size: function(id, index, index2) {
					return data[id].ontologies[index2].files[index].size;
				}
			},
			noOfTriples: function(id, index) {
				return data[id].ontologies[index].number_of_triples;
			},
			noOfInstances: function(id, index) {
				return data[id].ontologies[index].number_of_instances;
			},
			noOfSubjects: function(id, index) {
				return data[id].ontologies[index].number_of_subjects;
			},
			noOfObjects: function(id, index) {
				return data[id].ontologies[index].number_of_objects;
			},
			noOfLiterals: function(id, index) {
				return data[id].ontologies[index].number_of_literals;
			},
			classes: {
				noOf: function(id, index) {
					return data[id].ontologies[index].number_of_classes;
				},
				jsonUri: function(id, index) {
					return data[id].ontologies[index].classes;
				},
				load: function(id, callback, index) {
					if (!self._ontologyClasses[id]) {
						self._ontologyClasses[id] = [];
					}
					if (!self._ontologyClasses[id][index]) {
						$.getJSON(
							self.classes.jsonUri(id),
							function(data) {
								self._ontologyClasses[id][index] = data;
								callback();
							}
						);
					}
				},
				class: function(id, index, index2) {
					return self._ontologyClasses[id][index2][index].class;
				},
				label: function(id, index, index2) {
					return self._ontologyClasses[id][index2][index].label;
				},
				noOfInstances: function(id, index, index2) {
					return self._ontologyClasses[id][index2][index].number_of_instances;
				}
			},
			properties: {
				noOf: function(id, index) {
					return data[id].ontologies[index].number_of_properties;
				},
				jsonUri: function(id, index) {
					return data[id].ontologies[index].properties;
				},
				load: function(id, callback, index) {
					if (!self._ontologyProperties[id]) {
						self._ontologyProperties[id] = [];
					}
					if (!self._ontologyProperties[id][index]) {
						$.getJSON(
							self.properties.jsonUri(id),
							function(data) {
								self._ontologyProperties[id][index] = data;
								callback();
							}
						);
					}
				},
				property: function(id, index, index2) {
					return self._ontologyProperties[id][index2][index].property;
				},
				noOfTriples: function(id, index, index2) {
					return self._ontologyProperties[id][index2][index].number_of_triples;
				},
				domainClasses: {
					noOf: function(id, index, index2) {
						return self._ontologyProperties[id][index2][index].domain_classes.length;
					},
					domainClass: function(id, index, index2, index3) {
						return self._ontologyProperties[id][index3][index2].domain_classes[index].domain_class;
					},
					label: function(id, index, index2, index3) {
						return self._ontologyProperties[id][index3][index2].domain_classes[index].label;
					},
					noOfInstances: function(id, index, index2, index3) {
						return self._ontologyProperties[id][index3][index2].domain_classes[index].number_of_instances;
					}
				},
				rangeClasses: {
					noOf: function(id, index, index2) {
						return self._ontologyProperties[id][index2][index].range_classes.length;
					},
					rangeClass: function(id, index, index2, index3) {
						return self._ontologyProperties[id][index3][index2].range_classes[index].range_class;
					},
					label: function(id, index, index2, index3) {
						return self._ontologyProperties[id][index3][index2].range_classes[index].label;
					},
					noOfInstances: function(id, index, index2, index3) {
						return self._ontologyProperties[id][index3][index2].range_classes[index].number_of_instances;
					}
				}
			},
			datatypes: {
				noOf: function(id, index) {
					return data[id].ontologies[index].length;
				},
				datatype: function(id, index, index2) {
					return data[id].ontologies[index2].datatypes[index];
				}
			}
		};

		// graph
		this.graphs = {
			noOf: function(id) {
				return data[id].graphs.length;
			},
			uri: function(id, index) {
				return data[id].graphs[index].uri;
			},
			description: function(id, index) {
				return data[id].graphs[index].description;
			},
			files: {
				noOf: function(id, index) { // file
					return data[id].graphs[index].files.length;
				},
				name: function(id, index, index2) {
					return data[id].graphs[index2].files[index].name;
				},
				uri: function(id, index, index2) {
					return data[id].graphs[index2].files[index].url;
				},
				size: function(id, index, index2) {
					return data[id].graphs[index2].files[index].size;
				}
			},
			noOfTriples: function(id, index) {
				return data[id].graphs[index].number_of_triples;
			},
			noOfInstances: function(id, index) {
				return data[id].graphs[index].number_of_instances;
			},
			noOfSubjects: function(id, index) {
				return data[id].graphs[index].number_of_subjects;
			},
			noOfObjects: function(id, index) {
				return data[id].graphs[index].number_of_objects;
			},
			noOfLiterals: function(id, index) {
				return data[id].graphs[index].number_of_literals;
			},
			classes: { // class
				noOf: function(id, index) {
					return data[id].graphs[index].number_of_classes;
				},
				jsonUri: function(id, index) {
					return data[id].graphs[index].classes;
				},
				load: function(id, callback, index) {
					if (!self._graphClasses[id]) {
						self._graphClasses[id] = [];
					}
					if (!self._graphClasses[id][index]) {
						$.getJSON(
							self.classes.jsonUri(id),
							function(data) {
								self._graphClasses[id][index] = data;
								callback();
							}
						);
					}
				},
				class: function(id, index, index2) {
					return self._graphClasses[id][index2][index].class;
				},
				label: function(id, index, index2) {
					return self._graphClasses[id][index2][index].label;
				},
				noOfInstances: function(id, index, index2) {
					return self._graphClasses[id][index2][index].number_of_instances;
				}
			},
			properties: { // property
				noOf: function(id, index) {
					return data[id].graphs[index].number_of_properties;
				},
				jsonUri: function(id, index) {
					return data[id].graphs[index].properties;
				},
				load: function(id, callback, index) {
					if (!self._graphProperties[id]) {
						self._graphProperties[id] = [];
					}
					if (!self._graphProperties[id][index]) {
						$.getJSON(
							self.properties.jsonUri(id),
							function(data) {
								self._graphProperties[id][index] = data;
								callback();
							}
						);
					}
				},
				property: function(id, index, index2) {
					return self._graphProperties[id][index2][index].property;
				},
				noOfTriples: function(id, index, index2) {
					return self._graphProperties[id][index2][index].number_of_triples;
				},
				domainClasses: {
					noOf: function(id, index, index2) {
						return self._graphProperties[id][index2][index].domain_classes.length;
					},
					domainClass: function(id, index, index2, index3) {
						return self._graphProperties[id][index3][index2].domain_classes[index].domain_class;
					},
					label: function(id, index, index2, index3) {
						return self._graphProperties[id][index3][index2].domain_classes[index].label;
					},
					noOfInstances: function(id, index, index2, index3) {
						return self._graphProperties[id][index3][index2].domain_classes[index].number_of_instances;
					}
				},
				rangeClasses: {
					noOf: function(id, index, index2) {
						return self._graphProperties[id][index2][index].range_classes.length;
					},
					rangeClass: function(id, index, index2, index3) {
						return self._graphProperties[id][index3][index2].range_classes[index].range_class;
					},
					label: function(id, index, index2, index3) {
						return self._graphProperties[id][index3][index2].range_classes[index].label;
					},
					noOfInstances: function(id, index, index2, index3) {
						return self._graphProperties[id][index3][index2].range_classes[index].number_of_instances;
					}
				}
			},
			datatypes: { // datatype
				noOf: function(id, index) {
					return data[id].graphs[index].number_of_datatypes;
				},
				datatype: function(id, index, index2) {
					return data[id].graphs[index2].datatypes[index];
				}
			},
			xrefs: function(id, index, index2) { // TODO:
				return data[id].graphs[index].xrefs;
			}
		};

		// tag
		this.tags = {
			noOf: function(id) {
				return data[id].tags.targets[__g.app.language].length + data[id].tags.information_types[__g.app.language].length;
			},
			tag: function(id, index) {
				var obj = {}, lang,
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
				noOf: function(id) {
					return data[id].tags.targets[__g.app.language].length;
				},
				target: function(id, index) {
					var obj = {};
					for (var lang in data[id].tags.targets) {
						obj[lang] = data[id].tags.targets[lang][index];
					}
					return obj;
				}
			},
			informationTypes: {
				noOf: function(id) {
					return data[id].tags.information_types[__g.app.language].length;
				},
				informationType: function(id, index) {
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
			name: function(id) {
				return data[id].license.name;
			},
			uri: function(id) {
				return data[id].license.url;
			},
			credit: function(id) {
				return data[id].license.credit;
			}
		};

		// SPARQL
		this.SPARQLExamples = {
			noOf: function(id) {
				return data[id].sparql_examples.length;
			},
			sparql: function(id, index) {
				return data[id].sparql_examples[index].sparql[__g.app.language];
			},
			uri: function(id, index) {
				return data[id].sparql_examples[index].url;
			}
		};

		// Stanza
		this.stanza = {
			noOf: function(id) {
				return data[id].stanza ? data[id].stanza.length : 0;
			},
			id: function(id, index) {
				return data[id].stanza[index].id;
			},
			label: function(id, index) {
				return data[id].stanza[index].label;
			},
			definition: function(id, index) {
				return data[id].stanza[index].definition;
			},
			parameter: {
				noOf: function(id, index) {
					return data[id].stanza[index].parameter.length;
				},
				key: function(id, index, index2) {
					return data[id].stanza[index].parameter[index2].key;
				},
				example: function(id, index, index2) {
					return data[id].stanza[index].parameter[index2].example;
				},
				description: function(id, index, index2) {
					return data[id].stanza[index].parameter[index2].description;
				},
				required: function(id, index, index2) {
					return data[id].stanza[index].parameter[index2].required;
				}
			},
			usage: function(id, index) {
				return data[id].stanza[index].usage;
			},
			type: function(id, index) {
				return data[id].stanza[index].type;
			},
			context: function(id, index) {
				return data[id].stanza[index].context;
			},
			display: function(id, index) {
				return data[id].stanza[index].display;
			},
			provider: function(id, index) {
				return data[id].stanza[index].provider;
			},
			license: function(id, index) {
				return data[id].stanza[index].license;
			},
			author: function(id, index) {
				return data[id].stanza[index].author;
			},
			address: function(id, index) {
				return data[id].stanza[index].address;
			},
			contributor: function(id, index) {
				return data[id].stanza[index].contributor;
			},
			created: function(id, index) {
				return data[id].stanza[index].created;
			},
			updated: function(id, index) {
				return data[id].stanza[index].updated;
			}
		};

	}


	noOfDatasets() {
		return Object.keys(this.data).length;
	}

	ids() {
		return Object.keys(this.data);
	}
	providedAs(id) {
		return this.data[id].provided_as;
	}
	reviewed(id) {
		return this.data[id].reviewed;
	}
	title(id) {
		return this.data[id].title;
	}
	uri(id) {
		return this.data[id].url;
	}
	projectName(id) {
		return this.data[id].project_name;
	}
	dataProvider(id) {
		return this.data[id].data_provider;
	}
	description(id) {
		return this.data[id].description;
	}


	// Guideline
	guideline(id) {
		return this.data[id].guideline;
	}

} // ********** end of Datasets class
