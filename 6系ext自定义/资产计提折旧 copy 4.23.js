function allReadyEdit() {
    //初始化
    var mstform = Ext.getCmp('p_form0000000244_m');
    var dgrid = Ext.getCmp('p_form0000000244_d');
    var dgrid1 = Ext.getCmp('p_form0000000244_d1');
    var dstore = dgrid.store;
    var dstore1 = dgrid1.store;

    dgrid1.setReadOnlyCol('u_lcywdy', true);
    dgrid1.setReadOnlyCol('u_lchsbmzjm', true);
    var Toolbar = Ext.getCmp('toolbar');
    var a = 0;
    var b = 0;
    var c = 0;
    if (otype == $Otype.VIEW) {
        Toolbar.insert(1, {
            itemId: "push",
            text: "浪潮推送",
            width: this.itemWidth,
            iconCls: "icon-New"
        });
        Toolbar.items.get('push').on('click', function () {
            Ext.Ajax.request({
                method: 'get',
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                url: "http://172.20.65.5:30599/new_esey/lcApi/pushZcjzToLcZjft?phid=" + busid,
                async: false, //同步请求
                disableCaching: false, // 添加这行来阻止_dc参数
                success: function (response) {
                    window.wait = false;
                    var resdata = JSON.parse(response.text);
                    var status = resdata["status"];
                    var message = resdata["message"];
                    if (status == "success") {
                        Ext.MessageBox.alert(Lang.Notes || '提示', "推送成功.", function () {

                        });
                    } else {
                        Ext.MessageBox.alert(Lang.Notes || '提示', message, function () { });
                    }
                },
                failure: function (response, opts) {
                    window.wait = false;
                    var resdata = JSON.parse(response.text);
                    var status = resdata["status"];
                    var message = resdata["message"];
                    Ext.MessageBox.alert(Lang.Notes || '提示', message);
                }
            });
        });
    }

    if (otype == $Otype.ADD || otype == $Otype.EDIT) {

        //部门填充
        var id = $appinfo.userID - 1;

        dgrid1?.getColumn('sybm_EXName').getEditor().addListener('beforetriggerclick', function () {
            var ocode = mstform.getItem('phid_org').getValue();
            dgrid1?.getColumn('sybm_EXName').getEditor().setClientSqlFilter("parent_orgid in (" + ocode + ")");
        });
        dgrid1?.getColumn('sybm_EXName').getEditor().addListener('helpselected', function () {
            var data = dgrid1.getSelectionModel().getSelection();
            var sybm = data[0].get('sybm');
            console.log("sybm:", sybm);
            execServer('ssxmb_bmywdy', {
                'dept': sybm
            }, function (res) {
                const resData = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (resData[0]) {
                    data[0].set('u_lcywdy', resData[0].extendObjects.user_lcywdy)
                } else {
                    Ext.Msg.alert('提示', '请先维护部门业务单元对照表');
                    return false;
                }
            });

            execServer('ssxmb_zjm', {
                'dept': sybm
            }, function (res) {
                const resData = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log("resData:", resData);
                if (resData[0]) {
                    data[0].set('u_lchsbmzjm', resData[0].extendObjects.user_mnemcodeinaccdepart)
                } else {
                    Ext.Msg.alert('提示', '浪潮核算部门的助记码没有和新中大部门编码保持一致');
                    return false;
                }
            });
        });




        /*根据当前用户id带出部门start*/
        execServer('p_form0000000244_bm', {
            'id': id
        }, function (res) {
            const resData = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            if (resData[0]) {
                mstform.getItem('deptid').setValue(resData[0].extendObjects.phid_dept);
                BatchBindCombox([mstform.getItem('deptid')]);
            }
        });
        /*根据当前用户id带出部门end*/

        mstform.on('dataready', function () {
            var ocode = mstform.getItem('phid_org').getValue();
            console.log('ocode=============>', ocode)
            mstform.getItem('deptid').setClientSqlFilter(` parent_orgid in ('${ocode}') `);
            mstform.getItem('deptid1').setClientSqlFilter(` parent_orgid in ('${ocode}') `);

            mstform.getItem('zjyf').addListener('change', function () {
                //判断设备类型和折旧年份是否输入
                if (Ext.isEmpty(mstform.getItem('zjnf').getValue()) || Ext.isEmpty(mstform.getItem('sblx').getValue())) {
                    Ext.Msg.alert('提示', '请先输入资产类型和折旧年份');
                    mstform.getItem('zjyf').setValue(' ');
                    return false;
                }
                var z = mstform.getItem('phid_org').getValue();
                var bz = mstform.getItem('phid_org').getValue();
                var y = mstform.getItem('zjnf').getValue();
                var m = mstform.getItem('zjyf').getValue();
                var sblx = mstform.getItem('sblx').getValue();
                var u_jtkplxqf = mstform.getItem('u_jtkplxqf').getValue();
                if (z == '324191209000001') {
                    z = u_jtkplxqf
                }
                console.log("组织：", bz);
                console.log("资产类型：", sblx);
                console.log("年份:", y);

                //引用组织名称  正常
                execServer('p_form0000000244_zzmc', {
                    'zzid': bz
                }, function (res) {
                    const resData = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    var zz = resData[0].extendObjects.oname;
                    // 原为title
                    mstform.getItem('bill_name').setValue(zz + y + '年' + m + '月' + '资产折旧单');
                });
                var a = 1;
                //校验

                // 报错
                execServer('p_form0000000244_djyz', {
                    'nd': y,
                    'sblx': sblx,
                    'zz': bz
                }, function (res) {
                    const resData = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    var max = 1;
                    if (res.count > 0) {
                        for (var i = 0; i < resData.length; i++) {
                            var flag = parseInt(resData[i].extendObjects.zjyf);
                            console.log("flag:", flag);
                            m = parseInt(m);
                            if (flag > max) {
                                max = flag;
                            }

                        }
                        console.log("max:", max);
                        if ((m - max) > 1) {
                            Ext.Msg.alert('提示', '请先审核或者录入' + (parseInt(max) + 1) + '月数据');
                            a = 0;
                            dstore.removeAll();
                            return false;
                        }
                    }
                });

                //引用资产卡片
                if (a == 1) {
                    if (sblx != 4) {
                        if (m != 1) {
                            if (Ext.isEmpty(z) || Ext.isEmpty(sblx) || Ext.isEmpty(y) || Ext.isEmpty(m)) {
                                Ext.Msg.alert('提示', '请先输入资产类型、单位名称、资产卡片类型区分、折旧年份');
                                mstform.getItem('zjyf').setValue(' ');
                                return false;
                            }
                            // 报错
                            execServer('p_form0000000244_yyzp', {
                                'zz': z,
                                'sblx': sblx,
                                'nd': y,
                                'yd': m
                            }, function (res) {
                                const resData = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                                // const resArr = resData?.map(item => item.extendObjects);
                                console.log('resData1===============>', resData)
                                if (res.status != 'success') { //判断取数状态
                                    Ext.Msg.alert('提示', '服务端取数失败');
                                    return;
                                } else if (res.count == 0) { //判断数组行数
                                    Ext.Msg.alert('提示', '服务器无上期卡片信息，请检测折旧月份');
                                    return;
                                } else {
                                    dstore.removeAll(); //清除单据体内所有数据
                                    var arr = new Array();
                                    for (let i = 0; i < res.count; i++) {
                                        arr.push({
                                            zcbm: resData[i].extendObjects.zcbm,
                                            zcmc: resData[i].extendObjects.zcmc,
                                            zczl: resData[i].extendObjects.zczl,
                                            zczl_EXName: resData[i].extendObjects.zczl_name,
                                            zcfl: resData[i].extendObjects.zcfl,
                                            zcfl_EXName: resData[i].extendObjects.zcfl_name,
                                            zclyfs: resData[i].extendObjects.zclyfs,
                                            zclyfs_EXName: resData[i].extendObjects.zclyfs_name,
                                            u_gldw: resData[i].extendObjects.u_gldw,
                                            u_gldw_EXName: resData[i].extendObjects.u_gldw_name,
                                            u_glbm: resData[i].extendObjects.u_glbm,
                                            u_glbm_EXName: resData[i].extendObjects.u_glbm_name,
                                            u_sydw: resData[i].extendObjects.u_sydw,
                                            u_sydw_EXName: resData[i].extendObjects.u_sydw_name,
                                            u_sybm: resData[i].extendObjects.u_sybm,
                                            u_sybm_EXName: resData[i].extendObjects.u_sybm_name,
                                            ggxh: resData[i].extendObjects.ggxh,
                                            datetimecol_1: resData[i].extendObjects.datetimecol_1,
                                            bhsje: resData[i].extendObjects.bhsje,
                                            sl: resData[i].extendObjects.sl,
                                            se: resData[i].extendObjects.se,
                                            yz: resData[i].extendObjects.yz,
                                            jz: resData[i].extendObjects.jz,
                                            cz: resData[i].extendObjects.cz,
                                            zjqs: resData[i].extendObjects.zjqs,
                                            yyys: resData[i].extendObjects.yyys,
                                            yzje: resData[i].extendObjects.yzje,
                                            ljzj: resData[i].extendObjects.ljzj,
                                            sbzt: resData[i].extendObjects.sbzt,
                                            lyzj: resData[i].extendObjects.lyzj
                                        })
                                    }
                                    dstore.insert(dstore.getCount(), arr); //将服务端获取的数组内容插入到单据体
                                    //资产净值、减值  价税合计
                                    Ext.Array.each(dstore.data.items, function (record) {
                                        a += Ext.Number.from(record.get('jz'), 0)
                                        mstform.getItem('hj_jzje').setValue(a);
                                    });
                                    Ext.Array.each(dstore.data.items, function (record) {
                                        b += Ext.Number.from(record.get('ljzj'), 0)
                                        mstform.getItem('hj_zcjz').setValue(b);
                                    });
                                    Ext.Array.each(dstore.data.items, function (record) {
                                        c += Ext.Number.from(record.get('se'), 0)
                                        mstform.getItem('hj_se').setValue(c);
                                    });
                                }
                            });

                            // 报错
                            execServer('p_form0000000244_yyzpftxx', {
                                'zz': z,
                                'sblx': sblx,
                                'nd': y,
                                'yd': m
                            }, function (res) {
                                const resData = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                                console.log('resData2===============>', resData)
                                if (res.status != 'success') { //判断取数状态
                                    Ext.Msg.alert('提示', '服务端取数失败');
                                    return;
                                } else if (resData.length == 0) { //判断数组行数
                                    Ext.Msg.alert('提示', '服务器无上期卡片信息，请检测折旧月份');
                                    return;
                                } else {
                                    dstore1.removeAll(); //清除单据体内所有数据
                                    var arr = new Array();
                                    for (let i = 0; i < res.count; i++) {
                                        arr.push({
                                            fylzxm: resData[i].extendObjects.fylzxm,
                                            fylzxm_EXName: resData[i].extendObjects.fylzxm_name,
                                            sybm: resData[i].extendObjects.sybm,
                                            sybm_EXName: resData[i].extendObjects.sybm_name,
                                            u_lcywdy: resData[i].extendObjects.u_lcywdy,
                                            u_lchsbmzjm: resData[i].extendObjects.u_lchsbmzjm,
                                            amt: resData[i].extendObjects.amt
                                        })
                                    }
                                    dstore1.insert(dstore1.getCount(), arr); //将服务端获取的数组内容插入到单据体
                                    //资产净值、减值  价税合计
                                }
                            });
                        } else {
                            execServer('p_form0000000244_yyzpp', {
                                'zz': z,
                                'sblx': sblx,
                                'nd': y,
                            }, function (res) {
                                const resData = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                                console.log('resData3===============>', resData)
                                if (res.status != 'success') { //判断取数状态
                                    Ext.Msg.alert('提示', '服务端取数失败');
                                    return;
                                } else if (resData.length == 0) { //判断数组行数
                                    Ext.Msg.alert('提示', '服务器无上期卡片信息，请检测折旧月份');
                                    return;
                                } else {
                                    dstore.removeAll(); //清除单据体内所有数据
                                    var arr = new Array();
                                    for (let i = 0; i < res.count; i++) {
                                        arr.push({
                                            zcbm: resData[i].extendObjects.zcbm,
                                            zcmc: resData[i].extendObjects.zcmc,
                                            zczl: resData[i].extendObjects.zczl,
                                            zczl_EXName: resData[i].extendObjects.zczl_name,
                                            zcfl: resData[i].extendObjects.zcfl,
                                            zcfl_EXName: resData[i].extendObjects.zcfl_name,
                                            zclyfs: resData[i].extendObjects.zclyfs,
                                            zclyfs_EXName: resData[i].extendObjects.zclyfs_name,
                                            u_gldw: resData[i].extendObjects.u_gldw,
                                            u_gldw_EXName: resData[i].extendObjects.u_gldw_name,
                                            u_glbm: resData[i].extendObjects.u_glbm,
                                            u_glbm_EXName: resData[i].extendObjects.u_glbm_name,
                                            u_sydw: resData[i].extendObjects.u_sydw,
                                            u_sydw_EXName: resData[i].extendObjects.u_sydw_name,
                                            u_sybm: resData[i].extendObjects.u_sybm,
                                            u_sybm_EXName: resData[i].extendObjects.u_sybm_name,
                                            ggxh: resData[i].extendObjects.ggxh,
                                            datetimecol_1: resData[i].extendObjects.datetimecol_1,
                                            bhsje: resData[i].extendObjects.bhsje,
                                            sl: resData[i].extendObjects.sl,
                                            se: resData[i].extendObjects.se,
                                            yz: resData[i].extendObjects.yz,
                                            jz: resData[i].extendObjects.jz,
                                            cz: resData[i].extendObjects.cz,
                                            zjqs: resData[i].extendObjects.zjqs,
                                            yyys: resData[i].extendObjects.yyys,
                                            yzje: resData[i].extendObjects.yzje,
                                            ljzj: resData[i].extendObjects.ljzj,
                                            sbzt: resData[i].extendObjects.sbzt,
                                            lyzj: resData[i].extendObjects.lyzj
                                        })
                                    }
                                    dstore.insert(dstore.getCount(), arr); //将服务端获取的数组内容插入到单据体
                                    //资产净值、减值  价税合计
                                    Ext.Array.each(dstore.data.items, function (record) {
                                        a += Ext.Number.from(record.get('jz'), 0)

                                        mstform.getItem('hj_jzje').setValue(a);
                                    });
                                    Ext.Array.each(dstore.data.items, function (record) {
                                        b += Ext.Number.from(record.get('ljzj'), 0)

                                        mstform.getItem('hj_zcjz').setValue(b);
                                    });
                                    Ext.Array.each(dstore.data.items, function (record) {
                                        c += Ext.Number.from(record.get('se'), 0)

                                        mstform.getItem('hj_se').setValue(c);
                                    });
                                }
                            });

                            // 报错
                            execServer('p_form0000000244_yzppftxx', {
                                'zz': z,
                                'sblx': sblx,
                                'nd': y,
                            }, function (res) {
                                const resData = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                                console.log('resData4===============>', resData)
                                if (res.status != 'success') { //判断取数状态
                                    Ext.Msg.alert('提示', '服务端取数失败');
                                    return;
                                } else if (resData.length == 0) { //判断数组行数
                                    Ext.Msg.alert('提示', '服务器无上期卡片信息，请检测折旧月份');
                                    return;
                                } else {
                                    dstore1.removeAll(); //清除单据体内所有数据
                                    var arr = new Array();
                                    for (let i = 0; i < res.count; i++) {
                                        arr.push({
                                            fylzxm: resData[i].extendObjects.fylzxm,
                                            fylzxm_EXName: resData[i].extendObjects.fylzxm_name,
                                            sybm: resData[i].extendObjects.sybm,
                                            sybm_EXName: resData[i].extendObjects.sybm_name,
                                            u_lcywdy: resData[i].extendObjects.u_lcywdy,
                                            u_lchsbmzjm: resData[i].extendObjects.u_lchsbmzjm,
                                            amt: resData[i].extendObjects.amt
                                        })
                                    }
                                    dstore1.insert(dstore1.getCount(), arr); //将服务端获取的数组内容插入到单据体
                                }
                            });
                        }
                    } else {
                        execServer('p_form0000000244_wxzc', {
                            'zz': z,
                            'sblx': sblx,
                            'nd': y,
                            'yd': m
                        }, function (res) {
                            const resData = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            console.log('resData5===============>', resData)
                            if (res.status != 'success') { //判断取数状态
                                Ext.Msg.alert('提示', '服务端取数失败');
                                return;
                            } else if (res.count == 0) { //判断数组行数
                                Ext.Msg.alert('提示', '服务器无上期卡片信息，请检测折旧月份');
                                return;
                            } else {
                                dstore.removeAll(); //清除单据体内所有数据
                                var arr = new Array();
                                for (let i = 0; i < res.count; i++) {
                                    arr.push({
                                        zcbm: resData[i].extendObjects.zcbm,
                                        zcmc: resData[i].extendObjects.zcmc,
                                        zczl: resData[i].extendObjects.zczl,
                                        zczl_EXName: resData[i].extendObjects.zczl_name,
                                        zcfl: resData[i].extendObjects.zcfl,
                                        zcfl_EXName: resData[i].extendObjects.zcfl_name,
                                        zclyfs: resData[i].extendObjects.zclyfs,
                                        zclyfs_EXName: resData[i].extendObjects.zclyfs_name,
                                        u_gldw: resData[i].extendObjects.u_gldw,
                                        u_gldw_EXName: resData[i].extendObjects.u_gldw_name,
                                        u_glbm: resData[i].extendObjects.u_glbm,
                                        u_glbm_EXName: resData[i].extendObjects.u_glbm_name,
                                        u_sydw: resData[i].extendObjects.u_sydw,
                                        u_sydw_EXName: resData[i].extendObjects.u_sydw_name,
                                        u_sybm: resData[i].extendObjects.u_sybm,
                                        u_sybm_EXName: resData[i].extendObjects.u_sybm_name,
                                        ggxh: resData[i].extendObjects.ggxh,
                                        datetimecol_1: resData[i].extendObjects.datetimecol_1,
                                        bhsje: resData[i].extendObjects.bhsje,
                                        sl: resData[i].extendObjects.sl,
                                        se: resData[i].extendObjects.se,
                                        yz: resData[i].extendObjects.yz,
                                        jz: resData[i].extendObjects.jz,
                                        cz: resData[i].extendObjects.cz,
                                        zjqs: resData[i].extendObjects.zjqs,
                                        yyys: resData[i].extendObjects.yyys,
                                        yzje: resData[i].extendObjects.yzje,
                                        ljzj: resData[i].extendObjects.ljzj,
                                        sbzt: resData[i].extendObjects.sbzt,
                                        lyzj: resData[i].extendObjects.lyzj
                                    })
                                }
                                dstore.insert(dstore.getCount(), arr); //将服务端获取的数组内容插入到单据体
                                //资产净值、减值  价税合计
                                Ext.Array.each(dstore.data.items, function (record) {
                                    a += Ext.Number.from(record.get('jz'), 0)
                                    mstform.getItem('hj_jzje').setValue(a);
                                });
                                Ext.Array.each(dstore.data.items, function (record) {
                                    b += Ext.Number.from(record.get('ljzj'), 0)
                                    mstform.getItem('hj_zcjz').setValue(b);
                                });
                                Ext.Array.each(dstore.data.items, function (record) {
                                    c += Ext.Number.from(record.get('se'), 0)
                                    mstform.getItem('hj_se').setValue(c);
                                });
                            }
                        });
                        execServer('p_form0000000244_wxzcftxx', {
                            'zz': z,
                            'sblx': sblx,
                            'nd': y,
                            'yd': m
                        }, function (res) {
                            const resData = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            console.log('resData6===============>', resData)
                            if (res.status != 'success') { //判断取数状态
                                Ext.Msg.alert('提示', '服务端取数失败');
                                return;
                            } else if (resData.length == 0) { //判断数组行数
                                Ext.Msg.alert('提示', '服务器无上期卡片信息，请检测折旧月份');
                                return;
                            } else {
                                dstore1.removeAll(); //清除单据体内所有数据
                                var arr = new Array();
                                for (let i = 0; i < res.count; i++) {
                                    arr.push({
                                        fylzxm: resData[i].extendObjects.fylzxm,
                                        fylzxm_EXName: resData[i].extendObjects.fylzxm_name,
                                        sybm: resData[i].extendObjects.sybm,
                                        sybm_EXName: resData[i].extendObjects.sybm_name,
                                        u_lcywdy: resData[i].extendObjects.u_lcywdy,
                                        u_lchsbmzjm: resData[i].extendObjects.u_lchsbmzjm,
                                        amt: resData[i].extendObjects.amt
                                    })
                                }
                                dstore1.insert(dstore1.getCount(), arr); //将服务端获取的数组内容插入到单据体
                            }
                        });
                    }
                }
            });
        });
    }
}
//获取附件张数
function attachReturnExt(key, value) {
    var mstform = Ext.getCmp('p_form0000000244_m');
    if (key == 'closeNG3Container') {
        if (value == '') {
            mstform.getItem('fj_num').setValue();
        } else {
            var res = Ext.decode(value);
            mstform.getItem('fj_num').setValue(res.length);
        }
    } else {
        return;
    }
}

