//专业分包商考核评价
function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000000004_m');
    var dgrid = Ext.getCmp('p_form0000000004_dgrid');
    var dstore = dgrid.store;
    dgrid.setMustInputCol('ms', true);
    dgrid.setReadOnlyCol('glmk', true);
    var pc = mstform.getItem('pc'); //物理主键
    mstform.getItem('bgcs').setVisible(false);
    mstform.getItem('pc').userSetMustInput(true);
    var title = document.getElementById("title-inputEl"); //申请项目编码填写框
    title.setAttribute('placeholder', '选择项目之后之后自动生成！');
    //--数据初始化--//
    if (otype == $Otype.ADD) { }
    //根据项目名称,带出表头信息
    mstform.getItem('pc').addListener('helpselected', function () {
        var pc_val = "'" + pc.getValue() + "'";
        //带入表头信息
        callServer('select_XMBM_list',
            [{
                'pc': pc_val
            }],
            function (res) {
                for (var rskey in res.record[0]) {
                    mstform.getItem(rskey).setValue(res.record[0][rskey]);
                    mstform.getItem(rskey).setReadOnly(true);
                    BatchBindCombox([mstform.getItem(rskey)]);
                }
            });
        callServer('select_CS_list',
            [{
                'pc': pc_val
            }],
            function (res) {
                for (var rskey in res.record[0]) {
                    mstform.getItem(rskey).setValue(res.record[0][rskey]);
                    mstform.getItem(rskey).setReadOnly(true);
                }
            });
        var pc_val = mstform.getItem('pc').getRawValue();
        var bgcs_val = mstform.getItem('bgcs').getValue();
        //修改标题
        mstform.getItem('title').setValue(pc_val + "第[" + bgcs_val + "]次月度报告");
    });
    callServer('select_GLMK_list', [{}], function (res) {
        dstore.removeAll(); //清除单据体内所有数据
        dstore.insert(dstore.getCount(), res.record); //将服务端获取的数组内容插入到单据体
    })
};