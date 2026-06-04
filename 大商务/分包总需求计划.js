function AllReady() {

        var mstform = Ext.getCmp('LABOR_SUBC_M_Form');
        console.log("mstform==", mstform);
        mstform.getItem('PhidBudgetType').addListener('change', function () {
            console.log("PhidBudgetType=", mstform.getItem('PhidCblx'));
        });
        mstform.getItem('PhidBudgetType').setValue('8280000000000012')
        BatchBindCombox([mstform.getItem('PhidBudgetType')]);
        mstform.getItem('PhidBudgetType').hide();

}
