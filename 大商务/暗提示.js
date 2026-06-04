$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRows }
) {
    const d1grid = $NG.getCmpApi('p_form_0000000080_d3');
    //暗提示
    //表体不同行设置不同的提示文字
    useAction("clickHighlight")(function (e) {	//点击时

        if (d1grid.getSelectedData()[0].s_tree_name == "印花税") {	//当树名等于印花税时
            $NG.updateUI((updater, state) => {
                const gridStore = updater.grid.p_form_0000000080_d3.getApi();
                updater.grid.p_form_0000000080_d3.u_cssm.setProps({
                    placeholder: "按税前合同总额0.06%（收支类合同各按照0.03%计算）"
                });
                const targetField = state[2].children[2].children[3];
                if (targetField.editor) {
                    targetField.editor.placeholder = '按税前合同总额0.06%（收支类合同各按照0.03%计算）';
                }
            });
        }
        if (d1grid.getSelectedData()[0].s_tree_name == "低值易耗品及煤气其他物料消耗") {	//当树名等于印花税时
            $NG.updateUI((updater, state) => {
                const gridStore = updater.grid.p_form_0000000080_d3.getApi();
                updater.grid.p_form_0000000080_d3.u_cssm.setProps({
                    placeholder: "按合同额手输%"
                });
                const targetField = state[2].children[2].children[3];
                if (targetField.editor) {
                    targetField.editor.placeholder = '按合同额手输%';
                }
            });
        }
        if (d1grid.getSelectedData()[0].s_tree_name == "仪器检测费") {	//当树名等于印花税时
            $NG.updateUI((updater, state) => {
                const gridStore = updater.grid.p_form_0000000080_d3.getApi();
                updater.grid.p_form_0000000080_d3.u_cssm.setProps({
                    placeholder: "按合同额 手输 %"
                });
                const targetField = state[2].children[2].children[3];
                if (targetField.editor) {
                    targetField.editor.placeholder = '按合同额 手输 %';
                }
            });
        }
        if (d1grid.getSelectedData()[0].s_tree_name == "生活区、办公区水电费") {	//当树名等于印花税时
            $NG.updateUI((updater, state) => {
                const gridStore = updater.grid.p_form_0000000080_d3.getApi();
                updater.grid.p_form_0000000080_d3.u_cssm.setProps({
                    placeholder: "全部施工现场住宿的按合同额的手输%"
                });
                const targetField = state[2].children[2].children[3];
                if (targetField.editor) {
                    targetField.editor.placeholder = '全部施工现场住宿的按合同额的手输%';
                }
            });
        }
        if (d1grid.getSelectedData()[0].s_tree_name == "建设工程交易服务费") {	//当树名等于印花税时
            $NG.updateUI((updater, state) => {
                const gridStore = updater.grid.p_form_0000000080_d3.getApi();
                updater.grid.p_form_0000000080_d3.u_cssm.setProps({
                    placeholder: "EPC总承包合同招标咨询费等"
                });
                const targetField = state[2].children[2].children[3];
                if (targetField.editor) {
                    targetField.editor.placeholder = 'EPC总承包合同招标咨询费等';
                }
            });
        }
        if (d1grid.getSelectedData()[0].s_tree_name == "招标代理费") {	//当树名等于印花税时
            $NG.updateUI((updater, state) => {
                const gridStore = updater.grid.p_form_0000000080_d3.getApi();
                updater.grid.p_form_0000000080_d3.u_cssm.setProps({
                    placeholder: "设备招标代理费按《招标代理业务收费管理暂行办法》国家计委1980号文件0.5%执行"
                });
                const targetField = state[2].children[2].children[3];
                if (targetField.editor) {
                    targetField.editor.placeholder = '设备招标代理费按《招标代理业务收费管理暂行办法》国家计委1980号文件0.5%执行';
                }
            });
        }
        if (d1grid.getSelectedData()[0].s_tree_name == "专家评审费、论证费") {	//当树名等于印花税时
            $NG.updateUI((updater, state) => {
                const gridStore = updater.grid.p_form_0000000080_d3.getApi();
                updater.grid.p_form_0000000080_d3.u_cssm.setProps({
                    placeholder: "深基坑、超高支撑专家论证费等"
                });
                const targetField = state[2].children[2].children[3];
                if (targetField.editor) {
                    targetField.editor.placeholder = '深基坑、超高支撑专家论证费等';
                }
            });
        }
        if (d1grid.getSelectedData()[0].s_tree_name == "项目用车消耗") {	//当树名等于印花税时
            $NG.updateUI((updater, state) => {
                const gridStore = updater.grid.p_form_0000000080_d3.getApi();
                updater.grid.p_form_0000000080_d3.u_cssm.setProps({
                    placeholder: "一类项目：手输元/月；交工结算期按50%考虑(上述金额含项目经理用车手输元/月)；"
                });
                const targetField = state[2].children[2].children[3];
                if (targetField.editor) {
                    targetField.editor.placeholder = '一类项目：手输元/月；交工结算期按50%考虑(上述金额含项目经理用车手输元/月)；';
                }
            });
        }
        if (d1grid.getSelectedData()[0].s_tree_name == "业务招待费") {	//当树名等于印花税时
            $NG.updateUI((updater, state) => {
                const gridStore = updater.grid.p_form_0000000080_d3.getApi();
                updater.grid.p_form_0000000080_d3.u_cssm.setProps({
                    placeholder: "按合同额手输 %"
                });
                const targetField = state[2].children[2].children[3];
                if (targetField.editor) {
                    targetField.editor.placeholder = '按合同额手输 %';
                }
            });
        }
        
        
    }, "p_form_0000000080_d3");
});
