function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700609_m');
    var dgrid = Ext.getCmp('p_form0000700609_dgrid');
    //新增时显示的字段
    var dstore = dgrid.store;
    dstore.insert(dstore.getCount(),
        [{
            u_czf: '业主出资代表'
        }, {
            u_czf: '社会投资人出资'
        },]);

    /*工程编码自动生成js start*/
    var todayDate = new Date();
    var year = todayDate.getFullYear();
    var date = todayDate.getDate();
    var month = todayDate.getMonth() + 1;
    var hour = todayDate.getHours();
    var mininutes = todayDate.getMinutes();
    var seconds = todayDate.getSeconds();
    mstform.getItem('bill_no').setValue('TRZGJJL-' + year + month + date + '-' + hour + mininutes + seconds);
}