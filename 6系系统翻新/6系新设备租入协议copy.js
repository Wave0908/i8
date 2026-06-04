function AllReady() {
	var mstform = Ext.getCmp('CntM10');
	var Toolbar = Ext.getCmp('toolbar');
	var dgrid = Ext.getCmp('CntD10');
	var dstore = dgrid.store;
	//浪潮乙方设置为只读
	mstform.getItem('user_lcyf').userSetReadOnly(true);
  	mstform.getItem('user_cwxtsfcz').setValue('1');
  	mstform.getItem('IsPayOverCntSum').setValue('0');
  
  
    mstform.getItem('PayOverPrecent').setValue('1.1');  
    mstform.getItem('PayOverPrecent').userSetReadOnly(true);
  
  
      //菜单栏增加复制功能
	var Toolbar = Ext.getCmp('toolbar');
	if (!Ext.isEmpty(Toolbar)) {

		Toolbar.insert(1, {
			itemId: "copy",
			text: "复制",
			width: this.itemWidth,
			iconCls: "icon-New"
		});

		Toolbar.items.get('copy').on('click', function() {

			//获取表体数据
			var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
			var user_sblx = a[0].get('user_sblx');
			for (var i = 1; i < a.length; i++) {
				a[i].set('user_sblx', user_sblx);
			}
		});
	}
  
  //mstform.getItem('XYCntSumAmt').userSetReadOnly(false);
  	/*根据支付比例带出同步初始比例start*/
	mstform.getItem('Zfbl').addListener('itemchanged', function() {
		var Zfbl = mstform.getItem('Zfbl').getValue();
		mstform.getItem('user_tzhdfkbl').setValue(Zfbl);	
	});
	/*根据支付比例带出同步初始比例end*/

  
      /*预付款金额调整*/
   mstform.getItem('user_yfkje').addListener('itemchanged', function() {
   var XYCntSumAmt = mstform.getItem('XYCntSumAmt').getValue();
   var yfkbl = mstform.getItem('user_yfkje').getValue();
 if(XYCntSumAmt!=''){
      mstform.getItem('user_yfkbl').setValue(yfkbl/XYCntSumAmt); 
    }
    else{
      mstform.getItem('user_yfkbl').setValue(''); 
    }	
 });
    /*含税金额调整*/
 mstform.getItem('XYCntSumAmt').addListener('change', function() {
   var XYCntSumAmt = mstform.getItem('XYCntSumAmt').getValue();
   var yfkbl = mstform.getItem('user_yfkje').getValue();
   if(XYCntSumAmt!=''){
	mstform.getItem('user_yfkbl').setValue(yfkbl/XYCntSumAmt); 
  }
  else{
	mstform.getItem('user_yfkbl').setValue(''); 
  }
 });
  
  
  
	/*浪潮返回标志为4申请取消审核可点击start*/
  if(otype == $Otype.ADD) {

    mstform.getItem('BillNo').addListener('itemchanged', function() {
      var Billno = mstform.getItem('BillNo').getValue();
     
        var bill_no=Billno.replace(/\s*/g, "")
   
          mstform.getItem('BillNo').setValue(bill_no);
         
        execServer('htbhss', {    
        'bill_no':bill_no},function(res){
           var htbh=res.data[0].ht
          if (htbh == 1) {
               Ext.MessageBox.show({
            title: '提示',
            msg: "存在重复编码",
            modal: false
          });
          flag = 1;
          return false;
          }
        } )  
      });
	}
	mstform.on('dataready', function(e) {
		var Toolbar = Ext.getCmp('toolbar');
		var user_istbinspur = mstform.getItem('user_istbinspur').getValue();
		if(user_istbinspur == '4') {
			Toolbar.getComponent('applycheck').forceenable();
		} 
         else if(mstform.getItem('user_insconid').getValue().length > 0) {
			Toolbar.getComponent('applycheck').forceenable();
		} else {
			Toolbar.getComponent('applycheck').forcedisable();
		}
	});

	/*浪潮返回标志为4申请取消审核可点击end*/
  	/*隐藏三个分组start*/
	document.getElementsByTagName('fieldset')[1].style.visibility = 'hidden';
	document.getElementsByTagName('fieldset')[2].style.visibility = 'hidden';
	document.getElementsByTagName('fieldset')[4].style.visibility = 'hidden';
	/*隐藏三个分组end*/
  /*财务系统是否存在为是的时候必输，为否的时候不必输start*/
	mstform.getItem('user_cwxtsfcz').addListener('change', function() {
		var user_cwxtsfcz = mstform.getItem('user_cwxtsfcz').getValue();
		if(user_cwxtsfcz=='1'){
	      mstform.getItem('user_insconcode').userSetMustInput(true);
           mstform.getItem('user_insconid').userSetMustInput(true);
           mstform.getItem('user_insconname').userSetMustInput(true);
          }else {
          mstform.getItem('user_insconcode').userSetMustInput(false);
          mstform.getItem('user_insconid').userSetMustInput(false);
         mstform.getItem('user_insconname').userSetMustInput(false);
         }
	});
	/*财务系统是否存在为是的时候必输，为否的时候不必输end*/

if (mstform.getItem('user_insconid').getValue().length > 0) { 
       Toolbar.getComponent('applycheck').forcedisable();
       }else {
      Toolbar.getComponent('applycheck').forceenable();
       }
  
    if (mstform.getItem('user_cwxtsfcz').getValue()=='2') { 
  
           mstform.getItem('user_insconcode').userSetMustInput(false);
           mstform.getItem('user_insconid').userSetMustInput(false);
           mstform.getItem('user_insconname').userSetMustInput(false);
          }else {
          mstform.getItem('user_insconcode').userSetMustInput(true);
          mstform.getItem('user_insconid').userSetMustInput(true);
         mstform.getItem('user_insconname').userSetMustInput(true);
         }
  

	
 
	/*乙方单位为组织的时候浪潮甲方为必输切不只读start*/
	mstform.getItem('PhidSenComp').addListener('helpselected', function() {

		var PhidSenComp = mstform.getItem('PhidSenComp').getValue();
		execServer('contract_CorrUnit', {
			'phid': PhidSenComp
		}, function(res) {
			if(res.status != 'success') {
				Ext.MessageBox.show({
					title: '提示',
					msg: "sql有误",
					modal: false
				});

			}

			if(res.data.length == 1) {
				if(res.data[0].type == 'org') {
					//浪潮甲方设置为只读
					mstform.getItem('user_lcyf').userSetReadOnly(false);
					mstform.getItem('user_lcyf').userSetMustInput(true);
				} else {
					mstform.getItem('user_lcyf').userSetReadOnly(true);
					mstform.getItem('user_lcyf').userSetMustInput(false);
				}
			}

		});

	});

	/*乙方单位为组织的时候浪潮甲方为必输切不只读end*/
  /*输入浪潮合同编码带出浪潮合同ID*/
 mstform.getItem('user_insconcode').addListener('itemchanged', function () { 
    var user_insconcode = "'" + mstform.getItem('user_insconcode').getValue() + "'";
     execServer('user_insconcode', {
       'user_insconcode': user_insconcode
     }, function (res) {
      var data=res.data
       if (data.length == 0) { 
        mstform.getItem('user_insconid').setValue('');
         mstform.getItem('user_insconname').setValue('');
       } else
       { mstform.getItem('user_insconid').setValue(res.data[0].htnm);
       mstform.getItem('user_insconname').setValue(res.data[0].htmc);}
      
       
     });
     
   });
   
   /*管理组织选择后清空所属项目部start*/
   mstform.getItem('PhidPc').addListener('helpselected', function() {
   	var PhidPc = mstform.getItem('PhidPc').getValue()
   	execServer('xmxxdcglzssmb', {
   		'phid': PhidPc
   	}, function(res) {
   		if(res.data[0]) {
   			mstform.getItem('user_lcglzz').setValue(res.data[0].user_lcglzz);
   			mstform.getItem('user_lcssxmb').setValue(res.data[0].user_lcssxmb);
   			BatchBindCombox([mstform.getItem('user_lcglzz')]);
   			BatchBindCombox([mstform.getItem('user_lcssxmb')]);
   		} else {
   			Ext.Msg.alert('提示', '项目信息没有管理组织和所属项目部');
   			return false;
   		}
   	});
   	
   	var user_lcssxmb = mstform.getItem('user_lcssxmb').getValue();	
   	
   	execServer('ssxmb_bmywdy', {
   		'dept': user_lcssxmb
   	}, function(res) {
   		if(res.data[0]) {
   			mstform.getItem('user_lcywdy').setValue(res.data[0].user_lcywdy);
   		} else {
   			Ext.Msg.alert('提示', '请先维护部门业务单元对照表');
   			return false;
   		}
   	});
   		
   	execServer('ssxmb_zjm', {
   		'dept': user_lcssxmb
   	}, function(res) {
   		if(res.data[0]) {
   			mstform.getItem('user_lchsbmzjm').setValue(res.data[0].user_mnemCodeInAccDepart);
   		} else {
   			Ext.Msg.alert('提示', '浪潮核算部门的助记码没有和新中大部门编码保持一致');
   			return false;
   		}
   	});
   });
   /*管理组织选择后清空所属项目部end*/
   
   /*管理组织选择后清空所属项目部start*/
   mstform.getItem('user_lcglzz').addListener('helpselected', function() {
   	mstform.getItem('user_lcssxmb').setValue();		
   });
   /*管理组织选择后清空所属项目部end*/
   
   mstform.getItem('user_lcssxmb').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
   	var zz = mstform.getItem('user_lcglzz').getValue();
   	mstform.getItem('user_lcssxmb').setOutFilter({
   		parent_orgid: zz
   	}) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
   });
   
   /*项目所属部选择后带出浪潮业务单元start*/
   mstform.getItem('user_lcssxmb').addListener('helpselected', function() {
   	var user_lcssxmb = mstform.getItem('user_lcssxmb').getValue();
   
   	execServer('ssxmb_bmywdy', {
   		'dept': user_lcssxmb
   	}, function(res) {
   		if(res.data[0]) {
   			mstform.getItem('user_lcywdy').setValue(res.data[0].user_lcywdy);
   		} else {
   			Ext.Msg.alert('提示', '请先维护部门业务单元对照表');
   			return false;
   		}
   	});
   
   	execServer('ssxmb_zjm', {
   		'dept': user_lcssxmb
   	}, function(res) {
   		if(res.data[0]) {
   			mstform.getItem('user_lchsbmzjm').setValue(res.data[0].user_mnemCodeInAccDepart);
   		} else {
   			Ext.Msg.alert('提示', '浪潮核算部门的助记码没有和新中大部门编码保持一致');
   			return false;
   		}
   	});
   
   });
   
   /*项目所属部选择后带出浪潮业务单元end*/
   /*是否执行框架选择是出现后边内容start*/
   mstform.getItem('user_zxkj').setVisible(false);
    mstform.getItem('user_gydq').setVisible(false);
    mstform.getItem('user_gydqss').setVisible(false);
    mstform.getItem('user_sfzxkj').on('change', function (eOp, res) {
        var user_sfzxkj = mstform.getItem('user_sfzxkj').getValue();
        if (user_sfzxkj== 1) {
            mstform.getItem('user_zxkj').setVisible(true);
            mstform.getItem('user_gydq').setVisible(true);
            mstform.getItem('user_gydqss').setVisible(true);
            mstform.getItem('user_zxkj').userSetMustInput(true);
            mstform.getItem('user_gydq').userSetMustInput(true);
            mstform.getItem('user_gydqss').userSetMustInput(true);
        } else {
            mstform.getItem('user_zxkj').setVisible(false);
            mstform.getItem('user_gydq').setVisible(false);
            mstform.getItem('user_gydqss').setVisible(false);
            mstform.getItem('user_zxkj').userSetMustInput(false);
            mstform.getItem('user_gydq').userSetMustInput(false);
            mstform.getItem('user_gydqss').userSetMustInput(false);
        }
    })
   /*是否执行框架选择是出现后边内容end*/
  /*供应地区省份根据地区过滤开始*/
  var hb = ['140000','110000','120000','130000','150000'];
    var hz = ['420000','430000','410000']
    var hd = ['360000','370000','310000','320000','330000','340000']
    var hn = ['440000','450000','460000','350000']
    var db = ['230000','210000','220000']
    var xb = ['620000','630000','640000','650000','610000']
    var xn = ['510000','540000','520000','530000','500000']
    var sf = mstform.getItem('user_gydqss');
    mstform.getItem('user_gydq').addListener('change', function () {
        if(mstform.getItem('user_gydq').getValue() == '1'){
            sf.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { 
            sf.setClientSqlFilter("phid in (" + hb + ")" );
            })
        }else if(mstform.getItem('user_gydq').getValue() == '2'){
            sf.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { 
            sf.setClientSqlFilter("phid in (" + hz + ")" );
            })            
        }else if(mstform.getItem('user_gydq').getValue() == '3'){
            sf.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { 
            sf.setClientSqlFilter("phid in (" + hd + ")" );
            })            
        }else if(mstform.getItem('user_gydq').getValue() == '4'){
            sf.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { 
            sf.setClientSqlFilter("phid in (" + hn + ")" );
            })            
        }else if(mstform.getItem('user_gydq').getValue() == '5'){
            sf.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { 
            sf.setClientSqlFilter("phid in (" + db + ")" );
            })            
        }else if(mstform.getItem('user_gydq').getValue() == '6'){
            sf.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { 
            sf.setClientSqlFilter("phid in (" + xb + ")" );
            })            
        }else if(mstform.getItem('user_gydq').getValue() == '7'){
            sf.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { 
            sf.setClientSqlFilter("phid in (" + xn + ")" );
            })            
        }
    })
  /*供应地区省份根据地区过滤结束*/

}

//保存前检测
function beforeSaveEdit() {
	var mstform = Ext.getCmp('CntM10');
	var flag = 0;
	var user_insconcode = "'" + mstform.getItem('user_insconcode').getValue() + "'";
	var pc = mstform.getItem('PhidPc').getValue();
	if(!Ext.isEmpty(mstform.getItem('user_insconcode').getValue())) {
		/*查看浪潮合同编码是否存在user_insconcode 该视图中start*/
		execServer('user_insconcode', {
			'user_insconcode': user_insconcode
		}, function(res) {
			if(res.status != 'success') {
				Ext.MessageBox.show({
					title: '提示',
					msg: "sql有误",
					modal: false
				});
				flag = 1;
			} else if(res.data.length == 0) {
				Ext.MessageBox.show({
					title: '提示',
					msg: "该浪潮合同编码在浪潮系统中不存在",
					modal: false
				});
				flag = 1;
			} else {

			}
		});
		if(otype == $Otype.EDIT) {
			var bill_no = "'" + mstform.getItem('BillNo').getValue() + "'";
			execServer('lchtbm_djbh', {
				'bill_no': bill_no
			}, function(res) {
				if(res.status != 'success') {
					Ext.MessageBox.show({
						title: '提示',
						msg: "sql有误",
						modal: false
					});
					flag = 1;
				} else if(res.data[0].user_insconcode == mstform.getItem('user_insconcode').getValue()) {

				} else {
					//检测该浪潮合同编码是否在新中大存在
					execServer('lchtbm', {
						'user_insconcode': user_insconcode
					}, function(res) {
						if(res.status != 'success') {
							Ext.MessageBox.show({
								title: '提示',
								msg: "sql有误",
								modal: false
							});
							flag = 1;
						} else if(res.data.length == 0) {} else {
							Ext.MessageBox.show({
								title: '提示',
								msg: "该浪潮合同编码在新中大中已存在",
								modal: false
							});
							flag = 1;
						}
					});
				}
			});
		}
		if(otype == $Otype.ADD) {
			//检测该浪潮合同编码是否在新中大存在
			execServer('lchtbm', {
				'user_insconcode': user_insconcode
			}, function(res) {
				if(res.status != 'success') {
					Ext.MessageBox.show({
						title: '提示',
						msg: "sql有误",
						modal: false
					});
					flag = 1;
				} else if(res.data.length == 0) {} else {
					Ext.MessageBox.show({
						title: '提示',
						msg: "该浪潮合同编码在新中大中已存在",
						modal: false
					});
					flag = 1;
				}
			});
		}
	}
	/*查看浪潮合同编码是否存在user_insconcode 该视图中end*/

	/*判断项目信息所属项目部和部门业务单元对照字段是否有值start*/
  if (otype == $Otype.ADD) {
    var bill_no = mstform.getItem('BillNo').getValue();
        execServer('htbhss', {    
          'bill_no':bill_no},function(res){
             var htbh=res.data[0].ht
            if (htbh == 1) {
                 Ext.MessageBox.show({
              title: '提示',
              msg: "存在重复编码",
              modal: false
            });
            flag = 1;
            return false;
            }
          } ) ; 
		execServer('xmxx_ssxmb_lcywdy', {
			'pc': pc
		}, function(res) {
			if(res.status != 'success') {
				Ext.MessageBox.show({
					title: '提示',
					msg: "sql有误",
					modal: false
				});
				flag = 1;
			} else if(res.data.length == 1) {
				console.log(res);
				if(Ext.isEmpty(res.data[0].user_pc_dept)) {
					Ext.MessageBox.show({
						title: '提示',
						msg: "合同所属项目信息没有维护所属项目部",
						modal: false
					});
					flag = 1;
					return false;
				}
				if(Ext.isEmpty(res.data[0].user_mnemCodeInAccDepart)) {
					Ext.MessageBox.show({
						title: '提示',
						msg: "合同所属项目信息的所属项目部浪潮系统没有对应核算部门的助记码",
						modal: false
					});
					flag = 1;
					return false;
				}
				if(Ext.isEmpty(res.data[0].user_lcywdy)) {
					Ext.MessageBox.show({
						title: '提示',
						msg: "合同所属项目信息没有维护浪潮业务单元",
						modal: false
					});
					flag = 1;
					return false;
				}

			}
		});
	}
	/*判断项目信息所属项目部和部门业务单元对照字段是否有值end*/

	/*税率不能为0strat*/
	var rate = mstform.getItem("user_rate").getValue();
	if(rate == 0) {
		if(mstform.getItem("user_szlxpdbz").getValue() != '1') {
			Ext.MessageBox.confirm("提示", "税率是否为0", function(btnId) {
				if(btnId == "yes") {
					mstform.getItem("user_szlxpdbz").setValue('1');
					flag = 1;
				} else if(btnId == "no") {
					flag = 1;
					mstform.getItem("user_szlxpdbz").setValue(null);
				}

			});
		}
	}
	/*税率不能为0end*/

	if(flag == 1) {
		return false;
	}
	if(flag == 0) {
		return true;
	}

}

