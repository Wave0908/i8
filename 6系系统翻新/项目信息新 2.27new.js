$NG.AllReady(function (page,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick, useBeforeClick, useBeforeOpen }
) {
    var form = $NG.getCmpApi('form');
    var mstform2 = $NG.getCmpApi('tabIds_tabSummary'); //项目概况
    var proId = $NG.getQueryValue('projprop');//区分是否为工程项目还是虚拟项目等的id
    console.log("proId:====", proId);
    // 虚拟项目 id 为1，工程项目id为4
    console.log("form:", form);
    console.log("项目概况:", mstform2);
    var Toolbar = $NG.getCmpApi('toolbarEdit');
    //schemeid 翻新  待验证
    var schemeid = $NG.getQueryValue('schemeid');

    console.log("schemeid===", schemeid);
    //因不清楚隐藏了哪些内容，暂时注释  翻新待商榷
    // Ext.ComponentQuery.query('tabpanel')[1].items.get(4).tab.hide();
    // Ext.ComponentQuery.query('tabpanel')[1].items.get(5).tab.hide();

    if ($NG.getQueryValue('oType') == 'view') {
        Toolbar.getItem('applyForReview').setReadOnly(true);
    }
    if (proId == '1') {
        form.getItem('PcNo').setReadOnly(false);
    } else if (proId == '4') {
        if (form.getItem('CatPhId').getValue() != '324191209000058') {
            form.getItem('PcNo').setReadOnly(true);
        }
    }

    if ($NG.getQueryValue('oType') == 'view' || $NG.getQueryValue('oType') == 'edit' || $NG.getQueryValue('oType') == 'add') {

        if (proId == '4') {
            useValuesChange(({
                args
            }) => {
                var FactStartDt = form.getItem('FactStartDt').getValue();//合同竣工日期
                var LimitTime = form.getItem('LimitTime').getValue();
                var newdate = new Date(FactStartDt.setDate(FactStartDt.getDate() + LimitTime));
                form.getItem('user_jhjgrq').setValue(newdate);

            }, "form.FactStartDt");

            useValuesChange(({
                args
            }) => {
                var user_sfsczy = form.getItem('user_sfsczy').getValue();
                if (user_sfsczy == '1') {
                    form.getItem('user_sbzysj').setProps({
                        required: true, //required是否必输
                    });
                } else {
                    form.getItem('user_sbzysj').setProps({
                        required: false, //required是否必输
                    });
                }
            }, "form.user_sfsczy");


            //所在经济功能区根据省份过滤开始 
            useBeforeClick(({
                args
            }) => {
                var ProvinceId = mstform2.getItem('ProvinceId').getValue()
                mstform2.getItem('user_szjjfzgnq').setClientSqlFilter(" zj in (select zj from szjjfzgnq where csbm in (select csbm from szjjfzgnq where csbm ='" + ProvinceId + "' ) or zj='20250318021')");
            }, "form.user_szjjfzgnq");
            //所在经济功能区根据省份过滤结束 

            useValuesChange(({
                args
            }) => {
                var user_sflsxm = form.getItem('user_sflsxm').getValue();
                console.log("user_sflsxm:", user_sflsxm)
                if (user_sflsxm == '1') {
                    form.getItem('user_istbinspur').setValue('4');
                    form.getItem('user_tblchs').setValue('4');
                    form.getItem('user_lcywdy').setProps({
                        required: false, //required是否必输
                    });
                    form.getItem('user_mnemCodeInAccDepart').setProps({
                        required: false, //required是否必输
                    });
                } else {
                    form.getItem('user_istbinspur').setValue('');
                    form.getItem('user_tblchs').setValue('')
                    form.getItem('user_lcywdy').setProps({
                        required: true, //required是否必输
                    });
                    form.getItem('user_mnemCodeInAccDepart').setProps({
                        required: true, //required是否必输
                    });
                }
            }, "form.user_sflsxm");
            //Ext.number翻新 待验证
            useValuesChange(({
                args
            }) => {
                var EndDate = form.getItem('EndDate').getValue();
                var user_yztzrq = form.getItem('user_yztzrq').getValue();
                var newdate = new Date(EndDate.setDate(EndDate.getDate() + user_yztzrq));

                form.getItem('user_tzhjgrq').setValue(newdate);
                form.getItem('user_tzhzgq').setValue(Number(form.getItem('LimitTime').getValue(),
                    0) + Number(form.getItem('user_yztzrq').getValue(), 0));
            }, "form.user_yztzrq");

            useValuesChange(({
                args
            }) => {
                var EndDate = form.getItem('EndDate').getValue();
                var user_yztzrq = form.getItem('user_yztzrq').getValue();
                var newdate = new Date(EndDate.setDate(EndDate.getDate() + user_yztzrq));
                form.getItem('user_tzhjgrq').setValue(newdate);
            }, "form.EndDate");

            //ext number翻新待验证
            useValuesChange(({//调整天数
                args
            }) => {
                form.getItem('user_tzhzgq').setValue(Number(form.getItem('LimitTime').getValue(),
                    0) + Number(form.getItem('user_yztzrq').getValue(), 0));
            }, "form.LimitTime");

            var gclx1 = form.getItem('user_gclx1').getValue();
            if (gclx1 == '974191216000021' || gclx1 == '974191216000022' || gclx1 == '974191216000023' || gclx1 ==
                '974191216000024' ||
                gclx1 == '974191216000025' || gclx1 == '974191216000030' || gclx1 == '224220303000006' || gclx1 ==
                '974191216000029' ||
                gclx1 == '974191216000031' || gclx1 == '974191216000032'
            ) {
                form.getItem('user_gclx2').setProps({
                    required: false, //required是否必输
                });

            } else {
                form.getItem('user_gclx2').setProps({
                    required: true, //required是否必输
                });
            }

        }
    }


    if ($NG.getQueryValue('oType') == 'edit') {
        var countryid = mstform2.getItem('CountryId').getValue();
        if (countryid == '1') {
            mstform2.getItem('ProvinceId').setProps({
                required: true, //required是否必输
            });
            mstform2.getItem('CityId').setProps({
                required: true, //required是否必输
            });
            mstform2.getItem('RegionId').setProps({
                required: true, //required是否必输
            });
            mstform2.getItem('user_szjjfzgnq').setProps({
                required: true, //required是否必输
            });

        } else {
            mstform2.getItem('ProvinceId').setProps({
                required: false, //required是否必输
            });
            mstform2.getItem('CityId').setProps({
                required: false, //required是否必输
            });
            mstform2.getItem('RegionId').setProps({
                required: false, //required是否必输
            });
            mstform2.getItem('user_szjjfzgnq').setProps({
                required: false, //required是否必输
            });
        }
    }

    /*国外省市县不必输，国内必输*/
    useValuesChange(({//调整天数
        args
    }) => {
        var countryid = mstform2.getItem('CountryId').getValue();
        if (countryid == '1') {
            mstform2.getItem('ProvinceId').setProps({
                required: true, //required是否必输
            });
            mstform2.getItem('CityId').setProps({
                required: true, //required是否必输
            });
            mstform2.getItem('RegionId').setProps({
                required: true, //required是否必输
            });
            mstform2.getItem('user_szjjfzgnq').setProps({
                required: true, //required是否必输
            });
        } else {
            mstform2.getItem('ProvinceId').setProps({
                required: false, //required是否必输
            });
            mstform2.getItem('CityId').setProps({
                required: false, //required是否必输
            });
            mstform2.getItem('RegionId').setProps({
                required: false, //required是否必输
            });
            mstform2.getItem('user_szjjfzgnq').setProps({
                required: false, //required是否必输
            });
        }
    }, 'form.CountryId');

    /*新增修改的时候触发start*/
    if ($NG.getQueryValue('oType') == 'add' || $NG.getQueryValue('oType') == 'edit' || $NG.getQueryValue('oType') == 'view') {

        if (proId == '4') {
            if (schemeid == '221019013502') {
                form.getItem('PcNo').setReadOnly(false);
                form.getItem('user_ifnbfb').setReadOnly(true);
                form.getItem('user_ifnbfb').setValue('01');
            } else {
                form.getItem('user_ifnbfb').setReadOnly(true);
                form.getItem('user_ifnbfb').setValue('02');
            }
            if (schemeid == '577191213000004') {
                form.getItem('PcNo').setReadOnly(false);
                form.getItem('user_ifnbfb').setReadOnly(false);
            }

            form.getItem('user_tsxmmc').setValue('1');

            useBeforeClick(({
                args
            }) => {
                var gclx1 = form.getItem('user_gclx1').getValue();
                form.getItem('PhIdType').setValue(gclx1);
                if (gclx1 == '974191216000021' || gclx1 == '974191216000022' || gclx1 == '974191216000023' ||
                    gclx1 == '974191216000024' ||
                    gclx1 == '974191216000025' || gclx1 == '974191216000030' || gclx1 == '224220303000006' ||
                    gclx1 == '974191216000029' ||
                    gclx1 == '974191216000031' || gclx1 == '974191216000032'
                ) {
                    form.getItem('user_gclx2').setProps({
                        required: false, //required是否必输
                    });

                } else {
                    form.getItem('user_gclx2').setProps({
                        required: true, //required是否必输
                    });
                }
            }, "form.user_gclx1");

            useValuesChange(({
                args
            }) => {
                form.getItem('user_gclx1').setClientSqlFilter('grade = 1 and enable_status=1 ');
            }, "form.user_gclx1");

            useValuesChange(({
                args
            }) => {
                var user_gclx1 = form.getItem('user_gclx1').getValue();
                form.getItem('user_gclx2').setClientSqlFilter('grade = 2 and pphid =' + user_gclx1 +
                    ' and enable_status=1');
            }, "form.user_gclx2");

            var cat_phid = form.getItem("CatPhId").getValue();
            if (cat_phid == '324191209000058') {
                form.getItem('user_istbinspur').setValue("1");
                form.getItem('user_tblchs').setValue("1");
                form.getItem('user_lcywdy').setProps({
                    required: false, //required是否必输
                });
                form.getItem('user_mnemCodeInAccDepart').setProps({
                    required: false, //required是否必输
                });
            } else {
                form.getItem('user_istbinspur').setValue(null);
                form.getItem('user_tblchs').setValue(null);
                form.getItem('user_lcywdy').setProps({
                    required: true, //required是否必输
                });
                form.getItem('user_mnemCodeInAccDepart').setProps({
                    required: true, //required是否必输
                });
            }

            useValuesChange(({
                args
            }) => {
                var cat_phid = form.getItem("CatPhId").getValue();
                if (cat_phid == '324191209000058') {
                    form.getItem('user_istbinspur').setValue('1');
                    form.getItem('user_tblchs').setValue('1');
                    form.getItem('user_lcywdy').setProps({
                        required: false, //required是否必输
                    });
                    form.getItem('user_mnemCodeInAccDepart').setProps({
                        required: false, //required是否必输
                    });
                } else {
                    form.getItem('user_istbinspur').setValue(null);
                    form.getItem('user_tblchs').setValue();
                    form.getItem('user_lcywdy').setProps({
                        required: true, //required是否必输
                    });
                    form.getItem('user_mnemCodeInAccDepart').setProps({
                        required: true, //required是否必输
                    });
                }
            }, 'form.CatPhId');
        }

    }
    /*新增修改的时候触发end*/

    /*自动生成项目立项状态编码start*/
    // if (otype == $Otype.ADD) {
    //     Toolbar.items.get('save').on('click', function () { //点击按钮检测事件
    //         var temp = 1;
    //         if (mstform) {
    //             console.log('mstform', mstform);
    //             for (var i = 0; i < mstform.fieldSets[0].allfields.length; i++) {
    //                 if (mstform.fieldSets[0].allfields[i].mustInput) { //获取必输项字段
    //                     if (Ext.isEmpty(mstform.getItem(mstform.fieldSets[0].allfields[i].name).getValue())) {
    //                         temp = 0;
    //                         return;
    //                     }
    //                 };
    //             }
    //         }
    //         if (temp == 0) {
    //             return false;
    //         }
    //         execServer('hsxmnm', {}, function (res) {
    //             if (res.status != 'success') {
    //                 Ext.Msg.alert('提示', '服务端取数失败');
    //                 return;
    //             } else if (res.count == 0) { //判断数组行数
    //                 Ext.Msg.alert('提示', '项目立项状态编码失败');
    //                 return;
    //             }
    //             if (res.count > 0) {
    //                 var data = JSON.parse(res.data)
    //                 var num = parseInt(data[0].extendObjects.hsxmnm) + 1
    //             }
    //             //判断是工程建设 还是虚拟项目
    //             if (mstform) {
    //                 mstform.getItem('user_hsxmnm').setValue(num.toString());
    //             } else if (mstform1) {
    //                 mstform1.getItem('user_hsxmnm').setValue(num.toString());
    //             }
    //             return;
    //         });
    //         execServer('user_gs_fjm', {}, function (res) {
    //             if (res.status != 'success') {
    //                 Ext.Msg.alert('提示', '服务端取数失败');
    //                 return;
    //             } else if (res.count == 0) { //判断数组行数
    //                 Ext.Msg.alert('提示', '项目立项状态编码失败');
    //                 return;
    //             }
    //             if (res.count > 0) {
    //                 var data = JSON.parse(res.data)
    //                 var num = parseInt(data[0].extendObjects.user_gs_fjm) + 1
    //             }

    //             //判断是工程建设 还是虚拟项目
    //             if (mstform) {
    //                 mstform.getItem('user_gs_fjm').setValue(num.toString());
    //             } else if (mstform1) {
    //                 mstform1.getItem('user_gs_fjm').setValue(num.toString());
    //             }
    //             return;
    //         });
    //     });
    // }
    /*自动生成项目立项状态编码end*/

    /*项目类型为研发项目的时候 隐藏一些字段start*/
    if ($NG.getQueryValue('oType') == 'view' || $NG.getQueryValue('oType') == 'edit') {
        if (proId == '1' || proId == '4') {
            PhIdType(form);
        }
        //研发项目一些字段隐藏
        function PhIdType(form) {
            var PhIdType = form.getItem("PhIdType").getValue();
            if (PhIdType == '224200929000001') {
                //风险级别设置为隐藏
                form.setHidden("RiskFlag", false)
                //是否内部分包设置为隐藏
                form.setHidden("user_ifnbfb", false)
                //默认财务组织设置为隐藏
                form.setHidden("PhIdFiOcode", false)
                //涉及财务组织设置为隐藏
                form.setHidden("ProjectOrg", false)
                //建设单位设置为隐藏
                form.setHidden("PhIdCompany", false)
                //施工单位设置为隐藏
                form.setHidden("PhIdSgOrg", false)
                //浪潮同步标志设置为隐藏
                form.setHidden("user_tblchs", false)
                //浪潮同步时间设置为隐藏
                form.setHidden("user_tblchstime", false)
                //项目管控模式设置为隐藏
                form.setHidden("user_xmgkms", false)
                //经营模式设置为隐藏
                form.setHidden("ManageMode", false)
                //按项目建组织按钮设置为隐藏
                form.setHidden("OrgByProject", false)
                //建筑用途设置为隐藏
                form.setHidden("PhidBuildType", false)
                //业务类型设置为隐藏
                form.setHidden("user_ywlx", false)
                //承揽方式设置为隐藏
                form.setHidden("user_clfs", false)
                //项目性质设置为隐藏
                form.setHidden("user_xmxz", false)
                //房产项目状态设置为隐藏
                form.setHidden("user_fc_xmzt", false)
                //备案项目经理设置为隐藏
                form.setHidden("RecordManager", false)
                //浪潮推送标志设置为隐藏
                form.setHidden("user_gs_tsbs", false)
                //业主传真设置为隐藏
                form.setHidden("JobTax", false)
                //业主代表电话设置为隐藏
                form.setHidden("JobPhone", false)
                form.getItem('JobPhone').setMustInput(false);
                //建筑规模设置为隐藏
                form.setHidden("BuildingArea", false)
                //单位设置为隐藏
                form.setHidden("Msunit", false)
                //所属父级项目设置为隐藏
                form.setHidden("ProjectParentId", false)
                //合同编号设置为隐藏
                form.setHidden("CntNo", false)
                //合同类型设置为隐藏
                form.setHidden("ContractType", false)
                //合同签订日期设置为隐藏
                form.setHidden("ContractorDate", false)
                //币种设置为隐藏
                form.setHidden("CurrType", false)
                //汇率设置为隐藏
                form.setHidden("ExchRate", false)
                //合同金额设置为隐藏
                form.setHidden("CntAmtFc", false)
                //本币合同金额设置为隐藏
                form.setHidden("CntAmt", false)
                //工程合同备案号设置为隐藏
                form.setHidden("ConRecorde", false)
                //劳动用工备案号设置为隐藏
                form.setHidden("WorkRecorde", false)
                //资源需求清单录入截止时间设置为隐藏
                form.setHidden("Deadline", false)
                //施工内容设置为隐藏
                //mstform2.getItem('user_sgnr').setVisible(false);
                //经度设置为隐藏
                form.setHidden("Longitude", false)
                //维度标志设置为隐藏
                form.setHidden("Latitude", false)
                //管理片区设置为隐藏
                //mstform2.getItem('ManageArea').setVisible(false);

            }

        }

    }
    /*项目类型为研发项目的时候 隐藏一些字段end*/

    if (proId == '4') {
        /*管理组织选择后清空所属项目部start*/
        useValuesChange(({
            args
        }) => {
            form.getItem('user_pc_dept').setValue();
        }, 'form.CatPhId');
        /*管理组织选择后清空所属项目部end*/

        /*项目所属部选择后带出浪潮业务单元start*/
        useValuesChange(({
            args
        }) => {
            var user_pc_dept = form.getItem('user_pc_dept').getValue();
            console.log('user_pc_dept==============>', user_pc_dept)
            $NG.execServer('ssxmb_bmywdy', {
                'dept': user_pc_dept
            }, function (res) {
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    if (data.length == 1) {
                        form.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
                        if (data[0].extendObjects.user_lcywdy == null) {
                            $NG.alert("请联系管理员处理，部门对照未做");
                        }
                    } else {
                        $NG.alert("请联系管理员处理，部门对照存在重复");
                        form.getItem('user_lcywdy').setValue(null);
                    }
                } else {
                    $NG.alert("请联系管理员处理，部门对照未做");
                    form.getItem('user_lcywdy').setValue(null);
                }
            });

            $NG.execServer('ssxmb_zjm', {
                'dept': user_pc_dept
            }, function (res) {
                if (res.count > 0) {
                    var data = JSON.parse(res.data)
                    if (data.length == 1) {
                        form.getItem('user_mnemCodeInAccDepart').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
                        if (data[0].extendObjects.user_mnemcodeinaccdepart == null) {
                            $NG.alert("请联系管理员处理，部门对照未做");
                        }
                    } else {
                        $NG.alert("请联系管理员处理，部门对照存在重复");
                        form.getItem('user_mnemCodeInAccDepart').setValue(null);
                    }
                } else {
                    $NG.alert("请联系管理员处理，部门对照存在重复");
                    form.getItem('user_mnemCodeInAccDepart').setValue(null);
                }
            });
        }, 'form.user_pc_dept');

        /*项目所属部选择后带出浪潮业务单元end*/

        //项目核算内码设置为只读
        form.getItem('user_hsxmnm').setReadOnly(true);
        if ($NG.getQueryValue('oType') == 'add') {
            //通用帮助翻新待验证
            form.setValues({
                Stat: {
                    value: "zb",
                    label: "项目准备阶段"
                }
            })
            /*所属项目部过滤start*/
            useBeforeClick(async function ({ args }) {
                var zz = form.getItem('CatPhId').getValue();
                $NG.updateUI(function (updater, state) {
                    updater.fieldSetForm.form.user_pc_dept.setProps({
                        clientSqlFilter: ('parent_orgid = ' + zz),
                        placeholder: ``
                    });
                });
            }, "form.user_pc_dept");
            /*所属项目部过滤end*/

            /*所属项目部过滤start*/
            useBeforeClick(async function ({ args }) {
                var zz = form.getItem('PhIdFiOcode').getValue();
                $NG.updateUI(function (updater, state) {
                    updater.fieldSetForm.form.user_cwglbm.setProps({
                        clientSqlFilter: ('parent_orgid = ' + zz),
                        placeholder: ``
                    });
                });
            }, "form.user_cwglbm");
            /*所属项目部过滤end*/

            // mstform.getItem('user_gs_hsbm').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
            // 	mstform.getItem('user_gs_hsbm').setClientSqlFilter(
            // 		'p_form0000000224_d.dwbh =(' + lcbm + ')');
            // });
        }
        //帮助翻新待商榷，目前看来下面这两个语句无效果
        // mstform.on('dataready', function () {
        //     BatchBindCombox([mstform.getItem('user_cwbk')]);
        //     BatchBindCombox([mstform.getItem('user_pc_dept')]);
        // });


    }
    if (proId == '1') {
        //新增选择虚拟项目后，所属项目部不是必填项，但接口会筛选，调整为必填项   2025.11.20 界面设计已调整为必填
        //mstform1.getItem('user_pc_dept').userSetMustInput(true);
        if ($NG.getQueryValue('oType') == 'add') {
            //帮助翻新待验证
            form.setValues({
                Stat: {
                    value: "zb",
                    label: "项目准备阶段"
                }
            })

        }
        useValuesChange(({
            args
        }) => {
            var countryid = mstform2.getItem('CountryId').getValue();
            if (countryid == '1') {
                mstform2.getItem('ProvinceId').setProps({
                    required: true, //required是否必输
                });
                mstform2.getItem('CityId').setProps({
                    required: true, //required是否必输
                });
                mstform2.getItem('RegionId').setProps({
                    required: true, //required是否必输
                });
                mstform2.getItem('user_szjjfzgnq').setProps({
                    required: true, //required是否必输
                });

            } else {
                mstform2.getItem('ProvinceId').setProps({
                    required: false, //required是否必输
                });
                mstform2.getItem('CityId').setProps({
                    required: false, //required是否必输
                });
                mstform2.getItem('RegionId').setProps({
                    required: false, //required是否必输
                });
                mstform2.getItem('user_szjjfzgnq').setProps({
                    required: false, //required是否必输
                });
            }
        }, 'form.CountryId');
        if (schemeid == '221019013502') {
            form.getItem('PcNo').setReadOnly(false);
            form.getItem('user_ifnbfb').setReadOnly(true);
            form.getItem('user_ifnbfb').setValue('01');

        } else {
            form.getItem('user_ifnbfb').setReadOnly(true);
            form.getItem('user_ifnbfb').setValue('02');
        }
        if (schemeid == '577191213000004') {
            form.getItem('PcNo').setReadOnly(false);
            form.getItem('user_ifnbfb').setReadOnly(true);
        }

        /*项目类型为研发项目的时候 隐藏一些字段start*/
        if ($NG.getQueryValue('oType') == 'view') {
            var PhIdType = form.getItem("PhIdType").getValue();
            if (PhIdType == '224200929000001') {
                //风险级别设置为隐藏
                form.setHidden("RiskFlag", false)
                //是否内部分包设置为隐藏
                form.setHidden("user_ifnbfb", false)
                //默认财务组织设置为隐藏
                form.setHidden("PhIdFiOcode", false)
                //涉及财务组织设置为隐藏
                form.setHidden("ProjectOrg", false)
                //建设单位设置为隐藏
                form.setHidden("PhIdCompany", false)
                //施工单位设置为隐藏
                form.setHidden("PhIdSgOrg", false)
                //浪潮同步标志设置为隐藏
                form.setHidden("user_istbinspur", false)
                //浪潮同步时间设置为隐藏
                form.setHidden("user_tbinspurtime", false)
                //项目管控模式设置为隐藏
                form.setHidden("user_xmgkms", false)
                //经营模式设置为隐藏
                form.setHidden("ManageMode", false)
                //按项目建组织按钮设置为隐藏
                form.setHidden("OrgByProject", false)
                //建筑用途设置为隐藏
                form.setHidden("PhidBuildType", false)
                //业务类型设置为隐藏
                form.setHidden("user_ywlx", false)
                //承揽方式设置为隐藏
                form.setHidden("user_clfs", false)
                //项目性质设置为隐藏
                form.setHidden("user_xmxz", false)
                //房产项目状态设置为隐藏
                form.setHidden("user_fc_xmzt", false)
                //备案项目经理设置为隐藏
                form.setHidden("RecordManager", false)
                //浪潮推送标志设置为隐藏
                form.setHidden("user_gs_tsbs", false)
                //业主传真设置为隐藏
                mstform2.setHidden("JobTax", false)
                //业主代表电话设置为隐藏
                mstform2.setHidden("JobPhone", false)
                //建筑规模设置为隐藏
                mstform2.setHidden("BuildingArea", false)
                //单位设置为隐藏
                mstform2.setHidden("Msunit", false)
                //所属父级项目设置为隐藏
                mstform2.setHidden("ProjectParentId", false)
                //合同编号设置为隐藏
                mstform2.setHidden("CntNo", false)
                //合同类型设置为隐藏
                mstform2.setHidden("ContractType", false)
                //合同签订日期设置为隐藏
                mstform2.setHidden("ContractorDate", false)
                //币种设置为隐藏
                mstform2.setHidden("CurrType", false)
                //汇率设置为隐藏
                mstform2.setHidden("ExchRate", false)
                //合同金额设置为隐藏
                mstform2.setHidden("CntAmtFc", false)
                //本币合同金额设置为隐藏
                mstform2.setHidden("CntAmt", false)
                //工程合同备案号设置为隐藏
                mstform2.setHidden("ConRecorde", false)
                //劳动用工备案号设置为隐藏
                mstform2.setHidden("WorkRecorde", false)
                //资源需求清单录入截止时间设置为隐藏
                mstform2.setHidden("Deadline", false)
                //施工内容设置为隐藏
                //mstform2.getItem('user_sgnr').setVisible(false);
                //经度设置为隐藏
                mstform2.setHidden("Longitude", false)
                //维度标志设置为隐藏
                mstform2.setHidden("Latitude", false)
                //管理片区设置为隐藏
                //mstform2.getItem('ManageArea').setVisible(false);

            }

        }
        /*项目类型为研发项目的时候 隐藏一些字段end*/
        useValuesChange(({
            args
        }) => {
            var user_sflsxm = form.getItem('user_sflsxm').getValue();
            if (user_sflsxm == '1') {
                form.getItem('user_istbinspur').setValue('4');
                form.getItem('user_tblchs').setValue('4');
                form.getItem('user_lcywdy').userSetMustInput(false);
                form.getItem('user_mnemCodeInAccDepart').userSetMustInput(false);

            } else {
                form.getItem('user_istbinspur').setValue('');
                form.getItem('user_tblchs').setValue('')
                form.getItem('user_lcywdy').userSetMustInput(true);
                form.getItem('user_mnemCodeInAccDepart').userSetMustInput(true);
            }
        }, 'form.user_sflsxm');

        //核算项目内码设置为只读
        form.getItem('user_hsxmnm').setReadOnly(true);
        /*所属项目部过滤start*/
        useBeforeClick(({
            args
        }) => {
            var zz = form.getItem('CatPhId').getValue();
            form.getItem('user_pc_dept').setOutFilter({
                parent_orgid: zz
            }) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
        }, "form.user_pc_dept");
        /*所属项目部过滤end*/

        /*管理组织选择后清空所属项目部start*/
        form.getItem('CatPhId').addListener('helpselected', function () {
            form.getItem('user_pc_dept').setValue();
        });

        useValuesChange(({
            args
        }) => {
            form.getItem('user_pc_dept').setValue();
        }, 'form.CatPhId');
        /*管理组织选择后清空所属项目部end*/
        /*项目所属部选择后带出浪潮业务单元start*/

        useValuesChange(({
            args
        }) => {
            var user_pc_dept = form.getItem('user_pc_dept').getValue();

            $NG.execServer('ssxmb_bmywdy', {
                'dept': user_pc_dept
            }, function (res) {

                if (res.count > 0) {
                    var data = JSON.parse(res.data)
                    if (data.length == 1) {
                        form.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
                        if (data[0].extendObjects.user_lcywdy == null) {
                            $NG.alert('提示', '请联系管理员处理，部门对照未做');
                        }
                    } else {
                        $NG.alert('提示', '请联系管理员处理，部门对照存在重复');
                        form.getItem('user_lcywdy').setValue(null);
                    }
                } else {
                    $NG.alert('提示', '请联系管理员处理，部门对照未做');
                    form.getItem('user_lcywdy').setValue(null);
                }
            });

            $NG.execServer('ssxmb_zjm', {
                'dept': user_pc_dept
            }, function (res) {
                if (res.count > 0) {
                    var data = JSON.parse(res.data);
                    console.log("ssxmb_zjm data:", data);
                    if (data.length == 1) {
                        form.getItem('user_mnemCodeInAccDepart').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
                        if (data[0].extendObjects.user_mnemcodeinaccdepart == null) {
                            $NG.alert('提示', '请联系管理员处理，部门对照未做');
                        }
                    } else {
                        $NG.alert('提示', '请联系管理员处理，部门对照存在重复');
                        form.getItem('user_mnemCodeInAccDepart').setValue(null);
                    }
                } else {
                    $NG.alert('提示', '请联系管理员处理，部门对照未做');
                    form.getItem('user_mnemCodeInAccDepart').setValue(null);
                }
            });
        }, 'form.user_pc_dept');

        /*项目所属部选择后带出浪潮业务单元end*/

        /*根据项目类型为研发项目隐藏必输只读一些字段start*/

        //项目类型选择后触发
        useValuesChange(({
            args
        }) => {
            var PhIdType = form.getItem("PhIdType").getValue();
            console.log('PhIdType====================>', PhIdType)
            if (PhIdType == '224200929000001') {
                //项目类型变为只读
                form.getItem('PhIdType').setReadOnly(true);
                //项目简称设置为必输
                form.getItem('Ab').setProps({
                    required: true, //required是否必输
                });
                //风险级别设置为隐藏
                form.setHidden("RiskFlag", false)
                //是否内部分包设置为隐藏
                form.setHidden("user_ifnbfb", false)
                //是否内部分包设置为非必输
                form.getItem('user_ifnbfb').setProps({
                    required: false, //required是否必输
                });
                //默认财务组织设置为隐藏
                form.setHidden("PhIdFiOcode", false)
                //涉及财务组织设置为隐藏
                form.setHidden("ProjectOrg", false)
                //建设单位设置为隐藏
                form.setHidden("PhIdCompany", false)
                //建设单位设置为非必输
                form.getItem('PhIdCompany').setProps({
                    required: false, //required是否必输
                });
                //施工单位设置为隐藏
                form.setHidden("PhIdSgOrg", false)
                //施工单位设置为非必输
                form.getItem('PhIdSgOrg').setProps({
                    required: false, //required是否必输
                });
                //浪潮同步标志设置为隐藏
                form.setHidden("user_istbinspur", false)
                //浪潮同步时间设置为隐藏
                form.setHidden("user_tbinspurtime", false)
                //项目金额设置为必输
                form.getItem('ApproxContractFc').setProps({
                    required: true, //required是否必输
                });

                //项目管控模式设置为隐藏
                form.setHidden("user_xmgkms", false)
                //项目管控模式设置为非必输
                form.getItem('user_xmgkms').setProps({
                    required: false, //required是否必输
                });
                //经营模式设置为隐藏
                form.setHidden("ManageMode", false)
                //按项目建组织按钮设置为隐藏
                form.setHidden("OrgByProject", false)
                //建筑用途设置为隐藏
                form.setHidden("PhidBuildType", false)
                //业务类型设置为隐藏
                form.setHidden("user_ywlx", false)
                //承揽方式设置为隐藏
                form.setHidden("user_clfs", false)
                //承揽方式设置为非必输
                form.getItem('user_clfs').setProps({
                    required: false, //required是否必输
                });
                //项目性质设置为隐藏
                form.setHidden("user_xmxz", false)
                //项目性质设置为非必输
                form.getItem('user_xmxz').setProps({
                    required: false, //required是否必输
                });
                //房产项目状态设置为隐藏
                form.setHidden("user_fc_xmzt", false)
                //备案项目经理设置为隐藏
                form.setHidden("RecordManager", false)
                //浪潮推送标志设置为隐藏
                form.setHidden("user_gs_tsbs", false)
                //项目经理改成必输
                form.getItem('ProjectManager').setProps({
                    required: true, //required是否必输
                });
                //项目金额改名为预计投入金额
                //mstform1.getItem('ApproxContractFc').setFieldLabel('预计投入金额');
                // //项目经理改成负责人
                // mstform1.getItem('ProjectManager').setFieldLabel('负责人');
                // //管理组织改为实施单位
                // mstform1.getItem('CatPhId').setFieldLabel('实施单位');
                // //计划开工日期改为计划开始时间
                // mstform1.getItem('StartDate').setFieldLabel('计划开始时间');
                // //计划竣工日期改为计划完成时间
                // mstform1.getItem('EndDate').setFieldLabel('计划完成时间');

                //setFieldLabel 翻新待验证
                $NG.updateUI((updater) => {
                    // 获取 form 表单引用
                    const formVirtProj = updater.fieldSetForm.form;

                    //项目金额改名为预计投入金额
                    formVirtProj.ApproxContractFc.setProps({
                        label: '预计投入金额'
                    });

                    //项目经理改成负责人
                    formVirtProj.ProjectManager.setProps({
                        label: '负责人'
                    });

                    //管理组织改为实施单位
                    formVirtProj.CatPhId.setProps({
                        label: '实施单位'
                    });

                    //计划开工日期改为计划开始时间
                    formVirtProj.StartDate.setProps({
                        label: '计划开始时间'
                    });

                    //计划竣工日期改为计划完成时间
                    formVirtProj.EndDate.setProps({
                        label: '计划完成时间'
                    });
                });

                //业主传真设置为隐藏
                mstform2.setHidden("JobTax", false)
                //业主代表电话设置为隐藏
                mstform2.setHidden("JobPhone", false)
                //建筑规模设置为隐藏
                mstform2.setHidden("BuildingArea", false)
                //单位设置为隐藏
                mstform2.setHidden("Msunit", false)
                //所属父级项目设置为隐藏
                mstform2.setHidden("ProjectParentId", false)
                //合同编号设置为隐藏
                mstform2.setHidden("CntNo", false)
                //合同编号设置为非必输
                mstform2.getItem('CntNo').setProps({
                    required: false, //required是否必输
                });
                //合同类型设置为隐藏
                mstform2.setHidden("ContractType", false)
                //合同签订日期设置为隐藏
                mstform2.setHidden("ContractorDate", false)
                //币种设置为隐藏
                mstform2.setHidden("CurrType", false)
                //币种设置为非必输
                mstform2.getItem('CurrType').setProps({
                    required: false, //required是否必输
                });
                //汇率设置为隐藏
                mstform2.setHidden("ExchRate", false)
                //合同金额设置为隐藏
                mstform2.setHidden("CntAmtFc", false)
                //合同金额设置为非必输
                mstform2.getItem('CntAmtFc').setProps({
                    required: false, //required是否必输
                });
                //本币合同金额设置为隐藏
                mstform2.setHidden("CntAmt", false)
                //工程合同备案号设置为隐藏
                mstform2.setHidden("ConRecorde", false)
                //劳动用工备案号设置为隐藏
                mstform2.setHidden("WorkRecorde", false)
                //资源需求清单录入截止时间设置为隐藏
                mstform2.setHidden("Deadline", false)
                //项目概况设置必输项
                mstform2.getItem('GSituation').setProps({
                    required: true, //required是否必输
                });
                //施工内容设置为隐藏
                //mstform2.getItem('user_sgnr').setVisible(false);
                //施工内容设置为非必输
                //mstform2.getItem('user_sgnr').userSetMustInput(false);
                //经度设置为隐藏
                mstform2.setHidden("Longitude", false)
                //维度标志设置为隐藏
                mstform2.setHidden("Latitude", false)
                //管理片区设置为隐藏
                //mstform2.getItem('ManageArea').setVisible(false);
                mstform2.getItem('JobPhone').setProps({
                    required: false, //required是否必输
                });
            }

        }, 'form.PhIdType');

        /*根据项目类型为研发项目隐藏必输只读一些字段end*/

        //生成项目编号
        $NG.execServer('pt.yfxm', {}, function (res) {
            if (res.count > 0) {
                var data = JSON.parse(res.data)
                var num = parseInt(data[0].extendObjects.num) + 1;
                var date = new Date();
                var nd = date.getFullYear();
                var ls = nd + '000' + num;
                form.getItem('PcNo').setValue(ls);
            }
        });
    }

    //选择科研项目时显示这4个字段，其它类型时不显示
    /*if (otype == $Otype.ADD || otype == $Otype.EDIT || otype == $Otype.VIEW) {
          mstform1.getItem("PhIdType").addListener('helpselected', function() {
              var PhIdType = mstform1.getItem("PhIdType").getValue();
                  if (PhIdType == '224200929000001') {
                      mstform1.getItem('user_jzxm').setVisible(true);
                      mstform1.getItem('user_kyxmzt').setVisible(true);
                      mstform1.getItem('user_tjglyfxm').setVisible(true);
                      mstform1.getItem('user_zdyflx').setVisible(true);
                  }
                  else{
                      mstform1.getItem('user_jzxm').setVisible(false);
                      mstform1.getItem('user_kyxmzt').setVisible(false);
                      mstform1.getItem('user_tjglyfxm').setVisible(false);
                      mstform1.getItem('user_zdyflx').setVisible(false);
                  }

              });
      }*/
    //虚拟项目中研发项目显示某些字段
    if (proId == '1') {
        // 初始隐藏研发项目四个字段
        form.setHidden("user_jzxm", false)
        form.setHidden("user_kyxmzt", false)
        form.setHidden("user_tjglyfxm", false)
        form.setHidden("user_zdyflx", false)

        // 数据加载时根据类型显示字段


        var PhIdType = form.getItem("PhIdType").getValue();
        if (PhIdType == '224200929000001') {
            form.setHidden("user_jzxm", false)
            form.setHidden("user_kyxmzt", false)
            form.setHidden("user_tjglyfxm", false)
            form.setHidden("user_zdyflx", false)
        }


        // 项目类型选择事件
        useValuesChange(({
            args
        }) => {
            var PhIdType = form.getItem("PhIdType").getValue();

            // 研发项目显示字段
            if (PhIdType == '224200929000001') {
                form.setHidden("user_jzxm", false)
                form.setHidden("user_kyxmzt", false)
                form.setHidden("user_tjglyfxm", false)
                form.setHidden("user_zdyflx", false)
            } else {
                // 其他类型隐藏字段
                form.setHidden("user_jzxm", true)
                form.setHidden("user_kyxmzt", true)
                form.setHidden("user_tjglyfxm", true)
                form.setHidden("user_zdyflx", true)
            }
        }, 'form.PhIdType');


    }
    useBeforeClick(async () => {
        var flag = 0;

        /*自动生成项目立项状态编码start*/
        if ($NG.getQueryValue('oType') == 'add') {
            // var temp = 1;    
            // if (mstform) {
            //     console.log('mstform', mstform);
            //     for (var i = 0; i < mstform.fieldSets[0].allfields.length; i++) {
            //         if (mstform.fieldSets[0].allfields[i].mustInput) { //获取必输项字段
            //             if (Ext.isEmpty(mstform.getItem(mstform.fieldSets[0].allfields[i].name).getValue())) {
            //                 temp = 0;    
            //                 return;
            //             }
            //         };
            //     }
            // }
            // if (temp == 0) {
            //     return false;
            // }
            $NG.execServer('hsxmnm', {}, function (res) {
                console.log("核算内码res:", res);
                if (res.status != 'success') {
                    $NG.alert('提示', '服务端取数失败');
                    return false;
                } else if (res.count == 0) { //判断数组行数
                    $NG.alert('提示', '项目立项状态编码失败');
                    return false;
                }
                if (res.count > 0) {
                    var data = JSON.parse(res.data)
                    var num = parseInt(data[0].extendObjects.hsxmnm) + 1
                    console.log("核算内码:", num);
                    //判断是工程建设 还是虚拟项目
                    if (proId == '4') {
                        form.getItem('user_hsxmnm').setValue(num.toString());
                    } else if (proId == '1') {
                        form.getItem('user_hsxmnm').setValue(num.toString());
                    }
                    flag = 1;
                    return true;
                }
            });
            $NG.execServer('user_gs_fjm', {}, function (res) {
                console.log("分级码res:", res);
                if (res.status != 'success') {
                    $NG.alert('提示', '服务端取数失败');
                    return false;
                } else if (res.count == 0) { //判断数组行数
                    $NG.alert('提示', '项目立项状态编码失败');
                    return false;
                }
                if (res.count > 0) {
                    var data = JSON.parse(res.data)
                    var num = parseInt(data[0].extendObjects.user_gs_fjm) + 1
                    console.log("分级码:", num);
                    //判断是工程建设 还是虚拟项目
                    if (proId == '4') {
                        form.getItem('user_gs_fjm').setValue(num.toString());
                    } else if (proId == '1') {
                        form.getItem('user_gs_fjm').setValue(num.toString());
                    }
                    flag = 1;
                    return true;
                }
            });
        }
        /*自动生成项目立项状态编码end*/

        if ($NG.getQueryValue('oType') == 'add') {
            if (proId == '4') {
                /*判断项目编号，和项目名称字段是否有空格start*/
                var pcno = form.getItem('PcNo').getValue();
                var ProjectName = form.getItem('ProjectName').getValue();
                if (pcno.indexOf(" ") != -1) {
                    $NG.alert('提示', '项目编码有空格');
                    return false;
                }
                if (ProjectName.indexOf(" ") != -1) {
                    $NG.alert('提示', '项目名称有空格');
                    return false;
                }
                /*判断项目编号，和项目名称字段是否有空格end*/
                ProjectName = "'" + ProjectName + "'";
                $NG.execServer('duplicate', {
                    'project_name': ProjectName
                }, function (res) {
                    if (res.status != 'success') {
                        $NG.alert('提示', 'sql语句写法有错误，请检查');
                        return false;
                    } else if (res.count == 0) {
                        flag = 1;
                        return true;
                    } else {
                        $NG.alert('提示', '项目名称已存在');
                        return false;
                    }

                });

            } else {
                /*判断项目编号，和项目名称字段是否有空格start*/
                var pcno = form.getItem('PcNo').getValue();
                var ProjectName = form.getItem('ProjectName').getValue();
                if (pcno.indexOf(" ") != -1) {
                    $NG.alert('提示', '项目编码有空格');
                    return false;
                }
                if (ProjectName.indexOf(" ") != -1) {
                    $NG.alert('提示', '项目名称有空格');
                    return false;
                }
                /*判断项目编号，和项目名称字段是否有空格end*/
                ProjectName = "'" + ProjectName + "'";
                $NG.execServer('duplicate', {
                    'project_name': ProjectName
                }, function (res) {
                    if (res.status != 'success') {
                        $NG.alert('提示', 'sql语句写法有错误，请检查');
                        return false;
                    } else if (res.count == 0) {
                        flag = 1;
                        return true;
                    } else {
                        $NG.alert('提示', '项目名称已存在');
                        return false;
                    }

                });
            }
        } else if (otype == $Otype.EDIT) {
            var flag = 1;
        }

        if (flag == 1) {
            return true;
        } else {
            return false;
        }
    }, 'save');

});