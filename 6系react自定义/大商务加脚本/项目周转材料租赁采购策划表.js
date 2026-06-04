$NG.AllReady(function (editPage, { useAction, useValuesChange, useUpdateRows }) {
    var mstform = $NG.getCmpApi('p_form_0000000075_m');
    var dgrid = $NG.getCmpApi('p_form_0000000075_d');


    if (editPage.oType == "add") {
        debugger;
        // 改2：表名修改为对应表单表名
        // 第一步，获取原单据的id，通过imp接口信息拿到
        const sourceId = $NG.getPageState().data.p_form_0000000075_m.u_lyxmchzj;
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
                            customBusCode: 'lingqiwu',
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
                            u_bb: Number(data.p_form_0000000075_m.u_bb == '' ? 1 : data.p_form_0000000075_m.u_bb) + 1
                        };
                        //console.log('data.p_form_0000000075_m.u_bb:', data.p_form_0000000075_m.u_bb);
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
        const phid_pc = mstform.getValues().phid_pc;
        if (dgrid.getRows().length == 0) {
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
                    updater.data.p_form_0000000075_m.setProps({
                        u_ewcbzb: zzcl_ewdzb
                    });
                });
            });
            /** ====== 引用商务篇第三章材料成本要素二维指标合计值-其中周转材料合约包二维指标合计值  end ====== */

            $NG.execServer("getdthygh_zzcl", { 'pc': phid_pc }, (res) => { //获取动态合约规划-周转材料
                try {
                    // 解析接口返回数据
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;

                    // 判断表格是否为空（根据实际表格API调整）
                    const isGridEmpty = dgrid.getRowCount ? dgrid.getRowCount() === 0 :
                        (dgrid.rows?.length === 0 || !dgrid.rows);
                    console.error('isGridEmpty:', isGridEmpty)

                    // 直接提取接口中的目标字段（已包含u_sgnr等所有字段）
                    const targetData = data?.map(item => {
                        // 从extendObjects中提取所有字段（包括u_sgnr,u_bd等）
                        return {
                            ...item.extendObjects,
                            u_dw_EXName: item.extendObjects.u_dw_exname
                        };
                    }) || [];

                    // 清空表格并添加数据（保持顺序，如需反转可加.reverse()）
                    //                if (dgrid.clear) dgrid.clear(); // 清空现有数据
                    dgrid.addRows(targetData); // 直接添加，字段自动对应表格

                    console.log('表格数据加载完成，字段自动映射');
                } catch (error) {
                    console.error('数据处理失败:', error);
                }
            });
        }
    } else if (editPage.oType == "edit") {
        const phid_pc = mstform.getValues().phid_pc;
        if (dgrid.getRows().length == 0) {
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
                    updater.data.p_form_0000000075_m.setProps({
                        u_ewcbzb: zzcl_ewdzb
                    });
                });
            });
            /** ====== 引用商务篇第三章材料成本要素二维指标合计值-其中周转材料合约包二维指标合计值  end ====== */

            $NG.execServer("getdthygh_zzcl", { 'pc': phid_pc }, (res) => { //获取动态合约规划-周转材料
                try {
                    // 解析接口返回数据
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;

                    // 判断表格是否为空（根据实际表格API调整）
                    const isGridEmpty = dgrid.getRowCount ? dgrid.getRowCount() === 0 :
                        (dgrid.rows?.length === 0 || !dgrid.rows);
                    console.error('isGridEmpty:', isGridEmpty)

                    // 直接提取接口中的目标字段（已包含u_sgnr等所有字段）
                    const targetData = data?.map(item => {
                        // 从extendObjects中提取所有字段（包括u_sgnr,u_bd等）
                        return {
                            ...item.extendObjects,
                            u_dw_EXName: item.extendObjects.u_dw_exname
                        };
                    }) || [];

                    // 清空表格并添加数据（保持顺序，如需反转可加.reverse()）
                    //                if (dgrid.clear) dgrid.clear(); // 清空现有数据
                    dgrid.addRows(targetData); // 直接添加，字段自动对应表格

                    console.log('表格数据加载完成，字段自动映射');
                } catch (error) {
                    console.error('数据处理失败:', error);
                }
            });
        }
    } else if (editPage.oType == "view") {

    }

    useValuesChange(({ args }) => {
        const phid_pc = mstform.getValues().phid_pc;

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
                updater.data.p_form_0000000075_m.setProps({
                    u_ewcbzb: zzcl_ewdzb
                });
            });
        });
        /** ====== 引用商务篇第三章材料成本要素二维指标合计值-其中周转材料合约包二维指标合计值  end ====== */


        $NG.execServer("getdthygh_zzcl", { 'pc': phid_pc }, (res) => { //获取动态合约规划-周转材料
            try {
                // 解析接口返回数据
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;

                // 判断表格是否为空（根据实际表格API调整）
                const isGridEmpty = dgrid.getRowCount ? dgrid.getRowCount() === 0 :
                    (dgrid.rows?.length === 0 || !dgrid.rows);
                console.error('isGridEmpty:', isGridEmpty)

                // 直接提取接口中的目标字段（已包含u_sgnr等所有字段）
                const targetData = data?.map(item => {
                    // 从extendObjects中提取所有字段（包括u_sgnr,u_bd等）
                    return {
                        ...item.extendObjects,
                        u_dw_EXName: item.extendObjects.u_dw_exname
                    };
                }) || [];

                // 清空表格并添加数据（保持顺序，如需反转可加.reverse()）
                //                if (dgrid.clear) dgrid.clear(); // 清空现有数据
                dgrid.addRows(targetData); // 直接添加，字段自动对应表格

                console.log('表格数据加载完成，字段自动映射');
            } catch (error) {
                console.error('数据处理失败:', error);
            }
        });
    }, 'phid_pc'); // 监听主表phid_pc字段变化

    useUpdateRows(({ args }) => {
        var sumAmtOri = 0;

        const rows = args[0];
        rows.forEach((items) => {
            if (items.u_gsjz) {
                sumAmtOri += parseFloat(items.u_gsjz);
            }

            //汇总赋值
            $NG.updateState((updater) => {
                updater.data.p_form_0000000075_m.setProps({
                    u_nfscb: sumAmtOri,
                });
            });
        });
    }, "p_form_0000000075_d");



}, function () {
    console.log('列表初始化完成，已准备好直接映射字段');
});