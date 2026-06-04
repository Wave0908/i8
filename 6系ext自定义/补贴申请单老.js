function allReadyEdit() {
	var mstform = Ext.getCmp('p_form0000000161_m');
	var dgrid = Ext.getCmp('p_form0000000161_dgrid');
	var Toolbar = Ext.getCmp('toolbar');
	var dstore = dgrid.store;

	mstform.getItem('deptid').addListener('helpselected', function() {
		dstore.removeAll();
		var years = "'" + mstform.getItem('year').getValue() + "'";
		var months = "'" + mstform.getItem('month').getValue() + "'";
		var xm = mstform.getItem('deptid').getValue();
		var lx = "'" + mstform.getItem('fylx').getValue() + "'";
		//alert(xm);
		if(years == "" || months == "") {
			Ext.Msg.alert('提示', '请先选择年份和月份');
			return false;

		} else {
			callServer('phidtocode', [{
				phids: xm
			}], function(res) {
				if(res.record[0]) {
					var xm1 = '\'' + res.record[0]['deptno'] + '%\'';
					//alert(xm1);  

					callServer('ygbmcr', [{
						deptids: xm1,
						years: years,
						months: months,
						lx: lx
					}], function(res1) {
						console.log(xm1, months, years);

						//alert(res1.record[0].cname);                         
						//data[0].set(dgrid.getColumn('ygbh_name')'ygxm',res.record[0].cname);   
						//data[0].set('xzjb',res.record[0].c_name);   
						//data[0].set('gw',res.record[0].cname1);
						dstore.removeAll();
						var arr = new Array();
						for(i = 0; i < res1.count; i++) {
							arr.push({
								ygbh: res1.record[i].ccode,
								ygxm: res1.record[i].cname,
								xzjb: res1.record[i].c_name,
								gw: res1.record[i].cname1,

							});
						}
						dstore.insert(dstore.getCount(), arr);

					})

				}
			})
		}

	})

	dgrid.addListener('edit', function(editor, e) { //监听单据体字段编辑状态 *edit 为编辑事件（据体汇总更新表头字段）
		mstform.getItem('rs').setValue(dstore.getCount());
		if(e.originalValue == e.value) {
			return;
		} //判断原值与新值是否相同，如果相同则返回
		if(e.field == 'amt') { //监听AmtFc、user_hl字段变化
			var sumVatFc = 0; //变量sumVatFc初始值为0
			//变量sumHtje初始值为0
			for(i = 0; i < dstore.getCount(); i++) { //for循坏 *dstore.getCount()表示单据体总行数
				sumVatFc += Ext.Number.from(dstore.getAt(i).get('amt'), 0); //变量sumVatFc累加

			} //for循环事件结束 ｝
			mstform.getItem('amt').setValue(sumVatFc); //变量sumVatFc值赋值给表头 CntSumVatFc

		}

		//监听AmtFc、user_hl字段变化事件结束
	});

	dstore.on('datachanged', function(dstore) {
		mstform.getItem('rs').setValue(dstore.getCount());
		var sumVatFc = 0;
		for(i = 0; i < dstore.getCount(); i++) {
			sumVatFc += Ext.Number.from(dstore.getAt(i).get('amt'), 0);
		}
		mstform.getItem('amt').setValue(sumVatFc);
	});

	mstform.getItem('amt').addListener('change', function() {
		var money = mstform.getItem('amt').getValue(); //结束日期    
		var FormNum = function(money) {
			var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
			var cnIntRadice = new Array('', '拾', '佰', '仟');
			var cnIntUnits = new Array('', '万', '亿', '兆');
			var cnDecUnits = new Array('角', '分', '毫', '厘');
			var cnInteger = '整';
			var cnIntLast = '元';
			var maxNum = 999999999999999.9999;
			var integerNum;
			var decimalNum;
			var chineseStr = '';
			var parts;
			if(money == '') {
				return '';
			}
			money = parseFloat(money);
			if(money >= maxNum) {
				return '';
			}
			if(money == 0) {
				chineseStr = cnNums[0] + cnIntLast + cnInteger;
				return chineseStr;
			}
			money = money.toString();
			if(money.indexOf('.') == -1) {
				integerNum = money;
				decimalNum = '';
			} else {
				parts = money.split('.');
				integerNum = parts[0];
				decimalNum = parts[1].substr(0, 4);
			}
			if(parseInt(integerNum, 10) > 0) {
				var zeroCount = 0;
				var IntLen = integerNum.length;
				for(var i = 0; i < IntLen; i++) {
					var n = integerNum.substr(i, 1);
					var p = IntLen - i - 1;
					var q = p / 4;
					var m = p % 4;
					if(n == '0') {
						zeroCount++;
					} else {
						if(zeroCount > 0) {
							chineseStr += cnNums[0];
						}
						zeroCount = 0;
						chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
					}
					if(m == 0 && zeroCount < 4) {
						chineseStr += cnIntUnits[q];
					}
				}
				chineseStr += cnIntLast;
			}
			if(decimalNum != '') {
				var decLen = decimalNum.length;
				for(var i = 0; i < decLen; i++) {
					var n = decimalNum.substr(i, 1);
					if(n != '0') {
						chineseStr += cnNums[Number(n)] + cnDecUnits[i];
					}
				}
			}
			if(chineseStr == '') {
				chineseStr += cnNums[0] + cnIntLast + cnInteger;
			} else if(decimalNum == '') {
				chineseStr += cnInteger;
			}
			return chineseStr;
		}
		var aa = FormNum(money)
		mstform.getItem('jedx').setValue(aa);

	});

}