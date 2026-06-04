
function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700384_m');
    var dgrid = Ext.getCmp('p_form0000700384_d');
    var d1grid = Ext.getCmp('p_form0000700384_d1');
    var d2grid = Ext.getCmp('p_form0000700384_d2');
    dgrid.getColumn('phid_pc_EXName').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        var data = dgrid.getSelectionModel().getSelection();
        var pc = data[0].get('phid_pc');
        execServer('p_form0000700384_xmzt', {
            phid: pc
        }, function (res) {
            if (res.count>0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                data[0].set('textcol_1', data1[0].extendObjects.company);//所属单位
                data[0].set('textcol_2', data1[0].extendObjects.xmzt);//项目状态
            }
        });
    });

    d1grid.getColumn('phid_pc_EXName').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        var data = d1grid.getSelectionModel().getSelection();
        var pc = data[0].get('phid_pc');
        execServer('p_form0000700384_xmzt', {
            phid: pc
        }, function (res) {
            if (res.count>0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                data[0].set('textcol_1', data1[0].extendObjects.company);//所属单位
                data[0].set('textcol_2', data1[0].extendObjects.xmzt);//项目状态
            }
        });
    });

    d2grid.getColumn('phid_pc_EXName').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        var data = d2grid.getSelectionModel().getSelection();
        var pc = data[0].get('phid_pc');
        execServer('p_form0000700384_xmzt', {
            phid: pc
        }, function (res) {
            if (res.count>0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                data[0].set('textcol_1', data1[0].extendObjects.company);//所属单位
                data[0].set('textcol_2', data1[0].extendObjects.xmzt);//项目状态
            }
        });
    });
}

