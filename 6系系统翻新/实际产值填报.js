function AllReady() {
    var mstform = Ext.getCmp('CzActM');
    console.log('===');
    if (otype == $Otype.ADD) {
        console.log('ADD');
        mstform.getItem('PhidCycle').addListener('change', function (e) {
            var PhidCycle = mstform.getItem('PhidCycle').getValue();
            console.log("phid:", PhidCycle);
            execServer('czzq', {
                'phid': PhidCycle
            }, function (res) {
                //按照开累来计算
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                var resdate = "'" + data[0].extendObjects.bdt + '-01' + "'"
                console.log("data:", data);
                var nian = "'" + data[0].extendObjects.nian + '-01-01' + "'"
                if (mstform.getItem('PhidPc').getValue() != '') {
                    var pc = mstform.getItem('PhidPc').getValue()
                    var AmtSum = mstform.getItem('AmtSum').getValue()
                    var bywccz = mstform.getItem('user_bywccz').getValue()
                    console.log("pc:", pc);
                    console.log("nian:", nian);
                    console.log("resdate:", resdate);
                    if (pc != null && pc != '') {
                        execServer('bnlj', {
                            'pc': pc,
                            'ksdt': nian,
                            'jsdt': resdate,
                        }, function (res) {
                            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            var resda = data[0].extendObjects
                            console.log("resda:", resda);
                            mstform.getItem('user_bnwcczbhs').setValue(Ext.Number.from(resda.bnbhs, 0.00) + Ext.Number.from(AmtSum, 0.00))
                            mstform.getItem('user_bnwcczdysj').setValue(Ext.Number.from(resda.bndysj, 0.00) + Ext.Number.from(bywccz, 0.00))

                        })
                        execServer('kllj', {
                            'pc': pc,
                            'dt': resdate
                        }, function (res) {
                            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            if (data.length != 0) {
                                var resdates = data[0].extendObjects
                                mstform.getItem('user_klwcczbhs').setValue(Ext.Number.from(resdates.klbhs, 0.00) + Ext.Number.from(AmtSum, 0.00))
                                mstform.getItem('user_klwcczdysj').setValue(Ext.Number.from(resdates.kldysj, 0.00) + Ext.Number.from(bywccz, 0.00))
                            }
                        })
                    }
                }
            })
        })//当本期产值改变的时候

        mstform.getItem('PhidPc').addListener('change', function (e) {
            var PhidCycle = mstform.getItem('PhidCycle').getValue();
            if (PhidCycle) {
                execServer('czzq', {
                    'phid': PhidCycle
                }, function (res) {
                    //按照开累来计算
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    var resdate = "'" + data[0].extendObjects.bdt + '-01' + "'"
                    var nian = "'" + data[0].extendObjects.nian + '-01-01' + "'"
                    if (mstform.getItem('PhidPc').getValue() != '') {
                        var pc = mstform.getItem('PhidPc').getValue()
                        var AmtSum = mstform.getItem('AmtSum').getValue()
                        var bywccz = mstform.getItem('user_bywccz').getValue()
                        if (pc != null && pc != '') {

                            execServer('bnlj', {
                                'pc': pc,
                                'ksdt': nian,
                                'jsdt': resdate,
                            }, function (res) {
                                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                                if (data.length != 0) {
                                    var resda = data[0].extendObjects
                                    mstform.getItem('user_bnwcczbhs').setValue(Ext.Number.from(resda.bnbhs, 0.00) + Ext.Number.from(AmtSum, 0.00))
                                    mstform.getItem('user_bnwcczdysj').setValue(Ext.Number.from(resda.bndysj, 0.00) + Ext.Number.from(bywccz, 0.00))
                                }
                            })
                            execServer('kllj', {
                                'pc': pc,
                                'dt': resdate
                            }, function (res) {
                                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                                if (data.length != 0) {
                                    var resdates = data[0].extendObjects
                                    mstform.getItem('user_klwcczbhs').setValue(Ext.Number.from(resdates.klbhs, 0.00) + Ext.Number.from(AmtSum, 0.00))
                                    mstform.getItem('user_klwcczdysj').setValue(Ext.Number.from(resdates.kldysj, 0.00) + Ext.Number.from(bywccz, 0.00))
                                }
                            })
                        }
                    }
                })
            }




        })
        mstform.getItem('user_bywccz').addListener('change', function (e) {
            var PhidCycle = mstform.getItem('PhidCycle').getValue();
            if (PhidCycle) {
                execServer('czzq', {
                    'phid': PhidCycle
                }, function (res) {
                    //按照开累来计算

                    var resdate = "'" + res.data[0].bdt + '-01' + "'"
                    var nian = "'" + res.data[0].nian + '-01-01' + "'"
                    if (mstform.getItem('PhidPc').getValue() != '') {
                        var pc = mstform.getItem('PhidPc').getValue()
                        var bywccz = mstform.getItem('user_bywccz').getValue()
                        if (pc != '' & pc != null) {


                            execServer('bnlj', {
                                'pc': pc,
                                'ksdt': nian,
                                'jsdt': resdate,
                            }, function (res) {
                                if (res.count > 0) {
                                    const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                                    var resda = data1[0].extendObjects
                                    mstform.getItem('user_bnwcczdysj').setValue(Ext.Number.from(resda.bndysj, 0.00) + Ext.Number.from(bywccz, 0.00))
                                }

                            })
                            execServer('kllj', {
                                'pc': pc,
                                'dt': resdate
                            }, function (res) {
                                if (res.count > 0) {
                                    const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                                    var resdas = data1[0].extendObjects
                                    mstform.getItem('user_klwcczdysj').setValue(Ext.Number.from(resdas.kldysj, 0.00) + Ext.Number.from(bywccz, 0.00))
                                }

                            })
                        } else {
                            Ext.Msg.alert('提示', '请选择工程项目！');
                            mstform.getItem('user_bywccz').setValue('')
                        }
                    }
                })
            }
        })
        mstform.getItem('AmtSum').addListener('change', function (e) {
            var PhidCycle = mstform.getItem('PhidCycle').getValue();
            execServer('czzq', {
                'phid': PhidCycle
            }, function (res) {
                //按照开累来计算
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (data.length != 0) {
                    var resdate = "'" + data[0].extendObjects.bdt + '-01' + "'"
                    var nian = "'" + data[0].extendObjects.nian + '-01-01' + "'"
                    if (mstform.getItem('PhidPc').getValue() != '') {
                        var pc = mstform.getItem('PhidPc').getValue()
                        var AmtSum = mstform.getItem('AmtSum').getValue()
                        var bywccz = mstform.getItem('user_bywccz').getValue()
                        execServer('bnlj', {
                            'pc': pc,
                            'ksdt': nian,
                            'jsdt': resdate,
                        }, function (res) {
                            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            if (res.count > 0) {
                                var resda = data[0].extendObjects
                                mstform.getItem('user_bnwcczbhs').setValue(Ext.Number.from(resda.bnbhs, 0.00) + Ext.Number.from(AmtSum, 0.00))
                            }

                        })
                        execServer('kllj', {
                            'pc': pc,
                            'dt': resdate
                        }, function (res) {
                            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            if (res.count > 0) {
                                var resdas = data[0].extendObjects
                                mstform.getItem('user_klwcczbhs').setValue(Ext.Number.from(resdas.klbhs, 0.00) + Ext.Number.from(AmtSum, 0.00))
                            }
                        })
                    }
                }
            })
        })//当统计周期发生改变的时候
    }
    if (otype == $Otype.EDIT) {
        console.log('EDIT');
        mstform.on('dataready', function () {

        })
        mstform.getItem('PhidCycle').addListener('change', function (e) {
            var PhidCycle = mstform.getItem('PhidCycle').getValue();
            execServer('czzq', {
                'phid': PhidCycle
            }, function (res) {
                //按照开累来计算
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    var resdate = "'" + data[0].extendObjects.bdt + '-01' + "'"
                    var nian = "'" + data[0].extendObjects.nian + '-01-01' + "'"
                    if (mstform.getItem('PhidPc').getValue() != '') {
                        var pc = mstform.getItem('PhidPc').getValue()
                        var AmtSum = mstform.getItem('AmtSum').getValue()
                        var bywccz = mstform.getItem('user_bywccz').getValue()
                        if (pc != null && pc != '') {
                            execServer('bnlj', {
                                'pc': pc,
                                'ksdt': nian,
                                'jsdt': resdate,
                            }, function (res) {
                                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                                var resda = data[0].extendObjects
                                mstform.getItem('user_bnwcczbhs').setValue(Ext.Number.from(resda.bnbhs, 0.00) + Ext.Number.from(AmtSum, 0.00))
                                mstform.getItem('user_bnwcczdysj').setValue(Ext.Number.from(resda.bndysj, 0.00) + Ext.Number.from(bywccz, 0.00))

                            })
                            execServer('kllj', {
                                'pc': pc,
                                'dt': resdate
                            }, function (res) {
                                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                                var resdates = data[0].extendObjects
                                mstform.getItem('user_klwcczbhs').setValue(Ext.Number.from(resdates.klbhs, 0.00) + Ext.Number.from(AmtSum, 0.00))
                                mstform.getItem('user_klwcczdysj').setValue(Ext.Number.from(resdates.kldysj, 0.00) + Ext.Number.from(bywccz, 0.00))
                            })
                        }
                    }
                }
            })
        })//当本期产值改变的时候
        mstform.getItem('user_bywccz').addListener('change', function (e) {
            var PhidCycle = mstform.getItem('PhidCycle').getValue();
            execServer('czzq', {
                'phid': PhidCycle
            }, function (res) {
                //按照开累来计算
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    var resdate = "'" + data[0].extendObjects.bdt + '-01' + "'"
                    var nian = "'" + data[0].extendObjects.nian + '-01-01' + "'"
                    if (mstform.getItem('PhidPc').getValue() != '') {
                        var pc = mstform.getItem('PhidPc').getValue()
                        var bywccz = mstform.getItem('user_bywccz').getValue()
                        execServer('bnlj', {
                            'pc': pc,
                            'ksdt': nian,
                            'jsdt': resdate,
                        }, function (res) {
                            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            var resda = data[0].extendObjects
                            mstform.getItem('user_bnwcczdysj').setValue(Ext.Number.from(resda.bndysj, 0.00) + Ext.Number.from(bywccz, 0.00))
                        })
                        execServer('kllj', {
                            'pc': pc,
                            'dt': resdate
                        }, function (res) {
                            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            var resdas = data[0].extendObjects
                            mstform.getItem('user_klwcczdysj').setValue(Ext.Number.from(resdas.kldysj, 0.00) + Ext.Number.from(bywccz, 0.00))
                        })
                    } else {
                        Ext.Msg.alert('提示', '请选择工程项目！');
                        mstform.getItem('user_bywccz').setValue('')
                    }
                }
            })
        })
        mstform.getItem('AmtSum').addListener('change', function (e) {
            var PhidCycle = mstform.getItem('PhidCycle').getValue();
            execServer('czzq', {
                'phid': PhidCycle
            }, function (res) {
                //按照开累来计算
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    var resdate = "'" + data[0].extendObjects.bdt + '-01' + "'"
                    var nian = "'" + data[0].extendObjects.nian + '-01-01' + "'"
                    if (mstform.getItem('PhidPc').getValue() != '') {
                        var pc = mstform.getItem('PhidPc').getValue()
                        var AmtSum = mstform.getItem('AmtSum').getValue()
                        var bywccz = mstform.getItem('user_bywccz').getValue()
                        execServer('bnlj', {
                            'pc': pc,
                            'ksdt': nian,
                            'jsdt': resdate,
                        }, function (res) {
                            const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            var resda = data1[0].extendObjects

                            mstform.getItem('user_bnwcczbhs').setValue(Ext.Number.from(resda.bnbhs, 0.00) + Ext.Number.from(AmtSum, 0.00))
                        })
                        execServer('kllj', {
                            'pc': pc,
                            'dt': resdate
                        }, function (res) {
                            const data2 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            var resdas = data2[0].extendObjects

                            mstform.getItem('user_klwcczbhs').setValue(Ext.Number.from(resdas.klbhs, 0.00) + Ext.Number.from(AmtSum, 0.00))
                        })
                    }
                }
            })
        })//当统计周期发生改变的时候





    }
}
