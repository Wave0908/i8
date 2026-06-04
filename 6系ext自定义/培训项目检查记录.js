function allReadyEdit() { //初始化
    var mstform = Ext.getCmp('p_form0000000090_m');
    var dgrid = Ext.getCmp('p_form0000000090_d1');
    var Toolbar = Ext.getCmp('toolbar');
    var dstore = dgrid.store;

    //培训项目编码设为只读
    mstform.getItem('pxxmbh').userSetReadOnly(true);
    //培训类别设为只读
    mstform.getItem('pxlb').userSetReadOnly(true);
    //培训年度设置为必输
    mstform.getItem('pxnd').userSetMustInput(true);
    //培训名称设置为必输
    mstform.getItem('pxxmmc').userSetMustInput(true);


    mstform.getItem('pxnd').addListener('helpselected', function (obj) {
        mstform.getItem('pxxmmc').setValue('');
        mstform.getItem('pxlb').userSetReadOnly(false);
    });

    mstform.getItem('pxxmmc').addListener('beforetriggerclick', function () {
        var phid_org = mstform.getItem('phid_org').getValue();
        var pxnd = mstform.getItem('pxnd').getValue();
        var pxlb = mstform.getItem('pxlb').getValue();
        console.log(phid_org)
        console.log(pxnd)
        if (Ext.isEmpty(phid_org) || Ext.isEmpty(pxnd)) {
            Ext.Msg.alert('提示', '请先选择培训年度和组织！');
            return false;
        } else if (Ext.isEmpty(pxlb)) {
            Ext.Msg.alert('提示', '请先选择培训类别');
            return false;
        } else if (pxlb == '01') {
            // tt.pxlb = '01' and tt.ischeck = '1'   and tt.phid not in (select pxxmmc from p_form0000000088_m where pxxmmc is not null)
            // mstform.getItem('pxxmmc').setOutFilter({
            //     'p_form0000000084_m.phid_org': phid_org,
            //     'p_form0000000084_m.jhnd': pxnd,
            //     'p_form0000000084_m.pxlb': '01',
            //     'p_form0000000088_m.app_status': 1,

            // });
            //p_form0000000088_m.ischeck='1' and p_form0000000084_d.phid not in (select pfm.pxxmmc from p_form0000000090_m pfm where pfm.pxxmmc is not null)
            mstform.getItem('pxxmmc').setClientSqlFilter(
                "p_form0000000084_m.phid_org = " + phid_org
                + " and p_form0000000084_m.jhnd = " + pxnd
                + " and p_form0000000084_m.pxlb= '01' "
                + " and p_form0000000088_m.app_status= 1"
                + " and p_form0000000084_d.phid not in (select pxxmmc from p_form0000000090_m where pxxmmc is not null)"
            )
        }

    });



    if (otype == $Otype.ADD || otype == $Otype.EDIT || otype == $Otype.VIEW) { //帮助窗口结束事件
        mstform.getItem('pxxmmc').addListener('helpselected', function (obj) {
            var pxxmmc = mstform.getItem('pxxmmc').getValue();
            console.log('pxxmmc===============?', pxxmmc)
            var pxlb = mstform.getItem('pxlb').getValue();
            if (pxlb == '01') {
                execServer('p_form0000000090_boq_s', {
                    'phid': pxxmmc
                }, function (res) {
                    if (res.count == 0) return;
                    console.log('res===============>', res)
                    const data = JSON.parse(res.data);
                    if (data.length == 0) return;
                    mstform.getItem('pxksrq').setValue(data[0].extendObjects.llzspxsjks);
                    mstform.getItem('pxjsrq').setValue(data[0].extendObjects.llzspxsjjs);

                });
            } else {
                execServer('p_form0000000090_boq_m', {
                    'phid': pxxmmc
                }, function (res) {
                    if (res.count == 0) return;
                    const data = JSON.parse(res.data);
                    if (data.length == 0) return;
                    mstform.getItem('pxksrq').setValue(data[0].extendObjects.pxkssj);
                    mstform.getItem('pxjsrq').setValue(data[0].extendObjects.pxjssj);
                    mstform.getItem('xmfzr').setValue(data[0].extendObjects.cname);
                });
            }
            //培训项目编号带出
            if (obj) {
                mstform.getItem('pxxmbh').setValue(obj.data.xmbh);
            }
            //带入表头信息
            execServer('p_form0000000090_select_MB_list', {
                'phid': pxxmmc
            },
                function (res) {
                    if (res.count == 0) return;
                    const data = JSON.parse(res.data);
                    if (data.length == 0) return;

                    /*for (var rskey in data[0]) {
                        mstform.getItem(rskey).setValue(data[0].extendObjects.[rskey]);
                        mstform.getItem(rskey).setReadOnly(true);
                        BatchBindCombox([mstform.getItem(rskey)]);
                    }*/
                });

        });
    }

    if (otype == $Otype.ADD) {
        execServer('p_form0000000090_user_detail', {}, function (res1) {
            if (res1.count == 0) return;
            const data = JSON.parse(res1.data);
            if (data.length == 0) return;
            var arr = new Array();
            for (i = 0; i < res1.count; i++) {
                arr.push({
                    jcnrbm: data[i].extendObjects.c_no,
                    jcnr: data[i].extendObjects.c_name
                });
            }
            dstore.insert(dstore.getCount(), arr);
        });
    }
    mstform.on('dataready', function () {
        console.log("mstform.queryById('app_status').value:", mstform.queryById('app_status').value);
        console.log("otype====", otype);
        if (otype == $Otype.VIEW) {
            console.log(mstform.getItem('app_status').value);
            if (mstform.getItem('app_status').value == '1') {
                console.log("Toolbar:", Toolbar);
                Toolbar.items.get('check').hide();
            }
        }
    });


}