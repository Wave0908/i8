
$NG.AllReady(function (editPage, { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick, useUpdateRow, useImportExcelData, useBeforeClick }) {
    var dgrid = $NG.getCmpApi('inv_budget_d2');
    var form = $NG.getCmpApi('inv_budget_m');
    var dc = function () {
        var phid_pc = form.getValues().phid_pc;
        if (phid_pc > 0) {
            $NG.getCmpApi('inv_budget_d2').clearRows();
            console.log(phid_pc);
            $NG.execServer("selectBDCBSInfo", { "phid_pc": phid_pc }, function (res) {//参数及值需要与通用帮助占位符一致
                console.log(res);
                if (res.count == 0) return;
                const data = JSON.parse(res.data);
                if (data.length == 0) return;
                console.log(res);
                if (res.count == 0) return;
                var data1 = JSON.parse(res.data);
                data1 = data1.map(item => {
                    return {
                        s_tree_no: item.extendObjects.cbs_code,
                        s_tree_name: item.extendObjects.cbs_name,
                        s_tree_pid: item.extendObjects.parentphid,
                        s_tree_id: item.extendObjects.phid,
                        u_sx: item.extendObjects.cbsproperty
                    }
                })
                var table1 = $NG.getCmpApi('inv_budget_d2');

                // 直接使用 arrayToTree 转换，因为数据已经有完整的父子关系
                const treeData = arrayToTree(data1, {
                    id: 's_tree_id',
                    parentId: 's_tree_pid',
                    rootId: '0', // 根据你的数据，根节点的 parentphid 可能是 0 或其他值
                    children: 'children'
                });

                table1.addRows(treeData);

            });
            // var encodeParamscode10 = $NG.CryptoJS.encode({
            //     'select': "select cbs_code,cbs_name,phid,parentphid,(case when cbsproperty=0 then null else cbsproperty end) cbsproperty from bd_cbs where pcid= " + phid_pc
            // });
            // $NG.request.post({
            //     url: 'Addin/ExtendFunc/Action?funcName=select',
            //     data: { encodeParams: encodeParamscode10 }
            // }).then((res) => {
            //     console.log(res);
            //     if (res.count == 0) return;
            //     var data1 = JSON.parse(res.data);
            //     data1 = data1.map(item => {
            //         return {
            //             s_tree_no: item.extendObjects.cbs_code,
            //             s_tree_name: item.extendObjects.cbs_name,
            //             s_tree_pid: item.extendObjects.parentphid,
            //             s_tree_id: item.extendObjects.phid,
            //             u_sx: item.extendObjects.cbsproperty
            //         }
            //     })
            //     var table1 = $NG.getCmpApi('inv_budget_d2');

            //     // 直接使用 arrayToTree 转换，因为数据已经有完整的父子关系
            //     const treeData = arrayToTree(data1, {
            //         id: 's_tree_id',
            //         parentId: 's_tree_pid',
            //         rootId: '0', // 根据你的数据，根节点的 parentphid 可能是 0 或其他值
            //         children: 'children'
            //     });

            //     table1.addRows(treeData);
            // })
        }
    }

    $NG.updateUI((updater) => {
        updater.grid.inv_budget_d2.construction_cost.setProps(p => ({
            ...p,
            editor: {
                ...p.editor,
                disabled:
                    ({ row, value, dataIndex }) => {
                        if (row.u_sx == '4') {
                            return false;
                        }
                        else { return true; }
                    }
            }

        }))
    })

    $NG.updateUI((updater) => {
        updater.grid.inv_budget_d2.equipment_cost.setProps(p => ({
            ...p,
            editor: {
                ...p.editor,
                disabled:
                    ({ row, value, dataIndex }) => {
                        if (row.u_sx == '3') {
                            return false;
                        }
                        else { return true; }
                    }
            }

        }))
    })
    $NG.updateUI((updater) => {
        updater.grid.inv_budget_d2.installation_cost.setProps(p => ({
            ...p,
            editor: {
                ...p.editor,
                disabled:
                    ({ row, value, dataIndex }) => {
                        if (row.u_sx == '1') {
                            return false;
                        }
                        else { return true; }
                    }
            }

        }))
    })
    $NG.updateUI((updater) => {
        updater.grid.inv_budget_d2.other_cost.setProps(p => ({
            ...p,
            editor: {
                ...p.editor,
                disabled:
                    ({ row, value, dataIndex }) => {
                        if (row.u_sx == '8') {
                            return false;
                        }
                        else { return true; }
                    }
            }

        }))
    })








    useImportExcelData(function ({ args }) {
        var importdata = args[0].excelData;
        let fields = [
            { name: '树编号', key: 's_tree_no' },
            { name: '费用编码名称', key: 'u_expense_code' },
            { name: '树名称', key: 's_tree_name' },
            { name: '建筑安装费', key: 'u_construction_cost' },
            { name: '设备购置费', key: 'u_equipment_cost' },
            { name: '安装工程费', key: 'u_installation_cost' },
            { name: '其他费用', key: 'u_other_cost' },
            { name: '合计', key: 'u_total_cost' }
        ];
        if (args && args[0] && args[0].excelData) {
            if (importdata && importdata.length > 0) {
                const firstRow = importdata[0];
                for (let field of fields) {
                    if (!firstRow.hasOwnProperty(field.key)) {
                        $NG.alert('字段"' + field.name + '"未绑定列，请检查后再点击导入');
                        return false;
                    }
                }
                const store = $NG.getCmpApi('inv_budget_d2').getStore();

                if (store.data.length === 0) {
                    // 如果没有数据，直接添加树形数据
                    const treeData = arrayToTree1(args[0].excelData);
                    console.log('转换后的树形数据:', treeData);
                    dgrid.addRows(treeData);
                } else {
                    // 如果有数据，按照 s_tree_no 匹配并更新数据
                    const existingData = store.data;
                    const excelData = args[0].excelData;

                    // 定义需要更新的字段数组
                    const updateFields = [
                        'u_construction_cost',
                        'u_installation_cost',
                        'u_equipment_cost',
                        'u_other_cost',
                        'u_total_cost'
                        // 添加其他需要更新的字段...
                    ];

                    const excelDataMap = new Map();
                    excelData.forEach(item => {
                        if (item.s_tree_no) {
                            // 统一转换为字符串
                            const key = String(item.s_tree_no);
                            excelDataMap.set(key, item);
                        }
                    });
                    function traverseTree(nodes) {
                        nodes.forEach(node => {
                            const treeNo = node.s_tree_no;

                            // 确保 treeNo 也是字符串进行比较
                            if (treeNo && excelDataMap.has(String(treeNo))) {
                                const excelItem = excelDataMap.get(String(treeNo));
                                let hasUpdate = false;
                                var summ = 0;

                                // 循环更新所有指定字段
                                updateFields.forEach(field => {
                                    if (excelItem[field] !== undefined && excelItem[field] !== node[field]) {
                                        node[field] = excelItem[field];
                                        node.u_total_cost = (parseFloat(node.u_construction_cost || 0) + parseFloat(node.u_equipment_cost || 0) + parseFloat(node.u_installation_cost || 0) + parseFloat(node.u_other_cost || 0)).toFixed(2);
                                        node.u_construction_cost = node.u_construction_cost || 0;
                                        node.u_equipment_cost = node.u_equipment_cost || 0;
                                        node.u_installation_cost = node.u_installation_cost || 0;
                                        node.u_other_cost = node.u_other_cost || 0;
                                        hasUpdate = true;
                                    }
                                });

                                if (hasUpdate) {
                                    dgrid.updateRow(node);
                                }
                            }

                            if (node.children && node.children.length > 0) {
                                traverseTree(node.children);
                            }
                        });
                    }

                    traverseTree(existingData);

                }
                var arr = new Array;
                return arr;
            }


        }
        else {
            var arr = new Array;
            return arr;
        }
    }, 'inv_budget_d2');


    useBeforeClick(() => {
        var t = $NG.getCmpApi('inv_budget_d2').getStore().data.length;
        if (t > 0) {
            return true;
        }
        else {
            $NG.alert('该项目尚未编辑CBS，请先编辑CBS之后再导入数据');
            return false; // 取消发送按钮事件向下执行
        }
    }, 'inv_budget_d2.import');




    $NG.updateUI(updater => updater.grid.inv_budget_d2.u_construction_cost.setProps(p => {
        return { ...p, levelSummary: true };
    }));
    $NG.updateUI(updater => updater.grid.inv_budget_d2.u_equipment_cost.setProps(p => {
        return { ...p, levelSummary: true };
    }));
    $NG.updateUI(updater => updater.grid.inv_budget_d2.u_installation_cost.setProps(p => {
        return { ...p, levelSummary: true };
    }));
    $NG.updateUI(updater => updater.grid.inv_budget_d2.u_other_cost.setProps(p => {
        return { ...p, levelSummary: true };
    }));
    $NG.updateUI(updater => updater.grid.inv_budget_d2.u_total_cost.setProps(p => {
        return { ...p, levelSummary: true };
    }));

    // useUpdateRows(async ({ args }) => {
    //     const record = args[0];
    //     dgrid.updateRow(record);
    //     var b = $NG.getCmpApi('inv_budget_d2').getStore().data;
    //     var sum = 0;
    //     for (i = 0; i < b.length; i++) {
    //         sum += parseFloat(b[i].u_total_cost || 0);
    //     }
    //     $NG.updateState((updater) => {
    //         updater.data.inv_budget_m.setProps({
    //             u_gsze: sum
    //         })
    //     });

    //     // 使用异步队列处理树形数据，避免调用栈溢出
    //     function processTreeData(nodes) {
    //         return new Promise((resolve) => {
    //             let index = 0;

    //             function processNext() {
    //                 if (index >= nodes.length) {
    //                     resolve();
    //                     return;
    //                 }

    //                 const node = nodes[index++];

    //                 // 计算总成本
    //                 node.u_total_cost = (parseFloat(node.u_construction_cost || 0) + parseFloat(node.u_equipment_cost || 0) + parseFloat(node.u_installation_cost || 0) + parseFloat(node.u_other_cost || 0)).toFixed(2);

    //                 // 计算静态投资
    //                 if (sum > 0) {
    //                     node.u_static_investment = (parseFloat(node.u_total_cost) / sum).toFixed(2);
    //                 } else {
    //                     node.u_static_investment = "";
    //                 }

    //                 // 使用 setTimeout 避免阻塞
    //                 if (node.children && node.children.length > 0) {
    //                     processTreeData(node.children).then(() => {
    //                         setTimeout(processNext, 0);
    //                     });
    //                 } else {
    //                     setTimeout(processNext, 0);
    //                 }
    //             }

    //             processNext();
    //         });
    //     }

    //     await processTreeData(b);

    //     dgrid.updateRow(b);
    // }, 'inv_budget_d2')
    // 用一个标志位防止重入
    
    // useUpdateRow(({ args }) => {
    //     const record = args[0];
    //     setTimeout(function () {
    //         record.u_total_cost = (parseFloat(record.u_construction_cost || 0) + parseFloat(record.u_equipment_cost || 0) + parseFloat(record.u_installation_cost || 0) + parseFloat(record.u_other_cost || 0)).toFixed(2);
    //         var u_gsze = form.getValues().u_gsze;
    //         if (u_gsze > 0) {
    //             record.u_static_investment = ((parseFloat(record.u_construction_cost || 0) + parseFloat(record.u_equipment_cost || 0) + parseFloat(record.u_installation_cost || 0) + parseFloat(record.u_other_cost || 0)) / (u_gsze)).toFixed(2);
    //         }
    //     }, 200);
    //     dgrid.updateRow(record);
    // }, 'inv_budget_d2')

    //上述代码导致新增同行页面卡死，下边修改解决卡死问题。
    var _updatingRow = false;

    useUpdateRow(({ args }) => {
        if (_updatingRow) return;
        _updatingRow = true;

        try {
            const record = args[0];
            const store = $NG.getCmpApi('inv_budget_d2').getStore();
            const data = store.data;

            // 更新当前行 u_total_cost
            record.u_total_cost = (parseFloat(record.u_construction_cost || 0) + parseFloat(record.u_equipment_cost || 0) + parseFloat(record.u_installation_cost || 0) + parseFloat(record.u_other_cost ||
                0)).toFixed(2);

            // 汇总所有行 u_total_cost
            var sum = 0;
            function calcTotal(nodes) {
                for (var i = 0; i < nodes.length; i++) {
                    var n = nodes[i];
                    n.u_total_cost = (parseFloat(n.u_construction_cost || 0) + parseFloat(n.u_equipment_cost || 0) + parseFloat(n.u_installation_cost || 0) + parseFloat(n.u_other_cost || 0)).toFixed(2);
                    sum += parseFloat(n.u_total_cost) || 0;
                    if (n.children && n.children.length > 0) {
                        calcTotal(n.children);
                    }
                }
            }
            calcTotal(data);

            // 更新汇总字段
            $NG.updateState((updater) => {
                updater.data.inv_budget_m.setProps({ u_gsze: sum });
            });

            // 重算所有行 u_static_investment
            function calcStatic(nodes) {
                for (var i = 0; i < nodes.length; i++) {
                    var n = nodes[i];
                    if (sum > 0) {
                        n.u_static_investment = (parseFloat(n.u_total_cost) / sum).toFixed(2);
                    } else {
                        n.u_static_investment = "";
                    }
                    if (n.children && n.children.length > 0) {
                        calcStatic(n.children);
                    }
                }
            }
            calcStatic(data);

            // 一次性刷新 grid
            dgrid.updateRow(data);
        } finally {
            _updatingRow = false;
        }
    }, 'inv_budget_d2')

    


    //带出CBS信息
    useValuesChange(({ args }) => {
        dc();
    }, 'inv_budget_m.phid_pc');
    if (editPage.oType == 'add') {
        dc();
    }


    function arrayToTree1(data) {
        if (!data || !Array.isArray(data)) return [];

        // 为每个节点生成树形结构所需的id和parentId
        const processedData = data.map((item, index) => {
            const subprojectCode = item.s_tree_no ? item.s_tree_no.toString() : '';

            // 生成唯一的ID
            let s_tree_id = '';
            let s_tree_pid = '0';

            if (subprojectCode) {
                s_tree_id = item.s_tree_no;

                // 根据subproject_code的层级确定parentId
                const parts = subprojectCode.split('.');
                if (parts.length === 1) {
                    // 一级节点 (如: "1", "2")
                    s_tree_pid = '0';
                } else if (parts.length === 2) {
                    // 二级节点 (如: "1.1", "1.2")
                    s_tree_pid = parts[0]; // 父级是一级节点
                } else if (parts.length === 3) {
                    // 三级节点 (如: "1.1.1", "1.1.2")
                    s_tree_pid = parts[0] + '.' + parts[1]; // 父级是二级节点
                }
            } else {
                // 没有subproject_code的条目，使用索引作为ID，作为根节点
                s_tree_id = `root_${index}`;
                s_tree_pid = '0';
            }

            return {
                ...item,
                s_tree_id: s_tree_id,
                s_tree_pid: s_tree_pid
            };
        });


        return arrayToTree(processedData, {
            id: 's_tree_id',
            parentId: 's_tree_pid',
            rootId: '0',
            children: 'children'
        });
    }


    function arrayToTree(data, options = {}) {
        const defaults = {
            id: 's_tree_id',
            parentId: 's_tree_pid',
            rootId: 0,
            children: 'children'
        };

        const settings = { ...defaults, ...options };

        // 创建一个以ID为键的对象，用于快速查找
        const lookup = data.reduce((acc, node) => {
            acc[node[settings.id]] = { ...node, [settings.children]: [] };
            return acc;
        }, {});

        // 构建树
        const tree = [];
        data.forEach(node => {
            if (String(node[settings.parentId]) === String(settings.rootId)) {
                tree.push(lookup[node[settings.id]]);
            } else {
                const parent = lookup[node[settings.parentId]];
                if (parent) {
                    parent[settings.children].push(lookup[node[settings.id]]);
                } else {
                    // 如果找不到父节点，也作为根节点显示
                    tree.push(lookup[node[settings.id]]);
                }
            }
        });

        return tree;
    }

    // 获取表格容器
    const container = document.getElementById('inv_budget_d2');
    if (!container) return;

    // 获取所有行
    const rows = container.querySelectorAll('.table-row');

    rows.forEach(row => {
        // 查找当前行的 "子项目编码" 单元格
        const sTreeNoCell = row.querySelector('[data-key="s_tree_no"]');
        if (!sTreeNoCell) return;

        // 检查该单元格内是否包含展开图标
        const hasExpandIcon = sTreeNoCell.querySelector('.row-expand-icon') !== null;
        if (!hasExpandIcon) return;

        // 需要禁用的 data-key 列表（所有除 s_tree_no 以外的列）
        const disabledKeys = [
            'expense_code',      // 费用名称编码
            's_tree_name',       // 工程或费用名称
            'construction_cost', // 建筑安装费
            'equipment_cost',    // 设备购置费
            'installation_cost', // 安装工程费
            'other_cost',        // 其他费用
            'total_cost',        // 合计
            'static_investment', // 各项占静态投资
            'unit_investment'    // 单位投资
        ];

        disabledKeys.forEach(key => {
            const cell = row.querySelector(`[data-key="${key}"]`);
            if (cell) {
                cell.style.pointerEvents = 'none';
                cell.style.opacity = '0.7';
                cell.style.backgroundColor = '#f5f5f5';
            }
        });

        // 确保 "子项目编码" 单元格保持原样
        sTreeNoCell.style.pointerEvents = 'auto';
        sTreeNoCell.style.opacity = '1';
        sTreeNoCell.style.backgroundColor = '';
    });


    



});