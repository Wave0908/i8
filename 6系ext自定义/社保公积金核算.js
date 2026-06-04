function allReadyEdit() { //初始化
    var mstform = Ext.getCmp('p_form0000000122_m');
    var dgrid = Ext.getCmp('p_form0000000122_dgrid');
    var dstore = dgrid.store;
    mstform.getItem('textcol_1').el.down('input').on('dblclick', function () {
        var url = C_ROOT + 'RW/DesignFrame/ReportView?rep_src=0&rep_code=202006040001&replink=false&datavaluetype=cell';
        $OpenTab('社保公积金查询报表', url);
    });


    dgrid.hideColumn('bir_amt', true);
    dgrid.hideColumn('hurt_amt', true);

    var pc = mstform.getItem('gzfa');
    pc.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        var y = mstform.getItem('year').getValue();
        var m = mstform.getItem('month').getValue(); ////帮助窗口打开前事件
        if (Ext.isEmpty(y) || Ext.isEmpty(m)) {
            Ext.Msg.alert('提示', '请先维护核算年度、核算月度');
            return false;
        } else {
            pc.setOutFilter({
                userphid: $appinfo.userID,
                uyear: y,
                mon: m
            }) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤			   
        }
    });
    //填充本月工资人数并引入上月社保数据
    var Toolbar = Ext.getCmp('toolbar');
    Toolbar.insert(3, {
        itemId: "yy",
        text: "引入",
        width: this.itemWidth,
        iconCls: "icon-New"
    }); //指定位置插入按钮
    Toolbar.items.get('yy').on('click', function () {
        var code = mstform.getItem('ocode').getValue();
        var y = mstform.getItem('year').getValue();
        var m = mstform.getItem('month').getValue();
        var gzdata = "'" + mstform.getItem('gzfa').getValue() + "'";

        if (Ext.isEmpty(code) || Ext.isEmpty(y) || Ext.isEmpty(m) || Ext.isEmpty(gzdata)) {
            Ext.Msg.alert('提示', '请先填写核算组织、核算年度、核算月度、工资方案！');
            return false;
        } else {
            var mm = "'" + m + "'";
            var yy = "'" + y + "'";
            if (m == 1) {
                var month = "'" + 12 + "'";
                var year = "'" + (y - 1) + "'";
            } else {
                var month = "'" + (m - 1) + "'";
                var year = "'" + y + "'";
            }
            execServer('yy_sb', {
                'fa': gzdata,
                'month': month,
                'mm': mm,
                'year': year,
                'yy': yy,
                'ocode': code
            }, (res) => {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (res.status != 'ok') { //判断取数状态
                    Ext.Msg.alert('提示', '无缴纳社保人员');
                    return false;
                } else if (data.length == 0) { //判断数组行数
                    Ext.Msg.alert('提示', '找不到上月社保数据，请检查核算月度');
                    return false;
                } else {
                    //dstore.removeAll(); //清除单据体内所有数据
                    dstore.insert(dstore.getCount(), data); //将服务端获取的数组内容插入到单据体                    
                }
            });

            //背景改变事件
            //获取表体的数组
            var b = dgrid.getStore().getRange(0, dstore.getCount() - 1);
            //表体第一个的phid
            var str = b[0].id;
            var arr = str.split('-');
            var num = parseInt(arr[3]);

            for (var i = 0; i < dstore.getCount(); i++) {
                var flag = b[i].get('flag');
                if (flag == 0) {
                    var c = 'gridview-1093-record-ext-record-' + (num + i);
                    document.getElementById(c).style.backgroundColor = "yellow";
                    document.getElementById(c).classList.add("x-grid-row-alt");
                }

            }


        }
    });

    //根据姓名填充表体
    dgrid.addListener('edit', function (editor, e) {
        var record = e.record;
        if (e.originalValue == e.value) {
            return;
        }
        if (e.field == 'empid' || e.field == 'empid_name') {
            execServer('p_form0000000122_sb', {
                'phid': record.get('empid')
            }, (res) => {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (data[0]) {
                    record.set('deptid', data[0].extendObjects.dept);
                    record.set('deptid_name', data[0].extendObjects.deptname);
                    record.set('emp_no', data[0].extendObjects.cno);
                    record.set('emp_num', data[0].extendObjects.cardno);
                    record.set('o_code', data[0].extendObjects.oname);
                    record.set('emp_type', data[0].extendObjects.emptype);
                    record.set('emp_type_name', data[0].extendObjects.cs_name);
                    record.set('enp_status', data[0].extendObjects.assigntype);
                }
            });
        }
    });
}
//保存前检测
function beforeSaveEdit() {
    var mstform = Ext.getCmp('p_form0000000122_m');
    var dgrid = Ext.getCmp('p_form0000000122_dgrid');
    var dstore = dgrid.store;
    var flag = 0;
    var num = 0;
    var bb = 0;
    if (otype == $Otype.ADD) {
        //获取年份
        var myear = mstform.getItem('year').getValue();
        //获取月份
        var mmonth = mstform.getItem('month').getValue();

        /*检测表体中如果有重复提交社保的给予提示start*/
        for (var i = 0; i < dstore.getCount(); i++) {
            var emp_no = "'" + dstore.getAt(i).get('emp_num') + "'"
            execServer('p_form0000000122_save_qc', {
                'emp_no': emp_no,
                'year': myear,
                'month': mmonth
            }, (res) => {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log(data);
                for (var j = 0; j < data.length; j++) {
                    if (data[j].extendObjects.year == myear && data[j].extendObjects.month == mmonth) {
                        Ext.MessageBox.show({
                            title: '提示',
                            msg: '单据第' + (i + 1) + '行,单据编号:' + data[j].extendObjects.bill_no + "于" + myear + '年' + mmonth + '月' + '的社保公积金已由,组织:' + data[j].extendObjects.ocode + ',录入人:' + data[j].extendObjects.fillpsn + ',录入,请删除',
                            modal: false
                        });
                        flag = 1;
                        return false;
                    } else {
                        flag = 0;
                    }
                }
            });
        }
        /*检测表体中如果有重复提交社保的给予提示end*/

        //表体检测查重
        function ck() {
            var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
            for (var m = 0; m < dstore.getCount(); m++) {
                var id = a[m].get('emp_num');
                //冒泡
                for (var n = m + 1; n < dstore.getCount(); n++) {
                    var id_name = a[n].get('emp_num');
                    if (id == id_name) {
                        console.log(m + 1, id, n + 1, id_name)
                        Ext.MessageBox.show({
                            title: '提示',
                            msg: '第' + (m + 1) + '行数据与第' + (n + 1) + '行人员重复，请删除一个',
                            modal: false
                        });
                        num = 1;
                        return false;
                    } else {
                        num = 0;
                    }
                }
            }
        }
        //社保数据组织检测
        function zzyz() {
            var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
            var zz = mstform.getItem('ocode').getValue();
            for (var i = 0; i < dstore.getCount(); i++) {
                var dtid = a[i].get('deptid');
                execServer('zzyz', {
                    'dtid': dtid
                }, (res) => {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    if (zz == data[0].extendObjects.parent_orgid) {
                        bb = 0;
                    } else {
                        Ext.MessageBox.show({
                            title: '提示',
                            msg: '第' + (i + 1) + '行工资核算组织与当前组织不符,请核对',
                            modal: false
                        });
                        bb = 1
                    }
                })
            }
        }
        ck();
        zzyz();

    }
    /*根据flag=0保存成功，其他情况保存失败start*/
    if (flag == 0 && num == 0 && bb == 0) {
        return true;
    } else {
        return false;
    }
    /*根据flag=0保存成功，其他情况保存失败end*/

}