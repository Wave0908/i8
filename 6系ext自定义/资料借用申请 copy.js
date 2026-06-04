function allReadyEdit() {
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        var mstform = Ext.getCmp('p_form0000000153_m');
        mstform.getItem('textcol_2').setVisible(false);
        var user_scb_tbjd = mstform.getItem('scb_tbjd'); //投标阶段
        var user_scb_tbxm = mstform.getItem('scb_tbxm'); //投标项目
        mstform.getItem('userhelp_1').addListener('change', function () {
            var id = mstform.getItem('userhelp_1').getValue();
            callServer('st', [{ 'A': id }], function (res) {
                mstform.getItem('xmzt').setValue(res.record[0].stat);
            });


        });
        if (otype == $Otype.ADD) {
            //默认不是黑名单
            mstform.getItem('user_fstb').setValue('01');
            user_scb_tbjd.setReadOnly(true); //字段只读
            user_scb_tbxm.setReadOnly(true); //字段只读
        }
        mstform.getItem('user_fstb').addListener('change', function () {
            var user_fstb = mstform.getItem('user_fstb').getValue();
            if (user_fstb == '02') {
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
            var num = mstform.getItem('ghrq').getValue() - mstform.getItem('jyrq').getValue();
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

