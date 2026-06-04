//1.入口函数
$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useBeforeOpen, addRow, useBeforeClick, useUpdateRows, useClick }
) {
    //TODO
    var mstform = $NG.getCmpApi("p_form_xmhtkdbl_m");
    //var toolbar = $NG.getCmpApi("toolbar_top"); //表单布局不同，可能有差别，f12用选择器去看
    var dgrid = $NG.getCmpApi("p_form_xmhtkdbl_d1");
    if (editPage.oType == "add" || editPage.oType == "edit") {
        useBeforeOpen(async function ({ args }) {
            console.log("监听ht");
            if (mstform.getItem("phid_pc").getValue() == "" || mstform.getItem("phid_pc").getValue() == null) {
                $NG.alert("请先填写项目");
                return false;
            } else {
                const phid_pc = mstform.getItem("phid_pc").getValue();
                //从项目取值
                if (phid_pc) {
                    $NG.updateUI(function (updater, state) {
                        console.log('updater:', updater);
                        console.log('state:', state);
                        updater.fieldSetForm.p_form_xmhtkdbl_m.u_ht.setProps({
                            clientSqlFilter: (`phid_pc = '${phid_pc}'`),	//根据项目取值
                            placeholder: ``
                        });
                    });
                }
            }
        }, "ljtb_ht");

        useValuesChange(({ args, form }) => {

            console.log(args[0]);
            //const phid_pc = args[0].pc.PhId;
            const u_ht = args[0].u_ht.value;
            $NG.execServer("xmhtkdblb", { cnt: u_ht }, function (res) {
                console.log("res:", res);
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log("data:", data)
                    for (let i = 0; i < data.length; i++) {
                        const phid = data[i].extendObjects.phid;
                        dgrid.addRows([
                            { u_lyzj: phid }
                        ]);
                    }
                    dgrid.refreshView();
                }
            });


        }, "p_form_xmhtkdbl_m.u_ht");





    }
});