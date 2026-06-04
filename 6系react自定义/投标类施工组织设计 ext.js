 function AllReady() {
     var mstform = Ext.getCmp('p_form0000700623_m');
     var dgrid = Ext.getCmp('p_form_0000700623_d1');
     mstform.getItem('u_gclx').addListener('change', function (obj) {
         var gclx = mstform.getItem('u_gclx').getValue();
         console.log("gclx", gclx)
         if (gclx) {
            execServer('yjml', {
                phid: gclx
             }, function (res) {
                 console.log("res:", res);
                 if (res.count > 0) {
                     const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                     mstform.getItem('bill_name').setValue(data[0].extendObjects.c_name + "投标类施工组织设计");
                 }
             })
         }
     })
     console.log("dgrid.getColumn('u_ejfl_EXName'):" , dgrid.getColumn('u_ejfl_EXName').getEditor());
     dgrid.getColumn('u_ejfl_EXName').getEditor().addListener('beforetriggerclick', function () {
         var yjfl = mstform.getItem('u_gclx').getValue();
         dgrid.getColumn('u_ejfl_EXName').getEditor().setClientSqlFilter("pid = " + yjfl);
         /*
        dgrid.getColumn('u_ejfl_EXName').getEditor().setOutFilter({
           'pid': yjfl
         });
         */
     });
     dgrid.getColumn('u_sjfl_EXName').getEditor().on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
         var data = dgrid.getSelectionModel().getSelection();
         var ejfl = data[0].get('u_ejfl');
         dgrid.getColumn('u_sjfl_EXName').getEditor().setOutFilter({
             'pid': ejfl
         });
         //dgrid.getColumn('u_khywglej_name').getEditor().setOutFilter("ejbm in (select ejbm from khywfl where yjbm in (select yjbm from khywfl_yj where yjbm ='"+userhelp_1+"' )) ");
     });
 }
