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

// 提取计算逻辑为独立函数
function calculateRowValues(record) {
    // 责任成本单价自动带出
    if (record.u_zrcbcbhj && record.u_zrcbgcl) {
        record.u_zrcbdj = (
            parseFloat(record.u_zrcbcbhj) / parseFloat(record.u_zrcbgcl)
        ).toFixed(2);
    }
    // 计划成本单价自动带出
    if (record.u_jhcbcbhj && record.u_jhcbgcl) {
        record.u_jhcbdj = (
            parseFloat(record.u_jhcbcbhj) / parseFloat(record.u_jhcbgcl)
        ).toFixed(2);
    }
    // 计划成本降低额自动带出
    if (record.u_htsryjhtsr && record.u_jhcbcbhj) {
        record.u_jhcbjde = (
            parseFloat(record.u_htsryjhtsr) - parseFloat(record.u_jhcbcbhj)
        ).toFixed(2);
    }
    // 计划成本降低率自动带出
    if (record.u_htsryjhtsr && record.u_jhcbjde) {
        record.u_jhcbjdl = (
            parseFloat(record.u_jhcbjde) / parseFloat(record.u_htsryjhtsr)
        ).toFixed(2);
    }
    // 二维度降低率指标自动带出
    if (record.u_jhcbjdl && !record.u_ewdjdlzb) {
        record.u_ewdjdlzb = record.u_jhcbjdl;
    }
    // 二维度指标自动带出
    if (record.u_htsryjhtsr && record.u_ewdjdlzb) {
        record.u_ewdzb = (
            parseFloat(record.u_htsryjhtsr) * (1 - parseFloat(record.u_ewdjdlzb))
        ).toFixed(2);
    }
    return record;
}
$NG.AllReady(function (editPage, {
    useValuesChange, useUpdateRow
}) {
    var mstform = $NG.getCmpApi('p_form_0000000092_m');
    var dgrid = $NG.getCmpApi('p_form_0000000092_d');
    console.log("dgrid===============>", dgrid);
    if (editPage.oType == "add") {
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
                    dgrid.addRows(treeData)

                    setTimeout(() => {
                        const rows = dgrid.getRows();
                        if (rows) {
                            rows.forEach(row => {
                                const updatedRow = calculateRowValues(row);
                                dgrid.updateRow(updatedRow); // 逐行更新
                            });
                            dgrid.refreshView();
                        }
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
                    // 先检查res.data是否已经是对象
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log('data', data)
                    const targetData = data?.map((item) => {
                        return { ...item.extendObjects }
                    })?.reverse();
                    const treeData = flatArrayToTree(targetData)
                    dgrid.addRows(treeData)

                    setTimeout(() => {
                        const rows = dgrid.getRows();
                        if (rows) {
                            rows.forEach(row => {
                                const updatedRow = calculateRowValues(row);
                                dgrid.updateRow(updatedRow); // 逐行更新
                            });
                            dgrid.refreshView();
                        }
                    }, 100)
                });
            }, 100);
        }, p_form_0000000092_m.phid_pc);
    } else if (editPage.oType == "edit") {
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
                    dgrid.addRows(treeData)
                    setTimeout(() => {
                        const rows = dgrid.getRows();
                        if (rows) {
                            rows.forEach(row => {
                                const updatedRow = calculateRowValues(row);
                                dgrid.updateRow(updatedRow); // 逐行更新
                            });
                            dgrid.refreshView();
                        }
                    }, 100)
                });
            }, 100);
        } else {
            setTimeout(() => {
                const rows = dgrid.getRows();
                if (rows) {
                    rows.forEach(row => {
                        const updatedRow = calculateRowValues(row);
                        dgrid.updateRow(updatedRow); // 逐行更新
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
                    dgrid.addRows(treeData)
                    setTimeout(() => {
                        const rows = dgrid.getRows();
                        if (rows) {
                            rows.forEach(row => {
                                const updatedRow = calculateRowValues(row);
                                dgrid.updateRow(updatedRow); // 逐行更新
                            });
                            dgrid.refreshView();
                        }
                    }, 100)
                });
            }, 100);
        }, p_form_0000000092_m.phid_pc);
    }
    // 单行数据更新
    var tables = $NG.getCmpApi("p_form_0000000092_d");
    useUpdateRow(({ args, table }) => {
        const record = args[0];
        const updatedRecord = calculateRowValues(record);
        tables.updateRow(updatedRecord);
    }, "p_form_0000000092_d");

}, function () {
    console.log('list Ready');
});