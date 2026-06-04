function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700707_m');
    var grid = Ext.getCmp('p_form0000700707_dgrid');
    var dstore = grid.store;
    mstform.getItem('u_gcmc').addListener('change', function() {
        var u_gcmc = mstform.getItem('u_gcmc').getValue();
        callServer('xmb', [{
                phid: u_gcmc,
            }, ],
            function(res) {
                if (res.record[0]) {
                    mstform.getItem('u_ssxmb').setValue(res.record[0].user_pc_dept);
                    BatchBindCombox([mstform.getItem('u_ssxmb')]); 
                }
            }
        );
    });




   mstform.getItem('u_gcmc').addListener('change', function() {
    var u_ssxmb = mstform.getItem('u_ssxmb').getValue();
    callServer('xmbry', [{
        'phid': u_ssxmb,
    }], function(res) {
        //console.log(res.record, 222333);
        
        if(res.status != 'ok') {
            Ext.Msg.alert('提示', 'sql语句有误');
            return false;
        } else {
            // 处理返回的记录数据
            var recordsToInsert = [];
            
            // 统一处理单个记录或数组
            var records = Array.isArray(res.record) ? res.record : [res.record];
            
            records.forEach(function(record) {
                // 创建处理后的记录对象，只包含需要的字段
                var processedRecord = {
                    u_gw: record.u_gw,
                    u_xzdbh: record.u_xzdbh,
                    u_ygxz: record.u_ygxz,
                    u_ygxz_name: record.u_ygxz_name
                };
                
                // 如果需要其他字段也可以添加到这里
                // processedRecord.其他字段 = record.其他字段;
                
                recordsToInsert.push(processedRecord);
            });
            
            // 插入处理后的记录
            recordsToInsert.forEach(function(record) {
                dstore.insert(dstore.getCount(), record);
            });
        }
    });
});
 

/*应缴纳金额、实际缴纳金额求和反填主表开始*/

      if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        grid.addListener('edit', function(editor, e) { //监听单据体编辑状态，edit-编辑；add-增行；cellclick-点击
            if (e.originalValue == e.value) {
                return;
            } //判断原值与新值是否相同
            if (e.field == 'u_yjnje' || e.field == 'u_sjjnje') { //监听qty、prc字段变化
                var arr = grid.getStore().getRange(0, dstore.getCount() - 1);
                var a = 0;
                var b = 0;
                for (var i = 0; i < dstore.getCount(); i++) {
                    var record = dstore.data.items[i];
                    a += Ext.Number.from(record.get('u_yjnje').toFixed(4), 0);//应缴纳金额
                    b += Ext.Number.from(record.get('u_sjjnje').toFixed(4), 0);//实际缴纳金额

                }
                mstform.getItem('u_yjnje').setValue(a);
                mstform.getItem('numericcol_1').setValue(b);
            };
        });
    }

/*应缴纳金额、实际缴纳金额求和反填主表结束*/

/*应缴纳金额总行数、实际缴纳金额不为0的总行数开始*/
      if (otype == $Otype.ADD || otype == $Otype.EDIT) {
         grid.addListener('edit', function(editor, e) { //监听单据体编辑状态，edit-编辑；add-增行；cellclick-点击
           if (e.originalValue == e.value) {
            return;
          } //判断原值与新值是否相同
          if (e.field == 'u_yjnje' || e.field == 'u_sjjnje') { //监听qty、prc字段变化
            var arr = grid.getStore().getRange(0, dstore.getCount() - 1);
            var a = 0;
            var b = 0;
            var totalRows = 0;  // 总行数
            var nonZeroRows = 0; // numericcol_1不为0的行数
            
            for (var i = 0; i < dstore.getCount(); i++) {
                var record = dstore.data.items[i];
                a += Ext.Number.from(record.get('u_yjnje').toFixed(4), 0);//应缴纳金额
                b += Ext.Number.from(record.get('u_sjjnje').toFixed(4), 0);//实际缴纳金额
                
                // 计算总行数
                totalRows++;
                
                // 计算numericcol_1不为0的行数
                if (Ext.Number.from(record.get('u_sjjnje'), 0) !== 0) {
                    nonZeroRows++;
                }
            }
            mstform.getItem('u_yjnje').setValue(a);
            mstform.getItem('numericcol_1').setValue(b);
            
            // 反填总行数和不为0的行数
            mstform.getItem('u_yjnrs').setValue(totalRows);
            mstform.getItem('u_sjjnrs').setValue(nonZeroRows);
        };
    });

}
/*应缴纳金额总行数、实际缴纳金额不为0的总行数结束*/
    grid.addListener('edit', function(editor, e) {
        if (e.field == 'u_yjnje' || e.field == 'u_sjjnje') {
            var record = e.record;
            // 判断 u_yjnje 和 u_sjjnje 是否相等，并设置 u_zt
            var yjnje = Ext.Number.from(record.get('u_yjnje'), 0);
            var sjjnje = Ext.Number.from(record.get('u_sjjnje'), 0);
            
            if (yjnje === sjjnje) {
                record.set('u_zt', 1);  // 相等时赋值 1
            } else {
                record.set('u_zt', 2);  // 不相等时赋值 2
            }
        };
    });


    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
      grid.addListener('edit', function(editor, e) {
         console.log("[Debug] Edit event triggered, field:", e.field); // 调试日志

        if (e.originalValue == e.value) {
            console.log("[Debug] Value unchanged, skipping.");
            return;
        }

        // 监听 u_yjnje 或 u_sjjnje 的编辑事件
        if (e.field == 'u_yjnje' || e.field == 'u_sjjnje') {
            var record = e.record;
            var yjnje = Ext.Number.from(record.get('u_yjnje'), 0);
            var sjjnje = Ext.Number.from(record.get('u_sjjnje'), 0);

            // 判断是否全部缴纳（相等则为1，否则为2）
            var ztValue = (yjnje === sjjnje) ? 1 : 2;
            record.set('u_zt', ztValue);
            console.log("[Debug] Set row u_zt to:", ztValue);

            // 更新主表状态（检查所有行的 u_zt）
            var allFullyPaid = true;
            for (var i = 0; i < dstore.getCount(); i++) {
                var row = dstore.data.items[i];
                if (Ext.Number.from(row.get('u_zt'), 0) !== 1) {
                    allFullyPaid = false;
                    break;
                }
            }

            mstform.getItem('u_zt').setValue(allFullyPaid ? 1 : 2);
            console.log("[Debug] Master u_zt set to:", allFullyPaid ? 1 : 2);
        }
    });
}

}
  