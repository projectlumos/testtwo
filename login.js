var flag=0;
var trial=0;
var id,pass;
function login()
{
    if(flag==1){
        //checking password
        if(document.getElementById('txt1').value=='')
        {
            return;
        }
        pass=document.getElementById('txt1').value; 
        var xmlReq=new XMLHttpRequest();
        xmlReq.open("POST","http://moodshare.herokuapp.com/login",true);
        xmlReq.setRequestHeader('Access-Control-Allow-Origin','*');
        xmlReq.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        xmlReq.send("username="+id+"&password="+pass);
        xmlReq.onreadystatechange = function(){
            if(xmlReq.readyState == 4 && xmlReq.status == 202){
                window.open("success.html","_self");
                return;
            }
            else if(xmlReq.readyState == 4 && xmlReq.status == 401){
                trial++;
                document.getElementById('txt1').type='text';
                document.getElementById('txt1').placeholder='Enter ID';
                document.getElementById('txt1').value='';
                document.getElementById('logi').value="NEXT";
                document.getElementById('Name').innerHTML="&nbsp";
                document.getElementById('NotYou').innerHTML="&nbsp";
                flag=0;
                document.getElementById('oops').innerHTML="Oops, Username Or Password Was Wrong!";
                if(trial==3)
                {   
                    //lock if tried more than 3 times
                    document.getElementById('txt1').disabled=true;
                    document.getElementById('logi').value="Too Many Tries";
                    document.getElementById('oops').innerHTML="Too Many Tries, Reload The Page";
                    flag=2;
                    return;
                }

                return;
            }
        };
        
    }
    if(flag==0)
    {
        //Entering id or username
        if(document.getElementById('txt1').value==''){
            return;
        }
            id=document.getElementById('txt1').value;
            document.getElementById('logi').value="Sign in";
            document.getElementById('Name').innerHTML='Welcome  '+id;
            document.getElementById('txt1').value='';
            document.getElementById('txt1').type='password';
            document.getElementById('txt1').placeholder='Password';
            document.getElementById('oops').innerHTML="&nbsp";
            // If its not the username
            document.getElementById('NotYou').innerHTML='        &nbsp      Not '+id+' ?';
            flag=1;
            return;
        }   
    }
    if(flag==2){
        alert("Too Many Tries Reload The Page");
    }
function notyou()
{
    location.reload();
}
                