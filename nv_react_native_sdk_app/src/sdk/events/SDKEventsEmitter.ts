export type Listener<T> = (data: T) => void;

export class SDKEventsEmitter<T> {
  private listeners = new Set<Listener<T>>();

  subscribe(listener: Listener<T>): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  emit(data: T) {
    this.listeners.forEach(listener => listener(data));
  }

  clear() {
    this.listeners.clear();
  }
}

export default SDKEventsEmitter;

//type Listener<T> = (data: T) => void;

// class SDKEventsEmitter<T> {
//   private listeners = new Set<Listener<T>>();

//   subscribe(listener: Listener<T>): () => void {
//     this.listeners.add(listener);

//     return () => {
//       this.listeners.delete(listener);
//     };
//   }

//   emit(data: T) {
//     this.listeners.forEach(listener => listener(data));
//   }
// }

//export default SDKEventsEmitter;

// type Listener<T> = (data: T) => void;

// class SDKEventsEmitter<T> {
//   private listeners = new Set<Listener<T>>();

//   subscribe(listener: Listener<T>) {
//     this.listeners.add(listener);
//     return () => this.listeners.delete(listener);
//   }

//   emit(data: T) {
//     this.listeners.forEach(listener => listener(data));
//   }
// }

// export default SDKEventsEmitter;
