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

$NG.AllReady(function (editPage, {
    useValuesChange, useAction
}) {
    var mstform = $NG.getCmpApi('p_form_0000000090_m');
    var dgrid = $NG.getCmpApi('p_form_0000000090_d1');
    // $NG.updateUI(function (updater, state) {
    //   updater.form.p_form_0000000090_m.bill_no.setProps({
    //     hidden: true, 
    //   });
    // });
    // console.log('单据编号：', mstform.getValues("bill_no"));

    useValuesChange(({ args }) => {
        dgrid.clearRows();
        const phid_pc = mstform.getValues().phid_pc;
        setTimeout(() => {
            $NG.execServer("getdsw_mx", { 'billname': '商务资料清单分解目标' }, (res) => {
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
    }, p_form_0000000090_m.phid_pc);
}, function () {
    console.log('list Ready');
});