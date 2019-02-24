console.log("Inside authoring dialog validation.");

(function($, window, document) {

    var registry = $(window).adaptTo("foundation-registry");
// Validator for News Description - Custom logic to validate and restrict content length to 140 characters
// Do not use the JQuery validation approach, since it is deprecated, but maintained for backward compatibility
// Use Foundation Validation Validator hence forth.
// START
    registry.register("foundation.validation.validator", {
        selector: "[data-news-title-maxlength]",
        validate: function(el) {
            var dataLength = el.getAttribute("data-news-title-maxlength");
            var element = $(el);
            var value = element.val();
            var errorObject = "";
            if (value.length == 0) {
                errorObject = "Please enter the News Title";
            } else if (value.length > dataLength) {
                errorObject = "Please enter the News Title, and less than " + dataLength + " characters";
            }
            return errorObject;
        }
    });
    registry.register("foundation.validation.validator", {
        selector: "[data-news-short-description-maxlength]",
        validate: function(el) {
            var dataLength = el.getAttribute("data-news-short-description-maxlength");
            var element = $(el);
            var value = element.text();

            var errorObject = "";
            if (value.length == 0) {
                errorObject = "Please enter News Short Description";
            } else if (value.length > dataLength) {
                errorObject = "Please enter News Short Description, which is less than " + dataLength + " characters";
            }
            return errorObject;
        }
    });
})
($, window, document);
