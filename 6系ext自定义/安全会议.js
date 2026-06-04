//初始化函数
function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700109_m');
    //var famc = mstform.getItem('famc');
    var dgrid = Ext.getCmp('p_form0000700109_d');
    var dstore = dgrid.store;

    var arr1 = new Array();
    arr1.push({
        u_fjmc: '会议材料',
    });

    arr1.push({
        u_fjmc: '会议签到',
    });
    arr1.push({
        u_fjmc: '会议纪要',
    });
    dstore.insert(dstore.getCount(), arr1);


}
function beforeSaveEdit() {

    var mstform = Ext.getCmp('p_form0000700109_m');

    var dgrid = Ext.getCmp('p_form0000700109_d');
    var dstore = dgrid.store;

    var dgridValue = dgrid.getStore().getRange(0, dstore.getCount() - 1)
    var records = dstore.getRange();

    for (var i = 0, len = records.length; i < len; i++) {
        if (records[i].get('asr_flg') == 0) {
            NGMsg.Error('第' + [i + 1] + '行未上传附件，请上传附件');

            return false;
        }
    }
    return true;



}


