import Link from "next/link";

export default function Home() {
	return (
		<div className="app-container">
			<div className="content">
				<h1>
					Develop. Preview. <span>Ship</span>
				</h1>
			</div>
			<Link href="/about.html">
				<a>Clique aqui para navegar</a>
			</Link>
		</div>
	);
}
