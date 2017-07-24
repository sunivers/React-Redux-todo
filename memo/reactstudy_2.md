## 자바스크립트 호이스팅이란?
변수 선언이 안되어 있을때 변수 사용하면 ->
위로 끌어올리고(1) / undefined할당(2) 두가지를 실행해주어 오류 안남.

원래 var로 선언했을 때에는 호이스팅 가능했다.
let으로 선언하면 안되나?

표준문서에서는 호이스팅은 된다.
그러나 위로 끌어올려서 메모리에 변수 공간은 마련하지만(1) undefined 할당(2)을 안해주는거임.
그래서 오류남.

TDZ(임시사각지대) 존재. 선언은 되었지만 할당 안된 변수 사용한 곳.

ES6에서는 변수선언 없이 사용하거나 에러 가능성 있는 상황에서 칼같이 지적함.
기존에는 눈치껏 넘어가줬음.

기존 객체 내 함수에서 this를 쓰면 window객체가 할당되었음. (외부 this를 사용할 수 없다.)
그러나 arrow function 에서는 객체 내 함수에서 this 사용하면 객체가 할당됨. 아주 좋다. (객체 내 어디서든 this는 자기자신)

ture/false 확인하는법
!!null
!!0
!!1
!!’’
앞에 !!를 붙인다.

false 출력하는 애들 5가지
0
‘’
false
null //비어있는 ‘실존값’
undefined //empty
NaN

객체 내 함수에서는 arrow function 쓰는것 권장되지 않음.
왜냐하면 this를 받아올 수 없기 때문에...


`` back-tick 사용이 빈번해질것임. - templat literals