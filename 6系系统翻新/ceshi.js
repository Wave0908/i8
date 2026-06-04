$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useBeforeOpen, useUpdateRows, useClick, useBeforeClick }
) {
    var mstform = $NG.getCmpApi('SceneVisaManage');
    console.log("ready!",mstform);
    useValuesChange(({ args, form }) => {
        console.log("PhidPc=========", mstform.getItem('PhidPc').getValue());

    }, "SceneVisaManage.PhidPc");
})