export const ruCategories = {
  'ecommerce-marketplace-automation': 'E-Commerce и маркетплейсы', 'workforce-hr-automation': 'Персонал и HR',
  'ai-business-solutions': 'AI-решения для бизнеса', 'supply-chain-warehouse': 'Логистика и склад',
  'industrial-ai-manufacturing': 'Промышленный AI', 'hospitality-hotel-software': 'Гостеприимство',
  'automotive-software': 'Автомобильные решения', 'finance-accounting-automation': 'Финансы и учёт',
  'custom-software-business-automation': 'Заказная разработка',
};

export const copy = {
  de: {
    // Sign in and header
    loginTitle: 'Admin', loginHint: 'Mit einem Django-Administrator anmelden.', username: 'Benutzername', password: 'Passwort', login: 'Anmelden', loginError: 'Anmeldedaten ungültig.', welcome: 'Willkommen zurück.', loading: 'Wird geladen …', serverError: 'Der Server antwortet nicht. Bitte Seite neu laden.', logout: 'Abmelden', toSite: 'Website', backToSite: 'Zur Website', menu: 'Menü', language: 'Sprache', closeNotice: 'Meldung schließen',
    tabProjects: 'Portfolio', tabLeads: 'Anfragen',
    // Project list
    projects: 'Portfolio verwalten', newProject: 'Neues Projekt', search: 'Projekte suchen', all: 'Alle', live: 'Veröffentlicht', drafts: 'Entwürfe', nothingFound: 'Keine Projekte gefunden.', publishedStatus: 'Veröffentlicht', draftStatus: 'Entwurf', developmentStatus: 'In Entwicklung', editButton: 'Bearbeiten', deleteButton: 'Löschen', viewPage: 'Seite öffnen', confirmDelete: 'endgültig löschen?', deleted: 'Projekt gelöscht.', deleteError: 'Projekt konnte nicht gelöscht werden.',
    sortOff: 'Zum Sortieren „Alle“ wählen und die Suche leeren.', drag: 'Verschieben', moveUp: 'Nach oben', moveDown: 'Nach unten', changePlace: 'Platz ändern', orderSaved: 'Reihenfolge gespeichert.', moveError: 'Reihenfolge konnte nicht gespeichert werden.',
    // Editor
    edit: 'Projekt bearbeiten', new: 'Neues Projekt', back: 'Zurück zur Liste', save: 'Speichern', saving: 'Speichert …', unsaved: 'Nicht gespeichert', copyKept: 'Kopie im Browser', draftFound: 'Nicht gespeicherte Änderungen vom', draftOutdated: 'Das Projekt wurde seitdem geändert. Wiederherstellen ersetzt die neueren Daten.', restore: 'Wiederherstellen', discardCopy: 'Verwerfen', unsavedEdits: 'Offene Änderungen',newUnsaved: 'Neues Projekt noch nicht gespeichert', notFound: 'Projekt nicht gefunden.',created: 'Projekt angelegt.', updated: 'Projekt aktualisiert.', saveError: 'Projekt konnte nicht gespeichert werden.',
    sections: 'Abschnitte', sectionMain: 'Grunddaten', sectionPage: 'Projektseite', sectionImages: 'Bilder', sectionPreview: 'Vorschau',
    name: 'Name', category: 'Kategorie', time: 'Entwicklungszeit', timeExample: 'z. B. 12 Wochen',platforms: 'Verfügbar auf', inDevelopment: 'Projekt ist noch in Entwicklung', public: 'Auf der öffentlichen Portfolio-Seite anzeigen', published: 'Wird veröffentlicht', draft: 'Bleibt ein Entwurf', description: 'Beschreibung', stack: 'Stack / Tags', stackHint: 'Durch Komma getrennt',
    landingHint: 'Inhalte der Projektseite /portfolio/<slug>. Listen: ein Punkt pro Zeile.', slug: 'URL-Slug', slugHint: 'leer = aus dem Namen', slugRule: 'Nur Kleinbuchstaben a–z, Ziffern und Bindestrich', website: 'Website (optional)', challenge: 'Ausgangslage', features: 'Funktionen', results: 'Ergebnisse',
    currentImages: 'Aktuelle Bilder', noImages: 'Noch keine Bilder.', cover: 'Titelbild', addImages: 'Bilder hinzufügen', chooseFiles: 'Dateien auswählen', newImages: 'Werden beim Speichern hinzugefügt', imagesHint: 'Neue Bilder kommen ans Ende. Gibt es keine anderen, wird das erste das Titelbild. Titelbild und Beschriftung lassen sich nach dem Speichern festlegen.',
    makeCover: 'Als Titelbild', keepImage: 'Behalten', willBeRemoved: 'Wird beim Speichern gelöscht', dropImage: 'Nicht hinzufügen', caption: 'Beschriftung', captionHint: 'Beschriftungen lesen Suchmaschinen und Vorleseprogramme. Leer = Projektname.',
    viewOnSite: 'Auf der Website', openWebsite: 'Website des Projekts öffnen', own: 'Eigenes Projekt (Kennzeichnung auf der Website)', integrations: 'Integrationen', integrationsHint: 'Durch Komma getrennt; erscheinen auf der Projektseite',
    preview: 'Live-Vorschau', noScreenshot: 'Screenshot', projectName: 'Projektname', previewDescription: 'Die Beschreibung des Projekts erscheint hier.',
    // Leads
    leadsTitle: 'Kontaktanfragen', noLeads: 'Noch keine Anfragen.', source: 'Quelle', firstPage: 'Erste Seite', searchLeads: 'Anfragen suchen', noLeadsFound: 'Keine Anfragen gefunden.', newLeads: 'Neue Anfragen',
    statusLabel: 'Status', leadStatus: { new: 'Neu', active: 'In Arbeit', client: 'Kunde', declined: 'Absage' }, leadFilter: { new: 'Neu', active: 'In Arbeit', client: 'Kunden', declined: 'Absagen' },
    note: 'Notiz', notePlaceholder: 'Notiz (wird automatisch gespeichert)', statusSaved: 'Status gespeichert.', noteSaved: 'Notiz gespeichert.', leadError: 'Änderung konnte nicht gespeichert werden.', confirmDeleteLead: 'Anfrage endgültig löschen?', leadDeleted: 'Anfrage gelöscht.', leadDeleteError: 'Anfrage konnte nicht gelöscht werden.',
  },
  ru: {
    loginTitle: 'Админка', loginHint: 'Войдите с учётной записью администратора Django.', username: 'Имя пользователя', password: 'Пароль', login: 'Войти', loginError: 'Неверные данные для входа.', welcome: 'Добро пожаловать.', loading: 'Загрузка…', serverError: 'Сервер не отвечает. Обновите страницу.', logout: 'Выйти', toSite: 'На сайт', backToSite: 'На сайт', menu: 'Меню', language: 'Язык', closeNotice: 'Закрыть сообщение',
    tabProjects: 'Портфолио', tabLeads: 'Заявки',
    projects: 'Управление портфолио', newProject: 'Новый проект', search: 'Поиск проектов', all: 'Все', live: 'Опубликованные', drafts: 'Черновики', nothingFound: 'Проекты не найдены.', publishedStatus: 'Опубликован', draftStatus: 'Черновик', developmentStatus: 'В разработке', editButton: 'Редактировать', deleteButton: 'Удалить', viewPage: 'Открыть страницу', confirmDelete: 'удалить безвозвратно?', deleted: 'Проект удалён.', deleteError: 'Не удалось удалить проект.',
    sortOff: 'Чтобы менять порядок, выберите «Все» и очистите поиск.', drag: 'Перетащить', moveUp: 'Выше', moveDown: 'Ниже', changePlace: 'Изменить место', orderSaved: 'Порядок сохранён.', moveError: 'Не удалось сохранить порядок.',
    edit: 'Редактирование проекта', new: 'Новый проект', back: 'Назад к списку', save: 'Сохранить', saving: 'Сохраняю…', unsaved: 'Не сохранено', copyKept: 'копия в браузере', draftFound: 'Есть несохранённые правки от', draftOutdated: 'Проект с тех пор изменили. Восстановление заменит новые данные.', restore: 'Восстановить', discardCopy: 'Удалить', unsavedEdits: 'Несохранённые правки', newUnsaved: 'Новый проект ещё не сохранён', notFound: 'Проект не найден.',created: 'Проект создан.', updated: 'Проект обновлён.', saveError: 'Не удалось сохранить проект.',
    sections: 'Разделы', sectionMain: 'Основное', sectionPage: 'Страница проекта', sectionImages: 'Картинки', sectionPreview: 'Просмотр',
    name: 'Название', category: 'Категория', time: 'Срок разработки', timeExample: 'z. B. 12 Wochen',platforms: 'Доступно на', inDevelopment: 'Проект ещё в разработке', public: 'Показывать на публичной странице портфолио', published: 'Будет опубликован', draft: 'Останется черновиком', description: 'Описание', stack: 'Стек / теги', stackHint: 'Через запятую',
    landingHint: 'Содержимое страницы проекта /portfolio/<slug>. Списки: один пункт на строку.', slug: 'URL (slug)', slugHint: 'пусто = из названия', slugRule: 'Только строчные латинские буквы, цифры и дефис', website: 'Сайт (необязательно)', challenge: 'Исходная задача', features: 'Функции', results: 'Результаты',
    currentImages: 'Текущие картинки', noImages: 'Картинок пока нет.', cover: 'Обложка', addImages: 'Добавить картинки', chooseFiles: 'Выбрать файлы', newImages: 'Будут добавлены при сохранении', imagesHint: 'Новые картинки добавляются в конец. Если других нет, обложкой станет первая. Обложку и подписи можно задать после сохранения.',
    makeCover: 'Сделать обложкой', keepImage: 'Оставить', willBeRemoved: 'Удалится при сохранении', dropImage: 'Не добавлять', caption: 'Подпись', captionHint: 'Подписи читают поисковики и программы для незрячих. Пусто = название проекта.',
    viewOnSite: 'На сайте', openWebsite: 'Открыть сайт самого проекта', own: 'Свой проект (метка «Eigenes Projekt» на сайте)', integrations: 'Интеграции', integrationsHint: 'Через запятую; показываются на странице проекта',
    preview: 'Предпросмотр', noScreenshot: 'Скриншот', projectName: 'Название проекта', previewDescription: 'Здесь появится описание проекта.',
    leadsTitle: 'Заявки с сайта', noLeads: 'Заявок пока нет.', source: 'Источник', firstPage: 'Первая страница', searchLeads: 'Поиск заявок', noLeadsFound: 'Заявки не найдены.', newLeads: 'Новые заявки',
    statusLabel: 'Статус', leadStatus: { new: 'Новая', active: 'В работе', client: 'Клиент', declined: 'Отказ' }, leadFilter: { new: 'Новые', active: 'В работе', client: 'Клиенты', declined: 'Отказы' },
    note: 'Заметка', notePlaceholder: 'Заметка (сохраняется сама)', statusSaved: 'Статус сохранён.', noteSaved: 'Заметка сохранена.', leadError: 'Не удалось сохранить изменение.', confirmDeleteLead: 'удалить заявку безвозвратно?', leadDeleted: 'Заявка удалена.', leadDeleteError: 'Не удалось удалить заявку.',
  },
};

export const categoryName = (project, lang) => (lang === 'ru' ? ruCategories[project.category] || project.category_label : project.category_label);
