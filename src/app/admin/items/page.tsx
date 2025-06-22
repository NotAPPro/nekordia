"use client";

import { useEffect, useState } from "react";
import { registerItem, getItems } from "./actions";

export default function AdminItemsPage() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(100);
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [items, setItems] = useState<{ name: string; price: number; description: string | null }[]>([]);

    useEffect(() => {
        getItems().then(setItems);
    }, []);

    const handleSubmit = async () => {
        const res = await registerItem(name, price, description);
        if (res.success && res.item) {
            setMessage(`✅ 登録完了：${res.item.name}`);
            setItems([...items, res.item]);
            setName("");
            setPrice(100);
            setDescription("");
        } else {
            setMessage(`❌ ${res.error}`);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">🛍 アイテム登録</h1>

            <div className="space-y-2">
                <label>
                    アイテム名：
                    <input className="ml-2 border px-2" value={name} onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    価格：
                    <input
                        className="ml-2 border px-2"
                        type="number"
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                    />
                </label>
                <label>
                    説明：
                    <input
                        className="ml-2 border px-2"
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </label>
                <button className="block mt-2 bg-blue-500 text-white px-4 py-1 rounded" onClick={handleSubmit}>
                    登録
                </button>
                {message && <p className="mt-2 text-green-600">{message}</p>}
            </div>

            <hr className="my-6" />

            <h2 className="font-bold">📦 登録済みアイテム一覧</h2>
            <ul className="mt-2 space-y-1">
                {items.map(item => (
                    <>
                        <li key={item.name}>
                            {item.name} - {item.price}Nek
                        </li>
                        <small className="text-gray-500">{item.description || "説明なし"}</small>
                    </>
                ))}
            </ul>
        </div>
    );
}
