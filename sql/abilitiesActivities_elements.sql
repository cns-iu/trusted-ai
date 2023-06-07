SELECT a.element_id, a.element_name, a.descr, a.groups, left(a.element_id,5) AS lvl_1, 
c.element_name AS lvl_1_label, left(a.element_id,7) AS lvl_2, g.element_name AS lvl_2_label
FROM public.elements AS a 
LEFT JOIN public.elements AS c
ON c.element_id = left(a.element_id,5)
LEFT JOIN public.elements AS g
ON g.element_id = left(a.element_id,7)
WHERE length(a.element_id) >= 9 
AND a.groups IN ('Ability', 'Work Activities');