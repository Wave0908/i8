function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000000196_m');
    var dgrid = Ext.getCmp('p_form0000000196_dgrid');
    var dstore = dgrid.store;
    //组织设置为只读
    mstform.getItem('ocode').userSetReadOnly(true);
    //标题设置为必输
    mstform.getItem('title').userSetMustInput(true);
    //录入人设置为隐藏
    mstform.getItem('fillpsn').setVisible(false);
    //审核人设置为隐藏
    mstform.getItem('checkpsn').setVisible(false);

    /*自动带出人员部门start*/
    mstform.on('dataready', function () {
        var id = mstform.getItem('fillpsn').getValue();
        callServer('bmmc', [{
            'id': id
        }], function (res) {
            if (res.record[0]) {
                mstform.getItem('dept').setValue(res.record[0].dept);
                BatchBindCombox([mstform.getItem('dept')]);
            }
        })
    });
    /*自动带出人员部门end*/

    /*明细表插入固定数据start*/
    callServer('gz', [{}], function (res) {
        if (res.status != 'ok') { //判断取数状态
            Ext.Msg.alert('提示', '服务端取数失败');
            return;
        } else if (res.record.length == 0) { //判断数组行数
            Ext.Msg.alert('提示', '系统未维护工资总额基础数据，请联系管理员');
            return;
        } else {
            dstore.removeAll(); //清除单据体内所有数据
            dstore.insert(dstore.getCount(), res.record); //将服务端获取的数组内容插入到单据体                    
        }

    });
    /*明细表插入固定数据end*/
    /*给表体字段名换颜色start*/
    //把管理层级设置为蓝色
    document.getElementById("gridcolumn-1073-textEl").style.color = 'blue'
    //人员分类设置为蓝色
    document.getElementById("gridcolumn-1074-textEl").style.color = 'blue'
    //工资总额设置为蓝色
    document.getElementById("gridcolumn-1075-titleEl").style.color = 'blue'
    //人均工资设置为蓝色
    document.getElementById("gridcolumn-1076-textEl").style.color = 'blue'
    //固定工资小计
    document.getElementById("gridcolumn-1078-textEl").style.color = 'blue'
    //津补贴小计
    document.getElementById("gridcolumn-1083-titleEl").style.color = 'blue'
    //浮动工资小计
    document.getElementById("gridcolumn-1093-textEl").style.color = 'blue'
    /*给表体字段名换颜色end*/

    /*部门根据组织过滤start*/

    mstform.getItem('dept').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        var zz = mstform.getItem('ocode').getValue();
        mstform.getItem('dept').setOutFilter({
            parent_orgid: zz
        })
    });
    /*部门根据组织过滤end*/

    /*表体更新表体字段，内容太多就不做注释了start*/
    dgrid.addListener('edit', function (editor, e) {

        if (e.originalValue == e.value) {
            return;
        }
        if (e.field == 'kzrs' || e.field == 'nx' || e.field == 'gwgz' || e.field == 'jnhdegz' || e.field == 'dgshfscjt' || e.field == 'njgt' || e.field == 'xxrjbgz' || e.field == 'fdjbgz' || e.field == 'wsf' || e.field == 'jsbt' || e.field == 'zzjt' || e.field == 'bjbt' || e.field == 'gybt' || e.field == 'gztz' || e.field == 'glcydjujxj' || e.field == 'qtcjydjujxj' || e.field == 'gszyjtzxj' || e.field == 'ejdwzxj' || e.field == 'yxj' || e.field == 'xmjgdx' || e.field == 'ldbznzj' || e.field == 'ygnzj') {
            var record = e.record;
            if (record.data.kzrs != 0) {
                //固定工资小计
                record.set('gdgzxj', Ext.Number.from(record.get('nx'), 0) + Ext.Number.from(record.get('gwgz'), 0) + Ext.Number.from(record.get('jnhdegz'), 0) + Ext.Number.from(record.get('dgshfscjt'), 0));
                //工资总额
                record.set('gzze', Ext.Number.from(record.get('nx'), 0) + Ext.Number.from(record.get('gwgz'), 0) + Ext.Number.from(record.get('jnhdegz'), 0) + Ext.Number.from(record.get('dgshfscjt'), 0) + Ext.Number.from(record.get('njgt'), 0) + Ext.Number.from(record.get('xxrjbgz'), 0) + Ext.Number.from(record.get('fdjbgz'), 0) + Ext.Number.from(record.get('wsf'), 0) + Ext.Number.from(record.get('jsbt'), 0) + Ext.Number.from(record.get('zzjt'), 0) + Ext.Number.from(record.get('bjbt'), 0) + Ext.Number.from(record.get('gybt'), 0) + Ext.Number.from(record.get('gztz'), 0) + Ext.Number.from(record.get('gszyjtzxj'), 0) + Ext.Number.from(record.get('xmjgdx'), 0) + Ext.Number.from(record.get('yxj'), 0) + Ext.Number.from(record.get('ejdwzxj'), 0) + Ext.Number.from(record.get('glcydjujxj'), 0) + Ext.Number.from(record.get('qtcjydjujxj'), 0) + Ext.Number.from(record.get('ygnzj'), 0) + Ext.Number.from(record.get('ldbznzj'), 0));
                //人均工资
                record.set('rjgz', Ext.Number.from(record.get('gzze'), 0) / Ext.Number.from(record.get('kzrs'), 0));

                var sumKzrs = 0;
                var sumAvgKzrs = 0;
                var sumSgze = 0;
                var sumGzze = 0;

                for (i = 0; i < dstore.getCount(); i++) {
                    if (i == 0 || i == 1 || i == 3 || i == 5 || i == 7 || i == 8) {
                        sumKzrs += Ext.Number.from(dstore.getAt(i).get('kzrs'), 0);
                        sumSgze += Ext.Number.from(dstore.getAt(i).get('gzze'), 0);
                    }
                    sumGzze += Ext.Number.from(dstore.getAt(i).get('gzze'), 0);
                    sumAvgKzrs += Ext.Number.from(dstore.getAt(i).get('kzrs'), 0);
                }
                mstform.getItem('sgryzs').setValue(sumKzrs);
                mstform.getItem('sgze').setValue(sumSgze);
                mstform.getItem('gzze').setValue(sumGzze);
                mstform.getItem('rjgz').setValue(sumGzze / sumAvgKzrs);

            } else {
                Ext.Msg.alert('提示', '请先填写开支人数');
                var temp = e.field
                record.set(temp, '0');
            }

        };
    });

    /*表体更新表体字段，内容太多就不做注释了end*/

}