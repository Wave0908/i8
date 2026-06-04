//1.入口函数
$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useBeforeOpen, addRow, useBeforeClick, useUpdateRows, useClick }
) {
    //TODO
    var mstform = $NG.getCmpApi("p_form_liangjinxiangmuwen_m");
    //var toolbar = $NG.getCmpApi("toolbar_top"); //表单布局不同，可能有差别，f12用选择器去看
    if (editPage.oType == "add" || editPage.oType == "edit") {
        //选择完两金项目带出信息
        useValuesChange(({ args, form }) => {
            console.log(args[0]);
            const u_ljxm = args[0].u_ljxm.value;
            //从项目取值
            if (u_ljxm) {
                console.log('u_ljxm:', u_ljxm);
                //从项目取值
                //ljsrht
                $NG.execServer("liangjinxiangmu", { phid: u_ljxm }, function (res) {
                    console.log("res:", res);
                    if (res.count > 0) {
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        console.log("data:", data)
                        const phid_pc = data[0].extendObjects.phid_pc;
                        const phid_pc_exname = data[0].extendObjects.phid_pc_exname;
                        const u_tongjizhouqi = data[0].extendObjects.u_tongjizhouqi;
                        const u_tongjizhouqi_exname = data[0].extendObjects.u_tongjizhouqi_exname;
                        const u_yjjssj = data[0].extendObjects.u_yjjssj1 ? data[0].extendObjects.u_yjjssj1 : data[0].extendObjects.u_yjjssj2;
                        const u_yjjsje = data[0].extendObjects.u_yjjsje1 ? data[0].extendObjects.u_yjjsje1 : data[0].extendObjects.u_yjjsje2;
                        const u_xmjlxm = data[0].extendObjects.u_xmjlxm;
                        const u_xmjlxm_exname = data[0].extendObjects.u_xmjlxm_exname;
                        const u_xmjldh = data[0].extendObjects.u_xmjldh;
                        const ajxx = data[0].extendObjects.ajxx;
                        const u_sswtms = data[0].extendObjects.u_sswtms;
                        const u_sswtms1 = data[0].extendObjects.u_sswtms1;
                        const u_qssj = data[0].extendObjects.u_qssj;
                        const u_sfyss = data[0].extendObjects.u_sfyss;
                        var u_sfss = 0;
                        var sswtms = '';
                        if (ajxx) {
                            u_sfss = 1;
                            //是否诉讼，如果为是，诉讼是否需要诉讼和需要诉讼原因不能填报
                            // mstform.getItem("u_sfxyss").setProps({
                            //     required: false, //required是否必输
                            //     hidden: true
                            // });
                            mstform.getItem("u_qssj").setProps({
                                required: false, //required是否必输
                                hidden: false
                            });
                            mstform.getItem("u_sfyss").setProps({
                                required: false, //required是否必输
                                hidden: false
                            });
                            mstform.getItem("u_sswtms").setProps({
                                required: false, //required是否必输
                                hidden: false
                            });
                        } else {
                            // mstform.getItem("u_sfxyss").setProps({
                            //     required: true, //required是否必输
                            //     hidden: false
                            // });
                            mstform.getItem("u_qssj").setProps({
                                required: false, //required是否必输
                                hidden: true
                            });
                            mstform.getItem("u_sfyss").setProps({
                                required: false, //required是否必输
                                hidden: true
                            });
                            mstform.getItem("u_sswtms").setProps({
                                required: false, //required是否必输
                                hidden: true
                            });
                        }
                        if (u_sswtms) {
                            sswtms = u_sswtms;
                        } else {
                            sswtms = u_sswtms1;
                        }

                        const u_sjjssj = data[0].extendObjects.u_sjjssj;
                        if (u_sjjssj) {
                            mstform.getItem("u_jssfwjfcrzs").setProps({
                                required: true, //required是否必输
                                hidden: false
                            });
                        }else{
                            mstform.getItem("u_jssfwjfcrzs").setProps({
                                required: false, //required是否必输
                                hidden: true
                            });
                        }

                        $NG.updateState((updater) => {
                            updater.data.p_form_liangjinxiangmuwen_m.setProps({
                                phid_pc: phid_pc,
                                phid_pc_EXName: phid_pc_exname,
                                u_tongjizhouqi: u_tongjizhouqi,
                                u_tongjizhouqi_EXName: u_tongjizhouqi_exname,
                                //u_yjjssj: u_yjjssj,   //11.27 改为手填
                                u_yjjsje: u_yjjsje,
                                u_xmjlxm: u_xmjlxm,
                                u_xmjlxm_EXName: u_xmjlxm_exname,
                                u_xmjldh: u_xmjldh,
                                u_sfss: u_sfss,
                                u_sswtms: sswtms,
                                u_qssj: u_qssj,
                                u_sfyss: u_sfyss,
                                u_sjjssj: u_sjjssj
                            });
                        });
                    }
                });
            }
        }, "p_form_liangjinxiangmuwen_m.u_ljxm");
        //清收责任人选择完带出信息
        useValuesChange(({ args, form }) => {
            console.log(args[0]);
            const u_qszrrxm = args[0].u_qszrrxm.value;
            //从项目取值
            if (u_qszrrxm) {
                console.log('u_qszrrxm:', u_qszrrxm);
                //从项目取值
                //ljsrht
                $NG.execServer("qszrr", { phid: u_qszrrxm }, function (res) {
                    console.log("res:", res);
                    if (res.count > 0) {
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        console.log("data:", data)
                        const u_qszrrgw = data[0].extendObjects.u_qszrrgw;
                        const u_qszrrgw_exname = data[0].extendObjects.u_qszrrgw_exname;
                        const u_qszrrdh = data[0].extendObjects.u_qszrrdh;

                        $NG.updateState((updater) => {
                            updater.data.p_form_liangjinxiangmuwen_m.setProps({
                                u_qszrrgw: u_qszrrgw,
                                u_qszrrgw_EXName: u_qszrrgw_exname,
                                u_qszrrdh: u_qszrrdh,
                            });
                        });
                    }
                });
            }
        }, "p_form_liangjinxiangmuwen_m.u_qszrrxm");
    }
});