const schema = 'public';
const tableName = 'restaurants';

const checkTableExists = (databaseClient) => {
	const checkExistsQuery = `SELECT EXISTS (
		SELECT 1 
		FROM   pg_catalog.pg_class c
		JOIN   pg_catalog.pg_namespace n ON n.oid = c.relnamespace
		WHERE  n.nspname = '${schema}'
		AND    c.relname = '${tableName}'
		);`;
	return databaseClient.query(checkExistsQuery);
};

const createTable = (databaseClient) => {
	const createQuery = `CREATE TABLE ${schema}.${tableName}
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
	
	ALTER TABLE ${schema}.${tableName}
		OWNER to postgres;`
	return databaseClient.query(createQuery);
};

module.exports = {
	checkTableExists
};
