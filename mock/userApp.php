<?php

	$method = $_SERVER['REQUEST_METHOD'];
	
	if($method == 'GET'){		
		//ָ���û������пɷ���ϵͳ�б�
		$uid = $uri[3];
		
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
				$item->appId = mt_rand(1, 1000);
				$item->app = urlencode(mb_convert_encoding('ϵͳ'.mt_rand(1,999), 'utf-8', 'gbk'));
				$item->status = mt_rand(0, 1);
				$item->ipLimit = mt_rand(0, 1);
				
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
		if($_GET['opt'] == 'onlyStatus'){
		
			sleep(1);
			echo '{"status": '.mt_rand(0, 1).'}';
		}
		
	}elseif($method == 'PUT'){
		
		//Ϊָ���û������ɷ���ϵͳ
		echo '{"status":'.mt_rand(0, 1).'}';

		
	}elseif($method == 'DELETE'){
		
		//ɾ��
		sleep(2);
		echo '{"status":1}';
		
	}