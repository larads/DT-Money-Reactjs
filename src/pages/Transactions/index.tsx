import { useContextSelector } from 'use-context-selector'

import { Header } from "../../components/Header.tsx"
import { Summary } from "../../components/Summary/index.tsx";
import { SearchForm } from "../../components/SearchForm/index.tsx";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map(transaction => {
                return (
                  <tr key={transaction.id}>
                    <td width="50%">{transaction.description}</td>
                    <td>
                      <PriceHighlight variant={transaction.type}>
                        {transaction.type === 'outcome' && '- '}
                        {priceFormatter.format(transaction.price)}
                      </PriceHighlight>
                    </td>
                      <td>{transaction.category}</td>
                      <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                    </tr>
                )
              })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}