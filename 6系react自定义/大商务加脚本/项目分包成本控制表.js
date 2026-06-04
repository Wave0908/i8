/**第四章  分包成本控制策划*/
$NG.AllReady(function (editPage, { useAction,useValuesChange, useUpdateRows, useUpdateRow }) {
    var mstform = $NG.getCmpApi('p_form_0000000072_m');
    var dgrid = $NG.getCmpApi('p_form_0000000072_d1');
    useAction('onClick')(() => {
        // 改1：url为表单的列表页面
        window.location.href = 'http://192.168.3.241:30599/ngweb/portal/index.html#/sub/formruntime/customform/list?AppTitle=%E9%A1%B9%E7%9B%AE%E5%88%86%E5%8C%85%E6%88%90%E6%9C%AC%E6%8E%A7%E5%88%B6%E8%A1%A8&busType=lingqier&isSso=1&menucode=9265f708-9ce5-3cb2-d8f5-d4267ca4e947';
    }, 'u_libb')

    if (editPage.oType == "add") {
        debugger;
        // 改2：表名修改为对应表单表名
        // 第一步，获取原单据的id，通过imp接口信息拿到
        const sourceId = $NG.getPageState().data.p_form_0000000072_m.u_lyxmchzj;
        console.log('原单据id:', sourceId)
        if (sourceId) {
            // 第二步，请求自定义单据详情接口，获取原单据的数据
            $NG.AllReady(async () => {
                try {
                    const result = await $NG.request.get({
                        url: '/sup/customServer/getInfo',
                        data: {
                            id: sourceId,
                            oType: 'view',
                            // 改3：对应表单业务类型
                            customBusCode: 'lingqier',
                            encryptPrimaryKey: $NG.CryptoJS.encode(sourceId)
                        }
                    });
                    console.log('result:', result);

                    if (result) {
                        const data = result?.data;
                        console.log('data', data);
                        if (!data) {
                            return;
                        }

                        const page = $NG.getPageInstance()
                        const editUI = page?.getEditUI();
                        console.log('editUI', editUI);

                        // 第三步，渲染数据

                        /**
                         * 主表需要重置的字段集合
                         */
                        const mainTableInitValues = {
                            phid: '',
                            phid_fill_psn: $NG.getUser().userID,
                            phid_fill_psn_EXName: $NG.getUser().userName,
                            bill_dt: $NG.formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                            wf_flag: 0,
                            app_status: 0,
                            app_dt: null,
                            phid_app: null,
                            bill_no: '',
                            printcount: 0,
                            arc_flag: 0,
                            iscost: 0,
                            cost_amount: 0,
                            ng_data_status: null,
                            u_bb: Number(data.p_form_0000000072_m.u_bb == '' ? 1 : data.p_form_0000000072_m.u_bb) + 1
                        };
                        //console.log('data.p_form_0000000072_m.u_bb:', data.p_form_0000000072_m.u_bb);
                        /**
                         * 主表需要重置的字段集合
                         */
                        const detailInitValues = {
                            phid: '',
                            pphid: '',
                            code: '',
                            asr_flag: 0
                        };

                        /**
                         * 获取附件项,附件相关的字段需进行滞空处理不进行复制，否则新老单据就会公用一套附件
                         */
                        const getAttachmentItem = (containerId) => {
                            const items = [];
                            const resetFields = {};
                            if (editUI?.fieldSetForm?.[containerId]) {
                                editUI?.fieldSetForm?.[containerId]?.children?.forEach((d) => {
                                    items.push(...(d?.children ?? []));
                                });
                            } else {
                                items.push(...(editUI?.containerIds?.[containerId]?.children ?? []));
                            }
                            items
                                ?.filter((d) => {
                                    const xtype = d?.xtype || d?.editor?.xtype;
                                    return ['Attachment', 'Image'].includes(xtype);
                                })
                                ?.forEach((d) => {
                                    resetFields[d.name] = '';
                                });
                            return resetFields;
                        };

                        /**
                         * 树结构明细表需要递归处理
                         */
                        const loopSetDataValue = (tableValue, resetFields) => {
                            // 明细表、包含树明细
                            tableValue.forEach((v) => {
                                Object.entries({ ...resetFields, ...detailInitValues }).forEach(([field, resetValue]) => {
                                    v[field] = resetValue;
                                });
                                if (v?.children?.length) loopSetDataValue(v.children, resetFields);
                            });
                        };

                        Object.keys(data).forEach((key) => {
                            const value = data[key];
                            const resetFields = getAttachmentItem(key);
                            // 主表
                            if ($NG.isObject(value)) {
                                Object.entries({ ...resetFields, ...mainTableInitValues }).forEach(([field, resetValue]) => {
                                    value[field] = resetValue;
                                });
                                // 明细表
                            } else if ($NG.isArray(value)) {
                                loopSetDataValue(value, resetFields);
                            }
                        });
                        $NG.updateState(updater => {
                            updater.data.setProps(() => data)
                        })
                        console.log('data:', data);
                    }
                } catch (error) {
                    console.error('请求发生错误:', error);
                }
            });
        }

    }
    if (editPage.oType == "add") {
        var phid_pc = mstform.getValues().phid_pc;
        if (phid_pc) {
            if (dgrid.getRows().length == 0) {
                setTimeout(() => {
                    $NG.execServer("dcfbcbkzbgdz", { 'pc': phid_pc }, (res) => {
                        console.log("phid_pc===============>", phid_pc);
                        // 先检查res.data是否已经是对象
                        if (res.count > 0) {
                            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            console.log('data', data);
                            const targetData = data?.map((item) => {
                                return { ...item.extendObjects }
                            })?.reverse();
                            console.log("targetData:", targetData);
                            const treeData = flatArrayToTree(targetData).reverse();
                            console.log("treeData:", treeData);
                            dgrid.addRows(treeData);

                            setTimeout(() => {
                                // 计算treeData的最大深度
                                const maxDepth = getTreeMaxDepth(treeData);
                                // 逐层展开所有层级
                                expandAllLevels(dgrid, maxDepth);
                            }, 100);

                            dgrid.refreshView();
                        }
                    });

                    setTimeout(() => {
                        // 获取第三章分包值
                        $NG.execServer("hqdszfbz", { 'pc': phid_pc }, (res) => {
                            console.log("res:", res);
                            console.log("phid_pc===============>", phid_pc);
                            if (res.count > 0) {
                                // 先检查res.data是否已经是对象
                                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                                console.log('data', data);
                                $NG.updateState(function (updater, state) {
                                    const updateRow = (row) => {
                                        const match = data.find(item => item.extendObjects.s_tree_no === row.s_tree_no);
                                        if (match) {
                                            row.u_ewzb = match.extendObjects.u_ewzb;
                                        }
                                        // 如果当前行有子节点，递归更新子节点
                                        if (row.children && row.children.length > 0) {
                                            row.children = row.children.map(child => updateRow(child));
                                        }
                                        return row;
                                    };

                                    const updatedData = state.data.p_form_0000000072_d1.map(row => updateRow(row));
                                    updater.data.p_form_0000000072_d1.setProps(updatedData);
                                });
                            }
                        });
                    }, 300);
                }, 100);
                // +++ 添加行后计算根节点合计 +++
                setTimeout(() => updateMasterWithRootSum(), 200);
            }

            /**引入第三章劳务分包、专业分包的二维度指标值并合计赋值到 分包二维成本指标 start=====================> */
            $NG.execServer("jhcbewdzblwzyfb", { 'pc': mstform.getValues().phid_pc }, (res) => {
                // 安全解析数据
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;

                // 安全获取值函数
                const getSafeValue = (index) => {
                    if (!Array.isArray(data) || index >= data.length) return 0;

                    const item = data[index];
                    // 使用可选链操作符防止嵌套属性报错
                    const value = item?.extendObjects?.u_ewdzb;

                    // 转换为数字（无效值转为0）
                    return parseFloat(value) || 0;
                };

                // 获取两个值（自动处理索引越界）
                const lwfb_ewdzb = getSafeValue(0); // 劳务分包
                const zyfb_ewdzb = getSafeValue(1); // 专业分包

                console.log("lwfb_ewdzb =", lwfb_ewdzb);
                console.log("zyfb_ewdzb =", zyfb_ewdzb);

                // 计算总和
                const u_fbewcbzb = (lwfb_ewdzb + zyfb_ewdzb).toFixed(2);
                console.log('u_fbewcbzb--------->', u_fbewcbzb)

                // 汇总赋值
                $NG.updateState((updater) => {
                    updater.data.p_form_0000000072_m.setProps({
                        u_fbewcbzb: u_fbewcbzb
                    });
                });
            });
            /**引入第三章劳务分包、专业分包的二维度指标值并合计赋值到 分包二维成本指标 end=====================> */

        }
    }

    useValuesChange(({ args }) => {
        dgrid.clearRows();
        $NG.updateState(updater => {
            updater.data.p_form_0000000072_m.setProps({
                u_nfscb: '0'
            });
        });
        var phid_pc = mstform.getValues().phid_pc;
        setTimeout(() => {
            $NG.execServer("dcfbcbkzbgdz", { 'pc': phid_pc }, (res) => {
                console.log("phid_pc===============>", phid_pc);
                // 先检查res.data是否已经是对象
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log('data', data);
                    const targetData = data?.map((item) => {
                        return { ...item.extendObjects }
                    })?.reverse();
                    console.log("targetData:", targetData);
                    const treeData = flatArrayToTree(targetData).reverse();
                    console.log("treeData:", treeData);
                    dgrid.addRows(treeData);
                    // +++ 添加行后计算根节点合计 +++
                    setTimeout(() => updateMasterWithRootSum(), 200);
                    setTimeout(() => {
                        // 计算treeData的最大深度
                        const maxDepth = getTreeMaxDepth(treeData);
                        // 逐层展开所有层级
                        expandAllLevels(dgrid, maxDepth);
                    }, 100);

                    dgrid.refreshView();
                }
            });

            setTimeout(() => {
                // 获取第三章分包值
                $NG.execServer("hqdszfbz", { 'pc': phid_pc }, (res) => {
                    console.log("res:", res);
                    console.log("phid_pc===============>", phid_pc);
                    if (res.count > 0) {
                        // 先检查res.data是否已经是对象
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        console.log('data', data);
                        $NG.updateState(function (updater, state) {
                            const updateRow = (row) => {
                                const match = data.find(item => item.extendObjects.s_tree_no === row.s_tree_no);
                                if (match) {
                                    row.u_ewzb = match.extendObjects.u_ewzb;
                                }
                                // 如果当前行有子节点，递归更新子节点
                                if (row.children && row.children.length > 0) {
                                    row.children = row.children.map(child => updateRow(child));
                                }
                                return row;
                            };

                            const updatedData = state.data.p_form_0000000072_d1.map(row => updateRow(row));
                            updater.data.p_form_0000000072_d1.setProps(updatedData);
                        });
                    }
                });
            }, 300);
        }, 100);

        /**引入第三章劳务分包、专业分包的二维度指标值并合计赋值到 分包二维成本指标 start=====================> */
        $NG.execServer("jhcbewdzblwzyfb", { 'pc': mstform.getValues().phid_pc }, (res) => {
            // 安全解析数据
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;

            // 安全获取值函数
            const getSafeValue = (index) => {
                if (!Array.isArray(data) || index >= data.length) return 0;

                const item = data[index];
                // 使用可选链操作符防止嵌套属性报错
                const value = item?.extendObjects?.u_ewdzb;

                // 转换为数字（无效值转为0）
                return parseFloat(value) || 0;
            };

            // 获取两个值（自动处理索引越界）
            const lwfb_ewdzb = getSafeValue(0); // 劳务分包
            const zyfb_ewdzb = getSafeValue(1); // 专业分包

            console.log("lwfb_ewdzb =", lwfb_ewdzb);
            console.log("zyfb_ewdzb =", zyfb_ewdzb);

            // 计算总和
            const u_fbewcbzb = lwfb_ewdzb + zyfb_ewdzb;

            // 汇总赋值
            $NG.updateState((updater) => {
                updater.data.p_form_0000000072_m.setProps({
                    u_fbewcbzb: u_fbewcbzb
                });
            });
        });
        /**引入第三章劳务分包、专业分包的二维度指标值并合计赋值到 分包二维成本指标 end=====================> */
    }, "p_form_0000000072_m.phid_pc");

    useUpdateRow(({ args, table }) => {
        const record = args[0];
        // 重新计算父节点的值
        var rows = table.getRows();
        $NG.updateState(updater => {
            updater.data.p_form_0000000072_m.setProps({
                u_nfscb: '0'
            });
        });
        const treeData = rows.filter(row => !row.s_tree_name || row.s_tree_name !== '合计');
        /**子节点合计汇总到父节点（只计算被修改行的祖先链，避免全表重算） */
        // 仅针对当前被修改的行重新计算父节点汇总
        calculateParentValuesForId(rows, record.s_tree_id);
        //更新表格中的所有行
        treeData.forEach(node => {
            table.updateRow(node);
        });

        // +++ 添加行后计算根节点合计 +++
        setTimeout(() => updateMasterWithRootSum(), 200);
    }, "p_form_0000000072_d1");

    /** 新增函数：计算根节点合计并更新主表 */
    function updateMasterWithRootSum() {
        const rows = dgrid.getRows();
        if (!rows || rows.length === 0) {
            return;
        }

        let rootSum = 0;
        rows.forEach(node => {
            // 判断是否为根节点（没有父节点）
            if (node.s_tree_name == "劳务分包" || node.s_tree_name == "专业分包") {
                const value = parseFloat(node.u_ewzb) || 0;
                rootSum += value;
            }
        });

        $NG.updateState(updater => {
            updater.data.p_form_0000000072_m.setProps({
                u_nfscb: rootSum.toFixed(2)
            });
        });
    }

}, function () {
    console.log("页面加载完成");
});

function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

function getNextSequentialCode(parentNode, existingChildren = []) {
    // 如果父节点没有子节点，返回基础编号（例如：0101）
    if (!existingChildren || existingChildren.length === 0) {
        return parentNode.s_tree_no + '01';
    }

    // 获取所有子节点的编号
    const childCodes = existingChildren.map(child => child.s_tree_no).filter(code => code);

    // 找出最大的编号
    let maxCode = parentNode.s_tree_no + '00';
    childCodes.forEach(code => {
        if (code > maxCode) {
            maxCode = code;
        }
    });

    // 提取编号的数字部分（最后两位）
    const codePattern = /\d{2}$/;
    const matches = maxCode.match(codePattern);

    if (matches && matches.length > 0) {
        // 获取数字部分
        const numPart = matches[0];
        // 计算下一个编号
        const nextNum = parseInt(numPart, 10) + 1;
        // 保持两位数格式（例如：01 -> 02）
        const nextNumStr = nextNum.toString().padStart(2, '0');
        // 替换数字部分
        return maxCode.replace(codePattern, nextNumStr);
    }

    // 如果无法解析编号格式，使用默认格式
    return parentNode.s_tree_no + '01';
}



// 根据fbms编码构建树形结构的flatArrayToTree函数
function flatArrayToTree(flatArray) {
    if (!flatArray || !Array.isArray(flatArray) || flatArray.length === 0) {
        return [];
    }

    const tree = [];
    const rootNodes = [];
    const childNodes = [];

    // 分离根节点和子节点
    flatArray.forEach(item => {
        if (!item) return;

        // 根据u_fbgcmc_text判断是否为根节点
        if (item.u_fbgcmc_text === '劳务分包' || item.u_fbgcmc_text === '专业分包') {
            rootNodes.push({ ...item });
        } else {
            childNodes.push({ ...item });
        }
    });

    // 为根节点赋值固定的s_tree_no、s_tree_id和s_tree_pid
    rootNodes.forEach(rootNode => {
        if (rootNode.u_fbgcmc_text === '劳务分包') {
            rootNode.s_tree_no = '01';
            rootNode.s_tree_id = '01';
            rootNode.s_tree_pid = '';
            rootNode.s_tree_name = '劳务分包';
            rootNode.u_ntrrs = rootNode.u_ntrrs;
        } else if (rootNode.u_fbgcmc_text === '专业分包') {
            rootNode.s_tree_no = '02';
            rootNode.s_tree_id = '02';
            rootNode.s_tree_pid = '';
            rootNode.s_tree_name = '专业分包';
            rootNode.u_ntrrs = rootNode.u_ntrrs;
        }
        rootNode.children = [];
    });

    // 为每个根节点分配对应的子节点并设置编号
    rootNodes.forEach(rootNode => {
        const matchingChildren = [];

        if (rootNode.u_fbgcmc_text === '劳务分包') {
            // u_fbms为01或空的节点作为劳务分包类的子节点
            childNodes.forEach(childNode => {
                if (childNode.u_fbms === '01' || childNode.u_fbms === '') {
                    matchingChildren.push(childNode);
                }
            });
        } else if (rootNode.u_fbgcmc_text === '专业分包') {
            // u_fbms为02的节点作为专业分包类的子节点
            childNodes.forEach(childNode => {
                if (childNode.u_fbms === '02') {
                    matchingChildren.push(childNode);
                }
            });
        }

        // 为子节点设置编号
        matchingChildren.forEach((childNode, index) => {
            childNode.s_tree_id = generateUniqueId();
            childNode.s_tree_pid = rootNode.s_tree_id;
            childNode.s_tree_no = getNextSequentialCode(rootNode, rootNode.children);
            childNode.s_tree_name = childNode.u_fbgcmc_text || '';
            childNode.u_ntrrs = childNode.u_ntrrs
            childNode.children = [];
            rootNode.children.push(childNode);
        });

        tree.push(rootNode);
    });

    return tree;
}

// 逐层展开所有层级
function expandAllLevels(dgrid, maxDepth) {
    // 递归展开，每次展开一层后等待网格更新
    function expandRecursive(currentLevel) {
        if (currentLevel < maxDepth) {
            dgrid.setExpand(); // 展开当前层级
            // 等待50ms确保网格更新后再展开下一层（时间可根据实际情况调整）
            setTimeout(() => {
                expandRecursive(currentLevel + 1);
            }, 50);
        }
    }
    // 从第1层开始展开（根节点为第1层）
    expandRecursive(1);
}

/**计算树形结构的最大深度 */
function getTreeMaxDepth(nodes, currentDepth = 1) {
    let maxDepth = currentDepth;
    nodes.forEach(node => {
        // 若节点有子节点，递归计算子节点深度（当前深度+1）
        if (node.children && node.children.length > 0) {
            const childDepth = getTreeMaxDepth(node.children, currentDepth + 1);
            maxDepth = Math.max(maxDepth, childDepth); // 取最大深度
        }
    });
    return maxDepth;
}


/**  递归计算父节点的值（子节点值合计到父节点） */
function calculateParentValuesForId(rows, targetId) {
    if (!rows || !targetId) return;

    // 构建 id -> 行 映射，方便查找父节点
    const map = {};
    rows.forEach(r => {
        if (r.s_tree_id) map[r.s_tree_id] = r;
    });

    // 如果目标行不在map中，直接返回
    if (!map[targetId]) return;

    let currentId = targetId;

    // 向上遍历父链，直到根（父ID为 '0' / null / undefined / ''）
    while (true) {
        const current = map[currentId];
        if (!current) break;

        const parentId = current.s_tree_pid;
        if (!parentId || parentId === '0' || parentId === null || parentId === undefined || parentId === '') break;

        const parent = map[parentId];
        if (!parent) break;

        // 找出 parent 的直接子节点（基于平铺 rows）
        const children = rows.filter(r => r && (r.s_tree_pid == parent.s_tree_id));

        // 要汇总的字段列表
        const fields = [
            'u_ewzb',
        ];

        // 初始化父节点字段为0
        fields.forEach(f => { parent[f] = '0.00'; });

        // 累加直接子节点的值
        children.forEach(child => {
            fields.forEach(f => {
                parent[f] = (parseFloat(parent[f] || 0) + (parseFloat(child[f] || 0))).toFixed(2);
            });
        });

        // 继续向上处理下一层父节点
        currentId = parentId;
    }
}