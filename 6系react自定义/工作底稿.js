$NG.AllReady(function () {
    console.log('详情页加载完成');
}, function () {
    console.log('编辑页加载完成');
});
//1.入口函数
$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick }
) {
    //2.获取容器
    var mstform = $NG.getCmpApi("p_form_sjb_esrsjgzdg_m");


    if (editPage.oType == "add" || editPage.oType == "edit") {
        useValuesChange(({ args }) => {
            console.log(args[0]);
            const u_scxmmc = args[0].u_scxmmc?.value; // 获取u_scxmmc字段的实际值
            if (u_scxmmc) {
                console.log(u_scxmmc);
                $NG.execServer('p_form_sjb_esrsjgzdg_csxmmc', { fphid: u_scxmmc }, function (res) {
                    console.log("res:", res);
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    if (res.count > 0) {
                        const xmmc = data[0].extendObjects.u_xmmc;
                        $NG.updateState((updater) => {
                            updater.data.p_form_sjb_esrsjgzdg_m.setProps({
                                u_sjsx: xmmc + ' - ' + '分包竣工结算'
                            });
                        });
                    }
                });
            }
        }, "p_form_sjb_esrsjgzdg_m.u_scxmmc"); // 修改为监听u_scxmmc字段变化
    }
});