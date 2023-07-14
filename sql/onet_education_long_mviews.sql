CREATE MATERIALIZED VIEW edu_rl_long AS
SELECT a.soc_id, a.title, a.element_name, a.category,
       scale.descr, a.n, a.data_value,  
       a.std_error, a.lower_ci_bound, a.upper_ci_bound, a.rec_suppress, a.domain_source
	FROM public.education AS a 
	LEFT JOIN public.scales_context AS scale
	ON CAST(a.category AS text) = scale.category 
WHERE a.scale_id = 'RL'
AND scale.scale_id = 'RL'
ORDER BY a.soc_id, a.category;

CREATE MATERIALIZED VIEW edu_rw_long AS
SELECT a.soc_id, a.title, a.element_name, a.category,
       scale.descr, a.n, a.data_value,  
       a.std_error, a.lower_ci_bound, a.upper_ci_bound, a.rec_suppress, a.domain_source
	FROM public.education AS a 
	LEFT JOIN public.scales_context AS scale
	ON CAST(a.category AS text) = scale.category 
WHERE a.scale_id = 'RW'
AND scale.scale_id = 'RW'
ORDER BY a.soc_id, a.category;
	
CREATE MATERIALIZED VIEW edu_pt_long AS
SELECT a.soc_id, a.title, a.element_name, a.category,
       scale.descr, a.n, a.data_value,  
       a.std_error, a.lower_ci_bound, a.upper_ci_bound, a.rec_suppress, a.domain_source
	FROM public.education AS a 
	LEFT JOIN public.scales_context AS scale
	ON CAST(a.category AS text) = scale.category 
WHERE a.scale_id = 'PT'
AND scale.scale_id = 'PT'
ORDER BY a.soc_id, a.category;	
	
CREATE MATERIALIZED VIEW edu_oj_long AS
SELECT a.soc_id, a.title, a.element_name, a.category,
       scale.descr, a.n, a.data_value,  
       a.std_error, a.lower_ci_bound, a.upper_ci_bound, a.rec_suppress, a.domain_source
	FROM public.education AS a 
	LEFT JOIN public.scales_context AS scale
	ON CAST(a.category AS text) = scale.category 
WHERE a.scale_id = 'OJ'
AND scale.scale_id = 'OJ'
ORDER BY a.soc_id, a.category;