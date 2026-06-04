//1.入口函数
$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useBeforeOpen, addRow, useBeforeClick, useUpdateRows, useClick }
) {
    //TODO

    if (editPage.oType == "add" || editPage.oType == "edit") {
        //2.获取容器
        var mstform = $NG.getCmpApi("p_form_liangjintianbao_m");
        //var toolbar = $NG.getCmpApi("toolbar_top"); //表单布局不同，可能有差别，f12用选择器去看
        var dgrid = $NG.getCmpApi("p_form_liangjintianbao_d1");
        var project_name = '';

        //合同编号和合同名的功能扩展ljsrht

        var currentDate = new Date();
        var formattedDate = currentDate.getFullYear() + '-' +
            String(currentDate.getMonth() + 1).padStart(2, '0') + '-' +
            String(currentDate.getDate()).padStart(2, '0');

        console.log("formattedDate:", formattedDate);
        $NG.updateUI(function (updater, state) {
            console.log('updater:', updater);
            console.log('state:', state);

            updater.fieldSetForm.p_form_liangjintianbao_m.u_tongjizhouqi.setProps({
                clientSqlFilter: (`ctype = 'GCMONTH'  AND bdt <= '${formattedDate}'`),	//根据
                placeholder: ``
            });
        });

        //console.log("ready!");
        //useBeforeOpen(({ args, form }) => {
        if (mstform.getItem("phid_org").getValue() == "" || mstform.getItem("phid_org").getValue() == null) {
            $NG.alert("请先填写所属组织");
            return false;
        } else {
            console.log('mstform.getItem("phid_org").getValue():', mstform.getItem("phid_org").getValue());

            $NG.updateUI(function (updater, state) {
                console.log("updater:", updater);
                updater.fieldSetForm.p_form_liangjintianbao_m.phid_pc.setProps({
                    clientSqlFilter: ("phid_org = '" + mstform.getItem("phid_org").getValue() + "'"),	//根据
                    placeholder: ``
                });
            });
        }


        // mstform.setConfig({
        //     phid_pc: {
        //         clientSqlFilter: { phid_org: mstform.getItem("phid_org").getValue() },
        //         placeholder: `按所属组织过滤`,
        //         required: true,
        //     },
        // });
        // }, "project_table_pchelp");



        useValuesChange(({ args, form }) => {

            console.log(args[0]);
            //const phid_pc = args[0].pc.PhId;
            const phid_pc = args[0].phid_pc.value;
            //从项目取值
            if (phid_pc) {
                console.log('phid_pc:', phid_pc);
                //从项目取值
                //ljsrht
                $NG.execServer("ljht", { pc: phid_pc }, function (res) {
                    console.log("res:", res);
                    if (res.count > 0) {
                        const data = JSON.parse(res.data);
                        console.log("data:", data)
                        project_name = data[0].extendObjects.project_name;
                        //主表的信息
                        const u_xmkgrq = data[0].extendObjects.fact_start_dt;
                        const u_xmwgrq = data[0].extendObjects.fact_end_dt;
                        const u_xmzt = data[0].extendObjects.u_xmzt;
                        const ajxx = data[0].extendObjects.ajxx;
                        const u_sswtms = data[0].extendObjects.u_sswtms;
                        const u_qssj = data[0].extendObjects.u_qssj;
                        var u_sfss = 0;
                        if (ajxx) {
                            u_sfss = 1;
                        }
                        //项目公司、投资概算
                        $NG.updateState((updater) => {
                            updater.data.p_form_liangjintianbao_m.setProps({
                                u_xmkgrq: u_xmkgrq,
                                u_xmwgrq: u_xmwgrq,
                                u_xmzt: u_xmzt,
                                u_sfss: u_sfss,
                                u_sswtms: u_sswtms,
                                u_qssj: u_qssj,
                            });
                        });
                        //子表的信息
                        //更新子表的合同编号和合同名（一次性批量添加）
                        const allRows = [];
                        for (let i = 0; i < data.length; i++) {
                            const ex = data[i].extendObjects || {};
                            const rowData = {
                                u_htbm: ex.u_htbm,
                                u_htmc: ex.u_htmc,
                                u_htmc_EXName: ex.u_htmc_exname,
                                ng_phid_org: ex.ng_phid_org,
                                ng_phid_org_EXName: ex.ng_phid_org_exname,
                                u_hte: ex.u_hte,
                                u_hthkbl: ex.u_hthkbl,
                                u_zbjbl: ex.u_zbjbl,
                                u_zbjje: ex.u_zbjje,
                                u_zwdwmc: ex.u_zwdwmc,
                                u_zwdwmc_EXName: ex.u_zwdwmc_exname,
                                u_sfeseynb: ex.fromtype == 'org' ? 1 : 0,
                            };
                            allRows.push(rowData);
                        }
                        if (allRows.length > 0) {
                            dgrid.addRows(allRows);
                            dgrid.refreshView();
                        }
                    }
                });


                var selectedProject = mstform.getItem('phid_pc').getValue();

                /**监听项目选择后过滤统计周期 */
                // u_tjzq.setClientSqlFilter(
                `ctype = 'GCMONTH' 
                    AND bdt <= '${formattedDate}' 
                    AND phid NOT IN (
                    SELECT u_tjzq FROM p_form0000700750_m 
                    WHERE phid_pc = '${selectedProject}')`
                // );
                $NG.updateUI(function (updater, state) {
                    console.log('updater:', updater);
                    console.log('state:', state);

                    updater.fieldSetForm.p_form_liangjintianbao_m.u_tongjizhouqi.setProps({
                        clientSqlFilter: (`ctype = 'GCMONTH' 
                    AND bdt <= '${formattedDate}' 
                    AND phid NOT IN (
                    SELECT u_tongjizhouqi FROM p_form_liangjintianbao_m 
                    WHERE phid_pc = '${selectedProject}')`),	//根据
                        placeholder: ``
                    });
                });
            }
        }, "p_form_liangjintianbao_m.phid_pc");
        useBeforeOpen(async function ({ args }) {
            console.log("监听u_tongjizhouqi");
            if (mstform.getItem("phid_org").getValue() == "" || mstform.getItem("phid_org").getValue() == null) {
                $NG.alert("请先填写所属组织");
                return false;
            }
            if (mstform.getItem("phid_pc").getValue() == "" || mstform.getItem("phid_pc").getValue() == null) {
                $NG.alert("请先填写项目");
                return false;
            }
        }, "WorkCycle");
        useValuesChange(({ args, form }) => {
            console.log(args[0]);
            const zq = args[0].u_tongjizhouqi.label;
            console.log("args[0].u_tongjizhouqi.label:", args[0].u_tongjizhouqi.label);

            $NG.updateState((updater) => {
                updater.data.p_form_liangjintianbao_m.setProps({
                    bill_name: project_name + "-" + zq
                });
            });


        }, "p_form_liangjintianbao_m.u_tongjizhouqi");

        useDataIndexChange(({ args, instance }) => {
            //    console.log('u_sbfw:', u_sbfw);
            const wgrq = mstform.getItem("u_xmwgrq").getValue();
            const xmzt = mstform.getItem("u_xmzt").getValue();
            const sjysws = args[0].u_sjysws;

            // 解析 YYYY-MM-DD 为 Date，并在完工日期基础上加两年
            const parseYMD = (s) => {
                if (!s || typeof s !== 'string') return null;
                const parts = s.split('-');
                if (parts.length !== 3) return null;
                const y = parseInt(parts[0], 10);
                const m = parseInt(parts[1], 10);
                const d = parseInt(parts[2], 10);
                if (Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) return null;
                return new Date(y, m - 1, d);
            };
            const wgrqDate = parseYMD(wgrq);
            const wgrqPlus2 = wgrqDate ? new Date(wgrqDate) : null;
            if (wgrqPlus2) {
                wgrqPlus2.setFullYear(wgrqPlus2.getFullYear() + 2);
            }

            const fmt = (d) => d ? (d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0')) : d;

            console.log("formattedDate:", formattedDate);
            console.log("wgrq:", wgrq);
            console.log("wgrq + 2 years:", fmt(wgrqPlus2));
            console.log("currentDate >= wgrq + 2 years:", wgrqPlus2 ? (currentDate >= wgrqPlus2) : false);

            if (wgrqPlus2 && currentDate >= wgrqPlus2 && sjysws && (xmzt == '完工未竣工' || xmzt == '竣工未结算')) {
                args[0].u_sfw2nwjs = 1;  //调用函数
            } else {
                args[0].u_sfw2nwjs = 0;  //调用函数
            }
            if (wgrqPlus2 && currentDate >= wgrqPlus2 && sjysws && xmzt == '竣工已结算') {
                args[0].u_sfw2nyjs = 1;  //调用函数
            } else {
                args[0].u_sfw2nyjs = 0;  //调用函数
            }

            instance.updateRow(args[0]);
        }, 'p_form_liangjintianbao_d1.u_sjysws');
        useDataIndexChange(({ args, instance }) => {
            console.log("计算两金合计中...")
            const u_sjyszk = args[0].u_sjyszk;
            const u_ywwjch = args[0].u_ywwjch;
            const u_swch = args[0].u_swch;
            if (u_sjyszk && u_ywwjch && u_swch) {
                args[0].u_ljhj = u_sjyszk + u_ywwjch + u_swch;
                instance.updateRow(args[0]);
            }
        }, ['p_form_liangjintianbao_d1.u_sjyszk',
            'p_form_liangjintianbao_d1.u_ywwjch',
            'p_form_liangjintianbao_d1.u_swch']);
        useDataIndexChange(({ args, instance }) => {
            console.log("计算回款比例中...")
            const u_ljhk = args[0].u_ljhk;
            const u_ljkd = args[0].u_ljkd;
            if (u_ljhk && u_ljkd) {
                args[0].u_sjhkbl = u_ljhk / u_ljkd;
                instance.updateRow(args[0]);
            }
        }, ['p_form_liangjintianbao_d1.u_ljhk',
            'p_form_liangjintianbao_d1.u_ljkd']);

    }

});