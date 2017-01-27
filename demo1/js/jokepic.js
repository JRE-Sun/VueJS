window.onload = function() {
    var app;
    var data;
    $.ajax({
        type: "get",
        url: "http://www.jresun.cn/demo/VueJS/demo1/php/jokepic.php",
        dataType: "json",
        success: function(json) {
            app = new Vue({
                el: '#app',
                data: {
                    items: json.result,
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

    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"
        ];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    if (!IsPC()) {
        $("#myimg").removeClass("img-size");
    }

    $(window).scroll(function(event) {    
        var  sm = $(this).scrollTop() + $(window).height(); 
        var  dsm = $(document).height();
        if (sm == dsm) {
            $.ajax({
                type: "get",
                url: "http://www.jresun.cn/demo/VueJS/demo1/php/jokepic.php",
                dataType: "json",
                success: function(json) {
                    for (var i = 0; i < json.result.length; i++) {
                        app.loadMore(json.result[i]);
                    }

                },
                error: function(e) {
                    console.log(e);
                }
            });
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