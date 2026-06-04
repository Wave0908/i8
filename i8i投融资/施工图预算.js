
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

$NG.AllReady(function (editPage, { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick, useUpdateRow, useImportExcelData, useBeforeClick }) {
    var mstform = $NG.getCmpApi('p_form_sgtys_m');
    var dgrid = $NG.getCmpApi('p_form_sgtys_d1');


    if (editPage.oType == "add" || editPage.oType == "edit") {
        //该项目是否已在i8系统立项
        useValuesChange(async ({ args, form }) => {
            const u_xm = args[0].u_xm.value;
            console.log("u_xm:", u_xm);
            if (u_xm) {
                if (dgrid.getRows().length == 0) {
                    setTimeout(() => {
                        //                         SELECT
                        //   m.phid_pc,
                        //   d.s_tree_no,
                        //   d.s_tree_pid,
                        //   d.s_tree_id,
                        //   d.s_tree_name,
                        //   d.total_cost
                        // FROM
                        //   inv_budget_m m
                        //   LEFT JOIN inv_budget_d2 d ON m.phid = d.pphid
                        //   where m.phid_pc = @pc
                        $NG.execServer("gettzgsmx", { 'pc': u_xm }, (res) => {
                            console.log("u_xm===============>", u_xm);
                            if (res.count > 0) {
                                // 先检查res.data是否已经是对象
                                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                                console.log('data', data)
                                const targetData = data?.map((item) => {
                                    return { ...item.extendObjects }
                                })?.reverse();
                                const treeData = flatArrayToTree(targetData)
                                dgrid.addRows(treeData)
                            }
                        });
                    }, 100);
                }
            }
        }, "p_form_sgtys_m.u_xm");
    }
});