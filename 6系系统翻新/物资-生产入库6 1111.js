function AllReady() {

    var mstform = Ext.getCmp('KC_INKZICRK_Head');
    var Toolbar = CommButtonView.toolbar;
    var dgrid = Ext.getCmp('KC_INKZICRK_Body');
    mstform.getItem('PhidWarehouse').addListener('helpselected', function () {
        dgrid.setMustInputCol('Batchno', false);
    });
}