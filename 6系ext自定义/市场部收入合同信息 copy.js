function allReadyEdit() {
	var mstform = Ext.getCmp('p_form0000700463_m');
    console.log("开始！")
	mstform.getItem('u_phid_sourcemid').setVisible(false);
        mstform.getItem('u_sfsyqy').setVisible(false);
        mstform.getItem('u_htmc').setVisible(false);
        //mstform.getItem('u_qywcsj').setVisible(false);
        mstform.getItem('u_zgsmc').setVisible(false);
        mstform.getItem ('u_zgsmc').userSetMustInput(false);
        //是否联合体
        /*
        mstform.getItem('u_lhtssje').setVisible(false);
        mstform.getItem('u_wfssje').setVisible(false);
        mstform.getItem ('u_lhtssje').userSetMustInput(false);
        mstform.getItem ('u_wfssje').userSetMustInput(false);
        */
        //指标是否分劈

        mstform.getItem('u_zbrddw1').setVisible(false);
        mstform.getItem('u_rdje1').setVisible(false);
        mstform.getItem('u_sssjjg1').setVisible(false);
        mstform.getItem('u_hte1').setVisible(false);
        mstform.getItem('u_sssjjg2').setVisible(false);
        mstform.getItem('u_hte2').setVisible(false);
        mstform.getItem('u_sssjjg3').setVisible(false);
        mstform.getItem('u_hte3').setVisible(false);
        //mstform.getItem('u_zbrddw1').setVisible(false);
        mstform.getItem('u_zbrddw2').setVisible(false);
        mstform.getItem('u_zbrddw3').setVisible(false);
        //mstform.getItem('u_zbrddw1').userSetMustInput(false);
        mstform.getItem('u_zbrddw2').userSetMustInput(false);
        mstform.getItem('u_zbrddw3').userSetMustInput(false);
        //mstform.getItem('u_rdje1').setVisible(false);
        mstform.getItem('u_rdje2').setVisible(false);
        mstform.getItem('u_rdje3').setVisible(false);
        //mstform.getItem('u_rdje1').userSetMustInput(false);
        mstform.getItem('u_rdje2').userSetMustInput(false);
        mstform.getItem('u_rdje3').userSetMustInput(false);

        mstform.getItem('u_zbrddw2').setVisible(false);
        mstform.getItem('u_rdje2').setVisible(false);
        mstform.getItem('u_zbrddw3').setVisible(false);
        mstform.getItem('u_rdje3').setVisible(false);
        mstform.getItem('u_sssjjg2_1').setVisible(false);
        mstform.getItem('u_fphte2_1').setVisible(false);
        mstform.getItem('u_sssjjg2_2').setVisible(false);
        mstform.getItem('u_fphte2_2').setVisible(false);
        mstform.getItem('u_sssjjg2_3').setVisible(false);
        mstform.getItem('u_fphte2_3').setVisible(false);
        mstform.getItem('u_sssjjg3_1').setVisible(false);
        mstform.getItem('u_fphte3_1').setVisible(false);
        mstform.getItem('u_sssjjg3_2').setVisible(false);
        mstform.getItem('u_fphte3_2').setVisible(false);
        mstform.getItem('u_sssjjg3_3').setVisible(false);
        mstform.getItem('u_fphte3_3').setVisible(false);

        //其它内容隐藏
        mstform.getItem('u_zbrddw').setVisible(false);
        mstform.getItem('u_zbrddw').userSetMustInput(false);
        mstform.getItem('u_zbrdje').setVisible(false);
        mstform.getItem('u_zbrdje').userSetMustInput(false);
        mstform.getItem('u_htmc').setVisible(false);
        mstform.getItem('u_htmc').userSetMustInput(false);
        mstform.getItem('u_qywcsj').setVisible(false);
        //mstform.getItem('u_qywcsj').userSetMustInput(false);
        mstform.getItem('u_sfsyqy').setVisible(false);
        mstform.getItem('u_sfsyqy').userSetMustInput(false);
        mstform.getItem('textcol_9').setVisible(false);
        mstform.getItem('textcol_9').userSetMustInput(false);
        mstform.getItem('u_yfsfwlht').setVisible(false);
        mstform.getItem('u_yfsfwlht').userSetMustInput(false);
        mstform.getItem('u_yfk').setVisible(false);
        mstform.getItem('u_yfk').userSetMustInput(false);
        mstform.getItem('u_zbj').setVisible(false);
        mstform.getItem('u_zbj').userSetMustInput(false);
        mstform.getItem('u_htkgrq').setVisible(false);
        mstform.getItem('u_htkgrq').userSetMustInput(false);
        mstform.getItem('u_htjgrq').setVisible(false);
        mstform.getItem('u_htjgrq').userSetMustInput(false);
        mstform.getItem('textcol_5').setVisible(false);
        mstform.getItem('textcol_5').userSetMustInput(false);
        mstform.getItem('u_htpsfxsx').setVisible(false);
        mstform.getItem('u_htpsfxsx').userSetMustInput(false);
        mstform.getItem('u_wdwssje').setVisible(false);
        mstform.getItem('u_wdwssje').userSetMustInput(false);
        mstform.getItem('u_xmszd').setVisible(false);
        mstform.getItem('u_xmszd').userSetMustInput(false);
        mstform.getItem('u_zlyq').setVisible(false);
        mstform.getItem('u_zlyq').userSetMustInput(false);
        mstform.getItem('textcol_3').setVisible(false);
        mstform.getItem('textcol_3').userSetMustInput(false);
        mstform.getItem('u_fkfs').setVisible(false);
        mstform.getItem('u_fkfs').userSetMustInput(false);
        mstform.getItem('textcol_7').setVisible(false);
        mstform.getItem('textcol_7').userSetMustInput(false);
        mstform.getItem('u_jdkbl').setVisible(false);
        mstform.getItem('u_jdkbl').userSetMustInput(false);
        mstform.getItem('u_qxzrqhbx').setVisible(false);
        mstform.getItem('u_qxzrqhbx').userSetMustInput(false);
        mstform.getItem('u_gzfs').setVisible(false);
        mstform.getItem('u_gzfs').userSetMustInput(false);
        mstform.getItem('u_gzrq').setVisible(false);
        mstform.getItem('u_gzrq').userSetMustInput(false);
        mstform.getItem('textcol_8').setVisible(false);
        mstform.getItem('textcol_8').userSetMustInput(false);
        mstform.getItem('textcol_6').setVisible(false);
        mstform.getItem('textcol_6').userSetMustInput(false);
        mstform.getItem('pc').setVisible(false);
        mstform.getItem('pc').userSetMustInput(false);

        //补充协议所属三级机构
        mstform.getItem('u_bcxysssjjg').userSetMustInput(false);
        mstform.getItem('u_bcxysssjjg').setVisible(false);

        //指标分劈机构根据指标认定单位过滤
  mstform.getItem('u_zbrddw1').addListener('change', function() {
    console.log("zbrddw1");
    /*
    mstform.getItem('u_sssjjg1').setValue('');
    mstform.getItem('u_sssjjg2').setValue('');
    mstform.getItem('u_sssjjg3').setValue('');
    */
    var zbrddw1 = mstform.getItem('u_zbrddw1').getValue();
    var ssjg1 = mstform.getItem('u_sssjjg1')  
    var ssjg2 = mstform.getItem('u_sssjjg2')
    var ssjg3 = mstform.getItem('u_sssjjg3')                                    //帮助字段PC 赋值给pc （通用帮助可选数据据过滤示例1）
    ssjg1.on('beforetriggerclick', function (eOp,ignoreBeforeEvent) {    //帮助窗口打开前事件
        ssjg1.setOutFilter({dwzj: zbrddw1})        //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
    }); 
    ssjg2.on('beforetriggerclick', function (eOp,ignoreBeforeEvent) {    //帮助窗口打开前事件
        ssjg2.setOutFilter({dwzj: zbrddw1})        //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
    }); 
    ssjg3.on('beforetriggerclick', function (eOp,ignoreBeforeEvent) {    //帮助窗口打开前事件
        ssjg3.setOutFilter({dwzj: zbrddw1})        //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
    }); 
    })
    //
    mstform.getItem('u_zbrddw2').addListener('change', function() {
        console.log("zbrddw1");
        /*
        mstform.getItem('u_sssjjg2_1').setValue('');
        mstform.getItem('u_sssjjg2_2').setValue('');
        mstform.getItem('u_sssjjg2_3').setValue('');
        */
        var zbrddw2 = mstform.getItem('u_zbrddw2').getValue();
        var ssjg2_1 = mstform.getItem('u_sssjjg2_1')  
        var ssjg2_2 = mstform.getItem('u_sssjjg2_2')
        var ssjg2_3 = mstform.getItem('u_sssjjg2_3')                                    //帮助字段PC 赋值给pc （通用帮助可选数据据过滤示例1）
        ssjg2_1.on('beforetriggerclick', function (eOp,ignoreBeforeEvent) {    //帮助窗口打开前事件
            ssjg2_1.setOutFilter({dwzj: zbrddw2})        //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
        }); 
        ssjg2_2.on('beforetriggerclick', function (eOp,ignoreBeforeEvent) {    //帮助窗口打开前事件
            ssjg2_2.setOutFilter({dwzj: zbrddw2})        //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
        }); 
        ssjg2_3.on('beforetriggerclick', function (eOp,ignoreBeforeEvent) {    //帮助窗口打开前事件
            ssjg2_3.setOutFilter({dwzj: zbrddw2})        //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
        }); 
    })
    //
    mstform.getItem('u_sfbcxy').addListener('change', function() {
        var tag = mstform.getItem('u_sfbcxy').getValue();
        if(tag == '是'){
            mstform.getItem('u_bcxysssjjg').userSetMustInput(true);
            mstform.getItem('u_bcxysssjjg').setVisible(true);
        }else{
            mstform.getItem('u_bcxysssjjg').userSetMustInput(false);
            mstform.getItem('u_bcxysssjjg').setVisible(false);
        }
    })

    //是否现场循环市场
    mstform.getItem('ddlbcol_2').addListener('change', function() {
        var tag = mstform.getItem('ddlbcol_2').getValue();
        if(tag == '1'){
            mstform.getItem('u_xmbmc').userSetMustInput(true);
            mstform.getItem('u_xmbmc').setVisible(true);
            mstform.getItem('empid').userSetMustInput(true);
            mstform.getItem('empid').setVisible(true);
        }else{
            mstform.getItem('u_xmbmc').userSetMustInput(false);
            mstform.getItem('u_xmbmc').setVisible(false);
            mstform.getItem('u_xmbmc').setValue('');
            mstform.getItem('empid').userSetMustInput(false);
            mstform.getItem('empid').setVisible(false);
            mstform.getItem('u_xmbmc').setValue('');
        }
    })



    mstform.getItem('u_zbrddw3').addListener('change', function() {
        console.log("zbrddw1");
        /*
        mstform.getItem('u_sssjjg3_1').setValue('');
        mstform.getItem('u_sssjjg3_2').setValue('');
        mstform.getItem('u_sssjjg3_3').setValue('');
        */
        var zbrddw3 = mstform.getItem('u_zbrddw3').getValue();
        var ssjg3_1 = mstform.getItem('u_sssjjg3_1')  
        var ssjg3_2 = mstform.getItem('u_sssjjg3_2')
        var ssjg3_3 = mstform.getItem('u_sssjjg3_3')                                    //帮助字段PC 赋值给pc （通用帮助可选数据据过滤示例1）
        ssjg3_1.on('beforetriggerclick', function (eOp,ignoreBeforeEvent) {    //帮助窗口打开前事件
            ssjg3_1.setOutFilter({dwzj: zbrddw3})        //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
        }); 
        ssjg3_2.on('beforetriggerclick', function (eOp,ignoreBeforeEvent) {    //帮助窗口打开前事件
            ssjg3_2.setOutFilter({dwzj: zbrddw3})        //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
        }); 
        ssjg3_3.on('beforetriggerclick', function (eOp,ignoreBeforeEvent) {    //帮助窗口打开前事件
            ssjg3_3.setOutFilter({dwzj: zbrddw3})        //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
        }); 
    })
    //

  //结束//


          /*
  是否分劈指标：否
    1、是否补充协议：是--补充协议金额否跳2
    2、是否联合体为否的：合同文本金额/是的选择我单位实施金额
    是否分劈指标：是
    1、根据分劈指标的单位及分劈金额分别取值
 */
    /*
    mstform.getItem('u_htwbje').setVisible(false);
    mstform.getItem ('u_htwbje').userSetMustInput(false);
    mstform.getItem('u_bcxyje').setVisible(false);
    mstform.getItem ('u_bcxyje').userSetMustInput(false);
    */

     

    /* mstform.getItem('u_qyfqdw').on('beforetriggerclick', function() { //客户类型2
        if(mstform.getItem('u_qyfqdw').getValue() == '') {
            Ext.Msg.alert('提示', '请点击业务来源选择评审项目');
            return false;
    }
    });  
    mstform.getItem('title').on('change', function() { //客户类型2
        if(mstform.getItem('title').getValue() == '') {
            Ext.Msg.alert('提示', '请点击业务来源选择评审项目');
            return false;
    }
    });  */


    mstform.getItem('u_sfzgsqy').addListener('change',function(obj){
            if(mstform.getItem('u_sfzgsqy').getValue() == '1'){
                mstform.getItem('u_zgsmc').setVisible(true);
                mstform.getItem ('u_zgsmc').userSetMustInput(true);  
            }else if(mstform.getItem('u_sfzgsqy').getValue() == '0'){
                mstform.getItem('u_zgsmc').setVisible(false);
                mstform.getItem ('u_zgsmc').userSetMustInput(false); 
            }
    })
mstform.getItem("u_yfmc").hide();
      mstform.getItem('userhelp_1').addListener('helpselected', function (obj) {
        var userhelp_1= mstform.getItem("userhelp_1").getValue();
        callServer('htps', [{
            'phid': userhelp_1,
        }], function (res) {
            if (!Ext.isEmpty(res) && res.record[0]) {
            mstform.getItem('u_sfbcxy').setValue(res.record[0].sfbcxy)//是否补充协议
            mstform.getItem("textcol_1").setValue(res.record[0].bg_cnt_no);//补充协议编码
            mstform.getItem("textcol_2").setValue(res.record[0].textcol_1);//补充协议名称
            mstform.getItem("u_bcxyje").setValue(res.record[0].amt);
            mstform.getItem("textcol_7").setValue(res.record[0].oname); //签约发起单位
            mstform.getItem("u_htwbje").setValue(res.record[0].numericcol_1); //合同文本金额
            mstform.getItem("u_lhtssje").setValue(res.record[0].amt_1);//联合体实施金额
            mstform.getItem("u_wfssje").setValue(res.record[0].amt_2);//我单位实施金额
            mstform.getItem("u_xmszd").setValue(res.record[0].gcdd); //项目所在地
            mstform.getItem('u_htkgrq').setValue(res.record[0].kgrq);//合同开工日期
            mstform.getItem("u_htjgrq").setValue(res.record[0].jgrq); //合同竣工日期
            mstform.getItem("u_yfk").setValue(res.record[0].htyfk);//预付款
            mstform.getItem("u_jdkbl").setValue(Ext.Number.from((res.record[0].jdkbl*0.01),0));//进度款比例
            mstform.getItem("u_zbj").setValue(res.record[0].zbjbl);//质保金
            mstform.getItem("u_fkfs").setValue(res.record[0].fkfs);//付款方式
            mstform.getItem("textcol_3").setValue(res.record[0].jjfs);//计价方式
            mstform.getItem("textcol_4").setValue(res.record[0].jfdw);//甲方单位
            mstform.getItem("u_jfqyxz").setValue(res.record[0].qyr);//甲方企业性质
            mstform.getItem("textcol_9").setValue(res.record[0].htlrl);//预计投标收益率
            mstform.getItem("u_yfgzrq").setValue(res.record[0].gzrq);//盖章份数
            mstform.getItem("u_gzfs").setValue(res.record[0].gzfs);//盖章份数
            mstform.getItem("u_gzrq").setValue(res.record[0].gzrq);//盖章份数

            mstform.getItem("textcol_5").setValue(res.record[0].jtfx);//风险等级集团
            mstform.getItem("textcol_6").setValue(res.record[0].ejdwfx);//风险等级二级单位
            mstform.getItem("textcol_8").setValue(res.record[0].user_yyzj);//用印主键
            //250406新增
            mstform.getItem("u_sfwlht").setValue(res.record[0].sflht);//是否联合体 
            mstform.getItem("u_gcmc").setValue(res.record[0].pc_name);//工程项目 
            BatchBindCombox([mstform.getItem('u_gcmc')]); 
            mstform.getItem("u_clms").setValue(res.record[0].userhelp_1);//承揽模式
            BatchBindCombox([mstform.getItem('u_clms')]); 
            mstform.getItem("u_htlx").setValue(res.record[0].htlx);//合同类型
            BatchBindCombox([mstform.getItem('u_htlx')]); 
            mstform.getItem("u_sf").setValue(res.record[0].province);//省份 
            BatchBindCombox([mstform.getItem('u_sf')]); 
            mstform.getItem("u_cs").setValue(res.record[0].city);//城市
            BatchBindCombox([mstform.getItem('u_cs')]);   
            mstform.getItem("u_gclb").setValue(res.record[0].xmlx);
            BatchBindCombox([mstform.getItem('u_gclb')]); 
            }
        });
  });

  /*
  if(otype == $Otype.ADD || otype == $Otype.EDIT) {
  if(mstform.getItem('u_sfbcxy').getValue() == '是' && mstform.getItem('u_sfwlht').getValue() == '是'){
        mstform.getItem('u_bcxyje').setVisible(true);
        mstform.getItem ('u_bcxyje').userSetMustInput(true);
        mstform.getItem('u_htwbje').setVisible(false);
        mstform.getItem ('u_htwbje').userSetMustInput(false);
        mstform.getItem('u_lhtssje').setVisible(true);
        mstform.getItem ('u_lhtssje').userSetMustInput(true);
        mstform.getItem('u_wfssje').setVisible(true);
        mstform.getItem ('u_wfssje').userSetMustInput(true);
    }else if(mstform.getItem('u_sfbcxy').getValue() == '是' && mstform.getItem('u_sfwlht').getValue() == '否'){
        mstform.getItem('u_bcxyje').setVisible(true);
        mstform.getItem ('u_bcxyje').userSetMustInput(true);
        mstform.getItem('u_htwbje').setVisible(false);
        mstform.getItem ('u_htwbje').userSetMustInput(false);
        mstform.getItem('u_lhtssje').setVisible(false);
        mstform.getItem ('u_lhtssje').userSetMustInput(false);
        mstform.getItem('u_wfssje').setVisible(false);
        mstform.getItem ('u_wfssje').userSetMustInput(false);
    }else if(mstform.getItem('u_sfbcxy').getValue() == '否' && mstform.getItem('u_sfwlht').getValue() == '是'){
        mstform.getItem('u_bcxyje').setVisible(false);
        mstform.getItem ('u_bcxyje').userSetMustInput(false);
        mstform.getItem('u_htwbje').setVisible(true);
        mstform.getItem ('u_htwbje').userSetMustInput(true);
        mstform.getItem('u_lhtssje').setVisible(true);
        mstform.getItem ('u_lhtssje').userSetMustInput(true);
        mstform.getItem('u_wfssje').setVisible(true);
        mstform.getItem ('u_wfssje').userSetMustInput(true);
    }else if(mstform.getItem('u_sfbcxy').getValue() == '否' && mstform.getItem('u_sfwlht').getValue() == '否'){
        mstform.getItem('u_bcxyje').setVisible(false);
        mstform.getItem ('u_bcxyje').userSetMustInput(false);
        mstform.getItem('u_htwbje').setVisible(true);
        mstform.getItem ('u_htwbje').userSetMustInput(true);
        mstform.getItem('u_lhtssje').setVisible(false);
        mstform.getItem ('u_lhtssje').userSetMustInput(false);
        mstform.getItem('u_wfssje').setVisible(false);
        mstform.getItem ('u_wfssje').userSetMustInput(false);
    }
  }
  */
  /*
  是否分劈指标：否
    1、是否补充协议：是--补充协议金额否跳2
    2、是否联合体为否的：合同文本金额/是的选择我单位实施金额
    是否分劈指标：是
    1、根据分劈指标的单位及分劈金额分别取值
 */
        
//


if (otype == $Otype.EDIT || otype == $Otype.VIEW){
    console.log(mstform.getItem('u_sfbcxy').getValue());
    console.log(mstform.getItem('u_sfwlht').getValue());
    mstform.on('dataready', function () {
    if(mstform.getItem('u_sfbcxy').getValue() == '是' && mstform.getItem('u_sfwlht').getValue() == '是'){
        mstform.getItem('u_bcxyje').setVisible(true);
        mstform.getItem ('u_bcxyje').userSetMustInput(true);
        mstform.getItem('u_htwbje').setVisible(false);
        mstform.getItem ('u_htwbje').userSetMustInput(false);
        mstform.getItem('u_lhtssje').setVisible(true);
        mstform.getItem ('u_lhtssje').userSetMustInput(true);
        mstform.getItem('u_wfssje').setVisible(true);
        mstform.getItem ('u_wfssje').userSetMustInput(true);
        console.log("5")
    }else if(mstform.getItem('u_sfbcxy').getValue() == '是' && mstform.getItem('u_sfwlht').getValue() == '否'){
        mstform.getItem('u_bcxyje').setVisible(true);
        mstform.getItem ('u_bcxyje').userSetMustInput(true);
        mstform.getItem('u_htwbje').setVisible(false);
        mstform.getItem ('u_htwbje').userSetMustInput(false);
        mstform.getItem('u_lhtssje').setVisible(false);
        mstform.getItem ('u_lhtssje').userSetMustInput(false);
        mstform.getItem('u_wfssje').setVisible(false);
        mstform.getItem ('u_wfssje').userSetMustInput(false);
        console.log("6")
    }else if(mstform.getItem('u_sfbcxy').getValue() == '否' && mstform.getItem('u_sfwlht').getValue() == '是'){
        mstform.getItem('u_bcxyje').setVisible(false);
        mstform.getItem ('u_bcxyje').userSetMustInput(false);
        mstform.getItem('u_htwbje').setVisible(true);
        mstform.getItem ('u_htwbje').userSetMustInput(true);
        mstform.getItem('u_lhtssje').setVisible(true);
        mstform.getItem ('u_lhtssje').userSetMustInput(true);
        mstform.getItem('u_wfssje').setVisible(true);
        mstform.getItem ('u_wfssje').userSetMustInput(true);
        console.log("7")
    }else if(mstform.getItem('u_sfbcxy').getValue() == '否' && mstform.getItem('u_sfwlht').getValue() == '否'){
        mstform.getItem('u_bcxyje').setVisible(false);
        mstform.getItem ('u_bcxyje').userSetMustInput(false);
        mstform.getItem('u_htwbje').setVisible(true);
        mstform.getItem ('u_htwbje').userSetMustInput(true);
        mstform.getItem('u_lhtssje').setVisible(false);
        mstform.getItem ('u_lhtssje').userSetMustInput(false);
        mstform.getItem('u_wfssje').setVisible(false);
        mstform.getItem ('u_wfssje').userSetMustInput(false);
        console.log("8")
    }
})
    console.log("EDIT/VIEW开始")
    console.log(mstform.getItem('u_sfbcxy').getValue());
    console.log(mstform.getItem('u_sfwlht').getValue());
    mstform.getItem('userhelp_1').addListener('helpselected',function(obj){
        console.log("EDIT/VIEW更新事件")
        console.log(mstform.getItem('u_sfbcxy').getValue());
        console.log(mstform.getItem('u_sfwlht').getValue())
        if(mstform.getItem('u_sfbcxy').getValue() == '是' && mstform.getItem('u_sfwlht').getValue() == '是'){
            mstform.getItem('u_bcxyje').setVisible(true);
            mstform.getItem ('u_bcxyje').userSetMustInput(true);
            mstform.getItem('u_htwbje').setVisible(false);
            mstform.getItem ('u_htwbje').userSetMustInput(false);
            mstform.getItem('u_lhtssje').setVisible(true);
            mstform.getItem ('u_lhtssje').userSetMustInput(true);
            mstform.getItem('u_wfssje').setVisible(true);
            mstform.getItem ('u_wfssje').userSetMustInput(true);
            console.log("5")
        }else if(mstform.getItem('u_sfbcxy').getValue() == '是' && mstform.getItem('u_sfwlht').getValue() == '否'){
            mstform.getItem('u_bcxyje').setVisible(true);
            mstform.getItem ('u_bcxyje').userSetMustInput(true);
            mstform.getItem('u_htwbje').setVisible(false);
            mstform.getItem ('u_htwbje').userSetMustInput(false);
            mstform.getItem('u_lhtssje').setVisible(false);
            mstform.getItem ('u_lhtssje').userSetMustInput(false);
            mstform.getItem('u_wfssje').setVisible(false);
            mstform.getItem ('u_wfssje').userSetMustInput(false);
            console.log("6")
        }else if(mstform.getItem('u_sfbcxy').getValue() == '否' && mstform.getItem('u_sfwlht').getValue() == '是'){
            mstform.getItem('u_bcxyje').setVisible(false);
            mstform.getItem ('u_bcxyje').userSetMustInput(false);
            mstform.getItem('u_htwbje').setVisible(true);
            mstform.getItem ('u_htwbje').userSetMustInput(true);
            mstform.getItem('u_lhtssje').setVisible(true);
            mstform.getItem ('u_lhtssje').userSetMustInput(true);
            mstform.getItem('u_wfssje').setVisible(true);
            mstform.getItem ('u_wfssje').userSetMustInput(true);
            console.log("7")
        }else if(mstform.getItem('u_sfbcxy').getValue() == '否' && mstform.getItem('u_sfwlht').getValue() == '否'){
            mstform.getItem('u_bcxyje').setVisible(false);
            mstform.getItem ('u_bcxyje').userSetMustInput(false);
            mstform.getItem('u_htwbje').setVisible(true);
            mstform.getItem ('u_htwbje').userSetMustInput(true);
            mstform.getItem('u_lhtssje').setVisible(false);
            mstform.getItem ('u_lhtssje').userSetMustInput(false);
            mstform.getItem('u_wfssje').setVisible(false);
            mstform.getItem ('u_wfssje').userSetMustInput(false);
            console.log("8")
        }
      })
      console.log("EDIT/VIEW结束")
}
      
if (otype == $Otype.ADD){
    console.log("ADD开始")
    mstform.getItem('u_htwbje').setVisible(false);
    mstform.getItem ('u_htwbje').userSetMustInput(false);
    mstform.getItem('u_bcxyje').setVisible(false);
    mstform.getItem ('u_bcxyje').userSetMustInput(false);
    mstform.getItem('u_lhtssje').setVisible(false);
    mstform.getItem('u_wfssje').setVisible(false);
    mstform.getItem ('u_lhtssje').userSetMustInput(false);
    mstform.getItem ('u_wfssje').userSetMustInput(false);
    mstform.getItem('userhelp_1').addListener('helpselected',function(obj){
    if(mstform.getItem('u_sfbcxy').getValue() == '是' && mstform.getItem('u_sfwlht').getValue() == '是'){
        console.log("ADD更新事件")
        mstform.getItem('u_bcxyje').setVisible(true);
        mstform.getItem ('u_bcxyje').userSetMustInput(true);
        mstform.getItem('u_htwbje').setVisible(false);
        mstform.getItem ('u_htwbje').userSetMustInput(false);
        mstform.getItem('u_lhtssje').setVisible(true);
        mstform.getItem ('u_lhtssje').userSetMustInput(true);
        mstform.getItem('u_wfssje').setVisible(true);
        mstform.getItem ('u_wfssje').userSetMustInput(true);
        console.log("1")
    }else if(mstform.getItem('u_sfbcxy').getValue() == '是' && mstform.getItem('u_sfwlht').getValue() == '否'){
        mstform.getItem('u_bcxyje').setVisible(true);
        mstform.getItem ('u_bcxyje').userSetMustInput(true);
        mstform.getItem('u_htwbje').setVisible(false);
        mstform.getItem ('u_htwbje').userSetMustInput(false);
        mstform.getItem('u_lhtssje').setVisible(false);
        mstform.getItem ('u_lhtssje').userSetMustInput(false);
        mstform.getItem('u_wfssje').setVisible(false);
        mstform.getItem ('u_wfssje').userSetMustInput(false);
        console.log("2")
    }else if(mstform.getItem('u_sfbcxy').getValue() == '否' && mstform.getItem('u_sfwlht').getValue() == '是'){
        mstform.getItem('u_bcxyje').setVisible(false);
        mstform.getItem ('u_bcxyje').userSetMustInput(false);
        mstform.getItem('u_htwbje').setVisible(true);
        mstform.getItem ('u_htwbje').userSetMustInput(true);
        mstform.getItem('u_lhtssje').setVisible(true);
        mstform.getItem ('u_lhtssje').userSetMustInput(true);
        mstform.getItem('u_wfssje').setVisible(true);
        mstform.getItem ('u_wfssje').userSetMustInput(true);
        console.log("3")
    }else if(mstform.getItem('u_sfbcxy').getValue() == '否' && mstform.getItem('u_sfwlht').getValue() == '否'){
        mstform.getItem('u_bcxyje').setVisible(false);
        mstform.getItem ('u_bcxyje').userSetMustInput(false);
        mstform.getItem('u_htwbje').setVisible(true);
        mstform.getItem ('u_htwbje').userSetMustInput(true);
        mstform.getItem('u_lhtssje').setVisible(false);
        mstform.getItem ('u_lhtssje').userSetMustInput(false);
        mstform.getItem('u_wfssje').setVisible(false);
        mstform.getItem ('u_wfssje').userSetMustInput(false);
        console.log("4")
    }
  })
  console.log("ADD结束")
}
  
  //是否联合体
  mstform.getItem('u_sfwlht').addListener('change',function(obj){
    if(mstform.getItem('u_sfwlht').getValue() == '是'){
        mstform.getItem('u_lhtssje').setVisible(true);
        mstform.getItem('u_wfssje').setVisible(true);
        mstform.getItem ('u_lhtssje').userSetMustInput(true);
        mstform.getItem ('u_wfssje').userSetMustInput(true);
    }else{
        mstform.getItem('u_lhtssje').setVisible(false);
        mstform.getItem('u_wfssje').setVisible(false);
        mstform.getItem ('u_lhtssje').userSetMustInput(false);
        mstform.getItem ('u_wfssje').userSetMustInput(false);
    }
  })
  


 
  //指标是否分劈
  mstform.getItem('u_zbsffp').addListener('change',function(obj){
    console.log("指标是否分劈")
    if(mstform.getItem('u_zbsffp').getValue() == '1'){
        //mstform.getItem ('u_sssjjg1').userSetMustInput(true);
        //mstform.getItem ('u_hte1').userSetMustInput(true);
        //mstform.getItem ('u_zbrddw2').userSetMustInput(true);
        //mstform.getItem ('u_rdje2').userSetMustInput(true);
        //mstform.getItem ('u_sssjjg2_1').userSetMustInput(true);
        //mstform.getItem ('u_fphte2_1').userSetMustInput(true);
        ///////////////////////////////////////////////////
        mstform.getItem('u_zbrddw1').setVisible(true);
        mstform.getItem('u_rdje1').setVisible(true);
        mstform.getItem('u_sssjjg1').setVisible(true);
        mstform.getItem('u_hte1').setVisible(true);
        mstform.getItem('u_sssjjg2').setVisible(true);
        mstform.getItem('u_hte2').setVisible(true);
        mstform.getItem('u_sssjjg3').setVisible(true);
        mstform.getItem('u_hte3').setVisible(true);
        mstform.getItem('u_zbrddw1').userSetMustInput(true);
        mstform.getItem('u_rdje1').userSetMustInput(true);
        mstform.getItem('u_sssjjg1').userSetMustInput(true);
        mstform.getItem('u_hte1').userSetMustInput(true);


        mstform.getItem('u_zbrddw2').setVisible(true);
        mstform.getItem('u_rdje2').setVisible(true);
        mstform.getItem('u_sssjjg2_1').setVisible(true);
        mstform.getItem('u_fphte2_1').setVisible(true);
        mstform.getItem('u_sssjjg2_2').setVisible(true);
        mstform.getItem('u_fphte2_2').setVisible(true);
        mstform.getItem('u_sssjjg2_3').setVisible(true);
        mstform.getItem('u_fphte2_3').setVisible(true);       


        mstform.getItem('u_zbrddw3').setVisible(true);
        mstform.getItem('u_rdje3').setVisible(true);
        mstform.getItem('u_sssjjg3_1').setVisible(true);
        mstform.getItem('u_fphte3_1').setVisible(true);
        mstform.getItem('u_sssjjg3_2').setVisible(true);
        mstform.getItem('u_fphte3_2').setVisible(true);
        mstform.getItem('u_sssjjg3_3').setVisible(true);
        mstform.getItem('u_fphte3_3').setVisible(true);
        /*
        mstform.getItem('u_zbrddw1').userSetMustInput(true);
        mstform.getItem('u_rdje1').userSetMustInput(true);
        mstform.getItem('u_zbrddw2').userSetMustInput(true);
        mstform.getItem('u_rdje2').userSetMustInput(true);
        mstform.getItem('u_zbrddw3').userSetMustInput(true);
        mstform.getItem('u_rdje3').userSetMustInput(true);
        */
    }else{
        //mstform.getItem ('u_sssjjg1').userSetMustInput(false);
        //mstform.getItem ('u_hte1').userSetMustInput(false);
        //mstform.getItem ('u_zbrddw2').userSetMustInput(false);
        //mstform.getItem ('u_rdje2').userSetMustInput(false);
        //mstform.getItem ('u_sssjjg2_1').userSetMustInput(false);
        //mstform.getItem ('u_fphte2_1').userSetMustInput(false);
        ////////////////////////////////////////////////////
        mstform.getItem('u_zbrddw1').setVisible(false);
        mstform.getItem('u_rdje1').setVisible(false);
        mstform.getItem('u_sssjjg1').setVisible(false);
        mstform.getItem('u_hte1').setVisible(false);
        mstform.getItem('u_sssjjg2').setVisible(false);
        mstform.getItem('u_hte2').setVisible(false);
        mstform.getItem('u_sssjjg3').setVisible(false);
        mstform.getItem('u_hte3').setVisible(false);
        mstform.getItem('u_zbrddw1').userSetMustInput(false);
        mstform.getItem('u_rdje1').userSetMustInput(false);
        mstform.getItem('u_sssjjg1').userSetMustInput(false);
        mstform.getItem('u_hte1').userSetMustInput(false);

        mstform.getItem('u_zbrddw2').setVisible(false);
        mstform.getItem('u_rdje2').setVisible(false);
        mstform.getItem('u_zbrddw3').setVisible(false);
        mstform.getItem('u_rdje3').setVisible(false);
        mstform.getItem('u_sssjjg2_1').setVisible(false);
        mstform.getItem('u_fphte2_1').setVisible(false);
        mstform.getItem('u_sssjjg2_2').setVisible(false);
        mstform.getItem('u_fphte2_2').setVisible(false);
        mstform.getItem('u_sssjjg2_3').setVisible(false);
        mstform.getItem('u_fphte2_3').setVisible(false);
        mstform.getItem('u_sssjjg3_1').setVisible(false);
        mstform.getItem('u_fphte3_1').setVisible(false);
        mstform.getItem('u_sssjjg3_2').setVisible(false);
        mstform.getItem('u_fphte3_2').setVisible(false);
        mstform.getItem('u_sssjjg3_3').setVisible(false);
        mstform.getItem('u_fphte3_3').setVisible(false);
        
        /*
        mstform.getItem('u_zbrddw1').userSetMustInput(false);
        mstform.getItem('u_rdje1').userSetMustInput(false);
        mstform.getItem('u_zbrddw2').userSetMustInput(false);
        mstform.getItem('u_rdje2').userSetMustInput(false);
        mstform.getItem('u_zbrddw3').userSetMustInput(false);
        mstform.getItem('u_rdje3').userSetMustInput(false);
        */
    }
  })
  
  /*
  mstform.getItem('user_fpdw2').addListener('change', function() {
    mstform.getItem('user_fpjg2').setValue('');
    var fpdw2 = mstform.getItem('user_fpdw2').getValue();
    var fpjg2 = mstform.getItem('user_fpjg2')                                      //帮助字段PC 赋值给pc （通用帮助可选数据据过滤示例1）
    fpjg2.on('beforetriggerclick', function (eOp,ignoreBeforeEvent) {    //帮助窗口打开前事件
        fpjg2.setOutFilter({dwzj: fpdw2})        //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
    }); 

})
  mstform.getItem('user_fpdw3').addListener('change', function() {
    mstform.getItem('user_fpjg3').setValue('');
    var fpdw3 = mstform.getItem('user_fpdw3').getValue();
    var fpjg3 = mstform.getItem('user_fpjg3')                                      //帮助字段PC 赋值给pc （通用帮助可选数据据过滤示例1）
    fpjg3.on('beforetriggerclick', function (eOp,ignoreBeforeEvent) {    //帮助窗口打开前事件
        fpjg3.setOutFilter({dwzj: fpdw3})        //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
    }); 

})
    */
    





  var dgrid = Ext.getCmp('p_form0000700463_dgrid');

   var dstore = dgrid.store;
   var arr1 = new Array();
   arr1.push({
       textcol_1: '扫描件',
     });
  
   dstore.insert(dstore.getCount(), arr1);
   //分劈确认单
   var d1grid = Ext.getCmp('p_form0000700463_d1grid');

   var d1store = d1grid.store;
   var arr2 = new Array();
   arr2.push({
       u_fpqrd: '分劈确认单',
     });
  
   d1store.insert(d1store.getCount(), arr2);
   console.log("结束")

}



/*function beforeSaveEdit() {

    var mstform = Ext.getCmp('p_form0000700463_m');
    var dgrid = Ext.getCmp('p_form0000700463_dgrid');
    var dstore = dgrid.store;

    var dgridValue = dgrid.getStore().getRange(0, dstore.getCount() - 1)
    var records = dstore.getRange();
    console.log(dgridValue);
    console.log(records.length);
    if (records.length > 1) {
        
            if (records[0].get('asr_flg') == 0 && records[0].get('textcol_1') == "合同扫描件") {
                NGMsg.Error('未上传附件，请上传附件');  
                return false
            }else{
                return true
        }
    }
}*/
