    function AllReady() {

        var mstform = Ext.getCmp('AdvanceProject');
        mstform.getItem('ProjectName').addListener('change', function() {
            var ProjectName = mstform.getItem('ProjectName').getValue();
            mstform.getItem('user_cym').setValue(ProjectName);
        });
        mstform.getItem('user_csrq').setValue(new Date());
        var temp = 0;
        execServer('jsqxsq', {
            'a': $appinfo.userID
        }, function(res) {
            console.log(res)
            // 解析data并用for循环遍历所有roleno
            var dataArr = JSON.parse(res.data);
            for (var i = 0; i < dataArr.length; i++) {
                var item = dataArr[i];
                if (item.extendObjects && item.extendObjects.roleno) {
                    console.log('roleno:', item.extendObjects.roleno);
                }
            }


            if (temp == 1) {
                mstform.getItem('user_sftb').userSetReadOnly(false);
            } else {
                mstform.getItem('user_sftb').userSetReadOnly(true);
            }
        });
        console.log(temp)

        var Toolbar = Ext.getCmp('toolbar');
        Toolbar.insert(3, {
            itemId: "qrtbdx",
            text: "确认投标对象",
            width: this.itemWidth,
            iconCls: "icon-New"
        }); //指定位置插入按钮
        Toolbar.items.get('qrtbdx').on('click', function() {
            var user_sftb = mstform.getItem('user_sftb').getValue();
            execServer('bqlxtzsftb', {
                'user_sftb': user_sftb,
                'phid': busid
            }, function(res) {});
        });


    }