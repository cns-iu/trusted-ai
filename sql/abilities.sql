SELECT lvl.soc_id, lvl.title, lvl.element_id, lvl.element_name, lvl.n, lvl.data_value AS lvl_value,  
       lvl.std_error AS lvl_std_err, lvl.lower_ci_bound AS lvl_lcib, lvl.upper_ci_bound AS lvl_ucib,  
	   imp.data_value AS imp_value,imp.std_error AS imp_std_err, imp.lower_ci_bound AS imp_lcib, 
	   imp.upper_ci_bound AS imp_ucib, lvl.rec_suppress, lvl.not_relevant, lvl.domain_source
	FROM public.abilities AS lvl LEFT JOIN
	public.abilities AS imp
	ON lvl.soc_id = imp.soc_id AND
	   lvl.element_id = imp.element_id
WHERE
lvl.scale_id = 'LV' AND
imp.scale_id = 'IM';