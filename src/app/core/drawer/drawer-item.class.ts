export class DrawerItem {
  desc? = '';
  link? = '';
  icon: string;
  name: string;
  onClick?: () => void = () => () => { };
}
