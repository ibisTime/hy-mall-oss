$(function() {

    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var category = getQueryString('category');
    if(category == OSS.JFProductCategory){
    	category = true
    } else {
    	category = false
    }

    var typeData = {}
    reqApi({
        code: '808007'
    }).done(function(d) {
        d.forEach(function(v, i) {
            typeData[v.code] = v.name;
        })
    });

    var fields = [{
        field: 'kind',
        type: 'hidden',
        value: '1'
    }, {
        field: 'category',
        title: '大类',
        type: 'select',
        data: typeData,
        readonly: view
    }, {
        title: "小类",
        field: "type",
        data: typeData,
        type: "select",
        readonly: view
    }, {
        field: 'name',
        title: '商品名称',
        required: true,
        readonly: view
    }, {
        field: 'slogan',
        title: '广告语',
        required: true,
        readonly: view
    }, {
        field: 'advPic',
        title: '广告图',
        type: 'img',
        required: true,
        readonly: view
    }, {
        field: 'pic',
        title: '展示图',
        type: 'img',
        required: true,
        readonly: view
    }, {
        field: 'description',
        title: '图文描述',
        type: 'textarea',
        readonly: view
    }, {
        field: 'specsName1',
        title: '规格名称1',
    }, {
        field: 'specsName2',
        title: '规格名称2',
    }, {
        field: 'productSpecsList',
        title: '商品规格:',
        type: 'o2m',
        columns: [{
            field: 'specsVal1',
            title: '规格名称1',
        }, {
            field: 'specsVal2',
            title: '规格名称2',
        }, {
            title: "图片",
            field: "pic11",
            formatter: function(v, data) {
                return data.pic && '<img  style="width:40px;height:40px" src="' + OSS.picBaseUrl + '/' + data.pic + '" >' || "-"
            }
        }, {
            field: 'originalPrice',
            title: '原价/市场价',
            amount: true,
            formatter: moneyFormat,
        }, {
            field: 'price1',
            title: '人民币价',
            amount: true,
            formatter: function(v, data) {
                if (v) {
                    return moneyFormat(v)
                } else {
                    return "0"
                }
            }

        }, {
            field: 'price2',
            title: '积分价',
            formatter: function(v, data) {
                if (v) {
                    return moneyFormat(v)
                } else {
                    return "0"
                }
            }
        }, {
            field: 'quantity',
            title: '库存',
        }, {
            field: 'province',
            title: '产地',
        }, {
            field: 'weight',
            title: '重量（kg）',
        }, {
            field: 'orderNo',
            title: '序号',
        }]
    }, {
        field: 'remark',
        title: '备注',
        readonly: view
    }];
    var viewList = [{
        field: 'location',
        title: '位置',
        type: 'select',
        key: "product_location",
        formatter: Dict.getNameForList("product_location"),
    }, {
        field: 'orderNo',
        title: 'UI次序',
        number: true,
        readonly: true
    }, {
        field: 'leaderBackRate',
        title: '领队返点比例',
        required: true,
        hidden: category,
        value: category ? 0 : ''
    }, {
        field: 'oneBackRate',
        title: '一级返点比例',
        required: true,
        hidden: category,
        value: category ? 0 : ''
    }, {
        field: 'twoBackRate',
        title: '二级返点比例',
        required: true,
        hidden: category,
        value: category ? 0 : ''
    }, {
        field: 'boughtCount',
        title: '销售量'
    }]
    if (view) {
        fields = fields.concat(viewList)
    }

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '808026',
    });

});