(function($){
	var ms = {
		init:function(obj,args){
			return (function(){
				ms.fillHtml(obj,args);
				ms.bindEvent(obj,args);
			})();
		},
		//填充html
		fillHtml:function(obj,args){
			return (function(){
				obj.empty();
				// if(args.current > 0){
				// 	obj.append('<a href="javascript:;" class="prevBigPage"></a>');
				
				//上一页
				if(args.current > 1){
					obj.append('<a href="javascript:;" class="prevPage"></a>');
				}else{
					obj.remove('.prevPage');
					obj.append('<span class="disabled_l"></span>');
				}
				//中间页码
				if(args.current != 1 && args.current >= 3 && args.pageCount != 3){
					obj.append('<a href="javascript:;" class="tcdNumber">'+1+'</a>');
				}
				if(args.current-1 > 2 && args.current <= args.pageCount && args.pageCount > 4){
					obj.append('<span>...</span>');
				}
				var start = args.current -1,end = args.current+1;
				if((start > 1 && args.current < 3)||args.current == 1){
					end++;
				}
				if(args.current > args.pageCount-3 && args.current >= args.pageCount){
					start--;
				}
				for (;start <= end; start++) {
					if(start <= args.pageCount && start >= 1){
						if(start != args.current){
							obj.append('<a href="javascript:;" class="tcdNumber">'+ start +'</a>');
						}else{
							obj.append('<span class="current">'+ start +'</span>');
						}
					}
				}
				if(args.current + 1 < args.pageCount && args.current >= 1 && args.pageCount > 3){
					obj.append('<span>...</span>');
				}
				if(args.current != args.pageCount && args.current < args.pageCount -1  && args.pageCount != 3){
					obj.append('<a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a>');
				}
				//下一页
				if(args.current < args.pageCount){
					obj.append('<a href="javascript:;" class="nextPage"></a>');
				}else{
					obj.remove('.nextPage');
					obj.append('<span class="disabled_r"></span>');
				}
					// obj.append('<a href="javascript:;" class="nextBigPage"></a>');
				// }
			})();
		},
		//绑定事件
		bindEvent:function(obj,args){
			return (function(){
				obj.off();
				obj.on("click","a.tcdNumber",function(){
					var current = parseInt($(this).text());
					ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current);
					}
				});
				//上一页
				obj.on("click","a.prevPage",function(){
					var current = parseInt(obj.children("span.current").text());
					ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current-1);
					}
				});
				//下一页
				obj.on("click","a.nextPage",function(){
					var current = parseInt(obj.children("span.current").text());
					ms.fillHtml(obj,{"current":current+1,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current+1);
					}
				});
				//首页
				obj.on("tap","a.prevBigPage",function(){
					var current = parseInt(obj.children("span.current").text());
					ms.fillHtml(obj,{"current":1,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(1);
					}
				});
				//尾页
				obj.on("tap","a.nextBigPage",function(){
					var current = parseInt(obj.children("span.current").text());
					ms.fillHtml(obj,{"current":args.pageCount,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(args.pageCount);
					}
				});
			})();
		}
	}
	$.fn.createPage = function(options){
		var args = $.extend({
			pageCount : 10,
			current : 1,
			backFn : function(){}
		},options);
		ms.init(this,args);
	}
})(jQuery);