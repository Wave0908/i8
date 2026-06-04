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
    //     required: true, //required是否必输
    //   });
    // });
    useAction('onClick')(() => {
        // 改1：url为表单的列表页面
        window.location.href = 'http://192.168.3.241:30599/ngweb/portal/index.html#/sub/formruntime/customform/list?AppTitle=%E5%95%86%E5%8A%A1%E8%B5%84%E6%96%99%E6%B8%85%E5%8D%95%E5%88%86%E8%A7%A3%E7%9B%AE%E6%A0%87&busType=lingjiuling&isSso=1&menucode=9265f708-9ce5-3cb2-d8f5-d4267ca4e947';
    }, 'u_libb')
    
    if (editPage.oType == "add") {
        debugger;
        // 改2：表名修改为对应表单表名
        // 第一步，获取原单据的id，通过imp接口信息拿到
        const sourceId = $NG.getPageState().data.p_form_0000000090_m.u_lyxmchzj;
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
                            customBusCode: 'lingjiuling',
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
                            u_bb: Number(data.p_form_0000000090_m.u_bb == '' ? 1 : data.p_form_0000000090_m.u_bb) + 1
                        };
                        //console.log('data.p_form_0000000090_m.u_bb:', data.p_form_0000000090_m.u_bb);
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
    console.log('单据编号：', mstform.getValues("bill_no"));
    mstform.setHidden("bill_no");

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