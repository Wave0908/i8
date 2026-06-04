function allReadyEdit() {
	var mstform = Ext.getCmp('p_form0000600072_m');
	//组织设置为只读
	mstform.getItem('ocode').userSetReadOnly(true);
	//项目编号设置为只读
	mstform.getItem('xmbm').userSetReadOnly(true);
	//项目类型设置为只读
	mstform.getItem('xmlx').userSetReadOnly(true);
	//项目名称设置为必输
	mstform.getItem('xmmc').userSetMustInput(true);
	//总投资（元）设置为必输
	mstform.getItem('ztz').userSetMustInput(true);
	//业主名称设置为必输
	mstform.getItem('yzmc').userSetMustInput(true);
	//投标截止日期设置为必输
	mstform.getItem('tbjzrq').userSetMustInput(true);
	//建设内容设置为必输
	mstform.getItem('jsnr').userSetMustInput(true);
	//投标主体设置为必输
	mstform.getItem('tbzt').userSetMustInput(true);
	//招标方式设置为必输
	mstform.getItem('zbfs').userSetMustInput(true);
	//招标机构设置为必输
	mstform.getItem('zbjg').userSetMustInput(true);
	//跟踪负责人设置为必输
	mstform.getItem('empid1').userSetMustInput(true);
	//建安工程费(下浮前)(元)设置为必输
	mstform.getItem('amt').userSetMustInput(true);
	//工期要求设置为必输
	mstform.getItem('gqyq').userSetMustInput(true);
	//征地拆迁情况设置为必输
	mstform.getItem('zdcqqk').userSetMustInput(true);
	//资本金内部收益率(税后)设置为必输
	mstform.getItem('zbjnbsyl').userSetMustInput(true);
	//质量要求设置为必输
	mstform.getItem('zlyq').userSetMustInput(true);
	//资质要求设置为必输
	mstform.getItem('zzyq').userSetMustInput(true);
	//融资利率设置为必输
	mstform.getItem('rzlv').userSetMustInput(true);
	//意向银行设置为必输
	mstform.getItem('yxyh').userSetMustInput(true);
	//计价方式设置为必输
	mstform.getItem('jjfs').userSetMustInput(true);
	//预计施工利润率设置为必输
	mstform.getItem('yjsglrl').userSetMustInput(true);
	//质保期设置为必输
	mstform.getItem('zbq').userSetMustInput(true);
	//联合体情况设置为必输
	mstform.getItem('lhtqk').userSetMustInput(true);
	//各阶段保函情况设置为必输
	mstform.getItem('gjdbhqk').userSetMustInput(true);
	//主要竞争对手设置为必输
	mstform.getItem('zyjzds').userSetMustInput(true);
	//报价项设置为必输
	mstform.getItem('bjx').userSetMustInput(true);
	//招标范围设置为必输
	mstform.getItem('zbfw').userSetMustInput(true);
	//违约责任设置为必输
	mstform.getItem('wyzr').userSetMustInput(true);
	//付款比例及方式设置为必输
	mstform.getItem('fkbljfs').userSetMustInput(true);
	//主材调差情况设置为必输
	mstform.getItem('zcdcqk').userSetMustInput(true);
	//运营情况设置为必输
	mstform.getItem('yyqk').userSetMustInput(true);
	//其他设置为必输
	mstform.getItem('qt').userSetMustInput(true);
	//分析结论设置为必输
	mstform.getItem('fxjl').userSetMustInput(true);
	//录入人设置为不可见
	mstform.getItem('fillpsn').setVisible(false);
	//审核人设置为不可见
	mstform.getItem('checkpsn').setVisible(false);
	//标题设置为不可见
	mstform.getItem('title').setVisible(false);
	//回报方式设置为必输
	mstform.getItem('hbfs').userSetMustInput(true);
	//是否投标保证金为必输
	mstform.getItem('tbbzj').userSetMustInput(true);
	//是否投标保证金额隐藏
	mstform.getItem('tbbzje').setVisible(false) ;
	//是否投标保证金截止日期隐藏
	mstform.getItem('tbbzjjzrq').setVisible(false);

	/*项目名称字段通用帮助选择前触发 start*/
	//项目名称选择前触发

	mstform.getItem('xmmc').addListener('beforetriggerclick', function() {
		var pocode = mstform.getItem('ocode').getValue();
		mstform.getItem('xmmc').setClientSqlFilter('trz_zbwjpg.phid not in(select pfm_72.xmmc from p_form0000600072_m pfm_72 where pfm_72.xmmc is not null) and trz_zbwjpg.ocode=' + pocode);
	});
	/*项目名称字段通用帮助选择前触发 end*/

	/*是否投标保证金为是时显示2个字段 不是时隐藏俩字段 start*/
	mstform.getItem('tbbzj').addListener('change', function() {
		var tbbzj = mstform.getItem('tbbzj').getValue();
		tbbzj == '1' ? mstform.getItem('tbbzje').setVisible(true) && mstform.getItem('tbbzjjzrq').setVisible(true) : mstform.getItem('tbbzje').setVisible(false) && mstform.getItem('tbbzjjzrq').setVisible(false)

	});
	/*是否投标保证金为是时显示2个字段 不是时隐藏俩字段 end*/

	//项目名称字段通用帮助选择后触发start

	//项目名称字段帮助窗口选择后触发
	mstform.getItem('xmmc').addListener('helpselected', function() {
		var xmmcPhid = mstform.getItem('xmmc').getValue();
		console.log(xmmcPhid);
		//不需要招标预审
		callServer('xmmc_fys', [{
			'phid': xmmcPhid
		}], function(res) {
			if(res.record[0]) {
				mstform.getItem('xmbm').setValue(res.record[0].xmbm);
				mstform.getItem('xmmc').setValue(res.record[0].xmmc);
				console.log(res.record[0].xmmc);
				mstform.getItem('xmlx').setValue(res.record[0].xmlx);
				mstform.getItem('ztz').setValue(res.record[0].ztz);
				mstform.getItem('empid1').setValue(res.record[0].empid1);
				mstform.getItem('hbfs').setValue(res.record[0].hbfs);
				mstform.getItem('yjsglrl').setValue(res.record[0].yjsglrl);
				mstform.getItem('zyjzds').setValue(res.record[0].zyjzds);
				mstform.getItem('yyqk').setValue(res.record[0].yyqk);
				mstform.getItem('fxjl').setValue(res.record[0].fxjl);
				//代码转名称
				BatchBindCombox([
					mstform.getItem('xmmc'),
					mstform.getItem('xmlx'),
					mstform.getItem('empid1')
				]);
			} else {
				//需要招标预审start
				console.log(xmmcPhid);
				callServer('xmmc_ys', [{
					'phid': xmmcPhid
				}], function(res) {
					if(res.record[0]) {
						mstform.getItem('xmbm').setValue(res.record[0].xmbm);
						mstform.getItem('xmmc').setValue(res.record[0].xmmc);
						mstform.getItem('ztz').setValue(res.record[0].ztz);
						mstform.getItem('empid1').setValue(res.record[0].empid1);
						mstform.getItem('hbfs').setValue(res.record[0].hbfs);
						mstform.getItem('yjsglrl').setValue(res.record[0].yjsglrl);
						mstform.getItem('zyjzds').setValue(res.record[0].zyjzds);
						mstform.getItem('yyqk').setValue(res.record[0].yyqk);
						mstform.getItem('fxjl').setValue(res.record[0].fxjl);
						mstform.getItem('yzmc').setValue(res.record[0].yzmc);
						mstform.getItem('xmlx').setValue(res.record[0].xmlx);
						mstform.getItem('tbzt').setValue(res.record[0].tbzt);
						mstform.getItem('zbfs').setValue(res.record[0].zbfs);
						mstform.getItem('zzyq').setValue(res.record[0].zzyq);
						mstform.getItem('zbfw').setValue(res.record[0].zbfw);
						//代码转名称
						BatchBindCombox([
							mstform.getItem('xmmc'),
							mstform.getItem('empid1'),
							mstform.getItem('yzmc'),
							mstform.getItem('xmlx'),
							mstform.getItem('tbzt'),
							mstform.getItem('zbfs')
						]);
					}
				});

				//需要招标预审start

			}
		});

	});
	//项目名称字段通用帮助选择后触发end

}
//保存前检测
function beforeSaveEdit() {
	//获取投融资招标预审评估表
	var mstform = Ext.getCmp('p_form0000600072_m');
	var asr_flg = mstform.getItem('asr_flg').getValue();
	if(asr_flg == '1') {
		return true;
	} else {
		NGMsg.Info('请先上传附件');
		return false;
	}

}