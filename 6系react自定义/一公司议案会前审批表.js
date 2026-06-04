$NG.AllReady(function (page,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRow, useUpdateRows, useClick, useBeforeClick, useBeforeOpen }
) {
    var mstform = $NG.getCmpApi('p_form_ygsyahqspb_m');
    console.log('mstform:', mstform);
    if (page.oType == "add") {
        console.log(111111)
        var jbr = mstform.getItem('phid_fill_psn').getValue();
        console.log('jbr:' + jbr);
        console.log("$NG.getUser():", $NG.getUser().userName);
        if (jbr) {
            $NG.execServer('p_form_ygsyahqspb_Getygxm', {
                fphid: jbr
            }, function (res) {
                if (res.count > 0) {
                    var data = JSON.parse(res.data)
                    // mstform.getItem('bill_name').setValue($NG.getUser().userName + '发起的议案会前审批流程');
                    // mstform.getItem('u_deptid').setValue(data[0].extendObjects.phid);
                    // mstform.getItem('u_deptid_EXName').setValue(data[0].extendObjects.oname);
                    //BatchBindCombox([mstform.getItem('u_deptid')]);

                    $NG.updateState((updater) => {
                        updater.data.p_form_ygsyahqspb_m.setProps({
                            bill_name: $NG.getUser().userName + '发起的议案会前审批流程',
                            u_deptid: data[0].extendObjects.phid,
                            u_deptid_EXName: data[0].extendObjects.oname,
                        });
                    });
                }
            });
        }

    }

});