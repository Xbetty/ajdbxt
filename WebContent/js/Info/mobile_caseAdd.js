window.onload = function() {
	each_info_department();
}

//每次变更办案单位后清除上一次指派的人员
function clearPolicesLast() {
	if ($('#info_main_police').val() != '') {
		$('#info_main_police').val('');
		$('#info_main_police').html('');
		$('#info_assistant_police_one').val('');
		$('#info_assistant_police_one').html('');
		$('#info_assistant_police_two').val('');
		$('#info_assistant_police_two').html('');
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
function isContains(str, substr) {
	return str.indexOf(substr) >= 0;
}
function each_info_department() {
	$.post('/ajdbxt/info/Info_lal', function(Case_data) {
		// 所有办案单位
		var option_badw = '';
		var data_list_badw = Case_data.departments;
		for (var len = 0; len < data_list_badw.length; len++) {
			if (data_list_badw[len].department_name !== "公安局"
					&& data_list_badw[len].department_name !== "法制大队") {
				option_badw += '<option value="'
						+ data_list_badw[len].ajdbxt_department_id + '">'
						+ data_list_badw[len].department_name + '</option>';
			}

		}
		$('#info_department').html(
				'<option selected="selected" value="" >请选择</option>'
						+ option_badw);
		// 所有法制大队值班民警
		var option_zbmj = '';
		var data_list_zbmj = Case_data.legals;
		for (var len = 0; len < data_list_zbmj.length; len++) {
			option_zbmj += '<option value="'
					+ data_list_zbmj[len].ajdbxt_police_id + '">'
					+ data_list_zbmj[len].police_name + '</option>';
		}
		$('#info_legal_team_member').html(
				'<option selected="selected" value="" >请选择</option>'
						+ option_zbmj);
		// 所有值班局领导
		var option_jld = '';
		var data_list_jld = Case_data.leaders;
		for (var len = 0; len < data_list_jld.length; len++) {
			option_jld += '<option value="'
					+ data_list_jld[len].ajdbxt_police_id + '">'
					+ data_list_jld[len].police_name + '</option>';
		}
		$('#info_bureau_leader').html(
				'<option selected="selected" value="" >请选择</option>'
						+ option_jld);
	}, 'json');

	hideSecondPolice();

}
//指派主办民警、协办民警1、所队长、法制员
$("select#info_department")
		.change(
				function() {
					// 判断该单位是否有法制员
					var xmlRequest = new XMLHttpRequest();
					var formDataFzy = new FormData();
					formDataFzy.append("police_department", $(
							"#info_department").val());
					xmlRequest.open("POST",
							"/ajdbxt/user/User_haveFazhiyuan");
					xmlRequest.send(formDataFzy);
					xmlRequest.onreadystatechange = function() {
						if (xmlRequest.readyState == 4
								&& xmlRequest.status == 200) {
							var checkFzy = JSON
									.parse(xmlRequest.responseText);
							console.log("单位：" + $("#info_department").val()
									+ ":是否有法制员" + checkFzy);
							if (checkFzy == true) {
								// 判断该单位是否有所队长
								var xmlRequest_sdz = new XMLHttpRequest();
								var formDataSdz = new FormData();
								formDataSdz.append("police_department", $(
										"#info_department").val());
								xmlRequest_sdz.open("POST",
										"/ajdbxt/user/User_haveChief");
								xmlRequest_sdz.send(formDataSdz);
								xmlRequest_sdz.onreadystatechange = function() {
									if (xmlRequest_sdz.readyState == 4
											&& xmlRequest_sdz.status == 200) {
										var checkSdz = JSON
												.parse(xmlRequest_sdz.responseText);
										console.log("单位："
												+ $("#info_department")
														.val() + ":是否有所队长"
												+ checkSdz);
										if (checkSdz == false) {
											clearPolicesLast();
											mui.alert('该单位无所队长，不能添加案件!');
											return false;
										}else {
														hideSecondPolice();
														clearPolicesLast();

														$
																.post(
																		'/ajdbxt/info/Info_save',
																		$(
																				'#case_input form')
																				.serialize(),
																		function(
																				Case_data) {
																			// 所队长
																			$(
																					'#info_department_captain_name')
																					.val(
																							Case_data.cap.police_name);
																			$(
																					'#info_department_captain_id')
																					.val(
																							Case_data.cap.ajdbxt_police_id);
																			// 所（队）法制员
																			$(
																					'#info_info_department_legal_member_name')
																					.val(
																							Case_data.team_legal.police_name);
																			$(
																					'#info_info_department_legal_member_id')
																					.val(
																							Case_data.team_legal.ajdbxt_police_id);
																			// 主办民警
																			var option = '';
																			option += '<option value="'
																					+ Case_data.police[0].ajdbxt_police_id
																					+ '">'
																					+ Case_data.police[0].police_name
																					+ '</option>';
																			$(
																					'#info_main_police')
																					.html(
																							option);
																			// 协办民警1
																			var option1 = '';
																			option1 += '<option value="'
																					+ Case_data.police[1].ajdbxt_police_id
																					+ '">'
																					+ Case_data.police[1].police_name
																					+ '</option>';
																			$(
																					'#info_assistant_police_one')
																					.html(
																							option1);
																		},
																		'json')
													
												
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

				});
// 指派协办民警2
$("img#add_police_two")
		.click(
				function() {
					$("#police_two_td")
							.show(
									0,
									function() {
										$
												.post(
														'/ajdbxt/info/Info_getPoliceTwo',
														$(
																'#case_input form')
																.serialize(),
														function(Case_data) {
															var option = '';
															option += '<option value="'
																	+ Case_data.police[2].ajdbxt_police_id
																	+ '">'
																	+ Case_data.police[2].police_name
																	+ '</option>';
															$(
																	'#info_assistant_police_two')
																	.html(
																			option)

														}, 'json')
									});
					showSecondPolice();
				});
//执行添加事件
function createCase() {
	// 案件名称判空
	if ($("#input_info_name").val() == "") {
		mui.toast('案件名称不能为空!');
		return false;
	}
	// 案件类别判空
	if ($("#input_info_category").val() == "") {
		mui.toast('案件类别不能为空!');
		return false;
	}

	// 到案时间判空
	if ($("#input_info_catch_time").val() == "") {
		mui.toast('到案时间不能为空!');
		return false;
	}
	// 未成年判空
/*	if ($("#input_info_nonage").val() == "") {
		mui.toast('确定未成年不能为空!');
		return false;
	}*/

	// 主办民警
	if ($("#info_main_police").val() == "") {
		mui.toast('主办民警不能为空!');
		return false;
	}
	// 协办民警1
	if ($("#info_assistant_police_one").val() == "") {
		mui.toast('协办民警1不能为空!');
		return false;
	}
	// 所（队）法制员
	if ($("#info_info_department_legal_member_name").val() == "") {
		mui.toast('所（队）法制员不能为空!');
		return false;
	}
	// 所（队）长
	if ($("#info_department_captain_name").val() == "") {
		mui.toast('所（队）长不能为空!');
		return false;
	}
	// 法制大队值班民警
	if ($("#info_legal_team_member").val() == "") {
		mui.toast('法制大队值班民警不能为空!');
		return false;
	}
	// 值班局领导
	if ($("#info_bureau_leader").val() == "") {
		mui.toast('值班局领导不能为空!');
		return false;
	}
	// 办案单位判空
	if ($("#info_department").val() == "") {
		mui.toast('办案单位不能为空!');
		return false;
	} else if ($("#info_department").val() !== "") {
		// 判断该单位是否有法制员
		var xmlRequest = new XMLHttpRequest();
		var formDataFzy = new FormData();
		formDataFzy.append("police_department", $("#info_department").val());
		xmlRequest.open("POST", "/ajdbxt/user/User_haveFazhiyuan");
		xmlRequest.send(formDataFzy);
		xmlRequest.onreadystatechange = function() {
			if (xmlRequest.readyState == 4 && xmlRequest.status == 200) {
				var checkFzy = JSON.parse(xmlRequest.responseText);
				console.log("单位：" + $("#info_department").val() + ":是否有法制员"
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
							"#info_department").val());
					xmlRequest_sdz.open("POST", "/ajdbxt/user/User_haveChief");
					xmlRequest_sdz.send(formDataSdz);
					xmlRequest_sdz.onreadystatechange = function() {
						if (xmlRequest_sdz.readyState == 4
								&& xmlRequest_sdz.status == 200) {
							var checkSdz = JSON
									.parse(xmlRequest_sdz.responseText);
							console.log("单位：" + $("#info_department").val()
									+ ":是否有所队长" + checkSdz);
							if (checkSdz == false) {
								clearPolicesLast();
								mui.alert('该单位无所队长，不能添加案件!');
								return false;
							} else {
											// 执行添加操作，与后台交互
											console.log("a");
											if (window.XMLHttpRequest) {
												xmlhttp = new XMLHttpRequest();
											} else {
												xmlhttp = new ActiveXOBject(
														"Microsoft.XMLHTTP");
											}
											var caseInformation = document
													.getElementById("caseInformation");
											var formData = new FormData(
													caseInformation);
											xmlhttp.onreadystatechange = function() {
												console.log("c2");
												if (xmlhttp.readyState == 4
														&& xmlhttp.status == 200) {
													var result = xmlhttp.responseText;
													if (isContains(result,
															'success')) {
														console.log("tianjia");
														mui.toast('添加成功！');
														window.location.href = "/ajdbxt/info/Info_page_mobileCaseList";
													} else {
														mui.toast('添加失败！');
													}
												}
											};
											xmlhttp
													.open(
															"post",
															"/ajdbxt/info/Info_saveCase",
															true);

											xmlhttp.send(formData);
										}
									}
								}
							
						
					}
				}
			}
		

	}

}