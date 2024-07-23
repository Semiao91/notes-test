import {Button} from "./Button.jsx";

export const Form = ({onSubmit, setNewName, setNewNumber, newNumber, newName}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)}/>
        </div>
        <Button type='submit' label='add'/>
      </form>
    </>
  )
}