$(document).ready(function() {
    $('.read-more-button').on('click', function() {
        $(this).prev().removeClass('hidden');
        $(this).remove();
    });
});