// 新增具体分工表的数据时自动带出
$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick }
) {
    console.log('detail Ready');
    var srcjform = $NG.getCmpApi("p_form_0000000081_d");
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
        { u_ff: "材料代换", u_zz: "项目商务经理", u_xz: "预算人员" },
        { u_ff: "材料代换", u_zz: "项目商务经理", u_xz: "材料人员" },
        { u_ff: "精益管控", u_zz: "项目总工程师", u_xz: "技术人员" },
        { u_ff: "精益管控", u_zz: "项目总工程师", u_xz: "预算人员" },
        { u_ff: "精益管控", u_zz: "项目总工程师", u_xz: "工程人员" },
        { u_ff: "精益管控", u_zz: "项目总工程师", u_xz: "质检安全" },
        { u_ff: "索赔管理", u_zz: "项目总工程师", u_xz: "技术人员" },
        { u_ff: "索赔管理", u_zz: "项目总工程师", u_xz: "预算人员" },
        { u_ff: "索赔管理", u_zz: "项目总工程师", u_xz: "材料人员" },
        { u_ff: "总承包管理", u_zz: "项目商务经理", u_xz: "预算人员" },
        { u_ff: "总承包管理", u_zz: "项目商务经理", u_xz: "技术人员" },
        { u_ff: "总承包管理", u_zz: "项目商务经理", u_xz: "质检安全" },
    ]);
}, function () {
    console.log('list Ready');
});