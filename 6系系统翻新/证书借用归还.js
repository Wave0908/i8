function AllReady() {
	console.log('1111111111111111111')
	var mstform = Ext.getCmp('CertBorrowMstEdit');
	console.log('mstform==============>', mstform)
	mstform.getItem('user_fstb').on('change', function() {
		var user_fstb = mstform.getItem('user_fstb').getValue();
		console.log('user_fstb=============>', user_fstb)
		if(user_fstb == '01') {
			mstform.getItem('user_scb_tbjd').userSetReadOnly(true);
			mstform.getItem('user_scb_tbxm').userSetReadOnly(true);
			mstform.getItem('user_scb_tbjd').userSetMustInput(false);
			mstform.getItem('user_scb_tbxm').userSetMustInput(false);
		} else if(user_fstb == '02') {
			mstform.getItem('user_scb_tbjd').userSetReadOnly(false);
			mstform.getItem('user_scb_tbxm').userSetReadOnly(false);
			mstform.getItem('user_scb_tbjd').userSetMustInput(true);
			mstform.getItem('user_scb_tbxm').userSetMustInput(true);
		}
	});
}