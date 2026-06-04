function AllReady() {
  var mstform = Ext.getCmp('KcCheckHead');
  var Toolbar = CommButtonView.toolbar;
  if (otype == $Otype.VIEW) {
    Toolbar.insert(18, {
      itemId: "WKPD",
      text: "推送五矿盘点",
      width: this.itemWidth,
      iconCls: "iconfont iconcreate",
      handler: function () {
        var ChkFlg = mstform.queryById('ChkFlg').getValue();
        if (Ext.isEmpty(ChkFlg) || ChkFlg == '0') {
          Ext.Msg.alert('提示', '当前单据未审核，审核后重新推送');
          return false;
        }

        var loadMarsk = new Ext.LoadMask(document.body, {
          msg: '正在调用接口...',
          removeMask: true
        });

        //盘点单
        Ext.Ajax.request({
          url: "http://172.20.65.5:30599/new_esey/gyl/pushData/cg_pd/" + busid,
          method: 'GET',
          async: false, //同步请求
          disableCaching: false, // 添加这行来阻止_dc参数
          success: function (response) {
            var result = Ext.decode(response.responseText);
            var message = result["message"];
            if (message == "调用成功") {
              Ext.MessageBox.alert(Lang.Notes || '提示', "推送成功.", function () { });
            } else {
              Ext.MessageBox.alert(Lang.Notes || '提示', message, function () { });
            }
          },
          failure: function (response) {
            console.error("请求失败")
          }
        });
      }
    });

    Toolbar.insert(19, {
      itemId: "WKPYPK",
      text: "推送五矿盘盈盘亏",
      width: this.itemWidth,
      iconCls: "iconfont iconcreate",
      handler: function () {
        var ChkFlg = mstform.queryById('ChkFlg').getValue();
        if (Ext.isEmpty(ChkFlg) || ChkFlg == '0') {
          Ext.Msg.alert('提示', '当前单据未审核，审核后重新推送');
          return false;
        }


        var loadMarsk = new Ext.LoadMask(document.body, {
          msg: '正在调用接口...',
          removeMask: true
        });

        //盘盈盘亏单
        Ext.Ajax.request({
          url: "http://172.20.65.5:30599/new_esey/gyl/pushData/cg_pypkd/" + busid,
          method: 'GET',
          async: false, //同步请求
          disableCaching: false, // 添加这行来阻止_dc参数
          success: function (response) {
            var result = Ext.decode(response.responseText);
            var message = result["message"];
            if (message == "调用成功") {
              Ext.MessageBox.alert(Lang.Notes || '提示', "推送成功.", function () { });
            } else {
              Ext.MessageBox.alert(Lang.Notes || '提示', message, function () { });
            }
          },
          failure: function (response) {
            console.error("请求失败")
          }
        });
      }

    });
  }


}