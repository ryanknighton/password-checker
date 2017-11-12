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

	var passwordStrength = 0;
	let target = document.getElementById('gauge');
	let gauge = new Gauge(target).setOptions(opts);
	gauge.maxValue = 10;
	gauge.set(0);

	$("#input").change(function() {
		var pw = $(this).val();
  	var upperCase= new RegExp('[A-Z]');
		var lowerCase= new RegExp('[a-z]');
		var numbers = new RegExp('[0-9]');
		var symbols = new RegExp('/[-!$%^&*()_+|~=`{}\[\]:";\'<>?,.\/]/');

		let hasSym = pw.match(symbols);
		let hasUpper = pw.match(upperCase);
		let hasLower = pw.match(lowerCase);
		let hasNum = pw.match(numbers);

		console.log("Sym:", hasSym);

		if(hasUpper && hasLower && hasNum && hasSym) {
		    passwordStrength = 10;
		}else if(hasUpper && hasLower && hasNum) {
		    passwordStrength = 7;
		}else if(hasUpper && hasLower) {
		    passwordStrength = 4;
		}else if(hasUpper || hasLower) {
		    passwordStrength = 2;
		}else{
			passwordStrength = 0;
		}

	  gauge.set(passwordStrength);
	});

});
