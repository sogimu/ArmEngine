(function(window) {
    var RectInternalRepresentation = function() {

        var me = new ArmContext.InternalRepresentation();

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

        me.Update = function(O) {
            this._width = O.width || this._width;
            this._height = O.height || this._height;

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
