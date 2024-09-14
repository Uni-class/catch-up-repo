export class BiMap<L = any, R = any> {
  private leftToRight: Map<L, R>;
  private rightToLeft: Map<R, L>;
  constructor() {
    this.leftToRight = new Map<L, R>();
    this.rightToLeft = new Map<R, L>();
  }

  set(left: L, right: R): void {
    const prevRight = this.getByLeft(left);
    const prevLeft = this.getByRight(right);
    if (prevRight !== undefined) {
      this.deleteByRight(prevRight);
    }
    if (prevLeft !== undefined) {
      this.deleteByLeft(prevLeft);
    }
    this.leftToRight.set(left, right);
    this.rightToLeft.set(right, left);
  }
  getByLeft(left: L): R | undefined {
    return this.leftToRight.get(left);
  }
  getByRight(right: R): L | undefined {
    return this.rightToLeft.get(right);
  }
  deleteByLeft(left: L): void {
    const right = this.getByLeft(left);
    this.leftToRight.delete(left);
    this.rightToLeft.delete(right);
  }
  deleteByRight(right: R): void {
    const left = this.getByRight(right);
    this.rightToLeft.delete(right);
    this.leftToRight.delete(left);
  }

  hasByLeft(left: L): boolean {
    return this.leftToRight.has(left);
  }
  hasByRight(right: R): boolean {
    return this.rightToLeft.has(right);
  }
}
