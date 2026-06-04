function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700177_m');

    mstform.getItem('phid_pc').addListener('helpselected', function (res) {
        console.log("res.data:", res.data);
        var pc = res.data.Pc
        execServer('p_form0000700177_xmx', { 'pc': pc }, function (res) {
            if (res.count > 0) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                mstform.getItem('u_dw').setValue(data[0].extendObjects.oname);
                mstform.getItem('u_jzgm').setValue(data[0].extendObjects.type_name);
                mstform.getItem('u_xmgm').setValue(data[0].extendObjects.numericcol_1);
                mstform.getItem('u_xmzt').setValue(data[0].extendObjects.descript);
            }

        });
    });

    mstform.getItem('u_anguid').addListener('change', function () {
        var anguid = mstform.getItem('u_anguid').getValue();
        var sjpzrs = mstform.getItem('u_sjpzrs').getValue();
        if (anguid - sjpzrs > 1) {
            mstform.getItem('u_wagdpz').setValue(1);
            mstform.getItem('u_cers').setValue(anguid - sjpzrs);
        } else {
            mstform.getItem('u_wagdpz').setValue(0);
            mstform.getItem('u_cers').setValue(0);
        }


    });
    mstform.getItem('u_sjpzrs').addListener('change', function () {

        var anguid = mstform.getItem('u_anguid').getValue();
        var sjpzrs = mstform.getItem('u_sjpzrs').getValue();

        if (anguid - sjpzrs > 1) {
            mstform.getItem('u_wagdpz').setValue(1);
            mstform.getItem('u_cers').setValue(anguid - sjpzrs);
        } else {
            mstform.getItem('u_wagdpz').setValue(0);
            mstform.getItem('u_cers').setValue(0);
        }

    });

    //增加实际国内、国外配置人数字段
    function updatesjpzrs() {
        var sjpzgnrs = parseFloat(mstform.getItem('u_sjpzgnrs').getValue()) || 0;
        var sjpzwjrs = parseFloat(mstform.getItem('u_sjpzwjrs').getValue()) || 0;
        mstform.getItem('u_sjpzrs').setValue(sjpzgnrs + sjpzwjrs);
    }
    mstform.getItem('u_sjpzgnrs').addListener('change', updatesjpzrs);
    mstform.getItem('u_sjpzwjrs').addListener('change', updatesjpzrs);
    // 初始计算一次
    updatesjpzrs();

}