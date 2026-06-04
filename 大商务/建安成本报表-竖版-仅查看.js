/*$NG.PageReady(function (page) {
    const newurl = window.location.origin +
        '/ngweb/portal/index.html#/sub/formruntime/customform/detail?AppTitle=建安成本报表&oType=view&busType=jacbbb&isSso=1&menucode=&otype=add'
    const url = window.location.href
    console.log(url, 1);
    if (!url.includes('detail')) {
        $NG.close();
        setTimeout(() => {
            location.href = newurl;
        }, 500);

    }
});*/

$NG.AllReady(function (page, { useClick, useBeforeClick, TableSelectionModel, useValuesChange, useBeforeOpen, useBeforeTabChange, useTabChange, useUpdateRow, useUpdateRows }) {
    page.oType = 'view';
    var mstform = $NG.getCmpApi("p_form_jacbbb_m");
    var dgrid = $NG.getCmpApi("p_form_jacbbb_d1");

    // 通过setProps方法隐藏行号
    dgrid.setProps({ showRowNumber: false });



    //查询前必须选择项目
    useBeforeClick(() => {
        const phidPc = mstform.getValues().phid_pc;
        if (!phidPc) {
            $NG.confirm(`请先维护项目`);
            return false; // 取消发送按钮事件向下执行
        }
    }, 'u_data_search');
    // 将$NG.execServer包装为Promise以支持并行调用
    function execServerPromise(serviceName, params) {
        return new Promise((resolve, reject) => {
            $NG.execServer(serviceName, params, function (res) {
                if (res && res.count !== undefined) {
                    resolve(res);
                } else {
                    reject(new Error('接口调用失败'));
                }
            });
        });
    }

    // 获取浪潮收付款数据的函数
    function getLangchaoPaymentData(phidPc, uyear, umonth) {
        if (umonth < 10) {
            umonth = '0' + umonth
        }
        return new Promise((resolve, reject) => {
            $NG.request.post({
                url: 'http://172.20.65.5:30599/xzd/reportcenter/dataSet/previewExecResult',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: JSON.stringify({
                    dataSetType: 1,
                    datasourceId: '5690000000000003',
                    queryDefinition: '0b6bf76cef31a9da3240929914a50dbfe0c2a04c85cd42333613144c5d790acb38fced33b6ea00cddd0c206f86dd1e24c1511950f8b737b06b4cf5546e9eab21b0fdd0566d9e825a71b18dacee3a8be9979680c575ed385f038aa6e302beb53370e6df8ff27bd02a1b5d261c136f6670716fee6336fe63b5df6d68030e04af5f716fee6336fe63b5814e7d1313a6128bfa7c58cb4af4487cfe48ea5cf74870482de602ccc35dc5d7944d34890aeb01871d91655f49b16f65f17de6a9ec289a7d0a5c863fd5a2a7d929c4865994d4ced17782dbdb4d4ade2c83f50880f9ae74e29ab332bee6b4a802281bca9ce074c1f3e5d021090b1330beeb41c14b9c2d5954f5d91d09948ac5c750afa4451eb94ca64ccd9895ecb11f349399b46bd6411ebf9b236e55f3b23e8480c9952365d0c92638b20246ed9bf9a193d0166b5f3dd463830c110cd72a8df5700a90751245e28276943d449a71748e46bc77f3ea57aa7dedf13a7e40c2c9403996189dfc6811a3725f963dbdd546b4a1451f3def3caffe5ecf43b436648bc691478d93bc99521f16ea8ae648b40167ceb72ce58b688b645c173d28505f11d23643b203c11d71b401db33bada46417974d359433b7695f9941a2aea994dc4dbe7d9bb5656c69f6cc2093b7f73e5c4c9a6fe43b3e7a5c253dd08e5a202770448dc7a8b48a558b385be096ae82eb13faeb42048a572083d0f602de1d20e570a0230a997aafd07764c3411872d78d07fb98900283fba16492db4b1513666e3901c421c7c3db40feff1ad940868ace0a24f554273ea791fdde7239aa7379eb7a53e1e5df8b294d1084add04aac5fe2eb115b3afd33e5fe0776e1d71c9559c089898d94d6064207825b426f11512792c6ce3c56d20629ecd9126b41785004a927ec05d99b3c9137ce4bbdb0e274b4a2b656633fddbc6a7f60e566ad5a65157ccf9fbb41785004a927ec0eff880e80fb141bc9e8bec0590b6f14b6704219f2fc75e3e5b3faf4aeb27e0d8f7b9c1238cad0be935d7e56df7ad56aedb0e274b4a2b65668e408d63167266be186300a5469eb8e2b41785004a927ec03df075c7ea9a81b2b41785004a927ec0279381c2c64d4584b1228820d0b3c97de44861af1463dd9938fced33b6ea00cd55df2b6864830e5398f6b6173e205634dd0c206f86dd1e248eeef148b2516bcaeacd3d803b0bca9ace88cc4fb82e025a',
                    paramSetting: JSON.stringify([
                        {
                            paramKey: 'xmid',
                            paramName: '项目id',
                            //paramDefault: '569000000005529',
                            paramDefault: phidPc,
                            multiSelectStatus: 0
                        }, {
                            paramKey: 'uyear',
                            paramName: '年份',
                            paramDefault: uyear,
                            multiSelectStatus: 0
                        }, {
                            paramKey: 'umon',
                            paramName: '月份',
                            paramDefault: umonth,
                            multiSelectStatus: 0
                        }
                    ]),
                    queryDefinitionType: '',
                    pageIndex: 1,
                    pageSize: 1000,
                    fieldInfos: []
                })
            }).then((res) => {
                resolve(res);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    //点击查询时，执行功能扩展函数取数
    useClick(async function ({ args }) {
        const phidPc = mstform.getValues().phid_pc;
        if (!phidPc) {
            return false; // 取消发送按钮事件向下执行
        }
        const uyear = mstform.getValues().u_year || "''";
        const umonth = mstform.getValues().u_tjyf || "''";
        // 创建并显示加载提示层
        const loadingDiv = document.createElement('div');
        loadingDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 16px;
        `;

        const spinner = document.createElement('div');
        spinner.style.cssText = `
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 15px;
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        const text = document.createTextNode('正在加载数据，请稍后...');

        loadingDiv.appendChild(spinner);
        loadingDiv.appendChild(text);
        document.body.appendChild(loadingDiv);

        try {
            // 记录开始时间
            const startTime = Date.now();

            // 并行调用十九个接口（新增机械租赁、安全文明、临时设施、其他支出、管理费、税金、预估专业、预估劳务、预估材料、预估周材、预估机械、预估其他、浪潮收付款数据、在建项目数据）
            const [inComeRes, specialityRes, laborRes, materialPurRes, materialRentalRes, sporadicMaterialRes,
                jixiezulinRes, anquanwenmingRes, linshisheshiRes, qitazhichuRes, manageFeeRes, tanAndShuiRes,
                unProAndLabRes, unMaterialFeeRes, unZhouMatRes, unMachineryRes, unOtherRes, langchaoPaymentRes, zjProjRes] = await Promise.all([
                    execServerPromise("jiananGetIncomeBuggetData", { phid_pc: phidPc, uyear: uyear, umonth: umonth }).catch(err => { console.error("收入预算接口失败:", err); return { count: 0, data: "[]" }; }),
                    execServerPromise("jiananGetSpecialityData", { phid_pc: phidPc }).catch(err => { console.error("专业分包接口失败:", err); return { count: 0, data: "[]" }; }),
                    execServerPromise("jiananGetLaborData", { phid_pc: phidPc }).catch(err => { console.error("劳务分包接口失败:", err); return { count: 0, data: "[]" }; }),
                    execServerPromise("jiananGetMaterialPurCostData", { phid_pc: phidPc }).catch(err => { console.error("材料采购成本接口失败:", err); return { count: 0, data: "[]" }; }),
                    execServerPromise("jiananGetMaterialRentalCostData", { phid_pc: phidPc }).catch(err => { console.error("材料租赁成本接口失败:", err); return { count: 0, data: "[]" }; }),
                    execServerPromise("jiananGetSporadicMaterialData", { phid_pc: phidPc }).catch(err => { console.error("零星材料接口失败:", err); return { count: 0, data: "[]" }; }),
                    execServerPromise("jiananGetJixiezulinData", { phid_pc: phidPc }).catch(err => { console.error("机械租赁接口失败:", err); return { count: 0, data: "[]" }; }),
                    execServerPromise("jiananGetAnquanwenmingData", { phid_pc: phidPc }).catch(err => { console.error("安全文明接口失败:", err); return { count: 0, data: "[]" }; }),
                    execServerPromise("jiananGetLinshisheshiData", { phid_pc: phidPc }).catch(err => { console.error("临时设施接口失败:", err); return { count: 0, data: "[]" }; }),
                    execServerPromise("jiananGetQitazhichuData", { phid_pc: phidPc }).catch(err => { console.error("其他支出接口失败:", err); return { count: 0, data: "[]" }; }),
                    execServerPromise("jiananGetManageFeeData", { phid_pc: phidPc }).catch(err => { console.error("管理费接口失败:", err); return { count: 0, data: "[]" }; }),
                    execServerPromise("jiananGetTanAndShuiData", { phid_pc: phidPc }).catch(err => { console.error("税金接口失败:", err); return { count: 0, data: "[]" }; }),
                    execServerPromise("jiananGetUnProAndLabData", { phid_pc: phidPc }).catch(err => { console.error("预估专业劳务接口失败:", err); return { count: 0, data: "[]" }; }),
                    execServerPromise("jiananGetUnMaterialFeeData", { phid_pc: phidPc }).catch(err => { console.error("预估材料费用接口失败:", err); return { count: 0, data: "[]" }; }),
                    execServerPromise("jiananGetUnZhouMatData", { phid_pc: phidPc }).catch(err => { console.error("预估周转材料接口失败:", err); return { count: 0, data: "[]" }; }),
                    execServerPromise("jiananGetUnMachineryData", { phid_pc: phidPc }).catch(err => { console.error("预估机械费用接口失败:", err); return { count: 0, data: "[]" }; }),
                    execServerPromise("jiananGetUnOtherData", { phid_pc: phidPc }).catch(err => { console.error("预估其他费用接口失败:", err); return { count: 0, data: "[]" }; }),
                    getLangchaoPaymentData(phidPc, uyear, umonth).catch(err => { console.error("浪潮收付款数据接口失败:", err); return { Data: { dataList: [] } }; }),
                    execServerPromise("jiananGetZjProjData", { phid_pc: phidPc, uyear: uyear, umonth: umonth }).catch(err => { console.error("在建项目数据接口失败:", err); return { count: 0, data: "[]" }; })
                ]);

            // 计算执行时间
            const executionTime = Date.now() - startTime;
            console.log(`并行接口调用总执行时间: ${executionTime}ms`);
            console.log('浪潮收付款数据:', langchaoPaymentRes);
            // 处理浪潮收付款数据
            let langchaoPaymentMap = {};
            let langchaoPaymentMapAll = {};
            if (langchaoPaymentRes && langchaoPaymentRes.Data && langchaoPaymentRes.Data.dataList) {
                const dataList = langchaoPaymentRes.Data.dataList;
                // 提取表头索引
                const header = dataList[0];
                const u_htidIndex = header.indexOf('u_htid');
                const amtIndex = header.indexOf('amt');
                const amtYearIndex = header.indexOf('amt_year');

                // 构建u_htid到amt的映射
                for (let i = 1; i < dataList.length; i++) {
                    const row = dataList[i];
                    const u_htid = row[u_htidIndex];
                    const amt = row[amtIndex];
                    const amtYear = row[amtYearIndex];
                    if (u_htid && amt) {
                        // 将u_htid转换为字符串，确保类型匹配
                        const u_htidStr = String(u_htid);
                        // 如果同一个u_htid有多个amt值，累加
                        if (langchaoPaymentMap[u_htidStr]) {
                            langchaoPaymentMap[u_htidStr] += parseFloat(amt) || 0;
                        } else {
                            langchaoPaymentMap[u_htidStr] = parseFloat(amt) || 0;
                        }
                    }
                    if (u_htid && amtYear) {
                        // 将u_htid转换为字符串，确保类型匹配
                        const u_htidStr = String(u_htid);
                        // 如果同一个u_htid有多个amtYear值，累加
                        if (langchaoPaymentMapAll[u_htidStr]) {
                            langchaoPaymentMapAll[u_htidStr] += parseFloat(amtYear) || 0;
                        } else {
                            langchaoPaymentMapAll[u_htidStr] = parseFloat(amtYear) || 0;
                        }
                    }
                }
            }
            console.log('浪潮收付款数据映射:', langchaoPaymentMap);
            console.log('浪潮收付款数据映射所有:', langchaoPaymentMapAll);

            // 处理在建项目数据
            let zjProjData = [];
            let zjProjMap = {};
            if (zjProjRes && zjProjRes.count > 0) {
                zjProjData = JSON.parse(zjProjRes.data);
                console.log('在建项目数据:', zjProjData);

                // 构建在建项目节点映射，按s_tree_name分类
                zjProjData.forEach(item => {
                    const extendObjects = item.extendObjects || {};
                    const s_tree_name = extendObjects.s_tree_name;
                    if (s_tree_name === '专业分包' || s_tree_name === '劳务分包' ||
                        s_tree_name === '材料供应采购成本' || s_tree_name === '材料租赁成本' ||
                        s_tree_name === '机械购置及租赁成本' || s_tree_name === '机械租赁' ||
                        s_tree_name === '安全文明费' || s_tree_name === '临时设施费' ||
                        s_tree_name === '项目其他服务合同成本' ||
                        s_tree_name === '项目期间管理费' || s_tree_name === '管理费') {
                        zjProjMap[s_tree_name] = extendObjects;
                    }
                });
            }
            console.log('在建项目节点映射:', zjProjMap);

            // 构建现有合约包节点映射，用于在建项目子节点挂载
            let existingContractMap = {};

            // 检查专业分包合约包
            if (specialityRes.count > 0) {
                const specialityData = JSON.parse(specialityRes.data);
                specialityData.forEach(item => {
                    const extendObjects = item.extendObjects || {};
                    if (extendObjects.s_tree_name === '专业分包') {
                        existingContractMap['专业分包'] = extendObjects.s_tree_id;
                    }
                });
            }

            // 检查劳务分包合约包
            if (laborRes.count > 0) {
                const laborData = JSON.parse(laborRes.data);
                laborData.forEach(item => {
                    const extendObjects = item.extendObjects || {};
                    if (extendObjects.s_tree_name === '劳务分包') {
                        existingContractMap['劳务分包'] = extendObjects.s_tree_id;
                    }
                });
            }

            // 检查材料供应采购成本合约包
            if (materialPurRes.count > 0) {
                const materialPurData = JSON.parse(materialPurRes.data);
                materialPurData.forEach(item => {
                    const extendObjects = item.extendObjects || {};
                    if (extendObjects.s_tree_name === '材料供应采购成本') {
                        existingContractMap['材料供应采购成本'] = extendObjects.s_tree_id;
                    }
                });
            }

            // 检查材料租赁成本合约包
            if (materialRentalRes.count > 0) {
                const materialRentalData = JSON.parse(materialRentalRes.data);
                materialRentalData.forEach(item => {
                    const extendObjects = item.extendObjects || {};
                    if (extendObjects.s_tree_name === '材料租赁成本') {
                        existingContractMap['材料租赁成本'] = extendObjects.s_tree_id;
                    }
                });
            }

            // 检查机械租赁合约包
            if (jixiezulinRes.count > 0) {
                const jixiezulinData = JSON.parse(jixiezulinRes.data);
                jixiezulinData.forEach(item => {
                    const extendObjects = item.extendObjects || {};
                    if (extendObjects.s_tree_name === '机械购置及租赁成本' || extendObjects.s_tree_name === '机械租赁') {
                        existingContractMap[extendObjects.s_tree_name] = extendObjects.s_tree_id;
                    }
                });
            }

            // 检查安全文明费合约包
            if (anquanwenmingRes.count > 0) {
                const anquanwenmingData = JSON.parse(anquanwenmingRes.data);
                anquanwenmingData.forEach(item => {
                    const extendObjects = item.extendObjects || {};
                    if (extendObjects.s_tree_name === '安全文明费') {
                        existingContractMap['安全文明费'] = extendObjects.s_tree_id;
                    }
                });
            }

            // 检查临时设施费合约包
            if (linshisheshiRes.count > 0) {
                const linshisheshiData = JSON.parse(linshisheshiRes.data);
                linshisheshiData.forEach(item => {
                    const extendObjects = item.extendObjects || {};
                    if (extendObjects.s_tree_name === '临时设施费') {
                        existingContractMap['临时设施费'] = extendObjects.s_tree_id;
                    }
                });
            }

            // 检查项目其他服务合同成本合约包
            if (qitazhichuRes.count > 0) {
                const qitazhichuData = JSON.parse(qitazhichuRes.data);
                qitazhichuData.forEach(item => {
                    const extendObjects = item.extendObjects || {};
                    if (extendObjects.s_tree_name === '项目其他服务合同成本') {
                        existingContractMap['项目其他服务合同成本'] = extendObjects.s_tree_id;
                    }
                });
            }

            // 检查管理费合约包
            if (manageFeeRes.count > 0) {
                const manageFeeData = JSON.parse(manageFeeRes.data);
                manageFeeData.forEach(item => {
                    const extendObjects = item.extendObjects || {};
                    if (extendObjects.s_tree_name === '项目期间管理费' || extendObjects.s_tree_name === '管理费') {
                        existingContractMap[extendObjects.s_tree_name] = extendObjects.s_tree_id;
                    }
                });
            }
            console.log('现有合约包节点映射:', existingContractMap);

            // 处理收入预算数据
            let inComeGridData = [];
            if (inComeRes.count > 0) {
                const inComeData = JSON.parse(inComeRes.data);
                console.log('收入预算数据:', inComeData);
                if (inComeData.length > 0) {
                    // 先将数据转换为节点对象数组
                    inComeGridData = inComeData.map(item => {
                        const extendObjects = item.extendObjects || {};
                        // 查找匹配的浪潮收付款数据
                        let byssgck = extendObjects.byssgck || 0;
                        let kgljssgck = extendObjects.kgljssgck || 0;

                        // 检查是否有s_tree_id（对应u_htid）
                        if (extendObjects.s_tree_id) {
                            const u_htid = String(extendObjects.s_tree_id);
                            if (langchaoPaymentMap[u_htid]) {
                                byssgck = langchaoPaymentMap[u_htid];
                                //kgljssgck = langchaoPaymentMap[u_htid];
                            }
                            if (langchaoPaymentMapAll[u_htid]) {
                                kgljssgck = langchaoPaymentMapAll[u_htid];
                            }
                        }
                        // 同时检查phid_cnt（保持与收入预算数据处理一致）
                        else if (extendObjects.phid_cnt) {
                            const u_htid = String(extendObjects.phid_cnt);
                            if (langchaoPaymentMap[u_htid]) {
                                byssgck = langchaoPaymentMap[u_htid];
                                // kgljssgck = langchaoPaymentMap[u_htid];
                            }
                            if (langchaoPaymentMapAll[u_htid]) {
                                kgljssgck = langchaoPaymentMapAll[u_htid];
                            }
                        }

                        return {
                            s_tree_id: extendObjects.s_tree_id,
                            s_tree_pid: extendObjects.s_tree_pid,
                            s_tree_no: extendObjects.s_tree_no,
                            s_tree_name: extendObjects.s_tree_name,
                            u_htbh: extendObjects.cnt_no,
                            u_ywzb: extendObjects.ywzb,
                            u_zrcbzb: extendObjects.zrcb,
                            u_ewzb: extendObjects.ewzb,
                            u_htje: extendObjects.cnt_sum_vat_fc,
                            u_yjjsz: extendObjects.yjjsz,
                            u_bykd: extendObjects.settle_vat_amt_mon,
                            u_bnljkd: extendObjects.settle_vat_amt_year,
                            u_kgljkd: extendObjects.settle_vat_amt_all,
                            u_byysgck: extendObjects.mon_should_pay,
                            u_kgljysgck: extendObjects.all_should_pay,
                            u_byssgck: byssgck,
                            u_kgljssgck: kgljssgck,
                            u_htzt: extendObjects.htzt
                        };
                    });

                    // 查找已编预算节点和待编预算节点
                    const srNode = inComeGridData.find(node => node.s_tree_name === '收入预算');
                    const ybNode = inComeGridData.find(node => node.s_tree_name === '已编预算');
                    const wbNode = inComeGridData.find(node => node.s_tree_name === '待编预算');

                    // 如果同时找到了已编预算和待编预算节点，则计算待编预算的u_yjjsz
                    if (srNode && ybNode && wbNode) {
                        const srEwzb = parseFloat(srNode.u_ewzb) || 0;
                        const ybEwzb = parseFloat(ybNode.u_ewzb) || 0;
                        const ybYjjsz = parseFloat(ybNode.u_yjjsz) || 0;
                        // 待编预算的u_yjjsz = 已编预算的u_ewzb - 已编预算的u_yjjsz
                        wbNode.u_yjjsz = parseFloat((srEwzb - ybYjjsz).toFixed(2));
                    }
                }
            }

            // 处理专业分包数据
            let SpecialityGridData = [];
            // 创建已编制成本父节点
            const parentNode = {
                s_tree_id: 'ybz1100',
                s_tree_pid: 0,
                s_tree_no: '（一）',
                s_tree_name: '已编制成本',
                u_htbh: '',
                u_ywzb: 0,
                u_zrcbzb: 0,
                u_ewzb: 0,
                u_htje: 0,
                u_yjjsz: 0,
                u_bykd: 0,
                u_bnljkd: 0,
                u_kgljkd: 0,
                u_byysgck: 0,
                u_kgljysgck: 0,
                u_byssgck: 0,
                u_kgljssgck: 0,
                u_htzt: ''
            };
            // 如果没有子节点，就直接返回父节点
            SpecialityGridData = [parentNode];
            if (specialityRes.count > 0) {
                const specialityData = JSON.parse(specialityRes.data);
                if (specialityData.length > 0) {

                    // 处理子节点数据
                    const childNodes = specialityData.map(item => {
                        const extendObjects = item.extendObjects || {};
                        let s_tree_pid = extendObjects.s_tree_pid;

                        // 保持专业分包合约包的原有父节点
                        if (extendObjects.s_tree_name === '专业分包') {
                            s_tree_pid = 'ybz1100';
                        }

                        // 查找匹配的浪潮收付款数据
                        let byssgck = extendObjects.act_pay_mon || 0;
                        let kgljssgck = extendObjects.act_pay_all || 0;

                        // 检查是否有s_tree_id（对应u_htid）
                        if (extendObjects.s_tree_id) {
                            const u_htid = String(extendObjects.s_tree_id);
                            // console.log('Checking s_tree_id:', u_htid);
                            // console.log('langchaoPaymentMap has key:', u_htid in langchaoPaymentMap);
                            // console.log('langchaoPaymentMapAll has key:', u_htid in langchaoPaymentMapAll);
                            if (langchaoPaymentMap[u_htid]) {
                                console.log('Found payment data:', langchaoPaymentMap[u_htid]);
                                byssgck = langchaoPaymentMap[u_htid];
                                // kgljssgck = langchaoPaymentMap[u_htid];
                            }
                            if (langchaoPaymentMapAll[u_htid]) {
                                console.log('Found payment data:', langchaoPaymentMapAll[u_htid]);
                                kgljssgck = langchaoPaymentMapAll[u_htid];
                            }
                        }
                        // 同时检查phid_cnt（保持与收入预算数据处理一致）
                        else if (extendObjects.phid_cnt) {
                            const u_htid = String(extendObjects.phid_cnt);
                            // console.log('Checking phid_cnt:', u_htid);
                            // console.log('langchaoPaymentMap has key:', u_htid in langchaoPaymentMap);
                            // console.log('langchaoPaymentMapAll has key:', u_htid in langchaoPaymentMapAll);
                            if (langchaoPaymentMap[u_htid]) {
                                console.log('Found payment data:', langchaoPaymentMap[u_htid]);
                                byssgck = langchaoPaymentMap[u_htid];
                                //kgljssgck = langchaoPaymentMap[u_htid];
                            }
                            if (langchaoPaymentMapAll[u_htid]) {
                                console.log('Found payment data:', langchaoPaymentMapAll[u_htid]);
                                kgljssgck = langchaoPaymentMapAll[u_htid];
                            }
                        }
                        // console.log('Final byssgck:', byssgck);
                        // console.log('Final kgljssgck:', kgljssgck);

                        return {
                            s_tree_id: extendObjects.s_tree_id,
                            s_tree_pid: s_tree_pid,
                            s_tree_no: extendObjects.s_tree_no,
                            s_tree_name: extendObjects.s_tree_name,
                            u_htbh: extendObjects.cnt_no,
                            u_ywzb: extendObjects.ywzb,
                            u_zrcbzb: extendObjects.zrcbzb,
                            u_ewzb: extendObjects.ewzb,
                            u_htje: extendObjects.cnt_sum_vat_fc,
                            u_yjjsz: extendObjects.yjjsz,
                            u_bykd: extendObjects.settle_vat_amt_mon,
                            u_bnljkd: extendObjects.settle_vat_amt_year,
                            u_kgljkd: extendObjects.settle_vat_amt_all,
                            u_byysgck: extendObjects.should_pay_mon,
                            u_kgljysgck: extendObjects.should_pay_all,
                            u_byssgck: byssgck,
                            u_kgljssgck: kgljssgck,
                            u_htzt: extendObjects.cnt_status
                        };
                    });
                    // 合并父节点和子节点，确保父节点在第一行
                    SpecialityGridData = [parentNode, ...childNodes];
                }
            }

            // 处理劳务分包数据
            let LaborGridData = [];
            if (laborRes.count > 0) {
                const laborData = JSON.parse(laborRes.data);
                if (laborData.length > 0) {
                    LaborGridData = laborData.map(item => {
                        const extendObjects = item.extendObjects || {};
                        let s_tree_pid = extendObjects.s_tree_pid;

                        // 保持劳务分包合约包的原有父节点
                        if (extendObjects.s_tree_name === '劳务分包') {
                            s_tree_pid = 'ybz1100';
                        }

                        // 查找匹配的浪潮收付款数据
                        let byssgck = extendObjects.act_pay_mon || 0;
                        let kgljssgck = extendObjects.act_pay_all || 0;

                        // 检查是否有s_tree_id（对应u_htid）
                        if (extendObjects.s_tree_id) {
                            const u_htid = String(extendObjects.s_tree_id);
                            if (langchaoPaymentMap[u_htid]) {
                                byssgck = langchaoPaymentMap[u_htid];
                                // kgljssgck = langchaoPaymentMap[u_htid];
                            }
                            if (langchaoPaymentMapAll[u_htid]) {
                                kgljssgck = langchaoPaymentMapAll[u_htid];
                            }
                        }
                        // 同时检查phid_cnt（保持与收入预算数据处理一致）
                        else if (extendObjects.phid_cnt) {
                            const u_htid = String(extendObjects.phid_cnt);
                            if (langchaoPaymentMap[u_htid]) {
                                byssgck = langchaoPaymentMap[u_htid];
                                // kgljssgck = langchaoPaymentMap[u_htid];
                            }
                            if (langchaoPaymentMapAll[u_htid]) {
                                kgljssgck = langchaoPaymentMapAll[u_htid];
                            }
                        }

                        return {
                            s_tree_id: extendObjects.s_tree_id,
                            s_tree_pid: s_tree_pid,
                            s_tree_no: extendObjects.s_tree_no,
                            s_tree_name: extendObjects.s_tree_name,
                            u_htbh: extendObjects.cnt_no,
                            u_ywzb: extendObjects.ywzb,
                            u_zrcbzb: extendObjects.zrcbzb,
                            u_ewzb: extendObjects.ewzb,
                            u_htje: extendObjects.cnt_sum_vat_fc,
                            u_yjjsz: extendObjects.yjjsz,
                            u_bykd: extendObjects.settle_vat_amt_mon,
                            u_bnljkd: extendObjects.settle_vat_amt_year,
                            u_kgljkd: extendObjects.settle_vat_amt_all,
                            u_byysgck: extendObjects.should_pay_mon,
                            u_kgljysgck: extendObjects.should_pay_all,
                            u_byssgck: byssgck,
                            u_kgljssgck: kgljssgck,
                            u_htzt: extendObjects.cnt_status
                        };
                    });
                }
            }

            // 处理材料采购成本数据
            let MaterialPurGridData = [];
            if (materialPurRes.count > 0) {
                const materialPurData = JSON.parse(materialPurRes.data);
                if (materialPurData.length > 0) {
                    MaterialPurGridData = materialPurData.map(item => {
                        const extendObjects = item.extendObjects || {};
                        let s_tree_pid = extendObjects.s_tree_pid;

                        // 保持材料供应采购成本合约包的原有父节点
                        if (extendObjects.s_tree_name === '材料供应采购成本') {
                            s_tree_pid = 'ybz1100';
                        }

                        // 查找匹配的浪潮收付款数据
                        let byssgck = extendObjects.act_pay_mon || 0;
                        let kgljssgck = extendObjects.act_pay_all || 0;

                        // 检查是否有s_tree_id（对应u_htid）
                        if (extendObjects.s_tree_id) {
                            const u_htid = String(extendObjects.s_tree_id);
                            if (langchaoPaymentMap[u_htid]) {
                                byssgck = langchaoPaymentMap[u_htid];
                                // kgljssgck = langchaoPaymentMap[u_htid];
                            }
                            if (langchaoPaymentMapAll[u_htid]) {
                                kgljssgck = langchaoPaymentMapAll[u_htid];
                            }
                        }
                        // 同时检查phid_cnt（保持与收入预算数据处理一致）
                        else if (extendObjects.phid_cnt) {
                            const u_htid = String(extendObjects.phid_cnt);
                            if (langchaoPaymentMap[u_htid]) {
                                byssgck = langchaoPaymentMap[u_htid];
                                // kgljssgck = langchaoPaymentMap[u_htid];
                            }
                            if (langchaoPaymentMapAll[u_htid]) {
                                kgljssgck = langchaoPaymentMapAll[u_htid];
                            }
                        }

                        return {
                            s_tree_id: extendObjects.s_tree_id,
                            s_tree_pid: s_tree_pid,
                            s_tree_no: extendObjects.s_tree_no,
                            s_tree_name: extendObjects.s_tree_name,
                            u_htbh: extendObjects.cnt_no,
                            u_ywzb: extendObjects.ywzb,
                            u_zrcbzb: extendObjects.zrcbzb,
                            u_ewzb: extendObjects.ewzb,
                            u_htje: extendObjects.cnt_sum_vat_fc,
                            u_yjjsz: extendObjects.yjjsz,
                            u_bykd: extendObjects.settle_vat_amt_mon,
                            u_bnljkd: extendObjects.settle_vat_amt_year,
                            u_kgljkd: extendObjects.settle_vat_amt_all,
                            u_byysgck: extendObjects.should_pay_mon,
                            u_kgljysgck: extendObjects.should_pay_all,
                            u_byssgck: byssgck,
                            u_kgljssgck: kgljssgck,
                            u_htzt: extendObjects.cnt_status
                        };
                    });

                    // 在集采材料转账成本和周转材料采购的子节点下各增加调拨成本和零星采购节点
                    const additionalNodes = [];
                    MaterialPurGridData.forEach(node => {
                        if (node.s_tree_name === '材料供应采购成本') {
                            const baseId = node.s_tree_id;
                            //const parentId = node.s_tree_id;

                            // 为当前节点添加子节点：调拨成本
                            additionalNodes.push({
                                s_tree_id: baseId + 1, // 生成唯一ID
                                s_tree_pid: baseId, // 设置为当前节点的子节点
                                s_tree_no: '',
                                s_tree_name: '调拨成本',
                                u_htbh: '',
                                u_ywzb: null,
                                u_zrcbzb: null,
                                u_ewzb: 0,
                                u_htje: null,
                                u_yjjsz: 0,
                                u_bykd: null,
                                u_bnljkd: null,
                                u_kgljkd: null,
                                u_byysgck: null,
                                u_kgljysgck: null,
                                u_byssgck: null,
                                u_kgljssgck: null,
                                u_htzt: ''
                            });

                            // 为当前节点添加子节点：零星采购
                            additionalNodes.push({
                                s_tree_id: baseId + 2, // 生成唯一ID
                                s_tree_pid: baseId, // 设置为当前节点的子节点
                                s_tree_no: '',
                                s_tree_name: '零星采购',
                                u_htbh: '',
                                u_ywzb: null,
                                u_zrcbzb: null,
                                u_ewzb: 0,
                                u_htje: null,
                                u_yjjsz: 0,
                                u_bykd: null,
                                u_bnljkd: null,
                                u_kgljkd: null,
                                u_byysgck: null,
                                u_kgljysgck: null,
                                u_byssgck: null,
                                u_kgljssgck: null,
                                u_htzt: ''
                            });
                        }
                    });

                    // 将新增节点添加到MaterialPurGridData中
                    MaterialPurGridData = [...MaterialPurGridData, ...additionalNodes];
                }
            }

            // 处理材料租赁成本数据
            let MaterialRentalGridData = [];
            if (materialRentalRes.count > 0) {
                const materialRentalData = JSON.parse(materialRentalRes.data);
                if (materialRentalData.length > 0) {
                    MaterialRentalGridData = materialRentalData.map(item => {
                        const extendObjects = item.extendObjects || {};
                        let s_tree_pid = extendObjects.s_tree_pid;

                        // 保持材料租赁成本合约包的原有父节点
                        if (extendObjects.s_tree_name === '材料租赁成本') {
                            s_tree_pid = 'ybz1100';
                        }

                        // 查找匹配的浪潮收付款数据
                        let byssgck = extendObjects.act_pay_mon || 0;
                        let kgljssgck = extendObjects.act_pay_all || 0;

                        // 检查是否有phid_cnt（假设phid_cnt对应u_htid）
                        if (extendObjects.phid_cnt) {
                            const u_htid = extendObjects.phid_cnt;
                            if (langchaoPaymentMap[u_htid]) {
                                byssgck = langchaoPaymentMap[u_htid];
                                // kgljssgck = langchaoPaymentMap[u_htid];
                            }
                            if (langchaoPaymentMapAll[u_htid]) {
                                kgljssgck = langchaoPaymentMapAll[u_htid];
                            }
                        }

                        return {
                            s_tree_id: extendObjects.s_tree_id,
                            s_tree_pid: s_tree_pid,
                            s_tree_no: extendObjects.s_tree_no,
                            s_tree_name: extendObjects.s_tree_name,
                            u_htbh: extendObjects.cnt_no,
                            u_ywzb: extendObjects.ywzb,
                            u_zrcbzb: extendObjects.zrcbzb,
                            u_ewzb: extendObjects.ewzb,
                            u_htje: extendObjects.cnt_sum_vat_fc,
                            u_yjjsz: extendObjects.yjjsz,
                            u_bykd: extendObjects.settle_vat_amt_mon,
                            u_bnljkd: extendObjects.settle_vat_amt_year,
                            u_kgljkd: extendObjects.settle_vat_amt_all,
                            u_byysgck: extendObjects.should_pay_mon,
                            u_kgljysgck: extendObjects.should_pay_all,
                            u_byssgck: byssgck,
                            u_kgljssgck: kgljssgck,
                            u_htzt: extendObjects.cnt_status
                        };
                    });
                }
            }

            // 处理零星材料数据
            let SporadicMaterialGridData = [];
            if (sporadicMaterialRes.count > 0) {
                const sporadicMaterialData = JSON.parse(sporadicMaterialRes.data);
                if (sporadicMaterialData.length > 0) {
                    SporadicMaterialGridData = sporadicMaterialData.map(item => {
                        const extendObjects = item.extendObjects || {};
                        return {
                            s_tree_id: extendObjects.s_tree_id,
                            s_tree_pid: extendObjects.s_tree_name === '调拨成本' || extendObjects.s_tree_name === '零星采购' ? (MaterialRentalGridData.length > 0 ? MaterialRentalGridData[0].s_tree_id : extendObjects.s_tree_pid) : extendObjects.s_tree_pid,
                            s_tree_no: extendObjects.s_tree_no,
                            s_tree_name: extendObjects.s_tree_name,
                            u_htbh: extendObjects.cnt_no,
                            /*u_ywzb: extendObjects.ywzb,
                            u_zrcbzb: extendObjects.zrcbzb,
                            u_ewzb: extendObjects.ewzb,
                            u_htje: extendObjects.cnt_sum_vat_fc,
                            u_yjjsz: extendObjects.yjjsz,
                            u_bykd: extendObjects.settle_vat_amt_mon,
                            u_bnljkd: extendObjects.settle_vat_amt_year,
                            u_kgljkd: extendObjects.settle_vat_amt_all,
                            u_byysgck: extendObjects.should_pay_mon,
                            u_kgljysgck: extendObjects.should_pay_all,
                            u_byssgck: extendObjects.act_pay_mon,
                            u_kgljssgck: extendObjects.act_pay_all,
                            u_htzt: extendObjects.cnt_status*/
                        };
                    });
                }
            }

            // 处理机械租赁数据
            let JixiezulinGridData = [];
            if (jixiezulinRes.count > 0) {
                const jixiezulinData = JSON.parse(jixiezulinRes.data);
                if (jixiezulinData.length > 0) {
                    JixiezulinGridData = jixiezulinData.map(item => {
                        const extendObjects = item.extendObjects || {};

                        // 查找匹配的浪潮收付款数据
                        let byssgck = extendObjects.act_pay_mon || 0;
                        let kgljssgck = extendObjects.act_pay_all || 0;

                        // 检查是否有phid_cnt（假设phid_cnt对应u_htid）
                        if (extendObjects.phid_cnt) {
                            const u_htid = extendObjects.phid_cnt;
                            if (langchaoPaymentMap[u_htid]) {
                                byssgck = langchaoPaymentMap[u_htid];
                                // kgljssgck = langchaoPaymentMap[u_htid];
                            }
                            if (langchaoPaymentMapAll[u_htid]) {
                                kgljssgck = langchaoPaymentMapAll[u_htid];
                            }
                        }

                        return {
                            s_tree_id: extendObjects.s_tree_id,
                            s_tree_pid: extendObjects.s_tree_name === '机械购置及租赁成本' || extendObjects.s_tree_name === '机械租赁' ? 'ybz1100' : extendObjects.s_tree_pid,
                            s_tree_no: extendObjects.s_tree_no,
                            s_tree_name: extendObjects.s_tree_name,
                            u_htbh: extendObjects.cnt_no,
                            u_ywzb: extendObjects.ywzb,
                            u_zrcbzb: extendObjects.zrcbzb,
                            u_ewzb: extendObjects.ewzb,
                            u_htje: extendObjects.cnt_sum_vat_fc,
                            u_yjjsz: extendObjects.yjjsz,
                            u_bykd: extendObjects.settle_vat_amt_mon,
                            u_bnljkd: extendObjects.settle_vat_amt_year,
                            u_kgljkd: extendObjects.settle_vat_amt_all,
                            u_byysgck: extendObjects.should_pay_mon,
                            u_kgljysgck: extendObjects.should_pay_all,
                            u_byssgck: byssgck,
                            u_kgljssgck: kgljssgck,
                            u_htzt: extendObjects.cnt_status
                        };
                    });
                }
            }

            // 处理安全文明数据
            let AnquanwenmingGridData = [];
            if (anquanwenmingRes.count > 0) {
                const anquanwenmingData = JSON.parse(anquanwenmingRes.data);
                if (anquanwenmingData.length > 0) {
                    AnquanwenmingGridData = anquanwenmingData.map(item => {
                        const extendObjects = item.extendObjects || {};

                        // 查找匹配的浪潮收付款数据
                        let byssgck = extendObjects.act_pay_mon || 0;
                        let kgljssgck = extendObjects.act_pay_all || 0;

                        // 检查是否有phid_cnt（假设phid_cnt对应u_htid）
                        if (extendObjects.phid_cnt) {
                            const u_htid = extendObjects.phid_cnt;
                            if (langchaoPaymentMap[u_htid]) {
                                byssgck = langchaoPaymentMap[u_htid];
                                // kgljssgck = langchaoPaymentMap[u_htid];
                            }
                            if (langchaoPaymentMapAll[u_htid]) {
                                kgljssgck = langchaoPaymentMapAll[u_htid];
                            }
                        }

                        return {
                            s_tree_id: extendObjects.s_tree_id,
                            s_tree_pid: extendObjects.s_tree_name === '安全文明费' ? 'ybz1100' : extendObjects.s_tree_pid,
                            s_tree_no: extendObjects.s_tree_no,
                            s_tree_name: extendObjects.s_tree_name,
                            u_htbh: extendObjects.cnt_no,
                            u_ywzb: extendObjects.ywzb,
                            u_zrcbzb: extendObjects.zrcbzb,
                            u_ewzb: extendObjects.ewzb,
                            u_htje: extendObjects.cnt_sum_vat_fc,
                            u_yjjsz: extendObjects.yjjsz,
                            u_bykd: extendObjects.settle_vat_amt_mon,
                            u_bnljkd: extendObjects.settle_vat_amt_year,
                            u_kgljkd: extendObjects.settle_vat_amt_all,
                            u_byysgck: extendObjects.should_pay_mon,
                            u_kgljysgck: extendObjects.should_pay_all,
                            u_byssgck: byssgck,
                            u_kgljssgck: kgljssgck,
                            u_htzt: extendObjects.cnt_status
                        };
                    });
                }
            }

            // 处理临时设施数据
            let LinshisheshiGridData = [];
            if (linshisheshiRes.count > 0) {
                const linshisheshiData = JSON.parse(linshisheshiRes.data);
                if (linshisheshiData.length > 0) {
                    LinshisheshiGridData = linshisheshiData.map(item => {
                        const extendObjects = item.extendObjects || {};

                        // 查找匹配的浪潮收付款数据
                        let byssgck = extendObjects.act_pay_mon || 0;
                        let kgljssgck = extendObjects.act_pay_all || 0;

                        // 检查是否有phid_cnt（假设phid_cnt对应u_htid）
                        if (extendObjects.phid_cnt) {
                            const u_htid = extendObjects.phid_cnt;
                            if (langchaoPaymentMap[u_htid]) {
                                byssgck = langchaoPaymentMap[u_htid];
                                // kgljssgck = langchaoPaymentMap[u_htid];
                            }
                            if (langchaoPaymentMapAll[u_htid]) {
                                kgljssgck = langchaoPaymentMapAll[u_htid];
                            }
                        }

                        return {
                            s_tree_id: extendObjects.s_tree_id,
                            s_tree_pid: extendObjects.s_tree_name === '临时设施费' ? 'ybz1100' : extendObjects.s_tree_pid,
                            s_tree_no: extendObjects.s_tree_no,
                            s_tree_name: extendObjects.s_tree_name,
                            u_htbh: extendObjects.cnt_no,
                            u_ywzb: extendObjects.ywzb,
                            u_zrcbzb: extendObjects.zrcbzb,
                            u_ewzb: extendObjects.ewzb,
                            u_htje: extendObjects.cnt_sum_vat_fc,
                            u_yjjsz: extendObjects.yjjsz,
                            u_bykd: extendObjects.settle_vat_amt_mon,
                            u_bnljkd: extendObjects.settle_vat_amt_year,
                            u_kgljkd: extendObjects.settle_vat_amt_all,
                            u_byysgck: extendObjects.should_pay_mon,
                            u_kgljysgck: extendObjects.should_pay_all,
                            u_byssgck: byssgck,
                            u_kgljssgck: kgljssgck,
                            u_htzt: extendObjects.cnt_status
                        };
                    });
                }
            }

            // 处理其他支出数据
            let QitazhichuGridData = [];
            if (qitazhichuRes.count > 0) {
                const qitazhichuData = JSON.parse(qitazhichuRes.data);
                if (qitazhichuData.length > 0) {
                    QitazhichuGridData = qitazhichuData.map(item => {
                        const extendObjects = item.extendObjects || {};

                        // 查找匹配的浪潮收付款数据
                        let byssgck = extendObjects.act_pay_mon || 0;
                        let kgljssgck = extendObjects.act_pay_all || 0;

                        // 检查是否有phid_cnt（假设phid_cnt对应u_htid）
                        if (extendObjects.phid_cnt) {
                            const u_htid = extendObjects.phid_cnt;
                            if (langchaoPaymentMap[u_htid]) {
                                byssgck = langchaoPaymentMap[u_htid];
                                // kgljssgck = langchaoPaymentMap[u_htid];
                            }
                            if (langchaoPaymentMapAll[u_htid]) {
                                kgljssgck = langchaoPaymentMapAll[u_htid];
                            }
                        }

                        return {
                            s_tree_id: extendObjects.s_tree_id,
                            s_tree_pid: extendObjects.s_tree_name === '项目其他服务合同成本' ? 'ybz1100' : extendObjects.s_tree_pid,
                            s_tree_no: extendObjects.s_tree_no,
                            s_tree_name: extendObjects.s_tree_name,
                            u_htbh: extendObjects.cnt_no,
                            u_ywzb: extendObjects.ywzb,
                            u_zrcbzb: extendObjects.zrcbzb,
                            u_ewzb: extendObjects.ewzb,
                            u_htje: extendObjects.cnt_sum_vat_fc,
                            u_yjjsz: extendObjects.yjjsz,
                            u_bykd: extendObjects.settle_vat_amt_mon,
                            u_bnljkd: extendObjects.settle_vat_amt_year,
                            u_kgljkd: extendObjects.settle_vat_amt_all,
                            u_byysgck: extendObjects.should_pay_mon,
                            u_kgljysgck: extendObjects.should_pay_all,
                            u_byssgck: byssgck,
                            u_kgljssgck: kgljssgck,
                            u_htzt: extendObjects.cnt_status
                        };
                    });
                }
            }

            // 处理管理费数据
            let ManageFeeGridData = [];
            if (manageFeeRes.count > 0) {
                const manageFeeData = JSON.parse(manageFeeRes.data);
                if (manageFeeData.length > 0) {
                    ManageFeeGridData = manageFeeData.map(item => {
                        const extendObjects = item.extendObjects || {};

                        // 查找匹配的浪潮收付款数据
                        let byssgck = extendObjects.act_pay_mon || 0;
                        let kgljssgck = extendObjects.act_pay_all || 0;

                        // 检查是否有phid_cnt（假设phid_cnt对应u_htid）
                        if (extendObjects.phid_cnt) {
                            const u_htid = extendObjects.phid_cnt;
                            if (langchaoPaymentMap[u_htid]) {
                                byssgck = langchaoPaymentMap[u_htid];
                                // kgljssgck = langchaoPaymentMap[u_htid];
                            }
                            if (langchaoPaymentMapAll[u_htid]) {
                                kgljssgck = langchaoPaymentMapAll[u_htid];
                            }
                        }

                        return {
                            s_tree_id: extendObjects.s_tree_id,
                            s_tree_pid: extendObjects.s_tree_name === '项目期间管理费' || extendObjects.s_tree_name === '管理费' ? 'ybz1100' : extendObjects.s_tree_pid,
                            s_tree_no: extendObjects.s_tree_no,
                            s_tree_name: extendObjects.s_tree_name,
                            u_htbh: extendObjects.cnt_no,
                            u_ywzb: extendObjects.ywzb,
                            u_zrcbzb: extendObjects.zrcbzb,
                            u_ewzb: extendObjects.ewzb,
                            u_htje: extendObjects.cnt_sum_vat_fc,
                            u_yjjsz: extendObjects.yjjsz,
                            u_bykd: extendObjects.settle_vat_amt_mon,
                            u_bnljkd: extendObjects.settle_vat_amt_year,
                            u_kgljkd: extendObjects.settle_vat_amt_all,
                            u_byysgck: extendObjects.should_pay_mon,
                            u_kgljysgck: extendObjects.should_pay_all,
                            u_byssgck: byssgck,
                            u_kgljssgck: kgljssgck,
                            u_htzt: extendObjects.cnt_status
                        };
                    });
                }
            }

            // 处理税金数据
            let TanAndShuiGridData = [];
            if (tanAndShuiRes.count > 0) {
                const tanAndShuiData = JSON.parse(tanAndShuiRes.data);
                if (tanAndShuiData.length > 0) {
                    TanAndShuiGridData = tanAndShuiData.map(item => {
                        const extendObjects = item.extendObjects || {};
                        return {
                            s_tree_id: extendObjects.s_tree_id,
                            s_tree_pid: extendObjects.s_tree_name === '税收成本' || extendObjects.s_tree_name === '摊销余额及盘点冲抵成本' ? 'ybz1100' : extendObjects.s_tree_pid,
                            s_tree_no: extendObjects.s_tree_no,
                            s_tree_name: extendObjects.s_tree_name,
                            u_htbh: extendObjects.cnt_no,
                            u_ywzb: extendObjects.ywzb,
                            u_zrcbzb: extendObjects.zrcbzb,
                            u_ewzb: extendObjects.ewzb,
                            u_htje: extendObjects.cnt_sum_vat_fc,
                            u_yjjsz: extendObjects.yjjsz,
                            u_bykd: extendObjects.settle_vat_amt_mon,
                            u_bnljkd: extendObjects.settle_vat_amt_year,
                            u_kgljkd: extendObjects.settle_vat_amt_all,
                            u_byysgck: extendObjects.should_pay_mon,
                            u_kgljysgck: extendObjects.should_pay_all,
                            u_byssgck: extendObjects.act_pay_mon,
                            u_kgljssgck: extendObjects.act_pay_all,
                            u_htzt: extendObjects.cnt_status
                        };
                    });
                }
            }
            //------------未编制待发生------------------
            // 处理预估专业劳务数据
            let UnProAndLabGridData = [];
            if (unProAndLabRes.count > 0) {
                const unProAndLabData = JSON.parse(unProAndLabRes.data);
                if (unProAndLabData.length > 0) {
                    // 添加未编制待发生成本父级节点
                    const parentNode = {
                        s_tree_id: 'wbz2200',
                        s_tree_pid: 0,
                        s_tree_no: '（二）',
                        s_tree_name: '未编制待发生成本',
                        u_htbh: '',
                        u_ywzb: null,
                        u_zrcbzb: null,
                        u_ewzb: 0,
                        u_htje: null,
                        u_yjjsz: 0,
                        u_bykd: null,
                        u_bnljkd: null,
                        u_kgljkd: null,
                        u_byysgck: null,
                        u_kgljysgck: null,
                        u_byssgck: null,
                        u_kgljssgck: null,
                        u_htzt: ''
                    };

                    // 处理子节点数据
                    const childNodes = unProAndLabData.map(item => {
                        const extendObjects = item.extendObjects || {};
                        const treeName = extendObjects.s_tree_name;
                        let newTreeId, newTreePid;

                        if (treeName === '待调整金额') {
                            // 待调整金额节点特殊处理
                            newTreeId = 'dtz' + extendObjects.s_tree_id;
                            //newTreePid = 'wbz2200';
                            newTreePid = 'wbz' + extendObjects.s_tree_pid;
                        } else if (treeName === '专业分包' || treeName === '劳务分包') {
                            // 专业分包和劳务分包节点处理
                            newTreeId = 'wbz' + extendObjects.s_tree_id;
                            newTreePid = 'wbz2200';
                        } else {
                            // 其他节点保持原有层级关系
                            newTreeId = 'wbz' + extendObjects.s_tree_id;
                            newTreePid = 'wbz' + extendObjects.s_tree_pid;
                        }

                        return {
                            s_tree_id: newTreeId,
                            s_tree_pid: newTreePid,
                            s_tree_no: extendObjects.s_tree_no,
                            s_tree_name: treeName,
                            u_htbh: extendObjects.cnt_no,
                            u_ywzb: extendObjects.ywzb,
                            u_zrcbzb: extendObjects.zrcbzb,
                            u_ewzb: extendObjects.ewzb,
                            u_htje: extendObjects.cnt_sum_vat_fc,
                            u_yjjsz: extendObjects.yjjsz,
                            u_bykd: extendObjects.settle_vat_amt_mon,
                            u_bnljkd: extendObjects.settle_vat_amt_year,
                            u_kgljkd: extendObjects.settle_vat_amt_all,
                            u_byysgck: extendObjects.should_pay_mon,
                            u_kgljysgck: extendObjects.should_pay_all,
                            u_byssgck: extendObjects.act_pay_mon,
                            u_kgljssgck: extendObjects.act_pay_all,
                            u_htzt: extendObjects.cnt_status
                        };
                    });

                    // 合并父节点和子节点
                    UnProAndLabGridData = [parentNode, ...childNodes];
                }
            }

            // 处理预估材料费用数据
            let UnMaterialFeeGridData = [];
            if (unMaterialFeeRes.count > 0) {
                const unMaterialFeeData = JSON.parse(unMaterialFeeRes.data);
                if (unMaterialFeeData.length > 0) {
                    UnMaterialFeeGridData = unMaterialFeeData.map(item => {
                        const extendObjects = item.extendObjects || {};
                        return {
                            s_tree_id: 'wbz' + extendObjects.s_tree_id,
                            s_tree_pid: extendObjects.s_tree_name === '材料供应采购' ? 'wbz2200' : 'wbz' + extendObjects.s_tree_pid,
                            s_tree_no: extendObjects.s_tree_no,
                            s_tree_name: extendObjects.s_tree_name,
                            u_htbh: extendObjects.cnt_no,
                            u_ywzb: extendObjects.ywzb,
                            u_zrcbzb: extendObjects.zrcbzb,
                            u_ewzb: extendObjects.ewzb,
                            u_htje: extendObjects.cnt_sum_vat_fc,
                            u_yjjsz: extendObjects.yjjsz,
                            u_bykd: extendObjects.settle_vat_amt_mon,
                            u_bnljkd: extendObjects.settle_vat_amt_year,
                            u_kgljkd: extendObjects.settle_vat_amt_all,
                            u_byysgck: extendObjects.should_pay_mon,
                            u_kgljysgck: extendObjects.should_pay_all,
                            u_byssgck: extendObjects.act_pay_mon,
                            u_kgljssgck: extendObjects.act_pay_all,
                            u_htzt: extendObjects.cnt_status
                        };
                    });
                }
            }

            // 处理预估周转材料数据
            let UnZhouMatGridData = [];
            if (unZhouMatRes.count > 0) {
                const unZhouMatData = JSON.parse(unZhouMatRes.data);
                if (unZhouMatData.length > 0) {
                    UnZhouMatGridData = unZhouMatData.map(item => {
                        const extendObjects = item.extendObjects || {};
                        return {
                            s_tree_id: 'wbz' + extendObjects.s_tree_id,
                            s_tree_pid: extendObjects.s_tree_name === '周材租赁材料成本' || extendObjects.s_tree_name === '周材租赁' ? 'wbz2200' : 'wbz' + extendObjects.s_tree_pid,
                            s_tree_no: extendObjects.s_tree_no,
                            s_tree_name: extendObjects.s_tree_name,
                            u_htbh: extendObjects.cnt_no,
                            u_ywzb: extendObjects.ywzb,
                            u_zrcbzb: extendObjects.zrcbzb,
                            u_ewzb: extendObjects.ewzb,
                            u_htje: extendObjects.cnt_sum_vat_fc,
                            u_yjjsz: extendObjects.yjjsz,
                            u_bykd: extendObjects.settle_vat_amt_mon,
                            u_bnljkd: extendObjects.settle_vat_amt_year,
                            u_kgljkd: extendObjects.settle_vat_amt_all,
                            u_byysgck: extendObjects.should_pay_mon,
                            u_kgljysgck: extendObjects.should_pay_all,
                            u_byssgck: extendObjects.act_pay_mon,
                            u_kgljssgck: extendObjects.act_pay_all,
                            u_htzt: extendObjects.cnt_status
                        };
                    });
                }
            }

            // 处理预估机械费用数据
            let UnMachineryGridData = [];
            if (unMachineryRes.count > 0) {
                const unMachineryData = JSON.parse(unMachineryRes.data);
                if (unMachineryData.length > 0) {
                    UnMachineryGridData = unMachineryData.map(item => {
                        const extendObjects = item.extendObjects || {};
                        return {
                            s_tree_id: 'wbz' + extendObjects.s_tree_id,
                            s_tree_pid: extendObjects.s_tree_name === '机械购置及租赁成本' ? 'wbz2200' : 'wbz' + extendObjects.s_tree_pid,
                            s_tree_no: extendObjects.s_tree_no,
                            s_tree_name: extendObjects.s_tree_name,
                            u_htbh: extendObjects.cnt_no,
                            u_ywzb: extendObjects.ywzb,
                            u_zrcbzb: extendObjects.zrcbzb,
                            u_ewzb: extendObjects.ewzb,
                            u_htje: extendObjects.cnt_sum_vat_fc,
                            u_yjjsz: extendObjects.yjjsz,
                            u_bykd: extendObjects.settle_vat_amt_mon,
                            u_bnljkd: extendObjects.settle_vat_amt_year,
                            u_kgljkd: extendObjects.settle_vat_amt_all,
                            u_byysgck: extendObjects.should_pay_mon,
                            u_kgljysgck: extendObjects.should_pay_all,
                            u_byssgck: extendObjects.act_pay_mon,
                            u_kgljssgck: extendObjects.act_pay_all,
                            u_htzt: extendObjects.cnt_status
                        };
                    });
                }
            }

            // 处理预估其他费用数据
            let UnOtherGridData = [];
            if (unOtherRes.count > 0) {
                const unOtherData = JSON.parse(unOtherRes.data);
                if (unOtherData.length > 0) {
                    UnOtherGridData = unOtherData.map(item => {
                        const extendObjects = item.extendObjects || {};
                        return {
                            s_tree_id: 'wbz' + extendObjects.s_tree_id,
                            s_tree_pid: extendObjects.s_tree_name === '安全文明施工费' || extendObjects.s_tree_name === '临时设施费' || extendObjects.s_tree_name === '其他措施费' || extendObjects.s_tree_name === '管理费' ? 'wbz2200' : 'wbz' + extendObjects.s_tree_pid,
                            s_tree_no: extendObjects.s_tree_no,
                            s_tree_name: extendObjects.s_tree_name,
                            u_htbh: extendObjects.cnt_no,
                            u_ywzb: extendObjects.ywzb,
                            u_zrcbzb: extendObjects.zrcbzb,
                            u_ewzb: extendObjects.ewzb,
                            u_htje: extendObjects.cnt_sum_vat_fc,
                            u_yjjsz: extendObjects.yjjsz,
                            u_bykd: extendObjects.settle_vat_amt_mon,
                            u_bnljkd: extendObjects.settle_vat_amt_year,
                            u_kgljkd: extendObjects.settle_vat_amt_all,
                            u_byysgck: extendObjects.should_pay_mon,
                            u_kgljysgck: extendObjects.should_pay_all,
                            u_byssgck: extendObjects.act_pay_mon,
                            u_kgljssgck: extendObjects.act_pay_all,
                            u_htzt: extendObjects.cnt_status
                        };
                    });
                }
            }

            // 功能扩展返回数据
            console.log("inComeGridData:", inComeGridData);
            console.log("SpecialityGridData:", SpecialityGridData);
            console.log("LaborGridData:", LaborGridData);
            console.log("MaterialPurGridData:", MaterialPurGridData);
            console.log("MaterialRentalGridData:", MaterialRentalGridData);
            console.log("SporadicMaterialGridData:", SporadicMaterialGridData);
            console.log("JixiezulinGridData:", JixiezulinGridData);
            console.log("AnquanwenmingGridData:", AnquanwenmingGridData);
            console.log("LinshisheshiGridData:", LinshisheshiGridData);
            console.log("QitazhichuGridData:", QitazhichuGridData);
            console.log("ManageFeeGridData:", ManageFeeGridData);
            console.log("TanAndShuiGridData:", TanAndShuiGridData);
            console.log("UnProAndLabGridData:", UnProAndLabGridData);
            console.log("UnMaterialFeeGridData:", UnMaterialFeeGridData);
            console.log("UnZhouMatGridData:", UnZhouMatGridData);
            console.log("UnMachineryGridData:", UnMachineryGridData);
            console.log("UnOtherGridData:", UnOtherGridData);


            // 根据执行时间动态设置setTimeout的毫秒数，确保有足够时间处理数据
            // 基础时间为执行时间的1.5倍，最少100ms，最多5000ms
            const timeoutMs = Math.max(100, Math.min(5000, executionTime * 1.5));
            console.log(`动态设置的 setTimeout 时间: ${timeoutMs}ms`);

            // 等待数据加载完成后-构造树形
            setTimeout(() => {
                //构建树形数据
                function buildTree(data) {
                    const tree = [];
                    const map = new Map();

                    // Step 1: Build a map of all nodes
                    data.forEach(item => {
                        map.set(item.s_tree_id, { ...item, children: [] });
                    });

                    // Step 2: Build the tree
                    data.forEach(item => {
                        const node = map.get(item.s_tree_id);
                        if (item.s_tree_id == '5690000000015892') {
                            console.log('item--------------->', item)
                        }
                        if (item.s_tree_pid == 0) {
                            tree.push(node);  // Root nodes
                        } else {
                            const parent = map.get(item.s_tree_pid);
                            if (parent) {
                                parent.children.push(node);  // Attach children to the parent
                            }
                        }
                    });
                    return tree;
                }

                // 处理在建项目数据，转换为网格数据格式
                let zjProjGridData = [];
                if (zjProjData.length > 0) {
                    // 首先过滤掉不需要的分类节点
                    const filteredZjProjData = zjProjData.filter(item => {
                        const extendObjects = item.extendObjects || {};
                        const s_tree_name = extendObjects.s_tree_name;

                        // 过滤掉分类节点：当存在对应的现有合约包时，不包含在建项目的分类节点
                        if (s_tree_name === '专业分包' || s_tree_name === '劳务分包' ||
                            s_tree_name === '材料供应采购成本' || s_tree_name === '材料租赁成本' ||
                            s_tree_name === '机械购置及租赁成本' || s_tree_name === '机械租赁' ||
                            s_tree_name === '安全文明费' || s_tree_name === '临时设施费' ||
                            s_tree_name === '项目其他服务合同成本' ||
                            s_tree_name === '项目期间管理费' || s_tree_name === '管理费') {
                            return !existingContractMap[s_tree_name];
                        }
                        return true;
                    });

                    // 基于过滤后的数据重新构建zjProjMap
                    let filteredZjProjMap = {};
                    filteredZjProjData.forEach(item => {
                        const extendObjects = item.extendObjects || {};
                        const s_tree_name = extendObjects.s_tree_name;
                        if (s_tree_name === '专业分包' || s_tree_name === '劳务分包' ||
                            s_tree_name === '材料供应采购成本' || s_tree_name === '材料租赁成本' ||
                            s_tree_name === '机械购置及租赁成本' || s_tree_name === '机械租赁' ||
                            s_tree_name === '安全文明费' || s_tree_name === '临时设施费' ||
                            s_tree_name === '项目其他服务合同成本' ||
                            s_tree_name === '项目期间管理费' || s_tree_name === '管理费') {
                            filteredZjProjMap[s_tree_name] = extendObjects;
                        }
                    });

                    // 转换为网格数据格式
                    zjProjGridData = filteredZjProjData.map(item => {
                        const extendObjects = item.extendObjects || {};
                        let s_tree_pid = extendObjects.s_tree_pid;
                        const s_tree_name = extendObjects.s_tree_name;

                        // 检查当前节点的父节点是否是需要特殊处理的类型
                        const parentNode = filteredZjProjData.find(parentItem => {
                            const parentExtend = parentItem.extendObjects || {};
                            return parentExtend.s_tree_id === s_tree_pid;
                        });

                        if (parentNode) {
                            const parentExtend = parentNode.extendObjects || {};
                            const parentTreeName = parentExtend.s_tree_name;

                            // 如果父节点是需要特殊处理的类型，检查是否存在对应的现有合约包
                            if (existingContractMap[parentTreeName]) {
                                // 如果存在现有合约包，将子节点挂载到现有合约包下
                                s_tree_pid = existingContractMap[parentTreeName];
                            } else if (filteredZjProjMap[parentTreeName]) {
                                // 如果不存在现有合约包，但存在在建项目的分类节点，保持原有挂载
                                s_tree_pid = filteredZjProjMap[parentTreeName].s_tree_id;
                            }
                        } else {
                            // 如果父节点不存在（可能被过滤掉了），检查是否是需要特殊处理的类型的子节点
                            // 查找原始数据中的父节点
                            const originalParentNode = zjProjData.find(parentItem => {
                                const parentExtend = parentItem.extendObjects || {};
                                return parentExtend.s_tree_id === s_tree_pid;
                            });

                            if (originalParentNode) {
                                const parentExtend = originalParentNode.extendObjects || {};
                                const parentTreeName = parentExtend.s_tree_name;

                                // 如果原始父节点是需要特殊处理的类型，检查是否存在对应的现有合约包
                                if (existingContractMap[parentTreeName]) {
                                    // 如果存在现有合约包，将子节点挂载到现有合约包下
                                    s_tree_pid = existingContractMap[parentTreeName];
                                }
                            }
                        }

                        // 查找匹配的浪潮收付款数据
                        let byssgck = extendObjects.act_pay_mon || 0;
                        let kgljssgck = extendObjects.act_pay_all || 0;

                        // 检查是否有s_tree_id（对应u_htid）
                        if (extendObjects.s_tree_id) {
                            const u_htid = String(extendObjects.s_tree_id);
                            // console.log('Checking zjProj s_tree_id:', u_htid);
                            // console.log('langchaoPaymentMap has key:', u_htid in langchaoPaymentMap);
                            // console.log('langchaoPaymentMapAll has key:', u_htid in langchaoPaymentMapAll);

                            if (langchaoPaymentMap[u_htid]) {
                                console.log('Found zjProj payment data:', langchaoPaymentMap[u_htid]);
                                byssgck = langchaoPaymentMap[u_htid];
                                // kgljssgck = langchaoPaymentMap[u_htid];
                            }
                            if (langchaoPaymentMapAll[u_htid]) {
                                kgljssgck = langchaoPaymentMapAll[u_htid];
                            }
                        }
                        // 同时检查phid_cnt（保持与收入预算数据处理一致）
                        else if (extendObjects.phid_cnt) {
                            const u_htid = String(extendObjects.phid_cnt);
                            // console.log('Checking zjProj phid_cnt:', u_htid);
                            // console.log('langchaoPaymentMap has key:', u_htid in langchaoPaymentMap);
                            // console.log('langchaoPaymentMapAll has key:', u_htid in langchaoPaymentMapAll);
                            if (langchaoPaymentMap[u_htid]) {
                                console.log('Found zjProj payment data:', langchaoPaymentMap[u_htid]);
                                byssgck = langchaoPaymentMap[u_htid];
                                // kgljssgck = langchaoPaymentMap[u_htid];
                            }
                            if (langchaoPaymentMapAll[u_htid]) {
                                kgljssgck = langchaoPaymentMapAll[u_htid];
                            }
                        }

                        return {
                            s_tree_id: extendObjects.s_tree_id,
                            s_tree_pid: s_tree_pid,
                            s_tree_no: extendObjects.s_tree_no,
                            s_tree_name: extendObjects.s_tree_name,
                            u_htbh: extendObjects.cnt_no,
                            u_ywzb: extendObjects.ywzb,
                            u_zrcbzb: extendObjects.zrcbzb,
                            u_ewzb: extendObjects.ewzb,
                            u_htje: extendObjects.cnt_sum_vat_fc,
                            u_yjjsz: extendObjects.yjjsz,
                            u_bykd: extendObjects.settle_vat_amt_mon,
                            u_bnljkd: extendObjects.settle_vat_amt_year,
                            u_kgljkd: extendObjects.settle_vat_amt_all,
                            u_byysgck: extendObjects.should_pay_mon,
                            u_kgljysgck: extendObjects.should_pay_all,
                            u_byssgck: byssgck,
                            u_kgljssgck: kgljssgck,
                            u_htzt: extendObjects.cnt_status
                        };
                    });
                }

                // 合并所有数据
                const combinedData = [...inComeGridData, ...zjProjGridData, ...SpecialityGridData, ...LaborGridData, ...MaterialPurGridData, ...MaterialRentalGridData, ...SporadicMaterialGridData, ...JixiezulinGridData, ...AnquanwenmingGridData, ...LinshisheshiGridData, ...QitazhichuGridData, ...ManageFeeGridData, ...TanAndShuiGridData, ...UnProAndLabGridData, ...UnMaterialFeeGridData, ...UnZhouMatGridData, ...UnMachineryGridData, ...UnOtherGridData];
                const result = buildTree(combinedData);
                console.log("合并后的树形数据:", result);
                console.log(JSON.stringify(result, null, 2));

                //层级汇总二维指标的树形数据
                function buildTreeAndAggregate(data) {
                    const tree = [];
                    const map = new Map();

                    // 第一步：构建节点映射
                    data.forEach(item => {
                        map.set(item.s_tree_id, { ...item, children: [] });
                    });

                    // 第二步：构建树形结构
                    data.forEach(item => {
                        const node = map.get(item.s_tree_id);
                        if (item.s_tree_pid == 0) {
                            tree.push(node);  // 根节点
                        } else {
                            const parent = map.get(item.s_tree_pid);
                            if (parent) {
                                parent.children.push(node);  // 将子节点加入父节点
                            }
                        }
                    });

                    // 判断一个节点是否是合同层（末级）
                    function isContractNode(node) {
                        return !!node.u_htbh; // 如果有合同编号，说明是合同层
                    }
                    // 第三步：进行层级汇总，覆盖父级的二维指标数据
                    function aggregateTree(node) {
                        // 先递归处理子节点
                        node.children.forEach(child => aggregateTree(child));

                        // 如果是合同层，跳过该节点，直接保留原值
                        if (isContractNode(node)) {
                            node.u_ywzb = node.u_ywzb || null;
                            node.u_zrcbzb = node.u_zrcbzb || null;
                            node.u_ewzb = node.u_ewzb || null;
                            node.u_htje = node.u_htje || null;
                            node.u_bykd = node.u_bykd || null;
                            node.u_bnljkd = node.u_bnljkd || null;
                            node.u_kgljkd = node.u_kgljkd || null;
                            node.u_byysgck = node.u_byysgck || null;
                            node.u_kgljysgck = node.u_kgljysgck || null;
                            node.u_byssgck = node.u_byssgck || null;
                            node.u_kgljssgck = node.u_kgljssgck || null;
                            return;
                        }

                        // 非合同层：从子节点汇总 u_ewzb 值
                        let sum = 0;
                        let sum_htje = 0;
                        let sum_yjjs = 0;
                        let sum_bykd = 0;
                        let sum_bnljkd = 0;
                        let sum_kgljkd = 0;
                        let sum_byysgck = 0;
                        let sum_kgljysgck = 0;
                        let sum_byssgck = 0;
                        let sum_kgljssgck = 0;
                        let sum_ywzb = 0;
                        let sum_zrcbzb = 0;
                        node.children.forEach(child => {
                            if (!isContractNode(child)) {
                                sum += Number(child.u_ewzb || null);
                                sum_ywzb += Number(child.u_ywzb || null);
                                sum_zrcbzb += Number(child.u_zrcbzb || null);
                            }

                            sum_htje += Number(child.u_htje || null);
                            sum_yjjs += Number(child.u_yjjsz || null);
                            sum_bykd += Number(child.u_bykd || null);
                            sum_bnljkd += Number(child.u_bnljkd || null);
                            sum_kgljkd += Number(child.u_kgljkd || null);
                            sum_byysgck += Number(child.u_byysgck || null);
                            sum_kgljysgck += Number(child.u_kgljysgck || null);
                            sum_byssgck += Number(child.u_byssgck || null);
                            sum_kgljssgck += Number(child.u_kgljssgck || null);

                        });

                        // 如果没有子节点的汇总值（sum为0），就使用当前节点的值
                        node.u_ywzb = (sum_ywzb !== 0 ? sum_ywzb : Number(node.u_ywzb || null)).toFixed(2);
                        node.u_zrcbzb = (sum_zrcbzb !== 0 ? sum_zrcbzb : Number(node.u_zrcbzb || null)).toFixed(2);
                        node.u_ewzb = (sum !== 0 ? sum : Number(node.u_ewzb || null)).toFixed(2);
                        node.u_htje = (sum_htje !== 0 ? sum_htje : Number(node.u_htje || null)).toFixed(2);
                        node.u_yjjsz = (sum_yjjs !== 0 ? sum_yjjs : Number(node.u_yjjsz || null)).toFixed(2);
                        node.u_bykd = (sum_bykd !== 0 ? sum_bykd : Number(node.u_bykd || null)).toFixed(2);
                        node.u_bnljkd = (sum_bnljkd !== 0 ? sum_bnljkd : Number(node.u_bnljkd || null)).toFixed(2);
                        node.u_kgljkd = (sum_kgljkd !== 0 ? sum_kgljkd : Number(node.u_kgljkd || null)).toFixed(2);
                        node.u_byysgck = (sum_byysgck !== 0 ? sum_byysgck : Number(node.u_byysgck || null)).toFixed(2);
                        node.u_kgljysgck = (sum_kgljysgck !== 0 ? sum_kgljysgck : Number(node.u_kgljysgck || null)).toFixed(2);
                        node.u_byssgck = (sum_byssgck !== 0 ? sum_byssgck : Number(node.u_byssgck || null)).toFixed(2);
                        node.u_kgljssgck = (sum_kgljssgck !== 0 ? sum_kgljssgck : Number(node.u_kgljssgck || null)).toFixed(2);
                    }


                    // 对树形数据中的所有节点进行汇总
                    //tree.forEach(aggregateValues);
                    tree.forEach(root => aggregateTree(root));
                    return tree;
                }

                // 使用修改后的汇总函数，构建树形数据并进行汇总
                const result2 = buildTreeAndAggregate(combinedData);
                console.log("汇总后的树形数据:", result2);
                console.log(JSON.stringify(result2, null, 2));

                // 计算收益率方法
                function calculateYieldRate(fieldName, targetFieldName) {
                    const index_max = result2.length - 1;
                    var sr = (Number(result2[1][fieldName]) === null ? 0 : Number(result2[1][fieldName]));
                    var cb = (Number(result2[2][fieldName]) + Number(result2[index_max][fieldName])) === null ? 0 : Number(result2[2][fieldName]) + Number(result2[index_max][fieldName]);
                    var syl = (Number(sr) === 0) ? 0 : ((sr - cb) / sr);
                    mstform.getItem(targetFieldName).setValue(Number(syl));
                }

                // 计算主表收益率
                calculateYieldRate('u_ywzb', 'u_ywzbsyl');
                calculateYieldRate('u_zrcbzb', 'u_mblrl');
                calculateYieldRate('u_ewzb', 'u_ewzbsyl');
                calculateYieldRate('u_bykd', 'u_yjlrl');
                calculateYieldRate('u_bnljkd', 'u_bnkdlrl');
                calculateYieldRate('u_kgljkd', 'u_ljkdlrl');

                //插入数据
                dgrid.clearRows().then(() => {
                    dgrid.addRows(result2);
                    // 数据加载完成后移除加载提示
                    document.body.removeChild(loadingDiv);
                });

            }, timeoutMs);

        } catch (error) {
            console.error("数据加载失败:", error);
            // 加载失败时也移除加载提示
            document.body.removeChild(loadingDiv);
            $NG.confirm("数据加载失败，请联系技术人员处理");
        }

    });

});