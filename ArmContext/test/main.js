window.onload = function() {

    layer1 = ArmContext.Layer({width: 1300, height: 600, name: "layer1", container: "container"});
    CTX = layer1._ctx;

    var Image0 = new Image();
    Image0.src = "img/gras.jpg";
    Image0.onload = function() {
    
    A = new ArmContext.Rect({layer: layer1, width : 100, height: 100/*, lineDash: [1,2,3]*/, lineWidth: 12, globalAlpha: 1, strokeObject: "#ff0000", fillObject: "#00ff00", /*shadowOffsetX: 15, shadowOffsetY: 15,*/ shadowColor: "#0000ff", zindex: 23})
    .TranslateTo({x: 200, y: 100})
    A.name = "A";
    
    B = new ArmContext.Rect({layer: layer1, width : 100, height: 100, lineDash: [1,2,3], lineWidth: 63, globalAlpha: 0.5, strokeObject: "#ff0000", fillObject: "#00ff00", /*shadowOffsetX: 15, shadowOffsetY: 15,*/ shadowColor: "#0000ff", zindex: 23})
    .TranslateTo({x: 250, y: 150})
    B.name = "B";
    
    // C = new ArmContext.Image({layer: layer1, image: Image0, width : 100, height: 100})
    // .TranslateTo({x: 450, y: 100})
    // C.name = "C";
    
    // D = new ArmContext.Image({layer: layer1, image: Image0, width : 100, height: 100})
    // .TranslateTo({x: 500, y: 150})
    // D.name = "D";
        
    setInterval(function() {
        A.Rotate({gradAngle: 1, x: 100, y: 100})
        B.Rotate({gradAngle: -1, x: 100, y: 100})
        // A._debug.ShowDebugInfo(CTX);
        // A._globalRepresentation.ShowPoints(CTX);
        // B._globalRepresentation.ShowPoints(CTX);

        // A._internalRepresentation.ShowPoints(CTX);
        // B._internalRepresentation.ShowPoints(CTX);
        layer1.ReDraw();                 
    }, 10 );
    
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

    // layer1.SetLisener("onMouseMove",function(e) {
    //     // if(A.HasPoint({x: e.offsetX, y: e.offsetY})) {
    //     //     console.log("Win!");

    //     // }
    //     lastObj = null;
    //     var tmpObj = layer1.GetTopestPrimitiveUnderPoint({x: e.offsetX, y: e.offsetY});
    //     if(tmpObj != lastObj) {
    //         lastObj = tmpObj;
    //         console.log(lastObj.name);

    //     }
    // });

    // layer1.ListenMouseEvents();

}

};