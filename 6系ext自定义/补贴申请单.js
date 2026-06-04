function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000000161_m');
    console.log("mstform===:", mstform);
    var dgrid = Ext.getCmp('p_form0000000161_d');
    console.log("dgrid===:", dgrid);
    var Toolbar = Ext.getCmp('toolbar');
    var dstore = dgrid.store;

    mstform.getItem('deptid').addListener('helpselected', function () {
        dstore.removeAll();
        var years = mstform.getItem('year').getValue();
        var months = mstform.getItem('month').getValue();
        var xm = mstform.getItem('deptid').getValue();
        var lx = "'"+mstform.getItem('fylx').getValue()+"'";
        //alert(xm);
        if (years == null || months == null || lx == null || years == '' || months == '' || lx == '') {
            Ext.Msg.alert('提示', '请先选择年份、月份和类型');
            mstform.getItem('deptid').setValue();
            return false;
        } else {
            execServer('p_form0000000161_phidtocode', {
                phids: xm
            }, (res) => {
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    var xm1 = '\'' + data[0].extendObjects.deptno + '%\'';
                    //alert(xm1);  
                    console.log("xm1:",xm1);
                    console.log("years:",years);
                    console.log("months:",months);
                    console.log("lx:",lx);
                    execServer('ygbmcr_new_pxc', {
                        deptids: xm1,
                        years: years,
                        months: months,
                        lx: lx
                    }, (res1) => {
                        if (res1.count > 0) {
                            const data1 = typeof res1.data === 'string' ? JSON.parse(res1.data) : res1.data;
                            console.log("data1:",data1);
                            console.log(xm1, months, years);

                            //alert(data1[0].extendObjects.cname);                         
                            //data[0].set(dgrid.getColumn('ygbh_name')'ygxm',data.extendObjects.cname);   
                            //data[0].set('xzjb',data.extendObjects.c_name);   
                            //data[0].set('gw',data.extendObjects.cname1);
                            dstore.removeAll();
                            var arr = new Array();
                            for (i = 0; i < data1.length; i++) {
                                arr.push({
                                    ygbh: data1[i].extendObjects.ccode,
                                    ygxm: data1[i].extendObjects.cname,
                                    xzjb: data1[i].extendObjects.c_name,
                                    gw: data1[i].extendObjects.cname1,
                                });
                            }
                            dstore.insert(dstore.getCount(), arr);
                        }

                    })

                }
            })
        }

    })

    dgrid.addListener('edit', function (editor, e) { //监听单据体字段编辑状态 *edit 为编辑事件（据体汇总更新表头字段）
        mstform.getItem('rs').setValue(dstore.getCount());
        if (e.originalValue == e.value) {
            return;
        } //判断原值与新值是否相同，如果相同则返回
        if (e.field == 'amt') { //监听AmtFc、user_hl字段变化
            var sumVatFc = 0; //变量sumVatFc初始值为0
            //变量sumHtje初始值为0
            for (i = 0; i < dstore.getCount(); i++) { //for循坏 *dstore.getCount()表示单据体总行数
                sumVatFc += Ext.Number.from(dstore.getAt(i).get('amt'), 0); //变量sumVatFc累加

            } //for循环事件结束 ｝
            mstform.getItem('amt').setValue(sumVatFc); //变量sumVatFc值赋值给表头 CntSumVatFc

        }

        //监听AmtFc、user_hl字段变化事件结束
    });

    dstore.on('datachanged', function (dstore) {
        mstform.getItem('rs').setValue(dstore.getCount());
        var sumVatFc = 0;
        for (i = 0; i < dstore.getCount(); i++) {
            sumVatFc += Ext.Number.from(dstore.getAt(i).get('amt'), 0);
        }
        mstform.getItem('amt').setValue(sumVatFc);
    });

    mstform.getItem('amt').addListener('change', function () {
        var money = mstform.getItem('amt').getValue(); //结束日期    
        var FormNum = function (money) {
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
            if (money == '') {
                return '';
            }
            money = parseFloat(money);
            if (money >= maxNum) {
                return '';
            }
            if (money == 0) {
                chineseStr = cnNums[0] + cnIntLast + cnInteger;
                return chineseStr;
            }
            money = money.toString();
            if (money.indexOf('.') == -1) {
                integerNum = money;
                decimalNum = '';
            } else {
                parts = money.split('.');
                integerNum = parts[0];
                decimalNum = parts[1].substr(0, 4);
            }
            if (parseInt(integerNum, 10) > 0) {
                var zeroCount = 0;
                var IntLen = integerNum.length;
                for (var i = 0; i < IntLen; i++) {
                    var n = integerNum.substr(i, 1);
                    var p = IntLen - i - 1;
                    var q = p / 4;
                    var m = p % 4;
                    if (n == '0') {
                        zeroCount++;
                    } else {
                        if (zeroCount > 0) {
                            chineseStr += cnNums[0];
                        }
                        zeroCount = 0;
                        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                    }
                    if (m == 0 && zeroCount < 4) {
                        chineseStr += cnIntUnits[q];
                    }
                }
                chineseStr += cnIntLast;
            }
            if (decimalNum != '') {
                var decLen = decimalNum.length;
                for (var i = 0; i < decLen; i++) {
                    var n = decimalNum.substr(i, 1);
                    if (n != '0') {
                        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
                    }
                }
            }
            if (chineseStr == '') {
                chineseStr += cnNums[0] + cnIntLast + cnInteger;
            } else if (decimalNum == '') {
                chineseStr += cnInteger;
            }
            return chineseStr;
        }
        var aa = FormNum(money)
        mstform.getItem('jedx').setValue(aa);

    });

}
//创建视图
// CREATE OR REPLACE VIEW v_employee_info AS
// SELECT 
//   hem.phid AS ccode, 
//   hem.cno AS cno, 
//   hem.cname AS cname, 
//   hem.admclass AS admclass, 
//   fsd.c_name AS c_name, 
//   hem.station AS station, 
//   fos.bill_name AS cname1, 
//   d.deptno AS deptno, 
//   d.deptname AS deptname,
//   hem.c_status,
//   hem.empstatus,
//   CASE 
//     WHEN hem.empstatus = '34' THEN retiredt 
//     WHEN hem.empstatus = '35' THEN dimissdt 
//     ELSE NULL
//   END AS status_date,
//   d.parent_deptno
// FROM 
//   hr_epm_station_20230527 hem 
//   LEFT JOIN fg_simple_data fsd ON fsd.phid = hem.admclass 
//   LEFT JOIN fg_ogm_station fos ON fos.phid = hem.station 
//   LEFT JOIN dept d ON d.phid = hem.dept 
// WHERE 
//   hem.empstatus NOT IN (SELECT phid FROM hr_base_enum WHERE ctype = 'empstatus' AND ccode IN (SELECT ccode FROM hr_epm_status_property WHERE isstatus IN ('04')));