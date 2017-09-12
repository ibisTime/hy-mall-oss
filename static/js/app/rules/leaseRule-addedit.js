$(function() {

    var code = getQueryString('code');
    var type = getQueryString('t');

    var fields = [{
        title: '参数',
        field: 'ckey',
        readonly: true,
        required: true,
        maxlength: 20
    }, {
        title: '规则名称',
        field: 'remark',
        readonly: true,
        maxlength: 250
    }, {
        title: '数值',
        field: 'cvalue',
        required: true,
        maxlength: 255
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '810916',
        editCode: '810910',
        beforeSubmit: function(data) {
            data.remark = $('#remark').val();
            data.type = type;
            return data;
        }
    });
});