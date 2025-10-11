# Design Document

## Overview

Система навигации вики AdvaneTale будет построена на основе Next.js с использованием динамической маршрутизации и markdown файлов для хранения контента. Главная страница будет содержать только навигационное меню, а каждый раздел будет отдельной страницей с единой системой навигации.

## Architecture

### File Structure

```
public/
├── wiki/
│   ├── index.md (главная страница - только навигация)
│   ├── faq.md
│   ├── worlds.md
│   ├── trading.md
│   └── crafts.md
├── images/
│   └── wiki/
│       ├── spawn.jpg
│       ├── farm-world.jpg
│       └── ... (остальные изображения)

src/
├── app/
│   └── wiki/
│       ├── page.tsx (главная страница вики)
│       ├── [section]/
│       │   └── page.tsx (динамические страницы разделов)
│       └── layout.tsx (общий layout с навигацией)
├── components/
│   ├── WikiNavigation.tsx
│   └── WikiContent.tsx
└── lib/
    └── wiki.ts (утилиты для работы с markdown)
```

## Components and Interfaces

### WikiNavigation Component

```typescript
interface WikiSection {
  id: string;
  title: string;
  description: string;
  path: string;
}

interface WikiNavigationProps {
  currentSection?: string;
  sections: WikiSection[];
}
```

### WikiContent Component

```typescript
interface WikiContentProps {
  content: string;
  title: string;
}
```

### Wiki Utility Functions

```typescript
interface WikiData {
  title: string;
  content: string;
  sections: WikiSection[];
}

function getWikiSections(): WikiSection[];
function getWikiContent(section: string): WikiData;
function parseMarkdown(content: string): string;
```

## Data Models

### Wiki Section Configuration

```typescript
const WIKI_SECTIONS: WikiSection[] = [
  {
    id: "faq",
    title: "Часто задаваемые вопросы",
    description: "Ответы на популярные вопросы о сервере",
    path: "/wiki/faq",
  },
  {
    id: "worlds",
    title: "Миры сервера",
    description: "Информация об основном мире и мире ферм",
    path: "/wiki/worlds",
  },
  {
    id: "trading",
    title: "Торговля",
    description: "Экономическая система и торговля на сервере",
    path: "/wiki/trading",
  },
  {
    id: "crafts",
    title: "Новые крафты",
    description: "Уникальные рецепты крафта на сервере",
    path: "/wiki/crafts",
  },
];
```

### Markdown File Structure

Каждый markdown файл будет содержать:

- Заголовок раздела
- Основной контент
- Ссылки на изображения (относительные пути)

## Error Handling

### File Not Found

- Если markdown файл не найден, показывать 404 страницу
- Логировать ошибки загрузки файлов

### Image Loading

- Использовать Next.js Image component для оптимизации
- Показывать placeholder при загрузке
- Fallback для отсутствующих изображений

### Navigation Errors

- Graceful fallback если секция не существует
- Редирект на главную страницу вики при ошибке

## Testing Strategy

### Unit Tests

- Тестирование утилит для работы с markdown
- Тестирование компонентов навигации
- Валидация конфигурации разделов

### Integration Tests

- Тестирование загрузки markdown файлов
- Проверка корректности маршрутизации
- Тестирование отображения изображений

### E2E Tests

- Навигация между разделами
- Отображение контента
- Работа с мобильными устройствами
