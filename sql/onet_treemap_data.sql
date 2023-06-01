CREATE MATERIALIZED VIEW profile_sec_two 
AS

SELECT a.soc_id, a.title, a.element_id, a.element_name, c.descr, c.groups,    
       c.lvl_1, c.lvl_1_label, c.lvl_2, c.lvl_2_label, a.n, a.lvl_value, 
	   a.imp_value, a.rec_suppress, a.not_relevant, a.domain_source
FROM public.ksawa_ratings_treemap AS a
LEFT JOIN public.elements_treemap AS c
ON a.element_id = c.element_id
WHERE a.rec_suppress = 'false' 
AND a.not_relevant = 'false';
	