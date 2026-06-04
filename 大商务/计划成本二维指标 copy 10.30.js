$NG.AllReady(function (editPage, {
    useValuesChange, useUpdateRow, useUpdateRows, useAction, useClick, useBeforeClick, updateUI
}) {
    var mstform = $NG.getCmpApi('p_form_0000000092_m');
    var dgrid = $NG.getCmpApi('p_form_0000000092_d');

    let gkms = ''; // 第二章管控模式

    let zrcb = '0'; // 第二章责任成本
    let hjzrcb = '0'; // 合计行责任成本

    let xxs = '0'; // 销项税 取 目标成本测算的 计划成本编制 里面的 项目成本汇总  税金合计的预算收入
    let kdkjxs = '0'; // 可抵扣进项税 取 目标成本测算的 计划成本编制 里面的 项目成本汇总  进项税的的目标成本


    // 标记是否首次加载数据
    let isInitialLoad = true;

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
                        console.log("phid_pc===============>", phid_pc);
                        var ressxdata = typeof ressx.data === 'string' ? JSON.parse(ressx.data) : ressx.data;

                        /**金额取动态合约规划 */
                        $NG.execServer("jhcbewdzbdbdthygh", { 'pc': phid_pc }, (resje) => {
                            var resjedata = typeof resje.data === 'string' ? JSON.parse(resje.data) : resje.data;

                            for (let i = 0; i < ressx.count; i++) {
                                for (let n = 0; n < resje.count; n++) {
                                    if (ressxdata[i].extendObjects.s_tree_name == resjedata[n].extendObjects.s_tree_name) {
                                        ressxdata[i].extendObjects.u_htsryjhtsr = resjedata[n].extendObjects.u_htsryjhtsr;
                                        ressxdata[i].extendObjects.u_jhcbcbhj = resjedata[n].extendObjects.u_jhcbcbhj;
                                    }
                                }
                            }

                            /**构建树形结构 */
                            var targetData = ressxdata?.map((item) => {
                                return { ...item.extendObjects }
                            });
                            var treeData = flatArrayToTree(targetData)

                            // 首次加载时设置标记
                            isInitialLoad = true;

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
                        })
                    });

                    $NG.execServer("hqdezzrcb", { 'pc': phid_pc }, (res) => {
                        // 先检查res.data是否已经是对象
                        if (res.count == 0) return;
                        const data = JSON.parse(res.data);
                        if (data.length == 0) return;
                        //const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        //zrcb = data[0].extendObjects.zrcb;
                        gkms = data[0].extendObjects.u_gkms;
                    });

                    setTimeout(() => {
                        if (gkms == 1) {
                            $NG.execServer("jhcbcsyssr", { 'pc': phid_pc }, (res) => {
                                // 先检查res.data是否已经是对象
                                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
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
                            });
                            //更新调整后预计收入                         
                            //$NG.getCmpApi('p_form_con_plan_m').getValues().phid
                            $NG.execServer("get_p_form_0000000092_m_srcj", { phid_pc: phid_pc }, function (res) {
                                if (res.count == 0) return;
                                const data = JSON.parse(res.data);
                                if (data.length == 0) return;
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
                            });

                        }
                    }, 100)
                }

            }, 100);
        }
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
                    console.log("phid_pc===============>", phid_pc);
                    var ressxdata = typeof ressx.data === 'string' ? JSON.parse(ressx.data) : ressx.data;

                    /**金额取动态合约规划 */
                    $NG.execServer("jhcbewdzbdbdthygh", { 'pc': phid_pc }, (resje) => {
                        var resjedata = typeof resje.data === 'string' ? JSON.parse(resje.data) : resje.data;

                        for (let i = 0; i < ressx.count; i++) {
                            for (let n = 0; n < resje.count; n++) {
                                if (ressxdata[i].extendObjects.s_tree_name == resjedata[n].extendObjects.s_tree_name) {
                                    ressxdata[i].extendObjects.u_htsryjhtsr = resjedata[n].extendObjects.u_htsryjhtsr;
                                    ressxdata[i].extendObjects.u_jhcbcbhj = resjedata[n].extendObjects.u_jhcbcbhj;
                                }
                            }
                        }

                        /**构建树形结构 */
                        var targetData = ressxdata?.map((item) => {
                            return { ...item.extendObjects }
                        });
                        var treeData = flatArrayToTree(targetData)

                        // 首次加载时设置标记
                        isInitialLoad = true;

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
                    })
                });

                $NG.execServer("hqdezzrcb", { 'pc': phid_pc }, (res) => {
                    // 先检查res.data是否已经是对象
                    if (res.count == 0) return;
                    const data = JSON.parse(res.data);
                    if (data.length == 0) return;
                    //const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    zrcb = data[0].extendObjects.zrcb;
                    gkms = data[0].extendObjects.u_gkms;
                });

                setTimeout(() => {
                    if (gkms == 1) {
                        $NG.execServer("jhcbcsyssr", { 'pc': phid_pc }, (res) => {
                            // 先检查res.data是否已经是对象
                            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
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
                        });
                    }
                    //更新调整后预计收入                         
                    //$NG.getCmpApi('p_form_con_plan_m').getValues().phid
                    $NG.execServer("get_p_form_0000000092_m_srcj", { phid_pc: phid_pc }, function (res) {
                        if (res.count == 0) return;
                        const data = JSON.parse(res.data);
                        if (data.length == 0) return;
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
                    rows.forEach(row => {
                        // 非首次加载，不更新u_ewdjdlzb
                        const updatedRow = calculateRowValues(row, false);
                        dgrid.updateRow(updatedRow);
                    });
                    dgrid.refreshView();
                }

                $NG.execServer("hqdezzrcb", { 'pc': phid_pc }, (res) => {
                    // 先检查res.data是否已经是对象
                    if (res.count == 0) return;
                    const data = JSON.parse(res.data);
                    if (data.length == 0) return;
                    //const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    zrcb = data[0].extendObjects.zrcb;
                    gkms = data[0].extendObjects.u_gkms;
                });

                setTimeout(() => {
                    if (gkms == 1) {
                        $NG.execServer("jhcbcsyssr", { 'pc': phid_pc }, (res) => {
                            // 先检查res.data是否已经是对象
                            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
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
                        });
                    }
                    //更新调整后预计收入                         
                    //$NG.getCmpApi('p_form_con_plan_m').getValues().phid
                    $NG.execServer("get_p_form_0000000092_m_srcj", { phid_pc: phid_pc }, function (res) {
                        if (res.count == 0) return;
                        const data = JSON.parse(res.data);
                        if (data.length == 0) return;
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
                    });
                }, 100)

            }, 100)
        }

    } else if (editPage.oType == "view") {
        // 保留状态  无需操作
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
                console.log("phid_pc===============>", phid_pc);
                var ressxdata = typeof ressx.data === 'string' ? JSON.parse(ressx.data) : ressx.data;

                /**金额取动态合约规划 */
                $NG.execServer("jhcbewdzbdbdthygh", { 'pc': phid_pc }, (resje) => {
                    var resjedata = typeof resje.data === 'string' ? JSON.parse(resje.data) : resje.data;

                    for (let i = 0; i < ressx.count; i++) {
                        for (let n = 0; n < resje.count; n++) {
                            if (ressxdata[i].extendObjects.s_tree_name == resjedata[n].extendObjects.s_tree_name) {
                                ressxdata[i].extendObjects.u_htsryjhtsr = resjedata[n].extendObjects.u_htsryjhtsr;
                                ressxdata[i].extendObjects.u_jhcbcbhj = resjedata[n].extendObjects.u_jhcbcbhj;
                            }
                        }
                    }

                    /**构建树形结构 */
                    var targetData = ressxdata?.map((item) => {
                        return { ...item.extendObjects }
                    });
                    var treeData = flatArrayToTree(targetData)

                    // 首次加载时设置标记
                    isInitialLoad = true;

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
                })
            });

            $NG.execServer("hqdezzrcb", { 'pc': phid_pc }, (res) => {
                if (res.count == 0) return;
                const data = JSON.parse(res.data);
                if (data.length == 0) return;
                // 先检查res.data是否已经是对象
                //const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                //zrcb = data[0].extendObjects.zrcb;
                gkms = data[0].extendObjects.u_gkms;
            });

            setTimeout(() => {
                if (gkms == 1) {
                    $NG.execServer("jhcbcsyssr", { 'pc': phid_pc }, (res) => {
                        // 先检查res.data是否已经是对象
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
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
                    });
                }
                //更新调整后预计收入                         
                //$NG.getCmpApi('p_form_con_plan_m').getValues().phid
                $NG.execServer("get_p_form_0000000092_m_srcj", { phid_pc: phid_pc }, function (res) {
                    if (res.count == 0) return;
                    const data = JSON.parse(res.data);
                    if (data.length == 0) return;
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
                });
            }, 100)

        }, 100);
    }, p_form_0000000092_m.phid_pc);

    // 单行数据更新
    useUpdateRows(({ args, table }) => {
        const record = args[0];

        // 跳过特定行的自动计算
        const shouldSkipCalculation =
            record.s_tree_name === "摊销余额及盘点冲抵成本" ||
            record.s_tree_name === "二次经营创效";

        const updatedRecord = shouldSkipCalculation
            ? record
            : calculateRowValues(record, false);

        table.updateRow(updatedRecord)

        // 重新计算父节点的值
        setTimeout(() => {
            var rows = table.getRows();
            const treeData = rows.filter(row => !row.s_tree_name || row.s_tree_name !== '合计');
            /**取消子节点合计汇总到父节点 */
            //calculateParentValues(treeData);
            if (rows) {
                rows.forEach(row => {

                    // 跳过特定行的计算
                    const shouldSkip =
                        row.s_tree_name === "摊销余额及盘点冲抵成本" ||
                        row.s_tree_name === "二次经营创效";

                    const updatedRow = shouldSkip ? row : calculateRowValues(row, false);

                    dgrid.updateRow(updatedRow);
                });
                dgrid.refreshView();
            }
            //更新表格中的所有行
            treeData.forEach(node => {
                table.updateRow(node);
            });

            // 最后更新合计行（会先清空再计算）
            // updateTotalRow(table);
            // const totalRow = rows.find(row => row.s_tree_name === '合计');
            // hjzrcb = totalRow.u_zrcbcbhj;
            // console.log('totalRow.u_zrcbcbhj==================', totalRow.u_zrcbcbhj)
        }, 100);

    }, "p_form_0000000092_d");

    // 选择特定行设置只读
    useAction("clickHighlight")(function (e) {
        const row = dgrid.getSelectedData();
        console.log("row==============>", row)

        /*if (row[0].s_tree_name == "合计") {
            $NG.getCmpApi('toolbar_p_form_0000000092_d').setReadOnly('addchildren', true);
            dgrid.setReadOnly(true);
        }*/

        if (row[0].s_tree_name == "摊销余额及盘点冲抵成本" || row[0].s_tree_name == "二次经营创效") {
            $NG.getCmpApi('toolbar_p_form_0000000092_d').setReadOnly('addchildren', true);
            $NG.updateUI(function (updater, state) {
                // 修改customfilebilltoform表单BilltoId字段的required属性
                updater.editGrid.p_form_0000000092_d.u_jhcbjde.setProps({ disabled: false });
                updater.editGrid.p_form_0000000092_d.u_ewdzb.setProps({ disabled: false });
                updater.editGrid.p_form_0000000092_d.u_jhcbdj.setProps({ disabled: false });
            });
            dgrid.setReadOnly(false);

        } else {
            $NG.getCmpApi('toolbar_p_form_0000000092_d').setReadOnly('addchildren', false);
            $NG.updateUI(function (updater, state) {
                updater.editGrid.p_form_0000000092_d.u_jhcbjde.setProps({ disabled: true });
                updater.editGrid.p_form_0000000092_d.u_ewdzb.setProps({ disabled: true });
                updater.editGrid.p_form_0000000092_d.u_jhcbdj.setProps({ disabled: true });
            });
            dgrid.setReadOnly(false);
        }
    }, "p_form_0000000092_d");

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
    // if (tree.length > 0) {
    //     const totalRow = {
    //         s_tree_id: 'total',
    //         s_tree_name: '合计',
    //         s_tree_pid: '0',
    //         u_htsryjhtsr: '0.00',
    //         u_zrcbjde: '0.00',
    //         u_jhcbjde: '0.00',
    //         u_ewdzb: '0.00',
    //         u_jhcbcbhj: '0.00',
    //         u_zrcbcbhj: '0.00',
    //         isTotal: true, // 标记为合计行
    //     };

    //     // 累加所有根节点
    //     tree.forEach(node => {
    //         if ((!node.s_tree_pid || node.s_tree_pid === '0')) {
    //             totalRow.u_htsryjhtsr = (parseFloat(totalRow.u_htsryjhtsr) + parseFloat(node.u_htsryjhtsr || 0)).toFixed(2);
    //             totalRow.u_zrcbjde = (parseFloat(totalRow.u_zrcbjde) + parseFloat(node.u_zrcbjde || 0)).toFixed(2);
    //             totalRow.u_jhcbjde = (parseFloat(totalRow.u_jhcbjde) + parseFloat(node.u_jhcbjde || 0)).toFixed(2);
    //             totalRow.u_ewdzb = (parseFloat(totalRow.u_ewdzb) + parseFloat(node.u_ewdzb || 0)).toFixed(2);
    //             totalRow.u_jhcbcbhj = (parseFloat(totalRow.u_jhcbcbhj) + parseFloat(node.u_jhcbcbhj || 0)).toFixed(2);
    //             totalRow.u_zrcbcbhj = (parseFloat(totalRow.u_zrcbcbhj) + parseFloat(node.u_zrcbcbhj || 0)).toFixed(2);
    //         }
    //     });

    //     tree.push(totalRow);
    // }

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

// 提取计算逻辑为独立函数
function calculateRowValues(record, isInitialLoad = false) {


    const shouldSkip =
        record.s_tree_name === "摊销余额及盘点冲抵成本" ||
        record.s_tree_name === "二次经营创效";

    if (shouldSkip) {
        // 保留原始值，不做任何计算
        return record;
    }

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

    // 责任成本降低额自动带出
    if (record.u_htsryjhtsr && record.u_zrcbcbhj) {
        record.u_zrcbjde = (
            parseFloat(record.u_htsryjhtsr) - parseFloat(record.u_zrcbcbhj)
        ).toFixed(2);
    } else if (record.u_htsryjhtsr === undefined || record.u_zrcbcbhj === undefined) {
        // 当字段未定义时，确保有默认值
        record.u_zrcbjde = "0.00";
    }

    // 责任成本降低率自动带出
    if (record.u_zrcbjde && record.u_htsryjhtsr) {

        if (parseFloat(record.u_htsryjhtsr) !== 0) {
            record.u_zrcbjdl = (
                parseFloat(record.u_zrcbjde) / parseFloat(record.u_htsryjhtsr)
            ).toFixed(2);
        } else {
            record.u_zrcbjdl = "0.00";
        }
    } else if (record.u_zrcbjde === undefined || record.u_htsryjhtsr === undefined) {
        // 当字段未定义时，确保有默认值
        record.u_zrcbjdl = "0.00";
    }

    // 责任成本合价自动带出
    if (record.u_zrcbgcl && record.u_zrcbdj) {
        record.u_zrcbcbhj = (
            parseFloat(record.u_zrcbgcl) * parseFloat(record.u_zrcbdj)
        ).toFixed(2);
    } else if (record.u_zrcbdj === undefined || record.u_zrcbgcl === undefined) {
        // 当字段未定义时，确保有默认值
        record.u_zrcbcbhj = "0.00";
    }

    // 计划成本单价自动带出
    if (record.u_jhcbcbhj && record.u_jhcbgcl) {
        if (parseFloat(record.u_jhcbgcl) !== 0) {
            record.u_jhcbdj = (
                parseFloat(record.u_jhcbcbhj) / parseFloat(record.u_jhcbgcl)
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
                parseFloat(record.u_jhcbjde) / parseFloat(record.u_htsryjhtsr)
            ).toFixed(2);
        } else {
            record.u_jhcbjdl = 0.00;
        }
    } else if (record.u_htsryjhtsr == undefined || record.u_jhcbjde == undefined) {
        //record.u_jhcbjdl = record.u_jhcbjdl || "0.00";
        record.u_jhcbjdl = 0.00;
    } else {
        record.u_jhcbjdl = 0.00;
    }

    // 二维度降低率指标自动带出（仅在首次加载且字段为空时设置）
    if (isInitialLoad &&
        (record.u_ewdjdlzb === undefined || record.u_ewdjdlzb === null || record.u_ewdjdlzb === '') &&
        record.u_jhcbjdl !== undefined && record.u_jhcbjdl !== null && record.u_jhcbjdl !== '') {
        record.u_ewdjdlzb = record.u_jhcbjdl;
    }

    // 二维度指标自动带出
    if (record.u_htsryjhtsr !== undefined && record.u_ewdjdlzb !== undefined) {
        record.u_ewdzb = (
            (parseFloat(record.u_htsryjhtsr) || 0) * (1 - (parseFloat(record.u_ewdjdlzb) || 0))
        ).toFixed(2);
    } else if (record.u_htsryjhtsr === undefined || record.u_ewdjdlzb === undefined) {
        record.u_ewdzb = record.u_ewdzb || "0.00";
    }

    return record;
}

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

    // // 更新合计行
    // updateTotalRow(dgrid);
}


/** 弃用 递归计算父节点的值（子节点值合计到父节点） */
// function calculateParentValues(nodes) {
//     nodes.forEach(node => {
//         // 跳过特定节点的计算（仅叶子节点）
//         const shouldSkip =
//             node.s_tree_name === "摊销余额及盘点冲抵成本" ||
//             node.s_tree_name === "二次经营创效";

//         if (shouldSkip) return;

//         if (node.children && node.children.length > 0) {
//             // 先递归计算子节点
//             calculateParentValues(node.children);

//             // 初始化父节点的值
//             node.u_htsryjhtsr = '0.00';
//             node.u_jhcbcbhj = '0.00';
//             node.u_zrcbjde = '0.00';
//             node.u_zrcbjdl = '0.00';
//             node.u_jhcbjde = '0.00';
//             node.u_jhcbjdl = '0.00';
//             node.u_ewdzb = '0.00';
//             node.u_ewdjdlzb = '0.00';
//             //node.u_jhcbgcl = '0.00';
//             node.u_jhcbdj = '0.00';
//             //node.u_zrcbgcl = '0.00';
//             node.u_zrcbdj = '0.00';
//             node.u_zrcbcbhj = '0.00';

//             // 累加所有子节点的值
//             node.children.forEach(child => {
//                 node.u_htsryjhtsr = (parseFloat(node.u_htsryjhtsr || 0) + (parseFloat(child.u_htsryjhtsr) || 0)).toFixed(2);
//                 node.u_jhcbcbhj = (parseFloat(node.u_jhcbcbhj || 0) + (parseFloat(child.u_jhcbcbhj) || 0)).toFixed(2);
//                 node.u_zrcbjde = (parseFloat(node.u_zrcbjde || 0) + (parseFloat(child.u_zrcbjde) || 0)).toFixed(2);
//                 node.u_zrcbjdl = (parseFloat(node.u_zrcbjdl || 0) + (parseFloat(child.u_zrcbjdl) || 0)).toFixed(2);
//                 node.u_jhcbjde = (parseFloat(node.u_jhcbjde || 0) + (parseFloat(child.u_jhcbjde) || 0)).toFixed(2);
//                 node.u_jhcbjdl = (parseFloat(node.u_jhcbjdl || 0) + (parseFloat(child.u_jhcbjdl) || 0)).toFixed(2);
//                 node.u_ewdzb = (parseFloat(node.u_ewdzb || 0) + (parseFloat(child.u_ewdzb) || 0)).toFixed(2);
//                 node.u_ewdjdlzb = (parseFloat(node.u_ewdjdlzb || 0) + (parseFloat(child.u_ewdjdlzb) || 0)).toFixed(2);
//                 //node.u_jhcbgcl = (parseFloat(node.u_jhcbgcl || 0) + (parseFloat(child.u_jhcbgcl) || 0)).toFixed(2);
//                 node.u_jhcbdj = (parseFloat(node.u_jhcbdj || 0) + (parseFloat(child.u_jhcbdj) || 0)).toFixed(2);
//                 //node.u_zrcbgcl = (parseFloat(node.u_zrcbgcl || 0) + (parseFloat(child.u_zrcbgcl) || 0)).toFixed(2);
//                 node.u_zrcbdj = (parseFloat(node.u_zrcbdj || 0) + (parseFloat(child.u_zrcbdj) || 0)).toFixed(2);
//                 node.u_zrcbcbhj = (parseFloat(node.u_zrcbcbhj || 0) + (parseFloat(child.u_zrcbcbhj) || 0)).toFixed(2);
//             });
//         }
//     });
// }

/** 弃用 清空合计行 */
// function clearTotalRow(grid) {
//     const rows = grid.getRows();
//     const totalRow = rows.find(row => row.s_tree_name === '合计');

//     if (!totalRow) return;

//     // 清空所有合计字段
//     totalRow.u_htsryjhtsr = '0.00';
//     totalRow.u_zrcbjde = '0.00';
//     totalRow.u_jhcbjde = '0.00';
//     totalRow.u_ewdzb = '0.00';
//     totalRow.u_jhcbcbhj = '0.00';
//     totalRow.u_zrcbcbhj = '0.00';

//     // 更新表格
//     grid.updateRow(totalRow);
// }

// // 更新合计行（先清空，再重新计算）
// function updateTotalRow(grid) {
//     clearTotalRow(grid); // 第一步：先清空合计行

//     const rows = grid.getRows();
//     let htsryjhtsrSum = 0;
//     let zrcbjdeSum = 0;
//     let jhcbjdeSum = 0;
//     let ewdzbSum = 0;
//     let jhcbcbhjSum = 0;
//     let zrcbcbhjSum = 0;

//     // 第二步：累加根节点（排除合计行和税金行）
//     rows.forEach(row => {
//         // 根节点条件：没有父节点ID 或 父节点ID为0/null
//         if ((!row.s_tree_pid || row.s_tree_pid === '0' || row.s_tree_pid === null) &&
//             !row.isTotal) {
//             htsryjhtsrSum += parseFloat(row.u_htsryjhtsr || 0);
//             zrcbjdeSum += parseFloat(row.u_zrcbjde || 0);
//             jhcbjdeSum += parseFloat(row.u_jhcbjde || 0);
//             ewdzbSum += parseFloat(row.u_ewdzb || 0);
//             jhcbcbhjSum += parseFloat(row.u_jhcbcbhj || 0);
//             zrcbcbhjSum += parseFloat(row.u_zrcbcbhj || 0);
//         }
//     });



//     // 第三步：构建合计数据
//     const totals = {
//         u_htsryjhtsr: htsryjhtsrSum.toFixed(2),
//         u_zrcbjde: zrcbjdeSum.toFixed(2),
//         u_jhcbjde: jhcbjdeSum.toFixed(2),
//         u_ewdzb: ewdzbSum.toFixed(2),
//         u_jhcbcbhj: jhcbcbhjSum.toFixed(2),
//         u_zrcbcbhj: zrcbcbhjSum.toFixed(2)
//     };

//     // 第四步：更新合计行
//     const totalRow = rows.find(row => row.s_tree_name === '合计');
//     if (totalRow) {
//         totalRow.u_htsryjhtsr = totals.u_htsryjhtsr;
//         totalRow.u_zrcbjde = totals.u_zrcbjde;
//         totalRow.u_jhcbjde = totals.u_jhcbjde;
//         totalRow.u_ewdzb = totals.u_ewdzb;
//         totalRow.u_jhcbcbhj = totals.u_jhcbcbhj;
//         totalRow.u_zrcbcbhj = totals.u_zrcbcbhj;

//         // 计算
//         const record = calculateRowValues(totalRow, false);
//         grid.updateRow(record);
//     }
// }