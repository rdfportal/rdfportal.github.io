/* global $, d3 */

import {__g, _html, _MLHtml, _numeral, _sanitizeTag} from './global.js';
import StarImage from './StarImage.js';
import ListViewController from './ListViewController.js';
import MatrixViewController from './MatrixViewController.js';
import DetailViewController from './DetailViewController.js';

const
	OPENING_RADIAL = 60,
	SIZE = [
		{ REGULAR:  40, MIN:  40, MAX:  40 }, // home
		{ REGULAR:  80, MIN:  80, MAX:  80 }, // list
		{ REGULAR:  32, MIN:  32, MAX:  32 }, // matrix
		{ REGULAR:  24, MIN:  12, MAX:  80 }, // graph
		{ REGULAR: 120, MIN: 120, MAX: 120 }  // detail
	],
	//MAX_SIZE = 256,
	//MIN_SIZE = 16,
	LIST_MIN_HEIGHT = 100;
let
	count = 0;

/* Star class
 * 星に見立てたデータセットを表すノードクラス
 * @param param object
 * 
 */
export default class Star {

	constructor(_elm, _data) {
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
		const
			_d3 = d3.select(_elm),
			_order = count++,
			_radius = (2 * Math.PI) * (_order / __g.app.datasets.noOfDatasets());
		this._id = _d3.datum().key;
		this._isInternal = _d3.datum().isInternal; // 寄託されたデータセットか
		this._key = this._isInternal ? this._id : __g.app.xrefs[this._id].key;
		if (this._isInternal) { // 寄託データベースの場合
			this._$
				.addClass('star' + ((() => {
					let tagClass = '';
					for (let i = 0; i < this._datasets.tags.noOf(this._id); i++) {
						tagClass += ` tag-${_sanitizeTag( this._datasets.tags.tag(this._id, i).en )}`;
					}
					return tagClass;
				})()))
				.attr('data-provided-as', this._datasets.providedAs(this._id))
				.append(
					'<div class="icon">' +
						'<div class="body"></div>' +
						'<div class="tag-halo"></div>' +
						(this._datasets.reviewed(this._id) === 'reviewed' ? '<div class="reviewed-icon"></div>' : '') +
					'</div>' +
					(() => {
						var title = this._datasets.title(this._id), html = '';
						for (var i in title) {
							html += _html('h2', { title: title[i], lang: i }, title[i]);
						}
						return html;
					})() +
					'<p class="number-of"><span class="numeral"></span><small></small></p>'
				)
				.css({
					left: window.innerWidth * 0.5 + Math.cos(_radius) * OPENING_RADIAL,
					top: window.innerHeight * 0.5 + Math.sin(_radius) * OPENING_RADIAL
				})
				.attr('data-id', this._id);
			// 参照
			this._$icon = $('.icon', this._$).on('click', () => {
				this._$.trigger('mouseleave');
				__g.app.selectedStar(this._id);
			});
			this._$h = $('h2', this._$);
			this._$tagHalo = this._$icon.find('.tag-halo');
			this._$numberOf = $('.number-of', this._$);
			// リンク情報の付与
			let i;
			for (i = 0; i < this._datasets.connectedDatasetIds.noOf(this._id); i++) {
				this._$.addClass( 'to-' + this._datasets.connectedDatasetIds.id(this._id, i) );
			}
			for (i = 0; i < this._datasets.xref.noOf(this._id); i++) {
				this._$.addClass( 'to-' + __g.app.xrefs[this._datasets.xref.title(this._id, i)].key );
			}
			// logotype
			new StarImage(this._id, this._$, () => { __g.app.appPrepareDecrement(); });
			// tag
			for (i = 0; i < this._datasets.tags.noOf(this._id); i++) {
				this._tags.push( _sanitizeTag( this._datasets.tags.tag(this._id, i).en ) );
			}
		} else { // 外部データベースの場合
			this._$
				.addClass('star xref')
				.append('<div class="icon"></div><h2>' + this._id + '</h2>' );
			this._$icon = $('.icon', this._$);
			for (var i = 0; i < __g.app.xrefs[this._id].connectedDatasets.length; i++) {
				this._$.addClass( 'to-' + __g.app.xrefs[this._id].connectedDatasets[i].connectedDatasetId );
			}
		}
	}


	// ノードのサイズ
	_sizing(sizing) {
		var number, denominator, currentView = __g.app.currentView, size = SIZE[currentView];
		sizing = sizing === undefined ? __g.controlPanel.kindOfScaling() : sizing;
		if (sizing === 'None') { // サイジング無指定の場合は、固定の幅
			this._size = size.REGULAR;
			this._$numberOf.text('');
		} else { // サイジングが指定されている場合は、サイズを最大値から割り出す
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
			this._$numberOf.html(`
				<span class="numeral">${number.toLocaleString()}</span>
				<small>${sizing.toLowerCase()}</small>
			`);
		}
		this._$icon.css({
			width: this._size,
			height: this._size
		});
		switch (currentView) {
			case __g.VIEWS.graph: {
				this._$h.css('top', this._size * 0.5 + 6);
				this._$numberOf.css('top', this._size * 0.5 + 18);
			}
		}

	} // function _sizing

	// ビューの変更
	changeView(/*kindOfView, currentStarId*/) {
		// 形状のリセット
		if (this._isInternal) {
			this._$.stop(true, true);
			this._$icon.css({ width: '', height: '', marginLeft: '', marginTop: '' });
			this._$h.css({ top: '' });
		}
	}

	prepareHomeView() {
	}

	prepareListView(order, top, delegate) {
		
		var height = 0, hidden = true,
				tags = __g.controlPanel.selectedFilteringTags();

		if (this._isInternal) { // 寄託データベースの場合

			// filtering
			for (let i = 0; i < this._tags.length; i++) {
				if (
					tags.indexOf(this._tags[i]) !== -1 && 
					(__g.controlPanel.providedAsFilter() === 'all' ||
					__g.controlPanel.providedAsFilter() === 'original' &&
					this._datasets.providedAs(this._id) === 'original')
					) {
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
				complete: () => {
					this._$.addClass('placed');
					// make information
					if (this._$.children('.appendix.list-view').length === 0) { // ディティールがない場合生成
						this._$.append(
							'<div class="appendix list-view">' +
								_MLHtml('p', { class: 'description' }, this._datasets.description(this._id)) + 
								_html('ul', { class: 'tags' },
									(() => {
										var html = '', i, tag1, tag2;
										for (i = 0; i < this._datasets.tags.noOf(this._id); i++) {
											tag1 = this._datasets.tags.tag(this._id, i);
											tag2 = _sanitizeTag(tag1.en);
											html += _MLHtml('li', { class: 'tag-' + tag2, 'data-tag': tag2 }, tag1);
										}
										return html;
									})()
								) +
								_html('div', { class: 'left-element' },
									_html('p', { class: 'number-of-triples' },
										_numeral(this._datasets.noOfTriples(this._id).toLocaleString()) + '<small>triples</small>'
									) + 
									_html('p', { class: 'last-update' }, this._datasets.issued(this._id)) + 
									_html('p', { class: 'institution' }, _MLHtml(this._datasets.dataProvider(this._id)))
								) + 
							'</div>'
						);
						this._$.find('ul.tags').find('li').on('click', () => {
							__g.controlPanel.selectFilteringTag(this.dataset.tag);
						});
					}
					delegate.placedStar();
				}
			});
		}
		return height;
	}

	prepareLeaveFromListView() {
		this._$.removeClass('placed');
	}

	prepareMatrixView(order, delegate) {
		const top = MatrixViewController.ORIGIN.Y + (order * MatrixViewController.CELL.HEIGHT);
		this._$
			.addClass('placing')
			.animate({
				left: 96,
				top: top + MatrixViewController.CELL.HEIGHT * 0.5
			}, {
				duration: __g.DURATION + order * 100,
				easing: 'easeInOutSine',
				complete: () => {
					delegate.placedStar();
					this._$.removeClass('placing');
				}
			});
		this._matrix.rows = $('#matrix-body').find('.id-' + this._id).css({
			top: top
		});
	}

	matrixReplace(order) {
		var properties = {
					top: MatrixViewController.ORIGIN.Y + (order * MatrixViewController.CELL.HEIGHT)
				},
				options = {
					duration: __g.DURATION + order * 100,
					easing: 'easeInOutSine'
				};
		this._matrix.rows.animate(properties, options);
		properties.top += MatrixViewController.CELL.HEIGHT * 0.5;
		this._$.animate(properties, options);
	}

	prepareGraphView() {

		// 星をホバーすると関連する星が浮かび上がる
		this._$.on({
			'mouseenter.graphView': () => {
				__g.app.$main.addClass(__g.CLASS.STAR_HOVERING);
				$('.to-' + this._key, __g.app.$stars).addClass(__g.CLASS.CONNECTED_STAR_HOVERING);
				__g.d3.edges.selectAll('.to-' + this._key + ', .from-' + this._key).classed(__g.CLASS.CONNECTED_STAR_HOVERING, true);
			},
			'mouseleave.graphView': () => {
				__g.app.$main.removeClass(__g.CLASS.STAR_HOVERING);
				$('.' + __g.CLASS.CONNECTED_STAR_HOVERING, __g.app.$stars).removeClass(__g.CLASS.CONNECTED_STAR_HOVERING);
				__g.d3.edges.selectAll('.' + __g.CLASS.CONNECTED_STAR_HOVERING).classed(__g.CLASS.CONNECTED_STAR_HOVERING, false);
			}
		});

		if (this._isInternal) { // 寄託データベースの場合
			this._sizing();
			this.receiveNotificationChangeTagMarker( __g.controlPanel.selectedMarkedTag() );
			// コンパネのタグにマウスが当たると、同じタグを持つ星がハイライト
			__g.app.addNotificationObserver('change-marker-tag', this, this.receiveNotificationChangeTagMarker);
		} else { // 外部データベースの場合
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
				click: () => {
					window.open(__g.app.xrefs[this._id].connectedDatasets[0].uri); 
				}
			});
		}
	}

	prepareLeaveFromGraphView() {
		this._$.off('mouseenter.graphView mouseleave.graphView');
		if (this._isInternal) {
			this._sizing();
			__g.app.removeNotificationObserver('change-marker-tag', this);
			this._$.removeClass(__g.CLASS.TAG_HOVERING);
		} else {
			this._$.off('mousedown.graphView mouseup.graphView');
		}
	}

	receiveNotificationChangeTagMarker(param) {
		if (this._tags.indexOf(param.tag) !== -1) {
			this._$.addClass(__g.CLASS.TAG_HOVERING);
			this._$tagHalo.css('background-color', param.color);
		} else {
			this._$.removeClass(__g.CLASS.TAG_HOVERING);
		}
	}

	prepareDetailView(currentStarId) {
		if (currentStarId === this._id) {
			// 当該スターであった場合の処理
			this._$
				.addClass('selected')
				.animate({
					left: DetailViewController.ORIGIN.X,
					top: DetailViewController.ORIGIN.Y
				}, {
					duration: __g.DURATION * 2,
					easing: 'easeOutCubic',
					complete: () => {
						this._$.css({
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

	prepareLeaveFromDetailView() {
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
	clickedAlias(elm) {
		var $icon = $('.icon', elm),
				width = $icon.width();
		this._$.css({
			left: elm.offsetLeft + width * 0.5,
			top: elm.offsetTop + width * 0.5
		});
		this._$icon.trigger('click');
	}

	// accessor
	get size() {
		return this._size;
	}

} // ********** end of Star class
