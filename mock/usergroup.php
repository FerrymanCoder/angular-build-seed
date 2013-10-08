<?php

	$method = $_SERVER['REQUEST_METHOD'];

	if($method == 'GET'){
		
			$page = intval($uri[4]); //����ҳ��
			$preNum = 7;	//ÿҳ����
			$maxNum = 18;	//������
			
			$maxPage = ceil($maxNum / $preNum);
			$action = isset($_GET['group']) ? mb_convert_encoding(urldecode($_GET['group']), 'gbk', 'utf-8') : '';	//��ȡ�����ؼ���
			
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
					$item->groupId = mt_rand(1, 1000);
					$item->name = urlencode(mb_convert_encoding($action.'�û���'.mt_rand(1,999), 'utf-8', 'gbk'));
					$item->parentName = urlencode(mb_convert_encoding('���û���'.mt_rand(1, 999), 'utf-8', 'gbk'));
					$item->type = mt_rand(0, 1);
					$item->bindGroup = urlencode(mb_convert_encoding('û�а��û���', 'utf-8', 'gbk'));
					$item->userCount = mt_rand(1, 9);	
					$item->mobile = '13729837023';
					//$item->photo = '';	//����û�ͷ����α�¶uri��
					$item->info = urlencode(mb_convert_encoding(str_repeat('���ڲ��ڲ��ڲ��ڲ�',mt_rand(1, 10)), 'utf-8', 'gbk'));
					$item->validity = (bool)mt_rand(0, 1);
						
					$result->items[] = $item;
				}
			}else{
				$result->hasMore = false;
			}
				
			echo json_encode($result);
		
	}elseif($method == 'POST'){

		//���ܵ�post�ύ�����ݣ���ʽΪjson
		$data = json_decode(file_get_contents("php://input"));		
		
		//��������״̬�޸ģ� ��������Ч��
		if($uri[3] == 'onlyStatus'){
		
			sleep(1);
			echo '{"status": '.mt_rand(0, 5).'}';

		}		
	}elseif($method == 'PUT'){

		sleep(2);		
		echo '{"status":'.mt_rand(0, 1).'}';
		
	}elseif($method == 'DELETE'){
		
		//ɾ��
		sleep(2);
		echo '{"status":'.mt_rand(0, 1).'}';
		
	}