$NG.AllReady(function (page,
    { useAction,useBeforeClick,useBeforeOpen, useValuesChange, useDataIndexChange, useUpdateRows, useClick }
) {
    debugger
    console.log("========");
    var form = $NG.getCmpApi('form');
    var mstform2 = $NG.getCmpApi('tabIds_tabSummary'); //项目概况
    var proId = $NG.getQueryValue('projprop');//区分是否为工程项目还是虚拟项目等的id
    console.log("proId:====", proId);
    // 虚拟项目 id 为1，工程项目id为4
    console.log("form:", form);
    console.log("项目概况:", mstform2);
    var Toolbar = $NG.getCmpApi('toolbarEdit');
    //schemeid 翻新  待验证
    var schemeid = $NG.getQueryValue('schemeid');


});