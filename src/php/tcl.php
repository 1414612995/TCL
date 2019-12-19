<?php

require "conn.php";//引入数据库连接文件

$conn->query('SET NAMES UTF8');//设置字符集

$result=$conn->query("select * from goods");//记录集
$arr=array();
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i]=$result->fetch_assoc();
}

echo json_encode($arr);