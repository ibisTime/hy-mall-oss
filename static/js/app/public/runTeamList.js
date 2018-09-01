$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'dvalue',
        title: '名称',
    }, {
        field: 'remark',
        title: '备注',
    }];
    
    
    buildList({
        columns: columns,
        pageCode: '801905',
        deleteCode: '801901',
        searchParams: {
            parentKey: 'run_team_list'
        },
    });
    
});