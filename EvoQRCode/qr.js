$(document).bind('scan_complete', scan);
function scan() {
    
    cordova.plugins.barcodeScanner.scan(
    function (result) {
        url = 'https://script.google.com/macros/s/AKfycbxS6RO5BMZWfI1PcLBTIGKGE85h5BnSS7PxD7Z88xiLnRFna-9F/exec'; // script url from web app
        cordova.plugins.barcodeScanner.scan( //Open barcode scanning plugin
        function (result) {
            hyper.log('We got a barcode\n' +
                  'Result: ' + result.text + '\n' +
                  'Format: ' + result.format + '\n' +
                  'Cancelled: ' + result.cancelled);
        cordovaHTTP.get(url + '?query=' + result.text, {}, {}, function(response) //get JSON string from GAS
            {
                hyper.log(response.status); //Log JSON
                hyper.log(response.data);
                if (response.data.localeCompare('test1') == 0) {
                    navigator.vibrate([100,75,100]);
                    var audio = new Audio('glass_ping.mp3'); //Play sound
                    audio.play();
                }
                else navigator.vibrate([500,100,500]);
                $(document).trigger('scan_complete'); //Restart scan automatically once we're done
            });
    },
    function (error) {
        hyper.log('Scanning failed: ' + error)
    })
    
}
