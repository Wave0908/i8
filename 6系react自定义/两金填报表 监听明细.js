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



    var u_tongjizhouqi = mstform.getItem("u_tongjizhouqi").getValue();
    var u_xmzt = mstform.getItem("u_xmzt").getValue();

    var currentDate = new Date();
    var formattedDate = currentDate.getFullYear() + '-' +
        String(currentDate.getMonth() + 1).padStart(2, '0') + '-' +
        String(currentDate.getDate()).padStart(2, '0');

    /**统计周期过滤(只能选当前月以及之前月份的) */
    // u_tongjizhouqi.setClientSqlFilter(
    //     `ctype = 'GCMONTH' 
    //     AND bdt <= '${formattedDate}'`
    // );
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
                //项目公司、投资概算
                $NG.updateState((updater) => {
                    updater.data.p_form_liangjintianbao_m.setProps({
                        u_xmkgrq: u_xmkgrq,
                        u_xmwgrq: u_xmwgrq,
                    });
                });
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
        console.log("useDataIndexChange args[0]:", args[0]);
        const u_htmc = args[0].u_htmc;
        console.log("u_htmc:", u_htmc);
        //从项目取值
        if (u_htmc) {
            $NG.execServer("ljtbmxsj", {
                phid: u_htmc
            }, function (res) {
                console.log("res:",res);
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log("data[0].extendObjects:" ,data[0].extendObjects);
                const u_zwdwmc = data[0].extendObjects.u_zwdwmc;
                console.log("u_zwdwmc:", u_zwdwmc);
                const u_zwdwmc_exname = data[0].extendObjects.u_zwdwmc_exname;
                console.log("u_zwdwmc_exname:", u_zwdwmc_exname);
                const ng_phid_org = data[0].extendObjects.ng_phid_org;
                console.log("ng_phid_org:", ng_phid_org);
                const ng_phid_org_exname = data[0].extendObjects.ng_phid_org_exname;
                console.log("ng_phid_org_exname:", ng_phid_org_exname);
                const u_hte = data[0].extendObjects.u_hte;
                console.log("u_hte:", u_hte);
                const u_hthkbl = data[0].extendObjects.u_hthkbl;
                console.log("u_hthkbl:", u_hthkbl);
                const u_zbjbl = data[0].extendObjects.u_zbjbl;
                console.log("u_zbjbl:", u_zbjbl);
                const u_zbjje = data[0].extendObjects.u_zbjje;
                console.log("u_zbjje:", u_zbjje);   
                //项目公司、投资概算
                $NG.updateState((updater) => {  
                    console.log("p_form_liangjintianbao_d1 updater:", updater);
                    updater.grid.p_form_liangjintianbao_d1.setProps({
                        u_zwdwmc: u_zwdwmc,
                        u_zwdwmc_exname: u_zwdwmc_exname,
                        ng_phid_org: ng_phid_org,
                        ng_phid_org_exname: ng_phid_org_exname,
                        u_hte: u_hte,
                        u_hthkbl: u_hthkbl,
                        u_zbjbl: u_zbjbl,
                        u_zbjje: u_zbjje,
                    });
                });
                dgrid.refreshView();
            });
        }

    }, "p_form_liangjintianbao_d1.u_htmc");






});