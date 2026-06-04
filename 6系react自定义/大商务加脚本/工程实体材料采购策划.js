$NG.AllReady(function (editPage, {
    useValuesChange, useUpdateRow, useUpdateRows, useDataIndexChange,useAction
}) {
    var mstform = $NG.getCmpApi('p_form_0000000073_m');
    var dgrid = $NG.getCmpApi('p_form_0000000073_d2');

    useAction('onClick')(() => {
        // 改1：url为表单的列表页面
        window.location.href = 'http://192.168.3.241:30599/ngweb/portal/index.html#/sub/formruntime/customform/list?AppTitle=%E5%B7%A5%E7%A8%8B%E5%AE%9E%E4%BD%93%E6%9D%90%E6%96%99%E9%87%87%E8%B4%AD%E7%AD%96%E5%88%92&busType=lingqisan&isSso=1&menucode=9265f708-9ce5-3cb2-d8f5-d4267ca4e947';
    }, 'u_libb')

    if (editPage.oType == "add") {
        debugger;
        // 改2：表名修改为对应表单表名
        // 第一步，获取原单据的id，通过imp接口信息拿到
        const sourceId = $NG.getPageState().data.p_form_0000000073_m.u_lyxmchzj;
        console.log('原单据id:', sourceId)
        if (sourceId) {
            // 第二步，请求自定义单据详情接口，获取原单据的数据
            $NG.AllReady(async () => {
                try {
                    const result = await $NG.request.get({
                        url: '/sup/customServer/getInfo',
                        data: {
                            id: sourceId,
                            oType: 'view',
                            // 改3：对应表单业务类型
                            customBusCode: 'lingqisan',
                            encryptPrimaryKey: $NG.CryptoJS.encode(sourceId)
                        }
                    });
                    console.log('result:', result);

                    if (result) {
                        const data = result?.data;
                        console.log('data', data);
                        if (!data) {
                            return;
                        }

                        const page = $NG.getPageInstance()
                        const editUI = page?.getEditUI();
                        console.log('editUI', editUI);

                        // 第三步，渲染数据

                        /**
                         * 主表需要重置的字段集合
                         */
                        const mainTableInitValues = {
                            phid: '',
                            phid_fill_psn: $NG.getUser().userID,
                            phid_fill_psn_EXName: $NG.getUser().userName,
                            bill_dt: $NG.formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                            wf_flag: 0,
                            app_status: 0,
                            app_dt: null,
                            phid_app: null,
                            bill_no: '',
                            printcount: 0,
                            arc_flag: 0,
                            iscost: 0,
                            cost_amount: 0,
                            ng_data_status: null,
                            u_bb: Number(data.p_form_0000000073_m.u_bb == '' ? 1 : data.p_form_0000000073_m.u_bb) + 1
                        };
                        //console.log('data.p_form_0000000073_m.u_bb:', data.p_form_0000000073_m.u_bb);
                        /**
                         * 主表需要重置的字段集合
                         */
                        const detailInitValues = {
                            phid: '',
                            pphid: '',
                            code: '',
                            asr_flag: 0
                        };

                        /**
                         * 获取附件项,附件相关的字段需进行滞空处理不进行复制，否则新老单据就会公用一套附件
                         */
                        const getAttachmentItem = (containerId) => {
                            const items = [];
                            const resetFields = {};
                            if (editUI?.fieldSetForm?.[containerId]) {
                                editUI?.fieldSetForm?.[containerId]?.children?.forEach((d) => {
                                    items.push(...(d?.children ?? []));
                                });
                            } else {
                                items.push(...(editUI?.containerIds?.[containerId]?.children ?? []));
                            }
                            items
                                ?.filter((d) => {
                                    const xtype = d?.xtype || d?.editor?.xtype;
                                    return ['Attachment', 'Image'].includes(xtype);
                                })
                                ?.forEach((d) => {
                                    resetFields[d.name] = '';
                                });
                            return resetFields;
                        };

                        /**
                         * 树结构明细表需要递归处理
                         */
                        const loopSetDataValue = (tableValue, resetFields) => {
                            // 明细表、包含树明细
                            tableValue.forEach((v) => {
                                Object.entries({ ...resetFields, ...detailInitValues }).forEach(([field, resetValue]) => {
                                    v[field] = resetValue;
                                });
                                if (v?.children?.length) loopSetDataValue(v.children, resetFields);
                            });
                        };

                        Object.keys(data).forEach((key) => {
                            const value = data[key];
                            const resetFields = getAttachmentItem(key);
                            // 主表
                            if ($NG.isObject(value)) {
                                Object.entries({ ...resetFields, ...mainTableInitValues }).forEach(([field, resetValue]) => {
                                    value[field] = resetValue;
                                });
                                // 明细表
                            } else if ($NG.isArray(value)) {
                                loopSetDataValue(value, resetFields);
                            }
                        });
                        $NG.updateState(updater => {
                            updater.data.setProps(() => data)
                        })
                        console.log('data:', data);
                    }
                } catch (error) {
                    console.error('请求发生错误:', error);
                }
            });
        }

    }
    //是否用剩余控制总量管控，是显示，否不显示
    useValuesChange(({ args }) => {
        var u_is_bl = mstform.getValues().u_is_bl;
        console.log(u_is_bl)
        console.log(typeof (u_is_bl))
        if (u_is_bl === '2') {
            $NG.getCmpApi('p_form_0000000073_d2').setColumnProps('u_rest_ctl_qty', { hidden: true });
            $NG.getCmpApi('p_form_0000000073_d2').setColumnProps('u_rest_ctl_qty', { required: false });

        } else {
            $NG.getCmpApi('p_form_0000000073_d2').setColumnProps('u_rest_ctl_qty', { hidden: false });
            $NG.getCmpApi('p_form_0000000073_d2').setColumnProps('u_rest_ctl_qty', { required: true });

        }
    }, "p_form_0000000073_m.u_is_bl");
    //新增
    if (editPage.oType == "add") {
        const phid_pc = mstform.getValues().phid_pc;
        if (dgrid.getRows().length == 0) {

            // 2025-11-05 江璐说周转材料改为主要材料
            /** ====== 引用商务篇第三章材料成本要素二维指标合计值-其中周转材料合约包二维指标合计值  start ====== */
            $NG.execServer("jhcbewdzbzzclhyb", { 'pc': phid_pc }, (res) => {
                console.log("phid_pc===============>", phid_pc);
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
                const zzcl_ewdzb = getSafeValue(0); // 周转材料

                // 汇总赋值
                $NG.updateState((updater) => {
                    updater.data.p_form_0000000073_m.setProps({
                        u_stclewzb: zzcl_ewdzb
                    });
                });
            });
            /** ====== 引用商务篇第三章材料成本要素二维指标合计值-其中周转材料合约包二维指标合计值  end ====== */

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

                    // +++ 添加行后计算根节点合计 +++
                    setTimeout(() => updateMasterWithRootSum(), 200);
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
    } else if (editPage.oType == "edit") {
        const phid_pc = mstform.getValues().phid_pc;
        if (dgrid.getRows().length == 0) {

            // 2025-11-05 江璐说周转材料改为主要材料
            /** ====== 引用商务篇第三章材料成本要素二维指标合计值-其中周转材料合约包二维指标合计值  start ====== */
            $NG.execServer("jhcbewdzbzzclhyb", { 'pc': phid_pc }, (res) => {
                console.log("phid_pc===============>", phid_pc);
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
                const zzcl_ewdzb = getSafeValue(0); // 周转材料

                // 汇总赋值
                $NG.updateState((updater) => {
                    updater.data.p_form_0000000073_m.setProps({
                        u_stclewzb: zzcl_ewdzb
                    });
                });
            });
            /** ====== 引用商务篇第三章材料成本要素二维指标合计值-其中周转材料合约包二维指标合计值  end ====== */

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

                    // +++ 添加行后计算根节点合计 +++
                    setTimeout(() => updateMasterWithRootSum(), 200);
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
    } else if (editPage.oType == "view") {

    }

    useValuesChange(({ args }) => {
        dgrid.clearRows();
        // 先归零
        $NG.updateState(updater => {
            updater.data.p_form_0000000073_m.setProps({
                u_xmbnfscb: '0'
            });
        });
        const phid_pc = mstform.getValues().phid_pc;
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

                // +++ 添加行后计算根节点合计 +++
                setTimeout(() => updateMasterWithRootSum(), 200);
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

            // 2025-11-05 江璐说周转材料改为主要材料
            /** ====== 引用商务篇第三章材料成本要素二维指标合计值-其中周转材料合约包二维指标合计值  start ====== */
            $NG.execServer("jhcbewdzbzzclhyb", { 'pc': phid_pc }, (res) => {
                console.log("phid_pc===============>", phid_pc);
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
                const zzcl_ewdzb = getSafeValue(0); // 周转材料
                console.log("周转材料===============", zzcl_ewdzb);

                // 汇总赋值
                $NG.updateState((updater) => {
                    updater.data.p_form_0000000073_m.setProps({
                        u_stclewzb: zzcl_ewdzb
                    });
                });

            });
            /** ====== 引用商务篇第三章材料成本要素二维指标合计值-其中周转材料合约包二维指标合计值  end ====== */
        }, 100);
    }, p_form_0000000073_m.phid_pc);

    /**汇总 ‘二维指标’ 值 赋值到 ‘项目部拟发生成本’ */
    var tables = $NG.getCmpApi("p_form_0000000073_d2");
    useUpdateRow(({ args }) => {
        var rows = tables.getRows();
        // 先归零
        $NG.updateState(updater => {
            updater.data.p_form_0000000073_m.setProps({
                u_xmbnfscb: '0'
            });
        });
        // 调用累加函数
        calculateParentValues(rows);
        if (rows) {
            rows.forEach(row => {
                dgrid.updateRow(row);
            });
            dgrid.refreshView();
        }

        updateMasterWithRootSum();

        // 更新表格中的所有行
        rows.forEach(node => {
            tables.updateRow(node);
        });
    }, "p_form_0000000073_d2");

    /**递归计算父节点的值（子节点值合计到父节点） */
    function calculateParentValues(nodes) {
        nodes.forEach(node => {
            if (node.children && node.children.length > 0) {
                // 先递归计算子节点
                calculateParentValues(node.children);

                // 初始化父节点的值
                node.u_gsjz = '0.00';

                // 累加所有子节点的值
                node.children.forEach(child => {
                    node.u_gsjz = (parseFloat(node.u_gsjz || 0) + (parseFloat(child.u_gsjz) || 0)).toFixed(2);
                });
            }
        });
    }

    /** 新增函数：计算根节点合计并更新主表 */
    function updateMasterWithRootSum() {
        const rows = dgrid.getRows();
        if (!rows || rows.length === 0) return;

        let rootSum = 0;
        rows.forEach(node => {
            // 判断是否为根节点（没有父节点）
            if (!node.s_tree_pid || node.s_tree_pid === "0") {
                const value = parseFloat(node.u_gsjz) || 0;
                rootSum += value;
            }
        });

        $NG.updateState(updater => {
            updater.data.p_form_0000000073_m.setProps({
                u_xmbnfscb: rootSum.toFixed(2)
            });
        });
    }

}, function () {
    console.log('list Ready');
});

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