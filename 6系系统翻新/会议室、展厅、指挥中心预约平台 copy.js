function AllReady() {
	var mstform = Ext.getCmp('formMeeting');
    if(otype == $Otype.ADD || otype == $Otype.EDIT) {
        
        mstform.getItem('user_ptldxm').setVisible(false);
        mstform.getItem('user_ptldzw').setVisible(false);
        //mstform.getItem('user_ptlddw').setVisible(false);
        mstform.getItem('user_khdw').setVisible(false);
        mstform.getItem('user_khzgzw').setVisible(false);
        mstform.getItem('user_zysx').setVisible(false);

        mstform.getItem('user_ptldxm').userSetMustInput(false);
        mstform.getItem('user_ptldzw').userSetMustInput(false);
        //mstform.getItem('user_ptlddw').userSetMustInput(false); 
        mstform.getItem('user_khdw').userSetMustInput(false); 
        mstform.getItem('user_khzgzw').userSetMustInput(false); 
        mstform.getItem('user_zysx').userSetMustInput(false); 
        
        
        mstform.getItem('PhidMeetroom').addListener('helpselected', function() {
            var phid_meetroom = mstform.getItem('PhidMeetroom').getValue();
            if(phid_meetroom == '224220823002503') {
                mstform.getItem('user_ptldxm').setVisible(true);
                mstform.getItem('user_ptldzw').setVisible(true);
                //mstform.getItem('user_ptlddw').setVisible(true);
                mstform.getItem('user_khdw').setVisible(true);
                mstform.getItem('user_khzgzw').setVisible(true);
                mstform.getItem('user_zysx').setVisible(true);

                //mstform.getItem('reminder').setVisible(false);
                mstform.getItem('reminderway').setVisible(false);
                mstform.getItem('repeattypes').setVisible(false);
                mstform.getItem('repeattimes').setVisible(false);
                mstform.getItem('advancetimes').setVisible(false);
            
                mstform.getItem('user_ptldxm').userSetMustInput(true);
                mstform.getItem('user_ptldzw').userSetMustInput(true);
                //mstform.getItem('user_ptlddw').userSetMustInput(true); 
                mstform.getItem('user_khdw').userSetMustInput(true); 
                mstform.getItem('user_khzgzw').userSetMustInput(true); 
                mstform.getItem('user_zysx').userSetMustInput(true);    
        }   
            else {
                mstform.getItem('user_ptldxm').setVisible(false);
                mstform.getItem('user_ptldzw').setVisible(false);
                //mstform.getItem('user_ptlddw').setVisible(false);
                mstform.getItem('user_khdw').setVisible(false);
                mstform.getItem('user_khzgzw').setVisible(false);
                mstform.getItem('user_zysx').setVisible(false);

               // mstform.getItem('reminder').setVisible(true);
                mstform.getItem('reminderway').setVisible(true);
                mstform.getItem('repeattypes').setVisible(true);
                mstform.getItem('repeattimes').setVisible(true);
                mstform.getItem('advancetimes').setVisible(true);
            
                mstform.getItem('user_ptldxm').userSetMustInput(false);
                mstform.getItem('user_ptldzw').userSetMustInput(false);
                //mstform.getItem('user_ptlddw').userSetMustInput(false); 
                mstform.getItem('user_khdw').userSetMustInput(false); 
                mstform.getItem('user_khzgzw').userSetMustInput(false); 
                mstform.getItem('user_zysx').userSetMustInput(false); 
        
        }
        
        });

        mstform.getItem('user_ptldxm').addListener('helpselected', function (obj) {
            var fgldphid = mstform.getItem("user_ptldxm").getValue();
            execServer('getryxx', {
                'phid': fgldphid
            }, function (res) {
                if (!Ext.isEmpty(res) && res.data[0]) {

                    mstform.getItem("user_ptldzw").setValue(res.data[0].user_xrzw); //岗位

                }
            });
        })
        
	
}
}