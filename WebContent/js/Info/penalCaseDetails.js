window.onload = function() {
	$("button").each(function() {
		$(this).css("display","none");
	})
	// --------------------
	// ------判断角色-------
	var loginRole = null;// 登录角色接收数据
	var login_police_deparment = null;// 当前登录角色所在单位名字
	var login_police_deparment_id = null;// 当前登录角色所在单位id
	var xmlHttpRequest = new XMLHttpRequest();
	xmlHttpRequest.open("POST", "/ajdbxt/user/User_getPower");
	xmlHttpRequest.send(null);
	xmlHttpRequest.onreadystatechange = function() {
		if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
			loginRole = JSON.parse(xmlHttpRequest.responseText);
			console.log("loginRole.ajdbxt_police.police_power:"
					+ loginRole.ajdbxt_police.police_power);
			login_police_deparment = loginRole.ajdbxt_department.department_name;// 当前登录角色所在单位名字赋值
			login_police_deparment_id = loginRole.ajdbxt_department.ajdbxt_department_id;// 当前登录角色所在单位名字赋值
			console.log("login_police_deparment:" + login_police_deparment);

			if (loginRole.ajdbxt_police.police_power == "3") {
				$(".legal_team_manager_btn").each(function() {
					$(this).css("display","block");
				})
			} else {

			}

		}
	}

}

/*
 * 涉案财物为是时，出现涉案财物是否入库
 */
function case_propertyBtnClick() {
	var case_property = document.getElementsByName("case_property");
	for (var num = 0; num < 2; num++) {
		var case_property_value = case_property[num].value;
		if (case_property[num].checked) {
			if (case_property_value == "有") {// "1"表示点击有涉案财物
				document.getElementById("property_storage_div").style.display = "block";
			} else {
				document.getElementById("property_storage_div").style.display = "none";
			}
		}
	}
}

/*
 * 根据第一次强制措施所选进行判断
 */
var ca_and_qs_str = null;// 获得内容（撤案和起诉）
ca_and_qs_str = '<label style="margin: 0 10px;"> <input type="radio" name="ca_and_qs" value="撤案" onclick="ca_and_qs_Click()"> 撤案 </label>';
ca_and_qs_str += '<label style="margin: 0 0px;"> <input type="radio" name="ca_and_qs" value="起诉" onclick="ca_and_qs_Click()"> 起诉 </label>';

var check_one_str = null;// 获得内容（补查一次）
check_one_str = '<label style="margin: 0 10px;"> <input type="radio" name="checkOne"  value="是" onclick="checkOne_Click()"> 是</label>';
check_one_str += '<label style="margin: 0 10px;"> <input type="radio"   name="checkOne"  value="否" onclick="checkOne_Click()"> 否 </label>';

var check_two_str = null;// 获得内容（补查二次）
check_two_str = '<label style="margin: 0 10px;"> <input type="radio" name="checkTwo"  value="是"> 是 </label>';
check_two_str += '<label style="margin: 0 10px;"> <input type="radio" name="checkTwo" value="否"> 否 </label>';

var second_str = null;// 第二次强制措施
var third_str = null;// 第三次强制措施
var fourth_str = null;// 第四次强制措施

/*
 * 第一次强制措施方法
 */
function mandatory_measuresBtnClick() {
	var mandatory_measuresOne = document
			.getElementsByName("mandatory_measuresOne");
	for (var num = 0; num < 3; num++) {
		var mandatory_measuresOne_value = mandatory_measuresOne[num].value;
		if (mandatory_measuresOne[num].checked) {
			if (mandatory_measuresOne_value == "拘留") {// 根据第一次强制措施选择拘留进行判断
				document.getElementById("detention_delay_date").style.display = "block";// 选择拘留时，显示出拘留延长期限
				/*
				 * 选择拘留显示第二次强制措施内容
				 */
				document.getElementById("second_punishment").style.display = "block";
				second_str = '<label style="margin: 0 10px;"> <input type="radio" name="second_punishment" value="逮捕" onclick="second_punishmentClick()"> 逮捕</label>';
				second_str += '<label style="margin: 0 10px;"><input type="radio" name="second_punishment" value="取保候审" onclick="second_punishmentClick()" > 取保候审 </label>';
				second_str += '<label style="margin: 0 10px;"><input type="radio" name="second_punishment" value="监视居住" onclick="second_punishmentClick()">监视居住 </label>';
				$("#second_punishment_content").html(second_str);
				document.getElementById("supplement_check").style.display = "none";// 隐藏补查

				$("#third_punishment").css("display", "none");// 第三次强制措施内容隐藏

				$("#fourth_punishment").css("display", "none");// 第四次强制措施内容隐藏

			} else if (mandatory_measuresOne_value == "取保候审") {// 选择取保候审显示第二次强制措施内容
				document.getElementById("detention_delay_date").style.display = "none";
				document.getElementById("second_punishment").style.display = "block";
				$("#second_punishment_content").html(ca_and_qs_str);
				document.getElementById("supplement_check").style.display = "none";// 隐藏补查

				$("#third_punishment").css("display", "none");// 第三次强制措施内容隐藏

				$("#fourth_punishment").css("display", "none");// 第四次强制措施内容隐藏

			} else {// 选择监视居住显示第二次强制措施内容
				document.getElementById("detention_delay_date").style.display = "none";
				document.getElementById("second_punishment").style.display = "block";
				$("#second_punishment_content").html(ca_and_qs_str);
				document.getElementById("supplement_check").style.display = "none";// 隐藏补查

				$("#third_punishment").css("display", "none");// 第三次强制措施隐藏

				$("#fourth_punishment").css("display", "none");// 第四次强制措施隐藏
			}

		}
	}
}

/*
 * 第二次强制措施方法
 */
function second_punishmentClick() {

	var second_punishment = document.getElementsByName("second_punishment");
	for (var num = 0; num < 3; num++) {
		var second_punishment_value = second_punishment[num].value;
		if (second_punishment[num].checked) {
			if (second_punishment_value == "逮捕") {// 选择第二次的逮捕显示第三次强制措施内容
				third_str = '<label style="margin: 0 10px;"> <input type="radio" name="third_punishment" value="取保候审" onclick="third_punishmentClick()"> 取保候审</label>';
				third_str += '<label style="margin: 0 10px;"><input type="radio" name="third_punishment" value="起诉" onclick="third_punishmentClick()"> 起诉 </label>';
				$("#third_punishment_value").html(third_str);
				$("#third_punishment").css("display", "block");
				document.getElementById("supplement_check").style.display = "none";// 隐藏补查

			} else if (second_punishment_value == "取保候审") {// 选择第二次的取保候审显示第三次强制措施内容
				$("#third_punishment_value").html(ca_and_qs_str);
				$("#third_punishment").css("display", "block");

				$("#fourth_punishment").css("display", "none");// 第四次强制措施隐藏
				document.getElementById("supplement_check").style.display = "none";// 隐藏补查

			} else {// 选择第二次的监视居住显示第三次强制措施内容
				$("#third_punishment_value").html(ca_and_qs_str);
				$("#third_punishment").css("display", "block");

				$("#fourth_punishment").css("display", "none");// 第四次强制措施隐藏
				document.getElementById("supplement_check").style.display = "none";// 隐藏补查

			}
		}

	}
}
/*
 * 第三次强制措施方法
 */
function third_punishmentClick() {

	var third_punishment = document.getElementsByName("third_punishment");
	for (var num = 0; num < 3; num++) {
		var third_punishment_value = third_punishment[num].value;
		if (third_punishment[num].checked) {
			if (third_punishment_value == "起诉") {// 选择第三次的起诉显示补查一次
				document.getElementById("supplement_check").style.display = "block";
				$("#checkOne_value").html(check_one_str);
				document.getElementById("checkOne").style.display = "block";
				document.getElementById("checkTwo").style.display = "none";
				// 第四次强制措施隐藏
				$("#fourth_punishment").css("display", "none");
			} else {// 选择第二次的监视居住显示第三次强制措施内容
				$("#fourth_punishment_value").html(ca_and_qs_str);
				$("#fourth_punishment").css("display", "block");
				document.getElementById("supplement_check").style.display = "none";// 隐藏补查
			}
		}

	}
	$("#fourth_punishment_value").html(ca_and_qs_str);
	$("#fourth_punishment").css("display", "block");

}

/*
 * 撤案和起诉：点击起诉显示补查一次，补查二次隐藏；点击撤案，补查隐藏
 */
function ca_and_qs_Click() {
	var ca_and_qs = document.getElementsByName("ca_and_qs");
	for (var num = 0; num < 2; num++) {
		var ca_and_qs_value = ca_and_qs[num].value;
		if (ca_and_qs[num].checked) {
			if (ca_and_qs_value == "起诉") {
				document.getElementById("supplement_check").style.display = "block";
				$("#checkOne_value").html(check_one_str);
				document.getElementById("checkOne").style.display = "block";
				document.getElementById("checkTwo").style.display = "none";
			} else {
				document.getElementById("supplement_check").style.display = "none";// 隐藏补查
			}
		}
	}
}

/*
 * 点击补查一次为是时，显示补查二次。否则不显示
 */
function checkOne_Click() {
	var checkOne = document.getElementsByName("checkOne");
	for (var num = 0; num < 2; num++) {
		var checkOne_value = checkOne[num].value;
		if (checkOne[num].checked) {
			if (checkOne_value == "是") {
				document.getElementById("checkTwo").style.display = "block";
				$("#checkTwo_value").html(check_two_str);
			} else {
				document.getElementById("checkTwo").style.display = "none";
			}
		}
	}
}
