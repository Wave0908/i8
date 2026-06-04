//1.入口函数
$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useBeforeOpen, addRow, useBeforeClick, useUpdateRows, useClick }
) {
    //TODO
    var mstform = $NG.getCmpApi("p_form_xmchzxplfxbg_m");
    var dgrid1 = $NG.getCmpApi("p_form_xmchzxplfxbg_d1");//进度策划
    var dgrid2 = $NG.getCmpApi("p_form_xmchzxplfxbg_d2");//分包招标策划
    var dgrid3 = $NG.getCmpApi("p_form_xmchzxplfxbg_d3");//采购策划
    var dgrid4 = $NG.getCmpApi("p_form_xmchzxplfxbg_d4");//征拆计划
    var dgrid5 = $NG.getCmpApi("p_form_xmchzxplfxbg_d5");//资源配置计划
    var dgrid6 = $NG.getCmpApi("p_form_xmchzxplfxbg_d6");//设计策划
    var dgrid7 = $NG.getCmpApi("p_form_xmchzxplfxbg_d7");//技术质量策划
    var dgrid8 = $NG.getCmpApi("p_form_xmchzxplfxbg_d9");//成本策划
    //var toolbar = $NG.getCmpApi("toolbar_top"); //表单布局不同，可能有差别，f12用选择器去看


    //隐藏无用字段
    $NG.updateUI(function (updater, layout) {
        //进度策划
        updater.grid.p_form_xmchzxplfxbg_d1.u_xsjdkzz.setProps({
            hidden: true,
        });
        updater.grid.p_form_xmchzxplfxbg_d1.u_sjfsz.setProps({
            hidden: true,
        });
        updater.grid.p_form_xmchzxplfxbg_d1.u_sfzkzfwn.setProps({
            hidden: true,
        });
        //征拆计划
        updater.grid.p_form_xmchzxplfxbg_d4.u_xsjdkzz.setProps({
            hidden: true,
        });
        updater.grid.p_form_xmchzxplfxbg_d4.u_sjfsz.setProps({
            hidden: true,
        });
        updater.grid.p_form_xmchzxplfxbg_d4.u_sfzkzfwn.setProps({
            hidden: true,
        });
        //资源配置计划
        updater.grid.p_form_xmchzxplfxbg_d5.u_jhwcsj.setProps({
            hidden: true,
        });
        updater.grid.p_form_xmchzxplfxbg_d5.u_sjwcsj.setProps({
            hidden: true,
        });
        updater.grid.p_form_xmchzxplfxbg_d5.u_sfcq.setProps({
            hidden: true,
        });
        //采购策划
        updater.grid.p_form_xmchzxplfxbg_d3.u_xsjdkzz.setProps({
            hidden: true,
        });
        updater.grid.p_form_xmchzxplfxbg_d3.u_sjfsz.setProps({
            hidden: true,
        });
        updater.grid.p_form_xmchzxplfxbg_d3.u_sfzkzfwn.setProps({
            hidden: true,
        });
        //技术质量方案
        updater.grid.p_form_xmchzxplfxbg_d7.u_xsjdkzz.setProps({
            hidden: true,
        });
        updater.grid.p_form_xmchzxplfxbg_d7.u_sjfsz.setProps({
            hidden: true,
        });
        updater.grid.p_form_xmchzxplfxbg_d7.u_sfzkzfwn.setProps({
            hidden: true,
        });
        //成本策划
        // updater.grid.p_form_xmchzxplfxbg_d9.u_sfzkzfwn.setProps({
        //     hidden: true,
        // });
    });

    // if (editPage.oType == "add") {
    //     //新增时自动带出
    //     //资源配置计划
    //     var allRows5 = [];
    //     dgrid5.addRows([
    //         { u_kdmc: "作业人员配置" },
    //         { u_kdmc: "施工机械配置" },
    //         { u_kdmc: "大型设备配置" },
    //         { u_kdmc: "周转材料配置" },
    //     ]);
    // }
    if (editPage.oType == "add" || editPage.oType == "edit") {
        //选择项目
        useValuesChange(({ args, form }) => {
            const phid_pc = args[0].phid_pc.value;

            dgrid1.clearRows();
            dgrid2.clearRows();
            dgrid3.clearRows();
            dgrid4.clearRows();
            dgrid5.clearRows();
            dgrid6.clearRows();
            dgrid7.clearRows();
            dgrid8.clearRows();

            //资源配置计划
            var allRows5 = [];
            dgrid5.addRows([
                { u_kdmc: "作业人员配置" },
                { u_kdmc: "施工机械配置" },
                { u_kdmc: "大型设备配置" },
                { u_kdmc: "周转材料配置" },
            ]);

            if (phid_pc) {
                console.log("phid_pc:", phid_pc);
                //进度策划
                var allRows1 = [];
                $NG.execServer("zxplfxbg_jdch", { pc: phid_pc }, function (res) {
                    console.log("res:", res);
                    if (res.count > 0) {
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        for (let i = 0; i < data.length; i++) {
                            const ex = data[i].extendObjects || {};
                            const rowData = {
                                u_kdmc: ex.u_kdmc || null,
                                u_jhwcsj: ex.u_jhwcsj || null
                            }
                            allRows1.push(rowData);
                        }
                        if (allRows1.length > 0) {
                            dgrid1.addRows(allRows1);
                            console.log("带出进度策划数据:", allRows1);
                            dgrid1.refreshView();
                        }
                    }
                })
                //分包招标策划
                var allRows2 = [];
                $NG.execServer("zxplfxbg_fbzbch", { pc: phid_pc }, function (res) {
                    console.log("res:", res);
                    if (res.count > 0) {
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        for (let i = 0; i < data.length; i++) {
                            const ex = data[i].extendObjects || {};
                            const rowData = {
                                u_kdmc: ex.u_kdmc || null,
                                u_jhwcsj: ex.u_jhwcsj || null,
                                u_xsjdkzz: ex.u_xsjdkzz || null
                            }
                            allRows2.push(rowData);
                        }
                        if (allRows2.length > 0) {
                            dgrid2.addRows(allRows2);
                            console.log("带出分包招标策划数据:", allRows2);
                            dgrid2.refreshView();
                        }
                    }
                })
                //采购策划
                var allRows3 = [];
                $NG.execServer("zxplfxbg_cgch", { pc: phid_pc }, function (res) {
                    console.log("res:", res);
                    if (res.count > 0) {
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        for (let i = 0; i < data.length; i++) {
                            const ex = data[i].extendObjects || {};
                            const rowData = {
                                u_kdmc: ex.u_kdmc || null,
                                u_jhwcsj: ex.u_jhwcsj || null
                            }
                            allRows3.push(rowData);
                        }
                        if (allRows3.length > 0) {
                            dgrid3.addRows(allRows3);
                            console.log("带出采购策划数据:", allRows3);
                            dgrid3.refreshView();
                        }
                    }
                })
                //征拆计划
                var allRows4 = [];
                $NG.execServer("zxplfxbg_zcjh", { pc: phid_pc }, function (res) {
                    console.log("res:", res);
                    if (res.count > 0) {
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        for (let i = 0; i < data.length; i++) {
                            const ex = data[i].extendObjects || {};
                            const rowData = {
                                u_kdmc: ex.u_kdmc || null,
                                u_jhwcsj: ex.u_jhwcsj || null
                            }
                            allRows4.push(rowData);
                        }
                        if (allRows4.length > 0) {
                            dgrid4.addRows(allRows4);
                            console.log("带出征拆计划数据:", allRows4);
                            dgrid4.refreshView();
                        }
                    }
                })
                //设计策划（树）
                //固定三个父级节点
                const parents = [
                    { s_tree_id: '1', s_tree_no: '1', s_tree_name: '图纸需求', u_kdmc: '图纸需求', s_tree_pid: '0', children: [] },
                    { s_tree_id: '2', s_tree_no: '2', s_tree_name: '图审完成', u_kdmc: '图审完成', s_tree_pid: '0', children: [] },
                    { s_tree_id: '3', s_tree_no: '3', s_tree_name: '限额设计', u_kdmc: '限额设计', s_tree_pid: '0', children: [] }
                ];

                const p1 = new Promise((resolve) => {
                    $NG.execServer("zxplfxbg_sjch_tzxq", { pc: phid_pc }, function (res) {
                        resolve(res);
                    });
                });
                const p2 = new Promise((resolve) => {
                    $NG.execServer("zxplfxbg_sjch_tswc", { pc: phid_pc }, function (res) {
                        resolve(res);
                    });
                });
                const p3 = new Promise((resolve) => {
                    $NG.execServer("zxplfxbg_sjch_xesj", { pc: phid_pc }, function (res) {
                        resolve(res);
                    });
                });

                Promise.all([p1, p2, p3]).then(([res1, res2, res3]) => {
                    dgrid6.clearRows();
                    let flatData = [...parents];

                    // 图纸需求数据
                    if (res1.count > 0) {
                        const data = typeof res1.data === 'string' ? JSON.parse(res1.data) : res1.data;
                        console.log("图纸需求数据:", data);
                        data.forEach((item, index) => {
                            const ex = item.extendObjects || {};
                            flatData.push({
                                s_tree_id: `1-${index + 1}`,
                                s_tree_no: `1-${index + 1}`,
                                s_tree_pid: '1',
                                s_tree_name: ex.s_tree_name,
                                u_kdmc: ex.s_tree_name,
                                u_jhwcsj: ex.u_jhwcsj || null
                            });
                        });
                    }

                    // 图审完成数据
                    if (res2.count > 0) {
                        const data = typeof res2.data === 'string' ? JSON.parse(res2.data) : res2.data;
                        console.log("图审完成数据:", data);
                        data.forEach((item, index) => {
                            const ex = item.extendObjects || {};
                            flatData.push({
                                s_tree_id: `2-${index + 1}`,
                                s_tree_no: `2-${index + 1}`,
                                s_tree_pid: '2',
                                s_tree_name: ex.s_tree_name,
                                u_kdmc: ex.s_tree_name,
                                u_jhwcsj: ex.u_jhwcsj || null
                            });
                        });
                    }

                    // 限额设计数据
                    if (res3.count > 0) {
                        const data = typeof res3.data === 'string' ? JSON.parse(res3.data) : res3.data;
                        console.log("限额设计数据:", data);
                        data.forEach((item, index) => {
                            const ex = item.extendObjects || {};
                            flatData.push({
                                s_tree_id: `3-${index + 1}`,
                                s_tree_no: `3-${index + 1}`,
                                s_tree_pid: '3',
                                s_tree_name: ex.s_tree_name,
                                u_kdmc: ex.s_tree_name,
                                u_xsjdkzz: ex.u_xsjdkzz || null
                            });
                        });
                    }

                    const treeData = flatArrayToTree(flatData);
                    if (treeData.length > 0) {
                        dgrid6.addRows(treeData);
                        console.log("带出设计策划树形数据:", treeData);
                        setTimeout(() => {
                            const maxDepth = getTreeMaxDepth(treeData);
                            expandAllLevels(dgrid6, maxDepth);
                            dgrid6.refreshView();
                        }, 100);
                    }
                });
            }
            //技术质量策划
            var allRows7 = [];
            $NG.execServer("zxplfxbg_jszlch", { pc: phid_pc }, function (res) {
                console.log("技术质量策划 res:", res);
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    for (let i = 0; i < data.length; i++) {
                        const ex = data[i].extendObjects || {};
                        const rowData = {
                            u_kdmc: ex.u_kdmc || null,
                            u_jhwcsj: ex.u_jhwcsj || null
                        }
                        allRows7.push(rowData);
                    }
                    if (allRows7.length > 0) {
                        dgrid7.addRows(allRows7);
                        console.log("带出技术质量策划数据:", allRows7);
                        dgrid7.refreshView();
                    }
                }
            })
            //成本策划
            const p_ysbz = new Promise(resolve => {
                $NG.execServer("zxplfxbg_cbch_ysbz", { pc: phid_pc }, resolve);
            });
            const p_zyfb = new Promise(resolve => {
                $NG.execServer("zxplfxbg_cbch_zyfb", { pc: phid_pc }, resolve);
            });
            const p_lwfb = new Promise(resolve => {
                $NG.execServer("zxplfxbg_cbch_lwfb", { pc: phid_pc }, resolve);
            });
            const p_clf = new Promise(resolve => {
                $NG.execServer("zxplfxbg_cbch_clf", { pc: phid_pc }, resolve);
            });
            const p_jxf = new Promise(resolve => {
                $NG.execServer("zxplfxbg_cbch_jxf", { pc: phid_pc }, resolve);
            });
            const p_lsf = new Promise(resolve => {
                $NG.execServer("zxplfxbg_cbch_lsf", { pc: phid_pc }, resolve);
            });
            const p_aqscf = new Promise(resolve => {
                $NG.execServer("zxplfxbg_cbch_aqscf", { pc: phid_pc }, resolve); // 注意：原代码此处使用clf接口，可能需确认
            });
            const p_glf = new Promise(resolve => {
                $NG.execServer("zxplfxbg_cbch_glf", { pc: phid_pc }, resolve); // 注意：原代码此处使用clf接口，可能需确认
            });
            const p_qtfw = new Promise(resolve => {
                $NG.execServer("zxplfxbg_cbch_qtfw", { pc: phid_pc }, resolve); // 注意：原代码此处使用clf接口，可能需确认
            });
            const p_ynsj = new Promise(resolve => {
                $NG.execServer("zxplfxbg_cbch_ynsj", { pc: phid_pc }, resolve);
            });
            const p_eccx = new Promise(resolve => {
                $NG.execServer("zxplfxbg_cbch_eccx", { pc: phid_pc }, resolve);
            });

            Promise.all([p_ysbz, p_zyfb, p_lwfb, p_clf, p_jxf, p_lsf, p_aqscf, p_glf, p_qtfw, p_ynsj, p_eccx]).then(results => {
                const [r_ysbz, r_zyfb, r_lwfb, r_clf, r_jxf, r_lsf, r_aqscf, r_glf, r_qtfw, r_ynsj, r_eccx] = results;
                const allRows8 = [];

                const processData = (res, kdmc, field) => {
                    let val = null;
                    if (res && res.count > 0) {
                        try {
                            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            console.log(`带出${kdmc}数据:`, data);
                            if (data && data.length > 0) {
                                const ex = data[0].extendObjects || {};
                                val = ex[field] || null;
                            }
                        } catch (e) {
                            console.error(`解析${kdmc}数据失败:`, e);
                        }
                    }
                    const row = { u_kdmc: kdmc };
                    row[field] = val;
                    return row;
                };

                allRows8.push(processData(r_ysbz, "预算编制", "u_jhwcsj"));
                allRows8.push(processData(r_zyfb, "专业分包责任成本", "u_xsjdkzz"));
                allRows8.push(processData(r_lwfb, "劳务分包责任成本", "u_xsjdkzz"));
                allRows8.push(processData(r_clf, "材料费责任成本", "u_xsjdkzz"));
                allRows8.push(processData(r_jxf, "机械费责任成本", "u_xsjdkzz"));
                allRows8.push(processData(r_aqscf, "安全生产费责任成本", "u_xsjdkzz"));
                allRows8.push(processData(r_lsf, "临设费责任成本", "u_xsjdkzz"));
                allRows8.push(processData(r_qtfw, "其他服务合同责任成本", "u_xsjdkzz"));
                allRows8.push(processData(r_glf, "管理费责任成本", "u_xsjdkzz"));
                allRows8.push(processData(r_ynsj, "应缴税金", "u_xsjdkzz"));
                allRows8.push(processData(r_eccx, "二次创效", "u_xsjdkzz"));

                if (dgrid8 && allRows8.length > 0) {
                    dgrid8.addRows(allRows8);
                    console.log("带出成本策划数据:", allRows8);
                    dgrid8.refreshView();
                } else if (!dgrid8) {
                    console.error("未找到组件[p_form_xmchzxplfxbg_d8]，请检查表单设计中的组件ID是否正确。");
                }
            });
        }, "p_form_xmchzxplfxbg_m.phid_pc");

        useDataIndexChange(({ args, instance }) => {
            console.log("计算进度策划是否超期...")
            const u_jhwcsj = args[0].u_jhwcsj;
            const u_sjwcsj = args[0].u_sjwcsj;
            // console.log("计划完成时间", u_jhwcsj);
            // console.log("实际完成时间", u_sjwcsj);
            if (u_jhwcsj && u_sjwcsj) {
                const planTime1 = new Date(u_jhwcsj).setHours(0, 0, 0, 0); // 强制重置为当天0点0分0秒
                const actualTime1 = new Date(u_sjwcsj).setHours(0, 0, 0, 0);
                if (actualTime1 > planTime1) {
                    args[0].u_sfcq = "01";
                } else {
                    args[0].u_sfcq = "02";
                }
            }
            //console.log("是否超期：", args[0].u_sfcq);
            instance.updateRow(args[0]);

        }, ['p_form_xmchzxplfxbg_d1.u_sjwcsj']);
        useDataIndexChange(({ args, instance }) => {
            console.log("计算分包招标策划是否超期...")
            const u_jhwcsj = args[0].u_jhwcsj;
            const u_sjwcsj = args[0].u_sjwcsj;
            if (u_jhwcsj && u_sjwcsj) {
                const planTime2 = new Date(u_jhwcsj).setHours(0, 0, 0, 0); // 强制重置为当天0点0分0秒
                const actualTime2 = new Date(u_sjwcsj).setHours(0, 0, 0, 0);
                if (actualTime2 > planTime2) {
                    args[0].u_sfcq = "01";
                } else {
                    args[0].u_sfcq = "02";
                }
            }
            instance.updateRow(args[0]);

        }, ['p_form_xmchzxplfxbg_d2.u_sjwcsj']);
        useDataIndexChange(({ args, instance }) => {
            console.log("计算采购策划是否超期...")
            const u_jhwcsj = args[0].u_jhwcsj;
            const u_sjwcsj = args[0].u_sjwcsj;
            if (u_jhwcsj && u_sjwcsj) {
                const planTime3 = new Date(u_jhwcsj).setHours(0, 0, 0, 0); // 强制重置为当天0点0分0秒
                const actualTime3 = new Date(u_sjwcsj).setHours(0, 0, 0, 0);
                if (actualTime3 > planTime3) {
                    args[0].u_sfcq = "01";
                } else {
                    args[0].u_sfcq = "02";
                }
            }
            instance.updateRow(args[0]);

        }, ['p_form_xmchzxplfxbg_d3.u_sjwcsj']);
        useDataIndexChange(({ args, instance }) => {
            console.log("计算征拆计划是否超期...")
            const u_jhwcsj = args[0].u_jhwcsj;
            const u_sjwcsj = args[0].u_sjwcsj;
            if (u_jhwcsj && u_sjwcsj) {
                const planTime4 = new Date(u_jhwcsj).setHours(0, 0, 0, 0); // 强制重置为当天0点0分0秒
                const actualTime4 = new Date(u_sjwcsj).setHours(0, 0, 0, 0);
                if (actualTime4 > planTime4) {
                    args[0].u_sfcq = "01";
                } else {
                    args[0].u_sfcq = "02";
                }
            }
            instance.updateRow(args[0]);

        }, ['p_form_xmchzxplfxbg_d4.u_sjwcsj']);
        useDataIndexChange(({ args, instance }) => {
            console.log("计算设计策划是否超期...")
            const u_jhwcsj = args[0].u_jhwcsj;
            const u_sjwcsj = args[0].u_sjwcsj;
            if (u_jhwcsj && u_sjwcsj) {
                const planTime6 = new Date(u_jhwcsj).setHours(0, 0, 0, 0); // 强制重置为当天0点0分0秒
                const actualTime6 = new Date(u_sjwcsj).setHours(0, 0, 0, 0);
                if (actualTime6 > planTime6) {
                    args[0].u_sfcq = "01";
                } else {
                    args[0].u_sfcq = "02";
                }
            }
            instance.updateRow(args[0]);

        }, ['p_form_xmchzxplfxbg_d6.u_sjwcsj']);
        useDataIndexChange(({ args, instance }) => {
            console.log("计算技术质量策划是否超期...")
            const u_jhwcsj = args[0].u_jhwcsj;
            const u_sjwcsj = args[0].u_sjwcsj;
            if (u_jhwcsj && u_sjwcsj) {
                const planTime7 = new Date(u_jhwcsj).setHours(0, 0, 0, 0); // 强制重置为当天0点0分0秒
                const actualTime7 = new Date(u_sjwcsj).setHours(0, 0, 0, 0);
                if (actualTime7 > planTime7) {
                    args[0].u_sfcq = "01";
                } else {
                    args[0].u_sfcq = "02";
                }
            }
            instance.updateRow(args[0]);

        }, ['p_form_xmchzxplfxbg_d7.u_sjwcsj']);
        useDataIndexChange(({ args, instance }) => {
            console.log("计算成本策划是否超期...")
            const u_jhwcsj = args[0].u_jhwcsj;
            const u_sjwcsj = args[0].u_sjwcsj;
            if (u_jhwcsj && u_sjwcsj) {
                const planTime9 = new Date(u_jhwcsj).setHours(0, 0, 0, 0); // 强制重置为当天0点0分0秒
                const actualTime9 = new Date(u_sjwcsj).setHours(0, 0, 0, 0);
                if (actualTime9 > planTime9) {
                    args[0].u_sfcq = "01";
                } else {
                    args[0].u_sfcq = "02";
                }
            }
            instance.updateRow(args[0]);

        }, ['p_form_xmchzxplfxbg_d9.u_sjwcsj']);

        useDataIndexChange(({ args, instance }) => {
            console.log("计算分包招标策划是否在控制范围内...")
            const u_xsjdkzz = args[0].u_xsjdkzz;
            const u_sjfsz = args[0].u_sjfsz;
            if (u_xsjdkzz && u_sjfsz) {
                if (u_sjfsz >= u_xsjdkzz) {
                    args[0].u_sfzkzfwn = "02";
                } else {
                    args[0].u_sfzkzfwn = "01";
                }
            }
            instance.updateRow(args[0]);

        }, ['p_form_xmchzxplfxbg_d2.u_sjfsz']);
        useDataIndexChange(({ args, instance }) => {
            console.log("计算资源配置计划是否在控制范围内...")
            const u_xsjdkzz = args[0].u_xsjdkzz;
            const u_sjfsz = args[0].u_sjfsz;
            if (u_xsjdkzz && u_sjfsz) {
                if (u_sjfsz >= u_xsjdkzz) {
                    args[0].u_sfzkzfwn = "02";
                } else {
                    args[0].u_sfzkzfwn = "01";
                }
            }
            instance.updateRow(args[0]);

        }, ['p_form_xmchzxplfxbg_d5.u_sjfsz']);
        useDataIndexChange(({ args, instance }) => {
            console.log("计算设计策划是否在控制范围内...")
            const u_xsjdkzz = args[0].u_xsjdkzz;
            const u_sjfsz = args[0].u_sjfsz;
            if (u_xsjdkzz && u_sjfsz) {
                if (u_sjfsz >= u_xsjdkzz) {
                    args[0].u_sfzkzfwn = "02";
                } else {
                    args[0].u_sfzkzfwn = "01";
                }
            }
            instance.updateRow(args[0]);

        }, ['p_form_xmchzxplfxbg_d6.u_sjfsz']);
        useDataIndexChange(({ args, instance }) => {
            console.log("计算成本策划是否在控制范围内...")
            const u_xsjdkzz = args[0].u_xsjdkzz;
            const u_sjfsz = args[0].u_sjfsz;
            console.log("成本策划的序时进度控制值:", u_xsjdkzz);
            console.log("成本策划的实际进度值:", u_sjfsz);

            if (u_xsjdkzz && u_sjfsz) {
                if (u_sjfsz >= u_xsjdkzz) {
                    args[0].u_sfzkzfwn = "02";
                } else {
                    args[0].u_sfzkzfwn = "01";
                }
            }
            instance.updateRow(args[0]);

        }, ['p_form_xmchzxplfxbg_d9.u_sjfsz']);

        // 设计策划（树）点击高亮事件，控制列只读
        useAction("clickHighlight")(function (e) {
            const rows = dgrid6.getSelectedData();
            if (rows && rows.length > 0) {
                const row = rows[0];
                // 仅当为限额设计下级（s_tree_pid为'3'）时，u_sjfsz才可编辑
                const isLimitDesignChild = row.s_tree_pid === '3';

                $NG.updateUI(function (updater, state) {
                    if (updater.editGrid && updater.editGrid.p_form_xmchzxplfxbg_d6 && updater.editGrid.p_form_xmchzxplfxbg_d6.u_sjfsz) {
                        updater.editGrid.p_form_xmchzxplfxbg_d6.u_sjfsz.setProps({ disabled: !isLimitDesignChild });
                    }
                });

                // 确保表格非只读
                dgrid6.setReadOnly(false);
            }
        }, "p_form_xmchzxplfxbg_d6");

        // 成本策划点击高亮事件，控制列只读
        useAction("clickHighlight")(function (e) {
            const rows = dgrid8.getSelectedData();

            if (rows && rows.length > 0) {
                const row = rows[0];
                // 仅当为预算编制时，u_sjwcsj才可编辑
                console.log("成本策划点击高亮事件,row.u_kdmc:", row.u_kdmc);

                if (row.u_kdmc == '预算编制') {
                    $NG.updateUI(function (updater, state) {
                        updater.editGrid.p_form_xmchzxplfxbg_d9.u_sjwcsj.setProps({ disabled: false });
                    });
                    console.log("设置 可编辑");
                } else {
                    $NG.updateUI(function (updater, state) {
                        updater.editGrid.p_form_xmchzxplfxbg_d9.u_sjwcsj.setProps({ disabled: true });
                    });
                    console.log("设置 只读");
                }

                // const isBudgetPrep = row.u_kdmc == '预算编制';
                // console.log("输出isBudgetPrep：",isBudgetPrep);
                // $NG.updateUI(function (updater, state) {
                //     updater.editGrid.p_form_xmchzxplfxbg_d9.u_sjwcsj.setProps({ disabled: !isBudgetPrep });
                // });


                // 确保表格非只读
                dgrid8.setReadOnly(false);
            }
        }, "p_form_xmchzxplfxbg_d9");

    }
})

// 转换树形结构
function flatArrayToTree(flatArray, rootId = null) {
    const tree = [];
    const map = {};

    // 首先将所有节点存入map，以s_tree_id为key
    flatArray.forEach(item => {
        map[item.s_tree_id] = { ...item, children: [] };
    });
    // 遍历所有节点，将子节点放入父节点的children数组中
    flatArray.forEach(item => {
        const node = map[item.s_tree_id];
        const parentId = item.s_tree_pid;

        if (parentId === rootId || parentId === null || parentId === undefined || parentId === '' || parentId === '0') {
            tree.push(node);
        } else if (map[parentId]) {
            map[parentId].children.push(node);
        }
    });
    return tree;
}

// 计算树形结构的最大深度
function getTreeMaxDepth(nodes, currentDepth = 1) {
    let maxDepth = currentDepth;
    nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
            const childDepth = getTreeMaxDepth(node.children, currentDepth + 1);
            maxDepth = Math.max(maxDepth, childDepth);
        }
    });
    return maxDepth;
}

// 逐层展开所有层级
function expandAllLevels(dgrid, maxDepth) {
    function expandRecursive(currentLevel) {
        if (currentLevel < maxDepth) {
            dgrid.setExpand();
            setTimeout(() => {
                expandRecursive(currentLevel + 1);
            }, 50);
        }
    }
    expandRecursive(1);
}