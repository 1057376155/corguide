var cs = new CSInterface();

function loadJSX(fileName)
{
    var extensionRoot = cs.getSystemPath(SystemPath.EXTENSION) + "/lib/";
    cs.evalScript('$.evalFile("' + extensionRoot + fileName + '")');
}
loadJSX("json2.js"); //为 ExtendScript 载入 JSON 库



var horizontalHalf=function(){
    //横向居中辅助线
    cs.evalScript("horizontalHalf()");
}
function clearGuide(){
    //清空辅助线
    cs.evalScript("clearGuide()");
}
function verticalHalf(){
    //垂直居中辅助线
    cs.evalScript("verticalHalf()");
}

function addBackGauge(){
    //添加边距
    var marginObj={
        topMargin:{
            value:document.querySelector('.topMargin').value,
            direction:'h',
            index:1,
            inverse:false
        },
        bottomMargin:{
            value:document.querySelector('.bottomMargin').value,
            direction:'h',
            index:3,
            inverse:true
        },
        leftMargin:{
            value:document.querySelector('.leftMargin').value,
            direction:'v',
            index:0,
            inverse:false
        },
        rightMargin:{
            value:document.querySelector('.rightMargin').value,
            direction:'v',
            index:2,
            inverse:true,//需要转为负数
        },
    }
    for(var i in marginObj){
        if(marginObj[i].inverse){
            marginObj[i].value=-1*parseInt(numberCheck(marginObj[i].value))
        }
    }
    cs.evalScript("addBackGauge('"+ JSON.stringify(marginObj)+"');");
}

function numberCheck(num,defaultValue){
    //不是数字转为默认值
    if(!defaultValue)defaultValue=0;
    num=Number(num)
    if(!/^-?[1-9]\d*$/.test(num)){
        num=defaultValue
    }
    return num;
}