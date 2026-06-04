$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useBeforeClick, DataIndexChange, useUpdateRows, useClick }
) {
    //TODO
    var mstform = $NG.getCmpApi("grid");
    useBeforeClick(async function ({ args }) {
        console.log("点击了adjust");
        console.log("args:", args);
        console.log('mstform:', mstform);
        const row = mstform.getSelectedRow();
        console.log('row:', row);
        const AppStatus = row.AppStatus;
        console.log(AppStatus);
        if (AppStatus != 0) {
            $NG.alert("已送审的单据无法调整");
            return false;
        }
    }, "adjust");
    useBeforeClick(async function ({ args }) {
        console.log("点击了modifyDoc");
        console.log("args:", args);
        console.log('mstform:', mstform);
        const row = mstform.getSelectedRow();
        console.log('row:', row);
        const AppStatus = row.AppStatus;
        console.log(AppStatus);
        if (AppStatus != 0) {
            $NG.alert("已送审的单据无法文档更新");
            return false;
        }
    }, "modifyDoc");
});