// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Crp extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Crp entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Crp must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Crp", id.toString(), this);
    }
  }

  static load(id: string): Crp | null {
    return changetype<Crp | null>(store.get("Crp", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get creator(): string {
    let value = this.get("creator");
    return value!.toString();
  }

  set creator(value: string) {
    this.set("creator", Value.fromString(value));
  }
}

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type User must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("User", id.toString(), this);
    }
  }

  static load(id: string): User | null {
    return changetype<User | null>(store.get("User", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get crps(): Array<string> | null {
    let value = this.get("crps");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set crps(value: Array<string> | null) {
    if (!value) {
      this.unset("crps");
    } else {
      this.set("crps", Value.fromStringArray(<Array<string>>value));
    }
  }
}
