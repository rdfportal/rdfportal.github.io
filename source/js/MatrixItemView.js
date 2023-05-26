import {_html, _MLHtml, _numeral} from './global.js';
import {ORIGIN, CELL} from './MatrixViewController.js';

/* Matrix item view manager class
 * マトリックスビューの各項ビュー
 * 
 */
export default class MatrixItemView {

	constructor(colItem, order, delegate) {

		switch(colItem.name) {

			case 'Alphabetical':
				// make cells
				delegate._$matrix.append(
					_html(
						'div',
						{	class: 'cell item-' + colItem.name,
							'data-sort': colItem.name,
							'data-ascend': colItem.isAscend ? 'ascend' : 'descend' },
						_MLHtml(delegate.STR.name) + '<div class="sorter"></div>'
					)
				);
			break;

			case 'Triples':
			case 'Links':
			case 'Classes':
			case 'Instances':
			case 'Literals':
			case 'Subjects':
			case 'Properties':
			case 'Objects':{
				// make cells
				delegate._$head.append(
					_html(
						'div',
						{	class: 'cell item-' + colItem.name,
							'data-sort': colItem.name,
							'data-ascend': colItem.isAscend ? 'ascend' : 'descend' },
						_MLHtml(delegate.STR['numberOf' + colItem.name]) + '<div class="sorter"></div>'
					)
				);
				delegate._$body.append((() => {
					let html = '',
							sum = 0;
					for (let i = 0; i < delegate._sortedIds.length; i++) {
						const value = delegate.datasets[ 'noOf' + colItem.name ]( delegate._sortedIds[i] );
						sum += value;
						html += _html(
							'div',
							{	class: `cell item-${colItem.name} id-${delegate._sortedIds[i]}`,
								'data-sort': colItem.name,
								'data-id': delegate._sortedIds[i] },
							_numeral(value)
						);
					}
					html += _html(
						'div',
						{	class: `cell item-${colItem.name} id-sum`,
							'data-sort': colItem.name,
							'data-id': 'sum' },
						_numeral(sum)
					);
					// line
					return html;
				})());
				// layout
				const left = ORIGIN.X + CELL.WIDTH * (order - 1);
				delegate._$head.find('.item-' + colItem.name).css('left', left);
				delegate._$body.find('.item-' + colItem.name).css('left', left);
			}
			break;

		}
	}

} // ********** end of MatrixItemView class
