//1.入口函数
$NG.AllReady(function (
  editPage,
  { useAction, useValuesChange, useDataIndexChange, useBeforeOpen, addRow, useBeforeClick, useUpdateRows, useClick }
) {
  //OOTD
  var mstform = $NG.getCmpApi("p_form_xmhtblb_m");
  var dgrid = $NG.getCmpApi("p_form_xmhtblb_d1");
  console.log('132564')
  if (editPage.oType == "add" || editPage.oType == "edit") {
    console.log('000000000000000');
    useDataIndexChange(({ args, instance }) => {
      console.log('args:',args);
      const u_zchtmc = args[0].u_zchtmc;
      console.log("u_zchtmc:", u_zchtmc);
      if (!args || !args[0] || !args[0].u_zchtmc) {
        console.error("参数不完整");
        return;
      }
      $NG.execServer("dqhjjss", { phid_cnt: u_zchtmc }, function (res) {

        if (res.count > 0) {
          const data = JSON.parse(res.data);
          console.log("data:", data);
          var currentDate = new Date();
          console.log("hjje:", data[0].extendObjects.hjje);
          //args[0].u_dqjss = Number(data[0].extendObjects.hjje);
          args[0].u_dqjss = 1.22;
          console.log('777777777777')
          args[0].u_jzrq = currentDate.toISOString().split('T')[0];
          instance.updateRow(args[0]);
        }
      });
    }, "p_form_xmhtblb_d1.u_zchtmc");
  }
});