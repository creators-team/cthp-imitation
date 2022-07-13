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
    const x = event.clientX;
    const y = event.clientY;
    const screenWidth  = this.body.clientWidth;
    const screenHeight = this.documentElement.clientHeight;
    const moveX = (1 - x * 2 / screenWidth) * 20
    const moveY = (1 - y * 2 / screenHeight) * 20
    panelLinks.forEach(e=>{
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
  let source = data.firstText;
  let result = data.firstText;
  let displayLength = data.firstText.length;
  const changeText = text => {typingElem.innerHTML = text}
  const tryChangeText = ()=>{
    switch(displayLength){
    case 0:
      changeText(result + data.staticHTML);
      setTimeout(()=>{
        displayLength++;
        tryChangeText();
      }, 1000);
      break;
    case source.length + 1:
      if(source === data.firstText){
        source = data.secondText;
      }else{
        source = data.firstText;
      }
      setTimeout(()=>{
        result = '';
        displayLength = 0;
        tryChangeText();
      }, 2700);
      break;
    default:
      result = source.slice(0, displayLength);
      changeText(result + data.cursorHTML + data.staticHTML);
      setTimeout(()=>{
        displayLength++;
        tryChangeText();
      }, 150);
    }
  }
  tryChangeText();
});
