<?php

	$method = $_SERVER['REQUEST_METHOD'];

	if($method == 'GET'){
		
	}elseif($method == 'POST'){

		if($uri[3] == 'self'){

			//���ܵ�post�ύ�����ݣ���ʽΪjson
			$data = json_decode(file_get_contents("php://input"));
			
			$user = json_decode(urldecode($data->user));
			//var_dump(mb_convert_encoding($user->name, 'gbk', 'utf-8'));
			
			echo '{"status":1}';
		}
	}