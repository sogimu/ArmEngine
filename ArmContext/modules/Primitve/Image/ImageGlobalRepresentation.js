(function(window) {
    var ImageGlobalRepresentation = function() {

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

    ArmContext.ImageGlobalRepresentation = ImageGlobalRepresentation;
})();

