/**
 * Описывает класс Rect. Данный класс описывает объект "прямоугольник".
 *
 * @constructor
 * @param {object} O
 * @param {string} O.ctx           Объект графического контекста
 * @param {number} O.x             X
 * @param {number} O.y             Y
 * @param {number} O.width         Ширина прямоугольника
 * @param {number} O.height        Высота прямоугольника
 * @param {string} O.fillObject    Определяет внешний вид заливки, может быть как цветом ("#FFaa00"), так и градиентом
 * @param {string} O.strokeObject  Определяет внешний вид линий, может быть как цветом ("#FFaa00"), так и градиентом
 * @param {number} O.globalAlpha   Уровень прозрачности, можно изменять от 0..1
 * @param {number} O.lineWidth     толщина контура
 * @this {ArmContext.Rect}
 * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
 * @version 0.1
 */

(function(window) {
    var Rect = function( O ) {

        gizmo.Filter(O,"Object");

        var me = ArmContext.Primitive();

        // Инициализация внутреннего представления
        me._internalRepresentation = ArmContext.RectInternalRepresentation(me);

        // Инициализация canvas представления
        me._2dContextRepresentation = ArmContext.Rect2dContextRepresentation(me);

        // Инициализация глобального представления примитива
        me._globalRepresentation = ArmContext.RectGlobalRepresentation(me);

        me.Draw = function() {
            var ctxRep = this._2dContextRepresentation;
            var intRep = this._internalRepresentation;
            var ctx = ctxRep.GetCtx();

            ctx.save();
                ctx.beginPath();
                    params = this._mvMatrix.GetTransformParams();
                    ctx.setTransform(params.a, params.b, params.c, params.d, params.e, params.f);
                    ctx.rect(0,0, intRep.GetWidth(), intRep.GetHeight());
                ctx.closePath();

            if(ctxRep.GetFillObject() != "default") {
                ctx.setFillColor( ctxRep.GetFillObject() );
            }
            if(ctxRep.GetStrokeObject() != "default") {
                ctx.setStrokeColor( ctxRep.GetStrokeObject() );
            }
            if(ctxRep.GetLineWidth() != "default") {
                ctx.setLineWidth( ctxRep.GetLineWidth() );
            }
            if(ctxRep.GetGlobalAlpha() != "default") {
                ctx.setAlpha( ctxRep.GetGlobalAlpha() );
            }
            if(ctxRep.GetShadowColor() != "default") {
                ctx.shadowColor = ctxRep.GetShadowColor();
            }
            if(ctxRep.GetShadowBlur() != "default") {
                ctx.shadowBlur = ctxRep.GetShadowBlur();
            }
            if(ctxRep.GetShadowOffsetX() != "default") {
                ctx.shadowOffsetX = ctxRep.GetShadowOffsetX();
            }
            if(ctxRep.GetShadowOffsetY() != "default") {
                ctx.shadowOffsetY = ctxRep.GetShadowOffsetY();
            }
            if(ctxRep.GetLineCap() != "default") {
                ctx.setLineCap( ctxRep.GetLineCap() );
            }
            if(ctxRep.GetLineDash() != "default") {
                ctx.setLineDash( ctxRep.GetLineDash() );
            }
            if(ctxRep.GetLineJoin() != "default") {
                ctx.setLineJoin( ctxRep.GetLineJoin() );
            }                    

            ctx.stroke();
            ctx.fill();

            ctx.restore();

        };

        me.Clear = function() {
            var ctxRep = this._2dContextRepresentation;
            var intRep = this._internalRepresentation;
            var ctx = ctxRep.GetCtx();

            var boundingBox = this._boundingBox.GetOldPoints();
            var ctx = ctxRep.GetCtx();

            ctx.clearRect(boundingBox.point0.x,boundingBox.point0.y,boundingBox.width,boundingBox.height);
        };

        me._internalRepresentation.SetLisener("onChanged", function() {
            this.SetChanged();            
        });

        me._2dContextRepresentation.SetLisener("onChanged", function() {
            this.SetChanged();            
        });

        me._mvMatrix.SetLisener("onChanged", function() {
            this.SetChanged();            
        });

        me.Set( O );
        me.Update();

        return me;

    };

    window.ArmContext.Rect = Rect;

})(window);     