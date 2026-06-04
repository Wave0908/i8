function allReadyEdit() { //页面编辑方法，固定写法
    //获取容器，固定写法
    var mstform = Ext.getCmp('p_form0000700500_m');
    //获取表体容器
    var dgrid = Ext.getCmp('p_form0000700500_d');
    console.log('dgrid================>', dgrid)
    var dgrid1 = Ext.getCmp('p_form0000700500_d1');
    var Toolbar = Ext.getCmp('toolbar');
    var tabPanel = Ext.getCmp('tabPanel');
    var dstore = dgrid.store;
    console.log('dstore================>', dstore)
    var dstore1 = dgrid1.store;
    if (otype == $Otype.ADD) {
        var ywlx = mstform.getItem('u_ywlx').getValue()
        if (!ywlx) {
            //隐藏变更后往来明细列
            dgrid.hideColumn('u_kxxz', true);
            dgrid.hideColumn('u_kxxz_EXName', true);
            dgrid.hideColumn('amt', true);
            dgrid.hideColumn('u_yfkhxje', true);
            dgrid.hideColumn('u_yfkhxhje', true);
            dgrid.hideColumn('u_htmc', true);
            dgrid.hideColumn('u_htmc_EXName', true);
            dgrid.hideColumn('u_wldw', true);
            dgrid.hideColumn('u_wldw_EXName', true);
            dgrid.hideColumn('u_kxxz_2', true);
            dgrid.hideColumn('u_kxxz_2_EXName', true);
            dgrid.hideColumn('u_je', true);

            //隐藏原往来明细列
            dgrid1.hideColumn('u_kxxz_old', true);
            dgrid1.hideColumn('u_kxxz_old_EXName', true);
            dgrid1.hideColumn('amt', true);
            dgrid1.hideColumn('u_yfkhxje_old', true);
            dgrid1.hideColumn('u_yfkhxhje_old', true);
            dgrid1.hideColumn('u_htmc_old', true);
            dgrid1.hideColumn('u_htmc_old_EXName', true);
            dgrid1.hideColumn('u_wldw_old', true);
            dgrid1.hideColumn('u_wldw_old_EXName', true);
            dgrid1.hideColumn('u_kxxz2_old', true);
            dgrid1.hideColumn('u_kxxz2_old_EXName', true);
            dgrid1.hideColumn('u_je_old', true);
        }
        if (ywlx == '1' || ywlx == '10' || ywlx == '17' || ywlx == '2') {
            dgrid1.hideColumn('u_kxxz_old', true);
            dgrid1.hideColumn('u_kxxz_old_EXName', false);
            dgrid1.hideColumn('amt', false);
            dgrid1.hideColumn('u_yfkhxje_old', false);
            dgrid1.hideColumn('u_yfkhxhje_old', false);
            dgrid1.hideColumn('u_htmc_old', true);
            dgrid1.hideColumn('u_htmc_old_EXName', true);
            dgrid1.hideColumn('u_wldw_old', true);
            dgrid1.hideColumn('u_wldw_old_EXName', true);
            dgrid1.hideColumn('u_kxxz2_old', true);
            dgrid1.hideColumn('u_kxxz2_old_EXName', true);
            dgrid1.hideColumn('u_je_old', true);

            dgrid.hideColumn('u_kxxz', true);
            dgrid.hideColumn('u_kxxz_EXName', false);
            dgrid.hideColumn('amt', false);
            dgrid.hideColumn('u_yfkhxje', false);
            dgrid.hideColumn('u_yfkhxhje', false);
            dgrid.hideColumn('u_htmc', true);
            dgrid.hideColumn('u_htmc_EXName', true);
            dgrid.hideColumn('u_wldw', true);
            dgrid.hideColumn('u_wldw_EXName', true);
            dgrid.hideColumn('u_kxxz_2', true);
            dgrid.hideColumn('u_kxxz_2_EXName', true);
            dgrid.hideColumn('u_je', true);

        }
        if (ywlx != '1' && ywlx != '10' && ywlx != '17' && ywlx != '2' && ywlx != '' && ywlx != null) {
            //隐藏变更后往来明细列
            dgrid.hideColumn('u_kxxz', true);
            dgrid.hideColumn('u_kxxz_EXName', true);
            dgrid.hideColumn('amt', true);
            dgrid.hideColumn('u_yfkhxje', true);
            dgrid.hideColumn('u_yfkhxhje', true);
            dgrid.hideColumn('u_htmc', true);
            dgrid.hideColumn('u_htmc_EXName', true);
            dgrid.hideColumn('u_wldw', true);
            dgrid.hideColumn('u_wldw_EXName', true);
            dgrid.hideColumn('u_kxxz_2', true);
            dgrid.hideColumn('u_kxxz_2_EXName', true);
            dgrid.hideColumn('u_je', false);

            //隐藏原往来明细列
            dgrid1.hideColumn('u_kxxz_old', true);
            dgrid1.hideColumn('u_kxxz_old_EXName', true);
            dgrid1.hideColumn('amt', true);
            dgrid1.hideColumn('u_yfkhxje_old', true);
            dgrid1.hideColumn('u_yfkhxhje_old', true);
            dgrid1.hideColumn('u_htmc_old', true);
            dgrid1.hideColumn('u_htmc_old_EXName', true);
            dgrid1.hideColumn('u_wldw_old', true);
            dgrid1.hideColumn('u_wldw_old_EXName', true);
            dgrid1.hideColumn('u_kxxz2_old', true);
            dgrid1.hideColumn('u_kxxz2_old_EXName', true);
            dgrid1.hideColumn('u_je_old', false);
        }
    }

    if (otype == $Otype.EDIT) {
        mstform.getItem('phid_org').userSetReadOnly(true);
        mstform.getItem('phid_pc').userSetReadOnly(true);
        mstform.getItem('u_chzt').userSetReadOnly(true);
    }

    //选择采购入库触发
    mstform.getItem('u_crkdj').on('beforetriggerclick', function (obj) {
        var xm = mstform.getItem('phid_pc').getValue()
        var ch = mstform.getItem('u_chzt').getValue()
        var ywlx = mstform.getItem('u_ywlx').getValue()
        if (Ext.isEmpty(mstform.getItem('phid_pc').getValue())) {
            Ext.Msg.alert('提示', '请先维护工程项目');
            return false;
        }
        if (Ext.isEmpty(mstform.getItem('u_chzt').getValue())) {
            Ext.Msg.alert('提示', '请先选择冲红状态');
            return false;
        }
        if (Ext.isEmpty(mstform.getItem('u_ywlx').getValue())) {
            Ext.Msg.alert('提示', '请先选择业务类型');
            return false;
        }
        mstform.getItem('u_crkdj').setOutFilter({ phid_pc: xm, wrioffflg: ch, phid_transno: ywlx });
    });

    //带出入库单据中的往来明细
    mstform.getItem('u_crkdj').on('helpselected', function (obj) {
        var crkdj = mstform.getItem('u_crkdj').getValue()
        mstform.getItem('phid_pc').userSetReadOnly(true);
        mstform.getItem('phid_org').userSetReadOnly(true);
        mstform.getItem('u_chzt').userSetReadOnly(true);
        mstform.getItem('u_ywlx').userSetReadOnly(true);
        execServer('p_form0000700500_ywlx', { 'crk': crkdj }, function (res) {
            if (res.count > 0) {
                console.log('res====================>', res)
                var data = JSON.parse(res.data);
                var u_jglx = data[0].extendObjects.u_jglx;
                console.log("u_jglx:", u_jglx);
                mstform.getItem('u_jshj').setValue(data[0].extendObjects.tax_amount);
                mstform.getItem('u_ywlx').setValue(data[0].extendObjects.phid_transno);
                BatchBindCombox([mstform.getItem('u_ywlx')]);
                mstform.getItem('u_jglx').setValue(u_jglx);

            }
        });

        var ywlx = mstform.getItem('u_ywlx').getValue()
        if (ywlx == '1' || ywlx == '10' || ywlx == '17' || ywlx == '2') {
            execServer('p_form0000700500_wlmx1', { 'crk': crkdj }, function (res1) {
                dgrid1.hideColumn('u_kxxz_old', true);
                dgrid1.hideColumn('u_kxxz_old_EXName', false);
                dgrid1.hideColumn('amt', false);
                dgrid1.hideColumn('u_yfkhxje_old', false);
                dgrid1.hideColumn('u_yfkhxhje_old', false);
                dgrid1.hideColumn('u_htmc_old', true);
                dgrid1.hideColumn('u_htmc_old_EXName', true);
                dgrid1.hideColumn('u_wldw_old', true);
                dgrid1.hideColumn('u_wldw_old_EXName', true);
                dgrid1.hideColumn('u_kxxz2_old', true);
                dgrid1.hideColumn('u_kxxz2_old_EXName', true);
                dgrid1.hideColumn('u_je_old', true);

                dgrid.hideColumn('u_kxxz', true);
                dgrid.hideColumn('u_kxxz_EXName', false);
                dgrid.hideColumn('amt', false);
                dgrid.hideColumn('u_yfkhxje', false);
                dgrid.hideColumn('u_yfkhxhje', false);
                dgrid.hideColumn('u_htmc', true);
                dgrid.hideColumn('u_htmc_EXName', true);
                dgrid.hideColumn('u_wldw', true);
                dgrid.hideColumn('u_wldw_EXName', true);
                dgrid.hideColumn('u_kxxz_2', true);
                dgrid.hideColumn('u_kxxz_2_EXName', true);
                dgrid.hideColumn('u_je', true);

                dstore.removeAll();          //清空表体
                dstore1.removeAll();          //清空表体

                console.log('res1=================>', res1)
                //带出原往来明细
                if (res1.count > 0) {
                    var data = JSON.parse(res1.data)
                    console.log('data==================>', data)
                    var arr = new Array();
                    for (i = 0; i < res1.count; i++) {
                        arr.push({
                            textcol_2: data[i].extendObjects.phid,
                            u_kxxz_old: data[i].extendObjects.kxxz,
                            u_kxxz_old_EXName: data[i].extendObjects.kxxz_name,
                            amt: data[i].extendObjects.cgje,
                            u_yfkhxje_old: data[i].extendObjects.yfkhxje,
                            u_yfkhxhje_old: data[i].extendObjects.yfkhxhje,
                            remarks: data[i].extendObjects.remark,
                        });
                    }
                    console.log('arr==============>', arr)
                    dstore1.insert(dstore1.getCount(), arr);
                }


                //填入变更后往来明细		   
                var arr1 = new Array();
                if (res1.count > 0) {
                    for (i = 0; i < res1.count; i++) {
                        arr1.push({
                            textcol_2: data[i].extendObjects.phid,
                            u_kxxz: data[i].extendObjects.kxxz,
                            u_kxxz_EXName: data[i].extendObjects.kxxz_name,
                            amt: data[i].extendObjects.cgje,
                            u_yfkhxje: data[i].extendObjects.yfkhxje,
                            u_yfkhxhje: data[i].extendObjects.yfkhxhje,
                            remarks: data[i].extendObjects.remark,
                            u_ymx: '1'
                        });
                    }
                    dstore.insert(dstore1.getCount(), arr1);
                }
            });
        }

        else {
            execServer('p_form0000700500_wlmx2', { 'crk': crkdj }, function (res1) {
                //隐藏变更后往来明细列
                dgrid.hideColumn('u_kxxz', true);
                dgrid.hideColumn('u_kxxz_EXName', true);
                dgrid.hideColumn('amt', true);
                dgrid.hideColumn('u_yfkhxje', true);
                dgrid.hideColumn('u_yfkhxhje', true);
                dgrid.hideColumn('u_htmc', true);
                dgrid.hideColumn('u_htmc_EXName', false);
                dgrid.hideColumn('u_wldw', true);
                dgrid.hideColumn('u_wldw_EXName', false);
                dgrid.hideColumn('u_kxxz_2', true);
                dgrid.hideColumn('u_kxxz_2_EXName', false);
                dgrid.hideColumn('u_je', false);

                //隐藏原往来明细列
                dgrid1.hideColumn('u_kxxz_old', true);
                dgrid1.hideColumn('u_kxxz_old_EXName', true);
                dgrid1.hideColumn('amt', true);
                dgrid1.hideColumn('u_yfkhxje_old', true);
                dgrid1.hideColumn('u_yfkhxhje_old', true);
                dgrid1.hideColumn('u_htmc_old', true);
                dgrid1.hideColumn('u_htmc_old_EXName', true);
                dgrid1.hideColumn('u_wldw_old', true);
                dgrid1.hideColumn('u_wldw_old_EXName', true);
                dgrid1.hideColumn('u_kxxz2_old', true);
                dgrid1.hideColumn('u_kxxz2_old_EXName', true);
                dgrid1.hideColumn('u_je_old', false);


                dstore1.removeAll();          //清空表体
                dstore.removeAll();          //清空表体

                //带出原往来明细	
                var arr = new Array();
                if (res1.count > 0) {
                    var data = JSON.parse(res1.data)
                    for (i = 0; i < res1.count; i++) {
                        arr.push({
                            textcol_2: data[i].extendObjects.phid,
                            u_htmc_old: data[i].extendObjects.htmc,
                            u_htmc_old_EXName: data[i].extendObjects.htmc_name,
                            u_wldw_old: data[i].extendObjects.wldw,
                            u_wldw_old_EXName: data[i].extendObjects.wldw_name,
                            u_kxxz2_old: data[i].extendObjects.kxxz,
                            u_kxxz2_old_EXName: data[i].extendObjects.kxxz_name,
                            u_je_old: data[i].extendObjects.amt,
                            remarks: data[i].extendObjects.remark,
                        });
                    }
                    dstore1.insert(dstore1.getCount(), arr);
                }

                var arr1 = new Array();
                if (res1.count > 0) {
                    var data = JSON.parse(res1.data)
                    for (i = 0; i < res1.count; i++) {
                        arr1.push({
                            textcol_2: data[i].extendObjects.phid,
                            u_htmc: data[i].extendObjects.htmc,
                            u_htmc_EXName: data[i].extendObjects.htmc_name,
                            u_wldw: data[i].extendObjects.wldw,
                            u_wldw_EXName: data[i].extendObjects.wldw_name,
                            u_kxxz_2: data[i].extendObjects.kxxz,
                            u_kxxz_2_EXName: data[i].extendObjects.kxxz_name,
                            u_je: data[i].extendObjects.amt,
                            remarks: data[i].extendObjects.remark,
                            u_ymx: '1'
                        });
                    }
                    dstore.insert(dstore1.getCount(), arr1);
                }
            });
        }


    });


    tabPanel.on('tabchange', function (tabchange, newCard, oldCard, eOpts) {
        //切换页面为“原往来明细”，隐藏按钮
        if (newCard.id == 'p_form0000700500_d1') {
            var Toolbar = Ext.getCmp('toolbar');
            Toolbar.get("addrow").hide();
            Toolbar.get("insertrow").hide();
            Toolbar.get("deleterow").hide();
        };

        if (newCard.id == 'p_form0000700500_d') {
            var Toolbar = Ext.getCmp('toolbar');
            Toolbar.get("addrow").show();
            Toolbar.get("insertrow").show();
            Toolbar.get("deleterow").show();
        }
    })



    //增行自动生成phid
    Toolbar.get('addrow').on('click', function () {
        var sl = dstore.getCount() - 1
        execServer('p_form0000700500_phid', {}, function (res1) {
            if (res1.count > 0) {
                var data = JSON.parse(res1.data)
                dstore.getAt(sl).set('textcol_2', data[0].extendObjects.phid)
            }
        });
        dstore.getAt(sl).set('u_ymx', '0')
    });
}