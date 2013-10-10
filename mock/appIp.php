<?php

	$method = $_SERVER['REQUEST_METHOD'];
	
	if($method == 'GET'){
		
		if($uri[4] == 0){
			//ָ���û�������IP�б�
			$page = intval($uri[5]); //����ҳ��
			$preNum = 7;	//ÿҳ����
			$maxNum = 18;	//������
				
			$maxPage = ceil($maxNum / $preNum);
				
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
					$item->ipId = mt_rand(1, 1000);
					$item->ip = '192.168.1.1';
					$item->validity = mt_rand(0, 1);
					$item->info = urlencode(mb_convert_encoding(str_repeat('����������������',mt_rand(1, 10)), 'utf-8', 'gbk'));
					$item->begin = '2013-10-20';
					$item->end = -1;
					
					$result->items[] = $item;
				}
			}else{
				$result->hasMore = false;
			}
			
			echo json_encode($result);
		
		}else{
			//ָ���û�����Ϣ
			mt_srand((double)microtime()*1000000);
				
			$item = new stdClass();
			$item->appId = mt_rand(1, 1000);
			$item->name = urlencode(mb_convert_encoding('ϵͳ'.mt_rand(1,999), 'utf-8', 'gbk'));
			$item->logo = '';
			$item->tag = 'demo';
			$item->domain = 'http://www.codingcool.com';
			$item->ipLimit = mt_rand(0, 1);
			$item->validity = mt_rand(0, 1);
			$item->authorization = mt_rand(0, 1);
			$item->info = urlencode(mb_convert_encoding(str_repeat('����������������',mt_rand(1, 10)), 'utf-8', 'gbk'));
			
			echo json_encode($item);
			
		}
			
	
	}elseif($method == 'POST'){
	
		//���ܵ�post�ύ�����ݣ���ʽΪjson
		$data = json_decode(file_get_contents("php://input"));
	
		//��������״̬�޸ģ� ��������Ч��
		if($uri[3] == 'onlyStatus'){
	
			sleep(1);
			echo '{"status": '.mt_rand(0, 1).'}';	
		
		}elseif($uri[3] == 'update'){
			
			//����ָ��Ӧ��ϵͳ
			sleep(1);
			echo '{"status": '.mt_rand(0, 1).'}';
		}
	
	}elseif($method == 'PUT'){
	
		//$data = json_decode(file_get_contents("php://input"));
		//var_dump(mb_convert_encoding(urldecode($data->name), 'gbk', 'utf-8'));
			
		sleep(1);
		echo '{"status":'.mt_rand(0, 1).'}';
	
	}elseif($method == 'DELETE'){
	
		//ɾ��
		sleep(2);
		echo '{"status":1}';
	
	}