function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700231_m');
    //mstform.getItem('u_xymc').setVisible(false);

    //mstform.getItem('u_dfdw').setVisible(false);

    //mstform.getItem('userhelp_1').setVisible(false);

    //mstform.getItem('ddlbcol_1').setVisible(false);

    //mstform.getItem('u_khlb').setVisible(false);

    //mstform.getItem('u_khxz').setVisible(false);

    //mstform.getItem('u_sf').setVisible(false);

    //mstform.getItem('u_cs').setVisible(false);

    //mstform.getItem('textcol_5').setVisible(false);
    //mstform.getItem('datetimecol_1').setVisible(false);
    //mstform.getItem('datetimecol_2').setVisible(false);
    //mstform.getItem('datetimecol_3').setVisible(false);
    //mstform.getItem('textcol_6').setVisible(false);
    //mstform.getItem('u_cxap').setVisible(false);
    //mstform.getItem('datetimecol_4').setVisible(false);

    // mstform.getItem('textcol_7').setVisible(false);
    // mstform.getItem('longcol_1').setVisible(false);
    // mstform.getItem('longcol_2').setVisible(false);
    // mstform.getItem('longcol_3').setVisible(false);
    // mstform.getItem('longcol_4').setVisible(false);
    // mstform.getItem('remarks').setVisible(false);

    mstform.getItem('u_dfdw').addListener('helpselected', function (obj) {
        var u_dfdw = mstform.getItem("u_dfdw").getValue();
        execServer('p_form0000700231_khxx', {
            'phid': u_dfdw
        }, function (res) {
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                mstform.getItem("u_khlb").setValue(data1[0].extendObjects.hylx); //客户类别
                mstform.getItem("u_khxz").setValue(data1[0].extendObjects.khxz);//客户性质
                mstform.getItem("u_sf").setValue(data1[0].extendObjects.sf);
                mstform.getItem("u_cs").setValue(data1[0].extendObjects.cs);

            }
        });
    })



    mstform.getItem('u_cs').on('beforetriggerclick', function () {
        if (mstform.getItem('u_sf').getValue() == '') {
            Ext.Msg.alert('提示', '请先选择省份');
            return false;
        }
        mstform.getItem('u_cs').setOutFilter({
            pid: mstform.getItem('u_sf').getValue()
        })
    });

}