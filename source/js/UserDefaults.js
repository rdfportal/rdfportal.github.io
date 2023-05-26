/* global $ */

const DEFAULTS = 'defaults';

/* User defaults class
 * 初期設定クラス
 * 
 */
export default class UserDefaults {

	constructor() {
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
				colItems: [
					{ name: 'Alphabetical', isAscend: true },
					{ name: 'Triples', isAscend: true },
					{ name: 'Links', isAscend: true },
					{ name: 'Classes', isAscend: true },
					{ name: 'Instances', isAscend: true },
					{ name: 'Literals', isAscend: true },
					{ name: 'Subjects', isAscend: true },
					{ name: 'Properties', isAscend: true },
					{ name: 'Objects', isAscend: true }
					]
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
		const self = this;

		if ($.cookie(DEFAULTS)) {
			this._defaults = $.cookie(DEFAULTS);
		} else  {
			this._defaults = $.extend(true, {}, this.defaults);
		}

		// check user defaults
		var _check = function(obj1, obj2){
			for(var i in obj2){
				if (obj1[i] === undefined || typeof obj1[i] !== typeof obj2[i]) {
					throw 'unmatch';
				} else {
					switch(typeof obj2[i]) {
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
		} catch(e) {
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
		this.home = {
		};
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
		this.detail = {
		};
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


	synchronize() {
		$.cookie(DEFAULTS, this._defaults);
	}

} // ********** end of UserDefaults class
