function AllReady() {
    var mstform = Ext.getCmp('TendEval');
    mstform.getItem("Fieldset1753320041680").setVisible(false);
    console.log("aaaaaaa========", mstform);
    mstform.getItem('user_jyfs').addListener('change', function () {

        if (mstform.getItem('user_jyfs').getValue() == '1' || mstform.getItem('user_jyfs').getValue() == '3' || mstform.getItem('user_jyfs').getValue() == '4') {
            //法人合同
            mstform.getItem('user_sfjxztc').setVisible(false);
            mstform.getItem('user_sfjxztc').userSetMustInput(false);
            //var dstform = Ext.getCmp('Fieldset1753320041680');
            mstform.getItem("Fieldset1753320041680").setVisible(false);

        }
        else if (mstform.getItem('user_jyfs').getValue() == '2') {
            //班组合同
            mstform.getItem('user_sfjxztc').setVisible(true);
            mstform.getItem('user_sfjxztc').userSetMustInput(true);
            mstform.getItem("Fieldset1753320041680").setVisible(true);
        }

    });
}
