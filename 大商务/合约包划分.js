$NG.AllReady(function (
	editPage,
	{ useAction, useValuesChange, useBeforeClick,useDataIndexChange, useUpdateRows, useClick }
) {
	//TODO
	var mstform = $NG.getCmpApi("IncomeCompletedListBasicInfoForm");
	var phid = mstform.getItem("phidPc").getValue();
	var toolbar = $NG.getCmpApi("toolbar"); //表单布局不同，可能有差别，f12用选择器去看
	var btn = toolbar.getItem("u_xzlwfbyzyfb");
	var dgrid = $NG.getCmpApi("grid");

	// 隐藏新增行按钮
	var Buttons = toolbar.getButtons();
	Buttons[0].children[1].hidden = 'true';
	Buttons[0].children[2].hidden = 'true';
	//toolbar.setButtons(Buttons);

	// 监听按钮点击事件
	useClick(async function ({ args }) {
		// 获取最新的项目ID
		var phid = mstform.getItem("phidPc").getValue();
		console.log("phid:", phid);
		if (!phid) {
			$NG.alert("请先选择项目!");
			return;
		}
		console.log("phid_pc", phid)
		// 调用功能扩展获取数据
		// 因为功能扩展不支持拼接函数，于是封装成了视图contract_package_divided
		$NG.execServer("dchybhf", { 'pc': phid }, (res) => {
			// 先检查res.data是否已经是对象
			const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
			console.log("data:", data);

			if (!data || data.length === 0) {
				$NG.alert("未获取到相关数据!");
				return;
			}

			// 获取当前dgrid的所有行数据
			const rows = dgrid.getRows();
			console.log("rows:", rows);

			// 标记是否有数据被添加
			let dataAdded = false;
			// 记录重复的数据
			let duplicateNames = [];
			// 记录未找到插入位置的数据
			let notFoundCodes = [];

			// 遍历服务端返回的数据项，逐一定位插入位置并添加子节点
			data.forEach((dataItem) => {
				const fbms = dataItem.extendObjects.fbms;
				const newContPackName = dataItem.extendObjects.cont_pack_name;
				console.log("处理 fbms:", fbms, "newContPackName:", newContPackName);

				// 查找插入父节点：优先精确匹配（如 0802），若无则回退到两位前缀（如 08）
				const parentNode = findInsertionParent(rows, fbms);
				if (!parentNode) {
					console.warn("未找到可插入的父节点：", fbms);
					notFoundCodes.push(fbms);
					return; // 跳过该数据项
				}

				// 在父节点的同级下检查名称是否重复
				let isDuplicate = false;
				if (parentNode.children && parentNode.children.length > 0) {
					parentNode.children.forEach(child => {
						if (child.contPackName === newContPackName) {
							isDuplicate = true;
							duplicateNames.push(newContPackName);
						}
					});
				}

				if (isDuplicate) {
					return; // 跳过重复项
				}

				// 根据 fbms 获取合同属性映射（支持 01/02/0802 等），并生成子节点数据
				const attrs = getContractAttrsForFbms(fbms);
				const childNode = {
					PhId: null,
					phidPc: phid,
					contPackCode: getNextSequentialCode(parentNode),
					parentId: parentNode.PhId,
					contPackName: newContPackName,
					contPackDetail: dataItem.extendObjects.cont_pack_detail,
					plannedEntranceDate: dataItem.extendObjects.planned_entrance_date,
					plannedProcurementDate: dataItem.extendObjects.planned_procurement_date,
					warningRatio: 1,
					settlementWarningRatio: 1,
					phidConRela: null,
					TagType: attrs.tagType,
					type: 1, // 实体类
					contractMode: attrs.contractMode,
					contractType: attrs.contractType,
					contractType_EXName: attrs.contractTypeText,
					children: []
				};

				if (!parentNode.children) {
					parentNode.children = [];
				}
				console.log("childNode:", childNode);
				parentNode.children.push(childNode);
				dgrid.updateRow(parentNode);
				dataAdded = true;
			});

			// 如果有重复数据，提示用户
			// if (duplicateNames.length > 0) {
			// 	$NG.alert(`以下合约包名称已存在，已跳过添加：${duplicateNames.join(', ')}`);
			// }

			// 如果没有数据被添加，提示用户
			if (!dataAdded) {
				if (duplicateNames.length === 0) {
					const msg = notFoundCodes.length > 0 ?
						`未找到以下 fbms 的插入位置：${notFoundCodes.join(', ')}` :
						"未找到匹配的插入位置!";
					$NG.alert(msg);
				}
				return;
			}

			// 展开所有层级
			setTimeout(() => {
				const maxDepth = getTreeMaxDepth(rows);
				expandAllLevels(dgrid, maxDepth);
			}, 200);
		});
	}, "u_xzlwfbyzyfb");
//暂时注释
// 	useBeforeClick(async function ({ args }) {
// 		const rows = dgrid.getRows();
// 		console.log("rows:", rows);
// 		for (let i = 0; i < rows.length; i++) {
// 			const row = rows[i];
// 			console.log("row.children.length:", row.children.length)
// 			if (row.children.length == 0) {
// 				if (row.contractType == null) {
// 					const contPackName = row.contPackName;
// 					await $NG.alert(`合约包名称为${contPackName}的合同类型不能为空!`);
// 					return false;
// 				}else if(row.plannedEntranceDate == null){
// 					const contPackName = row.contPackName;
// 					await $NG.alert(`合约包名称为${contPackName}的计划进场时间不能为空!`);
// 					return false;
// 				}else if(row.plannedProcurementDate == null){
// 					const contPackName = row.contPackName;
// 					await $NG.alert(`合约包名称为${contPackName}的计划招采时间不能为空!`);
// 					return false;
// 				}
// 			}
// 		}
// 	}, "save");

	useClick(async function ({ args }) {
		var phidPc = mstform.getItem("phidPc").getValue();
		$NG.execServer("jcjhcbewzbcf", { 'phid_pc': phidPc }, (res) => {
			if (res.count > 0) {
				var data = JSON.parse(res.data);
				var count = data[0].extendObjects.count;
				if (!count == 1) {
					const msg = "计划成本该项目存在多个!";
					$NG.alert(msg);
				} else {
					$NG.execServer("yrhybhf", { 'phid_pc': phidPc }, (res) => {
						console.log('res=============>', res)
					});
				}
			}
		});
	}, "u_ts");

	// 保留原有的phidPc变化监听
	useValuesChange(({ args }) => {
		// 这里可以添加其他需要在phidPc变化时执行的逻辑
	}, "phidPc");
});




// 获取下一个顺序编号
function getNextSequentialCode(rootNode) {
	// 如果根节点没有子节点，返回基础编号（例如：0001）
	if (!rootNode.children || rootNode.children.length === 0) {
		// 可以根据需要设置初始编号格式
		return rootNode.contPackCode + '01';
	}

	// 获取所有子节点的编号
	const childCodes = rootNode.children.map(child => child.contPackCode);

	// 找出最大的编号
	let maxCode = '0';
	childCodes.forEach(code => {
		if (code > maxCode) {
			maxCode = code;
		}
	});

	// 提取编号的数字部分
	const codePattern = /\d+$/;
	const matches = maxCode.match(codePattern);

	if (matches && matches.length > 0) {
		// 获取数字部分
		const numPart = matches[0];
		// 计算下一个编号
		const nextNum = parseInt(numPart, 10) + 1;
		// 保持相同的位数（例如：01 -> 02, 001 -> 002）
		const nextNumStr = nextNum.toString().padStart(numPart.length, '0');
		// 替换数字部分
		return maxCode.replace(codePattern, nextNumStr);
	}

	// 如果无法解析编号格式，使用默认格式
	return rootNode.contPackCode + '01';
}

// 计算树形结构的最大深度
function getTreeMaxDepth(nodes, currentDepth = 1) {
	let maxDepth = currentDepth;
	nodes.forEach(node => {
		if (node.children && node.children.length > 0) {
			const childDepth = getTreeMaxDepth(node.children, currentDepth + 1);
			maxDepth = Math.max(maxDepth, childDepth);
		}
	});
	return maxDepth;
}

// 逐层展开所有层级
function expandAllLevels(dgrid, maxDepth) {
	function expandRecursive(currentLevel) {
		if (currentLevel < maxDepth) {
			dgrid.setExpand();
			setTimeout(() => {
				expandRecursive(currentLevel + 1);
			}, 50);
		}
	}
	expandRecursive(1);
}

// 递归查找树中指定 contPackCode 的节点
function findNodeByCodeInTree(nodes, code) {
	if (!nodes || !Array.isArray(nodes)) return null;
	for (let i = 0; i < nodes.length; i++) {
		const node = nodes[i];
		if (node.contPackCode === code) {
			return node;
		}
		if (node.children && node.children.length > 0) {
			const found = findNodeByCodeInTree(node.children, code);
			if (found) return found;
		}
	}
	return null;
}

// 根据 fbms 定位插入父节点：优先精确匹配（如 0802），若没有则回退到两位前缀（如 08）
function findInsertionParent(rows, fbms) {
	if (!fbms) return null;
	// 精确匹配 fbms
	let node = findNodeByCodeInTree(rows, fbms);
	if (node) return node;
	// 回退到两位前缀
	if (fbms.length > 2) {
		const prefix2 = fbms.slice(0, 2);
		node = findNodeByCodeInTree(rows, prefix2);
		if (node) return node;
	}
	return null;
}

// 根据 fbms 获取合同属性映射
function getContractAttrsForFbms(fbms) {
	const mappings = {
		'01': { tagType: 1, contractMode: 'labor', contractType: '224200106000001', contractTypeText: '劳务分包合同' },
		'02': { tagType: 2, contractMode: 'speciality', contractType: '2', contractTypeText: '专业分包合同' },
		// 新增场景：0802
		'0802': { tagType: 11, contractMode: 'speciality', contractType: '2', contractTypeText: '临时设施专业分包费' }
	};

	if (mappings[fbms]) {
		return mappings[fbms];
	}

	// 默认：作为专业分包处理，类型/文字通用
	return { tagType: 2, contractMode: 'speciality', contractType: null, contractTypeText: '专业分包合同' };
}