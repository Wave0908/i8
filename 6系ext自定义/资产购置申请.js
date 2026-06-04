function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000000018_m');
    var dgrid = Ext.getCmp('p_form0000000018_d');
    var Toolbar = Ext.getCmp('toolbar');
    var dstore = dgrid.store;
    //mstform.getItem('glbm').setVisible(false);
    //mstform.getItem('deptid').setVisible(false);
    //mstform.getItem('deptid2').setVisible(false);
    //mstform.getItem ('u_yjdjsfcgyw').userSetReadOnly(true); 
    //dgrid.hideColumn('zcmc', true);
    if (otype == $Otype.ADD || otype == $Otype.EDIT || otype == $Otype.COPY) {
        //表头过滤
        var dt = mstform.getItem('dept1') //帮助字段PC 赋值给pc （通用帮助可选数据据过滤示例1）
        dt.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
            var zz = mstform.getItem('phid_org').getValue();
            //console.log(zz,dt);
            dt.setOutFilter({
                parent_orgid: zz
            }) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
        });
        /*var dt2 = mstform.getItem('dept2') //帮助字段PC 赋值给pc （通用帮助可选数据据过滤示例1）
        dt2.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
            var zz = mstform.getItem('ocode').getValue();
            //console.log(zz,dt);
            dt2.setOutFilter({
                parent_orgid: zz
            }) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
        });*/

        //一键复制
        //var Toolbar = Ext.getCmp('toolbar');
        Toolbar.insert(3, {
            itemId: "copy",
            text: "一键复制",
            width: this.itemWidth,
            iconCls: "icon-Copy"
        });
        Toolbar.items.get('copy').on('click', function () {
            var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
            //var phid = a[0].get('rel_phid');
            var mc = a[0].get('zcmz');
            var mc_name = a[0].get('zcmz_name');
            var ggxh = a[0].get('ggxh');
            var dw = a[0].get('msunit');
            var dw_name = a[0].get('msunit_name');
            var sl = a[0].get('qty');
            var dj = a[0].get('prc');
            var zj = a[0].get('amt');
            var bz = a[0].get('remarks');
            for (i = 1; i < a.length; i++) {
                a[i].set('zcmz', mc);
                a[i].set('zcmz_name', mc_name);
                a[i].set('ggxh', ggxh);
                a[i].set('msunit', dw);
                a[i].set('msunit_name', dw_name);
                a[i].set('qty', sl);
                a[i].set('prc', dj);
                a[i].set('amt', zj);
                a[i].set('remarks', bz);
            }
            var a = 0;
            Ext.Array.each(dstore.data.items, function (record) {
                a += Ext.Number.from(record.get('amt'), 0)
            });
            mstform.getItem('sqzje').setValue(a);
        })

        /*本期申请数量*预计单价=预计总价start*/
        dgrid.addListener('edit', function (editor, e) {

            if (e.originalValue == e.value) {
                return;
            }

            if (e.field == 'qty' || e.field == 'prc') {
                var record = e.record;
                record.set('amt', Ext.Number.from(record.get('prc'), 0) * Ext.Number.from(record.get('qty'), 0));
            };
        });

        /*本期申请数量*预计单价=预计总价end*/

        /*给申请总金额字段赋值是预计总结的sum  start*/
        dgrid.addListener('edit', function (editor, e) {
            if (e.originalValue == e.value) {
                return;
            }
            var a = 0;
            Ext.Array.each(dstore.data.items, function (record) {
                a += Ext.Number.from(record.get('amt'), 0);
            });
            mstform.getItem('sqzje').setValue(a);
        });
        /*给申请总金额字段赋值是预计总结的sum  start*/
    }

}

function beforeSaveEdit() {
    var mstform = Ext.getCmp('p_form0000000018_m');
    var dgrid = Ext.getCmp('p_form0000000018_d');
    var dstore = dgrid.store;
    var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
    var b = '2'
    var c = 0;
    Ext.Array.each(dstore.data.items, function (record) {
        c += Ext.Number.from(record.get('amt'), 0);
    });
    mstform.getItem('sqzje').setValue(c);
    for (i = 0; i < a.length; i++) {
        if (a[i].data.prc >= 100000) {
            b = '1'
            break;
        }
    }
    mstform.getItem('u_yjdjsfcgyw').setValue(b)
    return true;

}