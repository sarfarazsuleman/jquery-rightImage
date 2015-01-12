(function ( $ ) {
  'use strict';

  $.fn.rightImage = function ( options ) {

    /**********************************************************************/
    /*********************Start Variable Declarations**********************/
    /**********************************************************************/

    /**
     * Default Settings
     * @type {Object}
     */
    var defaultSettings = {
      //Default Settings (Sizes are based on Bootstrap Media Queries)
      small : 768,
      medium : 992,
      large : 1200,
      retinaCheck : true, //Serve Retina Images when required
      appleStandard : true, //appleStandard = '@2x'. None standard = next size up
      support3x : false, //Convert 3x Images to @3x (iPhone Plus),
      debug : false //debug flag
    }

    /**
     * Import user settings and append to default
     * @type {Object}
     */
    var settings = $.extend(defaultSettings, options);

    //
    /**
     * Since there is no cross-browser supported method for detecting
     * device orientation, this is a hack to use the higher value between
     * withd and height to determine the highest possible pixel value.
     * @type {Integer}
     */
    var maxWidth = (screen.width > screen.height)?screen.width:screen.height;

    /**
     * Base Image Size
     * @type {Integer}
     */
    var baseImageSize = null;

    /**
     * True Image Size
     * @type {Integer}
     */
    var trueImageSize = null;

    /**
     * Image Suffix
     * @type {String}
     */
    var imageSuffix = null

    /**********************************************************************/
    /*************************Start Function Calls*************************/
    /**********************************************************************/

    /**
     * Calculate and Set Image Size
     *
     * @return {void}
     */
    function setImageSize(){
      //Set Base Image Size
      if (maxWidth < settings.small) {
        baseImageSize = 0; //Extra Small for mobile
      } else if (maxWidth < settings.medium) {
        baseImageSize = 1; //Small for tablets
      } else if (maxWidth < settings.large) {
        baseImageSize = 2; //Medium for desktops
      } else {
        baseImageSize = 3; //Large for larger Desktops
      }

      //Base image size is true image size (for now)
      trueImageSize = baseImageSize;

      //If retina required, but not using 2x method,
      //increment size to serve next size
      if (settings.retinaCheck && is2x() && !settings.appleStandard) {
        trueImageSize++;

        if (is3x() && settings.support3x) {
          trueImageSize++;
        }
      }
    }

    /**
     * Stringify Image Size
     * 
     * @param  {integer} imageSize
     * @return {string}
     */
    function stringifyImageSize(imageSize) {
      switch (imageSize) {
        case 0:
          return 'xs';
          break;
        case 1:
          return 'small';
          break;
        case 2:
          return 'medium';
          break;
        default:
          return 'large';
      }
    }

    /**
     * Add @2x or @3x extension if following
     * Apple standard
     * @param {string} value
     * @return {string}
     */
    function addRetinaExtension(value) {
      if (settings.retinaCheck && settings.appleStandard) {
        if (is3x()) {
          value += '@3x';
        } else if (is2x()) {
          value += '@2x';
        }
      }

      return value;
    }

    /**
     * Validate Settings to make sure clean data
     * is provided.
     * 
     * @return {void}
     * @throws {exception} If validation fails
     */
    function validateSettings() {

      //Validate size type
      if (!isInt(settings.small)) {
        throw 'small only accepts integer values.';
      }
      if (!isInt(settings.medium)) {
        throw 'medium only accepts integer values.';
      }
      if (!isInt(settings.large)) {
        throw 'large only accepts integer values.';
      }

      //validate flags type
      if (typeof settings.retinaCheck !== "boolean") {
        throw 'Value of retinaCheck needs to be a boolean.';
      }
      if (typeof settings.appleStandard !== "boolean") {
        throw 'Value of appleStandard needs to be a boolean.';
      }
      if (typeof settings.support3x !== "boolean") {
        throw 'Value of support3x needs to be a boolean.';
      }

      //Perform integrity checks
      if (settings.small >= settings.medium) {
        throw 'Value of small cannot be larger than or equal to value of medium.';
      }
      if (settings.medium >= settings.large) {
        throw 'Value of medium cannot be larger than or equal to value of large.';
      }

      //check for isInt
      function isInt(val) {
        if (typeof val !== "number" || val !== parseInt(val)) {
          return false;
        } else {
          return true;
        }
      }
    }

    /**
     * Check if Device Pixel Ratio is
     * greater than 1 (retina)
     * 
     * @return {boolean}
     */
    function is2x() {
      if (window.devicePixelRatio > 1 || 
          (window.matchMedia && 
            window.matchMedia("(-webkit-min-device-pixel-ratio: 1.1),(-moz-min-device-pixel-ratio: 1.1),(min-device-pixel-ratio: 1.1)").matches)) {
        return true;
      } else {
        return false;
      }
    }

    /**
     * Check if Device Pixel Ratio is
     * greater than 2 (iPhone 6 plus retina)
     * 
     * @return {boolean}
     */
    function is3x() {
      if (window.devicePixelRatio > 2 || 
          (window.matchMedia && 
            window.matchMedia("(-webkit-min-device-pixel-ratio: 2.1),(-moz-min-device-pixel-ratio: 2.1),(min-device-pixel-ratio: 2.1)").matches)) {
        return true;
      } else {
        return false;
      }
    }

    /**
     * Get the Right Image
     * 
     * @param  {this} instance
     * @return {string}
     */
    function getRightImage(instance) {
      var baseImage = $(instance).attr('data-baseImage');
      var image = baseImage;

      if (baseImage !== undefined) {
        var n = baseImage.lastIndexOf('.');
        var extension = baseImage.substring(n);

        image = baseImage.substring(0,n) + '-' + imageSuffix + extension;
      }

      $(instance).attr('src', image);

      return image;
    }

    /**
     * Create a summary of the output (for debug use only)
     *
     * @param {string} imageSrc
     * @return {void}
     */
    function summarize(imageSrc) {
      var data = 'Screen Width: ' + screen.width + '<br />';
      data += 'Screen Height: ' + screen.height + '<br />';
      data += 'Max Width: ' + maxWidth + ' (Uses Height if height is larger than width, to support orientation change)<br />';
      data += 'Perform Retina Check: ' + settings.retinaCheck + '<br />';
      data += 'Follow Apple Standard (@2x, @3x): ' + settings.appleStandard + '<br />';
      data += 'Support3x: ' + settings.support3x + '<br />';
      data += 'is2x: ' + is2x() + '<br />';
      data += 'is3x: ' + is3x() + '<br />';
      data += 'Base Image Size: ' + stringifyImageSize(baseImageSize) + '<br />';
      data += 'True Image Size: ' + stringifyImageSize(trueImageSize) + '<br />';
      data += 'Image Suffix: '+ imageSuffix + '<br />';
      data += 'Final Image Source: ' + imageSrc + '<hr />';;

      $("#results").append(data);
    }

    /**********************************************************************/
    /**************************Make Function Calls*************************/
    /**********************************************************************/
    validateSettings();
    setImageSize();
    imageSuffix = addRetinaExtension(stringifyImageSize(trueImageSize));

    //Return this to maintain chainability
    return this.each(function (){
      //Get the right Image
      var image = getRightImage(this);

      //Summarize Output
      if (settings.debug) {
        summarize(image);
      }
    });
  };
}(jQuery));