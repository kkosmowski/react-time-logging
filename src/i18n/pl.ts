import en from './en';

const pl: typeof en = {
  COMMON: {
    CANCEL: 'Anuluj',
    CLOSE: 'Zamknij',
    ADD: 'Dodaj',
    SAVE: 'Zapisz',
    EDIT: 'Edytuj',
    DELETE: 'Usuń',
    SETTINGS: 'Ustawienia',
    NONE: 'Brak',
    DUPLICATE: 'Duplikuj',
    COPY_OF_TASK: '{{ title }} (Kopia)',
    MONDAY: 'Poniedziałek',
    TUESDAY: 'Wtorek',
    WEDNESDAY: 'Środa',
    THURSDAY: 'Czwartek',
    FRIDAY: 'Piątek',
    SATURDAY: 'Sobota',
    SUNDAY: 'Niedziela',
    MON: 'Pn',
    TUE: 'Wt',
    WED: 'Śr',
    THU: 'Cz',
    FRI: 'Pt',
    SAT: 'So',
    SUN: 'Nd',
    TODAY: 'Dzisiaj',
    CUT: 'Wytnij',
    COPY: 'Kopiuj',
    PASTE: 'Wklej',
  },
  CONFIRMATION_DIALOG: {
    CONFIRM: 'Potwierdź',
    TITLE_LEAVE_PROGRESS: 'Porzucić zmiany?',
    LEAVE_PROGRESS: 'Porzucenie zmian wymaga potwierdzenia..\n\nJeżeli nie chcesz stracić postępu, kliknij Anuluj.',
    TITLE_DELETE_TASK: 'Usuń zadanie',
    DELETE_TASK: 'Usunięcie zadania o nazwie\n{{ name }}\nwymaga potwierdzenia.\n\nTej operacji nie da się cofnąć.',
    TITLE_DELETE_MULTIPLE_TASKS: 'Usuń wiele zadań',
    DELETE_MULTIPLE_TASKS: 'Usunięcie {{ count }} zadań wymaga potwierdzenia.\n\nTej operacji nie da się cofnąć.',
  },
  SETTINGS_DIALOG: {
    MANAGE_CATEGORIES: 'Zarządzanie kategoriami',
    NEW_CATEGORY: 'Nowa kategoria',
    ADD_CATEGORY: 'Dodaj kategorię',
    BOARD_SETTINGS: 'Ustawienia tablicy',
    WEEKEND_DISPLAY: 'Wyświetlanie weekendu',
    NO_WEEKEND: 'Bez weekendu',
    SATURDAY_ONLY: 'Tylko sobota',
    FULL_WEEKEND: 'Pełny weekend',
    FIRST_DAY_OF_WEEK: 'Pierwszy dzień tygodnia',
    DAY_TARGET: 'Cel godzin w ciągu dnia',
    DAY_LIMIT: 'Limit godzin w ciągu dnia',
    HOURS_SUFFIX: 'godzin',
    LANGUAGE: 'Język',
    THEME: 'Motyw',
  },
  TASK_DIALOG: {
    ADD_TASK: 'Dodawanie zadanie',
    VIEW_TASK: 'Szczegóły zadania',
    EDIT_TASK: 'Edycja zadania',
    TASK_NAME_PLACEHOLDER: 'Nazwa zadania',
    TASK_DESCRIPTION_PLACEHOLDER: 'Opis zadania',
    TASK_CATEGORIES_PLACEHOLDER: 'Kategorie',
    TASK_DATE_PLACEHOLDER: 'Kiedy?',
    TASK_DURATION_PLACEHOLDER: '"1h", "30m", "2h 15m" itp.',
    TASK_NAME_TITLE: 'Nazwa zadania',
    TASK_DESCRIPTION_TITLE: 'Opis zadania',
    TASK_CATEGORIES_TITLE: 'Kategorie',
    TASK_DATE_TITLE: 'Data',
    TASK_DURATION_TITLE: 'Czas trwania',
    CANNOT_DUPLICATE_BECAUSE_OF_LIMIT: 'Nie można zduplikować zadania, gdyż łączny czas przekroczyłby limit {{ limit }} godzin.',
  },
  ERROR: {
    DAY_LIMIT_EXCEEDED: 'Nie można zalogować więcej niż {{ limit }} godzin w ciągu dnia.\nObecnie: {{ current }}.',
  },
  THEME: {
    LIGHT_BLUE: 'Jasny (błękitny)',
    LIGHT_PURPLE: 'Jasny (fioletowy)',
    DARK_GREEN: 'Ciemny (zielony)',
    DARK_YELLOW: 'Ciemny (żółty)',
    DARK_TEAL: 'Ciemny (morski)',
  },
  COLUMN: {
    CANNOT_DROP_BECAUSE_OF_LIMIT: 'Nie można dodać zadania do tej kolumny, gdyż łączny czas przekroczyłby limit {{ limit }} godzin.',
    CANNOT_PASTE_BECAUSE_OF_LIMIT: 'Nie można wkleić zadania, gdyż łączny czas przekroczyłby limit {{ limit }} godzin.',
    NOTHING_TO_PASTE: 'Żadne zadanie nie jest obecnie wycięte bądź skopiowane.',
  },
  FILTERS: {
    CLEAR: 'Wyczyść',
    FILTER_CATEGORIES: 'Filtruj po kategorii',
    SELECT_CATEGORIES_PLACEHOLDER: 'Wybierz kategorie...',
    ANY_OR_EVERY: 'Jakakolwiek czy wszystkie',
    ANY_OR_EVERY_TOOLTIP: 'Wybierz czy zadanie musi zawierać wszystkie wybrane kategorie czy jakąkolwiek.',
    ANY: 'Jakakolwiek',
    EVERY: 'Wszystkie',
    CURRENT_FILTERS: 'Obecnie wyswietlane są zadania z kategoriami',
    AND: 'oraz',
    OR: 'lub',
    SAVE_FILTERS: 'Zapisz filtry',
    SAVE_FILTERS_EXPLANATION: 'Zapisanie filtrów sprawi, że będą one ładowane przy uruchomieniu aplikacji.',
    SAVE_AS_DEFAULT: 'Zapisz jako domyślne',
    RESTORE_DEFAULT: 'Przywróć domyślne',
  },
};

export default pl;