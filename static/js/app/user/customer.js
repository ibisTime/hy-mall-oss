$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'nickname',
        title: '昵称',
        search: true
    }, {
        field: 'mobile',
        title: '手机号',
        search: true
    }, {
        field: 'realName',
        title: '姓名',
        search: true
    }, {
        field: 'idNo',
        title: '证件号码',
        search: true
    }, {
        title: "推荐人",
        field: "tj",
        formatter: function(v, data) {
            if (data.refereeUser) {
                return data.refereeUser.mobile;
            } else {
                return "-"
            }
        }
    }, {
        title: "推荐人",
        field: "userReferee",
        type: "select",
        pageCode: "805120",
        params: {
            kind: 'C',
            updater: ""
        },
        keyName: "userId",
        valueName: '{{nickname.DATA}}-{{mobile.DATA}}',
        searchName: 'keywords',
        search: true,
        visible: false
    }, {
        field: 'isLeader',
        title: '是否是领队',
        type: 'select',
        data:{
        	'0': '否',
        	'1': '是'
        },
        search: true
    }, {
        field: 'hasMobile',
        title: '是否绑定手机',
        type: 'select',
        data:{
        	'0': '否',
        	'1': '是'
        },
        search: true,
        visible: false
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'user_status',
        formatter: Dict.getNameForList('user_status'),
        search: true
    }, {
        field: 'saleStatus',
        title: '推客状态',
        type: 'select',
        key: 'sale_status',
        formatter: Dict.getNameForList('sale_status'),
        search: true
    }, {
    	field: 'saleLeaderReferee',
        title: '所属领队',
        type:'select',
        pageCode: '805120',
        params: {
            kind: 'C',
            updater: '',
            companyCode: OSS.company
        },
        keyName: 'userId',
        valueName: '{{nickname.DATA}}-{{mobile.DATA}}',
        searchName: 'keywords',
        search: true,
        formatter: function(v, data) {
            return data.saleLeaderRefereeMobile;
        },
    }, {
        field: 'createDatetime',
        title: '注册时间',
        formatter: dateTimeFormat,
        field1: 'createDatetimeStart',
        title1: '注册时间',
        type1: 'date',
        field2: 'createDatetimeEnd',
        type2: 'date',
        twoDate: true,
        search: true,
    }];
    buildList({
        router: 'customer',
        columns: columns,
        pageCode: '805120',
        searchParams: {
            kind: 'C',
            companyCode: OSS.company
        },
        beforeDetail: function(data) {
            window.location.href = "customer_addedit.html?v=1&userId=" + data.userId;
        }
    });
    //激活
    $('#activeBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 0) {
            toastr.info("已激活");
            return;
        }
        confirm("确定激活？").then(function() {
            reqApi({
                code: '805091',
                json: {
                    userId: selRecords[0].userId,
                    toStatus: '0',
                    remark: selRecords[0].remark
                }
            }).then(function() {
                sucList();
            });

        }, function() {})
    });

    //注销
    $('#rockBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].saleStatus == 1) {
            toastr.info("已注销");
            return;
        }

        confirm("确定注销？").then(function() {
            reqApi({
                code: '805091',
                json: {
                    userId: selRecords[0].userId,
                    toStatus: '2',
                    remark: selRecords[0].remark
                }
            }).then(function() {
                sucList();
            });

        }, function() {})
    });
    //账户
    $('#accountBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "customer_account.html?&c=1&userId=" + selRecords[0].userId;
    });

    //查看推荐关系
    $('#userRefereeBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "customer_userReferee.html?userId=" + selRecords[0].userId + "&mobile=" + selRecords[0].mobile;
    });


    //修改实名认证
    $('#identityBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "bizman_identity.html?userId=" + selRecords[0].userId;
    });
    
    
    //推客身份启用/停用
    $('#saleUpDownBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
		
		var msg = ''
        if (selRecords[0].saleStatus == 1) {
            msg = '是否停用推客身份?'
        }else if(selRecords[0].saleStatus == 2){
            msg = '是否启用推客身份?'
        }else {
            toastr.info("该用户未申请推客，不可操作！");
            return;
        }

        confirm(msg).then(function() {
            reqApi({
                code: '805096',
                json: {
                    userId: selRecords[0].userId
                }
            }).then(function() {
                sucList();
            });

        }, function() {})
    });
});