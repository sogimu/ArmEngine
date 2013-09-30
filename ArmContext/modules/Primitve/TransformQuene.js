(function(window) {
    var TransformQuene = function() {

        var me = {};

        me.Push = function(reg) {
            try {
                this._stack.push(reg)
                return true;
            }
            catch(e) {
                return false;
            }
        };

        me.Pop = function() {
            var event = this._stack.shift();
            if(event != undefined) {
                return event;
            } else {
                return false;
            }
        };

        me.ProcessEvents = function(primitive) {
            var event;
            while (event = this.Pop()) {
                // console.log(event);
                //console.log(this._name);
                
                switch(event.name) {
                    case "Translate": primitive._translate(event.e); break;
                    case "Rotate": primitive._rotate(event.e); break;
                    case "Scale": primitive._scale(event.e); break;
                    case "Scos": primitive._scos(event); break;

                };
            };
                
        };


        me._stack = [];

        return me;
    };

    window.ArmContext.TransformQuene = TransformQuene;

})(window);