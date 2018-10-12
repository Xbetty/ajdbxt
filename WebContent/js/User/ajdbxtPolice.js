var police_vo = null; // 接收后台传过来的数据
var login_police_deparment = null;// 当前登录角色所在单位名字
var login_police_deparment_id = null;// 当前登录角色所在单位id
var police_power_options = null;// 当前登录角色可选权限
var open_url = null;// 人员查询列表路径
var power_one_two = '<option value="1">单位内浏览</option>';// 角色1和2可选权限
// 角色3可选权限
var power_three = '<option value="1">单位内浏览</option><option value="3">所有单位内管理</option>';

// 列表显示
function List_Police_By_Page(pageIndex) {
	// --------------------
	// ------判断角色-------
	var xmlHttpRequest = new XMLHttpRequest();
	xmlHttpRequest.open("POST", "/ajdbxt/user/User_getPower");
	xmlHttpRequest.send(null);
	xmlHttpRequest.onreadystatechange = function() {
		if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
			var loginRole = JSON.parse(xmlHttpRequest.responseText);
			console.log("loginRole.ajdbxt_police.police_power:"
					+ loginRole.ajdbxt_police.police_power);
			login_police_deparment = loginRole.ajdbxt_department.department_name;// 当前登录角色所在单位名字赋值
			login_police_deparment_id = loginRole.ajdbxt_department.ajdbxt_department_id;// 当前登录角色所在单位名字赋值
			console.log("login_police_deparment:" + login_police_deparment);
			console.log("login_police_deparment_id:"
					+ login_police_deparment_id);
			if (loginRole.ajdbxt_police.police_power == "3") {
				police_power_options = power_three;// 角色3可选权限赋值
				open_url = "/ajdbxt/user/User_queryForPage";
			} else {
				var role_one = document.getElementsByClassName("role_one");
				for (var i = 0; i < role_one.length; i++) {
					role_one[i].onclick = function() {
						toastr.error("抱歉，您没有权限！");
					};
				}
				police_power_options = power_one_two;// 角色1可选权限赋值
				open_url = "/ajdbxt/user/User_queryForPageByDepartment";
			}

			var input_PoliceSearchText = document
					.getElementById("input_PoliceSearchText").value;
			console.log("input_PoliceSearchText:" + input_PoliceSearchText);
			// 选择单位
			var select_police_department = document
					.getElementById("select_police_department").value;
			var formData = new FormData();
			var xhr = false;
			xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						police_vo = JSON.parse(xhr.responseText);
						/*
						 * 
						 */

						var new_tr = null;
						var new_td = null;
						var table_police = document
								.getElementById("table_police");

						console.log("select_police_department:"
								+ select_police_department);
						/*
						 * 移出除标题以外的所有行
						 */

						var old_tr = document.getElementsByClassName("new_tr");
						var long = old_tr.length;
						for (var i = 0; i < long; i++) {
							old_tr[0].parentNode.removeChild(old_tr[0]);
							// table_police.firstElementChild.removeChild(old_tr[0]);
						}
						/*
						 * 判断是否有数据，如果有数据则异步添入数据，没有数据则显示提示信息
						 */
						if (police_vo.allRow > 0) {
							/*
							 * 将数据库的数据取出来放到表格里
							 */
							for (var num = 0; num < police_vo.list.length; num++) {
								new_tr = document.createElement("tr");
								new_tr.className = "new_tr";
								new_tr.appendChild(document.createTextNode(''));
								table_police.firstElementChild
										.appendChild(new_tr);
								/*
								 * 警察id
								 */
								new_td = document.createElement("td");
								new_tr.appendChild(new_td);
								new_td.style.display = "none";
								new_td.className = "input_ajdbxt_police_id";
								new_td.innerHTML = police_vo.list[num].ajdbxt_police.ajdbxt_police_id;
								/*
								 * 1. 序号
								 */
								new_td = document.createElement("td");
								new_tr.appendChild(new_td);
								new_td.innerHTML = num + 1;
								/*
								 * 2. 警号
								 */
								new_td = document.createElement("td");
								new_tr.appendChild(new_td);
								new_td.innerHTML = police_vo.list[num].ajdbxt_police.police_serial_number;
								/*
								 * 3. 姓名
								 */
								new_td = document.createElement("td");
								new_tr.appendChild(new_td);
								new_td.innerHTML = police_vo.list[num].ajdbxt_police.police_name;
								/*
								 * 4. 单位
								 */
								new_td = document.createElement("td");
								new_tr.appendChild(new_td);
								new_td.innerHTML = police_vo.list[num].ajdbxt_department.department_name;
								/*
								 * 5. 职务
								 */
								new_td = document.createElement("td");
								new_tr.appendChild(new_td);
								new_td.innerHTML = police_vo.list[num].ajdbxt_police.police_duty;
								/*
								 * 法制
								 * 
								 * new_td = document.createElement("td");
								 * new_tr.appendChild(new_td); if
								 * (police_vo.list[num].ajdbxt_police.police_legaler ==
								 * "1") { new_td.innerHTML = "是"; } else {
								 * new_td.innerHTML = "否"; }
								 */

								/*
								 * 5. 权限
								 */
								new_td = document.createElement("td");
								new_tr.appendChild(new_td);
								// 判断权限是不是3.如果是3则给予管理权限，只有权限3有管理权限，其他都没有
								if (police_vo.list[num].ajdbxt_police.police_power == "3") {
									new_td.innerHTML = "所有单位内管理";

								} else {
									new_td.innerHTML = "单位内浏览";
								}

								/*
								 * 6. 电话号码
								 */
								new_td = document.createElement("td");
								new_tr.appendChild(new_td);
								new_td.innerHTML = police_vo.list[num].ajdbxt_police.police_phone_number;

								/*
								 * 7. 操作
								 */
								new_td = document.createElement("td");
								new_tr.appendChild(new_td);
								new_td.innerHTML = '<i  id="'
										+ police_vo.list[num].ajdbxt_police.ajdbxt_police_id
										+ '" onClick=updatePolice(this) class="fa fa-pencil-square-o role_one" aria-hidden="true"></i>';
								new_td.style.cursor = "pointer";

								/*
								 * 8. 复选框
								 */
								new_td = document.createElement("td");
								new_td.appendChild(document.createTextNode(''));
								new_tr.appendChild(new_td);
								new_td.innerHTML = '<label class="fancy-checkbox" >'
										+ '<input  type="checkbox" class="checkbox_select">'
										+ '<span></span></label></div>';

							}
							/*
							 * 
							 */
							var i_pulse = document.getElementById("i_pulse");
							i_pulse.style.display = "none";

							// --------------------
							// ------判断角色，只有权限3可以进行修改操作-------
							var xmlHttpRequest = new XMLHttpRequest();
							xmlHttpRequest.open("POST",
									"/ajdbxt/user/User_getPower");
							xmlHttpRequest.send(null);
							xmlHttpRequest.onreadystatechange = function() {
								if (xmlHttpRequest.readyState == 4
										&& xmlHttpRequest.status == 200) {
									var loginRole = JSON
											.parse(xmlHttpRequest.responseText);
									if (loginRole.ajdbxt_police.police_power !== "3") {
										var role_one = document
												.getElementsByClassName("role_one");
										for (var i = 0; i < role_one.length; i++) {
											role_one[i].onclick = function() {
												toastr.error("抱歉，您没有权限！");
											};// --end function
										}// ---end for
									}// --end if 权限
								}// --end if 异步

							}// --end function
							document.getElementById("page_flip").style.display = "block";// 显示翻页
							document.getElementById("btn_delete").style.display = "block";// 显示删除按钮

						} else {
							new_tr = document.createElement("tr");
							new_tr.className = "new_tr";
							new_tr.appendChild(document.createTextNode(''));
							table_police.firstElementChild.appendChild(new_tr);
							document.getElementById("btn_delete").style.display = "none";// 隐藏删除按钮
							document.getElementById("page_flip").style.display = "none";// 隐藏翻页
							$(new_tr)
									.html(
											'<td colspan="9" style="text-align:center;color:red;font-size:20px;margin:10px 0;">抱歉，无人员信息</td>');
						}

						/*
						 * * 设置页数 /
						 */
						document.getElementById("span_pageIndex").innerHTML = police_vo.currentPage;// 当前页
						document.getElementById("span_totalPages").innerHTML = police_vo.totalPage;// 总页数
						document.getElementById("span_totalRecords").innerHTML = police_vo.allRow;// 总记录数
						document.getElementById("checkbox_all_select").checked = false;

					} else {
						toastr.error(xhr.status);
					}

				}
			}
			if (pageIndex == null || pageIndex.preventDefault) {
				pageIndex = 1;
			}
			// console.log("pageIndex:" + pageIndex);
			formData.append("findPoliceByPageVO.currentPage", pageIndex);
			formData.append("findPoliceByPageVO.police_department",
					select_police_department);
			formData.append("findPoliceByPageVO.police_name",
					input_PoliceSearchText);
			xhr.open("POST", open_url);
			xhr.send(formData);

		}

	}// onreadystatechange

}
// --------------------------------------
// --------新增人员---------

function createPolice() {
	var jc = $
			.confirm({
				smoothContent : false,
				columnClass : 'col-md-6 col-md-offset-3',
				title : '新增人员',
				content : '<table class="table table-hover" ><tbody>'
						+ '<tr><td>警号:</td><td><input type="text" id="input_police_serial_number" class="form-control" placeholder="请输入警号" /></td></tr>'
						+ '<tr><td>密码:</td><td><input type="text" id="input_police_password" class="form-control" placeholder="请输入密码" /></td></tr>'
						+ '<tr><td>姓名:</td><td><input type="text" id="input_police_name" class="form-control" placeholder="请输入姓名" /></td></tr>'
						+ '<tr><td>单位:</td><td><select id="input_police_department" class="form-control" onchange="selectDepartment()" >'
						+ '<option selected="selected" value="">请选择</option>'
						+ '</select></td></tr>'
						+ '<tr><td>职务:</td><td><select id="input_police_duty" class="form-control" >'
						+ '<option selected="selected" value="">请选择</option>'
						+ '<option  value="警员">警员</option>'
						+ '<option  value="副所队长">副所队长</option>'
						+ '<option value="所队长">所队长</option>'
						+ '<option  value="副局长">副局长</option>'
						+ '<option value="局长">局长</option>'
						+ '<option value="政委">政委</option>'
						+ '<option value="教导员">教导员</option>'
						+ '</select></td></tr>'
						+ '<tr id="tr_fzy"><td>法制员:</td><td><select id="input_police_legaler" class="form-control">'
						+ '<option selected="selected" value="">请选择</option>'
						+ '<option  value="1">是</option>'
						+ '<option value="2">否</option>'
						+ '</select></td></tr>'
						+ '<tr><td>权限:</td><td><select id="input_police_power" class="form-control" >'
						+ '<option selected="selected" value="">请选择</option>'
						+ police_power_options
						+ '</select></td></tr>'
						+ '<tr><td>手机号码:</td><td><input type="text" id="input_police_phone_number" class="form-control" placeholder="请输入手机号码" maxlength="11"/></td></tr>'
						+ '</tbody></table>',
				buttons : {
					创建 : function() {
						// 警号
						var input_police_serial_number = document
								.getElementById("input_police_serial_number").value;
						if (input_police_serial_number == "") {
							toastr.error("请输入警号！");
							return false;
						}
						// 密码
						var input_police_password = document
								.getElementById("input_police_password").value;
						if (input_police_password == "") {
							toastr.error("请输入密码！");
							return false;
						}
						// 姓名
						var input_police_name = document
								.getElementById("input_police_name").value;
						if (input_police_name == "") {
							toastr.error("请输入姓名！");
							return false;
						}
						// 单位
						var input_police_department = document
								.getElementById("input_police_department").value;
						if (input_police_department == "") {
							toastr.error("请选择单位！");
							return false;
						}
						// 职务
						var input_police_duty = document
								.getElementById("input_police_duty").value;
						if (input_police_duty == "") {
							toastr.error("请选择职位！");
							return false;
						}
						// 法制员

						var input_police_legaler = document
								.getElementById("input_police_legaler").value;
						if (input_police_legaler == "") {
							toastr.error("请选择是否为法制员！");
							return false;
						}
						// 角色
						var input_police_power = document
								.getElementById("input_police_power").value;
						if (input_police_power == "") {
							toastr.error("请选择权限！");
							return false;
						}
						// 手机号码
						var input_police_phone_number = document
								.getElementById("input_police_phone_number").value;
						if (input_police_phone_number == "") {
							toastr.error("请输入手机号码！");
							return false;
						}

						if (!(/^1[34578]\d{9}$/.test(input_police_phone_number))) {
							toastr.error("手机号码有误，请重新输入！");
							return false;
						}
						/* 验证是否有法制员 */

						var xmlRequest = new XMLHttpRequest();
						console.log("input_police_department:"
								+ input_police_department);
						var formDataFzy = new FormData();
						formDataFzy.append("police_department",
								input_police_department);
						xmlRequest.open("POST",
								"/ajdbxt/user/User_haveFazhiyuan");
						xmlRequest.send(formDataFzy);
						xmlRequest.onreadystatechange = function() {
							if (xmlRequest.readyState == 4
									&& xmlRequest.status == 200) {
								var checkFzy = JSON
										.parse(xmlRequest.responseText);
								console.log("checkFzy:" + checkFzy);
								if (checkFzy == "是") {
									toastr.error("该单位已有法制员，请重新选择！");
									return false;
								}
							}
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
										toastr.success("添加成功！");
										List_Police_By_Page(1);
									} else if (xhr.responseText == "failed") {
										toastr.error("用户已存在！");
										return false;
									} else {
										toastr.error("添加失败！");
										return false;
									}

								} else {
									toastr.error(xhr.status);
								}
							}
						}

						// 警号
						formData.append("ajdbxt_police.police_serial_number",
								input_police_serial_number);
						// 密码
						formData.append("ajdbxt_police.police_password",
								input_police_password);
						// 姓名
						formData.append("ajdbxt_police.police_name",
								input_police_name);
						// 单位
						formData.append("ajdbxt_police.police_department",
								input_police_department);
						// 职位
						formData.append("ajdbxt_police.police_duty",
								input_police_duty);
						// 法制员
						formData.append("ajdbxt_police.police_legaler",
								input_police_legaler);
						// 角色
						formData.append("ajdbxt_police.police_power",
								input_police_power);
						// 手机号码
						formData.append("ajdbxt_police.police_phone_number",
								input_police_phone_number);

						xhr.open("POST", "/ajdbxt/user/User_addPolice");
						xhr.send(formData);

					},
					取消 : function() {

					}
				},
				onContentReady : function() {

					var xmlHttpRequest = new XMLHttpRequest();
					xmlHttpRequest.open("POST", "/ajdbxt/user/User_getPower");
					xmlHttpRequest.send(null);
					xmlHttpRequest.onreadystatechange = function() {
						if (xmlHttpRequest.readyState == 4
								&& xmlHttpRequest.status == 200) {
							var loginRole = JSON
									.parse(xmlHttpRequest.responseText);
							var option = '';
							if (loginRole.ajdbxt_police.police_power == "3") {
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
													$(
															'#input_police_department')
															.html(
																	'<option selected="selected" value="">请选择</option>'
																			+ option);
												}, 'json');

							} else {
								option += '<option value="'
										+ login_police_deparment_id + '">'
										+ login_police_deparment + '</option>';
								$('#input_police_department').html(option);
							}
						}

					}

				}

			});

}

// -----------------------------
// --------删除人员--------------
function deletePolice() {

	$.confirm({
		smoothContent : false,
		title : '警告！删除人员信息',
		content : '此操作将删除所有所选的人员信息',
		type : 'red',
		autoClose : '取消|5000',// 自动关闭
		buttons : {
			删除 : {
				btnClass : 'btn-red',
				action : function() {
					var xhr = false;
					xhr = new XMLHttpRequest();
					xhr.onreadystatechange = function() {
						if (xhr.readyState == 4) {
							if (xhr.status == 200) {
								if (xhr.responseText == "success") {
									toastr.success("删除成功");
									List_Police_By_Page(1);
								} else {
									toastr.error("删除失败");
								}
							} else {
								toastr.error(xhr.status);
							}
						}
					}
					var checkbox_select = document
							.getElementsByClassName("checkbox_select");
					var input_ajdbxt_police_id = document
							.getElementsByClassName("input_ajdbxt_police_id");

					var formData = new FormData();
					for (var num = 0; num < checkbox_select.length; num++) {
						if (checkbox_select[num].checked) {
							formData.append("ids",
									input_ajdbxt_police_id[num].innerHTML);

						}
					}
					xhr.open("POST", "/ajdbxt/user/User_batchDelete");
					xhr.send(formData);
				}
			},
			取消 : function() {
			}
		}
	});

}

// --------------------------------------
// --------修改人员---------
var update_fzy="";
function updatePolice(button) {
	var jc = $
			.confirm({
				smoothContent : false,
				columnClass : 'col-md-6 col-md-offset-3',
				title : '人员信息详情',
				content : '<table class="table table-hover"><tbody>'
						+ '<tr style="display:none;"><td>Id:</td><td><input type="text" id="input_ajdbxt_police_id" class="form-control" /></td></tr>'
						+ '<tr><td>警号:</td><td><input type="text" id="input_police_serial_number" class="form-control" disabled="disabled" /></td></tr>'
						+ '<tr style="display:none;"><td>密码:</td><td><input type="text" id="input_police_password" class="form-control" /></td></tr>'
						+ '<tr><td>姓名:</td><td><input type="text" id="input_police_name" class="form-control" /></td></tr>'
						+ '<tr><td>单位:</td><td><select id="input_police_department" class="form-control" onchange="selectDepartment()">'
						+ '</select></td></tr>'
						+ '<tr><td>职务:</td><td><select id="input_police_duty" class="form-control" >'
						+ '<option  value="警员">警员</option>'
						+ '<option  value="副所队长">副所队长</option>'
						+ '<option value="所队长">所队长</option>'
						+ '<option  value="副局长">副局长</option>'
						+ '<option value="局长">局长</option>'
						+ '<option value="政委">政委</option>'
						+ '<option value="教导员">教导员</option>'
						+ '</select></td></tr>'
						+ '<tr id="tr_fzy"><td>法制员:</td><td><select id="input_police_legaler" class="form-control" onchange="changeFazhiyuan()">'
						+ '<option value="1">是</option>'
						+ '<option value="2">否</option>'
						+ '</select></td></tr>'
						+ '<tr><td>权限:</td><td><select id="input_police_power" class="form-control" >'
						+ police_power_options
						+ '</select></td></tr>'
						+ '<tr><td>手机号码:</td><td><input type="text" id="input_police_phone_number" class="form-control" maxlength="11"  /></td></tr>'
						+ '</tbody></table>',
				buttons : {
					修改 : function() {
						var input_ajdbxt_police_id = document
								.getElementById("input_ajdbxt_police_id").value;
						// 警号
						var input_police_serial_number = document
								.getElementById("input_police_serial_number").value;

						if (input_police_serial_number == "") {
							toastr.error("请输入警号！");
							return false;
						}
						// 密码
						var input_police_password = document
								.getElementById("input_police_password").value;
						// 姓名
						var input_police_name = document
								.getElementById("input_police_name").value;
						if (input_police_name == "") {
							toastr.error("请输入姓名！");
							return false;
						}
						// 单位
						var input_police_department = document
								.getElementById("input_police_department").value;
						if (input_police_department == "") {
							toastr.error("请选择单位！");
							return false;
						}
						// 职务
						var input_police_duty = document
								.getElementById("input_police_duty").value;
						if (input_police_duty == "") {
							toastr.error("请选择职务！");
							return false;
						}
						// 法制员
						var input_police_legaler = document
								.getElementById("input_police_legaler").value;
						if (input_police_legaler == "") {
							toastr.error("请选择是否为法制员！");
							return false;
						}
						// 角色
						var input_police_power = document
								.getElementById("input_police_power").value;
						if (input_police_power == "") {
							toastr.error("请选择权限！");
							return false;
						}
						// 手机号码
						var input_police_phone_number = document
								.getElementById("input_police_phone_number").value;
						if (input_police_phone_number == "") {
							toastr.error("请输入手机号码！");
							return false;
						}
						if (!(/^1[34578]\d{9}$/.test(input_police_phone_number))) {
							toastr.error("手机号码有误，请重新输入！");
							return false;
						}
						var formData = new FormData();

						var xhr = false;
						xhr = new XMLHttpRequest();
						xhr.onreadystatechange = function() {
							if (xhr.readyState == 4) {
								if (xhr.status == 200) {
									if (xhr.responseText == "success") {
										toastr.success("修改成功！");
										List_Police_By_Page(1);
									} else {
										toastr.error("修改失败！");
										return false;
									}

								} else {
									toastr.error(xhr.status);
								}
							}
						}
						// id
						formData.append("ajdbxt_police.ajdbxt_police_id",
								input_ajdbxt_police_id);
						// 警号
						formData.append("ajdbxt_police.police_serial_number",
								input_police_serial_number);
						// 密码
						formData.append("ajdbxt_police.police_password",
								input_police_password);
						// 姓名
						formData.append("ajdbxt_police.police_name",
								input_police_name);
						// 单位
						formData.append("ajdbxt_police.police_department",
								input_police_department);
						// 职位
						formData.append("ajdbxt_police.police_duty",
								input_police_duty);
						// 法制员
						formData.append("ajdbxt_police.police_legaler",
								input_police_legaler);
						// 角色
						formData.append("ajdbxt_police.police_power",
								input_police_power);
						// 手机号码
						formData.append("ajdbxt_police.police_phone_number",
								input_police_phone_number);

						xhr.open("POST", "/ajdbxt/user/User_updatePolice");
						xhr.send(formData);

					},
					取消 : function() {

					}
				},
				onContentReady : function() {
					var update_police_vo = null;
					var button_id = button.id;
					var formData = new FormData();
					var update_xhr = new XMLHttpRequest();
					formData
							.append("ajdbxt_police.ajdbxt_police_id", button_id);
					update_xhr.open("POST", "/ajdbxt/user/User_findPoliceById");
					update_xhr.send(formData);
					update_xhr.onreadystatechange = function() {
						if (update_xhr.readyState == 4) {
							if (update_xhr.status == 200) {
								update_police_vo = JSON
										.parse(update_xhr.responseText);
								console.log("xhr.readyState:"
										+ update_xhr.readyState);
								console.log("xhr.status:" + update_xhr.status);
								var ajdbxt_police_id = update_police_vo.ajdbxt_police.ajdbxt_police_id;
								console.log("ajdbxt_police_id:"
										+ ajdbxt_police_id);
								if (ajdbxt_police_id == button_id) {
									console
											.log("ajdbxt_police_id == button_id:"
													+ ajdbxt_police_id == button_id);

									// Id
									var input_ajdbxt_police_id = document
											.getElementById("input_ajdbxt_police_id");
									input_ajdbxt_police_id.value = ajdbxt_police_id;

									// 警号
									var input_police_serial_number = document
											.getElementById("input_police_serial_number");
									input_police_serial_number.value = update_police_vo.ajdbxt_police.police_serial_number;
									// 密码
									var input_police_password = document
											.getElementById("input_police_password");
									input_police_password.value = update_police_vo.ajdbxt_police.police_password;
									console.log("input_police_password:"
											+ input_police_password.value);

									// 姓名
									var input_police_name = document
											.getElementById("input_police_name");
									input_police_name.value = update_police_vo.ajdbxt_police.police_name;

									// 单位
									var xmlHttpRequest = new XMLHttpRequest();
									xmlHttpRequest.open("POST",
											"/ajdbxt/user/User_getPower");
									xmlHttpRequest.send(null);
									xmlHttpRequest.onreadystatechange = function() {
										if (xmlHttpRequest.readyState == 4
												&& xmlHttpRequest.status == 200) {
											var loginRole = JSON
													.parse(xmlHttpRequest.responseText);
											var option = '';

											if (loginRole.ajdbxt_police.police_power == "3") {
												var deparment = update_police_vo.ajdbxt_department.ajdbxt_department_id;

												$
														.post(
																'/ajdbxt/user/User_findDepartmentByPage',
																function(
																		Department_data) {

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
																	$(
																			'#input_police_department')
																			.html(
																					option);
																	
																	var input_police_department_text=$("#input_police_department").find("option:selected").text();
																	console.log("单位："+input_police_department_text );
																	if (input_police_department_text== "公安局" || input_police_department_text== "法制大队") {
																		document.getElementById("input_police_legaler").value = "2";
																		document.getElementById("input_police_legaler").disabled = "disabled";
																	}
																	/*haveFazhiyuan(update_police_vo.ajdbxt_department.department_name);*/
																}, 'json');

											} else {
												option += '<option value="'
														+ login_police_deparment_id
														+ '">'
														+ login_police_deparment
														+ '</option>';
												$('#input_police_department')
														.html(option);
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
									input_police_legaler.value = update_police_vo.ajdbxt_police.police_legaler;
									update_fzy=update_police_vo.ajdbxt_police.police_legaler;
									// 角色
									var input_police_power = document
											.getElementById("input_police_power");
									input_police_power.value = update_police_vo.ajdbxt_police.police_power;

									// 手机号码
									var input_police_phone_number = document
											.getElementById("input_police_phone_number");
									input_police_phone_number.value = update_police_vo.ajdbxt_police.police_phone_number;
								}
							}
						}

					}
				}
			});
}
// 添加修改单位为法制大队，权限自动赋予3，其他为1
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
					return;
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
						alert("该单位已有法制员！");
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
			toastr.warning("已经是第一页了");
		} else {
			List_Police_By_Page(police_vo.currentPage - 1);
		}
		break;
	}
		/* 下一页 */
	case 3: {
		if (police_vo.currentPage == police_vo.totalPage) {
			toastr.warning("已经是最后一页了");
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