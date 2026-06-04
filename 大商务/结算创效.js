$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick }
) {
    //TODO
    var mstform = $NG.getCmpApi('p_form_0000000088_m');
    console.log("mstform:", mstform);
    var phid_pc = mstform.getValues().phid_pc;
    console.log("phid_pc:", phid_pc);
    $NG.execServer("jxcxdc", {
        pc: phid_pc
    }, function (res) {
        // 添加错误处理
        if (!res || !res.data) {
            console.error("服务器返回数据为空");
            return;
        }
        
        try {
            const data = JSON.parse(res.data);
            console.log("data[0].extendObjects:" + data[0].extendObjects);
            const u_qbjsz = data[0].extendObjects.u_qbjsz;
            const u_lzjsz = data[0].extendObjects.u_lzjsz;
            const u_zrcbmblrl = data[0].extendObjects.u_zrcbmblrl;
            //项目公司、投资概算
            $NG.updateState((updater) => {
                updater.data.p_form_0000000088_m.setProps({
                    u_qbjsz: u_qbjsz,
                    u_lzjsz: u_lzjsz,
                    u_zrcbmblrl: u_zrcbmblrl,
                });
            });
        } catch (error) {
            console.error("JSON 解析错误:", error);
            console.error("原始数据:", res.data);
        }
    });
});