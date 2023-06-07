SELECT a.soc_id, a.soc_nems_id, a.title, a.descr, STRING_AGG(b.alt_title, ', ') as alt_titles
	FROM public.occs AS a LEFT JOIN
	     public.alt_titles AS b ON 
		 a.soc_id = b.soc_id
WHERE
a."grouping" = 'Detailed Occupation' AND
a.soc_id = '13-2053.00'
GROUP BY 
	a.soc_id;
