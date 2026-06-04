function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700088_m');
        // mstform.getItem ('u_hylb').setVisible(false);    
        // mstform.getItem ('u_tbsyl').setVisible(false);    
        // mstform.getItem ('u_clms').setVisible(false);    

        mstform.getItem('empid').addListener('helpselected', function (obj) {
        var fgldphid = mstform.getItem("empid").getValue();
        console.log("fgldphid:",fgldphid);
        execServer('zyjk_getygxx', {
            'phid': fgldphid
        }, function (res) {
            console.log("res:",res); 
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            if (data) {
                mstform.getItem("u_lxdh").setValue(data[0].extendObjects.phone); //电话
            }
        });
    })
    
    

    mstform.getItem('u_htmc').addListener('helpselected', function (obj) {
        var u_htmc = mstform.getItem("u_htmc").getValue();
        execServer('p_form0000700088_htjy_htx', {
            'phid': u_htmc
        }, function (res) {
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            if (res && data[0]) {
                mstform.getItem("u_htbm").setValue(data[0].extendObjects.bill_no); 
                mstform.getItem("custno").setValue(data[0].extendObjects.phid_reccomp);
                mstform.getItem("u_htlx").setValue(data[0].extendObjects.cnt_type); 
                mstform.getItem("u_gclb").setValue(data[0].extendObjects.user_gclx1);
              
                mstform.getItem("u_htje").setValue(data[0].extendObjects.cnt_sum_vat_fc); 
                mstform.getItem("u_clms").setValue(data[0].extendObjects.user_clfs); 
                mstform.getItem("u_kgsj").setValue(data[0].extendObjects.start_dt);
                mstform.getItem("u_jgsj").setValue(data[0].extendObjects.end_dt);

                BatchBindCombox([
                mstform.getItem('custno'),
                mstform.getItem('u_htlx'),
                mstform.getItem('u_gclb'),
                mstform.getItem('u_clms')
            ]);
                
            }
        });
    })

}