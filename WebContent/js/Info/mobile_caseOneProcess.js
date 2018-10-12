window.onload = function() {
	var url = window.location.href;
	info_id = url.substring(url.indexOf("=") + 1);
	// console.log(info_id);
	get_staffDetails(info_id);
	// 行政案件流程
	get_processDetails(info_id);
	// 刑事案件流程
	get_penalProcessDetails(info_id);
	// 判断案件类型，显示对应流程
	// putOnRecord_process_visible(staff_info);
}

function isContains(str, substr) {
	return str.indexOf(substr) >= 0;
}

function get_staffDetails(info_id) {
	// console.log("b1");
	var url = "/ajdbxt/info/Info_getSingleInfo?info.ajdbxt_info_id=" + info_id;
	get_staffDetails_Ajax(url, info_id);
}

function get_processDetails(info_id) {
	// console.log("b1");
	var url = "/ajdbxt/process/findSingleProcessAction?ajdbxtProcess.process_case_id="
			+ info_id;
	get_processDetails_Ajax(url, info_id);
}
function get_penalProcessDetails(info_id) {
	var url = "/ajdbxt/process/findSingleProcessAction?ajdbxtProcess.process_case_id="
			+ info_id;
	get_penalProcessDetails_Ajax(url, info_id);
}

// 案件基本信息，判断案件显示的流程类别，判断提交按钮对不同人员的可见性
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
			// 遍历并插入input的value
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

			// 未成年人
			if (staff_info.info.info_nonage != null
					&& staff_info.info.info_nonage.length > 0) {
				if ("是" == staff_info.info.info_nonage.trim()) {
					$('#caseDateles_minors_asking_yes').attr("checked",
							"checked");
					$("#caseDateles_minors_asking_no").prop("disabled", true);
				}
				if ("否" == staff_info.info.info_nonage.trim()) {
					$('#caseDateles_minors_asking_no').attr("checked",
							"checked");
					$("#caseDateles_minors_asking_yes").prop("disabled", true);
				}
			}
			// 通知局长、政委
			if (staff_info.info.info_inform_leaders != null) {
				if ("是" == staff_info.info.info_inform_leaders.trim()) {
					$('#caseDateles_info_inform_leaders_yes').attr("checked",
							"checked");
				}
			} else {
			}
			// 办案单位
			$.each(staff_info.department, function(key, value) {
				$('input[name="department.' + key + '"]').val(value);
			});
			// 值班局领导
			$.each(staff_info.leader, function(key, value) {
				$('input[name="leader.' + key + '"]').val(value);
			});
			// 值班法制大队民警
			$.each(staff_info.legal, function(key, value) {
				$('input[name="legal.' + key + '"]').val(value);
			});
			// 主办民警
			$.each(staff_info.police[0], function(key, value) {
				$('input[name="police[0].' + key + '"]').val(value);
			});
			// 协办民警1
			$.each(staff_info.police[1], function(key, value) {
				$('input[name="police[1].' + key + '"]').val(value);
			});
			// 协办民警2
			$.each(staff_info.police[2], function(key, value) {
				$('input[name="police[2].' + key + '"]').val(value);
			});
			// 判断案件类别显示不同办案流程
			info_category(staff_info);
			// 判断受立案和流程的互斥显示
			putOnRecord_process_visible(staff_info);
			// 判断提交按钮可见性
			btn_police_commit_visible(staff_info);
			btn_police2_commit_visible(staff_info);
			btn_police3_commit_visible(staff_info);
			btn_cap_commit_visible(staff_info);
			btn_legal_commit_visible(staff_info);
		}
	}
	xmlhttp.open("post", url, true);
	xmlhttp.send();
}

// 判断案件类别显示相应的案件流程
function info_category(staff_info) {
	var case1 = staff_info.info;
	if (case1.info_category == '刑事案件') {
		document.getElementById('xingshi_case').classList.remove("mui-hidden");
		get_penalProcessDetails(info_id);
	} else if (case1.info_category == '行政案件') {
		document.getElementById('xingzhen_case').classList.remove("mui-hidden");
		get_processDetails(info_id);
	} else {

	}
}
// 判断“受立案”与“流程”显示；立案字段!="是"则显示受立案隐藏流程；立案字段=="是"则显示流程隐藏受立案
function putOnRecord_process_visible(staff_info) {
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
function btn_police_commit_visible(staff_info) {
	// 判断如果是办案民警就显示按钮
	if (null == staff_info.police[0] || "" == staff_info.police[0]
			|| undefined == staff_info.police[0]) {
	} else {
		if (staff_info.police[0].ajdbxt_police_id == loginer_id) {
			$(".btn_police_commit").show();
			// console.log($(".btn_police_commit").prop("hidden"))
			return false;
		}
	}
}
function btn_police2_commit_visible(staff_info) {
	var loginer_id = $("#loginer_id").html().trim();
	if (null == staff_info.police[1] || "" == staff_info.police[1]
			|| undefined == staff_info.police[1]) {
	} else {
		if (staff_info.police[1].ajdbxt_police_id == loginer_id) {
			$(".btn_police_commit").show();
			return false;
		}
	}
}
function btn_police3_commit_visible(staff_info) {
	var loginer_id = $("#loginer_id").html().trim();
	if (null == staff_info.police[2] || "" == staff_info.police[2]
			|| undefined == staff_info.police[2]) {
	} else {
		if (staff_info.police[2].ajdbxt_police_id == loginer_id) {
			$(".btn_police_commit").show();
			return false;
		}
	}
}
// 判断提交按钮的可见性
function btn_legal_commit_visible(staff_info) {
	var loginer_id = $("#loginer_id").html().trim();
	if (null == staff_info.legal || "" == staff_info.legal
			|| undefined == staff_info.legal) {
	} else {
		if (staff_info.legal.ajdbxt_police_id == loginer_id) {
			$(".btn_legal_commit").show();
			return false;
		}
	}
}
function btn_cap_commit_visible(staff_info) {
	var loginer_id = $("#loginer_id").html().trim();
	// 判断所队长审核按钮的可见性
	if (null == staff_info.cap || "" == staff_info.cap
			|| undefined == staff_info.cap) {
	} else {
		if (staff_info.cap.ajdbxt_police_id == loginer_id) {
			$(".btn_cap_commit").show();
			return false;
		}
	}
}





/*********************************************************/
// 刑事案件流程
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
			var case1 = staff_info.process;
			// 把流程已经有的值赋值
			$.each(case1, function(key, value) {
				$('input[name="ajdbxtProcess.' + key + '"]').val(value);
			});

			// 立案
			if (case1.process_put_on_record != null
					&& case1.process_put_on_record.length > 0) {
//				$('input[name="ajdbxtProcess.process_put_on_record"]').prop(
//						"disabled", true);
				$('#btn_id_process_put_on_record_xs').prop('disabled', true);
				if ("是" == case1.process_put_on_record) {
					$('#process_put_on_record_penal_yes').prop("disabled", true);
					$('#process_put_on_record_penal_yes').attr("checked",
							"checked");
				}
				if ("否" == case1.process_put_on_record) {
					$('#process_put_on_record_penal_no').prop("disabled", true);
					$('#process_put_on_record_penal_no').attr("checked",
							"checked");
				}
			}

			// 延长传唤
			if (case1.process_lengthen_subpoena != null
					&& case1.process_lengthen_subpoena.length > 0) {
				$('#btn_id_lengthen_subpoena_xs').prop('disabled', true);
				$('#penalsuspect_summon_yes').prop("disabled", true);
				$('#penalsuspect_summon_no').prop("disabled", true);
				/*$('input[name="ajdbxtProcess.process_lengthen_subpoena"]')
						.prop("disabled", true);*/
//				$('#commitsuspect').prop("disabled", true);
				if ("是" == case1.process_lengthen_subpoena) {
					$('#penalsuspect_summon_yes').attr("checked", "checked");
					
				}
				if ("否" == case1.process_lengthen_subpoena) {
					$('#penalsuspect_summon_no').attr("checked", "checked");
					
				}
//				$('#suspect_summon_yes').attr("checked", "checked");
				/*if (case1.process_is_rollback != '是') {
					$("#suspect_summon_no").prop("disabled", "true");
					$("#suspect_summon_yes").prop("disabled", "true");
					$("#commitsuspect").prop("disabled", "true");
				} else {
					$("#suspect_summon_no").prop("disabled", false);
					$("#suspect_summon_yes").prop("disabled", false);
					$("#commitsuspect").prop("disabled", false);
				}*/
			}

			// 鉴定
			if (case1.process_authenticate != null
					&& case1.process_authenticate.length > 0) {
				$('#btn_id_process_auth_xs').prop("disabled", true);
				$('input[name="ajdbxtProcess.process_authenticate"]').prop(
						'disabled', true);
				if ("是" == case1.process_authenticate) {
					$('#penalidentification_yes').attr("checked", "checked");
//					$('#penalidentification_yes').prop("disbaled", true);
				}
				if ("否" == case1.process_authenticate) {
					$('#penalidentification_no').attr("checked", "checked");
//					$('#penalidentification_no').prop("disbaled", true);
				}
			}

			// 第一次强制措施
			if (case1.process_force_measure_one != null
					&& case1.process_force_measure_one.length > 0) {
				$('#btn_id_force_one_xs').prop("disabled", true);
				$('input[name="ajdbxtProcess.process_force_measure_one"]')
						.prop("disabled", true);
				if ("拘留" == case1.process_force_measure_one) {
					$('#measure_one_one').attr("checked", "checked");
//					$('#measure_one_one').prop("disabled", true);
				}
				if ("监视居住" == case1.process_force_measure_one) {
					$('#measure_one_two').attr("checked", "checked");
//					$('#measure_one_two').prop("disabled", true);
				}
				if ("取保候审" == case1.process_force_measure_one) {
					$('#measure_one_three').attr("checked", "checked");
					
				}
			}

				// 证据上传1
				if (case1.process_evidence_to_upload_affirm != null
						&& case1.process_evidence_to_upload_affirm.length > 0) {
					$('#btn_id_evidence_upload_one_xs').prop("disabled", true);
					$('input[name="ajdbxtProcess.process_evidence_to_upload_affirm"]')
							.prop("disabled", true);
					if ("是" == case1.process_evidence_to_upload_affirm) {
						$('#process_evidence_to_upload_penal_yes').attr(
								"checked", "checked");
//						$('#process_evidence_to_upload_penal_yes').prop("disabled", true);
					}
					if ("否" == case1.process_evidence_to_upload_affirm) {
						$('#process_evidence_to_upload_penal_no').attr(
								"checked", "checked");
//						$('#process_evidence_to_upload_penal_no').prop("disbaled", true);
					}
				}

				// 第一次案卷已上交，img
				if (loginer_id == staff_info.info.info_legal_team_member) {
					if (case1.process_file_hand != null) {
						$("#process_file_hand_penal_one_bnt").hide();
						// 显示提交图片，隐藏案卷上交按钮
						$("#process_file_hand_penal_one_img").show();
					} else if (typeof (case1.process_file_hand) == undefined) {
						$("#process_file_hand_penal_one_img").hide();
						$("#process_file_hand_penal_one_bnt").show();
					} else {
						$("#process_file_hand_penal_one_img").hide();
						$("#process_file_hand_penal_one_bnt").show();
					}
				} else {
					// 非法制民警
					if (case1.process_file_hand != null) {
						$("#process_file_hand_penal_one_bnt").hide();
						$(
						// 显示提交图片，隐藏案卷上交按钮
						"#process_file_hand_penal_one_img").show();
					} else if (typeof (case1.process_file_hand) == undefined) {
						$("#process_file_hand_penal_one_img").hide();
						$("#process_file_hand_penal_one_bnt").show();
					} else {
						$("#process_file_hand_penal_one_img").hide();
						$("#process_file_hand_penal_one_bnt").hide();
					}
				}

				// 第一次 提出问题
				if (case1.process_question_list != null
						&& case1.process_question_list > 0) {
					$("#btn_process_question_list_id").prop("disabled", true);
					$("#penalprocess_question_list").prop("disabled", true);
					$("#penalprocess_question_list").val(case1.process_question_list);
					// $("#btn_process_question_list_id").show();
					/*$('input[name="process.process_question_list"]').prop(
							"disabled", true);
					$('input[name="process.process_question_list"]').val(
							case1.process_question_list);*/
//					for (int i=1;i<=case1.process_question_list;i++) {
//						$('#process_question'+i).prop("disabled", true);
//					}
				}

				// 生成问题整改复选框
				checkbox_process_question_penal_one(case1);

				// 办案民警延长拘留期限
				if (case1.process_lengthen_criminal_detention != null
						&& case1.process_lengthen_criminal_detention.length > 0) {
					$("#detentioncommit").prop("disabled", true);
					$("#process_lengthen_criminal_detention_one").prop("disabled", true);
					$("#process_lengthen_criminal_detention_two").prop("disabled", true);
					$("#process_lengthen_criminal_detention_three").prop("disabled", true);
					if(case1.process_lengthen_criminal_detention == "30") {
						$("#process_lengthen_criminal_detention_one").attr("checked", "checked");
					}
					if(case1.process_lengthen_criminal_detention == "7") {
						$("#process_lengthen_criminal_detention_two").attr("checked", "checked");
					}
					if(case1.process_lengthen_criminal_detention == "0") {
						$("#process_lengthen_criminal_detention_three").attr("checked", "checked");
					}
				}

				// 第一次 案卷拿回天数，input
				if (case1.process_fileback_day != null) {
					$("#btn_process_fileback_day_id").prop("disabled", true)
					$("#process_fileback_day").prop("disabled", true);
					$("#process_fileback_day").val(case1.process_fileback_day);
				}

				// 第一次案卷已拿回，img
				if (loginer_id == staff_info.info.info_legal_team_member) {
					// 案卷已上交，未拿回
					if (case1.process_file_hand == "是") {
						// 显示提交图片，隐藏案卷上交按钮
						$("#process_file_hand_penal_one_no_img").hide();
						$("#process_file_hand_penal_one_no_bnt").show();
					}
					// 案卷已上交，又拿回
					if (case1.process_file_hand == "否") {
						// 显示提交图片，隐藏案卷上交按钮
						$("#process_file_hand_penal_one_no_bnt").hide();
						$("#process_file_hand_penal_one_no_img").show();
					}
				} else {
					// 非法制民警
					if (case1.process_file_hand == "否") {
						// 显示提交图片，隐藏案卷上交按钮
						$("#process_file_hand_penal_one_no_bnt").hide();
						$("#process_file_hand_penal_one_no_img").show();
					}
					if (case1.process_file_hand == "是") {
						// 显示提交图片，隐藏案卷上交按钮
						$("#process_file_hand_penal_one_no_img").hide();
						$("#process_file_hand_penal_one_no_bnt").hide();
					}
				}

				// 第一次 问题整改
				if (case1.process_question != null
						&& case1.process_question.length > 0) {
					$('#btn_process_question_id').prop("disabled", true);
					for (i = 1; i <= case1.process_question_list; i++) {
						$('#process_question' + i).prop("disabled", true);
						// 问题整改中包含此字符,被选中
						if (case1.process_question.indexOf(i) != -1) {
							$('#process_question' + i).attr("checked",
									"checked");
						}
					}
				}

				// 第二次强制措施
				if (case1.process_force_measure_two != null
						&& case1.process_force_measure_two.length > 0) {
					$("#forcemessurcommit").prop("disabled", true);
					$("#btn_process_force_measure_two_detention_two_id").prop("disabled", true);
					$('input[name="ajdbxtProcess.process_force_measure_two"]')
							.prop("disabled", true);
					if ("逮捕" == case1.process_force_measure_two) {
						$('#second_punishment_one').attr("checked", "checked");
					}
					if ("取保候审" == case1.process_force_measure_two) {
						$('#second_punishment_two').attr("checked", "checked");
					}
					if ("监视居住" == case1.process_force_measure_two) {
						$('#second_punishment_three')
								.attr("checked", "checked");
					}
					if ("撤案" == case1.process_force_measure_two) {
						$('#chenantwo_yes').attr("checked", "checked");
					}
					if ("起诉" == case1.process_force_measure_two) {
						$('#chenantwo_no').attr("checked", "checked");
					}
					if ("解保" == case1.process_force_measure_two) {
						$('#chenantwo_new').attr("checked", "checked");
					}
				}

				// 案卷上交期限2
				if (case1.process_fileup_day != null) {
					$("#btn_process_fileup_day_catch_id")
							.prop("disabled", true);
					$("#process_fileup_day_juliu").prop("disabled", true);
					$("#process_fileup_day_juliu").val(case1.process_fileup_day);
				}

				// 案卷是否上交2，img
				if (loginer_id == staff_info.info.info_legal_team_member) {
					if (case1.process_file_hand_two != null) {
						// 显示提交图片，隐藏案卷上交按钮
						$("#process_file_hand_two_penal_two_bnt").hide();
						$("#process_file_hand_two_penal_two_img").show();
					} else if (typeof (case1.process_file_hand_two) == undefined) {
						// 显示提交图片，隐藏案卷上交按钮
						$("#process_file_hand_two_penal_two_bnt").show();
						$("#process_file_hand_two_penal_two_img").hide();
					} else {
						// 显示提交图片，隐藏案卷上交按钮
						$("#process_file_hand_two_penal_two_bnt").show();
						$("#process_file_hand_two_penal_two_img").hide();
					}
				} else {
					// 非法制民警
					if (case1.process_file_hand_two != null) {
						// 显示提交图片，隐藏案卷上交按钮
						$("#process_file_hand_two_penal_two_bnt").hide();
						$("#process_file_hand_two_penal_two_img").show();
					} else if (typeof (case1.process_file_hand_two) == undefined) {
						// 显示提交图片，隐藏案卷上交按钮
						$("#process_file_hand_two_penal_two_img").hide();
						$("#process_file_hand_two_penal_two_bnt").hide();
					} else {
						// 显示提交图片，隐藏案卷上交按钮
						$("#process_file_hand_two_penal_two_img").hide();
						$("#process_file_hand_two_penal_two_bnt").hide();
					}
				}

				// 第二次 提出问题
				if (case1.process_question_list_two != null) {
					$("#btn_process_question_list_two_id").prop("disabled",
							true);
					$("#process_question_list_two").prop("disabled", true);
					$("#process_question_list_two").val(
							case1.process_question_list_two);
				}

				// 刑事案件自动生成问题整改第二次复选框
				checkbox_process_question_penal_two(case1);

				// 案件上交期限3
				if (case1.process_fileback_day_two != null) {
					$("#btn_process_fileback_day_two_id").prop("disabled", true)
					$("#process_fileback_day_two").prop("disabled", true);
					$("#process_fileback_day_two").val(case1.process_fileback_day_two);
				}

				// 案卷是否上交3
				if (loginer_id == staff_info.info.info_legal_team_member) {
					// 案卷已上交，未拿回
					if (case1.process_file_hand_two == "是") {
						$("#process_file_hand_two_two_qubao_img").hide();
						$("#process_file_hand_two_two_qubao_bnt").show();
					}
					// 案卷已上交，又拿回
					if (case1.process_file_hand_two == "否") {
						$("#process_file_hand_two_two_qubao_img").show();
						$("#process_file_hand_two_two_qubao_bnt").hide();
					}
				} else {
					// 非法制民警
					if (case1.process_file_hand_two == "否") {
						// 显示提交图片，隐藏案卷上交按钮
						$("#process_file_hand_two_two_qubao_img").show();
						$("#process_file_hand_two_two_qubao_bnt").hide();
					}
					if (case1.process_file_hand_two == "是") {
						// 显示提交图片，隐藏案卷上交按钮
						$("#process_file_hand_two_two_qubao_img").hide();
						$("#process_file_hand_two_two_qubao_bnt").hide();
					}
				}

				// 第二次 问题整改
				if (case1.process_question_two != null
						&& case1.process_question_two.length > 0) {
					$('#btn_process_question_two_id').prop("disabled", true);
					for (i = 1; i <= case1.process_question_list_two; i++) {
						$('#process_question_two' + i).prop("disabled", true);
						// 问题整改中包含此字符,被选中
						if (case1.process_question_two.indexOf(i) != -1) {
							$('#process_question_two' + i).attr("checked",
									"checked");
						}
					}
				}

				// 第三次强制措施
				if (case1.process_force_measure_three != null
						&& case1.process_force_measure_three.length > 0) {
					$("#btn_process_force_measure_three_arrest_id").prop(
							"disabled", true);
					$("#btn_process_force_measure_three_id").prop("disabled",
							true);
					$('input[name="ajdbxtProcess.process_force_measure_three"]')
							.prop("disabled", true);
					if ("取保候审" == case1.process_force_measure_three) {
						$('#qubaothree_yes').attr("checked", "checked");
					}
					if ("起诉" == case1.process_force_measure_three) {
						$('#qubaothree_no').attr("checked", "checked");
						// 另一个第三次强制措施里的起诉radio
						$('#cheanthree_no').attr("checked", "checked");
					}
					if ("撤案" == case1.process_force_measure_three) {
						$('#cheanthree_yes').attr("checked", "checked");
					}
					if ("解保" == case1.process_force_measure_three) {
						$('#cheanthree_new').attr("checked", "checked");
					}
				}

				// 证据上交是否齐全（第二次证据上传）
				if (case1.process_evidence_to_upload_two_affirm != null
						&& case1.process_evidence_to_upload_two_affirm.length > 0) {
					$("#btn_qubao_process_evidence_to_upload_two_id").prop(
							"disabled", true);
					$("#btn_process_evidence_to_upload_two_id").prop(
							"disabled", true);
					$(
							'input[name="ajdbxtProcess.process_evidence_to_upload_two_affirm"')
							.attr("disabled", true);
					if (case1.process_force_measure_two == "逮捕") {
						if ("是" == case1.process_evidence_to_upload_two_affirm) {
							$('#process_evidence_to_upload_two_penal_two_yes')
									.attr("checked", "checked");
						}
						if ("否" == case1.process_evidence_to_upload_two_affirm) {
							$('#process_evidence_to_upload_two_penal_two_no')
									.attr("checked", "checked");
						}
					}
					if (case1.process_force_measure_two == "取保候审"
							|| case1.process_force_measure_two == "监视居住") {
						if ("是" == case1.process_evidence_to_upload_two_affirm) {
							$(
									'#qubao_process_evidence_to_upload_two_penal_two_yes')
									.attr("checked", "checked");
						}
						if ("否" == case1.process_evidence_to_upload_two_affirm) {
							$(
									'#qubao_process_evidence_to_upload_two_penal_two_yes')
									.attr("checked", "checked");
						}
					}
				}

				// 第三强制措施
				if (case1.process_force_measure_three != null
						&& case1.process_force_measure_three.length > 0) {
					if ("取保候审" == case1.process_force_measure_three) {
						$('#qubaothree_yes').attr("checked", "checked");
						$("#qubaothree_no").prop("disabled", true);
					}
					if ("起诉" == case1.process_force_measure_three) {
						$('#qubaothree_no').attr("checked", "checked");
						$("#qubaothree_yes").prop("disabled", true);
						$('#cheanthree_no').attr("checked", "checked");
						$("#cheanthree_yes").prop("disabled", true);
						$("#cheanthree_new").prop("disabled", true);
					}
					if ("撤案" == case1.process_force_measure_three) {
						$('#cheanthree_yes').attr("checked", "checked");
						$("#cheanthree_no").prop("disabled", true);
						$("#cheanthree_new").prop("disabled", true);
					}
					if ("解保" == case1.process_force_measure_three) {
						$('#cheanthree_new').attr("checked", "checked");
						$("#cheanthree_no").prop("disabled", true);
						$("#cheanthree_yes").prop("disabled", true);
					}
				}

				// 第四次强制措施
				if (case1.process_force_measure_four != null
						&& case1.process_force_measure_four.length > 0) {
					$("#btn_process_force_measure_four_id").prop("disabled",
							true);
					$('input[name="ajdbxtProcess.process_force_measure_four"]')
							.prop("disabled", true);
					if ("撤案" == case1.process_force_measure_four) {
						$('#cheanfour_yes').attr("checked", "checked");
					}
					if ("起诉" == case1.process_force_measure_four) {
						$('#chenanfour_no').attr("checked", "checked");
					}
					if ("解保" == case1.process_force_measure_four) {
						$('#chenanfour_new').attr("checked", "checked");
					}
				}

				// 第一次补查
				if (case1.process_search_result_one != null
						&& case1.process_search_result_one.length > 0) {
					$("#btn_process_search_result_one_id").prop("disabled",
							true);
					$('input[name="ajdbxtProcess.process_search_result_one"]')
							.prop("disabled", true);
					if ("是" == case1.process_search_result_one) {
						$('#checkone_yes').attr("checked", "checked");
					}
					if ("否" == case1.process_result_of_prosecution) {
						$('#checkedone_no').attr("checked", "checked");
					}
				}

				// 第二次补查
				if (case1.process_search_result_two != null
						&& case1.process_search_result_two.length > 0) {
					$("#btn_process_search_result_two_id").prop("disabled",
							true);
					$('input[name="ajdbxtProcess.process_search_result_two"]')
							.prop("disabled", true);
					if ("是" == case1.process_search_result_two) {
						$('#checktwo_yes').attr("checked", "checked");
					}
					if ("否" == case1.process_result_of_prosecution) {
						$('#checkedtwo_no').attr("checked", "checked");

					}
				}

				// 结案
				if (case1.process_case_end != null
						&& case1.process_case_end.length > 0) {
					// 行政 结案按钮
//					$("#caseendcommit").prop("disabled", true);
					// 刑事结案按钮
					$("#penalcaseendcommit").prop("disabled", true);
					// radio
					$('input[name="ajdbxtProcess.process_case_end"]').prop("disabled", true);
//					if (staff_info.info.info_category == "行政案件") {
						/*if ("是" == case1.process_case_end) {
							$('#case_ending_yes').attr("checked", "checked");
						}
						if ("否" == case1.process_case_end) {
							$('#case_ending_no').attr("checked", "checked");
						}*/
//					}
//					if (staff_info.info.info_category == "刑事案件") {
						if ("是" == case1.process_case_end) {
							$('#pencalcase_ending_yes').attr("checked",
									"checked");
						}
						if ("否" == case1.process_case_end) {
							$('#pencalcase_ending_no').attr("checked",
									"checked");
						}
//					}
				}

				// 评分
				if (case1.process_score != null) {
					$("#btn_process_score_xingshi_id").prop("disabled", true);
					$("#scorecommit").prop("disabled", true);
					$('input[name="process.process_score"]').prop("disabled",
							true);
					$('input[name="process.process_score"]').val(
							case1.process_score);
				}

				// 附卷上交
				if (loginer_id == staff_info.info.info_legal_team_member) {
					if (case1.process_casefile_auxiliary == "是") {
						// 显示提交图片，隐藏案卷上交按钮
						$("#process_casefile_auxiliary_id_bnt").hide();
						$("#process_casefile_auxiliary_id_img").show();
					} else {
						// 隐藏提交图片，显示案卷上交按钮
						$("#process_casefile_auxiliary_id_bnt").show();
						$("#process_casefile_auxiliary_id_img").hide();

					}
				} else {
					// 非法制民警
					if (case1.process_casefile_auxiliary == "是") {
						$("#process_casefile_auxiliary_id_bnt").hide();
						$("#process_casefile_auxiliary_id_img").show();
					} else {
						$("#process_casefile_auxiliary_id_bnt").hide();
						$("#process_casefile_auxiliary_id_img").hide();
					}
				}

//				pencalmanagement(case1);
				// checkbox_process_question_penal_one(case1);//
				// 刑事案件自动生成问题整改第一次复选框
//				checkbox_process_question_penal_two(case1);// 刑事案件自动生成问题整改第二次复选框
//				cesehand_img(case1);// 刑事案件案卷上交/拿回按钮显示与否
				
				mandatory_measuresBtnClick();
				second_punishmentClick();
				third_punishmentClick();
				four_punishmentClick();
				checkOne_Click();
			}
	}
		xmlhttp.open("post", url, true);
		xmlhttp.send();
}
// ------------------------------------------------刑事案件案卷上交/拿回按钮显示与否
/*function cesehand_img(case1) {
	if (case1.process_file_hand != null) {
		$("#process_force_measure_one_process_file_hand").show();
		$("#process_file_hand_penal_one_bnt").hide();
		// $("#process_file_hand_penal_one_img").show();显示图片
		document.getElementById("process_file_hand_penal_one_img").style.display = "block";
		if (case1.process_file_hand == "否") {
			$("#process_file_hand_penal_one_no_img").show();
			$("#process_file_hand_penal_one_no_bnt").hide();
		}
	}
	if (case1.process_file_hand_two != null) {
		$("#process_file_hand_two_penal_two_img").show();
		$("#process_file_hand_two_penal_two_bnt").hide();
		$("#process_file_hand_two_two_qubao_img").show();
		$("#process_file_hand_two_two_qubao_bnt").hide();
		if (case1.process_file_hand_two == "否") {
			$("#process_file_hand_penal_two_no_img").show();
			$("#process_file_hand_penal_two_no_bnt").hide();
		}
	}
	if (case1.process_file_hand_three == "是") {
//		$("#process_file_hand_three_bnt").hide();
//		$("#process_file_hand_three_qubao_img").show();
//		$("#process_file_hand_three_qubao_bnt").hide();

	}
	if (case1.process_casefile_auxiliary == "是") {
		$("#process_casefile_auxiliary_id_img").show();
		$("#process_casefile_auxiliary_id_bnt").hide();
	}
}*/
// ------------------------------------------------隐藏与显示
/*function pencalmanagement(case1) {
	// 涉案财物已入库
	if (case1.process_case_goods == "是") {
		$("#property_storage_div").show();
	}
	// 拘留延长期限、第二次强制措施
	if (case1.process_force_measure_one == "逮捕") {
		$("#detention_delay_date").show();
		$("#second_punishment").show();
		$("#twocase_hand_juliu").show();
		$("#zhenju_two").show();
		$("#tichu_	two").show();
	}
	if (case1.process_force_measure_one == "取保候审"
			|| case1.process_force_measure_one == "监视居住") {
		$("#qubao_second_punishment").show();
		$("#twocase_hand_qubao").show();
		$("#zhenju_two").show();
		$("#tichu_two").show();
	}
	// 第二次案卷拿回天数
	if (case1.process_file_hand_two == "是") {
		$("#nahui_day_two").show();
	}
	// 第二次案卷拿回
	if (case1.process_fileback_day_two != null) {
		$("#casehand_two_no").show();
	}
	// 第一次案卷拿回天数
	
	 * if(case1.process_file_hand=="是"){ $("#nahui_day_one").show(); } //第一次案卷拿回
	 * if(case1.process_fileback_day!=null){ $("#casehand_no").show(); }
	 
	// 第二次问题整改
	if (case1.process_question_list_two != null) {
		$("#zhengai_two").show();
	}
	// 第三次强制措施
	if (case1.process_force_measure_two == "逮捕") {
		$("#third_punishment").show();
		$("#threecase_hand_daibu").show();
		$("#shangjiao_ju").show();
		// 第二次强制措施的案卷上交
		if (case1.process_fileup_day != null) {
			$("#twocase_hand_juliu").show();
		}
	}
	if (case1.process_force_measure_two == "取保候审"
			|| case1.process_force_measure_two == "监视居住") {
		$("#qubao_third_punishment").show();
//		$("#threecase_hand_qubao").show();
		$("#shangjiao_qu").show();
		// 第二次强制措施的案卷上交
		if (case1.process_fileup_day != null) {
			$("#twocase_hand_qubao").show();
		}
	}

	// 第四次强制措施
	if (case1.process_force_measure_three == "取保候审") {
		$("#fourth_punishment").show();
		$("#threecase_hand_daibu").show();
		$("#process_evidence_to_upload_two_three").show();
		// $("#process_evidence_to_upload_two_four").show();

	}
	if (case1.process_force_measure_three == "起诉") {
		$("#threecase_hand_daibu").show();
		$("#process_evidence_to_upload_two_three").show();
	}
	if (case1.process_force_measure_three == "撤案") {
		$("#process_file_hand_three_qubao").show();
		$("#process_evidence_to_upload_two_three").show();
	}
	if (case1.process_force_measure_three == "解保") {
		$("#process_file_hand_three_qubao").show();
		$("#process_evidence_to_upload_two_three").show();
	}
	if (case1.process_force_measure_four != null) {
		$("#process_evidence_to_upload_two_four").show();

	}
	// 补查一次
	if (case1.process_search_result_one == "是") {
		$("#supplement_check").show();
		$("#checkTwo").show();
	}
	if (case1.process_search_result_one == "是"
			|| case1.process_search_result_one == "否") {
		$("#supplement_check").show();
		$("#checkOne").show();
	}
}*/

// 第一次强制措施方法
function mandatory_measuresBtnClick() {
	var mandatory_measuresOne = document
			.getElementsByName("ajdbxtProcess.process_force_measure_one");
	for (var num = 0; num < 3; num++) {
		var mandatory_measuresOne_value = mandatory_measuresOne[num].value;
		if (mandatory_measuresOne[num].checked) {
			if (mandatory_measuresOne_value == "拘留") {// 根据第一次强制措施选择拘留进行判断
				// 选择拘留时，显示出拘留延长期限
				document.getElementById("detention_delay_date").style.display = "block";
				// 选择拘留显示第二次强制措施内容
				document.getElementById("second_punishment").style.display = "block";
				document.getElementById("qubao_second_punishment").style.display = "none";
				return false;
				/*// 案卷上交期限2
				document.getElementById("shangjiao_ju").style.display = "none";
				// 案卷是否上交2
				document.getElementById("twocase_hand_juliu").style.display = "none";
				// 问题清单2
				document.getElementById("tichu_two").style.display = "none";
				// 案卷上交期限3
				document.getElementById("shangjiao_qu").style.display = "none";
				// 案卷是否上交3
				document.getElementById("twocase_hand_qubao").style.display = "none";
				// 问题整改2
				document.getElementById("zhengai_two").style.display = "none";
				// 第三次强制措施内容隐藏
				document.getElementById("third_punishment").style.display = "none";
				document.getElementById("qubao_third_punishment").style.display = "none";
				// 第四次强制措施内容隐藏
				document.getElementById("fourth_punishment").style.display = "none";
				// 证据上交是否齐全
				document.getElementById("qubao_zhenju_two").style.display = "none";
				document.getElementById("zhenju_two").style.display = "none";
				// 隐藏补查
				document.getElementById("supplement_check").style.display = "none";*/
			} else if (mandatory_measuresOne_value == "取保候审"
					|| mandatory_measuresOne_value == "监视居住") {// 选择取保候审显示第二次强制措施内容
				// 选择拘留时，显示出拘留延长期限
				document.getElementById("detention_delay_date").style.display = "none";
				// 选择拘留显示第二次强制措施内容
				document.getElementById("second_punishment").style.display = "none";
				document.getElementById("qubao_second_punishment").style.display = "block";
				return false;
				/*// 案卷上交期限2
				document.getElementById("shangjiao_ju").style.display = "none";
				// 案卷是否上交2
				document.getElementById("twocase_hand_juliu").style.display = "none";
				// 问题清单2
				document.getElementById("tichu_two").style.display = "none";
				// 案卷上交期限3
				document.getElementById("shangjiao_qu").style.display = "none";
				// 案卷是否上交3
				document.getElementById("twocase_hand_qubao").style.display = "none";
				// 问题整改2
				document.getElementById("zhengai_two").style.display = "none";
				// 第三次强制措施内容隐藏
				document.getElementById("third_punishment").style.display = "none";
				document.getElementById("qubao_third_punishment").style.display = "none";
				// 第四次强制措施内容隐藏
				document.getElementById("fourth_punishment").style.display = "none";
				// 证据上交是否齐全
				document.getElementById("qubao_zhenju_two").style.display = "none";
				document.getElementById("zhenju_two").style.display = "none";
				// 隐藏补查
				document.getElementById("supplement_check").style.display = "none";*/
			} else {
				// 选择拘留时，显示出拘留延长期限
				/*document.getElementById("detention_delay_date").style.display = "none";
				// 选择拘留显示第二次强制措施内容
				document.getElementById("second_punishment").style.display = "none";
				document.getElementById("qubao_second_punishment").style.display = "none";
				return false;*/
			}
		}
	}
}
// 第二次强制措施方法
function second_punishmentClick() {
	var second_punishment = document
			.getElementsByName("ajdbxtProcess.process_force_measure_two");
	for (var num = 0; num < 6; num++) {
		var second_punishment_value = second_punishment[num].value;
		if (second_punishment[num].checked) {
			if (second_punishment_value == "逮捕") {// 选择第二次的逮捕显示第三次强制措施内容
				// 案卷上交期限2
				document.getElementById("shangjiao_ju").style.display = "block";
				// 案卷是否上交2
				document.getElementById("twocase_hand_juliu").style.display = "block";
				// 问题清单2
				document.getElementById("tichu_two").style.display = "block";
				// 案卷上交期限3
				document.getElementById("shangjiao_qu").style.display = "block";
				// 案卷是否上交3
				document.getElementById("twocase_hand_qubao").style.display = "block";
				// 问题整改2
				document.getElementById("zhengai_two").style.display = "block";
				// 第三次强制措施内容隐藏
				document.getElementById("third_punishment").style.display = "block";
				document.getElementById("qubao_third_punishment").style.display = "none";
				// 第四次强制措施内容隐藏
//				document.getElementById("fourth_punishment").style.display = "none";
				// 证据上交是否齐全
				document.getElementById("qubao_zhenju_two").style.display = "none";
				document.getElementById("zhenju_two").style.display = "none";
				// 隐藏补查
				document.getElementById("supplement_check").style.display = "none";
				return false;
			} else if (second_punishment_value == "取保候审"
					|| second_punishment_value == "监视居住") {// 选择第二次的取保候审显示第三次强制措施内容
				// 案卷上交期限2
				document.getElementById("shangjiao_ju").style.display = "block";
				// 案卷是否上交2
				document.getElementById("twocase_hand_juliu").style.display = "block";
				// 问题清单2
				document.getElementById("tichu_two").style.display = "block";
				// 案卷上交期限3
				document.getElementById("shangjiao_qu").style.display = "block";
				// 案卷是否上交3
				document.getElementById("twocase_hand_qubao").style.display = "block";
				// 问题整改2
				document.getElementById("zhengai_two").style.display = "block";
				// 第三次强制措施内容隐藏
				document.getElementById("third_punishment").style.display = "none";
				document.getElementById("qubao_third_punishment").style.display = "block";
				// 第四次强制措施内容隐藏
//				document.getElementById("fourth_punishment").style.display = "none";
				// 证据上交是否齐全
				document.getElementById("qubao_zhenju_two").style.display = "block";
				document.getElementById("zhenju_two").style.display = "none";
				// 隐藏补查
				document.getElementById("supplement_check").style.display = "none";
				return false;
			} else if (second_punishment_value == "起诉") {
				// 案卷上交期限2
				document.getElementById("shangjiao_ju").style.display = "none";
				// 案卷是否上交2
				document.getElementById("twocase_hand_juliu").style.display = "none";
				// 问题清单2
				document.getElementById("tichu_two").style.display = "none";
				// 案卷上交期限3
				document.getElementById("shangjiao_qu").style.display = "none";
				// 案卷是否上交3
				document.getElementById("twocase_hand_qubao").style.display = "none";
				// 问题整改2
				document.getElementById("zhengai_two").style.display = "none";
				// 第三次强制措施内容隐藏
				document.getElementById("third_punishment").style.display = "none";
				document.getElementById("qubao_third_punishment").style.display = "none";
				// 第四次强制措施内容隐藏
//				document.getElementById("fourth_punishment").style.display = "none";
				// 证据上交是否齐全
				document.getElementById("qubao_zhenju_two").style.display = "none";
				document.getElementById("zhenju_two").style.display = "none";
				// 隐藏补查
				document.getElementById("supplement_check").style.display = "block";
				return false;
			} else if (second_punishment_value == "撤案" || second_punishment_value == "解保") {
				// 案卷上交期限2
				document.getElementById("shangjiao_ju").style.display = "none";
				// 案卷是否上交2
				document.getElementById("twocase_hand_juliu").style.display = "none";
				// 问题清单2
				document.getElementById("tichu_two").style.display = "none";
				// 案卷上交期限3
				document.getElementById("shangjiao_qu").style.display = "none";
				// 案卷是否上交3
				document.getElementById("twocase_hand_qubao").style.display = "none";
				// 问题整改2
				document.getElementById("zhengai_two").style.display = "none";
				// 第三次强制措施内容隐藏
				document.getElementById("third_punishment").style.display = "none";
				document.getElementById("qubao_third_punishment").style.display = "none";
				// 第四次强制措施内容隐藏
//				document.getElementById("fourth_punishment").style.display = "none";
				// 证据上交是否齐全
				document.getElementById("qubao_zhenju_two").style.display = "none";
				document.getElementById("zhenju_two").style.display = "none";
				// 隐藏补查
				document.getElementById("supplement_check").style.display = "none";
				return false;
			} else {
				// 案卷上交期限2
				/*document.getElementById("shangjiao_ju").style.display = "none";
				// 案卷是否上交2
				document.getElementById("twocase_hand_juliu").style.display = "none";
				// 问题清单2
				document.getElementById("tichu_two").style.display = "none";
				// 案卷上交期限3
				document.getElementById("shangjiao_qu").style.display = "none";
				// 案卷是否上交3
				document.getElementById("twocase_hand_qubao").style.display = "none";
				// 问题整改2
				document.getElementById("zhengai_two").style.display = "none";
				// 第三次强制措施内容隐藏
				document.getElementById("third_punishment").style.display = "none";
				document.getElementById("qubao_third_punishment").style.display = "none";
				// 第四次强制措施内容隐藏
//				document.getElementById("fourth_punishment").style.display = "none";
				// 证据上交是否齐全
				document.getElementById("qubao_zhenju_two").style.display = "none";
				document.getElementById("zhenju_two").style.display = "none";
				// 隐藏补查
				document.getElementById("supplement_check").style.display = "none";
				return false;*/
			}
		}
	}
}
/*
 * 第三次强制措施方法
 */
function third_punishmentClick() {
	var third_punishment = document
			.getElementsByName("ajdbxtProcess.process_force_measure_three");
	for (var num = 0; num < 5; num++) {
		var third_punishment_value = third_punishment[num].value;
		if (third_punishment[num].checked) {
			if (third_punishment_value == "取保候审") {// 选择第三次的起诉显示补查一次
				// 第四次强制措施内容隐藏
				document.getElementById("fourth_punishment").style.display = "block";
				// 证据上交是否齐全
				document.getElementById("qubao_zhenju_two").style.display = "none";
				document.getElementById("zhenju_two").style.display = "block";
				// 隐藏补查
				document.getElementById("supplement_check").style.display = "none";
				return false;
			} else if (third_punishment_value == "起诉") {
				// 第四次强制措施内容隐藏
				document.getElementById("fourth_punishment").style.display = "none";
				// 证据上交是否齐全
				document.getElementById("qubao_zhenju_two").style.display = "none";
				document.getElementById("zhenju_two").style.display = "none";
				// 隐藏补查
				document.getElementById("supplement_check").style.display = "block";
				return false;
			} else if (third_punishment_value == "撤案") {
				// 第四次强制措施内容隐藏
				document.getElementById("fourth_punishment").style.display = "none";
				// 证据上交是否齐全
				document.getElementById("qubao_zhenju_two").style.display = "none";
				document.getElementById("zhenju_two").style.display = "none";
				// 隐藏补查
				document.getElementById("supplement_check").style.display = "none";
				return false;
			} else if (third_punishment_value == "解保") {
				// 第四次强制措施内容隐藏
				document.getElementById("fourth_punishment").style.display = "none";
				// 证据上交是否齐全
				document.getElementById("qubao_zhenju_two").style.display = "none";
				document.getElementById("zhenju_two").style.display = "none";
				// 隐藏补查
				document.getElementById("supplement_check").style.display = "none";
				return false;
			} else {// 选择第二次的监视居住显示第三次强制措施内容
				// 第四次强制措施内容隐藏
				/*document.getElementById("fourth_punishment").style.display = "none";
				// 证据上交是否齐全
				document.getElementById("qubao_zhenju_two").style.display = "none";
				document.getElementById("zhenju_two").style.display = "none";
				// 隐藏补查
				document.getElementById("supplement_check").style.display = "none";
				return false;*/
			}
		}
	}
}

/*
 * 第四次强制措施
 */
function four_punishmentClick() {
	var four_punishment = document
			.getElementsByName("ajdbxtProcess.process_force_measure_four");
	for (var num = 0; num < 3; num++) {
		var four_punishment_value = four_punishment[num].value;
		if (four_punishment[num].checked) {
			if (four_punishment_value == "起诉") {// 选择第三次的起诉显示补查一次
				// 隐藏补查
				document.getElementById("supplement_check").style.display = "block";
				return false;
			} 
			if (four_punishment_value == "撤案" || four_punishment_value == "解保")  {
				document.getElementById("supplement_check").style.display = "none";
				return false;
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
				return false;
			} else {
				document.getElementById("checkTwo").style.display = "none";
				return false;
			}
		}
	}
}
// -----------------------------------------按钮操作-------------------------------
// 立案
function change_penal_process_put_on_record_yes(even) {
	var sex = document.getElementById("process_put_on_record_penal_yes");
	sex.value = '是';
	return sex.value;
}
function change_penal_process_put_on_record_no(even) {
	var sex = document.getElementById("process_put_on_record_penal_no");
	sex.value = '否';
	return sex.value;
}

// 立案提交按钮
function process_put_on_record_penal_but() {
	if (!document.getElementById("process_put_on_record_penal_yes").checked
			&& !document.getElementById("process_put_on_record_penal_no").checked) {
		mui.toast("请选择是否立案！");
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				penalloadprocess_put_on_record_penal_but();
			}
		})
		return false;
	}
}
// 立案确定按钮
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
				get_penalProcessDetails(info_id);
				mui.toast('提交成功！');
				location.reload();
			} else {
				mui.toast('提交失败！');
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
	if (!document.getElementById("goods_in_lib_yes").checked
			&& !document.getElementById("goods_in_lib_no").checked) {
		mui.toast("请选择涉案财物是否已入库")
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				penalloadgoods_in_lib();
			}
		})
		return false;
	}
}
// 是否涉案财物入库提交按钮
function penalloadgoods_in_lib() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var penalProcessDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(penalProcessDetails);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 第二次强制措施
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
	var btnArray = [ '是', '否' ];
	mui.confirm('确定？', '提示', btnArray, function(e) {
		if (e.index == 0) {
			penalloadsecond_punishment();
		}
	})
	return false;
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
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
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
	var btnArray = [ '是', '否' ];
	mui.confirm('确定？', '提示', btnArray, function(e) {
		if (e.index == 0) {
			penalloadchenantwo_second_punishment();
		}
	})
	return false;
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
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
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
	var btnArray = [ '是', '否' ];
	mui.confirm('确定？', '提示', btnArray, function(e) {
		if (e.index == 0) {
			penalloadprocess_lengthen_criminal_detention();
		}
	})
	return false;

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
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 改变是否涉案财物
function penalchangecase_property_yes(even) {
	var sex = document.getElementById("penalcase_property_yes");
	sex.value = '是';
	return sex.value;
}
function penalchangecase_property_no(even) {
	var sex = document.getElementById("penalcase_property_no");
	sex.value = '否';
	return sex.value;
}
function penalcase_property() {
	if (!document.getElementById("penalcase_property_yes").checked
			&& !document.getElementById("penalcase_property_no").checked) {
		mui.toast("请选择是否有涉案财物")
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				penalloadcaseDetail_case_property();
			}

		})
		return false;
	}
}
// 是否涉案财物提交按钮
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
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
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
function third_punishment_btn() {
	var btnArray = [ '是', '否' ];
	mui.confirm('确定？', '提示', btnArray, function(e) {
		if (e.index == 0) {
			penalloadthird_punishment();
		}
	})
	return false;
}
function qubao_third_punishment_btn() {
	var btnArray = [ '是', '否' ];
	mui.confirm('确定？', '提示', btnArray, function(e) {
		if (e.index == 0) {
			penalloadqubao_third_punishment();
		}
	})
	return false;
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
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
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
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/forceMeasureThreeProcessAction?ajdbxtProcess.process_case_id="
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
function fourth_punishment_btn() {
	var btnArray = [ '是', '否' ];
	mui.confirm('确定？', '提示', btnArray, function(e) {
		if (e.index == 0) {
			penalloadfourth_punishment();
		}
	})
	return false;
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
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/forceMeasureFourProcessAction?ajdbxtProcess.process_case_id="
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
function checkOne_btn() {
	var btnArray = [ '是', '否' ];
	mui.confirm('确定？', '提示', btnArray, function(e) {
		if (e.index == 0) {
			penalloadcheckOne();
		}
	})
	return false;
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
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
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
function checkTwo_btn() {
	var btnArray = [ '是', '否' ];
	mui.confirm('确定？', '提示', btnArray, function(e) {
		if (e.index == 0) {
			penalloadcheckTwo();
		}
	})
	return false;

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
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
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
function penalsuspect_summon(button) {
	if (!document.getElementById("penalsuspect_summon_yes").checked
			&& !document.getElementById("penalsuspect_summon_no").checked) {
		mui.toast("请选择是否延长传唤")
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				penalloadpenalsuspect_summon(button);
			}
		})
		return false;
	}
}
// 是否延长传唤提交按钮
function penalloadpenalsuspect_summon(button) {
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
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
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
	if (!document.getElementById("penalidentification_yes").checked
			&& !document.getElementById("penalidentification_no").checked) {
		mui.toast("请选择是否鉴定")
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				penalloadpenalidentification();
			}
		})
		return false;
	}
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
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 听证
// function penalchangehearing_applying_yes(even) {
// var sex = document.getElementById("penalhearing_applying_yes");
// sex.value = '是';
// return sex.value;
// }
// function penalchangehearing_applying_no(even) {
// var sex = document.getElementById("penalhearing_applying_no");
// sex.value ='否';
// return sex.value;
// }
// function penalhearing_applying() {
// var btnArray = [ '是', '否' ];
// mui
// .confirm(
// '确定？',
// '提示',
// btnArray,function(e) {
// if (e.index == 0){
// penalloadpenalhearing_applying();}
// })
// return false;
// }
// // 是否听证提交按钮
// function penalloadpenalhearing_applying() {
// console.log("b2");
// if (window.XMLHttpRequest) {
// xmlhttp = new XMLHttpRequest();
// } else {
// xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
// }
// var processDetails = document.getElementById("penalProcessDetails");
// var formData = new FormData(processDetails);
// xmlhttp.onreadystatechange = function() {
// console.log("c2");
// if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
// var result = xmlhttp.responseText;
// if (isContains(result,'success')) {
// get_penalProcessDetails(info_id);
// mui.toast('提交成功！');
// } else {
// mui.toast('提交失败！');
// }
// }
// };
// xmlhttp.open("post",
// "/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
// + info_id, true);
// xmlhttp.send(formData);
// }

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
	if (!document.getElementById("measure_one_one").checked
			&& !document.getElementById("measure_one_two").checked
			&& !document.getElementById("measure_one_three").checked) {
		mui.toast("请选择一种强制措施")
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				penalloadpenalmeasure_one();
			}
		})
		return false;
	}
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
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
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
	if (!document.getElementById("process_evidence_to_upload_penal_yes").checked
			&& !document.getElementById("process_evidence_to_upload_penal_no").checked) {
		mui.toast("请选择证据是否已上交")
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				penalloadprocess_evidence_to_upload_penal_but();
			}
		})
		return false;
	}
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
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 提出问题
function pencalproblem_asking() {
	if (document.getElementById("penalprocess_question_list").value == ""
			|| document.getElementById("penalprocess_question_list").value == null) {
		mui.toast("请填写提出问题数量")
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				penalloadpencalproblem_asking();
			}
		})
		return false;
	}
}
// 是否提出问题提交按钮
function penalloadpencalproblem_asking() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("penalProcessDetails");
	var question_list = document.getElementById("penalprocess_question_list").value;
	var formData = new FormData(processDetails);
	formData.append("ajdbxtProcess.process_question_list", question_list);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
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
// 第一次案卷拿回天数
function process_fileback_day_commit() {
	if (document.getElementById("process_fileback_day").value == ""
			|| document.getElementById("process_fileback_day").value == null) {
		mui.toast("请填写案卷拿回天数");
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				penalloadprocess_fileback_day();
			}
		})
		return false;
	}
}
// 第一次案卷拿回天数提交按钮
function penalloadprocess_fileback_day() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var processDetails = document.getElementById("penalProcessDetails");
	var process_fileback_day = document.getElementById("process_fileback_day").value;
	var formData = new FormData(processDetails);
	formData.append("ajdbxtProcess.process_fileback_day", process_fileback_day);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/caseFileBackProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 第一次问题整改
function pencalproblem_rectification() {
	var btnArray = [ '是', '否' ];
	mui.confirm('确定？', '提示', btnArray, function(e) {
		if (e.index == 0) {
			penalloadpencalproblem_rectification();
		}
	})
	return false;
}
// 第一次是否问题整改提交按钮
function penalloadpencalproblem_rectification() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var id_array = new Array();
	$('input[name="ajdbxtProcess.process_question"]:checked').each(function() {
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
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
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
	var btnArray = [ '是', '否' ];
	mui.confirm('确定？', '提示', btnArray, function(e) {
		if (e.index == 0) {
			penalloadpencalproblem_rectification_two();
		}
	})
	return false;
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
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateQuestionTwoProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 案卷上交天数（拘留）
function process_fileup_day_juliu_btn() {
	var btnArray = [ '是', '否' ];
	mui.confirm('确定？', '提示', btnArray, function(e) {
		if (e.index == 0) {
			penalloadprocess_fileup_day_juliu();
		}
	})
	return false;
}
// 案卷上交天数（拘留）提交按钮
function penalloadprocess_fileup_day_juliu() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var process_fileup_day_juliu = document
			.getElementById("process_fileup_day_juliu").value;
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	formData.append("ajdbxtProcess.process_fileup_day",
			process_fileup_day_juliu);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/fileUpProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 第二次强制措施案卷上交
function process_file_hand_two_but() {
	var btnArray = [ '是', '否' ];
	mui.confirm('确定？', '提示', btnArray, function(e) {
		if (e.index == 0) {
			penalloadprocess_file_hand_two_but();
		}
	})
	return false;
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
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 案卷上交天数（取保候审、监视居住）
function process_fileup_day_qubao_btn() {
	var btnArray = [ '是', '否' ];
	mui.confirm('确定？', '提示', btnArray, function(e) {
		if (e.index == 0) {
			penalloadprocess_fileup_day_qubao();
		}
	})
	return false;

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
	formData.append("ajdbxtProcess.process_fileback_day_two",
			process_fileup_day_qubao);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/caseFileBackTwoProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 第二次案卷上交（取保候审、监视居住）
function process_file_hand_two_qubao_bnt() {
	var btnArray = [ '是', '否' ];
	mui.confirm('确定？', '提示', btnArray, function(e) {
		if (e.index == 0) {
			penalloadprocess_file_hand_two_qubao_bnt();
		}
	})
	return false;
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
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 第二次证据上交，第二次强制为取保/监视
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
	var btnArray = [ '是', '否' ];
	mui.confirm('确定？', '提示', btnArray, function(e) {
		if (e.index == 0) {
			penalloadprocess_evidence_to_upload_two_two();
		}
	})
	return false;

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
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 第二次证据上交，第二次强制为逮捕
function daibu_change_penal_process_evidence_to_upload_two_yes_two(even) {
	var sex = document
			.getElementById("daibu_process_evidence_to_upload_two_penal_two_yes");
	sex.value = '是';
	return sex.value;
}
function daibu_change_penal_process_evidence_to_upload_two_no_two(even) {
	var sex = document
			.getElementById("daibu_process_evidence_to_upload_two_penal_two_no");
	sex.value = '否';
	return sex.value;
}
function daibu_process_evidence_to_upload_two_two() {
	var btnArray = [ '是', '否' ];
	mui.confirm('确定？', '提示', btnArray, function(e) {
		if (e.index == 0) {
			daibu_penalloadprocess_evidence_to_upload_two_two();
		}
	})
	return false;
}
// 第二次证据上交提交按钮
function daibu_penalloadprocess_evidence_to_upload_two_two() {
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
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 第二次法制大队提出问题
function process_question_list_two_commit() {
	if (document.getElementById("process_question_list_two").value == ""
			|| document.getElementById("process_question_list_two").value == null) {
		mui.toast("请填写问题数量")
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				penalloadprocess_question_list_two();
			}
		})
		return false;
	}
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
	formData.append("ajdbxtProcess.process_question_list_two",
			process_question_list_two);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
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
/*function process_fileback_day_two_commit() {
	if (document.getElementById("process_fileback_day_two").value == ""
			|| document.getElementById("process_fileback_day_two").value == null) {
		mui.toast("请输入案卷拿回天数")
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				penalloadprocess_fileback_day_two();
			}
		})
		return false;
	}
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
	formData.append("ajdbxtProcess.process_fileback_day_two",
			process_fileback_day_two);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/caseFileBackTwoProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}*/
// 第二次案卷拿回
function process_file_hand_two_nahui_nut() {
	var btnArray = [ '是', '否' ];
	mui.confirm('确定？', '提示', btnArray, function(e) {
		if (e.index == 0) {
			penalloadprocess_file_hand_two_nahui_nut();
		}
	})
	return false;

}
// 第二次案卷拿回提交按钮
function penalloadprocess_file_hand_two_nahui_nut() {
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var process_file_hand_penal_two_no = document
			.getElementById("process_file_hand_penal_two_no").value;
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	formData.append("ajdbxtProcess.process_file_hand_two",
			process_file_hand_penal_two_no);
	xmlhttp.onreadystatechange = function() {
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
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
	if (!document.getElementById("pencalcase_ending_yes").checked
			&& !document.getElementById("pencalcase_ending_no").checked) {
		mui.toast("请选择是否结案")
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				penalloadpencalcase_ending();
			}
		})
		return false;
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
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
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
	if (document.getElementById("pencalinput_case_score").value == ""
			|| document.getElementById("pencalinput_case_score").value == null) {
		mui.toast("请输入办案评分");
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				penalloadpencalcase_score();
			}
		})
		return false;
	}
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
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
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
	var btnArray = [ '是', '否' ];
	mui.confirm('确定？', '提示', btnArray, function(e) {
		if (e.index == 0) {
			penalloadprocess_casefile_auxiliary_bnt();
		}
	})
	return false;
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
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
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
	var btnArray = [ '是', '否' ];
	mui.confirm('确定？', '提示', btnArray, function(e) {
		if (e.index == 0) {
			penalloadpencalcasehand();
		}
	})
	return false;

}
// 是否（第一次强制措施）案件上交提交按钮
function penalloadpencalcasehand() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
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
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/fileUpProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
/*// (第一次)案卷拿回
function pencalcasehand_no() {
	var btnArray = [ '是', '否' ];
	mui.confirm('确定？', '提示', btnArray, function(e) {
		if (e.index == 0) {
			penalloadpencalcasehand_no();
		}
	})
	return false;

}
// （第一次）是否案卷拿回提交按钮
function penalloadpencalcasehand_no() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var process_file_hand_penal_one_no = document
			.getElementById("process_file_hand_penal_one_no").value;
	var processDetails = document.getElementById("penalProcessDetails");
	var formData = new FormData(processDetails);
	formData.append("ajdbxtProcess.process_file_hand",
			process_file_hand_penal_one_no);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_penalProcessDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}*/




/*-------------------------------------------------------------------------------------------------------->*/
/*-------------------------------------------------------------------------------------------------------->*/
// 行政案件流程*********************************************************************************
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
			// 单选框
			var case1 = staff_info.process;
			// 最开始隐藏“打回修改完成”
			if (case1.process_is_rollback == "是") {
				//$('#xiugaiok').show();
				btn_police_commit_visible(staff_info);
				btn_police2_commit_visible(staff_info);
				btn_police3_commit_visible(staff_info);
				btn_cap_commit_visible(staff_info);
				btn_legal_commit_visible(staff_info);
			} else {
				$('#xiugaiok').hide();
			}

			// 流程的值不为空，则对应值默认选中，另一个值不可操作————为了不可修改
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

			// 单选框 //嫌疑人
			if (case1.process_lengthen_subpoena != null
					&& case1.process_lengthen_subpoena.length > 0) {
				if ("是" == case1.process_lengthen_subpoena) {
					$('#suspect_summon_yes').attr("checked", "checked");
					if (case1.process_is_rollback != '是') {
						$("#suspect_summon_no").prop("disabled", "true");
						$("#suspect_summon_yes").prop("disabled", "true");
						$("#commitsuspect").prop("disabled", "true");
					} else {
						$("#suspect_summon_no").prop("disabled", false);
						$("#suspect_summon_yes").prop("disabled", false);
						$("#commitsuspect").prop("disabled", false);
					}
				}
				if (case1.process_lengthen_subpoena != '是') {
					$('#suspect_summon_no').attr("checked", "checked");
					if (case1.process_is_rollback != '是') {
						$("#suspect_summon_no").prop("disabled", "true");
						$("#suspect_summon_yes").prop("disabled", "true");
						$("#commitsuspect").prop("disabled", "true");
					} else {
						$("#suspect_summon_no").prop("disabled", false);
						$("#suspect_summon_yes").prop("disabled", false);
						$("#commitsuspect").prop("disabled", false);
					}
				}
			}
			// 立案
			if (case1.process_put_on_record != null
					&& case1.process_put_on_record.length > 0) {
				if ("是" == case1.process_put_on_record) {
					$('#register_yes').attr("checked", "checked");
					$("#register_no").prop("disabled", true);
				}
				if ("否" == case1.process_nonage) {
					$('#register_no').attr("checked", "checked");
					$("#register_yes").prop("disabled", true);
				}
			}
			// 鉴定
			if (case1.process_authenticate != null
					&& case1.process_authenticate.length > 0) {
				/*
				 * if("是"==case1.process_authenticate){
				 * $('#identification_yes').attr("checked","checked");
				 * $("#identification_no").prop("disabled", true); }
				 * if("否"==case1.process_authenticate){
				 * $('#identification_no').attr("checked","checked");
				 * $("#identification_yes").prop("disabled", true); }
				 */

				if ("是" == case1.process_authenticate) {
					$('#identification_yes').attr("checked", "checked");
					if (case1.process_is_rollback != '是') {
						$("#identification_no").prop("disabled", "true");
						$("#identification_yes").prop("disabled", "true");
						$("#submitidentify").prop("disabled", "true");
					} else {
						$("#identification_no").prop("disabled", false);
						$("#identification_yes").prop("disabled", false);
						$("#submitidentify").prop("disabled", false);
					}
				}
				if (case1.process_case_goods != '是') {
					$('#identification_yes').attr("checked", "checked");
					if (case1.process_is_rollback != '是') {
						$("#identification_no").prop("disabled", "true");
						$("#identification_yes").prop("disabled", "true");
						$("#submitidentify").prop("disabled", "true");
					} else {
						$("#identification_no").prop("disabled", false);
						$("#identification_yes").prop("disabled", false);
						$("#submitidentify").prop("disabled", false);
					}
				}
			}
			// 有无涉案财物
			if (case1.process_case_goods != null
					&& case1.process_case_goods.length > 0) {
				if ("是" == case1.process_case_goods) {
					$('#case_property_yes').attr("checked", "checked");
					if (case1.process_is_rollback != '是') {
						$("#case_property_no").prop("disabled", "true");
						$("#case_property_yes").prop("disabled", "true");
						$("#submitcasegoods").prop("disabled", "true");
					} else {
						// $("#case_property_no").removeProp("disabled","true");
						$("#case_property_no").prop("disabled", false);
						$("#case_property_yes").prop("disabled", false);
						$("#submitcasegoods").prop("disabled", false);
					}
				}
				if (case1.process_case_goods != '是') {
					$('#case_property_no').attr("checked", "checked");
					if (case1.process_is_rollback != '是') {
						$("#case_property_no").prop("disabled", "true");
						$("#case_property_yes").prop("disabled", "true");
						$("#submitcasegoods").prop("disabled", "true");
					} else {
						$("#case_property_no").prop("disabled", false);
						$("#case_property_yes").prop("disabled", false);
						$("#submitcasegoods").prop("disabled", false);
					}
				}
			}
			// 听证
			if (case1.process_apply_right != null
					&& case1.process_apply_right.length > 0) {
				/*
				 * if("是"==case1.process_apply_right){
				 * $('#hearing_applying_yes').attr("checked","checked");
				 * $("#hearing_applying_no").prop("disabled", true); }
				 * if("否"==case1.process_apply_right){
				 * $('#hearing_applying_no').attr("checked","checked");
				 * $("#hearing_applying_yes").prop("disabled", true); }
				 */
				if ("是" == case1.process_apply_right) {
					$('#hearing_applying_yes').attr("checked", "checked");
					if (case1.process_is_rollback != '是') {
						$("#hearing_applying_no").prop("disabled", "true");
						$("#hearing_applying_yes").prop("disabled", "true");
						$("#submithearing").prop("disabled", "true");
					} else {
						// $("#case_property_no").removeProp("disabled","true");
						$("#hearing_applying_no").prop("disabled", false);
						$("#hearing_applying_yes").prop("disabled", false);
						$("#submithearing").prop("disabled", false);
					}
				}
				if (case1.process_apply_right != '是') {
					$('#case_property_no').attr("checked", "checked");
					if (case1.process_is_rollback != '是') {
						$("#hearing_applying_no").prop("disabled", "true");
						$("#hearing_applying_yes").prop("disabled", "true");
						$("#submithearing").prop("disabled", "true");
					} else {
						// $("#case_property_no").removeProp("disabled","true");
						$("#hearing_applying_no").prop("disabled", false);
						$("#hearing_applying_yes").prop("disabled", false);
						$("#submithearing").prop("disabled", false);
					}
				}
			}
			// 打回案件
			if (case1.process_is_rollback != null
					&& case1.process_is_rollback.length > 0) {
				if ("是" == case1.process_is_rollback) {
					$("#rollback_yes").attr("checked", "checked");
					$("#rollback_no").prop("disabled", true);
					$("#rollback_commit").prop("disabled", false);
				}
				if ("否" == case1.process_is_rollback) {
					$("#rollback_no").attr("checked", "checked");
					$("#rollback_yes").prop("disabled", true);
					$("#rollback_commit").prop("disabled", true);
				} else {
					$("#rollback_yes").prop("disabled", true);
					$("#rollback_no").prop("disabled", true);
					$("#rollback_commit").prop("disabled", true);
				}
			}
			// 戒毒
			// if(case1.process_treatment_category!=null &&
			// case1.process_treatment_category.length>0){
			// if($('#process_treatment_category_yes').val()==case1.process_treatment_category){
			// $('#process_treatment_category_yes').attr("checked","checked");
			// $("#process_treatment_category_no").prop("disabled", true);
			// }else{
			// $('#process_treatment_category_no').attr("checked","checked");
			// $("#process_treatment_category_yes").prop("disabled", true);
			// }
			// }

			// 提出问题输入框
			if (case1.process_question_list != null
					&& case1.process_question_list != "") {
				/*
				 * if($('#process_question_list').value()==case1.process_question_list){
				 * $('#problem_asking_yes').attr("checked","checked");
				 * $("#problem_asking_no").prop("disabled", true); }else{
				 * $('#problem_asking_no').attr("checked","checked");
				 * $("#problem_asking_yes").prop("disabled", true); }
				 */
				$("#process_question_list").prop("disabled", true);
				$("#askproblemcommit").prop("disabled", true);
			}
			
			checkbox_process_question(case1);
			
			// 问题整改数量
			if (case1.process_question != null && case1.process_question != "") {
				$('#problemchangecommit').prop("disabled", true);
				for (i = 1; i <= case1.process_question_list; i++) {
					$('#question' + i).prop("disabled", true);
					// 问题整改中包含此字符,被选中
					if (case1.process_question.indexOf(i) != -1) {
						$('#question' + i).attr("checked","checked");
					}
				}
			}
			
			// 处罚
			if (case1.process_detention == "是") {
				$('process_detention').attr("checked", "checked");
				$("#punishcommit").prop("disabled", true);
			}
			if (case1.process_penalty == "是") {
				$('process_penalty').attr("checked", "checked");
				$("#punishcommit").prop("disabled", true);
			}
			if (case1.process_mandatory_abandon_drug == "是") {
				$('process_mandatory_abandon_drug').attr("checked", "checked");
				$("#punishcommit").prop("disabled", true);
			}
			if (case1.process_community_abandon_drug == "是") {
				$('process_community_abandon_drug').attr("checked", "checked");
				$("#punishcommit").prop("disabled", true);
			}
			if (case1.process_other == "是") {
				$('process_other').attr("checked", "checked");
				$("#punishcommit").prop("disabled", true);
			}
			if (case1.process_administrativ_warning == "是") {
				$('process_administrativ_warning').attr("checked", "checked");
				$("#punishcommit").prop("disabled", true);
			}
			// 审核
			if (case1.process_captain_check != null
					&& case1.process_captain_check.length > 0) {
				$("#captaincommit").prop("disabled", true);
				$("#case_review_yes").prop("disabled", true);
				$("#case_review_no").prop("disabled", true);
				if ("是" == case1.process_captain_check) {
					$('#case_review_yes').attr("checked", "checked");
				} if ("否" == case1.process_captain_check) {
					$('#case_review_no').attr("checked", "checked");
				}
			}
			// 涉案财物已入库
			if (case1.process_goods_in_lib != null
					&& case1.process_goods_in_lib.length > 0) {
				$("#rukucommit").prop("disabled", true);
				$("#case_ruku_yes").prop("disabled", true);
				$("#case_ruku_yes").prop("disabled", true);
				if ("是" == case1.process_goods_in_lib) {
					$('#case_ruku_yes').attr("checked", "checked");
				}if ("否" == case1.process_goods_in_lib) {
					$('#case_ruku_no').attr("checked", "checked");
				}
			}
			// 证据上传
			if (case1.process_evidence_to_upload_affirm != null
					&& case1.process_evidence_to_upload_affirm.length > 0) {
				$("#evidencecommit").prop("disabled", true);
				$("#evidence_yes").prop("disabled", true);
				$("#evidence_no").prop("disabled", true);
				if ("是" == case1.process_evidence_to_upload_affirm) {
					$('#evidence_yes').attr("checked", "checked");
				}if ("否" == case1.process_evidence_to_upload_affirm) {
					$('#evidence_no').attr("checked", "checked");
				}
			}
			// 问题整改
			/*
			 * if(case1.process_question!=null &&
			 * case1.process_question.length>0){
			 * if($('#problem_rectification_yes').val()==case1.process_question){
			 * $('#problem_rectification_yes').attr("checked","checked");
			 * $("#problem_rectification_no").prop("disabled", true); }else{
			 * $('#problem_rectification_no').attr("checked","checked");
			 * $("#problem_rectification_yes").prop("disabled", true); } }
			 */
			// 结案
			if (case1.process_case_end != null
					&& case1.process_case_end.length > 0) {
				$("#caseendcommit").prop("disabled", true);
				$("#case_ending_no").prop("disabled", true);
				$("#case_ending_yes").prop("disabled", true);
				if ("是" == case1.process_case_end) {
					$('#case_ending_yes').attr("checked", "checked");
				} if ("是" == case1.process_case_end) {
					$('#case_ending_no').attr("checked", "checked");
				}
			}
			// 评分
			if (case1.process_score != null && case1.process_score != "") {
				$("#input_case_score").prop("disabled", true);
				$("#scorecommit").prop("disabled", true);
			}

			management(case1);// 根据有无涉案财物判断是否显示”涉案财物已入库“
//			checkbox_process_question(case1); // 根据提出问题自动生成问题整改的复选框
//			process_question_out(case1);// 问题整改勾选上
			case_xingzhen_hand_button(case1);// 案卷上交是否判断对勾的显示
		}

	}
	xmlhttp.open("post", url, true);
	xmlhttp.send();
}

// 根据有无涉案财物判断是否显示”涉案财物已入库“
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
	// 判断选择是否为空
	if (!document.getElementById("suspect_summon_yes").checked
			&& !document.getElementById("suspect_summon_no").checked) {
		mui.toast('请选择是否延长传唤！');
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定提交？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				loadcaseDetail_suspect_summon(button);
			}
		})
		return false;
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

		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_processDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}
// 改变是否立案
function changeregister_yes(even) {
	var sex = document.getElementById("register_yes");
	sex.value = '是';
	return sex.value;
}
function changeregister_no(even) {
	var sex = document.getElementById("register_no");
	sex.value = '否';
	return sex.value;
}
// CaseDetails.jsp中的是否立案提交
function register() {
	// 判断是否选择
	if (!document.getElementById("register_yes").checked&& !document.getElementById("register_no").checked) {
		mui.toast('请选择立案！');
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定提交？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				loadcaseregister();
			}
		})
		return false;
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
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_processDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/putOnRecordProcessAction?ajdbxtProcess.process_case_id="
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
	// 判断选择是否为空
	if (!document.getElementById("identification_yes").checked
			&& !document.getElementById("identification_no").checked) {
		mui.toast('请选择是否鉴定！');
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				loadcaseidentification();
			}
		})
		return false;
	}
}
// 是否鉴定提交按钮
function loadcaseidentification() {
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
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
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
	// 判断选择是否为空
	if (!document.getElementById("case_property_yes").checked
			&& !document.getElementById("case_property_no").checked) {
		mui.toast('请选择是否有涉案财物！');
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				loadcaseDetail_case_property();
			}
		})
		return false;
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
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_processDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/goodsLibProcessAction?ajdbxtProcess.process_case_id="
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
	// 判断选择是否为空
	if (!document.getElementById("hearing_applying_yes").checked
			&& !document.getElementById("hearing_applying_no").checked) {
		mui.toast('请选择是否听证申请！');
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				loadcaseDetail_hearing_applying();
			}
		})
		return false;
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
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 改变是否打回
/*function changerollback_yes(even) {
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
	// 判断选择是否为空
	if (!document.getElementById("rollback_yes").checked
			&& !document.getElementById("rollback_no").checked) {
		mui.toast('请选择是否打回！');
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				loadcaseDetail_process_rollback();
			}
		})
		return false;
	}
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
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_processDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp
			.open(
					"post",
					"/ajdbxt/process/updateRollbackUpdateProcessAction?ajdbxtProcess.process_case_id="
							+ info_id, true);
	xmlhttp.send(formData);
}*/
// CaseDetails.jsp中的是否提出问题提交
function problem_asking() {
	// 判断是否填写数量
	if (document.getElementById("process_question_list").value == ""
			|| document.getElementById("process_question_list").value == null) {
		mui.toast('请填写问题数量！');
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				loadcaseDetail_problem_asking();
			}
		})
		return false;
	}
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
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
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
	// 判断选择是否为空
	if (!document.getElementById("case_review_yes").checked
			&& !document.getElementById("case_review_no").checked) {
		mui.toast('请选择是否审核！');
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				loadcaseDetail_case_review();
			}
		})
		return false;
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
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_processDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 问题整改数量提交
function problem_rectification() {
	var btnArray = [ '是', '否' ];
	mui.confirm('确定？', '提示', btnArray, function(e) {
		if (e.index == 0) {
			loadcaseDetail_problem_rectification();
		}
	})
	return false;
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
	var problems = document.getElementsByName("ajdbxtProcess.process_question");
	var flag = false;
	var idstr;
	// 判断勾选问题整改数量是否为空，wei空则转入空串
	for (var i = 0; i < problems.length; i++) {
		if (problems[i].checked) {
			flag = true;
			break;
		}
	}
	if (!flag) {
		idstr = "0";
	} else {
		$('input[name="ajdbxtProcess.process_question"]:checked').each(function() {
			id_array.push($(this).val());// 向数组中添加元素
		});
		idstr = id_array.join(',');// 将数组元素连接起来以构建一个字符串
	}
	var formData = new FormData();
	formData.append("ajdbxtProcess.process_question", idstr);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_processDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
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
	// 判断选择是否为空
	if (!document.getElementById("case_ending_yes").checked
			&& !document.getElementById("case_ending_no").checked) {
		mui.toast('请选择是否结案！');
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				loadcaseDetail_case_ending();
			}
		})
		return false;
	}
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
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/caseEndProcessAction?ajdbxtProcess.process_case_id="
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
	if (checked.length == 0) {
		mui.toast('请至少选择一项处罚！');
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				loadcaseDetail_punishmentab();
			}
		})
		return false;
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
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
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
	// 判断选择是否为空
	if (!document.getElementById("evidence_yes").checked
			&& !document.getElementById("evidence_no").checked) {
		mui.toast('请选择是否上传证据！');
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				loadcasecase_evidence();
			}
		})
		return false;
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
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 评分
function case_score() {
	if (document.getElementById("input_case_score").value == "") {
		mui.toast('请填写分数！');
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				loadcaseDetail_case_score();
			}
		})
		return false;
	}
}
// 评分按钮
function loadcaseDetail_case_score() {
	var xmlhtpp;
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
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_processDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/updateProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 确认案卷上交按钮
function process_file_hand() {
	var btnArray = [ '是', '否' ];
	mui.confirm('确定？', '提示', btnArray, function(e) {
		if (e.index == 0) {
			loadcaseDetail_process_file_hand();
		}
	})
	return false;

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
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp.open("post",
			"/ajdbxt/process/fileUpProcessAction?ajdbxtProcess.process_case_id="
					+ info_id, true);
	xmlhttp.send(formData);
}

// 确认打回修改完成按钮
/*function process_is_rollback_ok() {
	var btnArray = [ '是', '否' ];
	mui.confirm('确定？', '提示', btnArray, function(e) {
		if (e.index == 0) {
			loadcaseDetail_process_is_rollback_ok();
		}
	})
	return false;

}
function loadcaseDetail_process_is_rollback_ok() {
	// console.log("b2");
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
		// console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_processDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
			}
		}
	};
	xmlhttp
			.open(
					"post",
					"/ajdbxt/process/updateRollbackOverProcessAction?ajdbxtProcess.process_case_id="
							+ info_id, true);
	xmlhttp.send(formData);
}*/
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
	// 判断选择是否为空
	if (!document.getElementById("case_ruku_yes").checked
			&& !document.getElementById("case_ruku_no").checked) {
		mui.toast('请选择是否结案！');
	} else {
		var btnArray = [ '是', '否' ];
		mui.confirm('确定？', '提示', btnArray, function(e) {
			if (e.index == 0) {
				loadcase_ruku();
			}
		})
		return false;
	}
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
		console.log("c2");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (isContains(result, 'success')) {
				get_processDetails(info_id);
				mui.toast('提交成功！');
			} else {
				mui.toast('提交失败！');
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
	if (case1.process_question_list != null) {
		var question_list = case1.process_question_list;
		var executerDiv = $("#checkbox_process_question");
		executerDiv.innerHTML = "";
		var box_value = "";
		var str = '<form class="mui-input-group">';
		for (var i = 0; i < question_list; i++) {
			box_value = i + 1;
			str += '<div class="mui-input-row mui-checkbox mui-left"><label>'
					+ box_value
					+ '</label><input type="checkbox" id="question'
					+ (i + 1) + '" name="ajdbxtProcess.process_question" value="'
					+ box_value + '"/></div>';
		}
		str += '</form>';
		$("#checkbox_process_question").html(str);
	}
	///////////
	/*var question_list = case1.process_question_list;
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
	$("#checkbox_process_question").html(ul);*/
}

// 问题整改复选框选中
/*function process_question_out(case1) {
	// 判断process_question是否存在
	if ('process_question' in case1) {
		var question_updata = ajdbxtProcess.process_question;
		question_one = question_updata.split(",");
		$('input[name="ajdbxtProcess.process_question"]').each(function() {
			// id_array.push($(this).val());//向数组中添加元素
			if ($.inArray($(this).val(), question_one) != -1) {
				$(this).prop("checked", "checked");
			}
		});
	}
}*/
// 刑事案件第一次问题整改自动生成************************
function checkbox_process_question_penal_one(case1) {
	if (case1.process_question_list != null) {
		var question_list = case1.process_question_list;
		var executerDiv = $("#checkbox_process_question_penal_one");
		executerDiv.innerHTML = "";
		var box_value = "";
		var str = '<form class="mui-input-group">';
		for (var i = 0; i < question_list; i++) {
			box_value = i + 1;
			str += '<div class="mui-input-row mui-checkbox mui-left"><label>'
					+ box_value
					+ '</label><input type="checkbox" id="process_question'
					+ (i + 1) + '" name="ajdbxtProcess.process_question" value="'
					+ box_value + '"/></div>';
		}
		str += '</form>';
		$("#checkbox_process_question_penal_one").html(str);
	}
}
// 刑事案件第二次问题整改自动生成************************
function checkbox_process_question_penal_two(case1) {
	if (case1.process_question_list_two != null) {
		var question_list_two = case1.process_question_list_two;
		var executerDiv = $("#checkbox_process_question_penal_two");
		console.log("question_list_two:" + question_list_two);
		executerDiv.innerHTML = "";
		var box_value = "";
		var str = '<form class="mui-input-group">';
		for (var i = 0; i < question_list_two; i++) {
			box_value = i + 1;
			str += '<div class="mui-input-row mui-checkbox mui-left"><label>'
					+ box_value
					+ '</label><input type="checkbox" id="process_question_two'
					+ (i + 1) + '" name="case1.process_question_two" value="'
					+ box_value + '"/></div>';
		}
		str += '</form>';
		$("#checkbox_process_question_penal_two").html(str);
	}
}
// 刑事案件第二次问题整改复选框选中
/*function process_question_out_penal_two(case1) {
	if ('process_question_two' in case1) {
		var question_updata_two = case1.process_question_two;
		question_one = question_updata_two.split(",");
		$('input[name="case1.process_question_two"]').each(function() {
			// id_array.push($(this).val());//向数组中添加元素
			if ($.inArray($(this).val(), question_one) != -1) {
				$(this).prop("checked", "checked");
			}
		});
	}
}*/
