function allReadyEdit() {
    //获取摊销单表头
    var mstform = Ext.getCmp('p_form0000600080_m');
    var dgrid = Ext.getCmp('p_form0000600080_d');
    var dstore = dgrid.store;
    var dgrid2 = Ext.getCmp('p_form0000600080_d1');
    var dstore2 = dgrid.store;
    var Toolbar = Ext.getCmp('toolbar');
    console.log('imp_schemeid-------------', imp_schemeid)
    //默认隐藏增行按钮
    Toolbar.get('addrow').hide();
    //研发立项为必输项
    //mstform.getItem('u_yflx').userSetMustInput(true);
    //摘要为必输项
    mstform.getItem('u_gsgt').userSetMustInput(true);
    //浪潮推送金额 必输
    mstform.getItem('u_wzfldje').userSetMustInput(true);
    //标题设置为不可见
    mstform.getItem('bill_name').setVisible(false);
    //审核人设置为不可见
    mstform.getItem('phid_app').setVisible(false);
    //录入人设置为不可见
    mstform.getItem('phid_fill_psn').setVisible(false);
    //同步浪潮摊销单标志设置为只读
    mstform.getItem('u_istbinspur').userSetReadOnly(true);
    //同步浪潮摊销单时间设置为只读
    mstform.getItem('u_tbinspurtime').userSetReadOnly(true);
    //同步浪潮物资发料单标志设置为只读
    mstform.getItem('u_istbinspur_fld').userSetReadOnly(true);
    //同步浪潮物资发料单时间设置为只读
    mstform.getItem('u_tbinspurtime_fld').userSetReadOnly(true);
    //合同编码设置为只读
    mstform.getItem('htbm').userSetReadOnly(true);
    //所属组织设置为只读
    mstform.getItem('phid_org').userSetReadOnly(true);
    //工程项目设置为必输
    mstform.getItem('phid_pc').userSetMustInput(true);
    //仓库设置为必输
    mstform.getItem('ck').userSetMustInput(true);
    //供应商设置为必输
    mstform.getItem('vendor_id').userSetMustInput(true);
    //合同名称设置为必输
    mstform.getItem('htmc').userSetMustInput(true);
    //浪潮入库摊销只读
    mstform.getItem('u_lcts').userSetReadOnly(true);
    //低值易耗品类型只读
    mstform.getItem('u_dzyhplx').userSetReadOnly(true);
    //通用业务单默认隐藏
    mstform.getItem('u_tyywd').setVisible(false);
    //点验单浪潮业务单元设置为只读
    mstform.getItem('u_dydlcywdy').userSetReadOnly(true);
    //摊销单浪潮业务单元设置为只读
    mstform.getItem('u_txdlcywdy').userSetReadOnly(true);
    //点验单核算部门助记码设置为只读
    mstform.getItem('u_dydlchsbmzjm').userSetReadOnly(true);
    //摊销单核算部门助记码设置为只读
    mstform.getItem('u_txdlchsbmzjm').userSetReadOnly(true);
    //gs物资发料设置为必输
    dgrid.setMustInputCol('u_wzfldfyxm_name', true);
    //物资编码设置为只读
    dgrid.setReadOnlyCol('wzbm', true);
    //批号设置为只读
    dgrid.setReadOnlyCol('ph', true);
    //数量设置为只读
    dgrid.setReadOnlyCol('qty', true);
    //不含税单价设置为只读
    dgrid.setReadOnlyCol('bhsdj', true);
    //含税单价设置为只读
    dgrid.setReadOnlyCol('hsdj', true);
    //价税合计设置为只读
    dgrid.setReadOnlyCol('amt', true);
    //税率设置为只读
    dgrid.setReadOnlyCol('sl', true);
    //税额设置为只读
    dgrid.setReadOnlyCol('se', true);
    //本次摊销比例设置为必输
    dgrid.setMustInputCol('bctxbl', true);
    //本次摊销金额设置为只读
    dgrid.setReadOnlyCol('bctxje', true);
    //本次摊销含税金额设置为只读
    dgrid.setReadOnlyCol('u_bctxhsje', true);
    //浪潮摊销金额设置为必输
    dgrid.setMustInputCol('u_lctxje', true);
    //已摊销比例设置为只读
    dgrid.setReadOnlyCol('ytxbl', true);
    //已摊销金额设置为只读
    dgrid.setReadOnlyCol('ytxje', true);
    //已摊销含税金额设置为只读
    dgrid.setReadOnlyCol('u_ytxhsje', true);
    //待摊销比例设置为只读
    dgrid.setReadOnlyCol('dtxbl', true);
    //待摊销金额设置为只读
    dgrid.setReadOnlyCol('dtxje', true);
    //待摊销含税金额设置只读
    dgrid.setReadOnlyCol('u_dtxhsje', true);

    if (!Ext.isEmpty(Toolbar) && otype == $Otype.VIEW) {
        Toolbar.insert(11, {
            itemId: "push1",
            text: "推送浪潮摊销表",
            width: this.itemWidth,
            //x: 200,
            //border: '1px',
            iconCls: "icon-New"
        });

        Toolbar.items.get('push1').on('click', function () {
            if (mstform.getItem('u_txdlcywdy').getValue() && mstform.getItem('u_txdlchsbmzjm').getValue()) {
            } else {
                Ext.MessageBox.confirm('提示', '摊销单没有对照不允许推送浪潮！', function (e) {

                });
                return;
            }

            /*AJAX请求start*/
            Ext.Ajax.request({
                method: 'get',
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                url: "http://172.20.65.5:30599/new_esey/lcApi/pushTXB?phid=" + busid,
                async: false, //同步请求
                disableCaching: false, // 添加这行来阻止_dc参数
                success: function (response) {
                    window.wait = false;
                    var resdata = JSON.parse(response.responseText);
                    var status = resdata["status"];
                    var message = resdata["message"];
                    if (status == "success") {
                        Ext.MessageBox.alert(Lang.Notes || '提示', "推送成功.", function () { });
                    } else {
                        Ext.MessageBox.alert(Lang.Notes || '提示', message, function () { });
                    }
                },
                failure: function (response, opts) {
                    window.wait = false;
                    var resdata = JSON.parse(response.responseText);
                    var status = resdata["status"];
                    var message = resdata["message"];
                    Ext.MessageBox.alert(Lang.Notes || '提示', message);
                }
            });
            /*AJAX请求end*/
        });

        Toolbar.insert(12, {
            itemId: "push",
            text: "推送浪潮物资发料单",
            width: this.itemWidth,
            //x: 200,
            //border: '1px',
            iconCls: "icon-New"
        });
        console.log("Toolbar.items.get('push'):", Toolbar.items.get('push'));

        console.log("Toolbar.items.get('push'):", Toolbar.items.get('push'));
        Toolbar.items.get('push').on('click', function () {
            if (mstform.getItem('u_dydlcywdy').getValue() && mstform.getItem('u_dydlcywdy').getValue()) {
            } else {
                Ext.MessageBox.confirm('提示', '发料单没有对照不允许推送浪潮！', function (e) {

                });
                return false;
            }

            /*AJAX请求start*/
            Ext.Ajax.request({
                method: 'get',
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                url: "http://172.20.65.5:30599/new_esey/lcApi/pushFLD?phid=" + busid,
                async: false, //同步请求
                disableCaching: false, // 添加这行来阻止_dc参数
                success: function (response) {
                    window.wait = false;
                    var resdata = JSON.parse(response.responseText);
                    var status = resdata["status"];
                    var message = resdata["message"];
                    if (status == "success") {
                        Ext.MessageBox.alert(Lang.Notes || '提示', "推送成功.", function () { });
                    } else {
                        Ext.MessageBox.alert(Lang.Notes || '提示', message, function () { });
                    }
                },
                failure: function (response, opts) {
                    window.wait = false;
                    var resdata = JSON.parse(response.responseText);
                    var status = resdata["status"];
                    var message = resdata["message"];
                    Ext.MessageBox.alert(Lang.Notes || '提示', message);
                }
            });
            /*AJAX请求end*/
        });
    }

    if (otype == $Otype.VIEW) {
        mstform.on('dataready', function () {
            var u_istbinspur = mstform.getItem('u_istbinspur').getValue();
            var u_istbinspur_fld = mstform.getItem('u_istbinspur_fld').getValue();
            if (u_istbinspur != 0 || u_istbinspur != 4 || u_istbinspur != 5 || u_istbinspur != null) {
                console.log("mstform.getItem('app_status').getValue()", mstform.getItem('app_status').getValue())
                if (mstform.getItem('app_status').getValue() == '1') {
                    Toolbar.get('applycheck').hide()
                }
            }
            if (u_istbinspur_fld != 0 || u_istbinspur_fld != 4 || u_istbinspur_fld != 5 || u_istbinspur_fld != null) {
                if (mstform.getItem('app_status').getValue() == '1') {
                    Toolbar.get('applycheck').hide()
                }
            }
        });
    }

    /*增加一个复制按钮start*/
    var Toolbar = Ext.getCmp('toolbar');
    mstform.on('dataready', function () {
        console.log("mstform.getItem('u_istbinspur_fld').getValue() :", mstform.getItem('u_istbinspur_fld').getValue());
        console.log("mstform.getItem('u_istbinspur').getValue():", mstform.getItem('u_istbinspur').getValue());
        if (mstform.getItem('u_istbinspur_fld').getValue() == '1' || mstform.getItem('u_istbinspur')
            .getValue() == '1') {
            Ext.getCmp('toolbar').get('check').disable();
        }
        if (otype == $Otype.VIEW) {
            if (mstform.getItem('app_status').getValue() == '0') {
                console.log("该单据未审核，不能推送");
                Toolbar.items.get('push').disable();

                Toolbar.items.get('push1').disable();
            } else {
                if (mstform.getItem('u_istbinspur').getValue() == '0' || mstform.getItem('u_istbinspur').getValue() == '4' || mstform.getItem('u_istbinspur').getValue() == null) {
                    Toolbar.items.get('push1').enable();
                } else {
                    Toolbar.items.get('push1').disable();
                    console.log("该单据同步浪潮摊销单标志不为0、4或空,不能推送");
                }
            }


        }

    });
    Toolbar.insert(1, {
        itemId: "copy",
        text: "复制",
        width: this.itemWidth,
        iconCls: "icon-New"
    });
    /*增加一个复制按钮end*/

    /*增加一个重新计算start*/
    Toolbar.insert(3, {
        itemId: 'summary',
        text: '重新计算',
        width: this.itemWidth,
        iconCls: 'icon-ArrowSwitch',
    });
    /*增加一个重新计算end*/

    /*添加重新汇总字段start*/

    //重新计算触发计算比例
    Toolbar.items.get('summary').on('click', function () {
        //点击按钮检测事件
        var a = dgrid.getStore().getRange(0, dstore.getCount() - 1); //获取表体的数据
        if (a.length == '0') {

        } else {

            for (var i = 0; i < dstore.getCount(); i++) {
                var rel_key1 = "'" + a[i].get('rel_key1') + "'"; //获取来源主键1 对应采购入库的phid
                console.log('rel_key1------------->', rel_key1)
                execServer(
                    'p_form0000600080_rel_key1', {
                    rel_key1: rel_key1,
                },
                    function (res) {
                        if (res.count > 0) {
                            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            a[i].set('ytxbl', data[0].extendObjects.ytxbl);
                            a[i].set('ytxje', data[0].extendObjects.ytxje);
                            a[i].set('u_ytxhsje', data[0].extendObjects.u_ytxhsje);
                        }
                    }
                );
            }
        }
    });
    /*添加重新汇总字段end*/

    /*工程项目字段通用帮助选择前触发 start*/
    //项目名称选择前触发
    mstform.getItem('phid_pc').addListener('beforetriggerclick', function () {
        var pocode = mstform.getItem('phid_org').getValue();
        mstform.getItem('phid_pc').setOutFilter({
            cat_phid: pocode,
        });
    });
    /*工程项目字段通用帮助选择前触发 end*/

    /*仓库字段选择前触发start*/
    mstform
        .getItem('ck')
        .on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
            if (Ext.isEmpty(mstform.getItem('phid_pc').getValue())) {
                Ext.Msg.alert('提示', '请先选择工程项目');
                return false;
            }
            var pc = mstform.getItem('phid_pc').getValue();
            mstform.getItem('ck').setOutFilter({
                phid_pc: pc,
            });
        });

    /*仓库字段选择前触发end*/

    /*合同名称字段选择前触发start*/
    mstform.getItem('htmc').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        if (Ext.isEmpty(mstform.getItem('phid_pc').getValue())) {
            Ext.Msg.alert('提示', '请先选择工程项目');
            return false;
        }
        var pc = mstform.getItem('phid_pc').getValue();
        mstform.getItem('htmc').setOutFilter({
            phid_pc: pc,
        });
    });

    /*合同名称字段选择前触发end*/

    /*合同名称选择后触发start*/
    mstform.getItem('htmc').addListener('helpselected', function () {
        var htmc = mstform.getItem('htmc').getValue();
        execServer(
            'p_form0000600080_htmc', {
            phid: htmc,
        },
            function (res) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (res.count > 0) {
                    mstform.getItem('htbm').setValue(data[0].extendObjects.htbm);
                    mstform
                        .getItem('vendor_id')
                        .setValue(data[0].extendObjects.sencomp);
                    BatchBindCombox([
                        mstform
                            .getItem('vendor_id')
                            .setValue(data[0].extendObjects.sencomp),
                    ]);
                }
            }
        );
    });
    /*合同名称选择后触发end*/

    /*表体中的根据本次摊销比例 计算出 本次摊销金额，待摊销比例，待摊销金额 start*/
    if (otype == $Otype.ADD || otype == $Otype.EDIT || otype == $Otype.VIEW) {

        dgrid.addListener('edit', function (editor, e) {
            if (e.originalValue == e.value) {
                //判断原值与新值是否相同，如果相同则返回 *return 返回
                return;
            }
            if (otype == $Otype.ADD || otype == $Otype.EDIT) {
                var a = dgrid.getStore().getRange(0, dstore.getCount() - 1); //获取表体的数据
                for (var i = 0; i < dstore.getCount(); i++) {
                    var rel_key1 = "'" + a[i].get('rel_key1') + "'"; //获取来源主键1 对应采购入库的phid
                    execServer(
                        'rel_key1', {
                        rel_key1: rel_key1,
                    },
                        function (res) {
                            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            if (res.count > 0) {
                                a[i].set('ytxbl', data[0].extendObjects.ytxbl);
                                a[i].set('ytxje', data[0].extendObjects.ytxje);
                                a[i].set('u_ytxhsje', data[0].extendObjects.u_ytxhsje);
                            }
                        }
                    );
                }

            }
            //监听本次摊销金额字段变化
            if (e.field == 'bctxbl') {
                var record = e.record; //当前行用对像record表示
                //如果本次摊销比例+已摊销比例到100的情况下
                if (Ext.Number.from(record.get('bctxbl'), 0) + Ext.Number.from(record.get('ytxbl'), 0) == 1) {

                    //不含税金额-已摊销金额=本次摊销金额
                    record.set('bctxje', Ext.Number.from(record.get('amt'), 0) - Ext.Number.from(record.get(
                        'ytxje'), 0));
                    //价税合计-已摊销含税金额=本次摊销含税金额
                    record.set('u_bctxhsje', Ext.Number.from(record.get('jshj'), 0) - Ext.Number.from(record
                        .get('u_ytxhsje'), 0));
                    //待摊销比例 =0
                    record.set('dtxbl', 0);
                    //待摊销金额=0
                    record.set('dtxje', 0);
                    //待摊销金额=0
                    record.set('u_dtxhsje', 0);
                    if (mstform.getItem('u_wzfldje').getValue() == '1') {
                        //价税合计-已摊销含税金额=本次摊销含税金额
                        record.set('u_lctxje', Ext.Number.from(record.get('jshj'), 0) - Ext.Number.from(record
                            .get('u_ytxhsje'), 0));
                    } else {
                        //不含税金额-已摊销金额=本次摊销金额
                        record.set('u_lctxje', Ext.Number.from(record.get('amt'), 0) - Ext.Number.from(record
                            .get('ytxje'), 0));
                    }

                } else {
                    //本次摊销比例*不含税金额=本次摊销金额
                    record.set('bctxje', (Ext.Number.from(record.get('bctxbl'), 0) * Ext.Number.from(record.get(
                        'amt'), 0)).toFixed(2));
                    //本次摊销比例*价税合计=本次摊销含税金额
                    record.set('u_bctxhsje', (Ext.Number.from(record.get('bctxbl'), 0) * Ext.Number.from(record
                        .get('jshj'), 0)).toFixed(2));
                    //1-（本次摊销比例+已摊销比例）=待摊销比例
                    record.set('dtxbl', 1 - (Ext.Number.from(record.get('ytxbl'), 0) + Ext.Number.from(record
                        .get('bctxbl'), 0)));
                    //不含税金额 - (本次摊销金额+已摊销金额)=待摊销金额
                    record.set('dtxje', Ext.Number.from(record.get('amt'), 0) - (Ext.Number.from(record.get(
                        'ytxje'), 0) + Ext.Number.from(record.get('bctxje'), 0)));
                    //价税合计 - (本次摊销含税金额+已摊销含税金额)=待摊销含税金额
                    record.set('u_dtxhsje', Ext.Number.from(record.get('jshj'), 0) - (Ext.Number.from(record
                        .get('u_ytxhsje'), 0) + Ext.Number.from(record.get('u_bctxhsje'), 0)));
                    if (mstform.getItem('u_wzfldje').getValue() == '1') {
                        //本次摊销比例*价税合计=本次摊销含税金额
                        record.set('u_lctxje', (Ext.Number.from(record.get('bctxbl'), 0) * Ext.Number.from(
                            record.get('jshj'), 0)).toFixed(2));
                    } else {
                        //本次摊销比例*不含税金额=本次摊销金额
                        record.set('u_lctxje', (Ext.Number.from(record.get('bctxbl'), 0) * Ext.Number.from(
                            record.get('amt'), 0)).toFixed(2));
                    }
                }

            }
        });
    }
    /*表体中的根据本次摊销比例 计算出 本次摊销金额，已摊销比例，已摊销金额，待摊销比例，待摊销金额 end*/

    // 初始进入页面判断 显示隐藏字段
    if (mstform != '' || mstform != 'undefined') {
        mstform.getItem('u_fjzs').setValue(1);

    }

    if (otype == $Otype.VIEW) {
        if (imp_schemeid == '224220906001001' ||
            imp_schemeid == '224220915001002' ||
            imp_schemeid == '221019004502' ||
            imp_schemeid == '221019009004' ||
            imp_schemeid == '569000000000008') {
            Toolbar.get('push').hide();
        }
    }

    mstform.on('dataready', function () {
        if (imp_schemeid == '221019004002' || imp_schemeid == '221019004502' || imp_schemeid ==
            '221019010004' || imp_schemeid == '221019009004' || imp_schemeid == '569000000000007' ||
            imp_schemeid == '569000000000008' || imp_schemeid == '569000000000009' || imp_schemeid ==
            '569000000000010'
        ) {

            mstform.getItem('vendor_id').userSetMustInput(false);
            mstform.getItem('htmc').userSetMustInput(false);

        }

    });


    /*当浪潮入库为物资发料单摊销单显示两个摘要，当为一个摊销单的时候为一个摘要start*/
    mstform.getItem('u_lcts').addListener('change', function () {
        if (mstform.getItem('u_lcts').getValue() == '2') {
            //GS物资发料单摘要设置为可见
            mstform.getItem('u_gswzfldzy').setVisible(true);
            //GS物资发料单摘要设置为必输
            mstform.getItem('u_gswzfldzy').userSetMustInput(true);

        } else {
            //GS物资发料单摘要设置为不可见
            mstform.getItem('u_gswzfldzy').setVisible(false);
            //GS物资发料单摘要设置为不必输
            mstform.getItem('u_gswzfldzy').userSetMustInput(false);
        }

    });
    /*当浪潮入库为物资发料单摊销单显示两个摘要，当为一个摊销单的时候为一个摘要end*/

    /*当更换工程项目的时候承揽合同名称置空start*/
    mstform.getItem('phid_pc').addListener('helpselected', function () {
        mstform.getItem('htmc').setValue('');
        mstform.getItem('htbm').setValue('');
        mstform.getItem('ck').setValue('');
    });
    /*当更换工程项目的时候承揽合同名称置空end*/

    /*根据方案判断浪潮入库摊销字段 是 1还是2start*/
    //采购入库低值易耗发料摊销单   + 采购入库自有周转发料摊销单
    if (imp_schemeid == '224210827000001' || imp_schemeid == '224220915002001' || imp_schemeid == '221019004002' ||
        imp_schemeid == '221019010004' || imp_schemeid == '569000000000009' || imp_schemeid == '569000000000007') {
        if (imp_schemeid == '221019004002' || imp_schemeid == '221019010004' || imp_schemeid == '569000000000009' ||
            imp_schemeid == '569000000000007') {
            mstform.getItem('htbm').userSetMustInput(false);
            mstform.getItem('vendor_id').userSetMustInput(false);
            mstform.getItem('htbm').setVisible(false);
            mstform.getItem('htmc').userSetMustInput(false);
            mstform.getItem('htmc').setVisible(false);
            if (imp_schemeid == '569000000000009' || imp_schemeid == '569000000000007') {
                mstform.getItem('u_tyywd').userSetMustInput(false);
                mstform.getItem('u_tyywd').setVisible(true);
            }
        }
        //材料类别必输
        dgrid.setMustInputCol('u_cllb_EXName', true);
        //核算项目必输
        dgrid.setMustInputCol('u_hsxm_EXName', true);
        //专业工程必输
        dgrid.setMustInputCol('u_zygc_EXName', true);
        //板块必输
        dgrid.setMustInputCol('u_bk_EXName', true);
        //部门必输
        dgrid.setMustInputCol('u_bm_EXName', true);
        //方案  采购入库自有周转发料摊销单
        if (imp_schemeid == '224220915002001' || imp_schemeid == '221019010004' || imp_schemeid == '569000000000009') {
            mstform.getItem('u_dzyhplx').setValue('3')
        } else {
            mstform.getItem('u_dzyhplx').setValue('1')
        }
        mstform.getItem('u_lcts').setValue('2');
        //采购入库低值易耗摊销单   + 采购入库自有周转摊销单
    } else if (imp_schemeid == '224220906001001' || imp_schemeid == '224220915001002' || imp_schemeid ==
        '221019004502' || imp_schemeid == '221019009004' || imp_schemeid == '569000000000008' || imp_schemeid ==
        '569000000000010') {
        if (imp_schemeid == '221019004502' || imp_schemeid == '221019009004' || imp_schemeid == '569000000000008' ||
            imp_schemeid == '569000000000010') {
            mstform.getItem('htbm').userSetMustInput(false);
            mstform.getItem('vendor_id').userSetMustInput(false);
            mstform.getItem('htbm').setVisible(false);
            mstform.getItem('htmc').userSetMustInput(false);
            mstform.getItem('htmc').setVisible(false);

            if (imp_schemeid == '569000000000008' || imp_schemeid == '569000000000010') {
                mstform.getItem('u_tyywd').userSetMustInput(false);
                mstform.getItem('u_tyywd').setVisible(true);
            }
        }

        //材料类别必输
        dgrid.setMustInputCol('u_cllb_EXName', true);
        //费用项目必输
        dgrid.setMustInputCol('u_fyxm_EXName', true);
        //核算项目必输
        dgrid.setMustInputCol('u_hsxm_EXName', true);
        //部门必输
        dgrid.setMustInputCol('u_bm_EXName', true);
        //采购入库自有周转摊销单
        if (imp_schemeid == '224220915001002' || imp_schemeid == '221019009004' || imp_schemeid == '569000000000010') {
            mstform.getItem('u_dzyhplx').setValue('3')
        } else {
            mstform.getItem('u_dzyhplx').setValue('1')
        }
        mstform.getItem('u_lcts').setValue('1');

    } else {

        mstform.getItem('u_lcts').setValue('');

    }
    /*根据方案判断浪潮入库摊销字段 是 1还是2end*/

    /*部门选择前根据组织过滤部门触发start*/
    dgrid.getColumn('u_bm_EXName').getEditor().on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        var ocode = mstform.getItem('phid_org').getValue();
        if (!ocode) {
            alert('请先选择单位名称');
            return false;
        } else {
            dgrid.getColumn('u_bm_EXName').getEditor().setOutFilter({
                parent_orgid: ocode
            });
        }
    });
    /*部门选择前根据组织过滤部门触发end*/

    /*部门选择后根据组织过滤部门触发start*/
    dgrid.getColumn('u_bm_EXName').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        // 选择gs单位 带出 浪潮的数据
        var data = dgrid.getSelectionModel().getSelection();
        var u_bm = data[0].get('u_bm');
        execServer('p_form0000600080_ngdept', {
            dept: u_bm
        }, function (res) {
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (data1.length == 1) {
                    if (data1[0].extendObjects.user_lcywdy) {
                        data[0].set('u_lcywdy', data1[0].extendObjects.user_lcywdy)
                    } else {
                        data[0].set('u_lcywdy', null);
                        Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                    }
                } else {
                    data[0].set('u_lcywdy', null);
                    Ext.Msg.alert('提示', '请联系管理员处理，部门对照存在重复');
                }
            } else {
                data[0].set('u_lcywdy', null);
                Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
            }
        });
        execServer('p_form0000600080_ngdeptlc', {
            dept: u_bm
        }, function (res) {

            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (data1.length == 1) {
                    if (data1[0].extendObjects.user_mnemcodeinaccdepart) {
                        data[0].set('u_mnemcodeinaccdepart', data1[0].extendObjects.user_mnemcodeinaccdepart)
                    } else {
                        data[0].set('u_mnemcodeinaccdepart', null);
                        Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                    }
                } else {
                    data[0].set('u_mnemcodeinaccdepart', null);
                    Ext.Msg.alert('提示', '请联系管理员处理，部门对照存在重复');
                }
            } else {
                data[0].set('u_mnemcodeinaccdepart', null);
                Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
            }
        });
    });
    /*部门选择后根据组织过滤部门触发end*/

    /*低值易耗品摊销单物资明细表隐藏增行往来明细增行按钮start*/
    document.getElementById('p_form0000600080_d').onclick = function () {
        Toolbar.get('addrow').hide(); //隐藏增行 
    }
    document.getElementById('p_form0000600080_d1').onclick = function () {
        if (mstform.getItem('u_lcts').getValue() == '2') {
            Toolbar.get('addrow').show(); //显示增行 
        } else {
            Toolbar.get('addrow').hide(); //隐藏增行 
        }

    }
    /*低值易耗品摊销单物资明细表隐藏增行往来明细增行按钮end*/

    /*复制按钮单击，会查到第1条数据的字段值然后赋值给表体中的每条数据start*/
    Toolbar.items.get('copy').on('click', function () {

        //获取表体数据
        var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
        //费用项目字段
        var u_fyxm = a[0].get('u_fyxm');
        var u_fyxmname = a[0].get('u_fyxm_EXName');
        //gs物资发料费用项目
        var u_wzfldfyxm = a[0].get('u_wzfldfyxm');
        var u_wzfldfyxmname = a[0].get('u_wzfldfyxm_EXName');
        //核算项目字段
        var u_hsxm = a[0].get('u_hsxm');
        var u_hsxmname = a[0].get('u_hsxm_EXName');
        //专业工程字段
        var u_zygc = a[0].get('u_zygc');
        var u_zygcname = a[0].get('u_zygc_EXName');
        //板块字段
        var u_bk = a[0].get('u_bk');
        var u_bkname = a[0].get('u_bk_EXName');
        //往来单位字段
        var u_wldw = a[0].get('u_wldw');
        var u_wldwname = a[0].get('u_wldw_EXName');
        //部门字段
        var u_bm = a[0].get('u_bm');
        var u_bmname = a[0].get('u_bm_EXName');
        //本次摊销比例
        var bctxbl = a[0].get('bctxbl');

        for (var i = 1; i < a.length; i++) {
            a[i].set('u_wzfldfyxm', u_wzfldfyxm);
            a[i].set('u_wzfldfyxm_EXName', u_wzfldfyxmname);

            a[i].set('u_fyxm', u_fyxm);
            a[i].set('u_fyxm_EXName', u_fyxmname);
            a[i].set('u_hsxm', u_hsxm);
            a[i].set('u_hsxm_EXName', u_hsxmname);
            a[i].set('u_zygc', u_zygc);
            a[i].set('u_zygc_EXName', u_zygcname);
            a[i].set('u_bk', u_bk);
            a[i].set('u_bk_EXName', u_bkname);
            a[i].set('u_wldw', u_wldw);
            a[i].set('u_wldw_EXName', u_wldwname);
            a[i].set('u_bm', u_bm);
            a[i].set('u_bm_EXName', u_bmname);
            if (!Ext.isEmpty(u_bm)) {
                execServer('p_form0000600080_ngdept', {
                    dept: a[i].get('u_bm')
                }, function (res) {
                    if (res.count > 0) {
                        var data = JSON.parse(res.data);
                        if (data.length == 1) {
                            if (data[0].extendObjects.user_lcywdy) {
                                a[i].set('u_lcywdy', data[0].extendObjects.user_lcywdy)
                            } else {
                                a[i].set('u_lcywdy', null);
                                Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                            }
                        } else {
                            a[i].set('u_lcywdy', null);
                            Ext.Msg.alert('提示', '请联系管理员处理，部门对照存在重复');
                        }
                    } else {
                        a[i].set('u_lcywdy', null);
                        Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                    }
                });
                execServer('p_form0000600080_ngdeptlchsbm', {
                    dept: a[i].get('u_bm')
                }, function (res) {
                    if (res.count > 0) {
                        var data = JSON.parse(res.data);
                        if (data.length == 1) {
                            if (data[0].extendObjects.user_mnemcodeinaccdepart) {
                                a[i].set('u_mnemcodeinaccdepart', data[0].extendObjects.user_mnemcodeinaccdepart)
                            } else {
                                a[i].set('u_mnemcodeinaccdepart', null);
                                Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                            }
                        } else {
                            a[i].set('u_mnemcodeinaccdepart', null);
                            Ext.Msg.alert('提示', '请联系管理员处理，部门对照存在重复');
                        }
                    } else {
                        a[i].set('u_mnemcodeinaccdepart', null);
                        Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                    }
                })
            }
            a[i].set('bctxbl', bctxbl);

            //如果本次摊销比例+已摊销比例到100的情况下
            if (Ext.Number.from(a[i].get('bctxbl'), 0) + Ext.Number.from(a[i].get('ytxbl'), 0) == 1) {
                //不含税金额-已摊销金额=本次摊销金额
                a[i].set('bctxje', Ext.Number.from(a[i].get('amt'), 0) - Ext.Number.from(a[i].get('ytxje'), 0));
                //价税合计-已摊销含税金额=本次摊销含税金额
                a[i].set('u_bctxhsje', Ext.Number.from(a[i].get('jshj'), 0) - Ext.Number.from(a[i].get(
                    'u_ytxhsje'), 0));
                //待摊销比例 =0
                a[i].set('dtxbl', 0);
                //待摊销金额=0
                a[i].set('dtxje', 0);
                //待摊销金额=0
                a[i].set('u_dtxhsje', 0);
                if (mstform.getItem('u_wzfldje').getValue() == '1') {
                    //价税合计-已摊销含税金额=本次摊销含税金额
                    a[i].set('u_lctxje', Ext.Number.from(a[i].get('jshj'), 0) - Ext.Number.from(a[i].get(
                        'u_ytxhsje'), 0));
                } else {
                    //不含税金额-已摊销金额=本次摊销金额
                    a[i].set('u_lctxje', Ext.Number.from(a[i].get('amt'), 0) - Ext.Number.from(a[i].get(
                        'ytxje'), 0));
                }

            } else {
                //本次摊销比例*不含税金额=本次摊销金额
                a[i].set('bctxje', (Ext.Number.from(a[i].get('bctxbl'), 0) * Ext.Number.from(a[i].get('amt'),
                    0)).toFixed(2));
                //本次摊销比例*价税合计=本次摊销含税金额
                a[i].set('u_bctxhsje', (Ext.Number.from(a[i].get('bctxbl'), 0) * Ext.Number.from(a[i].get(
                    'jshj'), 0)).toFixed(2));
                //1-（本次摊销比例+已摊销比例）=待摊销比例
                a[i].set('dtxbl', 1 - (Ext.Number.from(a[i].get('ytxbl'), 0) + Ext.Number.from(a[i].get(
                    'bctxbl'), 0)));
                //不含税金额 - (本次摊销金额+已摊销金额)=待摊销金额
                a[i].set('dtxje', Ext.Number.from(a[i].get('amt'), 0) - (Ext.Number.from(a[i].get('ytxje'), 0) +
                    Ext.Number.from(a[i].get('bctxje'), 0)));
                //价税合计 - (本次摊销含税金额+已摊销含税金额)=待摊销含税金额
                a[i].set('u_dtxhsje', Ext.Number.from(a[i].get('jshj'), 0) - (Ext.Number.from(a[i].get(
                    'u_ytxhsje'), 0) + Ext.Number.from(a[i].get('u_bctxhsje'), 0)));
                if (mstform.getItem('u_wzfldje').getValue() == '1') {
                    //本次摊销比例*价税合计=本次摊销含税金额
                    a[i].set('u_lctxje', (Ext.Number.from(a[i].get('bctxbl'), 0) * Ext.Number.from(a[i].get(
                        'jshj'), 0)).toFixed(2));
                } else {
                    //本次摊销比例*不含税金额=本次摊销金额
                    a[i].set('u_lctxje', (Ext.Number.from(a[i].get('bctxbl'), 0) * Ext.Number.from(a[i].get(
                        'amt'), 0)).toFixed(2));
                }
            }

        }
    });
    /*复制按钮单击，会查到第1条数据的字段值然后赋值给表体中的每条数据end*/

    /*摊销表浪潮管理组织部门自动带出业务单元，核算部门助记码start*/

    /*管理组织选择后清空所属项目部start*/
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        mstform.getItem('u_dydlcglzz').addListener('helpselected', function () {
            mstform.getItem('u_dydlcglbm').setValue();
            mstform.getItem('u_dydlcywdy').setValue();
            mstform.getItem('u_dydlchsbmzjm').setValue();
        });
    }
    /*管理组织选择后清空所属项目部end*/


    mstform.getItem('u_dydlcglbm').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
        var zz = mstform.getItem('u_dydlcglzz').getValue();
        if (zz) {
            mstform.getItem('u_dydlcglbm').setOutFilter({
                parent_orgid: zz
            }) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
        } else {
            Ext.Msg.alert('提示', '发料单浪潮管理组织未选择');
            return false;
        }
    });

    /*发料单浪潮管理部门选择后带出浪潮业务单元start*/
    mstform.getItem('u_dydlcglbm').addListener('helpselected', function () {
        var u_dydlcglbm = mstform.getItem('u_dydlcglbm').getValue();
        var u_dydlcglzz = mstform.getItem('u_dydlcglzz').getValue();
        if (u_dydlcglzz) {
            execServer('ssxmb_bmywdy', {
                'dept': u_dydlcglbm
            }, function (res) {
                if (res.count == 1) {
                    var data = JSON.parse(res.data);
                    if (data[0].extendObjects.user_lcywdy) {
                        mstform.getItem('u_dydlcywdy').setValue(data[0].extendObjects.user_lcywdy);
                    } else {
                        mstform.getItem('u_dydlcywdy').setValue(null);
                        Ext.Msg.alert('提示', '请联系管理员处理，部门对照存在重复');
                    }

                } else if (res.count > 1) {
                    mstform.getItem('u_dydlcywdy').setValue();
                    Ext.Msg.alert('提示', '请联系管理员处理，部门对照存在重复');
                    return false;
                } else {
                    mstform.getItem('u_dydlcywdy').setValue();
                    Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                    return false;
                }
            });

            execServer('ssxmb_zjm', {
                'dept': u_dydlcglbm
            }, function (res) {
                if (res.count > 0) {
                    var data = JSON.parse(res.data);
                    if (data.length == 1) {
                        if (data[0].extendObjects.user_mnemcodeinaccdepart) {
                            mstform.getItem('u_dydlchsbmzjm').setValue(data[0].extendObjects
                                .user_mnemcodeinaccdepart);
                        } else {
                            mstform.getItem('u_dydlchsbmzjm').setValue(null);
                            Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                        }
                    } else {
                        mstform.getItem('u_dydlchsbmzjm').setValue(null);
                        Ext.Msg.alert('提示', '请联系管理员处理，部门对照存在重复');
                    }
                } else {
                    mstform.getItem('u_dydlchsbmzjm').setValue();
                    Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                    return false;
                }
            });
        } else {
            Ext.Msg.alert('提示', '发料单浪潮管理组织未选择');
            return false;
        }

    });

    /*发料单浪潮管理部门选择后带出浪潮业务单元end*/
    /*摊销表浪潮管理组织部门自动带出业务单元，核算部门助记码end*/

    /*摊销表浪潮管理组织部门自动带出业务单元，核算部门助记码start*/
    /*管理组织选择后清空所属项目部start*/
    mstform.getItem('u_txdlcglzz').addListener('helpselected', function () {
        mstform.getItem('u_txdlcglbm').setValue();
        mstform.getItem('u_txdlcywdy').setValue();
        mstform.getItem('u_txdlchsbmzjm').setValue();
    });
    /*管理组织选择后清空所属项目部end*/


    mstform.getItem('u_txdlcglbm').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
        var zz = mstform.getItem('u_txdlcglzz').getValue();
        if (zz) {
            mstform.getItem('u_txdlcglbm').setOutFilter({
                parent_orgid: zz
            }) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
        } else {
            Ext.Msg.alert('提示', '摊销单浪潮管理组织未选择');
            return false;
        }
    });


    /*项目所属部选择后带出浪潮业务单元start*/
    mstform.getItem('u_txdlcglbm').addListener('helpselected', function () {
        var u_txdlcglbm = mstform.getItem('u_txdlcglbm').getValue();
        var u_txdlcglzz = mstform.getItem('u_txdlcglzz').getValue();
        if (u_txdlcglzz) {
            execServer('ssxmb_bmywdy', {
                'dept': u_txdlcglbm
            }, function (res) {
                if (res.count > 0) {
                    var data = JSON.parse(res.data);
                    if (data[0].extendObjects.user_lcywdy) {
                        mstform.getItem('u_txdlcywdy').setValue(data[0].extendObjects.user_lcywdy);
                    } else {
                        mstform.getItem('u_txdlcywdy').setValue(null);
                        Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                    }

                } else if (res.count > 1) {
                    mstform.getItem('u_txdlcywdy').setValue();
                    Ext.Msg.alert('提示', '请联系管理员处理，部门对照存在重复');
                    return false;
                } else {
                    mstform.getItem('u_txdlcywdy').setValue();
                    Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                    return false;
                }
            });

            execServer('ssxmb_zjm', {
                'dept': u_txdlcglbm
            }, function (res) {
                if (res.count > 0) {
                    var data = JSON.parse(res.data);
                    if (data.length == 1) {
                        if (data[0].extendObjects.user_mnemcodeinaccdepart) {
                            mstform.getItem('u_txdlchsbmzjm').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
                        } else {
                            mstform.getItem('u_txdlchsbmzjm').setValue(null);
                            Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                        }
                    } else {
                        mstform.getItem('u_txdlchsbmzjm').setValue(null);
                        Ext.Msg.alert('提示', '请联系管理员处理，部门对照存在重复');
                    }
                } else {
                    mstform.getItem('u_txdlchsbmzjm').setValue();
                    Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                    return false;
                }
            });
        } else {
            Ext.Msg.alert('提示', '摊销单浪潮管理组织未选择');
            return false;
        }
    });
    /*项目所属部选择后带出浪潮业务单元end*/
    /*摊销表浪潮管理组织部门自动带出业务单元，核算部门助记码end*/
    // Toolbar.get('push').on('click', function () {
    //     if (mstform.getItem('u_dydlcywdy').getValue() && mstform.getItem('u_dydlcywdy').getValue()) {
    //     } else {
    //         Ext.MessageBox.confirm('提示', '发料单没有对照不允许推送浪潮！', function (e) {

    //         });
    //         return;
    //     }
    // });

    // Toolbar.get('push1').on('click', function () {
    //     if (mstform.getItem('u_txdlcywdy').getValue() && mstform.getItem('u_txdlchsbmzjm').getValue()) {
    //     } else {
    //         Ext.MessageBox.confirm('提示', '摊销单没有对照不允许推送浪潮！', function (e) {

    //         });
    //         return;
    //     }
    // });


}

function allReadyList() {
    Ext.getCmp('toolbar').get('check').hide()
}

// 新增页面引用单据前校验
function beforeAddFromImp() {
    var mstform = Ext.getCmp('p_form0000600080_m');
    if (imp_schemeid == '569000000000009' || imp_schemeid == '569000000000007' || imp_schemeid == '569000000000008' || imp_schemeid == '569000000000010') {
        var u_tyywd = mstform.getItem('u_tyywd').getValue();
        if (!u_tyywd) {
            Ext.Msg.alert('提示', '请先选择通用业务单');
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
}