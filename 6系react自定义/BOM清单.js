//1.入口函数
$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useBeforeOpen, addRow, useBeforeClick, useUpdateRows, useClick }
) {
    //OOTD
    var mstform = $NG.getCmpApi("p_form_bomqd_m");
    var dgrid = $NG.getCmpApi("p_form_bomqd_d1");

    // 原生写法：直接通过 DOM 定位并强制隐藏
    // 1. 使用 MutationObserver 持续监听 DOM，防止 React 重新渲染后恢复显示
    // 2. 找到包含指定文本的 panel 并隐藏其父级容器
    setTimeout(function () {
        var observer = new MutationObserver(function (mutations) {
            var titles = document.querySelectorAll(".udp-panel-title");
            titles.forEach(function (title) {
                 // 修改为明细表的标题内容
                 if (title.innerText.indexOf("BOM清单_明细") !== -1 || title.innerText.indexOf("明细") !== -1) {
                     // 找到标题所在的面板容器
                     var container = title.closest(".ant-collapse-item") || title.parentElement;
                     if (container && container.style.display !== "none") {
                         container.style.setProperty("display", "none", "important");
                         console.log("已强制隐藏BOM清单明细表容器");
                     }
                 }
             });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // 初始执行一次
         var initialTitles = document.querySelectorAll(".udp-panel-title");
         initialTitles.forEach(function (title) {
             if (title.innerText.indexOf("BOM清单_明细") !== -1 || title.innerText.indexOf("明细") !== -1) {
                 var container = title.closest(".ant-collapse-item") || title.parentElement;
                 if (container) {
                     container.style.setProperty("display", "none", "important");
                 }
             }
         });
    }, 500);
});