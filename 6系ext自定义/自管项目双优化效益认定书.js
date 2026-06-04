function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700433_m');
    var dgrid = Ext.getCmp('p_form0000700433_d');
    var dstore = dgrid.store;

    var Toolbar = Ext.getCmp('toolbar');
    // mstform.getItem('u_yhxmc').setVisible(false);
    // mstform.getItem('u_yhnrjs').setVisible(false);
    // mstform.getItem('u_jjxyfx').setVisible(false);
    // mstform.getItem('u_rdjl').setVisible(false);


    //增加“新增立项信息”按钮
    Toolbar.insert(1, {
        itemId: "myadd",
        text: "新增立项信息",
        width: this.itemWidth,
        iconCls: "add"
    });

    /* dstore.addListener('edit', function(store, records, index, eOpts) {
 
         var a = dgrid.getStore().getRange(0, dstore.getCount() - 1); //获取表体的数据		
         var dzyhp = a[0].get('ddlbcol_1');
         if(dzyhp == '1') {
          
             dgrid.setMustInputCol('numericcol_3', true);
         } else if(dzyhp == '2') {
         
             dgrid.setMustInputCol('numericcol_3', false);
         }
     });
 */


    //点击‘myadd’按钮触发事件，通过新增按钮打开帮助窗口
    Toolbar.get('myadd').on('click', function () {
        //判断项目信息是否选择 
        if (Ext.isEmpty(mstform.getItem('u_gcmc').getValue())) {
            //未选择提示：请先选择人员！
            Ext.Msg.alert('提示', '请先选择项目！');
            //已选择跳出if事件
            return false;
        };
        var help = Ext.create('Ext.ng.MultiRichHelp', {
            //代码列
            valueField: 'phid',
            //名称列   
            displayField: 'phid',
            //获取帮助ID
            helpid: 'syh_lxsqb_copy',//通用帮助的帮助标记
            ORMMode: false,

            //过滤条件，m_code为过滤字段，empid为过滤字段的值
            outFilter: {//cyr是视图中的字段名，如果是表中的就用表中的字段名
                'phid': mstform.getItem('u_gcmc').getValue()
            }
        });
        help.showHelp();
        help.on('helpselected', function (obj) {
            var arr = new Array();
            for (i = 0; i < obj.data.length; i++) {
                //赋值给单据体字段
                arr.push({
                    textcol_1: obj.data[i].data.u_yhfa,//前边是自表中的，后边是视图或表中的字段名
                    textcol_2: obj.data[i].data.u_yh,//优化类型
                    numericcol_1: obj.data[i].data.amt,//预计优化效益计算
                    textcol_3: obj.data[i].data.u_tcr,//优化建议提出人
                    textcol_4: obj.data[i].data.u_ssr,//拟实施人
                });
            };
            dstore.insert(dstore.getCount(), arr);
        });
    });






}

