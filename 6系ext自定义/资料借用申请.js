function allReadyEdit() {
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        var mstform = Ext.getCmp('p_form0000000153_m');
        var user_scb_tbjd = mstform.getItem('scb_tbjd'); //投标阶段
        var user_scb_tbxm = mstform.getItem('scb_tbxm'); //投标项目
        mstform.getItem('userhelp_1').addListener('change', function () {
            var id = mstform.getItem('userhelp_1').getValue();
            if (id) {
                execServer('p_form0000000153_st', { 'A': id }, function (res) {
                    if (res.count > 0) {
                        const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        mstform.getItem('xmzt').setValue(data1[0].extendObjects.stat);
                    }
                });
            }

        });
        if (otype == $Otype.ADD) {
            //默认不是黑名单
            mstform.getItem('u_sftb').setValue('01');
            user_scb_tbjd.setReadOnly(true); //字段只读
            user_scb_tbxm.setReadOnly(true); //字段只读
        }
        mstform.getItem('u_sftb').addListener('change', function () {
            var u_sftb = mstform.getItem('u_sftb').getValue();
            if (u_sftb == '02') {
                mstform.getItem('scb_tbjd').userSetMustInput(true); //字段zybh为必输
                mstform.getItem('scb_tbxm').userSetMustInput(true); //字段zymc为必输
                user_scb_tbjd.setReadOnly(false); //字段只读
                user_scb_tbxm.setReadOnly(false); //字段只读
            } else { //否则
                mstform.getItem('scb_tbjd').setValue('');
                mstform.getItem('scb_tbxm').setValue('');
                mstform.getItem('scb_tbjd').userSetMustInput(false); //字段zybh为必输
                mstform.getItem('scb_tbxm').userSetMustInput(false); //字段zymc为必输
                user_scb_tbjd.setReadOnly(true); //字段只读
                user_scb_tbxm.setReadOnly(true); //字段只读
            };
        });
        user_scb_tbxm.on('beforetriggerclick', function () { //帮助窗口打开前事件
            var user_scb_tbjd_val = user_scb_tbjd.getValue();
            if (Ext.isEmpty(user_scb_tbjd_val)) {
                Ext.Msg.alert('提示', '请先选择投标阶段！');
                return false;
            } else {
                var user_scb_tbjd_val = user_scb_tbjd.getValue();
                user_scb_tbxm.setOutFilter({
                    state: user_scb_tbjd_val
                });
            }
        }); //帮助窗口打开前事件结束
        //日期控制
        mstform.getItem('ghrq').addListener('change', function () {
            var jyrq = mstform.getItem('jyrq').getValue();
            if (Ext.isEmpty(jyrq)) {
                Ext.Msg.alert('提示', '请先选择借用日期！');
                mstform.getItem('ghrq').setValue(null);
                return false;
            }
            var num = mstform.getItem('ghrq').getValue() - mstform.getItem('jyrq').getValue();
            console.log("num1:", num);
            num = num / (1000 * 60 * 60 * 24)
            console.log(num)
            if (num > 7) {
                mstform.getItem('ghrq').setValue('');
                Ext.Msg.alert('提示', '借用不能超过7天')
                return false;
            } else {
                return true;
            }
        })
    }
}

