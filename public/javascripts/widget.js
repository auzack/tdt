function scrollToTop() {
    $('html,body').animate({
        scrollTop: 0
    }, 700);
}

function showDialog(title, msg) {
    // $('#modal_dialog_title').html(title);
    $('#modal_dialog_msg').html(msg);
    $('#modal_dialog').modal('show');
}

function showLoadModal() {
    $('#load-modal').fadeIn(200);
}

function hideLoadModal() {
    $('#load-modal').fadeOut(200);
}

var showTop = false;

$(function () {
    $(window).scroll(function () {
        var pos = $(window).scrollTop();
        if(pos >= 700){
            if(showTop == false){
                $('#to-top-btn').removeClass('hide');
                showTop = true;
            }
        }
        else{
            if(showTop == true){
                $('#to-top-btn').addClass('hide');
                showTop = false;
            }
        }
    })


})