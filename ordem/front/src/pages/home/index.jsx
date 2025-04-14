import React from "react";
import "./styles.css";

export function Home() {
    return (
        <main className="main-home">
            <div className="home-container">
                <h1 className="home-title">
                    📚 Painel de Professores
                </h1>
                <p className="home-subtitle">
                    Gerencie seus ambientes e cadastros de forma rápida e moderna.
                </p>

                <div className="home-buttons">
                    <button className="btn-home" onClick={() => window.location.href = "/ambientes"}>
                        Acessar Ambientes
                    </button>
                    <button className="btn-home" onClick={() => window.location.href = "/cadastrar"}>
                        Cadastrar Novo
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Home;
