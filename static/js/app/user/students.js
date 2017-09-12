$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'applyUser',
        title: '申请人',
        formatter: function(v, data) {
            return data.user.mobile
        }
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        formatter: dateTimeFormat,
        field1: 'dateStart',
        title1: '申请时间',
        type: 'date',
        field2: 'dateEnd',
        twoDate: true,
        search: true,
    }, {
        field: 'authArg1',
        title: '学信网图片',
        formatter: function(v, data) {
            return v && '<img  style="width:40px;height:40px" src="' + OSS.picBaseUrl + '/' + v + '" >' || "-"
        }
    }, {
        title: "毕业时间",
        field: "result"
    }, {
        title: "审核人",
        field: "approveUser",
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'auth_status',
        formatter: Dict.getNameForList('auth_status'),
        search: true
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({
        columns: columns,
        pageCode: '805215',
        searchParams: {
            type: "student",
            companyCode: OSS.company
        },
        beforeCheck: function(d) {
            if (d.status != "0") {
                toastr.warning("不是待审核的状态，不能审核");
                return "";
            }
            location.href = 'students_check.html?code=' + d.code;
        }
    });
});