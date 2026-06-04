function allReadyEdit() { //初始化
    var mstform = Ext.getCmp('p_form0000000089_m');
    var dgrid = Ext.getCmp('p_form0000000089_d');
    var dstore = dgrid.store;

    //培训项目编码设为只读
    mstform.getItem('pxxmbh').userSetReadOnly(true);
    //培训类别设为只读
    mstform.getItem('pxlb').userSetReadOnly(true);
    mstform.getItem('pxnd').addListener('helpselected', function (obj) {
        mstform.getItem('pxxmmc').setValue('');
        mstform.getItem('pxkssj').setValue('');
        mstform.getItem('pxjssj').setValue('');
        mstform.getItem('pxlb').userSetReadOnly(false);
    });
    mstform.getItem('pxxmmc').addListener('beforetriggerclick', function () {
        var phid_org = mstform.getItem('phid_org').getValue();
        var pxnd = mstform.getItem('pxnd').getValue();
        var pxlb = mstform.getItem('pxlb').getValue();
        if (Ext.isEmpty(phid_org) || Ext.isEmpty(pxnd)) {
            Ext.Msg.alert('提示', '请先选择培训年度和组织！');
            return false;
        } else if (Ext.isEmpty(pxlb)) {
            Ext.Msg.alert('提示', '请先选择培训类别');
            return false;
        } else if (pxlb == '01') {
            mstform.getItem('pxxmmc').setOutFilter({
                'p_form0000000084_m.phid_org': phid_org,
                'p_form0000000084_m.jhnd': pxnd,
                'p_form0000000084_m.pxlb': '01',
                'p_form0000000088_m.app_status': 1
            });
        }
    });

    mstform.getItem('pxxmmc').addListener('helpselected', function (obj) {
        var pxxmmc = mstform.getItem('pxxmmc').getValue();
        var pxlb = mstform.getItem('pxlb').getValue();
        if (pxlb == '01') {
            execServer('p_form0000000089_boq_s', {
                'phid': pxxmmc
            }, function (res) {
                if (res.count == 0) return;
                const data = JSON.parse(res.data);
                if (data.length == 0) return;
                mstform.getItem('pxkssj').setValue(data[0].extendObjects.llzspxsjks);
                mstform.getItem('pxjssj').setValue(data[0].extendObjects.llzspxsjjs);
            });
        } else {
            execServer('p_form0000000089_boq_m', {
                'phid': pxxmmc
            }, function (res) {
                if (res.count == 0) return;
                const data = JSON.parse(res.data);
                if (data.length == 0) return;
                mstform.getItem('pxkssj').setValue(data[0].extendObjects.pxkssj);
                mstform.getItem('pxjssj').setValue(data[0].extendObjects.pxjssj);
            });
        }
        console.log('obj==================>', obj)
        //培训项目编号带出
        if (obj) {
            mstform.getItem('pxxmbh').setValue(obj.data.xmbh);
        }
        //带入表头信息
        execServer('p_form0000000089_select_MB_list', {
            'phid': pxxmmc
        },
            function (res) {
                if (res.count == 0) return;
                const data = JSON.parse(res.data);
                if (data.length == 0) return;
                /*for (var rskey in res.record[0]) {
                    mstform.getItem(rskey).setValue(res.record[0][rskey]);
                    mstform.getItem(rskey).setReadOnly(true);
                    BatchBindCombox([mstform.getItem(rskey)]);
                }*/
            });
    });

    if (otype == $Otype.ADD) {
        execServer('p_form0000000089_user_detail', {}, function (res1) {
            if (res1.count == 0) return;
            const data = JSON.parse(res1.data);
            if (data.length == 0) return;
            var arr = new Array();
            for (i = 0; i < res1.count; i++) {
                arr.push({
                    pjnrbm: data[i].extendObjects.c_no,
                    pjnr: data[i].extendObjects.c_name,
                    fjscnr: data[i].extendObjects.fjscnr
                });
            }
            dstore.insert(dstore.getCount(), arr);
        });
    }

}