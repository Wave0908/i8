// function allReadyEdit() {
//     var mstform = Ext.getCmp('p_form0000000084_m');
//     var dgrid = Ext.getCmp('p_form0000000084_d'); //表体容器
//     var dstore = dgrid.store; //表体数据
//     var Toolbar = Ext.getCmp('toolbar');
//     mstform.getItem('bill_name').setReadOnly(true);
//     dgrid.setReadOnlyCol('bm', true);
//     dgrid.setReadOnlyCol('jhzt', true);

//     //根据录入人,带入部门
//     var lqr_val = $appinfo.userID;
//     //隐藏系统自带按钮
//     Toolbar.get('addrow').hide();
//     //增加导入按钮
//     Toolbar.insert({
//         id: "zh_qd",
//         text: "增行",
//         iconCls: "icon-AddRow"
//     }, 2);

//     /*增加一个调整按钮start*/
//     Toolbar.insert({
//         id: "adjust",
//         text: "调整",
//         iconCls: "icon-AddRow"
//     }, 3);

//     /*增加一个调整按钮end*/

//     /*计划类别字段：为调整    根据组织 年度 ，培训类别， 计划类别为：年初计划和新增 做一个调整按钮 引入完审核后回更新到具体单据中start*/
//     if (otype == $Otype.ADD || otype == $Otype.EDIT) {
//         //调整按钮单击事件
//         Toolbar.get("adjust").on('click', function () {
//             if (Ext.isEmpty(mstform.getItem('jhlb').getValue()) || Ext.isEmpty(mstform.getItem('pxlb').getValue()) || Ext.isEmpty(mstform.getItem('jhnd').getValue())) {
//                 Ext.Msg.alert('提示', '请先填写培训类别！,计划类别,开展培训年度');
//                 return;
//             };
//             if (mstform.getItem('jhlb').getValue() != 03) {
//                 Ext.Msg.alert('提示', '计划类别应该为调整');
//                 return;
//             };

//             //帮助窗口调用
//             var help = Ext.create('Ext.ng.MultiRichHelp', {
//                 valueField: 'pfd_84.phid', //代码列
//                 displayField: 'pfd_84.pxxmmc', //名称列
//                 helpid: 'ndjh_tz', //获取帮助ID
//                 ORMMode: false,
//                 outFilter: {
//                     'pfm_84.pxlb': mstform.getItem('pxlb').getValue(), //帮助对应过滤条件，帮助过滤字段等于表单字段
//                     'pfm_84.jhnd': mstform.getItem('jhnd').getValue(), //帮助对应过滤条件，帮助过滤字段等于表单字段
//                     'pfm_84.phid_org': mstform.getItem('phid_org').getValue() //帮助对应过滤条件，帮助过滤字段等于表单字段
//                 }
//             });

//             help.showHelp();

//             help.on('helpselected', function (obj) {
//                 var arr = new Array();
//                 for (i = 0; i < obj.data.length; i++) {
//                     arr.push({
//                         tz_phid: obj.data[i].data.phid, //单据体字段赋值帮助字段1
//                         jhzt: obj.data[i].data.jhzt, //单据体字段赋值帮助字段1
//                         bm: obj.data[i].data.bm, //单据体字段赋值帮助字段1
//                         jhzt: obj.data[i].data.jhzt, //单据体字段赋值帮助字段2
//                         lb: obj.data[i].data.lb, //单据体帮助字段赋值帮助字段2
//                         lb_name: obj.data[i].data.c_name, //单据体帮助字段赋值帮助字段2
//                         tr_project_type: obj.data[i].data.tr_project_type, //单据体帮助字段赋值帮助字段2
//                         pxxmmc: obj.data[i].data.pxxmmc, //单据体字段赋值帮助字段1
//                         empid1: obj.data[i].data.empid1, //单据体字段赋值帮助字段1
//                         empid1_name: obj.data[i].data.cname, //单据体字段赋值帮助字段1
//                         pxmb: obj.data[i].data.pxmb, //单据体字段赋值帮助字段1
//                         qty: obj.data[i].data.qty, //单据体字段赋值帮助字段1
//                         yjksrq: obj.data[i].data.yjksrq, //单据体字段赋值帮助字段1
//                         yjjsrq: obj.data[i].data.yjjsrq, //单据体字段赋值帮助字段1
//                         amt: obj.data[i].data.amt, //单据体字段赋值帮助字段1
//                         xxxs: obj.data[i].data.xxxs, //单据体字段赋值帮助字段1
//                         learn_style: obj.data[i].data.learn_style, //单据体字段赋值帮助字段1
//                         xmbh: obj.data[i].data.xmbh, //单据体字段赋值帮助字段1
//                     });
//                 };
//                 dstore.insert(dstore.getCount(), arr);
//             });

//         });
//     }
//     /*计划类别字段：为调整    根据组织 年度 ，培训类别， 计划类别为：年初计划和新增 做一个调整按钮 引入完审核后回更新到具体单据中end*/

//     //--新增单据数据初始化--//
//     if (otype == $Otype.ADD || otype == $Otype.EDIT) {
//         Toolbar.get('zh_qd').setVisible(true);
//         execServer('p_form0000000084_select_BM_list', {
//             'phid': lqr_val
//         }, function (res) {
//             if (res.count > 0) {
//                 var data = JSON.parse(res.data)
//                 for (var rskey in data[0].extendObjects) {
//                     mstform.getItem(rskey).setValue(data[0].extendObjects[rskey]);
//                     mstform.getItem(rskey).setReadOnly(true);
//                     BatchBindCombox([mstform.getItem(rskey)]);
//                 }
//             }
//         });
//     }
//     Toolbar.get('zh_qd').on('click', function () {
//         if (Ext.isEmpty(mstform.getItem('jhlb').getValue())) {
//             Ext.Msg.alert('提示', '请先选择计划类别！');
//             return;
//         };
//         //带入表体信息
//         execServer('p_form0000000084_select_BMT_list', {
//             'phid': lqr_val
//         }, function (res) {
//             var value;
//             if (res.count > 0) {
//                 var data = JSON.parse(res.data)
//                 for (var i = 0; i < res.count; i++) {
//                     value = data[i].extendObjects;
//                     dstore.insert(dstore.getCount(), value);
//                 }
//             }
//         });
//         mstform.getItem('jhlb').setReadOnly(true);
//         mstform.getItem('pxlb').setReadOnly(true);
//     });
//     //表体增行，列中自动带入表头的字段名    

//     dstore.on('remove', function (store, records, index, eOpts) { //单据体增行更新事件
//         if (dstore.getCount() == '0') {
//             mstform.getItem('jhlb').setReadOnly(false);
//             mstform.getItem('pxlb').setReadOnly(false);
//         }
//     });
//     dstore.on('add', function (store, records, index, eOpts) { //单据体增行更新事件
//         var jhlb = mstform.getItem('jhlb').getValue();
//         var jhlb_name = mstform.getItem('jhlb').getRawValue(); //表头申请类型通用帮助显示名字

//         var crtTime = new Date();
//         crtTime = dateFtt("yyyyMMdd", mstform.getItem('bill_dt').getValue());
//         execServer('p_form0000000084_select_BM_edit', {}, function (res) {
//             if (res.count > 0) {
//                 var data = JSON.parse(res.data)
//                 var sl = Ext.Number.from(data[0].extendObjects.sl, 000000) + Ext.Number.from(dstore.getCount(), 000000);

//                 var s = PrefixInteger(sl, 6)
//                 dstore.getAt(dstore.getCount() - 1).set('xmbh', crtTime + $appinfo.ocode + s); //自动生成编号
//             } else {

//                 dstore.getAt(dstore.getCount() - 1).set('xmbh', crtTime + $appinfo.ocode + '000001'); //自动生成编号         
//             }
//         });
//         Ext.Array.each(records, function (record) { //新增的每一行调用一次数组赋值
//             record.set('jhzt', jhlb); //单据体新增行字段类型phid值
//             record.set('jhzt_name', jhlb_name); //单据体新增行字段类型name值
//             record.set('bill_ori', '0');
//         });
//     });
//     dstore.on('remove', function (store, records, index, eOpts) { //单据体增行更新事件
//         if (dstore.getCount() == 0) {
//             mstform.getItem('jhlb').setReadOnly(false);
//         }
//     });

// }

// function PrefixInteger(num, length) {
//     return (num / Math.pow(10, length)).toFixed(length).substr(2);
// }
// //保存前检测事件
// function dateFtt(fmt, date) { //author: meizz   
//     var o = {
//         "M+": date.getMonth() + 1, //月份   
//         "d+": date.getDate(), //日   
//         "h+": date.getHours(), //小时   
//         "m+": date.getMinutes(), //分   
//         "s+": date.getSeconds(), //秒   
//         "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
//         "S": date.getMilliseconds() //毫秒   
//     };
//     if (/(y+)/.test(fmt))
//         fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
//     for (var k in o)
//         if (new RegExp("(" + k + ")").test(fmt))
//             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//     return fmt;
// }

// function beforeSaveEdit() {
//     var mstform = Ext.getCmp('p_form0000000084_m');
//     var pxlb_val = mstform.getItem('pxlb').getRawValue();
//     var jhlb_val = mstform.getItem('jhlb').getRawValue();
//     var jhnd_val = mstform.getItem('jhnd').getRawValue();
//     var ocode_val = mstform.getItem('phid_org').getRawValue();
//     if (Ext.isEmpty(mstform.getItem('bill_name').getValue())) {
//         //修改标题
//         mstform.getItem('bill_name').setValue(jhnd_val + "度-" + ocode_val + "-" + jhlb_val + "-" + pxlb_val);
//         return true;
//     }
//     return true;
// }

// // function allReadyList() {
// //     var Toolbar = Ext.getCmp('toolbar');
// //     Toolbar.get('copy').hide();
// // }