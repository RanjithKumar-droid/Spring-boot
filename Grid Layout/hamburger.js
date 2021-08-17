window.addEventListener('load', () => {

    $(".hamburger i").click(function () {
        $("#sidebar").toggleClass("clicked");
        $(".links a").toggleClass("clicklink");
        $(".links a i").toggleClass("clickicon");
        $(".title-container h1").toggleClass("headinghide");
        $("#main-dashboard-content").toggleClass("maincontentleft");
    })    
})