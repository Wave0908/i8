function AllReady() {
    var mstform = Ext.getCmp('AdvanceProject');

    mstform.on('dataready', function () {
        if (mstform.getItem('user_zqxm').getValue() == '0') {
            mstform.getItem('user_zqxm').setValue('0');
        }
    });

    mstform = Ext.getCmp('AdvanceProject');
    mstform.on('dataready', function () {
        if (mstform.getItem('user_sfxyzgys').getValue() == '0') {
            mstform.getItem('user_sfxyzgys').setValue('0');
        }
    });
  
  
    mstform = Ext.getCmp('AdvanceProject');
    mstform.on('dataready', function () {
        if (mstform.getItem('user_zqxm').getValue() == '0') {
            mstform.getItem('user_zqxm').setValue('0');
        }
    });

    //--新增单据数据初始化--//
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        mstform.getItem('user_sfxyzgys').setVisible(false); //需要资格预审隐藏
    }
    mstform.getItem('user_zqxm').addListener('change', function () {
        var user_zqxm = mstform.getItem('user_zqxm').getValue();
        if (user_zqxm == '1') {
            mstform.getItem('user_sfxyzgys').userSetMustInput(false); //字段不必输
            mstform.getItem('user_sfxyzgys').setReadOnly(true); //字段只读
            mstform.getItem('user_sfxyzgys').setVisible(false); //需要资格预审不显示
        } else { //否则
            mstform.getItem('user_sfxyzgys').setVisible(true); //需要资格预审显示
            mstform.getItem('user_sfxyzgys').userSetMustInput(true); //字段必输
            mstform.getItem('user_sfxyzgys').setReadOnly(false); //字段不只读
        };
    });
}

function getSaveDataList(type) {
    var mstform = Ext.getCmp('AdvanceProject');
    if (type == 'Delete') {
        var PcNo = mstform.getItem('PcNo').getValue();
        execServer('bzf', {
            'xmbm': PcNo
        }, function (res) {
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            if(data.length!=0){
                mstform.getItem('user_bzf').setValue(data[0].extendObjects.bzf);
            }
        });
    }
}
