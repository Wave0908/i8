$NG.AllReady(function (listPage, { useValuesChange, useUpdateRows, useBeforeClick, useUpdateRow, useDataIndexChange, useClick }) {
    console.log(listPage);
    console.log("list Ready");
    const { origin, pathname } = window.location;
    console.log(`${origin}`);

    // const baseUrl = "http://nginx.clouddev.hisense.com/react/index.html";
    const queryParams = {
        // id: "8570000000000001",
        otype: "view", // 查看 edit add
        busType: "EFORM9000000215",
        isSso: "1",
        treeOcode: "8570000000000014",
        treeOcodeName: "%E9%9D%92%E5%B2%9B%E6%B5%B7%E4%BF%A1%E7%BD%91%E7%BB%9C%E7%A7%91%E6%8A%80%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8",
        AppTitle: "采购应付分析池",
    }; // 构造查询字符串

    //  'http://nginx.clouddev.hisense.com/react/index.html#/customform/detail?otype=add&busType=EFORM9000000215&isSso=1&AppTitle=%E9%87%87%E8%B4%AD%E5%BA%94%E4%BB%98%E5%88%86%E6%9E%90%E6%B1%A0-%E6%96%B0%E5%A2%9E&treeOcode=8570000000000014&treeOcodeName=%E9%9D%92%E5%B2%9B%E6%B5%B7%E4%BF%A1%E7%BD%91%E7%BB%9C%E7%A7%91%E6%8A%80%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8'
    const queryString = new URLSearchParams(queryParams).toString();
    
    const url = `${origin}${pathname}#/customform/detail?${queryString}`; // 打开URL // $NG.open(url, { AppTitle: "定价需求池" });
    // const url = 'https://sdtest.hisense.com/react/index.html?refresh=1765251472273#/customform/detail?otype=add&busType=EFORM9000000215&isSso=1&treeOcode=8570000000000014&treeOcodeName=%25E9%259D%2592%25E5%25B2%259B%25E6%25B5%25B7%25E4%25BF%25A1%25E7%25BD%2591%25E7%25BB%259C%25E7%25A7%2591%25E6%258A%2580%25E8%2582%25A1%25E4%25BB%25BD%25E6%259C%2589%25E9%2599%2590%25E5%2585%25AC%25E5%258F%25B8&AppTitle=%E9%87%87%E8%B4%AD%E5%BA%94%E4%BB%98%E5%88%86%E6%9E%90%E6%B1%A0'
    console.log(url);

    window.location.href = url;
    function softRefresh() {
        const url = new URL(window.location.href);
        url.searchParams.set('refresh', Date.now());
        window.history.replaceState({}, '', url);
    }
    softRefresh()
    ////////////////////////////////////////--获取组件实例
    const mstform = $NG.getCmpApi("p_form_yffx_m");
    const dgrid = $NG.getCmpApi("p_form_yffx_d");
    const toolbar_top = $NG.getCmpApi("toolbar_top");
    const toolbar_dgrid1 = $NG.getCmpApi("toolbar_p_form_yffx_d");

    var formToolbar = $NG.getCmpApi("toolbar_top");
    var btn = ["save", "imp_push", "imp_push_his", "check", "attachment", "history", "applycheck"];
    for (let index = 0; index < btn.length; index++) {
        try{
            formToolbar.hideButton(btn[index]);
        }catch(e){}
    }
    var btn1 = ["addrow", "deleterow", "attachment"]
    for (let index = 0; index < btn1.length; index++) {
        toolbar_dgrid1.hideButton(btn1[index]);
    }

    if (toolbar_top) {
        ////////////////////////////////////////--添加按钮 指派招标人

        ////////////////////////////////////////--隐藏按钮 保存
        toolbar_top.setHidden("imp", "imppush", "import", "save", "attachment", "check", "history", "applycheck", "addrow");


    }

    mstform.setReadOnly("bill_no", false); //取消只读
    mstform.setReadOnly("bill_name", false); //取消只读
    mstform.setReadOnly("phid_pc", false); //取消只读
    mstform.setReadOnly("u_supply", false); //取消只读
    mstform.setReadOnly("u_dqyfrq", false); //取消只读
    mstform.setReadOnly("u_zczfqrzt", false); //取消只读
    mstform.setReadOnly("u_bzezfqr", false); //取消只读
    mstform.setReadOnly("u_cwyfqr", false); //取消只读
    mstform.setReadOnly("u_dqyfsyje", false); //取消只读
    mstform.setReadOnly("u_tqjjfk", false); //取消只读
    mstform.setReadOnly("u_cgy", false); //取消只读
    mstform.getItem("u_dqyfsyje").setValue("0")
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    let datanow = `${year}-${month}-${day}`;
    mstform.getItem('u_dqyfrq').setValue(datanow)

    if (dgrid) {
        const dkey = ["u_zczfqrzt", "u_tqjjfk"]
        dkey.forEach(item => {
            $NG.updateUI((updater) => {
                updater.editGrid.p_form_yffx_d[item].setProps({
                    disabled: false, //只读
                });
            });
        })
        // 设置字段隐藏
    }
    ////////////////////////////////////////-- 添加按钮 查询
    if (toolbar_dgrid1) {
        // toolbar_dgrid1.insert({
        //   id: "u_search",
        //   text: "查询",
        //   iconCls: "icon-New",
        // });

        toolbar_dgrid1.insert({
            id: "editPerson2",
            text: "正常支付确认",
            iconCls: "icon-New",
        });
        toolbar_dgrid1.insert({
            id: "editPerson",
            text: "不足额支付确认",
            iconCls: "icon-New",
        });
        toolbar_dgrid1.insert({
            id: "editPayDate",
            text: "财务应付确认",
            iconCls: "icon-New",
        });
        toolbar_dgrid1.insert({
            id: "u_push10",
            // text: "下推采购付款申请",
            text: "下推项目月度预测",
            iconCls: "icon-New",
        });


        useDataIndexChange(({ args }) => {
            // 更新紧急付款信息
            const row = args[0]
            updateInPay(row.u_tqjjfk, row.u_yflx_phid, row)
        }, "u_tqjjfk")

        useClick(() => {
            updatePayDate()
        }, "editPayDate")
        useBeforeClick(() => {
            let checkrows = [...dgrid.getSelectedData()]
            let lok = false
            // 获取合同的所有信息
            checkrows.forEach((item) => {   
                console.log(`测试下推条件`, item.u_zczfqrzt, item.u_bzezfqr, item.u_tqjjfk);
                if (item.u_zczfqrzt == "1" || item.u_bzezfqr == "1" || item.u_tqjjfk == '1') {
                    console.log(`进来了`, item.u_zczfqrzt == "1" || item.u_bzezfqr == "1" || item.u_tqjjfk == '2', Boolean(item.u_tqjjfk));
                    lok = true
                }
            })
            console.log(`当前lok`, lok);
            if (!lok) {
                $NG.alert("应付明细采购员未发起应付确认，请核实后在点击！")
                return false
            }
            return true
        }, "editPayDate")

        useBeforeClick(async function ({ args }) {
            try {
                // 获取选中行数据
                const rows = $NG.getCmpApi('p_form_yffx_d').getSelectedData();
                if (!rows || rows.length === 0) {
                    $NG.alert('请先选择数据');
                    return false; // 阻止后续执行
                }


                // $NG.alert('存在未完成定价的数据');
                const shouldContinue = await new Promise((resolve) => {
                    const overlay = document.createElement('div');
                    overlay.style = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          `;

                    // 创建弹窗容器
                    const modal = document.createElement('div');
                    modal.style = `
            background: white;
            padding: 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            width: 500px;
            animation: slideIn 0.3s ease;
          `;

                    // 弹窗内容
                    modal.innerHTML = `
            <h3 style="margin:0 0 16px; color: #333; font-size: 16px;">是否修改不足额支付状态</h3>
    
            <div style="display: flex; justify-content: flex-end; gap: 8px;">
              <button id="cancelBtn" style="
                padding: 8px 16px;
                border: 1px solid #ddd;
                border-radius: 4px;
                background: white;
                cursor: pointer;
              ">取消</button>
              <button id="confirmBtn" style="
                padding: 8px 16px;
                border: none;
                border-radius: 4px;
                background: #1890ff;
                color: white;
                cursor: pointer;
              ">确认</button>
            </div>
          `;

                    // 添加到页面
                    overlay.appendChild(modal);
                    document.body.appendChild(overlay);
                    const errorMsg = modal.querySelector('#errorMsg') || document.createElement('div'); // 获取或创建错误提示

                    // 清空旧提示
                    errorMsg.innerHTML = '';
                    // 添加动画
                    const style = document.createElement('style');
                    style.innerHTML = `
            @keyframes slideIn {
              from { transform: translateY(-20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `;
                    document.head.appendChild(style);

                    // 绑定事件
                    const confirmBtn = modal.querySelector('#confirmBtn');
                    const cancelBtn = modal.querySelector('#cancelBtn');

                    // 确认驳回逻辑
                    confirmBtn.onclick = () => {
                        document.body.removeChild(overlay);
                        document.head.removeChild(style);
                        resolve(true); // 用户确认继续
                    };
                    // 取消逻辑
                    const closeModal = () => {
                        document.body.removeChild(overlay);
                        document.head.removeChild(style);
                        resolve(false); // 用户取消操作
                    };
                    cancelBtn.onclick = closeModal;
                })
                if (!shouldContinue) {
                    return false; // 拦截后续流程
                }
            } catch (error) {
                console.error('操作失败:', error);
                $NG.alert('状态校验异常，请检查数据');
                return false;
            }
        }, "editPerson");
        useBeforeClick(async function ({ args }) {
            try {
                // 获取选中行数据
                const rows = $NG.getCmpApi('p_form_yffx_d').getSelectedData();
                if (!rows || rows.length === 0) {
                    $NG.alert('请先选择数据');
                    return false; // 阻止后续执行
                }


                // $NG.alert('存在未完成定价的数据');
                const shouldContinue = await new Promise((resolve) => {
                    const overlay = document.createElement('div');
                    overlay.style = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          `;

                    // 创建弹窗容器
                    const modal = document.createElement('div');
                    modal.style = `
            background: white;
            padding: 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            width: 500px;
            animation: slideIn 0.3s ease;
          `;

                    // 弹窗内容
                    modal.innerHTML = `
            <h3 style="margin:0 0 16px; color: #333; font-size: 16px;">是否修改正常支付确认状态</h3>
    
            <div style="display: flex; justify-content: flex-end; gap: 8px;">
              <button id="cancelBtn" style="
                padding: 8px 16px;
                border: 1px solid #ddd;
                border-radius: 4px;
                background: white;
                cursor: pointer;
              ">取消</button>
              <button id="confirmBtn" style="
                padding: 8px 16px;
                border: none;
                border-radius: 4px;
                background: #1890ff;
                color: white;
                cursor: pointer;
              ">确认</button>
            </div>
          `;

                    // 添加到页面
                    overlay.appendChild(modal);
                    document.body.appendChild(overlay);
                    const errorMsg = modal.querySelector('#errorMsg') || document.createElement('div'); // 获取或创建错误提示

                    // 清空旧提示
                    errorMsg.innerHTML = '';
                    // 添加动画
                    const style = document.createElement('style');
                    style.innerHTML = `
            @keyframes slideIn {
              from { transform: translateY(-20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `;
                    document.head.appendChild(style);

                    // 绑定事件
                    const confirmBtn = modal.querySelector('#confirmBtn');
                    const cancelBtn = modal.querySelector('#cancelBtn');

                    // 确认驳回逻辑
                    confirmBtn.onclick = () => {
                        document.body.removeChild(overlay);
                        document.head.removeChild(style);
                        resolve(true); // 用户确认继续
                    };
                    // 取消逻辑
                    const closeModal = () => {
                        document.body.removeChild(overlay);
                        document.head.removeChild(style);
                        resolve(false); // 用户取消操作
                    };
                    cancelBtn.onclick = closeModal;
                })
                if (!shouldContinue) {
                    return false; // 拦截后续流程
                }
            } catch (error) {
                console.error('操作失败:', error);
                $NG.alert('状态校验异常，请检查数据');
                return false;
            }
        }, "editPerson2");
        useClick(async function ({ args }) {
            editPer()
        }, "editPerson");
        useClick(async function ({ args }) {
            editPer2()
        }, "editPerson2");
        function editPer(params) {
            try {

                let rows = $NG.getCmpApi('p_form_yffx_d').getSelectedData();
                const promises = rows.map(row => {
                    return new Promise((resolve, reject) => {
                        const date = new Date();
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        let datanow = `${year}-${month}-${day}`;
                        const sql = `u_bzezfqr=1`;
                        console.log(sql);
                        $NG.execServer('updataCgyfdBz', { phid: `('${row.u_yflx_phid}')`, date: datanow }, function (res) {
                            if (res.status == "success") {
                                row.u_bzezfqrrq = datanow;
                                resolve();
                            } else {
                                reject();
                            }
                        })
                        $NG.execServer(
                            "UPDATE",
                            {
                                tbname: 'p_form_pro_accounts_pay_d3',
                                sqlStr: sql,
                                queryStr: `phid = ${row.u_yflx_phid}`
                            },
                            (res) => {
                                if (res.status === 'success') {
                                    row.u_bzezfqr = '1';
                                    row.u_bzezfqrrq = datanow;
                                    dgrid.refreshView()
                                    resolve(); // 标记为成功
                                } else {
                                    reject();   // 标记为失败
                                }
                            }
                        );
                    });
                });
                Promise.all(promises)
                    .then(() => {
                        $NG.alert('修改成功！');
                        dgrid.refreshView()
                    })
                    .catch(() => {
                        $NG.alert('部分数据修改失败，请检查日志');
                    });
            } catch (error) {
                $NG.alert("修改失败,请联系技术人员处理");
            }

        }
        function editPer2(params) {
            try {

                let rows = $NG.getCmpApi('p_form_yffx_d').getSelectedData();
                const promises = rows.map(row => {
                    return new Promise((resolve, reject) => {
                        const date = new Date();
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        let datanow = `${year}-${month}-${day}`;
                        const sql = `u_zczfqrzt=1`;
                        console.log(sql);
                        $NG.execServer('updateCgyfdZc', { phid: `(${row.u_yflx_phid})`, date: datanow }, function (res) {
                            if (res.status == "success") {
                                row.u_zczfqrsj = datanow;
                                dgrid.refreshView()
                                resolve();
                            } else {
                                reject();
                            }
                        })
                        $NG.execServer(
                            "UPDATE",
                            {
                                tbname: 'p_form_pro_accounts_pay_d3',
                                sqlStr: sql,
                                queryStr: `phid = ${row.u_yflx_phid}`
                            },
                            (res) => {
                                if (res.status === 'success') {
                                    row.u_zczfqrzt = '1';
                                    // row.u_bzezfqrrq = datanow;
                                    dgrid.refreshView()
                                    resolve(); // 标记为成功
                                } else {
                                    reject();   // 标记为失败
                                }
                            }
                        );
                    });
                });
                Promise.all(promises)
                    .then(() => {
                        $NG.alert('修改成功！');
                        dgrid.refreshView()
                    })
                    .catch(() => {
                        $NG.alert('部分数据修改失败，请检查日志');
                    });
            } catch (error) {
                $NG.alert("修改失败,请联系技术人员处理");
            }

        }

        // 更新紧急付款
        async function updateInPay(val, phid, row) {
            if (!val || !phid) return
            // const result = await $NG.confirm('确认更新财务确认时间吗？')
            // if (!result) return
            const currentDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
            $NG.execServer("updateCgyfJjdate", { is: val, date: currentDate, phid: `'${phid}'` }, (res) => {
                if (res.status && res.status == 'success') {
                    $NG.message(res.msg)
                    // 更新显示数据
                    row.u_tqjjfkrq = currentDate
                    row.u_tqjjfk = val
                    dgrid.refreshView()
                } else {
                    $NG.alert("更新发生异常请联系管理员！")
                }
            })
        }

        // 更新财务确认时间
        async function updatePayDate() {
            // let lock = true
            // 获取选中行
            const checkrows = dgrid.getSelectedData()
            const phids = checkrows.reduce((value, item) => {
                // 校验
                // if(item.u_bzezfqr == '1' && item.u_zczfqrzt == '1' && item.u_tqjjfk){
                //     lock = false
                // }
                value.push(`'${item.u_yflx_phid}'`)
                return value
            }, [])
            // if(!lock) {
            //     $NG.alert("选中的应付明细有明细采购员未发起应付确认，请核实后在点击!")
            //     return
            // }
            const date = new Date()
            const currentDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
            const result = await $NG.confirm('确认更新财务确认时间吗？')
            if (!result) return
            $NG.execServer("updateCgyfPayDate", { phid: `${phids.join(",")}`, is: '1', date: currentDate }, (res) => {
                console.log(`更新响应体`, res);
                if (res.status && res.status == 'success') {
                    $NG.message(res.msg)
                    // 更新显示数据
                    checkrows.forEach(item => {
                        item.u_cwyfqrrq = currentDate
                        item.u_cwyfqr = '1'
                    })
                    dgrid.refreshView()
                } else {
                    $NG.alert("更新发生异常请联系管理员！")
                }
            })
        }


        function selectYffx(params) {
            const dgrid1 = $NG.getCmpApi("p_form_yffx_d");
            // 获取选中的数据
            const selectedData = dgrid1.getSelectedData();
            if (selectedData && selectedData.length > 0) {
                // 提取 u_source_id 和 u_source_table
                const extractedData = selectedData.map((item) => ({
                    u_cgy: item.u_cgy,
                    u_cgy: item.u_cgy,
                    u_dj_type: item.u_dj_type,
                    u_cnt_no: item.u_cnt_no,
                    u_cnt_name: item.u_cnt_name,
                    u_supply: item.u_supply,
                    u_supply_EXName: item.u_supply_EXName,
                    u_cnt_tk: item.u_cnt_tk,
                    u_yw_dt: item.u_yw_dt,
                    u_yf_dt: item.u_yf_dt,
                    u_fk_bl: item.u_fk_bl,
                    u_yf_amt: item.u_yf_amt
                }));
                localStorage.removeItem("selectYffx");
                console.log("LocalStorage 已清除");
                // 存储到 LocalStorage
                localStorage.setItem("selectYffx", JSON.stringify(extractedData));

                console.log("已存入 LocalStorage：", extractedData);
            } else {
                console.log("没有选中的数据");
            }
        }
        //下推采购申请
        // useClick(function ({ args }) {
        //     let rows = $NG.getCmpApi('p_form_yffx_d').getSelectedData();
        //     if (rows.length < 1) {
        //         $NG.alert('请先选择数据')
        //         return
        //     }
        //     const hasInvalidRow = rows.some(row =>
        //         row.u_zczfqrzt != "1" ||  // 注意判断类型，如果是字符串用"1"，数字则用1
        //         row.u_bzezfqr != "1"
        //     );

        //     if (hasInvalidRow) {
        //         $NG.alert('存在未确认的支付申请，请先完成支付确认！');
        //         return;
        //     }

        //     // 生成带期限的本地存储
        //     const timeout = (30 * 60 * 1000) + new Date().getTime()
        //     const uuid = generateUUID()
        //     const data = dgrid.getRows().reduce((Value, item) => {
        //         if (item.checked) {
        //             Value.push(item._allDatajson)
        //         }
        //         return Value
        //     }, [])
        //     // 存储
        //     const _temp_data = JSON.stringify({
        //         timeout: timeout,
        //         data: data
        //     })
        //     localStorage.setItem("YFD-" + uuid, _temp_data)
        //     // 清理超时的数据
        //     for (let i = localStorage.length - 1; i >= 0; i--) {
        //         const key = localStorage.key(i);
        //         if (key && key.startsWith("YFD")) {
        //             const timeout = JSON.parse(localStorage.getItem(key)).timeout
        //             if (timeout < new Date().getTime()) {
        //                 localStorage.removeItem(key);

        //             }

        //         }
        //     }
        //     //   const url_domain = `${origin}`; // 域名
        //     const url_domain = window.location.protocol + '//' + window.location.hostname;
        //     const url_path = "/FC/PFM/PayPlanPc/PayPlanPcEdit"; // 路径
        //     const url_params = "?otype=add&node_type=false&node_phid=8570000000000014" +
        //         "&shcmeid=8570000000000292&phidPc=0&menucode=190fc2f7-17da-45da-ad71-bfc79479319b&list_filter_val=&CsUIMultiQueryValue=%7B%7D"; // 参数
        //     $NG.open(url_domain + url_path + url_params, { AppTitle: "项目月度付款预测上报-新增" });
        // }, "u_push10");

        // 下推项目月度预测
        useClick(async () => {
            // 获取所有选中行
            let checkrows = [...dgrid.getSelectedData()]
            let lock = false
            // 获取合同的所有信息
            const cnts = checkrows.reduce((value, item) => {
                console.log(`测试下推条件`, item.u_zczfqrzt, item.u_bzezfqr, item.u_tqjjfk);
                if (item.u_cwyfqr == '1') {
                    if (item.u_zczfqrzt == "1" || item.u_bzezfqr == "1" || item.u_tqjjfk == '1') {
                        lock = true
                    }
                }
                value.push(`'${item.u_cnt_no}'`)
                return value
            }, [])
            if (!lock) {
                $NG.alert("应付明细采购员未发起应付确认，请核实后在点击！")
                return
            }
            await $NG.execServer("getCntMInfoByNos", { bill_no: `${cnts.join(",")}` }, (res) => {
                if (res.count == 0) {
                    $NG.alert("没有找到任何合同信息，下推被终止")
                    throw "没有找到任何合同信息，下推被终止"
                }

                const datas = JSON.parse(res.data)
                // 合并数据
                checkrows = checkrows.reduce((value, item) => {
                    let temp = { ...item }
                    let cnt = datas.filter(tt => {
                        const cnt = tt.extendObjects
                        if (cnt.pcm_no == temp.u_cnt_no) {
                            return true
                        } else {
                            return false
                        }
                    })
                    console.log(`下推cnt`, cnt);
                    if (cnt.length !== 0) {
                        temp = {
                            ...temp,
                            ...cnt[0].extendObjects
                        }
                    }
                    // 检查是否含有了该合同信息
                    const keys = Object.keys(value)
                    if (keys.includes(temp.u_cnt_no)) {
                        value[temp.u_cnt_no].push(temp)
                    } else {
                        value[temp.u_cnt_no] = [temp]
                    }
                    return value
                }, {})
            })
            // 存入本地
            console.log(`下推数据`, checkrows);
            localStorage.setItem("yffxc_to_prjectyc", JSON.stringify(checkrows))
            const queryParams = {
                otype: "add",
                node_type: "false",
                node_phid: "1",
                phidPc: "0",
                shcmeid: "8570000000000292",
                menucode: "fa35a8f9-d18d-44d9-b37a-9bf34a166877",
                list_filter_val: "",
                CsUIMultiQueryValue: "{}",
                AppTitle: "项目月度付款预测上报-新增"
            }

            //  'http://nginx.clouddev.hisense.com/react/index.html#/customform/detail?otype=add&busType=EFORM9000000215&isSso=1&AppTitle=%E9%87%87%E8%B4%AD%E5%BA%94%E4%BB%98%E5%88%86%E6%9E%90%E6%B1%A0-%E6%96%B0%E5%A2%9E&treeOcode=8570000000000014&treeOcodeName=%E9%9D%92%E5%B2%9B%E6%B5%B7%E4%BF%A1%E7%BD%91%E7%BB%9C%E7%A7%91%E6%8A%80%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8'
            const queryString = new URLSearchParams(queryParams).toString();
            const origin = location.origin
            const url = `/FC/PFM/PayPlanPc/PayPlanPcEdit?${queryString}`
            console.log(`下推url`, origin + url);
            $NG.open(origin + url)
        }, 'u_push10')
        function generateUUID() {
            // 生成一个长度为36的字符串，符合UUID v4格式
            var uuid = '', i, random;
            for (i = 0; i < 36; i++) {
                if (i === 8 || i === 13 || i === 18 || i === 23) {
                    uuid += '-';
                } else if (i === 14) {
                    uuid += '4';  // UUID版本号4
                } else if (i === 19) {
                    random = Math.floor(Math.random() * 16);
                    // 设置uuid[19]为8、9、a或b之一
                    uuid += (random & 0x3 | 0x8).toString(16);
                } else {
                    random = Math.floor(Math.random() * 16);
                    uuid += random.toString(16);
                }
            }
            return uuid;
        }
        // &Authorization=ngTokenKey%24NEWGRAND-WEB%241741913973000%240b2a6e86-ca93-4da8-8bbd-885e22adbe1a%24ja
    }



    /////////////////
    if (mstform) {
        getDjxqc()
        useValuesChange(
            ({ args }) => {
                console.log(args, "可以监听");
                getDjxqc();
                dgrid.refreshView();
            },
            ["p_form_yffx_m.bill_no", "p_form_yffx_m.bill_name", "p_form_yffx_m.phid_pc", "p_form_yffx_m.u_supply", "p_form_yffx_m.u_dqyfrq", "p_form_yffx_m.u_zczfqrzt", "p_form_yffx_m.u_bzezfqr", "p_form_yffx_m.u_cwyfqr", "p_form_yffx_m.u_dqyfsyje","p_form_yffx_m.u_tqjjfk","p_form_yffx_m.u_cgy"]
        );
        async function getDjxqc() {
            let sqlFilter = `1=1`;

            if (mstform.getValues().bill_no) {
                let bill_no = mstform.getItem("bill_no").getValue();
                sqlFilter += `and bill_no = '${bill_no}' `;
            }
            if (mstform.getValues().bill_name) {
                let bill_name = mstform.getItem("bill_name").getValue();
                sqlFilter += ` and cnt_name = '${bill_name}'`; // 也是用单引号包裹
            }
            if (mstform.getValues().phid_pc) {
                let phid_pc = mstform.getItem("phid_pc").getValue();
                sqlFilter += ` and phid_pc= '${phid_pc}'`; // 也是用单引号包裹
            }
            if (mstform.getValues().u_supply) {
                let u_supply = mstform.getItem("u_supply").getValue();
                sqlFilter += ` and comp_phid= '${u_supply}'`; // 也是用单引号包裹
            }
            // if (mstform.getValues().phid_fill_psn) {
            //   let phid_fill_psn = mstform.getItem("phid_fill_psn").getValue();
            //   sqlFilter += ` and u_cgy= '${phid_fill_psn}'`; // 也是用单引号包裹
            // }
            if (mstform.getValues().u_zczfqrzt) {
                let u_zczfqrzt = mstform.getItem("u_zczfqrzt").getValue();
                sqlFilter += ` and u_zczfqrzt= '${u_zczfqrzt}'`; // 也是用单引号包裹
            }
            if (mstform.getValues().u_bzezfqr) {
                let u_bzezfqr = mstform.getItem("u_bzezfqr").getValue();
                sqlFilter += ` and u_bzezfqr= '${u_bzezfqr}'`; // 也是用单引号包裹
            }
            if (mstform.getValues().u_dqyfrq) {
                let u_dqyfrq = mstform.getItem("u_dqyfrq").getValue();
                const date = new Date(u_dqyfrq);
                date.setDate(date.getDate() + 1);
                const nextDay = date.toISOString().split('T')[0];
                // sqlFilter += ` and dqyf_dt like '${u_dqyfrq}%'`;
                sqlFilter += ` and dqyf_dt  <= TO_DATE('${nextDay}', 'YYYY-MM-DD')`;
            }
            if (mstform.getValues().u_cwyfqr) {
                let u_cwyfqr = mstform.getItem("u_cwyfqr").getValue();
                sqlFilter += ` and u_cwyfqr = '${u_cwyfqr}'`; // 也是用单引号包裹
            }
            if (mstform.getValues().u_tqjjfk) {
                let u_tqjjfk = mstform.getItem("u_tqjjfk").getValue();
                sqlFilter += ` and u_tqjjfk = '${u_tqjjfk}'`;
            }
            if (mstform.getValues().u_cgy) {
                let u_cgy = mstform.getItem("u_cgy").getValue();
                sqlFilter += ` and phid_fill_psn = '${u_cgy}'`;
            }
            if (mstform.getValues().u_dqyfsyje) {
                let u_dqyfsyje = mstform.getItem("u_dqyfsyje").getValue();
                console.log(`u_dqyfsyje`, u_dqyfsyje);
                if (u_dqyfsyje == '1') {
                    sqlFilter += ` and (u_dqyfsyje = '0' or u_dqyfsyje is null or u_dqyfsyje='')`; // 也是用单引号包裹
                } else {
                    sqlFilter += ` and (u_dqyfsyje != '0' or u_dqyfsyje is not null or u_dqyfsyje !='')`; // 也是用单引号包裹
                }
            }
            if (dgrid) {
                dgrid.clearRows();
                console.log(`'%' and ${sqlFilter}`);
                var gridArr = [];
                await $NG.execServer("searchCgyffx", { djlx: `'%' and ${sqlFilter}` }, function (res) {
                    console.log(res);
                    if (res.count === 0) {
                        dgrid.clearRows();
                    }
                    if (!res.data || res.count === 0) return
                    const data = JSON.parse(res.data);
                    console.log(data);



                    //默认增行,批量新增表体数据
                    //定义表体数组
                    var gridCount = res.count; //增加的行数,可根据从数据库从取出的数据总数增行
                    for (var i = 0; i < gridCount; i++) {
                        var gridObj = {};
                        gridObj.u_cgy = data[i].extendObjects.phid_fill_psn;
                        gridObj.u_cgy_EXName = data[i].extendObjects.username;
                        gridObj.u_yfdjh = data[i].extendObjects.bill_no;//////////不确定
                        gridObj.u_rest_amt = data[i].extendObjects.u_zfdsyje;
                        gridObj.u_dj_type = data[i].extendObjects.djlx;
                        gridObj.u_cnt_no = data[i].extendObjects.u_cnt_phid;
                        gridObj.u_cnt_name = data[i].extendObjects.bill_no;///无
                        gridObj.u_supply = data[i].extendObjects.comp_phid;
                        gridObj.u_supply_EXName = data[i].extendObjects.compname;
                        gridObj.u_cnt_tklx_EXName = data[i].extendObjects.fklx_name;
                        gridObj.u_cnt_tklx = data[i].extendObjects.fklx_phid;
                        gridObj.u_yw_dt = data[i].extendObjects.app_dt;
                        gridObj.u_bckpje = data[i].extendObjects.u_invoice_all_amt;
                        gridObj.u_fkje = data[i].extendObjects.u_fk_ant;
                        gridObj.u_yfhsje = data[i].extendObjects.u_pur_pay_amt;
                        gridObj.u_ljcgyfje = data[i].extendObjects.u_acc_pay_amt;
                        gridObj.u_ljkpje = data[i].extendObjects.u_ljkp_amt;
                        gridObj.u_xmbm = data[i].extendObjects.xmbh;
                        gridObj.u_hthsje = data[i].extendObjects.u_cnt_amt;
                        gridObj.u_zfbl = data[i].extendObjects.bal_percent;
                        gridObj.u_yf_dt = data[i].extendObjects.dqyf_dt;
                        gridObj.u_fk_bl = data[i].extendObjects.bal_percent;
                        gridObj.u_yf_amt = data[i].extendObjects.kfje;
                        gridObj.u_htfktj = data[i].extendObjects.fktj_phid;
                        gridObj.u_htfktj_EXName = data[i].extendObjects.user_fktj;
                        gridObj.u_ywjddcrq = data[i].extendObjects.ywjddcdt;
                        gridObj.u_kprq = data[i].extendObjects.sh_dt;
                        gridObj.u_bzezfqr = data[i].extendObjects.u_bzezfqr;
                        gridObj.u_bzezfqrrq = data[i].extendObjects.u_bzezfqrrq;
                        gridObj.u_zczfqrsj = data[i].extendObjects.u_zczfqrsj;
                        gridObj.u_zczfqrzt = data[i].extendObjects.u_zczfqrzt;
                        gridObj.u_cgzz = data[i].extendObjects.oname;
                        gridObj.u_yflx_phid = data[i].extendObjects.yflx_phid;
                        gridObj.u_htzq = data[i].extendObjects.user_xzzq;
                        gridObj.u_ljxmsbqrje = data[i].extendObjects.u_ljxmsbqrje;
                        gridObj.u_zbqs_dt = data[i].extendObjects.user_zbqs_dt;
                        gridObj.u_ljfpyfje = data[i].extendObjects.u_ljfpyfje;
                        gridObj.u_dqyfje = data[i].extendObjects.u_dqyfje;
                        gridObj.u_dqyfsyje = data[i].extendObjects.u_dqyfsyje;
                        gridObj.u_cwyfqr = data[i].extendObjects.u_cwyfqr || '0';
                        gridObj.u_cwyfqrrq = data[i].extendObjects.u_cwyfqrrq;
                        gridObj.u_tqjjfk = (data[i].extendObjects.u_tqjjfk=='1') ? '1' : '2';
                        gridObj.u_tqjjfkrq = data[i].extendObjects.u_tqjjfkrq;
                        gridObj._allDatajson = JSON.stringify(data[i].extendObjects)
                        gridObj.u_bank_no = data[i].extendObjects.u_bank_no
                        gridObj.u_rece_bank = data[i].extendObjects.u_rece_bank
                        gridObj.u_rece_bank_EXName = data[i].extendObjects.bankname
                        gridObj.u_payee = data[i].extendObjects.u_payee
                        gridObj.u_payee_EXName = data[i].extendObjects.skdw
                        gridObj.phid_pc = data[i].extendObjects.phid_pc;
                        gridObj.phid_pc_EXName = data[i].extendObjects.pc_name;
                        gridObj.u_zffs = data[i].extendObjects.u_zffs ;
                        gridObj.u_zbqs_dt = data[i].extendObjects.user_zbqs_dt ;
                        gridObj.u_hp_dt = data[i].extendObjects.u_hp_dt ;
                        gridObj.u_yzyfsjwsbycje = data[i].extendObjects.u_yzyfsjwsbycje ;
                        gridObj.u_yzfje = data[i].extendObjects.u_yzfje ;
                        
                        gridArr.push(gridObj);
                    }
                    //调用新增表体行数据的函数
                });
                dgrid.addRows(gridArr);
            }
        }
        // async function getDjxqc() {
        //   let sqlFilter = `1=1`;

        //   if (mstform.getValues().bill_no) {
        //     let bill_no = mstform.getItem("bill_no").getValue();
        //     sqlFilter += ` and cnt_no = '${bill_no}'`;
        //   }
        //   if (mstform.getValues().bill_name) {
        //     let bill_name = mstform.getItem("bill_name").getValue();
        //     sqlFilter += ` and cnt_name = '${bill_name}'`;
        //   }
        //   if (mstform.getValues().phid_pc) {
        //     let phid_pc = mstform.getItem("phid_pc").getValue();
        //     sqlFilter += ` and phid_pc= '${phid_pc}'`;
        //   }
        //   if (mstform.getValues().u_supply) {
        //     let u_supply = mstform.getItem("u_supply").getValue();
        //     sqlFilter += ` and comp_phid= '${u_supply}'`;
        //   }

        //   if (dgrid) {
        //     dgrid.clearRows();
        //     console.log(`查询条件：${sqlFilter}`);

        //     // 将 execServer 转换为 Promise 形式
        //     const execServerPromise = (method, params) => new Promise(resolve => {
        //       $NG.execServer(method, params, resolve);
        //     });

        //     try {
        //       // 获取主数据
        //       const mainRes = await execServerPromise("searchCgyffx", {
        //         cnt_yd: `'%' and ${sqlFilter}`
        //       });

        //       if (mainRes.count === 0) {
        //         dgrid.clearRows();
        //         return;
        //       }

        //       // const mainData = JSON.parse(mainRes.data);
        //       // console.log(mainData);
        //       var gridCount = res.count; //增加的行数,可根据从数据库从取出的数据总数增行
        //       for (var i = 0; i < gridCount; i++) {
        //         var gridObj = {};
        //         //对表体字段进行赋值,可以取数据库中的值进行赋值
        //         gridObj.u_cgy = data[i].extendObjects.phid_fill_psn;
        //         gridObj.u_cgy_EXName = data[i].extendObjects.username;
        //         gridObj.u_yfdjh = data[i].extendObjects.u_cnt_phid;//////////不确定
        //         gridObj.u_rest_amt = data[i].extendObjects.u_zfdsyje;
        //         gridObj.u_dj_type = data[i].extendObjects.djlx;
        //         gridObj.u_cnt_no = data[i].extendObjects.bill_no;
        //         gridObj.u_cnt_name = data[i].extendObjects.bill_no;///无
        //         gridObj.u_supply = data[i].extendObjects.comp_phid;///无
        //         gridObj.u_supply_EXName = data[i].extendObjects.compname;///无


        //         gridArr.push(gridObj);
        //       }
        //       // const gridArr = [];
        //       // gridArr.push(createMainRow(item))
        //       // 并行处理所有主数据项及其明细
        //       // await Promise.all(mainData.map(async (item) => {
        //       //   // 获取明细数据

        //       //   const mxRes = await execServerPromise("searchHtfxc", { 
        //       //       phid: item.extendObjects.phid // 假设主数据中有phid字段
        //       //   });
        //       //   const mxData = mxRes.data ? JSON.parse(mxRes.data) : [];
        //       //   window._catchPayType = [...mxData]

        //       //   // 如果没有明细数据，创建一条仅含主数据的记录
        //       //   if (mxData.length === 0) {
        //       //     gridArr.push(createMainRow(item));
        //       //     return;
        //       //   }
        //       //   console.log(mxData, 'mxData');

        //       //   // 合并主数据和明细数据
        //       //   mxData.forEach(mxItem => {
        //       //     gridArr.push(createMergedRow(item, mxItem));
        //       //   });
        //       // }));
        //       // console.log(gridArr);

        //       // 批量添加处理好的数据
        //       // dgrid.addRows(gridArr);
        //     } catch (error) {
        //       console.error("数据处理失败：", error);
        //     }
        //   }
        // }

        // 创建主数据行（无明细时使用）
        function createMainRow(mainItem) {
            return {
                u_cgy: mainItem.extendObjects?.u_cgy,
                u_rest_amt: mainItem.extendObjects?.yh_amt,
                u_dj_type: '采购应付单',
                u_cnt_no: mainItem.extendObjects?.cnt_no,
                u_cnt_name: mainItem.extendObjects?.cnt_name,
                u_supply: mainItem.extendObjects?.supply,
                u_supply_EXName: mainItem.extendObjects?.supply_name,
                u_cnt_tk: mainItem.extendObjects?.fk_tk,
                u_yw_dt: mainItem.extendObjects?.yf_wkpzq,
                u_yf_dt: mainItem.extendObjects?.yf_ykpzq,
                u_fk_bl: mainItem.extendObjects?.bal_percent,
                u_yf_amt: mainItem.extendObjects?.yf_amt,///
                // 明细字段留空
                // u_yfdjh: null,
                // u_ljkpje: null
                // ...其他明细字段...
            };
        }

        // 创建合并后的数据行
        function createMergedRow(mainItem, mxItem) {

            return {
                ...createMainRow(mainItem),  // 展开主数据字段
                // 添加明细字段（根据实际接口返回字段调整）
                u_yfdjh: mxItem.extendObjects.bill_no,
                u_bckpje: mxItem.extendObjects.u_invoice_all_amt,
                u_fkje: mxItem.extendObjects.u_fk_ant,
                u_yfhsje: mxItem.extendObjects.u_pur_pay_amt,
                u_ljcgyfje: mxItem.extendObjects.u_acc_pay_amt,
                u_ljkpje: mxItem.extendObjects.u_ljkp_amt,
                u_xmbm: mxItem.extendObjects.u_pc_no,
                u_hthsje: mxItem.extendObjects.u_cnt_amt,
                u_htfktj: mxItem.extendObjects.namephid,
                u_htfktj_EXName: mxItem.extendObjects.name_new,
                u_zfbl: mxItem.extendObjects.bal_percent,
                u_cgzz: mxItem.extendObjects.u_pay_org,
                //
                u_yf_dt: mxItem.extendObjects.user_zbqs_dt,
                // u_yfhsje: mxItem.bill_no,
                // ...其他明细字段...
            };
        }
    }


});
