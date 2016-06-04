/**
 * ezar.js
 * Copyright 2015, ezAR Technologies
 * Licensed under a modified MIT license, see LICENSE or http://ezartech.com/ezarstartupkit-license
 * 
 * @file Implements the ezar api for controlling device cameras, 
 *  zoom level and lighting. 
 * @author @wayne_parrott, @vridosh, @kwparrott
 * @version 0.1.0 
 */

var exec = require('cordova/exec'),
    argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils');

module.exports = (function() {
           
	 //--------------------------------------
    var _snapshot = {};
        
    /**
     * Create a screenshot image
     *
     * options = {
     *   "saveToPhotoAlbum": true, 
     *   "encoding": _snapshot.ImageEncoding.JPEG 
     *   "includeCameraView": true,
     *   "includeWebView": true}
     */
    
    _snapshot.snapshot = function(successCallback,errorCallback, options) {
                  
        //options impl inspired by cordova Camera plugin
        options = options || {};
        var getValue = argscheck.getValue;
        var encoding = getValue(options.encoding, _snapshot.ImageEncoding.JPEG);
        var saveToPhotoAlbum = options.saveToPhotoAlbum === undefined ? true : !!options.saveToPhotoAlbum;
        var includeCameraView = options.includeCameraView === undefined ? true : !!options.includeCameraView;
        var includeWebView = options.includeWebView === undefined ? true : !!options.includeWebView;
                  
        var onSuccess = function(imageData) {
            var encoding = encoding == _snapshot.ImageEncoding.JPEG ? 
                _snapshot.ImageEncoding.JPEG : _snapshot.ImageEncoding.PNG;
            var dataUrl = "data:image/" + encoding + ";base64," + imageData;
            if (successCallback) {
                  successCallback(dataUrl);
            }
        };
                  
        exec(onSuccess,
             errorCallback,
             "snapshot",
             "snapshot",
            [encoding, saveToPhotoAlbum, includeCameraView, includeWebView]);

    }
                  
    _snapshot.ImageEncoding = {
        JPEG: 0,             // Return JPEG encoded image
        PNG: 1               // Return PNG encoded image
    };

    
    return _snapshot;
    
}());

