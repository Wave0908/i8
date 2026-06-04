$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick, useBeforeClick }
) {
    //TODO
    var mstform = $NG.getCmpApi('p_form_0000000076_m');
    console.log("mstform:", mstform);
    const bill_no = mstform.getValues().bill_no;
    console.log("bill_no:", bill_no);
    const phid_pc = mstform.getValues().phid_pc;
    console.log("phid_pc:", phid_pc);



    // 查询二维指标并更新u_jxfewcb的函数
    function updateJxfewcb(phid_pc) {
        if (phid_pc) {
            $NG.execServer("gjdjdcjxfewcbzb", {
                phid: phid_pc
            }, function (res) {
                const data = JSON.parse(res.data);
                console.log("data[0].extendObjects:" + data[0].extendObjects);
                const u_jxfewcb = data[0].extendObjects.u_jxfewcb;
                $NG.updateState((updater) => {
                    updater.data.p_form_0000000076_m.setProps({
                        u_jxfewcb: u_jxfewcb,
                    });
                });
            });
        }
    }

    // 初始加载时查询二维指标
    updateJxfewcb(phid_pc);

    // 监听主表phid_pc字段变化，动态查询二维指标
    useValuesChange(({ args }) => {
        console.log("phid_pc字段变化:", args);
        const newPhidPc = mstform.getValues().phid_pc;
        console.log("新的phid_pc:", newPhidPc);

        // 当phid_pc变化时，重新查询二维指标
        updateJxfewcb(newPhidPc);
    }, "p_form_0000000076_m.phid_pc");

    ///====================树形====================
    var dgrid = $NG.getCmpApi('p_form_0000000076_d1');
    console.log("dgrid===============>", dgrid);

    // 监听删行按钮点击前事件，将当前行的u_gsje清零
    useBeforeClick(async function ({ args }) {
        // 获取当前选中的行数据
        const selectedData = dgrid.getSelectedData();
        if (selectedData && selectedData.length > 0) {
            const currentRow = selectedData[0];
            console.log("删行前 - 当前选中行:", currentRow);

            // 将当前行的u_gsje清零
            currentRow.u_gsje = '0.00';

            // 更新行数据
            dgrid.updateRow(currentRow);

            console.log("删行前 - 已将当前行u_gsje清零:", currentRow.u_gsje);

            // 手动触发汇总计算
            const rows = dgrid.getRows();
            console.log("删行前 - 重新计算汇总，当前行数据:", rows);

            // 重新计算父节点的汇总值
            calculateParentValuesFromRowsWithReset(rows);

            // 更新表格显示，刷新父节点的估算金额
            rows.forEach((row) => {
                dgrid.updateRow(row);
            });

            // 刷新整个表格显示
            dgrid.refreshView();

            // 重新计算汇总并更新主表
            var sumAmt = 0;

            // 递归收集所有末级节点的估算金额
            function collectLeafNodeAmounts(nodes) {
                nodes.forEach(node => {
                    if (!node.children || node.children.length === 0) {
                        // 末级节点，累加估算金额
                        sumAmt += parseFloat(node.u_gsje || 0);
                    } else {
                        // 非末级节点，递归处理子节点
                        collectLeafNodeAmounts(node.children);
                    }
                });
            }

            // 遍历所有根节点，收集其下的末级节点
            rows.forEach((item) => {
                // 只处理根节点
                if (!item.s_tree_pid || item.s_tree_pid === '0' || item.s_tree_pid === 0) {
                    collectLeafNodeAmounts([item]);
                }
            });

            console.log("删行前 - 重新计算后的汇总金额:", sumAmt);

            // 更新主表的项目部拟发生成本
            $NG.updateState((updater) => {
                updater.data.p_form_0000000076_m.setProps({
                    u_xmbnfscb: sumAmt * 10000,
                });
            });
        }
    }, "deleterow");

    // 监听dgrid的u_gsje字段变化，动态更新汇总
    useDataIndexChange(({ args }) => {
        // 获取当前dgrid的所有行数据
        const rows = dgrid.getRows();
        console.log("所有行数据:", rows);

        // 重新计算父节点的汇总值（使用带重置功能的函数）
        calculateParentValuesFromRowsWithReset(rows);

        // 更新表格显示，刷新父节点的估算金额
        rows.forEach((row) => {
            if (row.children && row.children.length > 0) {
                // 更新父节点的显示
                dgrid.updateRow(row);
            }
        });

        // 刷新整个表格显示
        dgrid.refreshView();

        var sumAmt = 0;

        // 递归收集所有末级节点的估算金额
        function collectLeafNodeAmounts(nodes) {
            nodes.forEach(node => {
                if (!node.children || node.children.length === 0) {
                    // 末级节点，累加估算金额
                    sumAmt += parseFloat(node.u_gsje || 0);
                    console.log("末级节点:", node.s_tree_name, "估算金额:", node.u_gsje);
                } else {
                    // 非末级节点，递归处理子节点
                    collectLeafNodeAmounts(node.children);
                }
            });
        }

        // 遍历所有根节点，收集其下的末级节点
        rows.forEach((item) => {
            // 只处理根节点
            if (!item.s_tree_pid || item.s_tree_pid === '0' || item.s_tree_pid === 0) {
                collectLeafNodeAmounts([item]);
            }
        });

        console.log("所有末级节点汇总金额:", sumAmt);
        //汇总赋值
        $NG.updateState((updater) => {
            updater.data.p_form_0000000076_m.setProps({
                u_xmbnfscb: sumAmt * 10000,
            });
        });
    }, "u_gsje");

    // 新增：监听增行、删行、数据变化等操作
    useUpdateRows(({ args, table }) => {
        console.log("useUpdateRows触发 - 增行/删行/数据变化", args);
        if (table && table.id === 'p_form_0000000076_d1') {
            // 添加延时处理，确保删行操作完成后再进行汇总计算
            setTimeout(() => {
                // 获取当前dgrid的所有行数据
                const rows = dgrid.getRows();
                console.log("useUpdateRows - 当前行数据:", rows);

                if (rows && rows.length > 0) {
                    // 重新计算父节点的汇总值
                    calculateParentValuesFromRowsWithReset(rows);

                    // 更新表格显示，刷新父节点的估算金额
                    rows.forEach((row) => {
                        dgrid.updateRow(row);
                    });

                    // 刷新整个表格显示
                    dgrid.refreshView();

                    // 重新计算汇总并更新主表
                    var sumAmt = 0;

                    // 递归收集所有末级节点的估算金额
                    function collectLeafNodeAmounts(nodes) {
                        nodes.forEach(node => {
                            if (!node.children || node.children.length === 0) {
                                // 末级节点，累加估算金额
                                sumAmt += parseFloat(node.u_gsje || 0);
                            } else {
                                // 非末级节点，递归处理子节点
                                collectLeafNodeAmounts(node.children);
                            }
                        });
                    }

                    // 遍历所有根节点，收集其下的末级节点
                    rows.forEach((item) => {
                        // 只处理根节点
                        if (!item.s_tree_pid || item.s_tree_pid === '0' || item.s_tree_pid === 0) {
                            collectLeafNodeAmounts([item]);
                        }
                    });

                    console.log("useUpdateRows - 所有末级节点汇总金额:", sumAmt);
                    //汇总赋值
                    $NG.updateState((updater) => {
                        updater.data.p_form_0000000076_m.setProps({
                            u_xmbnfscb: sumAmt * 10000,
                        });
                    });
                } else {
                    // 如果没有行数据，将汇总金额设为0
                    console.log("useUpdateRows - 没有行数据，汇总金额设为0");
                    $NG.updateState((updater) => {
                        updater.data.p_form_0000000076_m.setProps({
                            u_xmbnfscb: 0,
                        });
                    });
                }
            }, 100); // 延时100ms确保删行操作完成
        }
    }, "p_form_0000000076_d1");
    if (editPage.oType == "add") {
        const phid_pc = mstform.getValues().phid_pc;
        if (dgrid.getRows().length == 0) {
            setTimeout(() => {
                $NG.execServer("jxsbsx", { 'pc': phid_pc }, (res) => {
                    console.log("phid_pc===============>", phid_pc);
                    // 先检查res.data是否已经是对象
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log('data', data)
                    const targetData = data?.map((item) => {
                        return { ...item.extendObjects }
                    })?.reverse();
                    const treeData = flatArrayToTree(targetData);
                    dgrid.addRows(treeData);
                    setTimeout(() => {
                        // 仅在初始加载时展开所有层级
                        const maxDepth = getTreeMaxDepth(treeData);
                        expandAllLevels(dgrid, maxDepth);
                    }, 200);
                    dgrid.refreshView();

                    // 更新主表的项目部拟发生成本
                    updateMainFormTotal(treeData);
                });
            }, 100);
        } else {
            setTimeout(() => {
                var rows = dgrid.getRows();
                // 过滤掉合计行，计算实际树形数据的最大深度
                const maxDepth = getTreeMaxDepth(rows);
                expandAllLevels(dgrid, maxDepth);
            }, 100)
        }
        useValuesChange(({ args }) => {
            dgrid.clearRows();
            const phid_pc = mstform.getValues().phid_pc;
            setTimeout(() => {
                $NG.execServer("jxsbsx", { 'pc': phid_pc }, (res) => {
                    console.log("phid_pc===============>", phid_pc);
                    // 先检查res.data是否已经是对象
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log('data', data)
                    const targetData = data?.map((item) => {
                        return { ...item.extendObjects }
                    })?.reverse();
                    console.log("targetData:", targetData);
                    const treeData = flatArrayToTree(targetData);
                    console.log("treeData:", treeData);
                    dgrid.addRows(treeData);
                    setTimeout(() => {
                        // 仅在初始加载时展开所有层级
                        const maxDepth = getTreeMaxDepth(treeData);
                        expandAllLevels(dgrid, maxDepth);
                    }, 200);
                    dgrid.refreshView();

                    // 更新主表的项目部拟发生成本
                    updateMainFormTotal(treeData);
                });
            }, 100);
        }, "p_form_0000000076_m.phid_pc");
    } else if (editPage.oType == "edit") {
        const phid_pc = mstform.getValues().phid_pc;
        if (dgrid.getRows().length == 0) {
            setTimeout(() => {
                $NG.execServer("jxsbsx", { 'pc': phid_pc }, (res) => {
                    console.log("phid_pc===============>", phid_pc);
                    // 先检查res.data是否已经是对象
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log('data', data)
                    const targetData = data?.map((item) => {
                        return { ...item.extendObjects }
                    })?.reverse();
                    const treeData = flatArrayToTree(targetData);
                    dgrid.addRows(treeData);
                    setTimeout(() => {
                        const maxDepth = getTreeMaxDepth(treeData);
                        expandAllLevels(dgrid, maxDepth);
                    }, 200);
                    dgrid.refreshView();

                    // 更新主表的项目部拟发生成本
                    updateMainFormTotal(treeData);
                });
            }, 100);
        } else {
            setTimeout(() => {
                var rows = dgrid.getRows();
                // 过滤掉合计行，计算实际树形数据的最大深度
                const maxDepth = getTreeMaxDepth(rows);
                expandAllLevels(dgrid, maxDepth);
            }, 100)
        }
    }
});

function flatArrayToTree(flatArray, rootId = null) {
    if (!flatArray || !Array.isArray(flatArray) || flatArray.length === 0) {
        return [];
    }

    // 处理重复的 s_tree_id
    const processedArray = processDuplicateTreeId(flatArray);
    const tree = [];
    const map = {};

    // 首先将所有节点存入map，以s_tree_id为key
    processedArray.forEach(item => {
        if (item && item.s_tree_id) {
            map[item.s_tree_id] = { ...item, children: [] };
        }
    });

    // 然后构建树形结构
    processedArray.forEach(item => {
        if (!item || !item.s_tree_id) return;

        const node = map[item.s_tree_id];
        if (!node) return; // 跳过无效节点

        // 检查是否存在循环引用（s_tree_id和s_tree_pid相同）
        if (item.s_tree_id === item.s_tree_pid) {
            // 发现循环引用，将其作为根节点处理
            tree.push(node);
        } else if (item.s_tree_pid && item.s_tree_pid !== '0' && item.s_tree_pid !== 0 && map[item.s_tree_pid]) {
            // 有父节点，添加到父节点的children中
            map[item.s_tree_pid].children.push(node);
        } else {
            // 没有父节点或父节点不存在，作为根节点
            tree.push(node);
        }
    });

    return tree;
}

// 计算父节点的值（非递归实现）
function calculateParentValues(node) {
    if (!node) return node;

    // 使用后序遍历的非递归实现
    const stack = [];
    const visited = new Set();
    stack.push(node);

    while (stack.length > 0) {
        const current = stack[stack.length - 1];

        if (!current.children || current.children.length === 0) {
            // 叶子节点，直接弹出
            stack.pop();
            continue;
        }

        // 检查是否所有子节点都已访问
        const allChildrenVisited = current.children.every(child => visited.has(child));

        if (allChildrenVisited) {
            // 所有子节点已访问，处理当前节点
            // 初始化父节点的估算金额
            current.u_gsje = '0.00';

            // 累加所有子节点的估算金额
            current.children.forEach(child => {
                current.u_gsje = (parseFloat(current.u_gsje || 0) + (parseFloat(child.u_gsje) || 0)).toFixed(2);
            });

            visited.add(current);
            stack.pop();
        } else {
            // 将未访问的子节点压入栈
            current.children.forEach(child => {
                if (!visited.has(child)) {
                    stack.push(child);
                }
            });
        }
    }

    return node;
}

// 更新主表的项目部拟发生成本
function updateMainFormTotal(treeData) {
    if (!treeData || !Array.isArray(treeData)) {
        return;
    }

    // 使用非递归方式计算所有末级节点的估算金额总和
    let totalAmount = 0;
    const stack = [...treeData];

    while (stack.length > 0) {
        const node = stack.pop();

        if (!node) continue;

        if (!node.children || node.children.length === 0) {
            // 末级节点，累加估算金额
            totalAmount += parseFloat(node.u_gsje || 0);
        } else {
            // 非末级节点，将子节点加入栈中
            stack.push(...node.children);
        }
    }

    // 更新主表的项目部拟发生成本
    $NG.updateState((updater) => {
        updater.data.p_form_0000000076_m.setProps({
            u_xmbnfscb: (totalAmount * 10000).toFixed(2),
        });
    });
}

// 动态更新树形结构汇总和主表字段
function updateTreeAndMainForm(rows) {
    // 重新计算父节点的汇总值
    calculateParentValuesFromRows(rows);

    // 收集所有末级节点的估算金额总和
    let totalAmount = 0;

    function collectLeafNodeAmounts(nodes) {
        nodes.forEach(node => {
            if (!node.children || node.children.length === 0) {
                // 末级节点，累加估算金额
                totalAmount += parseFloat(node.u_gsje || 0);
            } else {
                // 非末级节点，递归处理子节点
                collectLeafNodeAmounts(node.children);
            }
        });
    }

    collectLeafNodeAmounts(rows);

    // 更新主表的项目部拟发生成本
    $NG.updateState((updater) => {
        updater.data.p_form_0000000076_m.setProps({
            u_xmbnfscb: (totalAmount * 10000).toFixed(2),
        });
    });
}

// 从行数据重新计算父节点的值（非递归实现）
function calculateParentValuesFromRows(nodes) {
    if (!nodes || !Array.isArray(nodes) || nodes.length === 0) {
        return;
    }

    // 创建一个包含所有节点的扁平列表
    const allNodes = [];
    const stack = [...nodes];

    // 使用栈收集所有节点
    while (stack.length > 0) {
        const node = stack.pop();
        if (!node) continue;

        allNodes.push(node);

        if (node.children && node.children.length > 0) {
            stack.push(...node.children);
        }
    }

    // 创建节点的依赖图
    const dependencyMap = new Map();
    const childrenMap = new Map();

    allNodes.forEach(node => {
        if (node.children && node.children.length > 0) {
            childrenMap.set(node, node.children);
            node.children.forEach(child => {
                if (!dependencyMap.has(child)) {
                    dependencyMap.set(child, []);
                }
                dependencyMap.get(child).push(node);
            });
        }
    });

    // 找出所有叶子节点（没有子节点的节点）
    const leaves = allNodes.filter(node => !node.children || node.children.length === 0);

    // 使用拓扑排序处理节点
    const processed = new Set();
    const queue = [...leaves];

    while (queue.length > 0) {
        const node = queue.shift();
        processed.add(node);

        // 处理依赖于当前节点的父节点
        const parents = dependencyMap.get(node) || [];

        parents.forEach(parent => {
            // 检查父节点的所有子节点是否都已处理
            const allChildrenProcessed = (childrenMap.get(parent) || []).every(child => processed.has(child));

            if (allChildrenProcessed) {
                // 初始化父节点的估算金额
                parent.u_gsje = '0.00';

                // 累加所有子节点的估算金额
                (childrenMap.get(parent) || []).forEach(child => {
                    parent.u_gsje = (parseFloat(parent.u_gsje || 0) + (parseFloat(child.u_gsje) || 0)).toFixed(2);
                });

                // 将处理完的父节点加入队列
                queue.push(parent);
            }
        });
    }
}

// 从行数据重新计算父节点的值（带重置功能，非递归实现）
function calculateParentValuesFromRowsWithReset(nodes) {
    // 使用相同的非递归实现
    calculateParentValuesFromRows(nodes);
    // 重置功能与基本版本相同，因为我们已经确保了末级节点的值保持不变
}

// 处理重复的 s_tree_id 字段
function processDuplicateTreeId(flatArray) {
    if (!flatArray || !Array.isArray(flatArray) || flatArray.length === 0) {
        return [];
    }

    const treeIdCount = new Map();
    const processedArray = [...flatArray];

    // 第一次遍历：统计每个 s_tree_id 的出现次数
    processedArray.forEach(item => {
        if (item && item.s_tree_id) {
            const treeId = item.s_tree_id;
            treeIdCount.set(treeId, (treeIdCount.get(treeId) || 0) + 1);
        }
    });

    // 第二次遍历：为重复项分配新的 s_tree_id
    const usedTreeId = new Map();
    const idMap = new Map(); // 用于记录原ID到新ID的映射

    processedArray.forEach(item => {
        if (!item || !item.s_tree_id) return;

        const originalTreeId = item.s_tree_id;
        const count = treeIdCount.get(originalTreeId);

        if (count > 1) {
            // 如果有重复，分配新的 s_tree_id
            const currentCount = usedTreeId.get(originalTreeId) || 0;
            if (currentCount === 0) {
                // 第一个重复项保持原ID
                usedTreeId.set(originalTreeId, 1);
                idMap.set(originalTreeId, originalTreeId); // 记录映射关系
            } else {
                // 后续重复项使用唯一ID
                const newTreeId = originalTreeId + '_' + currentCount; // 使用字符串拼接而不是数值运算
                item.s_tree_id = newTreeId;
                idMap.set(originalTreeId + '_' + currentCount, newTreeId); // 记录映射关系
                usedTreeId.set(originalTreeId, currentCount + 1);
            }
        }
    });

    // 第三次遍历：更新s_tree_pid以匹配新的s_tree_id
    processedArray.forEach(item => {
        if (item && item.s_tree_pid && idMap.has(item.s_tree_pid)) {
            item.s_tree_pid = idMap.get(item.s_tree_pid);
        }
    });

    // 处理完成后对整个数组进行reverse
    return processedArray.reverse();
}

// 计算树形结构的最大深度（非递归实现）
function getTreeMaxDepth(nodes) {
    if (!nodes || !Array.isArray(nodes) || nodes.length === 0) {
        return 1;
    }

    let maxDepth = 1;
    const stack = nodes.map(node => ({ node, depth: 1 }));

    while (stack.length > 0) {
        const { node, depth } = stack.pop();

        if (!node) continue;

        maxDepth = Math.max(maxDepth, depth);

        if (node.children && node.children.length > 0) {
            node.children.forEach(child => {
                stack.push({ node: child, depth: depth + 1 });
            });
        }
    }

    return maxDepth;
}

// 逐层展开所有层级（非递归实现）
function expandAllLevels(dgrid, maxDepth) {
    if (!dgrid || maxDepth <= 0) {
        return;
    }

    let currentLevel = 1;

    const expandLevel = () => {
        if (currentLevel < maxDepth) {
            dgrid.setExpand();
            currentLevel++;
            setTimeout(expandLevel, 50);
        }
    };

    expandLevel();
}