import Deposit from 'components/Deposit'

export default function Deposits({ deposits }) {
  if (!deposits) return null

  return (
    <>
      {deposits.map((deposit, index) => (
        <Deposit key={index} deposit={deposit} />
      ))}
    </>
  )
}