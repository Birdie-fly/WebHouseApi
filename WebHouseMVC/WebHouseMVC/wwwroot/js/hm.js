

/*二级菜单选中字体变色*/
$(".two-navs").on("click", ".two-nav-a", function() {
	var index = $(".two-navs .two-nav-a").index(this);
	$(".two-navs .two-nav-a").removeClass("lvcolor");
	$(".two-navs .two-nav-a").eq(index).addClass("lvcolor");
	var smalTit = $(".two-navs .two-nav-a").eq(index).text()
	$(".small-title").text("--" + smalTit);

})