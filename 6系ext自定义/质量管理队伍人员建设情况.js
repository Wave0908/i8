function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700093_m');
    var dgrid = Ext.getCmp('p_form0000700093_d');
    var dstore = dgrid.store;
    var Toolbar = Ext.getCmp('toolbar');

    //姓名
    dgrid.getColumn('empid1_EXName').getEditor().addListener('helpselected', function (obj) {
        var data = dgrid.getSelectionModel().getSelection();
        var ygphid = data[0].get('empid1');
        console.log(data);
        execServer('p_form0000700093_ryxx', {
            'phid': ygphid
        }, function (res) {
            console.log(res);
            const data1 = typeof res.data == 'string' ? JSON.parse(res.data) : res.data;
            console.log(data1);
            if (!Ext.isEmpty(res) && data1[0]) {
                console.log(data[0]);
                data[0].set('u_sex', data1[0].extendObjects.sex); //性别
                data[0].set('u_phone_number', data1[0].extendObjects.phone); //办公室电话
                data[0].set('u_mobile', data1[0].extendObjects.mobile1); //手机号
                data[0].set('u_birthday', data1[0].extendObjects.birthday); //出生年月
                // data[0].set('u_occupation', ); //所任职务phid
                // data[0].set('u_occupation_name', ); //所任职务
                // data[0].set('u_soc_business', ); //社会兼职phid
                // data[0].set('u_soc_business_name', ); //社会兼职
                // data[0].set('u_business_info', ); //专兼职情况
                //data[0].set('u_zgxl', res.data[0].zgxl); //最高学历

                if (zgxlphid = '1042') {
                    data[0].set('u_zgxl', '2')

                    //1038	中专毕业
                    //1041	大专毕业
                    //1039	职高毕业
                    //224200102000011	技校毕业
                    //1037	初中毕业
                    //1040	高中毕业
                    //1191	博士研究生
                    //1043	硕士研究生
                } else if (zgxlphid = '1038') { data[0].set('u_zgxl', '4') }
                else if (zgxlphid = '1041') { data[0].set('u_zgxl', '3') }
                else if (zgxlphid = '1039') { data[0].set('u_zgxl', '4') }
                else if (zgxlphid = '224200102000011') { data[0].set('u_zgxl', '4') }
                else if (zgxlphid = '1040') { data[0].set('u_zgxl', '5') }
                else if (zgxlphid = '1191') { data[0].set('u_zgxl', '1') }
                else if (zgxlphid = '1043') { data[0].set('u_zgxl', '1') }
                if (fsdphid = '1044') {
                    data[0].set('u_zw', '1')
                } else if (fsdphid = '1045') { data[0].set('u_zgxl', '2') }
                else if (fsdphid = '1047') { data[0].set('u_zgxl', '3') }
                else if (fsdphid = '1048') { data[0].set('u_zgxl', '4') }
                else { data[0].set('u_zgxl', '5') }

                // 技术员	1048
                // 助理工程师	1047
                // 高级政工师	1065 教授级高级工程师	1044
                //正高级（教授级高工）工程师、高级工程师、工程师、助理工程师、其他

                data[0].set('u_school', data1[0].extendObjects.byyx); //别业院校
                data[0].set('u_major', data1[0].extendObjects.zgzy); //专业
                data[0].set('u_technology', data1[0].extendObjects.zgzy); //擅长专业
                data[0].set('u_title', data1[0].extendObjects.zc); //职称
                data[0].set('u_business_time', data1[0].extendObjects.rznx); //任职年限
                data[0].set('u_cont_relation', data1[0].extendObjects.htgx); //合同关系
                // data[0].set('u_czqk', ); //持证情况phid
                // data[0].set('u_czqk_name', ); //持证情况
            }
        });
    });

    //所属职务
    dgrid.getColumn('u_occupation_EXName').getEditor().on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        console.log('_occupation_EXName:' + dgrid.getColumn('u_occupation_EXName'));
        console.log('_occupation:' + dgrid.getColumn('u_occupation_EXName'));
        var level = mstform.getItem('u_level').getValue();
        console.log('level:' + level);
        if (Ext.isEmpty(level)) {
            Ext.Msg.alert('提示', '请先选择所属层级!');
            return false;
        } else {
            if (level != 3) {
                dgrid.getColumn('u_occupation_EXName').getEditor().setClientSqlFilter(
                    ('c_descript in (1,3)'));

            } else {
                dgrid.getColumn('u_occupation_EXName').getEditor().setClientSqlFilter(
                    ('c_descript in (2,3)'));
            }
        }
    });


}