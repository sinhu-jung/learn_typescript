// mapped types
// 기존에 정의되어 있는 타입을 새로운 타입으로 변환해 주는 문법
// 자바스크립트의 map 함수를 타입에 적용한 것과 같은 효과

type Heroes = 'Hulk' | 'Thor' | 'Capt';
type HeroAges = { [K in Heroes]: number };
const ages: HeroAges = {
  Hulk: 'a', // hulk's age must be number
};
