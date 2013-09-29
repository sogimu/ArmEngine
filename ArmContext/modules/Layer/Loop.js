
(function(window) {
	var Loop = function( O ) {

		gizmo.Filter(O,"Object");

		var me = {};


        me.Start = function() {
	        if(this._isRuning) {
	            this.Stop();

	        };
	        
	        this._onEachFrame( this._stepFunc );

	        this._isRuning = true;

	        return this;
        };

        me.Stop = function() {
            if(this._isRuning) {
                this._cancelAnimationFrame.call(window,this._request);
                this._isRuning = false;
            };
        };

        me.SetEachFrame = function() {
            var self = this;

            var _onEachFrame;
            if(this._fps > 0) {
                var fps = this._fps;
                _onEachFrame = function(cb) {
                    this._request = setInterval(cb, 1000 / fps);
                };

                this._cancelAnimationFrame = window.clearInterval;

            } else {
                if (window.webkitRequestAnimationFrame) {
                _onEachFrame = function(cb) {
                    var _cb = function() { 
                        cb(); 
                        self._request = webkitRequestAnimationFrame(_cb);
                    };
                    _cb();
                };
                } else if (window.mozRequestAnimationFrame) {
                    _onEachFrame = function(cb) {
                        var _cb = function() { 
                            cb();
                            self._request = mozRequestAnimationFrame(_cb);
                        };
                        _cb();
                    };
                } else if (window.requestAnimationFrame) {
                    _onEachFrame = function(cb) {
                        var _cb = function() { 
                            cb();
                            self._request = requestAnimationFrame(_cb);
                        };
                        _cb();
                    };
                } else if (window.msRequestAnimationFrame) {
                    _onEachFrame = function(cb) {
                        var _cb = function() { 
                            cb();
                            self._request = msRequestAnimationFrame(_cb);
                        };
                        _cb();
                    };
                };

                this._cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
            };

            this._onEachFrame = _onEachFrame;

        };

		me.Set = function( O ) {
			// this._fps = O.fps || this._fps;
			// this._stepFunc = O.stepFunc || this._stepFunc;
			for(var name in O) {
                switch( name ) {
                    case "fps"     : {	this._fps = O[name];	};
                    break;
                    
                    case "stepFunc": {	this._stepFunc = O[name];	};
                    break;
                };
            }

            if( this._isRuning ) {
                this.Stop();
                this.SetEachFrame();
                this.Start();
            } else {
                this.SetEachFrame();
            };

		};


		me._fps = 0;
        me._stepFunc = (function(O) {
        					return function() {
				            	O.__clear();
					            O.__draw();                            
					        };
					    })(me);

        me._onEachFrame = null;
        me._cancelAnimationFrame = null;
        me._request = null;
        me._isRuning = false;
		
		me.Set( O || {} );

		return me;

	};

	window.ArmContext.Loop = Loop;

})(window);