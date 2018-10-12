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
<title>手机端—按单位统计</title>
<meta name="viewport"
	content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
<style>
.index_nav {
	background-color: #007aff;
	color: white;
	font-size: 15px;
}

.index_nav h1, .index_nav a {
	color: white;
}

.total_info_title a {
	color: #333;
}

#popover {
	height: 230px;
	width: 180px;
}
</style>
</head>

<body>
	<s:action name="User_mobile_navbar" namespace="/user"
		executeResult="true" />
	<header class="mui-bar mui-bar-nav index_nav">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"
			onclick="window.location.href='<%=basePath%>user/User_mobile_index'"></a>
		<h1 class="mui-title" style="color: white;">按单位统计</h1>
		<div class="index_nav_option" style="float: right;">
			<a style="color: white;"
				class="mui-icon mui-action-menu mui-icon-bars mui-pull-left"
				href="#popover"></a>
		</div>
	</header>
	<!--------------------------------->
	<!--弹出菜单-->
	<div id="popover" class="mui-popover">
		<div class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<ul class="mui-table-view mui-h5" id="ul_total_type">
					<li class="mui-table-view-cell"><span class="total_info_title">
							<a class="a_total_type" id="sumCase">按总案件数统计 </a>
					</span></li>
					<li class="mui-table-view-cell"><span class="total_info_title">
							<a class="a_total_type" id="adminCase">按行政案件数统计 </a>
					</span></li>

					<li class="mui-table-view-cell"><span class="total_info_title">
							<a class="a_total_type" id="criminalCase">按刑事案件数统计 </a>
					</span></li>
					<li class="mui-table-view-cell"><span class="total_info_title">
							<a class="a_total_type" id="adminAverageScore">按行政案件平均分统计 </a>
					</span></li>

					<li class="mui-table-view-cell"><span class="total_info_title">
							<a class="a_total_type" id="crimianAverageScore">按刑事案件平均分统计 </a>
					</span></li>

				</ul>
			</div>
		</div>
	</div>
	<div class="mui-content">
		<div class="mui-card" style="margin: 0px;">
			<!--页眉，放置标题-->
			<div class="mui-card-header" style="padding: 0px;">
				<div class="mui-card-header">
					<div>
						<span id="total_info_type">按总案件数统计</span>
						<div class="mui-content-padded">
							<button id='select_start_time'
								data-options='{"type":"date","beginYear":1900,"endYear":2100}'
								class="btn mui-btn">2018-01-01</button>
							<span>至</span>
							<button id='select_stop_time'
								data-options='{"type":"date","beginYear":1900,"endYear":2100}'
								class="btn mui-btn"></button>
						</div>
					</div>

				</div>

			</div>
			<!--内容区-->
			<div class="mui-card-content">
				<ul class="mui-table-view" id="ul_total_department">

				</ul>
			</div>

		</div>
	</div>

	<script type="text/javascript"
		src="<%=basePath%>js/Total/mobile_total_department.js"></script>
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
		console.log(str);
		/* 首页数据显示-按平均分统计 */
		var sumCase = document.getElementById("sumCase").innerHTML;
		Mobile_List_Total_Department(sumCase, 1);

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
							console.log("1111");
							Mobile_List_Total_Department(sumCase, 1);
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
							Mobile_List_Total_Department(sumCase, 1);
						});
					}

				}, false);
			});
		})(mui);
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