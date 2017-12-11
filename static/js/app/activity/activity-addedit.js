$(function() {

    var code = getQueryString('code');
    var view = !!getQueryString('v');

    var fields = [{
        field: 'name',
        title: '活动名称'
    }, {
        field: 'type',
        title: '类型',
        type: 'select',
        key: 'act_type',
        formatter: Dict.getNameForList('act_type'),
        search: true
    }, {
        field: 'slogan',
        title: '广告语'
    }, {
        field: 'startDatetime',
        title: '开始时间',
        formatter: dateTimeFormat,
    },{
        field: 'endDatetime',
        title: '结束时间',
        formatter: dateTimeFormat,
    },{
        field: 'enrollEndDatetime',
        title: '报名截止时间',
        formatter: dateTimeFormat,
    },{
        field: 'placeDest',
        title: '目的地'
    }, {
        field: 'placeAsse',
        title: '集合地'
    }, {
        field: 'groupNum',
        title: '最少成行人数'
    }, {
        field: 'amount',
        title: '收费金额',
        formatter: moneyFormat,
    }, {
        field: 'advPic',
        title: '广告图',
        type: "img",
		single: true,
        required: true,
    }, {
        field: 'pic',
        title: '缩略图',
        type: "img",
        required: true,
    }, {
        field: 'indexQd',
        title: '强度系数',
        formatter: function(v, data){
        	var start = ''
        	for (var i=1; i<=v; i++) {
        		start+='<i class="star"></i>'
        	}
        	return '<p class="starWrap" id="indexQd">'+start+'</p>';
        }
    }, {
        field: 'indexNd',
        title: '难度系数',
        formatter: function(v, data){
        	var start = ''
        	for (var i=1; i<=v; i++) {
        		start+='<i class="star"></i>'
        	}
        	return '<p class="starWrap" id="indexQd">'+start+'</p>';
        }
    }, {
        field: 'indexFj',
        title: '风险系数',
        formatter: function(v, data){
        	var start = ''
        	for (var i=1; i<=v; i++) {
        		start+='<i class="star"></i>'
        	}
        	return '<p class="starWrap" id="indexQd">'+start+'</p>';
        }
    }, {
        field: 'description',
        title: '活动介绍',
        type: 'textarea',
        normalArea: true
    }, {
        field: 'placeDesc',
        title: '地方介绍',
        type: 'textarea',
        normalArea: true
    }, {
        field: 'amountDesc',
        title: '费用介绍',
        type: 'textarea',
        normalArea: true
    }, {
        field: 'scheduling',
        title: '具体行程',
        type: 'textarea',
        normalArea: true
    }, {
        field: 'equipment',
        title: '装备建议',
        type: 'textarea',
        normalArea: true
    }, {
        field: 'userId',
        title: '领队',
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'act_status',
        formatter: Dict.getNameForList('act_status'),
        search: true
    }, {
        field: 'updateDatetime',
        title: '更新时间',
        formatter: dateTimeFormat,
    },{
        field: 'remark',
        title: '备注'
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '808706',
        view: true
    });

});