/*!
 * Copyright 2016, Alexandre Vicenzi
 * Released under the MIT License
 * https://github.com/alexandrevicenzi/photostream
 */

(function ($){
    var PHOTO_SOURCE_URL = 'https://farm{farm}.staticflickr.com/{server}/{id}_{secret}_{image_size}.jpg',
        PHOTOSTREAM_PHOTO_URL = 'https://www.flickr.com/photos/{owner}/{id}/in/dateposted-public/',
        FLICKR_API_URL = 'https://api.flickr.com/services/rest/';

    function format(s, o) {
        return s.replace(/{(\w+)}/g, function(match, key) {
            return o[key] !== undefined ? o[key] : match;
        });
    }

    $.fn.photostream = function (options) {
        var _self = this,
            settings = $.extend({
                api_key: '',
                user_id: '',
                image_size: 'm',
                image_count: 10,
                target: '_blank'
            }, options),
            data = {
                method: 'flickr.people.getPublicPhotos',
                api_key: settings.api_key,
                user_id: settings.user_id,
                per_page: settings.image_count,
                format: 'json',
                nojsoncallback: 1
            };

        $.get(FLICKR_API_URL, data, function (data) {
            if (data.stat === 'ok') {
                $.each(data.photos.photo, function (idx, photo) {
                    _self.append($('<a>')
                        .attr('target', settings.target)
                        .attr('href', format(PHOTOSTREAM_PHOTO_URL, photo))
                        .append($('<img>')
                            .attr('src', format(PHOTO_SOURCE_URL, $.extend(photo, settings)))
                            .attr('title', photo.title)
                            .attr('alt', photo.title)));
                });

                _self.trigger('ps.complete');
            } else {
                _self.trigger('ps.error', data);
            }
        });

        return this;
    };
}(jQuery));
