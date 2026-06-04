/**
 * 工资总额审批表初始化函数
 * 设置表单字段属性、加载数据、绑定事件等
 */
function allReadyEdit() {
    // 获取主表表单对象
    var mstform = Ext.getCmp('p_form0000000196_m');
    // 获取明细表格对象
    var dgrid = Ext.getCmp('p_form0000000196_d');
    // 获取明细表格数据存储对象
    var dstore = dgrid.store;
    //组织设置为只读
    mstform.getItem('phid_org').userSetReadOnly(true);
    //标题设置为必输
    mstform.getItem('bill_name').userSetMustInput(true);
    //录入人设置为隐藏
    mstform.getItem('phid_fill_psn').setVisible(false);
    //审核人设置为隐藏
    mstform.getItem('phid_app').setVisible(false);

    /*自动带出人员部门start*/
    /**
     * 表单数据加载完成后，根据录入人自动获取并设置部门信息
     */
    mstform.on('dataready', function () {
        // 获取录入人ID
        var id = mstform.getItem('phid_fill_psn').getValue();
        // 调用服务端获取部门信息
        execServer('p_form0000000196_bmmc', {
            'id': id
        }, (res) => {
            // 解析返回数据，处理字符串或对象格式
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            if (data[0]) {
                // 设置部门字段值
                mstform.getItem('dept').setValue(data[0].extendObjects.phid_dept);
                // 刷新下拉框显示
                BatchBindCombox([mstform.getItem('dept')]);
            }
        });
    });
    /*自动带出人员部门end*/

    /*明细表插入固定数据start*/
    /**
     * 从服务端获取工资总额基础数据并加载到明细表
     */
    execServer('p_form0000000196_gz', {}, (res) => {
        // 解析返回数据，处理字符串或对象格式
        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
        console.log("res:", res);
        console.log("data:", data);
        // 提取每条记录中的extendObjects对象
        const targetData = data?.map(item => {
            return item.extendObjects;
        });
        if(res.status != 'success') { //判断取数状态
            Ext.Msg.alert('提示', '服务端取数失败');
            return;
        } else if (data.length == 0) { //判断数组行数
            Ext.Msg.alert('提示', '系统未维护工资总额基础数据，请联系管理员');
            return;
        } else {
            dstore.removeAll(); //清除单据体内所有数据
            dstore.insert(dstore.getCount(), targetData); //将服务端获取的数组内容插入到单据体                    
        }
    });
    /*明细表插入固定数据end*/
    /*给表体字段名换颜色start*/
    // 使用setTimeout确保DOM元素已经加载完成
    setTimeout(function() {
        try {
            //把管理层级设置为蓝色
            var el1 = document.getElementById("gridcolumn-1073-textEl");
            if(el1) el1.style.color = 'blue';
            //人员分类设置为蓝色
            var el2 = document.getElementById("gridcolumn-1074-textEl");
            if(el2) el2.style.color = 'blue';
            //工资总额设置为蓝色
            var el3 = document.getElementById("gridcolumn-1075-titleEl");
            if(el3) el3.style.color = 'blue';
            //人均工资设置为蓝色
            var el4 = document.getElementById("gridcolumn-1076-textEl");
            if(el4) el4.style.color = 'blue';
            //固定工资小计
            var el5 = document.getElementById("gridcolumn-1078-textEl");
            if(el5) el5.style.color = 'blue';
            //津补贴小计
            var el6 = document.getElementById("gridcolumn-1083-titleEl");
            if(el6) el6.style.color = 'blue';
            //浮动工资小计
            var el7 = document.getElementById("gridcolumn-1093-textEl");
            if(el7) el7.style.color = 'blue';
        } catch(e) {
            console.log("设置表格列颜色时出错:", e);
        }
    }, 1000);
    /*给表体字段名换颜色end*/

    /*部门根据组织过滤start*/

    mstform.getItem('dept').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        var zz = mstform.getItem('phid_org').getValue();
        mstform.getItem('dept').setOutFilter({
            parent_orgid: zz
        })
    });
    /*部门根据组织过滤end*/

    /*表体更新表体字段start*/
    /**
     * 监听明细表编辑事件，实时计算工资总额和人均工资等数据
     * 当用户修改表格中的数值时，自动计算相关汇总数据
     */
    dgrid.addListener('edit', function (editor, e) {
        console.log("e:",e);
        // 如果值未变化，不进行处理
        if (e.originalValue == e.value) {
            return;
        }
        // 判断编辑的字段是否需要触发计算
        if (e.field == 'kzrs' || e.field == 'nx' || e.field == 'gwgz' || e.field == 'jnhdegz' || e.field == 'dgshfscjt' || e.field == 'njgt' || e.field == 'xxrjbgz' || e.field == 'fdjbgz' || e.field == 'wsf' || e.field == 'jsbt' || e.field == 'zzjt' || e.field == 'bjbt' || e.field == 'gybt' || e.field == 'gztz' || e.field == 'glcydjujxj' || e.field == 'qtcjydjujxj' || e.field == 'gszyjtzxj' || e.field == 'ejdwzxj' || e.field == 'yxj' || e.field == 'xmjgdx' || e.field == 'ldbznzj' || e.field == 'ygnzj') {
            var record = e.record;
            console.log("record:",record);
            // 确保开支人数已填写
            if (record.data.kzrs != 0) {
                // 计算固定工资小计
                console.log("record.data.nx:",record.data.nx);
                console.log("固定工资小计计算:", Ext.Number.from(record.data.nx, 0) + Ext.Number.from(record.data.gwgz, 0) + Ext.Number.from(record.data.jnhdegz, 0) + Ext.Number.from(record.data.dgshfscjt, 0));
                record.set('gdgzxj', Ext.Number.from(record.data.nx, 0) + Ext.Number.from(record.data.gwgz, 0) + Ext.Number.from(record.data.jnhdegz, 0) + Ext.Number.from(record.data.dgshfscjt, 0));
                
                // 计算工资总额（所有工资项目的总和）
                record.set('gzze', Ext.Number.from(record.data.nx, 0) + Ext.Number.from(record.data.gwgz, 0) + Ext.Number.from(record.data.jnhdegz, 0) + Ext.Number.from(record.data.dgshfscjt, 0) + Ext.Number.from(record.data.njgt, 0) + Ext.Number.from(record.data.xxrjbgz, 0) + Ext.Number.from(record.data.fdjbgz, 0) + Ext.Number.from(record.data.wsf, 0) + Ext.Number.from(record.data.jsbt, 0) + Ext.Number.from(record.data.zzjt, 0) + Ext.Number.from(record.data.bjbt, 0) + Ext.Number.from(record.data.gybt, 0) + Ext.Number.from(record.data.gztz, 0) + Ext.Number.from(record.data.gszyjtzxj, 0) + Ext.Number.from(record.data.xmjgdx, 0) + Ext.Number.from(record.data.yxj, 0) + Ext.Number.from(record.data.ejdwzxj, 0) + Ext.Number.from(record.data.glcydjujxj, 0) + Ext.Number.from(record.data.qtcjydjujxj, 0) + Ext.Number.from(record.data.ygnzj, 0) + Ext.Number.from(record.data.ldbznzj, 0));
                
                // 计算人均工资（工资总额/开支人数）
                record.set('rjgz', Ext.Number.from(record.data.gzze, 0) / Ext.Number.from(record.data.kzrs, 0));

                // 初始化汇总变量
                var sumKzrs = 0;    // 开支人数汇总
                var sumAvgKzrs = 0;  // 所有人员开支人数汇总
                var sumSgze = 0;     // 施工人员工资总额
                var sumGzze = 0;     // 所有人员工资总额

                // 遍历所有明细行，计算汇总数据
                for (var i = 0; i < dstore.getCount(); i++) {
                    // 特定行（施工人员）的汇总
                    if (i == 0 || i == 1 || i == 3 || i == 5 || i == 7 || i == 8) {
                        sumKzrs += Ext.Number.from(dstore.getAt(i).data.kzrs, 0);
                        sumSgze += Ext.Number.from(dstore.getAt(i).data.gzze, 0);
                        console.log("dstore.getAt(i).data.gzze:", dstore.getAt(i).data.gzze);
                        console.log("sumSgze:", sumSgze);
                    }
                    // 所有人员的汇总
                    sumGzze += Ext.Number.from(dstore.getAt(i).data.gzze, 0);
                    sumAvgKzrs += Ext.Number.from(dstore.getAt(i).data.kzrs, 0);
                }
                
                // 设置主表汇总字段值
                mstform.getItem('sgryzs').setValue(sumKzrs);  // 施工人员总数
                mstform.getItem('sgze').setValue(sumSgze);    // 施工人员工资总额
                mstform.getItem('gzze').setValue(sumGzze);    // 所有人员工资总额
                mstform.getItem('rjgz').setValue(sumGzze / sumAvgKzrs);  // 人均工资

            } else {
                // 如果开支人数为0，提示用户并重置当前字段
                Ext.Msg.alert('提示', '请先填写开支人数');
                var temp = e.field
                record.set(temp, '0');
            }

        };
    });
    /*表体更新表体字段end*/

}