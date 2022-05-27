$(document).ready(function () {

    if ((location.href.substr(location.href.lastIndexOf('=') + 1)) > 750) {
        $("#flower").attr("src", "./image/five.png");
        $('#score').text(
                "5"
            );
    } else if ((location.href.substr(location.href.lastIndexOf('=') + 1)) > 500) {
        $("#flower").attr("src", "./image/four.png");
        $('#score').text(
                "4"
            );
    } else if ((location.href.substr(location.href.lastIndexOf('=') + 1)) > 300) {
        $("#flower").attr("src", "./image/three.png");
        $('#score').text(
                "3"
            );
    } else if ((location.href.substr(location.href.lastIndexOf('=') + 1)) > 150) {
        $("#flower").attr("src", "./image/two.png");
        $('#score').text(
                "2"
            );
    } else {
        $("#flower").attr("src", "./image/one.png");
        $('#score').text(
                "1"
            );
    }

});