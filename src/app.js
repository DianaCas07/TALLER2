const express = require('express');
const app = express();
const port = 3157;

app.get('/api/ivarenta/:monto', (req, res) =>{
    const monto = Number(req.params.monto);

    try {
        if (req.params.monto <0 || req.params.monto ==0)
    {
        return res.status(500).json({error: 'El salario debe ser un numero mayor a 0'})
    }	

const iva = monto * 0.13;
const renta = monto * 0.10;
const resObj = {
	montoOriginal: monto,
ivaCalculado: iva,
rentaCalculada: renta,	
};

res.json(resObj);
} catch(error){
	res.status(500).json({error: 'Salario invalid o suceido un error en el calculo'});
}

});

app.listen(port, () =>{
	console.log(`Servidor escuchando en http://localhost:${port}`);
});

