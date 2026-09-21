"use client";

import { useEffect, useMemo, useState } from "react";
import StockChart, { PricePoint } from "./StockChart";

type Range = "1D" | "1W" | "1M" | "1Y";

const START_PRICE = 72350;
const SEED_COUNT = 70;

function makeInitialData(): PricePoint[] {
  let price = START_PRICE;
  const now = Date.now();
  return Array.from({ length: SEED_COUNT }, (_, index) => {
    const drift = (Math.random() - 0.48) * 500;
    price = Math.max(1000, price + drift);
    const date = new Date(now - (SEED_COUNT - index) * 60_000);
    return {
      time: date.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      price: Math.round(price),
    };
  });
}

export default function StockScreen() {
  const [range, setRange] = useState<Range>("1D");
  const [data, setData] = useState<PricePoint[]>(makeInitialData);
  const [previousClose] = useState(START_PRICE - 420);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setData((current) => {
        const last = current.at(-1)?.price ?? START_PRICE;
        const marketDrift = (Math.random() - 0.47) * 280;
        const next = Math.max(1000, Math.round(last + marketDrift));
        const now = new Date();
        const point = {
          time: now.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          price: next,
        };
        return [...current.slice(-99), point];
      });
    }, 1500);

    return () => window.clearInterval(timer);
  }, []);

  const currentPrice = data.at(-1)?.price ?? START_PRICE;
  const change = currentPrice - previousClose;
  const changeRate = (change / previousClose) * 100;
  const positive = change >= 0;

  const stats = useMemo(() => {
    const prices = data.map((point) => point.price);
    return {
      high: Math.max(...prices),
      low: Math.min(...prices),
      volume: Math.round(1854200 + Math.random() * 25000),
    };
  }, [data]);

  return (
    <main className="page">
      <section className="stock-card">
        <header className="stock-header">
          <div>
            <div className="market-badge">BOLSPI</div>
            <h1>장평</h1>
            {/* <p>VSTK · 가상 종목</p> */}
          </div>
          <button className="icon-button" aria-label="관심 종목">
            ♡
          </button>
        </header>

        <section className="price-section">
          <div className="current-price">
            {currentPrice.toLocaleString("ko-KR")}원
          </div>
          <div className={positive ? "change positive" : "change negative"}>
            {positive ? "▲" : "▼"} {Math.abs(change).toLocaleString("ko-KR")}원
            ({Math.abs(changeRate).toFixed(2)}%)
          </div>
          <div className="market-status">
            <span /> 장중 · 실시간 가상 데이터
          </div>
        </section>

        <section className="chart-section">
          <StockChart data={data} positive={positive} />
          <div className="range-tabs">
            {(["1D", "1W", "1M", "1Y"] as Range[]).map((item) => (
              <button
                key={item}
                className={range === item ? "active" : ""}
                onClick={() => setRange(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="summary-grid">
          <div>
            <span>전일 종가</span>
            <strong>{previousClose.toLocaleString("ko-KR")}원</strong>
          </div>
          <div>
            <span>고가</span>
            <strong>{stats.high.toLocaleString("ko-KR")}원</strong>
          </div>
          <div>
            <span>저가</span>
            <strong>{stats.low.toLocaleString("ko-KR")}원</strong>
          </div>
          <div>
            <span>거래량</span>
            <strong>{stats.volume.toLocaleString("ko-KR")}</strong>
          </div>
        </section>

        <div className="notice">
          <span>ⓘ</span>
          실제 금융 데이터가 아닌 화면/UI 테스트용 가상 데이터야.
        </div>
      </section>
    </main>
  );
}
