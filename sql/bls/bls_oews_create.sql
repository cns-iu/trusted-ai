CREATE TABLE IF NOT EXISTS public.bls_oews_st
(
    onid numeric NOT NULL,
    year integer,
    area numeric,
    area_title text COLLATE pg_catalog."default",
	area_type text COLLATE pg_catalog."default",
    prim_state text COLLATE pg_catalog."default",
    naics text COLLATE pg_catalog."default",
    naics_title text COLLATE pg_catalog."default",
    i_group text COLLATE pg_catalog."default",
    own_code numeric,
    soc_id_nems text COLLATE pg_catalog."default",
    title text COLLATE pg_catalog."default",
    o_group text COLLATE pg_catalog."default",
    tot_emp numeric,
    emp_prse numeric,
    jobs_1000 numeric,
    loc_quotiant numeric,
    pct_total numeric,
    pct_rpt numeric,
    h_mean numeric,
    a_mean numeric,
    mean_prse numeric,
    h_pct10 numeric,
    h_pct25 numeric,
    h_median numeric,
    h_pct75 numeric,
    h_pct90 numeric,
    a_pct10 numeric,
    a_pct25 numeric,
    a_median numeric,
    a_pct75 numeric,
    a_pct90 numeric,
    annual boolean,
    hourly boolean,
    dstar_up boolean,
    star_up boolean,
    pound_up boolean,
    CONSTRAINT bls_oews_st_pkey PRIMARY KEY (onid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.bls_oews_st
OWNER to mginda;

CREATE TABLE IF NOT EXISTS public.bls_oews_ind
(
    onid numeric NOT NULL,
    year integer,
    area numeric,
    area_title text COLLATE pg_catalog."default",
	area_type text COLLATE pg_catalog."default",
    prim_state text COLLATE pg_catalog."default",
    naics text COLLATE pg_catalog."default",
    naics_title text COLLATE pg_catalog."default",
    i_group text COLLATE pg_catalog."default",
    own_code numeric,
    soc_id_nems text COLLATE pg_catalog."default",
    title text COLLATE pg_catalog."default",
    o_group text COLLATE pg_catalog."default",
    tot_emp numeric,
    emp_prse numeric,
    jobs_1000 numeric,
    loc_quotiant numeric,
    pct_total numeric,
    pct_rpt numeric,
    h_mean numeric,
    a_mean numeric,
    mean_prse numeric,
    h_pct10 numeric,
    h_pct25 numeric,
    h_median numeric,
    h_pct75 numeric,
    h_pct90 numeric,
    a_pct10 numeric,
    a_pct25 numeric,
    a_median numeric,
    a_pct75 numeric,
    a_pct90 numeric,
    annual boolean,
    hourly boolean,
    dstar_up boolean,
    star_up boolean,
    pound_up boolean,
    CONSTRAINT bls_oews_ind_pkey PRIMARY KEY (onid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.bls_oews_ind
OWNER to mginda;

CREATE TABLE IF NOT EXISTS public.bls_oews_nat
(
    onid numeric NOT NULL,
    year integer,
    area numeric,
    area_title text COLLATE pg_catalog."default",
	area_type text COLLATE pg_catalog."default",
    prim_state text COLLATE pg_catalog."default",
    naics text COLLATE pg_catalog."default",
    naics_title text COLLATE pg_catalog."default",
    i_group text COLLATE pg_catalog."default",
    own_code numeric,
    soc_id_nems text COLLATE pg_catalog."default",
    title text COLLATE pg_catalog."default",
    o_group text COLLATE pg_catalog."default",
    tot_emp numeric,
    emp_prse numeric,
    jobs_1000 numeric,
    loc_quotiant numeric,
    pct_total numeric,
    pct_rpt numeric,
    h_mean numeric,
    a_mean numeric,
    mean_prse numeric,
    h_pct10 numeric,
    h_pct25 numeric,
    h_median numeric,
    h_pct75 numeric,
    h_pct90 numeric,
    a_pct10 numeric,
    a_pct25 numeric,
    a_median numeric,
    a_pct75 numeric,
    a_pct90 numeric,
    annual boolean,
    hourly boolean,
    dstar_up boolean,
    star_up boolean,
    pound_up boolean,
    CONSTRAINT bls_oews_nat_pkey PRIMARY KEY (onid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.bls_oews_nat
OWNER to mginda;