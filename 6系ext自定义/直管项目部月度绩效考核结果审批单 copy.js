function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700054_m');


    if (otype == $Otype.ADD) {
        var date = new Date();
        var currentMonth = date.getMonth();
        var currentYear = date.getFullYear();
        var jsMonth = 0;
        var jsYear = 0
        if (currentMonth == 0) {
            jsMonth = 12;
            jsYear = currentYear - 1;
        }
        else {
            jsMonth = currentMonth;
            jsYear = currentYear;
        }
        execServer('p_form0000700054_Getisnull', { dtm: jsMonth + 1, dty: jsYear }, function (res) {
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            if (data.length != 0) {
                Ext.Msg.alert('提示', '本月考核结果已经审批完成，请不要重复提交审批!');
                mstform.getItem('title').setValue('');
                return false;
            }
            else {
                mstform.getItem('title').setValue('直管项目部' + (jsYear).toString() + '年' + (jsMonth).toString() + '月份绩效考核结果审批表');
            }
        })



    }


};