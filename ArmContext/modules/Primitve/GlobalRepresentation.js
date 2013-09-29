/**
 * Описывает абстрактный класс ответственный за просчёт полигона точек опоясывающих примитив.
 *
 * @this {ArmContext.GlobalRepresentation}
 * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
 * @version 0.1
 */

(function(window) {
    var GlobalRepresentation = function() {

        var me = {};

        me._points = new $M( [
            [0,0,1]
        ] );

        me._polygone = new gizmo.Math.Polygone(me._points.elements);

        me.GetPoints = function() {
            return this._points.elements;
        };

        me.SetPoints = function(O) {
            gizmo.Filter(O,"Array");
            this._points.elements = O;
        };

        me.GetMatrixOfPoints = function() {
            return this._points;
        };
        
        me.SetMatrixOfPoints = function(O) {
            gizmo.Filter(O,"Object");
            return this._points = O;
        };

        me.Update = function(internalRepresentation, C2dContextRepresentation, mvMatrix) {
            gizmo.Filter(internalRepresentation,"Object");
            gizmo.Filter(C2dContextRepresentation,"Object");
            gizmo.Filter(mvMatrix,"Object");

            this.SetPoints( internalRepresentation.GetPoints() );
            this.SetMatrixOfPoints( this.GetMatrixOfPoints().x(mvMatrix.GetMatrix()) );
            
            this.UpdatePolygone();

            return this;
        };

        me.UpdatePolygone = function() {
            // polygone updating
            arrVectors = [];
            var transformedPoints = this.GetPoints();
            for(var i in transformedPoints) {
                arrVectors.push(new gizmo.Math.Vector2D(transformedPoints[i][0],transformedPoints[i][1]));
            }
            this._polygone = new gizmo.Math.Polygone(arrVectors);

            return this;  
        };

        me.HasPoint = function( x, y ) {
            gizmo.Filter(x,"Number");
            gizmo.Filter(y,"Number");

            return this._polygone.HasPoint({x:x,y:y});

            // Метод не реализован
            //console.log("Method HasPoint have't realisation");
        };

        me.ShowDebugInfo = function(ctx) {
            var points = this.GetPoints();

            console.log("Points of global representation");
            for(var i in points) {
                console.log(points[i]);

            }
        };

        me.ShowPoints = function(ctx) {
            var points = this.GetPoints();

            for(var i in points) {      
                CTX.save();
                    CTX.beginPath();        
                        CTX.fillStyle = "#00ff00";
                        CTX.rect(points[i][0]-2,points[i][1]-2,4,4);
                        CTX.stroke();
                        CTX.fill();
                    CTX.closePath();
                CTX.restore();

            }  
        };


        return me;

    }

    ArmContext.GlobalRepresentation = GlobalRepresentation;
})();

