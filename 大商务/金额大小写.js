function numberToCurrency(num) {
    // 验证输入
    if (typeof num !== 'number' || isNaN(num)) {
        throw new TypeError('输入必须是有效数字');
    }
    
    // 处理负数
    const isNegative = num < 0;
    if (isNegative) num = Math.abs(num);
    
    // 处理小数部分
    const integerPart = Math.floor(num);
    const decimalPart = Math.round((num - integerPart) * 100);
    
    // 中文数字和单位定义
    const chineseNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    const integerUnits = ['', '拾', '佰', '仟'];
    const sectionUnits = ['', '万', '亿', '万亿'];
    
    // 1. 转换整数部分 - 完全重写处理逻辑
    let chineseInteger = '';
    if (integerPart === 0) {
        chineseInteger = '零';
    } else {
        // 将数字转为字符串并分割为数组
        const numStr = integerPart.toString();
        const len = numStr.length;
        
        // 从最高位开始处理
        for (let i = 0; i < len; i++) {
            const digit = parseInt(numStr[i]);
            const pos = len - i - 1; // 当前数字的位置（从右往左数）
            const unitIndex = pos % 4; // 在4位组中的位置
            const sectionIndex = Math.floor(pos / 4); // 组位置（万、亿等）
            
            // 处理当前数字
            if (digit !== 0) {
                // 添加数字和单位
                chineseInteger += chineseNums[digit] + integerUnits[unitIndex];
            } else {
                // 处理零的情况
                // 只有当不是最后一位且下一位不是零时才添加零
                if (i < len - 1 && parseInt(numStr[i + 1]) !== 0) {
                    chineseInteger += '零';
                }
            }
            
            // 添加节单位（万、亿等）
            if (unitIndex === 0 && sectionIndex > 0) {
                // 检查整个4位组是否有非零数字
                let hasNonZero = false;
                for (let j = 0; j < 4 && i - j >= 0; j++) {
                    if (parseInt(numStr[i - j]) !== 0) {
                        hasNonZero = true;
                        break;
                    }
                }
                
                if (hasNonZero) {
                    chineseInteger += sectionUnits[sectionIndex];
                }
            }
        }
    }
    
    // 添加"元"单位
    chineseInteger += '元';
    
    // 2. 转换小数部分
    let chineseDecimal = '';
    const jiao = Math.floor(decimalPart / 10);
    const fen = decimalPart % 10;
    
    if (jiao > 0 || fen > 0) {
        // 处理角
        if (jiao > 0) {
            chineseDecimal += chineseNums[jiao] + '角';
        }
        
        // 处理分
        if (fen > 0) {
            chineseDecimal += chineseNums[fen] + '分';
        }
    } else {
        // 没有小数部分
        chineseDecimal = '整';
    }
    
    // 3. 特殊处理
    // 处理连续零的问题
    let result = chineseInteger + chineseDecimal;
    
    // 优化常见问题
    result = result
        .replace(/零+/g, '零') // 合并连续零
        .replace(/零([万亿])/g, '$1零') // 处理"零万"->"万零"
        .replace(/零元/, '元') // 处理"零元"->"元"
        .replace(/零角零分/, '') // 处理小数部分全零
        .replace(/零([角分])/g, '$1'); // 去除小数部分的零
    
    // 处理整数部分为零的情况
    if (integerPart === 0) {
        result = '零元' + chineseDecimal;
    }
    
    // 处理特殊情况
    if (result === '元整') {
        result = '零元整';
    }
    
    // 处理负数
    if (isNegative) {
        result = '负' + result;
    }
    
    return result;
}

// 测试用例
console.log(numberToCurrency(621.00));      // 陆佰贰拾壹元整
console.log(numberToCurrency(1234567890.12)); // 壹拾贰亿叁仟肆佰伍拾陆万柒仟捌佰玖拾元壹角贰分
console.log(numberToCurrency(10000000));      // 壹仟万元整
console.log(numberToCurrency(0.99));          // 零元玖角玖分
console.log(numberToCurrency(0.50));          // 零元伍角
console.log(numberToCurrency(0.05));          // 零元伍分
console.log(numberToCurrency(0));             // 零元整
console.log(numberToCurrency(-123.45));       // 负壹佰贰拾叁元肆角伍分
console.log(numberToCurrency(1001000.00));    // 壹佰万壹仟元整
console.log(numberToCurrency(1010.10));       // 壹仟零壹拾元壹角
console.log(numberToCurrency(100000000));      // 壹亿元整
console.log(numberToCurrency(100000000000));   // 壹仟亿元整

$NG.AllReady(function (page,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick }
) {
    useValuesChange(({
        args
    }) => {
        const u_cljexx = args[0].u_cljexx;
        setTimeout(() => {
            const u_cljxjedx = numberToCurrency(u_cljexx);
            $NG.updateState((updater) => {
                updater.data.p_form_0000000004_m.setProps({
                    u_cljxjedx: u_cljxjedx
                });
            });
        }, 100);

    }, "p_form_0000000004_m.u_cljexx");
});