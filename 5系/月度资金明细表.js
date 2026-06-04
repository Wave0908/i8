function AllReady() {
    console.log('11111111111111111')
    var mstform = Ext.getCmp('p_form0000700750_m');
    var pc = mstform.getItem('phid_pc'); // 项目

    var dgrid = Ext.getCmp('p_form0000700750_d'); // 明细表
    var dstore = dgrid.store;
    var u_tjzq = mstform.getItem('u_tjzq'); // 统计周期
    var u_xmzt = mstform.getItem('u_xmzt'); // 项目状态

    // 获取当前日期
    var currentDate = new Date();
    var formattedDate = currentDate.getFullYear() + '-' +
        String(currentDate.getMonth() + 1).padStart(2, '0') + '-' +
        String(currentDate.getDate()).padStart(2, '0');

    /**统计周期过滤(只能选当前月以及之前月份的) */
    u_tjzq.setClientSqlFilter(
        `ctype = 'GCMONTH' 
        AND bdt <= '${formattedDate}'`
    );

    if (otype == $Otype.ADD) {

        /**选择项目树直接带出项目 */
        var selectedProject = mstform.getItem('phid_pc').getValue();

        if (selectedProject) {
            console.log('selectedProject===============>', selectedProject)
            /**通过项目带出合同信息 */
            execServer('tgxmdchtxx', { 'pc': selectedProject }, function (res) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log('res===========>', res)
                if (res.count > 0) {
                    u_xmzt.setValue(data[0].extendObjects.u_xmzt)
                    console.log('u_xmzt==============>', u_xmzt.getValue())
                    var arr = new Array();
                    for (let index = 0; index < res.count; index++) {
                        arr.push({
                            custno: data[index].extendObjects.custno,
                            custno_EXName: data[index].extendObjects.custno_name,
                            u_htbm: data[index].extendObjects.u_htbm,
                            u_htmc: data[index].extendObjects.u_htmc,
                            u_htmc_EXName: data[index].extendObjects.u_htmc_name
                        });
                    }
                    // 清空表体
                    dstore.removeAll();
                    dstore.insert(dstore.getCount(), arr);
                }
            });

            /**监听项目选择后过滤统计周期 */
            u_tjzq.setClientSqlFilter(
                `ctype = 'GCMONTH' 
                    AND bdt <= '${formattedDate}' 
                    AND phid NOT IN (
                    SELECT u_tjzq FROM p_form0000700750_m 
                    WHERE phid_pc = '${selectedProject}')`
            );

            /**项目直接设置只读 */
            pc.userSetReadOnly(true);
        }

        /**先选择统计周期  监听统计周期 */
        mstform.getItem('u_tjzq').addListener('itemchanged', function () {
            var tjzcValue = mstform.getItem('u_tjzq').getValue();

            if (tjzcValue) {
                /**监听统计周期选择后过滤项目 */
                pc.setClientSqlFilter(
                    `phid NOT IN (
                        SELECT 
                            phid_pc 
                        FROM p_form0000700750_m 
                        WHERE u_tjzq = ('${tjzcValue}')
                    )`
                );
            }
        });

        /**先选择项目 监听项目 */
        mstform.getItem('phid_pc').addListener('itemchanged', function () {
            // 获取当前选择的项目
            var pcValue = mstform.getItem('phid_pc').getValue();
            if (pcValue) {

                /**通过项目带出合同信息 */
                execServer('tgxmdchtxx', { 'pc': pcValue }, function (res) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    if (res.count > 0) {
                        console.log('data====================>', data)
                        u_xmzt.setValue(data[0].extendObjects.u_xmzt)
                        var arr = new Array();
                        for (let index = 0; index < res.count; index++) {
                            arr.push({
                                custno: data[index].extendObjects.custno,
                                custno_EXName: data[index].extendObjects.custno_name,
                                u_htbm: data[index].extendObjects.u_htbm,
                                u_htmc: data[index].extendObjects.u_htmc,
                                u_htmc_EXName: data[index].extendObjects.u_htmc_name
                            });
                        }
                        // 清空表体
                        dstore.removeAll();
                        dstore.insert(dstore.getCount(), arr);
                    }
                });

                /**监听项目选择后过滤统计周期 */
                u_tjzq.setClientSqlFilter(
                    `ctype = 'GCMONTH' 
                    AND bdt <= '${formattedDate}' 
                    AND phid NOT IN (
                    SELECT u_tjzq FROM p_form0000700750_m 
                    WHERE phid_pc = '${pc.getValue()}')`
                );

            }

            /**监听项目选择后 项目设置只读 */
            pc.userSetReadOnly(true);
        });

    } else if (otype == $Otype.EDIT) {
        // 项目只读
        pc.userSetReadOnly(true);

        // 统计周期只读
        u_tjzq.userSetReadOnly(true);
    }
}