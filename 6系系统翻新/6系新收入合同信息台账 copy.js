function AllReady() {
    var mstform = Ext.getCmp('CntM1');
    var dgrid = Ext.getCmp('CntD1');
    var dstore = dgrid.store;
    var Toolbar = Ext.getCmp('toolbar');
    //浪潮甲方设置为只读
    mstform.getItem('user_lcjf').userSetReadOnly(true);
     mstform.getItem('BillNo').addListener('change', function () {
       mstform.getItem('BillNo').userSetReadOnly(true);
        
    });
  
  
  /*输入浪潮合同编码带出浪潮合同ID*/
	mstform.getItem('user_insconcode').addListener('itemchanged', function() {
		var user_insconcode = "'" + mstform.getItem('user_insconcode').getValue() + "'";
		execServer('user_insconcode', {
			'user_insconcode': user_insconcode
		}, function(res) {
			var data = res.data
			if(data.length == 0) {
				mstform.getItem('user_insconid').setValue('');
				mstform.getItem('user_insconname').setValue('');
			} else {
				mstform.getItem('user_insconid').setValue(res.data[0].htnm);
				mstform.getItem('user_insconname').setValue(res.data[0].htmc);
			}

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
  
	
    mstform.getItem('user_cwxtsfcz').setValue('1');
    mstform.getItem('CntSumVatFc').userSetReadOnly(false);
    /*根据支付比例带出同步初始比例start*/
    mstform.getItem('Zfbl').addListener('itemchanged', function () {
        var Zfbl = mstform.getItem('Zfbl').getValue();
        mstform.getItem('user_tzhdfkbl').setValue(Zfbl);
    });
    /*根据支付比例带出同步初始比例end*/

    /*隐藏三个分组start*/
    document.getElementsByTagName('fieldset')[1].style.visibility = 'hidden';
   /* document.getElementsByTagName('fieldset')[3].style.visibility = 'hidden';*/  //放出补充信息
    /*隐藏三个分组end*/

    /*浪潮同步标志为4的申请取消审核可使用start*/
    mstform.on('dataready', function (e) {
		
        var Toolbar = Ext.getCmp('toolbar');
        var user_istbinspur = mstform.getItem('user_istbinspur').getValue();

        if (user_istbinspur == '4') {
            Toolbar.getComponent('applycheck').forceenable();
        } else if (mstform.getItem('user_insconid').getValue().length > 0) {
            Toolbar.getComponent('applycheck').forceenable();
        } else {
            Toolbar.getComponent('applycheck').forcedisable();
        }

    });
    /*浪潮同步标志为4的申请取消审核可使用end*/

    mstform.getItem('PhidPc').on('beforetriggerclick', function (obj) {
		mstform.getItem('PhidPc').setClientSqlFilter(" phid  not in ( select phid_pc from pcm3_cnt_m where cnt_type in ('5','224200107000001','224200107000002','224200107000003') group by phid_pc) ");   
    })

    /*财务系统是否存在为是的时候必输，为否的时候不必输start*/
    mstform.getItem('user_cwxtsfcz').addListener('change', function () {
        var user_cwxtsfcz = mstform.getItem('user_cwxtsfcz').getValue();
        if (user_cwxtsfcz == '1') {
            mstform.getItem('user_insconcode').userSetMustInput(true);
            mstform.getItem('user_insconid').userSetMustInput(true);
            mstform.getItem('user_insconname').userSetMustInput(true);
        } else {
            mstform.getItem('user_insconcode').userSetMustInput(false);
            mstform.getItem('user_insconid').userSetMustInput(false);
            mstform.getItem('user_insconname').userSetMustInput(false);
        }
    });

    //如果 浪潮是否存在显示取消审核

    // if (user_istbinspur == '4') {
    //     Toolbar.getComponent('applycheck').forceenable();
    // } else if (mstform.getItem('user_insconid').getValue().length > 0) {

    //     Toolbar.getComponent('applycheck').forcedisable();
    // }

    //如果 浪潮是否存在显示的是 浪潮名称、id、编号必填
    if (mstform.getItem('user_cwxtsfcz').getValue() == '1') {

        mstform.getItem('user_insconcode').userSetMustInput(true);
        mstform.getItem('user_insconid').userSetMustInput(true);
        mstform.getItem('user_insconname').userSetMustInput(true);
    } else {
        mstform.getItem('user_insconcode').userSetMustInput(false);
        mstform.getItem('user_insconid').userSetMustInput(false);
        mstform.getItem('user_insconname').userSetMustInput(false);
    }


    /*财务系统是否存在为是的时候必输，为否的时候不必输end*/

    if (otype == $Otype.ADD) {
        mstform.getItem('user_rate').setValue(null);
        mstform.getItem('user_yfkbl').setValue(null);
        mstform.getItem('Zfbl').addListener('change', function () {
            var Zfbl = mstform.getItem('Zfbl').getValue();
            mstform.getItem('user_zfbl').setValue(Zfbl);
        });
        // 判断编码是否存在合同内
        mstform.getItem('BillNo').addListener('itemchanged', function () {
            var Billno = mstform.getItem('BillNo').getValue();

            var bill_no = Billno.replace(/\s*/g, "")

            mstform.getItem('BillNo').setValue(bill_no);

            execServer('htbhss', {
                'bill_no': bill_no
            }, function (res) {
                var htbh = res.data[0].ht
                if (htbh == 1) {
                    Ext.MessageBox.show({
                        title: '提示',
                        msg: "存在重复编码",
                        modal: false
                    });
                    flag = 1;
                    return false;
                }
            })
        });
    }

    /*甲方单位为组织的时候浪潮甲方为必输切不只读start*/
    mstform.getItem('PhidRecComp').addListener('helpselected', function () {
        mstform.getItem('InvoiceCmp').setValue(null);
        mstform.getItem('InvoiceSen').setValue(null);
        var PhidRecComp = mstform.getItem('PhidRecComp').getValue();
        execServer('contract_CorrUnit', {
            'phid': PhidRecComp
        }, function (res) {
            if (res.status != 'success') {
                Ext.MessageBox.show({
                    title: '提示',
                    msg: "sql有误",
                    modal: false
                });

            }

            if (res.data.length == 1) {
                if (res.data[0].type == 'org') {
                    //浪潮甲方设置为只读
                    mstform.getItem('user_lcjf').userSetReadOnly(false);
                    mstform.getItem('user_lcjf').userSetMustInput(true);
                } else {
                    mstform.getItem('user_lcjf').userSetReadOnly(true);
                    mstform.getItem('user_lcjf').userSetMustInput(false);
                }
            }

        });

    });

    /*预付款比例调整*/
    mstform.getItem('user_yfkje').addListener('itemchanged', function () {
        var CntSumVatFc = mstform.getItem('CntSumVatFc').getValue();
        var yfkbl = mstform.getItem('user_yfkje').getValue();
        if (CntSumVatFc != '') {
            mstform.getItem('user_yfkbl').setValue(yfkbl / CntSumVatFc);
        } else {
            mstform.getItem('user_yfkbl').setValue('');
        }
    });
    /*含税金额调整*/
    mstform.getItem('CntSumVatFc').addListener('change', function () {
        var CntSumVatFc = mstform.getItem('CntSumVatFc').getValue();
        var yfkbl = mstform.getItem('user_yfkje').getValue();
        if (CntSumVatFc != '') {
            mstform.getItem('user_yfkbl').setValue(yfkbl / CntSumVatFc);
        } else {
            mstform.getItem('user_yfkbl').setValue('');
        }
    });
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
    mstform.getItem('user_insconcode').addListener('itemchanged', function () {
        var user_insconcode = "'" + mstform.getItem('user_insconcode').getValue() + "'";
        execServer('user_insconcode', {
            'user_insconcode': user_insconcode
        }, function (res) {
            var data = res.data
            if (data.length == 0) {
                mstform.getItem('user_insconid').setValue('');
                mstform.getItem('user_insconname').setValue('');
            } else {
                mstform.getItem('user_insconid').setValue(res.data[0].htnm);
                mstform.getItem('user_insconname').setValue(res.data[0].htmc);
            }
        });

    });
    /*输入浪潮合同编码带出浪潮合同IDend*/
	
	
	
	dgrid.addListener('edit', function (editor, e) {                                          //监听单据体字段编辑状态 *edit 为编辑事件（据体汇总更新表头字段）
	 if (e.originalValue == e.value) { return;}                                            //判断原值与新值是否相同，如果相同则返回
	    if (e.field == 'TaxRate' || e.field == 'AmtFc' || e.field == 'TaxAmt' || e.field == 'Qty' || e.field == 'PrcFc' || e.field == 'PrcVatFc'  || e.field == 'AmtVatFc'  ) {                                     //监听AmtFc、user_hl字段变化
	                 var a=dgrid.getStore().getRange(0, dstore.getCount() - 1);
	                 var sl =0
	                 var bhsje=0
	                 var se=0
	                 for(i=0;i<a.length;i++){
	                 	if(sl<a[i].get('TaxRate')){
	                 		sl=a[i].get('TaxRate')
	                 	}
	                 	bhsje+=a[i].get('AmtFc');
	                 	se+=a[i].get('TaxAmt');
	                 }
	                 mstform.getItem('user_rate').setValue(sl)
	                 mstform.getItem('user_bhsje').setValue(bhsje)
	                 mstform.getItem('user_se').setValue(se)               
	        };                                                                                //监听AmtFc、user_hl字段变化事件结束
	    });       
    
  
              /*补充信息带出start*/
    mstform.getItem('PhidPc').addListener('change', function() {
        var PhidPc = mstform.getItem('PhidPc').getValue();
        execServer('bcxx', {
            'phid': PhidPc
        }, function(res) {
           if (!Ext.isEmpty(res) && res.data[0]) {
              mstform.getItem('user_jfdwxz').setValue(res.data[0].jfqyxz);//甲方单位性质
              mstform.getItem('user_htwbje').setValue(res.data[0].htwbje);//合同文本金额
              mstform.getItem('user_yjtbsy').setValue(res.data[0].htlrl);//投标收益率
              mstform.getItem('user_htgq').setValue(res.data[0].htgq);//合同工期
              mstform.getItem('user_gclb').setValue(res.data[0].gclxejzj);//工程类别
              BatchBindCombox([mstform.getItem('user_gclb')]); 
              mstform.getItem('user_htpsdj').setValue(res.data[0].htpsdj);//合同评审等级
              mstform.getItem('user_htjjfs').setValue(res.data[0].jjfs);//计价方式
              mstform.getItem('user_htfkfs').setValue(res.data[0].fkfs);//付款方式
            }
        });
    });
   /*补充信息带出end*/

}

//保存前检测
function beforeSaveEdit() {
    var mstform = Ext.getCmp('CntM1');
    var flag = 0;
	    var dgrid = Ext.getCmp('CntD1');
	    var dstore = dgrid.store;
    var pc = mstform.getItem('PhidPc').getValue();
    var user_insconcode = "'" + mstform.getItem('user_insconcode').getValue() + "'";
    if (!Ext.isEmpty(mstform.getItem('user_insconcode').getValue())) {
        /*查看浪潮合同编码是否存在user_insconcode 该视图中start*/
        execServer('user_insconcode', {
            'user_insconcode': user_insconcode
        }, function (res) {
            if (res.status != 'success') {
                Ext.MessageBox.show({
                    title: '提示',
                    msg: "sql有误",
                    modal: false
                });
                flag = 1;
            } else if (res.data.length == 0) {
                Ext.MessageBox.show({
                    title: '提示',
                    msg: "该浪潮合同编码在浪潮系统中不存在",
                    modal: false
                });
                flag = 1;
            } else {

            }
        });
        if (otype == $Otype.EDIT) {
            var bill_no = "'" + mstform.getItem('BillNo').getValue() + "'";
            execServer('lchtbm_djbh', {
                'bill_no': bill_no
            }, function (res) {
                if (res.status != 'success') {
                    Ext.MessageBox.show({
                        title: '提示',
                        msg: "sql有误",
                        modal: false
                    });
                    flag = 1;
                } else if (res.data[0].user_insconcode == mstform.getItem('user_insconcode').getValue()) {

                } else {
                    //检测该浪潮合同编码是否在新中大存在
                    execServer('lchtbm', {
                        'user_insconcode': user_insconcode
                    }, function (res) {
                        if (res.status != 'success') {
                            Ext.MessageBox.show({
                                title: '提示',
                                msg: "sql有误",
                                modal: false
                            });
                            flag = 1;
                        } else if (res.data.length == 0) {} else {
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
        if (otype == $Otype.ADD) {
            //检测该浪潮合同编码是否在新中大存在
            execServer('lchtbm', {
                'user_insconcode': user_insconcode
            }, function (res) {
                if (res.status != 'success') {
                    Ext.MessageBox.show({
                        title: '提示',
                        msg: "sql有误",
                        modal: false
                    });
                    flag = 1;
                } else if (res.data.length == 0) {} else {
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
            'bill_no': bill_no
        }, function (res) {
            var htbh = res.data[0].ht
            if (htbh == 1) {
                Ext.MessageBox.show({
                    title: '提示',
                    msg: "存在重复编码",
                    modal: false
                });
                flag = 1;
                return false;
            }
        });
        execServer('xmxx_ssxmb_lcywdy', {
            'pc': pc
        }, function (res) {
            if (res.status != 'success') {
                Ext.MessageBox.show({
                    title: '提示',
                    msg: "sql有误",
                    modal: false
                });
                flag = 1;
            } else if (res.data.length == 1) {
                console.log(res);
                if (Ext.isEmpty(res.data[0].user_pc_dept)) {
                    Ext.MessageBox.show({
                        title: '提示',
                        msg: "合同所属项目信息没有维护所属项目部",
                        modal: false
                    });
                    flag = 1;
                    return false;
                }
                if (Ext.isEmpty(res.data[0].user_mnemCodeInAccDepart)) {
                    Ext.MessageBox.show({
                        title: '提示',
                        msg: "合同所属项目信息的所属项目部浪潮系统没有对应核算部门的助记码",
                        modal: false
                    });
                    flag = 1;
                    return false;
                }
                if (Ext.isEmpty(res.data[0].user_lcywdy)) {
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
	
    
	
	

    if (flag == 1) {
        return false;
    }
    if (flag == 0) {
        return true;
    }
  
  
  

      

}




