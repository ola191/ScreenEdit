# ScreenEdit - Readme

#### ScreenEdit is a javascript library that creates a window (div) that listens to the browser and can cut out part of the screen and insert it into an image. It can also convert cropped screenshot to base64 for input

## Authors

- [@ola191 - Ola Krassowska](https://github.com/ola191)


## Usage/Examples

> #### **$1** In the html code add tags:

```html
<head>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

</head>
```
```html
<body>

    <div class="screenshotToolContainer" zoomSpeed=0.1 moveSpeed=50 canvasWidth="250"></div>

    <img class="screenshotToolInput myClass" id="myId" src="">

    <input class="blobData" name="blobData" src="" type="hidden">

</body>
```

> import library file
```html
<body>

    <script src="minify_ScreenEdit.js" defer></script>

    <!--<script src="versions/production_ScreenEdit.js" defer></script>-->

    <!--<script src="versions/obfuscator_ScreenEdit.js" defer></script>-->
    
</body>
```

> #### **$2** add the file minify_ScreenEdit.js to the folder with the html file


## License

[MIT](https://choosealicense.com/licenses/mit/) , The software is available under the MIT license. This means that you can use, modify, and distribute it without restriction.

## References
 - [Main Website](https://nomartnotes.eu)
 - [Profile Github](https://github.com/ola191)


