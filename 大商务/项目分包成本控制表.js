/**第四章  分包成本控制策划*/
$NG.AllReady(function (editPage, { useValuesChange, useUpdateRows }) {
    var mstform = $NG.getCmpApi('p_form_0000000072_m');
    var dgrid = $NG.getCmpApi('p_form_0000000072_d1');
    
    if (editPage.oType == "add"||editPage.oType == "edit") {
        const phid_pc = mstform.getValues().phid_pc;
        if (dgrid.getRows().length == 0) {
            setTimeout(() => {
                $NG.execServer("dcfbcbkzbgdz", { 'pc': phid_pc }, (res) => {
                    console.log("res:",res);
                    console.log("phid_pc===============>", phid_pc);
                    // 先检查res.data是否已经是对象
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log('data', data);
                    const targetData = data?.map((item) => {
                        return { ...item.extendObjects }
                    });
                    console.log("targetData:", targetData);
                    const treeData = flatArrayToTree(targetData);
                    console.log("treeData:", treeData);
                    dgrid.addRows(treeData);

                    dgrid.refreshView();
                });
            }, 100);
        } else {

        }
        useValuesChange(({ args }) => {
            dgrid.clearRows();
            const phid_pc = mstform.getValues().phid_pc;
            setTimeout(() => {
                $NG.execServer("dcfbcbkzbgdz", { 'pc': phid_pc }, (res) => {
                    console.log("phid_pc===============>", phid_pc);
                    // 先检查res.data是否已经是对象
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log('data', data);
                    const targetData = data?.map((item) => {
                        return { ...item.extendObjects }
                    })?.reverse();
                    console.log("targetData:", targetData);
                    const treeData = flatArrayToTree(targetData).reverse();
                    console.log("treeData:", treeData);
                    dgrid.addRows(treeData);

                    dgrid.refreshView();
                });
            }, 100);
        }, "p_form_0000000072_m.phid_pc");
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
        const u_fbewcbzb = lwfb_ewdzb + zyfb_ewdzb;

        // 汇总赋值
        $NG.updateState((updater) => {
            updater.data.p_form_0000000072_m.setProps({
                u_fbewcbzb: u_fbewcbzb
            });
        });
    });
    /**引入第三章劳务分包、专业分包的二维度指标值并合计赋值到 分包二维成本指标 end=====================> */

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
        if (item.s_tree_name === '劳务分包类' || item.s_tree_name === '工程分包类') {
            rootNodes.push({ ...item });
        } else {
            childNodes.push({ ...item });
        }
    });
    
    // 为根节点赋值固定的s_tree_no、s_tree_id和s_tree_pid
    rootNodes.forEach(rootNode => {
        if (rootNode.s_tree_name === '劳务分包类') {
            rootNode.s_tree_no = '01';
            rootNode.s_tree_id = '01';
            rootNode.s_tree_pid = '0';
            rootNode.s_tree_name = '劳务分包类';
        } else if (rootNode.s_tree_name === '工程分包类') {
            rootNode.s_tree_no = '02';
            rootNode.s_tree_id = '02';
            rootNode.s_tree_pid = '0';
            rootNode.s_tree_name = '工程分包类';
        }
        rootNode.children = [];
    });
    
    // 为每个根节点分配对应的子节点并设置编号
    rootNodes.forEach(rootNode => {
        const matchingChildren = [];
        
        if (rootNode.s_tree_name === '劳务分包类') {
            // u_fbms为01或空的节点作为劳务分包类的子节点
            childNodes.forEach(childNode => {
                if (childNode.u_fbms === '01' || childNode.u_fbms === '') {
                    matchingChildren.push(childNode);
                }
            });
        } else if (rootNode.s_tree_name === '工程分包类') {
            // u_fbms为02的节点作为工程分包类的子节点
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
            childNode.s_tree_name = childNode.s_tree_name || '';
            childNode.children = [];
            rootNode.children.push(childNode);
        });
        
        tree.push(rootNode);
    });
    
    return tree;
}