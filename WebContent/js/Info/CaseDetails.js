window.onload = function() {
	var url = window.location.href;
	info_id = url.substring(url.indexOf("=") + 1);
	// 基本信息
	get_staffDetails(info_id);
	// 流程信息
	get_penalProcessDetails(info_id);
	get_processDetails(info_id);
}
function get_processDetails(info_id) {
	//console.log("b1");
		var url = "/ajdbxt/process/findSingleProcessAction?ajdbxtProcess.process_case_id="
				+ info_id;
		get_processDetails_Ajax(url, info_id);
	}
	function get_penalProcessDetails(info_id){
		var url = "/ajdbxt/process/findSingleProcessAction?ajdbxtProcess.process_case_id="
			+ info_id;
	get_penalProcessDetails_Ajax(url, info_id);
}
// 判断返回字符串中是否有success来确定编辑是否成功
function isContains(str, substr) {
	return str.indexOf(substr) >= 0;
}
// 得到案件基本信息, 然后插入input中
function get_staffDetails(info_id) {
	// console.log("b1");
	var url = "/ajdbxt/info/Info_getSingleInfo?info.ajdbxt_info_id=" + info_id;
	get_staffDetails_Ajax(url, info_id);
}
// 案件基本信息，还有法制员、所队长、法制民警、局领导、办案民警、办案单位
function get_staffDetails_Ajax(url, info_id) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp = new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var staff_info = xmlhttp.responseText;
			staff_info = JSON.parse(staff_info);

			// 遍历并插入，基本信息
			$.each(staff_info.info, function(key, value) {
				$('input[name="info.' + key + '"]').val(value);
				// 法制员
				if (key == 'info_department_legal_member') {
					$('input[name="info.' + key + '"]').val(
							staff_info.team_legal.police_name);
				}
				// 所队长
				if (key == 'info_department_captain') {
					$('input[name="info.' + key + '"]').val(
							staff_info.cap.police_name);
				}
			});
			
			// 基本信息，未成年人
			/*if (staff_info.info.info_nonage != null
					&& staff_info.info.info_nonage.length > 0) {
				if ("是" == staff_info.info.info_nonage.trim()) {
					$('input[name="info.info_nonage"').prop("disabled", true);
					$('#caseDateles_minors_asking_yes').attr("checked",
							"checked");
				}
				if ("否" == staff_info.info.info_nonage.trim()) {
					$('input[name="info.info_nonage"').prop("disabled", true);
					$('#caseDateles_minors_asking_no').attr("checked",
							"checked");
				}
			}*/
			// 特殊案件
			if (staff_info.info.info_special_case != null
					&& staff_info.info.info_special_case.length > 0) {
				if ("是" == staff_info.info.info_special_case.trim()) {
					$('input[name="info.info_special_case"').prop("disabled", true);
					$('#caseDateles_special_case_yes').attr("checked",
							"checked");
				}
			}
			
			// 特殊人员
			if (staff_info.info.info_special_person != null
					&& staff_info.info.info_special_person.length > 0) {
				if(staff_info.info.info_special_person.indexOf("律师")!=-1) {
					$('#caseDateles_info_special_person_lawyer').attr("checked",
					"checked");
				}
				if(staff_info.info.info_special_person.indexOf("记者")!=-1) {
					$('#caseDateles_info_special_person_reporter').attr("checked",
					"checked");
				}
				if(staff_info.info.info_special_person.indexOf("人大")!=-1) {
					$('#caseDateles_info_special_person_renda').attr("checked",
					"checked");
				}
				if(staff_info.info.info_special_person.indexOf("政协")!=-1) {
					$('#caseDateles_info_special_person_zhengxie').attr("checked",
					"checked");
				}
				if(staff_info.info.info_special_person.indexOf("未成年人")!=-1) {
					$('#caseDateles_info_special_person_minor').attr("checked",
					"checked");
				}
				if(staff_info.info.info_special_person.indexOf("涉警")!=-1) {
					$('#caseDateles_info_special_person_shejing').attr("checked",
					"checked");
				}
				if(staff_info.info.info_special_person.indexOf("涉众")!=-1) {
					$('#caseDateles_info_special_person_shezhong').attr("checked",
					"checked");
				}
				if(staff_info.info.info_special_person.indexOf("涉黑")!=-1) {
					$('#caseDateles_info_special_person_shehei').attr("checked",
					"checked");
				}
			}

			// 基本信息，通知局长、政委
			if (staff_info.info.info_inform_leaders != null) {
				if ("是" == staff_info.info.info_inform_leaders.trim()) {
					$('#caseDateles_info_inform_leaders_yes').attr("checked",
							"checked");
				}
			} else {
			}
			// 办案单位
			if (staff_info.department.department_name == null
					&& staff_info.department.department_name > 0) {
				$('input[name="department.department_name"]').val("");
			} else {
				$('input[name="department.department_name"]').val(
						staff_info.department.department_name);
			}

			// 主办民警
			if (staff_info.police[0] == null) {
				$('input[name="police[0].police_name"]').val("");
			} else {
				$('input[name="police[0].police_name"]').val(
						staff_info.police[0].police_name);
			}
			// 协办民警1
			if (staff_info.police[1] == null) {
				$('input[name="police[1].police_name"]').val("");
			} else {
				$('input[name="police[1].police_name"]').val(
						staff_info.police[1].police_name);
			}
			// 协办民警2
			if (staff_info.police[2] == null) {
				$('input[name="police[2].police_name"]').val("");
			} else {
				$('input[name="police[2].police_name"]').val(
						staff_info.police[2].police_name);
			}
			// 值班局领导
			if (staff_info.leader.police_name == null) {
				$('input[name="leader.police_name"]').val("");
			} else {
				$('input[name="leader.police_name"]').val(
						staff_info.leader.police_name);
			}
			// 值班法制大队民警
			if (staff_info.legal.police_name == null) {
				$('input[name="legal.police_name"]').val("");
			} else {
				$('input[name="legal.police_name"]').val(
						staff_info.legal.police_name);
			}

			// 判断案件类别显示不同办案流程
			info_category(staff_info);
			// 判断受立案和流程的互斥显示
			putOnRecord_process_visible(staff_info);
			// 判断提交按钮可见性
			commit_btn_visible(staff_info);
		}
	}
	xmlhttp.open("post", url, true);
	xmlhttp.send();
}
// 判断案件类别，显示相应的案件流程
function info_category(staff_info) {
	var case1 = staff_info.info;
	// alert(case1.info_category)
	if (case1.info_category == '行政案件') {
		$("#xingzheng_case").show();
		// $("#xingshi_case").hide();
	} else {
		$("#xingzheng_case").hide();
	}
	if (case1.info_category == '刑事案件') {
		$("#xingshi_case").show();
		// $("#xingzheng_case").hide();
	} else {
		$("#xingshi_case").hide();
	}
}
// 判断“受立案”与“流程”显示；立案字段!="是"则显示受立案隐藏流程；立案字段=="是"则显示流程隐藏受立案
function putOnRecord_process_visible(staff_info) {
	// console.log("是否立案："+staff_info.process.process_put_on_record)
	if (staff_info.process.process_put_on_record == "是") {
		// 流程显示
		$(".div_no_put_on_record").show();
	} else {
		$(".div_put_on_record").show();
		$(".div_no_put_on_record").hide();
	}
}
// 判断提交按钮的可见性
var loginer_id = $("#loginer_id").html().trim();
function commit_btn_visible(staff_info) {
	// 判断如果是办案民警就显示按钮
	// 办案民警提交按钮对象
	var police_commit = $(".btn_police_commit");
	// 法制民警提交按钮对象
	var legal_commit = $(".btn_legal_commit");
	// 所队长提交按钮对象
	var cap_commit = $(".btn_cap_commit");
	if (null == staff_info.police[0] || "" == staff_info.police[0]
			|| undefined == staff_info.police[0]) {
	} else {
		if (staff_info.police[0].ajdbxt_police_id == loginer_id) {
			police_commit.show();
		}
	}
	if (null == staff_info.police[1] || "" == staff_info.police[1]
			|| undefined == staff_info.police[1]) {
	} else {
		if (staff_info.police[1].ajdbxt_police_id == loginer_id) {
			police_commit.show();
		}
	}
	if (null == staff_info.police[2] || "" == staff_info.police[2]
			|| undefined == staff_info.police[2]) {
	} else {
		if (staff_info.police[2].ajdbxt_police_id == loginer_id) {
			police_commit.show();
		}
	}
	// 判断所队长审核按钮的可见性
	if (null == staff_info.cap || "" == staff_info.cap
			|| undefined == staff_info.cap) {
	} else {
		if (staff_info.cap.ajdbxt_police_id == loginer_id) {
			cap_commit.show();
		}
	}
	// 判断法制民警操作按钮可见性
	if (null == staff_info.legal || "" == staff_info.legal
			|| undefined == staff_info.legal) {
	} else {
		if (staff_info.legal.ajdbxt_police_id == loginer_id) {
			legal_commit.show();
		}
	}

}

// ------------------------------------------------刑事案件案卷上交/拿回按钮显示与否
/*
 * function cesehand_img(case1) { // 第一次案卷上交 if (case1.process_file_hand == "是") { //
 * 显示提交图片，隐藏案卷上交按钮 $("#process_file_hand_penal_one_img").show();
 * $("#process_file_hand_penal_one_bnt").hide(); } else { // 隐藏提交图片，显示案卷上交按钮
 * $("#process_file_hand_penal_one_img").hide()
 * $("#process_file_hand_penal_one_bnt").show() } // 第二次案卷上交 if
 * (case1.process_file_hand_two == "是") { // 显示提交图片，隐藏案卷上交按钮
 * $("#process_file_hand_two_two_qubao_img").show();
 * $("#process_file_hand_two_two_qubao_bnt").hide(); } else { // 隐藏提交图片，显示案卷上交按钮
 * $("#process_file_hand_two_two_qubao_img").hide()
 * $("#process_file_hand_two_two_qubao_bnt").show() }
 * 
 * if (case1.process_file_hand_two != null) {
 * $("#process_file_hand_two_penal_two_img").show();
 * $("#process_file_hand_two_penal_two_bnt").hide();
 * $("#process_file_hand_two_two_qubao_img").show();
 * $("#process_file_hand_two_two_qubao_bnt").hide(); if
 * (case1.process_file_hand_two == "否") {
 * $("#process_file_hand_penal_two_no_img").show();
 * $("#process_file_hand_penal_two_no_bnt").hide(); } } // 第三次案卷上交 if
 * (case1.process_file_hand_three == "是") { // 显示提交图片，隐藏案卷上交按钮
 * $("#process_file_hand_three_img").show();
 * $("#process_file_hand_three_bnt").hide(); } else { // 隐藏提交图片，显示案卷上交按钮
 * $("#process_file_hand_three_img").hide()
 * $("#process_file_hand_three_bnt").show() }
 * 
 * if (case1.process_file_hand_three == "是") {
 * $("#process_file_hand_three_img").show();
 * $("#process_file_hand_three_bnt").hide();
 * $("#process_file_hand_three_qubao_img").show();
 * $("#process_file_hand_three_qubao_bnt").hide(); }
 * 
 * if (case1.process_casefile_auxiliary == "是") {
 * $("#process_casefile_auxiliary_id_img").show();
 * $("#process_casefile_auxiliary_id_bnt").hide(); } }
 */
// 控制每次强制措施显示的div和其他流程
/*
 * function pencalmanagement(case1) { // 第一次强制措施选完后会显示的div if
 * (case1.process_force_measure_one != null &&
 * case1.process_force_measure_one.length>0) { // 第二次证据上交div
 * $("#zhenju_two").show(); // 第二次提出问题div $("#tichu_two").show(); if
 * (case1.process_force_measure_one =="拘留") { $("#second_punishment").show;
 * $("#second_punishment_other").hide(); } if (case1.process_force_measure_one ==
 * "取保候审" || case1.process_force_measure_one == "监视居住" ||
 * $("#second_punishment_two").attr("checked")) {
 * $("#second_punishment").hide(); $("#second_punishment_other").show(); } } if
 * (case1.process_force_measure_one == "拘留") { // 拘留延长期限div
 * $("#detention_delay_date").show(); // 第二次强制 逮捕div
 * $("#second_punishment").show(); // 案卷已上交div $("#twocase_hand_juliu").show(); }
 * if (case1.process_force_measure_one == "取保候审" ||
 * case1.process_force_measure_one == "监视居住") { // 第二次强制 取保div
 * $("#qubao_second_punishment").show(); // 第二次案卷已上交 取保
 * $("#twocase_hand_qubao").show(); } // 第二次案卷拿回天数 if
 * (case1.process_file_hand_two == "是") { $("#nahui_day_two").show(); } //
 * 第二次案卷拿回 if (case1.process_fileback_day_two != null) {
 * $("#casehand_two_no").show(); } // 第一次案卷拿回天数 if (case1.process_file_hand ==
 * "是") { $("#nahui_day_one").show(); } // 第一次案卷拿回 if
 * (case1.process_fileback_day != null) { $("#casehand_no").show(); } // 第二次问题整改
 * if (case1.process_question_list_two != null) { $("#zhengai_two").show(); } //
 * 第三次强制措施 if (case1.process_force_measure_two == "逮捕") {
 * $("#third_punishment").show(); $("#threecase_hand_daibu").show();
 * $("#shangjiao_ju").show(); // 第二次强制措施的案卷上交 if (case1.process_fileup_day !=
 * null) { $("#twocase_hand_juliu").show(); } } if
 * (case1.process_force_measure_two == "取保候审" || case1.process_force_measure_two ==
 * "监视居住") { $("#qubao_third_punishment").show();
 * $("#threecase_hand_qubao").show(); $("#shangjiao_qu").show(); // 第二次强制措施的案卷上交
 * if (case1.process_fileup_day != null) { $("#twocase_hand_qubao").show(); } } //
 * if(case1.process_force_measure_two=="起诉"){ // $("#supplement_check").show(); //
 * $("#checkOne").show(); // } // 第四次强制措施 if (case1.process_force_measure_three ==
 * "取保候审") { $("#fourth_punishment").show(); $("#threecase_hand_daibu").show();
 * $("#process_evidence_to_upload_two_three").show(); //
 * $("#process_evidence_to_upload_two_four").show(); } if
 * (case1.process_force_measure_three == "起诉") {
 * $("#threecase_hand_daibu").show();
 * $("#process_evidence_to_upload_two_three").show(); } if
 * (case1.process_force_measure_three == "撤案") {
 * $("#process_file_hand_three_qubao").show();
 * $("#process_evidence_to_upload_two_three").show(); } if
 * (case1.process_force_measure_three == "解保") {
 * $("#process_file_hand_three_qubao").show();
 * $("#process_evidence_to_upload_two_three").show(); } if
 * (case1.process_force_measure_four != null) {
 * $("#process_evidence_to_upload_two_four").show(); } // 第四次的强制措施中的起诉 //
 * if(case1.process_result_of_prosecution=="起诉"){ //
 * $("#supplement_check").show(); // $("#checkOne").show(); // } // 补查一次 if
 * (case1.process_search_result_one == "是") { $("#supplement_check").show();
 * $("#checkTwo").show(); } if (case1.process_search_result_one == "是" ||
 * case1.process_search_result_one == "否") { $("#supplement_check").show();
 * $("#checkOne").show(); } }
 */

// 控制第一次强制 内容div，radio的onclick调用
function mandatory_measuresBtnClick() {
	var mandatory_measuresOne = document
			.getElementsByName("ajdbxtProcess.process_force_measure_one");
	for (var num = 0; num < 3; num++) {
		var mandatory_measuresOne_value = mandatory_measuresOne[num].value;
		if (mandatory_measuresOne[num].checked) {
			if (mandatory_measuresOne_value == "拘留") {// 根据第一次强制措施选择拘留进行判断
				// 延长拘留div
				document.getElementById("detention_delay_date").style.display = "block";
				// 有逮捕的第二次强制选择框显示
				document.getElementById("second_punishment").style.display = "block";
				// 没有逮捕的第二次强制选择框隐藏
				document.getElementById("second_punishment_other").style.display = "none";
				document.getElementById("supplement_check").style.display = "none";// 隐藏补查
				$("#third_punishment").css("display", "none");// 第三次强制措施内容隐藏
				$("#fourth_punishment").css("display", "none");// 第四次强制措施内容隐藏
			} else if (mandatory_measuresOne_value == "取保候审"
					|| mandatory_measuresOne_value == "监视居住") {// 选择取保候审显示第二次强制措施内容
				document.getElementById("detention_delay_date").style.display = "none";
				document.getElementById("second_punishment").style.display = "none";
				document.getElementById("second_punishment_other").style.display = "block";
				document.getElementById("supplement_check").style.display = "none";// 隐藏补查
				$("#third_punishment").css("display", "none");// 第三次强制措施内容隐藏
				$("#fourth_punishment").css("display", "none");// 第四次强制措施内容隐藏
			} else {// 选择监视居住显示第二次强制措施内容
				// document.getElementById("detention_delay_date").style.display
				// = "none";
				// document.getElementById("second_punishment").style.display =
				// "none";
				// document.getElementById("qubao_second_punishment").style.display
				// = "none";
				// document.getElementById("supplement_check").style.display =
				// "none";// 隐藏补查
				// $("#third_punishment").css("display", "none");// 第三次强制措施隐藏
				// $("#fourth_punishment").css("display", "none");// 第四次强制措施隐藏
			}

		}
	}
}
// 控制第二次强制内容div，给radio的onclick调用
function second_punishmentClick() {
	var second_punishment = document
			.getElementsByName("ajdbxtProcess.process_force_measure_two");
	for (var num = 0; num < 6; num++) {
		var second_punishment_value = second_punishment[num].value;
		if (second_punishment[num].checked) {
			if (second_punishment_value == "逮捕") {
				// 撤、起诉、解保隐藏
				$("#qubao_third_punishment").hide();
				// 起诉、取保显示
				$("#third_punishment").show();
				// 案卷上交天数
				$("#shangjiao_ju").show();
				// 第二次案卷已上交
				$("#twocase_hand_juliu").show();
				// 第二次提出问题
				$("#tichu_two").show();
				// 第二次案卷拿回天数
				$("#nahui_day_two").show();
				// 第二次案卷已拿回
				$("#casehand_two_no").show();
				// 第二次问题整改
				$("#zhengai_two").show();
				// 第二次证据上交
				$("#zhenju_two").hide();
				$("#qubao_zhenju_two").hide();
				// 隐藏补查
				document.getElementById("supplement_check").style.display = "none";
			} else if (second_punishment_value == "取保候审"
					|| second_punishment_value == "监视居住") {
				$("#qubao_third_punishment").show();
				$("#third_punishment").hide();
				// 案卷上交天数
				$("#shangjiao_ju").show();
				// 第二次案卷已上交
				$("#twocase_hand_juliu").show();
				// 第二次提出问题
				$("#tichu_two").show();
				// 第二次案卷拿回天数
				$("#nahui_day_two").show();
				// 第二次案卷已拿回
				$("#casehand_two_no").show();
				// 第二次问题整改
				$("#zhengai_two").show();
				// 第二次证据上交
				$("#zhenju_two").hide();
				$("#qubao_zhenju_two").show();
				// 第四次强制措施隐藏
				$("#fourth_punishment").hide();
				// 隐藏补查
				document.getElementById("supplement_check").style.display = "none";
			} else if (second_punishment_value == "起诉") {
				$("#qubao_third_punishment").hide();
				$("#third_punishment").hide();
				// 案卷上交天数
				$("#shangjiao_ju").hide();
				// 第二次案卷已上交
				$("#twocase_hand_juliu").hide();
				// 第二次提出问题
				$("#tichu_two").hide();
				// 第二次案卷拿回天数
				$("#nahui_day_two").hide();
				// 第二次案卷已拿回
				$("#casehand_two_no").hide();
				// 第二次问题整改
				$("#zhengai_two").hide();
				// 第二次证据上交
				$("#zhenju_two").hide();
				$("#qubao_zhenju_two").hide();
				// 第四次强制措施隐藏
				$("#fourth_punishment").hide();
				// 补查
				document.getElementById("supplement_check").style.display = "block";
				document.getElementById("checkOne").style.display = "block";
				document.getElementById("checkTwo").style.display = "none";
			} else if (second_punishment_value == "解保"
					|| second_punishment_value == "撤案") {
				document.getElementById("checkOne").style.display = "none";
				document.getElementById("checkTwo").style.display = "none";
				document.getElementById("supplement_check").style.display = "none";// 隐藏补查
				$("#qubao_third_punishment").hide();
				$("#third_punishment").hide();
				// 案卷上交天数
				$("#shangjiao_ju").hide();
				// 第二次案卷已上交
				$("#twocase_hand_juliu").hide();
				// 第二次提出问题
				$("#tichu_two").hide();
				// 第二次案卷拿回天数
				$("#nahui_day_two").hide();
				// 第二次案卷已拿回
				$("#casehand_two_no").hide();
				// 第二次问题整改
				$("#zhengai_two").hide();
				// 第二次证据上交
				$("#zhenju_two").hide();
				$("#qubao_zhenju_two").hide();
				// 第四次强制措施隐藏
				$("#fourth_punishment").hide();
			} else {
				// $("#third_punishment").css("display", "block");
				// document.getElementById("checkOne").style.display = "none";
				// document.getElementById("checkTwo").style.display = "none";
				// $("#fourth_punishment").css("display", "none");// 第四次强制措施隐藏
				// document.getElementById("supplement_check").style.display =
				// "none";// 隐藏补查

			}
		}
	}
}
// 控制第三次强制内容div，给radio的onclick调用
function third_punishmentClick() {
	var third_punishment = document
			.getElementsByName("ajdbxtProcess.process_force_measure_three");
	for (var num = 0; num < 4; num++) {
		var third_punishment_value = third_punishment[num].value;
		if (third_punishment[num].checked) {
			if (third_punishment_value == "起诉") {// 选择第三次的起诉显示补查一次
				document.getElementById("supplement_check").style.display = "block";
				// 第四次强制措施隐藏
				$("#fourth_punishment").css("display", "none");
				document.getElementById("checkOne").style.display = "block";
				document.getElementById("checkTwo").style.display = "none";
				$("#zhenju_two").hide();
				$("#qubao_zhenju_two").hide();
			} else if (third_punishment_value == "撤案") {
				$("#fourth_punishment").css("display", "none");
				document.getElementById("checkOne").style.display = "none";
				document.getElementById("checkTwo").style.display = "none";
				$("#zhenju_two").hide();
			} else if (third_punishment_value == "解保") {
				$("#fourth_punishment").css("display", "none");
				document.getElementById("checkOne").style.display = "none";
				document.getElementById("checkTwo").style.display = "none";
				$("#zhenju_two").hide();
			} else if (third_punishment_value == "取保候审") {
				$("#fourth_punishment").css("display", "block");
				document.getElementById("checkOne").style.display = "none";
				document.getElementById("checkTwo").style.display = "none";
				$("#zhenju_two").show();
				$("#qubao_zhenju_two").hide();
			} else {// 选择第二次的监视居住显示第三次强制措施内容， 取保
				$("#fourth_punishment").css("display", "block");
				// 第二次证据上传
				// $("#zhenju_two").show();
				// document.getElementById("checkOne").style.display = "none";
				// document.getElementById("checkTwo").style.display = "none";
				// document.getElementById("supplement_check").style.display =
				// "none";// 隐藏补查
			}
		}

	}

}
// 控制第四次强制内容div，给radio的onclick调用
function four_punishmentClick() {
	var four_punishment = document
			.getElementsByName("ajdbxtProcess.process_force_measure_four");
	for (var num = 0; num < 3; num++) {
		var four_punishment_value = four_punishment[num].value;
		if (four_punishment[num].checked) {
			if (four_punishment_value == "起诉") {// 选择第三次的起诉显示补查一次
				document.getElementById("supplement_check").style.display = "block";
				// 第四次强制措施隐藏
				document.getElementById("checkOne").style.display = "block";
				document.getElementById("checkTwo").style.display = "none";
			} else {// 选择第二次的监视居住显示第三次强制措施内容
				document.getElementById("checkOne").style.display = "none";
				document.getElementById("checkTwo").style.display = "none";
				document.getElementById("supplement_check").style.display = "none";// 隐藏补查
			}
		}
	}
}
/*
 * 点击补查一次为是时，显示补查二次。否则不显示
 */
function checkOne_Click() {
	var checkOne = document
			.getElementsByName("ajdbxtProcess.process_search_result_one");
	for (var num = 0; num < 2; num++) {
		var checkOne_value = checkOne[num].value;
		if (checkOne[num].checked) {
			if (checkOne_value == "是") {
				document.getElementById("checkTwo").style.display = "block";
			} else {
				document.getElementById("checkTwo").style.display = "none";
			}
		}
	}
}

// -----------------------------------------按钮操作-------------------------------
// 受立案提交按钮点击事件
function process_put_on_record_penal_but() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {
			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadprocess_put_on_record_penal_but();
				}
			}
		}
	});
}
// 立案确认提交
function penalloadprocess_put_on_record_penal_but() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				// 重新加载流程
				// get_penalProcessDetails(info_id);
				// 强制刷新页面,true等同于F5，false从客户端缓存里取当前页
				location.reload(true);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/putOnRecordProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 涉案财物已入库
function pencalchange_goods_in_lib_yes(even) {
	var sex = document.getElementById("goods_in_lib_yes");
	sex.value = '是';
	return sex.value;
}
function pencalchange_goods_in_lib_no(even) {
	var sex = document.getElementById("goods_in_lib_no");
	sex.value = '否';
	return sex.value;
}
function goods_in_lib() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadgoods_in_lib();
				}
			}
		}
	});
}
// 是否涉案财物入库提交按钮
function penalloadgoods_in_lib() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
function changesecond_punishmentClick_one(even) {
	var sex = document.getElementById("second_punishment_one");
	sex.value = '逮捕';
	return sex.value;
}
function changesecond_punishmentClick_two(even) {
	var sex = document.getElementById("second_punishment_two");
	sex.value = '取保候审';
	return sex.value;
}
function changesecond_punishmentClick_three(even) {
	var sex = document.getElementById("second_punishment_three");
	sex.value = '监视居住';
	return sex.value;
}
function pencalchange_cheantwo_yes(even) {
	var sex = document.getElementById("chenantwo_yes");
	sex.value = '撤案';
	return sex.value;
}
function pencalchange_cheantwo_no(even) {
	var sex = document.getElementById("chenantwo_no");
	sex.value = '起诉';
	return sex.value;
}
function pencalchange_cheantwo_new(event) {
	var sex = document.getElementById("chenantwo_new");
	sex.value = '解保';
	return sex.value;
}
// 第二次强制措施(拘留)
function second_punishment() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadsecond_punishment();
				}
			}
		}
	});
}
// 第二次强制措施(拘留)提交按钮
function penalloadsecond_punishment() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/forceMeasureTwoProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 第二次强制措施（取保候审、监视居住）
function chenantwo_second_punishment() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadchenantwo_second_punishment();
				}
			}
		}
	});
}
// 第二次强制措施（取保候审、监视居住）提交按钮
function penalloadchenantwo_second_punishment() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/forceMeasureTwoProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 延长拘留
function pencalchangecriminal_detention_one(even) {
	var sex = document
			.getElementById("process_lengthen_criminal_detention_one");
	sex.value = '30';
	return sex.value;
}
function pencalchangecriminal_detention_two(even) {
	var sex = document
			.getElementById("process_lengthen_criminal_detention_two");
	sex.value = '7';
	return sex.value;
}
function pencalchangecriminal_detention_three(even) {
	var sex = document
			.getElementById("process_lengthen_criminal_detention_three");
	sex.value = '0';
	return sex.value;
}
function process_lengthen_criminal_detention() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadprocess_lengthen_criminal_detention();
				}
			}
		}
	});
}
// 是否延长拘留提交按钮
function penalloadprocess_lengthen_criminal_detention() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/extendDetentionTimeProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 涉案财物提交按钮onclick方法
function penalcase_property() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {
			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadcaseDetail_case_property();
				}
			}
		}
	});
}
// 涉案财物提交按钮确认
function penalloadcaseDetail_case_property() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/goodsLibProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 第三次强制措施
function pencalchangequbaothree_yes(even) {
	var sex = document.getElementById("qubaothree_yes");
	sex.value = '取保候审';
	return sex.value;
}
function pencalchangequbaothree_no(even) {
	var sex = document.getElementById("qubaothree_no");
	sex.value = '起诉';
	return sex.value;
}
function pencalchangecheanthree_yes(even) {
	var sex = document.getElementById("cheanthree_yes");
	sex.value = '撤案';
	return sex.value;
}
function pencalchangecheanthree_no(even) {
	var sex = document.getElementById("cheanthree_no");
	sex.value = '起诉';
	return sex.value;
}
function pencalchangecheanthree_new(event) {
	var sex = document.getElementById("cheanthree_new");
	sex.value = '解保';
	return sex.value;
}
function third_punishment() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadthird_punishment();
				}
			}
		}
	});
}
function qubao_third_punishment() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadqubao_third_punishment();
				}
			}
		}
	});
}
// 是否第三次强制措施提交按钮
function penalloadthird_punishment() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/forceMeasureThreeProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
//
function penalloadqubao_third_punishment() {
	console.log("b2");
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/forceMeasureThreeProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 第三次案卷上交
function process_file_hand_three_bnt() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadprocess_file_hand_three_bnt();
				}
			}
		}
	});
}
function penalloadprocess_file_hand_three_bnt() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var process_file_hand_three = document
			.getElementById("process_file_hand_three").value;
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	formData.append("ajdbxtProcess.process_file_hand_three",
			process_file_hand_three);
	xmlhttp.onreadystatechange = function() {
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/fileUpProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 第三次案卷上交（取保候审、监视居住）
function process_file_hand_three_qubao_bnt() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadprocess_file_hand_three_qubao_bnt();
				}
			}
		}
	});
}
// 第三次案卷上交（取保候审、监视居住）提交按钮
function penalloadprocess_file_hand_three_qubao_bnt() {
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var process_file_hand_three_qubao = document
			.getElementById("process_file_hand_three_qubao").value;
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	formData.append("ajdbxtProcess.process_file_hand_three",
			process_file_hand_three_qubao);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/fileUpProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 第三次证据上交
function change_process_evidence_to_upload_two_three_yes(even) {
	var sex = document
			.getElementById("process_evidence_to_upload_two_three_yes");
	sex.value = '是';
	return sex.value;
}
function change_process_evidence_to_upload_two_three_no(even) {
	var sex = document
			.getElementById("process_evidence_to_upload_two_three_no");
	sex.value = '否';
	return sex.value;
}
function process_evidence_to_upload_two_three_but() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadprocess_evidence_to_upload_two_three_but();
				}
			}
		}
	});
}
// 第三次证据上交提交按钮
function penalloadprocess_evidence_to_upload_two_three_but() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 第四次强制措施
function pencalchangechenfour_yes(even) {
	var sex = document.getElementById("cheanfour_yes");
	sex.value = '撤案';
	return sex.value;
}
function pencalchangechenfour_no(even) {
	var sex = document.getElementById("chenanfour_no");
	sex.value = '起诉';
	return sex.value;
}
function pencalchangechenfour_new(even) {
	var sex = document.getElementById("chenanfour_new");
	sex.value = '解保';
	return sex.value;
}
function fourth_punishment() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadfourth_punishment();
				}
			}
		}
	});
}
// 是否第四次强制措施提交按钮
function penalloadfourth_punishment() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/forceMeasureFourProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 第四次证据上交
function change_process_evidence_to_upload_two_four_yes(even) {
	var sex = document
			.getElementById("process_evidence_to_upload_two_four_yes");
	sex.value = '是';
	return sex.value;
}
function change_process_evidence_to_upload_two_four_no(even) {
	var sex = document.getElementById("process_evidence_to_upload_two_four_no");
	sex.value = '否';
	return sex.value;
}
function process_evidence_to_upload_two_four_bnt() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadprocess_evidence_to_upload_two_four_bnt();
				}
			}
		}
	});
}
// 第四次证据上交提交按钮
function penalloadprocess_evidence_to_upload_two_four_bnt() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 第一次补查
function pencalchangecheckone_yes(even) {
	var sex = document.getElementById("checkone_yes");
	sex.value = '是';
	return sex.value;
}
function pencalchangecheckone_no(even) {
	var sex = document.getElementById("checkedone_no");
	sex.value = '否';
	return sex.value;
}
function checkOne() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadcheckOne();
				}
			}
		}
	});
}
// 是否第一次补查提交按钮
function penalloadcheckOne() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/resultOneProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 第二次补查
function pencalchangechecktwo_yes(even) {
	var sex = document.getElementById("checktwo_yes");
	sex.value = '是';
	return sex.value;
}
function pencalchangechecktwo_no(even) {
	var sex = document.getElementById("checkedtwo_no");
	sex.value = '否';
	return sex.value;
}
function checkTwo() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadcheckTwo();
				}
			}
		}
	});
}
// 是否第二次补查提交按钮
function penalloadcheckTwo() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/resultTwoProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 延长传唤
function penalchangesuspect_summon_yes(even) {
	var sex = document.getElementById("penalsuspect_summon_yes");
	sex.value = '是';
	return sex.value;
}
function penalchangesuspect_summon_no(even) {
	var sex = document.getElementById("penalsuspect_summon_no");
	sex.value = '否';
	return sex.value;
}
function penalsuspect_summon() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadpenalsuspect_summon();
				}
			}
		}
	});
}
// 是否延长传唤提交按钮
function penalloadpenalsuspect_summon() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 鉴定
function penalchangeidentification_yes(even) {
	var sex = document.getElementById("penalidentification_yes");
	sex.value = '是';
	return sex.value;
}
function penalchangeidentification_no(even) {
	var sex = document.getElementById("penalidentification_no");
	sex.value = '否';
	return sex.value;
}
function penalidentification() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadpenalidentification();
				}
			}
		}
	});
}
// 是否鉴定提交按钮
function penalloadpenalidentification() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 第一次强制措施
function mandatory_measuresBtnClick_one(even) {
	var sex = document.getElementById("measure_one_one");
	sex.value = '拘留';
	return sex.value;
}
function mandatory_measuresBtnClick_two(even) {
	var sex = document.getElementById("measure_one_two");
	sex.value = '监视居住';
	return sex.value;
}
function mandatory_measuresBtnClick_three(even) {
	var sex = document.getElementById("measure_one_three");
	sex.value = '取保候审';
	return sex.value;
}
function penalmeasure_one() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadpenalmeasure_one();
				}
			}
		}
	});
}
// 第一次强制措施提交按钮
function penalloadpenalmeasure_one() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/forceMeasureOneProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// （第一次强制措施）证据上交
function change_penal_process_evidence_to_upload_yes(even) {
	var sex = document.getElementById("process_evidence_to_upload_penal_yes");
	sex.value = '是';
	return sex.value;
}
function change_penal_process_evidence_to_upload_no(even) {
	var sex = document.getElementById("process_evidence_to_upload_penal_no");
	sex.value = '否';
	return sex.value;
}
function process_evidence_to_upload_penal_but() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadprocess_evidence_to_upload_penal_but();
				}
			}
		}
	});
}
// 是否（第一次强制措施）证据上交提交按钮
function penalloadprocess_evidence_to_upload_penal_but() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/notifyLegalSummitProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 第一次提出问题，按钮onclick
function pencalproblem_asking() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {
			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadpencalproblem_asking();
				}
			}
		}
	});
}
// 第一次提出问题，确认按钮
function penalloadpencalproblem_asking() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	// 第一次提出问题
	var processDetails = document.getElementById("penalProcessDetails");
	var question_list = document.getElementById("penalprocess_question_list").value;
	var formData = new FormData(processDetails);
	formData.append("ajdbxtProcess.process_question_list", question_list);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				console.log("执行了吗")
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp
			.open(
					"post",
					"/ajdbxt/process/upadteQuestion_listProcessAction?ajdbxtProcess.process_case_id="
							+ info_id, true);
	xmlhttp.send(formData);
}
// 第一次案卷拿回,按钮onclick
function penal_process_fileback_day() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {
			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadprocess_fileback_day();
				}
			}
		}
	});
}
// 第一次案卷拿回，按钮确认
function penalloadprocess_fileback_day() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	// 第一次案卷拿回天数
	var process_fileback_day = document.getElementById("process_fileback_day").value;
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	formData.append("ajdbxtProcess.process_fileback_day", process_fileback_day);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/caseFileBackProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 第一次问题整改，提交按钮onclick
function pencalproblem_rectification() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {
			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadpencalproblem_rectification();
				}
			}
		}
	});
}
// 第一次问题整改提交按钮 确认
function penalloadpencalproblem_rectification() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var id_array = new Array();
	$('input[name="case1.process_question"]:checked').each(function() {
		id_array.push($(this).val());// 向数组中添加元素
	});
	var idstr = id_array.join(',');// 将数组元素连接起来以构建一个字符串
	var formData = new FormData();
	formData.append("ajdbxtProcess.process_question", idstr);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateQuestionProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 第二次问题整改
function pencalproblem_rectification_two() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadpencalproblem_rectification_two();
				}
			}
		}
	});
}
// 第二次是否问题整改提交按钮
function penalloadpencalproblem_rectification_two() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var id_array = new Array();
	$('input[name="case1.process_question_two"]:checked').each(function() {
		id_array.push($(this).val());// 向数组中添加元素
	});
	var idstr = id_array.join(',');// 将数组元素连接起来以构建一个字符串
	var formData = new FormData();
	formData.append("ajdbxtProcess.process_question_two", idstr);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateQuestionProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 案卷上交天数
function penal_process_fileup_day_juliu() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {
			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadprocess_fileup_day_juliu();
				}
			}
		}
	});
}
// 案卷上交天数（拘留）提交按钮
function penalloadprocess_fileup_day_juliu() {
	var xmlhtpp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var process_fileup_day_juliu = document
			.getElementById("process_fileup_day_juliu").value;
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	// 案卷上交天数
	formData.append("ajdbxtProcess.process_fileup_day",
			process_fileup_day_juliu);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/fileUpProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 第二次 案卷已上交
function process_file_hand_two_but() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {
			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadprocess_file_hand_two_but();
				}
			}
		}
	});
}
// 第二次强制措施案卷上交提交按钮
function penalloadprocess_file_hand_two_but() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var process_file_hand_two_penal_two = document
			.getElementById("process_file_hand_two_penal_two").value;
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	formData.append("ajdbxtProcess.process_file_hand_two",
			process_file_hand_two_penal_two);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/fileUpProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 案卷上交天数（取保候审、监视居住）
function process_fileup_day_qubao() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadprocess_fileup_day_qubao();
				}
			}
		}
	});
}
// 案卷上交天数（取保候审、监视居住）提交按钮
function penalloadprocess_fileup_day_qubao() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var process_fileup_day_qubao = document
			.getElementById("process_fileup_day_qubao").value;
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	formData.append("ajdbxtProcess.process_fileup_day",
			process_fileup_day_qubao);
	xmlhttp.onreadystatechange = function() {
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/fileUpProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 第二次案卷上交（取保候审、监视居住）
function process_file_hand_two_qubao_bnt() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadprocess_file_hand_two_qubao_bnt();
				}
			}
		}
	});
}
// 第二次案卷上交（取保候审、监视居住）提交按钮
function penalloadprocess_file_hand_two_qubao_bnt() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var process_file_hand_two_two_qubao = document
			.getElementById("process_file_hand_two_two_qubao").value;
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	formData.append("ajdbxtProcess.process_file_hand_two",
			process_file_hand_two_two_qubao);
	xmlhttp.onreadystatechange = function() {
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 第二次证据上交
function change_penal_process_evidence_to_upload_two_yes_two(even) {
	var sex = document
			.getElementById("process_evidence_to_upload_two_penal_two_yes");
	sex.value = '是';
	return sex.value;
}
function change_penal_process_evidence_to_upload_two_no_two(even) {
	var sex = document
			.getElementById("process_evidence_to_upload_two_penal_two_no");
	sex.value = '否';
	return sex.value;
}
function process_evidence_to_upload_two_two() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadprocess_evidence_to_upload_two_two();
				}
			}
		}
	});
}
// 第二次证据上交提交按钮
function penalloadprocess_evidence_to_upload_two_two() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 第二次 提出问题
function process_question_list_two_asking() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {
			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadprocess_question_list_two();
				}
			}
		}
	});
}
// 第二次法制大队提出问题提交按钮
function penalloadprocess_question_list_two() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var process_question_list_two = document
			.getElementById("process_question_list_two").value;
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	// 第二次提出问题
	formData.append("ajdbxtProcess.process_question_list_two",
			process_question_list_two);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp
			.open(
					"post",
					"/ajdbxt/process/upadteQuestion_listProcessAction?ajdbxtProcess.process_case_id="
							+ info_id, true);
	xmlhttp.send(formData);
}
// 第二次案卷拿回天数
function penal_process_fileback_day_two() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadprocess_fileback_day_two();
				}
			}
		}
	});
}
// 第二次案卷拿回天数提交按钮
function penalloadprocess_fileback_day_two() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var process_fileback_day_two = document
			.getElementById("process_fileback_day_two").value;
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	// 第二次案卷拿回天数
	formData.append("ajdbxtProcess.process_fileback_day_two",
			process_fileback_day_two);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/caseFileBackTwoProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 第二次案卷拿回
function process_file_hand_two_nahui_nut() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadprocess_file_hand_two_nahui_nut();
				}
			}
		}
	});
}
// 第二次案卷已拿回提交按钮
function penalloadprocess_file_hand_two_nahui_nut() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var process_file_hand_penal_two_no = document
			.getElementById("process_file_hand_penal_two_no").value;
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	//
	formData.append("ajdbxtProcess.process_file_hand_two",
			process_file_hand_penal_two_no);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/caseFileBackTwoProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 结案
function pencalchangecase_ending_yes(even) {
	var sex = document.getElementById("pencalcase_ending_yes");
	sex.value = '是';
	return sex.value;
}
function pencalchangecase_ending_no(even) {
	var sex = document.getElementById("pencalcase_ending_no");
	sex.value = '否';
	return sex.value;
}
function pencalcase_ending() {
	if(!document.getElementById("pencalcase_ending_yes").checked&&!document.getElementById("pencalcase_ending_no").checked){
		toastr.error('请选择是否结案');
	}else{
		$.confirm({
			title : '提交!',
			content : '确定提交么!',
			buttons : {

				取消 : function() {
				},
				确定 : {
					action : function() {
						penalloadpencalcase_ending();
					}
				}
			}
		});
	}
}
// 是否结案提交按钮
function penalloadpencalcase_ending() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/caseEndProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 评分
function pencalcase_score() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadpencalcase_score();
				}
			}
		}
	});
}
// 是否评分提交按钮
function penalloadpencalcase_score() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var pencalinput_case_score = document
			.getElementById("pencalinput_case_score").value;
	var formData = new FormData();
	formData.append("ajdbxtProcess.process_score", pencalinput_case_score);
	xmlhttp.onreadystatechange = function() {
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 附卷上交
function process_casefile_auxiliary_bnt() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadprocess_casefile_auxiliary_bnt();
				}
			}
		}
	});
}
// 附卷上交提交按钮
function penalloadprocess_casefile_auxiliary_bnt() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var process_casefile_auxiliary_id = document
			.getElementById("process_casefile_auxiliary_id").value;
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	formData.append("ajdbxtProcess.process_casefile_auxiliary",
			process_casefile_auxiliary_id);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/auxiliaryFileProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// （第一次强制措施）案件上交
function pencalcasehand() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {
			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadpencalcasehand();
				}
			}
		}
	});
}
// 是否（第一次强制措施）案件上交提交按钮
function penalloadpencalcasehand() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	// 第一次案卷已上交
	var process_file_hand_penal_one = document
			.getElementById("process_file_hand_penal_one").value;
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	formData.append("ajdbxtProcess.process_file_hand",
			process_file_hand_penal_one);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// (第一次)案卷已拿回提交按钮onclick
function pencalcasehand_no() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {
			取消 : function() {
			},
			确定 : {
				action : function() {
					penalloadpencalcasehand_no();
				}
			}
		}
	});
}
// （第一次）案卷已拿回提交按钮 确认
function penalloadpencalcasehand_no() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	// 第一次案卷已拿回
	var process_file_hand_penal_one_no = document
			.getElementById("process_file_hand_penal_one_no").value;
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	// 传给后台的是，案卷已拿回字段的值
	formData.append("ajdbxtProcess.process_file_hand",
			process_file_hand_penal_one_no);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	/*
	 * xmlhttp.open("post",
	 * "/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id=" +
	 * info_id, true);
	 */
	xmlhttp.open("post",
			"/ajdbxt/process/upadteProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 行政案件流程*********************************************************************************
/*
 * function get_processDetails_Ajax(url, info_id) { var xmlhttp; if
 * (window.XMLHttpRequest) { // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
 * xmlhttp = new XMLHttpRequest(); } else { // IE6, IE5 浏览器执行代码 xmlhttp = new
 * ActiveXObject("Microsoft.XMLHTTP"); } xmlhttp.onreadystatechange = function() {
 * if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { var staff_info =
 * xmlhttp.responseText; staff_info = JSON.parse(staff_info); //单选框 var case1 =
 * staff_info.process; console.log("aaaaa"+case1.process_lengthen_subpoena);
 * //最开始隐藏“打回修改完成” if(case1.process_is_rollback == "是") { $('#xiugaiok').show(); }
 * else { $('#xiugaiok').hide(); }
 * 
 * //流程的值不为空，则对应值默认选中，另一个值不可操作————为了不可修改 $.each(case1, function(key, value) {
 * $('input[name="ajdbxtProcess.' + key + '"]').val(value); }); // 复选框
 * $.each(case1, function(k, v) { var obj = $('input[name="process.' + k +
 * '"]'); if (obj.attr("type") == "checkbox") { if (v == '是') {
 * obj.attr("checked", "checked"); } } else obj.val(v); });
 * 
 * //单选框 //嫌疑人 if(case1.process_lengthen_subpoena!=null &&
 * case1.process_lengthen_subpoena.length>0){
 * if("是"==case1.process_lengthen_subpoena){
 * $('#suspect_summon_yes').attr("checked","checked"); if
 * (case1.process_is_rollback != '是') { $("#suspect_summon_no").prop("disabled",
 * "true"); $("#suspect_summon_yes").prop("disabled", "true"); } else {
 * $("#suspect_summon_no").prop("disabled",false);
 * $("#suspect_summon_yes").prop("disabled",false); } }
 * if(case1.process_lengthen_subpoena != '是'){
 * $('#suspect_summon_no').attr("checked","checked"); if
 * (case1.process_is_rollback != '是') { $("#suspect_summon_no").prop("disabled",
 * "true"); $("#suspect_summon_yes").prop("disabled", "true"); } else {
 * $("#suspect_summon_no").prop("disabled",false);
 * $("#suspect_summon_yes").prop("disabled",false); } } } //立案
 * if(case1.process_put_on_record!=null &&
 * case1.process_put_on_record.length>0){ if("是"==case1.process_put_on_record){
 * $('#register_yes').attr("checked","checked");
 * $("#register_no").prop("disabled", true); }
 * if("否"==case1.process_put_on_record){
 * $('#register_no').attr("checked","checked");
 * $("#register_yes").prop("disabled", true); } } //鉴定
 * if(case1.process_authenticate!=null && case1.process_authenticate.length>0){
 * if("是"==case1.process_authenticate){
 * $('#identification_yes').attr("checked","checked");
 * $("#identification_no").prop("disabled", true); if (case1.process_is_rollback !=
 * '是') { $("#identification_no").prop("disabled", "true");
 * $("#identification_yes").prop("disabled", "true"); } else {
 * $("#identification_no").prop("disabled",false);
 * $("#identification_yes").prop("disabled",false); } }
 * if("否"==case1.process_authenticate){
 * $('#identification_no').attr("checked","checked");
 * $("#identification_yes").prop("disabled", true); if
 * (case1.process_is_rollback != '是') { $("#identification_no").prop("disabled",
 * "true"); $("#identification_yes").prop("disabled", "true"); } else {
 * $("#identification_no").prop("disabled",false);
 * $("#identification_yes").prop("disabled",false); } } } //有无涉案财物
 * if(case1.process_case_goods!=null && case1.process_case_goods.length>0){
 * if("是"==case1.process_case_goods){
 * $('#case_property_yes').attr("checked","checked"); if
 * (case1.process_is_rollback != '是') { $("#case_property_no").prop("disabled",
 * "true"); $("#case_property_yes").prop("disabled", "true"); } else { //
 * $("#case_property_no").removeProp("disabled","true");
 * $("#case_property_no").prop("disabled",false);
 * $("#case_property_yes").prop("disabled",false); } }
 * if(case1.process_case_goods != '是'){
 * $('#case_property_no').attr("checked","checked"); if
 * (case1.process_is_rollback != '是') { $("#case_property_no").prop("disabled",
 * "true"); $("#case_property_yes").prop("disabled", "true"); } else {
 * $("#case_property_no").prop("disabled",false);
 * $("#case_property_yes").prop("disabled",false); } } } //听证
 * if(case1.process_apply_right!=null && case1.process_apply_right.length>0){
 * if("是"==case1.process_apply_right){
 * $('#hearing_applying_yes').attr("checked","checked");
 * $("#hearing_applying_no").prop("disabled", true); if
 * (case1.process_is_rollback != '是') {
 * $("#hearing_applying_no").prop("disabled", "true");
 * $("#hearing_applying_yes").prop("disabled", "true"); } else {
 * $("#hearing_applying_no").prop("disabled",false);
 * $("#hearing_applying_yes").prop("disabled",false); } }
 * if("否"==case1.process_apply_right){
 * $('#hearing_applying_no').attr("checked","checked");
 * $("#hearing_applying_yes").prop("disabled", true); if
 * (case1.process_is_rollback != '是') {
 * $("#hearing_applying_no").prop("disabled", "true");
 * $("#hearing_applying_yes").prop("disabled", "true"); } else {
 * $("#hearing_applying_no").prop("disabled",false);
 * $("#hearing_applying_yes").prop("disabled",false); } } } //打回案件
 * if(case1.process_is_rollback!=null && case1.process_is_rollback.length>0){
 * if("是"==case1.process_is_rollback){
 * $('#rollback_yes').attr("checked","checked");
 * $("#rollback_no").prop("disabled", true); }
 * if("否"==case1.process_is_rollback){
 * $('#rollback_no').attr("checked","checked");
 * $("#rollback_yes").prop("disabled", true); } } //戒毒 //
 * if(case1.process_treatment_category!=null &&
 * case1.process_treatment_category.length>0){ //
 * if($('#process_treatment_category_yes').val()==case1.process_treatment_category){ //
 * $('#process_treatment_category_yes').attr("checked","checked"); //
 * $("#process_treatment_category_no").prop("disabled", true); // }else{ //
 * $('#process_treatment_category_no').attr("checked","checked"); //
 * $("#process_treatment_category_yes").prop("disabled", true); // } // }
 * 
 * 
 * //提出问题 if(case1.process_question_list!=null &&
 * case1.process_question_list.length>0){
 * if($('#problem_asking_yes').val()==case1.process_question_list){
 * $('#problem_asking_yes').attr("checked","checked");
 * $("#problem_asking_no").prop("disabled", true); }else{
 * $('#problem_asking_no').attr("checked","checked");
 * $("#problem_asking_yes").prop("disabled", true); } } //审核
 * if(case1.process_captain_check!=null &&
 * case1.process_captain_check.length>0){
 * if($('#case_review_yes').val()==case1.process_captain_check){
 * $('#case_review_yes').attr("checked","checked");
 * $("#case_review_no").prop("disabled", true); }else{
 * $('#case_review_no').attr("checked","checked");
 * $("#case_review_yes").prop("disabled", true); } } //涉案财物已入库
 * if(case1.process_goods_in_lib!=null && case1.process_goods_in_lib.length>0){
 * if($('#case_ruku_yes').val()==case1.process_goods_in_lib){
 * $('#case_ruku_yes').attr("checked","checked");
 * $("#case_ruku_no").prop("disabled", true); }else{
 * $('#case_ruku_no').attr("checked","checked");
 * $("#case_ruku_yes").prop("disabled", true); } } //证据上传
 * if(case1.process_evidence_to_upload!=null &&
 * case1.process_evidence_to_upload.length>0){
 * if($('#evidence_yes').val()==case1.process_evidence_to_upload){
 * $('#evidence_yes').attr("checked","checked");
 * $("#evidence_no").prop("disabled", true); }else{
 * $('#evidence_no').attr("checked","checked");
 * $("#evidence_yes").prop("disabled", true); } } //问题整改
 * if(case1.process_question!=null && case1.process_question.length>0){
 * if($('#problem_rectification_yes').val()==case1.process_question){
 * $('#problem_rectification_yes').attr("checked","checked");
 * $("#problem_rectification_no").prop("disabled", true); }else{
 * $('#problem_rectification_no').attr("checked","checked");
 * $("#problem_rectification_yes").prop("disabled", true); } } //结案
 * if(case1.process_case_end!=null && case1.process_case_end.length>0){
 * if($('#case_ending_yes').val()==case1.process_case_end){
 * $('#case_ending_yes').attr("checked","checked");
 * $("#case_ending_no").prop("disabled", true); }else{
 * $('#case_ending_no').attr("checked","checked");
 * $("#case_ending_yes").prop("disabled", true); } }
 */
//行政案件流程*********************************************************************************
function get_processDetails_Ajax(url, info_id) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp = new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var staff_info = xmlhttp.responseText;
			staff_info = JSON.parse(staff_info);
			//单选框
			var case1 = staff_info.process;
			console.log("aaaaa"+case1.process_lengthen_subpoena);
			//最开始隐藏“打回修改完成”
			if(case1.process_is_rollback == "是") {
				//$('#xiugaiok').show();
				btn_police_commit_visible(staff_info);
				btn_police2_commit_visible(staff_info);
				btn_police3_commit_visible(staff_info);
				btn_cap_commit_visible(staff_info);
				btn_legal_commit_visible(staff_info);
			} else {
				$('#xiugaiok').hide();
			}
			
			//流程的值不为空，则对应值默认选中，另一个值不可操作————为了不可修改
			$.each(case1, function(key, value) {
				$('input[name="ajdbxtProcess.' + key + '"]').val(value);
			});
			// 复选框
			$.each(case1, function(k, v) {
				var obj = $('input[name="process.' + k + '"]');
				if (obj.attr("type") == "checkbox") {
					if (v == '是') {
						obj.attr("checked", "checked");
					}
				} else
					obj.val(v);
			});
	
		//单选框     //嫌疑人
			if(case1.process_lengthen_subpoena!=null && case1.process_lengthen_subpoena.length>0){
				if("是"==case1.process_lengthen_subpoena){
					$('#suspect_summon_yes').attr("checked","checked");
					if (case1.process_is_rollback != '是') {
						$("#suspect_summon_no").prop("disabled", "true");
						$("#suspect_summon_yes").prop("disabled", "true");
						$("#commitsuspect").prop("disabled", "true");
						$("#suspectcommit").prop("disabled", "true");
					} else {
						$("#suspect_summon_no").prop("disabled",false);
						$("#suspect_summon_yes").prop("disabled",false);
						$("#commitsuspect").prop("disabled", false);
						$("#suspectcommit").prop("disabled", false);
					}
				}
				if(case1.process_lengthen_subpoena != '是'){
					$('#suspect_summon_no').attr("checked","checked");
					if (case1.process_is_rollback != '是') {
						$("#suspect_summon_no").prop("disabled", "true");
						$("#suspect_summon_yes").prop("disabled", "true");
						$("#commitsuspect").prop("disabled", "true");
						$("#suspectcommit").prop("disabled", "true");
					} else {
						$("#suspect_summon_no").prop("disabled",false);
						$("#suspect_summon_yes").prop("disabled",false);
						$("#commitsuspect").prop("disabled", false);
						$("#suspectcommit").prop("disabled", "true");
					}
				}
			}    
			//立案
			if(case1.process_put_on_record!=null && case1.process_put_on_record.length>0){
				if("是"==case1.process_put_on_record){
					$('#register_yes').attr("checked","checked");
					$("#register_no").prop("disabled", true);
					$("#registercommit").prop("disabled", true);
				}
				if("否"==case1.process_nonage){
					$('#register_no').attr("checked","checked");
					$("#register_yes").prop("disabled", true);
					$("#registercommit").prop("disabled", true);
				}
			}  
			//鉴定
			if(case1.process_authenticate!=null && case1.process_authenticate.length>0){
				/*if("是"==case1.process_authenticate){
					$('#identification_yes').attr("checked","checked");
					$("#identification_no").prop("disabled", true);
				}
				if("否"==case1.process_authenticate){
					$('#identification_no').attr("checked","checked");
					$("#identification_yes").prop("disabled", true);
				}*/
				
				if("是"==case1.process_authenticate){
					$('#identification_yes').attr("checked","checked");
					if (case1.process_is_rollback != '是') {
						$("#identification_no").prop("disabled", "true");
						$("#identification_yes").prop("disabled", "true");
						$("#submitidentify").prop("disabled", "true");
						$("#authenticatecommit").prop("disabled", true);
					} else {
						$("#identification_no").prop("disabled",false);
						$("#identification_yes").prop("disabled",false);
						$("#submitidentify").prop("disabled", false);
						$("#authenticatecommit").prop("disabled", false);
					}
				}
				if(case1.process_case_goods != '是'){
					$('#identification_yes').attr("checked","checked");
					if (case1.process_is_rollback != '是') {
						$("#identification_no").prop("disabled", "true");
						$("#identification_yes").prop("disabled", "true");
						$("#submitidentify").prop("disabled", "true");
						$("#authenticatecommit").prop("disabled", true);
					} else {
						$("#identification_no").prop("disabled",false);
						$("#identification_yes").prop("disabled",false);
						$("#submitidentify").prop("disabled", false);
						$("#authenticatecommit").prop("disabled", false);
					}
				}
			}
			//有无涉案财物
			if(case1.process_case_goods!=null && case1.process_case_goods.length>0){
				if("是"==case1.process_case_goods){
					$('#case_property_yes').attr("checked","checked");
					if (case1.process_is_rollback != '是') {
						$("#case_property_no").prop("disabled", "true");
						$("#case_property_yes").prop("disabled", "true");
						$("#submitcasegoods").prop("disabled", "true");
					} else {
//						$("#case_property_no").removeProp("disabled","true");
						$("#case_property_no").prop("disabled",false);
						$("#case_property_yes").prop("disabled",false);
						$("#submitcasegoods").prop("disabled", false);
					}
				}
				if(case1.process_case_goods != '是'){
					$('#case_property_no').attr("checked","checked");
					if (case1.process_is_rollback != '是') {
						$("#case_property_no").prop("disabled", "true");
						$("#case_property_yes").prop("disabled", "true");
						$("#submitcasegoods").prop("disabled", "true");
					} else {
						$("#case_property_no").prop("disabled",false);
						$("#case_property_yes").prop("disabled",false);
						$("#submitcasegoods").prop("disabled", false);
					}
				}
			} 
			//听证
			if(case1.process_apply_right!=null && case1.process_apply_right.length>0){
				/*if("是"==case1.process_apply_right){
					$('#hearing_applying_yes').attr("checked","checked");
					$("#hearing_applying_no").prop("disabled", true);
				}
				if("否"==case1.process_apply_right){
					$('#hearing_applying_no').attr("checked","checked");
					$("#hearing_applying_yes").prop("disabled", true);
				}*/
				if("是"==case1.process_apply_right){
					$('#hearing_applying_yes').attr("checked","checked");
					if (case1.process_is_rollback != '是') {
						$("#hearing_applying_no").prop("disabled", "true");
						$("#hearing_applying_yes").prop("disabled", "true");
						$("#submithearing").prop("disabled", "true");
					} else {
//						$("#case_property_no").removeProp("disabled","true");
						$("#hearing_applying_no").prop("disabled",false);
						$("#hearing_applying_yes").prop("disabled",false);
						$("#submithearing").prop("disabled", false);
					}
				}
				if(case1.process_apply_right != '是'){
					$('#case_property_no').attr("checked","checked");
					if (case1.process_is_rollback != '是') {
						$("#hearing_applying_no").prop("disabled", "true");
						$("#hearing_applying_yes").prop("disabled", "true");
						$("#submithearing").prop("disabled", "true");
					} else {
//						$("#case_property_no").removeProp("disabled","true");
						$("#hearing_applying_no").prop("disabled",false);
						$("#hearing_applying_yes").prop("disabled",false);
						$("#submithearing").prop("disabled", false);
					}
				}
			}
			//打回案件
			if(case1.process_is_rollback!=null && case1.process_is_rollback.length>0){
				if("是"==case1.process_is_rollback){
					$("#rollback_yes").attr("checked","checked");
					$("#rollback_no").prop("disabled", true);
					$("#rollback_commit").prop("disabled", false);
				}
				if("否"==case1.process_is_rollback){
					$("#rollback_no").attr("checked","checked");
					$("#rollback_yes").prop("disabled", true);
					$("#rollback_commit").prop("disabled", true);
				}else{
					$("#rollback_yes").prop("disabled", true);
					$("#rollback_no").prop("disabled", true);
					$("#rollback_commit").prop("disabled", true);
				}
			}
			//戒毒
//			if(case1.process_treatment_category!=null && case1.process_treatment_category.length>0){
//				if($('#process_treatment_category_yes').val()==case1.process_treatment_category){
//					$('#process_treatment_category_yes').attr("checked","checked");
//					$("#process_treatment_category_no").prop("disabled", true);
//				}else{
//					$('#process_treatment_category_no').attr("checked","checked");
//					$("#process_treatment_category_yes").prop("disabled", true);
//				}
//			}
			
			//提出问题输入框
			if(case1.process_question_list!=null && case1.process_question_list!=""){
				/*if($('#process_question_list').value()==case1.process_question_list){
					$('#problem_asking_yes').attr("checked","checked");
					$("#problem_asking_no").prop("disabled", true);
				}else{
					$('#problem_asking_no').attr("checked","checked");
					$("#problem_asking_yes").prop("disabled", true);
				}*/
				$("#process_question_list").prop("disabled", true);
				$("#askproblemcommit").prop("disabled", true);
			}
			//问题整改数量
			if(case1.process_question!=null&&case1.process_question!=""){
				//定义case1.process_question
				var problems = case1.process_question;
				//分割逗号
				var newproblems = problems.split(",");
				//遍历newproblems
				for(var i=0;i<newproblems.length;i++){
					$('#newproblems[i]').attr("checked","checked");
				}
				//获取提出问题数量
				var questions = case1.process_question_list;
				//将所有复选框改为不可编辑
				for(var y=0;y<questions;y++){
					$('#newproblems[y]').prop("disabled", true);
					console.log("ss#newproblems[y]"+newproblems[y]);
					//document.getElementById("newproblems[y]").disabled="disabled";
				}
				$("#problemchangecommit").prop("disabled", true);
			}
			//处罚
			if(case1.process_detention=="是"){
				$('process_detention').attr("checked","checked");
				$("#punishcommit").prop("disabled", true);
			}
			if(case1.process_penalty=="是"){
				$('process_penalty').attr("checked","checked");
				$("#punishcommit").prop("disabled", true);
			}
			if(case1.process_mandatory_abandon_drug=="是"){
				$('process_mandatory_abandon_drug').attr("checked","checked");
				$("#punishcommit").prop("disabled", true);
			}
			if(case1.process_community_abandon_drug=="是"){
				$('process_community_abandon_drug').attr("checked","checked");
				$("#punishcommit").prop("disabled", true);
			}
			if(case1.process_other=="是"){
				$('process_other').attr("checked","checked");
				$("#punishcommit").prop("disabled", true);
			}
			if(case1.process_administrativ_warning=="是"){
				$('process_administrativ_warning').attr("checked","checked");
				$("#punishcommit").prop("disabled", true);
			}
			//审核
			if(case1.process_captain_check!=null && case1.process_captain_check.length>0){
				$("#captaincommit").prop("disabled", true);
				if("是"==case1.process_captain_check){
					$('#case_review_yes').attr("checked","checked");
					$("#case_review_no").prop("disabled", true);
				}
				if ("否"==case1.process_captain_check) {
					$('#case_review_no').attr("checked","checked");
					$("#case_review_yes").prop("disabled", true);
				}
			}
			//涉案财物已入库
			if(case1.process_goods_in_lib!=null && case1.process_goods_in_lib.length>0){
				$("#btn_process_goods_in_lib_xingzheng_id").prop("disabled", true);
				if("是"==case1.process_goods_in_lib){
					$('#case_ruku_yes').attr("checked","checked");
					$("#case_ruku_no").prop("disabled", true);
				}
				if("否"==case1.process_goods_in_lib){
					$('#case_ruku_no').attr("checked","checked");
					$("#case_ruku_yes").prop("disabled", true);
				}
			}
			//证据上传
			if(case1.process_evidence_to_upload_affirm!=null && case1.process_evidence_to_upload_affirm.length>0){
				$("#evidencecommit").prop("disabled", true);
				if("是"==case1.process_evidence_to_upload_affirm){
					$('#evidence_yes').attr("checked","checked");
					$("#evidence_no").prop("disabled", true);
				}
				if("否"==case1.process_evidence_to_upload_affirm){
					$('#evidence_no').attr("checked","checked");
					$("#evidence_yes").prop("disabled", true);
				}
			}
			//问题整改
			/*if(case1.process_question!=null && case1.process_question.length>0){
				if($('#problem_rectification_yes').val()==case1.process_question){
					$('#problem_rectification_yes').attr("checked","checked");
					$("#problem_rectification_no").prop("disabled", true);
				}else{
					$('#problem_rectification_no').attr("checked","checked");
					$("#problem_rectification_yes").prop("disabled", true);
				}
			}*/
			//结案
			if(case1.process_case_end!=null && case1.process_case_end.length>0){
				$("#caseendcommit").prop("disabled", true);
				if("是"==case1.process_case_end){
					$('#case_ending_yes').attr("checked","checked");
					$("#case_ending_no").prop("disabled", true);
				}
				if("否"==case1.process_case_end){
					$('#case_ending_no').attr("checked","checked");
					$("#case_ending_yes").prop("disabled", true);
				}
			}
			//评分
			if(case1.process_score!=null&&case1.process_score!=""){
				$("#input_case_score").prop("disabled", true);
				$("#scorecommit").prop("disabled", true);
			}
			  management(case1);//根据有无涉案财物判断是否显示”涉案财物已入库“
			  checkbox_process_question(case1);  //根据提出问题自动生成问题整改的复选框
			  process_question_out(case1);//问题整改勾选上
			  case_xingzhen_hand_button(case1);//案卷上交是否判断对勾的显示
		}
		
	}
	xmlhttp.open("post", url, true);
	xmlhttp.send();
}

// 根据有无涉案财物判断是否显示”涉案财物已入库“（刑事案件）
function management(case1) {
	if (case1.process_case_goods == '是') {
		$('#sheancaiwu').show();
	} else {
		$('#sheancaiwu').hide();
	}
}
// 案卷上交是否判断对勾的显示
function case_xingzhen_hand_button(case1) {
	if (case1.process_file_hand == '是') {
		$('#case_xingzhen_hand_img').show();
		$('#case_xingzhen_hand_button').hide();
	} else {
		$('#case_xingzhen_hand_img').hide();
	}
}
/** ********************************点击提交按钮，改变对应的提交值********************************************* */
// 改变延长传唤
function changesuspect_summon_yes(even) {
	var sex = document.getElementById("suspect_summon_yes");
	sex.value = '是'

	// return sex.value;
}
function changesuspect_summon_no(even) {
	var sex = document.getElementById("suspect_summon_no");
	sex.value = '否'
	// return sex.value;
}
// 办理延长传唤 提交
function suspect_summon(button) {
	if(!document.getElementById("suspect_summon_yes").checked&&!document.getElementById("suspect_summon_no").checked){
		toastr.error('请选择是否延长传唤');
	}else{
		$.confirm({
			title : '提交!',
			content : '确定提交么!',
			buttons : {

				取消 : function() {
				},
				确定 : {
					action : function() {
						loadcaseDetail_suspect_summon(button);
					}
				}
			}
		});
	}
}
// 判断选择是否为空
function ischecked() {
	if ((!document.processDetails.suspect_summon_yes.checked)
			&& (!document.processDetails.suspect_summon_no.checked)) {

	}
}
function loadcaseDetail_suspect_summon(button) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("processDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		// console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				// location.reload(true);
				get_processDetails(info_id);
				toastr.success('编辑成功！');

			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// CaseDetails.jsp中的是否立案提交
function register() {
	console.log("+++++++++_____")
	// 判断是否选择
	if (!document.getElementById("register_yes").checked
			&& !document.getElementById("register_no").checked) {
		toastr.error('请选择立案！');
	} else {
		$.confirm({
			title : '提交!',
			content : '确定提交么!',
			buttons : {
				取消 : function() {
				},
				确定 : {
					action : function() {
						loadcaseregister();
					}
				}
			}
		});
	}
}
// 是否立案提交按钮
function loadcaseregister() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("processDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_processDetails(info_id);
				toastr.success('编辑成功！');
				location.reload();
				// location.reload(true);
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 改变是否鉴定
function changeidentification_yes(even) {
	var sex = document.getElementById("identification_yes");
	sex.value = '是';
	return sex.value;
}
function changeidentification_no(even) {
	var sex = document.getElementById("identification_no");
	sex.value = '否';
	return sex.value;
}
// CaseDetails.jsp中的是否鉴定提交
function identification() {
	if(!document.getElementById("identification_yes").checked&&!document.getElementById("identification_no").checked){
		toastr.error('请选择是否鉴定');
	}else{
		$.confirm({
			title : '提交!',
			content : '确定提交么!',
			buttons : {

				取消 : function() {
				},
				确定 : {
					action : function() {
						loadcaseDetail_minors_asking();
					}
				}
			}
		});
	}
}
// 是否鉴定提交按钮
function loadcaseDetail_minors_asking() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("processDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_processDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 改变是否涉案财物
function changecase_property_yes(even) {
	var sex = document.getElementById("case_property_yes");
	sex.value = '是';
	return sex.value;
}
function changecase_property_no(even) {
	var sex = document.getElementById("case_property_no");
	sex.value = '否';
	return sex.value;
}
function case_property() {
	if(!document.getElementById("case_property_yes").checked&&!document.getElementById("case_property_yes").checked){
		toastr.error('请选择有无涉案财物');
	}else{
		$.confirm({
			title : '提交!',
			content : '确定提交么!',
			buttons : {

				取消 : function() {
				},
				确定 : {
					action : function() {
						loadcaseDetail_case_property();
					}
				}
			}
		});
	}
}
// 是否涉案财物提交按钮
function loadcaseDetail_case_property() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("processDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_processDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/noticeTeamCheckProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 改变是否听证申请
function changehearing_applying_yes(even) {
	var sex = document.getElementById("hearing_applying_yes");
	sex.value = '是';
	return sex.value;
}
function changehearing_applying_no(even) {
	var sex = document.getElementById("hearing_applying_no");
	sex.value = '否';
	return sex.value;
}
function hearing_applying() {
	if(!document.getElementById("hearing_applying_yes").checked&&!document.getElementById("hearing_applying_no").checked){
		toastr.error('请选择是否听证');
	}else{
		$.confirm({
			title : '提交!',
			content : '确定提交么!',
			buttons : {

				取消 : function() {
				},
				确定 : {
					action : function() {
						loadcaseDetail_hearing_applying();
					}
				}
			}
		});
	}
}
// 是否听证申请提交按钮
function loadcaseDetail_hearing_applying() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("processDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_processDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 改变是否打回
function changerollback_yes(even) {
	var sex = document.getElementById("rollback_yes");
	sex.value = '是';
	return sex.value;
}
function changerollback_no(even) {
	var sex = document.getElementById("rollback_no");
	sex.value = '否';
	return sex.value;
}
function process_rollback() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					loadcaseDetail_process_rollback();
				}
			}
		}
	});
}
// 改变是否打回提交按钮
function loadcaseDetail_process_rollback() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("processDetails");
	// var
	// process_question_list=document.getElementById("process_question_list").value;
	var formData = new FormData(processDetails);
	// formData.append("ajdbxtProcess.process_question_list",
	// process_question_list);
	xmlhttp.onreadystatechange = function() {
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				toastr.success('编辑成功！');
				// location.reload(true);
			} else {
				toastr.error('编辑失败！');
			}
			get_processDetails(info_id);
		}
	};
	xmlhttp
			.open(
					"post",
					"/ajdbxt/process/updateRollbackUpdateProcessAction?ajdbxtProcess.process_case_id="
							+ info_id, true);
	xmlhttp.send(formData);
}

// CaseDetails.jsp中的是否提出问题提交
function problem_asking() {
	var num = document.getElementById("process_question_list").value;
	if(num==""||num==null){
		toastr.error('请填写问题数量');
	}else{
		if(!isNum(num)){
			toastr.error('请填写数字');
		}else{
			$.confirm({
				title : '提交!',
				content : '确定提交么!',
				buttons : {

					取消 : function() {
					},
					确定 : {
						action : function() {
							loadcaseDetail_problem_asking();
						}
					}
				}
			});
		}
	}
}
//判断输入框内容是否为数字
function isNum(num){
	 var reNum=/^\d*$/;
	 return(reNum.test(num));
}
//判断分数格式是否正确
function isScore(score) {
	var reNum=/^[.0-9]+$/;
	return(reNum.test(score));
}
// 是否提出问题按钮
function loadcaseDetail_problem_asking() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("processDetails");
	var process_question_list = document
			.getElementById("process_question_list").value;
	var formData = new FormData(processDetails);
	formData.append("ajdbxtProcess.process_question_list",
			process_question_list);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_processDetails(info_id);
				toastr.success('编辑成功！');
				// location.reload(true);
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp
			.open(
					"post",
					"/ajdbxt/process/upadteQuestion_listProcessAction?ajdbxtProcess.process_case_id="
							+ info_id, true);
	xmlhttp.send(formData);
}

// 改变是否审核
function changecase_review_yes(even) {
	var sex = document.getElementById("case_review_yes");
	sex.value = '是';
	return sex.value;
}
function changecase_review_no(even) {
	var sex = document.getElementById("case_review_no");
	sex.value = '否';
	return sex.value;
}
// CaseDetails.jsp中的是否审核提交
function case_review() {
	if(!document.getElementById("case_review_yes").checked&&!document.getElementById("case_review_no").checked){
		toastr.error('请选择是否审核');
	}else{
		$.confirm({
			title : '提交!',
			content : '确定提交么!',
			buttons : {

				取消 : function() {
				},
				确定 : {
					action : function() {
						loadcaseDetail_case_review();
					}
				}
			}
		});
	}
}
// 是否审核按钮
function loadcaseDetail_case_review() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("processDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_processDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/notifyPoliceSummitProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 问题整改数量提交
function problem_rectification() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					loadcaseDetail_problem_rectification();
				}
			}
		}
	});
}
// 是否问题整改按钮

function loadcaseDetail_problem_rectification() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var id_array = new Array();
	$('input[name="case1.process_question"]:checked').each(function() {
		id_array.push($(this).val());// 向数组中添加元素
	});
	var idstr = id_array.join(',');// 将数组元素连接起来以构建一个字符串

	var formData = new FormData();
	formData.append("ajdbxtProcess.process_question", idstr);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_processDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateQuestionProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 改变是否结案
function changecase_ending_yes(even) {
	var sex = document.getElementById("case_ending_yes");
	sex.value = '是';
	return sex.value;
}
function changecase_ending_no(even) {
	var sex = document.getElementById("case_ending_no");
	sex.value = '否';
	return sex.value;
}
// CaseDetails.jsp中的是否结案提交
function case_ending() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					loadcaseDetail_case_ending();
				}
			}
		}
	});
}
// 是否结案按钮
function loadcaseDetail_case_ending() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("processDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_processDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 改变是否戒毒
/*
 * function changeprocess_treatment_category_yes(even) { var sex =
 * document.getElementById("process_treatment_category_yes"); sex.value =
 * even.value; return sex.value; } function
 * changeprocess_treatment_category_no(even) { var sex =
 * document.getElementById("process_treatment_category_no"); sex.value =
 * even.value; return sex.value; }
 */

// CaseDetails.jsp中的处罚提交
function punishmentab_chufa() {
	let checked = $('#punishment').find('input[type="checkbox"]:checked');
	if(checked.length==0){
		toastr.error('请至少选择一项处罚！');
	}else{
		$.confirm({
			title : '提交!',
			content : '确定提交么!',
			buttons : {

				取消 : function() {
				},
				确定 : {
					action : function() {
						loadcaseDetail_punishmentab();
					}
				}
			}
		});
	}
}
// 处罚按钮
function loadcaseDetail_punishmentab() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	/*
	 * var process_detention = document.getElementById("process_detention"); var
	 * process_penalty= document.getElementById("process_penalty");
	 * console.log(process_detention.getAttribute('c'))
	 */
	var process_detention = '否'
	if ($('#process_detention').is(':checked')) {
		process_detention = '是'
	}
	var process_penalty = '否'
	if ($('#process_penalty').is(':checked')) {
		process_penalty = '是'
	}
	var process_mandatory_abandon_drug = '否'
	if ($('#process_mandatory_abandon_drug').is(':checked')) {
		process_mandatory_abandon_drug = '是'
	}
	var process_community_abandon_drug = '否'
	if ($('#process_community_abandon_drug').is(':checked')) {
		process_community_abandon_drug = '是'
	}
	var process_administrativ_warning = '否'
	if ($('#process_administrativ_warning').is(':checked')) {
		process_administrativ_warning = '是'
	}
	var process_other = '否'
	if ($('#process_other').is(':checked')) {
		process_other = '是'
	}
	var formData = new FormData(processDetails);
	formData.append("ajdbxtProcess.process_detention", process_detention);
	formData.append("ajdbxtProcess.process_penalty", process_penalty);
	formData.append("ajdbxtProcess.process_mandatory_abandon_drug",
			process_mandatory_abandon_drug);
	formData.append("ajdbxtProcess.process_community_abandon_drug",
			process_community_abandon_drug);
	formData.append("ajdbxtProcess.process_administrativ_warning",
			process_administrativ_warning);
	formData.append("ajdbxtProcess.process_other", process_other);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_processDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/punishProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 证据上交
function changeevidence_yes(even) {
	var sex = document.getElementById("evidence_yes");
	sex.value = '是';
	return sex.value;
}
function changeevidence_no(even) {
	var sex = document.getElementById("evidence_no");
	sex.value = '否';
	return sex.value;
}
// CaseDetails.jsp中的是否证据上交提交
function case_evidence() {
	if(document.getElementById("evidence_yes").checked||document.getElementById("evidence_no").checked){
		$.confirm({
			title : '提交!',
			content : '确定提交么!',
			buttons : {

				取消 : function() {
				},
				确定 : {
					action : function() {
						loadcasecase_evidence();
					}
				}
			}
		});
	}else{
		toastr.error('请选择是否上交证据');
	}
}
// 是否证据上交按钮
function loadcasecase_evidence() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("processDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_processDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/notifyLegalSummitProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 评分
function case_score() {
	var score = document.getElementById("input_case_score").value;
	if(isScore(score)&&score<=10){
		$.confirm({
			title : '提交!',
			content : '确定提交么!',
			buttons : {

				取消 : function() {
				},
				确定 : {
					action : function() {
						loadcaseDetail_case_score();
					}
				}
			}
		});
	}else{
		toastr.error('请输入10以内的分数');
	}
}
// 评分按钮
function loadcaseDetail_case_score() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("processDetails");
	var case_score = document.getElementById("input_case_score").value;
	var formData = new FormData(processDetails);
	formData.append("ajdbxtProcess.process_score", case_score);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_processDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/fileUpProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 确认案卷上交按钮
function process_file_hand() {
	$.confirm({
		title : '上交!',
		content : '确定上交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					loadcaseDetail_process_file_hand();
				}
			}
		}
	});
}
function loadcaseDetail_process_file_hand() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("processDetails");
	var process_file_hand_id = document.getElementById("process_file_hand_id").value;
	var formData = new FormData(processDetails);
	formData.append("ajdbxtProcess.process_file_hand", process_file_hand_id);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_processDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/fileUpProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 确认打回修改完成按钮
function process_is_rollback_ok() {
	$.confirm({
		title : '上交!',
		content : '确定上交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					loadcaseDetail_process_is_rollback_ok();
				}
			}
		}
	});
}
function loadcaseDetail_process_is_rollback_ok() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var process_is_rollback_id = document
			.getElementById("process_is_rollback_id").value;
	var processDetails = document.getElementById("processDetails");
	var formData = new FormData(processDetails);
	formData
			.append("ajdbxtProcess.process_is_rollback", process_is_rollback_id);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_processDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp
			.open(
					"post",
					"/ajdbxt/process/updateRollbackOverProcessAction?ajdbxtProcess.process_case_id="
							+ info_id, true);
	xmlhttp.send(formData);
}
// 涉案财物已入库
function changecase_ruku_yes(even) {
	var sex = document.getElementById("case_ruku_yes");
	sex.value = '是';
	return sex.value;
}
function changecase_ruku_no(even) {
	var sex = document.getElementById("case_ruku_no");
	sex.value = '否';
	return sex.value;
}
// 是否涉案财物入库提交
function case_ruku() {
	$.confirm({
		title : '提交!',
		content : '确定提交么!',
		buttons : {

			取消 : function() {
			},
			确定 : {
				action : function() {
					loadcase_ruku();
				}
			}
		}
	});
}
// 是否涉案财物入库按钮
function loadcase_ruku() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("processDetails");
	var formData = new FormData(processDetails);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_processDetails(info_id);
				toastr.success('编辑成功！');
			} else {
				toastr.error('编辑失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 行政案件问题整改自动生成************************

function checkbox_process_question(case1) {

	var question_list = case1.process_question_list;
	var executerDiv = $("#checkbox_process_question");
	executerDiv.innerHTML = "";
	var ul = document.createElement("ul");
	ul.id = "fruit";
	for (var i = 0; i < question_list; i++) {
		// 加入复选框
		var checkBox = document.createElement("input");
		checkBox.setAttribute("type", "checkbox");
		checkBox.name = "case1.process_question";
		checkBox.id = i + 1;
		checkBox.value = i + 1;
		var li = document.createElement("li");
		li.appendChild(checkBox);
		li.appendChild(document.createTextNode(i + 1));
		ul.appendChild(li);
	}
	$("#checkbox_process_question").html(ul);
}

// 问题整改复选框选中
function process_question_out(case1) {
	//判断process_question是否存在
	if('process_question' in case1){
		var question_updata = case1.process_question;
		question_one = question_updata.split(",");
		$('input[name="case1.process_question"]').each(function() {
			// id_array.push($(this).val());//向数组中添加元素
			if ($.inArray($(this).val(), question_one) != -1) {
				$(this).prop("checked", "checked");
			}
		});
	}
}
// 第一次整改 复选框生成
function checkbox_process_question_penal_one(case1) {
	var question_list = case1.process_question_list;
	// 第一次问题整改
	var executerDiv = $("#checkbox_process_question_penal_one");
	executerDiv.innerHTML = "";
	var ul = document.createElement("ul");
	ul.id = "fruit";
	for (var i = 0; i < question_list; i++) {
		// 加入复选框
		var checkBox = document.createElement("input");
		checkBox.setAttribute("type", "checkbox");
		checkBox.name = "case1.process_question";
		checkBox.id = "process_question" + (i + 1);
		checkBox.value = i + 1;
		var li = document.createElement("li");
		li.appendChild(checkBox);
		li.appendChild(document.createTextNode(i + 1));
		ul.appendChild(li);
	}
	$("#checkbox_process_question_penal_one").html(ul);
}
// 刑事案件第一次问题整改复选框选中
/*
 * function process_question_out_penal_one(case1) { var question_updata =
 * case1.process_question; if (question_updata == null || question_updata == "") { }
 * else { question_one = question_updata.split(",");
 * $('input[name="case1.process_question"]').each(function() { //
 * id_array.push($(this).val());//向数组中添加元素 if ($.inArray($(this).val(),
 * question_one) != -1) { $(this).prop("checked", "checked"); } }); } }
 */
// 第二次 整改生成复选框
function checkbox_process_question_penal_two(case1) {
	var question_list_two = case1.process_question_list_two;
	var executerDiv = $("#checkbox_process_question_penal_two");
	executerDiv.innerHTML = "";
	var ul = document.createElement("ul");
	ul.id = "fruit";
	for (var i = 0; i < question_list_two; i++) {
		// 加入复选框
		var checkBox = document.createElement("input");
		checkBox.setAttribute("type", "checkbox");
		checkBox.name = "case1.process_question_two";
		checkBox.id = "process_question_two" + (i + 1);
		checkBox.value = i + 1;
		var li = document.createElement("li");
		li.appendChild(checkBox);
		li.appendChild(document.createTextNode(i + 1));
		ul.appendChild(li);
	}
	$("#checkbox_process_question_penal_two").html(ul);
}
// 刑事案件第二次问题整改复选框选中
/*
 * function process_question_out_penal_two(case1) { var question_updata_two =
 * case1.process_question_two; if (question_updata_two == null ||
 * question_updata_two == "") { } else {
 * $('input[name="case1.process_question_two"]').each(function() { //
 * id_array.push($(this).val());//向数组中添加元素 if ($.inArray($(this).val(),
 * process_question_two) != -1) { $(this).prop("checked", "checked"); } }); } }
 */
// 每次点击提交按钮会调用此方法,重新获取流程
function get_penalProcessDetails(info_id) {
	var url = "/ajdbxt/info/Info_getSingleInfo?info.ajdbxt_info_id=" + info_id;
	get_penalProcessDetails_Ajax(url, info_id);
}
// 刑事案件流程，加载时，要加载到：有值的按钮禁用且radio被选中禁用
function get_penalProcessDetails_Ajax(url, info_id) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp = new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var staff_info = xmlhttp.responseText;
			staff_info = JSON.parse(staff_info);
			var info = staff_info.info;
			// 案件流程
			var case1 = staff_info.process;
			$
					.each(
							case1,
							function(key, value) {
								// 对存在的字段进行赋值
								if (typeof ($('input[name="ajdbxtProcess.'
										+ key + '"]') != undefined)) {
									// 存在，但值为""不对其值操作
									if ($(
											'input[name="ajdbxtProcess.' + key
													+ '"]').val() != null) {
										// 存在，但值不是""则对其值操作
									} else {
										// 给案件流程，input赋值
										$(
												'input[name="ajdbxtProcess.'
														+ key + '"]')
												.val(value);
									}
									// 对不存在的字段value属性不进行操作
								} else {
								}

								// 刑事案件可多次提交涉案财物和确认涉案财物已上交，不禁用提交按钮
								if (key == 'process_case_goods'
										|| key == 'process_goods_in_lib') {
									// 移除选中
									if ($('input[name="ajdbxtProcess.process_case_goods"]') != null) {
										$(
												'input[name="ajdbxtProcess.process_case_goods"]')
												.attr("checked", false);
									}
									if ($('input[name="ajdbxtProcess.process_goods_in_lib"]')) {
										$(
												'input[name="ajdbxtProcess.process_goods_in_lib"]')
												.attr("checked", false);
									}
									// 不是涉案财物和法制民警已入库按钮，则将有值的button禁用，有值的radio选中、禁用
								} else {
									// 受立案
									if (case1.process_put_on_record != null
											&& case1.process_put_on_record.length > 0) {
										// 有值buttion禁用
										$("#btn_process_put_on_record_id")
												.prop("disabled", true);
										// radio禁用
										$(
												'input[name="ajdbxtProcess.process_put_on_record"]')
												.prop("disabled", true);
										// 有值radio checked
										if ("是" == case1.process_put_on_record) {
											$(
													'#process_put_on_record_penal_yes')
													.attr("checked", "checked");
										}
										if ("否" == case1.process_put_on_record) {
											$('#process_put_on_record_penal_no')
													.attr("checked", "checked");
										}
									}

									// 延长传唤
									if (case1.process_lengthen_subpoena != null
											&& case1.process_lengthen_subpoena.length > 0) {
										$("#btn_process_lengthen_subpoena_id")
												.prop("disabled", true);
										// radio禁用
										$(
												'input[name="ajdbxtProcess.process_lengthen_subpoena"]')
												.prop("disabled", true);
										if ("是" == case1.process_lengthen_subpoena) {
											$('#penalsuspect_summon_yes').attr(
													"checked", "checked");
										}
										if ("否" == case1.process_lengthen_subpoena) {
											$('#penalsuspect_summon_no').attr(
													"checked", "checked");
										}
									}

									// 鉴定
									if (case1.process_authenticate != null
											&& case1.process_authenticate.length > 0) {
										$("#btn_process_authenticate_id").prop(
												"disabled", true)
										$(
												'input[name="ajdbxtProcess.process_authenticate"]')
												.prop("disabled", true);
										if ("是" == case1.process_authenticate) {
											$('#penalidentification_yes').attr(
													"checked", "checked");
											$("#penalidentification_no").prop(
													"disabled", true);
										}
										if ("否" == case1.process_authenticate) {
											$('#penalidentification_no').attr(
													"checked", "checked");
											$("#penalidentification_yes").prop(
													"disabled", true);
										}
									}

									// 第一次强制措施
									if (case1.process_force_measure_one != null
											&& case1.process_force_measure_one.length > 0) {
										$("#btn_process_force_measure_one_id")
												.prop("disabled", true)
										$(
												'input[name="ajdbxtProcess.process_force_measure_one"]')
												.prop("disabled", true);
										if ("拘留" == case1.process_force_measure_one) {
											$('#measure_one_one').attr(
													"checked", "checked");
											$("#measure_one_two").prop(
													"disabled", true);
											$("#measure_one_three").prop(
													"disabled", true);
										}
										if ("监视居住" == case1.process_force_measure_one) {
											$('#measure_one_two').attr(
													"checked", "checked");
											$("#measure_one_one").prop(
													"disabled", true);
											$("#measure_one_three").prop(
													"disabled", true);
										}
										if ("取保候审" == case1.process_force_measure_one) {
											$('#measure_one_three').attr(
													"checked", "checked");
											$("#measure_one_one").prop(
													"disabled", true);
											$("#measure_one_two").prop(
													"disabled", true);
										}
									}

									// 第一次 证据上交
									if (case1.process_evidence_to_upload_affirm != null
											&& case1.process_evidence_to_upload_affirm.length > 0) {
										$("#btn_process_evidence_to_upload_id")
												.prop("disabled", true)
										$(
												'input[name="ajdbxtProcess.process_evidence_to_upload_affirm"]')
												.prop("disabled", true);
										if ("是" == case1.process_evidence_to_upload_affirm) {
											$(
													'#process_evidence_to_upload_penal_yes')
													.attr("checked", "checked");
										}
										if ("否" == case1.process_evidence_to_upload_affirm) {
											$(
													'#process_evidence_to_upload_penal_no')
													.attr("checked", "checked");
										}


									}

									// 第一次案卷已上交，img
									if (loginer_id == info.info_legal_team_member) {
										console.log("法制民警登录1");
										if (case1.process_file_hand != null) {
											// 案卷已上交，未拿回
											console.log("案卷上交不为空1");
											if (case1.process_file_hand == "是") {
												console
														.log("笫一次拿回字段为"
																+ case1.process_file_hand);
												/*
												 * 案卷上交：显示图片，隐藏按钮；
												 * 案卷拿回：显示按钮，隐藏图片；
												 */
												fileHandCaseOne();
											}else {
												console
														.log("笫一次拿回字段为："
																+ case1.process_file_hand);
												/*
												 * 案卷上交：显示按钮，隐藏图片；
												 * 案卷拿回：显示图片，隐藏按钮；
												 */
												noFileHandCaseOne();
											}
										} else {
											console.log("第一次上交字段为空");
											/*
											 * 案卷上交：显示按钮，隐藏图片； 案卷拿回：显示图片，隐藏按钮；
											 */
											noFileHandCaseOne();
										}
									} else {
										// 非法制民警
										console.log("非法制民警登录1");
										if (case1.process_file_hand != null) {
											console.log("笫一次拿回不为空");
											if (case1.process_file_hand == "否") {
												console.log("笫一次拿回字段为否");
												/*
												 * 案卷上交：隐藏按钮，隐藏图片；
												 * 案卷拿回：显示图片，隐藏按钮；
												 */
												$(
														"#process_file_hand_penal_one_bnt")
														.hide();
												$(
														"#process_file_hand_penal_one_img")
														.hide();
												$(
														"#process_file_hand_penal_one_no_bnt")
														.hide();
												$(
														"#process_file_hand_penal_one_no_img")
														.show();

											} else {
												console.log("笫一次拿回字段为是");
												/*
												 * 案卷上交：隐藏按钮，隐藏图片；
												 * 案卷拿回：隐藏图片，隐藏按钮；
												 */
												$(
														"#process_file_hand_penal_one_bnt")
														.hide();
												$(
														"#process_file_hand_penal_one_img")
														.hide();
												$(
														"#process_file_hand_penal_one_no_bnt")
														.hide();
												$(
														"#process_file_hand_penal_one_no_img")
														.hide();

											}
										} else {
											/*
											 * 案卷上交：显示按钮，隐藏图片； 案卷拿回：显示图片，隐藏按钮；
											 */
											console.log("笫一次拿回为空");
											noFileHandCaseOne();
										}
									}

									// 第一次 提出问题
									if (case1.process_question_list != null
											&& case1.process_question_list > 0) {
										$("#btn_process_question_list_id")
												.prop("disabled", true)
										// $("#btn_process_question_list_id").show();
										$(
												'input[name="process.process_question_list"]')
												.prop("disabled", true);
										$(
												'input[name="process.process_question_list"]')
												.val(
														case1.process_question_list)
									}

									// 刑事案件自动生成问题整改第一次复选框
									checkbox_process_question_penal_one(case1);

									// 办案民警延长拘留期限
									if (case1.process_lengthen_criminal_detention != null
											&& case1.process_lengthen_criminal_detention.length > 0) {
										$(
												"#btn_process_lengthen_criminal_detention_id")
												.prop("disabled", true)
										$(
												'input[name="ajdbxtProcess.process_lengthen_criminal_detention"]')
												.prop("disabled", true);
										if ("30" == case1.process_lengthen_criminal_detention) {
											$(
													'#process_lengthen_criminal_detention_one')
													.attr("checked", "checked");
											$(
													"#process_lengthen_criminal_detention_one")
													.prop("disabled", true);
										}
										if ("7" == case1.process_lengthen_criminal_detention) {
											$(
													'#process_lengthen_criminal_detention_two')
													.attr("checked", "checked");
											$(
													"#process_lengthen_criminal_detention_two")
													.prop("disabled", true);
										}
										if ("0" == case1.process_lengthen_criminal_detention) {
											$(
													'#process_lengthen_criminal_detention_three')
													.attr("checked", "checked");
											$(
													"#process_lengthen_criminal_detention_three")
													.prop("disabled", true);
										}
									}

									// 第一次 案卷拿回天数，input
									if (case1.process_fileback_day != null
											&& case1.process_fileback_day > 0) {
										$("#btn_process_fileback_day_id").prop(
												"disabled", true)
										$(
												'input[name="process.process_fileback_day"]')
												.prop("disabled", true);
										$(
												'input[name="process.process_fileback_day"]')
												.val(case1.process_fileback_day)
									}

									// 第一次 问题整改
									if (case1.process_question != null
											&& case1.process_question.length > 0) {
										$('#btn_process_question_id').prop(
												"disabled", true);
										for (i = 1; i <= case1.process_question_list; i++) {
											$('#process_question' + i).prop(
													"disabled", true);
											// 问题整改中包含此字符,被选中
											if (case1.process_question
													.indexOf(i) != -1) {
												$('#process_question' + i)
														.attr("checked",
																"checked");
											}
										}
									}

									// 第二次强制措施
									if (case1.process_force_measure_two != null
											&& case1.process_force_measure_two.length > 0) {
										$(
												"#btn_process_force_measure_two_detention_id")
												.prop("disabled", true);
										$(
												"#btn_process_force_measure_two_detention_two_id")
												.prop("disabled", true);
										$(
												'input[name="ajdbxtProcess.process_force_measure_two"]')
												.prop("disabled", true);
										if ("逮捕" == case1.process_force_measure_two) {
											$('#second_punishment_one').attr(
													"checked", "checked");
										}
										if ("取保候审" == case1.process_force_measure_two) {
											$('#second_punishment_two').attr(
													"checked", "checked");
										}
										if ("监视居住" == case1.process_force_measure_two) {
											$('#second_punishment_three').attr(
													"checked", "checked");
										}
										if ("撤案" == case1.process_force_measure_two) {
											$('#chenantwo_yes').attr("checked",
													"checked");
										}
										if ("起诉" == case1.process_force_measure_two) {
											$('#chenantwo_no').attr("checked",
													"checked");
										}
										if ("解保" == case1.process_force_measure_two) {
											$('#chenantwo_new').attr("checked",
													"checked");
										}
									}

									// 案卷上交天数
									if (case1.process_fileup_day != null
											&& case1.process_fileup_day > 0) {
										$("#btn_process_fileup_day_catch_id")
												.prop("disabled", true);
										$(
												'input[name="process.process_fileup_day"]')
												.prop("disabled", true);
										$(
												'input[name="process.process_fileup_day"]')
												.val(case1.process_fileup_day);
									}
									/*----------------------------------------第二次案卷上交和拿回--------------------------------------------*/
									// 第二次案卷已上交，img
									if (loginer_id == info.info_legal_team_member) {
										console.log("法制民警登录2");
										if (case1.process_file_hand_two != null) {
											// 案卷已上交，未拿回
											console.log("案卷上交不为空2");
											if (case1.process_file_hand_two == "是") {
												/*
												 * 案卷上交：显示图片，隐藏按钮；
												 * 案卷拿回：显示按钮，隐藏图片；
												 */
												fileHandCaseTwo();
											}
											// 案卷已上交，又拿回
											else {
												noFileHandCaseTwo();
											}
										} else {
											/*
											 * 案卷上交：显示按钮，隐藏图片； 案卷拿回：显示图片，隐藏按钮；
											 */
											noFileHandCaseTwo();
										}
									} else {
										// 非法制民警
										console.log("非法制民警登录2");
										if (case1.process_file_hand_two != null) {
											console.log("笫二次拿回不为空");
											if (case1.process_file_hand_two == "否") {
												/*
												 * 案卷上交：隐藏按钮，隐藏图片；
												 * 案卷拿回：显示图片，隐藏按钮；
												 */
												$(
														"#process_file_hand_two_penal_two_img")
														.hide();
												$(
														"#process_file_hand_two_penal_two_bnt")
														.hide();
												// 第二次案卷拿回：显示拿回按钮，隐藏图片
												$(
														"#process_file_hand_penal_two_no_img")
														.show();
												$(
														"#process_file_hand_penal_two_no_bnt")
														.hide();
											} else {
												console.log("笫二次拿回字段为是");
												/*
												 * 案卷上交：隐藏按钮，隐藏图片；
												 * 案卷拿回：隐藏图片，隐藏按钮；
												 */

												$(
														"#process_file_hand_two_penal_two_img")
														.hide();
												$(
														"#process_file_hand_two_penal_two_bnt")
														.hide();
												// 第二次案卷拿回：显示拿回按钮，隐藏图片
												$(
														"#process_file_hand_penal_two_no_img")
														.hide();
												$(
														"#process_file_hand_penal_two_no_bnt")
														.hide();
											}
										} else {
											/*
											 * 案卷上交：显示按钮，隐藏图片； 案卷拿回：显示图片，隐藏按钮；
											 */
											console.log("笫二次拿回为空");
											noFileHandCaseTwo();
										}
									}
									/*
									 * // 第二次案卷已上交，img if (loginer_id ==
									 * info.info_legal_team_member) { if
									 * (case1.process_file_hand_two != null) {
									 * console.log("第二次案卷上交不为null"); //
									 * 显示提交图片，隐藏案卷上交按钮 $(
									 * "#process_file_hand_two_penal_two_bnt")
									 * .hide(); $(
									 * "#process_file_hand_two_penal_two_img")
									 * .show(); } else if (typeof
									 * (case1.process_file_hand_two) ==
									 * undefined) {
									 * console.log("第二次案卷上交undefined"); //
									 * 显示提交图片，隐藏案卷上交按钮 $(
									 * "#process_file_hand_two_penal_two_bnt")
									 * .show(); $(
									 * "#process_file_hand_two_penal_two_img")
									 * .hide(); } else {
									 * console.log("第二次案卷上交null"); //
									 * 显示提交图片，隐藏案卷上交按钮 console.log("字段是空的"); $(
									 * "#process_file_hand_two_penal_two_bnt")
									 * .show(); $(
									 * "#process_file_hand_two_penal_two_img")
									 * .hide(); } } else { // 非法制民警 if
									 * (case1.process_file_hand_two != null) { //
									 * 显示提交图片，隐藏案卷上交按钮 $(
									 * "#process_file_hand_two_penal_two_bnt")
									 * .hide(); $(
									 * "#process_file_hand_two_penal_two_img")
									 * .show(); } else if (typeof
									 * (case1.process_file_hand_two) ==
									 * undefined) { // 显示提交图片，隐藏案卷上交按钮 $(
									 * "#process_file_hand_two_penal_two_img")
									 * .hide(); $(
									 * "#process_file_hand_two_penal_two_bnt")
									 * .hide(); } else { // 显示提交图片，隐藏案卷上交按钮 $(
									 * "#process_file_hand_two_penal_two_img")
									 * .hide(); $(
									 * "#process_file_hand_two_penal_two_bnt")
									 * .hide(); } } // 第二次 案卷已拿回 if (loginer_id ==
									 * info.info_legal_team_member) { //
									 * 案卷已上交，未拿回 if (case1.process_file_hand_two ==
									 * "是") { console.log("第二次拿回 是") $(
									 * "#process_file_hand_penal_two_no_img")
									 * .hide(); $(
									 * "#process_file_hand_penal_two_no_bnt")
									 * .show(); } // 案卷已上交，又拿回 if
									 * (case1.process_file_hand_two = "否") {
									 * console.log("第二次拿回 否") $(
									 * "#process_file_hand_penal_two_no_img")
									 * .show(); $(
									 * "#process_file_hand_penal_two_no_bnt")
									 * .hide(); } } else { // 非法制民警 if
									 * (case1.process_file_hand_two == "否") { //
									 * 显示提交图片，隐藏案卷上交按钮 $(
									 * "#process_file_hand_penal_two_no_img")
									 * .show(); $(
									 * "#process_file_hand_penal_two_no_bnt")
									 * .hide(); } if
									 * (case1.process_file_hand_two == "是") { //
									 * 显示提交图片，隐藏案卷上交按钮 $(
									 * "#process_file_hand_penal_two_no_img")
									 * .hide(); $(
									 * "#process_file_hand_penal_two_no_bnt")
									 * .hide(); } }
									 */
									// 第二次 提出问题
									if (case1.process_question_list_two != null) {
										$("#btn_process_question_list_two_id")
												.prop("disabled", true);
										$("#process_question_list_two").prop(
												"disabled", true);
										$("#process_question_list_two")
												.val(
														case1.process_question_list_two);
									}

									// 刑事案件自动生成问题整改第二次复选框
									checkbox_process_question_penal_two(case1);

									// 第二次 案卷拿回天数
									if (case1.process_fileback_day_two != null
											&& case1.process_fileback_day_two > 0) {
										$("#btn_process_fileback_day_two_id")
												.prop("disabled", true)
										$("#process_fileback_day_two").prop(
												"disabled", true);
										$("#process_fileback_day_two").val(
												case1.process_fileback_day_two);
									}

									// 第二次 问题整改
									if (case1.process_question_two != null
											&& case1.process_question_two.length > 0) {
										$('#btn_process_question_two_id').prop(
												"disabled", true);
										for (i = 1; i <= case1.process_question_list_two; i++) {
											$('#process_question_two' + i).prop(
													"disabled", true);
											// 问题整改中包含此字符,被选中
											if (case1.process_question_two
													.indexOf(i) != -1) {
												$('#process_question_two' + i)
														.attr("checked",
																"checked");
											}
										}
									}

									// 第三次强制措施
									if (case1.process_force_measure_three != null
											&& case1.process_force_measure_three.length > 0) {
										$(
												"#btn_process_force_measure_three_arrest_id")
												.prop("disabled", true);
										$("#btn_process_force_measure_three_id")
												.prop("disabled", true);
										$(
												'input[name="ajdbxtProcess.process_force_measure_three"]')
												.prop("disabled", true);
										if ("取保候审" == case1.process_force_measure_three) {
											$('#qubaothree_yes').attr(
													"checked", "checked");
										}
										if ("起诉" == case1.process_force_measure_three) {
											$('#qubaothree_no').attr("checked",
													"checked");
											// 另一个第三次强制措施里的起诉radio
											$('#cheanthree_no').attr("checked",
													"checked");
										}
										if ("撤案" == case1.process_force_measure_three) {
											$('#cheanthree_yes').attr(
													"checked", "checked");
										}
										if ("解保" == case1.process_force_measure_three) {
											$('#cheanthree_new').attr(
													"checked", "checked");
										}
									}

									// 第二次 证据上交
									if (case1.process_evidence_to_upload_two_affirm != null
											&& case1.process_evidence_to_upload_two_affirm.length > 0) {
										$("#btn_qubao_process_evidence_to_upload_two_id")
												.prop("disabled", true);
										$(
												"#btn_process_evidence_to_upload_two_id")
												.prop("disabled", true);
										$(
												'input[name="ajdbxtProcess.process_evidence_to_upload_two_affirm"')
												.attr("disabled", true);
										if (case1.process_force_measure_two == "逮捕") {
											if ("是" == case1.process_evidence_to_upload_two_affirm) {
												$(
														'#process_evidence_to_upload_two_penal_two_yes')
														.attr("checked",
																"checked");
											}
											if ("否" == case1.process_evidence_to_upload_two_affirm) {
												$(
														'#process_evidence_to_upload_two_penal_two_no')
														.attr("checked",
																"checked");
											}
										}
										if (case1.process_force_measure_two == "取保候审"
												|| case1.process_force_measure_two == "监视居住") {
											if ("是" == case1.process_evidence_to_upload_two_affirm) {
												$(
														'#qubao_process_evidence_to_upload_two_penal_two_yes')
														.attr("checked",
																"checked");
											}
											if ("否" == case1.process_evidence_to_upload_two_affirm) {
												$(
														'#qubao_process_evidence_to_upload_two_penal_two_yes')
														.attr("checked",
																"checked");
											}

										}

									}

									// 第三强制措施
									if (case1.process_force_measure_three != null
											&& case1.process_force_measure_three.length > 0) {
										if ("取保候审" == case1.process_force_measure_three) {
											$('#qubaothree_yes').attr(
													"checked", "checked");
											$("#qubaothree_no").prop(
													"disabled", true);
										}
										if ("起诉" == case1.process_force_measure_three) {
											$('#qubaothree_no').attr("checked",
													"checked");
											$("#qubaothree_yes").prop(
													"disabled", true);
											$('#cheanthree_no').attr("checked",
													"checked");
											$("#cheanthree_yes").prop(
													"disabled", true);
											$("#cheanthree_new").prop(
													"disabled", true);
										}
										if ("撤案" == case1.process_force_measure_three) {
											$('#cheanthree_yes').attr(
													"checked", "checked");
											$("#cheanthree_no").prop(
													"disabled", true);
											$("#cheanthree_new").prop(
													"disabled", true);
										}
										if ("解保" == case1.process_force_measure_three) {
											$('#cheanthree_new').attr(
													"checked", "checked");
											$("#cheanthree_no").prop(
													"disabled", true);
											$("#cheanthree_yes").prop(
													"disabled", true);
										}
									}

									// 第四次强制措施
									if (case1.process_force_measure_four != null
											&& case1.process_force_measure_four.length > 0) {
										$("#btn_process_force_measure_four_id")
												.prop("disabled", true);
										$(
												'input[name="ajdbxtProcess.process_force_measure_four"]')
												.prop("disabled", true);
										if ("撤案" == case1.process_force_measure_four) {
											$('#cheanfour_yes').attr("checked",
													"checked");
										}
										if ("起诉" == case1.process_force_measure_four) {
											$('#chenanfour_no').attr("checked",
													"checked");
										}
										if ("解保" == case1.process_force_measure_four) {
											$('#chenanfour_new').attr(
													"checked", "checked");
										}
									}

									// 第一次补查
									if (case1.process_search_result_one != null
											&& case1.process_search_result_one.length > 0) {
										$("#btn_process_search_result_one_id")
												.prop("disabled", true);
										$(
												'input[name="ajdbxtProcess.process_search_result_one"]')
												.prop("disabled", true);
										if ("是" == case1.process_search_result_one) {
											$('#checkone_yes').attr("checked",
													"checked");
										}
										if ("否" == case1.process_result_of_prosecution) {
											$('#checkedone_no').attr("checked",
													"checked");
										}
									}

									// 第二次补查
									if (case1.process_search_result_two != null
											&& case1.process_search_result_two.length > 0) {
										$("#btn_process_search_result_two_id")
												.prop("disabled", true);
										$(
												'input[name="ajdbxtProcess.process_search_result_two"]')
												.prop("disabled", true);
										if ("是" == case1.process_search_result_two) {
											$('#checktwo_yes').attr("checked",
													"checked");
										}
										if ("否" == case1.process_result_of_prosecution) {
											$('#checkedtwo_no').attr("checked",
													"checked");

										}
									}

									// 结案
									if (case1.process_case_end != null
											&& case1.process_case_end.length > 0) {
										// 行政 结案按钮
										$("#caseendcommit").prop("disabled", true);
										// 刑事结案按钮
										$("#btn_process_case_end_id").prop(
												"disabled", true);
										// radio
										$(
												'input[name="ajdbxtProcess.process_case_end"]')
												.prop("disabled", true);
										if (staff_info.info.info_category == "行政案件") {
											if ("是" == case1.process_case_end) {
												$('#case_ending_yes').attr(
														"checked", "checked");
											}
											if ("否" == case1.process_case_end) {
												$('#case_ending_no').attr(
														"checked", "checked");
											}
										}
										if (staff_info.info.info_category == "刑事案件") {
											if ("是" == case1.process_case_end) {
												$('#pencalcase_ending_yes')
														.attr("checked",
																"checked");
											}
											if ("否" == case1.process_case_end) {
												$('#pencalcase_ending_no')
														.attr("checked",
																"checked");
											}
										}
									}

									// 评分
									if (case1.process_score != null) {
										$("#btn_process_score_xingshi_id").prop("disabled", true);
										$("#scorecommit").prop("disabled", true);
										$('input[name="process.process_score"]').prop("disabled", true);
										$('input[name="process.process_score"]').val(case1.process_score);
									}

									// 附卷上交
									console.log("loginer_id:" + loginer_id);
									console.log("info.info_legal_team_member:"
											+ info.info_legal_team_member);

									if (loginer_id == info.info_legal_team_member) {
										console.log(0);
										if (case1.process_casefile_auxiliary == "是") {
											// 显示提交图片，隐藏 附卷上交按钮
											handCase();
										} else {
											// 隐藏提交图片，显示 附卷上交按钮
											noHandCase();

										}
									} else {
										console.log(1);
										// 非法制民警
										// 附卷上交
										if (case1.process_casefile_auxiliary == "是") {
											// 显示提交图片，隐藏 附卷上交按钮
											handCase();
										} else {
											// 附卷不上交
											// 隐藏提交图片，隐藏 附卷上交按钮
											hideHandCase();
										}
									}

									// 行政案件 涉案财物已入库
									if (staff_info.info.info_category == "行政案件") {
										if (case1.process_goods_in_lib != null
												&& case1.process_goods_in_lib.length > 0) {
											$(
													"#btn_process_goods_in_lib_xingzheng_id")
													.prop("disabled", true);
											$(
													'input[name="ajdbxtProcess.process_goods_in_lib"]')
													.prop("disabled", true);
											if ("是" == case1.process_goods_in_lib) {
												$('#goods_in_lib_yes').attr(
														"checked", "checked");
											}
											if ("否" == case1.process_goods_in_lib) {
												$('#goods_in_lib_no').attr(
														"checked", "checked");
											}
										}
									}

								}
							});

			mandatory_measuresBtnClick();
			second_punishmentClick();
			third_punishmentClick();
			four_punishmentClick();
			checkOne_Click();
			// pencalmanagement(case1);
			// checkbox_process_question_penal_one(case1);// 刑事案件自动生成问题整改第一次复选框
			// process_question_out_penal_one(case1);// 刑事案件第一次问题整改复选框选中
			// checkbox_process_question_penal_two(case1);// 刑事案件自动生成问题整改第二次复选框
			// process_question_out_penal_two(case1);// 刑事案件第二次问题整改复选框选中
			// cesehand_img(case1);// 刑事案件案卷上交/拿回按钮显示与否
		}
	}
	xmlhttp.open("post", url, true);
	xmlhttp.send();
}

/*-----------------分割线---------------------------*/
/*-----------------第一次案卷上交的隐藏显示操作---------------------------*/
// 第一次案卷已上交或案件不拿回
function fileHandCaseOne() {
	console.log("隐藏第一次上交按钮，显示第一次拿回按钮");
	// 第一次案卷上交： 显示提交图片，隐藏上交按钮
	$("#process_file_hand_penal_one_bnt").hide();
	$("#process_file_hand_penal_one_img").show();
	// 第一次案卷拿回：显示拿回按钮，隐藏图片
	$("#process_file_hand_penal_one_no_bnt").show();
	$("#process_file_hand_penal_one_no_img").hide();
}

// 第一次案卷已拿回
function noFileHandCaseOne() {
	// 隐藏提交图片，显示第一次案卷上交按钮
	console.log("显示第一次上交按钮，隐藏第一次拿回按钮");
	// 第一次案卷上交： 隐藏提交图片，显示上交按钮
	$("#process_casefile_auxiliary_id_bnt").show();
	$("#process_casefile_auxiliary_id_img").hide();
	// 第一次案卷拿回：显示已拿回图片，隐藏拿回按钮
	// 显示拿回图片，隐藏拿回按钮
	$("#process_file_hand_penal_one_no_bnt").hide();
	$("#process_file_hand_penal_one_no_img").show();
}
/*-----------------分割线---------------------------*/

/*-----------------第二次案卷上交的隐藏显示操作---------------------------*/
// 第二次案卷已上交或案件不拿回
function fileHandCaseTwo() {
	console.log("隐藏第二次上交按钮，显示第二次拿回按钮");
	// 第二次案卷上交： 显示提交图片，隐藏上交按钮
	$("#process_file_hand_two_penal_two_img").show();
	$("#process_file_hand_two_penal_two_bnt").hide();
	// 第二次案卷拿回：显示拿回按钮，隐藏图片
	$("#process_file_hand_penal_two_no_img").hide();
	$("#process_file_hand_penal_two_no_bnt").show();
}

// 第二次案卷已拿回
function noFileHandCaseTwo() {
	// 隐藏提交图片，显示第二次案卷上交按钮
	console.log("显示第二次上交按钮，隐藏第二次拿回按钮");
	// 第二次案卷上交： 隐藏提交图片，显示上交按钮
	$("#process_file_hand_two_penal_two_img").hide();
	$("#process_file_hand_two_penal_two_bnt").show();
	// 第二次案卷拿回：显示已拿回图片，隐藏拿回按钮
	// 显示拿回图片，隐藏拿回按钮
	$("#process_file_hand_penal_two_no_img").show();
	$("#process_file_hand_penal_two_no_bnt").hide();
}
/*-----------------分割线---------------------------*/
/*-----------------分割线---------------------------*/
/*----------------- 附卷上交的隐藏显示操作---------------------------*/
// 附卷已上交或案件拿回为是
function handCase() {
	console.log("隐藏按钮");
	// 显示提交图片，隐藏案卷上交按钮
	$("#process_casefile_auxiliary_id_bnt").hide();
	$("#process_casefile_auxiliary_id_img").show();
}

// 附卷已拿回为是
function noHandCase() {
	// 隐藏提交图片，显示附卷上交按钮
	console.log("显示按钮");
	$("#process_casefile_auxiliary_id_bnt").show();
	$("#process_casefile_auxiliary_id_img").hide();
}
// 关于附卷上交全部隐藏
function hideHandCase() {
	console.log("按钮都不显示");
	// 隐藏提交图片，隐藏附卷上交按钮
	$("#process_casefile_auxiliary_id_bnt").hide();
	$("#process_casefile_auxiliary_id_img").hide();
}
/*-----------------分割线---------------------------*/