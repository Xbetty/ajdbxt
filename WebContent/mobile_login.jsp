<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>

<head>
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
<title>移动端-登录</title>

<link href="<%=basePath%>css/mui.min.css" rel="stylesheet" />

<style>
body {
	font-size: 15px;
	background: url(/ajdbxt/img/ajdb0.jpg);
	background-size: 100%;
}

input {
	font-size: 15px;
	margin: 0 30px 0 0;
}

.center {
	position: absolute;
	top: 73%;
	left: 50%;
	width: 100%;
	height: 55%;
	padding: 30px;
	text-align: center;
	transform: translate(-50%, -50%);
}

.mui-btn {
	width: 96%;
	margin: 20px 0px 0 10px;
}

.mui-input-row label {
	width: 20%;
}
</style>
</head>

<body>
	<div class="mui-content">
		<form class="mui-input-group center">
			<div class="mui-input-row">
				<label> <span class="mui-icon mui-icon-person"
					style="line-height: 18px;"></span></label> <input type="text"
					class="mui-input-clear" id="userNumber" placeholder="用户名"
					width="80%">
			</div>
			<div class="mui-input-row">
				<label><span class="mui-icon mui-icon-locked"
					style="line-height: 18px;"></span></label> <input type="password"
					class="mui-input-password" id="password" placeholder="密码">
			</div>
			<%-- <div class="mui-checkbox">
				<span >
				<input name="remenber_pwd" value="1" type="checkbox" style="float:right;margin:10px 50px 0 0;">
				</span>
				<span style="float:right;line-height:50px;">
				记住密码
				</span>
			</div> --%>
			<div class="mui-button-row">
				<button type="button" style="width: 100%;"
					class="mui-btn mui-btn-primary" onclick="login()">确认登录</button>
			</div>
		</form>

	</div>
	<script type="text/javascript"
		src="<%=basePath%>js/User/mobile_login.js"></script>
	<script src="<%=basePath%>js/mui.min.js"></script>
	<script type="text/javascript">
		mui.init();
	</script>
</body>

</html>