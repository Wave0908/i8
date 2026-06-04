
function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700608_m');
    var dgrid = Ext.getCmp('p_form0000700608_d');
    var dstore = dgrid.store;

    dgrid.addListener('edit', function (editor, e) {
        if (e.originalValue == e.value) {
            return;
        }

        var record = e.record;

        // 原有的计算逻辑
        if (e.field == 'u_gcl' || e.field == 'u_yhtsrdj' || e.field == 'u_yhtsrhj' || e.field == 'u_cxqcbdj' || e.field == 'u_cxqcbhj'
            || e.field == 'u_cxqyk' || e.field == 'u_cxqsyl' || e.field == 'u_cxhgcl' || e.field == 'u_cxhsrdj' || e.field == 'u_cxhsrhj'
            || e.field == 'u_cxhcbdj' || e.field == 'u_cxhcbhj' || e.field == 'u_cxhyk' || e.field == 'u_cxhsyl' || e.field == 'u_chxy' || e.field == 'u_zjzj') {

            // 使用修正后的单价重新计算合价（如果需要）
            record.set('u_yhtsrhj', Ext.Number.from(record.get('u_gcl'), 0) * Ext.Number.from(record.get('u_yhtsrdj'), 0));//原合同收入合价=工程量*原合同收入单价
            record.set('u_cxqyk', Ext.Number.from(record.get('u_yhtsrhj'), 0) - Ext.Number.from(record.get('u_cxqcbhj'), 0));  //创效前盈亏=原合同收入合价-创效前成本合价

            //================================================新增计算创效前单价Start=============================================
            // 创效前成本单价计算添加除零保护:创效前成本单价=创效前成本合价/工程量
            // var gcl = Ext.Number.from(record.get('u_gcl'), 0);
            // if (gcl !== 0) {
            //     record.set('u_cxqcbdj', Ext.Number.from(record.get('u_cxqcbhj'), 0) / gcl);
            // } else {
            //     record.set('u_cxqcbdj', 0);
            // }
            //================================================新增计算创效前单价End=============================================

            // 收益率计算添加除零保护
            var yhtsrhj = Ext.Number.from(record.get('u_yhtsrhj'), 0);
            if (yhtsrhj !== 0) {
                record.set('u_cxqsyl', Ext.Number.from(record.get('u_cxqyk'), 0) / yhtsrhj);  //创效前收益率=创效前盈亏/原合同收入合计
            } else {
                record.set('u_cxqsyl', 0);
            }

            record.set('u_cxhsrhj', Ext.Number.from(record.get('u_cxhgcl'), 0) * Ext.Number.from(record.get('u_cxhsrdj'), 0));
            record.set('u_cxhyk', Ext.Number.from(record.get('u_cxhsrhj'), 0) - Ext.Number.from(record.get('u_cxhcbhj'), 0));

            // 创效后收益率计算添加除零保护
            var cxhsrhj = Ext.Number.from(record.get('u_cxhsrhj'), 0);
            if (cxhsrhj !== 0) {
                record.set('u_cxhsyl', Ext.Number.from(record.get('u_cxhyk'), 0) / cxhsrhj);
            } else {
                record.set('u_cxhsyl', 0);
            }

            record.set('u_chxy', Ext.Number.from(record.get('u_cxhyk'), 0) - Ext.Number.from(record.get('u_cxqyk'), 0));
            record.set('u_zjzj', Ext.Number.from(record.get('u_cxhsrhj'), 0) - Ext.Number.from(record.get('u_yhtsrhj'), 0));
        }

        // 汇总计算
        var sumchxy = 0;
        var countlxsl = dstore.getCount();
        console.log(countlxsl);
        for (i = 0; i < countlxsl; i++) {
            sumchxy += Ext.Number.from(dstore.getAt(i).get('u_chxy'), 0);
        }
        sumchxywy = sumchxy * 0.0001;
        mstform.getItem('u_sxcxje').setValue(sumchxywy);
        mstform.getItem('u_wclxgs').setValue(countlxsl);
    });

    // mstform.on('dataready', function () {
    //     var pc = mstform.getItem('phid_pc').getValue();
    //     console.log('变化的项目', pc);
    //     // 新增：通过项目名称过滤二次经营立项申请
    //     if (pc) {
    //         // 原有的合同编号带出功能
    //         execServer('p_form0000700608_htbm', { 'pc': pc }, function (res) {
    //             console.log('pc=================>', mstform.getItem('pc'))
    //             console.log(res)
    //             if (res.count == 0) return;
    //             const data = JSON.parse(res.data);
    //             if (data.length == 0) return;
    //             console.log(data[0])
    //             if (!Ext.isEmpty(res) && data[0]) {
    //                 mstform.getItem("u_htbm").setValue(data[0].extendObjects.cnt_no);
    //             }
    //         });

    //         mstform.getItem('u_ecjylxsq').setOutFilter({
    //             phid_pc: pc
    //         });
    //     }
    // });

    mstform.getItem('phid_pc').addListener('helpselected', function (obj) {
        var pc = mstform.getItem('phid_pc').getValue();
        console.log('变化的项目', pc);
        // 新增：通过项目名称过滤二次经营立项申请
        if (pc) {
            // 原有的合同编号带出功能
            execServer('p_form0000700608_htbm', { 'pc': pc }, function (res) {
                console.log('00000000000000000000000');
                console.log(res)
                if (res.count == 0) return;
                const data = JSON.parse(res.data);
                if (data.length == 0) return;
                console.log(data[0])
                if (!Ext.isEmpty(res) && data[0]) {
                    mstform.getItem("u_htbm").setValue(data[0].extendObjects.cnt_no);
                }
            });

            mstform.getItem('u_ecjylxsq').setOutFilter({
                phid_pc: pc
            });
        }
    });

    /*sql语句-项目信息带出合同编号 放在数据注册里面，名称为"htbm"
    
        select
        cnt_no
        from 
        project_table pt
        where pt.phid=@pc*/

}