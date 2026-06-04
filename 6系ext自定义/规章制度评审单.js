function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700069_m');

    mstform.getItem('ddlbcol_5').setVisible(false);
    mstform.getItem('textcol_3').setVisible(false);
    mstform.getItem('ddlbcol_6').setVisible(false);
    mstform.getItem('textcol_4').setVisible(false);

    mstform.getItem('ddlbcol_8').setVisible(false);
    mstform.getItem('textcol_5').setVisible(false);
    mstform.getItem('ddlbcol_9').setVisible(false);
    mstform.getItem('textcol_6').setVisible(false);

    mstform.getItem('ddlbcol_2').setVisible(false);
    mstform.getItem('textcol_1').setVisible(false);
    mstform.getItem('ddlbcol_3').setVisible(false);
    mstform.getItem('textcol_2').setVisible(false);
    mstform.getItem('ddlbcol_4').userSetMustInput(true);

    if (otype == $Otype.ADD) {
        //mstform.getItem('title').setValue($appinfo.username + '发起的规章制度评审流程');
        mstform.getItem('ck_zd').setValue(true);
        xdzt(false, true);
        fzzt(false, true);
    }

    function mustInput(value, attribute) {
        for (i = 0; i < value.length; i++) {
            mstform.getItem(value[i]).userSetMustInput(attribute);
        }
    }

    function readOnly(value, attribute) {
        for (i = 0; i < value.length; i++) {
            mstform.getItem(value[i]).userSetReadOnly(attribute);
        }
    }

    function setValue(value, attribute) {
        for (i = 0; i < value.length; i++) {
            mstform.getItem(value[i]).setValue(attribute);
        }
    }

    function xdzt(st1, st2) {
        var value1 = ['xdqmc', 'ygzzdwh', 'ygzzdfbrq', 'xdzynr'];
        var att1 = st1;
        mustInput(value1, att1);

        var value1 = ['xdqmc', 'ck_dsh', 'ck_dwh', 'ck_zjlbgh', 'ck_zxwyh', 'ck_xtfgld',
            'ygzzdwh', 'ygzzdfbrq', 'xdzynr'];
        var att1 = st2;
        readOnly(value1, att1);

        var att1 = '';
        setValue(value1, att1);
    }

    function fzzt(st1, st2) {
        var value1 = ['fz_ygzzdwh', 'fz_ygzzdfbrq', 'fz_fzyy'];
        var att1 = st1;
        mustInput(value1, att1);

        var value1 = ['ck_fz_dsh', 'ck_fz_dwh', 'ck_fz_zjlbgh', 'ck_fz_zxwyh', 'ck_fz_xtfgld', 'fz_ygzzdwh', 'fz_ygzzdfbrq', 'fz_fzyy'];
        var att1 = st2;
        readOnly(value1, att1);

        var att1 = '';
        setValue(value1, att1);
    }


    mstform.getItem('ck_zd').addListener('itemchanged', function () {

        var cck_zdvalue = mstform.getItem('ck_zd').getValue();
        var ddlbcol_4 = mstform.getItem('ddlbcol_4').getValue();
        if (cck_zdvalue == true) {
            // 规章制度制定填写栏
            mstform.getItem('ddlbcol_4').userSetMustInput(true);
            mstform.getItem('ddlbcol_4').userSetReadOnly(false);

            // 规章制度修订填写栏
            mstform.getItem('ddlbcol_10').userSetMustInput(false);
            mstform.getItem('ddlbcol_10').userSetReadOnly(true);
            mstform.getItem('ddlbcol_10').setValue('');

            // 规章制度废止填写栏
            mstform.getItem('ddlbcol_1').userSetMustInput(false);
            mstform.getItem('ddlbcol_1').userSetReadOnly(true);
            mstform.getItem('ddlbcol_1').setValue('');

            xdzt(false, true);
            fzzt(false, true);

            mstform.getItem('ck_xd').setValue(false);
            mstform.getItem('ck_fz').setValue(false);
        }
        else {
            mstform.getItem('ddlbcol_10').setValue('');
            mstform.getItem('ddlbcol_1').setValue('');
            mstform.getItem('textcol_3').setValue('');
            mstform.getItem('textcol_4').setValue('');
            //textcol_3
            //textcol_4

            mstform.getItem('ddlbcol_10').userSetReadOnly(false);
            mstform.getItem('ddlbcol_1').userSetReadOnly(false);
            mstform.getItem('ddlbcol_4').userSetMustInput(false);
            if (mstform.getItem('ck_xd').getValue() == false && mstform.getItem('ck_fz').getValue() == false) {
                mstform.getItem('ck_zd').setValue(true);
            }
        }
    });

    mstform.getItem('ddlbcol_4').addListener('change', function () {
        var ddlbcol_4 = mstform.getItem('ddlbcol_4').getValue();
        if (ddlbcol_4 == '1') {
            mstform.getItem('ddlbcol_5').setVisible(true);
            mstform.getItem('ddlbcol_6').setVisible(true);
            mstform.getItem('ddlbcol_5').userSetMustInput(true);
            mstform.getItem('ddlbcol_6').userSetMustInput(true);

            mstform.getItem('ddlbcol_5').addListener('change', function () {
                var ddlbcol_5 = mstform.getItem('ddlbcol_5').getValue();
                if (ddlbcol_5 == '1') {
                    mstform.getItem('textcol_3').setVisible(true);
                    mstform.getItem('textcol_3').userSetMustInput(true);
                }
                else {
                    mstform.getItem('textcol_3').setVisible(false);
                    mstform.getItem('textcol_3').userSetMustInput(false);
                    mstform.getItem('textcol_3').setValue('');
                }
            });
            mstform.getItem('ddlbcol_6').addListener('change', function () {
                var ddlbcol_6 = mstform.getItem('ddlbcol_6').getValue();
                if (ddlbcol_6 == '1') {
                    mstform.getItem('textcol_4').setVisible(true);
                    mstform.getItem('textcol_4').userSetMustInput(true);
                }
                else {
                    mstform.getItem('textcol_4').setValue('');
                    mstform.getItem('textcol_4').setVisible(false);
                    mstform.getItem('textcol_4').userSetMustInput(false);
                }
            });
        }
        else {
            mstform.getItem('ddlbcol_5').userSetMustInput(false);
            mstform.getItem('ddlbcol_6').userSetMustInput(false);
            mstform.getItem('ddlbcol_5').setVisible(false);
            mstform.getItem('ddlbcol_6').setVisible(false);
            mstform.getItem('ddlbcol_5').setValue('');
            mstform.getItem('ddlbcol_6').setValue('');
        }
    });

    mstform.getItem('ck_xd').addListener('itemchanged', function () {
        var cck_xdvalue = mstform.getItem('ck_xd').getValue();
        if (cck_xdvalue == true) {
            // 规章制度制定填写栏
            mstform.getItem('ddlbcol_4').userSetMustInput(false);
            mstform.getItem('ddlbcol_4').userSetReadOnly(true);
            mstform.getItem('ddlbcol_4').setValue('');

            // 规章制度修订填写栏
            mstform.getItem('ddlbcol_10').userSetMustInput(true);
            mstform.getItem('ddlbcol_10').userSetReadOnly(false);

            // 规章制度废止填写栏
            mstform.getItem('ddlbcol_1').userSetMustInput(false);
            mstform.getItem('ddlbcol_1').userSetReadOnly(true);
            mstform.getItem('ddlbcol_1').setValue('');

            xdzt(true, false);
            fzzt(false, true);

            mstform.getItem('ck_zd').setValue(false);
            mstform.getItem('ck_fz').setValue(false);
        } else {
            mstform.getItem('ddlbcol_10').userSetMustInput(false);
            mstform.getItem('ddlbcol_4').userSetReadOnly(false);
            mstform.getItem('ddlbcol_1').userSetReadOnly(false);
            if (mstform.getItem('ck_zd').getValue() == false && mstform.getItem('ck_fz').getValue() == false) {
                mstform.getItem('ck_xd').setValue(true);
            }
        }
    });





    mstform.getItem('ddlbcol_10').addListener('change', function () {
        var ddlbcol_10 = mstform.getItem('ddlbcol_10').getValue();
        if (ddlbcol_10 == '1') {
            mstform.getItem('ddlbcol_8').setVisible(true);
            mstform.getItem('ddlbcol_9').setVisible(true);
            mstform.getItem('ddlbcol_8').userSetMustInput(true);
            mstform.getItem('ddlbcol_9').userSetMustInput(true);

            mstform.getItem('ddlbcol_8').addListener('change', function () {
                var ddlbcol_8 = mstform.getItem('ddlbcol_8').getValue();
                if (ddlbcol_8 == '1') {
                    mstform.getItem('textcol_5').setVisible(true);
                    mstform.getItem('textcol_5').userSetMustInput(true);
                }
                else {
                    mstform.getItem('textcol_5').setVisible(false);
                    mstform.getItem('textcol_5').userSetMustInput(false);
                    mstform.getItem('textcol_5').setValue('');
                }
            });
            mstform.getItem('ddlbcol_9').addListener('change', function () {
                var ddlbcol_9 = mstform.getItem('ddlbcol_9').getValue();
                if (ddlbcol_9 == '1') {
                    mstform.getItem('textcol_6').setVisible(true);
                    mstform.getItem('textcol_6').userSetMustInput(true);
                }
                else {
                    mstform.getItem('textcol_6').setValue('');
                    mstform.getItem('textcol_6').setVisible(false);
                    mstform.getItem('textcol_6').userSetMustInput(false);
                }
            });
        }
        else {
            mstform.getItem('ddlbcol_8').userSetMustInput(false);
            mstform.getItem('ddlbcol_9').userSetMustInput(false);
            mstform.getItem('ddlbcol_8').setVisible(false);
            mstform.getItem('ddlbcol_9').setVisible(false);
            mstform.getItem('ddlbcol_8').setValue('');
            mstform.getItem('ddlbcol_9').setValue('');
        }
    });

    mstform.getItem('ck_fz').addListener('itemchanged', function () {
        var cck_fzvalue = mstform.getItem('ck_fz').getValue();
        if (cck_fzvalue == true) {
            // 规章制度制定填写栏
            mstform.getItem('ddlbcol_4').userSetMustInput(false);
            mstform.getItem('ddlbcol_4').userSetReadOnly(true);
            mstform.getItem('ddlbcol_4').setValue('');

            // 规章制度修订填写栏
            mstform.getItem('ddlbcol_10').userSetMustInput(false);
            mstform.getItem('ddlbcol_10').userSetReadOnly(true);
            mstform.getItem('ddlbcol_10').setValue('');

            // 规章制度废止填写栏
            mstform.getItem('ddlbcol_1').userSetMustInput(true);
            mstform.getItem('ddlbcol_1').userSetReadOnly(false);

            fzzt(true, false);
            xdzt(false, true);

            mstform.getItem('ck_zd').setValue(false);
            mstform.getItem('ck_xd').setValue(false);
        }
        else {
            mstform.getItem('ddlbcol_1').userSetMustInput(false);
            mstform.getItem('ddlbcol_4').userSetReadOnly(false);
            mstform.getItem('ddlbcol_10').userSetReadOnly(false);
            if (mstform.getItem('ck_zd').getValue() == false && mstform.getItem('ck_xd').getValue() == false) {
                mstform.getItem('ck_fz').setValue(true);
            }
        }
    });

    mstform.getItem('ddlbcol_1').addListener('change', function () {
        var ddlbcol_1 = mstform.getItem('ddlbcol_1').getValue();
        if (ddlbcol_1 == '1') {
            mstform.getItem('ddlbcol_2').setVisible(true);
            mstform.getItem('ddlbcol_3').setVisible(true);
            mstform.getItem('ddlbcol_2').userSetMustInput(true);
            mstform.getItem('ddlbcol_3').userSetMustInput(true);

            mstform.getItem('ddlbcol_2').addListener('change', function () {
                var ddlbcol_2 = mstform.getItem('ddlbcol_2').getValue();
                if (ddlbcol_2 == '1') {
                    mstform.getItem('textcol_1').setVisible(true);
                    mstform.getItem('textcol_1').userSetMustInput(true);
                }
                else {
                    mstform.getItem('textcol_1').setVisible(false);
                    mstform.getItem('textcol_1').userSetMustInput(false);
                    mstform.getItem('textcol_1').setValue('');
                }
            });
            mstform.getItem('ddlbcol_3').addListener('change', function () {

                var ddlbcol_3 = mstform.getItem('ddlbcol_3').getValue();
                if (ddlbcol_3 == '1') {
                    mstform.getItem('textcol_2').setVisible(true);
                    mstform.getItem('textcol_2').userSetMustInput(true);
                }
                else {
                    mstform.getItem('textcol_2').setValue('');
                    mstform.getItem('textcol_2').setVisible(false);
                    mstform.getItem('textcol_2').userSetMustInput(false);
                }
            });
        }
        else {
            mstform.getItem('ddlbcol_2').userSetMustInput(false);
            mstform.getItem('ddlbcol_3').userSetMustInput(false);
            mstform.getItem('ddlbcol_2').setVisible(false);
            mstform.getItem('ddlbcol_3').setVisible(false);
            mstform.getItem('ddlbcol_2').setValue('');
            mstform.getItem('ddlbcol_3').setValue('');
        }
    });
}