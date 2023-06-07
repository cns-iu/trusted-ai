SELECT a.element_id, a.element_name, a.descr, a.groups, left(a.element_id,5) AS lvl_1, c.element_name AS lvl_1_label
FROM public.elements AS a
LEFT JOIN public.elements AS c
ON c.element_id = left(a.element_id,5)
WHERE a.groups IN ('Skills', 'Knowledge')
AND length(a.element_id) > 5 
AND a.element_id != '2.C.10';	