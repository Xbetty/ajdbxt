<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>


<title>人员管理</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style type="text/css">
.table_police tbody tr {
	text-align: center;
}

#page_flip span a:hover {
	cursor: pointer;
}
</style>
</head>

<body>
	<s:action name="User_navbar" namespace="/user" executeResult="true" />

	<div style="margin: 80px 0 0 0; float: left; width: 100%;">
		<div class="panel" style="width: 95%; margin: 20px auto;">
			<!--  -->
			<div class="panel-heading">
				<h3 class="panel-title">人员管理</h3>
			</div>
			<div class="panel-body">
				<div class="col-md-12">
					<div class="panel">

						<!--  -->
						<div class="panel-body">
							<div style="height: 34px; width: 100%;">
								<div style="width: 150px; float: left; margin: 0 20px 0 0">
									<button class="btn btn-default role_one"
										onclick="createPolice()">
										<i class="fa fa-plus-square"></i> 新增人员
									</button>

								</div>
								<!-- 检索 -->
								<div class="input-group" style="width: 300px; float: right;">
									<input id="input_PoliceSearchText" class="form-control" oninput="List_Police_By_Page(1);" type="text" placeholder="搜索警号、姓名或电话号码" />
									<span class="input-group-addon" style="border-radius: unset;">
										<i class="fa fa-search"></i>   
									</span>
								</div>

							</div>

							<table id="table_police" class="table table-hover "
								style="text-align: center; margin: 20px 0;">
								<tbody>
									<tr>
										<th>序号</th>
										<th>警号</th>
										<th>姓名</th>
										<th><select id="select_police_department" onchange="List_Police_By_Page(1);"
											style="background-color: #fcfcfc; text-align: center; border: 0px; width: 100%;"><option
													value="">所有单位</option></select></th>
										<th>职务</th>
										<!-- <th>法制员</th> -->
										<th>权限</th>
										<th>手机号码</th>
										<th>操作</th>
										<th><label class="fancy-checkbox"> <input
												id="checkbox_all_select" type="checkbox"
												onclick="all_select()"> <span></span>
										</label></th>
									</tr>
								</tbody>
							</table>
							<!-- 加载图标 -->
							<div id="i_pulse" style="text-align: center;">
								<i class="fa fa-spinner fa-pulse fa-3x"></i>
							</div>
							<!-- 删除按钮 -->
							<div style="height: 34px;display:none;" id="btn_delete" >
								<button class="btn btn-danger role_one" onclick="deletePolice()"
									style="float: right; margin: 0 10px;">
									<i class="fa fa-trash-o"></i> 删除所选
								</button>
							</div>
							<!--翻页  -->
							<div id="page_flip"
								style="margin: 0 auto; width: 400px; text-align: center;display:none;">
								<span> <a onclick="flip(1)"><i
										class="fa fa-angle-double-left">首页</i> </a> &nbsp&nbsp <a
									onclick="flip(2)"><i class="fa fa-angle-left"></i>上一页 </a>
									&nbsp&nbsp <a onclick="flip(3)">下一页<i
										class="fa fa-angle-right"></i>
								</a> &nbsp&nbsp <a onclick="flip(4)">尾页<i
										class="fa fa-angle-double-right"></i>
								</a> <br />
									<p class='info' style="margin-top: 5px;">
										第<span id="span_pageIndex">1</span>页&nbsp&nbsp共 <span
											id="span_totalPages">1</span>页&nbsp&nbsp共 <span
											id="span_totalRecords">0</span>条记录

									</p></span>

							</div>

						</div>
					</div>
					<!-- END TABLE HOVER -->
				</div>

			</div>
		</div>
	</div>

	<script type="text/javascript" src="<%=basePath%>js/icheck.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/Input_Select.js"></script>
	<script type="text/javascript"
		src="<%=basePath%>js/User/ajdbxtPolice.js"></script>
	<script type="text/javascript">
		var xmlHttpRequest = new XMLHttpRequest();
		xmlHttpRequest.open("POST", "/ajdbxt/user/User_getPower");
		xmlHttpRequest.send(null);
		xmlHttpRequest.onreadystatechange = function() {
			if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
				var loginRole = JSON.parse(xmlHttpRequest.responseText);
				login_police_deparment = loginRole.ajdbxt_department.department_name;// 当前登录角色所在单位名字赋值
				login_police_deparment_id = loginRole.ajdbxt_department.ajdbxt_department_id;// 当前登录角色所在单位名字赋值
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
										$('#select_police_department').html(
												'<option selected="selected" value="">所有单位</option>'
														+ option);
									}, 'json');

				} else {
					option += '<option value="'
						+ login_police_deparment_id + '">'
							+ login_police_deparment + '</option>';
					$('#select_police_department').html(option);
				}
			}

		}

		List_Police_By_Page(1);
	</script>

</body>
</html>
