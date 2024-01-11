export default abstract class ActionBase<T = void, P = void> {
  protected readonly _type: T;
  protected readonly _payload: P;

  constructor(type: T, payload: P) {
    this._type = type;
    this._payload = payload;
  }
  public abstract get type(): T;
  public abstract get payload(): P;
}
