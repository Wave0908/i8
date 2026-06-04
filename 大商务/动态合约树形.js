if (editPage.oType == "add") {
    const phid_pc = mstform.getValues().phid_pc;
    $NG.execServer("get_ewzb_clcg", { 'pc': phid_pc }, (res) => {
        // 先检查res.data是否已经是对象
        const data = JSON.parse(res.data);
        console.log('data', data)
        const u_stclewzb = data[0].extendObjects.u_ewdzb;

    });
    if (dgrid.getRows().length == 0) {
        setTimeout(() => {
            $NG.execServer("getdthygh_stcl", { 'pc': phid_pc }, (res) => {
                console.log("phid_pc===============>", phid_pc);
                // 先检查res.data是否已经是对象
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log('data', data)
                const targetData = data?.map((item) => {
                    return { ...item.extendObjects }
                })?.reverse();
                const treeData = flatArrayToTree(targetData)
                dgrid.addRows(treeData)
                /*
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
                */
            });
        }, 100);
    }
    useValuesChange(({ args }) => {
        dgrid.clearRows();
        const phid_pc = mstform.getValues().phid_pc;
        debugger;
        $NG.execServer("get_ewzb_clcg", { 'pc': phid_pc }, (res) => {
            // 先检查res.data是否已经是对象
            const data = JSON.parse(res.data);
            console.log('data', data)
            const u_stclewzb = data[0].extendObjects.u_ewdzb;

        });
        setTimeout(() => {
            $NG.execServer("getdthygh_stcl", { 'pc': phid_pc }, (res) => {
                console.log("phid_pc===============>", phid_pc);
                // 先检查res.data是否已经是对象
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log('data', data)
                const targetData = data?.map((item) => {
                    return { ...item.extendObjects }
                })?.reverse();
                const treeData = flatArrayToTree(targetData)
                dgrid.addRows(treeData)
                /*
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
                */
            });
        }, 100);
    }, p_form_0000000073_m.phid_pc);
}