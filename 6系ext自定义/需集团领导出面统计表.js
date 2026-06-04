function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700233_m');
    var dgrid = Ext.getCmp('p_form0000700233_d');
    var d2grid = Ext.getCmp('p_form0000700233_d2');
    var d1grid = Ext.getCmp('p_form0000700233_d1');
    var d3grid = Ext.getCmp('p_form0000700233_d3');
    // var d3store = dgrid.store;
    // var dstore = d1grid.store;
    // d3grid.hideColumn('prc', true);
    // d3grid.hideColumn('qty', true);
    // d3grid.hideColumn('amt', true);
    //d1grid.disable();
    //d1grid.blur = 'false';

    //d2grid.hideColumn('userhelp_2_name', true);
    dgrid.getColumn('userhelp_1_EXName').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        var data = dgrid.getSelectionModel().getSelection();
        var userhelp_1 = data[0].get('userhelp_1');
        execServer('p_form0000700233_bfjh', {
            phid: userhelp_1
        }, function (res) {
            const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            if (res.count > 0) {
                data[0].set('u_bfrq', data1[0].extendObjects.u_jhbfrq);
                data[0].set('userhelpmul_1', data1[0].extendObjects.ldxm);
                data[0].set('u_ejzwxm', data1[0].extendObjects.u_cfryzwjxm);
                //data[0].set('textcol_5', res.record[0].compname);
                data[0].set('textcol_2', data1[0].extendObjects.u_bfkhmc);
                data[0].set('u_bfldzwjxm', data1[0].extendObjects.u_jhbfldzwjxm);
                data[0].set('u_sbdw', data1[0].extendObjects.sbdw);
                data[0].set('textcol_6', data1[0].extendObjects.qy); //所属区域
                data[0].set('textcol_7', data1[0].extendObjects.cname); //邀约联系人
                data[0].set('u_sfgsdkh', data1[0].extendObjects.textcol_2); //是否大客户、百户
                data[0].set('u_bfkhh_EXName', data1[0].extendObjects.khmc);
                data[0].set('u_bfkhh', data1[0].extendObjects.khzj);
            }
        });
    });




    d2grid.getColumn('userhelp_1_EXName').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        var data = d2grid.getSelectionModel().getSelection();
        var userhelp_1 = data[0].get('userhelp_1');
        execServer('p_form0000700233_bfjh', {
            phid: userhelp_1
        }, function (res) {
            const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            if (res.count>0) {
                data[0].set('u_bfrq',  data1[0].extendObjects.u_jhbfrq);
                data[0].set('userhelpmul_1',  data1[0].extendObjects.ldxm);
                data[0].set('u_ejzwxm',  data1[0].extendObjects.u_cfryzwjxm);
                data[0].set('textcol_3',  data1[0].extendObjects.u_bfkhmc);
                data[0].set('u_bfldzwjxm',  data1[0].extendObjects.u_jhbfldzwjxm);
                data[0].set('textcol_4',  data1[0].extendObjects.sbdw);
                data[0].set('textcol_6',  data1[0].extendObjects.qy);
                data[0].set('textcol_5',  data1[0].extendObjects.cname); //邀约联系人
                data[0].set('u_sfgsdkh',  data1[0].extendObjects.textcol_2); //是否大客户、百户
                data[0].set('u_bfkhmc_EXame',  data1[0].extendObjects.khmc);
                //data[0].set('u_zjqk', res.record[0].u_bfsxsm);
            }
        });
    });


    d2grid.getColumn('u_bfkhmc_EXName').getEditor().addListener('helpselected', function () {
        var data = d2grid.getSelectionModel().getSelection();
        var empidPhid = data[0].get('u_bfkhmc');
        execServer('p_form0000700233_khxxxx', {
            'phid': empidPhid
        }, function (res) {
            const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            console.log(res);
            if (res.count>0) {
                data[0].set('u_sfgsdkh', data1[0].extendObjects.bh);//是否大客户
            }
        });
    })


    //因为d1禁用，所以代码也注释
    // d1grid.getColumn('userhelp_1_name').getEditor().addListener('helpselected', function () {
    //     var data = d1grid.getSelectionModel().getSelection();
    //     var empidPhid = data[0].get('userhelp_1');
    //     execServer('p_form0000700233_khxxxx', {
    //         'phid': empidPhid
    //     }, function (res) {
    //         const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
    //         console.log(res);
    //         if (res.count>0) {
    //             data[0].set('u_sfdkh', data1[0].extendObjects.bh);//是否大客户
    //         }
    //     });
    // })




}