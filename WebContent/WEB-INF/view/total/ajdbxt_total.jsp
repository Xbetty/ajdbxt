<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>


<title>统计</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style type="text/css">
#table_total tbody tr {
	text-align: center;
	margin: 0 auto;
}

#page_flip span a:hover, #select_start_time, #select_stop_time {
	cursor: pointer;
}
</style>
</head>

<body>

	<s:action name="User_navbar" namespace="/user" executeResult="true" />

	<div style="margin: 80px 0 0 0; float: left; width: 100%;">
		<div class="panel" style="width: 95%; margin: 20px auto;">
			<!--  -->
			<div class="panel-heading">
				<h3 class="panel-title">
					<span>统计</span><span>-</span><span>按人员统计</span>
				</h3>

			</div>
			<div class="panel-body">
				<div class="col-md-12">
					<div class="panel">
						<!-- 返回到前一页 -->
						<button onclick="history.go(-1)" type="button"
							class="btn btn-default button button_return ">
							<i class="fa fa-reply"></i> 返回
						</button>
						<!--  -->
						<div class="panel-body">
							<div style="height: 34px; margin: 0 0 20px 0; width: 100%;">
								<div>
									<span
										style="float: left; margin: 0 0 0 20px; line-height: 34px;">按日期筛选：</span>
									<input id="select_start_time"
										class="form-control mydate input_date"
										style="width: 150px; float: left; text-align: center;"
										type="text" placeholder="起始时间" value="2018-01-01" />
									<%--  --%>
									<span
										style="float: left; margin: 0 0 0 20px; line-height: 34px;">至</span>
									<!--  -->
									<input id="select_stop_time"
										class="form-control mydate input_date"
										style="width: 150px; float: left; margin: 0 0 0 20px; text-align: center;"
										type="text" placeholder="结束时间" />
									<%--  --%>
								</div>
								<!-- 检索 -->
								<div class="input-group" style="width: 300px; float: right;">
									<input id="input_Total_PoliceSearchText" class="form-control"
										type="text" placeholder="搜索人员"
										oninput="List_Total_By_Page(MainadminCase, 1)" /> <span
										class="input-group-addon" style="border-radius: unset;">
										<i class="fa fa-search"></i>
									</span>
								</div>
							</div>

							<table id="table_total" class="table table-bordered"
								style="text-align: center; margin: 20px 0;">
								<tbody>
									<tr>
										<th rowspan="2" colspan="2">序号</th>
										<th rowspan="2" colspan="2"><select
											id="select_case_department"
											style="width: 80%; margin: 0 auto;" class="form-control">
										</select></th>
										<th rowspan="2" colspan="2">人员</th>
										<th colspan="2">主办案件</th>
										<th colspan="2">协办案件</th>
										<th colspan="2">平均分</th>
									</tr>
									<tr>
										<th><input type="button" id="MainadminCase"
											class="input_button" value="主办行政案件" /></th>
										<th><input type="button" id="MaincriminalCase"
											class="input_button" value="主办刑事案件" /></th>
										<th><input type="button" id="InsisadminCase"
											class="input_button" value="协办行政案件" /></th>
										<th><input type="button" id="InsiscriminalCase"
											class="input_button" value="协办刑事案件" /></th>
										<th><input type="button" id="adminAverageScore"
											class="input_button" value="行政案件平均分" /></th>
										<th><input type="button" id="criminalAverageScore"
											class="input_button" value="刑事案件平均分" /></th>
									</tr>
								</tbody>
							</table>

							<!-- 加载图标 -->
							<div id="i_pulse" style="text-align: center;">
								<i class="fa fa-spinner fa-pulse fa-3x"></i>
							</div>
							<!--翻页  -->
							<div id="page_flip"
								style="margin: 0 auto; width: 400px; text-align: center;">
								<span> <a onclick="flip(1)"><i
										class="fa fa-angle-double-left">首页</i> </a> &nbsp&nbsp <a
									onclick="flip(2)"><i class="fa fa-angle-left"></i>上一页 </a>
									&nbsp&nbsp <a onclick="flip(3)">下一页<i
										class="fa fa-angle-right"></i>
								</a> &nbsp&nbsp <a onclick="flip(4)">尾页<i
										class="fa fa-angle-double-right"></i>
								</a> <br />
									<p class='info' style="margin-top: 5px;">
										第<span id="span_pageIndex">1</span>页&nbsp&nbsp共 <span
											id="span_totalPages">1</span>页&nbsp&nbsp共 <span
											id="span_totalRecords">0</span>条记录

									</p></span>

							</div>

						</div>
						<!-- END TABLE HOVER -->
					</div>

				</div>
			</div>
		</div>

		<script type="text/javascript" src="<%=basePath%>js/icheck.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/Input_Select.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>js/laydate/laydate.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>js/Total/ajdbxtTotal.js"></script>

		<script type="text/javascript">
			$(function() {
				$
						.post(
								'/ajdbxt/user/User_findDepartmentByPage',
								function(Department_data) {
									// 所有案件循环
									var option = '';
									for (var len = 0; len < Department_data.list.length; len++) {
										if(Department_data.list[len].department_name=="法制大队" || Department_data.list[len].department_name=="公安局"){
											option += '<option style="display:none;" ';
											option += ' value="'
													+ Department_data.list[len].ajdbxt_department_id
													+ '">'
														+ Department_data.list[len].department_name
														+ '</option>';
										}
										else{
											option += '<option ';
											option += ' value="'
													+ Department_data.list[len].ajdbxt_department_id
													+ '">'
														+ Department_data.list[len].department_name
														+ '</option>';
										}
									}
									$('#select_case_department').html(
											'<option selected="selected" value="">所有单位</option>'
													+ option);
								}, 'json');
			});
		</script>
		<script type="text/javascript">
			var select_start_time = document
					.getElementById("select_start_time");
			var select_stop_time = document.getElementById("select_stop_time");
			var str = '';
			var now_date = new Date();
			var now_date_year = now_date.getFullYear();
			str += now_date_year;
			var now_date_month = now_date.getMonth() + 1;
			str += "-" + now_date_month;
			var now_date_date = now_date.getDate();
			str += "-" + now_date_date;
			select_stop_time.value = str;
			select_stop_time.value = str;
			var MainadminCase = document.getElementById("MainadminCase").value;
			List_Total_By_Page(MainadminCase, 1);
			$(".input_date").bind("change", function() {
				List_Total_By_Page(MainadminCase, 1);
			});
			$("#select_case_department").bind("input", function() {
				List_Total_By_Page(MainadminCase, 1);
			});
		</script>

			<script type="text/javascript">
		$.datetimepicker.setLocale('ch');
		$('.mydate').datetimepicker({
			yearStart : 1900, // 设置最小年份
			yearEnd : 2100, // 设置最大年份
			yearOffset : 0, // 年偏差
			timepicker : false, // 关闭时间选项
			format : 'Y-m-d', // 格式化日期年-月-日
			minDate : '1900/01/01', // 设置最小日期
			maxDate : '2100/01/01', // 设置最大日期
		});
		$('.mydate_minute').datetimepicker({
			yearStart : 1900, // 设置最小年份
			yearEnd : 2100, // 设置最大年份
			yearOffset : 0, // 年偏差
			timepicker : true, // 关闭时间选项
			format : 'Y-m-d H:i', // 格式化日期年-月-日
			minDate : '1900/01/01', // 设置最小日期
			maxDate : '2100/01/01', // 设置最大日期
		});
	</script>
</body>
</html>