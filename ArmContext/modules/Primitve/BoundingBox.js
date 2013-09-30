/**
 * Описывает виртуальный класс BoundingBox.
 *
 * @this {ArmContext.BoundingBox}
 * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
 * @version 0.1
 */

(function(window) {
    var BoundingBox = function(O) {
        var me = {};

        me._rect = [{point0: new gizmo.Math.Point2D(0,0),
                    point1: new gizmo.Math.Point2D(0,0),
                    point2: new gizmo.Math.Point2D(0,0),
                    point3: new gizmo.Math.Point2D(0,0),
                    width: 0,
                    height: 0},
                    {point0: new gizmo.Math.Point2D(0,0),
                    point1: new gizmo.Math.Point2D(0,0),
                    point2: new gizmo.Math.Point2D(0,0),
                    point3: new gizmo.Math.Point2D(0,0),
                    width: 0,
                    height: 0}];

        me.GetNewPoints = function() {
            return this._rect[0];
        };

        me.GetOldPoints = function() {
            return this._rect[1];
        };

        me.IntersectWith = function(BoundingBox) {
            var firstPoints = this.GetOldPoints();
            var secondPoints = BoundingBox.GetOldPoints();

            if(secondPoints.point0.x > firstPoints.point1.x) {return false};
            if(secondPoints.point1.x < firstPoints.point0.x) {return false};
            if(secondPoints.point0.y > firstPoints.point3.y) {return false};
            if(secondPoints.point3.y < firstPoints.point0.x) {return false};

            return true;
        };

        me.SumWith = function(BoundingBox) {
            var fP = this.GetOldPoints();
            var sP = BoundingBox.GetOldPoints();

            var minX = fP.point0.x;
            var minY = fP.point0.y;
            var maxX = fP.point2.x;
            var maxY = fP.point2.y;

            minX = Math.min(fP.point0.x, fP.point1.x, fP.point2.x, fP.point3.x, sP.point0.x, sP.point1.x, sP.point2.x, sP.point3.x);
            minY = Math.min(fP.point0.y, fP.point1.y, fP.point2.y, fP.point3.y, sP.point0.y, sP.point1.y, sP.point2.y, sP.point3.y);

            maxX = Math.max(fP.point0.x, fP.point1.x, fP.point2.x, fP.point3.x, sP.point0.x, sP.point1.x, sP.point2.x, sP.point3.x);
            maxY = Math.max(fP.point0.y, fP.point1.y, fP.point2.y, fP.point3.y, sP.point0.y, sP.point1.y, sP.point2.y, sP.point3.y);

            // var rect = {point0: {x: minX, y: minY},
            //             point1: {x: maxX, y: minY},
            //             point2: {x: maxX, y: maxY},
            //             point3: {x: minX, y: maxY},
            //             width: maxX - minX,
            //             height: maxY - minY};
            return new ArmContext.BoundingBox({points: {point0: {x: minX, y: minY}, point1: {x: maxX, y: maxY}}});

        };

        me.Update = function(globalRepresentation) {
            var points = globalRepresentation.GetPoints();
            var minX = points[0][0];
            var minY = points[0][1];
            var maxX = points[0][0];
            var maxY = points[0][1];

            for(var pointName in points) {
                var point = points[pointName];
                minX = Math.min(point[0], minX);
                minY = Math.min(point[1], minY);

                maxX = Math.max(point[0], maxX);
                maxY = Math.max(point[1], maxY);
            };
            
            var rect = {point0: {x: minX, y: minY},
                        point1: {x: maxX, y: minY},
                        point2: {x: maxX, y: maxY},
                        point3: {x: minX, y: maxY},
                        width: maxX - minX,
                        height: maxY - minY};

            this._rect.reverse();

            this._rect[0] = rect;
            // console.log("BoundingBox.Update");
        };

        me.Set = function( O ) {
            for(var name in O) {
                switch( name ) {
                    case "points" : {
                        var points = O[name];

                        gizmo.Filter(points, "Object");
                        gizmo.Filter(points.point0, "Object");
                        gizmo.Filter(points.point1, "Object");

                        var rect = {point0: points.point0,
                                    point1: points.point1,
                                    point2: {x: points.point1.x, y: points.point0.y},
                                    point3: {x: points.point0.x, y: points.point1.y},
                                    width: points.point1.x - points.point0.x,
                                    height: points.point1.y - points.point0.y};
                        
                        this._rect[0] = rect;
                        this._rect[1] = rect;


                    }; break;

                };
            };

        };

        me.Set( O || {} );

        return me;

    };

    window.ArmContext.BoundingBox = BoundingBox;

})(window);