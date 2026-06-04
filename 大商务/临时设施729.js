function flatArrayToTree(flatArray, rootId = null) {
    const tree = [];
    const map = {};
    //树形结构

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
    
    // 计算父节点的值（子节点值合计到父节点）
    calculateParentValues(tree);
    
    return tree;
}


$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick }
) {
    //自动带出
    var mstform = $NG.getCmpApi('p_form_0000000077_m');
    console.log("mstform:", mstform);
    const bill_no = mstform.getValues().bill_no;
    console.log("bill_no:", bill_no);
    const phid_pc = mstform.getValues().phid_pc;
    console.log("phid_pc:", phid_pc);
    $NG.execServer("gjdjdclssj", {
        'phid': phid_pc
    }, function (res) {
        console.log("res.data:", res.data);
        
        // 添加判空校验
        if (!res.data) {
            console.error("res.data 为空或未定义");
            return;
        }
        
        try {
            const data = JSON.parse(res.data);
            console.log("data[0].extendObjects:" + data[0].extendObjects);
            const u_lsssewzb = data[0].extendObjects.u_lsssewzb;
            console.log("u_lsssewzb:", u_lsssewzb);
            //项目公司、投资概算
            $NG.updateState((updater) => {
                updater.data.p_form_0000000077_m.setProps({
                    u_lsssewzb: u_lsssewzb,
                });
            });
        } catch (error) {
            console.error("JSON 解析失败:", error);
            console.error("原始数据:", res.data);
        }
    });
    useValuesChange(({ args }) => {
        // 监听 phid_pc 变化，自动获取二维指标
        const phid_pc = mstform.getValues().phid_pc;
        if (phid_pc) {
            $NG.execServer("gjdjdclssj", {
                'phid': phid_pc
            }, function (res) {
                console.log("res.data:", res.data);
                
                // 添加判空校验
                if (!res.data) {
                    console.error("res.data 为空或未定义");
                    return;
                }
                
                try {
                    const data = JSON.parse(res.data);
                    console.log("data[0].extendObjects:" + data[0].extendObjects);
                    const u_lsssewzb = data[0].extendObjects.u_lsssewzb;
                    console.log("u_lsssewzb:", u_lsssewzb);
                    //项目公司、投资概算
                    $NG.updateState((updater) => {
                        updater.data.p_form_0000000077_m.setProps({
                            u_lsssewzb: u_lsssewzb,
                        });
                    });
                } catch (error) {
                    console.error("JSON 解析失败:", error);
                    console.error("原始数据:", res.data);
                }
            });
        }
    }, p_form_0000000077_m.phid_pc);
    // ============= 树形表格加载 =============
    const dgrid = $NG.getCmpApi('p_form_0000000077_d2');

    // 监听dgrid的u_zght字段变化，动态更新汇总
    useDataIndexChange(({ args }) => {
        // 获取当前dgrid的所有行数据
        const rows = dgrid.getRows();
        console.log("所有行数据:", rows);
        
        // 重新计算父节点的汇总值
        calculateParentValuesFromRows(rows);
        
        // 更新表格显示，刷新父节点的综合合体
        rows.forEach((row) => {
            if (row.children && row.children.length > 0) {
                // 更新父节点的显示
                dgrid.updateRow(row);
            }
        });
        
        // 刷新整个表格显示
        dgrid.refreshView();
        
        // 动态计算所有根节点的汇总值并更新主表
        calculateTotalFromAllRootNodes(rows);
    }, "u_zght");
    
    // 新增：监听增行、删行、数据变化等操作
    useUpdateRows(({ args, table }) => {
        console.log("useUpdateRows触发 - 增行/删行/数据变化");
        if (table && table.id === 'p_form_0000000077_d2') {
            // 获取当前dgrid的所有行数据
            const rows = dgrid.getRows();
            if (rows && rows.length > 0) {
                // 重新计算父节点的汇总值
                calculateParentValuesFromRows(rows);
                
                // 更新表格显示，刷新父节点的综合合体
                rows.forEach((row) => {
                    if (row.children && row.children.length > 0) {
                        // 更新父节点的显示
                        dgrid.updateRow(row);
                    }
                });
                
                // 刷新整个表格显示
                dgrid.refreshView();
                
                // 动态计算所有根节点的汇总值并更新主表
                calculateTotalFromAllRootNodes(rows);
            }
        }
    }, "p_form_0000000077_d2");

    if (editPage.oType == "add") {
        const phid_pc = mstform.getValues().phid_pc;
        if (dgrid.getRows().length == 0) {
            setTimeout(() => {
                $NG.execServer("lsss", { 'billname': '临时设施' }, (res) => {
                    console.log("phid_pc===============>", phid_pc);
                    // 先检查res.data是否已经是对象
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log('data', data)
                    const targetData = data?.map((item) => {
                        return { ...item.extendObjects }
                    })?.reverse();
                    const treeData = flatArrayToTree(targetData);
                    dgrid.addRows(treeData);
                    dgrid.refreshView();
                    
                    // 更新主表的项目部拟发生成本
                    updateMainFormTotal(treeData);
                });
            }, 100);
        }
        useValuesChange(({ args }) => {
            dgrid.clearRows();
            const phid_pc = mstform.getValues().phid_pc;
            setTimeout(() => {
                $NG.execServer("lsss", { 'billname': '临时设施' }, (res) => {
                    console.log("phid_pc===============>", phid_pc);
                    // 先检查res.data是否已经是对象
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log('data', data)
                    const targetData = data?.map((item) => {
                        return { ...item.extendObjects }
                    })?.reverse();
                    const treeData = flatArrayToTree(targetData);
                    dgrid.addRows(treeData);
                    dgrid.refreshView();
                    
                    // 更新主表的项目部拟发生成本
                    updateMainFormTotal(treeData);
                });
            }, 100);
        }, p_form_0000000077_m.phid_pc);
    } else if (editPage.oType == "edit") {
        const phid_pc = mstform.getValues().phid_pc;
        if (dgrid.getRows().length == 0) {
            setTimeout(() => {
                $NG.execServer("lsss", { 'billname': '临时设施' }, (res) => {
                    console.log("phid_pc===============>", phid_pc);
                    // 先检查res.data是否已经是对象
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log('data', data)
                    const targetData = data?.map((item) => {
                        return { ...item.extendObjects }
                    })?.reverse();
                    const treeData = flatArrayToTree(targetData);
                    dgrid.addRows(treeData);
                    dgrid.refreshView();
                    
                    // 更新主表的项目部拟发生成本
                    updateMainFormTotal(treeData);
                });
            }, 100);
        }
        useValuesChange(({ args }) => {
            dgrid.clearRows();
            const phid_pc = mstform.getValues().phid_pc;
            setTimeout(() => {
                $NG.execServer("lsss", { 'billname': '临时设施' }, (res) => {
                    console.log("phid_pc===============>", phid_pc);
                    // 先检查res.data是否已经是对象
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log('data', data)
                    const targetData = data?.map((item) => {
                        return { ...item.extendObjects }
                    })?.reverse();
                    const treeData = flatArrayToTree(targetData);
                    dgrid.addRows(treeData);
                    dgrid.refreshView();
                    
                    // 更新主表的项目部拟发生成本
                    updateMainFormTotal(treeData);
                });
            }, 100);
        }, p_form_0000000077_m.phid_pc);
    }

    //汇总求和
    $NG.AllReady(function (
        editPage,
        { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick }
    ) {
        //TODO
        useDataIndexChange(({ args }) => {
            // 获取当前dgrid的所有行数据
            const dgrid = $NG.getCmpApi('p_form_0000000077_d2');
            const rows = dgrid.getRows();
            
            if (rows && rows.length > 0) {
                // 重新计算父节点的汇总值
                calculateParentValuesFromRows(rows);
                
                // 动态计算所有根节点的汇总值并更新主表
                calculateTotalFromAllRootNodes(rows);
            }
        }, "u_zght");
    });
});

// 递归计算父节点的值（子节点值合计到父节点）
function calculateParentValues(nodes) {
    nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
            // 先递归计算子节点
            calculateParentValues(node.children);

            // 初始化父节点的综合合体
            node.u_zght = '0.00';

            // 累加所有子节点的综合合体
            node.children.forEach(child => {
                node.u_zght = (parseFloat(node.u_zght || 0) + (parseFloat(child.u_zght) || 0)).toFixed(2);
            });
        }
    });
}

// 计算末级节点的综合合体总和并更新到主表
function updateMainFormTotal(treeData) {
    console.log("updateMainFormTotal - 开始处理树形数据，根节点数量:", treeData.length);
    
    // 使用新的汇总函数计算所有根节点的汇总值
    calculateTotalFromAllRootNodes(treeData);
}

// 动态更新树形结构汇总和主表字段
function updateTreeAndMainForm(rows) {
    // 重新计算父节点的汇总值
    calculateParentValuesFromRows(rows);
    
    // 收集所有末级节点的综合合体总和
    let totalAmount = 0;
    
    function collectLeafNodeAmounts(nodes) {
        nodes.forEach(node => {
            if (!node.children || node.children.length === 0) {
                // 末级节点，累加综合合体
                totalAmount += parseFloat(node.u_zght || 0);
            } else {
                // 非末级节点，递归处理子节点
                collectLeafNodeAmounts(node.children);
            }
        });
    }
    
    collectLeafNodeAmounts(rows);
    
    // 更新主表的项目部拟发生成本
    $NG.updateState((updater) => {
        updater.data.p_form_0000000077_m.setProps({
            u_xmbnfscb: totalAmount.toFixed(2),
        });
    });
}

// 从行数据重新计算父节点的值
function calculateParentValuesFromRows(nodes) {
    nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
            // 先递归计算子节点
            calculateParentValuesFromRows(node.children);

            // 初始化父节点的综合合体
            node.u_zght = '0.00';

            // 累加所有子节点的综合合体
            node.children.forEach(child => {
                node.u_zght = (parseFloat(node.u_zght || 0) + (parseFloat(child.u_zght) || 0)).toFixed(2);
            });
        }
    });
}

// 动态计算所有根节点的汇总值并更新主表
function calculateTotalFromAllRootNodes(rows) {
    let totalAmount = 0;

    // 递归收集所有根节点的综合合体
    function collectRootNodeAmounts(nodes) {
        nodes.forEach(node => {
            if (!node.children || node.children.length === 0) {
                // 根节点是末级节点，累加其综合合体
                totalAmount += parseFloat(node.u_zght || 0);
                console.log("calculateTotalFromAllRootNodes - 根节点:", node.s_tree_name, "综合合体:", node.u_zght);
            } else {
                // 根节点不是末级节点，递归处理其子节点
                collectRootNodeAmounts(node.children);
            }
        });
    }

    // 遍历所有根节点，收集其下的末级节点
    rows.forEach(item => {
        // 只处理根节点
        if (!item.s_tree_pid || item.s_tree_pid === '0' || item.s_tree_pid === 0) {
            console.log("calculateTotalFromAllRootNodes - 处理根节点:", item.s_tree_name, "ID:", item.s_tree_id);
            collectRootNodeAmounts([item]);
        }
    });

    console.log("calculateTotalFromAllRootNodes - 所有根节点汇总金额:", totalAmount);

    // 更新主表的项目部拟发生成本
    $NG.updateState((updater) => {
        updater.data.p_form_0000000077_m.setProps({
            u_xmbnfscb: totalAmount.toFixed(2),
        });
    });
}

