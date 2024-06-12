export type MenuItem = {
  label: string;
  routerLink?: string;
  onClick?: () => void;
  buttonStyleClass?: string;
};

export type MenuTemplateType = 'header' | 'content';
