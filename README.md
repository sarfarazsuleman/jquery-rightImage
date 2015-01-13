# jquery.rightImage
jQuery Plugin to serve the right image based on viewport and retina compatibilites.

## Purpose
The purpose of this plugin is to be used on a responsive site to serve the largest image that your device will support. The ideal use of this plugin is when images on all viewports share a common aspect ratio.

For example:
- If you were viewing you site in full screen on a deskop, you would get the large image version.
- If you were viewing your site as a mobile site on a deskop, you would still get the large image because you can still strech your window into full screen mode at any time. (The exception here is when you use the device mode in Chrome, you will see the largest image for the device viewport that you select).
- If you were viewing your site on a tablet, you would see the tablet image (i.e. small or medium depending on tablet)
- If you were viewing the site on a mobile device, you would see the mobile image.
- If you were viewing the site on any device with `retinaCheck` enabled, you would see the retina compatible image if your device supported retina.

## Installation
Include script after the jQuery library (unless you are packaging scripts somehow else):
```html
<script src="/path/to/jquery.rightimage.js"></script>
```

## Syntax
Set image tag with base image URL (note: you may add a loader image as the `src` value or leave it black and let jQuery do the magic on load)
```html
<img data-baseImage="[Link to base image here]" />
```

Set the `selector` to look for the specific image tags you wish to replace (i.e. tags with the `data-baseImage` attribute)
```javascript
$(selector).rightImage([optional configuration settings here]);
```

## Configuration

### Default Settings

The sizes below mimic the default Twitter Bootstrap media queries. Any device smaller than small (768px) will be marked as extra small (xs) by default. You can override any of these defaults by passing a JSON object with your desired settings.

```javascript
{
  small : 768, // Minimum threshold for Tablets
  medium : 992, // Minimum threshold for Desktops
  large : 1200, // Minimum threshold for Large Destkops
  retinaCheck : true, //Serve Retina Images when required
  appleStandard : true, //appleStandard = '@2x'. None standard = next size up
  support3x : false, //Convert 3x Images to @3x (iPhone Plus),
  debug : false //debug flag
}
```

### Settings Explained

**small**

Width values smaller than `small` will be marked `extra small (xs)`.

**medium**

Width values smaller than `medium` will be marked `small`.

**large**

Width values smaller than `large` will be marked `medium` and anything larger than or equal to `large` will be marked as `large`.

**retinaCheck**

This flag determines if the plugin should serve retina compatible images.

**appleStandard**

This flag determines if the plugin should serve the Apple Standard for retina images (i.e. `@2x` and `@3x` suffix). If `appleStandard = false` the next size up will be used (and if `3xSupport = true` two sizes up will be showed).

**suppport3x**

This flag determines if the plugin should serve 3x images where necessary (mainly used for the iPhone 6 Plus).

**debug**

When true, this will print debug to the console and to any element containing the `rightImageSummary` id.


**WARNING: rightImage plugin does not use Global Configurations. All configuration items must be passed as a JSON object on every call to `rightImage()`**

##Possible Extensions
Base URL: `http://example.com/image.png`

Extra Small(xs): `http://example.com/image-xs.png`

Small: `http://example.com/image-small.png`

Medium: `http://example.com/image-medium.png`

Large: `http://example.com/image-large.png`

Extra Small(xs) 2x: `http://example.com/image-xs@2x.png`

Small 2x: `http://example.com/image-small@2x.png`

Medium 2x: `http://example.com/image-medium@2x.png`

Large 2x: `http://example.com/image-large@3x.png`

Extra Small(xs) 3x: `http://example.com/image-xs@3x.png`

Small 3x: `http://example.com/image-small@3x.png`

Medium 3x: `http://example.com/image-medium@3x.png`

Large 3x: `http://example.com/image-large@3x.png`

##Usage Example
JavaScript
```javascript
$(document).ready(function() {
    $('img[data-baseImage].AppleStandard').rightImage({debug : true, appleStandard : true});
    $('img[data-baseImage]:not(".AppleStandard")').rightImage({debug : true, support3x : true, appleStandard : false});
});
```
HTML
```html
<p id="rightImageSummary"></p>
<img data-baseImage="http://example.com/base.jpeg" class="AppleStandard" />
<img data-baseImage='http://example.com/image.png' />
```
