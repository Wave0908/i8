$NG.AllReady(function (page,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick, useBeforeClick, useBeforeOpen }
) {
    /**===========翻译开始===========*/
    var form = $NG.getCmpApi('form');
    // var mstform1 = $NG.getCmpApi('formProjectTableVirtProj'); //虚拟项目
    // var mstform2 = $NG.getCmpApi('formProjectTableSummary'); //项目概况
    var projphid = $NG.getQueryValue('projprop');
    console.log("projphid:====", projphid);
    console.log("form:", form);
    // console.log("虚拟项目:", mstform1);
    // console.log("项目概况:", mstform2);
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
    if (mstform1) {
        mstform1.getItem('PcNo').setReadOnly(false);
    } else if (mstform) {
        if (mstform.getItem('CatPhId').getValue() != '324191209000058') {
            mstform.getItem('PcNo').setReadOnly(true);
        }
    }

    if ($NG.getQueryValue('oType') == 'view' || $NG.getQueryValue('oType') == 'edit' || $NG.getQueryValue('oType') == 'add') {

        if (mstform) {
            useValuesChange(({
                args
            }) => {
                var FactStartDt = mstform.getItem('FactStartDt').getValue();//合同竣工日期
                var LimitTime = mstform.getItem('LimitTime').getValue();
                var newdate = new Date(FactStartDt.setDate(FactStartDt.getDate() + LimitTime));
                mstform.getItem('user_jhjgrq').setValue(newdate);

            }, "formProjectTableMst.FactStartDt");

            useValuesChange(({
                args
            }) => {
                var user_sfsczy = mstform.getItem('user_sfsczy').getValue();
                if (user_sfsczy == '1') {
                    mstform.getItem('user_sbzysj').setProps({
                        required: true, //required是否必输
                    });
                } else {
                    mstform.getItem('user_sbzysj').setProps({
                        required: false, //required是否必输
                    });
                }
            }, "formProjectTableMst.user_sfsczy");


            //所在经济功能区根据省份过滤开始 
            useBeforeClick(({
                args
            }) => {
                var ProvinceId = mstform2.getItem('ProvinceId').getValue()
                mstform2.getItem('user_szjjfzgnq').setClientSqlFilter(" zj in (select zj from szjjfzgnq where csbm in (select csbm from szjjfzgnq where csbm ='" + ProvinceId + "' ) or zj='20250318021')");
            }, "formProjectTableVirtProj.user_szjjfzgnq");
            //所在经济功能区根据省份过滤结束 

            useValuesChange(({
                args
            }) => {
                var user_sflsxm = mstform.getItem('user_sflsxm').getValue();
                console.log("user_sflsxm:", user_sflsxm)
                if (user_sflsxm == '1') {
                    mstform.getItem('user_istbinspur').setValue('4');
                    mstform.getItem('user_tblchs').setValue('4');
                    mstform.getItem('user_lcywdy').setProps({
                        required: false, //required是否必输
                    });
                    mstform.getItem('user_mnemCodeInAccDepart').setProps({
                        required: false, //required是否必输
                    });
                } else {
                    mstform.getItem('user_istbinspur').setValue('');
                    mstform.getItem('user_tblchs').setValue('')
                    mstform.getItem('user_lcywdy').setProps({
                        required: true, //required是否必输
                    });
                    mstform.getItem('user_mnemCodeInAccDepart').setProps({
                        required: true, //required是否必输
                    });
                }
            }, "formProjectTableMst.user_sflsxm");
            //Ext.number翻新 待验证
            useValuesChange(({
                args
            }) => {
                var EndDate = mstform.getItem('EndDate').getValue();
                var user_yztzrq = mstform.getItem('user_yztzrq').getValue();
                var newdate = new Date(EndDate.setDate(EndDate.getDate() + user_yztzrq));

                mstform.getItem('user_tzhjgrq').setValue(newdate);
                mstform.getItem('user_tzhzgq').setValue(Number(mstform.getItem('LimitTime').getValue(),
                    0) + Number(mstform.getItem('user_yztzrq').getValue(), 0));
            }, "formProjectTableMst.user_yztzrq");

            useValuesChange(({
                args
            }) => {
                var EndDate = mstform.getItem('EndDate').getValue();
                var user_yztzrq = mstform.getItem('user_yztzrq').getValue();
                var newdate = new Date(EndDate.setDate(EndDate.getDate() + user_yztzrq));
                mstform.getItem('user_tzhjgrq').setValue(newdate);
            }, "formProjectTableMst.EndDate");

            //ext number翻新待验证
            useValuesChange(({//调整天数
                args
            }) => {
                mstform.getItem('user_tzhzgq').setValue(Number(mstform.getItem('LimitTime').getValue(),
                    0) + Number(mstform.getItem('user_yztzrq').getValue(), 0));
            }, "formProjectTableMst.LimitTime");

            var gclx1 = mstform.getItem('user_gclx1').getValue();
            if (gclx1 == '974191216000021' || gclx1 == '974191216000022' || gclx1 == '974191216000023' || gclx1 ==
                '974191216000024' ||
                gclx1 == '974191216000025' || gclx1 == '974191216000030' || gclx1 == '224220303000006' || gclx1 ==
                '974191216000029' ||
                gclx1 == '974191216000031' || gclx1 == '974191216000032'
            ) {
                mstform.getItem('user_gclx2').setProps({
                    required: false, //required是否必输
                });

            } else {
                mstform.getItem('user_gclx2').setProps({
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
    }, 'formProjectTableVirtProj.CountryId');

    /*新增修改的时候触发start*/
    if ($NG.getQueryValue('oType') == 'add' || $NG.getQueryValue('oType') == 'edit' || $NG.getQueryValue('oType') == 'view') {

        if (mstform) {
            if (schemeid == '221019013502') {
                mstform.getItem('PcNo').setReadOnly(false);
                mstform.getItem('user_ifnbfb').setReadOnly(true);
                mstform.getItem('user_ifnbfb').setValue('01');
            } else {
                mstform.getItem('user_ifnbfb').setReadOnly(true);
                mstform.getItem('user_ifnbfb').setValue('02');
            }
            if (schemeid == '577191213000004') {
                mstform.getItem('PcNo').setReadOnly(false);
                mstform.getItem('user_ifnbfb').setReadOnly(false);
            }

            mstform.getItem('user_tsxmmc').setValue('1');

            useBeforeClick(({
                args
            }) => {
                var gclx1 = mstform.getItem('user_gclx1').getValue();
                mstform.getItem('PhIdType').setValue(gclx1);
                if (gclx1 == '974191216000021' || gclx1 == '974191216000022' || gclx1 == '974191216000023' ||
                    gclx1 == '974191216000024' ||
                    gclx1 == '974191216000025' || gclx1 == '974191216000030' || gclx1 == '224220303000006' ||
                    gclx1 == '974191216000029' ||
                    gclx1 == '974191216000031' || gclx1 == '974191216000032'
                ) {
                    mstform.getItem('user_gclx2').setProps({
                        required: false, //required是否必输
                    });

                } else {
                    mstform.getItem('user_gclx2').setProps({
                        required: true, //required是否必输
                    });
                }
            }, "formProjectTableMst.user_gclx1");

            useValuesChange(({
                args
            }) => {
                mstform.getItem('user_gclx1').setClientSqlFilter('grade = 1 and enable_status=1 ');
            }, "formProjectTableMst.user_gclx1");

            useValuesChange(({
                args
            }) => {
                var user_gclx1 = mstform.getItem('user_gclx1').getValue();
                mstform.getItem('user_gclx2').setClientSqlFilter('grade = 2 and pphid =' + user_gclx1 +
                    ' and enable_status=1');
            }, "formProjectTableMst.user_gclx2");

            var cat_phid = mstform.getItem("CatPhId").getValue();
            if (cat_phid == '324191209000058') {
                mstform.getItem('user_istbinspur').setValue("1");
                mstform.getItem('user_tblchs').setValue("1");
                mstform.getItem('user_lcywdy').setProps({
                    required: false, //required是否必输
                });
                mstform.getItem('user_mnemCodeInAccDepart').setProps({
                    required: false, //required是否必输
                });
            } else {
                mstform.getItem('user_istbinspur').setValue(null);
                mstform.getItem('user_tblchs').setValue(null);
                mstform.getItem('user_lcywdy').setProps({
                    required: true, //required是否必输
                });
                mstform.getItem('user_mnemCodeInAccDepart').setProps({
                    required: true, //required是否必输
                });
            }

            useValuesChange(({
                args
            }) => {
                var cat_phid = mstform.getItem("CatPhId").getValue();
                if (cat_phid == '324191209000058') {
                    mstform.getItem('user_istbinspur').setValue('1');
                    mstform.getItem('user_tblchs').setValue('1');
                    mstform.getItem('user_lcywdy').setProps({
                        required: false, //required是否必输
                    });
                    mstform.getItem('user_mnemCodeInAccDepart').setProps({
                        required: false, //required是否必输
                    });
                } else {
                    mstform.getItem('user_istbinspur').setValue(null);
                    mstform.getItem('user_tblchs').setValue();
                    mstform.getItem('user_lcywdy').setProps({
                        required: true, //required是否必输
                    });
                    mstform.getItem('user_mnemCodeInAccDepart').setProps({
                        required: true, //required是否必输
                    });
                }
            }, 'formProjectTableMst.CatPhId');
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
        if (mstform) {
            PhIdType(mstform);
        } else if (mstform1) {
            PhIdType(mstform1);
        }
        //研发项目一些字段隐藏
        function PhIdType(mstform) {
            var PhIdType = mstform.getItem("PhIdType").getValue();
            if (PhIdType == '224200929000001') {
                //风险级别设置为隐藏
                mstform.setHidden("RiskFlag", false)
                //是否内部分包设置为隐藏
                mstform.setHidden("user_ifnbfb", false)
                //默认财务组织设置为隐藏
                mstform.setHidden("PhIdFiOcode", false)
                //涉及财务组织设置为隐藏
                mstform.setHidden("ProjectOrg", false)
                //建设单位设置为隐藏
                mstform.setHidden("PhIdCompany", false)
                //施工单位设置为隐藏
                mstform.setHidden("PhIdSgOrg", false)
                //浪潮同步标志设置为隐藏
                mstform.setHidden("user_tblchs", false)
                //浪潮同步时间设置为隐藏
                mstform.setHidden("user_tblchstime", false)
                //项目管控模式设置为隐藏
                mstform.setHidden("user_xmgkms", false)
                //经营模式设置为隐藏
                mstform.setHidden("ManageMode", false)
                //按项目建组织按钮设置为隐藏
                mstform.setHidden("OrgByProject", false)
                //建筑用途设置为隐藏
                mstform.setHidden("PhidBuildType", false)
                //业务类型设置为隐藏
                mstform.setHidden("user_ywlx", false)
                //承揽方式设置为隐藏
                mstform.setHidden("user_clfs", false)
                //项目性质设置为隐藏
                mstform.setHidden("user_xmxz", false)
                //房产项目状态设置为隐藏
                mstform.setHidden("user_fc_xmzt", false)
                //备案项目经理设置为隐藏
                mstform.setHidden("RecordManager", false)
                //浪潮推送标志设置为隐藏
                mstform.setHidden("user_gs_tsbs", false)
                //业主传真设置为隐藏
                mstform.setHidden("JobTax", false)
                //业主代表电话设置为隐藏
                mstform.setHidden("JobPhone", false)
                mstform.getItem('JobPhone').setMustInput(false);
                //建筑规模设置为隐藏
                mstform.setHidden("BuildingArea", false)
                //单位设置为隐藏
                mstform.setHidden("Msunit", false)
                //所属父级项目设置为隐藏
                mstform.setHidden("ProjectParentId", false)
                //合同编号设置为隐藏
                mstform.setHidden("CntNo", false)
                //合同类型设置为隐藏
                mstform.setHidden("ContractType", false)
                //合同签订日期设置为隐藏
                mstform.setHidden("ContractorDate", false)
                //币种设置为隐藏
                mstform.setHidden("CurrType", false)
                //汇率设置为隐藏
                mstform.setHidden("ExchRate", false)
                //合同金额设置为隐藏
                mstform.setHidden("CntAmtFc", false)
                //本币合同金额设置为隐藏
                mstform.setHidden("CntAmt", false)
                //工程合同备案号设置为隐藏
                mstform.setHidden("ConRecorde", false)
                //劳动用工备案号设置为隐藏
                mstform.setHidden("WorkRecorde", false)
                //资源需求清单录入截止时间设置为隐藏
                mstform.setHidden("Deadline", false)
                //施工内容设置为隐藏
                //mstform2.getItem('user_sgnr').setVisible(false);
                //经度设置为隐藏
                mstform.setHidden("Longitude", false)
                //维度标志设置为隐藏
                mstform.setHidden("Latitude", false)
                //管理片区设置为隐藏
                //mstform2.getItem('ManageArea').setVisible(false);

            }

        }

    }
    /*项目类型为研发项目的时候 隐藏一些字段end*/

    if (mstform) {
        /*管理组织选择后清空所属项目部start*/
        useValuesChange(({
            args
        }) => {
            mstform.getItem('user_pc_dept').setValue();
        }, 'formProjectTableMst.CatPhId');
        /*管理组织选择后清空所属项目部end*/

        /*项目所属部选择后带出浪潮业务单元start*/
        useValuesChange(({
            args
        }) => {
            var user_pc_dept = mstform.getItem('user_pc_dept').getValue();
            console.log('user_pc_dept==============>', user_pc_dept)
            $NG.execServer('ssxmb_bmywdy', {
                'dept': user_pc_dept
            }, function (res) {
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    if (data.length == 1) {
                        mstform.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
                        if (data[0].extendObjects.user_lcywdy == null) {
                            $NG.alert("请联系管理员处理，部门对照未做");
                        }
                    } else {
                        $NG.alert("请联系管理员处理，部门对照存在重复");
                        mstform.getItem('user_lcywdy').setValue(null);
                    }
                } else {
                    $NG.alert("请联系管理员处理，部门对照未做");
                    mstform.getItem('user_lcywdy').setValue(null);
                }
            });

            $NG.execServer('ssxmb_zjm', {
                'dept': user_pc_dept
            }, function (res) {
                if (res.count > 0) {
                    var data = JSON.parse(res.data)
                    if (data.length == 1) {
                        mstform.getItem('user_mnemCodeInAccDepart').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
                        if (data[0].extendObjects.user_mnemcodeinaccdepart == null) {
                            $NG.alert("请联系管理员处理，部门对照未做");
                        }
                    } else {
                        $NG.alert("请联系管理员处理，部门对照存在重复");
                        mstform.getItem('user_mnemCodeInAccDepart').setValue(null);
                    }
                } else {
                    $NG.alert("请联系管理员处理，部门对照存在重复");
                    mstform.getItem('user_mnemCodeInAccDepart').setValue(null);
                }
            });
        }, 'formProjectTableMst.user_pc_dept');

        /*项目所属部选择后带出浪潮业务单元end*/

        //项目核算内码设置为只读
        mstform.getItem('user_hsxmnm').setReadOnly(true);
        if ($NG.getQueryValue('oType') == 'add') {
            //通用帮助翻新待验证
            mstform.setValues({
                Stat: {
                    value: "zb",
                    label: "项目准备阶段"
                }
            })
            /*所属项目部过滤start*/
            useBeforeClick(async function ({ args }) {
                var zz = mstform.getItem('CatPhId').getValue();
                $NG.updateUI(function (updater, state) {
                    updater.fieldSetForm.formProjectTableMst.user_pc_dept.setProps({
                        clientSqlFilter: ('parent_orgid = ' + zz),
                        placeholder: ``
                    });
                });
            }, "formProjectTableMst.user_pc_dept");
            /*所属项目部过滤end*/

            /*所属项目部过滤start*/
            useBeforeClick(async function ({ args }) {
                var zz = mstform.getItem('PhIdFiOcode').getValue();
                $NG.updateUI(function (updater, state) {
                    updater.fieldSetForm.formProjectTableMst.user_cwglbm.setProps({
                        clientSqlFilter: ('parent_orgid = ' + zz),
                        placeholder: ``
                    });
                });
            }, "formProjectTableMst.user_cwglbm");
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
    if (mstform1) {
        //新增选择虚拟项目后，所属项目部不是必填项，但接口会筛选，调整为必填项   2025.11.20 界面设计已调整为必填
        //mstform1.getItem('user_pc_dept').userSetMustInput(true);
        if ($NG.getQueryValue('oType') == 'add') {
            //mstform1.queryById('Stat').setValue("zb");
            //帮助翻新待验证
            mstform1.setValues({
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
        }, 'formProjectTableVirtProj.CountryId');
        if (schemeid == '221019013502') {
            mstform1.getItem('PcNo').setReadOnly(false);
            mstform1.getItem('user_ifnbfb').setReadOnly(true);
            mstform1.getItem('user_ifnbfb').setValue('01');

        } else {
            mstform.getItem('user_ifnbfb').setReadOnly(true);
            mstform.getItem('user_ifnbfb').setValue('02');
        }
        if (schemeid == '577191213000004') {
            mstform1.getItem('PcNo').setReadOnly(false);
            mstform1.getItem('user_ifnbfb').setReadOnly(true);
        }

        /*项目类型为研发项目的时候 隐藏一些字段start*/
        if ($NG.getQueryValue('oType') == 'view') {
            var PhIdType = mstform1.getItem("PhIdType").getValue();
            if (PhIdType == '224200929000001') {
                //风险级别设置为隐藏
                mstform1.setHidden("RiskFlag", false)
                //是否内部分包设置为隐藏
                mstform1.setHidden("user_ifnbfb", false)
                //默认财务组织设置为隐藏
                mstform1.setHidden("PhIdFiOcode", false)
                //涉及财务组织设置为隐藏
                mstform1.setHidden("ProjectOrg", false)
                //建设单位设置为隐藏
                mstform1.setHidden("PhIdCompany", false)
                //施工单位设置为隐藏
                mstform1.setHidden("PhIdSgOrg", false)
                //浪潮同步标志设置为隐藏
                mstform1.setHidden("user_istbinspur", false)
                //浪潮同步时间设置为隐藏
                mstform1.setHidden("user_tbinspurtime", false)
                //项目管控模式设置为隐藏
                mstform1.setHidden("user_xmgkms", false)
                //经营模式设置为隐藏
                mstform1.setHidden("ManageMode", false)
                //按项目建组织按钮设置为隐藏
                mstform1.setHidden("OrgByProject", false)
                //建筑用途设置为隐藏
                mstform1.setHidden("PhidBuildType", false)
                //业务类型设置为隐藏
                mstform1.setHidden("user_ywlx", false)
                //承揽方式设置为隐藏
                mstform1.setHidden("user_clfs", false)
                //项目性质设置为隐藏
                mstform1.setHidden("user_xmxz", false)
                //房产项目状态设置为隐藏
                mstform1.setHidden("user_fc_xmzt", false)
                //备案项目经理设置为隐藏
                mstform1.setHidden("RecordManager", false)
                //浪潮推送标志设置为隐藏
                mstform1.setHidden("user_gs_tsbs", false)
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
            var user_sflsxm = mstform1.getItem('user_sflsxm').getValue();
            if (user_sflsxm == '1') {
                mstform1.getItem('user_istbinspur').setValue('4');
                mstform1.getItem('user_tblchs').setValue('4');
                mstform1.getItem('user_lcywdy').userSetMustInput(false);
                mstform1.getItem('user_mnemCodeInAccDepart').userSetMustInput(false);

            } else {
                mstform1.getItem('user_istbinspur').setValue('');
                mstform1.getItem('user_tblchs').setValue('')
                mstform1.getItem('user_lcywdy').userSetMustInput(true);
                mstform1.getItem('user_mnemCodeInAccDepart').userSetMustInput(true);
            }
        }, 'formProjectTableVirtProj.user_sflsxm');

        //核算项目内码设置为只读
        mstform1.getItem('user_hsxmnm').setReadOnly(true);
        /*所属项目部过滤start*/
        useBeforeClick(({
            args
        }) => {
            var zz = mstform1.getItem('CatPhId').getValue();
            mstform1.getItem('user_pc_dept').setOutFilter({
                parent_orgid: zz
            }) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
        }, "formProjectTableVirtProj.user_pc_dept");
        /*所属项目部过滤end*/

        /*管理组织选择后清空所属项目部start*/
        mstform1.getItem('CatPhId').addListener('helpselected', function () {
            mstform1.getItem('user_pc_dept').setValue();
        });

        useValuesChange(({
            args
        }) => {
            mstform1.getItem('user_pc_dept').setValue();
        }, 'formProjectTableVirtProj.CatPhId');
        /*管理组织选择后清空所属项目部end*/
        /*项目所属部选择后带出浪潮业务单元start*/

        useValuesChange(({
            args
        }) => {
            var user_pc_dept = mstform1.getItem('user_pc_dept').getValue();

            $NG.execServer('ssxmb_bmywdy', {
                'dept': user_pc_dept
            }, function (res) {

                if (res.count > 0) {
                    var data = JSON.parse(res.data)
                    if (data.length == 1) {
                        mstform1.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
                        if (data[0].extendObjects.user_lcywdy == null) {
                            $NG.alert('提示', '请联系管理员处理，部门对照未做');
                        }
                    } else {
                        $NG.alert('提示', '请联系管理员处理，部门对照存在重复');
                        mstform1.getItem('user_lcywdy').setValue(null);
                    }
                } else {
                    $NG.alert('提示', '请联系管理员处理，部门对照未做');
                    mstform1.getItem('user_lcywdy').setValue(null);
                }
            });

            $NG.execServer('ssxmb_zjm', {
                'dept': user_pc_dept
            }, function (res) {
                if (res.count > 0) {
                    var data = JSON.parse(res.data);
                    console.log("ssxmb_zjm data:", data);
                    if (data.length == 1) {
                        mstform1.getItem('user_mnemCodeInAccDepart').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
                        if (data[0].extendObjects.user_mnemcodeinaccdepart == null) {
                            $NG.alert('提示', '请联系管理员处理，部门对照未做');
                        }
                    } else {
                        $NG.alert('提示', '请联系管理员处理，部门对照存在重复');
                        mstform1.getItem('user_mnemCodeInAccDepart').setValue(null);
                    }
                } else {
                    $NG.alert('提示', '请联系管理员处理，部门对照未做');
                    mstform1.getItem('user_mnemCodeInAccDepart').setValue(null);
                }
            });
        }, 'formProjectTableVirtProj.user_pc_dept');

        /*项目所属部选择后带出浪潮业务单元end*/

        /*根据项目类型为研发项目隐藏必输只读一些字段start*/

        //项目类型选择后触发
        useValuesChange(({
            args
        }) => {
            var PhIdType = mstform1.getItem("PhIdType").getValue();
            console.log('PhIdType====================>', PhIdType)
            if (PhIdType == '224200929000001') {
                //项目类型变为只读
                mstform1.getItem('PhIdType').setReadOnly(true);
                //项目简称设置为必输
                mstform1.getItem('Ab').setProps({
                    required: true, //required是否必输
                });
                //风险级别设置为隐藏
                mstform1.setHidden("RiskFlag", false)
                //是否内部分包设置为隐藏
                mstform1.setHidden("user_ifnbfb", false)
                //是否内部分包设置为非必输
                mstform1.getItem('user_ifnbfb').setProps({
                    required: false, //required是否必输
                });
                //默认财务组织设置为隐藏
                mstform1.setHidden("PhIdFiOcode", false)
                //涉及财务组织设置为隐藏
                mstform1.setHidden("ProjectOrg", false)
                //建设单位设置为隐藏
                mstform1.setHidden("PhIdCompany", false)
                //建设单位设置为非必输
                mstform1.getItem('PhIdCompany').setProps({
                    required: false, //required是否必输
                });
                //施工单位设置为隐藏
                mstform1.setHidden("PhIdSgOrg", false)
                //施工单位设置为非必输
                mstform1.getItem('PhIdSgOrg').setProps({
                    required: false, //required是否必输
                });
                //浪潮同步标志设置为隐藏
                mstform1.setHidden("user_istbinspur", false)
                //浪潮同步时间设置为隐藏
                mstform1.setHidden("user_tbinspurtime", false)
                //项目金额设置为必输
                mstform1.getItem('ApproxContractFc').setProps({
                    required: true, //required是否必输
                });

                //项目管控模式设置为隐藏
                mstform1.setHidden("user_xmgkms", false)
                //项目管控模式设置为非必输
                mstform1.getItem('user_xmgkms').setProps({
                    required: false, //required是否必输
                });
                //经营模式设置为隐藏
                mstform1.setHidden("ManageMode", false)
                //按项目建组织按钮设置为隐藏
                mstform1.setHidden("OrgByProject", false)
                //建筑用途设置为隐藏
                mstform1.setHidden("PhidBuildType", false)
                //业务类型设置为隐藏
                mstform1.setHidden("user_ywlx", false)
                //承揽方式设置为隐藏
                mstform1.setHidden("user_clfs", false)
                //承揽方式设置为非必输
                mstform1.getItem('user_clfs').setProps({
                    required: false, //required是否必输
                });
                //项目性质设置为隐藏
                mstform1.setHidden("user_xmxz", false)
                //项目性质设置为非必输
                mstform1.getItem('user_xmxz').setProps({
                    required: false, //required是否必输
                });
                //房产项目状态设置为隐藏
                mstform1.setHidden("user_fc_xmzt", false)
                //备案项目经理设置为隐藏
                mstform1.setHidden("RecordManager", false)
                //浪潮推送标志设置为隐藏
                mstform1.setHidden("user_gs_tsbs", false)
                //项目经理改成必输
                mstform1.getItem('ProjectManager').setProps({
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
                    // 获取 formProjectTableVirtProj 表单引用
                    const formVirtProj = updater.fieldSetForm.formProjectTableVirtProj;

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

        }, 'formProjectTableVirtProj.PhIdType');

        /*根据项目类型为研发项目隐藏必输只读一些字段end*/

        //生成项目编号
        $NG.execServer('pt.yfxm', {}, function (res) {
            if (res.count > 0) {
                var data = JSON.parse(res.data)
                var num = parseInt(data[0].extendObjects.num) + 1;
                var date = new Date();
                var nd = date.getFullYear();
                var ls = nd + '000' + num;
                mstform1.getItem('PcNo').setValue(ls);
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
    if (mstform1) {
        // 初始隐藏研发项目四个字段
        mstform1.setHidden("user_jzxm", false)
        mstform1.setHidden("user_kyxmzt", false)
        mstform1.setHidden("user_tjglyfxm", false)
        mstform1.setHidden("user_zdyflx", false)

        // 数据加载时根据类型显示字段


        var PhIdType = mstform1.getItem("PhIdType").getValue();
        if (PhIdType == '224200929000001') {
            mstform1.setHidden("user_jzxm", false)
            mstform1.setHidden("user_kyxmzt", false)
            mstform1.setHidden("user_tjglyfxm", false)
            mstform1.setHidden("user_zdyflx", false)
        }


        // 项目类型选择事件
        useValuesChange(({
            args
        }) => {
            var PhIdType = mstform1.getItem("PhIdType").getValue();

            // 研发项目显示字段
            if (PhIdType == '224200929000001') {
                mstform1.setHidden("user_jzxm", false)
                mstform1.setHidden("user_kyxmzt", false)
                mstform1.setHidden("user_tjglyfxm", false)
                mstform1.setHidden("user_zdyflx", false)
            } else {
                // 其他类型隐藏字段
                mstform1.setHidden("user_jzxm", true)
                mstform1.setHidden("user_kyxmzt", true)
                mstform1.setHidden("user_tjglyfxm", true)
                mstform1.setHidden("user_zdyflx", true)
            }
        }, 'formProjectTableVirtProj.PhIdType');


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
                    if (mstform) {
                        mstform.getItem('user_hsxmnm').setValue(num.toString());
                    } else if (mstform1) {
                        mstform1.getItem('user_hsxmnm').setValue(num.toString());
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
                    if (mstform) {
                        mstform.getItem('user_gs_fjm').setValue(num.toString());
                    } else if (mstform1) {
                        mstform1.getItem('user_gs_fjm').setValue(num.toString());
                    }
                    flag = 1;
                    return true;
                }
            });
        }
        /*自动生成项目立项状态编码end*/

        if ($NG.getQueryValue('oType') == 'add') {
            if (mstform) {
                /*判断项目编号，和项目名称字段是否有空格start*/
                var pcno = mstform.getItem('PcNo').getValue();
                var ProjectName = mstform.getItem('ProjectName').getValue();
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
                var pcno = mstform1.getItem('PcNo').getValue();
                var ProjectName = mstform1.getItem('ProjectName').getValue();
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