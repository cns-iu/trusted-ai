CREATE MATERIALIZED VIEW elements_treemap
AS

SELECT a.element_id, a.element_name, a.descr, a.groups, left(a.element_id,5) AS lvl_1, 
c.element_name AS lvl_1_label, left(a.element_id,7) AS lvl_2, g.element_name AS lvl_2_label
FROM public.elements AS a 
LEFT JOIN public.elements AS c
ON c.element_id = left(a.element_id,5)
LEFT JOIN public.elements AS g
ON g.element_id = left(a.element_id,7)
WHERE length(a.element_id) >= 9 
AND a.groups IN ('Ability', 'Work Activities')

UNION

SELECT a.element_id, a.element_name, a.descr, a.groups, left(a.element_id,5) AS lvl_1, c.element_name AS lvl_1_label, NULL AS lvl_2, NULL as lvl_2_label
FROM public.elements AS a
LEFT JOIN public.elements AS c
ON c.element_id = left(a.element_id,5)
WHERE a.groups IN ('Skills', 'Knowledge')
AND length(a.element_id) > 5 
AND a.element_id != '2.C.10'

UNION

SELECT a.element_id, a.element_name, a.descr, a.groups, '2.C.10' AS lvl_1, 'Transportation' AS lvl_1_label, NULL AS lvl_2, NULL as lvl_2_label
FROM public.elements AS a
WHERE a.groups = 'Knowledge'
AND a.element_id = '2.C.10'

ORDER BY element_id;