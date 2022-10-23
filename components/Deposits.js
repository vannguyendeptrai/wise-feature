import Deposit from 'components/Deposit'

export default function Deposits({ deposits }) {
  if (!deposits) return null

  return (
    <>
      {deposits.map((deposit, index) => (
        <>
          <li class="mb-10 ml-6">
            <Deposit key={index} deposit={deposit} />
          </li>
        </>
      ))}
    </>
  )
}