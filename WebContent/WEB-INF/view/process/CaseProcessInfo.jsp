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
<title>办案流程详情</title>
</head>
<body>

	<s:action name="User_navbar" namespace="/user" executeResult="true" />

	<!-- ---------------------------------------案件信息-------------------------------------------------------- -->
	<div style="margin: 100px 0 0 0; float: left; width: 100%;">
		<div class="panel" style="width: 95%; margin: 20px auto;">
			<div id="tableDiv" class="hideDiv">
				<table class="table table-bordered" style="text-align: center;">
					<tbody id="infoTable">
						
					</tbody>
				</table>
			</div>

		</div>
	</div>


	<!------------------------------------------刑事案件流程---------------------------------------------------------->

	<div style="margin: 100px 0 0 0; float: left; width: 100%;">
		<div class="panel" style="width: 95%; margin: 20px auto;">
			<div id="tableDiv" class="hideDiv">
				<table class="table table-bordered" style="text-align: center;">
					<tbody id="penalProcessInfoTable">
					
					</tbody>
				</table>
			</div>

		</div>
	</div>
</body>

</html>