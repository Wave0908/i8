function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000600061_m');
    var dgrid = Ext.getCmp('p_form0000600061_d');
    var dstore = dgrid.store;
    var d1grid = Ext.getCmp('p_form0000600061_d1');
    var d1store = d1grid.store;
    var d2grid = Ext.getCmp('p_form0000600061_d2');
    var d2store = d2grid.store;
    var d3grid = Ext.getCmp('p_form0000600061_d3');
    var d3store = d3grid.store;
    var d4grid = Ext.getCmp('p_form0000600061_d4');
    var d4store = d4grid.store;
    var d5grid = Ext.getCmp('p_form0000600061_d5');
    var d5store = d5grid.store;
    var d6grid = Ext.getCmp('p_form0000600061_d6');
    var d6store = d6grid.store;
    //新增时显示的字段
    //Shared();

    //禁用增行删行，开始插入一行。
    if (otype == $Otype.ADD) {
        dstore.insert(0, {
            u_sndgdpze: null
        });
        d1store.insert(0, {
            org_id: null
        });
        d2store.insert(0, {
            u_tzze: null
        });
        d3store.insert(0, {
            u_zczb: null
        });
        d4store.insert(0, {
            u_zbfs: null
        });
        d6store.insert(0, {
            u_wtfkxmjkywt: null
        });
    }

    /*工程编码自动生成js start*/
    var todayDate = new Date();
    var year = todayDate.getFullYear();
    var date = todayDate.getDate();
    var month = todayDate.getMonth() + 1;
    var hour = todayDate.getHours();
    var mininutes = todayDate.getMinutes();
    var seconds = todayDate.getSeconds();

    //隐藏不涉及字段
    // mstform.getItem('u_sfycylyxsybdwxf').setVisible(false);
    //  mstform.getItem('zffptgs').setVisible(false);
    // mstform.getItem('userhelp_char').setVisible(false);
    // mstform.getItem('shch').setVisible(false);
    // mstform.getItem('shqx').setVisible(false);
    //  mstform.getItem('zfssjg').setVisible(false);
    //  mstform.getItem('gqjg').setVisible(false);
    //  mstform.getItem('sqqy').setVisible(false);
    //  mstform.getItem('sqqywbpj').setVisible(false);
    // mstform.getItem('zfjg').setVisible(false);
    // mstform.getItem('xypj').setVisible(false);
    // mstform.getItem('u_xxzycdfl').setVisible(false);
    // mstform.getItem('u_xxzycdfl').setVisible(false);
    // mstform.getItem('u_zbgl').setVisible(false);
    // mstform.getItem('u_xxzyfcfjbz').setVisible(false);
    // mstform.getItem('cwzk').setVisible(false);
    // mstform.getItem('pjsj').setVisible(false);
    // mstform.getItem('wbpjjg').setVisible(false);
    // mstform.getItem('dbgsmc').setVisible(false);
    // mstform.getItem('dbgswbpj').setVisible(false);
    // mstform.getItem('xsnr').setVisible(false);
    // mstform.getItem('sjdw').setVisible(false);
    // mstform.getItem('jsfs').setVisible(false);
    // mstform.getItem('jsdw').setVisible(false);
    // mstform.getItem('wbpj').setVisible(false);
    // mstform.getItem('tzgs').setVisible(false);
    // mstform.getItem('ztzgs').setVisible(false);
    // mstform.getItem('amt').setVisible(false);
    // mstform.getItem('zdcjfyzb').setVisible(false);
    // mstform.getItem('gcfy').setVisible(false);
    // mstform.getItem('gcfyzb').setVisible(false);
    // mstform.getItem('gcqtfy').setVisible(false);
    // mstform.getItem('gcqtfyzb').setVisible(false);
    // mstform.getItem('gcybfy').setVisible(false);
    // mstform.getItem('gcybfyzb').setVisible(false);
    // mstform.getItem('ldzj').setVisible(false);
    // mstform.getItem('ldzjzb').setVisible(false);
    // mstform.getItem('jsqlx').setVisible(false);
    // mstform.getItem('jsqlxzb').setVisible(false);
    // mstform.getItem('xmzjbl').setVisible(false);
    // mstform.getItem('xmgszczbj').setVisible(false);
    // mstform.getItem('zbj').setVisible(false);
    // mstform.getItem('zbjbl').setVisible(false);
    // mstform.getItem('ppprk').setVisible(false);
    // mstform.getItem('sflhtzb').setVisible(false);
    // mstform.getItem('lhtcyf').setVisible(false);
    // mstform.getItem('hbjz').setVisible(false);
    // mstform.getItem('lpyn').setVisible(false);
    // mstform.getItem('mqxmjz').setVisible(false);
    // mstform.getItem('lhtqk').setVisible(false);
    // mstform.getItem('xzjb').setVisible(false);
    // mstform.getItem('hkfs').setVisible(false);
    // mstform.getItem('jaxfb').setVisible(false);
    // mstform.getItem('hzqx').setVisible(false);
    // mstform.getItem('fffs').setVisible(false);
    // mstform.getItem('hllrl').setVisible(false);
    // mstform.getItem('zxl').setVisible(false);
    // mstform.getItem('tzhbl').setVisible(false);
    // mstform.getItem('jjyjjxfb').setVisible(false);
    // mstform.getItem('yjjalrl').setVisible(false);
    // mstform.getItem('jsqsfjx').setVisible(false);
    // mstform.getItem('jxbl').setVisible(false);
    // mstform.getItem('zbjsylsq').setVisible(false);
    // mstform.getItem('zbjsylsh').setVisible(false);
    // mstform.getItem('cwjxzsq').setVisible(false);
    // mstform.getItem('cwjxzsh').setVisible(false);
    // mstform.getItem('jcbz').setVisible(false);
    // mstform.getItem('zxbz').setVisible(false);
    // mstform.getItem('sglrl').setVisible(false);
    // mstform.getItem('tbyq').setVisible(false);
    // mstform.getItem('jjzb').setVisible(false);
    // mstform.getItem('yzfs').setVisible(false);
    // mstform.getItem('bzjjbhqk').setVisible(false);
    // mstform.getItem('xmyyqk').setVisible(false);
    // mstform.getItem('kyxffqk').setVisible(false);
    // mstform.getItem('gszlqk').setVisible(false);
    // mstform.getItem('khqk').setVisible(false);
    // mstform.getItem('zbwjyq').setVisible(false);
    // mstform.getItem('qttsyq').setVisible(false);
    // mstform.getItem('ssbxmyqd').setVisible(false);
    // mstform.getItem('tbbz').setVisible(false);
    // mstform.getItem('hkly').setVisible(false);
    // mstform.getItem('bzcs').setVisible(false);
    // mstform.getItem('qyqkjj').setVisible(false);
    // mstform.getItem('amt_3').setVisible(false);
    // mstform.getItem('amt_4').setVisible(false);
    // d2grid.hideColumn('u_lxrdh', true);
    // d2grid.hideColumn('u_yzwtr', true);
    // d2grid.hideColumn('u_lxrzw', true);
    // d2grid.hideColumn('u_khssfw', true);
    // d2grid.hideColumn('u_clsj', true);
    // d3grid.hideColumn('u_zbjbl', true);
    // d4grid.hideColumn('u_tbzt', true);
    // d4grid.hideColumn('u_syzz', true);
    // d4grid.hideColumn('u_yjgchte', true);
    // d4grid.hideColumn('u_ztbnr', true);

    //隐藏不涉及字段

    mstform.getItem('gcbh').setValue('TRZXMGZ-' + year + month + date + '-' + hour + mininutes + seconds);

    // dgrid.hideColumn('prc', true);
    // dgrid.hideColumn('amt', true);
    // dgrid.hideColumn('qty', true);

    // d1grid.hideColumn('prc', true);
    // d1grid.hideColumn('amt', true);
    // d1grid.hideColumn('qty', true);

    // d2grid.hideColumn('prc', true);
    // d2grid.hideColumn('amt', true);
    // d2grid.hideColumn('qty', true);

    // d3grid.hideColumn('prc', true);
    // d3grid.hideColumn('amt', true);
    // d3grid.hideColumn('qty', true);

    // d4grid.hideColumn('prc', true);
    // d4grid.hideColumn('amt', true);
    // d4grid.hideColumn('qty', true);

    // d5grid.hideColumn('prc', true);
    // d5grid.hideColumn('amt', true);
    // d5grid.hideColumn('qty', true);

    // d6grid.hideColumn('prc', true);
    // d6grid.hideColumn('amt', true);
    // d6grid.hideColumn('qty', true);
    d5store.insert(d5store.getCount(),
        [{
            u_khjcl: '决策者',
        }, {
            u_khjcl: '决策者'
        }, {
            u_khjcl: '把关者'
        }, {
            u_khjcl: '把关者'
        }, {
            u_khjcl: '影响者'
        }, {
            u_khjcl: '影响者'
        }]);

    /*工程编码自动生成js end*/



    /*项目类型不同值的时候不同状态start
    mstform.getItem('xmlx').addListener('change', function() {
        //项目类型改变后为只读状态
        mstform.getItem('xmlx').userSetReadOnly(true);
        var xmlx = mstform.getItem('xmlx').getValue();
        //ppp模式的
        if(xmlx == '1') {
            Financial(xmlx);
            ownPeriodReturn(xmlx);
            PPP();
            PPPMustInput();
            Zb(xmlx);
            return;
        } else if(xmlx == '2') {
            Financial(xmlx);
            ownPeriodReturn(xmlx);
            FEPC();
            FEPCMustInput();
            Zb(xmlx);
            return;
        } else if(xmlx == '3') {
            Financial(xmlx);
            ownPeriodReturn(xmlx);
            ABO();
            ABOMustInput();
            Zb(xmlx);
            return;
        };
    });
    项目类型不同值的时候不同状态end*/


    /*
    //回报方式选择不同值的时候的不同状况start
    mstform.getItem('fffs').addListener('change', function() {
        var fffs = mstform.getItem('fffs').getValue();
        if(fffs == '1') {
            //合理利润率
            mstform.getItem('hllrl').setVisible(true);
            //折现率
            mstform.getItem('zxl').setVisible(true);
            //投资回报率
            mstform.getItem('tzhbl').setVisible(false);
            return;
        } else if(fffs == '2') {
            //合理利润率
            mstform.getItem('hllrl').setVisible(false);
            //折现率
            mstform.getItem('zxl').setVisible(false);
            //投资回报率
            mstform.getItem('tzhbl').setVisible(true);
            return;
        } else if(fffs == '3') {
            //合理利润率
            mstform.getItem('hllrl').setVisible(false);
            //折现率
            mstform.getItem('zxl').setVisible(false);
            //投资回报率
            mstform.getItem('tzhbl').setVisible(true);
            return;
        };

    });
    //回报方式选择不同值的时候的不同状况end
    //是否联合体中标不同值的时候不同状态start
    mstform.getItem('sflhtzb').addListener('change', function() {
        var sflhtzb = mstform.getItem('sflhtzb').getValue();
        if(sflhtzb == '1') {
            //联合体成员方
            mstform.getItem('lhtcyf').setVisible(true);
            return;
        } else if(sflhtzb == '2') {
            //联合体成员方
            mstform.getItem('lhtcyf').setVisible(false);
            return;
        };

    });
    //是否联合体中标不同值的时候不同状态end
*/
    //建设期是否计息不同值的时候不同状态start
    mstform.getItem('jsqsfjx').addListener('change', function () {
        var jsqsfjx = mstform.getItem('jsqsfjx').getValue();
        if (jsqsfjx == '1') {
            //计息比例
            mstform.getItem('jxbl').setVisible(true);
            return;
        } else if (jsqsfjx == '2') {
            //计息比例
            mstform.getItem('jxbl').setVisible(false);
            return;
        };

    });
    //建设期是否计息不同值的时候不同状态end


    //省市县的三级联动start
    //根据省份过滤城市
    mstform.getItem('shch').on('beforetriggerclick', function () {
        mstform.getItem('shqx').setValue();
        if (mstform.getItem('userhelp_char').getValue() == '' || mstform.getItem('userhelp_char').getValue() == null) {
            Ext.Msg.alert('提示', '请先选择省份');
            return false;
        }
        mstform.getItem('shch').setOutFilter({
            pid: mstform.getItem('userhelp_char').getValue()
        })
    });
    //根据城市过滤区县
    mstform.getItem('shqx').on('beforetriggerclick', function () {
        if (mstform.getItem('shch').getValue() == '' || mstform.getItem('shch').getValue() == null) {
            Ext.Msg.alert('提示', '请先选择城市');
            return false;
        }
        mstform.getItem('shqx').setOutFilter({
            pid: mstform.getItem('shch').getValue()
        })
    });

    //省市县的三级联动end

    //根据负责人显示出联系方式start
    mstform.getItem('u_xmlxr').addListener('helpselected', function () {
        var id = mstform.getItem('u_xmlxr').getValue();
        execServer('p_form0000600061_hr', {
            'id': id
        }, function (res) {
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            if (res.count > 0)
                if (data.length != 0) {
                    mstform.getItem('lxfs').setValue(data[0].extendObjects.mobile1);
                } else {
                    Ext.Msg.alert('提示', '负责人没有使用人的联系电话请输入');
                    return false;
                }
        });
    });
    //根据负责人显示出联系方式end

    //根据中标概率生成信息重要程度等级
    mstform.getItem('u_zbgl').addListener('itemchanged', function () {
        var aa = mstform.getItem('u_zbgl').getValue();
        if (aa >= 0.9) {
            mstform.getItem('u_xxzycdfl').setValue('1');
        } else if (aa < 0.9 && aa >= 0.8) {
            mstform.getItem('u_xxzycdfl').setValue('2');
        } else if (aa < 0.8 && aa >= 0.5) {
            mstform.getItem('u_xxzycdfl').setValue('3');
        } else {
            mstform.getItem('u_xxzycdfl').setValue('4');
        }
    })
    //根据中标概率生成信息重要程度等级

    //给财政状况添加默认值start
    function Financial(xmlx) {
        //PPP模式
        if (xmlx == '1') {
            mstform.getItem('cwzk').setValue("1,20XX度一般公共预算收入()亿元;" + "\n" + "2,20XX年一般公共预算支出()亿元;" + "\n" + "3,GDP:()亿元  人口:();" + "\n" + "4,未来发展预判();");

            //E(融资)+EPC
        } else if (xmlx == '2') {

            mstform.getItem('cwzk').setValue("1,上年度GDP总额()亿元;" + "\n" + "2,一般公共预算收入()亿元;" + "\n" + "2,一般公共预算支出()亿元;" + "\n" + "4,人口();" + "\n" + "5,政府债务情况();" + "\n" + "6,是否百强县(是或否);");
            //ABO模式		
        } else if (xmlx == '3') {
            mstform.getItem('cwzk').setValue("1,20XX度一般公共预算收入()亿元;" + "\n" + "2,20XX年一般公共预算支出()亿元;" + "\n" + "3,GDP:()亿元" + "\n" + "4,人口();");
        }
    }
    //给财政状况添加默认值end
    //给股权结构,合作期限,回报 ,区域情况简介 添加默认值start
    function ownPeriodReturn(xmlx) {
        if (xmlx == '1') {

        } else if (xmlx == '2') {
            //股权结构
            mstform.getItem('gqjg').setValue("1,政府是否出资(是或否);" + "\n" + "2,出资比例 ()%;");
            //合作期限
            mstform.getItem('hzqx').setValue("1,建设期为()年;" + "\n" + "2,回购期为()年;" + "\n" + "3,每年回购比例();");
            //回报
            mstform.getItem('hb').setValue("1,资金缺口();" + "\n" + "2,回报利率();");

        } else if (xmlx == '3') {
            //股权结构
            mstform.getItem('gqjg').setValue("1,政府出资比例()%;" + "\n" + "2,社会资本出资比例 ()%;" + "\n" + "3,我方出资比例 ()%;");
            //区域情况简介
            mstform.getItem('qyqkjj').setValue("1,项目所在地周边土地价格()万元/亩;" + "\n" + "2,人口 ()万人;" + "\n" + "3,百强房企入住情况();" + "\n" + "4,未来发展规划();" + "\n" + "5,预测未来发展潜力();" + "\n" + "6,地理位置();");
        }
    }
    //给股权结构,合作期限,回报 ,区域情况简介 添加默认值end

    /*
    //投融资项目跟踪未选择项目类型时start
    function Shared() {
        ZbD();
        //金额设置为不显示
        mstform.getItem('amt_3').setVisible(false);
        //金额设置为不显示
        mstform.getItem('amt_4').setVisible(false);
        //工程编号为只读
        mstform.getItem('gcbh').userSetReadOnly(true);
        //所属单位设置为只读
        mstform.getItem('ocode').userSetReadOnly(true);
        //项目名称设为必输
        mstform.getItem('xmmc').userSetMustInput(true);
        //项目类型设为必输
        mstform.getItem('xmlx').userSetMustInput(true);
        //政府方平台公司设置为不显示
        mstform.getItem('zffptgs').setVisible(false);
        //负责人设置为显示
        mstform.getItem('empid').setVisible(true);
        //联系方式设置为不显示
        mstform.getItem('lxfs').setVisible(false);
        //所属省份设置为不显示
        mstform.getItem('userhelp_char').setVisible(false);
        //所属城市设置为不显示
        mstform.getItem('shch').setVisible(false);
        //所属区县设置为不显示
        mstform.getItem('shqx').setVisible(false);
        //政府实施机构设置为不显示
        mstform.getItem('zfssjg').setVisible(false);
        //授权企业设置为不显示
        mstform.getItem('sqqy').setVisible(false);
        //授权企业外部评级设置为不显示
        mstform.getItem('sqqywbpj').setVisible(false);
        //政府机构设置为不显示
        mstform.getItem('zfjg').setVisible(false);
        //财务状况设置为显示
        mstform.getItem('cwzk').setVisible(true);
        //信用评级设置为不显示
        mstform.getItem('xypj').setVisible(false);
        //建设单位设置为不显示
        mstform.getItem('jsdw').setVisible(false);
        //建设单位外部评级
        mstform.getItem('wbpj').setVisible(false);
        //评级时间设置为不显示
        mstform.getItem('pjsj').setVisible(false);
        //外部评级机构设置为不显示
        mstform.getItem('wbpjjg').setVisible(false);
        //担保公司名称设置为不显示
        mstform.getItem('dbgsmc').setVisible(false);
        //担保公司外部评价设置为不显示
        mstform.getItem('dbgswbpj').setVisible(false);
        //设计单位设置为不显示
        mstform.getItem('sjdw').setVisible(false);
        //结算方式设置为不显示
        mstform.getItem('jsfs').setVisible(false);
        //建设内容设置为显示
        mstform.getItem('xsnr').setVisible(true);
        //投资估算设置为不显示
        mstform.getItem('tzgs').setVisible(false);
        //总投资概算设置为不显示
        mstform.getItem('ztzgs').setVisible(false);
        //征地拆迁费用设置为显示
        mstform.getItem('amt').setVisible(true);
        //征地拆迁费用占比设置为显示
        mstform.getItem('zdcjfyzb').setVisible(true);
        //工程费用设置为显示
        mstform.getItem('gcfy').setVisible(true);
        //工程费用占比设置为显示
        mstform.getItem('gcfyzb').setVisible(true);
        //工程其他费用设置为显示
        mstform.getItem('gcqtfy').setVisible(true);
        //工程其他费用占比设置为显示
        mstform.getItem('gcqtfyzb').setVisible(true);
        //工程预备费用设置为显示
        mstform.getItem('gcybfy').setVisible(true);
        //工程预备费用占比设置为显示
        mstform.getItem('gcybfyzb').setVisible(true);
        //流动资金设置为不显示
        mstform.getItem('ldzj').setVisible(false);
        //流动资金占比设置为不显示
        mstform.getItem('ldzjzb').setVisible(false);
        //建设期利息设置为显示
        mstform.getItem('jsqlx').setVisible(true);
        //建设期利息占比设置为显示
        mstform.getItem('jsqlxzb').setVisible(true);
        //项目资金比例设置为不显示
        mstform.getItem('xmzjbl').setVisible(false);
        //项目公司注册资本金为不显示
        mstform.getItem('xmgszczbj').setVisible(false);
        //资本金为不显示
        mstform.getItem('zbj').setVisible(false);
        //资本金比例为不显示
        mstform.getItem('zbjbl').setVisible(false);
        //股权结构设置为显示
        mstform.getItem('gqjg').setVisible(true);
        //PPP入库设置为不显示
        mstform.getItem('ppprk').setVisible(false);
        //是否联合体中标设置为不显示
        mstform.getItem('sflhtzb').setVisible(false);
        //联合体成员方设置为不显示
        mstform.getItem('lhtcyf').setVisible(false);
        //回报机制设置为不显示
        mstform.getItem('hbjz').setVisible(false);
        //两评一案设置为不显示
        mstform.getItem('lpyn').setVisible(false);
        //回报设置为不显示
        mstform.getItem('hb').setVisible(false);
        //目前项目进展设置为不显示
        mstform.getItem('mqxmjz').setVisible(false);
        //联合体情况设置为不显示
        mstform.getItem('lhtqk').setVisible(false);
        //行政级别设置为显示
        mstform.getItem('xzjb').setVisible(true);
        //合作期限设置为显示
        mstform.getItem('hzqx').setVisible(true);
        //还款方式设置为不显示
        mstform.getItem('hkfs').setVisible(false);
        //建安下浮比设置为不显示
        mstform.getItem('jaxfb').setVisible(false);
        //回报方式设置为不显示
        mstform.getItem('fffs').setVisible(false);
        //合理利润率设置为不显示
        mstform.getItem('hllrl').setVisible(false);
        //折现率设置为不显示
        mstform.getItem('zxl').setVisible(false);
        //投资回报率设置为不显示
        mstform.getItem('tzhbl').setVisible(false);
        //施工利润率设置为不显示
        mstform.getItem('sglrl').setVisible(false);
        //计价依据及下浮比设置为不显示
        mstform.getItem('jjyjjxfb').setVisible(false);
        //预计建安利润率设置为显示
        mstform.getItem('yjjalrl').setVisible(true);
        //建设期是否计息设置为不显示
        mstform.getItem('jsqsfjx').setVisible(false);
        //计息比例设置为不显示
        mstform.getItem('jxbl').setVisible(false);
        //资本金收益率税前设置为不显示
        mstform.getItem('zbjsylsq').setVisible(false);
        //资本金收益率税后设置为不显示
        mstform.getItem('zbjsylsh').setVisible(false);
        //财务净现值税前设置为不显示
        mstform.getItem('cwjxzsq').setVisible(false);
        //财务净现值税后设置为不显示
        mstform.getItem('cwjxzsh').setVisible(false);
        //基础保障设置为不显示
        mstform.getItem('jcbz').setVisible(false);
        //增信保障设置为不显示
        mstform.getItem('zxbz').setVisible(false);
        //投标要求设置为不显示
        mstform.getItem('tbyq').setVisible(false);
        //竞价指标设置为显示
        mstform.getItem('jjzb').setVisible(true);
        //运作方式设置为不显示
        mstform.getItem('yzfs').setVisible(false);
        //保证金及保函情况设置为不显示
        mstform.getItem('bzjjbhqk').setVisible(false);
        //项目运营情况设置为不显示
        mstform.getItem('xmyyqk').setVisible(false);
        //使用者付费情况设置为不显示
        mstform.getItem('kyxffqk').setVisible(false);
        //公司治理情况设置为不显示
        mstform.getItem('gszlqk').setVisible(false);
        //考核情况设置为不显示
        mstform.getItem('khqk').setVisible(false);
        //招标文件要求设置为不显示
        mstform.getItem('zbwjyq').setVisible(false);
        //其他特殊要求为设置不显示
        mstform.getItem('qttsyq').setVisible(false);
        //实施本项目优缺点设置为不显示
        mstform.getItem('ssbxmyqd').setVisible(false);
        //投标保证设置为不显示
        mstform.getItem('tbbz').setVisible(false);
        //回款来源设置为不显示
        mstform.getItem('hkly').setVisible(false);
        //保障措施设置为不显示
        mstform.getItem('bzcs').setVisible(false);
        //区域情况简介设置为不显示
        mstform.getItem('qyqkjj').setVisible(false);
        //主要竞争对手设置为显示
        mstform.getItem('zyjzds').setVisible(true);
        //分析结论设置为不显示
        mstform.getItem('fxjl').setVisible(false);
    }
    //投融资项目跟踪未选择项目类型时end
    */

    /*
    //投融资项目跟踪字段占比字段设置为只读start
    function ZbD() {
        //征地拆迁费用占比设置为只读
        mstform.getItem('zdcjfyzb').userSetReadOnly(true);
        //工程费用占比设置为只读
        mstform.getItem('gcfyzb').userSetReadOnly(true);
        //工程其他费用占比设置为只读
        mstform.getItem('gcqtfyzb').userSetReadOnly(true);
        //工程预备费用占比设置为只读
        mstform.getItem('gcybfyzb').userSetReadOnly(true);
        //流动资金占比设置为只读
        mstform.getItem('ldzjzb').userSetReadOnly(true);
        //建设期利息占比设置为只读
        mstform.getItem('jsqlxzb').userSetReadOnly(true);
    }
    //投融资项目跟踪字段占比字段设置为只读end
    */

    /*
    //投融资项目跟踪项目类型为PPP模式start
    function PPP() {
        //项目名称
        mstform.getItem('xmmc').setVisible(true);
        //项目类型
        mstform.getItem('xmlx').setVisible(true);
        //政府方平台公司
        mstform.getItem('zffptgs').setVisible(true);
        //负责人
        mstform.getItem('empid').setVisible(true);
        //联系方式
        mstform.getItem('lxfs').setVisible(true);
        //所属省份
        mstform.getItem('userhelp_char').setVisible(false);
        //所属城市
        mstform.getItem('shch').setVisible(false);
        //所属县区
        mstform.getItem('shqx').setVisible(false);
        //政府实施机构
        mstform.getItem('zfssjg').setVisible(true);
        //授权企业
        mstform.getItem('sqqy').setVisible(false);
        //授权企业外部评级
        mstform.getItem('sqqywbpj').setVisible(false);
        //政府机构
        mstform.getItem('zfjg').setVisible(false);
        //财务状况
        mstform.getItem('cwzk').setVisible(true);
        //信用评级
        mstform.getItem('xypj').setVisible(true);
        //建设单位
        mstform.getItem('jsdw').setVisible(false);
        //评级时间
        mstform.getItem('pjsj').setVisible(false);
        //建设单位外部评级
        mstform.getItem('wbpj').setVisible(false);
        //外部评级机构
        mstform.getItem('wbpjjg').setVisible(false);
        //担保公司名称
        mstform.getItem('dbgsmc').setVisible(false);
        //担保公司外部评价
        mstform.getItem('dbgswbpj').setVisible(false);
        //设计单位
        mstform.getItem('sjdw').setVisible(false);
        //结算方式
        mstform.getItem('jsfs').setVisible(false);
        //建设内容
        mstform.getItem('xsnr').setVisible(true);
        //投资估算
        mstform.getItem('tzgs').setVisible(true);
        //总投资概算
        mstform.getItem('ztzgs').setVisible(false);
        //流动资金
        mstform.getItem('ldzj').setVisible(true);
        //流动资金占比
        mstform.getItem('ldzjzb').setVisible(true);
        //项目资金比例
        mstform.getItem('xmzjbl').setVisible(false);
        //项目公司注册资本金
        mstform.getItem('xmgszczbj').setVisible(false);
        //资本金
        mstform.getItem('zbj').setVisible(true);
        //资本金比例
        mstform.getItem('zbjbl').setVisible(true);
        //股权结构
        mstform.getItem('gqjg').setVisible(true);
        //PPP入库
        mstform.getItem('ppprk').setVisible(true);
        //是否联合体中标
        mstform.getItem('sflhtzb').setVisible(true);
        //联合体成员方
        mstform.getItem('lhtcyf').setVisible(false);
        //回报机制
        mstform.getItem('hbjz').setVisible(true);
        //两评一案
        mstform.getItem('lpyn').setVisible(true);
        //回报
        mstform.getItem('hb').setVisible(false);
        //目前项目进展
        mstform.getItem('mqxmjz').setVisible(true);
        //联合体情况
        mstform.getItem('lhtqk').setVisible(false);
        //行政级别
        mstform.getItem('xzjb').setVisible(true);
        //合作期限
        mstform.getItem('hzqx').setVisible(true);
        //还款方式
        mstform.getItem('hkfs').setVisible(false);
        //建安下浮比
        mstform.getItem('jaxfb').setVisible(false);
        //回报方式
        mstform.getItem('fffs').setVisible(true);
        //合理利润率
        mstform.getItem('hllrl').setVisible(false);
        //折现率
        mstform.getItem('zxl').setVisible(false);
        //投资回报率
        mstform.getItem('tzhbl').setVisible(false);
        //施工利润率
        mstform.getItem('sglrl').setVisible(true);
        //计价依据及下浮比
        mstform.getItem('jjyjjxfb').setVisible(true);
        //预计建安利润率
        mstform.getItem('yjjalrl').setVisible(true);
        //建设期是否计息
        mstform.getItem('jsqsfjx').setVisible(true);
        //计息比例
        mstform.getItem('jxbl').setVisible(false);
        //资本金收益率税前
        mstform.getItem('zbjsylsq').setVisible(true);
        //资本金收益率税后
        mstform.getItem('zbjsylsh').setVisible(true);
        //财务净现值税前
        mstform.getItem('cwjxzsq').setVisible(true);
        //财务净现值税后
        mstform.getItem('cwjxzsh').setVisible(true);
        //基础保障
        mstform.getItem('jcbz').setVisible(false);
        //增信保障
        mstform.getItem('zxbz').setVisible(false);
        //投标要求
        mstform.getItem('tbyq').setVisible(true);
        //竞价指标
        mstform.getItem('jjzb').setVisible(true);
        //运作方式
        mstform.getItem('yzfs').setVisible(false);
        //保证金及保函情况
        mstform.getItem('bzjjbhqk').setVisible(true);
        //项目运营情况
        mstform.getItem('xmyyqk').setVisible(true);
        //可用性付费情况
        mstform.getItem('kyxffqk').setVisible(true);
        //公司治理情况
        mstform.getItem('gszlqk').setVisible(true);
        //考核情况
        mstform.getItem('khqk').setVisible(true);
        //招标文件要求
        mstform.getItem('zbwjyq').setVisible(false);
        //其他特殊要求
        mstform.getItem('qttsyq').setVisible(false);
        //主要竞争对手
        mstform.getItem('zyjzds').setVisible(true);
        //实施本项目优缺点
        mstform.getItem('ssbxmyqd').setVisible(true);
        //分析结论
        mstform.getItem('fxjl').setVisible(false);
        //投标保证
        mstform.getItem('tbbz').setVisible(false);
        //回款来源
        mstform.getItem('hkly').setVisible(false);
        //保障措施
        mstform.getItem('bzcs').setVisible(false);
        //区域情况简介
        mstform.getItem('qyqkjj').setVisible(false);
    }
    //投融资项目跟踪项目类型为PPP模式end
    */

    /*
    //投融资项目跟踪项目类型为FEPC模式start
    function FEPC() {
        //项目名称
        mstform.getItem('xmmc').setVisible(true);
        //项目类型
        mstform.getItem('xmlx').setVisible(true);
        //政府方平台公司
        mstform.getItem('zffptgs').setVisible(false);
        //负责人
        mstform.getItem('empid').setVisible(true);
        //联系方式
        mstform.getItem('lxfs').setVisible(true);
        //所属省份
        mstform.getItem('userhelp_char').setVisible(true);
        //所属城市
        mstform.getItem('shch').setVisible(true);
        //所属县区
        mstform.getItem('shqx').setVisible(true);
        //政府实施机构
        mstform.getItem('zfssjg').setVisible(false);
        //授权企业
        mstform.getItem('sqqy').setVisible(false);
        //授权企业外部评级
        mstform.getItem('sqqywbpj').setVisible(false);
        //政府机构
        mstform.getItem('zfjg').setVisible(false);
        //财务状况
        mstform.getItem('cwzk').setVisible(true);
        //信用评级
        mstform.getItem('xypj').setVisible(false);
        //建设单位
        mstform.getItem('jsdw').setVisible(true);
        //评级时间
        mstform.getItem('pjsj').setVisible(true);
        //建设单位外部评级
        mstform.getItem('wbpj').setVisible(true);
        //外部评级机构
        mstform.getItem('wbpjjg').setVisible(true);
        //担保公司名称
        mstform.getItem('dbgsmc').setVisible(true);
        //担保公司外部评价
        mstform.getItem('dbgswbpj').setVisible(true);
        //设计单位
        mstform.getItem('sjdw').setVisible(true);
        //结算方式
        mstform.getItem('jsfs').setVisible(true);
        //建设内容
        mstform.getItem('xsnr').setVisible(true);
        //投资估算
        mstform.getItem('tzgs').setVisible(false);
        //总投资概算
        mstform.getItem('ztzgs').setVisible(true);
        //流动资金
        mstform.getItem('ldzj').setVisible(false);
        //流动资金占比
        mstform.getItem('ldzjzb').setVisible(false);
        //项目资金比例
        mstform.getItem('xmzjbl').setVisible(true);
        //项目公司注册资本金
        mstform.getItem('xmgszczbj').setVisible(true);
        //资本金
        mstform.getItem('zbj').setVisible(false);
        //资本金比例
        mstform.getItem('zbjbl').setVisible(false);
        //股权结构
        mstform.getItem('gqjg').setVisible(true);
        //PPP入库
        mstform.getItem('ppprk').setVisible(false);
        //是否联合体中标
        mstform.getItem('sflhtzb').setVisible(true);
        //联合体成员方
        mstform.getItem('lhtcyf').setVisible(false);
        //回报机制
        mstform.getItem('hbjz').setVisible(false);
        //两评一案
        mstform.getItem('lpyn').setVisible(false);
        //回报
        mstform.getItem('hb').setVisible(true);
        //目前项目进展
        mstform.getItem('mqxmjz').setVisible(true);
        //联合体情况
        mstform.getItem('lhtqk').setVisible(false);
        //行政级别
        mstform.getItem('xzjb').setVisible(true);
        //合作期限
        mstform.getItem('hzqx').setVisible(true);
        //还款方式
        mstform.getItem('hkfs').setVisible(false);
        //建安下浮比
        mstform.getItem('jaxfb').setVisible(true);
        //回报方式
        mstform.getItem('fffs').setVisible(false);
        //合理利润率
        mstform.getItem('hllrl').setVisible(false);
        //折现率
        mstform.getItem('zxl').setVisible(false);
        //投资回报率
        mstform.getItem('tzhbl').setVisible(false);
        //施工利润率
        mstform.getItem('sglrl').setVisible(false);
        //计价依据及下浮比
        mstform.getItem('jjyjjxfb').setVisible(false);
        //预计建安利润率
        mstform.getItem('yjjalrl').setVisible(true);
        //建设期是否计息
        mstform.getItem('jsqsfjx').setVisible(false);
        //计息比例
        mstform.getItem('jxbl').setVisible(false);
        //资本金收益率税前
        mstform.getItem('zbjsylsq').setVisible(false);
        //资本金收益率税后
        mstform.getItem('zbjsylsh').setVisible(false);
        //财务净现值税前
        mstform.getItem('cwjxzsq').setVisible(false);
        //财务净现值税后
        mstform.getItem('cwjxzsh').setVisible(false);
        //基础保障
        mstform.getItem('jcbz').setVisible(false);
        //增信保障
        mstform.getItem('zxbz').setVisible(false);
        //投标要求
        mstform.getItem('tbyq').setVisible(false);
        //竞价指标
        mstform.getItem('jjzb').setVisible(true);
        //运作方式
        mstform.getItem('yzfs').setVisible(false);
        //保证金及保函情况
        mstform.getItem('bzjjbhqk').setVisible(true);
        //项目运营情况
        mstform.getItem('xmyyqk').setVisible(false);
        //可用性付费情况
        mstform.getItem('kyxffqk').setVisible(false);
        //公司治理情况
        mstform.getItem('gszlqk').setVisible(false);
        //考核情况
        mstform.getItem('khqk').setVisible(false);
        //招标文件要求
        mstform.getItem('zbwjyq').setVisible(true);
        //其他特殊要求
        mstform.getItem('qttsyq').setVisible(true);
        //主要竞争对手
        mstform.getItem('zyjzds').setVisible(true);
        //实施本项目优缺点
        mstform.getItem('ssbxmyqd').setVisible(false);
        //分析结论
        mstform.getItem('fxjl').setVisible(true);
        //投标保证
        mstform.getItem('tbbz').setVisible(false);
        //回款来源
        mstform.getItem('hkly').setVisible(false);
        //保障措施
        mstform.getItem('bzcs').setVisible(false);
        //区域情况简介
        mstform.getItem('qyqkjj').setVisible(false);
    }
    //投融资项目跟踪项目类型为FEPC模式end
    */

    /*
    //投融资项目跟踪项目类型为ABO模式start
    function ABO() {
        //项目名称
        mstform.getItem('xmmc').setVisible(true);
        //项目类型
        mstform.getItem('xmlx').setVisible(true);
        //政府方平台公司
        mstform.getItem('zffptgs').setVisible(false);
        //负责人
        mstform.getItem('empid').setVisible(true);
        //联系方式
        mstform.getItem('lxfs').setVisible(false);
        //所属省份
        mstform.getItem('userhelp_char').setVisible(false);
        //所属城市
        mstform.getItem('shch').setVisible(false);
        //所属县区
        mstform.getItem('shqx').setVisible(false);
        //政府实施机构
        mstform.getItem('zfssjg').setVisible(false);
        //授权企业
        mstform.getItem('sqqy').setVisible(true);
        //授权企业外部评级
        mstform.getItem('sqqywbpj').setVisible(true);
        //政府机构
        mstform.getItem('zfjg').setVisible(true);
        //财务状况
        mstform.getItem('cwzk').setVisible(true);
        //信用评级
        mstform.getItem('xypj').setVisible(false);
        //建设单位
        mstform.getItem('jsdw').setVisible(false);
        //建设单位设为非必输
        mstform.getItem('jsdw').userSetMustInput(false);
        //评级时间
        mstform.getItem('pjsj').setVisible(false);
        //建设单位外部评级
        mstform.getItem('wbpj').setVisible(false);
        //外部评级机构
        mstform.getItem('wbpjjg').setVisible(false);
        //担保公司名称
        mstform.getItem('dbgsmc').setVisible(false);
        //担保公司外部评价
        mstform.getItem('dbgswbpj').setVisible(false);
        //设计单位
        mstform.getItem('sjdw').setVisible(false);
        //结算方式
        mstform.getItem('jsfs').setVisible(false);
        //建设内容
        mstform.getItem('xsnr').setVisible(true);
        //投资估算
        mstform.getItem('tzgs').setVisible(true);
        //总投资概算
        mstform.getItem('ztzgs').setVisible(false);
        //流动资金
        mstform.getItem('ldzj').setVisible(false);
        //流动资金占比
        mstform.getItem('ldzjzb').setVisible(false);
        //项目资金比例
        mstform.getItem('xmzjbl').setVisible(true);
        //项目公司注册资本金
        mstform.getItem('xmgszczbj').setVisible(true);
        //资本金
        mstform.getItem('zbj').setVisible(false);
        //资本金比例
        mstform.getItem('zbjbl').setVisible(false);
        //股权结构
        mstform.getItem('gqjg').setVisible(true);
        //PPP入库
        mstform.getItem('ppprk').setVisible(false);
        //是否联合体中标
        mstform.getItem('sflhtzb').setVisible(false);
        //联合体成员方
        mstform.getItem('lhtcyf').setVisible(false);
        //回报机制
        mstform.getItem('hbjz').setVisible(false);
        //两评一案
        mstform.getItem('lpyn').setVisible(false);
        //回报
        mstform.getItem('hb').setVisible(false);
        //目前项目进展
        mstform.getItem('mqxmjz').setVisible(false);
        //联合体情况
        mstform.getItem('lhtqk').setVisible(true);
        //行政级别
        mstform.getItem('xzjb').setVisible(true);
        //合作期限
        mstform.getItem('hzqx').setVisible(true);
        //还款方式
        mstform.getItem('hkfs').setVisible(false);
        //建安下浮比
        mstform.getItem('jaxfb').setVisible(false);
        //回报方式
        mstform.getItem('fffs').setVisible(false);
        //合理利润率
        mstform.getItem('hllrl').setVisible(false);
        //折现率
        mstform.getItem('zxl').setVisible(false);
        //投资回报率
        mstform.getItem('tzhbl').setVisible(false);
        //施工利润率
        mstform.getItem('sglrl').setVisible(false);
        //计价依据及下浮比
        mstform.getItem('jjyjjxfb').setVisible(true);
        //预计建安利润率
        mstform.getItem('yjjalrl').setVisible(true);
        //建设期是否计息
        mstform.getItem('jsqsfjx').setVisible(true);
        //计息比例
        mstform.getItem('jxbl').setVisible(false);
        //资本金收益率税前
        mstform.getItem('zbjsylsq').setVisible(false);
        //资本金收益率税后
        mstform.getItem('zbjsylsh').setVisible(false);
        //财务净现值税前
        mstform.getItem('cwjxzsq').setVisible(false);
        //财务净现值税后
        mstform.getItem('cwjxzsh').setVisible(false);
        //基础保障
        mstform.getItem('jcbz').setVisible(false);
        //增信保障
        mstform.getItem('zxbz').setVisible(false);
        //投标要求
        mstform.getItem('tbyq').setVisible(true);
        //竞价指标
        mstform.getItem('jjzb').setVisible(true);
        //运作方式
        mstform.getItem('yzfs').setVisible(false);
        //保证金及保函情况
        mstform.getItem('bzjjbhqk').setVisible(false);
        //项目运营情况
        mstform.getItem('xmyyqk').setVisible(true);
        //可用性付费情况
        mstform.getItem('kyxffqk').setVisible(false);
        //公司治理情况
        mstform.getItem('gszlqk').setVisible(true);
        //考核情况
        mstform.getItem('khqk').setVisible(true);
        //招标文件要求
        mstform.getItem('zbwjyq').setVisible(false);
        //其他特殊要求
        mstform.getItem('qttsyq').setVisible(false);
        //主要竞争对手
        mstform.getItem('zyjzds').setVisible(true);
        //实施本项目优缺点
        mstform.getItem('ssbxmyqd').setVisible(false);
        //分析结论
        mstform.getItem('fxjl').setVisible(true);
        //投标保证
        mstform.getItem('tbbz').setVisible(true);
        //回款来源
        mstform.getItem('hkly').setVisible(true);
        //保障措施
        mstform.getItem('bzcs').setVisible(true);
        //区域情况简介
        mstform.getItem('qyqkjj').setVisible(true);
    }
    //投融资项目跟踪项目类型为ABO模式end
    */

    /*投融资项目跟踪各种费用的占比自动带出来   各费用/投资估算 start*/
    function Zb(xmlx) {
        if (xmlx == '1' || xmlx == '3') {
            //投资概算改变时
            mstform.getItem('tzgs').addListener('change', function () {
                //征地拆迁费用占比
                mstform.getItem('zdcjfyzb').setValue((mstform.getItem('amt').getValue() / mstform.getItem('tzgs').getValue()));
                //工程费用占比
                mstform.getItem('gcfyzb').setValue((mstform.getItem('gcfy').getValue() / mstform.getItem('tzgs').getValue()));
                //工程其他费用占比
                mstform.getItem('gcqtfyzb').setValue((mstform.getItem('gcqtfy').getValue() / mstform.getItem('tzgs').getValue()));
                //工程预备费用占比
                mstform.getItem('gcybfyzb').setValue((mstform.getItem('gcybfy').getValue() / mstform.getItem('tzgs').getValue()));
                //流动资金占比
                mstform.getItem('ldzjzb').setValue((mstform.getItem('ldzj').getValue() / mstform.getItem('tzgs').getValue()));
                //建设期利息占比
                mstform.getItem('jsqlxzb').setValue((mstform.getItem('jsqlx').getValue() / mstform.getItem('tzgs').getValue()));
            });

            //征地拆迁费用
            mstform.getItem('amt').addListener('change', function () {
                //征地拆迁费用占比
                mstform.getItem('zdcjfyzb').setValue((mstform.getItem('amt').getValue() / mstform.getItem('tzgs').getValue()));

            });
            //工程费用
            mstform.getItem('gcfy').addListener('change', function () {
                //工程费用占比
                mstform.getItem('gcfyzb').setValue((mstform.getItem('gcfy').getValue() / mstform.getItem('tzgs').getValue()));

            });
            //工程其他费用
            mstform.getItem('gcqtfy').addListener('change', function () {
                //工程其他费用占比
                mstform.getItem('gcqtfyzb').setValue((mstform.getItem('gcqtfy').getValue() / mstform.getItem('tzgs').getValue()));

            });
            //工程预备费用
            mstform.getItem('gcybfy').addListener('change', function () {
                //工程预备费用占比
                mstform.getItem('gcybfyzb').setValue((mstform.getItem('gcybfy').getValue() / mstform.getItem('tzgs').getValue()));

            });
            //流动资金
            mstform.getItem('ldzj').addListener('change', function () {
                //流动资金占比
                mstform.getItem('ldzjzb').setValue((mstform.getItem('ldzj').getValue() / mstform.getItem('tzgs').getValue()));

            });
            //建设期利息
            mstform.getItem('jsqlx').addListener('change', function () {
                //建设期利息占比
                mstform.getItem('jsqlxzb').setValue((mstform.getItem('jsqlx').getValue() / mstform.getItem('tzgs').getValue()));

            });
        } else if (xmlx == '2') {
            //总投资估算改变时
            mstform.getItem('ztzgs').addListener('change', function () {
                //征地拆迁费用占比
                mstform.getItem('zdcjfyzb').setValue((mstform.getItem('amt').getValue() / mstform.getItem('ztzgs').getValue()));
                //工程费用占比费用占比
                mstform.getItem('gcfyzb').setValue((mstform.getItem('gcfy').getValue() / mstform.getItem('ztzgs').getValue()));
                //工程其他费用占比
                mstform.getItem('gcqtfyzb').setValue((mstform.getItem('gcqtfy').getValue() / mstform.getItem('ztzgs').getValue()));
                //工程预备费用占比
                mstform.getItem('gcybfyzb').setValue((mstform.getItem('gcybfy').getValue() / mstform.getItem('ztzgs').getValue()));
                //流动资金占比
                mstform.getItem('ldzjzb').setValue((mstform.getItem('ldzj').getValue() / mstform.getItem('ztzgs').getValue()));
                //建设期利息占比
                mstform.getItem('jsqlxzb').setValue((mstform.getItem('jsqlx').getValue() / mstform.getItem('ztzgs').getValue()));
            });
            //征地拆迁费用
            mstform.getItem('amt').addListener('change', function () {
                //征地拆迁费用占比
                mstform.getItem('zdcjfyzb').setValue((mstform.getItem('amt').getValue() / mstform.getItem('ztzgs').getValue()));

            });
            //工程费用
            mstform.getItem('gcfy').addListener('change', function () {
                //工程费用占比
                mstform.getItem('gcfyzb').setValue((mstform.getItem('gcfy').getValue() / mstform.getItem('ztzgs').getValue()));

            });
            //工程其他费用
            mstform.getItem('gcqtfy').addListener('change', function () {
                //工程其他费用占比
                mstform.getItem('gcqtfyzb').setValue((mstform.getItem('gcqtfy').getValue() / mstform.getItem('ztzgs').getValue()));

            });
            //工程预备费用
            mstform.getItem('gcybfy').addListener('change', function () {
                //工程预备费用占比
                mstform.getItem('gcybfyzb').setValue((mstform.getItem('gcybfy').getValue() / mstform.getItem('ztzgs').getValue()));

            });
            //流动资金
            mstform.getItem('ldzj').addListener('change', function () {
                //流动资金占比
                mstform.getItem('ldzjzb').setValue((mstform.getItem('ldzj').getValue() / mstform.getItem('ztzgs').getValue()));

            });
            //建设期利息
            mstform.getItem('jsqlx').addListener('change', function () {
                //建设期利息占比
                mstform.getItem('jsqlxzb').setValue((mstform.getItem('jsqlx').getValue() / mstform.getItem('ztzgs').getValue()));

            });

        }
    }
    //投融资项目跟踪各种费用的占比自动带出来   各费用/投资估算 end


    /*
    //投融资项目跟踪PPP模式必输项start
    function PPPMustInput() {
        //政府方平台公司设置为
        mstform.getItem('zffptgs').userSetMustInput(true);
        //负责人设置为
        mstform.getItem('empid').userSetMustInput(true);
        //联系方式设置为
        mstform.getItem('lxfs').userSetMustInput(true);
        //所属省份设置为
        mstform.getItem('userhelp_char').userSetMustInput(false);
        //所属城市设置为
        mstform.getItem('shch').userSetMustInput(false);
        //所属区县设置为
        mstform.getItem('shqx').userSetMustInput(false);
        //政府实施机构设置为
        mstform.getItem('zfssjg').userSetMustInput(true);
        //授权企业设置为
        mstform.getItem('sqqy').userSetMustInput(false);
        //授权企业外部评级设置为
        mstform.getItem('sqqywbpj').userSetMustInput(false);
        //政府机构设置为
        mstform.getItem('zfjg').userSetMustInput(false);
        //财务状况设置为
        mstform.getItem('cwzk').userSetMustInput(true);
        //信用评级设置为
        mstform.getItem('xypj').userSetMustInput(false);
        //建设单位设置为
        mstform.getItem('jsdw').userSetMustInput(false);
        //建设单位外部评级
        mstform.getItem('wbpj').userSetMustInput(false);
        //评级时间设置为
        mstform.getItem('pjsj').userSetMustInput(false);
        //外部评级机构设置为
        mstform.getItem('wbpjjg').userSetMustInput(false);
        //担保公司名称设置为
        mstform.getItem('dbgsmc').userSetMustInput(false);
        //担保公司外部评价设置为
        mstform.getItem('dbgswbpj').userSetMustInput(false);
        //设计单位设置为
        mstform.getItem('sjdw').userSetMustInput(false);
        //结算方式设置为
        mstform.getItem('jsfs').userSetMustInput(false);
        //建设内容设置为
        mstform.getItem('xsnr').userSetMustInput(true);
        //投资估算设置为
        mstform.getItem('tzgs').userSetMustInput(true);
        //总投资概算设置为
        mstform.getItem('ztzgs').userSetMustInput(false);
        //征地拆迁费用设置为
        mstform.getItem('amt').userSetMustInput(true);
        //征地拆迁费用占比设置为
        mstform.getItem('zdcjfyzb').userSetMustInput(false);
        //工程费用设置为
        mstform.getItem('gcfy').userSetMustInput(true);
        //工程费用占比设置为
        mstform.getItem('gcfyzb').userSetMustInput(false);
        //工程其他费用设置为
        mstform.getItem('gcqtfy').userSetMustInput(true);
        //工程其他费用占比设置为
        mstform.getItem('gcqtfyzb').userSetMustInput(false);
        //工程预备费用设置为
        mstform.getItem('gcybfy').userSetMustInput(true);
        //工程预备费用占比设置为
        mstform.getItem('gcybfyzb').userSetMustInput(false);
        //流动资金设置为
        mstform.getItem('ldzj').userSetMustInput(true);
        //流动资金占比设置为
        mstform.getItem('ldzjzb').userSetMustInput(false);
        //建设期利息设置为
        mstform.getItem('jsqlx').userSetMustInput(true);
        //建设期利息占比设置为
        mstform.getItem('jsqlxzb').userSetMustInput(false);
        //项目资金比例设置为
        mstform.getItem('xmzjbl').userSetMustInput(false);
        //项目公司注册资本金为
        mstform.getItem('xmgszczbj').userSetMustInput(false);
        //资本金为
        mstform.getItem('zbj').userSetMustInput(true);
        //资本金比例为
        mstform.getItem('zbjbl').userSetMustInput(true);
        //股权结构设置为
        mstform.getItem('gqjg').userSetMustInput(true);
        //PPP入库设置为
        mstform.getItem('ppprk').userSetMustInput(true);
        //是否联合体中标设置为
        mstform.getItem('sflhtzb').userSetMustInput(true);
        //联合体成员方设置为
        mstform.getItem('lhtcyf').userSetMustInput(false);
        //回报机制设置为
        mstform.getItem('hbjz').userSetMustInput(true);
        //两评一案设置为
        mstform.getItem('lpyn').userSetMustInput(true);
        //回报设置为
        mstform.getItem('hb').userSetMustInput(false);
        //目前项目进展设置为
        mstform.getItem('mqxmjz').userSetMustInput(true);
        //联合体情况设置为
        mstform.getItem('lhtqk').userSetMustInput(false);
        //行政级别设置为
        mstform.getItem('xzjb').userSetMustInput(true);
        //合作期限设置为
        mstform.getItem('hzqx').userSetMustInput(true);
        //还款方式设置为
        mstform.getItem('hkfs').userSetMustInput(false);
        //建安下浮比设置为
        mstform.getItem('jaxfb').userSetMustInput(false);
        //回报方式设置为
        mstform.getItem('fffs').userSetMustInput(true);
        //合理利润率设置为
        mstform.getItem('hllrl').userSetMustInput(false);
        //折现率设置为
        mstform.getItem('zxl').userSetMustInput(false);
        //投资回报率设置为
        mstform.getItem('tzhbl').userSetMustInput(false);
        //施工利润率设置为
        mstform.getItem('sglrl').userSetMustInput(true);
        //计价依据及下浮比设置为
        mstform.getItem('jjyjjxfb').userSetMustInput(true);
        //预计建安利润率设置为
        mstform.getItem('yjjalrl').userSetMustInput(true);
        //建设期是否计息设置为
        mstform.getItem('jsqsfjx').userSetMustInput(true);
        //计息比例设置为
        mstform.getItem('jxbl').userSetMustInput(false);
        //资本金内部收益率税前设置为
        mstform.getItem('zbjsylsq').userSetMustInput(false);
        //资本金内部收益率税后设置为
        mstform.getItem('zbjsylsh').userSetMustInput(true);
        //财务净现值税前设置为
        mstform.getItem('cwjxzsq').userSetMustInput(false);
        //财务净现值税后设置为
        mstform.getItem('cwjxzsh').userSetMustInput(false);
        //基础保障设置为
        mstform.getItem('jcbz').userSetMustInput(false);
        //增信保障设置为
        mstform.getItem('zxbz').userSetMustInput(false);
        //投标要求设置为
        mstform.getItem('tbyq').userSetMustInput(true);
        //竞价指标设置为
        mstform.getItem('jjzb').userSetMustInput(true);
        //运作方式设置为
        mstform.getItem('yzfs').userSetMustInput(false);
        //保证金及保函情况设置为
        mstform.getItem('bzjjbhqk').userSetMustInput(true);
        //项目运营情况设置为
        mstform.getItem('xmyyqk').userSetMustInput(true);
        //使用者付费情况设置为
        mstform.getItem('kyxffqk').userSetMustInput(true);
        //公司治理情况设置为
        mstform.getItem('gszlqk').userSetMustInput(true);
        //考核情况设置为
        mstform.getItem('khqk').userSetMustInput(true);
        //招标文件要求设置为
        mstform.getItem('zbwjyq').userSetMustInput(false);
        //其他特殊要求为设置
        mstform.getItem('qttsyq').userSetMustInput(false);
        //实施本项目优缺点设置为
        mstform.getItem('ssbxmyqd').userSetMustInput(true);
        //投标保证设置为
        mstform.getItem('tbbz').userSetMustInput(false);
        //回款来源设置为
        mstform.getItem('hkly').userSetMustInput(false);
        //保障措施设置为
        mstform.getItem('bzcs').userSetMustInput(false);
        //区域情况简介设置为
        mstform.getItem('qyqkjj').userSetMustInput(false);
        //主要竞争对手设置为
        mstform.getItem('zyjzds').userSetMustInput(true);
        //分析结论设置为
        mstform.getItem('fxjl').userSetMustInput(false);
    }
    //投融资项目跟踪PPP模式end
    */


    /*
    //投融资项目跟踪FEPC模式必输项start
    function FEPCMustInput() {
        //政府方平台公司设置为
        mstform.getItem('zffptgs').userSetMustInput(false);
        //负责人设置为
        mstform.getItem('empid').userSetMustInput(false);
        //联系方式设置为
        mstform.getItem('lxfs').userSetMustInput(false);
        //所属省份设置为
        mstform.getItem('userhelp_char').userSetMustInput(false);
        //所属城市设置为
        mstform.getItem('shch').userSetMustInput(false);
        //所属区县设置为
        mstform.getItem('shqx').userSetMustInput(false);
        //政府实施机构设置为
        mstform.getItem('zfssjg').userSetMustInput(false);
        //授权企业设置为
        mstform.getItem('sqqy').userSetMustInput(false);
        //授权企业外部评级设置为
        mstform.getItem('sqqywbpj').userSetMustInput(false);
        //政府机构设置为
        mstform.getItem('zfjg').userSetMustInput(false);
        //财务状况设置为
        mstform.getItem('cwzk').userSetMustInput(false);
        //信用评级设置为
        mstform.getItem('xypj').userSetMustInput(false);
        //建设单位设置为
        mstform.getItem('jsdw').userSetMustInput(false);
        //建设单位外部评级
        mstform.getItem('wbpj').userSetMustInput(false);
        //评级时间设置为
        mstform.getItem('pjsj').userSetMustInput(false);
        //外部评级机构设置为
        mstform.getItem('wbpjjg').userSetMustInput(false);
        //担保公司名称设置为
        mstform.getItem('dbgsmc').userSetMustInput(false);
        //担保公司外部评价设置为
        mstform.getItem('dbgswbpj').userSetMustInput(false);
        //设计单位设置为
        mstform.getItem('sjdw').userSetMustInput(false);
        //结算方式设置为
        mstform.getItem('jsfs').userSetMustInput(false);
        //建设内容设置为
        mstform.getItem('xsnr').userSetMustInput(false);
        //投资估算设置为
        mstform.getItem('tzgs').userSetMustInput(false);
        //总投资概算设置为
        mstform.getItem('ztzgs').userSetMustInput(false);
        //征地拆迁费用设置为
        mstform.getItem('amt').userSetMustInput(false);
        //征地拆迁费用占比设置为
        mstform.getItem('zdcjfyzb').userSetMustInput(false);
        //工程费用设置为
        mstform.getItem('gcfy').userSetMustInput(false);
        //工程费用占比设置为
        mstform.getItem('gcfyzb').userSetMustInput(false);
        //工程其他费用设置为
        mstform.getItem('gcqtfy').userSetMustInput(false);
        //工程其他费用占比设置为
        mstform.getItem('gcqtfyzb').userSetMustInput(false);
        //工程预备费用设置为
        mstform.getItem('gcybfy').userSetMustInput(false);
        //工程预备费用占比设置为
        mstform.getItem('gcybfyzb').userSetMustInput(false);
        //流动资金设置为
        mstform.getItem('ldzj').userSetMustInput(false);
        //流动资金占比设置为
        mstform.getItem('ldzjzb').userSetMustInput(false);
        //建设期利息设置为
        mstform.getItem('jsqlx').userSetMustInput(false);
        //建设期利息占比设置为
        mstform.getItem('jsqlxzb').userSetMustInput(false);
        //项目资金比例设置为
        mstform.getItem('xmzjbl').userSetMustInput(false);
        //项目公司注册资本金为
        mstform.getItem('xmgszczbj').userSetMustInput(false);
        //资本金为
        mstform.getItem('zbj').userSetMustInput(false);
        //资本金比例为
        mstform.getItem('zbjbl').userSetMustInput(false);
        //股权结构设置为
        mstform.getItem('gqjg').userSetMustInput(false);
        //是否联合体中标设置为
        mstform.getItem('sflhtzb').userSetMustInput(false);
        //联合体成员方设置为
        mstform.getItem('lhtcyf').userSetMustInput(false);
        //回报机制设置为
        mstform.getItem('hbjz').userSetMustInput(false);
        //两评一案设置为
        mstform.getItem('lpyn').userSetMustInput(false);
        //回报设置为
        mstform.getItem('hb').userSetMustInput(false);
        //目前项目进展设置为
        mstform.getItem('mqxmjz').userSetMustInput(false);
        //联合体情况设置为
        mstform.getItem('lhtqk').userSetMustInput(false);
        //行政级别设置为
        mstform.getItem('xzjb').userSetMustInput(false);
        //合作期限设置为
        mstform.getItem('hzqx').userSetMustInput(false);
        //还款方式设置为
        mstform.getItem('hkfs').userSetMustInput(false);
        //建安下浮比设置为
        mstform.getItem('jaxfb').userSetMustInput(false);
        //回报方式设置为
        mstform.getItem('fffs').userSetMustInput(false);
        //合理利润率设置为
        mstform.getItem('hllrl').userSetMustInput(false);
        //折现率设置为
        mstform.getItem('zxl').userSetMustInput(false);
        //投资回报率设置为
        mstform.getItem('tzhbl').userSetMustInput(false);
        //施工利润率设置为
        mstform.getItem('sglrl').userSetMustInput(false);
        //计价依据及下浮比设置为
        mstform.getItem('jjyjjxfb').userSetMustInput(false);
        //预计建安利润率设置为
        mstform.getItem('yjjalrl').userSetMustInput(false);
        //建设期是否计息设置为
        mstform.getItem('jsqsfjx').userSetMustInput(false);
        //计息比例设置为
        mstform.getItem('jxbl').userSetMustInput(false);
        //资本金收益率税前设置为
        mstform.getItem('zbjsylsq').userSetMustInput(false);
        //资本金收益率税后设置为
        mstform.getItem('zbjsylsh').userSetMustInput(false);
        //财务净现值税前设置为
        mstform.getItem('cwjxzsq').userSetMustInput(false);
        //财务净现值税后设置为
        mstform.getItem('cwjxzsh').userSetMustInput(false);
        //基础保障设置为
        mstform.getItem('jcbz').userSetMustInput(false);
        //增信保障设置为
        mstform.getItem('zxbz').userSetMustInput(false);
        //投标要求设置为
        mstform.getItem('tbyq').userSetMustInput(false);
        //竞价指标设置为
        mstform.getItem('jjzb').userSetMustInput(false);
        //运作方式设置为
        mstform.getItem('yzfs').userSetMustInput(false);
        //保证金及保函情况设置为
        mstform.getItem('bzjjbhqk').userSetMustInput(false);
        //项目运营情况设置为
        mstform.getItem('xmyyqk').userSetMustInput(false);
        //使用者付费情况设置为
        mstform.getItem('kyxffqk').userSetMustInput(false);
        //公司治理情况设置为
        mstform.getItem('gszlqk').userSetMustInput(false);
        //考核情况设置为
        mstform.getItem('khqk').userSetMustInput(false);
        //招标文件要求设置为
        mstform.getItem('zbwjyq').userSetMustInput(false);
        //其他特殊要求为设置
        mstform.getItem('qttsyq').userSetMustInput(false);
        //实施本项目优缺点设置为
        mstform.getItem('ssbxmyqd').userSetMustInput(false);
        //投标保证设置为
        mstform.getItem('tbbz').userSetMustInput(false);
        //回款来源设置为
        mstform.getItem('hkly').userSetMustInput(false);
        //保障措施设置为
        mstform.getItem('bzcs').userSetMustInput(false);
        //区域情况简介设置为
        mstform.getItem('qyqkjj').userSetMustInput(false);
        //主要竞争对手设置为
        mstform.getItem('zyjzds').userSetMustInput(false);
        //分析结论设置为
        mstform.getItem('fxjl').userSetMustInput(false);
    }
    //投融资项目跟踪FEPC模式end
    */

    /*
    //投融资项目跟踪ABO模式必输项start
    function ABOMustInput() {
        //政府方平台公司设置为
        mstform.getItem('zffptgs').userSetMustInput(false);
        //负责人设置为
        mstform.getItem('empid').userSetMustInput(false);
        //联系方式设置为
        mstform.getItem('lxfs').userSetMustInput(false);
        //所属省份设置为
        mstform.getItem('userhelp_char').userSetMustInput(false);
        //所属城市设置为
        mstform.getItem('shch').userSetMustInput(false);
        //所属区县设置为
        mstform.getItem('shqx').userSetMustInput(false);
        //政府实施机构设置为
        mstform.getItem('zfssjg').userSetMustInput(false);
        //授权企业设置为
        mstform.getItem('sqqy').userSetMustInput(false);
        //授权企业外部评级设置为
        mstform.getItem('sqqywbpj').userSetMustInput(false);
        //政府机构设置为
        mstform.getItem('zfjg').userSetMustInput(false);
        //财务状况设置为
        mstform.getItem('cwzk').userSetMustInput(false);
        //信用评级设置为
        mstform.getItem('xypj').userSetMustInput(false);
        //建设单位设置为
        mstform.getItem('jsdw').userSetMustInput(false);
        //建设单位外部评级
        mstform.getItem('wbpj').userSetMustInput(false);
        //评级时间设置为
        mstform.getItem('pjsj').userSetMustInput(false);
        //外部评级机构设置为
        mstform.getItem('wbpjjg').userSetMustInput(false);
        //担保公司名称设置为
        mstform.getItem('dbgsmc').userSetMustInput(false);
        //担保公司外部评价设置为
        mstform.getItem('dbgswbpj').userSetMustInput(false);
        //设计单位设置为
        mstform.getItem('sjdw').userSetMustInput(false);
        //结算方式设置为
        mstform.getItem('jsfs').userSetMustInput(false);
        //建设内容设置为
        mstform.getItem('xsnr').userSetMustInput(false);
        //投资估算设置为
        mstform.getItem('tzgs').userSetMustInput(false);
        //总投资概算设置为
        mstform.getItem('ztzgs').userSetMustInput(false);
        //征地拆迁费用设置为
        mstform.getItem('amt').userSetMustInput(false);
        //征地拆迁费用占比设置为
        mstform.getItem('zdcjfyzb').userSetMustInput(false);
        //工程费用设置为
        mstform.getItem('gcfy').userSetMustInput(false);
        //工程费用占比设置为
        mstform.getItem('gcfyzb').userSetMustInput(false);
        //工程其他费用设置为
        mstform.getItem('gcqtfy').userSetMustInput(false);
        //工程其他费用占比设置为
        mstform.getItem('gcqtfyzb').userSetMustInput(false);
        //工程预备费用设置为
        mstform.getItem('gcybfy').userSetMustInput(false);
        //工程预备费用占比设置为
        mstform.getItem('gcybfyzb').userSetMustInput(false);
        //流动资金设置为
        mstform.getItem('ldzj').userSetMustInput(false);
        //流动资金占比设置为
        mstform.getItem('ldzjzb').userSetMustInput(false);
        //建设期利息设置为
        mstform.getItem('jsqlx').userSetMustInput(false);
        //建设期利息占比设置为
        mstform.getItem('jsqlxzb').userSetMustInput(false);
        //项目资金比例设置为
        mstform.getItem('xmzjbl').userSetMustInput(false);
        //项目公司注册资本金为
        mstform.getItem('xmgszczbj').userSetMustInput(false);
        //资本金为
        mstform.getItem('zbj').userSetMustInput(false);
        //资本金比例为
        mstform.getItem('zbjbl').userSetMustInput(false);
        //股权结构设置为
        mstform.getItem('gqjg').userSetMustInput(false);
        //是否联合体中标设置为
        mstform.getItem('sflhtzb').userSetMustInput(false);
        //联合体成员方设置为
        mstform.getItem('lhtcyf').userSetMustInput(false);
        //回报机制设置为
        mstform.getItem('hbjz').userSetMustInput(false);
        //两评一案设置为
        mstform.getItem('lpyn').userSetMustInput(false);
        //回报设置为
        mstform.getItem('hb').userSetMustInput(false);
        //目前项目进展设置为
        mstform.getItem('mqxmjz').userSetMustInput(false);
        //联合体情况设置为
        mstform.getItem('lhtqk').userSetMustInput(false);
        //行政级别设置为
        mstform.getItem('xzjb').userSetMustInput(false);
        //合作期限设置为
        mstform.getItem('hzqx').userSetMustInput(false);
        //还款方式设置为
        mstform.getItem('hkfs').userSetMustInput(false);
        //建安下浮比设置为
        mstform.getItem('jaxfb').userSetMustInput(false);
        //回报方式设置为
        mstform.getItem('fffs').userSetMustInput(false);
        //合理利润率设置为
        mstform.getItem('hllrl').userSetMustInput(false);
        //折现率设置为
        mstform.getItem('zxl').userSetMustInput(false);
        //投资回报率设置为
        mstform.getItem('tzhbl').userSetMustInput(false);
        //施工利润率设置为
        mstform.getItem('sglrl').userSetMustInput(false);
        //计价依据及下浮比设置为
        mstform.getItem('jjyjjxfb').userSetMustInput(false);
        //预计建安利润率设置为
        mstform.getItem('yjjalrl').userSetMustInput(false);
        //建设期是否计息设置为
        mstform.getItem('jsqsfjx').userSetMustInput(false);
        //计息比例设置为
        mstform.getItem('jxbl').userSetMustInput(false);
        //资本金收益率税前设置为
        mstform.getItem('zbjsylsq').userSetMustInput(false);
        //资本金收益率税后设置为
        mstform.getItem('zbjsylsh').userSetMustInput(false);
        //财务净现值税前设置为
        mstform.getItem('cwjxzsq').userSetMustInput(false);
        //财务净现值税后设置为
        mstform.getItem('cwjxzsh').userSetMustInput(false);
        //基础保障设置为
        mstform.getItem('jcbz').userSetMustInput(false);
        //增信保障设置为
        mstform.getItem('zxbz').userSetMustInput(false);
        //投标要求设置为
        mstform.getItem('tbyq').userSetMustInput(false);
        //竞价指标设置为
        mstform.getItem('jjzb').userSetMustInput(false);
        //运作方式设置为
        mstform.getItem('yzfs').userSetMustInput(false);
        //保证金及保函情况设置为
        mstform.getItem('bzjjbhqk').userSetMustInput(false);
        //项目运营情况设置为
        mstform.getItem('xmyyqk').userSetMustInput(false);
        //使用者付费情况设置为
        mstform.getItem('kyxffqk').userSetMustInput(false);
        //公司治理情况设置为
        mstform.getItem('gszlqk').userSetMustInput(false);
        //考核情况设置为
        mstform.getItem('khqk').userSetMustInput(false);
        //招标文件要求设置为
        mstform.getItem('zbwjyq').userSetMustInput(false);
        //其他特殊要求为设置
        mstform.getItem('qttsyq').userSetMustInput(false);
        //实施本项目优缺点设置为
        mstform.getItem('ssbxmyqd').userSetMustInput(false);
        //投标保证设置为
        mstform.getItem('tbbz').userSetMustInput(false);
        //回款来源设置为
        mstform.getItem('hkly').userSetMustInput(false);
        //保障措施设置为
        mstform.getItem('bzcs').userSetMustInput(false);
        //区域情况简介设置为
        mstform.getItem('qyqkjj').userSetMustInput(false);
        //主要竞争对手设置为
        mstform.getItem('zyjzds').userSetMustInput(false);
        //分析结论设置为
        mstform.getItem('fxjl').userSetMustInput(false);
    }
    //投融资项目跟踪ABO模式end
    */
}
/*
//保存前检测
function beforeSaveEdit() {
    //获取投融资招标预审评估表
    var mstform = Ext.getCmp('p_form0000600061_m');

    //获取附件是否勾选 1 为上传，其他情况视作未上传start
    var asr_flg = mstform.getItem('asr_flg').getValue();
    if(asr_flg == '1') {
        return true;
    } else {
        NGMsg.Info('请先上传附件');
        return false;
    }
    //获取附件是否勾选 1 为上传，其他情况视作未上传end

}
*/








