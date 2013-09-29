<?php
	$method = $_SERVER['REQUEST_METHOD'];
	
	if($method == 'GET'){
		//����Ȩ��
		$page = intval($uri[4]); //����ҳ��
		$preNum = 7;	//ÿҳ����
		$maxNum = 18;	//������
		
		$maxPage = ceil($maxNum / $preNum);
		
		$action = isset($_GET['privilege']) ? mb_convert_encoding(urldecode($_GET['privilege']), 'gbk', 'utf-8') : '';	//��ȡ�����ؼ���
		
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
					$item->privId = mt_rand(1, 1000);
					$item->privName = urlencode(mb_convert_encoding($action.'����'.mt_rand(1,1000), 'utf-8', 'gbk'));
					$item->app = urlencode(mb_convert_encoding(mt_rand(1,1000).'��ϵͳ', 'utf-8', 'gbk'));
					$item->group = urlencode(mb_convert_encoding(mt_rand(1,1000).'��', 'utf-8', 'gbk'));
					$item->info = urlencode(mb_convert_encoding(str_repeat('����������������',mt_rand(1, 5)), 'utf-8', 'gbk'));
					$item->validity = (bool)mt_rand(0, 1);
					$item->default = mt_rand(0, 1);
			
					$result->items[] = $item;
				}
			}else{
				$result->hasMore = false;
			}
			
			echo json_encode($result);
		}		
	}elseif($method == 'POST'){
		
		$data = json_decode(file_get_contents("php://input"));
		
		//��������״̬�޸ģ� ��������Ч�ԣ�Ĭ��״̬
		if(isset($_GET['opt']) && $_GET['opt'] == 'onlyStatus'){
			
			if($data->type == 'validity'){
				
				sleep(1);
				echo '{"status": '.mt_rand(0, 1).'}';
			
			}elseif($data->type == 'default'){
				
				echo '{"status": '.mt_rand(0, 1).'}';
			}
						
			exit;
		}
		
		echo '{"status": '.mt_rand(0, 1).'}';
	
	}elseif($method == 'PUT'){
		//����
		sleep(2);		
		echo '{"status":'.mt_rand(0, 1).'}';
		
	}elseif($method == 'DELETE'){
		
		//ɾ��
		sleep(2);
		echo '{"status":'.mt_rand(0, 1).'}';
		
	}
	
	