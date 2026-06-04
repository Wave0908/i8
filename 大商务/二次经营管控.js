//1.入口函数
$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick }
) {
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
                    console.log("state[2]===",state[2]);
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