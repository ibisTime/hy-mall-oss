$(function() {
    var code = getQueryString('code');
    var start = {
        elem: '#gradDatetime',
        format: 'YYYY-MM-DD',
        min: laydate.now(+1),
        istoday: false,
        choose: function(datas) {
            var d = new Date(datas);
            d.setDate(d.getDate());
            datas = dateFormat(d);
            end.min = datas;
            end.start = datas
        }
    };
    var end = {
        elem: '#endDatetime',
        format: 'YYYY-MM-DD',
        min: laydate.now(),
        istoday: false,
        choose: function(datas) {
            var d = new Date(datas);
            d.setDate(d.getDate());
            datas = dateFormat(d);
            start.max = datas;
        }
    };

    var fields = [{
        field: 'applyUser',
        title: '申请人',
        readonly: true,
        formatter: function(v, data) {
            return data.user.mobile
        }
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        formatter: dateTimeFormat,
        readonly: true
    }, {
        field: 'authArg1',
        title: '学信网图片',
        type: "img",
        readonly: true
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'auth_status',
        formatter: Dict.getNameForList('auth_status'),
        readonly: true
    }, {
        title: "毕业时间",
        field: "gradDatetime",
        type: "date",
        dateOption: start,
        readonly: false,
        // min: new Date()
    }, {
        title: "备注",
        field: "remark",
        maxlength: 255,
        readonly: false
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '805216',
        view: true
    }

    options.buttons = [{
        title: "审核通过",
        handler: function() {
            var data = $('#jsForm').serializeObject();
            data.approveResult = "1";
            data.approveUser = getUserName();
            data.code = code;
            if (data.gradDatetime == "-") {
                toastr.warning("毕业时间必填");
                return "";
            } else {
                reqApi({
                    code: "805211",
                    json: data
                }).then(function(data) {
                    sucDetail();
                })
            }
        },
    }, {
        title: "审核不通过",
        handler: function() {
            var data = $('#jsForm').serializeObject();
            data.approveResult = "0";
            data.approveUser = getUserName();
            data.code = code;
            reqApi({
                code: "805211",
                json: data
            }).then(function(data) {
                sucDetail();
            })
        },
    }, {
        title: "返回",
        handler: function() {
            goBack();
        },
    }]
    buildDetail(options);
});