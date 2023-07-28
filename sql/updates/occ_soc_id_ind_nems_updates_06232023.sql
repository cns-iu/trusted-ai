CREATE TABLE IF NOT EXISTS public.occs_bls_ind_nems_lookup
(
    soc_id character varying COLLATE pg_catalog."default" NOT NULL,
    "grouping" character varying COLLATE pg_catalog."default",
    title text COLLATE pg_catalog."default",
    nems_ind_id_18 character varying COLLATE pg_catalog."default",
    nems_ind_id_19 character varying COLLATE pg_catalog."default",
    nems_ind_id_20 character varying COLLATE pg_catalog."default",
    nems_ind_id_21 character varying COLLATE pg_catalog."default",
    nems_ind_id_22 character varying COLLATE pg_catalog."default",
    note text COLLATE pg_catalog."default",
    CONSTRAINT occs_bls_ind_nems_lookup_pkey PRIMARY KEY (soc_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.occs_bls_ind_nems_lookup
    OWNER to mginda;

GRANT ALL ON TABLE public.occs_bls_ind_nems_lookup TO gallantm WITH GRANT OPTION;

GRANT ALL ON TABLE public.occs_bls_ind_nems_lookup TO mginda;

GRANT ALL ON TABLE public.occs_bls_ind_nems_lookup TO edlu WITH GRANT OPTION;

GRANT ALL ON TABLE public.occs_bls_ind_nems_lookup TO bherr WITH GRANT OPTION;