var app = app || {};

app.lecturesViewBag = (function () {
    function showAllCalendar(selector, data) {
        $.get('templates/calendar.html', function (templ) {
            $(selector).html(templ);
        }).then(function () {
            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-01-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data.lectures,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/calendar/add/'});
                            });
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);
                        $('#editLecture').hide();
                        $('#deleteLecture').hide();
                    });
                    $('#events-modal').modal();
                }
            });
        });
    }

    function showMyLectures(selector, data) {
        $.get('templates/calendar.html', function (templ) {
            $(selector).html(templ);
        }).then(function () {
            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-01-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data.lectures,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/calendar/add/'});
                            });
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);
                        $('#editLecture').on('click', function() {
                            var lectureId = $('.container').attr('id');
                            console.log($('.container'));
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/calendar/edit/' + lectureId});
                            });
                        });
                        $('#deleteLecture').on('click', function() {
                            var lectureId = $('.container').attr('id');
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/calendar/delete/' + lectureId});
                            })
                        })
                    });
                    $('#events-modal').modal();
                }
            });
        });
    }

    function showAddLecture(selector) {
        $.get('templates/add-lecture.html', function (templ) {
            $(selector).html(templ);
            $('#addLecture').on('click', function () {
                var title = $('#title').val(),
                    start = $('#start').val(),
                    end = $('#end').val(),
                    lecturer = sessionStorage['username'];

                Sammy(function () {
                    this.trigger('addLecture', {title: title, start: start, end: end, lecturer: lecturer});
                })
            })
        })
    }

    function showEditLecture(selector, data) {
        $.get('templates/edit-lecture.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('#editLecture').on('click', function () {
                var title = $('#title').val(),
                    start = $('#start').val(),
                    end = $('#end').val(),
                    id = $(this).attr('data-id'),
                    lecturer = sessionStorage['lecturer'];

                Sammy(function () {
                    this.trigger('editLecture', {title: title, start: start, end: end, lecturer: lecturer, id: id});
                })
            })
        })
    }

    function showDeleteLecture(selector, data) {
        $.get('templates/delete-lecture.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('#deleteLecture').on('click', function () {
                var lectureId = $(this).attr('data-id');
                Sammy(function () {
                    this.trigger('deleteLecture', lectureId);
                })
            })
        })
    }

    return {
        load: function () {
            return {
                showAddLecture: showAddLecture,
                showAllCalendar: showAllCalendar,
                showMyLectures: showMyLectures,
                showEditLecture: showEditLecture,
                showDeleteLecture: showDeleteLecture
            }
        }
    }
}());