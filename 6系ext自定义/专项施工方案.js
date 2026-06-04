
//初始化函数
function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000600012_m');
    var famc = mstform.getItem('famc');
    var dgrid = Ext.getCmp('p_form0000600012_d');
    var dstore = dgrid.store;
    console.log("===");
    mstform.getItem('u_major_cert_time').setVisible(false);
    // famc.setReadOnly(true);
    var pc = mstform.getItem('phid_pc');
    mstform.getItem('phid_pc').userSetMustInput(true);
    //mstform.getItem('falx_1').setVisible(false);
    console.log("mstform.getItem('u_is_large_dan').setValue('2');执行了")
    mstform.getItem('u_is_large_dan').setValue('2');
    mstform.getItem('u_large_dan_subdizj').setVisible(false);
    var famc = document.getElementById("famc-inputEl"); //申请项目编码填写框
    //famc.setAttribute('placeholder', '选择工程项目之后自动生成！');
    //根据项目编号,带出相关数据x
    // pc.addListener('helpselected', function () {
    //     var pc_val = mstform.getItem('pc').getRawValue();
    //     var falx_val = mstform.getItem('falx').getRawValue();
    //     //修改标题
    //     mstform.getItem('famc').setValue(pc_val +"[" + falx_val + "]" );
    // });

    mstform.getItem('phid_pc').addListener('helpselected', function () {
        var pc = mstform.getItem('phid_pc').getValue();
        console.log("pc:", pc);
        if (pc != null && pc!='') {
            execServer('p_form0000600012_data', {
                'pc': pc
            }, function (res) {
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    mstform.getItem('xmlx_1').setValue(data[0].extendObjects.phid_type);
                    mstform.getItem('gcdd_1').setValue(data[0].extendObjects.project_address);
                    mstform.getItem('empid').setValue(data[0].extendObjects.project_manager);
                    BatchBindCombox([mstform.getItem('empid'), mstform.getItem('xmlx_1')]);
                }
            });
        }
    });

    //判断方案类型 
    mstform.on('dataready', function () {

        var falx = mstform.getItem('falx').getValue();
        if (falx != null & falx != '' & falx == '224191225000005') {
            mstform.getItem('u_large_dan_subdizj').setVisible(true);
            mstform.getItem('u_major_cert_time').setVisible(true);
            mstform.getItem('u_large_dan_subdi').setVisible(false);

        }
    })








    pc.on('beforetriggerclick', function () { //帮助窗口打开前事件
        var falx_val = mstform.getItem('falx').getValue();
        if (Ext.isEmpty(falx_val)) {
            Ext.Msg.alert('提示', '请先选择方案类型！');
            return false;
        }
    }); //帮助窗口打开前事件结束
    //是否为超危大发生改变

    if (otype == $Otype.VIEW) {
        mstform.on('dataready', function () {
            var falx = mstform.getItem('falx').getValue('');
            if (falx == '224191225000005') {
                mstform.getItem('u_is_large_dan').setValue('1');
                mstform.getItem('u_sgfalx').userSetMustInput(true);  //危大工程类别 必输
                mstform.getItem('u_large_dan_subdizj').setVisible(true)//危大工程小类 可见 
                mstform.getItem('u_large_dan_subdizj').userSetMustInput(true);//危大工程小类可以必输 
                mstform.getItem('u_large_dan_subdi').setVisible(false)//危大工程小类 不可见 
                mstform.getItem('u_large_dan_subdi').userSetMustInput(false);//危大工程小类不必输   
                mstform.getItem('u_major_cert_time').userSetMustInput(true);
                mstform.getItem('u_major_cert_time').setVisible(true);
            }
            else if (falx == '224191225000002') {
                mstform.getItem('u_is_large_dan').setValue('2');
                mstform.getItem('u_sgfalx').userSetMustInput(true);  //危大工程类别 必输
                mstform.getItem('u_large_dan_subdi').setVisible(true)//危大工程小类 可见 
                mstform.getItem('u_large_dan_subdi').userSetMustInput(true);//危大工程小类可以必输 

                mstform.getItem('u_large_dan_subdizj').setVisible(false)//危大工程小类不 可见 
                mstform.getItem('u_large_dan_subdizj').userSetMustInput(false);//危大工程小类不必输 

                mstform.getItem('u_major_cert_time').userSetMustInput(false);
                mstform.getItem('u_major_cert_time').setVisible(false);
            }
            else if (falx == '224191225000001' || falx == '224200422000001' || falx == '224200422000002') {
                // 一般施工方案、直管项目大临建设方案、自管项目大临建设方案
                mstform.getItem('u_is_large_dan').setValue('2');
                mstform.getItem('u_sgfalx').userSetMustInput(false);
                mstform.getItem('u_large_dan_subdi').setVisible(true)//危大工程小类 可见 
                mstform.getItem('u_large_dan_subdi').userSetMustInput(false);//危大工程小类可以必输          
                mstform.getItem('u_large_dan_subdizj').setVisible(false)//危大工程小类不 可见 
                mstform.getItem('u_large_dan_subdizj').userSetMustInput(false);//危大工程小类不必输 
                mstform.getItem('u_major_cert_time').userSetMustInput(false);
            } else {
                mstform.getItem('u_is_large_dan').setValue('1');
                mstform.getItem('u_sgfalx').userSetMustInput(true);
                mstform.getItem('u_sgfalx').userSetMustInput(true);  //危大工程类别 必输
                mstform.getItem('u_large_dan_subdizj').setVisible(true)//危大工程小类 可见 
                mstform.getItem('u_large_dan_subdizj').userSetMustInput(true);//危大工程小类可以必输 
                mstform.getItem('u_large_dan_subdi').setVisible(false)//危大工程小类不可见 
                mstform.getItem('u_large_dan_subdi').userSetMustInput(false);//危大工程小类不必输 
                mstform.getItem('u_major_cert_time').setVisible(false);
                mstform.getItem('u_major_cert_time').userSetMustInput(false);

            }
        })
    }
    mstform.getItem('falx').addListener('helpselected', function () {


        var falx = mstform.getItem('falx').getValue('');
        //如果 他是一般施工方案、直管项目大临建设方案、自管项目大临建设方案的方案类型  危大工程类别、危大工程小类、危大工程小类（专家论证）不必输
        if (falx == '224191225000001' || falx == '224200422000001' || falx == '224200422000002' || falx == '224221025012564') {
            // 一般施工方案、直管项目大临建设方案、自管项目大临建设方案
            mstform.getItem('u_is_large_dan').setValue('2');
            mstform.getItem('u_sgfalx').userSetMustInput(false);
            mstform.getItem('u_sgfalx').userSetReadOnly(true); //危大工程小类可以输入  

            mstform.getItem('u_large_dan_subdi').setVisible(true)//危大工程小类 可见 
            mstform.getItem('u_large_dan_subdi').userSetMustInput(false);//危大工程小类可以必输 
            mstform.getItem('u_large_dan_subdi').userSetReadOnly(true); //危大工程小类可以输

            mstform.getItem('u_large_dan_subdizj').setVisible(false)//危大工程小类不 可见 
            mstform.getItem('u_large_dan_subdizj').userSetMustInput(false);//危大工程小类不必输 
            mstform.getItem('u_large_dan_subdizj').userSetReadOnly(true); //危大工程小类不输入 

            mstform.getItem('u_major_cert_time').userSetMustInput(false);
            mstform.getItem('u_major_cert_time').setVisible(false);
            mstform.getItem('u_large_dan_subdi').setValue('');
            mstform.getItem('u_large_dan_subdizj').setValue('');
            mstform.getItem('u_sgfalx').setValue('');

            dstore.removeAll();
            var arr1 = new Array();
            arr1.push({
                u_fjmc: '其他',
            });
            dstore.insert(dstore.getCount(), arr1);

            //如果 他是较大危险方案 的方案类型 危大工程类别、危大工程小类、危大工程小类（专家论证）必输入
        } else if (falx == '224191225000002') {
            // 较大危险方案
            mstform.getItem('u_is_large_dan').setValue('2');
            mstform.getItem('u_sgfalx').userSetMustInput(true);  //危大工程类别 必输
            mstform.getItem('u_sgfalx').userSetReadOnly(false);  //危大工程类别可以输入 
            mstform.getItem('u_large_dan_subdi').setVisible(true)//危大工程小类 可见 
            mstform.getItem('u_large_dan_subdi').userSetMustInput(true);//危大工程小类可以必输 
            mstform.getItem('u_large_dan_subdi').userSetReadOnly(false); //危大工程小类可以输入 
            mstform.getItem('u_large_dan_subdizj').setVisible(false)//危大工程小类不 可见 
            mstform.getItem('u_large_dan_subdizj').userSetMustInput(false);//危大工程小类不必输 
            mstform.getItem('u_large_dan_subdizj').userSetReadOnly(true); //危大工程小类不输入 
            mstform.getItem('u_major_cert_time').userSetMustInput(false);
            mstform.getItem('u_major_cert_time').setVisible(false);
            mstform.getItem('u_large_dan_subdi').setValue('');
            mstform.getItem('u_large_dan_subdizj').setValue('');
            mstform.getItem('u_sgfalx').setValue('');
            dstore.removeAll();
            var arr1 = new Array();
            arr1.push({
                u_fjmc: '危大工程方案',
            });

            arr1.push({
                u_fjmc: '其他',
            });

            dstore.insert(dstore.getCount(), arr1);

        } else if (falx == '224191225000005') {
            // 重大危险方案（论证后）
            //如果 重大危险方案（论证后） 的方案类型 危大工程类别、危大工程小类、危大工程小类（专家论证）必输入
            mstform.getItem('u_is_large_dan').setValue('1');
            mstform.getItem('u_sgfalx').userSetMustInput(true);  //危大工程类别 必输
            mstform.getItem('u_sgfalx').userSetReadOnly(false);  //危大工程类别可以输入 
            mstform.getItem('u_large_dan_subdizj').setVisible(true)//危大工程小类 可见 
            mstform.getItem('u_large_dan_subdizj').userSetMustInput(true);//危大工程小类可以必输 
            mstform.getItem('u_large_dan_subdizj').userSetReadOnly(false); //危大工程小类可以输入 
            mstform.getItem('u_large_dan_subdi').setVisible(false)//危大工程小类 不可见 
            mstform.getItem('u_large_dan_subdi').userSetMustInput(false);//危大工程小类不必输 
            mstform.getItem('u_large_dan_subdi').userSetReadOnly(true); //危大工程小类不输入
            mstform.getItem('u_major_cert_time').userSetMustInput(true);
            mstform.getItem('u_major_cert_time').setVisible(true);
            mstform.getItem('u_large_dan_subdi').setValue('');
            mstform.getItem('u_large_dan_subdizj').setValue('');
            mstform.getItem('u_sgfalx').setValue('');
            dstore.removeAll();
            var arr1 = new Array();
            arr1.push({
                u_fjmc: '危大工程方案',
            });
            arr1.push({
                u_fjmc: '专家论证意见',
            });
            arr1.push({
                u_fjmc: '按照专家论证意见修改记录',
            });
            arr1.push({
                u_fjmc: '其他',
            });
            dstore.insert(dstore.getCount(), arr1);

        } else {
            //如果 他是较重大危险方案（论证前） 的方案类型 危大工程类别、危大工程小类、危大工程小类（专家论证）必输入
            mstform.getItem('u_is_large_dan').setValue('1');
            mstform.getItem('u_sgfalx').userSetMustInput(true);
            mstform.getItem('u_sgfalx').userSetMustInput(true);  //危大工程类别 必输
            mstform.getItem('u_sgfalx').userSetReadOnly(false);  //危大工程类别可以输入 
            mstform.getItem('u_large_dan_subdizj').setVisible(true)//危大工程小类 可见 
            mstform.getItem('u_large_dan_subdizj').userSetMustInput(true);//危大工程小类可以必输 
            mstform.getItem('u_large_dan_subdizj').userSetReadOnly(false); //危大工程小类可以输入 
            mstform.getItem('u_large_dan_subdi').setVisible(false)//危大工程小类不可见 
            mstform.getItem('u_large_dan_subdi').userSetMustInput(false);//危大工程小类不必输 
            mstform.getItem('u_large_dan_subdi').userSetReadOnly(true); //危大工程小类不输入 
            mstform.getItem('u_major_cert_time').setVisible(false);
            mstform.getItem('u_major_cert_time').userSetMustInput(false);
            mstform.getItem('u_large_dan_subdi').setValue('');
            mstform.getItem('u_large_dan_subdizj').setValue('');
            mstform.getItem('u_sgfalx').setValue('');
            dstore.removeAll();
            var arr1 = new Array();
            arr1.push({
                u_fjmc: '危大工程方案',
            });

            arr1.push({
                u_fjmc: '其他',
            });
            dstore.insert(dstore.getCount(), arr1);

        }


    })
    mstform.getItem('u_is_large_dan').addListener('helpselected', function () {
        var large_dan = mstform.getItem('u_is_large_dan').getValue();
        console.log("large_dan:",large_dan);
        if (large_dan == 1) {

            mstform.getItem('u_large_dan_subdi').setVisible(false)
            mstform.getItem('u_large_dan_subdizj').setVisible(true)
        } else {
            mstform.getItem('u_large_dan_subdi').setVisible(true)
            mstform.getItem('u_large_dan_subdizj').setVisible(false)
        }
    })



    //危大工程小类通用帮助前过滤
    var dansubdi = mstform.getItem('u_large_dan_subdi');
    dansubdi.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        var usgfalx = mstform.getItem('u_sgfalx').getValue();
        console.log(usgfalx);
        if (usgfalx != '' && usgfalx != null) {
            if (usgfalx == 1) {
                dansubdi.setClientSqlFilter('c_descript = 1');
            } else if (usgfalx == 2) {
                dansubdi.setClientSqlFilter('c_descript = 2');
            } else if (usgfalx == 3) {
                dansubdi.setClientSqlFilter('c_descript = 3');
            } else if (usgfalx == 4) {
                dansubdi.setClientSqlFilter('c_descript = 4');
            } else if (usgfalx == 5) {
                dansubdi.setClientSqlFilter('c_descript = 5');
            } else if (usgfalx == 6) {
                dansubdi.setClientSqlFilter('c_descript = 6');
            } else if (usgfalx == 7) {
                dansubdi.setClientSqlFilter('c_descript = 7');
            }
        }

    });
    //危大工程小类（专家论证）通用帮助前过滤
    var dansubdizj = mstform.getItem('u_large_dan_subdizj');
    dansubdizj.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        var usgfalx = mstform.getItem('u_sgfalx').getValue();
        console.log(usgfalx);
        if (usgfalx != '' && usgfalx != null) {
            if (usgfalx == 1) {
                dansubdizj.setClientSqlFilter('c_descript = 1');
            } else if (usgfalx == 2) {
                dansubdizj.setClientSqlFilter('c_descript = 2');
            } else if (usgfalx == 3) {
                dansubdizj.setClientSqlFilter('c_descript = 3');
            } else if (usgfalx == 4) {
                dansubdizj.setClientSqlFilter('c_descript = 4');
            } else if (usgfalx == 5) {
                dansubdizj.setClientSqlFilter('c_descript = 5');
            } else if (usgfalx == 6) {
                dansubdizj.setClientSqlFilter('c_descript = 6');
            } else if (usgfalx == 7) {
                dansubdizj.setClientSqlFilter('c_descript = 7');
            }
        }

    });





    //当单据状态为新增时
    if (otype == $Otype.ADD) {
        //对单据头的专家论证的选择进行监听
        mstform.getItem('ddlbcol_1').addListener('helpselected', function () {
            //当专家论证结果为‘02’时，01为是，02为否
            if (mstform.getItem('ddlbcol_1').getValue() == '02') {
                mstform.getItem('zjrzqk_1').setVisible(false); //设置专家论证情况不可见
                Ext.getCmp('p_form0000600012_d').setVisible(false); //设置单据体不可见
            } else {
                mstform.getItem('zjrzqk_1').setVisible(true); //设置专家论证情况可见
                Ext.getCmp('p_form0000600012_d').setVisible(true); //设置单据体可见
            }
        });

        //mstform.getItem('org_id').setValue($appinfo.ocode)
        //BatchBindCombox([mstform.getItem('org_id')]);
    }
    //当单据状态为查看或修改时
    if (otype == $Otype.EDIT || otype == $Otype.VIEW) {
        //单据头的专家论证数据获取完毕
        mstform.getItem('ddlbcol_1').on('dataready', function () {
            //当专家论证结果为‘02’时，01为是，02为否
            if (mstform.getItem('ddlbcol_1').getValue() == '02') {
                mstform.getItem('zjrzqk_1').setVisible(false); //设置专家论证情况不可见
                Ext.getCmp('p_form0000600012_d').setVisible(false); //设置单据体不可见
            } else {
                mstform.getItem('zjrzqk_1').setVisible(true); //设置专家论证情况可见
                Ext.getCmp('p_form0000600012_d').setVisible(true); //设置单据体可见
            }


        });

    }

}
function beforeSaveEdit() {

    var mstform = Ext.getCmp('p_form0000600012_m');
    var famc = mstform.getItem('famc');
    var dgrid = Ext.getCmp('p_form0000600012_d');
    var dstore = dgrid.store;

    var dgridValue = dgrid.getStore().getRange(0, dstore.getCount() - 1)
    var records = dstore.getRange();
    console.log(dgridValue);
    console.log(records.length);
    if (records.length > 1) {
        for (var i = 0, len = records.length; i < len; i++) {
            if (records[0].get('asr_flg') == 0 && records[0].get('u_fjmc') == "危大工程方案") {
                NGMsg.Error('第1' + '行未上传附件，请上传附件');
                return false;
            } else if (records[1].get('asr_flg') == 0 && records[1].get('u_fjmc') == "专家论证意见") {
                NGMsg.Error('第2' + '行未上传附件，请上传附件');
                return false;
            }


            return true;

        }
    }

    return true;



}






