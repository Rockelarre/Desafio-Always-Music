// Importar módulos necesarios
const { Client } = require('pg');

// Capturando argumentos por línea de comandos
const argumentos = process.argv.slice(2);

let arg_accion = argumentos[0];
let arg_1 = argumentos[1];
let arg_2 = argumentos[2];
let arg_3 = argumentos[3];
let arg_4 = argumentos[4];

// Objeto con información de configuración
const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'Always_Music',
    password: 'password',
    port: '5432',
};

// Nuevo objeto de la clase Client()
const client = new Client(config);

// Conexión a la base de datos
client.connect();

// Opción para ingresar un nuevo registro
if  (arg_accion == 'nuevo') {

    async function ingresar(nombre,rut,curso,nivel) {

        const res = await client.query(
            `INSERT INTO estudiantes (nombre,rut,curso,nivel)
            VALUES ('${nombre}','${rut}','${curso}','${nivel}')
            RETURNING *`
        );

        console.log(`El estudiante ${res.rows[0].nombre} agregado con éxito.`)

        client.end();
    }

    ingresar(arg_1,arg_2,arg_3,arg_4);
}

// Opción para mostrar un registro que coincida con el rut ingresado por comando
if (arg_accion == 'rut') {

    async function consulta_rut(rut) {

        const res = await client.query(
            `SELECT * FROM estudiantes WHERE rut = '${rut}'`
        );

        console.log(res.rows[0]);

        client.end();
    }

    consulta_rut(arg_1);
}

// Opción para mostrar todos los registros
if (arg_accion == 'consulta') {

    async function consultar_todos(){

        const res = await client.query( 
            `SELECT * FROM estudiantes`
        );

        console.log(res.rows);

        client.end();
    }

    consultar_todos();        
}

// Opción para editar un registro que coincida con el rut ingresado por comando
if (arg_accion == 'editar') {

    async function editar(nombre,rut,curso,nivel){

        const res = await client.query(
            `UPDATE estudiantes 
            SET nombre = '${nombre}', curso = '${curso}', nivel = '${nivel}' 
            WHERE rut = '${rut}' RETURNING *`
            );

        console.log(`El estudiante ${res.rows[0].nombre} editado con éxito.`)

        client.end();
    }

    editar(arg_1,arg_2,arg_3,arg_4);
}

// // Opción para eliminar un registro que coincida con el rut ingresado por comando
if (arg_accion == 'eliminar') {

    async function eliminar(rut) {

        const res = await client.query(
            `DELETE FROM estudiantes WHERE rut = '${rut}' RETURNING *`
        );

        console.log(`Registro de estudiante con rut ${res.rows[0].rut} eliminado.`)

        client.end();
    }

    eliminar(arg_1);
}