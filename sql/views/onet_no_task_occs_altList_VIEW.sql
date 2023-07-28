-- View: public.occs_no_tasks_alt_select

-- DROP VIEW public.occs_no_tasks_alt_select;

CREATE VIEW occs_no_tasks_alt_select AS
WITH alternates AS 
	(SELECT a.soc_id,
			a.title,
			c.target_soc_id,
			c.target_title,
			c.rank,
			a.value,
			ROW_NUMBER() OVER (PARTITION BY a.soc_id ORDER BY a.soc_id, c.rank) AS row
	   FROM public.occs_no_tasks_onet27 a
	   LEFT JOIN public.related_occupations c ON a.soc_id::text = c.source_soc_id::text
	  WHERE c.source_title IS NOT NULL
	    AND c.target_soc_id NOT IN (SELECT DISTINCT(soc_id)
								  FROM public.occs_no_tasks_onet27) 
   ORDER BY a.soc_id, c.rank) 
SELECT * 
FROM alternates WHERE row = 1;

ALTER TABLE public.occs_no_tasks_alt_select
    OWNER TO mginda;

GRANT ALL ON TABLE public.occs_no_tasks_alt_select TO gallantm WITH GRANT OPTION;
GRANT ALL ON TABLE public.occs_no_tasks_alt_select TO mginda;
GRANT ALL ON TABLE public.occs_no_tasks_alt_select TO edlu WITH GRANT OPTION;
GRANT ALL ON TABLE public.occs_no_tasks_alt_select TO bherr WITH GRANT OPTION;





