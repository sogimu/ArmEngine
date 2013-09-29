(function(window) {
    var Rect2dContextRepresentation = function(primitive) {

        var me = ArmContext.C2dContextRepresentation();

        me._primitive = primitive;

        me.parentUpdate = me.Update ? me.Update : null;
        
        // View properties
        me._fillObject = "default";
        me._strokeObject = "default";
        me._lineWidth = "default";
        me._lineDash = "default";
        me._miterLimit = "default";
        me._lineCap = "default";
        me._lineJoin = "default";
        

        me.GetFillObject = function() {
            return this._fillObject;
        };

        me.GetStrokeObject = function() {
            return this._strokeObject;
        };

        me.GetLineWidth = function() {
            return this._lineWidth;
        };

        me.GetLineDash = function() {
            return this._lineDash;
        };

        me.GetMiterLimit = function() {
            return this._miterLimit;
        };

        me.GetLineCap = function() {
            return this._lineCap;
        };

        me.GetLineJoin = function() {
            return this._lineJoin;
        };
        
        me.Update = function(O) {
            if(this.parentUpdate) {    this.parentUpdate( O );    };

            this._fillObject = O.fillObject || this._fillObject;
            this._strokeObject = O.strokeObject || this._strokeObject;
            this._lineWidth    = O.lineWidth || this._lineWidth;
            this._lineDash = O.lineDash || this._lineDash;
            this._miterLimit = O.miterLimit || this._miterLimit;

            switch(O.lineCap) {
                case "butt": this._lineCap = O.lineCap; break;
                case "round": this._lineCap = O.lineCap; break;
                case "square": this._lineCap = O.lineCap; break;
            }
            switch(O.lineJoin) {
                case "miter": this._lineJoin = O.lineJoin; break;
                case "round": this._lineJoin = O.lineJoin; break;
                case "bevel": this._lineJoin = O.lineJoin; break;
            }

        };

        return me;
    };

    ArmContext.Rect2dContextRepresentation = Rect2dContextRepresentation;
})();
