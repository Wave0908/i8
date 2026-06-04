function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700049_m');


    mstform.getItem('ygxm').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        mstform.getItem('ygxm').setOutFilter({
            zzphid: $appinfo.orgID
        })
    });

    mstform.getItem('ygxm').addListener('change', function () {

        console.log(mstform.getItem('ygxm').getValue());

        execServer('p_form0000700049_Getygxx', { ygxm: mstform.getItem('ygxm').getValue() }, function (res) {
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            if (res.count > 0) {
                mstform.getItem('dqbm').setValue(data[0].extendObjects['rzbm']);
                mstform.getItem('dqgw').setValue(data[0].extendObjects['rzgw']);
            }
        })
    });

    mstform.getItem('deptid1').addListener('change', function () {

        console.log(mstform.getItem('deptid1').getValue());
    });

    mstform.getItem('dhgw').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        if (!Ext.isEmpty(mstform.getItem('deptid1').getValue())) {
            mstform.getItem('dhgw').setOutFilter({
                phid_dept: mstform.getItem('deptid1').getValue()
            })
        }

    });








}

