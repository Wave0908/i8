function AllReady() {

    if (otype == $Otype.ADD) {
        var mstform = Ext.getCmp('TotalCostPlanM');
        console.log("mstform==", mstform);
        mstform.getItem('PhidCblx').addListener('change', function () {
            console.log("PhidCblx=", mstform.getItem('PhidCblx'));
        });
        mstform.getItem('PhidCblx').setValue('8280000000000012')
        BatchBindCombox([mstform.getItem('PhidCblx')]);
        mstform.getItem('PhidCblx').hide();
    }

}