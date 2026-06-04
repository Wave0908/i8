function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700415_m');
    var dgrid = Ext.getCmp('p_form0000700415_d');
    var dstore = dgrid.store;
    var Toolbar = Ext.getCmp('toolbar');
    mstform.getItem('u_hjje').hide();
    //mstform.getItem('u_wzmc').hide();
    mstform.getItem('u_hjsl').hide();
    mstform.getItem('u_ncldj').hide();
    dgrid.addListener('edit', function (editor, e) {
        var sum = 0;
        var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
        for (i = 0; i < dstore.getCount(); i++) {
            sum += a[i].get('qty');
        }
        mstform.getItem('u_hjsl').setValue(sum);
    })
    dgrid.addListener('edit', function (editor, e) {
        var sum2 = 0;
        var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
        for (i = 0; i < dstore.getCount(); i++) {
            sum2 += a[i].get('amt');
        }
        mstform.getItem('u_hjje').setValue(sum2);
    })
    dgrid.addListener('edit', function (editor, e) {
        var sum2 = 0;
        var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
        for (i = 0; i < dstore.getCount(); i++) {
            sum2 += a[i].get('prc');
        }
        mstform.getItem('u_ncldj').setValue(sum2);
    })


    Toolbar.insert(1, {
        itemId: "push",
        text: "推送D6c",
        width: this.itemWidth,
        iconCls: "icon-New"
    });

    Toolbar.items.get('push').on('click', function () {

        /*AJAX请求start*/
        Ext.Ajax.request({
            url: "http://172.20.65.5:19082/esey/D6c/D6cpushData/d6c_wzczdzb/d6c_wzczdzb/" + busid,
            method: 'GET',
            async: false, //同步请求

            success: function (response) {
                var result = Ext.decode(response.responseText);
                var message = result["message"];
                if (message == "调用成功") {
                    Ext.MessageBox.alert(Lang.Notes || '提示', "推送成功.", function () {

                    });
                } else {
                    Ext.MessageBox.alert(Lang.Notes || '提示', message, function () { });
                }

            },
            failure: function (response) {
                console.error("请求失败")
            }

        });
    })


}
