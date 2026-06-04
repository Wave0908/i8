function allReadyEdit() {
	var mstform = Ext.getCmp('p_form0000000225_m');
	var Toolbar = Ext.getCmp('toolbar');
	mstform.getItem('yyqs').setValue(0);
	mstform.getItem('ljzj').setValue(0);
	Toolbar.insert(2, {
		itemId: "YY",
		text: "引入",
		width: this.itemWidth,
		iconCls: "icon-New"
	});
	mstform.getItem('cz').userSetReadOnly(true);
	mstform.getItem('zcbm').userSetReadOnly(true);
	mstform.getItem ('yzje').userSetReadOnly(true); 
	mstform.getItem('yyqs').userSetMustInput(true);
	if(otype == $Otype.ADD || otype == $Otype.EDIT) {
		//新增时界面隐藏
		//mstform.getItem('sccj').setVisible(false);
		mstform.getItem('scrq').setVisible(false);
		//mstform.getItem('zclyfs').setVisible(false);
		mstform.getItem('zzqlr').setVisible(false);
		mstform.getItem('vendor_id').setVisible(false);
		mstform.getItem('car_cph').setVisible(false);
		mstform.getItem('car_fdj').setVisible(false);
		mstform.getItem('car_cjbh').setVisible(false);
		mstform.getItem('car_dl').setVisible(false);
		mstform.getItem('car_zl').setVisible(false);
		mstform.getItem('car_pl').setVisible(false);
		mstform.getItem('car_nl').setVisible(false);
		mstform.getItem('bbh').setVisible(false);
		mstform.getItem('mqqlr').setVisible(false);
		mstform.getItem('sjzyr').setVisible(false);
		mstform.getItem('zzsyr').setVisible(false);
		mstform.getItem('jzjg').setVisible(false);
		//mstform.getItem('jglx').setVisible(false);
		mstform.getItem('jcrq').setVisible(false);
		mstform.getItem('jzmj').setVisible(false);
		mstform.getItem('zdmj').setVisible(false);
		mstform.getItem('tdyt').setVisible(false);
		mstform.getItem('fczbh').setVisible(false);
		mstform.getItem('cg').setVisible(false);
		mstform.getItem('zcg').setVisible(false);
		mstform.getItem('fcly').setVisible(false);
		mstform.getItem('tdzbh').setVisible(false);
		mstform.getItem('textcol_1').setVisible(false);
		mstform.getItem('xxdz').setVisible(false);
		mstform.getItem('jhcz').setVisible(false);
		mstform.getItem('tgys').setVisible(false);
		//引用入账通知单

		Toolbar.get('YY').on('click', function() { //按钮更新事件
			var lb = mstform.getItem('zclx').getValue();
			if(Ext.isEmpty(lb)) {
				Ext.Msg.alert('提示', '请选择资产类型，一旦选择不可更改');
				return false; //跳出判断回到点击事件，
			}
			mstform.getItem('zclx').userSetReadOnly(true);
			if(lb == 1) {
				mstform.getItem('sccj').setVisible(false);
				//控制显示
				zc_ls();

				//调用通用帮助，MultiRichHelp多选，RichHelp单选
				var help = Ext.create('Ext.ng.RichHelp', {
					//代码列
					valueField: 'phid',
					//名称列   
					displayField: 'zcmc',
					//获取帮助ID
					helpid: 'zc_ls',
					ORMMode: false,

					//过滤条件，m_code为过滤字段，userhelp_1为过滤字段的值
					outFilter: {
						'zckp_ls.ocode': mstform.getItem('ocode').getValue()
					}
				});
				help.showHelp();
				help.on('helpselected', function(obj) {
					mstform.getItem('zcmc').setValue(obj.data.zcmc);
					mstform.getItem('title').setValue(obj.data.zcmc);
					//来源管理 glbm1 使用glbm
					mstform.getItem('deptid').setValue(obj.data.glbm);
					mstform.getItem('deptid2').setValue(obj.data.sybm);
					mstform.getItem('zcbm').setValue(obj.data.zcbm);
					mstform.getItem('ggxh').setValue(obj.data.ggxh);
					mstform.getItem('xczlb').setValue(obj.data.zclb);
					mstform.getItem('zcflb').setValue(obj.data.zcfl);
					mstform.getItem('jldw').setValue(obj.data.msunit);
					mstform.getItem('zclyfs').setValue(obj.data.zclyfs);
					mstform.getItem('num').setValue(obj.data.qty_1);
					mstform.getItem('tax').setValue(obj.data.sl);
					mstform.getItem('amt_tax').setValue(obj.data.se);
					mstform.getItem('price').setValue(obj.data.prc);
					mstform.getItem('amt').setValue(obj.data.hsje);
					mstform.getItem('yz').setValue(obj.data.yz_amt);
					mstform.getItem('zjnx').setValue(obj.data.zjnxn);
					mstform.getItem('zjqs').setValue(obj.data.zjnxn * 12);
					mstform.getItem('cz').setValue(obj.data.cz);
					mstform.getItem('jz_amt').setValue(obj.data.jz);
					mstform.getItem('zjl').setValue(obj.data.czl);
					//mstform.getItem('jhcz').setValue(obj.data.jhcz);
					mstform.getItem('qyrq').setValue(obj.data.qyrq);
					mstform.getItem('szrq').setValue(obj.data.szrq);
					mstform.getItem('scrq').setValue(obj.data.ccrq);
					mstform.getItem('sccj').setValue(obj.data.sccj);
					mstform.getItem('yzje').setValue(obj.data.yz_amt * obj.data.deprate);
					mstform.getItem('qzjl').setValue(obj.data.deprate);
					mstform.getItem('yzje').setValue(obj.data.yzje);
					mstform.getItem('remarks').setValue(obj.data.remarks);
					//管理、使用组织
					var glzz = mstform.getItem('deptid2').getValue();
					var syzz = mstform.getItem('deptid2').getValue();
					callServer('zc_glzz', [{
						'A': glzz
					}], function(res) {
						mstform.getItem('ocode').setValue(res.record[0].phid);
					});
					callServer('zc_glzz', [{
						'A': syzz
					}], function(res) {
						mstform.getItem('user_ocode').setValue(res.record[0].phid);
					});
					//代码转名称
					BatchBindCombox([
						mstform.getItem('deptid'),
						mstform.getItem('deptid2'),
						mstform.getItem('ocode'),
						mstform.getItem('user_ocode'),
						mstform.getItem('xczlb'),
						mstform.getItem('zcflb'),
						mstform.getItem('jldw'),
						mstform.getItem('vendor_id'),
						mstform.getItem('zclyfs')
					]);
				});
			}
			if(lb == 2) {
				mstform.getItem('sccj').setVisible(false);
				zc_fc();
				//调用通用帮助
				var help = Ext.create('Ext.ng.RichHelp', {
					//代码列
					valueField: 'phid',
					//名称列   
					displayField: 'zcmc',
					//获取帮助ID
					helpid: 'zckp_fc',
					ORMMode: false,

					//过滤条件，m_code为过滤字段，userhelp_1为过滤字段的值
					outFilter: {
						'zckp_fc.ocode': mstform.getItem('ocode').getValue()
					}
				});
				help.showHelp();
				//表头赋值
				help.on('helpselected', function(obj) {
					mstform.getItem('zcmc').setValue(obj.data.zcmc);
					mstform.getItem('title').setValue(obj.data.zcmc);
					//来源管理 glbm1 使用glbm
					mstform.getItem('deptid').setValue(obj.data.glbm);
					mstform.getItem('deptid2').setValue(obj.data.sybm);
					mstform.getItem('zcbm').setValue(obj.data.zcbm);
					mstform.getItem('ggxh').setValue(obj.data.ggxh);
					mstform.getItem('xczlb').setValue(obj.data.zclb);
					mstform.getItem('zcflb').setValue(obj.data.zcfl);
					mstform.getItem('jldw').setValue(obj.data.msunit);
					mstform.getItem('syzt').setValue(obj.data.syzt);
					mstform.getItem('zclyfs').setValue(obj.data.zclyfs);
					mstform.getItem('zzqlr').setValue(obj.data.zzqlr);
					mstform.getItem('num').setValue(obj.data.qty_1);
					mstform.getItem('tax').setValue(obj.data.sl);
					mstform.getItem('amt_tax').setValue(obj.data.se);
					//mstform.getItem('').setValue(obj.data.prc);
					mstform.getItem('price').setValue(obj.data.prc);
					mstform.getItem('amt').setValue(obj.data.hsje);
					mstform.getItem('yz').setValue(obj.data.yz_amt);
					mstform.getItem('zjnx').setValue(obj.data.zjnxn);
					mstform.getItem('zjqs').setValue(obj.data.zjnxn * 12);
					mstform.getItem('zjl').setValue(obj.data.czl);
					mstform.getItem('cz').setValue(obj.data.cz);
					mstform.getItem('jz_amt').setValue(obj.data.jz);
					//mstform.getItem('cz').setValue(obj.data.cz);
					mstform.getItem('yzje').setValue(obj.data.yzje);
					mstform.getItem('yyqs').setValue(obj.data.qty);
					mstform.getItem('ljzj').setValue(obj.data.ljzj);
					mstform.getItem('szrq').setValue(obj.data.szrq);
					mstform.getItem('qyrq').setValue(obj.data.qyrq);
					mstform.getItem('mqqlr').setValue(obj.data.mqqlr);
					mstform.getItem('sjzyr').setValue(obj.data.sjzyr);
					mstform.getItem('zzsyr').setValue(obj.data.zztdsyqr);
					mstform.getItem('jzjg').setValue(obj.data.jzjg);
					mstform.getItem('jcrq').setValue(obj.data.jcrq);
					mstform.getItem('jzmj').setValue(obj.data.jzmj);
					mstform.getItem('jzjg').setValue(obj.data.jzjg);
					mstform.getItem('tdyt').setValue(obj.data.tdyt);
					mstform.getItem('fczbh').setValue(obj.data.fczbh);
					mstform.getItem('cg').setValue(obj.data.cg);
					mstform.getItem('zcg').setValue(obj.data.zcs);
					mstform.getItem('fcly').setValue(obj.data.fcly);
					mstform.getItem('tdzbh').setValue(obj.data.tdzbh);
					mstform.getItem('textcol_1').setValue(obj.data.bdwzdjc);
					mstform.getItem('xxdz').setValue(obj.data.xxzkdz);
					mstform.getItem('remarks').setValue(obj.data.remarks);
					//管理、使用组织
					var glzz = mstform.getItem('deptid2').getValue();
					var syzz = mstform.getItem('deptid2').getValue();
					callServer('zc_glzz', [{
						'A': glzz
					}], function(res) {
						mstform.getItem('ocode').setValue(res.record[0].phid);
					});
					callServer('zc_glzz', [{
						'A': syzz
					}], function(res) {
						mstform.getItem('user_ocode').setValue(res.record[0].phid);
					});
					//代码转名称
					BatchBindCombox([
						mstform.getItem('deptid'),
						mstform.getItem('deptid2'),
						mstform.getItem('ocode'),
						mstform.getItem('user_ocode'),
						mstform.getItem('xczlb'),
						mstform.getItem('zcflb'),
						mstform.getItem('jldw'),
						mstform.getItem('zclyfs')
					]);
				});
			}
			//设备
			if(lb == 3) {
				mstform.getItem('sccj').setVisible(true);
				//控制显示
				zc_sb();
				//调用通用帮助，MultiRichHelp多选，RichHelp单选
				var help = Ext.create('Ext.ng.RichHelp', {
					//代码列
					valueField: 'phid',
					//名称列   
					displayField: 'zcmc',
					//获取帮助ID
					helpid: 'zckp_sb',
					ORMMode: false,

					//过滤条件，m_code为过滤字段，userhelp_1为过滤字段的值
					outFilter: {
						'zckp_sb.ocode': mstform.getItem('ocode').getValue()
					}
				});
				help.showHelp();
				help.on('helpselected', function(obj) {
					mstform.getItem('zcmc').setValue(obj.data.zcmc);
					mstform.getItem('title').setValue(obj.data.zcmc);
					//来源管理 glbm1 使用glbm
					mstform.getItem('deptid').setValue(obj.data.glbm);
					mstform.getItem('deptid2').setValue(obj.data.sybm);
					mstform.getItem('zcbm').setValue(obj.data.zcbm);
					mstform.getItem('ggxh').setValue(obj.data.ggxh);
					mstform.getItem('xczlb').setValue(parseInt(obj.data.zclb));
					mstform.getItem('zcflb').setValue(obj.data.zcfl);
					mstform.getItem('jldw').setValue(obj.data.msunit);
					mstform.getItem('zclyfs').setValue(obj.data.zclyfs);
					mstform.getItem('num').setValue(obj.data.qty_1);
					mstform.getItem('tax').setValue(obj.data.sl);
					mstform.getItem('amt_tax').setValue(obj.data.se);
					mstform.getItem('price').setValue(obj.data.prc);
					mstform.getItem('amt').setValue(obj.data.hsje);
					mstform.getItem('yz').setValue(obj.data.yz_amt);
					mstform.getItem('zjnx').setValue(obj.data.zjnxn);
					mstform.getItem('zjqs').setValue(obj.data.zjnxn * 12);
					mstform.getItem('cz').setValue(obj.data.cz);
					mstform.getItem('jz_amt').setValue(obj.data.jz);
					mstform.getItem('zjl').setValue(obj.data.czl);
					mstform.getItem('jhcz').setValue(obj.data.jhcz);
					mstform.getItem('qyrq').setValue(obj.data.qyrq);
					mstform.getItem('szrq').setValue(obj.data.szrq);
					mstform.getItem('scrq').setValue(obj.data.ccrq);
					mstform.getItem('sccj').setValue(obj.data.sccj);
					mstform.getItem('yzje').setValue(obj.data.yzje);
					mstform.getItem('qzjl').setValue(obj.data.deprate);
					mstform.getItem('yzje').setValue(obj.data.yzje);
					mstform.getItem('remarks').setValue(obj.data.remarks);
					//管理、使用组织
					var glzz = mstform.getItem('deptid2').getValue();
					var syzz = mstform.getItem('deptid2').getValue();
					callServer('zc_glzz', [{
						'A': glzz
					}], function(res) {
						mstform.getItem('ocode').setValue(res.record[0].phid);
					});
					callServer('zc_glzz', [{
						'A': syzz
					}], function(res) {
						mstform.getItem('user_ocode').setValue(res.record[0].phid);
					});
					//代码转名称
					BatchBindCombox([
						mstform.getItem('deptid'),
						mstform.getItem('deptid2'),
						mstform.getItem('ocode'),
						mstform.getItem('user_ocode'),
						mstform.getItem('xczlb'),
						mstform.getItem('zcflb'),
						mstform.getItem('jldw'),
						mstform.getItem('vendor_id'),
						mstform.getItem('zclyfs')
					]);
				});
			}
			if(lb == 4) {
				mstform.getItem('sccj').setVisible(false);
				//控制显示
				zc_wx();
				//调用通用帮助，MultiRichHelp多选，RichHelp单选
				var help = Ext.create('Ext.ng.RichHelp', {
					//代码列
					valueField: 'phid',
					//名称列   
					displayField: 'zcmc',
					//获取帮助ID
					helpid: 'zckp_wx',
					ORMMode: false,

					//过滤条件，m_code为过滤字段，userhelp_1为过滤字段的值
					outFilter: {
						'zckp_wx.ocode': mstform.getItem('ocode').getValue()
					}
				});
				help.showHelp();
				help.on('helpselected', function(obj) {
					mstform.getItem('zcmc').setValue(obj.data.zcmc);
					mstform.getItem('title').setValue(obj.data.zcmc);
					//来源管理 glbm1 使用glbm
					mstform.getItem('deptid').setValue(obj.data.glbm);
					mstform.getItem('deptid2').setValue(obj.data.sybm);
					mstform.getItem('zcbm').setValue(obj.data.zcbm);
					mstform.getItem('ggxh').setValue(obj.data.ggxh);
					mstform.getItem('xczlb').setValue(obj.data.zclb);
					mstform.getItem('zcflb').setValue(obj.data.zcfl);
					mstform.getItem('jldw').setValue(obj.data.msunit);
					mstform.getItem('zclyfs').setValue(obj.data.zclyfs);
					mstform.getItem('num').setValue(obj.data.qty_1);
					mstform.getItem('tax').setValue(obj.data.sl);
					mstform.getItem('amt_tax').setValue(obj.data.se);
					mstform.getItem('price').setValue(obj.data.prc);
					mstform.getItem('amt').setValue(obj.data.hsje);
					mstform.getItem('yz').setValue(obj.data.yz_amt);
					//mstform.getItem('zjnx').setValue(obj.data.zjnxn);
					mstform.getItem('zjqs').setValue(obj.data.zjqs);
					mstform.getItem('cz').setValue(obj.data.cz);
					mstform.getItem('jz_amt').setValue(obj.data.jz);
					mstform.getItem('zjl').setValue(obj.data.czl);
					//mstform.getItem('jhcz').setValue(obj.data.jhcz);
					mstform.getItem('qyrq').setValue(obj.data.qyrq);
					mstform.getItem('szrq').setValue(obj.data.szrq);
					//mstform.getItem('scrq').setValue(obj.data.ccrq);
					//mstform.getItem('sccj').setValue(obj.data.sccj);
					mstform.getItem('yzje').setValue(obj.data.yzje);
					mstform.getItem('qzjl').setValue(obj.data.deprate);
					mstform.getItem('remarks').setValue(obj.data.remarks);
					var glzz = mstform.getItem('deptid2').getValue();
					var syzz = mstform.getItem('deptid2').getValue();
					//管理、使用组织
					callServer('zc_glzz', [{
						'A': glzz
					}], function(res) {
						mstform.getItem('ocode').setValue(res.record[0].phid);
					});
					callServer('zc_glzz', [{
						'A': syzz
					}], function(res) {
						mstform.getItem('user_ocode').setValue(res.record[0].phid);
					});
					//代码转名称
					BatchBindCombox([
						mstform.getItem('deptid'),
						mstform.getItem('deptid2'),
						mstform.getItem('ocode'),
						mstform.getItem('user_ocode'),
						mstform.getItem('xczlb'),
						mstform.getItem('zcflb'),
						mstform.getItem('jldw'),
						mstform.getItem('vendor_id'),
						mstform.getItem('zclyfs')
					]);
				});
			}

		});


		//折旧期数选择后自动计算
		mstform.getItem('zjqs').addListener('itemchanged', function() {
			var y_ys = mstform.getItem('zjqs').getValue();
			var yz = mstform.getItem('yz').getValue();
			var cz = mstform.getItem('cz').getValue();
			mstform.getItem('yzje').setValue(((yz-cz)/y_ys))
			
		});

		//已用月数更改自动计算 itemchanged
		mstform.getItem('yyqs').addListener('itemchanged', function() {
			//折旧期数
			var z_jqs = mstform.getItem('zjqs').getValue();
			//已用月数
			var y_ys = mstform.getItem('yyqs').getValue();
			//原值
			var yz = mstform.getItem('yz').getValue();
			//残值
			var cz = mstform.getItem('cz').getValue();
			//月折旧额
			var y_amt = mstform.getItem('yzje').getValue();
			if(y_ys == z_jqs) {
				mstform.getItem('jz_amt').setValue(cz);
				mstform.getItem('ljzj').setValue(y_amt * y_ys);
			} else {
				var ljzj = y_amt * y_ys;
				mstform.getItem('ljzj').setValue(y_amt * y_ys);
				mstform.getItem('jz_amt').setValue(yz - ljzj);
			}
		});

		//监听残值率改变后触发
		mstform.getItem('zjl').addListener('change', function() { //监听表头zjl字段值发生变化后立即触发

			mstform.getItem('cz').setValue(mstform.getItem('zjl').getValue() * mstform.getItem('yz').getValue());
		});
		//监听残值率改变后触发
		mstform.getItem('yz').addListener('change', function() { //监听表头zjl字段值发生变化后立即触发

			mstform.getItem('cz').setValue(mstform.getItem('zjl').getValue() * mstform.getItem('yz').getValue());
		});

		//临设类
		function zc_ls() {
			var mstform = Ext.getCmp('p_form0000000225_m');
			//显示
			mstform.getItem('scrq').setVisible(true);
			mstform.getItem('zclyfs').setVisible(true);
			mstform.getItem('sccj').setVisible(true);
			//隐藏
			mstform.getItem('tgys').setVisible(false);
		}
		//房产类
		function zc_fc() {
			var mstform = Ext.getCmp('p_form0000000225_m');
			//显示
			mstform.getItem('zzqlr').setVisible(true);
			mstform.getItem('mqqlr').setVisible(true);
			mstform.getItem('sjzyr').setVisible(true);
			mstform.getItem('zzsyr').setVisible(true);
			mstform.getItem('jzjg').setVisible(true);
			mstform.getItem('jcrq').setVisible(true);
			mstform.getItem('jzmj').setVisible(true);
			mstform.getItem('zdmj').setVisible(true);
			mstform.getItem('tdyt').setVisible(true);
			mstform.getItem('fczbh').setVisible(true);
			mstform.getItem('cg').setVisible(true);
			mstform.getItem('zcg').setVisible(true);
			mstform.getItem('fcly').setVisible(true);
			mstform.getItem('tdzbh').setVisible(true);
			mstform.getItem('textcol_1').setVisible(true);
			mstform.getItem('xxdz').setVisible(true);
			//隐藏
			mstform.getItem('jhcz').setVisible(false);
			mstform.getItem('tgys').setVisible(false);
		}
		//设备类
		function zc_sb() {
			var mstform = Ext.getCmp('p_form0000000225_m');
			//设备类控制显示
			mstform.getItem('scrq').setVisible(true);
			mstform.getItem('zclyfs').setVisible(true);
			mstform.getItem('zzqlr').setVisible(true);
			mstform.getItem('vendor_id').setVisible(true);
			mstform.getItem('car_cph').setVisible(true);
			mstform.getItem('car_fdj').setVisible(true);
			mstform.getItem('car_cjbh').setVisible(true);
			mstform.getItem('car_dl').setVisible(true);
			mstform.getItem('car_zl').setVisible(true);
			mstform.getItem('car_pl').setVisible(true);
			mstform.getItem('car_nl').setVisible(true);
			mstform.getItem('zclyfs').setVisible(true);

			//控制隐藏
			mstform.getItem('jhcz').setVisible(false);
			mstform.getItem('jhcz').setVisible(false);
			return true;
		}

		function zc_wx() {
			var mstform = Ext.getCmp('p_form0000000225_m');
			//显示	
			mstform.getItem('zclyfs').setVisible(true);

			//隐藏
			mstform.getItem('jhcz').setVisible(false);
			mstform.getItem('zjnx').setVisible(false);
		}

	}

}