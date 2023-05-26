/* global $ */

import {$w, __g, _sort, _placeComma} from './global.js';
const
	SHOW_DURATION = 100,
	ORIGIN = {
		X: 339,
		Y: 27
	};

/* List view manager class
 * リストビュー管理クラス
 * 
 */
export default class ListViewController {

	constructor() {
		this._placedStarCoutner;
		this.$stars = undefined;
	}

	show() {
		window.setTimeout(() => {
			this.makeList();
		}, SHOW_DURATION);
	}

	makeList() {
		var sortedIds;

		// イベントのバインド
		__g.app.addNotificationObserver('change-sorting', this, this.receiveNotificationChangeSorting);
		__g.app.addNotificationObserver('change-provided-as', this, this.receiveNotificationChangeFilter);
		__g.app.addNotificationObserver('change-filtering-tags', this, this.receiveNotificationChangeFilter);

		// ソート
		sortedIds = _sort(
			__g.controlPanel.kindOfSorting(), 
			__g.controlPanel.isAscend()
		);

		// サイズ種別を取得し各ノードに通知、レイアウトを行う
		this.placeStars(sortedIds);

		// ウインドウリサイズで星の矩形のリサイズ
		if (!this.$stars) {
			this.$stars = $('.star', __g.app.$main).not('.xref');
		}
		$w
			.on('resize.listView', () => {
				this.$stars.css('width', __g.app.$main.width() - ORIGIN.X - 20);
			})
			.triggerHandler('resize.listView');
	}

	// 星の位置取りを行う
	placeStars(sortedIds){
		var i, top = ORIGIN.Y, height;
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

	placedStar() {
		if (--this._placedStarCoutner === 0) {
			// 遷移終了
			__g.app.changed(__g.VIEWS_NAME.indexOf('datasets'));
		}
	}

	hide() {
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
	receiveNotificationChangeSorting(){
		var sortedIds = _sort(
			__g.controlPanel.kindOfSorting(), 
			__g.controlPanel.isAscend()
		);
		this.placeStars(sortedIds);
	} // function receiveNotificationChangeSorting
	receiveNotificationChangeFilter(){
		var sortedIds = _sort(
			__g.controlPanel.kindOfSorting(), 
			__g.controlPanel.isAscend()
		);
		this.placeStars(sortedIds);
	} // function receiveNotificationChangeFilter

  static get ORIGIN() {
    return ORIGIN;
  }

} // ********** end of ListViewController class
