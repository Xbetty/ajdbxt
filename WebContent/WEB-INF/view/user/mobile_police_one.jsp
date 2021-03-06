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
<title>手机端—人员列表</title>
<meta name="viewport"
	content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
<style>
.index_nav {
	background-color: #007aff;
	color: white;
	font-size: 15px;
}

.index_nav h1, .index_nav  a {
	color: white;
}
</style>
</head>

<body>
	<s:action name="User_mobile_navbar" namespace="/user"
		executeResult="true" />
	<!-- 添加人员 -->
	<div class="mui-icon mui-icon-plusempty" id="div_police_add"
		style="position: fixed; top: 10px; right: 20px; font-weight: bold; color: white; z-index: 9999999; display: none;"
		onclick="window.location.href='<%=basePath%>user/User_mobile_police_add'"></div>
	<header class="mui-bar mui-bar-nav index_nav">
		<a id="tosy_a"
			class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title" style="color: white;">
			<span id="mobile_select_police_department_id" style="display: none;"></span>
			<span id="mobile_select_police_department"></span>
		</h1>

	</header>
	<div class="mui-content">
		<div class="mui-card" style="margin: 0px;">
			<!--页眉，放置标题-->
			<div class="mui-card-header" style="padding: 0px;">
				<div class="mui-input-row mui-search" style="width: 100%;">
					<input type="search" id="input_PoliceSearchText"
						oninput="List_Police_By_Page(1)"
						style="background-color: #FFFFFF; width: 100%; margin: 0px; padding-left: 50px; padding-right: 50px;"
						class="mui-input-clear" placeholder="搜索">
				</div>
			</div>
			<!--内容区-->
			<div class="mui-card-content">
				<ul class="mui-table-view " id="ul_police_list">

				</ul>
			</div>
			<!--页脚，放置补充信息或支持的操作-->
			<div class="mui-card-footer div_page_count">
				<ul class="mui-pagination" id="ul_page_count">
				</ul>
			</div>

		</div>

	</div>
	<script type="text/javascript"
		src="<%=basePath%>js/User/mobile_police_one.js"></script>
	<script type="text/javascript">
		mui.init();
		document.getElementById("tosy_a").addEventListener("tap", function() {
			mui.openWindow({
				url : '/ajdbxt/user/User_mobile_index',
			});
		});
		mui("body").on("tap", ".mui-icon-clear", function() {
			List_Police_By_Page(1);
		});
		//监听手机的返回键
		pushHistory(); 
		   window.addEventListener("popstate", function(e) { 
		     window.location = '/ajdbxt/user/User_mobile_index';//返回至首页
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