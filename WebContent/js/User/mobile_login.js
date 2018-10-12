/**
 * 
 */
var xhr;

function login() {    
	getXhr();
	var userNumber = document.getElementById("userNumber").value;
	if(userNumber==""){
		mui.toast("用户名不允许为空");
		return false;
	}
	
	var password = document.getElementById("password").value;
	if(password==""){
		mui.toast("密码不允许为空");
		return false;
	}
	xhr.open("POST", "/ajdbxt/user/User_login");
	var formData = new FormData();
	formData.append("ajdbxt_police.police_serial_number", userNumber);
	formData.append("ajdbxt_police.police_password", password);
	xhr.send(formData);
	xhr.onreadystatechange = function() {
		if (xhr.readyState  == 4 && xhr.status == 200) {
			var result = xhr.responseText;
			/*alert(xhr.responseText);*/
			console.log(xhr.responseText);
			if (result == "success") {
				/*toastr.success("登录成功！");*/
				window.location = "/ajdbxt/user/User_mobile_index";
			} else {
				mui.toast("用户名或密码错误！");
			}
		}
	}
	
}

function getXhr() {
	if (window.XMLHttpRequest) {
		// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xhr = new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
}