CREATE MATERIALIZED VIEW profile_sec_five_oews_nat AS

SELECT c.year, a.soc_id, c.soc_id_nems, a.title, c.title AS "oews_title", a.grouping, c.area_title, c.naics, c.naics_title, 
	   c.tot_emp, c.emp_prse, c.h_mean, c.a_mean, c.mean_prse, c.h_pct10, c.h_pct25, c.h_median, c.h_pct75, c.h_pct90, 
	   c.a_pct10, c.a_pct25, c.a_median, c.a_pct75, c.a_pct90, c.annual, c.hourly
	FROM public.occs_bls_nat_nems_lookup AS a
	LEFT JOIN public.bls_oews_nat AS c
	ON a.nems_nat_id_18 = c.soc_id_nems
WHERE c.year = 2018

UNION

SELECT c.year, a.soc_id, c.soc_id_nems, a.title, c.title AS "oews_title", a.grouping, c.area_title, c.naics, c.naics_title, 
	   c.tot_emp, c.emp_prse, c.h_mean, c.a_mean, c.mean_prse, c.h_pct10, c.h_pct25, c.h_median, c.h_pct75, c.h_pct90, 
	   c.a_pct10, c.a_pct25, c.a_median, c.a_pct75, c.a_pct90, c.annual, c.hourly
	FROM public.occs_bls_nat_nems_lookup AS a
	LEFT JOIN public.bls_oews_nat AS c
	ON a.nems_nat_id_19 = c.soc_id_nems
WHERE c.year = 2019

UNION

SELECT c.year, a.soc_id, c.soc_id_nems, a.title, c.title AS "oews_title", a.grouping, c.area_title, c.naics, c.naics_title, 
	   c.tot_emp, c.emp_prse, c.h_mean, c.a_mean, c.mean_prse, c.h_pct10, c.h_pct25, c.h_median, c.h_pct75, c.h_pct90, 
	   c.a_pct10, c.a_pct25, c.a_median, c.a_pct75, c.a_pct90, c.annual, c.hourly
	FROM public.occs_bls_nat_nems_lookup AS a
	LEFT JOIN public.bls_oews_nat AS c
	ON a.nems_nat_id_20 = c.soc_id_nems
WHERE c.year = 2020

UNION

SELECT c.year, a.soc_id, c.soc_id_nems, a.title, c.title AS "oews_title", a.grouping, c.area_title, c.naics, c.naics_title, 
	   c.tot_emp, c.emp_prse, c.h_mean, c.a_mean, c.mean_prse, c.h_pct10, c.h_pct25, c.h_median, c.h_pct75, c.h_pct90, 
	   c.a_pct10, c.a_pct25, c.a_median, c.a_pct75, c.a_pct90, c.annual, c.hourly
	FROM public.occs_bls_nat_nems_lookup AS a
	LEFT JOIN public.bls_oews_nat AS c
	ON a.nems_nat_id_21 = c.soc_id_nems
WHERE c.year = 2021

UNION

SELECT c.year, a.soc_id, c.soc_id_nems, a.title, c.title AS "oews_title", a.grouping, c.area_title, c.naics, c.naics_title, 
	   c.tot_emp, c.emp_prse, c.h_mean, c.a_mean, c.mean_prse, c.h_pct10, c.h_pct25, c.h_median, c.h_pct75, c.h_pct90, 
	   c.a_pct10, c.a_pct25, c.a_median, c.a_pct75, c.a_pct90, c.annual, c.hourly
	FROM public.occs_bls_nat_nems_lookup AS a
	LEFT JOIN public.bls_oews_nat AS c
	ON a.nems_nat_id_22 = c.soc_id_nems
WHERE c.year = 2022

ORDER BY soc_id, year;