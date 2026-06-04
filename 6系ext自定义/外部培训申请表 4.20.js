function allReadyEdit() { //初始化
    var mstform = Ext.getCmp('p_form0000000096_m');
    var dgrid = Ext.getCmp('p_form0000000096_d');
    var dgrid1 = Ext.getCmp('p_form0000000096_d4');
    var dstore = dgrid.store;
    var dstore1 = dgrid1.store;
    //培训项目编码设为只读
    mstform.getItem('pxxmbh').userSetReadOnly(true);
    //培训年度设置为必输
    mstform.getItem('pxnd').userSetMustInput(true);
    if (otype == $Otype.ADD) {
        mstform.getItem('flg').setValue('0');
    };

    //培训年度选择后置空
    mstform.getItem('pxnd').addListener('helpselected', function (obj) {
        mstform.getItem('train_project').setValue('');
        mstform.getItem('empid').setValue('');
        mstform.getItem('trainstyle').setValue('');
        mstform.getItem('pxrs').setValue('');
        mstform.getItem('train_targe').setValue('');
        mstform.getItem('fyys').setValue('');
    });

    mstform.getItem('train_project').addListener('beforetriggerclick', function () {
        mstform.getItem('train_targe').setValue();
        mstform.getItem('empid').setValue();
        var phid_org = mstform.getItem('phid_org').getValue();
        var pxnd = mstform.getItem('pxnd').getValue();
        if (Ext.isEmpty(pxnd) || Ext.isEmpty(phid_org)) {
            Ext.Msg.alert('提示', '请先选择培训年度和单位！');
            return false;
        } else {
            console.log("mstform.getItem('phid_org').getValue():", mstform.getItem('phid_org').getValue());
            console.log("mstform.getItem('pxnd').getValue():", mstform.getItem('pxnd').getValue());
            // mstform.getItem('train_project').setOutFilter({
            //     'p_form0000000084_m.phid_org': mstform.getItem('phid_org').getValue(),
            //     'p_form0000000084_m.jhnd': mstform.getItem('pxnd').getValue(),
            //     'p_form0000000084_m.pxlb': '02',
            // });
            // mstform.setConfig({
            //     'train_project':{clientSqlFilter:('p_form0000000084_m.phid_org = '+mstform.getItem('phid_org').getValue()
            //         +'and p_form0000000084_m.jhnd = '+mstform.getItem('pxnd').getValue()
            //         +'and  p_form0000000084_d.phid not in(select pfm.train_project from p_form0000000096_m pfm )')}
            // })
            console.log("mstform.getItem('phid_org').getValue():", mstform.getItem('phid_org').getValue());
            console.log("mstform.getItem('pxnd').getValue():", mstform.getItem('pxnd').getValue());
            mstform.getItem('train_project').setClientSqlFilter("p_form0000000084_m.phid_org = " + mstform.getItem('phid_org').getValue()
                + " and p_form0000000084_m.jhnd = " + mstform.getItem('pxnd').getValue()
                + " and p_form0000000084_m.pxlb = '02' "
                + " and p_form0000000084_d.phid not in(select pfm.train_project from p_form0000000096_m pfm )")
        }
    });
    //obj返回的是通用帮助字段
    mstform.getItem('train_project').addListener('helpselected', function (obj) {
        console.log(obj);
        console.log('train_project=================>', mstform.getItem('train_project').getValue())
        mstform.getItem('pxxmbh').setValue(obj.data.xmbh);
        mstform.getItem('train_targe').setValue(obj.data.pxmb);
        mstform.getItem('empid').setValue(obj.data.empid1);
        //mstform.getItem('trainstyle').setValue(obj.data.pxlb);
        mstform.getItem('pxrs').setValue(obj.data.qty);
        mstform.getItem('amt').setValue(obj.data.amt);
        BatchBindCombox([mstform.getItem('empid')]);
        BatchBindCombox([mstform.getItem('trainstyle')]);
    });
    //员工信息自动带入
    dgrid1.getColumn('userhelp_1_EXName').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        console.log("==========");
        var data = dgrid1.getSelectionModel().getSelection();
        console.log("data:", data);
        var id = data[0].data.userhelp_1;
        execServer('p_form0000000096_epm', {
            'id': id
        }, function (res) {
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log("data1:", data1);
                data[0].set('u_yglx', data1[0].extendObjects.emptype);
                data[0].set('u_yglx_EXName', data1[0].extendObjects.c_names);
                data[0].set('empid_EXName', data1[0].extendObjects.cname);
                data[0].set('empid', data1[0].extendObjects.phid);
            }
        });
    });
    // dgrid1.addListener('edit', function(editor, e) { //监听单据体编辑状态，edit-编辑；add-增行；cellclick-点击
    //     if(e.originalValue == e.value) {
    //         return;
    //     }
    //     if(e.field == 'userhelp_1') {
    //         var record = e.record;
    //         var data = dgrid4.getSelectionModel().getSelection(); //获取当前选中行
    //         var id = data[0].get('userhelp_1'); //获取当前选中行某个字段值
    //         callServer('epm', [{
    //             'id': id
    //         }], function(res) {
    //             record.set('u_yglx', res.record[0].c_names);
    //             record.set('empid_name', res.record[0].cname);
    //         })
    //     };
    // });

    /*费用总计=培训费+食宿费+食宿差旅费+其他费用start*/

    //培训费
    mstform.getItem('qzpxf').addListener('itemchanged', function (obj) {
        //培训费
        var qzpxf = mstform.getItem('qzpxf').getValue();
        //食宿差旅费
        var clf = mstform.getItem('clf').getValue();
        //其他费用
        var qtfy = mstform.getItem('qtfy').getValue();
        //讲师酬金
        var u_jscj = mstform.getItem('u_jscj').getValue();
        //班级管理费
        var u_bjglf = mstform.getItem('u_bjglf').getValue();
        //命题费
        var u_mtf = mstform.getItem('u_mtf').getValue();
        //阅卷费
        var u_yjf = mstform.getItem('u_yjf').getValue();
        //教材费
        var u_jcf = mstform.getItem('u_jcf').getValue();
        //讲师食宿交通费
        var u_jsssjtf = mstform.getItem('u_jsssjtf').getValue();
        //宣传推介费
        var u_xctjf = mstform.getItem('u_xctjf').getValue();
        //质量评估费
        var u_zlptf = mstform.getItem('u_zlptf').getValue();
        //广告费
        var u_ggf = mstform.getItem('u_ggf').getValue();
        //文印费
        var u_wyf = mstform.getItem('u_wyf').getValue();
        //场地（设备）租赁费
        var u_cdzlf = mstform.getItem('u_cdzlf').getValue();
        //实训物料（工机具）费
        var u_sxwlf = mstform.getItem('u_sxwlf').getValue();

        mstform.getItem('fyys').setValue(Number(qzpxf) + Number(clf) + Number(qtfy) + Number(u_jscj) + Number(u_bjglf) + Number(u_mtf) + Number(u_yjf) + Number(u_jcf) + Number(u_jsssjtf) + Number(u_xctjf) + Number(u_zlptf) + Number(u_ggf) + Number(u_wyf) + Number(u_cdzlf) + Number(u_sxwlf));
    });

    //食宿差旅费
    mstform.getItem('clf').addListener('itemchanged', function (obj) {
        //培训费
        var qzpxf = mstform.getItem('qzpxf').getValue();
        //食宿差旅费
        var clf = mstform.getItem('clf').getValue();
        //其他费用
        var qtfy = mstform.getItem('qtfy').getValue();
        //讲师酬金
        var u_jscj = mstform.getItem('u_jscj').getValue();
        //班级管理费
        var u_bjglf = mstform.getItem('u_bjglf').getValue();
        //命题费
        var u_mtf = mstform.getItem('u_mtf').getValue();
        //阅卷费
        var u_yjf = mstform.getItem('u_yjf').getValue();
        //教材费
        var u_jcf = mstform.getItem('u_jcf').getValue();
        //讲师食宿交通费
        var u_jsssjtf = mstform.getItem('u_jsssjtf').getValue();
        //宣传推介费
        var u_xctjf = mstform.getItem('u_xctjf').getValue();
        //质量评估费
        var u_zlptf = mstform.getItem('u_zlptf').getValue();
        //广告费
        var u_ggf = mstform.getItem('u_ggf').getValue();
        //文印费
        var u_wyf = mstform.getItem('u_wyf').getValue();
        //场地（设备）租赁费
        var u_cdzlf = mstform.getItem('u_cdzlf').getValue();
        //实训物料（工机具）费
        var u_sxwlf = mstform.getItem('u_sxwlf').getValue();

        mstform.getItem('fyys').setValue(Number(qzpxf) + Number(clf) + Number(qtfy) + Number(u_jscj) + Number(u_bjglf) + Number(u_mtf) + Number(u_yjf) + Number(u_jcf) + Number(u_jsssjtf) + Number(u_xctjf) + Number(u_zlptf) + Number(u_ggf) + Number(u_wyf) + Number(u_cdzlf) + Number(u_sxwlf));

    });

    //其他费用
    mstform.getItem('qtfy').addListener('itemchanged', function (obj) {
        //培训费
        var qzpxf = mstform.getItem('qzpxf').getValue();
        //食宿差旅费
        var clf = mstform.getItem('clf').getValue();
        //其他费用
        var qtfy = mstform.getItem('qtfy').getValue();
        //讲师酬金
        var u_jscj = mstform.getItem('u_jscj').getValue();
        //班级管理费
        var u_bjglf = mstform.getItem('u_bjglf').getValue();
        //命题费
        var u_mtf = mstform.getItem('u_mtf').getValue();
        //阅卷费
        var u_yjf = mstform.getItem('u_yjf').getValue();
        //教材费
        var u_jcf = mstform.getItem('u_jcf').getValue();
        //讲师食宿交通费
        var u_jsssjtf = mstform.getItem('u_jsssjtf').getValue();
        //宣传推介费
        var u_xctjf = mstform.getItem('u_xctjf').getValue();
        //质量评估费
        var u_zlptf = mstform.getItem('u_zlptf').getValue();
        //广告费
        var u_ggf = mstform.getItem('u_ggf').getValue();
        //文印费
        var u_wyf = mstform.getItem('u_wyf').getValue();
        //场地（设备）租赁费
        var u_cdzlf = mstform.getItem('u_cdzlf').getValue();
        //实训物料（工机具）费
        var u_sxwlf = mstform.getItem('u_sxwlf').getValue();

        mstform.getItem('fyys').setValue(Number(qzpxf) + Number(clf) + Number(qtfy) + Number(u_jscj) + Number(u_bjglf) + Number(u_mtf) + Number(u_yjf) + Number(u_jcf) + Number(u_jsssjtf) + Number(u_xctjf) + Number(u_zlptf) + Number(u_ggf) + Number(u_wyf) + Number(u_cdzlf) + Number(u_sxwlf));
    });

    //讲课酬金
    mstform.getItem('u_jscj').addListener('itemchanged', function (obj) {
        //培训费
        var qzpxf = mstform.getItem('qzpxf').getValue();
        //食宿差旅费
        var clf = mstform.getItem('clf').getValue();
        //其他费用
        var qtfy = mstform.getItem('qtfy').getValue();
        //讲师酬金
        var u_jscj = mstform.getItem('u_jscj').getValue();
        //班级管理费
        var u_bjglf = mstform.getItem('u_bjglf').getValue();
        //命题费
        var u_mtf = mstform.getItem('u_mtf').getValue();
        //阅卷费
        var u_yjf = mstform.getItem('u_yjf').getValue();
        //教材费
        var u_jcf = mstform.getItem('u_jcf').getValue();
        //讲师食宿交通费
        var u_jsssjtf = mstform.getItem('u_jsssjtf').getValue();
        //宣传推介费
        var u_xctjf = mstform.getItem('u_xctjf').getValue();
        //质量评估费
        var u_zlptf = mstform.getItem('u_zlptf').getValue();
        //广告费
        var u_ggf = mstform.getItem('u_ggf').getValue();
        //文印费
        var u_wyf = mstform.getItem('u_wyf').getValue();
        //场地（设备）租赁费
        var u_cdzlf = mstform.getItem('u_cdzlf').getValue();
        //实训物料（工机具）费
        var u_sxwlf = mstform.getItem('u_sxwlf').getValue();

        mstform.getItem('fyys').setValue(Number(qzpxf) + Number(clf) + Number(qtfy) + Number(u_jscj) + Number(u_bjglf) + Number(u_mtf) + Number(u_yjf) + Number(u_jcf) + Number(u_jsssjtf) + Number(u_xctjf) + Number(u_zlptf) + Number(u_ggf) + Number(u_wyf) + Number(u_cdzlf) + Number(u_sxwlf));
    });
    //班级管理费
    mstform.getItem('u_bjglf').addListener('itemchanged', function (obj) {
        //培训费
        var qzpxf = mstform.getItem('qzpxf').getValue();
        //食宿差旅费
        var clf = mstform.getItem('clf').getValue();
        //其他费用
        var qtfy = mstform.getItem('qtfy').getValue();
        //讲师酬金
        var u_jscj = mstform.getItem('u_jscj').getValue();
        //班级管理费
        var u_bjglf = mstform.getItem('u_bjglf').getValue();
        //命题费
        var u_mtf = mstform.getItem('u_mtf').getValue();
        //阅卷费
        var u_yjf = mstform.getItem('u_yjf').getValue();
        //教材费
        var u_jcf = mstform.getItem('u_jcf').getValue();
        //讲师食宿交通费
        var u_jsssjtf = mstform.getItem('u_jsssjtf').getValue();
        //宣传推介费
        var u_xctjf = mstform.getItem('u_xctjf').getValue();
        //质量评估费
        var u_zlptf = mstform.getItem('u_zlptf').getValue();
        //广告费
        var u_ggf = mstform.getItem('u_ggf').getValue();
        //文印费
        var u_wyf = mstform.getItem('u_wyf').getValue();
        //场地（设备）租赁费
        var u_cdzlf = mstform.getItem('u_cdzlf').getValue();
        //实训物料（工机具）费
        var u_sxwlf = mstform.getItem('u_sxwlf').getValue();

        mstform.getItem('fyys').setValue(Number(qzpxf) + Number(clf) + Number(qtfy) + Number(u_jscj) + Number(u_bjglf) + Number(u_mtf) + Number(u_yjf) + Number(u_jcf) + Number(u_jsssjtf) + Number(u_xctjf) + Number(u_zlptf) + Number(u_ggf) + Number(u_wyf) + Number(u_cdzlf) + Number(u_sxwlf));
    });
    //命题费
    mstform.getItem('u_mtf').addListener('itemchanged', function (obj) {
        //培训费
        var qzpxf = mstform.getItem('qzpxf').getValue();
        //食宿差旅费
        var clf = mstform.getItem('clf').getValue();
        //其他费用
        var qtfy = mstform.getItem('qtfy').getValue();
        //讲师酬金
        var u_jscj = mstform.getItem('u_jscj').getValue();
        //班级管理费
        var u_bjglf = mstform.getItem('u_bjglf').getValue();
        //命题费
        var u_mtf = mstform.getItem('u_mtf').getValue();
        //阅卷费
        var u_yjf = mstform.getItem('u_yjf').getValue();
        //教材费
        var u_jcf = mstform.getItem('u_jcf').getValue();
        //讲师食宿交通费
        var u_jsssjtf = mstform.getItem('u_jsssjtf').getValue();
        //宣传推介费
        var u_xctjf = mstform.getItem('u_xctjf').getValue();
        //质量评估费
        var u_zlptf = mstform.getItem('u_zlptf').getValue();
        //广告费
        var u_ggf = mstform.getItem('u_ggf').getValue();
        //文印费
        var u_wyf = mstform.getItem('u_wyf').getValue();
        //场地（设备）租赁费
        var u_cdzlf = mstform.getItem('u_cdzlf').getValue();
        //实训物料（工机具）费
        var u_sxwlf = mstform.getItem('u_sxwlf').getValue();

        mstform.getItem('fyys').setValue(Number(qzpxf) + Number(clf) + Number(qtfy) + Number(u_jscj) + Number(u_bjglf) + Number(u_mtf) + Number(u_yjf) + Number(u_jcf) + Number(u_jsssjtf) + Number(u_xctjf) + Number(u_zlptf) + Number(u_ggf) + Number(u_wyf) + Number(u_cdzlf) + Number(u_sxwlf));
    });
    //阅卷费
    mstform.getItem('u_yjf').addListener('itemchanged', function (obj) {
        //培训费
        var qzpxf = mstform.getItem('qzpxf').getValue();
        //食宿差旅费
        var clf = mstform.getItem('clf').getValue();
        //其他费用
        var qtfy = mstform.getItem('qtfy').getValue();
        //讲师酬金
        var u_jscj = mstform.getItem('u_jscj').getValue();
        //班级管理费
        var u_bjglf = mstform.getItem('u_bjglf').getValue();
        //命题费
        var u_mtf = mstform.getItem('u_mtf').getValue();
        //阅卷费
        var u_yjf = mstform.getItem('u_yjf').getValue();
        //教材费
        var u_jcf = mstform.getItem('u_jcf').getValue();
        //讲师食宿交通费
        var u_jsssjtf = mstform.getItem('u_jsssjtf').getValue();
        //宣传推介费
        var u_xctjf = mstform.getItem('u_xctjf').getValue();
        //质量评估费
        var u_zlptf = mstform.getItem('u_zlptf').getValue();
        //广告费
        var u_ggf = mstform.getItem('u_ggf').getValue();
        //文印费
        var u_wyf = mstform.getItem('u_wyf').getValue();
        //场地（设备）租赁费
        var u_cdzlf = mstform.getItem('u_cdzlf').getValue();
        //实训物料（工机具）费
        var u_sxwlf = mstform.getItem('u_sxwlf').getValue();

        mstform.getItem('fyys').setValue(Number(qzpxf) + Number(clf) + Number(qtfy) + Number(u_jscj) + Number(u_bjglf) + Number(u_mtf) + Number(u_yjf) + Number(u_jcf) + Number(u_jsssjtf) + Number(u_xctjf) + Number(u_zlptf) + Number(u_ggf) + Number(u_wyf) + Number(u_cdzlf) + Number(u_sxwlf));
    });
    //教材费
    mstform.getItem('u_jcf').addListener('itemchanged', function (obj) {
        //培训费
        var qzpxf = mstform.getItem('qzpxf').getValue();
        //食宿差旅费
        var clf = mstform.getItem('clf').getValue();
        //其他费用
        var qtfy = mstform.getItem('qtfy').getValue();
        //讲师酬金
        var u_jscj = mstform.getItem('u_jscj').getValue();
        //班级管理费
        var u_bjglf = mstform.getItem('u_bjglf').getValue();
        //命题费
        var u_mtf = mstform.getItem('u_mtf').getValue();
        //阅卷费
        var u_yjf = mstform.getItem('u_yjf').getValue();
        //教材费
        var u_jcf = mstform.getItem('u_jcf').getValue();
        //讲师食宿交通费
        var u_jsssjtf = mstform.getItem('u_jsssjtf').getValue();
        //宣传推介费
        var u_xctjf = mstform.getItem('u_xctjf').getValue();
        //质量评估费
        var u_zlptf = mstform.getItem('u_zlptf').getValue();
        //广告费
        var u_ggf = mstform.getItem('u_ggf').getValue();
        //文印费
        var u_wyf = mstform.getItem('u_wyf').getValue();
        //场地（设备）租赁费
        var u_cdzlf = mstform.getItem('u_cdzlf').getValue();
        //实训物料（工机具）费
        var u_sxwlf = mstform.getItem('u_sxwlf').getValue();

        mstform.getItem('fyys').setValue(Number(qzpxf) + Number(clf) + Number(qtfy) + Number(u_jscj) + Number(u_bjglf) + Number(u_mtf) + Number(u_yjf) + Number(u_jcf) + Number(u_jsssjtf) + Number(u_xctjf) + Number(u_zlptf) + Number(u_ggf) + Number(u_wyf) + Number(u_cdzlf) + Number(u_sxwlf));
    });
    //讲师食宿交通费
    mstform.getItem('u_jsssjtf').addListener('itemchanged', function (obj) {
        //培训费
        var qzpxf = mstform.getItem('qzpxf').getValue();
        //食宿差旅费
        var clf = mstform.getItem('clf').getValue();
        //其他费用
        var qtfy = mstform.getItem('qtfy').getValue();
        //讲师酬金
        var u_jscj = mstform.getItem('u_jscj').getValue();
        //班级管理费
        var u_bjglf = mstform.getItem('u_bjglf').getValue();
        //命题费
        var u_mtf = mstform.getItem('u_mtf').getValue();
        //阅卷费
        var u_yjf = mstform.getItem('u_yjf').getValue();
        //教材费
        var u_jcf = mstform.getItem('u_jcf').getValue();
        //讲师食宿交通费
        var u_jsssjtf = mstform.getItem('u_jsssjtf').getValue();
        //宣传推介费
        var u_xctjf = mstform.getItem('u_xctjf').getValue();
        //质量评估费
        var u_zlptf = mstform.getItem('u_zlptf').getValue();
        //广告费
        var u_ggf = mstform.getItem('u_ggf').getValue();
        //文印费
        var u_wyf = mstform.getItem('u_wyf').getValue();
        //场地（设备）租赁费
        var u_cdzlf = mstform.getItem('u_cdzlf').getValue();
        //实训物料（工机具）费
        var u_sxwlf = mstform.getItem('u_sxwlf').getValue();

        mstform.getItem('fyys').setValue(Number(qzpxf) + Number(clf) + Number(qtfy) + Number(u_jscj) + Number(u_bjglf) + Number(u_mtf) + Number(u_yjf) + Number(u_jcf) + Number(u_jsssjtf) + Number(u_xctjf) + Number(u_zlptf) + Number(u_ggf) + Number(u_wyf) + Number(u_cdzlf) + Number(u_sxwlf));
    });
    //宣传推介费
    mstform.getItem('u_xctjf').addListener('itemchanged', function (obj) {
        //培训费
        var qzpxf = mstform.getItem('qzpxf').getValue();
        //食宿差旅费
        var clf = mstform.getItem('clf').getValue();
        //其他费用
        var qtfy = mstform.getItem('qtfy').getValue();
        //讲师酬金
        var u_jscj = mstform.getItem('u_jscj').getValue();
        //班级管理费
        var u_bjglf = mstform.getItem('u_bjglf').getValue();
        //命题费
        var u_mtf = mstform.getItem('u_mtf').getValue();
        //阅卷费
        var u_yjf = mstform.getItem('u_yjf').getValue();
        //教材费
        var u_jcf = mstform.getItem('u_jcf').getValue();
        //讲师食宿交通费
        var u_jsssjtf = mstform.getItem('u_jsssjtf').getValue();
        //宣传推介费
        var u_xctjf = mstform.getItem('u_xctjf').getValue();
        //质量评估费
        var u_zlptf = mstform.getItem('u_zlptf').getValue();
        //广告费
        var u_ggf = mstform.getItem('u_ggf').getValue();
        //文印费
        var u_wyf = mstform.getItem('u_wyf').getValue();
        //场地（设备）租赁费
        var u_cdzlf = mstform.getItem('u_cdzlf').getValue();
        //实训物料（工机具）费
        var u_sxwlf = mstform.getItem('u_sxwlf').getValue();

        mstform.getItem('fyys').setValue(Number(qzpxf) + Number(clf) + Number(qtfy) + Number(u_jscj) + Number(u_bjglf) + Number(u_mtf) + Number(u_yjf) + Number(u_jcf) + Number(u_jsssjtf) + Number(u_xctjf) + Number(u_zlptf) + Number(u_ggf) + Number(u_wyf) + Number(u_cdzlf) + Number(u_sxwlf));
    });
    //质量评估费
    mstform.getItem('u_zlptf').addListener('itemchanged', function (obj) {
        //培训费
        var qzpxf = mstform.getItem('qzpxf').getValue();
        //食宿差旅费
        var clf = mstform.getItem('clf').getValue();
        //其他费用
        var qtfy = mstform.getItem('qtfy').getValue();
        //讲师酬金
        var u_jscj = mstform.getItem('u_jscj').getValue();
        //班级管理费
        var u_bjglf = mstform.getItem('u_bjglf').getValue();
        //命题费
        var u_mtf = mstform.getItem('u_mtf').getValue();
        //阅卷费
        var u_yjf = mstform.getItem('u_yjf').getValue();
        //教材费
        var u_jcf = mstform.getItem('u_jcf').getValue();
        //讲师食宿交通费
        var u_jsssjtf = mstform.getItem('u_jsssjtf').getValue();
        //宣传推介费
        var u_xctjf = mstform.getItem('u_xctjf').getValue();
        //质量评估费
        var u_zlptf = mstform.getItem('u_zlptf').getValue();
        //广告费
        var u_ggf = mstform.getItem('u_ggf').getValue();
        //文印费
        var u_wyf = mstform.getItem('u_wyf').getValue();
        //场地（设备）租赁费
        var u_cdzlf = mstform.getItem('u_cdzlf').getValue();
        //实训物料（工机具）费
        var u_sxwlf = mstform.getItem('u_sxwlf').getValue();

        mstform.getItem('fyys').setValue(Number(qzpxf) + Number(clf) + Number(qtfy) + Number(u_jscj) + Number(u_bjglf) + Number(u_mtf) + Number(u_yjf) + Number(u_jcf) + Number(u_jsssjtf) + Number(u_xctjf) + Number(u_zlptf) + Number(u_ggf) + Number(u_wyf) + Number(u_cdzlf) + Number(u_sxwlf));
    });
    //广告费
    mstform.getItem('u_ggf').addListener('itemchanged', function (obj) {
        //培训费
        var qzpxf = mstform.getItem('qzpxf').getValue();
        //食宿差旅费
        var clf = mstform.getItem('clf').getValue();
        //其他费用
        var qtfy = mstform.getItem('qtfy').getValue();
        //讲师酬金
        var u_jscj = mstform.getItem('u_jscj').getValue();
        //班级管理费
        var u_bjglf = mstform.getItem('u_bjglf').getValue();
        //命题费
        var u_mtf = mstform.getItem('u_mtf').getValue();
        //阅卷费
        var u_yjf = mstform.getItem('u_yjf').getValue();
        //教材费
        var u_jcf = mstform.getItem('u_jcf').getValue();
        //讲师食宿交通费
        var u_jsssjtf = mstform.getItem('u_jsssjtf').getValue();
        //宣传推介费
        var u_xctjf = mstform.getItem('u_xctjf').getValue();
        //质量评估费
        var u_zlptf = mstform.getItem('u_zlptf').getValue();
        //广告费
        var u_ggf = mstform.getItem('u_ggf').getValue();
        //文印费
        var u_wyf = mstform.getItem('u_wyf').getValue();
        //场地（设备）租赁费
        var u_cdzlf = mstform.getItem('u_cdzlf').getValue();
        //实训物料（工机具）费
        var u_sxwlf = mstform.getItem('u_sxwlf').getValue();

        mstform.getItem('fyys').setValue(Number(qzpxf) + Number(clf) + Number(qtfy) + Number(u_jscj) + Number(u_bjglf) + Number(u_mtf) + Number(u_yjf) + Number(u_jcf) + Number(u_jsssjtf) + Number(u_xctjf) + Number(u_zlptf) + Number(u_ggf) + Number(u_wyf) + Number(u_cdzlf) + Number(u_sxwlf));
    });
    //文印费
    mstform.getItem('u_wyf').addListener('itemchanged', function (obj) {
        //培训费
        var qzpxf = mstform.getItem('qzpxf').getValue();
        //食宿差旅费
        var clf = mstform.getItem('clf').getValue();
        //其他费用
        var qtfy = mstform.getItem('qtfy').getValue();
        //讲师酬金
        var u_jscj = mstform.getItem('u_jscj').getValue();
        //班级管理费
        var u_bjglf = mstform.getItem('u_bjglf').getValue();
        //命题费
        var u_mtf = mstform.getItem('u_mtf').getValue();
        //阅卷费
        var u_yjf = mstform.getItem('u_yjf').getValue();
        //教材费
        var u_jcf = mstform.getItem('u_jcf').getValue();
        //讲师食宿交通费
        var u_jsssjtf = mstform.getItem('u_jsssjtf').getValue();
        //宣传推介费
        var u_xctjf = mstform.getItem('u_xctjf').getValue();
        //质量评估费
        var u_zlptf = mstform.getItem('u_zlptf').getValue();
        //广告费
        var u_ggf = mstform.getItem('u_ggf').getValue();
        //文印费
        var u_wyf = mstform.getItem('u_wyf').getValue();
        //场地（设备）租赁费
        var u_cdzlf = mstform.getItem('u_cdzlf').getValue();
        //实训物料（工机具）费
        var u_sxwlf = mstform.getItem('u_sxwlf').getValue();

        mstform.getItem('fyys').setValue(Number(qzpxf) + Number(clf) + Number(qtfy) + Number(u_jscj) + Number(u_bjglf) + Number(u_mtf) + Number(u_yjf) + Number(u_jcf) + Number(u_jsssjtf) + Number(u_xctjf) + Number(u_zlptf) + Number(u_ggf) + Number(u_wyf) + Number(u_cdzlf) + Number(u_sxwlf));
    });
    //场地（设备）租赁费
    mstform.getItem('u_cdzlf').addListener('itemchanged', function (obj) {
        //培训费
        var qzpxf = mstform.getItem('qzpxf').getValue();
        //食宿差旅费
        var clf = mstform.getItem('clf').getValue();
        //其他费用
        var qtfy = mstform.getItem('qtfy').getValue();
        //讲师酬金
        var u_jscj = mstform.getItem('u_jscj').getValue();
        //班级管理费
        var u_bjglf = mstform.getItem('u_bjglf').getValue();
        //命题费
        var u_mtf = mstform.getItem('u_mtf').getValue();
        //阅卷费
        var u_yjf = mstform.getItem('u_yjf').getValue();
        //教材费
        var u_jcf = mstform.getItem('u_jcf').getValue();
        //讲师食宿交通费
        var u_jsssjtf = mstform.getItem('u_jsssjtf').getValue();
        //宣传推介费
        var u_xctjf = mstform.getItem('u_xctjf').getValue();
        //质量评估费
        var u_zlptf = mstform.getItem('u_zlptf').getValue();
        //广告费
        var u_ggf = mstform.getItem('u_ggf').getValue();
        //文印费
        var u_wyf = mstform.getItem('u_wyf').getValue();
        //场地（设备）租赁费
        var u_cdzlf = mstform.getItem('u_cdzlf').getValue();
        //实训物料（工机具）费
        var u_sxwlf = mstform.getItem('u_sxwlf').getValue();

        mstform.getItem('fyys').setValue(Number(qzpxf) + Number(clf) + Number(qtfy) + Number(u_jscj) + Number(u_bjglf) + Number(u_mtf) + Number(u_yjf) + Number(u_jcf) + Number(u_jsssjtf) + Number(u_xctjf) + Number(u_zlptf) + Number(u_ggf) + Number(u_wyf) + Number(u_cdzlf) + Number(u_sxwlf));
    });
    //实训物料（工机具）费
    mstform.getItem('u_sxwlf').addListener('itemchanged', function (obj) {
        //培训费
        var qzpxf = mstform.getItem('qzpxf').getValue();
        //食宿差旅费
        var clf = mstform.getItem('clf').getValue();
        //其他费用
        var qtfy = mstform.getItem('qtfy').getValue();
        //讲师酬金
        var u_jscj = mstform.getItem('u_jscj').getValue();
        //班级管理费
        var u_bjglf = mstform.getItem('u_bjglf').getValue();
        //命题费
        var u_mtf = mstform.getItem('u_mtf').getValue();
        //阅卷费
        var u_yjf = mstform.getItem('u_yjf').getValue();
        //教材费
        var u_jcf = mstform.getItem('u_jcf').getValue();
        //讲师食宿交通费
        var u_jsssjtf = mstform.getItem('u_jsssjtf').getValue();
        //宣传推介费
        var u_xctjf = mstform.getItem('u_xctjf').getValue();
        //质量评估费
        var u_zlptf = mstform.getItem('u_zlptf').getValue();
        //广告费
        var u_ggf = mstform.getItem('u_ggf').getValue();
        //文印费
        var u_wyf = mstform.getItem('u_wyf').getValue();
        //场地（设备）租赁费
        var u_cdzlf = mstform.getItem('u_cdzlf').getValue();
        //实训物料（工机具）费
        var u_sxwlf = mstform.getItem('u_sxwlf').getValue();

        mstform.getItem('fyys').setValue(Number(qzpxf) + Number(clf) + Number(qtfy) + Number(u_jscj) + Number(u_bjglf) + Number(u_mtf) + Number(u_yjf) + Number(u_jcf) + Number(u_jsssjtf) + Number(u_xctjf) + Number(u_zlptf) + Number(u_ggf) + Number(u_wyf) + Number(u_cdzlf) + Number(u_sxwlf));
    });

    /*费用总计=培训费+食宿费+食宿差旅费+其他费用end*/

}

function getSaveDataEdit(type) { //单据编辑页面更新数据
    var mstform = Ext.getCmp('p_form0000000096_m');
    /* if (type == 'Approve'){                                    //工作流经过审批节点
 var phid=mstform.getItem('phid').getValue(); //表头Bill_no值赋予变量bb
        return { funcname: 'cr', paramstr: [{phid:phid}] };                   //调用注册SQL数据CRQC，变量bb传参给变量Bill_no
    }  */

    if (type == 'Verify') { //工作流经过审批节点
        var phid = mstform.getItem('phid').getValue(); //表头Bill_no值赋予变量bb
        return {
            funcname: 'cr',
            paramstr: [{
                phid: phid
            }]
        }; //调用注册SQL数据CRQC，变量bb传参给变量Bill_no
    }
    if (type == 'UnVerify') { //工作流经过审批节点
        var phid = mstform.getItem('phid').getValue(); //表头Bill_no值赋予变量bb
        return {
            funcname: 'des',
            paramstr: [{
                phid: phid
            }]
        }; //调用注册SQL数据CRQC，变量bb传参给变量Bill_no
    }
}

function getSaveDataList(type) {
    var mstform = Ext.getCmp('p_form0000000096_m');
    var data = mstform.getSelectionModel().getSelection();
    var phid = Number(data[0].get('train_project'), 0);
    if (type == 'Delete') {
        return {
            funcname: 'crs',
            paramstr: [{
                phid: phid
            }]
        }; //调用注册SQL数据CRQC，变量bb传参给变量Bill_no
    }

}
