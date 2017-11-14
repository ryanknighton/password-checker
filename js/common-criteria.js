$(document).ready(function(){

createCommonCriteria();

function createCommonCriteria(){
	var websites = ["instagram", "amazon", "dropbox", "linkedin", "google", "github" ,"facebook-official", "apple", "windows", "youtube", "twitter", "paypal"];
	var list = $('<ul class="criteria-list">');
	for(var i=0;i<websites.length;i++){
		list.append('<li><i class="fa fa-'+websites[i]+'" aria-hidden="true"></i></li>');
    }
    list.append('</ul>')
	$('#password-criteria').html(list);
}

$("#input").on("change keyup paste", function() {
		checkPassRequirements();
});
/*
  Used some different websites so I could get the logos ferom fontawesome
  SOURCE: http://passrequirements.com/list.php
  Instagram, ESPN, Amazon, Dropbox, hulu, linkedin: length >= 6
  Craigslist, google: length >= 8
  Github: at least 1 lowercase letter, 1 number, and 7 characters
  Ebay: 6 <= length <= 64, includes at least 1 number or symbol
  Facebook: length >= 6, includes at least 1 letter and symbol
  iTunes: length >= 8, at least 1 number, uppercase, lowercase letter, no spaces, cannot have same character 3 times in a row
  Microsoft: length >= 8, at least 2 uppercase, lowercase letters, numbers and symbols

*/
function checkPassRequirements() {
	$( ".fa" ).removeClass( "passes" );
  	// var websites = ["instagram-done", "amazon-done", "dropbox-done", "linkedin-done", "google-done", "github-done" ,"facebook-official-done", "apple", "windows", "youtube", "twitter", "paypal"];
  	var upperCase = new RegExp('[A-Z]');
	var lowerCase = new RegExp('[a-z]');
	var numbers = new RegExp('[0-9]');
	var symbols = new RegExp(/[@~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);
	pw = $('#input').val();
	//TODO: "apple", "windows",
	// might be easire to just remove these 2.
	//make sure the password doesn't contain a space
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
	  //for some reason the <= 32 isnt passing
	  if((pw.length >= 7 && pw.length <= 32) && (pw.match(lowerCase) || pw.match(upperCase)) && pw.match(numbers) || pw.match(symbols)){
	    $('.fa-paypal').addClass('passes');
	  }
	  if(pw.length >= 8 && pw.match(lowerCase) && pw.match(upperCase) && pw.match(numbers) && pw.match(apple) || pw.match(symbols)){
	    $('.fa-paypal').addClass('passes');
	  }
	}
}

function hasWhiteSpace(s) {
  return s.indexOf(' ') >= 0;
}

});