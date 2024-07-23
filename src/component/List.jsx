import {Button} from "./Button.jsx";

export const List = ({content, number, onDelete}) => {
  return (
    <>
      <p>{content} {number}</p>
      <Button label="delete" type="submit" onClick={onDelete} />
    </>
  )
}