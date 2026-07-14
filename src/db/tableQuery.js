const { getTableMeta, TABLE_DEFINITIONS } = require('./schema');

const TABLE_NAME_PATTERN = /^[a-zA-Z0-9_]+$/;

async function getTableNames(connection, database) {
  const [rows] = await connection.execute(
    'SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? ORDER BY TABLE_NAME',
    [database]
  );
  return rows.map((row) => row.TABLE_NAME);
}

async function assertTableExists(connection, database, tableName) {
  if (!TABLE_NAME_PATTERN.test(tableName)) {
    const error = new Error('Invalid table name');
    error.statusCode = 400;
    throw error;
  }

  const names = await getTableNames(connection, database);
  if (!names.includes(tableName)) {
    const error = new Error('Table not found');
    error.statusCode = 404;
    throw error;
  }

  return tableName;
}

async function getTablesWithRowCounts(connection, database) {
  const tableNames = await getTableNames(connection, database);
  const tables = [];

  for (const name of tableNames) {
    const [countRows] = await connection.query(`SELECT COUNT(*) AS rowCount FROM \`${name}\``);
    const meta = getTableMeta(name);
    tables.push({
      name,
      rowCount: Number(countRows[0].rowCount),
      hasPersonalInfo: meta.hasPersonalInfo,
      description: meta.description,
    });
  }

  const withPersonalInfo = tables.filter((table) => table.hasPersonalInfo === true);
  const withoutPersonalInfo = tables.filter((table) => table.hasPersonalInfo === false);
  const unclassified = tables.filter((table) => table.hasPersonalInfo === null);

  return {
    tables,
    groups: {
      withPersonalInfo,
      withoutPersonalInfo,
      unclassified,
    },
    definitions: TABLE_DEFINITIONS.map(({ name, hasPersonalInfo, description }) => ({
      name,
      hasPersonalInfo,
      description,
    })),
  };
}

async function getTableRows(connection, database, tableName, limit = 100, offset = 0) {
  const safeName = await assertTableExists(connection, database, tableName);
  const safeLimit = Math.min(Math.max(parseInt(limit, 10) || 100, 1), 500);
  const safeOffset = Math.max(parseInt(offset, 10) || 0, 0);

  const [countRows] = await connection.query(`SELECT COUNT(*) AS rowCount FROM \`${safeName}\``);
  const rowCount = Number(countRows[0].rowCount);

  const [rows] = await connection.query(
    `SELECT * FROM \`${safeName}\` LIMIT ? OFFSET ?`,
    [safeLimit, safeOffset]
  );

  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  return {
    table: safeName,
    columns,
    rowCount,
    rows,
    limit: safeLimit,
    offset: safeOffset,
  };
}

module.exports = {
  getTablesWithRowCounts,
  getTableRows,
};
