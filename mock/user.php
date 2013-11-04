<?php

	$method = $_SERVER['REQUEST_METHOD'];

	if($method == 'GET'){
		
		if($uri[3] == 0){
			//�����û�
			$page = intval($uri[4]); //����ҳ��
			$preNum = 7;	//ÿҳ����
			$maxNum = 18;	//������
			
			$maxPage = ceil($maxNum / $preNum);
			$action = isset($_GET['user']) ? mb_convert_encoding(urldecode($_GET['user']), 'gbk', 'utf-8') : '';	//��ȡ�����ؼ���
			
			$result = new stdClass();
			$result->page = $page;
			$result->maxNum = $maxNum;
			$result->maxPage = $maxPage;
			$result->items = array();
			if($page <= $maxPage){
					
				$result->hasMore = true;
					
				for($i = 0; (($page - 1) * $preNum) < $maxNum && $i < min($preNum, $maxNum - ($page - 1) * $preNum); $i++){
					mt_srand((double)microtime()*1000000);
						
					$item = new stdClass();
					$item->userId = mt_rand(1, 1000);
					$item->name = urlencode(mb_convert_encoding($action.'�׸���'.mt_rand(1,999), 'utf-8', 'gbk'));
					$item->account = 'xxx'.mt_rand(1, 999);
					$item->idCard = '123456789012345';
					$item->sex = mt_rand(0, 1);
					$item->type = mt_rand(0, 1);
					$item->email = 'mail'.mt_rand(1, 999).'@163.com';
					$item->qq = '664566173';
					$item->phone = '0372-5980188';	
					$item->mobile = '13729837023';
					$item->photo = './img/default-face.png';
					$item->info = urlencode(mb_convert_encoding(str_repeat('����������������',mt_rand(1, 10)), 'utf-8', 'gbk'));
					$item->validity = (bool)mt_rand(0, 1);
						
					$result->items[] = $item;
				}
			}else{
				$result->hasMore = false;
			}
				
			echo json_encode($result);
		
		}else{
			//ָ���û�
				
			$item = new stdClass();
			$item->userId = $uri[3];
			$item->name = urlencode(mb_convert_encoding('�׸���'.$uri[3], 'utf-8', 'gbk'));
			$item->account = 'xxx'.mt_rand(1, 999);
			$item->idCard = '123456789012345';
			$item->sex = mt_rand(0, 1);
			$item->type = mt_rand(0, 1);
			$item->email = 'mail'.mt_rand(1, 999).'@163.com';
			$item->qq = '664566173';
			$item->phone = '0372-5980188';	
			$item->mobile = '13729837023';
			$item->photo = './img/default-face.png';
			$item->info = urlencode(mb_convert_encoding(str_repeat('����������������',mt_rand(1, 10)), 'utf-8', 'gbk'));
			$item->validity = (bool)mt_rand(0, 1);
			
			echo json_encode($item);	
		}
		
	}elseif($method == 'POST'){

		//���ܵ�post�ύ�����ݣ���ʽΪjson
		$data = json_decode(file_get_contents("php://input"));		
		
		//��������״̬�޸ģ� ��������Ч��
		if($uri[3] == 'onlyStatus'){
		
			sleep(1);
			echo '{"status": '.mt_rand(0, 1).'}';

		}elseif($uri[3] == 'self'){	//���µ�ǰ�û�����

			//var_dump(mb_convert_encoding($data->info, 'gbk', 'utf-8'));
			
			sleep(1);
			echo '{"status":'.mt_rand(0, 1).'}';
		
		}elseif($uri[3] == 'selfPsw'){	//�޸ĵ�ǰ�û�����
		
			//var_dump($data->original);
			//var_dump($data->fresh);
			
			echo '{"status": 1}';
		
		}elseif($uri[3] == 'selfAuth'){	//��֤�����Ƿ���ȷ

			$psw = urldecode($data->psw);
			//var_dump($psw);
			
			echo '{"status": 1}';
		
		}elseif($uri[3] == 'add'){
			//�����û�
			
			var_dump(mb_convert_encoding(urldecode($data->name), 'gbk', 'utf-8'));
			
			sleep(1);
			echo '{"status":'.mt_rand(0, 1).'}';
		
		}elseif($uri[3] == 'checkAccount'){
			//����ʺ��Ƿ����
			
			sleep(2);
			echo '{"status":'.mt_rand(0, 1).'}';
		}
		
	}elseif($method == 'PUT'){
		
		if(isset($uri[3]) && $uri[3] == 'password'){
			//����ָ���û�����
			
			sleep(2);
			echo '{"status":'.mt_rand(0, 1).'}';
			
		}else{
			//����ָ���û���Ϣ
			
			//$data = json_decode(file_get_contents("php://input"));
			//var_dump(mb_convert_encoding(urldecode($data->name), 'gbk', 'utf-8'));
			
			sleep(2);
			echo '{"status":'.mt_rand(0, 1).'}';
		}
		
	}elseif($method == 'DELETE'){
		
		//ɾ��
		sleep(2);
		echo '{"status":'.mt_rand(0, 1).'}';
		
	}