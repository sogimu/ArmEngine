/**
 * Описывает абстрактный класс ответственный за визуальные свойства примитива.
 *
 * @this {ArmContext.C2dContextRepresentation}
 * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
 * @version 0.1
 */

(function(window) {
    var C2dContextRepresentation = function() {

        var me = {};
        
        // Ссылка на примитив-владелец объекта данного класса
        me._primitive = null; 

        //  Not view properties
        me._ctx = null;
        me._layer = null;

        // View properties
        me._globalAlpha = "default";  // 0 < 1 
        me._shadowColor = "default";
        me._shadowBlur = "default";
        me._shadowOffsetX = "default";
        me._shadowOffsetY = "default";
        me._zindex = 0;

        // Properties not for user updating
        me._boundingBox = {};
        me._pictureUnderPrimitive = {};

        me.Update = function(O) {
            // this._ctx = O.ctx || this._ctx;
            // this._layer = O.layer || this._layer;
            // this._ctx = this._layer ? this._layer.GetCtx() : this._ctx;
   
            // this._globalAlpha = O.globalAlpha || this._globalAlpha;
            // this._shadowColor = O.shadowColor || this._shadowColor;
            // this._shadowBlur = O.shadowBlur || this._shadowBlur;
            // this._shadowOffsetX = O.shadowOffsetX || this._shadowOffsetX;
            // this._shadowOffsetY = O.shadowOffsetY || this._shadowOffsetY;
            // this._zindex = O.zindex || this._zindex;

            for(var name in O) {
                switch( name ) {
                    case "ctx"     : {
                        this.SetCtx( O[name] );
                    }; break;
                    case "layer"     : {
                        this.SetLayer( O[name] );
                        this.SetCtx( this.GetLayer().GetCtx() );
                    }; break;

                    case "globalAlpha"     : {
                        this.SetGlobalAlpha( O[name] );
                    }; break;

                    case "shadowColor"     : {
                        this.SetShadowColor( O[name] );
                    }; break;

                    case "shadowBlur"     : {
                        this.SetBlur( O[name] );
                    }; break;

                    case "shadowOffsetX"     : {
                        this.SetShadowOffsetX( O[name] );
                    }; break;

                    case "shadowOffsetY"     : {
                        this.SetShadowOffsetY( O[name] );
                    }; break;

                    case "zindex"     : {
                        this.SetZindex( O[name] );
                    }; break;

                };
            };

        };
        me.SetCtx = function( ctx ) {
            gizmo.Filter(ctx,"CanvasRenderingContext2D");
            this._ctx = ctx;
        };

        me.SetLayer = function( layer ) {
            gizmo.Filter(layer,"Object");
            this._layer = layer;
            this._layer.AddPrimitive( this._primitive );
        };

        me.SetGlobalAlpha = function(O) {
            gizmo.Filter(O, "Number");
            this._globalAlpha = O;
        };

        me.SetShadowColor = function(O) {
            gizmo.Filter(O, "String");
            this._shadowColor = O;
        };

        me.SetShadowBlur = function(O) {
            gizmo.Filter(O, "Number");
            this._shadowBlur = O;
        };

        me.SetShadowOffsetX = function(O) {
            gizmo.Filter(O, "Number");
            this._shadowOffsetX = O;
        };

        me.SetShadowOffsetY = function(O) {
            gizmo.Filter(O, "Number");
            this._shadowOffsetY = O;
        };

        me.SetZindex = function( zindex ) {
            gizmo.Filter(zindex,"Number");
            this._zindex = zindex;
            
            this.GetLayer().SortByZindex();
        };



        me.GetCtx = function() {
            return this._ctx;
        };

        me.GetLayer = function() {
            return this._layer;
        };

        me.GetGlobalAlpha = function() {
            return this._globalAlpha;
        };

        me.GetShadowColor = function() {
            return this._shadowColor;
        };

        me.GetShadowBlur = function() {
            return this._shadowBlur;
        };

        me.GetShadowOffsetX = function() {
            return this._shadowOffsetX;
        };

        me.GetShadowOffsetY = function() {
            return this._shadowOffsetY
        };

        me.GetZindex = function() {
            return this._zindex;
        };

        me.ShowDebugInfo = function(ctx) {
            console.log("VisualProperties:");
            console.log("Method have not realisation");

        };

        return me;
    };

    ArmContext.C2dContextRepresentation = C2dContextRepresentation;
})();
