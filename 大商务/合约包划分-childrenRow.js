$NG.AllReady(function (
		editPage,
		{ useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick }
	) {
		//TODO
		var mstform = $NG.getCmpApi("IncomeCompletedListBasicInfoForm");
		console.log("mstform:", mstform);
		var phid = mstform.getItem("phidPc").getValue();
		console.log("phid:", phid);
		var toolbar = $NG.getCmpApi("toolbar"); //表单布局不同，可能有差别，f12用选择器去看
		console.log("toolbar:", toolbar);
		var btn = toolbar.getItem("u_xzlwfbyzyfb");
		console.log("u_xzlwfbyzyfb:", btn);
		var dgrid = $NG.getCmpApi("grid");
		console.log("dgrid:", dgrid);

		// 监听按钮点击事件
		useClick(async function ({ args }) {
			// 获取最新的项目ID
			var phid = mstform.getItem("phidPc").getValue();
			console.log('phid',phid);
			if (!phid) {
				$NG.alert("请先选择项目!");
				return;
			}
			
			// 调用服务获取数据
			$NG.execServer("dchybhf", { 'pc': phid }, (res) => {
				// 先检查res.data是否已经是对象
				console.log("res",res);
				const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
				console.log('获取到的数据:', data);
				
				if (!data || data.length === 0) {
					$NG.alert("未获取到相关数据!");
					return;
				}
				
				// 获取当前dgrid的所有行数据
				const rows = dgrid.getRows();
				console.log("当前行数据:", rows);
				
				// 标记是否有数据被添加
				let dataAdded = false;
				
				// 遍历所有根节点
				rows.forEach((rootNode) => {
					console.log('rootNode:', rootNode);
					// 只处理根节点
					if (!rootNode.s_tree_pid || rootNode.s_tree_pid === '0' || rootNode.s_tree_pid === 0) {
						console.log('处理根节点');
						// 检查根节点的contPackCode是否等于fbms
						data.forEach((dataItem) => {
							const fbms = dataItem.extendObjects.fbms;
							console.log('fbms:', fbms);
							console.log('rootNode.contPackCode:', rootNode.contPackCode);
							if (rootNode.contPackCode === fbms) {
								console.log("找到匹配的根节点:", rootNode.contPackName, "fbms:", fbms);
								dataAdded = true;
								
								// 使用addChildrenRow方法添加一个空行
								const newRowIndex = dgrid.addChildrenRow(rootNode);
								console.log("添加的新行索引:", newRowIndex);
								
								// 获取新添加的子行
								const rows = dgrid.getRows();
								let newChildRow = null;
								
								// 查找最后一个子节点
								if (rootNode.children && rootNode.children.length > 0) {
									newChildRow = rootNode.children[rootNode.children.length - 1];
									console.log("找到的新子行:", newChildRow);
									
									// 为新子行赋值
									newChildRow.contPackCode = getNextSequentialCode(rootNode); // 使用顺序编号
									newChildRow.ParentId = rootNode.PhId; // 父节点ID
									newChildRow.contPackName = dataItem.extendObjects.cont_pack_name;
									newChildRow.contPackDetail = dataItem.extendObjects.cont_pack_detail;
									newChildRow.plannedEntranceDate = dataItem.extendObjects.planned_entrance_date;
									newChildRow.plannedProcurementDate = dataItem.extendObjects.planned_procurement_date;
									newChildRow.warningRatio = 1;
									newChildRow.settlementWarningRatio = 1;
									
									// 更新行数据
									dgrid.updateRow(newChildRow);
								} else {
									console.log("未找到新添加的子行");
								}
							}
						});
					}
				});
				
				// 如果没有数据被添加，提示用户
				if (!dataAdded) {
					$NG.alert("未找到匹配的根节点数据!");
					return;
				}
				
				// 展开所有层级
				setTimeout(() => {
					const maxDepth = getTreeMaxDepth(rows);
					expandAllLevels(dgrid, maxDepth);
				}, 200);
				
				// 刷新表格视图
				dgrid.refreshView();
			});
		}, "u_xzlwfbyzyfb");

		// 保留原有的phidPc变化监听
		useValuesChange(({ args }) => {
			console.log("phidPc值变化:", args);
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
