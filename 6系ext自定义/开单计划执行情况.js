function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700280_m');
    //var dgrid = Ext.getCmp('p_form0000700280_dgrid');
    //var dstore = dgrid.store;

    mstform.getItem('phid_pc').on('beforetriggerclick', function () { //客户类型2
        if (mstform.getItem('u_nf').getValue() == '' || mstform.getItem('u_yf').getValue() == '' || mstform.getItem('u_nf').getValue() == null || mstform.getItem('u_yf').getValue() == null) {
            Ext.Msg.alert('提示', '请先选择年份和月份');
            return false;
        }
    });

    mstform.getItem('phid_pc').addListener('helpselected', function () {
        var phid_pc = mstform.getItem('phid_pc').getValue();
        var str = mstform.getItem('u_nf').getValue();
        console.log(str);
        execServer('kdzx_jse', {
            'pc': phid_pc,
            'nd': str,
        }, function (res) {
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log("kdzx_jse:",data1);
                if (data1.length>0) {
                    mstform.getItem('u_xmsx').setValue(data1.extendObjects.xmsx);
                    mstform.getItem('u_yjjsz').setValue(data1.extendObjects.u_yjjsz);
                    mstform.getItem('u_njh').setValue(data1.extendObjects.u_njh);
                } else {
                    mstform.getItem('u_xmsx').setValue(null);//项目属性
                    mstform.getItem('u_yjjsz').setValue(null);//预计结算值
                    mstform.getItem('u_njh').setValue(null);
                }
                //mstform.getItem('u_xmsx').setValue(res.record[0].xmsx);//项目属性
                //mstform.getItem('u_yjjsz').setValue(res.record[0].u_yjjsz);//预计结算值            
            }
        });
    });

    mstform.getItem('phid_pc').addListener('helpselected', function () {
        var phid_pc = mstform.getItem('phid_pc').getValue();
        var nf = mstform.getItem('u_nf').getValue();
        var yf = mstform.getItem('u_yf').getValue();
        console.log(nf);
        console.log(yf);
        execServer('kdjhljmx', {
            'nf': nf,
            'pc': phid_pc,
            'yf': yf,
        }, function (res) {
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log("kdjhljmx:",data1);
                if (data1.length>0) {
                    mstform.getItem('u_jzbyjh').setValue(data1.extendObjects.y_1);
                } else {
                    mstform.getItem('u_jzbyjh').setValue(null);
                }
            }
        });
    });





    mstform.getItem('phid_pc').addListener('helpselected', function () {
        var phid_pc = mstform.getItem('phid_pc').getValue();
        var nf = mstform.getItem('u_nf').getValue();
        var yf = mstform.getItem('u_yf').getValue();
        var ny = ''
        if (mstform.getItem('u_yf').getValue() < 10) {
            var test = '0';
            var test1 = '-';
            ny = "'".concat(mstform.getItem('u_nf').getValue()).concat(test1).concat(test).concat(mstform.getItem('u_yf').getValue()).concat("'");
        }
        else {
            var test1 = '-';
            ny = "'".concat(mstform.getItem('u_nf').getValue()).concat(test1).concat(mstform.getItem('u_yf').getValue()).concat("'");
        }
        console.log(ny);
        execServer('kdbqlj', {
            'pc': phid_pc,
            'ny': ny,
        }, function (res) {
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log("kdbqlj:",data1);
                if (data1.length>0) {
                    mstform.getItem('u_bykd').setValue(data1.extendObjects.bqjsje);
                    mstform.getItem('u_kgljkd').setValue(data1.extendObjects.ljjsje);
                } else {
                    mstform.getItem('u_bykd').setValue(null);
                    mstform.getItem('u_kgljkd').setValue(null);
                }
            }
            else {
                mstform.getItem('u_bykd').setValue(null);
                mstform.getItem('u_kgljkd').setValue(null);
            }
        });
    });


    mstform.getItem('phid_pc').addListener('helpselected', function () {
        var phid_pc = mstform.getItem('phid_pc').getValue();
        var nf = mstform.getItem('u_nf').getValue();
        var yf = mstform.getItem('u_yf').getValue();
        var ny = ''
        if (mstform.getItem('u_yf').getValue() < 10) {
            var test = '0';
            var test1 = '-';
            ny = "'".concat(mstform.getItem('u_nf').getValue()).concat(test1).concat(test).concat(mstform.getItem('u_yf').getValue()).concat("'");
        }
        else {
            var test1 = '-';
            ny = "'".concat(mstform.getItem('u_nf').getValue()).concat(test1).concat(mstform.getItem('u_yf').getValue()).concat("'");
        }
        console.log(ny);
        execServer('kdnl', {
            'pc': phid_pc,
            'ny': ny,
            'nf': nf,
        }, function (res) {
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log("kdnl:",data1);
                if (data1.length>0) {
                    mstform.getItem('u_bnkd').setValue(data1.extendObjects.rep_amt_vat_fc);
                } else {
                    mstform.getItem('u_bnkd').setValue(null);
                }
            }
            else {
                mstform.getItem('u_bnkd').setValue(null);
            }
        });
    });



    mstform.getItem('u_bnkd').addListener('change', function () {   //1-本月计划完成率
        mstform.getItem('u_jzbyjh').addListener('change', function () {
            mstform.getItem('u_1byjhwcl').setValue(Ext.Number.from(mstform.getItem('u_bnkd').getValue(), 0) / Ext.Number.from(mstform.getItem('u_jzbyjh').getValue(), 0));
        });
    });
    mstform.getItem('u_bnsyksg').addListener('change', function () {   //全年预计开单                                                                      
        mstform.getItem('u_qnyjkd').setValue(Ext.Number.from(mstform.getItem('u_bnsyksg').getValue(), 0) + Ext.Number.from(mstform.getItem('u_bnkd').getValue(), 0));
    });
    mstform.getItem('u_qnyjkd').addListener('change', function () {   //年计划缺口                                                                      
        mstform.getItem('u_njhqk').setValue(Ext.Number.from(mstform.getItem('u_njh').getValue(), 0) - Ext.Number.from(mstform.getItem('u_qnyjkd').getValue(), 0));
    });
    mstform.getItem('u_kgljkd').addListener('change', function () {   //未施工工作量                                                                      
        mstform.getItem('u_yjjsz').setValue(Ext.Number.from(mstform.getItem('u_njh').getValue(), 0) - Ext.Number.from(mstform.getItem('u_kgljkd').getValue(), 0));
    });
    mstform.getItem('u_wsggzl').addListener('change', function () {   //结转明年                                                                      
        mstform.getItem('u_jzmn').setValue(Ext.Number.from(mstform.getItem('u_wsggzl').getValue(), 0) - Ext.Number.from(mstform.getItem('u_qnyjkd').getValue(), 0));
    });



}





