// SDI 1203 - Project 4
// March 19, 2012
// Matthew Richter
// Matthew's module-pattern library
/*
---JavaScript help references---
module pattern
http://www.codeproject.com/Articles/247241/Javascript-Module-Pattern & Lyndon Modomo

getCheckPhoneNumber 
http://blog.stevenlevithan.com/archives/validate-phone-number

getCheckEmail
http://www.zparacha.com/validate-email-address-using-javascript-regular-expression/#.T2k3n47mb5I 

getCheckUrl
http://snippets.dzone.com/posts/show/452

getReplaceChar
http://www.w3schools.com/jsref/jsref_replace.asp

sortArrayObj
http://www.javascriptkit.com/javatutors/arraysort2.shtml

getFixedDecimal
http://www.w3schools.com/jsref/jsref_tofixed.asp

getParseNumber
http://wap.w3schools.com/jsref/jsref_parseint.asp

getTitleCase
http://stackoverflow.com/questions/196972/convert-string-to-proper-case-with-javascript

getDaysBetweenDates
http://www.mcfedries.com/javascript/daysbetween.asp
*/

var output = function(message){ console.log (message);};


var mattsLibrary = (function() {
	var toValidatePhoneNumber 	= function (testNumber) {
		var regexObj = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		return (regexObj.test(testNumber));
	};
	var toValidateEmail 			= function (testEmail) { 
		var regexObj = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; 
   		return (regexObj.test(testEmail));
	};
	var toValidateUrl 			= function (testUrl) {
		var regexObj = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;           
		return (regexObj.test(testUrl));
	};
	var toReplaceChar				= function (string,oldChar,newChar) {
		var myString = string,
			old = new RegExp(oldChar, "g");
			return (myString.replace(old, newChar));
	};
	var toFixDecimal = function (number) {
		var newNumber;
		return (newNumber = number.toFixed(2));
	};
	var toParseNumber = function (value) {
		var value = parseInt(value);
		return value;
	};
	var toTitleCase 			= function (string) {
    	return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	};
	return {
		getCheckPhoneNumber:	function (testNumber) {
									output("Is the phone number " + testNumber + " valid? " + toValidatePhoneNumber (testNumber));
		},
		getCheckEmail:			function (testEmail) {  
   									output("Is the email address " + testEmail + " valid? " + toValidateEmail (testEmail));
   		},
   		getCheckUrl:			function (testUrl) {
									output("Is the URL " + testUrl + " valid? " + toValidateUrl (testUrl));
		},
		getReplaceChar:			function (string,oldChar,newChar) {
									output(string + ", is now, " + toReplaceChar (string,oldChar,newChar));
		},
		getFixedDecimal:		function (number) {
									output(number + ", has been changed to, " + toFixDecimal(number));
		},
		getParseNumber:			function (value) {
									output(value + ", has been changed to, " + toParseNumber(value));
		},
		getTitleCase:			function (string) {
									output(string + ", has been changed to, " + toTitleCase(string));
		}
	};
})();

mattsLibrary.getCheckPhoneNumber("83535-5475");
mattsLibrary.getCheckEmail("aaabbb.ccc");
mattsLibrary.getCheckUrl("http://www.w3schools.com/jsref/jsref_obj_regexp.asp")
mattsLibrary.getReplaceChar("aaa@bbb@ccc@ddd@eee@fff","@",",");
mattsLibrary.getFixedDecimal(3.9999999);
mattsLibrary.getParseNumber("535342 deer in the headlights years old");
mattsLibrary.getTitleCase("Now is the time to code your brains out!");

/*
^        # Assert position at the beginning of the string.
\(       # Match a literal "("...
  ?      #   between zero and one time.
(        # Capture the enclosed match to backreference 1...
  [0-9]  #   Match a digit...
    {3}  #     exactly three times.
)        # End capturing group 1.
\)       # Match a literal ")"...
  ?      #   between zero and one time.
[-. ]    # Match one character from the set "-. "...
  ?      #   between zero and one time.
⋯        # [Match the remaining digits and separator.]
$        # Assert position at the end of the string.
*/
/*
var array = ([{age:2},{age:3},{age:1}]);
var toSortKeyArrayObject 	= function (array) {
		var output = array.sort(function(a, b){return a.a-b.a;});
			return output;
};


output(array + " has been changed to " + toSortKeyArrayObject(array));
*/


/**
 *  Format phone numbers
*/
function formatPhone(phonenum) {
    var regexObj = /^(?:\+?1[-. ]?)?(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (regexObj.test(phonenum)) {
        var parts = phonenum.match(regexObj);
        var phone = "";
        if (parts[1]) { phone += "+1 (" + parts[1] + ") "; }
        phone += parts[2] + "-" + parts[3];
        return phone;
    }
    else {
        //invalid phone number
        return phonenum;
    }
}


/**
 * Format postal code
*/
function formatPostalcode(pcode) {
    var regexObj = /^\s*([a-ceghj-npr-tvxy]\d[a-ceghj-npr-tv-z])(\s)?(\d[a-ceghj-npr-tv-z]\d)\s*$/i
    if (regexObj.test(pcode)) {
        var parts = pcode.match(regexObj);
        var pc = parts[1] + " " + parts[3];
        return pc.toUpperCase();
    }
    else {
        return pcode;
    }
}























