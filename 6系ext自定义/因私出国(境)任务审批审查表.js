function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000000170_m');
    //出境原因是其他的时候  必输  其余可以不输入
    mstform.getItem('rbcol_1').addListener('change', function (res) {
        //var cjyy = res.lastValue.rbcol_1
        var cjyy = mstform.getItem('rbcol_1').getValue();
        mstform.getItem('textcol_7').setValue('');
        //console.log("mstform.getItem('rbcol_1').getValue():",mstform.getItem('rbcol_1').getValue());
        console.log("cjyy:",cjyy);
        if (cjyy == "2") {
            mstform.getItem('textcol_7').userSetMustInput(true);
            mstform.getItem('textcol_7').userSetReadOnly(false);
        } else {
            mstform.getItem('textcol_7').userSetMustInput(false);
            mstform.getItem('textcol_7').userSetReadOnly(true);
        }
    });
    //是否涉密人员是“是”的时候 涉密类型需要填写
    mstform.getItem('rbcol_2').addListener('change', function (res) {
        var sfsmry = mstform.getItem('rbcol_2').getValue();
        var rbcol3 = mstform.getItem('rbcol_3');
        // 正确清除单选按钮组的值
        rbcol3.reset();
        if (sfsmry === "1") {
            mstform.getItem('rbcol_3').userSetMustInput(true);
            mstform.getItem('rbcol_3').userSetReadOnly(false);
        } else {
            mstform.getItem('rbcol_3').userSetMustInput(false);
            mstform.getItem('rbcol_3').userSetReadOnly(true);
        }
    });
    // 员工信息加载函数
    //function loadEmployeeInfo() {
    mstform.getItem('empid').addListener('helpselected', function () {
        var empid = mstform.getItem('empid').getValue();
        console.log("empid:", empid);
        if (!empid) return;

        // 修改反复修改的时候会丢失数据的问题
        var params = [];
        params.push({ phid: empid });

        //execServer('p_form0000000170_ryxx', params, function (res) {
        execServer('p_form0000000170_ryxx', {
            'phid': empid
        }, (res) => {
            // 检查数据是否丢失
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            if (!res || !res.count > 0) {
                console.warn('员工信息查询返回无效数据');
                return;
            }
            if (data.length > 0) {
                var employeeData = data[0].extendObjects;

                // 更新字段
                mstform.getForm().suspendEvents();
                mstform.getItem('textcol_8').setValue(employeeData.u_sjh || '');
                mstform.getItem('ddlbcol_1').setValue(employeeData.u_xb || '');
                mstform.getItem('userhelp_4').setValue(employeeData.u_szdw || '');
                mstform.getItem('u_xrzw').setValue(employeeData.u_xrzw || '');
                mstform.getItem('userhelp_5').setValue(employeeData.gbcj || '');
                mstform.getItem('userhelp_2').setValue(employeeData.u_zzmm || '');
                mstform.getItem('userhelp_1').setValue(employeeData.u_mz || '');
                mstform.getItem('datetimecol_1').setValue(employeeData.u_csrq || '');
                mstform.getForm().resumeEvents();

                // 合并下拉框绑定操作
                var combos = [
                    mstform.getItem('userhelp_4'),
                    mstform.getItem('userhelp_5'),
                    mstform.getItem('userhelp_2'),
                    mstform.getItem('userhelp_1'),
                ];
                BatchBindCombox(combos);
            }
        });
    });
    //}

    // 加载的时候检查是否有员工ID
    // var empIdField = mstform.getItem('empid');
    // if (empIdField && empIdField.getValue()!=null && empIdField.getValue()!='') {
    //     loadEmployeeInfo();
    // }

    // // 监听变更事件
    // if (empIdField && empIdField.getValue()!=null && empIdField.getValue()!='') {
    //     empIdField.on('change', loadEmployeeInfo);
    //     console.log("监听变更事件触发");
    // }
}

function beforeSaveEdit() {
    var mstform = Ext.getCmp('p_form0000000170_m');
    if (!mstform) return false;

    // 需要验证的字段列表
    var requiredFields = [
        'checkboxcol_1', 'checkboxcol_7', 'checkboxcol_8', 'checkboxcol_2',
        'checkboxcol_9', 'checkboxcol_3', 'checkboxcol_11',
        'checkboxcol_12', 'checkboxcol_4', 'u_xgqz', 'checkboxcol_13',
        'checkboxcol_5', 'checkboxcol_14', 'checkboxcol_15', 'checkboxcol_6',
        'checkboxcol_16'
    ];

    // 检查是否至少有一个有效值
    var hasValue = false;
    for (var i = 0; i < requiredFields.length; i++) {
        var fieldName = requiredFields[i];
        var value = mstform.getForm().getValues()[fieldName];

        if (value === true || value === "true") {
            hasValue = true;
            break;
        }
        if (value === 1 || value === "1") {
            hasValue = true;
            break;
        }
        if (value && typeof value === 'string' && value.trim().length > 0) {
            hasValue = true;
            break;
        }
    }

    if (!hasValue) {
        console.error('验证失败：所有字段都为空');

        var msg = Ext.Msg.show({
            title: '保存失败',
            msg: '至少需要选择一个才能保存！',
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK,
            modal: false,
            closable: true,
            fn: function () {
                // 关闭后尝试聚焦第一个字段
                var firstField = mstform.down('#' + requiredFields[0]);
                if (firstField && firstField.isVisible()) {
                    firstField.focus();
                }
            }
        });

        // 添加校验不成功后定时
        setTimeout(function () {
            if (msg && !msg.isDestroyed) {
                msg.close();
            }
        }, 3000);

        return false;
    }

    console.log('验证通过，允许保存');
    return true;
}