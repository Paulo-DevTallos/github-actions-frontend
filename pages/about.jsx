import Link from "next/link";

export default function About() {
	return (
		<div className="app-container">
			<div className="content">
				<h1>
					Página. Sobre. <span>Ship</span>
				</h1>
			</div>
			<Link href="/">
				<a>Clique aqui para navegar</a>
			</Link>
		</div>
	);
}
