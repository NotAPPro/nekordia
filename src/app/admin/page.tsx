"use client";

import { useEffect, useState } from "react";
import { getAllUsers, registerUser } from "./actions";

export default function AdminPage() {
    const [username, setUsername] = useState("");
    const [nek, setNek] = useState(0);
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState<{ username: string; nek: number; createdAt: string }[]>([]);

    const handleSubmit = async () => {
        const res = await registerUser(username, nek);
        setMessage(res?.message || "登録完了！");
    };

    useEffect(() => {
        getAllUsers().then(setUsers);
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">👑 ネコルディア 管理者ページ</h1>

            <div className="space-y-2 flex flex-col">
                <label>
                    ユーザー名:
                    <input className="ml-2 border px-2" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    初期Nek:
                    <input
                        className="ml-2 border px-2"
                        type="number"
                        value={nek}
                        onChange={e => setNek(Number(e.target.value))}
                    />
                </label>
                <button className="block mt-2 bg-blue-500 text-white px-4 py-1 rounded" onClick={handleSubmit}>
                    登録・更新する
                </button>
                {message && <p className="mt-2 text-green-600">{message}</p>}
                <h2 className="mt-6 font-bold">🧑‍🤝‍🧑 登録済みの国民</h2>
                <ul className="mt-2 space-y-1">
                    {users.map(user => (
                        <li key={user.username}>
                            {user.username} - {user.nek}Nek（{new Date(user.createdAt).toLocaleDateString()} 登録）
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
