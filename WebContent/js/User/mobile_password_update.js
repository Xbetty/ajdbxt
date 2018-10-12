/**
 * 
 */
var xhr;
function mobile_password_update() {
	var newPassword = document.getElementById("newPassword").value;
	var newPasswordAgain = document.getElementById("newPasswordAgain").value;
	if (newPassword == "" || newPassword == null) {
		mui.toast("新密码不能为空！");
	} else if (newPasswordAgain == "" || newPasswordAgain == null) {
		mui.toast("确认密码不能为空！");
	} else if (newPassword != newPasswordAgain) {
		mui.toast("两次密码不一致！");
	} else {
		getXmlHttp();
		xhr.open("POST", "/ajdbxt/user/User_changePassword", true);
		var formData = new FormData();
		formData.append("ajdbxt_police.police_password", newPassword);
		xhr.send(formData);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var result = xhr.responseText;
				if (result == "success") {
					mui.toast("修改成功,请重新登录！");
					setTimeout(function(){
						window.location = "/ajdbxt/user/User_mobile_loginout";
					},1000)
					
				} else {
					mui.toast("修改失败！");
				}
			}
		}
	}
}

function getXmlHttp() {
	if (window.XMLHttpRequest) {
		// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xhr = new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
}