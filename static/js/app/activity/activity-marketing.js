$(function() {

    var code = getQueryString('code');
    var view = !!getQueryString('v');

    var fields = [{
        field: 'cornerPic',
        title: '角标图片',
        type: "img",
		single: true
    }, {
        field: 'platformAdv',
        title: '广告',
        type: 'textarea',
    }];

    buildDetail({
        fields: fields,
        code: code,
        editCode:'808710',
        detailCode: '808706',
        view: view,
        beforeSubmit: function(data){
        	data.code = code;
        	return data;
        }
    });
    

});