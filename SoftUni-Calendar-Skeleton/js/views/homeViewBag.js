var app = app || {};

app.homeViewBag = (function () {
    function showWelcomeGuestPage(containerSelector) {
        $.get('templates/welcome-guest.html', function(templ) {
            $(containerSelector).html(templ);
        });
    }

    function showWelcomeUserPage(containerSelector, data) {
        $.get('templates/welcome-user.html', function(templ) {
            var renderedData = Mustache.render(templ, data);
            $(containerSelector).html(renderedData);
        });
    }

    return {
        load: function() {
            return {
                showWelcomeGuestPage: showWelcomeGuestPage,
                showWelcomeUserPage: showWelcomeUserPage
            }
        }
    }
}());