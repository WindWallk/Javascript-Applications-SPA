var app = app || {};

app.userController = (function () {
    function UserController(viewBag, model) {
        this.model = model;
        this.viewBag = viewBag;
    }

    UserController.prototype.loadLoginPage = function (containerSelector) {
        this.viewBag.showLoginPage(containerSelector);
    };

    UserController.prototype.login = function (data) {
        return this.model.login(data)
            .then(function (success) {
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['userId'] = success._id;
                Noty.success('Successfully logged in.');

                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/'});
                });
            }, function (error) {
                Noty.error(error.responseText);
            })
    };

    UserController.prototype.loadRegisterPage = function (containerSelector) {
        return this.viewBag.showRegisterPage(containerSelector);
    };

    UserController.prototype.register = function (data) {
        return this.model.register(data)
            .then(function (success) {
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['userId'] = success._id;
                Noty.success('Successfully registered.');

                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/'});
                });
            }, function (error) {
                console.log(error);
                Noty.error(error.responseText);
            })
    };

    UserController.prototype.logout = function () {
        this.model.logout()
            .then(function () {
                sessionStorage.clear();
                Noty.success('Successfully logged out.');
                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/'});
                });
            }, function (error) {
                Noty.error('Your logout has encountered an error. Please try again.');
            });
    };

    return {
        load: function (viewBag, model) {
            return new UserController(viewBag, model);
        }
    }
}());
