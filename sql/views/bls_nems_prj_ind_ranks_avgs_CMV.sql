CREATE MATERIALIZED VIEW bls_nem_prj_ind_ranks_avgs AS
SELECT soc_id, soc_nems_id, title, occ_title, "grouping", naics_code, industry_title, 
       year, project_year, 
	   employed, per_industry, per_occupation, 
	   employed_rank, per_industry_rank, per_occupation_rank,
	   (employed_rank + per_industry_rank + per_occupation_rank)/3 AS curr_rank_avg,
	   employed_10, per_industry_10, per_occupation_10, 
	   employed_10_rank, per_industry_10_rank, per_occupation_10_rank, 
	   (employed_10_rank + per_industry_10_rank + per_occupation_10_rank)/3 AS prj_rank_avg,
	   emp_change_10, per_change_10, 
	   per_change_10_rank_gain, emp_change_10_rank_gain,
	   (per_change_10_rank_gain + emp_change_10_rank_gain)/2 AS change_gain_rank_avg,
	   per_change_10_rank_loss, emp_change_10_rank_loss,
	   (per_change_10_rank_loss + emp_change_10_rank_loss)/2 AS change_loss_rank_avg
	FROM public.bls_nem_prj_ind_ranks;