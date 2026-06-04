function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700645_m');
    mstform.getItem('pc').addListener('helpselected', function (obj) {
        var pc = mstform.getItem("pc").getValue();
        callServer('xmgq', [{
            'phid': pc
        }], function (res) {
            if (!Ext.isEmpty(res) && res.record[0]) {
                mstform.getItem('u_xmmc').setValue(res.record[0].project_name);//项目名称
                mstform.getItem('u_hte').setValue(res.record[0].hte);//合同额
                mstform.getItem('u_htkgrq').setValue(res.record[0].htkg);//合同开工
                mstform.getItem('u_htjgrq').setValue(res.record[0].htjg);//合同竣工
                mstform.getItem('u_htzgq').setValue(res.record[0].htgq);//合同工期
                mstform.getItem('u_jhkgrq').setValue(res.record[0].sjkg);//实际开工日期
                mstform.getItem('u_jhjgrq').setValue(res.record[0].jhjg);//计划竣工
                mstform.getItem('u_yetzhqz').setValue(res.record[0].yztzhqz);//业主调整含签证
                mstform.getItem('longcol_1').setValue(res.record[0].tzhzgq);//调整后总工期
                mstform.getItem('u_tzhjgrq').setValue(res.record[0].tzhjgrq);//调整后竣工日期  
            }
        
    });
});
    mstform.getItem('pc').addListener('helpselected', function (obj) {
        var pc = mstform.getItem("pc").getValue();
        callServer('cz', [{
            'phid': pc
        }], function (res) {
            if (!Ext.isEmpty(res) && res.record[0]) {
                mstform.getItem('u_ljwccz').setValue(res.record[0].keczhs);//开累完成产值 
            }
        
    });
    });

    mstform.getItem('u_yetzhqz').addListener('change', function() {//计算调整后总工期=合同总工期+业主调整含签证
        mstform.getItem('longcol_1').setValue(Ext.Number.from(mstform.getItem('u_htzgq').getValue(),
            0) + Ext.Number.from(mstform.getItem('u_yetzhqz').getValue(), 0));
    });

    mstform.getItem('u_yetzhqz').addListener('change', function() {       
        if(mstform.getItem('u_jhjgrq').getValue()==null){
            var u_jhkgrq = mstform.getItem('u_jhkgrq').getValue();//实际开工日期
            var u_htzgq = mstform.getItem('u_htzgq').getValue();//合同总工期
            var u_yetzhqz = mstform.getItem('u_yetzhqz').getValue();//业主调整含签证
            var newdate = new Date(u_jhkgrq.setDate(u_jhkgrq.getDate() + u_yetzhqz +u_htzgq));
            mstform.getItem('u_tzhjgrq').setValue(newdate);
        }else if(mstform.getItem('u_jhjgrq').getValue()!=null){
            var EndDate = mstform.getItem('u_jhjgrq').getValue();//计划竣工日期
            var u_yetzhqz = mstform.getItem('u_yetzhqz').getValue();//业主调整含签证
            console.log("EndDate:",EndDate);
            console.log("u_yetzhqz:",u_yetzhqz);
            console.log("EndDate.getDate():",EndDate.getDate());
            var newdate = new Date(EndDate.setDate(EndDate.getDate() + u_yetzhqz));
            mstform.getItem('u_tzhjgrq').setValue(newdate);
        }

    });
//计算施工进展天数
    mstform.getItem('u_jhkgrq').addListener('change', function() {//监听实际开工日期
        var bill_dt = mstform.getItem('bill_dt').getValue();
        var u_jhkgrq = mstform.getItem('u_jhkgrq').getValue();
        const date1 = new Date(bill_dt); // 第一个日期
        const date2 = new Date(u_jhkgrq); // 第二个日期
        // 计算时间戳差值（以毫秒为单位）
        const timeDifference = date1.getTime() - date2.getTime();
        // 将毫秒差值转换为天数
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        console.log(`两个日期相差 ${daysDifference} 天`);
        
        mstform.getItem('u_sgjzts').setValue(daysDifference);
    });


    //占合同总工期：**%（施工进展天数/合同总工期，自动计算）
    mstform.getItem('u_sgjzts').addListener('change', function() {
        mstform.getItem('u_zhtzgq').setValue(Ext.Number.from(mstform.getItem('u_sgjzts').getValue(),
            0) / Ext.Number.from(mstform.getItem('u_htzgq').getValue(), 0));
    });
    //占调整后总工期：*%（施工进展天数/调整后总工期，自动计算）
    mstform.getItem('u_sgjzts').addListener('change', function() {
        mstform.getItem('u_ztzhzgq').setValue(Ext.Number.from(mstform.getItem('u_sgjzts').getValue(),
            0) / Ext.Number.from(mstform.getItem('longcol_1').getValue(), 0));
    });
    mstform.getItem('longcol_1').addListener('change', function() {
        mstform.getItem('u_ztzhzgq').setValue(Ext.Number.from(mstform.getItem('u_sgjzts').getValue(),
            0) / Ext.Number.from(mstform.getItem('longcol_1').getValue(), 0));
    });

    //产值占比（累计完成产值/合同额）
    mstform.getItem('u_ljwccz').addListener('change', function() {
        mstform.getItem('u_czzb').setValue
        (Ext.Number.from(mstform.getItem('u_ljwccz').getValue(),0) 
        / Ext.Number.from(mstform.getItem('u_hte').getValue(), 0));
    });
    //差值（工期比-产值比）
    mstform.getItem('u_sgjzts').addListener('change', function() {
        var gqb=
        (Ext.Number.from(mstform.getItem('u_sgjzts').getValue(),0) 
        / (Ext.Number.from(mstform.getItem('u_htzgq').getValue(), 0)+Ext.Number.from(mstform.getItem('u_yetzhqz').getValue(), 0))
    );
        mstform.getItem('numericcol_1').setValue(gqb-Ext.Number.from(mstform.getItem('u_czzb').getValue(), 0));
    });
    mstform.getItem('u_czzb').addListener('change', function() {
        var gqb=
        (Ext.Number.from(mstform.getItem('u_sgjzts').getValue(),0) 
        / (Ext.Number.from(mstform.getItem('u_htzgq').getValue(), 0)+Ext.Number.from(mstform.getItem('u_yetzhqz').getValue(), 0))
    );
        mstform.getItem('numericcol_1').setValue(gqb-Ext.Number.from(mstform.getItem('u_czzb').getValue(), 0));
    });
}