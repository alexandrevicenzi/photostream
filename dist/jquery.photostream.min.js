/*!
 * Copyright 2016, Alexandre Vicenzi
 * Released under the MIT License
 * https://github.com/alexandrevicenzi/photostream
 */
!function(t){function e(t,e){return t.replace(/{(\w+)}/g,function(t,r){return void 0!==e[r]?e[r]:t})}var r="https://farm{farm}.staticflickr.com/{server}/{id}_{secret}_{image_size}.jpg",i="https://www.flickr.com/photos/{owner}/{id}/in/dateposted-public/",a="https://api.flickr.com/services/rest/";t.fn.photostream=function(o){var n=this,s=t.extend({api_key:"",user_id:"",image_size:"m",image_count:10,target:"_blank"},o),c={method:"flickr.people.getPublicPhotos",api_key:s.api_key,user_id:s.user_id,per_page:s.image_count,format:"json",nojsoncallback:1};return t.get(a,c,function(a){"ok"===a.stat?(t.each(a.photos.photo,function(a,o){n.append(t("<a>").attr("target",s.target).attr("href",e(i,o)).append(t("<img>").attr("src",e(r,t.extend(o,s))).attr("title",o.title).attr("alt",o.title)))}),n.trigger("ps.complete")):n.trigger("ps.error",a)}),this}}(jQuery);