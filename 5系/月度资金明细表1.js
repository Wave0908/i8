function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700750_m');
    var pc = mstform.getItem('pc'); //帮助字段PC 赋值给pc （通用帮助可选数据据过滤示例2）
    
    // 判断是否为新增状态
    if (otype == $Otype.ADD || otype == $Otype.COPY) {
        pc.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
            //帮助窗口打开前事件
            pc.setClientSqlFilter('phid not in ( select pc from p_form0000700750_m)');
        });
    }

    u_ksny.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        //帮助窗口打开前事件
        u_ksny.setClientSqlFilter("ctype = 'GCMONTH'");
    });

    u_jsny.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        //帮助窗口打开前事件
        u_jsny.setClientSqlFilter("ctype = 'GCMONTH'");
    });

    mstform.getItem('pc').addListener('itemchanged', function () {
        mstform.getItem('pc').userSetReadOnly(true);
        
        // 获取当前选择的项目
        var selectedProject = mstform.getItem('pc').getValue();
        if (selectedProject && (otype == $Otype.ADD || otype == $Otype.COPY)) {
            // 获取当前日期的年月
            var currentDate = new Date();
            var currentYear = currentDate.getFullYear();
            var currentMonth = currentDate.getMonth() + 1; // JavaScript月份从0开始
            var currentYearMonth = currentYear + '-' + (currentMonth < 10 ? '0' + currentMonth : currentMonth);
            
            // 调用服务器端查询是否已存在相同项目和月份的记录
            execServer('checkProjectMonthExists', { 
                'project_id': selectedProject,
                'year_month': currentYearMonth 
            }, function (res) {
                try {
                    if (!res || !res.data) {
                        console.log("查询结果为空");
                        return;
                    }
                    
                    const data = JSON.parse(res.data);
                    console.log("查询结果:", data);
                    
                    // 如果存在记录，显示提示并禁用保存按钮
                    if (data && Array.isArray(data) && data.length > 0 && data[0].extendObjects && data[0].extendObjects.count > 0) {
                        Ext.Msg.alert("提示", "当前项目在本月已经创建过月度资金预算，不能重复创建！");
                        var saveBtn = Ext.ComponentQuery.query("button[itemId=save]")[0];
                        if (saveBtn) {
                            saveBtn.setDisabled(true); // 禁用保存按钮
                        }
                    }
                } catch (error) {
                    console.error("解析查询结果时出错:", error);
                }
            });
        }
    });
    
    // 如果是新增或复制状态，添加bill_dt字段的监听
    if (otype == $Otype.ADD || otype == $Otype.COPY) {
        // 假设bill_dt是日期字段
        if (mstform.getItem('bill_dt')) {
            mstform.getItem('bill_dt').addListener('change', function () {
                var selectedProject = mstform.getItem('pc').getValue();
                var billDate = mstform.getItem('bill_dt').getValue();
                
                if (selectedProject && billDate) {
                    // 从bill_dt中提取年月
                    var dateObj = new Date(billDate);
                    var year = dateObj.getFullYear();
                    var month = dateObj.getMonth() + 1; // JavaScript月份从0开始
                    var yearMonth = year + '-' + (month < 10 ? '0' + month : month);
                    
                    // 调用服务器端查询是否已存在相同项目和月份的记录
                    execServer('checkProjectMonthExists', { 
                        'project_id': selectedProject,
                        'year_month': yearMonth 
                    }, function (res) {
                        try {
                            if (!res || !res.data) {
                                console.log("查询结果为空");
                                return;
                            }
                            
                            const data = JSON.parse(res.data);
                            console.log("查询结果:", data);
                            
                            // 如果存在记录，显示提示并禁用保存按钮
                            if (data && Array.isArray(data) && data.length > 0 && data[0].extendObjects && data[0].extendObjects.count > 0) {
                                Ext.Msg.alert("提示", "当前项目在所选月份已经创建过月度资金预算，不能重复创建！");
                                var saveBtn = Ext.ComponentQuery.query("button[itemId=save]")[0];
                                if (saveBtn) {
                                    saveBtn.setDisabled(true); // 禁用保存按钮
                                }
                            } else {
                                // 如果不存在记录，启用保存按钮
                                var saveBtn = Ext.ComponentQuery.query("button[itemId=save]")[0];
                                if (saveBtn) {
                                    saveBtn.setDisabled(false); // 启用保存按钮
                                }
                            }
                        } catch (error) {
                            console.error("解析查询结果时出错:", error);
                        }
                    });
                }
            });
        }
    }
}