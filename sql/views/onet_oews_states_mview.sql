CREATE MATERIALIZED VIEW profile_sec_five_st_sal AS

SELECT c.soc_id, a.soc_id_nems, a.title, a.year, a.area_title AS place_name, a.prim_state AS state_code,  
       a.tot_emp, a.emp_prse, a.jobs_1000, a.loc_quotiant, a.h_mean, a.a_mean, a.mean_prse, 
	   a.h_pct10, a.h_pct25, a.h_median, a.h_pct75, a.h_pct90, 
	   a.a_pct10, a.a_pct25, a.a_median, a.a_pct75, a.a_pct90, a.annual, a.hourly
	FROM public.bls_oews_st AS a
	LEFT JOIN public.occs AS c
	ON c.soc_nems_id = a.soc_id_nems
 WHERE  o_group = 'detailed'
 AND   c.title IS NOT NULL

UNION

SELECT c.soc_id, a.soc_id_nems, a.title, a.year, a.area_title AS place_name, a.prim_state AS state_code,  
       a.tot_emp, a.emp_prse, a.jobs_1000, a.loc_quotiant, a.h_mean, a.a_mean, a.mean_prse, 
	   a.h_pct10, a.h_pct25, a.h_median, a.h_pct75, a.h_pct90, 
	   a.a_pct10, a.a_pct25, a.a_median, a.a_pct75, a.a_pct90, a.annual, a.hourly
	FROM public.bls_oews_st AS a
	LEFT JOIN public.occs AS c
	ON c.soc_nems_id_2 = a.soc_id_nems
 WHERE  o_group = 'detailed'
 AND   c.title IS NOT NULL
 
UNION

SELECT c.soc_id, a.soc_id_nems, a.title, a.year, a.area_title AS place_name, a.prim_state AS state_code, 
       a.tot_emp, a.emp_prse, a.jobs_1000, a.loc_quotiant, a.h_mean, a.a_mean, a.mean_prse, 
	   a.h_pct10, a.h_pct25, a.h_median, a.h_pct75, a.h_pct90, 
	   a.a_pct10, a.a_pct25, a.a_median, a.a_pct75, a.a_pct90, a.annual, a.hourly
	FROM public.bls_oews_st AS a
	LEFT JOIN public.occs AS c
	ON c.soc_nems_id_3 = a.soc_id_nems
 WHERE  o_group = 'detailed'
 AND   c.title IS NOT NULL
 
 ORDER BY soc_id, place_name, year
 ;