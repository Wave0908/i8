// ------------------------代码从这里粘贴开始--------------------------------------------
function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000000052_m');
    var dgrid1 = Ext.getCmp('p_form0000000052_d1');
    var d1store = dgrid1.store;
    // dgrid1.hide();
    var dgrid = Ext.getCmp('p_form0000000052_d');
    var dstore = dgrid.store;
    var Toolbar = Ext.getCmp('toolbar');
    mstform.getItem('u_sfycylyxsybdw').hide();
    //项目起底
    //mstform.getItem('u_sfwxmqdxm').setVisible(false);
    //mstform.getItem('u_xmqdxm').setVisible(false);
    //



    mstform.getItem('u_jgmc').userSetReadOnly(true)
    mstform.getItem('u_jglx').userSetReadOnly(true)
    mstform.getItem('xmhy').userSetReadOnly(true)
    mstform.getItem('gj').userSetReadOnly(true)
    mstform.getItem('sheng').userSetReadOnly(true)
    mstform.getItem('shi').userSetReadOnly(true)
    //mstform.getItem('xian').userSetReadOnly(true)
    mstform.getItem('empid').userSetReadOnly(true)
    mstform.getItem('tzze').userSetReadOnly(true)
    mstform.getItem('yjhte').userSetReadOnly(true);
    mstform.getItem('xmgk').userSetReadOnly(true);
    mstform.getItem('u_cyl').userSetReadOnly(true);
    mstform.getItem('yjzbrq').userSetReadOnly(true);
    mstform.getItem('yjtbrq').userSetReadOnly(true);
    mstform.getItem('u_hyxhmc').setVisible(false);
    mstform.getItem('u_hyxhmc').userSetMustInput(false);
    mstform.getItem('bill_dt').userSetMustInput(false);
    //260302添加开始


    mstform.getItem('u_sjly').addListener('change', function () {
        if (mstform.getItem('u_sjly').getValue() == 5690000000003379) {
            mstform.getItem('u_hyxhmc').setValue(null);
            mstform.getItem('u_hyxhmc').setVisible(true);
            mstform.getItem('u_hyxhmc').userSetMustInput(true);
        } else {
            mstform.getItem('u_hyxhmc').setValue(null);
            mstform.getItem('u_hyxhmc').setVisible(false);
            mstform.getItem('u_hyxhmc').userSetMustInput(false);
        }
    })
    //根据重要程度分类设置必填项非必填项
    mstform.getItem('ddlbcol_1').addListener('change', function () {
        let zycdfl = mstform.getItem('ddlbcol_1').getValue();
        if (zycdfl == '1' || zycdfl == '2') {
            mstform.getItem('u_xmlxzt').userSetMustInput(true);
            mstform.getItem('u_xmlxbh_bah').userSetMustInput(true);
            mstform.getItem('u_xmlxqk').userSetMustInput(true);
            mstform.getItem('u_tzzt').userSetMustInput(true);
            mstform.getItem('u_zjlsqk').userSetMustInput(true);
            mstform.getItem('u_user_czb').userSetMustInput(true);
            mstform.getItem('u_qt1').userSetMustInput(true);
            mstform.getItem('u_jzys').userSetMustInput(true);
            mstform.getItem('u_scjy').userSetMustInput(true);
            mstform.getItem('u_jzwx').userSetMustInput(true);
            dgrid1.setMustInputCol('u_xm', true);
            dgrid1.setMustInputCol('u_zw', true);
            dgrid1.setMustInputCol('u_dh', true);
        } else {
            mstform.getItem('u_xmlxzt').userSetMustInput(false);
            mstform.getItem('u_xmlxbh_bah').userSetMustInput(false);
            mstform.getItem('u_xmlxqk').userSetMustInput(false);
            mstform.getItem('u_tzzt').userSetMustInput(false);
            mstform.getItem('u_zjlsqk').userSetMustInput(false);
            mstform.getItem('u_user_czb').userSetMustInput(false);
            mstform.getItem('u_qt1').userSetMustInput(false);
            mstform.getItem('u_jzys').userSetMustInput(false);
            mstform.getItem('u_scjy').userSetMustInput(false);
            mstform.getItem('u_jzwx').userSetMustInput(false);
            dgrid1.setMustInputCol('u_xm', false);
            dgrid1.setMustInputCol('u_zw', false);
            dgrid1.setMustInputCol('u_dh', false);
        }
    })
    /*
    if(otype == $Otype.Edit){
        if (mstform.getItem('u_sfwxmqdxm').getValue() == 1) {
                mstform.getItem('xmmc').setValue(null);
                //260302添加开始
                mstform.getItem('u_xmqdxm').setValue(null);
                //260302添加结束
                mstform.getItem('u_xmqdxm').setVisible(true);
                mstform.getItem('u_xmqdxm').userSetMustInput(true);
                //mstform.getItem('xmmc').setValue('');
                mstform.getItem('xmmc').userSetMustInput(true);
                mstform.getItem('xmmc').setVisible(false);
                mstform.getItem('u_jgmc').userSetReadOnly(true)
                mstform.getItem('u_jglx').userSetReadOnly(true)
                mstform.getItem('xmhy').userSetReadOnly(true)
                mstform.getItem('gj').userSetReadOnly(true)
                mstform.getItem('sheng').userSetReadOnly(true)
                mstform.getItem('shi').userSetReadOnly(true)
                //mstform.getItem('xian').userSetReadOnly(true)
                mstform.getItem('empid').userSetReadOnly(true)
                mstform.getItem('tzze').userSetReadOnly(true)
                mstform.getItem('yjhte').userSetReadOnly(true);
                mstform.getItem('xmgk').userSetReadOnly(true);
                mstform.getItem('u_cyl').userSetReadOnly(true);
                mstform.getItem('yjzbrq').userSetReadOnly(true);
                mstform.getItem('yjtbrq').userSetReadOnly(true);
            } else {
                mstform.getItem('xmmc').setVisible(true);
                mstform.getItem('xmmc').userSetMustInput(true);
                mstform.getItem('u_xmqdxm').setValue('');
                mstform.getItem('u_xmqdxm').userSetMustInput(false);
                mstform.getItem('u_xmqdxm').setVisible(false);
                mstform.getItem('u_jgmc').userSetReadOnly(false)
                mstform.getItem('u_jglx').userSetReadOnly(false)
                mstform.getItem('xmhy').userSetReadOnly(false)
                mstform.getItem('gj').userSetReadOnly(false)
                mstform.getItem('sheng').userSetReadOnly(false)
                mstform.getItem('shi').userSetReadOnly(false)
                mstform.getItem('xian').userSetReadOnly(false)
                mstform.getItem('empid').userSetReadOnly(false)
                mstform.getItem('tzze').userSetReadOnly(false)
                mstform.getItem('yjhte').userSetReadOnly(false);
                mstform.getItem('xmgk').userSetReadOnly(false);
                mstform.getItem('u_cyl').userSetReadOnly(false);
                mstform.getItem('yjzbrq').userSetReadOnly(false);
                mstform.getItem('yjtbrq').userSetReadOnly(false);
            }
    }
    */
    if (mstform.getItem('u_sfwxmqdxm').getValue() == 1) {
        mstform.getItem('xmmc').setValue(null);
        //260302添加开始
        mstform.getItem('u_xmqdxm').setValue(null);
        //260302添加结束
        mstform.getItem('u_xmqdxm').setVisible(true);
        mstform.getItem('u_xmqdxm').userSetMustInput(true);
        //mstform.getItem('xmmc').setValue('');
        mstform.getItem('xmmc').userSetMustInput(true);
        mstform.getItem('xmmc').setVisible(false);
        mstform.getItem('u_jgmc').userSetReadOnly(true)
        mstform.getItem('u_jglx').userSetReadOnly(true)
        mstform.getItem('xmhy').userSetReadOnly(true)
        mstform.getItem('gj').userSetReadOnly(true)
        mstform.getItem('sheng').userSetReadOnly(true)
        mstform.getItem('shi').userSetReadOnly(true)
        //mstform.getItem('xian').userSetReadOnly(true)
        mstform.getItem('empid').userSetReadOnly(true)
        mstform.getItem('tzze').userSetReadOnly(true)
        mstform.getItem('yjhte').userSetReadOnly(true);
        mstform.getItem('xmgk').userSetReadOnly(true);
        mstform.getItem('u_cyl').userSetReadOnly(true);
        mstform.getItem('yjzbrq').userSetReadOnly(true);
        mstform.getItem('yjtbrq').userSetReadOnly(true);
    } else {
        mstform.getItem('xmmc').setVisible(true);
        mstform.getItem('xmmc').userSetMustInput(true);
        mstform.getItem('u_xmqdxm').setValue('');
        mstform.getItem('u_xmqdxm').userSetMustInput(false);
        mstform.getItem('u_xmqdxm').setVisible(false);
        mstform.getItem('u_jgmc').userSetReadOnly(false)
        mstform.getItem('u_jglx').userSetReadOnly(false)
        mstform.getItem('xmhy').userSetReadOnly(false)
        mstform.getItem('gj').userSetReadOnly(false)
        mstform.getItem('sheng').userSetReadOnly(false)
        mstform.getItem('shi').userSetReadOnly(false)
        mstform.getItem('xian').userSetReadOnly(false)
        mstform.getItem('empid').userSetReadOnly(false)
        mstform.getItem('tzze').userSetReadOnly(false)
        mstform.getItem('yjhte').userSetReadOnly(false);
        mstform.getItem('xmgk').userSetReadOnly(false);
        mstform.getItem('u_cyl').userSetReadOnly(false);
        mstform.getItem('yjzbrq').userSetReadOnly(false);
        mstform.getItem('yjtbrq').userSetReadOnly(false);
    }
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        //260302添加结束
        mstform.getItem('u_sfwxmqdxm').addListener('itemchanged', function () {
            if (mstform.getItem('u_sfwxmqdxm').getValue() == 1) {
                mstform.getItem('xmmc').setValue(null);
                //260302添加开始
                mstform.getItem('u_xmqdxm').setValue(null);
                //260302添加结束
                mstform.getItem('u_xmqdxm').setVisible(true);
                mstform.getItem('u_xmqdxm').userSetMustInput(true);
                //mstform.getItem('xmmc').setValue('');
                mstform.getItem('xmmc').userSetMustInput(true);
                mstform.getItem('xmmc').setVisible(false);
                mstform.getItem('u_jgmc').userSetReadOnly(true)
                mstform.getItem('u_jglx').userSetReadOnly(true)
                mstform.getItem('xmhy').userSetReadOnly(true)
                mstform.getItem('gj').userSetReadOnly(true)
                mstform.getItem('sheng').userSetReadOnly(true)
                mstform.getItem('shi').userSetReadOnly(true)
                //mstform.getItem('xian').userSetReadOnly(true)
                mstform.getItem('empid').userSetReadOnly(true)
                mstform.getItem('tzze').userSetReadOnly(true)
                mstform.getItem('yjhte').userSetReadOnly(true);
                mstform.getItem('xmgk').userSetReadOnly(true);
                mstform.getItem('u_cyl').userSetReadOnly(true);
                mstform.getItem('yjzbrq').userSetReadOnly(true);
                mstform.getItem('yjtbrq').userSetReadOnly(true);
            } else {
                mstform.getItem('xmmc').setVisible(true);
                mstform.getItem('xmmc').userSetMustInput(true);
                mstform.getItem('u_xmqdxm').setValue('');
                mstform.getItem('u_xmqdxm').userSetMustInput(false);
                mstform.getItem('u_xmqdxm').setVisible(false);
                mstform.getItem('u_jgmc').userSetReadOnly(false)
                mstform.getItem('u_jglx').userSetReadOnly(false)
                mstform.getItem('xmhy').userSetReadOnly(false)
                mstform.getItem('gj').userSetReadOnly(false)
                mstform.getItem('sheng').userSetReadOnly(false)
                mstform.getItem('shi').userSetReadOnly(false)
                mstform.getItem('xian').userSetReadOnly(false)
                mstform.getItem('empid').userSetReadOnly(false)
                mstform.getItem('tzze').userSetReadOnly(false)
                mstform.getItem('yjhte').userSetReadOnly(false);
                mstform.getItem('xmgk').userSetReadOnly(false);
                mstform.getItem('u_cyl').userSetReadOnly(false);
                mstform.getItem('yjzbrq').userSetReadOnly(false);
                mstform.getItem('yjtbrq').userSetReadOnly(false);
            }
        })
        mstform.getItem('u_xmqdxm').on('beforetriggerclick', function () { //帮助窗口打开前事件
            mstform.getItem('u_xmqdxm').setClientSqlFilter
                ("p_form0000700716_d.phid not in (select u_xmqdxm from p_form0000000052_m where u_xmqdxm is not null)");
        });
        mstform.getItem('u_xmqdxm').addListener('helpselected', function () {
            var phid = mstform.getItem('u_xmqdxm').getValue();
            console.log(phid)
            execServer('p_form0000000052_xmqd', {
                'phid': phid
            }, function (res) {
                console.log(res);
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log("data:", data);
                    mstform.getItem('u_jgmc').setValue(data[0].extendObjects.u_hqxxjg);
                    BatchBindCombox([mstform.getItem('u_jgmc')]);
                    mstform.getItem('u_jglx').setValue(data[0].extendObjects.jglx);
                    mstform.getItem('xmhy').setValue(data[0].extendObjects.xmlx);
                    BatchBindCombox([mstform.getItem('xmhy')]);
                    mstform.getItem('gj').setValue(data[0].extendObjects.u_gj);
                    BatchBindCombox([mstform.getItem('gj')]);
                    mstform.getItem('sheng').setValue(data[0].extendObjects.u_sf);
                    BatchBindCombox([mstform.getItem('sheng')]);
                    mstform.getItem('shi').setValue(data[0].extendObjects.u_shi);
                    BatchBindCombox([mstform.getItem('shi')]);
                    mstform.getItem('xian').setValue(data[0].extendObjects.u_qx);
                    BatchBindCombox([mstform.getItem('xian')]);
                    mstform.getItem('empid').setValue(data[0].extendObjects.empid);
                    BatchBindCombox([mstform.getItem('empid')]);
                    mstform.getItem('tzze').setValue(data[0].extendObjects.tze);
                    mstform.getItem('yjhte').setValue(data[0].extendObjects.hte);
                    mstform.getItem('xmgk').setValue(data[0].extendObjects.u_jsgmjnr);
                    mstform.getItem('u_cyl').setValue(data[0].extendObjects.xmyxlx);
                    mstform.getItem('yjzbrq').setValue(data[0].extendObjects.zbrq);
                    mstform.getItem('yjtbrq').setValue(data[0].extendObjects.tbrq);
                    mstform.getItem('xmmc').setValue(data[0].extendObjects.u_xmmc);
                }
            })
            execServer('sfbgz', {
                'phid': phid
            }, function (res) {
                console.log(res);
                if (res.count > 0) {
                    Ext.Msg.alert('提示', '此项目已被其他公司跟踪，如有问题请联系市场部!');
                }
            })
            var bt = mstform.getItem('bt');
            var xmmc_val = "'" + mstform.getItem("xmmc").getValue() + "'";
            console.log("xmmc_val:", xmmc_val);
            execServer('p_form0000000052_select_XMBM_list', {
                'xmmc': xmmc_val
            }, function (res) {
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log("data:", data);
                    mstform.getItem('bt').setValue(data[0].extendObjects.bt);
                    console.log("mstform.getItem('bt'):", mstform.getItem('bt').getValue());
                }

            });
            if (mstform.getItem("bt").getValue() > 0) {
                Ext.Msg.alert('提示', '此项目已被其他公司跟踪，如有问题请联系市场部!');
                mstform.getItem('xmmc').focus();
                mstform.getItem('xmmc').setValue(null);
            }

        })
    }

    if (otype == $Otype.EDIT) {
        mstform.getItem('u_xmqdxm').addListener('helpselected', function () {
            var phid = mstform.getItem('u_xmqdxm').getValue();
            console.log(phid)
            execServer('p_form0000000052_xmqd', {
                'phid': phid
            }, function (res) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (data.length != 0) {
                    mstform.getItem('gj').setValue(data[0].extendObjects.u_gj);
                    BatchBindCombox([mstform.getItem('gj')]);
                    mstform.getItem('sheng').setValue(data[0].extendObjects.u_sf);
                    BatchBindCombox([mstform.getItem('sheng')]);
                    mstform.getItem('shi').setValue(data[0].extendObjects.u_shi);
                    BatchBindCombox([mstform.getItem('shi')]);
                    mstform.getItem('xian').setValue(data[0].extendObjects.u_qx);
                    BatchBindCombox([mstform.getItem('xian')]);
                }
            })

        })
    }


    //当是否投融资项目为是时为可见及必填
    mstform.getItem('sftrjxm').addListener('change', function () {
        let sftrzxm = mstform.getItem('sftrjxm').getValue();
        if (sftrzxm == '1') {
            mstform.getItem('u_xmztzgc').userSetMustInput(true);
            mstform.getItem('u_xmztzgc').setVisible(true);
            mstform.getItem('u_jazb').userSetMustInput(true);
            mstform.getItem('u_jazb').setVisible(true);
            mstform.getItem('u_zbjbl').userSetMustInput(true);
            mstform.getItem('u_zbjbl').setVisible(true);
            mstform.getItem('u_zmgsgqjg').userSetMustInput(true);
            mstform.getItem('u_zmgsgqjg').setVisible(true);
            mstform.getItem('u_hzqqx').userSetMustInput(true);
            mstform.getItem('u_hzqqx').setVisible(true);
            mstform.getItem('u_ktqtcnx').userSetMustInput(true);
            mstform.getItem('u_ktqtcnx').setVisible(true);
            mstform.getItem('u_hkly').userSetMustInput(true);
            mstform.getItem('u_hkly').setVisible(true);
            mstform.getItem('u_ztxypj').userSetMustInput(true);
            mstform.getItem('u_ztxypj').setVisible(true);
            mstform.getItem('u_qttsyq').userSetMustInput(true);
            mstform.getItem('u_qttsyq').setVisible(true);
        } else {
            mstform.getItem('u_xmztzgc').userSetMustInput(false);
            mstform.getItem('u_xmztzgc').setVisible(false);
            mstform.getItem('u_jazb').userSetMustInput(false);
            mstform.getItem('u_jazb').setVisible(false);
            mstform.getItem('u_zbjbl').userSetMustInput(false);
            mstform.getItem('u_zbjbl').setVisible(false);
            mstform.getItem('u_zmgsgqjg').userSetMustInput(false);
            mstform.getItem('u_zmgsgqjg').setVisible(false);
            mstform.getItem('u_hzqqx').userSetMustInput(false);
            mstform.getItem('u_hzqqx').setVisible(false);
            mstform.getItem('u_ktqtcnx').userSetMustInput(false);
            mstform.getItem('u_ktqtcnx').setVisible(false);
            mstform.getItem('u_hkly').userSetMustInput(false);
            mstform.getItem('u_hkly').setVisible(false);
            mstform.getItem('u_ztxypj').userSetMustInput(false);
            mstform.getItem('u_ztxypj').setVisible(false);
            mstform.getItem('u_qttsyq').userSetMustInput(false);
            mstform.getItem('u_qttsyq').setVisible(false);
        }
    })
    //项目起底

    mstform.getItem('u_cyl').addListener('itemchanged', function () {
        if (mstform.getItem('u_cyl').getValue() == 1) {
            mstform.getItem('u_sfycylyxsybdw').show();
            mstform.getItem('u_sfycylyxsybdw').userSetMustInput(true);

        } else {
            mstform.getItem('u_sfycylyxsybdw').hide();
            mstform.getItem('u_sfycylyxsybdw').userSetMustInput(false);
        }

    })
    //mstform.getItem('u_sfycylyxsybdw').userSetMustInput(false);
    mstform.getItem('u_tsnr').userSetReadOnly(true);
    mstform.getItem('bzf').setVisible(false); //字段隐藏
    //mstform.getItem('sspq').setVisible(false);//废
    mstform.getItem('app_status').setVisible(false);
    mstform.getItem('phid_fill_psn').setVisible(false);
    mstform.getItem('u_cylyxjg').setVisible(false);
    mstform.getItem('u_cyl').setFieldLabel('项目营销类型');

    var xmgk = document.getElementsByName("xmgk")[0];
    xmgk.style.height = "48px";
    mstform.getItem('remarks').setValue('中标概率：枚举，“A”:90%及以上；“B”:80%-90%；“C”:50%-80%；“D”:50%以下。');

    mstform.getItem('xmhy').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
        mstform.getItem('xmhy').setClientSqlFilter('grade = 1 and enable_status=1 ');
    });




    mstform.getItem('u_jgmc').addListener('helpselected', function () {
        var u_jgmc = mstform.getItem('u_jgmc').getValue();
        console.log("u_jgmc:", u_jgmc);
        execServer('p_form0000000052_u_jgmc', {
            'u_jgmc': u_jgmc
        }, (res) => {
            // 解析返回数据，处理字符串或对象格式
            if (res.count > 0) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log('data===============>', data)
                // 设置u_jglx字段值
                mstform.getItem('u_jglx').setValue(data[0].extendObjects.textcol_4);
            } else {
                console.log("未获取到机构类型数据");
                Ext.Msg.alert('提示', '未获取到机构类型数据');
            }
        });
    });




    if (otype == $Otype.VIEW) {
        setTimeout(function () {
            execServer('p_form0000000052_xx', {
                phid: busid
            }, (res) => {
                // 解析返回数据，处理字符串或对象格式
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log('data===============>', data)
                    // 提取extendObjects数据并插入到明细表
                    const targetData = data.map(item => item.extendObjects);
                    dstore.insert(dstore.getCount(), targetData);
                    console.log("插入数据:", targetData);
                } else {
                    console.log("未获取到p_form0000000052_xx数据");
                }
            });
        }, 1000)

        setTimeout(function () {
            execServer('khhfqk', {
                phid: busid
            }, (res) => {
                // 解析返回数据，处理字符串或对象格式
                if (res.count > 0) {
                    /*
                    let data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log('data===============>', data)
                    // 提取extendObjects数据并插入到明细表
                    const targetData1 = data.map(item => item.extendObjects);
                    d1store.removeAll();
                    d1store.insert(d1store.getCount(), targetData1);
                    console.log("插入数据:", targetData1);
                    */
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    const datas = new Array();

                    console.log(data.length);
                    for (i = 0; i < data.length; i++) {
                        datas.push(data[i].extendObjects);
                    }
                    if (data.length != 0) {
                        d1store.removeAll(); //清除单据体内所有数据
                        console.log(datas)
                        d1store.insert(datas.length, datas); //将服务端获取的数组内容插入到单据体
                    }
                } else {
                    console.log("未获取到khhfqk数据");
                }
            });
        }, 1000)
    }

    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        d1store.insert(d1store.getCount(),
            [{
                u_jcl: '决策者',
            }, {
                u_jcl: '把关者'
            }, {
                u_jcl: '影响者'
            }]);
        mstform.getItem('xmmc').addListener('itemchanged', function () {
            var bt = mstform.getItem('bt');
            var xmmc_val = "'" + mstform.getItem("xmmc").getValue() + "'";
            console.log("xmmc_val:", xmmc_val);
            execServer('p_form0000000052_select_XMBM_list', {
                'xmmc': xmmc_val
            }, function (res) {
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log("data:", data);
                    mstform.getItem('bt').setValue(data[0].extendObjects.bt);
                    console.log("mstform.getItem('bt'):", mstform.getItem('bt').getValue());
                }

            });
            if (mstform.getItem("bt").getValue() > 0) {
                Ext.Msg.alert('提示', '此项目已被其他公司跟踪，如有问题请联系市场部!');
                mstform.getItem('xmmc').focus();
                mstform.getItem('xmmc').setValue(null);
            }
        });
        /*
        mstform.getItem('u_mcjc_name').addListener('change', function () {
            console.log("u_mcjc_name:", mstform.getItem('u_mcjc_name'))
            let mcjc = mstform.getItem('u_mcjc_name');
            mstform.getItem('xmmc').setValue(mcjc);
        });
        */

        mstform.getItem('tzze').addListener('change', function () {
            var tzze = mstform.getItem('tzze').getValue();
            if (tzze > 10000000) {
                mstform.getItem('tzze').setValue(0);
                Ext.Msg.alert('提示', '投资总额不能超过10000000万元');
            }
        });

        mstform.getItem('yjhte').addListener('change', function () {
            var yjhte = mstform.getItem('yjhte').getValue();
            if (yjhte > 1000000) {
                mstform.getItem('yjhte').setValue(0);
                Ext.Msg.alert('提示', '预计工程合同额不能超过10000000万元');
            }
        });

    }

    mstform.getItem('zbgl').addListener('itemchanged', function () {
        var aa = mstform.getItem('zbgl').getValue();
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

    mstform.getItem('u_cyl').addListener('itemchanged', function () {
        var u_cyl = mstform.getItem('u_cyl').getValue();
        if (u_cyl == '1') {
            mstform.getItem('u_cylyxjg').setVisible(true);
        } else {
            mstform.getItem('u_cylyxjg').setVisible(false);
        }

    })
    //获取客户信息
    mstform.getItem('org_id').addListener('itemchanged', function () {
        var zz = mstform.getItem('org_id').getValue();
        if (zz) {
            execServer('p_form0000000052_khxx', {
                'zz': zz
            }, (res) => {
                // 解析返回数据，处理字符串或对象格式
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (data && data.length != 0) {
                    if ((data[0].extendObjects.user_khssfw) == null || (data[0].extendObjects.custclass_id) == null) {
                        Ext.Msg.alert('提示', '请先维护客户性质和所属范围');
                        return false;
                    } else {
                        mstform.getItem('yzssfw').setValue(data[0].extendObjects.user_khssfw);
                        mstform.getItem('yzxz').setValue(data[0].extendObjects.cname);
                    }
                } else {
                    console.log("未获取到客户信息");
                    Ext.Msg.alert('提示', '未获取到客户信息');
                    return false;
                }
            });
        }
    })
    //mstform.getItem('gj').setValue(1);
    mstform.getItem('bzf').setValue(0);
    //BatchBindCombox([mstform.getItem('gj')]);
    mstform.getItem('sheng').on('beforetriggerclick', function () {
        mstform.getItem('shi').setValue();
        mstform.getItem('xian').setValue();
        if (mstform.getItem('gj').getValue() == '') {
            Ext.Msg.alert('提示', '请先选择国家');
            return false;
        }
    });
    mstform.getItem('shi').on('beforetriggerclick', function () {
        mstform.getItem('xian').setValue();
        if (mstform.getItem('sheng').getValue() == '') {
            Ext.Msg.alert('提示', '请先选择省份');
            return false;
        }
        mstform.getItem('shi').setOutFilter({
            pid: mstform.getItem('sheng').getValue()
        })
    });
    mstform.getItem('xian').on('beforetriggerclick', function () {
        if (mstform.getItem('shi').getValue() == '') {
            Ext.Msg.alert('提示', '请先选择城市');
            return false;
        }
        mstform.getItem('xian').setOutFilter({
            pid: mstform.getItem('shi').getValue()
        })
    });
    //----------省市区判断开始

    //中标概率小于1
    mstform.getItem('zbgl').on('change', function () {
        if (mstform.getItem('zbgl').getValue() >= 1) {
            mstform.getItem('zbgl').setValue(0);
            Ext.Msg.alert('提示', '中标概率必须小于1');
            return false;
        }
    })

    /*mstform.getItem('u_jgmc').on('beforetriggerclick', function() {
        if(mstform.getItem('u_jglx').getValue() == '') {
            Ext.Msg.alert('提示', '请先选择机构类型');
            return false;
        }

        mstform.getItem('u_jgmc').setOutFilter({
            u_yxjglx: mstform.getItem('u_jglx').getValue()
        })
    });*/
    //姓名
    dgrid1.getColumn('u_xm').getEditor().addListener('helpselected', function (obj) {
        var data = dgrid1.getSelectionModel().getSelection();
        console.log("data:", data);
        var ygphid = data[0].get('u_xm');
        execServer('getryxx', {
            'phid': ygphid
        }, function (res) {
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log('data1===============>', data1)
                data[0].set('u_zw', data1[0].extendObjects.user_xrzw);//职务
                data[0].set('u_dh', data1[0].extendObjects.phone); //手机号

            }
        });
    });
    console.log("d1store:", d1store);


    mstform.getItem('yjhte').addListener('blur', function () {
        var yjhte = mstform.getItem('yjhte').getValue();
        Ext.Msg.alert('提示', '预计工程合同额' + yjhte + '万元');
    })


    /* if (otype == $Otype.ADD) 
     {
         var jbr=mstform.getItem('ocode').getValue();    
         callServer('Getzzxx',
          [{phid:jbr}], function (res) 
         {  
             if(res.record[0])
             {  
                 mstform.getItem('textcol_3').setValue(res.record[0]['oname']); 
             } 
         })
         
     }*/


    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        /*
        mstform.getItem('xmmc').on('blur', function () {
            var xmmc = "'" + mstform.getItem('xmmc').getValue() + "'";
            execServer('xmmcxsd', {
                'name': xmmc, 'phid': busid
            }, function (res) {
                if (res.count > 0) {
                    const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    if (data1[0].extendObjects.xsd == '1') {
                        Ext.Msg.alert('提示', '项目名称相似度超过70%，请确认是否重复跟踪');
                        mstform.getItem('xmmc').setValue();
                    }

                }
            });
        })
        */
        mstform.getItem('phid_org').on('change', function () {
            var ocode = mstform.getItem('phid_org').getValue();
            console.log(ocode);
            if (ocode == '324191209000001') {
                mstform.getItem('ddlbcol_2').setVisible(true);
                mstform.getItem('ddlbcol_2').userSetMustInput(true);
                mstform.getItem('u_jgmc').userSetMustInput(false);
                mstform.getItem('u_jgmc').userSetReadOnly(true);

            } else {
                mstform.getItem('ddlbcol_2').setVisible(false);
                mstform.getItem('ddlbcol_2').userSetMustInput(false);
                mstform.getItem('u_jgmc').userSetMustInput(true);
                mstform.getItem('u_jgmc').userSetReadOnly(false);
            }
        })

    }


    mstform.getItem('u_jgmc').on('beforetriggerclick', function () { //帮助窗口打开前事件
        mstform.getItem('u_jgmc').setClientSqlFilter
            ("zt not in ('变更前','删除项','合并前')");
    });





}

function beforeUnVerifyEdit() {
    var mstform = Ext.getCmp('p_form0000000052_m');
    var bzf_val = mstform.getItem('bzf').getValue(); //标识符
    if (bzf_val == '1') {
        Ext.Msg.alert('提示', '该单据已被标前立项引用!');
        return false;
    }
    return true;
}

// function beforeUnVerifyList() {
//     var mgrid = Ext.getCmp('p_form0000000052_mgrid');
//     console.log("mgrid:",mgrid);
//     var data = mgrid.getSelectionModel().getSelection();
//     var bzf_val = data[0].get('bzf');
//     if (bzf_val == '1') {
//         Ext.Msg.alert('提示', '该单据已被标前立项引用！');
//         return false;
//     }
//     return true;
// }
/*
function allReadyList() {

    var Toolbar = Ext.getCmp('toolbar');
    Toolbar.get('copy').hide();
}
*/

