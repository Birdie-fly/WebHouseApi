!function(i,A){var t,o={},E={},s={},L=240,w=96,y=33,r=44,c=1==lantype?"      添加文字":"          Text",H=1,R=!1,z=3,Q=!1,d={},h=["每次挥手告别后，都是时时刻刻的思念。","#毕业寄#愿你前程似锦，愿你万事胜意。","#毕业季#愿你我今后，以梦为马，不负韶华！","不一样的四年，有你、有我、有他们……","4年前我走向你，今天我要走了…谢谢你母校！","管今朝芳华，理四载情长。","如果回不去，就让记忆留在心里。","#毕业季#我们不说再见，只说：你好，母校！","多么希望，时间能回去，我们能回来。","时光带走青涩，却带不走回忆。","毕业这种心情，大概是我人生里最不想感受的。","好想再躺在学校的操场上，看蓝天白云…","你总说毕业遥遥无期，转眼大家都各奔东西。","睡在我上铺的兄弟，你会来参加我的婚礼吗？","梦见被班主任叫去谈话…可是我已毕业多年…"],V={chinese:{postcardTxt:"明信片",ordinaryTxt:"普通模式",defaultShareTxt:"与世界，分享我的明信片！",defaultShareCampusTxt:"时光剪影，分享母校风采！",sharebtnTxt:"合成、去分享！",synthesisAndShareTxt:"合成并分享！",uploadAvatarTxt:"上传头像",modifyAvatarTxt:"修改头像",currentScreenshotTxt:"当前截图",panoramaTxt:"全景图片",characterLimit28Txt:"长度为1-14个汉字或1到28个字符",characterLimit48Txt:"最多输入24个汉字或48个字符",nextTxt:"确定",syntheticSharingTXT:"图片合成",cancelTxt:"取消",longPressTxt:"长按进行分享或保存",rightClickTxt:"鼠标右键，进行本地保存",uploadAvatarTipsTxt:"请在微信中打开全景，上传图片",rotatingHorizontalScreenTxt:"请旋转屏幕至横屏",rotatingVerticalScreenTxt:"请旋转屏幕至竖屏"},english:{postcardTxt:"Postcard",ordinaryTxt:"Normal",defaultShareTxt:"Share my postcard with the world！",defaultShareCampusTxt:"Silhouette of time sharing style school！",sharebtnTxt:"Synthetic sharing",synthesisAndShareTxt:"Synthetic sharing",uploadAvatarTxt:"Choos Photo",modifyAvatarTxt:"Edit Photo",currentScreenshotTxt:"Screenshot",panoramaTxt:"Panorama",characterLimit28Txt:"Character Limit 1-28",characterLimit48Txt:"Character Limit 1-48",nextTxt:"Next",syntheticSharingTXT:"Synthetic sharing",cancelTxt:"Cancel",longPressTxt:"Long press",rightClickTxt:"Right click",uploadAvatarTipsTxt:"Please open the panorama in WeChat, upload pictures",rotatingHorizontalScreenTxt:"Please rotate the screen",rotatingVerticalScreenTxt:"Please rotate the screen"},display:{}},a='<div id="screenshotMaskImage">\t\t\t\t\t\t<div class="maskBox"></div>\t\t\t\t\t\t<div class="imageBox">\t\t\t\t\t\t\t<div class="titleBox">\t\t\t\t\t\t\t\t<h3>裁剪头像</h3>\t\t\t\t\t\t\t\t<i class="minusRotate90 sprite"></i>\t\t\t\t\t\t\t\t<i class="addRotate90 sprite"></i>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="container">\t\t\t\t\t\t\t\t<div>\t\t\t\t\t\t\t\t    <img id="screenshotMaskImageDom" src="">\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<div class="promptBox"></div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="btnBox">\t\t\t\t\t\t\t\t<a href="javascript:;" class="btn cancelBtn gray">取消</a>\t\t\t\t\t\t\t\t<a href="javascript:;" class="btn enterBtn noMarginRight">完成</a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t </div>',l=!1,n=!1,p=!0,g=!1,v=!0,f=1,D="postcard",e=null,u=null,m="",x=null,T=50,k=16,b=0,j=1,I="//s.expoon.com/cache/1537328616377/image/z/krpano/css/cropper.min.css",P="//s.expoon.com/cache/1537328616377/image/z/krpano/js/cropper.min.js",M="1"==schoolStatus;function C(t){return 127<t.charCodeAt(0)||94==t.charCodeAt(0)?2:1}function S(t,e,a){var n,i,o=e.getContext("2d"),s=e.id,r=[],c=0,d=0,h="cvsText"===s?14:1==j?24:parseInt((A("#screenshotMask .infoText").innerWidth()-20)/13*2),l=0;currTitHeight="cvsText"===s?w:T*z,o.clearRect(0,0,cvsText.width,cvsText.height);for(var p=0;p<=t.length;p++){var g,v="";d+(g=C(t.substr(p,1)))==h?(v=t.substring(c,p+1),r.push(v),c=p+1,d=0):h<d+g?(v=t.substring(c,p),r.push(v),c=p,d=g):p==t.length-1?(v=t.substring(c,p+1),r.push(v)):d+=g}if(0!=r.length){l=1==r.length?currTitHeight/2:currTitHeight,A(e).show(),e.height=l,"cvsText"===s?(o.fillStyle="#000000",o.globalAlpha=.9,o.fillRect(0,0,L,l),o.globalAlpha=1,o.font=y+"px 宋体",o.fillStyle="#ffffff"):(1==r.length&&1==j?A(e).css("margin-top",13):A(e).css("margin-top",0),2==j&&(e.height=T*z),i=(n=b*z)+"px/"+parseInt(1.5*n)+"px 宋体",e.width=A("#screenshotMask .infoText").innerWidth()*z,o.globalAlpha=1,o.font=i||"16px/24px 宋体",o.fillStyle="#8e8e92",o.textAlign="left",o.textBaseline="top");for(p=0;p<r.length&&p<2;p++){var f=Q?1:3,u=Q?2:8;if("cvsText"===s)o.fillText(r[p],f,(p+1)*a-u);else{if(1!=j){var m,x=0;o.textBaseline="middle",A.each(r[p].split(""),function(t,e){if(m=t,48<(x+=C(e)))return m--,!1}),o.fillText(r[p].substr(0,m+1),8*z,T/2*z);break}o.fillText(r[p],8*z,p*parseInt(1.5*n-1)+21*z-n)}}}else A(e).hide()}function B(){b=18<(b=parseInt(A(window).width()/375*k))?18:b,A(window).width()>A(window).height()?(j=2,b=13):j=1,D="postcard",document.getElementById("expoonPano").call("stopAutoRouate()"),A(".screenshotBtn").remove(),A("#screenshotMask").remove();var t='<div id="screenshotMask" style="touch-action:none">\t\t\t\t\t\t<div class="scMskclose"></div>\t\t\t\t\t\t<div class="rdopanel">\t\t\t\t\t\t\t<div class="rdoItem">\t\t\t\t\t\t\t\t<div class="inner sprite switchIcon">'+V.display.postcardTxt+'</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div data-type="panoV" class="rdoItem optional">\t\t\t\t\t\t\t\t<div class="inner sprite on">'+V.display.currentScreenshotTxt+'</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div data-type="panoH" class="rdoItem optional">\t\t\t\t\t\t\t\t<div class="inner sprite">'+V.display.panoramaTxt+'</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="cvsPanel postcardMode">\t\t\t\t\t\t\t<div class="imgBox">\t\t\t\t\t\t\t\t<canvas id="cvsPanoH"></canvas>\t\t\t\t\t\t\t\t<canvas id="cvsPanoV"></canvas>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="infoBox">\t\t\t\t\t\t\t\t<div class="infoQrcode">\t\t\t\t\t\t\t\t\t<canvas id="infoQrcode"></canvas>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<div class="infoAvatar" style="display:none">\t\t\t\t\t\t\t\t\t<canvas id="infoAvatar"   width="'+T*z+'px" height="'+T*z+'px"></canvas>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<div class="infoText">\t\t\t\t\t\t\t\t\t<canvas id="infoText" width="20px" height="'+T/2*z+'px"></canvas>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="touchPanel  postcardMode"  style="touch-action:none">\t\t\t\t\t\t\t<canvas id="cvsQrcode" ></canvas>\t\t\t\t\t\t\t<canvas id="cvsText" />\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="btnpanel ordinaryBtnpanel" style="display: none;">\t\t\t\t\t\t\t<div class="sharebtn noMarginRight">'+V.display.sharebtnTxt+'</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="btnpanel postcardBtnpanel postcardShowBtnpanel">\t\t\t\t\t\t\t<div class="sharebtn gray">'+V.display.synthesisAndShareTxt+'</div>\t\t\t\t\t\t\t<div class="btn uploadAvatarBtn noMarginRight">'+V.display.uploadAvatarTxt+'</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="btnpanel postcardAvatarBtnpanel" style="display: none;">\t\t\t\t\t\t\t<div class="btn gray uploadAvatarBtn">'+V.display.modifyAvatarTxt+'</div>\t\t\t\t\t\t\t<div class="sharebtn noMarginRight">'+V.display.synthesisAndShareTxt+'</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="txtpanel">\t\t\t\t\t\t\t<div class="txtbox"><input id="txtshareTitle" type="text"  placeholder="'+V.display.characterLimit28Txt+'" /></div>\t\t\t\t\t\t\t<div id="btnSetTitle" style="cursor:pointer">'+V.display.nextTxt+'</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="txtPostcard '+(1==j?"":"horizontal")+'">\t\t\t\t\t\t\t<div class="txtbox">\t\t\t\t\t\t\t\t<textarea id="txtPostcardshareTitle"  placeholder="'+V.display.characterLimit48Txt+'" rows="'+(1==j?2:1)+'"></textarea>\t\t\t\t\t\t\t\t<i class="changeOne sprite '+(M?"show":"")+'"></i>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div id="btnSetTitlePostcard" style="cursor:pointer">'+V.display.nextTxt+"</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>";Q&&(D="ordinary",t='<div id="screenshotMask" class="pcpanel" >\t\t\t\t\t\t<div class="scMskclose"></div>\t\t\t\t\t\t<div class="cvsPanel">\t\t\t\t\t\t\t<canvas id="cvsPanoV"   style="background:#ccc;"></canvas>\t\t\t\t\t\t\t<canvas id="cvsPanoH"></canvas>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="touchPanel" style="touch-action: none; ">\t\t\t\t\t\t\t<canvas id="cvsQrcode" height="240" width="240"></canvas>\t\t\t\t\t\t\t<canvas id="cvsText" width="240" height="48"></canvas>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="pcbtnpanel">\t\t\t\t\t\t\t<div class="checkpanel">\t\t\t\t\t\t\t\t<div data-type="panoV" class="ckpleft">\t\t\t\t\t\t\t\t\t<span class="on">'+V.display.currentScreenshotTxt+'</span>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<div data-type="panoH" class="ckpright">\t\t\t\t\t\t\t\t\t<span>'+V.display.panoramaTxt+'</span>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div id="btnSynthesize" class="shareBtn">'+V.display.syntheticSharingTXT+'</div>\t\t\t\t\t\t\t<div class="inputPanel">\t\t\t\t\t\t\t\t<input id="txtshareTitle" type="text" placeholder="'+V.display.characterLimit28Txt+'"  />\t\t\t\t\t\t\t\t<div id="btnPCCancel" class="btncancel">'+V.display.cancelTxt+'</div>\t\t\t\t\t\t\t\t<div id="btnPCConfirm" class="btnconfirm">'+V.display.nextTxt+'</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="errmsgpanel"><span>'+V.display.characterLimit28Txt+"</span></div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>"),A("body").append(t),X(!(R=!(H=1))),function(){var t="";if(/user_id/.test(location.href)?t=location.href.replace(/user_id.+/g,"")+"user_id/"+hrefinfo.replace("e/","")+"?sn="+krpano.get("xml.scene"):(t=shareDoMainUrl+"/"+hrefinfo+"/panorama/"+krpano.get("xml.scene").replace("scene",""),1!=z_platform_id&&(t+="/2")),Q&&(L=100,w=34,y=14,r=16),new QRCode("cvsQrcode",{text:t,width:1.5*L,height:1.5*L,padding:Q?4:12,colorDark:"#000000",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.L}),!Q){new QRCode("infoQrcode",{text:t,width:1.5*L,height:1.5*L});var e=document.getElementById("infoText"),a=M?V.display.defaultShareCampusTxt:V.display.defaultShareTxt;A("#screenshotMask .cvsPanel").on("animationend webkitAnimationEnd",function(){S(a,e,25)})}var n=document.getElementById("cvsText");n.width=L,S(c,n,r)}(),setTimeout(function(){W()},1100),A(window).width()>A(window).height()&&A("#screenshotMask").addClass("horizontal")}function W(){0<A(".cvsPanel").length&&((E=A(".cvsPanel").offset()).innerWidth=A(".cvsPanel").innerWidth(),E.innerHeight=A(".cvsPanel").innerHeight(),E.width=A(".cvsPanel").width(),E.height=A(".cvsPanel").height())}function _(t){if(Q){var e=A(".cvsPanel").height(),a=A(".pcbtnpanel").height(),n=t.height-e-a;A(".pcbtnpanel").css("bottom",n/2),A(".cvsPanel").css("bottom",n/2+125)}}function X(t){z=3,Q&&(z=1);var e={width:A(window).width(),height:A(window).height()};A(".cvsPanel").removeClass("cvsPanelH"),A(".cvsPanel").removeAttr("style"),A("#cvsPanoV").attr("width",e.width*z).attr("height",e.height*z),A(".touchPanel").removeClass("touchPanelH"),_(e);var a=document.getElementById("cvsPanoV").getContext("2d"),n=new Image;krpano.get("device.android")?n.src=krWebGL.canvas.toDataURL("image/jpeg"):n.src=krWebGL.makeScreenshot(0,0),n.onload=function(){a.drawImage(n,0,0,e.width*z,e.height*z),W(),O(),"ordinary"===D?(A(".touchPanel").show(),F()):U(t)}}function O(t){t||(t={left:E.left+(E.innerWidth-A(".touchPanel").width())/2,top:E.top+parseInt(.15*E.innerHeight)}),t.left<=E.left&&(t.left=E.left),t.top<=E.top&&(t.top=E.top),t.left+s.width>E.left+E.innerWidth&&(t.left=E.innerWidth+E.left-s.width),t.top+s.height>E.top+E.innerHeight&&(t.top=E.top+E.innerHeight-s.height),A(".touchPanel").css(t)}function Y(t){Q?(A(".errmsgpanel").css("visibility","visible").find("span").html(t),setTimeout(function(){A(".errmsgpanel").css("visibility","hidden")},4e3)):(A(".blackTips").remove(),A("body").append('<div class="blackTips"><span>'+t+"</span></div>"),setTimeout(function(){A(".blackTips").remove()},4e3))}function N(){krpano.call("restoreAutoRouate()")}function G(){var t,e=A.Deferred();return A.when((t=A.Deferred(),A.getScript(P,function(){t.resolve()}),t.promise()),function(){var t=A.Deferred();A("head").append("<link>");var e=A("head").children(":last");return e.on("load",function(){t.resolve()}),e.attr({rel:"stylesheet",type:"text/css",href:I}),t.promise()}()).done(function(){e.resolve()}),e.promise()}function U(t){function e(){F(),A("#screenshotMask .imgBox").height(A("#screenshotMask .cvsPanel").height()-A("#screenshotMask .infoBox").innerHeight()),$(),function(){var t=A("#screenshotMask .infoQrcode"),e=A("#screenshotMask .cvsPanel"),a=e.offset(),n=e.innerWidth(),i=parseInt(a.top+(1==H?80:50)),o=parseInt(a.left+(n/2-25));if(!t.hasClass("fixed"))return;t.css({top:i,left:o})}()}Q||"ordinary"===D||(t?A("#screenshotMask .cvsPanel").on("animationend webkitAnimationEnd",function(){e()}):e())}function F(){if(!Q&&2===j){var t=A("#screenshotMask .rdopanel"),e=A("#screenshotMask .cvsPanel"),a=t.innerHeight()+t.offset().top,n=A(window).height()-41-10-a,i=e.offset().top,o=e.innerHeight();i<a&&e.css({top:a+"px"}),"ordinary"===D?n<o&&e.height(n):n<o&&e.height(n-16)}}function $(){var t=A("#screenshotMask .imgBox"),e=t.offset(),a=t.width(),n=t.height();x={minTop:e.top,minLeft:e.left,maxTop:e.top+n-T,maxLeft:e.left+a-T}}function q(){var t=A("#screenshotMask .infoQrcode"),e=A("#screenshotMask .cvsPanel"),a=A("#screenshotMask .postcardBtnpanel"),n=A("#screenshotMask .postcardAvatarBtnpanel"),i=t.offset(),o=e.offset(),s=e.innerWidth(),r=parseInt(o.top+(1==H?80:50)),c=parseInt(o.left+(s/2-25));a.removeClass("postcardShowBtnpanel").hide(),n.addClass("postcardShowBtnpanel").show(),t.css({top:i.top,left:i.left}).addClass("transition fixed"),setTimeout(function(){t.css({top:r,left:c}),setTimeout(function(){var a,n,e,i,o,s,r,c,d;t.removeClass("transition"),c=A("#screenshotMask .infoQrcode"),d=!1,$(),c.on("touchstart",function(t){var e=A(this);r=e.offset(),a=t.originalEvent.touches[0].pageY,n=t.originalEvent.touches[0].pageX,d=!0}),c.on("touchmove",function(t){d&&(e=t.originalEvent.touches[0].pageY,i=t.originalEvent.touches[0].pageX,s=e-a+r.top,o=i-n+r.left,s=Math.max(Math.min(s,x.maxTop),x.minTop),o=Math.max(Math.min(o,x.maxLeft),x.minLeft),c.css({top:s,left:o}))}),c.on("touchend",function(t){d=!1})},500)},0)}function J(t){m=t,e?Z(t):A.when(G()).done(function(){e=Cropper,Z(t)})}function K(){var t,e,a=A("#screenshotMaskImage .imageBox");2==j?(A("#screenshotMaskImage").addClass("horizontal"),a.width(A(window).height()-91),t=e=a.width()):(A("#screenshotMaskImage").removeClass("horizontal"),a.width("auto"),t=e=A(window).width()-20),a.find(".container").width(t).height(e),a.find(".container>div").width(t).height(e)}function Z(n){var t,e=null;0===A("#screenshotMaskImage").size()&&A("body").append(a),t=A("#screenshotMaskImage .promptBox"),hideAjaxLoading(),K(),A("#screenshotMaskImage").show(),p&&(p=!1,t.show(),t.on("touchend",function(){clearTimeout(e),t.hide()}),e=setTimeout(function(){t.hide()},3e3));var i=new Image;i.onload=function(){var t,e=document.createElement("canvas"),a=e.getContext("2d");e.width=i.width,e.height=i.height,1e3<i.width&&(e.width=1e3,e.height=i.height/i.width*1e3),a.drawImage(i,0,0,e.width,e.height),n=e.toDataURL("image/jpeg"),t=n,u?u.replace(t):(image=document.querySelector("#screenshotMaskImageDom"),A("#screenshotMaskImageDom").attr("src",t),u=new Cropper(image,{viewMode:3,dragMode:"move",initialAspectRatio:1,aspectRatio:1,autoCropArea:1,restore:!1,modal:!1,guides:!1,center:!1,scalable:!0,highlight:!1,cropBoxMovable:!1,cropBoxResizable:!1,toggleDragModeOnDblclick:!1}),!g&&(g=!0,A("body").on("touchstart","#screenshotMaskImage .minusRotate90",function(){u.rotate(90)}),A("body").on("touchstart","#screenshotMaskImage .addRotate90",function(){u.rotate(-90)}),A("body").on("touchstart","#screenshotMaskImage .cancelBtn",function(){A("#screenshotMaskImage").hide()}),A("body").on("touchstart","#screenshotMaskImage .enterBtn",function(){var t=u.getCroppedCanvas({width:500,height:500});document.getElementById("infoAvatar").getContext("2d").drawImage(t,0,0,T*z,T*z),A("#screenshotMaskImage").hide(),A("#infoQrcode").hasClass("fixed")||q(),A(".infoAvatar").show()})))},i.src=n}function tt(t,e){t.drawImage(e.dom,e.left,e.top,e.width,e.height)}d.closeScreenCapturePanel=function(){A("#screenshotMask").remove(),A("#screenshotMaskImage").hide(),krpano.call("removeClearScreenPlus()"),N()},d.closeScreenImagePanel=function(){A("#panoImg").remove(),A("#screenshotMaskImage").hide(),krpano.call("removeClearScreenPlus()"),N()},d.changeCaptureMode=function(){var t=A(this).attr("data-type");A("#cvsPanoV,#cvsPanoH").hide(),"panoV"==t?(H=1,A("#cvsPanoV").show(),X()):"panoH"==t&&(H=2,A("#cvsPanoH").show(),function(){A(".touchPanel").hide(),A(".cvsPanel").addClass("cvsPanelH"),A(".touchPanel").addClass("touchPanelH");var t={width:A(window).width(),height:A(window).height()};t.height<t.width?(z=3,Q?(A(".cvsPanel").css("width",.62*t.width),A(".cvsPanel").css("height",.31*t.width)):("postcard"===D?A(".cvsPanel").css("height",.35*t.width+65):A(".cvsPanel").css("height",.35*t.width),A(".cvsPanel").css("width",.7*t.width))):(z=4,Q?(z=3,A(".cvsPanel").removeClass("cvsPanelH"),A(".cvsPanel").css("height",.31*t.width)):("postcard"===D?A(".cvsPanel").css("height",A(window).width()/2*.8+65):A(".cvsPanel").css("height",A(window).width()/2),A(".cvsPanel").css("margin-top",-A(window).width()/4))),_(t),"ordinary"===D&&F(),W(),A("#cvsPanoH").attr("width",t.width*z).attr("height",t.width*z/2);var e=new Image;e.crossOrigin="*",e.onload=function(){document.getElementById("cvsPanoH").getContext("2d").drawImage(e,0,0,e.width,e.height,0,0,t.width*z,parseInt(t.width*z/2)),"ordinary"===D&&A(".touchPanel").show(),O()},e.onerror=function(){e.src="//s.expoon.com/image/z/krpano/images/share_defbg.jpg"};var a,n=/(\/((?!\/).)+\.jpg)/,i=krpano.get("scene[get(xml.scene)].content").match(/\<preview *url="(((?!<)(?!>).)*)" *\/\>/)[1],o=i.match(n)[0];i?-1!=i.indexOf("pimgs/")?a=i.replace("preview","share"):2===o.split("_").length?a=i.replace(n,"/share$1"):3===o.split("_").length&&(a=i.replace(n,"/share$1").replace("preview.jpg","share.jpg")):a=defaultImg,e.src=a,U()}())},d.setQRCodeTitle=function(){var t,e,a,n=0;t=A(Q||"ordinary"===D?"#txtshareTitle":"#txtPostcardshareTitle").val(),e=Q||"ordinary"===D?document.getElementById("cvsText"):document.getElementById("infoText"),R=!(n=0),a=Q||"ordinary"===D?28:48;for(var i=0;i<t.length;i++)n+=C(t[i]);if(""==t.trim()?(t=Q||"ordinary"===D?c:M?V.display.defaultShareCampusTxt:V.display.defaultShareTxt,R=!1):a<n&&Y(28===a?V.display.characterLimit28Txt:V.display.characterLimit48Txt),S(t,e,r),Q||("ordinary"===D?(A(".txtpanel").hide(),document.getElementById("txtshareTitle").blur()):(A(".txtPostcard").hide(),document.getElementById("txtPostcardshareTitle").blur())),Q||"ordinary"===D){var o=A(".touchPanel").offset();(s=A(".touchPanel").offset()).width=A(".touchPanel").width(),s.height=A(".touchPanel").height(),O(o)}},d.uploadAvatarFun=function(){l?(v=!1,f=j,wx.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album","camera"],fail:function(t){f===j?v=!0:A("body").append('<div id="switchOrientationBox">'+(1==f?V.display.rotatingVerticalScreenTxt:V.display.rotatingHorizontalScreenTxt)+"</div>")},cancel:function(){f===j?v=!0:A("body").append('<div id="switchOrientationBox">'+(1==f?V.display.rotatingVerticalScreenTxt:V.display.rotatingHorizontalScreenTxt)+"</div>")},success:function(t){var e=t.localIds[0];f===j?v=!0:A("body").append('<div id="switchOrientationBox">'+(1==f?V.display.rotatingVerticalScreenTxt:V.display.rotatingHorizontalScreenTxt)+"</div>"),showAjaxLoading(),n?window.__wxjs_is_wkwebview?wx.getLocalImgData({localId:e,success:function(t){J(t.localData)}}):J(e):wx.uploadImage({localId:e,isShowProgressTips:1,success:function(t){var e=t.serverId;A.get("//api.expoon.com/WeixinSdk/getWxFile?media_id="+e,function(t){var e=t.info||"error",a=t.data||"";"success"===e&&a?J(a):(Y("图片获取失败，请重新添加图片"),hideAjaxLoading())},"json")}})}})):(A(".blackTips").remove(),clearTimeout(t),A("body").append('<div class="blackTips wxNoLoginTips"><img src="//s.expoon.com/cache/1537328616377/image/z/krpano/images/wx.png" style="'+(1==lantype?"":"margin-top:20px;margin-bottom:13px;")+'"><br>'+V.display.uploadAvatarTipsTxt+"</div>"),t=setTimeout(function(){A(".blackTips").remove()},4e3))},d.synthesizeImage=function(){var t,e,a,n,i,o,s,r,c,d,h,l,p,g,v,f,u,m,x,w,y,T=A("#cvsPanoV").is(":visible")?A("#cvsPanoV"):A("#cvsPanoH"),k=A("#cvsQrcode"),b=A("#cvsText"),I={g:T.get(0).getContext("2d")},P={g:k.get(0).getContext("2d"),left:k.offset().left-E.left,top:k.offset().top-E.top,width:L,height:L},M={g:b.get(0).getContext("2d"),left:b.offset().left-E.left,top:b.offset().top-E.top,width:L,height:b.attr("height")};if(Q){var C={};1==H?(I.g.drawImage(k.get(0),Math.ceil(P.left/.62*z),Math.ceil(P.top/.62*z),Math.ceil(P.width/.62*z),Math.ceil(P.height/.62*z)),R&&I.g.drawImage(b.get(0),Math.ceil(M.left/.62*z),Math.ceil(M.top/.62*z),Math.ceil(M.width/.62*z),Math.ceil(M.height/.62*z)),C={width:A(window).width(),height:A(window).height()}):2==H&&(I.g.drawImage(k.get(0),parseInt(P.left/.62*z),parseInt(P.top/.62*z),Math.ceil(P.width/.62*z),Math.ceil(P.height/.62*z)),R&&I.g.drawImage(b.get(0),parseInt(M.left/.62*z),parseInt(M.top/.62*z),Math.ceil(M.width/.62*z),Math.ceil(M.height/.62*z)),C={width:1400,height:700}),A("#tempCvs").remove(),A("body").append('<canvas id="tempCvs" width="'+C.width+'" height="'+C.height+'"></canvas>');var S=document.getElementById("tempCvs");S.getContext("2d").drawImage(T.get(0),0,0,Number(T.attr("width")),Number(T.attr("height")),0,0,C.width,C.height),T.attr("width",C.width).attr("height",C.height),T.get(0).getContext("2d").drawImage(S,0,0,C.width,C.height),A("#tempCvs").remove()}else"postcard"===D?(t=T,n=A("#screenshotMask .cvsPanel"),i=A("#screenshotMask #infoQrcode"),o=A("#screenshotMask #infoAvatar"),s=A("#screenshotMask #infoText"),r=A("#screenshotMask .infoBox"),c=n.offset(),d=t.offset(),h=i.offset(),l=o.offset(),p=s.offset(),g=r.offset(),v={dom:t.get(0),g:t.get(0).getContext("2d"),width:t.width()*z,height:t.height()*z,top:(d.top-c.top)*z,left:(d.left-c.left)*z},f={dom:i.get(0),g:i.get(0).getContext("2d"),width:i.width()*z,height:i.height()*z,top:(h.top-c.top)*z,left:(h.left-c.left)*z},u={dom:o.get(0),g:o.get(0).getContext("2d"),width:o.width()*z,height:o.height()*z,top:(l.top-c.top)*z,left:(l.left-c.left)*z},m={dom:s.get(0),g:s.get(0).getContext("2d"),width:s.get(0).width,height:s.get(0).height,top:(p.top-c.top)*z,left:(p.left-c.left)*z},x={width:r.innerWidth()*z,height:r.innerHeight()*z,top:(g.top-c.top)*z,left:(g.left-c.left)*z},w=document.createElement("canvas"),y=w.getContext("2d"),w.width=e=parseInt(n.innerWidth()*z),w.height=a=parseInt(n.innerHeight()*z),y.fillStyle="#ffffff",y.fillRect(0,0,e,a),tt(y,v),y.fillStyle="#ffffff",y.fillRect(x.left,x.top,x.width,x.height),tt(y,f),A("#screenshotMask .infoQrcode").hasClass("fixed")&&tt(y,u),tt(y,m),T=A(w)):1==j?1==H?(I.g.drawImage(k.get(0),parseInt(P.left/.8*z),parseInt(P.top/.8*z),P.width,P.height),R&&I.g.drawImage(b.get(0),parseInt(M.left/.8*z),parseInt(M.top/.8*z),M.width,M.height)):2==H&&(I.g.drawImage(k.get(0),parseInt(P.left*z),parseInt(P.top*z),P.width,P.height),R&&I.g.drawImage(b.get(0),parseInt(M.left*z),parseInt(M.top*z),M.width,M.height)):(I.g.drawImage(k.get(0),parseInt(P.left*z/.7),parseInt(P.top*z/.7),P.width,P.height),R&&I.g.drawImage(b.get(0),parseInt(M.left*z/.7),parseInt(M.top*z/.7),M.width,M.height));var B;new Image;Q?A("body").append('<div id="panoImg"  class="pcMode"><div class="scMskclose"></div><img '+(2==H?'style="width:1400px"':"")+" /></div>"):(A("body").append('<div id="panoImg"><div class="scMskclose"></div><img /></div>'),"postcard"===D&&(A("#panoImg .scMskclose").addClass("postcard"),2===j&&A("#panoImg").addClass("postcardImg"))),A("#panoImg>img").get(0).src=T.get(0).toDataURL("image/jpeg"),A("#screenshotMask").remove(),B=Q?V.display.rightClickTxt:V.display.longPressTxt,setTimeout(function(){A("#panoImg").append('<div class="'+(Q?"savetipsPC":"savetips")+'"><span class="icon"></span><span class="txt">'+B+"</span></div>"),setTimeout(function(){A(".tips").remove()},4e3)},1e3)},A(function(){A("body").append('<audio id="adoCaptureBG"  preload="true" startaudio="true" src="//s.expoon.com/image/z/krpano/images/captureBGSound.mp3" style="display:none"></audio>'),/Android|iPhone/i.test(navigator.userAgent)||(Q=!0,c=1==lantype?"   添加文字":"     Text"),/MicroMessenger/.test(navigator.userAgent)&&(l=!0,A.when(G()).done(function(){e=Cropper})),/iPhone/.test(navigator.userAgent)&&(n=!0),V.display=1==lantype?V.chinese:V.english}),i.addScreenShotEvents=function(){var n=!0,e=null;if(window.clearScreenEnd=function(){var t=document.getElementById("adoCaptureBG");t&&t.play(),B()},!Q){var t=navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/),a=parseInt(t?t[1]:0);A("body").on("touchstart","#expoonPano",function(t){o={left:t.originalEvent.touches[0].pageX,top:t.originalEvent.touches[0].pageY},n=!0,clearTimeout(e),e=setTimeout(function(){1==n&&(A("body").append('<div class="screenshotBtn screenshotBtn_show"></div>'),0,krpano.call("setClearScreenPlus()"))},500)}),(!a||11<=a)&&A("body").on("touchmove","#screenshotMask",function(t){return!1}),A("body").on("touchmove",function(t){var e=t.originalEvent.touches[0].pageX,a=t.originalEvent.touches[0].pageY;(3<Math.abs(e-o.left)||3<Math.abs(a-o.top))&&(n=!1)}),A("body").on("touchend",function(t){n=!1})}!function(){var a={x:0,y:0},n=!1;function e(){(s=A(this).offset()).width=A(this).width(),s.height=A(this).height()}function i(t,e){return O({left:e.x-a.x+s.left,top:e.y-a.y+s.top}),t.preventDefault(),!1}A("body").on("touchstart",".touchPanel",function(t){a={x:t.originalEvent.touches[0].pageX,y:t.originalEvent.touches[0].pageY},e.call(this)}),A("body").on("touchmove",".touchPanel",function(t){var e={x:t.originalEvent.touches[0].pageX,y:t.originalEvent.touches[0].pageY};return i.call(this,t,e)}),A("body").on("mousedown",".touchPanel",function(t){n=!0,a={x:t.pageX,y:t.pageY},e.call(this)}),A("body").on("mousemove","#screenshotMask",function(t){if(!/INPUT/i.test((t.srcElement||t.target).tagName)){if(!n)return!1;var e={x:t.pageX,y:t.pageY};return i.call(this,t,e)}}),A("body").on("mouseup",function(){n=!1})}(),A("body").on("click",".touchPanel",function(){Q||(A(".txtpanel").css("display","flex"),document.getElementById("txtshareTitle").focus(),setTimeout(function(){A(".txtpanel")[0].scrollIntoView(!0)},300))}),A("body").on("click","#btnSetTitle",d.setQRCodeTitle),A("body").on("click","#btnPCConfirm",d.setQRCodeTitle),A("body").on("click","#btnPCCancel",function(){A("#txtshareTitle").val(""),d.setQRCodeTitle()}),Q||A(document).on("keypress",function(t){13===t.keyCode&&d.setQRCodeTitle()}),Q||(A("body").on("touchstart",".rdopanel .switchIcon",function(){var t=A(this);"postcard"===D?(D="ordinary",t.html(V.display.ordinaryTxt),A(".cvsPanel").removeClass("postcardMode"),A(".touchPanel").removeClass("postcardMode").show(),A(".ordinaryBtnpanel").show(),A(".postcardShowBtnpanel").hide()):(D="postcard",t.html(V.display.postcardTxt),A(".cvsPanel").addClass("postcardMode"),A(".touchPanel").addClass("postcardMode").hide(),A(".ordinaryBtnpanel").hide(),A(".postcardShowBtnpanel").show()),d.changeCaptureMode.call(A(".rdopanel .optional .on").parent()[0])}),A("body").on("touchend click",".infoText",function(){A("#screenshotMask .txtPostcard").css("display","flex"),document.getElementById("txtPostcardshareTitle").focus(),setTimeout(function(){A(".txtPostcard")[0].scrollIntoView(!0)},300)}),A("body").on("touchstart",".txtPostcard .changeOne",function(){var t=parseInt(Math.random()*h.length);A("#txtPostcardshareTitle").val(h[t])}),A("body").on("click","#btnSetTitlePostcard",d.setQRCodeTitle),A("body").on("touchstart",".uploadAvatarBtn",d.uploadAvatarFun),A("body").on("touchstart",".rdopanel .optional",function(){A(".optional>.inner").removeClass("on"),A(this).find(".inner").addClass("on"),d.changeCaptureMode.call(this)})),A("body").on("click",".checkpanel>div",function(){A(".checkpanel span").removeClass("on"),A(this).find("span").addClass("on"),d.changeCaptureMode.call(this)}),A("body").on("touchstart",".sharebtn",d.synthesizeImage),A("body").on("click","#btnSynthesize",d.synthesizeImage),A("body").on("touchstart","#screenshotMask>.scMskclose",d.closeScreenCapturePanel.bind(this)),A("body").on("click","#screenshotMask>.scMskclose",d.closeScreenCapturePanel.bind(this)),A("body").on("mousedown","#screenshotMask",function(t){var e=A(t.srcElement||t.target);Q&&0==e.closest(".cvsPanel").length&&0==e.closest(".touchPanel").length&&0==e.closest(".pcbtnpanel").length&&d.closeScreenCapturePanel()}),A("body").on("touchstart","#panoImg>.scMskclose",d.closeScreenImagePanel),A("body").on("click","#panoImg>.scMskclose",d.closeScreenImagePanel),window.addEventListener&&window.addEventListener("onorientationchange"in window?"orientationchange":"resize",function(){if(/iphone|android/i.test(navigator.userAgent))if(j=90===window.orientation||-90===window.orientation?2:1,v){if(0<A("#screenshotMaskImage").size()&&A("#screenshotMaskImage").hide(),0<A("#screenshotMask").length||0<A("#panoImg").length){var t=document.getElementById("txtshareTitle");t&&t.blur(),A("#screenshotMask").remove(),A("#panoImg").remove(),krpano.call("removeClearScreenPlus()"),N()}}else f===j&&(v=!0,setTimeout(function(){K(),u&&u.replace(m),A("#switchOrientationBox").remove()},300))}),A(window).on("resize",function(){/iphone/i.test(navigator.userAgent)}),document.body.addEventListener&&document.body.addEventListener("touchmove",function(t){var e=l?"#screenshotMask,#panoImg":".cvsPanel";0!=A(t.srcElement).closest(e).length&&t.preventDefault()},{passive:!1}),i.captureScreen=function(){0,krpano.call("setClearScreenPlus()")}},i.screenshot={}}(window,$);