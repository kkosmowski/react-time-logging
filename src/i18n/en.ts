const en = {
  COMMON: {
    CANCEL: 'Cancel',
    CLOSE: 'Close',
    ADD: 'Add',
    SAVE: 'Save',
    EDIT: 'Edit',
    DELETE: 'Delete',
    SETTINGS: 'Settings',
    NONE: 'None',
    DUPLICATE: 'Duplicate',
    COPY_OF_TASK: 'Copy of {{ title }}',
  },
  CONFIRMATION_DIALOG: {
    CONFIRM: 'Confirm',
    TITLE_LEAVE_PROGRESS: 'Leave progress?',
    LEAVE_PROGRESS: 'Please confirm that you want to abandon your progress.\n\nOtherwise cancel.',
    TITLE_DELETE_TASK: 'Delete task',
    DELETE_TASK: 'Please confirm that you want to delete task\n"{{ name }}".\n\nThis operation cannot be reverted.',
  },
  SETTINGS_DIALOG: {
    MANAGE_CATEGORIES: 'Manage categories',
    NEW_CATEGORY: 'New category',
    ADD_CATEGORY: 'Add category',
    BOARD_SETTINGS: 'Board settings',
    WEEKEND_DISPLAY: 'Weekend display',
    NO_WEEKEND: 'No weekend',
    SATURDAY_ONLY: 'Saturday only',
    FULL_WEEKEND: 'Full weekend',
    FIRST_DAY_OF_WEEK: 'First day of the week',
    MONDAY: 'Monday',
    TUESDAY: 'Tuesday',
    WEDNESDAY: 'Wednesday',
    THURSDAY: 'Thursday',
    FRIDAY: 'Friday',
    SATURDAY: 'Saturday',
    SUNDAY: 'Sunday',
    DAY_TARGET: 'Target hours per day',
    DAY_LIMIT: 'Limit of hours per day',
    HOURS_SUFFIX: 'hours',
  },
  TASK_DIALOG: {
    ADD_TASK: 'Add task',
    VIEW_TASK: 'View task',
    EDIT_TASK: 'Edit task',
  },
  ERROR: {
    DAY_LIMIT_EXCEEDED: 'Cannot log more than {{ limit }} hours in a day (current: {{ current }}).',
  }
};

export default en;