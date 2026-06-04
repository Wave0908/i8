$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick }
) {
    //TODO
    var mstform = $NG.getCmpApi('p_form_0000000001_m');
    console.log("aaaaaaa========", mstform);
    var hctx = document.getElementById('hhrxx_ctx');
    hctx.style.display = 'none';
    var ctx = document.getElementById('合伙人信息_ctx');
    console.log("ctx:", ctx);
    ctx.style.display = 'none';

    useValuesChange(({ args }) => {
        console.log("mstform.getItem('u_jyfs')", mstform.getItem('u_jyfs'));
        if (mstform.getItem('u_jyfs').getValue() == 1 || mstform.getItem('u_jyfs').getValue() == 3 || mstform.getItem('u_jyfs').getValue() == 4) {
            var ctx = document.getElementById('合伙人信息_ctx');
            console.log("ctx:", ctx);
            ctx.style.display = 'none';
            mstform.getItem("u_xm").setProps({
                required: false, //required是否必输
            });
            mstform.getItem("u_nl").setProps({
                required: false, //required是否必输
            });
            mstform.getItem("u_sfzh").setProps({
                required: false, //required是否必输
            });
            mstform.getItem("u_ndlrl").setProps({
                required: false, //required是否必输
            });
            mstform.getItem("u_jjsl").setProps({
                required: false, //required是否必输
            });
            mstform.getItem("u_hzxmqk").setProps({
                required: false, //required是否必输
            });

        } else if (mstform.getItem('u_jyfs').getValue() == 2) {
            var ctx = document.getElementById('合伙人信息_ctx');
            console.log("ctx:", ctx);
            ctx.style.display = 'block';

            mstform.getItem("u_xm").setProps({
                required: true, //required是否必输
            });
            mstform.getItem("u_nl").setProps({
                required: true, //required是否必输
            });
            mstform.getItem("u_sfzh").setProps({
                required: true, //required是否必输
            });
            mstform.getItem("u_ndlrl").setProps({
                required: true, //required是否必输
            });
            mstform.getItem("u_jjsl").setProps({
                required: true, //required是否必输
            });
            mstform.getItem("u_hzxmqk").setProps({
                required: true, //required是否必输
            });
            
            
            

        }
    }, "u_jyfs");

});
