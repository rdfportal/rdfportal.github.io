/* global $ */

import {__g} from './global.js';

const MAX = 5;

/* Change log view manager class
 * 更新履歴ビュー管理クラス
 * 
 */
export default class ChangeLogViewController {

	constructor() {
		this._isInitialized = false;
		this._$ = $('#changelog-view');

		$.getJSON(__g.rootPath + 'change-log.json', (logJson) => {
			const $homeChangeLogH2 = $('#home-change-log > h2');
			let html = '';
			this._changeLog = logJson.change_log;
			for (let i = 0; i < Math.min(this._changeLog.length, MAX); i++) {
				const log = this._changeLog[i];
				html += `
					<dl data-index="${i}">
						<dt>${log.date}</dt>
						<dd>
							<span lang="en">${log.title.en}</span>
							<span lang="ja">${log.title.ja}</span>
						</dd>
					</dl>`;
			}
			$homeChangeLogH2.after(html);
			$('#home-change-log dl').on('click', (e) => {
				__g.app.changeView(__g.VIEWS.changeLog, { index: e.delegateTarget.dataset.index });
			});
		});
	}

	show(params) {
		this._$.addClass('shown');
		window.setTimeout(function(){
			__g.app.changed(__g.VIEWS_NAME.indexOf('changeLog'));
		}, 0);
		if (!this._isInitialized) {
			this._isInitialized = true;
			// rendering
			let html = '';
			for (let i = 0; i < this._changeLog.length; i++) {
				const log = this._changeLog[i];
				html += `
					<article id="change-log${i}">
						<header>
							<h4>
								<span lang="en">${log.title.en}</span>
								<span lang="ja">${log.title.ja}</span>
							</h4>
							<time>${log.date}</time>
						</header>
						<section class="seciton-body" lang="en">${log.article.en}</section>
						<section class="seciton-body" lang="ja">${log.article.ja}</section>
					</article>`;
			}
			this._$.find('.seciton-body').append(html);
		}
		// scroll
		if (params) {
			const $targetArticle = this._$.find(`#change-log${params.index}`);
			setTimeout(function() {
				$('html, body').animate({
					scrollTop: $targetArticle.offset().top
				}, {
					duration: 400
				})
			}, 200);
		}
	}

	hide() {
		this._$.removeClass('shown');
	}

} // ********** end of ChangeLogViewController class
