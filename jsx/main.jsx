var dodo = function (info)
{
    app.documents.add();// 新建一个文档
}

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