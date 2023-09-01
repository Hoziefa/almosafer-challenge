import { makeAutoObservable } from 'mobx';

export default class AppStore {
  showSnackbar = false;

  duration?: number = 2000;

  message = '';

  constructor() {
    makeAutoObservable(this);
  }

  onOpen = (message: string, duration?: number) => {
    this.showSnackbar = true;
    this.message = message;
    this.duration ??= duration;
  };

  onClose = () => {
    this.showSnackbar = false;
  };
}
