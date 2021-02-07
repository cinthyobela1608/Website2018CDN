var resposeDataId = '#response_data';
var responseData = '';
var selectedDomainUrl = '';
var langId = null;
var domainId = null;
var start = false;
var end = false;
var selectedProducts = [];
/**
 * Setting doimain into global variable {domainId}
 * @returns {NULL}
 */
function setDomain()
{
    domainId = $('#domain_id').val();
}
/**
 * Setting language in global variable {langId}
 * @returns {NULL}
 */
function setLanguage()
{
    langId = $('#language_id').val();
}
/**
 * It will submit form by using its id
 * @param {String} formId
 * @returns {NULL}
 */
function formSubmit(formId)
{
    $('#' + formId).submit();
}

function doValidate(formId)
{
    $('#' + formId).validate({
        errorPlacement: function (error, el) {
            if ($(el).is('[data-control="material"]')) {
//            $(el).closest('.mtl').addClass("hasMessage onError");
                $(el).mtl({
                    message: {
                        type: "Error",
                        text: error.text()
                    }
                });
            }else if ($(el).is('[data-type="selector"]') || $(el).is('[data-selector]')) {

                $(error).insertAfter($(el).closest('.SumoSelect'));
            } else if (($(el).is('[type="checkbox"]') || $(el).is('[type="radio"]')) && $(el).is('.custom')) {
                $(error).insertAfter($(el).next('label'));
            } else {
                $(error).insertAfter(el);
            }
        }
    });
}

/**
 * 
 * @param {String} url
 * @returns {NULL}
 */
function redirect(url)
{
    if(url === 1){
        location.reload();
    }else{
        location.href = url;
    }
    
}


/**
 * generating doamin based langs json data
 * @param {Integer} domainId
 * @param {String} url
 * @returns {JSON}
 */
function getDomainBasedLang(domainId, url, selectedLang)
{
    selectedDomainUrl = $('#url_hidden_doamin_' + domainId).val();
    doPostAjax(url, {domain_id: domainId}, false);
    if (responseData) {
        $('#selected_domain_id').val(domainId);
        generateCombo(responseData, 'language_switch', selectedLang);
        $('#domainList li').each(function (i, el) {
            var domainListId = $(el).attr('data-domain-id');
            if (domainListId !== domainId) {
                $('#domainList' + domainListId).removeClass('active');
            } else {
                $('#domainList' + domainListId).addClass('active');
            }
        });

    }
}
/**
 * It will do ajax process
 * @param {String} url
 * @param {Object} data
 * @param {Boolean} async
 * @returns {JSON|String}
 */
function doPostAjax(url, data, async)
{
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        async: async,
        success: function (response) {
            responseData = response;
            if (responseData.message) {
                var data = {
                    timeout: 10000,
                    actionText: 'Ok',
                    message: responseData.message
                };
                $('#snackbarAlert').showSnackbar(data);
            }
        }
    });

}

/**
 * It will do ajax process
 * @param {String} url
 * @param {Object} data
 * @param {Boolean} async
 * @returns {JSON|String}
 */
function doPostAjaxForQuote(url, data, async)
{
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        async: async,
        success: function (response) {
            responseData = response;
        }
    });

}
/**
 * Building combobox
 * @param {Json} data
 * @param {String} elementId
 * @returns {null}
 */
function generateCombo(data, elementId, selectedLang)
{
    var html = "";
    var hiddens = '';
    var langDataUrl = $('#langDataUrl').val();
    $.each(data, function (idx, obj) {
        var checked = '';
        if (selectedLang == obj.value) {
            checked = 'checked';
        }

        //html += '<option value="' + obj.value + '" ' + selected + ' >' + obj.label + '</option>';
        html += '<input type="radio" name="language" id="lang' + obj.code + '" class="btn" value="' + obj.value + '" data-lang="lang' + obj.code + '" onclicke="changeLang(this.value, ' + langDataUrl + ')" ' + checked + ' />';
        html += '<label for="lang' + obj.code + '">' + obj.label + '</label>';
        hiddens += '<input type="hidden" id="url_lang_switch_' + obj.value + '" value="' + obj.url + '" />'
    });
    
    $('#lang_switch_hidden_div').html(hiddens);
    $('#' + elementId).html(html);
}

/**
 * It will redirect the page into selected language
 * @param {String} elementId
 * @returns {Null}
 */
function switchLang(elementId)
{
    var selected = '';
    $('#' + elementId + ' input[type="radio"]').each(function (i, el) {
        if ($(el).is(':checked')) {
            selected = $(el).val();
        }
    });
    console.log(selected);
    var url = $('#url_lang_switch_' + selected).val();
    location.href = url;
}

function changeLang(selected, url)
{
    var domainId = $('#selected_domain_id').val();
    getDomainBasedLang(domainId, url, selected);
}

function newslwtterSubscribe(url, formId, buttonId, loadClass)
{
    doPostWithValidate(url, formId, true, buttonId, loadClass);
}

function fnBtnOk() {
    $('.btn.subscribe').removeClass('curr-loading');
}


/**
 * Jquery ajax with form validation
 * @thirdparty Jquery.validate.js
 * @param {String} url
 * @param {String} fornId
 * @param {Boolean} reset
 * @returns {NULL}
 */
function  doPostWithValidate(url, fornId, reset, elemntId, loadClass) {
    $('#' + fornId).validate({
        errorPlacement: function (error, el) {
            if ($(el).is('[data-control="material"]')) {
//            $(el).closest('.mtl').addClass("hasMessage onError");
                $(el).mtl({
                    message: {
                        type: "Error",
                        text: error.text()
                    }
                });
            } else if ($(el).is('[data-type="selector"]') || $(el).is('[data-selector]')) {

                $(error).insertAfter($(el).closest('.SumoSelect'));
            } else if (($(el).is('[type="checkbox"]') || $(el).is('[type="radio"]')) && $(el).is('.custom')) {
                $(error).insertAfter($(el).next('label'));
            } else {
                $(error).insertAfter(el);
            }
        },
        success: function (error, el) {
            if ($(el).is('[data-control="material"]')) {
//            $(el).closest('.mtl').addClass("hasMessage onError");
                $(el).mtl({
                    message: {
                        type: "Defualt",
                        text: error.text()
                    }
                });
            }
        },
        submitHandler: function (form) {
            loadStart(loadClass, elemntId);
            $.post(url, $('form#' + fornId).serialize(),
                    function (response) {
                        responseData = response;
                        if (reset) {
                            resetForm(fornId);
                            $('[data-control="material"]').trigger('change');
                        }
                        
                        if(responseData.captcha){
                            refreshCaptcha(loadClass, elemntId);
                        }

                        if (responseData.message && responseData.url) {
                            loadStop(loadClass, elemntId);
                            $('#dialog').dialog({
                                action: 'open',
                                width : '440px',
                                message: '<h1 class="h4 semibold"><i class="fa fa-info-circle text-theme m-r-10"></i>'+responseData.title+'</h1>' + responseData.message,
                                buttons: [{
                                    'label': 'ok',
                                    'class': 'btn-info',
                                    'action': function () {
                                        redirect(responseData.url);
                                        $('#dialog').dialog({action: 'close'});
                                    }
                                }]
                            });
                        }else if (responseData.message) {
//                            var data = {
//                                timeout: 10000,
//                                actionText: 'Ok',
//                                message: responseData.message,
//                                actionHandler: loadStop(loadClass, elemntId)
//                            };
//                            $('#snackbarAlert').showSnackbar(data);
                                $('#dialog').dialog({
                                    action: 'open',
                                    width : '440px',
                                    message: '<h1 class="h4 semibold"><i class="fa fa-info-circle text-theme m-r-10"></i>'+responseData.title+'</h1>' + responseData.message,
                                    buttons: [{
                                        'label': 'ok',
                                        'class': 'btn-info',
                                        'action': function () {
                                            loadStop(loadClass, elemntId)
                                            $('#dialog').dialog({  action: 'close' });
                                        }
                                    }]
                                });
                        }

                        if (responseData.url) {
                            //location.href = responseData.url;
                        }
                    }
            );
        }
    });
}
/**
 * It will reset all field value of the coresponding form
 * @param {String} fornId
 * @returns {NULL}
 */
function resetForm(fornId)
{
    $("#" + fornId + " input, textarea, select").each(function (index, element) {
        $(element).val('');
    });
}
/**
 * It will set autocomplete functionality for the corresponding field
 * @param {String} fieldId
 * @param {String} url
 * @returns {NULL|Boolean}
 */
function autoComplete(fieldId, url, hiddenId)
{
    $('#' + fieldId).autocomplete({
        'source': function (request, response) {
            var name = $('#' + fieldId).val();
            var langId = $('#language_id').val();
            var domainId = $('#domain_id').val();
            $.ajax({
                url: url,
                method: 'POST',
                data: {filter: name, languageId: langId, domainId: domainId},
                dataType: 'json',
                success: function (json) {
                    response($.map(json, function (item) {
                        return {
                            label: item['title'],
                            name: item['productname'],
                            id: item['id']
                        }
                    }));
                }
            });
        },
        'select': function (event, ui) {
            $('#' + fieldId).val(ui.item.name);
            if (hiddenId) {
                $('#' + hiddenId).val(ui.item.id);
            }
            return false;
        }
    }).autocomplete("instance")._renderItem = function(ul, item) {
        return $("<li>")
        .data("item.autocomplete", item)
        .append('<div>' + item.label + '</div>')
        .appendTo(ul);
    };
}

function quoteProductAutocomplete(fieldId, url, hiddenId, addQuoteurl, countElementId)
{
    $('#' + fieldId).autocomplete({
        'source': function (request, response) {
            var name = $('#' + fieldId).val();
            var langId = $('#language_id').val();
            var domainId = $('#domain_id').val();
            $.ajax({
                url: url,
                method: 'POST',
                data: {filter: name, languageId: langId, domainId: domainId, selectedProducts: selectedProducts},
                dataType: 'json',
                success: function (json) {
                    response($.map(json, function (item) {
                        return {
                            label: item['title'],
                            name: item['productname'],
                            id: item['id']
                        }
                    }));
                }
            });
        },
        'select': function (event, ui) {
            $('#' + fieldId).val(ui.item.name);
            if (hiddenId) {
                $('#' + hiddenId).val(ui.item.id);
                addToQuoteFromAuto(addQuoteurl, $('#' + hiddenId).val(), $('#old' + hiddenId).val(), '', countElementId, '');
                if (responseData.success === 1){
                    $('#old' + hiddenId).val(ui.item.id);
                }
                selectedProducts.push(ui.item.id);
                $('#selectedProducts').val(selectedProducts)
            }
            return false;
        }
    })
    .autocomplete("instance")._renderItem = function(ul, item) {
        return $("<li>")
        .data("item.autocomplete", item)
        .append('<div>' + item.label + '</div>')
        .appendTo(ul);
    };
}

/**
 * 
 * @param {String} url
 * @param {Integer} productId
 * @param {Integer} productUerl
 * @returns {NULL}
 */
function addClickCount(url, productId, productUerl)
{
    doPostAjax(url, {productId: productId, languageId: langId}, true);
    redirect(productUerl);
}

function productSearch(elementId, url)
{
    var key = $('#' + elementId).val();
    key = key.replace("/", "");
    if (key) {
        redirect(url + '/' + encodeURIComponent(key));
    } else {
        redirect(url);
    }
}

function productAdvancedSearch(divId, url)
{

    $('#' + divId + ' [data-adv-search="true"]').each(function (index, element) {
        if ($(element).val()) {
            var value = $(element).val();
            var value1 = encodeURIComponent(removeSlahes(value));
            url += '/' + $(element).attr('name') + '-' + value1;
        }
    });

    redirect(url);
}

function removeSlahes(value)
{
    return value.replace(/\//g, "");
}

function encodes(value)
{
    var value = value.replace(/-/g, "2D");
    return value;
}

function doSearchOnEnter(elementId, url)
{
    $('#' + elementId).keypress(function (e) {
        if (e.which == 13) {
            productSearch(elementId, url);
        }
    });
}

function doAdvSearchOnEnter(divId, url)
{
    $('#' + divId + ' [data-adv-search="true"]').each(function (index, element) {
        $(element).keypress(function (e) {
            if (e.which == 13) {
                productAdvancedSearch(divId, url);
            }
        });
    });
}

function loadStart(cssClass, elementId)
{
    $('#' + elementId).addClass(cssClass);
}

function loadStop(cssClass, elementId)
{
    $('#' + elementId).removeClass(cssClass);
}

function addToQuote(url, productId, quoteUrl, countElementId, replaceTest)
{
    doPostAjax(url, {productId: productId}, false);
    var count = parseInt($('#' + countElementId).attr('aria-count'));
    if (responseData.success === 1 && countElementId) {
        $('#' + countElementId).attr('aria-count', count + 1);
    }
    if (responseData.success === 1) {
        $('#addToCartButton'+productId).text(replaceTest);
        $('#addToCartButton'+productId).attr('disabled', 'disabled');
       /*$('#dialog').dialog({
            action: 'open',
            width : '440px',
            message: responseData.message,
            buttons: [{
                'label': 'ok',
                'class': 'btn-info',
                'action': function () {
                    if(replaceTest){
                        $('#addToCartButton'+productId).text(replaceTest);
                    }
                    $('#dialog').dialog({  action: 'close' });
                }
            }]
        });*/
    }
}

function addToQuoteFromAuto(url, productId, productIdOld, quoteUrl, countElementId, replaceTest)
{   var data = {productId: productId, productIdOld:productIdOld};
    doPostAjaxForQuote(url, data, false);
    var count = parseInt($('#' + countElementId).attr('aria-count'));
    if (responseData.success === 1 && countElementId) {
        $('#' + countElementId).attr('aria-count', count + 1);
    }
    if (responseData.success === 1) {
        $('#addToCartButton'+productId).text(replaceTest);
        $('#addToCartButton'+productId).attr('disabled', 'disabled');
       /*$('#dialog').dialog({
            action: 'open',
            width : '440px',
            message: responseData.message,
            buttons: [{
                'label': 'ok',
                'class': 'btn-info',
                'action': function () {
                    if(replaceTest){
                        $('#addToCartButton'+productId).text(replaceTest);
                    }
                    $('#dialog').dialog({  action: 'close' });
                }
            }]
        });*/
    }
}

function setUploadDocs(id, token, counter) {
    new AjaxUpload('#' + id + 'Upload-1_r' + counter, {
        action: 'index.php?path=theme/Filemanager/uploadDoc&token=' + token,
        name: 'image',
        autoSubmit: false,
        responseType: 'json',
        onChange: function (file, extension) {
            this.submit();
            return false;
        },
        onSubmit: function (file, extension) {
            // $('#upload').append('<img src="view/image/loading.gif" class="loading" style="padding-left: 5px;" />');
        },
        onComplete: function (file, json) {
            if (json.success) {
                $('#' + id + 'Name-1_r' + counter).text(json.realname);
                var category_image = json.filename;
                $('#' + id).val(json.filename);
                $('#' + id + 'Path-1_r' + counter).val(json.filename);
                $('.loading').remove();
                //var URL_TEMP = $('#url_temp').val();
                //$('#' + id + '_file').prop('src', URL_TEMP + json.filename);
            }
            if (json.error) {
                alert(json.error);
            }
            return false;
        }
    });
}

function getStatesByCountry(cointryId, url, elementId) {
    if (cointryId) {
        var selectOption = '<option value="">Select state</option>';
        var selected = '';
        $.post(url, {country_id: cointryId},
                function (response) {
                    $.each(response, function (index, element) {
                        selectOption += '<option value="' + element.id + '" ' + selected + ' >' + element.state_name + '</option>';
                    });
                    $('#' + elementId).html(selectOption);
                }
        );
    }
}

function downloadTDS(url, fornId, reset, elemntId, loadClass)
{
    $('#' + fornId).validate({
        errorPlacement: function (error, el) {
            if ($(el).is('[data-control="material"]')) {
//            $(el).closest('.mtl').addClass("hasMessage onError");
                $(el).mtl({
                    message: {
                        type: "Error",
                        text: error.text()
                    }
                });
            } else if ($(el).is('[data-type="selector"]') || $(el).is('[data-selector]')) {

                $(error).insertAfter($(el).closest('.SumoSelect'));
            } else if (($(el).is('[type="checkbox"]') || $(el).is('[type="radio"]')) && $(el).is('.custom')) {
                $(error).insertAfter($(el).next('label'));
            } else {
                $(error).insertAfter(el);
            }
        },
        success: function (error, el) {
            if ($(el).is('[data-control="material"]')) {
//            $(el).closest('.mtl').addClass("hasMessage onError");
                $(el).mtl({
                    message: {
                        type: "Defualt",
                        text: error.text()
                    }
                });
            }
        },
        submitHandler: function (form) {
            loadStart(loadClass, elemntId);
            $.post(url, $('form#' + fornId).serialize(),
                    function (response) {
                        responseData = response;
                        
                        if(responseData.captcha){
                            refreshCaptcha(loadClass, elemntId);
                        }

                        if (responseData.message && responseData.url) {
                            popup.close('#tdsDownloadPopup');
                            location.href = responseData.url;
                            /*var data = {
                                timeout: 10000,
                                actionText: 'Ok',
                                message: responseData.message,
                                actionHandler: loadStop(loadClass, elemntId)
                            };
                            popup.close('#' + elemntId);
                            $('#snackbarAlert').showSnackbar(data);*/
                            /*$('#dialog').dialog({
                                action: 'open',
                                width : '440px',
                                message: responseData.message,
                                buttons: [{
                                    'label': 'ok',
                                    'class': 'btn-info',
                                    'action': function () {
                                        loadStop(loadClass, elemntId);
                                        popup.close('tdsDownloadPopup');
                                        $('#dialog').dialog({  action: 'close' });
                                        location.href = responseData.url;
                                    }
                                }]
                            });*/
                            
                        }else if (responseData.message) {
                            /*var data = {
                                timeout: 10000,
                                actionText: 'Ok',
                                message: responseData.message,
                                actionHandler: loadStop(loadClass, elemntId)
                            };
                            $('#snackbarAlert').showSnackbar(data);*/
                            $('#dialog').dialog({
                                action: 'open',
                                width : '440px',
                                message: responseData.message,
                                buttons: [{
                                    'label': 'ok',
                                    'class': 'btn-info',
                                    'action': function () {
                                        loadStop(loadClass, elemntId);
                                        $('#dialog').dialog({  action: 'close' });
                                    }
                                }]
                            });
                            
                            if(responseData.success === 1){
                                if (reset) {
                                    resetForm(fornId);
                                }
                                popup.close('#tdsDownloadPopup');
                            }
                        }
                        /*if (responseData.url) {
                            location.href = responseData.url;
                        }*/
                    }
            );
        }
    });
}

function downloadMSDS(url, fornId, reset, elemntId, loadClass)
{
    $('#' + fornId).validate({
        errorPlacement: function (error, el) {
            if ($(el).is('[data-control="material"]')) {
//            $(el).closest('.mtl').addClass("hasMessage onError");
                $(el).mtl({
                    message: {
                        type: "Error",
                        text: error.text()
                    }
                });
            } else if ($(el).is('[data-type="selector"]') || $(el).is('[data-selector]')) {

                $(error).insertAfter($(el).closest('.SumoSelect'));
            } else if (($(el).is('[type="checkbox"]') || $(el).is('[type="radio"]')) && $(el).is('.custom')) {
                $(error).insertAfter($(el).next('label'));
            } else {
                $(error).insertAfter(el);
            }
        },
        success: function (error, el) {
            if ($(el).is('[data-control="material"]')) {
//            $(el).closest('.mtl').addClass("hasMessage onError");
                $(el).mtl({
                    message: {
                        type: "Defualt",
                        text: error.text()
                    }
                });
            }
        },
        submitHandler: function (form) {
            loadStart(loadClass, elemntId);
            $.post(url, $('form#' + fornId).serialize(),
                function (response) {
                    responseData = response;
                    if (reset) {
                        resetForm(fornId);
                    }
                    
                    if(responseData.captcha){
                        refreshCaptcha(loadClass, elemntId);
                    }

                    if (responseData.message && responseData.url) {
                        /*var data = {
                            timeout: 10000,
                            actionText: 'Ok',
                            message: responseData.message,
                            actionHandler: loadStop(loadClass, elemntId)
                        };
                        popup.close('#' + elemntId);
                        $('#snackbarAlert').showSnackbar(data);*/
                        /*$('#dialog').dialog({
                            action: 'open',
                            width : '440px',
                            message: responseData.message,
                            buttons: [{
                                'label': 'ok',
                                'class': 'btn-info',
                                'action': function () {
                                    loadStop(loadClass, elemntId)
                                    $('#dialog').dialog({  action: 'close' });
                                    popup.close('#msdsDownloadPopup');
                                    location.href = responseData.url;
                                }
                            }]
                        });*/
                        popup.close('#msdsDownloadPopup');
                        location.href = responseData.url;
                    }else if (responseData.message) {
                        /*var data = {
                            timeout: 10000,
                            actionText: 'Ok',
                            message: responseData.message,
                            actionHandler: loadStop(loadClass, elemntId)
                        };
                        $('#snackbarAlert').showSnackbar(data);*/
                        $('#dialog').dialog({
                            action: 'open',
                            width : '440px',
                            message: responseData.message,
                            buttons: [{
                                'label': 'ok',
                                'class': 'btn-info',
                                'action': function () {
                                    loadStop(loadClass, elemntId);
                                    $('#dialog').dialog({  action: 'close' });
                                }
                            }]
                        });
                        
                        if(responseData.success === 1){
                            if (reset) {
                                resetForm(fornId);
                            }
                            popup.close('#tdsDownloadPopup');
                        }
                    }

                }
            );
        }
    });

}

function pupup(id, width, height, options)
{
    popup.open('#' + id, width, height, options);
}

// function tdsPopup(id, width, height, productGradeLangid, tds)
// {
//     $('#product_grade_lang_id_tds').val(productGradeLangid);
//     $('#tdspdf').val(tds);
//     pupup(id, width, height, {units: 'px'})

// }

// function msdsPopup(id, width, height, productGradeLangid, tds)
// {
//     $('#product_grade_lang_id_msds').val(productGradeLangid);
//     $('#msdspdf').val(tds);
//     pupup(id, width, height, {units: 'px'})
// }

function tdsPopup(id, width, height, productGradeLangid, tds, urlvar)
{   
    // alert(productGradeLangid);
    var data = {selectedProduct: productGradeLangid};
    $.ajax({
        type: 'POST',
        url: urlvar,
        data: data,
        success: function (response) {
            responseData = response;
            if (responseData.message == 0) {
                alert('No information at the moment');
            }else{
                $('#product_grade_lang_id_tds').val(productGradeLangid);
                $('#tdspdf').val(tds);
                pupup(id, width, height, {units: 'px'});
            }
        }
    });

}

function msdsPopup(id, width, height, productGradeLangid, tds, urlvar)
{
    // alert('hello');
    var data = {selectedProduct: productGradeLangid};
    $.ajax({
        type: 'POST',
        url: urlvar,
        data: data,
        success: function (response) {
            responseData = response;
            if (responseData.message == 0) {
                alert('No information at the moment');
            }else{
                $('#product_grade_lang_id_msds').val(productGradeLangid);
                $('#msdspdf').val(tds);
                pupup(id, width, height, {units: 'px'})
            }
        }
    });
}

function newsletterContentPopup(id, width, height, title, content)
{
//    console.log(title);
//    $('#newsletterTitle').text(title);
//    $('#newsletterContent').html(content);
    pupup(id, width, height, {units: 'px'})
}


function refreshCaptcha(loadClass, elementId)
{
    var url = $('#refreshCaptcha').val();
    loadStart(loadClass, elementId);
    $.ajax({
        type: 'POST',
        url: url,
        data: {},
        async: false,
        success: function (response) {
            $('.captcha').html(response);
            loadStop(loadClass, loadClass);
        }
    });
}

function bannerPopup(id, width, height, productGradeLangid, tds, bannertext)
{
    $('#product_grade_lang_id_tds').val(productGradeLangid);
    $('#banner_link').val(tds);
    $('#banner_text').val(bannertext);
    $('#tdspdf').val(tds);
    pupup(id, width, height, {units: 'px'})

}

function bannerUrlDownload(url, fornId, reset, elemntId, loadClass)
{
    $('#' + fornId).validate({
        errorPlacement: function (error, el) {
            if ($(el).is('[data-control="material"]')) {
//            $(el).closest('.mtl').addClass("hasMessage onError");
                $(el).mtl({
                    message: {
                        type: "Error",
                        text: error.text()
                    }
                });
            } else if ($(el).is('[data-type="selector"]') || $(el).is('[data-selector]')) {

                $(error).insertAfter($(el).closest('.SumoSelect'));
            } else if (($(el).is('[type="checkbox"]') || $(el).is('[type="radio"]')) && $(el).is('.custom')) {
                $(error).insertAfter($(el).next('label'));
            } else {
                $(error).insertAfter(el);
            }
        },
        success: function (error, el) {
            if ($(el).is('[data-control="material"]')) {
//            $(el).closest('.mtl').addClass("hasMessage onError");
                $(el).mtl({
                    message: {
                        type: "Defualt",
                        text: error.text()
                    }
                });
            }
        },
        submitHandler: function (form) {
            loadStart(loadClass, elemntId);
            $.post(url, $('form#' + fornId).serialize(),
                    function (response) {
                        responseData = response;
                        if (reset) {
                                resetForm(fornId);
                            }
                            loadStop(loadClass, elemntId);
                            console.log('hello');
                        if (responseData.captcha) {
                            refreshCaptcha(loadClass, elemntId);
                        }

                        if (responseData.message && responseData.url) {
                            if (reset) {
                                resetForm(fornId);
                            }
                            loadStop(loadClass, elemntId);
                            console.log('hello');
                            
                            popup.close('#tdsDownloadPopup');
                            window.open(responseData.url);return false;
                            //window.open("http://osric.net");return false;
                            /*var data = {
                             timeout: 10000,
                             actionText: 'Ok',
                             message: responseData.message,
                             actionHandler: loadStop(loadClass, elemntId)
                             };
                             popup.close('#' + elemntId);
                             $('#snackbarAlert').showSnackbar(data);*/
                            /*$('#dialog').dialog({
                             action: 'open',
                             width : '440px',
                             message: responseData.message,
                             buttons: [{
                             'label': 'ok',
                             'class': 'btn-info',
                             'action': function () {
                             loadStop(loadClass, elemntId);
                             popup.close('tdsDownloadPopup');
                             $('#dialog').dialog({  action: 'close' });
                             location.href = responseData.url;
                             }
                             }]
                             });*/

                        } else if (responseData.message) {
                            if (reset) {
                                resetForm(fornId);
                            }
                            loadStop(loadClass, elemntId);
                            console.log('hello');
                            /*var data = {
                             timeout: 10000,
                             actionText: 'Ok',
                             message: responseData.message,
                             actionHandler: loadStop(loadClass, elemntId)
                             };
                             $('#snackbarAlert').showSnackbar(data);*/
                            $('#dialog').dialog({
                                action: 'open',
                                width: '440px',
                                message: responseData.message,
                                buttons: [{
                                        'label': 'ok',
                                        'class': 'btn-info',
                                        'action': function () {
                                            loadStop(loadClass, elemntId);
                                            $('#dialog').dialog({action: 'close'});
                                        }
                                    }]
                            });

                            if (responseData.success === 1) {
                                if (reset) {
                                    resetForm(fornId);
                                }
                                popup.close('#tdsDownloadPopup');
                            }
                        }
                        /*if (responseData.url) {
                         location.href = responseData.url;
                         }*/
                    }
            );
        }
    });
}
function productDocSearch(elementId, url)
{ 
    var key = $('#' + elementId).val();
    key = key.replace("/", "");
    if (key) {
        redirect(url + '/' + encodeURIComponent(key));
    } else {
        redirect(url);
    }
}

function doSearchOnEnterDoc(elementId, url)
{
    $('#' + elementId).keypress(function (e) {
        if (e.which == 13) {
            productDocSearch(elementId, url);
        }
    });
}
  

function productDocsSelected(me)
{   
    var count = $('#selectedProducts').val().split(',').length;
    if(count > 10){
      alert('You can select only 10!');
      return false;
    }
    $("#selectedProducts").val($("#selectedProducts").val() + me.id + ",");
    var ooh = me+ me.id;
}


function zipDownload()
{
    var url = $('#ziplink').val();
    var selectedProducts = $('#selectedProducts').val();
    //loadStart(loadClass, elementId);
    $.ajax({
        type: 'POST',
        url: url,
        data: {filter: name, languageId: langId, domainId: domainId, selectedProducts: selectedProducts},
        success: function (response) {
          data = JSON.parse(response);
          if(data.status==200)
            location.href = data.filename;
        }
    });
}
