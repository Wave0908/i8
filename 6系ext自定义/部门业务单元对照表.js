function allReadyEdit() {
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        var mstform = Ext.getCmp('p_form0000000217_m');
        var dgrid = Ext.getCmp('p_form0000000217_d');
        var dstore = dgrid.store;
        mstform.getItem('bill_name').setValue('部门业务单元推送表');
        var zz = mstform.getItem('phid_org').getValue();
        console.log("first zz:",zz);
        mstform.getItem('phid_org').addListener('change', function () {
            zz = mstform.getItem('phid_org').getValue();
            console.log("zz:",zz);
        });
        //console.log(zz);
        //表体通用帮助过滤
        console.log("dgrid.getColumn('xzd_bmmc_EXName'):", dgrid.getColumn('xzd_bmmc_EXName'));
        dgrid.getColumn('xzd_bmmc_EXName').getEditor().on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
            //var cc=mstform.getItem('zclx').getValue();
            dgrid.getColumn('xzd_bmmc_EXName').getEditor().setOutFilter({
                parent_orgid: mstform.getItem('phid_org').getValue()
            });
        })
        dgrid.addListener('edit', function (editor, e) { //监听单据体编辑状态，edit-编辑；add-增行；cellclick-点击
            // if (e.originalValue == e.value) {
            //     return;
            // }
            var da = dgrid.getSelectionModel().getSelection(); //获取当前选中行
            var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
            if (e.field == 'xzd_bmmc') { //监听qty、prc字段变化
                var record = e.record;
                var data = dgrid.getSelectionModel().getSelection(); //获取当前选中行
                var xzd_bm = data[0].get('xzd_bmmc'); //获取当前选中行某个字段值
                var xzd_sjbm;
                //console.log(xzd_bm);
                //获取部门编码
                execServer('p_form0000000217_xzd_bm', {
                    'A': xzd_bm
                }, function (res) {
                    if (res.count > 0) {
                        const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        //console.log(res.ocode);
                        record.set('xzd_bmbm', data1[0].extendObjects.ocode);
                        //record.set('ywdybm',res.record[0].ocode)
                        //console.log(res.record.length());
                        xzd_sjbm = data1[0].extendObjects.ocode;
                    }

                });
                //获取上级部门编码
                execServer('p_form0000000217_xzd_sjbm', {
                    'B': xzd_sjbm
                }, function (res) {
                    if (res.count > 0) {
                        const data2 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        record.set('xzd_sjbm', data2[0].extendObjects.parent_deptno);
                    }
                    //console.log(res.ocode);

                });

            };

            if (dstore.getCount() > 0) {
                mstform.getItem('phid_org').userSetReadOnly(true);
            } else {
                mstform.getItem('phid_org').userSetReadOnly(false);
            }

        });
        //浪潮业务单元编码填充
        dgrid.getColumn('lc_ywdy_EXName').getEditor().addListener('helpselected', function () {

            var data = dgrid.getSelectionModel().getSelection();
            var lc_ywdy = data[0].get('lc_ywdy'); //lc_ywdybm
            console.log(lc_ywdy);
            execServer('p_form0000000217_lc_ywdybm', {
                'id': lc_ywdy
            }, function (res) {
                if (res.count > 0) {
                    const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    data[0].set('lc_ywdybm', data1[0].extendObjects.dwbh);
                }
            });
        })
        //浪潮账套名称过滤
        dgrid.getColumn('lc_ztmc_EXName').getEditor().on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
            execServer('p_form0000000217_xzd_bm', {
                'A': mstform.getItem('phid_org').getValue()
            }, function (res) {
                if (res.count > 0) {
                    const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    //console.log(res.record[0].ocode);
                    //record.set('xzd_sjbm',res.record[0].parent_deptno);
                    dgrid.getColumn('lc_ztmc_EXName').getEditor().setOutFilter({
                        pm_zzbm: data1[0].extendObjects.ocode
                    });
                }

            });
        })
        //浪潮业务单元过滤		
        dgrid.getColumn('lc_ywdy_EXName').getEditor().on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
            var data = dgrid.getSelectionModel().getSelection(); //获取当前选中行
            var yy = data[0].get('lc_ztmc'); //获取当前选中行某个字段值
            //console.log(yy);
            if (yy) {
                execServer('p_form0000000217_lc_ywdy', {
                    'C': yy
                }, function (res) {
                    if (res.count > 0) {
                        const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        //console.log(res.record[0].ztbm);
                        //record.set('xzd_sjbm',res.record[0].parent_deptno);
                        dgrid.getColumn('lc_ywdy_EXName').getEditor().setOutFilter({
                            sjjg: data1[0].extendObjects.ztbm
                        });
                    }

                });
            }

        })

        //引用新增组织数据
        var Toolbar = Ext.getCmp('toolbar');
        //console.log(Toolbar);
        Toolbar.insert(1, {
            itemId: "yy_xzbm",
            text: "引入新增部门",
            width: this.itemWidth,
            iconCls: "icon-AddRow "
        })
        Toolbar.items.get('yy_xzbm').on('click', function () {
            var zzbm;
            console.log("zz:", zz);
            execServer('p_form0000000217_xzd_zzbm', {
                'D': mstform.getItem('phid_org').getValue()
            }, function (res) {
                if (res.count > 0) {
                    const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log("p_form0000000217_xzd_zzbm data1:", data1);
                    zzbm = data1[0].extendObjects.ocode;
                    console.log("zzbm:", zzbm);
                    execServer('p_form0000000217_yy_xzbm', {
                        'E': zzbm
                    }, function (res) {
                        const data2 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        console.log("p_form0000000217_yy_xzbm data2:", data2);
                        if (res.status != 'success') { //判断取数状态
                            Ext.Msg.alert('提示', '服务端取数失败');
                            return;
                        } else if (data2.length == 0) { //判断数组行数
                            Ext.Msg.alert('提示', '目前所属组织下没有新增部门需要引入');
                            return;
                        } else {
                            mstform.getItem('phid_org').userSetReadOnly(true);
                            //dstore.removeAll(); //清除单据体内所有数据
                            for (let i = 0; i < data2.length; i++) {
                                console.log("data2[i].extendObjects原始数据:", data2[i].extendObjects);
                                // 处理extendObjects中的字段名，将exname后缀改为EXName后缀
                                let processedObj = {};
                                for (let key in data2[i].extendObjects) {
                                    if (key.endsWith('_exname')) {
                                        // 替换exname为EXName
                                        let newKey = key.replace(/_exname$/, '_EXName');
                                        processedObj[newKey] = data2[i].extendObjects[key];
                                    } else {
                                        processedObj[key] = data2[i].extendObjects[key];
                                    }
                                }
                                console.log("处理后的数据:", processedObj);
                                dstore.insert(dstore.getCount(), processedObj); //将处理后的数据插入到单据体
                            }
                        }
                    });
                    //console.log(res.record[0].ocode);
                    //record.set('xzd_sjbm',res.record[0].parent_deptno);
                    //dgrid.getColumn('lc_ywdy_name').getEditor().setOutFilter({sjjg:res.record[0].ztbm});
                }
            });
        })

        /*根据类型名称带出类型标志start*/
        dgrid.addListener('edit', function (editor, e) {
            // if (e.originalValue == e.value) {
            //     return;
            // }
            if (e.field == 'lxmc') {
                var record = e.record;
                if (record.data.lxmc == '1') {
                    record.set('lc_lxbz', 1);
                } else if (record.data.lxmc == '2') {
                    record.set('lc_lxbz', 2);
                }
            };
        });
        /*根据类型名称带出类型标志end*/
    }
}