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
        field: 'publishDatetime',
        title: '发布时间',
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
        deleteCode:'801051',
        //详情
        beforeDetail: function(data) {
            window.location.href = './travelNotes_addedit.html?code=' + data.code+"&v=1";
        }
    });

})
