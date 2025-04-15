import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export function Home() {
    return (
        <main className="main-home">
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">📚 Painel de Professores</h1>
                    <p className="hero-subtitle">
                        Gerencie seus ambientes e cadastros de forma rápida e moderna.
                    </p>
                    <div className="button-group">
                        <Link to="/ambientes" className="btn-home">Ambientes</Link>
                        <Link to="/patrimonios" className="btn-home">Patrimônios</Link>
                        <Link to="/gestores" className="btn-home">Gestores</Link>
                        <Link to="/manutentores" className="btn-home">Manutentores</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;
