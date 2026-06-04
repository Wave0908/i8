function allReadyEdit() {
    //获取投融资招标预审评估表
    var mstform = Ext.getCmp('p_form0000600070_m');
    //组织设置为只读
    // mstform.getItem('phid_org').userSetReadOnly(true);
    // //审核人设置为不可见
    // // mstform.getItem('checkpsn').setVisible(false);
    // // //录入人设置为不可见
    // // mstform.getItem('fillpsn').setVisible(false);
    // //项目编码设置为只读
    // mstform.getItem('xmbm').userSetReadOnly(true);
    // //项目名称设置为必输
    // mstform.getItem('xmmc').userSetMustInput(true);
    // //标题设置为必输
    // mstform.getItem('title').userSetMustInput(true);
    // //报名开始时间设置为必输
    // mstform.getItem('bmksrq').userSetMustInput(true);
    // //报名截止时间设置为必输
    // mstform.getItem('bmjzrq').userSetMustInput(true);
    // //资审时间设置为必输
    // mstform.getItem('zssj').userSetMustInput(true);
    // //负责人设置为必输
    // mstform.getItem('empid').userSetMustInput(true);
    // //联系方式设置为必输
    // mstform.getItem('lxfs').userSetMustInput(true);
    // //资审结果设置为必输
    // mstform.getItem('zsjg').userSetMustInput(true);
    // //资质要求设置为必输
    // mstform.getItem('zzyq').userSetMustInput(true);
    // //业主名称设置为必输
    // mstform.getItem('yzmc').userSetMustInput(true);
    // //承包方式设置为只读
    // mstform.getItem('cbfs').userSetReadOnly(true);
    // //是否投标保证金为必输
    // mstform.getItem('tbbzj').userSetMustInput(true);
    // //是否投标保证金额隐藏
    // mstform.getItem('amt').setVisible(false) ;
    // //是否投标保证金截止日期隐藏
    // mstform.getItem('tbbzjjzrq').setVisible(false);

    /*根据负责人显示出联系方式 start*/
    //负责人字段通用帮助选择后触发
    mstform.getItem('empid').addListener('helpselected', function () {
        var empid = mstform.getItem('empid').getValue();
        execServer('p_form0000600070_telephone_number', {
            'id': empid
        }, function (res) {
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                mstform.getItem('lxfs').setValue(data1[0].extendObjects.mobile1);
            } else {
                Ext.Msg.alert('提示', '负责人没有使用人的联系电话请输入');
                return false;
            }
        });
    });
    /*根据负责人显示出联系方式 end*/

    //项目名称字段通用帮助选择后触发start

    //项目名称字段帮助窗口选择后触发
    mstform.getItem('xmmc').addListener('helpselected', function () {
        var xmmcPhid = mstform.getItem('xmmc').getValue();
        execServer('p_form0000600070_xmmc', {
            'phid': xmmcPhid
        }, function (res) {
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                mstform.getItem('xmbm').setValue(data1[0].extendObjects.xmbm);
                mstform.getItem('cbfs').setValue(data1[0].extendObjects.cbfs);
                mstform.getItem('zbfs').setValue(data1[0].extendObjects.zbfs);
                mstform.getItem('yzmc').setValue(data1[0].extendObjects.yzmc);
                mstform.getItem('gcdd').setValue(data1[0].extendObjects.gcdd);
                mstform.getItem('empid1').setValue(data1[0].extendObjects.empid1);
                //代码转名称
                BatchBindCombox([
                    mstform.getItem('cbfs'),
                    mstform.getItem('zbfs'),
                    mstform.getItem('yzmc'),
                    mstform.getItem('empid1')
                ]);
            }
        });

    });
    //项目名称字段通用帮助选择后触发end

    /*项目名称字段通用帮助选择前触发 start*/
    //项目名称选择前触发

    mstform.getItem('xmmc').addListener('beforetriggerclick', function () {
        // var pocode = mstform.getItem('phid_org').getValue();
        // mstform.getItem('xmmc').setOutFilter({
        //     'pfm_69.ocode': pocode
        // });
        mstform.getItem('xmmc').setClientSqlFilter(
            "pfm_69.phid_org = " + mstform.getItem('phid_org').getValue()
            +" AND pfm_69.phid NOT IN (SELECT pfm.xmmc FROM p_form0000600070_m pfm) AND pfm_69.sfsyzqxm = '2' AND pfm_69.sfxyzgys = '1' AND pfm_69.app_status = '1'" 
        )
        //pfm_69.phid not in ( select pfm.xmmc from p_form0000600070_m pfm) and pfm_69.sfsyzqxm='2' and pfm_69.sfxyzgys='1' and pfm_69.ischeck='1'
    });
    /*项目名称字段通用帮助选择前触发 end*/

    /*是否投标保证金为是时显示2个字段 不是时隐藏俩字段 start*/
    mstform.getItem('tbbzj').addListener('change', function () {
        var tbbzj = mstform.getItem('tbbzj').getValue();
        tbbzj == '1' ? mstform.getItem('amt').setVisible(true) && mstform.getItem('tbbzjjzrq').setVisible(true) : mstform.getItem('amt').setVisible(false) && mstform.getItem('tbbzjjzrq').setVisible(false)

    });
    /*是否投标保证金为是时显示2个字段 不是时隐藏俩字段 end*/
}

//保存前检测
function beforeSaveEdit() {
    //获取投融资招标预审评估表
    var mstform = Ext.getCmp('p_form0000600070_m');
    var asr_flg = mstform.getItem('asr_flag').getValue();
    if (asr_flg == '1') {
        return true;
    } else {
        NGMsg.Info('请先上传附件');
        return false;
    }

}