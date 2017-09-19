
//获取对象
	//战场对象 数组
	var liArr = document.getElementsByTagName('li');
	//按钮
	var start = document.getElementById('start');
	var again = document.getElementById('again');
	
	
	
	//开始
	start.onclick = function (){
		//调用初始化 方法
		initialize();
		
		//调用设置雷区函数 重新设置雷区
		torpedo();
	}
	
		//重新开始
	again.onclick = function (){
		
		initialize();
		//调用设置雷区函数 重新设置雷区
		torpedo();
	}

	//初始化开始事件 
	function initialize(){
		//雷区点击事件
		for(var i = 0; i < liArr.length;i++){
			
			//添加属性  标记是否是地雷   默认是false
			liArr[i].tage = false;
			
			//添加属性 存储自身在雷区的编号
			liArr[i].liNumb = i;
			
			//添加雷区属性 存储地雷数量
			liArr[i].mineNumb = 0;
			
			//添加属性存储周边元素
			liArr[i].around = [];
			

			//注册单击雷区事件
			liArr[i].onclick = function (e){
				
				//判断是单击还是 标记地雷
				
				if(e.altKey){
					
					//待添加功能 标出全部地雷之后 完成游戏
					this.style.background = 'red';
		
				//else 判断是否 踩雷
				}else if(this.tage){
					
					//调用game over方法显示全部
					gameOver();
					//结束 提示
					alert('Game  Over');
				
				}else {
					//设置为显示
					this.style.background = 'transparent';
					
					//点击之后移除自身click 方法
					this.onclick=null;
					
					//判断自身周边雷数是否为空 如果师空 那么自动点开 周边的区域
					if(this.mineNumb == 0){
						
						for(var i = 0;i < this.around.length;i++){
							//点开周边元素
							liArr[this.around[i]].click();
						}
						
					}else {
						this.innerText = this.mineNumb;
					}
					
				}
			}
						
		}
		
	}
		
	
	
	//设置雷区
	function torpedo(){
		//存储雷区编号 数组
		var torArr = [0];
		
		var num;
		
		//随机出 雷区编号
		for(var i = 0;i < 80;i++){
			num = parseInt(Math.random() * 601);
			
			for(var j = 0;j < torArr.length;j++){
				if(torArr[j] == num){
					i --;
					break;
				}
			}
			if(j = torArr.length){
				torArr[j] = num;
			}
		}
			
		//将与随机数相等的li设置为雷区
		for(var n = 0;n < torArr.length;n++){
			liArr[torArr[n]].tage = true;
			
			
			//****************作弊***************
			
//				liArr[torArr[n]].innerText = liArr[torArr[n]].tage;
		}	
		
		//搜索自身 周边雷区 并储存在mineNumb 属性中
		for(var k = 0;k < liArr.length;k++){
			if(liArr[k].tage == false){
				//调用计算周边元素函数
				var mineNumb = sumOf(k);
				
				//将计算出的雷区数目存入 mineNumb属性
				liArr[k].mineNumb = mineNumb;
				
				
				//***********作弊***********

//					liArr[k].innerText = liArr[k].mineNumb;	
			}
			
			
		}
		
	}
	
	//计算周边元素   返回周边雷区个数
	function sumOf(liNumb){
		//周边元素 数组
		var rimMine = [];
		var sum = 0;
		
		//判断周边元素个数
		if(liNumb == 0){
			//左上角
			rimMine[0] = liNumb + 1;
			rimMine[1] = liNumb + 30;
			rimMine[2] = liNumb + 31;
		}else if(0 < liNumb && liNumb < 29){
			//上边
			rimMine[0] = liNumb - 1;
			rimMine[1] = liNumb + 1;
			rimMine[2] = liNumb + 29;
			rimMine[3] = liNumb + 30;
			rimMine[4] = liNumb + 31;
		}else if(liNumb == 29){
			//右上角
			rimMine[0] = liNumb - 1;
			rimMine[1] = liNumb + 29;
			rimMine[2] = liNumb + 30;
		}else if(liNumb % 30 == 0 && liNumb != 0 && liNumb != 570){
			//左边列
			rimMine[0] = liNumb - 30;
			rimMine[1] = liNumb - 29;
			rimMine[2] = liNumb + 1;
			rimMine[3] = liNumb + 30;
			rimMine[4] = liNumb + 31;	
		}else if((liNumb-29) % 30 == 0 && liNumb != 29 && liNumb != 599){
			//右边列
			rimMine[0] = liNumb - 29;
			rimMine[1] = liNumb - 30;
			rimMine[2] = liNumb - 1;
			rimMine[3] = liNumb + 29;
			rimMine[4] = liNumb + 30;	
		}else if( liNumb == 570){
			//左下角
			rimMine[0] = liNumb - 30;
			rimMine[1] = liNumb - 29;
			rimMine[2] = liNumb + 1;
		}else if( 570 < liNumb && liNumb < 599 ){
			//下边框
			rimMine[0] = liNumb - 31;
			rimMine[1] = liNumb - 30;
			rimMine[2] = liNumb - 29;
			rimMine[3] = liNumb - 1;
			rimMine[4] = liNumb + 1;
		}else if( liNumb == 599){
			//右下角
			rimMine[0] = liNumb - 31;
			rimMine[1] = liNumb - 30;
			rimMine[2] = liNumb - 1;
		}else {
			//中间部分
			rimMine[0] = liNumb - 31;
			rimMine[1] = liNumb - 30;
			rimMine[2] = liNumb - 29;
			rimMine[3] = liNumb - 1;
			rimMine[4] = liNumb + 1;
			rimMine[5] = liNumb + 29;
			rimMine[6] = liNumb + 30;
			rimMine[7] = liNumb + 31;
		}
		
		//将周边元素存入对象
		liArr[liNumb].around = rimMine;
		
		//
		
//			判断周边元素中雷的个数
		for(var i = 0;i < rimMine.length;i++){
			if(liArr[rimMine[i]].tage == true){
				sum = sum + 1;
			}
		}
		
		return sum;
		
	}
	
	//踩雷导致 游戏结束 
	function gameOver(){
		for(var i = 0;i < liArr.length;i++){
			liArr[i].onclick = null;
			
			if(liArr[i].tage){
				liArr[i].innerText = liArr[i].tage;
				liArr[i].style.background = 'red';
			}else {
				liArr[i].innerText = liArr[i].mineNumb;
			}
			if(liArr[i].tage == false && liArr[i].altKey == true){
				liArr[i].innerText = 'error';
				liArr[i].style.color = 'fuchsia';
			}
		}
	}
	