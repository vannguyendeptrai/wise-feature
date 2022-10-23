import Deposit from "components/Deposit";

export default function Deposits({ deposits }) {
  if (!deposits) return null;
  console.log("deposits", deposits);

  return (
    <>
      {deposits.map((deposit, index) => (
        <li key={index} class="mb-10 ml-6">
          <Deposit key={index} deposit={deposit} />
        </li>
      ))}
    </>
  );
}
