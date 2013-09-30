<?php

	$method = $_SERVER['REQUEST_METHOD'];

	if($method == 'GET'){

		//����Ȩ��
		$page = intval($uri[4]); //����ҳ��
		$preNum = 7;	//ÿҳ����
		$maxNum = 18;	//������
		
		$maxPage = ceil($maxNum / $preNum);
		$action = isset($_GET['user']) ? mb_convert_encoding(urldecode($_GET['user']), 'gbk', 'utf-8') : '';	//��ȡ�����ؼ���
		
		if($uri[3] == 0){
			//�����û�
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
					//$item->photo = '';	//����û�ͷ����α�¶uri��
					$item->info = urlencode(mb_convert_encoding(str_repeat('����������������',mt_rand(1, 10)), 'utf-8', 'gbk'));
					$item->validity = (bool)mt_rand(0, 1);
						
					$result->items[] = $item;
				}
			}else{
				$result->hasMore = false;
			}
				
			echo json_encode($result);
		}
		
	}elseif($method == 'POST'){

		//���ܵ�post�ύ�����ݣ���ʽΪjson
		$data = json_decode(file_get_contents("php://input"));
		
		//��������״̬�޸ģ� ��������Ч��
		if($uri[3] == 'onlyStatus'){
		
			sleep(1);
			echo '{"status": '.mt_rand(0, 1).'}';

		}elseif($uri[3] == 'self'){	//���µ�ǰ�û�����

			$user = json_decode(urldecode($data->user));
			//var_dump(mb_convert_encoding($user->name, 'gbk', 'utf-8'));
			sleep(5);
			echo '{"status":1}';
		
		}elseif($uri[3] == 'selfPsw'){	//�޸ĵ�ǰ�û�����

			$psw = json_decode(urldecode($data->psw));
			//var_dump($psw->original);
			//var_dump($psw->fresh);
			
			echo '{"status": 1}';
		
		}elseif($uri[3] == 'selfAuth'){	//��֤�����Ƿ���ȷ

			$psw = urldecode($data->psw);
			//var_dump($psw);
			
			echo '{"status": 1}';
		}
		
	}elseif($method == 'PUT'){

		sleep(2);		
		echo '{"status":'.mt_rand(0, 1).'}';
		
	}elseif($method == 'DELETE'){
		
		//ɾ��
		sleep(2);
		echo '{"status":'.mt_rand(0, 1).'}';
		
	}