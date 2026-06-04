function allReadyEdit() {
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        var mstform = Ext.getCmp('p_form0000700527_m');
        var dgrid = Ext.getCmp('p_form0000700527_d');
        mstform.on('dataready', function (e) {
            var isHeadOffice = mstform.getItem('phid_org').getValue() == "324191209000001";

            // 设置项目字段状态
            mstform.getItem('phid_pc').userSetReadOnly(!isHeadOffice);
            mstform.getItem('phid_pc').userSetMustInput(isHeadOffice);
        })
        // 月份选择前验证
        mstform.getItem('u_yf').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
            if (Ext.isEmpty(mstform.getItem('u_nf').getValue())) {
                Ext.Msg.alert('提示', '请先输入年份');
                return false;
            } else if (!mstform.getItem('phid_org').getValue()) {
                Ext.Msg.alert('提示', '请先选择组织');
                return false;
            } else if (mstform.getItem('phid_org').getValue() == "324191209000001" && Ext.isEmpty(mstform.getItem('phid_pc').getValue())) {
                Ext.Msg.alert('提示', '请先选择项目');
                return false;
            }
            return true;
        });

        // 组织选择前验证
        mstform.getItem('phid_org').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
            if (Ext.isEmpty(mstform.getItem('u_nf').getValue())) {
                Ext.Msg.alert('提示', '请先输入年份');
                return false;
            } 
            return true;
        });

        // 月份变更处理
        mstform.getItem('u_yf').addListener('change', function () {
            var isHeadOffice = mstform.getItem('phid_org').getValue() == "324191209000001";

            // 设置项目字段状态
            mstform.getItem('phid_pc').userSetReadOnly(!isHeadOffice);
            mstform.getItem('phid_pc').userSetMustInput(isHeadOffice);

            var nf = mstform.getItem('u_nf').getValue();
            var yf = mstform.getItem('u_yf').getValue();

            if (isHeadOffice) {
                var pc = mstform.getItem('phid_pc').getValue();
                if (pc && nf && yf) {
                    execServer('p_form0000700527_exist_pc', { 'pc': pc, 'nf': nf, 'yf': yf }, function (res) {
                        if (res.count > 0) {
                            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            if (data.length != 0) {
                                Ext.Msg.alert('提示', '请不要重复上报！');
                                mstform.getItem('u_yf').setValue('');
                            }
                        }
                    });
                }
            } else {
                var ocode = mstform.getItem('phid_org').getValue();
                if (ocode && nf && yf) {
                    execServer('p_form0000700527_exist', { 'ocode': ocode, 'nf': nf, 'yf': yf }, function (res) {
                        if (res.count > 0) {
                            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            if (data.length != 0) {
                                Ext.Msg.alert('提示', '请不要重复上报！');
                                mstform.getItem('u_yf').setValue('');
                            }
                        }
                    });
                }
            }
        });

        // 组织机构变更处理
        mstform.getItem('phid_org').addListener('change', function () {
            var isHeadOffice = mstform.getItem('phid_org').getValue() == "324191209000001";

            // 设置项目字段状态
            mstform.getItem('phid_pc').userSetReadOnly(!isHeadOffice);
            mstform.getItem('phid_pc').userSetMustInput(isHeadOffice);

            // 重新绑定月份变更事件
            mstform.getItem('u_yf').addListener('change', function () {
                if (Ext.isEmpty(mstform.getItem('u_nf').getValue())) {
                    Ext.Msg.alert('提示', '请先输入年份');
                    return;
                }

                var nf = mstform.getItem('u_nf').getValue();
                var yf = mstform.getItem('u_yf').getValue();

                if (isHeadOffice) {
                    var pc = mstform.getItem('phid_pc').getValue();
                    if (pc && nf && yf) {
                        execServer('p_form0000700527_exist_pc', { 'pc': pc, 'nf': nf, 'yf': yf }, function (res) {
                            if (res.count > 0) {
                                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                                if (data.length != 0) {
                                    Ext.Msg.alert('提示', '请不要重复上报！');
                                    mstform.getItem('u_yf').setValue('');
                                }
                            }
                        });
                    }
                } else {
                    var ocode = mstform.getItem('phid_org').getValue();
                    if (ocode && nf && yf) {
                        execServer('p_form0000700527_exist', { 'ocode': ocode, 'nf': nf, 'yf': yf }, function (res) {
                            if (res.count > 0) {
                                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                                if (data.length != 0) {
                                    Ext.Msg.alert('提示', '请不要重复上报！');
                                    mstform.getItem('u_yf').setValue('');
                                }
                            }
                        });
                    }
                }
            });
        });
    }
}
