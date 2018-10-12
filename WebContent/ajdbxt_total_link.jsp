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
.table_total tbody tr {
	text-align: center;
}

#page_flip span a:hover {
	cursor: pointer;
}

.span_catagory {
	float: left;
	margin: 0 5px 0 0;
}
</style>
</head>

<body>
	<s:action name="User_navbar" namespace="/user" executeResult="true" />

	<div style="margin: 80px 0 0 0; float: left; width: 100%;">
		<div class="panel" style="width: 95%; margin: 20px auto;">
			<!--  -->
			<div class="panel-heading">
				<div>
					<h3 class="panel-title">
						<span id="span_total_department">单位</span> <span>-</span> <span
							id="span_total_user">人员</span>
					</h3>
				</div>
			</div>
			<div class="panel-body">
				<div class="col-md-12">
					<div class="panel">
						<div class="panel-body">
							<div style="height: 34px; width: 100%;">

								<!-- 返回到前一页 -->
								<button onclick="history.go(-1)" type="button"
									class="btn btn-default button button_return ">
									<i class="fa fa-reply"></i> 返回
								</button>
								<!--  -->
								<!-- 检索 -->
								<div class="input-group" style="width: 300px; float: right;">
									<input id="input_Total_CaseSearchText" class="form-control"
										oninput="List_Total_link(1)" type="text"
										placeholder="搜索案件" /> <span class="input-group-addon"
										style="border-radius: unset;"> <i class="fa fa-search"></i>
									</span>
								</div>
							</div>

							<table id="table_total_link" class="table table-hover "
								style="text-align: center; margin: 20px 0;">
								<tbody>
									<tr>
										<th>序号</th>
										<%-- <th><select id="select_case_kind" class="form-control"
											onchange="List_Total_User_By_Page(1)">
												<option selected="selected" value="">所有案件</option>
												<option>行政案件</option>
												<option>刑事案件</option>
										</select></th> --%>
										<th>案件名</th>
										<th>评分</th>
										<th>及时整改</th>
										<th>整改到位</th>
										<th>案卷及时上交</th>
										<th>涉案财物及时入库</th>
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
					</div>
					<!-- END TABLE HOVER -->
				</div>

			</div>
		</div>
	</div>
	<input type="hidden" id="input_police_id"
		value='<s:property value="police_id"/>'>

	<script type="text/javascript" src="<%=basePath%>js/icheck.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/Input_Select.js"></script>
	<script type="text/javascript"
		 src="<%=basePath%>js/Total/ajdbxtTotalLink.js">
	</script>
</body>
</html>