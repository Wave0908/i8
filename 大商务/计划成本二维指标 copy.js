$NG.AllReady(function (editPage, {
    useValuesChange, useUpdateRow, useUpdateRows
}) {
    var mstform = $NG.getCmpApi('p_form_0000000092_m');
    var dgrid = $NG.getCmpApi('p_form_0000000092_d');
    console.log("dgrid=======================>", dgrid)

    // 标记是否首次加载数据
    let isInitialLoad = true;

    if (editPage.oType == "add") {  // 新增状态
        const phid_pc = mstform.getValues().phid_pc;
        if (dgrid.getRows().length == 0) {
            setTimeout(() => {
                $NG.execServer("jhcbewdzbdbdthygh", { 'pc': phid_pc }, (res) => {
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
                });
            }, 100);
        }
        useValuesChange(({ args }) => {
            dgrid.clearRows();
            const phid_pc = mstform.getValues().phid_pc;
            setTimeout(() => {
                $NG.execServer("jhcbewdzbdbdthygh", { 'pc': phid_pc }, (res) => {
                    console.log("phid_pc===============>", phid_pc);
                    console.log("res============>", res)
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
                });
            }, 100);
        }, p_form_0000000092_m.phid_pc);
    } else if (editPage.oType == "edit") {  // 修改状态
        const phid_pc = mstform.getValues().phid_pc;
        if (dgrid.getRows().length == 0) {
            setTimeout(() => {
                $NG.execServer("jhcbewdzbdbdthygh", { 'pc': phid_pc }, (res) => {
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
                });
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
            }, 100)
        }
        useValuesChange(({ args }) => {
            dgrid.clearRows();
            const phid_pc = mstform.getValues().phid_pc;
            setTimeout(() => {
                $NG.execServer("jhcbewdzbdbdthygh", { 'pc': phid_pc }, (res) => {
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
                });
            }, 100);
        }, p_form_0000000092_m.phid_pc);
    } else if (editPage.oType == "view") {
        // 保留状态  无需操作
    }
    // 单行数据更新
    var tables = $NG.getCmpApi("p_form_0000000092_d");
    useUpdateRows(({ args, table }) => {
        const record = args[0];
        // 单行更新时，不更新u_ewdjdlzb
        const updatedRecord = calculateRowValues(record, false);
        tables.updateRow(updatedRecord);
        // 重新计算父节点的值
        setTimeout(() => {
            var rows = table.getRows();
            const treeData = rows.filter(row => !row.s_tree_name || row.s_tree_name !== '合计');
            calculateParentValues(treeData);
            if (rows) {
                rows.forEach(row => {
                    // 不更新u_ewdjdlzb
                    const updatedRow = calculateRowValues(row, false);
                    dgrid.updateRow(updatedRow);
                });
                dgrid.refreshView();
            }
            // 更新表格中的所有行
            treeData.forEach(node => {
                table.updateRow(node);
            });

            // 最后更新合计行（会先清空再计算）
            updateTotalRow(table);
        }, 100);
    }, "p_form_0000000092_d");

}, function () {
    console.log('list Ready');
});

// 递归计算父节点的值（子节点值合计到父节点）
function calculateParentValues(nodes) {
    nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
            // 先递归计算子节点
            calculateParentValues(node.children);

            // 初始化父节点的值
            node.u_htsryjhtsr = '0.00';
            node.u_jhcbcbhj = '0.00';
            node.u_zrcbjde = '0.00';
            node.u_zrcbjdl = '0.00';
            node.u_jhcbjde = '0.00';
            node.u_jhcbjdl = '0.00';
            node.u_ewdzb = '0.00';
            node.u_ewdjdlzb = '0.00';
            node.u_jhcbgcl = '0.00';
            node.u_jhcbdj = '0.00';
            node.u_zrcbgcl = '0.00';
            node.u_zrcbdj = '0.00';
            node.u_zrcbcbhj = '0.00';

            // 累加所有子节点的值
            node.children.forEach(child => {
                node.u_htsryjhtsr = (parseFloat(node.u_htsryjhtsr || 0) + (parseFloat(child.u_htsryjhtsr) || 0)).toFixed(2);
                node.u_jhcbcbhj = (parseFloat(node.u_jhcbcbhj || 0) + (parseFloat(child.u_jhcbcbhj) || 0)).toFixed(2);
                node.u_zrcbjde = (parseFloat(node.u_zrcbjde || 0) + (parseFloat(child.u_zrcbjde) || 0)).toFixed(2);
                node.u_zrcbjdl = (parseFloat(node.u_zrcbjdl || 0) + (parseFloat(child.u_zrcbjdl) || 0)).toFixed(2);
                node.u_jhcbjde = (parseFloat(node.u_jhcbjde || 0) + (parseFloat(child.u_jhcbjde) || 0)).toFixed(2);
                node.u_jhcbjdl = (parseFloat(node.u_jhcbjdl || 0) + (parseFloat(child.u_jhcbjdl) || 0)).toFixed(2);
                node.u_ewdzb = (parseFloat(node.u_ewdzb || 0) + (parseFloat(child.u_ewdzb) || 0)).toFixed(2);
                node.u_ewdjdlzb = (parseFloat(node.u_ewdjdlzb || 0) + (parseFloat(child.u_ewdjdlzb) || 0)).toFixed(2);
                node.u_jhcbgcl = (parseFloat(node.u_jhcbgcl || 0) + (parseFloat(child.u_jhcbgcl) || 0)).toFixed(2);
                node.u_jhcbdj = (parseFloat(node.u_jhcbdj || 0) + (parseFloat(child.u_jhcbdj) || 0)).toFixed(2);
                node.u_zrcbgcl = (parseFloat(node.u_zrcbgcl || 0) + (parseFloat(child.u_zrcbgcl) || 0)).toFixed(2);
                node.u_zrcbdj = (parseFloat(node.u_zrcbdj || 0) + (parseFloat(child.u_zrcbdj) || 0)).toFixed(2);
                node.u_zrcbcbhj = (parseFloat(node.u_zrcbcbhj || 0) + (parseFloat(child.u_zrcbcbhj) || 0)).toFixed(2);
            });
        }
    });
}

// 清空合计行
function clearTotalRow(grid) {
    const rows = grid.getRows();
    const totalRow = rows.find(row => row.s_tree_name === '合计');

    if (!totalRow) return;

    // 清空所有合计字段
    totalRow.u_htsryjhtsr = '0.00';
    totalRow.u_zrcbjde = '0.00';
    totalRow.u_jhcbjde = '0.00';
    totalRow.u_ewdzb = '0.00';
    totalRow.u_jhcbcbhj = '0.00';
    totalRow.u_zrcbcbhj = '0.00';

    // 更新表格
    grid.updateRow(totalRow);
}

// 更新合计行（先清空，再重新计算）
function updateTotalRow(grid) {
    clearTotalRow(grid); // 第一步：先清空合计行

    const rows = grid.getRows();
    let htsryjhtsrSum = 0;
    let zrcbjdeSum = 0;
    let jhcbjdeSum = 0;
    let ewdzbSum = 0;
    let jhcbcbhjSum = 0;
    let zrcbcbhjSum = 0;

    // 第二步：仅对"叶子节点"进行累加
    rows.forEach(row => {
        if (!row.children || row.children.length === 0) {
            htsryjhtsrSum += parseFloat(row.u_htsryjhtsr || 0);
            zrcbjdeSum += parseFloat(row.u_zrcbjde || 0);
            jhcbjdeSum += parseFloat(row.u_jhcbjde || 0);
            ewdzbSum += parseFloat(row.u_ewdzb || 0);
            jhcbcbhjSum += parseFloat(row.u_jhcbcbhj || 0);
            zrcbcbhjSum += parseFloat(row.u_zrcbcbhj || 0);
        }
    });

    // 第三步：构建合计数据
    const totals = {
        u_htsryjhtsr: htsryjhtsrSum.toFixed(2),
        u_zrcbjde: zrcbjdeSum.toFixed(2),
        u_jhcbjde: jhcbjdeSum.toFixed(2),
        u_ewdzb: ewdzbSum.toFixed(2),
        u_jhcbcbhj: jhcbcbhjSum.toFixed(2),
        u_zrcbcbhj: zrcbcbhjSum.toFixed(2)
    };

    // 第四步：更新合计行
    const totalRow = rows.find(row => row.s_tree_name === '合计');
    if (totalRow) {
        totalRow.u_htsryjhtsr = totals.u_htsryjhtsr;
        totalRow.u_zrcbjde = totals.u_zrcbjde;
        totalRow.u_jhcbjde = totals.u_jhcbjde;
        totalRow.u_ewdzb = totals.u_ewdzb;
        totalRow.u_jhcbcbhj = totals.u_jhcbcbhj;
        totalRow.u_zrcbcbhj = totals.u_zrcbcbhj;

        // 计算
        const record = calculateRowValues(totalRow, false);
        grid.updateRow(record);
    }
}

// 计算树形结构的最大深度
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

    // 新增：添加合计行
    if (tree.length > 0) {
        // 创建合计行
        const totalRow = {
            s_tree_id: 'total',
            s_tree_name: '合计',
            s_tree_pid: '0',
            u_htsryjhtsr: '0.00',
            u_zrcbjde: '0.00',
            u_jhcbjde: '0.00',
            u_ewdzb: '0.00',
            u_jhcbcbhj: '0.00',
            u_zrcbcbhj: '0.00',
            isTotal: true // 标记为合计行
        };

        // 递归收集所有末级节点
        function collectLeafNodes(nodes) {
            let leafNodes = [];
            nodes.forEach(node => {
                if (!node.children || node.children.length === 0) {
                    leafNodes.push(node);
                } else {
                    leafNodes = leafNodes.concat(collectLeafNodes(node.children));
                }
            });
            return leafNodes;
        }

        // 获取所有末级节点
        const leafNodes = collectLeafNodes(tree);

        // 计算合计值
        leafNodes.forEach(node => {
            totalRow.u_htsryjhtsr = (parseFloat(totalRow.u_htsryjhtsr) + parseFloat(node.u_htsryjhtsr || 0)).toFixed(2);
            totalRow.u_zrcbjde = (parseFloat(totalRow.u_zrcbjde) + parseFloat(node.u_zrcbjde || 0)).toFixed(2);
            totalRow.u_jhcbjde = (parseFloat(totalRow.u_jhcbjde) + parseFloat(node.u_jhcbjde || 0)).toFixed(2);
            totalRow.u_ewdzb = (parseFloat(totalRow.u_ewdzb) + parseFloat(node.u_ewdzb || 0)).toFixed(2);
            totalRow.u_jhcbcbhj = (parseFloat(totalRow.u_jhcbcbhj) + parseFloat(node.u_jhcbcbhj || 0)).toFixed(2);
            totalRow.u_zrcbcbhj = (parseFloat(totalRow.u_zrcbcbhj) + parseFloat(node.u_zrcbcbhj || 0)).toFixed(2);
        });

        // 添加合计行到树的顶层
        tree.push(totalRow);
    }

    return tree;
}

// 提取计算逻辑为独立函数
function calculateRowValues(record, isInitialLoad = false) {
    // 责任成本单价自动带出
    if (record.u_zrcbcbhj && record.u_zrcbgcl) {
        if (parseFloat(record.u_zrcbgcl) !== 0) {
            record.u_zrcbdj = (
                parseFloat(record.u_zrcbcbhj) / parseFloat(record.u_zrcbgcl)
            ).toFixed(2);
        } else {
            // 除数为0时，设置为0.00（避免NaN）
            record.u_zrcbdj = "0.00";
        }
    } else if (record.u_zrcbcbhj === undefined || record.u_zrcbgcl === undefined) {
        // 当字段未定义时，确保有默认值
        record.u_zrcbdj = record.u_zrcbdj || "0.00";
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
    if (record.u_htsryjhtsr !== undefined && record.u_jhcbjde !== undefined) {
        if (parseFloat(record.u_htsryjhtsr) !== 0) {
            record.u_jhcbjdl = (
                parseFloat(record.u_jhcbjde) / parseFloat(record.u_htsryjhtsr)
            ).toFixed(2);
        } else {
            record.u_jhcbjdl = "0.00";
        }
    } else if (record.u_htsryjhtsr === undefined || record.u_jhcbjde === undefined) {
        record.u_jhcbjdl = record.u_jhcbjdl || "0.00";
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