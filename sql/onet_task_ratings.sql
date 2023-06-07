CREATE MATERIALIZED VIEW profile_sec_four_worktasks AS
SELECT a.soc_id, a.title, a.task_id, a.task, g.descr, g.task_type,
       a.n, a.data_value AS importance, c.data_value AS relevance,
       a.std_error AS imp_std_error, a.lower_ci_bound AS imp_lcib, a.upper_ci_bound AS imp_ucib, 
	   c.std_error AS rel_std_error, c.lower_ci_bound AS rel_lcib, c.upper_ci_bound AS rel_ucib, 
	   a.rec_suppress, a.domain_source
	FROM public.task_ratings AS a
	LEFT JOIN public.task_ratings AS c
	ON a.soc_id = c.soc_id AND a.task_id = c.task_id
	LEFT JOIN public.task_statements AS g
	ON a.soc_id = g.soc_id AND a.task_id = g.task_id
WHERE a.scale_id = 'IM'
AND   c.scale_id = 'RT';