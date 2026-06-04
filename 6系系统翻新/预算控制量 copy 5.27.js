function AllReadyList() {
	console.log(Ext.getCmp('viewPort'))
	var Toolbar = Ext.getCmp('viewPort').items.items[0];
	var grid = Ext.getCmp('viewPort').items.items[4].items.items[1];
	var dstore = grid.store;
	console.log(Toolbar)
	dstore.on("load", function (me, operation, eOpts) {
		var PhidPc = Ext.getCmp("CommonLeftLayout").belongproj;
		if (PhidPc) {
			/**设置列表页工具栏按钮禁用 */
			execServer('get_ifdswzkpt', { 'phid_pc': PhidPc }, function (res) {
				if (res.count > 0) {
					const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
					console.log('data====================>', data)
					if (data[0].extendObjects.user_sfsydswzkpt == '01') {
						Toolbar.get('sadd').setDisabled(true);
						Toolbar.get('edit').setDisabled(true);
						Toolbar.get('delete').setDisabled(true);
						Toolbar.get('copy').setDisabled(true);
						Toolbar.get('view').setDisabled(true);
						Toolbar.get('check').setDisabled(true);
					}
				}
			});
		}
		console.log(Ext.getCmp("CommonLeftLayout").belongproj)

	});

}
function AllReady() {
	var mstform = Ext.getCmp('ProjResM');
	var dgrid = Ext.getCmp('ProjResD');
	var dstore = dgrid.store;
	/*选过的项目不再重新选择过滤start*/
	console.log(mstform.getItem('user_tzqzbg'));
	mstform.getItem('user_tzqzbg').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
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
	console.log('toolbar ===========>', Toolbar);
	if (!Ext.isEmpty(Toolbar)) {

		Toolbar.insert(1, {
			itemId: "copy",
			text: "复制",
			width: this.itemWidth,
			iconCls: "icon-New"
		});

		Toolbar.items.get('copy').on('click', function () {

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

	if (DefaultPc) {
		/**设置表单页工具栏按钮禁用 */
		execServer('get_ifdswzkpt', { 'phid_pc': DefaultPc }, function (res) {
			if (res.count > 0) {
				const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
				console.log('带出data====================>', data)
				if (data[0].extendObjects.user_sfsydswzkpt == '01') {
					Toolbar.items.get('new').setDisabled(true);
					Toolbar.items.get('save').setDisabled(true);
					Toolbar.items.get('check').setDisabled(true);
					console.log('带出禁用====================>', Toolbar.items.get('check').disabled)
				}
			}
		});
	}

	mstform.getItem('PhidPc').addListener('helpselected', function () {
		// 获取当前选择的项目
		var phid_pc = mstform.getItem('PhidPc').getValue();
		console.log('phid_pc====================>', phid_pc)
		if (phid_pc) {
			var ifdsw = '';
			/**设置表单页工具栏按钮禁用 */
			execServer('get_ifdswzkpt', { 'phid_pc': phid_pc }, function (res) {
				if (res.count > 0) {
					const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
					console.log('帮助选择data====================>', data)
					ifdsw = data[0].extendObjects.user_sfsydswzkpt;
				}
			});
			if (ifdsw == '01') {
				Toolbar.items.get('new').setDisabled(true);
				Toolbar.items.get('save').setDisabled(true);
				Toolbar.items.get('check').setDisabled(true);
				console.log('禁用====================>', Toolbar.items.get('check').disabled)
			} else {
				Toolbar.items.get('new').setDisabled(false);
				Toolbar.items.get('save').setDisabled(false);
				Toolbar.items.get('check').setDisabled(false);
				console.log('启用====================>', Toolbar.items.get('check').disabled)
			}
		}
	});

	//选择“业务分类”后，重置“分包类型”，业务分类置灰

	mstform.getItem('user_ywfl').addListener('helpselected', function (obj) {
		mstform.getItem('user_fblx').setValue('');    //选择后赋值
		BatchBindCombox([form.getItem('user_fblx')]);
		mstform.getItem('user_ywfl').userSetReadOnly(true);
	});

	//业务分类与分包类型加筛选控制
	mstform.getItem('user_fblx').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
		var ywfl = mstform.getItem('user_ywfl').getValue();
		if (ywfl == '100' || ywfl == '001') {
			mstform.getItem('user_fblx').setOutFilter({ c_descript: 2 });

		}
		else {
			mstform.getItem('user_fblx').setOutFilter({ c_descript: 1 });
		}

	})


	//判断“业务分类”，增行的资源选择过滤为990204
	Ext.override(Ext.res.ItemDataHelpWindow, {
		initComponent: function () {
			var ywfl = mstform.getItem('user_ywfl').getValue();
			if (ywfl == '010') {
				var me = this;
				me.ResourceType = '2'; //资源类型主键
				me.resBsPhId = '313191217010515';//资源分类主键
				me.filterArtificial = true;
				me.callParent();
			}
			else {
				var me = this;
				me.filterArtificial = true;
				me.callParent();
			}
		}
	});

}

//保存前检测
// function beforeSaveEdit() {

// 	var mstform = Ext.getCmp('ProjResM');
// 	var dgrid = Ext.getCmp('ProjResD');
// 	var dstore = dgrid.store;
// 	var flag = 0;
// 	var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
// 	console.log("dgrid:", dgrid);
// 	//01钢结构类数量
// 	var sum1 = 0;
// 	var flagsum1 = '0'
// 	//01螺线类
// 	var sum2 = 0;
// 	var flagsum2 = '0'
// 	//07混凝土类1
// 	var sum3 = 0;
// 	var flagsum3 = '0'
// 	//07混凝土类2
// 	var sum4 = 0;
// 	var flagsum4 = '0'
// 	//26电缆类
// 	var sum5 = 0;
// 	var flagsum5 = '0'
// 	for (i = 0; i < a.length; i++) {
// 		console.log("a:", a);
// 		execServer('yukszlqf', {
// 			'phid': a[i].data.PhidItemData
// 		}, function (res) {
// 			if (res.status == 'success') {
// 				if (res.count > 0) {
// 					var data = JSON.parse(res.data)
// 					if (data[0].extendObjects.lx == '569000000001006') {
// 						sum1 += a[i].get('Qty')
// 						return
// 					}
// 					if (data[0].extendObjects.lx == '569000000001007') {
// 						sum2 += a[i].get('Qty')
// 						return
// 					}
// 					if (data[0].extendObjects.lx == '569000000001008') {
// 						sum3 += a[i].get('Qty')
// 						return
// 					}
// 					if (data[0].extendObjects.lx == '569000000001031') {
// 						sum4 += a[i].get('Qty')
// 						return
// 					}
// 					if (data[0].extendObjects.lx == '569000000001009') {
// 						sum5 += a[i].get('Qty')
// 						return
// 					}
// 				}
// 			}
// 		});
// 	}
// 	console.log(otype)
// 	var pc = mstform.getItem('PhidPc').getValue();
// 	if (otype == $Otype.VIEW || otype == $Otype.EDIT) {
// 		console.log("busid:", busid);
// 		execServer('yukszl', {
// 			'lx': '569000000001006',
// 			'pc': pc,
// 			'phid': busid,
// 		}, function (res) {
// 			if (res.status == 'success') {
// 				if (res.count > 0) {
// 					var data = JSON.parse(res.data)
// 					sum1 += Number(data[0].extendObjects.qty, 0);
// 				}
// 			}
// 		});
// 		execServer('yukszl', {
// 			'lx': '569000000001007',
// 			'pc': pc,
// 			'phid': busid,
// 		}, function (res) {
// 			if (res.status == 'success') {
// 				if (res.count > 0) {
// 					var data = JSON.parse(res.data)
// 					sum2 += Number(data[0].extendObjects.qty, 0);
// 				}
// 			}
// 		});
// 		execServer('yukszl', {
// 			'lx': '569000000001008',
// 			'pc': pc,
// 			'phid': busid,
// 		}, function (res) {
// 			if (res.status == 'success') {
// 				if (res.count > 0) {
// 					var data = JSON.parse(res.data)
// 					sum3 += Number(data[0].extendObjects.qty, 0);
// 				}
// 			}
// 		});
// 		execServer('yukszl', {
// 			'lx': '569000000001031',
// 			'pc': pc,
// 			'phid': busid,
// 		}, function (res) {
// 			if (res.status == 'success') {
// 				if (res.count > 0) {
// 					var data = JSON.parse(res.data)
// 					sum4 += Number(data[0].extendObjects.qty, 0);
// 				}
// 			}
// 		});
// 		execServer('yukszl', {
// 			'lx': '569000000001009',
// 			'pc': pc,
// 			'phid': busid,
// 		}, function (res) {
// 			if (res.status == 'success') {
// 				if (res.count > 0) {
// 					var data = JSON.parse(res.data)
// 					sum5 += Number(data[0].extendObjects.qty, 0);
// 				}
// 			}
// 		});

// 	}

// 	sum1 = parseFloat(sum1.toFixed(3));
// 	sum2 = parseFloat(sum2.toFixed(3));
// 	sum3 = parseFloat(sum3.toFixed(3));
// 	sum4 = parseFloat(sum4.toFixed(3));
// 	sum5 = parseFloat(sum5.toFixed(3));


// 	//yukzlmxwlqf
// 	//判断当前是否存在这5类物料
// 	for (i = 0; i < a.length; i++) {
// 		execServer('yukszlqf', {
// 			'phid': a[i].data.PhidItemData
// 		}, function (res) {
// 			if (res.status == 'success') {
// 				if (res.count > 0) {
// 					var data = JSON.parse(res.data)
// 					if (data[0].extendObjects.lx == '569000000001006') {
// 						flagsum1 = '2'
// 						return
// 					}
// 					if (data[0].extendObjects.lx == '569000000001007') {
// 						flagsum2 = '2'
// 						return
// 					}
// 					if (data[0].extendObjects.lx == '569000000001008') {
// 						flagsum3 = '2'
// 						return
// 					}
// 					if (data[0].extendObjects.lx == '569000000001031') {
// 						flagsum4 = '2'
// 						return
// 					}
// 					if (data[0].extendObjects.lx == '569000000001009') {
// 						flagsum5 = '2'
// 						return
// 					}
// 				}
// 			}
// 		});
// 	}

// 	execServer('yskzzlxx', {
// 		'pc': pc
// 	}, function (res) {
// 		if (res.status == 'success') {
// 			if (res.count > 0) {
// 				const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
// 				for (var i = 0; i < data.length; i++) {
// 					if (data[i].extendObjects.u_yskkzlwlkz == '569000000001006') {
// 						if (flagsum1 == '2') {
// 							if (sum1 > res.data[i].qty) {
// 								Ext.MessageBox.show({
// 									title: '提示',
// 									msg: "已超出01钢结构类数量预算控制总量:" + data[i].extendObjects.qty + "当前数量是" + sum1,
// 									modal: false
// 								});
// 								flag = 1
// 							}
// 						}
// 					}
// 					if (data[i].extendObjects.u_yskkzlwlkz == '569000000001007') {
// 						if (flagsum2 == '2') {

// 							if (sum2 > data[i].extendObjects.qty) {
// 								Ext.MessageBox.show({
// 									title: '提示',
// 									msg: "已超出01螺线类数量预算控制总量:" + data[i].extendObjects.qty + "当前数量是" + sum2,
// 									modal: false
// 								});
// 								flag = 1

// 							}
// 						}
// 					}
// 					if (data[i].extendObjects.u_yskkzlwlkz == '569000000001008') {
// 						if (flagsum3 == '2') {

// 							if (sum3 > data[i].extendObjects.qty) {
// 								Ext.MessageBox.show({
// 									title: '提示',
// 									msg: "已超出07混凝土类1数量预算控制总量:" + data[i].extendObjects.qty + "当前数量是" + sum3,
// 									modal: false
// 								});
// 								flag = 1

// 							}
// 						}
// 					}
// 					if (data[i].extendObjects.u_yskkzlwlkz == '569000000001031') {
// 						if (flagsum4 == '2') {

// 							if (sum4 > data[i].extendObjects.qty) {
// 								Ext.MessageBox.show({
// 									title: '提示',
// 									msg: "已超出07混凝土类2数量预算控制总量:" + data[i].extendObjects.qty + "当前数量是" + sum4,
// 									modal: false
// 								});
// 								flag = 1

// 							}
// 						}
// 					}
// 					if (data[i].extendObjects.u_yskkzlwlkz == '569000000001009') {
// 						if (flagsum5 == '2') {
// 							if (sum5 > data[i].extendObjects.qty) {
// 								Ext.MessageBox.show({
// 									title: '提示',
// 									msg: "已超出26电缆类数量预算控制总量:" + data[i].extendObjects.qty + "当前数量是" + sum5,
// 									modal: false
// 								});
// 								flag = 1
// 							}
// 						}
// 					}
// 				}
// 			} else {
// 				Ext.MessageBox.show({
// 					title: '提示',
// 					msg: "请先完成该工程项目的预算控制总量",
// 					modal: false
// 				});
// 				flag = 1;
// 				return false;
// 			}
// 		}
// 	});

// 	var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
// 	for (i = 0; i < a.length; i++) {
// 		if (a[i].get('Qty') > 0 && a[i].get('Amt') <= 0) {
// 			Ext.MessageBox.show({
// 				title: '提示',
// 				msg: '第' + (i + 1) + '行变更后数量大于0变更后金额必须大于0',
// 				modal: false
// 			});
// 			flag = 1
// 		}
// 	}

// 	if (flag == 1) {
// 		return false;
// 	}
// 	if (flag == 0) {
// 		return true;
// 	}
// }
// 封装异步函数
function execServerAsync(method, params) {
    return new Promise((resolve, reject) => {
        execServer(method, params, function(res) {
            if (res.status == 'success') {
                resolve(res);
            } else {
                reject(res);
            }
        });
    });
}

// 保存前检测
async function beforeSaveEdit() {
    var mstform = Ext.getCmp('ProjResM');
    var dgrid = Ext.getCmp('ProjResD');
    var dstore = dgrid.store;
    var flag = 0;
    var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
    
    // 01钢结构类数量
    var sum1 = 0;
    var flagsum1 = '0';
    // 01螺线类
    var sum2 = 0;
    var flagsum2 = '0';
    // 07混凝土类1
    var sum3 = 0;
    var flagsum3 = '0';
    // 07混凝土类2
    var sum4 = 0;
    var flagsum4 = '0';
    // 26电缆类
    var sum5 = 0;
    var flagsum5 = '0';
    
    try {
        // 1. 处理明细行的物料分类统计（并行处理）
        const promises1 = [];
        for (let i = 0; i < a.length; i++) {
            const promise = execServerAsync('yukszlqf', {
                'phid': a[i].data.PhidItemData
            }).then(res => {
                if (res.count > 0) {
                    const data = JSON.parse(res.data);
                    const qty = a[i].get('Qty');
                    
                    if (data[0].extendObjects.lx == '569000000001006') {
                        sum1 += qty;
                    } else if (data[0].extendObjects.lx == '569000000001007') {
                        sum2 += qty;
                    } else if (data[0].extendObjects.lx == '569000000001008') {
                        sum3 += qty;
                    } else if (data[0].extendObjects.lx == '569000000001031') {
                        sum4 += qty;
                    } else if (data[0].extendObjects.lx == '569000000001009') {
                        sum5 += qty;
                    }
                }
            });
            promises1.push(promise);
        }
        await Promise.all(promises1);
        
        // 2. 如果是查看或编辑状态，获取已存在的数据
        var pc = mstform.getItem('PhidPc').getValue();
        if (otype == $Otype.VIEW || otype == $Otype.EDIT) {
            console.log("busid:", busid);
            
            const typePromises = [
                {lx: '569000000001006', sumVar: 'sum1'},
                {lx: '569000000001007', sumVar: 'sum2'},
                {lx: '569000000001008', sumVar: 'sum3'},
                {lx: '569000000001031', sumVar: 'sum4'},
                {lx: '569000000001009', sumVar: 'sum5'}
            ];
            
            for (const type of typePromises) {
                try {
                    const res = await execServerAsync('yukszl', {
                        'lx': type.lx,
                        'pc': pc,
                        'phid': busid,
                    });
                    
                    if (res.count > 0) {
                        const data = JSON.parse(res.data);
                        const qty = Number(data[0].extendObjects.qty) || 0;
                        
                        switch(type.lx) {
                            case '569000000001006':
                                sum1 += qty;
                                break;
                            case '569000000001007':
                                sum2 += qty;
                                break;
                            case '569000000001008':
                                sum3 += qty;
                                break;
                            case '569000000001031':
                                sum4 += qty;
                                break;
                            case '569000000001009':
                                sum5 += qty;
                                break;
                        }
                    }
                } catch (error) {
                    console.error(`获取类型${type.lx}数据失败:`, error);
                }
            }
        }
        
        // 格式化数量
        sum1 = parseFloat(sum1.toFixed(3));
        sum2 = parseFloat(sum2.toFixed(3));
        sum3 = parseFloat(sum3.toFixed(3));
        sum4 = parseFloat(sum4.toFixed(3));
        sum5 = parseFloat(sum5.toFixed(3));
        
        // 3. 判断当前是否存在这5类物料
        const promises2 = [];
        for (let i = 0; i < a.length; i++) {
            const promise = execServerAsync('yukszlqf', {
                'phid': a[i].data.PhidItemData
            }).then(res => {
                if (res.count > 0) {
                    const data = JSON.parse(res.data);
                    const lx = data[0].extendObjects.lx;
                    
                    if (lx == '569000000001006') {
                        flagsum1 = '2';
                    } else if (lx == '569000000001007') {
                        flagsum2 = '2';
                    } else if (lx == '569000000001008') {
                        flagsum3 = '2';
                    } else if (lx == '569000000001031') {
                        flagsum4 = '2';
                    } else if (lx == '569000000001009') {
                        flagsum5 = '2';
                    }
                }
            });
            promises2.push(promise);
        }
        await Promise.all(promises2);
        
        // 4. 检查预算控制总量
        const budgetRes = await execServerAsync('yskzzlxx', {'pc': pc});
        
        if (budgetRes.count > 0) {
            const data = typeof budgetRes.data === 'string' ? JSON.parse(budgetRes.data) : budgetRes.data;
            
            for (let i = 0; i < data.length; i++) {
                const item = data[i].extendObjects;
                const kzlwlkz = item.u_yskkzlwlkz;
                const budgetQty = item.qty;
                
                switch(kzlwlkz) {
                    case '569000000001006':
                        if (flagsum1 == '2' && sum1 > budgetQty) {
                            Ext.MessageBox.show({
                                title: '提示',
                                msg: `已超出01钢结构类数量预算控制总量:${budgetQty}，当前数量是${sum1}`,
                                modal: false
                            });
                            flag = 1;
                        }
                        break;
                    case '569000000001007':
                        if (flagsum2 == '2' && sum2 > budgetQty) {
                            Ext.MessageBox.show({
                                title: '提示',
                                msg: `已超出01螺线类数量预算控制总量:${budgetQty}，当前数量是${sum2}`,
                                modal: false
                            });
                            flag = 1;
                        }
                        break;
                    case '569000000001008':
                        if (flagsum3 == '2' && sum3 > budgetQty) {
                            Ext.MessageBox.show({
                                title: '提示',
                                msg: `已超出07混凝土类1数量预算控制总量:${budgetQty}，当前数量是${sum3}`,
                                modal: false
                            });
                            flag = 1;
                        }
                        break;
                    case '569000000001031':
                        if (flagsum4 == '2' && sum4 > budgetQty) {
                            Ext.MessageBox.show({
                                title: '提示',
                                msg: `已超出07混凝土类2数量预算控制总量:${budgetQty}，当前数量是${sum4}`,
                                modal: false
                            });
                            flag = 1;
                        }
                        break;
                    case '569000000001009':
                        if (flagsum5 == '2' && sum5 > budgetQty) {
                            Ext.MessageBox.show({
                                title: '提示',
                                msg: `已超出26电缆类数量预算控制总量:${budgetQty}，当前数量是${sum5}`,
                                modal: false
                            });
                            flag = 1;
                        }
                        break;
                }
            }
        } else {
            Ext.MessageBox.show({
                title: '提示',
                msg: "请先完成该工程项目的预算控制总量",
                modal: false
            });
            flag = 1;
        }
        
        // 5. 检查数量大于0时金额必须大于0
        for (let i = 0; i < a.length; i++) {
            if (a[i].get('Qty') > 0 && a[i].get('Amt') <= 0) {
                Ext.MessageBox.show({
                    title: '提示',
                    msg: `第${i + 1}行变更后数量大于0，变更后金额必须大于0`,
                    modal: false
                });
                flag = 1;
                break;
            }
        }
        
        return flag === 0;
        
    } catch (error) {
        console.error('保存前检测出错:', error);
        Ext.MessageBox.show({
            title: '错误',
            msg: '保存前检测发生错误',
            modal: false
        });
        return false;
    }
}