(function (){
	var d = document,
	w = window;
	Chat = {
		username:null,
		userid:null,
		socket:null,
		scrolltobottom:function(){
			var clienth = d.getElementById('middlediv').clientheight;
			w.scrollTo(0,clienth);
		},
		init:function(){
			this.socket = io.connect('http://localhost:3000');
			//console.log(this);这里this指向的是Chat这个对象
			this.socket.on('message',function(obj){
				var contentdiv = d.createElement('div');
				contentdiv.innerHTML = obj.content;
				d.getElementById('middlediv').appendChild(contentdiv);
				Chat.scrolltobottom();
			});
		},
		submitmsg:function(){
			var content = d.getElementById('subval').value;
			//console.log(this);这里this指向的是window这个对象。可能是react内部改变了
			if(content != ''){
				var obj = {
						content:content
				};
				Chat.socket.emit('message',obj);
			}
		}
	};
	w.onload = function(){
		Chat.init();
	}
})();