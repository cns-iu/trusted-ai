CREATE MATERIALIZED VIEW bls_nem_prj_ind_ranks_meta AS
SELECT soc_id, soc_nems_id, title, occ_title, "grouping", naics_code, industry_title, 
	   year, project_year, 
	   employed, per_industry, per_occupation, 
	   employed_rank, per_industry_rank, per_occupation_rank, 
	   curr_rank_avg,
	   rank() OVER (PARTITION BY soc_id ORDER BY curr_rank_avg) AS curr_emp_avg_rank,
	   employed_10, per_industry_10, per_occupation_10, 
	   employed_10_rank, per_industry_10_rank, per_occupation_10_rank, 
	   prj_rank_avg, 
	   rank() OVER (PARTITION BY soc_id ORDER BY prj_rank_avg) AS proj_emp_avg_rank,
	   emp_change_10, per_change_10, 
	   per_change_10_rank_gain, emp_change_10_rank_gain, 
	   change_gain_rank_avg, 
	   rank() OVER (PARTITION BY soc_id ORDER BY change_gain_rank_avg) AS change_emp_gain_avg_rank,
	   per_change_10_rank_loss, emp_change_10_rank_loss, 
	   change_loss_rank_avg,
	   rank() OVER (PARTITION BY soc_id ORDER BY change_loss_rank_avg) AS change_emp_loss_avg_rank
FROM public.bls_nem_prj_ind_ranks_avgs;