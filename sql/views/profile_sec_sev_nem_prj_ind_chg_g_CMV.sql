CREATE MATERIALIZED VIEW profile_sec_sev_nem_prj_ind_chg_g AS
SELECT soc_id, soc_nems_id, title, occ_title, "grouping", naics_code, industry_title, 
	   year, project_year, 
	   employed, per_industry, per_occupation, 
	   employed_10, per_industry_10, per_occupation_10, 
	   emp_change_10, per_change_10, 
	   per_change_10_rank_gain, emp_change_10_rank_gain,
	   change_gain_rank_avg, change_emp_gain_avg_rank
FROM public.bls_nem_prj_ind_ranks_meta
WHERE change_emp_gain_avg_rank <= 15
ORDER BY soc_id, change_emp_gain_avg_rank;