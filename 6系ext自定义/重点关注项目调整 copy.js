
function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700384_m');
    var dgrid = Ext.getCmp('p_form0000700384_dgrid');
    var d1grid = Ext.getCmp('p_form0000700384_d1grid');
    var d2grid = Ext.getCmp('p_form0000700384_d2grid');
    dgrid.getColumn('pc_name').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        var data = dgrid.getSelectionModel().getSelection();
        var pc = data[0].get('pc');
        callServer('xmzt', [{
            phid: pc
        }], function (res) {
            if (res.record[0]) {
                data[0].set('textcol_1', res.record[0].company);//所属单位
                data[0].set('textcol_2', res.record[0].xmzt);//项目状态
            }
        });
    });

    d1grid.getColumn('pc_name').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        var data = d1grid.getSelectionModel().getSelection();
        var pc = data[0].get('pc');
        callServer('xmzt', [{
            phid: pc
        }], function (res) {
            if (res.record[0]) {
                data[0].set('textcol_1', res.record[0].company);//所属单位
                data[0].set('textcol_2', res.record[0].xmzt);//项目状态
            }
        });
    });

    d2grid.getColumn('pc_name').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        var data = d2grid.getSelectionModel().getSelection();
        var pc = data[0].get('pc');
        callServer('xmzt', [{
            phid: pc
        }], function (res) {
            if (res.record[0]) {
                data[0].set('textcol_1', res.record[0].company);//所属单位
                data[0].set('textcol_2', res.record[0].xmzt);//项目状态
            }
        });
    });
}

