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
<title></title>
<meta name="viewport"
	content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
<style>
body {
	font-size: 15px;
}

.index_nav {
	background-color: #007aff;
	color: white;
	font-size: 15px;
}

.index_nav  h1, .index_nav  a {
	color: white;
}

.mui-input-row input {
	text-align: right;
}
.mui-input-row{
padding:0 5px;
}
</style>
</head>

<body>
	<s:action name="User_mobile_navbar" namespace="/user"
		executeResult="true" />
	<header class="mui-bar mui-bar-nav index_nav">
		<a id="tosy_a" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title" style="color: white;">案件信息</h1>
	</header>
	<div class="mui-content" id="case_details_content">

		<div class="mui-card"
			style="width: 100%; margin: 0px;">
			<!--页眉，放置标题-->
			<div class="mui-card-header">
				<h3 class="mui-h4" style="color:#007aff">李四盗窃案</h3>
			</div>
			<div class="mui-card-content">
				<form class="mui-input-group" id="form_case_detail">
					<div class="mui-input-row">
						<label class="mui-h5">案件类别</label> <input type="text"
							class="mui-input-clear mui-h5" style="font-size:16px;" placeholder="" value="李四盗窃案">
					</div>
					<div class="mui-input-row">
						<label class="mui-h5">办案单位</label> <input type="text" style="font-size:16px;"
							class="mui-input-clear mui-h5" placeholder="" value="李四盗窃案">
					</div>
					<div class="mui-input-row">
						<label class="mui-h5">抓获时间</label> <input type="text" style="font-size:16px;"
							class="mui-input-clear mui-h5" placeholder="" value="李四盗窃案">
					</div>
					<div class="mui-input-row"> 
						<label class="mui-h5">主办民警</label> <input type="text" style="font-size:16px;"
							class="mui-input-clear mui-h5" placeholder="" value="李四盗窃案">
					</div>
					<div class="mui-input-row">
						<label class="mui-h5">协办民警</label> <input type="text" style="font-size:16px;"
							class="mui-input-clear mui-h5" placeholder="" value="李四盗窃案">
					</div>

				</form>
			</div>
			<!--页脚，放置补充信息或支持的操作-->
			<div class="mui-card-footer">
				<button type="button"
					class="mui-btn mui-btn-primary mui-btn-outlined"
					style="width: 100%;" onclick=";">查看案件流程</button>
			</div>
		</div>



	</div>

	<!--------------------------------->
	<!--底部导航-->
	<nav class="mui-bar mui-bar-tab">
				<a class="mui-tab-item " onclick="window.location.href='<%=basePath%>user/User_mobile_index'"> <span
			class="mui-icon mui-icon-home"></span> <span class="mui-tab-label">首页</span>
		</a> <a class="mui-tab-item" onclick="window.location.href='<%=basePath%>user/User_mobile_police_one'"> <span class="mui-icon mui-icon-person"></span>
			<span class="mui-tab-label" >人员</span>
		</a> <a class="mui-tab-item"  href="#Popover_1"> <span class="mui-icon mui-icon-email"></span>
			<span class="mui-tab-label">统计</span>
		</a> <a class="mui-tab-item" onclick="window.location.href='<%=basePath%>info/Info_page_mobileCaseList'"> <span
			class="mui-icon mui-icon-chatboxes"></span> <span
			class="mui-tab-label">案件</span>
		</a>

	</nav>
	<div id="Popover_1" class="mui-popover mui-bar-popover" style="top: 376px; left: 112.167px;width:150px;text-align: center;position: fixed;">
			<div class="mui-popover-arrow mui-bottom">
			</div>
			<ul class="mui-table-view" style="width:150px;background-color: white;">
				<li class="mui-table-view-cell" >
					<a href="">按单位统计</a>
				</li>
				<li class="mui-table-view-cell">
					<a href="">按人员统计</a>
				</li>
			</ul>
		</div>
	<script type="text/javascript"
		src="<%=basePath%>js/Index/mobile_indexCaseDetails.js"></script>
	<script type="text/javascript">
		mui.init();
		document.getElementById("tosy_a").addEventListener("tap",function(){
			mui.openWindow({
				url:'/ajdbxt/user/User_mobile_index',
			});
		});
		case_details();
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