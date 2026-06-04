function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700025_m');
    var dgrid = Ext.getCmp('p_form0000700025_d');
    var dstore = dgrid.store;
    //单位属性设置为只读
    mstform.getItem('dwsx').userSetReadOnly(true);
    //录入人设置为隐藏
    mstform.getItem('phid_fill_psn').setVisible(false);
    //证件类型设置为隐藏
    mstform.getItem('zjlx').setVisible(false);
    //证件编号设置为隐藏
    mstform.getItem('zjbh').setVisible(false);
    //审核人设置为隐藏
    mstform.getItem('app_status').setVisible(false);
    //往来单位名称修改设置为必输
    mstform.getItem('wldwmcxg').userSetMustInput(true);
    //银行设置为只读
    dgrid.setReadOnlyCol('yh_name', true);
    //账号设置为只读
    dgrid.setReadOnlyCol('zh', true);
    //开户行账号设置为只读
    dgrid.setReadOnlyCol('khhzh', true);
    //开户行账号设置为只读
    dgrid.setReadOnlyCol('mr', true);
    //变更银行设置为必输
    dgrid.setMustInputCol('bgyh_name', true);
    //变更账号设置为必输
    dgrid.setMustInputCol('bgzh', true);
    //变更开户行账户设置为必输
    dgrid.setMustInputCol('bgkhhzh', true);
    //往来单位设置为只读
    mstform.getItem('wldwmc').userSetReadOnly(true);
    //省市县三级联动  start
    //更换国家置空其他
    mstform.getItem('wldwmc').on('helpselected', function () {
        mstform.getItem('wldwmc').userSetReadOnly(true);
    });


    mstform.getItem('country').on('beforetriggerclick', function () {
        mstform.getItem('province').setValue();
        mstform.getItem('city').setValue();
        mstform.getItem('county').setValue();
    });
    //通过国家过滤省
    mstform.getItem('province').on('beforetriggerclick', function () {
        mstform.getItem('city').setValue();
        mstform.getItem('county').setValue();

        if (Ext.isEmpty(mstform.getItem('country').getValue())) {
            Ext.Msg.alert('提示', "请选选择国家");
            return false;
        }
        mstform.getItem('province').setOutFilter({
            nationid: mstform.getItem('country').getValue()
        });
    });

    //通过省过滤市
    mstform.getItem('city').on('beforetriggerclick', function () {
        mstform.getItem('county').setValue();
        if (Ext.isEmpty(mstform.getItem('province').getValue()) || Ext.isEmpty(mstform.getItem('country').getValue())) {
            Ext.Msg.alert('提示', "请选选择省份和国家");
            return false;
        }
        mstform.getItem('city').setOutFilter({
            pid: mstform.getItem("province").getValue()
        });
    });

    //通过市过滤区县
    mstform.getItem('county').on('beforetriggerclick', function () {
        if (Ext.isEmpty(mstform.getItem('province').getValue()) || Ext.isEmpty(mstform.getItem('city').getValue()) || Ext.isEmpty(mstform.getItem('country').getValue())) {
            Ext.Msg.alert('提示', "请选选择国家和省份和城市");
            return false;
        }
        mstform.getItem('county').setOutFilter({
            pid: mstform.getItem("city").getValue()
        });
    });

    //省市县三级联动 end

    /*添加引入按钮start*/

    if (otype == $Otype.ADD || otype == $Otype.EDIT || otype == $Otype.VIEW) {
        if (mstform.getItem('dwsx').getValue() == '1') {
            //证件类型设置为显示
            mstform.getItem('zjlx').setVisible(true);
            //证件编号设置为显示
            mstform.getItem('zjbh').setVisible(true);

        } else {
            //证件类型设置为隐藏
            mstform.getItem('zjlx').setVisible(false);
            //证件编号设置为隐藏
            mstform.getItem('zjbh').setVisible(false);
        }

    }
    /*当往来单位名称都有值的时候引入按钮才可以使用start*/

    function getDetailData() {
        var wldwmc = mstform.getItem('wldwmc').getValue();
        console.log("wldwmc:", wldwmc);
        dstore.removeAll();
        execServer('p_form0000700025_gysbgzb', {
            'phid': wldwmc,
        },
            function (res) {
                console.log("res:", res);
                if (res.status != 'success') { //判断取数状态
                    Ext.Msg.alert('提示', 'sql语句有误');
                    return false;
                } else {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;

                    //避免重复录入
                    if (data.length != 0) {
                        mstform.getItem('dwsx').setValue(data[0].extendObjects.dwsx);
                        mstform.getItem('zjlx').setValue(data[0].extendObjects.zjlx);
                        mstform.getItem('zjbh').setValue(data[0].extendObjects.zjbh);
                        mstform.getItem('jtgys').setValue(data[0].extendObjects.jtgys.toString());
                        mstform.getItem('khssfw').setValue(data[0].extendObjects.khssfw);

                        mstform.getItem('ddlbcol_1').setValue(data[0].extendObjects.sfdkh);

                        mstform.getItem('tyshxydm').setValue(data[0].extendObjects.tyshxydm);
                        mstform.getItem('wldwmcxg').setValue(data[0].extendObjects.wldwmcxg);
                        mstform.getItem('country').setValue(data[0].extendObjects.country);
                        mstform.getItem('province').setValue(data[0].extendObjects.province);
                        mstform.getItem('city').setValue(data[0].extendObjects.city);
                        mstform.getItem('county').setValue(data[0].extendObjects.county);
                        mstform.getItem('custclass_id').setValue(data[0].extendObjects.custclass_id);

                        BatchBindCombox([
                            mstform.getItem('country'),
                            mstform.getItem('province'),
                            mstform.getItem('city'),
                            mstform.getItem('county'),
                            mstform.getItem('custclass_id')
                        ]);
                    }
                    console.log("wldwmc:", wldwmc);
                    /*引入明细子表数据start*/
                    execServer('p_form0000700025_gysbgmxb', {
                        'phid': wldwmc,
                    },
                        function (res) {
                            console.log("res:", res);
                            if (res.status != 'success') { //判断取数状态
                                Ext.Msg.alert('提示', 'sql语句有误');
                                return false;
                            } else {
                                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                                console.log("data:", data);
                                //dstore.insert(dstore.getCount(), data[0].extendObjects); //将服务端获取的数组内容插入到单据体
                                var arr = new Array();
                                for (i = 0; i < res.count; i++) {
                                    arr.push({
                                        bgyh: data[i].extendObjects.bgyh,
                                        bgyh_EXName: data[i].extendObjects.bgyh_name,
                                        bgzh: data[i].extendObjects.bgzh,
                                        bgkhhzh: data[i].extendObjects.bgkhhzh,
                                        // bgkhhzh_EXName: data[i].extendObjects.bgkhhzh,
                                        yh: data[i].extendObjects.yh,
                                        yh_EXName: data[i].extendObjects.yh_name,
                                        zh: data[i].extendObjects.zh,
                                        khhzh: data[i].extendObjects.khhzh,
                                        rel_key1: data[i].extendObjects.rel_key1,
                                        // khhzh_EXName: data[i].extendObjects.khhzh,
                                        sfbg: data[i].extendObjects.sfbg
                                    });
                                }
                                dstore.insert(dstore.getCount(), arr); //插入数组数据  
                                //只有个人的才会有证件类型

                                if (mstform.getItem('dwsx').getValue() == '1') {
                                    //证件类型设置为显示
                                    mstform.getItem('zjlx').setVisible(true);
                                    //证件编号设置为显示
                                    mstform.getItem('zjbh').setVisible(true);

                                } else {
                                    //证件类型设置为隐藏
                                    mstform.getItem('zjlx').setVisible(false);
                                    //证件编号设置为隐藏
                                    mstform.getItem('zjbh').setVisible(false);
                                }
                            }

                        });
                    /*引入明细子表数据end*/

                }

            });
    }


    /*往来单位选择后触发start*/
    mstform.getItem('wldwmc').addListener('helpselected', function () {
        getDetailData();
    });
    /*往来单位选择后触发end*/

    /*表体 检测银行账号,银行户名,银行是否变更  变更就把是否变更改成已变更start */
    dgrid.addListener('edit', function (editor, e) { //监听单据体编辑状态，edit-编辑；add-增行；cellclick-点击
        if (e.originalValue == e.value) {
            return;
        } //判断原值与新值是否相同
        if (e.field == 'bgyh' || e.field == 'bgzh' || e.field == 'bgkhhzh') { //监听qty、prc字段变化
            var record = e.record;
            var bgyh = record.data.bgyh
            var bgzh = record.data.bgzh
            var bgkhhzh = record.data.bgkhhzh
            var yh = record.data.yh
            var zh = record.data.zh
            var khhzh = record.data.khhzh
            bgyh == yh && bgzh == zh && khhzh == bgkhhzh ? record.set('sfbg', '1') : record.set('sfbg', '2')
        }
    });

    /*表体 检测银行账号,银行户名,银行是否变更  变更就把是否变更改成已变更end */

    /*往来单位类型为供应商取供应商审核并且电商编码为空的，为客户取客户为审核的start*/

    mstform.getItem('wldwmc').addListener('change', function () {
        if (!mstform.getItem('wldwmc').getValue()) {
            dstore.removeAll();
        }
    });

    var isFirst = true; // 是否第一次进入页面

    var phid_fill_psn = $appinfo.userID;
    console.log("phid_fill_psn:", phid_fill_psn);
    //以下为客户供应商变更特殊处理的phid_fill_psn值列表
    var specialPhidList = [
        '224220816001001',
        '313191217006237',
        '224221025022507',
        '313191217001129',
        '569000000000210',
        '221025013305'
    ];
    mstform.getItem('wldwlx').addListener('change', function () {
        var wldwlx = mstform.getItem('wldwlx').getValue();
        if (!isFirst) {
            mstform.getItem('wldwmc').setValue();
        }
        isFirst = false;
        if (phid_fill_psn && specialPhidList.indexOf(phid_fill_psn) !== -1) {
            mstform.getItem('wldwmc').userSetReadOnly(false);
            return; // 符合条件后直接返回，不再执行后续else if
        } else if (wldwlx == '1') {
            mstform.getItem('wldwmc').userSetReadOnly(false);
            mstform.getItem('wldwmc').setClientSqlFilter("fg3_enterprise.fromtype = 'supply' AND fg3_enterprise.phid IN (SELECT phid_ent FROM fg3_supplyfile WHERE app_status = '1' GROUP BY phid_ent) AND fg3_enterprise.user_dsbm = '' AND fg3_enterprise.user_jtnbry IS NOT NULL OR fg3_enterprise.fromtype = 'supply' AND fg3_enterprise.phid IN (SELECT phid_ent FROM fg3_supplyfile WHERE app_status = '1' GROUP BY phid_ent) AND fg3_enterprise.user_dsbm IS NULL AND fg3_enterprise.user_jtnbry IS NOT NULL");
        } else if (wldwlx == '2') {
            mstform.getItem('wldwmc').userSetReadOnly(false);
            mstform.getItem('wldwmc').setClientSqlFilter("fg3_enterprise.phid in (select phid_ent  from fg3_customfile where app_status ='1'  group by phid_ent) ");
        }
    });


    /*往来单位类型为供应商取供应商审核并且电商编码为空的，为客户取客户为审核的end*/
}