$(function() {


    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'type',
        title: '类型',
        type: 'select',
        key: 'comment_type',
        formatter: Dict.getNameForList('comment_type'),
        search: true
    }, {
        title: '名称',
        field: 'entityName',
        search: true
    }, {
        field: 'content',
        title: '评论内容'
    }, {
        title: "星级",
        field: "score",
        formatter: function(v, data) {
            if (v == 1) {
                return "1颗星"
            } else if (v == 2) {
                return "2颗星"
            } else if (v == 3) {
                return "3颗星"
            } else if (v == 4) {
                return "4颗星"
            } else if (v == 5) {
                return "5颗星"
            }
        },
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        data: {
            "D": "被过滤",
            "A": "已发布",
            "B": "审批通过",
            "C": "审批不通过",
        },
        search: true
            // key: 'comment_status'
    }, {
        field: 'nickname',
        title: '评论人'
    }, {
        field: 'commentDatetime',
        title: '评论时间',
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: "801025",
        deleteCode: "801022",
        searchParams: {
            companyCode: OSS.company,
            // status: "D"
        },
        //审核
        beforeEdit: function(data) {
            if (data.status == "D") {
            	if(data.entityCode==data.parentCode){
            		window.location.href = 'comment_addedit.html?code=' + data.code;
            	}else{
            		window.location.href = 'comment_addedit2.html?code=' + data.code;
            	}
                
            } else {
                toastr.warning("不是待审核的状态")
            }
        },
        beforeDetail: function(data){
        	if(data.entityCode==data.parentCode){
        		window.location.href = 'comment_addedit.html?v=1&code=' + data.code;
        	}else{
        		window.location.href = 'comment_addedit2.html?v=1&code=' + data.code;
        	}
        }
    });

})