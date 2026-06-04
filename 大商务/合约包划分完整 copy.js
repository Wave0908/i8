$NG.AllReady(function (
		editPage,
		{ useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick }
	) {
		//TODO
		var mstform = $NG.getCmpApi("IncomeCompletedListBasicInfoForm");
		var phid = mstform.getItem("phidPc").getValue();
		var toolbar = $NG.getCmpApi("toolbar"); //表单布局不同，可能有差别，f12用选择器去看
		var btn = toolbar.getItem("u_xzlwfbyzyfb");
		var dgrid = $NG.getCmpApi("grid");

		// 监听按钮点击事件
		useClick(async function ({ args }) {
			// 获取最新的项目ID
			var phid = mstform.getItem("phidPc").getValue();
			console.log("phid:",phid);
			if (!phid) {
				$NG.alert("请先选择项目!");
				return;
			}
			
			// 调用服务获取数据
			$NG.execServer("dchybhf", { 'pc': phid }, (res) => {
				// 先检查res.data是否已经是对象
				const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
				console.log("data:",data);
				
				if (!data || data.length === 0) {
					$NG.alert("未获取到相关数据!");
					return;
				}
				
				// 获取当前dgrid的所有行数据
				const rows = dgrid.getRows();
				
				// 标记是否有数据被添加
				let dataAdded = false;
				// 记录重复的数据
				let duplicateNames = [];
				
				// 遍历所有根节点
				rows.forEach((rootNode) => {
					// 只处理根节点
					if (!rootNode.s_tree_pid || rootNode.s_tree_pid === '0' || rootNode.s_tree_pid === 0) {
						// 检查根节点的contPackCode是否等于fbms
						data.forEach((dataItem) => {
							const fbms = dataItem.extendObjects.fbms;
							if (rootNode.contPackCode === fbms) {
								console.log("aaa:",rootNode);
								// 获取新数据的名称
								const newContPackName = dataItem.extendObjects.cont_pack_name;
								console.log("dataItem.extendObjects:",dataItem.extendObjects);
								console.log("cont_pack_name:",dataItem.extendObjects.cont_pack_name);
								
								// 检查是否与已有的同级节点名称重复
								let isDuplicate = false;
								if (rootNode.children && rootNode.children.length > 0) {
									rootNode.children.forEach(child => {
										if (child.contPackName === newContPackName) {
											isDuplicate = true;
											duplicateNames.push(newContPackName);
										}
									});
								}
								
								// 如果不重复，则添加新节点
								if (!isDuplicate) {
									dataAdded = true;
									//TagType
									const tagType = fbms === '01' ? 1 : 2;
									
									
									// 根据fbms设置contractMode和contractType
									const contractMode = fbms === '01' ? 'labor' : 'speciality';
									const contractType = fbms === '01' ? '224200106000001' : '2';
									const contractTypeText = fbms === '01' ? '劳务分包合同' : '专业分包合同';
									
									// 创建子节点数据
									const childNode = {
										phidPc: phid,
										contPackCode: getNextSequentialCode(rootNode), // 使用顺序编号
										parentId: rootNode.PhId, // 父节点ID
										//contPackName: newContPackName,
										//contPackDetail: dataItem.extendObjects.cont_pack_detail,
										plannedEntranceDate: dataItem.extendObjects.planned_entrance_date,
										plannedProcurementDate: dataItem.extendObjects.planned_procurement_date,
										warningRatio:1,
										settlementWarningRatio:1,
										TagType: tagType,
										type: 1, //实体类
										contractMode: contractMode, // 合同模式
										// contractType: {
										// 	value: contractType,
										// 	label: contractTypeText
										// } // 合同类型
										contractType: contractType, // 合同类型
										contractType_EXName:contractTypeText

									};
									
									// 如果根节点没有children数组，创建一个
									if (!rootNode.children) {
										rootNode.children = [];
									}
									console.log("childNode:",childNode);
									// 添加子节点到根节点
									rootNode.children.push(childNode);
									// 更新根节点
									dgrid.updateRow(rootNode);
								}
							}
						});
					}
				});
				
				// 如果有重复数据，提示用户
				// if (duplicateNames.length > 0) {
				// 	$NG.alert(`以下合约包名称已存在，已跳过添加：${duplicateNames.join(', ')}`);
				// }
				
				// 如果没有数据被添加，提示用户
				if (!dataAdded) {
					if (duplicateNames.length === 0) {
						$NG.alert("未找到匹配的根节点数据!");
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
		
		
		
		useClick(async function ({ args }) { 
				var dgrid = $NG.getCmpApi("grid");
		}, "save");

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
	
	
	
