<?php
	header('content-type:text/html;charset=utf8');

	//echo 123;

	//var_dump($_SERVER);
	//include('./view/main/index.html');

	// $path=$_SERVER['PATH_INFO'];
	// include('./view'.$path.'.html');

	$dir='main';
	$filename='index';
	if(array_key_exists('PATH_INFO', $_SERVER)){
		$path=$_SERVER['PATH_INFO'];
		//php中的substr方法 截取字符串
		$str=substr($path,1);
		//分割字符串
		$ret=explode('/', $str);
		//var_dump($ret);
		if(count($ret)==2){
			$dir=$ret[0];
			$filename=$ret[1];
		}else{
			$filename='login';
		}
	}
	include('./view/'.$dir.'/'.$filename.'.html');
?>