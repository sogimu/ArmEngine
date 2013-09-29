/**
 * Описывает класс содержащий методы необходимые для отладки примитива.
 *
 * @this {ArmContext.Debug}
 * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
 * @version 0.1
 */

(function(window) {
    var Debug = function( O ) {

        gizmo.Filter(O,"Object");
        // gizmo.Filter(O._interalRepresentation,"Null");
        // gizmo.Filter(O._2dContextRepresentation,"Null");
        // gizmo.Filter(O._globalRepresentation,"Null");
        // gizmo.Filter(O._mvMatrix,"Null");
        // gizmo.Filter(O._debug,"Null");

        var me = {};

        me.object = O;

        me.ShowDebugInfo = function() {
            console.log("<<Primitive>> DebugInfo");
            this.object._2dContextRepresentation.ShowDebugInfo();         
            this.object._interalRepresentation.ShowDebugInfo();
            this.object._globalRepresentation.ShowDebugInfo();
            this.object._mvMatrix.ShowDebugInfo();
        };

        return me;
    }

    ArmContext.Debug = Debug;
})();
