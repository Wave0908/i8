function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700025_m');
    var dgrid = Ext.getCmp('p_form0000700025_dgrid');
    var dstore = dgrid.store;
    //单位属性设置为只读
    mstform.getItem('dwsx').userSetReadOnly(true);
    //录入人设置为隐藏
    mstform.getItem('fillpsn').setVisible(false);
    //证件类型设置为隐藏
    mstform.getItem('zjlx').setVisible(false);
    //证件编号设置为隐藏
    mstform.getItem('zjbh').setVisible(false);
    //审核人设置为隐藏
    mstform.getItem('checkpsn').setVisible(false);
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
    mstform.getItem('wldwmc').userSetReadOnly(false);
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

    /*往来单位选择后触发start*/
    mstform.getItem('wldwmc').addListener('helpselected', function () {
        var wldwmc = mstform.getItem('wldwmc').getValue();
        dstore.removeAll();
        callServer('gysbgzb', [{
            'phid': wldwmc,
        }],
            function (res) {
                if (res.status != 'ok') { //判断取数状态
                    Ext.Msg.alert('提示', 'sql语句有误');
                    return false;
                } else {
                    //避免重复录入
                    mstform.getItem('dwsx').setValue(res.record[0].dwsx.toString());
                    mstform.getItem('zjlx').setValue(res.record[0].zjlx);
                    mstform.getItem('zjbh').setValue(res.record[0].zjbh);
                    mstform.getItem('jtgys').setValue(res.record[0].jtgys.toString());
                    mstform.getItem('khssfw').setValue(res.record[0].khssfw);

                    mstform.getItem('ddlbcol_1').setValue(res.record[0].sfdkh);

                    mstform.getItem('tyshxydm').setValue(res.record[0].tyshxydm);
                    mstform.getItem('wldwmcxg').setValue(res.record[0].wldwmcxg);
                    mstform.getItem('country').setValue(res.record[0].country);
                    mstform.getItem('province').setValue(res.record[0].province);
                    mstform.getItem('city').setValue(res.record[0].city);
                    mstform.getItem('county').setValue(res.record[0].county);
                    mstform.getItem('custclass_id').setValue(res.record[0].custclass_id);

                    BatchBindCombox([
                        mstform.getItem('country'),
                        mstform.getItem('province'),
                        mstform.getItem('city'),
                        mstform.getItem('county'),
                        mstform.getItem('custclass_id')
                    ]);

                    /*引入明细子表数据start*/
                    callServer('gysbgmxb', [{
                        'phid': wldwmc,
                    }],
                        function (res) {
                            if (res.status != 'ok') { //判断取数状态
                                Ext.Msg.alert('提示', 'sql语句有误');
                                return false;
                            } else {
                                dstore.insert(dstore.getCount(), res.record); //将服务端获取的数组内容插入到单据体
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

    mstform.getItem('wldwlx').addListener('change', function () {
        var wldwlx = mstform.getItem('wldwlx').getValue();
        mstform.getItem('wldwmc').setValue();

        if (wldwlx == '1') {
            mstform.getItem('wldwmc').userSetReadOnly(false);
            mstform.getItem('wldwmc').setClientSqlFilter("fg3_enterprise.fromtype = 'supply'and fg3_enterprise.phid in (select ent_id  from fg3_supplyfile where auditflg ='1'  group by ent_id) and fg3_enterprise.user_dsbm  = '' and fg3_enterprise.user_jtnbry is not null or fg3_enterprise.fromtype  = 'supply'and fg3_enterprise.phid in (select ent_id  from fg3_supplyfile where auditflg ='1'  group by ent_id) and fg3_enterprise.user_dsbm is null and fg3_enterprise.user_jtnbry is not null");
        }
        if (wldwlx == '2') {
            mstform.getItem('wldwmc').userSetReadOnly(false);
            mstform.getItem('wldwmc').setClientSqlFilter("fg3_enterprise.phid in (select ent_id  from fg3_customfile where auditflg ='1'  group by ent_id) ");
        }

    });

    /*往来单位类型为供应商取供应商审核并且电商编码为空的，为客户取客户为审核的end*/

}
