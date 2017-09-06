$(function() {

    var code = getQueryString('code');

    var fields = [{
        field: 'location',
        title: '位置',
        type: 'select',
        key: "rent_prod_location",
        keyCode: '810907',
        required: true,
    }, {
        field: 'orderNo',
        title: '序号',
        required: true,
    }, {
        field: 'remark',
        title: '备注',
        maxlength: 255
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '810026',
    });

    $("#subBtn").off("click").click(function() {
        if ($('#jsForm').valid()) {
            confirm("确认上架？").then(function() {
                var data = $('#jsForm').serializeObject();
                data.code = code;
                reqApi({
                    code: '810013',
                    json: data
                }).then(function() {
                    sucDetail();
                });

            });
        }
    });
});