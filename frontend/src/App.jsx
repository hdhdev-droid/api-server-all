import { useState, useEffect } from 'react';
import { checkDb, getTables, getTableRows, setupTables, seedSampleData } from './api';
import './App.css';

function formatCell(value) {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function personalLabel(hasPersonalInfo) {
  if (hasPersonalInfo === true) return '개인정보';
  if (hasPersonalInfo === false) return '비개인정보';
  return '미분류';
}

function TableGroup({ title, badgeClass, tables, selectedName, onSelect }) {
  if (!tables?.length) return null;

  return (
    <div className="table-group">
      <div className="table-group-title">
        <span className={`badge ${badgeClass}`}>{title}</span>
        <span className="meta">{tables.length}개</span>
      </div>
      <ul className="table-list">
        {tables.map((table) => (
          <li key={table.name}>
            <button
              type="button"
              className={`table-item${selectedName === table.name ? ' active' : ''}`}
              onClick={() => onSelect(table.name)}
            >
              <span className="table-item-main">
                <span className="table-item-name">{table.name}</span>
                {table.description && <span className="table-item-desc">{table.description}</span>}
              </span>
              <span className="table-item-count">{table.rowCount}행</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [dbCheck, setDbCheck] = useState({ status: 'idle', data: null, error: null });
  const [tables, setTables] = useState({ status: 'idle', data: null, error: null });
  const [tableRows, setTableRows] = useState({ status: 'idle', tableName: null, data: null, error: null });
  const [setup, setSetup] = useState({ status: 'idle', data: null, error: null });
  const [seed, setSeed] = useState({ status: 'idle', data: null, error: null, scope: null });

  const loadDbCheck = async () => {
    setDbCheck({ status: 'loading', data: null, error: null });
    try {
      const data = await checkDb();
      setDbCheck({ status: 'success', data, error: null });
    } catch (err) {
      setDbCheck({ status: 'error', data: null, error: err.message });
    }
  };

  const loadTables = async () => {
    setTables({ status: 'loading', data: null, error: null });
    try {
      const data = await getTables();
      setTables({ status: 'success', data, error: null });
    } catch (err) {
      setTables({ status: 'error', data: null, error: err.message });
    }
  };

  const loadTableRows = async (tableName) => {
    setTableRows({ status: 'loading', tableName, data: null, error: null });
    try {
      const data = await getTableRows(tableName);
      setTableRows({ status: 'success', tableName, data, error: null });
    } catch (err) {
      setTableRows({ status: 'error', tableName, data: null, error: err.message });
    }
  };

  const handleSetupTables = async () => {
    setSetup({ status: 'loading', data: null, error: null });
    try {
      const data = await setupTables();
      setSetup({ status: 'success', data, error: null });
      await loadTables();
    } catch (err) {
      setSetup({ status: 'error', data: null, error: err.message });
    }
  };

  const handleSeedSampleData = async (scope = 'all') => {
    setSeed({ status: 'loading', data: null, error: null, scope });
    try {
      const data = await seedSampleData(scope);
      setSeed({ status: 'success', data, error: null, scope });
      await loadTables();
      if (tableRows.tableName) {
        await loadTableRows(tableRows.tableName);
      }
    } catch (err) {
      setSeed({ status: 'error', data: null, error: err.message, scope });
    }
  };

  useEffect(() => {
    loadDbCheck();
  }, []);

  const setupTableNames = Array.isArray(setup.data?.tables)
    ? setup.data.tables.map((table) => (typeof table === 'string' ? table : table.name)).join(', ')
    : '';

  return (
    <div className="app">
      <header className="header">
        <h1>DB 연결 확인</h1>
        <p className="subtitle">API 서버 데이터베이스 상태</p>
      </header>

      <section className="card">
        <div className="card-header">
          <h2>연결 상태</h2>
          <button
            type="button"
            className="btn"
            onClick={loadDbCheck}
            disabled={dbCheck.status === 'loading'}
          >
            {dbCheck.status === 'loading' ? '확인 중…' : '다시 확인'}
          </button>
        </div>
        <div className="card-body">
          {dbCheck.status === 'idle' && <p className="muted">확인 버튼을 누르세요.</p>}
          {dbCheck.status === 'loading' && <p className="muted">연결 확인 중…</p>}
          {dbCheck.status === 'success' && dbCheck.data && (
            <div className="result success">
              <span className="badge badge-ok">연결됨</span>
              <p>{dbCheck.data.message}</p>
              <p className="meta">데이터베이스: {dbCheck.data.database}</p>
            </div>
          )}
          {dbCheck.status === 'error' && (
            <div className="result error">
              <span className="badge badge-error">연결 실패</span>
              <p>{dbCheck.error}</p>
            </div>
          )}
        </div>
      </section>

      <section className="card">
        <div className="card-header">
          <h2>테이블 목록</h2>
          <button
            type="button"
            className="btn"
            onClick={loadTables}
            disabled={tables.status === 'loading'}
          >
            {tables.status === 'loading' ? '불러오는 중…' : '목록 불러오기'}
          </button>
        </div>
        <div className="card-body">
          {tables.status === 'idle' && (
            <p className="muted">
              목록 불러오기 버튼을 누르세요. 개인정보 여부로 구분되며, 테이블을 클릭하면 행 데이터를 볼 수
              있습니다.
            </p>
          )}
          {tables.status === 'loading' && <p className="muted">테이블 목록 불러오는 중…</p>}
          {tables.status === 'success' && tables.data && (
            <div className="result">
              <p className="meta">
                데이터베이스: {tables.data.database} · {tables.data.count}개 테이블 · 개인정보{' '}
                {tables.data.groups?.withPersonalInfo?.length || 0} · 비개인정보{' '}
                {tables.data.groups?.withoutPersonalInfo?.length || 0}
              </p>
              {tables.data.tables.length === 0 ? (
                <p className="muted">테이블이 없습니다.</p>
              ) : (
                <>
                  <TableGroup
                    title="개인정보 포함"
                    badgeClass="badge-pii"
                    tables={tables.data.groups?.withPersonalInfo}
                    selectedName={tableRows.tableName}
                    onSelect={loadTableRows}
                  />
                  <TableGroup
                    title="개인정보 없음"
                    badgeClass="badge-safe"
                    tables={tables.data.groups?.withoutPersonalInfo}
                    selectedName={tableRows.tableName}
                    onSelect={loadTableRows}
                  />
                  <TableGroup
                    title="미분류"
                    badgeClass="badge"
                    tables={tables.data.groups?.unclassified}
                    selectedName={tableRows.tableName}
                    onSelect={loadTableRows}
                  />
                </>
              )}
            </div>
          )}
          {tables.status === 'error' && (
            <div className="result error">
              <span className="badge badge-error">오류</span>
              <p>{tables.error}</p>
            </div>
          )}
        </div>
      </section>

      {tableRows.tableName && (
        <section className="card">
          <div className="card-header">
            <h2>
              {tableRows.tableName} 데이터
              {tableRows.data?.columns && (
                <span className="title-badge">
                  {' '}
                  <span
                    className={`badge ${
                      tables.data?.tables?.find((t) => t.name === tableRows.tableName)
                        ?.hasPersonalInfo
                        ? 'badge-pii'
                        : 'badge-safe'
                    }`}
                  >
                    {personalLabel(
                      tables.data?.tables?.find((t) => t.name === tableRows.tableName)
                        ?.hasPersonalInfo
                    )}
                  </span>
                </span>
              )}
            </h2>
          </div>
          <div className="card-body">
            {tableRows.status === 'loading' && <p className="muted">행 데이터 불러오는 중…</p>}
            {tableRows.status === 'error' && (
              <div className="result error">
                <span className="badge badge-error">오류</span>
                <p>{tableRows.error}</p>
              </div>
            )}
            {tableRows.status === 'success' && tableRows.data && (
              <div className="result">
                <p className="meta">총 {tableRows.data.rowCount}행</p>
                {tableRows.data.rows.length === 0 ? (
                  <p className="muted">데이터가 없습니다.</p>
                ) : (
                  <div className="data-table-wrap">
                    <table className="data-table">
                      <thead>
                        <tr>
                          {tableRows.data.columns.map((column) => (
                            <th key={column}>{column}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows.data.rows.map((row, index) => (
                          <tr key={index}>
                            {tableRows.data.columns.map((column) => (
                              <td key={column}>{formatCell(row[column])}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="card">
        <div className="card-header">
          <h2>데이터 관리</h2>
        </div>
        <div className="card-body">
          <p className="muted card-desc">
            개인정보/비개인정보 테이블과 FK 관계, 그리고 컬럼명이 이상한 개인정보 테이블
            (`cust_shadow_bag`, `id_scrap_bin`, `reach_out_pad`)까지 생성·누적할 수 있습니다.
          </p>
          <div className="btn-group">
            <button
              type="button"
              className="btn"
              onClick={handleSetupTables}
              disabled={setup.status === 'loading'}
            >
              {setup.status === 'loading' ? '생성 중…' : '테이블 생성'}
            </button>
          </div>
          <div className="btn-group seed-group">
            <button
              type="button"
              className="btn btn-pii"
              onClick={() => handleSeedSampleData('personal')}
              disabled={seed.status === 'loading'}
            >
              {seed.status === 'loading' && seed.scope === 'personal'
                ? '추가 중…'
                : '개인정보 샘플 추가'}
            </button>
            <button
              type="button"
              className="btn btn-safe"
              onClick={() => handleSeedSampleData('non_personal')}
              disabled={seed.status === 'loading'}
            >
              {seed.status === 'loading' && seed.scope === 'non_personal'
                ? '추가 중…'
                : '비개인정보 샘플 추가'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleSeedSampleData('all')}
              disabled={seed.status === 'loading'}
            >
              {seed.status === 'loading' && seed.scope === 'all'
                ? '추가 중…'
                : '전체 샘플 추가'}
            </button>
          </div>

          {setup.status === 'success' && setup.data && (
            <div className="result success action-result">
              <span className="badge badge-ok">테이블 생성 완료</span>
              <p>{setup.data.message}</p>
              <p className="meta">생성된 테이블: {setupTableNames}</p>
            </div>
          )}
          {setup.status === 'error' && (
            <div className="result error action-result">
              <span className="badge badge-error">테이블 생성 실패</span>
              <p>{setup.error}</p>
            </div>
          )}

          {seed.status === 'success' && seed.data && (
            <div className="result success action-result">
              <span className="badge badge-ok">샘플 데이터 추가 완료</span>
              <p>
                {seed.data.message} (scope: {seed.data.counts?.scope || seed.scope})
              </p>
              <p className="meta">
                이번 추가:{' '}
                {Object.entries(seed.data.counts?.added || {})
                  .filter(([, value]) => value > 0)
                  .map(([key, value]) => `${key} ${value}`)
                  .join(' · ') || '없음'}
                <br />
                현재 합계:{' '}
                {Object.entries(seed.data.counts?.totals || {})
                  .map(([key, value]) => `${key} ${value}`)
                  .join(' · ')}
              </p>
            </div>
          )}
          {seed.status === 'error' && (
            <div className="result error action-result">
              <span className="badge badge-error">샘플 데이터 추가 실패</span>
              <p>{seed.error}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
