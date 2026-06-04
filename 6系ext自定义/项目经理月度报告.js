function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700401_m');
    var dgrid = Ext.getCmp('p_form0000700401_d');
    var d1grid = Ext.getCmp('p_form0000700401_d1');
    var d2grid = Ext.getCmp('p_form0000700401_d2');
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
        }, {
            u_glmk: '合同管理'
        }, {
            u_glmk: '资金管理'
        }, {
            u_glmk: '设计管理'
        }, {
            u_glmk: '技术管理'
        }, {
            u_glmk: '物资管理'
        }, {
            u_glmk: '施工设备管理'
        }, {
            u_glmk: '分包管理'
        }, {
            u_glmk: '工期管理'
        }, {
            u_glmk: '成本管理'
        }, {
            u_glmk: '质量管理'
        }, {
            u_glmk: '安全管理'
        }, {
            u_glmk: '环境管理'
        }, {
            u_glmk: '相关方联系'
        }, {
            u_glmk: '信息管理'
        }, {
            u_glmk: '综合事务管理'
        }, {
            u_glmk: '管理评价'
        }, {
            u_glmk: '其它管理'
        },]);
    mstform.getItem('phid_pc').addListener('helpselected', function (obj) {

        var phid = mstform.getItem("phid_pc").getValue();

        execServer('p_form0000700401_pc_info', {
            'phid': phid
        }, function (res) {
            const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            if (res.count>0) {
                mstform.getItem('u_htbh').setValue(data1[0].extendObjects.bill_no)
                mstform.getItem("u_yhtje").setValue(data1[0].extendObjects.cnt_amt);//合同额
                mstform.getItem("u_kgzsyljhte").setValue(data1[0].extendObjects.cnt_amt);//合同额
                mstform.getItem("u_htkgyq").setValue(data1[0].extendObjects.start_date); //合同开工日期
                mstform.getItem("u_htjgrq").setValue(data1[0].extendObjects.end_date); //合同竣工日期
                mstform.getItem("u_sjkgrq").setValue(data1[0].extendObjects.fact_start_dt)//实际开工日期
                mstform.getItem("u_yjjgrq").setValue(data1[0].extendObjects.user_jhjgrq); //计划竣工日期
                mstform.getItem('u_qdrq').setValue(data1[0].extendObjects.signdt);//签订日期
                mstform.getItem("u_htzgq").setValue(data1[0].extendObjects.limit_time); //合同总工期
                //mstform.getItem("u_yjzgq").setValue((res.record[0].user_jhjgrq-res.record[0].fact_start_date)/(1*24*60*60*1000)); 
                mstform.getItem("u_yjzgq").setValue(data1[0].extendObjects.working_days)//预计总工期
                mstform.getItem("u_ts").setValue(data1[0].extendObjects.user_yztzrq);//业主调整日期（含签证）

                mstform.getItem("u_tzhzgq").setValue(data1[0].extendObjects.tzhzgq);//调整后总工期
                mstform.getItem("u_tzhjgrq").setValue(data1[0].extendObjects.tzhjgrq);//调整后竣工日期
                mstform.getItem("u_sgjzts").setValue(data1[0].extendObjects.sgjzts);//施工进展天数
                mstform.getItem("u_zhtzgq").setValue(data1[0].extendObjects.zhtzgq);//占合同总工期
                mstform.getItem("u_zyjzgq").setValue(data1[0].extendObjects.zyjzgq);//占预计总工期
                mstform.getItem("u_ztzhzgq").setValue(data1[0].extendObjects.ztzhgq);//占调整后总工期
            }
        });
    })


    mstform.getItem('u_htzgq').addListener('itemchanged', function () {
        mstform.getItem('u_tzhzgq').setValue(Ext.Number.from(mstform.getItem('u_htzgq').getValue(), 0) + Ext.Number.from(mstform.getItem('u_ts').getValue(), 0));
    });
    mstform.getItem('u_ts').addListener('itemchanged', function () {
        mstform.getItem('u_tzhzgq').setValue(Ext.Number.from(mstform.getItem('u_htzgq').getValue(), 0) + Ext.Number.from(mstform.getItem('u_ts').getValue(), 0));
    });


    mstform.getItem('u_tzhzgq').addListener('itemchanged', function () {
        mstform.getItem('u_ztzhzgq').setValue(Ext.Number.from(mstform.getItem('u_sgjzts').getValue(), 0) / Ext.Number.from(mstform.getItem('u_tzhzgq').getValue(), 0));
    });

    mstform.getItem('userhelp_1').on('beforetriggerclick', function () {

        if (mstform.getItem('phid_pc').getValue() == ''|| mstform.getItem('phid_pc').getValue() == null) {
            Ext.Msg.alert('提示', '请先选择项目');
            return false;
        }
        mstform.getItem('userhelp_1').setOutFilter({
            xmphid: mstform.getItem('phid_pc').getValue()
        })
    });


    mstform.getItem('userhelp_1').addListener('helpselected', function (obj) {
        //var pc = mstform.getItem("pc").getValue();
        var userhelp_1 = mstform.getItem("userhelp_1").getValue();

        execServer('p_form0000700401_czwcd_yb', {
            'phid': userhelp_1,
        }, function (res) {
            if (res.count>0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                mstform.getItem('u_byjhcz').setValue(data1[0].extendObjects.u_byjhcz)//本月计划产值
                mstform.getItem("u_bysjwccz").setValue(data1[0].extendObjects.u_kdjh);//本月实际完成产值
                mstform.getItem("u_bywcl").setValue(data1[0].extendObjects.u_bywcl);//本月完成率
                mstform.getItem("u_kljhcz").setValue(data1[0].extendObjects.u_kljhcz); //开累计划产值
                mstform.getItem("u_klsjwccz").setValue(data1[0].extendObjects.u_klsjwccz); //开累实际完成产值
                mstform.getItem("u_klwcl").setValue(data1[0].extendObjects.u_klwcl)//开累完成率
                mstform.getItem("u_zncljjhcz").setValue(data1[0].extendObjects.u_ncljjh); //自年初累计计划产值

                mstform.getItem('u_zncljsjwccz').setValue(data1[0].extendObjects.u_ncsjcz);//自年初累计实际完成产值
                mstform.getItem("u_zncljwcl").setValue(data1[0].extendObjects.u_ncljwcl); //年初累计完成率

                mstform.getItem("u_czwwcyy").setValue(data1[0].extendObjects.textcol_1)//产值未完成原因

                mstform.getItem("u_xyjhcz").setValue(data1[0].extendObjects.u_xyjhcz);//下月计划产值

            }
        });
    });


    mstform.getItem('userhelp_2').on('beforetriggerclick', function () {
        console.log("mstform.getItem('phid_pc').getValue():",mstform.getItem('phid_pc').getValue());
        if (mstform.getItem('phid_pc').getValue() == '' || mstform.getItem('phid_pc').getValue() == null) {
            Ext.Msg.alert('提示', '请先选择项目');
            return false;
        }
        mstform.getItem('userhelp_2').setOutFilter({
            xmphid: mstform.getItem('phid_pc').getValue()
        })
    });

    mstform.getItem('userhelp_2').addListener('helpselected', function (obj) {
        //var pc = mstform.getItem("phid_pc").getValue();
        var userhelp_2 = mstform.getItem("userhelp_2").getValue();
        execServer('p_form0000700401_yg_yb', {
            'phid': userhelp_2,
        }, function (res) {
            if (res.count>0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                mstform.getItem('u_byyqrnmggzrs').setValue(data1[0].extendObjects.yqrnmg)//本月应确认农民工工资人数
                mstform.getItem("u_zkgljyqrnmggzrs").setValue(data1[0].extendObjects.kglj);//自开工累计应确认农民工工资人数
                mstform.getItem("u_byyiqrnmggzrs").setValue(data1[0].extendObjects.yiqrnmg);//本月已确认农民工工资人数
                mstform.getItem("u_zkgljyirqnmggzrs").setValue(data1[0].extendObjects.kgljyi); //自开工累计已确认农民工工资人数
                mstform.getItem("u_bynmygzyfse").setValue(data1[0].extendObjects.u_salary_sum); //本月农民工工资应发数额
                mstform.getItem("u_zkgljnmggzyfse").setValue(data1[0].extendObjects.u_zkgljnmg);//自开工累计农民工工资应发数额
                mstform.getItem("u_bynmggzsfse").setValue(data1[0].extendObjects.u_bynmggzsf);//本月农民工工资实发数额

                mstform.getItem('u_zkgljnmggzsfse').setValue(data1[0].extendObjects.numericcol_1);//自开工累计农民工工资实发数额


            }
        });
    });
}
/**
 * 项目经理月度报告视图
 * CREATE OR REPLACE VIEW project_monthly_report_view AS
SELECT 
    pt.bill_no AS bill_no, 
    pt.phid as phid, 
    pc, 
    TO_CHAR(pcm.signdt, 'YYYY-MM-DD') AS signdt, 
    cnt_amt, 
    TO_CHAR(start_date, 'YYYY-MM-DD') AS start_date, 
    TO_CHAR(end_date, 'YYYY-MM-DD') AS end_date, 
    limit_time, 
    TO_CHAR(fact_start_dt, 'YYYY-MM-DD') AS fact_start_dt, 
    TO_CHAR(user_jhjgrq, 'YYYY-MM-DD') AS user_jhjgrq, 
    (user_jhjgrq::DATE - fact_start_dt::DATE) AS working_days, 
    user_yztzrq, 
    (CAST(limit_time AS INTEGER) + COALESCE(CAST(user_yztzrq AS INTEGER), 0)) AS tzhzgq, 
    TO_CHAR(fact_start_dt::DATE + 
           (CAST(limit_time AS INTEGER) + COALESCE(CAST(user_yztzrq AS INTEGER), 0)) * INTERVAL '1 day', 
           'YYYY-MM-DD') AS tzhjgrq, 
    (DATE_TRUNC('MONTH', CURRENT_DATE) + INTERVAL '1 MONTH - 6 DAY')::DATE - fact_start_dt::DATE AS sgjzts, 
    CASE 
      WHEN CAST(limit_time AS INTEGER) = 0 THEN NULL 
      ELSE ROUND( 
        ((DATE_TRUNC('MONTH', CURRENT_DATE) + INTERVAL '1 MONTH - 6 DAY')::DATE - fact_start_dt::DATE)::DECIMAL(18, 4) / 
        CAST(limit_time AS DECIMAL(18, 4)), 
        4) 
    END AS zhtzgq, 
    CASE 
      WHEN (user_jhjgrq::DATE - fact_start_dt::DATE) = 0 THEN NULL 
      ELSE ROUND( 
        ((DATE_TRUNC('MONTH', CURRENT_DATE) + INTERVAL '1 MONTH - 6 DAY')::DATE - fact_start_dt::DATE)::DECIMAL(18, 4) / 
        (user_jhjgrq::DATE - fact_start_dt::DATE)::DECIMAL(18, 4), 
        4) 
    END AS zyjzgq, 
    CASE 
      WHEN (CAST(limit_time AS INTEGER) + COALESCE(CAST(user_yztzrq AS INTEGER), 0)) = 0 THEN NULL 
      ELSE ROUND( 
        ((DATE_TRUNC('MONTH', CURRENT_DATE) + INTERVAL '1 MONTH - 6 DAY')::DATE - fact_start_dt::DATE)::DECIMAL(18, 4) / 
        CAST((CAST(limit_time AS INTEGER) + COALESCE(CAST(user_yztzrq AS INTEGER), 0)) AS DECIMAL(18, 4)), 
        4) 
    END AS ztzhgq 
FROM 
    project_table pt 
    LEFT JOIN pcm3_cnt_m pcm ON pcm.phid_pc = pt.phid 
    AND pcm.app_status = '1' 
    AND pcm.user_sfsczy IS NULL 
    AND cnt_type = '5' 
WHERE 
    pt.bill_flg = '1' 
    AND pt.app_status = '1' 
    AND pt.virtual_flg = '4'
 */