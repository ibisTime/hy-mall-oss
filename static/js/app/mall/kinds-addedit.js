$(function() {
    var view = getQueryString('v');
    var code = getQueryString('code');

    var fields = [{
        title: "父类",
        field: "parentCode",
        type: 'select',
        listCode: "808007",
        keyName: "code",
        valueName: "name",
        searchName: "name",
        searchParams: {
            type: "1",
            parentCode: "0",
            status: "1"
        },
        required: true,
        readonly: view
    }, {
        field: 'name',
        title: '小类名称',
        required: true,
        readonly: view
    }, {
        title: '图片',
        field: 'pic',
        type: 'img',
        single: true,
        readonly: view,
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

        formatter: Dict.getNameForList("category_status")
    }];
    if (view) {
        fields = fields.concat(viewList);
    }
    buildDetail({
        fields: fields,
        code: code,
        detailCode: '808006',
        addCode: '808000',
        editCode: '808002',
        view: view,
        beforeSubmit: function(data) {
            // data.parentCode = 0;
            data.type = "1";
            return data;
        }
    });

});