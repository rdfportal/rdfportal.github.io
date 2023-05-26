/* global $ */

import {__g} from './global.js';

const
	_INTERVAL = 10,
	_DURATION = 5;

/* ViewLabel Class
	 ビューのラベル
*/
export default class ViewLabel {

	constructor() {
		this._isChanging = false;
		this._timerId;
		this._index;
		this._changingLable;
		this._$label = $('#view-label');

		// メニューにマウスが載るとラベルを変更
		$('#global-navigation li[title]').on({
			mouseenter: (e) => this.changeLable(e.delegateTarget.title),
			mouseleave: () => this.changeLable(__g.VIEWS_LABEL[__g.app.currentView])
		});
	}

	// ラベルの変更定義
	changeLable(label) {
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
	changingLabel() {
		this._index++;
		const
			index = Math.floor(this._index / _DURATION),
			remainder = this._index % _DURATION;
		let changingLable = this._changingLable.substr(0, index);
		if (remainder !== 0) {
			changingLable = `${changingLable.slice(0, -1)}<span style="color: hsl(${Math.random() * 360}, 100%, ${100 * ((remainder) / _DURATION)}%);">${String.fromCharCode(parseInt(97 + 25 * Math.random()))}</span>`;
			//changingLable = `${changingLable.slice(0, -1)}<span style="color: hsl(240, 50%, ${100 * ((remainder) / _DURATION)}%);">${String.fromCharCode(parseInt(97 + 25 * Math.random()))}</span>`;
		}
		this._$label.html(changingLable);
		if (this._index < this._changingLable.length * _DURATION) {
			this._timerId = window.setTimeout(this.changingLabel.bind(this), _INTERVAL);
		} else {
			this._isChanging = false;
		}
	}

}
