$NG.AllReady(function (editPage, {
    useValuesChange, useDataIndexChange, useUpdateRow, useUpdateRows, useAction, useClick, useBeforeClick, updateUI
}) {
    var mstform = $NG.getCmpApi('p_form_0000000092_m');
    var dgrid = $NG.getCmpApi('p_form_0000000092_d');
    var toolbar = $NG.getCmpApi('toolbar_top');

    let gkms = ''; // 第二章管控模式
    let zrcb = '0'; // 第二章责任成本
    let hjzrcb = '0'; // 合计行责任成本

    let xxs = '0'; // 销项税 取 目标成本测算的 计划成本编制 里面的 项目成本汇总  税金合计的预算收入
    let kdkjxs = '0'; // 可抵扣进项税 取 目标成本测算的 计划成本编制 里面的 项目成本汇总  进项税的的目标成本
    var xxshtsr;
    var kdkcbhj;

    // 标记是否首次加载数据
    //let isInitialLoad = true;
    //新增和编辑状态时的逻辑计算

    // useAction("clickHighlight")(function (e) {
    //     const row = dgrid.getSelectedData();
    //     console.log("row==============>", row);
    //     $NG.updateUI(function (updater, layout) {
    //         // 按照数据行设置明细表的字段remark为不可编辑
    //         if (!row.s_tree_name) {
    //             updater.grid.p_form_0000000092_d.s_tree_name.setProps((p) => {
    //                 return { ...p, editor: { ...p.editor, disabled: false } };
    //             });
    //         } else {
    //             updater.grid.p_form_0000000092_d.s_tree_name.setProps((p) => {
    //                 return { ...p, editor: { ...p.editor, disabled: true } };
    //             });
    //         }
    //     });
    // }, 'p_form_0000000092_d');

    console.log("===");
    // useDataIndexChange(({ args, instance }) => {
    //     console.log("计算含税合价中...")
    //     const u_jhcbcbhj = args[0].u_jhcbcbhj;
    //     const u_intax_rate_jhcb = args[0].u_intax_rate_jhcb;
    //     console.log("不含税合价:", u_jhcbcbhj);
    //     console.log("税率:", u_intax_rate_jhcb);
    //     args[0].u_amt_vat_jhcb = u_jhcbcbhj * (1 + u_intax_rate_jhcb);
    //     instance.updateRow(args[0]);

    // }, 'u_intax_rate_jhcb');
    // useUpdateRow(({ args, table }) => {
    //     console.log("计算含税合价中...")
    //     const record = args[0];
    //     //预估总价
    //     console.log("不含税合价:", record.u_jhcbcbhj);
    //     console.log("税率:", record.u_intax_rate_jhcb);
    //     if (record.u_jhcbcbhj && record.u_intax_rate_jhcb) {
    //         record.u_amt_vat_jhcb = (
    //             parseFloat(record.u_jhcbcbhj) * (1 + parseFloat(record.u_intax_rate_jhcb))
    //         ).toFixed(2);
    //         console.log("含税合价:", record.u_amt_vat_jhcb);
    //     }
    //     table.updateRow(record);
    // })

    if (editPage.oType == "add") {  // 新增状态
        const phid_pc = mstform.getValues().phid_pc;
        if (dgrid.getRows().length == 0) {
            setTimeout(() => {

                /**弃用的树形 */
                /*$NG.execServer("jhcbewdzbdbdthygh", { 'pc': phid_pc }, (res) => {
                    console.log("phid_pc===============>", phid_pc);
                    // 先检查res.data是否已经是对象
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log('data', data)
                    const targetData = data?.map((item) => {
                        return { ...item.extendObjects }
                    })?.reverse();
                    const treeData = flatArrayToTree(targetData)
         
                    // 首次加载时设置标记
                    isInitialLoad = true;
         
                    // 计算父节点的值（子节点值合计到父节点）
                    calculateParentValues(treeData);
                    dgrid.addRows(treeData)
                    setTimeout(() => {
                        // 计算treeData的最大深度
                        const maxDepth = getTreeMaxDepth(treeData);
                        // 逐层展开所有层级
                        expandAllLevels(dgrid, maxDepth);
                        setTimeout(() => {
                            var rows = dgrid.getRows();
                            if (rows) {
                                rows.forEach(row => {
                                    const updatedRow = calculateRowValues(row, isInitialLoad);
                                    dgrid.updateRow(updatedRow);
                                });
                                dgrid.refreshView();
                            }
         
                            // 首次加载完成后重置标记
                            isInitialLoad = false;
                        }, 100)
                    }, 100)
                });*/

                if (phid_pc) {
                    /**取合约包划分的树形 */
                    $NG.execServer("qhybhfdsx", { 'pc': phid_pc }, (ressx) => {
                        if (ressx.count > 0) {
                            console.log("phid_pc===============>", phid_pc);
                            var ressxdata = typeof ressx.data === 'string' ? JSON.parse(ressx.data) : ressx.data;
                            if (ressxdata.length > 0) {
                                /**金额取动态合约规划 */
                                $NG.execServer("jhcbewdzbdbdthygh", { 'pc': phid_pc }, (resje) => {
                                    if (resje.count > 0) {
                                        var resjedata = typeof resje.data === 'string' ? JSON.parse(resje.data) : resje.data;
                                        if (resjedata.length > 0) {
                                            console.log('resjedata=========>', resjedata)
                                            for (let i = 0; i < ressx.count; i++) {
                                                for (let n = 0; n < resje.count; n++) {
                                                    if (ressxdata[i].extendObjects.s_tree_name == resjedata[n].extendObjects.s_tree_name) {
                                                        ressxdata[i].extendObjects.u_htsryjhtsr = resjedata[n].extendObjects.u_htsryjhtsr;
                                                        ressxdata[i].extendObjects.u_jhcbcbhj = resjedata[n].extendObjects.u_jhcbcbhj;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    /**责任成本取责任成本下达 */
                                    $NG.execServer("zrcbqzrcbxd", { 'pc': phid_pc }, (reszr) => {
                                        if (reszr.count > 0) {
                                            var reszrdata = typeof reszr.data === 'string' ? JSON.parse(reszr.data) : reszr.data;
                                            if (reszrdata.length > 0) {
                                                console.log('reszrdata=========>', reszrdata)
                                                for (let i = 0; i < ressx.count; i++) {
                                                    for (let n = 0; n < reszr.count; n++) {
                                                        if (ressxdata[i].extendObjects.s_tree_name == reszrdata[n].extendObjects.s_tree_name) {
                                                            ressxdata[i].extendObjects.u_amt_vat_zrcb = reszrdata[n].extendObjects.u_amt_vat_zrcb;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        /**构建树形结构 */
                                        var targetData = ressxdata?.map((item) => {
                                            return { ...item.extendObjects }
                                        });
                                        var treeData = flatArrayToTree(targetData)

                                        // 首次加载时设置标记
                                        //isInitialLoad = true;

                                        dgrid.addRows(treeData)
                                        setTimeout(() => {
                                            // 计算treeData的最大深度
                                            const maxDepth = getTreeMaxDepth(treeData);
                                            // 逐层展开所有层级
                                            expandAllLevels(dgrid, maxDepth);
                                            setTimeout(() => {
                                                var rows = dgrid.getRows();
                                                if (rows) {
                                                    // 特殊处理：重新计算所有节点的u_amt_vat_jhcb汇总
                                                    recalculateAmtVatJhcbFromLeafNodes(dgrid);

                                                    rows.forEach(row => {
                                                        xxshtsr = xxshtsrupdate(row, xxshtsr);
                                                        kdkcbhj = kdkcbhjupdate(row, kdkcbhj);
                                                        const updatedRow = calculateRowValues(row, xxshtsr, kdkcbhj);
                                                        dgrid.updateRow(updatedRow);
                                                    });
                                                    dgrid.refreshView();
                                                }
                                                // 首次加载完成后重置标记
                                                //isInitialLoad = false;
                                            }, 100)
                                        }, 100)
                                    })
                                })
                            }
                        }
                    });

                    $NG.execServer("hqdezzrcb", { 'pc': phid_pc }, (res) => {
                        // 先检查res.data是否已经是对象
                        if (res.count > 0) {
                            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            if (data.length > 0) {
                                gkms = data[0].extendObjects.u_gkms;
                            }
                        }

                    });

                    setTimeout(() => {
                        if (gkms == 1) {
                            $NG.execServer("jhcbcsyssr", { 'pc': phid_pc }, (res) => {
                                // 先检查res.data是否已经是对象
                                if (res.count > 0) {
                                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                                    if (data.length > 0) {
                                        xxs = data[0].extendObjects.total_amt;
                                        $NG.execServer("jhcbcsmbcb", { 'pc': phid_pc }, (res) => {
                                            if (res.count > 0) {
                                                // 先检查res.data是否已经是对象
                                                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                                                if (data.length > 0) {
                                                    kdkjxs = data[0].extendObjects.total_tax;

                                                    // 获取表格API
                                                    const dgrid = $NG.getCmpApi('p_form_0000000092_d');
                                                    // 更新税金行
                                                    updateTaxRows(dgrid, xxs, kdkjxs);
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                            //更新调整后预计收入                         
                            //$NG.getCmpApi('p_form_con_plan_m').getValues().phid
                            $NG.execServer("get_p_form_0000000092_m_srcj", { phid_pc: phid_pc }, function (res) {
                                if (res.count > 0) {
                                    const data = JSON.parse(res.data);
                                    if (data.length > 0) {
                                        // 更新 p_form_0000000092_d 表的 u_cnt_income_adjust 字段，处理树形结构
                                        $NG.updateState(function (updater, state) {
                                            const updateRow = (row) => {
                                                const match = data.find(item => item.extendObjects.u_cbys === row.s_tree_name);
                                                if (match) {
                                                    row.u_cnt_income_adjust = match.extendObjects.u_srje;
                                                }
                                                // 如果当前行有子节点，递归更新子节点
                                                if (row.children && row.children.length > 0) {
                                                    row.children = row.children.map(child => updateRow(child));
                                                }
                                                return row;
                                            };

                                            const updatedData = state.data.p_form_0000000092_d.map(row => updateRow(row));
                                            updater.data.p_form_0000000092_d.setProps(updatedData);
                                        });
                                    }
                                }
                            });

                        }
                    }, 100)
                }
            }, 100);
        }

        useValuesChange(({ args }) => {
            var u_is_bl = mstform.getValues().u_is_bl;
            if (u_is_bl == 2) {
                $NG.updateUI(function (updater, layout) {
                    updater.grid.p_form_0000000092_d.u_rest_ewdzb.setProps({
                        hidden: true,
                    });
                    updater.grid.p_form_0000000092_d.u_signed_cnt_ewdzb.setProps({
                        hidden: true,
                    });
                    updater.grid.p_form_0000000092_d.u_signed_cnt_ewdkdkjxs.setProps({
                        hidden: true,
                    });
                });
            }
        }, "p_form_0000000092_m.u_is_bl");
    } else if (editPage.oType == "edit") {  // 修改状态
        const phid_pc = mstform.getValues().phid_pc;
        if (dgrid.getRows().length == 0) {
            setTimeout(() => {

                /**弃用的树形 */
                /*$NG.execServer("jhcbewdzbdbdthygh", { 'pc': phid_pc }, (res) => {
                    console.log("phid_pc===============>", phid_pc);
                    // 先检查res.data是否已经是对象
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log('data', data)
                    const targetData = data?.map((item) => {
                        return { ...item.extendObjects }
                    })?.reverse();
                    const treeData = flatArrayToTree(targetData)
         
                    // 首次加载时设置标记
                    isInitialLoad = true;
         
                    // 计算父节点的值（子节点值合计到父节点）
                    calculateParentValues(treeData);
                    dgrid.addRows(treeData)
                    setTimeout(() => {
                        // 计算treeData的最大深度
                        const maxDepth = getTreeMaxDepth(treeData);
                        // 逐层展开所有层级
                        expandAllLevels(dgrid, maxDepth);
                        setTimeout(() => {
                            var rows = dgrid.getRows();
                            if (rows) {
                                rows.forEach(row => {
                                    const updatedRow = calculateRowValues(row, isInitialLoad);
                                    dgrid.updateRow(updatedRow);
                                });
                                dgrid.refreshView();
                            }
         
                            // 首次加载完成后重置标记
                            isInitialLoad = false;
                        }, 100)
                    }, 100)
                });*/

                /**取合约包划分的树形 */
                $NG.execServer("qhybhfdsx", { 'pc': phid_pc }, (ressx) => {
                    if (ressx.count > 0) {
                        console.log("phid_pc===============>", phid_pc);
                        var ressxdata = typeof ressx.data === 'string' ? JSON.parse(ressx.data) : ressx.data;
                        if (ressxdata.length > 0) {
                            /**金额取动态合约规划 */
                            $NG.execServer("jhcbewdzbdbdthygh", { 'pc': phid_pc }, (resje) => {
                                if (resje.count > 0) {
                                    var resjedata = typeof resje.data === 'string' ? JSON.parse(resje.data) : resje.data;
                                    if (resjedata.length > 0) {
                                        console.log('resjedata=========>', resjedata)
                                        for (let i = 0; i < ressx.count; i++) {
                                            for (let n = 0; n < resje.count; n++) {
                                                if (ressxdata[i].extendObjects.s_tree_name == resjedata[n].extendObjects.s_tree_name) {
                                                    ressxdata[i].extendObjects.u_htsryjhtsr = resjedata[n].extendObjects.u_htsryjhtsr;
                                                    ressxdata[i].extendObjects.u_jhcbcbhj = resjedata[n].extendObjects.u_jhcbcbhj;
                                                }
                                            }
                                        }
                                    }
                                }
                                /**责任成本取责任成本下达 */
                                $NG.execServer("zrcbqzrcbxd", { 'pc': phid_pc }, (reszr) => {
                                    if (reszr.count > 0) {
                                        var reszrdata = typeof reszr.data === 'string' ? JSON.parse(reszr.data) : reszr.data;
                                        if (reszrdata.length > 0) {
                                            console.log('reszrdata=========>', reszrdata)
                                            for (let i = 0; i < ressx.count; i++) {
                                                for (let n = 0; n < reszr.count; n++) {
                                                    if (ressxdata[i].extendObjects.s_tree_name == reszrdata[n].extendObjects.s_tree_name) {
                                                        ressxdata[i].extendObjects.u_amt_vat_zrcb = reszrdata[n].extendObjects.u_amt_vat_zrcb;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    /**构建树形结构 */
                                    var targetData = ressxdata?.map((item) => {
                                        return { ...item.extendObjects }
                                    });
                                    var treeData = flatArrayToTree(targetData)

                                    // 首次加载时设置标记
                                    //isInitialLoad = true;

                                    dgrid.addRows(treeData)
                                    setTimeout(() => {
                                        // 计算treeData的最大深度
                                        const maxDepth = getTreeMaxDepth(treeData);
                                        // 逐层展开所有层级
                                        expandAllLevels(dgrid, maxDepth);
                                        setTimeout(() => {
                                            var rows = dgrid.getRows();
                                            if (rows) {
                                                // 特殊处理：重新计算所有节点的u_amt_vat_jhcb汇总
                                                recalculateAmtVatJhcbFromLeafNodes(dgrid);

                                                rows.forEach(row => {
                                                    xxshtsr = xxshtsrupdate(row, xxshtsr);
                                                    kdkcbhj = kdkcbhjupdate(row, kdkcbhj);
                                                    const updatedRow = calculateRowValues(row, xxshtsr, kdkcbhj);
                                                    dgrid.updateRow(updatedRow);
                                                });
                                                dgrid.refreshView();
                                            }
                                            // 首次加载完成后重置标记
                                            //isInitialLoad = false;
                                        }, 100)
                                    }, 100)
                                })
                            })
                        }
                    }
                });

                $NG.execServer("hqdezzrcb", { 'pc': phid_pc }, (res) => {
                    // 先检查res.data是否已经是对象
                    if (res.count > 0) {
                        const data = JSON.parse(res.data);
                        if (data.length > 0) {
                            //const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            zrcb = data[0].extendObjects.zrcb;
                            gkms = data[0].extendObjects.u_gkms;
                        }
                    }
                });

                setTimeout(() => {
                    if (gkms == 1) {
                        $NG.execServer("jhcbcsyssr", { 'pc': phid_pc }, (res) => {
                            if (res.count > 0) {
                                // 先检查res.data是否已经是对象
                                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                                if (data.length > 0) {
                                    xxs = data[0].extendObjects.total_amt;

                                    $NG.execServer("jhcbcsmbcb", { 'pc': phid_pc }, (res) => {
                                        if (res.count > 0) {
                                            // 先检查res.data是否已经是对象
                                            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                                            if (data.length > 0) {
                                                kdkjxs = data[0].extendObjects.total_tax;
                                                // 获取表格API
                                                const dgrid = $NG.getCmpApi('p_form_0000000092_d');
                                                // 更新税金行
                                                updateTaxRows(dgrid, xxs, kdkjxs);
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                    //更新调整后预计收入                         
                    //$NG.getCmpApi('p_form_con_plan_m').getValues().phid
                    $NG.execServer("get_p_form_0000000092_m_srcj", { phid_pc: phid_pc }, function (res) {
                        if (res.count > 0) {
                            const data = JSON.parse(res.data);
                            if (data.length > 0) {
                                // 更新 p_form_0000000092_d 表的 u_cnt_income_adjust 字段，处理树形结构
                                $NG.updateState(function (updater, state) {
                                    const updateRow = (row) => {
                                        const match = data.find(item => item.extendObjects.u_cbys === row.s_tree_name);
                                        if (match) {
                                            row.u_cnt_income_adjust = match.extendObjects.u_srje;
                                        }
                                        // 如果当前行有子节点，递归更新子节点
                                        if (row.children && row.children.length > 0) {
                                            row.children = row.children.map(child => updateRow(child));
                                        }
                                        return row;
                                    };

                                    const updatedData = state.data.p_form_0000000092_d.map(row => updateRow(row));
                                    updater.data.p_form_0000000092_d.setProps(updatedData);
                                });
                            }
                        }
                    });
                }, 100)


            }, 100);
        } else {
            setTimeout(() => {
                var rows = dgrid.getRows();
                // 过滤掉合计行，计算实际树形数据的最大深度
                const treeData = rows.filter(row => !row.s_tree_name || row.s_tree_name !== '合计');
                const maxDepth = getTreeMaxDepth(treeData);
                expandAllLevels(dgrid, maxDepth);
                var rows = dgrid.getRows();
                if (rows) {
                    // 特殊处理：重新计算所有节点的u_amt_vat_jhcb汇总
                    recalculateAmtVatJhcbFromLeafNodes(dgrid);

                    rows.forEach(row => {
                        // 非首次加载，不更新u_ewdjdlzb
                        xxshtsr = xxshtsrupdate(row, xxshtsr);
                        kdkcbhj = kdkcbhjupdate(row, kdkcbhj);
                        const updatedRow = calculateRowValues(row, xxshtsr, kdkcbhj);
                        dgrid.updateRow(updatedRow);
                    });
                    dgrid.refreshView();
                }

                $NG.execServer("hqdezzrcb", { 'pc': phid_pc }, (res) => {
                    // 先检查res.data是否已经是对象
                    if (res.count > 0) {
                        const data = JSON.parse(res.data);
                        if (data.length > 0) {
                            //const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            zrcb = data[0].extendObjects.zrcb;
                            gkms = data[0].extendObjects.u_gkms;
                        }
                    }
                });

                setTimeout(() => {
                    if (gkms == 1) {
                        $NG.execServer("jhcbcsyssr", { 'pc': phid_pc }, (res) => {
                            // 先检查res.data是否已经是对象
                            if (res.count > 0) {
                                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                                if (data.length > 0) {
                                    xxs = data[0].extendObjects.total_amt;

                                    $NG.execServer("jhcbcsmbcb", { 'pc': phid_pc }, (res) => {
                                        // 先检查res.data是否已经是对象
                                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                                        kdkjxs = data[0].extendObjects.total_tax;

                                        // 获取表格API
                                        const dgrid = $NG.getCmpApi('p_form_0000000092_d');
                                        // 更新税金行
                                        updateTaxRows(dgrid, xxs, kdkjxs);
                                    });
                                }
                            }
                        });
                    }
                    //更新调整后预计收入                         
                    //$NG.getCmpApi('p_form_con_plan_m').getValues().phid
                    $NG.execServer("get_p_form_0000000092_m_srcj", { phid_pc: phid_pc }, function (res) {
                        if (res.count > 0) {
                            const data = JSON.parse(res.data);
                            if (data.length > 0) {
                                // 更新 p_form_0000000092_d 表的 u_cnt_income_adjust 字段，处理树形结构
                                $NG.updateState(function (updater, state) {
                                    const updateRow = (row) => {
                                        const match = data.find(item => item.extendObjects.u_cbys === row.s_tree_name);
                                        if (match) {
                                            row.u_cnt_income_adjust = match.extendObjects.u_srje;
                                        }
                                        // 如果当前行有子节点，递归更新子节点
                                        if (row.children && row.children.length > 0) {
                                            row.children = row.children.map(child => updateRow(child));
                                        }
                                        return row;
                                    };

                                    const updatedData = state.data.p_form_0000000092_d.map(row => updateRow(row));
                                    updater.data.p_form_0000000092_d.setProps(updatedData);
                                });
                            }
                        }
                    });
                }, 100)

            }, 100)
        }

        useValuesChange(({ args }) => {
            var u_is_bl = mstform.getValues().u_is_bl;
            if (u_is_bl == 2) {
                $NG.updateUI(function (updater, layout) {
                    updater.grid.p_form_0000000092_d.u_rest_ewdzb.setProps({
                        hidden: true,
                    });
                    updater.grid.p_form_0000000092_d.u_signed_cnt_ewdzb.setProps({
                        hidden: true,
                    });
                    updater.grid.p_form_0000000092_d.u_signed_cnt_ewdkdkjxs.setProps({
                        hidden: true,
                    });
                });
            }
        }, "p_form_0000000092_m.u_is_bl");
    }
    useValuesChange(({ args }) => {
        dgrid.clearRows();
        const phid_pc = mstform.getValues().phid_pc;
        setTimeout(() => {

            /**弃用的树形 */
            /*$NG.execServer("jhcbewdzbdbdthygh", { 'pc': phid_pc }, (res) => {
                console.log("phid_pc===============>", phid_pc);
                // 先检查res.data是否已经是对象
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log('data', data)
                const targetData = data?.map((item) => {
                    return { ...item.extendObjects }
                })?.reverse();
                const treeData = flatArrayToTree(targetData)
       
                // 每次主表变化时重置为首次加载
                isInitialLoad = true;
       
                // 计算父节点的值（子节点值合计到父节点）
                calculateParentValues(treeData);
                dgrid.addRows(treeData)
                setTimeout(() => {
                    // 计算treeData的最大深度
                    const maxDepth = getTreeMaxDepth(treeData);
                    // 逐层展开所有层级
                    expandAllLevels(dgrid, maxDepth);
                    setTimeout(() => {
                        var rows = dgrid.getRows();
                        if (rows) {
                            rows.forEach(row => {
                                const updatedRow = calculateRowValues(row, isInitialLoad);
                                dgrid.updateRow(updatedRow);
                            });
                            dgrid.refreshView();
                        }
       
                        // 首次加载完成后重置标记
                        isInitialLoad = false;
                    }, 100)
                }, 100)
            });*/

            /**取合约包划分的树形 */
            $NG.execServer("qhybhfdsx", { 'pc': phid_pc }, (ressx) => {
                if (ressx.count > 0) {
                    console.log("phid_pc===============>", phid_pc);
                    var ressxdata = typeof ressx.data === 'string' ? JSON.parse(ressx.data) : ressx.data;
                    if (ressxdata.length > 0) {
                        /**金额取动态合约规划 */
                        $NG.execServer("jhcbewdzbdbdthygh", { 'pc': phid_pc }, (resje) => {
                            if (resje.count > 0) {
                                var resjedata = typeof resje.data === 'string' ? JSON.parse(resje.data) : resje.data;
                                console.log('resjedata------------->', resjedata)
                                if (resjedata.length > 0) {
                                    console.log('resjedata=========>', resjedata)
                                    for (let i = 0; i < ressx.count; i++) {
                                        for (let n = 0; n < resje.count; n++) {
                                            if (ressxdata[i].extendObjects.s_tree_name == resjedata[n].extendObjects.s_tree_name) {
                                                ressxdata[i].extendObjects.u_htsryjhtsr = resjedata[n].extendObjects.u_htsryjhtsr;
                                                ressxdata[i].extendObjects.u_jhcbcbhj = resjedata[n].extendObjects.u_jhcbcbhj;
                                            }
                                        }
                                    }
                                }
                            }
                            /**责任成本取责任成本下达 */
                            $NG.execServer("zrcbqzrcbxd", { 'pc': phid_pc }, (reszr) => {
                                if (reszr.count > 0) {
                                    var reszrdata = typeof reszr.data === 'string' ? JSON.parse(reszr.data) : reszr.data;
                                    if (reszrdata.length > 0) {
                                        console.log('reszrdata=========>', reszrdata)
                                        for (let i = 0; i < ressx.count; i++) {
                                            for (let n = 0; n < reszr.count; n++) {
                                                if (ressxdata[i].extendObjects.s_tree_name == reszrdata[n].extendObjects.s_tree_name) {
                                                    ressxdata[i].extendObjects.u_amt_vat_zrcb = reszrdata[n].extendObjects.u_amt_vat_zrcb;
                                                }
                                            }
                                        }
                                    }
                                }
                                /**构建树形结构 */
                                var targetData = ressxdata?.map((item) => {
                                    return { ...item.extendObjects }
                                });
                                var treeData = flatArrayToTree(targetData)

                                // 首次加载时设置标记
                                //isInitialLoad = true;

                                dgrid.addRows(treeData)
                                setTimeout(() => {
                                    // 计算treeData的最大深度
                                    const maxDepth = getTreeMaxDepth(treeData);
                                    // 逐层展开所有层级
                                    expandAllLevels(dgrid, maxDepth);
                                    setTimeout(() => {
                                        var rows = dgrid.getRows();
                                        if (rows) {
                                            // 特殊处理：重新计算所有节点的u_amt_vat_jhcb汇总
                                            recalculateAmtVatJhcbFromLeafNodes(dgrid);

                                            rows.forEach(row => {
                                                xxshtsr = xxshtsrupdate(row, xxshtsr);
                                                kdkcbhj = kdkcbhjupdate(row, kdkcbhj);
                                                const updatedRow = calculateRowValues(row, xxshtsr, kdkcbhj);
                                                dgrid.updateRow(updatedRow);
                                            });
                                            dgrid.refreshView();
                                        }
                                        // 首次加载完成后重置标记
                                        //isInitialLoad = false;
                                    }, 100)
                                }, 100)
                            })
                        })
                    }
                }
            });

            $NG.execServer("hqdezzrcb", { 'pc': phid_pc }, (res) => {
                if (res.count > 0) {
                    const data = JSON.parse(res.data);
                    if (data.length > 0) {
                        // 先检查res.data是否已经是对象
                        //const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        //zrcb = data[0].extendObjects.zrcb;
                        gkms = data[0].extendObjects.u_gkms;
                    }
                }
            });

            setTimeout(() => {
                if (gkms == 1) {
                    $NG.execServer("jhcbcsyssr", { 'pc': phid_pc }, (res) => {
                        // 先检查res.data是否已经是对象
                        if (res.count > 0) {
                            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            if (data.length > 0) {
                                xxs = data[0].extendObjects.total_amt;

                                $NG.execServer("jhcbcsmbcb", { 'pc': phid_pc }, (res) => {
                                    // 先检查res.data是否已经是对象
                                    if (res.count > 0) {
                                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                                        if (data.length > 0) {
                                            kdkjxs = data[0].extendObjects.total_tax;

                                            // 获取表格API
                                            const dgrid = $NG.getCmpApi('p_form_0000000092_d');
                                            // 更新税金行
                                            updateTaxRows(dgrid, xxs, kdkjxs);
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
                //更新调整后预计收入                         
                //$NG.getCmpApi('p_form_con_plan_m').getValues().phid
                $NG.execServer("get_p_form_0000000092_m_srcj", { phid_pc: phid_pc }, function (res) {
                    if (res.count > 0) {
                        const data = JSON.parse(res.data);
                        if (data.length > 0) {
                            // 更新 p_form_0000000092_d 表的 u_cnt_income_adjust 字段，处理树形结构
                            $NG.updateState(function (updater, state) {
                                const updateRow = (row) => {
                                    const match = data.find(item => item.extendObjects.u_cbys === row.s_tree_name);
                                    if (match) {
                                        row.u_cnt_income_adjust = match.extendObjects.u_srje;
                                    }
                                    // 如果当前行有子节点，递归更新子节点
                                    if (row.children && row.children.length > 0) {
                                        row.children = row.children.map(child => updateRow(child));
                                    }
                                    return row;
                                };

                                const updatedData = state.data.p_form_0000000092_d.map(row => updateRow(row));
                                updater.data.p_form_0000000092_d.setProps(updatedData);
                            });
                        }
                    }
                });
            }, 100)

        }, 100);
    }, p_form_0000000092_m.phid_pc);

    // 单行数据更新
    useUpdateRow(({ args, table }) => {
        const record = args[0];
        // 跳过特定行的自动计算
        const shouldSkipCalculation =
            record.s_tree_name === "摊销余额及盘点冲抵成本" ||
            record.s_tree_name === "二次经营创效";

        xxshtsr = xxshtsrupdate(record, xxshtsr);
        kdkcbhj = kdkcbhjupdate(record, kdkcbhj);
        const updatedRecord = shouldSkipCalculation
            ? record
            : calculateRowValues(record, xxshtsr, kdkcbhj);
        console.log("updatedRecord===============>", updatedRecord)
        table.updateRow(updatedRecord)

        // 特殊处理：重新计算所有节点的u_amt_vat_jhcb汇总
        recalculateAmtVatJhcbFromLeafNodes(table);

        // 重新计算父节点的值
        setTimeout(() => {
            var rows = table.getRows();
            const treeData = rows.filter(row => !row.s_tree_name || row.s_tree_name !== '合计');
            /**子节点合计汇总到父节点（只计算被修改行的祖先链，避免全表重算） */
            // 仅针对当前被修改的行重新计算父节点汇总
            calculateParentValuesForId(rows, record.s_tree_id);
            if (rows) {
                rows.forEach(row => {

                    // 跳过特定行的计算
                    const shouldSkip =
                        row.s_tree_name === "摊销余额及盘点冲抵成本" ||
                        row.s_tree_name === "二次经营创效";

                    xxshtsr = xxshtsrupdate(row, xxshtsr);
                    kdkcbhj = kdkcbhjupdate(row, kdkcbhj);
                    const updatedRow = shouldSkip ? row : calculateRowValues(row, xxshtsr, kdkcbhj);

                    dgrid.updateRow(updatedRow);
                });
                dgrid.refreshView();
            }
            //更新表格中的所有行
            treeData.forEach(node => {
                table.updateRow(node);
            });

            // 最后更新合计行（会先清空再计算）
            updateTotalRow(table);
            const totalRow = rows.find(row => row.s_tree_name === '合计');
            //hjzrcb = totalRow.u_zrcbcbhj;
        }, 100);
    }, "p_form_0000000092_d");

    // 选择特定行设置只读
    // useAction("clickHighlight")(function (e) {
    //     const row = dgrid.getSelectedData();
    //     console.log("row==============>", row)

    //     /*if (row[0].s_tree_name == "合计") {
    //         $NG.getCmpApi('toolbar_p_form_0000000092_d').setReadOnly('addchildren', true);
    //         dgrid.setReadOnly(true);
    //     }*/

    //     if (row[0].s_tree_name == "摊销余额及盘点冲抵成本" || row[0].s_tree_name == "二次经营创效") {
    //         $NG.getCmpApi('toolbar_p_form_0000000092_d').setReadOnly('addchildren', true);
    //         $NG.updateUI(function (updater, state) {
    //             // 修改customfilebilltoform表单BilltoId字段的required属性
    //             updater.editGrid.p_form_0000000092_d.u_jhcbjde.setProps({ disabled: false });
    //             updater.editGrid.p_form_0000000092_d.u_ewdzb.setProps({ disabled: false });
    //             updater.editGrid.p_form_0000000092_d.u_jhcbdj.setProps({ disabled: false });
    //         });
    //         dgrid.setReadOnly(false);

    //     } else {
    //         $NG.getCmpApi('toolbar_p_form_0000000092_d').setReadOnly('addchildren', false);
    //         $NG.updateUI(function (updater, state) {
    //             updater.editGrid.p_form_0000000092_d.u_jhcbjde.setProps({ disabled: true });
    //             updater.editGrid.p_form_0000000092_d.u_ewdzb.setProps({ disabled: true });
    //             updater.editGrid.p_form_0000000092_d.u_jhcbdj.setProps({ disabled: true });
    //         });
    //         dgrid.setReadOnly(false);
    //     }
    // }, "p_form_0000000092_d");

    /** 弃用 */
    // useBeforeClick(function ({ args }) {
    //     //按钮点击事件
    //     if (hjzrcb != zrcb) {
    //         $NG.alert("合计行的责任成本不能大于第二章节预计责任成本");
    //         return false;
    //     }
    // }, "save");

}, function () {
    console.log('list Ready');
});

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
            // 如果没有父节点或父节点是根节点，则直接添加到树中
            tree.push(node);
        } else if (map[parentId]) {
            // 如果有父节点，则将自己添加到父节点的children中
            map[parentId].children.push(node);
        }
    });

    // ==== 插入固定根节点 ====
    const taxRows = [
        { s_tree_name: '销项税', taxType: 'sales' },
        { s_tree_name: '可抵扣进项税', taxType: 'deductible' },
        { s_tree_name: '应缴增值税', taxType: 'payable' },
        { s_tree_name: '摊销余额及盘点冲抵成本' },
        { s_tree_name: '二次经营创效' }
    ];

    // 获取当前最大s_tree_no值（确保新ID不冲突）
    let maxTreeNo = 0;
    tree.forEach(node => {
        const treeNo = parseInt(node.s_tree_no || '0', 10);
        if (!isNaN(treeNo) && treeNo > maxTreeNo) {
            maxTreeNo = treeNo;
        }
    });

    // 创建并插入新行
    taxRows.forEach((row, index) => {
        const newTreeNo = (maxTreeNo + index + 1).toString();
        const taxRow = {
            s_tree_id: `tax_${index + 1}`,
            s_tree_no: newTreeNo,
            s_tree_name: row.s_tree_name,
            s_tree_pid: '0',
            u_htsryjhtsr: '0.00',
            u_jhcbcbhj: '0.00',
            u_zrcbjde: '0.00',
            u_zrcbjdl: '0.00',
            u_jhcbjde: '0.00',
            u_jhcbjdl: '0.00',
            u_ewdzb: '0.00',
            u_ewdjdlzb: '0.00',
            u_jhcbdj: '0.00',
            u_zrcbdj: '0.00',
            u_zrcbcbhj: '0.00',
            isTaxRow: true
        };

        // 设置税金行类型
        if (row.taxType) {
            taxRow.taxType = row.taxType;
        }

        tree.push(taxRow);
    });

    // 新增：添加合计行
    if (tree.length > 0) {
        const totalRow = {
            s_tree_id: 'total',
            s_tree_name: '合计',
            s_tree_pid: '0',
            u_htsryjhtsr: '0.00',
            u_cnt_income_adjust: '0.00',
            u_zrcbjde: '0.00',
            u_zrcbjdl: '0.00',
            u_jhcbjde: '0.00',
            u_jhcbjdl: '0.00',
            u_ewdzb: '0.00',
            u_hsewdzb: '0.00',
            u_signed_cnt_ewdzb: '0.00',
            u_signed_cnt_ewdkdkjxs: '0.00',
            u_rest_ewdzb: '0.00',
            u_tzhewdzb: '0.00',
            u_tzhhsewdzb: '0.00',
            u_ewdjdlzb: '0.00',
            u_jhcbgcl: '0.00',
            u_jhcbdj: '0.00',
            u_jhcbcbhj: '0.00',
            u_intax_rate_jhcb: '0.00',
            u_amt_vat_jhcb: '0.00',
            u_zrcbgcl: '0.00',
            u_zrcbdj: '0.00',
            u_zrcbcbhj: '0.00',
            u_intax_rate: '0.00',
            u_amt_vat_zrcb: '0.00',
            isTotal: true, // 标记为合计行
        };

        // 累加所有根节点
        tree.forEach(node => {
            if ((!node.s_tree_pid || node.s_tree_pid === '0')) {
                totalRow.u_htsryjhtsr = (parseFloat(totalRow.u_htsryjhtsr) + parseFloat(node.u_htsryjhtsr || 0)).toFixed(2);
                totalRow.u_cnt_income_adjust = (parseFloat(totalRow.u_cnt_income_adjust) + parseFloat(node.u_cnt_income_adjust || 0)).toFixed(2);
                totalRow.u_zrcbjde = (parseFloat(totalRow.u_zrcbjde) + parseFloat(node.u_zrcbjde || 0)).toFixed(2);
                totalRow.u_jhcbjde = (parseFloat(totalRow.u_jhcbjde) + parseFloat(node.u_jhcbjde || 0)).toFixed(2);
                totalRow.u_ewdzb = (parseFloat(totalRow.u_ewdzb) + parseFloat(node.u_ewdzb || 0)).toFixed(2);
                totalRow.u_hsewdzb = (parseFloat(totalRow.u_hsewdzb) + parseFloat(node.u_hsewdzb || 0)).toFixed(2);
                totalRow.u_signed_cnt_ewdzb = (parseFloat(totalRow.u_signed_cnt_ewdzb) + parseFloat(node.u_signed_cnt_ewdzb || 0)).toFixed(2);
                totalRow.u_rest_ewdzb = (parseFloat(totalRow.u_rest_ewdzb) + parseFloat(node.u_rest_ewdzb || 0)).toFixed(2);
                totalRow.u_tzhewdzb = (parseFloat(totalRow.u_tzhewdzb) + parseFloat(node.u_tzhewdzb || 0)).toFixed(2);
                totalRow.u_tzhhsewdzb = (parseFloat(totalRow.u_tzhhsewdzb) + parseFloat(node.u_tzhhsewdzb || 0)).toFixed(2);
                totalRow.u_jhcbcbhj = (parseFloat(totalRow.u_jhcbcbhj) + parseFloat(node.u_jhcbcbhj || 0)).toFixed(2);
                totalRow.u_amt_vat_jhcb = (parseFloat(totalRow.u_amt_vat_jhcb) + parseFloat(node.u_amt_vat_jhcb || 0)).toFixed(2);
                totalRow.u_zrcbcbhj = (parseFloat(totalRow.u_zrcbcbhj) + parseFloat(node.u_zrcbcbhj || 0)).toFixed(2);
                totalRow.u_amt_vat_zrcb = (parseFloat(totalRow.u_amt_vat_zrcb) + parseFloat(node.u_amt_vat_zrcb || 0)).toFixed(2);
            }
        });

        tree.push(totalRow);
    }

    return tree;
}

/**计算树形结构的最大深度 */
function getTreeMaxDepth(nodes, currentDepth = 1) {
    let maxDepth = currentDepth;
    nodes.forEach(node => {
        // 若节点有子节点，递归计算子节点深度（当前深度+1）
        if (node.children && node.children.length > 0) {
            const childDepth = getTreeMaxDepth(node.children, currentDepth + 1);
            maxDepth = Math.max(maxDepth, childDepth); // 取最大深度
        }
    });
    return maxDepth;
}

// 逐层展开所有层级
function expandAllLevels(dgrid, maxDepth) {
    // 递归展开，每次展开一层后等待网格更新
    function expandRecursive(currentLevel) {
        if (currentLevel < maxDepth) {
            dgrid.setExpand(); // 展开当前层级
            // 等待50ms确保网格更新后再展开下一层（时间可根据实际情况调整）
            setTimeout(() => {
                expandRecursive(currentLevel + 1);
            }, 50);
        }
    }
    // 从第1层开始展开（根节点为第1层）
    expandRecursive(1);
}

function xxshtsrupdate(record, xxshtsr) {
    if (record.s_tree_name == '销项税') {
        xxshtsr = parseFloat(record.u_htsryjhtsr).toFixed(2);
    }
    return xxshtsr;
}
function kdkcbhjupdate(record, kdkcbhj) {
    if (record.s_tree_name == '可抵扣进项税') {
        kdkcbhj = parseFloat(record.u_jhcbcbhj).toFixed(2);
    }
    return kdkcbhj;
}

/**
 * 特殊处理：重新计算所有节点的u_amt_vat_jhcb和u_hsewdzb汇总
 * 直接从末级节点汇总到根节点，不经过中间层级逐级汇总
 * 这个函数专门处理u_amt_vat_jhcb和u_hsewdzb字段的特殊汇总需求
 */
function recalculateAmtVatJhcbFromLeafNodes(grid) {
    const rows = grid.getRows();
    if (!rows || rows.length === 0) return;

    // 构建节点映射
    const nodeMap = {};
    rows.forEach(row => {
        if (row && row.s_tree_id) {
            nodeMap[row.s_tree_id] = { ...row };
        }
    });

    // 构建树形结构
    const treeNodes = [];
    const rootNodes = [];

    // 首先找到所有根节点
    rows.forEach(row => {
        if (row && (!row.s_tree_pid || row.s_tree_pid === '0' || row.s_tree_pid === null)) {
            rootNodes.push(row.s_tree_id);
        }
    });

    // 递归构建树形结构
    function buildTreeNode(nodeId) {
        const node = nodeMap[nodeId];
        if (!node) return null;

        const treeNode = { ...node, children: [] };

        // 查找所有子节点
        rows.forEach(row => {
            if (row && row.s_tree_pid === nodeId) {
                const childNode = buildTreeNode(row.s_tree_id);
                if (childNode) {
                    treeNode.children.push(childNode);
                }
            }
        });

        return treeNode;
    }

    // 构建完整的树
    rootNodes.forEach(rootId => {
        const rootNode = buildTreeNode(rootId);
        if (rootNode) {
            treeNodes.push(rootNode);
        }
    });

    // 递归计算末级节点的u_amt_vat_jhcb和u_hsewdzb汇总
    function calculateLeafValues(node) {
        if (!node) return { amtVatJhcb: 0, hsewdzb: 0 };

        // 如果是末级节点（没有子节点），直接返回自己的值
        if (!node.children || node.children.length === 0) {
            return {
                amtVatJhcb: parseFloat(node.u_amt_vat_jhcb || 0),
                hsewdzb: parseFloat(node.u_hsewdzb || 0)
            };
        }

        // 如果是父节点，累加所有子节点的末级节点值
        let amtVatJhcbSum = 0;
        let hsewdzbSum = 0;

        node.children.forEach(child => {
            const childValues = calculateLeafValues(child);
            amtVatJhcbSum += childValues.amtVatJhcb;
            hsewdzbSum += childValues.hsewdzb;
        });

        return {
            amtVatJhcb: amtVatJhcbSum,
            hsewdzb: hsewdzbSum
        };
    }

    // 更新所有节点的u_amt_vat_jhcb和u_hsewdzb值
    function updateNodeValues(node) {
        if (!node) return;

        // 跳过特定节点和税金行、合计行
        const shouldSkip =
            node.s_tree_name === "摊销余额及盘点冲抵成本" ||
            node.s_tree_name === "二次经营创效" ||
            node.isTaxRow ||
            node.isTotal;

        if (!shouldSkip) {
            // 重新计算该节点的u_amt_vat_jhcb和u_hsewdzb值
            const newValues = calculateLeafValues(node);

            // 更新u_hsewdzb（对于父节点使用子节点汇总值）
            // 注意：对于非根节点（s_tree_pid != "0"），如果当前节点是父节点，使用子节点汇总值
            if (node.children && node.children.length > 0) {
                node.u_hsewdzb = newValues.hsewdzb.toFixed(2);
                // 更新u_amt_vat_jhcb
                node.u_amt_vat_jhcb = newValues.amtVatJhcb.toFixed(2);
            }

            // 更新到网格中
            const rowToUpdate = rows.find(r => r && r.s_tree_id === node.s_tree_id);
            if (rowToUpdate) {
                rowToUpdate.u_amt_vat_jhcb = node.u_amt_vat_jhcb;
                rowToUpdate.u_hsewdzb = node.u_hsewdzb;
                grid.updateRow(rowToUpdate);
            }
        }

        // 递归更新子节点
        if (node.children && node.children.length > 0) {
            node.children.forEach(child => {
                updateNodeValues(child);
            });
        }
    }

    // 从所有根节点开始更新
    treeNodes.forEach(rootNode => {
        updateNodeValues(rootNode);
    });
}

// 提取计算逻辑为独立函数
function calculateRowValues(record, xxshtsr, kdkcbhj) {
    console.log('record=================>', record)

    const shouldSkip =
        record.s_tree_name === "摊销余额及盘点冲抵成本" ||
        record.s_tree_name === "二次经营创效";

    if (shouldSkip) {
        // 保留原始值，不做任何计算
        return record;
    }

    if (record.s_tree_name == "合计") {
        // 合计行计算进项税 (责任成本)
        if (record.u_zrcbcbhj != 0 && record.u_amt_vat_zrcb) {
            record.u_intax_rate = (
                (parseFloat(record.u_amt_vat_zrcb || 0) - parseFloat(record.u_zrcbcbhj)) / parseFloat(record.u_zrcbcbhj)
            ).toFixed(6);
        } else if (record.u_zrcbcbhj != 0) {
            record.u_intax_rate = (
                (parseFloat(record.u_amt_vat_zrcb || 0) - parseFloat(record.u_zrcbcbhj)) / parseFloat(record.u_zrcbcbhj)
            ).toFixed(6);
        } else {
            record.u_intax_rate = 0.000000;
        }

        // 合计行计算进项税 (计划成本)
        if (record.u_jhcbcbhj != 0 && record.u_amt_vat_jhcb) {
            record.u_intax_rate_jhcb = (
                (parseFloat(record.u_amt_vat_jhcb) - parseFloat(record.u_jhcbcbhj)) / parseFloat(record.u_jhcbcbhj)
            ).toFixed(6);
        } else if (record.u_jhcbcbhj != 0) {
            record.u_intax_rate_jhcb = (
                (parseFloat(record.u_amt_vat_jhcb || 0) - parseFloat(record.u_jhcbcbhj)) / parseFloat(record.u_jhcbcbhj)
            ).toFixed(6);
        } else {
            record.u_intax_rate_jhcb = 0.000000;
        }

        // 计划成本降低率自动带出
        if (record.u_htsryjhtsr != undefined && record.u_jhcbjde != undefined) {
            if (parseFloat(record.u_htsryjhtsr) != 0) {
                record.u_jhcbjdl = (
                    (parseFloat(record.u_jhcbjde) || 0) / parseFloat(record.u_htsryjhtsr)
                ).toFixed(6);
            } else {
                record.u_jhcbjdl = 0.000000;
            }
        } else if (record.u_htsryjhtsr == undefined || record.u_jhcbjde == undefined) {
            //record.u_jhcbjdl = record.u_jhcbjdl || "0.00";
            record.u_jhcbjdl = 0.000000;
        }

        // 责任成本降低率自动带出
        if (record.u_zrcbjde && record.u_htsryjhtsr) {
            if (parseFloat(record.u_htsryjhtsr) !== 0) {
                record.u_zrcbjdl = (
                    (parseFloat(record.u_zrcbjde) || 0) / parseFloat(record.u_htsryjhtsr)
                ).toFixed(6);
            } else {
                record.u_zrcbjdl = "0.000000";
            }
        } else if (record.u_zrcbjde === undefined || record.u_htsryjhtsr === undefined) {
            // 当字段未定义时，确保有默认值
            record.u_zrcbjdl = "0.000000";
        }

    } else {
        // 责任成本单价自动带出
        // if (record.u_zrcbcbhj && record.u_zrcbgcl) {
        //     if (parseFloat(record.u_zrcbgcl) !== 0) {
        //         record.u_zrcbdj = (
        //             parseFloat(record.u_zrcbcbhj) / parseFloat(record.u_zrcbgcl)
        //         ).toFixed(2);
        //     } else {
        //         // 除数为0时，设置为0.00（避免NaN）
        //         record.u_zrcbdj = "0.00";
        //     }
        // } else if (record.u_zrcbcbhj === undefined || record.u_zrcbgcl === undefined) {
        //     // 当字段未定义时，确保有默认值
        //     record.u_zrcbdj = record.u_zrcbdj || "0.00";
        // }

        // 计划成本含税合价自动带出
        if (record.s_tree_pid != "0") {
            if ((record.u_jhcbcbhj || record.u_jhcbcbhj == 0) && (record.u_intax_rate_jhcb || record.u_intax_rate_jhcb == 0)) {
                record.u_amt_vat_jhcb = (
                    parseFloat(record.u_jhcbcbhj) * (1 + parseFloat(record.u_intax_rate_jhcb))
                ).toFixed(2);
            }
            // else if (record.u_jhcbcbhj == 0 || record.u_intax_rate_jhcb == 0) {
            //     record.u_amt_vat_jhcb = (
            //         (parseFloat(record.u_jhcbcbhj) || 0) * (1 + (parseFloat(record.u_intax_rate_jhcb) || 0))
            //     ).toFixed(2);
            else {
                record.u_amt_vat_jhcb = record.u_amt_vat_jhcb || 0.00;
            }
        }

        // 责任成本含税合价自动带出
        // if (record.s_tree_pid != "0") {
        //     if (record.u_zrcbcbhj && record.u_intax_rate) {
        //         record.u_amt_vat_zrcb = (
        //             parseFloat(record.u_zrcbcbhj) * (1 + parseFloat(record.u_intax_rate))
        //         ).toFixed(2);
        //     } else if (record.u_zrcbcbhj == 0 || record.u_intax_rate == 0) {
        //         record.u_amt_vat_zrcb = (
        //             (parseFloat(record.u_zrcbcbhj) || 0) * (1 + (parseFloat(record.u_intax_rate) || 0))
        //         ).toFixed(2);
        //     } else if (record.u_zrcbcbhj == undefined || record.u_intax_rate == undefined) {
        //         record.u_amt_vat_zrcb = 0.00;
        //     }
        // }

        // 责任成本降低额自动带出
        if (record.u_htsryjhtsr && record.u_zrcbcbhj) {
            record.u_zrcbjde = (
                parseFloat(record.u_htsryjhtsr) - parseFloat(record.u_zrcbcbhj)
            ).toFixed(2);
        } else if (record.u_htsryjhtsr == 0 || record.u_zrcbcbhj == 0) {
            record.u_zrcbjde = (
                (parseFloat(record.u_htsryjhtsr) || 0) - (parseFloat(record.u_zrcbcbhj) || 0)
            ).toFixed(2);
        } else if (record.u_htsryjhtsr === undefined || record.u_zrcbcbhj === undefined) {
            // 当字段未定义时，确保有默认值
            record.u_zrcbjde = "0.00";
        }

        // 责任成本降低率自动带出
        if (record.u_zrcbjde && record.u_htsryjhtsr) {
            if (parseFloat(record.u_htsryjhtsr) !== 0) {
                record.u_zrcbjdl = (
                    (parseFloat(record.u_zrcbjde) || 0) / parseFloat(record.u_htsryjhtsr)
                ).toFixed(6);
            } else {
                record.u_zrcbjdl = "0.000000";
            }
        } else if (record.u_zrcbjde === undefined || record.u_htsryjhtsr === undefined) {
            // 当字段未定义时，确保有默认值
            record.u_zrcbjdl = "0.000000";
        }

        // 责任成本不含税合价自动带出
        //手动输入进项税，责任成本不含税合价=合价/（1+进项税税率）
        if (record.u_intax_rate && record.u_amt_vat_zrcb) {
            record.u_zrcbcbhj = (
                (parseFloat(record.u_amt_vat_zrcb) || 0) / (1 + (parseFloat(record.u_intax_rate) || 0))
            ).toFixed(2);
        } else if (record.u_intax_rate == 0 || record.u_amt_vat_zrcb == 0) {
            record.u_zrcbcbhj = (
                (parseFloat(record.u_amt_vat_zrcb) || 0) / (1 + (parseFloat(record.u_intax_rate) || 0))
            ).toFixed(2);
        } else if (record.u_intax_rate == undefined || record.u_amt_vat_zrcb == undefined) {
            // 当字段未定义时，确保有默认值
            record.u_zrcbcbhj = "0.00";
        }

        // 责任成本单价自动带出
        if (record.u_zrcbcbhj && record.u_zrcbgcl) {
            if (parseFloat(record.u_zrcbgcl) !== 0) {
                record.u_zrcbdj = (
                    (parseFloat(record.u_zrcbcbhj) || 0) / parseFloat(record.u_zrcbgcl)
                ).toFixed(2);
            } else {
                record.u_zrcbdj = "0.00";
            }
        } else if (record.u_zrcbcbhj === undefined || record.u_zrcbgcl === undefined) {
            record.u_zrcbdj = record.u_zrcbdj || "0.00";
        }


        // 计划成本单价自动带出
        if (record.u_jhcbcbhj && record.u_jhcbgcl) {
            if (parseFloat(record.u_jhcbgcl) !== 0) {
                record.u_jhcbdj = (
                    (parseFloat(record.u_jhcbcbhj) || 0) / parseFloat(record.u_jhcbgcl)
                ).toFixed(2);
            } else {
                record.u_jhcbdj = "0.00";
            }
        } else if (record.u_jhcbcbhj === undefined || record.u_jhcbgcl === undefined) {
            record.u_jhcbdj = record.u_jhcbdj || "0.00";
        }

        // 计划成本降低额自动带出
        if (record.u_htsryjhtsr !== undefined && record.u_jhcbcbhj !== undefined) {
            record.u_jhcbjde = (
                (parseFloat(record.u_htsryjhtsr) || 0) - (parseFloat(record.u_jhcbcbhj) || 0)
            ).toFixed(2);
        } else if (record.u_htsryjhtsr === undefined || record.u_jhcbcbhj === undefined) {
            record.u_jhcbjde = record.u_jhcbjde || "0.00";
        }

        // 计划成本降低率自动带出
        if (record.u_htsryjhtsr != undefined && record.u_jhcbjde != undefined) {
            if (parseFloat(record.u_htsryjhtsr) != 0) {
                record.u_jhcbjdl = (
                    (parseFloat(record.u_jhcbjde) || 0) / parseFloat(record.u_htsryjhtsr)
                ).toFixed(6);
            } else {
                record.u_jhcbjdl = 0.000000;
            }
        } else if (record.u_htsryjhtsr == undefined || record.u_jhcbjde == undefined) {
            //record.u_jhcbjdl = record.u_jhcbjdl || "0.00";
            record.u_jhcbjdl = 0.000000;
        }

        // 二维度降低率指标自动带出（仅在首次加载且字段为空时设置）
        if (record.u_jhcbjdl !== undefined && record.u_jhcbjdl !== null && record.u_jhcbjdl !== '') {
            record.u_ewdjdlzb = record.u_jhcbjdl;
        }

        // 不含税二维度指标根据公式计算
        if (record.s_tree_name != '应缴增值税' && record.u_cnt_income_adjust && (record.u_ewdjdlzb || record.u_ewdjdlzb == 0)) {
            record.u_ewdzb = (
                parseFloat(record.u_cnt_income_adjust) * (1 - (parseFloat(record.u_ewdjdlzb) || 0))
            ).toFixed(2);
        } else if ((record.u_htsryjhtsr || record.u_htsryjhtsr == 0) && (record.u_ewdjdlzb || record.u_ewdjdlzb == 0)) {
            record.u_ewdzb = (
                parseFloat(record.u_htsryjhtsr) * (1 - (parseFloat(record.u_ewdjdlzb) || 0))
            ).toFixed(2);
        } else {
            record.u_ewdzb = 0.00;
        }

        // 应缴增值税含税二维度指标特殊处理
        if (record.s_tree_name == '应缴增值税') {
            if (xxshtsr && kdkcbhj) {
                record.u_ewdzb = (
                    (parseFloat(xxshtsr) || 0) - (parseFloat(kdkcbhj) || 0)
                ).toFixed(2);
            } else if (xxshtsr == 0 || kdkcbhj == 0) {
                record.u_ewdzb = (
                    (parseFloat(xxshtsr) || 0) - (parseFloat(kdkcbhj) || 0)
                ).toFixed(2);
            } else if (xxshtsr == undefined || kdkcbhj == undefined) {
                record.u_ewdzb = (
                    (parseFloat(xxshtsr) || 0) - (parseFloat(kdkcbhj) || 0)
                ).toFixed(2);
            } else {
                record.u_ewdzb = 0.00;
            }
        }

        // 含税二维度指标自动带出
        if (record.s_tree_pid != "0") {
            if ((record.u_ewdzb || record.u_ewdzb == 0) && (record.u_intax_rate_jhcb || record.u_intax_rate_jhcb == 0)) {
                record.u_hsewdzb = (
                    (parseFloat(record.u_ewdzb) || 0) * (1 + (parseFloat(record.u_intax_rate_jhcb) || 0))
                ).toFixed(2);
            } else {
                record.u_hsewdzb = record.u_hsewdzb || 0.00;
            }
        }

        // 含税二维度指标自动带出 根节点特殊处理
        // if (record.s_tree_pid == "0") {
        //     if ((record.u_ewdzb || record.u_ewdzb == 0) && record.u_intax_rate_jhcb) {
        //         record.u_hsewdzb = (
        //             (parseFloat(record.u_ewdzb) || 0) * (1 + (parseFloat(record.u_intax_rate_jhcb) || 0))
        //         ).toFixed(2);
        //     } else {
        //         //record.u_hsewdzb = record.u_hsewdzb || 0.00;
        //         record.u_hsewdzb = calculateChildrenHsewdzbSum(record).toFixed(2);
        //     }
        // }
    }

    return record;
}

// 新增函数：计算子节点的 u_hsewdzb 总和
// function calculateChildrenHsewdzbSum(node) {
//     let sum = 0;

//     // 递归计算所有子节点的 u_hsewdzb 总和
//     function sumChildrenHsewdzb(childNode) {
//         if (childNode.children && childNode.children.length > 0) {
//             childNode.children.forEach(child => {
//                 // 累加直接子节点的值
//                 sum += parseFloat(child.u_hsewdzb || 0);
//                 // 递归累加更深层子节点的值
//                 sumChildrenHsewdzb(child);
//             });
//         }
//     }

//     // 开始计算
//     sumChildrenHsewdzb(node);
//     return sum;
// }

// 添加更新税金行的函数
function updateTaxRows(dgrid, xxs, kdkjxs) {
    const rows = dgrid.getRows();
    if (!rows) return;

    let salesTaxRow = null;
    let deductibleTaxRow = null;
    let payableTaxRow = null;

    // 查找税金行
    rows.forEach(row => {
        if (row.isTaxRow && row.taxType === 'sales') {
            salesTaxRow = row;
        } else if (row.isTaxRow && row.taxType === 'deductible') {
            deductibleTaxRow = row;
        } else if (row.isTaxRow && row.taxType === 'payable') {
            payableTaxRow = row;
        }
    });

    // 更新销项税行
    if (salesTaxRow) {
        salesTaxRow.u_htsryjhtsr = parseFloat(xxs || 0).toFixed(2);
        dgrid.updateRow(salesTaxRow);
    }

    // 更新可抵扣进项税行
    if (deductibleTaxRow) {
        deductibleTaxRow.u_htsryjhtsr = parseFloat(kdkjxs || 0).toFixed(2);
        dgrid.updateRow(deductibleTaxRow);
    }

    // 更新应缴增值税行
    if (payableTaxRow && salesTaxRow && deductibleTaxRow) {
        const salesValue = parseFloat(salesTaxRow.u_htsryjhtsr || 0);
        const deductibleValue = parseFloat(deductibleTaxRow.u_htsryjhtsr || 0);
        payableTaxRow.u_htsryjhtsr = (salesValue - deductibleValue).toFixed(2);
        dgrid.updateRow(payableTaxRow);
    }

    // 更新合计行
    updateTotalRow(dgrid);
}


/**  递归计算父节点的值（子节点值合计到父节点） */
// function calculateParentValues(nodes) {
//     nodes.forEach(node => {
//         // 跳过特定节点的计算（仅叶子节点）
//         const shouldSkip =
//             node.s_tree_name === "摊销余额及盘点冲抵成本" ||
//             node.s_tree_name === "二次经营创效";

//         if (shouldSkip) return;
//         console.log('node.children===========>', node.children)
//         if (node.children && node.children.length > 0) {
//             // 先递归计算子节点
//             calculateParentValues(node.children);

//             // 初始化父节点的值
//             node.u_htsryjhtsr = '0.00';
//             node.u_jhcbcbhj = '0.00';
//             node.u_amt_vat_jhcb = '0.00';
//             node.u_zrcbcbhj = '0.00';
//             node.u_amt_vat_zrcb = '0.00';
//             node.u_zrcbjde = '0.00';
//             node.u_zrcbjdl = '0.00';
//             node.u_jhcbjde = '0.00';
//             node.u_jhcbjdl = '0.00';
//             node.u_ewdjdlzb = '0.00';
//             node.u_hsewdzb = '0.00';

//             //node.u_ewdzb = '0.00';
//             //node.u_jhcbgcl = '0.00';
//             //node.u_jhcbdj = '0.00';
//             //node.u_zrcbgcl = '0.00';
//             //node.u_zrcbdj = '0.00';


//             // 累加所有子节点的值
//             node.children.forEach(child => {
//                 node.u_htsryjhtsr = (parseFloat(node.u_htsryjhtsr || 0) + (parseFloat(child.u_htsryjhtsr) || 0)).toFixed(2);
//                 node.u_jhcbcbhj = (parseFloat(node.u_jhcbcbhj || 0) + (parseFloat(child.u_jhcbcbhj) || 0)).toFixed(2);
//                 node.u_amt_vat_jhcb = (parseFloat(node.u_amt_vat_jhcb || 0) + (parseFloat(child.u_amt_vat_jhcb) || 0)).toFixed(2);
//                 node.u_zrcbcbhj = (parseFloat(node.u_zrcbcbhj || 0) + (parseFloat(child.u_zrcbcbhj) || 0)).toFixed(2);
//                 node.u_amt_vat_zrcb = (parseFloat(node.u_amt_vat_zrcb || 0) + (parseFloat(child.u_amt_vat_zrcb) || 0)).toFixed(2);
//                 node.u_zrcbjde = (parseFloat(node.u_zrcbjde || 0) + (parseFloat(child.u_zrcbjde) || 0)).toFixed(2);
//                 node.u_zrcbjdl = (parseFloat(node.u_zrcbjdl || 0) + (parseFloat(child.u_zrcbjdl) || 0)).toFixed(2);
//                 node.u_jhcbjde = (parseFloat(node.u_jhcbjde || 0) + (parseFloat(child.u_jhcbjde) || 0)).toFixed(2);
//                 node.u_jhcbjdl = (parseFloat(node.u_jhcbjdl || 0) + (parseFloat(child.u_jhcbjdl) || 0)).toFixed(2);
//                 node.u_ewdjdlzb = (parseFloat(node.u_ewdjdlzb || 0) + (parseFloat(child.u_ewdjdlzb) || 0)).toFixed(2);
//                 node.u_hsewdzb = (parseFloat(node.u_hsewdzb || 0) + (parseFloat(child.u_hsewdzb) || 0)).toFixed(2);
//                 //node.u_ewdzb = (parseFloat(node.u_ewdzb || 0) + (parseFloat(child.u_ewdzb) || 0)).toFixed(2);
//                 //node.u_jhcbgcl = (parseFloat(node.u_jhcbgcl || 0) + (parseFloat(child.u_jhcbgcl) || 0)).toFixed(2);
//                 //node.u_jhcbdj = (parseFloat(node.u_jhcbdj || 0) + (parseFloat(child.u_jhcbdj) || 0)).toFixed(2);
//                 //node.u_zrcbgcl = (parseFloat(node.u_zrcbgcl || 0) + (parseFloat(child.u_zrcbgcl) || 0)).toFixed(2);
//                 //node.u_zrcbdj = (parseFloat(node.u_zrcbdj || 0) + (parseFloat(child.u_zrcbdj) || 0)).toFixed(2);

//                 // node.u_htsryjhtsr = 0 + (parseFloat(child.u_htsryjhtsr) || 0).toFixed(2);
//                 // node.u_jhcbcbhj = 0 + (parseFloat(child.u_jhcbcbhj) || 0).toFixed(2);
//                 // node.u_amt_vat_jhcb = 0 + (parseFloat(child.u_amt_vat_jhcb) || 0).toFixed(2);
//                 // node.u_zrcbcbhj = 0 + (parseFloat(child.u_zrcbcbhj) || 0).toFixed(2);
//                 // node.u_amt_vat_zrcb = 0 + (parseFloat(child.u_amt_vat_zrcb) || 0).toFixed(2);
//                 // node.u_zrcbjde = 0 + (parseFloat(child.u_zrcbjde) || 0).toFixed(2);
//                 // node.u_zrcbjdl = 0 + (parseFloat(child.u_zrcbjdl) || 0).toFixed(2);
//                 // node.u_jhcbjde = 0 + (parseFloat(child.u_jhcbjde) || 0).toFixed(2);
//                 // node.u_jhcbjdl = 0 + (parseFloat(child.u_jhcbjdl) || 0).toFixed(2);
//                 // node.u_ewdjdlzb = 0 + (parseFloat(child.u_ewdjdlzb) || 0).toFixed(2);
//             });
//         }
//     });
// }

/**
 * 只针对指定行（s_tree_id）向上递归计算父节点的合计值。
 * rows: 平铺的行数组（表格返回的 rows），targetId: 被修改行的 s_tree_id
 */
function calculateParentValuesForId(rows, targetId) {
    if (!rows || !targetId) return;

    // 构建 id -> 行 映射，方便查找父节点
    const map = {};
    rows.forEach(r => {
        if (r && r.s_tree_id) map[r.s_tree_id] = r;
    });

    // 如果目标行不在map中，直接返回
    if (!map[targetId]) return;

    let currentId = targetId;

    // 向上遍历父链，直到根（父ID为 '0' / null / undefined / ''）
    while (true) {
        const current = map[currentId];
        if (!current) break;

        const parentId = current.s_tree_pid;
        if (!parentId || parentId === '0' || parentId === null || parentId === undefined || parentId === '') break;

        const parent = map[parentId];
        if (!parent) break;

        // 跳过特定父节点（与 calculateParentValues 保持一致）
        const shouldSkip =
            parent.s_tree_name === "摊销余额及盘点冲抵成本" ||
            parent.s_tree_name === "二次经营创效";
        if (shouldSkip) {
            currentId = parentId;
            continue;
        }

        // 找出 parent 的直接子节点（基于平铺 rows）
        const children = rows.filter(r => r && (r.s_tree_pid == parent.s_tree_id));

        // 要汇总的字段列表（与 calculateParentValues 中一致）
        // 注意：排除u_amt_vat_jhcb字段，因为这个字段现在由特殊函数处理
        const fields = [
            'u_htsryjhtsr',
            'u_jhcbcbhj',
            //'u_amt_vat_jhcb', // 特殊处理，由recalculateAmtVatJhcbFromLeafNodes单独处理
            'u_zrcbcbhj',
            'u_amt_vat_zrcb',
            'u_zrcbjde',
            'u_zrcbjdl',
            'u_jhcbjde',
            'u_jhcbjdl',
            'u_ewdjdlzb'
            //'u_hsewdzb' // 特殊处理，由recalculateAmtVatJhcbFromLeafNodes单独处理
        ];

        // 初始化父节点字段为0
        fields.forEach(f => { parent[f] = '0.00'; });

        // 累加直接子节点的值
        children.forEach(child => {
            fields.forEach(f => {
                parent[f] = (parseFloat(parent[f] || 0) + (parseFloat(child[f] || 0))).toFixed(2);
            });
        });

        // 继续向上处理下一层父节点
        currentId = parentId;
    }
}

/** 清空合计行 */
function clearTotalRow(grid) {
    const rows = grid.getRows();
    const totalRow = rows.find(row => row.s_tree_name === '合计');

    if (!totalRow) return;

    // 清空所有合计字段
    totalRow.u_htsryjhtsr = '0.00';
    totalRow.u_cnt_income_adjust = '0.00';
    totalRow.u_zrcbjde = '0.00';
    totalRow.u_jhcbjde = '0.00';
    totalRow.u_ewdzb = '0.00';
    totalRow.u_hsewdzb = '0.00';
    totalRow.u_signed_cnt_ewdzb = '0.00';
    totalRow.u_rest_ewdzb = '0.00';
    totalRow.u_tzhewdzb = '0.00';
    totalRow.u_tzhhsewdzb = '0.00';
    totalRow.u_jhcbcbhj = '0.00';
    totalRow.u_amt_vat_jhcb = '0.00';
    totalRow.u_zrcbcbhj = '0.00';
    totalRow.u_amt_vat_zrcb = '0.00';


    // 更新表格
    grid.updateRow(totalRow);
}

// 更新合计行（先清空，再重新计算）
function updateTotalRow(grid) {
    clearTotalRow(grid); // 第一步：先清空合计行

    const rows = grid.getRows();
    let htsryjhtsrSum = 0;
    let u_cnt_income_adjustSum = 0;
    let zrcbjdeSum = 0;
    let jhcbjdeSum = 0;
    let ewdzbSum = 0;
    let hsewdzbSum = 0;
    let u_signed_cnt_ewdzbSum = 0;
    let u_rest_ewdzbSum = 0;
    let u_tzhewdzbSum = 0;
    let u_tzhhsewdzbSum = 0;
    let jhcbcbhjSum = 0;
    let u_amt_vat_jhcbSum = 0;
    let zrcbcbhjSum = 0;
    let u_amt_vat_zrcbSum = 0;

    // 第二步：累加根节点（排除合计行和税金行）
    rows.forEach(row => {
        // 根节点条件：没有父节点ID 或 父节点ID为0/null
        if ((!row.s_tree_pid || row.s_tree_pid === '0' || row.s_tree_pid === null) &&
            !row.isTotal) {
            htsryjhtsrSum += parseFloat(row.u_htsryjhtsr || 0);
            u_cnt_income_adjustSum += parseFloat(row.u_cnt_income_adjust || 0);
            zrcbjdeSum += parseFloat(row.u_zrcbjde || 0);
            jhcbjdeSum += parseFloat(row.u_jhcbjde || 0);
            ewdzbSum += parseFloat(row.u_ewdzb || 0);
            hsewdzbSum += parseFloat(row.u_hsewdzb || 0);
            u_signed_cnt_ewdzbSum += parseFloat(row.u_signed_cnt_ewdzb || 0);
            u_rest_ewdzbSum += parseFloat(row.u_rest_ewdzb || 0);
            u_tzhewdzbSum += parseFloat(row.u_tzhewdzb || 0);
            u_tzhhsewdzbSum += parseFloat(row.u_tzhhsewdzb || 0);
            jhcbcbhjSum += parseFloat(row.u_jhcbcbhj || 0);
            u_amt_vat_jhcbSum += parseFloat(row.u_amt_vat_jhcb || 0);
            zrcbcbhjSum += parseFloat(row.u_zrcbcbhj || 0);
            u_amt_vat_zrcbSum += parseFloat(row.u_amt_vat_zrcb || 0);
        }
    });



    // 第三步：构建合计数据
    const totals = {
        u_htsryjhtsr: htsryjhtsrSum.toFixed(2),
        u_cnt_income_adjust: u_cnt_income_adjustSum.toFixed(2),
        u_zrcbjde: zrcbjdeSum.toFixed(2),
        u_jhcbjde: jhcbjdeSum.toFixed(2),
        u_ewdzb: ewdzbSum.toFixed(2),
        u_hsewdzb: hsewdzbSum.toFixed(2),
        u_signed_cnt_ewdzb: u_signed_cnt_ewdzbSum.toFixed(2),
        u_rest_ewdzb: u_rest_ewdzbSum.toFixed(2),
        u_tzhewdzb: u_tzhewdzbSum.toFixed(2),
        u_tzhhsewdzb: u_tzhhsewdzbSum.toFixed(2),
        u_jhcbcbhj: jhcbcbhjSum.toFixed(2),
        u_amt_vat_jhcb: u_amt_vat_jhcbSum.toFixed(2),
        u_zrcbcbhj: zrcbcbhjSum.toFixed(2),
        u_amt_vat_zrcb: u_amt_vat_zrcbSum.toFixed(2)
    };

    // 第四步：更新合计行
    const totalRow = rows.find(row => row.s_tree_name === '合计');
    if (totalRow) {
        totalRow.u_htsryjhtsr = totals.u_htsryjhtsr;
        totalRow.u_cnt_income_adjust = totals.u_cnt_income_adjust;
        totalRow.u_zrcbjde = totals.u_zrcbjde;
        totalRow.u_jhcbjde = totals.u_jhcbjde;
        totalRow.u_ewdzb = totals.u_ewdzb;
        totalRow.u_hsewdzb = totals.u_hsewdzb;
        totalRow.u_signed_cnt_ewdzb = totals.u_signed_cnt_ewdzb;
        totalRow.u_rest_ewdzb = totals.u_rest_ewdzb;
        totalRow.u_tzhewdzb = totals.u_tzhewdzb;
        totalRow.u_tzhhsewdzb = totals.u_tzhhsewdzb;
        totalRow.u_jhcbcbhj = totals.u_jhcbcbhj;
        totalRow.u_amt_vat_jhcb = totals.u_amt_vat_jhcb;
        totalRow.u_zrcbcbhj = totals.u_zrcbcbhj;
        totalRow.u_amt_vat_zrcb = totals.u_amt_vat_zrcb;

        // 计算
        const record = calculateRowValues(totalRow, false);
        grid.updateRow(record);
    }
}