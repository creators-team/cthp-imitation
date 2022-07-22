window.addEventListener('DOMContentLoaded', function(){
  // ブログページネーションアイコン
  const pageRadios = document.querySelectorAll('.PageRadio');
  const panelLinks = document.querySelectorAll('.panel-link');
  pageRadios.forEach(e=>{
    e.addEventListener('input', function(){
      const prevCurrent = document.querySelector('.blog-page-icon.m-current');
      const nextCurrent = document.querySelector('.blog-page-icon:not(.m-current)');
      prevCurrent.classList.remove('m-current');
      nextCurrent.classList.add('m-current');
    });
  });
  // パネルアニメーション
  document.addEventListener('mousemove', function(event){
    const x = event.clientX; // ビューポートの左端からのマウスの距離
    const y = event.clientY; // ビューポートの上端からのマウスの距離
    const screenWidth  = this.body.clientWidth;
    const screenHeight = this.documentElement.clientHeight;
    const moveX = (1 - x * 2 / screenWidth) * 20;
    const moveY = (1 - y * 2 / screenHeight) * 20;
    panelLinks.forEach(e=>{
      // なぜかわからないけどrotateXにmoveYを、rotateYにmoveXを使うとマウスの方向を向く
      e.style.setProperty('--rotateX', moveY + 'deg');
      e.style.setProperty('--rotateY', -moveX + 'deg');
    });
  });
  // タイピングアニメーション
  const typingElem = document.getElementById('TextTyping');
  const data = {
    firstText: '平均年齢20.2歳の',
    secondText: '全国に散らばった',
    cursorHTML: '<span class="typing-cursor"></span>',
    staticHTML: ' クリエイター集団',
  }
  let source = data.firstText; // firstTextまたはsecondText
  let result = data.firstText; // 表示中の文字
  let displayLength = data.firstText.length; // 表示する文字数
  const changeText = text => {typingElem.innerHTML = text}
  (async ()=>{
    const sleep = (miliSecond) => {
      return new Promise(resolve => setTimeout(resolve, miliSecond));
    }
    for(;;){
      if(displayLength === 0){
        // 何も表示しないとき
        // 動的な文字を消して1000ms待ったら次へ
        changeText(result + data.staticHTML);
        await sleep(1000);
        displayLength++;
      }else if(displayLength === source.length + 1){
        // 表示する文字数が最大値を超えたとき
        // ソースを入れ替えて値をリセット、次に備える
        if(source === data.firstText){
          source = data.secondText;
        }else{
          source = data.firstText;
        }
        await sleep(2700);
        result = '';
        displayLength = 0;
      }else{
        // 1 ~ source文字数 まで表示するとき
        // 文字を変更して150ms後に次へ
        result = source.slice(0, displayLength);
        changeText(result + data.cursorHTML + data.staticHTML);
        await sleep(150);
        displayLength++;
      }
    }
  })()
});
