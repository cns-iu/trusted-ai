CREATE MATERIALIZED VIEW profile_sec_five_oews_ind AS
SELECT c.soc_id, a.soc_id_nems, a.title, a.year, a.area_title AS place_name, a.prim_state AS state_code, a.naics, a.naics_title AS industry_name,
     RANK() OVER(PARTITION BY c.soc_id ORDER BY a.tot_emp DESC) AS ann_emp_rank, a.tot_emp, a.emp_prse, a.jobs_1000, a.loc_quotiant,
	 a.h_mean, a.a_mean, a.mean_prse, a.h_pct10, a.h_pct25, a.h_median, a.h_pct75, a.h_pct90, 
	 a.a_pct10, a.a_pct25, a.a_median, a.a_pct75, a.a_pct90, a.annual, a.hourly
FROM bls_oews_ind AS a
LEFT JOIN occs_bls_ind_nems_lookup AS c 
ON c.nems_ind_id_18 = a.soc_id_nems
WHERE a.o_group = 'detailed'::text
AND a.year = 2018
AND a.tot_emp IS NOT NULL
AND c.title IS NOT NULL

UNION 

SELECT c.soc_id, a.soc_id_nems, a.title, a.year, a.area_title AS place_name, a.prim_state AS state_code, a.naics, a.naics_title AS industry_name,
     RANK() OVER(PARTITION BY c.soc_id ORDER BY a.tot_emp DESC) AS ann_emp_rank, a.tot_emp, a.emp_prse, a.jobs_1000, a.loc_quotiant,
	 a.h_mean, a.a_mean, a.mean_prse, a.h_pct10, a.h_pct25, a.h_median, a.h_pct75, a.h_pct90, 
	 a.a_pct10, a.a_pct25, a.a_median, a.a_pct75, a.a_pct90, a.annual, a.hourly
FROM bls_oews_ind AS a
LEFT JOIN occs_bls_ind_nems_lookup AS c 
ON c.nems_ind_id_19 = a.soc_id_nems
WHERE a.o_group = 'detailed'::text
AND a.year = 2019
AND a.tot_emp IS NOT NULL
AND c.title IS NOT NULL

UNION 

SELECT c.soc_id, a.soc_id_nems, a.title, a.year, a.area_title AS place_name, a.prim_state AS state_code, a.naics, a.naics_title AS industry_name,
     RANK() OVER(PARTITION BY c.soc_id ORDER BY a.tot_emp DESC) AS ann_emp_rank, a.tot_emp, a.emp_prse, a.jobs_1000, a.loc_quotiant,
	 a.h_mean, a.a_mean, a.mean_prse, a.h_pct10, a.h_pct25, a.h_median, a.h_pct75, a.h_pct90, 
	 a.a_pct10, a.a_pct25, a.a_median, a.a_pct75, a.a_pct90, a.annual, a.hourly
FROM bls_oews_ind AS a
LEFT JOIN occs_bls_ind_nems_lookup AS c 
ON c.nems_ind_id_20 = a.soc_id_nems
WHERE a.o_group = 'detailed'::text
AND a.year = 2020
AND a.tot_emp IS NOT NULL
AND c.title IS NOT NULL

UNION 

SELECT c.soc_id, a.soc_id_nems, a.title, a.year, a.area_title AS place_name, a.prim_state AS state_code, a.naics, a.naics_title AS industry_name,
     RANK() OVER(PARTITION BY c.soc_id ORDER BY a.tot_emp DESC) AS ann_emp_rank, a.tot_emp, a.emp_prse, a.jobs_1000, a.loc_quotiant,
	 a.h_mean, a.a_mean, a.mean_prse, a.h_pct10, a.h_pct25, a.h_median, a.h_pct75, a.h_pct90, 
	 a.a_pct10, a.a_pct25, a.a_median, a.a_pct75, a.a_pct90, a.annual, a.hourly
FROM bls_oews_ind AS a
LEFT JOIN occs_bls_ind_nems_lookup AS c 
ON c.nems_ind_id_21 = a.soc_id_nems
WHERE a.o_group = 'detailed'::text
AND a.year = 2021
AND a.tot_emp IS NOT NULL
AND c.title IS NOT NULL

UNION 

SELECT c.soc_id, a.soc_id_nems, a.title, a.year, a.area_title AS place_name, a.prim_state AS state_code, a.naics, a.naics_title AS industry_name,
     RANK() OVER(PARTITION BY c.soc_id ORDER BY a.tot_emp DESC) AS ann_emp_rank, a.tot_emp, a.emp_prse, a.jobs_1000, a.loc_quotiant,
	 a.h_mean, a.a_mean, a.mean_prse, a.h_pct10, a.h_pct25, a.h_median, a.h_pct75, a.h_pct90, 
	 a.a_pct10, a.a_pct25, a.a_median, a.a_pct75, a.a_pct90, a.annual, a.hourly
FROM bls_oews_ind AS a
LEFT JOIN occs_bls_ind_nems_lookup AS c 
ON c.nems_ind_id_22 = a.soc_id_nems
WHERE a.o_group = 'detailed'::text
AND a.year = 2022
AND a.tot_emp IS NOT NULL
AND c.title IS NOT NULL

ORDER BY year DESC, soc_id, tot_emp DESC
