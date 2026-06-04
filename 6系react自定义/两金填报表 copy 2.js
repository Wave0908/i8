//1.入口函数
$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useBeforeOpen, useBeforeClick, useUpdateRows, useClick }
) {
    //TODO
    //2.获取容器
    var mstform = $NG.getCmpApi("p_form_liangjintianbao_m");
    //var toolbar = $NG.getCmpApi("toolbar_top"); //表单布局不同，可能有差别，f12用选择器去看
    var dgrid = $NG.getCmpApi("p_form_liangjintianbao_d1");

    //合同编号和合同名的功能扩展ljsrht

    var u_tongjizhouqi = mstform.getItem("u_tongjizhouqi").getValue();
    var u_xmzt = mstform.getItem("u_xmzt").getValue();

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


    useValuesChange(({ args, form }) => {
        if (mstform.getItem("phid_org").getValue() == "" || mstform.getItem("phid_org").getValue() == null) {
            $NG.alert("请先填写所属组织");
            return false;
        }
        console.log(args[0]);
        //const phid_pc = args[0].pc.PhId;
        const phid_pc = args[0].phid_pc.value;
        //从项目取值
        if (phid_pc) {
            console.log(phid_pc);
            //从项目取值
            $NG.execServer("ljtbsjrq", { pc: phid_pc }, function (res) {
                console.log("res:", res);
                const data = JSON.parse(res.data);
                const u_xmkgrq = data[0].extendObjects.fact_start_dt;
                const u_xmwgrq = data[0].extendObjects.fact_end_dt;
                const u_xmzt = data[0].extendObjects.u_xmzt;
                //项目公司、投资概算
                $NG.updateState((updater) => {
                    updater.data.p_form_liangjintianbao_m.setProps({
                        u_xmkgrq: u_xmkgrq,
                        u_xmwgrq: u_xmwgrq,
                        u_xmzt: u_xmzt
                    });
                });
            });
            $NG.execServer("sfajxxlrxm", { pc: phid_pc }, function (res) {
                console.log("res:", res);
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (data1.length > 0) {
                    $NG.updateState((updater) => {
                        updater.grid.p_form_liangjintianbao_d.setProps({
                            u_sfss: 1
                        });
                    });
                } else {
                    $NG.updateState((updater) => {
                        updater.grid.p_form_liangjintianbao_d.setProps({
                            u_sfss: 0
                        });
                    });
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

    useDataIndexChange(({ args, instance }) => {
        useUpdateRows(({ args }) => {
            const rows = args[0];
            console.log('rows:', rows);
            args[0].forEach((item) => {
                computed(item);  //调用函数
            });
            dgrid.refreshView();
        }, "p_form_liangjintianbao_d1");
    }, "p_form_liangjintianbao_d1.u_htmc");

    function computed(item) {
        $NG.execServer("ljtbmxsj", { phid: item.u_htmc },//功能扩展
            function (res) {
                try {
                    const datas = JSON.parse(res.data)[0].extendObjects;
                    console.log("computed datas:", datas);
                    item.u_zwdwmc = datas.u_zwdwmc;
                    item.u_zwdwmc_EXName = datas.u_zwdwmc_exname;
                    item.ng_phid_org = datas.ng_phid_org;
                    item.ng_phid_org_EXName = datas.ng_phid_org_exname;
                    item.u_hte = datas.u_hte;
                    item.u_hthkbl = datas.u_hthkbl;
                    item.u_zbjbl = datas.u_zbjbl;
                    item.u_zbjje = datas.u_zbjje;
                    if (datas.fromtype == "org") {
                        item.u_sfeseynb = 1;
                    } else {
                        item.u_sfeseynb = 0;
                    }
                    dgrid.refreshView();
                } catch (error) { }
            }
        );
    }
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
            args[0].u_sfw2nwjs = 1;  //调用函数
        } else {
            args[0].u_sfw2nwjs = 0;  //调用函数
        }

        instance.updateRow(args[0]);
    }, 'p_form_liangjintianbao_d1.u_sjysws');



});