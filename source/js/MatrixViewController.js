/* global $ */

import {__g, _placeComma, _sort} from './global.js';
import MatrixItemView from './MatrixItemView.js';
import MatrixScrollbarView from './MatrixScrollbarView.js';

export const
	ORIGIN = {
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
export default class MatrixViewController {

	constructor() {
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


	show() {
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
			'mouseenter.matrix': e => {
				this._$body.children('.id-' + e.delegateTarget.getAttribute('data-id')).addClass('row-selected');
			},
			'mouseleave.matrix': e => {
				this._$body.children('.id-' + e.delegateTarget.getAttribute('data-id')).removeClass('row-selected');
			}
		});

		// ノードに通知
		this._placedStarCoutner = 0;
		for (let i = 0; i < this._sortedIds.length; i++) {
			const id = this._sortedIds[i];
			__g.app.starsWithKeys[id].prepareMatrixView(i, this);
			this._placedStarCoutner++;
		}
	}

	makeMatrix() {
		var i, html = '',
				ids = this.datasets.ids();
		// html
		html += `
			<div id="matrix">
				<div class="inner">
					<header></header>
					<div id="matrix-body"></div>
				</div>
			</div>
		`;
		__g.app.$main.append(html);
		this._matrixOverallHeight = ORIGIN.Y + ids.length * CELL.HEIGHT + PADDING_BOTTOM;
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
		const height = ORIGIN.Y + ids.length * CELL.HEIGHT;
		this._$body.find('.id-sum').css('top', height);
		// padding
		this._$inner.append(`
			<div id="matrix-right" style="left: ${ORIGIN.X + this._matrixOverallWidth}px;"></div>
		`);
		this._$matrix.append(`
			<div class="matrix-sum" style="top: ${height}px;">
				<p lang="ja">合計</p>
				<p lang="en">Total</p>
			</div>
			<div id="matrix-bottom" style="top: ${height + CELL.HEIGHT}px; width: ${this._matrixOverallWidth + PADDING_RIGHT}px;"></div>
		`);
		this._matrixOverallWidth += PADDING_RIGHT;

		// comma
		_placeComma(this._$body);

		// events
		// sort
		this._$colItems.filter(`[data-sort="${this._sortBy}"]`).addClass('selected');
		this._$colItems.on('click', (e) => {
			let $cell;
			if (e.delegateTarget.classList.contains('selected')) {
				$cell = this._$colItems.filter(`[data-sort="${this._sortBy}"]`);
				$cell.data('ascend', $cell.data('ascend') === 'ascend' ? 'descend' : 'ascend');
			} else {
				// 現在選択中のセルを解除
				this._$colItems.filter(`[data-sort="${this._sortBy}"]`).removeClass('selected');
				// セルの選択
				this._sortBy = e.delegateTarget.getAttribute('data-sort');
				$cell = this._$colItems.filter(`[data-sort="${this._sortBy}"]`).addClass('selected');
			}
			// ソートの実行
			this.sort($cell.data('sort'), $cell.data('ascend') === 'ascend');
		});
		// cell hover
		this._$body.children('div.cell').on({ // body cell
			mouseenter: (e) => {
				const
					sort = e.delegateTarget.dataset.sort,
					id = e.delegateTarget.dataset.id;
				this._$body.children(`.item-${sort}`).addClass('col-selected');
				this._$head.children(`.item-${sort}`).addClass('col-selected');
				this._$body.children(`.id-${id}`).addClass('row-selected');
				__g.app.$star.filter(`[data-id="${e.delegateTarget.getAttribute('data-id')}"]`).addClass('row-selected');
			},
			mouseleave: (e) => {
				const
					sort = e.delegateTarget.dataset.sort,
					id = e.delegateTarget.dataset.id;
				this._$body.children(`.item-${sort}`).removeClass('col-selected');
				this._$head.children(`.item-${sort}`).removeClass('col-selected');
				this._$body.children(`.id-${id}`).removeClass('row-selected');
				__g.app.$star.filter(`[data-id="${e.delegateTarget.getAttribute('data-id')}"]`).removeClass('row-selected');
			}
		});
		this._$head.children('div.cell').on({ // header cell
			mouseenter: (e) => {
				this._$body.children('.item-' + e.delegateTarget.getAttribute('data-sort')).addClass('col-selected');
			},
			mouseleave: (e) => {
				this._$body.children('.item-' + e.delegateTarget.getAttribute('data-sort')).removeClass('col-selected');
			}
		});
		this._$matrix.find('div.item-Alphabetical').on({
			mouseenter: () => {
				__g.app.$star.addClass('row-selected');
			},
			mouseleave: () => {
				__g.app.$star.removeClass('row-selected');
			}
		});
		// alphabetical
	}

	placedStar() {
		if (--this._placedStarCoutner === 0) {
			// 遷移終了
			this._$matrix.addClass('placed');
			__g.app.changed(__g.VIEWS_NAME.indexOf('statistics'));

			// scroll bar
			this._scrollBar.enable();
		}
	}

	sort(itemName, isAscend) {
		this._sortBy = itemName;
		this._sortedIds = _sort(this._sortBy, isAscend);
		for (let i = 0; i < this._sortedIds.length; i++) {
			const id = this._sortedIds[i];
			__g.app.starsWithKeys[id].matrixReplace(i);
		}
		// userDefaults
		this._sortedColItems.forEach(item => {
			if (item.name === itemName) {
				item.isAscend = isAscend;
			}
		});
		__g.userDefaults.matrix.sortBy = this._sortBy;
		__g.userDefaults.matrix.colItems = this._sortedColItems;
	}

	hide() {
		this._scrollBar.disable();
		__g.app.$stars.children('.star').removeClass('row-selected');
		__g.app.$star.off('mouseenter.matrix mouseleave.matrix');
		//this._scrollBar = null;
	}

  static get ORIGIN() {
    return ORIGIN;
  }
  static get CELL() {
    return CELL;
  }

} // ********** end of MatrixViewController class
