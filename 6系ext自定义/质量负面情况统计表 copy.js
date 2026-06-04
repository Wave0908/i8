function allReadyEdit() {
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        var mstform = Ext.getCmp('p_form0000700527_m');
        var dgrid = Ext.getCmp('p_form0000700527_d');
        console.log('00000000000000000000');
        console.log('phid_org:', mstform.getItem('phid_org').getValue());

        mstform.getItem('u_yf').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
            if (Ext.isEmpty(mstform.getItem('u_nf').getValue())) {
                Ext.Msg.alert('提示', '请先输入年份');
                return false;
            }else if (!mstform.getItem('phid_org').getValue()) {
                Ext.Msg.alert('提示', '请先选择组织');
                return false;
            }else if (Ext.isEmpty(mstform.getItem('phid_pc').getValue())) {
                Ext.Msg.alert('提示', '请先选择项目');
                return false;
            }
        });
        mstform.getItem('phid_org').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
            if (Ext.isEmpty(mstform.getItem('u_nf').getValue())) {
                Ext.Msg.alert('提示', '请先输入年份');
                return false;
            }else if (Ext.isEmpty(mstform.getItem('phid_pc').getValue())) {
                Ext.Msg.alert('提示', '请先选择项目');
                return false;
            }
        });

        mstform.getItem('u_yf').addListener('change', function () {
            if (mstform.getItem('phid_org').getValue() == "324191209000001") {
                mstform.getItem('phid_pc').userSetReadOnly(false);
                mstform.getItem('phid_pc').userSetMustInput(true);
                console.log('11111111111111111111111' + mstform.getItem('u_yf'))
                if (Ext.isEmpty(mstform.getItem('u_nf').getValue())) {
                    Ext.Msg.alert('提示', '请先输入年份');

                }
                var pc = mstform.getItem('phid_pc').getValue();
                var nf = mstform.getItem('u_nf').getValue();
                var yf = mstform.getItem('u_yf').getValue();
                console.log('pc:' + pc);
                console.log('nf:' + nf);
                console.log('yf:' + yf);
                if (pc && nf && yf) {
                    execServer('p_form0000700527_exist_pc', { 'pc': pc, 'nf': nf, 'yf': yf, }, function (res) {//自定义表单数据注册取值赋值，如：callServer('填表单体', [{ 'fxmid': fxmid, 'zzid': zzid }], function (res) {}//多参数逗号分隔\
                        console.log("p_form0000700527_exist_pc res:", res);
                        if (res.count > 0) {
                            const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            console.log("p_form0000700527_exist_pc data1:", data1);
                            if (res.status != 'ok') { //判断取数状态
                                Ext.Msg.alert('提示', '该月份已上报，不要重复上报！');

                            } else if (data1.length != 0) { //判断数组行数
                                console.log('data1.length:', data1.length);
                                Ext.Msg.alert('提示', '请不要重复上报！');
                                mstform.getItem('u_yf').setValue('');

                            }
                        }
                    })
                }

            } else if (mstform.getItem('phid_org').getValue() != "324191209000001") {
                console.log('是你嘛')
                mstform.getItem('phid_pc').userSetReadOnly(true);
                mstform.getItem('phid_pc').userSetMustInput(false);
                mstform.getItem('u_yf').addListener('change', function () {
                    // if (Ext.isEmpty(mstform.getItem('u_nf').getValue())) {
                    //     Ext.Msg.alert('提示', '请先输入年份');

                    // }
                    var ocode = mstform.getItem('phid_org').getValue();
                    var nf = mstform.getItem('u_nf').getValue();
                    var yf = mstform.getItem('u_yf').getValue();
                    console.log('nf1:' + nf);
                    console.log('yf1:' + yf);
                    if (ocode && nf && yf) {
                        execServer('p_form0000700527_exist', { 'ocode': ocode, 'nf': nf, 'yf': yf, }, function (res) {//自定义表单数据注册取值赋值，如：callServer('填表单体', [{ 'fxmid': fxmid, 'zzid': zzid }], function (res) {}//多参数逗号分隔
                            if (res.count > 0) {
                                const data2 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;

                                if (res.status != 'ok') { //判断取数状态
                                    //Ext.Msg.alert('提示', '该月份已上报，不要重复上报！');

                                } else if (data2.length != 0) { //判断数组行数
                                    console.log('data2.length:', data2.length);
                                    Ext.Msg.alert('提示', '请不要重复上报！');
                                    mstform.getItem('u_yf').setValue('');

                                }
                            }
                        })
                    }
                });
            }
        })


        mstform.getItem('phid_org').addListener('change', function () {    //"324191209000001"集团公司
            if (mstform.getItem('phid_org').getValue() == "324191209000001") {
                mstform.getItem('phid_pc').userSetReadOnly(false);
                mstform.getItem('phid_pc').userSetMustInput(true);
                mstform.getItem('u_yf').addListener('change', function () {
                    // if (Ext.isEmpty(mstform.getItem('u_nf').getValue())) {
                    //     Ext.Msg.alert('提示', '请先输入年份');

                    // }
                    var pc = mstform.getItem('phid_pc').getValue();
                    var nf = mstform.getItem('u_nf').getValue();
                    var yf = mstform.getItem('u_yf').getValue();

                    execServer('p_form0000700527_exist_pc', { 'pc': pc, 'nf': nf, 'yf': yf, }, function (res) {//自定义表单数据注册取值赋值，如：callServer('填表单体', [{ 'fxmid': fxmid, 'zzid': zzid }], function (res) {}//多参数逗号分隔
                        if (res.count > 0) {
                            const data3 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            console.log("p_form0000700527_exist_pc data3:", data3);
                            if (res.status != 'ok') { //判断取数状态
                                Ext.Msg.alert('提示', '该月份已上报，不要重复上报！');
                            } else if (data3.length != 0) { //判断数组行数
                                console.log('data3.length:', data3.length);
                                Ext.Msg.alert('提示', '请不要重复上报！');
                                mstform.getItem('u_yf').setValue('');

                            }
                        }
                    })
                });
            } else if (mstform.getItem('phid_org').getValue() != "324191209000001") {
                mstform.getItem('phid_pc').userSetReadOnly(true);
                mstform.getItem('phid_pc').userSetMustInput(false);
                console.log(mstform.getItem('phid_pc'));
                mstform.getItem('u_yf').addListener('change', function () {
                    if (Ext.isEmpty(mstform.getItem('u_nf').getValue())) {
                        Ext.Msg.alert('提示', '请先输入年份');

                    }
                    var ocode = mstform.getItem('phid_org').getValue();
                    var nf = mstform.getItem('u_nf').getValue();
                    var yf = mstform.getItem('u_yf').getValue();

                    execServer('p_form0000700527_exist', { 'ocode': ocode, 'nf': nf, 'yf': yf, }, function (res) {//自定义表单数据注册取值赋值，如：callServer('填表单体', [{ 'fxmid': fxmid, 'zzid': zzid }], function (res) {}//多参数逗号分隔
                        if (res.count > 0) {
                            const data4 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            if (res.status != 'ok') { //判断取数状态

                                //Ext.Msg.alert('提示', '该月份已上报，不要重复上报！');

                            } else if (data4.length != 0) { //判断数组行数
                                console.log('data4.length:', data4.length);
                                Ext.Msg.alert('提示', '请不要重复上报！');
                                mstform.getItem('u_yf').setValue('');

                            }
                        }
                    })
                });
            }
        })


    }

}
