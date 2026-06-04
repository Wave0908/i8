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
// ====================== 配置区 ======================
const MAIN_FORM = 'p_form_0000000080_m';
const TABLE1 = 'p_form_p_form_0000000080_d2'; // 替换为实际表1 ID
const TABLE2 = 'p_form_0000000080_d3'; // 替换为实际表2 ID
// ====================== 工具函数 ======================
const safeParseFloat = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
};

$NG.AllReady(function (editPage, {
    useValuesChange, useUpdateRow, useDataIndexChange, useOtherDataIndexChange
}) {
    //项目部拟发生成本
    // 自定义防抖函数（兼容无lodash）
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    // 自定义行事件监听（替代useTableRowChange）
    const bindTableEvents = (table, callback) => {
        table.on('rowAdded', callback);
        table.on('rowDeleted', callback);
    };

    // 初始化状态
    let isTreeLoading = false;  // 树形加载状态锁 
    let sum1 = 0, sum2 = 0;

    // 获取表格API 
    const mainForm = $NG.getCmpApi("p_form_0000000080_m");
    const table1 = $NG.getCmpApi("p_form_p_form_0000000080_d2");
    const table2 = $NG.getCmpApi("p_form_0000000080_d3");

    // 计算函数（优化NaN处理）
    const calculateSum1 = () => {
        sum1 = table1.getRows().reduce((acc, row) =>
            acc + (parseFloat(row.u_gz_bz) || 0), 0);
        console.log(sum1);
        return sum1;
    };

    const calculateSum2 = () => {
        sum2 = table2.getRows().reduce((acc, row) =>
            acc + (parseFloat(row.u_hj) || 0), 0);
        console.log(sum2);
        return sum2;
    };

    // 防抖更新总成本 
    const updateTotalCost = debounce(() => {
        if (isTreeLoading) return; // 加载中跳过 
        // mainForm.setProps({
        //     u_xmbnfscb: a
        // });
        $NG.updateState((updater) => {
            const sumTotal = (calculateSum1() + calculateSum2()).toFixed(2);
            console.log(sumTotal);
            updater.data.p_form_0000000080_m.setProps({
                u_xmbnfscb: sumTotal,
            });
        });

    }, 300);

    // ============= 事件监听配置 =============
    // 字段变更监听
    useDataIndexChange(({ field }) => {
        if (field === 'u_gz_bz') updateTotalCost();
    }, [TABLE1, 'u_gz_bz']);

    useDataIndexChange(({ field }) => {
        if (field === 'u_hj') updateTotalCost();
    }, [TABLE2, 'u_hj']);

    // 行增删事件监听（自定义实现）
    bindTableEvents(table1, updateTotalCost);
    bindTableEvents(table2, updateTotalCost);

    // ============= 树形表格加载 =============
    const dgrid = $NG.getCmpApi('p_form_p_form_0000000080_d2');
    const d1grid = $NG.getCmpApi('p_form_0000000080_d3');

    useValuesChange(({ args }) => {
        isTreeLoading = true; // 加锁
        isTreeLoading1 = true; // 加锁
        dgrid.clearRows();
        d1grid.clearRows();

        $NG.execServer("glfcbkzch", { 'billname': '管理费成本控制策划' }, (res) => {
            try {
                const data = typeof res.data === 'string'
                    ? JSON.parse(res.data)
                    : res.data;

                const treeData = flatArrayToTree(
                    data.map(item => ({ ...item.extendObjects }))
                );

                // 批量添加+延迟解锁 
                dgrid.addRows(treeData);
                setTimeout(() => {
                    isTreeLoading = false;
                    // updateTotalCost(); // 删除此处的合计调用，避免数据未渲染时求和为0
                }, 100);

            } catch (e) {
                console.error(' 管理费成本控制策划树形数据加载失败', e);
                isTreeLoading = false;
            }
        });

        $NG.execServer("qtjjf", { 'billname': '其他间接费成本明细' }, (res) => {
            try {
                const data = typeof res.data === 'string'
                    ? JSON.parse(res.data)
                    : res.data;

                const treeData = flatArrayToTree(
                    data.map(item => ({ ...item.extendObjects }))
                );

                // 批量添加+延迟解锁 
                d1grid.addRows(treeData);
                setTimeout(() => {
                    isTreeLoading1 = false;
                    // updateTotalCost(); // 删除此处的合计调用，避免数据未渲染时求和为0
                }, 100);

            } catch (e) {
                console.error(' 其他间接费成本明细树形数据加载失败', e);
                isTreeLoading1 = false;
            }
        });
    }, "u_xmlb");

    //其他间接费的总价
    var tables = $NG.getCmpApi("p_form_0000000080_d3");
    useUpdateRow(({ args, table }) => {
        const record = args[0];
        //预估总价
        if (record.u_sl && record.u_dj) {
            record.u_hj = (
                parseFloat(record.u_dj) * parseFloat(record.u_sl)
            ).toFixed(2);
        }
        updateTotalCost(); // 新增：每次编辑后都触发合计
    })

    var tables = $NG.getCmpApi("p_form_p_form_0000000080_d2");
    useUpdateRow(({ args, table }) => {
        const record = args[0];
        //月度津贴合计
        record.u_ydjt_all = (
            (parseFloat(record.u_ydjt_clf) || 0) +
            (parseFloat(record.u_ydjt_bgf) || 0) +
            (parseFloat(record.u_ydjt_jtbz) || 0) +
            (parseFloat(record.u_ydjt_txbz) || 0) +
            (parseFloat(record.u_ydjt_dn_gzqx) || 0) +
            (parseFloat(record.u_ydjt_ccbt) || 0)
        );
        //税前小计
        record.u_gzze_sqxj = (
            (parseFloat(record.u_gzze_jcgz) || 0) +
            (parseFloat(record.u_gzze_zwgz) || 0) +
            (parseFloat(record.u_gzze_ngjt) || 0) +
            (parseFloat(record.u_gzze_jbf) || 0) +
            (parseFloat(record.u_gzze_wsf) || 0) +
            (parseFloat(record.u_gzze_zzjt) || 0) +
            (parseFloat(record.u_gzze_jxgz) || 0)
        );
        //保险
        if (record.u_gzze_sqxj) {
            record.u_gzze_bx = (
                parseFloat(record.u_gzze_sqxj) * (0.47 + 0.11)
            ).toFixed(2);
        }
        //月度工资总额合计
        record.u_gzze_ydgzze = (
            (parseFloat(record.u_gzze_sqxj) || 0) +
            (parseFloat(record.u_gzze_bx) || 0)
        );
        //工资及补助总额
        record.u_gz_bz = (
            (parseFloat(record.u_qtjt) || 0) +
            (parseFloat(record.u_qtjt_qnf) || 0) +
            (parseFloat(record.u_qtjt_qnq) || 0) +
            (parseFloat(record.u_gzze_ydgzze) || 0) +
            (parseFloat(record.u_ydjt_all) || 0)
        );
        updateTotalCost(); // 新增：每次编辑后都触发合计
    })

 //暗提示
    //表体不同行设置不同的提示文字
    useAction("clickHighlight")(function (e) {	//点击时

        if (d1grid.getSelectedData()[0].s_tree_name == "印花税") {	//当树名等于印花税时
            $NG.updateUI((updater, state) => {
                const gridStore = updater.grid.p_form_0000000080_d3.getApi();
                updater.grid.p_form_0000000080_d3.u_cssm.setProps({
                    placeholder: "按税前合同总额0.06%（收支类合同各按照0.03%计算）"
                });
                const targetField = state[2].children[2].children[3];
                if (targetField.editor) {
                    targetField.editor.placeholder = '按税前合同总额0.06%（收支类合同各按照0.03%计算）';
                }
            });
        }
        if (d1grid.getSelectedData()[0].s_tree_name == "低值易耗品及煤气其他物料消耗") {	//当树名等于印花税时
            $NG.updateUI((updater, state) => {
                const gridStore = updater.grid.p_form_0000000080_d3.getApi();
                updater.grid.p_form_0000000080_d3.u_cssm.setProps({
                    placeholder: "按合同额手输%"
                });
                const targetField = state[2].children[2].children[3];
                if (targetField.editor) {
                    targetField.editor.placeholder = '按合同额手输%';
                }
            });
        }
        if (d1grid.getSelectedData()[0].s_tree_name == "仪器检测费") {	//当树名等于印花税时
            $NG.updateUI((updater, state) => {
                const gridStore = updater.grid.p_form_0000000080_d3.getApi();
                updater.grid.p_form_0000000080_d3.u_cssm.setProps({
                    placeholder: "按合同额 手输 %"
                });
                const targetField = state[2].children[2].children[3];
                if (targetField.editor) {
                    targetField.editor.placeholder = '按合同额 手输 %';
                }
            });
        }
        if (d1grid.getSelectedData()[0].s_tree_name == "生活区、办公区水电费") {	//当树名等于印花税时
            $NG.updateUI((updater, state) => {
                const gridStore = updater.grid.p_form_0000000080_d3.getApi();
                updater.grid.p_form_0000000080_d3.u_cssm.setProps({
                    placeholder: "全部施工现场住宿的按合同额的手输%"
                });
                const targetField = state[2].children[2].children[3];
                if (targetField.editor) {
                    targetField.editor.placeholder = '全部施工现场住宿的按合同额的手输%';
                }
            });
        }
        if (d1grid.getSelectedData()[0].s_tree_name == "建设工程交易服务费") {	//当树名等于印花税时
            $NG.updateUI((updater, state) => {
                const gridStore = updater.grid.p_form_0000000080_d3.getApi();
                updater.grid.p_form_0000000080_d3.u_cssm.setProps({
                    placeholder: "EPC总承包合同招标咨询费等"
                });
                const targetField = state[2].children[2].children[3];
                if (targetField.editor) {
                    targetField.editor.placeholder = 'EPC总承包合同招标咨询费等';
                }
            });
        }
        if (d1grid.getSelectedData()[0].s_tree_name == "招标代理费") {	//当树名等于印花税时
            $NG.updateUI((updater, state) => {
                const gridStore = updater.grid.p_form_0000000080_d3.getApi();
                updater.grid.p_form_0000000080_d3.u_cssm.setProps({
                    placeholder: "设备招标代理费按《招标代理业务收费管理暂行办法》国家计委1980号文件0.5%执行"
                });
                const targetField = state[2].children[2].children[3];
                if (targetField.editor) {
                    targetField.editor.placeholder = '设备招标代理费按《招标代理业务收费管理暂行办法》国家计委1980号文件0.5%执行';
                }
            });
        }
        if (d1grid.getSelectedData()[0].s_tree_name == "专家评审费、论证费") {	//当树名等于印花税时
            $NG.updateUI((updater, state) => {
                const gridStore = updater.grid.p_form_0000000080_d3.getApi();
                updater.grid.p_form_0000000080_d3.u_cssm.setProps({
                    placeholder: "深基坑、超高支撑专家论证费等"
                });
                const targetField = state[2].children[2].children[3];
                if (targetField.editor) {
                    targetField.editor.placeholder = '深基坑、超高支撑专家论证费等';
                }
            });
        }
        if (d1grid.getSelectedData()[0].s_tree_name == "项目用车消耗") {	//当树名等于印花税时
            $NG.updateUI((updater, state) => {
                const gridStore = updater.grid.p_form_0000000080_d3.getApi();
                updater.grid.p_form_0000000080_d3.u_cssm.setProps({
                    placeholder: "一类项目：手输元/月；交工结算期按50%考虑(上述金额含项目经理用车手输元/月)；"
                });
                const targetField = state[2].children[2].children[3];
                if (targetField.editor) {
                    targetField.editor.placeholder = '一类项目：手输元/月；交工结算期按50%考虑(上述金额含项目经理用车手输元/月)；';
                }
            });
        }
        if (d1grid.getSelectedData()[0].s_tree_name == "业务招待费") {	//当树名等于印花税时
            $NG.updateUI((updater, state) => {
                const gridStore = updater.grid.p_form_0000000080_d3.getApi();
                updater.grid.p_form_0000000080_d3.u_cssm.setProps({
                    placeholder: "按合同额手输 %"
                });
                const targetField = state[2].children[2].children[3];
                if (targetField.editor) {
                    targetField.editor.placeholder = '按合同额手输 %';
                }
            });
        }
        
        
    }, "p_form_0000000080_d3");

}, function () {
    console.log('list Ready');
});


