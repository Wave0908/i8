//1.入口函数
$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useBeforeOpen, addRow, useBeforeClick, useUpdateRows, useClick }
) {
    //TODO
    console.log("ready!");
    var mstform = $NG.getCmpApi("p_form_liangjintianbao_m");
    //var toolbar = $NG.getCmpApi("toolbar_top"); //表单布局不同，可能有差别，f12用选择器去看
    var dgrid = $NG.getCmpApi("p_form_liangjintianbao_d1");
    if (editPage.oType == "add") {
        //新增时，开始就隐藏
        mstform.getItem("phid_pc").setProps({
            required: false, //required是否必输
            hidden: true
        });
        mstform.getItem("u_gcxm").setProps({
            required: false, //required是否必输
            hidden: true
        });
        $NG.updateUI(function (updater, state) {
            updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_htmc': { hidden: true } });
            updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_htmc1': { hidden: true } });
        })
    }
    if (editPage.oType == "view" || editPage.oType == "edit") {
        //查看时，开始就隐藏
        if (mstform.getItem("u_sfczxm").getValue() == '01') {
            mstform.getItem("phid_pc").setProps({
                required: true, //required是否必输
                hidden: false
            });
            mstform.getItem("u_gcxm").setProps({
                required: false, //required是否必输
                hidden: true
            });
            $NG.updateUI(function (updater, state) {
                updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_htmc': { hidden: false } });
                updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_htmc1': { hidden: true } });
            })
        } else if (mstform.getItem("u_sfczxm").getValue() == '02') {
            mstform.getItem("phid_pc").setProps({
                required: false, //required是否必输
                hidden: true
            });
            mstform.getItem("u_gcxm").setProps({
                required: true, //required是否必输
                hidden: false
            });
            $NG.updateUI(function (updater, state) {
                updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_htmc': { hidden: true } });
                updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_htmc1': { hidden: false } });
            })
        } else {
            mstform.getItem("phid_pc").setProps({
                required: false, //required是否必输
                hidden: true
            });
            mstform.getItem("u_gcxm").setProps({
                required: false, //required是否必输
                hidden: true
            });
            $NG.updateUI(function (updater, state) {
                updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_htmc': { hidden: true } });
                updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_htmc1': { hidden: true } });
            })
        }

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

        //该项目是否已在i8系统立项
        useValuesChange(async ({ args, form }) => {

            mstform.getItem('u_sfczxm').setReadOnly(true);
            if (args[0].u_sfczxm.value == '01') {
                dgrid.clearRows();
                //主表字段必填
                mstform.getItem("phid_pc").setProps({
                    required: true, //required是否必输
                    hidden: false
                });
                mstform.getItem("u_gcxm").setProps({
                    required: false, //required是否必输
                    hidden: true
                });
                mstform.getItem("phid_org").setProps({
                    required: true, //required是否必输
                });
                mstform.getItem('phid_org').setReadOnly(true);
                // mstform.getItem("u_xmjc").setProps({
                //     required: true, //required是否必输
                // });
                // mstform.getItem('u_xmjc').setReadOnly(true);
                // mstform.getItem("u_xmzt").setProps({
                //     required: true, //required是否必输
                // });
                // mstform.getItem('u_xmzt').setReadOnly(true);
                // mstform.getItem("u_xmkgrq").setProps({
                //     required: true, //required是否必输
                // });
                // mstform.getItem('u_xmkgrq').setReadOnly(true);
                // mstform.getItem("u_xmwgrq").setProps({
                //     required: true, //required是否必输
                // });
                // mstform.getItem('u_xmwgrq').setReadOnly(true);
                // mstform.getItem("u_xmjgsj").setProps({
                //     required: true, //required是否必输
                // });
                // mstform.getItem('u_xmjgsj').setReadOnly(true);
                // mstform.getItem("u_province").setProps({
                //     required: true, //required是否必输
                // });
                // mstform.getItem('u_province').setReadOnly(true);
                // mstform.getItem("u_city").setProps({
                //     required: true, //required是否必输
                // });
                // mstform.getItem('u_city').setReadOnly(true);
                // mstform.getItem("u_region").setProps({
                //     required: true, //required是否必输
                // });
                // mstform.getItem('u_region').setReadOnly(true);
                // mstform.getItem("u_yzdwmc").setProps({
                //     required: true, //required是否必输
                // });
                // mstform.getItem('u_yzdwmc').setReadOnly(true);
            } else {
                dgrid.clearRows();
                mstform.getItem("phid_pc").setProps({
                    required: false, //required是否必输
                    hidden: true
                });
                mstform.getItem("u_gcxm").setProps({
                    required: true, //required是否必输
                    hidden: false
                });
                mstform.getItem("phid_org").setProps({
                    required: false, //required是否必输
                });
                mstform.getItem('phid_org').setReadOnly(false);
                mstform.getItem("u_xmjc").setProps({
                    required: false, //required是否必输
                });
                mstform.getItem('u_xmjc').setReadOnly(false);
                mstform.getItem("u_xmzt").setProps({
                    required: false, //required是否必输
                });
                mstform.getItem('u_xmzt').setReadOnly(false);
                mstform.getItem("u_xmkgrq").setProps({
                    required: false, //required是否必输
                });
                mstform.getItem('u_xmkgrq').setReadOnly(false);
                mstform.getItem("u_xmwgrq").setProps({
                    required: false, //required是否必输
                });
                mstform.getItem('u_xmwgrq').setReadOnly(false);
                mstform.getItem("u_xmjgsj").setProps({
                    required: false, //required是否必输
                });
                mstform.getItem('u_xmjgsj').setReadOnly(false);
                mstform.getItem("u_province").setProps({
                    required: false, //required是否必输
                });
                mstform.getItem('u_province').setReadOnly(false);
                mstform.getItem("u_city").setProps({
                    required: false, //required是否必输
                });
                mstform.getItem('u_city').setReadOnly(false);
                mstform.getItem("u_region").setProps({
                    required: false, //required是否必输
                });
                mstform.getItem('u_region').setReadOnly(false);
                mstform.getItem("u_yzdwmc").setProps({
                    required: false, //required是否必输
                });
                mstform.getItem('u_yzdwmc').setReadOnly(false);

            }
        }, "p_form_liangjintianbao_m.u_sfczxm");

        //明细控制
        useValuesChange(async ({ args, form }) => {
            console.log("args[0].u_gcxm:", args[0].u_gcxm);
            dgrid.clearRows().then(() => {
                dgrid.addRows({ u_htmc1: args[0].u_gcxm })
            })
            dgrid.refreshView();
            //明细表非必填
            await $NG.updateUI(function (updater, state) {
                // 修改customfilebilltoform表单BilltoId字段的required属性为false
                console.log("updater:", updater);
                updater.setFieldProps({ 'p_form_liangjintianbao_d1.ng_phid_org': { disabled: false } });
                updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_zwdwmc': { disabled: false } });
                updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_sfeseynb': { disabled: false } });
                updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_htbm': { disabled: false } });
                updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_htmc': { hidden: true } });
                updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_htmc1': { hidden: false } });
                updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_hte': { disabled: false } });
                updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_htqdsj': { disabled: false } });
                updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_hthkbl': { disabled: false } });
                updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_sjhkbl': { disabled: false } });
                updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_zbjje': { disabled: false } });
                updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_zbjbl': { disabled: false } });
                updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_zbjdqsj': { disabled: false } });
                updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_ljkd': { disabled: false } });
                updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_sfw2nwjs': { disabled: false } });
                updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_sfw2nyjs': { disabled: false } });
                updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_sjysws': { disabled: false } });

            });
            const u_gcxm = args[0].u_gcxm;
            console.log("u_gcxm:", u_gcxm);
            if (u_gcxm) {
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
                /**监听项目选择后过滤统计周期 */
                // u_tjzq.setClientSqlFilter(
                `ctype = 'GCMONTH' 
                        AND bdt <= '${formattedDate}' 
                        AND phid NOT IN (
                        SELECT u_tjzq FROM p_form0000700750_m 
                        WHERE u_gcxm = '${u_gcxm}')`
                // );
                $NG.updateUI(function (updater, state) {
                    console.log('updater:', updater);
                    console.log('state:', state);

                    updater.fieldSetForm.p_form_liangjintianbao_m.u_tongjizhouqi.setProps({
                        clientSqlFilter: (`ctype = 'GCMONTH' 
                        AND bdt <= '${formattedDate}' 
                        AND phid NOT IN (
                        SELECT u_tongjizhouqi FROM p_form_liangjintianbao_m 
                        WHERE u_gcxm = '${u_gcxm}')`),	//根据项目过滤统计周期
                        placeholder: ``
                    });
                });
            }


        }, "p_form_liangjintianbao_m.u_gcxm");

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
        if (mstform.getItem("phid_org").getValue() == "" && mstform.getItem("phid_org").getValue() == null) {
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



        useValuesChange(async ({ args, form }) => {
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
                $NG.execServer("ljht", { pc: phid_pc }, async function (res) {
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
                        const u_yzdwmc = data[0].extendObjects.u_yzdwmc;
                        const u_yzdwmc_exname = data[0].extendObjects.u_yzdwmc_exname;
                        const u_xmjgsj = data[0].extendObjects.u_xmjgsj



                        //2025 11.27 将诉讼问题等字段完全迁移至问题表
                        // var u_sfss = 0;
                        // var sswtms = '';
                        // if (ajxx) {
                        //     u_sfss = 1;
                        //     //是否诉讼，如果为是，诉讼是否需要诉讼和需要诉讼原因不能填报
                        //     // mstform.getItem("u_sfxyss").setProps({
                        //     //     required: false, //required是否必输
                        //     //     hidden: true
                        //     // });
                        //     mstform.getItem("u_qssj").setProps({
                        //         required: false, //required是否必输
                        //         hidden: false
                        //     });
                        //     mstform.getItem("u_sfyss").setProps({
                        //         required: false, //required是否必输
                        //         hidden: false
                        //     });
                        //     mstform.getItem("u_sswtms").setProps({
                        //         required: false, //required是否必输
                        //         hidden: false
                        //     });
                        // } else {
                        //     // mstform.getItem("u_sfxyss").setProps({
                        //     //     required: true, //required是否必输
                        //     //     hidden: false
                        //     // });
                        //     mstform.getItem("u_qssj").setProps({
                        //         required: false, //required是否必输
                        //         hidden: true
                        //     });
                        //     mstform.getItem("u_sfyss").setProps({
                        //         required: false, //required是否必输
                        //         hidden: true
                        //     });
                        //     mstform.getItem("u_sswtms").setProps({
                        //         required: false, //required是否必输
                        //         hidden: true
                        //     });
                        // }
                        // if (u_sswtms) {
                        //     sswtms = u_sswtms;
                        // } else {
                        //     sswtms = u_sswtms1;
                        // }


                        $NG.updateState((updater) => {
                            updater.data.p_form_liangjintianbao_m.setProps({
                                u_xmkgrq: u_xmkgrq,
                                u_xmwgrq: u_xmwgrq,
                                u_xmzt: u_xmzt,
                                // u_sfss: u_sfss,
                                // u_sswtms: sswtms,
                                // u_qssj: u_qssj,
                                // u_sfyss: u_sfyss,
                                u_province: u_province,
                                u_city: u_city,
                                u_region: u_region,
                                u_province_EXName: u_province_exname,
                                u_city_EXName: u_city_exname,
                                u_region_EXName: u_region_exname,
                                u_xmjc: u_xmjc,
                                u_yzdwmc: u_yzdwmc,
                                u_yzdwmc_EXName: u_yzdwmc_exname,
                                u_xmjgsj: u_xmjgsj,

                            });
                        });
                        //子表的信息
                        //更新子表的合同编号和合同名（一次性批量添加）
                        //赋值为0的字段，0是初始值，为了后续的计算，否则会报错
                        for (let i = 0; i < data.length; i++) {
                            const end_dt = data[i].extendObjects.end_dt
                            const user_zbjqx = data[i].extendObjects.user_zbjqx

                            console.log("end_dt:", end_dt);
                            console.log("user_zbjqx:", user_zbjqx);
                            const parseDT = (s) => {
                                const parts = String(s).trim().split(/\s+/);
                                const ds = parts[0] || '';
                                const ts = parts[1] || '';
                                const dArr = ds.split('-').map(Number);
                                const tArr = ts ? ts.split(':').map(Number) : [];
                                const y = dArr[0] || 0, m = (dArr[1] || 1) - 1, d = dArr[2] || 1;
                                const h = tArr[0] || 0, mi = tArr[1] || 0, s2 = tArr[2] || 0;
                                return new Date(y, m, d, h, mi, s2);
                            };
                            const addMonths = (dt, months) => {
                                const y = dt.getFullYear();
                                const m = dt.getMonth();
                                const d = dt.getDate();
                                const h = dt.getHours();
                                const mi = dt.getMinutes();
                                const s2 = dt.getSeconds();
                                const target = new Date(y, m + Number(months), 1, h, mi, s2);
                                const daysInMonth = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
                                target.setDate(Math.min(d, daysInMonth));
                                return target;
                            };
                            const formatDT = (dt) => {
                                const pad = (n) => String(n).padStart(2, '0');
                                return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())} ${pad(dt.getHours())}:${pad(dt.getMinutes())}:${pad(dt.getSeconds())}`;
                            };
                            const u_zbjdqsj = formatDT(addMonths(parseDT(end_dt), user_zbjqx));
                            console.log("质保金到期时间:", u_zbjdqsj)


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
                                u_htqdsj: ex.u_htqdsj,
                                u_zbjdqsj: u_zbjdqsj,
                                u_ljkd: ex.u_ljkd ? ex.u_ljkd : 0,
                                u_ljkd1: ex.u_ljkd ? ex.u_ljkd : 0,  //带出开单  自动带出累计开单
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
                                u_ljhk: 0,
                                u_dyzqrzz: 0,
                                u_drzkd: 0,
                                u_jr: 0,
                                u_qt: 0,
                                u_sxswwbkd: 0,
                                u_wjqr: 0,
                                u_zlfk: 0,
                                u_qt1: 0,
                                u_abs: 0,
                                u_zcphtc: 0,
                                u_ljhk1: 0,
                                u_sfw2nwjs: '0',
                                u_sfw2nyjs: '0',
                                u_sfyhz: '02',
                                u_hzdjje: 0,
                                u_hzhkje2025: 0,
                                u_jsyywfhkje: 0,
                                u_ywwjchje: 0,
                                u_sryywfyjej: 0,
                                u_swddfktjdkd: 0,
                                u_swkhdyskje: 0


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
                                // u_sfss: null,
                                // u_sswtms: null,
                                // u_qssj: null,
                                // u_sfyss: null,
                                u_province: null,
                                u_city: null,
                                u_region: null,
                                u_province_EXName: null,
                                u_city_EXName: null,
                                u_region_EXName: null,
                                u_xmjc: null,
                                u_yzdwmc: null,
                                u_yzdwmc_EXName: null,
                                u_xmjgsj: null
                            });
                        });
                        // mstform.getItem("u_sfxyss").setProps({
                        //     required: true, //required是否必输
                        //     hidden: false
                        // });

                        $NG.alert("该项目暂无信息");
                    }
                    //明细表必填
                    await $NG.updateUI(function (updater, state) {
                        // 修改customfilebilltoform表单BilltoId字段的required属性
                        console.log("updater:", updater);
                        updater.setFieldProps({ 'p_form_liangjintianbao_d1.ng_phid_org': { disabled: true } });
                        updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_zwdwmc': { disabled: true } });
                        updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_sfeseynb': { disabled: true } });
                        updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_htbm': { disabled: true } });
                        updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_htmc': { disabled: true, hidden: false } });
                        updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_htmc1': { hidden: true } });
                        updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_hte': { disabled: true } });
                        updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_htqdsj': { disabled: true } });
                        updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_hthkbl': { disabled: true } });
                        updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_sjhkbl': { disabled: true } });
                        updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_zbjje': { disabled: true } });
                        updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_zbjbl': { disabled: true } });
                        updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_zbjdqsj': { disabled: true } });
                        updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_ljkd': { disabled: true } });
                        updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_sfw2nwjs': { disabled: true } });
                        updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_sfw2nyjs': { disabled: true } });
                        updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_sjysws': { disabled: true } });

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
                $NG.execServer("ljhtmx", { pc: pc, zq: zq }, async function (res) {
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

                                // var u_ljkd = data1[i].extendObjects.u_ljkd;
                                // var u_ljhk = data1[i].extendObjects.u_ljhk;
                                var u_zjxj = data1[i].extendObjects.u_zjxj;
                                var u_jsxj = data1[i].extendObjects.u_jsxj;
                                var u_month2 = data1[i].extendObjects.u_month2;
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
                                var u_yfksfaqsh = data1[i].extendObjects.u_yfksfaqsh;
                                var u_wtms = data1[i].extendObjects.u_wtms;
                                var u_sfyzlwtrwhk = data1[i].extendObjects.u_sfyzlwtrwhk;
                                var u_zlwtms = data1[i].extendObjects.u_zlwtms;
                                var u_zbjsfaqsh = data1[i].extendObjects.u_zbjsfaqsh;
                                var u_zbjwtms = data1[i].extendObjects.u_zbjwtms;
                                var u_sfylyywtrwhk = data1[i].extendObjects.u_sfylyywtrwhk;
                                var u_lywtms = data1[i].extendObjects.u_lywtms;
                                var u_jfdwxz = data1[i].extendObjects.u_jfdwxz;
                                var u_jfdwlsdwmc = data1[i].extendObjects.u_jfdwlsdwmc;
                                var u_zbjdqsj = data1[i].extendObjects.u_zbjdqsj;
                                var u_sxswwbkd = data1[i].extendObjects.u_sxswwbkd;
                                var u_wjqr = data1[i].extendObjects.u_wjqr;
                                var u_zlfk = data1[i].extendObjects.u_zlfk;
                                var u_qt = data1[i].extendObjects.u_qt;
                                var u_ljkd1 = data1[i].extendObjects.u_ljkd1;
                                var u_dyzqrzz = data1[i].extendObjects.u_dyzqrzz;
                                var u_abs = data1[i].extendObjects.u_abs;
                                var u_zcphtc = data1[i].extendObjects.u_zcphtc;
                                var u_qt1 = data1[i].extendObjects.u_qt1;
                                var u_ljhk1 = data1[i].extendObjects.u_ljhk1;
                                var u_byyszk = data1[i].extendObjects.u_byyszk;
                                var u_yzzzje = data1[i].extendObjects.u_yzzzje;
                                var u_sjyszk = data1[i].extendObjects.u_sjyszk;
                                var u_ywwjch = data1[i].extendObjects.u_ywwjch;
                                var u_swch = data1[i].extendObjects.u_swch;
                                var u_ljhj = data1[i].extendObjects.u_ljhj;
                                var u_sfw2nwjs = data1[i].extendObjects.u_sfw2nwjs;
                                var u_sfw2nyjs = data1[i].extendObjects.u_sfw2nyjs;
                                var u_htqdsj = data1[i].extendObjects.u_htqdsj;
                                // var u_yfksfaqsh = data1[i].extendObjects.u_yfksfaqsh;
                                // var u_wtms = data1[i].extendObjects.u_wtms;
                                // var u_sfyzlwtrwhk = data1[i].extendObjects.u_sfyzlwtrwhk;
                                // var u_zlwtms = data1[i].extendObjects.u_zlwtms;
                                // var u_zbjsfaqsh = data1[i].extendObjects.u_zbjsfaqsh;
                                // var u_zbjwtms = data1[i].extendObjects.u_zbjwtms;
                                // var u_sfylyywtrwhk = data1[i].extendObjects.u_sfylyywtrwhk;
                                // var u_lywtms = data1[i].extendObjects.u_lywtms;
                                var u_htbm = data1[i].extendObjects.u_htbm;
                                var u_swddfktjdkd = data1[i].extendObjects.u_swddfktjdkd;
                                var u_swkhdyskje = data1[i].extendObjects.u_swkhdyskje;
                                var u_sfyhz = data1[i].extendObjects.u_sfyhz;
                                var u_hzdjje = data1[i].extendObjects.u_hzdjje;
                                var u_hzhkje2025 = data1[i].extendObjects.u_hzhkje2025;
                                var u_jsyywfhkje = data1[i].extendObjects.u_jsyywfhkje;
                                var u_ywwjchje = data1[i].extendObjects.u_ywwjchje;
                                var u_sryywfyjej = data1[i].extendObjects.u_sryywfyjej;

                                //主表部分字段
                                var u_yzdwxz = data1[i].extendObjects.u_yzdwxz;
                                var u_xmzzyzj = data1[i].extendObjects.u_xmzzyzj;
                                var u_sfwhzxm = data1[i].extendObjects.u_sfwhzxm;
                                $NG.updateState((updater) => {
                                    updater.data.p_form_liangjintianbao_m.setProps({
                                        u_yzdwxz: u_yzdwxz,
                                        u_xmzzyzj: u_xmzzyzj,
                                        u_sfwhzxm: u_sfwhzxm,
                                    });
                                });
                                const rows = dgrid.getRows();
                                console.log("rows:", rows);


                                for (let k = 0; k < rows.length; k++) {
                                    if (rows[k]['u_htbm'] == u_htbm) {
                                        // rows[k]['u_ljkd'] = u_ljkd;
                                        // rows[k]['u_ljhk'] = u_ljhk;
                                        rows[k]['u_zjxj'] = u_zjxj;
                                        rows[k]['u_jsxj'] = u_jsxj;
                                        rows[k]['u_month2'] = u_month2;
                                        rows[k]['u_month3_6'] = u_month3_6;
                                        rows[k]['u_month7_12'] = u_month7_12;
                                        rows[k]['u_month13_24'] = u_month13_24;
                                        rows[k]['u_year1_2'] = u_year1_2;
                                        rows[k]['u_year2_3'] = u_year2_3;
                                        rows[k]['u_year3up'] = u_year3up;
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
                                        rows[k]['u_yfksfaqsh'] = u_yfksfaqsh;
                                        rows[k]['u_wtms'] = u_wtms;
                                        rows[k]['u_sfyzlwtrwhk'] = u_sfyzlwtrwhk;
                                        rows[k]['u_zlwtms'] = u_zlwtms;
                                        rows[k]['u_zbjsfaqsh'] = u_zbjsfaqsh;
                                        rows[k]['u_zbjwtms'] = u_zbjwtms;
                                        rows[k]['u_sfylyywtrwhk'] = u_sfylyywtrwhk;
                                        rows[k]['u_lywtms'] = u_lywtms;
                                        rows[k]['u_jfdwxz'] = u_jfdwxz;
                                        rows[k]['u_jfdwlsdwmc'] = u_jfdwlsdwmc;
                                        rows[k]['u_htqdsj'] = u_htqdsj;
                                        rows[k]['u_zbjdqsj'] = u_zbjdqsj;
                                        rows[k]['u_sxswwbkd'] = u_sxswwbkd;
                                        rows[k]['u_wjqr'] = u_wjqr;
                                        rows[k]['u_zlfk'] = u_zlfk;
                                        rows[k]['u_qt'] = u_qt;
                                        rows[k]['u_ljkd1'] = u_ljkd1;
                                        rows[k]['u_dyzqrzz'] = u_dyzqrzz;
                                        rows[k]['u_abs'] = u_abs;
                                        rows[k]['u_zcphtc'] = u_zcphtc;
                                        rows[k]['u_qt1'] = u_qt1;
                                        rows[k]['u_ljhk1'] = u_ljhk1;
                                        rows[k]['u_byyszk'] = u_byyszk;
                                        rows[k]['u_yzzzje'] = u_yzzzje;
                                        rows[k]['u_sjyszk'] = u_sjyszk;
                                        rows[k]['u_ywwjch'] = u_ywwjch;
                                        rows[k]['u_swch'] = u_swch;
                                        rows[k]['u_ljhj'] = u_ljhj;
                                        rows[k]['u_sfw2nwjs'] = u_sfw2nwjs;
                                        rows[k]['u_sfw2nyjs'] = u_sfw2nyjs;
                                        rows[k]['u_swddfktjdkd'] = u_swddfktjdkd;
                                        rows[k]['u_swkhdyskje'] = u_swkhdyskje;
                                        rows[k]['u_sfyhz'] = u_sfyhz;
                                        rows[k]['u_hzdjje'] = u_hzdjje;
                                        rows[k]['u_hzhkje2025'] = u_hzhkje2025;
                                        rows[k]['u_jsyywfhkje'] = u_jsyywfhkje;
                                        rows[k]['u_ywwjchje'] = u_ywwjchje;
                                        rows[k]['u_sryywfyjej'] = u_sryywfyjej;


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
                                await $NG.updateUI(function (updater, state) {
                                    // 修改customfilebilltoform表单BilltoId字段的required属性
                                    updater.setFieldProps({ 'p_form_liangjintianbao_d1.ng_phid_org': { disabled: true } });
                                    updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_zwdwmc': { disabled: true } });
                                    updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_sfeseynb': { disabled: true } });
                                    updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_htbm': { disabled: true } });
                                    updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_htmc': { disabled: true, hidden: false } });
                                    updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_htmc1': { disabled: true, hidden: true } });
                                    updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_hte': { disabled: true } });
                                    updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_htqdsj': { disabled: true } });
                                    updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_hthkbl': { disabled: true } });
                                    updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_sjhkbl': { disabled: true } });
                                    updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_zbjje': { disabled: true } });
                                    updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_zbjbl': { disabled: true } });
                                    updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_zbjdqsj': { disabled: true } });
                                    updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_ljkd': { disabled: true } });
                                    updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_sfw2nwjs': { disabled: true } });
                                    updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_sfw2nyjs': { disabled: true } });
                                    updater.setFieldProps({ 'p_form_liangjintianbao_d1.u_sjysws': { disabled: true } });

                                });
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
            if (mstform.getItem("phid_org").getValue() == "" && mstform.getItem("phid_org").getValue() == null) {
                $NG.alert("请先填写所属组织");
                return false;
            }
            if (mstform.getItem("u_sfczxm").getValue() == "" && mstform.getItem("u_sfczxm").getValue() == null) {
                $NG.alert("请先选择该项目是否已在i8系统立项。");
                return false;
            }
            if (mstform.getItem("u_sfczxm").getValue() == '01') {
                if (mstform.getItem("phid_pc").getValue() == "" && mstform.getItem("phid_pc").getValue() == null) {
                    $NG.alert("请先填写项目");
                    return false;
                }
            } else if (mstform.getItem("u_sfczxm").getValue() == '02') {
                if (mstform.getItem("u_gcxm").getValue() == "" && mstform.getItem("u_gcxm").getValue() == null) {
                    $NG.alert("请先填写项目");
                    return false;
                }
            }
        }, "WorkCycle");
        useValuesChange(({ args, form }) => {
            console.log(args[0]);
            const zq = args[0].u_tongjizhouqi.label;
            console.log("args[0].u_tongjizhouqi.label:", args[0].u_tongjizhouqi.label);
            if (mstform.getItem("u_sfczxm").getValue() == '01') {
                $NG.updateState((updater) => {
                    updater.data.p_form_liangjintianbao_m.setProps({
                        bill_name: project_name + "-" + zq
                    });
                });
            } else if (mstform.getItem("u_sfczxm").getValue() == '02') {
                var u_gcxm = mstform.getItem("u_gcxm").getValue();
                $NG.updateState((updater) => {
                    updater.data.p_form_liangjintianbao_m.setProps({
                        bill_name: u_gcxm + "-" + zq
                    });
                });
            }



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
    // 校验应收账款账龄填报 - 单独修改逻辑
    const checkAndZeroMonths = ({ args, instance }) => {
        console.log("校验应收账款账龄填报...");
        const u_ljkd1 = args[0].u_ljkd1 || 0;
        const u_ljhk1 = args[0].u_ljhk1 || 0;

        // 如果u_ljkd1减去u_ljhk1为负数，则u_month2 ， u_month3_6 ， u_month7_12 ，u_year1_2 ，u_year2_3 ， u_year3up这几个字段任何字段修改都会被赋值为0
        if ((u_ljkd1 - u_ljhk1) < 0) {
            args[0].u_month2 = 0;
            args[0].u_month3_6 = 0;
            args[0].u_month7_12 = 0;
            args[0].u_year1_2 = 0;
            args[0].u_year2_3 = 0;
            args[0].u_year3up = 0;
            instance.updateRow(args[0]);
        }
    };

    useDataIndexChange(checkAndZeroMonths, 'p_form_liangjintianbao_d1.u_month2');
    useDataIndexChange(checkAndZeroMonths, 'p_form_liangjintianbao_d1.u_month3_6');
    useDataIndexChange(checkAndZeroMonths, 'p_form_liangjintianbao_d1.u_month7_12');
    useDataIndexChange(checkAndZeroMonths, 'p_form_liangjintianbao_d1.u_year1_2');
    useDataIndexChange(checkAndZeroMonths, 'p_form_liangjintianbao_d1.u_year2_3');
    useDataIndexChange(checkAndZeroMonths, 'p_form_liangjintianbao_d1.u_year3up');
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
        const u_sjyszk = parseFloat(Number(args[0].u_sjyszk || 0).toFixed(2));
        const u_ywwjch = parseFloat(Number(args[0].u_ywwjch || 0).toFixed(2));
        const u_swch = parseFloat(Number(args[0].u_swch || 0).toFixed(2));
        console.log("应收账款小计:", u_sjyszk);
        console.log("已完未结存货小计:", u_ywwjch);
        console.log("实物存货小计:", u_swch);
        console.log("两金合计:", u_sjyszk + u_ywwjch + u_swch);
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

    //由于累计回款和累计开单改名为回款和开单，此逻辑停用
    // useDataIndexChange(({ args, instance }) => {
    //     console.log("计算回款比例中...")
    //     const u_ljhk = args[0].u_ljhk;
    //     const u_ljkd = args[0].u_ljkd;

    //     args[0].u_sjhkbl = u_ljhk / u_ljkd;
    //     instance.updateRow(args[0]);

    // }, ['p_form_liangjintianbao_d1.u_ljhk',
    //     'p_form_liangjintianbao_d1.u_ljkd']);

    //新累计回款和累计开单拆分逻辑

    // Hook 1: 累计开单相关 (计算 u_ljkd1 及级联)
    useDataIndexChange(({ args, instance }) => {
        console.log("计算累计开单中...");
        const u_ljkd = args[0].u_ljkd;
        const u_sxswwbkd = args[0].u_sxswwbkd;
        const u_wjqr = args[0].u_wjqr;
        const u_zlfk = args[0].u_zlfk;
        const u_qt = args[0].u_qt;

        const u_ljkd1 = u_ljkd - u_sxswwbkd - u_wjqr - u_zlfk - u_qt;
        args[0].u_ljkd1 = u_ljkd1;

        // 级联计算应收账款小计 (u_sjyszk = u_ljkd1 - u_ljhk1)
        const u_sjyszk = parseFloat(Number(u_ljkd1 - (args[0].u_ljhk1 || 0)).toFixed(2));
        args[0].u_sjyszk = u_sjyszk;

        // 级联计算两金合计 (u_ljhj = u_sjyszk + u_ywwjch + u_swch)
        args[0].u_ljhj = parseFloat(Number(u_sjyszk + (args[0].u_ywwjch || 0) + (args[0].u_swch || 0)).toFixed(2));

        // 级联计算回款比例
        const u_ljhk1 = args[0].u_ljhk1;
        if (u_ljkd1 != 0) {
            args[0].u_sjhkbl = u_ljhk1 / u_ljkd1;
        } else {
            args[0].u_sjhkbl = 0;
        }

        // 级联计算应收账款余额
        const u_ljhk = args[0].u_ljhk;
        const u_drzkd = args[0].u_drzkd;
        args[0].u_byyszk = u_ljkd - u_ljhk - u_drzkd;

        // 级联计算应收未收金额
        const u_swddfktjdkd = args[0].u_swddfktjdkd;
        const u_hthkbl = args[0].u_hthkbl;
        const u_swkhdyskje = args[0].u_swkhdyskje;
        const u_sjysws = parseFloat(Number(((u_ljkd1 - u_swddfktjdkd) * u_hthkbl) - u_ljhk1 + u_swkhdyskje || 0).toFixed(2));
        if (u_sjysws < 0) {
            args[0].u_sjysws = 0;
        } else {
            args[0].u_sjysws = u_sjysws;
        }

        instance.updateRow(args[0]);
    }, ['p_form_liangjintianbao_d1.u_ljkd',
        'p_form_liangjintianbao_d1.u_sxswwbkd',
        'p_form_liangjintianbao_d1.u_wjqr',
        'p_form_liangjintianbao_d1.u_zlfk',
        'p_form_liangjintianbao_d1.u_qt']);

    // Hook 2: 累计回款相关 (计算 u_ljhk1 及级联)
    useDataIndexChange(({ args, instance }) => {
        console.log("计算累计回款中...");
        const u_ljhk = args[0].u_ljhk;
        const u_dyzqrzz = args[0].u_dyzqrzz;
        const u_abs = args[0].u_abs;
        const u_zcphtc = args[0].u_zcphtc;
        const u_qt1 = args[0].u_qt1;

        const u_ljhk1 = u_ljhk - u_dyzqrzz - u_abs - u_zcphtc - u_qt1;
        args[0].u_ljhk1 = u_ljhk1;

        // 级联计算应收账款小计 (u_sjyszk = u_ljkd1 - u_ljhk1)
        const u_sjyszk = parseFloat(Number((args[0].u_ljkd1 || 0) - u_ljhk1).toFixed(2));
        args[0].u_sjyszk = u_sjyszk;

        // 级联计算两金合计 (u_ljhj = u_sjyszk + u_ywwjch + u_swch)
        args[0].u_ljhj = parseFloat(Number(u_sjyszk + (args[0].u_ywwjch || 0) + (args[0].u_swch || 0)).toFixed(2));

        // 级联计算回款比例
        const u_ljkd1 = args[0].u_ljkd1;
        if (u_ljkd1 != 0) {
            args[0].u_sjhkbl = u_ljhk1 / u_ljkd1;
        } else {
            args[0].u_sjhkbl = 0;
        }

        // 级联计算应收账款余额
        const u_ljkd = args[0].u_ljkd;
        const u_drzkd = args[0].u_drzkd;
        args[0].u_byyszk = u_ljkd - u_ljhk - u_drzkd;

        // 级联计算应收未收金额
        const u_swddfktjdkd = args[0].u_swddfktjdkd;
        const u_hthkbl = args[0].u_hthkbl;
        const u_swkhdyskje = args[0].u_swkhdyskje;
        const u_sjysws = parseFloat(Number(((u_ljkd1 - u_swddfktjdkd) * u_hthkbl) - u_ljhk1 + u_swkhdyskje || 0).toFixed(2));
        if (u_sjysws < 0) {
            args[0].u_sjysws = 0;
        } else {
            args[0].u_sjysws = u_sjysws;
        }

        instance.updateRow(args[0]);
    }, ['p_form_liangjintianbao_d1.u_ljhk',
        'p_form_liangjintianbao_d1.u_dyzqrzz',
        'p_form_liangjintianbao_d1.u_abs',
        'p_form_liangjintianbao_d1.u_zcphtc',
        'p_form_liangjintianbao_d1.u_qt1']);

    // Hook 3: 当日账款相关 (计算 u_byyszk)
    useDataIndexChange(({ args, instance }) => {
        console.log("计算应收账款余额中...");
        const u_ljkd = args[0].u_ljkd;
        const u_ljhk = args[0].u_ljhk;
        const u_drzkd = args[0].u_drzkd;
        args[0].u_byyszk = u_ljkd - u_ljhk - u_drzkd;
        instance.updateRow(args[0]);
    }, ['p_form_liangjintianbao_d1.u_drzkd']);

    // Hook 4: 应收未收相关 (计算 u_sjysws)
    useDataIndexChange(({ args, instance }) => {
        console.log("计算应收未收金额中...");
        const u_ljkd1 = args[0].u_ljkd1;
        const u_swddfktjdkd = args[0].u_swddfktjdkd;
        const u_hthkbl = args[0].u_hthkbl;
        const u_ljhk1 = args[0].u_ljhk1;
        const u_swkhdyskje = args[0].u_swkhdyskje;

        const u_sjysws = parseFloat(Number(((u_ljkd1 - u_swddfktjdkd) * u_hthkbl) - u_ljhk1 + u_swkhdyskje || 0).toFixed(2));
        console.log("应收未收金额:", u_sjysws);
        if (u_sjysws < 0) {
            args[0].u_sjysws = 0;
        } else {
            args[0].u_sjysws = u_sjysws;
        }
        instance.updateRow(args[0]);
    }, ['p_form_liangjintianbao_d1.u_swddfktjdkd',
        'p_form_liangjintianbao_d1.u_hthkbl',
        'p_form_liangjintianbao_d1.u_swkhdyskje']);
    useDataIndexChange(({ args, instance }) => {
        console.log("计算化债回款金额2025...")
        const u_hzdjje = args[0].u_hzdjje;
        const u_hzhkje2025 = args[0].u_hzhkje2025;
        if (u_hzhkje2025 > u_hzdjje) {
            $NG.alert('化债回款金额(2025年至今)不能大于化债登记金额');
            args[0].u_hzhkje2025 = 0;
            instance.updateRow(args[0]);
        }
    }, ['p_form_liangjintianbao_d1.u_hzdjje',
        'p_form_liangjintianbao_d1.u_hzhkje2025']);
    useDataIndexChange(({ args, instance }) => {
        console.log("校验尚未扣回的预收款金额...")
        const u_swkhdyskje = args[0].u_swkhdyskje;
        const u_ljhk1 = args[0].u_ljhk1;
        console.log("u_swkhdyskje:", u_swkhdyskje);
        console.log("u_ljhk1:", u_ljhk1);
        if (u_swkhdyskje > u_ljhk1) {
            $NG.alert('尚未扣回的预收款金额不能大于累计回款金额');
            args[0].u_swkhdyskje = 0;
            instance.updateRow(args[0]);
        }
    }, ['p_form_liangjintianbao_d1.u_swkhdyskje',
        'p_form_liangjintianbao_d1.u_ljhk1']);
    useDataIndexChange(({ args, instance }) => {
        console.log("校验尚未达到付款条件的开单...")
        const u_swddfktjdkd = args[0].u_swddfktjdkd;
        const u_ljkd1 = args[0].u_ljkd1;
        console.log("u_swddfktjdkd:", u_swddfktjdkd);
        console.log("u_ljkd1:", u_ljkd1);
        if (u_swddfktjdkd > u_ljkd1) {
            $NG.alert('尚未达到付款条件的开单不能大于累计开单');
            args[0].u_swddfktjdkd = 0;
            instance.updateRow(args[0]);
        }
    }, ['p_form_liangjintianbao_d1.u_swddfktjdkd',
        'p_form_liangjintianbao_d1.u_ljkd1']);

    useBeforeClick(async function ({ args }) {
        //按钮点击前事件
        const rows = dgrid.getRows();
        console.log("点击保存前，所有行数据：", rows);
        for (let k = 0; k < rows.length; k++) {
            let row = rows[k];

            //累计开单➖累计回款 必须等于 应收账款小计  否则无法保存
            console.log("第" + (k + 1) + "行，累计开单 = " + row.u_ljkd1);
            console.log("第" + (k + 1) + "行，累计回款 = " + row.u_ljhk1);

            const diff = (Number(row.u_ljkd1 || 0) - Number(row.u_ljhk1 || 0)).toFixed(2);
            const sjyszk = Number(row.u_sjyszk || 0).toFixed(2);

            console.log("第" + (k + 1) + "行，保留两位小数，累计开单➖累计回款 = " + diff);
            console.log("第" + (k + 1) + "行，应收账款小计 = " + sjyszk);

            if (diff != sjyszk) {
                $NG.alert('第' + (k + 1) + '行应收账款小计不等于账龄合计，无法保存');
                return false;
            }
            const u_ywwjchje = Number(row.u_ywwjchje || 0).toFixed(2);
            const u_sryywfyjej = Number(row.u_sryywfyjej || 0).toFixed(2);
            const u_ywwjch = Number(row.u_ywwjch || 0).toFixed(2);
            console.log("第" + (k + 1) + "行，已完未结存货金额 = " + u_ywwjchje);
            console.log("第" + (k + 1) + "行，其中：收入原因无法压降金额 = " + u_sryywfyjej);
            console.log("第" + (k + 1) + "行，已完未结存货小计 = " + u_ywwjch);

            if ((u_ywwjchje - u_sryywfyjej) != u_ywwjch) {
                await $NG.alert('第' + (k + 1) + '行已完未结存货小计不等于账龄合计，无法保存');
                return false;
            }
        }
    }, "save");
    useBeforeClick(async function ({ args }) {
        //按钮点击前事件
        const rows = dgrid.getRows();
        console.log("点击送审前，所有行数据：", rows);
        for (let k = 0; k < rows.length; k++) {
            let row = rows[k];

            //累计开单➖累计回款 必须等于 应收账款小计  否则无法保存
            console.log("第" + (k + 1) + "行，累计开单 = " + row.u_ljkd1);
            console.log("第" + (k + 1) + "行，累计回款 = " + row.u_ljhk1);

            const diff = (Number(row.u_ljkd1 || 0) - Number(row.u_ljhk1 || 0)).toFixed(2);
            const zkxj = Number(row.u_sjyszk || 0).toFixed(2);

            console.log("第" + (k + 1) + "行，累计开单➖累计回款 = " + diff);
            console.log("111");
            console.log("第" + (k + 1) + "行，应收账款小计 = " + zkxj);

            if (diff != zkxj) {
                await $NG.alert('第' + (k + 1) + '行应收账款小计不等于账龄合计，无法保存');
                return false;
            }

            const u_ywwjchje = Number(row.u_ywwjchje || 0).toFixed(2);
            const u_sryywfyjej = Number(row.u_sryywfyjej || 0).toFixed(2);
            const u_ywwjch = Number(row.u_ywwjch || 0).toFixed(2);
            console.log("第" + (k + 1) + "行，已完未结存货金额 = " + u_ywwjchje);
            console.log("第" + (k + 1) + "行，其中：收入原因无法压降金额 = " + u_sryywfyjej);
            console.log("第" + (k + 1) + "行，已完未结存货小计 = " + u_ywwjch);

            if ((u_ywwjchje - u_sryywfyjej) != u_ywwjch) {
                await $NG.alert('第' + (k + 1) + '行已完未结存货小计不等于账龄合计，无法保存');
                return false;
            }
        }
    }, "check");

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

    // 2025.10.22 增加小计和减少小计的字段去除，相关逻辑注释
    // useDataIndexChange(({ args, instance }) => {
    //     console.log("计算增加小计中...")
    //     const u_dyzqrzz = args[0].u_dyzqrzz;
    //     const u_drzkd = args[0].u_drzkd;
    //     const u_jr = args[0].u_jr;
    //     const u_qt = args[0].u_qt;

    //     args[0].u_zjxj = u_dyzqrzz + u_drzkd + u_jr + u_qt;
    //     instance.updateRow(args[0]);
    // }, ['p_form_liangjintianbao_d1.u_dyzqrzz',
    //     'p_form_liangjintianbao_d1.u_drzkd',
    //     'p_form_liangjintianbao_d1.u_jr',
    //     'p_form_liangjintianbao_d1.u_qt']);
    // useDataIndexChange(({ args, instance }) => {
    //     console.log("计算减少小计中...")
    //     const u_sxswwbkd = args[0].u_sxswwbkd;
    //     const u_wjqr = args[0].u_wjqr;
    //     const u_zlfk = args[0].u_zlfk;
    //     const u_qt1 = args[0].u_qt1;

    //     args[0].u_jsxj = u_sxswwbkd + u_wjqr + u_zlfk + u_qt1;
    //     instance.updateRow(args[0]);
    // }, ['p_form_liangjintianbao_d1.u_sxswwbkd',
    //     'p_form_liangjintianbao_d1.u_wjqr',
    //     'p_form_liangjintianbao_d1.u_zlfk',
    //     'p_form_liangjintianbao_d1.u_qt1']);


});
