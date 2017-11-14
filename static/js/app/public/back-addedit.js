$(function() {
    var code;
    reqApi({
        code: '810917',
        json: {
            key: 'back_info'
        },
        sync: true
    }).then(function(data) {
        code = data.id;
    });
    var view = !!getQueryString('v');

    var fields = [{
        field: 'remark',
        type: 'hidden',
        value: '归还信息'
    }, {
        title: '内容',
        field: 'cvalue',
        type: 'textarea',
        required: true
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '810916',
        buttons: [{
            title: '保存',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    data['id'] = data['code'];
                    reqApi({
                        code: '810910',
                        json: data
                    }).done(function(data) {
                        toastr.success('操作成功');
                    });
                }
            }
        }]
    });
});