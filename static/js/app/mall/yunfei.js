$(function() {
    var provinceData = {};
    $.get(__uri('../../lib/province_data.xml'), function(xml) {
        var docXml = xml;
        var $provinceXml = $(docXml).find("province");
        $provinceXml.each(function(i, d) {
            provinceData[$(d).attr("name")] = $(d).attr("name");
        });
        var columns = [{
            field: '',
            title: '',
            checkbox: true
        }, {
            title: '出发省份',
            field: 'startPoint',
        }, {
            field: 'endPoint',
            title: '目的省份',
            type: 'select',
            onlyProvince: true,
            data: provinceData,
            search: true
        }, {
            title: "首重价格（元）",
            field: "startPrice",
            amount: true,
            formatter: moneyFormat,
        }, {
            field: 'startWeight',
            title: '首重质量（kg）',
        }, {
            field: "addWeight",
            title: "递增重量(kg)",
            number: true,
        }, {
            field: "addPrice",
            title: "递增价格(元)",
            amount: true,
            formatter: moneyFormat
        }];

        buildList({
            columns: columns,
            pageCode: '801925',
            searchParams: {
                companyCode: OSS.company
            }
        });
    });
});