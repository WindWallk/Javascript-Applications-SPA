var app = app || {};

app.userModel = (function() {
    function UserModel(requester) {
        this.requester = requester;
        this.serviceUrl = requester.baseUrl + 'user/' + requester.appId + '/';
    }

    UserModel.prototype.login = function(data) {
        var requestUrl = this.serviceUrl + 'login';
        return this.requester.post(requestUrl, data, false);
    };

    UserModel.prototype.register = function(data) {
        var defer = Q.defer();

        if(data.password === data.confirmPassword) {
            return this.requester.post(this.serviceUrl, data, false);
        }
        else {
            defer.reject({responseText: "Passwords did not match!"});
            return defer.promise;
        }
    };

    UserModel.prototype.logout = function() {
        var requestUrl = this.serviceUrl + '_logout';
        return this.requester.post(requestUrl, null, true);
    };

    return {
        load: function (requester) {
            return new UserModel(requester);
        }
    }
}());