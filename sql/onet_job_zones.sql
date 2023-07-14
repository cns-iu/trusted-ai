CREATE MATERIALIZED VIEW preparedness_jobzone AS
SELECT a.soc_id, a.title, a.job_zone, c.name, c.experience, c.education, 
	   c.job_training
FROM public.job_zones AS a
LEFT JOIN public.job_zone_refs AS c
	ON a.job_zone = c.job_zone;