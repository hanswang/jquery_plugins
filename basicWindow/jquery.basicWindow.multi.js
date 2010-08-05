(function($){

	function MultiWindow(){
		this._collection = $();
		this._settings   = {
			template    : [ "<div id='ui-multiWindow' class='ui-window ui-window-multi'><div id='ui-basicWindow-content' class='ui-window-content'></div></div>" ], 
			container   : [ "body" ],
			offsetTop   : [ 0 ],
			offsetLeft  : [ 0 ],
			content     : [ function(content){ this.children().html(content); } ],
			create      : [ function(){ return this.show(); } ],
			destroy     : [ function(){ return this.remove(); } ]
		};

		this.setup = function(opts){
			$.each(opts,function(k,v){
				if (this._settings[k]) { this._settings[k] = [v]; } 		
			});
		};

		// Returns the newly added window
		this.show = function(content,location,opts){
			this._init(opts);
			var s = this._settings,
					w = $(s.template[0]).appendTo(s.container[0]).hide();

			this._collection = this._collection.add(w);

			s.content[0].call(w,content);                          // Add Content
			w.positionAt(location,s.offsetLeft[0],s.offsetTop[0]); // Position It
			s.create[0].call(w);                                   // Show it

			s.template.length  = s.offsetTop.length = s.offsetLeft.length = s.container.length = s.content.length  = s.container.length = s.destroy.length = 1;
			return w;
		};

		// Returns the collection of existing windows
		this.hide = function(objOrIndex){
		 	if (objOrIndex instanceof jQuery) {
			 	this._collection = this._collection.not(objOrIndex);
			}	else if (!isNaN(objOrIndex)) {
			 	objOrIndex = this._collection.splice(objOrIndex,1);
				objOrIndex = $(objOrIndex);
			} else {
				objOrIndex = this._collection;
			}
			this._settings.destroy[0].call(objOrIndex);
			return this._collection;
		};

		this._init = function(opts){
			if (!this._collection) { this.collection = $(); }
			if (opts instanceof Object) {
				$.each(opts,function(k,v){
					if (this._settings[k]) { this._settings[k].push(v); } 		
				});
			}
		};
	}

	$.multiWindow = new MultiWindow();

})(jQuery);
