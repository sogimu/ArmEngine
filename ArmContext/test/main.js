window.onload = function() {

    layer1 = ArmContext.Layer({name: "layer1", container: "container", fps: 1});
    CTX = layer1._ctx;
    x=250;
    y=50;

    X=200;
    Y=100;

    Xf=200;
    Yf=100

    Xs=350;
    Ys=100;

    A = new ArmContext.Rect({layer: layer1, width : 150, height: 150, lineDash: [1,2,3], lineWidth: 7, globalAlpha: 0.5, strokeObject: "#ff0000", fillObject: "#00ff00", shadowOffsetX: 15, shadowOffsetY: 15, shadowColor: "#0000ff", zindex: 23});
    A.name = "A";
    console.log(A);
    var Image0 = new Image();
    Image0.src = "img/gras.jpg";
    Image0.onload = function() {
        B = new ArmContext.Image({layer: layer1, image: Image0, width : 100, height: 100});
        B.name = "B";
        console.log(B);
        B.TranslateTo({x:x, y:y+100});

    
    layer1.Start();    
    
    A.TranslateTo({x:x, y:y});
    
    A.Scale({x: 0.5, y:1});
    // B.Scale({x: 1.5, y:1});
    
    A.Rotate({gradAngle: 15, x:X, y:Y});

    setInterval(function() {
        A.Rotate({gradAngle: 15, x:X, y:Y});
        B.Rotate({gradAngle: 1, x:X, y:Y});
    
    //     // A.Scale({x: 0.99, y:1.01});
        
    //     //A.TranslateTo({x:x, y:y});
           
    //     // CTX.clearRect(0,0,500,500);
    
    //     CTX.save();
    //         CTX.beginPath();        
    //             CTX.arc(x,y, 3, 0, Math.PI*2, false);
    //             CTX.stroke();
    //             CTX.fill();
    //         CTX.closePath();
    //     CTX.restore();

    //     CTX.save();
    //         CTX.beginPath();        
    //             CTX.arc(X,Y, 3, 0, Math.PI*2, false);
    //             CTX.stroke();
    //             CTX.fill();
    //         CTX.closePath();
    //     CTX.restore();

    //     CTX.save();
    //         CTX.beginPath();        
    //             CTX.fillStyle = "#00ff00";
    //             CTX.arc(Xf,Yf, Math.sqrt((x-Xf)*(x-Xf)+(y-Yf)*(y-Yf)), 0, Math.PI*2, false);
    //             CTX.stroke();
    //             //CTX.fill();
    //         CTX.closePath();
    //     CTX.restore();

    //     CTX.save();
    //         CTX.beginPath();        
    //             CTX.fillStyle = "#0000ff";
    //             CTX.arc(Xs,Ys, Math.sqrt((x-Xs)*(x-Xs)+(y-Ys)*(y-Ys)), 0, Math.PI*2, false);
    //             CTX.stroke();
    //             //CTX.fill();
    //         CTX.closePath();
    //     CTX.restore();

    //     // A.Draw();
    //     // B.Draw();

        // A._debug.ShowDebugInfo(CTX);
        // A._globalRepresentation.ShowPoints(CTX);
        // B._globalRepresentation.ShowPoints(CTX);

    //     // A._internalRepresentation.ShowPoints(CTX);
        // B._internalRepresentation.ShowPoints(CTX);
                         
    }, 32);
    
    // layer1._canvasElement.onmousemove = function(e) {
    //     // if(A.HasPoint({x: e.offsetX, y: e.offsetY})) {
    //     //     console.log("Win!");

    //     // }
    //     lastObj = null;
    //     var tmpObj = layer1.GetTopestPrimitiveUnderPoint({x: e.offsetX, y: e.offsetY});
    //     if(tmpObj != lastObj) {
    //         lastObj = tmpObj;
    //         console.log(lastObj.name);

    //     }
    // };

    layer1.SetLisener("onMouseMove",function(e) {
        // if(A.HasPoint({x: e.offsetX, y: e.offsetY})) {
        //     console.log("Win!");

        // }
        lastObj = null;
        var tmpObj = layer1.GetTopestPrimitiveUnderPoint({x: e.offsetX, y: e.offsetY});
        if(tmpObj != lastObj) {
            lastObj = tmpObj;
            console.log(lastObj.name);

        }
    });

    layer1.ListenMouseEvents();

}

};