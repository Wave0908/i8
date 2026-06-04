function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700224_m');
    var dgrid = Ext.getCmp('p_form0000700224_d');
    var dgrid1 = Ext.getCmp('p_form0000700224_d1');
    var dgrid2 = Ext.getCmp('p_form0000700224_d2');
    var Toolbar = Ext.getCmp('toolbar');
    var dstore = dgrid.store;
    var dstore2 = dgrid2.store;
    console.log('00000000000000000000')
    // mstform.getItem('asr_flg').hide();
    dstore2.insert(dstore.getCount(),
        [{
            u_fjmc: '打分表'
        }, {
            u_fjmc: '分包述评资料'
        }, {
            u_fjmc: '会议照片影像'
        }, {
            u_fjmc: '其他'
        },
        ]);

    // mstform.getItem('u_apsl').hide();
    // mstform.getItem('u_aupsl').hide();
    // mstform.getItem('u_bpsl').hide();
    // mstform.getItem('u_bupsl').hide();
    // mstform.getItem('u_cpsl').hide();
    // mstform.getItem('u_cupsl').hide();
    // mstform.getItem('u_apn').hide();
    // mstform.getItem('u_aupn').hide();
    // mstform.getItem('u_bpn').hide();
    // mstform.getItem('u_bupn').hide();
    // mstform.getItem('u_cpn').hide();
    // mstform.getItem('u_cupn').hide();
    dgrid.addListener('edit', function (editor, e) {
        var record = e.record;
        if (e.originalValue == e.value) {
            return;
        }

        if (e.field == 'u_spdf') {

            if (record.get('u_spdf') > 100) {
                Ext.Msg.alert('提示', '当前评分已经大于满分请重新输入');
                record.set('u_spdf', 0);
                return false;
            }
            var sum1 = 0;
            var sum2 = 0;
            var a1 = 0
            var a2 = 0
            var apass = ''
            var aupass = ''
            var b1 = 0
            var b2 = 0
            var bpass = ''
            var bupass = ''
            var c1 = 0
            var c2 = 0
            var cpass = ''
            var cupass = ''
            Ext.Array.each(dstore.data.items, function (record) {
                if (record.get('u_spdf') > 69.5) {
                    record.set('u_pxjg', '通过')
                    sum1 += 1
                    if (record.get('u_fbszxdj') == 1) {
                        console.log(record);
                        apass = apass + record.get('u_fbsmc_name') + "\n" + "/";
                        a1 += 1
                    }
                    else if (record.get('u_fbszxdj') == 2) {
                        b1 += 1
                        bpass = bpass + record.get('u_fbsmc_name') + "\n" + "/";
                    }
                    else if (record.get('u_fbszxdj') == 3) {
                        c1 += 1
                        cpass = cpass + record.get('u_fbsmc_name') + "\n" + "/";
                    }
                }
                else {
                    record.set('u_pxjg', '未通过')
                    sum2 += 1
                    if (record.get('u_fbszxdj') == 1) {
                        a2 += 1
                        aupass = aupass + record.get('u_fbsmc_name') + "\n" + "/";
                    }
                    else if (record.get('u_fbszxdj') == 2) {
                        b2 += 1
                        bupass = bupass + record.get('u_fbsmc_name') + "\n" + "/";
                    }
                    else if (record.get('u_fbszxdj') == 3) {
                        c2 += 1
                        cupass = cupass + record.get('u_fbsmc_name') + "\n" + "/";
                    }
                }

            });
            mstform.getItem('u_tgfbssl').setValue(sum1);
            mstform.getItem('u_wtgfbssl').setValue(sum2);
            mstform.getItem('u_apsl').setValue(a1);
            mstform.getItem('u_aupsl').setValue(a2);
            mstform.getItem('u_bpsl').setValue(b1);
            mstform.getItem('u_bupsl').setValue(b2);
            mstform.getItem('u_cpsl').setValue(c1);
            mstform.getItem('u_cupsl').setValue(c2);
            mstform.getItem('u_apn').setValue(apass);
            mstform.getItem('u_aupn').setValue(aupass);
            mstform.getItem('u_bpn').setValue(bpass);
            mstform.getItem('u_bupn').setValue(bupass);
            mstform.getItem('u_cpn').setValue(cpass);
            mstform.getItem('u_cupn').setValue(cupass);
        }
    })

    dgrid1.getColumn('empid_EXName').getEditor().addListener('helpselected', function () {
        var data = dgrid1.getSelectionModel().getSelection();
        var empidPhid = data[0].get('empid');
        console.log(empidPhid);
        execServer('p_form0000700224_dwbm', {
            'phid': empidPhid
        }, function (res) {
            const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            console.log(data1);
            if (data1[0]) {
                data[0].set('u_dwjbm', data1[0].xrzw);
            }
        });
    })
}
