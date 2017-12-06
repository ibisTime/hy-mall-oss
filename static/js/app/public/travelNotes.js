$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'description',
        title: '描述',
        search: true,
        formatter: function(v, data){
        	var description = v;
        	if(description.length>50){
				description = description.substring(0,50)+"...";
        	}
        	return description;
        }
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: "travel_status",
        formatter: Dict.getNameForList("travel_status"),
        search: true
    }, {
        field: 'publishDatetime',
        title: '发布时间',
        formatter: dateTimeFormat
    }, {
        field: 'updateDatetime',
        title: '更新时间',
        formatter: dateTimeFormat
    }, {
        field: 'remark',
        title: '备注',
    }];
    buildList({
        columns: columns,
        pageCode: "801055",
        searchParams: {
            companyCode: OSS.company,
        },
        //审核
        beforeEdit: function(data) {
            if (data.status == "0") {
                window.location.href = './travelNotes_addedit.html?code=' + data.code;
            } else {
                toastr.warning("不是待审核的状态")
            }

        },
        //详情
        beforeDetail: function(data) {
            window.location.href = './travelNotes_addedit.html?code=' + data.code+"&v=1";
        }
    });

})
