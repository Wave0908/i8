function allReadyEdit() {
    //初始化
    var mstform = Ext.getCmp('p_form0000000244_m');
    var dgrid = Ext.getCmp('p_form0000000244_dgrid');
	var dgrid1 = Ext.getCmp('p_form0000000244_d1grid');
    var dstore = dgrid.store;
    var dstore1 = dgrid1.store;
	
	dgrid1.setReadOnlyCol('u_lcywdy', true);
	dgrid1.setReadOnlyCol('u_lchsbmzjm', true);
    var Toolbar = Ext.getCmp('toolbar');
    var a = 0;
    var b = 0;
    var c = 0;
    if (otype == $Otype.VIEW ) {
        Toolbar.insert(1, {
            itemId: "push",
            text: "浪潮推送",
            width: this.itemWidth,
            iconCls: "icon-New"
        });
        Toolbar.items.get('push').on('click', function() {
            Ext.Ajax.request({
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                jsonData: {
                    "phid": busid
                },
                url: location.protocol + "//" + location.host + "/MCC22ToFSSC/api/AssetsDepreciation/Insert",
                async: false, //同步请求
                success: function(response) {
                    window.wait = false;
                    var resdata = JSON.parse(response.text);
                    var status = resdata["status"];
                    var message = resdata["message"];
                    if (status == "success") {
                        Ext.MessageBox.alert(Lang.Notes || '提示', "推送成功.", function() {

                        });
                    } else {
                        Ext.MessageBox.alert(Lang.Notes || '提示', message, function() {});
                    }
                },
                failure: function(response, opts) {
                    myMask.hide();
                    window.wait = false;
                    var resdata = JSON.parse(response.text);
                    var status = resdata["status"];
                    var message = resdata["message"];
                    Ext.MessageBox.alert(Lang.Notes || '提示', message);
                }
            });
        });
    }

    if(otype == $Otype.ADD || otype == $Otype.EDIT) {
        //部门填充
        var id = $appinfo.userID - 1;
		
		
		dgrid1.getColumn('sybm_name').getEditor().addListener('beforetriggerclick', function() {
			var ocode = mstform.getItem('ocode').getValue();
			dgrid1.getColumn('sybm_name').getEditor().setClientSqlFilter("parent_orgid in (" + ocode + ")" );
			
			
		});
		 dgrid1.getColumn('sybm_name').getEditor().addListener('helpselected', function() {
			 var data = dgrid1.getSelectionModel().getSelection();
			 var sybm = data[0].get('sybm');
		           	execServer('ssxmb_bmywdy', {
		           				'dept': sybm
		           			}, function(res) {
		           				if(res.data[0]) {
									data[0].set('u_lcywdy', res.data[0].user_lcywdy)
		           				} else {
		           					Ext.Msg.alert('提示', '请先维护部门业务单元对照表');
		           					return false;
		           				}
		           			});
		           
		           			execServer('ssxmb_zjm', {
		           				'dept': sybm
		           			}, function(res) {
		           				if(res.data[0]) {
		           					data[0].set('u_lchsbmzjm', res.data[0].user_mnemCodeInAccDepart)
		           				} else {
		           					Ext.Msg.alert('提示', '浪潮核算部门的助记码没有和新中大部门编码保持一致');
		           					return false;
		           				}
		           			});
		    });
		
		
		

        /*根据当前用户id带出部门start*/
        callServer('bm', [{
            'id': id
        }], function(res) {
            if(res.record[0]) {
                mstform.getItem('deptid').setValue(res.record[0].dept);
                BatchBindCombox([mstform.getItem('deptid')]);
            }
        });
        /*根据当前用户id带出部门end*/


        mstform.getItem('zjyf').addListener('change', function() {
            //判断设备类型和折旧年份是否输入
            if(Ext.isEmpty(mstform.getItem('zjnf').getValue()) || Ext.isEmpty(mstform.getItem('sblx').getValue())) {
                Ext.Msg.alert('提示', '请先输入设备类型和折旧年份');
                return false;
            }
            var z = mstform.getItem('ocode').getValue();
			var bz = mstform.getItem('ocode').getValue();
            var y = mstform.getItem('zjnf').getValue();
            var m = mstform.getItem('zjyf').getValue();
            var sblx = mstform.getItem('sblx').getValue();
			var u_jtkplxqf = mstform.getItem('u_jtkplxqf').getValue();
			if(z == '324191209000001'){
				z=u_jtkplxqf
			}
			
            //引用组织名称
            callServer('zzmc', [{
                'zzid': bz
            }], function(res) {
                var zz = res.record[0].oname;
                mstform.getItem('title').setValue(zz + y + '年' + m + '月' + '资产折旧单');
            });
            var a = 1;
            //校验

            callServer('djyz', [{
                'nd': y,
                'sblx': sblx,
                'zz': bz
            }], function(res) {
                var max = 1;
                if(res.record.length > 0) {
                    for(var i = 0; i < res.record.length; i++) {
                        var flag = parseInt(res.record[i].zjyf);
                        m = parseInt(m);
                        if(flag > max) {
                            max = flag;
                        }

                    }
                    if((m - max) > 1) {
                        Ext.Msg.alert('提示', '请先审核或者录入' + (parseInt(max) + 1) + '月数据');
                        a = 0;
                        dstore.removeAll();
                        return false;
                    }
                }
            });
			
            //引用资产卡片
            if(a == 1) {
                console.log(z, sblx, y, m);
                if(sblx != 4) {
                    if(m != 1) {
                        callServer('yyzp', [{
                            'zz': z,
                            'sblx': sblx,
                            'nd': y,
                            'yd': m
                        }], function(res) {
console.log(res.record)
                            if(res.status != 'ok') { //判断取数状态
                                Ext.Msg.alert('提示', '服务端取数失败');
                                return;
                            } else if(res.record.length == 0) { //判断数组行数
                                Ext.Msg.alert('提示', '服务器无上期卡片信息，请检测折旧月份');
                                return;
                            } else {
                                dstore.removeAll(); //清除单据体内所有数据
                                dstore.insert(dstore.getCount(), res.record); //将服务端获取的数组内容插入到单据体
                                //资产净值、减值  价税合计
                                Ext.Array.each(dstore.data.items, function(record) {
                                    a += Ext.Number.from(record.get('jz'), 0)
                                    mstform.getItem('hj_jzje').setValue(a);
                                });
                                Ext.Array.each(dstore.data.items, function(record) {
                                    b += Ext.Number.from(record.get('ljzj'), 0)
                                    mstform.getItem('hj_zcjz').setValue(b);
                                });
                                Ext.Array.each(dstore.data.items, function(record) {
                                    c += Ext.Number.from(record.get('se'), 0)
                                    mstform.getItem('hj_se').setValue(c);
                                });
                            }
                        });
						
						callServer('yyzpftxx', [{
						    'zz': z,
						    'sblx': sblx,
						    'nd': y,
						    'yd': m
						}], function(res) {
						    if(res.status != 'ok') { //判断取数状态
						        Ext.Msg.alert('提示', '服务端取数失败');
						        return;
						    } else if(res.record.length == 0) { //判断数组行数
						        Ext.Msg.alert('提示', '服务器无上期卡片信息，请检测折旧月份');
						        return;
						    } else {
						        dstore1.removeAll(); //清除单据体内所有数据
						        dstore1.insert(dstore1.getCount(), res.record); //将服务端获取的数组内容插入到单据体
						        //资产净值、减值  价税合计
						    }
						}); 
						
                    } else {
                     
						
						
						callServer('yyzpp', [{
						    'zz': z,
						    'sblx': sblx,
						    'nd': y,
						
						}], function(res) {
						    if(res.status != 'ok') { //判断取数状态
						        Ext.Msg.alert('提示', '服务端取数失败');
						        return;
						    } else if(res.record.length == 0) { //判断数组行数
						        Ext.Msg.alert('提示', '服务器无上期卡片信息，请检测折旧月份');
						        return;
						    } else {
						        dstore.removeAll(); //清除单据体内所有数据
						        dstore.insert(dstore.getCount(), res.record); //将服务端获取的数组内容插入到单据体
						        //资产净值、减值  价税合计
						        Ext.Array.each(dstore.data.items, function(record) {
						            a += Ext.Number.from(record.get('jz'), 0)
						
						            mstform.getItem('hj_jzje').setValue(a);
						        });
						        Ext.Array.each(dstore.data.items, function(record) {
						            b += Ext.Number.from(record.get('ljzj'), 0)
						
						            mstform.getItem('hj_zcjz').setValue(b);
						        });
						        Ext.Array.each(dstore.data.items, function(record) {
						            c += Ext.Number.from(record.get('se'), 0)
						
						            mstform.getItem('hj_se').setValue(c);
						        });
						    }
						});
						
						callServer('yzppftxx', [{
						    'zz': z,
						    'sblx': sblx,
						    'nd': y,
						
						}], function(res) {
						    if(res.status != 'ok') { //判断取数状态
						        Ext.Msg.alert('提示', '服务端取数失败');
						        return;
						    } else if(res.record.length == 0) { //判断数组行数
						        Ext.Msg.alert('提示', '服务器无上期卡片信息，请检测折旧月份');
						        return;
						    } else {
						        dstore1.removeAll(); //清除单据体内所有数据
						        dstore1.insert(dstore1.getCount(), res.record); //将服务端获取的数组内容插入到单据体
						    }
						});

                    }
                } else {
                    callServer('wxzc', [{
                        'zz': z,
                        'sblx': sblx,
                        'nd': y,
                        'yd': m
                    }], function(res) {
                        if(res.status != 'ok') { //判断取数状态
                            Ext.Msg.alert('提示', '服务端取数失败');
                            return;
                        } else if(res.record.length == 0) { //判断数组行数
                            Ext.Msg.alert('提示', '服务器无上期卡片信息，请检测折旧月份');
                            return;
                        } else {

                            dstore.removeAll(); //清除单据体内所有数据
                            dstore.insert(dstore.getCount(), res.record); //将服务端获取的数组内容插入到单据体
                            //资产净值、减值  价税合计
                            Ext.Array.each(dstore.data.items, function(record) {
                                a += Ext.Number.from(record.get('jz'), 0)
                                mstform.getItem('hj_jzje').setValue(a);
                            });
                            Ext.Array.each(dstore.data.items, function(record) {
                                b += Ext.Number.from(record.get('ljzj'), 0)
                                mstform.getItem('hj_zcjz').setValue(b);
                            });
                            Ext.Array.each(dstore.data.items, function(record) {
                                c += Ext.Number.from(record.get('se'), 0)
                                mstform.getItem('hj_se').setValue(c);
                            });
                        }
                    });
					
					
					callServer('wxzcftxx', [{
					    'zz': z,
					    'sblx': sblx,
					    'nd': y,
					    'yd': m
					}], function(res) {
					    if(res.status != 'ok') { //判断取数状态
					        Ext.Msg.alert('提示', '服务端取数失败');
					        return;
					    } else if(res.record.length == 0) { //判断数组行数
					        Ext.Msg.alert('提示', '服务器无上期卡片信息，请检测折旧月份');
					        return;
					    } else {
					        dstore1.removeAll(); //清除单据体内所有数据
					        dstore1.insert(dstore1.getCount(), res.record); //将服务端获取的数组内容插入到单据体
					        
					    }
					});
					

                }

            }

        });
    }

}
//获取附件张数
function attachReturnExt(key, value) {
    var mstform = Ext.getCmp('p_form0000000244_m');
    if(key == 'closeNG3Container') {
        if(value == '') {
            mstform.getItem('fj_num').setValue();
        } else {
            var res = Ext.decode(value);
            mstform.getItem('fj_num').setValue(res.length);
        }
    } else {
        return;
    }
}

