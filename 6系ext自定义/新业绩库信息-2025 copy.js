function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700470_m');

    //mstform.getItem('title').hide();
    //mstform.getItem('u_yz').hide();
    //mstform.getItem('u_bj').hide();
    //mstform.getItem('custno').hide();
    //mstform.getItem('u_sgfzr').hide();
    //mstform.getItem('empid').hide();
    //mstform.getItem('remarks').hide();
    //mstform.getItem('u_xm').hide();
    mstform.getItem('u_blyjkyy').userSetMustInput(false);
    mstform.getItem('u_blyjkyy').hide();
    mstform.getItem('u_qtyy').hide();
    mstform.getItem('u_qtyy').userSetMustInput(false);
    //mstform.getItem('u_xmgn').hide();
    //所有字段名，由Ext.getCmp('p_form0000700470_m').OriginValue去除前后缀的""再删掉上方字段获得
    var map = { "u_yjml": "", "u_xm": "", "u_ejml": "", "u_sjml": "", "u_xmgn": "", "u_cbfs": "", "u_zbms": "", "numericcol_1": "", "u_sjzxje": "", "u_jaf": "", "u_sjf": "", "textcol_2": "", "textcol_4": "", "textcol_5": "", "textcol_6": "", "textcol_7": "", "u_sgfzr1": "", "u_xmjsfzr": "", "u_zbgs": "", "u_xmxx": "", "ddlbcol_1": "", "u_ywsgxkz": "", "u_ywsgtsc": "", "ddlbcol_2": "", "u_ywdwzljgjgbg": "", "ddlbcol_3": "", "ddlbcol_4": "", "ddlbcol_5": "", "u_xmzk": "", "u_hjlb": "", "u_hjmc": "", "u_htfbr": "", "u_htcbr": "", "ocode": "324191126000002", "u_lhtqc": "", "u_lhtcyqc": "", "u_lhtcydwqc": "", "u_xmyz": "", "u_yzxz": "", "u_yzls": "", "u_sjdw": "", "u_sjdwfzr": "", "u_xmsjfzrdh": "", "u_jldw": "", "textcol_11": "", "u_xmzjdh": "", "textcol_10": "", "u_zydtjzjtzmsbc": "", "u_jsnrjgmjs": "", "textcol_12": "", "userhelp_7": "", "datetimecol_1": "", "datetimecol_3": "", "userhelp_8": "", "datetimecol_4": "", "userhelp_9": "", "datetimecol_5": "", "u_xmdd": "", "u_szdsf": "", "u_szdsj": "", "u_xmgnlb": "", "u_sfcgc": "", "u_sfhzszxgc": "", "numericcol_3": "", "u_ds": "", "u_dx": "", "numericcol_4": "", "numericcol_5": "", "u_dscs": "", "u_dxcs": "", "u_jzgd": "", "u_dkkd": "", "u_zddkgjjgxs": "", "u_gjggcl": "", "u_jksd": "", "u_zddtjzmj": "", "u_ztjglx": "", "u_zpsl": "", "u_zmfs": "", "u_sfhdl": "", "u_sfhql": "", "u_sfhgd": "", "u_sfhsd": "", "u_zhgl": "", "u_dlcd": "", "u_dldj": "", "u_zdql": "", "u_qlzddkd": "", "u_xdlqldxjtmjgc": "", "u_sdcd": "", "u_gdcd": "", "u_gdcz": "", "u_gdzj": "", "u_gdcszdyq": "", "u_wscl": "", "u_glrj": "", "u_sjgc": "", "numericcol_6": "", "numericcol_7": "", "numericcol_8": "", "numericcol_9": "", "u_scnl": "", "numericcol_10": "", "u_zjrl": "", "u_dydj": "", "u_sdxlcd": "", "u_bdz": "", "u_qldj": "", "u_cdcd": "", "u_gcgmhscnl": "", "u_kr": "", "u_zjrlmw": "", "u_szgzll": "", "u_sbgd": "", "u_tlgdcd": "", "u_qlkd": "", "u_tlsdcd": "", "u_zcmj": "", "u_glxlcd": "", "u_txgdcd": "", "u_jfmj": "" };
    mstform.getItem('userhelp_9').userSetMustInput(false);
    var all = ['u_xmgnlb', 'u_sfcgc', 'u_sfhzszxgc', 'u_gjggcl', 'u_dx', 'u_ds', 'u_dscs', 'u_dxcs', 'u_jzgd', 'u_dkkd', 'u_zddkgjjgxs', 'u_jksd', 'u_zddtjzmj', 'u_ztjglx', 'u_zpsl', 'u_zmfs', 'numericcol_3', 'numericcol_4', 'numericcol_5', 'u_zhgl', 'u_dlcd', 'u_dldj', 'u_zdql', 'u_qlzddkd', 'u_xdlqldxjtmjgc', 'u_sdcd', 'u_gdcd', 'u_gdcz', 'u_gdzj', 'u_gdcszdyq', 'u_wscl', 'u_glrj', 'u_sjgc', 'numericcol_6', 'numericcol_7', 'numericcol_8', 'numericcol_9', 'u_scnl', 'numericcol_10', 'u_zjrl', 'u_dydj', 'u_sdxlcd', 'u_bdz', 'u_qldj', 'u_cdcd', 'u_gcgmhscnl', 'u_kr', 'u_zjrlmw', 'u_szgzll', 'u_sbgd', 'u_tlgdcd', 'u_qlkd', 'u_tlsdcd', 'u_zcmj', 'u_glxlcd', 'u_txgdcd', 'u_jfmj', 'u_sfhdl', 'u_sfhql', 'u_sfhgd', 'u_sfhsd'];
    console.log(all[5]);
    var fwjzgc = ['u_xmgnlb', 'u_sfcgc', 'u_sfhzszxgc', 'u_gjggcl', 'u_dx', 'u_ds', 'u_dscs', 'u_dxcs', 'u_jzgd', 'u_dkkd', 'u_zddkgjjgxs', 'u_jksd', 'u_zddtjzmj', 'u_ztjglx', 'u_zpsl', 'u_zmfs', 'numericcol_3', 'numericcol_4', 'numericcol_5'];
    var szgygc = ['u_zhgl', 'u_dlcd', 'u_dldj', 'u_zdql', 'u_qlzddkd', 'u_xdlqldxjtmjgc', 'u_sdcd', 'u_gdcd', 'u_gdcz', 'u_gdzj', 'u_gdcszdyq', 'u_wscl', 'u_sfhdl', 'u_sfhql', 'u_sfhgd', 'u_sfhsd'];

    var yjgc = ['numericcol_3', 'u_ds', 'u_dx', 'numericcol_4', 'numericcol_5', 'u_dkkd', 'u_zddkgjjgxs', 'u_jksd', 'u_zddtjzmj', 'u_ztjglx', 'u_glrj', 'u_sjgc', 'numericcol_6', 'numericcol_7', 'numericcol_8', 'numericcol_9', 'u_scnl', 'numericcol_10'];
    var dlgc = ['numericcol_3', 'u_ds', 'u_dx', 'numericcol_4', 'numericcol_5', 'u_zjrl', 'u_dydj', 'u_sdxlcd', 'u_bdz'];
    var glgc = ['u_dlcd', 'u_dldj', 'u_qldj'];
    var mhgc = ['numericcol_3', 'u_ds', 'u_dx', 'numericcol_4', 'numericcol_5', 'u_cdcd', 'u_gjggcl', 'u_ds', 'u_dx', 'u_dscs', 'u_dxcs', 'u_jzgd', 'u_dkkd'];

    var ksgc = ['numericcol_3', 'u_ds', 'u_dx', 'numericcol_4', 'numericcol_5', 'u_gcgmhscnl'];
    var slsdgc = ['u_kr', 'u_zjrlmw', 'u_szgzll', 'u_sbgd'];
    var tlgc = ['numericcol_3', 'u_ds', 'u_dx', 'numericcol_4', 'numericcol_5', 'u_tlgdcd', 'u_qlkd', 'u_tlsdcd', 'u_zcmj'];
    var syhggc = [];
    var jdgc = [];
    var txgc = ['numericcol_3', 'u_ds', 'u_dx', 'numericcol_4', 'numericcol_5', 'u_glxlcd', 'u_txgdcd', 'u_jfmj'];
    var gkyhdgc = [];
    var zhgc = ['numericcol_3', 'u_ds', 'u_dx', 'numericcol_4', 'numericcol_5'];
    var qtgc = ['numericcol_3', 'u_ds', 'u_dx', 'numericcol_4', 'numericcol_5'];
    var must = ['u_yjml', 'u_cbfs', 'u_zbms', 'numericcol_1', 'u_sjzxje', 'ddlbcol_1', 'u_ywsgxkz', 'u_ywsgtsc', 'ddlbcol_2', 'ddlbcol_3', 'ddlbcol_4', 'ddlbcol_5', 'u_xmzk', 'u_htfbr', 'u_htcbr', 'u_xmyz', 'u_yzxz', 'textcol_10', 'u_zydtjzjtzmsbc', 'u_jsnrjgmjs', 'textcol_12', 'userhelp_7', 'u_xmdd', 'u_szdsf', 'u_szdsj'];

    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        for (i = 0; i < all.length; i++) {
            mstform.getItem(all[i]).hide();
            mstform.getItem(all[i]).userSetMustInput(false);
        }
    } else if (otype == $Otype.VIEW) {
        for (i = 0; i < all.length; i++) {
            mstform.getItem(all[i]).show();
            mstform.getItem(all[i]).userSetMustInput(false);
        }
    }
    var wjgmj = ['569000000001077', '569000000001080', '569000000001083', '569000000001085', '569000000001086', '569000000001088'];

    mstform.getItem('u_sfwzqxm').addListener('change', function () {
        if (mstform.getItem('u_sfwzqxm').getValue() == '1') {
            mstform.getItem('u_zbxm').hide();
            mstform.getItem('u_zbxm').userSetMustInput(false);
            mstform.getItem('u_zbxm').userSetReadOnly(true);
            //mstform.getItem('u_zbxm').emptyText = "2020年7月之前中标项目，不需填写此项"
        } else {
            mstform.getItem('u_zbxm').show();
            mstform.getItem('u_zbxm').userSetMustInput(true);
            mstform.getItem('u_zbxm').userSetReadOnly(false);
            mstform.getItem('u_zbxm').emptyText = "下拉选项，不需手工填写"
        }

    })

    mstform.getItem('u_blyjkyy').addListener('change', function () {
        if (mstform.getItem('u_blyjkyy').getValue() == '5') {
            mstform.getItem('u_qtyy').show();
            mstform.getItem('u_qtyy').userSetMustInput(true);
        } else {
            mstform.getItem('u_qtyy').hide();
            mstform.getItem('u_qtyy').userSetMustInput(false);
        }

    })


    mstform.getItem('u_sfllyjik').addListener('change', function () {



        if (mstform.getItem('u_sfllyjik').getValue() == '2') {
            mstform.getItem('u_blyjkyy').userSetMustInput(true);
            mstform.getItem('u_blyjkyy').show();

            for (var key in map) {
                //var keystr = "'"+key+"'";
                console.log("key:" + key)
                mstform.getItem(key).userSetMustInput(false);
                mstform.getItem(key).hide();
            }
        } else {
            mstform.getItem('u_blyjkyy').userSetMustInput(false);
            mstform.getItem('u_blyjkyy').hide();
            mstform.getItem('u_qtyy').hide();
            mstform.getItem('u_qtyy').userSetMustInput(false);
            for (var key in map) {

                //var keystr = "'"+key+"'";
                mstform.getItem(key).userSetMustInput(false);
                mstform.getItem(key).show();

            }
            for (j = 0; j < must.length; j++) {
                console.log(must[j]);
                mstform.getItem(must[j]).userSetMustInput(true);
            }
            for (k = 0; k < all.length; k++) {
                console.log(all[k]);
                mstform.getItem(all[k]).hide();
                mstform.getItem(all[k]).userSetMustInput(false);
            }
        }

    })

    mstform.getItem('ddlbcol_2').addListener('change', function () {



        if ((mstform.getItem('ddlbcol_2').getValue() == '1') && (wjgmj.includes(mstform.getItem('u_yjml').getValue()) == false)) {
            mstform.getItem('userhelp_9').userSetMustInput(true);
            mstform.getItem('numericcol_4').userSetMustInput(true);
        } else {
            mstform.getItem('userhelp_9').userSetMustInput(false);
            mstform.getItem('numericcol_4').userSetMustInput(false);
        }

    })
    mstform.getItem('u_yjml').addListener('helpselected', function () {
        u_yjmlzj = mstform.getItem('u_ejml').setValue('');
        u_yjmlzj = mstform.getItem('u_sjml').setValue('');
        var u_yjmlzj = mstform.getItem('u_yjml').getValue();
        var ejml = mstform.getItem('u_ejml')                                      //帮助字段PC 赋值给pc （通用帮助可选数据据过滤示例1）
        ejml.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {    //帮助窗口打开前事件
            ejml.setOutFilter({ pid: u_yjmlzj })        //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
        });
        if (u_yjmlzj == '569000000001076') {  //	房屋建筑工程
            for (i = 0; i < all.length; i++) {
                mstform.getItem(all[i]).hide();
                mstform.getItem(all[i]).userSetMustInput(false);
            }
            for (i = 0; i < fwjzgc.length; i++) {
                mstform.getItem(fwjzgc[i]).show();
                //mstform.getItem (fwjzgc[i]).userSetMustInput(true);
                mstform.getItem('numericcol_5').userSetMustInput(true);
                mstform.getItem('u_zpsl').userSetMustInput(false);
                mstform.getItem('u_xmgnlb').userSetMustInput(false);
                mstform.getItem('u_zmfs').userSetMustInput(false);
            }
            //bc = "包括但不限于：①民用建筑（主要单体建筑名称及其特征参数，如建筑面积（㎡）、结构形式、建筑高度（m）、地下深度（m）、桩基形式、地下层数、地上层数、人防建筑面积（㎡）、医院床位数、医院级别、场馆座位数）；②工业建筑（主要单体建筑名称及其特征参数，如结构形式、建筑面积、层数、长宽高尺寸、最大单跨跨度）";
            //mstform.getItem('u_zydtjzjtzmsbc').setValue(bc);
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "";
            mstform.getItem('u_jsnrjgmjs').emptyText = "";
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "包括但不限于：①民用建筑（主要单体建筑名称及其特征参数，如建筑面积（㎡）、结构形式、建筑高度（m）、地下深度（m）、桩基形式、地下层数、地上层数、人防建筑面积（㎡）、医院床位数、医院级别、场馆座位数）；②工业建筑（主要单体建筑名称及其特征参数，如结构形式、建筑面积、层数、长宽高尺寸、最大单跨跨度）";
            mstform.getItem('u_jsnrjgmjs').emptyText = "建筑规模。建筑单体（仅描述主要建筑物）。主要功能、作用、用途。结构形式（仅写主要结构形式，最多不超过两项）。施工内容（言简意赅，用一句话描述主要的施工专业类别）。项目亮点（例：项目本身先进设计理念及概述；施工高难度；采用的先进施工技术；社会意义等）。项目获奖（如获多项奖，仅写最大奖）。";
        }
        else if (u_yjmlzj == '569000000001077') { //市政公用工程
            for (i = 0; i < all.length; i++) {
                mstform.getItem(all[i]).hide();
                mstform.getItem(all[i]).userSetMustInput(false);
            }
            for (i = 0; i < szgygc.length; i++) {
                mstform.getItem(szgygc[i]).show();
                //mstform.getItem (szgygc[i]).userSetMustInput(true);
            }
            mstform.getItem('u_sfhdl').userSetMustInput(true);
            mstform.getItem('u_sfhql').userSetMustInput(true);
            mstform.getItem('u_sfhgd').userSetMustInput(true);
            mstform.getItem('u_sfhsd').userSetMustInput(true);
            mstform.getItem('numericcol_4').userSetMustInput(false);
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "";
            mstform.getItem('u_jsnrjgmjs').emptyText = "";
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "包括但不限于：①管道（管道种类（按介质划分）；每类管道每种管径的长度、材质、压力）；②道路（道路种类（按级别划分）；道路结构形式；每类道路的设计速度、长度、宽度）；③桥梁（桥梁种类（按用途划分）；每座桥梁的结构形式、材料、总长度、单孔跨径）；④环卫工程规模等";
            mstform.getItem('u_jsnrjgmjs').emptyText = "工程主要包含道路、综合管廊、桥梁、管道、交通工程、绿化等。城市主干道XXX米、次干路XXX米、支路XXX米，路面主要结构包括混凝土路面、沥青混凝土路面、XXX等；主线综合管廊XXX米，支线综合管廊XXX米；桥梁XX座，单座桥梁总长度XXX米，单跨跨径XXX米；管道介质为XXX，管道长度XXX米。";
        }
        else if (u_yjmlzj == '569000000001078') { //冶金工程
            for (i = 0; i < all.length; i++) {
                mstform.getItem(all[i]).hide();
                mstform.getItem(all[i]).userSetMustInput(false);
            }
            for (i = 0; i < yjgc.length; i++) {
                mstform.getItem(yjgc[i]).show();
                //mstform.getItem (yjgc[i]).userSetMustInput(true);
            }
            mstform.getItem('numericcol_5').userSetMustInput(true);
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "";
            mstform.getItem('u_jsnrjgmjs').emptyText = "";
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "包括但不限于:①炼钢厂房参数（结构形式、建筑面积、层数、长宽高尺寸、最大单跨跨度、桩基形式）；②轧钢（厂房参数（结构形式、建筑面积、层数、长宽高尺寸、最大单跨跨度、桩基形式）、轧制温度（冷轧、热轧）；产品材质（碳钢、不锈钢）；产品规格（宽度、厚度、直径））；③镀锌（热浸镀锌，冷浸镀锌）；④焦化（炭化室数量（孔）、装料形式（顶装、侧装）；）⑤有色金属冶炼（产品主要参数）；⑥主要设备的重量，功率参数等";
            mstform.getItem('u_jsnrjgmjs').emptyText = "项目设计产能为XXX万吨/年；工程主要包含XX立方米高炉XX座、XX平方米烧结机XX座、XX吨转炉XX座、XX吨电炉XX座、(冷轧/热轧 )生产线XX条、镀锌生产线XX条、XX孔XX米焦炉XX座；承包内容包括地基处理、土建工程、钢结构工程、电气工程、XXX等。";
        }
        else if (u_yjmlzj == '569000000001079') { //电力工程
            for (i = 0; i < all.length; i++) {
                mstform.getItem(all[i]).hide();
                mstform.getItem(all[i]).userSetMustInput(false);
            }
            for (i = 0; i < dlgc.length; i++) {
                mstform.getItem(dlgc[i]).show();
                //mstform.getItem (dlgc[i]).userSetMustInput(true);
            }
            mstform.getItem('numericcol_5').userSetMustInput(true);
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "";
            mstform.getItem('u_jsnrjgmjs').emptyText = "";
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "包括但不限于: 单机容量（**万千瓦X**座）,发电、输电、变电、配电工程主要参数";
            mstform.getItem('u_jsnrjgmjs').emptyText = "项目为火力发电、核电工程、新能源发电工程、XXX；装机容量为XXXMW；工程主要包含XXX等单体工程；承包内容包括地基处理、土建工程、钢结构工程、电气工程、XXX等。";
        }
        else if (u_yjmlzj == '569000000001080') { //公路工程
            for (i = 0; i < all.length; i++) {
                mstform.getItem(all[i]).hide();
                mstform.getItem(all[i]).userSetMustInput(false);
            }
            for (i = 0; i < glgc.length; i++) {
                mstform.getItem(glgc[i]).show();
                //mstform.getItem (glgc[i]).userSetMustInput(true);
            }
            mstform.getItem('numericcol_4').userSetMustInput(false);
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "";
            mstform.getItem('u_jsnrjgmjs').emptyText = "";
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "包括但不限于: ①道路（道路种类（按级别划分）；道路结构形式；每类道路的设计速度、长度、宽度）；②桥梁（桥梁种类（按用途划分）；每座桥梁的结构形式、材料、总长度、单孔跨径）";
            mstform.getItem('u_jsnrjgmjs').emptyText = "工程主要包含道路、桥梁、隧道、绿化等。高速公路XXX米、一级公路XXX米、二级公路XXX米，路面主要结构包括混凝土路面、沥青混凝土路面、XXX等；桥梁XX座，单座桥梁总长度XXX米，单跨跨径XXX米；隧道长度XXX米、隧道孔径XXX米。";
        }
        else if (u_yjmlzj == '569000000001081') { //民航工程
            for (i = 0; i < all.length; i++) {
                mstform.getItem(all[i]).hide();
                mstform.getItem(all[i]).userSetMustInput(false);
            }
            for (i = 0; i < mhgc.length; i++) {
                mstform.getItem(mhgc[i]).show();
                //mstform.getItem (mhgc[i]).userSetMustInput(true);
            }
            mstform.getItem('numericcol_5').userSetMustInput(true);
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "";
            mstform.getItem('u_jsnrjgmjs').emptyText = "";
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "包括但不限于:航站楼参数（结构形式、建筑面积、层数、最大单跨跨度）、飞行区工程及其他单位工程主要参数";
            mstform.getItem('u_jsnrjgmjs').emptyText = "工程民航飞行区等级指标为XXX、年旅客吞吐量XXX万人次、货邮吞吐量XXX吨；工程主要包含XXX等单体工程；承包内容包括地基处理、土建工程、钢结构工程、电气工程、XXX等。";
        }
        else if (u_yjmlzj == '569000000001082') { //矿山工程
            for (i = 0; i < all.length; i++) {
                mstform.getItem(all[i]).hide();
                mstform.getItem(all[i]).userSetMustInput(false);
            }
            for (i = 0; i < ksgc.length; i++) {
                mstform.getItem(ksgc[i]).show();
                //mstform.getItem (ksgc[i]).userSetMustInput(true);
            }
            mstform.getItem('numericcol_5').userSetMustInput(true);
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "";
            mstform.getItem('u_jsnrjgmjs').emptyText = "";
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "包括但不限于: 产品主要参数、厂房参数（结构形式、建筑面积、层数、长宽高尺寸、最大单跨跨度、桩基形式）、主要设备参数，地下井巷、硐室及其他单位工程主要参数";
            mstform.getItem('u_jsnrjgmjs').emptyText = "项目设计产能为XXX；工程主要包含XXX等单体工程；承包内容包括地基处理、土建工程、钢结构工程、电气工程、XXX等。";
        }
        else if (u_yjmlzj == '569000000001083') { //水利水电工程
            for (i = 0; i < all.length; i++) {
                mstform.getItem(all[i]).hide();
                mstform.getItem(all[i]).userSetMustInput(false);
            }
            for (i = 0; i < slsdgc.length; i++) {
                mstform.getItem(slsdgc[i]).show();
                //mstform.getItem (slsdgc[i]).userSetMustInput(true);
            }
            mstform.getItem('numericcol_4').userSetMustInput(false);
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "";
            mstform.getItem('u_jsnrjgmjs').emptyText = "";
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "包括但不限于: 水工建筑物（坝、堤、水闸等）、水电站、水泵站及水工金属结构等各单位工程主要参数";
            mstform.getItem('u_jsnrjgmjs').emptyText = "项目装机容量为XXXMW；工程主要包含XXX等单体工程；承包内容包括地基处理、土建工程、钢结构工程、电气工程、XXX等。";
        }
        else if (u_yjmlzj == '569000000001084') { //铁路工程
            for (i = 0; i < all.length; i++) {
                mstform.getItem(all[i]).hide();
                mstform.getItem(all[i]).userSetMustInput(false);
            }
            for (i = 0; i < tlgc.length; i++) {
                mstform.getItem(tlgc[i]).show();
                //mstform.getItem (tlgc[i]).userSetMustInput(true);
            }
            mstform.getItem('numericcol_5').userSetMustInput(true);
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "";
            mstform.getItem('u_jsnrjgmjs').emptyText = "";
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "包括但不限于: ①铁路（用途、设计速度、长度）；②桥梁（桥梁种类（按用途划分）；每座桥梁的结构形式、材料、总长度、单孔跨径）";
            mstform.getItem('u_jsnrjgmjs').emptyText = "项目线路自XXX站至XXX站，铁路全长XXX公里。工程包含正线、桥梁、隧道、车站等建筑；承包范围包括地基工程、轨道铺设、电气化铁路工程、信号系统、电力系统、通信系统、XXX等。";
        }
        else if (u_yjmlzj == '569000000001085') { //石油化工工程
            for (i = 0; i < all.length; i++) {
                mstform.getItem(all[i]).hide();
                mstform.getItem(all[i]).userSetMustInput(false);
            }
            for (i = 0; i < syhggc.length; i++) {
                mstform.getItem(syhggc[i]).show();
                mstform.getItem(syhggc[i]).userSetMustInput(true);
            }
            mstform.getItem('numericcol_4').userSetMustInput(false);
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "";
            mstform.getItem('u_jsnrjgmjs').emptyText = "";
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "包括但不限于: ①管道（管道种类（按介质划分）；每类管道每种管径的长度、材质、压力）；②容器（容器种类（按介质划分）、容积、材质、压力）；③主要设备的重量，功率参数等";
            mstform.getItem('u_jsnrjgmjs').emptyText = "项目设计产能为XXX；工程主要包含XX设备、管道、容器等单体工程；XX管道（按介质划分）公称直径XX毫米、长度XX米、材质为XX、压力为XXMPa）；XX容器（按介质划分）容积XX立方米、材质为XX、压力为XXMPa；承包内容包括地基处理、土建工程、钢结构工程、电气工程、XXX等。";
        }
        else if (u_yjmlzj == '569000000001086') { //机电工程
            for (i = 0; i < all.length; i++) {
                mstform.getItem(all[i]).hide();
                mstform.getItem(all[i]).userSetMustInput(false);
            }
            for (i = 0; i < jdgc.length; i++) {
                mstform.getItem(jdgc[i]).show();
                mstform.getItem(jdgc[i]).userSetMustInput(true);
            }
            mstform.getItem('numericcol_4').userSetMustInput(false);
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "";
            mstform.getItem('u_jsnrjgmjs').emptyText = "";
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "包括但不限于: 工艺简介、设备主要参数";
            mstform.getItem('u_jsnrjgmjs').emptyText = "工程主要包含XXX等单体工程；承包内容包括机电设备安装、调试、交付使用、XXX等。";
        }
        else if (u_yjmlzj == '569000000001087') { //通信工程
            for (i = 0; i < all.length; i++) {
                mstform.getItem(all[i]).hide();
                mstform.getItem(all[i]).userSetMustInput(false);
            }
            for (i = 0; i < txgc.length; i++) {
                mstform.getItem(txgc[i]).show();
                //mstform.getItem (txgc[i]).userSetMustInput(true);
            }
            mstform.getItem('numericcol_5').userSetMustInput(true);
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "";
            mstform.getItem('u_jsnrjgmjs').emptyText = "";
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "包括但不限于: 各单项工程的功能、主要工程量，主要工程参数";
            mstform.getItem('u_jsnrjgmjs').emptyText = "工程主要包含XXX等单体工程；承包内容包括通讯设施和网络设备的安装、调试、维护、XXX等。";
        }
        else if (u_yjmlzj == '569000000001088') { //港口与航道工程
            for (i = 0; i < all.length; i++) {
                mstform.getItem(all[i]).hide();
                mstform.getItem(all[i]).userSetMustInput(false);
            }
            for (i = 0; i < gkyhdgc.length; i++) {
                mstform.getItem(gkyhdgc[i]).show();
                mstform.getItem(gkyhdgc[i]).userSetMustInput(true);
            }
            mstform.getItem('numericcol_4').userSetMustInput(false);
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "";
            mstform.getItem('u_jsnrjgmjs').emptyText = "";
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "包括但不限于航道疏浚尺度（长度、宽度、深度），防波堤，锚地及单项工程的功能、类型、主要工程量，主要工程参数等";
            mstform.getItem('u_jsnrjgmjs').emptyText = "港口工程为XXX万吨级，承包内容主要包括港口基础设施建设、港口设备安装、港口服务设施建设、XXX等。航道工程为XXX万吨级航道工程，航道全长XXX千米，承包内容主要包括航道疏浚工程、导助航工程、环境保护工程。";
        }
        else if (u_yjmlzj == '569000000001089') { //综合工程
            for (i = 0; i < all.length; i++) {
                mstform.getItem(all[i]).hide();
                mstform.getItem(all[i]).userSetMustInput(false);
            }
            for (i = 0; i < zhgc.length; i++) {
                mstform.getItem(zhgc[i]).show();
                //mstform.getItem (zhgc[i]).userSetMustInput(true);
            }
            mstform.getItem('numericcol_5').userSetMustInput(true);
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "";
            mstform.getItem('u_jsnrjgmjs').emptyText = "";
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "各单项工程均参考同类别工程的内容填写要求";
            mstform.getItem('u_jsnrjgmjs').emptyText = "工程主要包含XXX等单位工程；主要使用功能为：居住、商业服务、会议与活动、市政基础设施、园林绿化、XXX等；主要结构形式包括：框架结构、框架剪力墙结构、钢结构、钢混结构、XXX等；承包内容包括地基处理、土建工程、钢结构工程、电气工程、XXX等。";
        }
        else if (u_yjmlzj == '569000000001090') { //其它工程
            for (i = 0; i < all.length; i++) {
                mstform.getItem(all[i]).hide();
                mstform.getItem(all[i]).userSetMustInput(false);
            }
            for (i = 0; i < qtgc.length; i++) {
                mstform.getItem(qtgc[i]).show();
                //mstform.getItem (qtgc[i]).userSetMustInput(true);
            }
            mstform.getItem('numericcol_5').userSetMustInput(true);
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "";
            mstform.getItem('u_jsnrjgmjs').emptyText = "";
            mstform.getItem('u_zydtjzjtzmsbc').emptyText = "包括但不限于:主要工程量，主要工程参数";
            mstform.getItem('u_jsnrjgmjs').emptyText = "工程主要包含XXX等单体建筑；主要结构形式包括：框架结构、框架剪力墙结构、钢结构、钢混结构、XXX等；承包内容包括地基处理、土建工程、钢结构工程、电气工程、XXX等。";
        }


    })


    mstform.getItem('u_ejml').addListener('change', function () {
        mstform.getItem('u_sjml').setValue('');
        var u_ejmlzj = mstform.getItem('u_ejml').getValue();
        if (u_ejmlzj == 569000000001164) {
            mstform.getItem('u_xmgn').show();
            mstform.getItem('u_xmgn').userSetMustInput(true);
        } else {
            mstform.getItem('u_xmgn').hide();
            mstform.getItem('u_xmgn').userSetMustInput(false);
        }
        var sjml = mstform.getItem('u_sjml')                                      //帮助字段PC 赋值给pc （通用帮助可选数据据过滤示例1）
        sjml.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {    //帮助窗口打开前事件
            sjml.setOutFilter({ pid: u_ejmlzj })        //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
        });

    })




}