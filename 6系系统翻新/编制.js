function AllReady() {
    var mstform = Ext.getCmp('TotalCostPlanM');
    mstform.getItem('PhidCblx').userSetReadOnly(true);

    mstform.on('dataready', function () {
        mstform.getItem('PhidCblx').setValue("13")
        BatchBindCombox([mstform.getItem('PhidCblx')])
        var PhidCblx = mstform.getItem('PhidCblx').getValue();
        if (PhidCblx == '13') {
            mstform.getItem('user_yjhtsr').setVisible(true);
        } else {
            mstform.getItem('user_yjhtsr').setVisible(false);

        }
    });

    mstform.getItem('user_gctz').on('beforetriggerclick', function () {
        var PhidPc_val = mstform.getItem('PhidPc').getValue();

        if (Ext.isEmpty(PhidPc_val)) {
            Ext.Msg.alert('提示', '请先选择项目！');
            return false;
        } else {
            var PhidPc_val = mstform.getItem('PhidPc').getValue();
            mstform.getItem('user_gctz').setOutFilter({
                pc: PhidPc_val
            });
        }
    });
    mstform.getItem('PhidPc').addListener('change', function () {
        mstform.getItem('user_gctz').setValue('');
    });

    var PhidCblx = mstform.getItem('PhidCblx').getValue();

    mstform.getItem('PhidCblx').addListener('change', function () {

        var PhidCblx = mstform.getItem('PhidCblx').getValue();

        if (otype == $Otype.ADD) {
            mstform.getItem('TotalAmt').setFieldLabel('计划成本金额');
        }
        if (PhidCblx == '11') {
            mstform.getItem('TotalAmt').setFieldLabel('合同预算收入金额');
        } else if (PhidCblx == '12') {
            mstform.getItem('TotalAmt').setFieldLabel('施工图预算金额');
        } else if (PhidCblx == '13') {
            mstform.getItem('TotalAmt').setFieldLabel('责任成本');
            mstform.getItem('user_sglrl').setFieldLabel('施工利润率');
            mstform.getItem('user_sglr').setFieldLabel('施工利润');
        } else if (PhidCblx == '14') {
            mstform.getItem('TotalAmt').setFieldLabel('计划成本金额');
            mstform.getItem('user_sglrl').setFieldLabel('计划利润率');
            mstform.getItem('user_sglr').setFieldLabel('计划利润');
        }
    });
    mstform.getItem('user_sglr').addListener('change', function () {
        var PhidCblx = mstform.getItem('PhidCblx').getValue();
        if (PhidCblx == 13) {
            var ht = mstform.getItem('user_yjhtsr').getValue();
            var lr = mstform.getItem('user_sglr').getValue();
            mstform.getItem('user_sglrl').setValue(lr / ht);
            mstform.getItem('PhidCblx').userSetReadOnly(true);
        }
        if (PhidCblx == 14) {
            var ht = mstform.getItem('CntAmtFc').getValue();
            var lr = mstform.getItem('user_sglr').getValue();
            mstform.getItem('user_sglrl').setValue(lr / ht);
            mstform.getItem('PhidCblx').userSetReadOnly(true);
        }
    })

    /*承揽合同名称字段选择前触发start*/
    mstform.getItem('user_clhtmc').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        if (Ext.isEmpty(mstform.getItem('PhidPc').getValue())) {
            Ext.Msg.alert('提示', "请先选择工程项目");
            return false;
        }
        var pc = mstform.getItem('PhidPc').getValue();
        mstform.getItem('user_clhtmc').setOutFilter({
            'pcm3_cnt_m.phid_pc': pc
        })
    });
    /*承揽合同名称字段选择前触发end*/

    /*工程项目选择后触发start*/
    mstform.getItem('PhidPc').addListener('helpselected', function () {
        var PhidPc = mstform.getItem('PhidPc').getValue();
        execServer('gcxm_bz', {
            'pc': PhidPc
        }, function (res) {
            if (res.count > 0) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                mstform.getItem('user_ssxmb').setValue(data[0].extendObjects.xmshbm);
            }




        });
        BatchBindCombox([mstform.getItem('user_ssxmb')]);
    });
    /*工程项目选择后触发end*/

    mstform.getItem('user_xmqjglf_yjjsz').addListener('change', function () {
        var PhidPc = mstform.getItem('PhidPc').getValue();
        var user_xmqjglf_yjjsz = mstform.getItem('user_xmqjglf_yjjsz').getValue();
        if (PhidPc && user_xmqjglf_yjjsz && user_xmqjglf_yjjsz != 0) {
            execServer('selyjjszpc', { 'a': PhidPc }, function (res) {
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    if (data.length != 0) {
                        var c = Ext.Number.from(data[0].extendObjects.yjjsz, 0) * 0.025;
                        if (user_xmqjglf_yjjsz > c) {
                            mstform.getItem('user_xmqjglf_yjjsz').inputEl.dom.style.color = 'red';
                        } else {
                            mstform.getItem('user_xmqjglf_yjjsz').inputEl.dom.style.color = 'black';
                        }
                    }
                }
            });
        }
    })
    mstform.getItem('user_sscb_yjjsz').addListener('change', function () {
        var PhidPc = mstform.getItem('PhidPc').getValue();
        var user_sscb_yjjsz = mstform.getItem('user_sscb_yjjsz').getValue();
        if (PhidPc && user_sscb_yjjsz && user_sscb_yjjsz != 0) {
            execServer('selyjjszpc', { 'a': PhidPc }, function (res) {
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    if (data.length != 0) {
                        var d = Ext.Number.from(data[0].extendObjects.yjjsz, 0) * 0.03;
                        if (user_sscb_yjjsz > d) {
                            mstform.getItem('user_sscb_yjjsz').inputEl.dom.style.color = 'red';
                        } else {
                            mstform.getItem('user_sscb_yjjsz').inputEl.dom.style.color = 'black';
                        }
                    }
                }
            });
        }
    })
}