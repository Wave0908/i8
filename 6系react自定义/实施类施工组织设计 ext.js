/*
function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700630_m');
    //mstform.getItem('bill_no').setVisible(false);
    mstform.getItem('u_gclxej').addListener('change', function () {
        mstform.getItem('u_gclxsj').setValue('');
        var u_gclxejzj = mstform.getItem('u_gclxej').getValue();
        var sjml = mstform.getItem('u_gclxsj')                                      //帮助字段PC 赋值给pc （通用帮助可选数据据过滤示例1）
        sjml.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {    //帮助窗口打开前事件
            sjml.setOutFilter({ pid: u_gclxejzj })        //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
        });

    })

    mstform.getItem('u_gclx').addListener('helpselected', function () {
        u_gclxzj = mstform.getItem('u_gclxej').setValue('');
        u_gclxzj = mstform.getItem('u_gclxsj').setValue('');
        var u_gclxzj = mstform.getItem('u_gclx').getValue();
        var ejml = mstform.getItem('u_gclxej')                                      //帮助字段PC 赋值给pc （通用帮助可选数据据过滤示例1）
        ejml.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {    //帮助窗口打开前事件
            ejml.setOutFilter({ pid: u_gclxzj })        //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
        });
    })
}
*/
function AllReady() {
    var mstform = Ext.getCmp('p_form0000700630_m');
    var dgrid = Ext.getCmp('p_form_0000700630_d1');
    mstform.getItem('u_gclx').addListener('change', function (obj) {
        var gclx = mstform.getItem('u_gclx').getValue();
        console.log("gclx", gclx)
        if (gclx) {
            execServer('yjml', {
                phid: gclx
            }, function (res) {
                console.log("res:", res);
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    mstform.getItem('bill_name').setValue(data[0].extendObjects.c_name + "实施类施工组织设计");
                }
            })
        }
    })
    dgrid.getColumn('u_ejfl_EXName').getEditor().addListener('beforetriggerclick', function () {
        var yjfl = mstform.getItem('u_gclx').getValue();
        dgrid.getColumn('u_ejfl_EXName').getEditor().setClientSqlFilter("pid = " + yjfl);
    });
    dgrid.getColumn('u_sjfl_EXName').getEditor().on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        var data = dgrid.getSelectionModel().getSelection();
        var ejfl = data[0].get('u_ejfl');

        dgrid.getColumn('u_sjfl_EXName').getEditor().setOutFilter({
            'pid': ejfl
        });
        //dgrid.getColumn('u_khywglej_name').getEditor().setOutFilter("ejbm in (select ejbm from khywfl where yjbm in (select yjbm from khywfl_yj where yjbm ='"+userhelp_1+"' )) ");
    });

}



