/**
 * Описывает класс содержащий матрицу преобразования примитива.
 *
 * @this {ArmContext.MvMatrix}
 * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
 * @version 0.1
 */

(function(window) {
    var MvMatrix = function() {

        var me = {};

        me._matrix = new $M([[1,0,0],
                                                    [0,1,0],
                                                    [0,0,1]] );

        me.Rotate = function( angle ) {
            var a = Math.cos(angle);
            var b = Math.sin(angle);
            
            var rotateMatrix = new $M([
                    [a,b,0], // -b
                    [-b,a,0], // b
                    [0,0,1]
            ]);

            this._matrix = this._matrix.x( rotateMatrix );

            return this;
        };

        me.Scale = function( x, y ) {
            gizmo.Filter(x,"Number");
            gizmo.Filter(y,"Number");

            var transformMatrix = new $M([
                [x,0,0],
                [0,y,0],
                [0,0,1]
            ]);

            this._matrix = this._matrix.x( transformMatrix );

            return this;
        };

        me.Translate = function( x, y ) {
            gizmo.Filter(x,"Number");
            gizmo.Filter(y,"Number");

            var transformMatrix = new $M([
                [1,0,0],
                [0,1,0],
                [x,y,1]
            ]);

            this._matrix = this._matrix.x( transformMatrix );

            return this;
 
        };

        me.Scos = function( x, y ) {
            gizmo.Filter(x,"Number");
            gizmo.Filter(y,"Number");

            var transformMatrix = new $M([
                [1,y,0],
                [x,1,0],
                [0,0,1]
            ]);

            this._matrix = this._matrix.x( transformMatrix );

            return this;
        };

        me.GetMatrix = function() {
            return this._matrix;
        };

        me.GetTransformParams = function() {
            var matrix = this.GetMatrix();

            var a = matrix.elements[0][0];
            var b = matrix.elements[0][1];
            var c = matrix.elements[1][0];
            var d = matrix.elements[1][1];
            var e = matrix.elements[2][0];
            var f = matrix.elements[2][1];

            return {a: a, b: b, c: c, d: d, e: e, f: f};

        };

        me.ShowDebugInfo = function(ctx) {
            var matrix = this.GetMatrix();
            console.log("mvMatrix:");
            console.log(matrix.elements[0]);
            console.log(matrix.elements[1]);
            console.log(matrix.elements[2]);

        };

        return me;
    }

    ArmContext.MvMatrix = MvMatrix;
})();
