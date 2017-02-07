window.onload = function() {
    var app;
    var newsId = "5572a109b3cdc86cf39001e5";
    var firsturl = "https://route.showapi.com/109-35?channelId=" + newsId + "&maxResult=20&needAllList=0&needContent=0&needHtml=0&page=1&showapi_appid=31610&showapi_sign=794da37ef6d548bdb3faf07de393bc6d";
    $.ajax({
        type: "get",
        url: firsturl,
        dataType: "json",
        success: function(json) {
            // alert(json);
            console.log(json);
            console.log(json.showapi_res_body.pagebean.contentlist[4].imageurls.length);
            app = new Vue({
                el: '#app',
                data: {
                    items: json.showapi_res_body.pagebean.contentlist,
                    isActive: false
                },
                methods: {
                    a: function() {
                        // alert("a");
                        this.isActive = !this.isActive;
                    },
                    b: function() {
                        this.isActive = !this.isActive;
                    },
                    loadMore: function(moreData) {

                        this.items.push(moreData);

                    }
                }
            });
        },
        error: function(e) {
            console.log(e);
        }
    });

    var page = 1;
    $(window).scroll(function(event) {    
        var  sm = $(this).scrollTop() + $(window).height(); 
        var  dsm = $(document).height();
        console.log(sm);
        console.log(dsm);
        if (dsm == sm) {
            var myurl = "https://route.showapi.com/109-35?channelId=" + newsId + "&maxResult=20&needAllList=0&needContent=0&needHtml=0&page=" + (++page) + "&showapi_appid=31610&showapi_sign=794da37ef6d548bdb3faf07de393bc6d";
            $.ajax({
                type: "get",
                url: myurl,
                dataType: "json",
                success: function(json) {
                    for (var i = 0; i < json.showapi_res_body.pagebean.contentlist.length; i++) {
                        app.loadMore(json.showapi_res_body.pagebean.contentlist[i]);
                    }
                    console.log(json);
                },
                error: function(e) {
                    console.log(e);
                }
            });
            // alert();
        }
    });

    // 固定导航条代码
    var navHeight = $(".left-menu").offset().top;
    // alert(navHeight);
    var navFix = $(".left-menu");
    $(window).scroll(function() {
            if ($(this).scrollTop() > navHeight) {
                navFix.addClass("navFix");
                // $(".fixbg").css("display", "block");
                // $(".content .div1 .header .navbar li a").addClass("change");
            } else {
                navFix.removeClass("navFix");
                // $(".fixbg").css("display", "none");
                // $(".content .div1 .header .navbar li a").removeClass("change");
            }
        })
        // 固定导航条代码结束

    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 6,
        paginationClickable: true,
        freeMode: true,
        initialSlide: 3
    });
}