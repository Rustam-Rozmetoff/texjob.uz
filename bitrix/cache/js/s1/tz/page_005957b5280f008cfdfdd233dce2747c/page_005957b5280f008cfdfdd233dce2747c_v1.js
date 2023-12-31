
; /* Start:"a:4:{s:4:"full";s:82:"/bitrix/components/bitrix/photogallery/templates/.default/script.js?17000379676106";s:6:"source";s:67:"/bitrix/components/bitrix/photogallery/templates/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
function debug_info(text)
{
	container_id = 'debug_info_forum';
	var div = document.getElementById(container_id);
	if (!div || div == null)
	{
		div = document.body.appendChild(document.createElement("DIV"));
		div.id = container_id;
//		div.className = "forum-debug";
		div.style.position = "absolute";
		div.style.width = "170px";
		div.style.padding = "5px";
		div.style.backgroundColor = "#FCF7D1";
		div.style.border = "1px solid #EACB6B";
		div.style.textAlign = "left";
		div.style.zIndex = '7900'; 
		div.style.fontSize = '11px'; 
		
		div.style.left = document.body.scrollLeft + (document.body.clientWidth - div.offsetWidth) - 5 + "px";
		div.style.top = document.body.scrollTop + 5 + "px";
	}
	if (typeof text == "object")
	{
		for (var ii in text)
		{
			div.innerHTML += ii + ': ' + text[ii] + "<br />";
		}
	}
	else
	{
		div.innerHTML += text + "<br />";
	}
	return;
}
/************************************************/

function PhotoPopupMenu()
{
	var _this = this;
	this.active = null;
	this.just_hide_item = false;
	this.events = null;
	
	this.PopupShow = function(div, pos, set_width, set_shadow, events)
	{
		this.PopupHide();
		if (!div) { return; } 
		if (typeof(pos) != "object") { pos = {}; } 

		this.active = div.id;
		
		if (set_width !== false && !div.style.width)
		{
			div.style.width = div.offsetWidth + 'px';
		}
		
		this.events = ((events && typeof events == "object") ? events : null);

		var res = jsUtils.GetWindowSize();
		
		pos['top'] = (pos['top'] ? pos['top'] : parseInt(res["scrollTop"] + res["innerHeight"]/2 - div.offsetHeight/2));
		pos['left'] = (pos['left'] ? pos['left'] : parseInt(res["scrollLeft"] + res["innerWidth"]/2 - div.offsetWidth/2));
		
		jsFloatDiv.Show(div, pos["left"], pos["top"], set_shadow, true, false);
		div.style.display = '';
		
		jsUtils.addEvent(document, "keypress", _this.OnKeyPress);
		
		var substrate = document.getElementById("photo_substrate");
		if (!substrate)
		{
			substrate = document.createElement("DIV");
			substrate.id = 	"photo_substrate";
			substrate.style.position = "absolute";
			substrate.style.display = "none";
			substrate.style.background = "#052635";
			substrate.style.opacity = "0.5";
			substrate.style.top = "0";
			substrate.style.left = "0";
			if (substrate.style.MozOpacity)
				substrate.style.MozOpacity = '0.5';
			else if (substrate.style.KhtmlOpacity)
				substrate.style.KhtmlOpacity = '0.5';
			if (jsUtils.IsIE())
		 		substrate.style.filter += "progid:DXImageTransform.Microsoft.Alpha(opacity=50)";
			document.body.appendChild(substrate);
		}
		
		substrate.style.width = res["scrollWidth"] + "px";
		substrate.style.height = res["scrollHeight"] + "px";
		substrate.style.zIndex = 7500;
		substrate.style.display = 'block';
	}

	this.PopupHide = function()
	{
		this.active = (this.active == null && arguments[0] ? arguments[0] : this.active);
		
		this.CheckEvent('BeforeHide');
		
		var div = document.getElementById(this.active);
		if (div)
		{
			jsFloatDiv.Close(div);
			div.style.display = 'none';
			if (!this.just_hide_item) {div.parentNode.removeChild(div); } 
		}
		var substrate = document.getElementById("photo_substrate");
		if (substrate) { substrate.style.display = 'none'; } 

		this.active = null;
		
		jsUtils.removeEvent(document, "keypress", _this.OnKeyPress);
		
		this.CheckEvent('AfterHide');
		this.events = null;
	}

	this.CheckClick = function(e)
	{
		var div = document.getElementById(_this.active);
		
		if (!div || !_this.IsVisible()) { return; }
		if (!jsUtils.IsIE() && e.target.tagName == 'OPTION') { return false; }
		
		var x = e.clientX + document.body.scrollLeft;
		var y = e.clientY + document.body.scrollTop;

		/*menu region*/
		var posLeft = parseInt(div.style.left);
		var posTop = parseInt(div.style.top);
		var posRight = posLeft + div.offsetWidth;
		var posBottom = posTop + div.offsetHeight;
		
		if (x >= posLeft && x <= posRight && y >= posTop && y <= posBottom) { return; }

		if(_this.controlDiv)
		{
			var pos = jsUtils.GetRealPos(_this.controlDiv);
			if(x >= pos['left'] && x <= pos['right'] && y >= pos['top'] && y <= pos['bottom'])
				return;
		}
		_this.PopupHide();
	}

	this.OnKeyPress = function(e)
	{
		if(!e) e = window.event
		if(!e) return;
		if(e.keyCode == 27)
			_this.PopupHide();
	},

	this.IsVisible = function()
	{
		return (document.getElementById(this.active).style.visibility != 'hidden');
	}, 
	
	this.CheckEvent = function()
	{
		if (!this.events || this.events == null)
		{
			return false;
		}
		
		eventName = arguments[0];
		
		if (this.events[eventName]) 
		{ 
			return this.events[eventName](arguments); 
		} 
		return true;
	}
}
var PhotoMenu;
if (!PhotoMenu) 
	PhotoMenu = new PhotoPopupMenu();

var jsUtilsPhoto = {
	GetElementParams : function(element)
	{
		if (!element) return false;
		if (element.style.display != 'none' && element.style.display != null)
			return {width: element.offsetWidth, height: element.offsetHeight};
		var originstyles = {position: element.style.position, visibility : element.style.visibility, display: element.style.display};
		element.style.position = 'absolute';
		element.style.visibility = 'hidden';
		element.style.display = 'block';
		var result = {width: element.offsetWidth, height: element.offsetHeight};
		element.style.display = originstyles.display;
		element.style.visibility = originstyles.visibility;
		element.style.position = originstyles.position;
		return result;
	}, 
	ClassCreate : function(parent, properties)
	{
		function oClass() { 
			this.init.apply(this, arguments); 
		}
		
		if (parent) 
		{
			var temp = function() { };
			temp.prototype = parent.prototype;
			oClass.prototype = new temp;
		}
		
		for (var property in properties)
			oClass.prototype[property] = properties[property];
		if (!oClass.prototype.init)
			oClass.prototype.init = function() {};
		
		oClass.prototype.constructor = oClass;
		
		return oClass;
	}, 
	ObjectsMerge : function(arr1, arr2)
	{
		var arr3 = {};
		for (var key in arr1)
			arr3[key] = arr1[key];
		for (var key in arr2)
			arr3[key] = arr2[key];
		return arr3;
	}
}; 

window.bPhotoMainLoad = true;
/* End */
;
; /* Start:"a:4:{s:4:"full";s:94:"/bitrix/components/bitrix/photogallery.upload/templates/.default/script.min.js?170003796726818";s:6:"source";s:74:"/bitrix/components/bitrix/photogallery.upload/templates/.default/script.js";s:3:"min";s:78:"/bitrix/components/bitrix/photogallery.upload/templates/.default/script.min.js";s:3:"map";s:78:"/bitrix/components/bitrix/photogallery.upload/templates/.default/script.map.js";}"*/
(function(e){if(BX["UploaderTemplateThumbnails"])return false;function t(e){this.bCreated=false;this.bOpened=false;this.zIndex=5e3;this.pWnd=BX.create("DIV",{props:{className:"bxiu-color-but bxiu-but"}});this.pWnd.style.backgroundColor=e;var t=this;this.pWnd.onmousedown=function(e){t.OnClick(e,this)}}t.prototype={Create:function(){var e=this;this.pColCont=document.body.appendChild(BX.create("DIV",{props:{className:"wm-colpick-cont"},style:{zIndex:this.zIndex}}));var t=["#FF0000","#FFFF00","#00FF00","#00FFFF","#0000FF","#FF00FF","#FFFFFF","#EBEBEB","#E1E1E1","#D7D7D7","#CCCCCC","#C2C2C2","#B7B7B7","#ACACAC","#A0A0A0","#959595","#EE1D24","#FFF100","#00A650","#00AEEF","#2F3192","#ED008C","#898989","#7D7D7D","#707070","#626262","#555","#464646","#363636","#262626","#111","#000000","#F7977A","#FBAD82","#FDC68C","#FFF799","#C6DF9C","#A4D49D","#81CA9D","#7BCDC9","#6CCFF7","#7CA6D8","#8293CA","#8881BE","#A286BD","#BC8CBF","#F49BC1","#F5999D","#F16C4D","#F68E54","#FBAF5A","#FFF467","#ACD372","#7DC473","#39B778","#16BCB4","#00BFF3","#438CCB","#5573B7","#5E5CA7","#855FA8","#A763A9","#EF6EA8","#F16D7E","#EE1D24","#F16522","#F7941D","#FFF100","#8FC63D","#37B44A","#00A650","#00A99E","#00AEEF","#0072BC","#0054A5","#2F3192","#652C91","#91278F","#ED008C","#EE105A","#9D0A0F","#A1410D","#A36209","#ABA000","#588528","#197B30","#007236","#00736A","#0076A4","#004A80","#003370","#1D1363","#450E61","#62055F","#9E005C","#9D0039","#790000","#7B3000","#7C4900","#827A00","#3E6617","#045F20","#005824","#005951","#005B7E","#003562","#002056","#0C004B","#30004A","#4B0048","#7A0045","#7A0026"],i,s,o,a=BX.create("TABLE",{props:{className:"wm-colpic-tbl"}}),n,r=t.length;i=a.insertRow(-1);s=i.insertCell(-1);s.colSpan=8;var l=s.appendChild(BX.create("SPAN",{props:{className:"wm-colpic-def-but"},text:BX.message("IUDefaultColor")}));l.onmouseover=function(){this.className="wm-colpic-def-but wm-colpic-def-but-over";o.style.backgroundColor="#FF0000"};l.onmouseout=function(){this.className="wm-colpic-def-but"};l.onmousedown=function(t){e.Select("#FF0000")};o=i.insertCell(-1);o.colSpan=8;o.className="wm-color-inp-cell";o.style.backgroundColor=t[38];var d=function(){this.className="wm-col-cell wm-col-cell-over";o.style.backgroundColor=t[this.id.substring("lhe_color_id__".length)]},h=function(){this.className="wm-col-cell"},p=function(){var i=this.id.substring("lhe_color_id__".length);e.Select(t[i])};for(n=0;n<r;n++){if(Math.round(n/16)==n/16)i=a.insertRow(-1);s=i.insertCell(-1);s.innerHTML="&nbsp;";s.className="wm-col-cell";s.style.backgroundColor=t[n];s.id="lhe_color_id__"+n;s.onmouseover=d;s.onmouseout=h;s.onmousedown=p}this.pColCont.appendChild(a);this.bCreated=true},OnClick:function(e,t){if(this.disabled)return false;if(!this.bCreated)this.Create();if(this.bOpened)return this.Close();this.Open()},Open:function(){var t=BX.pos(this.pWnd),i=this,s,o=t.left;this.pColCont.style.display="block";if(BX.browser.IsIE()){s=t.top-parseInt(this.pColCont.offsetHeight)-2}else{t=BX.align(t,325,155,"top");s=t.top;o=t.left}BX.bind(e,"keypress",BX.proxy(this.OnKeyPress,this));a.Show({onclick:function(){i.Close()}});this.pColCont.style.top=s+"px";this.pColCont.style.left=o+"px";this.bOpened=true},Close:function(){this.pColCont.style.display="none";a.Hide();BX.unbind(e,"keypress",BX.proxy(this.OnKeyPress,this));this.bOpened=false},OnKeyPress:function(t){if(!t)t=e.event;if(t.keyCode==27)this.Close()},Select:function(e){this.pWnd.style.backgroundColor=e;BX.onCustomEvent(this,"onChange",[e]);this.Close()}};function i(e){var t=this;this.bCreated=false;this.bOpened=false;this.zIndex=5e3;this.oPar=e;this.pWnd=BX.create("DIV",{props:{className:"bxiu-but bxiu-but-"+e.id}});this.pWnd.onmousedown=function(e){t.OnClick(e,this)};if(e.title)this.pWnd.title=e.title;this.oPopup=new BX.CWindow(false,"float");if(this.oPar&&typeof this.oPar.OnCreate=="function")this.oPar.OnCreate(this);var i,s=this.oPar.items.length,o=function(){t.SelectItem(this.id.substr(parseInt("bxiu__item_".length)))};for(i=0;i<s;i++){this.oPar.items[i].pItem=BX.create("DIV",{props:{id:"bxiu__item_"+i,className:"bxiu-popup-but "+this.oPar.classPrefix+this.oPar.items[i].value.toLowerCase()}});if(this.oPar.items[i].title)this.oPar.items[i].pItem.title=this.oPar.items[i].title;this.oPopup.Get().appendChild(this.oPar.items[i].pItem);this.oPar.items[i].pItem.onmousedown=o}if(typeof e.currentValue!="undefined")this.SelectItem(false,e.currentValue);this.pWnd.onmousedown=function(e){t.OnClick(e,this)}}i.prototype={OnClick:function(e,t){if(this.bOpened)return this.Close();this.Open()},Close:function(){a.Hide();this.oPopup.Close();this.bOpened=false},Open:function(){this.oPopup.Show();var e=BX.pos(this.pWnd),t=e.top,i=e.left;t-=this.oPopup.Get().offsetHeight;this.oPopup.Get().style.top=t+"px";this.oPopup.Get().style.left=i+"px";var s=this;a.Show({onclick:function(){s.Close()}});this.bOpened=true},SelectItem:function(e,t){if(e===false&&t){var i,s=this.oPar.items.length,o;for(i=0;i<s;i++)if(this.oPar.items[i].value==t)break;e=i}var a=this.oPar.items[e]?this.oPar.items[e]:this.oPar.items[0];if(this.oPar.items[this.activeItemInd])BX.removeClass(this.oPar.items[this.activeItemInd].pItem,"bxiu-active");if(this.oPar.items[e]&&this.oPar.items[e].pItem)BX.addClass(this.oPar.items[e].pItem,"bxiu-active");if(this.activeItemInd!=e){BX.onCustomEvent(this,"onChange",[a.value])}this.activeItemInd=e;this.Close()}};function s(e){this.pCont=BX.create("DIV",{props:{className:"bxiu-opacity"}});this.pCont.appendChild(BX.create("DIV",{props:{className:"bxiu-opacity-label"},text:BX.message("IUOpacity")}));var t=this.pCont.appendChild(BX.create("DIV",{props:{className:"bxiu-op-div"}}));this.oPar=e;this.values=[{value:100,title:"0%"},{value:75,title:"25%"},{value:50,title:"50%"},{value:25,title:"75%"}];var i=this,s,o=this.values.length,a,n=function(){i.SelectItem(parseInt(this.id.substr("bxiu_op_item_".length)))};for(s=0;s<o;s++){a=t.appendChild(BX.create("DIV",{props:{id:"bxiu_op_item_"+s,className:"bxiu-op-val-cont"}}));a.appendChild(BX.create("DIV",{props:{className:"bxiu-op-l-corn"}}));a.appendChild(BX.create("DIV",{props:{className:"bxiu-op-center"},html:"<span>"+this.values[s].title+"</span>"}));a.appendChild(BX.create("DIV",{props:{className:"bxiu-op-r-corn"}}));a.onmousedown=n;this.values[s].cont=a}if(typeof e.currentValue!="undefined")this.SelectItem(false,e.currentValue)}s.prototype={SelectItem:function(e,t){if(e===false&&typeof t!="undefined"){var i,s=this.values.length;for(i=0;i<s;i++){if(this.values[i].value==t){break}}e=i}e=typeof e=="number"&&0<=e&&e<this.values.length?e:0;if(this.activeItemInd!=e){BX.onCustomEvent(this,"onChange",[this.values[e].value]);if(this.values[this.activeItemInd])BX.removeClass(this.values[this.activeItemInd].cont,"bxiu-op-val-cont-active");this.activeItemInd=e;BX.addClass(this.values[e].cont,"bxiu-op-val-cont-active")}}};function o(){this.id="bxiu_trans_overlay";this.zIndex=100}o.prototype={Create:function(){this.bCreated=true;this.bShowed=false;var e=BX.GetWindowScrollSize();this.pWnd=document.body.appendChild(BX.create("DIV",{props:{id:this.id,className:"bxiu-trans-overlay"},style:{zIndex:this.zIndex,width:e.scrollWidth+"px",height:e.scrollHeight+"px"}}));this.pWnd.ondrag=BX.False;this.pWnd.onselectstart=BX.False},Show:function(t){if(!this.bCreated)this.Create();this.bShowed=true;var i=BX.GetWindowScrollSize();this.pWnd.style.display="block";this.pWnd.style.width=i.scrollWidth+"px";this.pWnd.style.height=i.scrollHeight+"px";if(!t)t={};if(t.zIndex)this.pWnd.style.zIndex=t.zIndex;if(t.onclick&&typeof t.onclick=="function")this.pWnd.onclick=t.onclick;BX.bind(e,"resize",BX.proxy(this.Resize,this));return this.pWnd},Hide:function(){if(!this.bShowed)return;this.bShowed=false;this.pWnd.style.display="none";BX.unbind(e,"resize",BX.proxy(this.Resize,this));this.pWnd.onclick=null},Resize:function(){if(this.bCreated)this.pWnd.style.width=BX.GetWindowScrollSize().scrollWidth+"px"}};var a=new o;var n=null,r=null;BX.UploaderTemplateThumbnails=function(e,t){this.id=e["id"];this.UPLOADER_ID=e["UPLOADER_ID"];this.dialogName="BX.UploaderTemplateThumbnails";this.vars={filesCountForUpload:0};e["phpMaxFileUploads"]=10;if(e["copies"]){var i=1;for(var s in e["copies"]){if(e["copies"].hasOwnProperty(s)){i++}}e["phpMaxFileUploads"]=i*10}this.params=e;e.allowUploadExt="jpg,jpeg,png,gif";this.uploader=BX.Uploader.getInstance(e);this.init();return this};BX.UploaderTemplateThumbnails.prototype={init:function(){if(this.uploader.dialogName!="BX.Uploader"){BX.addClass(BX("bxuMain"+this.id),"bxu-thumbnails-simple")}this._onItemIsAdded=BX.delegate(this.onItemIsAdded,this);this._onFileIsAppended=BX.delegate(this.onFileIsAppended,this);BX.addCustomEvent(this.uploader,"onItemIsAdded",this._onItemIsAdded);BX.addCustomEvent(this.uploader,"onStart",BX.delegate(this.start,this));BX.addCustomEvent(this.uploader,"onDone",BX.delegate(this.done,this));BX.addCustomEvent(this.uploader,"onFinish",BX.delegate(this.finish,this));BX.addCustomEvent(this.uploader,"onTerminate",BX.delegate(this.terminate,this));BX.addCustomEvent(this.uploader,"onFileIsAppended",this._onFileIsAppended);BX.addCustomEvent(this.uploader,"onQueueIsChanged",BX.delegate(this.onChange,this));this._onUploadStart=BX.delegate(this.onUploadStart,this);this._onUploadProgress=BX.delegate(this.onUploadProgress,this);this._onUploadDone=BX.delegate(this.onUploadDone,this);this._onUploadError=BX.delegate(this.onUploadError,this);this._onUploadRestore=BX.delegate(this.onUploadRestore,this);this._onFileHasPreview=BX.delegate(this.onFileHasPreview,this);BX.bind(BX("bxuStartUploading"+this.id),"click",BX.delegate(this.uploader.submit,this.uploader));BX.bind(BX("bxuCancel"+this.id),"click",BX.delegate(this.uploader.stop,this.uploader));this.uploader.init(BX("bxuUploaderStart"+this.id));this.uploader.init(BX("bxuUploaderStartField"+this.id));BX.bind(BX("bxuReduced"+this.id),"click",BX.delegate((function(){BX.userOptions.save("main",this.UPLOADER_ID,"template","reduced");BX.addClass(BX("bxuReduced"+this.id),"bxu-templates-btn-active");BX.removeClass(BX("bxuEnlarge"+this.id),"bxu-templates-btn-active");BX.addClass(BX("bxuMain"+this.id),"bxu-main-block-reduced-size")}),this));BX.bind(BX("bxuEnlarge"+this.id),"click",BX.delegate((function(){BX.userOptions.save("main",this.UPLOADER_ID,"template","full");BX.removeClass(BX("bxuReduced"+this.id),"bxu-templates-btn-active");BX.addClass(BX("bxuEnlarge"+this.id),"bxu-templates-btn-active");BX.removeClass(BX("bxuMain"+this.id),"bxu-main-block-reduced-size")}),this));this.uploader.fileFields=!!this.uploader.fileFields?this.uploader.fileFields:{};this.uploader.fileFields.description=!!this.uploader.fileFields.description?this.uploader.fileFields.description:{}},onUploadStart:function(e){e.__progressBarWidth=1;var t=e.getPH("Thumb"),i=e.id,s,o=e.progress;BX.addClass(t,"bxu-item-loading");if(BX("bxu"+i+"ProgressBar")){BX.adjust(BX("bxu"+i+"ProgressBar"),{style:{width:e.__progressBarWidth+"%"}})}},onUploadProgress:function(e,t){var i=e.id;if(BX("bxu"+i+"ProgressBar")){e.__progressBarWidth=Math.max(e.__progressBarWidth,Math.ceil(t));BX.adjust(BX("bxu"+i+"ProgressBar"),{style:{width:e.__progressBarWidth+"%"}})}},onUploadDone:function(e){var t=this.uploader.getItem(e.id),i;if(t&&(i=t.node)&&i)BX.hide(i);e.file=null;delete e.file;BX.remove(e.canvas);e.canvas=null;delete e.canvas;this.vars["uploadedFilesCount"]++;BX("bxuUploaded"+this.id).innerHTML=this.vars["uploadedFilesCount"];BX("bxuUploadBar"+this.id).style.width=Math.ceil(this.vars["uploadedFilesCount"]/this.vars["filesCountForUpload"]*100)+"%";this.onChange(this.uploader.queue)},onUploadError:function(e,t,i){var s=e.getPH("Thumb");BX.removeClass(s,"bxu-item-loading");BX.addClass(s,"bxu-item-error");s.innerHTML=this.params.errorThumb.replace("#error#",t.error)},onUploadRestore:function(e){var t=e.getPH("Thumb");BX.removeClass(t,"bxu-item-loading");BX.removeClass(t,"bxu-item-loading-with-error")},start:function(e,t){this.vars["uploadedFilesCount"]=this.uploader.queue.itUploaded.length;this.vars["filesCountForUpload"]+=t.filesCount;BX("bxuUploadBar"+this.id).style.width=Math.ceil(this.vars["uploadedFilesCount"]/this.vars["filesCountForUpload"])+"%";BX("bxuUploaded"+this.id).innerHTML=this.vars["uploadedFilesCount"];BX("bxuForUpload"+this.id).innerHTML=this.vars["filesCountForUpload"];BX.addClass(BX("bxuMain"+this.id),"bxu-thumbnails-loading")},done:function(e,t,i,s){this.vars["filesCountForUpload"]-=i.filesCount;BX.removeClass(BX("bxuMain"+this.id),"bxu-thumbnails-loading");BX("bxuUploaded"+this.id).innerHTML=this.vars["uploadedFilesCount"];if(e!==null){this.redirectUrl=s.report.uploading[this.uploader.CID]["redirectUrl"]}},finish:function(t){if(t!==null&&this.uploader.queue.itFailed.length<=0&&BX.type.isNotEmptyString(this.redirectUrl)){if(BX.SidePanel&&BX.SidePanel.Instance.getTopSlider()===BX.SidePanel.Instance.getSliderByWindow(e)){e.location.href=this.redirectUrl}else{BX.reload(this.redirectUrl)}}},terminate:function(e,t){this.vars["filesCountForUpload"]-=t.filesCount;BX.removeClass(BX("bxuMain"+this.id),"bxu-thumbnails-loading");BX("bxuUploaded"+this.id).innerHTML=this.vars["uploadedFilesCount"]},onChange:function(e){if(!!BX("bxuImagesCount"+this.id)){this.vars["filesCount"]=e.items.length-(this.vars["uploadedFilesCount"]>0?this.vars["uploadedFilesCount"]:0);BX("bxuImagesCount"+this.id).innerHTML=this.vars["filesCount"]}},onItemIsAdded:function(e,t){BX.removeCustomEvent(this.uploader,"onItemIsAdded",this._onItemIsAdded);BX.removeClass(BX("bxuMain"+this.id),"bxu-thumbnails-start")},onFileHasPreview:function(e,t,i){},onFileIsAppended:function(e,t){if(t.dialogName=="BX.UploaderFile"||!BX.CanvasEditor){if(BX(e+"Edit"))BX.remove(BX(e+"Edit"));if(BX(e+"Turn"))BX.remove(BX(e+"Turn"))}else{if(BX(e+"Edit"))BX.bind(BX(e+"Edit"),"click",BX.delegate(t.clickFile,t));if(BX(e+"Turn")){t.__onTurnCanvas=BX.delegate((function(e,t,i){if(r===null)r=new BX.Canvas;if(r){i.drawImage(e,0,0);r.copy(t,{width:e.width,height:e.height});r.rotate(true);this.applyFile(r.cnv,true)}}),t);BX.bind(BX(e+"Turn"),"click",BX.delegate((function(){if(n===null&&!!BX.UploaderFileCnvConstr)n=new BX.UploaderFileCnvConstr;if(!!n){BX.adjust(n.getCanvas(),{props:{width:this.file.width,height:this.file.height}});n.push(this.file,this.__onTurnCanvas)}}),t))}}BX.addCustomEvent(t,"onUploadStart",this._onUploadStart);BX.addCustomEvent(t,"onUploadProgress",this._onUploadProgress);BX.addCustomEvent(t,"onUploadDone",this._onUploadDone);BX.addCustomEvent(t,"onUploadError",this._onUploadError);BX.addCustomEvent(t,"onUploadRestore",this._onUploadRestore);BX.addCustomEvent(t,"onFileHasPreview",this._onFileHasPreview);if(BX(e+"Del")){BX.bind(BX(e+"Del"),"click",function(){BX.removeCustomEvent(t,"onUploadStart",this._onUploadStart);BX.removeCustomEvent(t,"onUploadProgress",this._onUploadProgress);BX.removeCustomEvent(t,"onUploadDone",this._onUploadDone);BX.removeCustomEvent(t,"onUploadError",this._onUploadError);BX.removeCustomEvent(t,"onUploadRestore",this._onUploadRestore);BX.removeCustomEvent(t,"onFileHasPreview",this._onFileHasPreview);BX.unbindAll(BX(e+"Turn"));BX.unbindAll(BX(e+"Edit"));BX.unbindAll(BX(e+"Del"));t.deleteFile()}.bind(this))}}};BX.UploaderSettings=function(t){this.UPLOADER_ID=t["UPLOADER_ID"];this.id=t["id"];this.form=BX(t["UPLOADER_ID"]+"_form");var i=this;t=!!t?t:{};this.params=t["params"];if(t["show"]){for(var s=0;s<t["show"].length;s++)this.init(t["show"][s])}var o=BX("bxuMain"+i.id);if(BX("bxuSettings"+this.id)){BX("bxuSettings"+this.id).onclick=function(){if(BX.hasClass(o,"bxu-thumbnails-settings-are")){BX.removeClass(o,"bxu-thumbnails-settings-are");i.SaveUserOption("additional","N")}else{BX.addClass(o,"bxu-thumbnails-settings-are");i.SaveUserOption("additional","Y")}};i.SaveUserOption("additional",BX.hasClass(o,"bxu-thumbnails-settings-are")?"Y":"N")}this.n={};if(!!e["oBXUploaderHandler_"+this.UPLOADER_ID]){this.oUploadHandler=e["oBXUploaderHandler_"+this.UPLOADER_ID];BX.addCustomEvent(this,"onChangeSize",this.oUploadHandler.SetOriginalSize);BX.addCustomEvent(this,"onWMChangeUse",(function(e){i.oUploadHandler.Watermark.Using(e,false)}));BX.addCustomEvent(this,"onWMChangeType",i.oUploadHandler.Watermark.Type);BX.addCustomEvent(this,"onWMChangeText",i.oUploadHandler.Watermark.Text);BX.addCustomEvent(this,"onWMChangeCopyright",i.oUploadHandler.Watermark.Copyright);BX.addCustomEvent(this,"onWMChangeColor",i.oUploadHandler.Watermark.Color);BX.addCustomEvent(this,"onWMChangePosition",i.oUploadHandler.Watermark.Position);BX.addCustomEvent(this,"onWMChangeFile",(function(e,t){i.oUploadHandler.Watermark.File(e);i.oUploadHandler.Watermark.FileWidth(t[2]);i.oUploadHandler.Watermark.FileHeight(t[3])}))}return this};BX.UploaderSettings.prototype={SaveUserOption:function(e,t){e=e.toLowerCase();var i=e.substr(0,1).toUpperCase()+e.substr(1);if(!this.form["photo_watermark_"+e]){this.form.appendChild(BX.create("INPUT",{props:{type:"hidden",name:"photo_watermark_"+e,value:t},attrs:{"bxu-set":"Y"}}))}else if(!this.form["photo_watermark_"+e].hasAttribute("bxu-set")){this.form["photo_watermark_"+e].value=t;this.form["photo_watermark_"+e].setAttribute("bxu-set","Y")}else if(this.form["photo_watermark_"+e].value!=t){this.form["photo_watermark_"+e].value=t;BX.onCustomEvent(this,"onWMChange"+i,[t,arguments]);BX.userOptions.save("main",this.UPLOADER_ID,e,t)}},init:function(e){if(e=="resize"&&BX("bxiu_resize_"+this.UPLOADER_ID)){this.n["resizer"]=BX("bxiu_resize_"+this.UPLOADER_ID);this.form.photo_resize_size.value=this.n["resizer"].value;BX.bind(this.n["resizer"],"change",BX.delegate((function(){this.form.photo_resize_size.value=this.n["resizer"].value;BX.onCustomEvent(this,"onChangeSize",[this.n["resizer"].value])}),this))}else if(e=="watermark"){this.setWMUsing(this.params["use"]);this.setWMType(this.params["type"]);this.setWMText(this.params["text"]);this.setWMCopyright(this.params["copyright"]);this.setWMColor(this.params["color"]);this.setWMPosition(this.params["position"]);this.setWMSize(this.params["size"]);this.setWMFile(this.params["file"]);this.setWMOpacity(this.params["opacity"])}},setWMUsing:function(e){if(!this.nodeWMUsing){this.nodeWMUsing=BX(this.id+"_use_watermark");BX.bind(this.nodeWMUsing,"click",BX.delegate(this.setWMUsing,this))}if(this.nodeWMUsing){e=e==="Y"||e==="N"?e:this.nodeWMUsing.checked?"Y":"N";var t=BX(this.id+"_watermark_cont");if(this.nodeWMUsing.checked)BX.addClass(t,"bxiu-watermark-checked");else BX.removeClass(t,"bxiu-watermark-checked");this.SaveUserOption("use",e)}},setWMType:function(e){if(!this.pTypeText){this.pTypeText=BX(this.id+"_wmark_type_text");this.pTypeImg=BX(this.id+"_wmark_type_img");BX.bind(this.pTypeText,"click",BX.delegate((function(){this.setWMType("text")}),this));BX.bind(this.pTypeImg,"click",BX.delegate((function(){this.setWMType("image")}),this));e=!!e?e:this.pTypeText.checked?"text":"image"}if(this.pTypeText){var t=BX(this.id+"_watermark_cont");if(e=="text"){this.pTypeText.checked=true;BX.removeClass(t,"bxiu-watermark-image-checked");BX.addClass(t,"bxiu-watermark-text-checked")}else{this.pTypeImg.checked=true;BX.addClass(t,"bxiu-watermark-image-checked");BX.removeClass(t,"bxiu-watermark-text-checked")}this.SaveUserOption("type",e)}},setWMText:function(e){if(!this.pWatermarkText){this.pWatermarkText=BX(this.id+"_wmark_text");this.pWatermarkText.onchange=this.pWatermarkText.onblur=this.pWatermarkText.onkeyup=BX.delegate(this.setWMText,this)}if(this.pWatermarkText){e=typeof e=="string"?e:this.pWatermarkText.value;this.SaveUserOption("text",e)}this.textButCont=BX(this.id+"_text_but_cont")},setWMCopyright:function(e){if(!this.pCopyright){this.pCopyright=BX.create("DIV",{props:{className:"bxiu-but bxiu-copyright"}});BX.bind(this.pCopyright,"click",BX.delegate((function(){this.setWMCopyright(this.form.photo_watermark_copyright.value=="Y"?"N":"Y")}),this));BX(this.id+"_text_but_cont").appendChild(BX.create("DIV",{props:{className:"bxiu-but-cont"}})).appendChild(this.pCopyright)}if(this.pCopyright){if(e=="Y"){this.pCopyright.title=BX.message("IUCopyrightTitleOff");BX.removeClass(this.pCopyright,"bxiu-copyright-none");BX.addClass(this.pWatermarkText,"bxiu-show-copyright")}else{this.pCopyright.title=BX.message("IUCopyrightTitleOn");BX.addClass(this.pCopyright,"bxiu-copyright-none");BX.removeClass(this.pWatermarkText,"bxiu-show-copyright")}this.SaveUserOption("copyright",e)}},setWMColor:function(e){if(!this.oColorpicker){this.oColorpicker=new t(e);BX.addCustomEvent(this.oColorpicker,"onChange",BX.proxy(this.setWMColor,this));this.textButCont.appendChild(BX.create("DIV",{props:{className:"bxiu-but-cont"}})).appendChild(this.oColorpicker.pWnd)}if(this.oColorpicker){this.SaveUserOption("color",e)}},setWMPosition:function(e){if(!this.oTextPosition){this.oTextPosition=new i({id:"position_text",classPrefix:"bxiu-but-pos-",items:[{value:"TopLeft",title:BX.message("IUTopLeft")},{value:"TopCenter",title:BX.message("IUTopCenter")},{value:"TopRight",title:BX.message("IUTopRight")},{value:"CenterLeft",title:BX.message("IUCenterLeft")},{value:"Center",title:BX.message("IUCenter")},{value:"CenterRight",title:BX.message("IUCenterRight")},{value:"BottomLeft",title:BX.message("IUBottomLeft")},{value:"BottomCenter",title:BX.message("IUBottomCenter")},{value:"BottomRight",title:BX.message("IUBottomRight")}],currentValue:e,title:BX.message("IUPositionTitle"),OnCreate:function(e){e.type="applet";BX.addClass(e.pWnd,"bxiu-but-pos-center");BX.addClass(e.oPopup.Get(),"bxiu-pos-popup")}});BX.addCustomEvent(this.oTextPosition,"onChange",BX.proxy(this.setWMPosition,this));BX(this.id+"_text_but_cont").appendChild(BX.create("DIV",{props:{className:"bxiu-but-cont"}})).appendChild(this.oTextPosition.pWnd)}if(this.oTextPosition){this.oTextPosition.pWnd.className="bxiu-but bxiu-but-pos-"+e.toLowerCase();this.SaveUserOption("position",e)}},setWMSize:function(e){if(!this.oTextSize){this.oTextSize=new i({id:"size_text",classPrefix:"bxiu-but-t-size-",items:[{value:"big",title:BX.message("IUSizeBig")},{value:"middle",title:BX.message("IUSizeMiddle")},{value:"small",title:BX.message("IUSizeSmall")}],currentValue:e,title:BX.message("IUSizeTitle"),OnCreate:function(e){e.type="applet";BX.addClass(e.pWnd,"bxiu-but-t-size-middle");BX.addClass(e.oPopup.Get(),"bxiu-text-size-popup")}});BX.addCustomEvent(this.oTextSize,"onChange",BX.proxy(this.setWMSize,this));BX(this.id+"_text_but_cont").appendChild(BX.create("DIV",{props:{className:"bxiu-but-cont"}})).appendChild(this.oTextSize.pWnd)}if(this.oTextPosition){this.oTextSize.pWnd.className="bxiu-but bxiu-but-t-size-"+e;this.SaveUserOption("size",e)}},setWMFile:function(e,t,i){var s=this;this.imgButCont=BX(this.id+"_img_but_cont");if(!this.pImgInput){this.pImgInput=BX("bxiu_wm_img"+this.id);this.pImgInput.onchange=function(){s.pImgInputOld=s.pImgInput;s.pImgInput=s.pImgInput.cloneNode(false);s.pImgInput.onchange=s.pImgInputOld.onchange;s.pImgInputOld.parentNode.insertBefore(s.pImgInput,s.pImgInputOld);if(!!s.pImgForm)s.pImgForm.parentNode.removeChild(s.pImgForm);s.pImgForm=BX.create("FORM",{props:{method:"POST",enctype:"multipart/form-data",encoding:"multipart/form-data",action:s.form.action,name:"wm_form"},style:{display:"none"},children:[BX.create("INPUT",{props:{type:"hidden",name:"sessid",value:BX.bitrix_sessid()}}),BX.create("INPUT",{props:{type:"hidden",name:"watermark_iframe",value:"Y"}}),s.pImgInputOld]});document.body.appendChild(s.pImgForm);BX.ajax.submit(s.pImgForm,(function(){var e=BX("bxiu_wm_img_iframe_cont"+s.id);e.className="bxiu-iframe-cont-ok";setTimeout((function(){var e=top.bxiu_wm_img_res;if(!top.bxiu_wm_img_res||e.error)return alert(e.error);s.setWMFile(e.path,e.width,e.height)}),50)}))};this.watermarkPreview=BX("watermark_img_preview"+this.id);this.watermarkPreview.onerror=function(){this.style.display="none"};this.watermarkPreview.onload=function(){if(s.watermarkPreview.src!="/bitrix/images/1.gif"){s.watermarkPreviewCont.style.display="block";setTimeout((function(){s.watermarkPreviewDel.style.display="block";s.watermarkPreviewDel.style.left=parseInt(s.watermarkPreview.offsetWidth)-Math.ceil(s.watermarkPreviewDel.offsetWidth/2)+"px"}),200)}else{s.watermarkPreviewCont.style.display="none"}};this.watermarkPreviewCont=BX(this.id+"_wmark_preview_cont");this.watermarkPreviewDel=BX(this.id+"_wmark_preview_del");this.watermarkPreviewDel.onclick=function(){s.watermarkPreview.src="/bitrix/images/1.gif";s.watermarkPreviewCont.style.display="none";s.setWMFile("",0,0)}}if(this.pImgInput){this.watermarkPreview.src=e;this.watermarkPreview.style.display="";this.SaveUserOption("file",e,t,i)}},setWMOpacity:function(e){if(!this.oTextOpacity){this.oTextOpacity=new s({currentValue:e});BX.addCustomEvent(this.oTextOpacity,"onChange",BX.proxy(this.setWMOpacity,this));BX(this.id+"_img_but_cont").appendChild(BX.create("DIV",{props:{className:"bxiu-opacity-cont"}})).appendChild(this.oTextOpacity.pCont)}if(this.oTextOpacity){this.SaveUserOption("opacity",e)}},InitImageTypeControls:function(e,t){var s=this;this.imgButCont=BX(this.id+"_img_but_cont");this.oImagePosition=new i({id:"position_image",classPrefix:"bxiu-but-pos-",items:[{value:"TopLeft",title:BX.message("IUTopLeft")},{value:"TopCenter",title:BX.message("IUTopCenter")},{value:"TopRight",title:BX.message("IUTopRight")},{value:"CenterLeft",title:BX.message("IUCenterLeft")},{value:"Center",title:BX.message("IUCenter")},{value:"CenterRight",title:BX.message("IUCenterRight")},{value:"BottomLeft",title:BX.message("IUBottomLeft")},{value:"BottomCenter",title:BX.message("IUBottomCenter")},{value:"BottomRight",title:BX.message("IUBottomRight")}],currentValue:e,title:BX.message("IUPositionTitle"),OnCreate:function(e){e.type=s.type;BX.addClass(e.pWnd,"bxiu-but-pos-center");BX.addClass(e.oPopup.Get(),"bxiu-pos-popup")}});BX.addCustomEvent(this.oTextPosition,"onChange",BX.proxy((function(e){this.oImagePosition.pWnd.className="bxiu-but bxiu-but-pos-"+e.toLowerCase();this.setWMPosition(e)}),this));this.imgButCont.appendChild(BX.create("DIV",{props:{className:"bxiu-but-cont"}})).appendChild(this.oImagePosition.pWnd);this.oImgSize=new i({id:"size_image",classPrefix:"bxiu-but-i-size-",items:[{value:"real",title:BX.message("IUSizeReal")},{value:"big",title:BX.message("IUSizeBig")},{value:"middle",title:BX.message("IUSizeMiddle")},{value:"small",title:BX.message("IUSizeSmall")}],currentValue:t,title:BX.message("IUSizeTitle"),OnCreate:function(e){e.type=s.type;BX.addClass(e.pWnd,"bxiu-but-i-size-real");BX.addClass(e.oPopup.Get(),"bxiu-img-size-popup")}});BX.addCustomEvent(this.oTextPosition,"onChange",BX.proxy((function(e){this.oImgSize.pWnd.className="bxiu-but bxiu-but-t-size-"+e.toLowerCase();this.setWMSize(e)}),this));this.imgButCont.appendChild(BX.create("DIV",{props:{className:"bxiu-but-cont"}})).appendChild(this.oImgSize.pWnd)}}})(window);
/* End */
;
; /* Start:"a:4:{s:4:"full";s:92:"/bitrix/components/bitrix/photogallery.interface/templates/.default/script.js?17000379671142";s:6:"source";s:77:"/bitrix/components/bitrix/photogallery.interface/templates/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
function debug_info(text)
{
	container_id = 'debug_info_forum';
	var div = document.getElementById(container_id);
	if (!div || div == null)
	{
		div = document.body.appendChild(document.createElement("DIV"));
		div.id = container_id;
//		div.className = "forum-debug";
		div.style.position = "absolute";
		div.style.width = "170px";
		div.style.padding = "5px";
		div.style.backgroundColor = "#FCF7D1";
		div.style.border = "1px solid #EACB6B";
		div.style.textAlign = "left";
		div.style.zIndex = '100'; 
		div.style.fontSize = '11px'; 
		
		div.style.left = document.body.scrollLeft + (document.body.clientWidth - div.offsetWidth) - 5 + "px";
		div.style.top = document.body.scrollTop + 5 + "px";
		if(jsUtils.IsIE())
		{
			var frame = document.createElement("IFRAME");
			frame.src = "javascript:''";
			frame.id = (container_id + "_frame");
			frame.className = "forum-wait";
			frame.style.width = div.offsetWidth + "px";
			frame.style.height = div.offsetHeight + "px";
			frame.style.left = div.style.left;
			frame.style.top = div.style.top;
			document.body.appendChild(frame);
		}
	}
	
	div.innerHTML += text + "<br />";
	return;
}
/* End */
;
; /* Start:"a:4:{s:4:"full";s:88:"/bitrix/components/bitrix/search.tags.input/templates/.default/script.js?170003797013020";s:6:"source";s:72:"/bitrix/components/bitrix/search.tags.input/templates/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
var Errors = {
	"result_unval" : "Error in result",
	"result_empty" : "Empty result"
};

function JsTc(oHandler, sParams, sParser) // TC = TagCloud
{
	var t = this;

	t.oObj = typeof oHandler == 'object' ? oHandler : document.getElementById("TAGS");
	t.sParams = sParams;
	// Arrays for data
	if (sParser)
	{
		t.sExp = new RegExp("["+sParser+"]+", "i");
	}
	else
	{
		t.sExp = new RegExp(",");
	}
	t.oLast = {"str":false, "arr":false};
	t.oThis = {"str":false, "arr":false};
	t.oEl = {"start":false, "end":false};
	t.oUnfinedWords = {};
	// Flags
	t.bReady = true;
	t.eFocus = true;
	// Array with results & it`s showing
	t.aDiv = null;
	t.oDiv = null;
	// Pointers
	t.oActive = null;
	t.oPointer = [];
	t.oPointer_default = [];
	t.oPointer_this = 'input_field';

	t.oObj.onblur = function()
	{
		t.eFocus = false;
	};

	t.oObj.onfocus = function()
	{
		if (!t.eFocus)
		{
			t.eFocus = true;
			setTimeout(function(){t.CheckModif('focus')}, 500);
		}
	};

	t.oLast["arr"] = t.oObj.value.split(t.sExp);
	t.oLast["str"] = t.oLast["arr"].join(":");

	setTimeout(function(){t.CheckModif('this')}, 500);

	this.CheckModif = function(__data)
	{
		var
			sThis = false, tmp = 0,
			bUnfined = false, word = "",
			cursor = {};

		if (!t.eFocus)
			return;

		if (t.bReady && t.oObj.value.length > 0)
		{
			// Preparing input data
			t.oThis["arr"] = t.oObj.value.split(t.sExp);
			t.oThis["str"] = t.oThis["arr"].join(":");

			// Getting modificated element
			if (t.oThis["str"] && (t.oThis["str"] != t.oLast["str"]))
			{
				cursor['position'] = TCJsUtils.getCursorPosition(t.oObj);
				if (cursor['position']['end'] > 0 && !t.sExp.test(t.oObj.value.substr(cursor['position']['end']-1, 1)))
				{
					cursor['arr'] = t.oObj.value.substr(0, cursor['position']['end']).split(t.sExp);
					sThis = t.oThis["arr"][cursor['arr'].length - 1];

					t.oEl['start'] = cursor['position']['end'] - cursor['arr'][cursor['arr'].length - 1].length;
					t.oEl['end'] = t.oEl['start'] + sThis.length;
					t.oEl['content'] = sThis;

					t.oLast["arr"] = t.oThis["arr"];
					t.oLast["str"] = t.oThis["str"];
				}
			}
			if (sThis)
			{
				// Checking for UnfinedWords
				for (tmp = 2; tmp <= sThis.length; tmp++)
				{
					word = sThis.substr(0, tmp);
					if (t.oUnfinedWords[word] == '!fined')
					{
						bUnfined = true;
						break;
					}
				}
				if (!bUnfined)
					t.Send(sThis);
			}
		}
		setTimeout(function(){t.CheckModif('this')}, 500);
	};

	t.Send = function(sSearch)
	{
		if (!sSearch)
			return false;

		var oError = [];
		t.bReady = false;
		if (BX('wait_container'))
		{
			BX('wait_container').innerHTML = BX.message('JS_CORE_LOADING');
			BX.show(BX('wait_container'));
		}
		BX.ajax.post(
			'/bitrix/components/bitrix/search.tags.input/search.php',
			{"search":sSearch, "params":t.sParams},
			function(data)
			{
				var result = {};
				t.bReady = true;

				try
				{
					eval("result = " + data + ";");
				}
				catch(e)
				{
					oError['result_unval'] = e;
				}

				if (TCJsUtils.empty(result))
					oError['result_empty'] = Errors['result_empty'];

				try
				{
					if (TCJsUtils.empty(oError) && (typeof result == 'object'))
					{
						if (!(result.length == 1 && result[0]['NAME'] == t.oEl['content']))
						{
							t.Show(result);
							return;
						}
					}
					else
					{
						t.oUnfinedWords[t.oEl['content']] = '!fined';
					}
				}
				catch(e)
				{
					oError['unknown_error'] = e;
				}

				if(BX('wait_container'))
					BX.hide(BX('wait_container'));
			}
		);
	};

	t.Show = function(result)
	{
		t.Destroy();
		t.oDiv = document.body.appendChild(document.createElement("DIV"));
		t.oDiv.id = t.oObj.id+'_div';

		t.oDiv.className = "search-popup";
		t.oDiv.style.position = 'absolute';

		t.aDiv = t.Print(result);
		var pos = TCJsUtils.GetRealPos(t.oObj);
		t.oDiv.style.width = parseInt(pos["width"]) + "px";
		TCJsUtils.show(t.oDiv, pos["left"], pos["bottom"]);
		TCJsUtils.addEvent(document, "click", t.CheckMouse);
		TCJsUtils.addEvent(document, "keydown", t.CheckKeyword);
	};

	t.Print = function(aArr)
	{
		var aEl = null;
		var aResult = [];
		var aRes = [];
		var iCnt = 0;
		var oDiv = null;
		var oSpan = null;
		var sPrefix = t.oDiv.id;

		for (var tmp_ in aArr)
		{
			// Math
			if (aArr.hasOwnProperty(tmp_))
			{
				aEl = aArr[tmp_];
				aRes = [];
				aRes['ID'] = (aEl['ID'] && aEl['ID'].length > 0) ? aEl['ID'] : iCnt++;
				aRes['GID'] = sPrefix + '_' + aRes['ID'];
				aRes['NAME'] = TCJsUtils.htmlspecialcharsEx(aEl['NAME']);
				aRes['~NAME'] = aEl['NAME'];
				aRes['CNT'] = aEl['CNT'];
				aResult[aRes['GID']] = aRes;
				t.oPointer.push(aRes['GID']);
				// Graph
				oDiv = t.oDiv.appendChild(document.createElement("DIV"));
				oDiv.id = aRes['GID'];
				oDiv.name = sPrefix + '_div';

				oDiv.className = 'search-popup-row';

				oDiv.onmouseover = function(){t.Init(); this.className='search-popup-row-active';};
				oDiv.onmouseout = function(){t.Init(); this.className='search-popup-row';};
				oDiv.onclick = function(e){
						t.oActive = this.id;
						t.Replace();
						t.Destroy();
						BX.PreventDefault(e);
					};

				oSpan = oDiv.appendChild(document.createElement("DIV"));
				oSpan.id = oDiv.id + '_NAME';
				oSpan.className = "search-popup-el search-popup-el-cnt";
				oSpan.innerHTML = aRes['CNT'];

				oSpan = oDiv.appendChild(document.createElement("DIV"));
				oSpan.id = oDiv.id + '_NAME';
				oSpan.className = "search-popup-el search-popup-el-name";
				oSpan.innerHTML = aRes['NAME'];
			}
		}
		t.oPointer.push('input_field');
		t.oPointer_default = t.oPointer;
		return aResult;
	};

	t.Destroy = function()
	{
		try
		{
			TCJsUtils.hide(t.oDiv);
			t.oDiv.parentNode.removeChild(t.oDiv);
		}
		catch(e)
		{}
		t.aDiv = [];
		t.oPointer = [];
		t.oPointer_default = [];
		t.oPointer_this = 'input_field';
		t.bReady = true;
		t.eFocus = true;
		t.oActive = null;

		TCJsUtils.removeEvent(document, "click", t.CheckMouse);
		TCJsUtils.removeEvent(document, "keydown", t.CheckKeyword);
	};

	t.Replace = function()
	{
		if (typeof t.oActive == 'string')
		{
			var tmp = t.aDiv[t.oActive];
			var tmp1 = '';
			if (typeof tmp == 'object')
			{
				var elEntities = document.createElement("textarea");
				elEntities.innerHTML = tmp['~NAME'];
				tmp1 = elEntities.value;
			}
			//this preserves leading spaces
			var start = t.oEl['start'];
			while(start < t.oObj.value.length && t.oObj.value.substring(start, start+1) == " ")
				start++;

			t.oObj.value = t.oObj.value.substring(0, start) + tmp1 + t.oObj.value.substr(t.oEl['end']);
			TCJsUtils.setCursorPosition(t.oObj, start + tmp1.length);
		}
	};

	t.Init = function()
	{
		t.oActive = false;
		t.oPointer = t.oPointer_default;
		t.Clear();
		t.oPointer_this = 'input_pointer';
	};

	t.Clear = function()
	{
		var oEl = t.oDiv.getElementsByTagName("div");
		if (oEl.length > 0 && typeof oEl == 'object')
		{
			for (var ii in oEl)
			{
				if (oEl.hasOwnProperty(ii))
				{
					var oE = oEl[ii];
					if (oE && (typeof oE == 'object') && (oE.name == t.oDiv.id + '_div'))
					{
						oE.className = "search-popup-row";
					}
				}
			}
		}
	};

	t.CheckMouse = function()
	{
		t.Replace();
		t.Destroy();
	};

	t.CheckKeyword = function(e)
	{
		if (!e)
			e = window.event;
		var oP = null;
		var oEl = null;
		if ((37 < e.keyCode && e.keyCode <41) || (e.keyCode == 13))
		{
			t.Clear();

			switch (e.keyCode)
			{
				case 38:
					oP = t.oPointer.pop();
					if (t.oPointer_this == oP)
					{
						t.oPointer.unshift(oP);
						oP = t.oPointer.pop();
					}

					if (oP != 'input_field')
					{
						t.oActive = oP;
						oEl = document.getElementById(oP);
						if (typeof oEl == 'object')
						{
							oEl.className = "search-popup-row-active";
						}
					}
					t.oPointer.unshift(oP);
					break;
				case 40:
					oP = t.oPointer.shift();
					if (t.oPointer_this == oP)
					{
						t.oPointer.push(oP);
						oP = t.oPointer.shift();
					}
					if (oP != 'input_field')
					{
						t.oActive = oP;
						oEl = document.getElementById(oP);
						if (typeof oEl == 'object')
						{
							oEl.className = "search-popup-row-active";
						}
					}
					t.oPointer.push(oP);
					break;
				case 39:
					t.Replace();
					t.Destroy();
					break;
				case 13:
					t.Replace();
					t.Destroy();
					if (TCJsUtils.IsIE())
					{
						e.returnValue = false;
						e.cancelBubble = true;
					}
					else
					{
						e.preventDefault();
						e.stopPropagation();
					}
					break;
			}
			t.oPointer_this	= oP;
		}
		else
		{
			t.Destroy();
		}
	}
}

var TCJsUtils =
{
	arEvents:  [],

	addEvent: function(el, evname, func)
	{
		if(el.attachEvent) // IE
			el.attachEvent("on" + evname, func);
		else if(el.addEventListener) // Gecko / W3C
			el.addEventListener(evname, func, false);
		else
			el["on" + evname] = func;
		this.arEvents[this.arEvents.length] = {'element': el, 'event': evname, 'fn': func};
	},

	removeEvent: function(el, evname, func)
	{
		if(el.detachEvent) // IE
			el.detachEvent("on" + evname, func);
		else if(el.removeEventListener) // Gecko / W3C
			el.removeEventListener(evname, func, false);
		else
			el["on" + evname] = null;
	},

	getCursorPosition: function(oObj)
	{
		var result = {'start': 0, 'end': 0};
		if (!oObj || (typeof oObj != 'object'))
			return result;
		try
		{
			if (document.selection != null && oObj.selectionStart == null)
			{
				oObj.focus();
				var oRange = document.selection.createRange();
				var oParent = oRange.parentElement();
				var sBookmark = oRange.getBookmark();
				var sContents_ = oObj.value;
				var sContents = sContents_;
				var sMarker = '__' + Math.random() + '__';

				while(sContents.indexOf(sMarker) != -1)
				{
					sMarker = '__' + Math.random() + '__';
				}

				if (!oParent || oParent == null || (oParent.type != "textarea" && oParent.type != "text"))
				{
					return result;
				}

				oRange.text = sMarker + oRange.text + sMarker;
				sContents = oObj.value;
				result['start'] = sContents.indexOf(sMarker);
				sContents = sContents.replace(sMarker, "");
				result['end'] = sContents.indexOf(sMarker);
				oObj.value = sContents_;
				oRange.moveToBookmark(sBookmark);
				oRange.select();
				return result;
			}
			else
			{
				return {
					'start': oObj.selectionStart,
					'end': oObj.selectionEnd
				};
			}
		}
		catch(e){}
		return result;
	},

	setCursorPosition: function(oObj, iPosition)
	{
		if (typeof oObj != 'object')
			return false;

		oObj.focus();

		try
		{
			if (document.selection != null && oObj.selectionStart == null)
			{
				var oRange = document.selection.createRange();
				oRange.select();
			}
			else
			{
				oObj.selectionStart = iPosition;
				oObj.selectionEnd = iPosition;
			}
			return true;
		}
		catch(e)
		{
			return false;
		}
	},

	printArray: function (oObj, sParser, iLevel)
	{
		try
		{
			var result = '';
			var space = '';

			if (iLevel==undefined)
				iLevel = 0;
			if (!sParser)
				sParser = "\n";

			for (var j=0; j<=iLevel; j++)
				space += '  ';

			for (var i in oObj)
			{
				if (oObj.hasOwnProperty(i))
				{
					if (typeof oObj[i] == 'object')
						result += space+i + " = {"+ sParser + TCJsUtils.printArray(oObj[i], sParser, iLevel+1) + ", " + sParser + "}" + sParser;
					else
						result += space+i + " = " + oObj[i] + "; " + sParser;
				}
			}
			return result;
		}
		catch(e)
		{
		}
	},

	empty: function(oObj)
	{
		if (oObj)
		{
			for (var i in oObj)
			{
				if (oObj.hasOwnProperty(i))
				{
					return false;
				}
			}
		}
		return true;
	},

	show: function(oDiv, iLeft, iTop)
	{
		if (typeof oDiv != 'object')
			return;
		var zIndex = parseInt(oDiv.style.zIndex);
		if(zIndex <= 0 || isNaN(zIndex))
			zIndex = 2200;
		oDiv.style.zIndex = zIndex;
		oDiv.style.left = iLeft + "px";
		oDiv.style.top = iTop + "px";
		return oDiv;
	},

	hide: function(oDiv)
	{
		if (oDiv)
			oDiv.style.display = 'none';
	},

	GetRealPos: function(el)
	{
		if(!el || !el.offsetParent)
			return false;

		var res = {};
		var objParent = el.offsetParent;
		res["left"] = el.offsetLeft;
		res["top"] = el.offsetTop;
		while(objParent && objParent.tagName != "BODY")
		{
			res["left"] += objParent.offsetLeft;
			res["top"] += objParent.offsetTop;
			objParent = objParent.offsetParent;
		}
		res["right"]=res["left"] + el.offsetWidth;
		res["bottom"]=res["top"] + el.offsetHeight;
		res["width"]=el.offsetWidth;
		res["height"]=el.offsetHeight;

		return res;
	},

	IsIE: function()
	{
		return (document.attachEvent && !TCJsUtils.IsOpera());
	},

	IsOpera: function()
	{
		return (navigator.userAgent.toLowerCase().indexOf('opera') != -1);
	},

	htmlspecialcharsEx: function(str)
	{
		return str.replace(/&amp;/g, '&amp;amp;').replace(/&lt;/g, '&amp;lt;').replace(/&gt;/g, '&amp;gt;').replace(/&quot;/g, '&amp;quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	},

	htmlspecialcharsback: function(str)
	{
		return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;;/g, '"').replace(/&amp;/g, '&');
	}
};

/* End */
;; /* /bitrix/components/bitrix/photogallery/templates/.default/script.js?17000379676106*/
; /* /bitrix/components/bitrix/photogallery.upload/templates/.default/script.min.js?170003796726818*/
; /* /bitrix/components/bitrix/photogallery.interface/templates/.default/script.js?17000379671142*/
; /* /bitrix/components/bitrix/search.tags.input/templates/.default/script.js?170003797013020*/

//# sourceMappingURL=page_005957b5280f008cfdfdd233dce2747c.map.js