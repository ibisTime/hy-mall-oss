$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'loginName',
        title: '登录账号',
        search: true
    }, {
        field: 'realName',
        title: '自提点名称',
        search: true
    }, {
        field: 'province',
        title: '所在地区',
        formatter: function(v, r) {
            var res = $.unique([r.province, r.city, r.area]).reverse();
            return res.join(' / ');
        }
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'user_status',
        formatter: Dict.getNameForList('user_status'),
        search: true
    }, {
        field: 'createDatetime',
        title: '注册时间',
        formatter: dateTimeFormat,
        field1: 'dateStart',
        title1: '注册时间',
        type1: 'date',
        field2: 'dateEnd',
        type2: 'date',
        search: true,
    }];
    buildList({
        columns: columns,
        pageCode: '805120',
        searchParams: {
            kind: 'PA',
            companyCode: OSS.company
        },
        uid: ['userId'],
        beforeEdit: function(d) {
            location.href = 'partner_addedit.html?userId=' + d.userId + "&e=1";
        }
    });

    $('#lockBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        confirm("确认执行该操作？").then(function() {
            reqApi({
                code: '805091',
                json: {
                    userId: selRecords[0].userId,
                    toStatus: selRecords[0].status != '0' ? '0' : '2'
                }
            }).then(function() {
                sucList();
            });
        });
    });


    $('#bankCardBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "bankCard.html?h=1&userId=" + selRecords[0].userId;
    });

    $('#editPwdBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = 'partnerPwd_addedit.html?userId=' + selRecords[0].userId;
    });
});