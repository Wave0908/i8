function allReadyEdit() {
    //获取标前立项_投融资
    var mstform = Ext.getCmp('p_form0000600069_m');
    //组织设置为只读
    mstform.getItem('ocode').userSetReadOnly(true);
    //审核人设置为不可见
    mstform.getItem('checkpsn').setVisible(false);
    //标题设置为不可见
    mstform.getItem('title').setVisible(false);
    //项目名称字段设置为必输项
    mstform.getItem('xmmc').userSetMustInput(true);
    //项目编码设置为只读
    mstform.getItem('xmbm').userSetReadOnly(true);
    //项目类型设置为只读
    mstform.getItem('xmlx').userSetReadOnly(true);
    //是否需要资格预审字段设置为隐藏
    mstform.getItem('sfxyzgys').setVisible(false);
    //是否属于直签项目设置为必输
    mstform.getItem('sfsyzqxm').userSetMustInput(true);
    //填报部门字段设置为必输项
    mstform.getItem('tbbm').userSetMustInput(true);
    //备注字段设置为必输项
    mstform.getItem('remarks').userSetMustInput(true);
    //总投资字段设置为必输项
    mstform.getItem('amt').userSetMustInput(true);
    //省字段设置为必输项
    mstform.getItem('province').userSetMustInput(true);
    //城市字段设置为必输项
    mstform.getItem('city').userSetMustInput(true);
    //区县字段设置为必输项
    mstform.getItem('qx').userSetMustInput(true);
    //目前项目进展字段设置为必输项
    mstform.getItem('mqxmjz').userSetMustInput(true);
    //项目概况字段设置为必输项
    mstform.getItem('xmgk').userSetMustInput(true);
    //业主财务资信情况字段设置为必输项
    mstform.getItem('yzcwzxqk').userSetMustInput(true);


    if (otype == $Otype.ADD || otype == $Otype.EDIT || otype == $Otype.VIEW) {

        //省市县三级联动  start
        //通过省过滤市
        mstform.getItem('city').on('beforetriggerclick', function () {
            mstform.getItem('qx').setValue();
            if (Ext.isEmpty(mstform.getItem('province'))) {
                Ext.Msg.alert('提示', "请选选择省");
                return false;
            }
            mstform.getItem('city').setOutFilter({
                pid: mstform.getItem("province").getValue()
            });
        });
        //通过市过滤区县
        mstform.getItem('qx').on('beforetriggerclick', function () {
            if (Ext.isEmpty(mstform.getItem('province').getValue()) || Ext.isEmpty(mstform.getItem('city').getValue())) {
                Ext.Msg.alert('提示', "请选选择省份和城市");
                return false;
            }
            mstform.getItem('qx').setOutFilter({
                pid: mstform.getItem("city").getValue()
            });
        });
        //省市县三级联动 end

        //填报部门start
        //填报部门过滤
        mstform.getItem('tbbm').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
            if (Ext.isEmpty(mstform.getItem('ocode').getValue())) {
                Ext.Msg.alert('提示', "请选选择填报部门");
                return false;
            }
            var ocode = mstform.getItem('ocode').getValue();
            mstform.getItem('tbbm').setOutFilter({
                parent_orgid: ocode
            })
        });

        //填报部门end

        //根据当前组织自动带出表单的组织和部门 start
        var userID = $appinfo.userID;
        if (userID) {
            callServer('bmmc', [{
                'id': userID
            }], function (res) {
                if (res.record[0]) {
                    mstform.getItem('tbbm').setValue(res.record[0].phid);
                    BatchBindCombox([mstform.getItem('tbbm')]);
                }
            })
        }
        //根据当前组织自动带出表单的组织和部门 end

        //项目名称字段通用帮助选择后触发start

        //项目名称字段帮助窗口选择后触发
        mstform.getItem('xmmc').addListener('helpselected', function () {
            var xmmcPhid = mstform.getItem('xmmc').getValue();
            callServer('xmmc', [{
                'phid': xmmcPhid
            }], function (res) {
                if (res.record[0]) {
                    mstform.getItem('xmbm').setValue(res.record[0].xmbm);
                    mstform.getItem('xmlx').setValue(res.record[0].xmlx);
                    mstform.getItem('mqxmjz').setValue(res.record[0].mqxmjz);
                    mstform.getItem('province').setValue(res.record[0].province);
                    mstform.getItem('city').setValue(res.record[0].city);
                    mstform.getItem('qx').setValue(res.record[0].qx);
                    mstform.getItem('jsdw').setValue(res.record[0].jsdw);
                    //判断项目类型为PPP模式或者ABO模式的时候 总投资 传 投资估算
                    if (res.record[0].xmlx == '1' || res.record[0].xmlx == '3') {
                        mstform.getItem('amt').setValue(res.record[0].tzgs);
                    } else if (res.record[0].xmlx == '2') {
                        //判断项目类型为F+融资 的时候  总投资 传 总投资概算
                        mstform.getItem('amt').setValue(res.record[0].ztzgs);
                    }
                    //代码转名称
                    BatchBindCombox([
                        mstform.getItem('xmlx'),
                        mstform.getItem('province'),
                        mstform.getItem('city'),
                        mstform.getItem('qx'),
                        mstform.getItem('jsdw')
                    ]);
                }
            });

        });
        //项目名称字段通用帮助选择后触发end

        /*项目名称字段通用帮助选择前触发 start*/
        //项目名称选择后触发

        mstform.getItem('xmmc').addListener('beforetriggerclick', function () {
            var pocode = mstform.getItem('ocode').getValue();
            mstform.getItem('xmmc').setOutFilter({
                'p_form0000600061_m.ocode': pocode
            });

        });
        /*项目名称字段通用帮助选择前触发 end*/

        /*是否属于直签项目start*/
        //当是否属于直签项目为是的时候 直接走标后分析 为否的时候 显示 是否需要资格预审
        mstform.getItem('sfsyzqxm').addListener('change', function () {
            var sfsyzqxm = mstform.getItem('sfsyzqxm').getValue();
            //2为否
            if (sfsyzqxm == '2') {
                //是否需要资格预审字段设置为显示
                mstform.getItem('sfxyzgys').setVisible(true);
                //是否需要资格预审字段设置为必输
                mstform.getItem('sfxyzgys').userSetMustInput(true);
            } else {
                //其他情况
                //是否需要资格预审字段设置为隐藏
                mstform.getItem('sfxyzgys').setVisible(false);
                //是否需要资格预审字段设置非必输
                mstform.getItem('sfxyzgys').userSetMustInput(false);
            }

        });

        /*是否属于直签项目end*/
    }

}