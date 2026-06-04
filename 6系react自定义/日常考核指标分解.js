$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick, useBeforeOpen }
) {
    var mstform = $NG.getCmpApi("p_form_rckhzbfj_m");
    var dgrid = $NG.getCmpApi("p_form_rckhzbfj_d1");
    if (editPage.oType == "add" || editPage.oType == "edit") {
        console.log(111111);
        $NG.updateUI((updater) => {
            console.log(555555);
            updater.editGrid.p_form_rckhzbfj_d1.u_khyf.setProps({



                //required: true,           // 必填
                disabled: true,
                //hidden: true

            });
            updater.editGrid.p_form_rckhzbfj_d1.u_khjd.setProps({



                //required: true,           // 必填
                disabled: true,
                //hidden: true

            });
        });


        useValuesChange(({ args,form }) => {

            console.log('args', args[0]);
            //const phid_pc = args[0].pc.PhId;
            const khpl = args[0].u_khpl.value;
            if (khpl) {
                //mstform.getItem('u_khpl').userSetReadOnly(false);
                form.setReadOnly("u_khpl"); //只读

                console.log('khpl:', khpl);
                var rows = dgrid.getRows();
                console.log('rows:', rows);

                if (khpl == 0) {

                    $NG.updateUI((updater) => {
                        console.log(555555);
                        updater.editGrid.p_form_rckhzbfj_d1.u_khyf.setProps({



                            required: true,           // 必填
                            //hidden: false
                            disabled: false

                        });
                        updater.editGrid.p_form_rckhzbfj_d1.u_khjd.setProps({



                            //required: true,           // 必填
                            //hidden: true
                            disabled: true

                        });
                    });
                    // rows.forEach(function(record) {
                    //     record.set('u_khjd', null);
                    //
                    // });
                    // rows.forEach((items) => {
                    //     console.log('items:',items);
                    //     items.u_khjd=null;
                    // })
                    //var data = dgrid.getSelectionModel().getSelection();
                    //rows[0].set('u_khjd', null);
                    dgrid.refreshView();




                } else {

                    $NG.updateUI((updater) => {
                        console.log(555555);
                        updater.editGrid.p_form_rckhzbfj_d1.u_khyf.setProps({



                            //required: true,           // 必填
                            //hidden: true
                            disabled: true

                        });
                        updater.editGrid.p_form_rckhzbfj_d1.u_khjd.setProps({



                            required: true,           // 必填
                            //hidden: false
                            disabled: false


                        });
                    });
                    // rows.forEach((items) => {
                    //     items.u_khyf=null;
                    // })
                    //var data = dgrid.getSelectionModel().getSelection();
                    //data[0].set('u_khyf', null);

                    dgrid.refreshView();

                }

            } else {
                console.log(222222);
                $NG.updateUI((updater) => {
                    console.log(555555);
                    updater.editGrid.p_form_rckhzbfj_d1.u_khyf.setProps({



                        //required: true,           // 必填
                        //hidden: true
                        disabled: true

                    });
                    updater.editGrid.p_form_rckhzbfj_d1.u_khjd.setProps({



                        //required: true,           // 必填
                        //hidden: true
                        disabled: true

                    });
                });
                dgrid.refreshView();

            }



        }, "p_form_rckhzbfj_m.u_khpl")
    }



})