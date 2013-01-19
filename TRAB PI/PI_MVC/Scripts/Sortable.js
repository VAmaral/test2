$(function() {
    var isSameList = true;

    $(".droppable").sortable({
        connectWith: ".droppable",
        receive: function (e, ui) {
            if(!isSameList)
            {
                var card = $(ui.item);
                //var receiver = $(ui.item).closest(".list").attr("id");

                $.ajax({
                    type: 'post',
                    url: '/Card/MoveCardToOtherList',
                    data:
                        {
                            card: $(ui.item).attr("id"),
                            sender: $(ui.sender[0]).closest(".list").attr("id"),
                            receiver: $(ui.item).closest(".list").attr("id"),
                            previousCard: $(ui.item).prev(".card").attr("id"),
                            nextCard: $(ui.item).prev(".card").attr("id"),
                            board: $("#BoardId").val()
                        },
                    error: function (request) { alert("Ocorreu um erro inesperado. Não foi possível realizar a operação pretendida."); },
                    success: function (e, ui) { $(card).attr("itemid", $(card).closest(".list").attr("id")); }
                });
            }
            isSameList = true;
        },
        beforeStop: function (e, ui) {
            var item = $(ui.item).attr("id");
            var list = $(ui.item).attr("itemid");
            var receiver = $(ui.item).closest(".list").attr("id");
            
            if (receiver != list)
            {
                isSameList = false;
                return;
            }
            isSameList = true;
            $.ajax({
                type: 'post',
                url: '/Card/MoveCardInsideList',
                data:
                    {
                        card: $(ui.item).attr("id"),
                        list: list,
                        previousCard: $(ui.item).prev(".card").attr("id"),
                        nextCard: $(ui.item).prev(".card").attr("id"),
                        board: $("#BoardId").val()
                    },
                error: function () { alert("Ocorreu um erro inesperado. Não foi possível realizar a operação pretendida."); }
            });
        }
    });

    $(".droppable").disableSelection();
});