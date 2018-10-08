var cs = new CSInterface();
var state={
    relevance:false
}
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
    isNullDefault(document.querySelectorAll('.backGaugeInput'));
    for(var i in marginObj){
        if(marginObj[i].inverse){
            marginObj[i].value=-1*parseInt(numberCheck(marginObj[i].value))
        }
    }
    cs.evalScript("addBackGauge('"+ JSON.stringify(marginObj)+"');");
}

function averageSeparation(){
    //平均分列
    var average={
        H_average:{
            value:numberCheck(document.querySelector(".H_average").value),// 横向分列列数
        },
        V_average:{
            value:numberCheck(document.querySelector(".V_average").value),// 纵向分列列数
        }
    }
    cs.evalScript("averageSeparation('"+ JSON.stringify(average)+"');");
}
function unitAddGuide(){
    //数值分列
    var unit={
        lr_unit:{
            value:numberCheck(document.querySelector(".lr_unit").value),// 横向分列列数
        },
        tb_unit:{
            value:numberCheck(document.querySelector(".tb_unit").value),// 纵向分列列数
        }
    }
    cs.evalScript("unitAddGuide('"+ JSON.stringify(unit)+"');");
}
function relevanceFN(){
    //使值相同
    var relevanceDOM=document.querySelector('.relevance')
    if(relevanceDOM.className.split(" ").length<=1){
        state.relevance=true
        relevanceDOM.className=relevanceDOM.className+' active'
    }else{
        state.relevance=false
        relevanceDOM.className=relevanceDOM.className.split(" ")[0]
    }
}
function backGaugeInput(e){
    //如果在同值的情况下触发
    if(state.relevance){
        var backGaugeInputs=document.querySelectorAll('.backGaugeInput')
        for(var i=0;i<backGaugeInputs.length;i++){
            backGaugeInputs[i].value=e.value
        }
    }
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
function goAbout(){
    cs.openURLInDefaultBrowser("https://github.com/1057376155/corguide")
}
function isNullDefault(DOMs,defaultValue){
    //如果是非数字就设置默认值
    if(!defaultValue)defaultValue=0;
    for(var i=0;i<DOMs.length;i++){
        DOMs[i].value=parseInt(DOMs[i].value)
        if(!/^-?[1-9]\d*$/.test(DOMs[i].value)){
            DOMs[i].value=defaultValue
        }
    }
}