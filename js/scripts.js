function hideMenu() {
    const menuBtn = document.querySelector(".menu-btn");
    const menu = document.querySelector(".menu");

    menuBtn.checked = false;
    menu.style.minHeight = 0;
}

// portfolio
$(".gallery ul li a").click(function () {
    var itemID = $(this).attr("href");
    $(".gallery ul").addClass("item_open");
    $(itemID).addClass("item_open");
    $("html, body").animate(
        {
            scrollTop: parseInt($("#top").offset().top)
        },
        400
    );
    return false;
});
$(".close").click(function () {
    $(".port, .gallery ul").removeClass("item_open");
    return false;
});



$('.menu li a').click(function (e) {
    e.preventDefault();

    let targetSectionId = $(this).data('section');

    let targetSection = $(targetSectionId);
    if (targetSection.length > 0) {
        $('html, body').animate({
            scrollTop: targetSection.offset().top - 50
        }, 500);
        hideMenu();
    } else {
        console.error('Section ' + targetSectionId + ' doesnt exist');
    }

    if ($(this).attr('data-section') === 'en') {
        e.preventDefault();
        let link = $(this).attr('href');
        window.location.href = link;
    }
});

$('.menu a').click(function (e) {
    e.preventDefault();

    $('.menu a').removeClass('active');

    $(this).addClass('active');
});

