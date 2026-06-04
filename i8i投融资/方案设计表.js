$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useBeforeOpen, useDataIndexChange, useUpdateRows, useClick }
) {
    //TODO
    var mstform = $NG.getCmpApi('p_form_fasjbd_m');
    var d1 = $NG.getCmpApi("p_form_fasjbd_d1");
    var d2 = $NG.getCmpApi("p_form_fasjbd_d2");
    var d3 = $NG.getCmpApi("p_form_fasjbd_d3");
    if (editPage.oType == "add") {
        if (d1.getRows().length == 0) {
            setTimeout(() => {
                d1.addRows([
                    { u_cglb: "总平面图（含消防、绿化、屋顶）" },
                    { u_cglb: "单体建筑平/立/剖面图（1:100 / 1:50）" },
                    { u_cglb: "效果图（鸟瞰、单体、夜景等）" },
                    { u_cglb: "SketchUp模型 / 实体模型照片" },
                    { u_cglb: "设计说明书（含绿建、海绵、人防等专篇）" },
                    { u_cglb: "机电系统原理图" },
                    { u_cglb: "主要材料提样（图片+说明）" },
                    { u_cglb: "工程投资估算书" },
                    { u_cglb: "其他（请注明）" }
                ]);

                d2.addRows([
                    { u_zy: "主体结构（≤1800）" },
                    { u_zy: "幕墙工程（≤500）" },
                    { u_zy: "监理单位拒不配合 SPV 公区装修（≤400）" },
                    { u_zy: "景观工程（≤300）" },
                    { u_zy: "是否超限？" }
                ]);

                d3.addRows([
                    { u_gj: "符合《绿色建筑评价标准》GB/T50378-2019" },
                    { u_gj: "满足海绵城市设计要求（下沉绿地、透水铺装等）" },
                    { u_gj: "建筑外立面采用低辐射双钢化中空玻璃+铝板" },
                    { u_gj: "结构抗震设防烈度8度" },
                    { u_gj: "重点设防类（机房/柴发楼）" },
                    { u_gj: "未使用禁用材料，无知识产权风险" },
                    { u_gj: "所有成果满足报建深度要求" }
                ]);

            }, 100);
        }
    }


});
