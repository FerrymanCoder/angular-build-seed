<?php

	$method = $_SERVER['REQUEST_METHOD'];

	if($method == 'GET'){

			if($uri[3] != 0){
				//��ʾָ���û���������û��б�
				$page = intval($uri[4]); //����ҳ��
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
						$item->userID = mt_rand(1, 1000);
						
						$item->userName = urlencode(mb_convert_encoding('�û���'.mt_rand(1,999), 'utf-8', 'gbk'));
						$item->name = 'USERXXX'.mt_rand(1,999);
						$item->userCount = mt_rand(1,9);
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
			echo '{"status": '.mt_rand(0, 5).'}';
		}		
	}elseif($method == 'PUT'){

		sleep(1);		
		echo '{"status":'.mt_rand(0, 1).'}';
		
	}elseif($method == 'DELETE'){
		
		//ɾ��
		sleep(2);
		echo '{"status":'.mt_rand(0, 1).'}';
		
	}