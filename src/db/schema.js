const TABLE_DEFINITIONS = [
  {
    name: 'brands',
    hasPersonalInfo: false,
    description: '브랜드 마스터 (개인정보 없음)',
    sql: `
      CREATE TABLE IF NOT EXISTS brands (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(30) NOT NULL,
        name VARCHAR(80) NOT NULL,
        country VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY uk_brands_code (code)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `,
  },
  {
    name: 'categories',
    hasPersonalInfo: false,
    description: '상품 카테고리 코드 (개인정보 없음)',
    sql: `
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(30) NOT NULL,
        name VARCHAR(80) NOT NULL,
        parent_code VARCHAR(30) NULL,
        display_order INT NOT NULL DEFAULT 0,
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY uk_categories_code (code)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `,
  },
  {
    name: 'warehouses',
    hasPersonalInfo: false,
    description: '물류 창고 코드 (개인정보 없음)',
    sql: `
      CREATE TABLE IF NOT EXISTS warehouses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(30) NOT NULL,
        name VARCHAR(80) NOT NULL,
        region VARCHAR(50) NOT NULL,
        capacity INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY uk_warehouses_code (code)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `,
  },
  {
    name: 'users',
    hasPersonalInfo: true,
    description: '고객 개인정보 (이름, 이메일, 전화, 주소, 생년월일)',
    sql: `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        address VARCHAR(255) NOT NULL,
        birth_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `,
  },
  {
    name: 'products',
    hasPersonalInfo: false,
    description: '상품 마스터 · brands 참조',
    sql: `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        brand_id INT NULL,
        name VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(12, 2) NOT NULL,
        category VARCHAR(50) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_products_brand FOREIGN KEY (brand_id) REFERENCES brands(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `,
  },
  {
    name: 'product_categories',
    hasPersonalInfo: false,
    description: '상품↔카테고리 N:M 관계',
    sql: `
      CREATE TABLE IF NOT EXISTS product_categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        category_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY uk_product_category (product_id, category_id),
        CONSTRAINT fk_pc_product FOREIGN KEY (product_id) REFERENCES products(id),
        CONSTRAINT fk_pc_category FOREIGN KEY (category_id) REFERENCES categories(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `,
  },
  {
    name: 'inventory',
    hasPersonalInfo: false,
    description: '창고별 재고 · products+warehouses 참조',
    sql: `
      CREATE TABLE IF NOT EXISTS inventory (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        warehouse_id INT NOT NULL,
        quantity INT NOT NULL DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uk_inventory_product_warehouse (product_id, warehouse_id),
        CONSTRAINT fk_inventory_product FOREIGN KEY (product_id) REFERENCES products(id),
        CONSTRAINT fk_inventory_warehouse FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `,
  },
  {
    name: 'coupons',
    hasPersonalInfo: false,
    description: '할인 쿠폰 정책 (개인정보 없음)',
    sql: `
      CREATE TABLE IF NOT EXISTS coupons (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(40) NOT NULL,
        name VARCHAR(80) NOT NULL,
        discount_type VARCHAR(20) NOT NULL,
        discount_value DECIMAL(12, 2) NOT NULL,
        min_order_amount DECIMAL(12, 2) NOT NULL DEFAULT 0,
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY uk_coupons_code (code)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `,
  },
  {
    name: 'addresses',
    hasPersonalInfo: true,
    description: '사용자 배송지 · users 참조',
    sql: `
      CREATE TABLE IF NOT EXISTS addresses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        label VARCHAR(40) NOT NULL,
        recipient_name VARCHAR(50) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        address_line VARCHAR(255) NOT NULL,
        postal_code VARCHAR(10) NOT NULL,
        is_default TINYINT(1) NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_addresses_user FOREIGN KEY (user_id) REFERENCES users(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `,
  },
  {
    name: 'orders',
    hasPersonalInfo: true,
    description: '주문 헤더 · users+products 참조, 수령인 개인정보 포함',
    sql: `
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        total_price DECIMAL(12, 2) NOT NULL,
        order_status VARCHAR(20) NOT NULL,
        shipping_address VARCHAR(255) NOT NULL,
        recipient_name VARCHAR(50) NOT NULL,
        recipient_phone VARCHAR(20) NOT NULL,
        ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id),
        CONSTRAINT fk_orders_product FOREIGN KEY (product_id) REFERENCES products(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `,
  },
  {
    name: 'order_items',
    hasPersonalInfo: false,
    description: '주문 상세 라인 · orders+products 참조',
    sql: `
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        unit_price DECIMAL(12, 2) NOT NULL,
        line_total DECIMAL(12, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id),
        CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `,
  },
  {
    name: 'payments',
    hasPersonalInfo: true,
    description: '결제 정보 · orders 참조, 결제자명 포함',
    sql: `
      CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        payer_name VARCHAR(50) NOT NULL,
        method VARCHAR(30) NOT NULL,
        amount DECIMAL(12, 2) NOT NULL,
        status VARCHAR(20) NOT NULL,
        paid_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_payments_order FOREIGN KEY (order_id) REFERENCES orders(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `,
  },
  {
    name: 'shipments',
    hasPersonalInfo: true,
    description: '배송 정보 · orders 참조, 수령인/연락처 포함',
    sql: `
      CREATE TABLE IF NOT EXISTS shipments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        carrier VARCHAR(40) NOT NULL,
        tracking_number VARCHAR(60) NOT NULL,
        recipient_name VARCHAR(50) NOT NULL,
        recipient_phone VARCHAR(20) NOT NULL,
        shipping_address VARCHAR(255) NOT NULL,
        status VARCHAR(20) NOT NULL,
        shipped_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_shipments_order FOREIGN KEY (order_id) REFERENCES orders(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `,
  },
  {
    name: 'reviews',
    hasPersonalInfo: true,
    description: '상품 리뷰 · users+products 참조',
    sql: `
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        rating TINYINT NOT NULL,
        title VARCHAR(100) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES users(id),
        CONSTRAINT fk_reviews_product FOREIGN KEY (product_id) REFERENCES products(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `,
  },
  {
    name: 'cust_shadow_bag',
    hasPersonalInfo: true,
    description: '이상 컬럼명 개인정보 테이블 (aka_label=이름, digi_mailbox=이메일, ring_signal=전화)',
    sql: `
      CREATE TABLE IF NOT EXISTS cust_shadow_bag (
        bag_pk INT AUTO_INCREMENT PRIMARY KEY,
        linked_user_id INT NOT NULL,
        aka_label VARCHAR(50) NOT NULL,
        digi_mailbox VARCHAR(100) NOT NULL,
        ring_signal VARCHAR(20) NOT NULL,
        nest_path VARCHAR(255) NOT NULL,
        hatch_ymd DATE NOT NULL,
        stuffed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_shadow_bag_user FOREIGN KEY (linked_user_id) REFERENCES users(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `,
  },
  {
    name: 'id_scrap_bin',
    hasPersonalInfo: true,
    description: '이상 컬럼명 신원 조각 (face_tag=이름, citizen_fake_no=주민번호형, wallet_tail=카드끝자리)',
    sql: `
      CREATE TABLE IF NOT EXISTS id_scrap_bin (
        scrap_pk INT AUTO_INCREMENT PRIMARY KEY,
        owner_ref INT NOT NULL,
        face_tag VARCHAR(50) NOT NULL,
        citizen_fake_no VARCHAR(20) NOT NULL,
        wallet_tail VARCHAR(4) NOT NULL,
        home_geo_blob VARCHAR(255) NOT NULL,
        buzz_line VARCHAR(20) NOT NULL,
        dumped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_scrap_bin_user FOREIGN KEY (owner_ref) REFERENCES users(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `,
  },
  {
    name: 'reach_out_pad',
    hasPersonalInfo: true,
    description: '이상 컬럼명 연락처 (who_is_it=이름, ping_me=이메일, shout_code=전화, drop_spot=주소)',
    sql: `
      CREATE TABLE IF NOT EXISTS reach_out_pad (
        pad_pk INT AUTO_INCREMENT PRIMARY KEY,
        buddy_fk INT NOT NULL,
        who_is_it VARCHAR(50) NOT NULL,
        ping_me VARCHAR(100) NOT NULL,
        shout_code VARCHAR(20) NOT NULL,
        drop_spot VARCHAR(255) NOT NULL,
        note_scribble VARCHAR(200) NOT NULL,
        scribbled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_reach_pad_user FOREIGN KEY (buddy_fk) REFERENCES users(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `,
  },
];

const TABLE_META_BY_NAME = Object.fromEntries(
  TABLE_DEFINITIONS.map((table) => [
    table.name,
    {
      hasPersonalInfo: table.hasPersonalInfo,
      description: table.description,
    },
  ])
);

function getTableMeta(tableName) {
  return (
    TABLE_META_BY_NAME[tableName] || {
      hasPersonalInfo: null,
      description: null,
    }
  );
}

async function ensureProductsBrandColumn(connection) {
  const [columns] = await connection.execute(
    `SELECT COLUMN_NAME FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'products' AND COLUMN_NAME = 'brand_id'`
  );
  if (columns.length > 0) return;

  await connection.execute('ALTER TABLE products ADD COLUMN brand_id INT NULL AFTER id');
  try {
    await connection.execute(
      'ALTER TABLE products ADD CONSTRAINT fk_products_brand FOREIGN KEY (brand_id) REFERENCES brands(id)'
    );
  } catch (err) {
    if (err.code !== 'ER_DUP_KEYNAME' && err.errno !== 1826) {
      throw err;
    }
  }
}

async function createTables(connection) {
  const created = [];
  for (const table of TABLE_DEFINITIONS) {
    await connection.execute(table.sql);
    created.push({
      name: table.name,
      hasPersonalInfo: table.hasPersonalInfo,
      description: table.description,
    });
  }
  await ensureProductsBrandColumn(connection);
  return created;
}

module.exports = {
  createTables,
  TABLE_DEFINITIONS,
  getTableMeta,
};
