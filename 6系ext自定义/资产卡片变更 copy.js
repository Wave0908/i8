//单据编辑页面初始化
function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700043_m');
    var dgrid = Ext.getCmp('p_form0000700043_dgrid');
    var dstore = dgrid.store;
    var Toolbar = Ext.getCmp('toolbar');
    //组织设置为只读
    mstform.getItem('ocode').userSetReadOnly(true);
    //资产主键只读
    dgrid.setReadOnlyCol('kpzj', true);
    //资产主键设置为隐藏
    dgrid.hideColumn('kpzj', true);

    /*资产类型改变后变成只读start*/
    mstform.getItem('zclx').addListener('change', function () {
        mstform.getItem('zclx').userSetReadOnly(true);
    });
    /*资产类型改变后变成只读end*/

    /*添加一个引入资产卡片按钮start*/
    Toolbar.insert(2, {
        itemId: "YY",
        text: "引入资产卡片",
        width: this.itemWidth,
        iconCls: "icon-New"
    });
    /*添加一个引入资产卡片按钮end*/

    /*只在新增修改界面使用start*/
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        /*点击引入按钮实现多选状态start*/
        Toolbar.get('YY').on('click', function () {
            var zclx = mstform.getItem('zclx').getValue();
            var ocode = mstform.getItem('ocode').getValue();
            if (Ext.isEmpty(zclx)) {
                Ext.Msg.alert('提示', '请选择资产类型，一旦选择不可更改');
                return false; //跳出判断回到点击事件，
            }
            var help = Ext.create('Ext.ng.MultiRichHelp', {
                //代码列
                valueField: 'kpzj',
                //名称列   
                displayField: 'zcmc',
                //获取帮助ID
                helpid: 'zckpbg',
                ORMMode: false,

                //过滤条件，m_code为过滤字段，userhelp_1为过滤字段的值
                outFilter: {
                    'p_form0000000225_m_change.ocode': ocode,
                    'p_form0000000225_m_change.zclx': zclx
                }
            });

            help.showHelp();

            help.on('helpselected', function (obj) {
                var arr = new Array();
                console.log(obj);

                for (i = 0; i < obj.data.length; i++) {
                    arr.push({
                        kpzj: obj.data[i].data.kpzj,
                        zcbm: obj.data[i].data.zcbm,
                        zcmc: obj.data[i].data.zcmc,
                        yz: obj.data[i].data.yz,
                        cz: obj.data[i].data.cz,
                        zjqs: obj.data[i].data.zjqs,
                        yzje: obj.data[i].data.yzje,
                        yyqs: obj.data[i].data.yyqs,
                        ljzj: obj.data[i].data.yyqs,
                        jz_amt: obj.data[i].data.jz_amt,
                        szrq: obj.data[i].data.szrq
                    });
                }
                console.log(arr);
                dstore.insert(dstore.getCount(), arr);

            });

        });
        /*点击引入按钮实现多选状态end*/

    }
    /*只在新增修改界面使用end*/

}