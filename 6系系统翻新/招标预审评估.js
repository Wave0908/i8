function AllReady(){
    var mstform = Ext.getCmp('TendChkM');
      mstform.getItem('PhidPc').addListener('helpselected', function() {
  mstform.getItem('Title').setValue(mstform.getItem('PhidPc').getRawValue()+'投标预审评估');
      });
  
}