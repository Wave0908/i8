$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick }
) {
    //TODO
    var mstform = $NG.getCmpApi("p_form_ndpxjhchange_m");
    var dgrid = $NG.getCmpApi("p_form_ndpxjhchange_d1");
    $NG.updateUI(function (updater, state) {
        console.log('updater:', updater);
        console.log('state:', state);

        updater.fieldSetForm.p_form_ndpxjhchange_m.u_pxjhmc.setProps({
            clientSqlFilter: (` p_form0000000084_d.phid IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM p_form0000000088_m x
    WHERE x.pxxmmc = p_form0000000084_d.phid
  )
  AND NOT EXISTS (
    SELECT 1 FROM p_form0000000096_m pfm
    WHERE pfm.train_project = p_form0000000084_d.phid
  )
  AND NOT EXISTS (
    SELECT 1
    FROM p_form0000000084_d d2
    WHERE d2.pphid = p_form0000000084_m.phid
      AND d2.phid IS NOT NULL
      AND NOT EXISTS (SELECT 1 FROM p_form0000000088_m x WHERE x.pxxmmc = d2.phid)
      AND NOT EXISTS (SELECT 1 FROM p_form0000000096_m pfm WHERE pfm.train_project = d2.phid)
      AND d2.phid < p_form0000000084_d.phid
  )`),	//根据
            placeholder: ``
        });
    });
    if (editPage.oType == "add" || editPage.oType == "edit") {
        var allRows = [];
        useValuesChange(({ args, form }) => {
            //清空明细
            dgrid.clearRows();
            var u_pxjhmc = mstform.getItem("u_pxjhmc").getValue();
            console.log('u_pxjhmc:', u_pxjhmc);
            if (u_pxjhmc) {
                //ljsrht
                $NG.execServer("ndpxjhtz", { phid: u_pxjhmc }, function (res) {
                    console.log("res:", res);
                    if (res.count > 0) {
                        const data = JSON.parse(res.data);
                        console.log("data:", data)
                        //子表的信息
                        for (let i = 0; i < data.length; i++) {
                            const ex = data[i].extendObjects || {};
                            const rowData = {
                                u_zj: ex.dphid,
                                u_lb: ex.u_lb,
                                u_lb_EXName: ex.u_lb_exname,
                                u_pxxmlx: ex.u_pxxmlx,
                                u_pxxmmc: ex.u_pxxmmc,
                                ng_phid_org: ex.ng_phid_org,
                                u_fzr: ex.u_fzr,
                                u_fzr_EXName: ex.u_fzr_exname,
                                u_pxmb: ex.u_pxmb,
                                u_pxrs: ex.u_pxrs,
                                u_yjksrq: ex.u_yjksrq,
                                u_yjjsrq: ex.u_yjjsrq,
                                u_fyys: ex.u_fyys,
                                u_pxxs: ex.u_pxxs,
                                u_xxfs: ex.u_xxfs
                            };
                            allRows.push(rowData);
                        }
                        if (allRows.length > 0) {
                            dgrid.addRows(allRows);
                            console.log("第一次添加子表数据:", allRows);
                            dgrid.refreshView();
                            console.log("dgrid:",dgrid);
                        }
                    } else {
                        $NG.alert("该项目暂无信息或已培训");
                    }
                });
            }
        }, "p_form_ndpxjhchange_m.u_pxjhmc");
        
    }
})