var app = app || {};

app.lecturesController = (function () {
    function LecturesController(viewBag, model) {
        this.model = model;
        this.viewBag = viewBag;
    }

    LecturesController.prototype.loadAllCalendar = function (selector) {
        var _this = this;
        this.model.getAllLectures()
            .then(function (data) {
                var result = {
                    lectures: []
                };

                data.forEach(function (lecture) {
                    result.lectures.push({
                        title: lecture.title,
                        start: lecture.start,
                        end: lecture.end,
                        lecturer: lecture.lecturer,
                        _id: lecture._id
                    })
                });

                _this.viewBag.showAllCalendar(selector, result);
            }, function () {
                Noty.error(error.responseText);
            });
    };

    LecturesController.prototype.loadMyCalendar = function (selector) {
        var _this = this;
        var userId = sessionStorage['userId'];
        this.model.getLecturesByCreatorId(userId)
            .then(function (data) {
                var result = {
                    lectures: []
                };

                data.forEach(function (lecture) {
                    result.lectures.push({
                        title: lecture.title,
                        start: lecture.start,
                        end: lecture.end,
                        lecturer: lecture.lecturer,
                        _id: lecture._id
                    })
                });

                _this.viewBag.showMyLectures(selector, result);
            }, function (error) {
                Noty.error(error.responseText);
            });
    };

    LecturesController.prototype.loadAddLecture = function (selector) {
        this.viewBag.showAddLecture(selector);
    };

    LecturesController.prototype.addLecture = function (data) {
        var result = {
            title: data.title,
            start: data.start,
            end: data.end,
            lecturer: sessionStorage['username']
        };

        this.model.addLecture(result)
            .then(function () {
                Noty.success('Lecture successfully added.');
                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/calendar/list/'});
                });
            }, function (error) {
                Noty.error(error.responseText);
            });
    };

    LecturesController.prototype.loadEditLecture = function (selector, lectureId) {
        var _this = this;
        this.model.getLectureById(lectureId)
            .then(function (success) {
                var result = {
                    title: success[0].title,
                    start: success[0].start,
                    end: success[0].end,
                    _id: success[0]._id
                };

                _this.viewBag.showEditLecture(selector, result);
            }, function (error) {
                Noty.error(error.responseText);
            });
    };

    LecturesController.prototype.editLecture = function (data) {
        this.model.editLecture(data.id, data)
            .then(function () {
                Noty.success('Lecture successfully edited.');
                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/calendar/my/'});
                });
            }, function (error) {
                Noty.error(error.responseText);
            });
    };

    LecturesController.prototype.loadDeleteLecture = function (selector, lectureId) {
        var _this = this;
        this.model.getLectureById(lectureId)
            .then(function (success) {
                var result = {
                    title: success[0].title,
                    start: success[0].start,
                    end: success[0].end,
                    _id: success[0]._id
                };

                _this.viewBag.showDeleteLecture(selector, result);
            }, function (error) {
                Noty.error(error.responseText);
            });
    };

    LecturesController.prototype.deleteLecture = function (lectureId) {
        this.model.deleteLecture(lectureId)
            .then(function () {
                Noty.success('Lecture successfully deleted.');
                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/calendar/my/'});
                });
            }, function (error) {
                Noty.error(error.responseText);
            })
    };

    return {
        load: function (viewBag, model) {
            return new LecturesController(viewBag, model);
        }
    }
}());