$( document ).ready(function() {



var passwordStrength = 0;
selectGauge = new Gauge(document.getElementById("gauge"));
selectGauge.maxValue = 10;
selectGauge.set(0);



$( "#input" ).keyup(function() {
	var passwordString = $(this).val();
	console.log(passwordString);
  	var upperCase= new RegExp('[A-Z]');
	var lowerCase= new RegExp('[a-z]');
	var numbers = new RegExp('[0-9]');
	var symbols = new RegExp('/[-!$%^&*()_+|~=`{}\[\]:";\'<>?,.\/]/');
	if(passwordString.match(upperCase) && passwordString.match(lowerCase) && passwordString.match(numbers) && passwordString.match(symbols)){
	    passwordStrength = 10;

	}else if(passwordString.match(upperCase) && passwordString.match(lowerCase) && passwordString.match(numbers)){
	    passwordStrength = 7;

	}else if(passwordString.match(upperCase) && passwordString.match(lowerCase)){
	    passwordStrength = 4;

	}else if(passwordString.match(upperCase) || passwordString.match(lowerCase)){
	    passwordStrength = 2;

	}else{
		passwordStrength = 0;
	}
    selectGauge.set(passwordStrength);
});








});