function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700645_m');
    mstform.getItem('phid_pc').addListener('helpselected', function (obj) {
        var pc = mstform.getItem("phid_pc").getValue();
        execServer('p_form0000700645_xmgq', {
            'phid': pc
        }, function (res) {
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                mstform.getItem('u_xmmc').setValue(data1[0].extendObjects.project_name);//项目名称
                mstform.getItem('u_hte').setValue(data1[0].extendObjects.hte);//合同额
                mstform.getItem('u_htkgrq').setValue(data1[0].extendObjects.htkg);//合同开工
                mstform.getItem('u_htjgrq').setValue(data1[0].extendObjects.htjg);//合同竣工
                mstform.getItem('u_htzgq').setValue(data1[0].extendObjects.htgq);//合同工期
                mstform.getItem('u_jhkgrq').setValue(data1[0].extendObjects.sjkg);//实际开工日期
                mstform.getItem('u_jhjgrq').setValue(data1[0].extendObjects.jhjg);//计划竣工
                mstform.getItem('u_yetzhqz').setValue(data1[0].extendObjects.yztzhqz);//业主调整含签证
                mstform.getItem('longcol_1').setValue(data1[0].extendObjects.tzhzgq);//调整后总工期
                mstform.getItem('u_tzhjgrq').setValue(data1[0].extendObjects.tzhjgrq);//调整后竣工日期  
            }

        });
    });
    mstform.getItem('phid_pc').addListener('helpselected', function (obj) {
        var pc = mstform.getItem("phid_pc").getValue();
        execServer('p_form0000700645_cz', {
            'phid': pc
        }, function (res) {
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                mstform.getItem('u_ljwccz').setValue(data1[0].extendObjects.keczhs);//开累完成产值 
            }

        });
    });

    mstform.getItem('u_yetzhqz').addListener('change', function () {//计算调整后总工期=合同总工期+业主调整含签证
        mstform.getItem('longcol_1').setValue(Ext.Number.from(mstform.getItem('u_htzgq').getValue(),
            0) + Ext.Number.from(mstform.getItem('u_yetzhqz').getValue(), 0));
    });

    mstform.getItem('u_yetzhqz').addListener('change', function () {
        if (mstform.getItem('u_jhjgrq').getValue() == null) {
            var u_jhkgrq = mstform.getItem('u_jhkgrq').getValue();//实际开工日期
            var u_htzgq = mstform.getItem('u_htzgq').getValue();//合同总工期
            var u_yetzhqz = mstform.getItem('u_yetzhqz').getValue();//业主调整含签证
            if (u_jhkgrq) {
                var newdate = new Date(u_jhkgrq.setDate(u_jhkgrq.getDate() + u_yetzhqz + u_htzgq));
                mstform.getItem('u_tzhjgrq').setValue(newdate);
            }
        } else if (mstform.getItem('u_jhjgrq').getValue() != null) {
            var EndDate = mstform.getItem('u_jhjgrq').getValue();//计划竣工日期
            var u_yetzhqz = mstform.getItem('u_yetzhqz').getValue();//业主调整含签证
            console.log("EndDate:",EndDate);//2024-01-15 00:00:00
            console.log("u_yetzhqz:",u_yetzhqz);
            if (EndDate) {
                // 获取EndDate的日期部分（15）
                var endDateStr = EndDate.toString();
                var dateMatch = endDateStr.match(/-(\d{2})-(\d{2})/);
                var newEndDate = dateMatch ? parseInt(dateMatch[2], 10) : null;
                console.log("提取的日期数字:", newEndDate);
                
                // 创建一个新的日期对象，基于EndDate，并将日期设置为newEndDate + u_yetzhqz
                var newdate = new Date(EndDate);
                // 先获取EndDate的年和月
                var year = newdate.getFullYear();
                var month = newdate.getMonth();
                // 设置为新的日期：原日期数字 + 调整天数
                newdate.setDate(newEndDate + u_yetzhqz);
                console.log("调整后的日期:", newdate);
                mstform.getItem('u_tzhjgrq').setValue(newdate);
            }
        }

    });
    //计算施工进展天数
    mstform.getItem('u_jhkgrq').addListener('change', function () {//监听实际开工日期
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
    mstform.getItem('u_sgjzts').addListener('change', function () {
        mstform.getItem('u_zhtzgq').setValue(Ext.Number.from(mstform.getItem('u_sgjzts').getValue(),
            0) / Ext.Number.from(mstform.getItem('u_htzgq').getValue(), 0));
    });
    //占调整后总工期：*%（施工进展天数/调整后总工期，自动计算）
    mstform.getItem('u_sgjzts').addListener('change', function () {
        mstform.getItem('u_ztzhzgq').setValue(Ext.Number.from(mstform.getItem('u_sgjzts').getValue(),
            0) / Ext.Number.from(mstform.getItem('longcol_1').getValue(), 0));
    });
    mstform.getItem('longcol_1').addListener('change', function () {
        mstform.getItem('u_ztzhzgq').setValue(Ext.Number.from(mstform.getItem('u_sgjzts').getValue(),
            0) / Ext.Number.from(mstform.getItem('longcol_1').getValue(), 0));
    });

    //产值占比（累计完成产值/合同额）
    mstform.getItem('u_ljwccz').addListener('change', function () {
        mstform.getItem('u_czzb').setValue
            (Ext.Number.from(mstform.getItem('u_ljwccz').getValue(), 0)
                / Ext.Number.from(mstform.getItem('u_hte').getValue(), 0));
    });
    //差值（工期比-产值比）
    mstform.getItem('u_sgjzts').addListener('change', function () {
        var gqb =
            (Ext.Number.from(mstform.getItem('u_sgjzts').getValue(), 0)
                / (Ext.Number.from(mstform.getItem('u_htzgq').getValue(), 0) + Ext.Number.from(mstform.getItem('u_yetzhqz').getValue(), 0))
            );
        mstform.getItem('numericcol_1').setValue(gqb - Ext.Number.from(mstform.getItem('u_czzb').getValue(), 0));
    });
    mstform.getItem('u_czzb').addListener('change', function () {
        var gqb =
            (Ext.Number.from(mstform.getItem('u_sgjzts').getValue(), 0)
                / (Ext.Number.from(mstform.getItem('u_htzgq').getValue(), 0) + Ext.Number.from(mstform.getItem('u_yetzhqz').getValue(), 0))
            );
        mstform.getItem('numericcol_1').setValue(gqb - Ext.Number.from(mstform.getItem('u_czzb').getValue(), 0));
    });
}