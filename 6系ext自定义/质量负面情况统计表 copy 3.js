function allReadyEdit() {
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        var mstform = Ext.getCmp('p_form0000700527_m');
        var dgrid = Ext.getCmp('p_form0000700527_d');

        // 表单验证函数
        function validateForm(requiredFields) {
            for (var field in requiredFields) {
                if (Ext.isEmpty(mstform.getItem(field).getValue())) {
                    Ext.Msg.alert('提示', requiredFields[field]);
                    return false;
                }
            }
            return true;
        }

        // 检查数据是否已存在
        function checkExistingData(params, isProject) {
            var serverMethod = isProject ? 'p_form0000700527_exist_pc' : 'p_form0000700527_exist';
            execServer(serverMethod, params, function (res) {
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    if (data.length != 0) {
                        Ext.Msg.alert('提示', '请不要重复上报！');
                        mstform.getItem('u_yf').setValue('');
                    }
                }
            });
        }

        // 处理组织机构变更
        function handleOrgChange(isHeadOffice) {
            mstform.getItem('phid_pc').userSetReadOnly(!isHeadOffice);
            mstform.getItem('phid_pc').userSetMustInput(isHeadOffice);
        }

        // 月份选择前验证
        mstform.getItem('u_yf').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
            return validateForm({
                'u_nf': '请先输入年份',
                'phid_org': '请先选择组织',
                'phid_pc': '请先选择项目'
            });
        });

        // 组织选择前验证
        mstform.getItem('phid_org').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
            return validateForm({
                'u_nf': '请先输入年份',
                'phid_pc': '请先选择项目'
            });
        });

        // 月份变更处理
        mstform.getItem('u_yf').addListener('change', function () {
            var isHeadOffice = mstform.getItem('phid_org').getValue() == "324191209000001";
            handleOrgChange(isHeadOffice);

            if (!validateForm({'u_nf': '请先输入年份'})) {
                return;
            }

            var params = {
                'nf': mstform.getItem('u_nf').getValue(),
                'yf': mstform.getItem('u_yf').getValue()
            };

            if (isHeadOffice) {
                params.pc = mstform.getItem('phid_pc').getValue();
                if (params.pc && params.nf && params.yf) {
                    checkExistingData(params, true);
                }
            } else {
                params.ocode = mstform.getItem('phid_org').getValue();
                if (params.ocode && params.nf && params.yf) {
                    checkExistingData(params, false);
                }
            }
        });

        // 组织机构变更处理
        mstform.getItem('phid_org').addListener('change', function () {
            var isHeadOffice = mstform.getItem('phid_org').getValue() == "324191209000001";
            handleOrgChange(isHeadOffice);

            // 重新绑定月份变更事件
            mstform.getItem('u_yf').addListener('change', function () {
                if (!validateForm({'u_nf': '请先输入年份'})) {
                    return;
                }

                var params = {
                    'nf': mstform.getItem('u_nf').getValue(),
                    'yf': mstform.getItem('u_yf').getValue()
                };

                if (isHeadOffice) {
                    params.pc = mstform.getItem('phid_pc').getValue();
                    if (params.pc && params.nf && params.yf) {
                        checkExistingData(params, true);
                    }
                } else {
                    params.ocode = mstform.getItem('phid_org').getValue();
                    if (params.ocode && params.nf && params.yf) {
                        checkExistingData(params, false);
                    }
                }
            });
        });
    }
}
