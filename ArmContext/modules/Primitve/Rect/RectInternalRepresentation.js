(function(window) {
    var RectInternalRepresentation = function(primitive) {

        var me = new ArmContext.InternalRepresentation(primitive);

        this._width = 10;
        this._height = 10;
        
        me.GetWidth = function() {
            return this._width;
        };
        
        me.SetWidth = function(O) {
            gizmo.Filter(O, "Number");
            this.Update({ width: O, height: this.GetHeight() });
        };

        me.GetHeight = function() {
            return this._height;
        };
        
        me.SetHeight = function(O) {
            gizmo.Filter(O, "Number");
            this.UpdatePoints({x: this.GetX(), y: this.GetY(), width: this.GetWidth(), height: O});
        };

        me.GetPointsOfMatrix = function() {
            return this._points;
        };

        me.SetPointsOfMatrix = function(O) {
            gizmo.Filter(O, "Array");
            return this._points;
        };

        me.Set = function(O) {
            for(var name in O) {
                switch( name ) {
                    case "width" : { 
                        this._width  = O[name];
                        if(this._onChanged) {
                this._onChanged.call(primitive);
            };
                    }; break;
                    case "height" : {
                        this._height = O[name];
                        if(this._onChanged) {
                this._onChanged.call(primitive);
            };
                    };
                    break;
                };
            };

            this._points = new $M( [
                [0          ,0           ,1],
                [this._width,0           ,1],
                [this._width,this._height,1],
                [0          ,this._height,1]
            ] );
        };

        return me;
    }

    ArmContext.RectInternalRepresentation = RectInternalRepresentation;
})();
