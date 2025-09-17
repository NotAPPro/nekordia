import Link from "next/link";

const Home = () => {
    return (
        <>
            <h2 className="text-4xl text-center">ネコルディア国公式サイト</h2>
            <p>
                ここは、Scratch仮想国「
                <Link
                    href="https://scratch.mit.edu/studios/50590180"
                    className="text-blue-500 hover:text-blue-600 transition"
                    target="_blank">
                    ネコルディア国
                </Link>
                」の公式サイトです。
            </p>
        </>
    );
};

export default Home;
