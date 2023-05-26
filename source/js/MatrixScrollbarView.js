import {$w} from './global.js';

/* Matrix item view manager class
 * マトリックスビューの各項ビュー
 * 
 */
export default class MatrixScrollbarView {

	constructor(delegate) {
		this._delegate = delegate;
		this._matrixWidth;
		this._widthRatio;
		this._scrollBarWidth;
		this._delegate._$matrix.append('<div id="matrix-scroll-area"></div><div id="matrix-scroll-bar"></div>');
		this._$scrollArea = this._delegate._$matrix.children('#matrix-scroll-area');
		this._$scrollBar = this._delegate._$matrix.children('#matrix-scroll-bar');
		this._$scrollBar.draggable({
			axis: 'x',
			containment: this._$scrollArea,
			drag: (event, obj) => {
				var left = obj.position.left - this._delegate._$inner.offset().left,
						range = this._matrixWidth - this._scrollBarWidth;
				this._delegate._$inner.scrollLeft((this._delegate._matrixOverallWidth - this._matrixWidth) * (left / range));
			}
		});
	}

	enable() {
		// events
		$w
			.on({ // 領域定義
				'resize.matrix': () => {
					var innerWidth = $w.innerWidth(),
							matrixHeight = $w.innerHeight() - this._delegate._$matrix.offset().top;
					this._matrixWidth = innerWidth - this._delegate._$matrix.offset().left;
					this._widthRatio = this._matrixWidth / this._delegate._matrixOverallWidth;
					this._scrollBarWidth = this._matrixWidth * this._widthRatio;
					this._delegate._$matrix.css({
						width: this._matrixWidth,
						height: matrixHeight > this._delegate._matrixOverallHeight ? matrixHeight : this._delegate._matrixOverallHeight
					});
					if (this._matrixWidth < this._delegate._matrixOverallWidth) {
						this._$scrollArea.css({
							width: this._matrixWidth,
							height: matrixHeight
						});
						this._$scrollBar.css({
							width: this._scrollBarWidth,
							bottom: 42,
							top: 'auto',
							display: 'block'
						});
					} else {
						this._$scrollBar.css({
							display: 'none'
						});
					}
				}
			})
			.trigger('resize.matrix');
		this._delegate._$inner
			.on({
				'scroll.matrix': () => {
					this._$scrollBar.css({
						left: this._delegate._$inner.offset().left + this._delegate._$inner.scrollLeft() * this._widthRatio
					});
				}
			})
			.trigger('scroll.matrix');
		this._$scrollBar.draggable('enable');
	}

	disable() {
		this._delegate._$inner.off('scroll.matrix');
		$w.off('resize.matrix');
		this._$scrollBar.draggable('disable');
	}	


} // ********** end of MatrixScrollbarView class
