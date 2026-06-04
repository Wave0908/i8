function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000000263_m');
    var d1grid = Ext.getCmp('p_form0000000263_d1');
    var d2grid = Ext.getCmp('p_form0000000263_d2');
    var d1store = d1grid.store;
    var d2store = d2grid.store;
    var pfrbm = '';
    var strpfsm = '请结合经营类指标完成情况，领导班子述职内容及日常情况了解，从思想政治建设、团结协作、作风形象综合情况进行打分评价;\n评价档次：优秀：90-100分；良好：70-89分；一般：60-69分；较差：0-59分。 '

    hidegridc();
    if (otype == $Otype.ADD) {
        mstform.getItem('empid').userSetReadOnly(true);
        mstform.getItem('pfsm').setValue(strpfsm);
    }

    mstform.getItem('pfzq').addListener('helpselected', function () {
        if (!Ext.isEmpty(mstform.getItem('pfzq').getValue())) {
            execServer('p_form0000000263_pdkhzqry', { ndfw: mstform.getItem('pfzq').getValue() }, function (res1) {
                //console.log(res1.record[0].sl);
                if (res1.count > 0) {
                    const data1 = typeof res1.data === 'string' ? JSON.parse(res1.data) : res1.data;
                    if (data1[0].extendObjects.sl == 0) {
                        Ext.Msg.alert('提示', '未定义范围的考核周期,请重新选择！');
                        mstform.getItem('empid').userSetReadOnly(true);
                    }
                    else {
                        mstform.getItem('empid').userSetReadOnly(false);
                    }
                }

            })
        }
        mstform.getItem('empid').setValue(null);
        mstform.getItem('bill_name').setValue(null);
        d1store.removeAll();                     //清除单据体内所有数据
        d2store.removeAll();                     //清除单据体内所有数据
    })

    mstform.getItem('empid').addListener('helpselected', function (obj) {
        if (Ext.isEmpty(mstform.getItem('pfzq').getValue())) {
            mstform.getItem('empid').setValue(null);
            Ext.Msg.alert('提示', '请选择考评周期！');
        }
        else {
            fillgrid(obj.code, obj.name, mstform.getItem('pfzq').getValue());
            hidegridc();
        }

    })




    function fillgrid(csygbm, csygxm, cspfzq) {
        execServer('p_form0000000263_sfyjl', { yhbm1: csygbm, kpnd1: cspfzq }, function (res) {
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                var tmpcount = data1[0].extendObjects.sfcz;
                if (tmpcount == 0) {
                    execServer('p_form0000000263_GetKpdw', { kpnd: cspfzq }, function (res) {
                        mstform.getItem('bill_name').setValue(cspfzq + '年度' + csygxm + '同志对相关单位领导班子综合考核评分表');
                        d1store.removeAll(); //清除单据体内所有数据
                        var arr = new Array();
                        const data2 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        for (i = 0; i < res.count; i++) {
                            arr.push({
                                dwbm: data2[i].extendObjects.dwbm,
                                dwmc: data2[i].extendObjects.dwmc,
                            });
                        }
                        d1store.insert(d1store.getCount(), arr); //将服务端获取的数组内容插入到单据体
                    });
                    execServer('p_form0000000263_GetKpzgxmb', { kpnd: cspfzq }, function (res) {
                        if (res.count > 0) {
                            const data2 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            d2store.removeAll(); //清除单据体内所有数据
                            var arr = new Array();
                            for (i = 0; i < res.count; i++) {
                                console.log("data2[i].extendObjects:",data2[i].extendObjects);
                                arr.push({
                                    zgxmbbm: data2[i].extendObjects.zgxmbbm,
                                    zgxmbmc: data2[i].extendObjects.zgxmbmc,
                                });
                            }
                            d2store.insert(d2store.getCount(), arr); //将服务端获取的数组内容插入到单据体
                        }

                    });
                }
                else {
                    mstform.getItem('empid').setValue(null);
                    mstform.getItem('bill_name').setValue(null);
                    d1store.removeAll(); //清除单据体内所有数据
                    d2store.removeAll(); //清除单据体内所有数据
                    Ext.Msg.alert('提示', '此领导在本评分周期内已发送评分表！');
                }
            }

        })

    }

    function hidegridc() {
        if (Ext.Number.from($appinfo.userID) != 313191217001129) {
            d1grid.hideColumn('dwbm', true);
            d2grid.hideColumn('zgxmbbm', true);

        }
        else {
            d1grid.hideColumn('pf', false);
            d1grid.hideColumn('jshpf', false);
            d1grid.hideColumn('jshpf1', false);
            d2grid.hideColumn('pf1', false);
            d2grid.hideColumn('jshpf4', false);
            d2grid.hideColumn('jshpf5', false);
        }
    }


    d1grid.addListener('edit', function (editor, e) {
        //判断原值与新值是否相同s
        // if (e.originalValue == e.value) {
        //     return;
        // }

        if (e.field == 'pf') {
            var record = e.record;
            if (Ext.Number.from(record.get('pf'), 0) > 1 && Ext.Number.from(record.get('pf'), 0) <= 100) {
                //领导班子  和  经理助理、副三总师  部门   2021年考核规则中 将  经理助理、副三总师 作为部长层面进行打分
                if (Ext.Number.from(pfrbm, 0) == 548191210000045)// || Ext.Number.from(pfrbm,0)==548191210000046)    
                {
                    record.set('jshpf', Ext.Number.from(record.get('pf'), 0) * 0.1);   //领导打分折算后存于 jshpf
                    record.set('jshpf1', 0);
                }
                else {
                    record.set('jshpf', 0);
                    record.set('jshpf1', Ext.Number.from(record.get('pf'), 0) * 0.1);  //部门部长打分折算后存于 jshpf1                 
                }

            }
            else {
                record.set('pf', null);
                record.set('jshpf', 0);
                record.set('jshpf1', 0);
                Ext.Msg.alert('提示', '评分不能低于0分，或高于100分！');
            }
        }
    })

    d2grid.addListener('edit', function (editor, e) {
        //判断原值与新值是否相同s
        // if (e.originalValue == e.value) {
        //     return;
        // }

        if (e.field == 'pf1') {
            var record = e.record;
            if (Ext.Number.from(record.get('pf1'), 0) > 1 && Ext.Number.from(record.get('pf1'), 0) <= 100) {
                //领导班子  和  经理助理、副三总师  部门   2021年考核规则中 将  经理助理、副三总师 作为部长层面进行打分
                if (Ext.Number.from(pfrbm, 0) == 548191210000045)// || Ext.Number.from(pfrbm,0)==548191210000046)  
                {
                    record.set('jshpf4', Ext.Number.from(record.get('pf1'), 0) * 0.1);  //领导打分折算后存于 jshpf4
                    record.set('jshpf5', 0);
                }
                else {
                    record.set('jshpf4', 0);
                    record.set('jshpf5', Ext.Number.from(record.get('pf1'), 0) * 0.1);  //部门部长打分折算后存于 jshpf5                      
                }
            }
            else {
                record.set('pf1', null);
                record.set('jshpf4', 0);
                record.set('jshpf5', 0);
                Ext.Msg.alert('提示', '评分不能低于0分，或高于100分！');
            }
        }
    })

    mstform.on('dataready', function () {
        var dlid;
        // if (otype == $Otype.EDIT || otype == $Otype.VIEW) 
        // {
        //     hidegridc();                    
        // }  
        execServer('p_form0000000263_GetEpmId', { dlid: $appinfo.userID }, function (res) {
            console.log("res:", res);
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log("data1:", data1);
                dlid = data1[0].extendObjects.hrid;
                if (dlid) {
                    execServer('p_form0000000263_GetPfrDept', { epmids: dlid }, function (res3) {
                        if (res3.count > 0) {
                            const data2 = typeof res3.data === 'string' ? JSON.parse(res3.data) : res3.data;
                            pfrbm = data2[0].extendObjects.dept;
                        }
                    });
                }
            }
        });
    })
}

