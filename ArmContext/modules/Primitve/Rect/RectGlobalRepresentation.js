(function(window) {
    var RectGlobalRepresentation = function() {

        var me = ArmContext.GlobalRepresentation();

        me.GetX = function() {
            return this.GetPoints()[0][0];
        };

        me.GetY = function() {
            return this.GetPoints()[0][1];
        };

        me.GetWidth = function() {
            var ponts = this.GetPoints();
            return points[2][0] - points[0][0];
        };
        
        me.GetHeight = function() {
            var ponts = this.GetPoints();
            return points[2][1] - points[0][1];
        };

        me.Update = function(internalRepresentation, C2dContextRepresentation, mvMatrix) {
            gizmo.Filter(internalRepresentation,"Object");
            gizmo.Filter(C2dContextRepresentation,"Object");
            gizmo.Filter(mvMatrix,"Object");

            var lineWidth = C2dContextRepresentation.GetLineWidth() != "default" ? C2dContextRepresentation.GetLineWidth() : 2;
            var lineWidthAbout = (lineWidth / 2) + 0.5;

            var internalPoints = internalRepresentation.GetPoints();
            var newInternalPoints = [
            [internalPoints[0][0] - lineWidthAbout,internalPoints[0][1] - lineWidthAbout,internalPoints[0][2]],
            [internalPoints[1][0] + lineWidthAbout,internalPoints[1][1] - lineWidthAbout,internalPoints[1][2]],
            [internalPoints[2][0] + lineWidthAbout,internalPoints[2][1] + lineWidthAbout,internalPoints[2][2]],
            [internalPoints[3][0] - lineWidthAbout,internalPoints[3][1] + lineWidthAbout,internalPoints[3][2]]];

            this.SetPoints( newInternalPoints );
            // this.SetPoints( internalRepresentation.GetPoints() );

            this.SetMatrixOfPoints( this.GetMatrixOfPoints().x(mvMatrix.GetMatrix()) );
            
            this.UpdatePolygone();

            // console.log("GlobalRepresentation.Update");

            return this;
        };
        
        me.ShowPoints = function(ctx) {
            var points = this.GetPoints();
                CTX.save();
                    CTX.beginPath();        
                        CTX.fillStyle = "#ff0000";
                        CTX.rect(points[0][0]-2,points[0][1]-2,4,4);
                        CTX.stroke();
                        CTX.fill();
                    CTX.closePath();
                CTX.restore();
                CTX.save();
                    CTX.beginPath();        
                        CTX.fillStyle = "#00ff00";
                        CTX.rect(points[1][0]-2,points[1][1]-2,4,4);
                        CTX.stroke();
                        CTX.fill();
                    CTX.closePath();
                CTX.restore();
                CTX.save();
                    CTX.beginPath();        
                        CTX.fillStyle = "#0000ff";
                        CTX.rect(points[2][0]-2,points[2][1]-2,4,4);
                        CTX.stroke();
                        CTX.fill();
                    CTX.closePath();
                CTX.restore();
                CTX.save();
                    CTX.beginPath();        
                        CTX.fillStyle = "#aaffbb";
                        CTX.rect(points[3][0]-2,points[3][1]-2,4,4);
                        CTX.stroke();
                        CTX.fill();
                    CTX.closePath();
                CTX.restore();
  
        };

        return me;

    }

    ArmContext.RectGlobalRepresentation = RectGlobalRepresentation;
})();

