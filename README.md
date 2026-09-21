# Virtual Stock UI

Next.js + React + Recharts + Prisma 기반의 가상 주식 화면 예제.

## 실행

```bash
pnpm install
pnpm dev
```

브라우저에서 `http://localhost:3000` 접속.

## Prisma

DB가 필요하면 `.env.example`을 `.env`로 복사하고 PostgreSQL `DATABASE_URL`을 넣는다.

```bash
pnpm db:generate
pnpm db:push
```

현재 화면의 실시간 가상 가격 시뮬레이션은 UI 확인을 위해 클라이언트에서 동작한다. `/api/stock`은 Prisma에 저장된 `VSTK` 스냅샷을 조회하는 기본 API다.

## GitHub

```bash
git init
git add .
git commit -m "init: virtual stock ui"
git branch -M main
git remote add origin <YOUR_GITHUB_REPOSITORY>
git push -u origin main
```
