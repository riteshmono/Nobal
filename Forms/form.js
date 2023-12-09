    $('#contact_form').validate({
        onfocusout: false,
        onkeyup: false,
        rules: {
            name: "required",
            message: "required",
            phone: "required",
            email: {
                required: true,
                email: true
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
        messages: {
            name: "¿Cómo te llamas?",
            message: "Escribe tu mensaje",
            phone: "Escribe tu número de teléfono",
            email: {
                required: "¿Cuál es tu correo electrónico?",
                email: "Por favor introduzca una dirección de correo electrónico válida"
            }
        },

        highlight: function (element) {
            $(element)
                .text('').addClass('error')
        },

        success: function (element) {
            element
                .text('').addClass('valid')
        }
    });
   $('#contact_form').submit(function () {
        // submit the form
        if ($(this).valid()) {
            $('#contact_submit').button('loading');
            var action = $(this).attr('action');
            $.ajax({
                url: action,
                type: 'POST',
                data: {
                    contactname: $('#contact_name').val(),
                    contactemail: $('#contact_email').val(),
                    contactmessage: $('#contact_message').val(),
                    contactphone: $('#contact_phone').val()
                },
                success: function () {
                    $('#contact_submit').button('reset');
                    //Use modal popups to display messages
                    $('#modalContactSuccess').modal('show');
                },
                error: function () {
                    $('#contact_submit').button('reset');
                    //Use modal popups to display messages
                    $('#modalContactError').modal('show');
                }
            });
        } else {
            $('#contact_submit').button('reset')
        }
        return false;
    });
