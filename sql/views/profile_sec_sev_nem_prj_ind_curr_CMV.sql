CREATE MATERIALIZED VIEW profile_sec_sev_nem_prj_ind_curr AS
SELECT soc_id, soc_nems_id, title, occ_title, "grouping", naics_code, industry_title, 
	   year, project_year, 
	   employed, per_industry, per_occupation, 
	   employed_10, per_industry_10, per_occupation_10, 
	   emp_change_10, per_change_10, 
	   employed_rank, per_industry_rank, per_occupation_rank, 
	   curr_rank_avg, curr_emp_avg_rank
FROM public.bls_nem_prj_ind_ranks_meta
WHERE curr_emp_avg_rank <= 15
ORDER BY soc_id, curr_emp_avg_rank;