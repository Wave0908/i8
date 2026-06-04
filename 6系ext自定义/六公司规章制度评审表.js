//  测试规章制度评审单
function allReadyEdit() {      
    var mstform = Ext.getCmp('p_form0000700736_m');      
    
    // 定义各区块的字段集合
    const zdFields = ['u_zbjcsxqd1', 'textcol_2', 'u_hxgksxqd1', 'textcol_3'];
    const xdFields = ['u_zbjcsxqd2', 'textcol_4', 'u_hxgksxqd2', 'textcol_5'];
    const fzFields = ['u_zbjcsxqd3', 'textcol_6', 'u_hxgksxqd3', 'textcol_7'];
    
    // 添加设置字段可见性的函数
    function setVisible(fields, visible) {
        for (let i = 0; i < fields.length; i++) {
            mstform.getItem(fields[i]).setVisible(visible);
        }
    }
      
    // 设置其他区块字段为非必填的函数
    function setOtherSectionsOptional(section) {
        switch(section) {
            case 'ck_zd':
                mustInput(xdFields, false); // xd区块字段非必填
                mustInput(fzFields, false); // fz区块字段非必填
                break;
            case 'ck_xd':
                mustInput(zdFields, false); // zd区块字段非必填
                mustInput(fzFields, false); // fz区块字段非必填
                break;
            case 'ck_fz':
                mustInput(zdFields, false); // zd区块字段非必填
                mustInput(xdFields, false); // xd区块字段非必填
                break;
        }
    }

    // 更新统一的状态更新函数
    function updateFieldStates() {
        // 当 ck_zd 选中时的逻辑
        if (mstform.getItem('ck_zd').getValue()) {
            setOtherSectionsOptional('ck_zd'); // 设置其他区块字段为非必填
            const ddlbValue = mstform.getItem('ddlbcol_1').getValue();
            const isRequired = ddlbValue == 1;
            
            // 根据下拉框值设置必填和只读
            mustInput(['u_zbjcsxqd1', 'u_hxgksxqd1'], isRequired);
            readOnly(['u_zbjcsxqd1', 'u_hxgksxqd1'], !isRequired);
            
            // 设置字段可见性：非必填时隐藏这些字段
            setVisible(zdFields, isRequired);

            // 根据勾选框设置文本字段
            if (isRequired) {
                const zbjcValue = mstform.getItem('u_zbjcsxqd1').getValue();
                mustInput(['textcol_2'], zbjcValue == 1);
                readOnly(['textcol_2'], zbjcValue != 1);
                setVisible(['textcol_2'], zbjcValue == 1); // 只在需要时显示文本框
                
                const hxgkValue = mstform.getItem('u_hxgksxqd1').getValue();
                mustInput(['textcol_3'], hxgkValue == 1);
                readOnly(['textcol_3'], hxgkValue != 1);
                setVisible(['textcol_3'], hxgkValue == 1); // 只在需要时显示文本框
            } else {
                readOnly(['textcol_2', 'textcol_3'], true);
                clearFields(['u_zbjcsxqd1', 'textcol_2', 'u_hxgksxqd1', 'textcol_3']);
                mustInput(['textcol_2', 'textcol_3'], false);
            }
        } else {
            // 当区块未选中时隐藏字段
            setVisible(zdFields, false);
        }
        
        // 当 ck_xd 选中时的逻辑
        if (mstform.getItem('ck_xd').getValue()) {
            setOtherSectionsOptional('ck_xd'); // 设置其他区块字段为非必填
            const ddlbValue = mstform.getItem('ddlbcol_2').getValue();
            const isRequired = ddlbValue == 1;
            
            mustInput(['u_zbjcsxqd2', 'u_hxgksxqd2'], isRequired);
            readOnly(['u_zbjcsxqd2', 'u_hxgksxqd2'], !isRequired);
            
            // 设置字段可见性：非必填时隐藏这些字段
            setVisible(xdFields, isRequired);
            
            if (isRequired) {
                const zbjcValue = mstform.getItem('u_zbjcsxqd2').getValue();
                mustInput(['textcol_4'], zbjcValue == 1);
                readOnly(['textcol_4'], zbjcValue != 1);
                setVisible(['textcol_4'], zbjcValue == 1); // 只在需要时显示文本框
                
                const hxgkValue = mstform.getItem('u_hxgksxqd2').getValue();
                mustInput(['textcol_5'], hxgkValue == 1);
                readOnly(['textcol_5'], hxgkValue != 1);
                setVisible(['textcol_5'], hxgkValue == 1); // 只在需要时显示文本框
            } else {
                readOnly(['textcol_4', 'textcol_5'], true);
                clearFields(['u_zbjcsxqd2', 'textcol_4', 'u_hxgksxqd2', 'textcol_5']);
                mustInput(['textcol_4', 'textcol_5'], false);
            }
        } else {
            // 当区块未选中时隐藏字段
            setVisible(xdFields, false);
        }
        
        // 当 ck_fz 选中时的逻辑
        if (mstform.getItem('ck_fz').getValue()) {
            setOtherSectionsOptional('ck_fz'); // 设置其他区块字段为非必填
            const ddlbValue = mstform.getItem('ddlbcol_3').getValue();
            const isRequired = ddlbValue == 1;
            
            mustInput(['u_zbjcsxqd3', 'u_hxgksxqd3'], isRequired);
            readOnly(['u_zbjcsxqd3', 'u_hxgksxqd3'], !isRequired);
            
            // 设置字段可见性：非必填时隐藏这些字段
            setVisible(fzFields, isRequired);
            
            if (isRequired) {
                const zbjcValue = mstform.getItem('u_zbjcsxqd3').getValue();
                mustInput(['textcol_6'], zbjcValue == 1);
                readOnly(['textcol_6'], zbjcValue != 1);
                setVisible(['textcol_6'], zbjcValue == 1); // 只在需要时显示文本框
                
                const hxgkValue = mstform.getItem('u_hxgksxqd3').getValue();
                mustInput(['textcol_7'], hxgkValue == 1);
                readOnly(['textcol_7'], hxgkValue != 1);
                setVisible(['textcol_7'], hxgkValue == 1); // 只在需要时显示文本框
            } else {
                readOnly(['textcol_6', 'textcol_7'], true);
                clearFields(['u_zbjcsxqd3', 'textcol_6', 'u_hxgksxqd3', 'textcol_7']);
                mustInput(['textcol_6', 'textcol_7'], false);
            }
        } else {
            // 当区块未选中时隐藏字段
            setVisible(fzFields, false);
        }
    }

    if (otype == $Otype.ADD) {
        //mstform.getItem('title').setValue($appinfo.username + '发起的规章制度评审流程');
        mstform.getItem('ck_zd').setValue(true); 
        xdzt(false,true); 
        fzzt(false,true);
        setOtherSectionsOptional('ck_zd'); // 初始状态设置其他区块为非必填       
    }

    // 字段清空函数
    function clearFields(fields) {
        fields.forEach(field => {
            mstform.getItem(field).setValue('');
        });
    }

    function mustInput(value, attribute) {
        for (let i = 0; i < value.length; i++) { 
            mstform.getItem(value[i]).userSetMustInput(attribute);
        }
    }

    function readOnly(value, attribute) {
        for (let i = 0; i < value.length; i++) { 
            mstform.getItem(value[i]).userSetReadOnly(attribute);
        }
    }

    function setValue(value, attribute) {
        for (let i = 0; i < value.length; i++) { 
            mstform.getItem(value[i]).setValue(attribute);
        }
    }

    function zdzt(st1,st2) {
        var value1 = ['ddlbcol_1'];
        mustInput(value1, st1);

        var value2 = ['ddlbcol_1','u_zbjcsxqd1', 'u_hxgksxqd1',  'textcol_2', 'textcol_3'];
        readOnly(value2, st2);
        setValue(value2, '');
    }

    function xdzt(st1,st2) {
        var value1 = ['xdqmc','ygzzdwh' , 'ygzzdfbrq' , 'xdzynr','ddlbcol_2'];
        mustInput(value1, st1);

        var value2 = ['xdqmc', 'ck_dwh', 'ck_zjlbgh','ygzzdwh' , 'ygzzdfbrq', 'xdzynr','ddlbcol_2','u_zbjcsxqd2', 'u_hxgksxqd2','textcol_4','textcol_5'];
        readOnly(value2, st2);
        setValue(value2, '');
    }

    function fzzt(st1,st2) {
        var value1 = ['fz_ygzzdwh' , 'fz_ygzzdfbrq' ,'fz_fzyy','ddlbcol_3'];
        mustInput(value1, st1);

        var value2 = [ 'ck_fz_dwh', 'ck_fz_zjlbgh' ,'fz_ygzzdwh' , 'fz_ygzzdfbrq' ,'fz_fzyy','ddlbcol_3','u_zbjcsxqd3', 'u_hxgksxqd3','textcol_6','textcol_7'];
        readOnly(value2, st2);
        setValue(value2, '');
    }

    // 字段改变监听器
    const monitoredFields = [
        'ddlbcol_1', 'u_zbjcsxqd1', 'u_hxgksxqd1',
        'ddlbcol_2', 'u_zbjcsxqd2', 'u_hxgksxqd2',
        'ddlbcol_3', 'u_zbjcsxqd3', 'u_hxgksxqd3'
    ];
    
    monitoredFields.forEach(field => {
        mstform.getItem(field).addListener('itemchanged', function() {
            updateFieldStates();
        });
    });

    // 在复选框监听器中调用状态更新函数并增加重置功能
    function setupCheckboxListener(field, other1, other2, selfFunc, otherFunc1, otherFunc2) {
        mstform.getItem(field).addListener('itemchanged', function() {
            const isChecked = mstform.getItem(field).getValue();
            
            if (isChecked) {
                selfFunc(true, false);
                // 重置其他两个部分的字段
                otherFunc1(false, true);
                otherFunc2(false, true);
                
                mstform.getItem(other1).setValue(false);
                mstform.getItem(other2).setValue(false);
                
                // 更新字段状态
                updateFieldStates();
            } else {
                if (mstform.getItem(other1).getValue() === false && 
                    mstform.getItem(other2).getValue() === false) {
                    mstform.getItem(field).setValue(true);
                }
            }
        });
    }

    setupCheckboxListener(
        'ck_zd', 
        'ck_xd', 
        'ck_fz', 
        zdzt, 
        xdzt, 
        fzzt
    );
    
    setupCheckboxListener(
        'ck_xd', 
        'ck_zd', 
        'ck_fz', 
        xdzt, 
        zdzt, 
        fzzt
    );
    
    setupCheckboxListener(
        'ck_fz', 
        'ck_zd', 
        'ck_xd', 
        fzzt, 
        zdzt, 
        xdzt
    );

    // 初始化状态
    updateFieldStates();
}