const SAMPLE_USERS = [
  {
    name: '김민준',
    email: 'kim.minjun@naver.com',
    phone: '010-2847-3916',
    address: '서울특별시 강남구 테헤란로 152, 1204호',
    birth_date: '1992-03-15',
  },
  {
    name: '이서연',
    email: 'seoyeon.lee@gmail.com',
    phone: '010-5721-8843',
    address: '부산광역시 해운대구 센텀중앙로 79, 803동 1502호',
    birth_date: '1988-07-22',
  },
  {
    name: '박지훈',
    email: 'jihoon.park@kakao.com',
    phone: '010-9034-2157',
    address: '인천광역시 연수구 송도과학로 123, B동 902호',
    birth_date: '1995-11-08',
  },
  {
    name: '최유진',
    email: 'yujin.choi@daum.net',
    phone: '010-6612-4789',
    address: '대구광역시 수성구 달구벌대로 2456, 301호',
    birth_date: '1990-01-30',
  },
  {
    name: '정하은',
    email: 'haeun.jung@outlook.com',
    phone: '010-3389-7201',
    address: '광주광역시 서구 상무중앙로 61, 1507호',
    birth_date: '1993-09-14',
  },
  {
    name: '강도윤',
    email: 'doyoon.kang@naver.com',
    phone: '010-7745-9032',
    address: '대전광역시 유성구 대학로 99, 기숙사 204호',
    birth_date: '1997-05-27',
  },
  {
    name: '윤서아',
    email: 'seoa.yoon@gmail.com',
    phone: '010-4521-6684',
    address: '울산광역시 남구 삼산로 200, 1102호',
    birth_date: '1991-12-03',
  },
  {
    name: '임준서',
    email: 'junseo.lim@kakao.com',
    phone: '010-8190-3345',
    address: '세종특별자치시 한누리대로 2130, 504호',
    birth_date: '1989-08-19',
  },
  {
    name: '한소희',
    email: 'sohee.han@naver.com',
    phone: '010-2956-7410',
    address: '경기도 성남시 분당구 판교역로 235, 1803호',
    birth_date: '1994-04-11',
  },
  {
    name: '오현우',
    email: 'hyunwoo.oh@daum.net',
    phone: '010-6078-5523',
    address: '제주특별자치도 제주시 연동 262-10, 2층',
    birth_date: '1996-10-25',
  },
];

const SAMPLE_PRODUCTS = [
  {
    name: '무선 노이즈캔슬링 이어폰 Pro',
    description: '고음질 블루투스 5.3, 30시간 재생, IPX5 방수',
    price: 189000,
    category: '전자기기',
    stock: 120,
  },
  {
    name: '오가닉 코튼 오버핏 티셔츠',
    description: '국내산 유기농 면 100%, 사계절 착용 가능',
    price: 45000,
    category: '의류',
    stock: 85,
  },
  {
    name: '프리미엄 가죽 크로스백',
    description: '이탈리아 수입 가죽, 13인치 노트북 수납 가능',
    price: 128000,
    category: '패션잡화',
    stock: 42,
  },
  {
    name: '스마트 워치 Ultra',
    description: '심박·수면·GPS 추적, 7일 배터리',
    price: 329000,
    category: '전자기기',
    stock: 67,
  },
  {
    name: '친환경 텀블러 500ml',
    description: '스테인리스 이중진공, 누수방지 실리콘 캡',
    price: 28000,
    category: '생활용품',
    stock: 200,
  },
  {
    name: '프로그래밍 입문서 세트',
    description: 'JavaScript·Python·SQL 기초 3권 묶음',
    price: 54000,
    category: '도서',
    stock: 55,
  },
  {
    name: '에르고 휴먼 사무용 의자',
    description: '요추 지지, 3D 팔걸이, 메쉬 등받이',
    price: 459000,
    category: '가구',
    stock: 18,
  },
  {
    name: '유기농 허브 티 선물세트',
    description: '캐모마일·페퍼민트·루이보스 30티백',
    price: 36000,
    category: '식품',
    stock: 95,
  },
  {
    name: '4K 웹캠 스트리밍 키트',
    description: '자동 초점, 쌍방향 마이크, 삼각대 포함',
    price: 98000,
    category: '전자기기',
    stock: 33,
  },
  {
    name: '천연 아로마 디퓨저',
    description: '초음파 가습, 타이머 4단계, 라벤더 오일 포함',
    price: 62000,
    category: '생활용품',
    stock: 74,
  },
];

const SAMPLE_ORDERS = [
  { userIndex: 0, productIndex: 0, quantity: 1, order_status: 'delivered' },
  { userIndex: 1, productIndex: 2, quantity: 1, order_status: 'shipped' },
  { userIndex: 2, productIndex: 4, quantity: 2, order_status: 'delivered' },
  { userIndex: 3, productIndex: 1, quantity: 3, order_status: 'pending' },
  { userIndex: 4, productIndex: 3, quantity: 1, order_status: 'delivered' },
  { userIndex: 5, productIndex: 5, quantity: 1, order_status: 'cancelled' },
  { userIndex: 6, productIndex: 7, quantity: 2, order_status: 'shipped' },
  { userIndex: 7, productIndex: 6, quantity: 1, order_status: 'pending' },
  { userIndex: 8, productIndex: 8, quantity: 1, order_status: 'delivered' },
  { userIndex: 9, productIndex: 9, quantity: 1, order_status: 'shipped' },
];

async function seedSampleData(connection) {
  await connection.beginTransaction();

  try {
    await connection.execute('SET FOREIGN_KEY_CHECKS = 0');
    await connection.execute('TRUNCATE TABLE orders');
    await connection.execute('TRUNCATE TABLE users');
    await connection.execute('TRUNCATE TABLE products');
    await connection.execute('SET FOREIGN_KEY_CHECKS = 1');

    const userIds = [];
    for (const user of SAMPLE_USERS) {
      const [result] = await connection.execute(
        'INSERT INTO users (name, email, phone, address, birth_date) VALUES (?, ?, ?, ?, ?)',
        [user.name, user.email, user.phone, user.address, user.birth_date]
      );
      userIds.push(result.insertId);
    }

    const productIds = [];
    for (const product of SAMPLE_PRODUCTS) {
      const [result] = await connection.execute(
        'INSERT INTO products (name, description, price, category, stock) VALUES (?, ?, ?, ?, ?)',
        [product.name, product.description, product.price, product.category, product.stock]
      );
      productIds.push(result.insertId);
    }

    for (const order of SAMPLE_ORDERS) {
      const user = SAMPLE_USERS[order.userIndex];
      const product = SAMPLE_PRODUCTS[order.productIndex];
      const totalPrice = product.price * order.quantity;

      await connection.execute(
        `INSERT INTO orders (
          user_id, product_id, quantity, total_price, order_status,
          shipping_address, recipient_name, recipient_phone
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userIds[order.userIndex],
          productIds[order.productIndex],
          order.quantity,
          totalPrice,
          order.order_status,
          user.address,
          user.name,
          user.phone,
        ]
      );
    }

    await connection.commit();

    return {
      users: userIds.length,
      products: productIds.length,
      orders: SAMPLE_ORDERS.length,
    };
  } catch (err) {
    await connection.rollback();
    throw err;
  }
}

module.exports = { seedSampleData, SAMPLE_USERS, SAMPLE_PRODUCTS, SAMPLE_ORDERS };
