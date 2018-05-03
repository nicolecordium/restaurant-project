const createTable = (databaseClient) => {
	const createQuery = `
	DROP TABLE IF EXISTS public.restaurants;
	
	CREATE TABLE public.restaurants
	(
		id bigint NOT NULL,
		name text COLLATE pg_catalog."default",
		address text COLLATE pg_catalog."default",
		boro text COLLATE pg_catalog."default",
		zipcode text COLLATE pg_catalog."default",
		grade "char",
		latitude numeric(10, 8),
		longitude numeric(10, 8),
		CONSTRAINT restaurants_pkey PRIMARY KEY (id)
	)
	WITH (
		OIDS = FALSE
	)
	TABLESPACE pg_default;`
	return databaseClient.query(createQuery);
};

const readTable = (databaseClient) => {
	const readQuery = `SELECT 
		id,
		address,
		boro,
		zipcode
	FROM public.restaurants`
	return databaseClient.query(readQuery);
};

const updateLocation = (databaseClient, data) => {
	const readQuery = `UPDATE public.restaurants 
		SET
			latitude = $1::numeric(10,8),
			longitude = $2::numeric(10,8)
		WHERE 
			id = $3::bigint`
	return databaseClient.query(readQuery, [
		data.latitude,
		data.longitude,
		data.id
	]);
};

module.exports = {
	createTable,
	readTable,
	updateLocation
};
