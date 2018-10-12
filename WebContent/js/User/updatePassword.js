/**
 * 
 */
var xhr;
function updatePassword() {
	var newPassword = document.getElementById("newPassword").value;
	var newPasswordAgain = document.getElementById("newPasswordAgain").value;
	if (newPassword == "" || newPassword == null) {
		toastr.error("新密码不能为空！");
	} else if (newPasswordAgain == "" || newPasswordAgain == null) {
		toastr.error("确认密码不能为空！");
	} else if (newPassword != newPasswordAgain) {
		toastr.error("两次密码不一致！");
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
					toastr.success("修改成功,请重新登录！");
					setTimeout(function(){
						window.location = "/ajdbxt/user/User_loginout";
					},1000)
					
				} else {
					toastr.error("修改失败！");
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