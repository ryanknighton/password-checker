function getStrength(pw) {
  /*
    Rules we should consider adding:
    Shouldn't contain dictionary words or names unless
    utilizing the random word strategy
    Not beginning with a symbol character
  */
  var pw = $(this).val();
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
    strength +=1;
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
      length: 1, // // Relative to gauge radius
      strokeWidth: 0.035, // The thickness
      color: '#000000' // Fill color
    },
    colorStart: '#6FADCF',   // Colors
    colorStop: '#8FC0DA',    // just experiment with them
    strokeColor: '#E0E0E0',  // to see which ones work best for you
    generateGradient: true,
  };

  let target = document.getElementById('gauge');
  let gauge = new Gauge(target).setOptions(opts);
  gauge.maxValue = 10;
  gauge.set(0);

  $("#input").on("change keyup paste", function() {
    let strength = getStrength(pw);
    gauge.set(strength);
  });

});
