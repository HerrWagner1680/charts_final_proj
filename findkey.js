function findKey(pastedURL){
	var splitURL = pastedURL.split("/");
	splitURL.splice(0,4);

		for (i = 0; i < splitURL.length; i++) {
			if (splitURL[i].length > 40) {
				likely_key = splitURL[i];
			}
		};
// NOTE - google key is 44 characters - aka > 40

	var noQuestion = likely_key.split("?");
		for (i = 0; i < noQuestion.length; i++) {
			if (noQuestion[i].length > 40) {
				likely_key = noQuestion[i];
				// console.log("? likely: " + likely_key);
			}
		};
	var noEquals = likely_key.split("=");
		for (i = 0; i < noEquals.length; i++) {
			if (noEquals[i].length > 40) {
				likely_key = noEquals[i];
				// console.log("= likely: " + likely_key);
			}
		};
	var noHash = likely_key.split("#");
		for (i = 0; i < noHash.length; i++) {
			if (noHash[i].length > 40) {
				likely_key = noHash[i];
				// console.log("# likely: " + likely_key);
			}
		};
	var noAmp = likely_key.split("&");
		for (i = 0; i < noAmp.length; i++) {
			if (noAmp[i].length > 40) {
				likely_key = noAmp[i];
				// console.log("& likely: " + likely_key);
			}
		};	
	console.log("likely_key: " + likely_key);

	var the_json_link = "https://spreadsheets.google.com/feeds/list/" + likely_key + "/od6/public/values?alt=json";
	var json_p_version = "https://docs.google.com/spreadsheet/tq?key=" + likely_key + "#gid=0";
	var the_html_link = "https://docs.google.com/spreadsheets/d/" + likely_key + "/pubhtml";
	//console.log("likely JSON link: " + '\r' + "http://spreadsheets.google.com/feeds/list/" + likely_key + "/od6/public/values?alt=json");

	console.log("likely JSON link: " + '\r' + the_json_link);
	console.log("likely HTML link: " + '\r' + the_html_link);
	console.log("likely JSON_P link: " + '\r' + json_p_version);
};
