import { useContext, useState, FormEvent } from 'react';
import Modal from 'react-modal';

import { TransactionsContext } from '../../TransactionsContext';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import {
  Container,
  TransactionTypeContainer,
  RadioBox,
} from './styles';

interface INewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: INewTransactionModalProps) {
  const { createTransaction } = useContext(TransactionsContext);

  const [transactionTitle, setTransactionTitle] = useState('');
  const [transactionValue, setTransactionValue] = useState(0);
  const [transactionType, setTransactionType] = useState('deposit');
  const [transactionCategory, setTransactionCategory] = useState('');

  function resetInputValue() {
    setTransactionTitle('');
    setTransactionValue(0);
    setTransactionType('deposit');
    setTransactionCategory('');
  }

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title: transactionTitle,
      amount: transactionValue,
      type: transactionType,
      category: transactionCategory,
    });

    resetInputValue();
    onRequestClose();
  }

  return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
        >
          <img src={closeImg} alt="Fechar modal"/>
        </button>

        <Container onSubmit={handleCreateNewTransaction}>
          <h2>Cadastrar transação</h2>

          <input
            type="text"
            placeholder="Título"
            value={transactionTitle}
            onChange={event => setTransactionTitle(event.target.value)}
          />

          <input
            type="number"
            placeholder="Valor"
            value={transactionValue}
            onChange={event =>
              setTransactionValue(Number(event.target.value))
            }
          />

          <TransactionTypeContainer>
            <RadioBox
              type="button"
              onClick={() => { setTransactionType('deposit'); }}
              isActive={transactionType === 'deposit'}
              activeColor="green"
            >
              <img src={incomeImg} alt="Entrada"/>
              <span>Entrada</span>
            </RadioBox>

            <RadioBox
              type="button"
              onClick={() => { setTransactionType('withdraw'); }}
              isActive={transactionType === 'withdraw'}
              activeColor="red"
            >
              <img src={outcomeImg} alt="Saída"/>
              <span>Saída</span>
            </RadioBox>
          </TransactionTypeContainer>

          <input
            type="text"
            placeholder="Categoria"
            value={transactionCategory}
            onChange={event => setTransactionCategory(event.target.value)}
          />

          <button type="submit">Cadastrar</button>
        </Container>
      </Modal>
  );
}
