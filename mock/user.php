<?php

	$method = $_SERVER['REQUEST_METHOD'];

	if($method == 'GET'){
		
	}elseif($method == 'POST'){

		if($uri[3] == 'self'){	//���µ�ǰ�û�����

			//���ܵ�post�ύ�����ݣ���ʽΪjson
			$data = json_decode(file_get_contents("php://input"));
			
			$user = json_decode(urldecode($data->user));
			//var_dump(mb_convert_encoding($user->name, 'gbk', 'utf-8'));
			
			echo '{"status":1}';
		
		}elseif($uri[3] == 'selfPsw'){	//�޸ĵ�ǰ�û�����

			$data = json_decode(file_get_contents("php://input"));
			$psw = json_decode(urldecode($data->psw));
			//var_dump($psw->original);
			//var_dump($psw->fresh);
			
			echo '{"status": 1}';
		
		}elseif($uri[3] == 'selfAuth'){	//��֤�����Ƿ���ȷ
			$data = json_decode(file_get_contents("php://input"));
			$psw = urldecode($data->psw);
			//var_dump($psw);
			
			echo '{"status": 1}';
		}
	}