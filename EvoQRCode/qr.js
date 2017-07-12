$(document).bind('scan_complete', scan);
function scan() {
    
    cordova.plugins.barcodeScanner.scan(
    function (result) {
        hyper.log('We got a barcode\n' +
                  'Result: ' + result.text + '\n' +
                  'Format: ' + result.format + '\n' +
                  'Cancelled: ' + result.cancelled);
        cordovaHTTP.get(result.text, {}, {}, function(response) 
            {
                hyper.log(response.status);
                hyper.log(response.data);
                if (response.data.localeCompare('test1') == 0) {
                    navigator.vibrate([100,75,100]);
                    var audio = new Audio('glass_ping.mp3');
                    audio.play();
                }
                else navigator.vibrate([500,100,500]);
                $(document).trigger('scan_complete');
            });
    },
    function (error) {
        hyper.log('Scanning failed: ' + error)
    })
    
}
