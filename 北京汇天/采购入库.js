function trade_AllReady() {
    var mstform = Ext.getCmp('KC_INKCGRK_Head')
    var dgrid = Ext.getCmp('KC_INKCGRK_Body')
    var dstore = dgrid.store

    // 新增时根据项目带出批次号(项目编号-YY-最后三位流水)
    // if (otype == 'add') {
    //     if (mstform.getItem('PhidTrProj').getValue()) {
    //         // 获取项目编号
    //         execServer('hqxmbh', { 'phid': mstform.getItem('PhidTrProj').getValue() }, function (res) {
    //             if (res.count == 0) return
    //             var pc_no = res.data[0].bill_no
    //             var date = new Date();
    //             var year = date.getFullYear().toString().substr(2, 2); // 获取年份后两位
    //             // 获取最后三位流水号
    //             execServer('hqlsh', { 'phid': mstform.getItem('PhidTrProj').getValue() }, function (res) {
    //                 console.log('res', res);
    //                 if (res.count == 0) return;
    //                 var no = res.data[0].num + 1;
    //                 if (no < 10) {
    //                     no = '00' + no;
    //                 } else if (no < 100) {
    //                     no = '0' + no;
    //                 } else {
    //                     no = no.toString();
    //                 }
    //                 var user_ph = pc_no + '-' + year + '-' + no;
    //                 mstform.getItem('user_ph').setValue(user_ph);
    //             });
    //         })
    //     }
    // }

    // 新增或修改时根据项目带出批次号(项目编号-YY-最后三位流水)
    if (otype == 'add' || otype == 'edit') {
        // mstform.getItem('PhidTrProj').on('helpselected', function () {
        //     if (mstform.getItem('PhidTrProj').getValue()) {
        //         // 获取项目编号
        //         execServer('hqxmbh', { 'phid': mstform.getItem('PhidTrProj').getValue() }, function (res) {
        //             if (res.count == 0) return
        //             var pc_no = res.data[0].bill_no
        //             var date = new Date();
        //             var year = date.getFullYear().toString().substr(2, 2); // 获取年份后两位
        //             // 获取最后三位流水号
        //             execServer('hqlsh', { 'phid': mstform.getItem('PhidTrProj').getValue() }, function (res) {
        //                 console.log('res', res);
        //                 if (res.count == 0) return;
        //                 var no = res.data[0].num + 1;
        //                 if (no < 10) {
        //                     no = '00' + no;
        //                 } else if (no < 100) {
        //                     no = '0' + no;
        //                 } else {
        //                     no = no.toString();
        //                 }
        //                 var user_ph = pc_no + '-' + year + '-' + no;
        //                 mstform.getItem('user_ph').setValue(user_ph);
        //             });
        //         })
        //     } else {
        //         mstform.getItem('user_ph').setValue();
        //     }
        // })

		// 自动汇总
		var autoChange = function () {
			Ext.Array.each(dstore.data.items, function (record) {
				var sum = 0;
				console.log("record------------->", record);
				var Qty = Ext.Number.from(record.data.Qty, 0);
				var user_xshsdj = Ext.Number.from(record.data.user_xshsdj, 0);
				sum = Qty * user_xshsdj;
				console.log("总额:", sum);
				record.set('user_xshsje', sum);
			});

		};

		// 监听 update: 任何字段被修改（无论是用户手动编辑，还是代码 record.set()）都会触发
		dstore.on('update', autoChange);
		// 监听 datachanged: 任何行的增加、删除、重新加载都会触发
		dstore.on('datachanged', autoChange);
    }
}