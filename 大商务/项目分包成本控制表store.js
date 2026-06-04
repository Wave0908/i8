/**第四章  分包成本控制策划*/
$NG.AllReady(function (editPage, { useValuesChange, useUpdateRows }) {
    var mstform = $NG.getCmpApi('p_form_0000000072_m');
    var dgrid = $NG.getCmpApi('p_form_0000000072_d1');
    if (editPage.oType == "add" || editPage.oType == "edit") {
        if (dgrid.getRows().length == 0) {
            const phid_pc = mstform.getValues().phid_pc;
            console.log("phid_pc=====================>", phid_pc)
            /**引入第三章劳务分包、专业分包明细和施工篇明细 start=====================> */
            $NG.execServer("dcxmfbcbkzb", { 'pc': phid_pc }, (res) => {
                //console.log("res:", res);
                //console.log("data:", res.data)
                try {
                    // 解析接口返回数据
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;

                    // 判断表格是否为空（根据实际表格API调整）
                    const isGridEmpty = dgrid.getRowCount ? dgrid.getRowCount() === 0 :
                        (dgrid.rows?.length === 0 || !dgrid.rows);
                    console.log('isGridEmpty:', isGridEmpty)

                    //插入根节点
                    if (isGridEmpty) {
                        dgrid.addRows({
                            s_tree_name: '工程分包类',
                            s_tree_no: '02',
                            s_tree_id:'02',                   
                            s_tree_pid:'0'
                        })
                        dgrid.addRows({
                            s_tree_name: '劳务分包类',
                            s_tree_no: '01',
                            s_tree_id:'01',
                            s_tree_pid:'0'
                        })
                    }
                    //dgrid.updateRow();
                    console.log("dgrid:",dgrid);
                    const dstore = dgrid.getStore();
                    //当前行所有数据，未保存状态的行数据只能用dstore查看，dgrid是查看数据库的数据行
                    console.log("dstore:",dstore);

                    console.log("getAllDataForNew:",dgrid.getAllDataForNew());
                    //const initialRows = $NG.getCmpApi('p_form_0000000072_d1').getRows();
                    // console.log("count:",$NG.getCmpApi('p_form_0000000072_d1').getRowCount);
                    //console.log('initialRows:', initialRows)

                    // console.log("data:", data)
                    

                    // 直接提取接口中的目标字段（已包含u_sgnr等所有字段）
                    const targetData = data?.map(item => {
                        // 从extendObjects中提取所有字段（包括u_sgnr,u_bd等）
                        return { ...item.extendObjects };
                    }) || [];
                    console.log("targetData:",targetData);
                    
                    // 获取当前所有行数据（包括未保存状态的数据）
                    const gridRows = dstore ? dstore.data : [];
                    console.log("当前行数据:", gridRows);
                    
                    // 标记是否有数据被添加
                    let dataAdded = false;
                    
                    // 收集所有需要更新的根节点
                    const updatedRootNodes = [];
                    
                    // 遍历所有根节点
                    gridRows.forEach((rootNode) => {
                        // 只处理根节点
                        console.log("rootNode:", rootNode);
                        if (!rootNode.s_tree_pid || rootNode.s_tree_pid === '0' || rootNode.s_tree_pid === 0) {
                            let rootNodeUpdated = false;
                            
                            // 检查根节点的s_tree_id是否等于u_fbms
                            targetData.forEach((dataItem) => {
                                const fbms = dataItem.u_fbms;
                                if (rootNode.s_tree_id === fbms) {
                                    dataAdded = true;
                                    rootNodeUpdated = true;
                                    
                                    // 创建子节点数据
                                    const childNode = {
                                        s_tree_name: dataItem.u_fbgcmc_text,
                                        s_tree_no: getNextSequentialCode(rootNode),
                                        s_tree_id: generateUniqueId(),
                                        s_tree_pid: rootNode.s_tree_id,
                                        u_fbgcmc_text: dataItem.u_fbgcmc_text,
                                        u_zbfw: dataItem.u_zbfw,
                                        u_bdhf: dataItem.u_bdhf,
                                        u_cgsj: dataItem.u_cgsj,
                                        u_jcsj: dataItem.u_jcsj,
                                        u_ewzb: dataItem.u_ewzb,
                                        u_ntrrs: dataItem.u_ntrrs,
                                        u_zzdjyq: dataItem.u_zzdjyq,
                                    };
                                    
                                    // 如果根节点没有children数组，创建一个
                                    if (!rootNode.children) {
                                        rootNode.children = [];
                                    }
                                    
                                    // 添加子节点到根节点
                                    rootNode.children.push(childNode);
                                }
                            });
                            
                            // 如果根节点有更新，添加到更新列表
                            if (rootNodeUpdated) {
                                updatedRootNodes.push(rootNode);
                            }
                        }
                    });
                    
                    // 一次性更新所有修改过的根节点
                    if (updatedRootNodes.length > 0) {
                        // 获取当前所有行数据（包括未保存状态的数据）
                        const allRows = dstore ? dstore.data : [];
                        // 将扁平数组转换为树形结构
                        const treeData = flatArrayToTree(allRows);
                        // 添加树形数据到表格
                        dgrid.addRows(treeData);
                        
                        // 展开所有层级
                        setTimeout(() => {
                            const maxDepth = getTreeMaxDepth(treeData);
                            expandAllLevels(dgrid, maxDepth);
                            // 刷新表格视图
                            dgrid.refreshView();
                        }, 200);
                    } else if (!dataAdded) {
                        $NG.alert("未找到匹配的根节点数据!");
                    }
                    
                    // console.log('表格数据加载完成，字段自动映射');
                } catch (error) {
                    console.error('数据处理失败:', error);
                }
            });
            /**引入第三章劳务分包、专业分包明细和施工篇明细 end=====================> */

            /**引入第三章劳务分包、专业分包的二维度指标值并合计赋值到 分包二维成本指标 start=====================> */
            $NG.execServer("jhcbewdzblwzyfb", { 'pc': phid_pc }, (res) => {
                // 安全解析数据
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;

                // 安全获取值函数
                const getSafeValue = (index) => {
                    if (!Array.isArray(data) || index >= data.length) return 0;

                    const item = data[index];
                    // 使用可选链操作符防止嵌套属性报错
                    const value = item?.extendObjects?.u_ewdzb;

                    // 转换为数字（无效值转为0）
                    return parseFloat(value) || 0;
                };

                // 获取两个值（自动处理索引越界）
                const lwfb_ewdzb = getSafeValue(0); // 劳务分包
                const zyfb_ewdzb = getSafeValue(1); // 专业分包

                console.log("lwfb_ewdzb =", lwfb_ewdzb);
                console.log("zyfb_ewdzb =", zyfb_ewdzb);

                // 计算总和
                const u_fbewcbzb = lwfb_ewdzb + zyfb_ewdzb;

                // 汇总赋值
                $NG.updateState((updater) => {
                    updater.data.p_form_0000000072_m.setProps({
                        u_fbewcbzb: u_fbewcbzb
                    });
                });
            });
            /**引入第三章劳务分包、专业分包的二维度指标值并合计赋值到 分包二维成本指标 end=====================> */
        }
    }

    useValuesChange(({ args }) => {
        const phid_pc = mstform.getValues().phid_pc;
        console.log("phid_pc=====================>", phid_pc)
        /**引入第三章劳务分包、专业分包明细和施工篇明细 start=====================> */
        $NG.execServer("get_sg_fbjh", { 'pc': phid_pc }, (res) => {
            try {
                // 解析接口返回数据
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;

                // 判断表格是否为空（根据实际表格API调整）
                const isGridEmpty = dgrid.getRowCount ? dgrid.getRowCount() === 0 :
                    (dgrid.rows?.length === 0 || !dgrid.rows);
                console.error('isGridEmpty:', isGridEmpty)

                // 直接提取接口中的目标字段（已包含u_sgnr等所有字段）
                const targetData = data?.map(item => {
                    // 从extendObjects中提取所有字段（包括u_sgnr,u_bd等）
                    return { ...item.extendObjects };
                }) || [];

                // 清空表格并添加数据（保持顺序，如需反转可加.reverse()）
                //                if (dgrid.clear) dgrid.clear(); // 清空现有数据
                dgrid.clearRows();
                dgrid.addRows(targetData); // 直接添加，字段自动对应表格

                console.log('表格数据加载完成，字段自动映射');
            } catch (error) {
                console.error('数据处理失败:', error);
            }
        });
        /**引入第三章劳务分包、专业分包明细和施工篇明细 end=====================> */

        /**引入第三章劳务分包、专业分包的二维度指标值并合计赋值到 分包二维成本指标 start=====================> */
        $NG.execServer("jhcbewdzblwzyfb", { 'pc': phid_pc }, (res) => {
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;

            const lwfb_ewdzb = data[0].extendObjects.u_ewdzb;
            const zyfb_ewdzb = data[1].extendObjects.u_ewdzb;

            const u_fbewcbzb = (parseFloat(lwfb_ewdzb) || 0) + (parseFloat(zyfb_ewdzb) || 0)
            //汇总赋值
            $NG.updateState((updater) => {
                updater.data.p_form_0000000072_m.setProps({
                    u_fbewcbzb: u_fbewcbzb
                });
            });
        });
        /**引入第三章劳务分包、专业分包的二维度指标值并合计赋值到 分包二维成本指标 end=====================> */
    }, 'phid_pc'); // 监听主表phid_pc字段变化

    // 汇总 ‘二维指标’ 值 赋值到 ‘项目部拟发生成本’
    useUpdateRows(({ args }) => {
        var sumAmtOri = 0;
        const rows = args[0];
        rows.forEach((items) => {
            sumAmtOri += (parseFloat(items.u_ewzb) || 0);

            //汇总赋值
            $NG.updateState((updater) => {
                updater.data.p_form_0000000072_m.setProps({
                    u_nfscb: sumAmtOri,
                });
            });
        });
    }, "p_form_0000000072_d1");

}, function () {
    console.log('列表初始化完成，已准备好直接映射字段');
});

// 生成唯一ID
function generateUniqueId() {
    return 'id_' + Math.random().toString(36).substr(2, 9);
}

// 获取下一个顺序编号
function getNextSequentialCode(rootNode) {
    // 如果根节点没有子节点，返回基础编号
    if (!rootNode.children || rootNode.children.length === 0) {
        return rootNode.s_tree_no + '01';
    }
    
    // 获取所有子节点的编号
    const childCodes = rootNode.children.map(child => child.s_tree_no);
    
    // 找出最大的编号
    let maxCode = '0';
    childCodes.forEach(code => {
        if (code > maxCode) {
            maxCode = code;
        }
    });
    
    // 提取编号的数字部分
    const codePattern = /\d+$/;
    const matches = maxCode.match(codePattern);
    
    if (matches && matches.length > 0) {
        // 获取数字部分
        const numPart = matches[0];
        // 计算下一个编号
        const nextNum = parseInt(numPart, 10) + 1;
        // 保持相同的位数（例如：01 -> 02, 001 -> 002）
        const nextNumStr = nextNum.toString().padStart(numPart.length, '0');
        // 替换数字部分
        return maxCode.replace(codePattern, nextNumStr);
    }
    
    // 如果无法解析编号格式，使用默认格式
    return rootNode.s_tree_no + '01';
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

// 将扁平数组转换为树形结构
function flatArrayToTree(flatArray) {
    // 处理重复的s_tree_id
    const processedArray = processDuplicateTreeId(flatArray);

    const tree = [];
    const map = {};

    // 首先将所有节点存入map，以s_tree_id为key
    processedArray.forEach(item => {
        map[item.s_tree_id] = { ...item, children: [] };
    });

    // 然后构建树形结构
    processedArray.forEach(item => {
        const node = map[item.s_tree_id];
        const parentId = item.s_tree_pid;
        
        if (parentId && parentId !== '0' && parentId !== 0 && map[parentId]) {
            // 有父节点，添加到父节点的children中
            map[parentId].children.push(node);
        } else {
            // 没有父节点或父节点不存在，作为根节点
            tree.push(node);
        }
    });

    return tree;
}

// 处理重复的s_tree_id字段
function processDuplicateTreeId(flatArray) {
    const idCount = new Map();
    const processedArray = [...flatArray];

    // 第一次遍历：统计每个s_tree_id的出现次数
    processedArray.forEach(item => {
        const treeId = item.s_tree_id;
        if (treeId) { // 确保s_tree_id存在
            idCount.set(treeId, (idCount.get(treeId) || 0) + 1);
        }
    });

    // 第二次遍历：为重复项分配新的s_tree_id
    const usedId = new Map();

    processedArray.forEach(item => {
        const originalTreeId = item.s_tree_id;
        if (originalTreeId) { // 确保s_tree_id存在
            const count = idCount.get(originalTreeId);

            if (count > 1) {
                // 如果有重复，分配新的s_tree_id
                const currentCount = usedId.get(originalTreeId) || 0;
                if (currentCount === 0) {
                    // 第一个重复项保持原ID
                    usedId.set(originalTreeId, 1);
                } else {
                    // 后续重复项递增分配
                    const newTreeId = originalTreeId + '_' + currentCount;
                    item.s_tree_id = newTreeId;
                    usedId.set(originalTreeId, currentCount + 1);
                }
            }
        }
    });

    return processedArray;
}