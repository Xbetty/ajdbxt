<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
   
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<form action="process/findSingleProcessAction" method="post">
		<input type="text" name="ajdbxtProcess.process_case_id" />
		<input type="submit" value="查"/>
	</form><br />
	<form action="process/deleteProcessAction" method="post">
		<input type="text" name="id"/>
		<input type="submit" value="提交"/>
	</form><br />
	<form action="process/updateProcessAction" method="post">
		<input type="text" name="ajdbxtProcess.process_case_end"/>
		<input type="submit" value="提交" />
	</form><br />
	<form action="process/findProcessAction" method="post">
		<input type="text" name="key">
		<input type="submit" value="提交">
	</form>
</body>
</html>