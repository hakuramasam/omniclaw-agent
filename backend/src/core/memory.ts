export class Memory {
  private logs: any[] = [];
  add(entry: any) { this.logs.push(entry); }
  getHistory() { return this.logs; }
}
