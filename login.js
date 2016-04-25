var xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject(){
	var xmlHttp;

	if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}else{
		xmlHttp = new ActiveXObject("microsoft.XMLHTTP");
	}

	return xmlHttp;
}


function login(){
	var username=document.getElementById('username').value;
	var password=document.getElementById('password').value;	
	var senddata="username="+username+"&password="+password;
	username.value='';
	password.value='';

	if(xmlHttp){
		try{
			xmlHttp.open("POST","Http://moodshare.herokuapp.com/login",true);
			xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlHttp.setRequestHeader("Access-Control-Allow-Origin","*");
			xmlHttp.onreadystatechange = handleServerResponse;
			xmlHttp.send(senddata);
		}catch(e){
			alert( e.toString() );
		}
	}

} 


function handleServerResponse(){
	theD = document.getElementById('theD');
	if(xmlHttp.readyState==4){
		if(xmlHttp.status==202){
			try{
				text=xmlHttp.responseText;
				theD.innerHTML+=text

			}catch(e){
				alert(e.toString());
			}
		}else{
			alert(xmlHttp.statusText);
		}
	}
}

username.focus();

