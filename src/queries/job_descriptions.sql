CREATE TEMP VIEW foo AS
SELECT
  a.soc_id,
  a.soc_nems_id,
  a.title,
  a.descr,
  c.job_zone,
  d.name,
  d.experience,
  d.education,
  d.job_training,
  d.example,
  d.svp_range,
  string_agg(alt_title, ', '::text) AS alt_titles
  FROM public.occs a
    LEFT JOIN alt_titles b ON a.soc_id = b.soc_id
	  LEFT JOIN job_zones c ON a.soc_id = c.soc_id
    LEFT JOIN job_zone_refs d ON c.job_zone = d.job_zone
WHERE
  a."grouping" = 'Detailed Occupation'::text OR a."grouping" = 'Detailed Occupation Specialization'::text
GROUP BY
	a.soc_id,
	c.job_zone,
	d.name,
	d.experience,
	d.education,
	d.job_training,
  d.example,
	d.svp_range;

\t
\a
\o src/assets/data/job_descriptions.json
SELECT array_to_json(array_agg(ROW_TO_JSON(r)), TRUE)
FROM (SELECT * FROM foo) AS r;
