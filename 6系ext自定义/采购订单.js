function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700170_m');
    var dgrid = Ext.getCmp('p_form0000700170_d');
    var dstore = dgrid.store;
    mstform.getItem ('phid_app').setVisible(false);
    var Toolbar = Ext.getCmp('toolbar');    
    
    /*工程项目字段通用帮助选择前触发 start*/
	//项目名称选择前触发
	mstform.getItem('phid_pc').addListener('beforetriggerclick', function() {
		var pocode = mstform.getItem('phid_org').getValue();
		mstform.getItem('phid_pc').setOutFilter({
			cat_phid: pocode,
		});
	});
	/*工程项目字段通用帮助选择前触发 end*/

	/*合同名称字段选择前触发start*/
	mstform.getItem('u_cght').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) {
		if(Ext.isEmpty(mstform.getItem('phid_pc').getValue())) {
			Ext.Msg.alert('提示', '请先选择工程项目');
			return false;
		}
		var pc = mstform.getItem('phid_pc').getValue();
		mstform.getItem('u_cght').setOutFilter({
			phid_pc: pc,
		});
	});
	/*合同名称字段选择前触发end*/
    /*当更换工程项目的时候承揽合同名称置空start*/
    mstform.getItem('phid_pc').addListener('helpselected', function() {
        mstform.getItem('u_cght').setValue('');
    });


    dgrid.addListener('edit', function (editor, e) { /*监听单据体字段编辑状态 *edit 为编辑事件（据体更新单据体本行字段）                                                                                          grid - 当前grid                                                                                          record - 当前编辑行的数据                                                                                           field - 要编辑的字段名                                                                                       value - 编辑后的值                                                                                       originalValue - 原先的值.                                                                                 row - 行数*/
        if (e.originalValue == e.value) {return;} //判断原值与新值是否相同，如果相同则返回 *return 返回    
        if (e.field == 'u_jshj' || e.field == 'u_sl' || e.field == 'numericcol_1' || e.field == 'u_bhs' || e.field == 'u_hsdj' ||e.field == 'u_jshj') { //监听qty、prc、numericcol_2字段变化
            var record = e.record;   //当前行用对像record表示
			record.set('u_jshj', Ext.Number.from(record.get('u_hsdj'), 0) * Ext.Number.from(record.get('numericcol_1'), 0));  //计算amt值，将 prc、qty的值转换成数值并运算  
            record.set('u_bhsje', Ext.Number.from(record.get('u_jshj'), 0) / ( 1+ Ext.Number.from(record.get('u_sl'), 0)));  //计算amt值，将 prc、qty的值转换成数值并运算  
            record.set('u_se', Ext.Number.from(record.get('u_jshj'), 0) - Ext.Number.from(record.get('u_bhsje'), 0));  //计算amt值，将 prc、qty的值转换成数值并运算 
            record.set('u_bhs', Ext.Number.from(record.get('u_hsdj'), 0) / ( 1+ Ext.Number.from(record.get('u_sl'), 0)));
            
        };   //监听qty、prc、numericcol_2字段变化事件结束 ｝
    });
    //增加“添加合同清单”按钮
    Toolbar.insert(1, {
        itemId: "myadd",
        text: "添加合同清单",
        width: this.itemWidth,
        iconCls: "add"
    });
     //点击‘myadd’按钮触发事件，通过新增按钮打开帮助窗口
     Toolbar.get('myadd').on('click', function() {
        //判断项目信息是否选择 
        if(Ext.isEmpty(mstform.getItem('u_cght').getValue())) {
            //未选择提示：请先选择人员！
            Ext.Msg.alert('提示', '请先选择合同！');
            //已选择跳出if事件
            return false;
        };
        var help = Ext.create('Ext.ng.MultiRichHelp', {
            //代码列
            valueField: 'phid',
            displayField: 'phid',
            //获取帮助ID
            helpid: 'fc3.cnt_name_cght',//通用帮助的帮助标记
            ORMMode: false,

            //过滤条件，m_code为过滤字段，empid为过滤字段的值
            outFilter: {//cyr是视图中的字段名，如果是表中的就用表中的字段名
                'phid': mstform.getItem('u_cght').getValue()
            }
        });
        help.showHelp();
        help.on('helpselected', function(obj) {
            var arr = new Array();
            for(i = 0; i < obj.data.length; i++) {
                //赋值给单据体字段
                arr.push({
                    u_wlbm: obj.data[i].data.u_wlbm,//前边是自表中的，后边是视图或表中的字段名
                    u_wlmc: obj.data[i].data.u_wlmc,
                    u_ggxh: obj.data[i].data.u_ggxh,//规格型号
                    numericcol_1: obj.data[i].data.numericcol_1,
                    u_bhs: obj.data[i].data.u_bhs,
                    u_hsdj: obj.data[i].data.u_hsdj,
                    u_sl: obj.data[i].data.u_sl,
                    u_se: obj.data[i].data.u_se,
                    u_bhsje: obj.data[i].data.u_bhsje,
                    u_jshj: obj.data[i].data.u_jshj,
                    u_ht: obj.data[i].data.bill_no, 
                    u_zj: obj.data[i].data.phid,

                });
            };
            dstore.insert(dstore.getCount(), arr);
        });
    });

}




    