function AllReady() {
    var mstform = Ext.getCmp('mainInfoForm');
    var mstforma = Ext.getCmp('baseInfoForm');
    console.log(mstforma);

    // 原有的监听器设置
    mstform.getItem('CName').addListener('change', function () {
        mstform.getItem('IsWeChat').setValue(true);
    });

    /*政治面貌为群众和团员，无入党时间start*/
    mstforma.getItem('Political').addListener('change', function () {
        var Political = mstforma.getItem('Political').getValue();
        if (Political == '588' || Political == '586' || Political == '313191218000003') {
            mstforma.getItem('user_rdsj').setVisible('');
            mstforma.getItem('user_rdsj').setVisible(false);
            mstforma.getItem('user_rdsj').userSetMustInput(false);
        } else {
            mstforma.getItem('user_rdsj').setVisible(true);
            mstforma.getItem('user_rdsj').userSetMustInput(true);
        }
    });
    /*政治面貌为群众和团员，无入党时间end*/

    /** 动态加载拼音库并设置拼音转换功能 start */
    // 检查是否已加载pinyin-pro
    if (typeof pinyinPro === 'undefined') {
        // 动态创建script标签加载pinyin-pro
        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/zh-lx/pinyin-pro@latest/dist/pinyin-pro.js';

        script.onload = function () {
            console.log('pinyin-pro库加载完成，开始设置拼音转换功能');
            setupPinyinConversion();
        };

        script.onerror = function () {
            console.error('pinyin-pro库加载失败，尝试备用方案');
            // 备用方案：使用轻量级库pinyinlite
            loadPinyinLite();
        };

        document.head.appendChild(script);
    } else {
        // 如果已经加载，直接设置拼音转换功能
        setupPinyinConversion();
    }

    // 备用拼音库加载方案
    function loadPinyinLite() {
        var script = document.createElement('script');
        script.charset = 'UTF-8';
        script.src = 'https://cdn.jsdelivr.net/npm/pinyinlite@latest/dist/pinyinlite_full.min.js';

        script.onload = function () {
            console.log('pinyinlite库加载完成');
            setupPinyinConversionWithPinyinLite();
        };

        script.onerror = function () {
            console.error('所有拼音库加载失败，拼音功能将不可用');
            Ext.Msg.alert('警告', '拼音库加载失败，部分功能可能受限');
        };

        document.head.appendChild(script);
    }

    // 使用pinyin-pro的设置（驼峰式拼音+小写简拼）
    function setupPinyinConversion() {
        /** 根据姓名生成驼峰式拼音和小写简拼 start */
        mstform.getItem('CName').addListener('change', function (field, newValue) {
            // 清空原有值
            mstforma.getItem('user_qp').setValue('');
            mstforma.getItem('user_jp').setValue('');

            if (newValue && newValue.trim() !== '') {
                try {
                    // 获取每个字的拼音数组
                    var pinyinArray = pinyinPro.pinyin(newValue, {
                        toneType: 'none',      // 不带音调
                        type: 'array',         // 返回数组格式
                        nonZh: 'removed'       // 移除非汉字字符
                    });

                    // 处理驼峰式拼音
                    var camelCasePinyin = '';
                    // 处理小写简拼
                    var lowerCaseShortPinyin = '';

                    // 遍历每个字的拼音
                    for (var i = 0; i < pinyinArray.length; i++) {
                        var wordPinyin = pinyinArray[i];

                        if (wordPinyin && wordPinyin.length > 0) {
                            // 驼峰式处理：首字母大写，其余小写
                            var camelCaseWord = wordPinyin.charAt(0).toUpperCase() +
                                wordPinyin.slice(1).toLowerCase();
                            camelCasePinyin += camelCaseWord;

                            // 小写简拼处理：取首字母并小写
                            lowerCaseShortPinyin += wordPinyin.charAt(0).toLowerCase();
                        }
                    }

                    // 设置到表单字段
                    mstforma.getItem('user_qp').setValue(camelCasePinyin);
                    mstforma.getItem('user_jp').setValue(lowerCaseShortPinyin);

                } catch (e) {
                    console.error('拼音转换出错:', e);
                    Ext.Msg.alert('错误', '拼音转换过程中发生错误: ' + e.message);
                }
            }
        });
        /** 根据姓名生成驼峰式拼音和小写简拼 end */

        console.log('拼音转换功能已设置 (使用pinyin-pro)');
    }

    // 使用pinyinlite的设置（驼峰式拼音+小写简拼，备用）
    function setupPinyinConversionWithPinyinLite() {
        /** 根据姓名生成驼峰式拼音和小写简拼 start */
        mstform.getItem('CName').addListener('change', function (field, newValue) {
            // 清空原有值
            mstforma.getItem('user_qp').setValue('');
            mstforma.getItem('user_jp').setValue('');

            if (newValue && newValue.trim() !== '') {
                try {
                    // 使用pinyinlite转换拼音
                    var pinyinResult = pinyinlite(newValue);

                    // 处理驼峰式拼音
                    var camelCasePinyin = '';
                    // 处理小写简拼
                    var lowerCaseShortPinyin = '';

                    // 遍历每个字的拼音结果
                    for (var i = 0; i < pinyinResult.length; i++) {
                        var charPinyins = pinyinResult[i];

                        if (charPinyins && charPinyins.length > 0) {
                            // 取第一个拼音（多音字可能有多个选项）
                            var firstPinyin = charPinyins[0];

                            // 驼峰式处理：首字母大写，其余小写
                            var camelCaseWord = firstPinyin.charAt(0).toUpperCase() +
                                firstPinyin.slice(1).toLowerCase();
                            camelCasePinyin += camelCaseWord;

                            // 小写简拼处理：取首字母并小写
                            lowerCaseShortPinyin += firstPinyin.charAt(0).toLowerCase();
                        }
                    }

                    // 设置到表单字段
                    mstforma.getItem('user_qp').setValue(camelCasePinyin);
                    mstforma.getItem('user_jp').setValue(lowerCaseShortPinyin);

                } catch (e) {
                    console.error('拼音转换出错:', e);
                    Ext.Msg.alert('错误', '拼音转换过程中发生错误: ' + e.message);
                }
            }
        });
        /** 根据姓名生成驼峰式拼音和小写简拼 end */

        console.log('拼音转换功能已设置 (使用pinyinlite)');
    }
    /** 动态加载拼音库并设置拼音转换功能 end */
}

function beforeSaveEdit() {
    var dgrid = Ext.getCmp('educationInfolist');
    var mstform = Ext.getCmp('mainInfoForm');
    var dstore = dgrid.store;
    var cname = mstform.getItem('CName').getValue();
    var cno = mstform.getItem('CNo').getValue();
    var flag = 0;

    /*判断员工编号，员工姓名 是否有空格，教育经历是否存在一条start*/
    if (dstore.getCount() < 1) {
        Ext.Msg.alert('提示', '请补充教育经历！');
        return false;
    } else {
        flag = 1;
    }
    if (cno.indexOf(" ") != -1) {
        Ext.Msg.alert('提示', '员工编码有空格');
        flag = 0;
        return false;
    }
    if (cname.indexOf(" ") != -1) {
        Ext.Msg.alert('提示', '员工姓名有空格');
        flag = 0;
        return false;
    }
    /*判断员工编号，员工姓名 是否有空格，教育经历是否存在一条end*/

    if (flag == 1) {
        return true;
    } else {
        return false;
    }
}