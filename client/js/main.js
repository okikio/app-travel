var $ = window.$;
$(".navbar-menu").click(function() {
    $(".navbar:not(.nav2)").toggleClass("navbar-list-show");
    $(".navbar:not(.nav2).navbar-list-show li.navbar-link").animate({
        opacity: "1"
    }, 500, "swing");
    $(".navbar:not(.nav2):not(.navbar-list-show) li.navbar-link").animate({
        opacity: "0"
    }, 100, "swing");
});

function _scroll() {
    $(".navbar-link, .navbar, .navbar-menu, .sidebar").each(function(indx) {
        var type, $link = $(this),
            link = this.getBoundingClientRect();
        $(".scroll-snap").each(function(i) {
            var $snap = $(this),
                snap = this.getBoundingClientRect();
            if (link.bottom >= snap.top &&
                link.top <= snap.bottom) {
                type = $snap.hasClass("light") || $snap.hasClass("layer-intro") && $(document).width() < 700 ? "nav-white" : "nav-black";
                $link.addClass(type);
            }
            $link.removeClass(type === "nav-white" ? "nav-black" :
                (type === "nav-black" ? "nav-white" : "nav-black"));
        });
    });
}
$(window).scroll(_scroll);
$(window).resize(_scroll);
_scroll();

var prev = "<button class='slick-prev slick-arrow' aria-label='Previous' type='button'>Previous</button>";
var next = "<button class='slick-next slick-arrow' aria-label='Next' type='button'>Next</button>";

$('.slide').slick({
    prevArrow: prev, nextArrow: next,
    autoplay: true, arrows: true,
});
