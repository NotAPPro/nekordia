import { Metadata } from "next";
import Image from "next/image";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "ネコルディア国公式サイト",
};

const WebLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <header className="flex gap-4 items-center p-8 bg-slate-900 text-slate-50">
                <Image src="/flag.png" alt="国旗" width={300} height={195} className="w-24" />
                <p className="font-bold text-3xl">ネコルディア国</p>
            </header>
            <main className="p-4">{children}</main>
        </>
    );
};

export default WebLayout;
