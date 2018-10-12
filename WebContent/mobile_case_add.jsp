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
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" onclick="window.location.href='<%=basePath%>user/User_mobile_police_one'"></a>
		<h1 class="mui-title">新增案件</h1>
	</header>
	<div class="mui-content">
		<div class="mui-card" style="margin:0px;">
			<!--页眉，放置标题-->
			<!--	<div class="mui-card-header">页眉</div>-->
			<!--内容区-->
			<div class="mui-card-content">
				<form class="mui-input-group">
					<div class="mui-input-row">
						<label class=" mui-h5">案件名称</label> <input type="text" class="mui-input-clear"
							id="input_police_serial_number" placeholder="请输入案件名称">
					</div>
					<div class="mui-input-row">
						<label  class=" mui-h5">案件类别</label> <select id="input_police_duty" style="font-size:14px;" >
							<option selected="selected" value="">请选择</option>
							<option value="">行政案件</option>
							<option value="">刑事案件</option>
						</select>
					</div>
					<div class="mui-input-row">
						<label  class=" mui-h5">单位</label> <select id="input_police_department" style="font-size:14px;">
							<option>1</option>
						</select>
					</div>
					<div class="mui-input-row">
						<label  class=" mui-h5">抓获时间</label>
<!-- 						<input type="text" class="mui-input-clear" -->
<!-- 							id="input_info_catch_time" > -->
							<button id='select_stop_time'
								data-options='{"type":"date","beginYear":1900,"endYear":2100}'
								class="btn mui-btn" style="float:left;width:100px;"></button>
					</div>
					<div class="mui-input-row">
						<label  class=" mui-h5">姓名</label> <input type="text" class="mui-input-clear"
							id="input_police_name" placeholder="请输入姓名">
					</div>
					
					<div class="mui-input-row">
						<label  class=" mui-h5">职务</label> <select id="input_police_duty" style="font-size:14px;" >
							<option selected="selected" value="">请选择</option>
							<option value="警员">警员</option>
							<option value="副所队长">副所队长</option>
							<option value="所队长">所队长</option>
							<option value="副局长">副局长</option>
							<option value="局长">局长</option>
							<option value="政委">政委</option>
						</select>
					</div>
					<div class="mui-input-row">
						<label  class=" mui-h5">法制员</label> <select id="input_police_legaler" style="font-size:14px;" >
							<option selected="selected" value="">请选择</option>
							<option value="1">是</option>
							<option value="2">否</option>
						</select>
					</div>
					<div class="mui-input-row ">
						<label  class=" mui-h5">权限</label> <select id="input_police_power" style="font-size:14px;">
							<!-- <option value="1">单位内浏览</option>
							<option value="2">单位内管理</option>
							<option value="3">所有单位内管理</option> -->
						</select>
					</div>
					<div class="mui-input-row">
						<label  class=" mui-h5">电话</label> <input type="text" class="mui-input-clear "
							id="input_police_phone_number" placeholder="请输入电话号码">
					</div>
				</form>
			</div>
			<!--页脚，放置补充信息或支持的操作-->
			<div class="mui-card-footer">
				<button type="button" class="mui-btn mui-btn-primary mui-btn-outlined"
					style="width:100%;" onclick="createPolice();">确认添加</button>
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
	<script src="<%=basePath%>js/jquery-3.1.1.min.js"></script>
	<script src="<%=basePath%>js/mui.min.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/mui.picker.min.js"></script>
	<script type="text/javascript">
		/* mui */
		mui.init();
		mui('.mui-scroll-wrapper').scroll()
		/* 给结束日期设置为当前日期 */
		var select_stop_time = document.getElementById("select_stop_time");
		var str = '';
		var now_date = new Date();
		var now_date_year = now_date.getFullYear();
		str += now_date_year;
		var now_date_month = now_date.getMonth() + 1;
		if (now_date_month < 10) {
			str += "-0" + now_date_month;
		} else {
			str += "-" + now_date_month;
		}

		var now_date_date = now_date.getDate();
		if (now_date_date < 10) {
			str += "-0" + now_date_date;
		} else {
			str += "-" + now_date_date;
		}
		select_stop_time.innerText = str;
		console.log("select_stop_time:" + select_stop_time.innerText);

		/* 时间插件的js */
		(function($) {
			$.init();
			var btns = $('.btn');
			btns.each(function(i, btn) {
				btn.addEventListener('tap', function() {
					var _self = this;
					if (_self.picker) {
						_self.picker.show(function(rs) {
							_self.innerText = rs.text;
							_self.picker.dispose();
							_self.picker = null;
						});
					} else {
						var optionsJson = this.getAttribute('data-options')
								|| '{}';
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