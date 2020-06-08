var firefox = navigator.userAgent.indexOf('Firefox') != -1; //监测火狐浏览器下使用兼容写法
// 下拉滚动条
//竖向的滚动条，四个参数，可视区域ID，内容区域Id，滚动条区域，滚动条，

function ScrollTop(params) {

	var $container = $(params.scrollBox), //可视区域
		$contanr = $(params.scrollCont), //内容区域
		$conScroll = $(params.scrollBarBox), //滚动条活动区域
		$sroll = $(params.scrollBar), //滚动条
		startY = 0, //开始位置  
		lastY = 0, //结束位置
		YN = false, //判断鼠标按下
		bBtn = true; //判断滚动条上滚还是下滚

	var $containerH = $container.height();

	var $contanrH = $contanr.outerHeight();
	// console.log($container.height())
	// console.log($conScroll.height())
	// console.log($contanr.outerHeight())
	// console.log($container.height()*$conScroll.height()/$contanr.outerHeight())

	function MouseScr(ev) {

		var $containerH1 = $container.height();

		var $contanrH1 = $contanr.outerHeight();

		if($containerH1 >= $contanrH1) {

			return false

		} else {

			var ev = ev || window.event,
				TopY = 0;

			if(ev.detail) {
				bBtn = ev.detail > 0 ? true : false;

			} else {
				bBtn = ev.wheelDelta < 0 ? true : false;

			}

			if(bBtn) { //下
				TopY = $contanr.position().top - 10;

			} else { //上
				TopY = $contanr.position().top + 10;

			}

			var maxTop = $contanr.outerHeight() - $container.outerHeight();
			TopY = TopY > 0 ? 0 : TopY;
			TopY = TopY < -maxTop ? -maxTop : TopY;
			// console.log($conScroll.outerHeight());
			$contanr.css({
				'top': TopY + 'px'
			});
			$sroll.css({
				'top': $sroll.height() * Math.abs(TopY) / $conScroll.height() + 'px'
			});

			if(ev.preventDefault) {
				ev.preventDefault();

			} else {

				return false;

			}

		}

	}

	if($containerH >= $contanrH) {
		// console.log('remove scroll')
		$sroll.css('height', $containerH);
		// 禁止鼠标事件

		function MouseWheel(e) {
			// console.log('we')
			$contanr.css('top', 0);
			$sroll.css('top', 0);
			e = e || window.event;

			if(e.stopPropagation) e.stopPropagation();

			else e.cancelBubble = true;

			if(e.preventDefault) e.preventDefault();

			else e.returnValue = false;

			return false;

		};

		if(firefox) {
			$contanr[0].removeEventListener('DOMMouseScroll', MouseScr, false); //兼容火狐。。。。。。。
			$conScroll[0].removeEventListener('DOMMouseScroll', MouseScr, false);

		}
		// console.log($contanr)
		// console.log($contanr[0])
		$contanr[0].onmousewheel = MouseWheel;
		$conScroll[0].onmousewheel = MouseWheel;

	} else {
		// 滚动条的高度等于可视区域高度*滚动区域高度/内容高度。
		$sroll.css({
			'height': $container.height() * $conScroll.height() / $contanr.outerHeight() + 'px'
		});
		$sroll.mousedown(function(e) {
			startY = e.clientY - this.offsetTop;
			this.setCapture && this.setCapture(); //避免IE下拖拽过快鼠标失去对象
			YN = true;

			return false;

		});
		$sroll.mousemove(function(e) {

			var maxVal = $conScroll.height() - $(this).height();

			if(YN) {
				lastY = e.clientY - startY;
				lastY = lastY < 0 ? 0 : lastY;
				lastY = lastY > maxVal ? maxVal : lastY;

				$(this).css({
					'top': lastY + 'px'
				});
				$contanr.css({
					'top': -$conScroll.height() * lastY / $(this).height() + 'px'
				});
				window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); // 防止拖动文本  
				e.stopPropagation();

			}

			return false;

		});

		$sroll.mouseup(function(e) {
			YN = false;
			NumY = lastY;

			return false;

		});
		//为内容区域添加滑轮滚动事件

		if($contanr[0].addEventListener) {
			$contanr[0].addEventListener('DOMMouseScroll', MouseScr, false); //兼容火狐。。。。。。。对，不是ie是火狐。
			$conScroll[0].addEventListener('DOMMouseScroll', MouseScr, false);

		}
		$contanr[0].onmousewheel = MouseScr;
		$conScroll[0].onmousewheel = MouseScr;

	}

}
(function() {

	var params = {
		scrollBox: '#scrollBox',
		scrollCont: '#scrollCont',
		scrollBarBox: '#scrollBarBox',
		scrollBar: '#scrollBar'

	}
	/*注意： .height()方法不计算padding在内 */

	if($(scrollCont).height() > $(scrollBox).height()) {
		$(scrollBar).css('visibility', 'visible');
		ScrollTop(params);

	} else {
		$(scrollBar).css('visibility', 'hidden');

	}

})();
})