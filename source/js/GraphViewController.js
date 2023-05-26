/* global d3 */

import {$w, __g} from './global.js';

/* Graph view manager class
 * グラフビュー管理クラス
 * 
 */
export default class GraphViewController {

	constructor() {
	}

	show() {
		this.receiveNotificationChangeSizing();
		// tick
		__g.d3.force
			.on('tick', () => {
				__g.d3.linksSelection
					.attr('x1', d => d.source.x)
					.attr('y1', d => d.source.y)
					.attr('x2', d => d.target.x)
					.attr('y2', d => d.target.y);
				__g.d3.nodesSelection
					.style('left', d => (d.x + __g.SVG_MARGIN_LEFT) + 'px')
					.style('top', d => d.y + 'px');
				__g.d3.linksSelection.each(function(){ // number of triples
					this.d3NumberOfTriples
						.attr('x', (parseFloat(this.getAttribute('x1')) + parseFloat(this.getAttribute('x2'))) * 0.5)
						.attr('y', (parseFloat(this.getAttribute('y1')) + parseFloat(this.getAttribute('y2'))) * 0.5 + 3);
				});
			})
			.restart();
		$w.trigger('resize.mainViewControl');

		// イベントのバインド
		__g.app.addNotificationObserver('change-scaling', this, this.receiveNotificationChangeSizing);
		
		__g.app.stars.forEach(function(star){
			star.prepareGraphView();
		});

		// 遷移終了	
		window.setTimeout(function(){
			__g.app.changed(__g.VIEWS_NAME.indexOf('network'));
		}, 100);
	}

	hide() {
		__g.d3.force
			.stop()
			.on('tick', null);
		__g.app.removeNotificationObserver('change-scaling', this);
		__g.app.stars.forEach(star => {
			star.prepareLeaveFromGraphView();
		});
	}

	receiveNotificationChangeSizing(){
		__g.app.stars.forEach(function(star){
			star.prepareGraphView();
		});
		__g.d3.force
				.force('collide', // ノード間の接触反発力
					d3.forceCollide()
						.radius(function(d) { return d.star.size * .5 + 20; }) // ノード半径
						.strength(1.0) // オーバーラップするノード間の反発力 0.0〜1.0
						.iterations(16) // 計算回数
				)
				.restart();
	} // function receiveNotificationChangeSizing
	
} // ********** end of GraphViewController class
