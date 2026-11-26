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
    loginTitle: 'Admin', loginHint: 'Mit einem Django-Administrator anmelden.', username: 'Benutzername', password: 'Passwort', login: 'Anmelden', loginError: 'Anmeldedaten ungültig.', welcome: 'Willkommen zurück.', logout: 'Abmelden', closeNotice: 'Meldung schließen',
    tabProjects: 'Portfolio', tabLeads: 'Anfragen',
    // Project list
    projects: 'Portfolio verwalten', newProject: 'Neues Projekt', search: 'Name, Kategorie oder Stack suchen', all: 'Alle', live: 'Veröffentlicht', drafts: 'Entwürfe', nothingFound: 'Keine Projekte gefunden.', publishedStatus: 'Veröffentlicht', draftStatus: 'Entwurf', developmentStatus: 'In Entwicklung', editButton: 'Bearbeiten', deleteButton: 'Löschen', viewPage: 'Seite öffnen', confirmDelete: 'endgültig löschen?', deleted: 'Projekt gelöscht.', deleteError: 'Projekt konnte nicht gelöscht werden.',
    sortOff: 'Zum Sortieren „Alle“ wählen und die Suche leeren.', drag: 'Verschieben', moveUp: 'Nach oben', moveDown: 'Nach unten', changePlace: 'Platz ändern', orderSaved: 'Reihenfolge gespeichert.', moveError: 'Reihenfolge konnte nicht gespeichert werden.',
    // Editor
    edit: 'Projekt bearbeiten', new: 'Neues Projekt', back: 'Zurück zur Liste', save: 'Speichern', saving: 'Speichert …', unsaved: 'Nicht gespeichert', discard: 'Änderungen sind nicht gespeichert. Trotzdem verlassen?', created: 'Projekt angelegt.', updated: 'Projekt aktualisiert.', saveError: 'Projekt konnte nicht gespeichert werden.',
    sections: 'Abschnitte', sectionMain: 'Grunddaten', sectionPage: 'Projektseite', sectionImages: 'Bilder', sectionPreview: 'Vorschau',
    name: 'Name', category: 'Kategorie', time: 'Entwicklungszeit', timeExample: 'z. B. 12 Wochen',platforms: 'Verfügbar auf', inDevelopment: 'Projekt ist noch in Entwicklung', public: 'Auf der öffentlichen Portfolio-Seite anzeigen', published: 'Wird veröffentlicht', draft: 'Bleibt ein Entwurf', description: 'Beschreibung', stack: 'Stack / Tags', stackHint: 'Durch Komma getrennt',
    landingHint: 'Inhalte der Projektseite /portfolio/<slug>. Listen: ein Punkt pro Zeile.', slug: 'URL-Slug', slugHint: 'leer = aus dem Namen', slugRule: 'Nur Kleinbuchstaben a–z, Ziffern und Bindestrich', website: 'Website (optional)', challenge: 'Ausgangslage', features: 'Funktionen', results: 'Ergebnisse',
    currentImages: 'Aktuelle Bilder', noImages: 'Noch keine Bilder.', cover: 'Titelbild', addImages: 'Bilder hinzufügen', chooseFiles: 'Dateien auswählen', newImages: 'Werden beim Speichern hinzugefügt', imagesHint: 'Neue Bilder ergänzen die vorhandenen. Das zuletzt ausgewählte wird das Titelbild.',
    preview: 'Live-Vorschau', noScreenshot: 'Screenshot', projectName: 'Projektname', previewDescription: 'Die Beschreibung des Projekts erscheint hier.',
    // Leads
    leadsTitle: 'Kontaktanfragen', noLeads: 'Noch keine Anfragen.', source: 'Quelle',
  },
  ru: {
    loginTitle: 'Админка', loginHint: 'Войдите с учётной записью администратора Django.', username: 'Имя пользователя', password: 'Пароль', login: 'Войти', loginError: 'Неверные данные для входа.', welcome: 'Добро пожаловать.', logout: 'Выйти', closeNotice: 'Закрыть сообщение',
    tabProjects: 'Портфолио', tabLeads: 'Заявки',
    projects: 'Управление портфолио', newProject: 'Новый проект', search: 'Название, категория или стек', all: 'Все', live: 'Опубликованные', drafts: 'Черновики', nothingFound: 'Проекты не найдены.', publishedStatus: 'Опубликован', draftStatus: 'Черновик', developmentStatus: 'В разработке', editButton: 'Редактировать', deleteButton: 'Удалить', viewPage: 'Открыть страницу', confirmDelete: 'удалить безвозвратно?', deleted: 'Проект удалён.', deleteError: 'Не удалось удалить проект.',
    sortOff: 'Чтобы менять порядок, выберите «Все» и очистите поиск.', drag: 'Перетащить', moveUp: 'Выше', moveDown: 'Ниже', changePlace: 'Изменить место', orderSaved: 'Порядок сохранён.', moveError: 'Не удалось сохранить порядок.',
    edit: 'Редактирование проекта', new: 'Новый проект', back: 'Назад к списку', save: 'Сохранить', saving: 'Сохраняю…', unsaved: 'Не сохранено', discard: 'Изменения не сохранены. Всё равно выйти?', created: 'Проект создан.', updated: 'Проект обновлён.', saveError: 'Не удалось сохранить проект.',
    sections: 'Разделы', sectionMain: 'Основное', sectionPage: 'Страница проекта', sectionImages: 'Картинки', sectionPreview: 'Просмотр',
    name: 'Название', category: 'Категория', time: 'Срок разработки', timeExample: 'z. B. 12 Wochen',platforms: 'Доступно на', inDevelopment: 'Проект ещё в разработке', public: 'Показывать на публичной странице портфолио', published: 'Будет опубликован', draft: 'Останется черновиком', description: 'Описание', stack: 'Стек / теги', stackHint: 'Через запятую',
    landingHint: 'Содержимое страницы проекта /portfolio/<slug>. Списки: один пункт на строку.', slug: 'URL (slug)', slugHint: 'пусто = из названия', slugRule: 'Только строчные латинские буквы, цифры и дефис', website: 'Сайт (необязательно)', challenge: 'Исходная задача', features: 'Функции', results: 'Результаты',
    currentImages: 'Текущие картинки', noImages: 'Картинок пока нет.', cover: 'Обложка', addImages: 'Добавить картинки', chooseFiles: 'Выбрать файлы', newImages: 'Будут добавлены при сохранении', imagesHint: 'Новые картинки добавляются к уже загруженным. Последняя выбранная станет обложкой.',
    preview: 'Предпросмотр', noScreenshot: 'Скриншот', projectName: 'Название проекта', previewDescription: 'Здесь появится описание проекта.',
    leadsTitle: 'Заявки с сайта', noLeads: 'Заявок пока нет.', source: 'Источник',
  },
};

export const categoryName = (project, lang) => (lang === 'ru' ? ruCategories[project.category] || project.category_label : project.category_label);
