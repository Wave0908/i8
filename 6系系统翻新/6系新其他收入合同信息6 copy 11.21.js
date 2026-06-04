$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useBeforeOpen, useUpdateRows, useClick, useBeforeClick }
) {
    var mstform = $NG.getCmpApi('PcmM3');
    var Toolbar = $NG.getCmpApi('CntMDetailToolBar');
    var dgrid = $NG.getCmpApi('PcmD3');
    //浪潮甲方设置为只读
    mstform.getItem('user_lcjf').setProps({disabled: true});
    //浪潮乙方设置为只读
    mstform.getItem('user_lcyf').setProps({disabled: true});
    
    // 开发留：
    //.setReadOnly(true) 会让输入框置灰，不可以输入通过键盘输入信息，但是依旧会触发之前的双击方法
    //.setReadOnly(false) 同理，可以通过键盘输入信息，但不会触发之前的双击方法
    //因此，自定义字段输入框建议使用.setProps({disabled: true|false)}来控制是否只读，disabled会同步影响双击逻辑是否开启
    
    mstform.getItem('CntSumVatFc').setReadOnly(false);

    if ($NG.getQueryValue('otype') == 'add') {
        mstform.getItem('user_cwxtsfcz').setValue('1');
    }
    /*预付款金额调整*/
    useValuesChange(({ args, form }) => {
        var CntSumVatFc = mstform.getItem('CntSumVatFc').getValue();
        var yfkbl = mstform.getItem('user_yfkje').getValue();
        if (CntSumVatFc != '') {
            mstform.getItem('user_yfkbl').setValue(yfkbl / CntSumVatFc);
        } else {
            mstform.getItem('user_yfkbl').setValue('');
        }
    }, "PcmM3.user_yfkje");
    /*含税金额调整*/
    useValuesChange(({ args, form }) => {
        var CntSumVatFc = mstform.getItem('CntSumVatFc').getValue();
        var yfkbl = mstform.getItem('user_yfkje').getValue();
        if (CntSumVatFc != '') {
            mstform.getItem('user_yfkbl').setValue(yfkbl / CntSumVatFc);
        } else {
            mstform.getItem('user_yfkbl').setValue('');
        }
    }, "PcmM3.CntSumVatFc");
    /*根据支付比例带出同步初始比例start*/
    useValuesChange(({ args, form }) => {
        var Zfbl = mstform.getItem('Zfbl').getValue();
        mstform.getItem('user_tzhdfkbl').setValue(Zfbl);
    }, "PcmM3.Zfbl");
    /*根据支付比例带出同步初始比例end*/

    if ($NG.getQueryValue('oType') == 'add'||$NG.getQueryValue('oType') == 'edit') {
        useValuesChange(({ args, form }) => {
            var Billno = mstform.getItem('BillNo').getValue();

            var bill_no = Billno.replace(/\s*/g, "")

            mstform.getItem('BillNo').setValue(bill_no);

            $NG.execServer('htbhss', {
                'bill_no': bill_no
            }, function (res) {
                var data = JSON.parse(res);
                if (data) {
                    var htbh = data[0].extendObjects.ht
                    if (htbh == 1) {
                        $NG.alert('存在重复编码');
                        flag = 1;
                        return false;
                    }
                }
            })
        }, 'BillNo');
    }

    /*财务系统是否存在为是的时候必输，为否的时候不必输start*/
    useValuesChange(({ args, form }) => {
        var user_cwxtsfcz = mstform.getItem('user_cwxtsfcz').getValue();
        if (user_cwxtsfcz == '1') {
            $NG.updateUI((updater) => {
                updater.fieldSetForm.PcmM3.user_insconcode.setProps({ required: true })
                updater.fieldSetForm.PcmM3.user_insconid.setProps({ required: true })
                updater.fieldSetForm.PcmM3.user_insconname.setProps({ required: true })
            })
        } else {
            $NG.updateUI((updater) => {
                updater.fieldSetForm.PcmM3.user_insconcode.setProps({ required: false })
                updater.fieldSetForm.PcmM3.user_insconid.setProps({ required: false })
                updater.fieldSetForm.PcmM3.user_insconname.setProps({ required: false })
            })
        }
    }, "PcmM3.user_cwxtsfcz");
    /*财务系统是否存在为是的时候必输，为否的时候不必输end*/
    /*隐藏三个分组start*/
    // document.getElementsByTagName('fieldset')[1].style.visibility = 'hidden';
    // //document.getElementsByTagName('fieldset')[2].style.visibility = 'hidden';
    // document.getElementsByTagName('fieldset')[3].style.visibility = 'hidden';
    /*隐藏三个分组end*/
    /*浪潮返回标志为4申请取消审核可点击start*/

    var user_istbinspur = mstform.getItem('user_istbinspur').getValue();
    if (user_istbinspur == '4') {
        Toolbar.getItem('applyForReview').setReadOnly(false);
    } else if (mstform.getItem('user_insconid').getValue()) {
        Toolbar.getItem('applyForReview').setReadOnly(false);
    } else {
        Toolbar.getItem('applyForReview').setReadOnly(true);
    }

    /*浪潮返回标志为4申请取消审核可点击end*/

    //如果 ；浪潮id字段有值在显示取消审核
    //如果 浪潮是否存在显示的是 浪潮名称、id、编号必填
    useValuesChange(({ args, form }) => {
        var user_cwxtsfcz = mstform.getItem('user_cwxtsfcz').getValue();
        if (user_cwxtsfcz == '1') {
            $NG.updateUI((updater) => {
                updater.fieldSetForm.PcmM3.user_insconcode.setProps({ required: true })
                updater.fieldSetForm.PcmM3.user_insconid.setProps({ required: true })
                updater.fieldSetForm.PcmM3.user_insconname.setProps({ required: true })
            })
        } else {
            $NG.updateUI((updater) => {
                updater.fieldSetForm.PcmM3.user_insconcode.setProps({ required: false })
                updater.fieldSetForm.PcmM3.user_insconid.setProps({ required: false })
                updater.fieldSetForm.PcmM3.user_insconname.setProps({ required: false })
            })
        }
    }, "PcmM3.user_cwxtsfcz");

    /*乙方单位为组织的时候浪潮甲方为必输切不只读start*/
    useValuesChange(({ args, form }) => {
        var PhidSenComp = mstform.getItem('PhidSupplyEnt').getValue();
        $NG.execServer('contract_CorrUnit', {
            'phid': PhidSenComp
        }, function (res) {
            const data = typeof res.data == 'string' ? JSON.parse(res.data) : res.data;
            if (res.status != 'success') {
                $NG.alert('sql有误');
            }
            if (data.length != 0) {
                if (data[0].extendObjects.type == 'org') {
                    //浪潮甲方设置为只读
                    mstform.getItem('user_lcyf').setProps({disabled: false});
                    $NG.updateUI((updater) => {
                        updater.fieldSetForm.PcmM3.user_lcyf.setProps({ required: true })
                    })
                } else {
                    mstform.getItem('user_lcyf').setProps({disabled: true});
                    console.log("======mstform.getItem('user_lcyf').setProps({disabled: true})")
                    $NG.updateUI((updater) => {
                        updater.fieldSetForm.PcmM3.user_lcyf.setProps({ required: false })
                    })
                }
            }

        });

    }, 'PcmM3.PhidSupplyEnt');

    /*乙方单位为组织的时候浪潮甲方为必输切不只读end*/

    /*甲方单位为组织的时候浪潮甲方为必输切不只读start*/
    useValuesChange(({ args, form }) => {
        var PhidRecComp = mstform.getItem('PhidCustomerEnt').getValue();
        console.log("PhidRecComp:", PhidRecComp);
        $NG.execServer('contract_CorrUnit', {
            'phid': PhidRecComp
        }, function (res) {
            const data = typeof res.data == 'string' ? JSON.parse(res.data) : res.data;
            if (res.status != 'success') {
                $NG.alert('sql有误');
            }
            console.log("data:", data);
            if (data.length != 0) {
                if (data[0].extendObjects.type == 'org') {
                    //浪潮甲方设置为只读
                    mstform.getItem('user_lcjf').setProps({disabled: false});
                    $NG.updateUI((updater) => {
                        updater.fieldSetForm.PcmM3.user_lcjf.setProps({ required: true })
                    })
                } else {
                    mstform.getItem('user_lcjf').setProps({disabled: true});
                    console.log("======mstform.getItem('user_lcjf').setProps({disabled: true})")
                    $NG.updateUI((updater) => {
                        updater.fieldSetForm.PcmM3.user_lcjf.setProps({ required: false })
                    })
                }
            }
        });
    }, 'PcmM3.PhidCustomerEnt');

    /*甲方单位为组织的时候浪潮甲方为必输切不只读end*/

    //dgrid.addListener('edit', function(editor, e) { //监听单据体编辑状态，edit-编辑；add-增行；cellclick-点击
    //	if(e.originalValue == e.value) {
    //		return;
    //	} //判断原值与新值是否相同
    //	if(e.field == 'Qty') { //监听qty、prc字段变化
    //		var record = e.record;
    //		var sl = Ext.Number.from(record.get('Qty'), 0); //取值 
    //		if(sl == 1) {
    //			Ext.Msg.alert('提示','数量不能为1请修改');
    //			record.set('Qty', 0);
    //		}
    //	}
    //});
    //*输入浪潮合同编码带出浪潮合同ID*/
    useValuesChange(({ args, form }) => {
        var user_insconcode = "'" + mstform.getItem('user_insconcode').getValue() + "'";
        $NG.execServer('user_insconcode', {
            'user_insconcode': user_insconcode
        }, function (res) {
            const data = typeof res.data == 'string' ? JSON.parse(res.data) : res.data;
            if (data.length == 0) {
                mstform.getItem('user_insconid').setValue('');
                mstform.getItem('user_insconname').setValue('');
            } else {
                mstform.getItem('user_insconid').setValue(data[0].extendObjects.htnm)
                mstform.getItem('user_insconname').setValue(data[0].extendObjects.htmc);
            }
        });
    }, 'PcmM3.user_insconcode');


    /*管理组织选择后清空所属项目部start*/
    useValuesChange(({ args, form }) => {
        var PhidPc = mstform.getItem('PhidPc').getValue()
        console.log("PhidPc:", PhidPc)
        $NG.execServer('xmxxdcglzssmb', {
            'phid': PhidPc
        }, function (res) {
            console.log("dwadasdsddsad");
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            console.log("data:", data);
            if (res.count > 0) {
                mstform.setValues({
                    user_lcglzz: {
                        value: data[0].extendObjects.user_lcglzz,
                        label: data[0].extendObjects.user_lcglzz_exname
                    }
                })
                mstform.setValues({
                    user_lcssxmb: {
                        value: data[0].extendObjects.user_lcssxmb,
                        label: data[0].extendObjects.user_lcssxmb_exname
                    }
                })
            } else {
                $NG.alert('项目信息没有管理组织和所属项目部');
                return false;
            }
        });


        setTimeout(() => {
            var lcssxmb = mstform.getItem('user_lcssxmb').getValue();
            console.log("lcssxmb:", lcssxmb);
            if (lcssxmb != null || lcssxmb != '') {
                $NG.execServer('ssxmb_bmywdy', {
                    'dept': lcssxmb
                }, function (res) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    if (res.count > 0) {
                        mstform.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
                    } else {
                        $NG.alert('请先维护部门业务单元对照表');
                        return false;
                    }
                });

                $NG.execServer('ssxmb_zjm', {
                    'dept': lcssxmb
                }, function (res) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log("data[0].extendObjects:", data[0].extendObjects);
                    if (res.count > 0) {
                        mstform.getItem('user_lchsbmzjm').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
                    } else {
                        $NG.alert('浪潮核算部门的助记码没有和新中大部门编码保持一致');
                        return false;
                    }
                });
            }
        }, 200);
        /*管理组织选择后清空所属项目部end*/
    }, "PcmM3.PhidPc");
    /*管理组织选择后清空所属项目部end*/

    /*管理组织选择后清空所属项目部start*/
    useValuesChange(({ args, form }) => {
        mstform.getItem('user_lcssxmb').setValue();
    }, "PcmM3.user_lcglzz");
    /*管理组织选择后清空所属项目部end*/

    useBeforeOpen((data) => {
        var zz = mstform.getItem('user_lcglzz').getValue();
        if (zz) {
            $NG.updateUI(function (updater, state) {
                updater.fieldSetForm.PcmM3.user_lcssxmb.setProps({
                    clientSqlFilter: ('parent_orgid = ' + zz),
                    placeholder: ``
                });
            });
        }
        return true;
    }, 'pc_dept');

    /*项目所属部选择后带出浪潮业务单元start*/
    useValuesChange(({ args, form }) => {
        var user_lcssxmb = mstform.getItem('user_lcssxmb').getValue();
        if (user_lcssxmb) {
            $NG.execServer('ssxmb_bmywdy', {
                'dept': user_lcssxmb
            }, function (res) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (data) {
                    mstform.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
                } else {
                    $NG.alert('请先维护部门业务单元对照表');
                    return false;
                }
                $NG.execServer('ssxmb_zjm', {
                    'dept': user_lcssxmb
                }, function (res) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log("data:", data);
                    if (data) {
                        console.log("data[0].extendObjects:", data[0].extendObjects);
                        mstform.getItem('user_lchsbmzjm').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
                    } else {
                        $NG.alert('浪潮核算部门的助记码没有和新中大部门编码保持一致');
                        return false;
                    }
                });
            });
        }


    }, 'PcmM3.user_lcssxmb');

    /*项目所属部选择后带出浪潮业务单元end*/
    
    /*useBeforeClick(() => {
        return new Promise((resolve) => {
            var user_insconcode = "'" + mstform.getItem('user_insconcode').getValue() + "'";
            var pc = mstform.getItem('PhidPc').getValue();
            var checkPromises = [];

            // 检查浪潮合同编码
            if (mstform.getItem('user_insconcode').getValue()) {
                // 检查浪潮合同编码是否存在
                const checkInsconcode = new Promise((resolveCheck, rejectCheck) => {
                    $NG.execServer('user_insconcode', {
                        'user_insconcode': user_insconcode
                    }, function (res) {
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        if (data) {
                            if (res.status != 'success') {
                                $NG.alert('sql有误');
                                rejectCheck('sql有误');
                            } else if (data.length == 0) {
                                $NG.alert('该浪潮合同编码在浪潮系统中不存在');
                                rejectCheck('该浪潮合同编码在浪潮系统中不存在');
                            } else {
                                resolveCheck();
                            }
                        } else {
                            resolveCheck();
                        }
                    });
                });
                checkPromises.push(checkInsconcode);

                // 编辑模式下的检查
                if ($NG.getQueryValue('oType') == 'edit') {
                    var bill_no = "'" + mstform.getItem('BillNo').getValue() + "'";
                    const checkEdit = new Promise((resolveCheck, rejectCheck) => {
                        $NG.execServer('lchtbm_djbh', {
                            'bill_no': bill_no
                        }, function (res) {
                            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            if (res.status != 'success') {
                                $NG.alert('sql有误');
                                rejectCheck('sql有误');
                            } else if (data[0].extendObjects.user_insconcode == mstform.getItem('user_insconcode').getValue()) {
                                resolveCheck();
                            } else {
                                // 检测该浪潮合同编码是否在新中大存在
                                $NG.execServer('lchtbm', {
                                    'user_insconcode': user_insconcode
                                }, function (res) {
                                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                                    if (res.status != 'success') {
                                        $NG.alert('sql有误');
                                        rejectCheck('sql有误');
                                    } else if (!data || data.length == 0) {
                                        resolveCheck();
                                    } else {
                                        $NG.alert('该浪潮合同编码在新中大中已存在');
                                        rejectCheck('该浪潮合同编码在新中大中已存在');
                                    }
                                });
                            }
                        });
                    });
                    checkPromises.push(checkEdit);
                }

                // 添加模式下的检查
                if ($NG.getQueryValue('oType') == 'add') {
                    const checkAdd = new Promise((resolveCheck, rejectCheck) => {
                        $NG.execServer('lchtbm', {
                            'user_insconcode': user_insconcode
                        }, function (res) {
                            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            if (res.status != 'success') {
                                $NG.alert('sql有误');
                                rejectCheck('sql有误');
                            } else if (!data || data.length == 0) {
                                resolveCheck();
                            } else {
                                $NG.alert('该浪潮合同编码在新中大中已存在');
                                rejectCheck('该浪潮合同编码在新中大中已存在');
                            }
                        });
                    });
                    checkPromises.push(checkAdd);
                }
            }

            // 添加模式下检查重复编码和项目信息
            if ($NG.getQueryValue('oType') == 'add') {
                // 检查重复编码
                const checkDuplicate = new Promise((resolveCheck, rejectCheck) => {
                    $NG.execServer('htbhss', {
                        'bill_no': mstform.getItem('BillNo').getValue()
                    }, function (res) {
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        if (data && data[0] && data[0].extendObjects && data[0].extendObjects.ht == 1) {
                            $NG.alert('存在重复编码');
                            rejectCheck('存在重复编码');
                        } else {
                            resolveCheck();
                        }
                    });
                });
                checkPromises.push(checkDuplicate);

                // 检查项目信息
                const checkProject = new Promise((resolveCheck, rejectCheck) => {
                    $NG.execServer('xmxx_ssxmb_lcywdy', {
                        'pc': pc
                    }, function (res) {
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        if (res.status != 'success') {
                            $NG.alert('sql有误');
                            rejectCheck('sql有误');
                        } else if (data.length == 1) {
                            if (!data[0].extendObjects.user_pc_dept) {
                                $NG.alert('合同所属项目信息没有维护所属项目部');
                                rejectCheck('合同所属项目信息没有维护所属项目部');
                            } else if (!data[0].extendObjects.user_mnemcodeinaccdepart) {
                                $NG.alert('合同所属项目信息的所属项目部浪潮系统没有对应核算部门的助记码');
                                rejectCheck('合同所属项目信息的所属项目部浪潮系统没有对应核算部门的助记码');
                            } else if (!data[0].extendObjects.user_lcywdy) {
                                $NG.alert('合同所属项目信息没有维护浪潮业务单元');
                                rejectCheck('合同所属项目信息没有维护浪潮业务单元');
                            } else {
                                resolveCheck();
                            }
                        } else {
                            resolveCheck();
                        }
                    });
                });
                checkPromises.push(checkProject);
            }

            // 检查税率
            var rate = mstform.getItem("user_rate").getValue();
            if (rate == 0 && mstform.getItem("user_szlxpdbz").getValue() != '1') {
                const checkRate = new Promise((resolveCheck, rejectCheck) => {
                    $NG.confirm('税率是否为0').then(res => {
                        if (res) {
                            mstform.getItem("user_szlxpdbz").setValue('1');
                            rejectCheck('税率为0，需要确认');
                        } else {
                            mstform.getItem("user_szlxpdbz").setValue(null);
                            rejectCheck('税率为0，用户取消');
                        }
                    });
                });
                checkPromises.push(checkRate);
            }

            // 如果没有检查项，则允许保存
            if (checkPromises.length === 0) {
                resolve(true);
                return;
            }

            // 执行所有检查
            Promise.all(checkPromises.map(p => p.catch(e => e)))
                .then(results => {
                    // 检查是否有任何检查失败
                    const hasError = results.some(result => typeof result === 'string');
                    if (hasError) {
                        resolve(false); // 有错误，不允许保存
                    } else {
                        resolve(true); // 所有检查通过，允许保存
                    }
                });
        });
    }, 'save');*/


    //保存前检测
    useBeforeClick(({
        args
    }) => {
        var flag = 0;
        var pc = mstform.getItem('PhidPc').getValue();
        var user_insconcode = mstform.getItem('user_insconcode').getValue() ? "'" + mstform.getItem('user_insconcode').getValue() + "'" : mstform.getItem('user_insconcode').getValue();
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
})