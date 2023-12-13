import ItemModel from "../models/Item";

interface IItemProps {
  item: ItemModel;
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
}

export default function Item({ item, onDeleteItem, onToggleItem }: IItemProps) {
  return (
    <li>
      <input type="checkbox" onChange={() => onToggleItem(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
