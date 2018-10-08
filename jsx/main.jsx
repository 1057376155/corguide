
var horizontalHalf=function(){
    //横向居中 辅助线
    // 优先级 选区>形状
    if(!isError("app.activeDocument.selection.bounds")){
        //如果选区存在
        var selectionInfo=app.activeDocument.selection.bounds;
        addGuide('h',(parseFloat((selectionInfo[3].value-selectionInfo[1].value)/2))+selectionInfo[1].value);
    }else if(!isError("app.activeDocument.activeLayer.bounds")){
        //如果选中形状
       var activeLayerInfo=app.activeDocument.activeLayer.bounds;
       addGuide('h',(parseFloat((activeLayerInfo[3].value-activeLayerInfo[1].value)/2))+activeLayerInfo[1].value);
    }else{
        //默认值
        var height=app.activeDocument.height.value;
        addGuide('h',height/2);
    }

}
function verticalHalf(){
    // 垂直居中 辅助线
    if(!isError("app.activeDocument.selection.bounds")){
        //如果选区存在
        var selectionInfo=app.activeDocument.selection.bounds;
        addGuide('v',(parseFloat((selectionInfo[2].value-selectionInfo[0].value)/2))+selectionInfo[0].value);
    }else if(!isError("app.activeDocument.activeLayer.bounds")){
        //如果选中形状
       var activeLayerInfo=app.activeDocument.activeLayer.bounds;
       addGuide('v',(parseFloat((activeLayerInfo[2].value-activeLayerInfo[0].value)/2))+activeLayerInfo[0].value);
    }else{
        //默认值
        var width=app.activeDocument.width.value;
        addGuide('v',width/2)
    }
}

function addBackGauge(data){
    //添加边距(上下左右))
    data=JSON.parse(data)
    if(!isError("app.activeDocument.selection.bounds")){
        //如果选区存在
        var selectionInfo=app.activeDocument.selection.bounds;
        for(var i in data){
            addGuide(data[i].direction,parseInt(selectionInfo[parseInt(data[i].index)].value+ parseInt(data[i].value)));
        }
    }else if(!isError("app.activeDocument.activeLayer.bounds")){
        //如果选中形状
       var activeLayerInfo=app.activeDocument.activeLayer.bounds;
       for(var i in data){
         addGuide(data[i].direction,parseInt(activeLayerInfo[parseInt(data[i].index)].value+ parseInt(data[i].value)));
       }
    }else{
        //默认值
        return;
    }
}

function averageSeparation(average){
    //平均分列
    average=JSON.parse(average)
    if(!isError("app.activeDocument.selection.bounds")){
        //如果选区存在
        var selectionInfo=app.activeDocument.selection.bounds;
        var vstep= parseFloat((selectionInfo[2].value-selectionInfo[0].value)/average.H_average.value);//步长
        var hstep= parseFloat((selectionInfo[3].value-selectionInfo[1].value)/average.V_average.value);//步长
        averageSeparationAddGuide({direction:'v',step:vstep,len:average.H_average.value,baseNum:selectionInfo[0].value})
        averageSeparationAddGuide({direction:'h',step:hstep,len:average.V_average.value,baseNum:selectionInfo[1].value})
    }else if(!isError("app.activeDocument.activeLayer.bounds")){
        //如果选中形状
       var activeLayerInfo=app.activeDocument.activeLayer.bounds;
       var vstep= parseFloat((activeLayerInfo[2].value-activeLayerInfo[0].value)/average.H_average.value);//步长
       var hstep= parseFloat((activeLayerInfo[3].value-activeLayerInfo[1].value)/average.V_average.value);//步长
       averageSeparationAddGuide({direction:'v',step:vstep,len:average.H_average.value,baseNum:activeLayerInfo[0].value})
       averageSeparationAddGuide({direction:'h',step:hstep,len:average.V_average.value,baseNum:activeLayerInfo[1].value})

    }else{
        //默认值
        var width=app.activeDocument.width.value;
        var height=app.activeDocument.height.value;
        var vstep= parseFloat(width/average.H_average.value);//步长
        var hstep= parseFloat(height/average.V_average.value);//步长
        averageSeparationAddGuide({direction:'v',step:vstep,len:average.H_average.value,baseNum:0})
        averageSeparationAddGuide({direction:'h',step:hstep,len:average.V_average.value,baseNum:0})
    }
}

function averageSeparationAddGuide(o){
    //averageSeparation 提取方法
    // {
    //     direction:[h/v], //方向
    //     step:num, //步长
    //     len:num, //循环次数
    //     baseNum:num //基数
    // }
    if(o.len==0)return;
    for(var i=0;i<o.len+1;i++){
        addGuide(o.direction,o.step*i+o.baseNum);
    }
}

function unitAddGuide(unit){
    //数值分列
    unit=JSON.parse(unit)
    if(!isError("app.activeDocument.selection.bounds")){
        //如果选区存在
        var selectionInfo=app.activeDocument.selection.bounds;
        averageUnitAddGuide({direction:'v',step:unit.lr_unit.value,end:selectionInfo[2].value,start:selectionInfo[0].value})
        averageUnitAddGuide({direction:'h',step:unit.tb_unit.value,end:selectionInfo[3].value,start:selectionInfo[1].value})
    }else if(!isError("app.activeDocument.activeLayer.bounds")){
        //如果选中形状
       var activeLayerInfo=app.activeDocument.activeLayer.bounds;
       averageUnitAddGuide({direction:'v',step:unit.lr_unit.value,end:activeLayerInfo[2].value,start:activeLayerInfo[0].value})
       averageUnitAddGuide({direction:'h',step:unit.tb_unit.value,end:activeLayerInfo[3].value,start:activeLayerInfo[1].value})

    }else{
        //默认值
        var width=app.activeDocument.width.value;
        var height=app.activeDocument.height.value;
        averageUnitAddGuide({direction:'v',step:unit.lr_unit.value,end:width,start:0})
        averageUnitAddGuide({direction:'h',step:unit.tb_unit.value,end:height,start:0})
    }
}
function averageUnitAddGuide(o){
    //提取UnitAddGuide 方法
     // {
    //     direction:[h/v], //方向
    //     step:num, //步长
    //     end:num, //结束
    //     start:num //开始
    // }
    if(o.step==0)return;
    while (o.start<o.end) {
        addGuide(o.direction,o.start);
        o.start=o.start+o.step
    }
}

var clearGuide=function(){
    //清除辅助线
    app.activeDocument.guides.removeAll();
}

function addGuide(d,num){
    //添加辅助线 d:方向，num:距离
    var directionType={
        h:Direction.HORIZONTAL,
        v:Direction.VERTICAL
    }
    if(!d)d='h';
    if(!num||isNaN(num))num=0
    app.activeDocument.guides.add(directionType[d],UnitValue(num+"px"))
}

function isError(str){
    //判断是否有这个属性
    try {
        eval(str)
    } catch (error) {
        return true
    }
    return false;
}

function isNullArea(bounds){
    //判断传入的bounds是否全部为0
    var sum=0;
    for(var i in bounds){
        sum+=bounds[i].value
    }
    if(sum==0){
        return true
    }else{
        return false
    };
}