$NG.AllReady(function (
  editPage,
  { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick }
) {
  // 获取表格组件
  const detailTable = $NG.getCmpApi("hr3_pr_pay_data_det_id");
  
  // 订阅整表数据更新
  useUpdateRows(({ args, table }) => {
    // 获取表格所有行数据
    const rows = table.getRows();
    
    // 遍历每一行数据
    rows.forEach(rowdata => {
      const cno = rowdata.CNo;
      
      // 调用服务端获取数据
      $NG.execServer("getyglwgs", {
        'cno': cno
      }, function (res) {
        if (res && res.data && res.data[0]) {
          // 更新行数据
          table.updateRow(rowdata._rowKey, {
            user_lwpqdw: res.data[0].phid,
            user_lwpqdw_name: res.data[0].sendplace
          });
        }
      });
    });
  }, "hr3_pr_pay_data_det_id");
});
