//修改初始化
var update_police_vo = null;
var update_fzy="";
var update_xhr = new XMLHttpRequest();
update_xhr.open("POST", "/ajdbxt/user/User_findPoliceById_mobile");
update_xhr.send(null);
update_xhr.onreadystatechange = function() {
	if (update_xhr.readyState == 4) {
		if (update_xhr.status == 200) {
			update_police_vo = JSON.parse(update_xhr.responseText);
			console.log("xhr.readyState:" + update_xhr.readyState);
			console.log("xhr.status:" + update_xhr.status);
			// Id
			var input_ajdbxt_police_id = document
					.getElementById("input_ajdbxt_police_id");
			input_ajdbxt_police_id.value = update_police_vo.ajdbxt_police.ajdbxt_police_id;

			// 警号
			var input_police_serial_number = document
					.getElementById("input_police_serial_number");
			input_police_serial_number.value = update_police_vo.ajdbxt_police.police_serial_number;
			// 密码
			var input_police_password = document
					.getElementById("input_police_password");
			input_police_password.value = update_police_vo.ajdbxt_police.police_password;
			console.log("input_police_password:" + input_police_password.value);

			// 姓名
			var input_police_name = document
					.getElementById("input_police_name");
			input_police_name.value = update_police_vo.ajdbxt_police.police_name;

			// 单位
			var xmlHttpRequest = new XMLHttpRequest();
			xmlHttpRequest.open("POST", "/ajdbxt/user/User_getPower");
			xmlHttpRequest.send(null);
			xmlHttpRequest.onreadystatechange = function() {
				if (xmlHttpRequest.readyState == 4
						&& xmlHttpRequest.status == 200) {
					var loginRole = JSON.parse(xmlHttpRequest.responseText);
					var option = '';
					if (loginRole.ajdbxt_police.police_power == "3") {
						var deparment = update_police_vo.ajdbxt_department.ajdbxt_department_id;
						console
								.log("update_police_vo.ajdbxt_department.ajdbxt_department_id:"
										+ update_police_vo.ajdbxt_department.ajdbxt_department_id);
						$
								.post(
										'/ajdbxt/user/User_findDepartmentByPage',
										function(Department_data) {
											// 所有案件循环
											for (var len = 0; len < Department_data.list.length; len++) {
												option += '<option ';
												if (Department_data.list[len].ajdbxt_department_id == deparment) {
													option += 'selected';
												}
												option += ' value="'
														+ Department_data.list[len].ajdbxt_department_id
														+ '">'
														+ Department_data.list[len].department_name
														+ '</option>';
											}
											$('#input_police_department').html(
													option);
											var input_police_department_text=$("#input_police_department").find("option:selected").text();
											console.log("单位："+input_police_department_text );
											if (input_police_department_text== "公安局" || input_police_department_text== "法制大队") {
												document.getElementById("input_police_legaler").value = "2";
												document.getElementById("input_police_legaler").disabled = "disabled";
											}
										}, 'json');

					} else {
						option += '<option value="' + login_police_deparment_id
								+ '">' + login_police_deparment + '</option>';
						$('#input_police_department').html(option);
					}
				}

			}

			// 职务
			var input_police_duty = document
					.getElementById("input_police_duty");
			input_police_duty.value = update_police_vo.ajdbxt_police.police_duty;
			// 法制员
			var input_police_legaler = document
					.getElementById("input_police_legaler");
			console.log("update_police_vo.ajdbxt_police.police_legaler:"
					+ update_police_vo.ajdbxt_police.police_legaler);
			input_police_legaler.value = update_police_vo.ajdbxt_police.police_legaler;
			 update_fzy=update_police_vo.ajdbxt_police.police_legaler;
			// 权限
			var input_police_power = document
					.getElementById("input_police_power");
			input_police_power.value = update_police_vo.ajdbxt_police.police_power;
			console.log("后台传过来的权限："
					+ update_police_vo.ajdbxt_police.police_power);
			console.log("前端权限值：" + input_police_power.value);
			// 手机号码
			var input_police_phone_number = document
					.getElementById("input_police_phone_number");
			console.log("update_police_vo.ajdbxt_police.police_phone_number:"
					+ update_police_vo.ajdbxt_police.police_phone_number);
			input_police_phone_number.value = update_police_vo.ajdbxt_police.police_phone_number;
		}
	}
}

// -----------------------------
// --------修改人员--------------
function updatePolice() {
	var input_ajdbxt_police_id = document
			.getElementById("input_ajdbxt_police_id").value;
	// 警号
	var input_police_serial_number = document
			.getElementById("input_police_serial_number").value;

	if (input_police_serial_number == "") {
		mui.toast("请输入警号！");
		return false;
	}
	// 密码
	var input_police_password = document
			.getElementById("input_police_password").value;
	// 姓名
	var input_police_name = document.getElementById("input_police_name").value;
	if (input_police_name == "") {
		mui.toast("请输入姓名！");
		return false;
	}
	// 单位
	var input_police_department = document
			.getElementById("input_police_department").value;
	if (input_police_department == "") {
		mui.toast("请选择单位！");
		return false;
	}
	// 职务
	var input_police_duty = document.getElementById("input_police_duty").value;
	if (input_police_duty == "") {
		mui.toast("请选择职务！");
		return false;
	}
	// 法制员

	var input_police_legaler = document.getElementById("input_police_legaler").value;
	if (input_police_legaler == "") {
		mui.toast("请选择是否为法制员！");
		return false;
	}
	// 角色
	var input_police_power = document.getElementById("input_police_power").value;
	if (input_police_power == "") {
		mui.toast("请选择权限！");
		return false;
	}
	// 手机号码
	var input_police_phone_number = document
			.getElementById("input_police_phone_number").value;
	if (input_police_phone_number == "") {
		mui.toast("请输入手机号码！");
		return false;
	}
	if (!(/^1[34578]\d{9}$/.test(input_police_phone_number))) {
		mui.toast("手机号码有误，请重新输入！");
		return false;
	}
	var formData = new FormData();

	var xhr = false;
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				if (xhr.responseText == "success") {
					mui.toast("修改成功！");
					window.location.href = "/ajdbxt/user/User_mobile_police_one";
				} else {
					mui.toast("修改失败！");
					return false;
				}

			} else {
				mui.toast(xhr.status);
			}
		}
	}
	// id
	formData.append("ajdbxt_police.ajdbxt_police_id", input_ajdbxt_police_id);
	// 警号
	formData.append("ajdbxt_police.police_serial_number",
			input_police_serial_number);
	// 密码
	formData.append("ajdbxt_police.police_password", input_police_password);
	// 姓名
	formData.append("ajdbxt_police.police_name", input_police_name);
	// 单位
	formData.append("ajdbxt_police.police_department", input_police_department);
	// 职位
	formData.append("ajdbxt_police.police_duty", input_police_duty);
	// 法制员
	formData.append("ajdbxt_police.police_legaler", input_police_legaler);
	// 角色
	formData.append("ajdbxt_police.police_power", input_police_power);
	// 手机号码
	formData.append("ajdbxt_police.police_phone_number",
			input_police_phone_number);

	xhr.open("POST", "/ajdbxt/user/User_updatePolice");
	xhr.send(formData);

}

// 添加单位为法制大队，权限自动赋予3，其他为1
function selectDepartment() {
	var input_police_department = document
			.getElementById("input_police_department");
	var input_police_power = document.getElementById("input_police_power");
	if (input_police_department.value == "67ed5ab3-d773-4ac1-981b-2839ed0cec5c") {
		input_police_power.value = "3";
	} else if (input_police_department.value == "") {
		input_police_power.value = "";
	} else {
		input_police_power.value = "1";
	}
	haveFazhiyuan(input_police_department.options[input_police_department.selectedIndex].text);
}
function haveFazhiyuan(department_name) {
	/* 验证是否有法制员 */
	// 如果等于这两个就删除法制员
	if (department_name == "公安局" || department_name == "法制大队") {
		document.getElementById("input_police_legaler").value = "2";
		document.getElementById("input_police_legaler").disabled = "disabled";
	} else {
		var xmlRequest = new XMLHttpRequest();
		var input_police_department = document
				.getElementById("input_police_department").value;
		var formDataFzy = new FormData();
		formDataFzy.append("police_department", input_police_department);
		xmlRequest.open("POST", "/ajdbxt/user/User_haveFazhiyuan");
		xmlRequest.send(formDataFzy);
		xmlRequest.onreadystatechange = function() {
			if (xmlRequest.readyState == 4 && xmlRequest.status == 200) {
				var checkFzy = JSON.parse(xmlRequest.responseText);
				if (checkFzy == true) {
					document.getElementById("input_police_legaler").value = "2";
					document.getElementById("input_police_legaler").disabled = "disabled";
					return;
				} else {
					document.getElementById("input_police_legaler").disabled = "";
				}
			}
		}
	}
}

function changeFazhiyuan(){
	console.log("修改法制员！");
	var input_police_legaler_value=document.getElementById("input_police_legaler").value;
	var xmlRequest = new XMLHttpRequest();
	var input_police_department = document
			.getElementById("input_police_department").value;
	var formDataFzy = new FormData();
	formDataFzy.append("police_department", input_police_department);
	xmlRequest.open("POST", "/ajdbxt/user/User_haveFazhiyuan");
	xmlRequest.send(formDataFzy);
	xmlRequest.onreadystatechange = function() {
		if (xmlRequest.readyState == 4 && xmlRequest.status == 200) {
			var checkFzy = JSON.parse(xmlRequest.responseText);
			if (checkFzy == true) {
				console.log(input_police_department+":有法制员");
				console.log("update_fzy:"+update_fzy);
				if(input_police_legaler_value!==update_fzy){
					if(input_police_legaler_value=="1"){
						mui.alert("该单位已有法制员！");
						document.getElementById("input_police_legaler").value="2";
					}
				}
				return;
			} else {
			console.log(input_police_department+":无法制员");
				return;
			}
		}
	}
}