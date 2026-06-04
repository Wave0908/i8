function AllReady() {
    var mstform = Ext.getCmp('holidayForm');

    if (otype == $Otype.ADD || otype == $Otype.EDIT) {

        var userid = $appinfo.userID;

        execServer('sfjd', { 'phid': userid }, function (res) {
            //const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            if (res.count>0) {
                mstform.getItem('user_sfjd').setValue('1')
            }
            else {
                mstform.getItem('user_sfjd').setValue('2')
            }
            //mstform.getItem('user_sfjd').setValue();  

        });


    }
}

