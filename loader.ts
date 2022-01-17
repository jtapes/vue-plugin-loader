import Vue from 'vue';

class Loader {
  constructor(readonly startLoaderTime: number, readonly finishLoaderTime: number) {}
  private _startAnimate: boolean = false;
  private _finishAnimate: boolean = false;
  private _status : 'start' | 'finish' | 'loading' | ''
  onLoader: boolean = true;

  get status() {
    return this._status
  }

  get startAnimate() {
    return this._startAnimate
  }

  get finishAnimate() {
    return this._finishAnimate
  }

  startLoader: () => Promise<boolean> = () => {
    return new Promise<boolean>((resolve) => {
        if(!this.onLoader || this._startAnimate || this._finishAnimate) return false
      this._status = 'start'
        this._startAnimate = true;

        setTimeout(() => {
          this._startAnimate = false;
          this._status = 'loading'
          resolve(true);
        }, this.startLoaderTime);
      }
    );
  };
  finishLoader: () => Promise<boolean> = () => {
    return new Promise<boolean>((resolve) => {
        if(!this.onLoader || this._finishAnimate || this._startAnimate) return false

      this._status = 'finish'
        this._finishAnimate = true;
        // this._startAnimate = false
        setTimeout(() => {
          this._finishAnimate = false;
          this._status = ''
          resolve(true);
        }, this.finishLoaderTime);
      }
    );
  };
}


declare module 'vue/types/vue' {
  interface Vue {
    $loader: Loader;
  }
}

export default () => {
  const loader = new Loader(900, 2_000)
  Vue.prototype.$loader = Vue.observable(loader);
}
