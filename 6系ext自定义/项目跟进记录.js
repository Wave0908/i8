function allReadyEdit() {
    //获取投融资标后总结表
    var mstform = Ext.getCmp('p_form0000700161_m');
    //获取子表的原因分析
    var dgrid = Ext.getCmp('p_form0000700161_d');
    var dstore = dgrid.store;
    var Toolbar = Ext.getCmp('toolbar');
    console.log(Toolbar)
    /* mstform.getItem ('empid').setVisible(false); 
     mstform.getItem ('u_zbfw').setVisible(false); 
     mstform.getItem ('u_gcgk').setVisible(false); 
     mstform.getItem ('u_syzz').setVisible(false); 
     mstform.getItem ('u_gxhxmmc').setVisible(false);
     */
    mstform.on('dataready', function () {
        console.log("dataready:")
        var fillpsn = mstform.getItem('phid_fill_psn').getValue();
		console.log("fillpsn:",fillpsn);
		var userID = $appinfo.userID;
		console.log("userID:", userID);
        if (fillpsn != $appinfo.userID) {
            var temp = 0;
            execServer('jsqxsq', {
                'a': userID
            }, function (res) {
                console.log("res:", res);
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log("data:",data);
				for (var i = 0; i < data.length-1; i++) {
                    if (data[i].extendObjects.roleno == 'JTAdmin') {
                        temp = 1;
                    }
                }
                if (temp == 1) {
                    dgrid.setReadOnlyCol('u_gtgjsj', false);
                    dgrid.setReadOnlyCol('u_xmjkwt', false);
                    dgrid.setReadOnlyCol('u_wtgjclfs', false);
                    Toolbar.get('deleterow').show();
                    Toolbar.get('addrow').show();
                } else {
                    dgrid.setReadOnlyCol('u_gtgjsj', true);
                    dgrid.setReadOnlyCol('u_xmjkwt', true);
                    dgrid.setReadOnlyCol('u_wtgjclfs', true);
                    Toolbar.get('deleterow').hide();
                    Toolbar.get('addrow').hide();
                }
            });
        }
    });

    mstform.getItem('u_gcjsjd').addListener('beforetriggerclick', function () {
        var userhelp_1 = mstform.getItem('userhelp_1').getValue();
        if (Ext.isEmpty(userhelp_1)) {
            Ext.Msg.alert('提示', '请先选择项目');
            return false;
        }
        var u_gcjsjd = '00'
        execServer('gcjsjd', {
            'userhelp_1': userhelp_1
        }, function (res) {
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            console.log("data:", data);
            if (data.length != 0) {
                u_gcjsjd = data[0].extendObjects.u_gcjsjd
                mstform.getItem('u_gcjsjd').setClientSqlFilter('c_no >' + u_gcjsjd);
            }
        });
    });

    mstform.getItem('u_zbgl').addListener('change', function () {
        var aa = mstform.getItem('u_zbgl').getValue();
        if (aa >= 0.9) {
            mstform.getItem('ddlbcol_1').setValue('1');
        } else if (aa < 0.9 && aa >= 0.8) {
            mstform.getItem('ddlbcol_1').setValue('2');
        } else if (aa < 0.8 && aa >= 0.5) {
            mstform.getItem('ddlbcol_1').setValue('3');
        } else {
            mstform.getItem('ddlbcol_1').setValue('4');
        }
    })






    mstform.getItem('userhelp_1').addListener('helpselected', function () {
        var userhelp_1 = mstform.getItem("userhelp_1").getValue();
        console.log("userhelp_1:", userhelp_1);
        execServer('p_form0000700161_xxcd', {
            'phid': userhelp_1
        }, function (res) {

            if (res) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log("data[0]:", data[0]);
                //console.log("mstform.getItem('u_gxhxmmc'):",mstform.getItem('u_gxhxmmc'));
                mstform.getItem('u_zbgl').setValue(data[0].extendObjects.zbgl);
                mstform.getItem('ddlbcol_1').setValue(data[0].extendObjects.ddlbcol_1);
                mstform.getItem('datetimecol_2').setValue(data[0].extendObjects.yjtbrq);
                mstform.getItem('numericcol_1').setValue(data[0].extendObjects.yjhte);
                mstform.getItem('u_gxhxmmc').setValue(data[0].extendObjects.bill_name);
                mstform.getItem('u_gcgk').setValue(data[0].extendObjects.xmgk);
                mstform.getItem('u_syzz').setValue(data[0].extendObjects.syzz);
                mstform.getItem('empid').setValue(data[0].extendObjects.empid);
                BatchBindCombox([mstform.getItem('empid')]);
                mstform.getItem('u_zbfw').setValue(data[0].extendObjects.zbfw);
                /*
                mstform.getItem('empid').setValue(res.record[0].empid);
                mstform.getItem('u_zbfw').setValue(res.record[0].zbfw);
                mstform.getItem('u_gcgk').setValue(res.record[0].xmgk);
                mstform.getItem('u_syzz').setValue(res.record[0].syzz);
                */
            }
            /*
            callServer('khjcl', [{phid:userhelp_1}],function (res) {
                    d1store.insert(dstore.getCount(),res.record);
                    console.log(res.record);
	
            })
            */
        });

    });

}