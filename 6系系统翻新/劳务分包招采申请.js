$NG.AllReady(function (editPage, { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick, useBeforeClick }) {
    var mstform = $NG.getCmpApi("fieldSetForm");
    var dgrid = $NG.getCmpApi("gridView");
    const phid_pc = mstform.getValues().PhidPc;
    console.log('引用过来的phid_pc:', phid_pc);
    if (phid_pc) {
        $NG.updateUI(function (updater, state) {
            console.log('updater', updater);
            updater.fieldSetForm.ServiceSubcontractForm.user_bqsp.setProps({
                clientSqlFilter: ('phid_pc = ' + phid_pc)
            });
        });
    }

    useValuesChange(({ args }) => {
        console.log('useValuesChange中帮助选择的PhidPc.PhId:', args[0].PhidPc.PhId);
        if (args[0].PhidPc.PhId) {
            $NG.updateUI(function (updater, state) {
                console.log(updater);
                updater.fieldSetForm.ServiceSubcontractForm.user_bqsp.setProps({
                    clientSqlFilter: ('phid_pc = ' + args[0].PhidPc.PhId)
                });
            });
        }
    }, 'pc_bap_info_m.PhidPc');

    // 计算招标控制价金额合计的函数
    function calculateBidControlAmount() {
        const rows = dgrid.getRows();
        if (!rows || rows.length === 0) {
            console.log("明细表没有数据，招标控制价金额设为0");
            // 没有数据时设为0
            $NG.updateState((updater) => {
                updater.data.pc_bap_info_m.setProps({
                    user_zbkzjje: 0
                });
            });
            return;
        }
        let totalAmount = 0;
        // 遍历所有行，累加含税总金额
        rows.forEach(row => {
            const amount = parseFloat(row.PlannedCostAmountInclTax) || 0;
            totalAmount += amount;
        });
        console.log(`招标控制价金额合计: ${totalAmount}`);
        // 更新主表字段
        $NG.updateState((updater) => {
            console.log('updater-----------', updater);
            // updater.data.pc_bap_info_m.setProps({
            //     user_zbkzjje: Number(totalAmount)
            // });
            //updater.data.pc_bap_info_m.user_zbkzjje.setProps(Number(totalAmount));
            updater.data.pc_bap_info_m.setProps({
                user_zbkzjje: totalAmount
            });
        });
    }

    // 监听明细表数据变化，自动更新招标控制价金额
    useUpdateRows(({ args }) => {
        console.log("明细表数据变化，重新计算招标控制价金额");
        calculateBidControlAmount();
    }, "gridView");

    // 监听招标控制含税金额变化，同步到招标控制价金额
    useValuesChange(({ args }) => {
        console.log('招标控制含税金额变化:', args[0].BidCtrlInclTax);
        const bidCtrlInclTax = args[0].BidCtrlInclTax;
        if (bidCtrlInclTax !== null && bidCtrlInclTax !== undefined) {
            $NG.updateState((updater) => {
                updater.data.pc_bap_info_m.setProps({
                    user_zbkzjje: bidCtrlInclTax
                });
            });
            console.log(`已将招标控制含税金额 ${bidCtrlInclTax} 同步到招标控制价金额`);
        }
    }, 'pc_bap_info_m.BidCtrlInclTax');

    // 页面加载时初始化计算
    setTimeout(() => {
        // 初始化招标控制价金额
        calculateBidControlAmount();
        // 初始化招标控制含税金额同步
        const initialBidCtrlInclTax = mstform.getValues().BidCtrlInclTax;
        if (initialBidCtrlInclTax !== null && initialBidCtrlInclTax !== undefined) {
            $NG.updateState((updater) => {
                updater.data.pc_bap_info_m.setProps({
                    user_zbkzjje: initialBidCtrlInclTax
                });
            });
            console.log(`页面初始化：已将招标控制含税金额 ${initialBidCtrlInclTax} 同步到招标控制价金额`);
        }
    }, 300);
});