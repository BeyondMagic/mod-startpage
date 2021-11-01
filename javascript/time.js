'use strict';

const startTime = () => {
  
  const dots = '<span class="dots">:</span>';
  const date = new Date();
  const [h,m,s] = [date.getHours(), date.getMinutes(), date.getSeconds()].map(e => formatTime(e));
  document.getElementById('time').innerHTML = ``;
  document.getElementById('time').insertAdjacentHTML( 'beforeend', `${h}${dots}${m}${dots}${s}` );
  setTimeout('startTime()', 500);
  
}

// Format time for better output (with zeros)
const formatTime = i => {
  
  if (i < 10) i = "0" + i;
  return i;
  
}

(function (){
  
  startTime();

})();
