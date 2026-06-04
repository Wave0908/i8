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
    return tree;
}

$NG.AllReady(function (editPage, { useValuesChange, useDataIndexChange, useUpdateRows }) {
    var mstform = $NG.getCmpApi('p_form_0000000048_m');
    var dgrid = $NG.getCmpApi('p_form_0000000048_d2');
    debugger;
    //    console.log('editPage:', editPage.oType);
    if (editPage.oType == "view") {
        // 获取表格组件实例
        dgrid.setExpand();

        /*
        console.log('dgrid:', dgrid);
        dgrid.expandTree();
        $NG.updateUI((updater) => {

        //    updater.form.mainForm.remark.setProps({ disabled: true, label: "二开修改" });
            console.log('updater:', updater);
            const gridInstance = updater.grid.p_form_0000000048_d2;
            gridInstance.setProps({ defaultExpandAll: all });;
        });


        // 尝试获取组件属性（不同框架的API可能不同，以下是常见方式）
        if (dgrid.getProps) {
            const props = dgrid.getProps(); // 获取属性集合
            console.log('props:', props); // 打印是否为"all"
            console.log('表格默认展开属性:', props.defaultExpand); // 打印是否为"all"
        } else if (dgrid.options) {
            // 某些组件可能将属性存在options中
            console.log('表格默认展开属性:', dgrid.options.defaultExpand);
        } else {
            console.log('表格组件属性获取方式未知，请根据框架文档调整');
        }
*/
    }

    if (editPage.oType == "view") {
        //   useValuesChange(({ args }) => {
        const phid_pc = mstform.getValues().phid_pc;
        $NG.execServer("getdsw_mx", { 'billname': '安全文明施工措施费投入计划清单' }, (res) => {
            // 先检查res.data是否已经是对象
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            console.log('data', data)
            const targetData = data?.map((item) => {
                return { ...item.extendObjects }
            })?.reverse();
            const treeData = flatArrayToTree(targetData)
            dgrid.addRows(treeData)
        });

        //获取商务篇第三章安全生产费用（计划成本）
        $NG.execServer("getaqsc_jhcb", { 'pc': phid_pc }, (res) => {

            const _data = JSON.parse(res.data)[0].extendObjects
            console.log('_data:', _data);
            console.log(_data);
            $NG.updateState((updater) => {
                updater.data.p_form_0000000048_m.setProps({
                    u_aqsc_jhcb: _data.jhcb,

                });

            });

        });
        //   }, 'phid_pc');

    }
    useDataIndexChange(({ args, instance }) => {
        //    console.log('u_sbfw:', u_sbfw);
        if (args[0].u_sl != null && args[0].u_dj != null && args[0].u_sc != null) {
            args[0].u_hj = args[0].u_sl * args[0].u_dj * args[0].u_sc;  //数量*单价*时长=金额
            instance.updateRow(args[0]);
            sumParentChildren(); // 调用累加函数
        }

    }, ['p_form_0000000048_d2.u_sl', 'p_form_0000000048_d2.u_dj','p_form_0000000048_d2.u_sc']);





    // 替换原有的useUpdateRows监听，改为useUpdateRow监听单行修改
    /*
    useUpdateRow(({ args }) => {
        const [newRow, oldRow] = args; // 获取修改后的行数据和修改前的行数据
        
        // 检查u_tx字段是否发生变化（考虑空值情况）
        const newUtx = newRow.u_tx ?? '';
        const oldUtx = oldRow.u_tx ?? '';
        
        // 仅当u_tx字段的值确实改变时，才调用sumParentChildren
        if (newUtx !== oldUtx) {
            console.log("u_tx字段发生修改，触发金额累加");
            sumParentChildren(); // 调用累加函数
        } else {
            console.log("修改的不是u_tx字段，不触发累加");
        }
    }, "p_form_0000000048_d2");
    
        // 获取表格数据
        let count = 0;
        let isUpdating = false; // 新增：更新锁标记
        useUpdateRows(({ args }) => {
            if (isUpdating) return; // 如果正在更新，直接跳过
            isUpdating = true;      // 标记为“更新中”
    
            sumParentChildren();
    
            isUpdating = false;     // 更新完成，释放锁
        }, "p_form_0000000048_d2");
    
        
        useUpdateRows(({ args }) => {
            count++; // 每次触发时自增
            console.log("useUpdateRows 触发，次数：", count); // 计数
            sumParentChildren(); // 调用修改后的累加函数
        }, "p_form_0000000048_d2");
        */
    // 核心函数：根据s_tree_id和s_tree_pid的父子关系累加金额
    function sumParentChildren() {
        const rows = dgrid.getRows() || [];
        // 存储父级节点的累计值（key: 父级s_tree_id, value: 累计金额）
        const parentSumMap = {};
        let totalAmt = 0;

        // 1. 遍历所有行，累加子级金额到父级（支持任意层级）
        rows.forEach(childRow => {
            const parentId = childRow.s_tree_pid; // 子级的父ID
            const childAmount = parseFloat(childRow.u_hj) || 0;

            // 若父ID有效（非根节点），累加金额到父级
            if (parentId && parentId !== '0' && parentId !== 'null') {
                parentSumMap[parentId] = (parentSumMap[parentId] || 0) + childAmount;
            }
        });

        // 2. 遍历所有行，更新父级节点金额
        rows.forEach(parentRow => {
            const parentId = parentRow.s_tree_id; // 父级自身ID
            const total = parentSumMap[parentId] || 0;

            // 仅更新父级节点（自身是父级，且有子级金额）
            if (total > 0) {
                parentRow.u_hj = total;
                dgrid.updateRow(parentRow);
            }
            // 3. 识别根节点（没有父级或父级为0/null/空），累加其金额到总金额
            const isRoot = !parentRow.s_tree_pid ||
                parentRow.s_tree_pid === '0' ||
                parentRow.s_tree_pid === 'null' ||
                parentRow.s_tree_pid === '';
            if (isRoot) {
                totalAmt += parseFloat(parentRow.u_hj) || 0;
            }
        });
        // 4. 更新主表p_form_0000000048_m的u_amt字段
        $NG.updateState(updater => {
            updater.data.p_form_0000000048_m.setProps({
                u_amt: totalAmt // 将总金额赋值给主表u_amt
            });
        });

        // 5. 刷新视图
        dgrid.refreshView();
    }



    debugger;
}, function () {
    console.log('list Ready');
});

