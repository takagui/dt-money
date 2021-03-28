import {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import { api } from './services/api';

interface ITransaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TTransactionInput = Pick<
  ITransaction,
  'title' |
  'amount' |
  'type' |
  'category'
>;

interface ITransactionsContextData {
  transactions: ITransaction[];
  createTransaction: ( transaction: TTransactionInput ) => void;
}
interface ITransactionProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext<ITransactionsContextData>(
  {} as ITransactionsContextData
);

export function TransactionsProvider({ children }: ITransactionProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    api.get('/transactions')
      .then(response => setTransactions(response.data.transactions));
  }, []);

  function createTransaction(transaction: TTransactionInput) {
    api.post('/transactions', transaction);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}