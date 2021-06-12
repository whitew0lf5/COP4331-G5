var urlBase = 'http://165.227.185.106/api/';

var userId = 0;
var firstName = "";
var lastName = "";

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
}

function readCookie()
{
	userId = -1;
  var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++)
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}

	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
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
   
  userId = sessionStorage.getItem("id");

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

function searchColor()
{
	var srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";

	var colorList = "";

	var jsonPayload = '{"search" : "' + srch + '","userId" : ' + userId + '}';
	var url = urlBase + '/SearchColors.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );

				for( var i=0; i<jsonObject.results.length; i++ )
				{
					colorList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						colorList += "<br />\r\n";
					}
				}

				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}

}
