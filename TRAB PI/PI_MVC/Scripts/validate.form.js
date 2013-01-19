
(function () {

    function daysInFebruary(year) {
        return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28);
    }

    function IsInteger(s) {
        var i;
        for (i = 0; i < s.length; i++) {
            // Check that current character is number.
            var c = s.charAt(i);
            if (((c < "0") || (c > "9"))) return false;
        }
        // All characters are numbers.
        return true;
    }



    function GetUrl() {
        var url = $('form').attr("action");
        var s = url.split("=");
        var x = s.length;
        s[s.length - 1] = "true";
        url = "";
        for (var i = 0; i < s.length - 1; i++) {
            url += s[i] + "=";
        }
        return url += s[s.length - 1];
    }
    function ValidateEdit(val, allElems, invalidName) {
        //var detailVal = $("#boardName");//valor atual 
        if (val == $("#name").val()) {
            return false;
        }
        for (var e in allElems) {
            if (allElems[e] == val) {
                $('#erro_name').append(invalidName);
                return false;
            }
        }
    }

    function DaysArray(n) {
        for (var i = 1; i <= n; i++) {
            this[i] = 31
            if (i == 4 || i == 6 || i == 9 || i == 11) { this[i] = 30 }
            if (i == 2) { this[i] = 29 }
        }
        return this
    }

    function IsDateValid(dtStr, today) {
        for (var i = 0; i < dtStr.length; ++i) {
            if (!IsInteger(dtStr[i])) return false;

        }
        var dia = dtStr[0];
        var mes = dtStr[1];
        var ano = dtStr[2];
        var daysInMonth = DaysArray(12)
        daysInMonth[2] = daysInFebruary(ano);
        if (mes > 12 || mes < 1 || dia > daysInMonth[mes] || dia < 1 || ano < 2012) return false;
        var currDia, currMes, currAno;
        if (arguments.length == 1) {
            today = new Date();
            currDia = today.getDate();
            currMes = today.getMonth() + 1;
            currAno = today.getFullYear();
        } else {
            currDia = today[0];
            currMes = today[1];
            currAno = today[2];
        }
        if (ano < currAno || dia < currDia && mes <= currMes || mes < currMes) return false;
        return true;
    }
    function parseDate(str, div) {
        $("#invField").remove();
        $("#invFormat").remove();
        $("#invDate").remove();
        if (str == "") {
            $(div).append("<p id=\"invField\" style=\"color:red\"> The field is required.</p>");
            return null;
        }

        var m = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (!m) {
            $(div).append("<p id=\"invFormat\" style=\"color:red\"> Invalid date format. Put format dd/mm/yyyy.</p>");
            return null;
        }

        if (!IsDateValid(m[0].split("/"))) {
            $(div).append("<p id=\"invDate\" style=\"color:red\"> Invalid date");
            return null;
        }
        //return new Date(m[3], m[2] - 1, m[1]);
        return str;
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
    function isChecked(endDate, beginDate) {
        var ar1 = endDate.split(" ");
        var ar2 = beginDate.split(" ");
        ar1 = ar1[0].split("/");
        ar2 = ar2[0].split("/");
        return IsDateValid(ar1, ar2);
    }
    function IsFormValid(val, attrVal, endDate, beginDate) {

        if (val == "") {
            $('#invField').remove();
            $('#erro_name').append("<p id=\"invField\" style=\"color:red\"> The " + attrVal + " is required.</p>");
            return false;
        }
        if (arguments.length == 2) { //validar lstas e quadros
            return document.getElementById("invName") == null;
        }
        var desc = $("#Description");
        if ($(desc).val() == "" || $(desc).val() == undefined) {
            $('#erro_desc').append("<p id=\"invField\" style=\"color:red\"> The " + $(desc).attr("Name") + " is required.</p>");
            return false;
        }
        if (arguments.length == 3) {
            return parseDate(endDate, $("#erro_EndDate")) != null;
        }
        var eDate = parseDate(endDate, $("#erro_EndDate"));
        if (eDate == null) { return false; }
        var bDate = parseDate(beginDate, $("#erro_BeginDate"));
        if (bDate == null) { return false; }
        if (isChecked(eDate, bDate)) { return true; }
        
        return false;
    }

    function GetPage() {
        var url = $('form').attr("action").split("/");
        return url[1].toLowerCase();
    }

    function DoAjaxRequest(mtd, url, callback) {

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
    function refresh(response) {
        var oldVal = $('#name').val();
        $('#display').children().remove();
        $('#display').append(response);
        UpdateList($("#name").val(), oldVal);
    }

    window.onload = function () {

        var endDate = document.getElementById("EndDate");
        var beginDate = document.getElementById("BeginDate");
        if (beginDate != null)
            beginDate.onblur = function () {
                if (parseDate(this.value, $("#erro_BeginDate")) == null) {
                    return false;
                }
            }
        if (endDate != null)
            endDate.onblur = function () {
                if (parseDate(this.value, $("#erro_EndDate")) == null) {
                    return false;
                }
            }

        var share = document.getElementById("share");
        if (share != null) {
            share.onclick = function () {
                var val = $("#user").val();
                var name;
                var invalidName = "<p id=\"invName\" style=\"color:red\">The NickName " + val + " not exist.</p>";
                var users = $('#list').val().split(",");
                $("#invName").remove();
                for (var i = 0; i < users.length; i++) {
                    if (users[i] == val) { name = val; break; }
                }
                if (name == undefined) {
                    $("#erro_name").append(invalidName);
                    return false;
                }
            }
        }
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
            if (GetPage() != "card") {
                for (var b in allElems) {
                    if (allElems[b] == val) {
                        $('#erro_name').append(invalidName);
                        return false;
                    }
                }
            }
        }
        // var page = GetPage();
        if ($('input:submit').attr("value") == "criar") {
            document.getElementById("create").onclick = function (e) {
                var val = $("#Name").val();
                var postPage = GetPage();
                if (postPage == "board" || postPage == "list") {
                    if (IsFormValid(val, $('#Name').attr("Name"))) {
                        if (postPage == "board") {
                            DoAjaxRequest("POST", GetUrl(), function (response) {
                                $('#myboard > ul').remove();
                                $("#myboard").append(response);
                                UpdateList(val);
                                CleanForm($('form'));
                                //e.preventDefault();
                                return;
                            }
                           );
                            return false;
                        }
                    } else { return false; }
                } else { //criar um cartao

                    if (!IsFormValid(val, $('#Name').attr("Name"), $("#EndDate").val())) { //validação do form para a criação dos cartoes
                        return false;
                    }
                }
            }
        } else {
            document.getElementById("editar").onclick = function (e) {
                var postPage = GetPage();
                var valName = $("#Name").val();
                if (postPage == "board" || postPage == "list") {
                    if (IsFormValid(valName, $('#Name').attr("Name"))) {
                        DoAjaxRequest("POST", GetUrl(), function (response) {
                            refresh(response);
                            return false;
                        });
                    }
                    return false;
                } else {
                    if (IsFormValid(valName, $('#Name').attr("Name"), $("#EndDate").val(), $("#BeginDate").val())) {
                        DoAjaxRequest("POST", GetUrl(), function (response) {
                            refresh(response);
                            return false;
                        });
                    }
                }
                return false;
            }
        }
    }

})();