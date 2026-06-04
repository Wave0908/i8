function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700401_m');
    var dgrid = Ext.getCmp('p_form0000700401_dgrid');
    var d1grid = Ext.getCmp('p_form0000700401_d1grid');
    var d2grid = Ext.getCmp('p_form0000700401_d2grid');
    var dstore = dgrid.store;
    var d1store = d1grid.store;
    var d2store = d2grid.store;
    dstore.insert(dstore.getCount(),
    [{
        u_kx: '劳务分包'
    }, {
        u_kx: '专业分包'
    }, {
        u_kx: '材料款'
    }, {
        u_kx: '设备款'
    }, {
        u_kx: '其它'
    }]);
    d1store.insert(d1store.getCount(),
    [{
        u_zlygcjddb: '本月经营资料'
    }, {
        u_zlygcjddb: '本月技术资料'
    }]);
    d2store.insert(d2store.getCount(),
    [{
        u_glmk: '组织管理'
    },{
        u_glmk: '合同管理'
    },{
        u_glmk: '资金管理'
    },{
        u_glmk: '设计管理'
    },{
        u_glmk: '技术管理'
    },{
        u_glmk: '物资管理'
    },{
        u_glmk: '施工设备管理'
    },{
        u_glmk: '分包管理'
    },{
        u_glmk: '工期管理'
    },{
        u_glmk: '成本管理'
    },{
        u_glmk: '质量管理'
    },{
        u_glmk: '安全管理'
    },{
        u_glmk: '环境管理'
    },{
        u_glmk: '相关方联系'
    },{
        u_glmk: '信息管理'
    },{
        u_glmk: '综合事务管理'
    },{
        u_glmk: '管理评价'
    },{
        u_glmk: '其它管理'
    },]);
   mstform.getItem('pc').addListener('helpselected', function (obj) {
    
	var phid = "'"+mstform.getItem("pc").getValue()+"'";
	
	  callServer('pc_info ', [{
		  'phid': phid
	  }], function (res) {
		  if (!Ext.isEmpty(res) && res.record[0]) {
			mstform.getItem('u_htbh').setValue(res.record[0].bill_no)
			mstform.getItem("u_yhtje").setValue(res.record[0].cnt_amt);//合同额
			mstform.getItem("u_kgzsyljhte").setValue(res.record[0].cnt_amt);//合同额
			mstform.getItem("u_htkgyq").setValue(res.record[0].start_date); //合同开工日期
			mstform.getItem("u_htjgrq").setValue(res.record[0].end_date); //合同竣工日期
			mstform.getItem("u_sjkgrq").setValue(res.record[0].fact_start_dt)//实际开工日期
			mstform.getItem("u_yjjgrq").setValue(res.record[0].user_jhjgrq); //计划竣工日期
			mstform.getItem('u_qdrq').setValue(res.record[0].signdt);//签订日期
			mstform.getItem("u_htzgq").setValue(res.record[0].limit_time); //合同总工期
			//mstform.getItem("u_yjzgq").setValue((res.record[0].user_jhjgrq-res.record[0].fact_start_date)/(1*24*60*60*1000)); 
			mstform.getItem("u_yjzgq").setValue(res.record[0].working_days)//预计总工期
			mstform.getItem("u_ts").setValue(res.record[0].user_yztzrq);//业主调整日期（含签证）

			mstform.getItem("u_tzhzgq").setValue(res.record[0].tzhzgq);//调整后总工期
			mstform.getItem("u_tzhjgrq").setValue(res.record[0].tzhjgrq);//调整后竣工日期
			mstform.getItem("u_sgjzts").setValue(res.record[0].sgjzts);//施工进展天数
			mstform.getItem("u_zhtzgq").setValue(res.record[0].zhtzgq);//占合同总工期
			mstform.getItem("u_zyjzgq").setValue(res.record[0].zyjzgq);//占预计总工期
			mstform.getItem("u_ztzhzgq").setValue(res.record[0].ztzhgq);//占调整后总工期
		  }
	  });
  })


    mstform.getItem('u_htzgq').addListener('itemchanged', function () {                                                                                  
        mstform.getItem('u_tzhzgq').setValue(Ext.Number.from(mstform.getItem('u_htzgq').getValue(), 0)+Ext.Number.from(mstform.getItem('u_ts').getValue(), 0));               
       });
    mstform.getItem('u_ts').addListener('itemchanged', function () {                                                                                  
        mstform.getItem('u_tzhzgq').setValue(Ext.Number.from(mstform.getItem('u_htzgq').getValue(), 0)+Ext.Number.from(mstform.getItem('u_ts').getValue(), 0));               
       });


     mstform.getItem('u_tzhzgq').addListener('itemchanged', function () {                                                                                  
	mstform.getItem('u_ztzhzgq').setValue(Ext.Number.from(mstform.getItem('u_sgjzts').getValue(), 0)/Ext.Number.from(mstform.getItem('u_tzhzgq').getValue(), 0));               
   });
  








   



         mstform.getItem('userhelp_1').on('beforetriggerclick', function() { 

		if(mstform.getItem('pc').getValue() == '') {
			Ext.Msg.alert('提示', '请先选择项目');
			return false;
		}
		mstform.getItem('userhelp_1').setOutFilter({
			xmphid: mstform.getItem('pc').getValue()
		})
	});
       

        mstform.getItem('userhelp_1').addListener('helpselected', function (obj) {
            var pc= mstform.getItem("pc").getValue();
            var userhelp_1= mstform.getItem("userhelp_1").getValue();
  
            callServer('czwcd_yb', [{
                'phid': userhelp_1,
            }], function (res) {
                if (!Ext.isEmpty(res) && res.record[0]) {
                mstform.getItem('u_byjhcz').setValue(res.record[0].u_byjhcz)//本月计划产值
                mstform.getItem("u_bysjwccz").setValue(res.record[0].u_kdjh);//本月实际完成产值
                mstform.getItem("u_bywcl").setValue(res.record[0].u_bywcl);//本月完成率
                mstform.getItem("u_kljhcz").setValue(res.record[0].u_kljhcz); //开累计划产值
                mstform.getItem("u_klsjwccz").setValue(res.record[0].u_klsjwccz); //开累实际完成产值
                mstform.getItem("u_klwcl").setValue(res.record[0].u_klwcl)//开累完成率
                mstform.getItem("u_zncljjhcz").setValue(res.record[0].u_ncljjh); //自年初累计计划产值
                
                mstform.getItem('u_zncljsjwccz').setValue(res.record[0].u_ncsjcz);//自年初累计实际完成产值
                mstform.getItem("u_zncljwcl").setValue(res.record[0].u_ncljwcl); //年初累计完成率

                mstform.getItem("u_czwwcyy").setValue(res.record[0].textcol_1)//产值未完成原因
                
                mstform.getItem("u_xyjhcz").setValue(res.record[0].u_xyjhcz);//下月计划产值

                }
            });
      });


          mstform.getItem('userhelp_2').on('beforetriggerclick', function() { 

		if(mstform.getItem('pc').getValue() == '') {
			Ext.Msg.alert('提示', '请先选择项目');
			return false;
		}
		mstform.getItem('userhelp_2').setOutFilter({
			xmphid: mstform.getItem('pc').getValue()
		})
	});

        mstform.getItem('userhelp_2').addListener('helpselected', function (obj) {
           var pc= mstform.getItem("pc").getValue();
           var userhelp_2= mstform.getItem("userhelp_2").getValue();

           callServer('yg_yb', [{
                'phid': userhelp_2,
               }], function (res) {
                  if (!Ext.isEmpty(res) && res.record[0]) {
                  mstform.getItem('u_byyqrnmggzrs').setValue(res.record[0].yqrnmg)//本月应确认农民工工资人数
                  mstform.getItem("u_zkgljyqrnmggzrs").setValue(res.record[0].kglj);//自开工累计应确认农民工工资人数
                  mstform.getItem("u_byyiqrnmggzrs").setValue(res.record[0].yiqrnmg);//本月已确认农民工工资人数
                  mstform.getItem("u_zkgljyirqnmggzrs").setValue(res.record[0].kgljyi); //自开工累计已确认农民工工资人数
                  mstform.getItem("u_bynmygzyfse").setValue(res.record[0].u_salary_sum); //本月农民工工资应发数额
                  mstform.getItem("u_zkgljnmggzyfse").setValue(res.record[0].u_zkgljnmg)//自开工累计农民工工资应发数额
                  mstform.getItem("u_bynmggzsfse").setValue(res.record[0].u_bynmggzsf,); //本月农民工工资实发数额
                
                  mstform.getItem('u_zkgljnmggzsfse').setValue(res.record[0].numericcol_1);//自开工累计农民工工资实发数额


                }
            });
      });

    





}