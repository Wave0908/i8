function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700166_m');
    var dgrid = Ext.getCmp('p_form0000700166_dgrid');
    var dstore = dgrid.store;
    var dgrid1 = Ext.getCmp('p_form0000700166_d1grid');
    var d1store = dgrid1.store;
    var dgrid2 = Ext.getCmp('p_form0000700166_d2grid');
    var d2store = dgrid2.store;
    mstform.getItem('checkpsn').setVisible(false);
    mstform.getItem('empid2').setVisible(false);
    mstform.getItem('u_sbjndw').setVisible(false);
    mstform.getItem('u_rycx').setVisible(false);

    var Toolbar = Ext.getCmp('toolbar');

    // //callServer('bbhtje', [{'ccy': pc}], function (res) {                                                     mstform.getItem('jbr').setValue(res.record[0].jbr);  });
    // callServer('填表单体', [{ 'fxmid': fxmid, 'zzid': zzid }], 
    // function (res) {


    // mstform.getItem('empid').addListener('helpselected', function() {
    // 	var empid = mstform.getItem('empid').getValue();
    // 	callServer('BLZS', [{
    // 		'phid': empid
    // 	}], function(res) {
    // 		mstform.getItem('u_zsbh').setValue(res.record[0].cno);
    // 	});

    // })
    mstform.getItem('u_ywzj').addListener('helpselected', function () {
        var u_ywzj = mstform.getItem('u_ywzj').getValue();
        if (u_ywzj == '1') {
            mstform.getItem('u_zjsfkc').userSetMustInput(true);
            mstform.getItem('u_yzj').userSetMustInput(true);
            mstform.getItem('u_ysbl').userSetMustInput(true);
        } else {
            mstform.getItem('u_zjsfkc').userSetMustInput(false);
            mstform.getItem('u_yzj').userSetMustInput(false);
            mstform.getItem('u_ysbl').userSetMustInput(false);
        }
    });
    /*
1、”安全B证书编号“填写内容时，后面”安全b证有效期截止时间“为必填项。
2、”安全B证书编号“不填写内容时，后面 ”安全b证有效期截止时间“为非必填项。
    */
    mstform.getItem('u_zsbh').addListener('change', function () {
        var u_zsbh = mstform.getItem('u_zsbh').getValue();
        if (u_zsbh == '') {
            mstform.getItem('u_bzjz').userSetMustInput(false);

        } else {
            mstform.getItem('u_bzjz').userSetMustInput(true);
        }
    });
    //表头更新表头
    mstform.getItem('empid').addListener('helpselected', function (obj) {
        var fgldphid = mstform.getItem("empid").getValue();
        execServer('getryxx', {
            'phid': fgldphid
        }, function (res) {
            if (!Ext.isEmpty(res) && res.data[0]) {
                mstform.getItem("u_xb").setValue(res.data[0].sex); //性别
                mstform.getItem("u_sr").setValue(res.data[0].birthday); //生日
                mstform.getItem("u_xl").setValue(res.data[0].zgxl); //最高学历
                mstform.getItem("u_jg").setValue(res.data[0].szbm); //所在部门、职能机构
                mstform.getItem("u_gw").setValue(res.data[0].user_xrzw); //岗位、人员职务
                mstform.getItem("u_zc").setValue(res.data[0].zc); //职称
                mstform.getItem("u_zz").setValue(res.data[0].empstatus);//员工状态、在职状态
                mstform.getItem("u_yglx").setValue(res.data[0].htgx); //合同关系、员工类型
                mstform.getItem("u_zsbh").setValue(res.data[0].cno); //合同关系、员工类型
                mstform.getItem("title").setValue(res.data[0].cname); //合同关系、员工类型
            }
        });
    })
    //增加“新增专业名称”按钮
    Toolbar.insert(1, {
        itemId: "myadd",
        text: "新增专业名称",
        width: this.itemWidth,
        iconCls: "add"
    });
    //点击‘myadd’按钮触发事件，通过新增按钮打开帮助窗口
    Toolbar.get('myadd').on('click', function () {
        //判断项目信息是否选择 
        if (Ext.isEmpty(Ext.getCmp('empid').getValue())) {
            //未选择提示：请先选择人员！
            Ext.Msg.alert('提示', '请先选择人员！');
            //已选择跳出if事件
            return false;
        };
        var help = Ext.create('Ext.ng.MultiRichHelp', {
            //代码列
            valueField: 'cyr',
            //名称列   
            displayField: 'cyr',
            //获取帮助ID
            helpid: 'yjjzs',//通用帮助的帮助标记
            ORMMode: false,

            //过滤条件，m_code为过滤字段，empid为过滤字段的值
            outFilter: {//cyr是视图中的字段名，如果是表中的就用表中的字段名
                'cyr': mstform.getItem('empid').getValue()
            }
        });
        help.showHelp();
        help.on('helpselected', function (obj) {
            var arr = new Array();
            for (i = 0; i < obj.data.length; i++) {
                //赋值给单据体字段
                arr.push({
                    u_zymc: obj.data[i].data.zsmc,//前边是自表中的，后边是视图或表中的字段名
                    u_zcdw: obj.data[i].data.zcdw,
                    u_rq: obj.data[i].data.fzrq,
                    u_zszy: obj.data[i].data.zszy,
                });
            };
            dstore.insert(dstore.getCount(), arr);
        });
    });

    dgrid1.getColumn('u_yjmc_name').getEditor().addListener('helpselected', function (obj) {
        var data = dgrid1.getSelectionModel().getSelection();
        var phid = data[0].get('u_yjmc');
        execServer('yjk', {
            'phid': phid
        }, function (res) {
            if (!Ext.isEmpty(res) && res.data[0]) {
                data[0].set('u_htqd', res.data[0].htqd);
                data[0].set('u_zmjg', res.data[0].htzm);
                data[0].set('u_sjjg', res.data[0].htjg);
            }
        });
    });


    dgrid2.getColumn('u_bgh_name').getEditor().addListener('helpselected', function (obj) {
        var data = dgrid2.getSelectionModel().getSelection();
        var phid = data[0].get('u_bgh');
        execServer('yjk', {
            'phid': phid
        }, function (res) {
            if (!Ext.isEmpty(res) && res.data[0]) {
                data[0].set('u_htqd1', res.data[0].htqd);
                data[0].set('u_zmjg1', res.data[0].htzm);
                data[0].set('u_sjjg1', res.data[0].htjg);
            }
        });
    });
}
