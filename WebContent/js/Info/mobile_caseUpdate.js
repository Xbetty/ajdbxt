window.onload = function() {
	var url = window.location.href;
	info_id = url.substring(url.indexOf("=") + 1);
	get_caseDetails(info_id);
}
//每次变更办案单位后清除上一次指派的人员
function clearPolicesLast() {
	if ($('#input_info_main_police').val() != '') {
		$('#input_info_main_police').val('');
		$('#input_info_main_police').html('');
		$('#input_info_assistant_police_one').val('');
		$('#input_info_assistant_police_one').html('');
		$('#input_info_assistant_police_two').val('');
		$('#input_info_assistant_police_two').html('');
		$('#info_info_department_legal_member_name').val('');
		$('#info_department_captain_name').val('');
		hideSecondPolice();
	}
}
//隐藏协办民警2
function hideSecondPolice() {
	$("#police_two_td").hide();
	$("#add_img").show();
}
//显示协办民警2
function showSecondPolice() {
	$("#police_two_td").show();
	$("#add_img").hide();
}
// 案件信息
function get_caseDetails(info_id) {
	var update_police_vo = null;
	var update_xhr = new XMLHttpRequest();
	update_xhr.open("POST",
			"/ajdbxt/info/Info_getSingleInfo?info.ajdbxt_info_id=" + info_id);
	update_xhr.send(null);
	update_xhr.onreadystatechange = function() {
		if (update_xhr.readyState == 4) {
			if (update_xhr.status == 200) {
				update_police_vo = JSON.parse(update_xhr.responseText);
				console.log("xhr.readyState:" + update_xhr.readyState);
				console.log("xhr.status:" + update_xhr.status);
				// Id
				var input_ajdbxt_info_id = document
						.getElementById("input_ajdbxt_info_id");
				input_ajdbxt_info_id.value = update_police_vo.info.ajdbxt_info_id;

				// 案件名称
				var input_info_name = document
						.getElementById("input_info_name");
				input_info_name.value = update_police_vo.info.info_name;

				// 抓获时间
				var input_info_catch_time = document
						.getElementById("input_info_catch_time");
				input_info_catch_time.value = update_police_vo.info.info_catch_time;
				// 未成年人
				/*var input_info_nonage = document
						.getElementById("input_info_nonage");
				input_info_nonage.value = update_police_vo.info.info_nonage;*/
				// 办案单位
				var option = '';
				var deparment = update_police_vo.department.department_name;
				// 法制大队值班民警
				var option5 = '';
				var info_legal_team_member = update_police_vo.legal.police_name;
				// 值班局领导
				var option6 = '';
				var info_bureau_leader = update_police_vo.leader.police_name;

				$
						.post(
								'/ajdbxt/info/Info_lal',
								function(update_data) {
									// 所有办案单位循环
									for (var len = 0; len < update_data.departments.length; len++) {
										if (update_data.departments[len].department_name !== "公安局"
											&& update_data.departments[len].department_name !== "法制大队"){
										option += '<option ';
										if (update_data.departments[len].department_name == deparment) {
											option += 'selected';
										}
										option += ' value="'
												+ update_data.departments[len].ajdbxt_department_id
												+ '">'
												+ update_data.departments[len].department_name
												+ '</option>';
									}
									}
									$('#input_info_department').html(option);

									// 所有法制大队值班民警循环
									if (null == info_legal_team_member) {
										option5 += '<option selected value=""></option>'
									}
									for (var len = 0; len < update_data.legals.length; len++) {
										option5 += '<option ';
										if (update_data.legals[len].police_name == info_legal_team_member) {
											option5 += 'selected';
										}
										option5 += ' value="'
												+ update_data.legals[len].ajdbxt_police_id
												+ '">'
												+ update_data.legals[len].police_name
												+ '</option>';
									}
									$('#input_info_legal_team_member').html(
											option5);
									// 所有值班局领导循环
									if (null == info_bureau_leader) {
										option6 += '<option selected value=""></option>'
									}
									for (var len = 0; len < update_data.leaders.length; len++) {
										option6 += '<option ';
										if (update_data.leaders[len].police_name == info_bureau_leader) {
											option6 += 'selected';
										}
										option6 += ' value="'
												+ update_data.leaders[len].ajdbxt_police_id
												+ '">'
												+ update_data.leaders[len].police_name
												+ '</option>';
									}
									$('#input_info_bureau_leader')
											.html(option6);
								}, 'json');

				// 主办民警
				var option1 = '';
				var info_main_police = update_police_vo.info.info_main_police;
				// 协办民警1
				var option2 = '';
				var info_assistant_police_one = update_police_vo.info.info_assistant_police_one;
				// 协办民警2
				var option3 = '';
				var info_assistant_police_two = update_police_vo.info.info_assistant_police_two;
				$
						.post(
								'/ajdbxt/info/Info_getPolices',
								{
									"info.info_department" : update_police_vo.info.info_department
								},
								function(update_police_data) {
									// 所有主办民警循环
									for (var len = 0; len < update_police_data.length; len++) {
										option1 += '<option ';
										if (update_police_data[len].ajdbxt_police_id == info_main_police) {
											option1 += 'selected';
										}
										option1 += ' value="'
												+ update_police_data[len].ajdbxt_police_id
												+ '">'
												+ update_police_data[len].police_name
												+ '</option>';
									}
									$('#input_info_main_police').html(option1);
									// 所有协办民警1循环
									for (var len = 0; len < update_police_data.length; len++) {
										option2 += '<option ';
										if (update_police_data[len].ajdbxt_police_id == info_assistant_police_one) {
											option2 += 'selected';
										}
										option2 += ' value="'
												+ update_police_data[len].ajdbxt_police_id
												+ '">'
												+ update_police_data[len].police_name
												+ '</option>';
									}
									$('#input_info_assistant_police_one').html(
											option2);
									// 所有协办民警2循环
									if (null == info_assistant_police_two||""==info_assistant_police_two) {
									hideSecondPolice();
								}else{
									showSecondPolice();
								}
									option3 +='<option value="">无</option>';
									for (var len = 0; len < update_police_data.length; len++) {
										
										option3 += '<option ';
										if (update_police_data[len].ajdbxt_police_id == info_assistant_police_two) {
											option3 += 'selected';
										}
										option3 += ' value="'
												+ update_police_data[len].ajdbxt_police_id
												+ '">'
												+ update_police_data[len].police_name
												+ '</option>';
									}
									$('#input_info_assistant_police_two').html(
											option3);
								}, 'json');

				// 所（队）法制员
				var info_info_department_legal_member_name = document
						.getElementById("info_info_department_legal_member_name");
				info_info_department_legal_member_name.value = update_police_vo.team_legal.police_name;
				var info_info_department_legal_member_id = document
						.getElementById("info_info_department_legal_member_id");
				info_info_department_legal_member_id.value = update_police_vo.team_legal.ajdbxt_police_id;
				// 所（队）长
				var info_department_captain_name = document
						.getElementById("info_department_captain_name");
				info_department_captain_name.value = update_police_vo.cap.police_name;
				var info_department_captain_id = document
						.getElementById("info_department_captain_id");
				info_department_captain_id.value = update_police_vo.cap.ajdbxt_police_id;
				// 案件类别
				var input_info_category = document
						.getElementById("input_info_category");
				input_info_category.value = update_police_vo.info.info_category;
				// 通知局长、政委
				var info_inform_leaders_yes = document
						.getElementById("info_inform_leaders_yes");
				info_inform_leaders_yes.value = update_police_vo.info.info_inform_leaders;
				if (info_inform_leaders_yes.value == "是") {
					$('#info_inform_leaders_yes').attr("checked", "checked");
				}
				// 特殊案件
				var info_special_case_yes = document
						.getElementById("info_special_case_yes");
				info_special_case_yes.value = update_police_vo.info.info_special_case;
				if (info_special_case_yes.value == "是") {
					$('#info_special_case_yes').attr("checked", "checked");
				}
				// 特殊人员
				var input_info_special_person = document
						.getElementById("input_info_special_person");
				input_info_special_person.value = update_police_vo.info.info_special_case;
			}
		}
	}
}
//修改案件指派民警2
function updateArrayPoliceTwo() {
	console.log("修改的指派");
	var formData=new FormData();
	// 办案单位
	var input_info_department = document
	.getElementById("input_info_department").value;
	// 主办民警
	var input_info_main_police = document
			.getElementById("input_info_main_police").value;
	// 协办民警1
	var input_info_assistant_police_one = document
			.getElementById("input_info_assistant_police_one").value;

	formData.append("info.info_department", input_info_department);
	// 办案单位
	formData.append("info.info_main_police", input_info_main_police);
	// 协办民警1
	formData.append("info.info_assistant_police_one",
			input_info_assistant_police_one);
	var xhr = false;
	xhr = new XMLHttpRequest();
	xhr.open("POST", "/ajdbxt/info/Info_getPoliceTwo");
	xhr.send(formData);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var Case_data_assistant_two=JSON.parse(xhr.responseText);
					var xhr_police_two = false;
					var formData_police_two=new FormData();
					// 办案单位
					var input_info_department = document
					.getElementById("input_info_department").value;	
					formData_police_two.append("info.info_department", input_info_department);
					xhr_police_two = new XMLHttpRequest();
					xhr_police_two.open("POST", "/ajdbxt/info/Info_getPolices");
					xhr_police_two.send(formData_police_two);
					xhr_police_two.onreadystatechange = function() {
						if (xhr_police_two.readyState == 4) {
							if (xhr_police_two.status == 200) {
								var Case_data=JSON.parse(xhr_police_two.responseText);
									// 所有案件循环
									var option = '';
										showSecondPolice();
										option +='<option value="">无</option>';
									for (var len = 0; len < Case_data.length; len++) {
										option += '<option';
										console.log(Case_data_assistant_two.police[2].ajdbxt_police_id);
										console.log(Case_data[len].ajdbxt_police_id);
										if (Case_data_assistant_two.police[2].ajdbxt_police_id == Case_data[len].ajdbxt_police_id) {
											option += ' selected';
										}
										option += ' value="'
												+ Case_data[len].ajdbxt_police_id
												+ '">'
												+ Case_data[len].police_name
												+ '</option>';
									}
									$("#input_info_assistant_police_two").html(
													option);
							} 
						}
					}
				
			} 
		}
	}
	//显示协办民警2
	showSecondPolice();
}
//修改案件指派主办民警、协办民警1、所队长
function updateArray() {
	var input_ajdbxt_info_id = document.getElementById("input_ajdbxt_info_id").value;
	// 案件名称
	var input_info_name = document.getElementById("input_info_name").value;
	// 案件类别
	var input_info_category = document.getElementById("input_info_category").value;
	// 办案单位
	var input_info_department = document
			.getElementById("input_info_department").value;
	// 未成年人
//	var input_info_nonage = document.getElementById("input_info_nonage").value;
	// 抓获时间
	 var input_info_catch_time =
	 document.getElementById("input_info_catch_time").value;
	// 主办民警
	var input_info_main_police = document
			.getElementById("input_info_main_police").value;
	// 协办民警1
	var input_info_assistant_police_one = document
			.getElementById("input_info_assistant_police_one").value;

	// 协办民警2
	var input_info_assistant_police_two = document
			.getElementById("input_info_assistant_police_two").value;

	// 所（队）法制员
	var info_info_department_legal_member_id = document
			.getElementById("info_info_department_legal_member_id").value;
	// 所（队）长
	var info_department_captain_id = document
			.getElementById("info_department_captain_id").value;
	// 法制大队值班民警
	var input_info_legal_team_member = document
			.getElementById("input_info_legal_team_member").value;
	// 值班局领导
	var input_info_bureau_leader = document
			.getElementById("input_info_bureau_leader").value;
	// 通知局长、政委
	var info_inform_leaders_yes = '否'
	// 特殊案件
	var info_special_case_yes ='否';
	// 特殊人员
	var input_info_special_person = document.getElementById("input_info_special_person").value;
	
	var formData = new FormData();

	// id
	formData.append("info.ajdbxt_info_id", input_ajdbxt_info_id);
	// 案件名称
	formData.append("info.info_name", input_info_name);
	// 案件类别
	formData.append("info.info_category", input_info_category);
	// 办案单位
	formData.append("info.info_department", input_info_department);
	// 抓获时间
	 formData.append("info.info_catch_time", input_info_catch_time);
	// 未成年人
//	formData.append("info.info_nonage", input_info_nonage);
	// 主办民警
	formData.append("info.info_main_police", input_info_main_police);
	// 协办民警1
	formData.append("info.info_assistant_police_one",
			input_info_assistant_police_one);
	// 协办民警2
	formData.append("info.info_assistant_police_two",
			input_info_assistant_police_two);
	// 所（队）法制员
	formData.append("info.info_department_legal_member",
			info_info_department_legal_member_id);
	// 所（队）长
	formData.append("info.info_department_captain", info_department_captain_id);
	// 法制大队值班民警
	formData
			.append("info.info_legal_team_member", input_info_legal_team_member);
	// 值班局领导
	formData.append("info.info_bureau_leader", input_info_bureau_leader);
	// 通知局长、政委
	formData.append("info.info_inform_leaders", info_inform_leaders_yes);
	// 特殊案件
	formData.append("info.info_specail_case", info_special_case_yes);
	// 特殊人员
	formData.append("info.info_specail_person", input_info_special_person);
	
	// 判断该单位是否有法制员
	console.log("修改指派");
	var xmlRequest = new XMLHttpRequest();
	var formDataFzy = new FormData();
	formDataFzy.append("police_department", $(
			"#input_info_department").val());
	xmlRequest.open("POST", "/ajdbxt/user/User_haveFazhiyuan");
	xmlRequest.send(formDataFzy);
	xmlRequest.onreadystatechange = function() {
		if (xmlRequest.readyState == 4
				&& xmlRequest.status == 200) {
			var checkFzy = JSON.parse(xmlRequest.responseText);
			console.log("单位：" + $("#input_info_department").val()
					+ ":是否有法制员" + checkFzy);
			if (checkFzy == true) {
				// 判断该单位是否有所队长
				var xmlRequest_sdz = new XMLHttpRequest();
				var formDataSdz = new FormData();
				formDataSdz.append("police_department", $(
						"#input_info_department").val());
				xmlRequest_sdz.open("POST",
						"/ajdbxt/user/User_haveChief");
				xmlRequest_sdz.send(formDataSdz);
				xmlRequest_sdz.onreadystatechange = function() {
					if (xmlRequest_sdz.readyState == 4
							&& xmlRequest_sdz.status == 200) {
						var checkSdz = JSON
								.parse(xmlRequest_sdz.responseText);
						console.log("单位：" + $("#input_info_department").val()
								+ ":是否有所队长" + checkSdz);
						if (checkSdz == false) {
							clearPolicesLast();
							mui.alert('该单位无所队长，不能添加案件!');
							return false;
						}else{
										console.log("修改指派");
										hideSecondPolice();
										clearPolicesLast();
										
										
										var xhr = false;
										xhr = new XMLHttpRequest();

										xhr.open("POST", "/ajdbxt/info/Info_save");
										xhr.send(formData);
										xhr.onreadystatechange = function() {
											if (xhr.readyState == 4) {
												if (xhr.status == 200) {
													var Case_data=JSON.parse(xhr.responseText);
													// 所队长
													$('#info_department_captain_name').val(Case_data.cap.police_name);
													$('#info_department_captain_id').val(Case_data.cap.ajdbxt_police_id);
													// 所（队）法制员
													$('#info_info_department_legal_member_name').val(Case_data.team_legal.police_name);
													$('#info_info_department_legal_member_id').val(
															Case_data.team_legal.ajdbxt_police_id);
													//指派主办民警和协办民警
													$
													.post(
															'/ajdbxt/info/Info_getPolices',
															{
																"info.info_department" : $("#input_info_department").val()
															},
															function(
																	Case_data_police) {
																// 除去加载提示
																$('.load_remind').remove();
																//主办民警
																var option_main_police = '';
																for (var len = 0; len < Case_data_police.length; len++) {
																	option_main_police += '<option';
																	if (Case_data.police[0].ajdbxt_police_id == Case_data_police[len].ajdbxt_police_id) {
																		option_main_police += ' selected';
																	}
																	option_main_police += ' value="'
																			+ Case_data_police[len].ajdbxt_police_id
																			+ '">'
																			+ Case_data_police[len].police_name
																			+ '</option>';
																}
																$("#input_info_main_police").html(
																		option_main_police);
																//协办民警1
																var option_assistant_one = '';
																for (var len = 0; len < Case_data_police.length; len++) {
																	option_assistant_one += '<option';
																	if (Case_data.police[1].ajdbxt_police_id == Case_data_police[len].ajdbxt_police_id) {
																		option_assistant_one += ' selected';
																	}
																	option_assistant_one += ' value="'
																			+ Case_data_police[len].ajdbxt_police_id
																			+ '">'
																			+ Case_data_police[len].police_name
																			+ '</option>';
																}
																$("#input_info_assistant_police_one").html(
																		option_assistant_one);
																
															}, 'json');
												} 
											}
										}
										

								}
							}
						}
					
				
			} else {
				clearPolicesLast();
				mui.alert('该单位无法制员，不能添加案件!');
				return false;
			}
		}
	}
	
}

// 修改案件
function updateCase() {
	console.log("a");
	var input_ajdbxt_info_id = document.getElementById("input_ajdbxt_info_id").value;
	// 案件名称
	var input_info_name = document.getElementById("input_info_name").value;

	if (input_info_name == "") {
		mui.toast("案件名称不能为空！");
		return false;
	}
	// 案件类别
	var input_info_category = document.getElementById("input_info_category").value;
	if (input_info_category == "") {
		mui.toast("案件类别不能为空！");
		return false;
	}
	// 办案单位
	var input_info_department = document
			.getElementById("input_info_department").value;
	if (input_info_department == "") {
		mui.toast("办案单位不能为空！");
		return false;
	}

	// 未成年人
	/*var input_info_nonage = document.getElementById("input_info_nonage").value;
	if (input_info_nonage == "") {
		mui.toast("未成年人不能为空！");
		return false;
	}*/
	// 抓获时间
	 var input_info_catch_time =
	 document.getElementById("input_info_catch_time").value;
	 if (input_info_catch_time == "") {
	 mui.toast("抓获时间不能为空！");
	 return false;
 }
	// 主办民警
	var input_info_main_police = document
			.getElementById("input_info_main_police").value;
	if (input_info_main_police == "") {
		mui.toast("请选择主办民警！");
		return false;
	}
	// 协办民警1
	var input_info_assistant_police_one = document
			.getElementById("input_info_assistant_police_one").value;
	if (input_info_assistant_police_one == "") {
		mui.toast("主办民警不能为空！");
		return false;
	}

	// 协办民警2
	var input_info_assistant_police_two = document
			.getElementById("input_info_assistant_police_two").value;

	// 所（队）法制员
	var info_info_department_legal_member_id = document
			.getElementById("info_info_department_legal_member_id").value;
	if (info_info_department_legal_member_id == "") {
		mui.toast("所（队）法制员不能为空！");
		return false;
	}

	// 所（队）长
	var info_department_captain_id = document
			.getElementById("info_department_captain_id").value;
	if (info_department_captain_id == "") {
		mui.toast("所（队）长不能为空！");
		return false;
	}

	// 法制大队值班民警
	var input_info_legal_team_member = document
			.getElementById("input_info_legal_team_member").value;
	if (input_info_legal_team_member == "") {
		mui.toast("请选择法制大队值班民警！");
		return false;
	}
	// 值班局领导
	var input_info_bureau_leader = document
			.getElementById("input_info_bureau_leader").value;
	if (input_info_bureau_leader == "") {
		mui.toast("请选择值班局领导！");
		return false;
	}
	// 通知局长、政委
	var info_inform_leaders_yes = '否'
	if ($('#info_inform_leaders_yes').is(':checked')) {
		info_inform_leaders_yes = '是'
		return false;
	}
	// 特殊案件
	var info_special_case_yes = '否'
	if ($('#info_special_case_yes').is(':checked')) {
		info_special_case_yes = '是'
		return false;
	}
	// 特殊人员
	var input_info_special_person = document.getElementById("input_info_special_person").value;
	if (input_info_special_person == "") {
		mui.toast("案件类别不能为空！");
		return false;
	}
	
	var formData = new FormData();

	// id
	formData.append("info.ajdbxt_info_id", input_ajdbxt_info_id);
	// 案件名称
	formData.append("info.info_name", input_info_name);
	// 案件类别
	formData.append("info.info_category", input_info_category);
	// 办案单位
	formData.append("info.info_department", input_info_department);
	// 抓获时间
	 formData.append("info.info_catch_time", input_info_catch_time);
	// 未成年人
//	formData.append("info.info_nonage", input_info_nonage);
	// 主办民警
	formData.append("info.info_main_police", input_info_main_police);
	// 协办民警1
	formData.append("info.info_assistant_police_one",
			input_info_assistant_police_one);
	// 协办民警2
	formData.append("info.info_assistant_police_two",
			input_info_assistant_police_two);
	// 所（队）法制员
	formData.append("info.info_department_legal_member",
			info_info_department_legal_member_id);
	// 所（队）长
	formData.append("info.info_department_captain", info_department_captain_id);
	// 法制大队值班民警
	formData
			.append("info.info_legal_team_member", input_info_legal_team_member);
	// 值班局领导
	formData.append("info.info_bureau_leader", input_info_bureau_leader);
	// 通知局长、政委
	formData.append("info.info_inform_leaders", info_inform_leaders_yes);
	// 特殊案件
	formData.append("info.info_specail_case", info_special_case_yes);
	// 特殊人员
	formData.append("info.info_specail_person", input_info_special_person);
	
	
	if (input_info_department == "") {
		mui.toast("请选择办案单位！");
		return false;
	}else if(input_info_department!= ""){
		// 判断该单位是否有法制员
		var xmlRequest = new XMLHttpRequest();
		var formDataFzy = new FormData();
		formDataFzy.append("police_department", $("#input_info_department").val());
		xmlRequest.open("POST", "/ajdbxt/user/User_haveFazhiyuan");
		xmlRequest.send(formDataFzy);
		xmlRequest.onreadystatechange = function() {
			if (xmlRequest.readyState == 4 && xmlRequest.status == 200) {
				var checkFzy = JSON.parse(xmlRequest.responseText);
				console.log("单位：" + $("#input_info_department").val() + ":是否有法制员"
						+ checkFzy);
				if (checkFzy == false) {
					clearPolicesLast();
					mui.alert('该单位无法制员，不能添加案件!');
					return false;
				} else {
					// 判断该单位是否有所队长
					var xmlRequest_sdz = new XMLHttpRequest();
					var formDataSdz = new FormData();
					formDataSdz.append("police_department", $(
							"#input_info_department").val());
					xmlRequest_sdz.open("POST", "/ajdbxt/user/User_haveChief");
					xmlRequest_sdz.send(formDataSdz);
					xmlRequest_sdz.onreadystatechange = function() {
						if (xmlRequest_sdz.readyState == 4
								&& xmlRequest_sdz.status == 200) {
							var checkSdz = JSON
									.parse(xmlRequest_sdz.responseText);
							console.log("单位：" + $("#input_info_department").val()
									+ ":是否有所队长" + checkSdz);
							if (checkSdz == false) {
								clearPolicesLast();
								mui.alert('该单位无所队长，不能添加案件!');
								return false;
							}  else {
											// 执行添加操作，与后台交互

											var xhr = false;
											xhr = new XMLHttpRequest();

											xhr.open("POST", "/ajdbxt/info/Info_update");
											xhr.send(formData);
											xhr.onreadystatechange = function() {
												if (xhr.readyState == 4) {
													if (xhr.status == 200) {
														if (isContains(xhr.responseText, 'success')) {
															mui.toast("修改成功！");
															window.location.href = "/ajdbxt/info/Info_page_mobileCaseList";
														} else {
															mui.toast("修改失败！");
															return false;
														}
													} 
												}
											}
										
									}
								}
							}
						
					}
				
			}
		}

	
	}
	

}
function isContains(str, substr) {
	return str.indexOf(substr) >= 0;
}