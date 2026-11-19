# AutomatonSoft — сайт

Сайт AutomatonSoft GmbH: портфолио, отраслевые лендинги, форма заявки. Немецкий язык без префикса (`/kontakt`), английский под `/en/...` (`/en/contact`).

План развития и ТЗ: [docs/TZ.md](docs/TZ.md).

## Структура

```
frontend/   Next.js (App Router), статический экспорт, отдаётся Nginx
backend/    Django: проекты портфолио, скриншоты, заявки, API под /api/
deploy/     прод: docker-compose, конфиги хостового Nginx, скрипт деплоя
docs/       ТЗ и документация
compose.yaml  локальный запуск всего стека в Docker
```

Внутри `frontend/`:

```
app/              маршруты: (de) и (en) — сайт, (admin)/dashboard — админка
components/       секции и страницы; ui/ — shadcn, только для админки
lib/i18n/         тексты на двух языках и таблица URL (routes)
lib/site-config.js  телефон, e-mail, адрес, домен
lib/seo.js        metadata, JSON-LD, черновые страницы (draftPages)
public/assets/    картинки и основной CSS сайта
nginx.conf        Nginx внутри контейнера: статика, /api/ → Django, редиректы
```

Внутри `backend/`: `automatonsoft/` — настройки Django, `core/` — модели, API, админка, команда `seed_portfolio`.

## Запуск локально

Весь стек в Docker (как на проде):

```bash
docker compose up -d --build
```

Сайт: http://127.0.0.1:18080/, админка: http://127.0.0.1:18080/dashboard. Остановить: `docker compose down` (данные остаются в volume).

Для разработки фронта с горячей перезагрузкой: Django на `:8000`, затем

```bash
cd frontend && npm install && npm run dev
```

`next dev` проксирует `/api/` и `/media/` на `BACKEND_URL` (по умолчанию `http://127.0.0.1:8000`).

Django без Docker (нужен Python 3.12+):

```bash
cd backend && pip install -r requirements.txt && python manage.py migrate && python manage.py runserver
```

## Проверки

```bash
cd frontend && npm run build
```

```bash
cd backend && python manage.py check && python manage.py test
```

CI (`.github/workflows/website.yml`) запускает обе проверки и smoke-тест Docker-стека.

## Деплой

Push в `main` после зелёного CI: GitHub Actions на self-hosted раннере собирает архив из `frontend/`, `backend/` и `deploy/docker-compose.yml` и запускает `/usr/local/sbin/deploy-automatonsoft` (копия в `deploy/server/`). Скрипт распаковывает релиз, пересобирает контейнеры и откатывается, если сайт не ответил.

Если меняется `deploy/server/deploy-automatonsoft`, его нужно вручную установить на сервер: в `/usr/local/sbin/` он лежит под root.

## Контент

- **Главная** (`/`, `/en`) уже в новом дизайне: `components/landing/home-landing.jsx`, тексты из `dictionaries/*/home.js`, продукты в первом экране — `lib/landings/home.js`. Главная и лендинги собраны из общих блоков `components/landing/blocks.jsx` (заголовок, карточки трёх тонов, FAQ, контакты) и `cta-band.jsx`; шапка, подвал (со ссылками на все лендинги), плавающая кнопка и мобильная панель — в `chrome.jsx`. Новый блок или правку стиля делайте в `blocks.jsx`, тогда они применятся везде.
- **Портфолио, отрасли, услуги, контакты, компания и найм** (`/portfolio`, `/portfolio/<slug>`, `/branchen`, `/dienstleistungen`, `/kontakt`, `/unternehmen`, `/entwickler-engagieren`) тоже в новом дизайне: `components/landing/{portfolio-view,portfolio-list,project-view,industries-view,services-view,contact-view,company-view,hire-view}.jsx` (маршруты услуг, контактов, компании и найма — `page-route.jsx`), рамка внутренних страниц и заголовок — `shell.jsx` (`SitePage`, `PageHead`). Они лежат в корневых макетах `app/(landing-*)`, а старый маршрут `[...slug]` их больше не отдаёт (список `redesigned` в `components/pages/locale-page.jsx`). Impressum, Datenschutz и блог (`/impressum`, `/datenschutz`, `/blog`) собраны из словаря в `components/landing/content-view.jsx`. Старого дизайна и `style.css` в проекте больше нет. **Страница 404 на языке адреса:** nginx выбирает её по префиксу URL (`map $not_found_page` в `frontend/nginx.conf`): `/nicht-gefunden` для немецкого, `/en/not-found` для английского; тексты — `notFound` в словарях, шапка переключает язык. Для нового языка: страница `app/(landing-xx)/xx/not-found/page.jsx` через `createNotFoundRoute`, строка в `map` и `location = /xx/not-found.html { internal; }` в nginx. `app/global-not-found.jsx` — запасной вариант, который требует Next.
- **Отраслевой лендинг** (`/branchen/<slug>`, `/en/industries/<slug>`): файл данных в `lib/landings/` по образцу `supply-chain.js` и строка в `sources` (`lib/landings/index.js`, ключ = id отрасли из `dictionaries/industries.js`). Общие тексты лежат в `common.js` (файл лендинга может переопределить любое поле), кейсы и картинки — в `cases.js`. Без `heroImage` в первом экране показывается список модулей, без `integrations` нет строки интеграций. Шаблон (`components/landing/landing-page.jsx`), маршруты, hreflang, FAQPage, картинка для соцсетей, sitemap и ссылки с «Branchen» и главной подхватятся сами.
- **Новая страница:** id и slug в `routes` (`lib/i18n/index.js`) и `pages.<id>` в обоих словарях. `ContentPage` отрисует её сама.
- **Страница без готового контента:** добавить в `draftPages` (`lib/seo.js`). Она доступна, но `noindex`, без меню и sitemap.
- **Портфолио:** хранится в Django и редактируется в `/dashboard`. Для статических страниц проектов данные берутся с API во время сборки. `seed_portfolio` при каждом старте backend создаёт недостающие проекты по заголовку. Если меняется заголовок seed-проекта, нужна ещё и data-миграция (пример: `core/migrations/0004_update_hubnity_and_lisa.py`), иначе seed создаст старый проект заново.
- **Старые URL** (`/kontakt.html`, `/kontakt/`) редиректятся 301 на чистые в `frontend/nginx.conf`.
