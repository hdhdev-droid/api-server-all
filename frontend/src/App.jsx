import { useState, useEffect } from 'react';
import { checkDb, getTables, setupTables, seedSampleData } from './api';
import './App.css';

function App() {
  const [dbCheck, setDbCheck] = useState({ status: 'idle', data: null, error: null });
  const [tables, setTables] = useState({ status: 'idle', data: null, error: null });
  const [setup, setSetup] = useState({ status: 'idle', data: null, error: null });
  const [seed, setSeed] = useState({ status: 'idle', data: null, error: null });

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

  const handleSeedSampleData = async () => {
    setSeed({ status: 'loading', data: null, error: null });
    try {
      const data = await seedSampleData();
      setSeed({ status: 'success', data, error: null });
      await loadTables();
    } catch (err) {
      setSeed({ status: 'error', data: null, error: err.message });
    }
  };

  useEffect(() => {
    loadDbCheck();
  }, []);

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
            <p className="muted">목록 불러오기 버튼을 누르세요.</p>
          )}
          {tables.status === 'loading' && <p className="muted">테이블 목록 불러오는 중…</p>}
          {tables.status === 'success' && tables.data && (
            <div className="result">
              <p className="meta">
                데이터베이스: {tables.data.database} · {tables.data.count}개 테이블
              </p>
              {tables.data.tables.length === 0 ? (
                <p className="muted">테이블이 없습니다.</p>
              ) : (
                <ul className="table-list">
                  {tables.data.tables.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
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

      <section className="card">
        <div className="card-header">
          <h2>데이터 관리</h2>
        </div>
        <div className="card-body">
          <p className="muted card-desc">
            상품·사용자·주문내역 테이블을 생성하고, 실제와 유사한 개인정보가 포함된 샘플 데이터를 각 10건씩
            넣을 수 있습니다.
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
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleSeedSampleData}
              disabled={seed.status === 'loading'}
            >
              {seed.status === 'loading' ? '추가 중…' : '샘플 데이터 추가 (각 10건)'}
            </button>
          </div>

          {setup.status === 'success' && setup.data && (
            <div className="result success action-result">
              <span className="badge badge-ok">테이블 생성 완료</span>
              <p>{setup.data.message}</p>
              <p className="meta">생성된 테이블: {setup.data.tables.join(', ')}</p>
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
              <p>{seed.data.message}</p>
              <p className="meta">
                사용자 {seed.data.counts.users}건 · 상품 {seed.data.counts.products}건 · 주문{' '}
                {seed.data.counts.orders}건
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
