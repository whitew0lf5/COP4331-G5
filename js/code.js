var urlBase = 'http://165.227.185.106/api/';
var modal = document.getElementById("modal1");

var userId = 0;
var firstName = "";
var lastName = "";
var contactid = 0;
var contactfname = "";
var contactlname = "";
var phonenum = "";
var email = "";

function doLogin()
{
	  userId = 0;
		firstName = "";
		lastName = "";

		var login = document.getElementById("loginName").value;
		var password = document.getElementById("loginPassword").value;
	//	var hash = md5( password );

    if(login === "") {
		document.getElementById("loginResult").innerHTML = "Username is required";
		return;
	} else if(password === "") {
		document.getElementById("loginResult").innerHTML = "Password is required";
		return;
   }

		document.getElementById("loginResult").innerHTML = "";

	//	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
		var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
		var url = urlBase + 'login/' + login + '/' + password;

		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try
		{
			xhr.onreadystatechange = function()
			{
				if (this.readyState == 4 && this.status == 200)
				{
					var jsonObject = JSON.parse( xhr.responseText );
					console.log(jsonObject.response.code);
					var responseCode = jsonObject.response.code;

					if( responseCode == 401 )
					{
						document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
						return;
					}
           if( responseCode == 404 )
           {
             document.getElementById("loginResult").innerHTML = jsonObject.response.message;
             return;
           }
          
          var data = jsonObject.response.data;
					userId = data[0];
          
					firstName = data[1];
					lastName = data[2];

					saveCookie();

					window.location.href = "menu.html";

				}
			};
			xhr.send(jsonPayload);
		}
		catch(err)
		{
			document.getElementById("loginResult").innerHTML = err.message;
		}


}

function doRegister()
{
		userId = 0;

		var fName = document.getElementById("firstName").value;
		var lname = document.getElementById("lastName").value;
		var userN = document.getElementById("loginName").value;
		var pass = document.getElementById("loginPassword").value;
	//	var hash = md5( password );

   if(fName === "") {
		document.getElementById("loginResult").innerHTML = "First name is required";
		return;
	} else if(lname === "") {
		document.getElementById("loginResult").innerHTML = "Last name is required";
		return;
	} else if(userN === "") {
		document.getElementById("loginResult").innerHTML = "Username is required";
		return;
	} else if(pass === "") {
		document.getElementById("loginResult").innerHTML = "Password is required";
		return;
	}

		document.getElementById("loginResult").innerHTML = "";

	//	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
		var jsonPayload = '{"firstname" : "' + fName + '", "lastname" : "' + lname + '", "username" : "' + userN + '", "password" : "' + pass + '"}';
		var url = urlBase + 'register/' + fName + '/' + lname + '/' + userN + '/' + pass;

		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try
		{
			xhr.onreadystatechange = function()
			{
				if (this.readyState == 4 && this.status == 200)
				{
					var jsonObject = JSON.parse( xhr.responseText );
					console.log(jsonObject.response.code);
					var responseCode = jsonObject.response.code;

					if( responseCode == 401 )
					{
						document.getElementById("loginResult").innerHTML = "User Already Exists";
						return;
					}
					window.location.href = "index.html";

				}
			};
			xhr.send(jsonPayload);
		}
		catch(err)
		{
			document.getElementById("loginResult").innerHTML = err.message;
		}


}

function saveCookie()
{
	 var minutes = 20;
   var date = new Date();
	 date.setTime(date.getTime()+(minutes*60*1000));
   sessionStorage.setItem("lastname", lastName);
   sessionStorage.setItem("firstname", firstName);
   sessionStorage.setItem("id", userId); 
   sessionStorage.setItem("contactid", contactid);
   sessionStorage.setItem("contactfname", contactfname);
   sessionStorage.setItem("contactlname", contactlname);
   sessionStorage.setItem("phonenum", phonenum);
   sessionStorage.setItem("email", email);
}

function readCookie()
{
  lastName = sessionStorage.getItem("lastname");
  firstName = sessionStorage.getItem("firstName");
  userId = sessionStorage.getItem("id");
  contactid = sessionStorage.getItem("contactid");
  contactfname = sessionStorage.getItem("contactfname");
  contactlname = sessionStorage.getItem("contactlname");
  phonenum = sessionStorage.getItem("phonenum");
  email = sessionStorage.getItem("email");
}

function doLogout()
{
	sessionStorage.clear();
	window.location.href = "index.html";
}

function doConfirm()
{
	var addName = document.getElementById("addName").value;
	var addLastName = document.getElementById("addLastName").value;
	var email = document.getElementById("addEmail").value;
	var phoneNO = document.getElementById("addPhoneNumber").value;
   
  readCookie();

	if(addName === "") {
	 document.getElementById("loginResult").innerHTML = "First name is required";
	 return;
 } else if(addLastName === "") {
	 document.getElementById("loginResult").innerHTML = "Last name is required";
	 return;
 } else if(email === "") {
	 document.getElementById("loginResult").innerHTML = "Email is required";
	 return;
 } else if(phoneNO === "") {
	 document.getElementById("loginResult").innerHTML = "Phone number is required";
	 return;
 }

	document.getElementById("loginResult").innerHTML = "";
 
	
	var jsonPayload = '{"firstname" : "' + firstName + '", "lastname" : "' + lastName + '", "email" : "' + email + '", "phoneNO" : "' + phoneNO + '", "userID" : ' + userId + '}';
	var url = urlBase + 'addcontact/' + addName + '/' + addLastName + '/' + phoneNO + '/' + email + '/' + userId  ;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{

				var jsonObject = JSON.parse( xhr.responseText );
				console.log(jsonObject.response.code);
				var responseCode = jsonObject.response.code;

				if( responseCode == 401 )
				{
					document.getElementById("loginResult").innerHTML = "Contact already exists";
					return;
				}

				if( responseCode == 200 )
				{
					window.location.href = "menu.html";
				}
			
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}

}

function doCancel()
{
  window.location.href = "menu.html";
}

function doSearchfirst()
{
	var srch = "";
 
   if(document.getElementById("contactSearch").value == "")
   {
     srch = "_";
   }
   else
   {
     srch = document.getElementById("contactSearch").value;
   }
  console.log(srch);
	readCookie();

	var jsonPayload = '{"search" : "' + srch + '","userId" : ' + userId + '}';
	var url = urlBase + 'searchcontacts/' + srch + '/' + userId;

	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				var jsonObject = JSON.parse( xhr.responseText );
				var data = jsonObject.response.data;
        var button = document.createElement('input');

        button.setAttribute('type', 'button');
        button.setAttribute('value', 'Remove');
        
        if (jsonObject.response.code == 404)
        {
          document.getElementById("menuLabel").innerHTML = jsonObject.response.message;
          return;
        }

				var html = "<table class ='flex-item' id='contacts'>";
        html += "<tr>";
        //html += "<th><p>Contact ID</p></th>";
        html += "<th><p>First Name</p></th>";
        html += "<th><p>Last Name</p></th>";
        html += "<th><p>Phone Number</p></th>";
        html += "<th><p>E-mail</p></th>";
        html += "<th><p>Date added</p></th>";
        html += "<th><p>Delete</p></th>";
        html += "<th><p>Edit</p></th>";
        html += "</tr>";
      console.log(data.length);
      for (var i = 0; i < data.length; i++) {
        html+= "<tr id = '" + i + "'>";
        var date = data[i];
       // html += "<td><p>"+date[0]+"</p></td>";
        html += "<td><p>"+date[2]+"</p></td>";
        html += "<td><p>"+date[3]+"</p></td>";
        html += "<td><p>"+date[5]+"</p></td>";
        html += "<td><p>"+date[4]+"</p></td>";
        html += "<td><p>"+date[1]+"</p></td>";
        html += "<td><button id='addContact' class='buttons' onclick='doRemove("+ date[0] + ");'>Delete</button></td>";
        html += "<td><button id='editContact' class='' onclick='dogoEdit("+ date[0] + ", \"" + date[2] + "\", \"" + date[3] + "\", \"" + date[5] + "\", \"" + date[4] + "\");'>Edit</button></td>";
        html +="</tr>";

      }
        html+="</table>";
        document.getElementById("box").innerHTML = html;
        //document.getElementById("Username").innerHTML = firstName + " " + lastName;
        //document.getElementById("Userid").innerHTML = userId;

			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}

}


function doRemove(identifier)
{
  //var td = event.target.parentNode; 
  //var tr = td.parentNode;
  //var Cells = tr.getElementsByTagName("td");
  //var identifier = Cells[0].innerText;
  //var confirmaction = confirm("Are you sure you want to delete this contact?");
  //if(confirmaction)
  
    var jsonPayload = '{"identifier" : "' + identifier + '}';
    console.log(identifier);
    var url = urlBase + 'deletecontact/' + identifier;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
      xhr.onreadystatechange = function()
    {
      if (this.readyState == 4 && this.status == 200)
    {
      var jsonObject = JSON.parse( xhr.responseText );
      var code = jsonObject.response.code;
      console.log(code);
      //tr.parentNode.removeChild(tr);
      doSearchfirst();
    }
    };
      xhr.send(jsonPayload);
    }
      catch(err)
    {
       document.getElementById("loginResult").innerHTML = err.message;
    }
  
}

function initEditContact()
{
  readCookie()
  document.getElementById("editName").value = contactfname;
  document.getElementById("editLastName").value = contactlname;
  document.getElementById("editEmail").value = email;
  document.getElementById("editPhoneNumber").value = phonenum;
}

function dogoEdit(contactId, firstName, lastName, phoneNumber, emailadd)
{
  contactid = contactId;
  contactfname = firstName;
  contactlname = lastName;
  phonenum = phoneNumber;
  email = emailadd;
  saveCookie();
  window.location.href = "editContact.html";
}

function doCon()
{
    readCookie();
    var fir = document.getElementById("editName").value;
    var las = document.getElementById("editLastName").value ;
    var email = document.getElementById("editEmail").value ;
    var phone = document.getElementById("editPhoneNumber").value;
    var contactID = contactid;
    
    var jsonPayload = '{"firstname" : "' + firstName + '", "lastname" : "' + lastName + '", "email" : "' + email + '", "phoneNO" : "' + phone + '", "userID" : ' + contactID + '}';
	  var url = urlBase + 'editcontact/' + fir + '/' + las + '/' + phone + '/' + email + '/' + contactID;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{

				var jsonObject = JSON.parse( xhr.responseText );
				console.log(jsonObject.response.code);
				var responseCode = jsonObject.response.code;

				if( responseCode == 401 )
				{
					document.getElementById("loginResult").innerHTML = "Contact already exists";
					return;
				}
        
        if( responseCode == 404 )
				{
					document.getElementById("loginResult").innerHTML = "Failed to add contact";
					return;
				}
        

				if( responseCode == 200 )
				{
					window.location.href = "menu.html";
				}
			
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}

    
}