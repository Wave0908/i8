function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700230_m');
    var dgrid = Ext.getCmp('p_form0000700230_d');

    // var Toolbar = Ext.getCmp('toolbar');
    // var dstore = dgrid.store;


    dgrid.getColumn('userhelp_1_EXName').getEditor().addListener('helpselected', function () {
        var data = dgrid.getSelectionModel().getSelection();
        var empidPhid = data[0].get('userhelp_1');
        execServer('p_form0000700230_khxxxx', {
            'phid': empidPhid
        }, function (res) {
            const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            console.log(res);
            if (res.count > 0) {
                data[0].set('textcol_2', data1[0].extendObjects.bh);//是否大客户

            }
        });
    })
}
function beforeSaveEdit() {
    var mstform = Ext.getCmp('p_form0000700230_m');
    var dgrid = Ext.getCmp('p_form0000700230_d');

    //var Toolbar = Ext.getCmp('toolbar');
    var flag = 1;
    var dstore = dgrid.store;
    for (i = 0; i < dstore.getCount(); i++) {
        console.log("dstore:",dstore);
        console.log("dstore.getAt(i):",dstore.getAt(i));
        console.log("dstore.getAt(i).get('u_jhbfrq'):",dstore.getAt(i).get('u_jhbfrq'));
        var time = /\d{4}-\d{1,2}-\d{1,2}/g.exec(dstore.getAt(i).get('u_jhbfrq'));
        time = "'" + time + "'";
        console.log("格式化时间" + time);
        var cmlds = dstore.getAt(i).get('u_xcmjtld');
        var cmld = cmlds.split(",")
        var bfkh = dstore.getAt(i).get('userhelp_1');
        for (j = 0; j < cmld.length; j++) {
            var n = j + 1;
            console.log("第" + n + "位领导");
            console.log(time);
            console.log(cmld[j]);
            console.log(bfkh);
            if (otype == $Otype.ADD) {
                execServer('p_form0000700230_cfbfjc', {
                    'jhbfrq': time, 'cmjtld': cmld[j], 'bfkh': bfkh
                }, function (res) {
                    if (res.count > 0) {
                        var name = '';
                        var bfkhmc = '';
                        execServer('p_form0000700230_ldmc', {
                            'cmjtld': cmld[j]
                        }, function (res) {
                            const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            if (res.count > 0) {
                                name = data1[0].extendObjects.cname;
                            }

                        });
                        execServer('p_form0000700230_bfkhmc', {
                            'phid': bfkh
                        }, function (res) {
                            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            if (res.count > 0) {
                                bfkhmc = data[0].extendObjects.title;
                            }
                        });
                        var massage = name + '已录入' + time + '拜访' + bfkhmc + '的计划'
                        Ext.MessageBox.show({
                            title: '提示',
                            msg: massage,
                            modal: false
                        });
                        //Ext.Msg.alert('提示', massage);
                        console.log('提示', name + '已录入' + time + '拜访' + bfkhmc + '的计划');
                        dstore.getAt(i).set('u_jhbfrq', '');
                        flag = 0
                    }
                });
            } else if (otype == $Otype.EDIT) {
                execServer('p_form0000700230_lcz', {
                    'jhbfrq': time, 'cmjtld': cmld[j], 'bfkh': bfkh
                }, function (res) {
                    //const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log("res：" + res);
                    if (res.count > 0) {
                        var name = '';
                        var bfkhmc = '';
                        execServer('p_form0000700230_ldmc', {
                            'cmjtld': cmld[j]
                        }, function (res) {
                            console.log(res);
                            const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            if (res.count > 0) {
                                name = data1[0].extendObjects.cname;
                            }
                        });
                        execServer('p_form0000700230_bfkhmc', {
                            'phid': bfkh
                        }, function (res) {
                            console.log(res);
                            const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            if (res.count > 0) {
                                bfkhmc = data1[0].extendObjects.title;
                            }

                        });
                        var massage = name + '已录入' + time + '拜访' + bfkhmc + '的计划'
                        Ext.MessageBox.show({
                            title: '提示',
                            msg: massage,
                            modal: false
                        });
                        //Ext.Msg.alert('提示', massage);
                        console.log('提示', name + '已录入' + time + '拜访' + bfkhmc + '的计划');
                        dstore.getAt(i).set('u_jhbfrq', '');
                        flag = 0
                    }
                });
            }
        }
    }
    console.log("flag:" + flag)
    if (flag == 1) {
        return true;
    } else {
        return false
    }
}
