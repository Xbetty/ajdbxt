<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!---------------------------------------------------------------------------------------------------->
<link rel="stylesheet" href="<%=basePath%>css/square/blue.css" />
<%-- 
<script type="text/javascript"
	src="<%=basePath%>js/Technology/DNA/DNAGetBirth.js"></script>
<script type="text/javascript"
	src="<%=basePath%>js/Technology/DNA/CreateDNA.js"></script>

<script type="text/javascript"
	src="<%=basePath%>js/Technology/DNA/DNADetails.js"></script>
<script type="text/javascript"
	src="<%=basePath%>js/Technology/DNA/DeleteDNA.js"></script>
 --%>	
<!-- 导入插叙案件流程列表js文件 -->
<script type="text/javascript"
	src="<%=basePath%>js/Process/List_CaseProcess.js"></script>
<!---------------------------------------------------------------------------------------------------->
<title>案件流程列表</title>
</head>
<body>
	<s:action name="User_navbar" namespace="/user" executeResult="true" />
	
	<!---------------------------------------------------------------------------------------------------->
	<!---------------------------------------------------------------------------------------------------->
	<!---------------------------------------------------------------------------------------------------->
	<div style="float: left; width: 100%;">
		<!--  -->
		<!---------------------------------------------------------------------------------------------------->
		<!---------------------------------------------------------------------------------------------------->
		<div class="panel" style="width: 95%; margin: 20px auto;">
				<table id="table table_penalProcess" class="table table-hover table-bordered"
					style="text-align: center; margin: 20px 0;">
					<tbody>
						<tr>
							<th>案件名称</th>
							<th>办案单位</th>
							<th>案件类别</th>	
							<th>主办民警</th>
							<th>协办民警</th>
							<th>结案</th>
							<th>操作</th>
						</tr>
					</tbody>
				</table>


				<div id="i_pulse" style="text-align: center;">
					<i class="fa fa-spinner fa-pulse fa-3x"></i>
				</div>



				<div style="height: 34px; margin: 0 0 20px 0;">

					<button class="btn btn-danger" onclick="DeleteDNA()"
						style="float: right; margin: 0 10px;">
						<i class="fa fa-trash-o"></i> 删除所选
					</button>

				</div>
				<div style="margin: 0 auto; width: 400px; text-align: center;">
					<button id="button_HomePage" class="btn btn-default"
						onclick="flip(1)">首页</button>
					<button id="button_PrePage" class="btn btn-default"
						onclick="flip(2)">上一页</button>
					<button id="button_NextPage" class="btn btn-default"
						onclick="flip(3)">下一页</button>
					<button id="button_EndPage" class="btn btn-default"
						onclick="flip(4)">尾页</button>
				</div>
				<div
					style="margin: 20px auto 20px; width: 200px; text-align: center;">
					第 <span id="span_pageIndex">1</span> 页 <br> 共 <span
						id="span_totalPages">1</span> 页 <br> 共 <span
						id="span_totalRecords">0</span> 条记录
				</div>
			</div>
			<!--  -->

		</div>
		<!---------------------------------------------------------------------------------------------------->
		<!---------------------------------------------------------------------------------------------------->
	</div>

	</div>
	<!---------------------------------------------------------------------------------------------------->
	<!---------------------------------------------------------------------------------------------------->
	<!---------------------------------------------------------------------------------------------------->
</body>
<%-- 
<script type="text/javascript" src="<%=basePath%>js/icheck.js"></script>
<script type="text/javascript" src="<%=basePath%>js/Input_Select.js"></script>
<script type="text/javascript" src="<%=basePath%>js/laydate/laydate.js"></script>
<script src="/laydate/laydate.js"></script>
 --%>
<script type="text/javascript">
List_Case_By_PageAndSearch(1);
</script>

</html>