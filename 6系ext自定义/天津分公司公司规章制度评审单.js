function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700724_m');
    mstform.on('dataready', function (e) {
        if (otype == $Otype.ADD) {

            var jbr = mstform.getItem('phid_fill_psn').getValue();
            execServer('p_form0000700724_Getygxm', { fphid: jbr }, function (res) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (res.count > 0) {

                    mstform.getItem('deptid').setValue(data[0].extendObjects['phid']);
                    BatchBindCombox([mstform.getItem('deptid')]);
                    //alert(xm1);  
                }
            })

        }

        {
            mstform.getItem('bill_name').setValue($appinfo.username + '发起的规章制度评审流程');
            mstform.getItem('checkboxcol_1').setValue(true);
            xdzt(false, true);
            fzzt(false, true);
        }
    })

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
        var value1 = ['u_xdqmc', 'u_ygzzdwh', 'u_yrq', 'u_xdzynr'];
        var att1 = st1;
        mustInput(value1, att1);

        var value1 = ['u_xdqmc', 'checkboxcol_4', 'checkboxcol_5', 'checkboxcol_6', 'checkboxcol_7', 'checkboxcol_8', 'u_ygzzdwh', 'u_yrq', 'u_xdzynr'];
        var att1 = st2;
        readOnly(value1, att1);

        var att1 = '';
        setValue(value1, att1);
    }

    function fzzt(st1, st2) {
        var value1 = ['u_ygzzdwh2', 'u_ygzrq', 'u_fzyy'];
        var att1 = st1;
        mustInput(value1, att1);

        var value1 = ['checkboxcol_9', 'checkboxcol_10', 'checkboxcol_11', 'checkboxcol_12', 'checkboxcol_13', 'u_ygzzdwh2', 'u_ygzrq', 'u_fzyy'];
        var att1 = st2;
        readOnly(value1, att1);

        var att1 = '';
        setValue(value1, att1);
    }


    mstform.getItem('checkboxcol_1').addListener('itemchanged', function () {

        var cck_zdvalue = mstform.getItem('checkboxcol_1').getValue();

        if (cck_zdvalue == true) {
            xdzt(false, true);
            fzzt(false, true);
            mstform.getItem('checkboxcol_2').setValue(false);
            mstform.getItem('checkboxcol_3').setValue(false);
        }
        else {
            if (mstform.getItem('checkboxcol_2').getValue() == false && mstform.getItem('checkboxcol_3').getValue() == false) {
                mstform.getItem('checkboxcol_1').setValue(true);
            }

        }
    });

    mstform.getItem('checkboxcol_2').addListener('itemchanged', function () {

        var cck_xdvalue = mstform.getItem('checkboxcol_2').getValue();

        if (cck_xdvalue == true) {
            xdzt(true, false);
            fzzt(false, true);
            mstform.getItem('checkboxcol_1').setValue(false);
            mstform.getItem('checkboxcol_3').setValue(false);
        }
        else {

            if (mstform.getItem('checkboxcol_1').getValue() == false && mstform.getItem('checkboxcol_3').getValue() == false) {
                mstform.getItem('checkboxcol_2').setValue(true);
            }
        }
    });

    mstform.getItem('checkboxcol_3').addListener('itemchanged', function () {

        var cck_fzvalue = mstform.getItem('checkboxcol_3').getValue();

        if (cck_fzvalue == true) {
            fzzt(true, false);
            xdzt(false, true);
            mstform.getItem('checkboxcol_1').setValue(false);
            mstform.getItem('checkboxcol_2').setValue(false);
        }
        else {

            if (mstform.getItem('checkboxcol_1').getValue() == false && mstform.getItem('checkboxcol_2').getValue() == false) {
                mstform.getItem('checkboxcol_3').setValue(true);
            }
        }
    });


}