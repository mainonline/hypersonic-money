export class Slot {
  private readonly value: bigint;

  private constructor(value: bigint) {
    this.value = value;
  }

  static fromString(slotString: string): Slot {
    return new Slot(BigInt(slotString));
  }

  static fromBigInt(value: bigint): Slot {
    return new Slot(value);
  }

  static get GENESIS(): Slot {
    return new Slot(BigInt(0));
  }

  add(other: number): Slot {
    return new Slot(this.value + BigInt(other));
  }

  lessThan(other: Slot): boolean {
    return this.value < other.value;
  }

  greaterThan(other: Slot): boolean {
    return this.value > other.value;
  }

  lessThanOrEqual(other: Slot): boolean {
    return this.value <= other.value;
  }

  toString(): string {
    return this.value.toString();
  }
}