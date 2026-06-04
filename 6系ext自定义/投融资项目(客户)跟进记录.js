function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700609_m');
    var dgrid = Ext.getCmp('p_form0000700609_d');
    var dgrid1 = Ext.getCmp('p_form0000700609_d1');
    //新增时显示的字段
    var dstore = dgrid1.store;
    //新增修改时操作
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        dstore.insert(dstore.getCount(),
            [{
                u_czf: '业主出资代表'
            }, {
                u_czf: '社会投资人出资'
            },]);

        /*工程编码自动生成js start*/
        var todayDate = new Date();
        console.log("todayDate:", todayDate);
        var year = todayDate.getFullYear();
        console.log("year:", year);
        var date = todayDate.getDate();
        var month = todayDate.getMonth() + 1;
        var hour = todayDate.getHours();
        var mininutes = todayDate.getMinutes();
        var seconds = todayDate.getSeconds();
        mstform.getItem('bill_no').setValue('TRZGJJL-' + year + month + date + '-' + hour + mininutes + seconds);
        console.log("bill_no:", mstform.getItem('bill_no').getValue());

        //2025.11.14 新增项目带出
        mstform.getItem('u_xm').addListener('helpselected', function () {
            var u_xm = mstform.getItem('u_xm').getValue();
            console.log("u_xm:", u_xm);
            execServer('trzxmyxmgz', {
                'phid': u_xm,
            }, function (res) {
                if (res.count > 0) {
                    const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log("data1:", data1);
                    //主表赋值
                    mstform.getItem('u_sffqgz').setValue(data1[0].extendObjects.u_sffqgz);
                    mstform.getItem('u_zbgl').setValue(data1[0].extendObjects.u_zbgl);
                    mstform.getItem('u_xxzycdfl').setValue(data1[0].extendObjects.u_xxzycdfl);
                    mstform.getItem('u_yjtbsj').setValue(data1[0].extendObjects.u_yjtbsj);
                    mstform.getItem('u_xmgszczb').setValue(data1[0].extendObjects.u_xmgszczb);
                    mstform.getItem('custno').setValue(data1[0].extendObjects.custno);
                    mstform.getItem('u_yzlxr').setValue(data1[0].extendObjects.u_yzlxr);
                    mstform.getItem('u_yzlxfs').setValue(data1[0].extendObjects.u_yzlxfs);
                    mstform.getItem('u_tbze').setValue(data1[0].extendObjects.u_tbze);
                    mstform.getItem('u_yjgchte').setValue(data1[0].extendObjects.u_yjgchte);
                    mstform.getItem('u_xmhzq').setValue(data1[0].extendObjects.u_xmhzq);
                    mstform.getItem('u_jsq').setValue(data1[0].extendObjects.u_jsq);
                    mstform.getItem('u_yyq').setValue(data1[0].extendObjects.u_yyq);
                } else {
                    mstform.getItem('u_sffqgz').setValue(null);
                    mstform.getItem('u_zbgl').setValue(null);
                    mstform.getItem('u_xxzycdfl').setValue(null);
                    mstform.getItem('u_yjtbsj').setValue(null);
                    mstform.getItem('u_xmgszczb').setValue(null);
                    mstform.getItem('custno').setValue(null);
                    mstform.getItem('u_yzlxr').setValue(null);
                    mstform.getItem('u_yzlxfs').setValue(null);
                    mstform.getItem('u_tbze').setValue(null);
                    mstform.getItem('u_yjgchte').setValue(null);
                    mstform.getItem('u_xmhzq').setValue(null);
                    mstform.getItem('u_jsq').setValue(null);
                    mstform.getItem('u_yyq').setValue(null);
                }
            });
            execServer('trzxmyxmgzmx', {
                'phid': u_xm,
            }, function (res) {
                if (res.count > 0) {
                    const data2 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log("data1:", data2);
                    //子表赋值
                    var arr1 = new Array();
                    for (var i = 0; i <= data2.length - 1; i++) {
                        var u_gtgjsj = data2[i].extendObjects.u_gtgjsj;
                        var u_xmjkywt = data2[i].extendObjects.u_xmjkywt;
                        var u_yjyclfs = data2[i].extendObjects.u_yjyclfs;
                        if (u_gtgjsj || u_xmjkywt || u_yjyclfs) {
                            dstore.removeAll();
                            arr1.push({
                                u_gtgjsj: u_gtgjsj,
                                u_xmjkywt: u_xmjkywt,
                                u_yjyclfs: u_yjyclfs
                            });
                        }
                    }
                    dstore.insert(dstore.getCount(), arr1);

                }
            });
        });

    }

}