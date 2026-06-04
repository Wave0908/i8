function AllReady() {
	var mstform = Ext.getCmp('BasicInfoForm');
	var dgrid = Ext.getCmp('HoldPostInfolist');
	//教育经历
	mstform.getItem('EmpType').userSetReadOnly(true);
  	mstform.getItem('AdmClass').userSetReadOnly(true);
  	mstform.getItem('user_gbcj').userSetReadOnly(true);
	if(otype == $Otype.ADD || otype == $Otype.EDIT) {
      
       //工种选择前必须先选 最高技能等级与技能等级类型开始 
      mstform.getItem('JobClass').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) {
			var lx = mstform.getItem('SkillType').getValue();
			if(Ext.isEmpty(lx)) {
				Ext.Msg.alert('提示', '请先填写最高技能等级与技能等级类型');
				return false;
			}
		});
		//工种选择前必须先选 最高技能等级与技能等级类型开结束
		mstform.getItem('user_zygzzl').on('beforetriggerclick', function() { //帮助窗口打开前事件
			var user_zygzdl = mstform.getItem('user_zygzdl').getValue()
			mstform.getItem('user_zygzzl').setClientSqlFilter(" 中类序号 in (select 中类序号 from zygzdzlx where 大类序号 in (select 大类序号 from dl_zygz where 大类序号 ='"+user_zygzdl+"' )) ");
		});

		mstform.getItem('user_zygzxl').on('beforetriggerclick', function() { //帮助窗口打开前事件
			var user_zygzzl = mstform.getItem('user_zygzzl').getValue()
			mstform.getItem('user_zygzxl').setClientSqlFilter(" 小类序号 in (select 小类序号 from zygzdzlx where 中类序号 in (select 中类序号 from zy_zygz where 中类序号 ='"+user_zygzzl+"' )) ");
		});

		mstform.getItem('user_zzgzxxl').on('beforetriggerclick', function() { //帮助窗口打开前事件
			var user_zygzxl = mstform.getItem('user_zygzxl').getValue()
			mstform.getItem('user_zzgzxxl').setClientSqlFilter(" 细类序号 in (select 细类序号 from zygzdzlx where 小类序号 in (select 小类序号 from xl_zygz where 小类序号 ='"+user_zygzxl+"' )) ");
		});

		mstform.getItem('SkillData').addListener('helpselected', function() {
			var skilldata = mstform.getItem('SkillData').getValue();
			if(skilldata == '0') {
				mstform.getItem('user_zygzdl').userSetMustInput(false);
				mstform.getItem('user_zygzzl').userSetMustInput(false);
				mstform.getItem('user_zygzxl').userSetMustInput(false);
				mstform.getItem('user_zzgzxxl').userSetMustInput(false);
                mstform.getItem('JobClass').userSetMustInput(false);
			} else {
				mstform.getItem('user_zygzdl').userSetMustInput(true);
				mstform.getItem('user_zygzzl').userSetMustInput(true);
				mstform.getItem('user_zygzxl').userSetMustInput(true);
				mstform.getItem('user_zzgzxxl').userSetMustInput(true);
                mstform.getItem('JobClass').userSetMustInput(true);
			}
		});

		mstform.getItem('user_zygzdl').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) {
			var SkillData = mstform.getItem('SkillData').getValue();
			if(!SkillData) {
				Ext.Msg.alert('提示', '请先填写最高技能等级');
				return false;
			}
		});
		mstform.getItem('user_zygzzl').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) {
			var user_zygzdl = mstform.getItem('user_zygzdl').getValue();
			if(!user_zygzdl) {
				Ext.Msg.alert('提示', '请先填写职业（工种）大类');
				return false;
			}
		});
		mstform.getItem('user_zygzxl').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) {
			var user_zygzzl = mstform.getItem('user_zygzzl').getValue();
			if(!user_zygzzl) {
				Ext.Msg.alert('提示', '请先填写职业（工种）中类');
				return false;
			}
		});
		mstform.getItem('user_zzgzxxl').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) {
			var user_zygzxl = mstform.getItem('user_zygzxl').getValue();
			if(!user_zygzxl) {
				Ext.Msg.alert('提示', '请先填写职业（工种）小类');
				return false;
			}
		});


     /*现岗位职业工种开始*/
        mstform.getItem('user_zygzzl1').on('beforetriggerclick', function() { //帮助窗口打开前事件
			var user_zygzdl = mstform.getItem('user_zygzdl1').getValue()
			mstform.getItem('user_zygzzl1').setClientSqlFilter(" 中类序号 in (select 中类序号 from zygzdzlx where 大类序号 in (select 大类序号 from dl_zygz where 大类序号 ='"+user_zygzdl+"' )) ");
		});

		mstform.getItem('user_zygzxl1').on('beforetriggerclick', function() { //帮助窗口打开前事件
			var user_zygzzl = mstform.getItem('user_zygzzl1').getValue()
			mstform.getItem('user_zygzxl1').setClientSqlFilter(" 小类序号 in (select 小类序号 from zygzdzlx where 中类序号 in (select 中类序号 from zy_zygz where 中类序号 ='"+user_zygzzl+"' )) ");
		});

		mstform.getItem('user_zygzxil1').on('beforetriggerclick', function() { //帮助窗口打开前事件
			var user_zygzxl = mstform.getItem('user_zygzxl1').getValue()
			mstform.getItem('user_zygzxil1').setClientSqlFilter(" 细类序号 in (select 细类序号 from zygzdzlx where 小类序号 in (select 小类序号 from xl_zygz where 小类序号 ='"+user_zygzxl+"' )) ");
		});

		mstform.getItem('user_zgjndj1').addListener('helpselected', function() {
			var skilldata = mstform.getItem('user_zgjndj1').getValue();
			if(skilldata == '0') {
				mstform.getItem('user_zygzdl1').userSetMustInput(false);
				mstform.getItem('user_zygzxl1').userSetMustInput(false);
				mstform.getItem('user_zygzzl1').userSetMustInput(false);
				mstform.getItem('user_zygzxil1').userSetMustInput(false);
                mstform.getItem('user_zygzxgw').userSetMustInput(false);
			} else {
				mstform.getItem('user_zygzdl1').userSetMustInput(true);
				mstform.getItem('user_zygzxl1').userSetMustInput(true);
				mstform.getItem('user_zygzzl1').userSetMustInput(true);
				mstform.getItem('user_zygzxil1').userSetMustInput(true);
                mstform.getItem('user_zygzxgw').userSetMustInput(true);
			}
		});

		mstform.getItem('user_zygzdl1').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) {
			var SkillData = mstform.getItem('user_zgjndj1').getValue();
			if(!SkillData) {
				Ext.Msg.alert('提示', '请先填写最高技能等级');
				return false;
			}
		});
		mstform.getItem('user_zygzzl1').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) {
			var user_zygzdl = mstform.getItem('user_zygzdl1').getValue();
			if(!user_zygzdl) {
				Ext.Msg.alert('提示', '请先填写职业（工种）大类');
				return false;
			}
		});
		mstform.getItem('user_zygzxl1').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) {
			var user_zygzzl = mstform.getItem('user_zygzzl1').getValue();
			if(!user_zygzzl) {
				Ext.Msg.alert('提示', '请先填写职业（工种）中类');
				return false;
			}
		});
		mstform.getItem('user_zygzxil1').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) {
			var user_zygzxl = mstform.getItem('user_zygzxl1').getValue();
			if(!user_zygzxl) {
				Ext.Msg.alert('提示', '请先填写职业（工种）小类');
				return false;
			}
		});
      
      
      

      //选择工种带出职业大类、中类、小类、细类开始
      mstform.getItem('JobClass').addListener('helpselected', function() {
            var JobClass = mstform.getItem('JobClass').getValue();
            execServer('gz20250311', {
                'phid': JobClass
            }, function(res) {
				if (!Ext.isEmpty(res) && res.data[0]) {
                    mstform.getItem('user_zygzdl').setValue(res.data[0].dlbm);
                  BatchBindCombox([mstform.getItem('user_zygzdl')]);
                    mstform.getItem('user_zygzzl').setValue(res.data[0].zlbm);
                  BatchBindCombox([mstform.getItem('user_zygzzl')]);
                    mstform.getItem('user_zygzxl').setValue(res.data[0].xiaolbm);
                  BatchBindCombox([mstform.getItem('user_zygzxl')]);
                    mstform.getItem('user_zzgzxxl').setValue(res.data[0].xilbm);
                  BatchBindCombox([mstform.getItem('user_zzgzxxl')]);
                } 
            });
        })
 //选择工种带出职业大类、中类、小类、细类结束
      //选择工种（现岗位）带出职业大类、中类、小类、细类开始
	mstform.getItem('user_zygzxgw').addListener('helpselected', function() {
            var user_zygzxgw = mstform.getItem('user_zygzxgw').getValue();
            execServer('gz20250311', {
                'phid': user_zygzxgw
            }, function(res) {
                if (!Ext.isEmpty(res) && res.data[0]) {
                    mstform.getItem('user_zygzdl1').setValue(res.data[0].dlbm);
                  BatchBindCombox([mstform.getItem('user_zygzdl1')]);
                    mstform.getItem('user_zygzzl1').setValue(res.data[0].zlbm);
                  BatchBindCombox([mstform.getItem('user_zygzzl1')]);
                    mstform.getItem('user_zygzxl1').setValue(res.data[0].xiaolbm);
                  BatchBindCombox([mstform.getItem('user_zygzxl1')]);
                    mstform.getItem('user_zygzxil1').setValue(res.data[0].xilbm);
                  BatchBindCombox([mstform.getItem('user_zygzxil1')]);
                } 
            });
        })
       //选择工种（现岗位）带出职业大类、中类、小类、细类结束
      
      
        /*现岗位职业工种结束*/
		/*政治面貌为群众和团员，无入党时间start*/
		mstform.getItem('Political').addListener('change', function() {
			var Political = mstform.getItem('Political').getValue();
			if(Political == '588' || Political == '586' || Political == '313191218000003') {
				mstform.getItem('user_rdsj').setVisible('');
				mstform.getItem('user_rdsj').setVisible(false);
				mstform.getItem('user_rdsj').userSetMustInput(false);
			} else {
				mstform.getItem('user_rdsj').setVisible(true);
				mstform.getItem('user_rdsj').userSetMustInput(true);
			}
		});

		/*政治面貌为群众和团员，无入党时间end*/

		mstform.getItem('Wrkdt').addListener('change', function() {
			var newValue = mstform.getItem('Wrkdt').getValue();
			var age = 0;
			if(newValue != '' && newValue != null) {
				var age = 0;
				var date = new Date();
				var year = newValue.getFullYear();
				var nowYear = date.getFullYear();
				age = nowYear - year;
			}
		})
		//标志修改事件
		if(otype == $Otype.EDIT) {
			setTimeout(function() {
				mstform.getItem('user_lcbpbz').setValue('0');
			}, 5000)

			mstform.getItem('AdmClass').addListener('helpselected', function() {

				mstform.getItem('user_lcbpbz').setValue('1');

			});
			mstform.getItem('EmpType').addListener('helpselected', function() {

				mstform.getItem('user_lcbpbz').setValue('1');

			});
			mstform.getItem('user_gbcj').addListener('helpselected', function() {

				mstform.getItem('user_lcbpbz').setValue('1');

			});
		}
	}

	/*修改企业员工库的任职类型start*/
	if(otype == $Otype.ADD || otype == $Otype.EDIT) {

		dgrid.on('load', function() {
			dgrid.getColumn('SubDegree').renderer = function(val) {

				var temp;
				switch(val) {
					case 1:
						temp = '高';
						break;
					case 2:
						temp = '中';
						break;
					case 3:
						temp = '低';
						break;
					default:
						temp = '';
				}
				return temp;
			}

		})

	}
	/*修改企业员工库的任职类型end*/

	function AllReady() {
		var mstform = Ext.getCmp('BasicInfoForm');
		var dgrid = Ext.getCmp('HoldPostInfolist');
		//教育经历
		mstform.getItem('user_lcbm').userSetReadOnly(true);
		if(otype == $Otype.ADD || otype == $Otype.EDIT) {

			/*政治面貌为群众和团员，无入党时间start*/
			mstform.getItem('Political').addListener('change', function() {
				var Political = mstform.getItem('Political').getValue();
				if(Political == '588' || Political == '586' || Political == '313191218000003') {
					mstform.getItem('user_rdsj').setVisible(false);
					mstform.getItem('user_rdsj').userSetMustInput(false);
				} else {
					mstform.getItem('user_rdsj').setVisible(true);
					mstform.getItem('user_rdsj').userSetMustInput(true);
				}
			});

			/*政治面貌为群众和团员，无入党时间end*/

			mstform.getItem('Wrkdt').addListener('change', function() {
				var newValue = mstform.getItem('Wrkdt').getValue();
				var age = 0;
				if(newValue != '' && newValue != null) {
					var age = 0;
					var date = new Date();
					var year = newValue.getFullYear();
					var nowYear = date.getFullYear();
					age = nowYear - year;
				}
			})
			//标志修改事件
			if(otype == $Otype.EDIT) {
				setTimeout(function() {
					mstform.getItem('user_lcbpbz').setValue('0');
				}, 5000)
				
				mstform.getItem('AdmClass').addListener('helpselected', function() {

					mstform.getItem('user_lcbpbz').setValue('1');

				});
				mstform.getItem('EmpType').addListener('helpselected', function() {

					mstform.getItem('user_lcbpbz').setValue('1');

				});
				mstform.getItem('user_gbcj').addListener('helpselected', function() {

					mstform.getItem('user_lcbpbz').setValue('1');

				});
			}
		}

		/*修改企业员工库的任职类型start*/
		if(otype == $Otype.ADD || otype == $Otype.EDIT) {

			dgrid.on('load', function() {
				dgrid.getColumn('SubDegree').renderer = function(val) {

					var temp;
					switch(val) {
						case 1:
							temp = '高';
							break;
						case 2:
							temp = '中';
							break;
						case 3:
							temp = '低';
							break;
						default:
							temp = '';
					}
					return temp;
				}

			})

		}
		/*修改企业员工库的任职类型end*/

	}

}