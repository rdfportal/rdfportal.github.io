/*global $ */

import {__g} from './global.js';
const
	_CORN = {
		NUMBER_OF_LINE: 2,
		ORIGIN: {
			X: 610 + 115,
			Y: 1210
		},
		ELLIPSE: {
			POSITIONS: [ 293, 558, 876 ],
			RATIO: 0.1131,
			RESOLUTION: 64
		},
		RADIUS: 532
	},
	SHOW_DURATION = 900;

/* Home view manager class
 * ホームビュー管理クラス
 * 
 */
export default class HomeViewController {

	constructor() {
		this._isInitialized = false;
		this._d3Corn;
		this.$view = $('#home-view');
	}

	show() {
		var i, j, y, radian1, radian2, radian3, radius;

		// corn
		if (!this._isInitialized) {
			this._isInitialized = true;
			this._d3Corn = __g.d3.svg.append('g').attr('class', 'corn');

			// line
			radian1 = (2 * Math.PI) / _CORN.NUMBER_OF_LINE;
			for (i = 0; i < _CORN.NUMBER_OF_LINE; i++) {
				radian2 = radian1 * i;
				this._d3Corn.append('line')
					.attr('x1', _CORN.ORIGIN.X)
					.attr('y1', _CORN.ORIGIN.Y)
					.attr('x2', _CORN.ORIGIN.X + _CORN.RADIUS * Math.cos(radian2))
					.attr('y2', 0)
					.attr('stroke', 'rgba(255, 255, 255, ' + ((Math.sin(radian2 + Math.PI) + 1) * 0.25) + ')');
			}

			// ellipse
			radian1 = (2 * Math.PI) / _CORN.ELLIPSE.RESOLUTION;
			for (i = 0; i < _CORN.ELLIPSE.POSITIONS.length; i++) {
				y = _CORN.ELLIPSE.POSITIONS[i];
				radius = (y / _CORN.ORIGIN.Y) * _CORN.RADIUS;
				for (j = 0; j < _CORN.ELLIPSE.RESOLUTION; j++) {
					radian2 = radian1 * j;
					radian3 = radian2 + radian1;
					this._d3Corn.append('line')
						.attr('x1', _CORN.ORIGIN.X + Math.cos(radian2) * radius)
						.attr('y1', _CORN.ORIGIN.Y - y + Math.sin(radian2) * radius * _CORN.ELLIPSE.RATIO)
						.attr('x2', _CORN.ORIGIN.X + Math.cos(radian3) * radius)
						.attr('y2', _CORN.ORIGIN.Y - y + Math.sin(radian3) * radius * _CORN.ELLIPSE.RATIO)
						.attr('stroke', 'rgba(255, 255, 255, ' + ( 0.1 + (Math.sin((radian2 + radian3) * 0.5) + 1) * 0.25 ) + ')');
						//.attr('stroke', '#fff');
				}
			}
			this.$view.find('.node').on('click', function(){
				$('#' + this.getAttribute('data-target')).trigger('click');
			});

			// statistics
			let html = '';
			// Datasets
			html += `<p>${__g.app.datasets.ids().length}<span>RDF datasets</span></p>`;
			const
				statisticsItems = {
					noOfLinks: 0,
					noOfTriples: 0
				},
				ids = __g.app.datasets.ids();
			for (const id of ids) {
				for (const item in statisticsItems) {
					statisticsItems[item] += __g.app.datasets[item](id);
				}
			}
			for (const item in statisticsItems) {
				const
					sampleString = statisticsItems[item] + '',
					figure = Math.ceil(sampleString.length / 3);

				let processedNumber;
				switch (true) {
					case figure === 3:
					processedNumber = Math.round( statisticsItems[item] * 0.000001 ) + '<span> million @@unit@@</span>';
					break;
					case figure === 4:
					processedNumber = Math.round( statisticsItems[item] * 0.000000001 ) + '<span> billion @@unit@@</span>';
					break;
					case figure === 5:
					processedNumber = Math.round( statisticsItems[item] * 0.000000000001 ) + '<span> trillion @@unit@@</span>';
					break;
					default:
					processedNumber = roundedString.toLocaleString();
					break;
				}
				html += `<p>${processedNumber.replace('@@unit@@', { noOfTriples: 'triples', noOfLinks: 'inter-datasets links' }[item])}</p>`;
			}
			$('#home-statistics').append(html);
		}
		
		// force
		__g.d3.force
			//.gravity(0.001)
			.on('tick', function() {
				__g.d3.linksSelection
					.attr('x1', function(d) { return d.source.x; })
					.attr('y1', function(d) { return d.source.y; })
					.attr('x2', function(d) { return d.target.x; })
					.attr('y2', function(d) { return d.target.y; });
				__g.d3.nodesSelection
					.style('left', function(d) { return (d.x + __g.SVG_MARGIN_LEFT) + 'px'; })
					.style('top', function(d) { return d.y + 'px'; });
				})
			.stop();

		// shown
		window.setTimeout(function(){
			__g.app.changed(__g.VIEWS_NAME.indexOf('home'), this.$view.innerHeight());
		}.bind(this), SHOW_DURATION);
	}

	hide() {
		//window.clearInterval(_timerId);
		__g.d3.force
			.stop()
			.on('tick', null);
	}
} // ********** end of HomeViewController class
