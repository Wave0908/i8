function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700755_m');
    var dgrid = Ext.getCmp('p_form0000700755_dgrid');
    var dstore = dgrid.store;
    var u_xmqzqdj = mstform.getItem('u_xmqzqdj') // 帮助字段PC 赋值给pc （通用帮助可选数据据过滤示例2）
    var u_ksny = mstform.getItem('u_ksny') // 开始年月
    var u_jsny = mstform.getItem('u_jsny') // 结束年月
    var u_version = mstform.getItem('u_version') // 变更版本
    var pc = mstform.getItem('pc');


    var toolbar = Ext.getCmp('toolbar'); // 获取工具栏


    /**项目过滤 */
    u_xmqzqdj.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        //帮助窗口打开前事件
        u_xmqzqdj.setClientSqlFilter('phid not in ( select u_xmqzqdj from p_form0000700755_m where ischeck = 0)');
    });

    if (otype == $Otype.ADD) {
        // 项目选择后只读
        mstform.getItem('u_xmqzqdj').addListener('itemchanged', function () {
            mstform.getItem('u_xmqzqdj').userSetReadOnly(true);
        });

        /**测算表选择后填入新的版本变更 */
        mstform.getItem('u_xmqzqdj').addListener('change', function () {
            console.log('u_xmqzqdj.value===================>', u_xmqzqdj.value);
            // 获取预算资金变更表的版本号
            execServer('hqyszjbgbdbbh', { 'u_xmqzqdj': u_xmqzqdj.value }, function (res) {
                if (res.count == 0) {
                    u_version.setValue(1.0);
                } else {
                    var version = ++res.data[0].u_version;
                    u_version.setValue(version);
                }
            });

            execServer('dcxmqzqzjcsmxbsj', { 'u_xmqzqdj': u_xmqzqdj.value }, function (res) {
                if (res.count > 0) {
                    const data = res.data;
                    console.log('data=====================>', data)
                    console.log('pc=================', pc);
                    mstform.getItem('pc').setValue(data[0].pc);
                    BatchBindCombox([mstform.getItem('pc')]);

                    // 获取项目是否有未审核单据
                    execServer('cxxmsfywshddj', { 'pc': mstform.getItem('pc').value }, function (res) {
                        if (res.count != 0) {
                            Ext.MessageBox.confirm('提示', '当前项目有未审核的变更单,请先通过审核', function (e) {
                                console.log("mstform.getItem('pc')==============", mstform.getItem('pc'))
                                var save = toolbar.get('save');
                                console.log('save=================>', save);
                                save.disabled = true;
                            });
                            return;
                        }
                    });

                    var arr = new Array();
                    for (let index = 0; index < res.count; index++) {
                        arr.push({
                            u_tjzq: data[index].u_tjzq,
                            u_tjzq_name: data[index].cname,
                            u_jelx: data[index].u_jelx,
                            u_ysk: data[index].u_ysk,
                            u_jdk: data[index].u_jdk,
                            u_srbzj: data[index].u_srbzj,
                            u_qtsk: data[index].u_qtsk,
                            u_fbf: data[index].u_fbf,
                            u_jxf: data[index].u_jxf,
                            u_lwf: data[index].u_lwf,
                            u_clf: data[index].u_clf,
                            u_glf: data[index].u_glf,
                            u_sf: data[index].u_sf,
                            u_bxj: data[index].u_bxj,
                            u_zcbzj: data[index].u_zcbzj,
                            u_lsssf: data[index].u_lsssf,
                            u_jksr: data[index].u_jksr,
                            u_qtfk: data[index].u_qtfk,
                            u_chlx: data[index].u_chlx,
                            u_chjk: data[index].u_chjk,
                            u_lymxzj: data[index].phid
                        });
                    }
                    dstore.insert(dstore.getCount(), arr);
                    console.log('dstore=====================>', dstore)
                }
            });
        });

        mstform.getItem('pc').addListener('change', function () {
            // 获取项目是否有未审核单据
            execServer('cxxmsfywshddj', { 'pc': mstform.getItem('pc').value }, function (res) {
                if (res.count != 0) {
                    Ext.MessageBox.confirm('提示', '当前项目有未审核的变更单,请先通过审核', function (e) {
                        var save = toolbar.get('save');
                        console.log('save=================>', save);
                        save.disabled = true;
                    });
                    return;
                }
            });
        })
    }

    if (otype == $Otype.EDIT || otype == $Otype.VIEW) {

        /**项目全周期设置为只读 */
        mstform.getItem('u_xmqzqdj').userSetReadOnly(true);

        /**如果不是最新版本变更单据  则不能取消审核进行修改 */
        toolbar.get('applycheck').on('click', function () {
            // 获取预算资金变更表的版本号
            execServer('hqyszjbgbdbbh', { 'u_xmqzqdj': u_xmqzqdj.value }, function (res) {
                if (u_version.value != res.data[0].u_version) {
                    Ext.MessageBox.confirm('提示', '当前单据不是最新单据,请先删除最新单据', function (e) {

                    });
                    return;
                }
            });
        });
    }
}