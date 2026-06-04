
$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick }
) {
    var toolbar = $NG.getCmpApi('toolbar_top');
    toolbar.getItem('attachment').getRef().click();
});