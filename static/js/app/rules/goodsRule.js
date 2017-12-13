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
        pageCode: '808915',
        searchParams: {
        	type:'mall,O',
            companyCode: OSS.company
        },
    });
});