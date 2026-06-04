function AllReady() {
    console.log("schemeid===", schemeid);
    var mstform = Ext.getCmp('formProjectTableMst'); //工程建设
    var mstform1 = Ext.getCmp('formProjectTableVirtProj'); //虚拟项目
    var mstform2 = Ext.getCmp('formProjectTableSummary'); //项目概况
    console.log("工程建设:",mstform);
    console.log("虚拟项目:",mstform1);
    console.log("项目概况:",mstform2);
    //Ext.ComponentQuery.query('tabpanel')[1].items.get(3).tab.hide();
    Ext.ComponentQuery.query('tabpanel')[1].items.get(4).tab.hide();
    Ext.ComponentQuery.query('tabpanel')[1].items.get(5).tab.hide();
    var Toolbar = Ext.getCmp('toolbar');
    if (mstform1) {
        mstform1.getItem('PcNo').userSetReadOnly(false);
    } else if (mstform) {
        if (mstform.getItem('CatPhId').getValue() != '324191209000058') {
            mstform.getItem('PcNo').userSetReadOnly(true);
        }
    }
    //隐藏研发项目字段
    /*mstform1.getItem('user_jzxm').setVisible(false);
    mstform1.getItem('user_kyxmzt').setVisible(false);
    mstform1.getItem('user_tjglyfxm').setVisible(false);
    mstform1.getItem('user_zdyflx').setVisible(false);*/


    if (otype == $Otype.VIEW || otype == $Otype.EDIT || otype == $Otype.ADD) {

        if (mstform) {
            //mstform.getItem('PcNo').userSetReadOnly(false);
            mstform.getItem('FactStartDt').addListener('change', function () {    //业主调整日期 
                var FactStartDt = mstform.getItem('FactStartDt').getValue();//合同竣工日期
                var LimitTime = mstform.getItem('LimitTime').getValue();
                var newdate = new Date(FactStartDt.setDate(FactStartDt.getDate() + LimitTime));
                mstform.getItem('user_jhjgrq').setValue(newdate);
            });


            mstform.getItem('user_sfsczy').addListener('change', function () {
                var user_sfsczy = mstform.getItem('user_sfsczy').getValue();
                if (user_sfsczy == '1') {
                    mstform.getItem('user_sbzysj').userSetMustInput(true);
                } else {
                    mstform.getItem('user_sbzysj').userSetMustInput(false);
                }
            });


            //所在经济功能区根据省份过滤开始 
            mstform2.getItem('user_szjjfzgnq').on('beforetriggerclick', function () { //帮助窗口打开前事件
                var ProvinceId = mstform2.getItem('ProvinceId').getValue()
                mstform2.getItem('user_szjjfzgnq').setClientSqlFilter(" zj in (select zj from szjjfzgnq where csbm in (select csbm from szjjfzgnq where csbm ='" + ProvinceId + "' ) or zj='20250318021')");
            });
            //所在经济功能区根据省份过滤结束 

            mstform.getItem('user_sflsxm').addListener('change', function () {
                var user_sflsxm = mstform.getItem('user_sflsxm').getValue();
                if (user_sflsxm == '1') {
                    mstform.getItem('user_istbinspur').setValue('4');
                    mstform.getItem('user_tblchs').setValue('4');
                    mstform.getItem('user_lcywdy').userSetMustInput(false);
                    mstform.getItem('user_mnemCodeInAccDepart').userSetMustInput(false);

                } else {
                    mstform.getItem('user_istbinspur').setValue('');
                    mstform.getItem('user_tblchs').setValue('')
                    mstform.getItem('user_lcywdy').userSetMustInput(true);
                    mstform.getItem('user_mnemCodeInAccDepart').userSetMustInput(true);
                }
            });

            mstform.getItem('user_yztzrq').addListener('itemchanged', function () {
                var EndDate = mstform.getItem('EndDate').getValue();
                var user_yztzrq = mstform.getItem('user_yztzrq').getValue();
                var newdate = new Date(EndDate.setDate(EndDate.getDate() + user_yztzrq));

                mstform.getItem('user_tzhjgrq').setValue(newdate);
                mstform.getItem('user_tzhzgq').setValue(Ext.Number.from(mstform.getItem('LimitTime').getValue(),
                    0) + Ext.Number.from(mstform.getItem('user_yztzrq').getValue(), 0));
            });

            mstform.getItem('EndDate').addListener('change', function () {
                var EndDate = mstform.getItem('EndDate').getValue();
                var user_yztzrq = mstform.getItem('user_yztzrq').getValue();
                var newdate = new Date(EndDate.setDate(EndDate.getDate() + user_yztzrq));
                mstform.getItem('user_tzhjgrq').setValue(newdate);
            });

            mstform.getItem('LimitTime').addListener('change', function () { //调整天数
                mstform.getItem('user_tzhzgq').setValue(Ext.Number.from(mstform.getItem('LimitTime').getValue(),
                    0) + Ext.Number.from(mstform.getItem('user_yztzrq').getValue(), 0));

            });
            var gclx1 = mstform.getItem('user_gclx1').getValue();
            if (gclx1 == '974191216000021' || gclx1 == '974191216000022' || gclx1 == '974191216000023' || gclx1 ==
                '974191216000024' ||
                gclx1 == '974191216000025' || gclx1 == '974191216000030' || gclx1 == '224220303000006' || gclx1 ==
                '974191216000029' ||
                gclx1 == '974191216000031' || gclx1 == '974191216000032'
            ) {
                mstform.getItem('user_gclx2').userSetMustInput(false);

            } else {
                mstform.getItem('user_gclx2').userSetMustInput(true);
            }

        }
    }


    if (otype == $Otype.EDIT) {
        var countryid = mstform2.getItem('CountryId').getValue();
        if (countryid == '1') {
            mstform2.getItem('ProvinceId').userSetMustInput(true);
            mstform2.getItem('CityId').userSetMustInput(true);
            mstform2.getItem('RegionId').userSetMustInput(true);
            mstform2.getItem('user_szjjfzgnq').userSetMustInput(true);

        } else {
            mstform2.getItem('ProvinceId').userSetMustInput(false);
            mstform2.getItem('CityId').userSetMustInput(false);
            mstform2.getItem('RegionId').userSetMustInput(false);
            mstform2.getItem('user_szjjfzgnq').userSetMustInput(false);
        }
    }

    /*国外省市县不必输，国内必输*/
    mstform2.getItem('CountryId').addListener('helpselected', function () {
        var countryid = mstform2.getItem('CountryId').getValue();
        if (countryid == '1') {
            mstform2.getItem('ProvinceId').userSetMustInput(true);
            mstform2.getItem('CityId').userSetMustInput(true);
            mstform2.getItem('RegionId').userSetMustInput(true);
            mstform2.getItem('user_szjjfzgnq').userSetMustInput(true);
        } else {
            mstform2.getItem('ProvinceId').userSetMustInput(false);
            mstform2.getItem('CityId').userSetMustInput(false);
            mstform2.getItem('RegionId').userSetMustInput(false);
            mstform2.getItem('user_szjjfzgnq').userSetMustInput(false);
        }
    });

    /*新增修改的时候触发start*/
    if (otype == $Otype.ADD || otype == $Otype.EDIT || otype == $Otype.VIEW) {

        if (mstform) {
            if (schemeid == '221019013502') {
                mstform.getItem('PcNo').userSetReadOnly(false);
                mstform.getItem('user_ifnbfb').userSetReadOnly(true);
                mstform.getItem('user_ifnbfb').setValue('01');
            } else {
                mstform.getItem('user_ifnbfb').userSetReadOnly(true);
                mstform.getItem('user_ifnbfb').setValue('02');
            }
            if (schemeid == '577191213000004') {
                mstform.getItem('PcNo').userSetReadOnly(false);
                mstform.getItem('user_ifnbfb').userSetReadOnly(false);
            }

            mstform.getItem('user_tsxmmc').setValue('1');
            mstform.getItem('user_gclx1').on('helpselected', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
                var gclx1 = mstform.getItem('user_gclx1').getValue();
                mstform.getItem('PhIdType').setValue(gclx1);
                if (gclx1 == '974191216000021' || gclx1 == '974191216000022' || gclx1 == '974191216000023' ||
                    gclx1 == '974191216000024' ||
                    gclx1 == '974191216000025' || gclx1 == '974191216000030' || gclx1 == '224220303000006' ||
                    gclx1 == '974191216000029' ||
                    gclx1 == '974191216000031' || gclx1 == '974191216000032'
                ) {
                    mstform.getItem('user_gclx2').userSetMustInput(false);

                } else {
                    mstform.getItem('user_gclx2').userSetMustInput(true);
                }
            });


            mstform.getItem('user_gclx1').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
                mstform.getItem('user_gclx1').setClientSqlFilter('grade = 1 and enable_status=1 ');
            });
            mstform.getItem('user_gclx2').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
                var user_gclx1 = mstform.getItem('user_gclx1').getValue();
                mstform.getItem('user_gclx2').setClientSqlFilter('grade = 2 and pphid =' + user_gclx1 +
                    ' and enable_status=1');
            });
            mstform.on("dataready", function () {
                var cat_phid = mstform.getItem("CatPhId").getValue();
                if (cat_phid == '324191209000058') {
                    mstform.getItem('user_istbinspur').setValue("1");
                    mstform.getItem('user_tblchs').setValue("1");
                    mstform.getItem('user_lcywdy').userSetMustInput(false);
                    mstform.getItem('user_mnemCodeInAccDepart').userSetMustInput(false);
                } else {
                    mstform.getItem('user_istbinspur').setValue(null);
                    mstform.getItem('user_tblchs').setValue(null);
                    mstform.getItem('user_lcywdy').userSetMustInput(true);
                    mstform.getItem('user_mnemCodeInAccDepart').userSetMustInput(true);
                }

            });

            mstform.getItem('CatPhId').addListener('helpselected', function () {
                var cat_phid = mstform.getItem("CatPhId").getValue();
                if (cat_phid == '324191209000058') {
                    mstform.getItem('user_istbinspur').setValue("1");
                    mstform.getItem('user_tblchs').setValue("1");
                    mstform.getItem('user_lcywdy').userSetMustInput(false);
                    mstform.getItem('user_mnemCodeInAccDepart').userSetMustInput(false);
                } else {
                    mstform.getItem('user_istbinspur').setValue(null);
                    mstform.getItem('user_tblchs').setValue();
                    mstform.getItem('user_lcywdy').userSetMustInput(true);
                    mstform.getItem('user_mnemCodeInAccDepart').userSetMustInput(true);
                }

            });
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
    if (otype == $Otype.VIEW || otype == $Otype.EDIT) {
        if (mstform) {
            mstform.on("dataready", function () {
                PhIdType(mstform);
            });

        } else if (mstform1) {
            mstform1.on("dataready", function () {
                PhIdType(mstform1);
            });
        }
        //研发项目一些字段隐藏
        function PhIdType(mstform) {
            var PhIdType = mstform.getItem("PhIdType").getValue();
            if (PhIdType == '224200929000001') {
                //风险级别设置为隐藏
                mstform.getItem('RiskFlag').setVisible(false);
                //是否内部分包设置为隐藏
                mstform.getItem('user_ifnbfb').setVisible(false);
                //默认财务组织设置为隐藏
                mstform.getItem('PhIdFiOcode').setVisible(false);
                //涉及财务组织设置为隐藏
                mstform.getItem('ProjectOrg').setVisible(false);
                //建设单位设置为隐藏
                mstform.getItem('PhIdCompany').setVisible(false);
                //施工单位设置为隐藏
                mstform.getItem('PhIdSgOrg').setVisible(false);
                //浪潮同步标志设置为隐藏
                mstform.getItem('user_tblchs').setVisible(false);
                //浪潮同步时间设置为隐藏
                mstform.getItem('user_tblchstime').setVisible(false);
                //项目管控模式设置为隐藏
                mstform.getItem('user_xmgkms').setVisible(false);
                //经营模式设置为隐藏
                mstform.getItem('ManageMode').setVisible(false);
                //按项目建组织按钮设置为隐藏
                mstform.getItem('OrgByProject').setVisible(false);
                //建筑用途设置为隐藏
                mstform.getItem('PhidBuildType').setVisible(false);
                //业务类型设置为隐藏
                mstform.getItem('user_ywlx').setVisible(false);
                //承揽方式设置为隐藏
                mstform.getItem('user_clfs').setVisible(false);
                //项目性质设置为隐藏
                mstform.getItem('user_xmxz').setVisible(false);
                //房产项目状态设置为隐藏
                mstform.getItem('user_fc_xmzt').setVisible(false);
                //备案项目经理设置为隐藏
                mstform.getItem('RecordManager').setVisible(false);
                //浪潮推送标志设置为隐藏
                mstform.getItem('user_gs_tsbs').setVisible(false);
                //业主传真设置为隐藏
                mstform2.getItem('JobTax').setVisible(false);
                //业主代表电话设置为隐藏
                mstform2.getItem('JobPhone').setVisible(false);
                //建筑规模设置为隐藏
                mstform2.getItem('BuildingArea').setVisible(false);
                //单位设置为隐藏
                mstform2.getItem('Msunit').setVisible(false);
                //所属父级项目设置为隐藏
                mstform2.getItem('ProjectParentId').setVisible(false);
                //合同编号设置为隐藏
                mstform2.getItem('CntNo').setVisible(false);
                //合同类型设置为隐藏
                mstform2.getItem('ContractType').setVisible(false);
                //合同签订日期设置为隐藏
                mstform2.getItem('ContractorDate').setVisible(false);
                //币种设置为隐藏
                mstform2.getItem('CurrType').setVisible(false);
                //汇率设置为隐藏
                mstform2.getItem('ExchRate').setVisible(false);
                //合同金额设置为隐藏
                mstform2.getItem('CntAmtFc').setVisible(false);
                //本币合同金额设置为隐藏
                mstform2.getItem('CntAmt').setVisible(false);
                //工程合同备案号设置为隐藏
                mstform2.getItem('ConRecorde').setVisible(false);
                //劳动用工备案号设置为隐藏
                mstform2.getItem('WorkRecorde').setVisible(false);
                //资源需求清单录入截止时间设置为隐藏
                mstform2.getItem('Deadline').setVisible(false);
                //施工内容设置为隐藏
                //mstform2.getItem('user_sgnr').setVisible(false);
                //经度设置为隐藏
                mstform2.getItem('Longitude').setVisible(false);
                //维度标志设置为隐藏
                mstform2.getItem('Latitude').setVisible(false);
                //管理片区设置为隐藏
                //mstform2.getItem('ManageArea').setVisible(false);

            }

        }

    }
    /*项目类型为研发项目的时候 隐藏一些字段end*/

    if (mstform) {
        /*管理组织选择后清空所属项目部start*/
        mstform.getItem('CatPhId').addListener('helpselected', function () {
            mstform.getItem('user_pc_dept').setValue();
        });
        /*管理组织选择后清空所属项目部end*/


        /*项目所属部选择后带出浪潮业务单元start*/
        mstform.getItem('user_pc_dept').addListener('helpselected', function () {
            var user_pc_dept = mstform.getItem('user_pc_dept').getValue();
            console.log('user_pc_dept==============>', user_pc_dept)
            execServer('ssxmb_bmywdy', {
                'dept': user_pc_dept
            }, function (res) {
                if (res.count > 0) {
                    var data = JSON.parse(res.data)
                    mstform.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
                } else {
                    Ext.Msg.alert('提示', '请先维护部门业务单元对照表');
                    return false;
                }
            });

            execServer('ssxmb_zjm', {
                'dept': user_pc_dept
            }, function (res) {

                if (res.count > 0) {
                    var data = JSON.parse(res.data)
                    mstform.getItem('user_mnemCodeInAccDepart').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
                } else {
                    Ext.Msg.alert('提示', '浪潮核算部门的助记码没有和新中大部门编码保持一致');
                    return false;
                }
            });

        });

        /*项目所属部选择后带出浪潮业务单元end*/

        //项目核算内码设置为只读
        mstform.getItem('user_hsxmnm').userSetReadOnly(true);
        if (otype == $Otype.ADD) {
            mstform.queryById('Stat').setValue("zb");
            BatchBindCombox([mstform.getItem('Stat')]);
            /*所属项目部过滤start*/
            mstform.getItem('user_pc_dept').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
                var zz = mstform.getItem('CatPhId').getValue();
                mstform.getItem('user_pc_dept').setOutFilter({
                    parent_orgid: zz
                }) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
            });
            /*所属项目部过滤end*/

            /*所属项目部过滤start*/
            mstform.getItem('user_cwglbm').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
                var zz = mstform.getItem('PhIdFiOcode').getValue();
                mstform.getItem('user_cwglbm').setOutFilter({
                    parent_orgid: zz
                }) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
            });
            /*所属项目部过滤end*/

            // mstform.getItem('user_gs_hsbm').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
            // 	mstform.getItem('user_gs_hsbm').setClientSqlFilter(
            // 		'p_form0000000224_d.dwbh =(' + lcbm + ')');
            // });
        }
        mstform.on('dataready', function () {
            BatchBindCombox([mstform.getItem('user_cwbk')]);
            BatchBindCombox([mstform.getItem('user_pc_dept')]);
        });
    }
    if (mstform1) {
        //新增选择虚拟项目后，所属项目部不是必填项，但接口会筛选，调整为必填项   2025.11.20 界面设计已调整为必填
        //mstform1.getItem('user_pc_dept').userSetMustInput(true);
        if (otype == $Otype.ADD) {
            mstform1.queryById('Stat').setValue("zb");
            BatchBindCombox([mstform1.getItem('Stat')]);
        }
        mstform2.getItem('CountryId').addListener('helpselected', function () {
            var countryid = mstform2.getItem('CountryId').getValue();
            if (countryid == '1') {
                mstform2.getItem('ProvinceId').userSetMustInput(true);
                mstform2.getItem('CityId').userSetMustInput(true);
                mstform2.getItem('RegionId').userSetMustInput(true);
                mstform2.getItem('user_szjjfzgnq').userSetMustInput(true);

            } else {
                mstform2.getItem('ProvinceId').userSetMustInput(false);
                mstform2.getItem('CityId').userSetMustInput(false);
                mstform2.getItem('RegionId').userSetMustInput(false);
                mstform2.getItem('user_szjjfzgnq').userSetMustInput(false);
            }
        });
        if (schemeid == '221019013502') {
            mstform1.getItem('PcNo').userSetReadOnly(false);
            mstform1.getItem('user_ifnbfb').userSetReadOnly(true);
            mstform1.getItem('user_ifnbfb').setValue('01');

        } else {
            mstform1.getItem('user_ifnbfb').userSetReadOnly(true);
            mstform1.getItem('user_ifnbfb').setValue('02');
        }
        if (schemeid == '577191213000004') {
            mstform1.getItem('PcNo').userSetReadOnly(false);
            mstform1.getItem('user_ifnbfb').userSetReadOnly(true);
        }

        /*项目类型为研发项目的时候 隐藏一些字段start*/
        if (otype == $Otype.VIEW) {
            var PhIdType = mstform1.getItem("PhIdType").getValue();
            if (PhIdType == '224200929000001') {
                //风险级别设置为隐藏
                mstform1.getItem('RiskFlag').setVisible(false);
                //是否内部分包设置为隐藏
                mstform1.getItem('user_ifnbfb').setVisible(false);
                //默认财务组织设置为隐藏
                mstform1.getItem('PhIdFiOcode').setVisible(false);
                //涉及财务组织设置为隐藏
                mstform1.getItem('ProjectOrg').setVisible(false);
                //建设单位设置为隐藏
                mstform1.getItem('PhIdCompany').setVisible(false);
                //施工单位设置为隐藏
                mstform1.getItem('PhIdSgOrg').setVisible(false);
                //浪潮同步标志设置为隐藏
                mstform1.getItem('user_istbinspur').setVisible(false);
                //浪潮同步时间设置为隐藏
                mstform1.getItem('user_tbinspurtime').setVisible(false);
                //项目管控模式设置为隐藏
                mstform1.getItem('user_xmgkms').setVisible(false);
                //经营模式设置为隐藏
                mstform1.getItem('ManageMode').setVisible(false);
                //按项目建组织按钮设置为隐藏
                mstform1.getItem('OrgByProject').setVisible(false);
                //建筑用途设置为隐藏
                mstform1.getItem('PhidBuildType').setVisible(false);
                //业务类型设置为隐藏
                mstform1.getItem('user_ywlx').setVisible(false);
                //承揽方式设置为隐藏
                mstform1.getItem('user_clfs').setVisible(false);
                //项目性质设置为隐藏
                mstform1.getItem('user_xmxz').setVisible(false);
                //房产项目状态设置为隐藏
                mstform1.getItem('user_fc_xmzt').setVisible(false);
                //备案项目经理设置为隐藏
                mstform1.getItem('RecordManager').setVisible(false);
                //浪潮推送标志设置为隐藏
                mstform1.getItem('user_gs_tsbs').setVisible(false);
                //业主传真设置为隐藏
                mstform2.getItem('JobTax').setVisible(false);
                //业主代表电话设置为隐藏
                mstform2.getItem('JobPhone').setVisible(false);
                //建筑规模设置为隐藏
                mstform2.getItem('BuildingArea').setVisible(false);
                //单位设置为隐藏
                mstform2.getItem('Msunit').setVisible(false);
                //所属父级项目设置为隐藏
                mstform2.getItem('ProjectParentId').setVisible(false);
                //合同编号设置为隐藏
                mstform2.getItem('CntNo').setVisible(false);
                //合同类型设置为隐藏
                mstform2.getItem('ContractType').setVisible(false);
                //合同签订日期设置为隐藏
                mstform2.getItem('ContractorDate').setVisible(false);
                //币种设置为隐藏
                mstform2.getItem('CurrType').setVisible(false);
                //汇率设置为隐藏
                mstform2.getItem('ExchRate').setVisible(false);
                //合同金额设置为隐藏
                mstform2.getItem('CntAmtFc').setVisible(false);
                //本币合同金额设置为隐藏
                mstform2.getItem('CntAmt').setVisible(false);
                //工程合同备案号设置为隐藏
                mstform2.getItem('ConRecorde').setVisible(false);
                //劳动用工备案号设置为隐藏
                mstform2.getItem('WorkRecorde').setVisible(false);
                //资源需求清单录入截止时间设置为隐藏
                mstform2.getItem('Deadline').setVisible(false);
                //施工内容设置为隐藏
                //mstform2.getItem('user_sgnr').setVisible(false);
                //经度设置为隐藏
                mstform2.getItem('Longitude').setVisible(false);
                //维度标志设置为隐藏
                mstform2.getItem('Latitude').setVisible(false);
                //管理片区设置为隐藏
                //mstform2.getItem('ManageArea').setVisible(false);

            }

        }
        /*项目类型为研发项目的时候 隐藏一些字段end*/
        mstform1.getItem('user_sflsxm').addListener('change', function () {
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
        });

        //核算项目内码设置为只读
        mstform1.getItem('user_hsxmnm').userSetReadOnly(true);
        /*所属项目部过滤start*/
        mstform1.getItem('user_pc_dept').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
            var zz = mstform1.getItem('CatPhId').getValue();
            mstform1.getItem('user_pc_dept').setOutFilter({
                parent_orgid: zz
            }) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
        });
        /*所属项目部过滤end*/


        /*管理组织选择后清空所属项目部start*/
        mstform1.getItem('CatPhId').addListener('helpselected', function () {
            mstform1.getItem('user_pc_dept').setValue();
        });
        /*管理组织选择后清空所属项目部end*/
        /*项目所属部选择后带出浪潮业务单元start*/
        mstform1.getItem('user_pc_dept').addListener('helpselected', function () {
            var user_pc_dept = mstform1.getItem('user_pc_dept').getValue();

            execServer('ssxmb_bmywdy', {
                'dept': user_pc_dept
            }, function (res) {

                if (res.count > 0) {
                    var data = JSON.parse(res.data)
                    mstform1.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
                } else {
                    mstform1.getItem('user_lcywdy').setValue('');
                }
            });

            execServer('ssxmb_zjm', {
                'dept': user_pc_dept
            }, function (res) {
                if (res.count > 0) {
                    var data = JSON.parse(res.data)
                    mstform1.getItem('user_mnemCodeInAccDepart').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
                } else {
                    Ext.Msg.alert('提示', '浪潮核算部门的助记码没有和新中大部门编码保持一致');
                    return false;
                }
            });

        });

        /*项目所属部选择后带出浪潮业务单元end*/

        /*根据项目类型为研发项目隐藏必输只读一些字段start*/

        //项目类型选择后触发
        mstform1.getItem("PhIdType").addListener('helpselected', function () {
            var PhIdType = mstform1.getItem("PhIdType").getValue();
            console.log('PhIdType====================>', PhIdType)
            if (PhIdType == '224200929000001') {
                //项目类型变为只读
                mstform1.getItem('PhIdType').userSetReadOnly(true);
                //项目简称设置为必输
                mstform1.getItem('Ab').userSetMustInput(true);
                //风险级别设置为隐藏
                mstform1.getItem('RiskFlag').setVisible(false);
                //是否内部分包设置为隐藏
                mstform1.getItem('user_ifnbfb').setVisible(false);
                //是否内部分包设置为非必输
                mstform1.getItem('user_ifnbfb').userSetMustInput(false);
                //默认财务组织设置为隐藏
                mstform1.getItem('PhIdFiOcode').setVisible(false);
                //涉及财务组织设置为隐藏
                mstform1.getItem('ProjectOrg').setVisible(false);
                //建设单位设置为隐藏
                mstform1.getItem('PhIdCompany').setVisible(false);
                //建设单位设置为非必输
                mstform1.getItem('PhIdCompany').userSetMustInput(false);
                //施工单位设置为隐藏
                mstform1.getItem('PhIdSgOrg').setVisible(false);
                //施工单位设置为非必输
                mstform1.getItem('PhIdSgOrg').userSetMustInput(false);
                //浪潮同步标志设置为隐藏
                mstform1.getItem('user_istbinspur').setVisible(false);
                //浪潮同步时间设置为隐藏
                mstform1.getItem('user_tbinspurtime').setVisible(false);
                //项目金额设置为必输
                mstform1.getItem('ApproxContractFc').userSetMustInput(true);
                //项目金额改名为预计投入金额
                mstform1.getItem('ApproxContractFc').setFieldLabel('预计投入金额');
                //项目管控模式设置为隐藏
                mstform1.getItem('user_xmgkms').setVisible(false);
                //项目管控模式设置为非必输
                mstform1.getItem('user_xmgkms').userSetMustInput(false);
                //经营模式设置为隐藏
                mstform1.getItem('ManageMode').setVisible(false);
                //按项目建组织按钮设置为隐藏
                mstform1.getItem('OrgByProject').setVisible(false);
                //建筑用途设置为隐藏
                mstform1.getItem('PhidBuildType').setVisible(false);
                //业务类型设置为隐藏
                mstform1.getItem('user_ywlx').setVisible(false);
                //承揽方式设置为隐藏
                mstform1.getItem('user_clfs').setVisible(false);
                //承揽方式设置为非必输
                mstform1.getItem('user_clfs').userSetMustInput(false);
                //项目性质设置为隐藏
                mstform1.getItem('user_xmxz').setVisible(false);
                //项目性质设置为非必输
                mstform1.getItem('user_xmxz').userSetMustInput(false);
                //房产项目状态设置为隐藏
                mstform1.getItem('user_fc_xmzt').setVisible(false);
                //备案项目经理设置为隐藏
                mstform1.getItem('RecordManager').setVisible(false);
                //浪潮推送标志设置为隐藏
                mstform1.getItem('user_gs_tsbs').setVisible(false);
                //项目经理改成必输
                mstform1.getItem('ProjectManager').userSetMustInput(true);
                //项目经理改成负责人
                mstform1.getItem('ProjectManager').setFieldLabel('负责人');
                //管理组织改为实施单位
                mstform1.getItem('CatPhId').setFieldLabel('实施单位');
                //计划开工日期改为计划开始时间
                mstform1.getItem('StartDate').setFieldLabel('计划开始时间');
                //计划竣工日期改为计划完成时间
                mstform1.getItem('EndDate').setFieldLabel('计划完成时间');

                //业主传真设置为隐藏
                mstform2.getItem('JobTax').setVisible(false);
                //业主代表电话设置为隐藏
                mstform2.getItem('JobPhone').setVisible(false);
                //建筑规模设置为隐藏
                mstform2.getItem('BuildingArea').setVisible(false);
                //单位设置为隐藏
                mstform2.getItem('Msunit').setVisible(false);
                //所属父级项目设置为隐藏
                mstform2.getItem('ProjectParentId').setVisible(false);
                //合同编号设置为隐藏
                mstform2.getItem('CntNo').setVisible(false);
                //合同编号设置为非必输
                mstform2.getItem('CntNo').userSetMustInput(false);
                //合同类型设置为隐藏
                mstform2.getItem('ContractType').setVisible(false);
                //合同签订日期设置为隐藏
                mstform2.getItem('ContractorDate').setVisible(false);
                //币种设置为隐藏
                mstform2.getItem('CurrType').setVisible(false);
                //币种设置为非必输
                mstform2.getItem('CurrType').userSetMustInput(false);
                //汇率设置为隐藏
                mstform2.getItem('ExchRate').setVisible(false);
                //合同金额设置为隐藏
                mstform2.getItem('CntAmtFc').setVisible(false);
                //合同金额设置为非必输
                mstform2.getItem('CntAmtFc').userSetMustInput(false);
                //本币合同金额设置为隐藏
                mstform2.getItem('CntAmt').setVisible(false);
                //工程合同备案号设置为隐藏
                mstform2.getItem('ConRecorde').setVisible(false);
                //劳动用工备案号设置为隐藏
                mstform2.getItem('WorkRecorde').setVisible(false);
                //资源需求清单录入截止时间设置为隐藏
                mstform2.getItem('Deadline').setVisible(false);
                //项目概况设置必输项
                mstform2.getItem('GSituation').userSetMustInput(true);
                //施工内容设置为隐藏
                //mstform2.getItem('user_sgnr').setVisible(false);
                //施工内容设置为非必输
                //mstform2.getItem('user_sgnr').userSetMustInput(false);
                //经度设置为隐藏
                mstform2.getItem('Longitude').setVisible(false);
                //维度标志设置为隐藏
                mstform2.getItem('Latitude').setVisible(false);
                //管理片区设置为隐藏
                //mstform2.getItem('ManageArea').setVisible(false);
                mstform2.getItem('JobPhone').userSetMustInput(false);
            }

        });

        /*根据项目类型为研发项目隐藏必输只读一些字段end*/

        //生成项目编号
        execServer('pt.yfxm', {}, function (res) {
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
        mstform1.getItem('user_jzxm').setVisible(false);
        mstform1.getItem('user_kyxmzt').setVisible(false);
        mstform1.getItem('user_tjglyfxm').setVisible(false);
        mstform1.getItem('user_zdyflx').setVisible(false);

        // 数据加载时根据类型显示字段
        mstform1.on("dataready", function () {

            var PhIdType = mstform1.getItem("PhIdType").getValue();
            if (PhIdType == '224200929000001') {
                mstform1.getItem('user_jzxm').setVisible(true);
                mstform1.getItem('user_kyxmzt').setVisible(true);
                mstform1.getItem('user_tjglyfxm').setVisible(true);
                mstform1.getItem('user_zdyflx').setVisible(true);
            }
        });

        // 项目类型选择事件
        mstform1.getItem("PhIdType").addListener('helpselected', function () {
            var PhIdType = mstform1.getItem("PhIdType").getValue();

            // 研发项目显示字段
            if (PhIdType == '224200929000001') {
                mstform1.getItem('user_jzxm').setVisible(true);
                mstform1.getItem('user_kyxmzt').setVisible(true);
                mstform1.getItem('user_tjglyfxm').setVisible(true);
                mstform1.getItem('user_zdyflx').setVisible(true);
            } else {
                // 其他类型隐藏字段
                mstform1.getItem('user_jzxm').setVisible(false);
                mstform1.getItem('user_kyxmzt').setVisible(false);
                mstform1.getItem('user_tjglyfxm').setVisible(false);
                mstform1.getItem('user_zdyflx').setVisible(false);
            }


        });


    }

}

//保存前检测
function beforeSaveEdit() {
    var mstform = Ext.getCmp('formProjectTableMst'); //工程建设
    var mstform1 = Ext.getCmp('formProjectTableVirtProj'); //虚拟项目
    var flag = 0;

    /*自动生成项目立项状态编码start*/
    if (otype == $Otype.ADD) {
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
        execServer('hsxmnm', {}, function (res) {
            console.log("核算内码res:",res);
            if (res.status != 'success') {
                Ext.Msg.alert('提示', '服务端取数失败');
                return;
            } else if (res.count == 0) { //判断数组行数
                Ext.Msg.alert('提示', '项目立项状态编码失败');
                return;
            }
            if (res.count > 0) {
                var data = JSON.parse(res.data)
                var num = parseInt(data[0].extendObjects.hsxmnm) + 1
                console.log("核算内码:",num);
            }
            //判断是工程建设 还是虚拟项目
            if (mstform) {
                mstform.getItem('user_hsxmnm').setValue(num.toString());
            } else if (mstform1) {
                mstform1.getItem('user_hsxmnm').setValue(num.toString());
            }
            return;
        });
        execServer('user_gs_fjm', {}, function (res) {
            console.log("分级码res:",res);
            if (res.status != 'success') {
                Ext.Msg.alert('提示', '服务端取数失败');
                return;
            } else if (res.count == 0) { //判断数组行数
                Ext.Msg.alert('提示', '项目立项状态编码失败');
                return;
            }
            if (res.count > 0) {
                var data = JSON.parse(res.data)
                var num = parseInt(data[0].extendObjects.user_gs_fjm) + 1
                console.log("分级码:",num);
            }

            //判断是工程建设 还是虚拟项目
            if (mstform) {
                mstform.getItem('user_gs_fjm').setValue(num.toString());
            } else if (mstform1) {
                mstform1.getItem('user_gs_fjm').setValue(num.toString());
            }
            return;
        });
    }
    /*自动生成项目立项状态编码end*/

    if (otype == $Otype.ADD) {
        if (mstform) {
            /*判断项目编号，和项目名称字段是否有空格start*/
            var pcno = mstform.getItem('PcNo').getValue();
            var ProjectName = mstform.getItem('ProjectName').getValue();
            if (pcno.indexOf(" ") != -1) {
                Ext.Msg.alert('提示', '项目编码有空格');
                return false;
            }
            if (ProjectName.indexOf(" ") != -1) {
                Ext.Msg.alert('提示', '项目名称有空格');
                return false;
            }
            /*判断项目编号，和项目名称字段是否有空格end*/
            ProjectName = "'" + ProjectName + "'";
            execServer('duplicate', {
                'project_name': ProjectName
            }, function (res) {
                if (res.status != 'success') {
                    Ext.Msg.alert('提示', 'sql语句写法有错误，请检查');
                    return false;
                } else if (res.count == 0) {
                    flag = 1;
                    return true;
                } else {
                    Ext.Msg.alert('提示', '项目名称已存在');
                    return false;
                }

            });

        } else {
            /*判断项目编号，和项目名称字段是否有空格start*/
            var pcno = mstform1.getItem('PcNo').getValue();
            var ProjectName = mstform1.getItem('ProjectName').getValue();
            if (pcno.indexOf(" ") != -1) {
                Ext.Msg.alert('提示', '项目编码有空格');
                return false;
            }
            if (ProjectName.indexOf(" ") != -1) {
                Ext.Msg.alert('提示', '项目名称有空格');
                return false;
            }
            /*判断项目编号，和项目名称字段是否有空格end*/
            ProjectName = "'" + ProjectName + "'";
            execServer('duplicate', {
                'project_name': ProjectName
            }, function (res) {
                if (res.status != 'success') {
                    Ext.Msg.alert('提示', 'sql语句写法有错误，请检查');
                    return false;
                } else if (res.count == 0) {
                    flag = 1;
                    return true;
                } else {
                    Ext.Msg.alert('提示', '项目名称已存在');
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

}