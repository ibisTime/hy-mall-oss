$(function() {

    var code = getQueryString('code');
    var type = getQueryString('t');

    var fields = [{
        title: '参数名',
        field: 'ckey',
        readonly: true,
        required: true,
        maxlength: 20
    }, {
        title: '参数值',
        field: 'cvalue',
        required: true,
        maxlength: 255
    }, {
        title: '备注',
        field: 'remark',
        maxlength: 250
    }];

    buildDetail({

        fields: fields,
        code: code,
        editCode: "805911",
        detailCode: '805916',
        // beforeSubmit: function(data) {
        //     data.remark = $('#remark').html();
        //     data.type = type;

        //     return data;
        // }
    });

});