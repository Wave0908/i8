//布局后初始化函数_编辑
function allReadyEdit_cus() {
    var mstform = Ext.getCmp('p_form_kpsq_m');
    var dgrid = Ext.getCmp('p_form_kpsq_d')
    var dstore = dgrid.store
    console.log("ready");
    if (otype == 'add' || otype == 'edit') {
        debugger
        // mstform.getItem('u_htmc').setOutFilter({
        //     cnt_type: 12
        // }) 
        mstform.on('dataready', function () {
            var phid_pc = mstform.getItem('pc').getValue();
            if (phid_pc) {
                execServer('kpsqdc', {
                    pc: phid_pc
                }, function (res) {
                    console.log("kpsqdc1:", res);
                    if (res.count > 0) {
                        if (res.count == 1) {
                            mstform.getItem('u_htmc').setValue(res.data[0].phid);
                            BatchBindCombox([mstform.getItem('u_htmc')]);
                            mstform.getItem('u_kpjfdw').setValue(res.data[0].u_kpjfdw);
                            BatchBindCombox([mstform.getItem('u_kpjfdw')]);
                            if (res.data[0].u_kpjfdw) {
                                mstform.getItem('u_khyh').setOutFilter({
                                    billto_id: res.data[0].u_kpjfdw
                                }) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
                            }
                            mstform.getItem('u_kpsh').setValue(res.data[0].u_kpsh);
                            mstform.getItem('u_zcdz').setValue(res.data[0].u_zcdz);
                            mstform.getItem('u_dh').setValue(res.data[0].u_dh);
                            mstform.getItem('u_khyh').setValue(res.data[0].u_khyh);
                            BatchBindCombox([mstform.getItem('u_khyh')]);
                            mstform.getItem('u_zh').setValue(res.data[0].u_zh);
                        } else {
                            console.log("项目对应多个销售合同，不能自动填充销售合同信息！")
                        }
                    }
                });
            }
        })

        //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
        mstform.getItem('u_cgdd').on('helpselected', function (obj) {
            var pc = mstform.getItem('pc').getValue();
            if (pc) {
                var u_cgdd = mstform.getItem('u_cgdd').getValue();
                console.log('u_cgdd------------->', u_cgdd);
                // 通过采购订单获取销售合同信息
                execServer('cgddhqxsht', { 'phid': u_cgdd }, function (res) {
                    console.log('cgddhqxsht res.data------------->', res.data);
                    if (res.count > 0) {
                        if (res.count == 1) {
                            mstform.getItem('u_htmc').setValue(res.data[0].u_htmc);
                            BatchBindCombox([mstform.getItem('u_htmc')]);
                            mstform.getItem('u_kpjfdw').setValue(res.data[0].u_kpjfdw);
                            BatchBindCombox([mstform.getItem('u_kpjfdw')]);
                            mstform.getItem('u_kpsh').setValue(res.data[0].u_kpsh);
                            mstform.getItem('u_zcdz').setValue(res.data[0].u_zcdz);
                            mstform.getItem('u_dh').setValue(res.data[0].u_dh);
                        } else {
                            console.log("采购订单对应多个销售合同，不能自动填充销售合同信息！")
                        }
                    }
                });
            } else {
                Ext.Msg.alert('提示', '请先选择工程项目!');
                mstform.getItem('u_cgdd').setValue();
                return false;
            }
        });
        mstform.getItem('pc').addListener('change', function (res) {
            var pc = mstform.getItem('pc').getValue();
            if (pc) {
                execServer('kpsqdc', {
                    pc: pc
                }, function (res) {
                    console.log("kpsqdc2:", res);
                    if (res.count > 0) {
                        if (res.count == 1) {
                            mstform.getItem('u_htmc').setValue(res.data[0].phid);
                            BatchBindCombox([mstform.getItem('u_htmc')]);
                            mstform.getItem('u_kpjfdw').setValue(res.data[0].u_kpjfdw);
                            BatchBindCombox([mstform.getItem('u_kpjfdw')]);
                            if (res.data[0].u_kpjfdw) {
                                mstform.getItem('u_khyh').setOutFilter({
                                    billto_id: res.data[0].u_kpjfdw
                                }) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
                            }
                            mstform.getItem('u_kpsh').setValue(res.data[0].u_kpsh);
                            mstform.getItem('u_zcdz').setValue(res.data[0].u_zcdz);
                            mstform.getItem('u_dh').setValue(res.data[0].u_dh);
                            mstform.getItem('u_khyh').setValue(res.data[0].u_khyh);
                            BatchBindCombox([mstform.getItem('u_khyh')]);
                            mstform.getItem('u_zh').setValue(res.data[0].u_zh);
                        } else {
                            console.log("项目对应多个销售合同，不能自动填充销售合同信息！")
                        }
                    }
                });
            }
        })
        mstform.getItem('u_htmc').addListener('change', function (res) {
            var u_htmc = mstform.getItem('u_htmc').getValue();
            if (u_htmc) {
                execServer('kpsqxsht', {
                    phid: u_htmc
                }, function (res) {
                    console.log("kpsqxsht:", res);
                    if (res.count > 0) {
                        mstform.getItem('u_kpjfdw').setValue(res.data[0].u_kpjfdw);
                        BatchBindCombox([mstform.getItem('u_kpjfdw')]);
                        if (res.data[0].u_kpjfdw) {
                            mstform.getItem('u_khyh').setOutFilter({
                                billto_id: res.data[0].u_kpjfdw
                            }) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
                        }
                        mstform.getItem('u_kpsh').setValue(res.data[0].u_kpsh);
                        mstform.getItem('u_zcdz').setValue(res.data[0].u_zcdz);
                        mstform.getItem('u_dh').setValue(res.data[0].u_dh);
                        mstform.getItem('u_khyh').setValue(res.data[0].u_khyh);
                        BatchBindCombox([mstform.getItem('u_khyh')]);
                        mstform.getItem('u_zh').setValue(res.data[0].u_zh);
                    }
                });
            }
        })
        mstform.getItem('u_htmc').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
            var pc = mstform.getItem('pc').getValue();
            if (pc) {
                mstform.getItem('u_htmc').setOutFilter({
                    phid_pc: pc
                }) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
            }
        });
        mstform.getItem('pc').on('helpselected', function (obj) {
            if (mstform.getItem('pc').getValue()) {
                var u_cgdd = mstform.getItem('u_cgdd');
                var u_htmc = mstform.getItem('u_htmc');
                var pc = mstform.getItem('pc').getValue();
                u_cgdd.setOutFilter({
                    phid_pc: pc
                })
                u_htmc.setOutFilter({
                    phid_pc: pc
                })
            }
        });
        // 自动汇总
        var autoSum = function () {
            var bchs = 0;
            var ljkp = 0;
            var pc = mstform.getItem('pc').getValue();
            var u_kfmc = mstform.getItem('u_kfmc').getValue();

            var rkzsl = 0;
            var ykpsl = 0;
            var wkpsl = 0;
            Ext.Array.each(dstore.data.items, function (record) {
                var hshj = 0;
                var u_bckpsl = Ext.Number.from(record.data.u_bckpsl, 0);
                var u_ykpsl = Ext.Number.from(record.data.u_ykpsl, 0);
                var u_hsdj = Ext.Number.from(record.data.u_hsdj, 0);
                ljkp += u_ykpsl * u_hsdj;
                hshj = u_bckpsl * u_hsdj;
                record.set('u_hshj', hshj);
                bchs += Ext.Number.from(record.data.u_hshj, 0);

                var phid_itemdata = Ext.Number.from(record.data.phid_itemdata, 0);
                if (phid_itemdata && pc && u_kfmc) {
                    execServer('kcsl', {
                        item: phid_itemdata,
                        pc: pc,
                        kf: u_kfmc
                    }, function (res) {
                        console.log("kcsl:", res);
                        if (res.count > 0) {
                            rkzsl = Ext.Number.from(res.data[0].sl, 0);
                            record.set('u_rkzsl', rkzsl);
                        }
                    });
                    execServer('kpsl', {
                        item: phid_itemdata,
                        pc: pc,
                        kf: u_kfmc
                    }, function (res) {
                        console.log("kpsl:", res);
                        if (res.count > 0) {
                            ykpsl = Ext.Number.from(res.data[0].sl, 0);
                            record.set('u_ykpsl', ykpsl);
                        }
                    });
                    wkpsl = rkzsl - ykpsl;
                    console.log("未开票数量:", wkpsl);
                    record.set('u_wkpsl', wkpsl);
                }
            });
            console.log("本次开票含税金额:", bchs);
            mstform.getItem('u_bckphsje').setValue(bchs);
            console.log("累计开票金额:", ljkp);
            mstform.getItem('u_ljkpje').setValue(ljkp);

        };

        // 监听 update: 任何字段被修改（无论是用户手动编辑，还是代码 record.set()）都会触发
        dstore.on('update', autoSum);
        // 监听 datachanged: 任何行的增加、删除、重新加载都会触发
        dstore.on('datachanged', autoSum);
    }
}

//保存前检测函数
//function beforeSaveEdit_cus() {

//}

//获取需同时执行的元函数
//function getSaveDataEdit_cus(type) {

//}


//布局后初始化函数_列表
//function allReadyList_cus() {

//}

//删除前检测函数
//function beforeDeleteList_cus() {

//}

//审核前检测函数
//function beforeVerifyList_cus() {

//}

//去审核前检测函数
//function beforeUnVerifyList_cus() {

//}


//获取需同时执行的元函数
//function getSaveDataList_cus(type) {

//}