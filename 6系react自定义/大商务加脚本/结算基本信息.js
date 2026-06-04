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

$NG.AllReady(function (editPage, { useAction,useValuesChange, useDataIndexChange, useUpdateRows, useUpdateRow }) {
    var mstform = $NG.getCmpApi('p_form_0000000089_m');  //
    var dgrid = $NG.getCmpApi('p_form_0000000089_d1');//获取容器
    var dgrid7 = $NG.getCmpApi('p_form_0000000089_d7'); //竣工结算编制台帐
    var dgrid8 = $NG.getCmpApi('p_form_0000000089_d8'); //商务资料汇总明细表
    var dgrid9 = $NG.getCmpApi('p_form_0000000089_d9'); //商务资料签认计划
    var dgrid10 = $NG.getCmpApi('p_form_0000000089_d10'); //预计总成本情况

    useAction('onClick')(() => {
        // 改1：url为表单的列表页面
        window.location.href = 'http://192.168.3.241:30599/ngweb/portal/index.html#/sub/formruntime/customform/list?AppTitle=%E7%BB%93%E7%AE%97%E5%9F%BA%E6%9C%AC%E5%B7%A5%E4%BD%9C&busType=lingbajiu&isSso=1&menucode=9265f708-9ce5-3cb2-d8f5-d4267ca4e947';
    }, 'u_libb')
    
    if (editPage.oType == "add") {
        debugger;
        // 改2：表名修改为对应表单表名
        // 第一步，获取原单据的id，通过imp接口信息拿到
        const sourceId = $NG.getPageState().data.p_form_0000000089_m.u_lyxmchzj;
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
                            customBusCode: 'lingbajiu',
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
                            u_bb: Number(data.p_form_0000000089_m.u_bb == '' ? 1 : data.p_form_0000000089_m.u_bb) + 1
                        };
                        //console.log('data.p_form_0000000089_m.u_bb:', data.p_form_0000000089_m.u_bb);
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

    /*递归计算父节点的值（子节点值合计到父节点） */
    /*
    function calculateParentValues(nodes) {
        nodes.forEach(node => {
            if (node.children && node.children.length > 0) {
                // 先递归计算子节点
                calculateParentValues(node.children);

                // 初始化父节点的值
                node.u_bzje = '0.00';

                // 累加所有子节点的值
                node.children.forEach(child => {
                    node.u_bzje = (parseFloat(node.u_bzje || 0) + (parseFloat(child.u_bzje) || 0)).toFixed(2);
                });
            }
        });
    }
    */
    useUpdateRow(({ args }) => {
        var rows = dgrid7.getRows();
        // 先归零
        /*
        $NG.updateState(updater => {
            updater.data.p_form_0000000073_m.setProps({
                u_xmbnfscb: '0'
            });
        });
        */
        // 调用累加函数

        calculateParentValues(rows);

        if (rows) {
            rows.forEach(row => {
                dgrid7.updateRow(row);
            });
            dgrid7.refreshView();
        }


        //updateMasterWithRootSum();

        // 更新表格中的所有行
        rows.forEach(node => {
            dgrid7.updateRow(node);
        });
    }, "p_form_0000000089_d7");

    //debugger;
    //表体默认增行
    if (editPage.oType == "add") {
        const pc = mstform.getValues().phid_pc;
        if (dgrid7.getRows().length == 0) {
            setTimeout(() => {
                $NG.execServer("getdsw_mx", { 'billname': '竣工结算编制台帐' }, (res) => {
                    //     console.log("phid_pc===============>", phid_pc);
                    // 先检查res.data是否已经是对象
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log('data', data)
                    const targetData = data?.map((item) => {
                        return { ...item.extendObjects }
                    })?.reverse();
                    const treeData = flatArrayToTree(targetData)
                    dgrid7.addRows(treeData)
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

                $NG.execServer("getdsw_mx", { 'billname': '商务资料汇总明细表' }, (res) => {
                    //     console.log("phid_pc===============>", phid_pc);
                    // 先检查res.data是否已经是对象
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log('data', data)
                    const targetData = data?.map((item) => {
                        return { ...item.extendObjects }
                    })?.reverse();
                    const treeData = flatArrayToTree(targetData)
                    dgrid8.addRows(treeData)

                });

                $NG.execServer("getdsw_mx", { 'billname': '商务资料签认计划' }, (res) => {
                    //     console.log("phid_pc===============>", phid_pc);
                    // 先检查res.data是否已经是对象
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log('data', data)
                    const targetData = data?.map((item) => {
                        return { ...item.extendObjects }
                    })?.reverse();
                    const treeData = flatArrayToTree(targetData)
                    dgrid9.addRows(treeData)

                });
                if (pc) {
                    $NG.execServer("get_yjzcbqk", { 'p_bill_no': pc }, (res) => {
                        //     console.log("phid_pc===============>", phid_pc);
                        // 先检查res.data是否已经是对象
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        console.log('data', data)
                        const targetData = data?.map((item) => {
                            return {
                                ...item.extendObjects,
                                u_htname_EXName: item.extendObjects.u_htname_exname

                            }
                        })?.reverse();
                        const treeData = flatArrayToTree(targetData)
                        dgrid10.addRows(treeData)
                    });
                }
            }, 100);
        }
    }

    getxmxx();
    useValuesChange(({ args }) => {
        getxmxx();
    }, 'phid_pc');

    async function getxmxx() {
        const phid_pc = mstform.getValues().phid_pc;
        $NG.execServer("get_yjzcbqk", { 'p_bill_no': phid_pc }, (res) => {
            if (res.count > 0) {
                //     console.log("phid_pc===============>", phid_pc);
                // 先检查res.data是否已经是对象
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log('data', data)
                const targetData = data?.map((item) => {
                    return {
                        ...item.extendObjects,
                        u_htname_EXName: item.extendObjects.u_htname_exname
                    }
                })?.reverse();
                const treeData = flatArrayToTree(targetData)
                dgrid10.addRows(treeData)
            }
        });

        $NG.execServer("get_yjzsr", { 'id': phid_pc }, (res) => {
            if (res.count > 0) {
                const _data = JSON.parse(res.data)[0].extendObjects
                console.log('_data:', _data);
                $NG.updateState((updater) => {
                    updater.data.p_form_0000000089_m.setProps({
                        u_hte: _data.cnt_sum_vat_fc,   //合同额
                        u_yjzcb: _data.incl_tax_income_amt,//预计总收入
                        u_qbjsje: _data.u_yjzcb, //确保结算金额
                    });
                });
            }
        });

        $NG.execServer("getjsch", { 'id': phid_pc }, (res) => {
            if (res.count > 0) {
                const _data = JSON.parse(res.data)[0].extendObjects
                console.log('_data:', _data);
                $NG.updateState((updater) => {
                    updater.data.p_form_0000000089_m.setProps({
                        u_jschsj: _data.u_chwcsj,   //结算策划
                    });
                });
            }
        });
    }

    useUpdateRows(({ args }) => {
        const rows = args[0];
        console.log('rows:', rows);
        args[0].forEach((item) => {
            computed(item);  //调用下方函数
        });
        dgrid.refreshView();
    }, "p_form_0000000089_d2");

    //调用不同的功能扩展需要提换下方getygxx，对应赋值字段也需要对应
    function computed(item) {
        $NG.execServer("get_sglttz", { id: item.u_tzmc },//功能扩展
            function (res) {
                try {
                    const datas = JSON.parse(res.data)[0].extendObjects;
                    console.log(datas, "datas");

                    item.u_th_text = datas.u_th;
                    item.u_tzzs = datas.u_ljdt;

                    dgrid.updateRow(item);
                    dgrid.refreshView();
                } catch (error) { }
            }
        );
    }
    //小计计算
    useDataIndexChange(({ args, instance }) => {
        //    console.log('u_sbfw:', u_sbfw);输出日志

        const yjscb = args[0].u_yjscb ?? 0;       // 预算审核成本，空值转为0
        const yfswqrcb = args[0].u_yfswqrcb ?? 0; // 应付未确认成本，空值转为0
        const yjdfscb = args[0].u_yjdfscb ?? 0;   // 预计节点审核成本，空值转为0
        const sum = Number(yjscb) + Number(yfswqrcb) + Number(yjdfscb);
        args[0].u_sum = sum
        instance.updateRow(args[0]);

    }, ['p_form_0000000089_d10.u_yjscb', 'p_form_0000000089_d10.u_yfswqrcb', 'p_form_0000000089_d10.u_yjdfscb']);	//同时监听三个字段

    useUpdateRow(({ args }) => {
        var rows = dgrid10.getRows();
        // 先归零
        /*
        $NG.updateState(updater => {
            updater.data.p_form_0000000089_m.setProps({
                u_xmyjzcb: '0',
                u_ljfscb: '0',
                u_yjfscb: '0'
            });
        });
        */
        // 调用累加函数
        calculateParentValues(rows);
        if (rows) {
            rows.forEach(row => {
                dgrid10.updateRow(row);
            });
            dgrid10.refreshView();
        }

        updateMasterWithRootSum();

        // 更新表格中的所有行
        rows.forEach(node => {
            dgrid10.updateRow(node);
        });
    }, "p_form_0000000089_d10");

    //    
    function calculateParentValues(nodes) {
        nodes.forEach(node => {
            if (node.children && node.children.length > 0) {
                // 先递归计算子节点
                calculateParentValues(node.children);

                // 初始化父节点的值
                node.u_yjscb = '0.00';
                node.u_yfswqrcb = '0.00';
                node.u_yjdfscb = '0.00';
                node.u_bzje = '0.00';

                // 累加所有子节点的值
                node.children.forEach(child => {
                    node.u_yjscb = (parseFloat(node.u_yjscb || 0) + (parseFloat(child.u_yjscb) || 0)).toFixed(2);
                    node.u_yfswqrcb = (parseFloat(node.u_yfswqrcb || 0) + (parseFloat(child.u_yfswqrcb) || 0)).toFixed(2);
                    node.u_yjdfscb = (parseFloat(node.u_yjdfscb || 0) + (parseFloat(child.u_yjdfscb) || 0)).toFixed(2);
                    node.u_bzje = (parseFloat(node.u_bzje || 0) + (parseFloat(child.u_bzje) || 0)).toFixed(2);
                });
            }
        });
    }
    function updateMasterWithRootSum() {
        const rows = dgrid10.getRows();
        if (!rows || rows.length === 0) return;

        let rootSum = 0;
        let rootSum2 = 0;
        let rootSum3 = 0;
        rows.forEach(node => {
            // 判断是否为根节点（没有父节点）
            if (!node.s_tree_pid || node.s_tree_pid === "0") {
                const value = parseFloat(node.u_yjscb) || 0;
                const value2 = parseFloat(node.u_yfswqrcb) || 0;
                const value3 = parseFloat(node.u_yjdfscb) || 0;
                rootSum += value;
                rootSum2 += value2;
                rootSum3 += value3;
            }
        });

        $NG.updateState(updater => {
            updater.data.p_form_0000000089_m.setProps({
                u_xmyjzcb: rootSum.toFixed(2),
                u_ljfscb: rootSum2.toFixed(2),
                u_yjfscb: rootSum3.toFixed(2)
            });
        });
    }


    //debugger;
}, function () {
    console.log('list Ready');
});