function getStrength(pw) {
  /*
    Rules we should consider adding:
    Shouldn't contain dictionary words or names unless
    utilizing the random word strategy
    Not beginning with a symbol character
  */
  var upperCase= new RegExp('[A-Z]');
  var lowerCase= new RegExp('[a-z]');
  var numbers = new RegExp('[0-9]');
  var symbols = new RegExp(/[@~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);

  let hasSym = symbols.test(pw);
  let hasUpper = upperCase.test(pw);
  let hasLower = lowerCase.test(pw);
  let hasNum = numbers.test(pw);

  let strength = 0;

  if(pw.length > 11) {
    strength += 1;
  } else {
    setMessage("Your password is long enough, but could" +
              " be more secure if it were longer.");
  }

  if(hasSym) {
    strength += 1;
  } else {
    setMessage("Symbols add variability to your password," +
              " making it harder to crack.");
  }

  if(hasNum) {
    strength += 1;
  } else {
    setMessage("Mix numbers into your password, either by replacing letters" +
              " with numbers or breaking up dictionary words with numbers," +
              " but avoid easy to guess numbers like your address" +
              " or birthday.");
  }

  if(hasNum && hasSym) {
    strength += 1;
  }

  if(hasUpper || hasLower) {
    strength += 1;
  }

  if(hasUpper && hasLower) {
    strength += 1;
  } else {
    setMessage("Try mixing upper and lower-case letters.");
  }

  if(pw.length > 7) {
    strength += 1;
  } else {
    setMessage("Secure passwords are at least 8 characters.");
  }

  return strength;
}

function setMessage(string) {
  document.getElementById('preview-textfield').innerHTML = string;
}

$(document).ready(function() {
  var opts = {
    angle: 0.15, // The span of the gauge arc
    lineWidth: 0.44, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
      length: 0.85, // // Relative to gauge radius
      strokeWidth: 0.035, // The thickness
      color: '#000000' // Fill color
    },
    percentColors: [[0.0, "#F03E3E" ], [0.50, "#FFDD00"], [1.0, "#30B32D"]],
    strokeColor: '#E0E0E0',  // to see which ones work best for you
    generateGradient: true,
  };

  let target = document.getElementById('gauge');
  let gauge = new Gauge(target).setOptions(opts);
  gauge.maxValue = 8;
  gauge.set(0);

  $("#input").on("change keyup paste", function() {
    let pw = $(this).val();
    let strength = getStrength(pw);
    gauge.set(strength);

    let hashed = SHA1(pw);
    warnUser(hashed);
  });

  /**
  *  Secure Hash Algorithm (SHA1)
  *  http://www.webtoolkit.info/
  **/
  function SHA1(msg) {
    function rotate_left(n,s) {
      var t4 = ( n<<s ) | (n>>>(32-s));
      return t4;
    };
    function lsb_hex(val) {
      var str="";
      var i;
      var vh;
      var vl;
      for( i=0; i<=6; i+=2 ) {
        vh = (val>>>(i*4+4))&0x0f;
        vl = (val>>>(i*4))&0x0f;
        str += vh.toString(16) + vl.toString(16);
      }
      return str;
    };
    function cvt_hex(val) {
      var str="";
      var i;
      var v;
      for( i=7; i>=0; i-- ) {
        v = (val>>>(i*4))&0x0f;
        str += v.toString(16);
      }
      return str;
    };
    function Utf8Encode(string) {
      string = string.replace(/\r\n/g,"\n");
      var utftext = "";
      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
          utftext += String.fromCharCode(c);
        }
        else if((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
      }
      return utftext;
    };
    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;
    msg = Utf8Encode(msg);
    var msg_len = msg.length;
    var word_array = new Array();
    for( i=0; i<msg_len-3; i+=4 ) {
      j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
      msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
      word_array.push( j );
    }
    switch( msg_len % 4 ) {
      case 0:
        i = 0x080000000;
      break;
      case 1:
        i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
      break;
      case 2:
        i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
      break;
      case 3:
        i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8  | 0x80;
      break;
    }
    word_array.push( i );
    while( (word_array.length % 16) != 14 ) word_array.push( 0 );
    word_array.push( msg_len>>>29 );
    word_array.push( (msg_len<<3)&0x0ffffffff );
    for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
      for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
      for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
      A = H0;
      B = H1;
      C = H2;
      D = H3;
      E = H4;
      for( i= 0; i<=19; i++ ) {
        temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
        E = D;
        D = C;
        C = rotate_left(B,30);
        B = A;
        A = temp;
      }
      for( i=20; i<=39; i++ ) {
        temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
        E = D;
        D = C;
        C = rotate_left(B,30);
        B = A;
        A = temp;
      }
      for( i=40; i<=59; i++ ) {
        temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
        E = D;
        D = C;
        C = rotate_left(B,30);
        B = A;
        A = temp;
      }
      for( i=60; i<=79; i++ ) {
        temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
        E = D;
        D = C;
        C = rotate_left(B,30);
        B = A;
        A = temp;
      }
      H0 = (H0 + A) & 0x0ffffffff;
      H1 = (H1 + B) & 0x0ffffffff;
      H2 = (H2 + C) & 0x0ffffffff;
      H3 = (H3 + D) & 0x0ffffffff;
      H4 = (H4 + E) & 0x0ffffffff;
    }
    var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

    return temp.toLowerCase();
  }

  function warnUser(pw) {
    urlString = "https://haveibeenpwned.com/api/v2/pwnedpassword/" + pw;
    fetch(urlString).then(
        function(response) {
            let msg = document.getElementById('warning');
            if(response.status === 200) {
              msg.innerHTML = "Warning your may have been exposed. ";
              msg.innerHTML += '<a href="https://haveibeenpwned.com/Passwords">See more...</a>';
            }else if (response.status === 404) {
              msg.innerHTML = "";
            } else {
              console.log('response code error');
            }
        }
    );
  }
});
