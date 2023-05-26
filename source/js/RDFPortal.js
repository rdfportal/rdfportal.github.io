/* global $, page, d3 */

import {isDebug, $w, __g} from './global.js';
import HomeViewController from './HomeViewController.js';
import ListViewController from './ListViewController.js';
import MatrixViewController from './MatrixViewController.js';
import GraphViewController from './GraphViewController.js';
import ManualViewController from './ManualViewController.js';
import GuidelineViewController from './GuidelineViewController.js';
import ChangeLogViewController from './ChangeLogViewController.js';
import DetailViewController from './DetailViewController.js';
import Datasets from './Datasets.js';
import ViewLabel from './ViewLabel.js';
import ControlPanel from './ControlPanel.js';
import Star from './Star.js';

const
	_MAIN_VIEW_LEFT = 60,
	_MAIN_VIEW_RIGHT = 0,
	_MAIN_VIEW_TOP = 10,
	_MAIN_VIEW_BOTTOM = 10;

/* RDF Portal class
 * 当ウェブアプリの全体を司るクラス
 * グローバルに参照できるようにする
 * 
 */
export default class RDFPortal {

	constructor() {
		this._appPrepareCounter = 0;
		this._currentView = -1;
		this._currentStarId;
		this._notifications = {};
		this._homeViewController;
		this._listViewController;
		this._matrixViewController;
		this._graphViewController;
		this._manualViewController;
		this._guidelineViewController;
		this._changeLogViewController;
		this._detailViewController;
		this._$navButtons;
		this._isChanging = false;
		this._changeId;

		// デバッグモード
		if (isDebug) {
			// force 用のコンソール
			$('.stars').after(`
				<section id="force-layout-console">
					<ul>
						<li>
							<label for="FLLinkDistance">linkDistance</label>
							<input type="text" id="FL-linkDistance" data-key="linkDistance">
						</li>
						<li>
							<label for="FLLinkDistance">linkStrength</label>
							<input type="text" id="FL-linkStrength" data-key="linkStrength">
						</li>
						<li>
							<label for="FLLinkDistance">friction</label>
							<input type="text" id="FL-friction" data-key="friction">
						</li>
						<li>
							<label for="FLLinkDistance">charge</label>
							<input type="text" id="FL-charge" data-key="charge">
						</li>
						<li>
							<label for="FLLinkDistance">chargeDistance</label>
							<input type="text" id="FL-chargeDistance" data-key="chargeDistance">
						</li>
						<li>
							<label for="FLLinkDistance">theta</label>
							<input type="text" id="FL-theta" data-key="theta">
						</li>
						<li>
							<label for="FLLinkDistance">gravity</label>
							<input type="text" id="FL-gravity" data-key="gravity">
						</li>
					</ul>
				</section>
			`);
		}

	}

	// アプリの開始
	_startApp() {
		const urlParameter = {};

		// ロゴ色の取得
		//$.adaptiveBackground.run();

		// URL パラメータからページ状態の復帰
		urlParameter.view = window.location.pathname ? window.location.pathname.substr(1) : 'home';

		// ビューの特定
		if (urlParameter.id) {
			this._currentStarId = urlParameter.id;
		}

		// ルーター
		page(__g.rootPath + 'dataset/:id', this.routeDetail.bind(this));
		page(__g.rootPath + 'documents/:id', this.routeDocuments.bind(this));
		page(__g.rootPath + ':pagetype', this.route.bind(this));
		page(__g.rootPath + '', this.route.bind(this));
		page.start();
		
		// スプラッシュスクリーンの消失
		$('#splash-screen').addClass('vanish').delay(3000).queue(function(){
			$(this).remove();
		});
		//change-log 更新内容
		//キャッシュしない
		$.ajaxSetup({
		  cache: false
		});
	}

	// notification
	addNotificationObserver(notificationName, observer, functionObj) {
		if (!this._notifications[notificationName]) {
			this._notifications[notificationName] = [];
		}
		var isMatch = false;
		for (var i = 0; i < this._notifications[notificationName].length; i++) {
			var notification = this._notifications[notificationName][i];
			if (notification.observer === observer) {
				isMatch = true;
			}
		}
		if (!isMatch) {
			this._notifications[notificationName].push({
				observer: observer,
				function: functionObj
			});
		}
	}
	removeNotificationObserver(notificationName, observer) {
		if (this._notifications[notificationName]) {
			for (var i = 0; i < this._notifications[notificationName].length; i++) {
				var notification = this._notifications[notificationName][i];
				if (notification.observer === observer) {
					this._notifications[notificationName].splice(i, 1);
					break;
				}
			}
		}
	}
	postNortification(notificationName, val) {
		if (this._notifications[notificationName]) {
			for (var i = 0; i < this._notifications[notificationName].length; i++) {
				const notification = this._notifications[notificationName][i];
				notification.function.call(notification.observer, val);
			}
		}
	}

	// accessor
	get currentStarId() { return this._currentStarId; }
	get currentView() { return this._currentView; }
	isChanging() { return this._isChanging; }

	// ロゴ画像が読み込まれるとデクリメント
	appPrepareDecrement() {
		this._appPrepareCounter--;
		if (this._appPrepareCounter === 0) {
			this._startApp();
		}
	}

	// ビューの変更
	changeView(kindOfView, params) {

		// 変更中であれば無効
		if (this._isChanging) return;

		const labelOfView = __g.VIEWS_NAME[kindOfView];
		if (labelOfView === __g.VIEWS_NAME[__g.VIEWS.dataset]) {
			// dataset ページの場合
			page(`${__g.rootPath}${labelOfView}/${params.id}`);
		} else if(labelOfView === 'home') {
			// home ページの場合
			page(`${__g.rootPath}`);
		} else {
			// それ以外の場合
			page(`${__g.rootPath}${labelOfView}`);
		}
	}
	changed(id, height) {
		if (this._changeId === id) {
			this._isChanging = false;
			$w.trigger('resize');
			$('html, body').animate({
					scrollTop: 0
				}, {
					duration: 200
				});
			this.$main.css('height', height);
		}
	}

	// router
	routeDetail(context, next) {
		this._currentStarId = context.params.id; // 現在 dataset view で指しているページの定義
		this.render(__g.VIEWS_NAME.indexOf('dataset'), context.params);
	}
	routeDocuments(context, next) {
		this.render(__g.VIEWS_NAME.indexOf('documents'), context.params);
	}
	route(context, next) {
		let kindOfView = __g.VIEWS_NAME.indexOf(context.params.pagetype);
		kindOfView = kindOfView === -1 || context.params.pagetype === 'dataset' ? 0 : kindOfView;
		this.render(kindOfView);
	}
	render(kindOfView, params) {
		if (
			kindOfView === __g.VIEWS.dataset ||
			kindOfView === __g.VIEWS.documents ||
			kindOfView !== this._currentView) {

			// 現状のビューの終了
			if (this._currentView !== -1) {
				switch (this._currentView) {
					case __g.VIEWS.home: this._homeViewController.hide(); break;
					case __g.VIEWS.datasets: this._listViewController.hide(); break;
					case __g.VIEWS.statistics: this._matrixViewController.hide(); break;
					case __g.VIEWS.network: this._graphViewController.hide(); break;
					case __g.VIEWS.documents: this._manualViewController.hide(); break;
					case __g.VIEWS.guideline: this._guidelineViewController.hide(); break;
					case __g.VIEWS.changeLog: this._changeLogViewController.hide(); break;
					case __g.VIEWS.dataset: this._detailViewController.hide(); break;
				}
			}

			// ビューの変更
			this._currentView = kindOfView;
			// スクリーンに属性付与
			$('body').attr('data-kind-of-view', __g.VIEWS_NAME[kindOfView]);
			this.$main.attr('data-kind-of-view', __g.VIEWS_NAME[kindOfView]);
			// 星たちに通知
			this.stars.forEach((star) => {
				star.changeView(kindOfView, this.currentStarId);
			});
			// コンパネに通知
			//__g.controlPanel.changeView(kindOfView);
			// navigation
			this.viewLabel.changeLable(__g.VIEWS_LABEL[this._currentView]);
			//_$navLabel.text( __g.VIEWS_LABEL[this._currentView] );
			this._$navButtons.each(function(){
				this.className = this.getAttribute('data-kind-of-view') === __g.VIEWS_NAME[kindOfView] ? 'current' : '';
			});
			// ビュー管理用関数の呼び出し
			switch (kindOfView) {
				case __g.VIEWS.home:
					//this._homeViewController.show();
					this.currentViewController = this._homeViewController;
					break;
				case __g.VIEWS.datasets:
					this.currentViewController = this._listViewController;
					break;
				case __g.VIEWS.statistics:
					this.currentViewController = this._matrixViewController;
					break;
				case __g.VIEWS.network:
					this.currentViewController = this._graphViewController;
					break;
				case __g.VIEWS.documents:
					this.currentViewController = this._manualViewController;
					break;
				case __g.VIEWS.guideline:
					this.currentViewController = this._guidelineViewController;
					break;
				case __g.VIEWS.changeLog:
					this.currentViewController = this._changeLogViewController;
					break;
				case __g.VIEWS.dataset:
					this.currentViewController = this._detailViewController;
					break;
				default:
					this.currentViewController = null;
					window.console.log('該当する画面がありません: ', __g.VIEWS_LABEL[kindOfView] );
					break;
			}
			this.currentViewController.show(params);
			// 遷移状態に
			this._isChanging = true;
			this._changeId = this._currentView;
		}
		
	}

	// スターの選択
	selectedStar(id) {
		if (__g.app.currentView !== __g.VIEWS.dataset |this.currentStarId !== id) {
			// ビューの変更
			this.changeView(__g.VIEWS.dataset, { id: id });
		}
	}

	// JSON読み込み後、初期化
	init(data) {
		const self = this;
		var id, ids, idIndices = {}, i, j, newStyle,
				screenWidth, screenHeight;

		this.$main = $('main#main-view');
		this.$stars = this.$main.children('.stars');
		this.$star = undefined;
		this.viewLabel = new ViewLabel();
		this.$offScreenCanvas = $('main#main-view');
		this.language = __g.userDefaults.misc.language;
		this.datasets = new Datasets(data);
		this.mainView = {
			center: { x: 0, y: 0 },
			size: { width: 0, height: 0 }
		};
		this.stars = [];
		this.starsWithKeys = {};
		this.xrefs = {};
		this.currentViewController = undefined;
		this.maxValue = {
			class: 0,
			instance: 0,
			literal: 0,
			object: 0,
			property: 0,
			subject: 0,
			triple: 0
		};
		this._appPrepareCounter = this.datasets.noOfDatasets() + 1;

		// Stylesheet
		newStyle = document.createElement('style');
		newStyle.type = 'text/css';
		document.getElementsByTagName('head').item(0).appendChild(newStyle);
		__g.styleSheet = document.styleSheets[document.styleSheets.length - 1];

		// SVG
		__g.d3.edges = __g.d3.svg.append('g').attr('class', 'edges');

		// 各ビューのコントローラ生成
		this._homeViewController = new HomeViewController();
		this._listViewController = new ListViewController();
		this._matrixViewController = new MatrixViewController();
		this._graphViewController = new GraphViewController();
		this._manualViewController = new ManualViewController();
		this._guidelineViewController = new GuidelineViewController();
		this._changeLogViewController = new ChangeLogViewController();
		this._detailViewController = new DetailViewController();
		this.currentViewController = this._homeViewController;

		// ナビゲーション：ビュー切り替え
		this._$navButtons = $('#global-navigation').children('ul').children('li[data-kind-of-view]')
			.on('click', e => {
				const kindOfView = e.delegateTarget.getAttribute('data-kind-of-view');
				this.changeView( __g.VIEWS_NAME.indexOf(kindOfView) );
			});
		// ナビゲーション：ロケール切り替え
		$('#language-switch').find('li').on('click', e => {
			$('html').attr('lang', e.delegateTarget.getAttribute('data-lang'));
			this.language = e.delegateTarget.getAttribute('data-lang');
			__g.userDefaults.misc.language = this.language;
		});
		$('#language-switch').find('li[data-lang="' + this.language + '"]').trigger('click');

		// コンソールパネル
		__g.controlPanel = new ControlPanel();

		// データセットの基本情報の取得
		ids = this.datasets.ids();
		for (i = 0; i < ids.length; i++) {
			id = ids[i];
			var keys = {
				class: 'noOfClasses',
				instance: 'noOfInstances',
				literal: 'noOfLiterals',
				object: 'noOfObjects',
				property: 'noOfProperties',
				subject: 'noOfSubjects',
				triple: 'noOfTriples'
			};
			for (j in keys) {
				this.maxValue[j] = (this.maxValue[j] < this.datasets[keys[j]](id)) ? this.datasets[keys[j]](id) : this.maxValue[j];
			}
		}
		for (i in this.maxValue) {
			this.maxValue[i] = Math.sqrt(this.maxValue[i]);
		}

		// メインビューの矩形定義
		$w
			.on('resize.mainViewControl', () => { // ウインドウサイズの変動でメインビューをリサイズ
				this.mainView.size.height = $w.innerHeight() - _MAIN_VIEW_TOP - _MAIN_VIEW_BOTTOM;
				this.mainView.size.width = $w.innerWidth() - _MAIN_VIEW_LEFT - _MAIN_VIEW_RIGHT;
				this.$main.css({
					height: this.mainView.size.height,
					width: this.mainView.size.width
				});
				// SVG
				__g.d3.svg
					.attr('width', this.mainView.size.width - __g.SVG_MARGIN_LEFT)
					.attr('height', this.mainView.size.height);
				if (__g.d3.force) {
					__g.d3.force
						.force('center', d3.forceCenter(this.mainView.size.width * 0.5, this.mainView.size.height * 0.5))
						.restart();
				}
			})
			.trigger('resize.mainViewControl');

		// force layout
		{
			// ノードの生成
			for (i = 0; i < ids.length; i++) {
				id = ids[i];
				__g.d3.nodesData.push({ key: id, isInternal: true });
				// クロスリファレンスの抽出
				for (j = 0; j < this.datasets.xref.noOf(id); j++) {
					var title = this.datasets.xref.title(id, j);
					if (!this.xrefs[title]) {
						this.xrefs[title] = {
							key: title.replace(/\s/g, '_'),
							connectedDatasets: []
						};
						__g.d3.nodesData.push({ key: title, isInternal: false });
					}
					this.xrefs[title].connectedDatasets.push({
						connectedDatasetId: id,
						uri: this.datasets.xref.uri(id, j),
						numberOfTriples: this.datasets.xref.noOfTriples(id, j),
						type: this.datasets.xref.type(id, j)
					});
				}
			}
			// D3
			__g.d3.nodesSelection = d3.select('main#main-view div.stars').selectAll('div.star')
				.data(__g.d3.nodesData)
				.enter()
				.append('div');
			__g.d3.nodesSelection.each(function(data){
				var star = new Star(this, data);
				self.stars.push(star); // 各スター（ノード）を保持る配列
				data.star = star;
				self.starsWithKeys[ data.key ] = star; // 各スター（ノード）を保持る連想配列
			});
			// jQuery
			this.$star = $('main#main-view').children('.stars').children('.star');

			// リンク（エッジ）の生成
			for (i = 0; i < __g.d3.nodesData.length; i++) {
				idIndices[__g.d3.nodesData[i].key] = i; // ノードIDの並び順をキーバリュー形式で格納
			}
			for (i = 0; i < __g.d3.nodesData.length; i++) {
				id = __g.d3.nodesData[i].key;
				var connectedId;
				if (__g.d3.nodesData[i].isInternal) {
					// 内部リンク
					for (j = 0; j < this.datasets.connectedDatasetIds.noOf(id); j++) {
						connectedId = this.datasets.connectedDatasetIds.id(id, j);
						__g.d3.linksData.push({
							source: i,
							target: idIndices[connectedId],
							sourceId: id,
							targetId: connectedId,
							numberOfTriples: this.datasets.connectedDatasetIds.noOfTriple(id, j),
							type: this.datasets.connectedDatasetIds.type(id, j)
						});
					}
				} else {
					// 外部リンク
					for (j = 0; j < this.xrefs[id].connectedDatasets.length; j++) {
						connectedId = this.xrefs[id].connectedDatasets[j].connectedDatasetId;
						__g.d3.linksData.push({
							source: i,
							target: idIndices[connectedId],
							sourceId: this.xrefs[id].key,
							targetId: connectedId,
							numberOfTriples: this.xrefs[id].connectedDatasets[j].numberOfTriples,
							type: this.xrefs[id].connectedDatasets[j].type
						});
					}
				}
			}
			// D3
			__g.d3.linksSelection = __g.d3.edges.selectAll('.link')
				.data(__g.d3.linksData)
				.enter()
				.append('line');
			__g.d3.linksSelection.each(function(){ // エッジをトリプル数により強度をつける
				var d3This = d3.select(this),
						datum = d3This.datum(),
						ratio = Math.log(datum.numberOfTriples) / Math.log(self.maxValue.triple),
						opacity = 0.1 + 0.9 * ratio,
						width = 1 + 0.5 * ratio,
						classed = 'from-' + datum.sourceId + ' to-' + datum.targetId;
				this.style.stroke = 'rgba(255, 255, 255, ' + opacity + ')';
				this.style.strokeWidth = width;
				d3This.classed( 'edge ' + classed, true );
				// triple number
				this.d3NumberOfTriples = __g.d3.edges.append('text')
					.classed(classed, true);
				this.d3NumberOfTriples.append('tspan')
					.classed('number-of-triples', true)
					.text(datum.numberOfTriples.toLocaleString());
				if (datum.type) {
					this.d3NumberOfTriples.append('tspan')
						.classed('type', true)
						.attr('dx', 5)
						.text(datum.type);
				}
			});

			// force layout
			screenWidth = parseInt(__g.d3.svg.attr('width'));
			screenHeight = parseInt(__g.d3.svg.attr('height'));
			__g.d3.force = d3.forceSimulation()
				//.velocityDecay(0.1) // ノードの速度減衰係数
				.alpha(0.0025)
				//.alphaDecay(0.9)
				.alphaTarget(0)
				.force('link', // リンクによるバネ力
					d3.forceLink()
						//.distance(distance) // リンクの長さ
						//.strength(.5) // リンクの強度
						//.iterations() // 計算回数
				)
				//.force('collide', // ノード間の接触反発力
				//	d3.forceCollide()
				//		.radius(function(d) { return d.star.size * .5; }) // ノード半径
				//		.strength(1.0) // オーバーラップするノード間の反発力 0.0〜1.0
				//		.iterations(16) // 計算回数
				//)
				.force('charge', // ノード間のクーロン力（非接触作用力）
					d3.forceManyBody()
						//.strength(-300) // 正でくっつき、負で離れる
						//.theta() // 精度
						//.distanceMin() // クーロン力を計算する最小距離
						//.distanceMax() // ノード間の最大距離
				)
				.force('x', // 位置に基づく場の力
					d3.forceX()
						.strength(0.1)
						.x(0) // 中心x座標
				)
				.force('y', // 位置に基づく場の力
					d3.forceY()
						.strength(0.1)
						.y(0) // 中心y座標
				)
				//.force('center',
				//	d3.forceCenter(screenWidth * 0.5, screenHeight * 0.5)
				//);
			// ノード
			__g.d3.force
				.nodes(__g.d3.nodesData);
			// エッジ
			__g.d3.force
				.force('link')
					.links(__g.d3.linksData);

			// force layout のパラメータ確認用のコンソール
			$('#force-layout-console').find('input')
				.each(function(){
					//this.value = __g.d3.force[this.dataset.key]();
				})
				.on('change', function(){
					//__g.d3.force[this.dataset.key]( parseFloat(this.value) ).resume();
				});

			// ドラッグ可能に
			__g.d3.nodesSelection.call(d3.drag()
				.on('start', d => {
					if(!d3.event.active) __g.d3.force.alphaTarget(0.3).restart();
					d.fx = d.x;
					d.fy = d.y;
				})
				.on('drag', d => {
					d.fx = d3.event.x;
					d.fy = d3.event.y;
				})
				.on('end', d => {
					if(!d3.event.active) __g.d3.force.alphaTarget(0);
					d.fx = null;
					d.fy = null;
				})
			);
		}

		// 準備カウンタを1つ減らす
		this.appPrepareDecrement();

	}

} // ********** end of RDFPortal class