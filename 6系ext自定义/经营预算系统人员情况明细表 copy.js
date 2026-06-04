function allReadyEdit_cus() {
    var mstform = Ext.getCmp('p_form0000700763_m');
    var dgrid = Ext.getCmp('p_form0000700763_dgrid');
    var Toolbar = Ext.getCmp('toolbar');
    var dstore = dgrid.store;
    dgrid.getColumn('empid_name').getEditor().addListener('itemchanged', function (){
        var data = dgrid.getSelectionModel().getSelection();
        var empidPhid = data[0].get('empid');
        callServer('ryxx', [{
            'phid': empidPhid
        }], function(res) {
            console.log(res);
            if(res.record[0]) {
               
                data[0].set('u_xb',res.record[0].sex);//性别
                data[0].set('u_csrq',res.record[0].birthday);//出生年月
                data[0].set('u_byyx',res.record[0].byyx1);//初始学历毕业院校
                data[0].set('u_zy',res.record[0].zy1);//初始学历专业
                data[0].set('u_xl',res.record[0].xl1);//初始学历学历
                data[0].set('u_bysj',res.record[0].bysj1);//初始学历毕业时间
                data[0].set('u_byyx2',res.record[0].byyx2);//最高学历毕业院校
                data[0].set('u_zy2',res.record[0].zy2);//最高学历专业
                data[0].set('u_xl2',res.record[0].xl2);//最高学历学历
                data[0].set('u_bysj2',res.record[0].bysj2);//最高学历毕业时间
                data[0].set('u_zc',res.record[0].zc);//职称
                data[0].set('u_rzqysj',res.record[0].rzqysj);//入职企业时间
                data[0].set('u_xzw',res.record[0].zw);//现职务
                data[0].set('u_xgwxmb',res.record[0].com_name);//现岗位项目部
                data[0].set('u_zs',res.record[0].zs);//聘用形式-正式
                data[0].set('u_lwpq',res.record[0].lwpq);//聘用形式-劳务派遣
                data[0].set('u_wp',res.record[0].wp);//聘用形式-外聘
                data[0].set('u_txfp',res.record[0].txfp);//聘用形式-退休返聘
                data[0].set('u_jsnrzxus1',res.record[0].rz1);//近三年入职新学生是2022年
                data[0].set('u_jsnrzxs2',res.record[0].rz2);//近三年入职新学生是2023年
                data[0].set('u_jsnrzxs3',res.record[0].rz3);//近三年入职新学生是2024年                        
                data[0].set('u_lxdh',res.record[0].sjh);//联系电话
                data[0].set('u_gbcj',res.record[0].gbcj);//干部层级
                data[0].set('u_yjzjs',res.record[0].zczj);//一级造价工程师
                data[0].set('u_zsqd',res.record[0].zsqd);//证书清单
                data[0].set('u_jlqk',res.record[0].jlqk);//奖励清单
                //退休时间计算
                const birthday = res.record[0].birthday;
                const sex = res.record[0].sex;
                const gbcj = res.record[0].gbcj || ''; // 干部层级
                const currentYear = new Date().getFullYear();
                
                if (birthday && sex) {
                    try {
                        const birthDate = new Date(birthday);
                        let retirementDate;
                        
                        if (sex === '男') {
                            // 男性退休日期计算
                            const baseDate = new Date(1965, 0, 1); // 1965年1月1日
                            const monthsDiff = (birthDate.getFullYear() - baseDate.getFullYear()) * 12 + 
                                             (birthDate.getMonth() - baseDate.getMonth());
                            const extraMonths = Math.floor((monthsDiff + 3) / 4);
                            const totalMonths = 12 * 60 + extraMonths;
                            
                            retirementDate = new Date(birthDate);
                            retirementDate.setMonth(birthDate.getMonth() + totalMonths);
                        } else {
                            // 女性退休日期计算
                            if (gbcj.includes('224210615000042','221025033136','224210615000048')) {
                                 // 女性非干部退休日期计算
                                const baseDate = new Date(1975, 0, 1); // 1975年1月1日
                                const monthsDiff = (birthDate.getFullYear() - baseDate.getFullYear()) * 12 + 
                                                 (birthDate.getMonth() - baseDate.getMonth());
                                const extraMonths = Math.floor((monthsDiff + 1) / 2);
                                const totalMonths = 12 * 50 + extraMonths;
                                
                                retirementDate = new Date(birthDate);
                                retirementDate.setMonth(birthDate.getMonth() + totalMonths);
                                
                            } else {
                               // 女性干部退休日期计算
                                const baseDate = new Date(1970, 0, 1); // 1970年1月1日
                                const monthsDiff = (birthDate.getFullYear() - baseDate.getFullYear()) * 12 + 
                                                 (birthDate.getMonth() - baseDate.getMonth());
                                const extraMonths = Math.floor((monthsDiff + 3) / 4);
                                const totalMonths = 12 * 55 + extraMonths;
                                
                                retirementDate = new Date(birthDate);
                                retirementDate.setMonth(birthDate.getMonth() + totalMonths);
                            }
                        }
                        
                        const retirementYear = retirementDate.getFullYear();
                        
                        // 设置退休年份标记
                        data[0].set('u_jsnjjtx1', retirementYear === currentYear - 1 ? '1' : '');
                        data[0].set('u_jsnjjtx2', retirementYear === currentYear ? '1' : '');
                        data[0].set('u_jsnjjtx3', retirementYear === currentYear + 1 ? '1' : '');
                    } catch (e) {
                        console.error('退休日期计算错误', e);
                        // 清空退休标记
                        data[0].set('u_jsnjjtx1', '');
                        data[0].set('u_jsnjjtx2', '');
                        data[0].set('u_jsnjjtx3', '');
                    }
                } else {
                    // 清空退休标记
                    data[0].set('u_jsnjjtx1', '');
                    data[0].set('u_jsnjjtx2', '');
                    data[0].set('u_jsnjjtx3', '');
                }
            }
            if (res.record[0].rzqysj) {
                const joinDate = new Date(res.record[0].rzqysj);
                const diffMs = new Date() - joinDate;
                const diffYears = Math.round((diffMs / (365.25 * 24 * 60 * 60 * 1000)) * 10) / 10;
                data[0].set('u_ysxtcync', diffYears > 0 ? diffYears : 0);
            } else {
                data[0].set('u_ysxtcync', 0);
            };//预算系统从业年长
            
        });
    });
  
}