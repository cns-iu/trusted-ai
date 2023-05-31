SELECT element_id, element_name, descr, groups
	FROM public.elements
WHERE starts_with(element_id, '1.A')
;