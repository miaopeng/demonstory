define("ui/apply-dialog",["jquery","mod/ajax","dui:overlay"],function(d,c){var b=dui.overlay;c=c||Ark.ajax;var a=function(g,e){var f=g.data("href");c({url:f,type:"GET",dataType:"json"}).done(function(h){var i=dui.overlay();i.setConfig({title:h.title,content:h.html,width:g.data("width")}).render().show();i.panel.addClass(g.data("class")).find("input[type=email], input[type=text], textarea").eq(0).focus();if(e){e(i)}g.trigger("ark:dialogOpened",i)}).fail(function(){alert("出现了奇怪的错误，稍候再试吧。")})};return a});