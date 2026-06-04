//布局后初始化函数_编辑
function allReadyEdit_cus() {
    var mstform = Ext.getCmp('p_form_dzyfp_m');
    var dgrid = Ext.getCmp('p_form_dzyfp_d')
    var dstore = dgrid.store
    console.log("ready");
    if (otype == 'add' || otype == 'edit') {
        // mstform.getItem('u_htbm').setOutFilter({
        //     cnt_type: 12
        // }) 
        mstform.on('dataready', function () {
            mstform.getItem('u_htbm').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
                mstform.getItem('u_htbm').setClientSqlFilter('cnt_type  in (3,234210414000112,234210414000113 )');
            });

            var xmmc = mstform.getItem('pc').getValue();
            console.log("xmmc:", xmmc);
            if (xmmc) {
                mstform.getItem('u_htbm').setOutFilter({
                    phid_pc: xmmc
                })
            }
            var htbm = mstform.getItem('u_htbm').getValue();
            console.log("htbm:", htbm);
            if (htbm) {
                console.log('u_htbm1------------->', htbm);
                execServer('cghtxxdcmc', { 'phid': htbm }, function (res) {
                    console.log('cghtxxdcmc res.data------------->', res.data);
                    if (res.count > 0) {
                        mstform.getItem('u_htmc').setValue(res.data[0].title);
                        mstform.getItem('u_gysmc').setValue(res.data[0].phid_sencomp);
                        BatchBindCombox([mstform.getItem('u_gysmc')]);
                        mstform.getItem('pc').setValue(res.data[0].phid_pc);
                        BatchBindCombox([mstform.getItem('pc')]);
                    }
                });
            }
        })
        //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
        mstform.getItem('u_htbm').on('helpselected', function (obj) {
            var u_htbm = mstform.getItem('u_htbm').getValue();
            if (u_htbm) {
                console.log('u_htbm2------------->', u_htbm);
                execServer('cghtxxdcmc', { 'phid': u_htbm }, function (res) {
                    console.log('cghtxxdcmc res.data------------->', res.data);
                    if (res.count > 0) {
                        mstform.getItem('u_htmc').setValue(res.data[0].title);
                        mstform.getItem('u_gysmc').setValue(res.data[0].phid_sencomp);
                        BatchBindCombox([mstform.getItem('u_gysmc')]);
                        mstform.getItem('pc').setValue(res.data[0].phid_pc);
                        BatchBindCombox([mstform.getItem('pc')]);
                    }
                });
            }
        });
        mstform.getItem('pc').on('helpselected', function (obj) {
            var pc = mstform.getItem('pc').getValue();
            mstform.getItem('u_htbm').setOutFilter({
                phid_pc: pc
            })
        });
        var autoChange = function () {
            var u_spje = 0;
            Ext.Array.each(dstore.data.items, function (record) {
                var sum = 0;
                var sum1 = 0;
                console.log("record.data------------->", record.data);
                var u_sjdhsl = Ext.Number.from(record.data.u_sjdhsl, 0);
                var u_cghsdj = Ext.Number.from(record.data.u_cghsdj, 0);
                var u_xshsdj = Ext.Number.from(record.data.u_xshsdj, 0);
                console.log("u_sjdhsl:", u_sjdhsl);
                console.log("u_cghsdj:", u_cghsdj);
                console.log("u_xshsdj:", u_xshsdj);
                sum = u_sjdhsl * u_cghsdj;
                sum1 = u_sjdhsl * u_xshsdj;
                console.log("采购含税金额:", sum);
                console.log("销售含税金额:", sum1);
                record.set('u_cghsje', sum);
                record.set('u_xshsje', sum1);
                u_spje += Ext.Number.from(record.data.u_cghsje, 0);
            });
            console.log("审批金额:", u_spje);
            mstform.getItem('u_spje').setValue(u_spje);
        };
        // 监听 update: 任何字段被修改（无论是用户手动编辑，还是代码 record.set()）都会触发
        dstore.on('update', autoChange);
        // 监听 datachanged: 任何行的增加、删除、重新加载都会触发
        dstore.on('datachanged', autoChange);
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