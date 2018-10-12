<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!doctype html>
<html>

<head>
<meta charset="UTF-8">
<title>手机端—修改人员</title>
<meta name="viewport"
	content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
<style>
.index_nav {
	background-color: #007aff;
	color: white;
	font-size: 15px;
}

.index_nav h1,.index_nav  a {
	color: white;
}

.mui-input-row select,.mui-input-row input {
	font-size: 14px;
}
</style>
</head>

<body>
<s:action name="User_mobile_navbar" namespace="/user" executeResult="true" />
	<header class="mui-bar mui-bar-nav index_nav">
		<a id="tory_a" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"
			 ></a>
		<h1 class="mui-title">修改人员</h1>
	</header>
	<div class="mui-content">
		<div class="mui-card" style="margin:0px;">
			<!--页眉，放置标题-->
			<!--	<div class="mui-card-header">页眉</div>-->
			<!--内容区-->
			<div class="mui-card-content">
				<form class="mui-input-group">
					<div class="mui-input-row" style="display: none;">
						<label class="mui-h5">Id</label> <input type="text"
							class="mui-input-clear " id="input_ajdbxt_police_id">
					</div>
					<div class="mui-input-row">
						<label class="mui-h5">警号</label> <input type="text"
							class="mui-input-clear " id="input_police_serial_number" disabled="disabled">
					</div>
					<div class="mui-input-row" style="display: none;">
						<label class="mui-h5">密码</label> <input type="text"
							class="mui-input-clear " id="input_police_password">
					</div>
					<div class="mui-input-row">
						<label class="mui-h5">姓名</label> <input type="text"
							class="mui-input-clear" id="input_police_name">
					</div>
					<div class="mui-input-row">
						<label class="mui-h5">单位</label> <select class="mui-select"
							id="input_police_department" style="font-size: 14px;"  onchange="selectDepartment()">
						</select>
					</div>
					<div class="mui-input-row">
						<label  class=" mui-h5">职务</label> <select id="input_police_duty" style="font-size:14px;" >
							<option value="警员">警员</option>
							<option value="副所队长">副所队长</option>
							<option value="所队长">所队长</option>
							<option value="副局长">副局长</option>
							<option value="局长">局长</option>
							<option value="政委">政委</option>
							<option value="教导员">教导员</option>
						</select>
					</div>
					<div class="mui-input-row">
						<label class="mui-h5">法制员</label> <select class="mui-select"
							id="input_police_legaler" style="font-size: 14px;" onchange="changeFazhiyuan()">
							<option value="1">是</option>
							<option value="2">否</option>
						</select>
					</div>
					<div class="mui-input-row">
						<label class="mui-h5">权限</label> <select class="mui-select"
							id="input_police_power" style="font-size: 14px;">
							<option value="1">单位内浏览</option>
							<option value="3">所有单位内管理</option>
						</select>
					</div>
					<div class="mui-input-row">
						<label class="mui-h5">电话</label> <input type="text"
							class="mui-input-clear" id="input_police_phone_number" maxlength="11">
					</div>
				</form>
			</div>
			<!--页脚，放置补充信息或支持的操作-->
			<div class="mui-card-footer">
				<button type="button"
					class="mui-btn mui-btn-primary mui-btn-outlined"
					style="width: 100%;" onclick="updatePolice();">确认修改</button>
			</div>
		</div>
	</div>

	<script type="text/javascript"
		src="<%=basePath%>js/User/mobile_update_police.js"></script>
	<script type="text/javascript">
		mui.init();
		document.getElementById("tory_a").addEventListener("tap", function() {
			mui.openWindow({
				url : '/ajdbxt/user/User_mobile_police_one',
			});
		});
		//监听手机的返回键
		pushHistory(); 
		   window.addEventListener("popstate", function(e) { 
		     window.location = '/ajdbxt/user/User_mobile_police_one';//返回至人员列表页
		   }, false); 
		   function pushHistory() { 
		     var state = { 
		       title: "title", 
		       url: "#"
		     }; 
		     window.history.pushState(state, "title", "#"); 
		   }
	</script>
</body>

</html>