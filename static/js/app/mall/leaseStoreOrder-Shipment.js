$(function() {
    var code = getQueryString('code');

    var fields = [{
        field: 'code',
        title: '发货单号',
        type: "hidden",
        value: code,
        required: true,
    }, {
        field: 'code1',
        title: '订单编号',
        formatter: function(v, data) {
            return data.code;
        },
        readonly: true,
    }, {
        title: "商品类型",
        field: "productType",
        formatter: function(v, data) {
            if (data.productType == "J04") {
                return "积分"
            } else {
                return "普通"
            }
        },
        readonly: true,
    }, {
        title: "商品名称",
        field: "productName",
        readonly: true,
    }, {
        title: "商品价格",
        field: "price1",
        formatter: function(v, data) {
            if (v) {
                return moneyFormat(v) + "人民币"
            } else if (data.price2) {
                return moneyFormat(data.price2) + "积分"
            }
        },
        readonly: true,
    }, {
        title: "数量",
        field: "quantity",
        readonly: true,
    }, {
        field: 'bookDatetime',
        title: '预定时间',
        formatter: function(v, data) {
            var date = new Date(v);
            var str = date.format('yyyy-MM-dd') + "至";
            date.setDate(date.getDate() + (data.rentDay - 1));
            return str + date.format('yyyy-MM-dd');
        },
        readonly: true
    }, {
        title: '下单人',
        field: 'applyUser',
        readonly: true,
        formatter: function(v, data) {
            return data.user.mobile;
        }
    }, {
        title: "下单说明",
        field: "applyNote",
        readonly: true
    }, {
        title: "附件",
        type: "img",
        field:"takePdf"
    }, {
        field: 'remark',
        title: '备注',
        maxlength: 255
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '810056'
    });

    $("#subBtn").off("click").click(function() {
        if ($('#jsForm').valid()) {
            var data = $('#jsForm').serializeObject();
            $('#jsForm').find('.btn-file [type=file]').parent().next().each(function(i, el) {
                var values = [];
                var imgs = $(el).find('.img-ctn');
                imgs.each(function(index, img) {
                    values.push($(img).attr('data-src') || $(img).find('img').attr('src'));
                });

                data[el.id] = values.join('||');
            });
            for (var i = 0, len = fields.length; i < len; i++) {
                var item = fields[i];
                if (item.equal && (!$('#' + item.field).is(':hidden') || !$('#' + item.field + 'Img').is(':hidden'))) {
                    data[item.equal] = $('#' + item.field).val() || $('#' + item.field).attr('src');
                } else if (item.emptyValue && !data[item.field]) {
                    data[item.field] = item.emptyValue;
                } else if (item.readonly && item.pass) {
                    data[item.field] = $('#' + item.field).attr('data-value') || $('#' + item.field).html();
                }
                if (item.type == 'select' && item.passValue) {
                    data[item.field] = $('#' + item.field).find('option:selected').html();
                }

                if (item.type == "checkbox") {
                    data[item.field] = $.isArray(data[item.field]) ? data[item.field].join(",") : data[item.field];
                }
            }
            data.code = code;
            reqApi({
                code: '810046',
                json: data
            }).then(function() {
                sucDetail();
            });
        }
    })

});