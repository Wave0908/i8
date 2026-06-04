$NG.AllReady(function (editPage, { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick }) {
    var mstform = $NG.getCmpApi('p_form_0000000058_m');
    var dgrid = $NG.getCmpApi('p_form_0000000058_d');

    useAction('onClick')(() => {
        // 改1：url为表单的列表页面
        window.location.href = 'http://192.168.3.241:30599/ngweb/portal/index.html#/sub/formruntime/customform/list?AppTitle=%E6%96%BD%E5%B7%A5%E5%9B%BE%E9%A2%84%E7%AE%97%E7%BC%96%E5%88%B6%E7%AD%96%E5%88%92&busType=lingwuba&isSso=1&menucode=9265f708-9ce5-3cb2-d8f5-d4267ca4e947';
    }, 'u_libb')
    
    if (editPage.oType == "add") {
        debugger;
        // 改2：表名修改为对应表单表名
        // 第一步，获取原单据的id，通过imp接口信息拿到
        const sourceId = $NG.getPageState().data.p_form_0000000058_m.u_lyxmchzj;
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
                            customBusCode: 'lingwuba',
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
                            u_bb: Number(data.p_form_0000000058_m.u_bb == '' ? 1 : data.p_form_0000000058_m.u_bb) + 1
                        };
                        //console.log('data.p_form_0000000058_m.u_bb:', data.p_form_0000000058_m.u_bb);
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
    var pc = mstform.getItem('phid_pc').getValue();
    if (pc) {
        $NG.updateUI(function (updater, state) {
            updater.grid.p_form_0000000058_d.u_sgtzys.setProps({
                clientSqlFilter: ('phid_pc =' + pc)
            });
        });
    } else {
        $NG.updateUI(function (updater, state) {
            updater.grid.p_form_0000000058_d.u_sgtzys.setProps({
                clientSqlFilter: ('phid_pc =' + 0)
            });
        });
    }

    useValuesChange(({ args }) => {
        console.log('phid_pc:', args[0].phid_pc.PhId);
        if (args[0].phid_pc.PhId) {
            useAction('onClick')(() => {
                $NG.execServer("yytzgl", { 'phid_pc': args[0].phid_pc.PhId }, (res) => {
                    if (res.count > 0) {
                        const data = JSON.parse(res.data);
                        console.log('data:', data);
                        console.log('data[0]:', data[0]);
                        for (let i = 0; i < data.length; i++) {
                            dgrid.addRows({
                                u_dwgc: data[i].extendObjects.u_dwgc,
                                u_tz: data[i].extendObjects.u_tz,
                                u_zy: data[i].extendObjects.u_zy,
                                u_dtsj: data[i].extendObjects.u_dtsj,
                            });
                        }
                    }
                });
            }, 'u_refer')
            $NG.updateUI(function (updater, state) {
                updater.grid.p_form_0000000058_d.u_sgtzys.setProps({
                    clientSqlFilter: ('phid_pc =' + args[0].phid_pc.PhId)
                });
            });
        }
    }, "p_form_0000000058_m.phid_pc");

    useUpdateRows(({ args }) => {

    }, '');
});