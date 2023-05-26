/* global $, marked, CodeMirror */

import {__g} from './global.js';

const PATH = './documents/';

/* Manual view manager class
 * マニュアルビュー管理クラス
 * 
 */
export default class ManualViewController {

	constructor() {
		this.$view = $('#manual-view');
	}

	show(params) {
		const documentName = params ? params.id : 'top';
		$.when( // Documents の内容が記述されたMarkDownファイルの読み込み
			$.ajax({
				url: `${PATH}${documentName}.en.md`,
				dataType: 'text'
			}),
			$.ajax({
				url: `${PATH}${documentName}.ja.md`,
				dataType: 'text'
			})
		).done((en, ja) => {
			const contents = { en: en[0], ja: ja[0] };
			for (const lang in contents) {
				// 各言語ごとの処理
				const
					content = contents[lang],
					htmlText = marked(content)
						.replace(/<pre><code>/g, '<textarea>')
						.replace(/<\/code><\/pre>/g, '</textarea>'),
					htmlElements = $.parseHTML(htmlText),
					$container = this.$view.find(`.seciton-body[lang="${lang}"]`);
				$container.html('');
				let
					section = document.createElement('section');
				// HTMLElement を回してレンダリング
				$(htmlElements).each((index, elm) => {
					if (elm.nodeType === Node.ELEMENT_NODE) {
						if (0 < index && elm.tagName === 'H2') {
							// HTMLElement が大見出しの場合、パラグラフを切る
							$container.append(section);
							section = document.createElement('section');
						}
						section.appendChild(elm);
					}
					$container.append(section);
				});
			}
			// リンク
			this.$view.find('.documents-index a').each((index, elm) => {
				elm.href = `${__g.rootPath}documents/${elm.getAttribute('href')}`;
			})
			// CodeMirror
			this.$view.find('textarea').each((index, elm) => {
				CodeMirror.fromTextArea(elm, {
					mode: 'application/sparql-query',
					matchBrackets: true,
					lineNumbers: true
				});
			});
			window.setTimeout(function(){
				__g.app.changed(__g.VIEWS_NAME.indexOf('documents'));
			}, self.SHOW_DURATION);
		});

		this.$view.addClass('shown');
	}

	hide() {
		this.$view.removeClass('shown');
	}

} // ********** end of ManualViewController class
