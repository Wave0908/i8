function allReadyEdit() { //顾客满意度&客户评价表
	var mstform = Ext.getCmp('p_form0000000029_m');
	var dgrid = Ext.getCmp('p_form0000000029_dgrid'); //表体容器
	var dstore = dgrid.store; //表体数据
	var dgrid1 = Ext.getCmp('p_form0000000029_d1grid'); //表体容器
	var dstore1 = dgrid1.store;
	var dgrid2 = Ext.getCmp('p_form0000000029_d2grid'); //表体容器
	var dstore2 = dgrid2.store;
	//var toolbar = Ext.getCmp('toolbar');
	//字段隐藏
	mstform.getItem('fillpsn').setVisible(false);
	mstform.getItem('checkpsn').setVisible(false);
	dgrid.hideColumn('ffhfbzs', true);
	dgrid.hideColumn('shhfbzs', true);
	dgrid1.hideColumn('shxyjyxl', true);
	dgrid1.hideColumn('zjqk', true);
	dgrid1.hideColumn('gckd', true);
	dgrid1.hideColumn('gckzfqk', true);
	dgrid1.hideColumn('spsxblqk', true);
	dgrid1.hideColumn('htqttklxqk', true);
	dgrid1.hideColumn('xcphyfwqk', true);
	dgrid1.hideColumn('glryztsz', true);
	dgrid1.hideColumn('xmlrqk', true);
	dgrid1.hideColumn('hxschzqk', true);
	//设置备注信息
	mstform.getItem('remarks').setValue(
		'80~100分，满意；60~80分基本满意；60分以下，不满意。维保项目为保修的请输入，保修方案，保修进度，保修质量，其它(保修)，维保项目没有保修的，请输入服务态度，技术咨询服务，其它 ');
	//--新增单据数据初始化--//
	//var num;
	if(otype == $Otype.ADD || otype == $Otype.EDIT) {
		/*新增情况执行自动填充在建和停工项目start*/
		if(otype == $Otype.ADD) {
			callServer('pq1', [{
				'zz': $appinfo.orgID
			}], function(res) {
				if(res.status != 'ok') { //判断取数状态
					Ext.Msg.alert('提示', '服务端取数失败');
					return;
				}  else {
					dstore.insert(dstore.getCount(), res.record); //将服务端获取的数组内容插入到单据体
				}
			})
			//停工项目填充
			callServer('pq2', [{
				'zz': $appinfo.orgID
			}], function(res) {
				if(res.status != 'ok') { //判断取数状态
					Ext.Msg.alert('提示', '服务端取数失败');
					return;
				}  else {
					dstore2.insert(dstore1.getCount(), res.record); //将服务端获取的数组内容插入到单据体
				}
			})
			//已完已结和已完未结项目填充
			callServer('pq3', [{
				'zz': $appinfo.orgID
			}], function(res) {
				if(res.status != 'ok') { //判断取数状态
					Ext.Msg.alert('提示', '服务端取数失败');
					return;
				}  else {
					dstore1.insert(dstore2.getCount(), res.record); //将服务端获取的数组内容插入到单据体
				}
			})

		}
		/*新增情况执行自动填充在建和停工项目end*/

		//在建项目
		dgrid.addListener('edit', function(editor, e) { //表体：计算总得分
			var record = e.record;
			if(e.field == 'xcztxxbj' || e.field == 'sgxczzgl' || e.field == 'sgjdkz' ||
				e.field == 'sgzlqk' || e.field == 'zypzyglqk' || e.field == 'sgaqglqk' || e.field == 'sgfabzzl' ||
				e.field == 'wmsgyhjgl' || e.field == 'xcphyfwqk' || e.field == 'glrydztsz'||e.field =='u_yfbfxtgt') {
				record.set('pjzf',
					(Ext.Number.from(record.get('xcztxxbj'), 0) +
					Ext.Number.from(record.get('sgxczzgl'), 0) +
					Ext.Number.from(record.get('sgjdkz'), 0) +
					Ext.Number.from(record.get('sgzlqk'), 0) +
					Ext.Number.from(record.get('zypzyglqk'), 0) +
					Ext.Number.from(record.get('sgaqglqk'), 0) +
					Ext.Number.from(record.get('sgfabzzl'), 0) +
					Ext.Number.from(record.get('wmsgyhjgl'), 0) +
					Ext.Number.from(record.get('xcphyfwqk'), 0) +
					Ext.Number.from(record.get('glrydztsz'), 0)+
                    Ext.Number.from(record.get('u_yfbfxtgt'), 0))/11
                    );
				if(Ext.Number.from(record.get('pjzf'), 0) < 60) {
					record.set('khmyd', '不满意');

				} else if(Ext.Number.from(record.get('pjzf'), 0) >= 60 && Ext.Number.from(record.get('pjzf'), 0) < 80) {
					record.set('khmyd', '基本满意');
				} else {
					record.set('khmyd', '满意');
				}
			}
			//现场总体形象布局
			if(record.get('xcztxxbj') < 0 || record.get('xcztxxbj') > 101) {
				var me = this;
				NGMsg.Error('分值需在0-100之间，请重新输入！')
				record.set('xcztxxbj', null);
				record.set('pjzf',null);
			}
			//施工现场组织管理
			if(record.get('sgxczzgl') < 0 || record.get('sgxczzgl') > 101) {
				var me = this;
				NGMsg.Error('分值需在0-100之间，请重新输入！')
				record.set('sgxczzgl', null);
				record.set('pjzf',null);
			}
			//施工进度控制及完成情况
			if(record.get('sgjdkz') < 0 || record.get('sgjdkz') > 101) {
				var me = this;
				NGMsg.Error('分值需在0-100之间，请重新输入！')
				record.set('sgjdkz', null);
				record.set('pjzf',null);
			}
			//施工质量情况
			if(record.get('sgzlqk') < 0 || record.get('sgzlqk') > 101) {
				var me = this;
				NGMsg.Error('分值需在0-100之间，请重新输入！')
				record.set('sgzlqk', null);
				record.set('pjzf',null);
			}
			//资源配置与管理情况
			if(record.get('zypzyglqk') < 0 || record.get('zypzyglqk') > 101) {
				var me = this;
				NGMsg.Error('分值需在0-100之间，请重新输入！')
				record.set('zypzyglqk', null);
				record.set('pjzf',null);
			}
			//施工安全管理情况
			if(record.get('sgaqglqk') < 0 || record.get('sgaqglqk') > 101) {
				var me = this;
				NGMsg.Error('分值需在0-100之间，请重新输入！')
				record.set('sgaqglqk', null);
				record.set('pjzf',null);
			}
			//施工方案编制质量与执行情况
			if(record.get('sgfabzzl') < 0 || record.get('sgfabzzl') > 101) {
				var me = this;
				NGMsg.Error('分值需在0-100之间，请重新输入！')
				record.set('sgfabzzl', null);
				record.set('pjzf',null);
			}
			//文明施工与环境管理
			if(record.get('wmsgyhjgl') < 0 || record.get('wmsgyhjgl') > 101) {
				var me = this;
				NGMsg.Error('分值需在0-100之间，请重新输入！')
				record.set('wmsgyhjgl', null);
				record.set('pjzf',null);
			}
			//现场配合与服务情况
			if(record.get('xcphyfwqk') < 0 || record.get('xcphyfwqk') > 101) {
				var me = this;
				NGMsg.Error('分值需在0-100之间，请重新输入！')
				record.set('xcphyfwqk', null);
				record.set('pjzf',null);
			}
			//管理人员的总体素质
			if(record.get('glrydztsz') < 0 || record.get('glrydztsz') > 101) {
				var me = this;
				NGMsg.Error('分值需在0-100之间，请重新输入！')
				record.set('glrydztsz', null);
				record.set('pjzf',null);
			}
            if(record.get('u_yfbfxtgt') < 0 || record.get('u_yfbfxtgt') > 101) {
				var me = this;
				NGMsg.Error('分值需在0-100之间，请重新输入！')
				record.set('u_yfbfxtgt', null);
				record.set('pjzf',null);
			}
		});
		//停工项目
		dgrid2.addListener('edit', function(editor, e) { //表体：计算总得分
			var record = e.record;
			if(e.field == 'xcztxxbj' || e.field == 'sgxczzgl' || e.field == 'sgjdkz' ||
				e.field == 'sgzlqk' || e.field == 'zypzyglqk' || e.field == 'sgaqglqk' || e.field == 'sgfabzzl' ||
				e.field == 'wmsgyhjgl' || e.field == 'xcphyfwqk' || e.field == 'glrydztsz') {
				mstform.getItem('tgfszs').userSetMustInput(true);
				mstform.getItem('tgshzs').userSetMustInput(true);
				record.set('pjzf',
					Ext.Number.from(record.get('xcztxxbj'), 0) +
					Ext.Number.from(record.get('sgxczzgl'), 0) +
					Ext.Number.from(record.get('sgjdkz'), 0) +
					Ext.Number.from(record.get('sgzlqk'), 0) +
					Ext.Number.from(record.get('zypzyglqk'), 0) +
					Ext.Number.from(record.get('sgaqglqk'), 0) +
					Ext.Number.from(record.get('sgfabzzl'), 0) +
					Ext.Number.from(record.get('wmsgyhjgl'), 0) +
					Ext.Number.from(record.get('xcphyfwqk'), 0) +
					Ext.Number.from(record.get('glrydztsz'), 0));
				if(Ext.Number.from(record.get('pjzf'), 0) < 60) {
					record.set('khmyd', '不满意');

				} else if(Ext.Number.from(record.get('pjzf'), 0) >= 60 && Ext.Number.from(record.get('pjzf'), 0) < 80) {
					record.set('khmyd', '基本满意');
				} else {
					record.set('khmyd', '满意');
				}
			}
			//现场总体形象布局
			if(record.get('xcztxxbj') < 0 || record.get('xcztxxbj') > 10) {
				var me = this;
				NGMsg.Error('分值需在0-10之间，请重新输入！')
				record.set('xcztxxbj', null);
				record.set('pjzf',null);
			}
			//施工现场组织管理
			if(record.get('sgxczzgl') < 0 || record.get('sgxczzgl') > 10) {
				var me = this;
				NGMsg.Error('分值需在0-10之间，请重新输入！')
				record.set('sgxczzgl', null);
				record.set('pjzf',null);
			}
			//施工进度控制及完成情况
			if(record.get('sgjdkz') < 0 || record.get('sgjdkz') > 10) {
				var me = this;
				NGMsg.Error('分值需在0-10之间，请重新输入！')
				record.set('sgjdkz', null);
				record.set('pjzf',null);
			}
			//施工质量情况
			if(record.get('sgzlqk') < 0 || record.get('sgzlqk') > 10) {
				var me = this;
				NGMsg.Error('分值需在0-10之间，请重新输入！')
				record.set('sgzlqk', null);
				record.set('pjzf',null);
			}
			//资源配置与管理情况
			if(record.get('zypzyglqk') < 0 || record.get('zypzyglqk') > 10) {
				var me = this;
				NGMsg.Error('分值需在0-10之间，请重新输入！')
				record.set('zypzyglqk', null);
				record.set('pjzf',null);
			}
			//施工安全管理情况
			if(record.get('sgaqglqk') < 0 || record.get('sgaqglqk') > 10) {
				var me = this;
				NGMsg.Error('分值需在0-10之间，请重新输入！')
				record.set('sgaqglqk', null);
				record.set('pjzf',null);
			}
			//施工方案编制质量与执行情况
			if(record.get('sgfabzzl') < 0 || record.get('sgfabzzl') > 10) {
				var me = this;
				NGMsg.Error('分值需在0-10之间，请重新输入！')
				record.set('sgfabzzl', null);
				record.set('pjzf',null);
			}
			//文明施工与环境管理
			if(record.get('wmsgyhjgl') < 0 || record.get('wmsgyhjgl') > 10) {
				var me = this;
				NGMsg.Error('分值需在0-10之间，请重新输入！')
				record.set('wmsgyhjgl', null);
				record.set('pjzf',null);
			}
			//现场配合与服务情况
			if(record.get('xcphyfwqk') < 0 || record.get('xcphyfwqk') > 10) {
				var me = this;
				NGMsg.Error('分值需在0-10之间，请重新输入！')
				record.set('xcphyfwqk', null);
				record.set('pjzf',null);
			}
			//管理人员的总体素质
			if(record.get('glrydztsz') < 0 || record.get('glrydztsz') > 10) {
				var me = this;
				NGMsg.Error('分值需在0-10之间，请重新输入！')
				record.set('glrydztsz', null);
				record.set('pjzf',null);
			}
		});
		//客户评价表
		dgrid1.addListener('edit', function(editor, e) { //表体：计算总得分

			if(e.originalValue == e.value) {
				return;
			}
			var record = e.record;
			if(e.field == 'sfwx' || e.field == 'fwtd' || e.field == 'jszx' ||
				e.field == 'wqt' || e.field == 'bxfa' || e.field == 'bxjd' || e.field == 'bxzl' ||
				e.field == 'bxqt') {
				mstform.getItem('wbffzs').userSetMustInput(true);
				mstform.getItem('wbshzs').userSetMustInput(true);
				var num = dstore1.getCount();
				var b = mstform.getItem('wbffzs').getValue(); //发放张数
				mstform.getItem('wbhfl').setValue((b / num).toFixed(4));
				if(record.get('sfwx') == 1) {
					//Bx_noshow();
					record.set('hj',
						Ext.Number.from(record.get('bxfa'), 0) * 2.5 +
						Ext.Number.from(record.get('bxjd'), 0) * 2.5 +
						Ext.Number.from(record.get('bxzl'), 0) * 2.5 +
						Ext.Number.from(record.get('bxqt'), 0) * 2.5
					);

				} else if(record.get('sfwx') == 2) {
					//Bx_show();
					record.set('hj',
						Ext.Number.from(record.get('fwtd'), 0) * 4 +
						Ext.Number.from(record.get('jszx'), 0) * 4 +
						Ext.Number.from(record.get('wqt'), 0) * 2
					);
				}
				if(Ext.Number.from(record.get('hj'), 0) < 60) {
					record.set('khmydw', '不满意');

				} else if(Ext.Number.from(record.get('hj'), 0) >= 60 && Ext.Number.from(record.get('hj'), 0) < 80) {
					record.set('khmydw', '基本满意');
				} else {
					record.set('khmydw', '满意');
				}

			}
			//客户服务
			if(record.get('khfw') < 0 || record.get('khfw') > 10) {
				var me = this;
				NGMsg.Error('分值需在0-10之间，请重新输入！')
				record.set('khfw', null);
				record.set('pjzf',null);
			}
			//咨询服务
			if(record.get('jszx') < 0 || record.get('jszx') > 10) {
				var me = this;
				NGMsg.Error('分值需在0-10之间，请重新输入！')
				record.set('jszx', null);
				record.set('pjzf',null);
			}
			//其它
			if(record.get('wqt') < 0 || record.get('wqt') > 10) {
				var me = this;
				NGMsg.Error('分值需在0-10之间，请重新输入！')
				record.set('wqt', null);
				record.set('pjzf',null);
			}
			//保修方案
			if(record.get('bxfa') < 0 || record.get('bxfa') > 10) {
				var me = this;
				NGMsg.Error('分值需在0-10之间，请重新输入！')
				record.set('bxfa', null);
				record.set('pjzf',null);
			}
			//进度
			if(record.get('bxjd') < 0 || record.get('bxjd') > 10) {
				var me = this;
				NGMsg.Error('分值需在0-10之间，请重新输入！')
				record.set('bxjd', null);
				record.set('pjzf',null);
			}
			//质量
			if(record.get('bxzl') < 0 || record.get('bxzl') > 10) {
				var me = this;
				NGMsg.Error('分值需在0-10之间，请重新输入！')
				record.set('bxzl', null);
				record.set('pjzf',null);
			}
			//其它
			if(record.get('bxqt') < 0 || record.get('bxqt') > 10) {
				var me = this;
				NGMsg.Error('分值需在0-10之间，请重新输入！')
				record.set('bxqt', null);
				record.set('pjzf',null);
			}

		});
		window.onload = function() {
			//计算在建回访发放率
			mstform.getItem('zzffzs').addListener('change', function() {
				var num = dstore.getCount();
				//console.log(num);
				var b = mstform.getItem('zzffzs').getValue(); //发放张数
				mstform.getItem('zjhfl').setValue((b / num).toFixed(4));
				console.log(num, b, (b / num).toFixed(4));
			});
			mstform.getItem('zzshzs').addListener('change', function() {
				var a = mstform.getItem('zzshzs').getValue(); //收回张数
				var b = mstform.getItem('zzffzs').getValue(); //发放张数
				if(a > b) {
					Ext.Msg.alert('提示', '收回张数大于发放张数，请修改');
					mstform.getItem('zzshzs').setValue('');
				} else {
					mstform.getItem('zjshl').setValue((a / b).toFixed(4));
				}
			});
			//计算维保发放回收率
			mstform.getItem('wbffzs').addListener('change', function() {
				var num = dstore1.getCount();
				var b = mstform.getItem('wbffzs').getValue(); //发放张数
				mstform.getItem('wbhfl').setValue((b / num).toFixed(4));
				var a = mstform.getItem('wbshzs').getValue(); //收回张数
				mstform.getItem('wbhsl').setValue((a / b).toFixed(4));
			});
			mstform.getItem('wbshzs').addListener('change', function() {
				var a = mstform.getItem('wbshzs').getValue(); //收回张数
				var b = mstform.getItem('wbffzs').getValue(); //发放张数
				if(a > b) {
					Ext.Msg.alert('提示', '收回张数大于发放张数，请修改');
					mstform.getItem('wbshzs').setValue('');
				} else {
					mstform.getItem('wbhsl').setValue((a / b).toFixed(4));
				}
			})
			//停工项目发放回收率
			mstform.getItem('tgfszs').addListener('change', function() {
				var num = dstore2.getCount();
				var b = mstform.getItem('tgfszs').getValue(); //发放张数
				mstform.getItem('tghfl').setValue((b / num).toFixed(4));
			});
			mstform.getItem('tgshzs').addListener('change', function() {
				var a = mstform.getItem('tgshzs').getValue(); //收回张数
				var b = mstform.getItem('tgfszs').getValue(); //发放张数
				if(a > b) {
					Ext.Msg.alert('提示', '收回张数大于发放张数，请修改');
					mstform.getItem('tgshzs').setValue('');
				} else {
					mstform.getItem('tgshl').setValue((a / b).toFixed(4));
				}
			})
		}

	}
}
//保存前检测
function beforeSaveEdit(type) {
	var mstform = Ext.getCmp('p_form0000000029_m');
	var dgrid = Ext.getCmp('p_form0000000029_dgrid'); //表体容器
	var dstore = dgrid.store; //表体数据
	var dgrid1 = Ext.getCmp('p_form0000000029_d1grid'); //表体容器
	var dstore1 = dgrid1.store;
	var dgrid2 = Ext.getCmp('p_form0000000029_d2grid'); //表体容器
	var dstore2 = dgrid2.store;
	var flag = 0;
	if(otype == $Otype.ADD) {
		var y = mstform.getItem('nd').getValue();
		var jd = mstform.getItem('jd').getValue();
		//在建提示
		for(var i = 0; i < dstore.getCount(); i++) {
			var pc_name = dstore.getAt(i).get('project_name')
			//var nm = dstore.getAt(i).get('empid')
			//console.log(id);
			callServer('save_jc', [{
				'y': y,
				'jd': jd
			}], function(res) {
				//console.log(res.record[0].year);
				// console.log(res.count);
				//console.log(res.length);
				for(var j = 0; j < res.count; j++) {
					//console.log(res.record[i].year);
					if(res.record[j].project_name == pc_name) {
						console.log(res.record[j].project_name);
						Ext.Msg.alert('提示', '在建项目明细第' + (i + 1) + '行' + '本季度已录入,请删除行')
						flag = 1;
						//return false;
					}
				}
			});
		}
		//停工提示
		for(var i = 0; i < dstore2.getCount(); i++) {
			var pc = dstore2.getAt(i).get('pc')
			//var nm = dstore.getAt(i).get('empid')
			//console.log(id);
			callServer('save_jc', [{
				'y': y,
				'jd': jd
			}], function(res) {
				//console.log(res.record[0].year);
				// console.log(res.count);
				//console.log(res.length);
				for(var j = 0; j < res.count; j++) {
					//console.log(res.record[i].year);
					if(res.record[j].pc == pc) {
						console.log(res.record[j].pc);
						Ext.Msg.alert('提示', '停工项目明细第' + (i + 1) + '行' + '本季度已录入,请删除行')
						flag = 1;
						//return false;
					}
				}
			});
		}
		//维保提示
		for(var i = 0; i < dstore1.getCount(); i++) {
			var pc_name = dstore1.getAt(i).get('xmxx')
			callServer('save_jc', [{
				'y': y,
				'jd': jd
			}], function(res) {

				for(var j = 0; j < res.count; j++) {
					//console.log(res.record[i].year);
					if(res.record[j].xmxx == pc_name) {
						console.log(res.record[j].xmxx);
						Ext.Msg.alert('提示', '维保项目明细第' + (i + 1) + '行' + '本季度已录入,请删除行')
						flag = 1;
					}
				}
			});
		}
	}
	if(flag == 0) {
		return true;
	} else {
		return false;
	}

}