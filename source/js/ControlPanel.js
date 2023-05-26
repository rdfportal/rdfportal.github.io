/* global $ */

import {__g, _html, _MLHtml, _sanitizeTag} from './global.js';
const _OPENED = 'opened';

/* Control panel class
 * コンソールパネルクラス
 * 
 */
export default class ControlPanel {

	constructor() {
		const
			_$controlPanel = $('#control-panel'),
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
		$('#control-panel-icon, #control-panel-display').on('click', () => {
			_$controlPanel.toggleClass(_OPENED);
			this._defaults.misc.isOpenedControlPanel = _$controlPanel.hasClass(_OPENED);
		});

		// prepare tags
		(() => {
			var idFilter, id, ids = __g.app.datasets.ids(), tag, i, j, htmlFilter = '', htmlMarker = '', counter = 0;

			// タグの抽出
			for (i = 0; i < ids.length; i++) {
				id = ids[i];
				for (j = 0; j < __g.app.datasets.tags.noOf(id); j++) { // タグ
					tag = __g.app.datasets.tags.tag(id, j);
					if ( !_tags[tag.en] ) {
						_tags[tag.en] = tag;
					}
				}
			}

			// HTML生成
			this._colorSchema.Invalid = '#CCC';
			for (i in _tags) {
				tag = _sanitizeTag(i);
				this._colorSchema[tag] = __g.COLORS[counter++];
				idFilter = 'tag-filter-' + tag;
				htmlFilter += // フィルター
					'<dd>' +
						_html('input', { type: 'checkbox', name: idFilter, id: idFilter, value: tag }, '') +
						_MLHtml('label', { for: idFilter }, _tags[i]) +
					'</dd>';
				htmlMarker += // マーカー
					'<dd data-value="' + tag + '">' +
						_html('label',
							_html('span', { class: 'color-ball', style: 'border-color: ' + this._colorSchema[tag] }, '' ) +
							_MLHtml(_tags[i])
						) +
					'</dd>';
				// Stylesheet
				__g.styleSheet.insertRule( 'ul.tags li.tag-' + tag + ':before { background-color: ' + this._colorSchema[tag] + '; }', __g.styleSheet.cssRules.length );
			}
			$('#control-panel-tag-filter').append(htmlFilter);
			_$tagMarker.append(htmlMarker);
			// マーカータグを格納
			_$markedTagButtons.Invalid = $('dd[data-value="Invalid"]', _$tagMarker);
			for (i in _tags) {
				tag = _sanitizeTag(i);
				_$markedTagButtons[tag]  = $('dd[data-value="' + tag + '"]', _$tagMarker);
			}

		})();

		// events
		// オリジナル、ミラー
		$('#control-panel-provided-as-filter')
			.find('input[name="provided-as"]')
				.on('change', e => {
					this._providedAs = e.currentTarget.value;
					this._defaults.all.providedAs = this._providedAs;
					__g.app.postNortification('change-provided-as', this._providedAs);
				});

		// ソート
		$('#control-panel-sort')
			.find('input[name="sort"]')
				.on('change', e => {
					this._sort = e.delegateTarget.value;
					this._defaults.list.sortBy = this._sort;
					__g.app.postNortification('change-sorting', this._sort);
					__g.app.$main.get(0).setAttribute('data-kind-of-sort', this._sort);
					_$display.listView.sortBy.html(e.delegateTarget.nextElementSibling.innerHTML);
				})
			.end()
			.find('input[name="ascend"]') // 昇順降順
				.on('change', e => {
					this._isAscend = e.delegateTarget.value === 'ascend';
					this._defaults.list.isAscend = this._isAscend;
					__g.app.postNortification('change-sorting', this._isAscend);
						_$display.listView.sortOrder.html(e.delegateTarget.nextElementSibling.innerHTML);
				});

		// サイジング
		$('#control-panel-scaling').find('input').on('change', e => {
			this._scaling = e.delegateTarget.value;
			this._defaults.graph.scaling = this._scaling;
			__g.app.postNortification('change-scaling', this._scaling);
			_$display.graphView.scalingBy.html(e.delegateTarget.nextElementSibling.innerHTML);
		});

		// フィルタータグ
		this._$tagFilters = $('#control-panel-tag-filter').find('input').on('change', () => {
			this._filteringTags = [];
			this._$tagFilters.each((index, elm) => {
				if (elm.checked) {
					this._filteringTags.push(elm.value);
				}
			});
			this._defaults.list.filteringTags = this._filteringTags;
			__g.app.postNortification('change-filtering-tags', this._filteringTags);
		});

		// 全タグ選択ボタン
		_$tagFilterButtonAll.on('click', () => {
			this._filteringTags = [];
			this._$tagFilters.each((index, elm) => {
				elm.checked = true;
				this._filteringTags.push(elm.value);
			});
			this._defaults.list.filteringTags = this._filteringTags;
			__g.app.postNortification('change-filtering-tags', this._filteringTags);
		});

		// 全タグ選択解除ボタン
		$('#tag-filter-button-all-deselected').on('click', () => {
			this._filteringTags = [];
			this._$tagFilters.each((index, elm) => {
				elm.checked = false;
			});
			this._defaults.list.filteringTags = this._filteringTags;
			__g.app.postNortification('change-filtering-tags', this._filteringTags);
		});

		// マーカータグ
		$('#control-panel-tag-marker').find('dd').on({
			click: e => {
				//var value = this.dataset.value;
				_$markedTagButtons[this._markedTag].find('span.color-ball').css('background-color', 'transparent');
				this._markedTag = e.delegateTarget.getAttribute('data-value');
				this._defaults.graph.markedTag = this._markedTag;
				__g.app.postNortification('change-marker-tag', { tag: this._markedTag, color: this._colorSchema[this._markedTag] });
				_$markedTagButtons[this._markedTag].find('span.color-ball').css('background-color', this._colorSchema[this._markedTag]);
				_$display.graphView.marked.html(_MLHtml(_tags[this._markedTag]));
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
		$('#control-panel-provided-as-filter').find(`input[value="${this._providedAs}"]`).prop('checked', true).triggerHandler('change');
		$('#control-panel-sort').find(`input[value="${this._sort}"]`).prop('checked', true).triggerHandler('change');
		$(this._isAscend ? '#sort-ascend' : '#sort-descend').prop('checked', true).triggerHandler('change');
		this._$tagFilters.each((index, elm) => {
			if (this._filteringTags.indexOf(elm.value) !== -1) {
				this.checked = true;
			}
		});
		$('#control-panel-scaling').find('input[value="' + this._scaling + '"]').prop('checked', true).triggerHandler('change');
		_$markedTagButtons[this._markedTag].triggerHandler('click');

	}


	// accessor
	providedAsFilter() { return this._providedAs };
	kindOfSorting() { return this._sort; }
	isAscend() { return this._isAscend; }
	kindOfScaling() { return this._scaling; }
	selectedFilteringTags() { return this._filteringTags; }
	selectedMarkedTag() { return { tag: this._markedTag, color: this._colorSchema[this._markedTag] }; }
	color(tag) { return this._colorSchema[tag]; }

	// 選択されたタグ以外は非選択に
	selectFilteringTag(tag) {
		this._filteringTags = [];
		this._$tagFilters.each((index, elm) => {
			if (elm.value === tag) {
				elm.checked = true;
				this._filteringTags.push(elm.value);
			} else {
				elm.checked = false;
			}
		});
		this._defaults.list.filteringTags = this._filteringTags;
		__g.app.postNortification('change-filtering-tags', this._filteringTags);
	}

	//changeView(kindOfView) {
	//};

} // ********** end of Control panel class
