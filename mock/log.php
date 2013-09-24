<?php

	$method = $_SERVER['REQUEST_METHOD'];
	
	if($method == 'GET'){
		if($uri[3] == 'login'){

			$page = $uri[7]; //����ҳ��
			$preNum = 7;	//ÿҳ����
			$maxNum = 18;	//������
			
			$maxPage = ceil($maxNum / $preNum);
			
			if($uri[5] == 'myself'){
				//��ǰ��¼�û�
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
						$item->dateTime = date('Y-m-d H:i:s', time() + $i * 1000);
						$item->ipv4 = '192.168.137.'.mt_rand(2, 254);
						$item->ipv6 = '';
						$item->status = mt_rand(0, 1).'';	//�������ַ����У���Ȼng����bug
					
						$result->items[] = $item;
					}	
				}else{
					$result->hasMore = false;
				}				
				
				//sleep(2);
				
				echo json_encode($result);
				
			}elseif($uri[5] == '0'){
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
                  		$item->userid = mt_rand(1, 1000);
                  		$item->userName = urlencode(mb_convert_encoding('��˿'.mt_rand(1,1000).'��', 'utf-8', 'gbk'));
                  		$item->dateTime = date('Y-m-d H:i:s', time() + $i * 1000);
                  		$item->ipv4 = '192.168.137.'.mt_rand(2, 254);
                  		$item->ipv6 = '';
                  		$item->status = mt_rand(0, 1).'';	//�������ַ����У���Ȼng����bug

                  		$result->items[] = $item;
                	}
             	}else{
                	$result->hasMore = false;
                }

                sleep(2);

                echo json_encode($result);
                
			}else{
				//ָ���û�
				
			}
			
		}elseif($uri[3] == 'action'){
			
			$uid = $uri[5];	//�û�id
			
			$action = isset($_GET['action']) ? mb_convert_encoding($_GET['action'], 'gbk', 'utf-8') : '';	//��ȡ�����ؼ���
			
			$page = intval($uri[7]); //����ҳ��
			$preNum = 7;	//ÿҳ����
			$maxNum = 18;	//������
				
			$maxPage = ceil($maxNum / $preNum);
			
			if($uid == '0'){
				//�����û�
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
						$item->userid = mt_rand(1, 1000);
						$item->userName = urlencode(mb_convert_encoding('��˿'.mt_rand(1,1000).'��', 'utf-8', 'gbk'));
						$item->action = urlencode(mb_convert_encoding($action.'����'.mt_rand(1,1000), 'utf-8', 'gbk'));
						$item->dateTime = date('Y-m-d H:i:s', time() + $i * 1000);
						$item->ipv4 = '192.168.137.'.mt_rand(2, 254);
						$item->ipv6 = '';
						$item->info = urlencode(mb_convert_encoding(str_repeat('����������������',mt_rand(1, 5)), 'utf-8', 'gbk'));;	//�������ַ����У���Ȼng����bug
				
						$result->items[] = $item;
					}
				}else{
					$result->hasMore = false;
				}
				
				sleep(2);
				
				echo json_encode($result);
				
			}else{
				//ָ���û�
				
			}		
		}
	}