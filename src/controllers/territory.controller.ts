import { Request, Response } from 'express';
import { pool as db } from '../../common/database/database'
import { QueryResult } from 'pg';


export const getAllPaises = async (req: Request, res: Response): Promise<Response> => {
    try {
        const paises: QueryResult = await db.query('SELECT * FROM paises');
        return res.status(200).send({ data: paises.rows });
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
};

export const getPaisById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const pais: QueryResult = await db.query('SELECT * FROM paises WHERE pais_id = $1', [Number(req.params.paisId)]);
        if (pais.rowCount > 0) {
            return res.status(200).send({ data: pais.rows[0] });
        } else {
            return res.status(404).send({ message: 'Pais not found' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};

export const getAllProvincias = async (req: Request, res: Response): Promise<Response> => {
    try {
        const provincias: QueryResult = await db.query('SELECT * FROM provincias');
        return res.status(200).send({ data: provincias.rows });
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
};

export const getProvinciaById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const provincia: QueryResult = await db.query('SELECT * FROM provincias WHERE provincia_id = $1', [Number(req.params.provinciaId)]);
        if (provincia.rowCount > 0) {
            return res.status(200).send({ data: provincia.rows[0] });
        } else {
            return res.status(404).send({ message: 'Provincia not found' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};

export const getAllMunicipios = async (req: Request, res: Response): Promise<Response> => {
    try {
        const municipios: QueryResult = await db.query('SELECT * FROM municipios');
        return res.status(200).send({ data: municipios.rows });
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
};

export const getMunicipioById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const municipio: QueryResult = await db.query('SELECT * FROM municipios WHERE municipio_id = $1', [Number(req.params.municipioId)]);
        if (municipio.rowCount > 0) {
            return res.status(200).send({ data: municipio.rows[0] });
        } else {
            return res.status(404).send({ message: 'Municipio not found' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};

export const getAllDistritos = async (req: Request, res: Response): Promise<Response> => {
    try {
        const distritos: QueryResult = await db.query('SELECT * FROM distritos');
        return res.status(200).send({ data: distritos.rows });
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
};

export const getDistritoById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const distrito: QueryResult = await db.query('SELECT * FROM distritos WHERE distrito_id = $1', [Number(req.params.distritoId)]);
        if (distrito.rowCount > 0) {
            return res.status(200).send({ data: distrito.rows[0] });
        } else {
            return res.status(404).send({ message: 'Distrito not found' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};
