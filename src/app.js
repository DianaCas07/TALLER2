const express = require('express');
const app = express();
const port = 3000

app.use(express.json());

//Ejercicio 2:

// La ruta POST 
app.post('/api/cotizar-envio', (req, res) => {
    try {
        const { pais, peso } = req.body;

        if (!pais || peso === undefined) {
            throw new Error("Faltan parámetros requeridos. Debes enviar 'pais' y 'peso'.");
        }

        const resultado = calcularCosto(pais, peso);

        res.status(200).json(resultado);

    } catch (error) {
        res.status(400).json({
            error: true,
            mensaje: error.message
        });
    }
});
const tarifasPorPais = {
    elsalvador: 1.5,
    guatemala: 2.0,
    honduras: 2.25,
    nicaragua: 2.5,
    costarica: 3.0,
    panama: 3.5
};

const calcularCosto = (pais, peso) =>{

    //convertir el nombre de pais a minusculas y eliminamos espacios.
    const paisNormalizado = pais.toLowerCase().replace(/\s+/g, '');

    if(!tarifasPorPais[paisNormalizado]){
        throw new Error("El pais seleccionado, no es permitido. Paises permitidos: El Salvador, Guatemala, Honduras, Nicaragua, Costa Rica, Panama")
    }

    if(typeof peso!=='number' || peso <= 0){
        throw new Error("El peso no puede ser negativo o cero")
    }

    const tarifaPorKg = tarifasPorPais[paisNormalizado];
    const costoBase = peso * tarifaPorKg

    let descuento = 0;
    let recargo = 0;

    if (peso > 20) {
        descuento = costoBase * 0.10;
    } else if (peso < 1) {
        recargo = 5.00;
    }

    const total = (costoBase - descuento) + recargo;

    return {
        pais: paisNormalizado,
        peso: peso,
        tarifaPorKg: tarifaPorKg,
        costoBase: costoBase,
        descuento: descuento,
        recargo: recargo,
        total: total
    };
};

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});