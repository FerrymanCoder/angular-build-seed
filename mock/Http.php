<?php
/**
 * XK Framework
 * 
 * LICENSE
 * 
 * @copyright Copyright (c) 2011 MingDe Technologies CHINA Inc.
 * @version beta0.1
 */

/**
 * 
 * �ļ��ϴ���
 * ���ڶ������ļ��ϴ�
 * 
 * @author ����
 * @since 2011-11-3
 */
class Http
{
	/**
	 * ������ļ�����
	 * @var array
	 * 
	 * @author ����
	 * @since 2011-11-3
	 */
    private $allowTypes     = array('gif','jpg','png','bmp','vsd','dwg');
    
    /**
	 * �ϴ�·��
	 * @var string
	 * 
	 * @author ����
	 * @since 2011-11-3
	 */
    private $uploadPath     = './';
    
    /**
	 * �ϴ��ļ���С����
	 * @var int
	 * 
	 * @author ����
	 * @since 2011-11-3
	 */
    private $maxSize        = 1000000;
    
    /**
	 * ״̬��
	 * @var int
	 * 
	 * @author ����
	 * @since 2011-11-3
	 */
    private $msgCode        = NULL;
    
    /**
	 * �ϴ�����µ��ļ����ƣ�����·����
	 * @var string
	 * 
	 * @author ����
	 * @since 2011-11-3
	 */
	private $newFile		= NULL;
    
    /**
     * ���췽��
     * 
     * @param array $options
     * @return void
     * 
     * @author ����
     * @since 2011-11-3
     */
    public function __construct(array $options = array())
    {
        //ȡ���ڵ����б���
        $vars = get_class_vars(get_class($this));
        //�������ڱ���
        foreach ($options as $key=>$value) {
            if (array_key_exists($key, $vars)) {
                $this->$key = $value;
            }
        }
    }
	
     /**
     * �ļ��ϴ�����
     * 
     * @param array $files
     * @return boolean
     * 
     * @author ����
     * @since 2011-11-3
     */
    public function fileUpload($file, $sysName='')
    {
        $name       = $file['name'];
        $tmpName    = $file['tmp_name'];
        $error      = $file['error'];
        $size       = $file['size'];

        //����ϴ��ļ��Ĵ�С,����,�ϴ���Ŀ¼
        if ($error > 0) {
            $this->msgCode = $error;
            return false;
        } elseif (!$this->checkType($name)) {
            return false;
        } elseif (!$this->checkSize($size)) {
            return false;
        } elseif (!$this->checkUploadFolder($sysName)) {
            return false;
        } 

        $newFile = $this->uploadPath . '/' . $this->randFileName($name);

        //�����ļ����ϴ�Ŀ¼
        if (!is_uploaded_file($tmpName)) {
            $this->msgCode = -3;
            return false;
        } elseif(@move_uploaded_file($tmpName, $newFile)) {
            $this->msgCode = 0;
            
            if(strpos($newFile, '..') == 0)
            {
            	$newFile = substr($newFile, 2);
            }
            
            $this->newFile = $newFile;
            return true;
        } else {
            $this->msgCode = -3;
            return false;
        }
    }

    /**
    * ����ϴ��ļ��Ĵ�С��û�г�������
    *
    * @var int $size
    * @return boolean
    * 
    * @author ����
    * @since 2011-11-3
    */
    private function checkSize($size)
    {
        if ($size > $this->maxSize) {
            $this->msgCode = -2;
            return false;
        } else {
            return true;
        }
    }

    /**
    * ����ϴ��ļ�������
    *
    * @var string $fileName
    * @return boolean
    * 
	* @author ����
    * @since 2011-11-3
    */
    private function checkType($fileName)
    {
        $arr = explode(".", $fileName);
        $type = end($arr);
        if (in_array(strtolower($type), $this->allowTypes)) {
            return true;
        } else {
            $this->msgCode = -1;
            return false;
        }
    }

    /**
    * ����ϴ���Ŀ¼�Ƿ����,�粻���ڳ��Դ���
    *
    * @return boolean
    * 
    * @author ����
    * @since 2011-11-3
    */
    private function checkUploadFolder($sysName='')
    {
        if (null === $this->uploadPath) {
            $this->msgCode = -5;
            return false;
        }
        
        $this->uploadPath = rtrim($this->uploadPath,'/');
        $this->uploadPath = rtrim($this->uploadPath,'\\');
        //TODO б������
        if(!empty($sysName)){
        	$this->uploadPath .= '/'.$sysName;
        }
		$this->uploadPath .='/'. date('Ymd');
		
		return $this->mkdir($this->uploadPath);
    }
	
    /**
     * Ŀ¼����
     *
     * @param 	string $path 	Ŀ¼��ʶ(ftp)
     * @return	boolean
     *
     * @author ����
     * @since 2012-05-26
     */
    public function mkdir($dir)
    {
    	if (!file_exists($dir)){
    		
    		$result = FALSE;
    		
    		//�жϸ�Ŀ¼���ϼ�Ŀ¼�Ƿ���ڣ���������ڣ��ݹ鴴��
    		if(!file_exists(dirname($dir))){
    			$result = $this->mkdir(dirname($dir));
    			if(!$result)
    				return FALSE;
    		}
    		
    		$oldmask = umask(0);
    		$result = mkdir($dir);
    		umask($oldmask);
    		
    		if(!$result)
    		{
    			// �����ļ���ʧ��
    			$this->msgCode = -4;
    			return FALSE;
    		}
    		 
    		return TRUE;
    		 
    	} elseif(!is_writable($dir)) {
    		$this->msgCode = -6;
    		return FALSE;
    	} else {
    		return TRUE;
    	}
    }
    
    /**
    * ��������ļ���
    * 
    * @var string $fileName
    * @return string
    * 
    * @author ����
    * @since 2011-11-3
    */
    private function randFileName($fileName)
    {
        list($name,$type) = explode(".",$fileName);
		
        $newFile = 'MingDe'.'_'.date('YmdHis');
        
        return $newFile . '_' . mt_rand() . '.' . $type;
    }

    /**
    * ȡ�ϴ��Ľ������Ϣ
    *
    * @return array
    * 
    * @author ����
    * @since 2011-11-3
    */
    public function getStatus()
    {
        $messages = array(
            4   => "û���ļ����ϴ�",
            3   => "�ļ�ֻ�������ϴ�",
            2   => "�ϴ��ļ�������HTML����MAX_FILE_SIZEѡ��ָ����ֵ",
            1   => "�ϴ��ļ�������php.ini ��upload_max_filesizeѡ���ֵ",
            0   => "�ϴ��ɹ�",
            -1  => "ĩ���������",
            -2  => "�ļ������ϴ��ļ����ܳ���{$this->maxSize}���ֽ�",
			-3  => "�ϴ�ʧ��",
            -4  => "��������ϴ��ļ�Ŀ¼ʧ�ܣ�������ָ���ϴ�Ŀ¼",
            -5  => "����ָ���ϴ��ļ���·��",
            -6	=> "ָ�����ļ�Ŀ¼û��дȨ��"
        );

        return array('error'=>$this->msgCode, 'message'=>$messages[$this->msgCode], 'file'=>$this->newFile);
    }
}