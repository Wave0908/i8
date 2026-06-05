function allReady() {

}

function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700176_m');
    var dgrid = Ext.getCmp('p_form0000700176_d');
    var dstore = dgrid.store;
    var Toolbar = Ext.getCmp('toolbar');
    var dgrid1 = Ext.getCmp('p_form0000700176_d1');
    var d1store = dgrid1.store;


    //承办人节点控制开始
    if (otype == $Otype.EDIT) {

        
        console.log("busid1:", busid);
        //进来先检测是不是承办人节点，如果是直接先把提交按钮隐藏
        execServer('mqjd', {
            phid: busid
        }, function (res) {
            if (res.count > 0) {
                console.log("开局判断是否为承办人节点");
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (data[0].extendObjects.task_def_key_ == 'ext-gen2222') {  //当前节点为承办人
                    console.log("当前节点为测试节点");
                    console.log("Toolbar1:", Toolbar);
                    //Toolbar.getItem('taskcomplete').setReadOnly(true);
                    document.getElementById('wfbtn_taskcomplete').style.display = 'none';
                    //document.getElementById('wfbtn_taskcomplete_btnInnerEl').hidden = true;
                    Toolbar.get('addrow').on('click',function(){     
                        var sfbj = mstform.getItem('ddlbcol_3').getValue()
                        var length = dstore.getCount();
                        var flag = 0;
                        if(length > 0 && sfbj == '0' ){
                           
                            document.getElementById('wfbtn_taskcomplete').style.display = 'block'
                        }else{
                            document.getElementById('wfbtn_taskcomplete').style.display = 'none'
                        }
                    }) 
                    Toolbar.get('deleterow').on('click',function(){     
                        var sfbj = mstform.getItem('ddlbcol_3').getValue()
                        var length = dstore.getCount();
                        var flag = 0;
                        if(length > 0 && sfbj == '0' ){
                           
                            document.getElementById('wfbtn_taskcomplete').style.display = 'block'
                        }else{
                            document.getElementById('wfbtn_taskcomplete').style.display = 'none'
                        }
                    }) 
                    /////
                    mstform.getItem('ddlbcol_3').addListener('change', function () {                    //监听表头是否办结字段
                        console.log("busid2:", busid);
                        var sfbj = mstform.getItem('ddlbcol_3').getValue()
                        var length = dstore.getCount();
                        var flag = 0;
                        if(length > 0 && sfbj == '0' ){
                            document.getElementById('wfbtn_taskcomplete').style.display = 'block'
                        }else{
                            document.getElementById('wfbtn_taskcomplete').style.display = 'none'
                        }
                    });
                    ////             
                }
            }
        })
    }

    //承办人节点控制结束


    mstform.getItem('ddlbcol_2').setVisible(false);
    mstform.getItem('phid_app').hide(); //隐藏

    mstform.getItem('phid_fill_psn').hide();
    mstform.getItem('textcol_2').userSetReadOnly(true);


    /* mstform.getItem('ischeck').addListener('change', function () {                    //监听表头checkboxcol_1字段值发生变化后立即触发
         mstform.getItem('datetimecol_2').setValue
         (mstform.getItem('check_dt').getValue() );    
     });  */

    // if (otype == $Otype.EDIT || otype == $Otype.VIEW) {
    //     var getbillno = mstform.getFieldValue('bill_no');
    //     setTimeout(function () {
    //         execServer('p_form0000700176_xx', {
    //             billno: getbillno
    //         }, function (res) {
    //             if (res.count > 0) {
    //                 const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
    //                 const datas = new Array();
    //                 for (i = 0; i <= data.length - 1; i++) {
    //                     d1store.insert(d1store.getCount(), data[i].extendObjects);
    //                 }
    //             }
    //         })
    //     }, 1000)

    // }

    if (otype == $Otype.EDIT || otype == $Otype.VIEW) {
        mstform.on('dataready', function () {
            var djphid = mstform.getItem('phid').getValue();
            // var getbillno = mstform.getItem('bill_no').getValue();
            setTimeout(function () {
                execServer('p_form0000700176_xx1', { phid: djphid }, function (res) {
                    if (res.count > 0) {
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        console.log(data)
                        mstform.getItem("datetimecol_3").setValue(data[0].extendObjects.u_sqyq);
                        //console.log(res.record);
                    }
                })
            }, 1000)

            setTimeout(function () {
                execServer('p_form0000700176_xx', {
                    phid: djphid
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

        });


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

// function attachReturnExt(key, value) {
//     var dgrid = Ext.getCmp('p_form0000700168_d');
//     var data = dgrid.getSelectionModel().getSelection();
//     var nr = '';
//     if (data.length < 1) return;
//     if (key == 'closeNG3Container') {
//         if (value == '') {
//             data[0].set('u_fjnr', '');
//         } else {
//             nr = data[0].get('u_fjnr');
//             var res = Ext.decode(value);
//             for (var i = 0; i < res.length; i++) {
//                 var mc;
//                 if (mc != undefined) {
//                     mc = mc + ',' + res[i].asr_name
//                 } else if (mc == undefined) {
//                     mc = res[i].asr_name
//                 }
//                 data[0].set('u_fjnr', mc + ',' + nr);
//             }
//         }
//         var fjnr = data[0].get('u_fjnr');
//         data[0].set('u_fjnr', fjnr.substr(0, fjnr.length - 1));
//     } else {
//         return;
//     }
// }