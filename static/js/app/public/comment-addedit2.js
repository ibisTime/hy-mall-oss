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
        title: '名称',
        field: 'entityName',
        readonly: true
    }, {
        title: "评论内容",
        field: "parentCommentContent",
        readonly: true,
        formatter: function(v, data){
        	return data.parentComment.content
        }
    }, {
        title: '评论人',
        field: 'parentCommentNickname',
        readonly: true,
        formatter: function(v, data){
        	return data.parentComment.nickname
        }
    }, {
        title: '评论时间',
        field: 'parentCommentCommentDatetime',
        readonly: true,
        formatter: function(v, data){
        	return dateTimeFormat(data.parentComment.commentDatetime)
        }
    }, {
        title: '状态',
        field: 'parentCommentStatus',
        readonly: true,
        formatter: function(v, data){
        	if(data.parentComment.status=="A"){
        		return '已发布'
        	}else if(data.parentComment.status=="B"){
        		return '审批通过'
        	}else if(data.parentComment.status=="C"){
        		return '审批不通过'
        	}else if(data.parentComment.status=="D"){
        		return '被过滤'
        	}
        }
    }, {
        title: "回复内容",
        field: "content",
        readonly: true
    }, {
        title: '回复人',
        field: 'nickname',
        readonly: true
    }, {
        title: '回复时间',
        field: 'commentDatetime',
        readonly: true,
        formatter: dateTimeFormat
    }, {
        title: '回复状态',
        field: 'status',
        readonly: true,
        type: 'select',
        data: {
            "A": "已发布",
            "B": "审批通过",
            "C": "审批不通过",
            "D": "被过滤"
        }
    }];
    if (view) {
        remarkNote = [];
        fields = fields.concat(checkList),
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
                    data.result = '1';
                    data.approver = getUserName();
                    data.code = code;
                    reqApi({
                        code: '801021',
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
                    data.result = '0';
                    data.approver = getUserName();
                    data.code = code;
                    reqApi({
                        code: '801021',
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
        detailCode: '801026',
    };
    buildDetail(options);
});