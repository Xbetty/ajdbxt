<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
<!--------------------------------------------------------------------------------->
<script src="<%=basePath%>js/jquery-3.1.1.min.js"></script>
<script src="<%=basePath%>js/bootstrap.min.js"></script>
<link rel="stylesheet" href="<%=basePath%>css/bootstrap.min.css">
<!--------------------------------------------------------------------------------->
<link rel="stylesheet" href="<%=basePath%>css/bootstrap-select.min.css">
<script src="<%=basePath%>js/bootstrap-select.js"></script>
<!--------------------------------------------------------------------------------->
<link rel="stylesheet"
	href="<%=basePath%>css/navbar/chartist-custom.css">
<link rel="stylesheet" href="<%=basePath%>css/navbar/main.css">
<link rel="stylesheet"
	href="<%=basePath%>css/navbar/font-awesome.min.css">
<link rel="stylesheet" href="<%=basePath%>css/navbar/style.css">
<link rel="stylesheet" href="<%=basePath%>css/table.css">
<!--------------------------------------------------------------------------------->
<link rel="stylesheet" href="<%=basePath%>css/toastr.css" />
<script src="<%=basePath%>js/toastr.js"></script>
<!--------------------------------------------------------------------------------->
<link rel="stylesheet" href="<%=basePath%>css/jquery-confirm.css" />
<script src="<%=basePath%>js/jquery-confirm.js"></script>
<!--------------------------------------------------------------------------------->
<script src="<%=basePath%>js/jquery.bootstrap.wizard.js"></script>
<script src="<%=basePath%>js/jquery.slimscroll.min.js"></script>
<script src="<%=basePath%>js/klorofil-common.js"></script>

<!--------------------------------------------------------------------------------->
<link rel="stylesheet" href="<%=basePath%>css/jquery.datetimepicker.css" />
<script type="text/javascript"
	src="<%=basePath%>js/jquery.datetimepicker.full.js"></script>
<!--------------------------------------------------------------------------------->
<script type="text/javascript"
	src="<%=basePath%>js/User/updatePassword.js"></script>
<link rel="stylesheet" href="<%=basePath%>css/jquery.datetimepicker.css" />
<script type="text/javascript" src="<%=basePath%>js/jquery.datetimepicker.full.js"></script>
<!--------------------------------------------------------------------------------->
<!--------------------------------------------------------------------------------->
<!---页面公用------------------------------------------------------------------------------>
<!--------------------------------------------------------------------------------->
<!--------------------------------------------------------------------------------->
<title>Insert title here</title>
<style type="text/css">
.navbar-default .navbar-nav>.open>a, .navbar-default .navbar-nav>.open>a:hover,
	.navbar-default .navbar-nav>.open>a:focus {
	background-color: #0d4487;
}
</style>
</head>
<body>
	<div id="wrapper">
		<nav class="navbar navbar-default navbar-fixed-top"
			style="background-color:#13599d;">
		<div
			style="width: auto; float: left; line-height: 78px; margin: 0 0 0 30px; font-size: 30px; color: white;">
			<img alt="" src="<%=basePath%>img/hui.png">案件督办系统
		</div>
		<div id="navbar-menu">
			<ul class="nav navbar-nav navbar-left" style="margin: 0 0 0 20px">
				<li class="dropdown" style="float: left;"><a
					href="<%=basePath%>user/User_index"> <span>首页</span>
				</a></li>
				<!--  -->
				<li class="dropdown" style="float: left;"><a
					href="<%=basePath%>info/Info_page_CaseInfo"> <span>案件</span>
						
				</a>
					</li>
				<!--  -->

<%-- 				<li class="dropdown" style="float: left;"><a href="<%=basePath%>process/Process_page_process" --%>
<%-- 					> <span>办案流程</span> --%>

<!-- 						<i class="icon-submenu lnr lnr-chevron-down"></i> -->
<!-- 				</a></li> --%> -->
<%-- 				<li class="dropdown" style="float: left;"><a href="<%=basePath%>process/page_list_CaseProcessProcessAction"> <span>办案流程</span> --%>


				<li class="dropdown" style="float: left;"><a href="<%=basePath%>total/Total_page_listDepartmentCaseStatistics" > <span>统计</span>
						<!-- <i class="icon-submenu lnr lnr-chevron-down"></i> -->
				</a>
					<ul class="dropdown-menu">
						<li class="teacher_control"><a href="#"></a></li>
						<li class="teacher_control"><a href="#"></a></li>
					</ul></li>
				<!--  -->
				<li class="dropdown" style="float: left;"><a href="<%=basePath%>user/User_userPage"> <span>人员</span>
				</a></li>
				<!--  -->
			</ul>
			<!--  -->
			<ul class="nav navbar-nav navbar-right" style="margin: 0 0px 0 0">
				<!--  -->
				<li class="dropdown"><a href="#" class="dropdown-toggle"
					data-toggle="dropdown"> <i class="fa fa-user-circle"></i>
					<!-- 登录用户名 -->
					    <span id="USER_NAME"><s:property value="#session.loginPolice.ajdbxt_police.police_name"/></span>
					    <!-- 登陆用户id -->
						<span id="loginer_id" hidden><s:property value="#session.loginPolice.ajdbxt_police.ajdbxt_police_id"/></span>
						<!-- 登录用户权限 -->
						<span id="loginer_permission" hidden><s:property value="#session.loginPolice.ajdbxt_police.police_power"/></span>
						<i class="icon-submenu lnr lnr-chevron-down"></i>
				</a>
					<ul class="dropdown-menu">
						<%-- <li>
							<a href="#">
								<i class="lnr lnr-user"></i>
								<span>我的信息</span>
							</a>
						</li> --%>
						<li data-toggle="modal" data-target="#updatePassword"><a
							href="#"> <i class="lnr lnr-lock"></i> <span>修改密码</span>
						</a></li>
						<li><a href="<%=basePath%>user/User_loginout"> <i
								class="lnr lnr-exit"></i> <span>退出登录</span>
						</a></li>
					</ul></li>
				<!--  -->
			</ul>
		</div>
		</nav>
		<!-------------------------------------------------修改密码---------------------------------------------------------------  -->
			<div class="modal fade" id="updatePassword" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <h4 class="modal-title" id="myModalLabel">修改用户</h4>
			      </div>
			      <div class="modal-body">
			      	 	<div id="passwordLoadingDiv" style="width: 319px; margin: 0 auto; display: none;">
							<img alt="" src="<%=basePath %>img/loading.gif">
						</div>
			      		<div id="passwordContent">		      			
				      		<label>新密码：</label>
				      		<input id="newPassword" type="password" class="form-control" placeholder="请输入新密码">
				      		<label>再次输入：</label>
				      		<input id="newPasswordAgain" type="password" class="form-control" placeholder="再次输入新密码">
			      		</div>
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
			        <button id="updatePwBtn" onclick="updatePassword()" type="button" class="btn btn-primary">修改</button>
			      </div>
			    </div><!-- /.modal-content -->
			  </div><!-- /.modal-dialog -->
			</div>
</body>
<style>
#wrapper nav>div>ul>li>a {
	color: white;
}

td {
	line-height: 33px !important;
}

td i {
	line-height: 33px !important;
}

td button i {
	line-height: 20px !important;
}

td .label {
	line-height: 33px !important;
}
</style>
<script>
	
</script>
</html>