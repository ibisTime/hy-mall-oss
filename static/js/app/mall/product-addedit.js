$(function() {

    var code = getQueryString('code');
    var category = getQueryString('category')
    var view = getQueryString('v');
    var pcode;
    var codeInd = 0;
    var paramIndex = 0;

    var typeData = {};
    var productSpecsFields1 = [];
    var productSpecsFields2 = [];
    var fields = [];


    //商品类别
    //积分商品修改
    if (category == OSS.JFProductCategory) {
        typeData[OSS.JFProductCategory] = '积分商品';
        setFields();
    } else {
        reqApi({
            code: '808007',
            json: {
                type: 1,
                status: '1',
                parentCode: 0,
            },
            sync: true
        }).done(function(data) {
            data.forEach(function(d, i) {
                if (code) {
                    //修改页类别
                    if (d.code != OSS.JFProductCategory) {
                        typeData[d.code] = d.name
                    }
                } else {
                    typeData[d.code] = d.name
                }
            })

            setFields();
        })
    }


    function setFields() {
        //规格1
        productSpecsFields1 = [{
            field: 'specsVal1',
            title: '规格名称1',
            required: true,
        }, {
            field: 'specsVal2',
            title: '规格名称2',
            type: "hidden",
        }, {
            title: "图片",
            field: "pic11",
            required: true,
            type: "img",
            single: true,
            _keys: ['pic']
        }, {
            field: 'originalPrice',
            title: '原价/市场价',
            required: true,
            amount: true,
            formatter: moneyFormat,
        }, category == OSS.JFProductCategory ? {
            field: 'price2',
            title: '价格',
            amount: true,
            formatter: moneyFormat,
            required: true,
        } : {
            field: 'price1',
            title: '价格',
            amount: true,
            formatter: moneyFormat,
            required: true,
        }, {
            field: 'quantity',
            title: '库存',
            required: true,
            number: true
        }, {
            field: 'province',
            title: '产地',
            required: true,
            maxlength: 255
        }, {
            field: 'weight',
            title: '重量（kg）',
            required: true,
            number: true
        }, {
            field: 'orderNo',
            title: '序号',
            required: true,
            number: true
        }]
        
        //规格1，规格2
        productSpecsFields2 = [{
            field: 'specsVal1',
            title: '规格名称1'+$("#specsName1").val(),
            required: true,
        }, {
            field: 'specsVal2',
            title: '规格名称2'+$("#specsName2").val(),
            required: true,
        }, {
            title: "图片",
            field: "pic11",
            required: true,
            type: "img",
            single: true,
            _keys: ['pic']
        }, {
            field: 'originalPrice',
            title: '原价/市场价',
            required: true,
            amount: true,
            formatter: moneyFormat,
        }, category == OSS.JFProductCategory ? {
            field: 'price2',
            title: '价格',
            amount: true,
            formatter: moneyFormat,
            required: true,
        } : {
            field: 'price1',
            title: '价格',
            amount: true,
            formatter: moneyFormat,
            required: true,
        }, {
            field: 'quantity',
            title: '库存',
            required: true,
            number: true
        }, {
            field: 'province',
            title: '产地',
            required: true,
            maxlength: 255
        }, {
            field: 'weight',
            title: '重量（kg）',
            required: true,
            number: true
        }, {
            field: 'orderNo',
            title: '序号',
            required: true,
            number: true
        }]


        //商品详情
        fields = [{
            field: 'kind',
            type: 'hidden',
            value: '1'
        }, {
            field: 'category',
            title: '大类',
            type: 'select',
            data: typeData,
            required: true,
            onChange: function(v, data) {
                $("#type").renderDropdown({
                    listCode: '808007',
                    params: {
                        type: "1",
                        parentCode: v,
                        status: "1"
                    },
                    keyName: 'code',
                    valueName: 'name',
                    searchName: 'name'
                })
            },
        }, {
            title: "小类",
            field: "type",
            type: "select",
            required: true,
        }, {
            field: 'name',
            title: '商品名称',
            required: true,
            maxlength: 50
        }, {
            field: 'slogan',
            title: '广告语',
            required: true,
            maxlength: 250,
        }, {
            field: 'advPic',
            title: '广告图',
            type: 'img',
            single: true,
            required: true
        }, {
            field: 'pic',
            title: '展示图',
            type: 'img',
            required: true
        }, {
            title: '商品详述',
            field: 'description',
            type: 'textarea',
            required: true,
        }, {
            field: 'specsName1',
            title: '规格名称1',
            required: true,
        }, {
            field: 'specsName2',
            title: '规格名称2',
        }, {
            field: 'remark',
            title: '备注',
        }];

        buildDetail({
            fields: fields,
            code: code,
            detailCode: '808026',
            addCode: '808010',
            editCode: '808012',
            buttons: {},
        });

        $('#tableList').bootstrapTable({
            columns: [{
                field: '',
                title: '',
                checkbox: true
            }, {
	            field: 'specsVal1',
	            title: '规格名称1',
	        }, {
	            field: 'specsVal2',
	            title: '规格名称2',
	        }, {
                title: "图片",
                field: "pic11",
                formatter: function(v, data) {
                    return data.pic && '<img  style="width:40px;height:40px" src="' + OSS.picBaseUrl + '/' + data.pic + '" >' || "-"
                }
            }, {
                field: 'originalPrice',
                title: '原价/市场价',
                amount: true,
                formatter: moneyFormat,
            }, category == OSS.JFProductCategory ? {
                field: 'price2',
                title: '价格',
                formatter: moneyFormat,
            } : {
                field: 'price1',
                title: '价格',
                formatter: moneyFormat,
            }, {
                field: 'quantity',
                title: '库存',
            }, {
                field: 'province',
                title: '产地',
            }, {
                field: 'weight',
                title: '重量（kg）',
            }, {
                field: 'orderNo',
                title: '序号',
            }],
            singleSelect: true, //禁止多选
            clickToSelect: true, //自动选中
            uniqueId: 'id',
            onClickRow: function(row, $element) {
                paramIndex = $element.data('index')
            }
        });
    }

    if (code) {
        reqApi({ code: '808026', json: { code: code } }).done(function(d) {
            pcode = d.code
            $('#tableList').bootstrapTable('prepend', d.productSpecsList)
        })

    }

    //添加
    $("#addBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        var productData = $('#jsForm').serializeObject();
        
        if($('#jsForm').valid()){
        	var dw = dialog({
	            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
	                '<ul class="form-info" id="formContainer"></ul>' +
	                '</form>'
	        });
	
	        dw.showModal();
	        buildDetail({
	            fields: $("#specsName2").val()?productSpecsFields2:productSpecsFields1,
	            container: $('#formContainer'),
	            buttons: [{
	                title: '保存',
	                handler: function() {
	                    if ($('#popForm').valid()) {
	                        var data = $('#popForm').serializeObject();
	                        $('#popForm').find('.btn-file [type=file]').parent().next().each(function(i, el) {
	                            var values = [];
	                            var imgs = $(el).find('.img-ctn');
	                            imgs.each(function(index, img) {
	                                values.push($(img).attr('data-src') || $(img).find('img').attr('data-src'));
	                            });
	                            data[el.id] = values.join('||');
	                        });
	                        if ($('#popForm').find('#province')[0]) {
	                            var province = $('#province').val();
	                            var city = $('#city').val();
	                            var area = $('#area').val();
	                            if (!city) {
	                                data['city'] = province;
	                                data['area'] = province;
	                            } else if (!area) {
	                                data['city'] = province;
	                                data['area'] = city;
	                            }
	                        }
	                        for (var i = 0, len = fields.length; i < len; i++) {
	                            var item = fields[i];
	                            if (item.equal && (!$('#' + item.field).is(':hidden') || !$('#' + item.field + 'Img').is(':hidden'))) {
	                                data[item.equal] = $('#' + item.field).val() || $('#' + item.field).attr('src');
	                            } else if (item.emptyValue && !data[item.field]) {
	                                data[item.field] = item.emptyValue;
	                            } else if (item.readonly && item.pass) {
	                                data[item.field] = $('#' + item.field).attr('data-value') || $('#' + item.field).html();
	                            }
	                            if (item.type == 'select' && item.passValue) {
	                                data[item.field] = $('#' + item.field).find('option:selected').html();
	                            }
	                        }
	                        data.pic = data.pic11;
	                        delete data.pic11;
	                        data.code = codeInd++;
	                        $('#tableList').bootstrapTable('insertRow', {
	                            index: data.code,
	                            row: data
	                        });
	                        toastr.info("添加成功");
	                        dw.close().remove();
	                    }
	                }
	            }, {
	                title: '取消',
	                handler: function() {
	                    dw.close().remove();
	                }
	            }]
	        });
	        $("#pic11").css("margin-left", "100px");
	        dw.__center();
        }else{
            toastr.info("请先填写商品信息");
        }
        
    })

    //删除
    $("#deleteBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length != 1) {
            toastr.info("请选择记录");
            return;
        }
        $('#tableList').bootstrapTable('remove', {
            field: "code",
            values: [selRecords[0].code]
        });
        toastr.info("删除成功");
    })

    //修改
    $("#edit2Btn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');

        if (selRecords.length != 1) {
            toastr.info("请选择记录");
            return;
        }

        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"></ul>' +
                '</form>'
        });

        buildDetail({
            fields: $("#specsName2").val()?productSpecsFields2:productSpecsFields1,
            container: $('#formContainer'),
            buttons: [{
                title: '保存',
                handler: function() {

                    if ($('#popForm').valid()) {
                        var data = $('#popForm').serializeObject();
                        $('#popForm').find('.btn-file [type=file]').parent().next().each(function(i, el) {
                            var values = [];
                            var imgs = $(el).find('.img-ctn');
                            imgs.each(function(index, img) {
                                values.push($(img).attr('data-src') || $(img).find('img').attr('data-src'));
                            });
                            data[el.id] = values.join('||');
                        });

                        for (var i = 0, len = fields.length; i < len; i++) {
                            var item = fields[i];
                            if (item.equal && (!$('#' + item.field).is(':hidden') || !$('#' + item.field + 'Img').is(':hidden'))) {
                                data[item.equal] = $('#' + item.field).val() || $('#' + item.field).attr('src');
                            } else if (item.emptyValue && !data[item.field]) {
                                data[item.field] = item.emptyValue;
                            } else if (item.readonly && item.pass) {
                                data[item.field] = $('#' + item.field).attr('data-value') || $('#' + item.field).html();
                            }
                            if (item.type == 'select' && item.passValue) {
                                data[item.field] = $('#' + item.field).find('option:selected').html();
                            }
                        }
                        data.pic = data.pic11;
                        delete data.pic11;
                        $('#tableList').bootstrapTable('updateRow', {
                            index: paramIndex,
                            row: data
                        })

                        toastr.info("修改成功");
                        $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });

                        dw.close().remove();
                    }
                }
            }, {
                title: '取消',
                handler: function() {
                    dw.close().remove();
                }
            }]
        });

        $('#popForm #specsVal1').val(selRecords[0].specsVal1);
        $('#popForm #specsVal2').val(selRecords[0].specsVal2);
        $('#popForm #originalPrice').val(moneyFormat(selRecords[0].originalPrice));
        $('#popForm #price1').val(moneyFormat(selRecords[0].price1));
        $('#popForm #price2').val(moneyFormat(selRecords[0].price2));
        $('#popForm #quantity').val(selRecords[0].quantity);
        $('#popForm #province').val(selRecords[0].province);
        $('#popForm #weight').val(selRecords[0].weight);
        $('#popForm #orderNo').val(selRecords[0].orderNo);
        $('#popForm #pic11').val(selRecords[0].pic);
        var sp = selRecords[0].pic.split('||') || [];
        var imgsHtml = '';
        sp.length && sp.forEach(function(item) {
            var suffix = item.slice(item.lastIndexOf('.') + 1);
            var src = (item.indexOf('http://') > -1 ? item : (OSS.picBaseUrl + '/' + item));
            var src1 = (item.indexOf('http://') > -1 ?
                item.substring(item.lastIndexOf("/") + 1) :
                item);
            var name = src1.substring(0, src1.lastIndexOf("_")) + "." + suffix;
            imgsHtml += '<div class="img-ctn"  data-src="' + src1 + '" style="display: inline-block;position: relative;">' + '<div class="center-img-wrap"  >' + '<img src="' + src + OSS.picShow + '" class="center-img" />' + '<i class="zmdi zmdi-close-circle-o zmdi-hc-fw"></i>' + '<i class="zmdi zmdi-download zmdi-hc-fw"></i>' + '</div>' + '<div class="t_3dot w100p" title="' + name + '">' + name + '</div>' + '</div>';
        });
        $('#pic11').html(imgsHtml);
        setImgDisabled($('#pic11'));
        $('#pic11').find('.zmdi-close-circle-o').on('click', function(e) {
            var el = $(this).parent().parent(),
                el_parent = el.parent();
            el.remove();
            el_parent[0].cfg.single && setImgDisabled(el_parent);
        });
        $('#pic11').find('.zmdi-download').on('click', function(e) {
            var dSrc = OSS.picBaseUrl + '/' + $(this).parents("[data-src]").attr('data-src');
            window.open(dSrc, '_blank');
        });
        $("#pic11").css("margin-left", "100px");
        dw.showModal();
        dw.__center();
    })


    $('#sub1Btn').off("click").click(function() {

        if ($('#jsForm').valid()) {
            var data = $('#jsForm').serializeObject();
            $('#jsForm').find('.btn-file [type=file]').parent().next().each(function(i, el) {
                var values = [];
                var imgs = $(el).find('.img-ctn');
                imgs.each(function(index, img) {
                    values.push($(img).attr('data-src') || $(img).find('img').attr('data-src'));
                });
                data[el.id] = values.join('||');
            });
            for (var i = 0, len = fields.length; i < len; i++) {
                var item = fields[i];
                if (item.equal && (!$('#' + item.field).is(':hidden') || !$('#' + item.field + 'Img').is(':hidden'))) {
                    data[item.equal] = $('#' + item.field).val() || $('#' + item.field).attr('src');
                } else if (item.emptyValue && !data[item.field]) {
                    data[item.field] = item.emptyValue;
                } else if (item.readonly && item.pass) {
                    data[item.field] = $('#' + item.field).attr('data-value') || $('#' + item.field).html();
                }
                if (item.type == 'select' && item.passValue) {
                    data[item.field] = $('#' + item.field).find('option:selected').html();
                }
            }
            data['id'] = data['code'];
            data.productSpecsList = $('#tableList').bootstrapTable("getData", { useCurrentPage: true });
			
			data.productSpecsList.each(function(v, i) {
            	if(data.specsName2==""&&!data.specsName2){
            		delete data.productSpecsList[i].specsVal2;
            	}
            	if (!code &&data.category == 'J01') {
            		data.productSpecsList[i].price2 = data.productSpecsList[i].price1;
                    data.productSpecsList[i].price1 = 0;
            	}
            })

            reqApi({
                code: code ? '808012' : '808010',
                json: data
            }).done(function(data) {
                sucDetail();
            });

        }
    });

    $('#back1Btn').off("click").click(function() {
        goBack();
    });

});