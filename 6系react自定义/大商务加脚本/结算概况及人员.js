$NG.AllReady(function (editPage, { useAction,useValuesChange, useDataIndexChange, useUpdateRows }) {
    var mstform = $NG.getCmpApi('p_form_0000000085_m');  //
    var dgrid = $NG.getCmpApi('p_form_0000000085_d');//获取容器

    useAction('onClick')(() => {
        // 改1：url为表单的列表页面
        window.location.href = 'http://192.168.3.241:30599/ngweb/portal/index.html#/sub/formruntime/customform/list?AppTitle=%E9%A1%B9%E7%9B%AE%E7%BB%93%E7%AE%97%E6%A6%82%E5%86%B5%E8%A1%A8&busType=lingbawu&isSso=1&menucode=9265f708-9ce5-3cb2-d8f5-d4267ca4e947';
    }, 'u_libb')

    if (editPage.oType == "add") {
        debugger;
        // 改2：表名修改为对应表单表名
        // 第一步，获取原单据的id，通过imp接口信息拿到
        const sourceId = $NG.getPageState().data.p_form_0000000085_m.u_lyxmchzj;
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
                            customBusCode: 'lingbawu',
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
                            u_bb: Number(data.p_form_0000000085_m.u_bb == '' ? 1 : data.p_form_0000000085_m.u_bb) + 1
                        };
                        //console.log('data.p_form_0000000085_m.u_bb:', data.p_form_0000000085_m.u_bb);
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

    $NG.updateUI((updater, state) => {
        console.log('updater', updater)
        //表头字段增加提示文字
        updater.fieldSetForm.p_form_0000000085_m.u_jgjslc.setProps({
            placeholder: "从结算书报送开始，经历跟审单位（或监理单位）审核、财评单位施工蓝图预算评审、财政局审计、审计局审计等，按合同约定结算程序或项目性质（私企、投融、政府等），结合实际情况，对具体结算程序及当前已确定的审计单位名称进行描述。"
        });

    });

    if (editPage.oType == "add") {
        const phid_pc = mstform.getValues().phid_pc;
        if (phid_pc) {
            $NG.execServer("getsg_xmgk", { 'id': phid_pc }, (res) => {

                const _data = JSON.parse(res.data)[0].extendObjects
                console.log('_data:', _data);
                $NG.updateState((updater) => {
                    updater.data.p_form_0000000085_m.setProps({
                        u_gcdd: _data.u_project_addr,
                        u_sgfw: _data.u_scope_contract,
                        u_htjjfs: _data.u_pricing_meth,
                        u_xmhte: _data.u_contract_amt,

                        u_jsdw: {
                            value: _data.js_phid,
                            label: _data.js_name,
                        },
                        u_sheji: {
                            value: _data.sj_phid,
                            label: _data.sj_name,
                        },
                        u_jldw: {
                            value: _data.jl_phid,
                            label: _data.jl_name,
                        },
                        u_htkgrq: _data.start_dt,
                        u_htjgrq: _data.end_dt,
                        u_sjkgrq: _data.fact_start_dt,
                        u_yjwgrq: _data.jhjgsj,

                    });

                });

            });
            $NG.execServer("getsw_zrcbxd", { 'id': phid_pc }, (res) => {

                const _data = JSON.parse(res.data)[0].extendObjects
                console.log('_data:', _data);
                $NG.updateState((updater) => {
                    updater.data.p_form_0000000085_m.setProps({
                        u_zrcbmblrl: _data.u_sglrl,


                    });

                });

            });


        }

    }

    useDataIndexChange(({ args, instance }) => {
        useUpdateRows(({ args }) => {
            const rows = args[0];
            console.log('rows:', rows);
            args[0].forEach((item) => {
                computed(item);  //调用函数功能扩展取值
            });
            dgrid.refreshView();
        }, "p_form_0000000085_d");

    }, 'p_form_0000000085_d.u_xm');


    function computed(item) {
        $NG.execServer("getygxx", { ygid: item.u_xm },
            function (res) {
                try {
                    const datas = JSON.parse(res.data)[0].extendObjects;
                    console.log(datas, "datas");
                    item.u_gw = datas.station;
                    item.u_gw_EXName = datas.gw_name;


                    dgrid.refreshView();
                } catch (error) { }
            }
        );
    }

    debugger;
    useValuesChange(({ args }) => {

        const phid_pc = mstform.getValues().phid_pc;
        $NG.execServer("getsg_xmgk", { 'id': phid_pc }, (res) => {

            const _data = JSON.parse(res.data)[0].extendObjects
            console.log('_data:', _data);
            $NG.updateState((updater) => {
                updater.data.p_form_0000000085_m.setProps({
                    u_gcdd: _data.u_project_addr,
                    u_sgfw: _data.u_scope_contract,
                    u_htjjfs: _data.u_pricing_meth,
                    u_xmhte: _data.u_contract_amt,

                    u_jsdw: {
                        value: _data.js_phid,
                        label: _data.js_name,
                    },
                    u_sheji: {
                        value: _data.sj_phid,
                        label: _data.sj_name,
                    },
                    u_jldw: {
                        value: _data.jl_phid,
                        label: _data.jl_name,
                    },
                    u_htkgrq: _data.start_dt,
                    u_htjgrq: _data.end_dt,
                    u_sjkgrq: _data.fact_start_dt,
                    u_yjwgrq: _data.jhjgsj,

                });

            });

        });
        $NG.execServer("getsw_zrcbxd", { 'id': phid_pc }, (res) => {

            const _data = JSON.parse(res.data)[0].extendObjects
            console.log('_data:', _data);
            $NG.updateState((updater) => {
                updater.data.p_form_0000000085_m.setProps({
                    u_zrcbmblrl: _data.u_sglrl,


                });

            });

        });
    }, 'phid_pc');

    debugger;
}, function () {
    console.log('list Ready');
});