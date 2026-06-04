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
const TABLE2 = 'p_form_0000000080_d1'; // 替换为实际表2 ID
// ====================== 工具函数 ======================
const safeParseFloat = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
};

$NG.AllReady(function (editPage, {
    useValuesChange, useUpdateRow, useDataIndexChange
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
    const table2 = $NG.getCmpApi("p_form_0000000080_d1");

    // 计算函数（优化NaN处理）
    const calculateSum1 = () => {
        debugger
        sum1 = table1.getRows().reduce((acc, row) =>
            acc + (parseFloat(row.u_gz_bz) || 0), 0);
        console.log(sum1);
        return sum1;
    };

    const calculateSum2 = () => {
        debugger
        sum2 = table2.getRows().reduce((acc, row) =>
            acc + (parseFloat(row.u_hj) || 0), 0);
        console.log(sum2);
        return sum2;
    };

    // 防抖更新总成本 
    const updateTotalCost = debounce(() => {
        if (isTreeLoading) return; // 加载中跳过 
        mainForm.setProps({
            u_xmbnfscb: (calculateSum1() + calculateSum2()).toFixed(2)
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

    useValuesChange(({ args }) => {
        isTreeLoading = true; // 加锁
        dgrid.clearRows();

        $NG.execServer("glfcbkzch", {}, (res) => {
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
                    updateTotalCost(); // 最终更新 
                }, 100);

            } catch (e) {
                console.error(' 树形数据加载失败', e);
                isTreeLoading = false;
            }
        });
    }, "u_xmlb");

    //其他间接费的总价
    var tables = $NG.getCmpApi("p_form_0000000080_d1");
    useUpdateRow(({ args, table }) => {
        const record = args[0];
        //预估总价
        if (record.u_sl && record.u_dj) {
            record.u_hj = (
                parseFloat(record.u_dj) * parseFloat(record.u_sl)
            ).toFixed(2);
        }
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
    })

    // 其他间接费新增时填入数据
    var srcjform = $NG.getCmpApi("p_form_0000000080_d1");
    srcjform.addRows([
        { u_qtjjf: "印花税", u_cssm: "按税前合同总额0.06%（收支类合同各按照0.03%计算）" },
        { u_qtjjf: "低值易耗品及煤气其他物料消耗", u_cssm: "按合同额手输%" },
        { u_qtjjf: "仪器检测费", u_cssm: "按合同额 手输 %" },
        { u_qtjjf: "外租房屋费", u_cssm: "按税前合同总额0.06%（收支类合同各按照0.03%计算）" },
        { u_qtjjf: "生活区、办公区水电费", u_cssm: "全部施工现场住宿的按合同额的手输%" },
        { u_qtjjf: "建设工程交易服务费", u_cssm: "EPC总承包合同招标咨询费等" },
        { u_qtjjf: "招标代理费", u_cssm: "设备招标代理费按《招标代理业务收费管理暂行办法》国家计委1980号文件0.5%执行" },
        { u_qtjjf: "专家评审费、论证费", u_cssm: "深基坑、超高支撑专家论证费等" },
        { u_qtjjf: "项目用车消耗", u_cssm: "一类项目：手输元/月；交工结算期按50%考虑(上述金额含项目经理用车手输元/月)；" },
        { u_qtjjf: "业务招待费", u_cssm: "按合同额手输 %" }
    ]);

}, function () {
    console.log('list Ready');
});


