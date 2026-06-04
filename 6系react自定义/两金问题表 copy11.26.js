//1.入口函数
$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useBeforeOpen, addRow, useBeforeClick, useUpdateRows, useClick }
) {
    //TODO
    var mstform = $NG.getCmpApi("p_form_liangjinxiangmuwen_m");
    //var toolbar = $NG.getCmpApi("toolbar_top"); //表单布局不同，可能有差别，f12用选择器去看
    if (editPage.oType == "add" || editPage.oType == "edit") {
        //新增时，开始就隐藏
        useValuesChange(({ args, form }) => {
            console.log(args[0]);
            const u_ljxm = args[0].u_ljxm.value;
            //从项目取值
            if (u_ljxm) {
                console.log('u_ljxm:', u_ljxm);
                //从项目取值
                //ljsrht
                $NG.execServer("liangjinxiangmu", { phid: u_ljxm }, function (res) {
                    console.log("res:", res);
                    if (res.count > 0) {
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        console.log("data:", data)
                        const phid_pc = data[0].extendObjects.phid_pc;
                        const phid_pc_exname = data[0].extendObjects.phid_pc_exname;
                        const u_tongjizhouqi = data[0].extendObjects.u_tongjizhouqi;
                        const u_tongjizhouqi_exname = data[0].extendObjects.u_tongjizhouqi_exname;
                        $NG.updateState((updater) => {
                            updater.data.p_form_liangjinxiangmuwen_m.setProps({
                                phid_pc: phid_pc,
                                phid_pc_EXName: phid_pc_exname,
                                u_tongjizhouqi: u_tongjizhouqi,
                                u_tongjizhouqi_EXName: u_tongjizhouqi_exname
                            });
                        });
                    }
                });
            }
        }, "p_form_liangjinxiangmuwen_m.u_ljxm");
    }
});