(function(window) {
    var ArmContext = function() {

        var me = {};

        me._lastUnicalNumber = 0;

        me.GetNewUnicalNumber = function() {
        	this._lastUnicalNumber+=1;
        	return this._lastUnicalNumber;
        };

        return me;

    };

    window.ArmContext = ArmContext();

})(window);