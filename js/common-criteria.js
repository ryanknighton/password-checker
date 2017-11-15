$(document).ready(function(){
$('[data-toggle="tooltip"]').tooltip();
createCommonCriteria();

function createCommonCriteria(){
	var websites = ["instagram", "amazon", "dropbox", "linkedin", "google",
	"github" ,"facebook-official", "snapchat-square", "skype", "youtube",
	"twitter", "paypal"];
	var tooltips = ["Instagram passwords must be longer than 5 characters.",
 	"Amazon passwords must be longer than 5 characters.",
 	"Dropbox passwords must be longer than 5 characters.",
 	"LinkedIn passwords must be longer than 5 characters.",
 	"Google passwords must be longer than 7 characters.",
 	"Github passwords must be longer than 6 characters and must contain either lowercase/uppercase letters and at least one number.",
 	"Facebook passwords must be longer than 6 characters and must contain either lowercase/uppercase letters and at least one special character.",
 	"Snapchat passwords must be longer than 7 characters and contain either lower/uppercase letters and numbers or special characters.",
 	"Skype passwords must be between 6 and 20 characters with lower/uppercase letters and at least one number.",
 	"YouTube passwords must be longer than 7 characters.",
 	"Twitter passwords must be longer than 5 characters.",
 	"Paypal passwords must be between 7 and 32 characters with lower/uppercase letters and numbers or special characters."];

	var list = $('<ul class="criteria-list">');
	for(var i=0;i<websites.length;i++){
		list.append('<li data-toggle="tooltip" title="'+
		tooltips[i]+'"><i class="fa fa-'+
		websites[i]+'" aria-hidden="true"></i></li>');
  }
  list.append('</ul>');
	$('#password-criteria').html(list);
}

$("#input").on("change keyup paste", function() {
		checkPassRequirements();
});

function checkPassRequirements() {
	$( ".fa" ).removeClass( "passes" );
  	var upperCase = new RegExp('[A-Z]');
	var lowerCase = new RegExp('[a-z]');
	var numbers = new RegExp('[0-9]');
	var symbols = new RegExp(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/);
	var pw = $('#input').val();
	if(pw != "" && !hasWhiteSpace(pw)){
	  if(pw.length >= 6){
	    $('.fa-instagram').addClass('passes');
	    $('.fa-amazon').addClass('passes');
	    $('.fa-dropbox').addClass('passes');
	    $('.fa-linkedin').addClass('passes');
	    $('.fa-twitter').addClass('passes');
	  }
	  if(pw.length >= 8){
	    $('.fa-google').addClass('passes');
	    $('.fa-youtube').addClass('passes');
	  }
	  if(pw.length >= 7 && (pw.match(lowerCase)|| pw.match(upperCase)) && pw.match(numbers)){
	    $('.fa-github').addClass('passes');
	  }
	  if(pw.length >= 6 && (pw.match(lowerCase)|| pw.match(upperCase)) && pw.match(symbols)){
	    $('.fa-facebook-official').addClass('passes');
	  }
	  if((pw.length >= 7 && pw.length <= 32) && (pw.match(lowerCase) || pw.match(upperCase)) && (pw.match(numbers) || pw.match(symbols))){
	    $('.fa-paypal').addClass('passes');
	  }
	  if((pw.length >= 6 && pw.length <= 20) && (pw.match(lowerCase) || pw.match(upperCase)) && pw.match(numbers)){
	    $('.fa-skype').addClass('passes');
	  }
	  if(pw.length >= 8  && (pw.match(lowerCase) || pw.match(upperCase)) && pw.match(numbers) || pw.match(symbols)){
	    $('.fa-snapchat-square').addClass('passes');
	  }
	}
}

function hasWhiteSpace(s) {
  return s.indexOf(' ') >= 0;
}

});
