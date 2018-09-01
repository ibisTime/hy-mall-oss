$(function() {

    var code = getQueryString('code');
    var view = !!getQueryString('v');

    var fields = [{
        field: 'dvalue',
        title: '名称',
        required: true
    }, {
        field: 'remark',
        title: '备注',
    }];

    buildDetail({
        fields: fields,
        code: code,
        addCode:'801900',
        editCode:'801902',
        detailCode: '801906',
        view: view,
        beforeSubmit: function(data){
        	data.dkey = data.dvalue;
        	data.type = '1',
        	data.parentKey = 'run_team_list';
        	return data;
        }
    });

});