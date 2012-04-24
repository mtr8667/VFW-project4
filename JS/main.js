// Matthew RIchter 
// Visual frameworks - Full Sail University
// Project: Web App Part 4
// April 23, 2012
// Wait until the DOM is ready 	
window.addEventListener("DOMContentLoaded", function(){	
	// getElementById function
	function $(x) {
		var 	theElement = document.getElementById(x);
	return 	theElement;
	}
	// Create select field element and populate it with options (types of projects)
	function makeProjectTypes (){
		var 	formTag = document.getElementsByTagName("form"), //formTag is an array of all the form tags
				selectLi = $("select"),
				makeSelect = document.createElement("select");
				makeSelect.setAttribute("id", "project");
		for 	(var i=0, j=projectTypes.length; i<j; i++) {
				var makeOption = document.createElement("option");
				var optText = projectTypes[i];
				makeOption.setAttribute("value", optText);
				makeOption.innerHTML = optText;
				makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);		
	}	
	// Find the value of a selected radial button ,
	function getSelectedRadio(){
		var radios = document.forms[0].cost;
		for( var i=0; i < radios.length; i++){
			if(radios[i].checked){
			cost = radios[i].value;
			}
		}
	}
	function getCheckboxValue(){
		if($("emailOkay").checked){
			emailOkay	=	$("emailOkay").value;
		}else{
			emailOkay 	=	"No"
		}
	}	
	function toggleControls(n){
		switch(n){
			case "on":
					$("projectForm").style.display = "none";
					$("clearProjectsLink").style.display = "inline";
					$("showProjectsLink").style.display = "none";
					$("newProject").style.display = "inline";
					$("footer").style.display = "none";
					break;
			case "off":
					$("projectForm").style.display = "block";
					$("clearProjectsLink").style.display = "inline";
					$("showProjectsLink").style.display = "inline";
					$("newProject").style.display = "none";
					$("items").style.display = "none";
					break;
			default:
					return false;
		}
	}	
	// the key is only generated when we are editing a project so if there is no key its a new project
	function saveLocal(key){
		if(!key){
			var 	id 						= Math.floor(Math.random()*10000001);
		}else{
			//set the id to the existing key we're editing so the data will be modified and we'll save over the original data
			//this key has been passed along from the editSaveProject eventListener to the validate function then passed here
			// into storeLocal function
			id = key;
		}
		// get all the form field values and store them in an object.
		// the object properties contain an array with the form label and input value.
		getSelectedRadio();
		getCheckboxValue();
		var	item 					= {};
				item.project		= ["Project Type:", $("project").value];
				item.pname 		= ["Project Name:", $("pname").value];
				item.fname 		= ["First Name:", $("fname").value];
				item.lname 			= ["Last Name:", $("lname").value];
				item.email 			= ["Email:", $("email").value];
				item.phone 			= ["Phone:", $("phone").value];			
				item.emailOkay 	= ["Communicate Via email:", emailOkay];
				item.cost			= ["Price per sq ft.", cost];			
				item.priority 		= ["Priority", $("priority").value];
				item.startDate		= ["Start Date", $("startDate").value];
				item.jobNotes 		= ["Job Notes", $("jobNotes").value];
		// Save data into local storage : use stringify to convert our object to a string.
		localStorage.setItem(id, JSON.stringify(item));	
		alert("Your project has been saved successfully!");			
	} 
	// Write data from localStorage to the browser
	function getProjects(){
		toggleControls("on");
		if(localStorage.length === 0 ){
			alert("There is no data in local storage so default data has been added.");
			autoFillData();
		}
		var makeDiv	= document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "block";
		for( var i = 0, len=localStorage.length; i<len; i++){
			var makeLi = document.createElement("li");
			var linksLi	= document.createElement("li");
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			// Convert the string from localStorage value back to an object using JSON.parse
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeLi.appendChild(makeSubList);
			getImage(obj.project[1], makeSubList);
			for(var n in obj){
				var makeSubLi = document.createElement("li");
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
				}
				// create links/buttons (edit & delete) for each project in local storage
				makeItemLinks(localStorage.key(i), linksLi); 
		}
	}
	// Get the project image for current project being displayed
	function getImage(projectName, makeSubList){
		var imageLi = document.createElement("li");
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement("img");
		var setSrc = newImg	.setAttribute("src", "images/" + projectName + ".png");
		imageLi.appendChild(newImg);
	}
	// Auto populate local storage from json
	// actual json object data for this to work will come from json.js which is loaded from HTML page
	// the main.js and json.js files can see eachothers variables - that's why we can loop through json in the main.js file
	function autoFillData(){
		for( var n in json){
			var 	id 	= Math.floor(Math.random()*10000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	// This function is going to create the link/buttons for each project when accessed
	// make item links/buttons for each project
	function makeItemLinks(key, linksLi){
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Project";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		// add line break
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Project";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	// function to allow us to pull a project from local storage and edit an item
	function editItem(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		// show the add project form
		toggleControls("off");
		// pull in the data of the current project from local storage
		$("project").value 	= item.project[1];
		$("pname").value 	= item.pname[1];
		$("fname").value 	= item.fname[1];
		$("lname").value 		= item.lname[1];
		$("email").value 		= item.email[1];
		$("phone").value 		= item.phone[1];
		var radios = document.forms[0].cost;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "low" && item.cost[1] == "low"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "medium" && item.cost[1] == "medium"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "high" && item.cost[1] == "high"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		if(item.cost[i] == "Yes"){
			$("cost").setAttribute("checked", "checked");
		}
		$("priority").value = item.priority[1];
		$("startDate").value = item.startDate[1];
		$("jobNotes").value = item.jobNotes[1];
		// remove the initial eventListener from the save project button
		save.removeEventListener("click", saveLocal);
		// change save project buttom value to say edit project button
		$("saveProject").value = "Edit Project";
		var editSaveProject = $("saveProject");
		// saving key value in this function as a property of the editSaveProject event 
		// so we can use that value when we save the edited project
		editSaveProject.addEventListener("click", validate);
		editSaveProject.key = this.key;
	}
	// 
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this project?");
		if(ask){
			localStorage.removeItem(this.key);
			window.location.reload();
		}else{
			alert("Project was not deleted.");
		}
	}
	function deleteProject(){
		if(localStorage.length === 0){
			alert("There are no projects to delete.")
		}else{
			localStorage.clear();
			alert("All projects have been deleted!");
			window.location.reload();
			return false;
		}
	}
	// in the validate function we are passing in the eventData that we usually don't see 
	function validate(e){
		// define the elements that we want to check 
		var getProjectType 		= $("project");
		var getProjectName		= $("pname");
		var getFname 				= $("fname");
		var getLname 				= $("lname");
		var getEmail 				= $("email");
		var getPhone 				= $("phone");
		// reset error messages
		errorMessage.innerHTML 		= "";
		getProjectType.style.border 	= "1px solid black";
		getProjectName.style.border 	= "1px solid black";
		getFname.style.border 			= "1px solid black";
		getLname.style.border 			= "1px solid black";
		getEmail.style.border 			= "1px solid black";
		getPhone.style.border 			= "1px solid black";
		// get error messages 
		var messageArray = [];
		// Project type validation
		if(getProjectType.value === "- Select Project -"){
			var projectTypeError = "Please choose a project type.";
			getProjectType.style.border = "1px solid red";
			messageArray.push(projectTypeError);
			alert("Please remember to select a project type and enter data in all the required fields.");
		}
		// Project name validation
		if(getProjectName.value === ""){
			var projectNameError = "Please enter a project name.";
			getProjectName.style.border = "1px solid red";
			messageArray.push(projectNameError);
		}
		// First name validation
		if(getFname.value === ""){
			var fNameError = "Please enter a first name.";
			getFname.style.border = "1px solid red";
			messageArray.push(fNameError);
		}
		// Last name validation
		if(getLname.value === ""){
			var lNameError = "Please enter a last name.";
			getLname.style.border = "1px solid red";
			messageArray.push(lNameError);
		}
		// Email validation
		var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; 
		if(!(re.exec(getEmail.value))){
			var emailError = "Please enter a valid email.";
			getEmail.style.border = "1px solid red";
			messageArray.push(emailError);
		}
		// Phone validation
		var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		if(!(re.exec(getPhone.value))){
			var phoneError = "Please enter a valid phone number.";
			getPhone.style.border = "1px solid red";
			messageArray.push(phoneError);
		}
		// if errors display them
		if(messageArray.length >= 1){
			for(var i = 0, j = messageArray.length; i < j; i++){
				var text = document.createElement("li");
				text.innerHTML = messageArray[i];
				errorMessage.appendChild(text);
			}
			e.preventDefault();
			return false;
		}else{
			// if there are no errors then save our data
			// we'll send the key value from the edititem function
			// this key value was passed through the editSaveProject eventListener as a property 
			saveLocal(this.key);
		}
		
	}	
	// Variable default Project Types array
	var 	projectTypes		= ["- Select Project -","Addition", "Kitchen", "Bathroom", "Roof", "Basement"],
			cost,				
			emailOkay			=	"No",
			errorMessage		=  $("errors")
	;
	makeProjectTypes();  	
	// Set link & submit Click Events 
 	var showProjectsLink = $("showProjectsLink");
 	showProjectsLink.addEventListener("click", getProjects);
 	var clearProjectsLink = $('clearProjectsLink');
 	clearProjectsLink.addEventListener("click", deleteProject); 
 	var save = $("saveProject");
 	save.addEventListener("click", validate);	
 });
 
 