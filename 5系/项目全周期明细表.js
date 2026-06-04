function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700751_m');
    var dgrid = Ext.getCmp('p_form0000700751_dgrid');
    var dstore = dgrid.store;
    var pc = mstform.getItem('pc') //帮助字段PC 赋值给pc （通用帮助可选数据据过滤示例2）
    var u_ksny = mstform.getItem('u_ksny') //开始年月
    var u_jsny = mstform.getItem('u_jsny') //结束年月

    if (otype == $Otype.ADD) {
        var toolbar = Ext.getCmp('toolbar'); // 获取工具栏
        console.log('toolbar=================>', toolbar)
        toolbar.insert(1, { itemId: "yr", text: "引入", width: this.itemWidth, iconCls: "icon-AddRow" });

        toolbar.items.get('yr').on('click', function () {     //单击增行按钮触发事件
            var u_ksny = mstform.getItem('u_ksny'); // 开始年月
            var u_jsny = mstform.getItem('u_jsny'); // 结束年月

            if (u_ksny.value == "" || u_jsny.value == "") {
                Ext.MessageBox.confirm('提示', '开始年月或结束年月未选择！', function (e) {

                });
                return false;
            }

            execServer('ckksnyyjsnyzjdyf', { 'u_ksny': u_ksny.value, 'u_jsny': u_jsny.value }, function (res) {
                console.log('res.count===============>', res.count);
                var arr = new Array();
                for (let index = 0; index < res.count; index++) {
                    arr.push({
                        u_tjzq: res.data[index].phid,
                        u_tjzq_name: res.data[index].cname,
                        u_jelx: 1
                    }, {
                        u_tjzq: res.data[index].phid,
                        u_tjzq_name: res.data[index].cname,
                        u_jelx: 2
                    });
                }
                dstore.insert(dstore.getCount(), arr);
            });
        });

        // 项目过滤
        pc.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
            //帮助窗口打开前事件
            pc.setClientSqlFilter('phid not in ( select pc from p_form0000700751_m)');
        });

        // 开始日期过滤
        u_ksny.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
            //帮助窗口打开前事件
            u_ksny.setClientSqlFilter("ctype = 'GCMONTH'");
        });

        // 项目选择后只读
        mstform.getItem('pc').addListener('itemchanged', function () {
            mstform.getItem('pc').userSetReadOnly(true);
        });
    } else if (otype == $Otype.EDIT) {
        // 项目只读
        pc.userSetReadOnly(true);

        // 开始年月只读
        u_ksny.userSetReadOnly(true);

        // 结束年月只读
        u_jsny.userSetReadOnly(true);

        // 项目过滤
        pc.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
            //帮助窗口打开前事件
            pc.setClientSqlFilter('phid not in ( select pc from p_form0000700751_m)');
        });

        // 开始日期过滤
        u_ksny.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
            //帮助窗口打开前事件
            u_ksny.setClientSqlFilter("ctype = 'GCMONTH'");
        });

        // 结束日期过滤
        u_jsny.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
            //帮助窗口打开前事件
            u_jsny.setClientSqlFilter("ctype = 'GCMONTH'");
        });
    }
}