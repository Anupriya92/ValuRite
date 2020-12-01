
var $;
  
function newsContainer(index) {
    $(".news-content").hide();
    $(".news-links").removeClass("active-link");
    $(".news-content:eq(" + index + ")").show();
    $(".news-links:eq(" + index + ")").addClass("active-link");
} 