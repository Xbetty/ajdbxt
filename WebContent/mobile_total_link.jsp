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
<title>手机端—统计案件链接页</title>
<meta name="viewport"
	content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
<style>
.index_nav {
	background-color: #007aff;
	color: white;
	font-size: 15px;
}

.index_nav h1,.index_nav a {
	color: white;
}

.total_info_title a {
	color: #333;
}

#popover {
	height: 275px;
	width: 180px;
}

#select_case_department {
	color: #007aff;
}
</style>
</head>

<body>
<s:action name="User_mobile_navbar" namespace="/user"
		executeResult="true" />
	<header class="mui-bar mui-bar-nav index_nav">
	<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"
			onclick="window.location.href='<%=basePath%>user/User_mobile_index'"></a>
		<!-- <a style="color: white;" class="mui-icon mui-icon-more"
			id='showUserPicker'></a> -->
		<h1 class="mui-title" style="color: white;">个体详情统计</h1>
		<div class="index_nav_option" style="float: right;">
			<a style="color: white;"
				class="mui-icon mui-action-menu mui-icon-bars mui-pull-left"
				href="#popover"></a>
		</div>
	</header>
	<!--------------------------------->
	<div class="mui-content">
		<div class="mui-card" style="margin:0px;">
			<!-- 搜索框 -->
			<div class="mui-input-row mui-search" style="width: 100%;">
					<input type="search" id="input_Total_CaseSearchText"
						oninput="Mobile_List_Total_Link(1,totalCase,select_start_time,select_stop_time,department_id,policeId)"
						style="background-color: #FFFFFF; width: 100%; margin: 0px; padding-left: 50px; padding-right: 50px;"
						class="mui-input-clear" placeholder="搜索">
				</div>

			<!--页眉，放置标题-->
			<div class="mui-card-header" style="padding: 0px;">
				<div class="mui-card-header">
					<div>
						<span id="span_total_department">单位</span>
						<span style="margin: 0 10px;">-</span> 
						<span id="span_total_user">人员</span>
					</div>
				</div>
			</div>
			<!--内容区-->
			<div class="mui-card-content">
				<ul class="mui-table-view" id="ul_total_link">

				</ul>
			</div>
			<!--页脚，放置补充信息或支持的操作-->
			<div class="mui-card-footer div_page_count">
				<ul class="mui-pagination" id="ul_page_count">
				</ul>
			</div>
		</div>
	</div>

	<script type="text/javascript">
		mui.init();
		mui('.mui-scroll-wrapper').scroll()
		mui("body").on("tap", ".mui-icon-clear", function() {
			Mobile_List_Total_Link(1);
		});
	</script>
	<script type="text/javascript"
		src="<%=basePath%>js/Total/mobile_total_link.js"></script>
</body>
</html>