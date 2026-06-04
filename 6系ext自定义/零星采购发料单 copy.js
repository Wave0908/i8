function allReadyEdit() {
	var mstform = Ext.getCmp('p_form0000700183_m');
	var dgrid = Ext.getCmp('p_form0000700183_dgrid');
	//增加按钮
	var Toolbar = Ext.getCmp('toolbar');
	var dstore = dgrid.store;
	mstform.getItem ('u_lcywdy').userSetReadOnly(true);
	mstform.getItem ('u_lchsbmzjm').userSetReadOnly(true);
	mstform.getItem('checkpsn').setVisible(false);
	mstform.getItem('title').setVisible(false);
	mstform.getItem ('u_djzt').userSetReadOnly(true);
	mstform.getItem ('u_djzt').setValue('0'); 
	mstform.getItem ('u_cklb').userSetReadOnly(true);
	mstform.getItem ('u_cklb').setValue('0'); 
	mstform.getItem ('u_istbinspur').userSetReadOnly(true);
	mstform.getItem ('u_tbinspurtime').userSetReadOnly(true);
	mstform.getItem ('ocode').userSetReadOnly(true);
	mstform.getItem('u_ckje').userSetReadOnly(true);
	dgrid.setReadOnlyCol('u_lcywdy', true);
	dgrid.setReadOnlyCol('u_lchsbmzjm', true);
	
	
	
	/*增加一个推送按钮只在单据审核的时候推送start*/
	if(otype == $Otype.VIEW) {
	
		execServer('lxcgwzfldzb', {
			'phid': busid
		}, function(res) {
			if(res.data[0].ischeck == '1') {
				Toolbar.insert(18, {
					itemId: "push",
					text: "推送浪潮",
					width: this.itemWidth,
					iconCls: "icon-New"
				});
	
				//单据页面加载完
				mstform.on('dataready', function() {
					var chkflg = '1'; //mstform.getItem("ChkFlg").getValue();
					var Creator = mstform.getItem("fillpsn").getValue();
					if(chkflg == '1') {
						var temp = 0;
						execServer('jsqxsq', {
							'a': $appinfo.userID
						}, function(res) {
							for(var i = 0; i < res.data.length; i++) {
								if(res.data[i].roleno == 'admin01') {
									temp = 1;
								}
							}
							if(temp == 1) {
								Toolbar.get('push').enable();
							} else {
								if(Creator == $appinfo.userID) {
									Toolbar.get('push').enable();
								} else {
									Toolbar.get('push').disable();
								}
	
							}
						});
	
					} else {
						Toolbar.get('push').disable();
					}
	
				});
	
				Toolbar.items.get('push').on('click', function() {
	
					/*AJAX请求start*/
					Ext.Ajax.request({
						type: 'POST',
						dataType: 'json',
						contentType: 'application/json;charset=UTF-8',
						jsonData: {
							//"phid": mstform.queryById("busid").getValue()
							"phid": busid
						},
						url: location.protocol + "//" + location.host + "/MCC22ToFSSC/api/WZFLD/WZFLDLxcg",
						async: false, //同步请求
						success: function(response) {
							window.wait = false;
							var resdata = JSON.parse(response.text);
							var status = resdata["status"];
							var message = resdata["message"];
							if(status == "success") {
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
					/*AJAX请求end*/
	
				});
	
			}
		});
	}
	
	
	
	mstform.getItem('u_ywlx').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
			mstform.getItem('u_ywlx').setClientSqlFilter(" zd='业务类型' and djmc='物资发料单' ");
	
		});
	dgrid.getColumn('u_cllb_name').getEditor().addListener('beforetriggerclick', function() {
			var user_ywlx = mstform.getItem('u_ywlx').getValue();
			if(Ext.isEmpty(u_ywlx)) {
				Ext.Msg.alert('提示', '请先维护gs业务类型');
				return false;
			}
	
			dgrid.getColumn('u_cllb_name').getEditor().setClientSqlFilter(" u_nm  in (  select YWLBCLLBSET_CLID from cllbdzbfld where  BZZXYWLB_NM in (select gs_nm from p_form0000000257_d where phid= ' " + user_ywlx + " ' )  )");
		});	
		
		
		
		dgrid.getColumn('u_bm_name').getEditor().on('beforetriggerclick', function(eOp, ignoreBeforeEvent) {
			var ocode = mstform.getItem('ocode').getValue();
			if(!ocode) {
				alert('请先选择单位名称');
				return false;
			} else {
				dgrid.getColumn('u_bm_name').getEditor().setOutFilter({
					parent_orgid: ocode
				});
			}
		});
		
		dgrid.getColumn('u_bm_name').getEditor().on('helpselected', function(eOp, ignoreBeforeEvent) {
			// 选择gs单位 带出 浪潮的数据
			var data = dgrid.getSelectionModel().getSelection();
			var u_bm = data[0].get('u_bm');
			callServer('ngdept', [{
				dept: u_bm
			}], function(res) {
				if(res.record[0]) {
					data[0].set('u_lcywdy', res.record[0].user_lcywdy)
				}
			});
			callServer('ngdeptlchsbm', [{
				dept: u_bm
			}], function(res) {
				if(res.record[0]) {
					data[0].set('u_lchsbmzjm', res.record[0].user_mnemcodeinaccdepart)
				}
			});
		});
		
		
		mstform.getItem('u_lxcg_dept').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
			var zz = mstform.getItem('ocode').getValue();
			mstform.getItem('u_lxcg_dept').setOutFilter({
				parent_orgid: zz
			}) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
		});
		
		mstform.getItem('u_lxcg_dept').addListener('helpselected', function() {
			var u_lxcg_dept = mstform.getItem('u_lxcg_dept').getValue();
		
			execServer('ssxmb_bmywdy', {
				'dept': u_lxcg_dept
			}, function(res) {
				if(res.data[0]) {
					mstform.getItem('u_lcywdy').setValue(res.data[0].user_lcywdy);
				} else {
					Ext.Msg.alert('提示', '请先维护部门业务单元对照表');
					return false;
				}
			});
		
			execServer('ssxmb_zjm', {
				'dept': u_lxcg_dept
			}, function(res) {
				if(res.data[0]) {
					mstform.getItem('u_lchsbmzjm').setValue(res.data[0].user_mnemCodeInAccDepart);
				} else {
					Ext.Msg.alert('提示', '浪潮核算部门的助记码没有和新中大部门编码保持一致');
					return false;
				}
			});
		
		});
		
		
		
		dgrid.addListener('edit', function (editor, e) {
		      if (e.originalValue == e.value) {return;}                                         
		      if (e.field == 'u_ckje' ) {           
		            var record = e.record;   					
					var a=dgrid.getStore().getRange(0, dstore.getCount() - 1); 
					var u_ckje = 0; //出库金额
						Ext.Array.each(dstore.data.items, function(record) {
							u_ckje += Ext.Number.from(record.get('u_ckje'));
						})									
		             mstform.getItem('u_ckje').setValue(u_ckje);         
		          };                                                                             
		      }); 
		
	
}