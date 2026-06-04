//1.入口函数
$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick }
) {
    useAction('onClick')(() => {
        // 改1：url为表单的列表页面
        window.location.href = 'http://192.168.3.241:30599/ngweb/portal/index.html#/sub/formruntime/customform/list?AppTitle=%E4%BA%8C%E6%AC%A1%E7%BB%8F%E8%90%A5%E7%AE%A1%E6%8E%A7%E6%80%9D%E8%B7%AF%E3%80%81%E7%9B%AE%E6%A0%87%E5%8F%8A%E5%88%86%E5%B7%A5&busType=lingbayi&isSso=1&menucode=9265f708-9ce5-3cb2-d8f5-d4267ca4e947';
    }, 'u_libb')
    
    if (editPage.oType == "add") {
        debugger;
        // 改2：表名修改为对应表单表名
        // 第一步，获取原单据的id，通过imp接口信息拿到
        const sourceId = $NG.getPageState().data.p_form_0000000081_m.u_lyxmchzj;
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
                            customBusCode: 'lingbayi',
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
                            u_bb: Number(data.p_form_0000000081_m.u_bb == '' ? 1 : data.p_form_0000000081_m.u_bb) + 1
                        };
                        //console.log('data.p_form_0000000081_m.u_bb:', data.p_form_0000000081_m.u_bb);
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
    if (editPage.oType == "add") {
        var srcjform = $NG.getCmpApi("p_form_0000000081_d");
        if (srcjform.getRows().length == 0) {
            setTimeout(() => {
                srcjform.clearRows();
                srcjform.addRows([
                    { u_ff: "永临结合", u_zz: "项目总工程师", u_xz: "技术人员" },
                    { u_ff: "永临结合", u_zz: "项目总工程师", u_xz: "预算人员" },
                    { u_ff: "永临结合", u_zz: "项目总工程师", u_xz: "材料人员" },
                    { u_ff: "永临结合", u_zz: "项目总工程师", u_xz: "工程人员" },
                    { u_ff: "周转利旧", u_zz: "项目工程经理", u_xz: "工程人员" },
                    { u_ff: "周转利旧", u_zz: "项目工程经理", u_xz: "材料人员" },
                    { u_ff: "设计变更", u_zz: "项目总工程师", u_xz: "技术人员" },
                    { u_ff: "设计变更", u_zz: "项目总工程师", u_xz: "预算人员" },
                    { u_ff: "设计变更", u_zz: "项目总工程师", u_xz: "材料人员" },
                    { u_ff: "设计变更", u_zz: "项目总工程师", u_xz: "工程人员" },
                    { u_ff: "设计变更", u_zz: "项目总工程师", u_xz: "质检安全" },
                    { u_ff: "方案优化", u_zz: "项目总工程师", u_xz: "技术人员" },
                    { u_ff: "方案优化", u_zz: "项目总工程师", u_xz: "预算人员" },
                    { u_ff: "方案优化", u_zz: "项目总工程师", u_xz: "工程人员" },
                    { u_ff: "方案优化", u_zz: "项目总工程师", u_xz: "质检安全" },
                    { u_ff: "材料代换", u_zz: "项目商务经理", u_xz: "技术人员" },
                    { u_ff: "材料代换", u_zz: "项目商务经理", u_xz: "材料人员" },
                    { u_ff: "材料代换", u_zz: "项目商务经理", u_xz: "预算人员" },
                    { u_ff: "精益管控", u_zz: "项目总工程师", u_xz: "技术人员" },
                    { u_ff: "精益管控", u_zz: "项目总工程师", u_xz: "预算人员" },
                    { u_ff: "精益管控", u_zz: "项目总工程师", u_xz: "工程人员" },
                    { u_ff: "精益管控", u_zz: "项目总工程师", u_xz: "质检安全" },
                    { u_ff: "索赔管理", u_zz: "项目总工程师", u_xz: "技术人员" },
                    { u_ff: "索赔管理", u_zz: "项目总工程师", u_xz: "预算人员" },
                    { u_ff: "索赔管理", u_zz: "项目总工程师", u_xz: "工程人员" },
                    { u_ff: "总承包管理", u_zz: "项目商务经理", u_xz: "预算人员" },
                    { u_ff: "总承包管理", u_zz: "项目商务经理", u_xz: "技术人员" },
                    { u_ff: "总承包管理", u_zz: "项目商务经理", u_xz: "质检安全" },
                ]);
            }, 100);
        }
        useValuesChange(({ args }) => {
            var srcjform = $NG.getCmpApi("p_form_0000000081_d");
            srcjform.clearRows();
            setTimeout(() => {
                srcjform.addRows([
                    { u_ff: "永临结合", u_zz: "项目总工程师", u_xz: "技术人员" },
                    { u_ff: "永临结合", u_zz: "项目总工程师", u_xz: "预算人员" },
                    { u_ff: "永临结合", u_zz: "项目总工程师", u_xz: "材料人员" },
                    { u_ff: "永临结合", u_zz: "项目总工程师", u_xz: "工程人员" },
                    { u_ff: "周转利旧", u_zz: "项目工程经理", u_xz: "工程人员" },
                    { u_ff: "周转利旧", u_zz: "项目工程经理", u_xz: "材料人员" },
                    { u_ff: "设计变更", u_zz: "项目总工程师", u_xz: "技术人员" },
                    { u_ff: "设计变更", u_zz: "项目总工程师", u_xz: "预算人员" },
                    { u_ff: "设计变更", u_zz: "项目总工程师", u_xz: "材料人员" },
                    { u_ff: "设计变更", u_zz: "项目总工程师", u_xz: "工程人员" },
                    { u_ff: "设计变更", u_zz: "项目总工程师", u_xz: "质检安全" },
                    { u_ff: "方案优化", u_zz: "项目总工程师", u_xz: "技术人员" },
                    { u_ff: "方案优化", u_zz: "项目总工程师", u_xz: "预算人员" },
                    { u_ff: "方案优化", u_zz: "项目总工程师", u_xz: "工程人员" },
                    { u_ff: "方案优化", u_zz: "项目总工程师", u_xz: "质检安全" },
                    { u_ff: "材料代换", u_zz: "项目商务经理", u_xz: "技术人员" },
                    { u_ff: "材料代换", u_zz: "项目商务经理", u_xz: "材料人员" },
                    { u_ff: "材料代换", u_zz: "项目商务经理", u_xz: "预算人员" },
                    { u_ff: "精益管控", u_zz: "项目总工程师", u_xz: "技术人员" },
                    { u_ff: "精益管控", u_zz: "项目总工程师", u_xz: "预算人员" },
                    { u_ff: "精益管控", u_zz: "项目总工程师", u_xz: "工程人员" },
                    { u_ff: "精益管控", u_zz: "项目总工程师", u_xz: "质检安全" },
                    { u_ff: "索赔管理", u_zz: "项目总工程师", u_xz: "技术人员" },
                    { u_ff: "索赔管理", u_zz: "项目总工程师", u_xz: "预算人员" },
                    { u_ff: "索赔管理", u_zz: "项目总工程师", u_xz: "工程人员" },
                    { u_ff: "总承包管理", u_zz: "项目商务经理", u_xz: "预算人员" },
                    { u_ff: "总承包管理", u_zz: "项目商务经理", u_xz: "技术人员" },
                    { u_ff: "总承包管理", u_zz: "项目商务经理", u_xz: "质检安全" },
                ]);
            }, 100);
        }, "phid_pc");
    } else if (editPage.oType == "edit") {
        var srcjform = $NG.getCmpApi("p_form_0000000081_d");
        if (srcjform.getRows().length == 0) {
            setTimeout(() => {
                srcjform.clearRows();
                srcjform.addRows([
                    { u_ff: "永临结合", u_zz: "项目总工程师", u_xz: "技术人员" },
                    { u_ff: "永临结合", u_zz: "项目总工程师", u_xz: "预算人员" },
                    { u_ff: "永临结合", u_zz: "项目总工程师", u_xz: "材料人员" },
                    { u_ff: "永临结合", u_zz: "项目总工程师", u_xz: "工程人员" },
                    { u_ff: "周转利旧", u_zz: "项目工程经理", u_xz: "工程人员" },
                    { u_ff: "周转利旧", u_zz: "项目工程经理", u_xz: "材料人员" },
                    { u_ff: "设计变更", u_zz: "项目总工程师", u_xz: "技术人员" },
                    { u_ff: "设计变更", u_zz: "项目总工程师", u_xz: "预算人员" },
                    { u_ff: "设计变更", u_zz: "项目总工程师", u_xz: "材料人员" },
                    { u_ff: "设计变更", u_zz: "项目总工程师", u_xz: "工程人员" },
                    { u_ff: "设计变更", u_zz: "项目总工程师", u_xz: "质检安全" },
                    { u_ff: "方案优化", u_zz: "项目总工程师", u_xz: "技术人员" },
                    { u_ff: "方案优化", u_zz: "项目总工程师", u_xz: "预算人员" },
                    { u_ff: "方案优化", u_zz: "项目总工程师", u_xz: "工程人员" },
                    { u_ff: "方案优化", u_zz: "项目总工程师", u_xz: "质检安全" },
                    { u_ff: "材料代换", u_zz: "项目商务经理", u_xz: "技术人员" },
                    { u_ff: "材料代换", u_zz: "项目商务经理", u_xz: "材料人员" },
                    { u_ff: "材料代换", u_zz: "项目商务经理", u_xz: "预算人员" },
                    { u_ff: "精益管控", u_zz: "项目总工程师", u_xz: "技术人员" },
                    { u_ff: "精益管控", u_zz: "项目总工程师", u_xz: "预算人员" },
                    { u_ff: "精益管控", u_zz: "项目总工程师", u_xz: "工程人员" },
                    { u_ff: "精益管控", u_zz: "项目总工程师", u_xz: "质检安全" },
                    { u_ff: "索赔管理", u_zz: "项目总工程师", u_xz: "技术人员" },
                    { u_ff: "索赔管理", u_zz: "项目总工程师", u_xz: "预算人员" },
                    { u_ff: "索赔管理", u_zz: "项目总工程师", u_xz: "工程人员" },
                    { u_ff: "总承包管理", u_zz: "项目商务经理", u_xz: "预算人员" },
                    { u_ff: "总承包管理", u_zz: "项目商务经理", u_xz: "技术人员" },
                    { u_ff: "总承包管理", u_zz: "项目商务经理", u_xz: "质检安全" },
                ]);
            }, 100);
        }
        useValuesChange(({ args }) => {
            var srcjform = $NG.getCmpApi("p_form_0000000081_d");
            srcjform.clearRows();
            setTimeout(() => {
                srcjform.addRows([
                    { u_ff: "永临结合", u_zz: "项目总工程师", u_xz: "技术人员" },
                    { u_ff: "永临结合", u_zz: "项目总工程师", u_xz: "预算人员" },
                    { u_ff: "永临结合", u_zz: "项目总工程师", u_xz: "材料人员" },
                    { u_ff: "永临结合", u_zz: "项目总工程师", u_xz: "工程人员" },
                    { u_ff: "周转利旧", u_zz: "项目工程经理", u_xz: "工程人员" },
                    { u_ff: "周转利旧", u_zz: "项目工程经理", u_xz: "材料人员" },
                    { u_ff: "设计变更", u_zz: "项目总工程师", u_xz: "技术人员" },
                    { u_ff: "设计变更", u_zz: "项目总工程师", u_xz: "预算人员" },
                    { u_ff: "设计变更", u_zz: "项目总工程师", u_xz: "材料人员" },
                    { u_ff: "设计变更", u_zz: "项目总工程师", u_xz: "工程人员" },
                    { u_ff: "设计变更", u_zz: "项目总工程师", u_xz: "质检安全" },
                    { u_ff: "方案优化", u_zz: "项目总工程师", u_xz: "技术人员" },
                    { u_ff: "方案优化", u_zz: "项目总工程师", u_xz: "预算人员" },
                    { u_ff: "方案优化", u_zz: "项目总工程师", u_xz: "工程人员" },
                    { u_ff: "方案优化", u_zz: "项目总工程师", u_xz: "质检安全" },
                    { u_ff: "材料代换", u_zz: "项目商务经理", u_xz: "技术人员" },
                    { u_ff: "材料代换", u_zz: "项目商务经理", u_xz: "材料人员" },
                    { u_ff: "材料代换", u_zz: "项目商务经理", u_xz: "预算人员" },
                    { u_ff: "精益管控", u_zz: "项目总工程师", u_xz: "技术人员" },
                    { u_ff: "精益管控", u_zz: "项目总工程师", u_xz: "预算人员" },
                    { u_ff: "精益管控", u_zz: "项目总工程师", u_xz: "工程人员" },
                    { u_ff: "精益管控", u_zz: "项目总工程师", u_xz: "质检安全" },
                    { u_ff: "索赔管理", u_zz: "项目总工程师", u_xz: "技术人员" },
                    { u_ff: "索赔管理", u_zz: "项目总工程师", u_xz: "预算人员" },
                    { u_ff: "索赔管理", u_zz: "项目总工程师", u_xz: "工程人员" },
                    { u_ff: "总承包管理", u_zz: "项目商务经理", u_xz: "预算人员" },
                    { u_ff: "总承包管理", u_zz: "项目商务经理", u_xz: "技术人员" },
                    { u_ff: "总承包管理", u_zz: "项目商务经理", u_xz: "质检安全" },
                ]);
            }, 100);
        }, "phid_pc");
    }

    useAction("clickHighlight")(function (e) {	//点击时
        var srcjform = $NG.getCmpApi("p_form_0000000081_d");
        var aa = srcjform.getSelectedData()[0];
        console.log("getSelectedData()[0]===", aa);
        if (srcjform.getSelectedData()[0].u_ff == "永临结合") {	//获取主责
            console.log("我是永临结合");
            if (srcjform.getSelectedData()[0].u_xz == "技术人员") {
                //修改提示文字为测试2
                console.log("我是永临结合的技术人员");
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "合理性论证、技术计算、出具施工方案"
                    });
                    console.log("state[2]===", state[2]);
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '合理性论证、技术计算、出具施工方案';
                    }
                });
            }
            if (srcjform.getSelectedData()[0].u_xz == "预算人员") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "核算经济对比分析"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '核算经济对比分析';
                    }
                });
            }
            if (srcjform.getSelectedData()[0].u_xz == "材料人员") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "根据方案对涉及的材料进行询价、采购"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '根据方案对涉及的材料进行询价、采购';
                    }
                });
            }
            if (srcjform.getSelectedData()[0].u_xz == "工程人员") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "根据技术人员的交底，安排分包施工，提供分包商施工的实际情况"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '根据技术人员的交底，安排分包施工，提供分包商施工的实际情况';
                    }
                });
            }
        }
        if (srcjform.getSelectedData()[0].u_ff == "周转利旧") {	//获取主责
            if (srcjform.getSelectedData()[0].u_xz == "工程人员") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "与公司及周边项目沟通调配现有板房等周转物资"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '与公司及周边项目沟通调配现有板房等周转物资';
                    }
                });
            }
            if (srcjform.getSelectedData()[0].u_xz == "材料人员") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "协助工程经理办理调转手续"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '协助工程经理办理调转手续';
                    }
                });
            }
        }
        if (srcjform.getSelectedData()[0].u_ff == "设计变更") {	//获取主责
            if (srcjform.getSelectedData()[0].u_xz == "技术人员") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "合理性论证、技术计算、办理变更"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '合理性论证、技术计算、办理变更';
                    }
                });
            }
            if (srcjform.getSelectedData()[0].u_xz == "预算人员") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "报送经济对比分析，根据变更报送变更组价，对审、结算"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '报送经济对比分析，根据变更报送变更组价，对审、结算';
                    }
                });
            }
            if (srcjform.getSelectedData()[0].u_xz == "材料人员") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "根据变更对涉及的材料进行询价、报送样品，对甲方认价，采购"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '根据变更对涉及的材料进行询价、报送样品，对甲方认价，采购';
                    }
                });
            }
            if (srcjform.getSelectedData()[0].u_xz == "工程人员") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "根据技术人员的交底，安排分包施工，提供分包商施工的实际情况"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '根据技术人员的交底，安排分包施工，提供分包商施工的实际情况';
                    }
                });
            }
            if (srcjform.getSelectedData()[0].u_xz == "质检安全") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "根据变更监督分包商施工质量安全"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '根据变更监督分包商施工质量安全';
                    }
                });
            }
        }
        if (srcjform.getSelectedData()[0].u_ff == "方案优化") {	//获取主责
            if (srcjform.getSelectedData()[0].u_xz == "技术人员") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "合理性论证、技术计算、办理变更"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '合理性论证、技术计算、办理变更';
                    }
                });
            }
            if (srcjform.getSelectedData()[0].u_xz == "预算人员") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "报送经济对比分析；根据变更报送变更组价；对审、结算"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '报送经济对比分析；根据变更报送变更组价；对审、结算';
                    }
                });
            }
            if (srcjform.getSelectedData()[0].u_xz == "工程人员") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "根据技术人员的交底，安排分包施工，提供分包商施工的实际情况"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '根据技术人员的交底，安排分包施工，提供分包商施工的实际情况';
                    }
                });
            }
            if (srcjform.getSelectedData()[0].u_xz == "质检安全") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "根据变更监督分包商施工质量安全"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '根据变更监督分包商施工质量安全';
                    }
                });
            }
        }
        if (srcjform.getSelectedData()[0].u_ff == "材料代换") {	//获取主责
            if (srcjform.getSelectedData()[0].u_xz == "技术人员") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "从质量、安全等角度进行合理性论证、技术计算"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '从质量、安全等角度进行合理性论证、技术计算';
                    }
                });
            }
            if (srcjform.getSelectedData()[0].u_xz == "材料人员") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "根据技术指标对材料进行询价、报送样品、陪同甲方考察，组织供货商对甲方进行围标，对甲方认价、采购"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '根据技术指标对材料进行询价、报送样品、陪同甲方考察，组织供货商对甲方进行围标，对甲方认价、采购';
                    }
                });
            }
            if (srcjform.getSelectedData()[0].u_xz == "预算人员") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "从经济角度对材料代换进行分析，并协助项目经理沟通政府各部门"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '从经济角度对材料代换进行分析，并协助项目经理沟通政府各部门';
                    }
                });
            }
        }
        if (srcjform.getSelectedData()[0].u_ff == "精益管控") {	//获取主责
            if (srcjform.getSelectedData()[0].u_xz == "技术人员") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "制定工序优化、材料管控、分包管理实施方案"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '制定工序优化、材料管控、分包管理实施方案';
                    }
                });
            }
            if (srcjform.getSelectedData()[0].u_xz == "预算人员") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "根据精益管控安排，落实分包合同及分包结算"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '根据精益管控安排，落实分包合同及分包结算';
                    }
                });
            }
            if (srcjform.getSelectedData()[0].u_xz == "工程人员") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "根据技术人员的交底，安排分包施工，提供分包商施工的实际情况"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '根据技术人员的交底，安排分包施工，提供分包商施工的实际情况';
                    }
                });
            }
            if (srcjform.getSelectedData()[0].u_xz == "质检安全") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "根据变更监督分包商施工质量、安全"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '根据变更监督分包商施工质量、安全';
                    }
                });
            }
        }
        if (srcjform.getSelectedData()[0].u_ff == "索赔管理") {	//获取主责
            if (srcjform.getSelectedData()[0].u_xz == "技术人员") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "编制索赔文件，向监理单位报送索赔文件，进行签证"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '编制索赔文件，向监理单位报送索赔文件，进行签证';
                    }
                });
            }
            if (srcjform.getSelectedData()[0].u_xz == "预算人员") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "根据索赔文件进行费用核算，开展费用索赔工作"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '根据索赔文件进行费用核算，开展费用索赔工作';
                    }
                });
            }
            if (srcjform.getSelectedData()[0].u_xz == "工程人员") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "收集索赔证据、提供索赔信息"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '收集索赔证据、提供索赔信息';
                    }
                });
            }
        }
        if (srcjform.getSelectedData()[0].u_ff == "总承包管理") {	//获取主责
            if (srcjform.getSelectedData()[0].u_xz == "预算人员") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "与甲指分包单位协商额外收取总承包管理费；"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '与甲指分包单位协商额外收取总承包管理费';
                    }
                });
            }
            if (srcjform.getSelectedData()[0].u_xz == "技术人员") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "严控分包商方案、资料，确保无质量后患"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '严控分包商方案、资料，确保无质量后患';
                    }
                });
            }
            if (srcjform.getSelectedData()[0].u_xz == "质检安全") {
                //修改提示文字为测试2
                $NG.updateUI((updater, state) => {
                    const gridStore = updater.grid.p_form_0000000081_d.getApi();
                    updater.grid.p_form_0000000081_d.u_gznr.setProps({
                        placeholder: "严控分包商施工质量、安全，倒逼分包妥协上缴管理费"
                    });
                    const targetField = state[2].children[1].children[4];
                    if (targetField.editor) {
                        targetField.editor.placeholder = '严控分包商施工质量、安全，倒逼分包妥协上缴管理费';
                    }
                });
            }
        }
    })

});