interface AccountData {
  ip: string;
}

export class User {
  private accountData: AccountData;

  constructor(accountData: AccountData) {
    this.accountData = accountData;
  }

  get ip() {
    return this.accountData.ip;
  }
}
