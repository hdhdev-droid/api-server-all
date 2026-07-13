const TABLE_DEFINITIONS = [
  {
    name: 'users',
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
    sql: `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(12, 2) NOT NULL,
        category VARCHAR(50) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `,
  },
  {
    name: 'orders',
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
];

async function createTables(connection) {
  const created = [];
  for (const table of TABLE_DEFINITIONS) {
    await connection.execute(table.sql);
    created.push(table.name);
  }
  return created;
}

module.exports = { createTables, TABLE_DEFINITIONS };
