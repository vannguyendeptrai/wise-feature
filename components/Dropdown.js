export default function Dropdown({ choices }){
    if(!choices) return null
    
    return (
        <>
            <select label="Select options">
            {choices.map((choice) => (
                <option>choice</option>
            ))}
            </select>
        </>
    )
}