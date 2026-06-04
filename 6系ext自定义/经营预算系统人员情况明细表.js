function allReadyEdit_cus() {
    var mstform = Ext.getCmp('p_form0000700763_m');
    var dgrid = Ext.getCmp('p_form0000700763_d');
    var Toolbar = Ext.getCmp('toolbar');
    dgrid.getColumn('empid_EXName').getEditor().addListener('itemchanged', function () {
        var data = dgrid.getSelectionModel().getSelection();
        var empidPhid = data[0].get('empid');
        execServer('p_form0000700763_ryxx', {
            'phid': empidPhid
        }, function (res) {
            console.log(res);
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                data[0].set('u_xb', data1[0].extendObjects.sex);//性别
                data[0].set('u_csrq', data1[0].extendObjects.birthday);//出生年月
                data[0].set('u_byyx', data1[0].extendObjects.byyx1);//初始学历毕业院校
                data[0].set('u_zy', data1[0].extendObjects.zy1);//初始学历专业
                data[0].set('u_xl', data1[0].extendObjects.xl1);//初始学历学历
                data[0].set('u_bysj', data1[0].extendObjects.bysj1);//初始学历毕业时间
                data[0].set('u_byyx2', data1[0].extendObjects.byyx2);//最高学历毕业院校
                data[0].set('u_zy2', data1[0].extendObjects.zy2);//最高学历专业
                data[0].set('u_xl2', data1[0].extendObjects.xl2);//最高学历学历
                data[0].set('u_bysj2', data1[0].extendObjects.bysj2);//最高学历毕业时间
                data[0].set('u_zc', data1[0].extendObjects.zc);//职称
                data[0].set('u_rzqysj', data1[0].extendObjects.rzqysj);//入职企业时间
                data[0].set('u_xzw', data1[0].extendObjects.zw);//现职务
                data[0].set('u_xgwxmb', data1[0].extendObjects.com_name);//现岗位项目部
                data[0].set('u_zs', data1[0].extendObjects.zs);//聘用形式-正式
                data[0].set('u_lwpq', data1[0].extendObjects.lwpq);//聘用形式-劳务派遣
                data[0].set('u_wp', data1[0].extendObjects.wp);//聘用形式-外聘
                data[0].set('u_txfp', data1[0].extendObjects.txfp);//聘用形式-退休返聘
                data[0].set('u_jsnrzxus1', data1[0].extendObjects.rz1);//近三年入职新学生是2022年
                data[0].set('u_jsnrzxs2', data1[0].extendObjects.rz2);//近三年入职新学生是2023年
                data[0].set('u_jsnrzxs3', res.record[0].rz3);//近三年入职新学生是2024年                        
                data[0].set('u_lxdh', data1[0].extendObjects.sjh);//联系电话
                data[0].set('u_gbcj', data1[0].extendObjects.gbcj);//干部层级
                data[0].set('u_yjzjs', data1[0].extendObjects.zczj);//一级造价工程师
                data[0].set('u_zsqd', data1[0].extendObjects.zsqd);//证书清单
                data[0].set('u_jlqk', data1[0].extendObjects.jlqk);//奖励清单
                //退休时间计算
                const birthday = data1[0].extendObjects.birthday;
                const sex = data1[0].extendObjects.sex;
                const gbcj = data1[0].extendObjects.gbcj || ''; // 干部层级
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
                            if (gbcj.includes('224210615000042', '221025033136', '224210615000048')) {
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
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (data1[0].extendObjects.rzqysj) {
                    const joinDate = new Date(data1[0].extendObjects.rzqysj);
                    const diffMs = new Date() - joinDate;
                    const diffYears = Math.round((diffMs / (365.25 * 24 * 60 * 60 * 1000)) * 10) / 10;
                    data[0].set('u_ysxtcync', diffYears > 0 ? diffYears : 0);
                } else {
                    data[0].set('u_ysxtcync', 0);
                };//预算系统从业年长
            }

        });
    });

}