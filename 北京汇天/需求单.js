function AllReady() {
    var mstform = Ext.getCmp('ReqPM');
    var dgrid = Ext.getCmp('ReqPD');
    console.log("mstform:", mstform);
    console.log("dgrid:", dgrid);
    var dstore = dgrid.store;
    var tbr = Ext.getCmp('toolbar')
    /*  if (tbr.get('imp_push')) {
          var fn = tbr.get('imp_push').events.click.listeners[0].fn;
          tbr.get('imp_push').un('click', fn);
          tbr.get('imp_push').on('beforeClick', function () {
  
              //检查明细是否存在符合推送条件的逻辑
  
              //返回false终止推送，ture继续推送
  
          })
          tbr.get('imp_push').on('click', function () {
              if (mstform.queryById("ChkFlg").getValue() != '1') {
                  Ext.MessageBox.alert('提示', "未审核的单据不能推送！");
                  return;
              }
              var records = 符合条件的明细;
              let griddata = GetDatatableData([], [], [], records, 'PhId');
              var push = function (schemephid) {
                  var pushdata = [
                      {
                          'containerID': "ReqPM",
                          'type': 'form',
                          'item': mstform.getFormData(),
                      },
                      {
                          'containerID': "ReqPD",
                          'type': 'grid',
                          'item': griddata,
                      }
                  ];
                  $IMPPushShcmeData(schemephid, pushdata);
              }
              var IMPPushOp = function (schemephid, containers) {
                  push(schemephid);
              };
              $IMPPushShcmeSelect(bustype, mstform.getValues(), IMPPushOp);
          })
      }*/
    //单据新增触发条件
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        mstform.getItem('PhidPc').addListener('change', function (res) {
            var PhidPc = mstform.getItem('PhidPc').getValue();
            if (PhidPc) {
                mstform.getItem('user_xsht').setOutFilter({
                    phid_pc: PhidPc
                }) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
                execServer('xqddc', {
                    pc: PhidPc
                }, function (res) {
                    console.log(res);
                    if (res.count>0) {
                        console.log("xqddc=========:",res);
                        mstform.getItem('user_shlxr').setValue(res.data[0].user_shlxr);
                        mstform.getItem('user_shlxrdh').setValue(res.data[0].user_shlxrdh);
                        mstform.getItem('user_shdz').setValue(res.data[0].user_shdz);
                    }
                });
                execServer('cxsht', {
                    pc: PhidPc
                }, function (res) {
                    console.log(res);
                    console.log("res.count:", res.count)
                    if (res.count > 0) {
                        if (res.count == 1) {
                            console.log("rrrrr");
                            mstform.getItem('user_xsht').setValue(res.data[0].phid);
                            BatchBindCombox([mstform.getItem('user_xsht')]);
                            mstform.getItem('user_khmc').setValue(res.data[0].phid_reccomp);
                            BatchBindCombox([mstform.getItem('user_khmc')]);
                            // mstform.getItem('user_shlxr').setValue(res.data[0].user_shlxr);
                            // mstform.getItem('user_shlxrdh').setValue(res.data[0].user_shlxrdh);
                            // mstform.getItem('user_shdz').setValue(res.data[0].user_shdz);
                        } else {
                            mstform.getItem('user_xsht').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
                                mstform.getItem('user_xsht').setOutFilter({
                                    phid_pc: PhidPc
                                }) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
                            });
                            //Ext.Msg.alert('提示', "该项目有多个销售合同，请手动选择！");
                        }
                    }
                });
            }
        })
        //xshtdcdw
        mstform.getItem('user_xsht').addListener('change', function (res) {
            var user_xsht = mstform.getItem('user_xsht').getValue();
            if (user_xsht) {
                execServer('xshtdcdw1', {
                    phid: user_xsht
                }, function (res) {
                    console.log(res);
                    if (res.count > 0) {
                        mstform.getItem('user_khmc').setValue(res.data[0].phid_reccomp);
                        BatchBindCombox([mstform.getItem('user_khmc')]);
                        // mstform.getItem('user_shlxr').setValue(res.data[0].user_shlxr);
                        // mstform.getItem('user_shlxrdh').setValue(res.data[0].user_shlxrdh);
                        // mstform.getItem('user_shdz').setValue(res.data[0].user_shdz);
                    }
                });
            }
        })
        // dgrid.addListener('edit', function (editor, e) {
        //     console.log("e:", e);
        //     if (e.originalValue == e.value) {
        //         return;
        //     }
        //     var a = 0;
        //     Ext.Array.each(dstore.data.items, function (record) {
        //         console.log("record:", record);
        //         console.log("record.data:", record.data);
        //         console.log("order_old_qty:", record.data.OrderOldQty);
        //         a += Ext.Number.from(record.data.OrderOldQty, 0);
        //     });
        //     console.log("剩余量:", a);
        //     mstform.getItem('user_syl').setValue(a);
        // });
        // 自动汇总剩余量函数
        var autoSumUserSyl = function () {
            var a = 0;
            Ext.Array.each(dstore.data.items, function (record) {
                a += Ext.Number.from(record.data.OrderOldQty, 0);
            });
            console.log("实时汇总剩余量:", a);
            mstform.getItem('user_syl').setValue(a);
        };

        // 监听 update: 任何字段被修改（无论是用户手动编辑，还是代码 record.set()）都会触发
        dstore.on('update', autoSumUserSyl);
        // 监听 datachanged: 任何行的增加、删除、重新加载都会触发
        dstore.on('datachanged', autoSumUserSyl);
    }
}