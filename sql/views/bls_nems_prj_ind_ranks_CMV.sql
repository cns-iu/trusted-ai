-- View: public.bls_nem_prj_ind_ranks

--DROP MATERIALIZED VIEW IF EXISTS public.bls_nem_prj_ind_ranks CASCADE;

CREATE MATERIALIZED VIEW IF NOT EXISTS public.bls_nem_prj_ind_ranks
TABLESPACE pg_default
AS
 SELECT a.soc_id,
    c.soc_nems_id,
    a.title,
    c.occ_title,
    a."grouping",
    c.naics_code,
    c.industry_title,
    c.year,
    c.project_year,
    c.employed,
    c.per_industry,
    c.per_occupation,
    rank() OVER (PARTITION BY a.soc_id ORDER BY c.employed DESC) AS employed_rank,
    rank() OVER (PARTITION BY a.soc_id ORDER BY c.per_industry DESC) AS per_industry_rank,
    rank() OVER (PARTITION BY a.soc_id ORDER BY c.per_occupation DESC) AS per_occupation_rank,
    c.employed_10,
    c.per_industry_10,
    c.per_occupation_10,
    rank() OVER (PARTITION BY a.soc_id ORDER BY c.employed_10 DESC) AS employed_10_rank,
    rank() OVER (PARTITION BY a.soc_id ORDER BY c.per_industry_10 DESC) AS per_industry_10_rank,
    rank() OVER (PARTITION BY a.soc_id ORDER BY c.per_occupation_10 DESC) AS per_occupation_10_rank,
    c.emp_change_10,
    c.per_change_10,
    rank() OVER (PARTITION BY a.soc_id ORDER BY c.per_change_10 DESC) AS per_change_10_rank_gain,
    rank() OVER (PARTITION BY a.soc_id ORDER BY c.per_change_10) AS per_change_10_rank_loss,
    rank() OVER (PARTITION BY a.soc_id ORDER BY c.emp_change_10 DESC) AS emp_change_10_rank_gain,
    rank() OVER (PARTITION BY a.soc_id ORDER BY c.emp_change_10) AS emp_change_10_rank_loss
   FROM occs_bls_nemsprj_nems_lookup a
     LEFT JOIN bls_nat_emp_matrix_projections c ON a.nems_prj_id_21::text = c.soc_nems_id::text
  WHERE c.naics_code::text <> ALL (ARRAY['TE1000'::text, 'TE1100'::text, 'TE1200'::text])
  AND c.industry_type = 'Line item'
  ORDER BY a.soc_id
WITH DATA;

ALTER TABLE IF EXISTS public.bls_nem_prj_ind_ranks
    OWNER TO mginda;