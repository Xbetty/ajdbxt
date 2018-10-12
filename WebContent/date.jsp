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
<link href="<%=basePath%>css/mui.min.css" rel="stylesheet" />
		<link rel="stylesheet" href="<%=basePath%>css/app.css" />
		<link rel="stylesheet" href="<%=basePath%>css/mui.picker.min.css" />
<style>
.index_nav {
	background-color: #007aff;
	color: white;
	font-size: 15px;
}

.index_nav h1, a {
	color: white;
}
select,input{
font-size:14px;
}
</style>
</head>

<body>
	<header class="mui-bar mui-bar-nav index_nav">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" onclick="window.location.href='<%=basePath%>info/Info_page_mobileCaseList'"></a>
		<h1 class="mui-title">新增案件</h1>
	</header>
	<div class="mui-content">
		
					<div class="mui-input-row">
						<label  class=" mui-h5">抓获时间</label> 
						<button id='demo1' data-options='{}' class="btn mui-btn mui-btn-block">选择日期时间 ...</button>
						<input type="text" name="info.info_catch_time"
						class="mui-input-clear mydate_minute"  id="input_info_catch_time">
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
	<script src="<%=basePath%>js/jquery-3.1.1.min.js"></script>
	<script type="text/javascript"
		src="<%=basePath%>js/User/mobile_police_one.js"></script>
		<script type="text/javascript"
		src="<%=basePath%>js/Info/mobile_caseAdd.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/mui.min.js" ></script>
		<script type="text/javascript" src="<%=basePath%>js/mui.picker.min.js" ></script>
		<script>
			(function($) {
				$.init();
				var btns = $('.btn');
				btns.each(function(i, btn) {
					btn.addEventListener('tap', function() {
						var _self = this;
						if(_self.picker) {
							_self.picker.show(function (rs) {
								_self.innerText = rs.text;
								_self.picker.dispose();
								_self.picker = null;
							});
						} else {
							var optionsJson = this.getAttribute('data-options') || '{}';
							var options = JSON.parse(optionsJson);
							var id = this.getAttribute('id');
							/*
							 * 首次显示时实例化组件
							 * 示例为了简洁，将 options 放在了按钮的 dom 上
							 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
							 */
							_self.picker = new $.DtPicker(options);
							_self.picker.show(function(rs) {
								/*
								 * rs.value 拼合后的 value
								 * rs.text 拼合后的 text
								 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
								 * rs.m 月，用法同年
								 * rs.d 日，用法同年
								 * rs.h 时，用法同年
								 * rs.i 分（minutes 的第二个字母），用法同年
								 */
								 _self.innerText = rs.text;
								/* 
								 * 返回 false 可以阻止选择框的关闭
								 * return false;
								 */
								/*
								 * 释放组件资源，释放后将将不能再操作组件
								 * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
								 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
								 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
								 */
								_self.picker.dispose();
								_self.picker = null;
							});
						}
						
					}, false);
				});
			})(mui);
		</script>

</body>

</html>