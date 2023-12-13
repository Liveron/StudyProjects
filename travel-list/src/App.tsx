import { useState } from "react";
import ItemModel from "./models/Item";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

export default function App() {
  const [items, setItems] = useState<ItemModel[]>([]);

  function handleAddItems(item: ItemModel) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id: number) {
    setItems((items) => items.filter((x) => x.id !== id));
  }

  function handleToggleItem(id: number) {
    setItems((items) =>
      items.map((x) => (x.id === id ? { ...x, packed: !x.packed } : x))
    );
  }

  function handleClearItems() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}
