$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '针对内容',
        field: 'coachRealName',
    }, {
        field: 'content',
        title: '评论内容',
        search: true
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
        search: true,
        data: {
            "A": "已发布",
            "B": "审批通过",
            "C": "审批不通过"
        }
    }, {
        field: 'commerRealName',
        title: '评论人'
    }, {
        field: 'commentDatetime',
        title: '评论时间',
        formatter: dateTimeFormat
    }];
    buildList({
        router: 'comment',
        columns: columns,
        pageCode: "622145",
        searchParams: {
            companyCode: OSS.company,
            statusList: ["A", "B", "C"]
        }
    });
})