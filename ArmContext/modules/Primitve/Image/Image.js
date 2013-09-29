/**
 * Описывает класс Image. Данный класс описывает объект "изображение".
 *
 * @constructor
 * @param {object} O
 * @param {string} O.ctx           Объект графического контекста
 * @param {number} O.x             X
 * @param {number} O.y             Y
 * @param {number} O.width         Ширина изображения
 * @param {number} O.height        Высота изображения
 * @param {string} O.fillObject    Определяет внешний вид заливки, может быть как цветом ("#FFaa00"), так и градиентом
 * @param {string} O.strokeObject  Определяет внешний вид линий, может быть как цветом ("#FFaa00"), так и градиентом
 * @param {number} O.globalAlpha   Уровень прозрачности, можно изменять от 0..1
 * @param {number} O.lineWidth     толщина контура
 * @this {ArmContext.Image}
 * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
 * @version 0.1
 */

(function(window) {
    var Image = function( O ) {

        gizmo.Filter(O,"Object");

        var me = ArmContext.Primitive();

        // Инициализация внутреннего представления
        me._internalRepresentation = ArmContext.ImageInternalRepresentation();

        // Инициализация canvas представления
        me._2dContextRepresentation = ArmContext.Image2dContextRepresentation(me);

        // Инициализация глобального представления примитива
        me._globalRepresentation = ArmContext.ImageGlobalRepresentation();

        me.Draw = function() {
            var ctxRep = this._2dContextRepresentation;
            var intRep = this._internalRepresentation;
            var ctx = ctxRep._ctx;
            ctx.save();
                params = this._mvMatrix.GetTransformParams();
                ctx.setTransform(params.a, params.b, params.c, params.d, params.e, params.f);
                ctx.drawImage(ctxRep.GetImage(), 0,0, intRep.GetWidth(), intRep.GetHeight());
            ctx.restore();
        };

        me.Clear = function() {
            var ctxRep = this._2dContextRepresentation;
            var intRep = this._internalRepresentation;
            var ctx = ctxRep.GetCtx();

            ctx.clearRect(0,0,500,500);

        };

        me.Update( O );
        
        return me;

    };

    window.ArmContext.Image = Image;

})(window);