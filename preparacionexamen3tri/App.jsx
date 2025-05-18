import React, { useState, useEffect } from 'react';
import './sevici.css'; // Asegúrate de que este archivo esté en la misma carpeta

export default function App() {
    let [stations, setStations] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStations() {
            try {
                let response = await fetch('http://api.citybik.es/sevici.json');
                let data = await response.json();
                setStations(data);
            } catch (error) {
                console.error('Error fetching station data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchStations();
    }, []);

    let totalBikes = stations.reduce((sum, station) => sum + station.bikes, 0);
    let totalFree = stations.reduce((sum, station) => sum + station.free, 0);
    return (
        <div className="container">
            <h1>Información de Sevici</h1>
            <div className="buttons">
                <button onClick={() => alert(`Total de estaciones: ${totalStations}`)}>Calcular número de estaciones disponibles</button>
                <button onClick={() => alert(`Total de bicicletas disponibles: ${totalBikes}`)}>Mostrar total de bicicletas</button>
                <button onClick={() => alert(`Total de sitios libres: ${totalFree}`)}>Mostrar total de sitios libres</button>
            </div>
            {loading ? <p>Cargando...</p> : null}
        </div>
    );
}
