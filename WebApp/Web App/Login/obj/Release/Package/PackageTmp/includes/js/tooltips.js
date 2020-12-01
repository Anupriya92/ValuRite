var pagx;
var pagy;
var tooltipid = 0;
$(document).on("mousemove", function (event) {
    pagx = event.pageX;
    pagy = event.pageY;
});
// IIFE to ensure safe use of $
(function ($) {

    // Create plugin
    $.fn.tooltips = function (el) {

        var $tooltip,
          $body = $('body'),
          $el;

        // Ensure chaining works
        return this.each(function (i, el) {

            $el = $(el).attr("data-tooltip", tooltipid);

            //Make DIV and append to page 
            var $tooltip = $('<div class="tooltip" data-tooltip="' + tooltipid + '">' + $el.attr('title') + '<div class="arrow"></div></div>').appendTo("body");
            tooltipid++;

            // Position right away, so first appearance is smooth
            var linkPosition = $el.position();
            $tooltip.css({
                top: pagy + "px", left: pagx + "px"
            });

            $el
            // Get rid of yellow box popup
            .removeAttr("title")

            // Mouseenter
            .hover(function () {

                $el = $(this);

                $tooltip = $('div[data-tooltip=' + $el.data('tooltip') + ']');

                // Reposition tooltip, in case of page movement e.g. screen resize                        
                var linkPosition = $el.position();

                $tooltip.css({
                    top: pagy + "px", left: pagx + "px"
                });

                // Adding class handles animation through CSS
                $tooltip.addClass("active");

                // Mouseleave
            }, function () {

                $el = $(this);

                // Temporary class for same-direction fadeout
                $tooltip = $('div[data-tooltip=' + $el.data('tooltip') + ']').addClass("out");

                // Remove all classes
                setTimeout(function () {
                    $tooltip.removeClass("active").removeClass("out");
                });

            })

            .on("click",function () {
                // Temporary class for same-direction fadeout
                $tooltip = $('div[data-tooltip=' + $el.data('tooltip') + ']').addClass("out");

                // Remove all classes
                setTimeout(function () {
                    $tooltip.removeClass("active").removeClass("out");
                });
            
            
            })

        });

    }

})(jQuery);