Array.prototype.indexOf=Array.prototype.indexOf||function(d){var b=-1;for(var c=0,a=this.length;c<a;c++){if(this[c]===d){return c}}return b};(function(k){var g,l,m=140,n=0,h=0,b=10,j="",i=[],f="",d="",p='<div id="{ID}" class="suggest-overlay"></div>',e=k(document.body),c=/ /g,q=/<\/?code>/g,a=/<\/?b>/g,o=k.browser.version<7?"&nbsp;":"x";ie_old=k.browser.msie&&k.browser.version<9,methods={getCarePos:function(t,r){var s=k("<em>&nbsp;</em>"),t=k(t),u=t.offset(),v={};if(!g){g=k('<pre class="mention-pre"></pre>').css(this.initPreStyle(t));g.appendTo("body")}if(ie_old){r=r.replace(c,o)}g.html(r).append(s);v=s.position();return{left:v.left+u.left+2,top:v.top+u.top+21}},initPreStyle:function(r){return{position:"absolute",left:-9999,width:r.width()+"px","font-family":r.css("font-family"),"font-size":r.css("font-size"),"word-wrap":"break-word",border:"1px"}},highlightName:function(s,r){k.each(s,function(u,t){if(ie_old){t=t.replace(c,"&nbsp;")}j=t.split(":");r=r.replace(new RegExp("@"+j[1],"g"),'<code data-id="'+j[0]+'">@'+j[1]+"</code>")});return r},updateHighlight:function(s,t,r){if(ie_old){r=r.replace(c,o)}k(s).html(this.highlightName(t,r))},moveSelectedItem:function(s){var r=l.find("li");n=l.find(".on").index();if(!h){return}n+=s;if(n>=h){n-=h}if(n<0){if(n===-2){n=-1}n+=h}r.removeClass("on");k(r[n]).addClass("on")},getCursorPosition:function(u){if(document.selection){u.focus();var v=document.selection,r=v.createRange(),s=r.duplicate();s.moveToElementText(u);s.setEndPoint("EndToEnd",r);u.selectionStart=s.text.length-r.text.length;u.selectionEnd=u.selectionStart+r.text.length;return u.selectionStart}else{return u.selectionStart}},setCursorPosition:function(r,s){this.selectRangeText(r,s,s)},selectRangeText:function(u,v,w){if(document.selection){var r=u.createTextRange();r.moveEnd("character",-u.value.length);r.moveEnd("character",w);r.moveStart("character",v);r.select()}else{u.setSelectionRange(v,w);u.focus()}},deleteRangeText:function(r,x){var v=this.getCursorPosition(r),u=r.scrollTop,w=r.value;r.value=x>0?w.slice(0,v-x)+w.slice(v):w.slice(0,v)+w.slice(v-x);this.setCursorPosition(r,v-(x<0?0:x));firefox=k.browser.mozilla&&setTimeout(function(){if(r.scrollTop!==u){r.scrollTop=u}},10)},insertAfterCursor:function(w,u,r){var z=w.value,v=this;if(document.selection){w.focus();document.selection.createRange().text=u+" ";this.updateHighlight(r,i,w.value)}else{var y=w.selectionStart,A=w.value.length,x=w.scrollTop;w.value=w.value.slice(0,y)+u+w.value.slice(y,A)+" ";this.updateHighlight(r,i,w.value);this.setCursorPosition(w,y+u.length+1);firefox=k.browser.mozilla&&setTimeout(function(){if(w.scrollTop!==x){w.scrollTop=x}},0)}}};k.fn.textbox=function(r){var v={mode:"complete",itemCount:10,customData:null,highlighter:".highlighter",tips:"@某人,&nbsp;他能收到你的消息"},C=k.extend(v,r),B=this,A,u=true,w=false,s=function(I,D){var J=I.value,G=l.find(".on"),F=G.attr("data-id")||G.attr("id")||"",E=k.trim(G.text().split("(")[0]);var H=(F+":"+E).replace(a,"");if(i.indexOf(H)==-1){i.push(H)}methods.deleteRangeText(I,f.length);methods.insertAfterCursor(I,E,D);if(C.onMention){C.onMention.call(B,F,E,i)}if(typeof App!=="undefined"&&C.mode==="complete"){App.Widgets.StatusBox.updateNum(m-k.trim(I.value).length)}l.hide()},x=function(){l.html('<div class="bd">'+C.tips+"</div>")},y=function(J,H,I){var O=this;var G=J.value,N=G.substring(0,I).lastIndexOf("@"),F=G.substring(N,I).indexOf(" "),L={};f=G.substring(N+1,I);var P=C.customData;var K=C.mode;var D=C.itemCount;var M=C.listTmpl;if(K!=="complete"){t(J)}else{if(H==="@"){L=methods.getCarePos(J,G.substring(0,I-1));z(J,L)}}if(N===-1||F!==-1){return l&&l.hide()}if(f.length>b){return}if(K==="complete"){L=methods.getCarePos(J,G.substring(0,N))}if(!f){var P=P&&P();var E=P&&P.users;if(!E||!E.length){return x()}h=E.length;l.html(Ark.template(M,P));l.children().click(function(){s(J,highlighter)});return}k.getJSON(C.dataUrl,{count:D,word:f},function(Q){if(!Q||!Q.users){Q={users:[]}}if(Q.users.length<D&&P){var R={};k.each(Q.users,function(S,T){R[T.uid]=1});Q.users=Q.users.concat(P(f,D-Q.users.length,R).users)}if(!Q.users.length){return l.hide()}l.get(0).innerHTML=Ark.template(M,Q);if(!l.find("li").hasClass("on")){l.find("li:first").attr("class","on")}h=l.find("li").size();if(K==="complete"){z(J,L)}else{t(J)}})},z=function(E,F){k("#db-suggest-flist").remove();l=k("#db-suggest-list");if(!l.length){l=k(p.replace("{ID}","db-suggest-list"));l.appendTo("body")}var D=k(E);l.css({marginLeft:D.css("paddingLeft"),marginTop:D.css("paddingTop"),top:F.top+"px",left:F.left+"px"}).show();l.children().click(function(){s(E,C.highlighter)})},t=function(E){k("#db-suggest-list").remove();l=k("#db-suggest-flist");if(!l.length){l=k(p.replace("{ID}","db-suggest-flist"));k(E).before(l[0])}var D=k(".comment-item").length;l.css({left:0,top:D?"auto":"71px",bottom:D?"43px":"auto",width:"272px"}).show();l.children().click(function(){s(E,C.highlighter)})};this.bind("keyup input propertychange",function(G){if(this._closed){return k(C.highlighter).html("")}if(G.type=="propertychange"&&G.originalEvent.propertyName!=="value"){return}var D=(G.type=="input"||G.type=="propertychange");if(D){this._from_change=true}else{this._from_change=false}if(D&&!this._from_change){return}var E=this;var I=E.value;var J=J||k(C.highlighter);var H=methods.getCursorPosition(this),F=I.charAt(H-1);if(!I){J.html("")}if(H<I.length+1&&i.length){if(u){J.css("marginTop",-E.scrollTop);methods.updateHighlight(J,i,I)}}if(G.keyCode!==38&&G.keyCode!==40&&G.keyCode!==13&&G.keyCode!==16&&G.keyCode!==9){y(this,F,H)}if((G.keyCode===9||G.keyCode===13)&&(l&&l.find(".on").size()&&l.is(":visible"))){s(this,C.highlighter)}});this.bind("keydown",function(I){if((I.ctrlKey||I.metaKey)&&I.keyCode===65||I.shiftKey&&(I.keyCode===37||I.keyCode===39)){u=false}else{u=true}if(l&&l.is(":visible")&&l.find("ul").length){switch(I.keyCode){case 32:l.hide();break;case 38:I.preventDefault();methods.moveSelectedItem(-1);break;case 40:I.preventDefault();methods.moveSelectedItem(1);break;case 8:var K=l.find("li");if(K.length==1){var E=this,D=E.value;var G=methods.getCursorPosition(E);var H=D.slice(0,G);var F=H.slice(0,H.lastIndexOf("@"));var J=k.trim(K.text().split("(")[0]);var L=H.slice(H.lastIndexOf("@")+1);if(L==J){D=E.value=F+D.slice(G);methods.setCursorPosition(E,G-L.length)}}break;case 9:case 13:I.preventDefault();break;default:w=false;break}}});e.delegate(".suggest-overlay li","hover",function(){k(this).parent().children(".on").removeClass().end().end().toggleClass("on")});e.click(function(D){if(l&&l.length){l.hide()}});this.bind("mention",function(H,F,E,D){var G=(F+":"+E).replace(a,"");if(i.indexOf(G)==-1){i.push(G)}methods.insertAfterCursor(this,"@"+E,D)})}})(jQuery);