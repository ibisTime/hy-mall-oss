$(function() {

    var code = getQueryString('code');

    var fields = [{
        field: 'code1',
        title: '编号',
        formatter: function(v, data) {
            return data.code;
        },
        readonly: true,
    }, {
        field: 'orderCode',
        title: '产品订单编号',
        readonly: true,
    }, {
        title: '下单人',
        field: 'mobile',
        readonly: true,
        formatter: function(v, data) {
            return data.user.mobile;
        }
    }, {
        title: '产品名称',
        field: 'productName',
        formatter: function(v, data) {
            return data.product.name;
        }
    }, {
        title: '产品规格名称',
        field: 'productSpecsName',
    }, {
        title: '数量',
        field: 'quantity',
    }, {
        title: '价格',
        field: 'price2',
        formatter: moneyFormat
    }, {
        field: 'status',
        title: '订单状态',
        type: "select",
        key: "product_order_status",
        formatter: Dict.getNameForList("product_order_status"),
    }, {
        title: '退款数量',
        field: 'returnQuantity',
    }, {
        title: '退款金额',
        field: 'returnAmount2',
        formatter: moneyFormat
    }, {
        field: 'returnReason',
        title: '退款原因',
        type: "select",
        key: "return_reason",
        formatter: Dict.getNameForList("return_reason"),
    }, {
        field: 'returnDatetime',
        title: '退款申请时间',
        formatter: dateTimeFormat,
    }, {
        field: 'approveUser',
        title: '审核人'
    }, {
        field: 'approveDatetime',
        title: '审核时间',
        formatter: dateTimeFormat,
    }, {
        field: 'approveNote',
        title: '审核说明'
    }, {
        field: 'sendDatetime',
        title: '发货时间',
        formatter: dateTimeFormat,
    }, {
        title: '物流公司',
        field: 'logisticsCompany',
        type: 'select',
        key: 'kd_company',
        readonly: true,
    }, {
        title: '物流单号',
        field: 'logisticsCode',
        readonly: true,
        formatter: function(v, data) {
            if (v) {
                return v
            } else {
                $("#logisticsCompany").parent().hide();
                $("#logisticsCode").parent().hide();
                $("#deliverer").parent().hide();
                $("#deliveryDatetime").parent().hide();
                $("#pdf").parent().hide();
            }
        }
    }, {
        title: '物流单',
        field: 'logisticsPdf',
        type: 'img'
    }, {
        field: 'handleUser',
        title: '处理人'
    }, {
        field: 'handleDatetime',
        title: '处理时间',
        formatter: dateTimeFormat,
    }, {
        field: 'remark',
        title: '备注',
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '808086',
        view: true
    });

});