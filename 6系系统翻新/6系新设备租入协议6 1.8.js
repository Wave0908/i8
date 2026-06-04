$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick, useBeforeClick }
) {
    // 获取容器
    var mstform = $NG.getCmpApi("PcmM10");
    console.log("mstform:", mstform);
    var toolbar = $NG.getCmpApi("CntMDetailToolBar");
    var dgrid = $NG.getCmpApi("PcmD10");
    console.log("dgrid:", dgrid);
    //设置
    console.log("mstform.getItem('user_lcyf'):", mstform.getItem('user_lcyf'));
    mstform.getItem('user_lcyf').setReadOnly(true);
    mstform.getItem('IsPayOverCntSum').setValue('0');
    if ($NG.getQueryValue('otype') == 'add') {
        mstform.getItem('user_cwxtsfcz').setValue('1');
    }
    if ($NG.getQueryValue('oType') == 'view') {
        console.log("dataready");
        var user_istbinspur = mstform.getItem('user_istbinspur').getValue();
        if (user_istbinspur != '4' && user_istbinspur != null && user_istbinspur != '') {
            toolbar.getItem('applyForReview').setReadOnly(true);
        } else {
            toolbar.getItem('applyForReview').setReadOnly(false);
        }
    } else {
        toolbar.getItem('applyForReview').setReadOnly(true);
    }
    /**页面是变更状态时，浪潮字段只读 */
    const { isChgCnt } = $NG.getQueryValue();
    if (isChgCnt == '1') {
        mstform.getItem('user_lcssxmb').setReadOnly(true);
        mstform.getItem('user_lcglzz').setReadOnly(true);
        mstform.getItem('user_lcywdy').setReadOnly(true);
        mstform.getItem('user_lchsbmzjm').setReadOnly(true);
    }

    mstform.getItem('PayOverPrecent').setValue('1.1');

    console.log("toolbar:", toolbar);
    //   mstform.setDefaulBtn({ addBtn:true, deleteBtn:true })
    // 菜单栏增加复制功能
    toolbar.insert({
        id: "kaobei",
        text: "复制",
        // contenteditable:true,
        // disabled:true
        width: this.itemWidth,
        iconCls: "icon-New"
        // icon: "icon-New",
        // position: 1
    }, 1);
    //设置只读只对已有的按钮有效，对新加的按钮无效，且getbuttons列表中能查看到所有按钮，但是获取不到新加的按钮
    // toolbar.setReadOnly("save", true);
    toolbar.setReadOnly("kaobei", false);
    useAction('onClick')(() => {
        //获取表体数据
        console.log("获取按钮数据dgrid.getRows():", dgrid.getRows());
        var a = dgrid.getRows();
        var user_sblx = a[0].user_sblx;
        var user_sblx_EXName = a[0].user_sblx_EXName;
        for (var i = 1; i < a.length; i++) {
            a[i]['user_sblx'] = user_sblx;
            a[i]['user_sblx_EXName'] = user_sblx_EXName;
        }
        dgrid.refreshView()
    }, 'kaobei');

    // 根据支付比例带出同步初始比例
    useValuesChange(({ args }) => {
        const Zfbl = args[0].Zfbl;
        mstform.getItem('user_tzhdfkbl').setValue(Zfbl);
    }, "PcmM10.Zfbl");

    // 预付款金额调整
    useValuesChange(({ args }) => {
        const yfkje = args[0].user_yfkje;
        const XYCntSumAmt = mstform.getItem("XYCntSumAmt").getValue();

        if (XYCntSumAmt !== '') {
            mstform.getItem('user_yfkbl').setValue(yfkje / XYCntSumAmt);
        } else {
            mstform.getItem('user_yfkbl').setValue('');
        }
    }, "PcmM10.user_yfkje");

    // 含税金额调整
    useValuesChange(({ args, form }) => {
        const XYCntSumAmt = args[0].XYCntSumAmt;

        const yfkje = mstform.getItem("user_yfkje").getValue();

        if (XYCntSumAmt !== '') {
            mstform.getItem('user_yfkbl').setValue(yfkje / XYCntSumAmt);
        } else {
            mstform.getItem('user_yfkbl').setValue('');
        }
    }, "PcmM10.XYCntSumAmt");

    // 浪潮返回标志为4申请取消审核可点击
    if (editPage.oType == editPage.OType.Add || editPage.oType == editPage.OType.Edit) {
        useValuesChange(({ args }) => {
            let bill_no = args[0].BillNo;
            if (bill_no) {
                bill_no = bill_no.replace(/\s*/g, "");
                mstform.getItem('BillNo').setValue(bill_no);

                $NG.execServer("htbhss", { bill_no: bill_no }, function (res) {
                    const data = typeof res.data == 'string' ? JSON.parse(res.data) : res.data;
                    const htbh = data[0].extendObjects.ht;
                    if (htbh == 1) {
                        $NG.alert("存在重复编码");
                        return false;
                    }
                });
            }
        }, "PcmM10.BillNo");
    }

    // 数据加载完成后处理申请取消审核按钮
    // useAction("onDataReady")(() => {
    //     console.log("mstform.getItem(user_istbinspur):" + mstform.getItem("user_istbinspur"));
    //     const user_istbinspur = mstform.getItem("user_istbinspur").getValue();
    //     const user_insconid = mstform.getItem("user_insconid").getValue();

    //     if (user_istbinspur == '4') {
    //         toolbar.setReadOnly("applyForReview", false);
    //     } else if (user_insconid && user_insconid.length > 0) {
    //         toolbar.setReadOnly("applyForReview", false);
    //     } else {
    //         toolbar.setReadOnly("applyForReview", true);
    //     }
    // });

    // 财务系统是否存在为是的时候必输，为否的时候不必输
    useValuesChange(({ args }) => {
        const user_cwxtsfcz = args[0].user_cwxtsfcz.value;
        console.log("user_cwxtsfcz:", user_cwxtsfcz);
        console.log("mstform.getItem('user_insconcode'):", mstform.getItem('user_insconcode'));

        if (user_cwxtsfcz == '1') {
            mstform.getItem('user_insconcode').setProps({ required: true });
            mstform.getItem('user_insconid').setProps({ required: true });
            mstform.getItem('user_insconname').setProps({ required: true });
        } else {
            mstform.getItem('user_insconcode').setProps({ required: false });
            mstform.getItem('user_insconid').setProps({ required: false });
            mstform.getItem('user_insconname').setProps({ required: false });
        }
    }, "PcmM10.user_cwxtsfcz");

    // 初始化时设置申请取消审核按钮状态
    console.log("mstform.getItem(user_insconid):", mstform.getItem("user_insconid"))
    const user_insconid = mstform.getItem("user_insconid").getValue();
    if (user_insconid && user_insconid.length > 0) {
        toolbar.setReadOnly("applyForReview", true);
    } else {
        toolbar.setReadOnly("applyForReview", false);
    }

    // 初始化时设置财务系统是否存在相关字段必输状态
    const user_cwxtsfcz = mstform.getItem("user_cwxtsfcz").getValue();
    if (user_cwxtsfcz == '2') {
        mstform.getItem('user_insconcode').setProps({ required: false });
        mstform.getItem('user_insconid').setProps({ required: false });
        mstform.getItem('user_insconname').setProps({ required: false });
    } else {
        mstform.getItem('user_insconcode').setProps({ required: true });
        mstform.getItem('user_insconid').setProps({ required: true });
        mstform.getItem('user_insconname').setProps({ required: true });
    }

    // 乙方单位为组织的时候浪潮甲方为必输且不只读
    useValuesChange(({ args }) => {
        const PhidSenComp = args[0].PhidSenComp.value;

        if (PhidSenComp) {
            $NG.execServer("contract_CorrUnit", { phid: PhidSenComp }, function (res) {
                if (res.status !== 'success') {
                    $NG.alert("sql有误");
                    return;
                }
                const data = typeof res.data == 'string' ? JSON.parse(res.data) : res.data;
                if (data.length == 1) {
                    if (data[0].extendObjects.type == 'org') {
                        // 浪潮甲方设置为不只读且必输
                        mstform.getItem('user_lcyf').setProps({
                            readOnly: false,
                            required: true
                        });
                    } else {
                        mstform.getItem('user_lcyf').setProps({
                            readOnly: true,
                            required: false
                        });
                    }
                }
            });
        }
    }, "PcmM10.PhidSenComp");

    // 输入浪潮合同编码带出浪潮合同ID
    useValuesChange(({ args }) => {
        const user_insconcode = args[0].user_insconcode;

        if (user_insconcode) {
            $NG.execServer("user_insconcode", { user_insconcode: "'" + user_insconcode + "'" }, function (res) {
                const data = typeof res.data == 'string' ? JSON.parse(res.data) : res.data;
                //const data = res.data;
                if (data.length == 0) {
                    mstform.getItem('user_insconid').setValue('');
                    mstform.getItem('user_insconname').setValue('');
                } else {
                    mstform.getItem('user_insconid').setValue(data[0].extendObjects.htnm);
                    mstform.getItem('user_insconname').setValue(data[0].extendObjects.htmc);
                }
            });
        }
    }, "PcmM10.user_insconcode");

    // 管理组织选择后清空所属项目部
    useValuesChange(({ args }) => {
        const PhidPc = args[0].PhidPc.value;

        if (PhidPc) {
            $NG.execServer("xmxxdcglzssmb", { phid: PhidPc }, function (res) {
                const data = typeof res.data == 'string' ? JSON.parse(res.data) : res.data;
                if (data.length != 0) {
                    const data = typeof res.data == 'string' ? JSON.parse(res.data) : res.data;
                    mstform.setValues({
                        user_lcglzz: {
                            value: data[0].extendObjects.user_lcglzz,
                            label: data[0].extendObjects.user_lcglzz_exname
                        },
                        user_lcssxmb: {
                            value: data[0].extendObjects.user_lcssxmb,
                            label: data[0].extendObjects.user_lcssxmb_exname
                        }
                    })

                } else {
                    $NG.alert("项目信息没有管理组织和所属项目部");
                    return false;
                }
            });
            setTimeout(() => {
                const user_lcssxmb = mstform.getItem("user_lcssxmb").getValue();
                if (user_lcssxmb) {
                    $NG.execServer("ssxmb_bmywdy", { dept: user_lcssxmb }, function (res) {
                        if (res.count > 0) {
                            const data = typeof res.data == 'string' ? JSON.parse(res.data) : res.data;
                            if (data.length == 1) {
                                if (data[0].extendObjects.user_lcywdy) {
                                    mstform.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
                                } else {
                                    $NG.alert("请联系财务共享中心，部门对照未做");
                                    mstform.getItem('user_lcywdy').setValue(null);
                                    return false;
                                }
                            } else {
                                $NG.alert("请联系财务共享中心，部门对照存在重复");
                                mstform.getItem('user_lcywdy').setValue(null);
                                return false;
                            }
                        } else {
                            $NG.alert("请联系财务共享中心，部门对照未做");
                            mstform.getItem('user_lcywdy').setValue(null);
                            return false;
                        }
                        $NG.execServer("ssxmb_zjm", { dept: user_lcssxmb }, function (res) {
                            if (res.count > 0) {
                                const data = typeof res.data == 'string' ? JSON.parse(res.data) : res.data;
                                if (data.length == 1) {
                                    if (data[0].extendObjects.user_mnemcodeinaccdepart) {
                                        mstform.getItem('user_lchsbmzjm').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
                                    } else {
                                        $NG.alert("请联系财务共享中心，部门对照未做");
                                        mstform.getItem('user_lchsbmzjm').setValue(null);
                                        return false;
                                    }
                                } else {
                                    $NG.alert("请联系财务共享中心，部门对照存在重复");
                                    mstform.getItem('user_lchsbmzjm').setValue(null);
                                    return false;
                                }
                            } else {
                                $NG.alert("请联系财务共享中心，部门对照未做");
                                mstform.getItem('user_lchsbmzjm').setValue(null);
                                return false;
                            }
                        });
                    });
                }
            }, 200);
        }
    }, "PcmM10.PhidPc");

    // 管理组织选择后清空所属项目部
    useValuesChange(({ args }) => {
        mstform.getItem('user_lcssxmb').setValue('');
    }, "PcmM10.user_lcglzz");
    if (mstform.getItem('user_lcssxmb')) {


        // 所属项目部帮助窗口打开前事件
        useAction("onBeforeTriggerClick")(({ args }) => {
            const zz = mstform.getItem("user_lcglzz").getValue();
            mstform.setConfig({
                user_lcssxmb: {
                    clientSqlFilter: { parent_orgid: zz }
                }
            });
        }, "PcmM10.user_lcssxmb");

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
                                mstform.getItem('user_lcywdy').setValue(null);
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
                        mstform.getItem('user_lcywdy').setValue(null);
                        return false;
                    }
                });
            });
        }, "PcmM10.user_lcssxmb");
        /*项目所属部选择后带出浪潮业务单元end*/
    }

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
    }, "PcmM10.user_sfzxkj");

    // 供应地区省份根据地区过滤
    const hb = ['140000', '110000', '120000', '130000', '150000'];
    const hz = ['420000', '430000', '410000'];
    const hd = ['360000', '370000', '310000', '320000', '330000', '340000'];
    const hn = ['440000', '450000', '460000', '350000'];
    const db = ['230000', '210000', '220000'];
    const xb = ['620000', '630000', '640000', '650000', '610000'];
    const xn = ['510000', '540000', '520000', '530000', '500000'];

    // useValuesChange(({ args }) => {
    //     const user_gydq = args[0].user_gydq;

    //     if (user_gydq == '1') {
    //         mstform.setConfig({
    //             user_gydqss: {
    //                 clientSqlFilter: { phid: hb }
    //             }
    //         });
    //     } else if (user_gydq == '2') {
    //         mstform.setConfig({
    //             user_gydqss: {
    //                 clientSqlFilter: { phid: hz }
    //             }
    //         });
    //     } else if (user_gydq == '3') {
    //         mstform.setConfig({
    //             user_gydqss: {
    //                 clientSqlFilter: { phid: hd }
    //             }
    //         });
    //     } else if (user_gydq == '4') {
    //         mstform.setConfig({
    //             user_gydqss: {
    //                 clientSqlFilter: { phid: hn }
    //             }
    //         });
    //     } else if (user_gydq == '5') {
    //         mstform.setConfig({
    //             user_gydqss: {
    //                 clientSqlFilter: { phid: db }
    //             }
    //         });
    //     } else if (user_gydq == '6') {
    //         mstform.setConfig({
    //             user_gydqss: {
    //                 clientSqlFilter: { phid: xb }
    //             }
    //         });
    //     } else if (user_gydq == '7') {
    //         mstform.setConfig({
    //             user_gydqss: {
    //                 clientSqlFilter: { phid: xn }
    //             }
    //         });
    //     }
    // }, "PcmM10.user_gydq");

    // 保存前检测
    /*useBeforeClick(() => {
        return new Promise((resolve) => {
            var mstform = $NG.getCmpApi("PcmM10");
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

            // 编辑模式下检查重复编码和项目信息
            if ($NG.getQueryValue('oType') == 'edit') {
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
    })*/

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

}, 'save');
