function allReadyEdit() {


    var mstform = Ext.getCmp('p_form0000700122_m');
    var dgrid = Ext.getCmp('p_form0000700122_d');
    var dstore = dgrid.store;
    mstform.getItem('u_hse').addListener('helpselected', function (res) {
        console.log("res:", res)
        console.log("res:", res);
        var dt = res.data.u_hte
        var dt1 = dt * 0.0001
        var xmlx = res.data.xmlx_1
        mstform.getItem('u_hte').setValue(dt1)
        mstform.getItem('u_xmlx').setValue(xmlx)
        BatchBindCombox([mstform.getItem('u_xmlx')]);
    });
    //合同额发生改变时
    mstform.getItem('u_hte').addListener('change', function () {
        var hte = mstform.getItem('u_hte').getValue()
        var jtb = mstform.getItem('u_jtb').getValue()
        if (jtb != '' && hte != '' && jtb != null && hte != null) {
            if (jtb == 1) {
                mstform.getItem('u_acfyjts').setValue(Ext.Number.from(hte, 0) * 0.02)
            } else if (jtb == 2) {
                mstform.getItem('u_acfyjts').setValue(Ext.Number.from(hte, 0) * 0.015)
            } else {
                mstform.getItem('u_acfyjts').setValue(Ext.Number.from(hte, 0) * 0.002)
            }
        }

    });

    //计提比例发生改变时
    mstform.getItem('u_jtb').addListener('change', function () {
        var hte = mstform.getItem('u_hte').getValue()
        var jtb = mstform.getItem('u_jtb').getValue()
        var ywccz = mstform.getItem('u_ywccz').getValue()
        if (jtb != '' && hte != '' && jtb != null && hte != null) {
            if (jtb == 1) {
                mstform.getItem('u_acfyjts').setValue(Ext.Number.from(hte, 0) * 0.02)
            } else if (jtb == 2) {
                mstform.getItem('u_acfyjts').setValue(Ext.Number.from(hte, 0) * 0.015)
            } else if (jtb == 3) {
                mstform.getItem('u_acfyjts').setValue(Ext.Number.from(hte, 0) * 0.002)
            } else if (jtb == 4) {
                mstform.getItem('u_acfyjts').setValue(Ext.Number.from(hte, 0) * 0.025)
            } else if (jtb == 5) {
                mstform.getItem('u_acfyjts').setValue(Ext.Number.from(hte, 0) * 0.03)
            } else if (jtb == 6) {
                mstform.getItem('u_acfyjts').setValue(Ext.Number.from(hte, 0) * 0.035)
            }
        }
        if (jtb != '' && ywccz != '' && jtb != null && ywccz != null) {
            if (jtb == 1) {
                mstform.getItem('u_ysyje').setValue(Ext.Number.from(ywccz, 0) * 0.02)
            } else if (jtb == 2) {
                mstform.getItem('u_ysyje').setValue(Ext.Number.from(ywccz, 0) * 0.015)
            } else if (jtb == 3) {
                mstform.getItem('u_ysyje').setValue(Ext.Number.from(ywccz, 0) * 0.002)
            } else if (jtb == 4) {
                mstform.getItem('u_acfyjts').setValue(Ext.Number.from(hte, 0) * 0.025)
            } else if (jtb == 5) {
                mstform.getItem('u_acfyjts').setValue(Ext.Number.from(hte, 0) * 0.03)
            } else if (jtb == 6) {
                mstform.getItem('u_acfyjts').setValue(Ext.Number.from(hte, 0) * 0.035)
            }
        }

    });

    //已完成产值发生改变时
    mstform.getItem('u_ywccz').addListener('change', function () {
        var ywccz = mstform.getItem('u_ywccz').getValue()
        var jtb = mstform.getItem('u_jtb').getValue()

        var ljsy = mstform.getItem('u_ljsy').getValue()
        if (jtb != '' && ywccz != '' && jtb != null && ywccz != null) {
            if (jtb == 1) {
                mstform.getItem('u_ysyje').setValue(Ext.Number.from(ywccz, 0) * 0.02)
            } else if (jtb == 2) {
                mstform.getItem('u_ysyje').setValue(Ext.Number.from(ywccz, 0) * 0.015)
            } else {
                mstform.getItem('u_ysyje').setValue(Ext.Number.from(ywccz, 0) * 0.002)
            }
        }


        if (ywccz != '' && ywccz != null && ljsy != '' && ljsy != null) {
            mstform.getItem('u_sjsjbl').setValue(Ext.Number.from(ljsy, 0) / Ext.Number.from(ywccz, 0))
        }

    });
    //获取项目信息
    mstform.getItem('phid_pc').addListener('change', function () {
        var pc = mstform.getItem('phid_pc').getValue()
        console.log("pc:", pc);
        if (pc != '' && pc != null) {
            execServer('p_form0000700122_dcsy', { 'pc': pc }, function (res) {
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log("data:", data);
                    var syje = mstform.getItem('u_syje').getValue()
                    if (syje != '' && syje != 0 && data != null) {
                        mstform.getItem('u_ljsy').setValue(Ext.Number.from(data[0].extendObjects.je, 0) + Ext.Number.from(syje, 0))
                    } else {
                        mstform.getItem('u_ljsy').setValue(Ext.Number.from(data[0].extendObjects.je, 0))

                    }
                }
            });

        }
    })
    mstform.getItem('u_syje').addListener('change', function () {
        var pc = mstform.getItem('phid_pc').getValue()
        if (pc != '' && pc != null && pc != 'undefined') {
            execServer('p_form0000700122_dcsy', { 'pc': pc }, function (res) {
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    var syje = mstform.getItem('u_syje').getValue()
                    if (syje != '' && syje != 0 && data != null) {
                        mstform.getItem('u_ljsy').setValue(Ext.Number.from(data[0].extendObjects.je, 0) + Ext.Number.from(syje, 0))
                    } else {
                        mstform.getItem('u_ljsy').setValue(Ext.Number.from(data[0].extendObjects.je, 0))

                    }
                }
            });




        }
    })
    mstform.getItem('u_ljsy').addListener('change', function () {
        var ywccz = mstform.getItem('u_ywccz').getValue()
        var ljsy = mstform.getItem('u_ljsy').getValue()

        if (ywccz != '' && ywccz != null && ljsy != '' && ljsy != null) {
            mstform.getItem('u_sjsjbl').setValue(Ext.Number.from(ljsy, 0) / Ext.Number.from(ywccz, 0))
        }




    })


    var arr1 = new Array();


    arr1.push({
        u_fjmc: '安措费明细',
    });
    dstore.insert(dstore.getCount(), arr1);
}