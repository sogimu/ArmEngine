(function(window) {
    var Image2dContextRepresentation = function(primitive) {

        var me = ArmContext.C2dContextRepresentation(primitive);

        me.parentSet = me.Set ? me.Set : null;

        // View properties

        me._image = null;

        me.GetImage = function() {
            return this._image;
        };

        me.Set = function(O) {
            if(this.parentSet) {    this.parentSet( O );    };
            
            this._image = O.image || this._image;             
        };

        return me;
    };

    ArmContext.Image2dContextRepresentation = Image2dContextRepresentation;
})();