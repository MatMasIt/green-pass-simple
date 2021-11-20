
function hexStringToArrayBuffer(hexString) {
    //https://gist.github.com/don/871170d88cf6b9007f7663fdbc23fe09#file-hexstringtoarraybuffer-js
    // remove the leading 0x
    hexString = hexString.replace(/^0x/, '');

    // ensure even number of characters
    if (hexString.length % 2 != 0) {
        console.log('WARNING: expecting an even number of characters in the hexString');
    }

    // check for some non-hex characters
    var bad = hexString.match(/[G-Z\s]/i);
    if (bad) {
        console.log('WARNING: found non-hex characters', bad);
    }

    // split the string into pairs of octets
    var pairs = hexString.match(/[\dA-F]{2}/gi);

    // convert the octets to integers
    var integers = pairs.map(function (s) {
        return parseInt(s, 16);
    });

    var array = new Uint8Array(integers);
    return array.buffer;
}

function buf2hex(buffer) {
    // https://stackoverflow.com/questions/34309988/byte-array-to-hex-string-conversion-in-javascript
    var u = new Uint8Array(buffer),
        a = new Array(u.length),
        i = u.length;
    while (i--) // map to hex
        a[i] = (u[i] < 16 ? '0' : '') + u[i].toString(16);
    u = null; // free memory
    return a.join('');
};

function typedArrayToBuffer(array) {
    // https://stackoverflow.com/questions/37228285/uint8array-to-arraybuffer
    return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset)
}