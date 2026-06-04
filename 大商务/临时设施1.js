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
    $NG.execServer("gjdjdclssj", {
        'billno': bill_no
    }, function (res) {
        console.log("res.data:", res.data);
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
    });
    // ============= 树形表格加载 =============
    const dgrid = $NG.getCmpApi('p_form_0000000077_d2');

    if (editPage.oType == "add") {
        const phid_pc = mstform.getValues().phid_pc;
        if (dgrid.getRows().length == 0) {
            setTimeout(() => {
                $NG.execServer("lsssdthygh", { 'pc': phid_pc }, (res) => {
                    console.log("phid_pc===============>", phid_pc);
                    // 先检查res.data是否已经是对象
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log('data', data)
                    const targetData = data?.map((item) => {
                        return { ...item.extendObjects }
                    })?.reverse();
                    const treeData = flatArrayToTree(targetData)
                    dgrid.addRows(treeData)
                });
            }, 100);
        }
        useValuesChange(({ args }) => {
            dgrid.clearRows();
            const phid_pc = mstform.getValues().phid_pc;
            setTimeout(() => {
                $NG.execServer("lsssdthygh", { 'pc': phid_pc },(res) => {
                    console.log("phid_pc===============>", phid_pc);
                    // 先检查res.data是否已经是对象
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log('data', data)
                    const targetData = data?.map((item) => {
                        return { ...item.extendObjects }
                    })?.reverse();
                    const treeData = flatArrayToTree(targetData)
                    dgrid.addRows(treeData)
                });
            }, 100);
        }, p_form_0000000077_m.phid_pc);
    } else if (editPage.oType == "edit") {
        const phid_pc = mstform.getValues().phid_pc;
        if (dgrid.getRows().length == 0) {
            setTimeout(() => {
                $NG.execServer("lsssdthygh", { 'pc': phid_pc },(res) => {
                    console.log("phid_pc===============>", phid_pc);
                    // 先检查res.data是否已经是对象
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log('data', data)
                    const targetData = data?.map((item) => {
                        return { ...item.extendObjects }
                    })?.reverse();
                    const treeData = flatArrayToTree(targetData)
                    dgrid.addRows(treeData)
                });
            }, 100);
        }
        useValuesChange(({ args }) => {
            dgrid.clearRows();
            const phid_pc = mstform.getValues().phid_pc;
            setTimeout(() => {
                $NG.execServer("lsssdthygh",{ 'pc': phid_pc }, (res) => {
                    console.log("phid_pc===============>", phid_pc);
                    // 先检查res.data是否已经是对象
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log('data', data)
                    const targetData = data?.map((item) => {
                        return { ...item.extendObjects }
                    })?.reverse();
                    const treeData = flatArrayToTree(targetData)
                    dgrid.addRows(treeData)
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
                //store
                debugger
                const store = args[1].table.store;
                console.log(store.data)
                var sumAmt = 0;
                store.data.forEach((item) => {
                    sumAmt += item.u_zght === undefined ? 0 : item.u_zght; //遍历汇总
                });
                console.log(sumAmt);
                //汇总赋值
                $NG.updateState((updater) => {
                    updater.data.p_form_0000000077_m.setProps({
                        u_xmbnfscb: sumAmt,
                    });
                });
            }, "u_zght");
        });
    });

