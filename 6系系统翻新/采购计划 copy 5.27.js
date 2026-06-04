function AllReady() {
    var mstform = Ext.getCmp('MatPM');
    var dgrid = Ext.getCmp('MatPD');
    console.log('dgrid----------->', dgrid)
    var dstore = dgrid.store;
    console.log('dstore----------->', dstore)

    mstform.on('dataready', function () {
        var phid_pc = mstform.getItem('PhidPc').getValue();
        if (phid_pc) {
            mstform.getItem('user_hyb').setClientSqlFilter(` 
                phid_pc = '${phid_pc}' 
                AND cont_pack_code NOT LIKE '01%' 
                AND cont_pack_code NOT LIKE '02%' 
                AND cont_pack_code NOT LIKE '10%' 
                AND cont_pack_code NOT LIKE '11%' 
            `);
        }
    });

    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        mstform.getItem('PhidPc').addListener('helpselected', function (obj) {
            var phid_pc = mstform.getItem('PhidPc').getValue();
            mstform.getItem('user_hyb').setValue('');
            if (phid_pc) {
                mstform.getItem('user_hyb').setOutFilter({
                    phid_pc: phid_pc
                });
            }
        });
    }

    if (otype == $Otype.ADD) {
        mstform.getItem('user_sfcds').setValue('1');
        mstform.getItem('user_ywfl').setValue('100');
        mstform.getItem('user_fblx').setValue('其他');
        BatchBindCombox([mstform.getItem('user_ywfl'), mstform.getItem('user_fblx')]);
        mstform.getItem('user_jh_type').setValue('0');
    }
    //mstform.getItem('user_jyml').setVisible(false); //甲目录
    //mstform.getItem('user_jymly').setVisible(false); //乙目录

    //线下采购业务类别是否显示
    if (otype == $Otype.ADD || otype == $Otype.EDIT || otype == $Otype.VIEW) {
        // mstform.getItem('user_sfcds').addListener('change', function() {
        // 	var sfcds = form.getItem('user_sfcds').getValue()
        // 	if (sfcds == 1) {
        // 		mstform.getItem('user_jymly').setValue('');
        // 		mstform.getItem('user_jyml').setValue('');
        // 		mstform.getItem('user_jyml').setVisible(false);
        // 		mstform.getItem('user_jymly').setVisible(false);
        // 		mstform.getItem('user_jymly').userSetMustInput(false);
        // 		mstform.getItem('user_jyml').userSetMustInput(false);
        // 	} else if (sfcds == 2) {
        // 		mstform.getItem('user_jymly').setValue('');
        // 		msform.getItem('user_jyml').setValue('');
        // 		mstform.getItem('user_jyml').setVisible(true);
        // 		mstform.getItem('user_jymly').setVisible(false);
        // 		mstform.getItem('user_jymly').userSetMustInput(false);
        // 		mstform.getItem('user_jyml').userSetMustInput(true);
        // 	} else if (sfcds == 3) {
        // 		mstform.getItem('user_jymly').setValue('');
        // 		mstform.getItem('user_jyml').setValue('');
        // 		mstform.getItem('user_jyml').setVisible(false);
        // 		mstform.getItem('user_jymly').setVisible(true);
        // 		mstform.getItem('user_jymly').userSetMustInput(true);
        // 		mstform.getItem('user_jyml').userSetMustInput(false);
        // 	} else {
        // 		mstform.getItem('user_jymly').setValue('');
        // 		mstform.getItem('user_jyml').setValue('');
        // 		mstform.getItem('user_jyml').setVisible(false);
        // 		mstform.getItem('user_jymly').setVisible(false);
        // 		mstform.getItem('user_jymly').userSetMustInput(false);
        // 		mstform.getItem('user_jyml').userSetMustInput(false);
        // 	}
        // });
        //线下采购业务类别是否显示
        //线下采购业务类别是否显示
        // form.getItem('user_xxcgywlb').addListener('itemchanged', function () { 
        //    var xxcgywlb = form.getItem('user_xxcgywlb').getValue()
        //   console.log(xxcgywlb); 
        //  if (xxcgywlb==1) {
        //    form.getItem('user_jyml').setVisible(true);
        //     form.getItem('user_jymly').setValue('');
        //     form.getItem('user_jymly').setVisible(false);
        //  } else { 
        //        form.getItem('user_jymly').setVisible(true);

        //      form.getItem('user_jyml').setValue('');
        //     form.getItem('user_jyml').setVisible(false);
        //  }

        //   });

        //选择“业务分类”后，重置“分包类型”，业务分类置灰
        mstform.getItem('user_ywfl').addListener('helpselected', function (obj) {
            mstform.getItem('user_fblx').setValue(''); //选择后赋值
            BatchBindCombox([mstform.getItem('user_fblx')]);
            mstform.getItem('user_ywfl').userSetReadOnly(true);
        });



    }
    //菜单栏增加复制功能
    var Toolbar = Ext.getCmp('toolbar');

    Toolbar.insert(1, {
        itemId: "copy",
        text: "复制",
        width: this.itemWidth,
        iconCls: "icon-New"
    });

    Toolbar.items.get('copy').on('click', function () {

        //获取表体数据
        var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
        //税率
        var OriTaxrate = a[0].get('OriTaxrate');
        //需用日期
        var user_xyrq = a[0].get('user_xyrq');
        //质量技术要求
        var user_zljsyq = a[0].get('user_zljsyq');
        for (var i = 1; i < a.length; i++) {
            a[i].set('user_xyrq', user_xyrq);
            a[i].set('user_zljsyq', user_zljsyq);
        }
    });


    //业务分类与分包类型加筛选控制
    mstform.getItem('user_fblx').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        var ywfl = mstform.getItem('user_ywfl').getValue();
        if (ywfl == '100' || ywfl == '001') {
            mstform.getItem('user_fblx').setOutFilter({
                c_descript: 2
            });

        } else {
            mstform.getItem('user_fblx').setOutFilter({
                c_descript: 1
            });
        }
    })

    //判断“业务分类”，增行的资源选择过滤为990204
    Ext.override(Ext.res.ItemDataHelpWindow, {
        initComponent: function () {
            var ywfl = mstform.getItem('user_ywfl').getValue();
            if (ywfl == '010') {
                var me = this;
                me.ResourceType = '2'; //资源类型主键
                me.resBsPhId = '313191217010515'; //资源分类主键
                me.filterArtificial = true;
                me.callParent();
            } else {
                var me = this;
                me.filterArtificial = true;
                me.callParent();
            }
        }
    });
}

async function beforeSaveEdit(){
    var mstform = Ext.getCmp('MatPM');
    var dgrid = Ext.getCmp('MatPD');
    var dstore = dgrid.store;
    var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
    var int = 0;

    for (var i = 0; i < dstore.getCount(); i++) {
        var b = i + 1;
        if (a[i].data.OriTaxprc == 0) {
            Ext.Msg.alert('警告', '第' + b + '行含税单价输入不合法 : 该项为必输项');
            int = 0;
            return false;
        } else {
            int = 1;
        }
        console.log('a-------->', a)
        if (a[i].data.PhId) {
            var phid = a[i].data.PhidItemid;
            console.log('phid---------->', phid)
            await execServer('jclwl', { 'phid': phid }, function (res) {
                console.log('res----------->', res)
                if (res && res.count > 0) {
                    var data = JSON.parse(res.data);
                    var user_xljkdl = data[0].extendObjects.user_xljkdl;
                    if (user_xljkdl == 1) {
                        Ext.Msg.alert('提示', `第${b}行是老物料，无法保存`);
                        int = 0;
                        return false;
                    } else {
                        int = 1;
                    }
                } else {
                    Ext.Msg.alert('提示', `第${b}行物料，在数据库不存在`);
                    int = 0;
                    return false;
                }
            });
        }
    }

    if (int == 1) {
        return true;
    } else {
        return false;
    }

}