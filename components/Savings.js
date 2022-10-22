import Saving from 'components/Saving'

export default function Savings({ savings }) {
  if (!savings) return null

  return (
    <>
      {savings.map((saving, index) => (
        <Saving key={index} saving={saving} />
      ))}
    </>
  )
}