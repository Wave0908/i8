$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick, useBeforeClick }
) {
    // 获取主表表单API
    var mstform = $NG.getCmpApi('p_form_0000000076_m');
    console.log("mstform:", mstform);
    
    // 获取表格API
    var dgrid = $NG.getCmpApi('p_form_0000000076_d1');
    console.log("dgrid===============>", dgrid);
    
    // 获取当前phid_pc值
    const phid_pc = mstform.getValues().phid_pc;
    console.log("phid_pc:", phid_pc);
    
    // 根据phid_pc查询动态合约包数据并构建树形结构的函数
    function fetchDynamicContractData(phid_pc) {
        if (!phid_pc) {
            console.log('phid_pc为空，无法获取数据');
            return;
        }
        
        // 清空表格数据
        dgrid.clearRows();
        
        // 调用后端服务查询数据
        setTimeout(() => {
            // 这里使用自定义的服务名，需要在后端实现对应的服务
            // 该服务应该调用我们创建的get_dynamic_contract_by_pc函数
            $NG.execServer("getDynamicContractByPc", { 'pc': phid_pc }, (res) => {
                console.log("phid_pc===============>", phid_pc);
                console.log("res:", res);
                
                // 处理返回的数据
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log('data', data);
                
                // 检查data是否存在且是数组
                if (!data || !Array.isArray(data)) {
                    console.log('数据为空或不是数组，无法构建树形结构');
                    return;
                }
                
                // 构建树形结构数据
                const treeData = flatArrayToTree(data);
                
                // 添加数据到表格
                dgrid.addRows(treeData);
                
                // 展开所有层级
                setTimeout(() => {
                    const maxDepth = getTreeMaxDepth(treeData);
                    expandAllLevels(dgrid, maxDepth);
                }, 200);
                
                // 刷新表格视图
                dgrid.refreshView();
                
                // 更新主表的项目部拟发生成本
                updateMainFormTotal(treeData);
            });
        }, 100);
    }
    
    // 初始加载时获取数据
    if (phid_pc && dgrid.getRows().length === 0) {
        fetchDynamicContractData(phid_pc);
    }
    
    // 监听phid_pc字段变化
    useValuesChange(({ args }) => {
        console.log("phid_pc字段变化:", args);
        const newPhidPc = mstform.getValues().phid_pc;
        console.log("新的phid_pc:", newPhidPc);
        
        // 当phid_pc变化时，重新获取数据
        fetchDynamicContractData(newPhidPc);
    }, "p_form_0000000076_m.phid_pc");
    
    // 将扁平数组转换为树形结构
    function flatArrayToTree(flatArray, rootId = null) {
        // 处理重复的 s_tree_id
        const processedArray = processDuplicateTreeId(flatArray);
        
        const tree = [];
        const map = {};
        
        // 如果处理后的数组为空，直接返回空树
        if (!processedArray || processedArray.length === 0) {
            return tree;
        }
        
        // 首先将所有节点存入map，以s_tree_id为key
        processedArray.forEach(item => {
            map[item.s_tree_id] = { ...item, children: [] };
        });
        
        // 然后构建树形结构
        processedArray.forEach(item => {
            const node = map[item.s_tree_id];
            if (item.s_tree_pid && item.s_tree_pid !== '0' && item.s_tree_pid !== 0 && map[item.s_tree_pid]) {
                // 有父节点，添加到父节点的children中
                map[item.s_tree_pid].children.push(node);
            } else {
                // 没有父节点或父节点不存在，作为根节点
                tree.push(node);
            }
        });
        
        return tree;
    }
    
    // 处理重复的 s_tree_id 字段
    function processDuplicateTreeId(flatArray) {
        // 检查flatArray是否为undefined或null
        if (!flatArray) {
            return [];
        }
        
        const treeIdCount = new Map();
        const processedArray = [...flatArray];
        
        // 第一次遍历：统计每个 s_tree_id 的出现次数
        processedArray.forEach(item => {
            const treeId = item.s_tree_id;
            treeIdCount.set(treeId, (treeIdCount.get(treeId) || 0) + 1);
        });
        
        // 第二次遍历：为重复项分配新的 s_tree_id
        const usedTreeId = new Map();
        
        processedArray.forEach(item => {
            const originalTreeId = item.s_tree_id;
            const count = treeIdCount.get(originalTreeId);
            
            if (count > 1) {
                // 如果有重复，分配新的 s_tree_id
                const currentCount = usedTreeId.get(originalTreeId) || 0;
                if (currentCount === 0) {
                    // 第一个重复项保持原ID
                    usedTreeId.set(originalTreeId, 1);
                } else {
                    // 后续重复项递减分配
                    const newTreeId = parseInt(originalTreeId) - currentCount;
                    item.s_tree_id = newTreeId;
                    usedTreeId.set(originalTreeId, currentCount + 1);
                }
            }
        });
        
        return processedArray;
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
    
    // 更新主表的项目部拟发生成本
    function updateMainFormTotal(treeData) {
        // 计算所有末级节点的估算金额总和
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
        
        collectLeafNodeAmounts(treeData);
        
        // 更新主表的项目部拟发生成本
        $NG.updateState((updater) => {
            updater.data.p_form_0000000076_m.setProps({
                u_xmbnfscb: (totalAmount * 10000).toFixed(2),
            });
        });
    }
});