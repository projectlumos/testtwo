
function login(){

var username = document.getElementById("usernameid").value;
var password = document.getElementById("passwordid").value;

if(username === "" || password === ""){
document.getElementById("loginfail").style.display="block";
return false;
}

var xmlReq = new XMLHttpRequest();

xmlReq.open("POST", "https://moodshare.herokuapp.com/login", true); 
xmlReq.setRequestHeader("Access-Control-Allow-Origin", "*"); 
xmlReq.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlReq.send("username="+username+"&password="+password); 


xmlReq.onreadystatechange = function(){
if(xmlReq.readyState == 4 && xmlReq.status == 202){ 
document.getElementById("loginresult").style.display="block";
}
else if(xmlReq.readyState == 4 && xmlReq.status == 401){ 
document.getElementById("loginfail").style.display="block";
document.getElementById("passwordid").value = "";
}
};

}
