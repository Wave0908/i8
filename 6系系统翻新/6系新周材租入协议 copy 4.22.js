$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick, useBeforeOpen, useBeforeClick }
) {
    // 获取容器
    var mstform = $NG.getCmpApi("PcmM11");
    console.log("mstform:", mstform);
    var Toolbar = $NG.getCmpApi("CntMDetailToolBar");
    console.log("Toolbar====", Toolbar.getButtons());
    var dgrid = $NG.getCmpApi("PcmD11");
    const { isChgCnt } = $NG.getQueryValue();
    console.log("isChgCnt:", isChgCnt);
    //浪潮乙方设置为只读
    mstform.getItem('user_lcyf').setReadOnly(true);
    if ($NG.getQueryValue('otype') == 'add') {
        mstform.getItem('user_cwxtsfcz').setValue('1');
        mstform.getItem('IsPayOverCntSum').setValue('0');
        mstform.getItem('PayOverPrecent').setValue('1.1');
    }
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
        mstform.getItem('user_istbinspur').setReadOnly(true);
        mstform.getItem('user_istbinspur').setProps({ disabled: true });
        mstform.getItem('user_lcglzz').setReadOnly(true);
        mstform.getItem('user_lcglzz').setProps({ disabled: true });
        mstform.getItem('user_lcssxmb').setReadOnly(true);
        mstform.getItem('user_lcssxmb').setProps({ disabled: true });
        mstform.getItem('user_lcywdy').setReadOnly(true);
        mstform.getItem('user_lcywdy').setProps({ disabled: true });
        mstform.getItem('user_lchsbmzjm').setReadOnly(true);
        mstform.getItem('user_lchsbmzjm').setProps({ disabled: true });

        mstform.getItem('user_insconcode').setReadOnly(true);
        mstform.getItem('user_insconcode').setProps({ disabled: true });

        mstform.getItem('BillNo').setReadOnly(true);
        mstform.getItem('BillNo').setProps({ disabled: true });
        mstform.getItem('BillName').setReadOnly(true);
        mstform.getItem('BillName').setProps({ disabled: true });
        mstform.getItem('CntType').setReadOnly(true);
        mstform.getItem('CntType').setProps({ disabled: true });
        mstform.getItem('PhidPc').setReadOnly(true);
        mstform.getItem('PhidPc').setProps({ disabled: true });
        mstform.getItem('XYCntSumAmt').setReadOnly(true);
        mstform.getItem('XYCntSumAmt').setProps({ disabled: true });

        mstform.getItem('user_cwxtsfcz').setReadOnly(true);
        mstform.getItem('user_cwxtsfcz').setProps({ disabled: true });
        mstform.getItem('user_insconid').setReadOnly(true);
        mstform.getItem('user_insconid').setProps({ disabled: true });
        mstform.getItem('user_insconname').setReadOnly(true);
        mstform.getItem('user_insconname').setProps({ disabled: true });
        mstform.getItem('user_tbinspurtime').setReadOnly(true);
        mstform.getItem('user_tbinspurtime').setProps({ disabled: true });
        mstform.getItem('user_fplx').setReadOnly(true);
        mstform.getItem('user_fplx').setProps({ disabled: true });
        mstform.getItem('user_nsrlx').setReadOnly(true);
        mstform.getItem('user_nsrlx').setProps({ disabled: true });
        mstform.getItem('user_tzhdfkbl').setReadOnly(true);
        mstform.getItem('user_tzhdfkbl').setProps({ disabled: true });
        mstform.getItem('user_jsje').setReadOnly(true);
        mstform.getItem('user_jsje').setProps({ disabled: true });
        mstform.getItem('user_fkje').setReadOnly(true);
        mstform.getItem('user_fkje').setProps({ disabled: true });
        mstform.getItem('user_fpje').setReadOnly(true);
        mstform.getItem('user_fpje').setProps({ disabled: true });
        mstform.getItem('user_rate').setReadOnly(true);
        mstform.getItem('user_rate').setProps({ disabled: true });

        mstform.getItem('PhidCustomerEnt').setReadOnly(true);
        mstform.getItem('PhidCustomerEnt').setProps({ disabled: true });
        mstform.getItem('PhidSupplyEnt').setReadOnly(true);
        mstform.getItem('PhidSupplyEnt').setProps({ disabled: true });
        mstform.getItem('Zfbl').setReadOnly(true);
        mstform.getItem('Zfbl').setProps({ disabled: true });
        mstform.getItem('user_sfzxkj').setReadOnly(true);
        mstform.getItem('user_sfzxkj').setProps({ disabled: true });
        mstform.getItem('user_zxkj').setReadOnly(true);
        mstform.getItem('user_zxkj').setProps({ disabled: true });
        mstform.getItem('PhidInvComp').setReadOnly(true);
        mstform.getItem('PhidInvComp').setProps({ disabled: true });
        mstform.getItem('PhidTickComp').setReadOnly(true);
        mstform.getItem('PhidTickComp').setProps({ disabled: true });
    }
    //资源选择按照所选材料类型过滤
    //TODO
    // Ext.override(Ext.res.ItemDataHelpWindow, {
    // 	initComponent: function () {
    // 		var me = this;
    // 		me.ResourceType = '2'; //资源类型主键
    // 		me.resBsPhId = '313191217010493';//资源分类主键
    // 		me.filterArtificial = true;
    // 		me.callParent();
    // 	}
    // });
    console.log("dgrid:", dgrid);

    //菜单栏增加复制功能
    if (Toolbar) {
        Toolbar.insert({
            id: "",
            text: "复制",
            width: this.itemWidth,
            iconCls: "icon-New"
        }, 1);
        useClick(() => {
            //获取表体数据
            var a = dgrid.getRows();
            var user_cllx = a[0].get('user_cllx');
            for (var i = 1; i < a.length; i++) {
                a[i].set('user_cllx', user_cllx);
            }
        }, 'copy')
    }
    /*根据支付比例带出同步初始比例start*/
    useValuesChange(({ args, form }) => {
        var Zfbl = mstform.getItem('Zfbl').getValue();
        mstform.getItem('user_tzhdfkbl').setValue(Zfbl);
    }, 'Zfbl');

    /*预付款金额调整*/
    useValuesChange(({ args, form }) => {
        var XYCntSumAmt = mstform.getItem('XYCntSumAmt').getValue();
        var yfkbl = mstform.getItem('user_yfkje').getValue();
        if (XYCntSumAmt != '' && XYCntSumAmt != null) {
            mstform.getItem('user_yfkbl').setValue(yfkbl / XYCntSumAmt);
        }
        else {
            mstform.getItem('user_yfkbl').setValue('');
        }
    }, 'user_yfkje');
    /*含税金额调整*/
    useValuesChange(({ args, form }) => {
        var XYCntSumAmt = mstform.getItem('XYCntSumAmt').getValue();
        var yfkbl = mstform.getItem('user_yfkje').getValue();
        if (XYCntSumAmt != '' && XYCntSumAmt != null) {
            mstform.getItem('user_yfkbl').setValue(yfkbl / XYCntSumAmt);
        }
        else {
            mstform.getItem('user_yfkbl').setValue('');
        }
    }, 'XYCntSumAmt');

    /*根据支付比例带出同步初始比例end*/
    if ($NG.getQueryValue('oType') == 'add' || $NG.getQueryValue('oType') == 'edit') {
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
    /*浪潮返回标志为4申请取消审核可点击start*/


    var user_istbinspur = mstform.getItem('user_istbinspur').getValue();
    // if (user_istbinspur == '4') {
    //     Toolbar.getItem('applyForReview').setReadOnly(false);
    // } else if (mstform.getItem('user_insconid').getValue()) {
    //     Toolbar.getItem('applyForReview').setReadOnly(false);
    // } else {
    //     Toolbar.getItem('applyForReview').setReadOnly(true);
    // }


    /*浪潮返回标志为4申请取消审核可点击end*/


    if (mstform.getItem('user_cwxtsfcz').getValue() == '2') {
        $NG.updateUI((updater) => {
            updater.fieldSetForm.PcmM11.user_insconcode.setProps({ required: false })
            updater.fieldSetForm.PcmM11.user_insconid.setProps({ required: false })
            updater.fieldSetForm.PcmM11.user_insconname.setProps({ required: false })
        })
    } else {
        $NG.updateUI((updater) => {
            updater.fieldSetForm.PcmM11.user_insconcode.setProps({ required: true })
            updater.fieldSetForm.PcmM11.user_insconid.setProps({ required: true })
            updater.fieldSetForm.PcmM11.user_insconname.setProps({ required: true })
        })
    }

    /*财务系统是否存在为是的时候必输，为否的时候不必输start*/
    useValuesChange(({ args, form }) => {
        var user_cwxtsfcz = mstform.getItem('user_cwxtsfcz').getValue();
        if (user_cwxtsfcz == '1') {
            $NG.updateUI((updater) => {
                updater.fieldSetForm.PcmM11.user_insconcode.setProps({ required: true })
                updater.fieldSetForm.PcmM11.user_insconid.setProps({ required: true })
                updater.fieldSetForm.PcmM11.user_insconname.setProps({ required: true })
            })
        } else {
            $NG.updateUI((updater) => {
                updater.fieldSetForm.PcmM11.user_insconcode.setProps({ required: false })
                updater.fieldSetForm.PcmM11.user_insconid.setProps({ required: false })
                updater.fieldSetForm.PcmM11.user_insconname.setProps({ required: false })
            })
        }
    }, "PcmM11.user_cwxtsfcz");
    /*财务系统是否存在为是的时候必输，为否的时候不必输end*/

    if ($NG.getQueryValue('oType') == 'add') {
        mstform.getItem('user_rate').setValue(null);
        mstform.getItem('user_yfkbl').setValue(null);
    }


    /*乙方单位为组织的时候浪潮甲方为必输切不只读start*/
    useValuesChange(({ args, form }) => {
        var PhidSenComp = mstform.getItem('PhidSupplyEnt').getValue();
        $NG.execServer('contract_CorrUnit', {
            'phid': PhidSenComp
        }, function (res) {
            var data = JSON.parse(res);
            if (res.status != 'success') {
                $NG.alert('sql有误');
            }
            if (data) {
                if (data[0].extendObjects.type == 'org') {
                    //浪潮甲方设置为只读
                    mstform.getItem('user_lcyf').setReadOnly(false);
                    $NG.updateUI((updater) => {
                        updater.fieldSetForm.PcmM11.user_lcyf.setProps({ required: true })
                    })
                } else {
                    mstform.getItem('user_lcyf').setReadOnly(true);
                    $NG.updateUI((updater) => {
                        updater.fieldSetForm.PcmM11.user_lcyf.setProps({ required: false })
                    })
                }
            }

        });

    }, 'PhidSupplyEnt');

    /*乙方单位为组织的时候浪潮甲方为必输切不只读end*/
    /*输入浪潮合同编码带出浪潮合同ID*/
    useValuesChange(({ args, form }) => {
        var user_insconcode = "'" + mstform.getItem('user_insconcode').getValue() + "'";
        $NG.execServer('user_insconcode', {
            'user_insconcode': user_insconcode
        }, function (res) {
            var data = JSON.parse(res);
            if (!data) {
                mstform.getItem('user_insconid').setValue('');
                mstform.getItem('user_insconname').setValue('');
            } else {
                mstform.getItem('user_insconid').setValue(data[0].extendObjects.htnm)
                mstform.getItem('user_insconname').setValue(data[0].extendObjects.htmc);
            }
        });
    }, 'user_insconcode');


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
                                $NG.alert('请联系财务共享中心，部门对照未做');
                                mstform.getItem('user_lcywdy').setValue(null);
                                return false;
                            }
                        } else {
                            $NG.alert('请联系财务共享中心，部门对照存在重复');
                            mstform.getItem('user_lcywdy').setValue(null);
                            return false;
                        }
                    } else {
                        $NG.alert('请联系财务共享中心，部门对照未做');
                        mstform.getItem('user_lcywdy').setValue(null);
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
                                    $NG.alert('请联系财务共享中心，部门对照未做');
                                    mstform.getItem('user_lchsbmzjm').setValue(null);
                                    return false;
                                }
                            } else {
                                $NG.alert('请联系财务共享中心，部门对照存在重复');
                                mstform.getItem('user_lchsbmzjm').setValue(null);
                                return false;
                            }
                        } else {
                            $NG.alert('请联系财务共享中心，部门对照未做');
                            mstform.getItem('user_lchsbmzjm').setValue(null);
                            return false;
                        }
                    });
                });


            }
        }, 200);
        /*管理组织选择后清空所属项目部end*/
    }, "PcmM11.PhidPc");

    /*管理组织选择后清空所属项目部start*/
    useValuesChange(({ args, form }) => {
        mstform.getItem('user_lcssxmb').setValue();
    }, "PcmM11.user_lcglzz");
    /*管理组织选择后清空所属项目部end*/

    useBeforeOpen((data) => {
        var zz = mstform.getItem('user_lcglzz').getValue();
        if (zz) {
            $NG.updateUI(function (updater, state) {
                updater.fieldSetForm.PcmM11.user_lcssxmb.setProps({
                    clientSqlFilter: ('parent_orgid = ' + zz),
                    placeholder: ``
                });
            });
        }
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
                        $NG.alert('请联系财务共享中心，部门对照未做');
                        mstform.getItem('user_lcywdy').setValue(null);
                        return false;
                    }
                } else {
                    $NG.alert('请联系财务共享中心，部门对照存在重复');
                    mstform.getItem('user_lcywdy').setValue(null);
                    return false;
                }

            } else {
                $NG.alert('请联系财务共享中心，部门对照未做');
                mstform.getItem('user_lcywdy').setValue(null);
                return false;
            }
            $NG.execServer('ssxmb_zjm', {
                'dept': user_lcssxmb
            }, function (res) {
                if (res.count > 0) {
                    var data = JSON.parse(res.data);
                    if (data.length == 1) {
                        if (data[0].extendObjects.user_mnemcodeinaccdepart == null) {
                            $NG.alert('请联系财务共享中心，部门对照未做');
                            mstform.getItem('user_lchsbmzjm').setValue(null);
                            return false;
                        } else {
                            mstform.getItem('user_lchsbmzjm').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
                        }
                    } else {
                        $NG.alert('请联系财务共享中心，部门对照存在重复');
                        mstform.getItem('user_lchsbmzjm').setValue(null);
                    }
                } else {
                    $NG.alert('请联系财务共享中心，部门对照未做');
                    mstform.getItem('user_lchsbmzjm').setValue(null);
                    return false;
                }
            });
        });
    }, "PcmM11.user_lcssxmb");
    /*项目所属部选择后带出浪潮业务单元end*/


    /*是否执行框架选择是出现后边内容start*/
    // mstform.getItem('user_gydq').setVisible(false);
    // mstform.getItem('user_gydqss').setVisible(false);

    // 是否执行框架选择是出现后边内容
    mstform.getItem('user_zxkj').setProps({
        hidden: true,
        required: false
    });

    useValuesChange(({ args }) => {
        const user_sfzxkj = args[0].user_sfzxkj.value;
        console.log("user_sfzxkj:", user_sfzxkj);
        console.log("mstform.getItem('user_zxkj'):", mstform.getItem('user_zxkj'));

        if (user_sfzxkj == 1) {
            mstform.getItem('user_zxkj').setProps({
                hidden: false,
                required: true
            });
            //缺少字段
            // mstform.getItem('user_gydq').setProps({
            //     hidden: false,
            //     required: true
            // });
            // mstform.getItem('user_gydqss').setProps({
            //     hidden: false,
            //     required: true
            // });
        } else {
            mstform.getItem('user_zxkj').setProps({
                hidden: true,
                required: false
            });
            // mstform.getItem('user_gydq').setProps({
            //     hidden: true,
            //     required: false
            // });
            // mstform.getItem('user_gydqss').setProps({
            //     hidden: true,
            //     required: false
            // });
        }
    }, "PcmM11.user_sfzxkj");
    /*是否执行框架选择是出现后边内容end*/
    // /*供应地区省份根据地区过滤开始*/
    // var hb = ['140000', '110000', '120000', '130000', '150000'];
    // var hz = ['420000', '430000', '410000']
    // var hd = ['360000', '370000', '310000', '320000', '330000', '340000']
    // var hn = ['440000', '450000', '460000', '350000']
    // var db = ['230000', '210000', '220000']
    // var xb = ['620000', '630000', '640000', '650000', '610000']
    // var xn = ['510000', '540000', '520000', '530000', '500000']
    // var sf = mstform.getItem('user_gydqss');
    // useValuesChange((value) => {
    // 	let filterValue = '';
    // 	if (value == '1') {
    // 		filterValue = "phid in (" + hb + ")";
    // 	} else if (value == '2') {
    // 		filterValue = "phid in (" + hz + ")";
    // 	} else if (value == '3') {
    // 		filterValue = "phid in (" + hd + ")";
    // 	} else if (value == '4') {
    // 		filterValue = "phid in (" + hn + ")";
    // 	} else if (value == '5') {
    // 		filterValue = "phid in (" + db + ")";
    // 	} else if (value == '6') {
    // 		filterValue = "phid in (" + xb + ")";
    // 	} else if (value == '7') {
    // 		filterValue = "phid in (" + xn + ")";
    // 	}

    // 	if (filterValue) {
    // 		$NG.updateUI(function (updater, state) {
    // 			updater.fieldSetForm.PcmM11.user_gydqss.setProps({
    // 				clientSqlFilter: filterValue,
    // 				placeholder: ``
    // 			});
    // 		});
    // 	}
    // }, 'user_gydq')
    /*供应地区省份根据地区过滤结束*/


    //保存前检测
    /*useBeforeClick(() => {
        return new Promise((resolve) => {
            var mstform = $NG.getCmpApi("PcmM11");
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

