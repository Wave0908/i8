function AllReady() {
	var mstform = Ext.getCmp('DimDetailInfo');
	/*根据离职员工字段自动带出员工类型字段start*/
	if (otype == $Otype.ADD || otype == $Otype.EDIT || otype == $Otype.VIEW) {
		mstform.getItem('PhIdEmp').addListener('helpselected', function () {
			var phid = mstform.getItem('PhIdEmp').getValue();
			execServer('yglx', {
				'phid': phid
			}, function (res) {
				mstform.getItem('user_yglx').setValue(res.data[0].c_name);
			});
			execServer('gbcj', {
				'phid': phid
			}, function (res) {
				mstform.getItem('user_gbcj').setValue(res.data[0].phid);
				BatchBindCombox([mstform.getItem('user_gbcj')]);
			});
			execServer('sfcyyjzs', {
				'phid': phid
			}, function (res) {
				console.log(res)
				if (res.data.length != 0) {
					mstform.getItem('user_sfcyyj').setValue('1');
				} else {
					mstform.getItem('user_sfcyyj').setValue('2');
				}
			});

		});
		/*根据离职员工字段自动带出员工类型字段end*/

		//离职原因为其它原因时，是否人员优化显示且必填
		mstform.getItem('DimReason').addListener('change', function () {
			if (mstform.getItem('DimReason').getValue() == '224220507000018') {
				mstform.getItem('user_sfryyh').show();
				mstform.getItem('user_sfryyh').userSetMustInput(true);
			} else {
				mstform.getItem('user_sfryyh').hide();
				mstform.getItem('user_sfryyh').userSetMustInput(false);
			}
		});
	}

	if (otype == $Otype.EDIT || otype == $Otype.VIEW) {
		mstform.on('dataready', function () {
			BatchBindCombox([mstform.getItem('user_gbcj')]);
		});
	}
}