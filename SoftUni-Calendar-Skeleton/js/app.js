var app = app || {};

(function() {
    var router = Sammy(function() {
        var containerSelector = '#container';
        var menuSelector = '#menu';
        var requester = app.requester.load('kid_-kzOquNpkW', 'a6b941e65f574626b7c73583c03f7e3e', 'https://baas.kinvey.com/');

        var homeViewBag = app.homeViewBag.load();
        var userViewBag = app.userViewBag.load();
        var lecturesViewBag = app.lecturesViewBag.load();

        var userModel = app.userModel.load(requester);
        var lecturesModel = app.lecturesModel.load(requester);

        var homeController = app.homeController.load(homeViewBag);
        var userController = app.userController.load(userViewBag, userModel);
        var lecturesController = app.lecturesController.load(lecturesViewBag, lecturesModel);

        this.before({except:{path:'#/(login\/|register\/)?'}}, function() {
            if(!sessionStorage['sessionId']) {
                this.redirect('#/');
                return false;
            }
        });

        this.before(function () {
            if(!sessionStorage['sessionId']) {
                $.get('templates/menu-login.html', function (templ) {
                    $(menuSelector).html(templ);
                });
            }
            else {
                $.get('templates/menu-home.html', function (templ) {
                    $(menuSelector).html(templ);
                });
            }
        });

        this.get('#/', function() {
            if(sessionStorage['sessionId']) {
                homeController.loadWelcomeUserPage(containerSelector);
            }
            else {
                homeController.loadWelcomeGuestPage(containerSelector);
            }
        });

        this.get('#/login/', function() {
            userController.loadLoginPage(containerSelector);
        });

        this.get('#/register/', function() {
            userController.loadRegisterPage(containerSelector);
        });

        this.get('#/logout/', function() {
            userController.logout();
        });

        this.get('#/calendar/add/', function() {
            lecturesController.loadAddLecture(containerSelector);
        });

        this.get('#/calendar/list/', function() {
            lecturesController.loadAllCalendar(containerSelector);
        });

        this.get('#/calendar/my/', function() {
            lecturesController.loadMyCalendar(containerSelector);
        });

        this.get('#/calendar/edit/:id', function() {
            lecturesController.loadEditLecture(containerSelector, this.params['id'])
        });

        this.get('#/calendar/delete/:id', function() {
            lecturesController.loadDeleteLecture(containerSelector, this.params['id'])
        });

        this.bind('redirectUrl', function(ev, data) {
            this.redirect(data.url);
        });

        this.bind('login', function(ev, data) {
            userController.login(data);
        });

        this.bind('register', function(ev, data) {
            userController.register(data);
        });

        this.bind('addLecture', function(ev, data) {
            lecturesController.addLecture(data);
        });

        this.bind('editLecture', function(ev, data) {
            lecturesController.editLecture(data);
        });

        this.bind('showDeleteLecture', function(ev, data) {
            lecturesController.loadDeleteLecture(selector, data);
        });

        this.bind('deleteLecture', function(ev, lectureId) {
            lecturesController.deleteLecture(lectureId);
        });
    });

    router.run('#/');
}());