// �]�w�p�ɾ��G�C�����@�� timer �禡
setInterval(timer, 1000);

//�ŧi�ݷ|��p�ɾ����|�Ψ쪺�ܼ�
var now;  //�x�s��U����ɶ������

var second;  //�x�s��U���
var secondDeg;  // �x�s��w���׼�
var secondHand = document.querySelector('.second-hand');  // ��������V��w

function timer(){
  now = new Date();  //  �z�L new �@�� Date() ���o��U�ɶ�

  second = now.getSeconds();  // �ϥ� getSeconds() ���o��U����� (0-59)
  secondDeg = ((second / 60) * 360);  // �Q�ά�ƭp��X���w������
  secondHand.style.transform = `rotate(${secondDeg}deg)`;  // �N��ƹϹ���
}

secondDeg = (second / 60) * 360;

secondHand.style.transform = `rotate(${secondDeg}deg)`;

// secondHand.css({
//     transform: `rotate(${secondDeg}deg)`
// });

var second;
var secondDeg;
var secondHand = document.querySelector('.second-hand');

var min;
var minDeg;
var minHand = document.querySelector('.min-hand');

var hour;
var hourDeg;
var hourHand = document.querySelector('.hour-hand');

function timer(){
  now = new Date();

  second = now.getSeconds();
  secondDeg = (second / 60) * 360;
  secondHand.style.transform = `rotate(${secondDeg}deg)`;

  min = now.getMinutes();
  minDeg = (min / 60) * 360;
  minHand.style.transform = `rotate(${minDeg}deg)`;

  hour = now.getHours();
  hourDeg = (hour / 12) * 360;
  hourHand.style.transform = `rotate(${hourDeg}deg)`;
  var time_now = hour + ':' + min + ':' + second
  console.log(time_now)
  $(".e_clock").text(time_now)
}