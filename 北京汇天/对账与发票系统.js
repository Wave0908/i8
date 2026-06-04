function trade_AllReady() {
    var mstform = Ext.getCmp('CntPayM7');
    var dgrid = Ext.getCmp('CntPayDOut7');
    console.log("对账与发票mstform:", mstform);
    console.log("dgrid:", dgrid);
    var dstore = dgrid.store;
    //单据新增触发条件
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        console.log("===========")
        // dgrid.addListener('edit', function (editor, e) {
        //     console.log("e:", e);
        //     Ext.Array.each(dstore.data.items, function (record) {
        //         var sum = 0;
        //         console.log("record.data------------->", record.data);
        //         var user_sjdhsl = Ext.Number.from(record.data.user_sjdhsl, 0);
        //         var user_cghsdj = Ext.Number.from(record.data.user_cghsdj, 0);
        //         console.log("user_sjdhsl:", user_sjdhsl);
        //         console.log("user_cghsdj:", user_cghsdj);
        //         sum = user_sjdhsl * user_cghsdj;
        //         console.log("总额:", sum);
        //         record.set('user_cghsje', sum);
        //     });
        // });
        // 自动汇总剩余量函数
        var autoChange = function () {
            Ext.Array.each(dstore.data.items, function (record) {
                var sum = 0;
                console.log("record.data------------->", record.data);
                var user_sjdhsl = Ext.Number.from(record.data.user_sjdhsl, 0);
                var user_cghsdj = Ext.Number.from(record.data.user_cghsdj, 0);
                console.log("user_sjdhsl:", user_sjdhsl);
                console.log("user_cghsdj:", user_cghsdj);
                sum = user_sjdhsl * user_cghsdj;
                console.log("总额:", sum);
                record.set('user_cghsje', sum);
            });
        };
        // 监听 update: 任何字段被修改（无论是用户手动编辑，还是代码 record.set()）都会触发
        dstore.on('update', autoChange);
        // 监听 datachanged: 任何行的增加、删除、重新加载都会触发
        dstore.on('datachanged', autoChange);
    }
}