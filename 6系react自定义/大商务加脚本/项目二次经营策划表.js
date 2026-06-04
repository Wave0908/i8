$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useUpdateRow, useUpdateRow1, useClick }
) {
    var dgrid = $NG.getCmpApi("p_form_0000000082_d1");
    const mstform = $NG.getCmpApi('p_form_0000000082_m');

    useAction('onClick')(() => {
        // 改1：url为表单的列表页面
        window.location.href = 'http://192.168.3.241:30599/ngweb/portal/index.html#/sub/formruntime/customform/list?AppTitle=%E9%A1%B9%E7%9B%AE%E4%BA%8C%E6%AC%A1%E7%BB%8F%E8%90%A5%E7%AD%96%E5%88%92%E8%A1%A8&busType=lingbaer&isSso=1&menucode=9265f708-9ce5-3cb2-d8f5-d4267ca4e947';
    }, 'u_libb')
    
    if (editPage.oType == "add") {
        debugger;
        // 改2：表名修改为对应表单表名
        // 第一步，获取原单据的id，通过imp接口信息拿到
        const sourceId = $NG.getPageState().data.p_form_0000000082_m.u_lyxmchzj;
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
                            customBusCode: 'lingbaer',
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
                            u_bb: Number(data.p_form_0000000082_m.u_bb == '' ? 1 : data.p_form_0000000082_m.u_bb) + 1
                        };
                        //console.log('data.p_form_0000000082_m.u_bb:', data.p_form_0000000082_m.u_bb);
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
    useValuesChange(({ args }) => {
        const phid_pc = mstform.getValues().phid_pc;
        console.log("phid_pc:", phid_pc);
        $NG.execServer("get_yjzsr", { 'id': phid_pc }, (res) => {
            const _data = JSON.parse(res.data)[0].extendObjects
            console.log("res:", res);
            console.log("res.data:", res.data);
            console.log('_data:', _data);
            $NG.updateState((updater) => {
                updater.data.p_form_0000000082_m.setProps({
                    u_yjzsr: _data.incl_tax_income_amt,//预计总收入
                });
            });

        });
    }, 'phid_pc');

    // 方案1：监听dgrid的u_ncxje字段变化，动态更新汇总
    useDataIndexChange(({ args }) => {
        console.log("useDataIndexChange触发 - u_ncxje");
        calculateAndUpdateTotal();
    }, "u_ncxje");

    // 方案2：监听u_yjsy_chh和u_yjsy_chq字段变化
    useDataIndexChange(({ args }) => {
        console.log("useDataIndexChange触发 - u_yjsy_chh");
        calculateAndUpdateTotal();
    }, "u_yjsy_chh");

    useDataIndexChange(({ args }) => {
        console.log("useDataIndexChange触发 - u_yjsy_chq");
        calculateAndUpdateTotal();
    }, "u_yjsy_chq");

    // 方案3：监听多行数据变化
    useUpdateRows(({ args, table }) => {
        console.log("useUpdateRows触发");
        calculateAndUpdateTotal();
    }, "p_form_0000000082_d1");

    // 汇总计算函数
    function calculateAndUpdateTotal() {
        // 获取当前dgrid的所有行数据
        const rows = dgrid.getRows();
        console.log("所有行数据:", rows);

        var sumNcxje = 0;
        rows.forEach((item) => {
            // 汇总所有行的拟创效金额
            sumNcxje += item.u_ncxje === undefined ? 0 : item.u_ncxje;
        });
        console.log("拟创效金额合计:", sumNcxje);
        // 更新主表的拟创效金额合计
        $NG.updateState((updater) => {
            updater.data.p_form_0000000082_m.setProps({
                u_ncxjehjz: sumNcxje,
            });
        });

        // 获取主表的预计总收入
        const yjzsr = mstform.getValues().u_yjzsr || 0;
        console.log("预计总收入:", yjzsr);

        // 计算比例：拟创效金额合计 / 预计总收入
        let cxbfb = 0;
        if (yjzsr > 0) {
            // 修改计算方式，增加精度
            cxbfb = ((sumNcxje / yjzsr) * 100).toFixed(4); // 增加到4位小数
            // 如果结果太小，使用科学计数法或更精确的显示
            if (parseFloat(cxbfb) < 0.01) {
                cxbfb = ((sumNcxje / yjzsr) * 100).toFixed(6); // 使用6位小数
            }
        }
        console.log("创效百分比:", cxbfb);

        // 更新主表的创效百分比
        $NG.updateState((updater) => {
            updater.data.p_form_0000000082_m.setProps({
                u_cxbfb: cxbfb,
                u_cxbfbbq: cxbfb * 100,//插标签用
            });
        });
    }

    useUpdateRow(({ args, table }) => {
        const record = args[0];
        //拟创效金额 （万元）
        if (record.u_yjsy_chh && record.u_yjsy_chq) {
            record.u_ncxje = (
                (parseFloat(record.u_yjsy_chh) || 0) - (parseFloat(record.u_yjsy_chq) || 0)
            );
        }
        table.updateRow(record);

        // 方案1补充：在useUpdateRow中也进行汇总计算
        console.log("useUpdateRow触发 - 进行汇总计算");
        calculateAndUpdateTotal();
    }
    )
});