function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700400_m');
    var dgrid = Ext.getCmp('p_form0000700400_d');
    var dstore = dgrid.store;
    mstform.getItem('u_hyxhgldw').setVisible(false);
    mstform.getItem('u_dkhzzdw').setVisible(false);
    mstform.getItem('u_bhzzdw').setVisible(false);
    mstform.getItem('u_lsdkhmc').setVisible(false);
    mstform.getItem('u_lsbhmc').setVisible(false);
    // var dgrid1 = Ext.getCmp('p_form0000000052_d1grid');
    // var d1store = dgrid1.store;
    // dgrid1.hide();
    // var dgrid = Ext.getCmp('p_form0000000052_dgrid');
    //var dstore = dgrid.store;
    //var Toolbar = Ext.getCmp('toolbar');
    //mstform.getItem('u_tsnr').userSetReadOnly(true);
    //mstform.getItem('bzf').setVisible(false); //字段隐藏
    //mstform.getItem('sspq').setVisible(false);
    //mstform.getItem('checkpsn').setVisible(false);
    //mstform.getItem('u_bt').setVisible(false);
    // mstform.getItem('custno').setVisible(false);
    var d1grid = Ext.getCmp('p_form0000700400_d1');
    var d1store = d1grid.store;


    var d2grid = Ext.getCmp('p_form0000700400_d2');
    var d2store = d2grid.store;


    var d3grid = Ext.getCmp('p_form0000700400_d3');
    var d3store = d3grid.store;
    //----------省市区判断开始
    mstform.getItem('custno').addListener('helpselected', function () {
        var custno = mstform.getItem("custno").getValue();
        console.log("custno:", custno);
        execServer('p_form0000700400_khxx', {
            phid: custno
        }, function (res) {
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log("data1:", data1);
                mstform.getItem("u_cym").setValue(data1[0].extendObjects.oldname); //曾用名
                mstform.getItem("u_gj").setValue(data1[0].extendObjects.country); //国家
                mstform.getItem("u_sf").setValue(data1[0].extendObjects.province); //区域
                mstform.getItem("u_cs").setValue(data1[0].extendObjects.city); //是否一带一路
                mstform.getItem("u_qx").setValue(data1[0].extendObjects.district); //行业类别
            }
        });
    });
    BatchBindCombox([mstform.getItem('u_gj')]);

    mstform.getItem('u_khlxej').addListener('helpselected', function () {
        if (mstform.getItem("u_khlxej").getValue() == '569000000000664') {
            mstform.getItem('u_hyxhgldw').userSetMustInput(true);
            mstform.getItem('u_hyxhgldw').setVisible(true);
        } else {
            mstform.getItem('u_hyxhgldw').userSetMustInput(false);
            mstform.getItem('u_hyxhgldw').setVisible(false);
            mstform.getItem('u_hyxhgldw').setValue(null);
        }
    });

    mstform.getItem('u_sfdkh').addListener('change', function () {
        if (mstform.getItem("u_sfdkh").getValue() == '1') {
            mstform.getItem('u_dkhzzdw').userSetMustInput(true);
            mstform.getItem('u_dkhzzdw').setVisible(true);
            mstform.getItem('u_lsdkhmc').userSetMustInput(true);
            mstform.getItem('u_lsdkhmc').setVisible(true);
        } else {
            mstform.getItem('u_dkhzzdw').userSetMustInput(false);
            mstform.getItem('u_dkhzzdw').setVisible(false);
            mstform.getItem('u_dkhzzdw').setValue(null);
            mstform.getItem('u_lsdkhmc').userSetMustInput(false);
            mstform.getItem('u_lsdkhmc').setVisible(false);
        }
    });
    mstform.getItem('u_sfbh').addListener('change', function () {
        if (mstform.getItem("u_sfbh").getValue() == '1') {
            mstform.getItem('u_bhzzdw').userSetMustInput(true);
            mstform.getItem('u_bhzzdw').setVisible(true);
            mstform.getItem('u_lsbhmc').userSetMustInput(true);
            mstform.getItem('u_lsbhmc').setVisible(true);
        } else {
            mstform.getItem('u_bhzzdw').userSetMustInput(false);
            mstform.getItem('u_bhzzdw').setVisible(false);
            mstform.getItem('u_bhzzdw').setValue(null);
            mstform.getItem('u_lsbhmc').setVisible(false);
            mstform.getItem('u_lsbhmc').setValue(null);
            mstform.getItem('u_lsbhmc').userSetMustInput(false);
        }
    });

    //是否大客户选择是，隶属大客户必填


    mstform.getItem('u_khlxej').on('beforetriggerclick', function () { //客户类型2
        if (mstform.getItem('u_khlxyj').getValue() == null) {
            Ext.Msg.alert('提示', '请先选择客户类型一级');
            return false;
        }
    });



    var dansubdi = mstform.getItem('u_khlxej');
    dansubdi.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        var usgfalx = mstform.getItem('u_khlxyj').getValue();
        console.log(usgfalx);
        if (usgfalx != '' && usgfalx != null) {
            if (usgfalx == '1') {
                dansubdi.setClientSqlFilter("c_no in ('1','2','3','4','5','6','7','8','9','10','16')");
            } else if (usgfalx == '2') {
                dansubdi.setClientSqlFilter("c_no in ('11','12','13','14','15','16')");
            }
        }
    });





    dgrid.getColumn('u_khywglej_EXName').getEditor().on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        var data = dgrid.getSelectionModel().getSelection();
        var userhelp_1 = data[0].get('u_khywglyj');
        if (!userhelp_1) {
            NGMsg.Error('客户业务归类一级未选择！')
            data[0].set(userhelp_1, '');
            return false;
        }
    });



    dgrid.getColumn('u_khywglej_EXName').getEditor().on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        var data = dgrid.getSelectionModel().getSelection();
        var userhelp_1 = data[0].get('u_khywglyj');
        var fl;
        execServer('p_form0000700400_zcfl', {
            'A': userhelp_1
        }, function (res) {
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                fl = data1[0].extendObjects.yjbm
            }

        });
        dgrid.getColumn('u_khywglej_EXName').getEditor().setOutFilter({
            'yjbm': fl
        });
        //dgrid.getColumn('u_khywglej_name').getEditor().setOutFilter("ejbm in (select ejbm from khywfl where yjbm in (select yjbm from khywfl_yj where yjbm ='"+userhelp_1+"' )) ");
    });


    dstore.insert(dstore.getCount(),
        [{
            c_row: '1'
        }]);


    d1store.insert(d1store.getCount(),
        [{
            c_row: '1'
        }]);


    d2store.insert(d2store.getCount(),
        [{
            c_row: '1'
        }]);

    /*  d3store.insert(d3store.getCount(),
      [{
          c_row: '1'
      }]);
  */



    d3grid.getColumn('u_hylx_EXName').getEditor().on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        var data = d3grid.getSelectionModel().getSelection();
        var userhelp_1 = data[0].get('u_zzzl');
        if (!userhelp_1) {
            NGMsg.Error('资质种类未选择！')
            data[0].set(userhelp_1, '');
            return false;
        }
        var fl;
        execServer('p_form0000700400_zzzlxh', {
            'A': userhelp_1
        }, function (res) {
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                fl = data1[0].extendObjects.资质种类序号
            }

        });
        d3grid.getColumn('u_hylx_EXName').getEditor().setOutFilter({
            '资质种类序号': fl
        });
    });





    /* d3grid.getColumn('u_zzlxydj_name').getEditor().on('beforetriggerclick', function(eOp, ignoreBeforeEvent) {
        var data = d3grid.getSelectionModel().getSelection();
        var userhelp_1 = data[0].get('u_hylx');
        var fl;
        callServer('zzlxbm', [{
            'A':userhelp_1
        }], function(res) {
            fl =res.record[0].行业序号
 
        });
        d3grid.getColumn('u_zzlxydj_name').getEditor().setOutFilter({
            '行业序号': fl
       });
 });*/



    if (otype == $Otype.ADD) {

        mstform.getItem('bill_name').addListener('change', function () {
            var bt = mstform.getItem('u_bt');
            var xmmc_val = "'".concat(mstform.getItem("bill_name").getValue()).concat("'");
            execServer('p_form0000700400_List', {
                'title': xmmc_val
            }, function (res) {
                if (res.count > 0) {
                    const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    mstform.getItem('u_bt').setValue(data1[0].extendObjects.u_bt);
                }
            });
            if (mstform.getItem("u_bt").getValue() > 0) {
                Ext.Msg.alert('提示', '此客户已录入客户详细信息!');
                mstform.getItem('bill_name').focus();
                mstform.getItem('bill_name').setValue(null);
            }
        });
    }


    if (otype == $Otype.view) {

        BatchBindCombox([mstform.getItem('u_khmc')]);
    }




}