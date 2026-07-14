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

const SAMPLE_BRANDS = [
  { code: 'SONY', name: '소니', country: '일본' },
  { code: 'APPLE', name: '애플', country: '미국' },
  { code: 'SAMSUNG', name: '삼성', country: '대한민국' },
  { code: 'MUJI', name: '무인양품', country: '일본' },
  { code: 'NIKE', name: '나이키', country: '미국' },
  { code: 'IKEA', name: '이케아', country: '스웨덴' },
  { code: 'COWAY', name: '코웨이', country: '대한민국' },
  { code: 'LG', name: 'LG전자', country: '대한민국' },
  { code: 'UNIQLO', name: '유니클로', country: '일본' },
  { code: 'DYSON', name: '다이슨', country: '싱가포르' },
];

const SAMPLE_WAREHOUSES = [
  { code: 'WH-SEL', name: '서울중앙물류', region: '서울', capacity: 50000 },
  { code: 'WH-ICN', name: '인천항만물류', region: '인천', capacity: 80000 },
  { code: 'WH-BSN', name: '부산항물류', region: '부산', capacity: 90000 },
  { code: 'WH-DJN', name: '대전허브', region: '대전', capacity: 40000 },
  { code: 'WH-GWJ', name: '광주남부물류', region: '광주', capacity: 35000 },
  { code: 'WH-DGU', name: '대구동부물류', region: '대구', capacity: 36000 },
  { code: 'WH-USN', name: '울산공업물류', region: '울산', capacity: 30000 },
  { code: 'WH-JJU', name: '제주허브', region: '제주', capacity: 15000 },
  { code: 'WH-PCY', name: '판교풀필먼트', region: '경기', capacity: 70000 },
  { code: 'WH-CWJ', name: '창원물류', region: '경남', capacity: 42000 },
];

const SAMPLE_PRODUCTS = [
  {
    name: '무선 노이즈캔슬링 이어폰 Pro',
    description: '고음질 블루투스 5.3, 30시간 재생, IPX5 방수',
    price: 189000,
    category: '전자기기',
    stock: 120,
    brandIndex: 0,
    categoryIndexes: [0, 7],
  },
  {
    name: '오가닉 코튼 오버핏 티셔츠',
    description: '국내산 유기농 면 100%, 사계절 착용 가능',
    price: 45000,
    category: '의류',
    stock: 85,
    brandIndex: 8,
    categoryIndexes: [1],
  },
  {
    name: '프리미엄 가죽 크로스백',
    description: '이탈리아 수입 가죽, 13인치 노트북 수납 가능',
    price: 128000,
    category: '패션잡화',
    stock: 42,
    brandIndex: 4,
    categoryIndexes: [2],
  },
  {
    name: '스마트 워치 Ultra',
    description: '심박·수면·GPS 추적, 7일 배터리',
    price: 329000,
    category: '전자기기',
    stock: 67,
    brandIndex: 1,
    categoryIndexes: [0, 8],
  },
  {
    name: '친환경 텀블러 500ml',
    description: '스테인리스 이중진공, 누수방지 실리콘 캡',
    price: 28000,
    category: '생활용품',
    stock: 200,
    brandIndex: 3,
    categoryIndexes: [3, 9],
  },
  {
    name: '프로그래밍 입문서 세트',
    description: 'JavaScript·Python·SQL 기초 3권 묶음',
    price: 54000,
    category: '도서',
    stock: 55,
    brandIndex: 3,
    categoryIndexes: [4],
  },
  {
    name: '에르고 휴먼 사무용 의자',
    description: '요추 지지, 3D 팔걸이, 메쉬 등받이',
    price: 459000,
    category: '가구',
    stock: 18,
    brandIndex: 5,
    categoryIndexes: [5],
  },
  {
    name: '유기농 허브 티 선물세트',
    description: '캐모마일·페퍼민트·루이보스 30티백',
    price: 36000,
    category: '식품',
    stock: 95,
    brandIndex: 3,
    categoryIndexes: [6],
  },
  {
    name: '4K 웹캠 스트리밍 키트',
    description: '자동 초점, 쌍방향 마이크, 삼각대 포함',
    price: 98000,
    category: '전자기기',
    stock: 33,
    brandIndex: 2,
    categoryIndexes: [0],
  },
  {
    name: '천연 아로마 디퓨저',
    description: '초음파 가습, 타이머 4단계, 라벤더 오일 포함',
    price: 62000,
    category: '생활용품',
    stock: 74,
    brandIndex: 6,
    categoryIndexes: [3, 9],
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

const SAMPLE_CATEGORIES = [
  { code: 'ELEC', name: '전자기기', parent_code: null, display_order: 1, is_active: 1 },
  { code: 'FASH', name: '의류', parent_code: null, display_order: 2, is_active: 1 },
  { code: 'BAG', name: '패션잡화', parent_code: 'FASH', display_order: 3, is_active: 1 },
  { code: 'LIFE', name: '생활용품', parent_code: null, display_order: 4, is_active: 1 },
  { code: 'BOOK', name: '도서', parent_code: null, display_order: 5, is_active: 1 },
  { code: 'FURN', name: '가구', parent_code: null, display_order: 6, is_active: 1 },
  { code: 'FOOD', name: '식품', parent_code: null, display_order: 7, is_active: 1 },
  { code: 'ELEC_AUDIO', name: '오디오', parent_code: 'ELEC', display_order: 8, is_active: 1 },
  { code: 'ELEC_WEAR', name: '웨어러블', parent_code: 'ELEC', display_order: 9, is_active: 1 },
  { code: 'LIFE_HOME', name: '홈데코', parent_code: 'LIFE', display_order: 10, is_active: 1 },
];

const SAMPLE_COUPONS = [
  { code: 'WELCOME10', name: '신규회원 10%', discount_type: 'percent', discount_value: 10, min_order_amount: 30000 },
  { code: 'SAVE5K', name: '5천원 할인', discount_type: 'amount', discount_value: 5000, min_order_amount: 50000 },
  { code: 'FREESHIP', name: '무료배송', discount_type: 'amount', discount_value: 3000, min_order_amount: 20000 },
  { code: 'SPRING15', name: '봄맞이 15%', discount_type: 'percent', discount_value: 15, min_order_amount: 80000 },
  { code: 'VIP20', name: 'VIP 20%', discount_type: 'percent', discount_value: 20, min_order_amount: 100000 },
  { code: 'CART3K', name: '장바구니 3천원', discount_type: 'amount', discount_value: 3000, min_order_amount: 40000 },
  { code: 'WEEKEND', name: '주말특가 8%', discount_type: 'percent', discount_value: 8, min_order_amount: 25000 },
  { code: 'BOOK5', name: '도서 5%', discount_type: 'percent', discount_value: 5, min_order_amount: 15000 },
  { code: 'HOME12', name: '생활 12%', discount_type: 'percent', discount_value: 12, min_order_amount: 60000 },
  { code: 'FLASH7', name: '플래시 7%', discount_type: 'percent', discount_value: 7, min_order_amount: 35000 },
];

const REVIEW_TEMPLATES = [
  { rating: 5, title: '만족스러운 구매', content: '기대 이상으로 만족합니다. 배송도 빨랐어요.' },
  { rating: 4, title: '가성비 좋음', content: '가격 대비 품질이 괜찮습니다. 재구매 의사 있습니다.' },
  { rating: 5, title: '추천합니다', content: '주변에 추천할 만큼 좋았습니다.' },
  { rating: 3, title: '보통이에요', content: '무난하지만 특별한 점은 없었습니다.' },
  { rating: 4, title: '사용감 좋아요', content: '일상에서 잘 쓰고 있습니다.' },
  { rating: 5, title: '품질 우수', content: '마감과 품질이 기대 이상이었습니다.' },
  { rating: 2, title: '아쉬운 점', content: '전반적으로 괜찮지만 일부 개선이 필요해 보입니다.' },
  { rating: 4, title: '배송 만족', content: '포장이 꼼꼼했고 사용도 편리합니다.' },
  { rating: 5, title: '재구매 예정', content: '또 구매할 계획입니다.' },
  { rating: 4, title: '잘 샀어요', content: '설명이 정확했고 실물도 만족스럽습니다.' },
];

async function getLatestIds(connection, tableName, count) {
  const [rows] = await connection.query(
    `SELECT id FROM \`${tableName}\` ORDER BY id DESC LIMIT ?`,
    [count]
  );
  return rows.map((row) => row.id).reverse();
}

async function countTable(connection, tableName) {
  const [[row]] = await connection.query(`SELECT COUNT(*) AS count FROM \`${tableName}\``);
  return Number(row.count);
}

async function insertProducts(connection, brandIds) {
  const productIds = [];
  for (const product of SAMPLE_PRODUCTS) {
    const brandId = brandIds[product.brandIndex] || brandIds[0] || null;
    const [result] = await connection.execute(
      'INSERT INTO products (brand_id, name, description, price, category, stock) VALUES (?, ?, ?, ?, ?, ?)',
      [brandId, product.name, product.description, product.price, product.category, product.stock]
    );
    productIds.push(result.insertId);
  }
  return productIds;
}

async function seedNonPersonalData(connection) {
  const stamp = Date.now();
  const brandIds = [];
  for (let i = 0; i < SAMPLE_BRANDS.length; i += 1) {
    const brand = SAMPLE_BRANDS[i];
    const [result] = await connection.execute(
      'INSERT INTO brands (code, name, country) VALUES (?, ?, ?)',
      [`${brand.code}_${stamp}_${i}`, brand.name, brand.country]
    );
    brandIds.push(result.insertId);
  }

  const categoryIds = [];
  for (let i = 0; i < SAMPLE_CATEGORIES.length; i += 1) {
    const category = SAMPLE_CATEGORIES[i];
    const [result] = await connection.execute(
      `INSERT INTO categories (code, name, parent_code, display_order, is_active)
       VALUES (?, ?, ?, ?, ?)`,
      [
        `${category.code}_${stamp}_${i}`,
        category.name,
        category.parent_code,
        category.display_order,
        category.is_active,
      ]
    );
    categoryIds.push(result.insertId);
  }

  const warehouseIds = [];
  for (let i = 0; i < SAMPLE_WAREHOUSES.length; i += 1) {
    const warehouse = SAMPLE_WAREHOUSES[i];
    const [result] = await connection.execute(
      'INSERT INTO warehouses (code, name, region, capacity) VALUES (?, ?, ?, ?)',
      [`${warehouse.code}_${stamp}_${i}`, warehouse.name, warehouse.region, warehouse.capacity]
    );
    warehouseIds.push(result.insertId);
  }

  const productIds = await insertProducts(connection, brandIds);

  let productCategoriesAdded = 0;
  for (let i = 0; i < SAMPLE_PRODUCTS.length; i += 1) {
    const indexes = SAMPLE_PRODUCTS[i].categoryIndexes || [i % categoryIds.length];
    for (const categoryIndex of indexes) {
      await connection.execute(
        'INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)',
        [productIds[i], categoryIds[categoryIndex]]
      );
      productCategoriesAdded += 1;
    }
  }

  let inventoryAdded = 0;
  for (let i = 0; i < productIds.length; i += 1) {
    const warehouseId = warehouseIds[i % warehouseIds.length];
    await connection.execute(
      'INSERT INTO inventory (product_id, warehouse_id, quantity) VALUES (?, ?, ?)',
      [productIds[i], warehouseId, SAMPLE_PRODUCTS[i].stock]
    );
    inventoryAdded += 1;
  }

  let couponsAdded = 0;
  for (let i = 0; i < SAMPLE_COUPONS.length; i += 1) {
    const coupon = SAMPLE_COUPONS[i];
    await connection.execute(
      `INSERT INTO coupons (code, name, discount_type, discount_value, min_order_amount, is_active)
       VALUES (?, ?, ?, ?, ?, 1)`,
      [
        `${coupon.code}_${stamp}_${i}`,
        coupon.name,
        coupon.discount_type,
        coupon.discount_value,
        coupon.min_order_amount,
      ]
    );
    couponsAdded += 1;
  }

  return {
    brands: brandIds.length,
    categories: categoryIds.length,
    warehouses: warehouseIds.length,
    products: productIds.length,
    product_categories: productCategoriesAdded,
    inventory: inventoryAdded,
    coupons: couponsAdded,
    productIds,
  };
}

async function seedPersonalData(connection) {
  const userIds = [];
  for (const user of SAMPLE_USERS) {
    const [result] = await connection.execute(
      'INSERT INTO users (name, email, phone, address, birth_date) VALUES (?, ?, ?, ?, ?)',
      [user.name, user.email, user.phone, user.address, user.birth_date]
    );
    userIds.push(result.insertId);
  }

  let productsAdded = 0;
  let bootstrapNonPersonal = null;
  let productIds = await getLatestIds(connection, 'products', SAMPLE_PRODUCTS.length);
  if (productIds.length < SAMPLE_PRODUCTS.length) {
    let brandIds = await getLatestIds(connection, 'brands', SAMPLE_BRANDS.length);
    if (brandIds.length === 0) {
      bootstrapNonPersonal = await seedNonPersonalData(connection);
      productIds = bootstrapNonPersonal.productIds;
      productsAdded = bootstrapNonPersonal.products;
    } else {
      productIds = await insertProducts(connection, brandIds);
      productsAdded = productIds.length;
    }
  }

  let addressesAdded = 0;
  const addressIds = [];
  for (let i = 0; i < userIds.length; i += 1) {
    const user = SAMPLE_USERS[i];
    const [result] = await connection.execute(
      `INSERT INTO addresses
        (user_id, label, recipient_name, phone, address_line, postal_code, is_default)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [userIds[i], '집', user.name, user.phone, user.address, `0${10000 + i}`]
    );
    addressIds.push(result.insertId);
    addressesAdded += 1;
  }

  const orderIds = [];
  for (const order of SAMPLE_ORDERS) {
    const user = SAMPLE_USERS[order.userIndex];
    const product = SAMPLE_PRODUCTS[order.productIndex];
    const totalPrice = product.price * order.quantity;
    const [result] = await connection.execute(
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
    orderIds.push(result.insertId);
  }

  let orderItemsAdded = 0;
  for (let i = 0; i < SAMPLE_ORDERS.length; i += 1) {
    const order = SAMPLE_ORDERS[i];
    const product = SAMPLE_PRODUCTS[order.productIndex];
    const unitPrice = product.price;
    const lineTotal = unitPrice * order.quantity;
    await connection.execute(
      `INSERT INTO order_items (order_id, product_id, quantity, unit_price, line_total)
       VALUES (?, ?, ?, ?, ?)`,
      [orderIds[i], productIds[order.productIndex], order.quantity, unitPrice, lineTotal]
    );
    orderItemsAdded += 1;

    if (i % 3 === 0) {
      const extraIndex = (order.productIndex + 1) % productIds.length;
      const extra = SAMPLE_PRODUCTS[extraIndex];
      await connection.execute(
        `INSERT INTO order_items (order_id, product_id, quantity, unit_price, line_total)
         VALUES (?, ?, ?, ?, ?)`,
        [orderIds[i], productIds[extraIndex], 1, extra.price, extra.price]
      );
      orderItemsAdded += 1;
    }
  }

  let paymentsAdded = 0;
  let shipmentsAdded = 0;
  for (let i = 0; i < SAMPLE_ORDERS.length; i += 1) {
    const order = SAMPLE_ORDERS[i];
    const user = SAMPLE_USERS[order.userIndex];
    const product = SAMPLE_PRODUCTS[order.productIndex];
    const amount = product.price * order.quantity;
    const method = i % 2 === 0 ? 'card' : 'transfer';
    const status =
      order.order_status === 'cancelled' ? 'cancelled' : order.order_status === 'pending' ? 'pending' : 'paid';

    await connection.execute(
      `INSERT INTO payments (order_id, payer_name, method, amount, status, paid_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        orderIds[i],
        user.name,
        method,
        amount,
        status,
        status === 'paid' ? new Date() : null,
      ]
    );
    paymentsAdded += 1;

    if (order.order_status === 'shipped' || order.order_status === 'delivered') {
      await connection.execute(
        `INSERT INTO shipments (
          order_id, carrier, tracking_number, recipient_name, recipient_phone,
          shipping_address, status, shipped_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          orderIds[i],
          i % 2 === 0 ? 'CJ대한통운' : '한진택배',
          `TRK${Date.now()}${i}`,
          user.name,
          user.phone,
          user.address,
          order.order_status,
          new Date(),
        ]
      );
      shipmentsAdded += 1;
    }
  }

  let reviewsAdded = 0;
  for (let i = 0; i < SAMPLE_USERS.length; i += 1) {
    const review = REVIEW_TEMPLATES[i];
    await connection.execute(
      `INSERT INTO reviews (user_id, product_id, rating, title, content)
       VALUES (?, ?, ?, ?, ?)`,
      [userIds[i], productIds[i % productIds.length], review.rating, review.title, review.content]
    );
    reviewsAdded += 1;
  }

  let custShadowBagAdded = 0;
  for (let i = 0; i < SAMPLE_USERS.length; i += 1) {
    const user = SAMPLE_USERS[i];
    await connection.execute(
      `INSERT INTO cust_shadow_bag
        (linked_user_id, aka_label, digi_mailbox, ring_signal, nest_path, hatch_ymd)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userIds[i], user.name, user.email, user.phone, user.address, user.birth_date]
    );
    custShadowBagAdded += 1;
  }

  let idScrapBinAdded = 0;
  for (let i = 0; i < SAMPLE_USERS.length; i += 1) {
    const user = SAMPLE_USERS[i];
    const yy = user.birth_date.slice(2, 4);
    const mmdd = user.birth_date.slice(5, 7) + user.birth_date.slice(8, 10);
    const serial = String(1000000 + i * 137).slice(-7);
    await connection.execute(
      `INSERT INTO id_scrap_bin
        (owner_ref, face_tag, citizen_fake_no, wallet_tail, home_geo_blob, buzz_line)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        userIds[i],
        user.name,
        `${yy}${mmdd}-${serial}`,
        String(1000 + ((i * 47) % 9000)).slice(-4),
        user.address,
        user.phone,
      ]
    );
    idScrapBinAdded += 1;
  }

  let reachOutPadAdded = 0;
  for (let i = 0; i < SAMPLE_USERS.length; i += 1) {
    const user = SAMPLE_USERS[i];
    await connection.execute(
      `INSERT INTO reach_out_pad
        (buddy_fk, who_is_it, ping_me, shout_code, drop_spot, note_scribble)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        userIds[i],
        user.name,
        user.email,
        user.phone,
        user.address,
        i % 2 === 0 ? '야간 연락 가능' : '주간만 수신',
      ]
    );
    reachOutPadAdded += 1;
  }

  return {
    users: userIds.length,
    addresses: addressesAdded,
    orders: orderIds.length,
    order_items: orderItemsAdded,
    payments: paymentsAdded,
    shipments: shipmentsAdded,
    reviews: reviewsAdded,
    cust_shadow_bag: custShadowBagAdded,
    id_scrap_bin: idScrapBinAdded,
    reach_out_pad: reachOutPadAdded,
    productsAdded,
    bootstrapNonPersonal,
  };
}

async function getTotals(connection) {
  const tables = [
    'brands',
    'categories',
    'warehouses',
    'products',
    'product_categories',
    'inventory',
    'coupons',
    'users',
    'addresses',
    'orders',
    'order_items',
    'payments',
    'shipments',
    'reviews',
    'cust_shadow_bag',
    'id_scrap_bin',
    'reach_out_pad',
  ];
  const totals = {};
  for (const table of tables) {
    totals[table] = await countTable(connection, table);
  }
  return totals;
}

function emptyAdded() {
  return {
    brands: 0,
    categories: 0,
    warehouses: 0,
    products: 0,
    product_categories: 0,
    inventory: 0,
    coupons: 0,
    users: 0,
    addresses: 0,
    orders: 0,
    order_items: 0,
    payments: 0,
    shipments: 0,
    reviews: 0,
    cust_shadow_bag: 0,
    id_scrap_bin: 0,
    reach_out_pad: 0,
  };
}

async function seedSampleData(connection, scope = 'all') {
  const normalized = String(scope || 'all').toLowerCase();
  if (!['all', 'personal', 'non_personal'].includes(normalized)) {
    const error = new Error('Invalid scope. Use all, personal, or non_personal');
    error.statusCode = 400;
    throw error;
  }

  await connection.beginTransaction();

  try {
    const added = emptyAdded();

    if (normalized === 'all' || normalized === 'non_personal') {
      const nonPersonal = await seedNonPersonalData(connection);
      added.brands = nonPersonal.brands;
      added.categories = nonPersonal.categories;
      added.warehouses = nonPersonal.warehouses;
      added.products = nonPersonal.products;
      added.product_categories = nonPersonal.product_categories;
      added.inventory = nonPersonal.inventory;
      added.coupons = nonPersonal.coupons;
    }

    if (normalized === 'all' || normalized === 'personal') {
      const personal = await seedPersonalData(connection);
      added.users = personal.users;
      added.addresses = personal.addresses;
      added.orders = personal.orders;
      added.order_items = personal.order_items;
      added.payments = personal.payments;
      added.shipments = personal.shipments;
      added.reviews = personal.reviews;
      added.cust_shadow_bag = personal.cust_shadow_bag;
      added.id_scrap_bin = personal.id_scrap_bin;
      added.reach_out_pad = personal.reach_out_pad;
      if (normalized === 'personal') {
        if (personal.bootstrapNonPersonal) {
          const boot = personal.bootstrapNonPersonal;
          added.brands = boot.brands;
          added.categories = boot.categories;
          added.warehouses = boot.warehouses;
          added.products = boot.products;
          added.product_categories = boot.product_categories;
          added.inventory = boot.inventory;
          added.coupons = boot.coupons;
        } else if (personal.productsAdded) {
          added.products = personal.productsAdded;
        }
      }
    }

    const totals = await getTotals(connection);
    await connection.commit();

    return {
      scope: normalized,
      added,
      totals,
    };
  } catch (err) {
    await connection.rollback();
    throw err;
  }
}

module.exports = {
  seedSampleData,
  SAMPLE_USERS,
  SAMPLE_PRODUCTS,
  SAMPLE_ORDERS,
  SAMPLE_CATEGORIES,
  SAMPLE_BRANDS,
  SAMPLE_WAREHOUSES,
  SAMPLE_COUPONS,
};
