var police_vo = null;// 人员列表接收数据
var loginRole = null;// 登录角色接收数据
var open_url = null;// 人员列表查询路径
var login_police_deparment = null;// 当前登录角色所在单位名字
var login_police_deparment_id = null;// 当前登录角色所在单位id
window.onload = function() {
	// --------------------
	// ------判断角色-------
	var xmlHttpRequest = new XMLHttpRequest();
	xmlHttpRequest.open("POST", "/ajdbxt/user/User_getPower");
	xmlHttpRequest.send(null);
	xmlHttpRequest.onreadystatechange = function() {
		if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
			loginRole = JSON.parse(xmlHttpRequest.responseText);
			login_police_deparment = loginRole.ajdbxt_department.department_name;// 当前登录角色所在单位名字赋值
			login_police_deparment_id = loginRole.ajdbxt_department.ajdbxt_department_id;// 当前登录角色所在单位名字赋值
			var option = '';// 单位选择
			if (loginRole.ajdbxt_police.police_power == "3") {
				// 列表查询页
				$('#mobile_select_police_department').html("所有单位");
				open_url = "/ajdbxt/user/User_queryForPage_mobile";// 异步查询路径，查询所有单位内人员
				// 添加人员时异步加载单位
				$
						.post(
								'/ajdbxt/user/User_findDepartmentByPage',
								function(Department_data) {
									// 所有部门循环

									for (var len = 0; len < Department_data.list.length; len++) {
										option += '<option ';
										option += ' value="'
												+ Department_data.list[len].ajdbxt_department_id
												+ '">'
												+ Department_data.list[len].department_name
												+ '</option>';
									}
									$('#input_police_department').html(
											'<option selected="selected" value="">请选择</option>'
													+ option);// 添加单位选项
								}, 'json');

				// 列表查询选择单位,mui插件
				(function($, doc) {
					$.init();
					$
							.ready(function() {
								/**
								 * 获取对象属性的值
								 * 主要用于过滤三级联动中，可能出现的最低级的数据不存在的情况，实际开发中需要注意这一点；
								 * 
								 * @param {Object}
								 *            obj 对象
								 * @param {String}
								 *            param 属性名
								 */
								var _getParam = function(obj, param) {
									return obj[param] || '';
								};
								// 普通示例
								var userPicker = new $.PopPicker();
								$(function() {
									$
											.post(
													'/ajdbxt/user/User_findDepartmentByPage',
													function(Department_data) {
														var depart_data = new Array();
														depart_data.push({
															value : "",
															text : "所有单位"
														});
														// 所有案件循环
														for (var len = 0; len < Department_data.list.length; len++) {
															depart_data
																	.push({
																		value : Department_data.list[len].ajdbxt_department_id,
																		text : Department_data.list[len].department_name
																	});
														}
														console
																.log(depart_data);
														userPicker
																.setData(depart_data);
													}, 'json');
								});

								/*
								 * var showUserPickerButton = doc
								 * .getElementById('showUserPicker');
								 */
								var mobile_select_police_department = doc
										.getElementById('mobile_select_police_department');
								var mobile_select_police_department_id = doc
										.getElementById('mobile_select_police_department_id');

								mobile_select_police_department
										.addEventListener(
												'tap',
												function(event) {
													userPicker
															.show(function(
																	items) {
																mobile_select_police_department_id.innerText = items[0].value;
																mobile_select_police_department.innerText = items[0].text;
																List_Police_By_Page(1);

																// 返回 false
																// 可以阻止选择框的关闭
																// return false;
															});
												}, false);
							});
				})(mui, document);

			} else {
				$('#mobile_select_police_department_id').html(
						login_police_deparment_id);
				$('#mobile_select_police_department').html(
						login_police_deparment);
				open_url = "/ajdbxt/user/User_queryForPageByDepartment_mobile";// 权限3以外的异步查询路径，只查询本单位内的人员
			}

			List_Police_By_Page(1);
			// 权限3出现新增人员
			if (loginRole.ajdbxt_police.police_power !== "1"
					&& loginRole.ajdbxt_police.police_power !== "2") {
				document.getElementById("div_police_add").style.display = "block";
			}
		}

	}

}

// -------------------------
// 列表显示
function List_Police_By_Page(pageIndex) {
	var input_PoliceSearchText = document
			.getElementById("input_PoliceSearchText").value;
	console.log("input_PoliceSearchText:" + input_PoliceSearchText);
	var mobile_select_police_department_id = document
			.getElementById("mobile_select_police_department_id").innerHTML;
	var formData = new FormData();
	var xhr = false;
	xhr = new XMLHttpRequest();
	console.log("pageIndex1:" + pageIndex);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				police_vo = JSON.parse(xhr.responseText);
				console.log("police_vo:" + police_vo);
				var new_li = null;
				var new_span0 = null;// 警员id
				var new_span1 = null;// 警员序号
				var new_span2 = null;// 警员名
				var new_span3 = null;// 单位名
				var new_a = null;// 案件名链接
				var input_name = null;

				// -----折叠信息-----
				var new_div = null;
				var new_form = null;// 折叠信息表单

				// 警号
				var new_input_row_jh = null;
				var new_label_jh = null;
				var new_input_jh = null;
				// 姓名
				var new_input_row_xm = null;
				var new_label_xm = null;
				var new_input_xm = null;
				// 单位
				var new_input_row_dw = null;
				var new_label_dw = null;
				var new_input_dw = null;
				// 职务
				var new_input_row_zw = null;
				var new_label_zw = null;
				var new_input_zw = null;
				// 权限
				var new_input_row_qx = null;
				var new_label_qx = null;
				var new_input_qx = null;
				// 手机号
				var new_input_row_sjh = null;
				var new_label_sjh = null;
				var new_input_sjh = null;
				// 按钮
				var new_row_button = null;
				var new_btn_xg = null;// 修改按钮
				var new_btn_sc = null;// 删除按钮

				var ul_police_list = document.getElementById("ul_police_list");

				/*
				 * 移出除标题以外的所有行
				 */

				var old_li = document.getElementsByClassName("new_li");
				var long = old_li.length;
				for (var i = 0; i < long; i++) {
					old_li[0].parentNode.removeChild(old_li[0]);
				}

				var str_page_row = null;
				console.log("police_vo.allRow:" + police_vo.allRow);
				if (police_vo.allRow > 0) {

					/*
					 * 移出除标题以外的所有行
					 */

					var old_li = document.getElementsByClassName("new_li");
					var long = old_li.length;
					for (var i = 0; i < long; i++) {
						old_li[0].parentNode.removeChild(old_li[0]);
					}

					/*
					 * 将数据库的数据取出来放到表格里
					 */
					for (var num = 0; num < police_vo.list.length; num++) {
						new_li = document.createElement("li");
						new_li.className = "mui-table-view-cell mui-collapse new_li";
						new_li.appendChild(document.createTextNode(''));
						ul_police_list.appendChild(new_li);
						/*
						 * 警员id
						 */
						new_span0 = document.createElement("span");
						new_li.appendChild(new_span0);
						new_span0.style.display = "none";
						new_span0.className = "input_ajdbxt_police_id";
						new_span0.innerHTML = police_vo.list[num].ajdbxt_police.ajdbxt_police_id;
						/*
						 * 0. a链接
						 */
						new_a = document.createElement("a");
						new_a.className = "mui-navigate-right";
						new_a.appendChild(document.createTextNode(''));
						new_li.appendChild(new_a);

						/*
						 * 1. 警员序号
						 */
						new_span1 = document.createElement("span");
						new_span1.innerHTML = num + 1;
						new_span1.style.margin = " 0 10px 0 0";
						new_span1.style.padding = " 0 10px";
						new_a.appendChild(new_span1);

						/*
						 * 2. 警员名字
						 */
						new_span2 = document.createElement("span");
						new_span2.innerHTML = police_vo.list[num].ajdbxt_police.police_name;
						input_name = new_span2.innerText;
						new_a.appendChild(new_span2);
						/*
						 * 3.单位/职务
						 */
						new_span3 = document.createElement("span");
						new_span3.className = "mui-badge mui-badge-blue";
						if (loginRole.ajdbxt_police.police_power == "3") {
							new_span3.innerHTML = police_vo.list[num].ajdbxt_department.department_name;

						} else {
							new_span3.innerHTML = police_vo.list[num].ajdbxt_police.police_duty;
						}
						new_a.appendChild(new_span3);
						/*
						 * 4. 折叠信息
						 */
						new_div = document.createElement("div");// 折叠信息div
						new_div.className = "mui-collapse-content mui-h5";
						new_div.style.text_indent = "25px";
						new_div.style.padding = "0 20px 0 20px";
						new_div.style.textIndent = "25px";
						new_form = document.createElement("form");
						new_form.className = "mui-input-group mui-h5";
						// 1警号
						new_input_row_jh = document.createElement("div");
						new_input_row_jh.className = "mui-input-row mui-h5";
						new_label_jh = document.createElement("label");
						new_label_jh.innerHTML = "警号";
						new_label_jh.style.padding = "11px 0px";
						new_input_jh = document.createElement("input");
						new_input_jh.className = "mui-input-clear  mui-h5";
						new_input_jh.value = police_vo.list[num].ajdbxt_police.police_serial_number;
						new_input_jh.type = "text";
						new_input_jh.disabled = "disabled";
						new_input_jh.style.paddingLeft = "20px";
						new_input_row_jh.appendChild(new_label_jh);
						new_input_row_jh.appendChild(new_input_jh);
						new_form.appendChild(new_input_row_jh);
						// 2姓名
						new_input_row_xm = document.createElement("div");
						new_input_row_xm.className = "mui-input-row";
						new_label_xm = document.createElement("label");
						new_label_xm.innerHTML = "姓名";
						new_label_xm.style.padding = "11px 0px";
						new_input_xm = document.createElement("input");
						new_input_xm.className = "mui-input-clear  mui-h5";
						new_input_xm.value = input_name;
						new_input_xm.type = "text";
						new_input_xm.disabled = "disabled";
						new_input_xm.style.paddingLeft = "20px";
						new_input_row_xm.appendChild(new_label_xm);
						new_input_row_xm.appendChild(new_input_xm);
						new_form.appendChild(new_input_row_xm);
						// 3单位
						new_input_row_dw = document.createElement("div");
						new_input_row_dw.className = "mui-input-row";
						new_label_dw = document.createElement("label");
						new_label_dw.innerHTML = "单位";
						new_label_dw.style.padding = "11px 0px";
						new_input_dw = document.createElement("input");
						new_input_dw.className = "mui-input-clear  mui-h5";
						new_input_dw.value = police_vo.list[num].ajdbxt_department.department_name;
						new_input_dw.type = "text";
						new_input_dw.disabled = "disabled";
						new_input_dw.style.paddingLeft = "20px";
						new_input_row_dw.appendChild(new_label_dw);
						new_input_row_dw.appendChild(new_input_dw);
						new_form.appendChild(new_input_row_dw);
						// 4职务
						new_input_row_zw = document.createElement("div");
						new_input_row_zw.className = "mui-input-row";
						new_label_zw = document.createElement("label");
						new_label_zw.innerHTML = "职务";
						new_label_zw.style.padding = "11px 0px";
						new_input_zw = document.createElement("input");
						new_input_zw.className = "mui-input-clear  mui-h5";
						new_input_zw.value = police_vo.list[num].ajdbxt_police.police_duty;
						new_input_zw.type = "text";
						new_input_zw.disabled = "disabled";
						new_input_zw.style.paddingLeft = "20px";
						new_input_row_zw.appendChild(new_label_zw);
						new_input_row_zw.appendChild(new_input_zw);
						new_form.appendChild(new_input_row_zw);
						// 5权限
						new_input_row_qx = document.createElement("div");
						new_input_row_qx.className = "mui-input-row";
						new_label_qx = document.createElement("label");
						new_label_qx.innerHTML = "权限";
						new_label_qx.style.padding = "11px 0px";
						new_input_qx = document.createElement("input");
						new_input_qx.className = "mui-input-clear  mui-h5";
						if (police_vo.list[num].ajdbxt_police.police_power == "3") {
							new_input_qx.value = "所有单位内管理";

						} else {
							new_input_qx.value = "单位内浏览";
						}
						new_input_qx.type = "text";
						new_input_qx.disabled = "disabled";
						new_input_qx.style.paddingLeft = "20px";
						new_input_row_qx.appendChild(new_label_qx);
						new_input_row_qx.appendChild(new_input_qx);
						new_form.appendChild(new_input_row_qx);
						// 6手机号码
						new_input_row_sjh = document.createElement("div");
						new_input_row_sjh.className = "mui-input-row";
						new_label_sjh = document.createElement("label");
						new_label_sjh.innerHTML = "电话";
						new_label_sjh.style.padding = "11px 0px";
						new_input_sjh = document.createElement("input");
						new_input_sjh.className = "mui-input-clear  mui-h5";
						new_input_sjh.value = police_vo.list[num].ajdbxt_police.police_phone_number;
						new_input_sjh.type = "text";
						new_input_sjh.disabled = "disabled";
						new_input_sjh.style.paddingLeft = "20px";
						new_input_row_sjh.appendChild(new_label_sjh);
						new_input_row_sjh.appendChild(new_input_sjh);
						new_form.appendChild(new_input_row_sjh);

						// 7按钮
						if (loginRole.ajdbxt_police.police_power == "3") {
							new_row_button = document.createElement("div");
							/* new_row_button.className = "mui-input-row"; */
							new_btn_xg = document.createElement("button");
							new_btn_xg.className = "mui-btn mui-btn-yellow btn_xg";
							new_btn_xg.innerHTML = "修改";
							new_btn_xg.id = police_vo.list[num].ajdbxt_police.ajdbxt_police_id;
							/* new_btn_xg.style.marginLeft = "5px"; */
							new_btn_xg.style.width = "50%";
							new_btn_xg.style.float = "left";
							new_btn_xg.style.borderRadius = "0px";
							new_btn_xg.style.margin = "0px";
							new_btn_xg.onclick = function() {
								window.location.href = "/ajdbxt/user/User_mobile_police_update?police_id="
										+ this.id;
								/*
								 * window.location.href =
								 * "/ajdbxt/user/User_mobile_police_update"
								 */
								return false;
							}
							new_btn_sc = document.createElement("button");
							new_btn_sc.className = "mui-btn mui-btn-red btn_sc";
							new_btn_sc.id = police_vo.list[num].ajdbxt_police.ajdbxt_police_id;
							new_btn_sc.innerHTML = "删除";
							new_btn_sc.style.margin = "0px";
							new_btn_sc.style.width = "50%";
							new_btn_sc.style.float = "left";
							new_btn_sc.style.borderRadius = "0px";
							// 删除按钮点击事件
							new_btn_sc.onclick = function() {
								var btn_id = this.id
								var btnArray = [ '是', '否' ];
								mui
										.confirm(
												'确定删除？',
												'提示',
												btnArray,
												function(e) {
													if (e.index == 0) {
														var formData = new FormData();
														formData.append("ids",
																btn_id);
														var xhr = new XMLHttpRequest();
														xhr
																.open("POST",
																		"/ajdbxt/user/User_batchDelete");
														xhr.send(formData);
														xhr.onreadystatechange = function() {
															if (xhr.readyState == 4
																	&& xhr.status == 200) {
																if (xhr.responseText == "success") {
																	mui
																			.toast("删除成功");
																	List_Police_By_Page(1);
																} else {
																	mui
																			.toast("删除失败");
																}
															}
														}

													}
												});
								return false;
							}// ---end 删除
							new_row_button.appendChild(new_btn_xg);
							new_row_button.appendChild(new_btn_sc);

							new_form.appendChild(new_row_button);

						}// -----按钮
						$("label").css("padding", "11px 0px");
						$("label").css("text-align", "center");
						$("input").css("padding", "0 30px");
						$("input").css("text-align", "right");
						new_div.appendChild(new_form);
						new_li.appendChild(new_div);

					}// ---for循环
					$("#ul_page_count").css("display","block");
				}/*-----if (police_vo.allRow > 0)*/
				else {
					$("#ul_police_list")
							.html(
									'<li class="mui-table-view-cell mui-collapse new_li" style="text-align:center;color:red;font-size:20px;margin:10px 0;">抱歉，无人员信息</li>');
					$("#ul_page_count").css("display","none");
				}
				console.log("police_vo.currPage:" + police_vo.currentPage);
				console.log("police_vo.totalPage:" + police_vo.totalPage);
				console.log("police_vo.countRecords:" + police_vo.allRow);
				// 翻页
				str_page_row = '<li class="mui-disabled "><span onclick="flip(2)"> &laquo; </span>';// 上一页
				str_page_row += '<span><select class="mui-select" id="select_page" style="padding:0 15px;margin-bottom:0px;">'
				for (var pageCount = 1; pageCount <= police_vo.totalPage; pageCount++) {
					str_page_row += '<option';
					if (pageCount == police_vo.currentPage) {
						str_page_row += ' selected="selected" ';
					}
					str_page_row += '><a>' + pageCount + ' </a></option>';
				}

				str_page_row += '</select></span>';
				str_page_row += '<span onclick="flip(3)">&raquo;</span></li>';// 下一页
				$("#ul_page_count").html(str_page_row);
				// 翻页跳转页面
				document.getElementById("select_page").onchange = function() {
					List_Police_By_Page(this.value);
					console.log(this.value);
				};// ---- 翻页

			}
		}
	}// ---onreadystatechange
	if (pageIndex == null || pageIndex.preventDefault) {
		pageIndex = 1;
	}

	console.log("pageIndex:" + pageIndex);
	formData.append("findPoliceByPageVO.currentPage", pageIndex);
	formData.append("findPoliceByPageVO.police_department",
			mobile_select_police_department_id);
	formData.append("findPoliceByPageVO.police_name", input_PoliceSearchText);
	console.log(open_url);
	xhr.open("POST", open_url);
	xhr.send(formData);

}

// -----------------------------
// --------添加人员--------------

function createPolice() {

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
	if (input_police_password == "") {
		mui.toast("请输入密码！");
		return false;
	}
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
				/*
				 * success 添加成功 failed 用户已存在 error 添加失败
				 */
				if (xhr.responseText == "success") {
					mui.toast("添加成功！");
					window.location.href = "/ajdbxt/user/User_mobile_police_one";
				} else if (xhr.responseText == "failed") {
					mui.toast("用户已存在！");
					return false;
				} else {
					mui.toast("添加失败！");
					return false;
				}

			} else {
				mui.toast(xhr.status);
			}
		}
	}

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
	xhr.open("POST", "/ajdbxt/user/User_addPolice");
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
/*
 * 判断页数
 */
function flip(flipPage) {
	switch (flipPage) {
	/* 首页 */
	case 1: {
		List_Police_By_Page(1)
		break;
	}
		/* 上一页 */
	case 2: {
		if (police_vo.currentPage - 1 == 0) {
			mui.toast("已经是第一页了");
		} else {
			List_Police_By_Page(police_vo.currentPage - 1);
		}
		break;
	}
		/* 下一页 */
	case 3: {
		if (police_vo.currentPage == police_vo.totalPage) {
			mui.toast("已经是最后一页了");
		} else {
			List_Police_By_Page(police_vo.currentPage + 1);
		}
		break;
	}
		/* 尾页 */
	case 4: {
		List_Police_By_Page(police_vo.totalPage);

		break;
	}

	}
}