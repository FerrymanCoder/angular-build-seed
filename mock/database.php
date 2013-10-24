<?php
	$method = $_SERVER['REQUEST_METHOD'];
	if($method == 'GET'){
		
		if(isset($_GET['download']) && $_GET['download'] == 1){
			
			//��ȡ���ļ�����
			//var_export(mb_convert_encoding(urldecode($_GET['file']), 'gbk', 'utf-8'));
			
			//header('Content-Type: image/png');
			header('Content-Disposition: attachment; filename="downloaded.png"');  //�������غ󱣴������
			echo file_get_contents('demo.png');
			exit;
		}
		
		//�б�
		$page = $uri[4]; //����ҳ��
		$preNum = 7;	//ÿҳ����
		$maxNum = 10;	//������
		$maxPage = ceil($maxNum / $preNum);
		$rowid=$preNum*$page;
		
		if($page <= $maxPage){
			$result = new stdClass();
			$result->page = $page;
			$result->maxNum = $maxNum;
			$result->maxPage = $maxPage;
			
			$result->hasMore = true;
			
			$result->items = array();	
			for($i = 0; (($page - 1) * $preNum) < $maxNum && $i < min($preNum, $maxNum - ($page - 1) * $preNum); $i++){
				mt_srand((double)microtime()*1000000);
					
				$item = new stdClass();
				$item->id = $rowid+$i+1;				
				$item->dateTime = date('Y-m-d H:i:s', time() + $i * 1000);
				$item->fileName = urlencode(mb_convert_encoding('�����ļ�'.mt_rand(0, 100), 'utf-8', 'gbk'));
				$item->fileSize = mt_rand(0, 5).'MB';
					
				$result->items[] = $item;
			}
		}else{
			$result->hasMore = false;
		}
		
		sleep(1);
		
		echo json_encode($result);
		
	}elseif($method == 'PUT'){
		//����
		
		$result = new stdClass();
		$result->status = mt_rand(0, 1);
		
		if($result->status == 1){
			$result->data = new stdClass();
			$result->data->id = mt_rand(0, 999);
			$result->data->dateTime = date('Y-m-d H:i:s', time() + 6 * 1000);
			$result->data->fileName = urlencode(mb_convert_encoding('�����ļ�'.mt_rand(0, 100), 'utf-8', 'gbk'));
			$result->data->fileSize = mt_rand(0, 5).'MB';
		}
		
		sleep(2);
		echo json_encode($result);
		
	}elseif($method == 'DELETE'){
		//ɾ��
		sleep(1);
		echo '{"status":'.mt_rand(0, 1).'}';
		
	}elseif($method == 'POST'){
		//�ָ�
		sleep(3);
		echo '{"status":'.mt_rand(0, 1).'}';
	}