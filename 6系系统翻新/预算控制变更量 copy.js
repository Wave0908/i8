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
                        Toolbar.get('check').setDisabled(true);
                    }
                }
            });
        }
        console.log(Ext.getCmp("CommonLeftLayout").belongproj)

    });

}
function AllReady() {
	var mstform = Ext.getCmp('ProjResMChg');
    var Toolbar = Ext.getCmp('toolbar');
    console.log('toolbar ===========>', Toolbar);

    if (DefaultPc) {
        /**设置表单页工具栏按钮禁用 */
        execServer('get_ifdswzkpt', { 'phid_pc': DefaultPc }, function (res) {
            if (res.count > 0) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log('data====================>', data)
                if (data[0].extendObjects.user_sfsydswzkpt == '01') {
                    Toolbar.items.get('new').setDisabled(true);
                    Toolbar.items.get('save').setDisabled(true);
                    Toolbar.items.get('check').setDisabled(true);
                }
            }
        });
    }

    mstform.getItem('PhidPc').addListener('helpselected', function () {
        // 获取当前选择的项目
        var phid_pc = mstform.getItem('PhidPc').getValue();
        console.log('phid_pc====================>', phid_pc)
        if (phid_pc) {
            /**设置表单页工具栏按钮禁用 */
            execServer('get_ifdswzkpt', { 'phid_pc': phid_pc }, function (res) {
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log('data====================>', data)
                    if (data[0].extendObjects.user_sfsydswzkpt == '01') {
                        Toolbar.items.get('new').setDisabled(true);
                        Toolbar.items.get('save').setDisabled(true);
                        Toolbar.items.get('check').setDisabled(true);
                    } else {
                        Toolbar.items.get('new').setDisabled(false);
                        Toolbar.items.get('save').setDisabled(false);
                        Toolbar.items.get('check').setDisabled(false);
                    }
                }
            });
        }
    });
}

//保存前检测
function beforeSaveEdit() {

	var mstform = Ext.getCmp('ProjResMChg');
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

    sum1 = parseFloat(sum1.toFixed(3));
    sum2 = parseFloat(sum2.toFixed(3));
    sum3 = parseFloat(sum3.toFixed(3));
    sum4 = parseFloat(sum4.toFixed(3));
    sum5 = parseFloat(sum5.toFixed(3));
    




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