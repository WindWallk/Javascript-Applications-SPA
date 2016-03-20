var app = app || {};

app.userViewBag = (function () {
    function showLoginPage(containerSelector) {
        $.get('templates/login.html', function (templ) {
            $(containerSelector).html(templ);
            $('#login-button').on('click', function () {
                var username = $('#username').val();
                var password = $('#password').val();

                Sammy(function () {
                    this.trigger('login', {username: username, password: password});
                })
            })
        });
    }

    function showRegisterPage(containerSelector) {
        $.get('templates/register.html', function (templ) {
            $(containerSelector).html(templ);
            $('#register-button').on('click', function () {
                var username = $('#username').val(),
                    password = $('#password').val(),
                    confirmPassword = $('#confirm-password').val()

                Sammy(function () {
                    this.trigger('register', {username: username, password: password, confirmPassword: confirmPassword});
                })
            })
        });
    }

    return {
        load: function () {
            return {
                showLoginPage: showLoginPage,
                showRegisterPage: showRegisterPage
            }
        }
    }
}());