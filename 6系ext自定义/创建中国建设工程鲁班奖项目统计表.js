function allReadyEdit() {

    var mstform = Ext.getCmp('p_form0000700098_m');
    var dgrid = Ext.getCmp('p_form0000700098_d');
    var dstore = dgrid.store;
    //工程类别为只读
    mstform.getItem('u_engi_type').userSetReadOnly(true);
    //mstform.getItem('u_engi_type').userSetReadOnly(false);
    //计划获得工程可评（研）报告或项目建议书日期
    mstform.getItem('u_isproj_report').setVisible(false);
    mstform.getItem('u_isproj_license').setVisible(false);
    mstform.getItem('u_island_license').setVisible(false);
    mstform.getItem('u_issite_license').setVisible(false);
    mstform.getItem('u_isconstruct_license').setVisible(false);
    mstform.getItem('u_isreport_reply').setVisible(false);
    mstform.getItem('u_iscontract').setVisible(false);
    mstform.getItem('u_isproj_quality_asse').setVisible(false);
    mstform.getItem('u_isproj_accep_file').setVisible(false);
    mstform.getItem('u_isproj_accep_record').setVisible(false);
    mstform.getItem('u_isproj_audit_report').setVisible(false);
    mstform.getItem('u_iscon_docum').setVisible(false);
    mstform.getItem('u_iseval_opinion').setVisible(false);
    mstform.getItem('datetimecol_1').setVisible(false);
    mstform.getItem('datetimecol_2').setVisible(false);
    mstform.getItem('datetimecol_3').setVisible(false);
    mstform.getItem('datetimecol_4').setVisible(false);
    mstform.getItem('datetimecol_5').setVisible(false);
    mstform.getItem('textcol_1').setVisible(false);
    mstform.getItem('textcol_2').setVisible(false);
    mstform.getItem('textcol_3').setVisible(false);
    mstform.getItem('textcol_4').setVisible(false);
    mstform.getItem('textcol_5').setVisible(false);
    mstform.getItem('u_sj ').setVisible(false);
    /*项目信息选择前触发start*/
    mstform.getItem('phid_pc').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        var ocode = mstform.getItem('phid_org').getValue();
        console.log('ocode:', ocode);
        var u_app_year = mstform.getItem('u_app_year').getValue();
        var u_jd = mstform.getItem('u_jd').getValue();
        if (!u_app_year) {
            Ext.Msg.alert('提示', '请先维护上报年份');
            return false;
        }
        if (!u_jd) {
            Ext.Msg.alert('提示', '请先维护上报季度');
            return false;
        }
        console.log("phid_org:", ocode);
        console.log("u_app_year:", u_app_year);
        console.log("u_jd:", u_jd);
        mstform.getItem('phid_pc').setClientSqlFilter('project_table.virtual_flg=4 and  project_table.phid_org=' + ocode +
            'and project_table.phid not in ( select  phid_pc from p_form0000700098_m where  u_app_year=' + u_app_year +
            ' and u_jd=' + u_jd +
            ')')


    });
    /*项目信息选择前触发end*/

    /*项目信息选择后触发end*/
    mstform.getItem('phid_pc').addListener('helpselected', function () {
        var pc = mstform.getItem('phid_pc').getValue();
        var u_app_year = mstform.getItem('u_app_year').getValue();
        if (pc) {
            execServer('pc_helpselectd', {
                'phid': pc
            }, function (res) {
                if (res.count > 0) {
                    const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    //mstform.getItem('u_jzfs').setValue(data[0].extendObjects.imposetype);
                    mstform.getItem('bill_name').setValue(u_app_year + '年-' + data1[0].extendObjects.project_name); //res.data[0].jbr
                    mstform.getItem('u_engi_type').setValue(data1[0].extendObjects.u_engi_type); //res.data[0].jbr
                    BatchBindCombox([mstform.getItem('u_engi_type')]);
                } else {
                    Ext.Msg.alert('提示', '请先维护部门业务单元对照表');
                    return false;
                }
            })
        }
    })
    /*项目信息选择后触发end*/
    Mychanges(mstform, 'u_proj_report', 'u_isproj_report')
    Mychanges(mstform, 'u_proj_license', 'u_isproj_license')
    Mychanges(mstform, 'u_site_license', 'u_issite_license')
    Mychanges(mstform, 'u_proj_files', 'u_sj')
    Mychanges(mstform, 'u_report_reply', 'u_isreport_reply')
    Mychanges(mstform, 'u_land_license', 'u_island_license')
    Mychanges(mstform, 'u_construct_license', 'u_isconstruct_license')
    Mychanges(mstform, 'u_contract', 'u_iscontract')
    Mychanges(mstform, 'u_proj_quality_assess', 'u_isproj_quality_asse')
    Mychanges(mstform, 'u_proj_accep_record_f', 'u_isproj_accep_record')
    Mychanges(mstform, 'u_con_docum', 'u_iscon_docum')
    Mychanges(mstform, 'u_satisf_eval_table', 'u_issatisf_eval_table')
    Mychanges(mstform, 'u_proj_accep_file', 'u_isproj_accep_file')
    Mychanges(mstform, 'u_proj_audit_report', 'u_isproj_audit_report')
    Mychanges(mstform, 'u_eval_opinion', 'u_iseval_opinion')
    MychangesXS(mstform, 'ddlbcol_1', 'textcol_1', 'datetimecol_1')
    MychangesXS(mstform, 'ddlbcol_2', 'textcol_2', 'datetimecol_2')
    MychangesXS(mstform, 'ddlbcol_3', 'textcol_3', 'datetimecol_3')
    MychangesXS(mstform, 'ddlbcol_4', 'textcol_4', 'datetimecol_4')
    MychangesXS(mstform, 'ddlbcol_5', 'textcol_5', 'datetimecol_5')

    /*默认插入表体数据start*/
    var arr = new Array();
    arr.push({
        u_fjmc: '1',
    });
    arr.push({
        u_fjmc: '2',
    });
    arr.push({
        u_fjmc: '3',
    });
    dstore.insert(dstore.getCount(), arr);
    /*默认插入表体数据end*/

}

function Mychanges(mstform, field, changefiled) {
    mstform.getItem(field).on('change', function (eOp, ignoreBeforeEvent) {
        var field_value = mstform.getItem(field).getValue();
        if (field_value == '1') {
            mstform.getItem(changefiled).setVisible(false);
            mstform.getItem(changefiled).userSetMustInput(false);
        } else if (field_value == '2') {
            mstform.getItem(changefiled).setVisible(true);
            mstform.getItem(changefiled).userSetMustInput(true);
        }
    });
}

function MychangesXS(mstform, field, changefiledName, changefiledFile) {

    mstform.getItem(field).on('change', function (eOp, ignoreBeforeEvent) {
        var field_value = mstform.getItem(field).getValue();
        if (field_value == '1') {
            mstform.getItem(changefiledName).setVisible(true);
            mstform.getItem(changefiledName).userSetMustInput(true);
            mstform.getItem(changefiledFile).setVisible(false);
            mstform.getItem(changefiledFile).userSetMustInput(false);
        } else if (field_value == '2') {
            mstform.getItem(changefiledName).setVisible(false);
            mstform.getItem(changefiledName).userSetMustInput(false);
            mstform.getItem(changefiledFile).setVisible(true);
            mstform.getItem(changefiledFile).userSetMustInput(true);
        }
    });
}

/*function beforeSaveEdit() {

    var dgrid = Ext.getCmp('p_form0000700098_dgrid');
    var dstore = dgrid.store;
    var records = dstore.getRange();

    for(var i = 0, len = records.length; i < len; i++) {
        if(records[i].get('asr_flg') == 0) {
            NGMsg.Error('第' + [i + 1] + '行未上传附件，请上传附件');

            return false;
        }
    }
    return true;

}*/