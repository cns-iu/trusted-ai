CREATE MATERIALIZED VIEW profile_sec_sev_nem_prj_nat AS

SELECT a.soc_id, a.grouping, c.occ_type, a.title, c.occ_title, c.soc_nems_id, c.year, c.project_year, c.industry_title, 
	   c.employed, c.per_industry, c.per_occupation, c.employed_10, c.per_industry_10, c.per_occupation_10, c.emp_change_10, c.per_change_10
FROM public.occs_bls_nemsprj_nems_lookup AS a
	LEFT JOIN public.bls_nat_emp_matrix_projections AS c
	ON a.nems_prj_id_21 = c.soc_nems_id
WHERE c.naics_code = 'TE1000'
ORDER BY soc_id
;