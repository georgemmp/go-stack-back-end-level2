import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string,
  value: number,
  type: 'income' | 'outcome',
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeList = this.transactions.map(item => {
      if (item.type === 'income') {
        return item.value;
      }
    }).filter(item => item);;

    const outcomeList = this.transactions.map(item => {
      if (item.type === 'outcome') {
        return item.value;
      }
    }).filter(item => item);

    const income: number = Number(incomeList.reduce((a, b) => Number(a) + Number(b), 0));
    const outcome: number = Number(outcomeList.reduce((a, b) => Number(a) + Number(b), 0));

    const total = Number(income) - Number(outcome);

    const balance = {
      income,
      outcome,
      total,
    }

    return balance;
  }

  public create({title, value, type}: TransactionDTO): Transaction {
    const transaction = new Transaction({title, value, type});

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
