var app = app || {};

app.homeController = (function() {
    function HomeController(viewBag, model) {
        this.model = model;
        this.viewBag = viewBag;
    }

    HomeController.prototype.loadWelcomeGuestPage = function(containerSelector) {
        this.viewBag.showWelcomeGuestPage(containerSelector);
    };

    HomeController.prototype.loadWelcomeUserPage = function(containerSelector) {
        var data = {
            username: sessionStorage['username']
        };
        this.viewBag.showWelcomeUserPage(containerSelector, data);
    };

    return {
        load: function (viewBag, model) {
            return new HomeController(viewBag, model);
        }
    }
}());