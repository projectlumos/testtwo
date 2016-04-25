var count = 5;
var waittime = 15;

function keyHit(){
	if (event.keyCode == 13) document.getElementById("signin").click();									// Check if Enter key (13) is pressed
}

function myFunction(){																					// On Clicking Sign-In Button	

	uname = document.getElementById("username").value;													// Get username 	
	pass = document.getElementById("password").value;													// Get password
	
	var login_params = "username=" + uname + "&password=" + pass;										// Create string to send to API
	var signin_button = document.getElementById("signin");												// Get the sign in button in a variable
	var response = document.getElementById("status");													// This will be the success/failure notice given to user
	var attempt_left = document.getElementById("attempts");												// No of attempts left

	if(uname.toString().trim().length==0 || pass.trim().length == 0){									// Ask user to retry in case of empty strings in username or password
		response.innerHTML = "Both values are compulsary";
		return;
	}

	var xmlreq = new XMLHttpRequest();																	// Create a XMLHttpRequest object

	xmlreq.open("POST", "http://moodshare.herokuapp.com/login", true);									// Assign method, url and isAsynchronous property to initialize the object 
	xmlreq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');						// Set required headers
	xmlreq.setRequestHeader('Access-Control-Allow-Origin', '*');

	xmlreq.onreadystatechange = function() {															// Run this everytime we see a change in the status/state of the request
	   
	    if(xmlreq.readyState == 4 && xmlreq.status == 202){												// 4 = Request completed, response ready. 202 = Accpeted
	        signin_button.innerHTML = "Signed-In";														// Change button text
	        attempt_left.innerHTML = "";																// Give response to the user regarding the status
	        response.innerHTML = "<div class = \"alert alert-success fade in\"><span style = \"color: green;\">Successfully signed in.</span>";
	        signin_button.disabled = true;																// Disable the button
   		} 
    	else if(xmlreq.readyState == 4 && xmlreq.status == 401){										// 4 = Reqeuest completed and response ready 401 = Unauthorized access
	
	    	if(count-- <= 1){																			// Max number of attempts reached
				signin_button.disabled = true;															// Disable the button
				signin_button.innerHTML = "Sign-In";													
				response.innerHTML = "Max attempts exceeded"											// Notify the user

				waittimeID = window.setInterval(function(){												// Create a timer which modifies itself each second
								attempt_left.innerHTML = "Please wait " + waittime-- + " seconds"; 		// Ask user to wait 15 seconds
								if(waittime == -1)
								window.clearInterval(waittimeID);										// After 15 seconds kill the timer
							},1000);

				window.setTimeout(function(){															// Timeout function to restore values after 15 seconds
					count = 5;																			// Restore number of attempts
					waittime = 15;																		// Restore waiting time
					response.innerHTML = "";
					attempt_left.innerHTML = count + " Attempts left";										
					signin_button.disabled = false;														// Enable the button
				},16500);

				return;
			}

        	signin_button.innerHTML = "Sign-In";														// In case of invalid username and password combination (Under max attempts limit)
        	signin_button.disabled = false;																// Enable the button and notify the user	
        	response.innerHTML = "<div class = \"alert alert-danger fade in\"><span style = \"color: #E53935;\">Incorrect username or password.</span>";
    	}	

	}

	xmlreq.send(login_params);																			// This will send the data to the API
	signin_button.disabled = true;																		// Disable the button 
	signin_button.innerHTML = "Signing-In...";															// And change the button text to signingin until a change in state is found
   	attempt_left.innerHTML = count - 1 + " Attempts left";												// Reduce number of attempts by one
}
