window.onload = function() {
    var app;
    var newsId = "5572a109b3cdc86cf39001de";
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
    var navHeight2 = $(".mob-nav-menu").offset().top;
    // alert(navHeight);
    var navFix = $(".left-menu");
    var navFix2 = $(".mob-nav-menu");
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

            if ($(this).scrollTop() > navHeight2) {
                navFix2.addClass("mob-nav-menu-top");
                // $(".fixbg").css("display", "block");
                // $(".content .div1 .header .navbar li a").addClass("change");
            } else {
                navFix2.removeClass("mob-nav-menu-top");
                // $(".fixbg").css("display", "none");
                // $(".content .div1 .header .navbar li a").removeClass("change");
            }
        })
        // 固定导航条代码结束

    var obj = document.querySelector('.mob-nav-menu');
    var startX;
    var startY;
    $(".mob-nav-menu").on("touchstart", function(e) {
        e.preventDefault();
        var touch = event.targetTouches[0];
        startX = touch.pageX,
            startY = touch.pageY;
    });


    obj.addEventListener('touchmove', function(event) {
        // 如果这个元素的位置内只有一个手指的话
        if (event.targetTouches.length == 1) {　　　　
            event.preventDefault();
            var touch = event.targetTouches[0];
            moveEndX = touch.pageX,
                moveEndY = touch.pageY,
                X = moveEndX - startX,
                Y = moveEndY - startY;

            if (Math.abs(X) > Math.abs(Y) && X > 0) {
                var a = $('.mob-nav-menu').offset().left;
                if (a + 4 > 0) {
                    obj.style.left = 0 + 'px';
                } else {
                    obj.style.left = a + 4 + 'px';
                }

            } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
                var a = $('.mob-nav-menu').offset().left;
                if (a - 4 < -392) {
                    obj.style.left = -392 + 'px';
                } else {
                    obj.style.left = a - 4 + 'px';
                }
            } else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
                // alert("top 2 bottom");
            } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
                // alert("bottom 2 top");
            } else {
                // alert("just touch");
            }
            // var a = $('.mob-nav-menu').offset().left;
            // obj.style.left = a - 2 + 'px';
        }
    }, false);
}