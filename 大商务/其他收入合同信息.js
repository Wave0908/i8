function AllReady() {

    if (otype == $Otype.ADD) {
        var mstform = Ext.getCmp('CntM3');
        console.log("mstform==", mstform);
        mstform.getItem('PhidYsfl').setValue('8280000000000012')
        BatchBindCombox([mstform.getItem('PhidYsfl')]);  
        mstform.getItem('PhidYsfl').hide();
        //     console.log("PhidYsfl11111==", PhidYsflrawValue1);
        //2025/7/26 所有模块的合同信息（采购合同、支出合同、承包合同、设备租入协议），都需要给【预算分类】字段值默认为“二次预算”，并隐藏该字段
        //mstform.getItem('PhidYsfl').setValue('二次预算');
        // var PhidYsfl = mstform.getItem('PhidYsfl');
        // console.log("PhidYsfl==", PhidYsfl);
        // var PhidYsflrawValue = mstform.getItem('PhidYsfl').rawValue;
        // console.log("PhidYsflrawValue==", PhidYsflrawValue);

        //mstform.getItem('PhidYsfl').setValue('07','二次预算');
        // mstform.getItem('PhidYsfl').addListener('change', function () { 
        //     var PhidYsflrawValue = mstform.getItem('PhidYsfl');
        //     console.log("PhidYsfl==", PhidYsflrawValue);
        // });
    }





}