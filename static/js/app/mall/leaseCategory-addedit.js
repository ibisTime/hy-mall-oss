$(function() {
    var view = getQueryString('v');
    var code = getQueryString('code');

    var fields = [{
        field: 'name',
        title: '类别名称',
        required: true,
        readonly: view
    }, {
        title: '图片',
        field: 'pic',
        value: "0",
        hidden: true,
        required: true
    }, {
        field: 'orderNo',
        title: '次序',
        required: true,
        number: true,
        readonly: view
    }];
    var viewList = [{
        title: "状态",
        field: "status",
        key: "category_status",
        keyCode: '810907',
        formatter: Dict.getNameForList("category_status", "810907")
    }];
    if (view) {
        fields = fields.concat(viewList);
    }
    buildDetail({
        fields: fields,
        code: code,
        detailCode: '810006',
        addCode: '810000',
        editCode: '810002',
        view: view,
        beforeSubmit: function(data) {
            data.parentCode = 0;
            data.type = "4";
            return data;
        }
    });

});