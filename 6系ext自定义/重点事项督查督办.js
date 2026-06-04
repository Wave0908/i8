function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700176_m');
    var dgrid = Ext.getCmp('p_form0000700176_d');
    var dstore = dgrid.store;
    var Toolbar = Ext.getCmp('toolbar');
    var dgrid1 = Ext.getCmp('p_form0000700176_d');
    var d1store = dgrid1.store;
    mstform.getItem('ddlbcol_2').setVisible(false);
    mstform.getItem('phid_app').hide(); //隐藏
    mstform.getItem('phid_fill_psn').hide();
    mstform.getItem('textcol_2').userSetReadOnly(true);
    /* mstform.getItem('ischeck').addListener('change', function () {                    //监听表头checkboxcol_1字段值发生变化后立即触发
         mstform.getItem('datetimecol_2').setValue
         (mstform.getItem('check_dt').getValue() );    
     });  */
    if (otype == $Otype.EDIT || otype == $Otype.VIEW) {
        setTimeout(function () {
            execServer('p_form0000700161_xx', {
                phid: busid
            }, function (res) {
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    const datas = new Array();
                    for (i = 0; i <= data.length - 1; i++) {
                        d1store.insert(d1store.getCount(), data[i].extendObjects);
                    }
                }
            })
        }, 1000)

    }

    if (otype == $Otype.EDIT || otype == $Otype.VIEW) {
        setTimeout(function () {
            execServer('p_form0000700176_xx1', [{
                phid: busid
            }], function (res) {
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    mstform.getItem("datetimecol_3").setValue(data[0].extendObjects.u_sqyq);
                    //console.log(res.record);
                }
            })
        }, 1000)

    }


    dstore.on('add', function (store, records, index, eOpts) { //单据体增行更新事件
        var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
        for (var i = 0; i < a.length; i++) {
            if (i == a.length - 1) {
                a[i].set('u_fksj', new Date());
            }
        }
    });

    mstform.getItem('u_cbr').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件

        var empid1 = mstform.getItem('empid1').getValue();
        if (Ext.isEmpty(empid1)) {
            Ext.Msg.alert('提示', '请先维护负责人');
            return false;
        }
        var empid2 = '0';
        execServer('p_form0000700176_phidempid', {
            phid: empid1
        }, function (res) {
            if (res.count > 0) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (data[0].extendObjects.phid_org != '324191209000001') {
                    var myempid = data[0].extendObjects.phid_org
                    mstform.getItem('u_cbr').setClientSqlFilter(' cbr.zzbm = ' + myempid);
                } else {
                    var phid = data[0].extendObjects.phid
                    mstform.getItem('u_cbr').setClientSqlFilter(' hemphid in ( select org_id from fg_orglsit_rlzzs fol where fol.org_id in ( select phid from dept where deptno in( select parent_deptno from dept where phid = ( select hem.phid_dept from fg3_user fu left join hr_epm_main hem on hem.phid = fu.hrid where hem.phid = ' + phid + ') ) union all select phid from dept where phid = ( select hem.phid_dept from fg3_user fu left join hr_epm_main hem on hem.phid = fu.hrid where hem.phid = ' + phid + ') ) or fol.parent_orgid in ( select phid from dept where deptno in( select parent_deptno from dept where phid = ( select hem.phid_dept from fg3_user fu left join hr_epm_main hem on hem.phid = fu.hrid where hem.phid = ' + phid + ') ) union all select phid from dept where phid = ( select hem.phid_dept from fg3_user fu left join hr_epm_main hem on hem.phid = fu.hrid where hem.phid = ' + phid + ') ) )');
                }
            }
        })


    });
}

function attachReturnExt(key, value) {
    var dgrid = Ext.getCmp('p_form0000700168_d');
    var data = dgrid.getSelectionModel().getSelection();
    var nr = '';
    if (data.length < 1) return;
    if (key == 'closeNG3Container') {
        if (value == '') {
            data[0].set('u_fjnr', '');
        } else {
            nr = data[0].get('u_fjnr');
            var res = Ext.decode(value);
            for (var i = 0; i < res.length; i++) {
                var mc;
                if (mc != undefined) {
                    mc = mc + ',' + res[i].asr_name
                } else if (mc == undefined) {
                    mc = res[i].asr_name
                }
                data[0].set('u_fjnr', mc + ',' + nr);
            }
        }
        var fjnr = data[0].get('u_fjnr');
        data[0].set('u_fjnr', fjnr.substr(0, fjnr.length - 1));
    } else {
        return;
    }
}