window.onload = function() {
    var app;
    var data;
    $.ajax({
        type: "get",
        url: "http://www.jresun.cn/demo/VueJS/demo1/php/jokeword.php",
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
        error: function() {
            alert('fail');
        }
    });


    $(window).scroll(function(event) {    
        var  sm = $(this).scrollTop() + $(window).height(); 
        var  dsm = $(document).height();
        if (sm == dsm) {
            $.ajax({
                type: "get",
                url: "http://www.jresun.cn/demo/VueJS/demo1/php/jokeword.php",
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
        spaceBetween: 5,
        freeMode: false
    });
}