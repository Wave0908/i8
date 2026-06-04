function allReadyEdit() {

    var mstform = Ext.getCmp('p_form0000000036_m');

    mstform.getItem('title').setVisible(false);
    mstform.getItem('amt').setVisible(false);
    mstform.getItem('pc').addListener('helpselected', function () {
        var pc = mstform.getItem('pc').getValue();

        callServer('xmdz', [{
            'phid': pc
        }], function (res) {
            mstform.getItem('gcdd').setValue(res.record[0].project_address);
        });

    })

    mstform.getItem('kgrq').addListener('change', function () {
        var kgrq = mstform.getItem('kgrq').getValue();
        var jgrq = mstform.getItem('jgrq').getValue();

        var gq = GetNumberOfDays(kgrq, jgrq)

        mstform.getItem('gq').setValue(gq);
    });

    mstform.getItem('jgrq').addListener('change', function () {
        var kgrq = mstform.getItem('kgrq').getValue();
        var jgrq = mstform.getItem('jgrq').getValue();
        var gq = GetNumberOfDays(kgrq, jgrq)

        mstform.getItem('gq').setValue(gq);

    });

    function GetNumberOfDays(date1, date2) { //获得天数
        //date1：开始日期，date2结束日期
        var a1 = Date.parse(new Date(date1));
        var a2 = Date.parse(new Date(date2));
        var day = parseInt((a2 - a1) / (1000 * 60 * 60 * 24)); //核心：时间戳相减，然后除以天数
        return day
    };

    if (otype == $Otype.ADD) {
        mstform.getItem('textcol_3').setValue("1、场地情况：" + "\n" + "2、临时设施设置情况：	" + "\n" + "3、现场机械配置：" + "\n" + "4、现场生活区设置：")
        mstform.getItem('textcol_8').setValue("1、□招标人不集中组织，由投标人自行踏勘	" + "\n" + "2、□勘察现场时间：招标人将于   年   月   日    时，集中地点：	")
        mstform.getItem('textcol_7').setValue("1、时间：    年    月    日    时    分。" + "\n" + "2、□地点：	" + "\n" + "3、□在中国五矿集团有限公司采购电子商务平台上开标。")
        mstform.getItem('textcol_9').setValue("1、联系人：                   电 话：")

    }
    mstform.getItem('userhelp_3').addListener('helpselected', function () {
        var userhelp_3 = mstform.getItem('userhelp_3').getValue();
        //带入表头信息
        callServer('gcmc', [{
            'phid': userhelp_3
        }],
            function (res) {
                console.log(res)
                mstform.getItem('textcol_12').setValue(res.record[0].project_name);//项目名称
                mstform.getItem('textcol_13').setValue(res.record[0].textcol_1);//分包工程名称
                mstform.getItem('textcol_14').setValue(res.record[0].u_zbfwjjmhf);//招标范围及界面
                mstform.getItem('textcol_15').setValue(res.record[0].numericcol_1);//标段数量
                mstform.getItem('textcol_16').setValue(res.record[0].u_zzdjyq);//资质等级要求
                mstform.getItem('textcol_18').setValue(res.record[0].u_gbdgcl);//各标段工程量
                mstform.getItem('textcol_17').setValue(res.record[0].u_jcsj);//进场时间
                mstform.getItem('textcol_23').setValue(res.record[0].cgfs);//采购方式
                mstform.getItem('textcol_19').setValue(res.record[0].u_cgsj);//采购时间
                mstform.getItem('textcol_24').setValue(res.record[0].jjfs);//计价方式
                mstform.getItem('numericcol_5').setValue(res.record[0].numericcol_2);//预计收入（万元）
                mstform.getItem('numericcol_4').setValue(res.record[0].u_zghte);//暂估合同额（万元）
                mstform.getItem('numericcol_6').setValue(res.record[0].u_yjsyl);//预计收益率
                mstform.getItem('textcol_20').setValue(res.record[0].u_jgcmc);//甲供材名称
                mstform.getItem('textcol_21').setValue(res.record[0].textcol_3);//暂估材料名称
                mstform.getItem('textcol_22').setValue(res.record[0].textcol_2);//甲供机械名称
            });
    });

}




