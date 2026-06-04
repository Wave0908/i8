function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700233_m');
    var dgrid = Ext.getCmp('p_form0000700233_dgrid');
    var d2grid = Ext.getCmp('p_form0000700233_d2grid');
    var d1grid = Ext.getCmp('p_form0000700233_d1grid');
    var d3grid = Ext.getCmp('p_form0000700233_d3grid');
    var d3store = dgrid.store;
    var dstore = d1grid.store;
    d3grid.hideColumn('prc', true);
    d3grid.hideColumn('qty', true);
    d3grid.hideColumn('amt', true);
    d1grid.disable();
    d1grid.blur = 'false';

    d2grid.hideColumn('userhelp_2_name', true);
    dgrid.getColumn('userhelp_1_name').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        var data = dgrid.getSelectionModel().getSelection();
        var userhelp_1 = data[0].get('userhelp_1');
        callServer('bfjh', [{
            phid: userhelp_1
        }], function (res) {
            if (res.record[0]) {
                data[0].set('u_bfrq', res.record[0].u_jhbfrq);
                data[0].set('userhelpmul_1', res.record[0].ldxm);
                data[0].set('u_ejzwxm', res.record[0].u_cfryzwjxm);
                //data[0].set('textcol_5', res.record[0].compname);
                data[0].set('textcol_2', res.record[0].u_bfkhmc);
                data[0].set('u_bfldzwjxm', res.record[0].u_jhbfldzwjxm);
                data[0].set('u_sbdw', res.record[0].sbdw);
                data[0].set('textcol_6', res.record[0].qy); //所属区域
                data[0].set('textcol_7', res.record[0].cname); //邀约联系人
                data[0].set('u_sfgsdkh', res.record[0].textcol_2); //是否大客户、百户
                data[0].set('u_bfkhh_name', res.record[0].khmc);
                data[0].set('u_bfkhh', res.record[0].khzj);
            }
        });
    });




    d2grid.getColumn('userhelp_1_name').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        var data = d2grid.getSelectionModel().getSelection();
        var userhelp_1 = data[0].get('userhelp_1');
        callServer('bfjh', [{
            phid: userhelp_1
        }], function (res) {
            if (res.record[0]) {
                data[0].set('u_bfrq', res.record[0].u_jhbfrq);
                data[0].set('userhelpmul_1', res.record[0].ldxm);
                data[0].set('u_ejzwxm', res.record[0].u_cfryzwjxm);
                data[0].set('textcol_3', res.record[0].u_bfkhmc);
                data[0].set('u_bfldzwjxm', res.record[0].u_jhbfldzwjxm);
                data[0].set('textcol_4', res.record[0].sbdw);
                data[0].set('textcol_6', res.record[0].qy);
                data[0].set('textcol_5', res.record[0].cname); //邀约联系人
                data[0].set('u_sfgsdkh', res.record[0].textcol_2); //是否大客户、百户
                data[0].set('u_bfkhmc_name', res.record[0].khmc);
                //data[0].set('u_zjqk', res.record[0].u_bfsxsm);
            }
        });
    });


    d2grid.getColumn('u_bfkhmc_name').getEditor().addListener('helpselected', function () {
        var data = d2grid.getSelectionModel().getSelection();
        var empidPhid = data[0].get('u_bfkhmc');
        callServer('khxxxx', [{
            'phid': empidPhid
        }], function (res) {
            console.log(res);
            if (res.record[0]) {
                data[0].set('u_sfgsdkh', res.record[0].bh);//是否大客户

            }
        });
    })



    d1grid.getColumn('userhelp_1_name').getEditor().addListener('helpselected', function () {
        var data = d1grid.getSelectionModel().getSelection();
        var empidPhid = data[0].get('userhelp_1');
        callServer('khxxxx', [{
            'phid': empidPhid
        }], function (res) {
            console.log(res);
            if (res.record[0]) {
                data[0].set('u_sfdkh', res.record[0].bh);//是否大客户

            }
        });
    })




}