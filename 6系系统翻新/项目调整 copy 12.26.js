function AllReady() {
	var mstform = Ext.getCmp('adjustmstCmpCfg');
	var mstform1 = Ext.getCmp('formProjectTableVirtProj');
	var mstform2 = Ext.getCmp('formProjectTableSummary');

	/**
			 //所在经济功能区根据省份过滤开始 
		mstform2.getItem('user_szjjfzgnq').on('beforetriggerclick', function() { //帮助窗口打开前事件
		  var ProvinceId = mstform2.getItem('ProvinceId').getValue()
		  mstform2.getItem('user_szjjfzgnq').setClientSqlFilter (" zj in (select zj from szjjfzgnq where csbm in (select csbm from szjjfzgnq where csbm ='"+ProvinceId+"' ) or zj='20250318021')");
		});
		//所在经济功能区根据省份过滤结束 
	*/


	if (otype == $Otype.VIEW || otype == $Otype.EDIT || otype == $Otype.ADD) {
		if (mstform) {


			mstform.getItem('FactStartDt').addListener('change', function () {    //业主调整日期 
				var FactStartDt = mstform.getItem('FactStartDt').getValue();//合同竣工日期
				var LimitTime = mstform.getItem('LimitTime').getValue();
				var newdate = new Date(FactStartDt.setDate(FactStartDt.getDate() + LimitTime));
				// mstform.getItem('user_jhjgrq').setValue(newdate);              
			});
			mstform.getItem('LimitTime').addListener('itemchanged', function () {    //合同工期
				var FactStartDt = mstform.getItem('FactStartDt').getValue();//计划开工
				var LimitTime = mstform.getItem('LimitTime').getValue();
				var newdate = new Date(FactStartDt.setDate(FactStartDt.getDate() + LimitTime));
				//mstform.getItem('user_jhjgrq').setValue(newdate);   //计划竣工           
			});



			mstform.getItem('user_yztzrq').addListener('itemchanged', function () {
				var EndDate = mstform.getItem('EndDate').getValue();
				var user_yztzrq = mstform.getItem('user_yztzrq').getValue();
				var newdate = new Date(EndDate.setDate(EndDate.getDate() + user_yztzrq));

				mstform.getItem('user_tzhjgrq').setValue(newdate);
				mstform.getItem('user_tzhzgq').setValue(Ext.Number.from(mstform.getItem('LimitTime').getValue(), 0) + Ext.Number.from(mstform.getItem('user_yztzrq').getValue(), 0));
			});

			mstform.getItem('EndDate').addListener('change', function () {
				var EndDate = mstform.getItem('EndDate').getValue();
				var user_yztzrq = mstform.getItem('user_yztzrq').getValue();
				var newdate = new Date(EndDate.setDate(EndDate.getDate() + user_yztzrq));
				mstform.getItem('user_tzhjgrq').setValue(newdate);
			});

			mstform.getItem('LimitTime').addListener('change', function () { //调整天数
				mstform.getItem('user_tzhzgq').setValue(Ext.Number.from(mstform.getItem('LimitTime').getValue(), 0) + Ext.Number.from(mstform.getItem('user_yztzrq').getValue(), 0));

			});



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

			var gclx1 = mstform.getItem('user_gclx1').getValue();
			if (gclx1 == '974191216000021' || gclx1 == '974191216000022' || gclx1 == '974191216000023' || gclx1 == '974191216000024'
				|| gclx1 == '974191216000025' || gclx1 == '974191216000030' || gclx1 == '224220303000006' || gclx1 == '974191216000029'
				|| gclx1 == '974191216000031' || gclx1 == '974191216000032'
			) {
				mstform.getItem('user_gclx2').userSetMustInput(false);

			} else {
				mstform.getItem('user_gclx2').userSetMustInput(true);
			}

		}
	}

	/*mstform.getItem('user_gclx1').on('helpselected', function(eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
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
	});*/



	if (otype == $Otype.ADD || otype == $Otype.EDIT) {
		if (mstform) {

			mstform.getItem('user_gclx1').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
				mstform.getItem('user_gclx1').setClientSqlFilter('grade = 1 and enable_status=1');
			});
			mstform.getItem('user_gclx2').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
				var user_gclx1 = mstform.getItem('user_gclx1').getValue();
				mstform.getItem('user_gclx2').setClientSqlFilter('grade = 2 and pphid =' + user_gclx1 + ' and enable_status=1');
			});
		}
	}


	if (otype == $Otype.ADD) {
		if (mstform) {
			var pc = mstform.queryById("PhIdOri").getValue();
			if (pc == null || pc == "" || pc == 0) {
				return false;
			};
			execServer("xmxx_xmtz", {
				aa: pc
			}, function (res) {
				if (res.count > 0) {
					const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
					mstform.getItem("user_pc_dept").setValue(data[0].extendObjects.user_pc_dept);
					mstform.getItem("user_xmbcl").setValue(data[0].extendObjects.user_xmbcl); //项目状态
					mstform.getItem("user_ifnbfb").setValue(data[0].extendObjects.user_ifnbfb); //实施方式
					mstform.getItem("user_wgrq").setValue(data[0].extendObjects.user_wgrq); //经营方式
					mstform.getItem("user_lcywdy").setValue(data[0].extendObjects.user_lcywdy); //建设模式
					mstform.getItem("user_baxmjl").setValue(data[0].extendObjects.user_baxmjl); //资金来源
					mstform.getItem("user_cbfs").setValue(data[0].extendObjects.user_cbfs); //资金来源
					mstform.getItem("user_mnemCodeInAccDepart").setValue(data[0].extendObjects.user_mnemcodeinaccdepart); //浪潮核算部门助记码
					mstform.getItem("user_sfhzjy").setValue(data[0].extendObjects.user_sfhzjy); //是否合作经营
					mstform.getItem("user_sshy").setValue(data[0].extendObjects.user_sshy); //所属行业
					mstform.getItem("user_hyxz").setValue(data[0].extendObjects.user_hyxz); //行业性质
					mstform.getItem("user_clfs").setValue(data[0].extendObjects.user_clfs); //承揽方式(财务)
					mstform.getItem("user_gs_cybk").setValue(data[0].extendObjects.user_gs_cybk); //产业板块(财务)
					mstform.getItem("user_xmgkms").setValue(data[0].extendObjects.user_xmgkms); //项目管控模式
					mstform.getItem("user_cwbk").setValue(data[0].extendObjects.user_cwbk); //财务辅助板块
					mstform.getItem("user_enr").setValue(data[0].extendObjects.user_enr); //财务辅助板块
					mstform.getItem("user_gclx1").setValue(data[0].extendObjects.user_gclx1); //财务辅助板块
					mstform.getItem("user_gclx2").setValue(data[0].extendObjects.user_gclx2); //财务辅助板块
					mstform.getItem("PhIdType").setValue(data[0].extendObjects.user_gclx1); //财务辅助板块
					mstform.getItem("user_yztzrq").setValue(data[0].extendObjects.user_yztzrq); //业主调整日期
					mstform.getItem("user_tzhjgrq").setValue(data[0].extendObjects.user_tzhjgrq); //调整后竣工日期
					mstform.getItem("user_tzhzgq").setValue(data[0].extendObjects.user_tzhzgq); //调整后总工期
					mstform.getItem("user_tsxmmc").setValue(data[0].extendObjects.user_tsxmmc); //特殊项目名称
					mstform.getItem("user_cjms").setValue(data[0].extendObjects.user_cjms); //承建模式
					mstform.getItem("user_jfdw").setValue(data[0].extendObjects.user_jfdw); //甲方单位
					mstform.getItem("user_sfsczy").setValue(data[0].extendObjects.user_sfsczy); //是否上报中冶
					mstform.getItem("user_sbzysj").setValue(data[0].extendObjects.user_sbzysj); //上报中冶时间
					mstform.getItem("user_sftrj").setValue(data[0].extendObjects.user_sftrj); //甲方单位
					mstform.getItem("PhIdFiOcode").setValue(data[0].extendObjects.phidfiocode); //上报中冶时间
					mstform.getItem("user_cwglbm").setValue(data[0].extendObjects.user_cwglbm); //甲方单位
					mstform.getItem("user_sbjzdxm").setValue(data[0].extendObjects.user_sbjzdxm); //省部级重点项目
					//mstform.getItem("user_szjjfzgnq").setValue(data[0].extendObjects.["user_szjjfzgnq"]); //所属经济功能区
					BatchBindCombox([mstform.getItem("user_jfdw")]);
					mstform2.getItem("JobPhone").setValue(data[0].extendObjects.job_phone); //enr
					mstform.getItem("user_baxmjl").setValue(data[0].extendObjects.record_manager); //甲方单位
				};
				BatchBindCombox([
					//mstform.getItem("user_szjjfzgnq"),
					mstform.getItem("user_pc_dept"),
					mstform.getItem("user_baxmjl"),
					mstform.getItem("user_xmbcl"),
					mstform.getItem("user_ifnbfb"),
					mstform.getItem("user_wgrq"),
					mstform.getItem("user_lcywdy"),
					mstform.getItem("user_baxmjl"),
					mstform.getItem("user_cbfs"),
					mstform.getItem("user_sshy"),
					mstform.getItem("user_hyxz"),
					mstform.getItem("user_clfs"),
					mstform.getItem("user_gs_cybk"),
					mstform.getItem("user_cwbk"),
					mstform.getItem("user_gclx1"),
					mstform.getItem("user_gclx2"),
					mstform.getItem("user_enr"),
					mstform.getItem("user_sbzysj"),
					mstform.getItem("PhIdFiOcode"),
					mstform.getItem("user_cwglbm"),
					mstform.getItem("user_sbjzdxm")
				]);

			});
		}
	}
	//工程建设
	if (mstform) {
		debugger;
		/*所属项目部选择前触发start*/
		mstform.getItem('user_pc_dept').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
			var cc = mstform.getItem('CatPhId').getValue();
			mstform.getItem('user_pc_dept').setOutFilter({
				parent_orgid: cc
			});
		})
		/*所属项目部选择后触发end*/
		/*项目所属部选择后带出浪潮业务单元start*/
		mstform.getItem('user_pc_dept').addListener('helpselected', function () {
			var user_pc_dept = mstform.getItem('user_pc_dept').getValue();
			//浪潮业务单元
			execServer('ssxmb_bmywdy', {
				'dept': user_pc_dept
			}, function (res) {
				if (res.count > 0) {
					const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
					console.log('data================>', data)
					mstform.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
				} else {
					mstform.getItem('user_lcywdy').setValue(null);
				}
			});

			//助记码
			execServer('ssxmb_zjm', {
				'dept': user_pc_dept
			}, function (res) {
				if (res.count > 0) {
					const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
					console.log('data================>', data)
					mstform.getItem('user_mnemCodeInAccDepart').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
				} else {
					Ext.Msg.alert('提示', '浪潮核算部门的助记码没有和新中大部门编码保持一致');
					return false;
				}
			});

		});
		/*项目所属部选择后带出浪潮业务单元end*/

		/*所属项目部过滤start*/
		mstform.getItem('user_cwglbm').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
			var zz = mstform.getItem('PhIdFiOcode').getValue();
			mstform.getItem('user_cwglbm').setOutFilter({
				parent_orgid: zz
			}) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
		});
	}


	//虚拟项目
	if (mstform1) {
		/*项目所属部选择后带出浪潮业务单元start*/
		mstform1.getItem('user_pc_dept').addListener('helpselected', function () {
			var user_pc_dept = mstform1.getItem('user_pc_dept').getValue();

			execServer('ssxmb_bmywdy', {
				'dept': user_pc_dept
			}, function (res) {
				if (res.count > 0) {
					const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
					console.log('data================>', data)
					mstform1.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
				} else {
					mstform1.getItem('user_lcywdy').setValue('');
				}
			});

			//助记码
			execServer('ssxmb_zjm', {
				'dept': user_pc_dept
			}, function (res) {
				if (res.count > 0) {
					const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
					console.log('data================>', data)
					mstform1.getItem('user_mnemCodeInAccDepart').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
				} else {
					Ext.Msg.alert('提示', '浪潮核算部门的助记码没有和新中大部门编码保持一致');
					return false;
				}
			});

		});
		/*所属项目部选择前触发start*/
		mstform1.getItem('user_pc_dept').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
			var cc = mstform1.getItem('CatPhId').getValue();
			mstform1.getItem('user_pc_dept').setOutFilter({
				parent_orgid: cc
			});
		})
		/*所属项目部选择后触发end*/
	}
	/*项目所属部选择后带出浪潮业务单元end*/

	//科研项目显示字段，否则隐藏
	if (otype == $Otype.ADD || otype == $Otype.EDIT || otype == $Otype.VIEW) {

		var PhIdType = mstform1.getItem("PhIdType").getValue();
		if (PhIdType == '224200929000001') {
			mstform1.getItem('user_jzxm').setVisible(true);
			mstform1.getItem('user_kyxmzt').setVisible(true);
			mstform1.getItem('user_tjglyfxm').setVisible(true);
			mstform1.getItem('user_zdyflx').setVisible(true);
		}
		else {
			mstform1.getItem('user_jzxm').setVisible(false);
			mstform1.getItem('user_kyxmzt').setVisible(false);
			mstform1.getItem('user_tjglyfxm').setVisible(false);
			mstform1.getItem('user_zdyflx').setVisible(false);
		}
	}
}