/* global $ */
import {__g} from './global.js';

/* Guideline view manager class
 * ガイドラインビュー管理クラス
 * 
 */
export default class GuidelineViewController {

	constructor() {

	}

	show() {
		$('#guideline-view').addClass('shown');
		window.setTimeout(function(){
			__g.app.changed(__g.VIEWS_NAME.indexOf('guideline'));
		}, self.SHOW_DURATION);
	}
	hide() {
		$('#guideline-view').removeClass('shown');
	}

} // ********** end of GuidelineViewController class
