var count=0;  	//counter for unsuccessful attempt

function logIn(){
	//taking input values
	var username = document.getElementById("usernameId").value;
	var password = document.getElementById("passwordId").value;


	//rejecting empty input values
	if(username === "" || password === ""){
		document.getElementById("output").innerHTML = "<b>*username & password mandatory:</b> Please Enter username/password";
		document.getElementById("output").style.color = 'red';
		return false;
	}


	//creating a XMLHttpRequest object
	var xmlReq = new XMLHttpRequest();


	//checking for change in ready state
	xmlReq.onreadystatechange = function(){
		if(xmlReq.readyState == 4 && xmlReq.status == 202){									//request processed & status is OK i.e valid credentials
			document.getElementById("output").innerHTML = "<b>Successful logged in</b>";	
			document.getElementById("output").style.color = 'green';
		}
		else if(xmlReq.readyState == 4 && xmlReq.status == 401){														//request processed & access denied
			count++;																									//incremeting counter
			document.getElementById("output").innerHTML = "<b>Unsuccessful Attempt "+String(count)+":</b> Invalid username/password<br>";
			document.getElementById("output").style.color = 'red';
			document.getElementById("passwordId").value = "";
			if(count == 5){																								//if counter has reached max attempts
				document.getElementById("output").innerHTML = "<b>*Login disabled for security reasons</b>"			
				document.getElementById("logInBtn").disabled = true;											//counter exceeds max attempts disable button
			}
		}
	};
	
	
	xmlReq.open("POST", "https://moodshare.herokuapp.com/login", true);				//initializing XMLHttpRequest object
  	xmlReq.setRequestHeader("Access-Control-Allow-Origin", "*");					//setting necessary headers 
  	xmlReq.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  	xmlReq.send("username="+username+"&password="+password);						//sending data to sever

}