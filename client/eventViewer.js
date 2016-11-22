$(document).ready(function() {

    const handleError = (message) => {
      /*
        $("#errorMessage").text(message);
        $("#domoMessage").animate({width:'toggle'},350);
      */
      window.alert(message);
    }

    const sendAjax = (action, data) => {
        $.ajax({
            cache: false,
            type: "GET",
            url: action,
            data: data,
            dataType: "json",
            success: (result, status, xhr) => {
              //  $("#domoMessage").animate({width:'hide'},350);

                window.location = result.redirect;
            },
            error: (xhr, status, error) => {
                handleError(messageObj.error);
                const messageObj = JSON.parse(xhr.responseText);
            }
        });
    }
    /*
    $("#eventCategory").on("change", (e) => {
        e.preventDefault();

        //sendAjax(`/${ $("#eventCategory").val() }`, {});
        window.location
        return false;
    });*/

});
