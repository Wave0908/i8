function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700347_m');

    var dgrid = Ext.getCmp('p_form0000700347_d1');

    var dstore = dgrid.store;
    var d2grid = Ext.getCmp('p_form0000700347_d2');

    var d2store = d2grid.store;

    /* //mstform.getItem('userhelp_2').setValue(1); //审计问题大类
 mstform.getItem('userhelp_3').on('beforetriggerclick', function() { //审计问题小类
 if(mstform.getItem('userhelp_2').getValue() == '') {
     Ext.Msg.alert('提示', '请先选择审计问题大类');
     return false;
 }
 });  
 mstform.getItem('userhelp_3').on('beforetriggerclick', function() { //帮助窗口打开前事件
     var u_industry_type = mstform.getItem('userhelp_2').getValue()
     mstform.getItem('userhelp_3').setClientSqlFilter(" 审计问题小类编码 in (select 审计问题小类编码 from  sjwtlx where 审计问题大类编码 in (select 审计问题大类编码 from qghylx where 审计问题大类编码 ='"+u_industry_type+"' )) ");
 });*/


    d2grid.addListener('edit', function (editor, e) { //监听单据体编辑状态，edit-编辑；add-增行；cellclick-点击
        var data = d2grid.getSelectionModel().getSelection();
        var userhelp_1 = data[0].get('userhelp_1');
        var userhelp_2 = data[0].get('userhelp_2');
        if (e.field == 'userhelp_2') {
            if (!userhelp_1) {
                NGMsg.Error('审计问题大类未选择！')
                data[0].set(userhelp_2, '');
                return false;
            } else {

                data[0].get('userhelp_2').getEditor().setOutFilter(" 审计问题小类编码 in (select 审计问题小类编码 from  sjwtlx where 审计问题大类编码 in (select 审计问题大类编码 from qghylx where 审计问题大类编码 ='" + u_industry_type + "' )) ");
            }
        }
    });



    /*d2grid.getColumn('xzdbm_name').getEditor().on('beforetriggerclick', function(eOp, ignoreBeforeEvent) {
       var data = d2grid.getSelectionModel().getSelection();
       var userhelp_1 = data[0].get('userhelp_1');
       d2grid.getColumn('xzdbm_name').getEditor().setOutFilter(" 审计问题小类编码 in (select 审计问题小类编码 from  sjwtlx where 审计问题大类编码 in (select 审计问题大类编码 from qghylx where 审计问题大类编码 ='"+u_industry_type+"' )) ");
           
   });*/







    dgrid.getColumn('userhelp_1_EXName').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        var row = dgrid.getSelectionModel().getSelection();
        var empidPhid = row[0].get('userhelp_1');
        execServer('p_form0000700347_sjwc', {
            'phid': empidPhid
        }, function (res) {
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            console.log(res);
            if (res.count > 0) {
                row[0].set('textcol_1', data[0].extendObjects.u_xb);//性别
                row[0].set('textcol_2', data[0].extendObjects.u_nl);//年龄
                row[0].set('textcol_3', data[0].extendObjects.u_specialty);//专业
                row[0].set('textcol_4', data[0].extendObjects.u_xl);//学历
                row[0].set('textcol_5', data[0].extendObjects.lxfs);//联系方式
                row[0].set('textcol_6', data[0].extendObjects.post);//职务
            }
        });
    })



    mstform.getItem('userhelp_1').addListener('helpselected', function () {
        var userhelp_1 = mstform.getItem("userhelp_1").getValue();

        execServer('p_form0000700347_nf', {
            phid: userhelp_1
        }, function (res) {
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            if (res.count > 0) {
                mstform.getItem('textcol_1').setValue(data[0].extendObjects.userhelp_2);
            }
        });

    });






}

function DateMinus(datetimecol_1, datetimecol_2) {//date1:小日期date2:大日期
    var mstform = Ext.getCmp('p_form0000700347_m');

    var dgrid = Ext.getCmp('p_form0000700347_d1');

    var dstore = dgrid.store;
    var sdate = new Date(datetimecol_1);
    var now = new Date(datetimecol_2);
    var days = now.getTime() - sdate.getTime();
    var day = parselnt(days / (1000 * 60 * 60 * 24));
    console.log(day);
    var dd = data[0].get('datetimecol_1');
    var fh = data[0].get('datetimecol_2');
    if (dd != '' && fh != '') {
        dgrid.getColumn('longcol_1').setValue(day);
        console.log(day);
    }
}