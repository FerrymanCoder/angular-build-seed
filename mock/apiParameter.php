<?php

	$method = $_SERVER['REQUEST_METHOD'];
	
	if($method == 'GET'){
        if(isset($_GET['pid'])) {
		
			echo '{"type":true,"apiAddrValidity":true,"selected":{"name":"ccccc","id":3},"parameterEN":"asdf","parameterCN":"asdfsdfsdf˹�ٷ�","apiAddr":"www.baidu.com","output":[{"isHidden":true,"pEN":"asdf","pCN":"˹�ٷ�?"},{"isHidden":false,"pEN":"asdfdd","pCN":"˹�ٷ�"}]}';
	    }		
		else{
		//ָ��ϵͳ������api�б�
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
					$item->parameterId = mt_rand(1, 1000);
					$item->parameterType = mt_rand(0, 1);
					$item->parameterCN = urlencode(mb_convert_encoding('����'.mt_rand(1, 100), 'utf-8', 'gbk'));
					$item->parameterEN = 'parameter'.mt_rand(1,999);		
							
					$result->items[] = $item;
				}
			}else{
				$result->hasMore = false;
			}
			
			echo json_encode($result);
		}
	}elseif($method == 'POST'){
	
				
			//����ָ��Ӧ��ϵͳ
			sleep(1);
			echo '{"status": '.mt_rand(0, 1).'}';

	
	}elseif($method == 'PUT'){
	
		//$data = json_decode(file_get_contents("php://input"));
			
		sleep(1);
		echo '{"status":'.mt_rand(0, 1).'}';
	
	}elseif($method == 'DELETE'){
	
		//ɾ��
		sleep(2);
		echo '{"status":1}';
	
	}