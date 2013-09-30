/**
 * Описывает абстрактный класс необходимый для описания примитива набором точек.
 *
 * @this {ArmContext.InternalRepresentation}
 * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
 * @version 0.1
 */

(function(window) {
    var InternalRepresentation = function(primitive) {

        var me = {};
        
        // Ссылка на примитив-владелец объекта данного класса
        me._primitive = primitive;

        me._points = new $M( [
            [0,0,1]
        ]);

        me.GetPoints = function() {
            return this._points.elements;
        };

        me.ShowPoints = function(ctx) {
            var radiusOfpoints = 3;
            var points = this.GetPoints();

            ctx.save();
            ctx.beginPath();

            for(var i in points) {
                ctx.moveTo(points[i][0],points[i][1]);
                ctx.arc(points[i][0],points[i][1], radiusOfpoints, 0, Math.PI*2, false);
            }

            ctx.closePath();
            CTX.fillStyle = "#ff0000";
            
            ctx.stroke();
            ctx.fill();

            ctx.restore();

            return this;
        };

        me.ShowDebugInfo = function(ctx) {
            var points = this.GetPoints();

            console.log("Points of internal representation");
            for(var i in points) {
                console.log(points[i]);
            }
        };

        me.SetLisener = function(name, func) {
        gizmo.Filter(name,"String");
            gizmo.Filter(func,"Function");
            if(name && func) {
                this['_' + name] = func;
            }

            return this;
        };

        me.GetLisener = function(name) {
            gizmo.Filter(name,"String");
            if(this['_' + name]) {
                return this['_' + name];        
            } else {
                return false;
            }

        };

        return me;
    }

    ArmContext.InternalRepresentation = InternalRepresentation;
})();
