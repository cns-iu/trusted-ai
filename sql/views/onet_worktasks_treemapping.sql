

SELECT soc_id, title, groups, 
	   lvl_1, lvl_1_label, lvl_2, lvl_2_label, element_id, element_name, descr, 
	   n, lvl_value, imp_value, rec_suppress, not_relevant, domain_source
FROM public.profile_sec_two
WHERE groups='Ability' 
AND rec_suppress = 'false'
AND not_relevant = 'false';