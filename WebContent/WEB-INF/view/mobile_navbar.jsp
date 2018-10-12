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
<title>移动端-导航</title>
<meta name="viewport"
	content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
<link href="<%=basePath%>css/mui.min.css" rel="stylesheet" />
<link rel="stylesheet" href="<%=basePath%>css/app.css" />
<%-- <link rel="stylesheet" href="<%=basePath%>css/mui.picker.min.css" /> --%>
<link rel="stylesheet" href="<%=basePath%>css/mui.picker.all.css" />
<link rel="stylesheet" type="text/css"
	href="<%=basePath%>css/mui.poppicker.css" />
<style>
.index_nav {
	background-color: #007aff;
	color: white;
	font-size: 15px;
}

.index_nav h1, .index_nav a {
	color: white;
}
</style>
</head>

<body>
	<!--------------------------------->
	<!--底部导航-->
	<nav class="mui-bar mui-bar-tab">
	<!-- 登录用户名 -->
					    <span id="USER_NAME" hidden><s:property value="#session.loginPolice.ajdbxt_police.police_name"/></span>
					    <!-- 登陆用户id -->
						<span id="loginer_id" hidden><s:property value="#session.loginPolice.ajdbxt_police.ajdbxt_police_id"/></span>
						<!-- 登录用户权限 -->
						<span id="loginer_permission" hidden><s:property value="#session.loginPolice.ajdbxt_police.police_power"/></span>
		<a id="sy" class="mui-tab-item "> <span
			class="mui-icon mui-icon-home"></span> <span class="mui-tab-label">首页</span>
		</a> <a id="ry" class="mui-tab-item"> <span
			class="mui-icon mui-icon-person"></span> <span class="mui-tab-label">人员</span>
		</a> <a class="mui-tab-item" href="#Popover_1"> <span
			class="mui-icon mui-icon-email"></span> <span class="mui-tab-label">统计</span>
		</a> <a id="aj" class="mui-tab-item"> <span
			class="mui-icon mui-icon-chatboxes"></span> <span
			class="mui-tab-label">案件</span>
		</a>

	</nav>
	<div id="Popover_1" class="mui-popover mui-bar-popover"
		style="top: 376px; left: 112.167px; width: 150px; text-align: center; position: fixed;">
		<div class="mui-popover-arrow mui-bottom"></div>
		<ul class="mui-table-view"
			style="width: 150px; background-color: white;">
			<%-- <li class="mui-table-view-cell"><a
				href="<%=basePath%>total/Total_mobile_departmentStatistic">按单位统计</a>
			</li>
			<li class="mui-table-view-cell"><a
				href="<%=basePath%>total/Total_mobile_policeStatistic">按人员统计</a></li> --%>
				<li class="mui-table-view-cell"><a id="total_by_department">按单位统计</a>
			</li>
			<li class="mui-table-view-cell" id="total_by_police"><a>按人员统计</a></li>
		</ul>
	</div>


	<script src="<%=basePath%>js/jquery-3.1.1.min.js"></script>
	<script src="<%=basePath%>js/mui.min.js"></script>
<%-- 	<script type="text/javascript" src="<%=basePath%>js/mui.picker.min.js"></script> --%>
	<script type="text/javascript" src="<%=basePath%>js/mui.picker.all.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/mui.poppicker.js"></script>
	<script type="text/javascript">
		mui.init();
		document.getElementById("sy").addEventListener("tap",function(){
			mui.openWindow({
				url:'/ajdbxt/user/User_mobile_index',
			});
		});
		document.getElementById("ry").addEventListener("tap",function(){
			mui.openWindow({
				url:'/ajdbxt/user/User_mobile_police_one',
			});
		});
		document.getElementById("aj").addEventListener("tap",function(){
			mui.openWindow({
				url:'/ajdbxt/info/Info_page_mobileCaseList',
			});
		})
		mui("body").on("tap", "#total_by_department", function() {
			window.location.href="/ajdbxt/total/Total_mobile_departmentStatistic";;
		});
		mui("body").on("tap", "#total_by_police", function() {
			window.location.href="/ajdbxt/total/Total_mobile_policeStatistic";;
		});
	</script>
</body>

</html>