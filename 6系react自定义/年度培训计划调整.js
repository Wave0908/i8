$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useBeforeOpen, useDataIndexChange, useUpdateRows, useClick }
) {
    //TODO
    var mstform = $NG.getCmpApi("p_form_ndpxjhchange_m");
    var dgrid = $NG.getCmpApi("p_form_ndpxjhchange_d1");
    useBeforeOpen(async function ({ args }) {
        console.log("===");
        if (mstform.getItem("u_pxnd").getValue() == null || mstform.getItem("u_pxlb").getValue() == null) {
            $NG.alert("请先选择培训年度和培训类别");
            return false;
        } else {
            $NG.updateUI(function (updater, state) {
                console.log('updater:', updater);
                console.log('state:', state);
                var u_pxnd = mstform.getItem("u_pxnd").getValue();
                var u_pxlb = mstform.getItem("u_pxlb").getValue();
                var phid_fill_psn = mstform.getItem("phid_fill_psn").getValue();
                console.log("u_pxnd:", u_pxnd);
                console.log("u_pxlb:", u_pxlb);
                console.log("phid_fill_psn:", phid_fill_psn);

                updater.fieldSetForm.p_form_ndpxjhchange_m.u_pxjhmc.setProps({
                    clientSqlFilter: (` p_form0000000084_d.phid IS NOT NULL
                    and pxlb = '${u_pxlb}'
                    and jhnd = '${u_pxnd}'
                    and phid_fill_psn = '${phid_fill_psn}'
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
        }
    }, "pxjhmc");
    if (editPage.oType == "add" || editPage.oType == "edit") {
        useValuesChange(({ args, form }) => {
            //清空明细
            var u_pxjhmc = mstform.getItem("u_pxjhmc").getValue();
            mstform.getItem('u_pxjhmc').setReadOnly(true);
            mstform.getItem('u_pxnd').setReadOnly(true);
            mstform.getItem('u_pxlb').setReadOnly(true);
            console.log('u_pxjhmc:', u_pxjhmc);
            if (u_pxjhmc) {
                //ljsrht
                $NG.execServer("ndpxjhtz", { phid: u_pxjhmc }, function (res) {
                    console.log("res:", res);
                    var allRows = [];
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
                            dgrid.clearRows().then(() => {
                                dgrid.addRows(allRows);
                            })
                            console.log("第一次添加子表数据:", allRows);
                            dgrid.refreshView();
                            console.log("dgrid:", dgrid);
                        }
                    } else {
                        $NG.alert("该项目暂无信息或已培训");
                    }
                });
            }
        }, "p_form_ndpxjhchange_m.u_pxjhmc");

    }
})