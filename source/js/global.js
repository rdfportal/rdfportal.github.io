/* global $ */

export const isDebug = false;
export const $w = $(window);

export const __g = {
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
	VIEWS_NAME: [ 'home', 'datasets', 'statistics', 'network', 'documents', 'guideline', 'changeLog', 'dataset' ],
	VIEWS_LABEL: [ 'Home', 'Datasets', 'Statistics', 'Network view', 'Documents', 'Guideline', 'Change log', ' ' ],
	VIEW_LABEL_DETAIL: 'dataset',
	STAR_TYPE: {
		first: 'first',
		connected: 'connected'
	},
	STRINGS: {},
	COLORS: [
		'#E4007F',
		'#FF2121',
		'#FF29A0',
		'#FF8000',
		'#EBB800',
		'#CAD400',
		'#9AD400',
		'#15AD52',
		'#00D1AB',
		'#00C0FA',
		'#5E65E6',
		'#9B5BF0',
		'#B813BD',
		'#E47295',
		'#E4C172',
		'#BAED77',
		'#90E4CF',
		'#799AE4',
		'#C57DE4',
		'#99007B',
		'#992509',
		'#8C9900',
		'#09751F',
		'#007B99',
		'#432E99'
	],
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
	rootPath: (() => {
		const
			host = location.host,
			pathname = location.pathname;
		let path;
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
	})()
};


// HTML生成用関数
export const _html = function() {
	let tag, attr, html;

	switch (arguments.length) {

		case 2: 
			tag = arguments[0];
			attr = '';
			html = arguments[1];
		break;

		case 3: {
			tag = arguments[0];
			const attrObje = arguments[1];
			attr = (function(){
				let attrHtml = '';
				for (const i in attrObje) {
					attrHtml += ` ${i}="${attrObje[i]}"`;
				}
				return attrHtml;
			})();
			html = arguments[2];
		}
		break;
		
	}
	return `<${tag} ${attr}>${html}</${tag}>`;
};

export const _MLHtml = function() {
	let tag, attr, MLtext, html = '', lang;

	switch (arguments.length) {

		case 1: 
			MLtext = arguments[0];
			for (lang in MLtext) {
				html += _html('span', { lang: lang }, MLtext[lang]);
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
		html += _html('span', { lang: lang }, MLtext[lang]);
	}
	return _html(tag, attr, html);
};

export const _numeral = value => `<span class="numeral">${value}</span>`;

export const _htmlAnchor = (uri, label) => _html('a', { href: uri, target: '_blank' }, (label === '' || label.indexOf('lang="en"></span>') !== -1) ? uri : label);

export const _MLAnchor = (uri, label) => {
	let html = '';
	const isString = typeof uri === 'string';
	for (const lang in label) {
		const uri2 = isString ? uri : uri[lang];
		html += _html(
			'a',
			{ lang: lang, href: uri2, target: '_blank' },
			label[lang] === '' ? uri2 : label[lang]
		);
	}
	return html;
};

export const _htmlTR = (key, value) => _html('tr', _html('th', key) + _html('td', value));

export const _htmlTRValueNumeral = (key, value) => `<tr class="value-numeral"><th>${key}</th><td>${_numeral(value)}</td></tr>`;

export const _htmlTRHasDetailValueNumeral = (key, value) => `<tr class="has-detail value-numeral"><th>${key}<span class="open-button"></span></th><td>${_numeral(value)}</td></tr>`;

/* Classes / Instances または Properties / Triples の場合のディティール折りたたみ
 * @param key							項目名
 * @param value						値
 * @param kind						種類（classes / properties）
 * @param jsonUri					閉じられた領域の情報を格納するJSONのURI
 * @param classification	項目がどこに属するか（undefined / ontology / graph）
 * @param index						配列の場合の位置
 *
 */
export const _htmlTRHasDetailValueNumeral2 = (key, value, kind, jsonUri, classification, index) => `<tr class="has-detail value-numeral" data-json-kind="${kind}" data-json-uri="${jsonUri}" data-classification="${classification}" data-index="${index}"><th>${key}<span class="open-button"></span></th><td>${value}</td></tr>`;

export const _htmlTRDetail = detailHtml => `<tr class="detail"><td colspan="2"><div class="closer"><div class="closer-inner">${detailHtml}</div></div></td></tr>`;

/* param item: 'graphs' or 'ontorogies'
 */
export const _htmlHasDetailAndDetail = item => {
	const
		datasets = __g.app.datasets,
		starId = __g.app.currentStarId,
		STR = __g.STRINGS;
	if (datasets[item].noOf(starId) === 0) {
		return '';
	}
	const html =
	_html('tbody',
		_html('tr', { class: 'caption' },
			_html('th', { colspan: 2 }, _MLHtml(STR[item]))) +
		(function(){
			let subHtml = '';
			for (let i = 0; i < datasets[item].noOf(starId); i++) {
				//var uri = datasets[item].uri(starId, i);
				subHtml +=
					_html('tr', { class: 'has-detail' },
						_html('th', { colspan: 2 }, datasets[item].uri(starId, i) + '<span class="open-button"></span>')) +
					_html('tr', { class: 'detail hidden' },
						_html('td', { colspan: 2 }, 
							_html('div', { class: 'closer' },
								_html('div', { class: 'closer-inner' },
									_html('table', { class: 'horizontal-table internal' },
										_htmlStatics(starId, item, i))))));
			}
			return subHtml;
		})()
	);
	return html;
};

export const _htmlStatics = (starId, classification, index) => {
	const
		STR = __g.STRINGS,
		HYPHEN = '<span class="hyphen"></span>',
		DATASETS = classification === undefined ? __g.app.datasets : __g.app.datasets[classification],
		NO_OF_CLASSES = DATASETS.classes.noOf(starId, index),
		NO_OF_PROPERTIES = DATASETS.properties.noOf(starId, index),
		NO_OF_DATATYPES = DATASETS.datatypes.noOf(starId, index),
		html =
	_html('tbody', 
		(function(){ // description & files
			if (classification === undefined) {
				return '';
			} else {
				const
					noOfFiles = DATASETS.files.noOf(starId, index),
					subHtml2 =
				_html('tr', // description
					_html('td', { colspan: 2 }, _MLHtml( DATASETS.description(starId, index) ))
				) +
				'<tr>' +
					`<th rowspan="${noOfFiles}">${_MLHtml( STR.files )}</th>` +
					(function(){
						let subHtml3 = '';
						for (var i = 0; i < noOfFiles; i++) {
							subHtml3 += `${i > 0 ? '<tr>' : ''}<td><p class="files">${_htmlAnchor(DATASETS.files.uri(starId, i, index), DATASETS.files.name(starId, i, index))}<small>${_numeral(DATASETS.files.size(starId, i, index))} bytes</small></p></td></tr>'`;
						}
						return subHtml3;
					})();
				return subHtml2;
			}
		})() +
		_htmlTRValueNumeral( _MLHtml( STR.subjects ), DATASETS.noOfSubjects(starId, index) ) + // subjects
		_htmlTRValueNumeral( _MLHtml( STR.objects ), DATASETS.noOfObjects(starId, index) ) + // objects
		_htmlTRValueNumeral( _MLHtml( STR.literals ), DATASETS.noOfLiterals(starId, index) ) + // literals
		_htmlTRHasDetailValueNumeral2( // classes / instances
			_MLHtml(STR.classes) + HYPHEN + _MLHtml(STR.instances),
			_numeral(NO_OF_CLASSES) + HYPHEN + _numeral(DATASETS.noOfInstances(starId, index)),
			'classes',
			DATASETS.classes.jsonUri(starId, index),
			classification,
			index
		) +
		_htmlTRDetail((function(){
			const subHtml2 =
				_html('table', { class: 'internal' },
					_html('thead',
						_html('tr',
							_MLHtml('th', STR.classes) +
							_MLHtml('th', STR.numberOfInstances))) +
					_html('tbody', 
						_html('tr', { class: 'loading' },
							_html('td', { colspan: 2 }, ''))));
			return subHtml2;
		})()) +
		_htmlTRHasDetailValueNumeral2( // properties / triples
			_MLHtml(STR.properties) + HYPHEN + _MLHtml(STR.triples),
			_numeral(NO_OF_PROPERTIES) + HYPHEN + _numeral(DATASETS.noOfTriples(starId, index)),
			'properties',
			DATASETS.properties.jsonUri(starId, index),
			classification,
			index
		) + 
		_htmlTRDetail((function(){
			const subHtml2 = 
				_html('table', { class: 'internal' },
					_html('thead',
						_html('tr',
							_MLHtml('th', STR.properties) +
							_MLHtml('th', STR.numberOfTriples))) +
					_html('tbody', 
						_html('tr', { class: 'loading' },
							_html('td', { colspan: 2 }, ''))));
			return subHtml2;
		})()) +
		_htmlTRHasDetailValueNumeral( _MLHtml( STR.datatypes ), NO_OF_DATATYPES ) + // datasets
		_htmlTRDetail((function(){
			const subHtml2 = 
				_html('table', { class: 'internal' }, 
					_html('thead',
						_html('tr',
							_MLHtml('th', STR.datatypes))) +
					_html('tbody', (function(){
						let subHtml3 = '';
						for (let j = 0; j < NO_OF_DATATYPES; j++) {
							const datatype = DATASETS.datatypes.datatype(starId, j, index);
							subHtml3 +=
							_html('tr',
								_html('td', _htmlAnchor(datatype, datatype)));
						}
						return subHtml3;
					})())
				);
			return subHtml2;
		})())
	);
	return html;
};


// ソート
export const _sort = (kindOfSorting, isAscend) => {
	let i, value, target, mapper = [], functionName, sortedIds = [];
	const ids = __g.app.datasets.ids();
	
	switch (kindOfSorting) {
		
		case 'Alphabetical': { // アルファベティカル
			for (const id of ids) {
				value = __g.app.datasets.title(id)[__g.app.language];
				mapper.push({ id: id, value: value });
			}
			mapper.sort((a, b) => {
				if (a.value < b.value) {
					return -1;
				} else {
					return 1;
				}
			});
		}
		break;
		
		case 'DataProvider': { // Data provider
			for (const id of ids) {
				value = __g.app.datasets.dataProvider(id)[__g.app.language];
				mapper.push({ id: id, value: value });
			}
			mapper.sort((a, b) => {
				if (a.value < b.value) {
					return -1;
				} else {
					return 1;
				}
			});
		}
		break;
		
		case 'LastUpdate': { // 更新日順
			for (const id of ids) {
				const date = __g.app.datasets.issued(id).split('-');
				value = (new Date(date[0], date[1], date[2])).getTime();
				mapper.push({ id: id, value: value });
			}
			mapper.sort((a, b) => {
				return b.value - a.value;
			});
		}
		break;

		default: { // その他の数量系のソート
			switch (kindOfSorting) {
				case 'Classes': functionName = 'noOfClasses'; break;
				case 'Instances': functionName = 'noOfInstances'; break;
				case 'Literals': functionName = 'noOfLiterals'; break;
				case 'Objects': functionName = 'noOfObjects'; break;
				case 'Properties': functionName = 'noOfProperties'; break;
				case 'Subjects': functionName = 'noOfSubjects'; break;
				case 'Triples': functionName = 'noOfTriples'; break;
				case 'Links': functionName = 'noOfLinks'; break;
			}
			if (typeof functionName === 'string') {
				target = __g.app.datasets[functionName];
			} else {
				target = __g.app.datasets[functionName[0]][functionName[1]];
			}
			for (const id of ids) {
				mapper.push({ id: id, value: target(id) });
			}
			mapper.sort((a, b) => {
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
export const _sanitizeTag = tag => tag.replace(/\W+/g, '_');

export const _placeComma = elm => {
	$(elm).find('span.numeral').each(function(){
		this.textContent = this.textContent.replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
		this.classList.remove('numeral');
		this.classList.add('numeral-comma');
	});
};
export const _capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

