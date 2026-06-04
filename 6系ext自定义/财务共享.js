function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700636_m');
    var grid = Ext.getCmp('p_form0000700636_d');
    // mstform.getItem('title').setVisible(false);
    var dstore = grid.store;
    dstore.insert(dstore.getCount(),
        [{
            u_fjmc: '附件'
        },]);


    /*mstform.getItem('u_sfyzwkdszr').on('change', function() {
         if(mstform.getItem('u_sfyzwkdszr').getValue() == '2') {
              Ext.Msg.alert('提示', '选择否不允许保存');
              mstform.getItem('u_sfyzwkdszr').setValue('');
              return false
           }
       });*/


    mstform.getItem('u_gysdwmc').addListener('helpselected', function () {
        var u_gysdwmc = mstform.getItem('u_gysdwmc').getValue();
        execServer('p_form0000700636_xx', {
            phid: u_gysdwmc,
        },
            function (res) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (res.count > 0) {
                    mstform.getItem('u_dwbh').setValue(data[0].extendObjects.compno);
                    mstform.getItem('u_dwsx').setValue(data[0].extendObjects.person_flg);
                    mstform.getItem('u_tyshxydm').setValue(data[0].extendObjects.unisocialcredit);
                    mstform.getItem('remarks').setValue(data[0].extendObjects.remarks);
                }
            }
        );
    });


}


function beforeSaveEdit() {

    var mstform = Ext.getCmp('p_form0000700636_m');
    //var bytq = mstform.getItem('u_ljts').getValue();
    var dgrid = Ext.getCmp('p_form0000700636_d');
    var dstore = dgrid.store;
    var u_sfqht = mstform.getItem('u_sfqht').getValue();
    var dgridValue = dgrid.getStore().getRange(0, dstore.getCount() - 1)
    var records = dstore.getRange();
    console.log(dgridValue);
    console.log(records.length);
    if (records[0].get('asr_flg') == 0 && records[0].get('u_fjmc') == "附件" && u_sfqht == '1') {
        NGMsg.Error('未上传附件，请上传附件');
        return false
    } else {
        return true
    }
}

// function allReadyEdit() {
//     var mstform = Ext.getCmp('p_form0000700636_m');
//     var grid = Ext.getCmp('p_form0000700636_dgrid');
//     mstform.getItem('title').setVisible(false);
//     var dstore = grid.store;
//     dstore.insert(dstore.getCount(),
//         [{
//             u_fjmc: '附件'
//         },]);


//     /*mstform.getItem('u_sfyzwkdszr').on('change', function() {
//          if(mstform.getItem('u_sfyzwkdszr').getValue() == '2') {
//               Ext.Msg.alert('提示', '选择否不允许保存');
//               mstform.getItem('u_sfyzwkdszr').setValue('');
//               return false
//            }
//        });*/


//     mstform.getItem('u_gysdwmc').addListener('helpselected', function () {
//         var u_gysdwmc = mstform.getItem('u_gysdwmc').getValue();
//         callServer('xx', [{
//             phid: u_gysdwmc,
//         },],
//             function (res) {
//                 if (res.record[0]) {
//                     mstform.getItem('u_dwbh').setValue(res.record[0].compno);
//                     mstform.getItem('u_dwsx').setValue(res.record[0].person_flg);
//                     mstform.getItem('u_tyshxydm').setValue(res.record[0].unisocialcredit);
//                     mstform.getItem('remarks').setValue(res.record[0].remarks);
//                 }
//             }
//         );
//     });


// }


// function beforeSaveEdit() {

//     var mstform = Ext.getCmp('p_form0000700636_m');
//     //var bytq = mstform.getItem('u_ljts').getValue();
//     var dgrid = Ext.getCmp('p_form0000700636_dgrid');
//     var dstore = dgrid.store;
//     var u_sfqht = mstform.getItem('u_sfqht').getValue();
//     var dgridValue = dgrid.getStore().getRange(0, dstore.getCount() - 1)
//     var records = dstore.getRange();
//     console.log(dgridValue);
//     console.log(records.length);
//     if (records[0].get('asr_flg') == 0 && records[0].get('u_fjmc') == "附件" && u_sfqht == '1') {
//         NGMsg.Error('未上传附件，请上传附件');
//         return false
//     } else {
//         return true
//     }
// }