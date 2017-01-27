window.onload = function() {
    $.ajax({
        type: "get",
        url: "http://www.jresun.cn/demo/VueJS/demo1/php/technology.php",
        dataType: "json",
        success: function(json) {
            // alert(json);
            console.log(json);
            var app = new Vue({
                el: '#app',
                data: {
                    items: json.result.data,
                    isActive: false
                },
                methods: {
                    a: function() {
                        this.isActive = !this.isActive;
                    },
                    b: function() {
                        this.isActive = !this.isActive;
                    }
                }
            });
        },
        error: function(e) {
            console.log(e);
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
}