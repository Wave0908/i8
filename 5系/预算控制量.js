function AllReady() {
    var mstform = Ext.getCmp('CntChangeM7');
    var Toolbar = Ext.getCmp('toolbar');
    var dgrid = Ext.getCmp('CntChangeD7');
    var dstore = dgrid.store;
    //浪潮乙方设置为只读
    mstform.getItem('user_lcyf').userSetReadOnly(true);

    /*隐藏三个分组start*/
    document.getElementsByTagName('fieldset')[1].style.visibility = 'hidden';
    document.getElementsByTagName('fieldset')[3].style.visibility = 'hidden';
    /*隐藏三个分组end*/
    /*浪潮返回标志为4申请取消审核可点击start*/

    mstform.on('dataready', function (e) {
        var Toolbar = Ext.getCmp('toolbar');
        var user_istbinspur = mstform.getItem('user_istbinspur').getValue();
        if (user_istbinspur == '4') {
            Toolbar.getComponent('applycheck').forceenable();
        } else {
            Toolbar.getComponent('applycheck').forcedisable();
        }

    });

    /*浪潮返回标志为4申请取消审核可点击end*/
	

    /*乙方单位为组织的时候浪潮甲方为必输切不只读start*/
    mstform.getItem('SenCompName').addListener('change', function () {

        var PhidSenComp = mstform.getItem('SenCompName').getValue();
        execServer('contract_CorrUnit', {
            'phid': PhidSenComp
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
    dgrid.addListener('edit', function (editor, e) {                                          //监听单据体字段编辑状态 *edit 为编辑事件（据体更新单据体本行字段）
                                                                                       
     var Taxrate= e.record.data.Taxrate                                                          //监听qty、prc、numericcol_2字段变化事件结束 ｝

     mstform.getItem('user_u_htsl').setValue(Taxrate);
      });  

}
function AllReady() {
	var mstform = Ext.getCmp('ProjResM');
	var dgrid = Ext.getCmp('ProjResD');
	var dstore = dgrid.store;
	/*选过的项目不再重新选择过滤start*/
	console.log(mstform.getItem('user_tzqzbg'));
	mstform.getItem('user_tzqzbg').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) {
		var pc = mstform.getItem('PhidPc').getValue();
		var yslx = mstform.getItem('user_yslx').getValue();
		if (!yslx || !pc) {
			NGMsg.Error('请选择预算类型或工程项目！！！');
			return false;
		} else if (yslx == '1') {
			mstform.getItem('user_tzqzbg').setClientSqlFilter(
				'phid not in (SELECT user_tzqzbg FROM proj_res_m   where  user_yslx=1   ) and  lx=1 and  pc=' +
				pc);
		} else if (yslx == '2') {
			mstform.getItem('user_tzqzbg').setClientSqlFilter(
				'phid not in (SELECT user_tzqzbg FROM proj_res_m   where  user_yslx=2 ) and   lx=2 and  pc=' +
				pc);
		} else if (yslx == '3') {
			mstform.getItem('user_tzqzbg').setClientSqlFilter(
				'phid not in (SELECT user_tzqzbg FROM proj_res_m   where  user_yslx=3 ) and   lx=3 and pc=' +
				pc);
		}
	});
	/*选过的项目不再重新选择过滤end*/



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
			var user_shl = a[0].get('user_shl');
			var taxrate = a[0].get('Taxrate');
			for (var i = 1; i < a.length; i++) {
				a[i].set('user_shl', user_shl);
				a[i].set('Taxrate', taxrate);
			}
		});
	}


	//选择“业务分类”后，重置“分包类型”，业务分类置灰
        
	mstform.getItem('user_ywfl').addListener('helpselected', function (obj) { 
	  mstform.getItem('user_fblx').setValue('');    //选择后赋值
	  BatchBindCombox([form.getItem('user_fblx')]);
	  mstform.getItem ('user_ywfl').userSetReadOnly(true); 
	   }); 

	//业务分类与分包类型加筛选控制
	mstform.getItem('user_fblx').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
      var ywfl = mstform.getItem('user_ywfl').getValue();
	  if(ywfl=='100'||ywfl=='001'){
		mstform.getItem('user_fblx').setOutFilter({c_descript:2});

		}
	  else{
		mstform.getItem('user_fblx').setOutFilter({c_descript:1});
		}

	}) 
	
	
	//判断“业务分类”，增行的资源选择过滤为990204
		Ext.override(Ext.res.ItemDataHelpWindow, {
			initComponent: function () {
				var ywfl = mstform.getItem('user_ywfl').getValue();
				if(ywfl=='010'){
				var me = this;
				me.ResourceType = '2'; //资源类型主键
				me.resBsPhId = '313191217010515';//资源分类主键
				me.filterArtificial = true;
				me.callParent();
			}
			else{var me = this;
				me.filterArtificial = true;
				me.callParent();
			}
			}
		});

}

//保存前检测
function beforeSaveEdit() {

	var mstform = Ext.getCmp('ProjResM');
	var dgrid = Ext.getCmp('ProjResD');
	var dstore = dgrid.store;
	var flag = 0;
	var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
	//01钢结构类数量
	var sum1 = 0;
	var flagsum1 = '0'
	//01螺线类
	var sum2 = 0;
	var flagsum2 = '0'
	//07混凝土类1
	var sum3 = 0;
	var flagsum3 = '0'
	//07混凝土类2
	var sum4 = 0;
	var flagsum4 = '0'
	//26电缆类
	var sum5 = 0;
	var flagsum5 = '0'
		for (i = 0; i < a.length; i++) {
			execServer('yukszlqf', {
				'phid': a[i].data.PhidItemData
			}, function(res) {
				if (res.status == 'success') {
					if (!Ext.isEmpty(res.data[0])) {
						if (res.data[0].lx == '569000000001006') {
							sum1 += a[i].get('Qty')
							return
						}
						if (res.data[0].lx == '569000000001007') {
							sum2 += a[i].get('Qty')
							return
						}
						if (res.data[0].lx == '569000000001008') {
							sum3 += a[i].get('Qty')
							return
						}
						if (res.data[0].lx == '569000000001031') {
							sum4 += a[i].get('Qty')
							return
						}
						if (res.data[0].lx == '569000000001009') {
							sum5 += a[i].get('Qty')
							return
						}
					}
				}
			});

		}
	var pc = mstform.getItem('PhidPc').getValue();

	execServer('yukszl', {
		'lx': '569000000001006',
		'pc': pc,
		'phid': busid,
	}, function(res) {
        console.log("sum1:");
		if (res.status == 'success') {
			if (!Ext.isEmpty(res.data[0])) {
				sum1 += Ext.Number.from(res.data[0].qty, 0);
			}
		}
	});
	execServer('yukszl', {
		'lx': '569000000001007',
		'pc': pc,
		'phid': busid,
	}, function(res) {
		if (res.status == 'success') {
			if (!Ext.isEmpty(res.data[0])) {
				sum2 += Ext.Number.from(res.data[0].qty, 0);
			}
		}
	});
	execServer('yukszl', {
		'lx': '569000000001008',
		'pc': pc,
		'phid': busid,
	}, function(res) {
		if (res.status == 'success') {
			if (!Ext.isEmpty(res.data[0])) {
				sum3 += Ext.Number.from(res.data[0].qty, 0);
			}
		}
	});
	execServer('yukszl', {
		'lx': '569000000001031',
		'pc': pc,
		'phid': busid,
	}, function(res) {
		if (res.status == 'success') {
			if (!Ext.isEmpty(res.data[0])) {
				sum4 += Ext.Number.from(res.data[0].qty, 0);
			}
		}
	});
	execServer('yukszl', {
		'lx': '569000000001009',
		'pc': pc,
		'phid': busid,
	}, function(res) {
		if (res.status == 'success') {
			if (!Ext.isEmpty(res.data[0])) {
				sum5 += Ext.Number.from(res.data[0].qty, 0);
			}
		}
	});

    sum1 = parseFloat(sum1.toFixed(3));
	sum2 = parseFloat(sum2.toFixed(3));
	sum3 = parseFloat(sum3.toFixed(3));
	sum4 = parseFloat(sum4.toFixed(3));
	sum5 = parseFloat(sum5.toFixed(3));


	//yukzlmxwlqf
	//判断当前是否存在这5类物料
	for (i = 0; i < a.length; i++) {
		execServer('yukszlqf', {
			'phid': a[i].data.PhidItemData
		}, function(res) {
			if (res.status == 'success') {
				if (!Ext.isEmpty(res.data[0])) {
					if (res.data[0].lx == '569000000001006') {
						flagsum1 = '2'
						return
					}
					if (res.data[0].lx == '569000000001007') {
						flagsum2 = '2'
						return
					}
					if (res.data[0].lx == '569000000001008') {
						flagsum3 = '2'
						return
					}
					if (res.data[0].lx == '569000000001031') {
						flagsum4 = '2'
						return
					}
					if (res.data[0].lx == '569000000001009') {
						flagsum5 = '2'
						return
					}
				}
			}
		});
	}





	execServer('yskzzlxx', {
		'pc': pc
	}, function(res) {
		if (res.status == 'success') {
			if (!Ext.isEmpty(res.data[0])) {
				for (var i = 0; i < res.data.length; i++) {
					if (res.data[i].u_yskkzlwlkz == '569000000001006') {
						if (flagsum1 == '2') {
							if (sum1 > res.data[i].qty) {
								Ext.MessageBox.show({
									title: '提示',
									msg: "已超出01钢结构类数量预算控制总量:" + res.data[i].qty + "当前数量是" + sum1,
									modal: false
								});
								flag = 1
							}

						}
					}
					if (res.data[i].u_yskkzlwlkz == '569000000001007') {
						if (flagsum2 == '2') {

							if (sum2 > res.data[i].qty) {
								Ext.MessageBox.show({
									title: '提示',
									msg: "已超出01螺线类数量预算控制总量:" + res.data[i].qty + "当前数量是" + sum2,
									modal: false
								});
								flag = 1

							}
						}
					}
					if (res.data[i].u_yskkzlwlkz == '569000000001008') {
						if (flagsum3 == '2') {

							if (sum3 > res.data[i].qty) {
								Ext.MessageBox.show({
									title: '提示',
									msg: "已超出07混凝土类1数量预算控制总量:" + res.data[i].qty + "当前数量是" + sum3,
									modal: false
								});
								flag = 1

							}
						}
					}
					if (res.data[i].u_yskkzlwlkz == '569000000001031') {
						if (flagsum4 == '2') {

							if (sum4 > res.data[i].qty) {
								Ext.MessageBox.show({
									title: '提示',
									msg: "已超出07混凝土类2数量预算控制总量:" + res.data[i].qty + "当前数量是" + sum4,
									modal: false
								});
								flag = 1

							}
						}
					}
					if (res.data[i].u_yskkzlwlkz == '569000000001009') {
						if (flagsum5 == '2') {

							if (sum5 > res.data[i].qty) {
								Ext.MessageBox.show({
									title: '提示',
									msg: "已超出26电缆类数量预算控制总量:" + res.data[i].qty + "当前数量是" + sum5,
									modal: false
								});
								flag = 1

							}

						}
					}
				}
			} else {
				flag = 1;
				Ext.MessageBox.show({
					title: '提示',
					msg: "请先完成该工程项目的预算控制总量",
					modal: false
				});
			}

		}


	});
	
	
	
	var a=dgrid.getStore().getRange(0, dstore.getCount() - 1);
	
	for(i=0;i<a.length;i++){
		if(a[i].get('Qty')>0 && a[i].get('Amt')<=0 ){
			Ext.MessageBox.show({
				title:'提示',
				msg: '第'+(i+1)+'行变更后数量大于0变更后金额必须大于0',
				modal: false
			});
			flag=1
		}
	}

	if (flag == 1) {
		return false;
	}
	if (flag == 0) {
		return true;
	}

}