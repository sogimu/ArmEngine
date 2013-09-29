
(function(window) {
	var Layer = function( O ) {

		gizmo.Filter(O,"Object");

		var me = {};

        me.AddPrimitive = function( O ) {
            gizmo.Filter(O,"Object");
            // this._childs.push(O);

            // this.SortByZindex();
            this._primitives.Add( O );
        };

        me.RemovePrimitive = function( O ) {
            gizmo.Filter(O,"Object");
            // var index = 0;
            // if( (index = this._childs.indexOf(O)) != -1) {
            //     delete( this._childs[ index ] );
            // };
        	return this._primitives.Remove( O );
        };

        me.Start = function() {
        	this._loop.Start();
        };

        me.Stop = function() {
        	this._loop.Stop();
        };

        // me.SortByZindex = function() {
        // 	this._childs = gizmo.nativeSort({mas: this._childs, target: '<', field: '_2dContextRepresentation._zindex'});
        // };

        me.SetLisener = function(name,func) {
            gizmo.Filter(name,"String");
            gizmo.Filter(func,"Function");
            if(name && func) {
            	if(this['_'+name]) {
            		gizmo.Filter(this['_'+name], "Array");
            		var index = 0;
		            if( (index = this['_'+name].indexOf(func)) == -1) {
	            		this['_'+name].push( func );

		            } else {
		            	console.log("This Function allredy added for event " + name + " of layer " + this.GetName());
		            }
            	} else {
                	this['_'+name] = [];
                	this.SetLisener(name, func);
                }        
            }

            return this;
        };

        me.GetLisener = function(name) {
            gizmo.Filter(name,"String");
            if(this['_'+name]) {
                return this['_'+name];        
            };

            return false;

        };

        me.GetTopestPrimitiveUnderPoint = function(O) {
            gizmo.Filter(O,"Object");
            gizmo.Filter(O.x,"Number");
            gizmo.Filter(O.y,"Number");

            // for(var i=this._childs.length-1;i>=0;i--) {
            // 	if(this._childs[i].IsLisened()) {
            // 		if( this._childs[i].HasPoint(O) ) {
            // 			return this._childs[i];
            // 		}
            // 	}
            // }

            // return null;
            return this._primitives.GetIntersectionGroups( O );

        };

	    me.SortByZindex = function() {
	    	this._primitives.SortByZindex();
	    };

		me.SetCtx = function( O ) {
			gizmo.Filter(O,"CanvasRenderingContext2D");
			this._ctx = O;	
		};

		me.SetName = function( O ) {
			gizmo.Filter(O,"String");
			this._name = O;
		};
		
		me.GetCtx = function() {
			return this._ctx;
		};

		me.GetName = function() {
			return this._name;
		};
		
		me.GetDefaultName = function() {
			return this._defaultName;
		};

		me.GetCanvasElement = function() {
			return this._canvasElement;
		};

		me.SetContainerElement = function( O ) {
			// gizmo.Filter(O,"HTMLBodyElement");
			this._containerElement = O;
		};

		me.SetCanvasElement = function( O ) {
			gizmo.Filter(O,"HTMLCanvasElement");
			this._canvasElement = O;
		};

        me.ListenMouseEvents = function() {
        	var self = this;
            this.GetCanvasElement().onmousedown = function(e) {
            	self.__onMouseDown(e);
            };
            this.GetCanvasElement().onmouseup = function(e) {
            	self.__onMouseUp(e);
            };
            this.GetCanvasElement().onmousemove = function(e) {
            	self.__onMouseMove(e);
            };
        };

        me.NotListenMouseEvents = function() {
            this.GetCanvasElement().onmousedown = null;
            this.GetCanvasElement().onmouseup = null;
            this.GetCanvasElement().onmousemove = null;
        };



		me.Init = function() {
			var container;
			if(this._containerElementName == null) {
				container = document.getElementsByTagName("body")[0];
			} else {
				container = document.getElementById(this._containerElementName);
			}
			
			var canvas = document.createElement('canvas');
			canvas.width = this._width;
			canvas.height = this._height;
			canvas.id = this._canvasElemetName;
			canvas.style.position = 'absolute';
			container.appendChild( canvas );
			var ctx = canvas.getContext('2d');

			this.SetName( this._canvasElementName );
			this.SetContainerElement( container );
			this.SetCanvasElement( canvas );
			this.SetCtx( ctx );

		};

        me.__calculateClearAndDrawQuane = function() {  //0 < x < n
	  		var changedPrimitives = this._childs.GetChanged(); // n
    		var intersectionGroups = changedPrimitives.GetIntersectionGroups(); // [0..n]^2
    		for(var i in intersectionGroups) { // [o..n/2]
    			var intersectionedPrimitives = intersectionGroups[i];

    			var oneBoundingBox = intersectionedPrimitives.GetBoundingBox(); // [0..n]*[0..n/2]
    			var drawNeededPrimitives = this._childs.GetIntersectionedPrimitives( oneBoundingBox ); // n*[0..n/2]
    			this._clearAreas.Add( oneBoundingBox );
    			this._drawNeededPrimitives.Add( drawNeededPrimitives );

    		}

    		// n+n*n+n/2*(n+n) = n+2*(n^2); 10обек = 210 итер
    		// - Большая сложность
    		// + Малая область очистки экрана; =v2/2 
    		// - Несколько отчисток экрана; накладные рассходы 
    		// + Не большое кол-во перересовок

    		// second variant

			var intersectionPrimitives = this._childs.GetIntersectionedPrimitives(); // n^2
			var globalBoundiingBox = intersectionPrimitives.GetBoundingBox(); // n
			var drawNeededPrimitives = this._childs.GetIntersectionedPrimitives( globalBoundingBox ); // n

			// n*n+2n; 10обек = 120 итер
			// + Малая сложность
			// - Большие области для очистки экрана; =v1*2
			// + Одна отчистка за иттерацию; нет накладных рассходов
			// - Большое количество прорисовок


			// (v1i/vi2) (v1a/v1a*2) (0.1/0.001) (v1d/v1d*5) 
			// ~1.8*15			0.5*10    100*0.1    0.2 * 5

			// 27                 5        10        0.1 
			// 15                 10       0.1

        };

        me.__draw = function() {
            // for(var i in this._drawNeededPrimitives) {
            // 	var drawNeededPrimitiv = this._drawNeededPrimitives[i];
            //     drawNeededPrimitiv.Draw();
            // }
            // for(var i in this._childs) {
            //     this._childs[i].Draw();
            // };
			var primitives = this._primitives.GetArray();
            for(var primitive in primitives) {
            	primitives[primitive].Draw();
            };
            
        };

        me.__clear = function() {            
            // for(var i in this._clearAreas) {
            // 	var clearArea = clearAreas[i];
            // 	this.GetCtx().clearRect( clearArea.x,clearArea.y,clearArea.width, clearArea.height );
            // };            
            // for(var i in this._childs) {
            //     this._childs[i].Clear();
            // };
            var primitives = this._primitives.GetArray();
            for(var primitive in primitives) {
            	primitives[primitive].Clear();
            };

        };

        // event form mouse
        me.__onMouseDown = function(e) {
        	if(this._onMouseDown) {
	        	gizmo.Filter(this._onMouseDown, "Array");
	            for(var i in this._onMouseDown) {
            	    this._onMouseDown[i](e);  
	                  
	            };
        	};


        };

        me.__onMouseUp = function(e) {
        	if(this._onMouseUp) {
	        	gizmo.Filter(this._onMouseUp, "Array");
	            for(var i in this._onMouseUp) {
            	    this._onMouseUp[i](e);  
	                  
	            };
        	};

        };

        me.__onMouseMove = function(e) {
        	if(this._onMouseMove) {
	        	gizmo.Filter(this._onMouseMove, "Array");
	            for(var i in this._onMouseMove) {
            	    this._onMouseMove[i](e);  
	                  
	            };
        	};

        };

		me.Set = function( O ) {
			this.SetName( O.name || this.GetName() );
			if(document.getElementById( this.GetName() ) == null) {
				me._canvasElementName = this.GetName();
			} else {
				me._canvasElementName = this.GetName() + "." + ArmContext.GetNewUnicalNumber();
			}			
			this._containerElementName = O.container || this._containerElementName;
			this._width = O.width || this._width;
			this._height = O.height || this._height;
			this._left = O.left || this._left;
			this._top = O.top || this._top;
			this._zindex = O.zindex || this._zindex;
			this._fps = O.fps || this._fps;

			this._loop.Set( O );

			this.Init();
		};

		me._defaultName = "Layer";
		me._name = me.GetDefaultName() + ArmContext.GetNewUnicalNumber();	 		
		
		me._containerElement = null;
		me._canvasElement = null;
		me._ctx = null;
		
		me._width = 500;
		me._height = 500;
		me._left = 0;
		me._top = 0;
		
		me._fps = 0;

        me._onMouseDown = [];
        me._onMouseUp = [];
        me._onMouseMove = [];

        // me._childs = [];
		me._primitives = new ArmContext.Primitives();

		this._clearAreas = [];
		this._drawNeededPrimitives = [];

		me._loop = new ArmContext.Loop({
			"stepFunc": (function(O) {
        					return function() {
        						// O.__calculateClearAndDrawQuane();
				            	O.__clear();
					            O.__draw();                            
					        };
					    })(me),
			"fps": me._fps
		});

		me.Set( O );

		return me;

	};

	window.ArmContext.Layer = Layer;

})(window);