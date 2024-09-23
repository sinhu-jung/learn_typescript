/**
 * Partial
 * 
 * 파셜 타입은 특정 타입의 부분 집합을 만족하는 타입을 정희 할 수 있다.
 */
interface Address {
  email: string;
  address: string;
}

type MyEmail = Partial<Address>;
const me: MyEmail = {}; // 가능
const you: MyEmail = { email: "noh5524@gmail.com" }; // 가능
const all: MyEmail = { email: "noh5524@gmail.com", address: "secho" }; // 가능

/**
 * Omit
 * 
 * 오밋 타입은 특정 타입에서 지정된 속성만 제거한 타입을 정의해 준다.
 */
interface AddressBook {
  name: string;
  phone: number;
  address: string;
  company: string;
}
const phoneBook: Omit<AddressBook, 'address'> = {
  name: '재택근무',
  phone: 12342223333,
  company: '내 방'
}
const chingtao: Omit<AddressBook, 'address'|'company'> = {
  name: '중국집',
  phone: 44455557777
}


interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  stock: number;
}

// 상품 목록을 받아오기 위한 API 함수
function fetchProducts(): Promise<Product[]> {

}

/**
 * Pick
 * 
 * 기존에 선언된 타입에서 필요한 요소만 선택하여 사용할 수 있다.
 */
type ShoppingItem = Pick<Product, 'id' | 'name' | 'price'>;

// 특정 상품의 상세 정보를 받아오기 위한 함수
function displayProduct(productInfo: ShoppingItem) {
  // ...
}

let products: Product[] = [
  { id: 1, name: '참치김밥', price: 3000, brand: '김가네', stock: 3 },
];

type UpdateProduct = Partial<Product>;

// 특정 상품 정보를 업데이트(갱신) 하는 함수
function updateProductItem(productItem: UpdateProduct) {

}

// 유틸리티 타입 구현하기 - Partial
interface UserProfile {
  username: string;
  email: string;
  profilePhotoUrl: string;
}

// interface UserProfileUpdate {
//   username?: string;
//   email?: string;
//   profilePhotoUrl?: string;
// }

// #1
type UserProfileUpdate = {
  username?: UserProfile['username']
  email?: UserProfile['email']
  profilePhotoUrl?: UserProfile['profilePhotoUrl']
}

// #2 - 맵드 타입
type UserProfileUpdate2 = {
  [p in 'username' | 'email' | 'profilePhotoUrl']?: UserProfile[p]
}

// #3
type UserProfileUpdate3 = {
  [p in keyof UserProfile]?: UserProfile[p]
}

// #4 - partial
type Subset<T> = {
  [p in keyof T]? : T[p];
}