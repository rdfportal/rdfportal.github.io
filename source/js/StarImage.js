/* global $ */

import {__g} from './global.js';

const
	EXCLUSIVE_WORDS = ['of', 'and'],
	CANVAS_SIZE = 300,
	CANVAS_MARGIN = 0,
	FONT_SIZE = 100;
let
	offScreenCanvasContainer;

/* Star image class
 * 星のロゴ画像生成クラス
 * @param _id String
 * @param _$container jQuery
 * 
 */
export default class StarImage {

	constructor(_id, _$container, _callback) {
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
				this._img.onload = () => this.generateIconFromImg();
				this._img.onerror = () => this.generateIconFromText();
			}
		} else {
			// ロゴ無し
			this.generateIconFromText();
		}
	}


	generateCanvas() {
		var canvas;
		canvas = document.createElement('canvas'); 
		canvas.id = 'canvas' + (__g.canvasId++);
		canvas.height = CANVAS_SIZE;
		canvas.width = CANVAS_SIZE;
		canvas.className = 'offscreen';
		offScreenCanvasContainer.appendChild(canvas);
		return canvas;
	}

	// 頭字でアイコンを作る
	generateIconFromText() {
		var title = __g.app.datasets.title(this._id).en,
				titleWords = title.split(' '),
				acronym = '',
				fontSize = FONT_SIZE,
				textMaxWidth = CANVAS_SIZE - CANVAS_MARGIN * 2,
				canvas, ctx, metrics;

		// 頭字語の生成
		titleWords.forEach(elm => acronym += (EXCLUSIVE_WORDS.indexOf(elm) === -1 ? elm.charAt(0) : ''));
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
	generateIconFromImg() {
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

	generateIcon() {
		$('.icon', this._$container).append('<img data-adaptive-background="1" src="' + this._logotypeUrl + '">');
		this._$img = $('img', this._$container);
		this._$img
			.on('ab-color-found', function(e, payload){
				this._bgColor = payload.color;
				this._bgColor = this._bgColor === 'rgb()' ? 'rgb(255,255,255)' : this._bgColor;
			});
		// アプリにロゴ画像読込完了を通知
		if (typeof this._callback === 'function') {
			this._callback();
		}
	}


} // ********** end of Star image class
