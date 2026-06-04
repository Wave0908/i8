//1.入口函数
$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useBeforeOpen, addRow, useBeforeClick, useUpdateRows, useClick }
) {
    //TODO
    var mstform = $NG.getCmpApi("p_form_liangjintianbao_m");
    //var toolbar = $NG.getCmpApi("toolbar_top"); //表单布局不同，可能有差别，f12用选择器去看
    var dgrid = $NG.getCmpApi("p_form_liangjintianbao_d1");
    if (editPage.oType == "add") {
        //新增时，开始就隐藏
        mstform.getItem("u_qssj").setProps({
            required: false, //required是否必输
            hidden: true
        });
        mstform.getItem("u_sfyss").setProps({
            required: false, //required是否必输
            hidden: true
        });
        mstform.getItem("u_sswtms").setProps({
            required: false, //required是否必输
            hidden: true
        });
    }
    if (editPage.oType == "add" || editPage.oType == "edit") {
        //2.获取容器
        var allRows = [];
        var project_name = '';

        // if (mstform.getItem("u_sfxyss").getValue() == '1') {
        //     mstform.getItem("u_xyssyy").setProps({
        //         required: true, //required是否必输
        //         hidden: false
        //     });
        // } else {
        //     mstform.getItem("u_xyssyy").setProps({
        //         required: false, //required是否必输
        //         hidden: true
        //     });
        // }

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
        // useValuesChange(({ args, form }) => {
        //     console.log(args[0]);
        //     if (args[0].u_sfxyss.value == '1') {
        //         mstform.getItem("u_xyssyy").setProps({
        //             required: true, //required是否必输
        //             hidden: false
        //         });
        //     } else {
        //         mstform.getItem("u_xyssyy").setProps({
        //             required: false, //required是否必输
        //             hidden: true
        //         });
        //     }

        // }, "p_form_liangjintianbao_m.u_sfxyss");

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
            //清空明细
            dgrid.clearRows();
            //清空标题
            $NG.updateState((updater) => {
                updater.data.p_form_liangjintianbao_m.setProps({
                    bill_name: null,
                    u_tongjizhouqi: null
                });
            });
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
                        const u_sswtms1 = data[0].extendObjects.u_sswtms1;
                        const u_qssj = data[0].extendObjects.u_qssj;
                        const u_sfyss = data[0].extendObjects.u_sfyss;
                        const u_province = data[0].extendObjects.u_province;
                        const u_city = data[0].extendObjects.u_city;
                        const u_region = data[0].extendObjects.u_region;
                        const u_province_exname = data[0].extendObjects.u_province_exname;
                        const u_city_exname = data[0].extendObjects.u_city_exname;
                        const u_region_exname = data[0].extendObjects.u_region_exname;
                        const u_xmjc = data[0].extendObjects.u_xmjc;
                        var u_sfss = 0;
                        var sswtms = '';
                        if (ajxx) {
                            u_sfss = 1;
                            //是否诉讼，如果为是，诉讼是否需要诉讼和需要诉讼原因不能填报
                            // mstform.getItem("u_sfxyss").setProps({
                            //     required: false, //required是否必输
                            //     hidden: true
                            // });
                            mstform.getItem("u_qssj").setProps({
                                required: false, //required是否必输
                                hidden: false
                            });
                            mstform.getItem("u_sfyss").setProps({
                                required: false, //required是否必输
                                hidden: false
                            });
                            mstform.getItem("u_sswtms").setProps({
                                required: false, //required是否必输
                                hidden: false
                            });
                        } else {
                            // mstform.getItem("u_sfxyss").setProps({
                            //     required: true, //required是否必输
                            //     hidden: false
                            // });
                            mstform.getItem("u_qssj").setProps({
                                required: false, //required是否必输
                                hidden: true
                            });
                            mstform.getItem("u_sfyss").setProps({
                                required: false, //required是否必输
                                hidden: true
                            });
                            mstform.getItem("u_sswtms").setProps({
                                required: false, //required是否必输
                                hidden: true
                            });
                        }
                        if (u_sswtms) {
                            sswtms = u_sswtms;
                        } else {
                            sswtms = u_sswtms1;
                        }


                        $NG.updateState((updater) => {
                            updater.data.p_form_liangjintianbao_m.setProps({
                                u_xmkgrq: u_xmkgrq,
                                u_xmwgrq: u_xmwgrq,
                                u_xmzt: u_xmzt,
                                u_sfss: u_sfss,
                                u_sswtms: sswtms,
                                u_qssj: u_qssj,
                                u_sfyss: u_sfyss,
                                u_province: u_province,
                                u_city: u_city,
                                u_region: u_region,
                                u_province_EXName: u_province_exname,
                                u_city_EXName: u_city_exname,
                                u_region_EXName: u_region_exname,
                                u_xmjc: u_xmjc
                            });
                        });
                        //子表的信息
                        //更新子表的合同编号和合同名（一次性批量添加）
                        //赋值为0的字段，0是初始值，为了后续的计算，否则会报错
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
                                u_zjxj: 0,
                                u_jsxj: 0,
                                u_month2: 0,
                                u_month3_6: 0,
                                u_month7_12: 0,
                                u_year1_2: 0,
                                u_year2_3: 0,
                                u_year3up: 0,
                                u_ywwj1: 0,
                                u_ywwj1_2: 0,
                                u_ywwj2_3: 0,
                                u_ywwj3up: 0,
                                u_swch1: 0,
                                u_swch1_2: 0,
                                u_swch2_3: 0,
                                u_swch3up: 0,
                                u_sjysws: 0,
                                u_zbjje: 0,
                                u_sjyszk: 0,
                                u_ywwjch: 0,
                                u_swch: 0,
                                u_ljhj: 0,
                                u_byyszk: 0,
                                u_yzzzje: 0,
                                u_ljkd: 0,
                                u_ljhk: 0,
                                u_dyzqrzz: 0,
                                u_drzkd: 0,
                                u_jr: 0,
                                u_qt: 0,
                                u_sxswwbkd: 0,
                                u_wjqr: 0,
                                u_zlfk: 0,
                                u_qt1: 0

                            };
                            allRows.push(rowData);
                        }
                        if (allRows.length > 0) {
                            dgrid.addRows(allRows);
                            console.log("第一次添加子表数据:", allRows);
                            dgrid.refreshView();
                        }

                    } else {
                        $NG.updateState((updater) => {
                            updater.data.p_form_liangjintianbao_m.setProps({
                                u_xmkgrq: null,
                                u_xmwgrq: null,
                                u_xmzt: null,
                                u_sfss: null,
                                u_sswtms: null,
                                u_qssj: null,
                                u_sfyss: null,
                                u_province: null,
                                u_city: null,
                                u_region: null,
                                u_province_EXName: null,
                                u_city_EXName: null,
                                u_region_EXName: null,
                                u_xmjc: null
                            });
                        });
                        // mstform.getItem("u_sfxyss").setProps({
                        //     required: true, //required是否必输
                        //     hidden: false
                        // });

                        $NG.alert("该项目暂无信息");


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
        //查出上月数据
        useValuesChange(({ args, form }) => {
            dgrid.clearRows();

            dgrid.refreshView();
            console.log("dgrid.getRows():第二次", dgrid.getRows());

            console.log("=====args[0]:", args[0]);

            var pc = mstform.getItem('phid_pc').getValue();
            const zq = args[0].u_tongjizhouqi.value;
            console.log("zq:", zq);
            console.log("pc:", pc);
            if (zq) {
                $NG.execServer("ljhtmx", { pc: pc, zq: zq }, function (res) {
                    console.log("res:", res);

                    if (res.count > 0) {
                        const data1 = JSON.parse(res.data);
                        console.log("data:", data1);
                        if (allRows.length > 0) {
                            console.log("allRows===========", allRows);
                            dgrid.addRows(allRows);
                            console.log("重新添加子表数据 allRows:", allRows);
                            dgrid.refreshView();
                        }
                        if (data1.length > 0) {
                            for (let i = 0; i < data1.length; i++) {

                                var u_ljkd = data1[i].extendObjects.u_ljkd;
                                var u_ljhk = data1[i].extendObjects.u_ljhk;
                                var u_zjxj = data1[i].extendObjects.u_zjxj;
                                var u_jsxj = data1[i].extendObjects.u_jsxj;
                                var u_month2 = data1[0].extendObjects.u_month2;
                                var u_month3_6 = data1[i].extendObjects.u_month3_6;
                                var u_month7_12 = data1[i].extendObjects.u_month7_12;
                                var u_month13_24 = data1[i].extendObjects.u_month13_24;
                                var u_year1_2 = data1[i].extendObjects.u_year1_2;
                                var u_year2_3 = data1[i].extendObjects.u_year2_3;
                                var u_year3up = data1[i].extendObjects.u_year3up;
                                var u_sjyszkzl = data1[i].extendObjects.u_sjyszkzl;
                                var u_ywwj1 = data1[i].extendObjects.u_ywwj1;
                                var u_ywwj1_2 = data1[i].extendObjects.u_ywwj1_2;
                                var u_ywwj2_3 = data1[i].extendObjects.u_ywwj2_3;
                                var u_ywwj3up = data1[i].extendObjects.u_ywwj3up;
                                var u_swch1 = data1[i].extendObjects.u_swch1;
                                var u_swch1_2 = data1[i].extendObjects.u_swch1_2;
                                var u_swch2_3 = data1[i].extendObjects.u_swch2_3;
                                var u_swch3up = data1[i].extendObjects.u_swch3up;
                                var u_sjysws = data1[i].extendObjects.u_sjysws;
                                var u_sfzynb = data1[i].extendObjects.u_sfzynb;
                                // var u_yfksfaqsh = data1[i].extendObjects.u_yfksfaqsh;
                                // var u_wtms = data1[i].extendObjects.u_wtms;
                                // var u_sfyzlwtrwhk = data1[i].extendObjects.u_sfyzlwtrwhk;
                                // var u_zlwtms = data1[i].extendObjects.u_zlwtms;
                                // var u_zbjsfaqsh = data1[i].extendObjects.u_zbjsfaqsh;
                                // var u_zbjwtms = data1[i].extendObjects.u_zbjwtms;
                                // var u_sfylyywtrwhk = data1[i].extendObjects.u_sfylyywtrwhk;
                                // var u_lywtms = data1[i].extendObjects.u_lywtms;
                                var u_htbm = data1[i].extendObjects.u_htbm;
                                const rows = dgrid.getRows();
                                console.log("rows:", rows);


                                for (let k = 0; k < rows.length; k++) {
                                    if (rows[k]['u_htbm'] == u_htbm) {
                                        rows[k]['u_ljkd'] = u_ljkd;
                                        rows[k]['u_ljhk'] = u_ljhk;
                                        rows[k]['u_zjxj'] = u_zjxj;
                                        rows[k]['u_jsxj'] = u_jsxj;
                                        rows[i]['u_month2'] = u_month2;
                                        rows[k]['u_month3_6'] = u_month3_6;
                                        rows[k]['u_month7_12'] = u_month7_12;
                                        rows[k]['u_month13_24'] = u_month13_24;
                                        rows[k]['u_year1_2'] = u_year1_2;
                                        rows[k]['u_year2_3'] = u_year2_3;
                                        rows[i]['u_year3up'] = u_year3up;
                                        rows[k]['u_sjyszkzl'] = u_sjyszkzl;
                                        rows[k]['u_ywwj1'] = u_ywwj1;
                                        rows[k]['u_ywwj1_2'] = u_ywwj1_2;
                                        rows[k]['u_ywwj2_3'] = u_ywwj2_3;
                                        rows[k]['u_ywwj3up'] = u_ywwj3up;
                                        rows[k]['u_swch1'] = u_swch1;
                                        rows[k]['u_swch1_2'] = u_swch1_2;
                                        rows[k]['u_swch2_3'] = u_swch2_3;
                                        rows[k]['u_swch3up'] = u_swch3up;
                                        rows[k]['u_sjysws'] = u_sjysws;
                                        rows[k]['u_sfzynb'] = u_sfzynb;
                                        // rows[k]['u_yfksfaqsh'] = u_yfksfaqsh;
                                        // rows[k]['u_wtms'] = u_wtms;
                                        // rows[k]['u_sfyzlwtrwhk'] = u_sfyzlwtrwhk;
                                        // rows[k]['u_zlwtms'] = u_zlwtms;
                                        // rows[k]['u_zbjsfaqsh'] = u_zbjsfaqsh;
                                        // rows[i]['u_zbjwtms'] = u_zbjwtms;
                                        // rows[i]['u_sfylyywtrwhk'] = u_sfylyywtrwhk;
                                        // rows[i]['u_lywtms'] = u_lywtms;
                                    }
                                }
                                dgrid.refreshView();
                            }

                        }

                    } else {
                        if (allRows.length > 0) {
                            console.log("allRows===========", allRows);
                            dgrid.addRows(allRows);
                            console.log("重新添加子表数据 allRows:", allRows);
                            dgrid.refreshView();
                        }
                    }
                })
            }
        }, "p_form_liangjintianbao_m.u_tongjizhouqi");

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
            args[0].u_sfw2nyjs = 1;  //调用函数
        } else {
            args[0].u_sfw2nyjs = 0;  //调用函数
        }

        instance.updateRow(args[0]);
    }, 'p_form_liangjintianbao_d1.u_sjysws');
    useDataIndexChange(({ args, instance }) => {
        console.log("计算应收帐款中...")
        const u_month2 = args[0].u_month2;
        const u_month3_6 = args[0].u_month3_6;
        const u_month7_12 = args[0].u_month7_12;
        const u_year1_2 = args[0].u_year1_2;
        const u_year2_3 = args[0].u_year2_3;
        const u_year3up = args[0].u_year3up;
        console.log("应收账款2个月以内:", u_month2);
        console.log("应收账款3个月到6个月:", u_month3_6);
        console.log("应收账款7个月到12个月:", u_month7_12);
        console.log("应收账款1-2年:", u_year1_2);
        console.log("应收账款3-5年:", u_year2_3);
        console.log("应收账款5年以上:", u_year3up);
        console.log("u_month2 && u_month3_6 && u_month7_12 && u_year1_2 && u_year2_3 && u_year3up:", u_month2 && u_month3_6 && u_month7_12 && u_year1_2 && u_year2_3 && u_year3up);

        args[0].u_sjyszk = u_month2 + u_month3_6 + u_month7_12 + u_year1_2 + u_year2_3 + u_year3up;
        instance.updateRow(args[0]);

        console.log("计算两金合计中...")
        const u_sjyszk = args[0].u_sjyszk;
        const u_ywwjch = args[0].u_ywwjch;
        const u_swch = args[0].u_swch;
        console.log("应收帐款:", u_sjyszk);
        console.log("已完未结存货:", u_ywwjch);
        console.log("实物存货:", u_swch);
        console.log("u_sjyszk && u_ywwjch && u_swch:", u_sjyszk && u_ywwjch && u_swch);

        args[0].u_ljhj = u_sjyszk + u_ywwjch + u_swch;
        instance.updateRow(args[0]);

    }, ['p_form_liangjintianbao_d1.u_month2',
        'p_form_liangjintianbao_d1.u_month3_6',
        'p_form_liangjintianbao_d1.u_month7_12',
        'p_form_liangjintianbao_d1.u_year1_2',
        'p_form_liangjintianbao_d1.u_year2_3',
        'p_form_liangjintianbao_d1.u_year3up']);
    useDataIndexChange(({ args, instance }) => {
        console.log("计算已完未结存货中...")
        const u_ywwj1 = args[0].u_ywwj1;
        const u_ywwj1_2 = args[0].u_ywwj1_2;
        const u_ywwj2_3 = args[0].u_ywwj2_3;
        const u_ywwj3up = args[0].u_ywwj3up;

        args[0].u_ywwjch = u_ywwj1 + u_ywwj1_2 + u_ywwj2_3 + u_ywwj3up;
        instance.updateRow(args[0]);

        console.log("计算两金合计中...")
        const u_sjyszk = args[0].u_sjyszk;
        const u_ywwjch = args[0].u_ywwjch;
        const u_swch = args[0].u_swch;

        args[0].u_ljhj = u_sjyszk + u_ywwjch + u_swch;
        instance.updateRow(args[0]);

    }, ['p_form_liangjintianbao_d1.u_ywwj1',
        'p_form_liangjintianbao_d1.u_ywwj1_2',
        'p_form_liangjintianbao_d1.u_ywwj2_3',
        'p_form_liangjintianbao_d1.u_ywwj3up']);
    useDataIndexChange(({ args, instance }) => {
        console.log("计算实物存货中...")
        const u_swch1 = args[0].u_swch1;
        const u_swch2_3 = args[0].u_swch2_3;
        const u_swch3up = args[0].u_swch3up;
        const u_swch1_2 = args[0].u_swch1_2;

        args[0].u_swch = u_swch1 + u_swch2_3 + u_swch3up + u_swch1_2;
        instance.updateRow(args[0]);

        console.log("计算两金合计中...")
        const u_sjyszk = args[0].u_sjyszk;
        const u_ywwjch = args[0].u_ywwjch;
        const u_swch = args[0].u_swch;

        args[0].u_ljhj = u_sjyszk + u_ywwjch + u_swch;
        instance.updateRow(args[0]);

    }, ['p_form_liangjintianbao_d1.u_swch1',
        'p_form_liangjintianbao_d1.u_swch2_3',
        'p_form_liangjintianbao_d1.u_swch3up',
        'p_form_liangjintianbao_d1.u_swch1_2']);
    // useDataIndexChange(({ args, instance }) => {
    // console.log("计算两金合计中...")
    // const u_sjyszk = args[0].u_sjyszk;
    // const u_ywwjch = args[0].u_ywwjch;
    // const u_swch = args[0].u_swch;
    // if (u_sjyszk && u_ywwjch && u_swch) {
    //     args[0].u_ljhj = u_sjyszk + u_ywwjch + u_swch;
    //     instance.updateRow(args[0]);
    // }
    // }, ['p_form_liangjintianbao_d1.u_sjyszk',
    //     'p_form_liangjintianbao_d1.u_ywwjch',
    //     'p_form_liangjintianbao_d1.u_swch']);
    useDataIndexChange(({ args, instance }) => {
        console.log("计算回款比例中...")
        const u_ljhk = args[0].u_ljhk;
        const u_ljkd = args[0].u_ljkd;

        args[0].u_sjhkbl = u_ljhk / u_ljkd;
        instance.updateRow(args[0]);

    }, ['p_form_liangjintianbao_d1.u_ljhk',
        'p_form_liangjintianbao_d1.u_ljkd']);
        
    //2025.10.22  其中：已做债转金额的控制取消

    // useDataIndexChange(({ args, instance }) => {
    //     console.log("已做债转金额...")
    //     var u_yzzzje = args[0].u_yzzzje;
    //     var u_byyszk = args[0].u_byyszk;
    //     if (!u_byyszk) {
    //         $NG.alert('请先填写应收账款！');
    //         args[0].u_yzzzje = 0;
    //         return false;
    //     } else if (u_yzzzje > u_byyszk) {
    //         $NG.alert('已做债转金额不能大于应收账款！');
    //         args[0].u_yzzzje = 0;
    //         return false;
    //     }
    //     instance.updateRow(args[0]);

    // }, 'p_form_liangjintianbao_d1.u_yzzzje');
    useDataIndexChange(({ args, instance }) => {
        console.log("计算增加小计中...")
        const u_dyzqrzz = args[0].u_dyzqrzz;
        const u_drzkd = args[0].u_drzkd;
        const u_jr = args[0].u_jr;
        const u_qt = args[0].u_qt;

        args[0].u_zjxj = u_dyzqrzz + u_drzkd + u_jr + u_qt;
        instance.updateRow(args[0]);
    }, ['p_form_liangjintianbao_d1.u_dyzqrzz',
        'p_form_liangjintianbao_d1.u_drzkd',
        'p_form_liangjintianbao_d1.u_jr',
        'p_form_liangjintianbao_d1.u_qt']);
    useDataIndexChange(({ args, instance }) => {
        console.log("计算减少小计中...")
        const u_sxswwbkd = args[0].u_sxswwbkd;
        const u_wjqr = args[0].u_wjqr;
        const u_zlfk = args[0].u_zlfk;
        const u_qt1 = args[0].u_qt1;

        args[0].u_jsxj = u_sxswwbkd + u_wjqr + u_zlfk + u_qt1;
        instance.updateRow(args[0]);
    }, ['p_form_liangjintianbao_d1.u_sxswwbkd',
        'p_form_liangjintianbao_d1.u_wjqr',
        'p_form_liangjintianbao_d1.u_zlfk',
        'p_form_liangjintianbao_d1.u_qt1']);


});