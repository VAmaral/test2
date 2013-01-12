
        (function (){
            
            function GetUrl() {
                var url = $('form').attr("action");
                var s = url.split("=");
                var x = s.length;
                s[s.length - 1] = "true";
                url = "";
                for (var i = 0; i < s.length-1; i++) {  
                    url += s[i]+"=";
                }
                return url+=s[s.length-1];
            }
            function ValidateEdit(val, allElems, invalidName) {
                //var detailVal = $("#boardName");//valor atual 
                if (val == $("#boardName").val()) {
                    return false;
                }
                for (var e in allElems) {
                    if (allElems[e] == val) {
                        $('#erro_name').append(invalidName);
                        return false;
                    }
                }
            }

            function CleanForm($form) {
                $form.find('input:text, textarea').val('');
               // $('form > :input').attr("value", "");
            }

            function UpdateList(newVal, oldVal) {
                var list = document.getElementById("list").value;
                if (arguments.length == 1) {
                    document.getElementById("list").value = list.concat("," + newVal);
                } else {
                    var array = list.split(",");
                    for (var i = 0; i < array.length; i++) {
                        if (array[i] == oldVal) {
                            array[i] = newVal;
                            document.getElementById("list").value = array.toString();
                            return false;
                        }
                    }
                }
            }
            function FormHasError() { }

            function GetPage() { }

            function DoAjaxRequest(mtd,url,callback) {

                if (window.XMLHttpRequest) { // Mozilla, Safari, ...
                    httpRequest = new XMLHttpRequest();
                } else if (window.ActiveXObject) { // IE 8 and older
                    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                }
                httpRequest.open(mtd, url, true);
                httpRequest.onreadystatechange = function () {
                      if (httpRequest.readyState === 4) {
                         // everything is good, the response is received
                        if (httpRequest.status === 200) {
                            callback(httpRequest.responseText);
                            return false;
                        }
                      }
                }
               
                var data = $('form').serialize();
                //MUITO IMPORTANTE
                httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                //httpRequest.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
                httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                httpRequest.send(data);
                return false;
            }

            window.onload = function () {
                //VALIDATION NAMES
                document.getElementById("Name").onblur = function () {
                    var val = $(this).val(); /*OU $(this).attr("value")*/

                    var invalidName = "<p id=\"invName\" style=\"color:red\">The name " + val + " already exist.</p>";
                    var invalidField = "<p id=\"invField\" style=\"color:red\"> The " + $(this).attr("Name") + " is required.</p>";
                    var allElems = $("#list").val().split(",");
                    $('#invName').remove();
                    $('#invField').remove();
                    if (val == "") { $('#erro_name').append(invalidField); return false; }

                    if ($('input:submit').attr("value") == "editar") {
                        ValidateEdit(val, allElems, invalidName, invalidField);
                        return false;
                    }
                    for (var b in allElems) {
                        if (allElems[b] == val) {
                            $('#erro_name').append(invalidName);
                            return false;
                        }
                    }
                }
               // var page = GetPage();
                if ($('input:submit').attr("value") == "criar") {
                    document.getElementById("create").onclick = function (e) {
                        if (document.getElementById("invName") == null && document.getElementById("invField") == null) {
                            var url = GetUrl();
                            DoAjaxRequest("POST", url, function (response) {
                              //  if (page == "board") {
                                    $('#myboard > ul').remove();
                                    $("#myboard").append(response);
                                    UpdateList($("#Name").val());
                                    CleanForm($('form'));
                                    //e.preventDefault();
                                    return;
                              //  }
                                //if (page == "list") {

                                //    return;       //TODO
                                //}

                                //if (page == "card") {
                                //    return;
                                //}
                            }
                                );
                        }

                        return false;
                    }
                } else {
                    document.getElementById("editar").onclick = function (e) {
                        if (document.getElementById("invName") == null && document.getElementById("invField") == null) {
                            var url = GetUrl();
                            DoAjaxRequest("POST", url, function (response) {
                                var oldVal = $('#boardName').val();
                                $('#display').children().remove();
                                $('#display').append(response);
                                UpdateList($("#boardName").val(),oldVal);
                            });
                        }
                        return false;
                    }

                }
            }
    
        })();