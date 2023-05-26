/*global $, d3 */
import {$w, __g} from './global.js';

import RDFPortal from './RDFPortal.js';
import UserDefaults from './UserDefaults.js';


$(function() {
	__g.d3.svg = d3.select('main#main-view').append('svg').attr('id', 'svg');

	// ガイドラインの取得
	$('#guideline-view').find('.guideline-outline li').each((index, elm) => {
		const $this = $(elm);
		__g.guideline[$this.find('.guideline-number').text()] = $this.find('.guideline-statement').text();
	});

	// dataset の json ファイルをロードしたらアプリケーションの初期化
	$.getJSON(
		'strings.json',
		function(data) {
			__g.STRINGS = data;
			$.getJSON(
				'data/datasets.json',
				data => init(data)
			);
		}
	);
	function init(data) {
		__g.userDefaults = new UserDefaults();
		__g.app = new RDFPortal();
		__g.app.init(data);
		// ウインドウを閉じる際に諸情報を保存
		$w.on('unload', () => __g.userDefaults.synchronize());
	}

});
