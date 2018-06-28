$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'remark',
        title: '规则名称'
    }, {
        field: 'ckey',
        title: '参数名',
        search: true
    }, {
        field: 'cvalue',
        title: '参数值'
    }];
    buildList({
        columns: columns,
        pageCode: '801915',
        searchParams: {
        	type:'travels',
            companyCode: OSS.company
        },
        beforeEdit: function(r) {
            location.href = 'travelsRule_addedit.html?code=' + r.id + "&t=" + r.type;
        }
    });
});