$.widget("custom.catcomplete", $.ui.autocomplete, {
    _renderMenu: function (ul, items) {
        var that = this,
        currentCategory = "";
        $.each(items, function (index, item) {
            if (item.category != currentCategory) {
                ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
                currentCategory = item.category;
            }
            that._renderItemData(ul, item);
        });
    }
});

$(function () {
    $("#search").catcomplete({
        delay: 500,
        minLength: 1,
        select: function (event, ui) { window.location = ui.item.url; },
        source: function (request, response) {
            $.ajax({
                type: "get",
                url: "/Home/Search",
                dataType: "json",
                data: { term: request.term },
                success: function (data) { response(jQuery.parseJSON(data)); }
            });
        }
    });
});
