function AllReady() {
	var mstform = Ext.getCmp('CzActM'); 
if  (otype == $Otype.ADD ){
    console.log('ADD');
    mstform.getItem('PhidCycle').addListener('change', function (e) {
        var  PhidCycle = mstform.getItem('PhidCycle').getValue();
         execServer('czzq', {
             'phid': PhidCycle
         }, function(res) {
         //按照开累来计算
         
         var resdate = "'"+res.data[0].bdt+ '-01'+ "'"
         var nian ="'"+ res.data[0].nian + '-01-01'+ "'"
         if (mstform.getItem('PhidPc').getValue()!=''){
             var  pc = mstform.getItem('PhidPc').getValue()
             var  AmtSum = mstform.getItem('AmtSum').getValue()
             var  bywccz = mstform.getItem('user_bywccz').getValue()
         if (pc!=null && pc!=''){
         execServer('bnlj', {
             'pc': pc,
             'ksdt':nian ,
             'jsdt':resdate ,
         }, function(res) {
              var resda=res.data[0]
                 mstform.getItem('user_bnwcczbhs').setValue(Ext.Number.from(resda.bnbhs, 0.00)+Ext.Number.from(AmtSum, 0.00))
                 mstform.getItem('user_bnwcczdysj').setValue(Ext.Number.from(resda.bndysj, 0.00)+Ext.Number.from(bywccz, 0.00))   

         })
        execServer('kllj', {
              'pc': pc,
              'dt': resdate
          }, function(res) {
             var resdates=res.data[0]
                 mstform.getItem('user_klwcczbhs').setValue(Ext.Number.from(resdates.klbhs, 0.00) +Ext.Number.from(AmtSum, 0.00))
                 mstform.getItem('user_klwcczdysj').setValue(Ext.Number.from(resdates.kldysj, 0.00)+Ext.Number.from(bywccz, 0.00))
          })
        }}
     })
 })//当本期产值改变的时候

 mstform.getItem('PhidPc').addListener('change', function (e) {
    var  PhidCycle = mstform.getItem('PhidCycle').getValue();
         execServer('czzq', {
             'phid': PhidCycle
         }, function(res) {
         //按照开累来计算
         
         var resdate = "'"+res.data[0].bdt+ '-01'+ "'"
         var nian ="'"+ res.data[0].nian + '-01-01'+ "'"
         if (mstform.getItem('PhidPc').getValue()!=''){
             var  pc = mstform.getItem('PhidPc').getValue()
             var  AmtSum = mstform.getItem('AmtSum').getValue()
             var  bywccz = mstform.getItem('user_bywccz').getValue()
         if (pc!=null && pc!=''){


         execServer('bnlj', {
             'pc': pc,
             'ksdt':nian ,
             'jsdt':resdate ,
         }, function(res) {
              var resda=res.data[0]
                 mstform.getItem('user_bnwcczbhs').setValue(Ext.Number.from(resda.bnbhs, 0.00)+Ext.Number.from(AmtSum, 0.00))
                 mstform.getItem('user_bnwcczdysj').setValue(Ext.Number.from(resda.bndysj, 0.00)+Ext.Number.from(bywccz, 0.00))             
         })
        execServer('kllj', {
              'pc': pc,
              'dt': resdate
          }, function(res) {
             var resdates=res.data[0]
                 mstform.getItem('user_klwcczbhs').setValue(Ext.Number.from(resdates.klbhs, 0.00) +Ext.Number.from(AmtSum, 0.00))
                 mstform.getItem('user_klwcczdysj').setValue(Ext.Number.from(resdates.kldysj, 0.00)+Ext.Number.from(bywccz, 0.00))
          })
        }}
     })
    



 })
 mstform.getItem('user_bywccz').addListener('change', function (e) {
    var  PhidCycle = mstform.getItem('PhidCycle').getValue();
     execServer('czzq', {
         'phid': PhidCycle
     }, function(res) {
     //按照开累来计算
     
     var resdate = "'"+res.data[0].bdt+ '-01'+ "'"
     var nian ="'"+ res.data[0].nian + '-01-01'+ "'"
     if (mstform.getItem('PhidPc').getValue()!=''){
         var  pc = mstform.getItem('PhidPc').getValue()
         var  bywccz = mstform.getItem('user_bywccz').getValue()
         if (pc!=''&pc!=null){

         
     execServer('bnlj', {
         'pc': pc,
         'ksdt':nian ,
         'jsdt':resdate ,
     }, function(res) {
          var resda=res.data[0]        
             mstform.getItem('user_bnwcczdysj').setValue(Ext.Number.from(resda.bndysj, 0.00)+Ext.Number.from(bywccz, 0.00))
     })
    execServer('kllj', {
          'pc': pc,
          'dt': resdate
      }, function(res) {
         var resdas=res.data[0]
             mstform.getItem('user_klwcczdysj').setValue(Ext.Number.from(resdas.kldysj, 0.00)+Ext.Number.from(bywccz, 0.00))
      })
    }else{
        Ext.Msg.alert('提示', '请选择工程项目！'); 
        mstform.getItem('user_bywccz').setValue('')
    }

}
 })
})
mstform.getItem('AmtSum').addListener('change', function (e) {
    var  PhidCycle = mstform.getItem('PhidCycle').getValue();
     execServer('czzq', {
         'phid': PhidCycle
     }, function(res) {
     //按照开累来计算
    
     var resdate = "'"+res.data[0].bdt+ '-01'+ "'"
     var nian ="'"+ res.data[0].nian + '-01-01'+ "'"
     if (mstform.getItem('PhidPc').getValue()!=''){
         var  pc = mstform.getItem('PhidPc').getValue()
         var  AmtSum = mstform.getItem('AmtSum').getValue()
         var  bywccz = mstform.getItem('user_bywccz').getValue()
     execServer('bnlj', {
         'pc': pc,
         'ksdt':nian ,
         'jsdt':resdate ,
     }, function(res) {
          var resda=res.data[0]

             mstform.getItem('user_bnwcczbhs').setValue(Ext.Number.from(resda.bnbhs,0.00)+Ext.Number.from(AmtSum,0.00))
     })
    execServer('kllj', {
          'pc': pc,
          'dt': resdate
      }, function(res) {
         var resdas=res.data[0]

             mstform.getItem('user_klwcczbhs').setValue(Ext.Number.from(resdas.klbhs,0.00)+Ext.Number.from(AmtSum,0.00))
      })
    }
 })
})//当统计周期发生改变的时候
 }
 if (otype == $Otype.EDIT){
    console.log('EDIT');
    mstform.on('dataready',function(){

    })
    mstform.getItem('PhidCycle').addListener('change', function (e) {
        var  PhidCycle = mstform.getItem('PhidCycle').getValue();
         execServer('czzq', {
             'phid': PhidCycle
         }, function(res) {
         //按照开累来计算
         var resdate = "'"+res.data[0].bdt+ '-01'+ "'"
         var nian ="'"+ res.data[0].nian + '-01-01'+ "'"
         if (mstform.getItem('PhidPc').getValue()!=''){
             var  pc = mstform.getItem('PhidPc').getValue()
             var  AmtSum = mstform.getItem('AmtSum').getValue()
             var  bywccz = mstform.getItem('user_bywccz').getValue()
         if (pc!=null && pc!=''){
         execServer('bnlj', {
             'pc': pc,
             'ksdt':nian ,
             'jsdt':resdate ,
         }, function(res) {
              var resda=res.data[0]
                 mstform.getItem('user_bnwcczbhs').setValue(Ext.Number.from(resda.bnbhs, 0.00)+Ext.Number.from(AmtSum, 0.00))
                 mstform.getItem('user_bnwcczdysj').setValue(Ext.Number.from(resda.bndysj, 0.00)+Ext.Number.from(bywccz, 0.00))

         })
        execServer('kllj', {
              'pc': pc,
              'dt': resdate
          }, function(res) {
             var resdates=res.data[0]
                 mstform.getItem('user_klwcczbhs').setValue(Ext.Number.from(resdates.klbhs, 0.00) +Ext.Number.from(AmtSum, 0.00))
                 mstform.getItem('user_klwcczdysj').setValue(Ext.Number.from(resdates.kldysj, 0.00)+Ext.Number.from(bywccz, 0.00))
          })
        }}
     })
   })//当本期产值改变的时候
   mstform.getItem('user_bywccz').addListener('change', function (e) {
    var  PhidCycle = mstform.getItem('PhidCycle').getValue();
     execServer('czzq', {
         'phid': PhidCycle
     }, function(res) {
     //按照开累来计算
     
     var resdate = "'"+res.data[0].bdt+ '-01'+ "'"
     var nian ="'"+ res.data[0].nian + '-01-01'+ "'"
     if (mstform.getItem('PhidPc').getValue()!=''){
         var  pc = mstform.getItem('PhidPc').getValue()
         var  bywccz = mstform.getItem('user_bywccz').getValue()
         execServer('bnlj', {
            'pc': pc,
            'ksdt':nian ,
            'jsdt':resdate ,
        }, function(res) {
             var resda=res.data[0]        
                mstform.getItem('user_bnwcczdysj').setValue(Ext.Number.from(resda.bndysj, 0.00)+Ext.Number.from(bywccz, 0.00))
        })
       execServer('kllj', {
             'pc': pc,
             'dt': resdate
         }, function(res) {
            var resdas=res.data[0]
                mstform.getItem('user_klwcczdysj').setValue(Ext.Number.from(resdas.kldysj, 0.00)+Ext.Number.from(bywccz, 0.00))
         })
       }else{
           Ext.Msg.alert('提示', '请选择工程项目！'); 
           mstform.getItem('user_bywccz').setValue('')
       }
 })
})
mstform.getItem('AmtSum').addListener('change', function (e) {
    var  PhidCycle = mstform.getItem('PhidCycle').getValue();
     execServer('czzq', {
         'phid': PhidCycle
     }, function(res) {
     //按照开累来计算
    
     var resdate = "'"+res.data[0].bdt+ '-01'+ "'"
     var nian ="'"+ res.data[0].nian + '-01-01'+ "'"
     if (mstform.getItem('PhidPc').getValue()!=''){
         var  pc = mstform.getItem('PhidPc').getValue()
         var  AmtSum = mstform.getItem('AmtSum').getValue()
         var  bywccz = mstform.getItem('user_bywccz').getValue()
     execServer('bnlj', {
         'pc': pc,
         'ksdt':nian ,
         'jsdt':resdate ,
     }, function(res) {
          var resda=res.data[0]

             mstform.getItem('user_bnwcczbhs').setValue(Ext.Number.from(resda.bnbhs,0.00)+Ext.Number.from(AmtSum,0.00))
     })
    execServer('kllj', {
          'pc': pc,
          'dt': resdate
      }, function(res) {
         var resdas=res.data[0]

             mstform.getItem('user_klwcczbhs').setValue(Ext.Number.from(resdas.klbhs,0.00)+Ext.Number.from(AmtSum,0.00))
      })
    }
 })
})//当统计周期发生改变的时候





 }
}
