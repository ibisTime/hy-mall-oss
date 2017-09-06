$(function() {


    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '针对内容',
        field: 'entityName'
    }, {
        field: 'content',
        title: '评论内容',
        search: true
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
                window.location.href = 'comment_addedit.html?code=' + data.code;
            } else {
                toastr.warning("不是待审核的状态")
            }

        }
    });

})