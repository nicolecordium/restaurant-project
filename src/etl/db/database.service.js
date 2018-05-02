const createTable = (databaseClient) => {
	const createQuery = `
	DROP TABLE public.restaurants;
	
	CREATE TABLE public.restaurants
	(
		id bigint NOT NULL,
		name text COLLATE pg_catalog."default",
		address text COLLATE pg_catalog."default",
		boro text COLLATE pg_catalog."default",
		zipcode text COLLATE pg_catalog."default",
		cuisine text COLLATE pg_catalog."default",
		grade "char",
		grade_date date,
		CONSTRAINT restaurants_pkey PRIMARY KEY (id)
	)
	WITH (
		OIDS = FALSE
	)
	TABLESPACE pg_default;
	
	ALTER TABLE public.restaurants
		OWNER to postgres;`
	return databaseClient.query(createQuery);
};

module.exports = {
	createTable
};
