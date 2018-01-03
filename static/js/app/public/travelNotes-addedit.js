$(function() {

    var code = getQueryString('code');
    var view = getQueryString('v');
    
    var remarkNote = [{
        title: "审核说明",
        field: 'remark',
        maxlength: 255,
        readonly: false
    }];
    
    var checkList = [{
        title: '审核人',
        field: 'approver',
        formatter: function(v, data) {
            if (v) {
                return v
            } else {
                $("#approver").parent().css('display', 'none');
                $("#approveDatetime").parent().css('display', 'none');
                $("#remark").parent().css('display', 'none');
            }
        },
        readonly: true
    }, {
        title: '审核时间',
        field: 'approveDatetime',
        readonly: true,
        formatter: dateTimeFormat
    }, {
        title: '审核说明',
        field: 'remark',
        readonly: true
    }];
    
    var fields = [{
        field: 'description',
        title: '描述',
        readonly: true
    }, {
        field: "pic",
        title: '图片',
        type: "img",
		single: true,
        readonly: true
    }, {
        field: 'publishDatetime',
        title: '发布时间',
        formatter: dateTimeFormat,
        readonly: true
    }];
    
    if (view) {
        remarkNote = [];
        fields = fields.concat(checkList);
        buttons = [{
            title: '返回',
            handler: function() {
                goBack();
            }
        }];
    } else {
        fields = fields.concat(remarkNote);
        var buttons = [{
            title: '通过',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    data.approvelResult = '1';
                    data.code = code;
                    reqApi({
                        code: '801053',
                        json: data
                    }).done(function(data) {
                        sucDetail();
                    });
                }
            }
        }, {
            title: '不通过',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    data.approvelResult = '0';
                    data.code = code;
                    reqApi({
                        code: '801053',
                        json: data
                    }).done(function(data) {
                        sucDetail();
                    });
                }
            }
        }, {
            title: '返回',
            handler: function() {
                goBack();
            }
        }];
    }
    
    var options = {
        fields: fields,
        code: code,
        view: true,
        buttons: buttons,
        detailCode: '801056',
    };
    
    buildDetail(options);
});