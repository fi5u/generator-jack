function sendForm(event, formEl, formValues, formSuccess, formFailure) {

    /* NOTE: include parsley before */

    /* USAGE:
        wrap form in <div class="form-wrap">

        $("button[type='submit']").click(function(event) {
            var formEl = $(this).closest("form");
            var formValues = new Object();
            formValues.mailto = emailAddress;
            formValues.email = $("#form-email").val();
            formValues.subject = contactSubject;
            formValues.checkbox1 = ( $("#checkbox1").is(":checked") ? "Kyllä" : "Ei" );

            var formSuccess = "KIITOS REKISTERÖITYMISESTÄSI!<br>KÄYTTÄJÄTUNNUS JA SALASANA LÄHETETÄÄN SÄHKÖPOSTIISI.";
            var formFailure = "Failure";
            sendForm(event, formEl,  formValues, formSuccess, formFailure);
        });
    */

    /* compulsory attributes:
    /  formValues["mailto"]
    /  formValues["subject"]
    /  formValues["email"]
    */

    $( formEl ).parsley( 'validate' );

    if( $( formEl ).parsley( 'validate' ) ) {
        Object.size = function(obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };

        var formValuesLength = Object.size(formValues);

        var formParent = $(formWrap).parent();
        var dataStr = "";

        for (key in formValues) {
            /* key = key, formValues[key] = value */
            dataStr = dataStr + "&" + key + "=" + formValues[key];
        }

        dataStr = dataStr.substring(1); //remove first ampersand
        $.ajax({
            type: "POST",
            url: rootDir + "assets/php/process_email.php",
            data: dataStr,
            dataType: "json",
            success: function(data) {
                if(data.success) {
                    $(formEl).fadeOut("slow", function() {
                        $(formParent).append("<div class='result-msg' id='result-msg'></div>");
                        $("#result-msg").hide().append("<p>"+ formSuccess +"</p>").fadeIn("slow");
                    });

                } else {
                    $(formEl).fadeOut("slow", function() {
                        $(formParent).append("<div class='result-msg' id='result-msg'></div>");
                        $("#result-msg").hide().append("<p>"+ formFailure +"</p>").fadeIn("slow");
                    });

                }
            },
            error: function() {
                $(formEl).fadeOut("slow", function() {
                    $(formParent).append("<div class='result-msg' id='result-msg'></div>");
                    $("#result-msg").hide().append("<p>"+ formFailure +"</p>").fadeIn("slow");
                });

            }
        });

    }
    event.preventDefault();
}
