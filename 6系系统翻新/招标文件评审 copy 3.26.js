function AllReady() {
    //var mstform = Ext.getCmp('Tend_Eval'); //工程建设
    var mstform = Ext.getCmp('TendEval'); //工程建设
    document.getElementsByTagName('fieldset')[3].style.visibility = 'hidden'
    //mstform.getItem ('user_sfwzikbh').setVisible(false);
    //mstform.getItem ('user_sfwzikbh').userSetMustInput(false); 
    mstform.getItem('user_jbr').setVisible(false);
    mstform.getItem('user_syrmc').setVisible(false);
    mstform.getItem('user_bhzl').setVisible(false);
    mstform.getItem('user_bhdqrq').setVisible(false);
    mstform.getItem('user_bhje').setVisible(false);
    mstform.getItem('user_bz').setVisible(false);
    mstform.getItem('user_zbpsfjqx').setVisible(false);
    mstform.getItem('user_sqsy').setVisible(false);
    /*
    if (otype == $Otype.ADD || otype == $Otype.EDIT){
        mstform.getItem('user_sfwzkbh').addListener('changed', function() {
            if(mstform.getItem('user_sfwzkbh').getValue() == '1'){
                mstform.getItem('user_sfwzikbh').setVisible(true);
                mstform.getItem('user_sfwzikbh').userSetMustInput(true);  
                mstform.getItem('user_sfwzikbh').setValue('');
            }else if(mstform.getItem('user_sfwzkbh').getValue() == '0'){
                //mstform.getItem('user_sfwzikbh').setVisible(false);
                mstform.getItem('user_sfwzikbh').userSetMustInput(false);
                mstform.getItem('user_sfwzikbh').setValue('1');
            }
            })
    }
            */
    mstform.getItem('user_sfwzkbh').addListener('change', function () {
        if (mstform.getItem('user_sfwzkbh').getValue() == '1') {
            mstform.getItem('user_sfwzikbh').setVisible(true);
            mstform.getItem('user_sfwzikbh').userSetMustInput(true);
            //mstform.getItem('user_sfwzikbh').setValue(''); 
            mstform.getItem('user_jbr').setVisible(true);
            mstform.getItem('user_jbr').userSetMustInput(true);
            mstform.getItem('user_syrmc').setVisible(true);
            mstform.getItem('user_syrmc').userSetMustInput(true);
            mstform.getItem('user_bhzl').setVisible(true);
            mstform.getItem('user_bhzl').userSetMustInput(true);
            mstform.getItem('user_bhdqrq').setVisible(true);
            mstform.getItem('user_bhdqrq').userSetMustInput(true);
            mstform.getItem('user_bhje').setVisible(true);
            mstform.getItem('user_bhje').userSetMustInput(true);
            mstform.getItem('user_bz').setVisible(true);
            mstform.getItem('user_bz').userSetMustInput(true);
            mstform.getItem('user_zbpsfjqx').setVisible(true);
            mstform.getItem('user_zbpsfjqx').userSetMustInput(true);
            mstform.getItem('user_sqsy').setVisible(true);
            mstform.getItem('user_sqsy').userSetMustInput(true);
        } else if (mstform.getItem('user_sfwzkbh').getValue() == '0') {
            mstform.getItem('user_sfwzikbh').setVisible(false);
            mstform.getItem('user_sfwzikbh').userSetMustInput(false);
            mstform.getItem('user_jbr').setVisible(false);
            mstform.getItem('user_sfwzikbh').userSetMustInput(false);
            mstform.getItem('user_syrmc').setVisible(false);
            mstform.getItem('user_syrmc').userSetMustInput(false);
            mstform.getItem('user_sfwzikbh').setValue('1');
            mstform.getItem('user_bhzl').setVisible(false);
            mstform.getItem('user_bhzl').userSetMustInput(false);

            mstform.getItem('user_bhdqrq').setVisible(false);
            mstform.getItem('user_bhdqrq').userSetMustInput(false);

            mstform.getItem('user_bhje').setVisible(false);
            mstform.getItem('user_bhje').userSetMustInput(false);

            mstform.getItem('user_bz').setVisible(false);
            mstform.getItem('user_bz').userSetMustInput(false);

            mstform.getItem('user_zbpsfjqx').setVisible(false);
            mstform.getItem('user_zbpsfjqx').userSetMustInput(false);

            mstform.getItem('user_sqsy').setVisible(false);
            mstform.getItem('user_sqsy').userSetMustInput(false);
        }
    })


    mstform.getItem('user_cs').on('beforetriggerclick', function () {
        if (mstform.getItem('user_sf').getValue() == '' || mstform.getItem('user_sf').getValue() == null) {
            Ext.Msg.alert('提示', '请先选择省份');
            return false;
        }
        mstform.getItem('user_cs').setOutFilter({
            pid: mstform.getItem('user_sf').getValue()
        })
    });

    mstform.getItem('PhidPc').addListener('change', function () {
        var phid_pc = mstform.getItem('PhidPc').getValue();
        execServer('xmgzxxyr', {
            'phid_pc': phid_pc
        }, function (res) {
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            if (data.length != 0) {
                mstform.getItem('user_xmlxa').setValue(data[0].extendObjects.xmlx);
                mstform.getItem('user_yzxz').setValue(data[0].extendObjects.u_yzxz);
            }
        });
    })

    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        mstform.getItem('user_tbe').addListener('change', function () {
            var user_tbe = mstform.getItem('user_tbe').getValue();
            if (user_tbe > 1000000) {
                Ext.Msg.alert('提示', '请注意标的额单位，单位为万元！');
            }
         
            
        });
        mstform.getItem('user_zbbzjjzrq').addListener('change', function () {
            var user_zbbzjjzrq = mstform.getItem('user_zbbzjjzrq').getValue();
            if (user_zbbzjjzrq > 1000000) {
                mstform.getItem('user_zbbzjjzrq').setValue(0);
                Ext.Msg.alert('提示', '投标保证金额度不能超过1000000万元');
            }
        });
    }

}
