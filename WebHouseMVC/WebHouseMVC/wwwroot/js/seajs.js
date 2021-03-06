/*! Sea.js 2.1.1 | seajs.org/LICENSE.md
// @require('noBabel')

 */(function(t,u){function v(b){return function(c){return Object.prototype.toString.call(c)==="[object "+b+"]"}}function Q(){return w++}function I(b,c){var a;a=b.charAt(0);if(R.test(b))a=b;else if("."===a){a=(c?c.match(E)[0]:h.cwd)+b;for(a=a.replace(S,"/");a.match(J);)a=a.replace(J,"/")}else a="/"===a?(a=h.cwd.match(T))?a[0]+b.substring(1):b:h.base+b;return a}function K(b,c){if(!b)return"";var a=b,d=h.alias,a=b=d&&F(d[a])?d[a]:a,d=h.paths,g;if(d&&(g=a.match(U))&&F(d[g[1]]))a=d[g[1]]+g[2];g=a;var e=h.vars;
    e&&-1<g.indexOf("{")&&(g=g.replace(V,function(a,b){return F(e[b])?e[b]:a}));a=g.length-1;d=g.charAt(a);b="#"===d?g.substring(0,a):".js"===g.substring(a-2)||0<g.indexOf("?")||".css"===g.substring(a-3)||"/"===d?g:g+".js";g=I(b,c);var a=h.map,l=g;if(a)for(var d=0,f=a.length;d<f&&!(l=a[d],l=x(l)?l(g)||g:g.replace(l[0],l[1]),l!==g);d++);return l}function L(b,c){var a=b.sheet,d;if(M)a&&(d=!0);else if(a)try{a.cssRules&&(d=!0)}catch(g){"NS_ERROR_DOM_SECURITY_ERR"===g.name&&(d=!0)}setTimeout(function(){d?
    c():L(b,c)},20)}function W(){if(y)return y;if(z&&"interactive"===z.readyState)return z;for(var b=s.getElementsByTagName("script"),c=b.length-1;0<=c;c--){var a=b[c];if("interactive"===a.readyState)return z=a}}function e(b,c){this.uri=b;this.dependencies=c||[];this.exports=null;this.status=0;this._waitings={};this._remain=0}if(!t.seajs){var f=t.seajs={version:"2.1.1"},h=f.data={},X=v("Object"),F=v("String"),A=Array.isArray||v("Array"),x=v("Function"),w=0,p=h.events={};f.on=function(b,c){(p[b]||(p[b]=
    [])).push(c);return f};f.off=function(b,c){if(!b&&!c)return p=h.events={},f;var a=p[b];if(a)if(c)for(var d=a.length-1;0<=d;d--)a[d]===c&&a.splice(d,1);else delete p[b];return f};var m=f.emit=function(b,c){var a=p[b],d;if(a)for(a=a.slice();d=a.shift();)d(c);return f},E=/[^?#]*\//,S=/\/\.\//g,J=/\/[^/]+\/\.\.\//,U=/^([^/:]+)(\/.+)$/,V=/{([^{]+)}/g,R=/^\/\/.|:\//,T=/^.*?\/\/.*?\//,n=document,q=location,B=q.href.match(E)[0],k=n.getElementsByTagName("script"),k=n.getElementById("seajsnode")||k[k.length-
    1],k=((k.hasAttribute?k.src:k.getAttribute("src",4))||B).match(E)[0],s=n.getElementsByTagName("head")[0]||n.documentElement,N=s.getElementsByTagName("base")[0],O=/\.css(?:\?|$)/i,Y=/^(?:loaded|complete|undefined)$/,y,z,M=536>1*navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/,"$1"),Z=/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,$=/\\\\/g,r=f.cache={},C,G={},H={},D={},j=e.STATUS={FETCHING:1,
    SAVED:2,LOADING:3,LOADED:4,EXECUTING:5,EXECUTED:6};e.prototype.resolve=function(){for(var b=this.dependencies,c=[],a=0,d=b.length;a<d;a++)c[a]=e.resolve(b[a],this.uri);return c};e.prototype.load=function(){if(!(this.status>=j.LOADING)){this.status=j.LOADING;var b=this.resolve();m("load",b);for(var c=this._remain=b.length,a,d=0;d<c;d++)a=e.get(b[d]),a.status<j.LOADED?a._waitings[this.uri]=(a._waitings[this.uri]||0)+1:this._remain--;if(0===this._remain)this.onload();else{for(var g={},d=0;d<c;d++)a=
    r[b[d]],a.status<j.FETCHING?a.fetch(g):a.status===j.SAVED&&a.load();for(var h in g)if(g.hasOwnProperty(h))g[h]()}}};e.prototype.onload=function(){this.status=j.LOADED;this.callback&&this.callback();var b=this._waitings,c,a;for(c in b)if(b.hasOwnProperty(c)&&(a=r[c],a._remain-=b[c],0===a._remain))a.onload();delete this._waitings;delete this._remain};e.prototype.fetch=function(b){function c(){var a=g.requestUri,b=g.onRequest,c=g.charset,d=O.test(a),e=n.createElement(d?"link":"script");if(c&&(c=x(c)?
    c(a):c))e.charset=c;var f=e;d&&(M||!("onload"in f))?setTimeout(function(){L(f,b)},1):f.onload=f.onerror=f.onreadystatechange=function(){Y.test(f.readyState)&&(f.onload=f.onerror=f.onreadystatechange=null,!d&&!h.debug&&s.removeChild(f),f=null,b())};d?(e.rel="stylesheet",e.href=a):(e.async=!0,e.src=a);y=e;N?s.insertBefore(e,N):s.appendChild(e);y=null}function a(){delete G[f];H[f]=!0;C&&(e.save(d,C),C=null);var a,b=D[f];for(delete D[f];a=b.shift();)a.load()}var d=this.uri;this.status=j.FETCHING;var g=
{uri:d};m("fetch",g);var f=g.requestUri||d;!f||H[f]?this.load():G[f]?D[f].push(this):(G[f]=!0,D[f]=[this],m("request",g={uri:d,requestUri:f,onRequest:a,charset:h.charset}),g.requested||(b?b[g.requestUri]=c:c()))};e.prototype.exec=function(){function b(a){return e.get(b.resolve(a)).exec()}if(this.status>=j.EXECUTING)return this.exports;this.status=j.EXECUTING;var c=this.uri;b.resolve=function(a){return e.resolve(a,c)};b.async=function(a,g){e.use(a,g,c+"_async_"+w++);return b};var a=this.factory,a=
    x(a)?a(b,this.exports={},this):a;a===u&&(a=this.exports);null===a&&!O.test(c)&&m("error",this);delete this.factory;this.exports=a;this.status=j.EXECUTED;m("exec",this);return a};e.resolve=function(b,c){var a={id:b,refUri:c};m("resolve",a);return a.uri||K(a.id,c)};e.define=function(b,c,a){var d=arguments.length;1===d?(a=b,b=u):2===d&&(a=c,A(b)?(c=b,b=u):c=u);if(!A(c)&&x(a)){var g=[];a.toString().replace($,"").replace(Z,function(a,b,c){c&&g.push(c)});c=g}d={id:b,uri:e.resolve(b),deps:c,factory:a};if(!d.uri&&
    n.attachEvent){var f=W();f&&(d.uri=f.src)}m("define",d);d.uri?e.save(d.uri,d):C=d};e.save=function(b,c){var a=e.get(b);a.status<j.SAVED&&(a.id=c.id||b,a.dependencies=c.deps||[],a.factory=c.factory,a.status=j.SAVED)};e.get=function(b,c){return r[b]||(r[b]=new e(b,c))};e.use=function(b,c,a){var d=e.get(a,A(b)?b:[b]);d.callback=function(){for(var a=[],b=d.resolve(),e=0,f=b.length;e<f;e++)a[e]=r[b[e]].exec();c&&c.apply(t,a);delete d.callback};d.load()};e.preload=function(b){var c=h.preload,a=c.length;
    a?e.use(c,function(){c.splice(0,a);e.preload(b)},h.cwd+"_preload_"+w++):b()};f.use=function(b,c){e.preload(function(){e.use(b,c,h.cwd+"_use_"+w++)});return f};e.define.cmd={};t.define=e.define;f.Module=e;h.fetchedList=H;h.cid=Q;f.resolve=K;f.require=function(b){return(r[e.resolve(b)]||{}).exports};h.base=(k.match(/^(.+?\/)(\?\?)?(seajs\/)+/)||["",k])[1];h.dir=k;h.cwd=B;h.charset="utf-8";var B=h,P=[],q=q.search.replace(/(seajs-\w+)(&|$)/g,"$1=1$2"),q=q+(" "+n.cookie);q.replace(/(seajs-\w+)=1/g,function(b, c){P.push(c)});B.preload=P;f.config=function(b){for(var c in b){var a=b[c],d=h[c];if(d&&X(d))for(var e in a)d[e]=a[e];else A(d)?a=d.concat(a):"base"===c&&("/"===a.slice(-1)||(a+="/"),a=I(a)),h[c]=a}m("config",b);return f}}})(this);


/*!
 * @name seajs.cfg
 * @author author
 * @date 2020-03-16
 */
// pc配置
var seajsCfg = {
        'jquery'         : 'core/js/vendor/dialog/lib/jquery-1.10.2',
        'common'         : 'core/js/common',
        // 地图
        'mapSimple'      : 'core/js/map-simple',
        // 点赞投票
        'vote'           : 'core/js/vote',
        // 收藏
        'collect'        : 'core/js/collect',
        'markdown'       : 'core/js/static/marked',
        // 加载更多
        'loadmore'       : 'core/js/loadmore',
        // 百度分享扩展(baidu官方已下架)
        'share'          : 'core/js/share',
        //PC端社会化分享
        'sharesosh'      : 'core/js/static/sosh.min',
        // 评论
        'comment'        : 'core/js/comment',
        // 表单交互
        'inter'          : 'core/js/inter',
        // 表单组切换
        'changeFormgroup': 'core/js/change-formgroup',
        // 拖拽改变大小
        'dragResize'     : 'core/js/static/dragResize',
        'vue'            : 'core/js/static/vue.min',
        // 上传
        'webuploader'    : 'core/js/static/webuploader',
        'webupload'      : 'core/js/webupload',
        'webuploadCss'   : 'core/css/webupload.css',
        // 拖拽排序
        'sortable'       : 'core/js/static/jquery.sortable',
        // 模拟下拉列表
        'cxselect'       : 'core/js/static/jquery.cxselect',
        // 表单验证
        'validate'       : 'core/js/static/jquery.validate.min',
        // 列表页ajax
        'listPjax'       : 'core/js/list-pjax',
        'utils'          : 'core/js/utils',
        'listajax'       : 'core/js/list-ajax',

        'dialog'         : 'core/js/vendor/dialog/src/dialog-plus',
        'dialogc'        : 'core/js/vendor/dialog/src/dialog-config',
        //核心JS
        'core'           : 'core/js/core',
        'baidumap'       : 'core/js/baidumap',
        'mapLibs'        : 'core/js/map-libs',
        'mapComplex'     : 'core/js/map-complex',
        'pager'          : 'core/js/pager',
        'ueditor'        : 'core/js/vendor/ueditor/ueditor.all',
        'ueditor.conf'   : 'core/js/vendor/ueditor/ueditor.config',
        // 编辑器的插件
        'ueditorPlugin'  : 'core/js/ueditor-plugin',
        'chart'          : 'core/js/vendor/myChart/echarts-plain',
        //拼音转换JS
        'pinyin'         : 'core/js/pinyin.js',
        // 路由
        'director'       : 'core/js/static/director',
        // 下拉菜单
        'dropdown'       : 'core/js/static/dropdown',
        // 分页
        'pagination'     : 'core/js/static/jquery.pagination',
        // 模板
        'template'       : 'core/js/static/template',
        // QQ表情
        'qqFace'         : 'core/js/static/jquery.qqFace',
        'cookie'         : 'core/js/static/jq.cookie',
        // fixed 固定元素
        'fixed'          : 'core/js/static/jquery-scrolltofixed',
        // 图库
        'gallery'        : 'core/js/static/gallery',
        'lightgallery'   : 'core/js/static/lightgallery',
        'lgthumb'        : 'core/js/static/lg-thumbnail',//幻灯片缩略图
        // 数据图形
        'charts'         : 'core/js/static/highcharts',
        // 数据图形2
        'chartmobile'    : 'core/js/static/chart.min',
        // 输入框提示
        'placeholder'    : 'core/js/static/jquery-placeholder',
        // 自动完成
        'autocomplete'   : 'core/js/static/jquery.autocomplete',
        // 时间拾取
        'daterangepicker': 'core/js/static/daterangepicker',
        // 时间格式化
        'moment'         : 'core/js/static/moment.min',
        // 二维码生成js
        'qrcode'         : 'core/js/static/jquery-qrcode',
        // 图片懒加载
        'lazyload'       : 'core/js/static/lazyload',
        // switch 按钮
        'switch'         : 'core/js/static/bootstrap-switch.min',
        // 导出表格
        'tableexport'    : 'core/js/static/tableexport.min',
        'fileSaver'      : 'core/js/static/FileSaver.min',
        'base64'         : 'core/js/static/jquery.base64',
        'xlsx'           : 'core/js/static/xlsx.core.min',
        // 弹层插件
        'layer'          : 'core/js/static/layer',
        'jqduang'        : 'core/js/plugin/jqduang',
        // 弹窗
        'jqmodal'        : 'core/js/plugin/jqmodal',
        'jqhoverS'       : 'core/js/plugin/jqhoverslider',
        // 滚动高亮当前
        'jqscrollspy'    : 'core/js/plugin/jqscrollspy',

        // 按钮插件
        'icheck'         : 'core/js/static/icheck.min',

        // ajax缓存
        'ajaxCache'      : 'core/js/static/jquery-ajax-localstorage-cache',

        // 下拉框搜索
        'chosen'         : 'core/js/static/chosen.jquery',

        // 说明文档
        '08cmsDoc'       : 'core/js/08cmsDoc',
        'manage'         : 'core/js/manage',
        'pop'            : 'core/js/pop',
        // 收藏
        // 'collect'     : 'core/js/collect',
        // 点评
        'jqraty'         : 'core/js/static/jquery.raty',
        // 统计
        // 'getcounts'   : 'core/js/getcounts',
        // 投票
        // 'vote'        : 'core/js/vote',
        // 下拉刷新
        // 'loadmore'    : 'core/js/loadmore',
        // 选项卡式刷新
        'tabLoadmore'    : 'core/js/tabloadmore',
        // 最近浏览
        'browserRecord'  : 'core/js/browserRecord',
        // 背投广告
        'beitou'         : 'core/js/beitou',
        'filter'         : 'core/js/filter',
        'ajaxbind1'      : 'core/js/ajaxbind1',
        // 颜色采集
        'jscolor'        : 'core/js/vendor/cart/jscolor.js',
        // 从manage移过来的
        'jplayer'        : 'core/js/vendor/audioplayer/inc/jquery.jplayer.min',
        'miniPlayer'     : 'core/js/vendor/audioplayer/inc/jquery.mb.miniPlayer',
        'miniPlayer-plus': 'core/js/vendor/audioplayer/inc/jquery.mb.miniPlayer-plus',
        'miniplayer.css' : 'core/js/vendor/audioplayer/css/miniplayer.css',
        'javascript'     : 'core/js/vendor/codemirror/javascript',
        'php'            : 'core/js/vendor/codemirror/php',
        'clike'          : 'core/js/vendor/codemirror/clike',
        'codemirror'     : 'core/js/vendor/codemirror/codemirror',
        'croppercss'     : 'core/js/vendor/cropper/cropper.css',
        'codemirrorcss'  : 'core/js/vendor/codemirror/codemirror.css',
        'slide'          : 'core/js/vendor/slide',
        'formvalidator'  : 'core/js/formvalidator',
        'coco2dx'        : 'core/js/vendor/cocos2d-js-v3.13/cocos2d-js-v3.13',
        'comm'           : 'core/js/comm',
        'main'           : 'core/js/main',
        'manage_main'    : 'manage/js/main',
        'models'         : 'manage/js/models',
        // 下面是比较特殊的，源文件在house里
        'searchxq'       : 'house/js/searchxq',
        'shapan'         : 'house/js/shapan',
        'ckplayer'       : 'core/js/ckplayer/ckplayer',
        'transfer'       : 'core/js/transfer',
        //  远程
        'jweixin'        : 'https://res.wx.qq.com/open/js/jweixin-1.0.0.js',
        'BMap'           : 'https://api.map.baidu.com/getscript?v=2.0&ak=' + (typeof MAPKEY != "undefined" ? MAPKEY : '') + '&services=&t=' + parseInt(new Date().getTime()/1000),
        'BMapDraw'       : 'https://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min',
        'BMapDrawCss'    : 'https://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css',
        // 谷歌地图
        'GMap'           : 'http://maps.googleapis.com/maps/api/js?key=' + (typeof MAPKEY != "undefined" ? MAPKEY : '') + '&sensor=false&libraries=places,drawing,geometry',
        'mapsLibs'       : 'core/js/maps-libs',
        'mapsComplex'    : 'core/js/maps-complex',
        'mapsSimple'     : 'core/js/maps-simple',
        'emojimap'       : 'core/js/emojimap',
        // 即时聊天功能
        'IM'             : 'core/js/static/NIM_Web_SDK_v5.9.0',
        'IMLibs'         : 'core/js/im-libs',
        'imUI'           : 'core/js/im-ui',
        // 直播功能
        'neplayer'       : 'core/js/vendor/video/neplayer.min'
    };
seajs.config({
    map: [
        ['.js', '.js?v=' + (typeof VERSION != 'undefined' ? VERSION : '8.1')]
    ],
    base: jsbase,
    alias: seajsCfg,
    preload: ['jquery'],  // 预加载项
    charset: 'UTF-8'        // 文件编码
});

//# sourceMappingURL=http://localhost:8888/js/seajs.js.map
