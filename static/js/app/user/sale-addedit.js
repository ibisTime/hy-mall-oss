$(function() {

    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var isCheck = !!getQueryString('isCheck');

    var fields = [{
        field: 'realName',
        title: '姓名'
    }, {
        field: 'mobile',
        title: '手机号'
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'sale_apply_status',
        formatter: Dict.getNameForList('sale_apply_status')
    }, {
        field: 'applyUserName',
        title: '申请人',
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        formatter: dateTimeFormat
    }, {
        field: 'remark',
        title: '审核说明',
        readonly: !isCheck,
    }];
    
    var buttons = [{
        title: '通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                data.approveResult = '1';
                data.code = code;
                reqApi({
                    code: '805251',
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
                data.approveResult = '0';
                data.code = code;
                reqApi({
                    code: '805251',
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
    
    if(!isCheck){
    	buttons = [];
    }
    
    buildDetail({
        fields: fields,
        code: code,
        detailCode: '805256',
        view: view,
        buttons: buttons
    });

});