/**第四章  分包成本控制策划*/
$NG.AllReady(function (editPage, { useValuesChange, useUpdateRows }) {
    var mstform = $NG.getCmpApi('p_form_0000000072_m');
    var dgrid = $NG.getCmpApi('p_form_0000000072_d1');
    if (editPage.oType == "add" || editPage.oType == "edit") {
        if (dgrid.getRows().length == 0) {
            const phid_pc = mstform.getValues().phid_pc;
            console.log("phid_pc=====================>", phid_pc)
            /**引入第三章劳务分包、专业分包明细和施工篇明细 start=====================> */
            $NG.execServer("dcxmfbcbkzb", { 'pc': phid_pc }, (res) => {
                //console.log("res:", res);
                //console.log("data:", res.data)
                try {
                    // 解析接口返回数据
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;

                    // 判断表格是否为空（根据实际表格API调整）
                    const isGridEmpty = dgrid.getRowCount ? dgrid.getRowCount() === 0 :
                        (dgrid.rows?.length === 0 || !dgrid.rows);
                    console.log('isGridEmpty:', isGridEmpty)

                    //插入根节点
                    if (isGridEmpty) {
                        dgrid.addRows({
                            s_tree_name: '工程分包类',
                            s_tree_no: '02',
                            s_tree_id:'02',                   
                            s_tree_pid:'0'
                        })
                        dgrid.addRows({
                            s_tree_name: '劳务分包类',
                            s_tree_no: '01',
                            s_tree_id:'01',
                            s_tree_pid:'0'
                        })
                    }
                    dgrid.updateRow();
                    console.log("dgrid:",dgrid);
                    const dstore = dgrid.getStore();
                    console.log("store:",dstore);

                    console.log("getAllDataForNew:",dgrid.getAllDataForNew());
                    const rows = $NG.getCmpApi('p_form_0000000072_d1').getRows();
                    // console.log("count:",$NG.getCmpApi('p_form_0000000072_d1').getRowCount);
                    //console.log('rows:', rows)

                    // console.log("data:", data)
                    

                    // 直接提取接口中的目标字段（已包含u_sgnr等所有字段）
                    const targetData = data?.map(item => {
                        // 从extendObjects中提取所有字段（包括u_sgnr,u_bd等）
                        return { ...item.extendObjects };
                    }) || [];
                    console.log("targetData:",targetData);

                    // // 清空表格并添加数据（保持顺序，如需反转可加.reverse()）
                    // //                if (dgrid.clear) dgrid.clear(); // 清空现有数据
                    // dgrid.addRows(targetData); // 直接添加，字段自动对应表格

                    // console.log('表格数据加载完成，字段自动映射');
                } catch (error) {
                    console.error('数据处理失败:', error);
                }
            });
            /**引入第三章劳务分包、专业分包明细和施工篇明细 end=====================> */

            /**引入第三章劳务分包、专业分包的二维度指标值并合计赋值到 分包二维成本指标 start=====================> */
            $NG.execServer("jhcbewdzblwzyfb", { 'pc': phid_pc }, (res) => {
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
                const lwfb_ewdzb = getSafeValue(0); // 劳务分包
                const zyfb_ewdzb = getSafeValue(1); // 专业分包

                console.log("lwfb_ewdzb =", lwfb_ewdzb);
                console.log("zyfb_ewdzb =", zyfb_ewdzb);

                // 计算总和
                const u_fbewcbzb = lwfb_ewdzb + zyfb_ewdzb;

                // 汇总赋值
                $NG.updateState((updater) => {
                    updater.data.p_form_0000000072_m.setProps({
                        u_fbewcbzb: u_fbewcbzb
                    });
                });
            });
            /**引入第三章劳务分包、专业分包的二维度指标值并合计赋值到 分包二维成本指标 end=====================> */
        }
    }

    useValuesChange(({ args }) => {
        const phid_pc = mstform.getValues().phid_pc;
        console.log("phid_pc=====================>", phid_pc)
        /**引入第三章劳务分包、专业分包明细和施工篇明细 start=====================> */
        $NG.execServer("get_sg_fbjh", { 'pc': phid_pc }, (res) => {
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
                    return { ...item.extendObjects };
                }) || [];

                // 清空表格并添加数据（保持顺序，如需反转可加.reverse()）
                //                if (dgrid.clear) dgrid.clear(); // 清空现有数据
                dgrid.clearRows();
                dgrid.addRows(targetData); // 直接添加，字段自动对应表格

                console.log('表格数据加载完成，字段自动映射');
            } catch (error) {
                console.error('数据处理失败:', error);
            }
        });
        /**引入第三章劳务分包、专业分包明细和施工篇明细 end=====================> */

        /**引入第三章劳务分包、专业分包的二维度指标值并合计赋值到 分包二维成本指标 start=====================> */
        $NG.execServer("jhcbewdzblwzyfb", { 'pc': phid_pc }, (res) => {
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;

            const lwfb_ewdzb = data[0].extendObjects.u_ewdzb;
            const zyfb_ewdzb = data[1].extendObjects.u_ewdzb;

            const u_fbewcbzb = (parseFloat(lwfb_ewdzb) || 0) + (parseFloat(zyfb_ewdzb) || 0)
            //汇总赋值
            $NG.updateState((updater) => {
                updater.data.p_form_0000000072_m.setProps({
                    u_fbewcbzb: u_fbewcbzb
                });
            });
        });
        /**引入第三章劳务分包、专业分包的二维度指标值并合计赋值到 分包二维成本指标 end=====================> */
    }, 'phid_pc'); // 监听主表phid_pc字段变化

    // 汇总 ‘二维指标’ 值 赋值到 ‘项目部拟发生成本’
    useUpdateRows(({ args }) => {
        var sumAmtOri = 0;
        const rows = args[0];
        rows.forEach((items) => {
            sumAmtOri += (parseFloat(items.u_ewzb) || 0);

            //汇总赋值
            $NG.updateState((updater) => {
                updater.data.p_form_0000000072_m.setProps({
                    u_nfscb: sumAmtOri,
                });
            });
        });
    }, "p_form_0000000072_d1");

}, function () {
    console.log('列表初始化完成，已准备好直接映射字段');
});