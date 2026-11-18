export type Listener<T> = (data: T) => void;

export class SDKEventsEmitter<T> {
  private listeners = new Set<Listener<T>>();
  private lastValue: T | undefined;
  private hasLastValue = false;
  private readonly replayLastOnSubscribe: boolean;
  private readonly cacheLastOnlyWhenNoListeners: boolean;

  constructor(options?: {
    replayLastOnSubscribe?: boolean;
    cacheLastOnlyWhenNoListeners?: boolean;
  }) {
    this.replayLastOnSubscribe = options?.replayLastOnSubscribe ?? false;
    this.cacheLastOnlyWhenNoListeners =
      options?.cacheLastOnlyWhenNoListeners ?? false;
  }

  subscribe(
    listener: Listener<T>,
    options?: { replayLast?: boolean; consumeLast?: boolean },
  ): () => void {
    this.listeners.add(listener);
    const shouldReplay =
      options?.replayLast ?? this.replayLastOnSubscribe ?? false;
    if (shouldReplay && this.hasLastValue) {
      listener(this.lastValue as T);
      if (options?.consumeLast) {
        this.lastValue = undefined;
        this.hasLastValue = false;
      }
    }

    return () => {
      this.listeners.delete(listener);
    };
  }

  emit(data: T) {
    if (this.cacheLastOnlyWhenNoListeners && this.listeners.size > 0) {
      this.lastValue = undefined;
      this.hasLastValue = false;
    } else {
      this.lastValue = data;
      this.hasLastValue = true;
    }
    this.listeners.forEach(listener => listener(data));
  }

  clear() {
    this.listeners.clear();
    this.lastValue = undefined;
    this.hasLastValue = false;
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
