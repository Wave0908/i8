$NG.AllReady(function (page,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRow, useUpdateRows, useClick, useBeforeClick, useBeforeOpen }
) {
    var mstform = $NG.getCmpApi('PcmM1');
    var dgrid = $NG.getCmpApi('PcmD1');
    var Toolbar = $NG.getCmpApi('CntMDetailToolBar');
    //浪潮甲方设置为只读
    //mstform.getItem('user_lcjf').userSetReadOnly(true);
    // mstform.getItem('BillNo').addListener('change', function () {
    // 	mstform.getItem('BillNo').userSetReadOnly(true);
    // });

    /**页面是变更状态时，浪潮字段只读 */
    const { isChgCnt } = $NG.getQueryValue();
    if ($NG.getQueryValue('oType') == 'view') {
        console.log("dataready");
        var user_istbinspur = mstform.getItem('user_istbinspur').getValue();
        console.log('user_istbinspur:', user_istbinspur);
        console.log("Toolbar.getButtons():", Toolbar.getButtons());
        if (user_istbinspur != '4' && user_istbinspur != null && user_istbinspur != '') { // 现在啥问题？？   现在user_istbinspur  =4   应该是不只读  但现在前端是只读的  
            Toolbar.getItem('applyForReview').setReadOnly(true);
            setTimeout(() => { Toolbar.getItem('applyForReview').setProps({ disabled: true }) }, 100);
        } else {
            Toolbar.getItem('IMPPushTask').setReadOnly(true);
            Toolbar.getItem('applyForReview').setReadOnly(false);
            setTimeout(() => { Toolbar.getItem('applyForReview').setProps({ disabled: false }) }, 100);//以后只用这个么  还是setonly  ye 等会  这个问题我还在想哪里又设置了这个disabled，我在问别人，你等一下
        }

    } else {
        if (!isChgCnt == '1') {
            Toolbar.getItem('applyForReview').setReadOnly(true);
            setTimeout(() => { Toolbar.getItem('applyForReview').setProps({ disabled: true }) }, 100);
        }
    }
    if (isChgCnt == '1') {
        mstform.getItem('user_lcssxmb').setReadOnly(true);
        mstform.getItem('user_lcssxmb').setProps({ disabled: true });
        mstform.getItem('user_lcglzz').setReadOnly(true);
        mstform.getItem('user_lcglzz').setProps({ disabled: true });
        mstform.getItem('user_lcywdy').setReadOnly(true);
        mstform.getItem('user_lcywdy').setProps({ disabled: true });
        mstform.getItem('user_lchsbmzjm').setReadOnly(true);
        mstform.getItem('user_lchsbmzjm').setProps({ disabled: true });

        mstform.getItem('user_cwxtsfcz').setReadOnly(true);
        mstform.getItem('user_cwxtsfcz').setProps({ disabled: true });
        mstform.getItem('user_insconcode').setReadOnly(true);
        mstform.getItem('user_insconcode').setProps({ disabled: true });
        mstform.getItem('user_insconid').setReadOnly(true);
        mstform.getItem('user_insconid').setProps({ disabled: true });
        mstform.getItem('user_insconname').setReadOnly(true);
        mstform.getItem('user_insconname').setProps({ disabled: true });

        mstform.getItem('BillNo').setReadOnly(true);
        mstform.getItem('BillNo').setProps({ disabled: true });
        mstform.getItem('BillName').setReadOnly(true);
        mstform.getItem('BillName').setProps({ disabled: true });
        mstform.getItem('PhidOrg_EXName').setReadOnly(true);
        mstform.getItem('PhidOrg_EXName').setProps({ disabled: true });
        mstform.getItem('CntType').setReadOnly(true);
        mstform.getItem('CntType').setProps({ disabled: true });
        mstform.getItem('SignDt').setReadOnly(true);
        mstform.getItem('SignDt').setProps({
            required: false,
        });
        mstform.getItem('BillDt').setReadOnly(true);
        mstform.getItem('BillDt').setProps({ disabled: true });
        mstform.getItem('PhidPc').setReadOnly(true);
        mstform.getItem('PhidPc').setProps({ disabled: true });
        mstform.getItem('PhidDept').setReadOnly(true);
        mstform.getItem('PhidDept').setProps({ disabled: true });
        mstform.getItem('PhidCustomerEnt').setReadOnly(true);
        mstform.getItem('PhidCustomerEnt').setProps({ disabled: true });
        mstform.getItem('SenEmp').setReadOnly(true);
        mstform.getItem('SenEmp').setProps({ disabled: true });
        mstform.getItem('PhidSupplyEnt').setReadOnly(true);
        mstform.getItem('PhidSupplyEnt').setProps({ disabled: true });
        mstform.getItem('user_zbjqx').setReadOnly(true);
        mstform.getItem('user_zbjqx').setProps({ disabled: true });
        mstform.getItem('PhidSenEmp').setReadOnly(true);
        mstform.getItem('PhidSenEmp').setProps({ disabled: true });
        mstform.getItem('Stat').setReadOnly(true);
        mstform.getItem('Stat').setProps({ disabled: true });
        mstform.getItem('StartDt').setReadOnly(true);
        mstform.getItem('StartDt').setProps({ disabled: true });
        mstform.getItem('EndDt').setReadOnly(true);
        mstform.getItem('EndDt').setProps({ disabled: true });
        mstform.getItem('Zfbl').setReadOnly(true);
        mstform.getItem('Zfbl').setProps({ disabled: true });
        mstform.getItem('CntSumVatFc').setReadOnly(true);
        mstform.getItem('CntSumVatFc').setProps({ disabled: true });
        mstform.getItem('ChineseAmtVatFc').setReadOnly(true);
        mstform.getItem('ChineseAmtVatFc').setProps({ disabled: true });
        mstform.getItem('user_bhsje').setReadOnly(true);
        mstform.getItem('user_bhsje').setProps({ disabled: true });
        //mstform.getItem('user_rate').setReadOnly(true);
        mstform.getItem('user_se').setReadOnly(true);
        mstform.getItem('user_se').setProps({ disabled: true });
        mstform.getItem('PayName').setReadOnly(true);
        mstform.getItem('PayName').setProps({ disabled: true });
        mstform.getItem('PayName').setProps({
            required: false, //支付条款
        });
        mstform.getItem('user_yfkje').setReadOnly(true); //预算款金额
        mstform.getItem('user_yfkje').setProps({ disabled: true });
        mstform.getItem('user_yfkje').setProps({
            required: false, //预算款金额
        });
        mstform.getItem('user_yfkbl').setReadOnly(true); //预算款比例
        mstform.getItem('user_yfkbl').setProps({ disabled: true });
        mstform.getItem('user_yfkbl').setProps({
            required: false, //预算款比例
        });
        mstform.getItem('user_jgzfbl').setReadOnly(true); //竣工支付比例
        mstform.getItem('user_jgzfbl').setProps({ disabled: true });
        mstform.getItem('user_jgzfbl').setProps({
            required: false, //竣工支付比例
        });
        mstform.getItem('user_lybzje').setReadOnly(true);//履约保证金额
        mstform.getItem('user_lybzje').setProps({ disabled: true });
        mstform.getItem('user_lybzje').setProps({
            required: false, //履约保证金额
        });
        mstform.getItem('CntOrgSumVatFc').setReadOnly(true);
        mstform.getItem('CntOrgSumVatFc').setProps({ disabled: true });
        mstform.getItem('ChSumAmtVatFc').setReadOnly(true);
        mstform.getItem('ChSumAmtVatFc').setProps({ disabled: true });
        mstform.getItem('user_kpdw').setReadOnly(true);
        mstform.getItem('user_kpdw').setProps({ disabled: true });
        mstform.getItem('user_spdw').setReadOnly(true);
        mstform.getItem('user_spdw').setProps({ disabled: true });
    }

    /*输入浪潮合同编码带出浪潮合同ID*/
    useValuesChange(({
        args
    }) => {
        var user_insconcode = mstform.getItem('user_insconcode').getValue();
        if(user_insconcode){
            $NG.execServer('user_insconcode', {
            'user_insconcode': user_insconcode
        }, function (res) {
            if (res.count == 0) {
                mstform.getItem('user_insconid').setValue('');
                mstform.getItem('user_insconname').setValue('');
            } else {
                var data = JSON.parse(res.data);
                mstform.getItem('user_insconid').setValue(data[0].extendObjects.htnm);
                mstform.getItem('user_insconname').setValue(data[0].extendObjects.htmc);
            }
        });
        }
    }, 'PcmM1.user_insconcode');



    /*管理组织选择后清空所属项目部start*/
    useValuesChange(({
        args
    }) => {
        var PhidPc = mstform.getItem('PhidPc').getValue()
        if (!PhidPc) {
            return false;
        }
        $NG.execServer('xmxxdcglzssmb', {
            'phid': PhidPc
        }, function (res) {
            var data = JSON.parse(res.data);
            if (res.count > 0) {
                var data = JSON.parse(res.data);
                var user_lcglzz = data[0].extendObjects.user_lcglzz;
                var user_lcglzz_exname = data[0].extendObjects.user_lcglzz_exname;
                var user_lcssxmb = data[0].extendObjects.user_lcssxmb;
                var user_lcssxmb_exname = data[0].extendObjects.user_lcssxmb_exname;
                mstform.setValues({
                    user_lcglzz: {
                        value: user_lcglzz,
                        label: user_lcglzz_exname
                    },
                    user_lcssxmb: {
                        value: user_lcssxmb,
                        label: user_lcssxmb_exname
                    }
                });
            } else {
                $NG.alert('项目信息没有管理组织和所属项目部');
                return false;
            }
        });
        setTimeout(() => {
            var lcssxmb = mstform.getItem('user_lcssxmb').getValue();
            console.log("lcssxmb:", lcssxmb);
            if (lcssxmb != null && lcssxmb != '') {
                $NG.execServer('ssxmb_bmywdy', {
                    'dept': lcssxmb
                }, function (res) {
                    if (res.count > 0) {
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        if (data.length == 1) {
                            if (data[0].extendObjects.user_lcywdy) {
                                mstform.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
                            } else {
                                $NG.alert('请联系管理员处理，部门对照未做');
                                return false;
                            }
                        } else {
                            $NG.alert('请联系管理员处理，部门对照存在重复');
                            mstform.getItem('user_lcywdy').setValue(null);
                            return false;
                        }
                    } else {
                        $NG.alert('请联系管理员处理，部门对照未做');
                        return false;
                    }
                    $NG.execServer('ssxmb_zjm', {
                        'dept': lcssxmb
                    }, function (res) {
                        if (res.count > 0) {
                            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            if (data.length == 1) {
                                if (data[0].extendObjects.user_mnemcodeinaccdepart) {
                                    mstform.getItem('user_lchsbmzjm').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
                                } else {
                                    $NG.alert('浪潮核算部门的助记码没有和新中大部门编码保持一致');
                                    return false;
                                }
                            } else {
                                $NG.alert('请联系管理员处理，部门对照存在重复');
                                mstform.getItem('user_lchsbmzjm').setValue(null);
                                return false;
                            }
                        } else {
                            $NG.alert('请联系管理员处理，部门对照未做');
                            return false;
                        }
                    });
                });


            }
        }, 200);
    }, 'PcmM1.PhidPc');
    /*管理组织选择后清空所属项目部end*/

    /*管理组织选择后清空所属项目部start*/
    useValuesChange(({
        args
    }) => {
        mstform.getItem('user_lcssxmb').setValue();
    }, 'PcmM1.user_lcglzz');
    /*管理组织选择后清空所属项目部end*/

    useBeforeOpen((data) => {
        var zz = mstform.getItem('user_lcglzz').getValue();
        if (zz == null || zz == '') {
            $NG.alert('请先选择管理组织');
            return false;
        }
        $NG.updateUI(function (updater, state) {
            updater.fieldSetForm.PcmM4.user_lcssxmb.setProps({
                clientSqlFilter: ('parent_orgid = ' + zz),
                placeholder: ``
            });
        });
        return true;
    }, 'pc_dept');

    /*项目所属部选择后带出浪潮业务单元start*/
    useValuesChange(({
        args
    }) => {
        var user_lcssxmb = mstform.getItem('user_lcssxmb').getValue();
        if (!user_lcssxmb) {
            return;
        }
        $NG.execServer('ssxmb_bmywdy', {
            'dept': user_lcssxmb
        }, function (res) {
            if (res.count > 0) {
                var data = JSON.parse(res.data);
                if (data.length == 1) {
                    if (data[0].extendObjects.user_lcywdy) {
                        mstform.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
                    } else {
                        $NG.alert('请联系管理员处理，部门对照未做');
                        return false;
                    }
                } else {
                    $NG.alert('请联系管理员处理，部门对照存在重复');
                    return false;
                }

            } else {
                $NG.alert('请联系管理员处理，部门对照未做');
                return false;
            }
            $NG.execServer('ssxmb_zjm', {
                'dept': user_lcssxmb
            }, function (res) {
                if (res.count > 0) {
                    var data = JSON.parse(res.data);
                    if (data.length == 1) {
                        if (data[0].extendObjects.user_mnemcodeinaccdepart == null) {
                            $NG.alert('请联系管理员处理，部门对照未做');
                            return false;
                        }
                        mstform.getItem('user_lchsbmzjm').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
                    } else {
                        $NG.alert('请联系管理员处理，部门对照存在重复');
                        mstform.getItem('user_lchsbmzjm').setValue(null);
                    }
                } else {
                    $NG.alert('请联系管理员处理，部门对照未做');
                    return false;
                }
            });
        });
    }, "PcmM1.user_lcssxmb");
    /*项目所属部选择后带出浪潮业务单元end*/

    if ($NG.getQueryValue('otype') == "add") {
        if (mstform) {
            mstform.getItem('user_cwxtsfcz').setValue('1');
        }
    }


    /*根据支付比例带出同步初始比例start*/
    useValuesChange(({
        args
    }) => {
        var Zfbl = mstform.getItem('Zfbl').getValue();
        if (Zfbl) {
            mstform.getItem('user_tzhdfkbl').setValue(Zfbl);
        }
    }, 'PcmM1.Zfbl');
    /*根据支付比例带出同步初始比例end*/

    /*隐藏三个分组start*/
    //document.getElementsByTagName('fieldset')[1].style.visibility = 'hidden';
    /* document.getElementsByTagName('fieldset')[3].style.visibility = 'hidden';*/  //放出补充信息
    /*隐藏三个分组end*/

    /*浪潮同步标志为4的申请取消审核可使用start*/
    if (mstform) {
        var user_istbinspur = mstform.getItem('user_istbinspur').getValue();
        if (user_istbinspur == '4') {
            Toolbar.getItem('applyForReview').setReadOnly(false);
            Toolbar.getItem('applyForReview').setProps({ disabled: false });
        } else if (mstform.getItem('user_insconid').getValue()) {
            Toolbar.getItem('applyForReview').setReadOnly(false);
            Toolbar.getItem('applyForReview').setProps({ disabled: false });
        } else {
            Toolbar.getItem('applyForReview').setReadOnly(true);
            Toolbar.getItem('applyForReview').setProps({ disabled: true });
        }
    }
    /*浪潮同步标志为4的申请取消审核可使用end*/

    if (mstform.getItem('PhidPc').getValue() && $NG.getQueryValue('otype') == 'add') {
        var pcValue = mstform.getItem('PhidPc').getValue()
        // 检测重复项目
        $NG.execServer('jccfxm', {
            'phid': pcValue
        }, function (res) {
            console.log('pcValueres---------->', res)
            if (res.count > 0) {
                $NG.alert("该项目依旧在收入合同存在，不能再重新使用");
                mstform.getItem('PhidPc').setValue();
            }
        })
    }

    // 过滤重复项目
    $NG.updateUI(function (updater, state) {
        //console.log('updater--------->', updater)
        //var code = $NG.CryptoJS.encode(" phid  not in ( select phid_pc from pcm3_cnt_m where cnt_type in ('5','224200107000001','224200107000002','224200107000003') group by phid_pc ) ");
        //console.log('code------------>', code)
        updater.fieldSetForm.PcmM1.PhidPc.setProps({
            //clientSqlFilter: code,
            outqueryfilter: (" phid  not in ( select phid_pc from pcm3_cnt_m where cnt_type in ('5','224200107000001','224200107000002','224200107000003') group by phid_pc ) "),
            placeholder: ``
        })
    });

    /*财务系统是否存在为是的时候必输，为否的时候不必输start*/
    useValuesChange(({
        args
    }) => {
        var user_cwxtsfcz = mstform.getItem('user_cwxtsfcz').getValue();
        if (user_cwxtsfcz == '1') {
            mstform.getItem('user_insconcode').setProps({
                required: true, //required是否必输
            });
            mstform.getItem('user_insconid').setProps({
                required: true, //required是否必输
            });
            mstform.getItem('user_insconname').setProps({
                required: true, //required是否必输
            });
        } else {
            mstform.getItem('user_insconcode').setProps({
                required: false, //required是否必输
            });
            mstform.getItem('user_insconid').setProps({
                required: false, //required是否必输
            });
            mstform.getItem('user_insconname').setProps({
                required: false, //required是否必输
            });
        }
    }, 'PcmM1.user_cwxtsfcz');

    //如果 浪潮是否存在显示取消审核

    // if (user_istbinspur == '4') {
    //     Toolbar.getComponent('applycheck').forceenable();
    // } else if (mstform.getItem('user_insconid').getValue().length > 0) {

    //     Toolbar.getComponent('applycheck').forcedisable();
    // }

    //如果 浪潮是否存在显示的是 浪潮名称、id、编号必填
    if (mstform.getItem('user_cwxtsfcz').getValue() == '1') {
        mstform.getItem('user_insconcode').setProps({
            required: true, //required是否必输
        });
        mstform.getItem('user_insconid').setProps({
            required: true, //required是否必输
        });
        mstform.getItem('user_insconname').setProps({
            required: true, //required是否必输
        });
    } else {
        mstform.getItem('user_insconcode').setProps({
            required: false, //required是否必输
        });
        mstform.getItem('user_insconid').setProps({
            required: false, //required是否必输
        });
        mstform.getItem('user_insconname').setProps({
            required: false, //required是否必输
        });
    }


    /*财务系统是否存在为是的时候必输，为否的时候不必输end*/

    if ($NG.getQueryValue('otype') == "add") {
        mstform.getItem('user_rate').setValue(null);
        mstform.getItem('user_yfkbl').setValue(null);
        useValuesChange(({
            args
        }) => {
            var Zfbl = mstform.getItem('Zfbl').getValue();
            if (Zfbl) {
                mstform.getItem('user_zfbl').setValue(Zfbl);
            }
        }, 'PcmM1.Zfbl');
        // 判断编码是否存在合同内
        useValuesChange(({
            args
        }) => {
            var Billno = mstform.getItem('BillNo').getValue();
            if (Billno) {
                var bill_no = Billno.replace(/\s*/g, "")
                mstform.getItem('BillNo').setValue(bill_no);
                $NG.execServer('htbhss', {
                    'bill_no': bill_no
                }, function (res) {
                    var data = JSON.parse(res.data)
                    var htbh = data[0].extendObjects.ht
                    if (htbh == 1) {
                        $NG.alert("存在重复编码");
                        flag = 1;
                        return false;
                    }
                })
            }
        }, 'PcmM1.BillNo');
    }

    /*甲方单位为组织的时候浪潮甲方为必输切不只读start*/
    useValuesChange(({
        args
    }) => {
        // mstform.getItem('InvoiceCmp').setValue(null);
        // mstform.getItem('InvoiceSen').setValue(null);
        var PhidCustomerEnt = mstform.getItem('PhidCustomerEnt').getValue();
        if (!PhidCustomerEnt) {
            return false;
        }
        $NG.execServer('contract_CorrUnit', {
            'phid': PhidCustomerEnt
        }, function (res) {
            var data = JSON.parse(res.data);
            if (res.status != 'success') {
                $NG.alert("sql有误");
                return false;
            }
            if (res.count == 1) {
                if (data[0].extendObjects.type == 'org') {
                    //浪潮甲方设置为只读
                    mstform.getItem('user_lcjf').setReadOnly(false);
                    mstform.getItem('user_lcjf').setProps({ disabled: false });
                    mstform.getItem('user_lcjf').setProps({
                        required: true, //required是否必输
                    });
                } else {
                    mstform.getItem('user_lcjf').setReadOnly(true);
                    mstform.getItem('user_lcjf').setProps({ disabled: true });
                    mstform.getItem('user_lcjf').setProps({
                        required: false, //required是否必输
                    });
                }
            }

        });
    }, 'PcmM1.PhidCustomerEnt');

    /*预付款比例调整*/
    useValuesChange(({
        args
    }) => {
        var CntSumVatFc = mstform.getItem('CntSumVatFc').getValue();
        var yfkbl = mstform.getItem('user_yfkje').getValue();
        if (CntSumVatFc && yfkbl) {
            mstform.getItem('user_yfkbl').setValue(yfkbl / CntSumVatFc);
        } else {
            mstform.getItem('user_yfkbl').setValue('');
        }
    }, 'PcmM1.user_yfkje');
    /*含税金额调整*/
    useValuesChange(({
        args
    }) => {
        var CntSumVatFc = mstform.getItem('CntSumVatFc').getValue();
        var yfkbl = mstform.getItem('user_yfkje').getValue();
        if (CntSumVatFc && yfkbl) {
            mstform.getItem('user_yfkbl').setValue(yfkbl / CntSumVatFc);
        } else {
            mstform.getItem('user_yfkbl').setValue('');
        }
    }, 'PcmM1.CntSumVatFc');
    /*甲方单位为组织的时候浪潮甲方为必输切不只读end*/
    /*   2023-11-13关闭
    dgrid.addListener('edit', function (editor, e) { //监听单据体编辑状态，edit-编辑；add-增行；cellclick-点击
        if (e.originalValue == e.value) {
            return;
        } //判断原值与新值是否相同
        if (e.field == 'Qty') { //监听qty、prc字段变化
            var record = e.record;
            var sl = Ext.Number.from(record.get('Qty'), 0); //取值 
            if (sl == 1) {
                Ext.Msg.alert('数量不能为1,请修改');
                record.set('Qty', 0);
            }
        }
    });
    */
    /*输入浪潮合同编码带出浪潮合同IDstart*/
    useValuesChange(({
        args
    }) => {
        var user_insconcode = mstform.getItem('user_insconcode').getValue();
        if(user_insconcode){
            $NG.execServer('user_insconcode', {
            'user_insconcode': user_insconcode
        }, function (res) {
            if (res.count == 0) {
                mstform.getItem('user_insconid').setValue('');
                mstform.getItem('user_insconname').setValue('');
            } else {
                var data = JSON.parse(res.data)
                mstform.getItem('user_insconid').setValue(data[0].extendObjects.htnm);
                mstform.getItem('user_insconname').setValue(data[0].extendObjects.htmc);
            }
        });
        }
    }, 'PcmM1.user_insconcode');
    /*输入浪潮合同编码带出浪潮合同IDend*/

    useUpdateRows(({
        args
    }) => {
        console.log("args:", args);              //判断原值与新值是否相同，如果相同则返回
        var rows = dgrid.getRows();
        var sl = 0
        var bhsje = 0
        var se = 0
        for (i = 0; i < rows.length; i++) {
            if (sl < rows[i].TaxRate) {
                sl = rows[i].TaxRate
            }
            console.log("rows[i]:", rows[i]);
            bhsje += rows[i].AmtFc;
            se += rows[i].TaxAmt;
            console.log("se:", se);
        }
        mstform.getItem('user_rate').setValue(sl)
        mstform.getItem('user_bhsje').setValue(bhsje)
        mstform.getItem('user_se').setValue(se)
    }, 'PcmD1');

    useUpdateRow(({
        args
    }) => {
        console.log("args:", args);              //判断原值与新值是否相同，如果相同则返回
        if (args[1].dataIndex == 'TaxRate' || args[1].dataIndex == 'AmtFc' || args[1].dataIndex == 'TaxAmt' || args[1].dataIndex == 'Qty' || args[1].dataIndex == 'PrcFc' || args[1].dataIndex == 'PrcVatFc' || args[1].dataIndex == 'AmtVatFc') {
            var rows = dgrid.getRows();
            var sl = 0
            var bhsje = 0
            var se = 0
            for (i = 0; i < rows.length; i++) {
                if (sl < rows[i].TaxRate) {
                    sl = rows[i].TaxRate
                }
                console.log("rows[i]:", rows[i]);
                bhsje += rows[i].AmtFc;
                se += rows[i].TaxAmt;
                console.log("se:", se);
            }
            mstform.getItem('user_rate').setValue(sl)
            mstform.getItem('user_bhsje').setValue(bhsje)
            mstform.getItem('user_se').setValue(se)
        }                                                                     //监听AmtFc、user_hl字段变化事件结束
    }, 'PcmD1');


    /*补充信息带出start*/
    useValuesChange(({ args }) => {
        var PhidPc = mstform.getItem('PhidPc').getValue();
        if (!PhidPc) {
            return false;
        }
        console.log('PhidPc===================>', PhidPc)
        $NG.execServer('bcxx', {
            'phid': PhidPc
        }, function (res) {
            if (res.count > 0) {
                var data = JSON.parse(res.data)
                mstform.getItem('user_jfdwxz').setValue(data[0].extendObjects.jfqyxz);//甲方单位性质
                mstform.getItem('user_htwbje').setValue(data[0].extendObjects.htwbje);//合同文本金额
                mstform.getItem('user_yjtbsy').setValue(data[0].extendObjects.htlrl);//投标收益率
                mstform.getItem('user_htgq').setValue(data[0].extendObjects.htgq);//合同工期
                mstform.setValues({
                    user_gclb: { //工程类别
                        value: data[0].extendObjects.gclxejzj,
                        label: data[0].extendObjects.gclxejmc
                    }
                });
                mstform.getItem('user_htpsdj').setValue(data[0].extendObjects.htpsdj);//合同评审等级
                mstform.getItem('user_htjjfs').setValue(data[0].extendObjects.jjfs);//计价方式
                mstform.getItem('user_htfkfs').setValue(data[0].extendObjects.fkfs);//付款方式
            }
        });
    }, 'PcmM1.PhidPc');
    /*补充信息带出end*/

    //保存前检测
    useBeforeClick(({
        args
    }) => {
        var flag = 0;
        var pc = mstform.getItem('PhidPc').getValue();
        var user_insconcode = mstform.getItem('user_insconcode').getValue();

        // 防止表头税额与明细行税额不一致 2026-01-13
        var rows = dgrid.getRows();
        var sl = 0
        var bhsje = 0
        var se = 0
        for (i = 0; i < rows.length; i++) {
            if (sl < rows[i].TaxRate) {
                sl = rows[i].TaxRate
            }
            console.log("rows[i]:", rows[i]);
            bhsje += rows[i].AmtFc;
            se += rows[i].TaxAmt;
            console.log("se:", se);
        }
        if (mstform.getItem('user_se').getValue() != se) {
            mstform.getItem('user_se').setValue(se)
        }
        // 防止表头税额与明细行税额不一致 2026-01-13

        if (user_insconcode) {
            /*查看浪潮合同编码是否存在user_insconcode 该视图中start*/
            $NG.execServer('user_insconcode', {
                'user_insconcode': user_insconcode
            }, function (res) {
                if (res.status != 'success') {
                    $NG.alert("sql有误");
                    flag = 1;
                    return false;
                } else if (res.count == 0) {
                    $NG.alert("该浪潮合同编码在浪潮系统中不存在");
                    flag = 1;
                    return false;
                } else { }
            });
            if ($NG.getQueryValue('otype') == "edit") {
                var bill_no = mstform.getItem('BillNo').getValue() ? "'" + mstform.getItem('BillNo').getValue() + "'" : mstform.getItem('BillNo').getValue();
                $NG.execServer('lchtbm_djbh', {
                    'bill_no': bill_no
                }, function (res) {
                    var data = JSON.parse(res.data);
                    if (res.status != 'success') {
                        $NG.alert("sql有误");
                        flag = 1;
                        return false;
                    } else if (data[0].extendObjects.user_insconcode == mstform.getItem('user_insconcode').getValue()) {

                    } else {
                        //检测该浪潮合同编码是否在新中大存在
                        $NG.execServer('lchtbm', {
                            'user_insconcode': user_insconcode
                        }, function (res) {
                            if (res.status != 'success') {
                                $NG.alert("sql有误");
                                flag = 1;
                                return false;
                            } else if (res.count == 0) { } else {
                                $NG.alert("该浪潮合同编码在新中大中已存在");
                                flag = 1;
                                return false;
                            }
                        });
                    }
                });
            }
            if ($NG.getQueryValue('otype') == "add" || $NG.getQueryValue('otype') == "edit") {
                //检测该浪潮合同编码是否在新中大存在
                $NG.execServer('lchtbm', {
                    'user_insconcode': user_insconcode
                }, function (res) {
                    if (res.status != 'success') {
                        $NG.alert("sql有误");
                        flag = 1;
                        return false;
                    } else if (res.count == 0) { } else {
                        $NG.alert("该浪潮合同编码在新中大中已存在");
                        flag = 1;
                        return false;
                    }

                    /*判断项目信息所属项目部和部门业务单元对照字段是否有值start*/
                    var bill_no = mstform.getItem('BillNo').getValue();
                    if (bill_no) {
                        return false;
                    }
                    $NG.execServer('htbhss', {
                        'bill_no': bill_no
                    }, function (res) {
                        var htbhssdata = JSON.parse(res.data);
                        var htbh = htbhssdata[0].extendObjects.ht
                        if (htbh == 1) {
                            $NG.alert("存在重复编码");
                            flag = 1;
                            return false;
                        }
                        $NG.execServer('xmxx_ssxmb_lcywdy', {
                            'pc': pc
                        }, function (res) {
                            var data = JSON.parse(res.data);
                            if (res.status != 'success') {
                                $NG.alert("sql有误");
                                flag = 1;
                                return false;
                            } else if (res.count == 1) {
                                if (!data[0].extendObjects.user_pc_dept) {
                                    $NG.alert("合同所属项目信息没有维护所属项目部");
                                    flag = 1;
                                    return false;
                                }
                                if (!data[0].extendObjects.user_mnemcodeinaccdepart) {
                                    $NG.alert("合同所属项目信息的所属项目部浪潮系统没有对应核算部门的助记码");
                                    flag = 1;
                                    return false;
                                }
                                if (!data[0].extendObjects.user_lcywdy) {
                                    $NG.alert("合同所属项目信息没有维护浪潮业务单元");
                                    flag = 1;
                                    return false;
                                }
                            }
                        });
                    });
                    /*判断项目信息所属项目部和部门业务单元对照字段是否有值end*/
                });
            }
        }
        /*查看浪潮合同编码是否存在user_insconcode 该视图中end*/

        if (flag == 1) {
            return false;
        }
        if (flag == 0) {
            return true;
        }
    }, "CntMDetailToolBar.save");
});