//登陆者角色
var loginRole = "";
var open_url="";
//当前登录者是否有案件基本信息修改、删除权限
$(function() {
	checkLoginRole();
});
//添加成功、删除成功后执行的方法
function checkLoginRole() {
	console.log("登录角色")
	// --------------------
	// ------判断角色-------
	var xmlHttpRequest = new XMLHttpRequest();
	xmlHttpRequest.open("POST", "/ajdbxt/user/User_getPower");
	xmlHttpRequest.send(null);
	xmlHttpRequest.onreadystatechange = function() {
		if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
			loginRole = JSON.parse(xmlHttpRequest.responseText).ajdbxt_police.police_power;
			console.log("loginRole:" + loginRole);
			if (loginRole== "3") {
				//查询所有案件
				open_url = "/ajdbxt/process/searchProcessProcessAction";
			} else {
				//查询本单位案件
				open_url = "/ajdbxt/process/searchProcessByDptProcessAction";
			}
			get_ListCaseSearch(query_data);
			//隐藏协办2
			hideSecondPolice();
			clearPolicesLast();
			clearPolicesLastUpdate();
		}

	}
}
/*可能会是公共方法的几个方法*/
//隐藏协办民警2
function hideSecondPolice() {
	console.log("隐藏协办民警2");
	/*$("#police_two_td").hide();
	$("#police_two_tdd").hide();*/
$(".xzt_assistant_police_two").hide();
	$(".add_img").show();
}
//显示协办民警2
function showSecondPolice() {
	console.log("显示协办民警2");
	/*$("#police_two_td").hide();
	$("#police_two_tdd").hide();*/
$(".xzt_assistant_police_two").show();
	$(".add_img").hide();
}
/*hideSecondPolice();*/

//每次变更办案单位后清除上一次指派的人员
//添加案件
function clearPolicesLast() {
	console.log("添加案件：清除上次指派！");
	if ($('#info_main_police').val() != '') {
		console.log("清除...");
		//主办
		$('select[name="info.info_main_police"]').html('').selectpicker(
				'refresh');
		//协办1
		$('select[name="info.info_assistant_police_one"]').html('')
				.selectpicker('refresh');
		//协办2
		$('select[name="info.info_assistant_police_two"]').html('')
				.selectpicker('refresh');
		//所法制员
		$("#info_info_department_legal_member_name").val('');
		//所队长
		$("#info_department_captain_name").val('');
		hideSecondPolice();
		console.log("清除成功");
	}
}
//修改案件
function clearPolicesLastUpdate() {
	console.log("修改案件：清除上次指派！");
	if ($('#xzt_update_main_police').val() != '') {
		console.log("清除...");
		//主办
		$('#xzt_update_main_police').html('').selectpicker(
				'refresh');
		//协办1
		$('#xzt_update_assistant_police_one').html('')
				.selectpicker('refresh');
		//协办2
		$('#xzt_update_assistant_police_two').html('')
				.selectpicker('refresh');
		//所法制员
		$("#xzt_update_team_legal").val('');
		//所队长
		$("#update_info_department_captain_name").val('');
		hideSecondPolice();
		console.log("清除成功");
	}
}
// 关闭新建案件清除模态框数据
$('#breakCase_input').on(
		'hidden.bs.modal',
		function() {
			console.log("关闭添加案件");
			$(this).removeData('bs.modal');
			$('#breakCase_input select').val("");
			$('#breakCase_input select').not($("#xzt_case_type")).html("");
			$('#breakCase_input input').val("");
			document.getElementById("info_inform_leaders_yes").checked=false;
			/*$("#info_inform_leaders_yes").attr("checked", false);*/
			//清除上次指派
			clearPolicesLast();
			//隐藏协办2
			hideSecondPolice();
		});
//关闭修改案件清除模态框数据
$('#breakCase_modification').on(
		'hidden.bs.modal',
		function() {
			console.log("关闭修改案件");
			$(this).removeData('bs.modal');
			$('#breakCase_modification select').val("");
			$('#breakCase_modification input').val("");
			document.getElementById("info_inform_leaders_yes").checked=false;
			//清除上次指派
			clearPolicesLastUpdate();
			//隐藏协办2
			hideSecondPolice();
		});
//当前页传至后台的信息
var query_data = {
	"infoVO.currPage" : "1",
};
//不知道是什么
function isContains(str, substr) {
	return str.indexOf(substr) >= 0;
}
// 当前页面分页信息
var page_infomantion = {
	currPage : 1,
	countRecords : 1,
	pageSize : 10,
	totalPages : 1,
	havePrePage : false,
	haveNexPage : false,
}

// 搜索列表查询
function get_ListCaseSearch(query_data) {
	console.log("loginRole:" + loginRole);
	var input_PoliceSearchText = document
			.getElementById("input_PoliceSearchText").value;
	$
			.post(
					open_url,
					{
						"processVO.key" : input_PoliceSearchText,
						"processVO.currPage" : query_data['infoVO.currPage']
					},
					function(xhr) {
						var data_list = xhr.list;
						var str = '';
						if (data_list.length > 0) {
							for (var len = 0; len < data_list.length; len++) {
								str += '<tr>';
								str += '<td>' + (len + 1) + '</td>';// 序号
								str += '<td><a href="/ajdbxt/info/Info_page_CaseDetails?ajdbxt_info_id='
										+ data_list[len].info.ajdbxt_info_id
										+ '">'
										+ data_list[len].info.info_name
										+ '</a></td>';// 案件名称
								str += '<td>'
										+ data_list[len].info.info_category
										+ '</td>';// 案件类别
								str += '<td>'
										+ data_list[len].department.department_name
										+ '</td>';// 办案单位
								str += '<td>'
										+ data_list[len].info.info_catch_time
										+ '</td>';// 抓获时间
								str += '<td>'
										+ data_list[len].police[0].police_name
										+ '</td>';// 主办民警
								str += '<td>'
										+ data_list[len].police[1].police_name
										+ ((null != (data_list[len].police[2])) ? ('、' + data_list[len].police[2].police_name)
												: ('')) + '</td>';// 协办民警1
								if (loginRole == "3") {
									str += '<td>'
											+ '<input type="hidden" value="'
											+ data_list[len].info.ajdbxt_info_id
											+ '" />'
											+ '<button type="button" style="margin-left:6px;" class="xzt_case_operate btn btn-primary btn-xs" data-toggle="modal" data-target="#breakCase_modification"><i class="fa fa-pencil-square-o" aria-hidden="true" data-toggle="modal" data-target="#breakCase_modification"></i>修改</button>'
											+ '<button type="button" style="margin-left:6px;" class="xzt_case_operate btn btn-danger btn-xs"><i class="fa fa-trash-o"></i>删除</button>'
											+ '</td>';
									str += '</tr>';
								}
							}
							document.getElementById("page_flip").style.display = "block";// 显示翻页
						} else {
							document.getElementById("page_flip").style.display = "none";// 隐藏翻页
							str = '<td colspan="7" style="text-align:center;color:red;font-size:20px;margin:10px 0;">抱歉，无案件信息</td>';
						}
						// 隐藏加载图标
						var i_pulse = document.getElementById("i_pulse");
						i_pulse.style.display = "none";
						// 加载案件列表到表格中
						$('.breakcase_table_info tbody').html(str); // 操作点击事件

						// -----------------------------------------------------
						// 设置确认、删除点击事件
					
						$('.xzt_case_operate').click(modifi_delete);
						// -----------------------------------------------------

						// 分页信息存入page_infomantion中
						page_infomantion.currPage = xhr.currPage; // 当前页数
						page_infomantion.countRecords = xhr.count; // 总页数
						page_infomantion.pageSize = xhr.pageSize; // 每页记录数
						page_infomantion.totalPages = xhr.totalPage; // 总记录数
						page_infomantion.havePrePage = xhr.havePrePage; // 是否有上一页
						page_infomantion.haveNexPage = xhr.haveNexPage; // 是否有下一页
						$('.info')
								.html(
										'第<span id="span_pageIndex">'
												+ xhr.currPage
												+ '</span>页&nbsp&nbsp共 <span id="span_totalPages">'
												+ xhr.totalPage
												+ '</span>页&nbsp&nbsp共 <span id="span_totalRecords">'
												+ xhr.count + '</span>条记录');
					}, 'json')
}
// 首页
function firstPage() {
	if (page_infomantion.currPage == 1) {
		toastr.warning('已经是第一页！');
		return;
	}
	console.log("currPage:" + page_infomantion.currPage);
	query_data['infoVO.currPage'] = 1;
	console.log("首页："+query_data['infoVO.currPage']);
	get_ListCaseSearch(query_data);
}
// 上一页
function prePage() {
	if (page_infomantion.currPage <= 1) {
		toastr.warning('已经是第一页！');
		return;
	}
	console.log("currPage:" + page_infomantion.currPage);
	query_data['infoVO.currPage'] = page_infomantion.currPage - 1;
	console.log("上一页："+query_data['infoVO.currPage']);
	get_ListCaseSearch(query_data);
}
// 下一页
function nextPage() {
	if (page_infomantion.currPage >= page_infomantion.totalPages) {
		toastr.warning('已经是最后一页！');
		return;
	}
	console.log("currPage:" + page_infomantion.currPage);
	console.log("totalPages:" + page_infomantion.totalPages);
	query_data['infoVO.currPage'] = page_infomantion.currPage + 1;
	console.log("下一页："+query_data['infoVO.currPage']);
	get_ListCaseSearch(query_data);
}
// 尾页
function lastPage() {
	if (page_infomantion.currPage == page_infomantion.totalPages) {
		toastr.warning('已经是最后一页！');
		return;
	}
	console.log("currPage:" + page_infomantion.currPage);
	console.log("totalPages:" + page_infomantion.totalPages);
	query_data['infoVO.currPage'] = page_infomantion.totalPages;
	console.log("尾页："+query_data['infoVO.currPage']);
	get_ListCaseSearch(query_data);
}


// 录入案件信息
/*--------------------------------------------------------*/
// 案件信息录入模态框事件
$('#breakCase_input')
		.on(
				'show.bs.modal',
				function() {
					$
							.post(
									'/ajdbxt/info/Info_lal',
									function(Case_data) {
										var this_modal = $(this);
										// 除去加载提示
										$('.load_remind').remove();
										// 所有法制大队值班民警
										var option_fzddmj = '';
										var data_list_fzddmj = Case_data.legals;
										for (var len = 0; len < data_list_fzddmj.length; len++) {
											option_fzddmj += '<option value="'
													+ data_list_fzddmj[len].ajdbxt_police_id
													+ '">'
													+ data_list_fzddmj[len].police_name
													+ '</option>';
										}
										$("#xzt_info_legal_team_member").html(
												option_fzddmj).selectpicker(
												'refresh');
										// 所有局领导
										var option_jld = '';
										var data_list_jld = Case_data.leaders;
										for (var len = 0; len < data_list_jld.length; len++) {
											option_jld += '<option value="'
													+ data_list_jld[len].ajdbxt_police_id
													+ '">'
													+ data_list_jld[len].police_name
													+ '</option>';
										}
										$("#xzt_info_bureau_leader").html(
												option_jld).selectpicker(
												'refresh');
										// 所有办案单位
										var option_badw = '';
										var data_list_badw = Case_data.departments;
										for (var len = 0; len < data_list_badw.length; len++) {
											if (data_list_badw[len].department_name !== "公安局"
													&& data_list_badw[len].department_name !== "法制大队") {
												option_badw += '<option value="'
														+ data_list_badw[len].ajdbxt_department_id
														+ '">'
														+ data_list_badw[len].department_name
														+ '</option>';
											}

										}
										$("#info_department").html(option_badw)
												.selectpicker('refresh');
										// 所有法制员
										var option_fzy = '';
										var data_list_fzy = Case_data.legalers;
										for (var len = 0; len < data_list_fzy.length; len++) {
											option_fzy += '<option value="'
													+ data_list_fzy[len].ajdbxt_police_id
													+ '">'
													+ data_list_fzy[len].police_name
													+ '</option>';
										}
										$(
												"#info_info_department_legal_member_name")
												.html(option_fzy).selectpicker(
														'refresh');
									}, 'json');
				});

// 添加刑事破案
$('.input_sure')
		.click(
				function() {
					var this_modal = $(this);
					// 案件名称判空
					if ($("#xzt_case_name").val() == "") {
						toastr.error('案件名称不能为空!');
						return false;
					}
					// 案件类别判空
					if ($("#xzt_case_type").val() == "") {
						toastr.error('案件类别不能为空!');
						return false;
					}

					
					// 办案时间判空
					if ($("#xzt_case_time").val() == "") {
						toastr.error('到案时间不能为空!');
						return false;
					}

					// 主办民警
					if ($("#info_main_police").val() == "") {
						toastr.error('主办民警不能为空!');
						return false;
					}
					// 协办民警
					if ($("#xzt_assistant_police").val() == "") {
						toastr.error('协办民警1不能为空!');
						return false;
					}
					// 所（队）法制员
					if ($("#info_info_department_legal_member_name").val() == "") {
						toastr.error('所（队）法制员不能为空!');
						return false;
					}
					// 所（队）长
					if ($("#info_department_captain_name").val() == "") {
						toastr.error('所（队）长不能为空!');
						return false;
					}
					// 法制大队值班民警
					if ($("#xzt_info_legal_team_member").val() == "") {
						toastr.error('法制大队值班民警不能为空!');
						return false;
					}
					// 值班局领导
					if ($("#xzt_info_bureau_leader").val() == "") {
						toastr.error('值班局领导不能为空!');
						return false;
					}
					// 特殊案件
					if($)
					// 办案单位判空
					if ($("#info_department").val() == "") {
						toastr.error('办案单位不能为空!');
						return false;
					} else if($("#info_department").val() !== ""){
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
								if (checkFzy == false) {
									clearPolicesLast();
									alert('该单位无法制员，不能添加案件!');
									return false;
								}else{
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
											console.log("单位：" + $("#info_department").val()
													+ ":是否有所队长" + checkSdz);
											if (checkSdz == false) {
												clearPolicesLast();
												alert('该单位无所队长，不能添加案件!');
												return false;
											}else{
															// 执行添加操作，与后台交互
															$
																	.post(
																			'/ajdbxt/info/Info_saveCase',
																			$('#breakCase_input form').serialize(),
																			function(xhr) {
																				if (isContains(xhr, 'success')) {
																					toastr.success('添加成功!');
																					$('#breakCase_input').modal('hide');
																					$('#breakCase_input select')
																							.val("");
																					$('#breakCase_input input').val("");
																					$('#breakCase_input radio').checked = false;
																					checkLoginRole();
																				} else {
																					toastr.error('添加失败!');
																					console.log("qinghcu");
																					$('input:radio').eq(1).attr(
																							'checked', 'true');
																					return false;
																				}
																			}, 'text')
														
													}
												}
											}
										
									}
								
							}
						}
						
					
					}
					

				});

/** ******************************************************** */

// 是否未成年人
function changeminors_asking_yes(even) {
	var sex = document.getElementById("minors_asking_yes");
	sex.value = '是';
	return sex.value;
}
function changeminors_asking_no(even) {
	var sex = document.getElementById("minors_asking_no");
	sex.value = '否';
	return sex.value;
}
// 是否通知局长、政委
function change_info_inform_leaders_yes(even) {
	var sex = document.getElementById("info_inform_leaders_yes");
	sex.value = '是';
	return sex.value;
}
//特殊人员
/*function change_info_special_person_no(even) {
	var info_special_person = document.getElementById("info_special_person_no");
	info_special_person.value = '无';
	return info_special_person.value;
}*/
function change_info_special_person_lawyer(even) {
	var info_special_person = document.getElementById("info_special_person_lawyer");
	info_special_person.value = '律师';
	return info_special_person.value;
}
function change_info_special_person_reporter(even) {
	var info_special_person = document.getElementById("info_special_person_reporter");
	info_special_person.value = '记者';
	return info_special_person.value;
}
function change_info_special_person_renda(even) {
	var info_special_person = document.getElementById("info_special_person_renda");
	info_special_person.value = '人大';
	return info_special_person.value;
}
function change_info_special_person_zhengxie(even) {
	var info_special_person = document.getElementById("info_special_person_zhengxie");
	info_special_person.value = '政协';
	return info_special_person.value;
}
function change_info_special_person_minor(even) {
	var info_special_person = document.getElementById("info_special_person_minor");
	info_special_person.value = '未成年人';
	return info_special_person.value;
}
function change_info_special_person_shejing(even) {
	var info_special_person = document.getElementById("info_special_person_shejing");
	info_special_person.value = '涉警';
	return info_special_person.value;
}
function change_info_special_person_shezhong(even) {
	var info_special_person = document.getElementById("info_special_person_shezhong");
	info_special_person.value = '涉众';
	return info_special_person.value;
}
function change_info_special_person_shehei(even) {
	var info_special_person = document.getElementById("info_special_person_shehei");
	info_special_person.value = '涉黑';
	return info_special_person.value;
}
//特殊案件
function change_info_special_case_yes(even) {
	var info = document.getElementById("info_special_case_yes");
	info.value = '是';
	return info.value;
}

// 修改和删除模态框
var modifi_delete = function() {
	var type = $(this).text().trim();
	var id = $(this).siblings('input').val();
	if (type == "修改") {
		$
				.post(
						'/ajdbxt/info/Info_getSingleInfo',
						{
							"info.ajdbxt_info_id" : id
						},
						function(xhr_data) {
						//案件名称
							$("#xzt_update_case_name").val(xhr_data.info.info_name);
						//案件类别
							$("#xzt_update_case_type").val(xhr_data.info.info_category);
						//办案单位
						//到案时间
							$("#xzt_update_case_time").val(xhr_data.info.info_catch_time);
							//主办民警
							//协办民警1
							//协办民警2
							//所（队）法制员
							$("#xzt_update_team_legal").val(xhr_data.team_legal.police_name);
							$("#xzt_update_team_legal_id").val(xhr_data.team_legal.ajdbxt_police_id);
							//所（队）长
							$("#update_info_department_captain_name").val(xhr_data.cap.police_name);
							$("#update_info_department_captain_id").val(xhr_data.cap.ajdbxt_police_id); 
							//法制大队值班民警
							//值班局领导
							$("#xzt_update_info_bureau_leader_id").val(xhr_data.info.ajdbxt_info_id);
							// 特殊案件
							if (xhr_data.info.info_special_case != null) {
								if (xhr_data.info.info_special_case.trim() == "是") {
									$('#update_info_special_case_yes').attr(
											"checked", "checked");
								}
							}
							// 特殊人员
							if (xhr_data.info.info_special_case != null) {
								if (xhr_data.info.info_special_person.indexOf("律师")!=-1) {
									$('#update_info_special_person_lawyer').attr(
											"checked", "checked");
								}
								if (xhr_data.info.info_special_person.indexOf("记者")!=-1) {
									$('#update_info_special_person_reporter').attr(
											"checked", "checked");
								}
								if (xhr_data.info.info_special_person.indexOf("人大")!=-1) {
									$('#update_info_special_person_renda').attr(
											"checked", "checked");
								}
								if (xhr_data.info.info_special_person.indexOf("政协")!=-1) {
									$('#update_info_special_person_zhengxie').attr(
											"checked", "checked");
								}
								if (xhr_data.info.info_special_person.indexOf("未成年人")!=-1) {
									$('#update_info_special_person_minor').attr(
											"checked", "checked");
								}
								if (xhr_data.info.info_special_person.indexOf("涉警")!=-1) {
									$('#update_info_special_person_shejing').attr(
											"checked", "checked");
								}
								if (xhr_data.info.info_special_person.indexOf("涉众")!=-1) {
									$('#update_info_special_person_shezhong').attr(
											"checked", "checked");
								}
								if (xhr_data.info.info_special_person.indexOf("涉黑")!=-1) {
									$('#update_info_special_person_shehei').attr(
											"checked", "checked");
								}
							}
							// 通知局长、政委
							if (xhr_data.info.info_inform_leaders != null) {
								if (xhr_data.info.info_inform_leaders.trim() == "是") {
									$('#update_info_inform_leaders_yes').attr(
											"checked", "checked");
								} else {
								}

							}
							/*xzt---------------------法制大队民警/局领导/办案单位*/
							$('#breakCase_modification')
							.on(
									'show.bs.modal',

									// 所有法制大队民警循环
									function() {
										var this_modal = $(this);
										$
												.post(
														'/ajdbxt/info/Info_lal',
														function(
																Case_data) {
															var this_modal = $(this);
															// 除去加载提示
															$('.load_remind').remove();
															// 所有法制大队民警
															var option_fzddmj = '';
															var data_list_fzddmj = Case_data.legals;
															for (var len = 0; len < data_list_fzddmj.length; len++) {
																option_fzddmj += '<option ';
																if (xhr_data.legal.police_name == data_list_fzddmj[len].police_name) {
																	option_fzddmj += ' selected';
																}
																option_fzddmj += ' value="'
																		+ data_list_fzddmj[len].ajdbxt_police_id
																		+ '">'
																		+ data_list_fzddmj[len].police_name
																		+ '</option>';
															}
															$("#xzt_update_info_legal_team_member").html(
																	option_fzddmj).selectpicker(
																	'refresh');
															// 所有局领导
															var option_jld = '';
															var data_list_jld = Case_data.leaders;
															for (var len = 0; len < data_list_jld.length; len++) {
																option_jld += '<option ';
																if (xhr_data.leader.police_name == data_list_jld[len].police_name) {
																	option_jld += ' selected';
																}
																option_jld += ' value="'
																		+ data_list_jld[len].ajdbxt_police_id
																		+ '">'
																		+ data_list_jld[len].police_name
																		+ '</option>';
															}
															$("#xzt_update_info_bureau_leader").html(
																	option_jld).selectpicker(
																	'refresh');
															// 所有办案单位
															var option_badw = '';
															var data_list_badw = Case_data.departments;
															for (var len = 0; len < data_list_badw.length; len++) {
																if (data_list_badw[len].department_name !== "公安局"
																		&& data_list_badw[len].department_name !== "法制大队") {
																	option_badw += '<option ';
																	if (xhr_data.department.department_name == data_list_badw[len].department_name) {
																		option_badw += ' selected';
																	}
																	option_badw += ' value="'
																			+ data_list_badw[len].ajdbxt_department_id
																			+ '">'
																			+ data_list_badw[len].department_name
																			+ '</option>';
																}

															}
															$("#xzt_update_info_department").html(option_badw)
																	.selectpicker('refresh');
														}, 'json');

									})
									/*--xzt 所有民警循环*/
										$('#breakCase_modification')
									.on(
											'show.bs.modal',
											function() {
												var this_modal = $(this);
												
												$
														.post(
																'/ajdbxt/info/Info_getPolices',
																{
																	"info.info_department" : xhr_data.info.info_department
																},
																function(
																		Case_data) {
																	// 除去加载提示
																	$('.load_remind').remove();
																	// 主办民警
																	var option_main_police = '';
																	// 协办民警1
																	var option_assistant_one = '';
																	// 协办民警2
																	var option_assistant_two = '';
																	option_assistant_two +='<option value="">无</option>';
																	// var
																	// data_list=Case_data.Caselist;
																	/* 未分配协办民警2则无被选中项 */
																	if (null == xhr_data.info.info_assistant_police_two||""==xhr_data.info.info_assistant_police_two) {
																			//隐藏协办2
																		hideSecondPolice();
																	}else{
																		//隐藏添加图标
																		showSecondPolice();
																	}
																	for (var len = 0; len < Case_data.length; len++) {
																		// 主办民警
																		option_main_police += '<option';
																		if (xhr_data.info.info_main_police == Case_data[len].ajdbxt_police_id) {
																			option_main_police += ' selected';
																		}
																		option_main_police += ' value="'
																				+ Case_data[len].ajdbxt_police_id
																				+ '">'
																				+ Case_data[len].police_name
																				+ '</option>';
																		// 协办民警1
																		option_assistant_one += '<option';
																		if (xhr_data.info.info_assistant_police_one == Case_data[len].ajdbxt_police_id) {
																			option_assistant_one += ' selected';
																		}
																		option_assistant_one += ' value="'
																				+ Case_data[len].ajdbxt_police_id
																				+ '">'
																				+ Case_data[len].police_name
																				+ '</option>';
																		// 协办民警2
																		option_assistant_two += '<option';
																		if (xhr_data.info.info_assistant_police_two == Case_data[len].ajdbxt_police_id) {
																			option_assistant_two += ' selected';
																		}
																		option_assistant_two += ' value="'
																				+ Case_data[len].ajdbxt_police_id
																				+ '">'
																				+ Case_data[len].police_name
																				+ '</option>';
																	}
																	// 主办民警
																	$("#xzt_update_main_police").html(
																			option_main_police)
																			.selectpicker(
																					'refresh');
																	// 协办民警1
																	$("#xzt_update_assistant_police_one").html(
																			option_assistant_one)
																			.selectpicker(
																					'refresh');
																	// 协办民警2
																	$("#xzt_update_assistant_police_two").html(
																			option_assistant_two)
																			.selectpicker(
																					'refresh');
																	
																}, 'json');

											})

							

							/*// lwk---------------------法制大队民警/局领导/办案单位
							$('#breakCase_modification')
									.on(
											'show.bs.modal',

											// 所有法制大队民警循环
											function() {
												var this_modal = $(this);
												$
														.post(
																'/ajdbxt/info/Info_lal',
																function(
																		Case_data) {
																	var option = '';
																	var data_list = Case_data.legals;
																	for (var len = 0; len < data_list.length; len++) {
																		option += '<option ';
																		if (xhr_data.legal.police_name == data_list[len].police_name) {
																			option += ' selected';
																		}
																		option += ' value="'
																				+ data_list[len].ajdbxt_police_id
																				+ '">'
																				+ data_list[len].police_name
																				+ '</option>';
																	}
																	$("#xzt_update_info_legal_team_member").html(
																					option)
																			.selectpicker(
																					'refresh');
																	// 除去加载提示
																	this_modal
																			.find(
																					'.load_remind')
																			.remove();
																}, 'json');

											})

							// 所有局领导循环
							$('#breakCase_modification')
									.on(
											'show.bs.modal',
											function() {
												var this_modal = $(this);
												$
														.post(
																'/ajdbxt/info/Info_lal',
																function(
																		Case_data) {
																	var option = '';
																	var data_list = Case_data.leaders;
																	for (var len = 0; len < data_list.length; len++) {
																		option += '<option ';
																		if (xhr_data.leader.police_name == data_list[len].police_name) {
																			option += ' selected';
																		}
																		option += ' value="'
																				+ data_list[len].ajdbxt_police_id
																				+ '">'
																				+ data_list[len].police_name
																				+ '</option>';
																	}
																	$("#xzt_update_info_bureau_leader").html(
																					option)
																			.selectpicker(
																					'refresh');
																	// 除去加载提示
																	this_modal
																			.find(
																					'.load_remind')
																			.remove();
																}, 'json');
											})
											// 所有办案单位
							$('#breakCase_modification')
									.on(
											'show.bs.modal',
											function() {
												var this_modal = $(this);
												$
														.post(
																'/ajdbxt/info/Info_lal',
																function(
																		Case_data) {
																	// 所有案件循环
																	var option = '';
																	var data_list = Case_data.departments;
																	for (var len = 0; len < data_list.length; len++) {
																		if (data_list[len].department_name !== "公安局"
																				&& data_list[len].department_name !== "法制大队") {
																			option += '<option ';
																			if (xhr_data.department.department_name == data_list[len].department_name) {
																				option += ' selected';
																			}
																			option += ' value="'
																					+ data_list[len].ajdbxt_department_id
																					+ '">'
																					+ data_list[len].department_name
																					+ '</option>';
																		}

																	}
																	$("#xzt_update_info_department").html(
																					option)
																			.selectpicker(
																					'refresh');
																	// 除去加载提示
																	this_modal
																			.find(
																					'.load_remind')
																			.remove();
																}, 'json');

											})
*/
							// lwk_________________所有民警循环
						/*	$('#breakCase_modification')
									.on(
											'show.bs.modal',
											function() {
												var this_modal = $(this);
												// 主办民警
												$
														.post(
																'/ajdbxt/info/Info_getPolices',
																{
																	"info.info_department" : xhr_data.info.info_department
																},
																function(
																		Case_data) {
																	var option = '';
																	for (var len = 0; len < Case_data.length; len++) {
																		option += '<option';
																		if (xhr_data.info.info_main_police == Case_data[len].ajdbxt_police_id) {
																			option += ' selected';
																		}
																		option += ' value="'
																				+ Case_data[len].ajdbxt_police_id
																				+ '">'
																				+ Case_data[len].police_name
																				+ '</option>';
																	}
																	$("#xzt_update_main_police").html(
																					option)
																			.selectpicker(
																					'refresh');
																	// 除去加载提示
																	this_modal
																			.find(
																					'.load_remind')
																			.remove();
																}, 'json');

												// 协办民警1
												$
														.post(
																'/ajdbxt/info/Info_getPolices',
																{
																	"info.info_department" : xhr_data.info.info_department
																},
																function(
																		Case_data) {
																	// 所有案件循环
																	var option = '';
																	for (var len = 0; len < Case_data.length; len++) {
																		option += '<option';
																		if (xhr_data.info.info_assistant_police_one == Case_data[len].ajdbxt_police_id) {
																			option += ' selected';
																		}
																		option += ' value="'
																				+ Case_data[len].ajdbxt_police_id
																				+ '">'
																				+ Case_data[len].police_name
																				+ '</option>';
																	}
																	$("#xzt_update_assistant_police_one").html(
																					option)
																			.selectpicker(
																					'refresh');
																	// 除去加载提示
																	this_modal
																			.find(
																					'.load_remind')
																			.remove();
																}, 'json');

												// 协办民警2
												$
														.post(
																'/ajdbxt/info/Info_getPolices',
																{
																	"info.info_department" : xhr_data.info.info_department
																},
																function(
																		Case_data) {
																	// 所有案件循环
																	var option = '';
																	option +='<option value="">无</option>';
																	// var
																	// data_list=Case_data.Caselist;
																	 未分配协办民警2则无被选中项 
																	if (null == xhr_data.info.info_assistant_police_two||""==xhr_data.info.info_assistant_police_two) {
																			//隐藏协办2
																		hideSecondPolice();
																	}else{
																		//隐藏添加图标
																		showSecondPolice();
																	}
																	for (var len = 0; len < Case_data.length; len++) {
																		option += '<option';
																		if (xhr_data.info.info_assistant_police_two == Case_data[len].ajdbxt_police_id) {
																			option += ' selected';
																		}
																		option += ' value="'
																				+ Case_data[len].ajdbxt_police_id
																				+ '">'
																				+ Case_data[len].police_name
																				+ '</option>';
																	}
																	$("#xzt_update_assistant_police_two").html(
																					option)
																			.selectpicker(
																					'refresh');
																	// 除去加载提示
																	this_modal
																			.find(
																					'.load_remind')
																			.remove();
																}, 'json');

											})

							
*/
							// //模态框显示
							$('#breakCase_modification').modal('show');
							// 确认按钮添加事件
							$('.breakCase_operation').unbind().click(
									breakecase_modification);
						}, 'json');

	} else if (type == "删除") {
		var formData = new FormData();
		formData.append('info.ajdbxt_info_id', id);
		$.confirm({
			title : '确定删除?',
			smoothContent : false,
			content : false,
			autoClose : 'cancelAction|10000',
			buttons : {
				deleteUser : {
					btnClass : 'btn-danger',
					text : '确认',
					action : function() {
						$.ajax({
							url : '/ajdbxt/info/Info_delete',
							type : 'post',
							data : formData,
							processData : false,
							contentType : false,
							dataType : 'text',
							success : function(data) {

								if (data == "success") {
									toastr.success("删除成功！");
									// 获取对应option中的value值
									checkLoginRole();
									// get_ListCaseSearch(query_data);
								} else {
									toastr.error("删除失败！");
								}
							}
						});
					}
				},
				cancelAction : {
					btnClass : 'btn-blue',
					text : '取消',
				}
			}
		});
	}
}

// 确认修改
var breakecase_modification = function() {
	$.confirm({
		title : '确定修改?',
		smoothContent : false,
		content : false,
		autoClose : 'cancelAction|10000',
		buttons : {
			deleteUser : {
				btnClass : 'btn-danger',
				text : '确认',
				action : function() {
					// 案件名称判空
					if ($("#xzt_update_case_name").val() == "") {
						toastr.error('案件名称不能为空!');
						return false;
					}
					// 案件类别判空
					if ($("#xzt_update_case_type").val() == "") {
						toastr.error('案件类别不能为空!');
						return false;
					}
				
					// 到案时间判空
					if ($("#xzt_update_case_time").val() == "") {
						toastr.error('到案时间不能为空!');
						return false;
					}

					// 主办民警
					if ($("#xzt_update_main_police").val() == "") {
						toastr.error('主办民警不能为空!');
						return false;
					}
					// 协办民警
					if ($("#xzt_update_assistant_police_one").val() == "") {
						toastr.error('协办民警1不能为空!');
						return false;
					}
					// 所（队）法制员
					if ($("#xzt_update_team_legal").val() == "") {
						toastr.error('所（队）法制员不能为空!');
						return false;
					}
					// 所（队）长
					if ($("#update_info_department_captain_name").val() == "") {
						toastr.error('所（队）长不能为空!');
						return false;
					}
					// 法制大队值班民警
					if ($("#xzt_update_info_legal_team_member").val() == "") {
						toastr.error('法制大队值班民警不能为空!');
						return false;
					}
					// 值班局领导
					if ($("#xzt_update_info_bureau_leader").val() == "") {
						toastr.error('值班局领导不能为空!');
						return false;
					}
					// 办案单位判空
					if ($("#xzt_update_info_department").val() == "") {
						toastr.error('办案单位不能为空!');
						return false;
					}else {
						// 判断该单位是否有法制员
						var xmlRequest = new XMLHttpRequest();
						var formDataFzy = new FormData();
						formDataFzy.append("police_department", $(
								"#xzt_update_info_department").val());
						xmlRequest.open("POST", "/ajdbxt/user/User_haveFazhiyuan");
						xmlRequest.send(formDataFzy);
						xmlRequest.onreadystatechange = function() {
							if (xmlRequest.readyState == 4
									&& xmlRequest.status == 200) {
								var checkFzy = JSON.parse(xmlRequest.responseText);
								console.log("单位：" + $("#xzt_update_info_department").val()
										+ ":是否有法制员" + checkFzy);
								if (checkFzy == true) {
									// 判断该单位是否有所队长
									var xmlRequest_sdz = new XMLHttpRequest();
									var formDataSdz = new FormData();
									formDataSdz.append("police_department", $(
											"#xzt_update_info_department").val());
									xmlRequest_sdz.open("POST",
											"/ajdbxt/user/User_haveChief");
									xmlRequest_sdz.send(formDataSdz);
									xmlRequest_sdz.onreadystatechange = function() {
										if (xmlRequest_sdz.readyState == 4
												&& xmlRequest_sdz.status == 200) {
											var checkSdz = JSON
													.parse(xmlRequest_sdz.responseText);
											console.log("单位：" + $("#xzt_update_info_department").val()
													+ ":是否有所队长" + checkSdz);
											if (checkSdz == false) {
												clearPolicesLastUpdate();
												alert('该单位无所队长，不能添加案件!');
												return false;
											}else{
															console.log("修改指派");
															hideSecondPolice();
															clearPolicesLast();
															$.post('/ajdbxt/info/Info_save', $('#breakCase_modification form')
																	.serialize(), function(Case_data) {
																// 所队长
																$('#update_info_department_captain_name').val(Case_data.cap.police_name);
																$('#update_info_department_captain_id').val(Case_data.cap.ajdbxt_police_id);
																// 所（队）法制员
																$('#xzt_update_team_legal').val(Case_data.team_legal.police_name);
																$('#xzt_update_team_legal_id').val(
																		Case_data.team_legal.ajdbxt_police_id);
																// 主办民警
																var option = '';
																option += '<option value="' + Case_data.police[0].ajdbxt_police_id
																		+ '">' + Case_data.police[0].police_name + '</option>';
																$('select[name="info.info_main_police"]').html(option).selectpicker(
																		'refresh').selectpicker('val',
																		Case_data.police[0].ajdbxt_police_id);
																// 协办民警1
																var option1 = '';
																option1 += '<option value="' + Case_data.police[1].ajdbxt_police_id
																		+ '">' + Case_data.police[1].police_name + '</option>';
																$('select[name="info.info_assistant_police_one"]').html(option1)
																		.selectpicker('refresh').selectpicker('val',
																				Case_data.police[1].ajdbxt_police_id);
															}, 'json')}
													}
												}
											
										
									
								} else {
									clearPolicesLastUpdate();
									alert('该单位无法制员，不能添加案件!');
									return false;
								}
							}
						}


					}
					// 修改操作
					if (window.XMLHttpRequest) {
						xmlhttp = new XMLHttpRequest();
					} else {
						xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
					}
					var processDetails = document
							.getElementById("breakCase_modification_from");
					var formData = new FormData(processDetails);
					xmlhttp.onreadystatechange = function() {
						// console.log("c2");
						if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

							var result = xmlhttp.responseText;
							if (isContains(result, 'success')) {
								toastr.success('修改成功！');
								/*window.location.href="/ajdbxt/info/Info_page_CaseInfo";*/
								$('#breakCase_modification').modal('hide');
								clearPolicesLast();
								checkLoginRole();

							} else {
								toastr.error('修改失败！');
							}
						}
					};
					xmlhttp.open("post", "/ajdbxt/info/Info_update", true);
					xmlhttp.send(formData);
				}
			},
			cancelAction : {
				btnClass : 'btn-blue',
				text : '取消',
			}
		}
	});
}

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
																'#breakCase_input form')
																.serialize(),
														function(Case_data) {
															var option = '';
															option += '<option value="'
																	+ Case_data.police[2].ajdbxt_police_id
																	+ '">'
																	+ Case_data.police[2].police_name
																	+ '</option>';
															$(
																	'select[name="info.info_assistant_police_two"]')
																	.html(
																			option)
																	.selectpicker(
																			'refresh')
																	.selectpicker(
																			'val',
																			Case_data.police[2].ajdbxt_police_id);

														}, 'json')
									});
					//显示协办民警2
					showSecondPolice();
					/*$("#police_two_tdd").show();
					$("#add_img").hide(); */				});
//修改案件指派民警2
		function updateArrayPoliceTwo() {
			console.log("修改的指派");
			$("#police_two_td_update")
					.show(
							0,
							function() {
								$
										.post(
												'/ajdbxt/info/Info_getPoliceTwo',
												$(
														'#breakCase_modification form')
														.serialize(),
												function(Case_data_assistant_two) {
													$
													.post(
															'/ajdbxt/info/Info_getPolices',
															{
																"info.info_department" :  $("#xzt_update_info_department").val()
															},
															function(
																	Case_data) {
																// 所有案件循环
																var option = '';
																	//隐藏添加图标
																	showSecondPolice();
																	option +='<option value="">无</option>';
																for (var len = 0; len < Case_data.length; len++) {
																	option += '<option';
																	if (Case_data_assistant_two.police[2].ajdbxt_police_id == Case_data[len].ajdbxt_police_id) {
																		option += ' selected';
																	}
																	option += ' value="'
																			+ Case_data[len].ajdbxt_police_id
																			+ '">'
																			+ Case_data[len].police_name
																			+ '</option>';
																}
																$("#xzt_update_assistant_police_two").html(
																				option)
																		.selectpicker(
																				'refresh');
																// 除去加载提示
																$('.load_remind').remove();
															}, 'json');
													
													
													
												/*	
													var option = '';
													option += '<option value="'
															+ Case_data_assistant_two.police[2].ajdbxt_police_id
															+ '">'
															+ Case_data_assistant_two.police[2].police_name
															+ '</option>';
													$("#xzt_update_assistant_police_two")
															.html(
																	option)
															.selectpicker(
																	'refresh')
															.selectpicker(
																	'val',
																	Case_data_assistant_two.police[2].ajdbxt_police_id);
*/
												}, 'json')
							});
			//显示协办民警2
			showSecondPolice();
			/*$("#police_two_tdd").show();
			$("#add_img").hide(); */				}

// 添加案件指派主办民警、协办民警1、所队长
$("select#info_department")
		.change(
				function() {
					// 判断该单位是否有法制员
					var xmlRequest = new XMLHttpRequest();
					var formDataFzy = new FormData();
					formDataFzy.append("police_department", $(
							"#info_department").val());
					xmlRequest.open("POST", "/ajdbxt/user/User_haveFazhiyuan");
					xmlRequest.send(formDataFzy);
					xmlRequest.onreadystatechange = function() {
						if (xmlRequest.readyState == 4
								&& xmlRequest.status == 200) {
							var checkFzy = JSON.parse(xmlRequest.responseText);
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
										console.log("单位：" + $("#info_department").val()
												+ ":是否有所队长" + checkSdz);
										if (checkSdz == false) {
											clearPolicesLast();
											alert('该单位无所队长，不能添加案件!');
											return false;
										}else{
														hideSecondPolice();
														clearPolicesLast();

														$
																.post(
																		'/ajdbxt/info/Info_save',
																		$('#breakCase_input form')
																				.serialize(),
																		function(Case_data) {
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
																					'select[name="info.info_main_police"]')
																					.html(option)
																					.selectpicker(
																							'refresh')
																					.selectpicker(
																							'val',
																							Case_data.police[0].ajdbxt_police_id);
																			// 协办民警1
																			var option1 = '';
																			option1 += '<option value="'
																					+ Case_data.police[1].ajdbxt_police_id
																					+ '">'
																					+ Case_data.police[1].police_name
																					+ '</option>';
																			$(
																					'select[name="info.info_assistant_police_one"]')
																					.html(option1)
																					.selectpicker(
																							'refresh')
																					.selectpicker(
																							'val',
																							Case_data.police[1].ajdbxt_police_id);
																		}, 'json')
													
												}
											
										}
									
								}
							} else {
								clearPolicesLast();
								alert('该单位无法制员，不能添加案件!');
								return false;
							}
						}
					}

				});

// 修改案件指派主办民警、协办民警1、所队长
function updateArray() {
	// 判断该单位是否有法制员
	var xmlRequest = new XMLHttpRequest();
	var formDataFzy = new FormData();
	formDataFzy.append("police_department", $(
			"#xzt_update_info_department").val());
	xmlRequest.open("POST", "/ajdbxt/user/User_haveFazhiyuan");
	xmlRequest.send(formDataFzy);
	xmlRequest.onreadystatechange = function() {
		if (xmlRequest.readyState == 4
				&& xmlRequest.status == 200) {
			var checkFzy = JSON.parse(xmlRequest.responseText);
			console.log("单位：" + $("#xzt_update_info_department").val()
					+ ":是否有法制员" + checkFzy);
			if (checkFzy == true) {
				// 判断该单位是否有所队长
				var xmlRequest_sdz = new XMLHttpRequest();
				var formDataSdz = new FormData();
				formDataSdz.append("police_department", $(
						"#xzt_update_info_department").val());
				xmlRequest_sdz.open("POST",
						"/ajdbxt/user/User_haveChief");
				xmlRequest_sdz.send(formDataSdz);
				xmlRequest_sdz.onreadystatechange = function() {
					if (xmlRequest_sdz.readyState == 4
							&& xmlRequest_sdz.status == 200) {
						var checkSdz = JSON
								.parse(xmlRequest_sdz.responseText);
						console.log("单位：" + $("#xzt_update_info_department").val()
								+ ":是否有所队长" + checkSdz);
						if (checkSdz == false) {
							clearPolicesLastUpdate();
							alert('该单位无所队长，不能添加案件!');
							return false;
						}else{
										console.log("修改指派");
										hideSecondPolice();
										clearPolicesLast();
										$.post('/ajdbxt/info/Info_save', $('#breakCase_modification form')
												.serialize(), function(Case_data) {
											// 所队长
											$('#update_info_department_captain_name').val(Case_data.cap.police_name);
											$('#update_info_department_captain_id').val(Case_data.cap.ajdbxt_police_id);
											// 所（队）法制员
											$('#xzt_update_team_legal').val(Case_data.team_legal.police_name);
											$('#xzt_update_team_legal_id').val(
													Case_data.team_legal.ajdbxt_police_id);
											//指派主办民警和协办民警
											$
											.post(
													'/ajdbxt/info/Info_getPolices',
													{
														"info.info_department" : $("#xzt_update_info_department").val()
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
														$("#xzt_update_main_police").html(
																option_main_police)
																.selectpicker(
																		'refresh');
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
														$("#xzt_update_assistant_police_one").html(
																option_assistant_one)
																.selectpicker(
																		'refresh');
														
													}, 'json');
											/*// 主办民警
											$
													.post(
															'/ajdbxt/info/Info_getPolices',
															{
																"info.info_department" : $("#xzt_update_info_department").val()
															},
															function(
																	Case_data_main) {
																var option = '';
																for (var len = 0; len < Case_data_main.length; len++) {
																	option += '<option';
																	if (Case_data.police[0].ajdbxt_police_id == Case_data_main[len].ajdbxt_police_id) {
																		option += ' selected';
																	}
																	option += ' value="'
																			+ Case_data_main[len].ajdbxt_police_id
																			+ '">'
																			+ Case_data_main[len].police_name
																			+ '</option>';
																}
																$("#xzt_update_main_police").html(
																				option)
																		.selectpicker(
																				'refresh');
																// 除去加载提示
																$('.load_remind').remove();
															}, 'json');

											// 协办民警1
											$
													.post(
															'/ajdbxt/info/Info_getPolices',
															{
																"info.info_department" : $("#xzt_update_info_department").val()
															},
															function(
																	Case_data_assistant_one) {
																var option = '';
																for (var len = 0; len < Case_data_assistant_one.length; len++) {
																	option += '<option';
																	if (Case_data.police[1].ajdbxt_police_id == Case_data_assistant_one[len].ajdbxt_police_id) {
																		option += ' selected';
																	}
																	option += ' value="'
																			+ Case_data_assistant_one[len].ajdbxt_police_id
																			+ '">'
																			+ Case_data_assistant_one[len].police_name
																			+ '</option>';
																}
																$("#xzt_update_assistant_police_one").html(
																				option)
																		.selectpicker(
																				'refresh');
																// 除去加载提示
																$('.load_remind').remove();
															}, 'json');*/
											
										}, 'json')}
								
							}
						}
					
				
			} else {
				clearPolicesLastUpdate();
				alert('该单位无法制员，不能添加案件!');
				return false;
			}
		}
	}


	
	
	
}
