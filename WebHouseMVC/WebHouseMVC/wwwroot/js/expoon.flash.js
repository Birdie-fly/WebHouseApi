//北京世纪网展科技有限公司
var ua = navigator.userAgent.toLowerCase();
var isIE = ua.indexOf("msie") > -1;
var browserVersion = 100;
if (isIE) { browserVersion = ua.match(/msie ([\d.]+)/)[1]; }
var noHtml5 = browserVersion <= 9.0;
var showCommentHotspotAjax;
var commpage = 1,totalpage = 1,commtype = true;
var nowReferrer = document.referrer;//获取来源
var panoUrl       =  window.location.href;//获取当前url
/*说一说*/
function showComment(){
	var lantype = krpano.get("config.config_settings.lan");
	krpano.call("pauseRotate()");
	krpano.set("layer[commentIcon].showed",true)
	if(krpano.get("layer[commentIcon].opened") == "false"){
		krpano.call("restoreCommentHotspot()");
	};
	krpano.set("layer[hideBtn].opened",false);
	if(lantype == "2"){
		krpano.set("layer[hideBtn].html","hide");
	}else{
		krpano.set("layer[hideBtn].html","隐藏");
	}

	krpano.call("hideAll()");
	var w = 410;
	var h = 192;

	if(krpano.get("device.desktop")){
		var commtip = "点击进行微信授权后，就可以发表说一说";
		var authorizeStatus = false;
		if(weixin_openid != ""){
			authorizeStatus = true;
			commtip="说点什么吧！";
		}

		if(krpano.get("device.flash")){
			krpano.set("layer[comment_hotspot_Mask].visible","true");
			var openhtml="<div id='iframeBox' style='position:absolute;left:50%;bottom:100px;z-index: 9001; visibility: visible; opacity: 1;margin-left:-"+(w/2)+"px;width:"+w+"px;height:"+h+"px;background-color:#000;-webkit-user-select: none;pointer-events: none;'>"
			openhtml += "<iframe name='panoramaPlugin' frameborder='0' src='//s.expoon.com/test/krpano/html/blank.html' width='100%' height='100%' style='background:url(//s.expoon.com/test/krpano/images/fbloader.gif) no-repeat center center #000;' allowtransparency='true'></iframe>";
			openhtml += "</div>";
			$("body").append(openhtml);
		}
		var commenthtml = "";
		
		var thisw = w-30;
		commenthtml += "<div class='commentBox' style='position:absolute;left:50%;bottom:100px;z-index: 9002; visibility: visible; opacity: 1;margin-left:-"+(w/2)+"px;width:"+thisw+"px;height:"+h+"px;'><h4>说一说</h4>";
		
		commenthtml += "<textarea name='comment' id='usercomm' maxlength='30' placeholder='"+commtip+"' disabled='disabled'></textarea>";
		commenthtml += "<div class='commentbtn'><span onclick='cancleCommentBox();'>取&nbsp;消</span>";
		if(authorizeStatus){
			commenthtml += "<span onclick='sumbitComment()'>发&nbsp;表</span>";
		}else{
			commenthtml += "<span style='cursor:not-allowed;background-color:#aaaaaa;'>发&nbsp;表</span>";
		}
		commenthtml += "<i onclick='hideCommentHotspot()'>隐藏</i>";
		if(totalpage > 1){
			commenthtml += "<i class='changeComment' onclick='changeCommentHotspot()'>换一换</i></div>";
		}else{
			commenthtml += "<i class='changeComment off' onclick='changeCommentHotspot()'>换一换</i></div>";
		}
		commenthtml += "</div>";
		$("body").append(commenthtml);
		if(lantype == "2"){
			$(".commentBox h4").html("Comments");
			if(authorizeStatus){
				$("#usercomm").attr("placeholder","Publish content");
			}else{
				$("#usercomm").attr("placeholder","WeChat authorized, you can publish content");
			}
			$(".commentBox .commentbtn i").html("hide");
			$(".commentBox .commentbtn i.changeComment").html("change");
			$(".commentBox .commentbtn span").html("Release");
			$(".commentBox .commentbtn span:eq(0)").html("cancel");
		}
		if(!(authorizeStatus)){
			$("#usercomm").removeAttr("disabled");
			$("#usercomm").focus(function(){
				$(this).blur();
				var scenename=krpano.get("xml.scene");
				var back_path= document.location.protocol+"//" + location.host + "/"+hrefinfo+"/panorama?sn="+scenename;
				back_path = encodeURIComponent(back_path);
				window.location.href="/index.php/WeixinLogin/by_open_platform?go_back="+back_path;
			});
		}else{
			$("#usercomm").focus(function(){
				if($(this).html() == "说点什么吧！" || $(this).html() == "Publish content"){
					$(this).html("");
				}
			});
		}
	}else{
		 var commtip = "使用微信浏览即可发表说一说！";
		 var commtype = "disabled";
		 var ua = navigator.userAgent.toLowerCase();  
		 var isWeixin = false;
		 var authorizeStatus = false;
		 if(ua.match(/MicroMessenger/i)=="micromessenger"){
			isWeixin = true;
			commtype = "";
			if(weixin_openid != ""){
				authorizeStatus = true;
				commtip="说点什么吧！";
			}else{
				commtip = "点击进行微信授权后，就可以发表说一说";
			}
		 }

		var commenthtml = "";
		commenthtml += "<div class='commentWapBox'>";
		commenthtml += "<textarea name='comment' id='usercomm' maxlength='30' placeholder='"+commtip+"' disabled='"+commtype+"'></textarea>";
		commenthtml += "<div class='commentbtn'><span onclick='cancleCommentBox()'>取&nbsp;消</span>";
		if(authorizeStatus){
			commenthtml += "<span onclick='sumbitComment()'>发&nbsp;表</span>";
		}else{
			commenthtml += "<span style='cursor:not-allowed;background-color:#aaaaaa;'>发&nbsp;表</span>";
		}
		commenthtml += "<i onclick='hideCommentHotspot()'>隐藏</i>";
		if(totalpage > 1){
			commenthtml += "<i class='changeComment' onclick='changeCommentHotspot()'>换一换</i></div>";
		}else{
			commenthtml += "<i class='changeComment off' onclick='changeCommentHotspot()'>换一换</i></div>";
		}
		commenthtml += "</div>";
		$("body").append(commenthtml);
		if(lantype == "2"){
			if(isWeixin){
				$("#usercomm").attr("placeholder","Using WeChat browser can comment");
			}else{
				if(authorizeStatus){
					$("#usercomm").attr("placeholder","Publish content");
				}else{
					$("#usercomm").attr("placeholder","WeChat authorized, you can publish content");
				}
			}
			$(".commentWapBox .commentbtn i").html("hide");
			$(".commentWapBox .commentbtn i.changeComment").html("change").css("margin-left","7px");
			$(".commentWapBox .commentbtn span").html("Release");
			$(".commentWapBox .commentbtn span:eq(0)").html("cancel");
		}
		if(!(authorizeStatus) && isWeixin){
			$("#usercomm").removeAttr("disabled");
			$("#usercomm").focus(function(){
				$(this).blur();
				var scenename=krpano.get("xml.scene");
				var back_path=document.location.protocol+"//" + location.host + "/"+hrefinfo+"/panorama?sn="+scenename;
				back_path = encodeURIComponent(back_path);
				window.open("/index.php/WeixinLogin/wx_index?go_back="+back_path+"");
			});
		}
	}
	if(authorizeStatus){
		user_headimg = window.location.protocol+user_headimg;
		$("#usercomm").removeAttr("disabled");
		krpano.call("addCommentHotspot("+user_headimg+")");
		var $usercomm = document.getElementById("usercomm");
		
		$('#usercomm').bind('input propertychange', function() {
			changeCommContent();
		});

		function changeCommContent(){
			var thisval = $usercomm.value;
			krpano.call("changeCommContent("+thisval+")");
		}
	}
	easeFun();
	krpano.call("set(layer[searchSceneIcon].visible,true)");
		krpano.call("ambitusCloseFun()");
}

function sumbitComment(){
	var lantype = krpano.get("config.config_settings.lan");
	krpano.set("layer[commentIcon].crop","400|200|100|100");
	krpano.set("layer[submitIng].visible","true");
	krpano.set("layer[submitIngTxt].visible","true");
	if(lantype == "2"){
		krpano.set("layer[submitIngTxt].html","submitting, please wait...");
	}else{
		krpano.set("layer[submitIngTxt].html","正在提交中，请稍后...");
	}
	$("#iframeBox,.commentBox,.commentWapBox").hide();
	krpano.set("layer[comment_hotspot_Mask].visible","false");
	var sceneId = krpano.get("xml.scene").replace("scene","");
	var nowtotal = parseInt(krpano.get("layer[commentIcon].totalcount"));
	var ath = encodeURI(krpano.get("hotspot[comment_newspot].ath"));
	var atv = encodeURI(krpano.get("hotspot[comment_newspot].atv"));
	var usercontent =encodeURI($("#usercomm").val());
	$("#usercomm").val('');
	$.ajax({
	  type: 'GET',
	  url: "/panorama/talk_byajax/"+user_id+"/"+sceneId+"",
	  data:{"talk_content":usercontent,"latitude":ath,"longitude":atv},
	  dataType: "jsonp",
	  success: function(dataResult){
		if(dataResult.status == "success"){
			var usermess = dataResult.cont.talk_content;
			var userpic = dataResult.cont.headerimg;
			var this_ath = dataResult.cont.latitude;
			var this_atv = dataResult.cont.longitude;
			userpic = userpic.replace("http://f.expoon.com","//f.expoon.com");
			userpic = window.location.protocol+userpic;
			krpano.call("showCommentHotspot("+nowtotal+","+this_ath+","+this_atv+","+userpic+","+usermess+")");
			krpano.set("layer[submitIngTxt].html","发表成功！");
			cancleCommentBox();
			krpano.call("hideSubmitIng()");
			nowtotal = nowtotal+1;
			krpano.set("layer[commentIcon].totalcount",""+nowtotal+"");
		}else{
			if(lantype == "2"){
				krpano.set("layer[submitIngTxt].html","submit failure, please fill out the complete content");
			}else{
				krpano.set("layer[submitIngTxt].html","提交失败，"+dataResult.value+"");
			}
			setTimeout(function(){
				krpano.call("hideSubmitIng()");
				if(lantype == "2"){
					krpano.set("hotspot[comment_newspot_txt].html","Drag the image to want to comment on location");
				}else{
					krpano.set("hotspot[comment_newspot_txt].html","拖动头像到想要评论的位置");
				}
				$("#iframeBox,.commentBox,.commentWapBox").show();
				krpano.set("layer[comment_hotspot_Mask].visible","true");
			},1000);
		}
	  }
	});
}

function hideCommentHotspot(){
	var lantype = krpano.get("config.config_settings.lan");
	krpano.call("hideCommentHotspot()");
	krpano.set("layer[commentBtn].visible","false");
	krpano.set("layer[commentBtn].x","-140");

	krpano.set("layer[hideBtn].opened",true);
	if(lantype == 2){
		krpano.set("layer[hideBtn].html","show");
	}else{
		krpano.set("layer[hideBtn].html","显示");
	}
		krpano.call("ambitusCloseFun()");
}

function closeCommentBox(){
	$("#iframeBox,.commentBox,.commentWapBox").remove();
	krpano.set("layer[comment_hotspot_Mask].visible","false");
	krpano.call("showAll()");
	krpano.set("layer[commentIcon].showed",false);
	krpano.call("resumeRotate()");
}

function cancleCommentBox(){
	closeCommentBox();
	krpano.call("removeNewspot()");

	krpano.set("layer[commentIcon].crop","400|200|100|100");
	krpano.set("layer[commentBtn].visible","false");
	krpano.set("layer[commentBtn].x","-140");
	krpano.call("ambitusCloseFun()");
}

function showCommentHotspot(user_id,scenename,sceneType){
	 var sceneId = scenename.replace("scene","");
	 var showNum = 20;
	 krpano.get("device.desktop") ? showNum = 20 : showNum = 10;
	 showCommentHotspotAjax = $.ajax({
	  type: 'GET',
	  url: "/panorama/get_talk_byajax/"+user_id+"/"+sceneId+"?limit="+showNum+"&sencetype="+sceneType+"",
	  data:{p:commpage},
	  dataType: "jsonp",
	  success: function(dataResult){
		var totalcount = dataResult.total;
		totalpage = Math.ceil(totalcount/showNum);
		if(totalpage <= 1){
			krpano.set("layer[changeBtn].css","color:#7d7d7d;");
			krpano.set("layer[changeBtn].onover",null);
			krpano.set("layer[changeBtn].onout",null);
			krpano.set("layer[changeBtn].handcursor","false");
		}else{
			krpano.set("layer[changeBtn].css","color:#444444;");
			krpano.set("layer[changeBtn].onover","set(css,'color:#ffffff;');");
			krpano.set("layer[changeBtn].onout","set(css,'color:#444444;');");
			krpano.set("layer[changeBtn].handcursor","true");
		}
		var commdata = dataResult.talk_content;
		var commcount = 0;
		if(commdata != null){
			commdata.reverse();
			commcount = commdata.length;
			krpano.set("layer[commentIcon].totalcount",""+commcount+"");
			$.each(commdata,function(i,item){
				var userpic = item.user_img;
				userpic = userpic.replace("http://f.expoon.com","//f.expoon.com");
				userpic = pageprotocol+userpic;
				var usercontent = item.talk_cont;
				var ath = item.latitude;
				var atv = item.longitude;
				if(ath == null){ ath = Math.random() * 360; };
				if(atv == null){ atv = Math.random() * 180 - 90; };
				krpano.call("showCommentHotspot("+i+","+ath+","+atv+","+userpic+","+usercontent+")");
			});
		}
		commtype = true;
	  }
	});
}

function abortCommentHotspot(){
	commpage = 1;
	totalpage = 1;
	showCommentHotspotAjax.abort();
}

function changeCommentHotspot(){
	if(!($(".commentBox .commentbtn i.changeComment,.commentWapBox .commentbtn i.changeComment").hasClass("off"))){
		if(commtype){
			commpage++;
			if(commpage > totalpage){
				commpage = 1; 
			}
			krpano.call("changeCommentHotspot()");
			commtype = false;
		}
	}
}

function changeCh(){
	if(totalpage > 1){
		changeCommentHotspot();
	}
}

function is_weixn(){  
	var ua = navigator.userAgent.toLowerCase();  
	if(ua.match(/MicroMessenger/i)=="micromessenger") {  
		return true;  
	} else {  
		return false;  
	}  
}  

function statisticalBooth(){
	if(is_weixn()){
		var oDate = new Date();
		var str = oDate.getFullYear()+"-"+(oDate.getMonth()+1)+"-"+oDate.getDate();
		if(localStorage[user_id]){
			if(localStorage[user_id] != str){
				localStorage[user_id] = str;
				$.ajax({
					type: 'GET',
					url: "/Z/Index/panoramaStatistics?pid="+user_id+"&referer="+encodeURI(document.referrer)+"&is_wx_explore=1",
					dataType: "jsonp",
					success: function(dataResult){
					}
				});
			}else{
				$.ajax({
					type: 'GET',
					url: "/Z/Index/panoramaStatistics?pid="+user_id+"&referer="+encodeURI(document.referrer)+"&is_wx_explore=0",
					dataType: "jsonp",
					success: function(dataResult){
					}
				});
			}
		}else{
			localStorage[user_id] = str;
			$.ajax({
				type: 'GET',
				url: "/Z/Index/panoramaStatistics?pid="+user_id+"&referer="+encodeURI(document.referrer)+"&is_wx_explore=1",
				dataType: "jsonp",
				success: function(dataResult){
				}
			});
		}
	}else{
		$.ajax({
			type: 'GET',
			url: "/Z/Index/panoramaStatistics?pid="+user_id+"&referer="+encodeURI(document.referrer)+"&is_wx_explore=0",
			dataType: "jsonp",
			success: function(dataResult){
			}
		});
	}
}

function statisticalScene(){
	 var sceneId = krpano.get("xml.scene").replace("scene","");
	 $.ajax({
	  type: 'GET',
	  url: "/Z/Index/sceneStatistics?pid="+user_id+"&sid="+sceneId+"",
	  dataType: "jsonp",
	  success: function(dataResult){
	  }
	});
}

function getBookImgList(bookArr,w,h,isMobile,userId,bookId,title,title2){
	// 处理api showBook() 新老版数据传值不定情况。
	var t = "";
	title2 ? t = title2 : t = title;
	//var imgArr=replaceAll(bookArr);
	var imgArr=replaceAllprotocol(bookArr);
	if(imgArr != "no"){
		imgArr = pageprotocol+imgArr;
	};
	krpano.call("loadbookIframe("+imgArr+","+(parseInt(w)+248)+","+(parseInt(h)+30)+","+isMobile+","+userId+","+bookId+","+encodeURI(t)+")");
}

function getBookImgMobileList(bookArr_h,bookArr_v,w,h,bookId){
	//var imgArr_h=replaceAll(bookArr_h);
	//var imgArr_v=replaceAll(bookArr_v);
	var imgArr_h=replaceAllprotocol(bookArr_h);
	if(imgArr_h != "no"){
		imgArr_h = pageprotocol+imgArr_h;
	};
	var imgArr_v=replaceAllprotocol(bookArr_v);
	if(imgArr_v != "no"){
		imgArr_v = pageprotocol+imgArr_v;
	};
	krpano.call("loadbookIframe("+imgArr_h+","+w+","+h+","+imgArr_v+","+bookId+")");
}

// 转意符换成普通字符
function escape2Html(str) {
	var arrEntities = {'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
	return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
}

function showLink(linkarr){
	linkarr=replaceAll(linkarr);
	krpano.call("showLink("+linkarr+")");
}
function openIframe(thisw,thish,path,type){
	var w = parseInt(thisw);
	var h = parseInt(thish);
	if(type == "0"){
		w = parseInt(thisw) - 248;
	};
	if(type == "0"){
		var openhtml="<div id='bookIframe' style='position:absolute;left:50%;top:50%;z-index: 9001; visibility: visible; opacity: 1;margin-left:-"+(w/2)+"px;margin-top:-"+(h/2)+"px;width:"+w+"px;height:"+h+"px;background-color:#fff;'>"
	}else if(type == "order"){
		var openhtml="<div id='orderBoxFlash' style='position:absolute;left:50%;top:50%;z-index: 9001; visibility: visible; opacity: 1;margin-left:-"+(w/2)+"px;margin-top:-"+(h/2)+"px;width:"+w+"px;height:"+h+"px;background-color:#fff;'>"
	}else if(type == "productInfo"){
		krpano.call("jsWhiteMask()");
		var openhtml="<div id='iframeBoxPoint' style='position:absolute;left:50%;top:50%;z-index: 9001; visibility: visible; opacity: 1;margin-left:-"+(w/2)+"px;margin-top:-"+(h/2)+"px;width:"+w+"px;height:"+h+"px;background-color:#fff;'>"
	} else if (type === "bgTransparent"){
		// iframe背景透明
		var openhtml="<div id='iframeBoxFlash' style='position:absolute;left:50%;top:50%;z-index: 9001; visibility: visible; opacity: 1;margin-left:-"+(w/2)+"px;margin-top:-"+(h/2)+"px;width:"+w+"px;height:"+h+"px;'>"
	}else{
		var openhtml="<div id='iframeBoxFlash' style='position:absolute;left:50%;top:50%;z-index: 9001; visibility: visible; opacity: 1;margin-left:-"+(w/2)+"px;margin-top:-"+(h/2)+"px;width:"+w+"px;height:"+h+"px;background-color:#fff;'>"
	}
	openhtml += "<iframe name='panoramaPlugin' id='iframeBox' frameborder='0' scrolling='no' src='"+path+"' width='"+w+"' height='"+thish+"' style='background:url(//s.expoon.com/test/krpano/images/fbloader.gif) no-repeat center center #fff;' allowtransparency='true'></iframe>";
	openhtml += "</div>";
	$("body").append(openhtml);

	$('iframe[name="panoramaPlugin"]').one('load', function(){
		$(this).css({
			'background': 'transparent'
		});
	});
}

function closeIframe(){
	$("#iframeBox,#iframeBoxFlash,#weixinLayer,#infoWapPopup,#bookIframe,.xkyAppShareBox").remove();
	if( $('.payPageBox .paySuccessBtn').size() > 0 ) {
		$('.payPageBox .paySuccessBtn').click();
	}
}

function iframeShareFun(){
	var iframeOpenSiteUrlStatus = self.location.search.indexOf("iframeopensite=false");
	if(top.location != self.location && (iframeOpenSiteUrlStatus < 0) && krpano.get("device.desktop")){
		krpano.set("layer[keepInfo].iframeType",true);
		krpano.call("setIframeNav()");
	}
}

function replaceAll(str){
	if(str!=null){
		str = str.replace(/,/g,"&");
		return str;
	}
}

function replaceAllprotocol(str){
	if(str!=null){
		var thistxt = "&"+pageprotocol;
		str = str.replace(/,/g,thistxt);
		return str;
	}
}

function gotoOtherBooth(bid,sid,dir){
	if(bid.indexOf("e/") > -1){
		krpano.call("openurl(//" + location.host + "/"+bid+"/panorama/"+sid+",_self)");
	}else{
		krpano.call("openurl(//" + location.host + "/"+bid+"/panorama/"+sid+"/"+dir+",_self)");
	}
}

function isIframeMark(){
	if(self!=top){
		if(findSame(all_domain,refererHostDomain)){
			return true;
		}else{
			for(var i=0; i<all_domain.length; i++){
				if(all_domain[i].split('.').length == 2){
					all_domain[i] = '.'+all_domain[i];
				}else{
					all_domain[i] = '.'+all_domain[i].split('.')[1]+'.'+all_domain[i].split('.')[2];
				}
				if(refererHostDomain.indexOf(all_domain[i]) != -1){
					return true;
				}
			}
		}
		return false;
	}
}

function iframeMark(){
	if(self!=top){
		if(!isIframeMark()){
			krpano.set("layer[iframeMark].visible","true");
			krpano.set("layer[iframeMark].onclick","openurl("+shareDoMainUrl+"/"+hrefinfo+")");
		}
	}
}

function addCard(user_id,logo_url,g_id,s_id,box_type){
	var winH = $(window).height()*0.8;
	var winW = $(window).width()*0.85;
	$('body').append('<div style="width:'+winW+'px;height:'+winH+'px;background:#fff;z-index:999999999;position:absolute;left:50%;top:50%;margin-left:'+(winW/-2)+'px;margin-top:'+(winH/-2)+'px;" id="pluginBox" class="mobileBox"><div class="pluginBox"></div></div>');

	var userId = user_id;
	var logoUrl = logo_url; 
	var gid = g_id;
	var sid = s_id;
	var type = box_type;

	var cardData = boothCard;
	var weixinImg = "//f.expoon.com/user/Qr/"+(parseInt(userId)%100)+"/"+userId+".png";
	var groupCardData = groupCard[gid];
	var sceneCardData = sceneCard[sid];
	if((groupCardData != undefined) && (groupCardData.is_show !== "n")){
		cardData = groupCardData;
		weixinImg = "//f.expoon.com/user/groupQr/"+(parseInt(userId)%100)+"/"+userId+"/"+gid+".png";
	};
	if((sceneCardData != undefined) && (sceneCardData.is_show !== "n")){
		cardData = sceneCardData;
		weixinImg = "//f.expoon.com/user/panoramaQr/"+(parseInt(userId)%100)+"/"+userId+"/"+sid+".png";
	}

	var name = cardData.c_name;//公司名称
	var phone = cardData.c_phone;//联系电话
	var email = cardData.c_email;//email
	var address = cardData.c_address;//公司地址
	var weiboname = cardData.c_weiboname;//微博名称
	var weibourl = cardData.c_weibourl;//微博链接地址
	var wechat = cardData.c_wechat;//企业微信公众账号
	var qq = cardData.c_qq;//qq号码
	var remark = cardData.c_remarks;//备注

	var cardList ="";
	if(type == 0){
		cardList += "<div class='cardLogo'><img src='"+logoUrl+"' /></div><div class='cardContent'>";
		if(weixinImg !="" && weixinImg != null){
			cardList += "<div class='weixinImg'><img src='"+weixinImg+"' /></div>";
		}
		cardList += "<div class='cardList'><div class='card'><h4>"+name+"</h4><p class='phone'>"+phone+"</p><p class='email'><a href='mailto:"+email+"'>"+email+"</a></p><p class='address'>"+address+"</p>";
	}else{
		if(weixinImg !="" && weixinImg != null){
			cardList += "<div class='weixinImg'><img src='"+weixinImg+"' /></div>";
		}
		cardList += "<div class='cardList'><div class='card'><h4>"+name+"</h4><p class='comphone'><a href='tel:"+phone+"'>"+phone+"</a></p><p class='email'><a href='mailto:"+email+"'>"+email+"</a></p><p class='address'>"+address+"</p>";
	}
	if(weiboname !="" && weiboname != null){
		cardList += "<p class='weiboname'><a href='"+weibourl+"' target='_blank' style='text-decoration: underline;'>"+weiboname+"</a>&nbsp;<img src='//s.expoon.com/image/z/sjmynew/v-icon.gif' width='12' height='11' /></p>";
	};
	if(wechat !="" && wechat != null){
		if(lantype == "2"){
			cardList += "<p class='wechat'>Enterprise WeChat public account:"+wechat+"</p>";
		}else{
			cardList += "<p class='wechat'>企业微信公众账号："+wechat+"</p>";
		}
	}
	if(qq !="" && qq != null){
		cardList += "<p class='qq'>"+qq+"</p>";
	}
	cardList += "</div></div><div class='clearfloat'></div></div>";
	if(remark !="" && remark != null){
		cardList += "<div class='remark'><span>备注：</span><div class='remarkInfo'><p>"+remark+"</p></div><div class='clearfloat'></div></div>";
	}
	$(".pluginBox").append(cardList);
	var lantype = krpano.get("config.config_settings.lan");
	if(lantype == "2"){
		$(".remark span").html("descr:");
	}
	if(type == 0){
		var box_top = (parseInt($(".weixinImg").height()) - parseInt($(".cardList").height()))/2;
		$(".cardList").css({"margin-top":box_top+"px"});
	}

	document.querySelector('#pluginBox').addEventListener('touchmove', function(ev){
		if($('#pluginBox').height() > $('.pluginBox').height()){
			event.preventDefault();
		}else{
			if($('#pluginBox').scrollTop() <= 1){
				$('#pluginBox').scrollTop(1);
			}
		}
	} ,false);
}

function removeCardDate(){
	$('#pluginBox').remove();
}

function showWeixin(path){
	var lantype = krpano.get("config.config_settings.lan");
	if(lantype == "2"){
		var weixinTip = "Save the pictures ,<br/>follow the Wechat public number";
		if(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)=="micromessenger"){
			weixinTip = "Long press images can identify the qr code";
		};
		$("body").append("<div id='weixinLayer'><div class='weixinLayer'><span></span><img src='"+path+"' align='absmiddle' onselectstart='return false' /></div><p>"+weixinTip+"</p></div>");
		$('#weixinLayer p').css({'height':'auto','line-height':'40px'})
	}else{
		var weixinTip = "保存图片至相册，使用微信扫一扫识别";
		if(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)=="micromessenger"){
			weixinTip = "长按识别二维码";
		};
		$("body").append("<div id='weixinLayer'><div class='weixinLayer'><span></span><img src='"+path+"' align='absmiddle' alt='企业二维码' onselectstart='return false' /></div><p>"+weixinTip+"</p></div>");
	}
}

function closeTopBookLayer(){
	krpano.call("closeLayer()");
}

function moblieData(){
	var navCount = krpano.get("navdata.nav.count");
	var arr = [];
	for(var i=0; i<navCount; i++){
		if(krpano.get("navdata.nav["+i+"].share") == "on"){
			arr.push({"value":krpano.get("navdata.nav["+i+"].value"),"link":krpano.get("navdata.nav["+i+"].content")});
		}
	}
	
	return arr;
}

function isMobileNav(){
	var navId = krpano.get("config.config_settings.navId");

	if(navId){
		var arr = moblieData(); 
		if(arr.length > 0){
			krpano.set("layer[navIcon].visible","true");
		}
	}
}

function showMobileNav(){
	var arr = moblieData(); 

	if(arr.length == 1){
		krpano.call("openurl("+arr[0].link+")");
	}else{
		krpano.set("layer[mobibleLinkNav].visible","true");
		krpano.set("layer[mobileNavMask].visible","true");
		krpano.set("layer[closeMobileNavBlackMask].visible","true");
		krpano.set("layer[mobibleLinkNav].y",krpano.get("layer[keepInfo].maskLayerCloseHeight"));
		for(var i=0; i<arr.length; i++){
			krpano.call("addlayer(mobibleLinkNav"+i+");");
			krpano.set("layer[mobibleLinkNav"+i+"].parent","mobibleLinkNav");
			krpano.call("layer[mobibleLinkNav"+i+"].loadstyle(linkTxt);");
			krpano.set("layer[mobibleLinkNav"+i+"].y",i*50);
			krpano.set("layer[mobibleLinkNav"+i+"].onclick","openurl("+arr[i].link+")");
			krpano.set("layer[mobibleLinkNav"+i+"].html",arr[i].value);
		}
	}
}

function closePointInfo(){
	krpano.call("closePointInfo();");
}

var dy;
var typeObj=navigator.userAgent.indexOf('Android') > -1;

function preventDefaultStart(e){
	dy = e.pageY;
	if(typeObj){
		dy = e.changedTouches[0].pageY;
	}
}

function preventDefaultMove(e){
	if($("#infoWapPopup").is(":visible")){
		var $this = $("#infoWapPopup");
		var $thisContent = $("#infoWapPopupContent");
		var scrollHeight = $thisContent.get(0).scrollHeight + 82;
		var move_dy =e.pageY-dy;
		if(typeObj){
			move_dy = e.changedTouches[0].pageY - dy;
		}
		var scrollTop = $this.scrollTop();
		//var scrollHeight = parseInt($thisContent.height())+50;
		var height = parseInt($this.get(0).clientHeight);
		var delta = move_dy;    
		//最大
		if((scrollTop >= (scrollHeight - height)) && (move_dy < 0)){
			 e.preventDefault();
		}
		//最小
		if((scrollTop == 0) && (move_dy > 0)){
			 e.preventDefault();
		}
	}
	if($("#wapExpoonActivity").is(":visible")){
		var $this = $("#wapExpoonActivity");
		var $thisContent = $(".wapExpoonActivity");
		var scrollHeight = $thisContent.get(0).scrollHeight+30;
		var move_dy =e.pageY-dy;
		if(typeObj){
			move_dy = e.changedTouches[0].pageY - dy;
		}
		var scrollTop = $this.scrollTop();
		var height = parseInt($this.get(0).clientHeight);
		//最大
		if((scrollTop >= (scrollHeight - height)) && (move_dy < 0)){
			 e.preventDefault();
		}
		//最小
		if((scrollTop == 0) && (move_dy > 0)){
			 e.preventDefault();
		}
	}
}

function isParent(obj,parentObj){ 
	while (obj != undefined && obj != null && obj.tagName.toUpperCase() != 'BODY'){ 
		if (obj == parentObj){ 
			return true; 
		} 
		obj = obj.parentNode; 
	} 
	return false; 
}

if(browserR == "phone"){
	document.addEventListener("touchstart", preventDefaultStart, false);  
	document.addEventListener("touchmove", preventDefaultMove, false);  
}
//智播音频
var zbMusic = "",zbSpeak = "",zbAudioLoad=true;
var zb_audio_arr = [],now_mid="",now_sid="",this_time=0;
function loadZbAudio(){
	var audiohtml = "";
	audiohtml += "<audio id='zbMusic' src='//s.expoon.com/image/z/three/images/empty.mp3' preload='true' autoplay='true' ></audio>";
	audiohtml += "<audio id='zbSpeak' src='//s.expoon.com/image/z/three/images/empty.mp3' preload='true'  autoplay='true' ></audio>";
	$("body").append(audiohtml);
	zbMusic = document.getElementById("zbMusic");
	zbSpeak = document.getElementById("zbSpeak");
	zbMusic.muted = true;
	zbSpeak.muted = true;
}
function loadStartZbAudio(mpath,spath,mid,sid){
	if(mpath != "null"){
		krpano.call("preloadsound("+mpath+");");
		zbMusic.setAttribute("src",""+mpath+"");
		zbMusic.setAttribute("mid",""+mid+"");
	}
	if(spath != "null"){
		krpano.call("preloadsound("+spath+");");
		zbSpeak.setAttribute("src",""+spath+"");
		zbSpeak.setAttribute("sid",""+sid+"");
	}
}
function startZbAudio(){
	var zbPlay = krpano.get("zbPlay");
	var pausecrop = krpano.get("layer[zhiboPause].crop");
	var pausetype = (pausecrop != "55|0|55|55");
	zbMusic.play();
	zbSpeak.play();
}
function removeZbAudio(){
	zbMusic.muted = true;
	zbSpeak.muted = true;
	zbMusic.setAttribute("src","//s.expoon.com/image/z/three/images/empty.mp3");
	zbSpeak.setAttribute("src","//s.expoon.com/image/z/three/images/empty.mp3");
	zbMusic.pause();
	zbSpeak.pause();
}
function playZbsound(type,path,id){
	switch (type){
		case "zbmusic":
			var mcrop = krpano.get("layer[zhiboMusic].crop");
			var mtype = (mcrop == "0|110|55|55");
			zbMusic.setAttribute("src",""+path+"");
			zbMusic.setAttribute("mid",""+id+"");
			zbMusic.play();
			if(mtype){
				zbMusic.muted = false;
			};
			break;
		case "zbspeak":
			var scrop = krpano.get("layer[zhiboSpeack].crop");
			var stype = (scrop == "55|110|55|55");
			zbSpeak.setAttribute("src",""+path+"");
			zbSpeak.setAttribute("sid",""+id+"");
			zbSpeak.play();
			if(stype){
				zbSpeak.muted = false;
			};
			break;
	}
}
function pauseZbsound(type){
	switch (type){
		case "zbmusic":
			zbMusic.pause();
			break;
		case "zbspeak":
			zbSpeak.pause();
			break;
	}
}
function resumeZbsound(type){
	var msrc = $("#zbMusic").attr("src");
	var ssrc = $("#zbSpeak").attr("src");
	switch (type){
		case "zbmusic":
			if(msrc != "null"){
				zbMusic.play();
			};
			break;
		case "zbspeak":
			if(ssrc != "null"){
				zbSpeak.play();
			};
			break;
	}
}
function mutedZbAudio(type,staus){
	var now_staus = false;
	if(staus == "0"){
		now_staus = true;
	}
	switch (type){
		case "zbmusic":
			zbMusic.muted = now_staus;
			break;
		case "zbspeak":
			zbSpeak.muted = now_staus;
			break;
	}
}
function setZbAudio(zbname,zbindex){
	var $zbaudio = zb_audio_arr[zbindex];
	var mid = $zbaudio.mid;
	var sid = $zbaudio.sid;
	var ptime = parseFloat($zbaudio.ptime);
	var this_mid = $("#zbMusic").attr("mid");
	var this_sid = $("#zbSpeak").attr("sid");
	if(mid){
		if(this_mid == mid && ptime !== 0){
			if(!(zbMusic.ended)){
				resumeZbsound("zbmusic");
			}
		}else{
			if(krpano.get("resumeZbAudio") == "true"){
				resumeZbsound("zbmusic");
				krpano.set("resumeZbAudio","false");
			}else{
				var this_mpath = krpano.get("audiodata.musicdata.music[music_"+mid+"].content");
				this_mpath = this_mpath.replace("f.expoon.com","f-media.expoon.com");
				playZbsound("zbmusic",this_mpath,mid);
			}
		}
		if(krpano.get("gotoZbAnimate_type") == "true"){
			//zbMusic.duration
			zbMusic.currentTime = ptime;
			krpano.set("gotoZbAnimate_type","false");
		}
	}else{
		zbMusic.pause();
	}
	if(sid){
		if(this_sid == sid && ptime !== 0){
			if(!(zbSpeak.ended)){
				resumeZbsound("zbspeak");
			}
		}else{
			if(krpano.get("resumeZbAudio") == "true"){
				resumeZbsound("zbspeak");
				krpano.set("resumeZbAudio","false");
			}else{
				var this_spath = krpano.get("audiodata.speakdata.speak[speak_"+sid+"].content");
				this_spath = this_spath.replace("f.expoon.com","f-media.expoon.com");
				playZbsound("zbspeak",this_spath,sid);
			}
		}
		if(krpano.get("gotoZbAnimate_type") == "true"){
			zbSpeak.currentTime = ptime;
			krpano.set("gotoZbAnimate_type","false");
		}
	}else{
		zbSpeak.pause();
	}
}
function getZbAudioInfo(zbname,zbindex){
	var zb_audio_info_arr = {};
	var this_name = krpano.get("zbdata.zb["+zbname+"].zbp["+zbindex+"].name");
	var this_mid = krpano.get("zbdata.zb["+zbname+"].zbp["+zbindex+"].mid");
	var this_sid = krpano.get("zbdata.zb["+zbname+"].zbp["+zbindex+"].sid");
	var this_ptime = parseFloat(krpano.get("zbdata.zb["+zbname+"].zbp["+zbindex+"].ptime"));
	var this_postpone = krpano.get("zbdata.zb["+zbname+"].zbp["+zbindex+"].postpone");
	if(this_mid){
		if(this_postpone == "1"){
			now_mid = this_mid;
		}else{
			now_mid = "";
		}
	}
	if(this_sid){
		if(this_postpone == "1"){
			now_sid = this_sid;
		}else{
			now_sid = "";
		}
	}
	if(this_mid || this_sid){
		this_time = 0;
	}
	if(now_mid){
		this_mid = now_mid;
	}
	if(now_sid){
		this_sid = now_sid;
	}
	zb_audio_info_arr.name = this_name;
	zb_audio_info_arr.mid = this_mid;
	zb_audio_info_arr.sid = this_sid;
	zb_audio_info_arr.ptime = this_time;
	zb_audio_arr.push(zb_audio_info_arr);
	if(now_mid || now_sid){
		this_time = this_time+this_ptime;//获取的为当前节点在整个智播流程中的时间节点
	}
}
//安卓视频
function setVideo(path){
	//1(22222);
	path = path.split("|");
	path = path[1];
	path = path.replace("f.expoon.com","f-media.expoon.com");
	$("body").append("<div style='position:absolute;left:0;right:0;top:0;bottom:0;z-index:9999; text-align:center;overflow:hidden;' id='videoLayer'><div style='position:absolute;z-index:2;left:0;right:0;top:0;bottom:0;'  ></div><div style='position:absolute;z-index:3;left:0px;right:0px;top:0px;bottom:0px;overflow:hidden;'><video id='video' src='"+path+"' controls='controls' style='position:absolute;z-index:3;left:0;right:0;top:0;bottom:0;margin:auto;display:none;max-width:100%;max-height:100%;overflow:hidden;' preload></video></div></div>")
	var $video = document.getElementById("video");
	
	$video.addEventListener('touchstart', function(e) {
		// 防止点透关闭
		e.stopPropagation();
	});

	$video.addEventListener("loadedmetadata", function () {
		$("#video").show();
		$("#video").get(0).play();
		$("#video").trigger("play");
	});
}
function removeVideo(){
	$("#video").get(0).pause();
	$("#video").trigger("pause");
	$("#videoLayer").remove();
	var rotatestaus = krpano.get("layer[autorotateIcon].opened");
	if(rotatestaus){
		krpano.set("autorotate.enabled",true);
	}
	krpano.call("resumeAudio()");
	krpano.call("closeLayer()");
}
$(function(){

	if(/iphone|android/i.test(navigator.userAgent)){
		$("body").on("touchstart","#videoLayer",function(){
			removeVideo();
		})
	}
	else{
		$("body").on("click","#videoLayer",function(){
			removeVideo();
		})
	}
})

function newsList(id){
	if(newsListJsonData){
		if(newsListJsonData[id]){
			$('#infoWapPopup h4').hide();
			var newsList = newsListJsonData[id];
			var html = "<ul class='newsList'>";

			for(var i=0; i<newsList.length; i++){
				html += "<li data-id='"+newsList[i].a_id+"' onclick='showlistCon("+id+","+newsList[i].a_id+")'>"+newsList[i].a_title+"</li>"
			}
			html += "</ul>";
		}else{
			var html = "<center>未添加新闻</center>";
		}
	}else{
		var html = "<center>未添加新闻</center>";
	}
	$('#infoWapPopupContent').append(html);
}

function showlistCon(id,aid){
	$("#infoWapPopup").remove();
	krpano.call("toggleNavNewsListMask(1)");
	krpano.call("showNewsListFn()");
	$('#infoWapPopup').css({
		'color':'#000',
		'padding':'0',
		'margin':'0 15px 15px',
		'background':'#fff'
	});
	$('#infoWapPopupContent').addClass('white');
	$('#infoWapPopupContent p').css('color','#000');
	$('#infoWapPopup h4').css({'height':'auto','line-height':'26px','padding':'15px 0'});
	var con = "";
	for(var i=0; i <newsListJsonData[id].length; i++){
		if(newsListJsonData[id][i]["a_id"] == aid){
			$("#infoWapPopup h4").html(newsListJsonData[id][i]["a_title"])
			$("#infoWapPopupContent").html(newsListJsonData[id][i]["a_content"])
		}
	}

	$("#infoWapPopup").attr('data-id',id);
}

function closeNewsCon(){
	var id = $("#infoWapPopup").attr('data-id');
	$("#infoWapPopup").remove();
	krpano.call("showNewsListFn("+id+")");
}

function closeMess(){
	krpano.call("closeNavMask()");
};

function bookPoint(type,val){
	switch(type){
		case 'product':
			krpano.call("showModel("+val+")");
			krpano.call('showBookPointMask()');
			$('iframe#book').css('opacity','0');
			$('#bookIframe').hide();
			break; 
		case 'info':
			krpano.call('showInfo('+val+')');
			krpano.call('showBookPointMask()');
			$('iframe#book').css('opacity','0');
			$('#bookIframe').hide();
			break;
		case 'link':
			showLink(val);
			break;
	}
}

function closeBookPointMask(){
	$('iframe#book').css('opacity','1');
	$('#bookIframe').show();
	$('#infoWapPopup').remove();
}

function closeFlashbook(){
	$("#iframeBoxFlash,#iframeBox").remove();
}

function closeWhiteIframe(){
	$("#orderBoxFlash,#iframeBoxPoint").remove();
}

function closePass(gid,sid){
	$("#iframeBoxFlash,#iframeBox").remove();
	krpano.call("closePass("+sid+");");
	if(localStorage.passGroup){
		var temp = localStorage.passGroup;
		temp += ','+groupId;
		localStorage.passGroup = temp;
	}else{
		localStorage.passGroup = groupId;
	}
}

function checkIsPass(gid){
	if(!gid.indexOf('group_')){
		groupId = gid.replace('group_','');
	}else{
		groupId = gid;
	}

	if(!localStorage.passGroup){
		return false;
	}

	var arr = localStorage.passGroup.split(',');
	for(var i=0; i<arr.length; i++){
		if(arr[i] == groupId){
			return true;
		}
	}
	return false;
}

function showPass(gid,scenename){
	var isPass = checkIsPass(gid);
	if(!isPass){
		krpano.call("showPass("+gid+","+scenename+");");
	}
}

function jumpScene(gid){
	krpano.call("jumpScene("+gid+");");
};

function gotoPassScene(gid,sid,pass){
	$.ajax({
		type: 'GET',
		url: "/index.php/Z/Index/validatePass",
		data:{"user_id":user_id,"visit_pass":pass},
		dataType: "jsonp",
		success: function(data){
			if(data.msg == "success"){
				closePass(gid,sid);
			}else{
				if(krpano.get("device.html5")){
					krpano.call("layer[passInp].setfocus();");
					krpano.set("layer[passErrorBox].visible","true");
				}else{
					$('.passBoxMaskFlash .passErrorBoxFlash').show();
				};
			}
			krpano.set("layer[passWordSubmit].enabled","true");
		}
	});
}

function passBoxMask(passgid,passscenename){
	var passTit_text = "全景已加密请输入密码：";
	var passWordSubmit_text="进入全景";
	var passJump_text = "跳过此全景>>";
	var passErrorBox_text = "密码有误";
	if(krpano.get("ccptype") == "true"){
		passTit_text = "　　　Password:";
		passWordSubmit_text="Enter";
		passJump_text = "Skip the panoramic";
		passErrorBox_text = "Password Error";
	};
	var passhtml ="<div class='passBoxMaskFlash' style='background:#000;width:100%;height:100%;position:fixed;left:0;top:0;right:0;bottom:0;z-index:100000;'>";
	passhtml+="<iframe class='iframeColorMask' src='about:blank'  frameborder='0' scrolling='no' style='background-color:#000;'></iframe>";
	passhtml += "<div class='passBoxFlash' passgid='"+passgid+"' passscenename='"+passscenename+"'>";
	passhtml += "<div class='passConFlash'>";
	passhtml += "<span class='passTitFlash'>"+passTit_text+"</span>";
	passhtml += "<input type='password' class='passInpFlash' onfocus='passInpFlashFocus()' />";
	passhtml += "<span class='passWordSubmitFlash' onclick=\"submitPassScene('"+passgid+"','"+passscenename+"')\">"+passWordSubmit_text+"</span>";
	passhtml += "</div>";
	passhtml += "<div class='passTipBoxFlash'>";
	passhtml += "<span class='passJumpFlash' onclick='jumpScene("+passgid+")'>"+passJump_text+"</span>";
	passhtml += "<span class='passErrorBoxFlash'>"+passErrorBox_text+"</span>";
	passhtml += "</div>";
	passhtml += "</div>";
	passhtml+="</div>";
	$("body").append(passhtml);
	$(document).on("keydown",function(e){
		var focustype = $(".passInpFlash").focus();
		if((e.keyCode==13) && focustype){
		   $(".passWordSubmitFlash").click();
		}
	});
}
function submitPassScene(passgid,passscenename){
	var pass = $("input.passInpFlash").val();
	gotoPassScene(passgid,passscenename,pass);
}
function passInpFlashFocus(){
	$('.passBoxMaskFlash .passErrorBoxFlash').hide();
}
function closePassBoxMask(){
	$(".passBoxMaskFlash").remove();
}

function showAjaxLoading(){
	$("body").append("<div id='ajaxLoading'><img src='//s.expoon.com/css/user2016/images/loading.gif' alt='loading' /></div>");
}

function hideAjaxLoading(){
	$("#ajaxLoading").remove();
}

function xkyAppShareShow(){
	var html = '<div class="xkyAppShareBox"><ul class="xkyAppShareIcon"><li><img src="//s.expoon.com/image/cntour/share_icon1.jpg"><span>微信好友</span></li><li><img src="//s.expoon.com/image/cntour/share_icon2.jpg"><span>微信朋友圈</span></li><li><img src="//s.expoon.com/image/cntour/share_icon3.jpg"><span>QQ好友</span></li><li><img src="//s.expoon.com/image/cntour/share_icon4.jpg"><span>QQ空间</span></li><li><img src="//s.expoon.com/image/cntour/share_icon5.jpg"><span>短信</span></li><li><img src="//s.expoon.com/image/cntour/share_icon6.jpg"><span>邮件</span></li><li><img src="//s.expoon.com/image/cntour/share_icon7.jpg"><span>复制链接</span></li></ul><div class="cancel">取消</div></div>';

	$('body').append(html);
	$('.xkyAppShareIcon li').click(function(){
		xkyAppShare($(this).index());
	});

	$('.xkyAppShareBox .cancel').click(function(){
		krpano.call("closeLayer()");
	});
}

function xkyAppShare(type){
	switch(type){
		case 0:
			//微信好友
			window.location.href = "xkyApp://appShare?xky_ti="+encodeURIComponent(shareTit)+"&xky_des="+encodeURIComponent(shareDesc)+"&xky_img="+encodeURIComponent(shareImg)+"&xky_url="+encodeURIComponent(shareLink)+"&xky_type=2";
			break;
		case 1:
			//朋友圈
			window.location.href = "xkyApp://appShare?xky_ti="+encodeURIComponent(shareTit)+"&xky_des="+encodeURIComponent(shareDesc)+"&xky_img="+encodeURIComponent(shareImg)+"&xky_url="+encodeURIComponent(shareLink)+"&xky_type=1";
			break;
		case 2:
			//QQ好友
			window.location.href = "xkyApp://appShare?xky_ti="+encodeURIComponent(shareTit)+"&xky_des="+encodeURIComponent(shareDesc)+"&xky_img="+encodeURIComponent(shareImg)+"&xky_url="+encodeURIComponent(shareLink)+"&xky_type=5";
			break;
		case 3:
			//QQ空间
			window.location.href = "xkyApp://appShare?xky_ti="+encodeURIComponent(shareTit)+"&xky_des="+encodeURIComponent(shareDesc)+"&xky_img="+encodeURIComponent(shareImg)+"&xky_url="+encodeURIComponent(shareLink)+"&xky_type=4";
			break;
		case 4:
			//短信
			window.location.href = "xkyApp://appShare?xky_ti="+encodeURIComponent(shareTit)+"&xky_des="+encodeURIComponent(shareDesc)+"&xky_img="+encodeURIComponent(shareImg)+"&xky_url="+encodeURIComponent(shareLink)+"&xky_type=7";
			break;
		case 5:
			//邮件
			window.location.href = "xkyApp://appShare?xky_ti="+encodeURIComponent(shareTit)+"&xky_des="+encodeURIComponent(shareDesc)+"&xky_img="+encodeURIComponent(shareImg)+"&xky_url="+encodeURIComponent(shareLink)+"&xky_type=6";
			break;
		case 6:
			//复制链接
			window.location.href = "xkyApp://appShare?xky_ti="+encodeURIComponent(shareTit)+"&xky_des="+encodeURIComponent(shareDesc)+"&xky_img="+encodeURIComponent(shareImg)+"&xky_url="+encodeURIComponent(shareLink)+"&xky_type=8";
			break;
	}
}

function xkyShareNotify(success){
	if(success){
		krpano.call("closeLayer()");
		$(".xkyAppShareBox").remove();
	}else{
		alert("分享失败！");
	}
}
function showProductMask(){
    krpano.call("showModelMask()");
}
function showProductPayMask(a,b){ //去结算按钮的位置偏移值
    krpano.call("showProductPayMask("+a+","+b+")");
}
function payProductClickFun(){//多维产品去结算方法
    document.getElementById("iframeBox").contentWindow.paymentBtnFun();
}
function closeProductMask(){
	krpano.call("closeModelMask()");
	krpano.call("closeLayer()");
}
function reloadProductMask(pid,mpath,spath){
	closeProductMask();
	krpano.call("showModel("+pid+","+mpath+","+spath+")");
}
function closeModelMask(){
	document.getElementById("iframeBox").contentWindow.closeProductMask();
	iframeLoad();
}
function iframeLoad(){
	document.getElementById('iframeBox').focus();
}
function getProductId(id,mpath,spath){
	$.ajax({
		type:"GET",
		url:"/Z/Z/getProductIdBycpId",
		data:{'user_id':user_id,"cppoint_id":id},
		dataType: "json",
		success:function(data) {
			var pid = data.product_id;
			krpano.call("showModel("+pid+","+mpath+","+spath+")");
		}
	});
}
function setProductVrStaus(hotspotname,hotspotevent){
	if(hotspotevent.indexOf("showModel") !== -1){
		hotspotevent = hotspotevent.replace("showModel(","");
		hotspotevent = hotspotevent.replace(")","");
		hotspotevent = hotspotevent.split(",");
		var ptype = hotspotevent[3].replace("'","");
		ptype = ptype.replace("'","");
		if(ptype == 1){
			//多维产品
			krpano.set("hotspot["+hotspotname+"].vr","true");
			if(hotspotname.indexOf("_tip") !== -1){
				krpano.set("hotspot["+hotspotname+"].txttype","true");
			}
		}
	}else{
		krpano.set("hotspot["+hotspotname+"].vr","true");
		if(hotspotname.indexOf("_tip") !== -1){
			krpano.set("hotspot["+hotspotname+"].txttype","true");
		}
	}
}
function showVrImage(hotspotname,pid){
	$.ajax({
		type:"GET",
		url:"/Z/Z/getProductByAjax",
		data:{'product_id':pid},
		dataType: "json",
		success:function(data) {
			if(data.msg == "success"){
				var product_url = data.data.product_url;//多维图片地址
				krpano.set("this_productarr",""+product_url+"");
				krpano.call("showVrImage(product,"+hotspotname+")");
			}else{
				alert("获取数据失败！");
			}
		}
	});
}
function setUserPanoIcon(iconNum){
	krpano.call("setUserPanoIcon("+iconNum+")");
}
function loadKcImg(){
	var url = krpano.get("config.config_settings.kc_pic").split("|")[3];
	var oImg = new Image();
	oImg.src = url;
}
function searchSceneFun(){
	$("#searchActivities,.searchResult").remove();
	var w=250;
	var h=40;
		if(krpano.get("device.flash")){
			var openhtml="<div id='iframeBox02' style='position:absolute;right:10px;bottom:236px;z-index: 99999999998; visibility: visible; opacity: 1;width:"+w+"px;height:"+h+"px;background-color:#000;-webkit-user-select: none;pointer-events: none;'>"
			openhtml += "<iframe name='panoramaPlugin' frameborder='0' src='//s.expoon.com/test/krpano/html/blank.html' width='100%' height='100%' style='background:url(//s.expoon.com/test/krpano/images/fbloader.gif) no-repeat center center #000;' allowtransparency='true'></iframe>";
			openhtml += "</div>";
			$("#pano").append(openhtml);
		}
	var	sInfohtml ="<div id='searchActivities' style='z-index: 99999999999;'>";
	var inputTip="placeholder";
	if(noHtml5){ inputTip="value"; };//<a title='搜索场景'></a>
	if (lantype ==2) {
		sInfohtml +="<span class='searchScene searchSceneOn'><i></i><input autocomplete='off' name='searchSceneInput' type='text' "+inputTip+"='Search scene' /><b></b></span>";
	}else{
		sInfohtml +="<span class='searchScene searchSceneOn'><i></i><input autocomplete='off' name='searchSceneInput' type='text' "+inputTip+"='搜索场景' /><b></b></span>";
	}
	sInfohtml +="</div>";	
	sInfohtml +="<div class='searchResult scrollbar'>";
	sInfohtml +="<ul class='searchResultList'>";
	sInfohtml +="</ul>";
	if (lantype ==2) {
		sInfohtml +="<div class='searchResultNo'>Unrelated scene</div>";
	}else{
		sInfohtml +="<div class='searchResultNo'>无相关场景</div>";
	}
	sInfohtml +="</div>";
	//打开标记
	if (krpano.get("device.desktop")) {
		if(krpano.get("device.flash")){
			$("#pano").append(sInfohtml);
		}else{
			$("#expoonPano").append(sInfohtml);
		}
		$(".searchResult.scrollbar").mCustomScrollbar();
		var groupLen = krpano.get("config.groups[rootGroup].group.count");
		var sceneArr=[];
		for(var i=0; i<groupLen; i++){
			var flag=krpano.get("config.groups[rootGroup].group["+i+"].is_show");
			if (flag!="n") {
				var sceneLen = krpano.get("config.groups[rootGroup].group["+i+"].pano.count");
				for(var j=0; j<sceneLen; j++){
					if (krpano.get("config.groups[rootGroup].group["+i+"].pano["+j+"].is_show")!="n") {//未屏蔽的
						var thisname=krpano.get("config.groups[rootGroup].group["+i+"].pano["+j+"].name");
						var thistitle=krpano.get("config.groups[rootGroup].group["+i+"].pano["+j+"].info.title");
						var arr={thisname:thisname,thistitle:thistitle};
						sceneArr.push(arr)
					};
				}
			};
		}
		var mynum=krpano.get("layer[keepInfo].num");//只显示一个组
		if (mynum=="1") {
			$("#searchActivities").css('bottom', '196px');
			$(".searchResult").css('height', '195px');
			$(".searchResult .searchResultNo").css('line-height', '195px');
		};
		$("#searchActivities .searchScene input[name=searchSceneInput]").bind('input propertychange',function() {
			//input值改变时验证提示
			var thisval=$.trim($(this).val());
			var html="";
			var searchType=true;
			if (thisval!="") {
				$("#iframeBox02").css({
					height: '275px',
					bottom: '0px'
				});
				$(".searchResultList").empty().hide();
				var liarr=[];
				$.each(sceneArr,function(i,item){
					var thisname=item.thisname;
					var thistitle=item.thistitle;
					var index=thistitle.indexOf(thisval);
					if (index>-1) {
						liarr.push(index);
						searchType=false;
						var nthistitle=thistitle.replace(thisval,"<i>"+thisval+"</i>");
						html='<li val='+index+' thisname='+thisname+' thistitle='+thistitle+'>'+nthistitle+'</li>';
						$(".searchResultList").append(html)
					};
				})
				liarr.sort();
				$(".searchResult").show();
				if (searchType) {
					$(".searchResultList").empty().hide();
					$(".searchResultNo").show();
				}else{
					var shtml="";
					for (var i = 0; i < liarr.length; i++) {
						var $li=$(".searchResultList li[val="+liarr[i]+"]").first();
						var $html=$li.html();
						var $name=$li.attr("thisname");
						var $title=$li.attr("thistitle");
						$li.remove();
						shtml+='<li thisname='+$name+' thistitle='+$title+'>'+$html+'</li>';
					};
					$(".searchResultList").empty().append(shtml).show();
					$(".searchResultNo").hide();
				}
			}else{
				$("#iframeBox02").css({
					height: '40px',
					bottom: '235px'
				});
				$(".searchResult").hide();
				$(".searchResultList").empty().hide();
			}
		})
		$("#searchActivities .searchScene b").click(function(event) {
			var $input=$(this).siblings("input[name=searchSceneInput]");
			$input.val("");
			$input.focus();
			$(".searchResult").hide();
			$(".searchResultList").empty().hide();
		});
		$(".searchResultList").on("click","li",function(){
			var thisname=$(this).attr("thisname");
			var thistitle=$(this).attr("thistitle");
			krpano.call("searchJumpScene("+thisname+")");
			$(".searchResult").hide();
			//$("#searchActivities .searchScene input[name=searchSceneInput]").val(thistitle);
			$("#searchActivities,.searchResult").remove();
			krpano.call("set(layer[searchSceneIcon].visible,true)");
		})
		$("#searchActivities input").focus(function(){
			krpano.call("stopdelayedcall(tipThumbEvent)");
		})
	};

}
function mSearchFun() {
	var mhtml="<div class='mSearchTop'>";
	if (lantype ==2) {
		mhtml+="<span class='mSearchScene'><i></i><input name='searchSceneInput' type='text' placeholder='Search scene' /><b></b></span>";
		mhtml+="<span class='closeSearch closeSearchEn'>cancel</span>";
	}else{
		mhtml+="<span class='mSearchScene'><i></i><input name='searchSceneInput' type='text' placeholder='搜索场景' /><b></b></span>";
		mhtml+="<span class='closeSearch'>取消</span>";
	}
	mhtml+="</div>";//mSearchTop
	mhtml +="<div class='mSearchResult scrollbar'>";
	mhtml +="<ul class='mSearchResultList '>";
	mhtml +="</ul>";
	if (lantype ==2) {
		mhtml +="<div class='mSearchResultNo'>Unrelated scene</div>";
	}else{
		mhtml +="<div class='mSearchResultNo'>无相关场景</div>";
	}
	mhtml +="</div>";
	$("body").append(mhtml);
	krpano.call("set(layer[keepInfo].flag,1)");	//搜索框显示取消双击清屏
	krpano.call("hideHotspot('search')");//隐藏标注点和漫游点
	mSearchOperFun();
}
//场景搜索
function mSearchOperFun(){
	//搜索场景
	var groupLen = krpano.get("config.groups[rootGroup].group.count");
	var sceneArr=[];
	for(var i=0; i<groupLen; i++){
		var flag=krpano.get("config.groups[rootGroup].group["+i+"].is_show");
		if (flag!="n") {
			var sceneLen = krpano.get("config.groups[rootGroup].group["+i+"].pano.count");
			for(var j=0; j<sceneLen; j++){
				if (krpano.get("config.groups[rootGroup].group["+i+"].pano["+j+"].is_show")!="n") {//未屏蔽的
					var thisname=krpano.get("config.groups[rootGroup].group["+i+"].pano["+j+"].name");
					var thistitle=krpano.get("config.groups[rootGroup].group["+i+"].pano["+j+"].info.title");
					var arr={thisname:thisname,thistitle:thistitle};
					sceneArr.push(arr)
				};
			}
		};
	}
	$(".mSearchTop .mSearchScene input").bind('input propertychange',function() {
		//input值改变时验证提示
		var thisval=$.trim($(this).val());
		var html="";
		var searchType=true;
		$(".searchResultList").empty().hide();
		var liarr=[];
		if (thisval!="") {
			$.each(sceneArr,function(i,item){
				var thisname=item.thisname;
				var thistitle=item.thistitle;
				var index=thistitle.indexOf(thisval);
				if (index>-1) {
					liarr.push(index);
					searchType=false;
					var nthistitle=thistitle.replace(thisval,"<i>"+thisval+"</i>");
					html='<li val='+index+' thisname='+thisname+' thistitle='+thistitle+'>'+nthistitle+'</li>';
					$(".mSearchResultList").append(html);
				};
			})
			liarr.sort();
			$(".mSearchResult").show();
			if (searchType) {
				$(".mSearchResultList").empty().hide();
				$(".mSearchResultNo").show();
			}else{
				var shtml="";
				for (var i = 0; i < liarr.length; i++) {
					var $li=$(".mSearchResultList li[val="+liarr[i]+"]").first();
					var $html=$li.html();
					var $name=$li.attr("thisname");
					var $title=$li.attr("thistitle");
					$li.remove();
					shtml+='<li thisname='+$name+' thistitle='+$title+'>'+$html+'</li>';
				};
				$(".mSearchResultList").empty().append(shtml).show();
				var H=screen.height;
				$(".mSearchResult").css('max-height', H+"px");
				//if ($(".mSearchResultList").height()>$("body").height()) {
					$(".mSearchResult.scrollbar").mCustomScrollbar();
				//};
				$(".mSearchResultNo").hide();
			}
		}else{
			$(".mSearchResult").hide();
			$(".mSearchResultList").empty().hide();
		}
	})
	$(".mSearchTop .mSearchScene b").click(function(event) {
		var $input=$(this).siblings("input");
		$input.val("");
		$(".mSearchResult").hide();
		$(".mSearchResultList").empty().hide();
		$input.focus();
	});
	$(".mSearchTop .closeSearch").click(function(){
		$(".mSearchTop,.mSearchResult").remove();
		krpano.call("set(layer[keepInfo].flag,0)");	
		krpano.call("showHotspot()");//显示标注点和漫游点
	})
	$(".mSearchResultList").on("click","li",function(){
		var thisname=$(this).attr("thisname");
		var thistitle=$(this).attr("thistitle");
		krpano.call("searchJumpScene("+thisname+")");
		$(".mSearchTop,.mSearchResult").remove();
		krpano.call("set(layer[keepInfo].flag,0)");	
		krpano.call("showJumpGroup()");//显示标注点和漫游点
	})
}
function easeFun(type){
	var bot=$("#searchActivities").css("bottom");
	$("#searchActivities,.searchResult,#iframeBox02").remove();
}
function resizeWin(){
	var H =screen.height;
	$(".mSearchResult").css('max-height', H);
	$(".mSearchResult.scrollbar").mCustomScrollbar("update");
}

var testUserId = panoUrl.indexOf("user_id")>=0 ? true: false; // 判断是否是测试地址
var currMd5 = null,
	krpano = null;

// 公共方法
;(function(window, document) {
	var maskDom 		  = '<div id="maskBox" class="maskBox"></div>',
		mobileNoWXTipsDom = '<div id="noWXTipsBox" class="noWXTipsBox"><img src="http://s.expoon.com/test/krpano/images/noWXTipsIcon.png" /><p><span>请在微信客户端打开链接<span></p></div>';

	Array.prototype.indexOf = Array.prototype.indexOf || function (searchElement, fromIndex) {
	    if ( this === undefined || this === null ) {
	        throw new TypeError( '"this" is null or not defined' );
	    }
	 
	    var length = this.length >>> 0; // Hack to convert object.length to a UInt32
	 
	    fromIndex = +fromIndex || 0;
	 
	    if (Math.abs(fromIndex) === Infinity) {
	        fromIndex = 0;
	    }
	 
	    if (fromIndex < 0) {
	        fromIndex += length;
	 
	        if (fromIndex < 0) {
	          fromIndex = 0;
	        }
	    }
	 
	    for (; fromIndex < length; fromIndex++) {
	        if (this[fromIndex] === searchElement) {
	            return fromIndex;
	        }
	    }
	 
	    return -1;
	};

	// 移动端非微信端打开提示窗口
	window.mobileNoWXTips = function (title){
		var $noWXTipsBox = $('#noWXTipsBox'),
			$maskDom = $('#maskBox');

		if( !krpano.get('layer[payMaskBox].visible') ) {
			krpano.call('closeLayer();'); // 关闭所有窗口
		}
		krpano.call('showOpacityLayer();');

		if ( $noWXTipsBox.size() > 0 ) {
			title && $noWXTipsBox.find('p span').html(title);
			$maskDom.show();
			$noWXTipsBox.show();
		} else {
			title && (mobileNoWXTipsDom = mobileNoWXTipsDom.replace('请在微信客户端打开链接', title));
			$('body').append(maskDom).append(mobileNoWXTipsDom);

			$noWXTipsBox = $('#noWXTipsBox');
			$maskDom = $('#maskBox');	
		}

		setTimeout(function(){
			$maskDom.hide();
			$noWXTipsBox.hide();
			krpano.set('layer[opacityMask].visible', false);
			krpano.call('resumeRotate();');
		}, 3000);
	};

	// 获得全景的2：1图片
	window.getPanoTwoToOngPic = function (sceneName, getPicName) {
		var content = krpano.get('scene['+sceneName+'].content'),
			imgUrlRegular   = /\<preview *url="(((?!<)(?!>).)*)" *\/\>/,
			fileNameRegular = /(\/((?!\/).)+\.jpg)/,
			currImgUrl      = content.match(imgUrlRegular)[1],
			fileName        = currImgUrl.match(fileNameRegular)[0],
			getPicName      = getPicName || 'sphere',
			dtd             = $.Deferred(),
			imgUrl, myImage;



		if( !currImgUrl ) {
			imgUrl = defaultImg;
		} else if( currImgUrl.indexOf('pimgs/') != -1 ) {
			imgUrl = currImgUrl.replace('preview', getPicName);
		} else if( fileName.split('_').length === 2 ) {
			imgUrl = currImgUrl.replace(fileNameRegular, '/' + getPicName + '$1');
		} else if ( fileName.split('_').length === 3) {
			imgUrl = currImgUrl.replace(fileNameRegular, '/' + getPicName + '$1').replace('preview.jpg', getPicName + '.jpg');
		}

		myImage = new Image();
		myImage.src = imgUrl;
		myImage.onerror = function(){
			imgUrl = location.protocol + '//s.expoon.com/image/z/krpano/images/payNoBanner.jpg';
			dtd.resolve(imgUrl);
		}
		myImage.onload = function(){
			dtd.resolve(imgUrl);
		}

		return dtd;
	}

	// 初始化打开窗口前，判断图片状态
	window.initOpenPopupJudgePicStatus = function (picUrl, isLoading) {
		var img = new Image();
		img.onload = function () {
			setTimeout(function(){
				krpano.set('layer[payBox].x' , 0);
			}, 100);
		}
		img.onerror = function () {
			setTimeout(function(){
				krpano.set('layer[payBox].x' , 0);
			}, 100);
		}

		img.src = picUrl;
	}
})(window, document);

// 付费功能(1) - author:liwenjie start
;(function(window){
	var defaultImg 		= location.protocol + '//s.expoon.com/image/z/krpano/images/payNoBanner.jpg',
		isTipsInfoClick = false, // tipsInfo是否有单击事件
		data            = {},
		payBuyData, 
		payPageObject,
		payDataObj;


	// 请求付费数据接口
	payDataObj = {
		requestPayUrlSuccess : false,
		requestSucess        : null,
		payDataList          : {},
		requestPayDataUrlAjax : function () {
			var that = this;
			$.ajax({
				url      : '/Z/Index/getPayPanoInfoByAjax/user_id/' + user_id,
				type     : 'GET',
				dataType : 'JSON',
				success : function ( res ) {
					that.addPayData(res.expo, 'expo');
					that.addPayData(res.group, 'group');
					that.addPayData(res.pano, 'pano');
				},
				error : function ( res ) {
				},
				complete : function ( res ) {
					that.requestPayUrlSuccess = true;

					this.requestSucess && this.requestSucess();
				}
			})
		},
		// 添加付费数据
		addPayData : function (payData, type) {
			var that = this,
				subscript;


			payData = payData || [];
			$.each(payData, function(index, el){
				var pay_title = el.pay_title ? el.pay_title.replace(/\|/g, '&#124') : '',
					pay_desc = el.pay_desc ? el.pay_desc.replace(/\|/g, '&#124') : '';

				subscript = type === 'expo' ? 'all' : (type === 'group' ? 'group_' + el.group_id : 'scene' + el.pano_id);

				that.payDataList[subscript] = el.title_type + '|' + 
											 pay_title + '|' + 
											 pay_desc + '|' + 
											 el.pic_id + '|' + 
											 (el.single_pic_url || '') + '|' + 
											 (el.btn_pic_url || '') + '|' + 
											 (el.s_w || '') + '|' + 
											 (el.s_h || '');
			});
		},
		// 获取指定的付费数据
		getSpecifyPayData : function ( type ) {
			return this.payDataList[type] || '';
		},
		// 判断请求付费获取数据接口，是否完成
		judgeRequestPayUrlStatus : function () {
			return this.requestPayUrlSuccess;
		},
		// 如果请求接口未成功，等待接口请求完成后，执行事件
		setRequestPayUrlSuccessEvent : function (krpanoCallback) {
			this.requestSucess = function () {
				krpano.call(krpanoCallback);
			}
		}
	}

	function init(){

		payDataObj.requestPayDataUrlAjax(); // 请求付费数据接口

		try {
			payBuyData = $.parseJSON(payBuyString);
			payBuyData = payBuyData || {};
		} catch(e) {
			payBuyData = {};
		}

		if ( payBuyData.panoId ) {
			$.each(payBuyData.panoId, function(index, el){
				data['scene' + el] = true;
			});
		}

		if ( payBuyData.groupId ) {
			$.each(payBuyData.groupId, function(index, el){
				data['group_' + el] = true;
			});
		}

		if (!Function.prototype.bind) {
			Function.prototype.bind = function(oThis) {
				if (typeof this !== 'function') {
					// closest thing possible to the ECMAScript 5
					// internal IsCallable function
					throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
				}

				var aArgs = Array.prototype.slice.call(arguments, 1),
					fToBind = this,
					fNOP = function() {},
					fBound = function() {
						return fToBind.apply(this instanceof fNOP && oThis ?
							this :
							oThis,
							aArgs.concat(Array.prototype.slice.call(arguments)));
					};

				fNOP.prototype = this.prototype;
				fBound.prototype = new fNOP();

				return fBound;
			};
		}

		initPassOrPayEtc();
	}
	// 初始化判断密码，支付等内容
	function initPassOrPayEtc(){
		var sHref = window.location.href.substring(window.location.href.indexOf('user_id/')).replace('user_id/','');
			globalPay = globalPay == 1 ? true : false;

		// 全景是否需要付费或购买.
		if ( globalPay || krpanoTransmitData('globalBuy')) {
			ajaxApiJs();
		} else {
			// 密码逻辑
			if(((sHref.indexOf('/') != -1) || (sHref.indexOf('id') != -1)) && visitOpen != 'y'){
				ajaxApiJs();
			}else{
				if((allSetPass == 'y') && visitOpen == "y"){

					var passhtml 		   = '<div class="passWordCon"><div class="passTit">全景已加密：</div><input type="password" class="passInp"></div><div class="passWordTip"><div class="error">密码有误</div></div>',
						passWordSubmitHtml = '<a href="javascript:;" class="passWordSubmit">进入全景</a>',
						jumpHtml           = '<a href="/" class="jump">跳过此全景</a>',
						passTitPcTxt       = '全景已加密请输入密码：';

					if(lantype == 2){
						passhtml           = '<div class="passWordCon"><div class="passTit">Password：</div><input type="password" class="passInp"></div><div class="passWordTip"><div class="error">password Error</div></div>';
						passWordSubmitHtml = '<a href="javascript:;" class="passWordSubmit">Enter</a>',
						jumpHtml           = '<a href="/" class="jump">Next</a>';
						passTitPcTxt       = '　　　Password：';
					}

					if(browserRedirect() == "phone"){
						passhtml = passhtml + '<div class="passWordBtn">' + passWordSubmitHtml + jumpHtml + '</div>'
						$('#passWordWarp').addClass('mobile');
					}else{
						passhtml = '<div class="passWord">' + passhtml + '</div>';
						passhtml = $(passhtml).find('.passWordCon').append(passWordSubmitHtml).end()
											  .find('.passWordTip').append(jumpHtml).end()
											  .find('.passTit').html(passTitPcTxt).end();
					}
					$('#passWordWarp').html(passhtml).show();
					$('.passWordSubmit').click(function(){
						$.ajax({
							type: 'GET',
							url: "/index.php/Z/Index/validatePass",
							data:{"user_id":user_id,"visit_pass":$('.passInp').val()},
							dataType: "jsonp",
							success: function(data){
								if(data.msg == "success"){
									$('#passWordWarp').hide();
									ajaxApiJs();
									localStorage.passGroup = firstGroupId;
								}else{
									$('.passWordTip .error').show();
								}
							}
						});
					});
					$('.passInp').focus(function(){
						$('.passWordTip .error').hide();
					});
					if(firstSceneState == 'y'){
						$('.jump').attr('href','javascript:;');
						$('.jump').click(function(){
							$('#passWordWarp').hide();
							ajaxApiJs();
							firstPass = false;
						});
					}
				}else{
					ajaxApiJs();
				}
			}
		}

		function ajaxApiJs(){
			$.ajax({url:apiJs,dataType:'script',cache:true});
		}
	};

	// 与krpano 传输数据
	function krpanoTransmitData(name){
		var data = {
			globalPay   : globalPay, 										// 全局是否付费，true 开启
			globalBuy   : payBuyData.global_buy == 1 ? true : false, 		// 全局是否购买，true 开启
			globalPrice : globalPrice || 0.01, 								// 全局的价格 
			testUserId  : testUserId || false,								// 判断是不是测试地址， true测试 
			isLogin     : weixin_openid && wxinfo_unionid && wxinfo_nickname ? true : false, 	// 是否登录,有微信ID说明已经登录
			isSelf      : (free_booth_look == '1' || freeBoothLookOa=='1') ? true : false		// 是否是自己的展位或者从oa跳转过来的
		};
		return data[name] === undefined ? null : data[name];
	};

	// 组或单场景是否购买，name 组或场景名称
	function getPanoBuy(name){
		return data[name] || false;
	}

	// 根据scene 下的 preview 获取图片2:1地址
	function getImgUrl (sceneName, seat) {
		var content = krpano.get('scene['+sceneName+'].content'),
			imgUrlRegular   = /\<preview *url="(((?!<)(?!>).)*)" *\/\>/,
			fileNameRegular = /(\/((?!\/).)+\.jpg)/,
			currImgUrl      = content.match(imgUrlRegular)[1],
			fileName        = currImgUrl.match(fileNameRegular)[0],
			imgUrl, myImage;

		if( !currImgUrl ) {
			imgUrl = defaultImg;
		} else if( currImgUrl.indexOf('pimgs/') != -1 ) {
			imgUrl = currImgUrl.replace('preview', 'sphere');
		} else if( fileName.split('_').length === 2 ) {
			imgUrl = currImgUrl.replace(fileNameRegular, '/sphere$1');
		} else if ( fileName.split('_').length === 3) {
			imgUrl = currImgUrl.replace(fileNameRegular, '/sphere$1').replace('preview.jpg', 'sphere.jpg');
		}

		myImage = new Image();
		myImage.src = imgUrl;
		myImage.onerror = function(){
			krpano.call("againAddErrorBanner(" + seat + "," +  defaultImg + ")");
		}

		return imgUrl;
	}

	function toFixed(price, num) {
		num = num || 2;
		return Number(price) ? Number(price).toFixed(num) : price;
	}

	// 判断浏览器环境 
	function judgeScience () {
		var appVersion =navigator.appVersion; // 浏览器内核

		if(!appVersion.match(/.*Mobile.*/)) {
			// pc端
			return 'desktop';
		} else if(appVersion.match(/MicroMessenger/i)) {
			// 微信浏览器
			return 'WeChat';
		} else {
			// 移动端
			return 'mobile';
		};
	}

	// 修改URL 移除url后的场景ID
	function modifyURL () {
		var testUserId 	= krpanoTransmitData('testUserId'), // 是否是测试地址
			href 		= location.href, 	// 当前的url
			ispushState = !!window.history.pushState;

		// 测试地址下的url
		if ( testUserId ) {
			href = href.substr(0, href.indexOf('?'));
		}
		// 正式地址下的参数
		else if ( href.indexOf('/panorama') != -1 ){
			href = href.substr(0, href.indexOf('/panorama')) + '/panorama';
		}

		// 支持 history.pushState方法，直接调用此方法，不支持跳转链接
		if ( ispushState ) {
			window.history.pushState({},'', href);
		} else {
			window.location.href = href;
		}

		return ispushState;
	}

	// 跳转到首页	
	function jumpHome () {
		location.href = '//' + location.host;
	}

	// 弹出层提示
	function popupTips (tipsInfo) {
		var htmlDom = 	'<div id="tipsInfoBox" style="position: fixed;top: 50%;left: 50%;margin-top:-100px;margin-left:-140px;width:280px;height: 200px;background: white;font-family: \'微软雅黑\'; z-index: 14002;">' +
							'<p style="font-size: 18px;text-align: center;margin-top: 57px;">' + tipsInfo + '</p>' +
							'<button type="button" style="width: 140px;height: 40px;line-height: 40px;margin: 32px auto 0;background: #0080c7;display: block;border: none;color: white;font-size: 18px;cursor: pointer;">确定</button>' + 
						'</div>';
		var openhtml="<div id='tipsIframeMaskBox' style='position:absolute;left:0;top:0;z-index: 14001; visibility: visible; opacity: 0.6;filter:alpha(opacity=60);width:100%;height:100%;background-color:#000;-webkit-user-select: none;pointer-events: none; '>";

		// 如果是false，添加firame层，不然弹层无法显示出来
		if(krpano.get("device.flash")){
			openhtml += "<iframe name='panoramaPlugin' frameborder='0' src='//s.expoon.com/test/krpano/html/blank.html' width='100%' height='100%' style='background:url(//s.expoon.com/test/krpano/images/fbloader.gif) no-repeat center center #000;' allowtransparency='true'></iframe>";
		};


		$('#tipsInfoBox').remove();
		$('#tipsIframeMaskBox').remove();

		openhtml += "</div>";
		$("body").append(openhtml).append(htmlDom);

		if ( krpano.get("device.mobile") ) {
			$('#tipsInfoBox').css({
				width           : '240px',
				height          : '160px',
				margin          : 0,
				transform       : 'translate(-50%, -50%)',
				'border-radius' : '5px'
			});
			$('#tipsInfoBox p').css({
				'margin-top' : '40px',
				'font-size'   : '19px'
			});
			$('#tipsInfoBox button').css({
				'margin-top'  : '24px',
				width         : '130px',
				height        : '35px',
				'line-height' : '35px',
				'font-size'   : '17px'
			});
		};

		// 没有单击事件时,添加单击事件,只添加一次
		if(!isTipsInfoClick) {
			isTipsInfoClick = true;
			$("body").on('click', '#tipsInfoBox button', function () {
				$('#tipsInfoBox').remove();
				$('#tipsIframeMaskBox').remove();
			});
		}
	}

	// 给定文字,判断文字存占的高度
	function accordingTxtGetHeight (txt) {
		if( !$('#accordingTxtGetHeight').size() ) {
			var cssStyle = krpano.get('layer[payExplainTxt].css');
			var width = krpano.get('layer[payExplainTxt].width');
			$('body').append("<div id='accordingTxtGetHeight' style='position:fixed;top:-10000px;z-index:-1;" + cssStyle + " width:" + width + "px;word-break: break-all;'></div>");
		}
		$('#accordingTxtGetHeight').html(txt);
		return $('#accordingTxtGetHeight').height();
	}

	// 根据图片的实际尺寸, 计算图片要显示的尺寸
	function calcImgShowSize (imgWidth, imgHeight, bannerWidth) {
		var bannerHeight 		  = parseInt(bannerWidth / 2),
			aspectRatioDifference = imgWidth / bannerWidth - imgHeight / bannerHeight, // 宽高比差异 >0 缩宽; <0 缩高
			imgShowWidth,
			imgShowHeight;

		// 设置图片展示方式
		if ( imgWidth <= bannerWidth && imgHeight <= bannerHeight){
			// 图片宽高小物banner区域, 正常显示
			imgShowWidth  = imgWidth;
			imgShowHeight = imgHeight;

		} else if (imgWidth > bannerWidth && imgHeight <= bannerHeight || (imgWidth > bannerWidth && imgHeight > bannerHeight && aspectRatioDifference > 0) ) {
			//  图片的宽高显示超过banner区域, 且宽高比大于banner区域的宽高比
			imgShowWidth  = bannerWidth;
			imgShowHeight = imgShowWidth / imgWidth *  imgHeight;

		} else if (imgWidth <= bannerWidth && imgHeight > bannerHeight || (imgWidth > bannerWidth && imgHeight > bannerHeight && aspectRatioDifference < 0)) {
			//  图片的宽高显示超过banner区域, 且宽高比小于banner区域的宽高比
			imgShowHeight = bannerHeight;
			imgShowWidth  = imgShowHeight / imgHeight * imgWidth;

		} else {
			// 图片的宽高显示比banner区域大，且宽高比等于banner区域的宽高比
			imgShowWidth  = bannerWidth;
			imgShowHeight = bannerHeight;
		}

		return imgShowWidth + '|' + imgShowHeight;
	}


	// 付费下的登录，购买，支付成功相关内容
	function PayPage() {
		this.SencePayQrCodeWxPayUrl = '/Z/SencePay/QrCodeWxPay'; 	// 获取微信支付二维码接口
		this.SencePayIsPayByAjax    = "/Z/SencePay/isPayByAjax"; 	// 定时请求的接口,判断是否支付成功
		this.SencePayZfbPay         = '/Z/SencePay/zfbPay'; 		// 获取支付宝支付的订单ID
		this.PayAlipayAlipaytoQr    = '/Pay/Alipay/alipayto_qr'; 	// 获取支付宝支付二维码
		this.timer                  = null;					// 定时请求是否支付成功的定时器
		this.payStateTime			= 2000; 				// 默认定时请求是否支付成功的时间间隔 ms
		this.isPaySuccess           = false;				// 是否支付成功
		this.weChatOrderSn,									// 微信支付二维码的订单号
		this.alipayOrderSn,									// 支付宝支付二维码的订单号
		this.order_sn;										// 当前轮洵二维码的订单号

		$('body').on('click', '.payPageBox .returnPayBox', function () {
			$('.payPageBox').remove();
			$('#iframeBox').remove();
		});
	}
	PayPage.prototype = {
		// 初始化
		init : function(state, popupWidth, popupHeight, title, type, backPath, userId, price, id){
			this.popupWidth  = 700;	// 弹窗的宽度
			this.popupHeight = 550;	// 弹窗的高度
			this.title       = title;		// 全局/组/场景 的名称 
			this.type        = type;		// 付费内容 1-全局; 2-组; 3-单场景
			this.backPath    = backPath;	// 回调的地址（一般是当前url+场景ID）
			this.userId      = userId;		// 展位ID
			this.id          = id;			// 组/场景ID
			this.price       = Number(price) ? Number(price).toFixed(2) : price;	// 价格，保留两位小数

			this.isPaySuccess = false;					// 是否支付成功
			this.scienceType  = this.judgeScience(); 	// 浏览器内核

			this.weChatOrderSn = null;								// 微信支付二维码的订单号
			this.alipayOrderSn = null;								// 支付宝支付二维码的订单号

			krpano.call('hidethumbs()');

			this.showBox(state);
		},
		// 显示窗口
		showBox : function (type){
			type = Number(type);
			this.removePayPageBoxDom();

			switch (type) {
				case 2:
					// 微信登录
					this.addLoginBoxDOMhTML();
					break;
				case 3:
					// 选择支付方式
					this.addPayBoxDOM();
					break;
				case 4:
					// 支付成功
					this.addPaySuccessDom();
					break;
			}
		},
		// 生成付费banner图窗口
		addPaidPreview : function () {
			var domHtml =  '<div> class="paidPreviewBox>\
								<div class="bannerBox">\
									<ul>\
										<li><img></li>\
									</ul>\
									<div class="decorationBox"></div>\
									<div class="bannerLeftBtn"></div>\
									<div class="bannerRightBtn"></div>\
								</div>\
								<div class="infoBox">\
									<h2></h2>\
									<p></p>\
									<div class="otherInfoBox">\
										<ul>\
											<li>含精品全景<span>9999</span>个</li>\
											<li>需要支付<span>￥9999</span>个</li>\
											<li>付费额效期<span>永久观看</span>个</li>\
										</ul>\
									</div>\
									<div class="nextBtn">我要看</div>\
								</div>\
								<div class="tipsBtnBox">已付费用户<a href="javscript:;">直接观看</a></div>\
							</div>';
		},
		// 生成微信登录DOM
		addLoginBoxDOMhTML: function () {
			var domHtml = 	'<div class="payPageBox">' +  
								'<div class="returnPayBox"></div>' + 
								'<div class="loginBox">' + 
									'<div id="WeChatLoginBox" class="imgBox">' + 
									'</div>' + 
								'</div>' + 
							'</div>';

			if ( this.scienceType === 'desktop' ) {
				// PC
				this.generateDom(domHtml, this.addLoginBoxData);
			} else {
				if ( !/micromessenger/.test(navigator.userAgent.toLowerCase()) ){
					mobileNoWXTips('内容需付费后进行体验<br />请在微信客户端打开连接');
					return false;
				}
				$('body').append('<div id="ajaxLoading" style="background-color: rgba(0,0,0,.7);"><div style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;width: 40px;height: 40px;background-image: url(//s.expoon.com/cache/1527556924/css/user2016/images/loading.gif);background-size: contain;"></div></div>');
				// 移动端 ,微信客户端登录, 不是微信端会跳转到友好界面
				window.open(location.origin + '/index.php/WeixinLogin/wx_index?go_back=' + this.backPath);
			}
		},
		// 微信登录加载数据
		addLoginBoxData : function (that) {
			var redirect_uri = encodeURIComponent(location.origin + "/index.php/WeixinLogin/by_open_platform?go_back=" + that.backPath);

			showAjaxLoading();
			$.getScript('//res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js', function() {
				// 关闭loading
				hideAjaxLoading();
				var obj = new WxLogin({
					id           : "WeChatLoginBox",
					appid        : "wxfa4f21ebd1ffdf19",
					scope        : "snsapi_login",
					redirect_uri : redirect_uri,
					state        : "snsapi_login",
					href 		 : "//s.expoon.com/cache/"+ timestamp +"/image/z/krpano/css/resetWeChatLogin.css"
				});
			});
		},
		// 生成选择支付方式DOM
		addPayBoxDOM : function(){
			var domHtml =   '<div class="payPageBox">' +  
								'<div class="returnPayBox"></div>' + 
								'<div class="payBox">' + 
									'<h3>' + this.title+ '</h3>' + 
									'<ul>' + 
										'<li>' + 
											'<p class="titleTxt">付费金额：</p>' + 
											'<div class="contBox priceTxt">￥' + this.price + '元</div>' + 
										'</li>' + 
										'<li>' + 
											'<p class="titleTxt">支付方式：</p>' + 
											'<div class="contBox choicePayBox">' + 
												'<button class="payModeBtn WeChatChoiceBtn" data-type="wechat"></button>' + 
												'<button class="payModeBtn AlipayChoiceBtn" data-type="alipay"></button>' + 
												'<div class="payModeInfo">' + 
													'<p class="payTxt">微信扫码支付(元)：<span>￥' + this.price + '</span></p>' + 
													'<img src="" alt="">' + 
												'</div>' + 
												'<div class="payModeInfo">' + 
													'<p class="payTxt">支付宝扫码支付(元)：<span>￥' + this.price + '</span></p>' + 
													'<iframe class="AlipayIframe" allowtransparency="true"></iframe>'
												'</div>' + 
											'</div>' + 
										'</li>' + 
									'</ul>' + 
								'</div>' + 
							'</div>';
			var that = this; 


			if ( that.scienceType === 'desktop' ) {
				// PC
				that.generateDom(domHtml, that.addPayBoxData);
			} else if ( that.scienceType === 'WeChat' ) {
				// 微信客户端支付
				that.jumpSencePayJsWxPay();
			} else {
				popupTips('请使用微信支付');
			}
		},
		// 选择支付方式数据
		addPayBoxData : function(that){

			$('.payBox .payModeBtn').off('click').on('click', function(){
				var index = $(this).index(),
					type = $(this).data('type');

				$(this).addClass('active').siblings('.payModeBtn').removeClass('active');

				$('.payBox .payModeInfo').eq(index).show().siblings('.payModeInfo').hide();

				if( type === 'alipay' && !that.alipayOrderSn) {

					that.ajaxAlipay();
				} else if( type === 'wechat' && !that.weChatOrderSn ){

					that.ajaxWeChatPayImg();
				} else {
					that.judgePollingOrderSn(type);
				}

			}).eq(0).click();
		},
		// 移动端微信支付
		jumpSencePayJsWxPay : function() {
			if(!!window.history.pushState) {
				var href = location.href.split('#')[0];
				window.history.pushState({},'', href);
			}
			// 移动端微信支付跳转页面,转参数type, id, userId, title
			var openUrl = location.origin + '/pay/jsWxSencePay.html?type=' + this.type + '&id=' + this.id + '&userId=' + this.userId + '&title=' + this.title + '&price=' + this.price + '&go_back=' + encodeURIComponent(this.backPath);

			location.href = openUrl;
		},
		// 获取微信支付二维码
		ajaxWeChatPayImg : function () {
			showAjaxLoading();
			// 添加loading
			var that = this;
			$.ajax({
				url  : that.SencePayQrCodeWxPayUrl,
				type : 'POST',
				data : {
					type       : that.type,
					user_id    : that.userId,
					id         : that.id,
					goods_name : that.title
				},
				dataType: "json",
				success: function(data) {
					if (data.status == '1') {
						$(".payModeInfo img").attr("src", data.data.pay_img + '&size=5.41');
						that.weChatOrderSn = data.data.order_sn;
						that.judgePollingOrderSn('wechat');
					} else {
						popupTips(data.info);
					}
					// 关闭loading
					hideAjaxLoading();
				}
			});
		},
		// 支付宝购买
		ajaxAlipay : function () {
			// 添加loading
			showAjaxLoading();
			var that = this;
			$.ajax({
				url      : that.SencePayZfbPay,
				type     : "POST",
				dataType : "json",
				data : {
					type       : that.type,
					user_id    : that.userId,
					id         : that.id,
					goods_name : that.title
				},
				success  : function(data) {
					if (data.status == '1') {
						that.getAlipayPayImg(data.data.order_sn);
					} else {
						popupTips(data.info);
						hideAjaxLoading();
					}
				}
			});
		},
		// 获取支付宝支付二信码
		getAlipayPayImg : function (order_sn) {
			var that = this;
			$.ajax({
				url: this.PayAlipayAlipaytoQr,
				type: 'POST',
				data : {
					order_sn: order_sn
				},
				success : function(data){
					$('.AlipayIframe').attr('src', data).on('load', function(){
						$(this).css('visibility', 'visible');
						hideAjaxLoading();
					});
					that.alipayOrderSn = order_sn;
					that.judgePollingOrderSn('alipay');
				}
			})
		},
		// 判断轮询查找的order_sn
		judgePollingOrderSn : function(type){

			clearTimeout(this.timer);

			if( type === 'wechat' ) {
				// 微信
				this.order_sn = this.weChatOrderSn;

			} else if ( type === 'alipay' ) {
				// 支付宝
				this.order_sn = this.alipayOrderSn;
			} else {
				return;
			}

			this.timer =  window.setTimeout(this.ajaxIsPaySTatus.bind(this), 5000);

		},
		// 定时请求接口,判断是否购买成功
		ajaxIsPaySTatus : function () {
			var that = this;

			$.ajax({
				url      : that.SencePayIsPayByAjax,
				type     : "POST",
				dataType : "text",
				data     : {
					'order_sn': that.order_sn 
				},
				success: function(data) {
					if (data == 1) {
						that.isPaySuccess = true;
						that.showBox(4);	
					} else {
						that.timer =  window.setTimeout(that.ajaxIsPaySTatus.bind(that), that.payStateTime);
					}
				}
			});
		}, 
		// 生成支付成功的dom
		addPaySuccessDom : function () {
			var domHtml =   '<div class="payPageBox">' +  
								'<div class="paySuccessbox">' +
									'<h3>付费成功</h3>' +
									'<p class="tipTxt">请关注公众号，便于随时查看付费内容。</p>' +
									'<div class="imgBox">' +
										'<img src="//s.expoon.com/cache/1526377671/test/krpano/images/expoonPublicNumber.png" alt="">' +
									'</div>' +
									'<p class="tipTitle">公众号-服务中心-用户中心</p>' +
									'<button class="paySuccessBtn">去看全景</button>' +
								'</div>' +
							'</div>';
			this.generateDom(domHtml, this.addPaySuccessData);
		},
		// 支付成功的操作
		addPaySuccessData : function (that) {
			$('.payPageBox .paySuccessBtn').on('click', function(){
				// 添加loading
				showAjaxLoading()
				window.location.href = that.backPath;
			});
		},
		// 移除支付相关的dom
		removePayPageBoxDom : function () {
			$('.payPageBox').remove();
			clearTimeout(this.timer);
		},
		// 生成DOM结构
		generateDom : function (domHtml, callback) {
			var that = this;

			// 如果是false，添加firame层，不然弹层无法显示出来
			if(krpano.get("device.flash")){
				var openhtml="<div id='iframeBox' style='position:absolute;left:50%;top:50%;z-index: 13999; visibility: visible; opacity: 1;margin-left:-" + Math.round(this.popupWidth / 2) + "px; margin-top:-" + Math.round(this.popupHeight / 2 + 40) + "px;width:"+this.popupWidth+"px;height:"+this.popupHeight+"px;background-color:#fff;-webkit-user-select: none;pointer-events: none;'>"
				openhtml += "<iframe name='panoramaPlugin' frameborder='0' src='//s.expoon.com/test/krpano/html/blank.html' width='100%' height='100%' style='background:url(//s.expoon.com/test/krpano/images/fbloader.gif) no-repeat center center #000;' allowtransparency='true'></iframe>";
				openhtml += "</div>";
				$("body").append(openhtml);
			};

			// 添加相关的DOM
			$('body').append(domHtml);
			// 位置DOM的位置
			$('.payPageBox').css({
				width         : this.popupWidth + 'px',
				height        : this.popupHeight + 'px',
				'margin-top'  : '-' + Math.round(this.popupHeight / 2 + 40) + 'px',
				'margin-left' : '-' + Math.round(this.popupWidth / 2) + 'px'
			});

			// 有回调运行回调
			callback && callback(that);
		},
		// 浏览器内核
		judgeScience : function () {
			var appVersion =navigator.appVersion; // 浏览器内核

			if(!appVersion.match(/.*Mobile.*/)) {
				// pc端
				return 'desktop';
			} else if(appVersion.match(/MicroMessenger/i)) {
				// 微信浏览器
				return 'WeChat';
			} else {
				// 移动端
				return 'mobile';
			};
		}
	};

	payPageObject = new PayPage();


	init();

	window.krpanoTransmitData    = krpanoTransmitData;
	window.getPanoBuy            = getPanoBuy;
	window.getImgUrl             = getImgUrl;
	window.toFixed               = toFixed;
	window.modifyURL             = modifyURL;
	window.jumpHome              = jumpHome;
	window.popupTips             = popupTips;
	
	window.payPage               = payPageObject.init.bind(payPageObject);
	window.closePayPage          = payPageObject.removePayPageBoxDom.bind(payPageObject);
	
	window.accordingTxtGetHeight = accordingTxtGetHeight;
	window.payCalcImgShowSize    = calcImgShowSize;
	
	window.payDataObj            = payDataObj;

	window.returnPayBox = function() {
		$('.payPageBox').remove();
		$('#iframeBox').remove();
	}

})(window);
// 付费功能 - author:liwenjie end

// 深度全景功能(2) - author:liwenjie start
;(function(window){
	var isShow,  // 是否显示移动中的深度全景漫游点
		previousDepthName, // 上一个的深度漫游点的位置
		timer;

	// 当前场景有深度全景漫游点，开启鼠标移动事件
	function openMousemove() {
		isShow = true;
		$(document).on('mousemove', function () {
			var isHasClickableDepth, latelyDepthName, currDepthEnabled;

			krpano.call('getLatelyDepth()');

			isHasClickableDepth = krpano.get('isHasClickableDepth'); 		// 是否有可单击的深度全景漫游点
			latelyDepthName     = krpano.get('latelyDepthName');			// 可单击的深度漫游点的name
			currDepthEnabled    = krpano.get('hotspot[' + latelyDepthName + '].enabled');	// 可单击的深度漫游点是否接收鼠标事件

			// 如果上一个深度漫游点与当前漫游点不同，则打开
			if(previousDepthName != latelyDepthName) {
				isShow = true;
				clearTimeout(timer);
			}

			if(isHasClickableDepth === 'true' && currDepthEnabled) {
				if ( isShow ) {
					// 当前漫游点显示,不在显示,或 如果上一个深度漫游点与当前漫游点相同不知道
					previousDepthName = latelyDepthName;		
					krpano.call('setMouseMoveDepthHotPosition()');	

					clearTimeout(timer);
					timer = setTimeout(function(){
						krpano.call('hideMouseMoveDepthHot()');
					}, 2000);
				}
			} else {
				isShow = true;
				krpano.call('hideMouseMoveDepthHot()');
				clearTimeout(timer);
			}
		});
	}
	// 关闭鼠标移动事件
	function closeMousemove(){
		$(document).off('mousemove');
	}
	// 取消浮沉的显示
	function cancelDepthMoveHot() {
		isShow = false; 
		krpano.call('hideMouseMoveDepthHot()');
		clearTimeout(timer); 
	}
	// 打开浮沉的显示
	function openDepthMoveHot () {
		isShow = true; 
	}

	window.openMousemove      = openMousemove;
	window.closeMousemove     = closeMousemove;
	window.cancelDepthMoveHot = cancelDepthMoveHot;
	window.openDepthMoveHot   = openDepthMoveHot;
})(window);
// 深度全景功能 - author:liwenjie end

// 高校录取通知书活动功能(3) - author:liwenjie start
;(function(window, document){
	var currkrpanoTransmitData;

	/** 
	 * 时间生成器
	 * typeString 0-9的字符代表 默认 '〇一二三四五六七八九'
	 * timestamp 十三位的时间戳
	 * format格式 默认 ''
	 */
	function timesGenerator ( timestamp, format, typeString ) {
		typeString = '〇一二三四五六七八九';
		timestamp = parseInt(timestamp);
		var newDate = new Date(timestamp);
		Date.prototype.format = function (format) {
			var date = {
				'M+': this.getMonth() + 1,
				'd+': this.getDate(),
				'h+': this.getHours(),
				'm+': this.getMinutes(),
				's+': this.getSeconds(),
				'q+': Math.floor((this.getMonth() + 3) / 3),
				'S+': this.getMilliseconds()
			};
			format = format || 'yyyy年M月d日';
			if (/(y+)/i.test(format)) {
				format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
			}
			for (var k in date) {
				if (new RegExp('(' + k + ')').test(format)) {
					format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
				}
			}
			for( var i = 0 ; i<10; i++ ) {
				format = format.replace(new RegExp(i, 'g'), typeString.substr(i, 1));
			}
			return format;
		}
		return newDate.format(format);
	}

	function Admission() {
		// 学院专业数据
		this.collegeMajorData = [
			{
				college : '信息',
				major : '虚拟现实技术'
			},{
				college : '工程',
				major : '挖掘机技术'
			},{
				college : '医',
				major : '非正常人类研究'
			},{
				college : '医',
				major : '强迫症选修'
			},{
				college : '金融',
				major : '炒股理财'
			},{
				college : '艺术',
				major : '百变穿搭'
			},{
				college : '表演',
				major : '戏精养成与修炼'
			},{
				college : '编导',
				major : '豆瓣评分9.9'
			},{
				college : '环境',
				major : '花草树木守护神'
			},{
				college : '幼教',
				major : '儿童快乐成长'
			},{
				college : '食品',
				major : '吃货福利'
			},{
				college : '航天',
				major : '工程力学'
			},{
				college : '化工',
				major : '核工程与核技术'
			},{
				college : '人文',
				major : '历史学'
			}
		];
		this.html2canvas = null; // 截图插件变量
		this.bgImgSeat = 0; 	// 当前随机生成的背景图片地址
		this.noticeImg = null; // 生成的通知书图片
		this.scale = 1;
		// 通知书背景棋牌  移动端 
		this.noticeBg = [
			'//s.expoon.com/cache/12345/test/krpano/images/admission/certificateBg01.jpg',
			'//s.expoon.com/cache/12345/test/krpano/images/admission/certificateBg02.jpg',
			'//s.expoon.com/cache/12345/test/krpano/images/admission/certificateBg03.jpg'
		];
		// 通知书背景图片模版 移动端 
		this.noticeBgTem = [
			'//s.expoon.com/cache/12345/test/krpano/images/admission/noticeBg01.jpg',
			'//s.expoon.com/cache/12345/test/krpano/images/admission/noticeBg01-01.jpg',
			'//s.expoon.com/cache/12345/test/krpano/images/admission/noticeBg02-02.jpg'
		];
		// 通知书背景图片遮罩 移动端 
		this.noticeBgTemMask = [
			'',
			'//s.expoon.com/cache/12345/test/krpano/images/admission/noticeBg01-02.png',
			'//s.expoon.com/cache/12345/test/krpano/images/admission/noticeBg02-02.png'
		];
		// 通知书背景棋牌	 PC版
		this.noticeBgPc = [
			'//s.expoon.com/cache/12345/test/krpano/images/admission/certificateBgPc01.jpg',
			'//s.expoon.com/cache/12345/test/krpano/images/admission/certificateBgPc02.jpg',
			'//s.expoon.com/cache/12345/test/krpano/images/admission/certificateBgPc03.jpg'
		];
		// 通知书背景图片模版 PC版
		this.noticeBgTemPc = [
			'//s.expoon.com/cache/12345/test/krpano/images/admission/noticeBgPc01-01.jpg',
			'//s.expoon.com/cache/12345/test/krpano/images/admission/noticeBgPc02-01.jpg',
			'//s.expoon.com/cache/12345/test/krpano/images/admission/noticeBgPc03-01.jpg'
		];
		// 通知书背景图片遮罩 PC版
		this.noticeBgTemMaskPc = [
			'//s.expoon.com/cache/12345/test/krpano/images/admission/noticeBgPc01-02.png',
			'//s.expoon.com/cache/12345/test/krpano/images/admission/noticeBgPc02-02.png',
			'//s.expoon.com/cache/12345/test/krpano/images/admission/noticeBgPc03-02.png'
		];
		// 话术引导DOM
		this.guideDOM = '<div class="guideBox">' +
							'<div class="left">' +
								'<img src="//s.expoon.com/cache/12345/test/krpano/images/admission/guideIcon.png">' +
							'</div>' +
							'<div class="right">' +
								'<p>录取通知书藏在某个场景喽~</p>' +
								'<p>快去找找吧！</p>' +
							'</div>' +
						'</div>';
		// 信封DOM
		this.mailerDOM = '<div class="mailerBox">' +
							'<img class="mailerBg" src="//s.expoon.com/cache/12345/test/krpano/images/admission/mailerBg.png"/>' +
							'<img class="mailerOpenTop" src="//s.expoon.com/cache/12345/test/krpano/images/admission/mailerOpenTop.png"/>' +
						 '</div>' +
						 '<div class="noticePack"></div>' + 
						 '<div class="mailerBox">' +
							'<img class="mailerBottom" src="//s.expoon.com/cache/12345/test/krpano/images/admission/mailerBottom.png"/>' +
							'<img class="mailerCloseTop" src="//s.expoon.com/cache/12345/test/krpano/images/admission/mailerCloseTop.png"/>' +
							'<img class="mailerDismantle" src="//s.expoon.com/cache/12345/test/krpano/images/admission/mailerDismantle.png"/>' +
						 '</div>';
		// 通知书DOM
		this.noticeDOM = '<div class="noticeBox">' +
							'<div class="noticeContent" id="noticeImg">' +
								'<h1></h1>' +
								'<img src="//s.expoon.com/cache/12345/test/krpano/images/admission/letterOfAdmissionTxt.png" />' +
								'<div class="userNameBox inputInfoBox">' +
									'<input type="text" value="" autocomplete="off" placeholder="请输入姓名"/>' +
									'<span></span>' +
									'同学:' +
								'</div>' +
								'<div class="inputInfoBox">' +
									'祝贺你！被录取至我校' +
									'<span class="collegeTxt"></span>' +
									'学院(系)' +
								'</div>' +
								'<div class="inputInfoBox">' +
									'<span class="majorTxt"></span>' +
									'专业学习!' +
								'</div>' +
								'<p class="inputInfoBox txtBox">请你于二〇一八年九月九日凭本通知书 来校报到。</p>' +
								'<div class="autographBox">' +
									'<div class="autographLeft">' +
										'<p></p>' +
										'<p></p>' +
									'</div>' +
									'<div class="autographRight">' +
										'<canvas id="noticePanoQRCode"></canvas>' +
									'</div>' +
								'</div>' +
							'</div>' +
							'<div class="btnBox">' +
								'<button type="button" class="switchSpecialtyBtn">换专业</button>' + 
								'<button type="button" class="syntheticPictureBtn">签收录取通知书</button>' + 
							'</div>' +
							'<div class="errorTips">请输入你的姓名</div>' +
						 '</div>';
		// 关闭按钮DOM
		this.closeBtnDOM = '<button class="closeBtn" style="background-image: url(//s.expoon.com/test/krpano/images/pano-icon.png);"></button>';
		// 生成通知书
		this.NoticeOfGenerationDOM = '<div><div class="noticeOfGenerationBox">' +
										'<div class="bannerBox">' + 
											'<div class="bannerMainImg"></div>' +
											'<img class="bannerMask" />' + 
										'</div>' + 
										'<div class="generationImg"><img>' + 
										'</div>' +
										'<div class="btnBox" style="background-image: url(//s.expoon.com/cache/12345/test/krpano/images/admission/noticeBgBottomlines.jpg);">' +
											'<p>长按通知书保存或分享</p>' + 
											'<a href="//m.expoon.com/expo/tzs2018.html">全景看校园</a>' + 
										'</div>' + 
									 '</div>';

	}
	Admission.prototype = {
		// 初始化
		init: function(type) {
			var scale = $(window).height() / 732;
			if ( krpano.get('device.desktop') ) {
				this.scale = scale>1 ? scale : 1.5;
			} else {
				this.scale = 3;
			}

			// 通知书
			if (type === 'mailer') {
				this.showMailerDOM();
			}
			// 话术引导
			else if (type === 'guide') {
				this.showGuideDOM();
			}
			
			krpano.call('closeLayer();'); // 关闭所有窗口
			krpano.call('showOpacityLayer();');
		},
		// 生成DOM结构
		generateDom: function(DOM) {
			$('#admission').remove();
			$('body').append('<div id="admission">' + DOM + '</div>');
			$('#admission').on('click mousedown mouseup mousemove', function(e) {
				e.stopPropagation();
			})
		},
		// 显示话术引导
		showGuideDOM: function() {
			this.generateDom(this.guideDOM);
			this.showCloseBtn();

			// pc端的提交信息不一样			
			if (krpano.get('device.desktop')) {
				$('#admission .guideBox p:first').html('入学前的最后一次考验，录取通知书藏在某个场景喽~');
			}

			$('#admission').on('click touchend', function() {
				$('#admission').remove();
				krpano.set('layer[opacityMask].visible', false);
				krpano.call('resumeRotate();');
			});
		},
		// 显示信封
		showMailerDOM: function() {
			var that = this;
			// 生成DOM
			that.generateDom(that.mailerDOM);

			$('#admission .noticePack').css({
				bottom: ($(window).height() - $('.mailerBox').eq(0).height()) / 2 + 1
			});

			// 图片加载成功后,添加通知书的dom,
			$('#admission .mailerBottom').on('load', function() {
				that.showNoticeDOM();

				$('#admission .noticeBox').css({
					bottom: -($('.noticeBox').height() - $('.mailerBg').height() + 2) + 'px'
				});
			});

			that.mailerClickFun();
		},
		// 信封点击事件
		mailerClickFun: function() {
			var that = this;
			$('#admission .mailerDismantle').on('click touchend', function() {
				that.mailerAnimateFun();
			});
		},
		// 信封动画
		mailerAnimateFun: function() {
			var that = this,
				noticeBottom; //  通知书移动到的位置
			if (krpano.get('device.desktop')) {
				noticeBottom = '60px';
			} else {
				noticeBottom = -(-120 + $('.mailerBg').height()) + 'px';
			}
			$('#admission .mailerBox').addClass('startAnimation');


			setTimeout(function() {
				$('#admission .noticeBox').animate({
					bottom: noticeBottom
				}, 500, 'linear', function() {
					$('#admission .noticePack').css({
						'z-index': 3
					});

					$('#admission .noticePack').animate({
						bottom: 0
					}, 500);

					$('#admission .noticeBox').animate({
						bottom: ($(window).height() - $('#admission .noticeBox').height()) / 2
					}, 500, 'linear', function() {
						$('#admission .btnBox').show();
						that.showCloseBtn();

					});
					$('#admission .noticeBox').addClass('startAnimation');

					setTimeout(function() {
						$('#admission .noticeBox').css({
							'-webkit-transform': 'translate(-50%, 0) scale(1)',
							'-ms-transform': 'translate(-50%, 0) scale(1)',
							'transform': 'translate(-50%, 0) scale(1)',
							'top': $('#admission .noticeBox').css('bottom'),
							'bottom': 'auto'
						});
						$('#admission .noticeBox').removeClass('startAnimation');
						$('#admission .mailerBox').remove();
					}, 1200);
				});
			}, 800);
		},
		// 录取通知书
		showNoticeDOM: function() {

			// 生成DOM
			$('#admission .noticePack').append(this.noticeDOM);
			// this.generateDom(this.noticeDOM);

			this.addNoticeData();

			// 添加专业
			this.switchSpecialty();
		},
		// 添加录取通知书数据
		addNoticeData: function() {
			var that = this,
				bgImg = '', // 背景图片; 
				timer,
				title = unescape(companyname).replace('全景展示', ''); // 全景名称

			this.bgImgSeat = Math.floor(Math.random() * 3); // 当前随机生成的背景图片地址

			// pc端的提交信息不一样
			if (krpano.get('device.desktop')) {
				bgImg = this.noticeBgPc[this.bgImgSeat];
				$('#admission .inputInfoBox').eq(1).addClass('indent');
			} else {
				bgImg = this.noticeBg[this.bgImgSeat];
			}

			$('#admission h1').html(title);
			$('#admission .autographLeft p:first').html(title);
			$('#admission .autographLeft p:last').html(timesGenerator(new Date().getTime()));
			$('#admission .noticeContent').css({
				'background-image': 'url(' + bgImg + ')'
			});

			new QRCode('noticePanoQRCode', {
			  text: window.location.href,
			  correctLevel : QRCode.CorrectLevel.H
			});

			this.inputValidate();

			// pc端的提交信息不一样			
			if (krpano.get('device.desktop')) {
				$('#admission .inputInfoBox').eq(1).addClass('indent');
			}

			// 添加换一换事件
			$('#admission .switchSpecialtyBtn').on('click touchend', function() {
				that.switchSpecialty();
			});
			// 添加签收录取通知书
			$('#admission .syntheticPictureBtn').on('click touchend', function() {
				var val = $('#admission input').val();
				if (val) {
					that.preprocessingData();
				} else {
					$('#admission input').addClass('error');

					if ( krpano.get('device.desktop') ) {
						$('#admission .errorTips').show();

						clearTimeout(timer);
						timer = setTimeout(function(){
							$('#admission .errorTips').hide();							
						}, 500);
					}
				}
			});
		},
		// 录取通知书的姓名输入
		inputValidate: function() {
			var oldVal;

			$('#admission input').on('blur', function() {
				var $that = $(this),
					val = $that.val(),
					actualLen = 0;
				len = 0;

				for (var i = 0; i < val.length; i++) {
					if (val.charCodeAt(i) > 126 || val.charCodeAt(i) == 94) {
						len += 2;
					} else {
						len++;
					}
					if (len <= 12) {
						actualLen++
					}
				}
				if (len > 12) {
					$that.val(val.substr(0, actualLen));
				}

				$that.removeClass('error');
			});

		},
		// 换一换功能 切换专业
		switchSpecialty: function() {
			var currMajor, currMajorSeat;
			currMajorSeat = Math.floor(Math.random() * this.collegeMajorData.length);
			currMajor = this.collegeMajorData[currMajorSeat];

			$('#admission .collegeTxt').html(currMajor.college);
			$('#admission .majorTxt').html(currMajor.major);
		},
		// 合成图片前预处理数据
		preprocessingData: function() {
			var that = this;
			$('#admission input').blur();
			$('#admission .userNameBox span').html($('#admission .userNameBox input').val());
			$('#admission .noticeBox').addClass('generate');

			that.loading();

			if (this.html2canvas) {
				this.syntheticPicture();
			} else {
				$.getScript('//s.expoon.com/test/krpano/js/html2canvas.min.js', function() {
					that.html2canvas = html2canvas
					that.syntheticPicture();
				});
			}
		},
		// 合成图片
		syntheticPicture: function() {
			var that = this;
			this.noticeImg = $('#noticeImg').clone();

			that.html2canvas(document.querySelector("#noticeImg"), {
				x          : $('#noticeImg').offset().left,
				y          : $('#noticeImg').offset().top,
				width      : $('#noticeImg').outerWidth(),
				height     : $('#noticeImg').outerHeight(),
				scale      : that.scale,
				useCORS    : true, //（图片跨域相关）
				allowTaint : false // 允许跨域（图片跨域相关）
			}).then(function(canvas) {
				canvas.style.width = '100%';
				canvas.style.height = 'auto';
				that.noticeImg = canvas;

				that.showNoticeOfGenerationDOM();
			});
		},
		// 显示关闭按钮
		showCloseBtn: function() {
			$('#admission').append(this.closeBtnDOM);

			$('#admission .closeBtn').on('click touchend', function() {
				$('#admission').remove();
				krpano.set('layer[opacityMask].visible', false);
				krpano.call('resumeRotate();');
			});
		},
		// 显示生成通知书DOM
		showNoticeOfGenerationDOM: function() {
			var that = this,
				noticeBgImg, // 背景图
				noticeBgMaskImg;

			// 生成loading
			that.generateDom(that.NoticeOfGenerationDOM);

			if (krpano.get('device.desktop')) {
				noticeBgImg = that.noticeBgTemPc[that.bgImgSeat];
				noticeBgMaskImg = that.noticeBgTemMaskPc[that.bgImgSeat];
				$('#admission .btnBox').css('background-image', 'none');

				$('#admission .btnBox p').html('点击鼠标右键保存录取通知书');
				that.showBigPicture();
			} else {
				noticeBgImg = that.noticeBgTem[that.bgImgSeat];
				noticeBgMaskImg = that.noticeBgTemMask[that.bgImgSeat];
			}

			$('#admission .bannerBox').css({ 'background-image': 'url(' + noticeBgImg + ')' }).addClass('banner0' + (that.bgImgSeat + 1));
			$('#admission .bannerMainImg').html(that.noticeImg);
			$('#admission .bannerMask').attr('src', noticeBgMaskImg);

			// 计算p标签的padding-top的值,让footer部分正好放到中间的位置
			if (!krpano.get('device.desktop')) {
				var currHeight = $(window).height() - $('#admission .bannerBox').height();
				currHeight = currHeight < 16 * 5 ? 16 * 5 : currHeight;
				var paddingTop = currHeight/2 - 30;

				$('#admission .btnBox').height(currHeight);
				$('#admission .btnBox p').css('padding-top', paddingTop);
			}

			that.html2canvas(document.querySelector(".bannerBox"), {
				scale      : that.scale,
				useCORS    : true, //（图片跨域相关）
				allowTaint : false // 允许跨域（图片跨域相关）
			}).then(function(canvas) {
				$('#admission .generationImg>img').attr('src', canvas.toDataURL('image/jpeg'))
				$('#admission .generationImg').show();
				that.showCloseBtn();

				$('#ajaxLoading').remove();
			});

		},
		// 查看大图
		showBigPicture: function() {
			$('#admission .btnBox a').attr('src', 'javascript:;');
			// 查看全景功能
			$('#admission .btnBox a').on('click', function(e){
				e.preventDefault();
				// 关闭弹窗，打开通知书活动窗口
				$('#admission .closeBtn').click();
				krpano.call('openNoticeIframe()');
			});
		},
		// loading
		loading: function() {
			$('body').append('<div id="ajaxLoading" style="background-color: rgba(0,0,0,.7);"><div style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;width: 40px;height: 40px;background-image: url(//s.expoon.com/cache/1527556924/css/user2016/images/loading.gif);background-size: contain;"></div></div>');
		}
	};
	admission = new Admission();

	if(krpanoTransmitData) {
		var currkrpanoTransmitData = krpanoTransmitData;	
	}
	// 重写krpanoTransmitData方法
	function newlyAddKrpanoTransmitData(name) {
		var data = {
			schoolStatus : schoolStatus=='1' ? true : false  // 当前场景是否有录取通知书功能
		};
		return data[name] === undefined ? currkrpanoTransmitData(name) : data[name];
	}
						  
						 
	window.timesGenerator = timesGenerator;    
	window.showAdmissionFun = admission.init.bind(admission);    
						 
	window.krpanoTransmitData = newlyAddKrpanoTransmitData;    
})(window, document);
// 高校录取通知书活动功能 - author:liwenjie end

// 红包功能(4) - author:liwenjie start 
;(function(window, document){
	var hb,
		hbData              = {},		// 红包数据
		currHbIng           = false, 	// 当前红包数据
		requestHbDataStatus = false, 	// 请求红包数据接口状态
		currHbRainIng; 		// 当前进行动画的红包

	var rainAnimateFun = {
		init : function (obj) {
			this.totalTime         = obj.totalTime || 15000; 		// 动画的持续时间
			this.imgUrl            = obj.imgUrl || '';				// 动画图片地址
			this.securityBoundary  = obj.securityBoundary || 20; 	// 安全边界, 红包雨在主区域的左右边界 
			

			this.countDownStart    = obj.countDownStart || 3; 		// 倒计时的开始时间
			this.winProbability	   = obj.winProbability || 0.1; 	// 中桨概率

			this.rainWidth         = obj.rainWidth || 80;		// 雨雪元素的宽度
			this.rainHeight        = obj.rainHeight || 117;		// 雨雪元素的高度
			this.rainMaxRotate     = obj.rainMaxRotate || 25;	// 雨雪元素的旋转角度
			this.rainZoomScale     = obj.rainZoomScale || 5;	// 雨雪元素的放大缩小比例 2- [0.8,1.2]


			this.screenShowRow	   = obj.screenShowRow || 2.5; // 每屏显示的行数

			this.eachCount         = Math.floor( $(window).width() / 2 / (this.rainWidth * ( 1 + this.rainZoomScale / 10 ))); 			// 每行的数量 当前的宽度/2行数/最大列数

			this.count             = Math.floor( this.totalTime / 2000 * this.eachCount );	// 数量

			this.speed             = 0;					// 下降的速度
			this.speedvariance     = this.speed / 6; 	// 下降速度随机变化值
			this.winningData 	   = [];				// 中奖的数据，根据中奖概率得到中奖的内容
			this.startTimerData    = []; 				// 开始定位器集合

			this.$parentBox        = null || $('body');	// 放置的窗口
			this.$rainAnimateBox   = null;				// 动画窗口
			
			
			this.mainWidth         = null;	// 主窗口宽度
			this.mainSecurityWidth = null;	// 主窗口动画宽度(安全宽度)
			this.mainHeight        = null;	// 主窗口高度
			this.liWidth           = null;	// 区域的宽度，当前主窗口宽度分成每屏数量的区域
			this.liWidthHalf       = null;	// 区域宽度的一半
			
			this.ie9Under          = false;	// ie9及以下使用jquery动画, 其它使用css3动画

			if ( navigator.appName === "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE","")) <= 9 ) {
				this.ie9Under = true;				
			}

			this.worldofwar();
		},
		// 开场动画
		worldofwar : function () {
			var that = this,
				timer,
				countDown = that.countDownStart;

			that.$worldofwarDom = $('<div class="worldofwarBox" style="-webkit-tap-highlight-color: rgba(0,0,0,0);">\
										<div class="contentBox">\
											<p class="countDown">还有<span>' + countDown + '</span>秒到达现场</p>\
											<button class="startHbRain"></button>\
											<button class="exitHbRain">有钱任性</button>\
										</div>\
									</div>');

			that.$parentBox.append(that.$worldofwarDom);
			setTimeout(function(){
				krpano.call('pauseRotate()');
			}, 0);

			that.$worldofwarDom.on('mouseup', function () {
				setTimeout(function(){
					krpano.call('pauseRotate()');
				}, 0);
			});

			// 退出开场动画及红包雨
			that.$worldofwarDom.find('.exitHbRain').on('click', function() {
				clearTimeout(timer);
				that.$worldofwarDom.remove();
				krpano.call('showHotspot()');
			});
			// 进行红包雨
			that.$worldofwarDom.find('.startHbRain').on('click', function() {
				clearTimeout(timer);
				that.$worldofwarDom.remove();
				that.createMainDom();
			});

			// 倒计时进行红包雨
			;(function countdownFun() {
				timer = setTimeout(function(){
					countDown--;
					if ( countDown > 0 ) {
						that.$worldofwarDom.find('.countDown span').html(countDown);
						countdownFun();
					} else {
						clearTimeout(timer);
						that.$worldofwarDom.remove();
						that.createMainDom();
					}
				}, 1000);
			}());
		},
		// 重新计算下降速度
		recalculateSpeed : function () {
			if( !this.totalTime ) return;

			// 根据以上方程，变形，求得未知量 this.speed,
			this.speed = ( this.screenShowRow * this.totalTime ) / ( this.count / this.eachCount + this.screenShowRow );

			this.speedvariance = this.speed / this.screenShowRow / 2 ;
		},
		// 计算中奖的数据
		winningContent : function () {
			var winningCount = Math.ceil(this.winProbability * this.count),
				currPosition;

			while (true) {
				currPosition = parseInt(Math.random() * this.count);

				if ( winningCount === this.winningData.length ) {
					break;
				}
				if ( $.inArray(currPosition, this.winningData) < 0 ) {
					this.winningData.push(currPosition);
				}
			}
		},
		// 创建动画主DOM
		createMainDom : function () {
			var that = this;

			that.$rainAnimateBox = $('<div id="rainAnimateBox" class="rainAnimateBox" style="-webkit-tap-highlight-color: rgba(0,0,0,0);">\
										<div class="contentBox"></div>\
										<div class="closeRainAnimate">关闭活动</div>\
									</div>');

			that.$parentBox.append(that.$rainAnimateBox);

			that.mainWidth         = that.$rainAnimateBox.width();
			that.mainSecurityWidth = that.mainWidth - that.securityBoundary * 2;
			that.mainHeight        = that.$rainAnimateBox.height();
			that.liWidth           = parseInt(that.mainSecurityWidth / that.eachCount);
			that.liWidthHalf       = parseInt(that.liWidth / 2);

			that.liClickEvent();
			that.recalculateSpeed();
			that.winningContent();

			that.forAnimRain();
		},
		// 循环动画元素
		forAnimRain : function () {
			var that  = this;

			maxStartTime = 0;
			// 添加动画
			for ( var i = 0; i < that.count; i++){
				var position   = i % that.eachCount,			// 在第几个区域显示
					groupIndex = parseInt(i / that.eachCount),	// 第几组开始显示 下标从0开始
					startTime;

				startTime = groupIndex * that.speed / this.screenShowRow + ( Math.random() * (that.speed / this.screenShowRow) );

				maxStartTime = Math.max(maxStartTime, startTime);

				;(function(position, i, groupIndex){
					that.startTimerData.push(setTimeout(function(){
						that.createAnimDom(position, i, groupIndex);
					}, startTime));
				}(position, i, groupIndex));
			}
		},
		// 添加动画元素
		createAnimDom : function (position, index, groupIndex) {
			var currRotate 			= (Math.random() - 0.5) * this.rainMaxRotate * 2; 		// 旋转角度 范围 ( -this.rainMaxRotate, +this.rainMaxRotate )   transform: rotate(' + currRotate + 'deg);

				$html    			= $('<div class="hbBox" style="width: ' + this.rainWidth + 'px; height: ' + this.rainHeight + 'px;"><img src="//s.expoon.com/image/z/krpano/images/hb/hb.png"></div>'),	// 雨的DOM

				// 区域一半中的安全位置按钮比例
				safetyVal 			= this.rainWidth / this.liWidthHalf,
				// 安全比例是0.2 ，左区域区间为(-1, -0.2) 右区域区间为(0, 0.8)
				currWidthVariance 	= groupIndex % 2 === 0 ? Math.random() - ( 1 + safetyVal ) : Math.random() * (1 - safetyVal); 
				// 左区间小于-1的, 重新计算
				currWidthVariance   = currWidthVariance < -1 && groupIndex % 2 === 0 ? currWidthVariance + safetyVal : currWidthVariance;
				// 获得元素要显示的左位置 this.liWidth * position + this.liWidthHalf 第几个区域的中间位置； currWidthVariance * this.liWidthHalf 左右区域的活动值
				currLeft 			= parseInt( this.liWidth * position + this.liWidthHalf + currWidthVariance * this.liWidthHalf ) + this.securityBoundary,
				currClass 			= 'animLi' + index;


			$html.addClass(currClass);

			if( this.ie9Under ) {
				$html.css({
					'left' : currLeft,
					'top'  : '-' + ( this.rainHeight + 5 ) + 'px'
				});
			} else {
				$html.css({
					'transform': 'translate3d(' + currLeft + 'px, -' + ( this.rainHeight + 5 ) + 'px, 0)'
				});
			}

			this.$rainAnimateBox
				.find('.contentBox')
				.append($html);

			this.addAnimEffect(currClass, currLeft);
		},
		// 添加动画
		addAnimEffect : function (currClass, currLeft) {
			var currSpeed = this.speed + ( Math.random() - 0.5 ) * 2 * this.speedvariance,
				endTop 	  = this.mainHeight + 20,
				that 	  = this;

			that.executeAnim(this.$rainAnimateBox.find('.' + currClass).data('endTop', endTop).data('currSpeed', currSpeed), endTop, currSpeed, currLeft);
		}, 
		// 执行动画
		executeAnim : function ($that, endTop, currSpeed) {
			var that       = this,
				currClass  = 'a' + Math.random().toString(36).substr(2),
				currRotate = (Math.random() - 0.5) * this.rainMaxRotate * 2,
				currScale  = (Math.random() - 0.5) / 5 * this.rainZoomScale + 1;

			if ( this.ie9Under ){
				$that.animate({
					top: endTop
				}, currSpeed, 'linear', function(){
					　that.executeAnimEnd($(this));
				});
			} else {
				$('body').append('<style id="style' + currClass +'">' +
					'.' + currClass + ' {' +
						'animation : anim' + currClass + ' ' + currSpeed + 'ms linear;' +
					'} ' +
					'@keyframes anim' + currClass + '{' + 
					    '0% { ' +
					        'transform: translate3d(' + currLeft + 'px, -' + ( this.rainHeight + 5 ) + 'px, 0) rotate(' + currRotate + 'deg) scale(' + currScale + ');' +
					    '}' +
					    '100% {' +
					        'transform: translate3d(' + currLeft + 'px, ' + endTop + 'px, 0) rotate(' + currRotate + 'deg) scale(' + currScale + ');' +
					    '} ' +
					'}' +
				'</style>');

				$that.addClass(currClass).on('animationend', function(){
					that.executeAnimEnd($(this), currClass);
				});
			}
		},
		// 当前动画执行完成
		executeAnimEnd : function ($that, currClass ) {
			var that = this;
			$that.remove();

			currClass &&　$('#style' + currClass ).remove();

			// 全部动画执行完成，未中奖
			if( !this.$rainAnimateBox.find('.contentBox').children().size() ) {
				that.closeAnimate();
				krpano.call('closeLayer()');
				krpano.call('showLayer(noCloseBlackMask)');
				this.noHbWinDom();
			}
		},
		// 中止动画
		stopAnim : function ($that) {
			var that = this,
				thisClass = $that ? $that.attr('class') : '';

			clearTimeout(this.countDownTimer);

			// 清空开始定时器
			$.each(that.startTimerData, function(index, el){
				clearTimeout(el);
			});

			// 并移除多余的元素
			$.each(that.$rainAnimateBox.find('.contentBox > div'), function(index, el){
				var currClass = $.trim($(el).attr('class').replace(/animLi\d*/, ''));

				if( thisClass !== $(el).attr('class') ){
					$(el).remove();
					currClass &&　$('#style' + currClass ).remove();
				}
			});
		},
		// 添加点击事件
		liClickEvent : function () {
			var that = this;

			// 鼠标滑入暂停动画
			this.$rainAnimateBox.find('.contentBox').on('mouseenter touchend', 'div', function () {
				if( that.ie9Under ) {
					$(this).css({'z-index': 1}).stop();
				} else {
					$(this).css({'z-index': 1}).css({
						'animation-play-state' : 'paused'
					})
				}
			});

			this.$rainAnimateBox.find('.contentBox').on('mouseleave', 'div', function () {
				var endTop 	  = $(this).data('endTop'),
					currSpeed = $(this).data('currSpeed'),
					currTop   = parseInt($(this).css('top')),
					isClick   = $(this).data('isClick') || false;

				if( isClick ) return false;

				if( that.ie9Under ) {

					// 计算得到当前距离剩余的时间
					currSpeed = currSpeed / (endTop + that.rainHeight) * (endTop -currTop); 

					$(this).css({'z-index': 'none'});
					that.executeAnim($(this), endTop, currSpeed);

				} else {

					$(this).css({'z-index': 1}).css({
						'animation-play-state' : 'running'
					});
				}
			});

			this.$rainAnimateBox.find('.contentBox').on('click touchstart', 'div', function () {
				var currPosition = /(?!animli)(\d+)\s+/.exec($(this).attr('class'))[0];

				$(this).data('isClick', true);

				currPosition = +currPosition;

				if ( that.winningData.indexOf(currPosition) >= 0 ) {
					that.winning($(this), currPosition);
				} else {
					that.notWinning($(this), currPosition);
				}
			});

			this.$rainAnimateBox.find('.contentBox').on('transitionend', 'div', function(){
				var currClass 	 = $(this).attr('class').replace(/animLi\d+\s+/, '');

				that.executeAnimEnd($(this), currClass);
			});

			// 关闭动画 
			that.$rainAnimateBox.find('.closeRainAnimate').on('click touchstart', function () {
				that.closeAnimate();
				setTimeout(function(){
					krpano.call('closeLayer()');
				},0 );
			});


			that.$rainAnimateBox.on('mouseup', function () {
				setTimeout(function(){
					krpano.call('pauseRotate()');
				}, 0);
			});
		},
		// 中奖动画
		winning : function ($that, currPosition) {
			this.stopAnim($that);

			this.closeAnimate();
		
			krpano.call('showLayer("noCloseBlackMask")');
			hb.init(currHbRainIng.hb_id, currHbRainIng.id, true);
		},
		// 未中奖动画
		notWinning : function ($that, currPosition) {
			this.executeAnimEnd($that);
		},
		// 红包结束未中奖页面
		noHbWinDom : function () {
			var html = '<div id="hbBox" class="noHbWinBox">' +
							'<h3>啊哦~没有抽到红包，<br />去别的场景看看吧~</h3>' +
							'<div class="nohbWinBox"></div>' +
						'</div>';
			$('body').append(html);
		},
		// 关闭动画
		closeAnimate : function () {
			this.stopAnim();

			this.$rainAnimateBox.remove();
			$('#iframeHbRainBox').remove();

			krpano.call('showHotspot()');
		}
	};
	// 初始化判断红包雨
	// 打开红包的红包类型
	var hbRainObj = {
		init : function () {
			this.getHbRainDataUrl = '/Z/Index/getHbRainList'; //　获取红包雨列表数据

			this.currRandomHbSceneIndex = Math.floor( Math.random() * 5 ); // 打开场景中第几个场景显示红包雨，1-5

			this.hbRainData = {}; 		// 红包雨数据
			this.currHbRainRandomData;	// 当前的随机红包
			this.showHbDataId = []; 	// 显示的红包数据ID

			this.getHbRainData();
		},
		// 获取红包雨接口
		getHbRainData : function () {
			var that = this;
			$.ajax({
				url      : that.getHbRainDataUrl,
				type     : 'GET',
				dataType : 'json',
				data     : {
					user_id: user_id
				},
				success: function (res) {
					var hbRainRandomData = []; // 所有的随机红包数据

					// 获得红包数据
					$.each(res.hbData, function (index, el) {
						var currCoding 		   = res.codingArr[el.id],
							currCodingCity     = currCoding && currCoding.city,
							currCodingProvince = currCoding && currCoding.province;

						hbData[el.id] = el;

						// 是否有红包的内空,及城市或省的数据
						if ( !currCoding || (!currCodingCity && !currCodingProvince) ) {
							that.showHbDataId.push(el.id);
						} 
						//红 包领取地区中有些客户端数据及客户端数据不为空,分别判断城市和省份,
						else if ( ((currCodingCity && currCodingCity.length >= 0) || (currCodingProvince && currCodingProvince.length >=0)) && res.clientIdArr.city && res.clientIdArr.province ) {

							if( (currCodingCity && currCodingCity.indexOf(res.clientIdArr.city) >= 0) || ( currCodingProvince && currCodingProvince.indexOf(res.clientIdArr.province) >= 0)  ) {
								that.showHbDataId.push(el.id);
							}
						}
					});

					// 获得场景红包雨数据
					$.each(res.hbRainData, function (index, el) {

						// 判断当前客户端是否可用些红包雨
						if ( that.showHbDataId.indexOf(el.hb_id) >= 0  ) {
							if ( el.pano_id ) {
								that.hbRainData[el.pano_id] = el;
							} else {
								hbRainRandomData.push(el);
							}
						}
					});

					// 有随机红包
					if( hbRainRandomData.length ) {
						that.currHbRainRandomData = hbRainRandomData[parseInt(Math.random() * hbRainRandomData.length)];
					} else {
						that.currHbRainRandomData = false;
					}

					requestHbDataStatus = true;
					// 有currHbIng, 说明有打开的红包数据, 再次打开
					if ( currHbIng ) {
						hb.init(currHbIng.hbId, currHbIng.id)
					}
					that.hbDataSuccess();

					// 为真, 说明接口请求成功后, xml加载后, 未添加红包标注点
					if( krpano && krpano.get('isShowHbStatus') === 'false' ) {
						krpano.call('loadHotspotHb()');
					}
				}
			});
		},
		// 红包雨接口请求成功, 整理数据, 以备krpano中使用
		hbDataSuccess : function () {
			var showHbDataId = this.showHbDataId;

			if(window.krpanoTransmitData) {
				var currkrpanoTransmitData = window.krpanoTransmitData;	
			}

			// 重写krpanoTransmitData方法
			function newlyAddKrpanoTransmitData(name) {
				var id,
					data = {
						requestHbDataStatus : requestHbDataStatus  // 红包接口请求状态
					};

				if( name.indexOf('hb') === 0 ) {
					id = name.replace('hb', '');
					return showHbDataId.indexOf(id) >= 0 ? true : false;
				}

				return data[name] === undefined ? currkrpanoTransmitData(name) : data[name];
			}

			window.krpanoTransmitData = newlyAddKrpanoTransmitData;    
		},
		// 当前要显示的红包雨内容
		handleShowHbRain : function (currOpenIndex) {
			var currPanoId    = krpano.get('xml.scene').replace('scene', '');

			if( this.hbRainData[currPanoId] ) {
				// 当前场景有设置的红包雨
				currHbRainIng = this.hbRainData[currPanoId];
				this.setHbRainAnimate();
				delete this.hbRainData[currPanoId];

			} else if ( this.currHbRainRandomData && currOpenIndex >= this.currRandomHbSceneIndex ) {

				// 判断随机的红包雨是否显示
				currHbRainIng = this.currHbRainRandomData;
				this.setHbRainAnimate();
				this.currHbRainRandomData = false;
			}
		},
		// 设置当前场景的红包雨
		setHbRainAnimate : function () {
			var countDown = parseInt(currHbRainIng.last_time),
				duration  = parseInt(currHbRainIng.long_time),
				// count     = duration * 2,
				rainWidth, rainHeight, screenShowRow;

			krpano.call('closeLayer()');
			krpano.call('hideHotspot("search")');
			krpano.call('hidethumbs()');


			if( krpano.get('device.mobile') ) {
				rainWidth     = 40;
				rainHeight    = 59;
				screenShowRow = 3.5;
			} else {
				rainWidth     = 80;
				rainHeight    = 117;
				screenShowRow = 2.5;
			}

			rainAnimateFun.init({
				totalTime      : duration * 1000,	// 总时间
				countDownStart : countDown,			// 倒计时
				rainWidth      : rainWidth,			// 元素正常的宽
				rainHeight     : rainHeight,		// 元素正常的高
				screenShowRow  : screenShowRow		// 显示的行高
			});	
		}
	};

	function Hb(){
		this.getRbInfoUrl        = location.origin + '/Z/Index/getRbInfo?user_id=' + user_id + '&order='; // 生成的二维码的页面 {user_id:用户ID, order:订单号}
		this.getRdOrderStatusUrl = '/Z/Index/getRdOrderStatus'; 						// 轮询,查扫码状态的接口, method:get; data:{order:订单号}
		this.addHbOrderUrl       = '/Z/Index/addHbOrder'; 								// 显示二维码或已领取完的状态, method:post; data:{id: 点ID, hb_id: 红包ID, user_id: 用户ID, time: 10位时间戳, token: 时间戳+token的md5加密}
		this.addHbOrder2Url      = '/Z/Index/addHbOrder2'; // 移动端点击跳转

		this.token       = 'expoon!@#321'; 	// token值
		this.timer       = null;			// 轮询的setTimeout变量
		
		this.user_id     = user_id; 		// 用户ID
		
		this.id          = null; 			// 红包点ID
		this.hbId        = null; 			// 红包ID
		this.hbType      = '';				// 红包类型
		this.issued      = ''; 				// 发布者名称 
		this.blessing    = ''; 				// 祝福语 
		this.question    = '';				// 问题
		this.answer      = '';				// 问题答案
		this.command     = '';				// 口令内容
		this.answerError = '啊哦~答错了，再接再厉！'; // 答案错误的提示
		
		this.order       = ''; 				// 订单号
 
		// 主框架DOM
		this.$mainBoxDom = $('<div id="hbBox"><i class="closeBtn sprite"></i></div>');

		// 红包主首页DOM
		this.homePageDom =  '<div class="homePageBox template1">' +
								'<i class="hbIcon sprite"></i>' +
								'<h4></h4>' +
								'<p>发给你一个红包</p>' +
								'<div><p></p></div>' + 
								'<button type="button" class="sprite"></button>' +
							'</div>';
		// 口令红包
		this.homePageCommandDom = '<div class="homePageBox template3">' +
										'<h2>口令红包</h2>' +
										'<input type="text" placeholder="输入口令领取现金红包">' +
										'<button type="button" class="sprite">完成</button>' +
									'</div>';
		// 问答红包
		this.homePageInterlocutionDom = '<div class="homePageBox template3">' +
											'<h2 class="mt80">问答红包</h2>' +
											'<p class="twoLevelTitle">提问:</p>' +
											'<input type="text" placeholder="输入口令领取现金红包">' +
											'<button type="button" class="sprite">完成</button>' +
										'</div>';
		// 回答错误
		this.answerErrorDom = '<div class="noHbBox template2">' +
									'<h3>啊哦~<br />答错了, 再接再历!</h3>' +
									'<div class="hbIcon sprite"></div>' +
								'</div>';
		// 无红包DOM
		this.noHbDom =  '<div class="noHbBox template2">' +
							'<h3>额... 来晚一步, <br />红包已全部领完啦!</h3>' +
							'<div class="hbIcon sprite"></div>' +
						'</div>';
		// 领取红包DOM（标注点的领取红包）
		this.receiveHbDom = '<div class="receiveHbBox template2">' +
								'<h3>恭喜你找到了一个红包,<br />快快领取吧!</h3>' +
								'<div class="QRCodeBox"><canvas id="hbQRCode" style="display:none"></canvas><img style="display:none"><div style="display:none; overflow: hidden;" id="hbQRCodeFlash"></div><i class="WXIcon sprite"></i></div>' +
								'<p class="hbTips">使用微信扫一扫领取</p>' +
							'</div>';

		// 领取红包DOM（红包雨的领取红包）(flash下不会出现)
		this.receiveHbRainDom = '<div class="receiveHbRainBox template2">' +
									'<h3>恭喜！成功抓住一只红包君~<br />快用微信扫描二维码试试手气吧！</h3>' +
									'<div class="QRCodeBox"><canvas id="hbQRCode"></canvas></div>' +
								'</div>';

		// 领取成功DOM
		this.receiveHbSuccessDom =  '<div class="receiveHbSuccessBox template2">' +
										'<h3><span>领取成功!</span><br />分享场景给朋友，财运更旺哦~</h3>' +
										'<div class="QRCodeBox"><canvas id="receiveHbSuccessQRCode" style="display:none"></canvas><div id="receiveHbSuccessQRCodeFlash" style="display:none; overflow: hidden;"></div></div>' +
										'<p class="hbTips">使用微信扫一扫, 分享给好友</p>' +
										'<div class="hbIcon sprite"></div>' +
									'</div>';
		// 已领取DOM
		this.receivedHbDom =   '<div class="receivedHbBox template2">' +
									'<h3>啊哦~您已经领过了呢~<br />分享场景给朋友，财运更旺哦~</h3>' +
									'<div class="QRCodeBox"><canvas id="receivedHbQRCode" style="display:none"></canvas><div id="receivedHbQRCodeFlash" style="display:none; overflow: hidden;"></div></div>' +
									'<p class="hbTips">使用微信扫一扫, 分享给好友</p>' +
									'<div class="hbIcon sprite"></div>' +
								'</div>';
		// 红包失效DOM
		this.failureHbDom = '<div class="failureHbBox template1">' +
								'<i class="hbIcon sprite"></i>' +
								'<h4></h4>' +
								'<p>发给你一个红包</p>' +
								'<div>未及时领取，该红包已失效。<br/>您可看全景，继续找红包</div>' + 
								'<button type="button" class="sprite"></button>' +
							'</div>';
	}
	Hb.prototype = {
		// 初始化
		init: function (hbId, id, hbRain) {
			currHbIng = {
				id   : id,
				hbId : hbId
			};

			if ( !requestHbDataStatus ) return false;
			this.id       = id;			// 红包点ID
			this.hbId     = hbId;		// 红包ID

			hbData[hbId]  = hbData[hbId] || {};

			this.isHbRain   = hbRain || false;				// 是否是红包雨
			this.hbType     = hbData[hbId].hb_type || '1';	// 红包类型 1-普通红包； 2-口令红包；3-普通问答红包；4-提问红包
			this.issued     = hbData[hbId].rd_user || '';		// 发布者名称
			this.blessing   = hbData[hbId].rd_words || '';	// 祝福语
			this.question   = hbData[hbId].hb_question || ''; // 问题
			this.answer     = hbData[hbId].hb_answer || '';	// 问题答案
			this.command    = hbData[hbId].hb_command || '';	// 口令内容
			this.panoId     = krpano.get('xml.scene').replace('scene', ''); // 场景ID
			this.userAnswer = ''; // 口令、问答红包的用户回答的口令和答案

			this.homePage();
		},
		// 添加DOM
		generateDom : function (DOM, addClassName ) {
			var that = this,
				$hbBox = $('#hbBox');

			// 有此DOM结构，添加数据
			if ( $hbBox.size() > 0 ) {
				that.removeContentDom();
				$hbBox.removeClass('veins mobileBg01 mobileBg02 mobileBg03 receiveHbRain');

				addClassName && $hbBox.addClass(addClassName);

				$hbBox.append(DOM);
			} 
			// 无此DOM结构，添加结构和数据
			else {
				that.$mainBoxDom.removeClass('veins mobileBg01 mobileBg02 mobileBg03 receiveHbRain');
				addClassName && that.$mainBoxDom.addClass(addClassName);

				that.$mainBoxDom.append(DOM);
				// 添加关闭事件
				that.$mainBoxDom.find('.closeBtn').on('touchend', function () {
					krpano.call('closeLayer()');
				});
				if ( krpano.get("device.flash") ) {
					var openhtml = "<div id='iframeBox' style='position:absolute;left:50%;top:50%;z-index: 13999; visibility: visible; opacity: 1;margin-left:-160px; margin-top:-210px; width:320px; height:420px; background-color:#fff; -webkit-user-select: none;pointer-events: none;'>" +
										"<iframe name='panoramaPlugin' frameborder='0' src='//s.expoon.com/test/krpano/html/blank.html' width='100%' height='100%' style='background:url(//s.expoon.com/test/krpano/images/fbloader.gif) no-repeat center center #000;' allowtransparency='true'></iframe>" +
									"</div>";
					$("body").append(openhtml);

					that.$mainBoxDom.css({'border-radius': 0});
				};
				$('body').append(that.$mainBoxDom);
			}
		},
		// 显示背景不可关闭层
		showNoCloseBg : function () {
			$('body').append('<div id="hbNoCloseBg" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0); z-index: 13999;"></div>');
		},
		// 隐藏不可关闭的背景
		hideNoClassBg : function (){
			$('#hbNoCloseBg').remove();
		},
		// 移除此DOM的内容
		removeContentDom : function () {
			clearTimeout(this.timer);
			$('#hbBox>div').remove();
		},
		// 关闭窗口
		closeDom : function () {
			this.removeContentDom();
			$('#hbBox').remove();
			$('#iframeBox').remove();
			$('#hbNoCloseBg').remove();
		},
		// 红包主首页
		homePage : function () {
			var that = this,
				$homePageDom;

			// 普通红包
			$homePageDom = $(that.homePageDom);
			$homePageDom.children('h4').html(that.issued);
			$homePageDom.find('div p').html(that.blessing);

			// 点击开的事件
			$homePageDom.children('button').on('click touchend', function (e){

				if ( that.isHbRain ) {
					krpano.set('layer[blackMask].ondown', 'closeLayer()');
				}

				// 普通红包
				if( that.hbType === '1' ) {

					that.md5EncryptToken();
				} else if ( that.hbType === '2' ) {
					// 口令红包
					var $homePageDom = $(that.homePageCommandDom);
					that.commandAndAnswerevent($homePageDom, that.command);
				} else if ( that.hbType === '3' || that.hbType === '4') {
					// 回答红包
					var $homePageDom = $(that.homePageInterlocutionDom);
					$homePageDom.find('.twoLevelTitle').html('提问：' + that.question );
					that.commandAndAnswerevent($homePageDom, that.answer);
				}


			});

			that.generateDom($homePageDom, 'veins');
		},
		// 口令红包及回答红包的点击开事件与输入框事件
		commandAndAnswerevent : function ($homePageDom, answer) {
			var that = this;

			that.generateDom($homePageDom, 'mobileBg03');


			// 点击开的事件
			$homePageDom.children('button').on('click touchend', function (e){
				var passwordTxt = $homePageDom.find('input').val();

				if( !passwordTxt ) return;

				if ( answer === '' || passwordTxt === answer ) {
					that.userAnswer = passwordTxt;
					that.md5EncryptToken();
				} else {
					// 回答错误页面
					var $answerErrorDom = $(that.answerErrorDom);
					that.generateDom($answerErrorDom, '');
				}
			});

			// $homePageDom.find('input').on('focus', function () {
			// 	var val = $(this).val();
			// 	if( val === that.answerError ) {
			// 		$(this).val('').removeClass('tipError');
			// 	}
			// });
		},
		// 无红包
		noHb : function () {
			var that = this,
				$noHbDom = $(that.noHbDom);

			if( krpano.get('device.mobile') ){
				$noHbDom.children('h3').html('额...来晚一步，红包已全部领完啦！<br />再到其它场景找一找~');
			}

			that.generateDom($noHbDom, 'mobileBg02');
		},
		// 领取红包（标注点）
		receiveHb : function () {
			var that = this,
				QRCodeUrl = that.getRbInfoUrl + that.order, // 组合二维码的链接
				$receiveHbDom = $(that.receiveHbDom);

			if( krpano.get('device.mobile') ){
				$receiveHbDom.children('.hbTips').html('长按识别图中二维码，领取红包');
			}

			that.generateDom($receiveHbDom, 'mobileBg01');

			// 生成二维码 
			if(krpano.get('device.flash') ) {
				$('#hbQRCodeFlash').show();

				new QRCode('hbQRCodeFlash', {
				  text: QRCodeUrl,
				  width: 165,
				  height: 165
				});

			} else {
				$('#hbQRCode').next().show();

				new QRCode('hbQRCode', {
				  text: QRCodeUrl
				});
				var $hbQRCode = document.getElementById('hbQRCode');
				$receiveHbDom.find('img').attr('src', $hbQRCode.toDataURL('image/jpeg'));
			}

			// PC端 轮询查看状态
			if ( krpano.get('device.desktop') ){
				clearTimeout(that.timer);
				that.timer = setTimeout(function(){
					that.pollingReceiveHbStatue();
				}, 3000);
			} else {
				// 移动端
				that.pageNoActive();
			}
		},
		// 领取红包（红包雨）(无flash)
		receiveHbRain : function () {
			var that = this,
				QRCodeUrl = that.getRbInfoUrl + that.order, // 组合二维码的链接
				$receiveHbRainDom = $(that.receiveHbRainDom);

			that.generateDom($receiveHbRainDom, 'receiveHbRain');

			// 生成二维码 
			new QRCode('hbQRCode', {
			  text: QRCodeUrl
			});

			// 轮询查看状态
			clearTimeout(that.timer);
			that.timer = setTimeout(function(){
				that.pollingReceiveHbStatue();
			}, 3000);
		},
		// 领取成功
		receiveHbSuccess : function () {
			this.generateDom(this.receiveHbSuccessDom, 'mobileBg02');

			// 生成二维码 
			if(krpano.get('device.flash') ) {
				$('#receiveHbSuccessQRCodeFlash').show();
				new QRCode('receiveHbSuccessQRCodeFlash', {
				  text: window.location.href,
				  width: 165,
				  height: 165
				});
			} else {
				$('#receiveHbSuccessQRCode').show();
				new QRCode('receiveHbSuccessQRCode', {
				  text: window.location.href
				});
			}
		},
		// 已领取
		receivedHb : function () {
			this.generateDom(this.receivedHbDom, 'mobileBg02');

			// 生成二维码 
			if(krpano.get('device.flash') ) {
				$('#receivedHbQRCodeFlash').show();
				new QRCode('receivedHbQRCodeFlash', {
				  text: window.location.href,
				  width: 165,
				  height: 165
				});
			} else {
				$('#receivedHbQRCode').show();
				new QRCode('receivedHbQRCode', {
				  text: window.location.href
				});
			}
		},
		// 红包失效
		failureHb : function () {
			var that = this,
				$failureHbDom = $(that.failureHbDom);
			$failureHbDom.children('h4').html(that.issued);

			this.generateDom($failureHbDom, 'veins');
		},
		// md5加密数据
		md5EncryptToken : function () {
			var that = this,
				time = parseInt(new Date().getTime()/1000), // 10位的时间戳
				newToken = time + this.token;

			showAjaxLoading();
			if ( currMd5 ) {
				newToken = currMd5(newToken);
				that.judegDeviceOperate(time, newToken);
			} else {
				$.getScript('//s.expoon.com/test/krpano/js/md5.min.js', function () {
					currMd5 = md5;
					time = parseInt(new Date().getTime()/1000); // 10位的时间戳
					newToken = time + that.token;
					newToken = currMd5(newToken);
					that.judegDeviceOperate(time, newToken);
				});
			}
		},
		// 加密成功后,移动端跳转页面,PC端请求接口
		judegDeviceOperate: function(time, newToken) {
			var that 	  = this,
				sceneName = krpano.get('xml.scene'),
				href      = location.href,
				ua 		  = navigator.userAgent.toLowerCase(),
				win 	  = window,
				isConfigSite = 1, 		// 如果全景是iframe层，判断是否是配置地址，1-是配置地址；0不是
				param, paramStr = '',
				backPath, jumpPath;

			if( krpano.get('device.desktop') ) {
				that.requestAddHbOrderAjax(time, newToken);
			} else {
				if ( !/micromessenger/.test(ua) ){
					mobileNoWXTips('请前往微信领取红包');
					hideAjaxLoading();
					return false;
				}
				if(testUserId) {
					// 测试地址
					backPath = href.split('?')[0]+'?sn=' + krpano.get('xml.scene');
				} else {
					// 正式地址
					backPath = href.split('panorama')[0] + 'panorama/' + krpano.get('xml.scene').replace('scene', '');

					if( z_platform_id != 1 ){
						backPath += '/2';
					}
				}
				backPath = encodeURIComponent(backPath);
				// iframe 嵌套
				if(window !== window.parent) {
					win      = window.parent;

					if( !isIframeMark() ) {
						// 不是配置的地址
						isConfigSite = 0;
					} else {
						// 是配置地址，传0
						backPath = 0;
					}
				}

				param = {
					id             : that.id,
					type           : this.isHbRain ? 2: 1, // 红包雨是2，标注点是1
					hb_id          : that.hbId,
					user_id        : that.user_id,
					pano_id        : that.panoId,  		// 场景ID
					answer         : that.userAnswer,  // 口令、问答红包的口令、答案
					time           : time,
					token          : newToken,
					go_back        : backPath,
					is_config_site : isConfigSite
				}

				$.each(param, function(key, value){
					paramStr += key + '=' + value + '&';
				});
				paramStr = paramStr.substr(0, paramStr.length - 1);

				jumpPath = that.addHbOrder2Url +  '?' + paramStr;

				// hideAjaxLoading();
				// krpano.call('closeLayer()');
				win.location.href = jumpPath;
			}
		},
		// 用户点击打开,请求接口,判断是否是可领取或已过期
		requestAddHbOrderAjax : function (time, newToken) {
			var that = this;
			$.post(that.addHbOrderUrl, {
				id      : that.id || 0,		
				type 	: this.isHbRain ? 2: 1, // 红包雨是2，标注点是1
				hb_id   : that.hbId,	// 红包ID
				user_id : that.user_id,	// 用户ID
				pano_id : that.panoId,  // 场景ID
				answer  : that.userAnswer,  // 口令、问答红包的口令、答案
				time    : time,			// 十位时间戳
				token   : newToken		// md5加密token
			}, function (res) {
				hideAjaxLoading();
				if ( res === 'error1' || res === 'error2' ||  res === 'error3' || res === 'error4' || res === 'error5' ) {
					// token验证不通过 or 当前活动还没标点, 不允许发放红包 or 没有中奖 or 活动未开始或已过期 or 可用余额小于红包的最小金额
					that.noHb();
				} else if ( res === 'error6') {
					// 回答错误页面
					var $answerErrorDom = $(that.answerErrorDom);
					that.generateDom($answerErrorDom, '');
				} else {
					if ( res.length === 16 ){
						that.order = res;

						if( !that.isHbRain ) {
							// 标注点进入的领取红包
							that.receiveHb();
						} else {
							// 红包雨进入的领取红包
							that.receiveHbRain();
						}
					} else {
						that.noHb();
					}
				}

			});
		},
		// 轮询领取红包状态的
		pollingReceiveHbStatue : function (){
			var that = this;

			that.timer = setTimeout(function () {
				that.hbStatueStatusAjax();
			}, 5000);
		},
		// 红包状态的ajax请求
		hbStatueStatusAjax: function () {
			var that = this;
			$.get(that.getRdOrderStatusUrl, {
				order: that.order
			}, function ( res ) {
				if ( res==='error1' || res==='error5' ) {
					// 订单已被领取 or 超过可领取次数
					that.receivedHb();
				} else if ( res==='error2' ) {
					// 订单已过期
					that.failureHb();
				} else if ( res==='success' ) {
					// 领取成功
					that.receiveHbSuccess();
				} else {
					// res === 'error3' 继续轮询 res === 'error' 发生失败
					// 以上情况都继续轮询
					that.pollingReceiveHbStatue();
				}
			});
		},
		// 移动端 - 页面在非活动页面
		pageNoActive: function () {
			var hiddenProperty = 'hidden' in document ? 'hidden' :    
			    'webkitHidden' in document ? 'webkitHidden' :    
			    'mozHidden' in document ? 'mozHidden' :    
			    null;
			var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
			var onVisibilityChange = function(){
			    if (document[hiddenProperty]) {    
			        // 页面非激活
					krpano.call('closeLayer()');
			    }
			    document.removeEventListener(visibilityChangeEvent, onVisibilityChange);
			}
			document.addEventListener(visibilityChangeEvent, onVisibilityChange);
		}
	};


	if(krpanoTransmitData) {
		var currkrpanoTransmitData = krpanoTransmitData;	
	}
	// 重写krpanoTransmitData方法
	function newlyAddKrpanoTransmitData(name) {
		var data = {
			requestHbDataStatus : requestHbDataStatus  // 红包接口请求状态
		};
		return data[name] === undefined ? currkrpanoTransmitData(name) : data[name];
	}

	hb = new Hb();
	hbRainObj.init();

	window.openHb           = hb.init.bind(hb);    
	window.closeHb          = hb.closeDom.bind(hb);
	window.handleShowHbRain = hbRainObj.handleShowHbRain.bind(hbRainObj);

	window.krpanoTransmitData = newlyAddKrpanoTransmitData;    
})(window, document);
// 红包功能 - author:liwenjie end 


// 周边功能(5) - author:liwenjie start
;(function(window, document){

	function Periphery () {
		this.peripheryListUrl   = '/Z/AreaPano/getAreaPano/user_id/' + user_id;
		this.peripheryList      = null; 		// 列表和组的二维数组列表
		this.peripheryGroupList = null; 		// 周边组列表
		this.peripheryThumbList = null; 		// 周边当前组展位列表

		this.ambitGroup = null;		// url上有参数周边组，

		this.initOpen = true;

		this.AjaxDataStatus = false;

		this.panoFormChinaso = panoUrl.indexOf('form_p=chinaso')>=0 ? true : false;	// 是否有参数 form_p=chinaso
		this.panoFormTencent = panoUrl.indexOf('form_p=tencent')>=0 ? true : false;	// 是否有参数 form_p=tencent

		this.returnBtnIconSrc = lantype ==2 ? '//s.expoon.com/test/krpano/images/icon-ambitus-en.png' : '//s.expoon.com/test/krpano/images/icon-ambitus-ch.png'; // 返回图片的版本是英文还是中文

		this.returnBtnClass = browserRedirect() == "pc" ? 'ambitusReturnIcon' : 'ambitusReturnIconWap'; // pc与移动端使用不同的类
	}
	Periphery.prototype = {
		init: function() {
			if( panoUrl.indexOf("ambit=") > 0 ) {
				this.judgeParam();
			} else if( ambitusOpen == 'Y' ) {
				this.requestPeripheryListAjax(); // 请求周边数据
			}
		},
		// 打开周边
		openPeriphery : function () {
			if(this.initOpen) {
				this.addGroupList();
			}
			krpano.call('ambitusClickOpenFun()');
		},
		// 请求周边数据
		requestPeripheryListAjax : function (isCurrPanoId, ambitGroup) {
			var that = this;
			$.ajax({
				url     : that.peripheryListUrl,
				success : function(data){
					if(data.length > 0){
						that.peripheryList      = [];
						that.peripheryGroupList = [];
						$.each(data, function(index, el){
							var name = unescape(lantype==1 ? el.cate_name : el.en_cate_name);

							if( el.id && el.id.length ) {
								that.peripheryList.push(el);

								// 重组数据
								that.peripheryGroupList.push([
									index,
									name.replace(/\,/g,'%^FF0C'),
									el.ambitusGroupName.replace(/\,/g,'%^FF0C')
								]);
							}
						});


						if( that.peripheryGroupList.length) {
							that.AjaxDataStatus = true;


							if ( krpano && krpano.get('layer[ambitusIcon].isInit') ) {
								krpano.set('layer[ambitusIcon].visible', true);
								krpano.call('topIconPosition()'); // 周边按钮显示后，重新记录右侧的位置
							}

							if( isCurrPanoId ) {
								that.positionGroupOpen(ambitGroup);
							}
						}														
				    }
				}
			});
		},
		// 添加组数据
		addGroupList : function () {
			var index = '', that = this,
				peripheryGroupList = JSON.stringify(that.peripheryGroupList).replace(/"|"|^\[\[|\]\]$/g, '').replace(/\,/g, '!1!').replace(/\(/g, '%^FF08').replace(/\)/g, '%^FF09').replace(/\//g, '%^002F');

			this.initOpen = false;

			if ( that.ambitGroup ){
				$.each(that.peripheryList, function (i, el) {
					if ( el.ambitusGroupName == that.ambitGroup ) {
						index = i
						return false;
					}
				});
			}

			// krpano添加组数据
			krpano.call('addPeripheryGroup("' + peripheryGroupList + '","' + index + '")');
		},
		// 添加展位数据
		addthumbList : function (index) {
			var that = this, peripheryThumbList = [];
			that.peripheryThumbList = that.peripheryList[index].id || [];

			// 重置数据
			$.each(that.peripheryThumbList, function(i, el) {
				peripheryThumbList.push([
					el.href,
					unescape(el.title).replace(/\,/g,'%^FF0C'),
					el.user_id,
					el.user_z,
					that.peripheryList[index].ambitusGroupName
				])
			});

			peripheryThumbList = JSON.stringify(peripheryThumbList).replace(/"|"|^\[\[|\]\]$/g, '').replace(/\,/g, '!1!').replace(/\(/g, '%^FF08').replace(/\)/g, '%^FF09').replace(/\//g, '%^002F');

			// krpano添加周边展位数据
			krpano.call('addPeripheryThumb("' + peripheryThumbList + '")');
		},
		// 展位跳转
		// panoId - 展位ID或e串
		// groupName - 展位的组名称
		thumbClickFun : function (panoId, groupName) {
			var goHrefInfo, goAmbit, thisUrl,
				that      = this,
				thisScene = krpano.get("xml.scene").replace('scene', ''), // 当前单场景id
				testUrl   = panoUrl.split('user_id')[0] + 'user_id/';

			if ( panoId.split("/").length == 2 ) {
				// e串
				goHrefInfo = panoId.split("/")[1];
			}else{
				goHrefInfo = panoId;
			}

			// hrefinfo当前的e串, 全局变量
			goAmbit = "#ambit=" + encodeURIComponent(hrefinfo)+"_"+thisScene+"_"+groupName;

			if( that.panoFormChinaso ){
				// testUserId 判断是不是测试地址
				// shareDoMainUrl 全屏变量,当前链接的host地址
				thisUrl = !testUserId ? shareDoMainUrl + "/" + panoId + "/panorama/?form_p=chinaso" + goAmbit : testUrl + goHrefInfo + goAmbit + "?form_p=chinaso";
			}else if( that.panoFormTencent ){

				thisUrl = !testUserId ? shareDoMainUrl + "/" + panoId + "/panorama/?form_p=tencent" + goAmbit : testUrl + goHrefInfo + goAmbit + "?form_p=tencent";
			}else{ 

				thisUrl = !testUserId ? shareDoMainUrl + "/" + panoId + "/panorama/" + goAmbit 				  : testUrl + goHrefInfo + goAmbit;
			}
			location.href = thisUrl;
		},
		// 判断参数
		judgeParam : function () {
			var ambitParamet  = panoUrl.split("ambit=")[1].split('?')[0].split('_'),	// ambit的参数,并分隔成数组
				ambitHrefInfo = decodeURIComponent(ambitParamet[0]),					// 展位ID
				ambitSceneId  = ambitParamet[1],										// 场景ID
				ambitGroup    = decodeURIComponent(ambitParamet[2]),										// 周边组标识
				panoId        = ambitHrefInfo.indexOf('/')>=0 ? ambitHrefInfo.split('/')[1] : ambitHrefInfo,	// 展位的e串或ID
				isCurrPanoId  = panoUrl.split('#')[0].indexOf(panoId)>0 ? true : false;	// 是否是返回的周边, 当展位e串或ID与当前链接的一至,认为是真的

			if(ambitusOpen == 'Y' && isCurrPanoId ){
				this.requestPeripheryListAjax(isCurrPanoId, ambitGroup); // 请求周边数据
			}
			if ( isCurrPanoId ) {
				ambitusReturn = 'yes';
			} else {
				ambitusSource = 'yes';
				// 周边跳转,添加返回按钮的链接
				this.addReturnBtn(ambitHrefInfo, ambitSceneId, ambitGroup, panoId);
			}
		},
		// 打开周边,定位到指定的组下
		positionGroupOpen : function (ambitGroup) {
			this.ambitGroup = ambitGroup;
			if( !krpano  || !krpano.get('layer[ambitusIcon].isInit') ) return ;
			if( krpano.get('device.mobile')) {
				krpano.call('ambitusOperFun()');
			} else {
				krpano.call('ambitusOperFun()');
			}
		},
		// 周边跳转,添加返回按钮的链接
		addReturnBtn: function (ambitHrefInfo, ambitSceneId, ambitGroup, panoId) {
			var returnUrlZhu, returnUrl, returnBtnData = {},
				testUrl   = panoUrl.split('user_id')[0] + 'user_id/',
				goAmbit = "#ambit=" + encodeURIComponent(ambitHrefInfo) + "_" + ambitSceneId + "_" + ambitGroup;

			if ( !testUserId ) {
				// shareDoMainUrl 全屏变量,当前链接的host地址
				returnUrlZhu = shareDoMainUrl + "/" + ambitHrefInfo + "/panorama/" + ambitSceneId + goAmbit;
				returnUrl = returnUrlZhu + (this.panoFormChinaso ? '?form_p=chinaso' : (this.panoFormTencent ? '?form_p=tencent' : ''));

			} else {
				returnUrlZhu = testUrl + panoId + goAmbit;
				returnUrl = returnUrlZhu + (this.panoFormChinaso ? '?form_p=chinaso' : (this.panoFormTencent ? '?form_p=tencent' : '')) + '?sn=scene' + ambitSceneId
			}

			$("body").append("<div class='" + this.returnBtnClass + "'><a href=" + returnUrl + "><img src='" + this.returnBtnIconSrc + "' /></a></div>");       
		},
		// 显示周边返回按钮
		showReturnBtn : function () {
			$('.' + this.returnBtnClass).show();
			if(ambitusSource === 'yes' && krpano && krpano.get('device.flash') ){
				krpano.set('layer[ambitusSourceBtn].visible', true);
			}
		},
		// 隐藏周边返回按钮
		hideReturnBtn : function () {
			if( ambitusSource === 'yes' && krpano && krpano.get('device.flash') ){
				krpano.set('layer[ambitusSourceBtn].visible', false);
			}
			$('.' + this.returnBtnClass).hide();
		},
		// 设置是否有数据
		setAjaxDataStatus : function (AjaxDataStatus) {
			this.AjaxDataStatus = AjaxDataStatus;
		},
		// 获取是否有数据
		getAjaxDataStatus : function () {
			if( ambitusSource === 'yes' && krpano && krpano.get('device.flash') ){
				krpano.set('layer[ambitusSourceBtn].onclick', 'openurl("'+ $('.' + this.returnBtnClass).find('a').attr('href') +'", "_self")');
				$('.' + this.returnBtnClass).remove();
				krpano.set('layer[ambitusSourceBtn].visible', true);
			}
			return this.AjaxDataStatus;
		}

	}

	var periphery = new Periphery();

	periphery.init();


	window.addPeripherythumbList  = periphery.addthumbList.bind(periphery);
	window.peripheryThumbClickFun = periphery.thumbClickFun.bind(periphery);

	window.ambitusClickOpenFun    = periphery.openPeriphery.bind(periphery);

	window.ambitusClickCloseFun = function(){
		krpano.call('ambitusClickCloseFun()');
	}
	window.zhiboReturnHideFun = periphery.hideReturnBtn.bind(periphery);
	window.zhiboReturnShowFun = periphery.showReturnBtn.bind(periphery);

	window.peripheryGetAjaxStatus = periphery.getAjaxDataStatus.bind(periphery);
	window.peripherySetAjaxStatus = periphery.setAjaxDataStatus.bind(periphery);

})(window, document);
// 周边功能(5) - author:liwenjie end


// 同屏互动
;(function(window, document){
	var 
		data = [{
			key        : 'personnel1',
			identifier : '0026',
			title      : '刘万涛',
			department : '服务支持',
			content    : '对平台及服务内容咨询，可以找我带看。',
			imgSrc     : '//s.expoon.com/cache/1546677748/test/krpano/images/socket/avator01.jpg',
			src        : '//s.expoon.com/cache/1546677748/test/krpano/images/socket/avatorImg01.jpg'
		},{
			key        : 'personnel2',
			identifier : '0076',
			title      : '安心可',
			department : '商务支持',
			content    : '想了解加盟合作了解项目，可以找我带看。',
			imgSrc     : '//s.expoon.com/cache/1546677748/test/krpano/images/socket/avator02.jpg',
			src        : '//s.expoon.com/cache/1546677748/test/krpano/images/socket/avatorImg02.jpg'
		},{
			key        : 'personnel3',
			identifier : '0088',
			title      : '江销销',
			department : '营销支持',
			content    : '想了解产品相关内容，可以找我带看。',
			imgSrc     : '//s.expoon.com/cache/1546677748/test/krpano/images/socket/avator03.jpg',
			src        : '//s.expoon.com/cache/1546677748/test/krpano/images/socket/avatorImg03.jpg'
		}],
		publicCommunication = ['syncPanoSuccess', 'connect', 'connectSuccess', 'close', 'takeLook', 'takeLookSuccess', 'viewer'],
		onlineUsersUrl = '/index.php/Z/Test/checkRedis',// 在线用户接口
		onlineUsersData = {},
		isSocket        = false, // 同屏状态 
		isConnectStatus = false, // 双方联系状态
		currRole        = 'c', 	// c - 客户端（主动建立连接）， b- 服务端（被动接受连接）, viewer - 只能看
		fromKey         , sendKey,
		clickEvent　     = 'click',
		cAccidental     = false, //是否是c端意外断开
		currIndex       , // 当前选择的客服人员是第几个
		skinGyroStatus,
		onlineUsersOpenStatus = false, // 打开状态
		onlineUsersAjaxTimer,
		onlineUsersTimer,
		timer,
		communication, sameScreen, sameScreenFun, ajaxUrl, sameScreenEvent, sameScreenDom, showDom, hideDom;

	function getFormatDate(timestamp, format) {
	    timestamp = parseInt(timestamp);
	    var newDate = new Date(timestamp);
	    Date.prototype.format = function(format) {
	        var date = {
	            'M+': this.getMonth() + 1,
	            'd+': this.getDate(),
	            'h+': this.getHours(),
	            'm+': this.getMinutes(),
	            's+': this.getSeconds(),
	            'q+': Math.floor((this.getMonth() + 3) / 3),
	            'S+': this.getMilliseconds()
	        };
	        format = format || 'yyyy-MM-dd h:m:s';
	        if (/(y+)/i.test(format)) {
	            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	        }
	        for (var k in date) {
	            if (new RegExp('(' + k + ')').test(format)) {
	                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
	                    date[k] : ('00' + date[k]).substr(('' + date[k]).length));
	            }
	        }
	        return format;
	    }
	    return newDate.format(format);
	}

	// socket
	communication = {
		init : function(sendKey, isMain){
			this.searchObj = this.search();
			this.socketUrl = "ws://124.243.208.80:9502";
			// this.socketUrl = "ws://192.168.1.90:9502";
			// this.socketUrl = "ws://127.0.0.1:9502";
			this.fromKey   = fromKey;	// 当前全景的标识
			this.sendKey   = sendKey;	// 通信全景的标识
			this.isMain    = isMain;		// 全景同屏可移动的标识(主全景)


			this.ws = null;

			this.beforeunload();
		},
		search : function(){
			var search = location.search.substr(1).split('&'),
				searchObj = {};

			$.each(search, function(index, el) {
				searchObj[el.split('=')[0]] = el.split('=')[1];
			});

			return searchObj
		},
		// 监听关闭
		beforeunload : function () {
			var _this = this;

			window.onbeforeunload = function () {
				sameScreen.close();
			}
		},
		// 开始连接
		startConnect : function (sendKey, isMain)　{
			var _this = this,
				dtd = $.Deferred();

			_this.init(sendKey, isMain);

			if ( 'WebSocket' in window ) {
				try {
					_this.ws = new WebSocket(_this.socketUrl);
				} catch ( e ) {
					dtd.reject();
					return false;
				}

				$.when(_this.open()).done(function(){
					dtd.resolve();
				}).fail(function(){
					dtd.reject();
				});

			} else {
				dtd.reject();
			}
			return dtd;
		},
		// 进行连接
		open : function () {
			var _this = this,
				dtd = $.Deferred();

			_this.ws.onopen = function(evt) {  //绑定连接事件

				var data = {
					connect : true,
					fromKey : _this.fromKey,
					sendKey : _this.sendKey
				}
				_this.ws.send(JSON.stringify(data));

				dtd.resolve();
			};

			_this.ws.onclose = function ( evt ) {
				_this.ws = null;
				dtd.reject();
			}

			return dtd;
		},
		// 关闭链接
		close : function (that) {
			var _this = this;
			_this.ws.onclose = function ( evt ) {
				_this.ws.close();
				_this.ws = null;

				// krpano.call('error(连接中断)');

				// b端断开，自动连接
				if( currRole === 'b' ) {
					sameScreen.init(sendKey, _this.isMain); // 建立socket
				}
				if( cAccidental && currRole === 'c' ){
					sameScreen.init(sendKey, _this.isMain); // 建立socket
					showDom.showSameScreenIngDom(currIndex);
				} else if( currRole === 'c'){
					_this.closeSuccess();
				}
			}
		},
		// 发送信息
		send : function (data) {
			var _this = this,
				sendData = {
					fromKey : _this.fromKey,
					sendKey : _this.sendKey,
					data : data,
				};

			if ( !_this.isMain && data.type && publicCommunication.indexOf(data.type) === -1 ) return;

			try {

				// krpano.call('trace(发送信息: ' + data.type + ')');
				_this.ws.send(JSON.stringify(sendData));
			} catch ( e ) {
			}
		},
		// 接收信息
		message : function (that, callback) {
			var _this = this;
			_this.ws.onmessage = function ( evt ) {
				var data = evt.data;

				try {
					data = JSON.parse(data);
				} catch(e) {
					data = data;
				}

				if( !!_this.isMain && data.type && publicCommunication.indexOf(data.type) === -1 ) return;

				// krpano.call('warning(接收信息: ' + data.type + ')');
				callback.call(that, data);
			}
		},
		// 双方通信成功
		success : function(){
			isSocket = true;
			isConnectStatus = true;
			showDom.showTipsDom('双方通信成功！');

			krpano.call('webvr.exitVR()');

			skinGyroStatus = krpano.get('plugin[skin_gyro].enabled');

			if( skinGyroStatus ) {
				krpano.call('setGyro()');
			}

			if ( krpano.get('autorotate.enabled') ) {
				krpano.call('switchRotate()');
			}

			if( currRole === 'b' ) { 
				krpano.set('layer[socketTransparentNoCloseMask].visible', true);
			}
		},
		// 双方通信关闭成功
		closeSuccess : function(){
			var $takeLookBtn = $('.sameScreenIngBox .takeLookBtn');

			isSocket = false;
			isConnectStatus = false;
			showDom.showTipsDom('断开双方通信成功！');

			krpano.set('layer[socketTransparentNoCloseMask].visible', false);

			if( skinGyroStatus ) {
				krpano.call('setGyro()');
			}
			
			if( currRole === 'c' ) {

				krpano.call('hideSocketTransparentMask()');
				hideDom.hideSameScreenIngDom();
			} else if ( currRole === 'b' ) {

				communication.isMain = false;
				$takeLookBtn.removeClass('cancel').data('status', 'off').find('p').html('我要带看');
			}
		}
	}

	// 同屏
	sameScreen = {
		// 打开socket
		init : function (sendKey, isMain) {
			var _this = this;


			$.when(communication.startConnect(sendKey, isMain)).done(function(){
				cAccidental = true;
				communication.message(_this, _this.message);
				communication.close(_this);
			}).fail(function () {
			});
		},
		// 关闭socket
		close : function ()　{
			cAccidental = false;

			isSocket = false;
			communication.send({
				type: 'close'
			});
			setTimeout(function(){
				communication.ws.send(JSON.stringify({
					connect: 'close',
					fromKey : communication.fromKey
				}));
			})
		},
		// 切换场景选择显示与隐藏
		switchThumbs : function (status) {
			var _this = this;

			if ( !isConnectStatus ) return;

			communication.send({
				type   : 'switchThumbs',
				status : status
			});
		},
		// 切换组
		switchGroup : function ( name ) {
			var _this = this;

			if ( !isConnectStatus ) return;

			communication.send({
				type : 'switchGroup',
				name : name
			});
		},
		// 修改视场
		panoFov : function (fov) {
			var _this = this;

			if ( !isConnectStatus ) return;

			communication.send({
				type : 'panoFov',
				fov : fov
			});
		},
		// 同步全景
		syncPano : function () {
			var tolookat = 'view.hlookat=' + krpano.get('view.hlookat') + '&view.vlookat=' + krpano.get('view.vlookat') + '&view.fov=' + krpano.get('view.fov');

			communication.send({
				type        : 'jumpPano',
				sceneName   : krpano.get('xml.scene'),
				tolookat    : tolookat,
				toflags     : 'MERGE',
				toblend     : 'BLEND(1)',
				thumbStatus : krpano.get('layer[groupLayer].opened'),
				connect     : 'true'
			});
		},
		// 全景移动
		panoMove : function(hlookat, vlookat) {
			var _this = this;

			if ( !isConnectStatus ) return;

			communication.send({
				type : 'panoMove',
				hlookat : hlookat,
				vlookat : vlookat
			});
		},
		// 全景跳转
		jumpPano : function( sceneName, tolookat, toflags, toblend ) {
			var _this = this;

			if ( !isConnectStatus ) return;

			communication.send({
				type      : 'jumpPano',
				sceneName : sceneName,
				tolookat  : tolookat,
				toflags   : toflags,
				toblend   : toblend
			})
		},
		// 带看
		switchTakeLook : function (status) {
			var _this = this;

			if ( !isConnectStatus ) return;

			communication.send({
				type   : 'takeLook',
				status : status
			})
		},
		// 数据返回
		message : function (data) {
			if( (data.type=='takeLook' || data.type=='takeLookSuccess' || data.type=='close') && currRole === 'viewer') {
				return false;
			}
			if ( sameScreenFun[data.type] ) {
				sameScreenFun[data.type](data);
			} else {
				console.log('没有' + data.type + '方法');
			}
		}
	}

	// 同屏方法
	sameScreenFun = {
		// 场景移动
		panoMove : function (data) {
			krpano.call('tween(view.vlookat, ' + data.vlookat + ', 0.5)');
			krpano.call('tween(view.hlookat, ' + data.hlookat + ', 0.5)');
		},
		// 修改视角
		panoFov : function (data) {
			krpano.call('tween(view.fov, ' + data.fov + ', 0.5)');
		},
		// 跳转场景
		jumpPano : function (data) {
			var callStr = 'currLoadscene(' + data.sceneName + ', ' + data.tolookat + ', ' + data.toflags + ', ' + data.toblend + ')';

			if ( data.connect === 'true' ) {
				if( data.thumbStatus !== krpano.get('layer[groupLayer].opened') ) {
					krpano.call('showthumbs()');
				}

				if( currRole !== 'viewer' ) {
					communication.send({
						type      : 'syncPanoSuccess'
					});
				}
				communication.success();
			}

			krpano.call(callStr);
		},
		// 切换组
		switchGroup : function (data) {
			krpano.call('groupClickEvent(' + data.name + ')');
		},
		// 场景选择的显示隐藏
		switchThumbs : function (data) {
			if ( data.status === 'true' ) {
				krpano.call('showthumbs()');
			} else {
				krpano.call('hidethumbs()');

			}
		},
		// 带看通信
		takeLook : function (data) {

			if ( data.status === 'off' ) {

				communication.isMain = true;
				krpano.set('layer[socketTransparentNoCloseMask].visible', false);
				showDom.showTipsDom('服务人员已终断带看操作');

			} else if ( data.status === 'on' ) {

				communication.isMain = false;
				krpano.set('layer[socketTransparentNoCloseMask].visible', true);
				showDom.showTipsDom('当前服务人员带看中');
			}

			communication.send({
				type   : 'takeLookSuccess',
				status : data.status
			})
		},
		// 请求带看/取消带看成功
		takeLookSuccess : function (data) {
			var $takeLookBtn = $('.sameScreenIngBox .takeLookBtn');

			if ( data.status === 'off' ) {

				communication.isMain = false;
				krpano.set('layer[socketTransparentNoCloseMask].visible', true);
				$takeLookBtn.removeClass('cancel').find('p').html('我要带看');
			} else if ( data.status === 'on' ) {

				communication.isMain = true;
				krpano.set('layer[socketTransparentNoCloseMask].visible', false);
				$takeLookBtn.addClass('cancel').find('p').html('取消带看');
			}

			hideDom.hideTipsDom();
			$takeLookBtn.data('status', data.status);
		},
		// 连接
		connect : function () {
			sameScreen.syncPano();
			communication.success();
		},
		// 同步全景是否成功，用于判断是否双方通信成功
		syncPanoSuccess : function () {	
			communication.success();
		},
		// 与服务器连接成功
		connectSuccess : function () {

			// 第一个连接时，和后台交互成功，开时同屏
			if( communication.isMain ) {
				// 主全景时,发送当前场景信息,让副场景与主场景同步
				sameScreen.syncPano();
			} else if ( currRole === 'viewer' ) {
				communication.ws.send(JSON.stringify({
					connect : 'viewer',
					fromKey : communication.fromKey,
					sendKey : communication.sendKey,
					data : {
						type : 'viewer',
						key : communication.fromKey
					}
				}));
			} else {
				// 副场景时,发送请求,请主场景发送信息,让副场景与主场景同步
				communication.send({
					type : 'connect'
				});
			}
		},
		viewer : function (data) {
			var tolookat = 'view.hlookat=' + krpano.get('view.hlookat') + '&view.vlookat=' + krpano.get('view.vlookat') + '&view.fov=' + krpano.get('view.fov');

			communication.ws.send(JSON.stringify({
				connect : 'viewer',
				fromKey : communication.fromKey,
				sendKey : data.key,
				data : {
					type        : 'jumpPano',
					sceneName   : krpano.get('xml.scene'),
					tolookat    : tolookat,
					toflags     : 'MERGE',
					toblend     : 'BLEND(1)',
					thumbStatus : krpano.get('layer[groupLayer].opened'),
					connect     : 'true'
				}
			}));
		},
		// 接收关闭
		close : function () {
			cAccidental = false;

			communication.ws.send(JSON.stringify({
				connect: 'close',
				fromKey : communication.fromKey
			}));

			communication.closeSuccess();
		}
	}

	ajaxUrl = {
		onlineUsersAjax : function(){
			var dtd = $.Deferred();
			$.ajax({
				url      : onlineUsersUrl,
				type     : 'get',
				dataType : 'json',
				success : function (res) {
					dtd.resolve(res.data);

					onlineUsersAjaxTimer = setTimeout(function(){
						if( !$('.onlineUsersBox').size() ) {
							return false;
						}
						$.when(ajaxUrl.onlineUsersAjax()).done(function(data) {

							if ( data ) {
								onlineUsersData = data;
							}
							sameScreenDom.onlineUsersDom(onlineUsersData);
						});
					}, 3000);
				},
				error : function () {
					dtd.reject();
				}
			});
			return dtd;
		}
	}


	// 同屏界面
	sameScreenDom = {
		// 同屏客服列表
		panoListDom : function(data){
			var dom = '<div class="panoListBox"><div class="closeBtn"></div><ul>'; 

			$.each(data, function(index, el) {
				dom += 
					'<li>' +
						'<div class="titleBox">' +
							'<h3>' + el.title + '</h3>' +
							'<p>' + el.content + '</p>' +
						'</div>' +
						'<div class="avator"><img src="' + el.imgSrc + '"></div>' +
						'<div class="btn" data-key="' + el.key + '">' +
							'<i></i>' +
							'<span>VR带看</span>' +
						'</div>' +
					'</li>';
			});

			dom += '</ul></div>';

			$('body').append(dom);

			sameScreenEvent.startSameScreen();
		},
		// 当前同屏人员窗口
		sameScreenIngDom : function (el, index) {
			var dom = 
					'<div class="sameScreenIngBox ' + ( currRole === 'b' ? 'bTerminal' : '' ) + ( krpano.get('layer[groupLayer].opened') === 'true' ? ' rise' : '' ) + '" data-key="' + el.key + '" data-index="' + index + '">' +
						'<div class="avator"><img src="' + el.imgSrc + '">' + (krpano.get('device.mobile') ? '' : '<span>'+ el.title +'</span>') + '</div>' +
						'<div class="main"> ' +
							'<ul>' +
								( currRole === 'b' ?
									'<li class="onlineUserBtn">' +
										'<i class="onlineUserIcon"></i>' +
										'<p>在线用户</p>' +
									'</li>' +
									'<li class="takeLookBtn" data-status="off">' +
										'<i class="InTakeLookIcon"></i>' +
										'<p>我要带看</p>' +
									'</li>'
								:
									'<li class="messageBtn">' +
										'<i class="messageIcon"></i>' +
										'<p>' + (krpano.get('device.mobile') ? '信息' : '服务信息') + '</p>' +
									'</li>' +
									'<li class="phoneBtn">' +
										'<i class="phoneIcon"></i>' +
										'<p>免费电话</p>' +
									'</li>' +
									'<li class="outloginBtn">' +
										'<i class="outloginIcon"></i>' +
										'<p>退出</p>' +
									'</li>'
								) +
							'</ul>' +
						'</div>' +
						'<div class="statusBtn">' +
							'<i></i>' +
						'</div>' +
					'</div>'

			$('body').append(dom);
			sameScreenEvent.sameScreenIngEvent();
		},
		// 信息窗口
		messageDom : function(el, index) {
			var dom = 
						'<div class="socketMessageBox">' +
							'<div class="logoBox">' +
								'<img src="//s.expoon.com/test/krpano/images/socket/logo.png">' +
							'</div>' +
							'<div class="avatorBox">' +
								'<img src="' + el.src + '">' +
								'<span>员工编号:' + el.identifier + '</span>' +
							'</div>' +
							'<div class="infoBox">' +
								'<ul>' +
									'<li>' +
										'<span class="title">网展客服：</span>' +
										'<span class="content">' + el.title + '</span>' +
									'</li>' +
									'<li>' +
										'<span class="title">所属部门：</span>' +
										'<span class="content">' + el.department + '</span>' +
									'</li>' +
									'<li>' +
										'<span class="title">服务描述：</span>' +
										'<span class="content">' + el.content + '</span>' +
									'</li>' +
								'</ul>' +
							'</div>' +
						'</div>';

			$('body').append(dom);
		},
		// 在线用户窗口
		onlineUsersDom: function (data) {
			var $countDown = null,
				count = 0,
				dom = 
					'<div class="onlineUsersBox">' + 
						'<h3>在线用户列表</h3>' +
						'<h4>当前在线人数：</h4>' +
						'<table>' +
							'<thead>' +
								'<tr>' +
									'<td>用户ID</td>' +
									'<td>进入时间</td>' +
									'<td>停留时长</td>' +
								'</tr>' +
							'</thead></table><div class="scrollBox"><table><tbody>';

			if ( !onlineUsersOpenStatus ) {
				return false;
			}

			$.each(data, function(key, el){
				var img, timeDiff, time,  minute, second;

				count++;

				try {
					el = JSON.parse(el);
				} catch (e) {
				}

				img      = el.headimgurl || '//s.expoon.com/test/krpano/images/expoon-zhanzhan.png';
				time     = el.time + '000';
				timeDiff = Math.abs(Date.now() - Number(time));
				minute   = Math.floor(timeDiff/1000/60%60);
				second   = Math.floor(timeDiff/1000%60);

				minute = minute < 10 ? '0' + minute : minute;
				second = second < 10 ? '0' + second : second;

				dom += '<tr>' +
							'<td><img src="' + img + '"></td>' + 
							'<td>' + getFormatDate(time, 'hh:mm') + '</td>' + 
							'<td class="countDown">' + minute + ':' + second + '</td>' + 
						'</tr>';
			});

			dom += '</tbody></table></div></div>';

			$('.onlineUsersBox').remove();
			$('body').append(dom);
			krpano.call('showSocketTransparentMask()');
			$('.onlineUsersBox h4').html("当前在线人数：" + count);

			var $countDown = $('.onlineUsersBox .countDown');

			clearInterval(onlineUsersTimer);
			onlineUsersTimer = setInterval(function(){
				$.each($countDown, function(index, el){
					var countDown = $(el).html().split(':');
					countDown[1] = +countDown[1];
					countDown[0] = +countDown[0];
					countDown[1] += 1;

					if( countDown[1] >= 60 ) {
						countDown[1] = 0;
						countDown[0] += 1;
						if ( countDown[0] >= 60 ) {
							countDown[0] = 0;
						} 
					}

					countDown[0] = countDown[0] < 10 ? '0' + countDown[0] : countDown[0];
					countDown[1] = countDown[1] < 10 ? '0' + countDown[1] : countDown[1];
					$(el).html( countDown[0] + ':' + countDown[1] );
				});
			}, 1000);
		},
		tipsDom : function (txt) {
			var dom = 
						'<div class="socketTipsBox">' +
							txt + 
						'</div>';
			$('body').append(dom);	
		}
	}

	// 显示dom
	showDom = {
		showPanoListDom: function() {
			if( isSocket ) {
				showDom.showTipsDom('已在同屏状态中，无法打开');
				return;
			}
			if ( currRole === 'b' ) {
				showDom.showTipsDom('服务端无此功能');
				return;
			}

			krpano.call('showSocketTransparentMask()');
			if( $('.panoListBox').size() ) {
				$('.panoListBox').show();
			} else {
				sameScreenDom.panoListDom(data);
			}
		},
		showSameScreenIngDom : function (index) {
			if( $('.sameScreenIngBox').size() ) {
				$('.sameScreenIngBox').remove();
			}
			sameScreenDom.sameScreenIngDom(data[index], index);
		},
		showMessageDom : function (index) {
			if( $('.socketMessageBox').size() ) {
				$('.socketMessageBox').remove();
			}
			sameScreenDom.messageDom(data[index], index);
			krpano.call('showSocketTransparentMask()');
		},
		showOnlineUsersDom : function () {
			if ( !$('.onlineUsersBox').size() ) {

				onlineUsersOpenStatus = true;

				showAjaxLoading();
				$.when(ajaxUrl.onlineUsersAjax()).done(function(data){
					hideAjaxLoading();
					if ( data ) {
						onlineUsersData = data;
					}
					sameScreenDom.onlineUsersDom(onlineUsersData);
				}).fail(function(){
					hideAjaxLoading();
				});
			}
		},
		// 提示状态 
		showTipsDom : function (txt, autoClose ,time) {
			var $socketTipsBox = $('.socketTipsBox');
			if( $socketTipsBox.size() ) {
				$socketTipsBox.html(txt).show();
			} else {
				sameScreenDom.tipsDom(txt);
				$socketTipsBox = $('.socketTipsBox');
			}
			autoClose = autoClose || 'yes';
			time = time || 3;
			if( autoClose === 'no' ) return;
			clearTimeout(timer);
			timer = setTimeout(function(){
				$socketTipsBox.hide();
			}, time * 1000 );
		}
	}

	// 隐藏dom
	hideDom = {
		hidePanoListDom: function () {
			$('.panoListBox').hide();
		},
		hideSameScreenIngDom : function () {
			$('.sameScreenIngBox').remove();
		},
		hideMessageDom : function () {
			$('.socketMessageBox').remove();
		},
		hideOnlineUsersDom : function () {
			onlineUsersOpenStatus = false;
			clearTimeout(onlineUsersAjaxTimer);
			clearInterval(onlineUsersTimer);
			$('.onlineUsersBox').remove();
		},
		hideTipsDom : function () {
			$('.socketTipsBox').hide();	
		}
	}


	// 同屏事件
	sameScreenEvent = {
		// 开始请求同屏事件 
		startSameScreen : function () {
			var _this = this;
			$('.panoListBox .closeBtn').on(clickEvent　, function(){
				krpano.call('hideSocketTransparentMask()');
			});

			$('.panoListBox .btn').on(clickEvent　, function(){
				currIndex = $(this).closest('li').index();

				sendKey = $(this).data('key');

				if ( sendKey ) {
					isSocket = true;

					showDom.showTipsDom('等待对方接通', 'no');

					krpano.call('hideSocketTransparentMask()');
					showDom.showSameScreenIngDom(currIndex);

					sameScreen.init(sendKey, true);
				}
			});
		},
		// 当前同屏人员窗口的
		sameScreenIngEvent : function () {
			// 收起与展开事件 
			$('.sameScreenIngBox .statusBtn').on(clickEvent　, function () {
				$(this).closest('.sameScreenIngBox').toggleClass('retract');
			});
			// 信息事件
			$('.sameScreenIngBox .messageBtn').on(clickEvent　, function () {
				var index = $(this).closest('.sameScreenIngBox').data('index');

				showDom.showMessageDom(index);
			});
			// 免费电话 
			$('.sameScreenIngBox .phoneBtn').on(clickEvent　, function () {
				showDom.showTipsDom('免费电话未开通，敬请期待!');
			});
			// 退出
			$('.sameScreenIngBox .outloginBtn').on(clickEvent　, function () {
				krpano.call('hideSocketTransparentMask()');
				hideDom.hideSameScreenIngDom();
				sameScreen.close();
			});
			// 在线用户
			$('.sameScreenIngBox .onlineUserBtn').on(clickEvent　, function () {
				showDom.showOnlineUsersDom();
			});
			// 我要带看/取消带看
			$('.sameScreenIngBox .takeLookBtn').on(clickEvent　, function () {
				var status = $(this).data('status');
				if ( !isConnectStatus ) {
					showDom.showTipsDom('双方未建立通信，无法进行带看!');
					return;
				}


				if( status === 'off' ) {
					showDom.showTipsDom('请求带看中……', 'no');
					sameScreen.switchTakeLook('on');

				} else if ( status === 'on' ) {
					showDom.showTipsDom('取消带看中……', 'no');
					sameScreen.switchTakeLook('off');
				}


			});
		},
		// 当前同屏人员窗口上升
		sameScreenIngRise : function () {
			$('.sameScreenIngBox').addClass('rise');
		},
		// 当前同屏人员窗口下降
		sameScreenIngDecline : function () {
			$('.sameScreenIngBox').removeClass('rise');
		},
		// 同屏状态，与服务通信 
		getIsSocket : function () {
			return isSocket;
		},
		// 双方同屏状态
		getIsConnectStatus : function () {
			return isConnectStatus;
		}
	}

	function init () {
		var currData = null, 
			searchObj = communication.search(),
			currIndex;

		if(krpano.get('device.flash')){
			alert('ie不支持同屏互动，请更换其它浏览器');
			return;
		}

		fromKey = searchObj.fromkey ? searchObj.fromkey : '';
		sendKey = searchObj.sendkey ? searchObj.sendkey : '';

		if( krpano.get('device.mobile') ) {
			clickEvent　= "touchend";
		}

		// 观众，只能观看
		if ( !fromKey ) {
			fromKey = Math.random().toString('32').substr(2);
			currRole = 'viewer';
			sameScreen.init('personnel1', false);
			krpano.set('layer[socketGroupRightIcon].visible', false);
			krpano.set('layer[socketTransparentNoCloseMask].visible', true);
			// alert('fromkey没有此值！');
			return false;
		}

		// 有说明是B端
		if ( sendKey ) {
			currRole = 'b';
			$.each(data, function(index, el){
				if( el.key === fromKey) {
					currData = el;
					currIndex = index;
					return false;
				}
			});

			if ( currData ) {
				sameScreen.init(sendKey, false); // 建立socket
				sameScreenDom.sameScreenIngDom(currData, currIndex);// 显示b端界面
			}
		}

		// krpano.call('showlog()');


	}

	window.socketInit = init;


	window.sameScreen = sameScreen;
	window.sameScreenEvent = sameScreenEvent;
	window.showDom = showDom;
	window.hideDom = hideDom;

}(window, document));


// 同屏过期的提示
;(function(window, document){
    var dom = '<div class="pano-expire-box"><div class="scroll-box"><p>您的全景空间已到期,请尽快联系我们（4008787166）或您的制作公司进行续费,以免影响您的正常使用。期待与您继续合作! 谢谢！</p></div><span class="close-btn"></span><a href="/linjingtong.html" target="_blank" class="jump-btn">我要拍全景</a></div>';

    // 初始化判断是否要显示到期提示
    function init(){
	    $.ajax({
            type: 'GET',
            url: "//api.expoon.com/ExpoStatus/get_show_tips",
            data:{
                user_id: user_id
            },
            dataType: "jsonp",
            success: function(res){
                if( Number(res) === 1 ) {
                    showExpire();
                }
            }
        });
    }

    // 显示过期内容
    function showExpire(){
        // ie浏览器显示iframe
        if ( isIE ) {
            var openhtml = "<div id='iframeExpireBox' style='position:absolute;left:0;top:0;z-index: 13999; visibility: visible; opacity: 1; width:100%; height:60px; background-color:#000; -webkit-user-select: none;pointer-events: none;'>" +
                    "<iframe name='panoramaPlugin' frameborder='0' src='//s.expoon.com/test/krpano/html/blank.html' width='100%' height='100%' style='background:url(//s.expoon.com/test/krpano/images/fbloader.gif) no-repeat center center #000;' allowtransparency='true'></iframe>" +
                "</div>";
            $('body').append(openhtml);
        }

        $('body').append(dom);

        addEvent();
    }

    // 添加事件
    function addEvent(){
        var $panoExpireBox = $('.pano-expire-box'),
            timer;

        timer = setInterval(function(){
            var left = parseInt($panoExpireBox.find('p').css('left')) || 0;

            if( left < - 1060 ) {
                left = $panoExpireBox.find('.scroll-box').width();
            }
            $panoExpireBox.find('p').css('left', (left - 1) + 'px');
        }, 1000/60);

        $panoExpireBox.find('.close-btn').on('click startEnd', function(){
            clearInterval(timer);
            $panoExpireBox.remove();
            $('#iframeExpireBox').remove();
        });
    }

    init();

}(window, document));


// 广告
;(function(window, document){
	if( schoolStatus=='1' && window.refererHostDomain === ".so.com" && !(window === top)) {
		setTimeout(addAd, 3000);
	}

	function addAd(){
		var index = parseInt(Math.random()*4, 10);
	    var url = '';
	    switch (index) {
	        case 0:
	            url = '//www.kongque360.com/hbjm.html';
	            break;
	        case 1:
	            url = '//www.kongque360.com/hbjm.html';
	            break;
	        case 2:
	            url = '//www.kongque360.com/cpgn.html';
	            break;
	        case 3:
	            url = '//www.kongque360.com/enterprise/enter.html';
	            break;
	    }
	    // var imgUrl = 'http://s.kongque360.com/test/img/' + index + '.jpg';
	    var imgUrl = '//s.expoon.com/test/krpano/images/ad/' + index + '.jpg';
	    // 
	    var width = 780;
	    if( $(window).width() < 1000) {
	    	width = 500;
	    }
	    var marginLeft = width / 2;

	    var dom = '<div id="advertArea" style="position: fixed; top: 10%;left: 50%;  width: ' + width + 'px; margin-left: -' + marginLeft + 'px; z-index: 10;"><a href="' + url
	         + '"n target="_blank"><img style="width: 100%;" src="' + imgUrl + '"></a><a href="javascript:;" class="close-btn"  style="position: absolute; top: 0; right: 0; width: 18px; height: 18px;"></a></div>';

	    $('body').append(dom);
	    $('#advertArea .close-btn').on('click', function(){
	        $('#advertArea').remove();
	    })
	}
}(window, document));